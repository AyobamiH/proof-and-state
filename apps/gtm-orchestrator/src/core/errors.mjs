export class OrchestratorError extends Error {
  constructor(code, message, options = {}) {
    super(message, options);
    this.name = "OrchestratorError";
    this.code = code;
    this.retryable = Boolean(options.retryable);
    this.details = options.details ?? null;
  }
}

export function classifyHttpFailure(response, provider) {
  const retryable = response.status === 408 || response.status === 429 || response.status >= 500;
  return new OrchestratorError(
    retryable ? "PROVIDER_TEMPORARY_FAILURE" : "PROVIDER_REQUEST_REJECTED",
    `${provider} returned HTTP ${response.status}`,
    { retryable, details: { provider, status: response.status } },
  );
}

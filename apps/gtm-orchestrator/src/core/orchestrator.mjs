import { assertReadBackMatches, validateJob } from "./job.mjs";
import { OrchestratorError } from "./errors.mjs";

export async function processJob(input, context) {
  const job = validateJob(input);
  if (context.env.PUBLISHING_ENABLED !== "true") {
    throw new OrchestratorError("PUBLISHING_DISABLED", "Publishing is fail-closed until PUBLISHING_ENABLED=true");
  }
  const existing = await context.store.findByIdempotencyKey(job.idempotencyKey);
  if (existing?.status === "PUBLISHED_VERIFIED") return existing;
  const adapter = context.adapters[job.channel];
  if (!adapter) throw new OrchestratorError("ADAPTER_UNAVAILABLE", `No direct API adapter for ${job.channel}`);

  await context.store.recordAttempt(job.id, "PREFLIGHT_STARTED");
  await adapter.preflight();
  if (job.assetUrl) await context.assets.validate(job.assetUrl);

  let submitted;
  if (existing?.status === "SUBMITTED" && existing.provider_post_id) {
    submitted = { ...job, providerPostId: existing.provider_post_id, status: "SUBMITTED" };
  } else {
    let submission;
    try {
      submission = await adapter.publish(job);
    } catch (error) {
      const failure = error.retryable
        ? new OrchestratorError("AMBIGUOUS_MUTATION", "The provider may have accepted the mutation; automatic resubmission is blocked until reconciliation", { cause: error })
        : error;
      await context.store.recordFailure(job.id, failure.code ?? "SUBMISSION_FAILED", false, "submission");
      throw failure;
    }
    submitted = { ...job, providerPostId: submission.providerPostId, status: "SUBMITTED" };
    await context.store.recordSubmission(submitted, submission);
  }

  let readBack;
  try {
    readBack = await adapter.readBack(submitted);
    assertReadBackMatches(submitted, readBack);
  } catch (error) {
    await context.store.recordFailure(job.id, error.code ?? "READBACK_FAILED", Boolean(error.retryable), "read_back");
    throw error;
  }

  const verified = { ...submitted, status: "PUBLISHED_VERIFIED", verifiedAt: context.now().toISOString() };
  await context.store.recordVerified(verified, readBack);
  return verified;
}

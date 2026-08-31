import { classifyHttpFailure, OrchestratorError } from "./errors.mjs";

export async function refreshGoogleToken({ clientId, clientSecret, refreshToken, fetchImpl = fetch }) {
  for (const [name, value] of Object.entries({ clientId, clientSecret, refreshToken })) {
    if (!value) throw new OrchestratorError("MISSING_CREDENTIAL", `Missing Google OAuth credential: ${name}`);
  }
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });
  const response = await fetchImpl("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) throw classifyHttpFailure(response, "google_oauth");
  const payload = await response.json();
  if (!payload.access_token) throw new OrchestratorError("TOKEN_RESPONSE_INVALID", "Google OAuth response omitted access_token");
  return payload.access_token;
}

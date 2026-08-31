import { OrchestratorError } from "./errors.mjs";

export const CHANNELS = Object.freeze(["google_business", "linkedin", "facebook", "instagram", "threads"]);
export const TERMINAL_STATES = Object.freeze(["PUBLISHED_VERIFIED", "BLOCKED", "FAILED"]);

export function validateJob(input) {
  if (!input || typeof input !== "object") fail("job must be an object");
  requiredString(input.id, "id");
  requiredString(input.brandId, "brandId");
  requiredString(input.channel, "channel");
  if (!CHANNELS.includes(input.channel)) fail(`unsupported channel: ${input.channel}`);
  requiredString(input.copy, "copy");
  requiredString(input.storyAngle, "storyAngle");
  requiredString(input.scheduledAt, "scheduledAt");
  requiredString(input.idempotencyKey, "idempotencyKey");
  if (Number.isNaN(Date.parse(input.scheduledAt))) fail("scheduledAt must be ISO-8601");
  if (input.destinationUrl) secureUrl(input.destinationUrl, "destinationUrl");
  if (input.assetUrl) secureUrl(input.assetUrl, "assetUrl");
  if (input.channel === "google_business" && !input.assetUrl) fail("Google Business jobs require assetUrl");
  if (!input.approval || !["standing", "per_post"].includes(input.approval.mode)) fail("approval.mode must be standing or per_post");
  if (input.approval.mode === "per_post" && !input.approval.approvedAt) fail("per_post approval requires approvedAt");
  return structuredClone(input);
}

export function assertReadBackMatches(job, receipt) {
  if (!receipt || receipt.providerPostId !== job.providerPostId) {
    throw new OrchestratorError("READBACK_ID_MISMATCH", "Provider read-back did not match the submitted post ID");
  }
  if (normalize(receipt.copy) !== normalize(job.copy)) {
    throw new OrchestratorError("READBACK_COPY_MISMATCH", "Provider read-back copy did not match the submitted copy");
  }
  if (job.assetUrl && receipt.assetUrl && canonicalUrl(receipt.assetUrl) !== canonicalUrl(job.assetUrl)) {
    throw new OrchestratorError("READBACK_ASSET_MISMATCH", "Provider read-back asset did not match the submitted asset");
  }
  return true;
}

function normalize(value) { return String(value ?? "").replace(/\r\n/g, "\n").trim(); }
function canonicalUrl(value) { const url = new URL(value); url.hash = ""; return url.toString(); }
function requiredString(value, field) { if (typeof value !== "string" || !value.trim()) fail(`${field} is required`); }
function secureUrl(value, field) { const url = new URL(value); if (url.protocol !== "https:") fail(`${field} must use HTTPS`); }
function fail(message) { throw new OrchestratorError("INVALID_JOB", message); }

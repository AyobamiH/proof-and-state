import { OrchestratorError } from "../core/errors.mjs";

export function createD1Store(db, now = () => new Date()) {
  if (!db) throw new OrchestratorError("DATABASE_UNAVAILABLE", "GTM_DB binding is required");
  return {
    async findByIdempotencyKey(key) {
      return db.prepare("SELECT * FROM jobs WHERE idempotency_key = ?").bind(key).first();
    },
    async recordAttempt(jobId, event) { await eventInsert(db, jobId, event, null, now); },
    async recordSubmission(job, receipt) {
      await db.batch([
        db.prepare("UPDATE jobs SET status = 'SUBMITTED', provider_post_id = ?, updated_at = ? WHERE id = ?").bind(job.providerPostId, now().toISOString(), job.id),
        db.prepare("INSERT INTO receipts (job_id, phase, payload_json, created_at) VALUES (?, 'submission', ?, ?)").bind(job.id, JSON.stringify(redact(receipt)), now().toISOString()),
      ]);
    },
    async recordFailure(jobId, code, retryable, phase) {
      const status = retryable && phase === "read_back" ? "SUBMITTED" : retryable ? "RETRYABLE" : "BLOCKED";
      await db.batch([
        db.prepare("UPDATE jobs SET status = ?, updated_at = ? WHERE id = ?").bind(status, now().toISOString(), jobId),
        db.prepare("INSERT INTO attempts (job_id, event, details_json, created_at) VALUES (?, ?, ?, ?)").bind(jobId, retryable ? "RETRYABLE_FAILURE" : "BLOCKED", JSON.stringify({ code, phase }), now().toISOString()),
      ]);
    },
    async recordVerified(job, receipt) {
      await db.batch([
        db.prepare("UPDATE jobs SET status = 'PUBLISHED_VERIFIED', verified_at = ?, updated_at = ? WHERE id = ?").bind(job.verifiedAt, now().toISOString(), job.id),
        db.prepare("INSERT INTO receipts (job_id, phase, payload_json, created_at) VALUES (?, 'read_back', ?, ?)").bind(job.id, JSON.stringify(redact(receipt)), now().toISOString()),
      ]);
    },
  };
}

async function eventInsert(db, jobId, event, details, now) {
  await db.prepare("INSERT INTO attempts (job_id, event, details_json, created_at) VALUES (?, ?, ?, ?)").bind(jobId, event, details ? JSON.stringify(details) : null, now().toISOString()).run();
}
function redact(value) { const copy = structuredClone(value); if (copy?.raw?.access_token) copy.raw.access_token = "[REDACTED]"; return copy; }

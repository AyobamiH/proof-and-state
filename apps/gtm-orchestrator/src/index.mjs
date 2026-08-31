import { processJob } from "./core/orchestrator.mjs";
import { createCloudinaryAssetService } from "./assets/cloudinary.mjs";
import { createGoogleBusinessAdapter } from "./providers/google.mjs";
import { createLinkedInAdapter } from "./providers/linkedin.mjs";
import { createFacebookAdapter, createInstagramAdapter, createThreadsAdapter } from "./providers/meta.mjs";
import { createD1Store } from "./store/d1.mjs";
import { validateJob } from "./core/job.mjs";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/health") return json({ ok: true, service: "proof-state-gtm-orchestrator", publishingEnabled: env.PUBLISHING_ENABLED === "true" });
    if (url.pathname === "/v1/jobs" && request.method === "POST") {
      if (!authorised(request, env)) return json({ error: "unauthorised" }, 401);
      const job = validateJob(await request.json());
      await insertJob(env.GTM_DB, job);
      await env.GTM_QUEUE.send({ jobId: job.id });
      return json({ accepted: true, jobId: job.id }, 202);
    }
    return json({ error: "not_found" }, 404);
  },
  async queue(batch, env) {
    for (const message of batch.messages) {
      const job = await env.GTM_DB.prepare("SELECT payload_json FROM jobs WHERE id = ?").bind(message.body.jobId).first();
      if (!job) { message.ack(); continue; }
      try { await processJob(JSON.parse(job.payload_json), context(env)); message.ack(); }
      catch (error) { error.retryable ? message.retry() : message.ack(); }
    }
  },
  async scheduled(_controller, env) {
    const due = await env.GTM_DB.prepare("SELECT id FROM jobs WHERE status = 'QUEUED' AND scheduled_at <= ? LIMIT 50").bind(new Date().toISOString()).all();
    for (const job of due.results ?? []) await env.GTM_QUEUE.send({ jobId: job.id });
  },
};

export function context(env, fetchImpl = fetch) {
  return {
    env,
    now: () => new Date(),
    store: createD1Store(env.GTM_DB),
    assets: createCloudinaryAssetService({ env, fetchImpl }),
    adapters: {
      google_business: createGoogleBusinessAdapter({ env, fetchImpl }),
      linkedin: createLinkedInAdapter({ env, fetchImpl }),
      facebook: createFacebookAdapter({ env, fetchImpl }),
      instagram: createInstagramAdapter({ env, fetchImpl }),
      threads: createThreadsAdapter({ env, fetchImpl }),
    },
  };
}

async function insertJob(db, job) {
  await db.prepare("INSERT INTO jobs (id, brand_id, channel, status, scheduled_at, idempotency_key, payload_json, created_at, updated_at) VALUES (?, ?, ?, 'QUEUED', ?, ?, ?, ?, ?)")
    .bind(job.id, job.brandId, job.channel, job.scheduledAt, job.idempotencyKey, JSON.stringify(job), new Date().toISOString(), new Date().toISOString()).run();
}
function authorised(request, env) { const token = request.headers.get("authorization"); return Boolean(env.ORCHESTRATOR_ADMIN_TOKEN) && token === `Bearer ${env.ORCHESTRATOR_ADMIN_TOKEN}`; }
function json(value, status = 200) { return new Response(JSON.stringify(value), { status, headers: { "content-type": "application/json" } }); }

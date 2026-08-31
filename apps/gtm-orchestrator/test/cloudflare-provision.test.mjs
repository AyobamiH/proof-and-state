import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { ensureD1, ensureQueue, provision, validateEnvironment } from "../scripts/provision-cloudflare.mjs";
import { findHealthUrl, validateHealth } from "../scripts/verify-cloudflare-health.mjs";

const credentials = { apiToken: "a".repeat(40), accountId: "b".repeat(32), adminToken: "c".repeat(64) };
const response = (result, result_info) => ({ ok: true, status: 200, json: async () => ({ success: true, result, result_info }) });

test("environment validation rejects malformed identifiers and accepts exact secret shapes", () => {
  assert.deepEqual(validateEnvironment({
    CLOUDFLARE_API_TOKEN: credentials.apiToken,
    CLOUDFLARE_ACCOUNT_ID: credentials.accountId,
    ORCHESTRATOR_ADMIN_TOKEN: credentials.adminToken,
  }), credentials);
  assert.throws(() => validateEnvironment({ CLOUDFLARE_API_TOKEN: "short", CLOUDFLARE_ACCOUNT_ID: "bad", ORCHESTRATOR_ADMIN_TOKEN: "bad" }));
});

test("resource ensure operations reuse matching Cloudflare resources", async () => {
  const fetchImpl = async (url) => {
    if (url.includes("/d1/database")) return response([{ name: "proof-state-gtm", uuid: "db-1" }], { total_pages: 1 });
    return response([{ queue_name: "proof-state-gtm", queue_id: "queue-1" }], { total_pages: 1 });
  };
  assert.deepEqual(await ensureD1(credentials, fetchImpl), { id: "db-1", created: false });
  assert.deepEqual(await ensureQueue("proof-state-gtm", credentials, fetchImpl), { id: "queue-1", created: false });
});

test("provisioning creates missing resources and writes no plaintext token to runtime config", async () => {
  const directory = await mkdtemp(join(tmpdir(), "gtm-provision-"));
  const configPath = join(directory, "wrangler.jsonc");
  const secretsPath = join(directory, "secrets.json");
  const created = new Map();
  const fetchImpl = async (url, options = {}) => {
    if (url.endsWith("/user/tokens/verify")) return response({ status: "active" });
    if (options.method === "POST" && url.endsWith("/d1/database")) { created.set("db", true); return response({ uuid: "db-created" }); }
    if (options.method === "POST" && url.endsWith("/queues")) {
      const name = JSON.parse(options.body).queue_name;
      return response({ queue_id: `${name}-created` });
    }
    return response([], { total_pages: 1 });
  };
  const result = await provision({
    env: {
      CLOUDFLARE_API_TOKEN: credentials.apiToken,
      CLOUDFLARE_ACCOUNT_ID: credentials.accountId,
      ORCHESTRATOR_ADMIN_TOKEN: credentials.adminToken,
      GITHUB_SHA: "commit-123",
    },
    fetchImpl,
    configPath,
    secretsPath,
  });
  const config = await readFile(configPath, "utf8");
  const secretFile = await readFile(secretsPath, "utf8");
  assert.equal(result.database.created, true);
  assert.equal(created.get("db"), true);
  assert.match(config, /db-created/);
  assert.match(config, /commit-123/);
  assert.doesNotMatch(config, new RegExp(credentials.adminToken));
  assert.equal(JSON.parse(secretFile).ORCHESTRATOR_ADMIN_TOKEN, credentials.adminToken);
});

test("health evidence requires exact commit and publishing disabled", () => {
  const log = "Deployed https://proof-state-gtm-orchestrator.example.workers.dev";
  assert.equal(findHealthUrl(log), "https://proof-state-gtm-orchestrator.example.workers.dev/health");
  assert.deepEqual(validateHealth({ ok: true, service: "proof-state-gtm-orchestrator", commit: "abc", publishingEnabled: false }, "abc").commit, "abc");
  assert.throws(() => validateHealth({ ok: true, service: "proof-state-gtm-orchestrator", commit: "abc", publishingEnabled: true }, "abc"));
  assert.throws(() => validateHealth({ ok: true, service: "proof-state-gtm-orchestrator", commit: "wrong", publishingEnabled: false }, "abc"));
});

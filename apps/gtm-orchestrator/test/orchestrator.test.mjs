import test from "node:test";
import assert from "node:assert/strict";
import { processJob } from "../src/core/orchestrator.mjs";
import { baseJob } from "../test-support/helpers.mjs";

function context(overrides = {}) {
  const events = [];
  return {
    events,
    env: { PUBLISHING_ENABLED: "true", ...(overrides.env ?? {}) },
    now: () => new Date("2026-08-31T10:05:00.000Z"),
    assets: { validate: async () => true },
    adapters: { google_business: {
      preflight: async () => events.push("preflight"),
      publish: async () => ({ providerPostId: "accounts/1/locations/2/localPosts/3" }),
      readBack: async () => ({ providerPostId: "accounts/1/locations/2/localPosts/3", copy: baseJob().copy, assetUrl: baseJob().assetUrl }),
    } },
    store: {
      findByIdempotencyKey: async () => null,
      recordAttempt: async () => events.push("attempt"),
      recordSubmission: async () => events.push("submission"),
      recordFailure: async () => events.push("failure"),
      recordVerified: async () => events.push("verified"),
    },
    ...overrides,
  };
}

test("orchestrator requires provider read-back before verified", async () => {
  const ctx = context();
  const result = await processJob(baseJob(), ctx);
  assert.equal(result.status, "PUBLISHED_VERIFIED");
  assert.deepEqual(ctx.events, ["attempt", "preflight", "submission", "verified"]);
});

test("orchestrator is disabled by default", async () => {
  await assert.rejects(() => processJob(baseJob(), context({ env: { PUBLISHING_ENABLED: "false" } })), /fail-closed/);
});

test("orchestrator records read-back mismatch as failure", async () => {
  const ctx = context();
  ctx.adapters.google_business.readBack = async () => ({ providerPostId: "wrong", copy: baseJob().copy });
  await assert.rejects(() => processJob(baseJob(), ctx), /did not match/);
  assert.equal(ctx.events.at(-1), "failure");
});

test("submitted job retries read-back without publishing again", async () => {
  const ctx = context();
  let publishes = 0;
  ctx.store.findByIdempotencyKey = async () => ({ status: "SUBMITTED", provider_post_id: "accounts/1/locations/2/localPosts/3" });
  ctx.adapters.google_business.publish = async () => { publishes += 1; return { providerPostId: "duplicate" }; };
  const result = await processJob(baseJob(), ctx);
  assert.equal(result.status, "PUBLISHED_VERIFIED");
  assert.equal(publishes, 0);
  assert.equal(ctx.events.includes("submission"), false);
});

test("temporary mutation failure blocks automatic resubmission as ambiguous", async () => {
  const ctx = context();
  const error = new Error("provider timeout");
  error.retryable = true;
  ctx.adapters.google_business.publish = async () => { throw error; };
  await assert.rejects(() => processJob(baseJob(), ctx), (caught) => caught.code === "AMBIGUOUS_MUTATION" && caught.retryable === false);
  assert.equal(ctx.events.at(-1), "failure");
});

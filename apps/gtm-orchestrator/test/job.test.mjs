import test from "node:test";
import assert from "node:assert/strict";
import { assertReadBackMatches, validateJob } from "../src/core/job.mjs";
import { baseJob } from "../test-support/helpers.mjs";

test("validates a Google Business job", () => assert.equal(validateJob(baseJob()).channel, "google_business"));
test("rejects non-HTTPS destinations", () => assert.throws(() => validateJob(baseJob({ destinationUrl: "http://example.com" })), /HTTPS/));
test("rejects an unsupported browser channel", () => assert.throws(() => validateJob(baseJob({ channel: "cloud_browser" })), /unsupported channel/));
test("fails closed when provider read-back copy differs", () => {
  const job = { ...baseJob(), providerPostId: "accounts/1/locations/2/localPosts/3" };
  assert.throws(() => assertReadBackMatches(job, { providerPostId: job.providerPostId, copy: "Different copy" }), /copy did not match/);
});

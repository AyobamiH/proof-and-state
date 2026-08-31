import test from "node:test";
import assert from "node:assert/strict";
import { createLinkedInAdapter } from "../src/providers/linkedin.mjs";
import { baseJob, responseJson } from "../test-support/helpers.mjs";

test("LinkedIn adapter uses organisation Posts API and reads the post back", async () => {
  const calls = [];
  const id = "urn:li:share:123";
  const fetchImpl = async (url, init = {}) => {
    calls.push({ url: String(url), init });
    if (init.method === "POST") return responseJson({}, { headers: { "x-restli-id": id } });
    if (String(url).includes(encodeURIComponent(id))) return responseJson({ id, commentary: baseJob().copy });
    return responseJson({ elements: [] });
  };
  const adapter = createLinkedInAdapter({ env: { LINKEDIN_ACCESS_TOKEN: "token", LINKEDIN_ORGANIZATION_URN: "urn:li:organization:146195259", LINKEDIN_API_VERSION: "202608" }, fetchImpl });
  await adapter.preflight();
  const submission = await adapter.publish(baseJob({ channel: "linkedin", assetUrl: undefined }));
  const readBack = await adapter.readBack({ ...baseJob({ channel: "linkedin", assetUrl: undefined }), providerPostId: submission.providerPostId });
  assert.equal(readBack.providerPostId, id);
  assert.equal(calls.find((call) => call.init.method === "POST").init.headers["linkedin-version"], "202608");
});

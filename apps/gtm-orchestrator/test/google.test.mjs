import test from "node:test";
import assert from "node:assert/strict";
import { createGoogleBusinessAdapter } from "../src/providers/google.mjs";
import { baseJob, responseJson } from "../test-support/helpers.mjs";

test("Google adapter preflights, publishes and reads back the exact post", async () => {
  const calls = [];
  const postName = "accounts/1/locations/2/localPosts/3";
  const fetchImpl = async (url, init = {}) => {
    calls.push({ url: String(url), method: init.method ?? "GET", body: init.body ? String(init.body) : null });
    if (String(url) === "https://oauth2.googleapis.com/token") return responseJson({ access_token: "synthetic-access-token" });
    if (String(url).includes("localPosts?pageSize=1")) return responseJson({ localPosts: [] });
    if (init.method === "POST") return responseJson({ name: postName, summary: baseJob().copy });
    return responseJson({ name: postName, summary: baseJob().copy, media: [{ sourceUrl: baseJob().assetUrl }] });
  };
  const adapter = createGoogleBusinessAdapter({ env: { GOOGLE_CLIENT_ID: "id", GOOGLE_CLIENT_SECRET: "secret", GOOGLE_REFRESH_TOKEN: "refresh", GOOGLE_BUSINESS_ACCOUNT_ID: "1", GOOGLE_BUSINESS_LOCATION_ID: "2" }, fetchImpl });
  await adapter.preflight();
  const submission = await adapter.publish(baseJob());
  const readBack = await adapter.readBack({ ...baseJob(), providerPostId: submission.providerPostId });
  assert.equal(submission.providerPostId, postName);
  assert.equal(readBack.copy, baseJob().copy);
  assert.equal(calls.filter((call) => call.url === "https://oauth2.googleapis.com/token").length, 3);
  const publish = calls.find((call) => call.method === "POST" && call.url.includes("localPosts"));
  assert.match(publish.body, /LEARN_MORE/);
  assert.match(publish.body, /res\.cloudinary\.com/);
});

import test from "node:test";
import assert from "node:assert/strict";
import { createFacebookAdapter, createInstagramAdapter, createThreadsAdapter } from "../src/providers/meta.mjs";
import { baseJob, responseJson } from "../test-support/helpers.mjs";

test("Facebook adapter publishes to the configured Page and reads back", async () => {
  const fetchImpl = async (url, init = {}) => {
    if (String(url).endsWith("/page-1/feed") && init.method === "POST") return responseJson({ id: "page-1_42" });
    if (String(url).includes("page-1_42")) return responseJson({ id: "page-1_42", message: baseJob().copy, full_picture: baseJob().assetUrl });
    return responseJson({ id: "page-1", name: "Tail Wagging" });
  };
  const adapter = createFacebookAdapter({ env: { META_GRAPH_VERSION: "v26.0", META_FACEBOOK_PAGE_ID: "page-1", META_PAGE_ACCESS_TOKEN: "token" }, fetchImpl });
  await adapter.preflight();
  const submission = await adapter.publish(baseJob({ channel: "facebook" }));
  const readBack = await adapter.readBack({ ...baseJob({ channel: "facebook" }), providerPostId: submission.providerPostId });
  assert.equal(readBack.providerPostId, "page-1_42");
  assert.equal(readBack.copy, baseJob().copy);
});

test("Instagram adapter performs container, publish and read-back", async () => {
  const calls = [];
  const fetchImpl = async (url, init = {}) => {
    calls.push({ url: String(url), method: init.method ?? "GET" });
    if (String(url).endsWith("/media")) return responseJson({ id: "container-1" });
    if (String(url).endsWith("/media_publish")) return responseJson({ id: "ig-1" });
    if (String(url).includes("ig-1")) return responseJson({ id: "ig-1", caption: baseJob().copy, media_url: baseJob().assetUrl });
    return responseJson({ id: "ig-user", username: "tailwagging" });
  };
  const adapter = createInstagramAdapter({ env: { META_GRAPH_VERSION: "v26.0", META_INSTAGRAM_USER_ID: "ig-user", META_INSTAGRAM_ACCESS_TOKEN: "token" }, fetchImpl });
  await adapter.preflight();
  const submission = await adapter.publish(baseJob({ channel: "instagram" }));
  const readBack = await adapter.readBack({ ...baseJob({ channel: "instagram" }), providerPostId: submission.providerPostId });
  assert.equal(readBack.providerPostId, "ig-1");
  assert.deepEqual(calls.map((call) => call.method), ["GET", "POST", "POST", "GET"]);
});

test("Threads adapter performs container, publish and read-back", async () => {
  const fetchImpl = async (url, init = {}) => {
    if (String(url).endsWith("/threads")) return responseJson({ id: "container-t" });
    if (String(url).endsWith("/threads_publish")) return responseJson({ id: "thread-1" });
    if (String(url).includes("thread-1")) return responseJson({ id: "thread-1", text: baseJob().copy, media_url: baseJob().assetUrl });
    return responseJson({ id: "threads-user", username: "proofandstate" });
  };
  const adapter = createThreadsAdapter({ env: { THREADS_API_VERSION: "v1.0", META_THREADS_USER_ID: "threads-user", META_THREADS_ACCESS_TOKEN: "token" }, fetchImpl });
  await adapter.preflight();
  const submission = await adapter.publish(baseJob({ channel: "threads" }));
  const readBack = await adapter.readBack({ ...baseJob({ channel: "threads" }), providerPostId: submission.providerPostId });
  assert.equal(readBack.copy, baseJob().copy);
});

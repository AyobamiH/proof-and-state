import test from "node:test";
import assert from "node:assert/strict";
import { createCloudinaryAssetService } from "../src/assets/cloudinary.mjs";

test("Cloudinary service validates the configured tenant and media type", async () => {
  const service = createCloudinaryAssetService({
    env: { CLOUDINARY_CLOUD_NAME: "dxj7qhlc4" },
    fetchImpl: async () => new Response(null, { status: 200, headers: { "content-type": "image/png", etag: "asset-1" } }),
  });
  const result = await service.validate("https://res.cloudinary.com/dxj7qhlc4/image/upload/v1/tailwagging/post.png");
  assert.equal(result.contentType, "image/png");
  assert.equal(result.etag, "asset-1");
});

test("Cloudinary service rejects another tenant", async () => {
  const service = createCloudinaryAssetService({ env: { CLOUDINARY_CLOUD_NAME: "dxj7qhlc4" }, fetchImpl: async () => new Response(null, { status: 200 }) });
  await assert.rejects(() => service.validate("https://res.cloudinary.com/not-ours/image/upload/post.png"), /does not belong/);
});

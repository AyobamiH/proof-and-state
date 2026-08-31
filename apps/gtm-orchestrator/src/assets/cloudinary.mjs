import { OrchestratorError } from "../core/errors.mjs";

export function createCloudinaryAssetService({ env, fetchImpl = fetch }) {
  return {
    async validate(assetUrl) {
      const url = new URL(assetUrl);
      if (url.protocol !== "https:" || url.hostname !== "res.cloudinary.com") {
        throw new OrchestratorError("ASSET_ORIGIN_REJECTED", "Assets must use the approved Cloudinary HTTPS origin");
      }
      const expected = required(env.CLOUDINARY_CLOUD_NAME, "CLOUDINARY_CLOUD_NAME");
      if (url.pathname.split("/").filter(Boolean)[0] !== expected) {
        throw new OrchestratorError("ASSET_TENANT_MISMATCH", "Cloudinary asset does not belong to the configured cloud");
      }
      const response = await fetchImpl(url, { method: "HEAD" });
      if (!response.ok) throw new OrchestratorError("ASSET_UNAVAILABLE", `Cloudinary asset returned HTTP ${response.status}`, { retryable: response.status >= 500 });
      const type = response.headers.get("content-type") || "";
      if (!type.startsWith("image/") && !type.startsWith("video/")) throw new OrchestratorError("ASSET_TYPE_REJECTED", `Unsupported asset content type: ${type}`);
      return { url: url.toString(), contentType: type, etag: response.headers.get("etag") };
    },
  };
}

function required(value, name) { if (!value) throw new OrchestratorError("MISSING_CREDENTIAL", `Missing ${name}`); return value; }

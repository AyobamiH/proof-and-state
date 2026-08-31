import { classifyHttpFailure, OrchestratorError } from "../core/errors.mjs";

export function createLinkedInAdapter({ env, fetchImpl = fetch }) {
  const headers = () => ({
    authorization: `Bearer ${required(env.LINKEDIN_ACCESS_TOKEN, "LINKEDIN_ACCESS_TOKEN")}`,
    "content-type": "application/json",
    "x-restli-protocol-version": "2.0.0",
    "linkedin-version": required(env.LINKEDIN_API_VERSION, "LINKEDIN_API_VERSION"),
  });
  return {
    async preflight() {
      const author = encodeURIComponent(required(env.LINKEDIN_ORGANIZATION_URN, "LINKEDIN_ORGANIZATION_URN"));
      const response = await fetchImpl(`https://api.linkedin.com/rest/posts?author=${author}&q=author&count=1`, { headers: headers() });
      if (!response.ok) throw classifyHttpFailure(response, "linkedin");
      return true;
    },
    async publish(job) {
      const payload = {
        author: env.LINKEDIN_ORGANIZATION_URN,
        commentary: job.copy,
        visibility: "PUBLIC",
        distribution: { feedDistribution: "MAIN_FEED", targetEntities: [], thirdPartyDistributionChannels: [] },
        lifecycleState: "PUBLISHED",
        isReshareDisabledByAuthor: false,
      };
      const response = await fetchImpl("https://api.linkedin.com/rest/posts", { method: "POST", headers: headers(), body: JSON.stringify(payload) });
      if (!response.ok) throw classifyHttpFailure(response, "linkedin");
      const id = response.headers.get("x-restli-id") || (await safeJson(response))?.id;
      if (!id) throw new OrchestratorError("PROVIDER_RESPONSE_INVALID", "LinkedIn create response omitted post ID");
      return { providerPostId: id };
    },
    async readBack(job) {
      const response = await fetchImpl(`https://api.linkedin.com/rest/posts/${encodeURIComponent(job.providerPostId)}`, { headers: headers() });
      if (!response.ok) throw classifyHttpFailure(response, "linkedin");
      const post = await response.json();
      return { providerPostId: post.id ?? job.providerPostId, copy: post.commentary, raw: post };
    },
  };
}

function required(value, name) { if (!value) throw new OrchestratorError("MISSING_CREDENTIAL", `Missing ${name}`); return value; }
async function safeJson(response) { try { return await response.json(); } catch { return null; } }

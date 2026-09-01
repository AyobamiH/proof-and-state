import { classifyHttpFailure, OrchestratorError } from "../core/errors.mjs";
import { refreshGoogleToken } from "../core/oauth.mjs";

export function createGoogleBusinessAdapter({ env, fetchImpl = fetch }) {
  const parent = () => `accounts/${required(env.GOOGLE_BUSINESS_ACCOUNT_ID)}/locations/${required(env.GOOGLE_BUSINESS_LOCATION_ID)}`;
  const token = () => refreshGoogleToken({
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    refreshToken: env.GOOGLE_REFRESH_TOKEN,
    fetchImpl,
  });
  return {
    async preflight() {
      const accessToken = await token();
      const response = await fetchImpl(`https://mybusiness.googleapis.com/v4/${parent()}/localPosts?pageSize=1`, { headers: auth(accessToken) });
      if (!response.ok) throw classifyHttpFailure(response, "google_business");
      return true;
    },
    async publish(job) {
      const accessToken = await token();
      const payload = {
        languageCode: env.GOOGLE_LANGUAGE_CODE || "en-GB",
        summary: job.copy,
        topicType: "STANDARD",
        media: [{ mediaFormat: "PHOTO", sourceUrl: job.assetUrl }],
        ...(job.destinationUrl ? { callToAction: { actionType: job.ctaType || "LEARN_MORE", url: job.destinationUrl } } : {}),
      };
      const response = await fetchImpl(`https://mybusiness.googleapis.com/v4/${parent()}/localPosts`, {
        method: "POST", headers: { ...auth(accessToken), "content-type": "application/json" }, body: JSON.stringify(payload),
      });
      if (!response.ok) throw classifyHttpFailure(response, "google_business");
      const created = await response.json();
      if (!created.name) throw new OrchestratorError("PROVIDER_RESPONSE_INVALID", "Google create response omitted post name");
      return { providerPostId: created.name, raw: created };
    },
    async readBack(job) {
      const accessToken = await token();
      const response = await fetchImpl(`https://mybusiness.googleapis.com/v4/${job.providerPostId}`, { headers: auth(accessToken) });
      if (!response.ok) throw classifyHttpFailure(response, "google_business");
      const post = await response.json();
      return { providerPostId: post.name, copy: post.summary, assetUrl: post.media?.[0]?.sourceUrl, raw: post };
    },
  };
}

function auth(token) { return { authorization: `Bearer ${token}` }; }
function required(value) { if (!value) throw new OrchestratorError("MISSING_CONFIGURATION", "Google account and location IDs are required"); return value; }

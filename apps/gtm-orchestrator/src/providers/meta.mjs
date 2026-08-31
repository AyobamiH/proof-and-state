import { classifyHttpFailure, OrchestratorError } from "../core/errors.mjs";

export function createFacebookAdapter({ env, fetchImpl = fetch }) {
  const version = () => required(env.META_GRAPH_VERSION, "META_GRAPH_VERSION");
  const page = () => required(env.META_FACEBOOK_PAGE_ID, "META_FACEBOOK_PAGE_ID");
  const token = () => required(env.META_PAGE_ACCESS_TOKEN, "META_PAGE_ACCESS_TOKEN");
  return {
    async preflight() { await graphGet(fetchImpl, version(), page(), "id,name", token(), "facebook"); return true; },
    async publish(job) {
      const body = new URLSearchParams({ message: job.copy, access_token: token(), ...(job.destinationUrl ? { link: job.destinationUrl } : {}) });
      const response = await fetchImpl(`https://graph.facebook.com/${version()}/${page()}/feed`, { method: "POST", body });
      const payload = await graphJson(response, "facebook");
      return { providerPostId: required(payload.id, "facebook post id") };
    },
    async readBack(job) {
      const post = await graphGet(fetchImpl, version(), job.providerPostId, "id,message,permalink_url,full_picture", token(), "facebook");
      return { providerPostId: post.id, copy: post.message, assetUrl: post.full_picture, canonicalUrl: post.permalink_url, raw: post };
    },
  };
}

export function createInstagramAdapter({ env, fetchImpl = fetch }) {
  const version = () => required(env.META_GRAPH_VERSION, "META_GRAPH_VERSION");
  const user = () => required(env.META_INSTAGRAM_USER_ID, "META_INSTAGRAM_USER_ID");
  const token = () => required(env.META_INSTAGRAM_ACCESS_TOKEN, "META_INSTAGRAM_ACCESS_TOKEN");
  return {
    async preflight() { await graphGet(fetchImpl, version(), user(), "id,username", token(), "instagram"); return true; },
    async publish(job) {
      if (!job.assetUrl) throw new OrchestratorError("INVALID_JOB", "Instagram requires assetUrl");
      const container = await graphPost(fetchImpl, version(), `${user()}/media`, { image_url: job.assetUrl, caption: job.copy, access_token: token() }, "instagram");
      const published = await graphPost(fetchImpl, version(), `${user()}/media_publish`, { creation_id: required(container.id, "instagram container id"), access_token: token() }, "instagram");
      return { providerPostId: required(published.id, "instagram media id"), containerId: container.id };
    },
    async readBack(job) {
      const media = await graphGet(fetchImpl, version(), job.providerPostId, "id,caption,media_url,permalink", token(), "instagram");
      return { providerPostId: media.id, copy: media.caption, assetUrl: media.media_url, canonicalUrl: media.permalink, raw: media };
    },
  };
}

export function createThreadsAdapter({ env, fetchImpl = fetch }) {
  const version = () => required(env.THREADS_API_VERSION, "THREADS_API_VERSION");
  const user = () => required(env.META_THREADS_USER_ID, "META_THREADS_USER_ID");
  const token = () => required(env.META_THREADS_ACCESS_TOKEN, "META_THREADS_ACCESS_TOKEN");
  return {
    async preflight() { await threadsGet(fetchImpl, version(), user(), "id,username", token()); return true; },
    async publish(job) {
      const params = { media_type: job.assetUrl ? "IMAGE" : "TEXT", text: job.copy, access_token: token(), ...(job.assetUrl ? { image_url: job.assetUrl } : {}) };
      const container = await threadsPost(fetchImpl, version(), `${user()}/threads`, params);
      const published = await threadsPost(fetchImpl, version(), `${user()}/threads_publish`, { creation_id: required(container.id, "threads container id"), access_token: token() });
      return { providerPostId: required(published.id, "threads post id"), containerId: container.id };
    },
    async readBack(job) {
      const post = await threadsGet(fetchImpl, version(), job.providerPostId, "id,text,media_url,permalink", token());
      return { providerPostId: post.id, copy: post.text, assetUrl: post.media_url, canonicalUrl: post.permalink, raw: post };
    },
  };
}

async function graphGet(fetchImpl, version, id, fields, token, provider) {
  const url = new URL(`https://graph.facebook.com/${version}/${id}`); url.searchParams.set("fields", fields); url.searchParams.set("access_token", token);
  return graphJson(await fetchImpl(url), provider);
}
async function graphPost(fetchImpl, version, path, values, provider) {
  return graphJson(await fetchImpl(`https://graph.facebook.com/${version}/${path}`, { method: "POST", body: new URLSearchParams(values) }), provider);
}
async function graphJson(response, provider) { if (!response.ok) throw classifyHttpFailure(response, provider); return response.json(); }
async function threadsGet(fetchImpl, version, id, fields, token) {
  const url = new URL(`https://graph.threads.net/${version}/${id}`); url.searchParams.set("fields", fields); url.searchParams.set("access_token", token);
  return graphJson(await fetchImpl(url), "threads");
}
async function threadsPost(fetchImpl, version, path, values) {
  return graphJson(await fetchImpl(`https://graph.threads.net/${version}/${path}`, { method: "POST", body: new URLSearchParams(values) }), "threads");
}
function required(value, name) { if (!value) throw new OrchestratorError("MISSING_CREDENTIAL", `Missing ${name}`); return value; }

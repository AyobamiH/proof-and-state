import { chmod, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const API_ROOT = "https://api.cloudflare.com/client/v4";
const APP_ROOT = fileURLToPath(new URL("../", import.meta.url));
const DEFAULT_CONFIG_PATH = fileURLToPath(new URL("../wrangler.runtime.jsonc", import.meta.url));

function required(name, env) {
  const value = env[name];
  if (!value) throw new Error(`${name} is required`);
  return value.trim();
}

export function validateEnvironment(env) {
  const apiToken = required("CLOUDFLARE_API_TOKEN", env);
  const accountId = required("CLOUDFLARE_ACCOUNT_ID", env);
  const adminToken = required("ORCHESTRATOR_ADMIN_TOKEN", env);
  if (apiToken.length < 20) throw new Error("CLOUDFLARE_API_TOKEN appears malformed");
  if (/\s/.test(apiToken)) throw new Error("CLOUDFLARE_API_TOKEN appears malformed");
  if (!/^[a-f0-9]{32}$/i.test(accountId)) throw new Error("CLOUDFLARE_ACCOUNT_ID must be a 32-character hexadecimal identifier");
  if (adminToken.length !== 64) throw new Error("ORCHESTRATOR_ADMIN_TOKEN must be exactly 64 characters");
  return { apiToken, accountId, adminToken };
}

export function classifyApiToken(apiToken) {
  return String(apiToken || "").startsWith("cfat_") ? "account-owned" : "user-or-legacy";
}

function shellQuote(value) {
  return `'${String(value).replaceAll("'", "'\"'\"'")}'`;
}

export async function exportRuntimeEnvironment(credentials, environmentPath) {
  if (!environmentPath) return false;
  await writeFile(
    environmentPath,
    `CLOUDFLARE_API_TOKEN=${shellQuote(credentials.apiToken)}\nCLOUDFLARE_ACCOUNT_ID=${shellQuote(credentials.accountId)}\n`,
    { encoding: "utf8", mode: 0o600 },
  );
  await chmod(environmentPath, 0o600);
  return true;
}

async function apiRequest(path, { apiToken, fetchImpl = fetch, method = "GET", body } = {}) {
  const response = await fetchImpl(`${API_ROOT}${path}`, {
    method,
    headers: {
      authorization: `Bearer ${apiToken}`,
      ...(body ? { "content-type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload?.success) {
    const errors = payload?.errors?.map((error) => `${error.code ?? "unknown"}: ${error.message ?? "Cloudflare API error"}`).join("; ");
    throw new Error(`Cloudflare ${method} ${path} failed (${response.status}): ${errors || "invalid response"}`);
  }
  return payload;
}

async function listAll(path, credentials, fetchImpl) {
  const values = [];
  let page = 1;
  do {
    const separator = path.includes("?") ? "&" : "?";
    const payload = await apiRequest(`${path}${separator}page=${page}&per_page=100`, { ...credentials, fetchImpl });
    values.push(...(Array.isArray(payload.result) ? payload.result : []));
    const totalPages = payload.result_info?.total_pages ?? 1;
    if (page >= totalPages) break;
    page += 1;
  } while (page <= 100);
  return values;
}

export async function verifyApiToken(credentials, fetchImpl = fetch) {
  const credentialType = classifyApiToken(credentials.apiToken);
  const verificationPath = credentialType === "account-owned"
    ? `/accounts/${credentials.accountId}/tokens/verify`
    : "/user/tokens/verify";
  const payload = await apiRequest(verificationPath, { ...credentials, fetchImpl });
  if (payload.result?.status !== "active") throw new Error("CLOUDFLARE_API_TOKEN is not active");
  return {
    status: payload.result.status,
    credentialType,
  };
}

export async function verifyAccountAccess(credentials, fetchImpl = fetch) {
  try {
    const payload = await apiRequest(`/accounts/${credentials.accountId}`, { ...credentials, fetchImpl });
    if (payload.result?.id !== credentials.accountId) throw new Error("Cloudflare returned a different account identifier");
  } catch (error) {
    throw new Error(`The token is active but cannot read CLOUDFLARE_ACCOUNT_ID. Check that the token resource scope and saved account ID refer to the same account. ${error.message}`);
  }
}

export async function ensureD1(credentials, fetchImpl = fetch) {
  const databases = await listAll(`/accounts/${credentials.accountId}/d1/database`, credentials, fetchImpl);
  const matches = databases.filter((database) => database.name === "proof-state-gtm");
  if (matches.length > 1) throw new Error("Multiple D1 databases are named proof-state-gtm");
  if (matches[0]?.uuid) return { id: matches[0].uuid, created: false };
  const payload = await apiRequest(`/accounts/${credentials.accountId}/d1/database`, {
    ...credentials,
    fetchImpl,
    method: "POST",
    body: { name: "proof-state-gtm", jurisdiction: "eu" },
  });
  if (!payload.result?.uuid) throw new Error("Cloudflare did not return the new D1 database identifier");
  return { id: payload.result.uuid, created: true };
}

export async function ensureQueue(name, credentials, fetchImpl = fetch) {
  const queues = await listAll(`/accounts/${credentials.accountId}/queues`, credentials, fetchImpl);
  const matches = queues.filter((queue) => queue.queue_name === name);
  if (matches.length > 1) throw new Error(`Multiple Queues are named ${name}`);
  if (matches[0]?.queue_id) return { id: matches[0].queue_id, created: false };
  const payload = await apiRequest(`/accounts/${credentials.accountId}/queues`, {
    ...credentials,
    fetchImpl,
    method: "POST",
    body: { queue_name: name },
  });
  if (!payload.result?.queue_id) throw new Error(`Cloudflare did not return the ${name} Queue identifier`);
  return { id: payload.result.queue_id, created: true };
}

export async function provision({ env = process.env, fetchImpl = fetch, configPath = DEFAULT_CONFIG_PATH, secretsPath, runtimeEnvironmentPath } = {}) {
  const credentials = validateEnvironment(env);
  await exportRuntimeEnvironment(credentials, runtimeEnvironmentPath);
  const tokenEvidence = await verifyApiToken(credentials, fetchImpl);
  await verifyAccountAccess(credentials, fetchImpl);
  let database;
  try {
    database = await ensureD1(credentials, fetchImpl);
  } catch (error) {
    if (/\(401\)|\(403\)/.test(error.message)) {
      throw new Error(`The token is active and its account scope is valid, but D1 access was denied. Non-secret credential type: ${tokenEvidence.credentialType}. Confirm that this exact token object has D1 Read and Edit for the saved account; if it does, treat the response as a provider-side authorization failure. ${error.message}`);
    }
    throw error;
  }
  const primaryQueue = await ensureQueue("proof-state-gtm", credentials, fetchImpl);
  const deadLetterQueue = await ensureQueue("proof-state-gtm-dead-letter", credentials, fetchImpl);

  const template = JSON.parse(await readFile(`${APP_ROOT}wrangler.example.jsonc`, "utf8"));
  template.vars.DEPLOYMENT_SHA = env.DEPLOYMENT_SHA || env.GITHUB_SHA || "local-canary";
  template.d1_databases[0].database_id = database.id;
  await writeFile(configPath, `${JSON.stringify(template, null, 2)}\n`, { mode: 0o600 });

  if (secretsPath) {
    await writeFile(secretsPath, `${JSON.stringify({ ORCHESTRATOR_ADMIN_TOKEN: credentials.adminToken })}\n`, { mode: 0o600 });
    await chmod(secretsPath, 0o600);
  }

  return {
    configPath,
    database: { name: "proof-state-gtm", ...database },
    primaryQueue: { name: "proof-state-gtm", ...primaryQueue },
    deadLetterQueue: { name: "proof-state-gtm-dead-letter", ...deadLetterQueue },
  };
}

async function main() {
  const result = await provision({
    configPath: process.argv[2] || DEFAULT_CONFIG_PATH,
    secretsPath: process.argv[3],
    runtimeEnvironmentPath: process.argv[4],
  });
  console.log(JSON.stringify(result, null, 2));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

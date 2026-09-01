import { appendFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const API_ROOT = "https://api.cloudflare.com/client/v4";
const WORKER_NAME = "proof-state-gtm-orchestrator";

async function accountSubdomain({ accountId, apiToken, fetchImpl = fetch }) {
  const response = await fetchImpl(`${API_ROOT}/accounts/${accountId}/workers/subdomain`, {
    headers: { authorization: `Bearer ${apiToken}` },
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload?.success || !payload.result?.subdomain) {
    throw new Error(`Unable to resolve the account workers.dev subdomain (${response.status})`);
  }
  return payload.result.subdomain;
}

export function findHealthUrl(deployLog) {
  const matches = deployLog.match(/https:\/\/[^\s]+\.workers\.dev/gi) ?? [];
  const workerUrl = matches.find((value) => value.includes(WORKER_NAME));
  return workerUrl ? `${workerUrl.replace(/[),.;]+$/, "").replace(/\/$/, "")}/health` : null;
}

export function validateHealth(payload, expectedCommit) {
  if (payload?.ok !== true) throw new Error("Health response did not report ok=true");
  if (payload?.service !== WORKER_NAME) throw new Error("Health response identified the wrong service");
  if (payload?.publishingEnabled !== false) throw new Error("Canary safety failure: publishing is enabled");
  if (payload?.commit !== expectedCommit) throw new Error(`Health response commit mismatch: expected ${expectedCommit}, received ${payload?.commit ?? "missing"}`);
  return payload;
}

export async function verifyHealth({ healthUrl, expectedCommit, fetchImpl = fetch, attempts = 12, waitMs = 5000 }) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetchImpl(healthUrl, { headers: { accept: "application/json" } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return validateHealth(await response.json(), expectedCommit);
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, waitMs));
    }
  }
  throw new Error(`Health read-back failed after ${attempts} attempts: ${lastError?.message ?? "unknown error"}`);
}

async function main() {
  const deployLog = await readFile(process.argv[2], "utf8");
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  const expectedCommit = process.env.DEPLOYMENT_SHA || process.env.GITHUB_SHA;
  if (!accountId || !apiToken || !expectedCommit) throw new Error("Cloudflare credentials and deployment commit are required");
  let healthUrl = findHealthUrl(deployLog);
  if (!healthUrl) {
    const subdomain = await accountSubdomain({ accountId, apiToken });
    healthUrl = `https://${WORKER_NAME}.${subdomain}.workers.dev/health`;
  }
  const health = await verifyHealth({ healthUrl, expectedCommit });
  const evidence = { verified: true, healthUrl, ...health, verifiedAt: new Date().toISOString() };
  console.log(JSON.stringify(evidence, null, 2));
  if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `health_url=${healthUrl}\n`);
  if (process.env.GITHUB_STEP_SUMMARY) {
    await appendFile(process.env.GITHUB_STEP_SUMMARY, `## Cloudflare canary verified\n\n- Health: ${healthUrl}\n- Commit: \`${health.commit}\`\n- Publishing enabled: \`${health.publishingEnabled}\`\n`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

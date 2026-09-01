import { appendFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const VERSION_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const COMMIT_PATTERN = /^[0-9a-f]{40}$/i;

export function parseProviderJson(raw, label = "Cloudflare provider") {
  if (typeof raw !== "string" || raw.trim() === "") {
    throw new Error(`${label} read-back is missing`);
  }
  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    throw new Error(`${label} read-back is malformed JSON`);
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error(`${label} read-back must be a JSON object`);
  }
  return payload;
}

export function selectActiveVersion(deployment) {
  if (!Array.isArray(deployment?.versions) || deployment.versions.length === 0) {
    throw new Error("Cloudflare deployment status is missing active version traffic");
  }
  if (deployment.versions.length !== 1) {
    throw new Error("Cloudflare deployment is split across multiple versions");
  }
  const [active] = deployment.versions;
  if (!VERSION_ID_PATTERN.test(active?.version_id ?? "")) {
    throw new Error("Cloudflare deployment status returned a malformed active version ID");
  }
  if (active.percentage !== 100) {
    throw new Error(`Cloudflare active version must receive 100% traffic, received ${active.percentage ?? "missing"}`);
  }
  return { versionId: active.version_id, percentage: active.percentage };
}

function plainTextBinding(version, name) {
  const bindings = version?.resources?.bindings;
  if (!Array.isArray(bindings)) {
    throw new Error("Cloudflare version read-back is missing resource bindings");
  }
  const matches = bindings.filter((binding) => binding?.type === "plain_text" && binding.name === name);
  if (matches.length !== 1 || typeof matches[0].text !== "string") {
    throw new Error(`Cloudflare version read-back is missing exact ${name} plain-text binding`);
  }
  return matches[0].text;
}

export function validateDeploymentReadback({ deployment, version, expectedCommit }) {
  if (!COMMIT_PATTERN.test(expectedCommit ?? "")) {
    throw new Error("Expected deployment commit must be a full SHA");
  }
  const active = selectActiveVersion(deployment);
  if (version?.id !== active.versionId) {
    throw new Error(`Cloudflare version read-back mismatch: expected ${active.versionId}, received ${version?.id ?? "missing"}`);
  }
  const expectedMessage = `Publishing-disabled canary ${expectedCommit}`;
  const message = version?.annotations?.["workers/message"];
  if (message !== expectedMessage) {
    throw new Error(`Cloudflare version message mismatch: expected ${expectedMessage}, received ${message ?? "missing"}`);
  }
  const deploymentSha = plainTextBinding(version, "DEPLOYMENT_SHA");
  if (deploymentSha !== expectedCommit) {
    throw new Error(`Cloudflare DEPLOYMENT_SHA mismatch: expected ${expectedCommit}, received ${deploymentSha}`);
  }
  const publishingEnabled = plainTextBinding(version, "PUBLISHING_ENABLED");
  if (publishingEnabled !== "false") {
    throw new Error(`Canary safety failure: PUBLISHING_ENABLED is ${publishingEnabled}`);
  }
  return {
    verified: true,
    versionId: active.versionId,
    percentage: active.percentage,
    message,
    deploymentSha,
    publishingEnabled: false,
  };
}

async function loadProviderJson(path, label) {
  const raw = await readFile(path, "utf8").catch((error) => {
    throw new Error(`${label} read-back is missing: ${error.message}`);
  });
  return parseProviderJson(raw, label);
}

async function main() {
  const [command, deploymentPath, versionPath] = process.argv.slice(2);
  if (!command || !deploymentPath) {
    throw new Error("Usage: verify-cloudflare-deployment.mjs <active-version|validate> <deployment-status.json> [version.json]");
  }
  const deployment = await loadProviderJson(deploymentPath, "Cloudflare deployment status");
  if (command === "active-version") {
    const active = selectActiveVersion(deployment);
    console.log(active.versionId);
    if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `version_id=${active.versionId}\n`);
    return;
  }
  if (command !== "validate" || !versionPath) {
    throw new Error("Validation requires deployment status and version read-back files");
  }
  const version = await loadProviderJson(versionPath, "Cloudflare version");
  const expectedCommit = process.env.DEPLOYMENT_SHA || process.env.GITHUB_SHA;
  const evidence = validateDeploymentReadback({ deployment, version, expectedCommit });
  console.log(JSON.stringify(evidence, null, 2));
  if (process.env.GITHUB_STEP_SUMMARY) {
    await appendFile(process.env.GITHUB_STEP_SUMMARY, `## Cloudflare provider state verified\n\n- Active version: \`${evidence.versionId}\`\n- Traffic: \`${evidence.percentage}%\`\n- Commit: \`${evidence.deploymentSha}\`\n- Publishing enabled: \`${evidence.publishingEnabled}\`\n`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

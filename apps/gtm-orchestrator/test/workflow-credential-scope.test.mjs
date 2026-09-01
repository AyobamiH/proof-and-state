import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workflowUrl = new URL("../../../.github/workflows/gtm-orchestrator.yml", import.meta.url);
const provisionerUrl = new URL("../scripts/provision-cloudflare.mjs", import.meta.url);
const credentialNames = ["CLOUDFLARE_API_TOKEN", "CLOUDFLARE_ACCOUNT_ID", "ORCHESTRATOR_ADMIN_TOKEN"];

function stepBlock(job, name) {
  const marker = `      - name: ${name}\n`;
  const start = job.indexOf(marker);
  assert.notEqual(start, -1, `missing workflow step ${name}`);
  const next = job.indexOf("\n      - ", start + marker.length);
  return job.slice(start, next === -1 ? job.length : next);
}

test("production credential environment remains scoped to the exact deployment processes that need it", async () => {
  const workflow = await readFile(workflowUrl, "utf8");
  const provisioner = await readFile(provisionerUrl, "utf8");
  const jobStart = workflow.indexOf("  deploy-cloudflare-canary:\n");
  assert.notEqual(jobStart, -1);
  const job = workflow.slice(jobStart);
  const stepsStart = job.indexOf("    steps:\n");
  assert.notEqual(stepsStart, -1);
  const jobScope = job.slice(0, stepsStart);

  for (const name of credentialNames) {
    assert.doesNotMatch(jobScope, new RegExp(`${name}:`), `${name} must not be job-scoped`);
    const secretReference = `${name}: ` + "${{ secrets." + name + " }}";
    assert.equal(workflow.split(secretReference).length - 1, 1, `${name} must have one direct secret reference`);
  }

  const provision = stepBlock(job, "Provision or reuse Cloudflare resources");
  for (const name of credentialNames) assert.match(provision, new RegExp(`${name}:`));
  assert.match(provision, /cloudflare-runtime\.env/);
  assert.doesNotMatch(provisioner, /env\.GITHUB_ENV/);

  const deploy = stepBlock(job, "Deploy publishing-disabled canary");
  assert.match(deploy, /trap 'rm -f -- "\$RUNNER_TEMP\/gtm-secrets\.json"' EXIT/);
  assert.ok(deploy.indexOf("set -o pipefail") < deploy.indexOf("npx wrangler deploy"), "Wrangler failure must propagate through tee");

  const beforeProvision = job.slice(stepsStart, job.indexOf("      - name: Provision or reuse Cloudflare resources\n"));
  for (const name of credentialNames) assert.doesNotMatch(beforeProvision, new RegExp(name));

  for (const name of [
    "Apply D1 migrations",
    "Deploy publishing-disabled canary",
    "Read active Cloudflare deployment",
    "Read exact active Cloudflare version",
    "Verify exact deployment health",
  ]) {
    assert.match(stepBlock(job, name), /\. "\$RUNNER_TEMP\/cloudflare-runtime\.env"/);
  }
  assert.equal(job.split('. "$RUNNER_TEMP/cloudflare-runtime.env"').length - 1, 5, "only provider-access steps may source Cloudflare credentials");

  const activeRead = stepBlock(job, "Read active Cloudflare deployment");
  assert.ok(activeRead.indexOf("npx wrangler deployments status") < activeRead.indexOf("unset CLOUDFLARE_API_TOKEN CLOUDFLARE_ACCOUNT_ID"));
  assert.ok(activeRead.indexOf("unset CLOUDFLARE_API_TOKEN CLOUDFLARE_ACCOUNT_ID") < activeRead.indexOf("node apps/gtm-orchestrator/scripts/verify-cloudflare-deployment.mjs"));

  const localVerification = stepBlock(job, "Verify exact Cloudflare provider state");
  assert.doesNotMatch(localVerification, /cloudflare-runtime\.env|CLOUDFLARE_API_TOKEN|CLOUDFLARE_ACCOUNT_ID|ORCHESTRATOR_ADMIN_TOKEN/);

  const health = stepBlock(job, "Verify exact deployment health");
  assert.match(health, /trap 'rm -f -- "\$RUNNER_TEMP\/cloudflare-runtime\.env"' EXIT/);

  const cleanup = stepBlock(job, "Remove ephemeral credential files");
  assert.match(cleanup, /if: \$\{\{ always\(\) \}\}/);
  assert.match(cleanup, /rm -f -- "\$RUNNER_TEMP\/gtm-secrets\.json"/);
  assert.match(cleanup, /rm -f -- "\$RUNNER_TEMP\/cloudflare-runtime\.env"/);
  assert.doesNotMatch(cleanup, /\. "\$RUNNER_TEMP\/cloudflare-runtime\.env"|\$\{\{ secrets\./);
});

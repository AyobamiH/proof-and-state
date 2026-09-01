import assert from "node:assert/strict";
import test from "node:test";

import { loadGovernanceProposal, validateGovernanceProposal } from "./check-main-environment-governance.mjs";

function proposal() {
  return structuredClone(loadGovernanceProposal());
}

test("the checked-in proposals remain truthful, disabled, and owner-bound", () => {
  assert.doesNotThrow(() => validateGovernanceProposal(proposal()));
});

test("main cannot claim active protection before provider activation", () => {
  const candidate = proposal();
  candidate.main.activation.enforcement = "active";
  assert.throws(() => validateGovernanceProposal(candidate), /falsely claims activation readiness/);
});

test("an invented second reviewer cannot enter the proposal", () => {
  const candidate = proposal();
  candidate.main.activation.secondTrustedHumanReviewer = "pending-reviewer";
  assert.throws(() => validateGovernanceProposal(candidate), /falsely claims activation readiness/);
});

test("required contexts cannot be filtered by changed paths", () => {
  const candidate = proposal();
  candidate.gtmWorkflow = candidate.gtmWorkflow.replace("  pull_request:\n", "  pull_request:\n    paths:\n      - apps/**\n");
  assert.throws(() => validateGovernanceProposal(candidate), /changed-path filter/);
});

test("required portfolio-state cannot be emitted by a partial manual or scheduled run", () => {
  for (const trigger of ["  workflow_dispatch:\n", '  schedule:\n    - cron: "0 0 * * *"\n']) {
    const candidate = proposal();
    candidate.governanceWorkflow = candidate.governanceWorkflow.replace("  pull_request:\n", `  pull_request:\n${trigger}`);
    assert.throws(() => validateGovernanceProposal(candidate), /required portfolio-state producers/);
  }
});

test("only the exact reviewed Actions may produce governed checks", () => {
  const candidate = proposal();
  candidate.governanceWorkflow = candidate.governanceWorkflow.replace(
    "actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683",
    "attacker/action@1111111111111111111111111111111111111111",
  );
  assert.throws(() => validateGovernanceProposal(candidate), /exact reviewed dependencies/);
});

test("pull requests and pushes cannot acquire deployment authority", () => {
  for (const eventName of ["push", "pull_request"]) {
    const candidate = proposal();
    candidate.gtmWorkflow = candidate.gtmWorkflow.replace(
      "github.event_name == 'workflow_dispatch'",
      `github.event_name == '${eventName}'`,
    );
    assert.throws(() => validateGovernanceProposal(candidate), /manual main-branch dispatch/);
  }
});

test("deployment cannot bypass contracts, environment review, or exact-main checkout", () => {
  for (const [from, message] of [
    ["    needs: contract-tests\n", /deployment is not restricted/],
    ["    environment: gtm-production\n", /identity or environment boundary/],
    ["          ref: ${{ env.DEPLOYMENT_SHA }}\n", /identity or environment boundary/],
    ["      DEPLOYMENT_SHA: ${{ github.sha }}\n", /identity or environment boundary/],
  ]) {
    const candidate = proposal();
    candidate.gtmWorkflow = candidate.gtmWorkflow.replace(from, "");
    assert.throws(() => validateGovernanceProposal(candidate), message);
  }
});

test("publishing must be disabled before any provider access", () => {
  const enabled = proposal();
  enabled.wranglerExample.vars.PUBLISHING_ENABLED = "true";
  assert.throws(() => validateGovernanceProposal(enabled), /publishing is not forced disabled/);

  const late = proposal();
  late.provisioner = late.provisioner.replace(
    "const template = enforcePublishingDisabledTemplate(\n    JSON.parse(await readFile(`${APP_ROOT}wrangler.example.jsonc`, \"utf8\")),\n  );",
    "const template = JSON.parse(await readFile(`${APP_ROOT}wrangler.example.jsonc`, \"utf8\"));\n  await verifyApiToken(credentials, fetchImpl);\n  enforcePublishingDisabledTemplate(template);",
  );
  assert.throws(() => validateGovernanceProposal(late), /publishing is not forced disabled/);
});

test("environment protection cannot retain administrator bypass or unrestricted refs", () => {
  const bypass = proposal();
  bypass.environment.proposedProtection.allowAdministratorsToBypass = true;
  assert.throws(() => validateGovernanceProposal(bypass), /consequence boundary is unsafe/);

  const refs = proposal();
  refs.environment.proposedProtection.deploymentRefs.protectedBranchesOnly = false;
  assert.throws(() => validateGovernanceProposal(refs), /consequence boundary is unsafe/);
});

test("exact-main and publishing truth cannot inflate", () => {
  const deployed = proposal();
  deployed.ledger.products.find(({ id }) => id === "proof-and-state").deployment.exactMainStatus = "DEPLOYED";
  assert.throws(() => validateGovernanceProposal(deployed), /canonical portfolio truth/);

  const enabled = proposal();
  enabled.ledger.products.find(({ id }) => id === "proof-and-state").deployment.publishingEnabled = true;
  assert.throws(() => validateGovernanceProposal(enabled), /canonical portfolio truth/);
});

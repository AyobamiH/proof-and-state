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

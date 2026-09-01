import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { validate, validateTransition } from "./render-portfolio-state.mjs";

const ledgerUrl = new URL("../governance/portfolio-ledger.json", import.meta.url);
const ledger = JSON.parse(await readFile(ledgerUrl, "utf8"));

test("current portfolio ledger satisfies reconciliation invariants", () => {
  assert.doesNotThrow(() => validate(structuredClone(ledger)));
});

test("a stale open-PR claim cannot retain known merge evidence", () => {
  const stale = structuredClone(ledger);
  const state = stale.stateReconciliations.find(({ id }) => id === "PF-STATE-GTM-001");
  state.pullRequest.state = "open";
  assert.throws(() => validate(stale), /non-merged PR cannot retain merge evidence/);
});

test("an established merge cannot regress to a stale open state", () => {
  const stale = structuredClone(ledger);
  const state = stale.stateReconciliations.find(({ id }) => id === "PF-STATE-GTM-001");
  state.pullRequest.state = "open";
  delete state.pullRequest.mergeCommit;
  delete state.pullRequest.mergeTree;
  assert.throws(() => validateTransition(ledger, stale), /cannot regress an established merged PR/);
});

test("a merged PR tree must match the recorded main tree", () => {
  const inconsistent = structuredClone(ledger);
  const state = inconsistent.stateReconciliations.find(({ id }) => id === "PF-STATE-GTM-001");
  state.pullRequest.mergeTree = "0".repeat(40);
  assert.throws(() => validate(inconsistent), /mergeTree must match main\.tree/);
});

test("a PR-head deployment cannot be promoted to exact-main verification", () => {
  const inflated = structuredClone(ledger);
  const state = inflated.stateReconciliations.find(({ id }) => id === "PF-STATE-GTM-001");
  state.exactMainDeployment.status = "verified";
  assert.throws(() => validate(inflated), /exact-main verification must match the main commit/);
});

test("deployment identity must bind to the recorded PR-head canary", () => {
  const badCommit = structuredClone(ledger);
  const badCommitState = badCommit.stateReconciliations.find(({ id }) => id === "PF-STATE-GTM-001");
  badCommitState.deployment.subjectCommit = "0".repeat(40);
  assert.throws(() => validate(badCommit), /deployment\.subjectCommit must match the recorded PR head/);

  const badTree = structuredClone(ledger);
  const badTreeState = badTree.stateReconciliations.find(({ id }) => id === "PF-STATE-GTM-001");
  badTreeState.deployment.subjectTree = "0".repeat(40);
  assert.throws(() => validate(badTree), /deployment\.subjectTree must match the recorded PR-head tree/);

  const missingRun = structuredClone(ledger);
  const missingRunState = missingRun.stateReconciliations.find(({ id }) => id === "PF-STATE-GTM-001");
  missingRunState.deployment.workflowRun = 1;
  assert.throws(() => validate(missingRun), /deployment must bind to a successful recorded PR-head canary check/);
});

test("checks cannot cite an unknown commit subject", () => {
  const inconsistent = structuredClone(ledger);
  const state = inconsistent.stateReconciliations.find(({ id }) => id === "PF-STATE-GTM-001");
  state.checks[0].subjectCommit = "0".repeat(40);
  assert.throws(() => validate(inconsistent), /check\.subjectCommit must match main, PR head, or merge/);
});

test("verification and exact-main state cannot contradict", () => {
  const inconsistent = structuredClone(ledger);
  const state = inconsistent.stateReconciliations.find(({ id }) => id === "PF-STATE-GTM-001");
  state.verification.status = "verified";
  assert.throws(() => validate(inconsistent), /verification\.status must match exactMainDeployment\.status/);
});

test("the publishing-disabled deployment cannot silently become enabled", () => {
  const unsafe = structuredClone(ledger);
  const state = unsafe.stateReconciliations.find(({ id }) => id === "PF-STATE-GTM-001");
  state.deployment.publishingEnabled = true;
  assert.throws(() => validate(unsafe), /publishingEnabled must remain false/);
});

test("verified deployment evidence is immutable across ledger transitions", () => {
  const mutations = {
    subjectCommit: "0".repeat(40),
    subjectTree: "0".repeat(40),
    workflowRun: 1,
    version: "00000000-0000-0000-0000-000000000000",
    publishingEnabled: true,
  };
  for (const [field, replacement] of Object.entries(mutations)) {
    const rewritten = structuredClone(ledger);
    const state = rewritten.stateReconciliations.find(({ id }) => id === "PF-STATE-GTM-001");
    state.deployment[field] = replacement;
    assert.throws(() => validateTransition(ledger, rewritten), new RegExp(`cannot rewrite verified deployment ${field}`));
  }
});

test("source-ledger URLs and repository pins are exact", () => {
  const badUrl = structuredClone(ledger);
  badUrl.sourceLedgers[0].url = "https://github.com/AyobamiH/donestate/blob/main/governance/project-ledger.json";
  assert.throws(() => validate(badUrl), /url must exactly bind repository, commit, and path/);

  const badPin = structuredClone(ledger);
  const state = badPin.stateReconciliations.find(({ id }) => id === "PF-STATE-DONESTATE-001");
  state.main.commit = "0".repeat(40);
  assert.throws(() => validate(badPin), /main\.commit must match the DoneState source-ledger pin/);
});

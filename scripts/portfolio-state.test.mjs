import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { render, validate, validateTransition } from "./render-portfolio-state.mjs";

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

test("the product matrix requires exactly three canonical complete entries", () => {
  const missingProduct = structuredClone(ledger);
  missingProduct.products.pop();
  assert.throws(() => validate(missingProduct), /products must contain exactly 3 entries/);

  const missingField = structuredClone(ledger);
  delete missingField.products[0].operations;
  assert.throws(() => validate(missingField), /donestate\.operations is required/);

  const unsupportedField = structuredClone(ledger);
  unsupportedField.products[0].chatgpt.manualStatus = "PUBLISHED";
  assert.throws(() => validate(unsupportedField), /chatgpt\.manualStatus is not supported/);
});

test("product and channel statuses use only the exact vocabulary", () => {
  const invalid = structuredClone(ledger);
  invalid.products[0].main.status = "verified";
  assert.throws(() => validate(invalid), /outside the product status vocabulary/);

  const adHocLifecycle = structuredClone(ledger);
  adHocLifecycle.products[2].chatgpt.states.PUBLISHED = "public-ish";
  assert.throws(() => validate(adHocLifecycle), /must be PUBLISHED or UNPROVEN/);

  const invalidProtection = structuredClone(ledger);
  invalidProtection.products[0].main.protection = "weak";
  assert.throws(() => validate(invalidProtection), /outside the branch protection vocabulary/);
});

test("channel lifecycle promotion requires consequences and exact ordering", () => {
  const impossible = structuredClone(ledger);
  const channel = impossible.products[2].chatgpt;
  channel.states.PUBLISHED = "PUBLISHED";
  channel.currentState = "PUBLISHED";
  assert.throws(() => validate(impossible), /PUBLISHED requires APPROVED/);

  const outOfOrder = structuredClone(ledger);
  outOfOrder.products[0].chatgpt.currentState = "SUBMITTED";
  assert.throws(() => validate(outOfOrder), /currentState must be highest evidenced state IN_REVIEW/);
});

test("DoneState Marketplace owner-preview metadata stays submitted and in review", () => {
  const doneState = ledger.products.find(({ id }) => id === "donestate");
  const channel = doneState.githubMarketplace;
  assert.equal(channel.displayedInstallCount, 1);
  assert.equal(channel.displayedInstallCountStatus, "IN_REVIEW");
  assert.equal(channel.currentState, "IN_REVIEW");
  assert.equal(channel.states.SUBMITTED, "SUBMITTED");
  assert.equal(channel.states.IN_REVIEW, "IN_REVIEW");
  for (const state of ["APPROVED", "PUBLISHED", "DISCOVERABLE", "INSTALLED", "LIVE_OUTCOME_VERIFIED"]) {
    assert.equal(channel.states[state], "UNPROVEN");
  }
  assert.match(channel.reason, /Pending for publish/);
  assert.match(channel.reason, /draft and unpublished/);

  const inflated = structuredClone(ledger);
  const inflatedChannel = inflated.products.find(({ id }) => id === "donestate").githubMarketplace;
  inflatedChannel.states.INSTALLED = "INSTALLED";
  inflatedChannel.currentState = "INSTALLED";
  assert.throws(() => validate(inflated), /INSTALLED requires DISCOVERABLE/);
});

test("all three main branches retain the authenticated unprotected observation", () => {
  assert.deepEqual(ledger.products.map((product) => product.main.protection), ["UNPROTECTED", "UNPROTECTED", "UNPROTECTED"]);
});

test("the owner action queue is single, ordered, deduplicated, and owner-only", () => {
  const required = [
    "OWNER-TRUST-001",
    "OWNER-APP-001",
    "OWNER-REVIEW-001",
    "OWNER-CONTROLS-001",
    "OWNER-MERGE-001",
    "OWNER-CANARY-001",
    "OWNER-PRIVACY-001",
    "OWNER-TERMS-001",
    "OWNER-SUBMISSION-001",
    "OWNER-PUBLICATION-001",
    "OWNER-PILOT-001",
    "OWNER-RELEASE-001",
  ];
  assert.deepEqual(ledger.ownerActionQueue.map(({ id }) => id), required);
  assert.ok(ledger.ownerActionQueue.every(({ agentExecutable }) => agentExecutable === false));

  const executable = structuredClone(ledger);
  executable.ownerActionQueue[0].agentExecutable = true;
  assert.throws(() => validate(executable), /agentExecutable must remain false/);

  const outOfOrder = structuredClone(ledger);
  outOfOrder.ownerActionQueue[1].order = 3;
  assert.throws(() => validate(outOfOrder), /order must be contiguous and match queue position/);

  const forwardDependency = structuredClone(ledger);
  forwardDependency.ownerActionQueue[0].prerequisites = ["OWNER-RELEASE-001"];
  assert.throws(() => validate(forwardDependency), /must appear earlier in the queue/);

  const duplicated = structuredClone(ledger);
  duplicated.ownerActionQueue[1].action = duplicated.ownerActionQueue[0].action;
  assert.throws(() => validate(duplicated), /action duplicates another owner action/);
});

test("the exact-main repair reconciliation follows the hardened remote head", () => {
  const state = ledger.stateReconciliations.find(({ id }) => id === "PF-STATE-PROOF-PR22");
  assert.equal(state.pullRequest.headCommit, "f8af049f7adbbf63496f284a3589e97db89e7475");
  assert.equal(state.pullRequest.headTree, "1742a6c08fffbd43d705ac8df74ebbcadd57ceaa");
  assert.deepEqual(state.checks.map(({ workflowRun, conclusion }) => [workflowRun, conclusion]), [
    [33484884571, "success"],
    [33484884414, "success"],
    [33484884414, "skipped"],
  ]);
});

test("product deployment and channel sources cannot cross identity boundaries", () => {
  const exactMainInflation = structuredClone(ledger);
  exactMainInflation.products.find(({ id }) => id === "proof-and-state").deployment.exactMainStatus = "DEPLOYED";
  assert.throws(() => validate(exactMainInflation), /exactMainStatus must be UNPROVEN when deployed sha differs from main/);

  const sourceMismatch = structuredClone(ledger);
  sourceMismatch.products.find(({ id }) => id === "donestate").githubMarketplace.sourceSha = "0".repeat(40);
  assert.throws(() => validate(sourceMismatch), /sourceSha must match the deployed product sha/);

  const versionMismatch = structuredClone(ledger);
  versionMismatch.products.find(({ id }) => id === "opstruth").chatgpt.version = "9.9.9";
  assert.throws(() => validate(versionMismatch), /version must match the deployed product version/);
});

test("product observations must be fresh and evidence URLs exact", () => {
  const stale = structuredClone(ledger);
  stale.products[0].observedAt = "2026-08-20T00:00:00Z";
  assert.throws(() => validate(stale), /observedAt is stale by more than 7 days/);

  const missingEvidence = structuredClone(ledger);
  missingEvidence.products[0].evidenceUrls = [];
  assert.throws(() => validate(missingEvidence), /evidenceUrls must be a non-empty array/);

  const invalidEvidence = structuredClone(ledger);
  invalidEvidence.products[0].evidenceUrls[0] = "repository main";
  assert.throws(() => validate(invalidEvidence), /must contain only HTTPS URLs/);
});

test("every product deployment remains publishing-disabled", () => {
  const unsafe = structuredClone(ledger);
  unsafe.products.find(({ id }) => id === "opstruth").deployment.publishingEnabled = true;
  assert.throws(() => validate(unsafe), /opstruth\.deployment\.publishingEnabled must remain false/);
});

test("established channel evidence cannot silently downgrade", () => {
  const downgraded = structuredClone(ledger);
  const channel = downgraded.products.find(({ id }) => id === "opstruth").chatgpt;
  channel.states.DISCOVERABLE = "UNPROVEN";
  channel.currentState = "PUBLISHED";
  assert.throws(() => validateTransition(ledger, downgraded), /chatgpt\.DISCOVERABLE cannot lose established evidence/);
});

test("ledger prose rejects em dashes", () => {
  const invalid = structuredClone(ledger);
  invalid.products[0].nextOwnerAction = `Review ${String.fromCodePoint(0x2014)} then merge.`;
  assert.throws(() => validate(invalid), /cannot contain an em dash/);
});

test("generated portfolio state contains one compact six-row channel matrix", () => {
  const rendered = render(ledger);
  assert.equal(rendered.match(/## Product and channel matrix/g)?.length, 1);
  assert.equal(rendered.match(/\| (DoneState|OpsTruth|Proof & State) \| (ChatGPT|GitHub Marketplace)/g)?.length, 6);
  assert.match(rendered, /displayed installs=`1` \(IN_REVIEW\)/);
  assert.match(rendered, /current=IN_REVIEW<br>SUBMITTED -> IN_REVIEW/);
  assert.match(rendered, /publishingEnabled=`false`/);
  assert.doesNotMatch(rendered, new RegExp(String.fromCodePoint(0x2014)));
});

test("generated portfolio state contains one owner-only queue view", () => {
  const rendered = render(ledger);
  assert.equal(rendered.match(/## Owner-only action queue/g)?.length, 1);
  assert.equal(rendered.match(/\| \d+ \| \*\*/g)?.length, ledger.ownerActionQueue.length);
  assert.match(rendered, /agentExecutable=`false`/);
});

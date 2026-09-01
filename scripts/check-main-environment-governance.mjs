import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);

function fail(message) {
  throw new Error(`governance proposal: ${message}`);
}

function same(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) fail(message);
}

export function validateGovernanceProposal({ main, environment, ledger, codeowners, governanceWorkflow, gtmWorkflow }) {
  if (main.schema !== "proof-state.main-ruleset-proposal.v1"
    || main.repository !== "AyobamiH/proof-and-state"
    || main.repositoryId !== 1350608000) fail("main identity is not exact");
  if (main.providerObservation.protection !== "UNPROTECTED"
    || main.providerObservation.branch !== "main"
    || main.providerObservation.headSha !== "2ad721357993a92dfc4d26b2b3ea4a9239ab95d6") {
    fail("main provider observation drifted");
  }
  if (main.activation.status !== "BLOCKED" || main.activation.enforcement !== "disabled"
    || main.activation.ownerApprovalRecorded !== false
    || main.activation.secondTrustedHumanReviewer !== null
    || main.activation.blockers.length < 1) fail("main proposal falsely claims activation readiness");
  same(main.target, { include: ["refs/heads/main"], exclude: [] }, "main target drifted");
  same(main.bypassActors, [{
    actorType: "User",
    actorId: 47716486,
    bypassMode: "always",
    scope: "AyobamiH user 47716486",
    purpose: "Auditable emergency recovery only; every use requires a tracked incident and post-event review",
  }], "emergency authority is not owner-bound");
  if (!main.rules.deletion.blocked || !main.rules.nonFastForward.blocked) fail("destructive ref updates are not blocked");
  const pull = main.rules.pullRequest;
  if (!pull.required || pull.requiredApprovingReviewCount !== 1 || !pull.requireCodeOwnerReview
    || !pull.dismissStaleReviewsOnPush || !pull.requireLastPushApproval || !pull.requireConversationResolution) {
    fail("pull-request review rules are incomplete");
  }
  same(main.rules.requiredStatusChecks.checks, [
    { context: "portfolio-state", integrationId: 15368 },
    { context: "contract-tests", integrationId: 15368 },
  ], "required checks are not exact");
  if (!main.rules.requiredStatusChecks.strictRequiredStatusChecksPolicy) fail("required checks are not strict");
  same(main.excludedChecks.map(({ context }) => context), ["deploy-cloudflare-canary"], "deployment entered the merge check set");

  if (environment.schema !== "proof-state.environment-protection-proposal.v1"
    || environment.repository !== main.repository || environment.environment !== "gtm-production") {
    fail("environment identity is not exact");
  }
  const observed = environment.providerObservation;
  if (observed.status !== "UNPROTECTED" || observed.requiredReviewerCount !== 0
    || observed.waitTimerMinutes !== 0 || observed.allowAdministratorsToBypass !== true
    || observed.deploymentRefs !== "NO_RESTRICTION") fail("environment provider truth drifted");
  const secretNames = ["CLOUDFLARE_ACCOUNT_ID", "CLOUDFLARE_API_TOKEN", "ORCHESTRATOR_ADMIN_TOKEN"];
  same(observed.secretNames, secretNames, "observed environment secret names drifted");
  if (environment.activation.status !== "BLOCKED" || environment.activation.applyAuthorized !== false
    || environment.activation.secondTrustedHumanReviewer !== null || environment.activation.blockers.length < 1) {
    fail("environment proposal falsely claims activation readiness");
  }
  const proposed = environment.proposedProtection;
  if (proposed.requiredReviewerCount !== 1 || proposed.requiredReviewer !== null
    || !proposed.preventSelfReview || proposed.allowAdministratorsToBypass !== false
    || proposed.waitTimerMinutes !== 0 || !proposed.deploymentRefs.protectedBranchesOnly
    || proposed.deploymentRefs.customPatterns.length !== 0) fail("environment consequence boundary is unsafe");
  same(proposed.secretNames, secretNames, "proposed environment secret names drifted");

  if (!codeowners.includes("* @AyobamiH") || /SECOND|PENDING|TBD/.test(codeowners)) {
    fail("CODEOWNERS must name only the current real owner");
  }
  for (const workflow of [governanceWorkflow, gtmWorkflow]) {
    const uses = [...workflow.matchAll(/^\s*- uses:\s*([^\s#]+)/gm)].map((match) => match[1]);
    if (uses.length < 1 || uses.some((reference) => !/@[a-f0-9]{40}$/.test(reference))) {
      fail("workflow actions must use immutable commit references");
    }
  }
  if (/^\s{4}paths:/m.test(gtmWorkflow)) fail("GTM required checks retain a changed-path filter");
  if (!/^\s{2}pull_request:\s*$/m.test(gtmWorkflow) || !/^\s{2}push:\s*$/m.test(gtmWorkflow)) {
    fail("GTM contract checks do not cover every pull request and main push");
  }
  const deployBlock = gtmWorkflow.split("  deploy-cloudflare-canary:")[1]?.split("    runs-on:")[0] ?? "";
  if (!deployBlock.includes("github.event_name == 'workflow_dispatch'")
    || !deployBlock.includes("github.ref == 'refs/heads/main'")
    || deployBlock.includes("github.event_name == 'push'")
    || deployBlock.includes("github.event_name == 'pull_request'")) {
    fail("deployment is not restricted to a manual main-branch dispatch");
  }
  if (!gtmWorkflow.includes("publishing-disabled")
    || !gtmWorkflow.includes("verify-cloudflare-deployment.mjs validate")) {
    fail("publishing-disabled deployment invariant is missing");
  }

  const product = ledger.products.find(({ id }) => id === "proof-and-state");
  if (!product || product.main.protection !== "UNPROTECTED"
    || product.deployment.exactMainStatus !== "UNPROVEN"
    || product.deployment.publishingEnabled !== false) fail("canonical portfolio truth contradicts the proposal");
  if (!ledger.products.every(({ main }) => main.protection === "UNPROTECTED")) {
    fail("a portfolio main branch falsely claims protection");
  }
}

export function loadGovernanceProposal() {
  return {
    main: JSON.parse(readFileSync(new URL("governance/main-ruleset.proposed.json", root), "utf8")),
    environment: JSON.parse(readFileSync(new URL("governance/gtm-production.proposed.json", root), "utf8")),
    ledger: JSON.parse(readFileSync(new URL("governance/portfolio-ledger.json", root), "utf8")),
    codeowners: readFileSync(new URL(".github/CODEOWNERS", root), "utf8"),
    governanceWorkflow: readFileSync(new URL(".github/workflows/governance.yml", root), "utf8"),
    gtmWorkflow: readFileSync(new URL(".github/workflows/gtm-orchestrator.yml", root), "utf8"),
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  validateGovernanceProposal(loadGovernanceProposal());
  console.log("main and environment governance proposal: valid and blocked");
}

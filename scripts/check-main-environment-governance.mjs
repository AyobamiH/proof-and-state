import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);

function fail(message) {
  throw new Error(`governance proposal: ${message}`);
}

function same(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) fail(message);
}

const CHECKOUT = "actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683";
const SETUP_NODE = "actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020";

function actionReferences(workflow) {
  return [...workflow.matchAll(/^\s*- uses:\s*([^\s#]+)/gm)].map((match) => match[1]);
}

export function validateGovernanceProposal({
  main,
  environment,
  ledger,
  codeowners,
  governanceWorkflow,
  governanceAuditWorkflow,
  gtmWorkflow,
  wranglerExample,
  provisioner,
}) {
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
  same(actionReferences(governanceWorkflow), [CHECKOUT, SETUP_NODE], "governance actions are not the exact reviewed dependencies");
  same(actionReferences(governanceAuditWorkflow), [CHECKOUT, SETUP_NODE], "governance audit actions are not the exact reviewed dependencies");
  same(actionReferences(gtmWorkflow), [CHECKOUT, SETUP_NODE, CHECKOUT, SETUP_NODE], "GTM actions are not the exact reviewed dependencies");
  for (const workflow of [governanceWorkflow, governanceAuditWorkflow, gtmWorkflow]) {
    if (!/\npermissions:\n  contents: read\n/.test(workflow)) fail("workflow permissions are not read-only");
  }
  if (/^\s{2}(?:schedule|workflow_dispatch):/m.test(governanceWorkflow)
    || !/^\s{2}pull_request:\s*$/m.test(governanceWorkflow)
    || !/^\s{2}push:\s*$/m.test(governanceWorkflow)
    || !governanceWorkflow.includes('run: node scripts/check-governance-impact.mjs "$GOVERNANCE_BASE_SHA"')
    || /- if:/.test(governanceWorkflow)) {
    fail("required portfolio-state producers are not limited to full pull-request and push validation");
  }
  if (!/^\s{2}schedule:/m.test(governanceAuditWorkflow)
    || !/^\s{2}workflow_dispatch:/m.test(governanceAuditWorkflow)
    || !/^  portfolio-audit:/m.test(governanceAuditWorkflow)
    || /^  portfolio-state:/m.test(governanceAuditWorkflow)) {
    fail("manual and scheduled governance audit does not use a distinct context");
  }
  if (/^\s{4}paths:/m.test(gtmWorkflow)) fail("GTM required checks retain a changed-path filter");
  if (!/^\s{2}pull_request:\s*$/m.test(gtmWorkflow) || !/^\s{2}push:\s*$/m.test(gtmWorkflow)) {
    fail("GTM contract checks do not cover every pull request and main push");
  }
  const deployBlock = gtmWorkflow.split("  deploy-cloudflare-canary:")[1]?.split("    runs-on:")[0] ?? "";
  const deployJob = gtmWorkflow.split("  deploy-cloudflare-canary:")[1] ?? "";
  if (!deployBlock.includes("needs: contract-tests")
    || !deployBlock.includes("github.event_name == 'workflow_dispatch'")
    || !deployBlock.includes("github.ref == 'refs/heads/main'")
    || deployBlock.includes("github.event_name == 'push'")
    || deployBlock.includes("github.event_name == 'pull_request'")) {
    fail("deployment is not restricted to a manual main-branch dispatch");
  }
  if (!deployJob.includes("environment: gtm-production")
    || !deployJob.includes("DEPLOYMENT_SHA: ${{ github.sha }}")
    || !deployJob.includes("ref: ${{ env.DEPLOYMENT_SHA }}")) {
    fail("deployment identity or environment boundary is not exact");
  }
  if (wranglerExample?.vars?.PUBLISHING_ENABLED !== "false"
    || !provisioner.includes("const template = enforcePublishingDisabledTemplate(")
    || !provisioner.includes("template.vars.PUBLISHING_ENABLED = \"false\"")
    || provisioner.indexOf("const template = enforcePublishingDisabledTemplate(") > provisioner.indexOf("await verifyApiToken(credentials, fetchImpl);")) {
    fail("publishing is not forced disabled before provider access");
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
  const trustAction = ledger.ownerActionQueue.find(({ id }) => id === "OWNER-TRUST-001")?.action ?? "";
  const controlsAction = ledger.ownerActionQueue.find(({ id }) => id === "OWNER-CONTROLS-001")?.action ?? "";
  if (!trustAction.includes("write access required for CODEOWNERS")
    || !controlsAction.includes("add the reviewer to CODEOWNERS")) {
    fail("reviewer access expansion is not an explicit owner decision");
  }
}

export function loadGovernanceProposal() {
  return {
    main: JSON.parse(readFileSync(new URL("governance/main-ruleset.proposed.json", root), "utf8")),
    environment: JSON.parse(readFileSync(new URL("governance/gtm-production.proposed.json", root), "utf8")),
    ledger: JSON.parse(readFileSync(new URL("governance/portfolio-ledger.json", root), "utf8")),
    codeowners: readFileSync(new URL(".github/CODEOWNERS", root), "utf8"),
    governanceWorkflow: readFileSync(new URL(".github/workflows/governance.yml", root), "utf8"),
    governanceAuditWorkflow: readFileSync(new URL(".github/workflows/governance-audit.yml", root), "utf8"),
    gtmWorkflow: readFileSync(new URL(".github/workflows/gtm-orchestrator.yml", root), "utf8"),
    wranglerExample: JSON.parse(readFileSync(new URL("apps/gtm-orchestrator/wrangler.example.jsonc", root), "utf8")),
    provisioner: readFileSync(new URL("apps/gtm-orchestrator/scripts/provision-cloudflare.mjs", root), "utf8"),
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  validateGovernanceProposal(loadGovernanceProposal());
  console.log("main and environment governance proposal: valid and blocked");
}

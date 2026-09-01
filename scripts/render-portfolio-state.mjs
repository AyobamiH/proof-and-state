import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const root = new URL("../", import.meta.url);
const ledgerUrl = new URL("governance/portfolio-ledger.json", root);
const outputUrl = new URL("docs/PORTFOLIO-STATE.md", root);
const allowed = new Set(["active", "planned", "blocked", "deferred", "complete"]);
const evidenceStates = new Set(["verified", "unproven", "failed", "not_assessed"]);
const checkConclusions = new Set(["success", "failure", "cancelled", "skipped", "pending"]);
const exactMainScope = "Exact-main runtime deployment";
const productStatuses = new Set([
  "IMPLEMENTED",
  "CI_VERIFIED",
  "DEPLOYED",
  "READY_FOR_LIVE_VALIDATION",
  "PRODUCTION_READY",
  "SUBMITTED",
  "IN_REVIEW",
  "APPROVED",
  "PUBLISHED",
  "DISCOVERABLE",
  "INSTALLED",
  "LIVE_OUTCOME_VERIFIED",
  "MARKET_VALIDATED",
  "UNPROVEN",
  "BLOCKED_OWNER_ACTION"
]);
const chatgptLifecycle = ["DRAFT", "DEVELOPER_MODE_VERIFIED", "SUBMITTED", "IN_REVIEW", "APPROVED", "PUBLISHED", "DISCOVERABLE", "INSTALLED", "LIVE_OUTCOME_VERIFIED"];
const marketplaceLifecycle = ["DRAFT", "SUBMITTED", "IN_REVIEW", "APPROVED", "PUBLISHED", "DISCOVERABLE", "INSTALLED", "LIVE_OUTCOME_VERIFIED"];
const productIdentities = new Map([
  ["donestate", { name: "DoneState", role: "Bounded execution and maintenance plane", repository: "AyobamiH/donestate" }],
  ["opstruth", { name: "OpsTruth", role: "Independent read-only verification plane", repository: "AyobamiH/opstruth-chatgpt-plugin" }],
  ["proof-and-state", { name: "Proof & State", role: "Parent governance and control plane", repository: "AyobamiH/proof-and-state" }]
]);
const artifactTypes = new Set(["OAUTH_APP", "GITHUB_APP", "GITHUB_ACTION", "UNPROVEN"]);
const billingDecisions = new Set(["FREE", "PAID", "NOT_APPLICABLE", "UNPROVEN"]);
const maintenanceModes = new Set(["pr_only", "continuous", "UNPROVEN"]);
const riskSeverities = new Set(["P0", "P1"]);
const branchProtectionStates = new Set(["PROTECTED", "UNPROTECTED", "UNPROVEN"]);
const ownerActionPhases = new Set(["TRUST", "PREPARE", "REVIEW", "GOVERN", "MERGE", "VALIDATE", "LEGAL", "DISTRIBUTE", "PILOT", "RELEASE"]);
const maximumObservationAgeMs = 7 * 24 * 60 * 60 * 1000;

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const ledger = JSON.parse(await readFile(ledgerUrl, "utf8"));
  validate(ledger);
  const rendered = render(ledger);
  if (process.argv.includes("--check")) {
    const current = await readFile(outputUrl, "utf8").catch(() => "");
    if (current !== rendered) throw new Error("docs/PORTFOLIO-STATE.md is stale; run node scripts/render-portfolio-state.mjs");
    console.log("portfolio state: current");
  } else {
    await writeFile(outputUrl, rendered);
    console.log("portfolio state: rendered");
  }
}

export function validate(value) {
  require(value.schemaVersion === 2, "schemaVersion must be 2");
  rejectEmDash(value);
  for (const field of ["portfolio", "updatedAt", "governanceRule"]) text(value[field], field);
  date(value.updatedAt, "updatedAt");
  require(Array.isArray(value.sourceLedgers), "sourceLedgers must be an array");
  require(Array.isArray(value.products), "products must be an array");
  require(Array.isArray(value.ownerActionQueue) && value.ownerActionQueue.length, "ownerActionQueue is required");
  require(Array.isArray(value.stateReconciliations) && value.stateReconciliations.length, "stateReconciliations are required");
  require(Array.isArray(value.recoveryOrder) && value.recoveryOrder.length, "recoveryOrder is required");
  require(Array.isArray(value.workItems) && value.workItems.length, "workItems are required");
  require(Array.isArray(value.evidenceStories), "evidenceStories must be an array");
  ids(value.stateReconciliations, "state reconciliation");
  const itemIds = ids(value.workItems, "work item");
  const evidenceIds = ids(value.evidenceStories, "evidence story");
  ids(value.recoveryOrder, "recovery stage");
  validateProducts(value.products, value.updatedAt);
  validateOwnerActionQueue(value.ownerActionQueue, evidenceIds);
  const ordered = value.recoveryOrder.flatMap((stage) => stage.workItemIds);
  require(ordered.length === new Set(ordered).size, "each work item must occur in one recovery stage");
  for (const id of itemIds) require(ordered.includes(id), `${id} is missing from recoveryOrder`);
  for (const stage of value.recoveryOrder) {
    text(stage.title, `${stage.id}.title`); text(stage.exitCriterion, `${stage.id}.exitCriterion`);
    for (const id of stage.workItemIds) require(itemIds.has(id), `${stage.id} references ${id}`);
  }
  for (const source of value.sourceLedgers) {
    for (const field of ["project", "repository", "commit", "path", "url"]) text(source[field], `source ledger ${field}`);
    sha(source.commit, `${source.project}.commit`);
    require(source.url === `https://github.com/${source.repository}/blob/${source.commit}/${source.path}`, `${source.project}.url must exactly bind repository, commit, and path`);
    const matchingStates = value.stateReconciliations.filter((state) => state.repository === source.repository);
    for (const state of matchingStates) require(state.main?.commit === source.commit, `${state.id}.main.commit must match the ${source.project} source-ledger pin`);
  }
  for (const state of value.stateReconciliations) {
    for (const field of ["subject", "repository", "defaultBranch", "risk", "nextOwnerAction"]) text(state[field], `${state.id}.${field}`);
    sha(state.main?.commit, `${state.id}.main.commit`);
    sha(state.main?.tree, `${state.id}.main.tree`);
    const pull = state.pullRequest;
    require(Number.isInteger(pull?.number) && pull.number > 0, `${state.id}.pullRequest.number must be a positive integer`);
    require(new Set(["open", "closed", "merged"]).has(pull?.state), `${state.id}.pullRequest.state is invalid`);
    text(pull.sourceBranch, `${state.id}.pullRequest.sourceBranch`);
    sha(pull.headCommit, `${state.id}.pullRequest.headCommit`);
    sha(pull.headTree, `${state.id}.pullRequest.headTree`);
    if (pull.state === "merged") {
      sha(pull.mergeCommit, `${state.id}.pullRequest.mergeCommit`);
      sha(pull.mergeTree, `${state.id}.pullRequest.mergeTree`);
      require(pull.mergeTree === state.main.tree, `${state.id}.pullRequest.mergeTree must match main.tree`);
    } else {
      require(pull.mergeCommit === undefined && pull.mergeTree === undefined, `${state.id} non-merged PR cannot retain merge evidence`);
    }
    if (pull.sourceBranchLifecycle) {
      require(new Set(["preserved", "restored", "deleted"]).has(pull.sourceBranchLifecycle.status), `${state.id}.pullRequest.sourceBranchLifecycle.status is invalid`);
      sha(pull.sourceBranchLifecycle.headCommit, `${state.id}.pullRequest.sourceBranchLifecycle.headCommit`);
      text(pull.sourceBranchLifecycle.history, `${state.id}.pullRequest.sourceBranchLifecycle.history`);
      if (pull.sourceBranchLifecycle.status !== "deleted") require(pull.sourceBranchLifecycle.headCommit === pull.headCommit, `${state.id} preserved or restored source branch must match the PR head`);
    }
    if (state.deployment) {
      require(evidenceStates.has(state.deployment.status), `${state.id}.deployment.status is invalid`);
      sha(state.deployment.subjectCommit, `${state.id}.deployment.subjectCommit`);
      sha(state.deployment.subjectTree, `${state.id}.deployment.subjectTree`);
      positiveInteger(state.deployment.workflowRun, `${state.id}.deployment.workflowRun`);
      text(state.deployment.version, `${state.id}.deployment.version`);
      require(state.deployment.publishingEnabled === false, `${state.id}.deployment.publishingEnabled must remain false`);
      require(state.deployment.subjectCommit === pull.headCommit, `${state.id}.deployment.subjectCommit must match the recorded PR head`);
      require(state.deployment.subjectTree === pull.headTree, `${state.id}.deployment.subjectTree must match the recorded PR-head tree`);
      if (state.deployment.subjectCommit !== state.main.commit) {
        require(state.exactMainDeployment, `${state.id} must record exactMainDeployment when the deployed commit differs from main`);
      }
    }
    if (state.exactMainDeployment) {
      require(evidenceStates.has(state.exactMainDeployment.status), `${state.id}.exactMainDeployment.status is invalid`);
      if (state.exactMainDeployment.workflowRun !== undefined) positiveInteger(state.exactMainDeployment.workflowRun, `${state.id}.exactMainDeployment.workflowRun`);
      text(state.exactMainDeployment.reason, `${state.id}.exactMainDeployment.reason`);
      if (state.exactMainDeployment.status === "verified") {
        require(state.deployment?.status === "verified", `${state.id} exact-main verification requires a verified deployment`);
        require(state.deployment.subjectCommit === state.main.commit, `${state.id} exact-main verification must match the main commit`);
      }
    }
    require(Array.isArray(state.checks) && state.checks.length, `${state.id}.checks are required`);
    const knownSubjects = new Set([state.main.commit, pull.headCommit, pull.mergeCommit].filter(Boolean));
    for (const check of state.checks) {
      text(check.name, `${state.id}.check.name`);
      positiveInteger(check.workflowRun, `${state.id}.check.workflowRun`);
      require(checkConclusions.has(check.conclusion), `${state.id}.check.conclusion is invalid`);
      sha(check.subjectCommit, `${state.id}.check.subjectCommit`);
      require(knownSubjects.has(check.subjectCommit), `${state.id}.check.subjectCommit must match main, PR head, or merge`);
    }
    if (state.deployment) require(state.checks.some((check) => check.workflowRun === state.deployment.workflowRun && check.subjectCommit === state.deployment.subjectCommit && check.conclusion === "success"), `${state.id}.deployment must bind to a successful recorded PR-head canary check`);
    require(evidenceStates.has(state.verification?.status), `${state.id}.verification.status is invalid`);
    text(state.verification.scope, `${state.id}.verification.scope`);
    text(state.verification.reason, `${state.id}.verification.reason`);
    if (state.exactMainDeployment) {
      require(state.verification.scope === exactMainScope, `${state.id}.verification.scope must describe exact-main runtime deployment`);
      require(state.verification.status === state.exactMainDeployment.status, `${state.id}.verification.status must match exactMainDeployment.status`);
    } else {
      require(state.verification.scope !== exactMainScope, `${state.id} exact-main verification scope requires exactMainDeployment evidence`);
    }
  }
  for (const item of value.workItems) {
    for (const field of ["title", "stream", "owner", "nextAction", "waitCondition", "reentryCondition"]) text(item[field], `${item.id}.${field}`);
    require(allowed.has(item.status), `${item.id}.status is invalid`);
    date(item.lastUpdated, `${item.id}.lastUpdated`); date(item.staleDate, `${item.id}.staleDate`);
    for (const id of item.dependencies) require(itemIds.has(id), `${item.id} depends on ${id}`);
    for (const id of item.evidenceIds) require(evidenceIds.has(id), `${item.id} references ${id}`);
    if (item.status === "complete") require(item.evidenceIds.length > 0, `${item.id} is complete without evidence`);
  }
  for (const story of value.evidenceStories) {
    for (const field of ["date", "identity", "situation", "verification", "outcome", "content", "measurement"]) text(story[field], `${story.id}.${field}`);
    date(story.date, `${story.id}.date`);
    for (const field of ["owner", "status", "nextAction", "waitCondition", "staleDate"]) text(story.accountability?.[field], `${story.id}.accountability.${field}`);
    require(allowed.has(story.accountability.status), `${story.id}.accountability.status is invalid`);
    date(story.accountability.staleDate, `${story.id}.accountability.staleDate`);
  }
  const today = process.env.GOVERNANCE_NOW ?? new Date().toISOString().slice(0, 10);
  const staleItems = value.workItems.filter((item) => item.status !== "complete" && item.staleDate < today);
  const staleStories = value.evidenceStories.filter((story) => story.accountability.status !== "complete" && story.accountability.staleDate < today);
  require(staleItems.length === 0, `stale work items: ${staleItems.map((item) => item.id).join(", ")}`);
  require(staleStories.length === 0, `stale evidence stories: ${staleStories.map((story) => story.id).join(", ")}`);
}

function validateProducts(products, updatedAt) {
  require(products.length === productIdentities.size, `products must contain exactly ${productIdentities.size} entries`);
  const productIds = ids(products, "product");
  for (const expectedId of productIdentities.keys()) require(productIds.has(expectedId), `products is missing ${expectedId}`);
  const observationCutoff = Date.parse(`${updatedAt}T23:59:59.999Z`);

  for (const product of products) {
    exactKeys(product, ["id", "name", "role", "repository", "main", "deployment", "observedAt", "evidenceUrls", "chatgpt", "githubMarketplace", "maintenance", "operations", "risks", "nextOwnerAction"], product.id);
    const identity = productIdentities.get(product.id);
    require(identity, `unexpected product ${product.id}`);
    for (const field of ["name", "role", "repository"]) require(product[field] === identity[field], `${product.id}.${field} must remain ${identity[field]}`);
    githubRepository(product.repository, `${product.id}.repository`);
    text(product.nextOwnerAction, `${product.id}.nextOwnerAction`);
    timestamp(product.observedAt, `${product.id}.observedAt`);
    const observed = Date.parse(product.observedAt);
    require(observed <= observationCutoff, `${product.id}.observedAt cannot be after updatedAt`);
    require(observationCutoff - observed <= maximumObservationAgeMs, `${product.id}.observedAt is stale by more than 7 days`);
    urls(product.evidenceUrls, `${product.id}.evidenceUrls`);

    exactKeys(product.main, ["branch", "sha", "status", "protection"], `${product.id}.main`);
    require(product.main.branch === "main", `${product.id}.main.branch must be main`);
    sha(product.main.sha, `${product.id}.main.sha`);
    productStatus(product.main.status, `${product.id}.main.status`);
    require(branchProtectionStates.has(product.main.protection), `${product.id}.main.protection is outside the branch protection vocabulary`);

    const deployment = product.deployment;
    exactKeys(deployment, ["status", "sha", "version", "providerVersion", "exactMainStatus", "rollback", "publishingEnabled"], `${product.id}.deployment`);
    productStatus(deployment.status, `${product.id}.deployment.status`);
    sha(deployment.sha, `${product.id}.deployment.sha`);
    text(deployment.version, `${product.id}.deployment.version`);
    text(deployment.providerVersion, `${product.id}.deployment.providerVersion`);
    productStatus(deployment.exactMainStatus, `${product.id}.deployment.exactMainStatus`);
    require(deployment.publishingEnabled === false, `${product.id}.deployment.publishingEnabled must remain false`);
    if (deployment.status === "DEPLOYED") {
      require(deployment.version !== "UNPROVEN", `${product.id} deployed version cannot be UNPROVEN`);
      require(deployment.providerVersion !== "UNPROVEN", `${product.id} deployed providerVersion cannot be UNPROVEN`);
    }
    if (deployment.sha === product.main.sha && deployment.status === "DEPLOYED") {
      require(deployment.exactMainStatus === "DEPLOYED", `${product.id}.deployment.exactMainStatus must be DEPLOYED when deployed sha equals main`);
    } else if (deployment.sha !== product.main.sha) {
      require(deployment.exactMainStatus === "UNPROVEN", `${product.id}.deployment.exactMainStatus must be UNPROVEN when deployed sha differs from main`);
    }
    exactKeys(deployment.rollback, ["status", "sha", "version", "providerVersion"], `${product.id}.deployment.rollback`);
    productStatus(deployment.rollback.status, `${product.id}.deployment.rollback.status`);
    sha(deployment.rollback.sha, `${product.id}.deployment.rollback.sha`);
    text(deployment.rollback.version, `${product.id}.deployment.rollback.version`);
    text(deployment.rollback.providerVersion, `${product.id}.deployment.rollback.providerVersion`);
    require(deployment.rollback.sha !== deployment.sha, `${product.id}.deployment.rollback.sha must differ from the deployed sha`);

    validateChatgpt(product);
    validateMarketplace(product);
    validateMaintenance(product);
    validateOperations(product);
    validateRisks(product);
  }
}

function validateOwnerActionQueue(queue, evidenceIds) {
  const queueIds = ids(queue, "owner action");
  const seenActions = new Set();
  const completedIds = new Set();
  for (const [index, item] of queue.entries()) {
    const label = item.id;
    exactKeys(item, ["id", "order", "phase", "title", "owner", "authorityRequired", "agentExecutable", "action", "prerequisites", "waitCondition", "evidenceIds"], label);
    require(item.order === index + 1, `${label}.order must be contiguous and match queue position`);
    require(ownerActionPhases.has(item.phase), `${label}.phase is invalid`);
    for (const field of ["title", "owner", "authorityRequired", "action", "waitCondition"]) text(item[field], `${label}.${field}`);
    require(item.agentExecutable === false, `${label}.agentExecutable must remain false`);
    require(!/\bagent\b/i.test(item.owner), `${label}.owner must identify human or account authority, not an agent`);
    const normalizedAction = item.action.trim().toLowerCase().replaceAll(/\s+/g, " ");
    require(!seenActions.has(normalizedAction), `${label}.action duplicates another owner action`);
    seenActions.add(normalizedAction);
    require(Array.isArray(item.prerequisites), `${label}.prerequisites must be an array`);
    require(item.prerequisites.length === new Set(item.prerequisites).size, `${label}.prerequisites cannot contain duplicates`);
    for (const prerequisite of item.prerequisites) {
      require(queueIds.has(prerequisite), `${label} references unknown prerequisite ${prerequisite}`);
      require(completedIds.has(prerequisite), `${label} prerequisite ${prerequisite} must appear earlier in the queue`);
    }
    require(Array.isArray(item.evidenceIds) && item.evidenceIds.length, `${label}.evidenceIds must be a non-empty array`);
    require(item.evidenceIds.length === new Set(item.evidenceIds).size, `${label}.evidenceIds cannot contain duplicates`);
    for (const evidenceId of item.evidenceIds) require(evidenceIds.has(evidenceId), `${label} references ${evidenceId}`);
    completedIds.add(item.id);
  }
}

function validateChatgpt(product) {
  const channel = product.chatgpt;
  const label = `${product.id}.chatgpt`;
  exactKeys(channel, ["version", "versionStatus", "currentState", "states", "portalReadbackRequired", "reason", "evidenceUrls"], label);
  text(channel.version, `${label}.version`);
  productStatus(channel.versionStatus, `${label}.versionStatus`);
  validateLifecycle(channel.states, chatgptLifecycle, channel.currentState, label);
  require(typeof channel.portalReadbackRequired === "boolean", `${label}.portalReadbackRequired must be boolean`);
  text(channel.reason, `${label}.reason`);
  urls(channel.evidenceUrls, `${label}.evidenceUrls`);
  if (channel.versionStatus !== "UNPROVEN") {
    require(channel.version !== "UNPROVEN", `${label}.version cannot be UNPROVEN when versionStatus is evidenced`);
    require(channel.version === product.deployment.version, `${label}.version must match the deployed product version`);
  }
  if (channel.states.PUBLISHED === "PUBLISHED") require(channel.versionStatus === "PUBLISHED", `${label}.versionStatus must be PUBLISHED when publication is evidenced`);
}

function validateMarketplace(product) {
  const channel = product.githubMarketplace;
  const label = `${product.id}.githubMarketplace`;
  exactKeys(channel, ["artifactType", "artifactTypeStatus", "sourceRepository", "sourceSha", "sourceStatus", "version", "versionStatus", "displayedInstallCount", "displayedInstallCountStatus", "currentState", "states", "billing", "portalReadbackRequired", "reason", "evidenceUrls"], label);
  require(artifactTypes.has(channel.artifactType), `${label}.artifactType is invalid`);
  productStatus(channel.artifactTypeStatus, `${label}.artifactTypeStatus`);
  text(channel.sourceRepository, `${label}.sourceRepository`);
  text(channel.sourceSha, `${label}.sourceSha`);
  productStatus(channel.sourceStatus, `${label}.sourceStatus`);
  text(channel.version, `${label}.version`);
  productStatus(channel.versionStatus, `${label}.versionStatus`);
  require(channel.displayedInstallCount === "UNPROVEN" || (Number.isInteger(channel.displayedInstallCount) && channel.displayedInstallCount >= 0), `${label}.displayedInstallCount must be a non-negative integer or UNPROVEN`);
  productStatus(channel.displayedInstallCountStatus, `${label}.displayedInstallCountStatus`);
  validateLifecycle(channel.states, marketplaceLifecycle, channel.currentState, label);
  require(typeof channel.portalReadbackRequired === "boolean", `${label}.portalReadbackRequired must be boolean`);
  text(channel.reason, `${label}.reason`);
  urls(channel.evidenceUrls, `${label}.evidenceUrls`);

  if (channel.artifactType === "UNPROVEN") require(channel.artifactTypeStatus === "UNPROVEN", `${label}.artifactTypeStatus must be UNPROVEN when artifactType is UNPROVEN`);
  if (channel.artifactTypeStatus !== "UNPROVEN") require(channel.artifactType !== "UNPROVEN", `${label}.artifactType must be known when artifactTypeStatus is evidenced`);
  if (channel.sourceStatus === "UNPROVEN") {
    require(channel.sourceRepository === "UNPROVEN" && channel.sourceSha === "UNPROVEN", `${label} unproven source cannot carry a repository or sha`);
  } else {
    githubRepository(channel.sourceRepository, `${label}.sourceRepository`);
    sha(channel.sourceSha, `${label}.sourceSha`);
  }
  if (channel.versionStatus === "UNPROVEN") require(channel.version === "UNPROVEN", `${label}.version must be UNPROVEN when versionStatus is UNPROVEN`);
  if (channel.versionStatus !== "UNPROVEN") require(channel.version !== "UNPROVEN", `${label}.version cannot be UNPROVEN when versionStatus is evidenced`);
  if (channel.displayedInstallCount === "UNPROVEN") require(channel.displayedInstallCountStatus === "UNPROVEN", `${label}.displayedInstallCountStatus must be UNPROVEN when no count is observed`);
  if (channel.displayedInstallCount !== "UNPROVEN") require(channel.displayedInstallCountStatus !== "UNPROVEN", `${label}.displayedInstallCountStatus must be evidenced when a count is observed`);
  if (channel.states.PUBLISHED === "PUBLISHED") {
    require(channel.artifactTypeStatus !== "UNPROVEN", `${label} publication requires an evidenced artifact type`);
    require(channel.sourceStatus !== "UNPROVEN", `${label} publication requires an evidenced source`);
    if (channel.artifactType === "GITHUB_ACTION") require(channel.versionStatus === "PUBLISHED", `${label}.versionStatus must be PUBLISHED for a published GitHub Action`);
  }
  if (channel.sourceRepository === product.repository && channel.artifactType !== "GITHUB_ACTION") {
    require(channel.sourceSha === product.deployment.sha, `${label}.sourceSha must match the deployed product sha for a same-repository artifact`);
  }
  if (channel.artifactType === "GITHUB_ACTION") require(channel.sourceRepository !== product.repository, `${label} GitHub Action must identify its separate source repository`);

  exactKeys(channel.billing, ["decision", "status", "reason"], `${label}.billing`);
  require(billingDecisions.has(channel.billing.decision), `${label}.billing.decision is invalid`);
  productStatus(channel.billing.status, `${label}.billing.status`);
  text(channel.billing.reason, `${label}.billing.reason`);
  if (channel.billing.decision === "UNPROVEN") require(channel.billing.status === "UNPROVEN", `${label}.billing.status must be UNPROVEN when the decision is UNPROVEN`);
  if (channel.artifactType === "GITHUB_ACTION") require(channel.billing.decision === "NOT_APPLICABLE", `${label} GitHub Action billing decision must be NOT_APPLICABLE`);
}

function validateLifecycle(states, lifecycle, currentState, label) {
  exactKeys(states, lifecycle, `${label}.states`);
  const evidenced = [];
  for (const state of lifecycle) {
    require(states[state] === state || states[state] === "UNPROVEN", `${label}.states.${state} must be ${state} or UNPROVEN`);
    if (states[state] === state) evidenced.push(state);
  }
  const requiredPrior = new Map([
    ["IN_REVIEW", "SUBMITTED"],
    ["PUBLISHED", "APPROVED"],
    ["DISCOVERABLE", "PUBLISHED"],
    ["INSTALLED", "DISCOVERABLE"],
    ["LIVE_OUTCOME_VERIFIED", "INSTALLED"]
  ]);
  for (const [state, prerequisite] of requiredPrior) {
    if (states[state] === state) require(states[prerequisite] === prerequisite, `${label}.${state} requires ${prerequisite}`);
  }
  const expectedCurrent = evidenced.length ? evidenced.at(-1) : "UNPROVEN";
  require(currentState === expectedCurrent, `${label}.currentState must be highest evidenced state ${expectedCurrent}`);
}

function validateMaintenance(product) {
  const maintenance = product.maintenance;
  const label = `${product.id}.maintenance`;
  exactKeys(maintenance, ["registered", "registrationStatus", "mode", "lastCycle", "lastProvenCycle"], label);
  require(typeof maintenance.registered === "boolean", `${label}.registered must be boolean`);
  productStatus(maintenance.registrationStatus, `${label}.registrationStatus`);
  require(maintenanceModes.has(maintenance.mode), `${label}.mode is invalid`);
  if (maintenance.registered) require(maintenance.mode !== "UNPROVEN", `${label}.mode cannot be UNPROVEN when the product is registered`);
  if (!maintenance.registered) require(maintenance.mode === "UNPROVEN", `${label}.mode must be UNPROVEN when the product is not registered`);
  validateCycle(maintenance.lastCycle, `${label}.lastCycle`);
  validateCycle(maintenance.lastProvenCycle, `${label}.lastProvenCycle`);
  if (!maintenance.registered) require(maintenance.lastCycle.status === "UNPROVEN", `${label}.lastCycle must be UNPROVEN when the product is not registered`);
}

function validateCycle(cycle, label) {
  exactKeys(cycle, ["id", "status", "evidenceUrls"], label);
  text(cycle.id, `${label}.id`);
  productStatus(cycle.status, `${label}.status`);
  urls(cycle.evidenceUrls, `${label}.evidenceUrls`);
  if (cycle.status !== "UNPROVEN") require(cycle.id !== "UNPROVEN", `${label}.id cannot be UNPROVEN when status is evidenced`);
}

function validateOperations(product) {
  const operations = product.operations;
  const label = `${product.id}.operations`;
  exactKeys(operations, ["slo", "incidentOwner"], label);
  exactKeys(operations.slo, ["status", "objective"], `${label}.slo`);
  productStatus(operations.slo.status, `${label}.slo.status`);
  text(operations.slo.objective, `${label}.slo.objective`);
  exactKeys(operations.incidentOwner, ["name", "status"], `${label}.incidentOwner`);
  text(operations.incidentOwner.name, `${label}.incidentOwner.name`);
  productStatus(operations.incidentOwner.status, `${label}.incidentOwner.status`);
}

function validateRisks(product) {
  require(Array.isArray(product.risks) && product.risks.length, `${product.id}.risks are required`);
  const seen = new Set();
  const severities = new Set();
  for (const risk of product.risks) {
    exactKeys(risk, ["id", "severity", "summary", "evidenceUrls"], `${product.id}.risk`);
    text(risk.id, `${product.id}.risk.id`);
    require(!seen.has(risk.id), `${product.id} has duplicate risk ${risk.id}`);
    seen.add(risk.id);
    require(riskSeverities.has(risk.severity), `${product.id}.${risk.id}.severity is invalid`);
    severities.add(risk.severity);
    text(risk.summary, `${product.id}.${risk.id}.summary`);
    urls(risk.evidenceUrls, `${product.id}.${risk.id}.evidenceUrls`);
  }
  for (const severity of riskSeverities) require(severities.has(severity), `${product.id}.risks must include ${severity}`);
}

export function validateTransition(previous, current) {
  const currentStates = new Map((current.stateReconciliations ?? []).map((state) => [state.id, state]));
  for (const before of previous.stateReconciliations ?? []) {
    const preservesMerge = before.pullRequest?.state === "merged";
    const preservesDeployment = before.deployment?.status === "verified";
    if (!preservesMerge && !preservesDeployment) continue;
    const after = currentStates.get(before.id);
    require(after, `${before.id} cannot remove established merge or deployment evidence`);
    if (preservesMerge) {
      require(after.pullRequest?.state === "merged", `${before.id} cannot regress an established merged PR to ${after.pullRequest?.state ?? "missing"}`);
      require(after.pullRequest.headCommit === before.pullRequest.headCommit, `${before.id} cannot rewrite an established PR head`);
      require(after.pullRequest.mergeCommit === before.pullRequest.mergeCommit, `${before.id} cannot rewrite an established merge commit`);
    }
    if (preservesDeployment) {
      require(after.deployment?.status === "verified", `${before.id} cannot remove or downgrade a verified deployment`);
      for (const field of ["subjectCommit", "subjectTree", "workflowRun", "version", "publishingEnabled"]) {
        require(after.deployment[field] === before.deployment[field], `${before.id} cannot rewrite verified deployment ${field}`);
      }
      require(after.deployment.publishingEnabled === false, `${before.id} must preserve publishingEnabled=false evidence`);
    }
  }
  const currentProducts = new Map((current.products ?? []).map((product) => [product.id, product]));
  for (const before of previous.products ?? []) {
    const after = currentProducts.get(before.id);
    require(after, `${before.id} cannot be removed from the product matrix`);
    for (const field of ["name", "role", "repository"]) require(after[field] === before[field], `${before.id} cannot rewrite product ${field}`);
    require(Date.parse(after.observedAt) >= Date.parse(before.observedAt), `${before.id}.observedAt cannot move backward`);
    require(after.deployment?.publishingEnabled === false, `${before.id} must preserve publishingEnabled=false`);
    for (const [channelName, lifecycle] of [["chatgpt", chatgptLifecycle], ["githubMarketplace", marketplaceLifecycle]]) {
      for (const state of lifecycle) {
        if (before[channelName]?.states?.[state] === state) require(after[channelName]?.states?.[state] === state, `${before.id}.${channelName}.${state} cannot lose established evidence`);
      }
    }
  }
}

export function render(value) {
  const byId = new Map(value.workItems.map((item) => [item.id, item]));
  const lines = ["# Portfolio state", "", "<!-- Generated from governance/portfolio-ledger.json. Do not edit by hand. -->", "", `Canonical state date: **${value.updatedAt}**`, "", value.governanceRule, "", "## Exact source ledgers", "", "| Project | Repository | Commit | Ledger |", "|---|---|---|---|"];
  for (const source of value.sourceLedgers) lines.push(`| ${source.project} | ${source.repository} | [\`${source.commit}\`](https://github.com/${source.repository}/commit/${source.commit}) | [${source.path}](${source.url}) |`);
  lines.push("", "## Product and channel matrix", "", "Provider-only and authenticated portal facts are `UNPROVEN` unless tied to an exact read-back. Main-branch protection values are same-session authenticated provider observations. The runtime `publishingEnabled=false` gate remains distinct from provider listing publication.", "", "| Product and role | Repository and main | Deployment and rollback | Maintenance and operations | Risks and next owner action |", "|---|---|---|---|---|");
  for (const product of value.products) {
    const deployed = product.deployment;
    const rollback = deployed.rollback;
    const maintenance = product.maintenance;
    const risks = product.risks.map((risk) => `${risk.severity} ${risk.id}: ${risk.summary} ${links(risk.evidenceUrls)}`).join(" ");
    lines.push(`| **${cell(product.name)}**<br>${cell(product.role)}<br>Observed: \`${product.observedAt}\` ${links(product.evidenceUrls)} | [${product.repository}](https://github.com/${product.repository})@[\`${product.main.sha}\`](https://github.com/${product.repository}/commit/${product.main.sha})<br>main=${product.main.status}; protection=${product.main.protection} | ${deployed.status}: \`${deployed.sha}\`; product \`${deployed.version}\`; provider \`${deployed.providerVersion}\`; exact-main=${deployed.exactMainStatus}; publishingEnabled=\`${deployed.publishingEnabled}\`<br>Rollback ${rollback.status}: \`${rollback.sha}\`; product \`${rollback.version}\`; provider \`${rollback.providerVersion}\` | registered=\`${maintenance.registered}\` (${maintenance.registrationStatus}); mode=\`${maintenance.mode}\`<br>last=${maintenance.lastCycle.status} \`${maintenance.lastCycle.id}\` ${links(maintenance.lastCycle.evidenceUrls)}<br>last proven=${maintenance.lastProvenCycle.status} \`${maintenance.lastProvenCycle.id}\` ${links(maintenance.lastProvenCycle.evidenceUrls)}<br>SLO=${product.operations.slo.status}: ${cell(product.operations.slo.objective)}<br>Incident owner=${cell(product.operations.incidentOwner.name)} (${product.operations.incidentOwner.status}) | ${cell(risks)}<br>Next: ${cell(product.nextOwnerAction)} |`);
  }
  lines.push("", "### Channel evidence", "", "Lifecycle cells list only evidenced states. Missing stages are `UNPROVEN`; later outcome states are never inferred from publication alone.", "", "| Product | Channel and artifact | Source and version | Lifecycle evidence | Billing and read-back | Evidence |", "|---|---|---|---|---|---|");
  for (const product of value.products) {
    const chatgpt = product.chatgpt;
    const marketplace = product.githubMarketplace;
    lines.push(`| ${cell(product.name)} | ChatGPT | deployed source \`${product.deployment.sha}\`<br>version=\`${chatgpt.version}\` (${chatgpt.versionStatus}) | current=${chatgpt.currentState}<br>${lifecycleSummary(chatgpt.states, chatgptLifecycle)} | portalReadbackRequired=\`${chatgpt.portalReadbackRequired}\`<br>${cell(chatgpt.reason)} | ${links(chatgpt.evidenceUrls)} |`);
    lines.push(`| ${cell(product.name)} | GitHub Marketplace<br>artifact=${marketplace.artifactType} (${marketplace.artifactTypeStatus}) | ${cell(marketplace.sourceRepository)}@\`${marketplace.sourceSha}\` (${marketplace.sourceStatus})<br>version=\`${marketplace.version}\` (${marketplace.versionStatus})<br>displayed installs=\`${marketplace.displayedInstallCount}\` (${marketplace.displayedInstallCountStatus}) | current=${marketplace.currentState}<br>${lifecycleSummary(marketplace.states, marketplaceLifecycle)} | billing=${marketplace.billing.decision} (${marketplace.billing.status}): ${cell(marketplace.billing.reason)}<br>portalReadbackRequired=\`${marketplace.portalReadbackRequired}\`<br>${cell(marketplace.reason)} | ${links(marketplace.evidenceUrls)} |`);
  }
  lines.push("", "## Owner-only action queue", "", "This is the single ordered queue of actions that require human, account-owner, legal, merge, deployment, or external-publication authority. Agent-executable repair and verification work is intentionally excluded.", "", "| Order | Phase and action | Owner authority | Prerequisites and wait condition | Evidence |", "|---|---|---|---|---|");
  for (const item of value.ownerActionQueue) {
    const prerequisites = item.prerequisites.length ? item.prerequisites.map((id) => `\`${id}\``).join(", ") : "None";
    lines.push(`| ${item.order} | **${cell(item.title)}**<br>\`${item.phase}\`: ${cell(item.action)} | ${cell(item.owner)}<br>\`${item.authorityRequired}\`; agentExecutable=\`${item.agentExecutable}\` | Prerequisites: ${prerequisites}<br>Wait: ${cell(item.waitCondition)} | ${item.evidenceIds.map((id) => `\`${id}\``).join(", ")} |`);
  }
  lines.push("", "## Reconciled repository and deployment state", "", "| Subject | Main | Pull request | Deployed subject | Exact-main deployment | Checks | Verification and next action |", "|---|---|---|---|---|---|---|");
  for (const state of value.stateReconciliations) {
    const pull = state.pullRequest;
    const deployment = state.deployment
      ? `${state.deployment.status}: \`${state.deployment.subjectCommit}\`, version \`${state.deployment.version}\`, run \`${state.deployment.workflowRun}\`, publishingEnabled=\`${state.deployment.publishingEnabled}\``
      : "Not recorded in this reconciliation.";
    const exactMain = state.exactMainDeployment
      ? `${state.exactMainDeployment.status}: ${state.exactMainDeployment.reason}`
      : "Not applicable to this reconciliation.";
    const checks = state.checks.map((check) => `${check.name} \`${check.workflowRun}\`: ${check.conclusion}`).join("; ");
    const branchLifecycle = pull.sourceBranchLifecycle ? `; branch state ${pull.sourceBranchLifecycle.status} at \`${pull.sourceBranchLifecycle.headCommit}\`` : "";
    lines.push(`| ${cell(state.subject)} | ${state.repository}@\`${state.main.commit}\` (tree \`${state.main.tree}\`) | #${pull.number} ${pull.state}; branch \`${pull.sourceBranch}\`${branchLifecycle}; head \`${pull.headCommit}\`${pull.mergeCommit ? `; merge \`${pull.mergeCommit}\`` : ""} | ${cell(deployment)} | ${cell(exactMain)} | ${cell(checks)} | ${state.verification.status} for ${cell(state.verification.scope)}: ${cell(state.verification.reason)} Next: ${cell(state.nextOwnerAction)} |`);
  }
  lines.push("", "## Recovery order", "");
  for (const [index, stage] of value.recoveryOrder.entries()) {
    const counts = stage.workItemIds.map((id) => byId.get(id).status).reduce((all, status) => ({ ...all, [status]: (all[status] ?? 0) + 1 }), {});
    lines.push(`${index + 1}. **${stage.id}: ${stage.title}.** ${stage.exitCriterion} (${Object.entries(counts).map(([status, count]) => `${count} ${status}`).join(", ")})`);
  }
  lines.push("", "## Work ledger", "");
  for (const stage of value.recoveryOrder) {
    lines.push(`### ${stage.id}: ${stage.title}`, "", "| ID | Status | Owner | Next action | Wait and re-entry | Stale |", "|---|---|---|---|---|---|");
    for (const id of stage.workItemIds) {
      const item = byId.get(id);
      lines.push(`| ${item.id}: ${cell(item.title)} | ${item.status} | ${cell(item.owner)} | ${cell(item.nextAction)} | Wait: ${cell(item.waitCondition)} Re-entry: ${cell(item.reentryCondition)} | ${item.staleDate} |`);
    }
    lines.push("");
  }
  lines.push("## Evidence Story Bank", "");
  for (const story of value.evidenceStories) lines.push(`### ${story.id}: ${story.identity}`, "", `- **Date:** ${story.date}`, `- **Situation:** ${story.situation}`, `- **Verification:** ${story.verification}`, `- **Accountability:** owner=${story.accountability.owner}; status=${story.accountability.status}; next=${story.accountability.nextAction}; wait=${story.accountability.waitCondition}; stale=${story.accountability.staleDate}`, `- **Outcome:** ${story.outcome}`, `- **Content:** ${story.content}`, `- **Measurement:** ${story.measurement}`, "");
  return `${lines.join("\n").trim()}\n`;
}

function ids(values, label) { const set = new Set(); for (const value of values) { text(value.id, `${label} id`); require(!set.has(value.id), `duplicate ${label} ${value.id}`); set.add(value.id); } return set; }
function cell(value) { return String(value).replaceAll("|", "\\|").replaceAll("\n", " "); }
function links(values) { return values.map((value, index) => `[e${index + 1}](${value})`).join(" "); }
function lifecycleSummary(states, lifecycle) {
  const evidenced = lifecycle.filter((state) => states[state] === state);
  return evidenced.length ? evidenced.join(" -> ") : "UNPROVEN";
}
function text(value, label) { require(typeof value === "string" && value.trim(), `${label} must be non-empty text`); }
function sha(value, label) { require(typeof value === "string" && /^[a-f0-9]{40}$/.test(value), `${label} must be full SHA`); }
function positiveInteger(value, label) { require(Number.isInteger(value) && value > 0, `${label} must be a positive integer`); }
function date(value, label) { require(/^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`)), `${label} must be an ISO date`); }
function timestamp(value, label) { require(typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value) && !Number.isNaN(Date.parse(value)), `${label} must be an ISO UTC timestamp`); }
function productStatus(value, label) { require(productStatuses.has(value), `${label} is outside the product status vocabulary`); }
function githubRepository(value, label) { require(typeof value === "string" && /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(value), `${label} must be an owner/repository slug`); }
function urls(values, label) {
  require(Array.isArray(values) && values.length, `${label} must be a non-empty array`);
  require(values.length === new Set(values).size, `${label} cannot contain duplicates`);
  for (const value of values) require(typeof value === "string" && /^https:\/\/[^\s]+$/.test(value), `${label} must contain only HTTPS URLs`);
}
function exactKeys(value, expected, label) {
  require(value && typeof value === "object" && !Array.isArray(value), `${label} must be an object`);
  const actual = Object.keys(value);
  for (const key of expected) require(Object.hasOwn(value, key), `${label}.${key} is required`);
  for (const key of actual) require(expected.includes(key), `${label}.${key} is not supported`);
}
function rejectEmDash(value, path = "ledger") {
  if (typeof value === "string") require(!value.includes("\u2014"), `${path} cannot contain an em dash`);
  else if (Array.isArray(value)) value.forEach((entry, index) => rejectEmDash(entry, `${path}[${index}]`));
  else if (value && typeof value === "object") for (const [key, entry] of Object.entries(value)) rejectEmDash(entry, `${path}.${key}`);
}
function require(condition, message) { if (!condition) throw new Error(message); }

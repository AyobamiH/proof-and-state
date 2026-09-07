import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const root = new URL("../", import.meta.url);
const ledgerUrl = new URL("governance/portfolio-ledger.json", root);
const outputUrl = new URL("docs/PORTFOLIO-STATE.md", root);
const allowed = new Set(["active", "planned", "blocked", "deferred", "complete"]);
const evidenceStates = new Set(["verified", "unproven", "failed", "not_assessed"]);
const checkConclusions = new Set(["success", "failure", "cancelled", "skipped", "pending"]);
const exactMainScope = "Exact-main runtime deployment";

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
  require(value.schemaVersion === 1, "schemaVersion must be 1");
  for (const field of ["portfolio", "updatedAt", "governanceRule"]) text(value[field], field);
  date(value.updatedAt, "updatedAt");
  require(Array.isArray(value.sourceLedgers), "sourceLedgers must be an array");
  require(Array.isArray(value.stateReconciliations) && value.stateReconciliations.length, "stateReconciliations are required");
  require(Array.isArray(value.recoveryOrder) && value.recoveryOrder.length, "recoveryOrder is required");
  require(Array.isArray(value.workItems) && value.workItems.length, "workItems are required");
  require(Array.isArray(value.evidenceStories), "evidenceStories must be an array");
  ids(value.stateReconciliations, "state reconciliation");
  const itemIds = ids(value.workItems, "work item");
  const evidenceIds = ids(value.evidenceStories, "evidence story");
  ids(value.recoveryOrder, "recovery stage");
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
}

export function render(value) {
  const byId = new Map(value.workItems.map((item) => [item.id, item]));
  const lines = ["# Portfolio state", "", "<!-- Generated from governance/portfolio-ledger.json. Do not edit by hand. -->", "", `Canonical state date: **${value.updatedAt}**`, "", value.governanceRule, "", "## Exact source ledgers", "", "| Project | Repository | Commit | Ledger |", "|---|---|---|---|"];
  for (const source of value.sourceLedgers) lines.push(`| ${source.project} | ${source.repository} | [\`${source.commit}\`](https://github.com/${source.repository}/commit/${source.commit}) | [${source.path}](${source.url}) |`);
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
function text(value, label) { require(typeof value === "string" && value.trim(), `${label} must be non-empty text`); }
function sha(value, label) { require(typeof value === "string" && /^[a-f0-9]{40}$/.test(value), `${label} must be full SHA`); }
function positiveInteger(value, label) { require(Number.isInteger(value) && value > 0, `${label} must be a positive integer`); }
function date(value, label) { require(/^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`)), `${label} must be an ISO date`); }
function require(condition, message) { if (!condition) throw new Error(message); }

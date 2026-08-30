import { readFile, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const ledgerUrl = new URL("governance/portfolio-ledger.json", root);
const outputUrl = new URL("docs/PORTFOLIO-STATE.md", root);
const allowed = new Set(["active", "planned", "blocked", "deferred", "complete"]);
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

function validate(value) {
  require(value.schemaVersion === 1, "schemaVersion must be 1");
  for (const field of ["portfolio", "updatedAt", "governanceRule"]) text(value[field], field);
  date(value.updatedAt, "updatedAt");
  require(Array.isArray(value.sourceLedgers), "sourceLedgers must be an array");
  require(Array.isArray(value.recoveryOrder) && value.recoveryOrder.length, "recoveryOrder is required");
  require(Array.isArray(value.workItems) && value.workItems.length, "workItems are required");
  require(Array.isArray(value.evidenceStories), "evidenceStories must be an array");
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
    require(/^[a-f0-9]{40}$/.test(source.commit), `${source.project}.commit must be full SHA`);
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

function render(value) {
  const byId = new Map(value.workItems.map((item) => [item.id, item]));
  const lines = ["# Portfolio state", "", "<!-- Generated from governance/portfolio-ledger.json. Do not edit by hand. -->", "", `Canonical state date: **${value.updatedAt}**`, "", value.governanceRule, "", "## Exact source ledgers", "", "| Project | Repository | Commit | Ledger |", "|---|---|---|---|"];
  for (const source of value.sourceLedgers) lines.push(`| ${source.project} | ${source.repository} | [\`${source.commit}\`](https://github.com/${source.repository}/commit/${source.commit}) | [${source.path}](${source.url}) |`);
  lines.push("", "## Recovery order", "");
  for (const [index, stage] of value.recoveryOrder.entries()) {
    const counts = stage.workItemIds.map((id) => byId.get(id).status).reduce((all, status) => ({ ...all, [status]: (all[status] ?? 0) + 1 }), {});
    lines.push(`${index + 1}. **${stage.id} — ${stage.title}.** ${stage.exitCriterion} (${Object.entries(counts).map(([status, count]) => `${count} ${status}`).join(", ")})`);
  }
  lines.push("", "## Work ledger", "");
  for (const stage of value.recoveryOrder) {
    lines.push(`### ${stage.id} — ${stage.title}`, "", "| ID | Status | Owner | Next action | Wait and re-entry | Stale |", "|---|---|---|---|---|---|");
    for (const id of stage.workItemIds) {
      const item = byId.get(id);
      lines.push(`| ${item.id} — ${cell(item.title)} | ${item.status} | ${cell(item.owner)} | ${cell(item.nextAction)} | Wait: ${cell(item.waitCondition)} Re-entry: ${cell(item.reentryCondition)} | ${item.staleDate} |`);
    }
    lines.push("");
  }
  lines.push("## Evidence Story Bank", "");
  for (const story of value.evidenceStories) lines.push(`### ${story.id} — ${story.identity}`, "", `- **Date:** ${story.date}`, `- **Situation:** ${story.situation}`, `- **Verification:** ${story.verification}`, `- **Accountability:** owner=${story.accountability.owner}; status=${story.accountability.status}; next=${story.accountability.nextAction}; wait=${story.accountability.waitCondition}; stale=${story.accountability.staleDate}`, `- **Outcome:** ${story.outcome}`, `- **Content:** ${story.content}`, `- **Measurement:** ${story.measurement}`, "");
  return `${lines.join("\n").trim()}\n`;
}

function ids(values, label) { const set = new Set(); for (const value of values) { text(value.id, `${label} id`); require(!set.has(value.id), `duplicate ${label} ${value.id}`); set.add(value.id); } return set; }
function cell(value) { return String(value).replaceAll("|", "\\|").replaceAll("\n", " "); }
function text(value, label) { require(typeof value === "string" && value.trim(), `${label} must be non-empty text`); }
function date(value, label) { require(/^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`)), `${label} must be an ISO date`); }
function require(condition, message) { if (!condition) throw new Error(message); }

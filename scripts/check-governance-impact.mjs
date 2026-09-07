import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

import { validateTransition } from "./render-portfolio-state.mjs";

const base = process.argv[2] || process.env.GOVERNANCE_BASE_SHA;
if (!base || /^0+$/.test(base)) {
  console.log("governance impact: no comparison base; generated state and staleness checks still apply");
  process.exit(0);
}
const changed = execFileSync("git", ["diff", "--name-only", `${base}...HEAD`], { encoding: "utf8" }).trim().split("\n").filter(Boolean);
const ledger = "governance/portfolio-ledger.json";
const generated = "docs/PORTFOLIO-STATE.md";
const impactful = changed.filter((file) => file !== generated && (/^(docs|evidence|scripts)\//.test(file) || /^\.github\//.test(file) || /^(README|AGENTS|SECURITY|LICENSE)\.md$/.test(file)));
if (impactful.length && !changed.includes(ledger)) throw new Error(`portfolio ledger must change with:\n${impactful.map((file) => `- ${file}`).join("\n")}`);
if (changed.includes(ledger) && !changed.includes(generated)) throw new Error(`render and commit ${generated}`);
if (changed.includes(ledger)) {
  const previous = JSON.parse(execFileSync("git", ["show", `${base}:${ledger}`], { encoding: "utf8" }));
  const current = JSON.parse(readFileSync(ledger, "utf8"));
  validateTransition(previous, current);
}
console.log(`governance impact: ok (${impactful.length} consequential files)`);

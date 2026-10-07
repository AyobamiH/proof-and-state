import { readFile, writeFile } from "node:fs/promises";
const root = new URL("../", import.meta.url);
const input = new URL("governance/shared-operating-contract.json", root);
const output = new URL("docs/SHARED-OPERATING-CONTRACT.md", root);
const c = JSON.parse(await readFile(input, "utf8"));
const lines = [
  "# Shared operating contract",
  "",
  "<!-- Generated from governance/shared-operating-contract.json. Do not edit by hand. -->",
  "",
  c.principle,
  "",
  "## Green",
  "",
  c.greenRule.definition,
  "",
  `Forbidden shortcut: ${c.greenRule.forbiddenShortcut}`,
  "",
  "## State vector",
  ""
];
for (const [axis, values] of Object.entries(c.stateVector)) {
  lines.push(`- **${axis}:** ${values.map((v) => `\`${v}\``).join(", ")}`);
}
lines.push("", "## Acceptance layers", "");
for (const [id, proof] of c.acceptanceLayers) lines.push(`1. **${id}:** ${proof}`);
lines.push("", "## Invariants", "");
for (const rule of c.invariants) lines.push(`- ${rule}`);
lines.push("", "## Credential custody", "", c.credentialCustody.rule, "", `Record: ${c.credentialCustody.recordFields.map((v) => `\`${v}\``).join(", ")}.`, "", `Never record: ${c.credentialCustody.prohibitedFields.map((v) => `\`${v}\``).join(", ")}.`);
lines.push("", "## Temporary bridges", "");
for (const rule of c.temporaryBridge.rules) lines.push(`- ${rule}`);
lines.push("", "Required bridge record:", "");
for (const field of c.temporaryBridge.requiredFields) lines.push(`- \`${field}\``);
lines.push("", "## Machine discovery", "", "Required public surfaces:");
for (const item of c.machineDiscovery.requiredPublicSurfaces) lines.push(`- \`${item}\``);
lines.push("", "Recommended public surfaces:");
for (const item of c.machineDiscovery.recommendedPublicSurfaces) lines.push(`- \`${item}\``);
lines.push("", "Truthfulness:");
for (const item of c.machineDiscovery.truthfulness) lines.push(`- ${item}`);
lines.push("", "Acceptance:");
for (const item of c.machineDiscovery.acceptance) lines.push(`- \`${item}\``);
lines.push("", "## Adoption", "", "| Surface | Role |", "|---|---|");
for (const [surface, role] of c.adoption) lines.push(`| ${surface} | ${role} |`);
const rendered = lines.join("\n") + "\n";
if (process.argv.includes("--check")) {
  const current = await readFile(output, "utf8").catch(() => "");
  if (current !== rendered) throw new Error("docs/SHARED-OPERATING-CONTRACT.md is stale");
  console.log("shared operating contract: current");
} else {
  await writeFile(output, rendered);
  console.log("shared operating contract: rendered");
}

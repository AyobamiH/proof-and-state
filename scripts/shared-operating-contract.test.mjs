import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const c = JSON.parse(await readFile(new URL("../governance/shared-operating-contract.json", import.meta.url), "utf8"));
test("shared operating contract preserves evidence distinctions", () => {
  assert.equal(c.schemaVersion, 1);
  assert.match(c.greenRule.definition, /highest acceptance layer/i);
  for (const axis of ["availability","execution","consequence","readback","outcome","evidence","freshness"]) {
    assert.ok(Array.isArray(c.stateVector[axis]) && c.stateVector[axis].length > 1);
    assert.equal(new Set(c.stateVector[axis]).size, c.stateVector[axis].length);
  }
  assert.ok(c.stateVector.availability.includes("unknown"));
  assert.ok(c.stateVector.consequence.includes("ambiguous"));
  assert.ok(c.stateVector.readback.includes("matched"));
  assert.ok(c.stateVector.outcome.includes("verified"));
});
test("credential and bridge contracts fail closed", () => {
  assert.ok(c.credentialCustody.prohibitedFields.includes("secret"));
  assert.ok(c.temporaryBridge.requiredFields.includes("removal_proof"));
  assert.ok(c.machineDiscovery.truthfulness.some((v) => /Sitemap submission is not indexing evidence/.test(v)));
  assert.ok(c.machineDiscovery.requiredPublicSurfaces.includes("robots_txt"));
  assert.ok(c.machineDiscovery.requiredPublicSurfaces.includes("sitemap_xml"));
});

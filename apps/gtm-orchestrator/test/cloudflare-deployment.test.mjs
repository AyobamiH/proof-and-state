import assert from "node:assert/strict";
import test from "node:test";

import { parseProviderJson, selectActiveVersion, validateDeploymentReadback } from "../scripts/verify-cloudflare-deployment.mjs";

const commit = "a".repeat(40);
const versionId = "11111111-2222-4333-8444-555555555555";

function deployment() {
  return { id: "deployment-1", versions: [{ version_id: versionId, percentage: 100 }] };
}

function version() {
  return {
    id: versionId,
    annotations: { "workers/message": `Publishing-disabled canary ${commit}` },
    resources: {
      bindings: [
        { type: "plain_text", name: "DEPLOYMENT_SHA", text: commit },
        { type: "plain_text", name: "PUBLISHING_ENABLED", text: "false" },
      ],
    },
  };
}

test("provider read-back proves one exact publishing-disabled version", () => {
  assert.deepEqual(validateDeploymentReadback({ deployment: deployment(), version: version(), expectedCommit: commit }), {
    verified: true,
    versionId,
    percentage: 100,
    message: `Publishing-disabled canary ${commit}`,
    deploymentSha: commit,
    publishingEnabled: false,
  });
});

test("provider read-back rejects the wrong version", () => {
  const wrong = version();
  wrong.id = "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee";
  assert.throws(() => validateDeploymentReadback({ deployment: deployment(), version: wrong, expectedCommit: commit }), /version read-back mismatch/);
});

test("provider read-back rejects split traffic", () => {
  const split = deployment();
  split.versions = [
    { version_id: versionId, percentage: 50 },
    { version_id: "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee", percentage: 50 },
  ];
  assert.throws(() => selectActiveVersion(split), /split across multiple versions/);
});

test("provider read-back rejects the wrong deployment SHA", () => {
  const wrong = version();
  wrong.resources.bindings.find(({ name }) => name === "DEPLOYMENT_SHA").text = "b".repeat(40);
  assert.throws(() => validateDeploymentReadback({ deployment: deployment(), version: wrong, expectedCommit: commit }), /DEPLOYMENT_SHA mismatch/);
});

test("provider read-back rejects publishing enabled", () => {
  const unsafe = version();
  unsafe.resources.bindings.find(({ name }) => name === "PUBLISHING_ENABLED").text = "true";
  assert.throws(() => validateDeploymentReadback({ deployment: deployment(), version: unsafe, expectedCommit: commit }), /Canary safety failure/);
});

test("provider read-back rejects a missing or incorrect version message", () => {
  const wrong = version();
  wrong.annotations["workers/message"] = "unrelated deployment";
  assert.throws(() => validateDeploymentReadback({ deployment: deployment(), version: wrong, expectedCommit: commit }), /version message mismatch/);
  delete wrong.annotations["workers/message"];
  assert.throws(() => validateDeploymentReadback({ deployment: deployment(), version: wrong, expectedCommit: commit }), /version message mismatch/);
});

test("provider read-back rejects missing and malformed payloads", () => {
  assert.throws(() => parseProviderJson("", "Cloudflare deployment status"), /read-back is missing/);
  assert.throws(() => parseProviderJson("{", "Cloudflare deployment status"), /malformed JSON/);
  assert.throws(() => parseProviderJson("[]", "Cloudflare deployment status"), /must be a JSON object/);
  const missing = version();
  delete missing.resources.bindings;
  assert.throws(() => validateDeploymentReadback({ deployment: deployment(), version: missing, expectedCommit: commit }), /missing resource bindings/);
});

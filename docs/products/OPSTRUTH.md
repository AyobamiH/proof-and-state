# OpsTruth

## Purpose

OpsTruth is the independent observation and attestation product. It receives a sealed DoneState handoff, re-observes the named evidence, and signs a decision with a key whose fingerprint is pinned before execution.

## Independence boundary

OpsTruth does not receive mutation authority over the target repository and does not accept DoneState's action output as proof. It evaluates machine-checkable requirements against fresh external evidence.

## Decision contract

| Decision | Meaning | DoneState transition |
| --- | --- | --- |
| `verified` | Every sealed requirement was freshly observed on the exact subject | `VERIFIED` |
| `failed` | A sealed requirement was disproved | `FAILED_SAFE` |
| `uncertain` | Evidence is missing, pending, or inconclusive | Remain `AWAITING_VERIFICATION` |

The owner-side DoneState integration pins signer fingerprint `09544c3ede70b832a114918bb439960004655faf9d36981e1402587af9429c86`.

The response boundary is the complete `donestate.verification-contract.v2` envelope containing `contractVersion`, `report` and signed `attestation`. The fresh DoneState successor `c4a07fa6-90b2-4597-a4c6-eae66de5a3e8` accepted that response and reached `VERIFIED`; historical uncertain runs retain their original scope.

## Current runtime observation

Production smoke passed on 7 October 2026 for `0.4.1` at `cbe833dce0646314c189568be6acc21348895ed8`: 21 read-only tools, signed Evidence Graph, selected-repository GitHub App reads, public legal/support routes and independent deployment probes. Deployment `33868337668` records final Worker `100719fa-a23c-4395-aeaa-844e0a9684e1`.

Current repository main `0ff048499da218c63707de178306c4d2329dad8f` is a separate subject. Historical OpenAI directory publication remains recorded at `0.4.0`; this fresh runtime observation does not promote a channel version or prove independent customer activation.

## Evidence rules

An attestation binds the run ID, execution snapshot digest, handoff digest, verification nonce, decision, evidence references, verification report digest, issue time, signer public key, and Ed25519 signature. Signature validity proves integrity and signer identity; the report and evidence references support the outcome decision.

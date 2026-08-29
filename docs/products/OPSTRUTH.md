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

## Evidence rules

An attestation binds the run ID, execution snapshot digest, handoff digest, verification nonce, decision, evidence references, verification report digest, issue time, signer public key, and Ed25519 signature. Signature validity proves integrity and signer identity; the report and evidence references support the outcome decision.

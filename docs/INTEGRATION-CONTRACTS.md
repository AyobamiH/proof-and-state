# Integration Contracts

## DoneState to GitHub

Input: repository selection, installation ID, pinned base ref, objective, authority classes, publication mode, changed-file budget, validation profile, and required check names.

Output: exact branch name, head SHA, pull-request number and URL, action settlements, and a sealed verification snapshot.

Rules:

- Automatic repairs use pull requests only.
- The GitHub App is installed with Only select repositories.
- Installation-token permissions, not user-style repository permission flags, determine branch and PR capability.
- No merge, administration, deployment, release, environment, secret-management, or workflow-write authority is granted.

## DoneState to OpsTruth

Contract: `donestate.verification-handoff.v2` to a pinned independent verifier, returning a signed `donestate.verification-attestation.v2`.

The handoff binds the run ID, objective digest, execution snapshot digest, nonce, repository, base SHA, head SHA, PR, acceptance criteria, machine-checkable requirements, action digests, and event-chain head.

Decision semantics:

- `verified`: exact requirements were independently observed; terminal `VERIFIED`.
- `failed`: requirement disproved; terminal fail-closed state.
- `uncertain`: evidence is not yet conclusive; remain `AWAITING_VERIFICATION` and permit a fresh observation.

## OpsTruth to AgentProof

AgentProof may index a signed verification record and later GitHub, deployment, package, or release receipts. It must preserve the distinction between signature integrity, signer trust, and fresh observation of the underlying outcome.

## Product repositories to Proof & State

Evidence indexes contain non-secret identifiers and links: repository, commit SHA, PR, workflow run, installation ID, run ID, snapshot digest, handoff digest, report digest, signer fingerprint, and event-chain head. Credentials, private keys, tokens, and webhook secrets are excluded.

## GTM orchestrator to publishing providers

Input: approved brand, direct provider adapter, platform-native copy, durable Cloudinary media identity, validated destination, UTM identity, scheduled time, rotation decision, approval mode, and deterministic idempotency key.

Output: provider account or Page identity, provider post identity, submission response class, read-back payload digest, reconciliation decision, and measurement cursor.

Rules:

- Only direct Google, LinkedIn, Meta, Threads, and Cloudinary APIs are authorised.
- Provider credentials remain secret references and are never committed or indexed.
- The browser and social-media intermediaries are not fallback publication paths.
- A provider outage remains queued and retryable.
- A revoked or insufficient permission is blocked and requires reauthorisation.
- An ambiguous mutation is read back before any retry.
- `PUBLISHED_VERIFIED` requires exact provider read-back.
- A mismatch, missing post ID, or unavailable read-back never becomes a success claim.

# DoneState

## Purpose

DoneState is the authorised execution control plane. It converts a bounded objective into durable, reviewable repository actions and stops at independent verification.

## Owner-side configuration

- Implementation repository: [AyobamiH/donestate](https://github.com/AyobamiH/donestate)
- GitHub App: `donestate-maintenance-ayobamih` (private)
- App ID: `4761698`
- Installation ID: `157513439`
- Installation scope: Only select repositories
- Selected repository: only `AyobamiH/donestate`
- Maintenance mode: `pr_only`
- Required checks: `core (22)`, `core (24)`, `hosted-plugin`
- Automatic repair and scheduling: enabled for the selected repository

## GitHub authority

Read Actions, issues, and metadata; read and write code and pull requests. No administration, merge, deployment, release, workflow-write, environment, or secret-management authority.

## Completion model

A successful local implementation and green CI are execution evidence, not completion proof. DoneState reaches `VERIFIED` only after a complete matching `donestate.verification-contract.v2` response containing the report and signed attestation from a pinned independent verifier. Uncertain observations remain retryable in `AWAITING_VERIFICATION`.

## Current maintenance proof

Fresh successor `c4a07fa6-90b2-4597-a4c6-eae66de5a3e8` is independently `VERIFIED`. [PR #115](https://github.com/AyobamiH/donestate/pull/115) remains intentionally open at head `41f1ae3b0fed670e64bd99f1bcb1aea9c9e7e869`, with exact-head CI `33806832575`. Preserve this PR-only evidence rather than merging it as unfinished work.

## Historical maintenance canary

The earlier owner-side canary was run `b4242932-0bc1-4876-a202-634d9c12d72a`, branch `donestate/b4242932-0bc1-4876-a202-634d9c12d72a`, head `ffec48e6c5abd9cef840ab591896613769d3e779`, and [PR #22](https://github.com/AyobamiH/donestate/pull/22). The PR was later merged by the owner as `4543c4dcbc1f5f95d1d53ef0a1f8cbeafd8ead4a`; the automatic maintenance executor did not gain merge authority. The OpsTruth outcome was `uncertain`, and post-merge workflow `33474288066` failed its governance impact gate, so neither historical subject is independently verified. This does not invalidate the separately proven successor.

## OpenAI directory state

Current source E-061 records an owner-authorised reset and canonical `0.3.2` draft with 20 tools. It does not prove current submission, approval or publication. Read back the canonical publisher before acting; do not retain a deleted submission as current or create a duplicate product. The following earlier submission is historical evidence.

DoneState version `0.2.0` was submitted on 2026-08-30 and the OpenAI Platform reports status `Review`. The submitted surface includes the repository-hosted demo and icons, five positive cases, three non-trigger cases, 19 scanned MCP tools, 57 annotation justifications, and a dedicated server-enforced read-only reviewer account.

Final review-path source is `1588c0588dfcbfcefc70cda71e8197c1b14b7fed`; post-merge CI `33297909263` and deployment `33297909318` succeeded. See the [submission evidence](../../evidence/donestate/2026-08-30-openai-review-submission.md).

`Review` is not approval or publication. The historical canary remains `AWAITING_VERIFICATION`; the fresh successor has separate `VERIFIED` evidence.

## GitHub Marketplace review

The separate public-repository OAuth listing attached to OAuth App `3822030` was submitted on 30 August 2026. GitHub reports `Pending for publish` and under review; this is not approval or publication. The private maintenance GitHub App remains outside the listing and selected only for `AyobamiH/donestate`.

Review hardening merged in DoneState PR #47 as `ac54dcaa2df2b4211814a076036cc2b3f3ace8a6`. Post-merge CI `33330067769` passed, deployment `33330067776` published Cloudflare version `c3c3dd14-512d-4ee5-a25a-f44914c00654`, and live routing probes returned the expected HTTP 200 root and HTTP 405 webhook GET. Marketplace entitlement time is monotonic, all five lifecycle actions are tested, and the incident runbook is public. See the [submission and hardening evidence](../../evidence/marketplaces/2026-08-30-donestate-marketplace-submission-and-hardening.md).

## GitHub Marketplace development

The separate development OAuth App `3826463` and owner-only draft listing `donestate-marketplace-development` recorded a signed ping and purchase without changing the submitted production listing or private maintenance App. A secret-target defect was exposed by a live HTTP 503 and recovered in PR #52. Receipt PR #55 then passed PR and post-merge CI, deployed production version `774f0298-062f-4442-96d4-e2d52d7b1f94`, and separately deployed development version `b09b3849-eab3-4be4-a405-b61449e4801b` through the manual-only workflow. Cancellation `90b920c0-a4ba-11f1-852b-f37103c46ff2` returned HTTP 202 with a non-personal final `CANCELLED` receipt. Live `changed`, `pending_change`, and `pending_change_cancelled` transitions remain open.

See the [development lifecycle and recovery evidence](../../evidence/marketplaces/2026-08-30-donestate-marketplace-development.md).

## Project-state source

DoneState's canonical project ledger is `governance/project-ledger.json` at main `5b18fefcaa4c186782a2c14e5e4d16c2f93e11e4`; post-merge CI `37577391832` passed. The approved PR #166 production deployment `37577391829` runs this exact source as Worker `98d66425-8a2c-4caf-a2a4-dced459bdd40` with sandbox container `sha256:89239658656b1fe3cef2db45058fb8c7fa02e01ee4d5ecc04c8fa7e6ada9a74e`.

CUST-001/CUST-002 remain complete. The accepted temporary Write grant for `OneClickPostFactory` is independently confirmed. Its next public-OAuth objective admission returned GitHub `401 Bad credentials` before run/model execution; reconnect DoneState’s GitHub connection as that exact customer identity. The OpenAI key remains connected and unused, the maintenance registry is empty, and post-result account deletion/access removal remain pending. E-069 is appended in documentation evidence [PR #168](https://github.com/AyobamiH/donestate/pull/168); it is separate from customer execution proof. RELEASE-001 stays blocked on a fresh full journey, separately evidenced signup/OAuth and remaining LEGAL-001 decisions. App/verifier scope and historical canaries are unchanged.

## Dependency security rollout

The inherited Worker lock failed the permanent audit gate in PR #166 CI `37575211329`. Patched head `dce8772122b50186bbdbece53bd9a3bc21d42da4` passed clean installation/audit (zero vulnerabilities), 40 core tests, 142 Worker tests and exact-head CI `37576065787` without weakening the gate. The owner approved merge and deployment; post-merge CI `37577391832` and deployment `37577391829` succeeded, including the actual container build/rollout. Historical candidate E-068 retains its earlier local-Docker limitation and pending-owner scope; E-069 records the completed rollout separately.

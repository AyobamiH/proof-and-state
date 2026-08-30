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

A successful local implementation and green CI are execution evidence, not completion proof. DoneState reaches `VERIFIED` only after a matching signed attestation from a pinned independent verifier. Uncertain observations remain retryable in `AWAITING_VERIFICATION`.

## Maintenance canary

The canonical fresh owner-side canary is run `b4242932-0bc1-4876-a202-634d9c12d72a`, branch `donestate/b4242932-0bc1-4876-a202-634d9c12d72a`, head `ffec48e6c5abd9cef840ab591896613769d3e779`, and [PR #22](https://github.com/AyobamiH/donestate/pull/22). It is intentionally unmerged and preserves the PR-only authority boundary.

## OpenAI directory review

DoneState version `0.2.0` was submitted on 2026-08-30 and the OpenAI Platform reports status `Review`. The submitted surface includes the repository-hosted demo and icons, five positive cases, three non-trigger cases, 19 scanned MCP tools, 57 annotation justifications, and a dedicated server-enforced read-only reviewer account.

Final review-path source is `1588c0588dfcbfcefc70cda71e8197c1b14b7fed`; post-merge CI `33297909263` and deployment `33297909318` succeeded. See the [submission evidence](../../evidence/donestate/2026-08-30-openai-review-submission.md).

`Review` is not approval or publication and does not change the fresh maintenance canary's `AWAITING_VERIFICATION` state.

## GitHub Marketplace review

The separate public-repository OAuth listing attached to OAuth App `3822030` was submitted on 30 August 2026. GitHub reports `Pending for publish` and under review; this is not approval or publication. The private maintenance GitHub App remains outside the listing and selected only for `AyobamiH/donestate`.

Review hardening merged in DoneState PR #47 as `ac54dcaa2df2b4211814a076036cc2b3f3ace8a6`. Post-merge CI `33330067769` passed, deployment `33330067776` published Cloudflare version `c3c3dd14-512d-4ee5-a25a-f44914c00654`, and live routing probes returned the expected HTTP 200 root and HTTP 405 webhook GET. Marketplace entitlement time is monotonic, all five lifecycle actions are tested, and the incident runbook is public. See the [submission and hardening evidence](../../evidence/marketplaces/2026-08-30-donestate-marketplace-submission-and-hardening.md).

## GitHub Marketplace development

The separate development OAuth App `3826463` and owner-only draft listing `donestate-marketplace-development` recorded a signed ping and purchase without changing the submitted production listing or private maintenance App. A secret-target defect was then exposed by a live HTTP 503 and recovered in PR #52: development version `69e76740-b9b6-48ea-a979-34e04acbc47b` passed 200/404/401/302 assertions, while production version `fd8fe1b0-81bd-4ba6-aa84-b288ea9bc583` independently restored production credentials. PR #53 returned development deploys to manual-only. Publisher-supplied cancellation delivery `90b920c0-a4ba-11f1-852b-f37103c46ff2` is recorded through DoneState PR #54; its response, final entitlement, and live changed and pending-change transitions remain open.

See the [development lifecycle and recovery evidence](../../evidence/marketplaces/2026-08-30-donestate-marketplace-development.md).

## Project-state source

DoneState's canonical project ledger is `governance/project-ledger.json` at portfolio-pinned commit `13b3bf36244e8dbb674a21bf88881a3cfb3a72c5`. It tracks the complete recovered backlog and generates `docs/PROJECT-STATE.md`; Proof & State references that exact source rather than duplicating product-level status as portfolio authority.

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

The owner-only draft listing `donestate-marketplace-development` is attached to separate OAuth App `3826463` and the isolated `donestate-mcp-development` Worker. Development deployment `33331882593` attempt 2 published Cloudflare version `be499906-19d4-4340-a968-e62aa5dc28d7`. GitHub recorded signed ping `13cd1ca8-a4b8-11f1-888d-aba6875c1ba2` and signed purchase `90c3e110-a4b8-11f1-8357-8b375ae56683`. The publisher reports that the zero-cost test subscription was cancelled, but the exact signed cancellation delivery was not retrieved before authenticated browser control failed.

This development surface exposes no MCP, repository, maintenance, OpenAI-review, private-App, or production authority. It remains active until the cancellation delivery, isolated final entitlement, and live changed and pending-change transitions are recorded. See the [development lifecycle evidence](../../evidence/marketplaces/2026-08-30-donestate-marketplace-development.md).

## Project-state source

DoneState's canonical project ledger is `governance/project-ledger.json` at portfolio-pinned commit `ecf2cb753ee9ccaaa0fe63ffb301d2633978cbe3`. It tracks the complete recovered backlog and generates `docs/PROJECT-STATE.md`; Proof & State references that exact source rather than duplicating product-level status as portfolio authority.

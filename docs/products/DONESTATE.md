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

The canonical owner-side canary is run `b4242932-0bc1-4876-a202-634d9c12d72a`, branch `donestate/b4242932-0bc1-4876-a202-634d9c12d72a`, head `ffec48e6c5abd9cef840ab591896613769d3e779`, and [PR #22](https://github.com/AyobamiH/donestate/pull/22). The PR was later merged by the owner as `4543c4dcbc1f5f95d1d53ef0a1f8cbeafd8ead4a`; the automatic maintenance executor did not gain merge authority. The OpsTruth outcome was `uncertain`, and post-merge workflow `33474288066` failed its governance impact gate, so neither the PR head nor merge is independently verified.

## OpenAI directory review

DoneState version `0.2.0` was submitted on 2026-08-30 and the OpenAI Platform reports status `Review`. The submitted surface includes the repository-hosted demo and icons, five positive cases, three non-trigger cases, 19 scanned MCP tools, 57 annotation justifications, and a dedicated server-enforced read-only reviewer account.

Final review-path source is `1588c0588dfcbfcefc70cda71e8197c1b14b7fed`; post-merge CI `33297909263` and deployment `33297909318` succeeded. See the [submission evidence](../../evidence/donestate/2026-08-30-openai-review-submission.md).

`Review` is not approval or publication and does not change the fresh maintenance canary's `AWAITING_VERIFICATION` state.

## GitHub Marketplace review

The separate public-repository OAuth listing attached to OAuth App `3822030` was submitted on 30 August 2026. GitHub reports `Pending for publish` and under review; this is not approval or publication. The private maintenance GitHub App remains outside the listing and selected only for `AyobamiH/donestate`.

Review hardening merged in DoneState PR #47 as `ac54dcaa2df2b4211814a076036cc2b3f3ace8a6`. Post-merge CI `33330067769` passed, deployment `33330067776` published Cloudflare version `c3c3dd14-512d-4ee5-a25a-f44914c00654`, and live routing probes returned the expected HTTP 200 root and HTTP 405 webhook GET. Marketplace entitlement time is monotonic, all five lifecycle actions are tested, and the incident runbook is public. See the [submission and hardening evidence](../../evidence/marketplaces/2026-08-30-donestate-marketplace-submission-and-hardening.md).

## GitHub Marketplace development

The separate development OAuth App `3826463` and owner-only draft listing `donestate-marketplace-development` recorded a signed ping and purchase without changing the submitted production listing or private maintenance App. A secret-target defect was exposed by a live HTTP 503 and recovered in PR #52. Receipt PR #55 then passed PR and post-merge CI, deployed production version `774f0298-062f-4442-96d4-e2d52d7b1f94`, and separately deployed development version `b09b3849-eab3-4be4-a405-b61449e4801b` through the manual-only workflow. Cancellation `90b920c0-a4ba-11f1-852b-f37103c46ff2` returned HTTP 202 with a non-personal final `CANCELLED` receipt. Live `changed`, `pending_change`, and `pending_change_cancelled` transitions remain open.

See the [development lifecycle and recovery evidence](../../evidence/marketplaces/2026-08-30-donestate-marketplace-development.md).

## Project-state source

DoneState's canonical project ledger is `governance/project-ledger.json` at portfolio-pinned current-main commit `4543c4dcbc1f5f95d1d53ef0a1f8cbeafd8ead4a`. That source is currently red because workflow `33474288066` failed the governance impact gate. Proof & State records both the exact pin and its failed check rather than converting repository state into unsupported proof.

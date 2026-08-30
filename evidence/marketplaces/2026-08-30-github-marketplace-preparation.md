# GitHub Marketplace preparation evidence — 2026-08-30

## Outcome

Marketplace exposure is implemented to the last safe technical boundary for both products, but neither product is claimed listed or published:

- OpsTruth has a root GitHub Action that runs the bundled read-only verifier without downloading executable code at runtime.
- DoneState has a separate GitHub Marketplace OAuth entitlement flow and purchase webhook on its owned domain.
- The private DoneState maintenance GitHub App remains private and installed only on `AyobamiH/donestate`; Marketplace discovery does not widen its repository authority.
- GitHub legal agreements and irreversible listing submissions remain owner actions.

## OpenAI endpoint boundary

The owned-domain cutover did **not** rewrite the existing OpenAI submission. The DoneState 0.2.0 review snapshot still names exactly:

`https://donestate-mcp.woeinvests.workers.dev/mcp`

The canonical endpoint for new integrations is:

`https://donestate.proofandstate.com/mcp`

The retained Worker URL remains reachable only for review compatibility. OpenAI locks submitted snapshots; changing the MCP origin requires a new plugin version and a new review. No cancellation or replacement of the in-review version was performed.

## OpsTruth identity surface

The MCP identity page was brought into the same design system as `opstruth.io` before Marketplace work:

| Evidence | Receipt |
| --- | --- |
| Source PR | `AyobamiH/opstruth-chatgpt-plugin#9` |
| Merge commit | `6a4a01a1da444d1cdc8dfa498d0705b9cc71794f` |
| Post-merge CI | run `33306940776`, success |
| Cloudflare deployment | run `33306940759`, success |
| Cloudflare version | `e2e0efcb-377d-4b79-8cb9-7039b3341e11` |
| Live observation | `https://mcp.opstruth.io/` loaded with the aligned identity, capability and trust-boundary presentation |

This is visual and content alignment only. It does not alter OpsTruth's read-only authority or allow it to execute DoneState work.

## OpsTruth GitHub Action

`AyobamiH/opstruth#15` added the Marketplace-compatible root `action.yml`, a bundled CLI runner, input validation, isolated positive and negative fixtures, and listing documentation.

| Evidence | Receipt |
| --- | --- |
| PR head | `404dfe7c1b98c5090ccc87eb323e22d2622f0ade` |
| PR CI | run `33307513182`, success |
| Security check | Snyk, success |
| Merge commit | `45f4debbd3fbe8217599ab697b8f6c855b372e0b` |
| Post-merge CI | run `33308062407`, success |
| Post-merge website deployment | run `33308062381`, success |
| Local gate | 80 CLI tests, Action validation, plugin validation and the quick completion gate passed |

The Action rejects absolute, traversal, empty and multiline output paths; accepts strict boolean inputs only; requires a one-line HTTPS base URL; and exposes no publish, deploy or target-mutation capability.

The GitHub release form is staged for Action version `v1.0.0`. It has not created the tag, accepted the Marketplace Developer Agreement or published the release. The GitHub Marketplace checkbox remains unavailable until the owner accepts that legal agreement.

## DoneState Marketplace integration

`AyobamiH/donestate#40` added a Marketplace-facing OAuth entitlement layer without making the private maintenance App public.

| Evidence | Receipt |
| --- | --- |
| PR head | `0d5e05054931c2d2e9344eeb84ce207ec90aee98` |
| PR CI | run `33308203451`, success |
| Independent static review | OpsTruth change-safety comment `5468320273`; ready for hosted validation, not Marketplace submission |
| Merge commit | `50804e665786c532dff98fe9387be233055e30eb` |
| Post-merge CI | run `33308320467`, success |
| Cloudflare deployment | run `33308320475`, job `99248712153`, success |
| Worker test gate | 77 tests passed, including 5 Marketplace tests |
| Cloudflare version | `043f87d0-52be-4114-a1be-0c016c064097` |
| Container application | `donestate-mcp-sandbox`, application `a0340af7-00ec-45b5-8d60-2d8444353b89`, updated successfully |

The deployed endpoints are:

- Install: `https://donestate.proofandstate.com/github/marketplace/install`
- Purchase webhook: `https://donestate.proofandstate.com/webhooks/github-marketplace`

Read-only live probes confirmed fail-closed routing: an install request without a plan returns HTTP 400, and a GET to the POST-only webhook returns HTTP 405. No synthetic purchase webhook was sent.

The OAuth flow uses a ten-minute, one-time state value, requests only `read:user`, checks the selected Marketplace plan through GitHub's purchase API, stores minimal entitlement data and discards the OAuth access token. The webhook validates HMAC-SHA256, applies delivery-ID idempotency and handles purchase, plan-change, cancellation and pending-change events. Entitlement alone grants no repository selection or execution authority.

## Assets and listing draft

The DoneState repository now carries an exact-size icon, feature card, three product screenshots, an updated 1280×720 demo video showing the canonical owned domain, and listing copy. The intended short description is:

> PR-only autonomous coding with independent verification

The listing uses the separate OAuth App draft `3822030`. The private maintenance App `4761698` remains outside that public listing path.

## Remaining owner gates

The following are explicitly incomplete:

1. Accept the GitHub Marketplace Developer Agreement for the OpsTruth Action.
2. Create the `v1.0.0` Action tag, enable the Marketplace checkbox and publish the OpsTruth release.
3. Publish binding DoneState privacy and terms text with owner contact and retention commitments; the repository documents are still preview/operator templates.
4. Configure a new `GITHUB_MARKETPLACE_WEBHOOK_SECRET` in both the DoneState Worker and GitHub Marketplace listing.
5. Save and finish the DoneState listing details, pricing and assets, then submit it for GitHub review.

Until those gates are crossed, the correct lifecycle words are **merged**, **deployed**, **live routes**, **release-ready** and **draft prepared**—not **listed**, **published**, **approved** or **available in GitHub Marketplace**.

## Preserved trust boundaries

- DoneState executes bounded, authorised work and never signs its own completion.
- OpsTruth independently observes and signs verification outcomes but never mutates a target.
- Proof & State indexes receipts and unresolved gates without upgrading static or signed evidence into an execution claim.
- The already verified historical DoneState canary `631d8a08-d337-4bae-bd18-b55c31f48a8b` was not rechecked.

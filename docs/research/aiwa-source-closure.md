# AI Work Accountability source and research closure

Recorded 3 November 2026. This closes the three engineering deliverables from the evidence-led technical discussion: recoverable website source, README discovery, and a public-safe Post-Once reproduction.

## Maintained website source

The maintained source is the owner's ordinary local Git checkout and private [AI Work Accountability repository](https://github.com/AyobamiH/ai-work-accountability), branch `main`, at `c00742f73b96985cf1aa868d4940f3a2a841ed06`. Both heads were freshly read and match; the local checkout is clean.

The owner decided on 2 November that ongoing maintenance must work locally and on GitHub without requiring a ChatGPT or Sites account. `SOURCE-OF-TRUTH.md` and `README.md` in that repository document editing, testing, building, preview and explicit Cloudflare publication. The earlier Sites history is preserved on `archive/sites-2026-10-26` at `2dbdd4680b633df7ead212e26cfd8e4385113f58`.

The standard `current-public-source` pointer now resolves to the maintained owner checkout. Its old target is preserved as the explicitly archival `last-deployed-source-snapshot`. The owner-host source index was updated so future maintenance cannot re-enter through obsolete Sites instructions.

This decision supersedes the historical-workspace requirement in [issue #47](https://github.com/AyobamiH/proof-and-state/issues/47). The historical Sites workspace was not synchronised; it is no longer a prerequisite or a release target.

The dated 2 November clean-clone recovery receipt records an independent dependency installation, 13 passing owner-local tests and 135/135 generated files matching the release baseline: 19 catalogue entries, 14 articles and 28 sitemap routes. Fresh 3 November HTTP reads of the live catalogue and sitemap both returned 200 and matched the maintained checkout. The catalogue SHA-256 remains `b05479e2347d5e7fdd30c4f29b2be3e0d693cb52eb45637fcf3cbd6cdda41260`. These are owner-controlled checks; no new website deployment was needed.

## Published research and discovery

[PR #45](https://github.com/AyobamiH/proof-and-state/pull/45) is merged at `89ccb2b0c1a2789a845b77ebfea966cfd5a4d3b4`. The [main README](../../README.md#public-evidence-and-independent-review) links to [Discussion #44](https://github.com/AyobamiH/proof-and-state/discussions/44) and the [Post-Once lock-deferral model](post-once-lock-deferral.md).

The model and its eight tests are already public. They explain two real lock refusals and eleven unattempted policy deferrals within a synthetic eighteen-vault example. They do not export private production code, repeat provider operations, or prove a fresh production outcome.

`AIWA-RUNTIME-001` and `PF-POSTONCE-REPRO-001` now record completed engineering/publication work. `PF-TECHDISC-001` continues to track genuine external reproduction or counterexamples. Owner tests, owner comments and automated replies do not satisfy that separate requirement.

## Execution evidence boundary

[Issue #46](https://github.com/AyobamiH/proof-and-state/issues/46) remains a separate development-infrastructure item. The latest inspected [GitHub-hosted governance audit](https://github.com/AyobamiH/proof-and-state/actions/runs/41489272213) did not start any test steps because of the account-level billing restriction. The existing shared local CI fleet has not enrolled this repository. Neither a local developer test nor the read-only governance reminder is represented as automatic CI recovery.

The product matrix remains dated 10 October. Only the evidence-recording date advances to 3 November; this closure does not refresh unrelated product, deployment or customer-acceptance claims.

See the [machine-readable source and publication observations](../../evidence/research-closeout-20261103/source-and-publication.json). Candidate validation and merge receipts belong with the closure PR so that their tested commits remain explicit.

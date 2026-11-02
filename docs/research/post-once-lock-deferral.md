# Public Post-Once lock-deferral mechanism reproduction

This is a **credential-free synthetic reproduction of the scheduling decision**, not the private Post-Once implementation, not an anonymised copy of the production database, and not a re-run of X, Threads, LinkedIn or Google Docs provider operations.

The owner-observed 28 October incident started with 18 enabled vaults and 13 reported deferrals. Subsequent investigation established that **two actual `RunnerBusy` lock refusals** reached the two-consecutive-busy safety threshold; the next **eleven vaults were not attempted** because the collector yielded to the publisher. Treating all thirteen as lock collisions invents eleven failure events that never happened.

## Public runnable reproduction

Run the stdlib-only fixture from this repository:

```sh
node --test scripts/post-once-lock-deferral.test.mjs
node scripts/research/reproduce-post-once-deferral.mjs > post-once-deferral-result.json
```

The model uses `vault-00` through `vault-17` and synthetic busy responses at indices 5 and 6. No credentials, local private project files, provider clients, subprocess or network calls are used. The expected output is **PASS**, recording exactly:

| Fact | First synthetic cycle | After contention clears (second synthetic cycle) |
| --- | ---: | ---: |
| Enabled vaults | 18 | 18 |
| Completed | 5 | 18 |
| Real lock refusal attempts | 2 | 0 |
| Unattempted due to policy backoff | 11 | 0 |
| Total deferred by lock / backoff | 13 | 0 |
| Actual provider effects | 0 | 0 |

The [owner-operated synthetic result](post-once-owner-model-result-20261102.json) is retained in machine-readable form; it is not a private production receipt.

The eight unit tests assert the incident classification, skipped-work boundaries, single-busy behaviour, next-cycle restoration, separate budget deferrals, input duplication refusal, malformed historical observation refusal and deterministic outcome. **A passing synthetic test is not an independent reproduction of private operational data.**

## Source and evidence boundaries

- [AI Work Accountability historical case study](https://aiworkaccountability.com/writing/thirteen-deferred-vaults-were-not-thirteen-lock-collisions/) states the narrow incident, correction and preservation requirements.
- Original owner-controlled Post-Once work: [PR #380](https://github.com/AyobamiH/post-once/pull/380) (root-cause repair), [PR #381](https://github.com/AyobamiH/post-once/pull/381) (guarded recovery) and [PR #385](https://github.com/AyobamiH/post-once/pull/385) (29 October two natural-cycle acceptance).
- Historical source and provider records in the private Post-Once project cannot be anonymously downloaded, even though the owner and independent reviewer inspected the provider receipts. The **real** 29 October collector acceptance reported two successive naturally scheduled 18/18 successful cycles, zero lock/budget deferrals, 10 readiness targets and 1,754 retained prior verified receipt events. Those numbers are cited as historical owner-reviewed evidence, **not recalculated by this fixture**.
- Public code reproduces the two-strike *classification and progress* mechanism, not production lock contention, run-due scheduling, lock lease and owner identity, D1/SQLite consistency, provider readback, crash recovery or real-world latency.
- The corrected Post-Once logic included finite retries and lock-owner guards; the synthetic next cycle demonstrates possible progress after contention clears but must not be counted as proof of those deployed code paths.

## Negative controls and falsifiability

The fixture refuses duplicated vault or busy identifiers, invalid budget boundaries and malformed previous observations. A single busy vault must not produce 13 deferred entries. Budget exhaustion must not be reported as lock collision.

If another engineer demonstrates that a legitimate collector sequence yields a misleading classification, silently loses deferred work, or needs an alternative control policy, open a bounded reproduction with exact source, command and expected vs actual output. Do not submit secrets, private campaign text, account IDs or raw provider receipts. An independent reading of this public model counts as an external critique of its *mechanism*, not independent validation of the historical private production incident.

## Relation to the broader evidence question

[Proof & State Discussion #44](https://github.com/AyobamiH/proof-and-state/discussions/44) asks whether existing standards are sufficient to describe trustworthy agent outcomes. This Post-Once example shows why the evidence vocabulary matters: **not attempted is not a failed attempt**. It does not justify a new shared runtime, schema or product integration.

Author-produced with AI assistance. No peer-reviewed or independent reproduction has been accepted through this public fixture as of 2 November 2026.

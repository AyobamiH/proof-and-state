# Agent discovery and commercial intake release evidence

Observed 9 October 2026. Source, deployed behaviour, search-engine notification, Google indexing and paid commercial outcomes are distinct facts. Do not infer one from another.

## Agent Shop

- Authoritative source: AyobamiH/agent-shop-products at 0a0de2b3461b00bd489ef3716548d06d72d6950f. Four new source-backed skills were added for bounded maintainer release, capability reconciliation, consent-aware measurement and staged MCP activation. Catalogue totals: 25 real products, 11 prompts and 14 skills.
- Production agent-shop Cloudflare Worker version a204534a-76a0-4eda-93d5-5f76aba4e3d6 passed build, typecheck, lint, 37 unit tests, Worker dry-run, ten crawler identities and five machine-read surfaces. Outside-in readback found all four new product HTML and Markdown endpoints HTTP 200, canonical links, and a 25-product machine catalogue.
- Referral PR #20 (https://github.com/AyobamiH/agent-shop-products/pull/20) links the existing agent-subcontracting skill to Tail Wagging's independent service and commercial contracts, without granting payment, repository or publishing authority to Agent Shop.
- Production evidence PR #23 (https://github.com/AyobamiH/agent-shop-products/pull/23) is merged. Four new product URLs were added to the Proof & State GSC tracker. Six Agent Shop URLs, including home and shop, were submitted through IndexNow with **host-level key validation and HTTP 200**. Google sitemap acceptance and future indexing are not commercial conversion evidence.

## Tail Wagging

- Bounded structured work intake and D1 receipt status: PR #97 (https://github.com/AyobamiH/wagging-web-wins/pull/97) merged at 2bec7635d0e5ccdefc10dc14c655f2a0ad7d6344; protected production run 37859882502 succeeded. Live agentIntake and agentJobLedger capabilities are true, with EU D1 durability. A work order remains notification_pending until owner email succeeds and D1 confirms the conditional promotion to received. Regression tests cover failed email, failed DELETE and failed confirmation. Caller-supplied prices and forbidden merge/deploy/billing/secret authority are rejected.
- Commercial SEO PR #94 (https://github.com/AyobamiH/wagging-web-wins/pull/94) merged at 6ab8dfe0930e466c0bda224ded093154c91e5815; live services/contact title and canonical/readback checks passed, with no duplicate partial Organization nodes.
- Source-authority repair PR #107 (https://github.com/AyobamiH/wagging-web-wins/pull/107) merged at f8067b86dcd6e6b0ea36f5d74b827fc0b82cc706. Production /ecosystem.json declares schema 2.0.0 and no longer copies changing Agent Shop product counts. ToolsHub refers consumers to Agent Shop's canonical catalogue rather than claiming a stale count.
- Public hydration PR #96 (https://github.com/AyobamiH/wagging-web-wins/pull/96) merged at cd7c7be53c5941fb8fb4943dd6eec5dabd7ea884. Eight PR checks passed. Main CI 37891071812 and protected production workflow 37891265950 succeeded. Cloudflare Worker version 3c5c86ca-93d7-4b8d-ab54-036de01e6930 deployed at 100%.
- Independent readback matched the exact source SHA. The blog index, Workshop hub and Workshop guides each returned HTTP 200 with one parseable, HTML-delimiter-safe inert React Query state script. Production checkout, Stripe webhook, contact, agentIntake and agentJobLedger remained true.
- Read-only D1 aggregate inspection returned **zero persisted agent work orders** at inspection time. No genuine paid subcontract, quote acceptance, customer PR delivery or completed customer outcome is established by this technical acceptance.
- Seven public Tail Wagging URLs were notified to IndexNow with host-level key validated and HTTP 200. Google's sitemap registration was accepted; Google URL Inspection still showed /agents/ unknown.

## Proof & State parent website

- Existing PR #26 (https://github.com/AyobamiH/proof-and-state-website/pull/26) merged as b152436fd160a988a1017b77c5095ba12de33a3f. Protected website deployment 37890607733 succeeded.
- The public IndexNow verification file at proofandstate.com, www.proofandstate.com and agents.proofandstate.com returned byte-identical 39-byte text. The GSC Wizard parent-domain verification check passed.
- Ten priority parent website URLs received IndexNow HTTP 202 with downstream key validation pending. Do not call this confirmed indexing.

## Google indexing and outstanding human-owned domain

At URL Inspection time the Agent Shop /shop URL was indexed, Agent Shop root unknown, the subcontracting product discovered but not indexed, and Tail Wagging /agents/ unknown. Six active property trackers continue to monitor indexing without equating discovered, indexed or submitted with customers.

OneClick Website Design Factory is a separate incomplete DNS cutover. Its Cloudflare candidate passed, but the IONOS-controlled canonical domain was not moved into an active Cloudflare zone. The rejected Worker route and rollback work remain gated on the owner recovering IONOS registrar access. This release record grants no authority to change those DNS records.

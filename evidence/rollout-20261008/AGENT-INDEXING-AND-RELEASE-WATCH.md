# Agent discoverability and release evidence — 8 October 2026

## Boundary

This is an observed **outside-in and Google Search Console** handover, not an inferred assertion that every released page has been indexed or that agent referral traffic has converted to paying work. Track application release, marketing release, Google discovery, Google indexing and business outcomes separately. Do not expose customer secrets, registrar customer numbers or service-role credentials here.

## Accepted application and website evidence

- **Tail Wagging** — agent subcontracting, machine discovery and search-friendly presentation have passed the previously recorded production acceptance. Public estate: `https://tailwaggingwebdesign.com/`.
- **Agent Shop** — accepted registry design and 21 product catalogue at `https://agents.proofandstate.com/`; one product is `agent-subcontracting-commercial-handoff`. Search Console indexing of individual product pages remains distinct.
- **OpsTruth** — canonical/discovery repair at `5a69b1e`, with successful CI and website deploy workflow.
- **OneClickPostFactory** — public discovery deploy workflow [37777598929](https://github.com/AyobamiH/oneclickpostfactory/actions/runs/37777598929) passed, with public root/agent files/robots/sitemap readback. Subsequent Organization identity repair in `cdb0225` and guarded deployment also passed.
- **PostSteward application** — protected deployment [37778872240](https://github.com/AyobamiH/poststeward/actions/runs/37778872240) completed successfully on its second attempt for accepted application `abc23334b2c0ba01573945541513c466e72c999d`, with production policy healthy and public-signup mode retained.
- **PostSteward marketing** — independently hosted by `AyobamiH/poststeward-showcase`, *not* the application Worker. [Showcase PR #22](https://github.com/AyobamiH/poststeward-showcase/pull/22), merged `57c34b9`, added Organization/WebSite/SoftwareApplication JSON-LD plus a reachable 512px brand PNG. [Showcase PR #23](https://github.com/AyobamiH/poststeward-showcase/pull/23), merged `a2649e1`, reconciled all 50 public operation schemas and standing-autonomy semantics and installed exact-contract CI plus a daily live drift check. Protected [showcase deploy #37821754702](https://github.com/AyobamiH/poststeward-showcase/actions/runs/37821754702) was green; outside-in apex and www readback proved all 50 operations and 4 standing-autonomy operations, full field parity against the application's public catalogue and both brand PNG routes. [PostSteward issue #194](https://github.com/AyobamiH/poststeward/issues/194) closed with evidence.

## OneClick Website Design Factory — outstanding external domain cutover

Repository `AyobamiH/oneclickwebdesignfactory` current main `e6f537b1cdcf4d8a05bb478925da2485a38de9dc` ([PR #15](https://github.com/AyobamiH/oneclickwebdesignfactory/pull/15)) **removed the impossible apex Worker Route until registrar DNS is recovered**, while preserving the separately accepted workers.dev candidate and the reviewed cutover plan. Earlier main `a8075189c95cc1cac7053c35fbed0f0daa9d2276` had introduced the unapplied route configuration; no live route was ever confirmed. The Cloudflare candidate at `https://oneclick-webdesignfactory.woeinvests.workers.dev` was rebuilt using the public anonymous Supabase configuration from the incumbent site's own publicly served bundle, without accessing privileged data. Candidate version `2b7e06d9-0a3d-47e1-8828-b9ef0762c9e1` passed analytics (10/10), build, discovery contract, eight crawler identities, HTML/auth/legal routes, and rendered sign-in in headless Chrome. Real authenticated account and payment flows have **not** been established.

A reviewed `wrangler deploy --config wrangler.jsonc` attempted to attach the production route, but Cloudflare returned **zone missing in this account, error 10083**, after uploading the Worker. This is a *partial trigger update*, **not** a successful apex cutover. Production domain `oneclickwebsitedesignfactory.com` still uses IONOS authoritative DNS (`ui-dns` nameservers), and live HTML remained the older root without canonical/H1/JSON-LD. Historical Cloudflare setup was cancelled on 24 September because nameservers were never changed. The canonical blocker is [issue #13](https://github.com/AyobamiH/oneclickwebdesignfactory/issues/13).

To unblock safely: regain the original registrar account and inventory all existing DNS (web, mail, TXT, verification) before migration; add the zone in the approved Cloudflare account and use **freshly issued** nameservers; activate zone; restore/apply the reviewed Worker route through a new, explicitly versioned change; run `node scripts/verify-production-cutover.mjs` against the actual domain and verify auth/redirect/payment boundaries plus rollback. Never copy service-role or Stripe credentials into public bundles. Do **not** call production fixed until its own readback passes.

## Google Search Console inspection — 8 October

- PostSteward sitemap contains seven public HTML pages. Direct URL Inspection reports **six submitted and indexed** (`/`, `/onboarding/`, `/privacy/`, `/terms/`, `/data-deletion/`, `/install/`); `/agent-guide/` was unknown to Google. These last-crawl observations predate the new schema and catalogue release. Sitemap resubmitted; downloads queued, not indexing guarantees.
- Proof & State root was indexed. Agent Shop `/shop` was indexed (Google last crawl 8 Oct at 09:32Z), but Agent Shop `/` was **discovered, not indexed**, and `/products/agent-subcontracting-commercial-handoff` was unknown to Google. Agent Shop and Proof & State sitemaps were accepted for re-download; indexing pending.
- Other directly inspected roots: OneClick Website Design Factory, OneClickPostFactory and OpsTruth reported submitted and indexed as of the inspection, but without proving their newest release was crawled.

### Active GSC Wizard indexing trackers

The six site properties have active trackers, scoped primarily to human-readable public HTML rather than authenticated or machine-file routes. **Pending is not 'not indexed';** checks are asynchronous and tracker counters are partial at creation.

| Search Console property | Tracked URLs | Tracker ID |
|---|---:|---|
| `sc-domain:proofandstate.com` (main site + Agent Shop subdomain) | 40 | `d0a42e41-d332-4adb-bc99-b1f0b639cdbb` |
| `sc-domain:tailwaggingwebdesign.com` | 30 | `64589fcb-9508-412d-af4a-84cf875a1993` |
| `sc-domain:poststeward.com` | 7 | `cabc07ad-5d35-495f-9392-eca7c7248827` |
| `sc-domain:oneclickpostfactory.com` | 12 | `e00bf421-81df-4e65-8832-f555f9476f93` |
| `sc-domain:opstruth.io` | 4 | `ad6c4495-cfdb-415c-bd89-41683fc46867` |
| `sc-domain:oneclickwebsitedesignfactory.com` | 6 | `aaf7b5aa-a53b-47d7-b0ee-a9c553316a2b` |

**Total 99 URLs**, with hourly tracker checks driven by GSC Wizard's app schedule. Reconcile changes using live Google inspection and current production readback. IndexNow acceptance, sitemap acceptance, Google indexing, referral traffic and payment conversion must remain separate evidence classes.

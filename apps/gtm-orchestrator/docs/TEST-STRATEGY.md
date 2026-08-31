# Test strategy

## Test levels

1. **Pure validation:** job schema, HTTPS, supported channels, approval mode, idempotency.
2. **Provider contract:** request URL, method, headers, payload, returned identity, and read-back mapping using synthetic fixtures.
3. **Failure semantics:** 401/403 block; 408/429/5xx retry; ambiguous mutation forces read-back; mismatch never verifies.
4. **Cloudflare integration:** D1 migration, Queue retry and dead-letter behaviour, Cron dispatch, secret presence, log redaction.
5. **Provider permission probe:** read-only identity and permission check against the intended account/Page.
6. **Canary:** one explicitly authorised post, provider read-back, public/provider status, and receipt.
7. **Recovery exercise:** token expiry, rate limit, provider outage, duplicate delivery, and read-back drift.

## Claims allowed by test level

| Evidence | Allowed claim |
|---|---|
| Local contract tests | The adapter's expected request and response contract is internally consistent |
| Permission probe | The credential can observe the intended provider identity |
| Successful create response | The provider accepted a mutation request |
| Exact provider read-back | The intended post is `PUBLISHED_VERIFIED` |
| Public visibility or provider status | The post is externally visible or definitively published, with the distinction recorded |

Contract fixtures never prove live credentials, approved scopes, provider acceptance, public visibility, or interoperability.

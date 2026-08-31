# Provider feasibility and gates

Observed 2026-08-31. API documentation and local contract tests establish request shapes only. They do not establish account access, permission approval, production reachability, or publication.

| Provider | Official capability | Local contract | External gate | Current decision |
|---|---|---|---|---|
| Google Business Profile | Create, get, list, patch, and report on Local Posts | Token refresh, preflight list, create, CTA/media payload, and exact get tested | Google Cloud project, GBP API approval, OAuth client, verified active profile, account/location discovery | Blocked pending access evidence |
| LinkedIn | Create and retrieve organisation posts through Posts API | Organisation author, version headers, create ID, and get tested | LinkedIn developer app, approved organisation social permissions, administrator/content-admin role | Blocked pending access evidence |
| Facebook | Publish to Page feed and retrieve Page posts | Page preflight, feed create, returned ID and read-back tested | Meta app, Page access token, Page permissions, app/business review as applicable | Blocked pending access evidence |
| Instagram | Create media container, publish, and retrieve business media | Container, publish, and read-back tested | Professional account, linked assets, content-publishing permission, Meta app review as applicable | Blocked pending access evidence |
| Threads | Create container, publish, retrieve status/object | Container, publish, and read-back tested | Threads app configuration, user ID, publishing permission and token | Blocked pending access evidence |
| Cloudinary | Durable delivery and Admin/Upload APIs | HTTPS tenant, ownership and media-content preflight tested | Dedicated API key; upload and transformation contract tests remain | Partially implemented |

## Findings that prevent wasted implementation

- Google has no general Local Posts sandbox. Project approval and real OAuth access must be proven before live adapter completion.
- LinkedIn API version headers are mandatory and versions sunset; the version is configuration, not a hard-coded architectural constant.
- Instagram and Threads publishing are multi-step mutations. An ambiguous container or publish response must be queried before retry.
- Facebook, Instagram, and Threads share Meta infrastructure but retain distinct asset identities, tokens, permissions, and read-back semantics.
- Cloudinary delivery URLs can be validated without its API secret. Upload, deletion, transformation administration, and inventory require dedicated credentials.
- No channel may be declared operational until a provider account/Page identity and exact read-back canary are recorded.

## Sources

- Google Business Profile prerequisites: https://developers.google.com/my-business/content/prereqs
- Google Local Posts: https://developers.google.com/my-business/reference/rest/v4/accounts.locations.localPosts
- LinkedIn Posts API: https://learn.microsoft.com/linkedin/marketing/community-management/shares/posts-api
- Facebook Page feed: https://developers.facebook.com/docs/graph-api/reference/page/feed/
- Meta permissions: https://developers.facebook.com/docs/permissions/
- Threads reference: https://developers.facebook.com/docs/threads/reference
- Cloudinary credentials: https://cloudinary.com/documentation/developer_onboarding_faq_find_credentials

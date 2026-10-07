# Shared operating contract

<!-- Generated from governance/shared-operating-contract.json. Do not edit by hand. -->

An agent must not infer world state from an upstream claim when a higher consequence boundary can be observed.

## Green

GREEN means the highest acceptance layer required by the work profile has passed with current evidence.

Forbidden shortcut: A lower layer passing never promotes a higher layer.

## State vector

- **availability:** `unknown`, `discovered`, `present`, `installed`, `enabled`, `authenticated`, `runnable`
- **execution:** `not_started`, `running`, `succeeded`, `failed_safe`, `failed_unsafe`, `blocked`
- **consequence:** `none`, `attempted`, `accepted`, `rejected`, `ambiguous`
- **readback:** `unknown`, `pending`, `matched`, `mismatched`, `unavailable`
- **outcome:** `unknown`, `pending`, `verified`, `failed`, `not_applicable`
- **evidence:** `claimed`, `observed`, `independently_verified`, `disproved`
- **freshness:** `current`, `stale`, `superseded`

## Acceptance layers

1. **source:** Exact source or configuration identity exists.
1. **local_validation:** Candidate passes bounded local checks.
1. **ci:** Repository-native checks pass for the exact candidate.
1. **provider_acceptance:** External provider accepted the requested consequence.
1. **deployment:** Provider created or updated the intended runtime or object.
1. **outside_in_readback:** Consequence is independently observable from the public or delegated boundary.
1. **outcome:** Intended user or business result is verified.

## Invariants

- unknown is valid and must not be coerced into success or failure
- accepted is not readback_verified
- deployed is not outcome_verified
- ambiguous mutation is read back before retry
- executor claims cannot independently verify the executor
- missing evidence remains unknown
- consequential state carries an evidence identity and observed_at
- stale evidence cannot silently remain current
- temporary authority expires or is explicitly retained with evidence

## Credential custody

Record custody and proof of usability, never credential material.

Record: `provider`, `authority`, `storage`, `scope`, `consumers`, `last_proven_at`, `rotation_status`, `evidence`.

Never record: `secret`, `token`, `private_key`, `password`.

## Temporary bridges

- A bridge cannot silently become permanent architecture.
- Remove it after the bounded consequence unless explicitly promoted.
- Promotion requires a new reviewed authority decision.
- Removal proof is separate from successful use.

Required bridge record:

- `purpose`
- `source_authority`
- `target`
- `bounded_scope`
- `created_at`
- `expiry_condition`
- `removal_proof`

## Machine discovery

Required public surfaces:
- `canonical_html`
- `robots_txt`
- `sitemap_xml`
- `machine_json_or_equivalent`
- `agent_discovery_document`
- `stable_metadata_urls`

Recommended public surfaces:
- `llms_txt`
- `agents_txt`
- `raw_metadata_markdown`

Truthfulness:
- Do not invent commercial or evidence fields.
- Do not expose private prompt, skill, credential or customer payloads.
- Structured data must match actual commercial state.
- Sitemap submission is not indexing evidence.

Acceptance:
- `outside_in_fetch`
- `canonical_origin_consistency`
- `machine_surface_content_types`
- `representative_crawler_user_agents`
- `private_or_retired_route_fencing`
- `provider_index_state_separate_from_crawlability`

## Adoption

| Surface | Role |
|---|---|
| DoneState | bounded execution |
| OpsTruth | independent verification |
| AgentProof | consequence receipt indexing |
| Agent Shop | agent capability discovery |
| Post-Once | autonomous publication |
| Tail Wagging Website Design Factory Northampton | agent-discoverable commercial subcontracting |

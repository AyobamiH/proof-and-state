import test from "node:test";
import assert from "node:assert/strict";
import {simulateCollection,simulateRetryAfterLockRelease} from "./research/post-once-lock-deferral.mjs";

const fixture=()=>simulateCollection({busyIds:["vault-05","vault-06"]});
test("18-vault incident: two actual busy lock refusals are not thirteen collisions",()=>{
 const r=fixture();
 assert.equal(r.totalEnabled,18);
 assert.equal(r.completed,5);
 assert.equal(r.actualRunnerBusyRefusals,2);
 assert.equal(r.unattemptedByTwoStrikePolicy,11);
 assert.equal(r.reportedLockDeferrals,13);
 assert.equal(r.attemptedVaults,7);
 assert.equal(r.realProviderCalls,0);
 assert.equal(r.actualPublicationEffects,0);
});
test("eleven policy-skipped vaults were never attempted",()=>{
 const r=fixture();assert.equal(r.rows.filter(x=>x.state==="deferred_policy").length,11);
 for(const row of r.rows.slice(7)){assert.equal(row.attempted,false);assert.equal(row.reason,"publisher_state_lock_backoff");}
 assert.deepEqual(r.rows.slice(5,7).map(x=>x.state),["busy","busy"]);
});
test("a single busy vault does not suppress all later vaults",()=>{
 const r=simulateCollection({busyIds:["vault-05"]});
 assert.equal(r.actualRunnerBusyRefusals,1);assert.equal(r.unattemptedByTwoStrikePolicy,0);
 assert.equal(r.completed,17);assert.equal(r.attemptedVaults,18);
});
test("another natural cycle after contention clears can complete all vaults",()=>{
 const r=simulateRetryAfterLockRelease(fixture());
 assert.equal(r.completed,18);assert.equal(r.reportedLockDeferrals,0);assert.equal(r.attemptedVaults,18);
});
test("collection budget deferral is not counted as lock collision",()=>{
 const r=simulateCollection({busyIds:[],budgetStopBefore:5});
 assert.equal(r.unattemptedByBudget,13);assert.equal(r.actualRunnerBusyRefusals,0);
 assert.equal(r.reportedLockDeferrals,0);assert.equal(r.attemptedVaults,5);
});
test("invalid or duplicated source/lock identities fail before counting",()=>{
 assert.throws(()=>simulateCollection({vaults:["vault-00","vault-00"]}),/invalid_or_duplicate_vault_ids/);
 assert.throws(()=>simulateCollection({busyIds:["vault-05","vault-05"]}),/invalid_or_duplicate_busy_ids/);
 assert.throws(()=>simulateCollection({budgetStopBefore:-1}),/invalid_budget_boundary/);
});
test("corrupt prior observation cannot be promoted to successful recovery",()=>{
 let r=fixture();r.rows.pop();assert.throws(()=>simulateRetryAfterLockRelease(r),/invalid_prior_collection_observation/);
});
test("deterministic output identifies unattempted work, not imaginary provider failures",()=>{
 const a=fixture(),b=fixture();assert.deepEqual(a,b);
 assert.equal(a.rows.every(x=>!Object.hasOwn(x,"providerId")),true);
 assert.equal(a.rows.filter(x=>x.attempted===false).length,11);
});

# Handoff — nda-tracker question sync (vault side)

**Written 2026-09-11 by the nda-tracker session; the vault side was completed the same day.**
The read bridge is live end to end except for one env setting, which only the account owner can do.

The contract both apps implement is nda-tracker's **`CROSS_APP_SYNC.md`** — read that for the
payload shape and the paper-push design. This file is the vault side's state and the reasoning
that must not be simplified away.

---

## Status

| Piece | Where | State |
|---|---|---|
| `GET /api/questions/by-ids` | this repo | **done, deployed** |
| `src/lib/sync/questionPayload.ts` (THE shape) | this repo | done |
| Migration `tracker_sync_targets` | prod ledger `20260911102415` | **applied** |
| `tracker_sync_targets` row for LWS Pune | vault DB | **provisioned** |
| Route integration test | `tests/sync-by-ids-route.test.ts` | **done — 8 cases, fault-proven** |
| Tracker's outbound fetch | nda-tracker `716d3e2` (pushed, live) | done; fails closed until env is set |
| `VAULT_API_URL` + `VAULT_SYNC_SECRET` | nda-tracker Vercel env | **not set** ← the user, via dashboard |
| Paper push | — | **not built.** Specced only. |

### The one remaining step

Set two variables in the **nda-tracker** Vercel project (Settings → Environment Variables), then
redeploy it:

    VAULT_API_URL     = https://www.pyqvault.com
    VAULT_SYNC_SECRET = <LWS Pune's shared_secret>

Read the secret out of the vault DB with service-role access — it is deliberately never written
into this repo, a transcript, or a `.env` file here:

```sql
select o.name, t.tracker_url, t.shared_secret
  from tracker_sync_targets t join organizations o on o.id = t.org_id;
```

Until both are set the tracker's fetch **fails closed** — it does not degrade to a partial sync.

---

## What was applied

The table, exactly as `supabase/migrations/0094_tracker_sync_targets.sql`, through the MCP
`apply_migration` path so the DDL and the ledger row land together. **Apply by hand only as a last
resort:** this DB records migrations as timestamp versions in
`supabase_migrations.schema_migrations`, and a hand-applied migration leaves the ledger a false
record of prod's schema — the inverse of the migration-0021 defect this project already carries.
(Nothing *re-applies* it on a push: `prepush` and CI never touch prod schema, and `testdb:migrate`
tracks the TEST project separately by filename in `public.testdb_migrations`.)

**The lock was verified against a NON-EMPTY table**, which is the only way the check means
anything: `service_role=1, anon=0, authenticated=0`. RLS is on with **no policies** — the locked
`platform_admins` pattern. Nothing holding an anon or authenticated JWT can read it, including a
signed-in org admin: a tracker credential is platform configuration, not org-visible data.

**The secret is plaintext on purpose.** The push direction has to *send* it, so a one-way hash
would break that. Which is exactly why the table is service-role only. It was generated inside
Postgres (`gen_random_uuid()` ×2, 64 hex chars) so it was never constructed in a terminal.

## ONLY LWS Pune has a row

This DB has **five orgs**: Arjunaa Foundation, Devendra Kumar, Eswar, LWS Pune, Modulus Classes.
Every institute is getting its **own** tracker deployment (decided 2026-09-11; the shared-DB
tracker rebuild is a stated direction but unbuilt). Until an institute has a tracker provisioned it
gets no row — which is also the gate for the Push button when you build it:

> **The Push button is enabled IF AND ONLY IF that org has a `tracker_sync_targets` row.**
> Not an allow-list of institute names — this repo already carries a hardcoded
> `DESTINATION_ORG_NAME = "LWS Pune"` in `api/sync/mock`, and that is the wart this avoids
> repeating. A disabled button must say *why* ("no tracker configured for this institute").

## Verification

`tests/sync-by-ids-route.test.ts` owns the security boundary — what used to be a manual curl
checklist. It builds **two** throwaway orgs, so "my PRIVATE row" and "their PRIVATE row" are
genuinely different rows, and asserts:

1. the presenting org's own **PRIVATE** question resolves (the entire reason this route is authed);
2. a **PUBLIC** question resolves whoever owns it;
3. **another org's PRIVATE question does NOT**, and is reported as `missing` — the assertion the
   original checklist omitted, and the one that matters at institute #2;
4. a mixed request scopes per-id rather than all-or-nothing;
5. an unknown uuid lands in `missing[]` rather than being silently dropped;
6. `imageUrl` is an absolute `https://…/storage/v1/object/public/question-images/…` url;
7. a wrong secret returns **401 with a body byte-identical to no secret at all**;
8. 101 ids returns **400**, not a truncated 200.

**Both halves of the boundary were fault-proven rather than trusted for passing**: deleting the
route's org-scoping turns exactly 3 and 4 red and nothing else; making the unknown-secret branch
return `403 {"error":"unknown secret"}` turns exactly 7 red. A check that has never gone red proves
nothing.

Still worth one real curl against production once the tracker env is set, since the test exercises
the handler in-process and not the deployed edge:

    curl -s -H "Authorization: Bearer <secret>" \
      "https://www.pyqvault.com/api/questions/by-ids?ids=<question uuid>"

---

## Design constraints — do not "simplify" these away

- **Authenticated and org-scoped, never anonymous.** The first draft of the spec made this route
  public over PUBLIC rows. That is wrong: anon RLS sees only PUBLIC rows and much of this bank is
  PRIVATE, so an anonymous endpoint returns **nothing** for exactly the papers that matter, with no
  error — and cannot serve a second institute at all.
- **`missing[]` is contract, not courtesy — and it carries TWO causes deliberately.** An id is
  missing when it names no row (a stem repair here is a delete-and-re-commit, which mints a new
  uuid, so a tracker exam can hold a dead id through nobody's error) **and** when it names another
  institute's PRIVATE row. Those are indistinguishable on purpose, for the same reason an unknown
  secret returns the same 401 as no secret: a caller must not be able to probe this bank for the
  existence of content it may not read.
- **Over-cap requests are REFUSED, not truncated** (`MAX_IDS = 100`). The known `.in()` failure in
  this repo was 833 ids ≈ 31 kB, and `/guide/nda-maths/principles` still passes 488 while
  discarding the error, rendering an empty map with no signal.
- **One payload shape, three transports.** `src/lib/sync/questionPayload.ts` is it — the Tags xlsx,
  this route, and the paper push. `tagsSheet.ts` now consumes its derivations rather than redefining
  them; writing the payload builder had briefly created a *second* subject map and answer
  derivation. Field names are **nda-tracker's** deliberately, so hydration there is a merge and
  never a translation.
- **Routing is per-org config, never a payload field.** A caller-chosen destination means one wrong
  value delivers institute B's paper into institute A's tracker.

## Known gaps, accepted

- **No rate limit and no per-call logging.** Every other guarded route here uses `checkAndIncrement`
  ([export](src/app/api/export/route.ts), [teacher-access](src/app/api/teacher-access/route.ts),
  the batch routes). This one is bearer-gated server-to-server, so the exposure is lower — but the
  secret sits in another app's env indefinitely and there is currently no signal of *which* org
  called, or how often. Rotation today means an `update` on the row plus a redeploy there.
- **Response order is arbitrary.** `queryQuestionsByIds` does not reorder (`/browse` does it at the
  call site). Harmless because the tracker merges by `questionId` — but do not start depending on it.

## Not built

**The paper push** (vault → tracker). Specced in nda-tracker's `CROSS_APP_SYNC.md`: the payload,
the `kind` discriminator it folds into on the tracker side (that app is at 12/12 Vercel Hobby
functions and cannot take a 13th file), and two hard guards — a re-push **refuses** an exam that
already has results, and a paper deleted here must **not** delete a tracker exam that has results.

Its prize: build the paper here → push → the exam exists in the tracker *with diagrams* →
conduct → upload only the Evalbee results. **No Tags file at all** for vault-built papers.

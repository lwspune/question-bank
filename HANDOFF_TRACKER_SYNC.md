# Handoff — nda-tracker question sync (vault side)

**Written 2026-09-11 by the nda-tracker session.** Both halves of the bridge are written and
tested; the whole thing is inert until three things happen, two of them here.

The contract both apps implement is nda-tracker's **`CROSS_APP_SYNC.md`** — read that for the
payload shape and the paper-push design. This file is only what is left to do.

---

## Status

| Piece | Where | State |
|---|---|---|
| `GET /api/questions/by-ids` | this repo, commit `b31895cc` | **written, tested, committed — NOT pushed** |
| `src/lib/sync/questionPayload.ts` (THE shape) | this repo, same commit | done |
| Migration `0094_tracker_sync_targets` | `supabase/migrations/` | **written, NOT applied** ← you |
| `tracker_sync_targets` row for LWS Pune | vault DB | **not provisioned** ← you |
| Tracker's outbound fetch | nda-tracker `716d3e2` (pushed, live) | done; fails closed until env is set |
| `VAULT_API_URL` + `VAULT_SYNC_SECRET` | nda-tracker Vercel env | **not set** ← the user, via dashboard |
| Paper push | — | **not built.** Specced only. |

`b31895cc` is **one commit ahead of origin** and was left unpushed deliberately: this repo had six
modified `scripts/practice-paper/` files in flight at the time, and the pre-push gate runs the full
suite against the shared prod DB. Push it when your tree is in a state you are happy to gate.

---

## 1. Apply the migration + provision LWS Pune

The nda-tracker session has `SUPABASE_DB_URL` access here but its write was blocked by a safety
classifier, so this never ran. Either apply `supabase/migrations/0094_tracker_sync_targets.sql`
through your normal path, or paste this:

```sql
-- the table (identical to 0094_tracker_sync_targets.sql)
create table tracker_sync_targets (
  org_id        uuid primary key references organizations(id) on delete cascade,
  tracker_url   text not null,
  shared_secret text not null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create unique index tracker_sync_targets_secret_idx
  on tracker_sync_targets (shared_secret);
alter table tracker_sync_targets enable row level security;

-- provision LWS Pune ONLY (see section 2). Secret generated inside Postgres so
-- it is never constructed in a terminal or a transcript.
insert into tracker_sync_targets (org_id, tracker_url, shared_secret)
select id,
       'https://nda-tracker.vercel.app',
       replace(gen_random_uuid()::text,'-','') || replace(gen_random_uuid()::text,'-','')
  from organizations where name = 'LWS Pune';

-- read it back — this value is VAULT_SYNC_SECRET in the tracker's Vercel env
select o.name, t.tracker_url, t.shared_secret
  from tracker_sync_targets t join organizations o on o.id = t.org_id;
```

**RLS is enabled with NO policies on purpose** — the locked `platform_admins` pattern. Nothing
holding an anon or authenticated JWT can read it, including a signed-in org admin: a tracker
credential is platform configuration, not org-visible data.

**The secret is plaintext on purpose.** The push direction has to *send* it, so a one-way hash
would break that. Which is exactly why the table is service-role only.

**Ledger:** this DB records migrations as timestamp versions in
`supabase_migrations.schema_migrations` (e.g. `20260908080329`) — what the MCP `apply_migration`
path writes, not the `0094_` file numbering. If you apply the SQL by hand, add a ledger row too, or
a later push may try to re-apply it.

## 2. ONLY LWS Pune gets a row

This DB already has **five orgs**: Arjunaa Foundation, Devendra Kumar, Eswar, LWS Pune, Modulus
Classes. Every institute is getting its **own** tracker deployment (decided 2026-09-11; the
shared-DB tracker rebuild is a stated direction but unbuilt). Until an institute has a tracker
provisioned it gets no row — which is also the gate for the Push button when you build it:

> **The Push button is enabled IF AND ONLY IF that org has a `tracker_sync_targets` row.**
> Not an allow-list of institute names — this repo already carries a hardcoded
> `DESTINATION_ORG_NAME = "LWS Pune"` in `api/sync/mock`, and that is the wart this avoids
> repeating. A disabled button must say *why* ("no tracker configured for this institute").

## 3. Verify

Once applied and pushed/deployed, call the route with the secret and a real question id:

    curl -s -H "Authorization: Bearer <secret>" \
      "https://www.pyqvault.com/api/questions/by-ids?ids=<question uuid>"

Expect `{"questions":[...],"missing":[]}`. Then check, in order:

1. **A PRIVATE LWS Pune question resolves.** This is the entire reason the route is authenticated.
2. **A made-up uuid comes back in `missing[]`** rather than being silently dropped.
3. **101 ids returns 400**, not a truncated 200.
4. **A wrong secret returns 401**, indistinguishable from no secret.
5. **`imageUrl` is an absolute `https://.../storage/v1/object/public/question-images/...` URL**, not
   a bare storage path — the tracker stores what it receives and must render it years later without
   knowing our Supabase host.

---

## Design constraints — do not "simplify" these away

- **Authenticated and org-scoped, never anonymous.** The first draft of the spec made this route
  public over PUBLIC rows. That is wrong: anon RLS sees only PUBLIC rows and much of this bank is
  PRIVATE, so an anonymous endpoint returns **nothing** for exactly the papers that matter, with no
  error — and cannot serve a second institute at all.
- **`missing[]` is contract, not courtesy.** A stem repair here is a delete-and-re-commit
  (`content_hash` covers the stem) which mints a **new uuid**, so a tracker exam can hold a dead id
  through nobody's error. That is signal about a repaired question, not an absence of content.
- **Over-cap requests are REFUSED, not truncated** (`MAX_IDS = 100`). The known `.in()` failure in
  this repo was 833 ids ~= 31 kB, and `/guide/nda-maths/principles` still passes 488 while
  discarding the error, rendering an empty map with no signal.
- **One payload shape, three transports.** `src/lib/sync/questionPayload.ts` is it — the Tags xlsx,
  this route, and the paper push. `tagsSheet.ts` now consumes its derivations rather than redefining
  them; writing the payload builder had briefly created a *second* subject map and answer
  derivation. Field names are **nda-tracker's** deliberately, so hydration there is a merge and
  never a translation.
- **Routing is per-org config, never a payload field.** A caller-chosen destination means one wrong
  value delivers institute B's paper into institute A's tracker.

## Not built

**The paper push** (vault -> tracker). Specced in nda-tracker's `CROSS_APP_SYNC.md`: the payload,
the `kind` discriminator it folds into on the tracker side (that app is at 12/12 Vercel Hobby
functions and cannot take a 13th file), and two hard guards — a re-push **refuses** an exam that
already has results, and a paper deleted here must **not** delete a tracker exam that has results.

Its prize: build the paper here -> push -> the exam exists in the tracker *with diagrams* ->
conduct -> upload only the Evalbee results. **No Tags file at all** for vault-built papers.

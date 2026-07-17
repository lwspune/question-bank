# Database long-term viability review — findings + execution plan

**Date:** 2026-07-16 · **Reviewed by:** Claude (live inspection of prod Supabase `wunvtnqlzjrkvolslbnm`)
**Purpose:** handoff doc — a follow-up session should be able to execute this without re-deriving anything.
**Status legend:** `[ ]` open · `[x]` done (update in place as items ship; move shipped items' "why" into the CLAUDE.md Decisions log).

## Evidence base (what was actually inspected)

- 36 public tables, 104 indexes, DB total **103 MB** (questions 48 MB / ~26.3k rows incl. PRIVATE; options 20 MB / ~95.6k rows).
- All 75 performance-advisor lints parsed: **35 auth_rls_initplan (WARN)** · **11 multiple_permissive_policies (WARN)** · **23 unindexed_foreign_keys (INFO)** · **6 unused_index (INFO)** · 0 duplicate_index.
- Security advisors: near-clean — only `platform_admins`/`rate_limits` RLS-no-policy (both **intentional**, locked tables — leave), `record_quiz_lead` mutable search_path, and Auth leaked-password protection disabled.
- `pg_stat_statements`: **top query by total time is `DELETE FROM auth.users` — 54,550 calls · 76.6 ms mean · ~70 min cumulative**, paired with 54,601 user INSERTs. This is the DB-integration test suite churning auth users against prod.
- Two live test orgs (`Branches RLS Org A/B f23a9f86`) observed mid-run during the review (self-cleaned minutes later) — confirms tests hit prod constantly, not just on leaks.
- `rate_limits`: 5,842 rows dating back to 2026-05-10 despite the RPC's "2-hour GC" (see item 4a for why).
- Vacuum/bloat: healthy everywhere; autovacuum keeping up. No action needed.
- Overall verdict: schema design is strong (append-only migrations, RLS boundary, RPC aggregates, per-exam dedup, good composite read indexes). The long-term risks are **operational patterns**, itemized below.

---

## Priority 1 — one additive migration (`0060_longterm_hardening.sql`), zero behavior change

All sub-items are safe on the live app (additive indexes / equivalent policy predicates / triggers). Apply via Supabase MCP `apply_migration` per convention. Run `get_advisors` (both types) after. **Shared prod DB rule applies** ([[feedback-shared-prod-db-migration-ordering]]): nothing here is destructive, so no code-deploy coupling needed.

### 1a. `[ ]` FK covering indexes (closes 3 failure classes)

**Class 1 — taxonomy FKs on `questions` (hot: every Phase-D subtopic delete / chapter merge currently seq-scans 26k rows per statement):**

```sql
create index questions_chapter_id_idx  on public.questions (chapter_id);
create index questions_subtopic_id_idx on public.questions (subtopic_id) where subtopic_id is not null;
-- subject_id: LOW priority — always queried behind questions_filter_idx (org,exam,subject,chapter)
-- and subjects are never deleted. Include only for completeness:
create index questions_subject_id_idx  on public.questions (subject_id);
```

**Class 2 — `auth.users` audit FKs (why each auth-user delete costs 77 ms; matters for CI speed today and DPDP account-deletion tomorrow).** Index only the columns on LARGE tables; skip tiny tables (branches/batches/papers/entitlements/concept_reports — seq scan is fine there):

```sql
create index questions_created_by_idx      on public.questions (created_by)      where created_by is not null;
create index questions_last_edited_by_idx  on public.questions (last_edited_by)  where last_edited_by is not null;
create index upload_jobs_created_by_idx    on public.upload_jobs (created_by);
create index quiz_atoms_verified_by_idx    on public.quiz_atoms (verified_by)    where verified_by is not null;
create index question_concept_tags_tagged_by_idx on public.question_concept_tags (tagged_by) where tagged_by is not null;
```

**Class 3 — junction back-references (PKs lead with the OTHER column; these joins/cascades run by `question_id`):**

```sql
-- paper_questions.question_id is a REAL query path: the per-batch no-repeat soft-warn joins by question_id
create index paper_questions_question_id_idx  on public.paper_questions (question_id);
-- attempt_answers grows ~150 rows per mock submit — the fastest-growing student table
create index attempt_answers_question_id_idx  on public.attempt_answers (question_id);
create index question_bookmarks_question_id_idx on public.question_bookmarks (question_id);
create index mock_feedback_user_id_idx        on public.mock_feedback (user_id);
```

**Deliberately NOT indexed** (document in the migration comment so the advisor lint noise is understood): `batches/branches/papers/quizzes .created_by`, `papers/batches .exam_id`, `entitlements.granted_by`, `question_reports/concept_reports .resolved_by`, `question_principle_tags.tagged_by`, `paper_questions.added_by` — all tiny tables or dead-cold columns; an index is pure write overhead.

### 1b. `[ ]` RLS initplan fix — wrap bare `auth.uid()` as `(select auth.uid())` in 35 policies

Bare `auth.uid()` is re-evaluated **per row**; the subselect form evaluates once per query. All 35 are on exactly the tables that grow with students (empty/small today — fix before scale). Mechanical rewrite: `alter policy ... using/with check` with the identical predicate, only wrapping the auth call. Also wrap `auth.role()` if present.

Full list (table :: policies):

- `org_members` :: `self read membership`
- `mock_attempts` :: `mock_attempts_select_own`, `mock_attempts_insert_own`, `mock_attempts_update_own`
- `attempt_answers` :: `attempt_answers_all_own`
- `student_profiles` :: `student_profiles_select_own`, `student_profiles_insert_own`, `student_profiles_update_own`
- `batches` :: `batches_select_scoped`, `batches_update_scoped`, `batches_delete_creator_or_admin`
- `notes_progress` :: `notes_progress_select_own`, `notes_progress_insert_own`, `notes_progress_update_own`, `notes_progress_delete_own`
- `question_bookmarks` :: `question_bookmarks_select_own`, `question_bookmarks_insert_own`, `question_bookmarks_delete_own`
- `papers` :: `papers_select_scoped`, `papers_update_scoped`, `papers_delete_creator_or_admin`
- `mock_feedback` :: `mock_feedback_select_own`, `mock_feedback_insert_own`, `mock_feedback_update_own`
- `question_reports` :: `question_reports_insert`, `question_reports_reporter_read_own`
- `entitlements` :: `entitlements_select_own`
- `concept_reports` :: `concept_reports_insert`, `concept_reports_reporter_read_own`
- `user_feedback` :: `user_feedback_select_own`, `user_feedback_insert_own`
- `user_activity` :: `user_activity_select_own`, `user_activity_insert_own`
- `paper_questions` :: `paper_questions_write_scoped`
- `email_sends` :: `email_sends_select_own`

Note: the `private.*` helper functions called inside some of these (e.g. `current_user_branch_ids()`) are fine — the lint is specifically about the top-level `auth.uid()` calls in the policy expression.

**Verify:** the existing RLS integration tests (`tests/*-rls.test.ts`) must stay green — they are the behavioral proof the rewrite is predicate-identical. Then `get_advisors performance` → 0 auth_rls_initplan.

### 1c. `[ ]` `updated_at` triggers — systemic gap, 11 tables

**All 11 tables carrying `updated_at` have ZERO triggers** — the column only reflects insert time unless app code sets it. Already bit once for real: the unsubscribe opt-out UPDATE left `student_profiles.updated_at` at creation time (a DPDP "when was consent withdrawn" gap — see the 2026-07-16 Decisions entry). Fix all 11 at once:

```sql
create extension if not exists moddatetime schema extensions;
-- one per table:
create trigger handle_updated_at before update on public.student_profiles
  for each row execute function extensions.moddatetime(updated_at);
-- ...repeat for: attempt_answers, batches, branches, mock_attempts, mock_feedback,
--    mock_tests, notes_progress, papers, quiz_atoms, quizzes
```

**Caveat to check first:** any app code that deliberately sets `updated_at` itself will now be overridden by the trigger (trigger wins, which is the correct semantic). Grep `src/` + `scripts/` for `updated_at` writes before shipping; expected result is "few or none, all happy to be replaced."

### 1d. `[ ]` `record_quiz_lead` mutable search_path

The one function missed by the earlier hardening pass. `alter function public.record_quiz_lead(...) set search_path = '';` (match the exact signature; re-qualify any unqualified table refs inside the body if needed — it's SECURITY DEFINER).

### 1e. `[ ]` Fix `rate_limit_increment` GC (currently unbounded growth)

The RPC's delete is `where bucket = p_bucket and window_start < now() - interval '2 hours'` — **per-bucket**, so any bucket that stops being hit (per-user buckets especially) lives forever: 5,842 rows back to May 10. Two options; simplest first:

```sql
-- option A (in the function): drop the bucket predicate — the delete uses rate_limits_cleanup_idx (window_start)
delete from rate_limits where window_start < now() - interval '2 hours';
```

Option B: leave the function, add a pg_cron sweep (see 2b). Option A is one line and self-contained — recommended. Cost: the delete scans by `window_start` index; with ~6k rows this is sub-ms, and it self-bounds the table so it stays that way.

---

## Priority 2 — ops (this month, no migration)

### 2a. `[ ]` Separate the test database from prod — **highest-leverage item in this doc**

The test suite is the single biggest load on prod (evidence above), and fixture leaks have already had two real blast radii (inflated bank counts; outbound email nearly sent to `@test.invalid` bounce addresses). Sweeps treat symptoms; separation removes the class.

Options, in order of preference:
1. **Supabase preview branch** (MCP has `create_branch`/`merge_branch`) — same project, isolated data, migrations replay onto it.
2. **Second free-tier project** dedicated to CI/local tests — point the three CI secrets + local `.env.test` at it; run `db:seed` + all migrations there once.

Either way: CI secrets (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) repoint; local `npm test` gets a distinct env file so a dev can't accidentally run the suite against prod. The `global-teardown` org-sweep stays as defense-in-depth. CLAUDE.md's CI-gate section already anticipates this ("point the secrets at a staging project if write traffic gets noisy") — it is now noisy.

### 2b. `[ ]` Enable pg_cron + host the maintenance jobs

`pg_cron` is available but not installed. One-time `create extension pg_cron;` (via migration), then schedule:
- **Nightly test-org safety sweep** (until 2a lands): delete orgs matching the `isTestOrgName` 8-hex pattern older than 24h (mirror the `tests/global-teardown-helpers.ts` logic — clear `question_reports` first, its org FK is RESTRICT).
- **Rate-limits sweep** (if 1e option B chosen).
- Future retention jobs (2d).

### 2c. `[ ]` Backups — verify plan tier, start a dump hedge NOW

The DB **is** the business: ~23k curated questions, ~230 verified key corrections, authored solutions — months of unrepeatable editorial labor. The most realistic disaster is not hardware, it's **one bad service-role script** (the ingestion pipelines run with RLS bypassed routinely) — and only PITR/dumps recover from that.
1. Check what the current Supabase plan actually provides (free tier ≈ no usable recovery; Pro = daily backups, PITR add-on).
2. Regardless: add a scheduled **`pg_dump` of the content tables** (questions, options, taxonomy, tags, quiz_*, mock_tests) to local disk / Drive — trivially scriptable with the existing tsx + `.env.local` service-role infra; weekly is enough given ingestion cadence. Keep dumps out of the public repo.
3. Fold into the existing "Pro before Razorpay" plan — this review adds "Pro before the next big ingestion push" as the real deadline.

### 2d. `[ ]` Retention decisions — write them down (decide, don't necessarily build)

- **`user_activity`** — append-only spine; will become the largest table. Decide now: (a) accept one-big-table + the existing cap-safe RPC aggregates and monitor (fine into the millions of rows), or (b) plan pg_partman monthly partitions. Recommendation: **(a)**, revisit at ~5M rows; retrofitting partitioning is painful but the table is years from needing it. Record the decision in the Decisions log so it isn't re-litigated.
- **`upload_jobs`** — 3.9 MB of staged JSONB across 251 rows, kept forever post-commit. Cheap now; add a "null out staged payload after successful commit, keep the row for provenance" step to the upload commit path (or a cron sweep for jobs older than 30 days with status committed). Caps the table permanently.
- **`email_sends`** — immutable send log, keep forever (it IS the dedupe policy). No action.
- **`rate_limits`** — solved by 1e.

---

## Priority 3 — low / monitor

- `[ ]` **3-way permissive SELECT overlap** on `embeddings`, `question_concept_tags`, `question_principle_tags`: the `*_content_write` `FOR ALL` policies contribute a third SELECT evaluation per row for authenticated users. Split each into explicit `FOR INSERT/UPDATE/DELETE` policies. **Do NOT touch** the 2-way public/org unions on `questions`/`options`/`org_members`/`upload_jobs` etc. — documented intentional design (CLAUDE.md multi-tenancy section).
- `[ ]` **Unused indexes** (6 flagged: `questions_last_edited_at_idx`, `entitlements_user_active_idx`, `user_activity_user_time_idx`, `quiz_leads_mobile_idx`, `notes_progress_bookmarked_idx`, `student_profiles_mobile_idx`) — all explicably dormant (new features / future-correlation). Recheck ~2027-01; drop `questions_last_edited_at_idx` if still zero scans, keep the rest (they back features that haven't seen traffic yet).
- `[ ]` **Auth leaked-password protection** — enable in the Supabase dashboard (Auth → password security). One toggle.
- `[ ]` **`embeddings`** — empty, unsized `vector`, no ANN index: correct for a dormant layer. Before RAG retrieval goes live: fix the vector dimension to the chosen model, add an HNSW index, and revisit the 3-way policy split above. (Tracked in [[rag-grounding-layer]].)
- **Non-issues confirmed during review** (don't re-flag): vacuum/bloat healthy; no duplicate indexes; `platform_admins`/`rate_limits` RLS-no-policy is intentional lockdown; questions row width (~1.9 KB avg, TOAST) fine; policy counts per table modest (max 5).

---

## Execution notes for the implementing session

- Migrations are **append-only**, applied via Supabase MCP `apply_migration`; next number after checking `supabase/migrations/` (0060+ expected free).
- Everything in Priority 1 is non-destructive and safe against the deployed app — no code-deploy coupling required. Priority 2a changes CI/env only, no prod DDL.
- Gate: after the migration, run `get_advisors` (security + performance) and the full `npm run prepush`; the RLS integration tests are the behavioral proof for 1b.
- Verify claims before acting where marked (grep for `updated_at` writers before 1c; exact `record_quiz_lead` signature before 1d).
- Per the global workflow rules: Priority 1 + 2b are net-new hardening (normal flow); nothing here reworks shipped behavior, so no 360/backfill gate applies — but the `updated_at` trigger (1c) silently changes what existing UPDATE paths write, so state that in the migration comment and PR message.

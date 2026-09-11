-- 0095 -- question_item_stats: per-sitting response evidence for a bank question.
--
-- One row per (question, source, sitting). NOT one row per question: the whole
-- point of the grain is that a pooled figure cannot be un-pooled. See
-- ITEM_STATS.md decision 6 -- a bad sitting must be a DELETE, an institute that
-- leaves must be removable, and "did the key fix work" is only answerable if the
-- before and after are separate rows.
--
-- This deliberately does NOT extend `questions.attempt_stats` (migration 0010).
-- That column is empty (0 of 75,915 rows), unread, and its merge helper computes
-- an irreversible weighted average -- the exact mistake this table exists to avoid.
--
-- Aggregation happens at READ time in `src/lib/itemStats/aggregate.ts`. Nothing
-- writes a pooled number anywhere.

create table if not exists public.question_item_stats (
  id uuid primary key default gen_random_uuid(),

  question_id uuid not null references public.questions(id) on delete cascade,

  -- 'tracker'    = an nda-tracker exam record (proctored OMR, one institute)
  -- 'vault_mock' = a /mock sitting on pyqvault.com (self-serve, online)
  source text not null check (source in ('tracker', 'vault_mock')),

  -- The sitting: tracker `exams.id`, or the vault `mock_tests.id`. Opaque text --
  -- never parsed here, so the tracker may change its id scheme freely.
  source_ref text not null,

  -- Which cohort produced this. NULL means the public vault population, which is
  -- why the CHECK below ties it to `source`: a tracker row with no org cannot say
  -- whose students these were, and a vault row with one would imply a cohort that
  -- does not exist. Counts only -- no student is identifiable from this table.
  org_id uuid references public.organizations(id) on delete cascade,
  cohort_label text,

  seen int not null check (seen >= 0),
  attempted int not null check (attempted >= 0),
  correct int not null check (correct >= 0),
  skipped int not null check (skipped >= 0),

  -- {"A":n,"B":n,"C":n,"D":n} over ATTEMPTED responses only. A skip says nothing
  -- about which option pulls. Empty object for numeric (NAT) items, which have
  -- no options at all.
  choice_counts jsonb not null default '{}'::jsonb,

  -- Discrimination is computed WITHIN a sitting (top/bottom 27% by that sitting's
  -- own total) and pooled as counts. Ranking students across cohorts of differing
  -- ability would be meaningless, so the split never crosses a sitting boundary.
  disc_top_correct int,
  disc_top_n int,
  disc_bottom_correct int,
  disc_bottom_n int,

  -- The answer as keyed WHEN MEASURED. Detects both the tracker's cross-record
  -- key conflicts and a post-hoc flip on our side.
  key_at_measurement text check (key_at_measurement in ('A', 'B', 'C', 'D')),

  -- The question AS MEASURED. Same role as question_reviews.reviewed_content_hash
  -- (0074): this bank flips keys in place and reshuffles option order, and after
  -- either a stored {"B": 31} is describing a different question. A row whose hash
  -- no longer matches is STALE and must render nothing rather than a wrong number.
  measured_content_hash text not null,

  measured_at timestamptz not null,
  created_at timestamptz not null default now(),

  -- seen = attempted + skipped holds by construction on both sources; assert it
  -- so a broken import fails at the boundary rather than skewing a p-value.
  constraint question_item_stats_seen_sums check (seen = attempted + skipped),
  constraint question_item_stats_correct_bounded check (correct <= attempted),

  -- All four discrimination counts, or none. A half-populated split silently
  -- biases the pooled index.
  constraint question_item_stats_disc_coherent check (
    (disc_top_correct is null and disc_top_n is null
     and disc_bottom_correct is null and disc_bottom_n is null)
    or
    (disc_top_correct is not null and disc_top_n is not null
     and disc_bottom_correct is not null and disc_bottom_n is not null
     and disc_top_correct <= disc_top_n and disc_bottom_correct <= disc_bottom_n)
  ),

  -- A tracker row names its institute; a vault row is the public population.
  constraint question_item_stats_org_matches_source check (
    (source = 'tracker' and org_id is not null)
    or (source = 'vault_mock' and org_id is null)
  ),

  -- Re-importing the same sitting is an upsert, never a second row.
  constraint question_item_stats_unique_sitting unique (question_id, source, source_ref)
);

comment on table public.question_item_stats is
  'Per-sitting response evidence for a bank question (tracker OMR + vault /mock). Aggregated at read time, never stored pooled. See ITEM_STATS.md.';

-- The unique constraint leads on question_id, so it already serves the /browse
-- page fetch (.in("question_id", <=25 ids)). No separate index is needed.

alter table public.question_item_stats enable row level security;

-- Staff read, global scope. The displayed number is pooled across every source by
-- design (ITEM_STATS.md decisions 1 + 2), so there is no org filter here -- a
-- teacher sees the item's global property, not their cohort's slice. Superadmin is
-- not an org_members row, hence the second arm.
--
-- The cheap org guard leads deliberately: it is what lets the anon/student path
-- exit before the superadmin lookup. Migration 0082 is the precedent for an RLS
-- predicate turning a hot read into a seq scan.
create policy question_item_stats_read_staff
  on public.question_item_stats
  for select
  to authenticated
  using (
    private.current_user_org_id() is not null
    or private.current_user_is_superadmin()
  );

-- No INSERT/UPDATE/DELETE policies: writes are service-role only, from the
-- ingest CLIs. The locked pattern used by platform_admins / entitlements /
-- teacher_access_requests. The `rls_enabled_no_policy` advisor INFO on those
-- verbs is the design, not a gap.

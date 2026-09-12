-- 0097 -- paper_pushes: one row per SITTING of a paper pushed to nda-tracker.
--
-- THE PROBLEM. Until now the tracker's exam id was `exam_vault_<paperId>` --
-- derived from the PAPER, so one paper could only ever produce one exam. But a
-- paper is routinely conducted more than once: batch A on Monday, batch B on
-- Thursday. The second push upserts the first exam and, once it has results, is
-- refused with a 409. The second conduct was unreachable.
--
-- Storage on the vault side already assumed the opposite: `question_item_stats`
-- (0095) is grained per (question, source, source_ref = tracker exam id)
-- precisely so two sittings stay separable, and `cohort_label` is a
-- comma-separated list because one sitting often runs for several batches. Only
-- the push key disagreed. This table is what reconciles them.
--
-- WHY A TABLE RATHER THAN A COUNTER ON `papers`. Three things need answering and
-- none survives a bare count: which tracker exam a sitting became (so a re-push
-- updates it rather than minting another), what the sitting was FOR (the label
-- is unrecoverable later -- see below), and when it was pushed. A count also
-- cannot make a double-click idempotent; the unique key below can.
--
-- WHY `label` MATTERS AND CANNOT BE ADDED LATER. The tracker's Update Results
-- modal edits date, marking, subject, batch and branch -- NOT name -- and every
-- push overwrites name from the vault. So the exam's name is vault-owned
-- forever, and the push is the ONLY moment a human can say what the sitting is
-- for. Left null the title falls back to "(sitting N)", which is unambiguous but
-- opaque in the tracker's exam list.

create table if not exists public.paper_pushes (
  id uuid primary key default gen_random_uuid(),

  paper_id uuid not null references public.papers(id) on delete cascade,

  -- 1 for the first conduct, allocated upward thereafter. NEVER recycled: a
  -- sitting deleted tracker-side must not free its number, because the exam may
  -- still exist there and reusing the id would silently overwrite it.
  sitting_no int not null check (sitting_no >= 1),

  -- The tracker's `exams.id` this sitting became. Stored rather than re-derived
  -- so the record survives any future change to the derivation rule -- and so a
  -- pre-0097 push (`exam_vault_<paperId>`, sitting 1) can be backfilled as-is.
  tracker_exam_id text not null,

  -- What this conduct is for, as the teacher typed it ("Batch B"). Nullable:
  -- the sitting number is a complete fallback.
  label text check (label is null or char_length(label) <= 120),

  pushed_at timestamptz not null default now(),
  pushed_by uuid references auth.users(id) on delete set null,

  -- A double-click must not mint two exams. This is the guard that makes the
  -- push idempotent per sitting rather than relying on the UI not to misbehave.
  constraint paper_pushes_unique_sitting unique (paper_id, sitting_no),

  -- Two papers must never claim the same tracker exam. Cheap here, and the only
  -- thing standing between a derivation bug and one paper's push silently
  -- overwriting another paper's conducted exam.
  constraint paper_pushes_unique_exam unique (tracker_exam_id)
);

comment on table public.paper_pushes is
  'One row per sitting of a vault paper pushed to nda-tracker. A paper conducted for two batches on two days is two rows and two tracker exams. See nda-tracker CROSS_APP_SYNC.md section 2.';

alter table public.paper_pushes enable row level security;

-- Scoped through the PARENT PAPER, mirroring paper_questions_write_scoped (0058)
-- exactly: admin, or own paper, or the paper's batch's branch is one of mine.
-- Deliberately not a bare `org_id = current_user_org_id()` -- that would let a
-- teacher read the push history of a paper the papers SELECT policy hides from
-- them, re-opening the gap 0058 closed one table over.
create policy "paper_pushes_read_scoped" on public.paper_pushes
  for select to authenticated
  using (
    exists (
      select 1 from public.papers p
      where p.id = paper_pushes.paper_id
        and p.org_id = private.current_user_org_id()
        and (
          private.current_user_is_admin()
          or p.created_by = auth.uid()
          or exists (
            select 1 from public.batches b
            where b.id = p.batch_id
              and b.branch_id = any (private.current_user_branch_ids())
          )
        )
    )
  );

-- INSERT only, and no UPDATE or DELETE by design: a push is an event that
-- happened. Editing one would make the record disagree with the tracker, and
-- deleting one would free a sitting number the tracker still holds -- the exact
-- collision `paper_pushes_unique_exam` exists to prevent. Cleaning up an
-- abandoned draft is a service-role job with the tracker side done first.
create policy "paper_pushes_insert_scoped" on public.paper_pushes
  for insert to authenticated
  with check (
    private.current_user_can_edit_questions()
    and exists (
      select 1 from public.papers p
      where p.id = paper_pushes.paper_id
        and p.org_id = private.current_user_org_id()
        and (
          private.current_user_is_admin()
          or p.created_by = auth.uid()
          or exists (
            select 1 from public.batches b
            where b.id = p.batch_id
              and b.branch_id = any (private.current_user_branch_ids())
          )
        )
    )
  );

-- BACKFILL: none, and none is needed -- the push itself recovers the state.
--
-- The vault has no record of which papers were already pushed, and the tracker
-- exposes no way to ask (it is at 12/12 Vercel Hobby functions, so a list
-- endpoint would cost a build). But both outcomes of a first push under the new
-- code are already correct, so the record self-heals on first use:
--
--   * a pushed DRAFT (all nine live ones, zero results) -- the push goes through
--     as sitting 1 on the unchanged id, refreshing a draft nobody has sat, and
--     we record sitting 1. Byte-identical to today.
--   * a pushed exam WITH results -- the tracker refuses with 409 and names the
--     exam. That refusal is itself the evidence the sitting exists, so we record
--     sitting 1 from it and offer sitting 2. The teacher reaches the outcome
--     they wanted in one extra click, having lost nothing.
--
-- A paper never pushed correctly gets no row, which is why this cannot be
-- inferred from `papers` alone -- and is the whole reason the table exists.

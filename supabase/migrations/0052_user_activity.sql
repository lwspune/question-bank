-- 0052_user_activity.sql
--
-- The engagement activity spine. One append-only fact per signed-in student
-- action — the substrate every later engagement mechanic (progress cockpit,
-- weak-area drills, milestones, weekly summary, re-engagement nudges) reads
-- from, instead of each re-deriving behaviour from scattered tables.
--
-- WHY append-only + own-row (like notes_progress 0046 / student_profiles 0045):
-- a student writes their OWN activity via their JWT, and history is immutable —
-- there is deliberately NO update/delete policy, so a student can neither
-- rewrite nor erase what they did (integrity for streaks/milestones).
--
-- WHY `kind` is a CHECK'd text (not a Postgres enum): kinds are a closed,
-- learning-anchored allowlist mirrored in src/lib/activity/events.ts; adding one
-- is an append here + there. A CHECK is the DB-level integrity backstop and is
-- trivial to extend in a later append-only migration (drop+add constraint).
-- NO vanity kinds ("logged in N days", "earned XP") — see the engagement
-- principles gate in CLAUDE.md.
--
-- WHY `dedupe_key` + partial-unique: the backfill (scripts/activity/backfill.ts)
-- derives historical events from mock_attempts / notes_progress / bookmarks and
-- sets a deterministic dedupe_key so re-running is idempotent (ON CONFLICT DO
-- NOTHING). Live events leave it NULL — a genuine repeat (re-bookmark, retake)
-- is real history and must not be collapsed. The same key powers idempotent
-- milestone awards in a later phase.

CREATE TABLE public.user_activity (
  id         uuid        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind       text        NOT NULL,
  ref_id     text,
  ref_kind   text,
  metadata   jsonb       NOT NULL DEFAULT '{}'::jsonb,
  dedupe_key text,
  created_at timestamptz NOT NULL DEFAULT now(),
  -- Full UNIQUE (not partial): Postgres treats NULLs as distinct by default, so
  -- unlimited live rows (dedupe_key NULL) coexist with deduped backfill rows.
  -- A real constraint (unlike a partial index) is targetable by ON CONFLICT /
  -- PostgREST upsert — that's what makes the backfill idempotent.
  CONSTRAINT user_activity_dedupe_key UNIQUE (dedupe_key),
  CONSTRAINT user_activity_kind_ck CHECK (kind IN (
    'mock_submitted',
    'answer_wrong',
    'answer_correct',
    'chapter_mastered',
    'note_checkpoint',
    'question_bookmarked',
    'quiz_taken',
    'drill_completed'
  ))
);

-- Per-user recent-activity feed (progress cockpit, weekly summary, resume).
CREATE INDEX user_activity_user_time_idx
  ON public.user_activity (user_id, created_at DESC);

-- Per-user by kind (weak-area drills read answer_wrong; milestone scans).
CREATE INDEX user_activity_user_kind_time_idx
  ON public.user_activity (user_id, kind, created_at DESC);

ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;

-- Own-row read + append only. Deliberately NO update / delete policy →
-- append-only for students; service-role (admin usage-shape readout, backfill)
-- bypasses RLS by design.
CREATE POLICY "user_activity_select_own"
  ON public.user_activity FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "user_activity_insert_own"
  ON public.user_activity FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

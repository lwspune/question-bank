-- 0046_notes_progress.sql
--
-- Per-student /notes progress + bookmarks (the "track" layer). Own-row and
-- student-written, like student_profiles (0045).
--
-- WHY slug + denormalized chapter/subject (not FKs): notes are TS modules, not
-- DB rows — there is no notes_subtopics table to reference (same soft-reference
-- model as question_concept_tags). chapter_slug + subject_route are denormalized
-- so the "Your notes" strip can group + link without a join. If a chapter is
-- ever re-slugged, old rows orphan harmlessly (they just stop resolving).
--
-- checkpoint_* stores the LATEST mastery-checkpoint attempt (not best — best
-- would need a read-modify-write); mastered_at is set by an explicit "mark
-- mastered"; last_viewed_at powers "continue where you left off".

CREATE TABLE public.notes_progress (
  user_id          uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subtopic_slug    text        NOT NULL,
  chapter_slug     text        NOT NULL,
  subject_route    text        NOT NULL,
  bookmarked       boolean     NOT NULL DEFAULT false,
  mastered_at      timestamptz,
  checkpoint_score integer,
  checkpoint_total integer,
  checkpoint_at    timestamptz,
  last_viewed_at   timestamptz NOT NULL DEFAULT now(),
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, subtopic_slug),
  -- Score coherence enforced at the DB level (fail fast, defence in depth).
  CONSTRAINT notes_progress_checkpoint_ck CHECK (
    (checkpoint_score IS NULL AND checkpoint_total IS NULL)
    OR (checkpoint_score >= 0 AND checkpoint_total >= 1 AND checkpoint_score <= checkpoint_total)
  )
);

-- The "Your notes" bookmarks list — a student's bookmarked rows only.
CREATE INDEX notes_progress_bookmarked_idx
  ON public.notes_progress (user_id)
  WHERE bookmarked;

ALTER TABLE public.notes_progress ENABLE ROW LEVEL SECURITY;

-- Own-row on every verb: a student reads + writes only their own progress.
CREATE POLICY "notes_progress_select_own"
  ON public.notes_progress FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "notes_progress_insert_own"
  ON public.notes_progress FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "notes_progress_update_own"
  ON public.notes_progress FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "notes_progress_delete_own"
  ON public.notes_progress FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- 0047_question_bookmarks.sql
--
-- Per-student saved/bookmarked questions. Own-row + student-written (JWT), like
-- notes_progress (0046). Unlike notes, `question_id` is a REAL FK — questions is
-- a DB table — so a deleted question cascades its bookmarks away.
--
-- Toggle model: a bookmark is just the existence of the (user, question) row
-- (no mutable fields → no UPDATE policy). Surfaced on /browse cards + the /saved
-- page.

CREATE TABLE public.question_bookmarks (
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id uuid        NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, question_id)
);

-- List a student's saved questions newest-first.
CREATE INDEX question_bookmarks_user_idx
  ON public.question_bookmarks (user_id, created_at DESC);

ALTER TABLE public.question_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "question_bookmarks_select_own"
  ON public.question_bookmarks FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "question_bookmarks_insert_own"
  ON public.question_bookmarks FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "question_bookmarks_delete_own"
  ON public.question_bookmarks FOR DELETE TO authenticated
  USING (user_id = auth.uid());

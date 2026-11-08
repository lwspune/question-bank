-- 0241_v_not_understood_kind.sql -- a No to V's "Did you understand?" goes to
-- Fix your mistakes (owner, 2026-11-08): `v_not_understood` in the
-- user_activity kinds.
--
-- WHY. 0182 kept the student's Yes or No on the chat reply alone
-- (chat_interactions.understood), so a question the student said they did not
-- understand never came back to them: 13 students tapped No 21 times in the
-- 30 days to 2026-11-08, every time under an explanation of a specific
-- question. The route (/api/chat/understood) now also writes one row here per
-- reply, for a signed-in student, naming that question (refId), with
-- metadata surface "v" and the reply's id.
--
-- WHY A NEW KIND and not `answer_wrong`. Homework and the board plan read any
-- answer_wrong on a question as work done on it (an MCQ "answered", a Top 10
-- slot worked, the plan's Fix task done), and the student answered nothing.
-- A kind of its own is read by the drill's ladder alone
-- (lib/drill/select MISS_KINDS) and by nothing that counts work.
--
-- Widening a CHECK cannot reject an existing row. The list is the one read
-- LIVE on 2026-11-08 right before this was written (0230's, unchanged since),
-- plus v_not_understood; the number was checked free in every worktree and
-- branch at the same time.

alter table public.user_activity drop constraint user_activity_kind_ck;

alter table public.user_activity add constraint user_activity_kind_ck check (kind in (
  'mock_submitted',
  'mock_started',
  'answer_wrong',
  'answer_correct',
  'chapter_mastered',
  'note_checkpoint',
  'question_bookmarked',
  'question_practiced',
  'quiz_taken',
  'drill_completed',
  'surface_viewed',
  'drill_started',
  'goal_set',
  'paywall_event',
  'email_clicked',
  'milestone_reached',
  'push_clicked',
  'self_mark',
  'solution_visual',
  'path_chapter_done',
  'path_paced',
  'v_not_understood'
));

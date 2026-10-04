-- 0133_push_clicked_kind — put push_clicked back in the user_activity kind CHECK (2026-10-04).
--
-- WHAT HAPPENED. 0128_push (browser push, built on a branch 2026-10-01) was
-- applied to prod the day it was written, and its CHECK listed push_clicked.
-- The branch then sat unmerged while main moved on. 0132_celebrations was
-- written on main, which had never seen 0128's list, so it rebuilt the CHECK
-- from main's view: milestone_reached in, push_clicked out. Applied after 0128,
-- it silently took push_clicked away on prod. Found on 2026-10-04 while merging
-- the push branch: pg_get_constraintdef showed milestone_reached and no
-- push_clicked.
--
-- WHY IT WOULD HAVE BEEN INVISIBLE. /api/e/<token> records the tap through the
-- best-effort activity writer, which never blocks the redirect. So a tap would
-- still land the student on /drill, and the push_clicked row would be refused
-- by the CHECK and dropped. `push:due-nudge -- --report` would then show zero
-- taps forever, and the push channel would read as a failure it was not.
--
-- THE FIX is the union of the two lists: 0132's sixteen kinds plus
-- push_clicked. Widening a CHECK cannot reject any existing row, so this is
-- safe to apply before the code ships.
--
-- THE LESSON for the next rebuild of this CHECK: the list is shared by every
-- branch in flight, and a migration that rebuilds it carries only what its own
-- branch has seen. Read the LIVE definition first:
--   SELECT pg_get_constraintdef(oid) FROM pg_constraint
--   WHERE conname = 'user_activity_kind_ck';
-- ACTIVITY_KINDS in src/lib/activity/events.ts is the TS side of the same list.

ALTER TABLE public.user_activity DROP CONSTRAINT user_activity_kind_ck;

ALTER TABLE public.user_activity ADD CONSTRAINT user_activity_kind_ck CHECK (kind IN (
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
  'push_clicked'
));

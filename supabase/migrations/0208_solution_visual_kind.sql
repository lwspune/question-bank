-- 0208_solution_visual_kind — the user_activity kind for what a student does
-- with an animated solution (2026-10-31).
--
-- WHY. Animated solutions (0184) went live on 2026-10-26 and nothing recorded
-- a play, a finish or a switch to Still: the switch's choice lives only in the
-- browser (localStorage `qb_solution_view`). Asked "are students using them?",
-- the only answer was reveals on questions that have a visual TODAY, which
-- counts reveals from before the visual existed (89 on 10-24, when only 3
-- pilots were live) and says nothing about watching.
--
-- WHAT THIS ADDS is `solution_visual` (refId = question, metadata: surface,
-- action, scene), one row per student, question, action and India day by its
-- dedupe key. The actions and why each exists: src/lib/visuals/usage.ts.
-- Written through POST /api/activity/visual with the student's JWT, so the
-- existing own-row insert policy applies; signed-in students only.
--
-- Widening a CHECK cannot reject an existing row, so this is safe to apply
-- before the code ships. The list is 0196's, read LIVE first
-- (pg_get_constraintdef on 2026-10-31 matched 0196 exactly), plus
-- solution_visual. ACTIVITY_KINDS in src/lib/activity/events.ts is the TS side.

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
  'push_clicked',
  'self_mark',
  'solution_visual'
));

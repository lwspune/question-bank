-- 0196_self_mark_kind — the user_activity kind for "Understood / Review later"
-- on a written model answer (2026-10-28, the owner's call).
--
-- WHY. The drill is fed by answer_wrong rows, and only a graded MCQ pick wrote
-- one, so ~27,000 written (subjective) questions never reached it: in the 30
-- days to 2026-10-28 ~400 students opened ~6,500 model answers and nothing came
-- back to them. Now, under each model answer, the student judges their own
-- written answer. Review later writes answer_wrong (into the drill); Understood
-- on a question waiting there writes answer_correct (fixed). Both already exist.
--
-- WHAT THIS ADDS is the tap itself, self_mark (metadata: surface, mark), so
-- the experiment can count how many model answers get a tap AT ALL, either
-- button. Without it an Understood tap on a question never marked would leave
-- no trace, since it writes no drill row (answer_correct means a recovery).
--
-- Widening a CHECK cannot reject an existing row, so this is safe to apply
-- before the code ships. Written as 0192 and applied to prod under that name on
-- 2026-10-28; renumbered at merge because the Learn branch had taken 0192-0195
-- on main (its migrations touch other tables, not this CHECK). The list is 0133's, read LIVE first per its header
-- (pg_get_constraintdef on 2026-10-28 matched 0133 exactly), plus self_mark.
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
  'push_clicked',
  'self_mark'
));

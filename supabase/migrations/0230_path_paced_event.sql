-- 0230_path_paced_event.sql -- the board path's readout (MENTOR_SPEC.md Phase 4,
-- 2026-11-08): `path_paced` in the user_activity kinds.
--
-- Lighter / More (0225's study_paths.daily_minutes, Phase 3) overwrites the
-- minutes a day and keeps no history, so the 4-week readout could not say who
-- changed pace or which way. Each tap now writes one `path_paced` row
-- (metadata: direction, from, to), written by the server in lib/path/service
-- setPace with the student's own login (own-row insert policy, unchanged).
--
-- Widening a CHECK cannot reject an existing row. The list is the one read
-- LIVE on 2026-11-08 right before this was written (0225's, plus path_paced);
-- the number was checked free in every worktree and branch at the same time
-- (two migrations shared 0229 the same day: tests/migration-numbers.test.ts).

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
  'path_paced'
));

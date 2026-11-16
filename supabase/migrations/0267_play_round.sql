-- 0267_play_round.sql: /play, the calculation game (2026-11-16).
--
-- WHAT: one new user_activity kind, `play_round`: a signed-in student finished
-- a 60-second round of /play. metadata = { level, correct, wrong, points,
-- cleared }, checked by parseClientEvent (lib/activity/clientEvents) before
-- the generic /api/activity/event route writes it with the student's own JWT.
-- One row per round, no dedupe key: two rounds are two rounds. The route's
-- 120-an-hour limit is far above the 60 a 60-second round allows.
--
-- WHY A ROW AT ALL: the game is meant to bring students back to STUDY. The
-- play-games experiment compares players with non-players on mocks, drill and
-- bank answers in the 7 days after; without a per-student row it could only
-- count header taps, which says nothing about studying.
--
-- WHAT IT IS NOT: studying. Nothing that counts work, homework, plan tasks or
-- answered totals reads this kind (each of those names its kinds), and
-- lib/pmf/snapshot lists it as telemetry, not a feature. Like every
-- user_activity row (page views included) it counts as a visit in
-- get_pmf_snapshot's retention, which is how that metric already works.
--
-- Signed-out rounds are not recorded: progress and best rounds stay in the
-- browser. Widening a CHECK cannot reject an existing row.

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
  'v_not_understood',
  'path_covered',
  'path_switched',
  'play_round'
));

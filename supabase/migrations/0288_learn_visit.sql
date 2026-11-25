-- 0288_learn_visit.sql: how far a student got through a Learn lesson's slides (2026-11-25).
--
-- WHAT: one new user_activity kind, `learn_visit`: one visit to a Learn lesson
-- (its page, or played full screen in V), sent by the browser when the lesson
-- is hidden or closed (lib/learn/visit, POST /api/activity/event). Metadata:
-- path (the lesson's address), visit (a random id), place page | v, slides,
-- start (the slide it opened on: a student who answered before opens at the
-- questions), furthest, left (the slide left from), leftSeconds (time on it),
-- seconds (time on screen, a background tab not counted), questions (the
-- questions slide reached).
--
-- WHY: Learn recorded the first move through a lesson (surface_viewed
-- learn_start) and every answer (learn_attempts), and nothing between. On
-- 2026-11-25 a student opened "Collinear and coplanar vectors" from V, stayed
-- about 6.5 minutes and answered nothing, and nothing could say whether they
-- read every slide and stopped at the first question or sat on one slide.
-- Experiment v-learn-first (readout ~2026-12-20) needs that split for its
-- opened-but-unanswered lessons (scripts/chat/learn-first-readout.sql).
--
-- GRAIN: one row per visit, not per click. The client sends again only when the
-- furthest slide or the slide left from changed (at most 8 rows a visit), and
-- dedupe_key `learn_visit:<user>:<visit>:<furthest>:<left>` makes a repeat send
-- silent. The readout takes each visit's LAST row. A row per click would add
-- writes and say nothing more.
--
-- REJECTED: reusing surface_viewed with a new surface. Those rows mean "seen"
-- and are counted once per page per day; a visit is neither.
--
-- Signed-in students only, like learn_start. Readout only: nothing that counts
-- work, homework, plan tasks or answered totals reads it. Widening a CHECK cannot
-- reject an existing row.

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
  'play_round',
  'learn_visit'
));

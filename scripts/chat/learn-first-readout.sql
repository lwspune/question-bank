-- Growth experiment "v-learn-first" (2026-11-22): V teaches a chapter from Learn's
-- lessons wherever Learn teaches it, with a Learn check question as Your turn.
-- Run read-only against production on the check date (28 days after the deploy).
-- Set the deploy date below. Staff are left out. No names or emails.
--
-- Keep rule (lib/growth/registry.ts V_LEARN_FIRST_ANSWER_KEEP_PCT): Learn stays
-- first if 30%+ of the Learn lessons V shows get their Your turn answered.
-- Events are one per student, place and India day (lib/activity/clientEvents.ts),
-- so every share below is of student-days.
--   lesson_learn  shown: a Learn lesson's map; tap: Open the lesson
--   learn_try_answer: a Your turn answer;  learn_try_skip: Skip
--   lesson_notes  tap: Open the notes (notes lessons, and the second link on CET/JEE)

with params as (
  select timestamptz '2026-11-22 00:00+05:30' as live_from,   -- set to the deploy day (India midnight)
         timestamptz '2026-12-20 00:00+05:30' as live_to
),
staff as (select user_id from public.org_members union select user_id from public.platform_admins),
steps as (
  select a.user_id, (a.created_at at time zone 'Asia/Kolkata')::date as day, a.metadata->>'from' as place, a.metadata->>'action' as action
  from public.user_activity a, params p
  where a.kind = 'surface_viewed'
    and a.metadata->>'surface' = 'teach_chapter'
    and a.metadata->>'from' in ('lesson_learn', 'learn_try_answer', 'learn_try_skip', 'lesson_notes')
    and a.created_at >= p.live_from and a.created_at < p.live_to
    and a.user_id not in (select user_id from staff)
),
shown as (select distinct user_id, day from steps where place = 'lesson_learn' and action = 'shown')
select
  (select count(*) from shown) as learn_lessons_shown,
  (select count(distinct user_id) from shown) as students,
  (select count(*) from shown s where exists (select 1 from steps t where t.user_id = s.user_id and t.day = s.day and t.place = 'learn_try_answer')) as answered_your_turn,
  round(100.0 * (select count(*) from shown s where exists (select 1 from steps t where t.user_id = s.user_id and t.day = s.day and t.place = 'learn_try_answer'))
        / nullif((select count(*) from shown), 0), 1) as answered_pct,
  (select count(*) from shown s where exists (select 1 from steps t where t.user_id = s.user_id and t.day = s.day and t.place = 'learn_try_skip')) as skipped,
  (select count(*) from shown s where exists (select 1 from steps t where t.user_id = s.user_id and t.day = s.day and t.place = 'lesson_learn' and t.action = 'tap')) as opened_lesson,
  (select count(*) from (select distinct user_id, day from steps where place = 'lesson_notes' and action = 'tap') n) as opened_notes_any_lesson;


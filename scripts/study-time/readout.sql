-- Growth experiment "study-time-card" (2026-11-21): Home's Study time card and
-- its one suggestion (the chapter worth most marks that got no time this week
-- and is not strong yet), plus V's study lines.
-- Run read-only against production on the check date (28 days after the deploy).
-- Set the deploy date below. Staff are left out. No names or emails are read.
--
-- Keep rule (lib/growth/registry.ts): 15%+ of the students shown a suggestion
-- tap it, and 30%+ of shown suggestions get 10+ minutes on that chapter within
-- 7 days (study_time, practice and reading; mocks are not in study_time).
-- Events: surface_viewed 'study_time', metadata.action seen | week |
-- next_shown | next_tap, next_* with metadata.chapterId, one a day each.

with params as (
  select date '2026-11-21' as live_from,   -- set to the deploy day (India)
         date '2026-12-19' as live_to
),
staff as (select user_id from public.org_members),
steps as (
  select a.user_id,
         (a.created_at at time zone 'Asia/Kolkata')::date as day,
         a.metadata->>'action' as action,
         (a.metadata->>'chapterId')::uuid as chapter_id
  from public.user_activity a, params p
  where a.kind = 'surface_viewed'
    and a.metadata->>'surface' = 'study_time'
    and (a.created_at at time zone 'Asia/Kolkata')::date between p.live_from and p.live_to
    and a.user_id not in (select user_id from staff)
),
funnel as (
  select count(distinct user_id) filter (where action = 'seen')       as saw_card,
         count(distinct user_id) filter (where action = 'week')       as opened_week,
         count(distinct user_id) filter (where action = 'next_shown') as shown_next,
         count(distinct user_id) filter (where action = 'next_tap')   as tapped_next
  from steps
),
-- Each suggestion shown (student, chapter, first day), and its time in the 7 days after.
shown as (
  select user_id, chapter_id, min(day) as day
  from steps
  where action = 'next_shown'
  group by 1, 2
),
followed as (
  select s.user_id, s.chapter_id,
         coalesce(sum(t.secs), 0) as secs_7d
  from shown s
  left join public.study_time t
    on t.user_id = s.user_id and t.chapter_id = s.chapter_id
   and t.day > s.day and t.day <= s.day + 7
  group by 1, 2
)
select f.saw_card,
       f.opened_week,
       f.shown_next,
       f.tapped_next,
       round(100.0 * f.tapped_next / nullif(f.shown_next, 0)) as tap_pct,
       (select count(*) from followed)                             as suggestions,
       (select count(*) from followed where secs_7d >= 600)        as got_10_min,
       round(100.0 * (select count(*) from followed where secs_7d >= 600)
             / nullif((select count(*) from followed), 0))         as got_10_min_pct
from funnel f;

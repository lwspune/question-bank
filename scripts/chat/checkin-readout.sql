-- Growth experiment "v-checkin" (2026-11-21): V asks "How's your study going?"
-- the first time a student opens V after 4+ days without answering anything.
-- Run read-only against production on the check date (28 days after the
-- deploy). Set the deploy date below. Staff are left out. No names or emails.
--
-- Keep rule (lib/growth/registry.ts): 40%+ of the students asked tap an
-- answer, and 70%+ of showings are followed by practice later that day
-- (question_practiced, drill_started or mock_started after the question).
-- Baseline: the "Since your last visit" card it replaces, after 4+ days
-- away, 16-21 Nov: 7 of 10.
-- The v_day view row carries metadata.checkin = true on the days V asked.

with params as (
  select timestamptz '2026-11-21 00:00+05:30' as live_from,   -- set to the deploy day (India midnight)
         timestamptz '2026-12-19 00:00+05:30' as live_to
),
staff as (select user_id from public.org_members),
asked as (
  select a.user_id, min(a.created_at) as at
  from public.user_activity a, params p
  where a.kind = 'surface_viewed'
    and a.metadata->>'surface' = 'v_day'
    and a.metadata->>'checkin' = 'true'
    and a.created_at >= p.live_from and a.created_at < p.live_to
    and a.user_id not in (select user_id from staff)
  group by a.user_id, (a.created_at at time zone 'Asia/Kolkata')::date
),
steps as (
  select a.user_id, (a.created_at at time zone 'Asia/Kolkata')::date as day, a.metadata->>'action' as action
  from public.user_activity a, params p
  where a.kind = 'surface_viewed'
    and a.metadata->>'surface' = 'v_checkin'
    and a.created_at >= p.live_from and a.created_at < p.live_to
    and a.user_id not in (select user_id from staff)
),
per_showing as (
  select s.user_id, s.at,
         exists (select 1 from steps t where t.user_id = s.user_id
                   and t.day = (s.at at time zone 'Asia/Kolkata')::date
                   and t.action in ('well', 'stuck', 'short')) as answered,
         exists (select 1 from public.user_activity x
                   where x.user_id = s.user_id
                     and x.kind in ('question_practiced', 'drill_started', 'mock_started')
                     and x.created_at > s.at
                     and (x.created_at at time zone 'Asia/Kolkata')::date = (s.at at time zone 'Asia/Kolkata')::date) as practised
  from asked s
)
select count(*) as showings,
       count(distinct user_id) as students,
       count(distinct user_id) filter (where answered) as students_answered,
       round(100.0 * count(distinct user_id) filter (where answered) / nullif(count(distinct user_id), 0), 1) as answer_pct,
       count(*) filter (where practised) as practised_after,
       round(100.0 * count(*) filter (where practised) / nullif(count(*), 0), 1) as practised_pct,
       (select jsonb_object_agg(action, n) from (select action, count(*) as n from steps group by action) k) as steps
from per_showing;

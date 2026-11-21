-- Growth experiment "v-exam-countdown" (2026-11-21): the exam countdown row in
-- V's "Your day" card. Run read-only against production on the check date
-- (28 days after the deploy). Set the deploy date below. Staff are left out.
-- No names or emails are read.
--
-- Keep rule (lib/growth/registry.ts): 10%+ of the days it shows lead to a
-- start from the card that day (before: 3 of 86 card showings, 3.5%, led to a
-- drill start, 16-21 Nov). A "start" here is a drill started from the card
-- (fix days: the chapter's Fix; any day: the card's Fix button) or, on mock
-- days, a mock started that day. A "top" day's Practise button goes to the
-- bank, which records no "from": read it in Vercel as v_day_tap action exam.

with params as (
  select timestamptz '2026-11-21 00:00+05:30' as live_from,   -- set to the deploy day (India midnight)
         timestamptz '2026-12-19 00:00+05:30' as live_to
),
staff as (select user_id from public.org_members),
shown as (
  select distinct a.user_id,
         (a.created_at at time zone 'Asia/Kolkata')::date as day,
         coalesce(a.metadata->>'exam', 'none') as exam
  from public.user_activity a, params p
  where a.kind = 'surface_viewed'
    and a.metadata->>'surface' = 'v_day'
    and a.created_at >= p.live_from and a.created_at < p.live_to
    and a.user_id not in (select user_id from staff)
),
drilled as (
  select distinct a.user_id, (a.created_at at time zone 'Asia/Kolkata')::date as day
  from public.user_activity a, params p
  where a.kind = 'drill_started'
    and a.metadata->>'from' = 'v_day'
    and a.created_at >= p.live_from and a.created_at < p.live_to
),
mocked as (
  select distinct m.user_id, (m.started_at at time zone 'Asia/Kolkata')::date as day
  from public.mock_attempts m, params p
  where m.started_at >= p.live_from and m.started_at < p.live_to
)
select s.exam,
       count(*) as showings,
       count(distinct s.user_id) as students,
       count(*) filter (where d.user_id is not null) as drill_same_day,
       count(*) filter (where s.exam = 'mock' and m.user_id is not null) as mock_same_day,
       round(100.0 * count(*) filter (where d.user_id is not null or (s.exam = 'mock' and m.user_id is not null)) / count(*), 1) as start_pct
from shown s
left join drilled d on d.user_id = s.user_id and d.day = s.day
left join mocked m on m.user_id = s.user_id and m.day = s.day
group by s.exam
order by s.exam;

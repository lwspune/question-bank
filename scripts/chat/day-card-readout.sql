-- Growth experiment "v-day-card" (2026-11-15): V's "Your day" card.
-- Run read-only against production on the check date (14 days after the deploy).
-- Set the deploy date below. Staff are left out. No names or emails are read.
--
-- Keep rule (lib/growth/registry.ts): 35%+ of the students shown it see it on
-- 2+ days (before: 7 of 31 for "How's my progress"), and 25%+ of showings lead
-- to a tap that day. Taps on "My full progress" and the plan task are Vercel
-- events (v_day_tap); this file counts drill starts from the card, which are a
-- floor for taps. Next-day return is reported beside, not judged on.

with params as (
  select timestamptz '2026-11-16 00:00+05:30' as live_from,   -- set to the deploy day (India midnight)
         timestamptz '2026-11-30 00:00+05:30' as live_to
),
staff as (select user_id from public.org_members),
shown as (
  select a.user_id,
         (a.created_at at time zone 'Asia/Kolkata')::date as day,
         a.metadata->>'card' as card
  from public.user_activity a, params p
  where a.kind = 'surface_viewed'
    and a.metadata->>'surface' = 'v_day'
    and a.created_at >= p.live_from and a.created_at < p.live_to
    and a.user_id not in (select user_id from staff)
),
per_student as (
  select user_id, count(distinct day) as days from shown group by user_id
),
drilled as (
  select distinct a.user_id, (a.created_at at time zone 'Asia/Kolkata')::date as day
  from public.user_activity a, params p
  where a.kind = 'drill_started'
    and a.metadata->>'from' = 'v_day'
    and a.created_at >= p.live_from and a.created_at < p.live_to
),
active_days as (
  select distinct a.user_id, (a.created_at at time zone 'Asia/Kolkata')::date as day
  from public.user_activity a, params p
  where a.kind <> 'surface_viewed'
    and a.created_at >= p.live_from and a.created_at < p.live_to + interval '1 day'
)
select
  (select count(*) from per_student) as students_shown,
  (select count(*) from per_student where days >= 2) as shown_on_2_plus_days,
  round(100.0 * (select count(*) from per_student where days >= 2) / nullif((select count(*) from per_student), 0), 1) as repeat_pct,
  (select count(*) from shown) as showings,
  (select count(*) from shown s join drilled d using (user_id, day)) as showings_then_drill,
  round(100.0 * (select count(*) from shown s join drilled d using (user_id, day)) / nullif((select count(*) from shown), 0), 1) as drill_pct,
  round(100.0 * (select count(*) from shown s where exists (
    select 1 from active_days x where x.user_id = s.user_id and x.day = s.day + 1
  )) / nullif((select count(*) from shown), 0), 1) as next_day_return_pct,
  (select jsonb_object_agg(card, n) from (select card, count(*) as n from shown group by card) k) as by_card;

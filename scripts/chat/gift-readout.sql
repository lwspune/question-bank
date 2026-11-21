-- Growth experiment "v-gift" (2026-11-21): V tells a student about what they
-- have earned (the 7-day pass, or a Vault Points milestone) as a gift.
-- Run read-only against production on the check date (28 days after the deploy).
-- Set the deploy date below. Staff are left out. No names or emails are read.
--
-- Keep rule (lib/growth/registry.ts): 50%+ of the students shown the closed
-- box open it. Trials activated from V and passes bought with points within 7
-- days of opening a points gift are reported beside, not judged on.
-- Events: surface_viewed 'v_gift', metadata.gift trial | points,
-- metadata.action badge | shown | open | activate | pricing, one a day each.

with params as (
  select timestamptz '2026-11-21 00:00+05:30' as live_from,   -- set to the deploy day (India midnight)
         timestamptz '2026-12-19 00:00+05:30' as live_to
),
staff as (select user_id from public.org_members),
steps as (
  select a.user_id,
         a.created_at,
         a.metadata->>'gift' as gift,
         a.metadata->>'action' as action
  from public.user_activity a, params p
  where a.kind = 'surface_viewed'
    and a.metadata->>'surface' = 'v_gift'
    and a.created_at >= p.live_from and a.created_at < p.live_to
    and a.user_id not in (select user_id from staff)
),
funnel as (
  select gift,
         count(distinct user_id) filter (where action = 'badge')    as saw_badge,
         count(distinct user_id) filter (where action = 'shown')    as shown_box,
         count(distinct user_id) filter (where action = 'open')     as opened,
         count(distinct user_id) filter (where action = 'activate') as activated,
         count(distinct user_id) filter (where action = 'pricing')  as tapped_price
  from steps
  group by gift
),
points_open as (
  select user_id, min(created_at) as opened_at from steps where gift = 'points' and action = 'open' group by user_id
),
bought_with_points as (
  select count(distinct o.user_id) as n
  from points_open o
  join public.entitlements e
    on e.user_id = o.user_id
   and e.source = 'razorpay'
   and e.note like 'fix_points:%'
   and e.created_at >= o.opened_at
   and e.created_at < o.opened_at + interval '7 days'
)
select f.gift,
       f.saw_badge,
       f.shown_box,
       f.opened,
       round(100.0 * f.opened / nullif(f.shown_box, 0), 1) as open_pct,
       f.activated,
       f.tapped_price,
       case when f.gift = 'points' then (select n from bought_with_points) end as bought_with_points_7d
from funnel f
order by f.gift;

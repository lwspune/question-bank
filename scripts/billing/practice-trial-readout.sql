-- Readout for growth experiment `practice-trial` (migration 0273).
-- Read-only. Run in the Supabase SQL editor or via the MCP execute_sql tool.
--
-- Offered  = students with a practice_trial_offers row (the offer showed).
-- Activated = of those, a trial entitlement (source 'trial').
-- Bought   = of those, a paid pass (source 'razorpay') after the first offer
--            and within 14 days of the trial ending (or of the last offer day
--            for a student who never activated).
-- Baseline: 4 of 67 (6%) of students past their 3rd limit day bought, before.
-- Staff never get an offer, so none are counted.

with offered as (
  select o.user_id, min(o.ist_day) as first_offer, max(o.ist_day) as last_offer, count(*) as offer_days
  from public.practice_trial_offers o
  group by o.user_id
),
trial as (
  select e.user_id, e.granted_at, e.expires_at
  from public.entitlements e
  where e.source = 'trial'
),
paid as (
  select e.user_id, min(e.granted_at) as bought_at
  from public.entitlements e
  join offered o using (user_id)
  where e.source = 'razorpay'
    and e.granted_at >= (o.first_offer::timestamp at time zone 'Asia/Kolkata')
  group by e.user_id
)
select
  count(*) as offered,
  count(t.user_id) as activated,
  round(100.0 * count(t.user_id) / nullif(count(*), 0), 1) as activated_pct,
  count(p.user_id) filter (
    where p.bought_at <= coalesce(t.expires_at, (o.last_offer + 1)::timestamp at time zone 'Asia/Kolkata') + interval '14 days'
  ) as bought,
  round(100.0 * count(p.user_id) filter (
    where p.bought_at <= coalesce(t.expires_at, (o.last_offer + 1)::timestamp at time zone 'Asia/Kolkata') + interval '14 days'
  ) / nullif(count(*), 0), 1) as bought_pct,
  -- Students whose 14-day window has not closed yet: the number is not final until this is 0.
  count(*) filter (
    where coalesce(t.expires_at, (o.last_offer + 1)::timestamp at time zone 'Asia/Kolkata') + interval '14 days' > now()
  ) as still_open
from offered o
left join trial t using (user_id)
left join paid p using (user_id);

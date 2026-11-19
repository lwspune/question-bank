-- Readout for growth experiment `checkout-followup` (2026-11-19).
-- Read-only. Run in the Supabase SQL editor or via the MCP execute_sql tool.
--
-- Listed   = students the 6 pm email names: a pass checkout opened with no
--            earlier open in the 14 days before it, not paid within the hour
--            (the email waits an hour), staff left out. Close to the email's
--            own rule (lib/billing/checkoutFollowup), not identical: it does
--            not drop a student whose comp or older pass covers the one opened.
-- Paid     = a paid pass (source 'razorpay') from an hour to 7 days after.
-- Groups   = with a saved mobile (the owner can WhatsApp them) against without
--            (only the checkout-didn't-complete bar reaches them).
-- Baseline (20 Oct to 12 Nov, before): 2 of 26 with a mobile, 3 of 39 without.
-- Change the two dates to read another period; leave 7 days after `until`.

with params as (
  select timestamptz '2026-11-19 00:00+05:30' as since,
         timestamptz '2026-12-10 00:00+05:30' as until
),
staff as (
  select user_id from public.org_members
  union
  select user_id from public.platform_admins
),
opens as (
  select a.user_id, a.created_at
  from public.user_activity a
  where a.kind = 'paywall_event'
    and a.metadata->>'step' = 'checkout_opened'
    and a.created_at >= (select since from params) - interval '14 days'
    and not exists (select 1 from staff s where s.user_id = a.user_id)
),
listed as (
  select o.user_id, o.created_at
  from opens o, params p
  where o.created_at >= p.since and o.created_at < p.until
    and not exists (
      select 1 from opens e
      where e.user_id = o.user_id and e.created_at < o.created_at and e.created_at > o.created_at - interval '14 days'
    )
    and not exists (
      select 1 from public.entitlements g
      where g.user_id = o.user_id and g.source = 'razorpay'
        and g.granted_at between o.created_at and o.created_at + interval '1 hour'
    )
),
judged as (
  select l.*,
    exists (select 1 from public.student_profiles sp where sp.user_id = l.user_id and sp.mobile is not null) as has_mobile,
    exists (
      select 1 from public.entitlements g
      where g.user_id = l.user_id and g.source = 'razorpay'
        and g.granted_at > l.created_at + interval '1 hour'
        and g.granted_at <= l.created_at + interval '7 days'
    ) as paid_7d
  from listed l
)
select
  case when has_mobile then 'with mobile (messaged)' else 'no mobile (bar only)' end as grp,
  count(*) as listed,
  count(*) filter (where paid_7d) as paid_7d,
  round(100.0 * count(*) filter (where paid_7d) / nullif(count(*), 0), 1) as paid_pct
from judged
group by 1
order by 1 desc;

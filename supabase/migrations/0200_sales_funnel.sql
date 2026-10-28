-- 0200_sales_funnel.sql -- the pass funnel on /dashboard/sales, in students.
--
-- Why: the owner tracks the pass as a funnel (2026-10-28): students who met a paywall, then
-- students who started a checkout (a Razorpay order), then students who bought. 0199 counted
-- ORDERS, but one student often retries (27 Oct: 13 orders from 10 students), so the owner chose
-- students at every step; the order count stays beside it.
--
-- The top of the funnel is already recorded: every paywall writes a user_activity paywall_event,
-- step 'shown' (the reveal wall, V's answer-limit offer, the download boxes, the drill, mock and
-- chapter-test limits, saves, the projected score), once per student per wall per IST day.
-- Signed-in students only; a signed-out visitor writes nothing. Download boxes from 2026-09-28,
-- the reveal wall from 2026-10-07. ~7 ms over 30 days on user_activity_user_kind_time_idx.
--
-- Distinct students cannot be added across days, so:
--  * sales_by_period counts them distinct WITHIN each period (a week counts a student once);
--  * sales_funnel_students(from, to) counts them over any run of IST days, both ends included
--    (from null = from the first record), for the page's cards and the table's total row.
--
-- Staff count, as everywhere on this page. Both functions service role only, like 0197.

drop function public.sales_by_period(text, timestamptz);

create function public.sales_by_period(p_grain text, p_since timestamptz default null)
returns table (
  period date,
  paywall_students integer,
  checkout_students integer,
  pass_orders integer,
  passes_sold integer,
  passes_refunded integer,
  pass_paise bigint,
  book_orders integer,
  books_sold integer,
  books_refunded integer,
  book_paise bigint
)
language plpgsql stable
security definer
set search_path = ''
as $$
begin
  if p_grain is null or p_grain not in ('day', 'week', 'month') then
    raise exception 'sales_by_period: grain must be day, week or month, not %', p_grain;
  end if;

  return query
  with events as (
    -- kind: 'pass' / 'book' a sale, 'pass_order' / 'book_order' an order created, 'shown' a paywall met.
    select e.granted_at as at, e.user_id, 'pass'::text as kind, e.status = 'revoked' as refunded, coalesce(e.amount_paise, 0) as paise
    from public.entitlements e
    where e.source = 'razorpay'
      and (p_since is null or e.granted_at >= p_since)
    union all
    select b.created_at, b.user_id, 'book', b.status = 'revoked', b.amount_paise
    from public.ebook_purchases b
    where p_since is null or b.created_at >= p_since
    union all
    select ua.created_at, ua.user_id,
      case ua.metadata->>'step' when 'checkout_opened' then 'pass_order' else 'book_order' end,
      false, 0
    from public.user_activity ua
    where ua.kind = 'paywall_event'
      and ua.ref_id is not null
      and ua.metadata->>'step' in ('checkout_opened', 'book_checkout_opened')
      and (p_since is null or ua.created_at >= p_since)
    union all
    select ua.created_at, ua.user_id, 'shown', false, 0
    from public.user_activity ua
    where ua.kind = 'paywall_event'
      and ua.metadata->>'step' = 'shown'
      and (p_since is null or ua.created_at >= p_since)
  )
  select
    date_trunc(p_grain, s.at at time zone 'Asia/Kolkata')::date,
    (count(distinct s.user_id) filter (where s.kind = 'shown'))::integer,
    (count(distinct s.user_id) filter (where s.kind = 'pass_order'))::integer,
    (count(*) filter (where s.kind = 'pass_order'))::integer,
    (count(*) filter (where s.kind = 'pass'))::integer,
    (count(*) filter (where s.kind = 'pass' and s.refunded))::integer,
    coalesce(sum(s.paise) filter (where s.kind = 'pass' and not s.refunded), 0)::bigint,
    (count(*) filter (where s.kind = 'book_order'))::integer,
    (count(*) filter (where s.kind = 'book'))::integer,
    (count(*) filter (where s.kind = 'book' and s.refunded))::integer,
    coalesce(sum(s.paise) filter (where s.kind = 'book' and not s.refunded), 0)::bigint
  from events s
  group by 1
  order by 1;
end;
$$;

create function public.sales_funnel_students(p_from date, p_to date)
returns table (paywall_students integer, checkout_students integer)
language sql stable
security definer
set search_path = ''
as $$
  select
    (count(distinct ua.user_id) filter (where ua.metadata->>'step' = 'shown'))::integer,
    (count(distinct ua.user_id) filter (where ua.metadata->>'step' = 'checkout_opened' and ua.ref_id is not null))::integer
  from public.user_activity ua
  where ua.kind = 'paywall_event'
    and ua.metadata->>'step' in ('shown', 'checkout_opened')
    and (p_from is null or ua.created_at >= p_from::timestamp at time zone 'Asia/Kolkata')
    and ua.created_at < (p_to + 1)::timestamp at time zone 'Asia/Kolkata';
$$;

revoke execute on function public.sales_by_period(text, timestamptz) from public, anon, authenticated;
grant execute on function public.sales_by_period(text, timestamptz) to service_role;
revoke execute on function public.sales_funnel_students(date, date) from public, anon, authenticated;
grant execute on function public.sales_funnel_students(date, date) to service_role;

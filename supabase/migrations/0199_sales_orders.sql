-- 0199_sales_orders.sql -- orders created beside sales on /dashboard/sales.
--
-- Why: the owner wants to see how many checkouts are started, next to how many are paid
-- (2026-10-28). A Razorpay order is created by /api/billing/order the moment a student taps
-- Buy, and most are never paid: on 27 Oct, 13 pass orders from 10 students, 5 paid.
--
-- Where the count comes from: the order route already writes a user_activity paywall_event,
-- step 'checkout_opened', after Razorpay creates a PASS order. Measured against Razorpay's own
-- order list for 15-28 Oct it matched every day (63 and 63). A BOOK order wrote nothing, so the
-- route now writes step 'book_checkout_opened' (its own step, so the pass funnel's counts never
-- include a book). Book orders therefore count from the deploy of 2026-10-28 on; the 5 book
-- orders before it are only on Razorpay. Pass orders count from 2026-10-04, the first such row
-- (the first paid pass is 2026-09-27). Asking Razorpay on every page load was rejected: an
-- outside call, 100 orders a page, and the page would fail when Razorpay is slow.
--
-- Staff orders count, as staff sales do, so the page matches Razorpay. Both filters carry
-- ref_id IS NOT NULL (always set on these two steps) so user_activity_kind_ref_idx serves them.
--
-- The return type changes, so the function is dropped and created again; grants as in 0197.

drop function public.sales_by_period(text, timestamptz);

create function public.sales_by_period(p_grain text, p_since timestamptz default null)
returns table (
  period date,
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
    -- kind: 'pass' / 'book' a sale, 'pass_order' / 'book_order' an order created.
    select e.granted_at as at, 'pass'::text as kind, e.status = 'revoked' as refunded, coalesce(e.amount_paise, 0) as paise
    from public.entitlements e
    where e.source = 'razorpay'
      and (p_since is null or e.granted_at >= p_since)
    union all
    select b.created_at, 'book', b.status = 'revoked', b.amount_paise
    from public.ebook_purchases b
    where p_since is null or b.created_at >= p_since
    union all
    select ua.created_at,
      case ua.metadata->>'step' when 'checkout_opened' then 'pass_order' else 'book_order' end,
      false, 0
    from public.user_activity ua
    where ua.kind = 'paywall_event'
      and ua.ref_id is not null
      and ua.metadata->>'step' in ('checkout_opened', 'book_checkout_opened')
      and (p_since is null or ua.created_at >= p_since)
  )
  select
    date_trunc(p_grain, s.at at time zone 'Asia/Kolkata')::date,
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

revoke execute on function public.sales_by_period(text, timestamptz) from public, anon, authenticated;
grant execute on function public.sales_by_period(text, timestamptz) to service_role;

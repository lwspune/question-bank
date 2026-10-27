-- 0197_sales_by_period.sql -- what each paid pass cost, and sales per day / week / month for
-- /dashboard/sales.
--
-- Why: the owner wants passes and money sold tracked on a page, daily, weekly and monthly
-- (2026-10-28). Book purchases already record their price (ebook_purchases.amount_paise, 0172);
-- a paid pass did not. Its price was worked out afterwards from the date (Rs 99 before 23 Oct,
-- Rs 199 after), which breaks the first time two prices overlap or a price changes again. So
-- entitlements gains amount_paise, written at grant time from the paid Razorpay order (the order
-- is the contract, 0121), and the 21 existing sales are filled in from Razorpay by
-- scripts/billing/backfill-pass-amounts.ts.
--
-- The column is nullable here: comp and manual grants have no price, and the code that writes it
-- must be live before a paid grant can be REQUIRED to carry one. 0198 adds that rule once the
-- deploy and the backfill are done; adding it now would make every sale fail until the deploy.
--
-- sales_by_period: one row per period with any sale, oldest first. A period is an IST calendar
-- day, a Monday-start week or a month. A sale is a paid pass (source 'razorpay') or a book
-- purchase. A refunded one (status 'revoked') counts as sold and as refunded, and its money is
-- not kept; an expired pass was paid for, so it counts in full. Every paid sale counts, staff
-- included, so the totals match Razorpay. Aggregated here, so no 1000-row cap. Service role only:
-- the page checks the superadmin first, then reads with the service-role client.

alter table public.entitlements
  add column amount_paise integer check (amount_paise is null or amount_paise > 0);

comment on column public.entitlements.amount_paise is
  'What the buyer paid, in paise, for a paid (razorpay) grant; null for comp and manual grants.';

create function public.sales_by_period(p_grain text, p_since timestamptz default null)
returns table (
  period date,
  passes_sold integer,
  passes_refunded integer,
  pass_paise bigint,
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
  with sales as (
    select e.granted_at as at, true as is_pass, e.status = 'revoked' as refunded, coalesce(e.amount_paise, 0) as paise
    from public.entitlements e
    where e.source = 'razorpay'
      and (p_since is null or e.granted_at >= p_since)
    union all
    select b.created_at, false, b.status = 'revoked', b.amount_paise
    from public.ebook_purchases b
    where p_since is null or b.created_at >= p_since
  )
  select
    date_trunc(p_grain, s.at at time zone 'Asia/Kolkata')::date,
    (count(*) filter (where s.is_pass))::integer,
    (count(*) filter (where s.is_pass and s.refunded))::integer,
    coalesce(sum(s.paise) filter (where s.is_pass and not s.refunded), 0)::bigint,
    (count(*) filter (where not s.is_pass))::integer,
    (count(*) filter (where not s.is_pass and s.refunded))::integer,
    coalesce(sum(s.paise) filter (where not s.is_pass and not s.refunded), 0)::bigint
  from sales s
  group by 1
  order by 1;
end;
$$;

revoke execute on function public.sales_by_period(text, timestamptz) from public, anon, authenticated;
grant execute on function public.sales_by_period(text, timestamptz) to service_role;

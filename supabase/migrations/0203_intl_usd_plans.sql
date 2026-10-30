-- 0203_intl_usd_plans.sql -- the international site sells its pass in US dollars.
--
-- Why: intl.pyqvault.com (2026-10-30, owner) serves international exams (IMAT
-- first) to students outside India, and Razorpay's international cards are on,
-- so its pass is priced in USD. Until now every plan was INR (0121's CHECK).
--
-- plans.site: which site sells a plan, 'pyqvault' (www, INR) or 'intl'
-- (intl.pyqvault.com, USD). The site/currency pair is one rule, so a USD plan
-- can never be offered on www or an INR plan on intl. amount_paise keeps its
-- name and now means the smallest unit of the plan's currency: paise for INR,
-- cents for USD (Razorpay's own convention for both).
--
-- entitlements.currency: what a paid pass was paid in, written at grant time
-- from the paid order, like amount_paise (0197). Every existing row is INR.
--
-- sales_by_period: pass_paise now sums INR passes only, and a new last column
-- pass_usd_cents sums the USD ones. Adding cents to paise would count a $19
-- pass as Rs 19. Same shape otherwise (0200).

alter table public.plans
  add column site text not null default 'pyqvault' check (site in ('pyqvault', 'intl'));

alter table public.plans drop constraint plans_currency_check;
alter table public.plans
  add constraint plans_site_currency_check
  check ((site = 'pyqvault' and currency = 'INR') or (site = 'intl' and currency = 'USD'));

comment on column public.plans.site is
  'Which site sells the plan: pyqvault (www, INR) or intl (intl.pyqvault.com, USD).';
comment on column public.plans.amount_paise is
  'Price in the smallest unit of the plan''s currency: paise for INR, cents for USD.';

alter table public.entitlements
  add column currency text not null default 'INR' check (currency in ('INR', 'USD'));

comment on column public.entitlements.currency is
  'The currency a paid grant was paid in (amount_paise is in its smallest unit). INR for every grant before 0203.';

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
  book_paise bigint,
  pass_usd_cents bigint
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
    select e.granted_at as at, e.user_id, 'pass'::text as kind, e.status = 'revoked' as refunded, coalesce(e.amount_paise, 0) as paise, e.currency
    from public.entitlements e
    where e.source = 'razorpay'
      and (p_since is null or e.granted_at >= p_since)
    union all
    select b.created_at, b.user_id, 'book', b.status = 'revoked', b.amount_paise, 'INR'
    from public.ebook_purchases b
    where p_since is null or b.created_at >= p_since
    union all
    select ua.created_at, ua.user_id,
      case ua.metadata->>'step' when 'checkout_opened' then 'pass_order' else 'book_order' end,
      false, 0, 'INR'
    from public.user_activity ua
    where ua.kind = 'paywall_event'
      and ua.ref_id is not null
      and ua.metadata->>'step' in ('checkout_opened', 'book_checkout_opened')
      and (p_since is null or ua.created_at >= p_since)
    union all
    select ua.created_at, ua.user_id, 'shown', false, 0, 'INR'
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
    coalesce(sum(s.paise) filter (where s.kind = 'pass' and not s.refunded and s.currency = 'INR'), 0)::bigint,
    (count(*) filter (where s.kind = 'book_order'))::integer,
    (count(*) filter (where s.kind = 'book'))::integer,
    (count(*) filter (where s.kind = 'book' and s.refunded))::integer,
    coalesce(sum(s.paise) filter (where s.kind = 'book' and not s.refunded), 0)::bigint,
    coalesce(sum(s.paise) filter (where s.kind = 'pass' and not s.refunded and s.currency = 'USD'), 0)::bigint
  from events s
  group by 1
  order by 1;
end;
$$;

revoke execute on function public.sales_by_period(text, timestamptz) from public, anon, authenticated;
grant execute on function public.sales_by_period(text, timestamptz) to service_role;

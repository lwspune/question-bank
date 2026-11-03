-- 0212_practice_pass.sql -- a second www pass: Practice (online), beside Premium (+ downloads).
--
-- Why (owner, 2026-11-03): the 27 rupee buyers since 2026-09-27 split into two
-- groups that barely overlap. 12 practised online after buying (130 to 1,817
-- answers each) and downloaded little; 12 downloaded PDFs (up to 92) and barely
-- practised; 4 did both, 3 neither. Mocks drove almost nothing: 2 of 27 ever
-- took more than the 3 free ones. Sales stopped at Rs 499 (2 in 5 days, none
-- after 2026-10-30), against 2.2 a day at Rs 199. So the www pass splits by
-- what a buyer does:
--   practice   every online limit lifted: answers, drill, saves, projected
--              score, mocks, chapter tests, practice tests, V. No downloads.
--   mocks      the Premium Pass, unchanged: all of that plus PDF downloads.
-- Unlike the retired Teacher Pass (0 sold, 2026-09-27 to 10-01), which asked a
-- buyer to BE a teacher, both are sold to anyone.
--
-- How: every limit in the database is an ONLINE limit (the mock trigger and the
-- save trigger, both through private.user_has_pass, and the hasPass the
-- summaries report through private.user_has_mock_access). Downloads are checked
-- only in the app, against 'downloads', which 'practice' does not cover. So the
-- database change is: 'practice' counts wherever 'mocks' (an Indian exam's pass)
-- is asked for. Mirrors lib/entitlements/access.ts SCOPE_IMPLIES.
--
-- /dashboard/sales gains practice_sold (sales_by_period, at the end) so the two
-- prices can be read apart.
--
-- The plan row itself is DATA (/dashboard/pricing), added after the code that
-- knows the scope is deployed: before that, a Practice buyer would hold a scope
-- nothing reads.

-- ── plans may sell 'practice' ──────────────────────────────────────────
alter table public.plans drop constraint plans_scope_check;
alter table public.plans
  add constraint plans_scope_check check (scope in ('mocks', 'practice', 'teacher', 'imat', 'mcat'));

-- 'downloads' is what a download asks for, never a pass anyone holds.
alter table public.entitlements
  add constraint entitlements_scope_not_downloads check (scope <> 'downloads');

-- ── the Practice Pass covers an Indian exam's online limits (0210's body) ──
create or replace function private.user_has_pass(uid uuid, p_scope text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select p_scope = 'free' or exists (
    select 1 from unnest(private.user_pass_scopes(uid)) s(scope)
    where s.scope = 'all'
       or s.scope = p_scope
       or (s.scope in ('teacher', 'practice') and p_scope = 'mocks')
  );
$$;

-- ── hasPass in my_premium_limits / my_mock_quota: + practice (0120's body) ──
-- Read by the drill, the answer wall, V and the mock start card as "this
-- student's online limits are lifted". No download reads it.
create or replace function private.user_has_mock_access(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.org_members m where m.user_id = uid)
      or exists (select 1 from public.platform_admins p where p.user_id = uid)
      or exists (
        select 1 from public.entitlements e
        where e.user_id = uid
          and e.status = 'active'
          and (e.expires_at is null or e.expires_at > now())
          and e.scope in ('all', 'mocks', 'teacher', 'practice')
      );
$$;

revoke all on function private.user_has_pass(uuid, text) from public;
revoke all on function private.user_has_mock_access(uuid) from public;

-- ── /dashboard/sales: Practice passes sold, beside all passes sold ──────
-- The live body (0203: pass_usd_cents) plus practice_sold, the Practice share of
-- passes_sold, so the two prices can be read apart. The return type changes,
-- so drop and recreate, and restore 0197's grants.
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
  pass_usd_cents bigint,
  practice_sold integer
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
    select e.granted_at as at, e.user_id, 'pass'::text as kind, e.status = 'revoked' as refunded,
      coalesce(e.amount_paise, 0) as paise, e.currency, e.scope
    from public.entitlements e
    where e.source = 'razorpay'
      and (p_since is null or e.granted_at >= p_since)
    union all
    select b.created_at, b.user_id, 'book', b.status = 'revoked', b.amount_paise, 'INR', null
    from public.ebook_purchases b
    where p_since is null or b.created_at >= p_since
    union all
    select ua.created_at, ua.user_id,
      case ua.metadata->>'step' when 'checkout_opened' then 'pass_order' else 'book_order' end,
      false, 0, 'INR', null
    from public.user_activity ua
    where ua.kind = 'paywall_event'
      and ua.ref_id is not null
      and ua.metadata->>'step' in ('checkout_opened', 'book_checkout_opened')
      and (p_since is null or ua.created_at >= p_since)
    union all
    select ua.created_at, ua.user_id, 'shown', false, 0, 'INR', null
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
    coalesce(sum(s.paise) filter (where s.kind = 'pass' and not s.refunded and s.currency = 'USD'), 0)::bigint,
    (count(*) filter (where s.kind = 'pass' and s.scope = 'practice'))::integer
  from events s
  group by 1
  order by 1;
end;
$$;

revoke execute on function public.sales_by_period(text, timestamptz) from public, anon, authenticated;
grant execute on function public.sales_by_period(text, timestamptz) to service_role;

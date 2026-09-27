-- 0121_plans — the pass catalogue moves from code to data (2026-09-27).
--
-- WHAT: public.plans holds what /pricing sells — price, length, scope, copy.
-- Edited at /dashboard/pricing (superadmin). Until now the two passes were a
-- TypeScript constant, so a price change was a deploy.
--
-- WHAT STAYS IN CODE: the scopes. A scope is worth selling only if something
-- in code enforces it (the export route checks 'teacher', the free-mock
-- trigger in 0120 checks 'mocks'), so the CHECK below is a fixed list that a
-- new kind of access extends by migration, together with its enforcement.
-- 'all' is refused here, not just by a test: it satisfies every scope, so a
-- cheap pass carrying it would unlock the teacher's downloads.
--
-- WHY id IS A SLUG, AND WHY ROWS ARE DEACTIVATED, NEVER DELETED: the id is
-- stamped into Razorpay order notes and lands in nothing else here (an
-- entitlement records scope + provider_ref, not the plan), but an order held
-- by Razorpay may still name it. The two seeded ids are the ones the code
-- constant used, so no history breaks.
--
-- RLS: anyone may READ an active plan (prices are public — /pricing and the
-- Terms render them for anon). No write policy: writes are service-role only,
-- behind requireSuperadmin in the admin route. Same shape as entitlements.
--
-- free_mock_limit(): public pages quote the free-mock number ("your first 3
-- mock tests are free") and must say nothing when the limit is off — the
-- Terms cannot promise a limit that is not enforced. paywall_settings is
-- service-role only (0120), so this SECURITY DEFINER read is the one hole.

create table public.plans (
  id            text primary key
                check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  label         text not null check (length(trim(label)) > 0),
  blurb         text not null default '',
  perks         text[] not null default '{}' check (cardinality(perks) <= 6),
  url_key       text not null unique
                check (url_key ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  amount_paise  integer not null check (amount_paise > 0),
  currency      text not null default 'INR' check (currency = 'INR'),
  duration_days integer check (duration_days is null or duration_days > 0),
  scope         text not null check (scope in ('mocks', 'teacher')),
  active        boolean not null default true,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
comment on table public.plans is
  'What /pricing sells. Edited at /dashboard/pricing. scope is a fixed list mirrored by SELLABLE_SCOPES in src/lib/billing/plans.ts — extend both by migration.';

create index plans_active_sort_idx on public.plans (active, sort_order);

-- The two passes the code constant carried, same ids.
insert into public.plans (id, label, blurb, perks, url_key, amount_paise, duration_days, scope, sort_order)
values
  ('mock-pass-6m', 'Student Mock Pass',
   'Unlimited timed mock tests for 6 months, past your free mocks.',
   array['Unlimited full-length timed mock tests',
         'Instant scores and question-by-question review',
         'Your mistakes, ready to drill'],
   'mocks', 9900, 182, 'mocks', 1),
  ('teacher-pass-1y', 'Teacher Pass',
   'Download Word question papers and answer keys for a year. Includes unlimited mocks.',
   array['Word Question Paper + Answer Key downloads',
         'Build papers from any filter, up to 200 questions',
         'Includes unlimited mock tests'],
   'teacher', 49900, 365, 'teacher', 2)
on conflict (id) do nothing;

alter table public.plans enable row level security;

create policy "plans_public_read_active" on public.plans
  for select to anon, authenticated
  using (active);

grant select on public.plans to anon, authenticated;

-- The free-mock number for public copy. NULL = off (say nothing).
create or replace function public.free_mock_limit()
returns integer
language sql
stable
security definer
set search_path = ''
as $$
  select s.free_mock_limit from public.paywall_settings s limit 1;
$$;

revoke all on function public.free_mock_limit() from public;
grant execute on function public.free_mock_limit() to anon, authenticated;

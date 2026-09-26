-- 0120_free_mock_limit — the free-mock limit behind the paid passes (2026-09-26).
--
-- WHAT: a student may START `free_mock_limit` different mocks for free, counted
-- from `counts_from`. Past that, starting a NEW mock needs an active pass
-- (entitlement scope 'mocks', 'teacher' or 'all') or org/platform staff status.
-- Retaking a mock already started, at any time, never uses a slot, and results
-- of mocks already taken are never touched — this only guards INSERT.
--
-- WHY A TRIGGER, NOT THE START ROUTE: mock_attempts has an own-row INSERT
-- policy (0044), so a student's JWT can create an attempt straight through
-- PostgREST. A check in startOrResumeAttempt alone would be a button, not a
-- limit. The route still maps the refusal to a friendly paywall.
--
-- WHY PT402: PostgREST serves a RAISE with SQLSTATE 'PTxyz' as HTTP status xyz,
-- so a direct PostgREST insert gets 402 Payment Required, and supabase-js
-- surfaces error.code = 'PT402' for the start route to recognise.
--
-- SHIPS OFF: free_mock_limit is NULL until billing is live. Turning it on is a
-- data change, not a migration, so the date it starts counting is the date it
-- is switched on:
--     update public.paywall_settings set free_mock_limit = 3, counts_from = now();
-- "From launch day" (owner's call): a student's mocks from before counts_from
-- do not use their free slots.
--
-- Scope rules mirror scopeCovers() in src/lib/entitlements/access.ts — the
-- teacher pass includes mocks. Change both together.

create table public.paywall_settings (
  id              boolean primary key default true check (id),
  free_mock_limit integer check (free_mock_limit is null or free_mock_limit >= 0),
  counts_from     timestamptz,
  updated_at      timestamptz not null default now(),
  constraint paywall_settings_on_needs_date
    check (free_mock_limit is null or counts_from is not null)
);
comment on table public.paywall_settings is
  'One row. free_mock_limit NULL = the free-mock limit is off. Service-role only (RLS on, no policies).';

insert into public.paywall_settings (id) values (true);

-- RLS on with NO policies: only service-role and the SECURITY DEFINER
-- functions below read or write it.
alter table public.paywall_settings enable row level security;

-- Pass or staff: never limited.
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
          and e.scope in ('all', 'mocks', 'teacher')
      );
$$;

-- Distinct mocks whose FIRST attempt began on or after counts_from.
create or replace function private.free_mocks_used(uid uuid, since timestamptz)
returns integer
language sql
stable
security definer
set search_path = ''
as $$
  select count(*)::integer
  from (
    select a.mock_id
    from public.mock_attempts a
    where a.user_id = uid
    group by a.mock_id
    having min(a.started_at) >= since
  ) firsts;
$$;

create or replace function private.enforce_free_mock_limit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  lim   integer;
  since timestamptz;
begin
  select s.free_mock_limit, s.counts_from into lim, since
  from public.paywall_settings s;
  if lim is null then
    return new;
  end if;
  if private.user_has_mock_access(new.user_id) then
    return new;
  end if;
  -- A retake is free, whenever the mock was first started.
  if exists (
    select 1 from public.mock_attempts a
    where a.user_id = new.user_id and a.mock_id = new.mock_id
  ) then
    return new;
  end if;
  -- Serialise one user's concurrent starts so two tabs cannot both take the
  -- last slot.
  perform pg_advisory_xact_lock(hashtextextended('free_mock_limit:' || new.user_id::text, 0));
  if private.free_mocks_used(new.user_id, since) >= lim then
    raise exception 'You have used your % free mock tests.', lim
      using errcode = 'PT402', hint = 'FREE_MOCK_LIMIT';
  end if;
  return new;
end;
$$;

create trigger mock_attempts_free_mock_limit
  before insert on public.mock_attempts
  for each row execute function private.enforce_free_mock_limit();

-- What the mock start page shows: {limit, used, hasPass} for the caller.
-- limit NULL = the limit is off. Reads with the caller's auth.uid() only.
create or replace function public.my_mock_quota()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  uid   uuid := auth.uid();
  lim   integer;
  since timestamptz;
begin
  if uid is null then
    return null;
  end if;
  select s.free_mock_limit, s.counts_from into lim, since
  from public.paywall_settings s;
  return jsonb_build_object(
    'limit', lim,
    'used', case when lim is null then 0 else private.free_mocks_used(uid, since) end,
    'hasPass', private.user_has_mock_access(uid)
  );
end;
$$;

revoke all on function public.my_mock_quota() from public, anon;
grant execute on function public.my_mock_quota() to authenticated;
revoke all on function private.user_has_mock_access(uuid) from public;
revoke all on function private.free_mocks_used(uuid, timestamptz) from public;
revoke all on function private.enforce_free_mock_limit() from public;

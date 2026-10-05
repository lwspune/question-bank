-- 0134_premium_limits.sql — what a free account gets, beyond the 3 free mocks
-- (2026-10-05, owner).
--
-- WHY: the ₹99 Premium Pass sold mocks and downloads, and current students use
-- neither much. In the 14 days to 2026-10-05, 122 students revealed 3,277 bank
-- answers while 39 started a mock; only 5 of 31 mock-takers ever reached the
-- 3-mock limit, 21 saw a paywall and 1 opened a checkout. So the pass now
-- covers what students DO, with a free allowance of each:
--
--   chapter tests        5 free, counted SEPARATELY from the 3 full mocks
--   Fix your mistakes    15 drill questions a day (three sets of five)
--   answer reveals       50 a day for a signed-in student
--   saved questions      100
--   projected score      free for N days from the moment the student reveals it
--
-- Every number lives in paywall_settings and ships NULL (off), like 0120's
-- free_mock_limit: the owner switches each on at /dashboard/pricing.
--
-- WHERE EACH IS ENFORCED, and why it differs:
--   * chapter tests + saves: BEFORE INSERT triggers here. A student's own JWT
--     can insert a mock attempt (0044) or a bookmark (0047) straight through
--     PostgREST, so a check in a route alone would be a button, not a limit.
--   * the drill: in /api/drill/answer. The answer key reaches the browser only
--     from that route, so refusing there is a real limit, and the count it needs
--     ("questions answered in the drill today") is user_activity, which a
--     trigger here could not gate without gating every activity write.
--   * reveals: a SOFT limit in the browser. The answer is already in the page
--     (/questions is ISR-cached), exactly as for the signed-out wall.
--   * the projected score: on the server. /performance renders per request and
--     simply does not send the projection once the trial is over.
--
-- PASS = private.user_has_mock_access (0120): an active 'all' / 'mocks' /
-- 'teacher' entitlement, or org / platform staff. One definition for every
-- limit, so "has the pass" can never mean two things.

alter table public.paywall_settings
  add column free_chapter_test_limit integer
    check (free_chapter_test_limit is null or free_chapter_test_limit >= 0),
  add column chapter_tests_counts_from timestamptz,
  add column free_drill_per_day integer
    check (free_drill_per_day is null or free_drill_per_day >= 0),
  add column free_reveals_per_day integer
    check (free_reveals_per_day is null or free_reveals_per_day >= 0),
  add column free_save_limit integer
    check (free_save_limit is null or free_save_limit >= 0),
  add column projection_trial_days integer
    check (projection_trial_days is null or projection_trial_days >= 0),
  add constraint paywall_settings_chapter_on_needs_date
    check (free_chapter_test_limit is null or chapter_tests_counts_from is not null);

comment on column public.paywall_settings.free_chapter_test_limit is
  'Free chapter tests (mock_tests.scope = sectional) per account, counted from chapter_tests_counts_from. NULL = off.';
comment on column public.paywall_settings.free_drill_per_day is
  'Free drill questions answered per IST day. Enforced in /api/drill/answer. NULL = off.';
comment on column public.paywall_settings.free_reveals_per_day is
  'Free answer reveals per IST day for a signed-in account (bank, board, guides). Soft, in the browser. NULL = off.';
comment on column public.paywall_settings.free_save_limit is
  'Free saved questions per account. Enforced by a trigger on question_bookmarks. NULL = off.';
comment on column public.paywall_settings.projection_trial_days is
  'Days the projected score stays free after the student reveals it (premium_trials). NULL = off (always free).';

-- ── chapter tests: their own count ──────────────────────────────────────────

-- Distinct tests of one scope whose FIRST attempt began on or after `since`.
-- Replaces 0120's free_mocks_used, which counted every scope as a mock.
create or replace function private.free_tests_used(uid uuid, since timestamptz, p_scope text)
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
    join public.mock_tests t on t.id = a.mock_id
    where a.user_id = uid
      and t.scope = p_scope
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
  test_scope text;
  lim        integer;
  since      timestamptz;
  unit       text;
begin
  select t.scope into test_scope from public.mock_tests t where t.id = new.mock_id;
  if test_scope = 'sectional' then
    select s.free_chapter_test_limit, s.chapter_tests_counts_from into lim, since
    from public.paywall_settings s;
    unit := 'chapter tests';
  else
    test_scope := 'full';
    select s.free_mock_limit, s.counts_from into lim, since
    from public.paywall_settings s;
    unit := 'mock tests';
  end if;
  if lim is null then
    return new;
  end if;
  if private.user_has_mock_access(new.user_id) then
    return new;
  end if;
  -- A retake is free, whenever the test was first started.
  if exists (
    select 1 from public.mock_attempts a
    where a.user_id = new.user_id and a.mock_id = new.mock_id
  ) then
    return new;
  end if;
  -- Serialise one user's concurrent starts so two tabs cannot both take the
  -- last slot.
  perform pg_advisory_xact_lock(hashtextextended('free_mock_limit:' || new.user_id::text, 0));
  if private.free_tests_used(new.user_id, since, test_scope) >= lim then
    raise exception 'You have used your % free %.', lim, unit
      using errcode = 'PT402', hint = 'FREE_MOCK_LIMIT';
  end if;
  return new;
end;
$$;

create or replace function public.my_mock_quota()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  uid    uuid := auth.uid();
  lim    integer;
  since  timestamptz;
  clim   integer;
  csince timestamptz;
begin
  if uid is null then
    return null;
  end if;
  select s.free_mock_limit, s.counts_from, s.free_chapter_test_limit, s.chapter_tests_counts_from
    into lim, since, clim, csince
  from public.paywall_settings s;
  return jsonb_build_object(
    'limit', lim,
    'used', case when lim is null then 0 else private.free_tests_used(uid, since, 'full') end,
    'hasPass', private.user_has_mock_access(uid),
    'chapterLimit', clim,
    'chapterUsed', case when clim is null then 0 else private.free_tests_used(uid, csince, 'sectional') end
  );
end;
$$;

drop function private.free_mocks_used(uuid, timestamptz);

-- ── saved questions ─────────────────────────────────────────────────────────

create or replace function private.enforce_free_save_limit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  lim integer;
begin
  select s.free_save_limit into lim from public.paywall_settings s;
  if lim is null then
    return new;
  end if;
  -- Already saved: the app's upsert(ignoreDuplicates) still fires a BEFORE
  -- INSERT trigger before the conflict is resolved, and refusing it would
  -- break the save button for a student at the limit. The conflict makes it
  -- a no-op, so let it through.
  if exists (
    select 1 from public.question_bookmarks b
    where b.user_id = new.user_id and b.question_id = new.question_id
  ) then
    return new;
  end if;
  if private.user_has_mock_access(new.user_id) then
    return new;
  end if;
  perform pg_advisory_xact_lock(hashtextextended('free_save_limit:' || new.user_id::text, 0));
  if (select count(*) from public.question_bookmarks b where b.user_id = new.user_id) >= lim then
    raise exception 'You have used your % free saved questions.', lim
      using errcode = 'PT402', hint = 'FREE_SAVE_LIMIT';
  end if;
  return new;
end;
$$;

create trigger question_bookmarks_free_save_limit
  before insert on public.question_bookmarks
  for each row execute function private.enforce_free_save_limit();

-- ── the projected-score trial ───────────────────────────────────────────────

-- One row per student per feature: the moment they started its free trial.
-- The PRIMARY KEY is what makes it once ever; start_premium_trial inserts with
-- ON CONFLICT DO NOTHING, so a second reveal keeps the first start time.
create table public.premium_trials (
  user_id    uuid not null references auth.users(id) on delete cascade,
  feature    text not null check (feature in ('projection')),
  started_at timestamptz not null default now(),
  primary key (user_id, feature)
);

alter table public.premium_trials enable row level security;

create policy "premium_trials_select_own"
  on public.premium_trials
  for select
  to authenticated
  using (user_id = auth.uid());

-- No write policies: a student starts a trial only through the function below,
-- which can set nothing but "now", so the start time cannot be forged.
create or replace function public.start_premium_trial(p_feature text)
returns timestamptz
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  started timestamptz;
begin
  if uid is null then
    raise exception 'Sign in first.' using errcode = '42501';
  end if;
  insert into public.premium_trials (user_id, feature)
  values (uid, p_feature)
  on conflict (user_id, feature) do nothing;
  select t.started_at into started
  from public.premium_trials t
  where t.user_id = uid and t.feature = p_feature;
  return started;
end;
$$;

-- ── what the app shows ──────────────────────────────────────────────────────

-- The caller's limits for the drill, reveals, saves and the projected score,
-- plus their save count and trial start. Reads with auth.uid() only.
create or replace function public.my_premium_limits()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  s   public.paywall_settings%rowtype;
begin
  if uid is null then
    return null;
  end if;
  select * into s from public.paywall_settings;
  return jsonb_build_object(
    'hasPass', private.user_has_mock_access(uid),
    'drillPerDay', s.free_drill_per_day,
    'revealsPerDay', s.free_reveals_per_day,
    'saveLimit', s.free_save_limit,
    'saves', (select count(*) from public.question_bookmarks b where b.user_id = uid),
    'projectionTrialDays', s.projection_trial_days,
    'projectionStartedAt', (
      select t.started_at from public.premium_trials t
      where t.user_id = uid and t.feature = 'projection'
    )
  );
end;
$$;

revoke all on function public.my_premium_limits() from public, anon;
grant execute on function public.my_premium_limits() to authenticated;
revoke all on function public.start_premium_trial(text) from public, anon;
grant execute on function public.start_premium_trial(text) to authenticated;
revoke all on function private.free_tests_used(uuid, timestamptz, text) from public;
revoke all on function private.enforce_free_save_limit() from public;

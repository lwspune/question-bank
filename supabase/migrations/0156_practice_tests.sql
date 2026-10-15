-- 0156_practice_tests.sql
--
-- PRACTICE TESTS: a test V builds for ONE student (2026-10-15, owner).
--
-- WHAT. A student answers V's questions (exam, subject, up to 5 chapters,
-- length, difficulty, skip answered questions) and the server picks the
-- questions and stores the test. They then start it online or download it.
--
-- WHY IN mock_tests, NOT A TABLE OF ITS OWN. The runner, grader, review,
-- findings card, result page and paper download all read mock_tests. A second
-- table would mean a second copy of each of them. Three columns keep a
-- practice test apart instead:
--   status   'personal'  (new)  never 'published', so EVERY list of tests,
--                               which all read status = 'published' (the
--                               catalogue, sitemap, chapter-test links, emails,
--                               readable paper pages), leaves it out with no
--                               change to any of them. A reader we missed
--                               fails closed: it simply does not see the test.
--   scope    'custom'    (new)  for the free-limit trigger and the attempt
--                               history label.
--   owner_id             (new)  the student it was built for.
-- The three go together or not at all (mock_tests_personal_shape), so a
-- published test can never carry an owner and a personal one never lacks one.
--
-- WHO CAN SEE IT. Its owner only: a SELECT policy for status 'personal' and
-- owner_id = auth.uid(). Writes stay service-role only (the build route), as
-- for every other test, so a student cannot forge a test's questions or marks.
-- The attempt INSERT policy now also admits the owner's personal tests.
--
-- THE FREE LIMIT. One free practice test a day by the India date (owner's
-- call, 2026-10-15), counted by the day a test was FIRST started, so a retake
-- is free. A pass or staff is never limited (private.user_has_mock_access,
-- the one definition every limit uses). It ships ON at 1, unlike the 0134
-- limits that shipped NULL: the owner set the number when asking for the
-- feature. NULL turns it off; it is edited at /dashboard/pricing.

-- ── mock_tests: the personal kind ──────────────────────────────────────────

alter table public.mock_tests
  add column owner_id uuid references auth.users(id) on delete cascade;

alter table public.mock_tests
  drop constraint mock_tests_status_check,
  add constraint mock_tests_status_check
    check (status in ('draft', 'published', 'archived', 'personal')),
  drop constraint mock_tests_scope_check,
  add constraint mock_tests_scope_check
    check (scope in ('full', 'sectional', 'custom')),
  add constraint mock_tests_personal_shape
    check (
      (status = 'personal') = (owner_id is not null)
      and (scope = 'custom') = (owner_id is not null)
    );

comment on column public.mock_tests.owner_id is
  'The student a practice test (scope custom, status personal) was built for. NULL on every shared test.';

-- A student's own practice tests, newest first (the build route's daily cap
-- and any "your tests" list read this).
create index mock_tests_owner_idx
  on public.mock_tests (owner_id, created_at desc)
  where owner_id is not null;

create policy "mock_tests_select_own_personal" on public.mock_tests
  for select to authenticated
  using (status = 'personal' and owner_id = auth.uid());

drop policy "mock_attempts_insert_own" on public.mock_attempts;
create policy "mock_attempts_insert_own" on public.mock_attempts
  for insert to authenticated
  with check (
    user_id = auth.uid()
    and exists (
      select 1 from public.mock_tests m
      where m.id = mock_attempts.mock_id
        and (
          m.status = 'published'
          or (m.status = 'personal' and m.owner_id = auth.uid())
        )
    )
  );

-- ── the free limit ──────────────────────────────────────────────────────────

alter table public.paywall_settings
  add column free_practice_tests_per_day integer
    check (free_practice_tests_per_day is null or free_practice_tests_per_day >= 0);

comment on column public.paywall_settings.free_practice_tests_per_day is
  'Free practice tests (mock_tests.scope = custom) a student may START per India day; a retake is free. NULL = off.';

update public.paywall_settings set free_practice_tests_per_day = 1;

-- Practice tests whose FIRST attempt began today, by the India date.
create or replace function private.practice_tests_started_today(uid uuid)
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
      and t.scope = 'custom'
    group by a.mock_id
    having (min(a.started_at) at time zone 'Asia/Kolkata')::date
         = (now() at time zone 'Asia/Kolkata')::date
  ) firsts;
$$;

-- 0134's trigger, with a third branch for practice tests. The full and
-- sectional branches are unchanged.
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
  if test_scope = 'custom' then
    select s.free_practice_tests_per_day into lim from public.paywall_settings s;
  elsif test_scope = 'sectional' then
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
  if test_scope = 'custom' then
    if private.practice_tests_started_today(new.user_id) >= lim then
      raise exception 'You have used your free practice test for today.'
        using errcode = 'PT402', hint = 'FREE_PRACTICE_LIMIT';
    end if;
    return new;
  end if;
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
  plim   integer;
begin
  if uid is null then
    return null;
  end if;
  select s.free_mock_limit, s.counts_from, s.free_chapter_test_limit, s.chapter_tests_counts_from,
         s.free_practice_tests_per_day
    into lim, since, clim, csince, plim
  from public.paywall_settings s;
  return jsonb_build_object(
    'limit', lim,
    'used', case when lim is null then 0 else private.free_tests_used(uid, since, 'full') end,
    'hasPass', private.user_has_mock_access(uid),
    'chapterLimit', clim,
    'chapterUsed', case when clim is null then 0 else private.free_tests_used(uid, csince, 'sectional') end,
    'practiceLimit', plim,
    'practiceUsed', case when plim is null then 0 else private.practice_tests_started_today(uid) end
  );
end;
$$;

-- 0152's free_limits(), plus the daily practice-test number.
create or replace function public.free_limits()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'reveals', s.free_reveals_per_day,
    'drill', s.free_drill_per_day,
    'saves', s.free_save_limit,
    'mocks', s.free_mock_limit,
    'chapterTests', s.free_chapter_test_limit,
    'projectionDays', s.projection_trial_days,
    'papersPerDay', s.mock_papers_per_day,
    'practiceTestsPerDay', s.free_practice_tests_per_day
  )
  from public.paywall_settings s
  limit 1;
$$;

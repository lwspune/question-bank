-- 0206_exam_pass_scopes.sql -- a pass per exam family, and plans priced per country.
--
-- Why (owner, 2026-10-30): every pass carried scope 'mocks', so the Rs 499 www
-- pass also unlocked IMAT on intl.pyqvault.com, and no international pass could
-- cost more than it without being undercut on day one (MCAT is next). Now each
-- exam names the pass that covers it, and the database's free limits ask for
-- THAT pass:
--   exams.pass_scope   'mocks' (every Indian exam), 'imat', 'mcat'. Mirrors the
--                      registry's passScope (src/lib/billing/passScope.ts);
--                      tests/billing-exam-pass.test.ts keeps them in step.
--   plans.scope        may now sell 'imat' and 'mcat' (SELLABLE_SCOPES).
--   plans.countries    sold only to buyers in these countries (two-letter codes,
--                      from Vercel's location header at checkout); null =
--                      everywhere. First user: IMAT in rupees for India, since
--                      Indian cards often fail on dollar payments and UPI is
--                      rupees only. So an intl plan may now be INR, but only
--                      when it is sold to India alone.
--
-- What does NOT change: a 'mocks' pass still covers every Indian exam exactly
-- as before (private.user_has_mock_access is untouched and still serves the
-- India-only features), 'all' still covers everything, 'teacher' still covers
-- 'mocks'. An IMAT pass covers IMAT only. Nobody loses access: on 2026-10-30
-- no pass holder had ever started an IMAT mock and no USD pass had been sold.
--
-- The limit triggers keep their bodies (0166 enforce_free_mock_limit, 0134
-- enforce_free_save_limit); the one change in each is which pass lets a
-- student past: the pass of the mock's exam, or of the saved question's exam.
-- my_mock_quota and my_premium_limits keep 'hasPass' (the www pass, read by
-- India-only features) and add 'passScopes', every pass the user holds, so a
-- page about an intl exam can ask for that exam's pass.

-- ── exams.pass_scope ───────────────────────────────────────────────────
alter table public.exams
  add column pass_scope text not null default 'mocks'
  check (pass_scope in ('mocks', 'imat', 'mcat'));

comment on column public.exams.pass_scope is
  'The pass that covers this exam: mocks (www Premium Pass), imat, mcat. Mirrors EXAM_REGISTRY passScope.';

update public.exams set pass_scope = 'imat' where name = 'IMAT';

-- ── plans: new scopes, countries, the widened site/currency rule ───────
alter table public.plans drop constraint plans_scope_check;
alter table public.plans
  add constraint plans_scope_check check (scope in ('mocks', 'teacher', 'imat', 'mcat'));

alter table public.plans
  add column countries text[]
  check (countries is null or (cardinality(countries) > 0 and array_to_string(countries, ',') ~ '^[A-Z]{2}(,[A-Z]{2})*$'));

comment on column public.plans.countries is
  'Sold only to buyers in these countries (ISO two-letter codes, from the checkout request''s location); null = everywhere.';

alter table public.plans drop constraint plans_site_currency_check;
alter table public.plans
  add constraint plans_site_currency_check
  check (
    (site = 'pyqvault' and currency = 'INR')
    or (site = 'intl' and currency = 'USD')
    -- "is not null" matters: with countries NULL the comparison is NULL, and a
    -- CHECK that evaluates to NULL passes (the 0184 trap).
    or (site = 'intl' and currency = 'INR' and countries is not null and countries = array['IN'])
  );

-- ── which passes a user holds ──────────────────────────────────────────
-- Staff hold everything ('all'), as private.user_has_mock_access treats them.
create or replace function private.user_pass_scopes(uid uuid)
returns text[]
language sql
stable
security definer
set search_path = ''
as $$
  select case
    when exists (select 1 from public.org_members m where m.user_id = uid)
      or exists (select 1 from public.platform_admins p where p.user_id = uid)
    then array['all']
    else coalesce((
      select array_agg(distinct e.scope order by e.scope)
      from public.entitlements e
      where e.user_id = uid
        and e.status = 'active'
        and (e.expires_at is null or e.expires_at > now())
    ), array[]::text[])
  end;
$$;

-- True when the user holds a pass covering p_scope: the pass itself, 'all',
-- or 'teacher' for 'mocks' (lib/entitlements/access.ts scopeCovers).
create or replace function private.user_has_pass(uid uuid, p_scope text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from unnest(private.user_pass_scopes(uid)) s(scope)
    where s.scope = 'all'
       or s.scope = p_scope
       or (s.scope = 'teacher' and p_scope = 'mocks')
  );
$$;

-- The pass an exam asks for; 'mocks' for a missing exam.
create or replace function private.exam_pass_scope(p_exam_id uuid)
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((select x.pass_scope from public.exams x where x.id = p_exam_id), 'mocks');
$$;

revoke all on function private.user_pass_scopes(uuid) from public;
revoke all on function private.user_has_pass(uuid, text) from public;
revoke all on function private.exam_pass_scope(uuid) from public;

-- ── the mock limit: 0166's body; the pass asked for is the exam's ──────
create or replace function private.enforce_free_mock_limit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  test_scope  text;
  test_shared uuid;
  test_exam   uuid;
  lim         integer;
  since       timestamptz;
  unit        text;
begin
  select t.scope, t.shared_from, t.exam_id into test_scope, test_shared, test_exam
  from public.mock_tests t where t.id = new.mock_id;
  if test_scope = 'custom' then
    if test_shared is not null then
      return new;
    end if;
    select s.free_practice_tests_per_day into lim from public.paywall_settings s;
  else
    -- A friend sent this paper (0166).
    if exists (
      select 1 from public.mock_invite_joins j
      where j.mock_id = new.mock_id and j.friend_id = new.user_id
    ) then
      return new;
    end if;
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
  end if;
  if lim is null then
    return new;
  end if;
  -- 0206: the pass of this test's exam (IMAT asks for 'imat'), not any pass.
  if private.user_has_pass(new.user_id, private.exam_pass_scope(test_exam)) then
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

-- ── the save limit: 0134's body; the pass asked for is the question's exam's ──
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
  -- 0206: the pass of the saved question's exam.
  if private.user_has_pass(
    new.user_id,
    private.exam_pass_scope((select q.exam_id from public.questions q where q.id = new.question_id))
  ) then
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

-- ── the student's own summaries: + passScopes ──────────────────────────
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
    'passScopes', to_jsonb(private.user_pass_scopes(uid)),
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
    'passScopes', to_jsonb(private.user_pass_scopes(uid)),
    'chapterLimit', clim,
    'chapterUsed', case when clim is null then 0 else private.free_tests_used(uid, csince, 'sectional') end,
    'practiceLimit', plim,
    'practiceUsed', case when plim is null then 0 else private.practice_tests_started_today(uid) end
  );
end;
$$;

-- 0210_free_exams.sql -- the Class 9-10 exams need no pass.
--
-- Why (owner, 2026-11-02): Class 9-10 students were 68 of ~1,630 active in 30
-- days and bought 2 passes (Rs 298); none at Rs 499. Free access costs almost
-- nothing, reaches them a year or two before Class 11-12, when they buy. The
-- EXAMS are free, not a kind of student: a category a student picks could be
-- claimed by anyone, while an exam is what the question or mock belongs to.
--
-- How: 0206 gave every exam the pass that covers it (exams.pass_scope) and
-- made each limit ask for that pass. 'free' is a new pass name that every
-- user holds, so each limit lets a free exam through with no change to its
-- body. Nothing sells or grants 'free' (entitlements refuse it below), and a
-- free exam's tests and saves do not use up the allowance on paid exams.
--
-- The app mirrors this: EXAM_REGISTRY passScope 'free' (lib/billing/passScope),
-- kept in step by tests/billing-exam-pass.test.ts. Undo an exam: set its
-- pass_scope back to 'mocks'.

-- ── exams.pass_scope may be 'free' ─────────────────────────────────────
alter table public.exams drop constraint exams_pass_scope_check;
alter table public.exams
  add constraint exams_pass_scope_check check (pass_scope in ('mocks', 'imat', 'mcat', 'free'));

comment on column public.exams.pass_scope is
  'The pass that covers this exam: mocks (www Premium Pass), imat, mcat, or free (no pass needed). Mirrors EXAM_REGISTRY passScope.';

-- 'free' is an exam setting, never a pass anyone holds.
alter table public.entitlements
  add constraint entitlements_scope_not_free check (scope <> 'free');

-- ── every user holds the free pass ─────────────────────────────────────
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
       or (s.scope = 'teacher' and p_scope = 'mocks')
  );
$$;

-- ── a free exam's tests do not use up the free tests (0166's body) ─────
create or replace function private.free_tests_used(uid uuid, since timestamptz, p_scope text)
returns integer
language sql
stable
security definer
set search_path = ''
as $$
  select count(*)::integer
  from (
    select a.mock_id, min(a.started_at) as first_start
    from public.mock_attempts a
    join public.mock_tests t on t.id = a.mock_id
    where a.user_id = uid
      and t.scope = p_scope
      and private.exam_pass_scope(t.exam_id) <> 'free'
    group by a.mock_id
    having min(a.started_at) >= since
  ) firsts
  where not exists (
    select 1 from public.mock_invite_joins j
    where j.mock_id = firsts.mock_id
      and j.friend_id = uid
      and j.joined_at <= firsts.first_start
  );
$$;

-- ── nor the day's practice tests (0163's body) ─────────────────────────
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
      and t.shared_from is null
      and private.exam_pass_scope(t.exam_id) <> 'free'
    group by a.mock_id
    having (min(a.started_at) at time zone 'Asia/Kolkata')::date
         = (now() at time zone 'Asia/Kolkata')::date
  ) firsts;
$$;

-- ── saves: a free exam's questions are not counted (0206's body) ───────
create or replace function private.paid_saves(uid uuid)
returns integer
language sql
stable
security definer
set search_path = ''
as $$
  select count(*)::integer
  from public.question_bookmarks b
  join public.questions q on q.id = b.question_id
  where b.user_id = uid
    and private.exam_pass_scope(q.exam_id) <> 'free';
$$;

revoke all on function private.paid_saves(uuid) from public;

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
  -- 0206: the pass of the saved question's exam (0210: 'free' always passes).
  if private.user_has_pass(
    new.user_id,
    private.exam_pass_scope((select q.exam_id from public.questions q where q.id = new.question_id))
  ) then
    return new;
  end if;
  perform pg_advisory_xact_lock(hashtextextended('free_save_limit:' || new.user_id::text, 0));
  if private.paid_saves(new.user_id) >= lim then
    raise exception 'You have used your % free saved questions.', lim
      using errcode = 'PT402', hint = 'FREE_SAVE_LIMIT';
  end if;
  return new;
end;
$$;

-- ── my_premium_limits: `saves` counts what the limit counts (0206's body) ──
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
    'saves', private.paid_saves(uid),
    'projectionTrialDays', s.projection_trial_days,
    'projectionStartedAt', (
      select t.started_at from public.premium_trials t
      where t.user_id = uid and t.feature = 'projection'
    )
  );
end;
$$;

-- ── the six Class 9-10 exams ───────────────────────────────────────────
update public.exams set pass_scope = 'free'
where name in (
  'CBSE Class 10',
  'ICSE Class 10',
  'Maharashtra State Board Class 9',
  'Maharashtra State Board Class 10',
  'SPI',
  'Foundation Course'
);

-- 0225_study_paths.sql -- the board path (MENTOR_SPEC.md, Phase 1, 2026-11-07).
--
-- WHY. Class 12 students do not know what to study or in what order, and a
-- plan alone did not help: V's week plans got 6 of 68 chapter tasks done. The
-- path is the loop around a plan: every Physics, Chemistry and Maths chapter
-- done before the board exam (revision sheet + Top 10 PYQs + chapter test),
-- a few tasks each day on /me, on track or behind said plainly.
--
-- WHAT IS STORED follows the house rule of weekly_goal (0113) and study_plans
-- (0169): NO done column. What a student did lives in user_activity and
-- mock_attempts and is folded at read time (src/lib/path). Stored here:
--
--   study_paths            what the student chose: board, subjects, minutes a
--                          day; one active path each (ended_at null). Own rows.
--   study_path_deferrals   one row per "Not taught yet" tap. Active for 14 days
--                          or until work in that chapter, read at view time.
--   study_path_days        the server's pick of TODAY's tasks, so the card is
--                          the same all day, and the free-limit exemptions
--                          below are read from what the server chose, never
--                          from anything a browser sends. Service-role writes.
--   study_path_test_grants the chapter tests a student's path served. Free
--                          students have 5 chapter tests in all (0134); the path
--                          needs 37-47. A granted test starts past the limit and
--                          is left out of the count: the mock_invite_joins
--                          pattern (0166), one change in each function below.
--                          Service-role writes only.
--
-- Plus `path_chapter_done` in the user_activity kinds: written once per student
-- and chapter (dedupe key) when a chapter first turns done, so a Top 10 rebuild
-- cannot quietly un-do it and the readout has the moment.
--
-- The two functions are 0206's trigger and 0210's free_tests_used, read LIVE
-- on 2026-11-07 (pg_get_functiondef matched the files), each with one added
-- check. Widening the kind CHECK cannot reject an existing row (0208's list,
-- read live the same day, plus path_chapter_done).

-- ── study_paths ────────────────────────────────────────────────────────
create table public.study_paths (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  exam_slug     text not null check (exam_slug in ('cbse-12', 'mh-hsc-12')),
  subjects      text[] not null check (
                  cardinality(subjects) between 1 and 3
                  and subjects <@ array['physics', 'chemistry', 'mathematics']::text[]
                ),
  daily_minutes smallint not null check (daily_minutes between 15 and 240),
  started_at    timestamptz not null default now(),
  ended_at      timestamptz,
  check (ended_at is null or ended_at >= started_at)
);

comment on table public.study_paths is
  'A student''s board path (MENTOR_SPEC.md): what they chose. Progress is folded from user_activity, never stored here.';

-- One active path per student; ended paths stay as history.
create unique index study_paths_one_active on public.study_paths (user_id) where ended_at is null;
create index study_paths_user_started_idx on public.study_paths (user_id, started_at desc);

alter table public.study_paths enable row level security;

create policy study_paths_select_own on public.study_paths
  for select to authenticated using (user_id = (select auth.uid()));
create policy study_paths_insert_own on public.study_paths
  for insert to authenticated with check (user_id = (select auth.uid()) and ended_at is null);
create policy study_paths_update_own on public.study_paths
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- ── study_path_deferrals ("Not taught yet") ────────────────────────────
create table public.study_path_deferrals (
  id          uuid primary key default gen_random_uuid(),
  path_id     uuid not null references public.study_paths(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  chapter_id  uuid not null references public.chapters(id) on delete cascade,
  deferred_at timestamptz not null default now()
);

create index study_path_deferrals_path_idx on public.study_path_deferrals (path_id, chapter_id, deferred_at desc);
create index study_path_deferrals_user_idx on public.study_path_deferrals (user_id);

alter table public.study_path_deferrals enable row level security;

create policy study_path_deferrals_select_own on public.study_path_deferrals
  for select to authenticated using (user_id = (select auth.uid()));
-- Only on the student's own ACTIVE path.
create policy study_path_deferrals_insert_own on public.study_path_deferrals
  for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and exists (
      select 1 from public.study_paths p
      where p.id = path_id and p.user_id = (select auth.uid()) and p.ended_at is null
    )
  );

-- ── study_path_days (today's pick, server-written) ─────────────────────
create table public.study_path_days (
  user_id             uuid not null references auth.users(id) on delete cascade,
  day                 date not null,
  path_id             uuid not null references public.study_paths(id) on delete cascade,
  tasks               jsonb not null check (jsonb_typeof(tasks) = 'array' and jsonb_array_length(tasks) <= 6),
  -- Today's Top 10 questions (answers free) and Fix questions (drill free).
  exempt_question_ids uuid[] not null default '{}' check (cardinality(exempt_question_ids) <= 200),
  fix_question_ids    uuid[] not null default '{}' check (cardinality(fix_question_ids) <= 5),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  primary key (user_id, day)
);

create index study_path_days_path_idx on public.study_path_days (path_id);

alter table public.study_path_days enable row level security;

-- Read own; no write policy, so only the service role writes.
create policy study_path_days_select_own on public.study_path_days
  for select to authenticated using (user_id = (select auth.uid()));

-- ── study_path_test_grants ─────────────────────────────────────────────
create table public.study_path_test_grants (
  user_id    uuid not null references auth.users(id) on delete cascade,
  mock_id    uuid not null references public.mock_tests(id) on delete cascade,
  path_id    uuid not null references public.study_paths(id) on delete cascade,
  granted_at timestamptz not null default now(),
  primary key (user_id, mock_id)
);

create index study_path_test_grants_mock_idx on public.study_path_test_grants (mock_id);
create index study_path_test_grants_path_idx on public.study_path_test_grants (path_id);

alter table public.study_path_test_grants enable row level security;

create policy study_path_test_grants_select_own on public.study_path_test_grants
  for select to authenticated using (user_id = (select auth.uid()));

-- ── the free-test limit: a granted test starts free (0206's body + 1 check) ──
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
    if exists (
      select 1 from public.mock_invite_joins j
      where j.mock_id = new.mock_id and j.friend_id = new.user_id
    ) then
      return new;
    end if;
    -- 0225: the student's board path served this test.
    if exists (
      select 1 from public.study_path_test_grants g
      where g.mock_id = new.mock_id and g.user_id = new.user_id
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
  if exists (
    select 1 from public.mock_attempts a
    where a.user_id = new.user_id and a.mock_id = new.mock_id
  ) then
    return new;
  end if;
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

-- ── nor is a granted test counted (0210's body + 1 check) ──────────────
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
  )
  -- 0225: granted by the path before the first start.
  and not exists (
    select 1 from public.study_path_test_grants g
    where g.mock_id = firsts.mock_id
      and g.user_id = uid
      and g.granted_at <= firsts.first_start
  );
$$;

-- ── path_chapter_done ──────────────────────────────────────────────────
alter table public.user_activity drop constraint user_activity_kind_ck;

alter table public.user_activity add constraint user_activity_kind_ck check (kind in (
  'mock_submitted',
  'mock_started',
  'answer_wrong',
  'answer_correct',
  'chapter_mastered',
  'note_checkpoint',
  'question_bookmarked',
  'question_practiced',
  'quiz_taken',
  'drill_completed',
  'surface_viewed',
  'drill_started',
  'goal_set',
  'paywall_event',
  'email_clicked',
  'milestone_reached',
  'push_clicked',
  'self_mark',
  'solution_visual',
  'path_chapter_done'
));

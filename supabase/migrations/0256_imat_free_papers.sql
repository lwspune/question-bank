-- 0256_imat_free_papers.sql — IMAT frees two set papers (owner, 2026-11-15).
--
-- WHY: IMAT's 11 mocks shared the site-wide free-mock count (3, any papers),
-- so a student could sit any three of them free. The owner wants one past
-- paper and one practice paper free, both named, and every other IMAT mock
-- behind the IMAT pass. Owner's picks: IMAT 2023 (the oldest, so 2024-2026 stay
-- the pull for the pass) and IMAT Practice Mock 1.
--
-- exams.free_mocks_marked: on such an exam only papers marked free
--    (mock_tests.is_free) start without the exam's pass. Its papers no longer
--    use the shared free count, in either direction: an IMAT paper never eats
--    one of a student's 3, and the 3 never open an IMAT paper. Rejected: a
--    per-exam limit with the same counting ("any one past + any one
--    practice"), which the owner declined for two named papers the catalogue
--    can badge. The rest of the trigger's order stands: the limit OFF
--    (free_mock_limit NULL) still blocks nothing, a pass, a retake, a friend's
--    invite and a study-path grant still open any paper. Full mocks only; a
--    chapter test there keeps its own limit.
--
-- The pass ending after IMAT 2027 is the other half of the same request: 0257.

alter table public.exams
  add column free_mocks_marked boolean not null default false;

comment on column public.exams.free_mocks_marked is
  'True = on this exam only full mocks marked mock_tests.is_free start without the exam''s pass, and its mocks do not use the shared free-mock count (paywall_settings.free_mock_limit). 0256, IMAT.';

alter table public.mock_tests
  add column is_free boolean not null default false;

comment on column public.mock_tests.is_free is
  'A paper anyone signed in may start free, on an exam with exams.free_mocks_marked. Ignored elsewhere. 0256.';

-- 0225's trigger, plus the marked-papers branch for full mocks.
create or replace function private.enforce_free_mock_limit()
 returns trigger
 language plpgsql
 security definer
 set search_path to ''
as $function$
declare
  test_scope  text;
  test_shared uuid;
  test_exam   uuid;
  paper_free  boolean;
  marked      boolean := false;
  lim         integer;
  since       timestamptz;
  unit        text;
begin
  select t.scope, t.shared_from, t.exam_id, t.is_free into test_scope, test_shared, test_exam, paper_free
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
      select coalesce(x.free_mocks_marked, false) into marked from public.exams x where x.id = test_exam;
    end if;
  end if;
  if lim is null then
    return new;
  end if;
  if private.user_has_pass(new.user_id, private.exam_pass_scope(test_exam)) then
    return new;
  end if;
  if exists (
    select 1 from public.mock_attempts a
    where a.user_id = new.user_id and a.mock_id = new.mock_id
  ) then
    return new;
  end if;
  -- 0256: on a marked-papers exam a marked paper is free, any other needs the pass.
  if marked then
    if paper_free then
      return new;
    end if;
    raise exception 'This paper needs a pass.'
      using errcode = 'PT402', hint = 'FREE_MOCK_LIMIT';
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
$function$;

-- 0225's count, leaving out a marked-papers exam's full mocks (they have
-- their own rule above, so they must not use a shared slot).
create or replace function private.free_tests_used(uid uuid, since timestamptz, p_scope text)
 returns integer
 language sql
 stable security definer
 set search_path to ''
as $function$
  select count(*)::integer
  from (
    select a.mock_id, min(a.started_at) as first_start
    from public.mock_attempts a
    join public.mock_tests t on t.id = a.mock_id
    join public.exams x on x.id = t.exam_id
    where a.user_id = uid
      and t.scope = p_scope
      and private.exam_pass_scope(t.exam_id) <> 'free'
      and not (p_scope = 'full' and x.free_mocks_marked)
    group by a.mock_id
    having min(a.started_at) >= since
  ) firsts
  where not exists (
    select 1 from public.mock_invite_joins j
    where j.mock_id = firsts.mock_id
      and j.friend_id = uid
      and j.joined_at <= firsts.first_start
  )
  and not exists (
    select 1 from public.study_path_test_grants g
    where g.mock_id = firsts.mock_id
      and g.user_id = uid
      and g.granted_at <= firsts.first_start
  );
$function$;

-- IMAT: the rule on, and the owner's two free papers.
update public.exams set free_mocks_marked = true where name = 'IMAT';
update public.mock_tests set is_free = true where slug in ('imat-2023', 'imat-practice-01');


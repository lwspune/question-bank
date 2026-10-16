-- 0163_practice_test_friends.sql
--
-- SEND A PRACTICE TEST TO A FRIEND (2026-10-16, owner).
--
-- WHAT. A student sends the practice test V built for them (0156). The friend
-- opens /practice/<slug>, signs in, and gets THEIR OWN copy: the same questions
-- in the same order, owned by the friend. Cooperative, not a contest (owner's
-- call): the message names the test, never a score. A duel with scores side by
-- side is a later step, and a shared results card ("questions you both missed")
-- waits on whether students send tests at all.
--
-- WHY A COPY, NOT ACCESS TO THE ORIGINAL. 0156 shows a practice test to its
-- owner alone, and that stays true: every runner, grader and result read keeps
-- working on the friend's copy because the friend OWNS it. Granting a second
-- reader would mean a token-checked policy on mock_tests and on every attempt
-- read behind it.
--
-- shared_from. The test the copy was made from, always the ROOT (a copy of a
-- copy points at the original), so the later shared card can group every
-- sitting of one test with one key. Only a personal test may carry it, never
-- itself. ON DELETE SET NULL: if the sender's account (and so the original)
-- goes, the friend keeps their copy.
--
-- ONE COPY PER FRIEND. A unique index on (shared_from, owner_id), so a second
-- tap, a second tab or a race between them reopens the copy instead of making
-- another. The join route reads the existing copy on 23505.
--
-- FREE. A friend's copy never uses the daily free practice test (owner's call,
-- 2026-10-16: the friend's sitting is the growth path). The trigger lets it
-- through, and practice_tests_started_today leaves it out of the count, so
-- sitting a friend's test does not use up the friend's own free test either.
-- Known loophole, accepted: a friend sent a new test every day sits free every
-- day. Watch it in the numbers before closing it.
--
-- share_events gets the kind 'practice' so a send is counted beside the mock
-- shares (0109).

alter table public.mock_tests
  add column shared_from uuid references public.mock_tests(id) on delete set null;

alter table public.mock_tests
  add constraint mock_tests_shared_from_shape
    check (shared_from is null or (status = 'personal' and shared_from <> id));

comment on column public.mock_tests.shared_from is
  'A friend''s copy of a practice test: the ROOT test it was sent from (0163). NULL on every other test.';

create unique index mock_tests_friend_copy_key
  on public.mock_tests (shared_from, owner_id)
  where shared_from is not null;

-- ── the free limit: a friend's copy is free ────────────────────────────────

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
    group by a.mock_id
    having (min(a.started_at) at time zone 'Asia/Kolkata')::date
         = (now() at time zone 'Asia/Kolkata')::date
  ) firsts;
$$;

-- 0156's trigger with one change: a friend's copy returns before any limit.
create or replace function private.enforce_free_mock_limit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  test_scope  text;
  test_shared uuid;
  lim         integer;
  since       timestamptz;
  unit        text;
begin
  select t.scope, t.shared_from into test_scope, test_shared
  from public.mock_tests t where t.id = new.mock_id;
  if test_scope = 'custom' then
    if test_shared is not null then
      return new;
    end if;
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

-- ── share_events: the 'practice' kind ──────────────────────────────────────

alter table public.share_events
  drop constraint share_events_subject_kind_check,
  add constraint share_events_subject_kind_check
    check (subject_kind in ('mock', 'practice'));

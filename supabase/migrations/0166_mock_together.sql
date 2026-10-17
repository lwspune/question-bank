-- 0166_mock_together.sql
--
-- PRACTISE TOGETHER ON MOCKS (2026-10-17, owner): the "Practise together" box
-- that V's practice tests carry (0163, 0164) now sits under Start on every
-- published paper too: full past papers, chapter tests and practice papers.
-- A student sends a paper; the friend opens it, sits it, and both result pages
-- show what each side missed. No scores (the 0163 rule).
--
-- WHY NOT A COPY, AS 0163 DOES. A practice test is private, so the friend
-- needs one of their own. A published paper is already open to everyone: a
-- copy would split its item statistics, its catalogue row and its free-limit
-- count. So the friend sits the SAME paper, and what is recorded is who
-- invited whom.
--
-- mock_invites. One per (sender, paper), made the first time a signed-in
-- student opens the paper's start page. Its code goes in the link
-- (/mock/<slug>?with=<code>): 12 random hex digits, so a user id never
-- appears in a shared URL. Only on a published paper that is not a practice
-- test (trigger below: a CHECK cannot read another table).
--
-- mock_invite_joins. One row per friend per invite, written when the friend
-- presses Start. mock_id and inviter_id are copied from the invite (pinned by
-- a composite foreign key) so that "you cannot join your own invite" is a
-- plain CHECK, and so the start trigger can find a join by (mock, friend)
-- through one index.
--
-- FREE (owner's call, 2026-10-17, the same as 0163): a friend who joined an
-- invite starts that paper free past the free mock and chapter-test limits,
-- and it is left out of their count. Two guards:
--   * only a sitting started AFTER the join is left out, so joining a paper
--     you already sat cannot give a free slot back;
--   * the start route allows 20 new joins a student a day.
-- Known loophole, accepted by the owner: two accounts that keep sending each
-- other papers sit every paper free. Watch it in the numbers before closing it.
--
-- Both tables: RLS on, no policies. Every read and write is the service role
-- (the start page, the start route, the result card, the hourly push), and a
-- student reading these rows directly gains nothing.
--
-- share_events gets the kind 'mock_together' for sends from the new box.

create table public.mock_invites (
  id          uuid primary key default gen_random_uuid(),
  code        text not null unique check (code ~ '^[0-9a-f]{12}$'),
  mock_id     uuid not null references public.mock_tests(id) on delete cascade,
  inviter_id  uuid not null references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (mock_id, inviter_id),
  -- The target of mock_invite_joins' composite foreign key.
  unique (id, mock_id, inviter_id)
);

comment on table public.mock_invites is
  'Practise together on a published paper (0166): one invite code per sender per paper.';

create table public.mock_invite_joins (
  invite_id   uuid not null,
  mock_id     uuid not null,
  inviter_id  uuid not null,
  friend_id   uuid not null references auth.users(id) on delete cascade,
  joined_at   timestamptz not null default now(),
  primary key (invite_id, friend_id),
  foreign key (invite_id, mock_id, inviter_id)
    references public.mock_invites (id, mock_id, inviter_id) on delete cascade,
  check (friend_id <> inviter_id)
);

comment on table public.mock_invite_joins is
  'A friend who started a paper from an invite (0166). Such a sitting is free.';

-- The start trigger's lookup, and the card's "invites I joined on this paper".
create index mock_invite_joins_mock_friend_idx on public.mock_invite_joins (mock_id, friend_id);
-- The card's "who joined the invites on this paper".
create index mock_invite_joins_mock_idx on public.mock_invite_joins (mock_id);

alter table public.mock_invites enable row level security;
alter table public.mock_invite_joins enable row level security;

-- ── only on a published paper ──────────────────────────────────────────────

create or replace function private.enforce_mock_invite_target()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.mock_tests t
    where t.id = new.mock_id and t.status = 'published' and t.scope <> 'custom'
  ) then
    raise exception 'An invite can only be made on a published paper.'
      using errcode = '23514';
  end if;
  return new;
end;
$$;

create trigger mock_invites_target
  before insert or update of mock_id on public.mock_invites
  for each row execute function private.enforce_mock_invite_target();

-- ── the free limits: a paper a friend sent is free ─────────────────────────

-- 0134's count, less papers the student started after joining an invite.
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

-- 0163's trigger with one change: a paper the student joined an invite for
-- returns before any limit.
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

-- ── share_events: the 'mock_together' kind ─────────────────────────────────

alter table public.share_events
  drop constraint share_events_subject_kind_check,
  add constraint share_events_subject_kind_check
    check (subject_kind in ('mock', 'practice', 'mock_together'));

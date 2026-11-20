-- 0277_study_time.sql — the study clock (2026-11-21, owner).
--
-- WHY: the owner asked how long a student spends studying, by exam, subject
-- and chapter, to show it back to the student on /me and in V ("You studied
-- 3 h 20 min this week, 1 h on Calculus"). Nothing measured it: mocks keep
-- per-question time (attempt_answers.time_spent_secs) but practice and
-- reading left only event timestamps, and reading pages record one view a
-- day. Estimating from gaps between events undercounts reading entirely, and
-- a wrong number about a student's own effort is worse than none.
--
-- WHAT: the browser counts 30-second ticks while the tab is visible and the
-- student did something in the last minute (lib/studyTime/clock.ts) and sends
-- them every 2 minutes. This file stores them:
--   study_time   one row per student, India day, chapter and kind
--                ('practice' | 'reading'), holding seconds. Each call ADDS to
--                its row (~800 rows a day at 2026-11 traffic), so the table
--                stays small and is updated in place: fillfactor 80 keeps
--                those updates HOT, and autovacuum runs early as on
--                user_activity (0239).
--   study_clock  each student's last call, the limit's memory.
--
-- RULES THE DATABASE ENFORCES (the browser is not trusted):
--   * signed in only; a student writes nothing directly, only through
--     add_study_time, and reads only their own rows;
--   * one call adds at most the seconds since that student's last call
--     plus 30 s of slack, and never more than 300 s, so a second open tab
--     or a forged payload cannot add time that did not pass;
--   * a row never holds more than a day (86,400 s);
--   * a call is at most 20 items, each 1-300 whole seconds, kind p or r,
--     with a uuid chapter (c) or question (q) or neither; a malformed call
--     is refused whole.
--
-- chapter_id has NO foreign key on purpose: chapters are merged and deleted
-- during taxonomy clean-ups, and a key would either block the merge or (on
-- delete set null) collide with the day's unassigned row. An id the server
-- cannot find is stored as unassigned at write time, and a chapter deleted
-- later simply reads back as unassigned (the read's left join).
--
-- A question item is stored on the question's chapter: the browser knows
-- which question was answered, the database knows its chapter.
--
-- Mock time is NOT stored here: the clock is off on the mock runner, and the
-- report (Branch 2) reads attempt_answers for it, so nothing counts twice.

create table public.study_time (
  id          bigint      generated always as identity primary key,
  user_id     uuid        not null references auth.users (id) on delete cascade,
  day         date        not null,
  chapter_id  uuid,
  kind        text        not null check (kind in ('practice', 'reading')),
  secs        integer     not null default 0 check (secs between 0 and 86400),
  updated_at  timestamptz not null default now()
) with (
  fillfactor = 80,
  autovacuum_vacuum_scale_factor = 0.02,
  autovacuum_vacuum_insert_scale_factor = 0.02,
  autovacuum_analyze_scale_factor = 0.02
);

-- One row per student, day, chapter and kind; the day's unassigned time is a
-- row too (NULLS NOT DISTINCT), so it adds up like any other.
create unique index study_time_place_key
  on public.study_time (user_id, day, chapter_id, kind) nulls not distinct;

alter table public.study_time enable row level security;
revoke all on public.study_time from anon, authenticated;
grant select on public.study_time to authenticated;

create policy study_time_select_own on public.study_time
  for select to authenticated
  using (user_id = (select auth.uid()));

create table public.study_clock (
  user_id  uuid        primary key references auth.users (id) on delete cascade,
  last_at  timestamptz not null
) with (
  fillfactor = 80,
  autovacuum_vacuum_scale_factor = 0.02,
  autovacuum_analyze_scale_factor = 0.02
);

alter table public.study_clock enable row level security;
revoke all on public.study_clock from anon, authenticated;

create or replace function public.add_study_time(p_items jsonb)
returns integer
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_uid     uuid := auth.uid();
  v_now     timestamptz := now();
  v_day     date := (now() at time zone 'Asia/Kolkata')::date;
  v_last    timestamptz;
  v_allow   integer;
  v_added   integer := 0;
  v_item    jsonb;
  v_kind    text;
  v_secs    numeric;
  v_take    integer;
  v_ref     uuid;
  v_chapter uuid;
begin
  if v_uid is null then
    raise exception 'sign in to record study time' using errcode = '42501';
  end if;
  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) > 20 then
    raise exception 'study time: expected at most 20 items' using errcode = '22023';
  end if;

  -- Validate every item before writing any: a malformed call is refused whole.
  for v_item in select value from jsonb_array_elements(p_items) loop
    if jsonb_typeof(v_item) <> 'object'
       or coalesce(v_item->>'k', '') not in ('p', 'r')
       or jsonb_typeof(v_item->'s') is distinct from 'number' then
      raise exception 'study time: malformed item' using errcode = '22023';
    end if;
    v_secs := (v_item->>'s')::numeric;
    if v_secs <> trunc(v_secs) or v_secs < 1 or v_secs > 300 then
      raise exception 'study time: seconds must be 1-300' using errcode = '22023';
    end if;
    if v_item ? 'q' and v_item ? 'c' then
      raise exception 'study time: a chapter or a question, not both' using errcode = '22023';
    end if;
    -- A bad uuid raises 22P02 here.
    if v_item ? 'q' then v_ref := (v_item->>'q')::uuid; end if;
    if v_item ? 'c' then v_ref := (v_item->>'c')::uuid; end if;
  end loop;

  insert into public.study_clock (user_id, last_at)
  values (v_uid, v_now - interval '300 seconds')
  on conflict (user_id) do nothing;

  select last_at into v_last from public.study_clock where user_id = v_uid for update;
  v_allow := least(300, greatest(0, floor(extract(epoch from (v_now - v_last)))::integer + 30));

  for v_item in select value from jsonb_array_elements(p_items) loop
    exit when v_added >= v_allow;
    v_kind := case when v_item->>'k' = 'p' then 'practice' else 'reading' end;
    v_take := least((v_item->>'s')::integer, v_allow - v_added);
    v_chapter := null;
    if v_item ? 'q' then
      select q.chapter_id into v_chapter from public.questions q where q.id = (v_item->>'q')::uuid;
    elsif v_item ? 'c' then
      select c.id into v_chapter from public.chapters c where c.id = (v_item->>'c')::uuid;
    end if;

    insert into public.study_time as st (user_id, day, chapter_id, kind, secs)
    values (v_uid, v_day, v_chapter, v_kind, v_take)
    on conflict (user_id, day, chapter_id, kind)
    do update set secs = least(86400, st.secs + excluded.secs), updated_at = now();

    v_added := v_added + v_take;
  end loop;

  update public.study_clock set last_at = v_now where user_id = v_uid;
  return v_added;
end;
$$;

revoke all on function public.add_study_time(jsonb) from public, anon;
grant execute on function public.add_study_time(jsonb) to authenticated;

-- The student's own time, with each chapter's name, subject and exam. At most
-- about two months a call. Security invoker: RLS keeps it to the caller's rows.
create or replace function public.get_own_study_time(p_from date, p_to date)
returns table (
  day        date,
  kind       text,
  secs       integer,
  chapter_id uuid,
  chapter    text,
  subject    text,
  exam_id    uuid
)
language sql
stable
security invoker
set search_path = ''
as $$
  select st.day, st.kind, st.secs, c.id, c.name, s.name, s.exam_id
  from public.study_time st
  left join public.chapters c on c.id = st.chapter_id
  left join public.subjects s on s.id = c.subject_id
  where st.user_id = (select auth.uid())
    and st.day between p_from and least(p_to, p_from + 62)
  order by st.day, st.secs desc;
$$;

revoke all on function public.get_own_study_time(date, date) from public, anon;
grant execute on function public.get_own_study_time(date, date) to authenticated;

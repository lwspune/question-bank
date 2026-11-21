-- 0278_study_time_read.sql — one read of a student's study time, with mocks
-- (2026-11-21, owner: the /me and V study-time cards, Branch 2 of the study
-- clock).
--
-- WHY: the cards show practice, reading AND mock time by day, subject and
-- chapter. The clock (0277) stores practice and reading; mocks already keep
-- per-question time (attempt_answers.time_spent_secs), which is why the clock
-- is off on the mock runner. This read joins the two so Home, V and the staff
-- view of a student's Home all add up the same rows.
--
-- get_study_time(p_user_id, p_from, p_to): one row per India day, kind
-- ('practice' | 'reading' | 'mock') and chapter, with the chapter's name,
-- subject and exam. SECURITY INVOKER with a user id, the get_started_chapter_ids
-- pattern (0242): RLS keeps a student to their own rows (another student's id
-- returns nothing), and the staff view calls it with the service role.
-- At most 63 days a call.
--
-- MOCK TIME is the time each question was open in the runner, on the India
-- day the attempt was handed in (or started, while still open). Measured on
-- 2026-11-21 over 30 days: for 562 submitted attempts it adds up to a median
-- 95% of the time the paper was open, so it is real time on the paper. But an
-- attempt left open until its timer ran out can hold an hour on one question
-- (3,797 s, while the longest in a submitted attempt was 1,248 s), so ONE
-- QUESTION COUNTS AT MOST 600 s (10 minutes).
--
-- Replaces get_own_study_time (0277), which nothing called: one read for every
-- surface keeps them from drifting apart.

drop function if exists public.get_own_study_time(date, date);

create or replace function public.get_study_time(p_user_id uuid, p_from date, p_to date)
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
  with bounds as (
    select p_from as d0,
           least(p_to, p_from + 62) as d1
  ),
  clock as (
    select st.day, st.kind, st.secs, st.chapter_id
    from public.study_time st, bounds b
    where st.user_id = p_user_id
      and st.day between b.d0 and b.d1
  ),
  mocks as (
    select (coalesce(m.submitted_at, m.started_at) at time zone 'Asia/Kolkata')::date as day,
           'mock'::text as kind,
           least(86400, sum(least(aa.time_spent_secs, 600)))::integer as secs,
           q.chapter_id
    from public.mock_attempts m
    cross join bounds b
    join public.attempt_answers aa on aa.attempt_id = m.id
    join public.questions q on q.id = aa.question_id
    where m.user_id = p_user_id
      and coalesce(m.submitted_at, m.started_at) >= (b.d0::timestamp at time zone 'Asia/Kolkata')
      and coalesce(m.submitted_at, m.started_at) < ((b.d1 + 1)::timestamp at time zone 'Asia/Kolkata')
      and aa.time_spent_secs > 0
    group by 1, 4
  )
  select x.day, x.kind, x.secs, c.id, c.name, s.name, s.exam_id
  from (select * from clock union all select * from mocks) x
  left join public.chapters c on c.id = x.chapter_id
  left join public.subjects s on s.id = c.subject_id
  order by x.day, x.secs desc;
$$;

revoke all on function public.get_study_time(uuid, date, date) from public, anon;
grant execute on function public.get_study_time(uuid, date, date) to authenticated, service_role;

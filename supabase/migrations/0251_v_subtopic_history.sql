-- 0251_v_subtopic_history.sql
--
-- V knows the student's recent mistakes on the topic (V_LEARNING_LOOP.md step
-- 3, owner 2026-11-10). V remembers only the chat; a student's answers on the
-- rest of the site never reached it. Measured 20 Oct to 9 Nov: of 553 Ask V
-- taps, 186 (34%) came from a student who had got ANOTHER question in the same
-- subtopic wrong in the 30 days before, mostly earlier that day on /browse;
-- only 14 came after an earlier V explanation there. So V is told the
-- mistakes, and can name a step that goes wrong again.
--
-- 1. v_subtopic_history(p_user, p_subtopic, p_exclude, p_before): one
--    student's graded answers on OTHER questions of one subtopic in the 30 days
--    before p_before, and their two most recent wrong ones (the start of the
--    question, what they picked, the key). PUBLIC questions only.
--    Graded answers follow lib/chat/verifiedLearning.ts answerFromActivity:
--      - question_practiced with a verdict (bank, board, guide, daily, V's try
--        card, a drill question right first time), self-marks left out;
--      - the drill's own answer_wrong / answer_correct rows for a pick;
--      - mock picks (attempt_answers of a submitted attempt), graded against
--        the key, at the attempt's submit time.
--    A bank miss writes BOTH a verdict row and an answer_wrong row; only the
--    verdict row is read, so nothing is counted twice.
--    p_before lets a test case rebuild what V would have known at the time of
--    a stored message (scripts/chat/eval/seed.ts).
--
--    SECURITY DEFINER because chat code reads it for a student by id on the
--    server; it takes the student's id, so it is service_role only: no student
--    can read another's history through it.
--
-- 2. v_eval_cases.subtopic_history: the line V was told, so a test case
--    replays it.

create or replace function public.v_subtopic_history(
  p_user uuid,
  p_subtopic uuid,
  p_exclude uuid,
  p_before timestamptz default now()
)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  with answers as (
    select u.ref_id::uuid as qid,
           (u.metadata->>'correct')::boolean as correct,
           u.metadata->>'chose' as chose,
           u.created_at as at
    from public.user_activity u
    where u.user_id = p_user
      and u.kind = 'question_practiced'
      and u.created_at >= p_before - interval '30 days' and u.created_at < p_before
      and u.metadata ? 'correct'
      and not (u.metadata ? 'selfMark')
      and u.ref_id ~ '^[0-9a-fA-F-]{36}$'
    union all
    select u.ref_id::uuid, u.kind = 'answer_correct', u.metadata->>'chose', u.created_at
    from public.user_activity u
    where u.user_id = p_user
      and u.kind in ('answer_wrong', 'answer_correct')
      and u.created_at >= p_before - interval '30 days' and u.created_at < p_before
      and u.metadata->>'surface' = 'drill'
      and u.metadata ? 'chose'
      and u.ref_id ~ '^[0-9a-fA-F-]{36}$'
    union all
    select aa.question_id,
           exists (
             select 1 from public.options o
             where o.question_id = aa.question_id and o.is_correct and o.label::text = aa.selected_label
           ),
           aa.selected_label,
           a.submitted_at
    from public.mock_attempts a
    join public.attempt_answers aa on aa.attempt_id = a.id
    where a.user_id = p_user
      and a.submitted_at >= p_before - interval '30 days' and a.submitted_at < p_before
      and aa.selected_label is not null
  ),
  here as (
    select x.qid, x.correct, x.chose, x.at, q.text
    from answers x
    join public.questions q on q.id = x.qid
    where q.subtopic_id = p_subtopic
      and q.id <> p_exclude
      and q.visibility = 'PUBLIC'
  ),
  misses as (
    select distinct on (h.qid) h.qid, h.chose, h.at, left(h.text, 300) as stem
    from here h
    where not h.correct
    order by h.qid, h.at desc
  ),
  recent as (
    select * from misses order by at desc limit 2
  )
  select jsonb_build_object(
    'answered', (select count(*) from here),
    'right', (select count(*) from here where correct),
    'misses', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'stem', r.stem,
          'chose', r.chose,
          'answer', (select string_agg(o.label::text, ',' order by o.label::text) from public.options o where o.question_id = r.qid and o.is_correct)
        )
        order by r.at desc
      )
      from recent r
    ), '[]'::jsonb)
  );
$$;

revoke all on function public.v_subtopic_history(uuid, uuid, uuid, timestamptz) from public, anon, authenticated;
grant execute on function public.v_subtopic_history(uuid, uuid, uuid, timestamptz) to service_role;

comment on function public.v_subtopic_history(uuid, uuid, uuid, timestamptz) is
  'One student''s graded answers on other questions of a subtopic in the 30 days before p_before, and their two latest wrong ones (0251, V_LEARNING_LOOP.md step 3). service_role only.';

alter table public.v_eval_cases
  add column if not exists subtopic_history text check (subtopic_history is null or char_length(subtopic_history) <= 2000);

comment on column public.v_eval_cases.subtopic_history is
  'The line V was told about the student''s recent mistakes on the topic (0251), replayed by the test runner.';

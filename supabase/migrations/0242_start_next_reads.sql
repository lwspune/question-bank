-- 0242_start_next_reads.sql -- "Start next" on Home (2026-11-09, step 4 of
-- the Home · Review · Progress redesign): the highest-value chapters of a
-- student's exam that they have not started, each with what it is worth in a
-- real paper ("about 10 questions a paper · 24 of 300 marks (8%)", the owner's
-- format). Two read-only functions; no table, no write.
--
-- 1. get_chapter_paper_weights(p_exam_id): per chapter and paper, the
--    average number of its questions in a published full past paper, their
--    average marks (each question's own `marks` in mock_tests.questions, so a
--    2.5-mark NDA question and a 4-mark JEE one are both right), and the
--    paper's total. MEASURED from the papers students sit, never estimated.
--    The guides' trend matrices count the same thing from the bank (CDS Maths
--    Trigonometric Ratios: 10.8 a paper there, 10.7 here over the 18 papers
--    published as mocks), and cover only a few subjects without marks; these
--    papers cover every exam that has one. SECURITY INVOKER: published mocks,
--    PUBLIC questions and the taxonomy are already readable signed out, so the
--    function shows no one anything they could not read. The app caches its
--    answer per exam for a day.
--
-- 2. get_started_chapter_ids(p_user_id, p_exam_id): the chapters of an exam
--    the student has answered anything in: a reveal or graded pick
--    (question_practiced, answer_wrong, answer_correct), a Review later /
--    Understood tap (self_mark), or a mock answer. NOT a No to V
--    (v_not_understood, 0241): that answers nothing. SECURITY INVOKER, so RLS
--    keeps a student to their own rows: another student's id returns nothing.
--    The staff view of a student's Home calls it with the service role.
--    Measured: the heaviest student holds ~4,000 activity rows (67 chapters
--    started), read on user_activity_user_kind_time_idx.

create or replace function public.get_chapter_paper_weights(p_exam_id uuid)
returns table (
  chapter_id uuid,
  chapter text,
  subject text,
  exam text,
  paper_code text,
  papers integer,
  q_per_paper numeric,
  marks_per_paper numeric,
  paper_marks numeric
)
language sql
stable
security invoker
set search_path = public
as $$
  with papers as (
    select t.id, t.paper_code, t.total_marks, t.questions
    from public.mock_tests t
    where t.exam_id = p_exam_id
      and t.status = 'published'
      and t.source = 'pyq'
      and t.scope = 'full'
      and t.owner_id is null
      and jsonb_typeof(t.questions) = 'array'
  ),
  totals as (
    select p.paper_code, count(*)::integer as papers, avg(p.total_marks) as paper_marks
    from papers p
    group by p.paper_code
  ),
  items as (
    select p.paper_code, (q ->> 'questionId')::uuid as qid, coalesce((q ->> 'marks')::numeric, 0) as marks
    from papers p
    cross join lateral jsonb_array_elements(p.questions) as q
  ),
  per as (
    select i.paper_code, qq.chapter_id, count(*) as n, sum(i.marks) as m
    from items i
    join public.questions qq on qq.id = i.qid
    group by i.paper_code, qq.chapter_id
  )
  select
    per.chapter_id,
    c.name,
    s.name,
    e.name,
    per.paper_code,
    t.papers,
    round(per.n::numeric / t.papers, 2),
    round(per.m / t.papers, 2),
    round(t.paper_marks, 2)
  from per
  join totals t on t.paper_code = per.paper_code
  join public.chapters c on c.id = per.chapter_id
  join public.subjects s on s.id = c.subject_id
  join public.exams e on e.id = s.exam_id;
$$;

grant execute on function public.get_chapter_paper_weights(uuid) to anon, authenticated;

create or replace function public.get_started_chapter_ids(p_user_id uuid, p_exam_id uuid)
returns setof uuid
language sql
stable
security invoker
set search_path = public
as $$
  with acts as (
    select distinct a.ref_id
    from public.user_activity a
    where a.user_id = p_user_id
      and a.ref_kind = 'question'
      and a.kind in ('question_practiced', 'answer_wrong', 'answer_correct', 'self_mark')
      and a.ref_id ~ '^[0-9a-fA-F-]{36}$'
  )
  select distinct q.chapter_id
  from acts
  join public.questions q on q.id = acts.ref_id::uuid
  where q.exam_id = p_exam_id
  union
  select distinct q.chapter_id
  from public.attempt_answers aa
  join public.mock_attempts m on m.id = aa.attempt_id
  join public.questions q on q.id = aa.question_id
  where m.user_id = p_user_id
    and q.exam_id = p_exam_id
    and (aa.selected_label is not null or aa.selected_labels is not null or aa.numeric_response is not null);
$$;

grant execute on function public.get_started_chapter_ids(uuid, uuid) to authenticated;

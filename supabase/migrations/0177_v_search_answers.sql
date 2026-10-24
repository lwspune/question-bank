-- 0177_v_search_answers.sql -- the model answers V explains a concept from (V_SPEC.md step 2, 2026-10-22).
--
-- Why: students ask V for concepts, definitions and derivations ("derive an
-- expression for electric potential due to a point charge", "radius of
-- gyration formula"), and V could only say it did not know. The bank already
-- holds the answer far more often than not: board papers ask exactly these, with
-- a written model answer, and questions.search_vector (text + solution +
-- context, english config, GIN index questions_search_idx) can find them. On
-- 2026-10-22 a probe of nine real asks found the right answer for seven, four
-- of them word for word.
--
-- What it does: the questions matching a to_tsquery string (built in code from
-- [a-z0-9] words joined by " & ", lib/chat/conceptSearch.ts, so the syntax
-- cannot break), with a stored solution of some length, best first. "Best" is
-- the text rank, doubled for the student's exam and again for the page's
-- subject, and raised by half for a written answer (a model answer explains;
-- an MCQ solution often only picks). Ranking by boost rather than sorting by
-- exam first: a weak match in the student's exam must not bury a strong one.
--
-- Why a function and not a PostgREST select: ts_rank and the joined boosts
-- cannot be expressed as a .select().order().
--
-- SECURITY INVOKER: V calls it with the anon client, so RLS shows PUBLIC
-- questions only; the visibility filter below repeats that so a service-role
-- caller gets the same answer. At most 5 rows.

create or replace function public.v_search_answers(
  p_query text,
  p_exam_names text[] default '{}',
  p_subject_name text default null,
  p_limit integer default 3
)
returns table (
  id uuid,
  exam_name text,
  chapter_id uuid,
  chapter_name text,
  question_format text,
  text text,
  solution text,
  rank real
)
language sql
stable
security invoker
set search_path = public
as $$
  with tsq as (
    select to_tsquery('english', p_query) as q
    where char_length(coalesce(p_query, '')) between 1 and 200
  )
  select
    qu.id,
    e.name,
    c.id,
    c.name,
    qu.question_format::text,
    qu.text,
    qu.solution,
    (ts_rank(qu.search_vector, tsq.q)
      * (case when e.name = any(coalesce(p_exam_names, '{}')) then 2 else 1 end)
      * (case when p_subject_name is not null and s.name = p_subject_name then 2 else 1 end)
      * (case when qu.question_format::text = 'subjective' then 1.5 else 1 end))::real as rank
  from tsq
  join public.questions qu on qu.search_vector @@ tsq.q
  join public.chapters c on c.id = qu.chapter_id
  join public.subjects s on s.id = c.subject_id
  join public.exams e on e.id = s.exam_id
  where qu.visibility = 'PUBLIC'
    and char_length(coalesce(qu.solution, '')) >= 40
  order by rank desc, qu.id
  limit least(greatest(coalesce(p_limit, 3), 1), 5)
$$;

revoke all on function public.v_search_answers(text, text[], text, integer) from public;
grant execute on function public.v_search_answers(text, text[], text, integer) to anon, authenticated, service_role;

-- 0178_v_search_answers_index.sql -- make v_search_answers (0177) use the text index.
--
-- Why: measured on production the day 0177 was applied, one search read about
-- 77,000 buffers and took 2 s through the anon client. The planner estimated
-- one matching row for `search_vector @@ query` (tsvector statistics are poor
-- for an AND of words) and chose questions_visibility_idx instead: it walked
-- all ~116,000 PUBLIC questions and tested each one. The anon client makes it
-- worse, not better: its row-level policy ADDS `visibility = 'PUBLIC'`, which
-- is exactly the condition that index serves, so no rewrite of the query
-- alone could steer it while RLS applied.
--
-- The fix, measured: find the matching ids through the GIN index first, in a
-- MATERIALIZED step that carries no other condition (so the GIN index is the
-- only index it can use), then filter and rank only those rows. About 1,400
-- buffers instead of 77,000.
--
-- That needs the function to run without the caller's row-level policy, so it
-- is SECURITY DEFINER, and `visibility = 'PUBLIC'` is applied HERE: it returns
-- what the anon client may already read, nothing more (pinned by
-- tests/v-search-answers.integration.test.ts, "never returns a private
-- question"). search_path is fixed. At most 2,000 index hits are ranked: a
-- topic of two to four words matches far fewer; a single common word would
-- rank a sample, which is acceptable for "explain this concept".
--
-- Same name, arguments and result as 0177, so callers do not change.

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
security definer
set search_path = public
as $$
  with tsq as (
    select to_tsquery('english', p_query) as q
    where char_length(coalesce(p_query, '')) between 1 and 200
  ),
  hits as materialized (
    select qu.id
    from tsq
    join public.questions qu on qu.search_vector @@ tsq.q
    limit 2000
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
  from hits
  join public.questions qu on qu.id = hits.id
  cross join tsq
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

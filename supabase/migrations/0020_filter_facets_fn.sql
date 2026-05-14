-- Per-chapter and per-subtopic question count aggregates for the /browse
-- filter sidebar. Same pattern + safety as get_dashboard_stats (0018) and
-- get_pyq_years (0019):
--   * `security invoker` so RLS still scopes (anon sees PUBLIC only;
--     authenticated org members additionally see their org's PRIVATE).
--   * `set search_path = ''` to avoid search_path-attack patterns.
--   * Aggregates server-side so PostgREST's 1000-row cap can't truncate.
--
-- These power "Chapter (N)" and "Subtopic (N)" rendering in the filter
-- sidebar, with counts that update as other filters narrow the bank.

create or replace function public.get_chapter_facets(
  p_exam_id uuid default null,
  p_subject_id uuid default null,
  p_difficulties text[] default null,
  p_pyq_years int[] default null,
  p_q text default null
) returns table(chapter_id uuid, q_count int)
language sql
stable
security invoker
set search_path = ''
as $$
  select q.chapter_id, count(*)::int
  from public.questions q
  where (p_exam_id is null or q.exam_id = p_exam_id)
    and (p_subject_id is null or q.subject_id = p_subject_id)
    and (
      coalesce(array_length(p_difficulties, 1), 0) = 0
      or q.difficulty::text = any(p_difficulties)
    )
    and (
      coalesce(array_length(p_pyq_years, 1), 0) = 0
      or q.pyq_year = any(p_pyq_years)
    )
    and (
      p_q is null or p_q = ''
      or q.search_vector @@ websearch_to_tsquery('english', p_q)
    )
  group by q.chapter_id;
$$;

comment on function public.get_chapter_facets is
  'Per-chapter question counts scoped by the other active filters, RLS-safe (security invoker). Powers the /browse filter sidebar chapter list.';

create or replace function public.get_subtopic_facets(
  p_chapter_ids uuid[],
  p_exam_id uuid default null,
  p_subject_id uuid default null,
  p_difficulties text[] default null,
  p_pyq_years int[] default null,
  p_q text default null
) returns table(subtopic_id uuid, q_count int)
language sql
stable
security invoker
set search_path = ''
as $$
  select q.subtopic_id, count(*)::int
  from public.questions q
  where q.subtopic_id is not null
    and (
      coalesce(array_length(p_chapter_ids, 1), 0) = 0
      or q.chapter_id = any(p_chapter_ids)
    )
    and (p_exam_id is null or q.exam_id = p_exam_id)
    and (p_subject_id is null or q.subject_id = p_subject_id)
    and (
      coalesce(array_length(p_difficulties, 1), 0) = 0
      or q.difficulty::text = any(p_difficulties)
    )
    and (
      coalesce(array_length(p_pyq_years, 1), 0) = 0
      or q.pyq_year = any(p_pyq_years)
    )
    and (
      p_q is null or p_q = ''
      or q.search_vector @@ websearch_to_tsquery('english', p_q)
    )
  group by q.subtopic_id;
$$;

comment on function public.get_subtopic_facets is
  'Per-subtopic question counts scoped by chapter selection and other active filters, RLS-safe (security invoker). Powers the /browse filter sidebar subtopic list.';

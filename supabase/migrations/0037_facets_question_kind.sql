-- Add the question_kind axis (migration 0036) to the /browse filter-sidebar
-- facet RPCs so the chapter/subtopic counts honour the PYQ / Practice / All
-- toggle. Without this the sidebar counts would ignore the toggle and mislead
-- (e.g. show practice questions in a chapter count while the list hides them).
--
-- p_kind defaults to 'pyq' to match the /browse default (PYQ-first). 'all'
-- applies no kind filter. We DROP then recreate (rather than create-or-replace)
-- because adding a parameter changes the signature — leaving the old 5-arg
-- function alongside the new one would make PostgREST's named-arg resolution
-- ambiguous.
drop function if exists public.get_chapter_facets(uuid, uuid, text[], int[], text);
drop function if exists public.get_subtopic_facets(uuid[], uuid, uuid, text[], int[], text);

create function public.get_chapter_facets(
  p_exam_id uuid default null,
  p_subject_id uuid default null,
  p_difficulties text[] default null,
  p_pyq_years int[] default null,
  p_q text default null,
  p_kind text default 'pyq'
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
    and (p_kind = 'all' or q.question_kind::text = p_kind)
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
  'Per-chapter question counts scoped by the other active filters incl. question_kind (p_kind: pyq|practice|all), RLS-safe (security invoker). Powers the /browse filter sidebar chapter list.';

create function public.get_subtopic_facets(
  p_chapter_ids uuid[],
  p_exam_id uuid default null,
  p_subject_id uuid default null,
  p_difficulties text[] default null,
  p_pyq_years int[] default null,
  p_q text default null,
  p_kind text default 'pyq'
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
    and (p_kind = 'all' or q.question_kind::text = p_kind)
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
  'Per-subtopic question counts scoped by chapter selection and other active filters incl. question_kind (p_kind: pyq|practice|all), RLS-safe (security invoker). Powers the /browse filter sidebar subtopic list.';

-- PYQ year list RPC.
--
-- Old client code did `.from("questions").select("pyq_year").not(...).order(...)`
-- then `new Set(...)` to dedup client-side. As soon as the bank crossed
-- 1000 year-tagged questions the response truncated at PostgREST's implicit
-- 1000-row cap and older years (e.g. 2023) silently vanished from the
-- /browse FilterBar's "PYQ year" list — even though questions for those
-- years existed and were filterable by direct URL.
--
-- Same pattern + same fix as `get_dashboard_stats` (migration 0018):
-- a SQL aggregate function so the answer is exact regardless of row volume.
-- `security invoker` so RLS still scopes (anon sees PUBLIC years,
-- authenticated org members additionally see their org's PRIVATE).

create or replace function public.get_pyq_years()
returns int[]
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce(
    array_agg(distinct pyq_year order by pyq_year desc),
    '{}'::int[]
  )
  from public.questions
  where pyq_year is not null;
$$;

comment on function public.get_pyq_years() is
  'Returns the descending-sorted distinct non-null pyq_year values visible to the caller. Bypasses the PostgREST row cap. RLS-safe (security invoker).';

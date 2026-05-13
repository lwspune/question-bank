-- Dashboard stats RPC.
--
-- Old client code did `.select(...)` then took `data.length`, which silently
-- truncated at PostgREST's implicit 1000-row cap. As soon as an org crossed
-- 1000 questions the dashboard showed 1,000 and the per-exam slices drifted
-- from reality.
--
-- This function uses real Postgres aggregates so the count is exact regardless
-- of row volume. `security invoker` means RLS still applies — admins see only
-- their own org. The `set search_path = ''` guard is the project's standard
-- defence against search_path-attack patterns flagged by Supabase advisor.

create or replace function public.get_dashboard_stats(p_org_id uuid)
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  select jsonb_build_object(
    'total_questions',
      (select count(*) from public.questions where org_id = p_org_id),
    'chapters_covered',
      (select count(distinct chapter_id) from public.questions where org_id = p_org_id),
    'by_exam',
      coalesce(
        (
          select jsonb_agg(
                   jsonb_build_object(
                     'exam_id',   e.id,
                     'exam_name', e.name,
                     'count',     c.cnt
                   )
                   order by c.cnt desc, e.name asc
                 )
          from (
            select exam_id, count(*) as cnt
            from public.questions
            where org_id = p_org_id
            group by exam_id
          ) c
          join public.exams e on e.id = c.exam_id
        ),
        '[]'::jsonb
      )
  )
$$;

comment on function public.get_dashboard_stats(uuid) is
  'Returns {total_questions, chapters_covered, by_exam} for the given org. Bypasses the PostgREST row cap by using SQL aggregates. RLS-safe (security invoker).';

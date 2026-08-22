-- get_dashboard_stats: SECURITY DEFINER + an explicit authorization guard.
--
-- WHY
-- ---
-- The function makes three full passes over `questions` (count, count-distinct
-- chapters, group-by-exam). Under RLS the read policy is
--     (visibility = 'PUBLIC') OR (org_id = private.current_user_org_id())
-- which the planner cannot satisfy from an index, so every pass degrades to a
-- Seq Scan of all 57,673 rows. Measured on prod 2026-08-22, the SAME SQL text
-- with only the calling role differing:
--     authenticated (RLS on)  -> 4,470 ms, Seq Scan
--     service_role  (RLS off) ->   165 ms, Index Only Scan (questions_filter_idx)
--
-- Against the `authenticated` role's 8s statement_timeout that was being
-- cancelled (SQLSTATE 57014) on roughly half of all /dashboard loads: over the
-- three days to 2026-08-22, pg_stat_statements recorded 21 successful calls
-- (mean 4,774 ms, max 7,763 ms — i.e. just under the cap, since a cancelled
-- statement is never recorded) against 21 logged 57014 cancellations.
--
-- RESULTS ARE UNCHANGED, and that is provable rather than hoped for: the query
-- already filters `where org_id = p_org_id`, and for a caller reading their own
-- org the policy's second arm (`org_id = current_user_org_id()`) is true for
-- every one of those rows. Bypassing RLS therefore returns the identical set.
--
-- SECURITY: this is a NET TIGHTENING, not a loosening.
-- Before this migration EXECUTE was granted to PUBLIC and anon, and the policy's
-- FIRST arm (`visibility = 'PUBLIC'`) meant any caller could pass ANY org's id
-- and read that org's public counts. Both holes close here:
--   * a JWT-bearing caller must be a member of p_org_id,
--   * anon/PUBLIC lose EXECUTE outright,
--   * service_role stays unrestricted — it already bypasses RLS everywhere by
--     design and is reachable only from server-side code (scripts, tests).

create or replace function public.get_dashboard_stats(p_org_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to ''
as $function$
declare
  v_uid uuid := auth.uid();
  v_result jsonb;
begin
  -- Re-assert the authorization RLS used to provide. A null uid means there is
  -- no JWT at all, which after the revokes below can only be service_role.
  if v_uid is not null and not exists (
    select 1
    from public.org_members m
    where m.user_id = v_uid
      and m.org_id = p_org_id
  ) then
    raise exception 'get_dashboard_stats: caller is not a member of org %', p_org_id
      using errcode = '42501';
  end if;

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
  into v_result;

  return v_result;
end
$function$;

revoke execute on function public.get_dashboard_stats(uuid) from public;
revoke execute on function public.get_dashboard_stats(uuid) from anon;
grant execute on function public.get_dashboard_stats(uuid) to authenticated;
grant execute on function public.get_dashboard_stats(uuid) to service_role;

comment on function public.get_dashboard_stats(uuid) is
  'Org question-count aggregate for /dashboard. SECURITY DEFINER so the three '
  'passes over questions can use questions_filter_idx instead of an RLS-forced '
  'Seq Scan (4,470ms -> 165ms, measured 2026-08-22). Authorization is asserted '
  'in-body: a JWT caller must be a member of p_org_id. anon has no EXECUTE.';

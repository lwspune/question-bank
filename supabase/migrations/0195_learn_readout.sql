-- 0195_learn_readout.sql -- the Learn experiment's numbers for /dashboard/growth.
--
-- Why: the Learn tab is an experiment (owner, 2026-10-27), checked 4 weeks after launch: keep
-- building learning inside PYQ Vault if 25 students master a concept and 10 come back to Learn on
-- a second day; otherwise keep building on Concept Ladder. Both numbers live in the Learn tables,
-- so they are counted here, in SQL (no 1000-row cap), for answers since the launch.
--
-- Students only: org members (staff) and platform admins are left out, as the growth snapshot
-- does. A "day" is an IST calendar day. Service role only (the growth page reads it as such).

create function public.learn_experiment_readout(p_since timestamptz) returns jsonb
language sql stable
security definer
set search_path = ''
as $$
  with a as (
    select la.user_id, la.created_at
    from public.learn_attempts la
    where la.created_at >= p_since
      and not exists (select 1 from public.org_members m where m.user_id = la.user_id)
      and not exists (select 1 from public.platform_admins p where p.user_id = la.user_id)
  ),
  days as (
    select user_id, count(distinct ((created_at at time zone 'Asia/Kolkata')::date)) as n
    from a group by user_id
  ),
  mastered as (
    select s.user_id, count(*) as n
    from public.learn_concept_state s
    where s.state = 'mastered' and s.user_id in (select user_id from days)
    group by s.user_id
  )
  select jsonb_build_object(
    'students', (select count(*) from days),
    'answers', (select count(*) from a),
    'mastered_one', (select count(*) from mastered),
    'concepts_mastered', (select coalesce(sum(n), 0) from mastered),
    'returned_second_day', (select count(*) from days where n >= 2)
  )
$$;

revoke execute on function public.learn_experiment_readout(timestamptz) from public, anon, authenticated;
grant execute on function public.learn_experiment_readout(timestamptz) to service_role;

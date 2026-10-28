-- 0202_learn_readout_visits.sql -- the Learn readout counts the steps before the first answer.
--
-- Why: on launch day (2026-10-28) the readout said 0 students had answered, and nothing could say
-- whether nobody came or students came and left before a question: Learn pages were not on the
-- header's reading beacon and a lesson begun was recorded nowhere. From 2026-10-28 the browser
-- records both as surface_viewed rows (lib/activity/views): surface 'learn' (any Learn page, with
-- its address, once per page per student per IST day) and 'learn_start' (the first move through a
-- lesson's slides, with the lesson's address). No new activity kind, so no CHECK change.
--
-- Adds three counts of distinct students, same rules as 0195 (students only, since p_since):
-- visited (any Learn page) -> opened_lesson (a /learn/lesson/ page) -> began_lesson. Read beside
-- `students` (answered), they say where students stop. The 0195 fields are unchanged.

create or replace function public.learn_experiment_readout(p_since timestamptz) returns jsonb
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
  ),
  views as (
    select ua.user_id, ua.metadata->>'surface' as surface, ua.metadata->>'path' as path
    from public.user_activity ua
    where ua.kind = 'surface_viewed'
      and ua.created_at >= p_since
      and ua.metadata->>'surface' in ('learn', 'learn_start')
      and not exists (select 1 from public.org_members m where m.user_id = ua.user_id)
      and not exists (select 1 from public.platform_admins p where p.user_id = ua.user_id)
  )
  select jsonb_build_object(
    'students', (select count(*) from days),
    'answers', (select count(*) from a),
    'mastered_one', (select count(*) from mastered),
    'concepts_mastered', (select coalesce(sum(n), 0) from mastered),
    'returned_second_day', (select count(*) from days where n >= 2),
    'visited', (select count(distinct user_id) from views where surface = 'learn'),
    'opened_lesson', (select count(distinct user_id) from views where surface = 'learn' and path like '/learn/lesson/%'),
    'began_lesson', (select count(distinct user_id) from views where surface = 'learn_start')
  )
$$;

revoke execute on function public.learn_experiment_readout(timestamptz) from public, anon, authenticated;
grant execute on function public.learn_experiment_readout(timestamptz) to service_role;

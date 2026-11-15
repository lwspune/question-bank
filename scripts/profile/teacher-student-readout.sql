-- "Are you a teacher or a student?" readout (experiment teacher-or-student,
-- migration 0258, src/lib/growth/registry.ts). Read-only; run each query on
-- production by hand at the check date. The question went live with the push
-- after 2026-11-15; answers before then are the 96 tutor-interest seeds.
--
-- 1. Answers since launch, by role (seeds excluded: they are dated earlier).
select user_role, count(*) as answers
from public.student_profiles
where user_role_at >= '2026-11-15'
group by 1
order by 1;

-- 2. Answer rate per box: accounts that saw the question in that box, and how
--    many of them have answered (in any box, since one answer stops them all).
with shown as (
  select distinct user_id, metadata->>'box' as box
  from public.user_activity
  where kind = 'surface_viewed' and metadata->>'surface' = 'role_question'
    and created_at >= '2026-11-15'
)
select s.box,
       count(*) as saw_it,
       count(*) filter (where p.user_role is not null) as answered,
       round(100.0 * count(*) filter (where p.user_role is not null) / nullif(count(*), 0), 0) as answered_pct,
       count(*) filter (where p.user_role = 'teacher') as teachers
from shown s
left join public.student_profiles p on p.user_id = s.user_id
group by 1
order by 2 desc;

-- 3. The behaviour rule against the answers: of the accounts the rule names
--    (answer keys downloaded, under 10 answers, no mock submitted, 40%+ of
--    activity Mon-Sat 9:00-15:59 IST), how many said Teacher? Keep the rule for
--    accounts that never answered only at TEACHER_RULE_PRECISION_PCT (70%) or more.
with staff as (
  select user_id from public.org_members union select user_id from public.platform_admins
),
answered as (
  select user_id, user_role from public.student_profiles
  where user_role is not null and user_id not in (select user_id from staff)
),
features as (
  select a.user_id, a.user_role,
    (select count(*) from public.export_events e where e.user_id = a.user_id and e.kind = 'key') as key_downloads,
    (select count(*) from public.user_activity u where u.user_id = a.user_id and u.kind = 'question_practiced') as answers,
    (select count(*) from public.user_activity u where u.user_id = a.user_id and u.kind = 'mock_submitted') as mocks,
    (select avg((extract(isodow from u.created_at at time zone 'Asia/Kolkata') between 1 and 6
                 and extract(hour from u.created_at at time zone 'Asia/Kolkata') between 9 and 15)::int)
       from public.user_activity u where u.user_id = a.user_id) as daytime_share
  from answered a
)
select
  (key_downloads > 0 and answers < 10 and mocks = 0 and coalesce(daytime_share, 0) >= 0.4) as rule_names_teacher,
  count(*) as accounts,
  count(*) filter (where user_role = 'teacher') as said_teacher,
  round(100.0 * count(*) filter (where user_role = 'teacher') / nullif(count(*), 0), 0) as said_teacher_pct
from features
group by 1
order by 1 desc;

-- partner-courses readout (src/lib/growth/registry.ts, migration 0269). Read-only.
-- Run in the Supabase SQL editor or via execute_sql.
--
-- Taps on the partner course cards on /store (trial from 2026-11-17).
-- A "student" is the account when signed in, else the browser (qb_vid cookie),
-- so a signed-out visitor who later signs in may count twice: a small
-- over-count, said here rather than hidden. Staff (org members, platform
-- admins) are left out. Bots never reach the table (the route skips them).
--
-- Rule: 30+ different students tapping a course in 6 weeks -> take it to
-- Defence Mania as a commission or coupon deal.

with staff as (
  select user_id from public.org_members
  union
  select user_id from public.platform_admins
),
taps as (
  select c.course_id,
         c.exam_slug,
         c.user_id,
         coalesce(c.user_id::text, 'v:' || c.visitor_id::text) as student,
         c.created_at
  from public.partner_course_clicks c
  where c.user_id is null or c.user_id not in (select user_id from staff)
)
-- 1. Per course: taps, different students, signed in vs out, first and last tap.
select course_id,
       exam_slug,
       count(*)                                         as taps,
       count(distinct student)                          as students,
       count(distinct user_id)                          as signed_in_students,
       count(distinct student) - count(distinct user_id) as signed_out_browsers,
       min(created_at)                                  as first_tap,
       max(created_at)                                  as last_tap
from taps
group by course_id, exam_slug
union all
-- 2. All courses together: the number the rule reads.
select 'ALL', null, count(*), count(distinct student), count(distinct user_id),
       count(distinct student) - count(distinct user_id), min(created_at), max(created_at)
from taps
order by 1;

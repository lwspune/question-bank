-- partner-courses readout (src/lib/growth/registry.ts, migration 0269). Read-only.
-- Run in the Supabase SQL editor or via execute_sql. Names and contacts of the
-- students who tapped: contacts.sql beside this file.
--
-- Taps on the partner course cards on /store (trial from 2026-11-23).
-- A "student" is the account when signed in, else the browser (qb_vid cookie).
-- A browser later seen signed in on a tap is counted as that account, so a
-- student who taps signed out, signs up and comes back counts once.
-- Staff (org members, platform admins) are left out. Bots never reach the
-- table (the route skips them), nor does the app's own background fetch.
--
-- SIGN-IN STEP (owner, 2026-11-27): from `sign_in_from`, a signed-out tap is
-- counted, then sent to sign up and back through the same link. Before it, a
-- signed-out tap went straight to the partner. If the change was pushed later
-- than 2026-11-27, move `sign_in_from` to the push day.
--
-- Rule: 30+ different students tapping a Defence Mania course in 6 weeks ->
-- take it to Defence Mania as a commission or coupon deal. LWS Pune's own SPI
-- course (spi-exam-lws) is read on its own row, never in that total. The
-- Defence Mania ids are the `provider: "Defence Mania"` rows of
-- src/lib/partnerCourses/courses.ts: add any new one to the list below.

with params as (
  select timestamptz '2026-11-27 00:00+05:30' as sign_in_from
),
staff as (
  select user_id from public.org_members
  union
  select user_id from public.platform_admins
),
-- The account each browser was seen with, if any (the earliest).
browser_account as (
  select distinct on (visitor_id) visitor_id, user_id
  from public.partner_course_clicks
  where user_id is not null
  order by visitor_id, created_at
),
taps as (
  select c.course_id,
         c.exam_slug,
         c.user_id,
         coalesce(c.user_id, b.user_id) as account,
         coalesce(c.user_id::text, b.user_id::text, 'v:' || c.visitor_id::text) as student,
         c.created_at,
         -- A signed-out tap after the sign-in step = sent to sign up.
         (c.user_id is null and c.created_at >= (select sign_in_from from params)) as asked_to_sign_in,
         -- ...and its browser later tapped signed in = they did.
         (c.user_id is null and c.created_at >= (select sign_in_from from params) and b.user_id is not null) as then_signed_in
  from public.partner_course_clicks c
  left join browser_account b on b.visitor_id = c.visitor_id
  where coalesce(c.user_id, b.user_id) is null
     or coalesce(c.user_id, b.user_id) not in (select user_id from staff)
),
per_course as (
  -- 1. Per course: taps, different students, how many have an account, first and last tap.
  select course_id,
         exam_slug,
         count(*)                                                     as taps,
         count(distinct student)                                      as students,
         count(distinct account)                                      as students_with_account,
         count(distinct student) - count(distinct account)            as signed_out_browsers,
         count(distinct student) filter (where asked_to_sign_in)      as asked_to_sign_in,
         count(distinct student) filter (where then_signed_in)        as then_signed_in,
         min(created_at)                                              as first_tap,
         max(created_at)                                              as last_tap
  from taps
  group by course_id, exam_slug
),
all_dm as (
  -- 2. Defence Mania's courses together: the number the rule reads.
  select 'ALL DEFENCE MANIA'::text, null::text, count(*), count(distinct student), count(distinct account),
         count(distinct student) - count(distinct account),
         count(distinct student) filter (where asked_to_sign_in),
         count(distinct student) filter (where then_signed_in),
         min(created_at), max(created_at)
  from taps
  where course_id in ('cds-sikandar-3', 'afcat-1-2027-crash')
)
select * from per_course
union all
select * from all_dm
order by 1;

-- partner-courses contacts (owner, 2026-11-27). Read-only. Run in the Supabase
-- SQL editor or via execute_sql.
--
-- Every student (staff left out) who tapped a course card with an account, or
-- from a browser later seen signed in: name, email, mobile (student_profiles;
-- empty when they never gave one), which courses, how many taps, last tap.
--
-- These details were given to PYQ Vault, not to the course's provider: do not
-- pass them to a partner without the student's agreement (/privacy).

with staff as (
  select user_id from public.org_members
  union
  select user_id from public.platform_admins
),
browser_account as (
  select distinct on (visitor_id) visitor_id, user_id
  from public.partner_course_clicks
  where user_id is not null
  order by visitor_id, created_at
),
taps as (
  select coalesce(c.user_id, b.user_id) as account, c.course_id, c.created_at
  from public.partner_course_clicks c
  left join browser_account b on b.visitor_id = c.visitor_id
  where coalesce(c.user_id, b.user_id) is not null
)
select coalesce(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name') as name,
       u.email,
       sp.mobile,
       string_agg(distinct t.course_id, ', ')               as courses,
       count(*)                                             as taps,
       max(t.created_at) at time zone 'Asia/Kolkata'        as last_tap_ist
from taps t
join auth.users u on u.id = t.account
left join public.student_profiles sp on sp.user_id = u.id
where t.account not in (select user_id from staff)
group by u.id, u.email, u.raw_user_meta_data, sp.mobile
order by max(t.created_at) desc;

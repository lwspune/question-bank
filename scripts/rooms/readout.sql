-- Exam rooms readout (experiment `exam-rooms`, migration 0289). Read-only.
-- Staff (platform admins and org members) left out throughout.
-- Run in the Supabase SQL editor or via the MCP; read against the rule in
-- src/lib/growth/registry.ts (EXAM_ROOMS_*).

-- 1. Joiners, messages, Ask V, reports, per room.
with staff as (
  select user_id from public.platform_admins
  union select user_id from public.org_members
)
select r.exam_slug,
       r.open,
       (select count(*) from public.exam_room_members m where m.exam_slug = r.exam_slug and m.user_id not in (select user_id from staff)) as members,
       (select count(*) from public.exam_room_messages x where x.exam_slug = r.exam_slug and x.author_kind = 'student' and x.user_id not in (select user_id from staff)) as student_messages,
       (select count(distinct (x.created_at at time zone 'Asia/Kolkata')::date) from public.exam_room_messages x where x.exam_slug = r.exam_slug and x.author_kind = 'student') as days_with_messages,
       (select count(*) from public.exam_room_messages x where x.exam_slug = r.exam_slug and x.author_kind = 'v') as ask_v,
       (select count(*) from public.exam_room_reports p join public.exam_room_messages x on x.id = p.message_id where x.exam_slug = r.exam_slug) as reports,
       (select count(*) from public.exam_room_messages x where x.exam_slug = r.exam_slug and x.hidden_at is not null) as hidden
  from public.exam_rooms r
 order by student_messages desc;

-- 2. Student messages a day in the 3 busiest rooms, since launch.
with staff as (
  select user_id from public.platform_admins
  union select user_id from public.org_members
),
per_room as (
  select exam_slug, count(*)::numeric as msgs
    from public.exam_room_messages
   where author_kind = 'student' and user_id not in (select user_id from staff)
   group by exam_slug
   order by msgs desc
   limit 3
)
select exam_slug,
       msgs,
       round(msgs / greatest(1, (current_date - date '2026-11-25')), 2) as per_day
  from per_room;

-- 3. Do joiners come back more? Joiners' active IST days in the 14 days after
--    joining, against students who were active on a joiner's join day but never
--    joined, over the 14 days after that same day. Only join days at least 14
--    days old are compared.
with staff as (
  select user_id from public.platform_admins
  union select user_id from public.org_members
),
joins as (
  select user_id, min(joined_at) as joined_at
    from public.exam_room_members
   where user_id not in (select user_id from staff)
   group by user_id
  having min(joined_at) < now() - interval '14 days'
),
days as (
  select distinct user_id, (created_at at time zone 'Asia/Kolkata')::date as d
    from public.user_activity
   where created_at >= date '2026-11-25'
),
joiner_days as (
  select j.user_id, count(distinct a.d) as active_days
    from joins j
    left join days a on a.user_id = j.user_id
     and a.d > (j.joined_at at time zone 'Asia/Kolkata')::date
     and a.d <= (j.joined_at at time zone 'Asia/Kolkata')::date + 14
   group by j.user_id
),
anchor as (
  select distinct (joined_at at time zone 'Asia/Kolkata')::date as d0 from joins
),
others as (
  select distinct a.user_id, an.d0
    from days a
    join anchor an on a.d = an.d0
   where a.user_id not in (select user_id from public.exam_room_members)
     and a.user_id not in (select user_id from staff)
),
other_days as (
  select o.user_id, o.d0, count(distinct a.d) as active_days
    from others o
    left join days a on a.user_id = o.user_id and a.d > o.d0 and a.d <= o.d0 + 14
   group by o.user_id, o.d0
)
select 'joiners' as grp, count(*) as students, round(avg(active_days), 2) as avg_return_days from joiner_days
union all
select 'matched non-joiners', count(*), round(avg(active_days), 2) from other_days;

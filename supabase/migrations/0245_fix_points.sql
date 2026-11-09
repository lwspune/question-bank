-- 0245_fix_points.sql
--
-- Fix Points (owner, 2026-11-09). A student earns one point for each mistake
-- they fix: a question they had missed BEFORE TODAY (IST) and now answered
-- right, graded by the server. Each point is 1% off a rupee pass, up to 40%;
-- only the last 30 days' points count and a purchase starts the count again.
-- Rules: src/lib/billing/fixPoints.ts; award + balance: fixPointsService.ts.
--
-- WHY A TABLE, not a count of user_activity 'answer_correct' rows: students
-- may INSERT their own user_activity rows (policy user_activity_insert_own), so
-- any count of that table is a number the student can write. That is fine for
-- drill scheduling and useless for money. This table has NO write grant to
-- anon/authenticated: only the service role inserts, at the moment the server
-- has graded a right answer (drill, mock, bank).
--
-- KNOWN, BOUNDED GAP: the "had missed it before" check still reads
-- user_activity, which a student can write. Forging a miss earns nothing by
-- itself: a point still needs a real, server-graded right answer, within the
-- daily answer and drill limits, and the discount stops at 40%.
--
-- ONE POINT PER QUESTION, EVER: the primary key. A question fixed, missed again
-- and fixed again does not pay twice; that is the anti-farming rule, and the
-- 30-day window makes old points lapse anyway.
--
-- source: where the fix was graded ('backfill' = the launch grant from the
-- graded fixes of the 30 days before launch).
create table public.fix_points (
  user_id      uuid        not null references auth.users (id) on delete cascade,
  question_id  uuid        not null references public.questions (id) on delete cascade,
  source       text        not null check (source in ('drill', 'mock', 'bank', 'board', 'daily', 'backfill')),
  earned_at    timestamptz not null default now(),
  primary key (user_id, question_id)
);

-- The balance read: one student's points since a date.
create index fix_points_user_earned_idx on public.fix_points (user_id, earned_at desc);

alter table public.fix_points enable row level security;
revoke all on public.fix_points from anon, authenticated;
grant select on public.fix_points to authenticated;

-- A student reads their own points (Review and the drill show them). No
-- insert, update or delete policy: writes are the service role's alone.
create policy fix_points_select_own on public.fix_points
  for select to authenticated
  using (user_id = (select auth.uid()));

-- The experiment's readout (scripts/growth/fix-points-readout.ts), for one
-- window. Measured from user_activity with the SAME rule the award uses (a
-- graded right answer, not a self-mark, on a question missed before that IST
-- day; once per student and question), so the 30 days before launch and the
-- 30 days after are counted by one instrument. Staff are left out. Service
-- role only: it reads across students.
create or replace function public.fix_points_readout(p_since timestamptz, p_until timestamptz)
returns table (
  active_students bigint,
  fixers bigint,
  fixes bigint,
  points_students bigint,
  sales bigint,
  sales_with_points bigint
)
language sql
stable
security invoker
set search_path = public
as $$
  with staff as (
    select user_id from public.org_members
    union select user_id from public.platform_admins
  ),
  act as (
    select distinct a.user_id
    from public.user_activity a
    where a.created_at >= p_since and a.created_at < p_until
      and a.kind in ('question_practiced', 'answer_wrong', 'answer_correct', 'mock_submitted')
      and a.user_id not in (select user_id from staff)
  ),
  fix as (
    select distinct c.user_id, c.ref_id
    from public.user_activity c
    where c.kind = 'answer_correct'
      and c.created_at >= p_since and c.created_at < p_until
      and c.metadata->>'selfMark' is null
      and c.user_id not in (select user_id from staff)
      and exists (
        select 1 from public.user_activity m
        where m.user_id = c.user_id and m.ref_id = c.ref_id
          and m.kind in ('answer_wrong', 'v_not_understood')
          and (m.created_at at time zone 'Asia/Kolkata')::date < (c.created_at at time zone 'Asia/Kolkata')::date
      )
  ),
  sold as (
    select e.note
    from public.entitlements e
    where e.source = 'razorpay' and e.created_at >= p_since and e.created_at < p_until
      and e.user_id not in (select user_id from staff)
  )
  select
    (select count(*) from act),
    (select count(distinct user_id) from fix),
    (select count(*) from fix),
    (select count(distinct user_id) from public.fix_points where earned_at >= p_since and earned_at < p_until and source <> 'backfill'),
    (select count(*) from sold),
    (select count(*) from sold where note like 'fix_points:%');
$$;

revoke all on function public.fix_points_readout(timestamptz, timestamptz) from public, anon, authenticated;
grant execute on function public.fix_points_readout(timestamptz, timestamptz) to service_role;

-- Growth experiment `chapter-fix` (lib/growth/registry.ts): "Fix N mistakes in
-- this chapter" on chapter pages (lib/drill/chapterFix.ts). READ-ONLY.
--
-- Run by hand (Supabase SQL editor or MCP execute_sql). Set the window in
-- `params`: the BASELINE was 30 days to 2026-11-07, live date 2026-11-07.
--
-- A chapter-day = a student practised a chapter (bank or board reveal) on an
-- IST day while holding OLDER unfixed mistakes there: a non-drill wrong answer
-- before that day with no correct answer after it, before that day.
-- Baseline, this query with from_day 2026-10-09 and to_day 2026-11-07 (staff
-- excluded): 529 chapter-days, 191 students, 160 FIXED an old mistake that
-- day (30%). No line shown, no chapter drill starts: neither existed yet.
--
-- The "older" rule leaves out mistakes made the same day: the bank's own
-- every-5th-wrong line covers those.

with params as (
  select date '2026-11-07' as from_day,  -- first IST day counted (inclusive)
         date '2026-11-28' as to_day     -- last IST day counted (inclusive)
),
staff as (select user_id from org_members union select user_id from platform_admins),
ev as (
  select a.user_id, a.kind, a.ref_id, a.created_at,
         coalesce(a.metadata->>'surface', 'mock') as surf,
         (a.created_at at time zone 'Asia/Kolkata')::date as d,
         q.chapter_id
  from user_activity a
  join questions q on q.id::text = a.ref_id
  where a.kind in ('answer_wrong', 'answer_correct', 'question_practiced')
    and a.created_at > (select from_day from params) - interval '60 days'
    and a.user_id not in (select user_id from staff)
),
sessions as (
  select distinct user_id, chapter_id, d from ev, params
  where kind = 'question_practiced' and surf in ('bank', 'board')
    and d between params.from_day and params.to_day
),
lastwrong as (
  select user_id, ref_id, chapter_id, max(created_at) as lw
  from ev where kind = 'answer_wrong' and surf <> 'drill' group by 1, 2, 3
),
openq as (
  select s.user_id, s.chapter_id, s.d, lw.ref_id
  from sessions s
  join lastwrong lw on lw.user_id = s.user_id and lw.chapter_id = s.chapter_id
  where lw.lw < (s.d::timestamp at time zone 'Asia/Kolkata')
    and not exists (
      select 1 from ev c
      where c.user_id = s.user_id and c.ref_id = lw.ref_id and c.kind = 'answer_correct'
        and c.created_at > lw.lw and c.created_at < (s.d::timestamp at time zone 'Asia/Kolkata'))
),
cd as (
  select user_id, chapter_id, d,
    bool_or(exists (select 1 from ev c where c.user_id = o.user_id and c.ref_id = o.ref_id
                    and c.kind = 'answer_correct' and c.d = o.d)) as fixed_same_day
  from openq o group by 1, 2, 3
),
views as (
  select metadata->>'from' as page, count(*) as shown, count(distinct user_id) as people
  from user_activity, params
  where kind = 'surface_viewed' and metadata->>'surface' = 'chapter_fix'
    and (created_at at time zone 'Asia/Kolkata')::date between params.from_day and params.to_day
    and user_id not in (select user_id from staff)
  group by 1
),
starts as (
  select metadata->>'from' as page, count(*) as started, count(distinct user_id) as people
  from user_activity, params
  where kind = 'drill_started' and metadata->>'from' in ('chapter', 'board_chapter', 'browse_chapter')
    and (created_at at time zone 'Asia/Kolkata')::date between params.from_day and params.to_day
    and user_id not in (select user_id from staff)
  group by 1
)
select 'chapter-days with older mistakes' as measure, count(*)::text as value from cd
union all select 'students', count(distinct user_id)::text from cd
union all select 'fixed one that day (keep at 40%+)',
  (count(*) filter (where fixed_same_day))::text || ' = '
  || coalesce(round(100.0 * count(*) filter (where fixed_same_day) / nullif(count(*), 0))::text, '-') || '%' from cd
union all select 'line shown on ' || page, shown::text || ' (' || people || ' students)' from views
union all select 'drill started from ' || page, started::text || ' (' || people || ' students)' from starts;

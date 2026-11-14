-- "Same mistake again" readout (growth registry "same-mistake", lib/questions/teachingMoment).
-- A moment = a bank miss on a question the student had missed before (Review later
-- does not count). For each: fixed = answered right on that question within 14 days
-- (any surface); left = no answer of any kind within 20 minutes.
--
-- Baseline (before the line existed), 2026-10-03 to 2026-10-31:
--   151 moments, 61 students, fixed 22.5%, left 12.6%.
-- Read it after launch with FROM = 2026-11-15 and TO = 14 days before today, so
-- every moment has its full 14 days. Also counts how many got the line shown.
with w as (
  select ua.user_id, ua.ref_id, ua.created_at at
  from user_activity ua
  where ua.kind = 'question_practiced' and ua.metadata->>'surface' = 'bank' and ua.metadata->>'correct' = 'false'
    and not (ua.metadata ? 'selfMark')
    and ua.created_at >= '2026-11-15' and ua.created_at < '2026-12-13'   -- FROM, TO
),
m as (
  select w.* from w
  where exists (
    select 1 from user_activity p
    where p.user_id = w.user_id and p.ref_id = w.ref_id and p.kind = 'answer_wrong'
      and not (p.metadata ? 'selfMark') and p.created_at < w.at - interval '2 seconds'
  )
)
select
  count(*) as moments,
  count(distinct user_id) as students,
  count(*) filter (where exists (
    select 1 from user_activity s
    where s.user_id = m.user_id and s.kind = 'surface_viewed' and s.metadata->>'surface' = 'teaching_moment'
      and s.metadata->>'moment' = 'same_mistake' and s.metadata->>'questionId' = m.ref_id
      and s.created_at between m.at - interval '1 minute' and m.at + interval '10 minutes'
  )) as line_shown,
  round(100.0 * avg((exists (
    select 1 from user_activity f
    where f.user_id = m.user_id and f.ref_id = m.ref_id and f.created_at > m.at and f.created_at <= m.at + interval '14 days'
      and ((f.kind = 'question_practiced' and f.metadata->>'correct' = 'true') or f.kind = 'answer_correct')
  ))::int), 1) as fixed_14d_pct,
  round(100.0 * avg((not exists (
    select 1 from user_activity g
    where g.user_id = m.user_id and g.created_at > m.at + interval '2 seconds' and g.created_at <= m.at + interval '20 minutes'
      and g.kind in ('question_practiced', 'answer_correct', 'answer_wrong')
  ))::int), 1) as left_20m_pct
from m;

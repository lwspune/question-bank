-- Notes drill panel readout (growth registry "notes-drill-panel", lib/notes/drillPanel).
-- A notes drill link ("Drill N more on <concept>", "Drill all N questions") opens its
-- questions in a panel on the notes page since 2026-11-15. Signed-in students only.
--
-- Steps are counted once per student, link, topic and day (the event's dedupe key),
-- so "opens" is student-topic-days, not taps.
-- answered = a bank answer (question_practiced, surface bank: the panel's cards are
-- /browse's own) within 30 minutes of the open. That counts an answer given on
-- /browse after "Open in the bank" too, so read it beside full_page.
-- No before number: nothing recorded a tap on these links before.
with opens as (
  select ua.user_id, ua.created_at at, ua.metadata->>'link' link, ua.metadata->>'subtopic' subtopic
  from user_activity ua
  where ua.kind = 'surface_viewed' and ua.metadata->>'surface' = 'notes_drill'
    and ua.metadata->>'action' = 'open'
    and ua.created_at >= '2026-11-15' and ua.created_at < '2026-12-13'   -- FROM, TO
),
steps as (
  select ua.metadata->>'link' link, ua.metadata->>'action' action, count(*) n
  from user_activity ua
  where ua.kind = 'surface_viewed' and ua.metadata->>'surface' = 'notes_drill'
    and ua.created_at >= '2026-11-15' and ua.created_at < '2026-12-13'   -- FROM, TO
  group by 1, 2
)
select
  o.link,
  count(*) as opens,
  count(distinct o.user_id) as students,
  round(100.0 * count(*) filter (where exists (
    select 1 from user_activity p
    where p.user_id = o.user_id and p.kind = 'question_practiced'
      and coalesce(p.metadata->>'surface', 'bank') = 'bank'
      and p.created_at between o.at and o.at + interval '30 minutes'
  )) / nullif(count(*), 0), 1) as answered_pct,
  (select n from steps s where s.link = o.link and s.action = 'more') as more,
  (select n from steps s where s.link = o.link and s.action = 'close') as closes,
  (select n from steps s where s.link = o.link and s.action = 'full_page') as full_page
from opens o
group by o.link
order by o.link;

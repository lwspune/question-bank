-- Growth experiment "v-learn-first" (2026-11-22): V teaches a chapter from Learn's
-- lessons wherever Learn teaches it. Second change the same day (owner): the map is
-- the whole reply, and tapping a lesson plays Learn's own lesson full screen over V.
-- Run read-only against production on the check date (28 days after the deploy).
-- Set the deploy date below. Staff are left out. No names or emails.
--
-- Keep rule (lib/growth/registry.ts V_LEARN_FIRST_OPEN_KEEP_PCT): Learn stays first
-- if 30%+ of the Learn maps V shows lead to a lesson opened from the map.
-- Events are one per student, place and India day (lib/activity/clientEvents.ts),
-- so every share below is of student-days.
--   teach_chapter lesson_learn  shown: a Learn map in V;  tap: a lesson opened from it
--   learn_start: a lesson begun (its first move), any page or V
--   stuck_offer learn_open / learn_close: the stuck offer's Teach me the idea opened / closed a lesson
--   lesson_notes tap: Open the notes, on a notes lesson (the comparison)

with params as (
  select timestamptz '2026-11-22 00:00+05:30' as live_from,   -- set to the deploy day (India midnight)
         timestamptz '2026-12-20 00:00+05:30' as live_to
),
staff as (select user_id from public.org_members union select user_id from public.platform_admins),
steps as (
  select a.user_id, (a.created_at at time zone 'Asia/Kolkata')::date as day,
         a.metadata->>'surface' as surface, a.metadata->>'from' as place, a.metadata->>'action' as action
  from public.user_activity a, params p
  where a.kind = 'surface_viewed'
    and a.metadata->>'surface' in ('teach_chapter', 'learn_start', 'stuck_offer')
    and a.created_at >= p.live_from and a.created_at < p.live_to
    and a.user_id not in (select user_id from staff)
),
shown as (select distinct user_id, day from steps where surface = 'teach_chapter' and place = 'lesson_learn' and action = 'shown'),
opened as (select distinct user_id, day from steps where surface = 'teach_chapter' and place = 'lesson_learn' and action = 'tap'),
begun as (select distinct user_id, day from steps where surface = 'learn_start')
select
  (select count(*) from shown) as learn_maps_shown,
  (select count(distinct user_id) from shown) as students,
  (select count(*) from shown s where exists (select 1 from opened o where o.user_id = s.user_id and o.day = s.day)) as opened_a_lesson,
  round(100.0 * (select count(*) from shown s where exists (select 1 from opened o where o.user_id = s.user_id and o.day = s.day))
        / nullif((select count(*) from shown), 0), 1) as opened_pct,
  (select count(*) from opened o where exists (select 1 from begun b where b.user_id = o.user_id and b.day = o.day)) as opened_and_begun,
  (select count(*) from (select distinct user_id, day from steps where surface = 'stuck_offer' and action = 'learn_open') x) as stuck_offer_lessons_opened,
  (select count(*) from (select distinct user_id, day from steps where surface = 'teach_chapter' and place = 'lesson_notes' and action = 'tap') n) as opened_notes_any_lesson;

-- Where lessons lose students (learn_visit, migration 0288, from its deploy on).
-- One line per place (page | v): visits, and of those NOT answered (no Learn
-- answer for that lesson by that student the same India day), how many reached
-- the questions slide, how many stopped earlier, and the median slide left
-- from and seconds on it. Each visit's LAST row is the visit (a visit sends again
-- as it gets further). Visits that opened at the questions (start = slides: a
-- student who answered before) are left out: they never saw the slides.
with params as (
  select timestamptz '2026-11-25 00:00+05:30' as live_from,   -- set to learn_visit's deploy day
         timestamptz '2026-12-20 00:00+05:30' as live_to
),
staff as (select user_id from public.org_members union select user_id from public.platform_admins),
visits as (
  select distinct on (a.user_id, a.metadata->>'visit')
         a.user_id, (a.created_at at time zone 'Asia/Kolkata')::date as day,
         a.metadata->>'path' as path, a.metadata->>'place' as place,
         (a.metadata->>'slides')::int as slides, (a.metadata->>'start')::int as start,
         (a.metadata->>'furthest')::int as furthest, (a.metadata->>'left')::int as left_at,
         (a.metadata->>'leftSeconds')::int as left_seconds, (a.metadata->>'seconds')::int as seconds,
         (a.metadata->>'questions')::boolean as questions
  from public.user_activity a, params p
  where a.kind = 'learn_visit'
    and a.created_at >= p.live_from and a.created_at < p.live_to
    and a.user_id not in (select user_id from staff)
  order by a.user_id, a.metadata->>'visit', a.created_at desc
),
answered as (
  select distinct la.user_id, (la.created_at at time zone 'Asia/Kolkata')::date as day,
         '/learn/lesson/' || ch.slug || '/' || c.slug as path
  from public.learn_attempts la
  join public.learn_items i on i.id = la.item_id
  join public.learn_concepts c on c.id = i.concept_id
  join public.learn_chapters ch on ch.id = c.chapter_id, params p
  where la.created_at >= p.live_from and la.created_at < p.live_to
),
unanswered as (
  select v.* from visits v
  where v.start < v.slides
    and not exists (select 1 from answered x where x.user_id = v.user_id and x.day = v.day and x.path = v.path)
)
select v.place,
  count(*) as visits,
  (select count(*) from unanswered u where u.place = v.place) as unanswered,
  (select count(*) from unanswered u where u.place = v.place and u.questions) as unanswered_reached_questions,
  (select count(*) from unanswered u where u.place = v.place and not u.questions) as unanswered_stopped_in_slides,
  (select percentile_cont(0.5) within group (order by u.left_at::float / u.slides) from unanswered u where u.place = v.place and not u.questions) as median_share_of_slides_seen,
  (select percentile_cont(0.5) within group (order by u.left_seconds) from unanswered u where u.place = v.place and not u.questions) as median_seconds_on_last_slide,
  (select percentile_cont(0.5) within group (order by u.seconds) from unanswered u where u.place = v.place) as median_seconds_in_lesson
from visits v
where v.start < v.slides
group by v.place;

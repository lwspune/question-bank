-- Growth experiment "v-teach-chapter" (2026-11-21): the "Teach me" buttons that
-- open V on a chapter, starting from the student's waiting mistakes.
-- Run read-only against production on the check date (28 days after the
-- deploy). Set the deploy date below. Staff are left out. No names or emails.
--
-- Keep rule (lib/growth/registry.ts): a place stays if 10%+ of the students
-- shown its button tap it; the idea stays if 30%+ of the chapters taught from a
-- tap get a second message from the student in that chat.
-- Baseline: the stuck offer's Teach me the idea, 32 taps on 174 offers (18%).
-- From the lesson update (2026-11-21) the lesson's buttons send messages too
-- (place lesson_go_on / lesson_simpler / lesson_notes): read the typed second
-- message row beside the any-message row before applying the 30% bar.

with params as (
  select timestamptz '2026-11-21 00:00+05:30' as live_from,   -- set to the deploy day (India midnight)
         timestamptz '2026-12-19 00:00+05:30' as live_to
),
staff as (select user_id from public.org_members union select user_id from public.platform_admins),
steps as (
  select a.user_id, a.metadata->>'from' as place, a.metadata->>'action' as action
  from public.user_activity a, params p
  where a.kind = 'surface_viewed'
    and a.metadata->>'surface' = 'teach_chapter'
    and a.created_at >= p.live_from and a.created_at < p.live_to
    and a.user_id not in (select user_id from staff)
),
-- v_pick is the second step of v_button (a chapter picked from V's list), so it
-- is reported as its own row and never as a place of its own.
per_place as (
  select place,
         count(distinct user_id) filter (where action = 'shown') as students_shown,
         count(distinct user_id) filter (where action = 'tap') as students_tapped
  from steps
  group by place
),
taught as (
  select c.id, c.user_id, c.conversation_id, c.created_at
  from public.chat_interactions c, params p
  where c.message like 'Teach me %'
    -- The lesson's Go on button sends "Teach me part N of ..." (2026-11-21): a step, not a new chat.
    and c.message not like 'Teach me part %'
    -- A Learn lesson's Go on says "lesson" (2026-11-22).
    and c.message not like 'Teach me lesson %'
    and c.created_at >= p.live_from and c.created_at < p.live_to
    and c.user_id not in (select user_id from staff)
),
went_on as (
  select t.id,
         exists (
           select 1 from public.chat_interactions n
           where n.user_id = t.user_id
             and n.conversation_id = t.conversation_id
             and n.created_at > t.created_at
             and n.message is not null
         ) as second_message,
         -- Typed by the student, not sent by a lesson button (Go on, Explain more simply).
         exists (
           select 1 from public.chat_interactions n
           where n.user_id = t.user_id
             and n.conversation_id = t.conversation_id
             and n.created_at > t.created_at
             and n.message is not null
             and n.message not like 'Teach me part %'
             and n.message not like 'Explain part % more simply.'
             and n.message not like 'Teach me lesson %'
             and n.message not like 'Explain lesson % more simply.'
         ) as second_typed
  from taught t
)
select 'place' as kind, place as label, students_shown, students_tapped,
       round(100.0 * students_tapped / nullif(students_shown, 0), 1) as tap_pct
from per_place
union all
select 'taught', 'chats opened by Teach me', count(*), count(*) filter (where second_message),
       round(100.0 * count(*) filter (where second_message) / nullif(count(*), 0), 1)
from went_on
union all
select 'taught', 'chats opened by Teach me: a typed second message', count(*), count(*) filter (where second_typed),
       round(100.0 * count(*) filter (where second_typed) / nullif(count(*), 0), 1)
from went_on
order by kind, label;

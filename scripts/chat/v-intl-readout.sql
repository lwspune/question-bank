-- "v-intl" readout (src/lib/growth/registry.ts): V on intl.pyqvault.com, live 2026-11-19.
-- Chat rows keep the page, not the host, and shared pages (/browse, /drill) look the same on
-- both sites, so an international student is one whose profile names an intl exam.
-- Keep rule: 10+ askers and 3+ who come back on a second day (V_INTL_*_KEEP).
with intl_students as (
  select user_id
  from student_profiles
  where target_exams && array['imat', 'enem']
),
asks as (
  select c.user_id, c.created_at, c.event_type
  from chat_interactions c
  join intl_students s on s.user_id = c.user_id
  where c.created_at >= '2026-11-19'
)
select
  (select count(*) from intl_students) as intl_students,
  count(distinct user_id) filter (where event_type = 'typed_question') as askers,
  count(*) filter (where event_type = 'typed_question') as questions,
  (
    select count(*) from (
      select user_id
      from asks
      where event_type = 'typed_question'
      group by user_id
      having count(distinct (created_at at time zone 'Asia/Kolkata')::date) >= 2
    ) r
  ) as came_back_on_a_second_day,
  count(*) filter (where event_type = 'hourly_limit') as hourly_limit_hits
from asks;

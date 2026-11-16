-- play-games readout (src/lib/growth/registry.ts, migration 0267). Read-only.
-- Run in the Supabase SQL editor or via execute_sql. Staff left out.
--
-- 1. Players: signed-in students with a /play round, rounds each, levels cleared,
--    and how many played on 2+ days.
-- 2. Study before vs after: per player, IST days with study (mocks, bank
--    answers, drill, notes checkpoints) in the 7 days BEFORE the first round and
--    the 7 days AFTER it (the first round's day counts as after). Only players
--    whose 7 days after have fully passed are compared.
--
-- A player vs non-player comparison is deliberately NOT the readout: students
-- who try a new button are already the more active ones, so that gap would be
-- selection, not the game.

with staff as (
  select user_id from public.org_members
),
rounds as (
  select a.user_id, a.created_at,
         (a.created_at at time zone 'Asia/Kolkata')::date as ist_day,
         (a.metadata->>'level')::int as level,
         (a.metadata->>'cleared')::boolean as cleared
  from public.user_activity a
  where a.kind = 'play_round'
    and a.user_id not in (select user_id from staff)
),
players as (
  select user_id,
         min(created_at) as first_round,
         count(*) as rounds,
         count(distinct ist_day) as play_days,
         count(distinct level) filter (where cleared) as levels_cleared,
         max(level) as top_level
  from rounds
  group by user_id
),
study as (
  select a.user_id, (a.created_at at time zone 'Asia/Kolkata')::date as ist_day, a.created_at
  from public.user_activity a
  join players p on p.user_id = a.user_id
  where a.kind in ('mock_submitted', 'question_practiced', 'drill_started', 'drill_completed', 'note_checkpoint')
),
per_player as (
  select p.user_id, p.rounds, p.play_days, p.levels_cleared, p.top_level,
         count(distinct s.ist_day) filter (
           where s.created_at >= p.first_round - interval '7 days' and s.created_at < date_trunc('day', p.first_round at time zone 'Asia/Kolkata') at time zone 'Asia/Kolkata'
         ) as study_days_before,
         count(distinct s.ist_day) filter (
           where s.created_at >= date_trunc('day', p.first_round at time zone 'Asia/Kolkata') at time zone 'Asia/Kolkata'
             and s.created_at < p.first_round + interval '7 days'
         ) as study_days_after,
         (p.first_round + interval '7 days' <= now()) as week_after_done
  from players p
  left join study s on s.user_id = p.user_id
  group by p.user_id, p.rounds, p.play_days, p.levels_cleared, p.top_level, p.first_round
)
select
  count(*)                                                     as players,
  sum(rounds)                                                  as rounds,
  round(avg(rounds), 1)                                        as rounds_per_player,
  count(*) filter (where play_days >= 2)                       as played_2plus_days,
  round(100.0 * count(*) filter (where play_days >= 2) / nullif(count(*), 0), 0) as pct_2plus_days,
  round(avg(levels_cleared), 1)                                as avg_levels_cleared,
  count(*) filter (where week_after_done)                      as compared,
  percentile_cont(0.5) within group (order by study_days_before) filter (where week_after_done) as median_study_days_before,
  percentile_cont(0.5) within group (order by study_days_after)  filter (where week_after_done) as median_study_days_after,
  count(*) filter (where week_after_done and study_days_after > study_days_before) as studied_more,
  count(*) filter (where week_after_done and study_days_after < study_days_before) as studied_less
from per_player;

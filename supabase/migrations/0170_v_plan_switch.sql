-- 0170_v_plan_switch.sql
--
-- V's week plan (2026-10-19, study-partner Phase 3; study_plans, 0169): the
-- owner asked for a switch, as for explanations (0168), so plans can be
-- turned on and off at /dashboard/chat without a deploy.
--
-- Its own column: a plan writes rows for the student and reads their
-- activity, a different cost and risk from typed answers or explanations.
-- Default false, so the feature ships dark.
--
-- APPLY BEFORE THE CODE THAT READS IT DEPLOYS: readChatSettings selects this
-- column, and a failed read falls back to the defaults, which switch V's AI
-- off for everyone.

alter table public.chat_settings
  add column if not exists plan_enabled boolean not null default false;

comment on column public.chat_settings.plan_enabled is
  'V plans the week: plan_week and my_plan, and the plan card inside V (0170).';

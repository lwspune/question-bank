-- 0168_v_explain_switch.sql
--
-- "Ask V about this question" (2026-10-19, study-partner Phase 1): V explains
-- the question a student is looking at, from the question's own stored
-- solution and key, and each explanation counts as one of the day's free
-- answers. The owner asked for a switch to turn it off without a deploy.
--
-- Its own column rather than riding on ai_enabled: typed questions and
-- explanations are different costs and different risks (an explanation quotes
-- the answer), so one can be off while the other is on. Default false, so the
-- feature ships dark and nothing changes until it is switched on at
-- /dashboard/chat.
--
-- APPLY BEFORE THE CODE THAT READS IT DEPLOYS: readChatSettings selects this
-- column, and a failed read falls back to the defaults, which switch V's AI
-- off for everyone.

alter table public.chat_settings
  add column if not exists explain_enabled boolean not null default false;

comment on column public.chat_settings.explain_enabled is
  'Ask V about this question: explanations from the stored solution, each one a free answer (0168).';

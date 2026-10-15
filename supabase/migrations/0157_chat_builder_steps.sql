-- 0157_chat_builder_steps.sql
--
-- V's practice-test builder (2026-10-15, migration 0156) is counted in the
-- same table as V's other taps, so /dashboard/chat reads one funnel: opened
-- the builder, asked to sign in, built a test, started it, downloaded it.
--
-- A new event_type 'builder_step' whose question_id carries the step. The
-- step list lives in code (src/lib/chat/builderSteps.ts), like the FAQ ids,
-- and the route refuses any other value; the database only checks the shape.

alter table public.chat_interactions
  drop constraint chat_interactions_event_type_check,
  add constraint chat_interactions_event_type_check
    check (event_type in ('launcher_open', 'faq_click', 'typed_question', 'builder_step'));

alter table public.chat_interactions
  drop constraint chat_interactions_question_matches_type,
  add constraint chat_interactions_question_matches_type check (
    (event_type = 'launcher_open' and question_id is null and message is null)
    or (event_type = 'faq_click' and question_id is not null and message is null)
    or (event_type = 'typed_question' and question_id is null and message is not null)
    or (event_type = 'builder_step' and question_id is not null and message is null)
  );

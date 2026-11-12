-- 0252_v_step_by_step.sql
--
-- "Teach me step by step" (V_SPEC.md section 0, step 1; owner 2026-11-12).
-- Under V's explanation of a bank question, the stored solution is shown one
-- step at a time, with "Got it, next step" and "Lost me here" between steps.
-- No AI call per step, so nothing else records it: each tap is counted here,
-- in the same table as V's other taps, so the funnel (started, steps passed,
-- lost at which step, reached the end) reads beside V's replies.
--
-- A new event_type 'step_by_step':
--   asked_question_id  the question whose solution was stepped through
--                      (the column V's Ask V taps already use; until now only
--                      a typed question could carry it);
--   question_id        the action and the 1-based step, "<action>:<step>"
--                      (open, next, lost, done). The action list lives in code
--                      (src/lib/chat/stepByStep.ts), like the builder's steps,
--                      and the route refuses any other value; the database
--                      checks only the shape;
--   message            none: "Lost me here" also sends V a message, recorded
--                      as an ordinary typed question.
--
-- Why not user_activity: these are V's own taps and are read beside V's
-- replies (/dashboard/chat, the v_followups readouts). A "Lost me here" that
-- should reach Fix your mistakes is ALSO written to user_activity as a
-- v_not_understood row by the route, like a No.
--
-- Additive: two constraints widened, one added. Nothing existing changes shape.

alter table public.chat_interactions
  drop constraint chat_interactions_event_type_check,
  add constraint chat_interactions_event_type_check
    check (event_type in ('launcher_open', 'faq_click', 'typed_question', 'builder_step', 'v_followup', 'hourly_limit', 'step_by_step'));

alter table public.chat_interactions
  drop constraint chat_interactions_question_matches_type,
  add constraint chat_interactions_question_matches_type check (
    (event_type = 'launcher_open' and question_id is null and message is null)
    or (event_type = 'faq_click' and question_id is not null and message is null)
    or (event_type = 'typed_question' and question_id is null and message is not null)
    or (event_type = 'builder_step' and question_id is not null and message is null)
    or (event_type = 'v_followup' and question_id is null and message is not null)
    or (event_type = 'hourly_limit' and question_id is null and message is not null)
    or (event_type = 'step_by_step' and question_id is not null and message is null)
  );

alter table public.chat_interactions
  drop constraint chat_interactions_asked_question_typed,
  add constraint chat_interactions_asked_question_typed
    check (asked_question_id is null or event_type in ('typed_question', 'step_by_step'));

-- A step event always names its question.
alter table public.chat_interactions
  add constraint chat_interactions_step_shape
    check (event_type <> 'step_by_step' or asked_question_id is not null);

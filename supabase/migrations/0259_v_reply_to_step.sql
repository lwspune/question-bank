-- 0259_v_reply_to_step.sql
--
-- Step chips under V's explanation (owner, 2026-11-15; replaced "Teach me step
-- by step"). An explanation with numbered steps is shown as a bubble per step;
-- tapping a step offers Explain and Reply. Reply quotes that ONE step above the
-- student's message, and V is told only that step.
--
-- reply_to_step: the 1-based step of the replied-to message's explanation, so
-- a rebuilt chat (another device, /dashboard/chat) quotes "Step 2: ..." rather
-- than the reply's first line, and Replies on a step can be counted. Which
-- step text it names is re-derived from the stored reply by the same splitter
-- (src/lib/chat/stepChips.ts replyParts), never stored twice.
--
-- Deliberately NO check that reply_to_id is set: reply_to_id is ON DELETE SET
-- NULL (0174), and such a check would make deleting the replied-to row fail.
-- A step left without its message is simply never quoted.
--
-- The taps themselves (tapped a step, Explain, Reply) reuse event_type
-- 'step_by_step' from 0252, coded "<action>:<step>" in question_id; that
-- migration checks only the shape, so new actions need no change here.

alter table public.chat_interactions
  add column reply_to_step smallint
    constraint chat_interactions_reply_to_step_range check (reply_to_step between 1 and 12);

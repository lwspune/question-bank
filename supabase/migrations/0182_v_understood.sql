-- 0182_v_understood.sql
--
-- "Did you understand?" with Yes and No under V's explanations (owner,
-- 2026-10-23), in place of the thumbs there.
--
-- The thumbs (0159) were almost never used: 1 thumbs in the first 172 AI
-- replies, and the owner found nothing to read from them. One plain question
-- under an explanation is answered more often and says what matters: did the
-- explanation work. A No also sends "I didn't understand. Please explain it
-- more simply." for the student (lib/chat/understood.ts), so V explains again
-- and asks again; the share of No turned into Yes is the measure.
--
-- understood is the answer on the reply it was asked under, understood_at
-- when it was given. Only an AI reply can carry one (the fixed reply, a
-- button's answer and a late answer explain nothing), and the two columns are
-- set together. Which replies ask it is decided from the reply's own tool
-- calls (explain_question, explain_concept), not stored.

alter table public.chat_interactions
  add column understood boolean,
  add column understood_at timestamptz,
  add constraint chat_interactions_understood_ai_only check (
    understood is null or coalesce(reply_source, '') = 'ai'
  ),
  add constraint chat_interactions_understood_at_pair check ((understood is null) = (understood_at is null));

comment on column public.chat_interactions.understood is
  'The student''s answer to "Did you understand?" under this explanation; null = not answered. Migration 0182.';

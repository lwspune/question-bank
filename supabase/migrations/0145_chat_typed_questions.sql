-- 0145_chat_typed_questions.sql
--
-- V records what students TYPE (2026-10-09).
--
-- WHY. V answers six fixed questions and has no AI. Before paying for a model
-- to answer free text, the owner wants to see whether students type questions
-- at all, and what they ask. So V gets a typing box that answers with a fixed
-- "thanks, we'll get back to you" line and stores the question here.
--
-- WHAT IS STORED. A new event_type 'typed_question' carrying `message`, the
-- typed text, at most 500 characters (V's existing CHAT_MESSAGE_MAX). Phone
-- numbers and email addresses are masked by the route before insert
-- (src/lib/chat/maskPersonal.ts). Kept indefinitely (owner's call); /privacy
-- says V saves typed questions.
--
-- ACCESS is unchanged from 0127: RLS on with zero policies, so only the
-- service-role route writes and only /dashboard/chat (superadmin) reads.
--
-- SAFE. Existing rows are launcher_open / faq_click with no message, which the
-- new constraints accept as they stand.

ALTER TABLE public.chat_interactions
  ADD COLUMN message text CHECK (message IS NULL OR length(btrim(message)) BETWEEN 1 AND 500);

ALTER TABLE public.chat_interactions
  DROP CONSTRAINT chat_interactions_event_type_check,
  ADD CONSTRAINT chat_interactions_event_type_check
    CHECK (event_type IN ('launcher_open', 'faq_click', 'typed_question'));

-- An open names nothing; a click names a question; a typed question carries
-- its text and no question id.
ALTER TABLE public.chat_interactions
  DROP CONSTRAINT chat_interactions_question_matches_type,
  ADD CONSTRAINT chat_interactions_question_matches_type CHECK (
    (event_type = 'launcher_open' AND question_id IS NULL AND message IS NULL)
    OR (event_type = 'faq_click' AND question_id IS NOT NULL AND message IS NULL)
    OR (event_type = 'typed_question' AND question_id IS NULL AND message IS NOT NULL)
  );

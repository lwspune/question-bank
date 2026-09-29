-- 0127_chat_interactions.sql
--
-- A row per interaction with V, the floating FAQ widget: one when the launcher
-- is opened (once per page mount), one per predefined-question chip clicked.
--
-- WHY: V ships as a chip-only FAQ with no LLM call, precisely to find out
-- whether anyone uses it before paying for an Anthropic key. The same two
-- moments already ping Vercel Web Analytics (chat_launcher_click,
-- chat_faq_click), but that data lives only in Vercel's dashboard. This table
-- puts the answer inside /dashboard/chat, and pairs opens with clicks so
-- "opened but asked nothing" is readable too.
--
-- WHY A TABLE AND NOT A user_activity KIND: the rule 0104 and 0109 were
-- written under. user_activity is a closed, learning-anchored allowlist; asking
-- V where the notes are is not a learning act, and filing it there would put it
-- into the per-feature retention-lift reads as though it were.
--
-- READ COUNTS AS A FLOOR: the writes are fired from the browser, so a request
-- blocked or dropped in transit leaves no row.
--
-- user_id is NULLABLE with ON DELETE SET NULL, matching share_events: most
-- visitors are anonymous, and deleting an account must not revise past volume.
-- question_id is free text on purpose — the predefined set lives in code
-- (lib/chat/faq.ts) and can change; a retired id still reads back by its slug.

CREATE TABLE public.chat_interactions (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type   text        NOT NULL CHECK (event_type IN ('launcher_open', 'faq_click')),
  question_id  text        CHECK (question_id IS NULL OR length(question_id) BETWEEN 1 AND 64),
  created_at   timestamptz NOT NULL DEFAULT now(),
  -- An open never names a question; a click always does.
  CONSTRAINT chat_interactions_question_matches_type CHECK (
    (event_type = 'launcher_open' AND question_id IS NULL)
    OR (event_type = 'faq_click' AND question_id IS NOT NULL)
  )
);

CREATE INDEX chat_interactions_created_idx ON public.chat_interactions (created_at DESC);
CREATE INDEX chat_interactions_type_idx ON public.chat_interactions (event_type, created_at DESC);

-- RLS on, ZERO policies — same posture as share_events (0109), export_events
-- (0104) and rate_limits (0011). Writes go through /api/chat/* on the
-- service-role client; only /dashboard/chat (superadmin) reads it back.
ALTER TABLE public.chat_interactions ENABLE ROW LEVEL SECURITY;

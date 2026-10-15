-- 0159_v_conversations.sql
--
-- V keeps whole conversations (2026-10-15).
--
-- WHY. 0158 stores each typed question with V's reply, but as loose rows: a
-- follow-up like "give me other chapter of phy" cannot be read next to the
-- "NEET PYQ" before it, and V itself answered every message cold. The owner
-- wants the conversations kept for analysis and for future training data, and
-- wants V to remember the conversation.
--
-- 1. conversation_id (uuid, made by the chat window and kept on the device)
--    groups a conversation's rows: opens, button taps, typed questions and
--    builder steps. V's memory is read back by it (the last two exchanges),
--    from THIS table rather than from the device, so a student cannot plant an
--    earlier reply V never gave. Rows before 0159 have none.
-- 2. page_path: the page the student was on ("Q9" alone means nothing).
--    A path only: starts with "/", no query string, at most 300 characters.
-- 3. A button tap now stores its templated answer (reply_source 'template'),
--    so a transcript reads complete.
-- 4. reply_links: the paths in V's reply that the window made tappable, so a
--    conversation re-opened on another device renders the same.
-- 5. feedback: the student's thumbs up (1) or down (-1) on an AI reply, the
--    cleanest signal of which answers were good. Changeable; NULL = none.
--
-- ACCESS unchanged: RLS on with zero policies; the service-role routes write,
-- /dashboard/chat (superadmin) reads, and a signed-in student reads back their
-- own conversation through a route that filters by their user id.

alter table public.chat_interactions
  add column conversation_id uuid,
  add column page_path text check (page_path is null or (page_path ~ '^/[A-Za-z0-9/_.~-]*$' and length(page_path) <= 300)),
  add column reply_links text[] check (reply_links is null or cardinality(reply_links) <= 10),
  add column feedback smallint check (feedback is null or feedback in (-1, 1)),
  add column feedback_at timestamptz;

alter table public.chat_interactions
  drop constraint chat_interactions_reply_source_check,
  add constraint chat_interactions_reply_source_check
    check (reply_source is null or reply_source in ('ai', 'fallback', 'template'));

-- 0158's shape, widened: a typed question answers with AI or the fixed reply;
-- a button tap with its template. Token counts only on AI; links only on a
-- reply; feedback only on an AI reply.
alter table public.chat_interactions
  drop constraint chat_interactions_reply_shape,
  add constraint chat_interactions_reply_shape check (
    (
      (reply is null and reply_source is null and tokens_in is null and tokens_out is null and reply_links is null)
      -- "is not null" spelled out: a NULL source would make "in (...)" unknown,
      -- and a CHECK that is unknown passes.
      or (
        event_type = 'typed_question'
        and reply is not null
        and reply_source is not null
        and reply_source in ('ai', 'fallback')
        and (reply_source = 'ai' or (tokens_in is null and tokens_out is null))
      )
      or (
        event_type = 'faq_click'
        and reply is not null
        and reply_source is not null
        and reply_source = 'template'
        and tokens_in is null and tokens_out is null
      )
    )
    and (feedback is null or reply_source = 'ai')
    and ((feedback is null) = (feedback_at is null))
  );

create index chat_interactions_conversation_idx
  on public.chat_interactions (conversation_id, created_at)
  where conversation_id is not null;

-- A signed-in student's latest conversation, for their history on another device.
create index chat_interactions_user_recent_idx
  on public.chat_interactions (user_id, created_at desc)
  where user_id is not null and conversation_id is not null;

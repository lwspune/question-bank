-- 0160_v_followups.sql
--
-- V answers questions it could not answer at the time (2026-10-15).
--
-- WHY. From 2026-10-09 to 2026-10-15 V had no AI: 53 typed questions got "Let
-- me get back to your question later". Ten of them came from signed-in
-- students, so they CAN be answered late. The owner chose to deliver those
-- answers inside V: the next time the student is on the site signed in, V's
-- button shows a badge and the chat holds their question and the answer.
--
-- 1. A new event_type 'v_followup': V speaking first. `message` repeats the
--    student's original question (masked, as stored then), `reply` is V's
--    answer, reply_source 'followup'. It carries its own conversation_id, so
--    the chat window can open it as a conversation, and the writer always
--    names the student (user_id; see the constraint below for why the table
--    cannot insist). No tokens: these answers are written, not generated.
-- 2. seen_at: when the student first opened V with the answer waiting. Only
--    a follow-up has one. NULL = unread, which is what raises the badge, and
--    how /dashboard/chat counts who came back to read it.
--
-- Written by scripts/chat/followups.ts (dry run by default, one row per
-- student, never twice). ACCESS unchanged: RLS on, zero policies.

alter table public.chat_interactions
  add column seen_at timestamptz;

alter table public.chat_interactions
  drop constraint chat_interactions_event_type_check,
  add constraint chat_interactions_event_type_check
    check (event_type in ('launcher_open', 'faq_click', 'typed_question', 'builder_step', 'v_followup'));

alter table public.chat_interactions
  drop constraint chat_interactions_question_matches_type,
  add constraint chat_interactions_question_matches_type check (
    (event_type = 'launcher_open' and question_id is null and message is null)
    or (event_type = 'faq_click' and question_id is not null and message is null)
    or (event_type = 'typed_question' and question_id is null and message is not null)
    or (event_type = 'builder_step' and question_id is not null and message is null)
    or (event_type = 'v_followup' and question_id is null and message is not null)
  );

alter table public.chat_interactions
  drop constraint chat_interactions_reply_source_check,
  add constraint chat_interactions_reply_source_check
    check (reply_source is null or reply_source in ('ai', 'fallback', 'template', 'followup'));

-- 0159's shape plus the follow-up branch. Every branch spells out
-- "is not null": "x in (...)" on NULL is unknown, and an unknown CHECK passes.
alter table public.chat_interactions
  drop constraint chat_interactions_reply_shape,
  add constraint chat_interactions_reply_shape check (
    (
      (reply is null and reply_source is null and tokens_in is null and tokens_out is null and reply_links is null)
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
      or (
        event_type = 'v_followup'
        and reply is not null
        and reply_source is not null
        and reply_source = 'followup'
        and tokens_in is null and tokens_out is null
      )
    )
    and (feedback is null or reply_source = 'ai')
    and ((feedback is null) = (feedback_at is null))
  );

-- NOT "user_id is not null": user_id is ON DELETE SET NULL (0127), so that rule
-- would make deleting a student's account fail. The writer always sets it.
alter table public.chat_interactions
  add constraint chat_interactions_followup_shape check (
    (event_type <> 'v_followup' and seen_at is null)
    or (event_type = 'v_followup' and conversation_id is not null and reply is not null)
  );

-- A student's unread follow-ups.
create index chat_interactions_unread_followups_idx
  on public.chat_interactions (user_id)
  where event_type = 'v_followup' and seen_at is null;

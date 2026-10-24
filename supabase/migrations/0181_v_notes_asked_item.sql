-- 0181_v_notes_asked_item.sql
--
-- An Ask V tap on a NOTES practice question records which question it was
-- (2026-10-23).
--
-- Bank questions have carried asked_question_id since 0174, and V's memory
-- labels each message with it, so two taps on two questions never look alike.
-- Notes questions are not bank rows and have no id, so their taps were stored
-- unlabelled: two taps sent the identical "Explain this question.", and V told
-- a student its first reply "explained a different problem" (owner's report,
-- 2026-10-23). The same gap meant no question card when the chat is reopened
-- or read on /dashboard/chat, and V's test runner could not replay the tap.
--
-- asked_notes_item names the question within its notes page: "<concept>#<n>"
-- for practice question n, "<concept>#self" for the self-check
-- (lib/chat/notesItem notesRefKey). The row's page_path says which page.
-- Like asked_question_id it has no foreign key (a notes question lives in
-- code, not a table), only a shape check. A message is about a bank question
-- or a notes question, never both.
--
-- v_eval_cases gets the same column, so a case made from such a tap replays
-- with its question (scripts/chat/eval/run.ts).

alter table public.chat_interactions
  add column asked_notes_item text,
  add constraint chat_interactions_asked_notes_item_shape check (
    asked_notes_item is null
    or (
      event_type = 'typed_question'
      and asked_question_id is null
      and page_path is not null
      and asked_notes_item ~ '^[a-z0-9-]{1,100}#(self|[0-9]{1,2})$'
    )
  );

comment on column public.chat_interactions.asked_notes_item is
  'The notes question an Ask V tap was about, "<concept>#<n>" or "<concept>#self" on page_path (lib/chat/notesItem notesRefKey). Migration 0181.';

alter table public.v_eval_cases
  add column asked_notes_item text,
  add constraint v_eval_cases_asked_notes_item_shape check (
    asked_notes_item is null
    or (asked_question_id is null and page_path is not null and asked_notes_item ~ '^[a-z0-9-]{1,100}#(self|[0-9]{1,2})$')
  );

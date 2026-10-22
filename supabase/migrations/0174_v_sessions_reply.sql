-- 0174_v_sessions_reply.sql
--
-- V's sessions and replies (owner, 2026-10-21): which question a message was
-- about, and which earlier message it replies to.
--
-- WHY. V remembers the last two exchanges of a chat. When a student tapped
-- Ask V on a second question, those exchanges were about the FIRST one, with
-- nothing saying so, and V told the student "I need to correct my earlier
-- replies" about answers on another question. Each remembered message now
-- carries the question it was about (lib/chat/conversation.ts modelHistory).
-- A chat is also a session that ends after an hour with no messages; that
-- needs no column, it is read from created_at.
--
-- asked_question_id: the question the student had tapped Ask V on when they
-- sent the message. NO foreign key, deliberately: the id comes from the
-- browser and is checked only as a uuid (a bad one just makes V's lookup say
-- "not found"), and recordChatInteraction is best effort, so a key violation
-- would lose the student's whole row to protect a pointer nothing joins on.
--
-- reply_to_id: the earlier message this one replies to ("Reply" in V's
-- window). A foreign key, cleared if that row goes. The route only sends one
-- it found in the same conversation, this person's, in the current session;
-- the trigger holds the part the table can see: same conversation, and a
-- message V answered.
--
-- Both on typed questions only. NULL on every row written before this.
--
-- ACCESS unchanged: RLS on, zero policies.

alter table public.chat_interactions
  add column asked_question_id uuid,
  add column reply_to_id uuid references public.chat_interactions(id) on delete set null;

alter table public.chat_interactions
  add constraint chat_interactions_asked_question_typed
    check (asked_question_id is null or event_type = 'typed_question'),
  add constraint chat_interactions_reply_to_typed
    check (reply_to_id is null or (event_type = 'typed_question' and reply_to_id <> id));

-- The ON DELETE SET NULL above scans for referencing rows; this keeps that cheap.
create index chat_interactions_reply_to_id_idx
  on public.chat_interactions (reply_to_id)
  where reply_to_id is not null;

create or replace function private.chat_reply_same_conversation()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.reply_to_id is null then
    return new;
  end if;
  if new.conversation_id is null or not exists (
    select 1
    from public.chat_interactions t
    where t.id = new.reply_to_id
      and t.conversation_id = new.conversation_id
      and t.reply is not null
  ) then
    raise exception 'reply_to_id must be an answered message in the same conversation'
      using errcode = '23514';
  end if;
  return new;
end;
$$;

create trigger chat_interactions_reply_same_conversation
  before insert or update of reply_to_id, conversation_id on public.chat_interactions
  for each row execute function private.chat_reply_same_conversation();

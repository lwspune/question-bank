-- 0158_v_ai_answers.sql
--
-- V answers typed questions with AI (2026-10-15).
--
-- WHY. 0145 gave V a typing box that stored the question and replied "I'll get
-- back to you later". In its first week students typed 53 real messages; 27 of
-- the 34 that asked for something pointed at material the site already has
-- (chapter PYQs, tests, the pass price), and one student who typed "I wanna buy
-- premium" left without buying. So typed questions now get an answer from
-- Claude Haiku, limited to the site's own facts and its chapter pages.
--
-- 1. public.chat_settings: ONE row the owner edits at /dashboard/chat.
--    ai_enabled          off by default, so applying this changes nothing until
--                        the owner switches it on (and the API key exists).
--    per_person_per_hour messages one person may type an hour (account when
--                        signed in, connection when not). Was a constant 10.
--    ai_answers_per_day  AI answers per IST day for the WHOLE SITE, a cost cap.
--                        Past it, V gives the fixed reply. 0 = AI on, no answers.
--    RLS on with NO policies, like paywall_settings: only the service-role
--    route and the superadmin dashboard read or write it.
--
-- 2. chat_interactions gains what V replied, so the owner can read every
--    answer at /dashboard/chat and the real cost can be measured:
--    reply         the text V sent back (AI or fixed).
--    reply_source  'ai' or 'fallback' (the fixed reply: AI off, cap reached,
--                  no key, or the API failed).
--    tokens_in/out the AI call's token use; only on 'ai' rows.
--    Only a typed_question carries a reply. Existing typed rows predate this
--    and keep reply NULL, which the constraint allows.
--
-- 3. A partial index serves the daily-cap count (AI rows since IST midnight).
--
-- ALTERNATIVE REJECTED. Counting the daily cap in public.rate_limits: its
-- windows align to UTC, so the "day" would roll over at 05:30 IST. Counting
-- the recorded AI rows is exact, IST-aligned and needs no second store.

create table public.chat_settings (
  id                  boolean primary key default true check (id),
  ai_enabled          boolean not null default false,
  per_person_per_hour integer not null default 15 check (per_person_per_hour between 1 and 200),
  ai_answers_per_day  integer not null default 300 check (ai_answers_per_day between 0 and 5000),
  updated_at          timestamptz not null default now()
);
comment on table public.chat_settings is
  'One row. V''s AI switch, messages per person per hour, AI answers per IST day (whole site). Service-role only (RLS on, no policies).';

insert into public.chat_settings (id) values (true);

alter table public.chat_settings enable row level security;

alter table public.chat_interactions
  add column reply        text    check (reply is null or length(btrim(reply)) between 1 and 4000),
  add column reply_source text    check (reply_source is null or reply_source in ('ai', 'fallback')),
  add column tokens_in    integer check (tokens_in is null or tokens_in >= 0),
  add column tokens_out   integer check (tokens_out is null or tokens_out >= 0);

alter table public.chat_interactions
  add constraint chat_interactions_reply_shape check (
    (reply is null and reply_source is null and tokens_in is null and tokens_out is null)
    or (
      event_type = 'typed_question'
      and reply is not null
      and reply_source is not null
      and (reply_source = 'ai' or (tokens_in is null and tokens_out is null))
    )
  );

create index chat_interactions_ai_replies_idx
  on public.chat_interactions (created_at)
  where reply_source = 'ai';

-- 0250_v_followups.sql
--
-- V sees the follow-up answer (V_LEARNING_LOOP.md step 2, owner 2026-11-10).
-- Under an explanation, "One more like this" puts a question from the same
-- subtopic in the chat as a try card. Until now nothing tied the card's answer
-- to the explanation it followed, so whether an explanation worked could only
-- be guessed from time and subtopic (npm run v:learning).
--
-- 1. v_followups: one row per student, India day and explained question: the
--    FIRST follow-up the student answered after V explained that question
--    that day. Written by POST /api/chat/question (service role) only after
--    the server has checked that V really explained the question to this
--    student today (chat_interactions), and that the follow-up is a different
--    question in the same subtopic. The primary key is the claim: a second
--    follow-up for the same explanation that day is not linked and not free.
--    The answer itself stays in user_activity (question_practiced, surface
--    'v'); this row is only the link, so the two cannot disagree.
--
--    free: the follow-up used none of the day's free answers. The route marks
--    it in daily_reveals with counts = false BEFORE the answer is recorded, so
--    the mirror trigger (0228) finds the row and does nothing, and claim_reveal
--    reads it as a repeat. "Show me where I went wrong" on that card is then a
--    repeat too. One free follow-up per explanation per day, owner 2026-11-10.
--
-- 2. chat_settings.followup_free: the switch for the free part, at
--    /dashboard/chat. Off, the link is still written and the follow-up counts
--    as usual. Default false: switched on by the owner (planned at merge).
--
-- 3. v_eval_cases.follows_up_question_id: a test case can replay "Show me where
--    I went wrong", which tells V which question it explained before.
--
-- APPLY BEFORE THE CODE THAT READS IT DEPLOYS: readChatSettings selects
-- followup_free, and a failed read falls back to the defaults, which switch
-- V's AI off for everyone.

create table public.v_followups (
  user_id                uuid not null references auth.users(id) on delete cascade,
  ist_day                date not null,
  explained_question_id  uuid not null references public.questions(id) on delete cascade,
  followup_question_id   uuid not null references public.questions(id) on delete cascade,
  free                   boolean not null,
  created_at             timestamptz not null default now(),
  primary key (user_id, ist_day, explained_question_id),
  constraint v_followups_distinct check (followup_question_id <> explained_question_id)
);

comment on table public.v_followups is
  'The first follow-up a student answered after V explained a question, per India day (0250). Written by the server only; the answer itself is in user_activity.';

alter table public.v_followups enable row level security;

create policy v_followups_select_own on public.v_followups
  for select to authenticated using (user_id = (select auth.uid()));

revoke insert, update, delete, truncate on public.v_followups from anon, authenticated;

-- The weekly count reads a date range across students.
create index v_followups_created_idx on public.v_followups (created_at);

alter table public.chat_settings
  add column if not exists followup_free boolean not null default false;

comment on column public.chat_settings.followup_free is
  'One free follow-up per explanation per day (0250): the try card after "One more like this" uses none of the day''s free answers.';

alter table public.v_eval_cases
  add column if not exists follows_up_question_id uuid;

comment on column public.v_eval_cases.follows_up_question_id is
  'The question V explained before this follow-up (0250), for replaying "Show me where I went wrong".';

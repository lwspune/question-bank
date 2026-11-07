-- 0226_v_premium_hourly.sql
--
-- V's hourly limit lifted for Premium Pass holders (owner, 2026-11-07).
-- Everyone may type per_person_per_hour messages an hour (5). Until now that
-- held for paying students too: 17 of the 32 people holding a paid pass use V,
-- and 5 of the 33 students who sent 5 messages inside an hour (19 Oct to
-- 7 Nov) held one. The owner chose to make the ₹499 Premium Pass "ask V as
-- much as you need" rather than move V's explanations out of the ₹199
-- Practice Pass, which promises unlimited answers.
--
-- 1. chat_settings.premium_per_person_per_hour: the Premium Pass holder's
--    limit (the downloads scope: Premium, the old teacher pass, `all`), a guard
--    against abuse, not a limit a student should meet. Default 50 (owner).
--    Edited at /dashboard/chat beside the free limit; never below it.
--
-- 2. chat_interactions event_type 'hourly_limit': a message the hourly limit
--    stopped. Until now such a message left no trace (the route answered 429
--    before writing anything), so how often the limit bites was unknown. The
--    row keeps the message, page and person, with no reply: the wait line is
--    built from the limit, not stored.
--
-- APPLY BEFORE THE CODE THAT READS IT DEPLOYS: readChatSettings selects
-- premium_per_person_per_hour, and a failed read falls back to the defaults,
-- which switch V's AI off for everyone.

alter table public.chat_settings
  add column premium_per_person_per_hour integer not null default 50
    check (premium_per_person_per_hour between 1 and 500),
  add constraint chat_settings_premium_not_below_free
    check (premium_per_person_per_hour >= per_person_per_hour);

alter table public.chat_interactions
  drop constraint chat_interactions_event_type_check,
  add constraint chat_interactions_event_type_check
    check (event_type in ('launcher_open', 'faq_click', 'typed_question', 'builder_step', 'v_followup', 'hourly_limit')),
  drop constraint chat_interactions_question_matches_type,
  add constraint chat_interactions_question_matches_type check (
    (event_type = 'launcher_open' and question_id is null and message is null)
    or (event_type = 'faq_click' and question_id is not null and message is null)
    or (event_type = 'typed_question' and question_id is null and message is not null)
    or (event_type = 'builder_step' and question_id is not null and message is null)
    or (event_type = 'v_followup' and question_id is null and message is not null)
    or (event_type = 'hourly_limit' and question_id is null and message is not null)
  );

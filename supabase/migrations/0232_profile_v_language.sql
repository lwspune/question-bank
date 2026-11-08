-- 0232_profile_v_language.sql
--
-- The language a student asked V to answer in (2026-11-08, owner).
--
-- V matched how the student wrote and kept nothing past a session. On
-- 2026-11-08 a student wrote "ans in hinglish always", V promised "aage ke
-- saare jawab Hinglish mein honge", and their next chat, two hours later, was
-- in English: the Ask V buttons send English, and V had nothing to remember it
-- by. 8 students asked for a language 17 times in the 60 days before; the
-- repeats are the forgetting.
--
-- V's set_language tool saves it here, on the student's own row, through the
-- existing own-row RLS policies (0045); the chat route reads it with the
-- student's exams, which it already reads, so it costs no extra query.
--
-- VALUES. NULL: never asked; V matches how they write (rule 10). Otherwise
-- one of the four languages V speaks (lib/chat/language.ts V_LANGUAGES); the
-- CHECK keeps any other write path from storing one V cannot honour.
-- Alternative rejected: keep it in the chat only. That is what failed.

ALTER TABLE public.student_profiles
  ADD COLUMN v_language text
  CONSTRAINT student_profiles_v_language_valid
  CHECK (v_language IS NULL OR v_language IN ('en', 'hinglish', 'hi', 'mr'));

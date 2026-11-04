-- 0214_msq_format.sql -- multiple-select questions (MSQ), and numeric answers keyed as a range.
--
-- WHY: UCEED (IIT Bombay's B.Des entrance) sets a multiple-select section in every paper
-- since 2015, 15-30 questions a paper: one OR MORE of A-D are correct. 2019-2026 hold 137
-- of them, held out of the bank because question_format had no way to say "more than one
-- option is correct", and every consumer (the card, the mock grader, the Word key, the
-- drill, V) assumes exactly one. UCEED also keys some numeric answers as a range
-- (2023 Q2: 132.8-133.1); numeric_answer held one exact value, so 10 more were held.
--
-- SHAPE:
--   * 'msq' is its own format, not an mcq with two correct rows (owner, 2026-11-04). A new
--     value makes every surface opt in: code that branches on 'mcq' never sees an MSQ, so
--     nothing that assumes one answer can silently mark a student wrong or print one letter.
--     An MSQ has the usual option rows; is_correct is true on each correct one (1 to 4).
--     Nothing here or earlier forces "exactly one correct", so options needs no change.
--   * numeric_answer_max: the top of an accepted range. NULL = numeric_answer is exact (every
--     NAT row today). Set = any response from numeric_answer to numeric_answer_max counts.
--     A CHECK keeps the range the right way round and refuses a max without a min.
--
-- The deployed app reads question_format through TS unions that do not know 'msq'; no row
-- carries it until the UCEED lane commits one after the code that reads it is deployed.

alter type public.question_format add value if not exists 'msq';

alter table public.questions
  add column if not exists numeric_answer_max numeric
  constraint questions_numeric_answer_max_check
    check (numeric_answer_max is null or (numeric_answer is not null and numeric_answer_max >= numeric_answer));

comment on column public.questions.numeric_answer_max is
  'Top of the accepted range for a numeric (NAT) answer keyed as a range (UCEED 2023 Q2: 132.8-133.1); numeric_answer is then the bottom. NULL = numeric_answer is the one exact answer (migration 0214).';

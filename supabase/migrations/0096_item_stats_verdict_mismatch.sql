-- 0096 -- question_item_stats.verdict_mismatch: attempts where the RECORDED MARK
-- and the KEY disagree.
--
-- The strongest signal this feature produces, and the only one that does not
-- need a human to disambiguate three causes. A distractor outpulling the key is
-- a LEAD -- it means a wrong key, OR a well-built trap, OR a shared
-- misconception, and the data cannot separate them (all three of the sharpest
-- leads found on 2026-09-11 turned out to have correct keys). A verdict mismatch
-- is different: something is definitely inconsistent between the mark a student
-- was given and the answer the paper says is right. Either the record's key is
-- wrong, or the question was dropped and credited to all, or it was re-graded by
-- hand. Which of those, a human still decides -- but that there is a defect is
-- not in question.
--
-- NULLABLE, AND NULL IS NOT ZERO. Only a source that records a mark SEPARATELY
-- from the response can produce this number:
--
--   * nda-tracker CAN. `exam_results.responses` is Evalbee's per-question
--     verdict, stored independently of `choices`, so the two can be compared.
--   * the vault CANNOT, structurally. `attempt_answers` stores the RESPONSE
--     only; correctness is derived live from the key by `verdictFor`, so there
--     is nothing independent to disagree with. A `0` here would assert "checked,
--     none found" where the truth is "not measurable" -- the
--     default-becomes-an-assertion shape this project has paid for before.
--
-- The CHECK below enforces exactly that, so a future writer cannot quietly
-- start filling zeros for vault rows.

alter table public.question_item_stats
  add column if not exists verdict_mismatch int;

alter table public.question_item_stats
  add constraint question_item_stats_mismatch_bounded
  check (verdict_mismatch is null or (verdict_mismatch >= 0 and verdict_mismatch <= attempted));

-- A mismatch is only meaningful where a mark is recorded apart from the
-- response. Tracker rows may carry one (including 0, which there means
-- "compared, none found"); vault rows must not.
alter table public.question_item_stats
  add constraint question_item_stats_mismatch_source
  check (source = 'tracker' or verdict_mismatch is null);

comment on column public.question_item_stats.verdict_mismatch is
  'Attempts where the recorded mark disagrees with the key (mis-keyed or dropped question). NULL means not measurable for this source, never "none found" -- see migration 0096.';

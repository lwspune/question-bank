-- 0229_study_path_fix_ten.sql -- the board path's revision weeks (MENTOR_SPEC.md
-- §4 "The last three weeks", Phase 3, owner's pick 2026-11-08).
--
-- From three weeks before the board exam, the Fix task becomes a main daily
-- item: up to 10 mistakes a day instead of 5. Today's Fix questions are stored
-- on the day's pick (0225 study_path_days.fix_question_ids) because they carry
-- the drill's free-limit exemption, and 0225 capped that list at 5. This lifts
-- the cap to 10; the code decides 5 or 10 by the day's mode.
--
-- Widening a CHECK cannot reject an existing row. The constraint name is the
-- one 0225 created (read live on 2026-11-08). 0228 is held by another branch
-- (qb-reveal-claim, unmerged), hence 0229.

alter table public.study_path_days drop constraint study_path_days_fix_question_ids_check;

alter table public.study_path_days
  add constraint study_path_days_fix_question_ids_check check (cardinality(fix_question_ids) <= 10);

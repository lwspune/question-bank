-- JEE Mains (and any future exam) Section B: Numerical Answer Type (NAT) questions.
--
-- These are a THIRD question format, distinct from both `mcq` (4 options, one
-- correct) and `subjective` (open-ended, model answer in questions.solution):
-- a NAT question has NO option rows and exactly one PRECISE numerical answer
-- (integer today for JEE 2021; the column is `numeric` so 2024+ 2-decimal
-- answers fit without another migration). Unlike subjective, a NAT answer is
-- exact and auto-gradeable (numeric match), so it gets its own format + a
-- dedicated answer column rather than riding on the free-text solution.
--
-- Additive + backward-compatible: the new enum value is unused by existing
-- code and the column is nullable, so every existing row + every MCQ/subjective
-- path is unchanged. New rows still default to 'mcq'.
alter type question_format add value if not exists 'numeric';

alter table questions
  add column numeric_answer numeric;

comment on column questions.numeric_answer is
  'The single correct numerical answer for a question_format = ''numeric'' (NAT) question — zero option rows, exact/auto-gradeable. NULL for mcq/subjective. Set by the ingestion pipeline from the source answer key.';

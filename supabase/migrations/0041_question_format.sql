-- Distinguish MCQ questions from subjective (free-response) questions.
--
-- Until now every question in the bank was multiple-choice: exactly one
-- `options` row with `is_correct = true`, and the answer lived entirely in the
-- `options` table. State Board textbook content (and eventually board PYQs) is
-- a mix of MCQ *and* subjective questions (short/long answer, derivations,
-- "write the truth values", "discuss using a truth table"). A subjective
-- question has NO option rows — its model answer lives in `questions.solution`.
--
-- This column makes the distinction explicit so the render layer, the Word
-- export, the upload/edit validators, the quiz factory, and the RAG key-audit
-- can branch on it. New rows default to 'mcq', so every existing row + every
-- existing MCQ ingest path is unchanged.
create type question_format as enum ('mcq', 'subjective');

alter table questions
  add column question_format question_format not null default 'mcq';

comment on column questions.question_format is
  'Whether this question is multiple-choice (default; has 4 option rows, one correct) or subjective/free-response (zero option rows, model answer in questions.solution). Surfaces that assume one-correct-option (quiz factory, RAG key-audit) filter on this.';

-- Subjective is the selective slice today (MCQ is the overwhelming majority),
-- so a plain composite index serves the "show me subjective" filter without
-- bloating the mcq scans.
create index questions_question_format_idx on questions(org_id, question_format);

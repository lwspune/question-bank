-- Book-faithful section structure for the /board reader.
--
-- The /board surface renders a textbook chapter the way the physical book is
-- laid out: each numbered book section (2.1, 2.2, …) shows its Solved Examples
-- then its Exercise, and the chapter ends with the Miscellaneous Exercise (and,
-- later, PYQs). That structural axis is DIFFERENT from the conceptual `subtopic`
-- axis (which drives /browse + /notes): a single book Exercise (e.g. Exercise
-- 2.2, Q.1–Q.6) is deliberately split across several conceptual subtopics, so
-- the reader cannot group by subtopic without shattering the book's exercises.
--
-- These columns capture the book layout as first-class data so the reader never
-- parses the (inconsistent) question_number string at render time:
--   section_kind  — solved_example | exercise | miscellaneous  (PYQs ride the
--                   existing question_kind='pyq' + pyq_year axis; no new value)
--   section_group — the book section that owns the big header, e.g.
--                   "2.1 Elementary Transformations", "Miscellaneous Exercise"
--   section_label — the sub-block heading under a group, e.g. "Exercise 2.1",
--                   "Solved Examples", "Multiple Choice Questions"
--   section_seq   — the block's position in the chapter's book order (order key)
-- Question order WITHIN a block is the existing source_row (contiguous per block).
--
-- All nullable: only board/textbook rows carry them; every existing row + every
-- other exam is unaffected. A board:lint gate enforces completeness for board
-- exams (see scripts/stateboard/lint-sections.ts).
create type section_kind as enum ('solved_example', 'exercise', 'miscellaneous');

alter table questions
  add column section_kind  section_kind null,
  add column section_group text         null,
  add column section_label text         null,
  add column section_seq   int          null;

comment on column questions.section_kind is
  'Book-layout classification for the /board reader: solved_example | exercise | miscellaneous. NULL for non-board rows. Orthogonal to the conceptual subtopic axis (used by /browse + /notes). PYQs use question_kind=''pyq'', not a section_kind value.';
comment on column questions.section_group is
  'The book section that owns the /board group header, e.g. "2.1 Elementary Transformations" or "Miscellaneous Exercise". NULL for non-board rows.';
comment on column questions.section_label is
  'The sub-block heading under a section_group, e.g. "Exercise 2.1", "Solved Examples", "Multiple Choice Questions". NULL for non-board rows.';
comment on column questions.section_seq is
  'The block''s position in the chapter''s book reading order (ORDER BY section_seq, then source_row within the block). NULL for non-board rows.';

-- The reader always scopes by (exam, chapter) then orders by this axis.
create index questions_section_seq_idx
  on questions(exam_id, chapter_id, section_seq)
  where section_seq is not null;

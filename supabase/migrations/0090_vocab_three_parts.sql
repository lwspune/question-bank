-- 0090_vocab_three_parts.sql
--
-- Split the vocab book's 'exam' part into 'pyq' and 'practice'.
--
-- WHY, measured: 609 of the exam-tested words appear ONLY in coaching material
-- (Oswaal books, weekly mocks) and never in a UPSC paper. Leaving them merged
-- makes the book's headline claim — "the words the papers have actually asked"
-- — false for 22% of the part, and it already produced a false citation
-- ("adroit — NDA", off Oswaal_NDA_YWSP_English.pdf).
--
-- Unlike the NDA-vs-CDS question this split costs NO duplication: "has a real
-- paper asked it" is yes/no, and the 51 words appearing in both a paper and a
-- mock simply belong to 'pyq'. That is why exam is only a TAG while this is a
-- part.
--
-- Existing rows are migrated by the same rule, not defaulted: a row whose
-- `sentence_source` says "practice" is practice, everything else is pyq. Only
-- 12 rows exist, and one of them (adroit) is genuinely practice-only.

ALTER TABLE public.vocab_entries DROP CONSTRAINT vocab_entries_part_check;
ALTER TABLE public.vocab_entries DROP CONSTRAINT vocab_entries_exams_match_part;

UPDATE public.vocab_entries
   SET part = CASE
     WHEN part = 'school' THEN 'school'
     WHEN coalesce(sentence_source, '') LIKE '%practice%' THEN 'practice'
     ELSE 'pyq'
   END;

ALTER TABLE public.vocab_entries
  ADD CONSTRAINT vocab_entries_part_check
  CHECK (part IN ('pyq', 'practice', 'school'));

-- A word in either exam part must name the exam(s) that set it; a school word
-- must not. Same intent as before, widened to the third part.
ALTER TABLE public.vocab_entries
  ADD CONSTRAINT vocab_entries_exams_match_part
  CHECK ((part IN ('pyq', 'practice')) = (cardinality(exams) > 0));

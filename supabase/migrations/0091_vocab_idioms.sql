-- 0091_vocab_idioms.sql
--
-- Add the vocab book's fourth part: idioms and phrases.
--
-- WHY A PART RATHER THAN A SECTION OF PART 2: an idiom entry is a different
-- SHAPE, not a different subject. It carries a meaning and nothing else — no
-- usage sentence and no synonyms — and that is the corpus's decision rather
-- than a simplification. Measured over the 350 idiom questions: 318 stems are
-- the bare idiom ("Through thick and thin") with four meanings under them, and
-- only ~32 embed it in a sentence, so there is nothing to quote for ~91% of
-- them. Synonyms are dropped for a different reason: an idiom's synonym IS its
-- meaning, so the list would restate the definition on the next line.
--
-- THE MEANING IS THE PAPER'S OWN KEYED OPTION, which makes this the strongest
-- provenance in the book. For a word we author a definition and the exam only
-- confirms a synonym; for an idiom the exam publishes the definition itself as
-- the correct answer.
--
-- `exams` STAYS NON-EMPTY for this part, like pyq and practice: an idiom is
-- here because a paper or a mock set it, and the tag names which. The school
-- part remains the only one that must carry none.

ALTER TABLE public.vocab_entries DROP CONSTRAINT vocab_entries_part_check;
ALTER TABLE public.vocab_entries DROP CONSTRAINT vocab_entries_exams_match_part;

ALTER TABLE public.vocab_entries
  ADD CONSTRAINT vocab_entries_part_check
  CHECK (part IN ('pyq', 'practice', 'school', 'idiom'));

ALTER TABLE public.vocab_entries
  ADD CONSTRAINT vocab_entries_exams_match_part
  CHECK ((part IN ('pyq', 'practice', 'idiom')) = (cardinality(exams) > 0));

-- An idiom entry must not carry a usage sentence: there is no exam sentence for
-- it, and an authored one would read as evidence the paper never gave. Enforced
-- here rather than left to the commit script, because the claim this protects —
-- "the sentence is the one the paper asked it in" — is the book's whole
-- advantage over a bought word list.
ALTER TABLE public.vocab_entries
  ADD CONSTRAINT vocab_entries_idiom_has_no_sentence
  CHECK (part <> 'idiom' OR (sentence IS NULL AND sentence_source IS NULL));

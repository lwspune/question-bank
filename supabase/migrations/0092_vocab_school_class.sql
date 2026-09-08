-- 0092_vocab_school_class.sql
--
-- PART 1 BECOMES A CLASS LADDER. Its four letter bands are replaced by eight
-- rungs, Class 5 to Class 12, so a student can be pointed at their own level and
-- climb — which is what the part was always FOR, and what a letter band cannot
-- express.
--
-- ═══ WHY A COLUMN AND NOT JUST THE CHAPTER SLUG ═══
--
-- `chapter_slug` will say "school-class-9", so the rung is technically
-- recoverable by parsing it. Two reasons not to rely on that. The slug is a URL
-- and this file's own 0089 header records that slugs are DECLARED, so parsing
-- one for a fact makes a rename a silent data change. And the rung is only half
-- the fact worth storing:
--
-- `school_source` IS THE HALF THAT MATTERS, and it exists because the two kinds
-- of Part 1 word carry DIFFERENT AUTHORITY:
--
--   'cbse'     — the class is the one the printed CBSE list first introduces
--                the word in. A publisher graded it.
--   'authored' — the word was written to fill a thin rung, and its class is OUR
--                judgement of level. Nobody else graded it.
--
-- The upper rungs are mostly the second kind (the printed Class 9 list is 86%
-- a re-run of Class 7, so filing at first-introduction leaves it holding 21
-- words), and a book whose heading says "Class 9" must be able to say which of
-- those two things it means. Prose in a blurb cannot be queried, and this
-- project has twice shipped derived content that did not announce itself —
-- hence a column, checked, exactly as the State Board lane concluded that a
-- disclosure belongs in STRUCTURED DATA rather than in a note field.
--
-- NOT PRINTED ON THE PAGE, deliberately. The book's rule is that presence
-- carries a claim (`sentence_source` present = a real paper asked it), and a
-- per-entry "authored" label would read to a student as a warning about the
-- word rather than a statement about its grading. The part blurb says it once.
--
-- BOTH COLUMNS ARE NULL FOR EVERY OTHER PART, and the CHECK enforces it in both
-- directions: a school row must carry them, a non-school row must not. Without
-- the second half, "no class recorded" and "not a school word" would look
-- identical, which is the absence-becomes-an-assertion failure this project
-- keeps re-learning.

ALTER TABLE public.vocab_entries
  ADD COLUMN school_class  smallint,
  ADD COLUMN school_source text;

ALTER TABLE public.vocab_entries
  ADD CONSTRAINT vocab_entries_school_class_range
  CHECK (school_class IS NULL OR school_class BETWEEN 5 AND 12);

ALTER TABLE public.vocab_entries
  ADD CONSTRAINT vocab_entries_school_source_known
  CHECK (school_source IS NULL OR school_source IN ('cbse', 'authored'));

-- THE TWO-DIRECTIONAL RULE IS DEFERRED TO 0093, ON PURPOSE. "A school row must
-- carry both columns" cannot hold the instant the columns are added -- the 676
-- rows already in Part 1 are NULL until the re-filing script has run. Adding it
-- here would either fail outright in prod, or pass on the EMPTY test project and
-- fail only on replay against real data, which is the worse of the two.
--
-- Order is: 0092 (columns) -> migrate-school-classes.ts (backfill + re-file) ->
-- author the fill words -> 0093 (the matching CHECK, which then holds).

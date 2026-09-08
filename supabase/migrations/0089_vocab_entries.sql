-- 0089_vocab_entries.sql
--
-- THE CADET VOCAB BOOK. One row per WORD, which is what makes this table
-- necessary rather than a reuse of `book_questions` (0086).
--
-- WHY NOT book_questions. That table's `question_id` is a NOT NULL FK to
-- `questions`, so a word cannot live in it without minting a fake question for
-- every headword. The distinction runs deeper than storage: `/books` describes
-- itself as "a view over the live bank — it stores no content of its own", and
-- ~82% of this book IS new content. Only the 655 exam-tested words derive their
-- meaning, sentence and clusters from questions already in the bank; the school
-- list and the option words are authored.
--
-- A WORD IS NOT A QUESTION, and the difference decides the book's shape. A
-- question belongs to exactly one paper, so the NDA/CDS English PYQ book can
-- put "NDA PYQ" and "CDS PYQ" in separate sections. 58 of these words are asked
-- by BOTH exams — splitting by exam would print each of them twice — so the
-- exam(s) are an ATTRIBUTE of the row (`exams`), never its location.
--
-- `chapter_slug` IS DECLARED, NOT DERIVED. It names a letter band from
-- src/lib/vocab/registry.ts. Computing bands from the current corpus would recut
-- every boundary when the option words land (Part 2 goes 655 -> ~2,900) and move
-- every chapter URL — the same reason `books/registry.ts` keeps chapter ORDER
-- editorial rather than sorting by count.
--
-- `position` IS FRACTIONAL, like paper_questions.position and
-- book_questions.position: reordering is then one UPDATE rather than a renumber,
-- and src/lib/papers/sections.ts already holds the tested pure core.
--
-- `excluded` IS A FLAG, NEVER A DELETED ROW. If exclusion meant absence then
-- absence would mean two things — "never added" and "deliberately dropped" —
-- and the next sync would silently re-add everything already rejected.
--
-- PROVENANCE IS NOT OPTIONAL HERE. Meanings, sentences, synonyms and antonyms
-- are MODEL-AUTHORED, and this project has twice shipped derived content that
-- did not announce itself (CDS English answers; the State Board Physics keys).
-- `derived_model` / `derived_at` carry it, and `sentence_source` distinguishes a
-- REAL exam sentence ("NDA 2017 (Apr)") from an authored one (NULL) — which is
-- the single most valuable claim this book makes, so it must be checkable.
--
-- LOCKED RLS: enabled, NO policies — service-role only, read through
-- requireSuperadmin() like `books`. Expect the `rls_enabled_no_policy` advisor
-- INFO; it is the design.

CREATE TABLE public.vocab_entries (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Matches VocabBookDefinition.slug in src/lib/vocab/registry.ts.
  book_slug     text NOT NULL,
  -- Lower-cased headword. Unique per book: a word appears ONCE, in the part
  -- where it earns its keep, and the index at the back is what makes it findable.
  word          text NOT NULL,

  -- 'exam'   — asked in an NDA or CDS paper; meaning/sentence/clusters derived
  --            from the question itself.
  -- 'school' — from the Class 5-12 list and never asked; fully authored.
  part          text NOT NULL CHECK (part IN ('exam', 'school')),
  chapter_slug  text NOT NULL,
  position      double precision NOT NULL,

  meaning       text NOT NULL,
  -- The usage sentence. NULL is meaningful: 125 exam words are asked only via a
  -- bare instruction stem ("Choose the word nearest in meaning to: ADULATION"),
  -- which gives the book no sentence to print.
  sentence      text,
  -- Where that sentence came from — "CDS 2026-I", "NDA 2017 (Apr)". NULL means
  -- AUTHORED. Never fill this in for a sentence we wrote.
  sentence_source text,

  synonyms      text[] NOT NULL DEFAULT '{}',
  antonyms      text[] NOT NULL DEFAULT '{}',

  -- Which exam(s) have asked it, and how often. Empty for a school word.
  exams         text[] NOT NULL DEFAULT '{}',
  times_asked   integer NOT NULL DEFAULT 0 CHECK (times_asked >= 0),

  -- Curation, mirroring book_questions.
  excluded      boolean NOT NULL DEFAULT false,
  note          text,

  -- Authoring provenance. NOT NULL-able only because school entries are written
  -- in the same pass; a row with no model recorded is a row nobody can audit.
  derived_model text,
  derived_at    timestamptz,

  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT vocab_entries_word_key UNIQUE (book_slug, word),
  -- A source without a sentence is a claim about nothing.
  CONSTRAINT vocab_entries_source_needs_sentence
    CHECK (sentence_source IS NULL OR sentence IS NOT NULL),
  -- An exam word must name its exam(s); a school word must not.
  CONSTRAINT vocab_entries_exams_match_part
    CHECK ((part = 'exam') = (cardinality(exams) > 0)),
  CONSTRAINT vocab_entries_meaning_len CHECK (length(btrim(meaning)) BETWEEN 3 AND 400),
  CONSTRAINT vocab_entries_note_len    CHECK (note IS NULL OR length(note) <= 2000)
);

-- The reader's only query: one chapter, in book order.
CREATE INDEX vocab_entries_chapter_idx
  ON public.vocab_entries (book_slug, part, chapter_slug, position);

-- The index at the back, and the "is this word already in the book?" lookup.
CREATE INDEX vocab_entries_word_idx
  ON public.vocab_entries (book_slug, word);

ALTER TABLE public.vocab_entries ENABLE ROW LEVEL SECURITY;

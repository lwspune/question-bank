-- 0280_no_method_notes.sql: a solution never carries a method note (2026-11-22)
--
-- WHY: owner, 2026-11-22, on the Homi Bhabha ebook: "any disclaimer should be
-- for internal consumption and should not reach to student on any surface."
-- A method note is a bracket on HOW an answer was got ("[Answer worked out by
-- PYQ Vault: ... Two independent solutions agreed.]", "[Derived answer — ...
-- Verify before relying on it.]"). It was ruled out once already (2026-11-19),
-- but only in memory, so the next ingestion lane copied the old code and 6,616
-- rows carried one (CDS, CAPF, Homi Bhabha, NDA, and the unpublished AISSEE,
-- RMS CET and RIMC rows). scripts/reviews/move-method-notes.ts moved every note
-- into question_reviews and cut it from the solution before this ran.
--
-- WHAT: the same CHECK on both places a solution lives: the question itself and
-- its translations. The openings are src/lib/questions/methodNotes.ts
-- (METHOD_NOTE_OPENINGS); tests/method-notes.test.ts holds the two together.
-- An insert or update carrying one now fails, so a lane that writes the note
-- breaks at commit instead of shipping it. Where the fact belongs: question_reviews
-- (and derived_model), which no student page reads.

ALTER TABLE public.questions
  ADD CONSTRAINT questions_solution_no_method_note CHECK (
    solution IS NULL OR solution !~* '\[(Answer worked out by PYQ Vault|One sample answer written by PYQ Vault|उत्तर PYQ Vault|Derived answer|Answer derived from the printed|Answer from the official)'
  );

ALTER TABLE public.question_translations
  ADD CONSTRAINT question_translations_solution_no_method_note CHECK (
    solution IS NULL OR solution !~* '\[(Answer worked out by PYQ Vault|One sample answer written by PYQ Vault|उत्तर PYQ Vault|Derived answer|Answer derived from the printed|Answer from the official)'
  );

-- 0088_mock_source_scope.sql
--
-- TWO AXES ON A MOCK, not one enum.
--
-- Until now every row in `mock_tests` was the same kind of thing: a real past
-- paper of one sitting, served whole (0044, "use PYQPs as is"). Two more kinds
-- are coming — full-length papers ASSEMBLED from the bank to an exam blueprint,
-- and shorter SECTIONAL drills on one chapter or section — and they vary along
-- two INDEPENDENT dimensions, not one:
--
--   source = where the question set came from   (a real sitting | assembled)
--   scope  = how much of the exam it covers     (a whole paper  | a subset)
--
-- Both combinations of the two already exist as printed papers in `papers`:
-- "NDA - Matrices & Determinant" is 25 questions, every one a PYQ (sectional +
-- pyq), while "NDA Maths — Circles, Height & Distance and Binary Numbers" is 60
-- assembled ones (sectional + practice). A single `kind` enum would therefore
-- have to grow to four values that are really a product type, or gain a second
-- column later that makes the first one's NAME a lie. They are separate columns
-- because they answer separate questions a student actually asks: "am I sitting
-- the real thing?" and "is this a three-hour commitment or a thirty-minute one?"
--
-- Both DEFAULT to what every existing row is, so this migration is a no-op for
-- the 187 published mocks and the build script keeps working untouched until it
-- is taught the new fields.
ALTER TABLE public.mock_tests
  ADD COLUMN source text NOT NULL DEFAULT 'pyq'
    CHECK (source IN ('pyq', 'practice')),
  ADD COLUMN scope  text NOT NULL DEFAULT 'full'
    CHECK (scope IN ('full', 'sectional'));

-- ── pyq_year becomes nullable ───────────────────────────────────────────────
-- An assembled paper has no sitting, so it has no year — and `pyq_year` is not
-- a quiet field: the catalogue renders it as a SECTION HEADING. Stamping the
-- build year instead would print "2026" over papers nobody ever sat, which is
-- an assertion rather than a label — the failure this codebase has already paid
-- for three times (the syllabus map's "no single section" on unassessed rows,
-- an unruled subtopic defaulting to `full`, and the mock instructions screen
-- asserting negative marking on an exam that has none).
--
-- A sentinel year (0 / 9999) is worse still: an invalid value that every
-- consumer reads as valid.
ALTER TABLE public.mock_tests ALTER COLUMN pyq_year DROP NOT NULL;

-- ── ...but a full past paper MUST still name its sitting ─────────────────────
-- Dropping NOT NULL outright would let the one row type that genuinely has a
-- sitting lose it silently. The honest constraint is not "pyq implies a year" —
-- a SECTIONAL test built from PYQs draws on many sittings and has no single
-- year — it is that a paper claiming to be a whole real sitting must say which.
ALTER TABLE public.mock_tests
  ADD CONSTRAINT mock_tests_full_pyq_has_year
    CHECK (pyq_year IS NOT NULL OR NOT (source = 'pyq' AND scope = 'full'));

-- NO new index, deliberately. The per-type catalogue pages filter on
-- (exam_id, status, scope/source) and the table holds 187 rows — a seq scan
-- there is free, and this project has already spent a session tracing disk-IO
-- exhaustion to write amplification from indexes added on reasoning rather than
-- measurement. Add one when a measurement asks for it.
COMMENT ON COLUMN public.mock_tests.source IS
  'Where the question set came from: pyq = a real sitting served whole; practice = assembled from the bank.';
COMMENT ON COLUMN public.mock_tests.scope IS
  'How much of the exam it covers: full = a whole paper (matches a blueprint); sectional = a chapter/section subset.';

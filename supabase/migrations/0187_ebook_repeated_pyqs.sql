-- 0187_ebook_repeated_pyqs.sql — Repeated PYQs books for the boards (2026-10-26)
--
-- WHAT: a fifth kind of ebook, `repeats`: from a subject's homework plan, every
-- question the board asked again and every type it keeps asking, chapter by
-- chapter in textbook order, each under its "Asked N times" line, solutions at
-- the end of each chapter. One book per board subject with a homework plan
-- (17; CBSE 12 Biology has none yet). What each prints is
-- src/lib/ebooks/paperBooks.ts (REPEATS_EBOOKS) + lib/ebooks/repeats.ts.
--
-- 1. `kind` gains 'repeats'; mirrors EbookKind in src/lib/ebooks/catalog.ts.
-- 2. Seventeen rows, every one OFF sale until the owner switches it on.
--    Priced by size (owner): under 100 pages Rs 49, 100-300 Rs 99, over 300
--    Rs 149, from the 2026-10-26 builds. Prices are data.

ALTER TABLE public.ebooks DROP CONSTRAINT ebooks_kind_check;
ALTER TABLE public.ebooks ADD CONSTRAINT ebooks_kind_check CHECK (kind IN ('formula', 'notes', 'pyq', 'papers', 'repeats'));

INSERT INTO public.ebooks (slug, title, subtitle, description, price_paise, kind, sort_order)
SELECT b.slug, b.title || ' Repeated PYQs',
  'Every question the board asked again, and every type it keeps asking, chapter by chapter, with a worked solution to each.',
  'Every ' || b.title || ' board question asked more than once, most-asked first, then the types of question the board keeps coming back to, chapter by chapter in textbook order. A line over each question says when it was asked. A worked solution to every question closes its chapter, with model answers for the written questions.',
  b.price, 'repeats', b.sort_order
FROM (VALUES
  ('mh-hsc-12-physics-repeated-pyqs', 'Maharashtra HSC Class 12 Physics', 9900, 200),
  ('mh-hsc-12-chemistry-repeated-pyqs', 'Maharashtra HSC Class 12 Chemistry', 9900, 201),
  ('mh-hsc-12-mathematics-repeated-pyqs', 'Maharashtra HSC Class 12 Mathematics', 9900, 202),
  ('mh-hsc-12-biology-repeated-pyqs', 'Maharashtra HSC Class 12 Biology', 4900, 203),
  ('mh-hsc-12-geography-repeated-pyqs', 'Maharashtra HSC Class 12 Geography', 4900, 204),
  ('mh-ssc-10-algebra-repeated-pyqs', 'Maharashtra SSC Class 10 Algebra', 4900, 210),
  ('mh-ssc-10-geometry-repeated-pyqs', 'Maharashtra SSC Class 10 Geometry', 4900, 211),
  ('mh-ssc-10-science-and-technology-i-repeated-pyqs', 'Maharashtra SSC Class 10 Science and Technology I', 4900, 212),
  ('mh-ssc-10-science-and-technology-ii-repeated-pyqs', 'Maharashtra SSC Class 10 Science and Technology II', 4900, 213),
  ('mh-ssc-10-history-repeated-pyqs', 'Maharashtra SSC Class 10 History', 4900, 214),
  ('mh-ssc-10-political-science-repeated-pyqs', 'Maharashtra SSC Class 10 Political Science', 4900, 215),
  ('mh-ssc-10-geography-repeated-pyqs', 'Maharashtra SSC Class 10 Geography', 4900, 216),
  ('cbse-10-mathematics-repeated-pyqs', 'CBSE Class 10 Mathematics', 9900, 220),
  ('cbse-10-science-repeated-pyqs', 'CBSE Class 10 Science', 9900, 221),
  ('cbse-12-physics-repeated-pyqs', 'CBSE Class 12 Physics', 14900, 230),
  ('cbse-12-chemistry-repeated-pyqs', 'CBSE Class 12 Chemistry', 9900, 231),
  ('cbse-12-mathematics-repeated-pyqs', 'CBSE Class 12 Mathematics', 9900, 232)
) AS b(slug, title, price, sort_order);

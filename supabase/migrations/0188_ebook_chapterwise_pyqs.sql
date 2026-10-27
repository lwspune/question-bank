-- 0188_ebook_chapterwise_pyqs.sql — Chapter-wise PYQs books for the boards (2026-10-27)
--
-- WHAT: a sixth kind of ebook, `chapterwise`: every board question of a
-- subject, chapter by chapter in textbook order, grouped by marks (1, 2, 3,
-- ...), then case studies and passages, then "Earlier years" (older questions
-- with no marks recorded; owner: keep them, apart), solutions at the end of
-- each chapter. CBSE (6) reads the same one paper a year as its Solved Papers
-- book; Maharashtra (12) reads every PYQ from its homework plan, repeats once.
-- What each prints is src/lib/ebooks/paperBooks.ts (CHAPTERWISE_EBOOKS) +
-- lib/ebooks/chapterwise.ts.
--
-- 1. `kind` gains 'chapterwise'; mirrors EbookKind in src/lib/ebooks/catalog.ts.
-- 2. Eighteen rows, every one OFF sale until the owner switches it on.
--    Priced by size (owner): under 100 pages Rs 49, 100-300 Rs 99, over 300
--    Rs 149, from the 2026-10-27 builds. Prices are data.

ALTER TABLE public.ebooks DROP CONSTRAINT ebooks_kind_check;
ALTER TABLE public.ebooks ADD CONSTRAINT ebooks_kind_check
  CHECK (kind IN ('formula', 'notes', 'pyq', 'papers', 'repeats', 'chapterwise'));

INSERT INTO public.ebooks (slug, title, subtitle, description, price_paise, kind, sort_order)
SELECT b.slug, b.title || ' Chapter-wise PYQs',
  CASE WHEN b.plan
    THEN 'Every board question, chapter by chapter, grouped by marks, with a worked solution to each.'
    ELSE 'One board paper from each year, regrouped chapter by chapter and by marks, with a worked solution to each.'
  END,
  CASE WHEN b.plan
    THEN 'Every ' || b.title || ' board question on PYQ Vault, chapter by chapter in textbook order. Within each chapter the 1-mark questions come first, then 2, 3 and more, then the case studies and passages, then questions from earlier years. A line over each question says when it was asked, and a question asked more than once is printed once. A worked solution to every question closes its chapter.'
    ELSE 'One ' || b.title || ' board paper from each year, regrouped chapter by chapter in textbook order. Within each chapter the 1-mark questions come first, then 2, 3 and 5 marks, then the case studies. A line over each question says which paper it came from. A worked solution to every question closes its chapter.'
  END,
  b.price, 'chapterwise', b.sort_order
FROM (VALUES
  ('mh-hsc-12-physics-chapterwise-pyqs', 'Maharashtra HSC Class 12 Physics', true, 14900, 300),
  ('mh-hsc-12-chemistry-chapterwise-pyqs', 'Maharashtra HSC Class 12 Chemistry', true, 14900, 301),
  ('mh-hsc-12-mathematics-chapterwise-pyqs', 'Maharashtra HSC Class 12 Mathematics', true, 14900, 302),
  ('mh-hsc-12-biology-chapterwise-pyqs', 'Maharashtra HSC Class 12 Biology', true, 9900, 303),
  ('mh-hsc-12-geography-chapterwise-pyqs', 'Maharashtra HSC Class 12 Geography', true, 9900, 304),
  ('mh-ssc-10-algebra-chapterwise-pyqs', 'Maharashtra SSC Class 10 Algebra', true, 4900, 310),
  ('mh-ssc-10-geometry-chapterwise-pyqs', 'Maharashtra SSC Class 10 Geometry', true, 9900, 311),
  ('mh-ssc-10-science-and-technology-i-chapterwise-pyqs', 'Maharashtra SSC Class 10 Science and Technology I', true, 9900, 312),
  ('mh-ssc-10-science-and-technology-ii-chapterwise-pyqs', 'Maharashtra SSC Class 10 Science and Technology II', true, 9900, 313),
  ('mh-ssc-10-history-chapterwise-pyqs', 'Maharashtra SSC Class 10 History', true, 4900, 314),
  ('mh-ssc-10-political-science-chapterwise-pyqs', 'Maharashtra SSC Class 10 Political Science', true, 4900, 315),
  ('mh-ssc-10-geography-chapterwise-pyqs', 'Maharashtra SSC Class 10 Geography', true, 9900, 316),
  ('cbse-10-mathematics-chapterwise-pyqs', 'CBSE Class 10 Mathematics', false, 9900, 320),
  ('cbse-10-science-chapterwise-pyqs', 'CBSE Class 10 Science', false, 9900, 321),
  ('cbse-12-physics-chapterwise-pyqs', 'CBSE Class 12 Physics', false, 9900, 330),
  ('cbse-12-chemistry-chapterwise-pyqs', 'CBSE Class 12 Chemistry', false, 9900, 331),
  ('cbse-12-mathematics-chapterwise-pyqs', 'CBSE Class 12 Mathematics', false, 4900, 332),
  ('cbse-12-biology-chapterwise-pyqs', 'CBSE Class 12 Biology', false, 9900, 333)
) AS b(slug, title, plan, price, sort_order);

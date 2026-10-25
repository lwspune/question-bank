-- 0186_ebook_solved_papers.sql — Solved Papers books for the boards (2026-10-26)
--
-- WHAT: a fourth kind of ebook, `papers`: a board subject's stored past papers
-- (0146), each printed as it was set and then solved under the same numbers.
-- One book per board subject with stored papers: Maharashtra HSC 12 (5) and
-- SSC 10 (6) carry every paper; CBSE 10 (2) and CBSE 12 (4) carry one paper a
-- year (the lowest paper code, its set 1), since all fifteen a year would make
-- a 1,300-3,500 page book (owner, 2026-10-25). What each prints is
-- src/lib/ebooks/catalog.ts (PAPERS_EBOOKS) + lib/ebooks/boardPapers.ts.
--
-- 1. `kind` gains 'papers'; mirrors EbookKind in src/lib/ebooks/catalog.ts.
-- 2. Seventeen rows, every one OFF sale until the owner switches it on
--    (ebooks_active_needs_file also refuses it before a master is uploaded).
--    Priced by size (owner): under 100 pages Rs 49, 100-300 Rs 99, over 300
--    Rs 149, from the 2026-10-26 builds. Prices are data: they change at
--    /dashboard/pricing without a migration.

ALTER TABLE public.ebooks DROP CONSTRAINT ebooks_kind_check;
ALTER TABLE public.ebooks ADD CONSTRAINT ebooks_kind_check CHECK (kind IN ('formula', 'notes', 'pyq', 'papers'));

INSERT INTO public.ebooks (slug, title, subtitle, description, price_paise, kind, sort_order)
SELECT b.slug, b.title || ' Solved Papers',
  CASE WHEN b.every
    THEN 'Every board paper, as it was set, with a worked solution to every question.'
    ELSE 'One board paper from each year, as it was set, with a worked solution to every question.'
  END,
  CASE WHEN b.every
    THEN 'Every ' || b.title || ' board paper on PYQ Vault, newest first, printed as it was set: its sections, its question numbers, the marks for each question and the OR choices. After each paper, a worked solution to every question under the same numbers, with model answers for the written questions. Sit a paper against the clock, then check.'
    ELSE 'One ' || b.title || ' board paper from each year, newest first, printed as it was set: its sections, its question numbers, the marks for each question, the OR choices and the case studies. After each paper, a worked solution to every question under the same numbers, with model answers for the written questions. Sit a paper against the clock, then check.'
  END,
  b.price, 'papers', b.sort_order
FROM (VALUES
  ('mh-hsc-12-physics-solved-papers', 'Maharashtra HSC Class 12 Physics', true, 9900, 100),
  ('mh-hsc-12-chemistry-solved-papers', 'Maharashtra HSC Class 12 Chemistry', true, 9900, 101),
  ('mh-hsc-12-mathematics-solved-papers', 'Maharashtra HSC Class 12 Mathematics', true, 9900, 102),
  ('mh-hsc-12-biology-solved-papers', 'Maharashtra HSC Class 12 Biology', true, 4900, 103),
  ('mh-hsc-12-geography-solved-papers', 'Maharashtra HSC Class 12 Geography', true, 4900, 104),
  ('mh-ssc-10-algebra-solved-papers', 'Maharashtra SSC Class 10 Algebra', true, 9900, 110),
  ('mh-ssc-10-geometry-solved-papers', 'Maharashtra SSC Class 10 Geometry', true, 9900, 111),
  ('mh-ssc-10-science-and-technology-i-solved-papers', 'Maharashtra SSC Class 10 Science and Technology I', true, 9900, 112),
  ('mh-ssc-10-science-and-technology-ii-solved-papers', 'Maharashtra SSC Class 10 Science and Technology II', true, 9900, 113),
  ('mh-ssc-10-history-solved-papers', 'Maharashtra SSC Class 10 History and Political Science', true, 9900, 114),
  ('mh-ssc-10-geography-solved-papers', 'Maharashtra SSC Class 10 Geography', true, 9900, 115),
  ('cbse-10-mathematics-solved-papers', 'CBSE Class 10 Mathematics', false, 9900, 120),
  ('cbse-10-science-solved-papers', 'CBSE Class 10 Science', false, 9900, 121),
  ('cbse-12-physics-solved-papers', 'CBSE Class 12 Physics', false, 9900, 130),
  ('cbse-12-chemistry-solved-papers', 'CBSE Class 12 Chemistry', false, 9900, 131),
  ('cbse-12-mathematics-solved-papers', 'CBSE Class 12 Mathematics', false, 4900, 132),
  ('cbse-12-biology-solved-papers', 'CBSE Class 12 Biology', false, 9900, 133)
) AS b(slug, title, every, price, sort_order);

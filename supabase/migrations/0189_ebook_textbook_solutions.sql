-- 0189_ebook_textbook_solutions.sql — Textbook Solutions books for the boards (2026-10-27)
--
-- WHAT: a seventh kind of ebook, `textbook`: one board textbook's exercises in
-- the book's own order (the /board reader's section -> block -> question,
-- read through its own loaders), each question under the book's number with
-- its worked solution right under it. One per board subject with textbook
-- questions on /board (33 books). A textbook over about 500 pages is cut at the
-- textbook's own Part I / Part II, which Balbharati prints as two books: HSC 12
-- Mathematics and MH Class 11 Mathematics (835 pages whole). What each prints is
-- src/lib/ebooks/paperBooks.ts (TEXTBOOK_EBOOKS).
--
-- 1. `kind` gains 'textbook'; mirrors EbookKind in src/lib/ebooks/catalog.ts.
-- 2. Thirty-three rows, every one OFF sale until the owner switches it on.
--    Priced by size (owner): under 100 pages Rs 49, 100-300 Rs 99, over 300
--    Rs 149, from the 2026-10-27 builds. Prices are data.

ALTER TABLE public.ebooks DROP CONSTRAINT ebooks_kind_check;
ALTER TABLE public.ebooks ADD CONSTRAINT ebooks_kind_check
  CHECK (kind IN ('formula', 'notes', 'pyq', 'papers', 'repeats', 'chapterwise', 'textbook'));

INSERT INTO public.ebooks (slug, title, subtitle, description, price_paise, kind, sort_order)
SELECT b.slug, b.title || ' Textbook Solutions',
  'Every textbook exercise in the book''s own order, with a worked solution right under each question.',
  'Every exercise of the ' || b.title || ' textbook, in the book''s own order: each chapter''s solved examples, exercises and miscellaneous exercise as the book prints them. Each question carries the book''s own number, with a worked solution right under it.',
  b.price, 'textbook', b.sort_order
FROM (VALUES
  ('mh-hsc-12-mathematics-part-1-textbook-solutions', 'Maharashtra HSC Class 12 Mathematics Part I', 14900, 400),
  ('mh-hsc-12-mathematics-part-2-textbook-solutions', 'Maharashtra HSC Class 12 Mathematics Part II', 14900, 401),
  ('mh-hsc-12-physics-textbook-solutions', 'Maharashtra HSC Class 12 Physics', 14900, 402),
  ('mh-hsc-12-chemistry-textbook-solutions', 'Maharashtra HSC Class 12 Chemistry', 14900, 403),
  ('mh-hsc-12-biology-textbook-solutions', 'Maharashtra HSC Class 12 Biology', 9900, 404),
  ('mh-hsc-12-geography-textbook-solutions', 'Maharashtra HSC Class 12 Geography', 9900, 405),
  ('mh-sb-11-mathematics-part-1-textbook-solutions', 'Maharashtra Class 11 Mathematics Part I', 14900, 410),
  ('mh-sb-11-mathematics-part-2-textbook-solutions', 'Maharashtra Class 11 Mathematics Part II', 14900, 411),
  ('mh-sb-11-physics-textbook-solutions', 'Maharashtra Class 11 Physics', 14900, 412),
  ('mh-sb-11-chemistry-textbook-solutions', 'Maharashtra Class 11 Chemistry', 14900, 413),
  ('mh-sb-11-biology-textbook-solutions', 'Maharashtra Class 11 Biology', 9900, 414),
  ('mh-ssc-10-algebra-textbook-solutions', 'Maharashtra SSC Class 10 Algebra', 9900, 420),
  ('mh-ssc-10-geometry-textbook-solutions', 'Maharashtra SSC Class 10 Geometry', 9900, 421),
  ('mh-ssc-10-science-and-technology-i-textbook-solutions', 'Maharashtra SSC Class 10 Science and Technology I', 9900, 422),
  ('mh-ssc-10-science-and-technology-ii-textbook-solutions', 'Maharashtra SSC Class 10 Science and Technology II', 9900, 423),
  ('mh-ssc-10-history-textbook-solutions', 'Maharashtra SSC Class 10 History', 4900, 424),
  ('mh-ssc-10-political-science-textbook-solutions', 'Maharashtra SSC Class 10 Political Science', 4900, 425),
  ('mh-ssc-10-geography-textbook-solutions', 'Maharashtra SSC Class 10 Geography', 4900, 426),
  ('mh-sb-9-mathematics-textbook-solutions', 'Maharashtra Class 9 Mathematics', 14900, 430),
  ('mh-sb-9-geography-textbook-solutions', 'Maharashtra Class 9 Geography', 4900, 431),
  ('mh-sb-9-history-textbook-solutions', 'Maharashtra Class 9 History', 4900, 432),
  ('mh-sb-9-political-science-textbook-solutions', 'Maharashtra Class 9 Political Science', 4900, 433),
  ('cbse-12-mathematics-textbook-solutions', 'CBSE Class 12 Mathematics', 14900, 440),
  ('cbse-12-physics-textbook-solutions', 'CBSE Class 12 Physics', 9900, 441),
  ('cbse-12-chemistry-textbook-solutions', 'CBSE Class 12 Chemistry', 9900, 442),
  ('cbse-12-biology-textbook-solutions', 'CBSE Class 12 Biology', 9900, 443),
  ('cbse-11-mathematics-textbook-solutions', 'CBSE Class 11 Mathematics', 9900, 450),
  ('cbse-11-physics-textbook-solutions', 'CBSE Class 11 Physics', 9900, 451),
  ('cbse-11-chemistry-textbook-solutions', 'CBSE Class 11 Chemistry', 9900, 452),
  ('cbse-11-biology-textbook-solutions', 'CBSE Class 11 Biology', 9900, 453),
  ('cbse-10-mathematics-textbook-solutions', 'CBSE Class 10 Mathematics', 9900, 460),
  ('cbse-10-science-textbook-solutions', 'CBSE Class 10 Science', 9900, 461),
  ('cbse-10-social-science-textbook-solutions', 'CBSE Class 10 Social Science', 9900, 462)
) AS b(slug, title, price, sort_order);

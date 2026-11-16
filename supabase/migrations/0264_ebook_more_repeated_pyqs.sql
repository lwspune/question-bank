-- 0264_ebook_more_repeated_pyqs.sql — Repeated PYQs for JEE Mains, MHT-CET, SSC CGL and CBSE 12 Biology (2026-11-16)
--
-- WHY: after the store's first 10 sales, every one a board book of the
-- Repeated PYQs or Chapter-wise PYQs kind, the owner kept only those two kinds
-- on sale and asked for the same book for the competitive exams. The payers
-- with the most students (JEE Mains, then SSC CGL) had no book at all, and
-- every subject below already has a published homework plan, which is what a
-- Repeated PYQs book is built from (lib/ebooks/repeats). CBSE 12 Biology's plan
-- did not exist when 0187 seeded the board books.
--
-- WHAT: eleven `repeats` rows, every one OFF sale until the owner switches it
-- on. What each prints is src/lib/ebooks/paperBooks.ts (REPEATS_EBOOKS). The
-- SSC general subjects (History, Geography, Polity, Economics, Physics,
-- Chemistry, Biology) are ONE book, a chapter per subject: each alone carries
-- 8 to 67 repeated questions. Priced by size, the owner's rule from 0187:
-- under 100 pages Rs 49, 100-300 Rs 99, over 300 Rs 149, from the 2026-11-16
-- builds. Prices are data and change at /dashboard without a deploy.
--
-- Sort order puts each CET book beside its subject's other CET books, and the
-- JEE and SSC books in their own ranges; the store groups them into shelves by
-- slug (lib/ebooks/shelves), so sort_order only orders books within a shelf.

INSERT INTO public.ebooks (slug, title, subtitle, description, price_paise, kind, sort_order)
SELECT b.slug, b.title || ' Repeated PYQs', b.subtitle,
  'Every ' || b.title || ' question asked more than once, most-asked first, then the types of question ' || b.examiner || ' keeps coming back to, '
    || CASE WHEN b.slug LIKE '%general-awareness%' THEN 'subject by subject' ELSE 'chapter by chapter' END
    || '. A line over each question says when it was asked. A worked solution to every question closes its chapter.',
  b.price, 'repeats', b.sort_order
FROM (VALUES
  ('cbse-12-biology-repeated-pyqs', 'CBSE Class 12 Biology', 'the board',
    'Every question the board asked again, and every type it keeps asking, chapter by chapter, with a worked solution to each.', 9900, 233),
  ('mht-cet-maths-repeated-pyqs', 'MHT-CET Mathematics', 'MHT-CET',
    'Every question MHT-CET asked again, and every type it keeps asking, chapter by chapter, with a worked solution to each.', 9900, 25),
  ('mht-cet-physics-repeated-pyqs', 'MHT-CET Physics', 'MHT-CET',
    'Every question MHT-CET asked again, and every type it keeps asking, chapter by chapter, with a worked solution to each.', 14900, 45),
  ('mht-cet-chemistry-repeated-pyqs', 'MHT-CET Chemistry', 'MHT-CET',
    'Every question MHT-CET asked again, and every type it keeps asking, chapter by chapter, with a worked solution to each.', 9900, 65),
  ('jee-mains-maths-repeated-pyqs', 'JEE Mains Mathematics', 'JEE Mains',
    'Every question JEE Mains asked again, and every type it keeps asking, chapter by chapter, with a worked solution to each.', 9900, 100),
  ('jee-mains-physics-repeated-pyqs', 'JEE Mains Physics', 'JEE Mains',
    'Every question JEE Mains asked again, and every type it keeps asking, chapter by chapter, with a worked solution to each.', 14900, 101),
  ('jee-mains-chemistry-repeated-pyqs', 'JEE Mains Chemistry', 'JEE Mains',
    'Every question JEE Mains asked again, and every type it keeps asking, chapter by chapter, with a worked solution to each.', 14900, 102),
  ('ssc-cgl-quantitative-aptitude-repeated-pyqs', 'SSC CGL Quantitative Aptitude', 'SSC CGL',
    'Every question SSC CGL asked again, and every type it keeps asking, chapter by chapter, with a worked solution to each.', 9900, 110),
  ('ssc-cgl-reasoning-repeated-pyqs', 'SSC CGL Reasoning', 'SSC CGL',
    'Every question SSC CGL asked again, and every type it keeps asking, chapter by chapter, with a worked solution to each.', 9900, 111),
  ('ssc-cgl-english-repeated-pyqs', 'SSC CGL English', 'SSC CGL',
    'Every question SSC CGL asked again, and every type it keeps asking, chapter by chapter, with a worked solution to each.', 4900, 112),
  ('ssc-cgl-general-awareness-repeated-pyqs', 'SSC CGL General Awareness', 'SSC CGL',
    'Every question SSC CGL asked again, and every type it keeps asking, subject by subject, with a worked solution to each.', 4900, 113)
) AS b(slug, title, examiner, subtitle, price, sort_order);

-- 0279_ebook_homi_bhabha.sql — the Homi Bhabha Class 9 books (2026-11-21)
--
-- WHY: the owner asked for ebooks for the Homi Bhabha exam (MSTA's science
-- competition), whose 8 Std IX papers (797 questions, 2010-2024) and 32 notes
-- chapters went PUBLIC on 2026-11-19. The exam itself stays free on the site;
-- the books are sold like every other book. Owner, 2026-11-21: ONE combined
-- book for the whole paper (it is one paper of four subjects; General Science
-- alone has 59 questions), Rs 149, the "Science and Technology in the News"
-- chapter kept, and a Notes Book from the notes chapters too.
--
-- WHAT: two rows, both OFF sale (the column's default) until the owner has
-- read the PDFs and switches them on. What each prints is code:
--   * homi-bhabha-9-chapterwise-pyqs (src/lib/ebooks/paperBooks.ts): every
--     PUBLIC past question, read from the bank (the exam has no homework plan
--     and no stored papers), chapter by chapter in a pinned order, Physics,
--     Chemistry, Biology, General Science in turn, newest paper first.
--   * homi-bhabha-9-notes (src/lib/ebooks/catalog.ts): the four notes subjects
--     in the same order. Rs 49, the price of every other Notes Book; prices are
--     data and change without a deploy.
-- Sort order puts them after the board books (the CBSE Class 10 ones end in
-- the 300s); the store shelves books by slug (lib/ebooks/shelves).

INSERT INTO public.ebooks (slug, title, subtitle, description, price_paise, kind, sort_order) VALUES
  ('homi-bhabha-9-chapterwise-pyqs', 'Homi Bhabha Class 9 Science Chapter-wise PYQs',
   'Every past question, chapter by chapter from Physics to General Science, with a worked solution to each.',
   'Every Homi Bhabha Std IX question on PYQ Vault, from eight papers set between 2010 and 2024, chapter by chapter: Physics, then Chemistry, Biology and General Science. Within each chapter the newest paper comes first, and a line over each question says when it was asked. A worked solution to every question closes its chapter.',
   14900, 'chapterwise', 900),
  ('homi-bhabha-9-notes', 'Homi Bhabha Class 9 Science Notes Book',
   'Every chapter taught from the start, Physics to General Science: the idea, the definition, a worked example and the traps.',
   'Each topic is taught as a short lesson: the idea in plain words, the definition, the formula or the facts to know, a worked example step by step, a problem to try (answers at the end of the chapter) and the traps. Physics, then Chemistry, Biology and General Science.',
   4900, 'notes', 901);

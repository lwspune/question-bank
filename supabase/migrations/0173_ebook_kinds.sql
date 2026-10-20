-- 0173_ebook_kinds.sql — three kinds of ebook (2026-10-20)
--
-- WHAT: the owner split the store's one combined book into three kinds, sold
-- separately: a Formula Book (Rs 49) and a Notes Book (Rs 49) per subject,
-- built from the /notes chapters, and a PYQ Book (Rs 149), every past
-- question with full solutions. First round: formulas and notes for MHT-CET
-- Maths, Physics and Chemistry, and the Maths PYQ book. No bundle.
--
-- 1. `kind` (formula | notes | pyq) decides the book's colour, cover and
--    "what is inside" copy on the store; mirrors EbookKind in
--    src/lib/ebooks/catalog.ts, which also holds what each book prints.
-- 2. `stats`: the cover's four numbers ([{ value, label }]), recorded by the
--    build so the store shows the same numbers the cover prints.
-- 3. The seeded 'mht-cet-maths' (0172, the combined book) becomes
--    'mht-cet-maths-pyq', its build fields cleared: that master was the old
--    design with formulas inside, superseded before anything was sold. No
--    purchase references it (0172 was never on sale), which is what lets the
--    primary key change.
-- 4. Six more books, every one OFF sale until the owner switches it on.

ALTER TABLE public.ebooks
  ADD COLUMN kind text NOT NULL DEFAULT 'pyq' CHECK (kind IN ('formula', 'notes', 'pyq')),
  ADD COLUMN stats jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(stats) = 'array');

UPDATE public.ebooks
SET slug = 'mht-cet-maths-pyq',
    title = 'MHT-CET Mathematics PYQ Book',
    subtitle = 'Every MHT-CET Maths past question 2021-2026, chapter by chapter, with a worked solution to each.',
    description = 'Each chapter opens with its topics, then every past question in the order it was asked, grouped by topic. The answer key and a worked solution to every question close the chapter. Questions asked more than once are printed once, with every sitting they appeared in.',
    kind = 'pyq',
    active = false,
    file_path = NULL,
    sample_path = NULL,
    version = 0,
    page_count = NULL,
    question_count = NULL,
    contents = '[]'::jsonb,
    built_at = NULL,
    sort_order = 30
WHERE slug = 'mht-cet-maths';

INSERT INTO public.ebooks (slug, title, subtitle, description, price_paise, kind, sort_order) VALUES
  ('mht-cet-maths-formulas', 'MHT-CET Mathematics Formula Book',
   'Every MHT-CET Maths formula, table and common trap, chapter by chapter, with what each symbol means.',
   'Each chapter gathers its formulas topic by topic, with a line on what every symbol means, the reference tables, and the traps that cost marks, each explained. In textbook order, Class XI then XII.',
   4900, 'formula', 10),
  ('mht-cet-maths-notes', 'MHT-CET Mathematics Notes Book',
   'Every MHT-CET Maths chapter taught from the start: the idea, the definition, the formula, a worked example and the traps.',
   'Each topic is taught as a short lesson: the idea in plain words, the definition, the formula, a worked example step by step, a problem to try (answers at the end of the chapter) and the traps. In textbook order, Class XI then XII.',
   4900, 'notes', 20),
  ('mht-cet-physics-formulas', 'MHT-CET Physics Formula Book',
   'Every MHT-CET Physics formula, table and common trap, chapter by chapter, with what each symbol means.',
   'Each chapter gathers its formulas topic by topic, with a line on what every symbol means, the reference tables, and the traps that cost marks, each explained. In textbook order, Class XI then XII.',
   4900, 'formula', 40),
  ('mht-cet-physics-notes', 'MHT-CET Physics Notes Book',
   'Every MHT-CET Physics chapter taught from the start: the idea, the definition, the formula, a worked example and the traps.',
   'Each topic is taught as a short lesson: the idea in plain words, the definition, the formula, a worked example step by step, a problem to try (answers at the end of the chapter) and the traps. In textbook order, Class XI then XII.',
   4900, 'notes', 50),
  ('mht-cet-chemistry-formulas', 'MHT-CET Chemistry Formula Book',
   'Every MHT-CET Chemistry formula, table and common trap, chapter by chapter, with what each symbol means.',
   'Each chapter gathers its formulas and named facts topic by topic, with a line on what every symbol means, the reference tables, and the traps that cost marks, each explained. In textbook order, Class XI then XII.',
   4900, 'formula', 60),
  ('mht-cet-chemistry-notes', 'MHT-CET Chemistry Notes Book',
   'Every MHT-CET Chemistry chapter taught from the start: the idea, the definition, the formula, a worked example and the traps.',
   'Each topic is taught as a short lesson: the idea in plain words, the definition, the formula or the facts to know, a worked example step by step, a problem to try (answers at the end of the chapter) and the traps. In textbook order, Class XI then XII.',
   4900, 'notes', 70)
ON CONFLICT (slug) DO NOTHING;

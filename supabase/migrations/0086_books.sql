-- 0086_books.sql
--
-- BOOKS: curated, orderable PYQ books assembled from questions already in the
-- bank. The first is the NDA/CDS English PYQ Master — 8 chapters, each laid out
-- as "NDA PYQ" then "CDS PYQ", oldest-first.
--
-- WHY A TABLE AT ALL. Phase 1 rendered the book as a pure derived view and
-- stored nothing. That is the right default and it stops being enough the
-- moment the book can be CURATED — a question excluded, a passage moved, a set
-- reordered. Those are decisions, and a decision that lives only in a chat log
-- is lost.
--
-- MATERIALISED MEMBERSHIP, NOT SPARSE OVERRIDES. Every in-scope question gets a
-- row, seeded once from the derived order. Storing only DEVIATIONS sounds
-- cheaper and collapses as soon as anything is reordered: there is no coherent
-- answer to where an unpinned question sits relative to a pinned one. 3,180
-- rows is nothing, and it makes "what is in this book, in what order" a single
-- ordered read rather than a merge of two models.
--
-- `excluded` IS A FLAG, NEVER A DELETED ROW. If exclusion meant absence, then
-- absence would mean two different things — "never seen" and "deliberately
-- dropped" — and the next sync would silently re-add everything already
-- rejected. Same reasoning that keeps an unassessed syllabus pair as the
-- ABSENCE of a row rather than a default verdict.
--
-- `chapter_slug` IS THE BOOK'S OWN STRUCTURE, not the bank's. A question's
-- chapter_id says where it sits in the taxonomy; this says where it sits in
-- THIS book. They start equal and phase 3 lets them diverge, which is what
-- makes "move this question to another chapter" possible without editing the
-- bank and changing what every other surface shows.
--
-- `position` IS FRACTIONAL, deliberately — the same device as
-- `paper_questions.position` and `subtopics.order_index`. Inserting or moving a
-- row is then a single UPDATE of one row rather than a renumber of its
-- neighbours. `src/lib/papers/sections.ts` already holds the tested pure core
-- (positionBetween / positionForMove) and phase 3 reuses it.
--
-- LOCKED RLS: enabled, NO policies — service-role only. A book is a
-- superadmin artifact; the pages that read it are gated by requireSuperadmin(),
-- and writes go through server actions behind the same gate. Same pattern as
-- platform_admins (0056), entitlements (0026) and teacher_access_requests
-- (0060). Expect the `rls_enabled_no_policy` advisor INFO — it is the design.

CREATE TABLE public.books (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Matches BookDefinition.slug in src/lib/books/registry.ts. The registry
  -- stays the source of truth for a book's IDENTITY (title, subject, exams,
  -- chapter list); this table holds only its assembled, curated CONTENTS.
  slug        text NOT NULL UNIQUE,
  status      text NOT NULL DEFAULT 'draft'
                CHECK (status IN ('draft', 'finalized')),
  -- When the contents were last rebuilt from the bank. Null = never assembled,
  -- which the reader reports as such rather than falling back to a derived
  -- order — a silent fallback would hide a sync that never ran.
  synced_at   timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.book_questions (
  book_id      uuid NOT NULL REFERENCES public.books(id)     ON DELETE CASCADE,
  question_id  uuid NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  -- The book's own placement. Both are free text rather than FKs because they
  -- name the BOOK's structure (a registry chapter slug, and "nda"/"cds"), which
  -- has no table of its own.
  chapter_slug text NOT NULL,
  section_key  text NOT NULL,
  position     double precision NOT NULL,
  excluded     boolean NOT NULL DEFAULT false,
  -- Why a curation decision was made, for whoever reads the book next.
  note         text,
  added_at     timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (book_id, question_id)
);

-- The reader's only query: one chapter, in book order. The PK is (book_id,
-- question_id), which cannot serve it.
CREATE INDEX book_questions_order_idx
  ON public.book_questions (book_id, chapter_slug, section_key, position);

ALTER TABLE public.book_questions ENABLE ROW LEVEL SECURITY;

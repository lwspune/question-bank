-- 0263_articles.sql
--
-- Articles kept in the database, so a blog post or an exam's syllabus page goes
-- live without a git push (owner, 2026-11-16).
--
-- Before this, every /blog post was a TSX module in the repo (three of them,
-- src/app/blog/_posts/), so publishing one meant a branch, the gate, a merge, a
-- push and a ~13 min GitHub build. The /blog skill writes an article as a DRAFT
-- row by script; the owner reads it on the real page at
-- /dashboard/blog/<slug> and taps Publish, which clears the cached pages. The
-- three code posts stay in code; the site lists both (lib/blog/catalog.ts).
--
-- WHO SEES WHAT:
--   * anon + authenticated read PUBLISHED rows only (RLS), and only the columns
--     a page shows (column grants). `pending` (an edit to a published article,
--     waiting for the owner's OK) and `watch` (what would make it stale) are not
--     granted: an unapproved edit must not be readable through the API before
--     it is on the page.
--   * Writes: the service role only (the draft script and the superadmin
--     Publish route). No write policy exists, so no JWT can write.
--
-- THE RULES LIVE HERE, not only in the script (lib/blog/articleBody.ts
-- validateArticle mirrors them so a dry run catches what the INSERT would):
-- slug shape, the three kinds, title/description lengths (what a search result
-- shows), no em dashes in what a reader sees (owner rule 2026-10-05), a
-- published row must carry its publish date, and one evergreen page per exam.
--
-- kinds: 'news' (an announcement: a date, a result, a change), 'data' (an
-- analysis built on the bank's numbers), 'evergreen' (an exam's pattern,
-- syllabus and marks page, at /exams/<exam>/syllabus rather than /blog). The
-- growth experiment `blog-posts` compares them (scripts/blog/readout.sql).

CREATE TABLE public.articles (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text NOT NULL UNIQUE
                    CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' AND length(slug) <= 90),
  kind            text NOT NULL CHECK (kind IN ('news', 'data', 'evergreen')),
  exam_slug       text CHECK (exam_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title           text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 20 AND 70),
  description     text NOT NULL CHECK (char_length(btrim(description)) BETWEEN 70 AND 160),
  body            text NOT NULL CHECK (char_length(btrim(body)) >= 100),
  tags            text[] NOT NULL CHECK (cardinality(tags) BETWEEN 1 AND 8),
  faq             jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(faq) = 'array'),
  sources         jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(sources) = 'array'),
  watch           text CHECK (watch IS NULL OR char_length(watch) <= 300),
  reading_minutes integer NOT NULL CHECK (reading_minutes BETWEEN 1 AND 120),
  status          text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  date_published  date,
  date_modified   date,
  pending         jsonb CHECK (pending IS NULL OR jsonb_typeof(pending) = 'object'),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT articles_published_has_date CHECK (status = 'draft' OR date_published IS NOT NULL),
  CONSTRAINT articles_modified_after_published CHECK (date_modified IS NULL OR date_modified >= date_published),
  CONSTRAINT articles_evergreen_has_exam CHECK (kind <> 'evergreen' OR exam_slug IS NOT NULL),
  -- An em dash, or a spaced en dash / double hyphen, which read the same.
  CONSTRAINT articles_no_dashes CHECK (
    title !~ '(—|\s–\s|\s--\s)'
    AND description !~ '(—|\s–\s|\s--\s)'
    AND body !~ '(—|\s–\s|\s--\s)'
  )
);

COMMENT ON TABLE public.articles IS
  'Blog posts and exam syllabus pages written by the /blog skill (0263). Draft until the superadmin publishes at /dashboard/blog.';
COMMENT ON COLUMN public.articles.pending IS
  'An edit to a PUBLISHED article waiting for the owner''s OK: the same keys as the live columns. Not granted to anon.';

-- One evergreen page per exam: /exams/<exam>/syllabus reads exactly one row.
CREATE UNIQUE INDEX articles_one_evergreen_per_exam ON public.articles (exam_slug) WHERE kind = 'evergreen';
CREATE INDEX articles_published_idx ON public.articles (status, date_published DESC);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.articles FROM anon, authenticated;
GRANT SELECT (
  id, slug, kind, exam_slug, title, description, body, tags, faq, sources,
  reading_minutes, status, date_published, date_modified
) ON public.articles TO anon, authenticated;

CREATE POLICY articles_select_published ON public.articles
  FOR SELECT TO anon, authenticated
  USING (status = 'published');

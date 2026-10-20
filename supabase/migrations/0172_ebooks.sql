-- 0172_ebooks.sql — the ebook store (2026-10-20)
--
-- WHAT: whole-subject books (formulas + every past question, chapter by
-- chapter, with solutions) sold one at a time as PDFs, apart from the Premium
-- Pass. It is an experiment for printed books (owner's idea): which book will
-- students pay for, at what price, and would they want it printed. So books
-- are NOT a pass scope: a pass holder gets 20% off, never the book.
--
-- FOUR TABLES AND A BUCKET:
--
-- 1. ebooks — the catalogue. One row per book; the PDF itself lives in the
--    private `ebooks` bucket and `file_path` names the current master. The
--    master is printed once, offline (scripts/ebooks/build.ts), because a
--    book of several hundred pages cannot be printed inside a request.
--    `version` moves when the master is rebuilt, so a buyer's stamped copy of
--    an older master is re-stamped on their next download. Anyone may read an
--    ACTIVE row; a book is switched on by hand once its master is built.
--
-- 2. ebook_purchases — one row per purchase. Written only by the grant
--    (service role) from the Razorpay order notes, as the pass is. TWO unique
--    rules: payment_id (the webhook and client verify racing on one payment
--    record it once) and (user_id, ebook_slug) among ACTIVE rows (a buyer owns
--    a book once; a refunded row is kept, marked revoked, and the book can be
--    bought again). `stamped_path`/`stamped_version` cache the buyer's copy.
--
-- 3. ebook_downloads — one row per download served. A trigger refuses the
--    sixth for a purchase: the stamped copy carries the buyer's email, and the
--    cap stops one purchase becoming a link a class passes around. The rule
--    lives here, not in the route, so no caller can skip it.
--
-- 4. ebook_print_interest — "Want this as a printed book?" (Option A, owner
--    2026-10-20: a free tap, no money). One row per buyer per book; an
--    optional six-digit Indian pincode. Only a buyer may write one, enforced
--    by the insert/update policies, so the count means "people who paid for
--    the ebook and want it printed".
--
-- RLS: catalogue public-for-active; purchases own-row read; downloads no
-- policies (service role only); print interest own-row read/write gated on
-- an active purchase.

CREATE TABLE public.ebooks (
  slug            text PRIMARY KEY CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title           text NOT NULL CHECK (char_length(title) BETWEEN 1 AND 200),
  subtitle        text NOT NULL DEFAULT '' CHECK (char_length(subtitle) <= 400),
  -- Shown on the store page: what is inside, in a few lines.
  description     text NOT NULL DEFAULT '' CHECK (char_length(description) <= 2000),
  price_paise     integer NOT NULL CHECK (price_paise > 0),
  active          boolean NOT NULL DEFAULT false,
  -- Storage paths inside the `ebooks` bucket; null until the first build.
  file_path       text,
  sample_path     text,
  version         integer NOT NULL DEFAULT 0 CHECK (version >= 0),
  page_count      integer CHECK (page_count IS NULL OR page_count > 0),
  question_count  integer CHECK (question_count IS NULL OR question_count > 0),
  -- The chapters, in print order, for the store page's contents list:
  -- [{ "name": "Vectors", "questions": 334, "page": 12 }, ...]
  contents        jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(contents) = 'array'),
  built_at        timestamptz,
  sort_order      integer NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now(),
  -- A book cannot be sold before its master exists.
  CONSTRAINT ebooks_active_needs_file CHECK (NOT active OR file_path IS NOT NULL)
);

COMMENT ON TABLE public.ebooks IS
  'Ebook store catalogue (migration 0172). The PDF master lives in the private ebooks bucket at file_path; version moves on each rebuild. Written by scripts/ebooks/build.ts (service role).';

ALTER TABLE public.ebooks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ebooks_select_active"
  ON public.ebooks FOR SELECT
  TO anon, authenticated
  USING (active);

CREATE TABLE public.ebook_purchases (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ebook_slug       text NOT NULL REFERENCES public.ebooks(slug),
  amount_paise     integer NOT NULL CHECK (amount_paise > 0),
  payment_id       text NOT NULL UNIQUE CHECK (char_length(payment_id) BETWEEN 1 AND 100),
  status           text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'revoked')),
  stamped_path     text,
  stamped_version  integer,
  created_at       timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX ebook_purchases_one_active_per_book
  ON public.ebook_purchases (user_id, ebook_slug)
  WHERE status = 'active';

CREATE INDEX ebook_purchases_slug_idx ON public.ebook_purchases (ebook_slug);

COMMENT ON TABLE public.ebook_purchases IS
  'One row per ebook purchase (migration 0172). Written by the Razorpay grant (service role) only. payment_id unique; one ACTIVE row per user and book; a refund marks the row revoked.';

ALTER TABLE public.ebook_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ebook_purchases_select_own"
  ON public.ebook_purchases FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE TABLE public.ebook_downloads (
  id           bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  purchase_id  uuid NOT NULL REFERENCES public.ebook_purchases(id) ON DELETE CASCADE,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX ebook_downloads_purchase_idx ON public.ebook_downloads (purchase_id);

ALTER TABLE public.ebook_downloads ENABLE ROW LEVEL SECURITY;

-- Mirrors MAX_EBOOK_DOWNLOADS in src/lib/ebooks/downloads.ts.
CREATE FUNCTION private.ebook_download_cap() RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  -- Serialise downloads of one purchase so two at once cannot both be the fifth.
  PERFORM pg_advisory_xact_lock(hashtext(NEW.purchase_id::text));
  IF (SELECT count(*) FROM public.ebook_downloads WHERE purchase_id = NEW.purchase_id) >= 5 THEN
    RAISE EXCEPTION 'ebook download limit reached' USING ERRCODE = 'P0001', HINT = 'ebook_download_limit';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER ebook_downloads_cap
  BEFORE INSERT ON public.ebook_downloads
  FOR EACH ROW EXECUTE FUNCTION private.ebook_download_cap();

CREATE TABLE public.ebook_print_interest (
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ebook_slug  text NOT NULL REFERENCES public.ebooks(slug),
  pincode     text CHECK (pincode IS NULL OR pincode ~ '^[1-9][0-9]{5}$'),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, ebook_slug)
);

COMMENT ON TABLE public.ebook_print_interest IS
  'Buyers who tapped "Want this as a printed book?" (migration 0172), with an optional pincode. Only a buyer of the ebook may write a row.';

ALTER TABLE public.ebook_print_interest ENABLE ROW LEVEL SECURITY;

CREATE FUNCTION private.owns_ebook(p_slug text) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.ebook_purchases
    WHERE user_id = auth.uid() AND ebook_slug = p_slug AND status = 'active'
  );
$$;

REVOKE ALL ON FUNCTION private.owns_ebook(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.owns_ebook(text) TO authenticated;

CREATE POLICY "ebook_print_interest_select_own"
  ON public.ebook_print_interest FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "ebook_print_interest_insert_buyer"
  ON public.ebook_print_interest FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid() AND private.owns_ebook(ebook_slug));

CREATE POLICY "ebook_print_interest_update_buyer"
  ON public.ebook_print_interest FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid() AND private.owns_ebook(ebook_slug));

GRANT SELECT ON public.ebooks TO anon, authenticated;
GRANT SELECT ON public.ebook_purchases TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.ebook_print_interest TO authenticated;

-- ── The PDFs ────────────────────────────────────────────────────────────────
-- Private, no storage policies: the master and each buyer's stamped copy are
-- reached only through a short-lived signed link the download route makes
-- after checking the purchase. 200 MB per file: a master with every figure
-- inlined runs to tens of MB.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('ebooks', 'ebooks', false, 209715200, ARRAY['application/pdf'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ── The first book ──────────────────────────────────────────────────────────
-- Inactive until its master is built and the owner has looked at it.
INSERT INTO public.ebooks (slug, title, subtitle, description, price_paise, sort_order)
VALUES (
  'mht-cet-maths',
  'MHT-CET Mathematics: Formula Book + Chapter-wise PYQs',
  'Every MHT-CET Maths past question 2021-2026, chapter by chapter, with formulas and full solutions.',
  'Each chapter opens with its formulas, tables and common traps, then every past question in the order it was asked, grouped by topic. Answers and worked solutions close each chapter. Questions asked more than once are printed once, with every sitting they appeared in.',
  14900,
  1
)
ON CONFLICT (slug) DO NOTHING;

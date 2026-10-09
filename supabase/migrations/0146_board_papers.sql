-- 0146_board_papers.sql
--
-- Whole board past papers (2026-10-09): /question-papers.
--
-- WHY. Board students (MH HSC 12, CBSE 12, MH SSC 10: a quarter of the last
-- month's signups) had no whole past paper anywhere on the site, while entrance
-- students download theirs as mocks. A board paper is mostly written answers
-- with "attempt any N" and "OR" choices, so it cannot be a mock (nothing can
-- grade it) and does not belong in mock_tests, whose every surface assumes a
-- paper can be sat and scored.
--
-- WHY STORED. The bank keeps each question once. A CBSE set shares most of its
-- questions with the other two sets of its group, and a shared question was
-- committed only against the first set, so a paper cannot be read back from the
-- bank. Each paper's full transcription survives in its pipeline's data folder;
-- scripts/question-papers/build.ts turns it into the rows here (pure core
-- src/lib/questionPapers/manifest.ts), naming each bank question by the same
-- fingerprint the commit used. No question text is copied: a fix to a question
-- shows in every paper that uses it.
--
-- MARKS LIVE ON THE ITEM, not the question (the 0063 rule): the same question
-- can be worth 3 marks in one paper and 4 in another.
--
-- RULES THE DATABASE ENFORCES (the builder checks them too):
--   * an item's question is PUBLIC and belongs to the paper's exam and subject
--     (trigger), since the page and the download are public;
--   * an "OR" alternative points at an earlier position of the same paper;
--   * a question in a paper cannot be deleted (ON DELETE RESTRICT). An ingest
--     repair that deletes and re-commits a row stops with an FK error naming
--     this table, rather than leaving a paper one question short. Re-run the
--     builder after the repair (it replaces a paper's items in one transaction).
--
-- ACCESS. Everyone may read a PUBLISHED paper and its items; there are no write
-- policies. Papers are written by the service-role builder only, through
-- board_paper_replace (one transaction).
--
-- DOWNLOADS. export_events gains mode 'board_paper' and the paper, as 0136 and
-- 0143 did. A board paper counts toward the same daily limit as a whole past
-- paper (0137: 5 different papers a day, staff and pass holders included), so
-- board_paper_downloads sits beside mock_paper_downloads and BOTH triggers count
-- BOTH tables under the same per-user-per-day lock. A separate table rather than
-- a second column on mock_paper_downloads: its primary key is the upsert target
-- the download route depends on.

CREATE TABLE public.board_papers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid NOT NULL REFERENCES public.exams(id),
  subject_id uuid NOT NULL REFERENCES public.subjects(id),
  slug text NOT NULL CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' AND length(slug) <= 80),
  -- A CBSE set group ("2025-55-1"): one page shows its sets. A Maharashtra paper
  -- is its own group.
  group_slug text NOT NULL CHECK (group_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' AND length(group_slug) <= 80),
  set_number smallint CHECK (set_number IS NULL OR set_number BETWEEN 1 AND 9),
  year integer NOT NULL CHECK (year BETWEEN 2000 AND 2100),
  sitting text CHECK (sitting IS NULL OR length(btrim(sitting)) BETWEEN 1 AND 40),
  paper_code text CHECK (paper_code IS NULL OR length(btrim(paper_code)) BETWEEN 1 AND 40),
  title text NOT NULL CHECK (length(btrim(title)) BETWEEN 1 AND 160),
  total_marks numeric NOT NULL CHECK (total_marks > 0),
  duration_minutes integer CHECK (duration_minutes IS NULL OR duration_minutes BETWEEN 1 AND 600),
  -- [{ key, title, note }] in printed order.
  sections jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(sections) = 'array'),
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (exam_id, slug)
);

CREATE INDEX board_papers_listing_idx ON public.board_papers (exam_id, subject_id, year DESC) WHERE published;
CREATE INDEX board_papers_group_idx ON public.board_papers (exam_id, group_slug);

CREATE TABLE public.board_paper_items (
  paper_id uuid NOT NULL REFERENCES public.board_papers(id) ON DELETE CASCADE,
  position smallint NOT NULL CHECK (position >= 1),
  printed_number text NOT NULL CHECK (length(btrim(printed_number)) BETWEEN 1 AND 40),
  section text NOT NULL CHECK (length(btrim(section)) BETWEEN 1 AND 40),
  marks numeric NOT NULL CHECK (marks > 0),
  alternative_to smallint CHECK (alternative_to IS NULL OR (alternative_to >= 1 AND alternative_to < position)),
  case_key text CHECK (case_key IS NULL OR length(btrim(case_key)) BETWEEN 1 AND 80),
  question_id uuid NOT NULL REFERENCES public.questions(id) ON DELETE RESTRICT,
  PRIMARY KEY (paper_id, position)
);

CREATE INDEX board_paper_items_question_idx ON public.board_paper_items (question_id);

CREATE OR REPLACE FUNCTION private.board_paper_item_guard()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  v_paper public.board_papers%ROWTYPE;
  v_ok boolean;
BEGIN
  SELECT * INTO v_paper FROM public.board_papers WHERE id = NEW.paper_id;
  SELECT (q.visibility = 'PUBLIC' AND q.exam_id = v_paper.exam_id AND q.subject_id = v_paper.subject_id)
    INTO v_ok
    FROM public.questions q WHERE q.id = NEW.question_id;
  IF v_ok IS NOT TRUE THEN
    RAISE EXCEPTION 'board paper %: question % is not a PUBLIC question of this paper''s exam and subject',
      v_paper.slug, NEW.question_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER board_paper_items_guard
  BEFORE INSERT OR UPDATE ON public.board_paper_items
  FOR EACH ROW EXECUTE FUNCTION private.board_paper_item_guard();

ALTER TABLE public.board_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.board_paper_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY board_papers_read_published ON public.board_papers
  FOR SELECT TO anon, authenticated USING (published);

CREATE POLICY board_paper_items_read_published ON public.board_paper_items
  FOR SELECT TO anon, authenticated
  USING (EXISTS (SELECT 1 FROM public.board_papers p WHERE p.id = paper_id AND p.published));

-- Upsert one paper and replace its items in ONE transaction: the builder never
-- leaves a paper half old, half new. `published` is set from the payload, so a
-- re-run can publish or withdraw. Service role only.
CREATE OR REPLACE FUNCTION public.board_paper_replace(p_paper jsonb, p_items jsonb)
RETURNS integer
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  v_id uuid;
  v_count integer;
BEGIN
  INSERT INTO public.board_papers AS b (
    exam_id, subject_id, slug, group_slug, set_number, year, sitting, paper_code,
    title, total_marks, duration_minutes, sections, published
  ) VALUES (
    (p_paper->>'examId')::uuid, (p_paper->>'subjectId')::uuid, p_paper->>'slug', p_paper->>'groupSlug',
    (p_paper->>'setNumber')::smallint, (p_paper->>'year')::integer, p_paper->>'sitting', p_paper->>'paperCode',
    p_paper->>'title', (p_paper->>'totalMarks')::numeric, (p_paper->>'durationMinutes')::integer,
    COALESCE(p_paper->'sections', '[]'::jsonb), COALESCE((p_paper->>'published')::boolean, false)
  )
  ON CONFLICT (exam_id, slug) DO UPDATE SET
    subject_id = EXCLUDED.subject_id, group_slug = EXCLUDED.group_slug, set_number = EXCLUDED.set_number,
    year = EXCLUDED.year, sitting = EXCLUDED.sitting, paper_code = EXCLUDED.paper_code,
    title = EXCLUDED.title, total_marks = EXCLUDED.total_marks, duration_minutes = EXCLUDED.duration_minutes,
    sections = EXCLUDED.sections, published = EXCLUDED.published, updated_at = now()
  RETURNING b.id INTO v_id;

  DELETE FROM public.board_paper_items WHERE paper_id = v_id;
  INSERT INTO public.board_paper_items
    (paper_id, position, printed_number, section, marks, alternative_to, case_key, question_id)
  SELECT v_id, (i->>'position')::smallint, i->>'printedNumber', i->>'section', (i->>'marks')::numeric,
         (i->>'alternativeTo')::smallint, i->>'caseKey', (i->>'questionId')::uuid
    FROM jsonb_array_elements(p_items) AS i;
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;

REVOKE ALL ON FUNCTION public.board_paper_replace(jsonb, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.board_paper_replace(jsonb, jsonb) TO service_role;

-- ── Downloads ───────────────────────────────────────────────────────────────

ALTER TABLE public.export_events
  DROP CONSTRAINT export_events_mode_check,
  ADD CONSTRAINT export_events_mode_check CHECK (mode IN ('cart', 'filters', 'mock', 'homework', 'board_paper'));

ALTER TABLE public.export_events
  ADD COLUMN board_paper_id uuid REFERENCES public.board_papers(id) ON DELETE SET NULL,
  ADD CONSTRAINT export_events_board_paper_only_for_board_paper
    CHECK (board_paper_id IS NULL OR mode = 'board_paper');

CREATE INDEX export_events_board_paper_idx ON public.export_events (board_paper_id)
  WHERE board_paper_id IS NOT NULL;

CREATE TABLE public.board_paper_downloads (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  board_paper_id uuid NOT NULL REFERENCES public.board_papers(id) ON DELETE CASCADE,
  ist_day date NOT NULL DEFAULT ((now() AT TIME ZONE 'Asia/Kolkata')::date),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, ist_day, board_paper_id)
);

COMMENT ON TABLE public.board_paper_downloads IS
  'One row per account, IST day and board paper downloaded (migration 0146). Counts toward the same daily limit as mock_paper_downloads (0137). Written only by the download route (service role).';

ALTER TABLE public.board_paper_downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY board_paper_downloads_select_own ON public.board_paper_downloads
  FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Both kinds of paper count toward one limit, under one lock, so two downloads
-- at the same instant (one of each kind) cannot both pass.
CREATE OR REPLACE FUNCTION private.papers_downloaded_today(p_user uuid, p_day date)
RETURNS bigint
LANGUAGE sql
STABLE
SET search_path = ''
AS $$
  SELECT (SELECT count(*) FROM public.mock_paper_downloads d WHERE d.user_id = p_user AND d.ist_day = p_day)
       + (SELECT count(*) FROM public.board_paper_downloads d WHERE d.user_id = p_user AND d.ist_day = p_day);
$$;

CREATE OR REPLACE FUNCTION private.enforce_mock_paper_daily_limit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
declare
  lim integer;
begin
  select s.mock_papers_per_day into lim from public.paywall_settings s;
  if lim is null then
    return new;
  end if;
  perform pg_advisory_xact_lock(
    hashtextextended('mock_paper_day:' || new.user_id::text || ':' || new.ist_day::text, 0)
  );
  -- The same paper again that day (its answer key, or a second copy): the
  -- route's upsert(ignoreDuplicates) still fires this BEFORE INSERT trigger
  -- before the conflict is resolved, and refusing it would block the key of a
  -- paper downloaded as the day's last. The conflict makes it a no-op.
  if exists (
    select 1 from public.mock_paper_downloads d
    where d.user_id = new.user_id and d.ist_day = new.ist_day and d.mock_id = new.mock_id
  ) then
    return new;
  end if;
  -- Board papers count too (0146).
  if private.papers_downloaded_today(new.user_id, new.ist_day) >= lim then
    raise exception 'You have downloaded % papers today.', lim
      using errcode = 'PT429', hint = 'MOCK_PAPER_DAILY_LIMIT';
  end if;
  return new;
end;
$$;

CREATE OR REPLACE FUNCTION private.enforce_board_paper_daily_limit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
declare
  lim integer;
begin
  select s.mock_papers_per_day into lim from public.paywall_settings s;
  if lim is null then
    return new;
  end if;
  -- The SAME lock key as mock papers: one count, one queue per user and day.
  perform pg_advisory_xact_lock(
    hashtextextended('mock_paper_day:' || new.user_id::text || ':' || new.ist_day::text, 0)
  );
  if exists (
    select 1 from public.board_paper_downloads d
    where d.user_id = new.user_id and d.ist_day = new.ist_day and d.board_paper_id = new.board_paper_id
  ) then
    return new;
  end if;
  if private.papers_downloaded_today(new.user_id, new.ist_day) >= lim then
    raise exception 'You have downloaded % papers today.', lim
      using errcode = 'PT429', hint = 'MOCK_PAPER_DAILY_LIMIT';
  end if;
  return new;
end;
$$;

CREATE TRIGGER board_paper_downloads_daily_limit
  BEFORE INSERT ON public.board_paper_downloads
  FOR EACH ROW EXECUTE FUNCTION private.enforce_board_paper_daily_limit();

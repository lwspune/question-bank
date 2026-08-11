-- 0074_question_reviews.sql
--
-- Post-ingestion review provenance. One append-only row per "someone checked
-- this question's answer and concluded X".
--
-- WHY THIS EXISTS. The bank already records provenance of CONTENT in five
-- senses — derived_model/derived_at (0040), source_file + pyq_note, the
-- [Q# · month · year] student citation, written-paper slot provenance, and sync
-- metadata (0010). None of them records provenance of REVIEW. So a question
-- whose key was blind re-derived and confirmed is indistinguishable, in the
-- database, from one nobody has ever opened: both just have a solution. The
-- ~9,546-question audit is consequently narrative only, and "which questions has
-- nobody checked?" has no answer. This table is that answer.
--
-- WHY append-only (like user_activity 0052 / notes_progress 0046): a re-review
-- adds a row rather than overwriting, so an OVERTURNED review survives. That is
-- not hypothetical — the NCERT Integrals cross-check produced an agent verdict
-- of "flip our (A) to match the key", which source-verification then reversed
-- (the agent had options:[] from a dump bug; the printed page shows our (A)=6 is
-- right and the NCERT key is wrong). An UPDATE would have erased both the fact
-- that a review was overturned and the reason. Current belief = newest row per
-- question (src/lib/reviews/staleness.ts), not the only row.
--
-- WHY reviewed_content_hash is NOT NULL. A review describes the question AS IT
-- WAS. If the stem is later repaired the row still says "confirmed" about text
-- that no longer exists. Storing the fingerprint makes that queryable instead of
-- invisible — the same move 0040 made ("so staleness is detectable") and
-- db_health_snapshots made for counters: store what the claim was made against,
-- so the claim can be falsified later. It is also what makes the FK safe in
-- practice: a corrective script stamps the hash the row holds AFTER its own
-- edit, so a fixed question is not born stale.
--
-- WHY UNIQUE (question_id, run_label, reviewed_content_hash). Re-running a
-- committing script must be idempotent, which is a standing convention here
-- (seeds, upload commit, activity backfill). A full constraint — not a partial
-- index — is what PostgREST upsert / ON CONFLICT can target; every column is NOT
-- NULL so there is no NULL-distinctness subtlety. A genuine re-review differs by
-- run_label (a later pass) or by hash (the question changed), so it still lands.
--
-- WHY service-role only (RLS enabled, NO policies — the platform_admins /
-- entitlements / db_health_snapshots pattern): every writer is an ingestion
-- script or a server route holding the service-role key. There is no student or
-- teacher surface, and an admin readout goes through the service-role client
-- behind requireSuperadmin(), as the other platform-wide dashboards do.
--
-- WHAT DOES NOT EARN A ROW. A structural probe pass (npm run audit:keys) checks
-- three defect shapes — solution-concludes-a-different-letter, duplicate
-- options, not-exactly-one-correct — and is blind to a plain wrong key. Writing
-- 'confirmed' for every row it scanned would turn an unexamined question green,
-- the same "default becomes an assertion" failure that shipped 169 false
-- coverage verdicts on the exam spines. Only an adjudicated flag earns a row.

CREATE TABLE public.question_reviews (
  id                    uuid        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id           uuid        NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  reviewed_at           timestamptz NOT NULL DEFAULT now(),
  reviewed_content_hash text        NOT NULL,
  method                text        NOT NULL,
  verdict               text        NOT NULL,
  run_label             text        NOT NULL,
  derived_model         text,
  source                text        NOT NULL DEFAULT 'live',
  note                  text,

  CONSTRAINT question_reviews_dedupe
    UNIQUE (question_id, run_label, reviewed_content_hash),

  CONSTRAINT question_reviews_method_ck CHECK (method IN (
    'blind_rederivation',
    'source_key_crosscheck',
    'textbook_answer_key',
    'structural_probe',
    'report_triage'
  )),

  CONSTRAINT question_reviews_verdict_ck CHECK (verdict IN (
    'confirmed',
    'key_fixed',
    'stem_fixed',
    'solution_rewritten',
    'defect_preserved',
    'unverifiable'
  )),

  -- 'backfilled' must be opted into explicitly so a reconstructed row can never
  -- pass as a first-hand record.
  CONSTRAINT question_reviews_source_ck CHECK (source IN ('live', 'backfilled')),

  CONSTRAINT question_reviews_note_len_ck CHECK (note IS NULL OR length(note) <= 2000),
  CONSTRAINT question_reviews_hash_ck     CHECK (length(btrim(reviewed_content_hash)) > 0),
  CONSTRAINT question_reviews_run_ck      CHECK (length(btrim(run_label)) > 0)
);

-- Latest verdict per question + the LEFT JOIN ... IS NULL coverage query.
CREATE INDEX question_reviews_question_idx
  ON public.question_reviews (question_id, reviewed_at DESC);

-- Per-run rollup (reviewed / confirmed / corrected / defects).
CREATE INDEX question_reviews_run_idx
  ON public.question_reviews (run_label);

ALTER TABLE public.question_reviews ENABLE ROW LEVEL SECURITY;
-- Deliberately no policies: service-role only. See the header.

COMMENT ON TABLE public.question_reviews IS
  'Append-only post-ingestion review provenance: one row per (question, review pass). NO ROW = not recorded, which is NOT the same as not reviewed — see source=''backfilled''. Service-role only (RLS on, no policies).';
COMMENT ON COLUMN public.question_reviews.reviewed_content_hash IS
  'questions.content_hash as it stood AFTER this review''s own edits. Differing from the question''s current content_hash means the review is stale — it describes text that has since changed.';
COMMENT ON COLUMN public.question_reviews.run_label IS
  'The pass that produced this row, e.g. "grounding:nda-maths-batch-7" or "ncert:cbse-12:integrals:answer-key-crosscheck". Groups rows into an auditable run.';
COMMENT ON COLUMN public.question_reviews.source IS
  '''live'' = written by the reviewing pass (first-hand). ''backfilled'' = reconstructed from a committed machine-readable artifact. Never reconstructed from prose.';

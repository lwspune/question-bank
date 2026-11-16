-- 0266_score_calculator.sql
--
-- Answer-key score calculators (owner, 2026-11-16; growth registry
-- "score-calculator"): /score-calculator/<exam> marks a student's own
-- answer-key sheet. The page itself is static and cached, so a key-day rush
-- never reads these tables on page load. Three small tables:
--
--   score_keys    NTA's answer key per JEE sitting, loaded by script on key day
--                 (scripts/score-calc/load-nta-key.ts). SSC needs no row here:
--                 SSC colours the right answer into the student's own sheet.
--   score_checks  one row per checked sheet: marks only, NEVER the sheet. A
--                 hash of the answers dedupes a student checking the same sheet
--                 twice, so "how others scored" counts sheets, not clicks.
--   score_alerts  "tell me when the key is out", signed-in students only.
--
-- WHO SEES WHAT:
--   * score_keys: anyone reads (the key is NTA's public document anyway); only
--     the service role writes (no write policy exists).
--   * score_checks: a signed-in student reads their own saved rows. Rows are
--     written only by the API route (service role), which validates and
--     rate-limits first: an anon INSERT policy would let anyone fill the table.
--     "How others scored" is read through score_check_spread(), which returns
--     nothing until 200 sheets exist for that sitting, so a thin sample never
--     shows as a percentile.
--   * score_alerts: a student inserts, reads and deletes their own rows.
--
-- The calculator slugs mirror SCORE_CALCULATORS in src/lib/scoreCalc/score.ts.

CREATE TABLE public.score_keys (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  calculator   text NOT NULL CHECK (calculator IN ('jee-main')),
  -- e.g. '2027-01-22-s1'
  sitting      text NOT NULL CHECK (sitting ~ '^\d{4}-\d{2}-\d{2}-s[1-9]$'),
  region       text NOT NULL CHECK (region IN ('india', 'outside')),
  status       text NOT NULL CHECK (status IN ('provisional', 'final')),
  -- question id -> { "subject": ..., "answer": { "kind": ..., "values"?: [...] } }
  key          jsonb NOT NULL CHECK (jsonb_typeof(key) = 'object'),
  drop_policy  text NOT NULL CHECK (drop_policy IN ('all', 'attempted')),
  source_url   text NOT NULL CHECK (source_url ~ '^https://'),
  loaded_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE (calculator, sitting, region, status)
);

ALTER TABLE public.score_keys ENABLE ROW LEVEL SECURITY;
CREATE POLICY score_keys_read ON public.score_keys FOR SELECT TO anon, authenticated USING (true);
GRANT SELECT ON public.score_keys TO anon, authenticated;

CREATE TABLE public.score_checks (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  calculator   text NOT NULL CHECK (calculator IN ('ssc-cgl', 'ssc-chsl', 'ssc-cpo', 'jee-main')),
  -- 'unknown' when an SSC sheet does not name its shift legibly
  sitting      text NOT NULL CHECK (char_length(sitting) BETWEEN 1 AND 40),
  total        numeric(6, 2) NOT NULL,
  max_marks    numeric(6, 2) NOT NULL CHECK (max_marks > 0),
  sections     jsonb NOT NULL CHECK (jsonb_typeof(sections) = 'array'),
  -- sha256 hex of the student's answers in paper order
  sheet_hash   text NOT NULL CHECK (sheet_hash ~ '^[0-9a-f]{64}$'),
  user_id      uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  created_at   timestamptz NOT NULL DEFAULT now(),
  -- Negative marking can take a total below zero, never below -max or above max.
  CHECK (total BETWEEN -max_marks AND max_marks),
  UNIQUE (calculator, sitting, sheet_hash)
);

CREATE INDEX score_checks_user_idx ON public.score_checks (user_id) WHERE user_id IS NOT NULL;

ALTER TABLE public.score_checks ENABLE ROW LEVEL SECURITY;
CREATE POLICY score_checks_own_read ON public.score_checks FOR SELECT TO authenticated
  USING (user_id = (SELECT auth.uid()));
GRANT SELECT ON public.score_checks TO authenticated;

-- How others scored: buckets of 10% of max marks, only once 200 sheets exist.
CREATE FUNCTION public.score_check_spread(p_calculator text, p_sitting text)
RETURNS TABLE (sheets bigint, bucket int, n bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  WITH c AS (
    SELECT total, max_marks FROM public.score_checks
    WHERE calculator = p_calculator AND sitting = p_sitting
  ), tot AS (SELECT count(*) AS sheets FROM c)
  SELECT tot.sheets,
         LEAST(9, GREATEST(0, floor(c.total / c.max_marks * 10)))::int AS bucket,
         count(*) AS n
  FROM c, tot
  WHERE tot.sheets >= 200
  GROUP BY tot.sheets, 2
  ORDER BY 2;
$$;
REVOKE ALL ON FUNCTION public.score_check_spread(text, text) FROM public;
GRANT EXECUTE ON FUNCTION public.score_check_spread(text, text) TO anon, authenticated;

CREATE TABLE public.score_alerts (
  user_id      uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  calculator   text NOT NULL CHECK (calculator IN ('jee-main')),
  created_at   timestamptz NOT NULL DEFAULT now(),
  sent_at      timestamptz,
  PRIMARY KEY (user_id, calculator)
);

ALTER TABLE public.score_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY score_alerts_own_read ON public.score_alerts FOR SELECT TO authenticated
  USING (user_id = (SELECT auth.uid()));
CREATE POLICY score_alerts_own_insert ON public.score_alerts FOR INSERT TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()) AND sent_at IS NULL);
CREATE POLICY score_alerts_own_delete ON public.score_alerts FOR DELETE TO authenticated
  USING (user_id = (SELECT auth.uid()));
GRANT SELECT, INSERT, DELETE ON public.score_alerts TO authenticated;

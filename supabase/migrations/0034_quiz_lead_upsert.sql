-- 0034_quiz_lead_upsert.sql
--
-- Atomic, retake-aware upsert for public-quiz leads. A plain supabase-js
-- .upsert() can't express "attempts = attempts + 1" / "best_score = greatest(...)"
-- (it does a full row overwrite), and a read-then-write would race when the same
-- person double-submits. So the submit endpoint calls this function instead:
--   first attempt  → insert (attempts = 1, best_score = score)
--   retake (same quiz_id + mobile) → UPDATE: bump attempts, keep the best score,
--     refresh the latest score/answers/last_attempt_at, leave first_seen_at +
--     consent_at immutable.
--
-- Called only by the service-role submit endpoint (anon visitors never hold a
-- JWT that can reach it) — EXECUTE is revoked from anon + authenticated.

CREATE OR REPLACE FUNCTION public.record_quiz_lead(
  p_quiz_id       uuid,
  p_name          text,
  p_mobile        text,
  p_score         int,
  p_correct       int,
  p_incorrect     int,
  p_not_attempted int,
  p_total         int,
  p_answers       jsonb,
  p_utm_source    text
) RETURNS void
LANGUAGE sql
AS $$
  INSERT INTO public.quiz_leads (
    quiz_id, name, mobile, score, best_score, attempts,
    correct, incorrect, not_attempted, total, answers, utm_source
  ) VALUES (
    p_quiz_id, p_name, p_mobile, p_score, p_score, 1,
    p_correct, p_incorrect, p_not_attempted, p_total, p_answers, p_utm_source
  )
  ON CONFLICT (quiz_id, mobile) DO UPDATE SET
    name            = EXCLUDED.name,
    score           = EXCLUDED.score,
    best_score      = GREATEST(public.quiz_leads.best_score, EXCLUDED.score),
    attempts        = public.quiz_leads.attempts + 1,
    correct         = EXCLUDED.correct,
    incorrect       = EXCLUDED.incorrect,
    not_attempted   = EXCLUDED.not_attempted,
    total           = EXCLUDED.total,
    answers         = EXCLUDED.answers,
    utm_source      = COALESCE(EXCLUDED.utm_source, public.quiz_leads.utm_source),
    last_attempt_at = now();
$$;

REVOKE ALL ON FUNCTION public.record_quiz_lead(
  uuid, text, text, int, int, int, int, int, jsonb, text
) FROM anon, authenticated;

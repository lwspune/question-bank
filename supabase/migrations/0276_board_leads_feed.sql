-- 0276_board_leads_feed.sql
--
-- A third source for GoPost's leads feed (GET /api/leads/defence): 'board' =
-- Maharashtra SSC (Class 10) students (target exam `mh-ssc-10`) who gave a
-- mobile AND ticked "I agree to be contacted" (owner, 2026-11-20: LWS's NDA
-- Foundation course is for students after 10th). Same consent rule as the
-- account source in 0185; only `mh-ssc-10` is returned, so a student's other
-- exams never leave this database.
--
-- A SEPARATE SOURCE, not a wider 'account': GoPost keeps one cursor per source,
-- and its account cursor is already past most of these students, so widening
-- 'account' would skip everyone who signed up before today. A new source starts
-- from the beginning; account and quiz are unchanged.

CREATE OR REPLACE FUNCTION public.defence_leads_after(
  p_source   text,
  p_after_at timestamptz,
  p_after_id uuid,
  p_limit    int
)
RETURNS TABLE (
  id         uuid,
  changed_at timestamptz,
  lead_at    timestamptz,
  name       text,
  mobile     text,
  exams      text[],
  stage      text,
  city       text
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  defence CONSTANT text[] := ARRAY['nda', 'cds', 'afcat'];
  board   CONSTANT text[] := ARRAY['mh-ssc-10'];
BEGIN
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 500 THEN
    RAISE EXCEPTION 'p_limit must be 1..500' USING ERRCODE = '22023';
  END IF;
  IF (p_after_at IS NULL) <> (p_after_id IS NULL) THEN
    RAISE EXCEPTION 'p_after_at and p_after_id go together' USING ERRCODE = '22023';
  END IF;

  IF p_source IN ('account', 'board') THEN
    RETURN QUERY
      SELECT p.user_id, p.updated_at, p.updated_at,
             nullif(btrim(coalesce(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name')), ''),
             p.mobile,
             ARRAY(SELECT e FROM unnest(p.target_exams) e
                   WHERE e = ANY (CASE WHEN p_source = 'board' THEN board ELSE defence END)
                   ORDER BY array_position(CASE WHEN p_source = 'board' THEN board ELSE defence END, e)),
             p.stage, p.city
      FROM public.student_profiles p
      JOIN auth.users u ON u.id = p.user_id
      WHERE p.mobile IS NOT NULL
        AND p.consent
        AND p.target_exams && (CASE WHEN p_source = 'board' THEN board ELSE defence END)
        AND (p_after_at IS NULL OR (p.updated_at, p.user_id) > (p_after_at, p_after_id))
      ORDER BY p.updated_at, p.user_id
      LIMIT p_limit;
  ELSIF p_source = 'quiz' THEN
    RETURN QUERY
      SELECT l.id, l.last_attempt_at, l.first_seen_at, nullif(btrim(l.name), ''), l.mobile,
             ARRAY[lower(q.exam)], NULL::text, NULL::text
      FROM public.quiz_leads l
      JOIN public.quizzes q ON q.id = l.quiz_id
      WHERE lower(q.exam) = ANY (defence)
        AND (p_after_at IS NULL OR (l.last_attempt_at, l.id) > (p_after_at, p_after_id))
      ORDER BY l.last_attempt_at, l.id
      LIMIT p_limit;
  ELSE
    RAISE EXCEPTION 'p_source must be account, quiz or board' USING ERRCODE = '22023';
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.defence_leads_after(text, timestamptz, uuid, int) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.defence_leads_after(text, timestamptz, uuid, int) TO service_role;

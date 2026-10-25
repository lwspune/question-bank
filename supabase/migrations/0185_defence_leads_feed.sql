-- 0185_defence_leads_feed.sql
--
-- The defence-leads feed: NDA, CDS and AFCAT students who gave a mobile AND
-- agreed to be contacted, read every hour by GoPost (LWS's marketing app,
-- its own Supabase project) into its Leads list, through
-- GET /api/leads/defence (src/lib/leads/defenceFeed.ts).
--
-- WHY A FUNCTION AND NOT A ROUTE QUERY: a lead needs the student's NAME, which
-- lives in auth.users (not exposed to PostgREST), and a route could only fetch
-- it one getUserById per student. One SQL call filters, joins and pages.
--
-- WHO COUNTS (the rule lives HERE, next to the data, so GoPost never decides
-- who agreed to what):
--   * account: student_profiles with a mobile, consent = true, and NDA, CDS or
--     AFCAT among target_exams. consent is the "I agree to be contacted by PYQ
--     Vault about my preparation" tick (MobileGate, ProfileForm), which the
--     privacy policy defines as contact about "exam preparation, courses and
--     offers". Email-only students never ticked it, so they are not leads.
--   * quiz: quiz_leads from a quiz whose exam is NDA, CDS or AFCAT. Every row
--     carries consent_at (the gate cannot be passed without it).
-- Only `exams` inside the defence set are returned, so a student's other
-- exams never leave this database.
--
-- PAGING IS KEYSET ON (changed_at, id), ascending. changed_at = updated_at
-- (account; the app stamps it on every profile save, so a student who adds a
-- mobile later is picked up then) or last_attempt_at (quiz). The id breaks
-- ties: bulk backfills left up to 10 profiles sharing one updated_at.
--
-- SERVICE ROLE ONLY: the route calls it with the admin client after checking
-- GOPOST_LEADS_SECRET. Revoked from anon and authenticated.

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
BEGIN
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 500 THEN
    RAISE EXCEPTION 'p_limit must be 1..500' USING ERRCODE = '22023';
  END IF;
  IF (p_after_at IS NULL) <> (p_after_id IS NULL) THEN
    RAISE EXCEPTION 'p_after_at and p_after_id go together' USING ERRCODE = '22023';
  END IF;

  IF p_source = 'account' THEN
    RETURN QUERY
      SELECT p.user_id, p.updated_at, p.updated_at,
             nullif(btrim(coalesce(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name')), ''),
             p.mobile,
             ARRAY(SELECT e FROM unnest(p.target_exams) e WHERE e = ANY (defence) ORDER BY array_position(defence, e)),
             p.stage, p.city
      FROM public.student_profiles p
      JOIN auth.users u ON u.id = p.user_id
      WHERE p.mobile IS NOT NULL
        AND p.consent
        AND p.target_exams && defence
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
    RAISE EXCEPTION 'p_source must be account or quiz' USING ERRCODE = '22023';
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.defence_leads_after(text, timestamptz, uuid, int) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.defence_leads_after(text, timestamptz, uuid, int) TO service_role;

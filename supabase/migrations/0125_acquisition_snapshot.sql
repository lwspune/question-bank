-- 0125_acquisition_snapshot.sql
--
-- "Where students come from" on /dashboard/pmf: signups by first-touch channel
-- and by first page, each with what those students went on to do.
--
-- First-touch channel has been stored on student_profiles.acq_* since
-- 2026-09-17 (0106) but nothing showed it — the only read was SQL run by hand,
-- which is how "ChatGPT sends more signups than Google" was found. Aggregated
-- here rather than in JS for the usual reason: past 1000 rows PostgREST
-- silently truncates a raw .select(). Grouping into display channels, and the
-- sample floor on rates, happen in lib/pmf/acquisition.ts.
--
-- SECURITY DEFINER + REVOKE-from-public + GRANT-to-service_role, as 0103: it
-- reads every student's own-row data and auth.users, so only the service-role
-- admin client may call it (the page is superadmin-gated). search_path ''.
--
-- ── Definitions ─────────────────────────────────────────────────────────────
--
-- STUDENT — an auth user with no org_members row (0103, 0098). Signed up in the
-- window [p_since, now). A student with no profile row still counts, with no
-- channel.
--
-- BEFORE TRACKING — signed up before 2026-09-17 with no acq_source. Kept apart
-- from "no referrer recorded" (after that date): one is "never asked", the
-- other "asked, nothing to record" (a typed URL, a stripped referrer). Neither
-- is "direct".
--
-- SIGNALLED — did something that is USE, not reach: a mock started, a notes
-- progress row, a bookmark, or a user_activity row whose kind is not one of
-- the reach events 0123 added (surface_viewed, paywall_event, email_clicked).
-- A page view alone is not a signal; counting it would make every channel
-- look fully engaged.
--
-- MOCKED — finished a mock (submitted, or expired = graded when time ran out).
-- PAID — a Razorpay pass that was not refunded (revoked). A comp or manual
-- grant is not a payment.
--
-- p_exam — when given, only students whose target_exams include it.

CREATE OR REPLACE FUNCTION public.get_acquisition_snapshot(p_since timestamptz, p_exam text DEFAULT NULL)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  WITH students AS (
    SELECT u.id,
           u.created_at,
           p.acq_source,
           p.acq_medium,
           p.acq_campaign,
           p.acq_landing,
           (p.acq_source IS NULL AND u.created_at < timestamptz '2026-09-17 00:00:00+05:30') AS before_tracking
    FROM auth.users u
    LEFT JOIN public.student_profiles p ON p.user_id = u.id
    WHERE u.created_at >= p_since
      AND NOT EXISTS (SELECT 1 FROM public.org_members m WHERE m.user_id = u.id)
      AND (p_exam IS NULL OR p_exam = ANY (p.target_exams))
  ),
  flags AS (
    SELECT s.*,
      (
        EXISTS (SELECT 1 FROM public.mock_attempts ma WHERE ma.user_id = s.id)
        OR EXISTS (SELECT 1 FROM public.notes_progress np WHERE np.user_id = s.id)
        OR EXISTS (SELECT 1 FROM public.question_bookmarks qb WHERE qb.user_id = s.id)
        OR EXISTS (
          SELECT 1 FROM public.user_activity a
          WHERE a.user_id = s.id
            AND a.kind NOT IN ('surface_viewed', 'paywall_event', 'email_clicked')
        )
      ) AS signalled,
      EXISTS (
        SELECT 1 FROM public.mock_attempts ma
        WHERE ma.user_id = s.id AND ma.status IN ('submitted', 'expired')
      ) AS mocked,
      EXISTS (
        SELECT 1 FROM public.entitlements e
        WHERE e.user_id = s.id AND e.source = 'razorpay' AND e.status IN ('active', 'expired')
      ) AS paid
    FROM students s
  )
  SELECT jsonb_build_object(
    'channels', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
               'source', acq_source, 'medium', acq_medium, 'campaign', acq_campaign,
               'beforeTracking', before_tracking,
               'students', students, 'signalled', signalled, 'mocked', mocked, 'paid', paid
             ) ORDER BY students DESC)
      FROM (
        SELECT acq_source, acq_medium, acq_campaign, before_tracking,
               count(*)::int AS students,
               count(*) FILTER (WHERE signalled)::int AS signalled,
               count(*) FILTER (WHERE mocked)::int AS mocked,
               count(*) FILTER (WHERE paid)::int AS paid
        FROM flags
        GROUP BY 1, 2, 3, 4
      ) c
    ), '[]'::jsonb),
    'landings', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
               'landing', acq_landing,
               'students', students, 'signalled', signalled, 'mocked', mocked, 'paid', paid
             ) ORDER BY students DESC)
      FROM (
        SELECT acq_landing,
               count(*)::int AS students,
               count(*) FILTER (WHERE signalled)::int AS signalled,
               count(*) FILTER (WHERE mocked)::int AS mocked,
               count(*) FILTER (WHERE paid)::int AS paid
        FROM flags
        WHERE NOT before_tracking
        GROUP BY 1
      ) l
    ), '[]'::jsonb)
  );
$$;

REVOKE ALL ON FUNCTION public.get_acquisition_snapshot(timestamptz, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_acquisition_snapshot(timestamptz, text) TO service_role;

-- 0129_growth_snapshot.sql
--
-- One read behind /dashboard/growth: the North Star by week, the signup funnel
-- by week, the practice-first onboarding experiment by arm, chapter-share
-- signups, and the email jobs' daily sends and failures.
--
-- WHY A NEW FUNCTION AND NOT MORE KEYS ON get_pmf_snapshot (0103/0112). The
-- PMF read describes the product; this one judges experiments, and every
-- experiment brings parameters the PMF read has no business taking (a start
-- date, the exams that have mocks, a campaign). Keys bolted onto the PMF read
-- would change a function four pages already depend on, for one page.
--
-- EVERY LIST IS A PARAMETER, never written here: the learning kinds
-- (NORTH_STAR_KINDS), the exams that have mocks (EXAM_REGISTRY.hasMocks) and
-- the share campaign all live in TypeScript, so the SQL holds nothing that can
-- drift from the code that renders it. See lib/growth/query.ts.
--
-- THE ONE RULE DUPLICATED ON PURPOSE is the arm split, because the welcome
-- screen decides it in the browser and this function must recompute it:
--   odd first hex digit of user_id = practice-first (onboardingArm, TS).
-- tests/growth-snapshot.integration.test.ts asserts the two agree on real ids.
--
-- POPULATION: students only, i.e. auth users with no org_members row — the
-- definition every number on /dashboard/pmf uses (0103, 0125).
--
-- A STUDY DAY is a distinct IST date with a learning act: a user_activity row
-- whose kind is in p_kinds, or a mock_attempts start (mocks before 2026-09-17
-- wrote no mock_started row). Page views (surface_viewed) are not study.
--
-- COUNTS ONLY. Every rate, floor and verdict is made in lib/growth/snapshot.ts
-- so the rounding and the refusals are tested once. "matured" = 8+ IST days
-- since the start date, so days 1-7 have all happened.
--
-- SECURITY DEFINER + REVOKE from public + GRANT to service_role, as 0103/0125:
-- the page is superadmin-gated and reads with the service-role client.

CREATE OR REPLACE FUNCTION public.get_growth_snapshot(
  p_weeks integer,
  p_kinds text[],
  p_onboarding_since timestamptz,
  p_mock_exams text[],
  p_share_since timestamptz,
  p_share_campaign text
)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  WITH params AS (
    SELECT
      (now() AT TIME ZONE 'Asia/Kolkata')::date AS today,
      date_trunc('week', now() AT TIME ZONE 'Asia/Kolkata')::date AS this_week
  ),
  students AS (
    SELECT u.id, u.created_at
    FROM auth.users u
    WHERE NOT EXISTS (SELECT 1 FROM public.org_members m WHERE m.user_id = u.id)
  ),
  acts AS (
    SELECT a.user_id, a.kind, a.created_at
    FROM public.user_activity a
    JOIN students s ON s.id = a.user_id
    WHERE a.kind = ANY (p_kinds)
    UNION ALL
    SELECT ma.user_id, 'mock_started', ma.started_at
    FROM public.mock_attempts ma
    JOIN students s ON s.id = ma.user_id
  ),
  act_days AS (
    SELECT DISTINCT user_id, (created_at AT TIME ZONE 'Asia/Kolkata')::date AS d
    FROM acts
  ),
  week_series AS (
    SELECT (p.this_week - 7 * g)::date AS week_start
    FROM params p, generate_series(0, p_weeks - 1) AS g
  ),

  -- North Star: students with study on 1+ and 2+ days in each IST week.
  week_users AS (
    SELECT w.week_start, ad.user_id, count(*) AS days
    FROM week_series w
    JOIN act_days ad ON ad.d >= w.week_start AND ad.d < w.week_start + 7
    GROUP BY w.week_start, ad.user_id
  ),
  north AS (
    SELECT w.week_start,
           count(wu.user_id) AS learners,
           count(wu.user_id) FILTER (WHERE wu.days >= 2) AS learners_two_plus
    FROM week_series w
    LEFT JOIN week_users wu ON wu.week_start = w.week_start
    GROUP BY w.week_start
  ),

  -- Funnel by signup week.
  signups AS (
    SELECT s.id, (s.created_at AT TIME ZONE 'Asia/Kolkata')::date AS d
    FROM students s
  ),
  signup_rows AS (
    SELECT su.id, su.d,
           EXISTS (SELECT 1 FROM act_days ad WHERE ad.user_id = su.id) AS signalled,
           su.d + 8 <= p.today AS matured,
           EXISTS (
             SELECT 1 FROM act_days ad
             WHERE ad.user_id = su.id AND ad.d BETWEEN su.d + 1 AND su.d + 7
           ) AS returned7
    FROM signups su, params p
    WHERE su.d >= (SELECT min(week_start) FROM week_series)
  ),
  paid AS (
    SELECT (e.granted_at AT TIME ZONE 'Asia/Kolkata')::date AS d
    FROM public.entitlements e
    JOIN students s ON s.id = e.user_id
    WHERE e.source = 'razorpay'
  ),
  funnel AS (
    SELECT w.week_start,
           (SELECT count(*) FROM signup_rows r WHERE r.d >= w.week_start AND r.d < w.week_start + 7) AS signups,
           (SELECT count(*) FROM signup_rows r WHERE r.d >= w.week_start AND r.d < w.week_start + 7 AND r.signalled) AS signalled,
           (SELECT count(*) FROM signup_rows r WHERE r.d >= w.week_start AND r.d < w.week_start + 7 AND r.matured) AS matured,
           (SELECT count(*) FROM signup_rows r WHERE r.d >= w.week_start AND r.d < w.week_start + 7 AND r.matured AND r.returned7) AS returned7,
           (SELECT count(*) FROM paid pd WHERE pd.d >= w.week_start AND pd.d < w.week_start + 7) AS paid
    FROM week_series w
  ),

  -- Practice-first onboarding, by arm.
  onboarded AS (
    SELECT sp.user_id,
           sp.onboarded_at,
           (sp.onboarded_at AT TIME ZONE 'Asia/Kolkata')::date AS d,
           CASE WHEN ('x' || left(sp.user_id::text, 1))::bit(4)::int % 2 = 1
                THEN 'practice-first' ELSE 'mock-first' END AS arm
    FROM public.student_profiles sp
    JOIN students s ON s.id = sp.user_id
    WHERE sp.onboarded_at >= p_onboarding_since
      AND sp.target_exams[1] = ANY (p_mock_exams)
  ),
  arm_rows AS (
    SELECT o.arm,
           o.d + 8 <= p.today AS matured,
           EXISTS (
             SELECT 1 FROM act_days ad
             WHERE ad.user_id = o.user_id AND ad.d BETWEEN o.d + 1 AND o.d + 7
           ) AS returned7,
           (SELECT count(*) FROM act_days ad
             WHERE ad.user_id = o.user_id AND ad.d BETWEEN o.d AND o.d + 6) AS first_week_days,
           (SELECT a.kind FROM acts a
             WHERE a.user_id = o.user_id AND a.created_at >= o.onboarded_at
             ORDER BY a.created_at LIMIT 1) AS first_kind
    FROM onboarded o, params p
  ),
  arms AS (
    SELECT arm,
           count(*) AS onboarded,
           count(*) FILTER (WHERE matured) AS matured,
           count(*) FILTER (WHERE matured AND returned7) AS returned7,
           count(*) FILTER (WHERE matured AND first_week_days >= 2) AS two_plus,
           count(*) FILTER (WHERE first_kind = 'question_practiced') AS first_practice,
           count(*) FILTER (WHERE first_kind IN ('mock_started', 'mock_submitted')) AS first_mock
    FROM arm_rows
    GROUP BY arm
  ),

  -- Chapter share: signups that arrived through a chapter share link.
  share AS (
    SELECT count(*) AS signups,
           count(*) FILTER (WHERE EXISTS (SELECT 1 FROM act_days ad WHERE ad.user_id = sp.user_id)) AS signalled
    FROM public.student_profiles sp
    JOIN students s ON s.id = sp.user_id
    WHERE sp.acq_campaign = p_share_campaign
      AND sp.created_at >= p_share_since
  ),

  -- Email: sends and failures per IST day, last 14 days, all kinds.
  email_days AS (
    SELECT (p.today - g)::date AS day
    FROM params p, generate_series(0, 13) AS g
  ),
  email AS (
    SELECT ed.day,
           count(e.id) FILTER (WHERE e.status = 'sent') AS sent,
           count(e.id) FILTER (WHERE e.status = 'failed') AS failed
    FROM email_days ed
    LEFT JOIN public.email_sends e
      ON (e.created_at AT TIME ZONE 'Asia/Kolkata')::date = ed.day
    GROUP BY ed.day
  )

  SELECT jsonb_build_object(
    'weeks', (
      SELECT coalesce(jsonb_agg(jsonb_build_object(
        'weekStart', to_char(week_start, 'YYYY-MM-DD'),
        'learners', learners,
        'learnersTwoPlus', learners_two_plus
      ) ORDER BY week_start), '[]'::jsonb) FROM north
    ),
    'signupWeeks', (
      SELECT coalesce(jsonb_agg(jsonb_build_object(
        'weekStart', to_char(week_start, 'YYYY-MM-DD'),
        'signups', signups,
        'signalled', signalled,
        'matured', matured,
        'returned7', returned7,
        'paid', paid
      ) ORDER BY week_start), '[]'::jsonb) FROM funnel
    ),
    'arms', (
      SELECT coalesce(jsonb_agg(jsonb_build_object(
        'arm', arm,
        'onboarded', onboarded,
        'matured', matured,
        'returned7', returned7,
        'twoPlus', two_plus,
        'firstPractice', first_practice,
        'firstMock', first_mock
      ) ORDER BY arm), '[]'::jsonb) FROM arms
    ),
    'chapterShare', (
      SELECT jsonb_build_object('signups', signups, 'signalled', signalled) FROM share
    ),
    'emailDays', (
      SELECT coalesce(jsonb_agg(jsonb_build_object(
        'day', to_char(day, 'YYYY-MM-DD'),
        'sent', sent,
        'failed', failed
      ) ORDER BY day), '[]'::jsonb) FROM email
    )
  );
$$;

REVOKE ALL ON FUNCTION public.get_growth_snapshot(integer, text[], timestamptz, text[], timestamptz, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_growth_snapshot(integer, text[], timestamptz, text[], timestamptz, text) TO service_role;

-- 0151_signup_countries.sql
--
-- get_signup_countries: students by the country their account was created
-- from (signup_country, 0142), since a given moment (2026-10-10).
--
-- WHY A FUNCTION. /dashboard/growth needs a count per country. Grouping the
-- rows in the app would run into PostgREST's 1000-row cap once the column
-- fills, so the database does the grouping and returns a few rows.
--
-- WHY NOT get_growth_snapshot. That function (0129, 0130) is 260 lines, and
-- a new key would mean copying all of it into a new migration to change one
-- thing. This read has nothing in common with it but the student filter.
--
-- STUDENTS ONLY, the same rule as get_growth_snapshot: an auth user with no
-- org_members row. A student made since p_since with no country (no profile
-- row, or a NULL column) counts in `unrecorded`, which should stay at 0: a
-- rising number means the recording has stopped working.
--
-- p_since is COUNTRY_RECORDED_SINCE in lib/acquisition/country.ts, the moment
-- recording went live, so accounts made before it never count as unrecorded.
--
-- SECURITY DEFINER (it reads auth.users) and granted to service_role only,
-- like get_growth_snapshot; the page that calls it is superadmin-gated.

CREATE OR REPLACE FUNCTION public.get_signup_countries(p_since timestamptz)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  WITH students AS (
    SELECT p.signup_country AS country
    FROM auth.users u
    LEFT JOIN public.student_profiles p ON p.user_id = u.id
    WHERE u.created_at >= p_since
      AND NOT EXISTS (SELECT 1 FROM public.org_members m WHERE m.user_id = u.id)
  )
  SELECT jsonb_build_object(
    'countries', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('country', c.country, 'n', c.n) ORDER BY c.n DESC, c.country)
      FROM (
        SELECT country, count(*)::int AS n
        FROM students
        WHERE country IS NOT NULL
        GROUP BY country
      ) c
    ), '[]'::jsonb),
    'unrecorded', (SELECT count(*)::int FROM students WHERE country IS NULL)
  );
$$;

REVOKE ALL ON FUNCTION public.get_signup_countries(timestamptz) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_signup_countries(timestamptz) TO service_role;

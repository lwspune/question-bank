-- 0098_student_roster_rpc.sql
--
-- The /dashboard/students engagement roster: one row per self-serve student with
-- their profile + every engagement metric, aggregated in SQL.
--
-- WHY AN RPC (not a .select() aggregated in JS): attempt_answers is ~53k rows and
-- user_activity ~12k. Counting per-user from a row payload would silently truncate
-- at the PostgREST 1000-row cap — the pitfall that has bitten this project five
-- times (get_dashboard_stats 0018 / get_pyq_years 0019 were the same fix). The
-- aggregate belongs in Postgres. Measured: ~30 ms, all buffers shared-hit, no spill.
--
-- It also reads auth.users directly (email / created_at / metadata), which replaces
-- the paginated auth.admin.listUsers() loop the old roster used with one round trip.
--
-- SECURITY DEFINER + REVOKE-from-public + GRANT-to-service_role: this reads across
-- ALL students' own-row-RLS data (attempts, notes progress, bookmarks, activity) and
-- auth.users, so it must be callable ONLY by the service-role admin client. The
-- /dashboard/students page is superadmin-gated. search_path pinned to '' (advisor
-- 0011); every reference fully qualified.
--
-- STUDENT = an auth user with no org_members row (staff are managed under Members).
-- Same definition the previous roster used — inverted from listMembers.

CREATE OR REPLACE FUNCTION public.get_student_roster()
RETURNS TABLE (
  user_id            uuid,
  email              text,
  raw_user_meta      jsonb,
  provider           text,
  signed_up          timestamptz,
  last_sign_in       timestamptz,
  mobile             text,
  city               text,
  stage              text,
  target_exams       text[],
  whatsapp_opt_in    boolean,
  mocks_submitted    integer,
  mocks_started      integer,
  avg_pct            numeric,
  qs_answered        integer,
  notes_subtopics    integer,
  notes_subjects     integer,
  notes_mastered     integer,
  notes_checkpoints  integer,
  bookmarks          integer,
  last_active        timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  WITH students AS (
    SELECT u.id, u.email, u.created_at, u.last_sign_in_at,
           u.raw_user_meta_data, u.raw_app_meta_data
    FROM auth.users u
    WHERE NOT EXISTS (
      SELECT 1 FROM public.org_members m WHERE m.user_id = u.id
    )
  ),
  mk AS (
    SELECT a.user_id,
           count(*)::int AS started,
           count(*) FILTER (WHERE a.submitted_at IS NOT NULL)::int AS submitted,
           -- Average over GRADED submitted attempts only. NULL (not 0) when the
           -- student has no graded attempt — "no score yet" is not "scored zero".
           round(avg(a.score * 100.0 / nullif(a.max_score, 0))
                 FILTER (WHERE a.submitted_at IS NOT NULL AND a.score IS NOT NULL), 1) AS avg_pct,
           max(a.updated_at) AS last_touch
    FROM public.mock_attempts a
    GROUP BY a.user_id
  ),
  ans AS (
    SELECT a.user_id,
           count(*)::int AS qs,
           max(aa.updated_at) AS last_touch
    FROM public.attempt_answers aa
    JOIN public.mock_attempts a ON a.id = aa.attempt_id
    GROUP BY a.user_id
  ),
  np AS (
    SELECT n.user_id,
           count(*)::int AS subtopics,
           count(DISTINCT n.subject_route)::int AS subjects,
           count(*) FILTER (WHERE n.mastered_at IS NOT NULL)::int AS mastered,
           count(*) FILTER (WHERE n.checkpoint_score IS NOT NULL)::int AS checkpoints,
           max(n.updated_at) AS last_touch
    FROM public.notes_progress n
    GROUP BY n.user_id
  ),
  bm AS (
    SELECT b.user_id, count(*)::int AS n, max(b.created_at) AS last_touch
    FROM public.question_bookmarks b
    GROUP BY b.user_id
  ),
  act AS (
    SELECT v.user_id, max(v.created_at) AS last_touch
    FROM public.user_activity v
    GROUP BY v.user_id
  )
  SELECT
    s.id,
    s.email::text,
    s.raw_user_meta_data,
    (s.raw_app_meta_data ->> 'provider')::text,
    s.created_at,
    s.last_sign_in_at,
    p.mobile,
    p.city,
    p.stage,
    coalesce(p.target_exams, ARRAY[]::text[]),
    coalesce(p.whatsapp_opt_in, false),
    coalesce(mk.submitted, 0),
    coalesce(mk.started, 0),
    mk.avg_pct,
    coalesce(ans.qs, 0),
    coalesce(np.subtopics, 0),
    coalesce(np.subjects, 0),
    coalesce(np.mastered, 0),
    coalesce(np.checkpoints, 0),
    coalesce(bm.n, 0),
    -- Last LEARNING action, deliberately NOT last sign-in: opening the site without
    -- doing anything is not engagement. GREATEST ignores NULL inputs in Postgres, so
    -- a student with no learning event at all comes back NULL — "never active" is a
    -- real, queryable state (the re-engagement list), never a zero date.
    GREATEST(act.last_touch, mk.last_touch, ans.last_touch, np.last_touch, bm.last_touch)
  FROM students s
  LEFT JOIN public.student_profiles p ON p.user_id = s.id
  LEFT JOIN mk  ON mk.user_id  = s.id
  LEFT JOIN ans ON ans.user_id = s.id
  LEFT JOIN np  ON np.user_id  = s.id
  LEFT JOIN bm  ON bm.user_id  = s.id
  LEFT JOIN act ON act.user_id = s.id;
$$;

-- Revoke from PUBLIC *and* the Supabase default-privilege roles by name — a bare
-- REVOKE FROM PUBLIC leaves the explicit anon/authenticated grants Supabase adds to
-- new public functions (advisors 0028/0029 flag those). Only service_role may call
-- it; the admin page uses the service-role client behind a superadmin gate.
REVOKE ALL ON FUNCTION public.get_student_roster() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_student_roster() TO service_role;

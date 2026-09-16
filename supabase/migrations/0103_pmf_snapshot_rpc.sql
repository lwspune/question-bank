-- 0103_pmf_snapshot_rpc.sql
--
-- The product/market-fit readout behind /dashboard/pmf: cohort retention, the
-- signal funnel, per-feature adoption + retention lift, target-exam segments,
-- mock abandonment and the NPS denominator — one aggregate call.
--
-- Aggregated in SQL rather than derived from rows in JS, for the usual reason:
-- past 1000 rows PostgREST silently truncates a raw .select(), so any count
-- taken from a row payload starts lying without an error. Same idiom as
-- get_activity_shape (0053) / get_student_roster (0098).
--
-- SECURITY DEFINER + REVOKE-from-public + GRANT-to-service_role: it reads across
-- ALL students' own-row-RLS data and auth.users, so only the service-role admin
-- client may call it (the page is superadmin-gated). search_path pinned to ''
-- (advisor 0011); every reference fully qualified.
--
-- ── Definitions, and why they are drawn this way ────────────────────────────
--
-- STUDENT — an auth user with NO org_members row, matching get_student_roster
-- (0098). Staff are not the market and would flatter every rate here.
--
-- SIGNAL — the honest replacement for "activated". A student counts as having
-- left a signal if ANY of four tables recorded them: user_activity, a mock
-- attempt (STARTED, not just submitted — mock_submitted fires only on submit,
-- which hid 33 students who began a paper), a notes_progress row, or a bookmark.
-- It is deliberately NOT called activation, because the 70k-question bank on
-- /browse and the 317 /questions landing pages record NOTHING when a student
-- uses them. A silent student may be a heavy reader; this function cannot tell,
-- and neither can the page.
--
-- ACTIVE DAYS — counted ONLY from append-only sources (user_activity,
-- mock_attempts.started_at, question_bookmarks.created_at). notes_progress
-- carries last_viewed_at, which is OVERWRITTEN on every view: it can answer
-- "has this student read it" and "when last", never "on which days". So notes
-- feeds `last_signal` (a genuine most-recent timestamp) but must never feed a
-- distinct-day history, or the history would silently be one day per subtopic.
--
-- RETENTION — last_signal >= signup + N days, i.e. "were they still here N days
-- later". The CENSORING that makes this readable is applied in TypeScript
-- (lib/pmf/snapshot.ts): this function emits days_since_close per cohort and the
-- view layer blanks any horizon the cohort has not yet had time to reach.
-- Emitting 0 for an unreachable horizon would read as a collapse.
--
-- MATURE — signed up at least 28 days ago, so a d28 answer exists at all. Both
-- the feature-lift arms and the exam segments are restricted to mature students.
--
-- NPS eligibility mirrors NPS_MIN_COMPLETED_MOCKS = 2 in lib/feedback/nps.ts —
-- the engagement gate on the prompt itself. Kept in sync by hand; the page shows
-- the response rate against it precisely because that gate means NPS here only
-- ever samples students who finished two papers.

CREATE OR REPLACE FUNCTION public.get_pmf_snapshot(p_weeks integer DEFAULT 12)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  WITH students AS (
    SELECT u.id, u.created_at
    FROM auth.users u
    WHERE NOT EXISTS (SELECT 1 FROM public.org_members m WHERE m.user_id = u.id)
  ),
  -- Append-only signals only — these carry a real per-day history.
  ev AS (
    SELECT s.id AS user_id, a.created_at
    FROM students s JOIN public.user_activity a ON a.user_id = s.id
    UNION ALL
    SELECT s.id, ma.started_at
    FROM students s JOIN public.mock_attempts ma ON ma.user_id = s.id
    UNION ALL
    SELECT s.id, b.created_at
    FROM students s JOIN public.question_bookmarks b ON b.user_id = s.id
  ),
  ev_agg AS (
    SELECT user_id,
           max(created_at) AS last_ev,
           count(DISTINCT (created_at AT TIME ZONE 'Asia/Kolkata')::date) AS active_days
    FROM ev GROUP BY user_id
  ),
  -- State, not history: last_viewed_at is overwritten on each view.
  notes_agg AS (
    SELECT n.user_id, max(n.last_viewed_at) AS last_notes
    FROM public.notes_progress n GROUP BY n.user_id
  ),
  mock_agg AS (
    SELECT ma.user_id, count(*) FILTER (WHERE ma.status = 'submitted') AS submitted
    FROM public.mock_attempts ma GROUP BY ma.user_id
  ),
  u AS (
    SELECT s.id,
           s.created_at,
           date_trunc('week', s.created_at AT TIME ZONE 'Asia/Kolkata')::date AS cohort_week,
           -- GREATEST ignores NULLs in Postgres; NULL only when both are absent.
           GREATEST(e.last_ev, n.last_notes) AS last_signal,
           COALESCE(e.active_days, 0) AS active_days,
           COALESCE(m.submitted, 0) AS mocks_submitted,
           (e.user_id IS NOT NULL OR n.user_id IS NOT NULL) AS signalled,
           (s.created_at <= now() - interval '28 days') AS mature
    FROM students s
    LEFT JOIN ev_agg e    ON e.user_id = s.id
    LEFT JOIN notes_agg n ON n.user_id = s.id
    LEFT JOIN mock_agg m  ON m.user_id = s.id
  ),
  cohorts AS (
    SELECT cohort_week AS week,
           count(*) AS signups,
           count(*) FILTER (WHERE signalled) AS signalled,
           count(*) FILTER (WHERE last_signal >= created_at + interval '1 day')  AS ret_d1,
           count(*) FILTER (WHERE last_signal >= created_at + interval '7 days')  AS ret_d7,
           count(*) FILTER (WHERE last_signal >= created_at + interval '28 days') AS ret_d28,
           (extract(epoch FROM ((now() AT TIME ZONE 'Asia/Kolkata')
                                - (cohort_week + interval '7 days'))) / 86400)::int AS days_since_close
    FROM u
    WHERE cohort_week >= (date_trunc('week', (now() AT TIME ZONE 'Asia/Kolkata'))
                          - make_interval(weeks => p_weeks))::date
    GROUP BY cohort_week
  ),
  -- The lift arms: mature AND already signalled, so the comparison is "which
  -- feature keeps an engaged student", not the tautology "acting beats not acting".
  lift_pool AS (SELECT * FROM u WHERE mature AND signalled),
  -- Mirrors ACTIVITY_KINDS in lib/activity/events.ts and the user_activity CHECK.
  kinds AS (
    SELECT unnest(ARRAY[
      'mock_submitted','answer_wrong','answer_correct','chapter_mastered',
      'note_checkpoint','question_bookmarked','quiz_taken','drill_completed'
    ]) AS kind
  ),
  kind_all AS (
    SELECT a.kind, count(*) AS events, count(DISTINCT a.user_id) AS users
    FROM public.user_activity a JOIN students s ON s.id = a.user_id
    GROUP BY a.kind
  ),
  kind_pool AS (
    SELECT k.kind,
           EXISTS (SELECT 1 FROM public.user_activity a
                   WHERE a.user_id = p.id AND a.kind = k.kind) AS used,
           (p.last_signal >= p.created_at + interval '28 days') AS retained
    FROM kinds k CROSS JOIN lift_pool p
  ),
  features AS (
    SELECT k.kind,
           COALESCE(ka.users, 0)  AS users,
           COALESCE(ka.events, 0) AS events,
           count(kp.*) FILTER (WHERE kp.used) AS used_eligible,
           count(kp.*) FILTER (WHERE kp.used AND kp.retained) AS used_retained,
           count(kp.*) FILTER (WHERE NOT kp.used) AS unused_eligible,
           count(kp.*) FILTER (WHERE NOT kp.used AND kp.retained) AS unused_retained
    FROM kinds k
    LEFT JOIN kind_all ka ON ka.kind = k.kind
    LEFT JOIN kind_pool kp ON kp.kind = k.kind
    GROUP BY k.kind, ka.users, ka.events
  ),
  -- target_exams is a text[], so a student declaring two exams lands in BOTH
  -- segments. They overlap and do not sum to the roster — the page says so.
  seg AS (
    SELECT unnest(p.target_exams) AS exam,
           m.signalled,
           (m.last_signal >= m.created_at + interval '28 days') AS retained
    FROM u m JOIN public.student_profiles p ON p.user_id = m.id
    WHERE m.mature
  ),
  segments AS (
    SELECT exam,
           count(*) AS students,
           count(*) FILTER (WHERE signalled) AS signalled,
           count(*) FILTER (WHERE retained) AS ret_d28
    FROM seg
    WHERE exam IS NOT NULL AND exam <> ''
    GROUP BY exam
  ),
  att AS (
    SELECT count(*) AS started,
           count(*) FILTER (WHERE ma.status = 'submitted') AS submitted,
           count(*) FILTER (WHERE ma.status = 'expired')   AS expired,
           count(*) FILTER (WHERE ma.status = 'in_progress' AND ma.expires_at <  now()) AS stranded,
           count(*) FILTER (WHERE ma.status = 'in_progress' AND ma.expires_at >= now()) AS live
    FROM public.mock_attempts ma JOIN students s ON s.id = ma.user_id
  ),
  diff AS (
    SELECT count(*) FILTER (WHERE f.rating = 'too_easy')   AS too_easy,
           count(*) FILTER (WHERE f.rating = 'just_right') AS just_right,
           count(*) FILTER (WHERE f.rating = 'too_hard')   AS too_hard,
           count(*) AS responses
    FROM public.mock_feedback f JOIN students s ON s.id = f.user_id
  ),
  nps AS (
    SELECT COALESCE(jsonb_agg(f.score ORDER BY f.created_at), '[]'::jsonb) AS scores
    FROM public.user_feedback f JOIN students s ON s.id = f.user_id
    WHERE f.kind = 'nps' AND f.score IS NOT NULL
  ),
  nps_elig AS (
    SELECT count(*) AS n FROM (
      SELECT ma.user_id
      FROM public.mock_attempts ma JOIN students s ON s.id = ma.user_id
      WHERE ma.status = 'submitted'
      GROUP BY ma.user_id
      HAVING count(*) >= 2
    ) z
  )
  SELECT jsonb_build_object(
    'generatedAt', to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    'weeks', p_weeks,
    'funnel', jsonb_build_object(
      'students',  (SELECT count(*) FROM u),
      'signalled', (SELECT count(*) FROM u WHERE signalled),
      'returned',  (SELECT count(*) FROM u WHERE active_days >= 2),
      'habit',     (SELECT count(*) FROM u WHERE mocks_submitted >= 2)
    ),
    'maturePool', jsonb_build_object(
      'students',  (SELECT count(*) FROM u WHERE mature),
      'signalled', (SELECT count(*) FROM lift_pool),
      'retained',  (SELECT count(*) FROM lift_pool WHERE last_signal >= created_at + interval '28 days')
    ),
    'cohorts', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
               'week', to_char(week, 'YYYY-MM-DD'),
               'signups', signups,
               'signalled', signalled,
               'daysSinceClose', days_since_close,
               'retD1', ret_d1, 'retD7', ret_d7, 'retD28', ret_d28
             ) ORDER BY week DESC)
      FROM cohorts
    ), '[]'::jsonb),
    'features', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
               'kind', kind, 'users', users, 'events', events,
               'usedEligible', used_eligible, 'usedRetained', used_retained,
               'unusedEligible', unused_eligible, 'unusedRetained', unused_retained
             ) ORDER BY users DESC)
      FROM features
    ), '[]'::jsonb),
    'segments', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
               'exam', exam, 'students', students,
               'signalled', signalled, 'retD28', ret_d28
             ) ORDER BY students DESC)
      FROM segments
    ), '[]'::jsonb),
    'attempts', (
      SELECT jsonb_build_object('started', started, 'submitted', submitted,
                                'expired', expired, 'stranded', stranded, 'live', live)
      FROM att
    ),
    'difficulty', (
      SELECT jsonb_build_object('tooEasy', too_easy, 'justRight', just_right,
                                'tooHard', too_hard, 'responses', responses)
      FROM diff
    ),
    'nps', jsonb_build_object(
      'scores', (SELECT scores FROM nps),
      'eligible', (SELECT n FROM nps_elig)
    )
  );
$$;

REVOKE ALL ON FUNCTION public.get_pmf_snapshot(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_pmf_snapshot(integer) TO service_role;

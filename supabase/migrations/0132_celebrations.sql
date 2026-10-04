-- 0132_celebrations — the motivation layer's database half (2026-10-04).
--
-- THREE CHANGES, all additive, so this is safe to apply before the code ships:
--
-- 1. `milestone_reached` joins the user_activity kind CHECK. It is the server's
--    record that a student crossed an "N questions answered" milestone (10, 20,
--    50, then every 50) and was shown it. One row per milestone per student via
--    the dedupe key `milestone:answered:<user>:<n>`, written with ON CONFLICT DO
--    NOTHING, so the award happens once however many tabs or reloads ask for it
--    (the engagement gate: awards are server-side and idempotent). Telemetry,
--    never a feature: it always sits beside the answer rows that earned it.
--
-- 2. get_own_answer_totals() — "Answered" and "Right" for the signed-in caller,
--    the numbers the pulse shows and the milestone award reads. ANSWERED, NOT
--    OPENED (the user's call): a reveal via "Show answer" counts for nothing.
--    It sums three sources, each counted once:
--      * finished mocks: correct_count + wrong_count of submitted/expired
--        attempts (JEE numeric answers included — graded, so counted, user's
--        call 2026-10-04);
--      * graded reveals: question_practiced rows carrying metadata.correct —
--        the bank (2026-10-02), the board and the question of the day (both
--        2026-10-04), and the drill's right answers to NEW questions;
--      * drill answers to questions already missed: answer_wrong / answer_correct
--        with metadata.surface = 'drill'.
--    The bank's and board's own answer_wrong / answer_correct rows are NOT
--    counted: they are drill-ladder rows written BESIDE a graded reveal that is
--    already counted. Mock answer_wrong rows carry no surface and are covered
--    by the attempt counts.
--    SECURITY INVOKER: user_activity and mock_attempts are own-row under RLS,
--    so the function can only ever sum the caller's rows. Aggregated in SQL
--    because the row payload could pass PostgREST's 1,000-row cap.
--
-- 3. get_pmf_snapshot learns the `daily` reveal surface (the question of the
--    day). The body below is 0112's, byte for byte (its md5 matched prod's
--    prosrc on 2026-10-04), with one VALUES row added. Without it, daily
--    answers would match no feature key and vanish from /dashboard/pmf, and
--    tests/pmf-snapshot.test.ts pins the TS side of the same bijection.

ALTER TABLE public.user_activity DROP CONSTRAINT user_activity_kind_ck;

ALTER TABLE public.user_activity ADD CONSTRAINT user_activity_kind_ck CHECK (kind IN (
  'mock_submitted',
  'mock_started',
  'answer_wrong',
  'answer_correct',
  'chapter_mastered',
  'note_checkpoint',
  'question_bookmarked',
  'question_practiced',
  'quiz_taken',
  'drill_completed',
  'surface_viewed',
  'drill_started',
  'goal_set',
  'paywall_event',
  'email_clicked',
  'milestone_reached'
));

CREATE OR REPLACE FUNCTION public.get_own_answer_totals()
RETURNS TABLE (answered bigint, right_answers bigint)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  WITH me AS (SELECT auth.uid() AS id),
  mocks AS (
    SELECT COALESCE(sum(a.correct_count + a.wrong_count), 0)::bigint AS answered,
           COALESCE(sum(a.correct_count), 0)::bigint AS right_answers
    FROM public.mock_attempts a, me
    WHERE a.user_id = me.id
      AND a.status IN ('submitted', 'expired')
  ),
  acts AS (
    SELECT
      (count(*) FILTER (WHERE u.kind = 'question_practiced' AND u.metadata ? 'correct')
       + count(*) FILTER (WHERE u.kind IN ('answer_wrong', 'answer_correct')
                            AND u.metadata->>'surface' = 'drill'))::bigint AS answered,
      (count(*) FILTER (WHERE u.kind = 'question_practiced' AND u.metadata->>'correct' = 'true')
       + count(*) FILTER (WHERE u.kind = 'answer_correct' AND u.metadata->>'surface' = 'drill'))::bigint
        AS right_answers
    FROM public.user_activity u, me
    WHERE u.user_id = me.id
      AND u.kind IN ('question_practiced', 'answer_wrong', 'answer_correct')
  )
  SELECT mocks.answered + acts.answered, mocks.right_answers + acts.right_answers
  FROM mocks, acts;
$$;

-- Supabase grants new functions to anon and authenticated BY NAME, so a bare
-- REVOKE FROM PUBLIC leaves them callable (advisors 0028/0029). Anon has no
-- auth.uid() and would only ever get zeros, but it has no reason to call this.
REVOKE ALL ON FUNCTION public.get_own_answer_totals() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_own_answer_totals() TO authenticated, service_role;

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
  -- ── Stickiness (0112) ─────────────────────────────────────────────────────
  -- One row per (student, IST day) with a recorded signal, over ALL time: the
  -- window filters below select from it, and firstSignalDay needs the whole
  -- history to tell a genuinely quiet window apart from one that predates the
  -- product. Drawn from `ev`, so the population and the four signal sources are
  -- exactly the ones every other number on this page uses — get_activity_shape
  -- (0053) also emits active7d/active30d but over ALL users including staff and
  -- over user_activity alone, so its numbers are NOT these and must not be read
  -- as the same metric.
  stick_days AS (
    SELECT DISTINCT user_id, (created_at AT TIME ZONE 'Asia/Kolkata')::date AS day
    FROM ev
  ),
  -- 28 days, matching the d28 retention horizon the rest of the page is drawn
  -- against — not the 30 of a calendar month. Emitted as windowDays rather than
  -- assumed by the view layer, so the two cannot drift.
  stick_win AS (
    SELECT (now() AT TIME ZONE 'Asia/Kolkata')::date        AS today,
           ((now() AT TIME ZONE 'Asia/Kolkata')::date - 27) AS win_start,
           28                                               AS win_days
  ),
  stick_user AS (
    SELECT d.user_id, count(*) AS days
    FROM stick_days d, stick_win w
    WHERE d.day >= w.win_start
    GROUP BY d.user_id
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
  -- The FEATURE KEYS the readout reports, one row per key.
  --
  -- A key is usually just an activity kind, but `question_practiced` is split by
  -- the reveal SURFACE recorded in metadata, so the guides and the board reader
  -- can be measured apart from the bank. `surface = NULL` means "this key
  -- ignores surface".
  --
  -- THIS LIST IS NOT "every activity kind", and the comment it replaces claimed
  -- it was. That claim is how question_practiced went missing: 0105 added the
  -- kind hours after 0103 shipped, nothing mirrored it here, and "Bank practice"
  -- had a label in lib/pmf/snapshot.ts that could never render. The list is
  -- FEATURES; `mock_started` is deliberately absent (a lifecycle state of the
  -- mock feature, not a second feature -- see TELEMETRY_KINDS), and the
  -- answer_* kinds are emitted for the pure core to drop as per-question
  -- telemetry. A pure-core test now asserts every kind is one or the other.
  feature_keys AS (
    SELECT * FROM (VALUES
      ('mock_submitted',           'mock_submitted',      NULL),
      ('answer_wrong',             'answer_wrong',        NULL),
      ('answer_correct',           'answer_correct',      NULL),
      ('chapter_mastered',         'chapter_mastered',    NULL),
      ('note_checkpoint',          'note_checkpoint',     NULL),
      ('question_bookmarked',      'question_bookmarked', NULL),
      ('quiz_taken',               'quiz_taken',          NULL),
      ('drill_completed',          'drill_completed',     NULL),
      ('question_practiced',       'question_practiced',  'bank'),
      ('question_practiced:guide', 'question_practiced',  'guide'),
      ('question_practiced:board', 'question_practiced',  'board'),
      ('question_practiced:daily', 'question_practiced',  'daily')
    ) AS t(key, kind, surface)
  ),
  -- Every self-serve student's activity row, tagged with the feature key it
  -- belongs to. COALESCE(...,'bank') is history, not a fallback: the surface
  -- field began being written on 2026-09-17, and every reveal before it came
  -- from /browse or the /board reader. Those pre-deploy rows therefore stay in
  -- the bank's key FOREVER, including the board's share of them -- the
  -- distinction was never recorded, so there is nothing to backfill from. The
  -- board's row counts from 2026-09-18, and lib/pmf/snapshot.ts says so on the
  -- page rather than leaving a reader to infer a start date from a shape.
  act AS (
    SELECT f.key, a.user_id
    FROM public.user_activity a
    JOIN students s ON s.id = a.user_id
    JOIN feature_keys f
      ON f.kind = a.kind
     AND (f.surface IS NULL
          OR COALESCE(a.metadata->>'surface', 'bank') = f.surface)
  ),
  kind_all AS (
    SELECT key, count(*) AS events, count(DISTINCT user_id) AS users
    FROM act GROUP BY key
  ),
  -- Distinct (key, user) first, then a hash join against the lift pool. The
  -- per-arm EXISTS this replaces could no longer use the (user_id, kind) index
  -- once the surface predicate moved into a CTE, so it would have degenerated
  -- into one CTE scan per key per student.
  user_keys AS (SELECT DISTINCT key, user_id FROM act),
  kind_pool AS (
    SELECT f.key,
           (uk.user_id IS NOT NULL) AS used,
           (p.last_signal >= p.created_at + interval '28 days') AS retained
    FROM feature_keys f
    CROSS JOIN lift_pool p
    LEFT JOIN user_keys uk ON uk.key = f.key AND uk.user_id = p.id
  ),
  features AS (
    SELECT f.key AS kind,
           COALESCE(ka.users, 0)  AS users,
           COALESCE(ka.events, 0) AS events,
           count(kp.*) FILTER (WHERE kp.used) AS used_eligible,
           count(kp.*) FILTER (WHERE kp.used AND kp.retained) AS used_retained,
           count(kp.*) FILTER (WHERE NOT kp.used) AS unused_eligible,
           count(kp.*) FILTER (WHERE NOT kp.used AND kp.retained) AS unused_retained
    FROM feature_keys f
    LEFT JOIN kind_all ka ON ka.key = f.key
    LEFT JOIN kind_pool kp ON kp.key = f.key
    GROUP BY f.key, ka.users, ka.events
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
    'stickiness', jsonb_build_object(
      'windowDays',  (SELECT win_days FROM stick_win),
      'windowStart', (SELECT to_char(win_start, 'YYYY-MM-DD') FROM stick_win),
      'mau',         (SELECT count(*) FROM stick_user),
      'wau',         (SELECT count(DISTINCT d.user_id) FROM stick_days d, stick_win w
                      WHERE d.day > w.today - 7),
      -- Context only. The view layer never divides by it -- see viewStickiness.
      'dauToday',    (SELECT count(DISTINCT d.user_id) FROM stick_days d, stick_win w
                      WHERE d.day = w.today),
      -- Distinct (student, day) pairs in the window: the average-DAU numerator.
      'studentDays', (SELECT COALESCE(sum(days), 0) FROM stick_user),
      'activeDays', COALESCE((
        SELECT jsonb_agg(jsonb_build_object('days', days, 'students', students) ORDER BY days)
        FROM (SELECT days, count(*) AS students FROM stick_user GROUP BY days) z
      ), '[]'::jsonb),
      'firstSignalDay', (SELECT to_char(min(day), 'YYYY-MM-DD') FROM stick_days)
    ),
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

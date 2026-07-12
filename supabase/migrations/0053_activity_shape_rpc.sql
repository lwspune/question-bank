-- 0053_activity_shape_rpc.sql
--
-- A3 usage-shape readout: an aggregate over user_activity (0052) that answers
-- "do our students study daily or in bursts?" BEFORE we build a returning-habit
-- mechanic. Computed in SQL (not row-derived in JS) so it stays correct past the
-- PostgREST 1000-row cap as the spine grows — same idiom as get_dashboard_stats
-- (0018) / get_pyq_years (0019).
--
-- SECURITY DEFINER + REVOKE-from-public + GRANT-to-service_role: the function
-- reads across ALL users' own-row-RLS activity, so it must be callable ONLY by
-- the service-role admin client (the /dashboard/activity page is admin-gated).
-- search_path pinned to '' (advisor 0011); all refs fully-qualified.
--
-- Active "days" use the IST calendar (Asia/Kolkata) — the app's day boundary for
-- Indian students, matching the mock/quiz daily logic.

CREATE OR REPLACE FUNCTION public.get_activity_shape(p_days integer DEFAULT 90)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  WITH win AS (
    SELECT user_id, kind, created_at
    FROM public.user_activity
    WHERE created_at >= now() - make_interval(days => p_days)
  ),
  user_days AS (
    SELECT user_id, (created_at AT TIME ZONE 'Asia/Kolkata')::date AS d
    FROM win
    GROUP BY user_id, (created_at AT TIME ZONE 'Asia/Kolkata')::date
  ),
  day_counts AS (
    SELECT user_id, count(*) AS active_days FROM user_days GROUP BY user_id
  ),
  gap_vals AS (
    SELECT (d - lag(d) OVER (PARTITION BY user_id ORDER BY d)) AS gap
    FROM user_days
  ),
  recency_days AS (
    SELECT user_id, floor(extract(epoch FROM (now() - max(created_at))) / 86400) AS ds
    FROM win GROUP BY user_id
  ),
  by_kind AS (
    SELECT kind, count(*) AS events, count(DISTINCT user_id) AS users
    FROM win GROUP BY kind
  ),
  daily AS (
    SELECT (created_at AT TIME ZONE 'Asia/Kolkata')::date AS day,
           count(*) AS events, count(DISTINCT user_id) AS users
    FROM win
    WHERE created_at >= now() - make_interval(days => least(p_days, 30))
    GROUP BY 1
  )
  SELECT jsonb_build_object(
    'windowDays', p_days,
    'totalEvents', (SELECT count(*) FROM win),
    'activeUsers', (SELECT count(DISTINCT user_id) FROM win),
    'active7d', (SELECT count(DISTINCT user_id) FROM public.user_activity WHERE created_at >= now() - interval '7 days'),
    'active30d', (SELECT count(DISTINCT user_id) FROM public.user_activity WHERE created_at >= now() - interval '30 days'),
    'avgEventsPerUser', (
      SELECT CASE WHEN count(DISTINCT user_id) = 0 THEN 0
             ELSE round(count(*)::numeric / count(DISTINCT user_id), 1) END FROM win
    ),
    'byKind', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('kind', kind, 'events', events, 'users', users) ORDER BY events DESC)
      FROM by_kind
    ), '[]'::jsonb),
    'sessions', jsonb_build_object(
      'avgActiveDays', (SELECT COALESCE(round(avg(active_days)::numeric, 2), 0) FROM day_counts),
      'multiDayUsers', (SELECT count(*) FROM day_counts WHERE active_days >= 2),
      'medianGapDays', (SELECT round(percentile_cont(0.5) WITHIN GROUP (ORDER BY gap)::numeric, 1) FROM gap_vals WHERE gap IS NOT NULL),
      'gapBuckets', jsonb_build_object(
        'sameNext', (SELECT count(*) FROM gap_vals WHERE gap = 1),
        'd2_3',     (SELECT count(*) FROM gap_vals WHERE gap BETWEEN 2 AND 3),
        'd4_7',     (SELECT count(*) FROM gap_vals WHERE gap BETWEEN 4 AND 7),
        'd8_14',    (SELECT count(*) FROM gap_vals WHERE gap BETWEEN 8 AND 14),
        'd15plus',  (SELECT count(*) FROM gap_vals WHERE gap >= 15)
      )
    ),
    'recency', jsonb_build_object(
      'd0_1',    (SELECT count(*) FROM recency_days WHERE ds <= 1),
      'd2_7',    (SELECT count(*) FROM recency_days WHERE ds BETWEEN 2 AND 7),
      'd8_30',   (SELECT count(*) FROM recency_days WHERE ds BETWEEN 8 AND 30),
      'd31plus', (SELECT count(*) FROM recency_days WHERE ds > 30)
    ),
    'dailyActive', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
               'day', to_char(day, 'YYYY-MM-DD'), 'users', users, 'events', events
             ) ORDER BY day)
      FROM daily
    ), '[]'::jsonb)
  );
$$;

-- Revoke from PUBLIC *and* the Supabase default-privilege roles by name — a bare
-- REVOKE FROM PUBLIC leaves the explicit anon/authenticated grants Supabase adds
-- to new public functions (advisors 0028/0029 flag those). Only service_role may
-- call it (the admin page uses the service-role client).
REVOKE ALL ON FUNCTION public.get_activity_shape(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_activity_shape(integer) TO service_role;

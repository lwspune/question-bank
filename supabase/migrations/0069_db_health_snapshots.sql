-- 0069_db_health_snapshots.sql
--
-- Database health tracking: a daily snapshot plus the collector that produces it.
--
-- WHY THIS EXISTS. Every counter Postgres exposes about load is CUMULATIVE with
-- no time dimension. `pg_stat_statements` can say a query has spilled 1,129 GB
-- to disk since the stats were last reset (2026-05-08), but it cannot say
-- whether any of that happened today. That gap is not academic: the /browse
-- wide-sort regression was fixed on 2026-08-05, and afterwards there was no way
-- to confirm from the database that the spill had actually stopped — the
-- lifetime total keeps the old number forever. Two snapshots subtract to a real
-- per-window rate; one snapshot cannot.
--
-- WHY service-role-only (RLS enabled, NO policies): this is operational
-- telemetry about the whole platform, not tenant data — there is no org to
-- scope it to, and query text can echo filter values. Same locked pattern as
-- platform_admins (0056), entitlements (0026) and teacher_access_requests
-- (0060): RLS on with no policy denies everyone except service_role, which
-- bypasses RLS by design. Advisor-clean, because RLS IS enabled.

CREATE TABLE public.db_health_snapshots (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  captured_at        timestamptz NOT NULL DEFAULT now(),

  -- Load-bearing for correctness: if this moves between two snapshots then
  -- every cumulative counter restarted at zero and the subtraction is garbage.
  -- The reader (src/lib/dbhealth/delta.ts) checks it before reporting a delta.
  stats_reset        timestamptz NOT NULL,

  -- Point-in-time gauges. Comparable across a stats reset.
  db_size_bytes      bigint NOT NULL,
  connections        integer NOT NULL,
  max_connections    integer NOT NULL,
  cache_hit_pct      numeric(5,2) NOT NULL,
  largest_group_rows integer NOT NULL,

  -- Cumulative counters. Only meaningful as a difference between two rows.
  temp_bytes         bigint NOT NULL,
  temp_files         bigint NOT NULL,
  deadlocks          bigint NOT NULL,
  rollbacks          bigint NOT NULL,

  -- Per-table and per-query detail, shaped to match src/lib/dbhealth/types.ts.
  tables             jsonb NOT NULL DEFAULT '[]'::jsonb,
  queries            jsonb NOT NULL DEFAULT '[]'::jsonb
);

-- The reader always wants "the one before this one".
CREATE INDEX db_health_snapshots_captured_idx
  ON public.db_health_snapshots (captured_at DESC);

ALTER TABLE public.db_health_snapshots ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.db_health_snapshots IS
  'Operational health snapshots. Service-role only (RLS on, no policies). Rows are only meaningful in pairs — see src/lib/dbhealth/delta.ts.';


-- ---------------------------------------------------------------------------
-- collect_db_health()
--
-- Gathers one snapshot in a single round trip and returns it as jsonb keyed to
-- match the HealthSnapshot type in src/lib/dbhealth/types.ts.
--
-- WHY AN RPC AT ALL: pg_stat_statements lives in the `extensions` schema and is
-- not exposed through PostgREST, so a tsx script using supabase-js cannot read
-- it as a table. This mirrors get_activity_shape (0053) and get_dashboard_stats
-- (0018): aggregate in SQL, hand back a small result.
--
-- SECURITY DEFINER because reading pg_stat_statements across all roles needs
-- more privilege than the caller has; `search_path = ''` per the hardening
-- convention, so every object below is schema-qualified. EXECUTE is revoked
-- from PUBLIC and, BY NAME, from anon and authenticated — a bare REVOKE FROM
-- PUBLIC leaves Supabase's default grants in place (advisors 0028/0029).
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.collect_db_health()
RETURNS jsonb
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  WITH agg AS (
    SELECT
      s.queryid::text                                             AS queryid,
      sum(s.calls)::bigint                                        AS calls,
      sum(s.total_exec_time)::double precision                    AS total_exec_ms,
      (sum(s.temp_blks_written) * current_setting('block_size')::bigint)::bigint AS temp_bytes,
      sum(s.rows)::bigint                                         AS rows,
      left(regexp_replace(min(s.query), '\s+', ' ', 'g'), 160)    AS label
    FROM extensions.pg_stat_statements s
    WHERE s.queryid IS NOT NULL
    -- One queryid can appear once per role; the caller thinks in queries, not
    -- roles, so fold them together.
    GROUP BY s.queryid
  ),
  -- Track the busiest AND the messiest. A query can be catastrophic at low
  -- volume (13.9 MB of spill per call), so ranking by calls alone would miss it.
  top_queries AS (
    SELECT * FROM (SELECT * FROM agg ORDER BY calls DESC LIMIT 25) a
    UNION
    SELECT * FROM (SELECT * FROM agg ORDER BY temp_bytes DESC LIMIT 25) b
  ),
  tables AS (
    SELECT
      t.relname                            AS name,
      t.n_live_tup                         AS live_rows,
      t.n_dead_tup                         AS dead_rows,
      pg_catalog.pg_total_relation_size(t.relid) AS total_bytes,
      t.seq_scan                           AS seq_scans,
      coalesce(t.idx_scan, 0)              AS idx_scans
    FROM pg_catalog.pg_stat_user_tables t
    WHERE t.n_live_tup > 500
    ORDER BY pg_catalog.pg_total_relation_size(t.relid) DESC
    LIMIT 20
  ),
  -- Distance to the PostgREST 1000-row cap, which truncates a plain .select()
  -- silently. Measured the way the app groups: PUBLIC questions per chapter.
  largest_group AS (
    SELECT coalesce(max(c), 0) AS rows FROM (
      SELECT count(*) AS c
      FROM public.questions q
      WHERE q.visibility = 'PUBLIC'
      GROUP BY q.chapter_id
    ) g
  ),
  db AS (
    SELECT
      sum(d.blks_hit)                AS hit,
      sum(d.blks_read)               AS read,
      sum(d.temp_bytes)::bigint      AS temp_bytes,
      sum(d.temp_files)::bigint      AS temp_files,
      sum(d.deadlocks)::bigint       AS deadlocks,
      sum(d.xact_rollback)::bigint   AS rollbacks
    FROM pg_catalog.pg_stat_database d
    WHERE d.datname = pg_catalog.current_database()
  )
  SELECT jsonb_build_object(
    'capturedAt',       now(),
    'statsReset',       (SELECT i.stats_reset FROM extensions.pg_stat_statements_info i),
    'dbSizeBytes',      pg_catalog.pg_database_size(pg_catalog.current_database()),
    'connections',      (SELECT count(*) FROM pg_catalog.pg_stat_activity),
    'maxConnections',   (SELECT setting::int FROM pg_catalog.pg_settings WHERE name = 'max_connections'),
    'cacheHitPct',      (SELECT round(100.0 * db.hit / nullif(db.hit + db.read, 0), 2) FROM db),
    'tempBytes',        (SELECT db.temp_bytes FROM db),
    'tempFiles',        (SELECT db.temp_files FROM db),
    'deadlocks',        (SELECT db.deadlocks FROM db),
    'rollbacks',        (SELECT db.rollbacks FROM db),
    'largestGroupRows', (SELECT lg.rows FROM largest_group lg),
    'tables',           coalesce((SELECT jsonb_agg(jsonb_build_object(
                          'name', t.name, 'liveRows', t.live_rows, 'deadRows', t.dead_rows,
                          'totalBytes', t.total_bytes, 'seqScans', t.seq_scans, 'idxScans', t.idx_scans
                        )) FROM tables t), '[]'::jsonb),
    'queries',          coalesce((SELECT jsonb_agg(jsonb_build_object(
                          'queryid', q.queryid, 'label', q.label, 'calls', q.calls,
                          'totalExecMs', q.total_exec_ms, 'tempBytes', q.temp_bytes, 'rows', q.rows
                        )) FROM top_queries q), '[]'::jsonb)
  );
$$;

REVOKE ALL ON FUNCTION public.collect_db_health() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.collect_db_health() FROM anon;
REVOKE ALL ON FUNCTION public.collect_db_health() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.collect_db_health() TO service_role;

COMMENT ON FUNCTION public.collect_db_health() IS
  'One database health snapshot as jsonb, shaped for src/lib/dbhealth/types.ts. Service-role only.';

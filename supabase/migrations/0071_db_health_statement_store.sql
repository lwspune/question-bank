-- 0071_db_health_statement_store.sql
--
-- Adds the pg_stat_statements STORE SIZE to the health snapshot, as a gauge.
--
-- WHY. On 2026-08-09 the database was writing ~13 GB/day of temp files on a
-- 164 MB database, and no tracked query accounted for any of it. The tracker's
-- own `spill-unattributed` rule (0070) caught that something was wrong, but not
-- what — finding the cause needed log_temp_files turned on at the project level
-- and a read of the Postgres log.
--
-- The cause was Supabase's own `postgres_exporter`, which reads the ENTIRE
-- pg_stat_statements store once a minute to build its metrics. The store had
-- grown to 4,868 entries carrying 3.8 MB of query text, against work_mem of
-- 2.1 MB — so every scrape sorted more than fitted in memory and spilled
-- ~5.8 MB to disk, twice a minute, around the clock. Clearing the store took it
-- from 3,800 kB to 5,611 bytes and HALVED the observed spill immediately.
--
-- So the cost scales with the SIZE OF THE STORE, and that size is a plain gauge
-- nobody was watching. It refills over roughly three months (over half the
-- entries were one-off ingestion/audit queries run exactly once), so without a
-- gauge the same investigation would simply be repeated from scratch. The fix
-- is one line — select pg_stat_statements_reset() — which is precisely why it
-- is worth being told rather than having to rediscover.
--
-- `dealloc` is recorded alongside it because a full store silently discards its
-- least-used entries, and what it discards is this tracker's own input: the
-- reports under-count and cannot say by how much. It had reached 12 before the
-- reset.
--
-- NULLABLE ON PURPOSE. Every snapshot taken before this migration has no
-- reading, and "not recorded" is not "zero". A DEFAULT 0 would backfill 20 rows
-- with a measurement that was never taken and render as a healthy 0% — the one
-- thing this tracker is built not to do. The reader (src/lib/dbhealth) carries
-- the null through and prints "not recorded".
--
-- Table grants and RLS are unchanged; this adds columns and replaces the
-- function body.

ALTER TABLE public.db_health_snapshots
  ADD COLUMN statements_tracked   integer,
  ADD COLUMN statements_max       integer,
  ADD COLUMN statements_evictions bigint;

COMMENT ON COLUMN public.db_health_snapshots.statements_tracked IS
  'Entries in pg_stat_statements at capture time. NULL on snapshots predating migration 0071 — not recorded, not zero.';
COMMENT ON COLUMN public.db_health_snapshots.statements_max IS
  'The pg_stat_statements.max ceiling. Cost of Supabase''s per-minute metrics scrape scales with tracked/max.';
COMMENT ON COLUMN public.db_health_snapshots.statements_evictions IS
  'pg_stat_statements_info.dealloc — times the store filled and silently discarded entries. Non-zero means this tracker''s inputs are lossy.';


-- ---------------------------------------------------------------------------
-- collect_db_health() — unchanged except for the three new gauges.
--
-- Kept as a full CREATE OR REPLACE (rather than a patch) because the body is
-- the single definition of the snapshot shape; a partial edit here is how the
-- SQL and src/lib/dbhealth/types.ts drift apart.
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
      left(regexp_replace(min(s.query), '\s+', ' ', 'g'), 140)    AS label
    FROM extensions.pg_stat_statements s
    WHERE s.queryid IS NOT NULL
    GROUP BY s.queryid
  ),
  top_queries AS (
    -- Busiest: where volume-driven cost shows up.
    SELECT * FROM (SELECT * FROM agg ORDER BY calls DESC LIMIT 40) a
    UNION
    -- Slowest: a new bad plan surfaces here before it surfaces anywhere else.
    SELECT * FROM (SELECT * FROM agg ORDER BY total_exec_ms DESC LIMIT 20) b
    UNION
    -- Anything that has ever spilled to disk, in full. Rare enough to keep all
    -- of it, and this is the arm that catches a NEW spiller on day one.
    SELECT * FROM (SELECT * FROM agg WHERE temp_bytes > 0 ORDER BY temp_bytes DESC LIMIT 150) c
  ),
  tables AS (
    SELECT
      t.relname                                  AS name,
      t.n_live_tup                               AS live_rows,
      t.n_dead_tup                               AS dead_rows,
      pg_catalog.pg_total_relation_size(t.relid) AS total_bytes,
      t.seq_scan                                 AS seq_scans,
      coalesce(t.idx_scan, 0)                    AS idx_scans
    FROM pg_catalog.pg_stat_user_tables t
    WHERE t.n_live_tup > 500
    ORDER BY pg_catalog.pg_total_relation_size(t.relid) DESC
    LIMIT 20
  ),
  largest_group AS (
    SELECT coalesce(max(c), 0) AS rows FROM (
      SELECT count(*) AS c
      FROM public.questions q
      WHERE q.visibility = 'PUBLIC'
      GROUP BY q.chapter_id
    ) g
  ),
  -- The store's own size. Counted over the raw view (one row per statement per
  -- role), which is what the exporter actually has to read — deliberately NOT
  -- the role-folded `agg` above, which would under-report the real cost.
  statements AS (
    SELECT
      (SELECT count(*) FROM extensions.pg_stat_statements)                       AS tracked,
      (SELECT setting::int FROM pg_catalog.pg_settings
        WHERE name = 'pg_stat_statements.max')                                   AS max_entries,
      (SELECT i.dealloc FROM extensions.pg_stat_statements_info i)               AS evictions
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
    'capturedAt',          now(),
    'statsReset',          (SELECT i.stats_reset FROM extensions.pg_stat_statements_info i),
    'dbSizeBytes',         pg_catalog.pg_database_size(pg_catalog.current_database()),
    'connections',         (SELECT count(*) FROM pg_catalog.pg_stat_activity),
    'maxConnections',      (SELECT setting::int FROM pg_catalog.pg_settings WHERE name = 'max_connections'),
    'cacheHitPct',         (SELECT round(100.0 * db.hit / nullif(db.hit + db.read, 0), 2) FROM db),
    'tempBytes',           (SELECT db.temp_bytes FROM db),
    'tempFiles',           (SELECT db.temp_files FROM db),
    'deadlocks',           (SELECT db.deadlocks FROM db),
    'rollbacks',           (SELECT db.rollbacks FROM db),
    'largestGroupRows',    (SELECT lg.rows FROM largest_group lg),
    'statementsTracked',   (SELECT st.tracked FROM statements st),
    'statementsMax',       (SELECT st.max_entries FROM statements st),
    'statementsEvictions', (SELECT st.evictions FROM statements st),
    'tables',              coalesce((SELECT jsonb_agg(jsonb_build_object(
                             'name', t.name, 'liveRows', t.live_rows, 'deadRows', t.dead_rows,
                             'totalBytes', t.total_bytes, 'seqScans', t.seq_scans, 'idxScans', t.idx_scans
                           )) FROM tables t), '[]'::jsonb),
    'queries',             coalesce((SELECT jsonb_agg(jsonb_build_object(
                             'queryid', q.queryid, 'label', q.label, 'calls', q.calls,
                             'totalExecMs', q.total_exec_ms, 'tempBytes', q.temp_bytes, 'rows', q.rows
                           )) FROM top_queries q), '[]'::jsonb)
  );
$$;

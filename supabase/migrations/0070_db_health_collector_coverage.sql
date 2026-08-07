-- 0070_db_health_collector_coverage.sql
--
-- Widens which queries collect_db_health() records. Fixes a blind spot found
-- on the tracker's first real run, before any history had accumulated.
--
-- THE BLIND SPOT. 0069 collected the top 25 queries by calls and the top 25 by
-- disk spill — both ranked by LIFETIME totals. But the tracker's whole purpose
-- is catching a query that STARTS misbehaving, and such a query has a small
-- lifetime total by definition. It would therefore stay invisible until it had
-- already done enough damage to climb the all-time table. The first run showed
-- exactly this: 29 MB of database-level spill with no query in the list to
-- explain it.
--
-- THE FIX, and why it is cheap: spill is rare. Of 4,477 distinct queries on
-- this database, only 100 have EVER written a temp file. So "every query that
-- has ever spilled" is a bounded set we can record in full, and a brand-new
-- spiller is caught on its first appearance rather than on its thousandth.
-- Three arms now: busiest, slowest, and anything that has ever spilled.
--
-- Table and grants are unchanged; this replaces the function body only.

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
    -- of it (100 of 4,477 today), and this is the arm that catches a NEW
    -- spiller on day one. Capped only as a runaway guard.
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

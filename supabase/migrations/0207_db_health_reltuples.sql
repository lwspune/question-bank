-- 0207_db_health_reltuples.sql
--
-- Records each table's `pg_class.reltuples` beside `n_live_tup`, so the
-- dead-row rule survives a Postgres restart.
--
-- WHY. Postgres restarted on 2026-10-24 22:18 UTC and lost its statistics
-- counters. From then on `n_live_tup` counted only rows inserted since the
-- restart: `questions` read 1,548 live rows against 120,408 real ones, and the
-- health report flagged 7,712 dead rows as "445%" (the real share was 6.4%).
-- `reltuples` is the planner's estimate, stored in the catalog, and it
-- survived (118,860). src/lib/dbhealth/flags.ts divides by the larger of the
-- two, so a reset counter can no longer inflate the share.
--
-- THE TABLE FILTER MOVES TOO. `WHERE n_live_tup > 500` would have dropped a
-- large table from the snapshot entirely after a restart. It now uses the
-- larger of the two counts. `reltuples` is -1 for a never-analyzed table, which
-- greatest() ignores.
--
-- ADDITIVE: snapshots before this migration have no `estRows` key, and the
-- rule treats that as absent, not zero. Grants and RLS unchanged; this only
-- replaces the function body (otherwise identical to 0080).

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
      c.reltuples::bigint                        AS est_rows,
      t.n_dead_tup                               AS dead_rows,
      pg_catalog.pg_total_relation_size(t.relid) AS total_bytes,
      t.seq_scan                                 AS seq_scans,
      coalesce(t.idx_scan, 0)                    AS idx_scans,
      c.relpages                                 AS heap_pages,
      c.relallvisible                            AS all_visible_pages
    FROM pg_catalog.pg_stat_user_tables t
    JOIN pg_catalog.pg_class c ON c.oid = t.relid
    WHERE greatest(t.n_live_tup, c.reltuples::bigint) > 500
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
  -- The store's own size, in entries AND in bytes, from a SINGLE scan.
  --
  -- Counted over the raw view (one row per statement per role), which is what
  -- the exporter actually has to read — deliberately NOT the role-folded `agg`
  -- above, which would under-report the real cost.
  statements AS (
    SELECT
      s.tracked,
      s.bytes,
      (SELECT setting::int FROM pg_catalog.pg_settings
        WHERE name = 'pg_stat_statements.max')                     AS max_entries,
      (SELECT i.dealloc FROM extensions.pg_stat_statements_info i) AS evictions,
      pg_catalog.pg_size_bytes(
        pg_catalog.current_setting('work_mem'))                    AS work_mem_bytes
    FROM (
      SELECT
        count(*)::int                                                     AS tracked,
        coalesce(sum(pg_catalog.pg_column_size(p.*)), 0)::bigint          AS bytes
      FROM extensions.pg_stat_statements p
    ) s
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
    'statementsBytes',     (SELECT st.bytes FROM statements st),
    'workMemBytes',        (SELECT st.work_mem_bytes FROM statements st),
    'tables',              coalesce((SELECT jsonb_agg(jsonb_build_object(
                             'name', t.name, 'liveRows', t.live_rows, 'estRows', t.est_rows, 'deadRows', t.dead_rows,
                             'totalBytes', t.total_bytes, 'seqScans', t.seq_scans, 'idxScans', t.idx_scans,
                             'heapPages', t.heap_pages, 'allVisiblePages', t.all_visible_pages
                           )) FROM tables t), '[]'::jsonb),
    'queries',             coalesce((SELECT jsonb_agg(jsonb_build_object(
                             'queryid', q.queryid, 'label', q.label, 'calls', q.calls,
                             'totalExecMs', q.total_exec_ms, 'tempBytes', q.temp_bytes, 'rows', q.rows
                           )) FROM top_queries q), '[]'::jsonb)
  );
$$;

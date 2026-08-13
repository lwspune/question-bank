-- 0076_db_health_visibility_map.sql
--
-- Records VISIBILITY-MAP COVERAGE per table in the health snapshot.
--
-- WHY. On 2026-08-13 the /browse question query was measured at 4,454 ms to
-- return 25 rows. The sort — the obvious suspect, and the thing fixed on
-- 2026-08-05 — turned out to be a 27 kB top-N heapsort, i.e. free. The cost was
-- elsewhere: an "Index Only Scan" reporting **13,092 Heap Fetches**, because
-- only 67.4% of the table's pages were marked all-visible. Postgres may skip the
-- heap only for a page the visibility map vouches for; for the other third it
-- must go and look anyway, and an index-only scan quietly stops being one.
--
-- THE TRACKER WAS BLIND TO IT, and not by a small margin. It watched dead rows,
-- which do not predict this at all:
--
--     syllabus_concepts   0.0% dead rows  ·  43.2% pages all-visible
--     questions          17.5% dead rows  ·  67.4% pages all-visible
--     options             2.1% dead rows  ·  66.0% pages all-visible
--
-- A table can score perfectly on dead rows and still force a heap fetch on more
-- than half its pages. The reason is the workload: a page is marked all-visible
-- only when VACUUM visits it, and a bulk INSERT produces pages that have no dead
-- rows AND are not marked — which is exactly how this bank is loaded, thousands
-- of questions at a time. Autovacuum is driven mainly by dead rows, so the
-- ingestion pattern that creates the problem is the one least likely to trigger
-- the cleanup that fixes it.
--
-- (The dead-row rule itself was recalibrated in the same change: it warned at
-- 20%, which is precisely where autovacuum already acts — 50 + 0.2 x live — so
-- it could only ever report a condition the database was in the middle of
-- fixing. It had never fired in eleven snapshots. See src/lib/dbhealth/flags.ts.)
--
-- NO NEW COLUMNS. `tables` is already jsonb, so this adds two keys to each entry
-- and nothing else. Snapshots taken before this migration simply lack the keys —
-- ABSENT, which the reader carries through as null and prints as "not recorded".
-- Defaulting them to 0 would render as 0% coverage: a measurement nobody took,
-- and an alarming-looking one. Same posture as 0071's nullable gauges.
--
-- ACCURACY NOTE. `pg_class.relpages` and `relallvisible` are planner estimates
-- refreshed by VACUUM/ANALYZE, not live counts. That is fine and in fact apt
-- here: they are updated together, so the RATIO stays coherent, and it is the
-- same number the planner itself uses when costing an index-only scan.
--
-- Table, grants and RLS are unchanged; this replaces the function body only.

-- ---------------------------------------------------------------------------
-- collect_db_health() — unchanged except for the two new per-table page counts.
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
      coalesce(t.idx_scan, 0)                    AS idx_scans,
      -- Heap pages, and how many VACUUM has marked all-visible. Their ratio is
      -- what decides whether an Index Only Scan actually stays in the index.
      c.relpages                                 AS heap_pages,
      c.relallvisible                            AS all_visible_pages
    FROM pg_catalog.pg_stat_user_tables t
    JOIN pg_catalog.pg_class c ON c.oid = t.relid
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
                             'totalBytes', t.total_bytes, 'seqScans', t.seq_scans, 'idxScans', t.idx_scans,
                             'heapPages', t.heap_pages, 'allVisiblePages', t.all_visible_pages
                           )) FROM tables t), '[]'::jsonb),
    'queries',             coalesce((SELECT jsonb_agg(jsonb_build_object(
                             'queryid', q.queryid, 'label', q.label, 'calls', q.calls,
                             'totalExecMs', q.total_exec_ms, 'tempBytes', q.temp_bytes, 'rows', q.rows
                           )) FROM top_queries q), '[]'::jsonb)
  );
$$;

-- 0080_db_health_store_bytes.sql
--
-- Records the pg_stat_statements store's SIZE IN BYTES, and the work_mem it is
-- measured against — so the alarm can fire on the thing that actually breaks.
--
-- WHY. Migration 0071 added the store's ENTRY COUNT and warned at 80% of
-- `pg_stat_statements.max` (4,000 of 5,000 entries). On 2026-08-19 the database
-- began writing ~2.7 GB/day of temp files again, and that rule had not fired
-- and could not have: spilling began at roughly 1,640 entries — 33% of max.
-- The rule sat at about 2.4x the failure point, so the condition it exists to
-- announce had been running for hours while the report read "33%".
--
-- The miscalibration was not carelessness, it was the wrong QUANTITY. 0071's
-- own comment reasons about "3.8 MB of query TEXT against 2.1 MB of work_mem",
-- and entry count was used as a proxy for that. But Supabase's postgres_exporter
-- does not read the text — it materialises the whole ROW, all ~45 columns. On
-- 2026-08-19 that was 1,580 kB against 911 kB of text: a factor of 1.73 the
-- proxy cannot see. Worse, the ratio is not fixed — it moves with the mix of
-- long ad-hoc SQL versus short PostgREST statements, so no entry count is a
-- stable stand-in for it on any instance.
--
-- WHAT SPILLS, PRECISELY, because 0071 got this half-right and it matters for
-- anyone re-reading the plan: it is NOT the sort. Measured with EXPLAIN on
-- 2026-08-19, `Sort Method: quicksort  Memory: 1616kB` — the sort fitted. The
-- `temp written` sat on the FUNCTION SCAN node: pg_stat_statements is a
-- set-returning function whose result is materialised into a tuplestore, and
-- that tuplestore overflows work_mem. Three differently-shaped queries over the
-- store (a sort, an aggregate, a count) each wrote exactly 195 blocks. So the
-- cost is paid by ANY read, and a bare `select count(*)` is as expensive as a
-- full scan.
--
-- WHY THE THRESHOLD IS 60%, NOT 100%. `pg_column_size` sums DATUM sizes; the
-- in-memory tuplestore representation is larger (per-tuple headers, pointers).
-- Measured, spilling had already begun at 1,580 kB against 2,184 kB of
-- work_mem = 72%. So 100% would fire long after the damage, and the warning
-- line must sit clearly below the observed onset. 60% left roughly a week of
-- headroom at the growth rate seen in August (the store refilled from empty to
-- the cliff in TEN DAYS during heavy ingestion — not the ~3 months predicted).
--
-- WHY work_mem IS RECORDED RATHER THAN ASSUMED. It is the denominator, it is
-- settable per-role, and hard-coding 2184 kB would make the rule silently wrong
-- the day the instance is resized. Verified 2026-08-19 that no role-level
-- override exists here (pg_db_role_setting carries only search_path and
-- timeouts), so the global value genuinely applies to the exporter's session
-- too — but that is a fact about today, not a guarantee, which is exactly why
-- it is measured every run instead of being written down.
--
-- NULLABLE ON PURPOSE, for the third time in this table's history: every
-- snapshot before this migration has no reading, and "not recorded" is not
-- "zero". A DEFAULT 0 would render as a healthy 0% on 20 rows where nothing was
-- ever measured.
--
-- Table grants and RLS are unchanged; this adds columns and replaces the
-- function body.

ALTER TABLE public.db_health_snapshots
  ADD COLUMN statements_bytes bigint,
  ADD COLUMN work_mem_bytes   bigint;

COMMENT ON COLUMN public.db_health_snapshots.statements_bytes IS
  'Total datum size of pg_stat_statements at capture time (sum of pg_column_size). What Supabase''s per-minute metrics scrape has to materialise. NULL on snapshots predating migration 0080 — not recorded, not zero.';
COMMENT ON COLUMN public.db_health_snapshots.work_mem_bytes IS
  'work_mem at capture time, in bytes — the ceiling statements_bytes is judged against. Recorded rather than assumed because it is per-role settable and changes when the instance is resized.';


-- ---------------------------------------------------------------------------
-- collect_db_health() — unchanged except for the two new gauges.
--
-- Kept as a full CREATE OR REPLACE (rather than a patch) because the body is
-- the single definition of the snapshot shape; a partial edit here is how the
-- SQL and src/lib/dbhealth/types.ts drift apart.
--
-- The `statements` CTE now reads the store ONCE for both count and size. Since
-- every read of pg_stat_statements materialises the whole thing (see above),
-- a second scan for the byte total would have doubled this collector's own
-- contribution to the very spill it measures.
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

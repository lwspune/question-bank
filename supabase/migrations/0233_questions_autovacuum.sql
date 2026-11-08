-- 0233_questions_autovacuum.sql
--
-- Let autovacuum and autoanalyze reach `questions` (2026-11-08).
--
-- WHY. `questions` had never been vacuumed automatically. Postgres's defaults
-- wait until 20% of a table is dead rows (vacuum), 20% new rows (insert
-- vacuum) or 10% changed rows (analyze). At 124,413 rows that is ~24,900 dead
-- rows before a vacuum starts, and our edits arrive as repairs and ingests of a
-- few hundred to a few thousand rows at a time, so the table sat below every
-- threshold. Measured 2026-11-08, nine days after the last manual vacuum:
--   16,317 dead rows, 10,990 changes since the last analyze,
--   14,905 of 21,549 pages marked all-visible (69%).
--
-- WHAT IT COST. Every per-exam count is an index-only scan, but an index-only
-- scan must visit the table for any page not marked all-visible. Counting SSC
-- CGL's 11,234 PYQs as anon read the table 12,044 times (more than the rows,
-- because dead versions are visited too): 8,493 buffers, 293 ms. Those counts
-- run 25-50 at once (lib/questions/defaultViewCounts.ts, lib/exam/
-- allExamStats.ts) and were ~20% of all query time in pg_stat_statements. The
-- stale statistics hurt as well: the planner expected 912 rows for that count.
--
-- WHAT. 2% instead of the defaults for all three thresholds, on this table
-- only: ~2,500 rows at today's size. A typical ingest or repair batch now
-- triggers an analyze, and a vacuum follows a few batches later.
-- SET on reloptions takes a SHARE UPDATE EXCLUSIVE lock, which blocks neither
-- reads nor writes.
--
-- Alternative rejected: a scheduled VACUUM from a GitHub job. It would run
-- whether or not anything changed, and miss the hours after a big ingest,
-- which is exactly when the counts are re-read.
-- The one-off VACUUM (ANALYZE) that cleared the backlog was run by hand on
-- 2026-11-08; VACUUM cannot run inside a migration's transaction.

ALTER TABLE public.questions SET (
  autovacuum_vacuum_scale_factor = 0.02,
  autovacuum_vacuum_insert_scale_factor = 0.02,
  autovacuum_analyze_scale_factor = 0.02
);

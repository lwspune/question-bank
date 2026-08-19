-- 0081_reset_statement_store.sql
--
-- A service-role-callable wrapper around pg_stat_statements_reset(), so the
-- daily health job can clear the query store before it starts costing disk IO.
--
-- WHY A WRAPPER AT ALL. `extensions.pg_stat_statements_reset()` is owned by
-- `postgres` and EXECUTE is not granted to `service_role` — verified
-- 2026-08-19: has_function_privilege('service_role', ...) returns false, even
-- though service_role does hold USAGE on the extensions schema. The scheduled
-- job authenticates as service_role over PostgREST, which additionally cannot
-- reach the `extensions` schema at all. So without this function the job simply
-- cannot do the one thing it exists to do. Same shape, and same reason, as
-- collect_db_health() in 0069.
--
-- WHY IT NEEDS DOING ON A SCHEDULE. The store's cost is not the store — it is
-- that Supabase's postgres_exporter materialises the whole thing every minute,
-- and once that overflows work_mem every scrape spills to disk. It happened on
-- 2026-08-09 (13 GB/day at 4,868 entries) and again on 2026-08-19 (2.7 GB/day
-- at ~1,640 entries, the store having refilled in TEN DAYS). Both times the
-- remedy was this one call, and both times it took a human noticing. Over half
-- the store is one-off ingestion and audit SQL that will never run again —
-- 890 of 1,678 entries on 2026-08-19 — so this is discarding waste, not
-- history anyone consults.
--
-- WHAT IS LOST, stated plainly because it is a real cost: every cumulative
-- per-query counter restarts at zero. The next health report will correctly
-- refuse to compute per-query window figures (delta.ts detects the moved
-- stats_reset and returns nulls rather than nonsense), and every query will
-- read as first-seen for one run. That degradation is the price, it is
-- one report long, and the caller is expected to log that it did this
-- deliberately so the gap is not mistaken for a fault.
--
-- SAFETY. The function only ever resets; it takes no arguments and cannot be
-- aimed at anything else. EXECUTE is revoked from PUBLIC/anon/authenticated and
-- granted to service_role alone (the 0079 pattern) — a stats reset is
-- operationally destructive and must not be reachable from a browser session.
-- The DECISION to call it lives in the caller, behind an explicit flag, so that
-- a human running the tracker by hand can never wipe the history as a side
-- effect of asking for a report.

CREATE OR REPLACE FUNCTION public.reset_statement_store()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  before_entries int;
  before_bytes   bigint;
BEGIN
  -- Report what was discarded. Without this the caller can log only "reset
  -- done", which is indistinguishable from a no-op and gives the next reader
  -- nothing to judge the schedule against.
  SELECT count(*)::int, coalesce(sum(pg_catalog.pg_column_size(p.*)), 0)::bigint
    INTO before_entries, before_bytes
    FROM extensions.pg_stat_statements p;

  PERFORM extensions.pg_stat_statements_reset();

  RETURN jsonb_build_object(
    'resetAt',        now(),
    'clearedEntries', before_entries,
    'clearedBytes',   before_bytes
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.reset_statement_store() FROM public;
REVOKE EXECUTE ON FUNCTION public.reset_statement_store() FROM anon;
REVOKE EXECUTE ON FUNCTION public.reset_statement_store() FROM authenticated;
GRANT  EXECUTE ON FUNCTION public.reset_statement_store() TO service_role;

COMMENT ON FUNCTION public.reset_statement_store() IS
  'Clears pg_stat_statements and returns what was discarded. Service-role only. Called by scripts/dbhealth/run.ts --reset-if-needed AFTER the snapshot is stored, once the store approaches work_mem.';

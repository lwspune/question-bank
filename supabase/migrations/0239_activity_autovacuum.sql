-- 0239_activity_autovacuum.sql
--
-- Let autovacuum reach user_activity and attempt_answers sooner (2026-11-08).
-- The same fix 0233 made for questions.
--
-- WHY. Both tables only grow (an append-only event log, and one row per answer
-- saved in a mock), so the dead-row threshold never fires and they wait for the
-- INSERT threshold: 20% of the table, ~20,000 new rows for user_activity, about
-- a week of activity. Measured 2026-11-08:
--   user_activity    95,341 rows, 14,648 added since its last vacuum (5 days),
--                    1,920 of 2,555 pages all-visible (75%);
--   attempt_answers  70,231 rows, never vacuumed, 399 of 723 pages (55%).
-- An index-only scan visits the table for every page not all-visible. The
-- superadmin student roster (get_student_roster) reads each student's last
-- activity through user_activity_user_time_idx and made 18,010 heap fetches
-- doing it: 16,481 of its 17,745 buffers. Every per-student read of
-- user_activity (the drill, the mistake badge, /me, V) pays the same toll.
--
-- WHAT. 2% thresholds on these two tables: ~1,900 and ~1,400 rows at today's
-- sizes, a day or so of use. SET on reloptions takes a SHARE UPDATE EXCLUSIVE
-- lock, which blocks neither reads nor writes. The one-off VACUUM (ANALYZE)
-- that cleared the backlog was run by hand on 2026-11-08 (VACUUM cannot run in
-- a migration's transaction).

ALTER TABLE public.user_activity SET (
  autovacuum_vacuum_scale_factor = 0.02,
  autovacuum_vacuum_insert_scale_factor = 0.02,
  autovacuum_analyze_scale_factor = 0.02
);

ALTER TABLE public.attempt_answers SET (
  autovacuum_vacuum_scale_factor = 0.02,
  autovacuum_vacuum_insert_scale_factor = 0.02,
  autovacuum_analyze_scale_factor = 0.02
);

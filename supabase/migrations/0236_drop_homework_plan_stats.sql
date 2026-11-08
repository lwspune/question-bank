-- 0236_drop_homework_plan_stats.sql
--
-- Drop 0234's homework_plan_stats (2026-11-08). Nothing calls it: 0235 keeps
-- each plan's counts on the plan row instead, because the function timed out
-- on its first real call (161k buffers, 4.1 s against anon's 3 s limit).
-- Kept apart from 0235 so that migration only adds.

DROP FUNCTION IF EXISTS public.homework_plan_stats(uuid[]);

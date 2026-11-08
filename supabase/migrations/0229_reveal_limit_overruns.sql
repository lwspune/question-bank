-- 0229_reveal_limit_overruns.sql -- who went past the daily answer limit on a day.
--
-- Why: the daily answer limit leaked for weeks and nothing noticed; the owner
-- spotted one student's 81 answers by chance (2026-11-07). claim_reveal (0228)
-- now decides every answer the site's own buttons open, so a student without a
-- pass should never pass the limit. The answers are still in the cached page,
-- though, and a tab opened before a deploy runs old code. This lists the
-- student-days that went past it, so the daily prod-contract run
-- (tests/reveal-limit-holds.test.ts) fails, and emails, the morning after.
--
-- Counts what claim_reveal counts: daily_reveals rows with counts = true, minus
-- that day's board-path questions (0225). Measured against TODAY's limit and
-- passes (no history is kept of either), so a limit lowered mid-day or a pass
-- that has since lapsed can name a student wrongly: read a hit before acting.
-- Staff are never named (user_has_pass covers them). Service role only: it
-- lists other students.

create or replace function public.reveal_limit_overruns(p_day date)
returns table (user_id uuid, used integer, day_limit integer)
language sql
stable
security definer
set search_path = ''
as $$
  with lim as (select s.free_reveals_per_day as n from public.paywall_settings s)
  select r.user_id, count(*)::integer as used, (select n from lim) as day_limit
  from public.daily_reveals r
  left join public.study_path_days d on d.user_id = r.user_id and d.day = r.ist_day
  where r.ist_day = p_day
    and r.counts
    and (select n from lim) is not null
    and not (r.question_id = any (coalesce(d.exempt_question_ids, array[]::uuid[])))
    and not private.user_has_pass(r.user_id, 'mocks')
  group by r.user_id
  having count(*) > (select n from lim)
  order by count(*) desc;
$$;

revoke all on function public.reveal_limit_overruns(date) from public, anon, authenticated;
grant execute on function public.reveal_limit_overruns(date) to service_role;

-- 0294_reveal_overruns_pass_at_time.sql
--
-- The daily check "no student without a pass went past the answer limit"
-- (reveal_limit_overruns, 0229; tests/reveal-limit-holds.test.ts) asks about
-- the pass a student holds at each answer's OWN time, not today.
--
-- WHY: on 2026-11-27 it named a student as 41 answers past a limit of 10. They
-- had opened all 41 between 04:34 and 05:33 IST on a 7-day Practice Pass trial
-- (0273) that ended at 21:11 IST the same day. 0229 asked
-- private.user_has_pass(), which reads passes active NOW, so a pass that ended
-- between the answers and the check turned a pass holder into a free student.
-- Trials end every night since 2026-11-19, so the check would cry wolf every
-- few days and a real leak could hide behind it.
--
-- HOW: an answer is left out when a pass covering the www limit (scope all,
-- mocks, practice or teacher: user_has_pass's rule for 'mocks') had started
-- and not yet ended at the answer's created_at. status 'active' or 'expired'
-- counts (a pass that ran out was valid while it ran); 'revoked' and
-- 'cancelled' never do (a refund takes the pass back). Staff (org members,
-- platform admins) stay left out as before; membership has no history.
--
-- Still measured against TODAY's limit (paywall_settings keeps no history), so
-- a limit lowered mid-day can still name a student wrongly; the test says so.

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
    and not exists (select 1 from public.org_members m where m.user_id = r.user_id)
    and not exists (select 1 from public.platform_admins p where p.user_id = r.user_id)
    and not exists (
      select 1 from public.entitlements e
      where e.user_id = r.user_id
        and e.scope in ('all', 'mocks', 'practice', 'teacher')
        and e.status in ('active', 'expired')
        and e.granted_at <= r.created_at
        and (e.expires_at is null or e.expires_at > r.created_at)
    )
  group by r.user_id
  having count(*) > (select n from lim)
  order by count(*) desc;
$$;

revoke all on function public.reveal_limit_overruns(date) from public, anon, authenticated;
grant execute on function public.reveal_limit_overruns(date) to service_role;

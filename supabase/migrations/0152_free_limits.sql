-- 0152_free_limits.sql
--
-- free_limits(): every free limit a pass perk can quote, for anyone.
--
-- WHY. A perk on /pricing used to carry its number as typed text ("free: 50
-- a day"), so changing a limit at /dashboard/pricing left the page quoting
-- the old one: on 2026-10-11 the answer limit went 50 -> 30 and the perk kept
-- saying 50. Perks now carry placeholders ("free: {reveals} a day") that the
-- plan read fills from these numbers (lib/billing/perkLimits.ts).
--
-- WHY A FUNCTION AND NOT A READ POLICY. paywall_settings is RLS-locked with
-- no read policy, and it also holds counts_from dates and the download
-- branding switches, which no visitor needs. The function returns the seven
-- numbers and nothing else. Same shape as free_mock_limit() (0121), which
-- stays: /pricing, /terms and V still read it.
--
-- A NULL value means that limit is off; the perk quoting it is then hidden.
-- Granted to anon because /pricing and the /browse download box are shown to
-- signed-out visitors.

create or replace function public.free_limits()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'reveals', s.free_reveals_per_day,
    'drill', s.free_drill_per_day,
    'saves', s.free_save_limit,
    'mocks', s.free_mock_limit,
    'chapterTests', s.free_chapter_test_limit,
    'projectionDays', s.projection_trial_days,
    'papersPerDay', s.mock_papers_per_day
  )
  from public.paywall_settings s
  limit 1;
$$;

revoke all on function public.free_limits() from public;
grant execute on function public.free_limits() to anon, authenticated;

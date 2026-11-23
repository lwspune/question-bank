-- 0274_intl_reveal_limit.sql -- the intl site gets its own daily answer limit.
--
-- Why: owner, 2026-11-19: "for intl add 10 qs reveal limit". Until now one
-- limit (paywall_settings.free_reveals_per_day, 15 on that day) covered every
-- paid exam on both sites, so an IMAT student had 15 free answers a day.
--
--   paywall_settings.intl_free_reveals_per_day  the limit for a question whose
--   exam sells an intl pass (IMAT, MCAT). NULL = off, like every other limit.
--   Set to 10 here; edited afterwards at /dashboard/pricing.
--
--   private.intl_pass_scopes()  which passes are intl. A list in code, not a
--   read of public.plans: a plan row is edited or switched off at
--   /dashboard/pricing, and that must never move an exam onto the other
--   site's limit. A new intl scope needs a migration anyway (the plans and
--   entitlements scope CHECKs), and tests/intl-reveal-limit.test.ts fails if
--   this list and INTL_PASS_SCOPES (lib/entitlements/access.ts) drift apart.
--
-- A free exam (ENEM, Class 9-10) is untouched: still no limit (owner,
-- 2026-11-19: "IMAT only for now"). The day's count stays ONE count across
-- both sites: an answer opened on www counts toward the intl limit the same
-- day. Almost nobody uses both, and two counts would need the exam on every
-- daily_reveals row.
--
-- Also: my_premium_limits reports the intl number (the reveal meter picks
-- the one its page's exam takes), free_limits offers it to pass perks as
-- {intlReveals}, and the intl passes' perks move from {reveals} to it.

alter table public.paywall_settings
  add column intl_free_reveals_per_day integer
    check (intl_free_reveals_per_day is null or intl_free_reveals_per_day >= 0);

comment on column public.paywall_settings.intl_free_reveals_per_day is
  'Answers a day a signed-in student without a pass may open on an intl exam (IMAT, MCAT; 0274). NULL = no limit.';

update public.paywall_settings set intl_free_reveals_per_day = 10;

-- ── which passes are intl ──────────────────────────────────────────────
create or replace function private.intl_pass_scopes()
returns text[]
language sql
immutable
set search_path = ''
as $$
  select array['imat', 'mcat']::text[];
$$;

-- ── the decision: 0273's body; only the limit read changed ─────────────
create or replace function public.claim_reveal(p_question_id uuid, p_surface text)
returns jsonb
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  uid      uuid := auth.uid();
  v_day    date := (now() at time zone 'Asia/Kolkata')::date;
  v_scope  text;
  v_limit  integer;
  v_exempt uuid[];
  v_used   integer;
  v_offer  boolean;
begin
  if uid is null then
    raise exception 'claim_reveal: not signed in' using errcode = '42501';
  end if;
  if p_question_id is null then
    raise exception 'claim_reveal: question required' using errcode = '22023';
  end if;
  if p_surface is null or p_surface not in ('bank', 'board', 'guide', 'v') then
    return jsonb_build_object('allowed', true, 'reason', 'uncounted', 'used', null, 'limit', null);
  end if;

  v_scope := private.exam_pass_scope((select q.exam_id from public.questions q where q.id = p_question_id));
  if v_scope = 'free' then
    return jsonb_build_object('allowed', true, 'reason', 'free', 'used', null, 'limit', null);
  end if;
  if private.user_has_pass(uid, v_scope) then
    return jsonb_build_object('allowed', true, 'reason', 'pass', 'used', null, 'limit', null);
  end if;

  -- 0274: an intl exam takes the intl limit.
  select case when v_scope = any (private.intl_pass_scopes())
              then s.intl_free_reveals_per_day
              else s.free_reveals_per_day end
    into v_limit
  from public.paywall_settings s;
  if v_limit is null then
    return jsonb_build_object('allowed', true, 'reason', 'off', 'used', null, 'limit', null);
  end if;

  select d.exempt_question_ids into v_exempt
  from public.study_path_days d
  where d.user_id = uid and d.day = v_day;
  v_exempt := coalesce(v_exempt, array[]::uuid[]);
  if p_question_id = any (v_exempt) then
    return jsonb_build_object('allowed', true, 'reason', 'path', 'used', null, 'limit', v_limit);
  end if;

  -- One claim at a time per student: two tabs cannot both take the last answer.
  perform pg_advisory_xact_lock(hashtextextended('claim_reveal:' || uid::text, 0));

  select count(*) into v_used
  from public.daily_reveals r
  where r.user_id = uid and r.ist_day = v_day and r.counts
    and not (r.question_id = any (v_exempt));

  if exists (
    select 1 from public.daily_reveals r
    where r.user_id = uid and r.ist_day = v_day and r.question_id = p_question_id
  ) then
    return jsonb_build_object('allowed', true, 'reason', 'repeat', 'used', v_used, 'limit', v_limit);
  end if;

  if v_used >= v_limit then
    insert into public.reveal_limit_days (user_id, ist_day) values (uid, v_day) on conflict do nothing;
    v_offer := p_surface <> 'v' and private.practice_trial_offer(uid, v_day, v_scope);
    return jsonb_build_object(
      'allowed', false, 'reason', 'limit', 'used', v_used, 'limit', v_limit,
      'trialOffer', case when v_offer then jsonb_build_object('days', 7) else null end,
      'trialEnded', private.practice_trial_ended(uid)
    );
  end if;

  insert into public.daily_reveals (user_id, ist_day, question_id, surface, counts)
  values (uid, v_day, p_question_id, p_surface, true)
  on conflict do nothing;
  return jsonb_build_object('allowed', true, 'reason', 'counted', 'used', v_used + 1, 'limit', v_limit);
end;
$$;

revoke all on function public.claim_reveal(uuid, text) from public, anon;
grant execute on function public.claim_reveal(uuid, text) to authenticated;

-- ── my_premium_limits: + intlRevealsPerDay (0210's body) ───────────────
create or replace function public.my_premium_limits()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  s   public.paywall_settings%rowtype;
begin
  if uid is null then
    return null;
  end if;
  select * into s from public.paywall_settings;
  return jsonb_build_object(
    'hasPass', private.user_has_mock_access(uid),
    'passScopes', to_jsonb(private.user_pass_scopes(uid)),
    'drillPerDay', s.free_drill_per_day,
    'revealsPerDay', s.free_reveals_per_day,
    'intlRevealsPerDay', s.intl_free_reveals_per_day,
    'saveLimit', s.free_save_limit,
    'saves', private.paid_saves(uid),
    'projectionTrialDays', s.projection_trial_days,
    'projectionStartedAt', (
      select t.started_at from public.premium_trials t
      where t.user_id = uid and t.feature = 'projection'
    )
  );
end;
$$;

-- ── free_limits: + intlReveals for pass perks (the live body) ──────────
create or replace function public.free_limits()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'reveals', s.free_reveals_per_day,
    'intlReveals', s.intl_free_reveals_per_day,
    'drill', s.free_drill_per_day,
    'saves', s.free_save_limit,
    'mocks', s.free_mock_limit,
    'chapterTests', s.free_chapter_test_limit,
    'projectionDays', s.projection_trial_days,
    'papersPerDay', s.mock_papers_per_day,
    'practiceTestsPerDay', s.free_practice_tests_per_day
  )
  from public.paywall_settings s
  limit 1;
$$;

-- ── the intl passes quote the intl number ──────────────────────────────
update public.plans p
set perks = (
  select array_agg(replace(u.perk, '{reveals}', '{intlReveals}') order by u.ord)
  from unnest(p.perks) with ordinality as u(perk, ord)
)
where p.site = 'intl'
  and array_to_string(p.perks, '|') like '%{reveals}%';

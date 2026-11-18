-- 0273_practice_trial.sql -- a 7-day Practice Pass, offered on a student's 3rd
-- day at the daily answer limit (owner, 2026-11-18).
--
-- Why: 12 of the 20 pass sales from 3 to 18 Nov came within a day of the
-- student's first day at the limit, so a trial at signup or on the 2nd day
-- would give away the moment that sells. Past the 3rd day only 4 of 46 buyers
-- in six weeks had paid, while 63 students had met the limit on 3+ days and
-- never bought. Those are the students this is for (growth experiment
-- `practice-trial`, lib/billing/practiceTrial.ts).
--
-- The rules, all decided here:
--   * reveal_limit_days  one row per student per IST day claim_reveal REFUSED
--     an answer at the limit (any surface, V included). Backfilled from the
--     page's own wall records (paywall_event shown, gate reveals), so students
--     who met the limit before today count those days (owner's pick).
--   * On the Nth such day (paywall_settings.practice_trial_after_days; NULL =
--     off) a refusal on a PAGE (bank, board, guide; never V, whose window shows
--     its own offer) carries `trialOffer`. The day is recorded in
--     practice_trial_offers; the offer shows on 3 days at the limit at most,
--     then never. Offer days count from launch, so a student already past day
--     3 still gets their three.
--   * Never offered to staff, to a free exam's or an intl exam's question (only
--     'mocks' and 'practice' scopes), or to anyone with ANY entitlement row,
--     current or lapsed, paid or not. A trial is an entitlement too, so one per
--     student ever, also held by a unique index.
--   * activate_practice_trial() grants it, and only on a day the offer showed:
--     scope 'practice', source 'trial', 7 days from the tap. Every pass check
--     already honours a 'practice' row; sales read source = 'razorpay' only, so
--     a trial is never counted as a sale (and the upgrade credit, Vault Points
--     and referral windows all read 'razorpay' rows too).
--   * After the trial, for two weeks a refusal carries `trialEnded` (when, and
--     how many questions the student answered in it), one line on the wall.

-- ── a new pass source ──────────────────────────────────────────────────
alter table public.entitlements
  drop constraint entitlements_source_check,
  add constraint entitlements_source_check
    check (source in ('razorpay', 'comp', 'manual', 'referral', 'trial'));

create unique index entitlements_one_trial_per_user
  on public.entitlements (user_id)
  where source = 'trial';

-- ── the switch ─────────────────────────────────────────────────────────
alter table public.paywall_settings
  add column practice_trial_after_days integer
    check (practice_trial_after_days is null or practice_trial_after_days >= 1);

comment on column public.paywall_settings.practice_trial_after_days is
  'Offer the 7-day Practice Pass trial on a student''s Nth day at the daily answer limit (0273). NULL = off.';

-- ── days at the limit ──────────────────────────────────────────────────
create table public.reveal_limit_days (
  user_id    uuid not null references auth.users(id) on delete cascade,
  ist_day    date not null,
  created_at timestamptz not null default now(),
  primary key (user_id, ist_day)
);

comment on table public.reveal_limit_days is
  'IST days claim_reveal refused a student an answer at the daily limit (0273). Written only by claim_reveal.';

alter table public.reveal_limit_days enable row level security;
create policy reveal_limit_days_select_own on public.reveal_limit_days
  for select to authenticated using (user_id = (select auth.uid()));
revoke insert, update, delete, truncate on public.reveal_limit_days from anon, authenticated;

-- ── days the offer showed ──────────────────────────────────────────────
create table public.practice_trial_offers (
  user_id    uuid not null references auth.users(id) on delete cascade,
  ist_day    date not null,
  created_at timestamptz not null default now(),
  primary key (user_id, ist_day)
);

comment on table public.practice_trial_offers is
  'IST days the 7-day Practice Pass offer showed to a student (0273): 3 at most. Written only by claim_reveal.';

alter table public.practice_trial_offers enable row level security;
create policy practice_trial_offers_select_own on public.practice_trial_offers
  for select to authenticated using (user_id = (select auth.uid()));
revoke insert, update, delete, truncate on public.practice_trial_offers from anon, authenticated;

-- ── past days at the limit, from the page's own wall records ──────────
insert into public.reveal_limit_days (user_id, ist_day)
select distinct a.user_id, (a.created_at at time zone 'Asia/Kolkata')::date
from public.user_activity a
where a.kind = 'paywall_event'
  and a.metadata->>'step' = 'shown'
  and a.metadata->>'gate' = 'reveals'
  and a.user_id is not null
  and exists (select 1 from auth.users u where u.id = a.user_id)
on conflict do nothing;

-- ── may this refusal carry the offer? (records the offer day) ─────────
create or replace function private.practice_trial_offer(uid uuid, p_day date, p_scope text)
returns boolean
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_after  integer;
  v_days   integer;
  v_offers integer;
begin
  select s.practice_trial_after_days into v_after from public.paywall_settings s;
  if v_after is null then return false; end if;
  if p_scope is null or p_scope not in ('mocks', 'practice') then return false; end if;
  if exists (select 1 from public.org_members m where m.user_id = uid)
     or exists (select 1 from public.platform_admins p where p.user_id = uid) then
    return false;
  end if;
  -- Any pass, ever: a buyer, a gift, a referral reward, or the trial itself.
  if exists (select 1 from public.entitlements e where e.user_id = uid) then return false; end if;

  select count(*) into v_days from public.reveal_limit_days d where d.user_id = uid;
  if v_days < v_after then return false; end if;

  if exists (select 1 from public.practice_trial_offers o where o.user_id = uid and o.ist_day = p_day) then
    return true;
  end if;
  select count(*) into v_offers from public.practice_trial_offers o where o.user_id = uid;
  if v_offers >= 3 then return false; end if;

  insert into public.practice_trial_offers (user_id, ist_day) values (uid, p_day) on conflict do nothing;
  return true;
end;
$$;

-- ── the line after a trial: when it ended, how much the student did ────
create or replace function private.practice_trial_ended(uid uuid)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'endedAt', e.expires_at,
    'answered', (
      select count(*)::integer from public.user_activity a
      where a.user_id = uid
        and a.kind = 'question_practiced'
        and a.created_at >= e.granted_at
        and a.created_at < e.expires_at
    )
  )
  from public.entitlements e
  where e.user_id = uid
    and e.source = 'trial'
    and e.expires_at <= now()
    and e.expires_at > now() - interval '14 days'
  limit 1;
$$;

-- ── the decision: 0228's body; the refusal now records the day and may
--    carry the offer or the ended line ─────────────────────────────────
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

  select s.free_reveals_per_day into v_limit from public.paywall_settings s;
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

-- ── Activate: the only way a trial is granted ──────────────────────────
-- Returns {ok: true, expiresAt} or {ok: false, reason}. A double tap returns
-- the same pass; an ended trial is never granted again.
create or replace function public.activate_practice_trial()
returns jsonb
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  uid     uuid := auth.uid();
  v_day   date := (now() at time zone 'Asia/Kolkata')::date;
  v_trial public.entitlements%rowtype;
  v_ends  timestamptz;
begin
  if uid is null then
    raise exception 'activate_practice_trial: not signed in' using errcode = '42501';
  end if;
  perform pg_advisory_xact_lock(hashtextextended('practice_trial:' || uid::text, 0));

  select * into v_trial from public.entitlements e where e.user_id = uid and e.source = 'trial';
  if found then
    if v_trial.status = 'active' and v_trial.expires_at > now() then
      return jsonb_build_object('ok', true, 'expiresAt', v_trial.expires_at);
    end if;
    return jsonb_build_object('ok', false, 'reason', 'used');
  end if;

  if not exists (select 1 from public.practice_trial_offers o where o.user_id = uid and o.ist_day = v_day) then
    return jsonb_build_object('ok', false, 'reason', 'no_offer');
  end if;
  -- The offer showed today; check the rest again at the tap.
  if (select s.practice_trial_after_days from public.paywall_settings s) is null
     or exists (select 1 from public.entitlements e where e.user_id = uid)
     or exists (select 1 from public.org_members m where m.user_id = uid)
     or exists (select 1 from public.platform_admins p where p.user_id = uid) then
    return jsonb_build_object('ok', false, 'reason', 'not_eligible');
  end if;

  insert into public.entitlements (user_id, scope, source, status, granted_at, expires_at, provider_ref, note)
  values (uid, 'practice', 'trial', 'active', now(), now() + interval '7 days', 'trial:' || uid::text,
          'practice trial (0273)')
  returning expires_at into v_ends;
  return jsonb_build_object('ok', true, 'expiresAt', v_ends);
end;
$$;

revoke all on function public.activate_practice_trial() from public, anon;
grant execute on function public.activate_practice_trial() to authenticated;
revoke all on function private.practice_trial_offer(uuid, date, text) from public, anon, authenticated;
revoke all on function private.practice_trial_ended(uuid) from public, anon, authenticated;

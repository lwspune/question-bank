-- 0249_referrals.sql
--
-- Referrals (owner, 2026-11-09). Every student has a link, /r/<code>. A friend
-- who creates a NEW account after opening it gets 25% off their first pass;
-- when that friend pays, the inviter gets 30 days of Premium (scope 'mocks'),
-- added after any Premium they already hold, up to 6 times. Rules and copy:
-- src/lib/referrals/referral.ts; reads and writes: src/lib/referrals/service.ts.
--
-- Measured as experiment "referrals" (src/lib/growth/registry.ts): kept on 3+
-- referred sales in 30 days, switched off otherwise. The owner built it against
-- the data on purpose: students share under 1% of the time (18 real
-- "practise together" sends in 3 weeks, 0 joins).
--
-- SERVICE ROLE ONLY, both tables: a code, an attachment and a reward are all
-- decided on the server, and a student reads their own counts through
-- /api/me/referral. No anon/authenticated grant at all (least privilege): a
-- referrals row names the friend's account, which is not the inviter's to read.

-- One code per student, made the first time their card asks for it.
create table public.referral_codes (
  user_id    uuid        primary key references auth.users (id) on delete cascade,
  -- Capitals and digits without 0/O/1/I (lib/referrals/referral.ts ALPHABET).
  code       text        not null unique check (code ~ '^[A-HJ-NP-Z2-9]{8}$'),
  created_at timestamptz not null default now()
);

-- One row per referred friend: friend_id is the key, so a friend has exactly
-- one inviter and a second link opened later changes nothing.
create table public.referrals (
  friend_id             uuid        primary key references auth.users (id) on delete cascade,
  referrer_id           uuid        not null references auth.users (id) on delete cascade,
  created_at            timestamptz not null default now(),
  -- The friend's first pass bought at the referral price. Set once, by
  -- complete_referral; it is what makes the reward happen at most once.
  paid_payment_id       text        unique,
  paid_at               timestamptz,
  -- The inviter's 30 days, when this sale earned them (null under the cap).
  reward_entitlement_id uuid        references public.entitlements (id) on delete set null,
  constraint referrals_not_self check (friend_id <> referrer_id),
  constraint referrals_paid_together check ((paid_payment_id is null) = (paid_at is null))
);

create index referrals_referrer_idx on public.referrals (referrer_id, created_at desc);

alter table public.referral_codes enable row level security;
alter table public.referrals enable row level security;
revoke all on public.referral_codes from anon, authenticated;
revoke all on public.referrals from anon, authenticated;

-- The inviter's free days are an entitlement like any other pass, so every
-- pass check honours them unchanged (none of them filters on source). Its own
-- source keeps it out of sales (source = 'razorpay') and out of the Vault
-- Points window, which restarts only at a purchase.
alter table public.entitlements
  drop constraint entitlements_source_check,
  add constraint entitlements_source_check
    check (source in ('razorpay', 'comp', 'manual', 'referral'));

-- provider_ref = 'referral:<friend's payment id>': one reward per payment,
-- and the refund path finds it by that payment.
create unique index entitlements_referral_provider_ref_key
  on public.entitlements (provider_ref)
  where source = 'referral' and provider_ref is not null;

-- Share taps on the invite card, beside the other share kinds (0109/0163/0166).
alter table public.share_events
  drop constraint share_events_subject_kind_check,
  add constraint share_events_subject_kind_check
    check (subject_kind in ('mock', 'practice', 'mock_together', 'referral'));

-- The reward, in ONE transaction, called by both grant paths (client verify
-- and the order.paid webhook) after the friend's pass is granted:
--   1. mark the friend's referral paid; a row already paid (the other grant
--      path got here first) or no referral at all returns 'none';
--   2. lock the inviter, so two friends paying at once cannot both take the
--      last free slot;
--   3. under the cap (rewards not revoked by a refund), add p_days of Premium
--      after the latest Premium the inviter already holds ('rewarded'), else
--      leave the sale recorded and give nothing ('capped').
-- p_days and p_max come from lib/referrals/referral.ts, the one place the
-- numbers live.
create or replace function public.complete_referral(
  p_friend uuid,
  p_payment text,
  p_days integer,
  p_max integer
)
returns text
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_referrer uuid;
  v_rewards  integer;
  v_from     timestamptz;
  v_ent      uuid;
begin
  if p_payment is null or length(p_payment) = 0 or p_days <= 0 or p_max <= 0 then
    raise exception 'complete_referral: bad arguments';
  end if;

  update public.referrals
     set paid_payment_id = p_payment, paid_at = now()
   where friend_id = p_friend and paid_payment_id is null
  returning referrer_id into v_referrer;
  if v_referrer is null then
    return 'none';
  end if;

  perform pg_advisory_xact_lock(hashtextextended('referral:' || v_referrer::text, 0));

  select count(*) into v_rewards
    from public.entitlements
   where user_id = v_referrer and source = 'referral' and status <> 'revoked';
  if v_rewards >= p_max then
    return 'capped';
  end if;

  -- Premium the inviter already holds ('mocks', or the old 'all'): the new
  -- days start where it ends. A Practice holder gets Premium from today.
  select greatest(now(), coalesce(max(expires_at), now())) into v_from
    from public.entitlements
   where user_id = v_referrer
     and status = 'active'
     and scope in ('mocks', 'all')
     and expires_at > now();

  insert into public.entitlements (user_id, scope, source, status, expires_at, provider_ref, note)
  values (v_referrer, 'mocks', 'referral', 'active', v_from + make_interval(days => p_days),
          'referral:' || p_payment, 'referral')
  returning id into v_ent;

  update public.referrals set reward_entitlement_id = v_ent where friend_id = p_friend;
  return 'rewarded';
end;
$$;

revoke all on function public.complete_referral(uuid, text, integer, integer) from public, anon, authenticated;
grant execute on function public.complete_referral(uuid, text, integer, integer) to service_role;

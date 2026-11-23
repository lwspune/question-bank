-- 0283_billing_webhook_receipts.sql
--
-- The webhook alarm (2026-11-22). Every Razorpay and Paddle webhook delivery
-- that passes its signature check is recorded here, and the payment check
-- emails the owner when a paid order has no delivery behind it.
--
-- WHY: Razorpay's webhook sat DISABLED from 30 Oct to 22 Nov 2026 (Razorpay
-- switches a webhook off by itself after a run of failed deliveries, and its
-- warning went to an inbox nobody read). Nothing on our side noticed for 23
-- days: most buyers are granted by their own browser, so sales kept working.
-- Three buyers whose UPI app never handed back to the page were stranded
-- (1 Nov, 15 Nov, 22 Nov), and a full refund would not have removed a pass.
-- Every paid order should still get an order.paid delivery, so "a paid order
-- with no delivery" says the webhook is off on the first day, stranded buyer
-- or not. A row is the only record of a delivery: Vercel's logs keep a few
-- days and say nothing once a route stops being called.
--
-- WHY NOT read Razorpay's delivery log instead: we found the webhook's status
-- and delivery history only in Razorpay's dashboard, behind a sign-in, not in
-- the payments API our keys use. Our side keeps its own count.
--
-- billing_alarm_sends makes "at most one alarm email a day" a property of the
-- table: the check inserts (alarm, IST day) and sends only when the insert
-- was new, so two overlapping runs (Vercel's schedule and GitHub's backup)
-- cannot both send.
--
-- SIZE: a few rows a day (one per paid order, plus refunds and Paddle's
-- events). Kept 90 days by the check itself; nothing reads further back than
-- the check's own 3-day window.
--
-- ACCESS: none. RLS on with no policies and no grants to anon/authenticated:
-- only the service role (the webhook routes and the payment check) reads or
-- writes.
create table public.billing_webhook_receipts (
  id          bigint      generated always as identity primary key,
  provider    text        not null check (provider in ('razorpay', 'paddle')),
  event       text        not null check (char_length(event) between 1 and 64),
  ref         text        check (ref is null or char_length(ref) between 1 and 64),
  received_at timestamptz not null default now()
);

-- The check asks "which of these orders had a delivery?" by provider + ref.
create index billing_webhook_receipts_ref_idx
  on public.billing_webhook_receipts (provider, ref, event);
-- And trims by age.
create index billing_webhook_receipts_received_idx
  on public.billing_webhook_receipts (received_at);

alter table public.billing_webhook_receipts enable row level security;
revoke all on public.billing_webhook_receipts from anon, authenticated;

create table public.billing_alarm_sends (
  alarm   text        not null check (alarm in ('webhook_silent')),
  ist_day date        not null,
  sent_at timestamptz not null default now(),
  primary key (alarm, ist_day)
);

alter table public.billing_alarm_sends enable row level security;
revoke all on public.billing_alarm_sends from anon, authenticated;

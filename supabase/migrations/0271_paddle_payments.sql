-- 0271_paddle_payments.sql -- the intl site's USD passes are sold through Paddle.
--
-- Why (2026-11-17, owner): Paddle is a Merchant of Record. It sells the pass in
-- its own name and collects the buyer's sales tax: EU VAT is owed from the
-- first sale when a seller outside the EU sells to an EU consumer, and IMAT
-- buyers are largely in the EU. Razorpay stays for everything priced in
-- rupees (www, the Gulf prices, the IMAT India price, ebooks).
--
-- plans.payment_provider: which gateway sells a plan, 'razorpay' (every
-- existing row) or 'paddle'. Data, not code, so a plan can move back to
-- Razorpay with one UPDATE if Paddle ever fails us. A Paddle plan names its
-- Paddle product (paddle_product_id); the PRICE is not in Paddle's catalogue.
-- Our server sends this plan's price with each transaction, so
-- /dashboard/pricing stays the one place a price lives.
--
-- entitlements.payment_provider: which gateway took the money for a paid pass.
--
-- ALTERNATIVE REJECTED: a new entitlements.source value 'paddle'. source =
-- 'razorpay' has meant "a paid pass" since 0026, and it is read that way in
-- eight SQL functions (sales_by_period, the growth and acquisition snapshots,
-- push, fix points) and eight TypeScript readers (sales, referrals, upgrades,
-- the left-checkout bar). A new source would silently drop every Paddle sale
-- from all of them. So a Paddle pass keeps source 'razorpay' ("paid") and this
-- column says which gateway; the CHECK keeps the pair honest. The 0027 unique
-- index on provider_ref (where source = 'razorpay') therefore also stops a
-- Paddle transaction id being granted twice. Paddle ids start 'txn_', Razorpay
-- payment ids 'pay_', so the two can never collide.

alter table public.plans
  add column payment_provider text not null default 'razorpay'
    check (payment_provider in ('razorpay', 'paddle')),
  add column paddle_product_id text,
  add constraint plans_paddle_product_check
    check (payment_provider <> 'paddle' or paddle_product_id is not null);

comment on column public.plans.payment_provider is
  'Which gateway sells the plan: razorpay (default) or paddle (Merchant of Record, migration 0271).';
comment on column public.plans.paddle_product_id is
  'The Paddle product (pro_...) a Paddle plan is sold as. The price is sent per transaction from amount_paise.';

alter table public.entitlements
  add column payment_provider text not null default 'razorpay'
    check (payment_provider in ('razorpay', 'paddle')),
  add constraint entitlements_paid_provider_check
    check (payment_provider = 'razorpay' or source = 'razorpay');

comment on column public.entitlements.payment_provider is
  'Which gateway took the money for a paid pass (source = ''razorpay'' means paid, whichever gateway). Migration 0271.';

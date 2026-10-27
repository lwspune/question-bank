-- 0197_entitlement_amount_required.sql -- a paid pass must record what it cost.
--
-- Why: /dashboard/sales adds up entitlements.amount_paise (0196). A paid grant without one would
-- count as a sale of Rs 0 and the totals would stop matching Razorpay, with no error anywhere.
-- Comp and manual grants have no price and stay free to leave it empty.
--
-- ORDER (shared production database): apply this only AFTER the deploy that writes amount_paise
-- on every grant AND after scripts/billing/backfill-pass-amounts.ts --apply has filled the
-- earlier sales. Applied before the deploy, every sale fails until it lands; before the backfill,
-- the constraint itself fails on the empty rows.

alter table public.entitlements
  add constraint entitlements_paid_has_amount
  check (source <> 'razorpay' or amount_paise is not null);

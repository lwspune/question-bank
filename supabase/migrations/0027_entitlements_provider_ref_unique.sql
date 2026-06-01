-- 0027_entitlements_provider_ref_unique.sql
--
-- Idempotency for Razorpay grants. A single payment must grant access at most
-- once, even though TWO code paths try to grant it (the client-verify endpoint
-- for instant UX + the webhook as the authoritative backstop). A partial unique
-- index on the Razorpay payment id makes the second insert fail with 23505,
-- which grantRazorpayEntitlement() treats as "already granted".
--
-- Partial (source='razorpay' AND provider_ref IS NOT NULL) so comp/manual grants
-- — which have no provider_ref — are unaffected.

CREATE UNIQUE INDEX entitlements_razorpay_provider_ref_key
  ON public.entitlements (provider_ref)
  WHERE source = 'razorpay' AND provider_ref IS NOT NULL;

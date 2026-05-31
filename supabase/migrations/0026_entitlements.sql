-- 0026_entitlements.sql
--
-- Per-USER access grants for paid/premium features. Keyed on auth.users(id),
-- deliberately INDEPENDENT of orgs/org_members — a paying or comped student
-- has no org, so entitlement is its own axis (see CLAUDE.md "Design axes").
--
-- A row grants access to a `scope`. The special scope 'all' is the full-premium
-- flag and unlocks everything; a specific scope (e.g. a future notes-chapter
-- key) unlocks only itself. Access counts only while status='active' and the
-- row hasn't passed `expires_at` (null = no expiry / comp-till-revoked).
--
-- `source` records HOW access was granted — 'razorpay' (webhook), 'comp'
-- (admin grant to LWS's own students), or 'manual' (one-off SQL/ops). The gate
-- only asks "is there an active entitlement?" — agnostic to source. This is why
-- entitlement is a first-class table, not "did a payment fire": comp grants and
-- paid grants write the SAME table.
--
-- WRITES ARE SERVICE-ROLE ONLY. No insert/update/delete RLS policy exists, so
-- a user JWT can never forge access. The Razorpay webhook (Phase 4) and the
-- comp-admin UI (Phase 2) both write via the service-role client, exactly like
-- src/lib/members/admin.ts. Users may only SELECT their own rows.

CREATE TABLE public.entitlements (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scope        text NOT NULL DEFAULT 'all',
  source       text NOT NULL CHECK (source IN ('razorpay', 'comp', 'manual')),
  status       text NOT NULL DEFAULT 'active'
                 CHECK (status IN ('active', 'expired', 'revoked', 'cancelled')),
  granted_at   timestamptz NOT NULL DEFAULT now(),
  expires_at   timestamptz,
  provider_ref text,
  note         text,
  granted_by   uuid REFERENCES auth.users(id),
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- Hot path is "active grants for this user". Partial index keeps it lean.
CREATE INDEX entitlements_user_active_idx
  ON public.entitlements (user_id)
  WHERE status = 'active';

ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;

-- A user reads only their own entitlements. Admin reads (for the comp UI) go
-- through the service-role client, which bypasses RLS by design.
CREATE POLICY "entitlements_select_own"
  ON public.entitlements
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- No INSERT/UPDATE/DELETE policies: writes are service-role only.

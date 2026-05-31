/**
 * Entitlement admin helpers (comp-access grant / list / revoke).
 *
 * Uses the service-role admin client because entitlements have NO write RLS
 * policy by design (see migration 0026) — writes are service-role only. The
 * route guard (requireAdmin) is the access control; the service-role client is
 * the write path. Mirrors src/lib/members/admin.ts.
 *
 * Comp grants target self-serve students by EMAIL. The student must already
 * have an account (require-signup-first) — we never create users here, so no
 * password handling. If the email has no auth user, the caller is told to have
 * the student sign up first.
 */
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isValidEmail } from "@/lib/auth/credentials";
import { SCOPE_ALL } from "./access";

export type GrantInput = {
  email: string;
  scope: string;
  expiresAt: string | null;
};

export type GrantValidation =
  | { ok: true }
  | { ok: false; field: "email" | "scope" | "expiresAt"; message: string };

/**
 * Pure validation for a comp grant. Field order (email → scope → expiry) so the
 * first surfaced error maps to the topmost form field. `expiresAt` null = no
 * expiry; otherwise it must parse and be in the future relative to `nowMs`.
 */
export function validateGrant(input: GrantInput, nowMs: number): GrantValidation {
  if (!isValidEmail(input.email)) {
    return { ok: false, field: "email", message: "Enter a valid email address." };
  }
  if (!input.scope || !input.scope.trim()) {
    return { ok: false, field: "scope", message: "Scope is required." };
  }
  if (input.expiresAt !== null) {
    const t = new Date(input.expiresAt).getTime();
    if (Number.isNaN(t)) {
      return { ok: false, field: "expiresAt", message: "Expiry date is invalid." };
    }
    if (t <= nowMs) {
      return { ok: false, field: "expiresAt", message: "Expiry must be in the future." };
    }
  }
  return { ok: true };
}

// ────────────────────────────────────────────────────────────────────
// grantEntitlement
// ────────────────────────────────────────────────────────────────────

export type GrantEntitlementInput = {
  email: string;
  scope: string;
  expiresAt: string | null;
  note: string | null;
  grantedBy: string;
};

export type GrantEntitlementResult =
  | { kind: "ok"; id: string; userId: string }
  | { kind: "invalid"; field: "email" | "scope" | "expiresAt"; message: string }
  | { kind: "user_not_found" }
  | { kind: "error"; message: string };

export async function grantEntitlement(
  input: GrantEntitlementInput
): Promise<GrantEntitlementResult> {
  const scope = (input.scope || "").trim() || SCOPE_ALL;
  const validation = validateGrant(
    { email: input.email, scope, expiresAt: input.expiresAt },
    Date.now()
  );
  if (!validation.ok) {
    return { kind: "invalid", field: validation.field, message: validation.message };
  }

  const admin = createSupabaseAdminClient();
  const email = input.email.trim().toLowerCase();

  try {
    // Resolve the email → auth user. Require-signup-first: no auto-create.
    const { data: usersPage, error: listErr } =
      await admin.auth.admin.listUsers({ perPage: 1000 });
    if (listErr) return { kind: "error", message: listErr.message };
    const user = usersPage.users.find((u) => u.email?.toLowerCase() === email);
    if (!user) return { kind: "user_not_found" };

    const { data: inserted, error: insErr } = await admin
      .from("entitlements")
      .insert({
        user_id: user.id,
        scope,
        source: "comp",
        status: "active",
        expires_at: input.expiresAt,
        note: input.note?.trim() || null,
        granted_by: input.grantedBy,
      })
      .select("id")
      .single();
    if (insErr) return { kind: "error", message: insErr.message };
    return { kind: "ok", id: (inserted as { id: string }).id, userId: user.id };
  } catch (err) {
    return { kind: "error", message: err instanceof Error ? err.message : String(err) };
  }
}

// ────────────────────────────────────────────────────────────────────
// listEntitlements
// ────────────────────────────────────────────────────────────────────

export type EntitlementAdminRow = {
  id: string;
  userId: string;
  email: string;
  scope: string;
  source: string;
  status: string;
  grantedAt: string;
  expiresAt: string | null;
  note: string | null;
};

export type ListEntitlementsResult =
  | { kind: "ok"; rows: EntitlementAdminRow[] }
  | { kind: "error"; message: string };

export async function listEntitlements(): Promise<ListEntitlementsResult> {
  try {
    const admin = createSupabaseAdminClient();
    const { data: rows, error } = await admin
      .from("entitlements")
      .select("id, user_id, scope, source, status, granted_at, expires_at, note")
      .order("granted_at", { ascending: false });
    if (error) return { kind: "error", message: error.message };

    // Hydrate emails from auth.users (single page — our scale is small).
    const { data: usersPage, error: listErr } =
      await admin.auth.admin.listUsers({ perPage: 1000 });
    if (listErr) return { kind: "error", message: listErr.message };
    const emailById = new Map(usersPage.users.map((u) => [u.id, u.email ?? "(unknown)"]));

    const result: EntitlementAdminRow[] = (rows ?? []).map((r) => ({
      id: r.id as string,
      userId: r.user_id as string,
      email: emailById.get(r.user_id as string) ?? "(unknown)",
      scope: r.scope as string,
      source: r.source as string,
      status: r.status as string,
      grantedAt: r.granted_at as string,
      expiresAt: (r.expires_at as string | null) ?? null,
      note: (r.note as string | null) ?? null,
    }));
    return { kind: "ok", rows: result };
  } catch (err) {
    return { kind: "error", message: err instanceof Error ? err.message : String(err) };
  }
}

// ────────────────────────────────────────────────────────────────────
// revokeEntitlement
// ────────────────────────────────────────────────────────────────────

export type RevokeEntitlementResult =
  | { kind: "ok" }
  | { kind: "not_found" }
  | { kind: "error"; message: string };

export async function revokeEntitlement(
  id: string
): Promise<RevokeEntitlementResult> {
  try {
    const admin = createSupabaseAdminClient();
    const { data, error } = await admin
      .from("entitlements")
      .update({ status: "revoked" })
      .eq("id", id)
      .select("id")
      .maybeSingle();
    if (error) return { kind: "error", message: error.message };
    if (!data) return { kind: "not_found" };
    return { kind: "ok" };
  } catch (err) {
    return { kind: "error", message: err instanceof Error ? err.message : String(err) };
  }
}

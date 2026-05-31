/**
 * Org-member admin helpers (provisioning + management).
 *
 * Uses the service-role admin client because:
 *   - auth.admin.* needs the service-role key
 *   - org_members reads require admin RLS (already covered by the route
 *     guard that calls these, so bypassing RLS server-side is safe)
 *
 * Every helper takes the caller's org id explicitly so the operation
 * stays scoped — the service-role client wouldn't enforce it otherwise.
 */
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

// Credential validators live in the client-safe module; imported for local
// use here and re-exported so existing imports (route + tests) keep working.
import {
  MIN_PASSWORD_LENGTH,
  isValidEmail,
  isValidPassword,
} from "@/lib/auth/credentials";
export { MIN_PASSWORD_LENGTH, isValidEmail, isValidPassword };

export type MemberRole = "ADMIN" | "TEACHER";

export type MemberRow = {
  userId: string;
  email: string;
  name: string | null;
  role: MemberRole;
  lastSignInAt: string | null;
};

export function isValidRole(value: unknown): value is MemberRole {
  return value === "ADMIN" || value === "TEACHER";
}

// ────────────────────────────────────────────────────────────────────
// listMembers
// ────────────────────────────────────────────────────────────────────

export type ListMembersResult =
  | { kind: "ok"; members: MemberRow[] }
  | { kind: "error"; message: string };

export async function listMembers(orgId: string): Promise<ListMembersResult> {
  try {
    const admin = createSupabaseAdminClient();
    const { data: rows, error } = await admin
      .from("org_members")
      .select("user_id, role")
      .eq("org_id", orgId);
    if (error) return { kind: "error", message: error.message };

    // Hydrate from auth.users via the admin API. listUsers paginates;
    // for our scale (single-digit teachers per org) one page is enough.
    const { data: usersPage, error: listErr } =
      await admin.auth.admin.listUsers({ perPage: 1000 });
    if (listErr) return { kind: "error", message: listErr.message };

    const byId = new Map(usersPage.users.map((u) => [u.id, u]));
    const members: MemberRow[] = (rows ?? []).map((r) => {
      const u = byId.get(r.user_id);
      const meta = (u?.user_metadata ?? {}) as { name?: string };
      return {
        userId: r.user_id,
        email: u?.email ?? "(unknown)",
        name: meta.name ?? null,
        role: r.role as MemberRole,
        lastSignInAt: u?.last_sign_in_at ?? null,
      };
    });
    // Stable order: admins first, then by name/email
    members.sort((a, b) => {
      if (a.role !== b.role) return a.role === "ADMIN" ? -1 : 1;
      const aLabel = (a.name ?? a.email).toLowerCase();
      const bLabel = (b.name ?? b.email).toLowerCase();
      return aLabel.localeCompare(bLabel);
    });
    return { kind: "ok", members };
  } catch (err) {
    return { kind: "error", message: err instanceof Error ? err.message : String(err) };
  }
}

// ────────────────────────────────────────────────────────────────────
// createMember
// ────────────────────────────────────────────────────────────────────

export type CreateMemberInput = {
  email: string;
  password: string;
  name: string;
  role: MemberRole;
};

export type CreateMemberResult =
  | { kind: "ok"; userId: string }
  | { kind: "invalid_email" }
  | { kind: "invalid_password" }
  | { kind: "invalid_role" }
  | { kind: "invalid_name" }
  | { kind: "email_taken_other_org" }
  | { kind: "already_member" }
  | { kind: "error"; message: string };

export async function createMember(
  orgId: string,
  input: CreateMemberInput
): Promise<CreateMemberResult> {
  if (!isValidEmail(input.email)) return { kind: "invalid_email" };
  if (!isValidPassword(input.password)) return { kind: "invalid_password" };
  if (!isValidRole(input.role)) return { kind: "invalid_role" };
  if (!input.name || !input.name.trim()) return { kind: "invalid_name" };

  const admin = createSupabaseAdminClient();
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();

  try {
    // Does an auth user with this email already exist?
    const { data: usersPage, error: listErr } =
      await admin.auth.admin.listUsers({ perPage: 1000 });
    if (listErr) return { kind: "error", message: listErr.message };
    const existing = usersPage.users.find(
      (u) => u.email?.toLowerCase() === email
    );

    let userId: string;
    if (existing) {
      // Existing auth user — check if already a member of THIS org.
      const { data: membership } = await admin
        .from("org_members")
        .select("user_id, org_id")
        .eq("user_id", existing.id)
        .maybeSingle();
      if (membership?.org_id === orgId) return { kind: "already_member" };
      if (membership) return { kind: "email_taken_other_org" };
      // Existing user, not in any org — update password + name then add to this org.
      const { error: updErr } = await admin.auth.admin.updateUserById(existing.id, {
        password: input.password,
        user_metadata: { ...(existing.user_metadata ?? {}), name },
      });
      if (updErr) return { kind: "error", message: updErr.message };
      userId = existing.id;
    } else {
      const { data: created, error: createErr } =
        await admin.auth.admin.createUser({
          email,
          password: input.password,
          email_confirm: true,
          user_metadata: { name },
        });
      if (createErr) return { kind: "error", message: createErr.message };
      if (!created.user) return { kind: "error", message: "user creation returned no user" };
      userId = created.user.id;
    }

    // INSERT membership row.
    const { error: memErr } = await admin
      .from("org_members")
      .insert({ user_id: userId, org_id: orgId, role: input.role });
    if (memErr) {
      // 23505 = unique violation (already a member). Race-safe.
      if (memErr.code === "23505") return { kind: "already_member" };
      return { kind: "error", message: memErr.message };
    }
    return { kind: "ok", userId };
  } catch (err) {
    return { kind: "error", message: err instanceof Error ? err.message : String(err) };
  }
}

// ────────────────────────────────────────────────────────────────────
// resetMemberPassword
// ────────────────────────────────────────────────────────────────────

export type ResetPasswordResult =
  | { kind: "ok" }
  | { kind: "invalid_password" }
  | { kind: "not_member" }
  | { kind: "error"; message: string };

export async function resetMemberPassword(
  orgId: string,
  userId: string,
  newPassword: string
): Promise<ResetPasswordResult> {
  if (!isValidPassword(newPassword)) return { kind: "invalid_password" };
  try {
    const admin = createSupabaseAdminClient();
    const { data: mem } = await admin
      .from("org_members")
      .select("user_id")
      .eq("org_id", orgId)
      .eq("user_id", userId)
      .maybeSingle();
    if (!mem) return { kind: "not_member" };
    const { error } = await admin.auth.admin.updateUserById(userId, {
      password: newPassword,
    });
    if (error) return { kind: "error", message: error.message };
    return { kind: "ok" };
  } catch (err) {
    return { kind: "error", message: err instanceof Error ? err.message : String(err) };
  }
}

// ────────────────────────────────────────────────────────────────────
// removeMember
// ────────────────────────────────────────────────────────────────────

export type RemoveMemberResult =
  | { kind: "ok" }
  | { kind: "not_member" }
  | { kind: "would_remove_last_admin" }
  | { kind: "cannot_remove_self" }
  | { kind: "error"; message: string };

export async function removeMember(
  orgId: string,
  callerUserId: string,
  targetUserId: string
): Promise<RemoveMemberResult> {
  if (callerUserId === targetUserId) return { kind: "cannot_remove_self" };
  try {
    const admin = createSupabaseAdminClient();
    const { data: target } = await admin
      .from("org_members")
      .select("user_id, role")
      .eq("org_id", orgId)
      .eq("user_id", targetUserId)
      .maybeSingle<{ user_id: string; role: MemberRole }>();
    if (!target) return { kind: "not_member" };

    if (target.role === "ADMIN") {
      // Ensure we don't strand the org without any admin.
      const { count } = await admin
        .from("org_members")
        .select("user_id", { count: "exact", head: true })
        .eq("org_id", orgId)
        .eq("role", "ADMIN");
      if ((count ?? 0) <= 1) return { kind: "would_remove_last_admin" };
    }

    const { error } = await admin
      .from("org_members")
      .delete()
      .eq("org_id", orgId)
      .eq("user_id", targetUserId);
    if (error) return { kind: "error", message: error.message };
    return { kind: "ok" };
  } catch (err) {
    return { kind: "error", message: err instanceof Error ? err.message : String(err) };
  }
}

// ────────────────────────────────────────────────────────────────────
// updateMemberRole
// ────────────────────────────────────────────────────────────────────

export type UpdateRoleResult =
  | { kind: "ok" }
  | { kind: "invalid_role" }
  | { kind: "not_member" }
  | { kind: "would_remove_last_admin" }
  | { kind: "cannot_change_own_role" }
  | { kind: "error"; message: string };

export async function updateMemberRole(
  orgId: string,
  callerUserId: string,
  targetUserId: string,
  newRole: MemberRole
): Promise<UpdateRoleResult> {
  if (!isValidRole(newRole)) return { kind: "invalid_role" };
  if (callerUserId === targetUserId) return { kind: "cannot_change_own_role" };
  try {
    const admin = createSupabaseAdminClient();
    const { data: target } = await admin
      .from("org_members")
      .select("user_id, role")
      .eq("org_id", orgId)
      .eq("user_id", targetUserId)
      .maybeSingle<{ user_id: string; role: MemberRole }>();
    if (!target) return { kind: "not_member" };
    if (target.role === newRole) return { kind: "ok" }; // no-op

    if (target.role === "ADMIN" && newRole !== "ADMIN") {
      const { count } = await admin
        .from("org_members")
        .select("user_id", { count: "exact", head: true })
        .eq("org_id", orgId)
        .eq("role", "ADMIN");
      if ((count ?? 0) <= 1) return { kind: "would_remove_last_admin" };
    }

    const { error } = await admin
      .from("org_members")
      .update({ role: newRole })
      .eq("org_id", orgId)
      .eq("user_id", targetUserId);
    if (error) return { kind: "error", message: error.message };
    return { kind: "ok" };
  } catch (err) {
    return { kind: "error", message: err instanceof Error ? err.message : String(err) };
  }
}

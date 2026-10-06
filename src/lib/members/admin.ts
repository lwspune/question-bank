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
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { listAllAuthUsers } from "@/lib/supabase/authUsers";

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
  /** Branch ids this member is assigned to (migration 0057). */
  branchIds: string[];
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

    // Hydrate from auth.users. PAGED: staff accounts sit among every student
    // account, so one 1,000-row page would turn a member into "(unknown)".
    const allUsers = await listAllAuthUsers(admin);
    const signIns = await lastSignInsFor(admin, (rows ?? []).map((r) => r.user_id as string));

    // Branch assignments for this org's members (migration 0057), keyed by user.
    const branchIdsByUser = await getBranchAssignments(admin, orgId);

    const byId = new Map(allUsers.map((u) => [u.id, u]));
    const members: MemberRow[] = (rows ?? []).map((r) => {
      const u = byId.get(r.user_id);
      const meta = (u?.user_metadata ?? {}) as { name?: string };
      return {
        userId: r.user_id,
        email: u?.email ?? "(unknown)",
        name: meta.name ?? null,
        role: r.role as MemberRole,
        lastSignInAt: signIns.get(r.user_id) ?? null,
        branchIds: branchIdsByUser.get(r.user_id) ?? [],
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
// branch assignments (migration 0057)
// ────────────────────────────────────────────────────────────────────

/** user_id -> assigned branch_ids, for this org's branches only. Service-role. */
async function getBranchAssignments(
  admin: SupabaseClient,
  orgId: string
): Promise<Map<string, string[]>> {
  const out = new Map<string, string[]>();
  const { data: branchRows } = await admin.from("branches").select("id").eq("org_id", orgId);
  const branchIds = (branchRows ?? []).map((b) => b.id as string);
  if (branchIds.length === 0) return out;
  const { data: bm } = await admin
    .from("branch_members")
    .select("user_id, branch_id")
    .in("branch_id", branchIds);
  for (const row of (bm ?? []) as { user_id: string; branch_id: string }[]) {
    const arr = out.get(row.user_id) ?? [];
    arr.push(row.branch_id);
    out.set(row.user_id, arr);
  }
  return out;
}

export type SetMemberBranchesResult = { kind: "ok" } | { kind: "error"; message: string };

/**
 * Replace a member's branch assignments (migration 0057). Validates every
 * branchId belongs to `orgId`, confirms the user is a member of the org, then
 * swaps the assignment set (delete this user's rows for THIS org's branches,
 * insert the new set). Service-role; the route guard has already confirmed the
 * caller is an org ADMIN.
 */
export async function setMemberBranches(
  orgId: string,
  userId: string,
  branchIds: string[]
): Promise<SetMemberBranchesResult> {
  try {
    const admin = createSupabaseAdminClient();
    const { data: orgBranches, error: brErr } = await admin
      .from("branches")
      .select("id")
      .eq("org_id", orgId);
    if (brErr) return { kind: "error", message: brErr.message };
    const orgBranchIds = (orgBranches ?? []).map((b) => b.id as string);
    const allowed = new Set(orgBranchIds);
    const clean = Array.from(new Set(branchIds.filter((id) => allowed.has(id))));

    const { data: mem } = await admin
      .from("org_members")
      .select("user_id")
      .eq("org_id", orgId)
      .eq("user_id", userId)
      .maybeSingle();
    if (!mem) return { kind: "error", message: "User is not a member of this org." };

    if (orgBranchIds.length > 0) {
      const { error: delErr } = await admin
        .from("branch_members")
        .delete()
        .eq("user_id", userId)
        .in("branch_id", orgBranchIds);
      if (delErr) return { kind: "error", message: delErr.message };
    }
    if (clean.length > 0) {
      const { error: insErr } = await admin
        .from("branch_members")
        .insert(clean.map((branch_id) => ({ user_id: userId, branch_id })));
      if (insErr) return { kind: "error", message: insErr.message };
    }
    return { kind: "ok" };
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

export type CreateMemberOptions = {
  /**
   * Superadmin only. Attach an EXISTING org-less account (staff often sign up
   * as students before onboarding) without touching its password. Never pass
   * this from an org-admin surface: an admin who can attach an existing account
   * can then resetMemberPassword it, which is an account takeover.
   */
  linkExistingAccount?: boolean;
};

export type CreateMemberResult =
  | { kind: "ok"; userId: string; linked: boolean }
  | { kind: "invalid_email" }
  | { kind: "invalid_password" }
  | { kind: "invalid_role" }
  | { kind: "invalid_name" }
  | { kind: "email_taken_other_org" }
  | { kind: "already_member" }
  /** An account with this email exists and linking was not allowed. */
  | { kind: "email_has_account" }
  | { kind: "error"; message: string };

/**
 * Create a staff login, or (superadmin, linkExistingAccount) attach an existing
 * account. NEVER writes the password of an account that already exists: until
 * 2026-10-06 it did, so any org admin could type a student's email, choose a
 * password and sign in as them.
 */
export async function createMember(
  orgId: string,
  input: CreateMemberInput,
  opts: CreateMemberOptions = {}
): Promise<CreateMemberResult> {
  if (!isValidEmail(input.email)) return { kind: "invalid_email" };
  if (!isValidPassword(input.password)) return { kind: "invalid_password" };
  if (!isValidRole(input.role)) return { kind: "invalid_role" };
  if (!input.name || !input.name.trim()) return { kind: "invalid_name" };

  const admin = createSupabaseAdminClient();
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();

  try {
    // Does an auth user with this email already exist? Paged: one page of
    // listUsers silently stops at 1,000 accounts.
    const existing = (await listAllAuthUsers(admin)).find(
      (u) => u.email?.toLowerCase() === email
    );

    let userId: string;
    let linked = false;
    if (existing) {
      const { data: membership } = await admin
        .from("org_members")
        .select("user_id, org_id")
        .eq("user_id", existing.id)
        .maybeSingle();
      if (membership?.org_id === orgId) return { kind: "already_member" };
      if (membership) return { kind: "email_taken_other_org" };
      if (!opts.linkExistingAccount) return { kind: "email_has_account" };
      // Link only: the password and profile stay the account owner's.
      userId = existing.id;
      linked = true;
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
    return { kind: "ok", userId, linked };
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

/** last_sign_in_at for a few user ids (AuthUserLite does not carry it). */
async function lastSignInsFor(admin: SupabaseClient, ids: string[]) {
  const out = new Map<string, string | null>();
  await Promise.all(
    ids.map(async (id) => {
      const { data } = await admin.auth.admin.getUserById(id);
      out.set(id, data.user?.last_sign_in_at ?? null);
    })
  );
  return out;
}

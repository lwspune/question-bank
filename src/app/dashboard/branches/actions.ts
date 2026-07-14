"use server";

/**
 * Server actions for branches (migration 0055). Each runs as the signed-in user
 * (cookie-bound authed client) so RLS is the real boundary — branch writes are
 * ADMIN-only (branches_*_admin policies). We also gate on role here for a clean
 * error instead of a raw RLS failure. Superadmin manages branches cross-org
 * through the separate service-role console, not these actions.
 */
import { revalidatePath } from "next/cache";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  createBranch,
  updateBranch,
  setBranchArchived,
  deleteBranch,
  listBranches,
} from "@/lib/branches/admin";
import { validateBranchInput } from "@/lib/branches/validate";
import type { BranchInput } from "@/lib/branches/types";

type Ok<T = unknown> = { ok: true } & T;
type Err = { ok: false; error: string };
type Result<T = unknown> = Ok<T> | Err;

/** Branch management is admin-only. */
async function requireAdmin() {
  const member = await getSessionMember();
  if (!member || member.role !== "ADMIN") return null;
  return member;
}

const revalidate = () => revalidatePath("/dashboard/branches");

export async function createBranchAction(input: BranchInput): Promise<Result<{ id: string }>> {
  const member = await requireAdmin();
  if (!member) return { ok: false, error: "Only an admin can manage branches." };
  const parsed = validateBranchInput(input);
  if (!parsed.ok) return { ok: false, error: parsed.error };
  try {
    const client = createSupabaseServerClient();
    const id = await createBranch(client, {
      orgId: member.orgId,
      createdBy: member.user.id,
      fields: parsed.value,
    });
    revalidate();
    return { ok: true, id };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

export async function updateBranchAction(branchId: string, input: BranchInput): Promise<Result> {
  const member = await requireAdmin();
  if (!member) return { ok: false, error: "Only an admin can manage branches." };
  const parsed = validateBranchInput(input);
  if (!parsed.ok) return { ok: false, error: parsed.error };
  try {
    const client = createSupabaseServerClient();
    await updateBranch(client, branchId, parsed.value);
    revalidate();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

export async function setBranchArchivedAction(
  branchId: string,
  archived: boolean
): Promise<Result> {
  const member = await requireAdmin();
  if (!member) return { ok: false, error: "Only an admin can manage branches." };
  try {
    const client = createSupabaseServerClient();
    await setBranchArchived(client, branchId, archived);
    revalidate();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

export async function deleteBranchAction(branchId: string): Promise<Result> {
  const member = await requireAdmin();
  if (!member) return { ok: false, error: "Only an admin can manage branches." };
  try {
    const client = createSupabaseServerClient();
    await deleteBranch(client, branchId);
    // RLS denies silently (0 rows) if not permitted — verify.
    const still = (await listBranches(client)).some((b) => b.id === branchId);
    if (still) return { ok: false, error: "Couldn't delete this branch." };
    revalidate();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

function msg(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

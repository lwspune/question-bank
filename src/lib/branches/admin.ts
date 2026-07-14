/**
 * Data-access layer for branches (migration 0055). Takes a SupabaseClient so
 * callers control the auth context — RLS is the boundary: read = any org member,
 * write = org ADMIN (branches_*_admin policies). No service-role here (the
 * superadmin console has its own service-role path).
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Branch, BranchFields } from "./types";

type Raw = {
  id: string;
  name: string;
  archived: boolean;
  created_by: string | null;
  updated_at: string;
};

const toBranch = (r: Raw): Branch => ({
  id: r.id,
  name: r.name,
  archived: r.archived,
  createdBy: r.created_by,
  updatedAt: r.updated_at,
});

/** All branches in the caller's org (active + archived). RLS scopes to own org. */
export async function listBranches(client: SupabaseClient): Promise<Branch[]> {
  const { data, error } = await client
    .from("branches")
    .select("id, name, archived, created_by, updated_at")
    .order("archived", { ascending: true })
    .order("name", { ascending: true });
  if (error) throw new Error(`listBranches: ${error.message}`);
  return ((data ?? []) as Raw[]).map(toBranch);
}

export async function createBranch(
  client: SupabaseClient,
  input: { orgId: string; createdBy: string; fields: BranchFields }
): Promise<string> {
  const { data, error } = await client
    .from("branches")
    .insert({
      org_id: input.orgId,
      created_by: input.createdBy,
      name: input.fields.name,
    })
    .select("id")
    .single();
  if (error) throw new Error(`createBranch: ${error.message}`);
  return data.id as string;
}

export async function updateBranch(
  client: SupabaseClient,
  branchId: string,
  fields: BranchFields
): Promise<void> {
  const { error } = await client
    .from("branches")
    .update({ name: fields.name, updated_at: new Date().toISOString() })
    .eq("id", branchId);
  if (error) throw new Error(`updateBranch: ${error.message}`);
}

/** Archive (or un-archive) a branch — hidden from selectors, links preserved. */
export async function setBranchArchived(
  client: SupabaseClient,
  branchId: string,
  archived: boolean
): Promise<void> {
  const { error } = await client
    .from("branches")
    .update({ archived, updated_at: new Date().toISOString() })
    .eq("id", branchId);
  if (error) throw new Error(`setBranchArchived: ${error.message}`);
}

/** Delete a branch. RLS allows only an org ADMIN. FKs SET NULL: its batches
 *  become unbranched (and, later, branch_members rows cascade). */
export async function deleteBranch(client: SupabaseClient, branchId: string): Promise<void> {
  const { error } = await client.from("branches").delete().eq("id", branchId);
  if (error) throw new Error(`deleteBranch: ${error.message}`);
}

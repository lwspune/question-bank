/**
 * Data-access layer for cohort batches (migration 0054). Like papers/admin.ts,
 * every function takes a SupabaseClient so callers control the auth context — the
 * dashboard actions pass the cookie-bound authed client (RLS is the boundary:
 * org-scoping + editor-only writes are enforced in Postgres, not here); the RLS
 * test passes per-user JWT clients to prove the walls hold. No service-role.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Batch, BatchFields } from "./types";

type Raw = {
  id: string;
  name: string;
  branch: string | null;
  exam_id: string | null;
  archived: boolean;
  created_by: string | null;
  updated_at: string;
};

const toBatch = (r: Raw): Batch => ({
  id: r.id,
  name: r.name,
  branch: r.branch,
  examId: r.exam_id,
  archived: r.archived,
  createdBy: r.created_by,
  updatedAt: r.updated_at,
});

/** All batches in the caller's org (active + archived). RLS scopes to own org. */
export async function listBatches(client: SupabaseClient): Promise<Batch[]> {
  const { data, error } = await client
    .from("batches")
    .select("id, name, branch, exam_id, archived, created_by, updated_at")
    .order("archived", { ascending: true })
    .order("branch", { ascending: true, nullsFirst: true })
    .order("name", { ascending: true });
  if (error) throw new Error(`listBatches: ${error.message}`);
  return ((data ?? []) as Raw[]).map(toBatch);
}

export async function createBatch(
  client: SupabaseClient,
  input: { orgId: string; createdBy: string; fields: BatchFields }
): Promise<string> {
  const { data, error } = await client
    .from("batches")
    .insert({
      org_id: input.orgId,
      created_by: input.createdBy,
      name: input.fields.name,
      branch: input.fields.branch,
      exam_id: input.fields.examId,
    })
    .select("id")
    .single();
  if (error) throw new Error(`createBatch: ${error.message}`);
  return data.id as string;
}

export async function updateBatch(
  client: SupabaseClient,
  batchId: string,
  fields: BatchFields
): Promise<void> {
  const { error } = await client
    .from("batches")
    .update({
      name: fields.name,
      branch: fields.branch,
      exam_id: fields.examId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", batchId);
  if (error) throw new Error(`updateBatch: ${error.message}`);
}

/** Archive (or un-archive) a batch — a past cohort is hidden from selectors but
 *  its papers keep their link. Preferred over delete for year rollover. */
export async function setBatchArchived(
  client: SupabaseClient,
  batchId: string,
  archived: boolean
): Promise<void> {
  const { error } = await client
    .from("batches")
    .update({ archived, updated_at: new Date().toISOString() })
    .eq("id", batchId);
  if (error) throw new Error(`setBatchArchived: ${error.message}`);
}

/** Delete a batch. RLS allows this only for the creator or an org ADMIN; the
 *  FK on papers is ON DELETE SET NULL, so any papers just become un-batched. */
export async function deleteBatch(client: SupabaseClient, batchId: string): Promise<void> {
  const { error } = await client.from("batches").delete().eq("id", batchId);
  if (error) throw new Error(`deleteBatch: ${error.message}`);
}

/**
 * Point a paper at a batch (or clear it with null). Guards that a non-null batch
 * is visible to the caller (own org) via an RLS-scoped select — so a paper can't
 * be linked to another org's batch id. RLS on papers still enforces org + editor.
 */
export async function setPaperBatch(
  client: SupabaseClient,
  paperId: string,
  batchId: string | null
): Promise<void> {
  if (batchId) {
    const { data, error } = await client
      .from("batches")
      .select("id")
      .eq("id", batchId)
      .maybeSingle();
    if (error) throw new Error(`setPaperBatch lookup: ${error.message}`);
    if (!data) throw new Error("Batch not found in your organization.");
  }
  const { error } = await client
    .from("papers")
    .update({ batch_id: batchId, updated_at: new Date().toISOString() })
    .eq("id", paperId);
  if (error) throw new Error(`setPaperBatch: ${error.message}`);
}

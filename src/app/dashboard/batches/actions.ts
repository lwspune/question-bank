"use server";

/**
 * Server actions for cohort batches (migration 0054). Each runs as the signed-in
 * user (cookie-bound authed client) so RLS — org-scoping + editor-only writes,
 * creator-or-admin delete — is the real boundary. Any org member (ADMIN or
 * TEACHER) is an editor.
 */
import { revalidatePath } from "next/cache";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  createBatch,
  updateBatch,
  setBatchArchived,
  deleteBatch,
  listBatches,
} from "@/lib/batches/admin";
import { validateBatchInput } from "@/lib/batches/validate";
import type { BatchInput } from "@/lib/batches/types";

type Ok<T = unknown> = { ok: true } & T;
type Err = { ok: false; error: string };
type Result<T = unknown> = Ok<T> | Err;

async function requireMember() {
  const member = await getSessionMember();
  return member ?? null;
}

const revalidate = () => revalidatePath("/dashboard/batches");

export async function createBatchAction(input: BatchInput): Promise<Result<{ id: string }>> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  const parsed = validateBatchInput(input);
  if (!parsed.ok) return { ok: false, error: parsed.error };
  try {
    const client = createSupabaseServerClient();
    const id = await createBatch(client, {
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

export async function updateBatchAction(
  batchId: string,
  input: BatchInput
): Promise<Result> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  const parsed = validateBatchInput(input);
  if (!parsed.ok) return { ok: false, error: parsed.error };
  try {
    const client = createSupabaseServerClient();
    await updateBatch(client, batchId, parsed.value);
    revalidate();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

export async function setBatchArchivedAction(
  batchId: string,
  archived: boolean
): Promise<Result> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  try {
    const client = createSupabaseServerClient();
    await setBatchArchived(client, batchId, archived);
    revalidate();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

export async function deleteBatchAction(batchId: string): Promise<Result> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  try {
    const client = createSupabaseServerClient();
    await deleteBatch(client, batchId);
    // RLS denies silently (0 rows) for a non-creator non-admin — verify.
    const still = (await listBatches(client)).some((b) => b.id === batchId);
    if (still) return { ok: false, error: "Only the batch's creator or an admin can delete it." };
    revalidate();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

function msg(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

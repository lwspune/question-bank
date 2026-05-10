import type { SupabaseClient } from "@supabase/supabase-js";

export type PyqMetadataPatch = {
  pyqYear?: number | null;
  pyqMonth?: string | null;
  pyqNote?: string | null;
};

export type SetUploadPyqMetadataResult =
  | { kind: "ok"; updated: number }
  | { kind: "not_found" }
  | { kind: "forbidden" }
  | { kind: "error"; message: string };

export async function setUploadPyqMetadata(
  client: SupabaseClient,
  jobId: string,
  callerOrgId: string,
  patch: PyqMetadataPatch
): Promise<SetUploadPyqMetadataResult> {
  const { data: job, error: jobErr } = await client
    .from("upload_jobs")
    .select("id, org_id")
    .eq("id", jobId)
    .maybeSingle<{ id: string; org_id: string }>();

  if (jobErr) return { kind: "error", message: jobErr.message };
  if (!job) return { kind: "not_found" };
  if (job.org_id !== callerOrgId) return { kind: "forbidden" };

  const update: Record<string, number | string | null> = {};
  if ("pyqYear" in patch) update.pyq_year = patch.pyqYear ?? null;
  if ("pyqMonth" in patch) update.pyq_month = patch.pyqMonth ?? null;
  if ("pyqNote" in patch) update.pyq_note = patch.pyqNote ?? null;

  if (Object.keys(update).length === 0) {
    return { kind: "ok", updated: 0 };
  }

  const { data: updated, error: updErr } = await client
    .from("questions")
    .update(update)
    .eq("upload_job_id", jobId)
    .eq("org_id", callerOrgId)
    .select("id");

  if (updErr) return { kind: "error", message: updErr.message };
  return { kind: "ok", updated: updated?.length ?? 0 };
}

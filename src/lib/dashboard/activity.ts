import type { SupabaseClient } from "@supabase/supabase-js";

export type RecentUpload = {
  id: string;
  filename: string;
  inserted: number;
  skipped: number;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  createdAt: string;
};

export const RECENT_UPLOADS_LIMIT = 5;

export async function getRecentUploads(
  client: SupabaseClient,
  orgId: string
): Promise<RecentUpload[]> {
  const { data, error } = await client
    .from("upload_jobs")
    .select("id, filename, inserted, skipped, status, created_at")
    .eq("org_id", orgId)
    .order("created_at", { ascending: false })
    .limit(RECENT_UPLOADS_LIMIT);

  if (error) throw new Error(`recent uploads: ${error.message}`);

  return (data ?? []).map((r) => ({
    id: r.id as string,
    filename: r.filename as string,
    inserted: (r.inserted as number) ?? 0,
    skipped: (r.skipped as number) ?? 0,
    status: r.status as RecentUpload["status"],
    createdAt: r.created_at as string,
  }));
}

import type { SupabaseClient } from "@supabase/supabase-js";
import type { RecentUpload } from "@/lib/dashboard/activity";

export const DEFAULT_PAGE_SIZE = 20;

export type ListUploadsParams = {
  page: number;
  pageSize: number;
};

export type ListUploadsResult = {
  items: RecentUpload[];
  total: number;
};

export async function listUploads(
  client: SupabaseClient,
  orgId: string,
  { page, pageSize }: ListUploadsParams
): Promise<ListUploadsResult> {
  const safePage = Math.max(1, Math.floor(page));
  const safeSize = Math.max(1, Math.floor(pageSize));
  const from = (safePage - 1) * safeSize;
  const to = from + safeSize - 1;

  const { data, count, error } = await client
    .from("upload_jobs")
    .select("id, filename, inserted, skipped, status, created_at", {
      count: "exact",
    })
    .eq("org_id", orgId)
    .order("created_at", { ascending: false })
    .range(from, to);

  // PostgREST returns 416 / PGRST103 when `from` is past the last row.
  // Recover by doing a HEAD-count for the true total and returning empty items.
  if (error && error.code === "PGRST103") {
    const { count: headCount, error: headError } = await client
      .from("upload_jobs")
      .select("id", { count: "exact", head: true })
      .eq("org_id", orgId);
    if (headError) throw new Error(`list uploads: ${headError.message}`);
    return { items: [], total: headCount ?? 0 };
  }

  if (error) throw new Error(`list uploads: ${error.message}`);

  const items: RecentUpload[] = (data ?? []).map((r) => ({
    id: r.id as string,
    filename: r.filename as string,
    inserted: (r.inserted as number) ?? 0,
    skipped: (r.skipped as number) ?? 0,
    status: r.status as RecentUpload["status"],
    createdAt: r.created_at as string,
  }));

  return { items, total: count ?? 0 };
}

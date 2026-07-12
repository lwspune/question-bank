/**
 * Admin reads for /dashboard/feedback (service-role — user_feedback is own-row
 * RLS, so an admin must bypass it to see everyone's feedback). Emails resolved
 * via the auth admin API, like the other admin rollups. Paged for the 1000-row
 * cap as feedback grows.
 */
import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { displayName } from "@/lib/students/derive";
import { computeNps, type NpsRollup } from "./nps";

const PAGE = 1000;

type FeedbackRow = {
  user_id: string;
  kind: string;
  score: number | null;
  message: string | null;
  created_at: string;
};

export type FeedbackItem = {
  who: string;
  score: number | null;
  message: string | null;
  createdAt: string;
};

export type FeedbackOverview = {
  nps: NpsRollup;
  npsComments: FeedbackItem[];
  featureRequests: FeedbackItem[];
};

/** NPS rollup + recent NPS comments + the feature-request list (admin view). */
export async function getFeedbackOverview(): Promise<FeedbackOverview> {
  const db = createSupabaseAdminClient();

  const rows: FeedbackRow[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("user_feedback")
      .select("user_id, kind, score, message, created_at")
      .order("created_at", { ascending: false })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`getFeedbackOverview: ${error.message}`);
    rows.push(...((data ?? []) as FeedbackRow[]));
    if (!data || data.length < PAGE) break;
  }

  // Resolve emails/names for the users who left feedback.
  const ids = new Set(rows.map((r) => r.user_id));
  const names = new Map<string, string>();
  if (ids.size > 0) {
    const { data } = await db.auth.admin.listUsers({ perPage: 1000 });
    for (const u of data?.users ?? []) {
      if (u.id && ids.has(u.id)) {
        names.set(
          u.id,
          displayName((u.user_metadata as { full_name?: string; name?: string } | null) ?? null, u.email ?? null)
        );
      }
    }
  }
  const who = (id: string) => names.get(id) ?? "(unknown)";

  const npsRows = rows.filter((r) => r.kind === "nps" && r.score != null);
  const nps = computeNps(npsRows.map((r) => ({ score: r.score as number })));
  const npsComments = npsRows
    .filter((r) => r.message)
    .slice(0, 30)
    .map((r) => ({ who: who(r.user_id), score: r.score, message: r.message, createdAt: r.created_at }));
  const featureRequests = rows
    .filter((r) => r.kind === "feature" && r.message)
    .slice(0, 50)
    .map((r) => ({ who: who(r.user_id), score: null, message: r.message, createdAt: r.created_at }));

  return { nps, npsComments, featureRequests };
}

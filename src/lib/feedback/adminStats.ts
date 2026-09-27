/**
 * Admin reads for /dashboard/feedback (service-role — user_feedback and
 * mock_feedback are own-row RLS, so an admin must bypass it to see everyone's).
 * Names resolved through the paged auth-user read. Paged for the 1000-row cap
 * as feedback grows.
 *
 * Both channels live here. Until 2026-09-27 this page read only user_feedback
 * (NPS + suggestions, 7 rows) while the post-mock ratings (67 rows) were shown
 * only one mock at a time, so the Feedback page read as empty.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { listAllAuthUsers } from "@/lib/supabase/authUsers";
import { displayName } from "@/lib/students/derive";
import { summarizeMockRatings, type MockRatingRow, type MockRatingsSummary } from "@/lib/mocks/feedback";
import { computeNps, type NpsRollup } from "./nps";

const PAGE = 1000;

type FeedbackRow = {
  user_id: string;
  kind: string;
  score: number | null;
  message: string | null;
  created_at: string;
};

type MockFeedbackDbRow = {
  user_id: string;
  rating: string;
  comment: string | null;
  created_at: string;
  mock_attempts: { mock_tests: { slug: string; title: string } | null } | null;
};

export type FeedbackItem = {
  who: string;
  score: number | null;
  message: string | null;
  createdAt: string;
};

export type MockRatingItem = MockRatingRow & { who: string };

export type FeedbackOverview = {
  nps: NpsRollup;
  npsComments: FeedbackItem[];
  featureRequests: FeedbackItem[];
  mockRatings: MockRatingsSummary<MockRatingItem>;
};

async function readAll<T>(
  label: string,
  page: (from: number, to: number) => PromiseLike<{ data: unknown; error: { message: string } | null }>
): Promise<T[]> {
  const rows: T[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await page(from, from + PAGE - 1);
    if (error) throw new Error(`getFeedbackOverview ${label}: ${error.message}`);
    const batch = (data ?? []) as T[];
    rows.push(...batch);
    if (batch.length < PAGE) break;
  }
  return rows;
}

async function namesFor(db: SupabaseClient, ids: Set<string>): Promise<Map<string, string>> {
  const names = new Map<string, string>();
  if (ids.size === 0) return names;
  for (const u of await listAllAuthUsers(db)) {
    if (ids.has(u.id)) names.set(u.id, displayName(u.user_metadata, u.email));
  }
  return names;
}

/** NPS rollup + comments, suggestions, and the cross-mock rating rollup. */
export async function getFeedbackOverview(): Promise<FeedbackOverview> {
  const db = createSupabaseAdminClient();

  const [rows, ratingRows] = await Promise.all([
    readAll<FeedbackRow>("user_feedback", (from, to) =>
      db
        .from("user_feedback")
        .select("user_id, kind, score, message, created_at")
        .order("created_at", { ascending: false })
        .range(from, to)
    ),
    readAll<MockFeedbackDbRow>("mock_feedback", (from, to) =>
      db
        .from("mock_feedback")
        .select("user_id, rating, comment, created_at, mock_attempts(mock_tests(slug, title))")
        .order("created_at", { ascending: false })
        .range(from, to)
    ),
  ]);

  const names = await namesFor(db, new Set([...rows, ...ratingRows].map((r) => r.user_id)));
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

  const mockRatings = summarizeMockRatings<MockRatingItem>(
    ratingRows.map((r) => {
      const mock = r.mock_attempts?.mock_tests ?? null;
      return {
        rating: r.rating,
        comment: r.comment,
        createdAt: r.created_at,
        mockSlug: mock?.slug ?? "",
        mockTitle: mock?.title ?? "(deleted mock)",
        who: who(r.user_id),
      };
    })
  );

  return { nps, npsComments, featureRequests, mockRatings };
}

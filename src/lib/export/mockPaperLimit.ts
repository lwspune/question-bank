import type { SupabaseClient } from "@supabase/supabase-js";
import { istDayKey } from "@/lib/email/dueNudge";

/**
 * The daily past-paper download limit (migration 0137): N different whole
 * past papers per account per IST day, for everyone who can download (pass
 * holders and institute staff; owner, 2026-10-07). A paper's answer key is not
 * a separate paper, and the same paper again the same day costs nothing.
 *
 * The real limit is the trigger on mock_paper_downloads. The route asks
 * `decideMockPaperDownload` first only so a refused download never builds a
 * PDF, then claims AFTER building and serves the file only on a won claim, the
 * order the one free download uses.
 */

export type MockPaperDecision = { allowed: true } | { allowed: false; limit: number };

/**
 * One paper against the day's limit. Whole past papers (mock_paper_downloads)
 * and board papers (board_paper_downloads, migration 0146) share ONE limit, so
 * `otherPapersToday` is how many papers of the other kind went today.
 */
export function decidePaperDownload(input: {
  /** paywall_settings.mock_papers_per_day; null = off. */
  limit: number | null;
  /** Papers of this kind downloaded today (IST), repeats allowed. */
  todaysIds: readonly string[];
  paperId: string;
  otherPapersToday: number;
}): MockPaperDecision {
  const { limit, todaysIds, paperId, otherPapersToday } = input;
  if (limit === null) return { allowed: true };
  const today = new Set(todaysIds);
  if (today.has(paperId)) return { allowed: true };
  return today.size + otherPapersToday < limit ? { allowed: true } : { allowed: false, limit };
}

export function decideMockPaperDownload(input: {
  /** paywall_settings.mock_papers_per_day; null = off. */
  limit: number | null;
  /** Papers this account downloaded today (IST), repeats allowed. */
  todaysMockIds: readonly string[];
  mockId: string;
  /** Board papers downloaded today; they count toward the same limit. */
  todaysBoardPaperIds?: readonly string[];
}): MockPaperDecision {
  return decidePaperDownload({
    limit: input.limit,
    todaysIds: input.todaysMockIds,
    paperId: input.mockId,
    otherPapersToday: new Set(input.todaysBoardPaperIds ?? []).size,
  });
}

export function mockPaperLimitMessage(limit: number): string {
  return `You've downloaded ${limit} ${limit === 1 ? "paper" : "papers"} today. You can download more tomorrow.`;
}

/**
 * The limit and today's papers, for the early check. Service role. A failed
 * read returns the limit as off: the early check is a convenience, and the
 * trigger still refuses at claim time, so an outage cannot hand out extra
 * papers, only build one file that is then refused.
 */
export async function readTodaysMockPapers(
  admin: SupabaseClient,
  userId: string,
  now: Date = new Date()
): Promise<{ limit: number | null; todaysMockIds: string[]; todaysBoardPaperIds: string[] }> {
  const day = istDayKey(now);
  const [settings, rows, boardRows] = await Promise.all([
    admin.from("paywall_settings").select("mock_papers_per_day").single(),
    admin.from("mock_paper_downloads").select("mock_id").eq("user_id", userId).eq("ist_day", day),
    admin.from("board_paper_downloads").select("board_paper_id").eq("user_id", userId).eq("ist_day", day),
  ]);
  const failed = settings.error ?? rows.error ?? boardRows.error;
  if (failed) {
    console.error("paper downloads read failed:", failed.message);
    return { limit: null, todaysMockIds: [], todaysBoardPaperIds: [] };
  }
  return {
    limit: (settings.data?.mock_papers_per_day as number | null) ?? null,
    todaysMockIds: (rows.data ?? []).map((r) => r.mock_id as string),
    todaysBoardPaperIds: (boardRows.data ?? []).map((r) => r.board_paper_id as string),
  };
}

export type MockPaperClaim = { kind: "ok" } | { kind: "limit"; limit: number } | { kind: "error"; message: string };

/**
 * Record that this account downloaded this paper today. Service role only (no
 * write policy). The same paper again today is a no-op `ok`; a new paper past
 * the limit is `limit`, refused by the trigger (SQLSTATE PT429).
 */
export async function claimMockPaperDownload(
  admin: SupabaseClient,
  userId: string,
  mockId: string
): Promise<MockPaperClaim> {
  const { error } = await admin
    .from("mock_paper_downloads")
    .upsert({ user_id: userId, mock_id: mockId }, { onConflict: "user_id,ist_day,mock_id", ignoreDuplicates: true });
  if (!error) return { kind: "ok" };
  if (error.code === "PT429") {
    const n = Number(/(\d+)/.exec(error.message)?.[1]);
    return { kind: "limit", limit: Number.isFinite(n) ? n : 0 };
  }
  console.error("mock_paper_downloads claim failed:", error.message);
  return { kind: "error", message: error.message };
}

/** The same claim for a board paper (migration 0146); the trigger counts both kinds. */
export async function claimBoardPaperDownload(
  admin: SupabaseClient,
  userId: string,
  boardPaperId: string
): Promise<MockPaperClaim> {
  const { error } = await admin
    .from("board_paper_downloads")
    .upsert(
      { user_id: userId, board_paper_id: boardPaperId },
      { onConflict: "user_id,ist_day,board_paper_id", ignoreDuplicates: true }
    );
  if (!error) return { kind: "ok" };
  if (error.code === "PT429") {
    const n = Number(/(\d+)/.exec(error.message)?.[1]);
    return { kind: "limit", limit: Number.isFinite(n) ? n : 0 };
  }
  console.error("board_paper_downloads claim failed:", error.message);
  return { kind: "error", message: error.message };
}

/**
 * The free-test limits, as the start page needs them. Pure — the database
 * trigger (migrations 0120 + 0134) is the real gate; this only decides what the
 * page shows, so it follows the trigger's rules: limit off, a pass, or a retake
 * means open. A chapter test (scope 'sectional') is counted against its OWN
 * limit, never against the full mocks (owner, 2026-10-05). A practice test
 * (scope 'custom', migration 0156) has a third: so many a day, by India date.
 * A paper a friend sent (migration 0166) is free past every limit, so a student
 * opening it from a friend's invite sees it open.
 *
 * An exam that frees MARKED papers only (migration 0256, IMAT: one past paper
 * and one practice paper) skips the shared count: a marked paper is free, any
 * other full mock there needs the exam's pass.
 */
import type { MockScope } from "./query";

/** The shape my_mock_quota() returns. A null limit = that limit is off. */
export type MockQuota = {
  limit: number | null;
  used: number;
  hasPass: boolean;
  /** Every pass held, 'all' for staff (migration 0206; absent on an older database). */
  passScopes?: string[];
  chapterLimit: number | null;
  chapterUsed: number;
  /** Free practice tests a day (0156). Absent from a quota read before 0156. */
  practiceLimit?: number | null;
  practiceUsed?: number;
};

/** What the free count is counting, for the copy. */
export type TestUnit = "mock" | "chapter_test" | "practice_test";

export type MockStartState =
  | { kind: "open" }
  | { kind: "free"; left: number; limit: number; unit: TestUnit }
  /** A paper marked free on an exam that frees marked papers only (0256). */
  | { kind: "free_paper" }
  /** `passOnly`: an unmarked paper on such an exam, which no free count opens. */
  | { kind: "locked"; limit: number; unit: TestUnit; passOnly?: true };

/** This paper under its exam's free rule (0256). Absent = the shared count. */
export type PaperFreeRule = { markedOnly: boolean; isFree: boolean };

export function mockStartState(
  quota: MockQuota | null,
  startedThisMockBefore: boolean,
  scope: MockScope = "full",
  invitedByFriend = false,
  paper?: PaperFreeRule
): MockStartState {
  if (!quota || quota.hasPass || startedThisMockBefore || invitedByFriend) return { kind: "open" };
  if (scope === "full" && paper?.markedOnly) {
    // The trigger's order: the limit off blocks nothing, then marked = free.
    if (quota.limit === null || quota.limit === undefined) return { kind: "open" };
    return paper.isFree ? { kind: "free_paper" } : { kind: "locked", limit: 0, unit: "mock", passOnly: true };
  }
  const [limit, used, unit]: [number | null | undefined, number, TestUnit] =
    scope === "custom"
      ? [quota.practiceLimit, quota.practiceUsed ?? 0, "practice_test"]
      : scope === "sectional"
        ? [quota.chapterLimit, quota.chapterUsed, "chapter_test"]
        : [quota.limit, quota.used, "mock"];
  if (limit === null || limit === undefined) return { kind: "open" };
  const left = limit - used;
  return left > 0 ? { kind: "free", left, limit, unit } : { kind: "locked", limit, unit };
}

/** Postgres SQLSTATE the trigger raises; PostgREST serves it as HTTP 402. */
export const FREE_MOCK_LIMIT_CODE = "PT402";

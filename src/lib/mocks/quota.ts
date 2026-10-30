/**
 * The free-test limits, as the start page needs them. Pure — the database
 * trigger (migrations 0120 + 0134) is the real gate; this only decides what the
 * page shows, so it follows the trigger's rules: limit off, a pass, or a retake
 * means open. A chapter test (scope 'sectional') is counted against its OWN
 * limit, never against the full mocks (owner, 2026-10-05). A practice test
 * (scope 'custom', migration 0156) has a third: so many a day, by India date.
 * A paper a friend sent (migration 0166) is free past every limit, so a student
 * opening it from a friend's invite sees it open.
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
  | { kind: "locked"; limit: number; unit: TestUnit };

export function mockStartState(
  quota: MockQuota | null,
  startedThisMockBefore: boolean,
  scope: MockScope = "full",
  invitedByFriend = false
): MockStartState {
  if (!quota || quota.hasPass || startedThisMockBefore || invitedByFriend) return { kind: "open" };
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

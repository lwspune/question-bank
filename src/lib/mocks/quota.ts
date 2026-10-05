/**
 * The free-test limits, as the start page needs them. Pure — the database
 * trigger (migrations 0120 + 0134) is the real gate; this only decides what the
 * page shows, so it follows the trigger's rules: limit off, a pass, or a retake
 * means open. A chapter test (scope 'sectional') is counted against its OWN
 * limit, never against the full mocks (owner, 2026-10-05).
 */
import type { MockScope } from "./query";

/** The shape my_mock_quota() returns. A null limit = that limit is off. */
export type MockQuota = {
  limit: number | null;
  used: number;
  hasPass: boolean;
  chapterLimit: number | null;
  chapterUsed: number;
};

/** What the free count is counting, for the copy. */
export type TestUnit = "mock" | "chapter_test";

export type MockStartState =
  | { kind: "open" }
  | { kind: "free"; left: number; limit: number; unit: TestUnit }
  | { kind: "locked"; limit: number; unit: TestUnit };

export function mockStartState(
  quota: MockQuota | null,
  startedThisMockBefore: boolean,
  scope: MockScope = "full"
): MockStartState {
  if (!quota || quota.hasPass || startedThisMockBefore) return { kind: "open" };
  const chapter = scope === "sectional";
  const limit = chapter ? quota.chapterLimit : quota.limit;
  if (limit === null || limit === undefined) return { kind: "open" };
  const unit: TestUnit = chapter ? "chapter_test" : "mock";
  const left = limit - (chapter ? quota.chapterUsed : quota.used);
  return left > 0 ? { kind: "free", left, limit, unit } : { kind: "locked", limit, unit };
}

/** Postgres SQLSTATE the trigger raises; PostgREST serves it as HTTP 402. */
export const FREE_MOCK_LIMIT_CODE = "PT402";

/**
 * The free-mock limit, as the start page needs it. Pure — the database trigger
 * (migration 0120) is the real gate; this only decides what the page shows,
 * so it follows the trigger's rules: limit off, a pass, or a retake means open.
 */

/**
 * How many mocks a free account may start. The COPY's number (Terms, /pricing,
 * /account, the start page); the database enforces
 * paywall_settings.free_mock_limit. tests/free-mock-limit-prod.test.ts fails if
 * the two ever disagree.
 */
export const FREE_MOCK_LIMIT = 3;

/** The shape my_mock_quota() returns. `limit` null = the limit is off. */
export type MockQuota = { limit: number | null; used: number; hasPass: boolean };

export type MockStartState =
  | { kind: "open" }
  | { kind: "free"; left: number; limit: number }
  | { kind: "locked"; limit: number };

export function mockStartState(
  quota: MockQuota | null,
  startedThisMockBefore: boolean
): MockStartState {
  if (!quota || quota.limit === null || quota.hasPass || startedThisMockBefore) {
    return { kind: "open" };
  }
  const left = quota.limit - quota.used;
  return left > 0
    ? { kind: "free", left, limit: quota.limit }
    : { kind: "locked", limit: quota.limit };
}

/** Postgres SQLSTATE the trigger raises; PostgREST serves it as HTTP 402. */
export const FREE_MOCK_LIMIT_CODE = "PT402";

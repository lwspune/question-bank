/**
 * The "have I sat this?" marker on a /mock catalogue card. Pure; no DB.
 *
 * WHY THIS IS A PURE CORE AND NOT JUST JSX. The surface it feeds is a client
 * island on an ISR-cached, indexable page, which means it is unverifiable by
 * the build gate and awkward to reach in a browser (it needs a signed-in
 * session AND a student with attempt history). Everything that can be decided
 * without a DOM is decided here, where a test can reach it.
 *
 * Three rules earn their tests:
 *
 *  1. BEST, NEVER LATEST. A student who retakes a paper and does worse must not
 *     watch their card's number fall — that punishes the practice the retake
 *     exists for.
 *
 *  2. A LIVE ATTEMPT IS NOT AN ATTEMPT. It is an invitation to resume, and it
 *     must not inflate the count of papers sat.
 *
 *  3. AN EXPIRED TIMER STILL READS `in_progress` UNTIL THE SWEEP RUNS. The
 *     hourly sweep (scripts/mocks/sweep) grades attempts whose timer ran out
 *     while nobody was watching, so for up to an hour a finished sitting still
 *     carries status 'in_progress'. startAttempt() would happily "resume" it
 *     and the runner would auto-submit on open — so labelling it Resume
 *     promises a test that cannot be sat. Liveness is `expires_at > now`, NOT
 *     status alone. This is the one rule that is invisible in the data model
 *     and was found by reading service.ts, so it is pinned hardest.
 */
import { describe, it, expect } from "vitest";
import {
  summarizeOwnAttempts,
  attemptBadge,
  type OwnAttemptRow,
  type MockAttemptSummary,
} from "@/lib/mocks/attempted";

const NOW = Date.parse("2026-09-21T12:00:00Z");
const FUTURE = "2026-09-21T13:00:00Z";
const PAST = "2026-09-21T11:00:00Z";

function row(over: Partial<OwnAttemptRow> & { mockId: string }): OwnAttemptRow {
  return {
    status: "submitted",
    score: 68,
    maxScore: 100,
    expiresAt: PAST,
    startedAt: "2026-09-21T10:00:00Z",
    ...over,
  };
}

describe("summarizeOwnAttempts", () => {
  it("returns no entry for a mock with no attempts", () => {
    const m = summarizeOwnAttempts([], NOW);
    expect(m.get("mock-1")).toBeUndefined();
  });

  it("keys by mock id and does not leak one mock's attempts into another", () => {
    const m = summarizeOwnAttempts(
      [row({ mockId: "a" }), row({ mockId: "b" }), row({ mockId: "b" })],
      NOW
    );
    expect(m.get("a")?.count).toBe(1);
    expect(m.get("b")?.count).toBe(2);
    expect(m.get("c")).toBeUndefined();
  });

  it("counts one submitted attempt and carries its score", () => {
    const m = summarizeOwnAttempts([row({ mockId: "a", score: 68 })], NOW);
    expect(m.get("a")).toMatchObject({
      count: 1,
      live: false,
      bestScore: 68,
      maxScore: 100,
    });
  });

  it("takes the BEST score, not the latest", () => {
    // Chronological: 40 → 82 → 55. Latest is 55; best is 82.
    const m = summarizeOwnAttempts(
      [
        row({ mockId: "a", score: 40, startedAt: "2026-09-01T00:00:00Z" }),
        row({ mockId: "a", score: 82, startedAt: "2026-09-10T00:00:00Z" }),
        row({ mockId: "a", score: 55, startedAt: "2026-09-20T00:00:00Z" }),
      ],
      NOW
    );
    expect(m.get("a")?.count).toBe(3);
    expect(m.get("a")?.bestScore).toBe(82);
  });

  it("treats a negative best score as a real score, not as absent", () => {
    // Negative marking can take a sitting below zero. `score || null` would
    // erase a 0 and `!score` would erase both — so the absence test must be
    // an explicit null check.
    const m = summarizeOwnAttempts(
      [row({ mockId: "a", score: -12 }), row({ mockId: "a", score: -30 })],
      NOW
    );
    expect(m.get("a")?.bestScore).toBe(-12);
  });

  it("counts a status:'expired' attempt as sat, and uses its score", () => {
    const m = summarizeOwnAttempts(
      [row({ mockId: "a", status: "expired", score: 31 })],
      NOW
    );
    expect(m.get("a")).toMatchObject({ count: 1, live: false, bestScore: 31 });
  });

  it("marks an in-progress attempt with time left as LIVE and does not count it", () => {
    const m = summarizeOwnAttempts(
      [
        row({ mockId: "a", status: "submitted", score: 50 }),
        row({
          mockId: "a",
          status: "in_progress",
          score: null,
          expiresAt: FUTURE,
        }),
      ],
      NOW
    );
    expect(m.get("a")).toMatchObject({ count: 1, live: true, bestScore: 50 });
  });

  it("does NOT call an in-progress attempt live once its timer has run out", () => {
    // The sweep has not reached it yet. It is a sitting that happened.
    const m = summarizeOwnAttempts(
      [
        row({
          mockId: "a",
          status: "in_progress",
          score: null,
          expiresAt: PAST,
        }),
      ],
      NOW
    );
    expect(m.get("a")).toMatchObject({ count: 1, live: false, bestScore: null });
  });

  it("reports an ungraded sitting as attempted with no score", () => {
    const m = summarizeOwnAttempts(
      [row({ mockId: "a", status: "in_progress", score: null, expiresAt: PAST })],
      NOW
    );
    expect(m.get("a")?.bestScore).toBeNull();
    expect(m.get("a")?.maxScore).toBeNull();
  });

  it("ignores a graded row whose max_score is missing rather than dividing by it", () => {
    const m = summarizeOwnAttempts(
      [row({ mockId: "a", score: 60, maxScore: null })],
      NOW
    );
    expect(m.get("a")?.count).toBe(1);
    expect(m.get("a")?.bestScore).toBeNull();
    expect(m.get("a")?.maxScore).toBeNull();
  });
});

describe("attemptBadge", () => {
  /** A graded single sitting — the shape every case below varies from. */
  const S = (over: Partial<MockAttemptSummary> = {}): MockAttemptSummary => ({
    count: 1,
    live: false,
    bestScore: 68,
    maxScore: 100,
    ...over,
  });

  it("renders nothing when there is nothing to say", () => {
    expect(attemptBadge(undefined)).toBeNull();
    expect(attemptBadge(S({ count: 0, live: false, bestScore: null, maxScore: null }))).toBeNull();
  });

  it("leads with Resume when an attempt is live, whatever the history", () => {
    const b = attemptBadge(S({ count: 3, live: true }));
    expect(b?.tone).toBe("live");
    expect(b?.label).toBe("Resume");
  });

  it("shows the score alone for a single sitting", () => {
    expect(attemptBadge(S({ count: 1 }))?.label).toBe("68/100");
  });

  it("shows the retake count alongside the best score", () => {
    expect(attemptBadge(S({ count: 3 }))?.label).toBe("×3 · 68/100");
  });

  it("says Attempted when a sitting is not yet graded", () => {
    expect(
      attemptBadge(S({ count: 1, bestScore: null, maxScore: null }))?.label
    ).toBe("Attempted");
    expect(
      attemptBadge(S({ count: 2, bestScore: null, maxScore: null }))?.label
    ).toBe("Attempted ×2");
  });

  it("rounds a fractional score rather than printing 33.329999", () => {
    // CDS marking is fractional (-0.83 per wrong answer), so a raw score is
    // routinely a long decimal. The card has room for a number, not a float.
    expect(attemptBadge(S({ bestScore: 33.33, maxScore: 100 }))?.label).toBe("33/100");
  });

  it("spells the badge out for a screen reader instead of reading '×3 ·'", () => {
    expect(attemptBadge(S({ count: 3 }))?.ariaLabel).toBe(
      "Attempted 3 times, best score 68 out of 100"
    );
    expect(attemptBadge(S({ count: 1 }))?.ariaLabel).toBe(
      "Attempted once, score 68 out of 100"
    );
    expect(attemptBadge(S({ count: 2, live: true }))?.ariaLabel).toBe(
      "Attempt in progress — resume this mock"
    );
  });
});

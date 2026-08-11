/**
 * Unit spec for review staleness + latest-verdict resolution (pure).
 *
 * Two facts this file pins down:
 *
 * 1. STALENESS. A review describes the question as it was at review time. If the
 *    stem is later repaired, the row still says "confirmed" about text that no
 *    longer exists. Comparing the stored fingerprint against the question's
 *    current content_hash turns that from invisible into a queryable list — the
 *    same move migration 0040 made for derived fields.
 *
 * 2. LATEST WINS. The table is append-only, so a re-review adds a row rather
 *    than overwriting. "What do we currently believe about this question?" is
 *    therefore the newest row per question — which is what makes an OVERTURNED
 *    review (agent said flip, source-verification said don't) survive in the
 *    record instead of being erased by an UPDATE.
 */
import { describe, it, expect } from "vitest";
import { isReviewStale, latestReviewByQuestion } from "@/lib/reviews/staleness";

describe("isReviewStale", () => {
  it("is false when the question is unchanged since review", () => {
    expect(isReviewStale({ reviewed_content_hash: "hash-a" }, "hash-a")).toBe(false);
  });

  it("is true when the question changed after review", () => {
    expect(isReviewStale({ reviewed_content_hash: "hash-a" }, "hash-b")).toBe(true);
  });

  it("treats an unknown current hash as stale rather than fresh", () => {
    // A missing current hash means we cannot show the review still applies.
    // Defaulting to "fresh" would assert something we cannot support.
    expect(isReviewStale({ reviewed_content_hash: "hash-a" }, null)).toBe(true);
    expect(isReviewStale({ reviewed_content_hash: "hash-a" }, undefined)).toBe(true);
  });
});

describe("latestReviewByQuestion", () => {
  const rows = [
    { question_id: "q1", reviewed_at: "2026-07-11T09:12:00Z", verdict: "key_fixed" },
    { question_id: "q1", reviewed_at: "2026-07-11T11:40:00Z", verdict: "defect_preserved" },
    { question_id: "q2", reviewed_at: "2026-07-11T10:00:00Z", verdict: "confirmed" },
  ];

  it("returns the newest row per question", () => {
    const latest = latestReviewByQuestion(rows);
    expect(latest.get("q1")?.verdict).toBe("defect_preserved");
    expect(latest.get("q2")?.verdict).toBe("confirmed");
  });

  it("is independent of input order", () => {
    const latest = latestReviewByQuestion([...rows].reverse());
    expect(latest.get("q1")?.verdict).toBe("defect_preserved");
  });

  it("keeps the first row on an exact timestamp tie", () => {
    // A tie is a data problem, not something to resolve cleverly: two reviews of
    // one question at the same instant cannot be ordered. Deterministic and
    // documented beats arbitrary.
    const tied = [
      { question_id: "q1", reviewed_at: "2026-07-11T09:00:00Z", verdict: "confirmed" },
      { question_id: "q1", reviewed_at: "2026-07-11T09:00:00Z", verdict: "key_fixed" },
    ];
    expect(latestReviewByQuestion(tied).get("q1")?.verdict).toBe("confirmed");
  });

  it("returns an empty map for no rows", () => {
    expect(latestReviewByQuestion([]).size).toBe(0);
  });
});

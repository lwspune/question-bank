/**
 * Unit spec for turning a student-report triage into a review verdict (pure).
 *
 * The hard rule: NEVER INVENT A VERDICT. A report status alone does not say what
 * an admin actually did — "resolved" could mean the key was flipped, the stem
 * repaired, or the solution rewritten, and guessing would put a fabricated
 * verdict in the audit trail this table exists to make trustworthy. So:
 *
 *   - Only ANSWER-AFFECTING categories can produce a review at all. A broken
 *     image or a wrong PYQ year is a data fix, not an answer adjudication.
 *   - "wont-fix" on such a report IS unambiguous — a reporter claimed the answer
 *     was wrong and we rejected the claim, so the stored answer stands. That is
 *     `confirmed`, derived without asking.
 *   - "resolved" is ambiguous, so it records ONLY if the admin picked a verdict.
 *     No pick, no row.
 *   - "duplicate" marks the REPORT as a duplicate; the review belongs to the
 *     original report, so nothing is recorded here.
 */
import { describe, it, expect } from "vitest";
import { resolveTriageReview } from "@/lib/reviews/triage";

describe("resolveTriageReview", () => {
  it("derives confirmed when an answer complaint is rejected", () => {
    expect(
      resolveTriageReview({ category: "wrong-answer", status: "wont-fix" })
    ).toBe("confirmed");
    expect(
      resolveTriageReview({ category: "incorrect-solution", status: "wont-fix" })
    ).toBe("confirmed");
  });

  it("records the admin's verdict when a report is resolved", () => {
    expect(
      resolveTriageReview({
        category: "wrong-answer",
        status: "resolved",
        proposedVerdict: "key_fixed",
      })
    ).toBe("key_fixed");
  });

  it("records nothing when a resolved report carries no verdict", () => {
    expect(resolveTriageReview({ category: "wrong-answer", status: "resolved" })).toBeNull();
  });

  it("ignores a verdict proposed for a non-answer category", () => {
    // A broken image being fixed says nothing about whether the answer is right.
    expect(
      resolveTriageReview({
        category: "broken-image",
        status: "resolved",
        proposedVerdict: "key_fixed",
      })
    ).toBeNull();
    expect(
      resolveTriageReview({ category: "wrong-pyq-year", status: "wont-fix" })
    ).toBeNull();
  });

  it("records nothing for a non-terminal status", () => {
    for (const status of ["open", "in-review"] as const) {
      expect(
        resolveTriageReview({ category: "wrong-answer", status, proposedVerdict: "key_fixed" })
      ).toBeNull();
    }
  });

  it("records nothing when the report itself is a duplicate", () => {
    expect(
      resolveTriageReview({
        category: "wrong-answer",
        status: "duplicate",
        proposedVerdict: "confirmed",
      })
    ).toBeNull();
  });

  it("rejects a proposed verdict that is not a known verdict", () => {
    expect(
      resolveTriageReview({
        category: "wrong-answer",
        status: "resolved",
        proposedVerdict: "looks-fine",
      })
    ).toBeNull();
  });
});

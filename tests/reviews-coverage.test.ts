/**
 * Unit spec for what a new review pass may SKIP, given what is already on record.
 *
 * This is the rule that turns the review table from a ledger into a saving: a
 * 120-question mock whose questions were confirmed last month should not be
 * re-derived from scratch. But skipping on the wrong evidence is worse than not
 * skipping at all, so three things are pinned down here:
 *
 *   1. STRENGTH MATTERS. A read-through (`solution_audit`) cannot catch a stealth
 *      wrong key — a solution that is internally consistent and simply wrong,
 *      which is what most of the 2026-06-03 audit's ~235 flips turned out to be.
 *      So a read-through confirmation does NOT excuse a question from a blind
 *      re-derivation, though a blind confirmation does excuse it from a
 *      read-through.
 *   2. ONLY `confirmed` SKIPS. Any other verdict means something was found.
 *   3. A KNOWN DEFECT IS SURFACED, NEVER HIDDEN — and it outranks a skip. Before
 *      printing a paper, "this question has a known book defect" is precisely
 *      what the reviewer needs to see, even if the answer itself is confirmed.
 */
import { describe, it, expect } from "vitest";
import { classifyForReview } from "@/lib/reviews/coverage";

const confirmedBlind = { method: "blind_rederivation", verdict: "confirmed" } as const;
const confirmedAudit = { method: "solution_audit", verdict: "confirmed" } as const;

describe("classifyForReview", () => {
  it("reviews a question with no history", () => {
    expect(classifyForReview([], "blind_rederivation")).toBe("review");
    expect(classifyForReview([], "solution_audit")).toBe("review");
  });

  it("skips when a prior confirmation is at least as strong", () => {
    expect(classifyForReview([confirmedBlind], "blind_rederivation")).toBe("skip");
    expect(classifyForReview([confirmedBlind], "solution_audit")).toBe("skip");
    expect(classifyForReview([confirmedAudit], "solution_audit")).toBe("skip");
  });

  it("does NOT let a read-through excuse a blind re-derivation", () => {
    // The whole reason solution_audit exists as its own method.
    expect(classifyForReview([confirmedAudit], "blind_rederivation")).toBe("review");
    expect(
      classifyForReview([{ method: "structural_probe", verdict: "confirmed" }], "blind_rederivation")
    ).toBe("review");
  });

  it("treats the other independent methods as equally strong", () => {
    for (const method of ["source_key_crosscheck", "textbook_answer_key", "report_triage"] as const) {
      expect(classifyForReview([{ method, verdict: "confirmed" }], "blind_rederivation")).toBe("skip");
    }
  });

  it("never skips on a verdict other than confirmed", () => {
    for (const verdict of ["key_fixed", "stem_fixed", "solution_rewritten"] as const) {
      expect(classifyForReview([{ method: "blind_rederivation", verdict }], "solution_audit")).toBe(
        "review"
      );
    }
  });

  it("flags a known source defect, and the flag outranks a skip", () => {
    expect(
      classifyForReview([{ method: "textbook_answer_key", verdict: "defect_preserved" }], "solution_audit")
    ).toBe("flag");
    // Confirmed AND carrying a known defect: still flag. Before printing, the
    // defect is the thing the reviewer must see.
    expect(
      classifyForReview(
        [confirmedBlind, { method: "textbook_answer_key", verdict: "defect_preserved" }],
        "blind_rederivation"
      )
    ).toBe("flag");
  });

  it("flags an unresolved question", () => {
    expect(
      classifyForReview([{ method: "blind_rederivation", verdict: "unverifiable" }], "solution_audit")
    ).toBe("flag");
  });

  it("takes the strongest confirmation among several", () => {
    expect(classifyForReview([confirmedAudit, confirmedBlind], "blind_rederivation")).toBe("skip");
  });
});

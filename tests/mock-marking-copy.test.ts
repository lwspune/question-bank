/**
 * Marking-scheme COPY for the mock instructions screen.
 *
 * This exists because the instructions page hard-coded a marking scheme that
 * was true for the only three exams it had ever served. For a zero-penalty
 * exam it rendered "0 marks for every wrong answer (negative marking)" and
 * "0 marks for un-attempted questions — skip if unsure": the first asserts a
 * rule the exam does not have, and the second is STRICTLY HARMFUL advice, since
 * with no penalty a guess is never worse than a blank. It would also have
 * contradicted our own MHT-CET guide, which tells students to attempt all 50.
 *
 * Pure so the zero-penalty branch is provable without rendering the page.
 */
import { describe, it, expect } from "vitest";
import { markingCopy } from "@/lib/mocks/marking";
import {
  NDA_MATHS_PAPER,
  CDS_ENGLISH_PAPER,
  MHT_CET_MATHS_PAPER,
  MHT_CET_PHY_CHEM_PAPER,
} from "@/lib/mocks/blueprints";

describe("markingCopy", () => {
  it("reports a penalty exam as having negative marking", () => {
    const c = markingCopy(NDA_MATHS_PAPER.marking);
    expect(c.hasPenalty).toBe(true);
    expect(c.wrongValue).toBe("-0.83");
    expect(c.wrongNote).toMatch(/negative marking/i);
  });

  it("tells a penalty exam's candidate that skipping is an option", () => {
    expect(markingCopy(NDA_MATHS_PAPER.marking).unattemptedAdvice).toMatch(
      /skip if unsure/i
    );
  });

  it("keeps fractional penalties readable", () => {
    expect(markingCopy(CDS_ENGLISH_PAPER.marking).wrongValue).toBe("-0.28");
  });

  it("reports a zero-penalty exam as having NO negative marking", () => {
    for (const bp of [MHT_CET_MATHS_PAPER, MHT_CET_PHY_CHEM_PAPER]) {
      const c = markingCopy(bp.marking);
      expect(c.hasPenalty).toBe(false);
      expect(c.wrongNote).toMatch(/no negative marking/i);
      // The old copy asserted negative marking existed. It must not any more.
      expect(c.wrongNote).not.toMatch(/\(negative marking\)/i);
    }
  });

  /**
   * The one that would have cost students marks: with no penalty, leaving a
   * question blank is strictly worse than guessing it.
   */
  it("never tells a zero-penalty candidate to skip", () => {
    const c = markingCopy(MHT_CET_MATHS_PAPER.marking);
    expect(c.unattemptedAdvice).not.toMatch(/skip/i);
    expect(c.unattemptedAdvice).toMatch(/never leave/i);
  });

  it("renders the wrong-answer value as 0 without a sign for a zero penalty", () => {
    expect(markingCopy(MHT_CET_MATHS_PAPER.marking).wrongValue).toBe("0");
  });

  it("drops trailing zeros from whole-number marks", () => {
    expect(markingCopy({ correct: 2, wrong: 0 }).correctValue).toBe("+2");
    expect(markingCopy({ correct: 2.5, wrong: -0.83 }).correctValue).toBe("+2.5");
  });
});

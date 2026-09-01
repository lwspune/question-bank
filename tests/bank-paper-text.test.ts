import { describe, it, expect } from "vitest";
import {
  auditPaperText,
  BLOCKING_RULES,
  type PaperTextRow,
} from "../scripts/bank-paper/paper-text";

/**
 * Seven text rules for an assembled paper. Every one is a defect of the STORED
 * STRING, not of rendering — `/browse` and the docx export both honour a real
 * newline and a GFM pipe-table — and a printed paper is the one surface a
 * student cannot re-flow.
 *
 * The false-positive cases below are not hypothetical: each is a phrase that
 * tripped the first draft of this audit on real paper rows.
 */

const row = (over: Partial<PaperTextRow> = {}): PaperTextRow => ({
  id: "q1",
  where: "Physics / Optics Q1",
  stem: "A plain question with nothing special about it?",
  context: null,
  solution: "Substituting gives 4. Matches option B.",
  optionsText: "A) 1 || B) 4 || C) 9 || D) 16",
  hasImage: false,
  ...over,
});

const codes = (rows: PaperTextRow[]) => auditPaperText(rows).map((v) => v.rule);

describe("P1 — labelled statements must not share a line", () => {
  it("flags two labelled statements run together", () => {
    const r = row({ stem: "Statement I: Copper conducts. Statement II: Rubber does not. Which is correct?" });
    expect(codes([r])).toContain("P1-statement-run-on");
  });

  it("passes when each statement starts its own line", () => {
    const r = row({ stem: "Statement I: Copper conducts.\nStatement II: Rubber does not.\nWhich is correct?" });
    expect(codes([r])).not.toContain("P1-statement-run-on");
  });

  it("does NOT fire on the ordinary word 'statements' in prose", () => {
    const r = row({ stem: "Which of the following statements about copper is correct?" });
    expect(codes([r])).not.toContain("P1-statement-run-on");
  });

  it("covers Assertion / Reason, which use different labels", () => {
    const r = row({ stem: "Assertion (A): Iron rusts. Reason (R): Oxygen is present." });
    expect(codes([r])).toContain("P1-statement-run-on");
  });
});

/**
 * The dominant NDA style is a BARE label after a lead-in — "Consider the
 * following statements: 1. ... 2. ..." — with no literal word "Statement".
 * The first draft required that word, so a 120-question paper carrying 22 such
 * run-on stems reported "Paper text: OK". These cases pin that gap shut.
 */
describe("P1 — bare numbered statement labels (the dominant NDA style)", () => {
  it("flags bare numeric labels run together on one line", () => {
    const r = row({
      stem: "Consider the following statements: 1. The null set is a subset of every set. 2. Every set is a subset of itself. Which of the above statements are correct?",
    });
    expect(codes([r])).toContain("P1-statement-run-on");
  });

  it("passes when each bare numeric label starts its own line", () => {
    const r = row({
      stem: "Consider the following statements:\n1. The null set is a subset of every set.\n2. Every set is a subset of itself.\nWhich of the above statements are correct?",
    });
    expect(codes([r])).not.toContain("P1-statement-run-on");
  });

  // The word-label scan catches stems the bare scan does not, so it survives.
  it("still flags the word-'Statement' form", () => {
    const r = row({ stem: "Statement 1: Copper conducts. Statement 2: Rubber does not. Which is correct?" });
    expect(codes([r])).toContain("P1-statement-run-on");
  });

  it("does NOT fire on 'which of the following statements is correct?' with no labels", () => {
    const r = row({ stem: "Which of the following statements is correct?" });
    expect(codes([r])).not.toContain("P1-statement-run-on");
  });

  // A Match List's labels are table CELLS, not run-on statements. P2 owns the
  // match-list rule; P1 must stay out of it.
  it("does NOT fire on a Match List that is a real GFM pipe table", () => {
    const r = row({
      stem: "Match List-I with List-II.\n\n| List-I | List-II |\n|---|---|\n| 1. Kolkata | A. West Bengal |\n| 2. Mormugao | B. Goa |",
    });
    expect(codes([r])).not.toContain("P1-statement-run-on");
  });

  // `findStatementLabels` reports offsets into the MATH-MASKED string, which is
  // SHORTER than the raw stem. Testing "at line start" by slicing the RAW text
  // at a masked offset lands in the wrong place and mis-reads a correctly
  // formatted stem as a run-on.
  it("does NOT fire when a leading math zone shifts every label offset", () => {
    const r = row({
      stem: "Let \\(a+b=c\\) hold.\n1. The sum is positive.\n2. The product is positive.\nWhich is correct?",
    });
    expect(codes([r])).not.toContain("P1-statement-run-on");
  });

  it("still flags a run-on stem that carries a math zone", () => {
    const r = row({
      stem: "Let \\(a+b=c\\) hold. 1. The sum is positive. 2. The product is positive. Which is correct?",
    });
    expect(codes([r])).toContain("P1-statement-run-on");
  });
});

describe("P2 — a match-list must render as a table", () => {
  it("flags List-I/List-II prose with no separator row", () => {
    const r = row({ stem: "Match List-I with List-II.\nList-I (Port) | List-II (State)\nA. Kolkata | 1. West Bengal" });
    expect(codes([r])).toContain("P2-matchlist-not-a-table");
  });

  it("flags a match-list with no pipes at all", () => {
    const r = row({ stem: "Match List-I with List-II.\nList-I (Port)\nA. Kolkata\nB. Mormugao" });
    expect(codes([r])).toContain("P2-matchlist-not-a-table");
  });

  it("passes a real GFM table — the separator row is what makes it one", () => {
    const r = row({
      stem: "Match List-I with List-II.\n\n| List-I (Port) | List-II (State) |\n|---|---|\n| A. Kolkata | 1. West Bengal |",
    });
    expect(codes([r])).not.toContain("P2-matchlist-not-a-table");
  });

  it("does NOT fire on a question that merely says 'list'", () => {
    const r = row({ stem: "Which of the following is listed as a fundamental right?" });
    expect(codes([r])).not.toContain("P2-matchlist-not-a-table");
  });
});

describe("P3 — rearrangement parts must not share a line", () => {
  it("flags S1/P/Q/R/S run together", () => {
    const r = row({ stem: "S1: The sun rose. S6: They left. P: He woke. Q: She ate. R: It rained. S: All packed." });
    expect(codes([r])).toContain("P3-pqrs-run-on");
  });

  it("passes when every part is on its own line", () => {
    const r = row({ stem: "S1: The sun rose.\nS6: They left.\nP: He woke.\nQ: She ate.\nR: It rained.\nS: All packed." });
    expect(codes([r])).not.toContain("P3-pqrs-run-on");
  });
});

describe("P4 — a question that references a figure must have one", () => {
  it("flags a stem citing a figure with no image attached", () => {
    const r = row({ stem: "The circuit shown in the figure has three resistors.", hasImage: false });
    expect(codes([r])).toContain("P4-figure-ref-no-image");
  });

  it("passes when the image is attached", () => {
    const r = row({ stem: "The circuit shown in the figure has three resistors.", hasImage: true });
    expect(codes([r])).not.toContain("P4-figure-ref-no-image");
  });

  it("flags options that reference diagrams with no image", () => {
    const r = row({ stem: "Which is correct?", optionsText: "A) Diagram A || B) Diagram B", hasImage: false });
    expect(codes([r])).toContain("P4-figure-ref-no-image");
  });
});

describe("P5 — a figure must not be re-described in the stem", () => {
  it("flags a parenthetical figure description", () => {
    const r = row({
      stem: "Find the resistance.\n\n(The figure shows two resistors in series between P and Q.)",
      hasImage: true,
    });
    expect(codes([r])).toContain("P5-figure-text-duplicated");
  });

  it("does NOT fire on a stem that merely mentions a figure", () => {
    const r = row({ stem: "The circuit shown in the figure has three resistors.", hasImage: true });
    expect(codes([r])).not.toContain("P5-figure-text-duplicated");
  });
});

describe("P6 — a solution must derive, not assert", () => {
  it("flags an asserted result", () => {
    const r = row({ solution: "It can be shown that the answer is 4. Matches option B." });
    expect(codes([r])).toContain("P6-hand-wave");
  });

  // The first draft of this audit fired on both of these against real rows.
  it("does NOT fire on 'seen clearly', where clearly is descriptive", () => {
    const r = row({ solution: "The nearest distance at which an object can be seen clearly is 25 cm. Matches option B." });
    expect(codes([r])).not.toContain("P6-hand-wave");
  });

  it("does NOT fire on 'clearly defined category'", () => {
    const r = row({ solution: "Something that fits no clearly defined category. Matches option A." });
    expect(codes([r])).not.toContain("P6-hand-wave");
  });
});

describe("P7 — no internal provenance may reach a student", () => {
  it("flags the CDS derivation marker", () => {
    const r = row({ solution: "Answer: B. [LLM-derived, confidence: HIGH; no official key — verify before PUBLIC]" });
    expect(codes([r])).toContain("P7-internal-provenance");
  });

  it("flags a bare confidence tag", () => {
    expect(codes([row({ solution: "Answer B. confidence: MED" })])).toContain("P7-internal-provenance");
  });

  // Both of these are legitimate subject vocabulary and tripped the first draft.
  it("does NOT fire on 'reducing agent'", () => {
    const r = row({ solution: "Sulphur dioxide is a reducing agent here. Matches option C." });
    expect(codes([r])).not.toContain("P7-internal-provenance");
  });

  it("does NOT fire on the grammatical 'agent' of a passive sentence", () => {
    const r = row({ solution: "The active form makes the agent the subject. Matches option A." });
    expect(codes([r])).not.toContain("P7-internal-provenance");
  });
});

describe("severity and reporting", () => {
  it("marks the student-facing and correctness rules blocking, judgement ones not", () => {
    expect(BLOCKING_RULES).toContain("P7-internal-provenance");
    expect(BLOCKING_RULES).toContain("P4-figure-ref-no-image");
    expect(BLOCKING_RULES).toContain("P2-matchlist-not-a-table");
    // P5 and P6 need a human read — a redundant description is not a defect,
    // and "clearly" has legitimate uses this rule cannot fully separate.
    expect(BLOCKING_RULES).not.toContain("P5-figure-text-duplicated");
    expect(BLOCKING_RULES).not.toContain("P6-hand-wave");
  });

  it("reports every distinct violation on one row, not just the first", () => {
    const r = row({
      stem: "Statement I: A. Statement II: B. The figure shows a circuit.",
      solution: "It can be shown. [LLM-derived, confidence: LOW]",
      hasImage: false,
    });
    const got = new Set(codes([r]));
    expect(got.has("P1-statement-run-on")).toBe(true);
    expect(got.has("P4-figure-ref-no-image")).toBe(true);
    expect(got.has("P6-hand-wave")).toBe(true);
    expect(got.has("P7-internal-provenance")).toBe(true);
  });

  it("passes a clean paper", () => {
    expect(auditPaperText([row(), row({ id: "q2" })])).toEqual([]);
  });
});

describe("a linearised 'Match the following' belongs to P2, not P1", () => {
  it("fires P2-matchlist-not-a-table and NOT P1-statement-run-on", () => {
    // Live shape (Foundation Course): the numbered items are a column of pairs,
    // not claims. P1 used to fire on it while the auto-repair skipped it, leaving
    // a blocking violation with no fix. P2's message names the right remedy.
    const rows = [
      {
        id: "q-match",
        where: "Foundation / Physics Q1",
        stem: "Match the following with correct response. (1) Newton's first law (2) Newton's second law (3) Newton's third law",
        context: null,
        solution: null,
        optionsText: "",
        hasImage: false,
      },
    ];
    const kinds = auditPaperText(rows).map((v) => v.rule);
    expect(kinds).toContain("P2-matchlist-not-a-table");
    expect(kinds).not.toContain("P1-statement-run-on");
  });
});

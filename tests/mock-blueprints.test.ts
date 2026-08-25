import { describe, it, expect } from "vitest";
import {
  MOCK_BLUEPRINTS,
  NDA_MATHS_PAPER,
  NDA_GAT_PAPER,
  NEET_PAPER,
  CDS_ENGLISH_PAPER,
  getBlueprint,
  totalQuestions,
  totalMarks,
} from "@/lib/mocks/blueprints";

describe("mock blueprints", () => {
  it("registers the NDA Maths Paper I blueprint", () => {
    expect(MOCK_BLUEPRINTS).toContain(NDA_MATHS_PAPER);
  });

  it("NDA Maths is 120 questions across one section", () => {
    expect(totalQuestions(NDA_MATHS_PAPER)).toBe(120);
    expect(NDA_MATHS_PAPER.sections).toHaveLength(1);
    expect(NDA_MATHS_PAPER.sections[0].subjects).toEqual(["Mathematics"]);
    expect(NDA_MATHS_PAPER.sections[0].count).toBe(120);
  });

  it("NDA Maths totals 300 marks at +2.5 / -0.83", () => {
    expect(NDA_MATHS_PAPER.marking).toEqual({ correct: 2.5, wrong: -0.83 });
    expect(totalMarks(NDA_MATHS_PAPER)).toBe(300);
  });

  it("NDA Maths runs for 150 minutes", () => {
    expect(NDA_MATHS_PAPER.durationSecs).toBe(150 * 60);
  });

  it("NDA GAT is 150 questions across English (50) + General Knowledge (100)", () => {
    expect(totalQuestions(NDA_GAT_PAPER)).toBe(150);
    expect(NDA_GAT_PAPER.sections.map((s) => s.count)).toEqual([50, 100]);
    expect(NDA_GAT_PAPER.sections[0].subjects).toEqual(["English"]);
    expect(NDA_GAT_PAPER.sections[1].subjects).toContain("Physics");
  });

  it("NDA GAT totals 600 marks at +4 / -1.33", () => {
    expect(NDA_GAT_PAPER.marking).toEqual({ correct: 4, wrong: -1.33 });
    expect(totalMarks(NDA_GAT_PAPER)).toBe(600);
  });

  it("looks up a blueprint by exam slug + paper code", () => {
    expect(getBlueprint("nda", "maths")).toBe(NDA_MATHS_PAPER);
    expect(getBlueprint("nda", "gat")).toBe(NDA_GAT_PAPER);
  });

  it("returns null for an unknown exam/paper", () => {
    expect(getBlueprint("nda", "physics")).toBeNull();
    expect(getBlueprint("neet", "maths")).toBeNull();
  });
});

describe("NEET blueprint", () => {
  it("is one combined paper across Physics / Chemistry / Biology", () => {
    expect(NEET_PAPER.code).toBe("full");
    expect(NEET_PAPER.examSlug).toBe("neet");
    expect(NEET_PAPER.examName).toBe("NEET");
    expect(NEET_PAPER.sections.map((s) => s.key)).toEqual([
      "physics",
      "chemistry",
      "biology",
    ]);
  });

  it("puts Botany + Zoology in one content-mixed Biology section", () => {
    const bio = NEET_PAPER.sections.find((s) => s.key === "biology")!;
    expect(bio.subjects).toEqual(["Botany", "Zoology"]);
  });

  it("marks +4 / -1", () => {
    expect(NEET_PAPER.marking).toEqual({ correct: 4, wrong: -1 });
  });

  it("declares no per-section count (the count varies per sitting: 180 vs 200)", () => {
    for (const s of NEET_PAPER.sections) expect(s.count).toBeUndefined();
    // With no declared counts, the blueprint sum is 0 — buildMockPaper derives
    // the true total from the actual rows placed (soft-count contract).
    expect(totalQuestions(NEET_PAPER)).toBe(0);
  });

  it("is resolvable by getBlueprint but is NOT in the NDA discovery list", () => {
    expect(getBlueprint("neet", "full")).toBe(NEET_PAPER);
    expect(MOCK_BLUEPRINTS).not.toContain(NEET_PAPER); // NDA year+month loop only
    expect(MOCK_BLUEPRINTS).toHaveLength(2);
  });
});

describe("CDS blueprint", () => {
  it("is one English paper of 120 questions in a single section", () => {
    expect(CDS_ENGLISH_PAPER.code).toBe("english");
    expect(CDS_ENGLISH_PAPER.examSlug).toBe("cds");
    expect(CDS_ENGLISH_PAPER.examName).toBe("CDS");
    expect(totalQuestions(CDS_ENGLISH_PAPER)).toBe(120);
    expect(CDS_ENGLISH_PAPER.sections).toHaveLength(1);
    expect(CDS_ENGLISH_PAPER.sections[0].subjects).toEqual(["English"]);
    // Hard count contract: every CDS sitting is exactly 120 questions.
    expect(CDS_ENGLISH_PAPER.sections[0].count).toBe(120);
  });

  it("runs for 2 hours", () => {
    expect(CDS_ENGLISH_PAPER.durationSecs).toBe(120 * 60);
  });

  /**
   * The load-bearing arithmetic case: CDS marks are FRACTIONAL (100 marks over
   * 120 questions = 0.8333 each, penalty = 1/3 of that). 120 * 0.8333 is
   * 99.99600000000001 in floating point — the paper must still report exactly
   * 100 marks, not "99.996".
   */
  it("totals exactly 100 marks at +0.8333 / -0.2778", () => {
    expect(CDS_ENGLISH_PAPER.marking).toEqual({
      correct: 0.8333,
      wrong: -0.2778,
    });
    expect(totalMarks(CDS_ENGLISH_PAPER)).toBe(100);
  });

  it("is resolvable by getBlueprint but is NOT in the NDA discovery list", () => {
    expect(getBlueprint("cds", "english")).toBe(CDS_ENGLISH_PAPER);
    // MOCK_BLUEPRINTS drives the NDA year+month discovery loop; CDS sittings
    // carry a NULL pyq_month, so it must never enter that loop.
    expect(MOCK_BLUEPRINTS).not.toContain(CDS_ENGLISH_PAPER);
    expect(MOCK_BLUEPRINTS).toHaveLength(2);
  });
});

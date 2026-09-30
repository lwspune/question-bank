/**
 * Chapter tests (sectional mocks, migration 0088 `scope='sectional'`). Pure; no DB.
 *
 * The rules here decide what a student sits, and each one guards a failure the
 * catalogue would never show:
 *
 *  - SIZE comes from the chapter's own pool, so a thin chapter gets no test
 *    rather than a test that is the whole chapter;
 *  - DURATION is the real paper's own rate, so a chapter test trains the pace
 *    the exam demands (MHT-CET has no negative marking, so pace is the skill);
 *  - SELECTION keeps the chapter's difficulty mix and spreads across its
 *    subtopics, because the findings card reports per subtopic and a test drawn
 *    from one subtopic would diagnose nothing;
 *  - it is DETERMINISTIC, so the dry run prints exactly what --apply writes.
 */
import { describe, it, expect } from "vitest";
import {
  sectionalSize,
  sectionalDurationSecs,
  sectionalBlueprint,
  isSectionalEligible,
  pickSectionalQuestions,
  orderChapters,
  sectionalSlug,
  sectionalTitle,
  type SectionalCandidate,
} from "@/lib/mocks/sectional";
import { MHT_CET_MATHS_PAPER, MHT_CET_PHY_CHEM_PAPER } from "@/lib/mocks/blueprints";

function cand(
  id: string,
  difficulty: SectionalCandidate["difficulty"],
  subtopic = "S",
  over: Partial<SectionalCandidate> = {}
): SectionalCandidate {
  return { id, difficulty, subtopic, setBound: false, format: "mcq", correctCount: 1, ...over };
}

/** `n` candidates of one difficulty + subtopic, ids prefixed so they sort predictably. */
function many(prefix: string, n: number, difficulty: SectionalCandidate["difficulty"], subtopic = "S") {
  return Array.from({ length: n }, (_, i) =>
    cand(`${prefix}${String(i).padStart(3, "0")}`, difficulty, subtopic)
  );
}

describe("sectionalSize — the test length a chapter's pool can carry", () => {
  it("gives 20 questions at 60 or more", () => {
    expect(sectionalSize(60)).toBe(20);
    expect(sectionalSize(214)).toBe(20);
  });
  it("gives 15 questions from 30 to 59", () => {
    expect(sectionalSize(59)).toBe(15);
    expect(sectionalSize(30)).toBe(15);
  });
  it("gives no test below 30", () => {
    expect(sectionalSize(29)).toBeNull();
    expect(sectionalSize(0)).toBeNull();
  });
});

describe("sectionalDurationSecs — the real paper's own rate, rounded up to a minute", () => {
  it("Maths runs 1.8 minutes a question", () => {
    expect(sectionalDurationSecs(MHT_CET_MATHS_PAPER, 20)).toBe(36 * 60);
    expect(sectionalDurationSecs(MHT_CET_MATHS_PAPER, 15)).toBe(27 * 60);
  });
  it("Physics & Chemistry runs 0.9 minutes a question", () => {
    expect(sectionalDurationSecs(MHT_CET_PHY_CHEM_PAPER, 20)).toBe(18 * 60);
  });
  it("rounds a part minute UP, never down", () => {
    // 15 x 0.9 = 13.5 minutes. Rounding down would make the test harder than the paper.
    expect(sectionalDurationSecs(MHT_CET_PHY_CHEM_PAPER, 15)).toBe(14 * 60);
  });
});

describe("sectionalBlueprint — one section of the real paper, sized to the test", () => {
  it("keeps the paper's code, label and marking", () => {
    const bp = sectionalBlueprint(MHT_CET_PHY_CHEM_PAPER, "chemistry", 15);
    expect(bp.code).toBe("phy-chem");
    expect(bp.examSlug).toBe("mht-cet");
    expect(bp.marking).toEqual({ correct: 1, wrong: 0 });
    expect(bp.durationSecs).toBe(14 * 60);
  });
  it("carries exactly the named section, with the test's count as a hard contract", () => {
    const bp = sectionalBlueprint(MHT_CET_PHY_CHEM_PAPER, "chemistry", 15);
    expect(bp.sections).toEqual([
      { key: "chemistry", label: "Chemistry", subjects: ["Chemistry"], count: 15 },
    ]);
  });
  it("refuses a section the paper does not have", () => {
    expect(() => sectionalBlueprint(MHT_CET_MATHS_PAPER, "physics", 20)).toThrow(/physics/);
  });
});

describe("isSectionalEligible", () => {
  it("accepts a plain MCQ with one correct option", () => {
    expect(isSectionalEligible(cand("a", "EASY"))).toBe(true);
  });
  it("rejects a set member — its shared context would print without its siblings", () => {
    expect(isSectionalEligible(cand("a", "EASY", "S", { setBound: true }))).toBe(false);
  });
  it("rejects anything but a single-answer MCQ", () => {
    expect(isSectionalEligible(cand("a", "EASY", "S", { format: "numeric" }))).toBe(false);
    expect(isSectionalEligible(cand("a", "EASY", "S", { correctCount: 0 }))).toBe(false);
    expect(isSectionalEligible(cand("a", "EASY", "S", { correctCount: 2 }))).toBe(false);
  });
  it("rejects an unrated row rather than guessing its difficulty", () => {
    expect(isSectionalEligible(cand("a", null))).toBe(false);
  });
});

describe("pickSectionalQuestions", () => {
  it("returns null when the eligible pool is smaller than the test", () => {
    const pool = [...many("e", 10, "EASY"), cand("x", "EASY", "S", { setBound: true })];
    expect(pickSectionalQuestions(pool, 11)).toBeNull();
  });

  it("picks exactly n distinct questions", () => {
    const got = pickSectionalQuestions(
      [...many("e", 10, "EASY"), ...many("m", 20, "MODERATE"), ...many("h", 10, "HARD")],
      15
    )!;
    expect(got).toHaveLength(15);
    expect(new Set(got.map((c) => c.id)).size).toBe(15);
  });

  it("keeps the pool's difficulty mix, largest remainder first", () => {
    // 15 x (10, 20, 10) / 40 = 3.75, 7.5, 3.75 -> floors 3, 7, 3; the two
    // largest remainders (0.75, 0.75) take the last two seats.
    const got = pickSectionalQuestions(
      [...many("e", 10, "EASY"), ...many("m", 20, "MODERATE"), ...many("h", 10, "HARD")],
      15
    )!;
    const count = (d: string) => got.filter((c) => c.difficulty === d).length;
    expect([count("EASY"), count("MODERATE"), count("HARD")]).toEqual([4, 7, 4]);
  });

  it("orders easy, then moderate, then hard", () => {
    const got = pickSectionalQuestions(
      [...many("h", 10, "HARD"), ...many("m", 10, "MODERATE"), ...many("e", 10, "EASY")],
      12
    )!;
    const rank = { EASY: 0, MODERATE: 1, HARD: 2 } as const;
    const ranks = got.map((c) => rank[c.difficulty!]);
    expect(ranks).toEqual([...ranks].sort((a, b) => a - b));
  });

  it("spreads across subtopics instead of draining the first one", () => {
    const got = pickSectionalQuestions(
      [...many("a", 10, "MODERATE", "Alpha"), ...many("b", 10, "MODERATE", "Beta")],
      4
    )!;
    expect(got.filter((c) => c.subtopic === "Alpha")).toHaveLength(2);
    expect(got.filter((c) => c.subtopic === "Beta")).toHaveLength(2);
  });

  it("never picks an ineligible row, even one that would sort first", () => {
    const pool = [cand("000", "EASY", "S", { setBound: true }), ...many("e", 10, "EASY")];
    const got = pickSectionalQuestions(pool, 5)!;
    expect(got.map((c) => c.id)).not.toContain("000");
  });

  it("is deterministic — input order does not change the pick", () => {
    const pool = [
      ...many("e", 12, "EASY", "A"),
      ...many("m", 25, "MODERATE", "B"),
      ...many("h", 9, "HARD", "C"),
      ...many("k", 14, "MODERATE", "A"),
    ];
    const a = pickSectionalQuestions(pool, 20)!.map((c) => c.id);
    const b = pickSectionalQuestions([...pool].reverse(), 20)!.map((c) => c.id);
    expect(b).toEqual(a);
  });
});

describe("orderChapters — heaviest on recent papers first", () => {
  it("puts weighted chapters first by weight, then the rest by pool size, then by name", () => {
    const weights = new Map([
      ["Vectors", 4.8],
      ["Limits", 2.1],
    ]);
    const got = orderChapters(
      [
        { name: "Circle", pyq: 43 },
        { name: "Limits", pyq: 86 },
        { name: "Complex Numbers", pyq: 43 },
        { name: "Vectors", pyq: 214 },
        { name: "Straight Line", pyq: 50 },
      ],
      weights
    ).map((c) => c.name);
    expect(got).toEqual(["Vectors", "Limits", "Straight Line", "Circle", "Complex Numbers"]);
  });
});

describe("slug and title", () => {
  it("slugs carry the order number, so the catalogue lists in that order", () => {
    expect(sectionalSlug("mht-cet", "maths", 1, "Line and Plane")).toBe(
      "mht-cet-chapter-maths-01-line-and-plane"
    );
  });
  it("slugs strip punctuation cleanly", () => {
    expect(sectionalSlug("mht-cet", "chemistry", 12, "Alcohols, Phenols and Ethers")).toBe(
      "mht-cet-chapter-chemistry-12-alcohols-phenols-and-ethers"
    );
    expect(sectionalSlug("mht-cet", "physics", 3, "Optics (Ray)")).toBe(
      "mht-cet-chapter-physics-03-optics-ray"
    );
  });
  it("never collides with a past-paper slug", () => {
    // Past papers are mht-cet-<sitting>-<paper>; a sitting never starts "chapter".
    expect(sectionalSlug("mht-cet", "maths", 1, "Vectors").startsWith("mht-cet-chapter-")).toBe(true);
  });
  it("titles name the exam and the chapter", () => {
    expect(sectionalTitle("MHT-CET", "Vectors")).toBe("MHT-CET Vectors — Chapter test");
  });
});

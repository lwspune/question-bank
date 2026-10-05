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
  pickSectionalSets,
  type SectionalCandidate,
  type SectionalSet,
} from "@/lib/mocks/sectional";
import {
  MHT_CET_MATHS_PAPER,
  MHT_CET_PHY_CHEM_PAPER,
  NDA_GAT_PAPER,
  JEE_MAINS_PAPER,
} from "@/lib/mocks/blueprints";

function cand(
  id: string,
  difficulty: SectionalCandidate["difficulty"],
  subtopic = "S",
  over: Partial<SectionalCandidate> = {}
): SectionalCandidate {
  return { id, difficulty, subtopic, setBound: false, format: "mcq", correctCount: 1, ...over };
}

function num(
  id: string,
  difficulty: SectionalCandidate["difficulty"],
  subtopic = "S",
  over: Partial<SectionalCandidate> = {}
): SectionalCandidate {
  return cand(id, difficulty, subtopic, { format: "numeric", correctCount: 0, hasNumericKey: true, ...over });
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
  it("gives a 10-question test from 20 to 29 when the exam lowers its floor to 20", () => {
    expect(sectionalSize(29, 20)).toBe(10);
    expect(sectionalSize(20, 20)).toBe(10);
    expect(sectionalSize(19, 20)).toBeNull();
  });
  it("a lowered floor leaves the larger sizes alone", () => {
    expect(sectionalSize(30, 20)).toBe(15);
    expect(sectionalSize(60, 20)).toBe(20);
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
  it("can name the section for the subject, so a GK chapter test files under Physics, not General Knowledge", () => {
    const bp = sectionalBlueprint(NDA_GAT_PAPER, "gk", 20, "Physics");
    expect(bp.sections[0].key).toBe("gk");
    expect(bp.sections[0].label).toBe("Physics");
    expect(bp.marking).toEqual(NDA_GAT_PAPER.marking);
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
  it("rejects an MCQ without exactly one correct option", () => {
    expect(isSectionalEligible(cand("a", "EASY", "S", { correctCount: 0 }))).toBe(false);
    expect(isSectionalEligible(cand("a", "EASY", "S", { correctCount: 2 }))).toBe(false);
  });
  it("accepts a numeric question only when it carries its answer", () => {
    expect(isSectionalEligible(num("a", "EASY"))).toBe(true);
    expect(isSectionalEligible(num("a", "EASY", "S", { hasNumericKey: false }))).toBe(false);
  });
  it("rejects any other format", () => {
    expect(isSectionalEligible(cand("a", "EASY", "S", { format: "subjective" }))).toBe(false);
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

describe("pickSectionalQuestions — numeric questions, as the JEE paper mixes them", () => {
  const nums = (prefix: string, n: number) =>
    Array.from({ length: n }, (_, i) => num(`${prefix}${String(i).padStart(3, "0")}`, "MODERATE"));

  it("gives numeric questions their share, rounded", () => {
    const pool = [...many("m", 40, "MODERATE"), ...nums("n", 10)];
    const count = (n: number) =>
      pickSectionalQuestions(pool, n, { numericShare: 0.2 })!.filter((c) => c.format === "numeric").length;
    expect(count(20)).toBe(4);
    expect(count(15)).toBe(3);
    expect(count(10)).toBe(2);
  });

  it("puts the MCQs first and the numeric questions last, as the paper does", () => {
    const got = pickSectionalQuestions([...nums("n", 10), ...many("m", 40, "HARD")], 20, {
      numericShare: 0.2,
    })!;
    expect(got.slice(0, 16).every((c) => c.format === "mcq")).toBe(true);
    expect(got.slice(16).every((c) => c.format === "numeric")).toBe(true);
  });

  it("fills with MCQs when the chapter has too few numeric questions", () => {
    const got = pickSectionalQuestions([...many("m", 40, "MODERATE"), ...nums("n", 1)], 20, {
      numericShare: 0.2,
    })!;
    expect(got).toHaveLength(20);
    expect(got.filter((c) => c.format === "numeric")).toHaveLength(1);
  });

  it("fills with numeric questions when the chapter has too few MCQs", () => {
    const got = pickSectionalQuestions([...many("m", 12, "MODERATE"), ...nums("n", 20)], 20, {
      numericShare: 0.2,
    })!;
    expect(got).toHaveLength(20);
    expect(got.filter((c) => c.format === "numeric")).toHaveLength(8);
  });

  it("without a share, takes MCQs only", () => {
    const got = pickSectionalQuestions([...many("m", 30, "MODERATE"), ...nums("n", 10)], 20)!;
    expect(got.every((c) => c.format === "mcq")).toBe(true);
  });
});

describe("pickSectionalSets — English tests made of whole sets", () => {
  function set(setId: string, sitting: number, size: number, over: Partial<SectionalCandidate> = {}): SectionalSet {
    return {
      setId,
      sitting,
      members: Array.from({ length: size }, (_, i) =>
        cand(`${setId}-${String(i).padStart(2, "0")}`, null, "S", { setBound: true, ...over })
      ),
    };
  }
  const ids = (got: SectionalCandidate[] | null) => (got ?? []).map((c) => c.id);
  const setsOf = (got: SectionalCandidate[] | null) => [...new Set(ids(got).map((id) => id.split("-")[0]))];

  it("takes whole sets, newest sitting first, until the test reaches 20", () => {
    const got = pickSectionalSets([set("a", 2019, 10), set("b", 2024, 10), set("c", 2022, 10)]);
    expect(setsOf(got)).toEqual(["b", "c"]);
    expect(got).toHaveLength(20);
  });

  it("keeps each set's questions in printed order, all of them", () => {
    const got = pickSectionalSets([set("b", 2024, 10), set("c", 2022, 10)])!;
    expect(ids(got).slice(0, 10)).toEqual(set("b", 2024, 10).members.map((m) => m.id));
  });

  it("skips a set that would take the test past 25 and keeps looking", () => {
    // 9 + 9 = 18; the next set of 9 would make 27, so the 5-question passage fills in.
    const got = pickSectionalSets([set("a", 2024, 9), set("b", 2023, 9), set("c", 2022, 9), set("d", 2021, 5)]);
    expect(setsOf(got)).toEqual(["a", "b", "d"]);
    expect(got).toHaveLength(23);
  });

  it("takes several short passages to reach the target", () => {
    const got = pickSectionalSets([1, 2, 3, 4, 5].map((i) => set(`p${i}`, 2020 + i, 5)));
    expect(got).toHaveLength(20);
    expect(setsOf(got)).toEqual(["p5", "p4", "p3", "p2"]);
  });

  it("never takes a set bigger than 25", () => {
    const got = pickSectionalSets([set("big", 2024, 26), set("a", 2023, 10), set("b", 2022, 10)]);
    expect(setsOf(got)).toEqual(["a", "b"]);
  });

  it("returns null when whole sets cannot reach 15 questions", () => {
    expect(pickSectionalSets([set("a", 2024, 10)])).toBeNull();
  });

  it("drops a whole set when any member cannot be marked", () => {
    const broken = set("x", 2025, 10);
    broken.members[3] = { ...broken.members[3], correctCount: 2 };
    const got = pickSectionalSets([broken, set("a", 2024, 10), set("b", 2023, 10)]);
    expect(setsOf(got)).toEqual(["a", "b"]);
  });

  it("does not need difficulty ratings — sets keep printed order", () => {
    const got = pickSectionalSets([set("a", 2024, 10, { difficulty: null }), set("b", 2023, 10)]);
    expect(got).toHaveLength(20);
  });

  it("is deterministic — breaks a sitting tie by set id", () => {
    const sets = [set("b", 2024, 10), set("a", 2024, 10), set("c", 2024, 10)];
    expect(setsOf(pickSectionalSets(sets))).toEqual(["a", "b"]);
    expect(setsOf(pickSectionalSets([...sets].reverse()))).toEqual(["a", "b"]);
  });
});

describe("sectionalDurationSecs — the other papers", () => {
  it("JEE runs 2.4 minutes a question", () => {
    expect(sectionalDurationSecs(JEE_MAINS_PAPER, 20)).toBe(48 * 60);
  });
  it("NDA GAT runs a minute a question", () => {
    expect(sectionalDurationSecs(NDA_GAT_PAPER, 23)).toBe(23 * 60);
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

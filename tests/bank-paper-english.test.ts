import { describe, it, expect } from "vitest";
import {
  isStimulusChapter,
  auditEnglishSection,
  selectWholeSets,
  orderEnglishBlocks,
  MIN_BLOCK_SIZE,
  type EnglishRow,
} from "../scripts/bank-paper/english";

/** Terse row builder — only the fields a rule actually reads. */
const r = (
  id: string,
  chapter: string,
  subtopic: string | null,
  setId: string | null,
  opts: Partial<EnglishRow> = {}
): EnglishRow => ({
  id,
  chapter,
  subtopic,
  setId,
  exam: "NDA",
  difficulty: "HARD",
  contextLen: setId ? 200 : 0,
  ...opts,
});

describe("isStimulusChapter", () => {
  // The distinction is the whole basis of R2 vs R3: a passage is content a
  // question depends on; a directions line is only a label.
  it("treats Reading Comprehension and Cloze Test as shared-stimulus", () => {
    expect(isStimulusChapter("Reading Comprehension")).toBe(true);
    expect(isStimulusChapter("Cloze Test")).toBe(true);
  });

  it("treats the item-based chapters as directions-only", () => {
    for (const c of ["Grammar", "Vocabulary", "Sentence Rearrangement", "Idioms and Phrases", "Spotting Errors"]) {
      expect(isStimulusChapter(c)).toBe(false);
    }
  });
});

describe("auditEnglishSection", () => {
  const codes = (rows: EnglishRow[], sizes?: Map<string, number>) =>
    auditEnglishSection(rows, sizes ?? new Map()).map((v) => v.rule);

  it("passes a well-formed section", () => {
    const rows = [
      r("g1", "Grammar", "Synonyms", "s1"),
      r("g2", "Grammar", "Synonyms", "s1"),
      r("rc1", "Reading Comprehension", "Inferential", "p1", { contextLen: 1500 }),
      r("rc2", "Reading Comprehension", "Literal", "p1", { contextLen: 1500 }),
    ];
    expect(auditEnglishSection(rows, new Map([["s1", 2], ["p1", 2]]))).toEqual([]);
  });

  // R2 — the defect the user named: 2 of a 5-question passage.
  it("R2: flags a shared-stimulus set taken partially", () => {
    const rows = [
      r("rc1", "Reading Comprehension", "Inferential", "p1", { contextLen: 1500 }),
      r("rc2", "Reading Comprehension", "Literal", "p1", { contextLen: 1500 }),
    ];
    const v = auditEnglishSection(rows, new Map([["p1", 5]]));
    expect(v.map((x) => x.rule)).toContain("R2-partial-stimulus-set");
    expect(v.find((x) => x.rule === "R2-partial-stimulus-set")!.detail).toMatch(/2 of 5/);
  });

  it("R2: does NOT flag a partial set in a directions-only chapter", () => {
    const rows = [r("v1", "Vocabulary", "Synonyms", "s1")];
    expect(codes(rows, new Map([["s1", 10]]))).not.toContain("R2-partial-stimulus-set");
  });

  // R5/R1 — set members must print together or the directions repeat.
  it("R5: flags a set whose members are not contiguous", () => {
    const rows = [
      r("a", "Grammar", "Synonyms", "s1"),
      r("b", "Grammar", "Antonyms", "s2"),
      r("c", "Grammar", "Synonyms", "s1"),
    ];
    const v = auditEnglishSection(rows, new Map([["s1", 2], ["s2", 1]]));
    expect(v.map((x) => x.rule)).toContain("R5-scattered-set");
    expect(v.find((x) => x.rule === "R5-scattered-set")!.questionIds).toEqual(["a", "c"]);
  });

  // The user's second complaint, one level up from sets.
  it("R5: flags a subtopic split across a chapter", () => {
    const rows = [
      r("a", "Vocabulary", "Synonyms", "s1"),
      r("b", "Vocabulary", "Antonyms", "s2"),
      r("c", "Vocabulary", "Synonyms", "s3"),
    ];
    expect(codes(rows, new Map([["s1", 1], ["s2", 1], ["s3", 1]]))).toContain("R5-scattered-subtopic");
  });

  it("R5: a subtopic legitimately spanning one passage is NOT flagged", () => {
    // The real 2025-II RC passage runs Inferential, Literal, Vocabulary-in-Context
    // under ONE passage — grouping RC by subtopic would split it (R9).
    const rows = [
      r("rc1", "Reading Comprehension", "Inferential", "p1", { contextLen: 1500 }),
      r("rc2", "Reading Comprehension", "Literal", "p1", { contextLen: 1500 }),
      r("rc3", "Reading Comprehension", "Inferential", "p1", { contextLen: 1500 }),
    ];
    expect(codes(rows, new Map([["p1", 3]]))).not.toContain("R5-scattered-subtopic");
  });

  it("R4: flags a block below the minimum size", () => {
    const rows = [r("a", "Grammar", "Synonyms", "s1")];
    const v = auditEnglishSection(rows, new Map([["s1", 1]]));
    expect(v.map((x) => x.rule)).toContain("R4-undersized-block");
    expect(MIN_BLOCK_SIZE).toBeGreaterThan(1);
  });

  it("R7: flags a question carrying no directions", () => {
    const rows = [
      r("a", "Grammar", "Synonyms", null, { contextLen: 0 }),
      r("b", "Grammar", "Synonyms", null, { contextLen: 0 }),
    ];
    expect(codes(rows)).toContain("R7-no-directions");
  });

  it("R8: flags a block mixing two exams' directions conventions", () => {
    const rows = [
      r("a", "Grammar", "Synonyms", "s1", { exam: "NDA" }),
      r("b", "Grammar", "Synonyms", "s1", { exam: "CDS" }),
    ];
    expect(codes(rows, new Map([["s1", 2]]))).toContain("R8-mixed-exam-block");
  });

  it("reports every distinct violation, not just the first", () => {
    const rows = [
      r("a", "Reading Comprehension", "Inferential", "p1", { contextLen: 1500 }),
      r("b", "Grammar", "Synonyms", null, { contextLen: 0 }),
    ];
    const got = new Set(codes(rows, new Map([["p1", 5]])));
    expect(got.has("R2-partial-stimulus-set")).toBe(true);
    expect(got.has("R7-no-directions")).toBe(true);
  });
});

describe("selectWholeSets", () => {
  const sizes = new Map([["p1", 3], ["p2", 3], ["p3", 2]]);
  const pool: EnglishRow[] = [
    r("p1a", "Reading Comprehension", "Inferential", "p1", { difficulty: "HARD" }),
    r("p1b", "Reading Comprehension", "Literal", "p1", { difficulty: "EASY" }),
    r("p1c", "Reading Comprehension", "Literal", "p1", { difficulty: "EASY" }),
    r("p2a", "Reading Comprehension", "Inferential", "p2", { difficulty: "HARD" }),
    r("p2b", "Reading Comprehension", "Inferential", "p2", { difficulty: "HARD" }),
    r("p2c", "Reading Comprehension", "Literal", "p2", { difficulty: "MODERATE" }),
    r("p3a", "Reading Comprehension", "Inferential", "p3", { difficulty: "EASY" }),
    r("p3b", "Reading Comprehension", "Literal", "p3", { difficulty: "EASY" }),
  ];

  // R6 — only 5 of 398 English sets in the bank are 100% HARD, so a whole-set
  // draw cannot filter per question. It ranks sets by how hard they are.
  // The budget is in QUESTIONS, like every other quota in this builder — a
  // section has to total 50. Whole sets are then packed into that budget.
  it("takes the hardest COMPLETE set first", () => {
    const { picked } = selectWholeSets(pool, 3, sizes);
    expect(picked.map((p) => p.id)).toEqual(["p2a", "p2b", "p2c"]);
  });

  it("never overshoots the budget by taking a set that does not fit", () => {
    // p2 and p1 are 3 each; only the 2-question p3 fits a budget of 2.
    const { picked } = selectWholeSets(pool, 2, sizes);
    expect(picked.map((p) => p.id)).toEqual(["p3a", "p3b"]);
  });

  it("returns whole sets only — never a fragment", () => {
    const { picked } = selectWholeSets(pool, 2, sizes);
    const bySet = new Map<string, number>();
    for (const p of picked) bySet.set(p.setId!, (bySet.get(p.setId!) ?? 0) + 1);
    for (const [sid, n] of bySet) expect(n).toBe(sizes.get(sid));
  });

  it("skips a set the pool holds incompletely rather than taking a fragment", () => {
    const partial = pool.filter((p) => p.id !== "p2c"); // p2 is now 2 of 3
    const { picked } = selectWholeSets(partial, 3, sizes);
    // p2 is the hardest set but is no longer complete, so p1 is taken instead.
    expect(picked.map((p) => p.id)).toEqual(["p1a", "p1b", "p1c"]);
  });

  it("reports a shortfall instead of under-delivering silently", () => {
    // 8 questions exist across three complete sets; ask for 9.
    const { picked, shortfall } = selectWholeSets(pool, 9, sizes);
    expect(picked.length).toBe(8);
    expect(shortfall).toBe(1);
  });

  it("is deterministic — equal hardness breaks ties on set id", () => {
    const a = selectWholeSets(pool, 3, sizes).picked.map((p) => p.id);
    const b = selectWholeSets(pool, 3, sizes).picked.map((p) => p.id);
    expect(a).toEqual(b);
  });
});

describe("orderEnglishBlocks", () => {
  it("groups by subtopic, keeping each set contiguous inside it", () => {
    const rows = [
      r("syn1", "Vocabulary", "Synonyms", "s1"),
      r("ant1", "Vocabulary", "Antonyms", "s2"),
      r("syn2", "Vocabulary", "Synonyms", "s3"),
      r("ant2", "Vocabulary", "Antonyms", "s2"),
    ];
    const out = orderEnglishBlocks(rows).map((x) => x.id);
    // Antonyms leads (alphabetical, so the order is deterministic); both s2
    // members sit together rather than being split by the Synonyms questions.
    expect(out.indexOf("ant2") - out.indexOf("ant1")).toBe(1);
    expect(Math.abs(out.indexOf("syn1") - out.indexOf("syn2"))).toBe(1);
  });

  it("keeps a stimulus set whole and does NOT split it by subtopic", () => {
    const rows = [
      r("rc1", "Reading Comprehension", "Inferential", "p1", { contextLen: 1500 }),
      r("rc2", "Reading Comprehension", "Literal", "p1", { contextLen: 1500 }),
      r("rc3", "Reading Comprehension", "Inferential", "p1", { contextLen: 1500 }),
    ];
    const out = orderEnglishBlocks(rows).map((x) => x.id);
    expect(out).toEqual(["rc1", "rc2", "rc3"]);
  });

  it("its own output passes the audit", () => {
    const rows = [
      r("a", "Vocabulary", "Synonyms", "s1"),
      r("b", "Vocabulary", "Antonyms", "s2"),
      r("c", "Vocabulary", "Synonyms", "s1"),
      r("d", "Vocabulary", "Antonyms", "s2"),
    ];
    const sizes = new Map([["s1", 2], ["s2", 2]]);
    expect(auditEnglishSection(rows, sizes).some((v) => v.rule === "R5-scattered-set")).toBe(true);
    expect(auditEnglishSection(orderEnglishBlocks(rows), sizes)).toEqual([]);
  });

  it("is a permutation of its input", () => {
    const rows = [
      r("a", "Vocabulary", "Synonyms", "s1"),
      r("b", "Grammar", "Tense", "s2"),
      r("c", "Vocabulary", "Antonyms", "s3"),
    ];
    expect(orderEnglishBlocks(rows).map((x) => x.id).sort()).toEqual(["a", "b", "c"]);
  });
});

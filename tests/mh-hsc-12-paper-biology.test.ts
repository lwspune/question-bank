import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import { BIOLOGY_GRAMMAR as G, PHYSICS_GRAMMAR, grammarFor, HSC_BIOLOGY_CHAPTERS } from "../scripts/mh-hsc-12-pyq/paper/lib";
import { papersFor } from "../scripts/mh-hsc-12-pyq/paper/config";

/**
 * The printed MH HSC Class-12 BIOLOGY paper (subject code 56), measured off the
 * March 2024 print (J-885) and the same on all five English sittings the board
 * publishes:
 *
 *   Q.1  (i)-(x)     10 MCQ    1 mark   all compulsory
 *   Q.2  (i)-(viii)   8 VSA    1 mark   all compulsory
 *   Q.3-14           12 short  2 marks  any 8
 *   Q.15-26          12 short  3 marks  any 8
 *   Q.27-31           5 long   4 marks  any 3
 *
 * The Physics shape. No Biology board row existed before this lane, so there is
 * no shipped spelling to match and the Physics one (`Q. 1(i)`) is used.
 */
describe("BIOLOGY_GRAMMAR — the printed shape", () => {
  it("is 47 items, 98 printed marks against a Max of 70", () => {
    expect(G.expectedRefs).toHaveLength(47);
    expect(new Set(G.expectedRefs).size).toBe(47);
    expect(G.expectedRefs.reduce((n, r) => n + (G.sectionOf(r)?.marks ?? 0), 0)).toBe(98);
  });

  it("spells refs the Physics way", () => {
    expect(G.expectedRefs[0]).toBe("Q. 1(i)");
    expect(G.expectedRefs[10]).toBe("Q. 2(i)");
    expect(G.expectedRefs.at(-1)).toBe("Q. 31");
    expect(G.expectedRefs).toEqual(PHYSICS_GRAMMAR.expectedRefs);
  });

  it("puts Q.1 in Section A as MCQ and Q.27 in Section D at 4 marks", () => {
    expect(G.sectionOf("Q. 1(iv)")).toMatchObject({ section: "A", marks: 1, format: "mcq" });
    expect(G.sectionOf("Q. 27")).toMatchObject({ section: "D", marks: 4 });
  });
});

describe("Biology chapters", () => {
  const taxonomy = JSON.parse(
    readFileSync(join(__dirname, "../scripts/mh-hsc-12-pyq/paper/data/biology-taxonomy.json"), "utf8"),
  ) as { chapters: { name: string }[] };

  it("are exactly the 15 seeded textbook chapters", () => {
    expect([...HSC_BIOLOGY_CHAPTERS].sort()).toEqual(taxonomy.chapters.map((c) => c.name).sort());
  });

  it("accept a Biology chapter and reject a Chemistry one", () => {
    expect(G.validateChapter("Biotechnology")).toBe("Biotechnology");
    expect(() => G.validateChapter("Chemical Kinetics")).toThrow();
  });

  it("routes Biology to its own grammar", () => {
    expect(grammarFor("Biology")).toBe(G);
  });
});

describe("Biology papers", () => {
  const papers = papersFor("Biology");

  it("are the five English sittings, dated by their covers", () => {
    expect(papers.map((p) => [p.id, p.year, p.month, p.paperCode])).toEqual([
      ["bio-mar-2024", 2024, "March", "J-885"],
      ["bio-jul-2024", 2024, "July", "J-197"],
      ["bio-jul-2025", 2025, "July", "J-410"],
      ["bio-feb-2026", 2026, "February", "J-189"],
      ["bio-jun-2026", 2026, "June", "J-297"],
    ]);
  });

  it("each has its own source file", () => {
    expect(papers.map((p) => p.sourceFile)).toEqual([
      "MH_HSC_12_Biology_PYQ__2024_March.pdf",
      "MH_HSC_12_Biology_PYQ__2024_July.pdf",
      "MH_HSC_12_Biology_PYQ__2025_July.pdf",
      "MH_HSC_12_Biology_PYQ__2026_February.pdf",
      "MH_HSC_12_Biology_PYQ__2026_June.pdf",
    ]);
  });

  /** publicPyqNote publishes a note only under 48 characters; real notes are
   *  <=38 or >=93 with nothing between, so a long template must clear 93. */
  it("carries a provenance note long enough to stay out of the 39-92 gap", () => {
    for (const p of papers) expect(p.note.length).toBeGreaterThanOrEqual(93);
  });
});

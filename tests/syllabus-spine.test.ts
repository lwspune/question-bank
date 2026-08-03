import { describe, expect, it } from "vitest";
import {
  BOOK_OF_EXAM,
  buildAlignmentRows,
  dominantSbByChapter,
  sbBookOrder,
  parseCoveredRef,
  splitCoveredBy,
  splitPyqCount,
  SPINE,
} from "../src/lib/syllabus/summary";

describe("splitPyqCount", () => {
  it("pulls the PYQ count out of an exam-spine concept name", () => {
    expect(splitPyqCount("Diazonium Salts (12 PYQ)")).toEqual({ name: "Diazonium Salts", pyq: 12 });
  });

  it("leaves a book-spine name alone and reports zero", () => {
    // NCERT and State Board rows carry no count; they must not be mangled.
    expect(splitPyqCount("Nature of Matter")).toEqual({ name: "Nature of Matter", pyq: 0 });
  });

  it("does not treat a parenthetical that is not a PYQ count as one", () => {
    expect(splitPyqCount("Nature of Oxides (Acidic, Basic, Amphoteric)")).toEqual({
      name: "Nature of Oxides (Acidic, Basic, Amphoteric)",
      pyq: 0,
    });
  });
});

describe("parseCoveredRef", () => {
  it("reads an explicit year prefix", () => {
    expect(parseCoveredRef("XII:4.11.9", 11)).toEqual({ cls: 12, no: "4.11.9" });
    expect(parseCoveredRef("XI:2.7", 12)).toEqual({ cls: 11, no: "2.7" });
  });

  it("falls back to the row's own year when the ref carries none", () => {
    expect(parseCoveredRef("11.4", 12)).toEqual({ cls: 12, no: "11.4" });
  });

  it("tolerates surrounding whitespace from a comma-separated list", () => {
    expect(parseCoveredRef("  XI:9.7.1 ", 12)).toEqual({ cls: 11, no: "9.7.1" });
  });
});

describe("splitCoveredBy", () => {
  it("splits a multi-section pointer and drops empties", () => {
    expect(splitCoveredBy("1.2.1, 1.2.2, 1.2.3")).toEqual(["1.2.1", "1.2.2", "1.2.3"]);
    expect(splitCoveredBy("12.7, XII:4.11.9")).toEqual(["12.7", "XII:4.11.9"]);
  });

  it("returns nothing for an empty pointer, which is how a gap is stored", () => {
    expect(splitCoveredBy("")).toEqual([]);
    expect(splitCoveredBy(" , ")).toEqual([]);
  });
});

describe("BOOK_OF_EXAM", () => {
  it("maps an exam column on an exam-spine row to the book its refs point into", () => {
    // The bug this prevents: resolving an NCERT ref against the State Board book,
    // which renders NCERT 7.4 (Alcohols) as State Board Ch.7 (Groups 16, 17, 18).
    expect(BOOK_OF_EXAM["CBSE Class 12"]).toBe(SPINE.ncert);
    expect(BOOK_OF_EXAM["MH State Board"]).toBe(SPINE.stateBoard);
  });
});

describe("dominantSbByChapter", () => {
  const row = (chapterName: string, pyq: number, labels: [number, string][]) => ({
    chapterName,
    pyq,
    refs: labels.map(([cls, chapterLabel]) => ({ cls, no: "1.1", chapterLabel })),
  });

  it("picks the book chapter holding most of an exam chapter's PYQ", () => {
    const d = dominantSbByChapter([
      row("Hydrocarbons", 47, [[11, "Std XI Ch.15 Hydrocarbons"]]),
      row("Hydrocarbons", 6, [[11, "Std XI Ch.14 Basic Principles"]]),
    ]);
    expect(d.get("Hydrocarbons")?.label).toBe("Std XI Ch.15 Hydrocarbons");
    expect(d.get("Hydrocarbons")?.pyq).toBe(47);
  });

  it("counts a straddling subtopic against BOTH chapters, not a split share", () => {
    // The question really does need both chapters; halving the count would
    // understate each and could hand dominance to the wrong one.
    const d = dominantSbByChapter([
      row("X", 10, [
        [11, "Std XI Ch.2 Analytical"],
        [12, "Std XII Ch.8 Transition"],
      ]),
      row("X", 4, [[12, "Std XII Ch.8 Transition"]]),
    ]);
    expect(d.get("X")?.label).toBe("Std XII Ch.8 Transition");
    expect(d.get("X")?.pyq).toBe(14);
  });

  it("counts a chapter once when a row points at two sections of it", () => {
    const d = dominantSbByChapter([
      {
        chapterName: "X",
        pyq: 9,
        refs: [
          { cls: 11, no: "5.1", chapterLabel: "Std XI Ch.5 Bonding" },
          { cls: 11, no: "5.3", chapterLabel: "Std XI Ch.5 Bonding" },
        ],
      },
    ]);
    expect(d.get("X")?.pyq).toBe(9);
  });

  it("breaks a tie to the EARLIER chapter so the key does not depend on row order", () => {
    const forward = dominantSbByChapter([
      row("X", 5, [[12, "Std XII Ch.3 Ionic"]]),
      row("X", 5, [[11, "Std XI Ch.12 Equilibrium"]]),
    ]);
    const reversed = dominantSbByChapter([
      row("X", 5, [[11, "Std XI Ch.12 Equilibrium"]]),
      row("X", 5, [[12, "Std XII Ch.3 Ionic"]]),
    ]);
    expect(forward.get("X")?.label).toBe("Std XI Ch.12 Equilibrium");
    expect(reversed.get("X")?.label).toBe(forward.get("X")?.label);
  });

  it("omits a chapter with no pointer into the book at all", () => {
    // Organic Reaction Mechanisms: it has no place in book order, so callers
    // sort it last rather than guessing a position for it.
    const d = dominantSbByChapter([row("Orphan", 10, [])]);
    expect(d.has("Orphan")).toBe(false);
  });

  it("orders Std XI before Std XII regardless of chapter number", () => {
    const d = dominantSbByChapter([
      row("A", 1, [[12, "Std XII Ch.2 Solutions"]]),
      row("B", 1, [[11, "Std XI Ch.15 Hydrocarbons"]]),
    ]);
    expect(sbBookOrder(d.get("B"))).toBeLessThan(sbBookOrder(d.get("A")));
  });

  it("sorts a chapter with no book home last", () => {
    expect(sbBookOrder(undefined)).toBeGreaterThan(sbBookOrder({ label: "z", cls: 12, chapterNo: 99, pyq: 0 }));
  });
});

describe("buildAlignmentRows", () => {
  const anchor = (sectionNo: string, concept: string, cls = 11, chapterNo = 5) => ({
    id: `sb-${cls}-${sectionNo}`, cls, chapterNo, chapterName: `Ch${chapterNo}`, sectionNo, concept,
  });
  const side = (id: string, label: string, extra: Record<string, unknown> = {}) => ({
    id, label, chapterLabel: "someChapter", ...extra,
  });
  const ptr = (spine: "ncert" | "jee", s: ReturnType<typeof side>, sectionNo: string, cls = 11) => ({
    spine, side: s, cls, sectionNo,
  });

  it("pairs NCERT and JEE only when the pairing was AUTHORED", () => {
    const n = side("n1", "4.2 Ionic Bond");
    const j = side("j1", "Ionic Bonding");
    const rows = buildAlignmentRows(
      [anchor("5.2", "Kossel and Lewis")],
      [ptr("ncert", n, "5.2"), ptr("jee", j, "5.2")],
      new Set(["j1|n1"]),
    );
    expect(rows).toHaveLength(1);
    expect([rows[0].ncert?.id, rows[0].jee?.id]).toEqual(["n1", "j1"]);
  });

  it("NEVER fabricates: co-located but unauthored pairs get separate rows", () => {
    // The measured risk this guards: joining NCERT to JEE through a shared State
    // Board section invents 39 pairings the author never made. Repeating the
    // anchor is the honest alternative.
    const rows = buildAlignmentRows(
      [anchor("5.2", "Kossel and Lewis")],
      [ptr("ncert", side("n1", "N"), "5.2"), ptr("jee", side("j1", "J"), "5.2")],
      new Set(),
    );
    expect(rows).toHaveLength(2);
    expect(rows.filter((r) => r.ncert && r.jee)).toHaveLength(0);
    expect(rows.map((r) => r.ncert?.id ?? r.jee?.id).sort()).toEqual(["j1", "n1"]);
  });

  it("lets one NCERT section pair with SEVERAL JEE subtopics", () => {
    const rows = buildAlignmentRows(
      [anchor("11.4", "Alcohols and Phenols", 12, 11)],
      [
        ptr("ncert", side("n1", "7.4"), "11.4", 12),
        ptr("jee", side("j1", "Phenols"), "11.4", 12),
        ptr("jee", side("j2", "Alcohol Reactions"), "11.4", 12),
      ],
      new Set(["j1|n1", "j2|n1"]),
    );
    expect(rows).toHaveLength(2);
    expect(rows.every((r) => r.ncert?.id === "n1")).toBe(true);
  });

  it("rolls a DEEPER pointer up to its 1.x parent", () => {
    const rows = buildAlignmentRows(
      [anchor("5.8", "Resonance")],
      [ptr("jee", side("j1", "Ionic Bonding"), "5.8.7")],
      new Set(),
    );
    expect(rows).toHaveLength(1);
    expect(rows[0].anchor.sectionNo).toBe("5.8");
    expect(rows[0].jee?.id).toBe("j1");
  });

  it("counts a source once per anchor even when it points at several sub-sections", () => {
    // 4.7 MO Theory maps to 5.5, 5.5.1 .. 5.5.5 — all one section at 1.x grain,
    // so it must not become six identical rows with the PYQ count repeated.
    const rows = buildAlignmentRows(
      [anchor("5.5", "Molecular orbital theory")],
      ["5.5", "5.5.1", "5.5.2", "5.5.3"].map((sec) => ptr("jee", side("j1", "MO Theory"), sec)),
      new Set(),
    );
    expect(rows).toHaveLength(1);
  });

  it("keeps an anchor nothing points at — that is the skip list", () => {
    const rows = buildAlignmentRows([anchor("2.8", "Use of graph")], [], new Set());
    expect(rows).toHaveLength(1);
    expect([rows[0].ncert, rows[0].jee]).toEqual([null, null]);
  });

  it("ignores a pointer whose target is not an anchor of this book", () => {
    const rows = buildAlignmentRows(
      [anchor("5.1", "Introduction")],
      [ptr("jee", side("j1", "Elsewhere"), "9.9")],
      new Set(),
    );
    expect(rows).toHaveLength(1);
    expect(rows[0].jee).toBeNull();
  });

  it("does not let a Std XI pointer land on the identically numbered Std XII section", () => {
    const rows = buildAlignmentRows(
      [anchor("1.2", "SB XI 1.2", 11, 1), anchor("1.2", "SB XII 1.2", 12, 1)],
      [ptr("jee", side("j1", "J"), "1.2", 12)],
      new Set(),
    );
    expect(rows.find((r) => r.anchor.cls === 11)!.jee).toBeNull();
    expect(rows.find((r) => r.anchor.cls === 12)!.jee?.id).toBe("j1");
  });

  it("orders along the book: Std XI first, then chapter, then section numerically", () => {
    const rows = buildAlignmentRows(
      [anchor("5.10", "j", 11, 5), anchor("5.9", "i", 11, 5), anchor("1.1", "a", 12, 1)],
      [], new Set(),
    );
    expect(rows.map((r) => `${r.anchor.cls}:${r.anchor.sectionNo}`)).toEqual(["11:5.9", "11:5.10", "12:1.1"]);
  });
});

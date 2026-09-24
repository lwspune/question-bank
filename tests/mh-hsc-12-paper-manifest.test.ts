import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import {
  PAPERS,
  requirePaper,
  papersFor,
  SOURCE_ROOT,
  PHYSICS_SOURCE_ROOT,
} from "../scripts/mh-hsc-12-pyq/paper/config";
import { EXPECTED_REFS, normaliseRef, grammarFor } from "../scripts/mh-hsc-12-pyq/paper/lib";

const ALL = Object.values(PAPERS);
const MATHS = papersFor("Mathematics");
const PHYSICS = papersFor("Physics");

describe("the manifest, across all three subjects", () => {
  it("holds twenty papers with unique ids, source files and (subject, code) pairs", () => {
    expect(ALL).toHaveLength(20);
    expect(new Set(ALL.map((p) => p.id)).size).toBe(20);
    // sourceFile is the dedup + rollback key — a collision would make one
    // sitting un-rollbackable without taking the other with it.
    expect(new Set(ALL.map((p) => p.sourceFile)).size).toBe(20);
  });

  it("names a (subject, year, month) sitting at most once", () => {
    // Scoped by SUBJECT: Maths and Physics both sat in June 2026, and those are
    // two different papers, not a duplicate.
    const sittings = ALL.map((p) => `${p.subject}-${p.year}-${p.month}`);
    expect(new Set(sittings).size).toBe(20);
  });

  it("keeps the printed code unique within a subject", () => {
    // The printed code is the INDEPENDENT check on (year, month): if two
    // sittings share a code, one of the covers was misread. The Feb-2023
    // reproduction has no code at all, so it is excluded rather than compared.
    for (const group of [MATHS, PHYSICS]) {
      const codes = group.map((p) => p.paperCode).filter((c) => c !== "n/a");
      expect(new Set(codes).size).toBe(codes.length);
    }
  });

  it("gives every paper a grammar this lane can resolve", () => {
    for (const p of ALL) expect(() => grammarFor(p.subject), p.id).not.toThrow();
  });
});

describe("Maths — six papers", () => {
  it("holds six", () => {
    expect(MATHS).toHaveLength(6);
  });

  it("records the two known misnamed files as February sittings", () => {
    // Both PDFs are named "March …"; both covers say February. If someone
    // "fixes" these back to March to match the filenames, this fails.
    expect(requirePaper("feb-2026").month).toBe("February");
    expect(requirePaper("feb-2026").pdf).toMatch(/March 2026 paper\.pdf$/);
    expect(requirePaper("feb-2025").month).toBe("February");
    expect(requirePaper("feb-2025").pdf).toMatch(/March 2025 paper new\.pdf$/);
  });

  it("derives sourceFile from the COVER's year+month, not the filename", () => {
    expect(requirePaper("feb-2026").sourceFile).toBe("MH_HSC_12_Maths_PYQ__2026_February.pdf");
    expect(requirePaper("feb-2025").sourceFile).toBe("MH_HSC_12_Maths_PYQ__2025_February.pdf");
  });

  it("marks exactly the two sittings the compilation already covered", () => {
    const reconcile = MATHS.filter((p) => p.bankStatus === "reconcile")
      .map((p) => p.id)
      .sort();
    expect(reconcile).toEqual(["feb-2025", "mar-2024"]);
  });
});

/**
 * Physics, added 2026-09-23. Seven papers, and FOUR of their seven filenames
 * are wrong about their own month — in two different directions. Every entry's
 * year/month is read off the printed cover.
 */
describe("Physics — seven papers, four of them misnamed", () => {
  it("holds seven", () => {
    expect(PHYSICS).toHaveLength(7);
  });

  it("records all three 'Mar' files as February sittings", () => {
    for (const [id, file] of [
      ["phy-feb-2026", /Phy Mar 2026\.pdf$/],
      ["phy-feb-2025", /Phy Mar 2025\.pdf$/],
      ["phy-feb-2024", /Phy Mar 2024\.pdf$/],
    ] as const) {
      expect(requirePaper(id).month, id).toBe("February");
      expect(requirePaper(id).pdf, id).toMatch(file);
    }
  });

  it("records 'Phy June 2024' as the JULY supplementary", () => {
    // Cover says 2024 VII 20 and the embedded XPS path says "MSB (JULY 2024)".
    // This is the misnaming that runs the other way: a July paper called June.
    expect(requirePaper("phy-jul-2024").month).toBe("July");
    expect(requirePaper("phy-jul-2024").pdf).toMatch(/Phy June 2024\.pdf$/);
  });

  it("keeps the two genuinely-June files as June", () => {
    // Not every "June" filename is wrong, which is why the cover is read every
    // time rather than a blanket rule being applied to the name.
    expect(requirePaper("phy-jun-2025").month).toBe("June");
    expect(requirePaper("phy-jun-2026").month).toBe("June");
  });

  it("derives sourceFile from the COVER's year+month, not the filename", () => {
    expect(requirePaper("phy-jul-2024").sourceFile).toBe("MH_HSC_12_Physics_PYQ__2024_July.pdf");
    expect(requirePaper("phy-feb-2026").sourceFile).toBe("MH_HSC_12_Physics_PYQ__2026_February.pdf");
  });

  it("reads every paper from the Physics source tree", () => {
    for (const p of PHYSICS) expect(p.pdf.startsWith(PHYSICS_SOURCE_ROOT), p.id).toBe(true);
  });

  it("claims no figures anywhere, which is a measurement and not an assumption", () => {
    // Verified structurally on all seven: every large vector object is page
    // furniture and the only rasters are sliced math fragments. Every "draw a
    // neat diagram" on a Physics paper instructs the STUDENT.
    for (const p of PHYSICS) expect(p.figureRefs, p.id).toEqual([]);
  });

  /**
   * `publicPyqNote` publishes a `pyq_note` to students only when it is under 48
   * chars after bracket-stripping. That cap is safe only because real notes
   * measure <=38 or >=93 with nothing between; `npm run audit:provenance`
   * reports anything in the 39-92 gap because it would lose its sitting id
   * silently. A note is data, so this is asserted rather than eyeballed.
   */
  it("keeps every note clear of the 39-92 provenance gap", () => {
    for (const p of PHYSICS) {
      const n = p.note.replace(/\[[^\]]*\]/g, "").trim().length;
      expect(n <= 38 || n >= 93, `${p.id}: note is ${n} chars`).toBe(true);
    }
  });

  it("flags the Feb-2023 reproduction and nothing else", () => {
    const flagged = PHYSICS.filter((p) => p.thirdParty).map((p) => p.id);
    expect(flagged).toEqual(["phy-feb-2023"]);
    // Names the actual source. The footer of every page carries the logo, so
    // this is a fact off the artifact rather than a category guess.
    expect(requirePaper("phy-feb-2023").thirdParty!.reason).toMatch(/collegedunia/);
    expect(requirePaper("phy-feb-2023").thirdParty!.reason).toMatch(/not a board print/);
    // No board cover means no printed code to cross-check the sitting against.
    expect(requirePaper("phy-feb-2023").paperCode).toBe("n/a");
  });

  it("marks exactly the three sittings the compilation already covered", () => {
    const reconcile = PHYSICS.filter((p) => p.bankStatus === "reconcile")
      .map((p) => p.id)
      .sort();
    expect(reconcile).toEqual(["phy-feb-2023", "phy-feb-2024", "phy-feb-2025"]);
  });

  it("records the Feb-2023 row count as OVER the printed paper, and why", () => {
    // 48 rows against 47 printed items — the count that had no explanation when
    // the manifest was written. The census on 2026-09-24 resolved it exactly:
    //   47 printed − 2 never captured (Q.1(ii), Q.5) + 3 split-item rows = 48.
    // So the excess was never a duplicate, it is Section D's three two-part
    // items carried as six rows. Asserted as an identity rather than an
    // inequality, because "more than 47" was the symptom and this is the cause.
    const printed = grammarFor("Physics").expectedRefs.length;
    const p = requirePaper("phy-feb-2023");
    expect(p.bankRows).toBe(48);
    expect(printed - p.knownMissingRefs!.length + p.splitRows!).toBe(p.bankRows);
  });
});

describe("reconciliation bookkeeping", () => {
  it("gives every reconcile paper a measured row count", () => {
    for (const p of ALL.filter((x) => x.bankStatus === "reconcile")) {
      expect(typeof p.bankRows, p.id).toBe("number");
    }
  });

  it("accounts for the whole printed paper wherever the census was taken", () => {
    // Where a per-ref census exists, the books must balance exactly:
    //   rows already in the bank + refs it never captured
    //     = printed items + rows that are a SECOND half of a split item.
    //
    // The `splitRows` term is not a fudge factor. It was added when phy-feb-2023
    // falsified the earlier `rows + missing = printed` form by holding 48 rows
    // against a 47-item paper — three of its Section D items are carried as two
    // rows each. Widening the assertion to "approximately" would have hidden
    // exactly the miscount this exists to catch, so the extra rows are DECLARED
    // and the equality stays exact.
    //
    // CHEMISTRY IS EXCLUDED FROM THE EXACT FORM, and the reason is that the two
    // terms are measured on DIFFERENT AXES there. For Maths and Physics the rows
    // already in the bank came from a compilation that splits an item exactly
    // where this lane does, so `bankRows` and `splitRows` count the same thing.
    // The Chemistry compilation does not: it splits with letters (`Q.4.a`,
    // `Q.21.b`) and splits items this lane keeps whole, and keeps whole items
    // this lane splits. Its 52 rows for Feb-2025 cover 43 printed items, so
    // adding MY `splitRows` to ITS row count compares nothing meaningful.
    // Loosening the equality to "approximately" would destroy it for the two
    // subjects where it does bite, so Chemistry gets the weaker check below
    // rather than a weaker check for everyone.
    for (const p of ALL.filter((x) => x.knownMissingRefs && x.subject !== "Chemistry")) {
      const printed = grammarFor(p.subject).expectedRefs.length;
      expect(p.bankRows! + p.knownMissingRefs!.length, p.id).toBe(printed + (p.splitRows ?? 0));
    }
  });

  it("measures the Chemistry census at the PRINTED-ITEM level", () => {
    // What still has to be true for Chemistry: every ref the census names is a
    // real printed item of that paper, the census is not empty (a reconcile
    // paper with nothing missing would not need one), and it cannot claim more
    // missing items than the paper prints.
    const chem = ALL.filter((p) => p.subject === "Chemistry" && p.knownMissingRefs);
    expect(chem.length, "no Chemistry census found — has the lane changed?").toBe(3);
    for (const p of chem) {
      const g = grammarFor(p.subject);
      const printedParents = new Set(g.expectedRefs.map((r) => r.replace(/\(.*$/, "")));
      for (const ref of p.knownMissingRefs!) {
        expect(printedParents.has(ref.replace(/\(.*$/, "")), `${p.id}: ${ref}`).toBe(true);
      }
      expect(p.knownMissingRefs!.length, p.id).toBeLessThan(g.expectedRefs.length);
      expect(p.bankRows!, p.id).toBeGreaterThan(0);
    }
  });

  it("declares splitRows on exactly the papers that split an item", () => {
    // A stale splitRows would silently absorb a real shortfall, both in the
    // census above and in flip-public's row-count gate, so it is pinned by id
    // and by value rather than merely being allowed to exist.
    const withSplits = ALL.filter((p) => p.splitRows)
      .map((p) => `${p.id}:${p.splitRows}`)
      .sort();
    expect(withSplits).toEqual([
      // Chemistry splits an order of magnitude more often than Physics: its
      // papers set MIXED-BAG items whose parts are drawn from different
      // chapters (Feb-2026 Q.27 is isotonic solutions + molecularity + Hess),
      // and the rule -- split only across CHAPTERS -- fires on 19 of 47 items.
      "chem-feb-2024:9",
      "chem-feb-2025:7",
      "chem-feb-2026:20",
      "chem-jul-2024:7",
      "chem-jul-2025:5",
      "chem-jun-2026:7",
      "chem-mar-2023:10",
      "phy-feb-2023:3",
      "phy-feb-2024:1",
      "phy-jun-2026:1",
    ]);
  });

  it("names what absorbed every declared absorbed ref", () => {
    // `absorbedRefs` shortens the count flip-public expects, so an entry with a
    // vague `into` would let a genuine commit failure pass as a known reuse.
    // Each one has to say WHAT swallowed the row.
    for (const p of ALL) {
      for (const a of p.absorbedRefs ?? []) {
        const g = grammarFor(p.subject);
        expect(g.normaliseRef(a.ref), `${p.id}: ${a.ref}`).toBe(a.ref);
        expect(a.into.length, `${p.id}: ${a.ref} has a thin 'into'`).toBeGreaterThan(20);
      }
    }
  });

  it("leaves new sittings without reconciliation bookkeeping", () => {
    for (const p of ALL.filter((x) => x.bankStatus === "new")) {
      expect(p.bankRows, p.id).toBeUndefined();
    }
  });

  it("states every known-missing ref in its own subject's canonical form", () => {
    for (const p of ALL) {
      const g = grammarFor(p.subject);
      for (const ref of p.knownMissingRefs ?? []) {
        expect(g.normaliseRef(ref), `${p.id}: ${ref}`).toBe(ref);
      }
    }
  });
});

describe("figure manifest", () => {
  it("lists only refs that exist on the paper", () => {
    for (const p of ALL) {
      const g = grammarFor(p.subject);
      for (const ref of p.figureRefs) {
        expect(g.normaliseRef(ref), `${p.id}: ${ref}`).toBe(ref);
      }
    }
  });

  it("claims a figure on exactly the sittings that print one", () => {
    // Feb/Jun 2026 say "CONSTRUCT the switching circuit" — the student draws it,
    // so there is nothing to crop. Listing a ref here that has no printed figure
    // would send the crop pass hunting for one that isn't there.
    //
    // jul-2024 is here because fig_bounds.py found its Q.27 circuit; a grep over
    // the stems did NOT — it enumerated "switching circuit"/"given circuit" and
    // that stem says "the following circuit". Detection, not prose, is the
    // source of truth for this list.
    const withFigures = ALL.filter((p) => p.figureRefs.length)
      .map((p) => p.id)
      .sort();
    //
    // CHEMISTRY brought a second figure genre. Physics has none at all, and the
    // Maths ones are switching circuits; the Chemistry ones are ORGANIC
    // STRUCTURES that cannot be written in LaTeX at all, because `\ce{}` and
    // chemfig are not loaded in this stack. Two of them are the
    // OPTIONS-ARE-THE-FIGURE shape, where the stem reads complete but the four
    // choices are drawings.
    //
    // Deliberately NOT listed: chem-feb-2025 and chem-feb-2024, whose drawn
    // items are already in the bank from the compilation WITH images attached.
    // Claiming them here would send the attach pass at shipped rows.
    expect(withFigures).toEqual([
      "chem-feb-2026",
      "chem-jul-2024",
      "chem-jul-2025",
      "chem-mar-2023",
      "feb-2025",
      "jul-2024",
      "jul-2025",
      "mar-2024",
    ]);
  });

  it("puts every Maths figure on a Mathematical Logic question", () => {
    // Switching circuits are the ONLY figure genre in the Maths corpus — 5 of 5
    // in the shipped bank, 4 of 4 here. A figure claimed anywhere else is a
    // detection artefact until a human says otherwise.
    for (const p of MATHS) {
      for (const ref of p.figureRefs) {
        expect(["Q. 15", "Q. 27"], `${p.id}: ${ref}`).toContain(ref);
      }
    }
  });
});

describe("the Maths refs alias still resolves", () => {
  it("is the Mathematics grammar, unchanged by the Physics split", () => {
    expect(EXPECTED_REFS).toHaveLength(44);
    expect(normaliseRef("Q. 1. iii.")).toBe("Q. 1. (iii)");
  });
});

/**
 * LOCAL-ONLY, and it has to be — `pdf` is an absolute path into a source tree on
 * the authoring machine, so on a CI runner this asserts the existence of a
 * Windows path on Ubuntu and can NEVER pass. It failed the first push that
 * carried it (2026-09-20).
 *
 * Skipped rather than deleted: where the source tree IS present this is the
 * only check that catches a manifest pointing at a moved or renamed PDF, which
 * is the defect it was written for. Everything above is a pure manifest check
 * and runs everywhere.
 *
 * Guarded per subject on its own source root, not on `process.env.CI`: the
 * property that matters is "are these source PDFs reachable from here", and a
 * machine without them is not always a CI runner. Guarding both subjects on one
 * root would silently skip Physics on a machine that has only the Maths tree.
 */
describe("source files on disk", () => {
  it.skipIf(!existsSync(SOURCE_ROOT))("points every Maths entry at a file that exists", () => {
    for (const p of MATHS) expect(existsSync(p.pdf), `${p.id} -> ${p.pdf}`).toBe(true);
  });

  it.skipIf(!existsSync(PHYSICS_SOURCE_ROOT))("points every Physics entry at a file that exists", () => {
    for (const p of PHYSICS) expect(existsSync(p.pdf), `${p.id} -> ${p.pdf}`).toBe(true);
  });
});

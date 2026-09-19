import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { PAPERS, requirePaper } from "../scripts/mh-hsc-12-pyq/paper/config";
import { EXPECTED_REFS, normaliseRef } from "../scripts/mh-hsc-12-pyq/paper/lib";

const ALL = Object.values(PAPERS);

describe("the six-paper manifest", () => {
  it("holds six papers with unique ids, source files and paper codes", () => {
    expect(ALL).toHaveLength(6);
    expect(new Set(ALL.map((p) => p.id)).size).toBe(6);
    // sourceFile is the dedup + rollback key — a collision would make one
    // sitting un-rollbackable without taking the other with it.
    expect(new Set(ALL.map((p) => p.sourceFile)).size).toBe(6);
    // The printed code is the INDEPENDENT check on (year, month): if two
    // sittings share a code, one of the covers was misread.
    expect(new Set(ALL.map((p) => p.paperCode)).size).toBe(6);
  });

  it("names a (year, month) pair at most once", () => {
    const sittings = ALL.map((p) => `${p.year}-${p.month}`);
    expect(new Set(sittings).size).toBe(6);
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

  it("points every entry at a file that exists", () => {
    for (const p of ALL) expect(existsSync(p.pdf), `${p.id} -> ${p.pdf}`).toBe(true);
  });
});

describe("reconciliation bookkeeping", () => {
  it("marks exactly the two sittings the compilation already covered", () => {
    const reconcile = ALL.filter((p) => p.bankStatus === "reconcile").map((p) => p.id).sort();
    expect(reconcile).toEqual(["feb-2025", "mar-2024"]);
  });

  it("gives every reconcile paper a measured row count and a missing-ref list", () => {
    for (const p of ALL.filter((x) => x.bankStatus === "reconcile")) {
      expect(typeof p.bankRows, p.id).toBe("number");
      expect(Array.isArray(p.knownMissingRefs), p.id).toBe(true);
      // bankRows + what's missing must account for the whole printed paper.
      // If a later measurement breaks this, the census was wrong, not the paper.
      expect(p.bankRows! + p.knownMissingRefs!.length, p.id).toBe(EXPECTED_REFS.length);
    }
  });

  it("leaves new sittings without reconciliation bookkeeping", () => {
    for (const p of ALL.filter((x) => x.bankStatus === "new")) {
      expect(p.bankRows, p.id).toBeUndefined();
    }
  });

  it("states every known-missing ref in canonical form", () => {
    for (const p of ALL) {
      for (const ref of p.knownMissingRefs ?? []) {
        expect(normaliseRef(ref), `${p.id}: ${ref}`).toBe(ref);
      }
    }
  });
});

describe("figure manifest", () => {
  it("lists only refs that exist on the paper", () => {
    for (const p of ALL) {
      for (const ref of p.figureRefs) {
        expect(normaliseRef(ref), `${p.id}: ${ref}`).toBe(ref);
      }
    }
  });

  it("claims a figure on exactly the four sittings that print one", () => {
    // Feb/Jun 2026 say "CONSTRUCT the switching circuit" — the student draws it,
    // so there is nothing to crop. Listing a ref here that has no printed figure
    // would send the crop pass hunting for one that isn't there.
    //
    // jul-2024 is here because fig_bounds.py found its Q.27 circuit; a grep over
    // the stems did NOT — it enumerated "switching circuit"/"given circuit" and
    // that stem says "the following circuit". Detection, not prose, is the
    // source of truth for this list.
    const withFigures = ALL.filter((p) => p.figureRefs.length).map((p) => p.id).sort();
    expect(withFigures).toEqual(["feb-2025", "jul-2024", "jul-2025", "mar-2024"]);
  });

  it("puts every figure on a Mathematical Logic question", () => {
    // Switching circuits are the ONLY figure genre in this corpus — 5 of 5 in
    // the shipped bank, 4 of 4 here. A figure claimed anywhere else is a
    // detection artefact until a human says otherwise.
    for (const p of ALL) {
      for (const ref of p.figureRefs) {
        expect(["Q. 15", "Q. 27"], `${p.id}: ${ref}`).toContain(ref);
      }
    }
  });
});

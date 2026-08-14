import { describe, expect, it } from "vitest";
import { renumberRulings, type SpineRow } from "../scripts/lib/renumberRulings";

const row = (sectionNo: string, chapter: string, subtopic: string): SpineRow => ({
  sectionNo,
  chapter,
  subtopic,
});

describe("renumberRulings", () => {
  it("re-points a ref that shifted because an earlier exam grew", () => {
    const oldSpine = [row("MHT-150", "Solutions", "Raoult's Law")];
    const newSpine = [row("MHT-203", "Solutions", "Raoult's Law")];

    const res = renumberRulings(oldSpine, newSpine, [
      { sectionNo: "MHT-150", subtopic: "Raoult's Law" },
    ]);

    expect(res.ok).toBe(true);
    if (res.ok) expect(res.mapping.get("MHT-150")).toBe("MHT-203");
  });

  it("keeps a ref that did not move", () => {
    const spine = [row("JEE-001", "Amines", "Basicity")];
    const res = renumberRulings(spine, spine, [{ sectionNo: "JEE-001", subtopic: "Basicity" }]);
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.mapping.get("JEE-001")).toBe("JEE-001");
  });

  // The reason the pair is (chapter, subtopic) and not the subtopic alone.
  // Chemistry really has six of these — "Isomerism" lives in both Coordination
  // Compounds and Organic Chemistry — so a name-only match is a coin flip.
  it("disambiguates a subtopic name that exists in two chapters", () => {
    const oldSpine = [
      row("JEE-010", "Coordination Compounds", "Isomerism"),
      row("JEE-040", "Organic Chemistry", "Isomerism"),
    ];
    const newSpine = [
      row("JEE-055", "Organic Chemistry", "Isomerism"),
      row("JEE-012", "Coordination Compounds", "Isomerism"),
    ];

    const res = renumberRulings(oldSpine, newSpine, [
      { sectionNo: "JEE-010", subtopic: "Isomerism" },
      { sectionNo: "JEE-040", subtopic: "Isomerism" },
    ]);

    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.mapping.get("JEE-010")).toBe("JEE-012");
      expect(res.mapping.get("JEE-040")).toBe("JEE-055");
    }
  });

  it("refuses when a subtopic has left the bank", () => {
    const res = renumberRulings(
      [row("JEE-007", "Polymers", "Copolymers")],
      [row("JEE-007", "Amines", "Basicity")],
      [{ sectionNo: "JEE-007", subtopic: "Copolymers" }],
    );

    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.problems[0]).toContain("no longer in the bank");
  });

  it("refuses when the file and the snapshot disagree about the ref", () => {
    const res = renumberRulings(
      [row("JEE-007", "Amines", "Basicity")],
      [row("JEE-009", "Amines", "Basicity")],
      [{ sectionNo: "JEE-007", subtopic: "Diazonium Salts" }],
    );

    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.problems[0]).toContain("old spine says");
  });

  it("refuses an unknown ref rather than dropping it", () => {
    const res = renumberRulings([], [row("JEE-001", "Amines", "Basicity")], [
      { sectionNo: "JEE-999", subtopic: "Basicity" },
    ]);

    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.problems[0]).toContain("not in the old spine");
  });

  // A partial renumber leaves some rulings correct and some pointing at a
  // different subtopic, with nothing on the row to tell them apart.
  it("returns no mapping at all when any single ruling fails", () => {
    const oldSpine = [
      row("JEE-001", "Amines", "Basicity"),
      row("JEE-002", "Polymers", "Copolymers"),
    ];
    const newSpine = [row("JEE-001", "Amines", "Basicity")];

    const res = renumberRulings(oldSpine, newSpine, [
      { sectionNo: "JEE-001", subtopic: "Basicity" },
      { sectionNo: "JEE-002", subtopic: "Copolymers" },
    ]);

    expect(res.ok).toBe(false);
  });
});

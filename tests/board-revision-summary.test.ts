/**
 * What a board revision sheet holds, in one line (2026-11-03): the tab's
 * caption and the download box's description. Empty sections are left out,
 * so a Biology sheet never claims "0 formulas".
 */
import { describe, it, expect } from "vitest";
import { revisionSummary } from "@/lib/board/revision/summary";
import type { RevisionSheet } from "@/lib/board/revision/types";

const base: Pick<RevisionSheet, "mostAsked" | "formulas" | "derivations" | "diagrams" | "keyPoints"> = {
  mostAsked: [{ topic: "a", years: [2025] }, { topic: "b", years: [2024] }],
  keyPoints: [{ term: "x", text: "y" }],
  formulas: [{ label: "f", latex: "x" }],
  derivations: [
    { title: "d1", steps: ["a", "b"] },
    { title: "d2", steps: ["a", "b"] },
  ],
  diagrams: [],
};

describe("revisionSummary", () => {
  it("counts each section with its own noun, singular for one", () => {
    expect(revisionSummary(base)).toBe("2 most-asked questions · 1 key point · 1 formula · 2 derivations");
  });

  it("leaves out empty sections", () => {
    expect(revisionSummary({ ...base, formulas: [], derivations: [] })).toBe("2 most-asked questions · 1 key point");
  });

  it("names diagrams when there are any", () => {
    expect(revisionSummary({ ...base, diagrams: [{ title: "t", labels: ["a", "b"] }] })).toMatch(/· 1 diagram$/);
  });
});

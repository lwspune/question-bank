import { describe, it, expect } from "vitest";
import { deriveSummary } from "@/lib/notes/deriveSummary";
import type { ConceptUnit, SubtopicNote } from "@/app/notes/_types";

const concept = (overrides: Partial<ConceptUnit> = {}): ConceptUnit => ({
  slug: "c",
  name: "Concept",
  intuition: "i",
  definition: "d",
  authoredExample: { prompt: "p", steps: ["s"], answer: "a" },
  ...overrides,
});

const note = (concepts: ConceptUnit[]): SubtopicNote => ({
  subtopicName: "Sub",
  title: "Sub",
  oneLineDefinition: "one line",
  whyItMatters: "",
  concepts,
});

describe("deriveSummary", () => {
  it("returns empty arrays for a note with no formulas or traps", () => {
    const out = deriveSummary(note([concept()]));
    expect(out).toEqual({ formulas: [], traps: [] });
  });

  it("extracts a concept's formula with slug, conceptName, label, latex", () => {
    const out = deriveSummary(
      note([
        concept({
          slug: "mean",
          name: "Mean",
          formula: { label: "Arithmetic Mean", latex: "\\bar{x}" },
        }),
      ])
    );
    expect(out.formulas).toEqual([
      { slug: "mean", conceptName: "Mean", label: "Arithmetic Mean", latex: "\\bar{x}" },
    ]);
  });

  it("skips concepts without a formula", () => {
    const out = deriveSummary(
      note([
        concept({ slug: "a", name: "A" }),
        concept({ slug: "b", name: "B", formula: { label: "L", latex: "x" } }),
      ])
    );
    expect(out.formulas.map((f) => f.slug)).toEqual(["b"]);
  });

  it("extracts every trap with slug + conceptName attached", () => {
    const out = deriveSummary(
      note([
        concept({
          slug: "x",
          name: "X",
          traps: [
            { title: "Trap 1", body: "b1" },
            { title: "Trap 2", body: "b2" },
          ],
        }),
      ])
    );
    expect(out.traps).toEqual([
      { slug: "x", conceptName: "X", title: "Trap 1" },
      { slug: "x", conceptName: "X", title: "Trap 2" },
    ]);
  });

  it("contributes nothing to traps when a concept has none", () => {
    const out = deriveSummary(note([concept({ traps: [] }), concept()]));
    expect(out.traps).toEqual([]);
  });

  it("preserves concept order then trap order within a concept", () => {
    const out = deriveSummary(
      note([
        concept({ slug: "a", name: "A", traps: [{ title: "A1", body: "" }] }),
        concept({
          slug: "b",
          name: "B",
          traps: [
            { title: "B1", body: "" },
            { title: "B2", body: "" },
          ],
        }),
      ])
    );
    expect(out.traps.map((t) => t.title)).toEqual(["A1", "B1", "B2"]);
  });

  it("handles a concept carrying both a formula and traps", () => {
    const out = deriveSummary(
      note([
        concept({
          slug: "v",
          name: "Variance",
          formula: { label: "Variance", latex: "\\sigma^2" },
          traps: [{ title: "watch the square", body: "" }],
        }),
      ])
    );
    expect(out.formulas).toHaveLength(1);
    expect(out.traps).toHaveLength(1);
    expect(out.formulas[0].slug).toBe("v");
    expect(out.traps[0].slug).toBe("v");
  });
});

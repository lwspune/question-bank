import { describe, it, expect } from "vitest";
import {
  buildConceptWeightTable,
  type ConceptWeightSubtopicInput,
} from "@/lib/notes/conceptWeight";

const sub = (
  title: string,
  href: string,
  concepts: { slug: string; name: string; count: number }[]
): ConceptWeightSubtopicInput => ({ subtopicTitle: title, subtopicHref: href, concepts });

describe("buildConceptWeightTable", () => {
  it("returns an empty array for no subtopics", () => {
    expect(buildConceptWeightTable([], 100)).toEqual([]);
  });

  it("computes pct as count / chapterTotal, rounded to an integer", () => {
    const out = buildConceptWeightTable(
      [sub("S", "/s", [{ slug: "a", name: "A", count: 12 }])],
      100
    );
    expect(out[0].concepts[0].pct).toBe(12);
  });

  it("rounds a fractional pct to the nearest integer", () => {
    // 1 / 121 = 0.826% -> 1
    const out = buildConceptWeightTable(
      [sub("S", "/s", [{ slug: "a", name: "A", count: 1 }])],
      121
    );
    expect(out[0].concepts[0].pct).toBe(1);
  });

  it("sorts concepts within a subtopic by count descending (high-yield first)", () => {
    const out = buildConceptWeightTable(
      [
        sub("S", "/s", [
          { slug: "low", name: "Low", count: 2 },
          { slug: "high", name: "High", count: 9 },
          { slug: "mid", name: "Mid", count: 5 },
        ]),
      ],
      20
    );
    expect(out[0].concepts.map((c) => c.slug)).toEqual(["high", "mid", "low"]);
  });

  it("keeps declaration order for concepts with equal counts (stable sort)", () => {
    const out = buildConceptWeightTable(
      [
        sub("S", "/s", [
          { slug: "first", name: "First", count: 3 },
          { slug: "second", name: "Second", count: 3 },
        ]),
      ],
      10
    );
    expect(out[0].concepts.map((c) => c.slug)).toEqual(["first", "second"]);
  });

  it("marks zero-count concepts as foundations and sinks them to the bottom", () => {
    const out = buildConceptWeightTable(
      [
        sub("S", "/s", [
          { slug: "foundation", name: "Foundation", count: 0 },
          { slug: "tested", name: "Tested", count: 4 },
        ]),
      ],
      10
    );
    expect(out[0].concepts.map((c) => c.slug)).toEqual(["tested", "foundation"]);
    const foundation = out[0].concepts.find((c) => c.slug === "foundation")!;
    expect(foundation.isFoundation).toBe(true);
    expect(foundation.pct).toBe(0);
    expect(out[0].concepts.find((c) => c.slug === "tested")!.isFoundation).toBe(false);
  });

  it("computes a subtopic subtotal count and pct", () => {
    const out = buildConceptWeightTable(
      [
        sub("S", "/s", [
          { slug: "a", name: "A", count: 6 },
          { slug: "b", name: "B", count: 4 },
        ]),
      ],
      50
    );
    expect(out[0].count).toBe(10);
    expect(out[0].pct).toBe(20);
  });

  it("preserves subtopic order", () => {
    const out = buildConceptWeightTable(
      [
        sub("First", "/1", [{ slug: "a", name: "A", count: 1 }]),
        sub("Second", "/2", [{ slug: "b", name: "B", count: 1 }]),
      ],
      10
    );
    expect(out.map((g) => g.subtopicTitle)).toEqual(["First", "Second"]);
  });

  it("guards against a zero chapter total (no divide-by-zero)", () => {
    const out = buildConceptWeightTable(
      [sub("S", "/s", [{ slug: "a", name: "A", count: 0 }])],
      0
    );
    expect(out[0].concepts[0].pct).toBe(0);
    expect(out[0].pct).toBe(0);
  });

  it("carries subtopicTitle, subtopicHref, concept slug and name through unchanged", () => {
    const out = buildConceptWeightTable(
      [sub("Dispersion", "/notes/x/dispersion", [{ slug: "variance", name: "Variance", count: 7 }])],
      50
    );
    expect(out[0].subtopicTitle).toBe("Dispersion");
    expect(out[0].subtopicHref).toBe("/notes/x/dispersion");
    expect(out[0].concepts[0].slug).toBe("variance");
    expect(out[0].concepts[0].name).toBe("Variance");
  });
});

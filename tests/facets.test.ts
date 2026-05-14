import { describe, it, expect } from "vitest";
import { mergeAndSortFacets } from "@/lib/questions/facets";

const opts = (xs: { id: string; name: string }[]) => xs;
const facet = (id: string, count: number) => ({ id, count });

describe("mergeAndSortFacets", () => {
  it("attaches counts to matching options and drops zero-count entries", () => {
    const result = mergeAndSortFacets(
      opts([
        { id: "a", name: "Apples" },
        { id: "b", name: "Bananas" },
        { id: "c", name: "Cherries" },
      ]),
      [facet("a", 5), facet("b", 0), facet("c", 12)]
    );
    expect(result.map((r) => r.id)).toEqual(["c", "a"]);
    // "b" dropped because its count was 0
  });

  it("treats options missing from the facets list as zero (and drops them)", () => {
    const result = mergeAndSortFacets(
      opts([
        { id: "a", name: "Apples" },
        { id: "b", name: "Bananas" },
      ]),
      [facet("a", 3)]
    );
    expect(result).toEqual([{ id: "a", name: "Apples", count: 3 }]);
  });

  it("sorts by count descending", () => {
    const result = mergeAndSortFacets(
      opts([
        { id: "a", name: "Apples" },
        { id: "b", name: "Bananas" },
        { id: "c", name: "Cherries" },
      ]),
      [facet("a", 1), facet("b", 10), facet("c", 5)]
    );
    expect(result.map((r) => r.id)).toEqual(["b", "c", "a"]);
  });

  it("breaks ties alphabetically by name (case-insensitive)", () => {
    const result = mergeAndSortFacets(
      opts([
        { id: "a", name: "Zeta" },
        { id: "b", name: "alpha" },
        { id: "c", name: "Gamma" },
      ]),
      [facet("a", 4), facet("b", 4), facet("c", 4)]
    );
    expect(result.map((r) => r.name)).toEqual(["alpha", "Gamma", "Zeta"]);
  });

  it("returns an empty array when no facets match any option", () => {
    const result = mergeAndSortFacets(
      opts([{ id: "a", name: "Apples" }]),
      [facet("x", 99), facet("y", 50)]
    );
    expect(result).toEqual([]);
  });

  it("returns an empty array for empty input options", () => {
    const result = mergeAndSortFacets([], [facet("a", 1)]);
    expect(result).toEqual([]);
  });

  it("returns an empty array for empty input facets", () => {
    const result = mergeAndSortFacets(
      opts([{ id: "a", name: "Apples" }]),
      []
    );
    expect(result).toEqual([]);
  });

  it("preserves the count on the returned object", () => {
    const result = mergeAndSortFacets(
      opts([{ id: "a", name: "Apples" }]),
      [facet("a", 42)]
    );
    expect(result[0]).toEqual({ id: "a", name: "Apples", count: 42 });
  });

  it("ignores facets that reference unknown ids", () => {
    const result = mergeAndSortFacets(
      opts([{ id: "a", name: "Apples" }]),
      [facet("a", 3), facet("ghost", 999)]
    );
    expect(result).toEqual([{ id: "a", name: "Apples", count: 3 }]);
  });
});

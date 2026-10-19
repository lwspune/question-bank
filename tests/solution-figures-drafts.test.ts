import { describe, it, expect } from "vitest";
import { draftsToBatch, type Draft } from "../scripts/solution-figures/drafts";

const A = "aaaaaaaa-0000-4000-8000-000000000001";
const B = "aaaaaaaa-0000-4000-8000-000000000002";
const C = "aaaaaaaa-0000-4000-8000-000000000003";
const D = "aaaaaaaa-0000-4000-8000-000000000004";
const PDF = "C:/books/ch3.pdf";
const fig = (key: string, bbox: [number, number, number, number], pdf = PDF) => ({ key, caption: "Fig. 3.1", pdf, parts: [{ page: 2, bbox }] });

describe("draftsToBatch", () => {
  it("groups book-figure verdicts into one figure per key, and tallies every verdict", () => {
    const drafts: Draft[][] = [[
      { id: A, verdict: "book-figure", reason: "r", figure: fig("meter", [0.1, 0.1, 0.5, 0.4]) },
      { id: B, verdict: "book-figure", reason: "r", figure: fig("meter", [0.1, 0.1, 0.5, 0.4]) },
      { id: C, verdict: "text-enough", reason: "definition" },
      { id: D, verdict: "computed", reason: "r", spec: "V against I" },
    ]];
    const out = draftsToBatch(drafts);
    expect(out.errors).toEqual([]);
    expect(out.batch.figures).toHaveLength(1);
    expect(out.batch.figures[0].ids).toEqual([A, B]);
    expect(out.tally).toEqual({ "book-figure": 2, "text-enough": 1, computed: 1 });
    expect(out.later).toEqual([{ id: D, verdict: "computed", spec: "V against I", reason: "r" }]);
  });

  it("merges the same figure found under different keys in different slices", () => {
    const out = draftsToBatch([
      [{ id: A, verdict: "book-figure", reason: "r", figure: fig("wheatstone", [0.1, 0.1, 0.5, 0.4]) }],
      [{ id: B, verdict: "book-figure", reason: "r", figure: fig("wheatstone-bridge", [0.1, 0.1, 0.5, 0.4]) }],
    ]);
    expect(out.batch.figures).toHaveLength(1);
    expect(out.batch.figures[0].ids).toEqual([A, B]);
  });

  it("keeps two different figures that two slices happened to give one key", () => {
    const out = draftsToBatch([
      [{ id: A, verdict: "book-figure", reason: "r", figure: fig("ray-diagram", [0.1, 0.1, 0.5, 0.4]) }],
      [{ id: B, verdict: "book-figure", reason: "r", figure: fig("ray-diagram", [0.5, 0.5, 0.9, 0.9]) }],
    ]);
    expect(out.batch.figures.map((f) => f.key).sort()).toEqual(["ray-diagram", "ray-diagram-2"]);
  });

  it("carries a book-figure's edits, and reports edits on any other verdict instead of applying them", () => {
    const out = draftsToBatch([[
      { id: A, verdict: "book-figure", reason: "r", figure: fig("meter", [0.1, 0.1, 0.5, 0.4]), edits: [{ find: "wire AC", replace: "wire AB" }] },
      { id: B, verdict: "text-enough", reason: "r", edits: [{ find: "x", replace: "y" }] },
    ]]);
    expect(out.batch.edits).toEqual([{ id: A, find: "wire AC", replace: "wire AB" }]);
    expect(out.errors.join("\n")).toMatch(new RegExp(`${B}.*edits`));
  });

  it("turns a computed or structure verdict that carries a drawing spec into a figure, merging identical specs", () => {
    const spec = { kind: "ray", element: "concave-mirror", f: 15, u: -10, h: 2 };
    const out = draftsToBatch([
      [{ id: A, verdict: "computed", reason: "r", figure: { key: "mirror-u10", draw: spec } }],
      [
        { id: B, verdict: "computed", reason: "r", figure: { key: "mirror-object-inside-f", draw: { ...spec } } },
        { id: C, verdict: "structure", reason: "r", figure: { key: "ethanol", draw: { kind: "structure", molecules: [{ smiles: "CCO" }] } } },
        { id: D, verdict: "computed", reason: "r", spec: "no drawing yet" },
      ],
    ]);
    expect(out.errors).toEqual([]);
    expect(out.batch.figures.map((f) => [f.key, f.ids])).toEqual([["mirror-u10", [A, B]], ["ethanol", [C]]]);
    expect(out.later.map((l) => l.id)).toEqual([D]);
  });

  it("refuses a book-figure with no figure, an unknown verdict, and one id given two verdicts", () => {
    const errs = draftsToBatch([
      [
        { id: A, verdict: "book-figure", reason: "r" },
        { id: B, verdict: "maybe" as never, reason: "r" },
        { id: C, verdict: "text-enough", reason: "r" },
      ],
      [{ id: C, verdict: "book-figure", reason: "r", figure: fig("x", [0.1, 0.1, 0.5, 0.4]) }],
    ]).errors.join("\n");
    expect(errs).toMatch(new RegExp(`${A}.*no figure`));
    expect(errs).toMatch(new RegExp(`${B}.*verdict`));
    expect(errs).toMatch(new RegExp(`${C}.*two verdicts`));
  });
});

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// The 2024 three-circle Venn counting diagrams are redrawn from the numbers SSC printed in their
// regions (redraw_venns.py), because SSC's pictures are ~180 px tall with small print. A redraw is
// only safe if every number lands in the right region, so each entry re-solves its own question
// from the redrawn data and must reach SSC's key.

type Region = "a" | "b" | "c" | "ab" | "ac" | "bc" | "abc";
type Venn = {
  shift: string;
  n: number;
  labels: [string, string, string];
  added?: string[];
  regions: Record<Region, number>;
  ask: { sum: Region[] } | { minus: [Region[], Region[]] };
  expect: number;
};

const SCRIPTS = join(__dirname, "..", "scripts", "ssc-cgl");
const VENNS: Venn[] = JSON.parse(readFileSync(join(SCRIPTS, "venns.json"), "utf8"));
const REGIONS: Region[] = ["a", "b", "c", "ab", "ac", "bc", "abc"];

const total = (v: Venn, keys: Region[]) => keys.reduce((s, k) => s + v.regions[k], 0);
const answer = (v: Venn) =>
  "sum" in v.ask ? total(v, v.ask.sum) : total(v, v.ask.minus[0]) - total(v, v.ask.minus[1]);

describe("venns.json", () => {
  it("covers the 13 three-circle diagrams, each once", () => {
    const keys = VENNS.map((v) => `${v.shift} Q${v.n}`);
    expect(keys).toHaveLength(13);
    expect(new Set(keys).size).toBe(13);
  });

  it.each(VENNS.map((v) => [`${v.shift} Q${v.n}`, v] as const))("%s: seven counts, three label slots", (_, v) => {
    expect(Object.keys(v.regions).sort()).toEqual([...REGIONS].sort());
    for (const k of REGIONS) expect(Number.isInteger(v.regions[k]) && v.regions[k] >= 0).toBe(true);
    expect(v.labels).toHaveLength(3);
    for (const a of v.added ?? []) expect(v.labels).toContain(a);
  });

  it.each(VENNS.map((v) => [`${v.shift} Q${v.n}`, v] as const))("%s: the redrawn counts answer the question", (_, v) => {
    expect(answer(v)).toBe(v.expect);
  });
});

// The ingested rows live in the gitignored out/ folder, so this half runs where the lane does.
const rowsFile = (shift: string) => join(SCRIPTS, "out", shift, "rows.json");
const HAS_ROWS = VENNS.every((v) => existsSync(rowsFile(v.shift)));

describe.skipIf(!HAS_ROWS)("venns.json against the ingested rows", () => {
  const row = (v: Venn) => {
    const rows = JSON.parse(readFileSync(rowsFile(v.shift), "utf8")) as Record<string, unknown>[];
    const r = rows.find((x) => x.questionNumber === String(v.n));
    if (!r) throw new Error(`${v.shift} Q${v.n} not in rows.json`);
    return r as Record<string, string>;
  };

  it.each(VENNS.map((v) => [`${v.shift} Q${v.n}`, v] as const))("%s: the answer is SSC's keyed option", (_, v) => {
    const r = row(v);
    const keyed = r[`option${r.answer}`].replace(/\\\(|\\\)/g, "").trim();
    expect(Number(keyed)).toBe(v.expect);
  });

  it.each(VENNS.filter((v) => v.added?.length).map((v) => [`${v.shift} Q${v.n}`, v] as const))(
    "%s: a label SSC did not print is named by the question itself",
    (_, v) => {
      const stem = row(v).question.toLowerCase();
      for (const a of v.added ?? []) expect(stem).toContain(a.toLowerCase());
    },
  );
});

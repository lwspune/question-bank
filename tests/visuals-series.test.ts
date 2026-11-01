import { describe, expect, it } from "vitest";
import { getScene } from "@/lib/visuals/registry";
import type { Shape } from "@/lib/visuals/types";

// Series (owner, 2026-11-01): a number or letter series worked from its own
// printed terms. The scene builds every term from the stated rule, refuses a
// rule that misses a printed term, fills the gap and picks the option that
// matches. Every case here is a real SSC CGL question.
const scene = getScene("series")!;
const parse = (raw: unknown) => scene.parse(raw) as { error?: string };
const ok = (raw: unknown) => {
  const p = scene.parse(raw);
  if ("error" in (p as object)) throw new Error((p as { error: string }).error);
  return p;
};
const value = (raw: unknown) => scene.check(ok(raw));
const texts = (raw: unknown, played: string[], t = 1) =>
  scene
    .frame(ok(raw), { played, t, slider: undefined })
    .filter((s): s is Extract<Shape, { kind: "text" }> => s.kind === "text")
    .map((s) => s.text);

// ceabe869: differences 7, 14, 21, 28, so the next is 87 + 35 = 122.
const sevens = { kind: "numbers", terms: [17, 24, 38, 59, 87, "?"], rule: { type: "step", f: "x + 7*n" }, options: ["122", "137", "117", "109"] };
// cd4c7ca0: times 3, 4, 5, ... plus 1, the gap in the middle.
const timesPlus = { kind: "numbers", terms: [7, 22, 89, "?", 2677, 18740], rule: { type: "step", f: "x*(n+2) + 1", show: "×{n+2} +1" }, options: ["446", "436", "448", "457"] };
// 2, 12, 36, 80, 150, ?: each term is n^3 + n^2.
const cubes = { kind: "numbers", terms: [2, 12, 36, 80, 150, "?"], rule: { type: "term", f: "n^3 + n^2" }, options: ["246", "240", "252", "258"] };
// bde6e3be: the three letters move +6, -7, +2.
const clusters = { kind: "letters", terms: ["ALW", "GEY", "MXA", "SQC", "YJE", "?"], cols: [{ by: 6 }, { by: -7 }, { by: 2 }], options: ["ECG", "DBI", "DCH", "EBH"] };
// 10f43d9d: the block BRUITLP repeats; the blanks read IBTURLP.
const block = { kind: "block", line: "BRU_TLP_RUI_LPBR_ITLPB_UIT_ _", block: "BRUITLP", options: ["IBTRUPL", "IBTUPLR", "IBRUTLP", "IBTURLP"] };

describe("series: numbers", () => {
  it("builds each term from the one before (step rule) and picks the option", () => {
    expect(value(sevens)).toBe(1);
    expect(value(timesPlus)).toBe(1);
  });

  it("builds each term from its place (term rule)", () => {
    expect(value(cubes)).toBe(3);
  });

  it("builds terms from second differences (diff rule)", () => {
    // 2, 12, 36, 80, 150: first differences 10, 24, 44, 70; second 14, 20, 26 rise by 6.
    expect(value({ ...cubes, rule: { type: "diff", f: "8 + 6*n" } })).toBe(3);
  });

  it("runs two series in turn (alternate rule)", () => {
    // 1, 10, 3, 20, 5, 30, ?: odd places +2, even places +10.
    const alt = { kind: "numbers", terms: [1, 10, 3, 20, 5, 30, "?"], rule: { type: "alternate", odd: { type: "step", f: "x + 2" }, even: { type: "step", f: "x + 10" } }, options: ["7", "40", "35", "9"] };
    expect(value(alt)).toBe(1);
  });

  it("refuses a rule that misses a printed term, naming it", () => {
    const e = parse({ ...sevens, rule: { type: "step", f: "x + 7" } });
    expect(e.error).toMatch(/term 3/);
    expect(e.error).toMatch(/31/);
  });

  it("needs exactly one gap, and a step rule needs the first term", () => {
    expect(parse({ ...sevens, terms: [17, 24, "?", 59, 87, "?"] }).error).toMatch(/one \?/);
    expect(parse({ ...sevens, terms: ["?", 24, 38, 59, 87, 122] }).error).toMatch(/first term/);
  });

  it("says 0 when no option or several match", () => {
    expect(value({ ...sevens, options: ["120", "137", "117", "109"] })).toBe(0);
    expect(value({ ...sevens, options: ["122", "122", "117", "109"] })).toBe(0);
  });

  it("labels each step, from `show` when given, and fills the gap at the answer", () => {
    expect(texts(sevens, ["terms", "rule"]).join(" | ")).toMatch(/\+7 \| \+14 \| \+21 \| \+28 \| \+35/);
    expect(texts(timesPlus, ["terms", "rule"]).join(" | ")).toMatch(/×3 \+1/);
    const end = texts(sevens, ["terms", "rule", "answer"]).join(" | ");
    expect(end).toMatch(/122/);
    expect(end).toMatch(/option A/);
  });
});

describe("series: letters", () => {
  it("moves each letter place by its own step, wrapping round", () => {
    expect(value(clusters)).toBe(1);
  });

  it("refuses a step that misses a printed term", () => {
    expect(parse({ ...clusters, cols: [{ by: 6 }, { by: -7 }, { by: 3 }] }).error).toMatch(/term 2/);
  });

  it("takes a step that grows along the series", () => {
    // C, F, J, O, ?: +3, +4, +5, +6.
    const grow = { kind: "letters", terms: ["C", "F", "J", "O", "?"], cols: [{ by: "n + 2" }], options: ["U", "T", "V", "S"] };
    expect(value(grow)).toBe(1);
    expect(texts(grow, ["terms", "rule"]).join(" | ")).toMatch(/\+6/);
  });
});

describe("series: repeating block", () => {
  it("fills the blanks from the repeating block, ignoring spaces", () => {
    expect(value(block)).toBe(4);
    expect(texts(block, ["terms", "rule", "answer"]).join(" | ")).toMatch(/IBTURLP/);
  });

  it("refuses a block the printed letters do not follow", () => {
    expect(parse({ ...block, block: "BRUITPL" }).error).toMatch(/place/);
  });
});

describe("series: params", () => {
  it("refuses an unknown kind or rule type", () => {
    expect(parse({ ...sevens, kind: "shapes" }).error).toBeTruthy();
    expect(parse({ ...sevens, rule: { type: "guess", f: "x" } }).error).toBeTruthy();
  });
});

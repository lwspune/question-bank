import { describe, expect, it } from "vitest";
import { getScene } from "@/lib/visuals/registry";
import { applyRule, type Step } from "@/lib/visuals/scenes/letterStrip";
import type { Shape } from "@/lib/visuals/types";

// Coding-Decoding (owner, 2026-10-31): a rule is written once as a pipeline of
// steps, proved on the question's own example words (each must give its
// printed code), then applied to the asked word; the scene picks the option
// with that code. Every case here is a real SSC CGL question.
const scene = getScene("letterStrip")!;
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

// 0bf6705a: the first five letters move +1 −1 +1 −1 +1, the last five +2 −2 +2 −2 +2.
const television = {
  examples: [
    { word: "TELEVISION", code: "UDMDWKQKMP" },
    { word: "PUNISHMENT", code: "QTOHTJKGLV" },
  ],
  rule: [
    { op: "shift", by: [1, -1], from: 1, to: 5 },
    { op: "shift", by: [2, -2], from: 6, to: 10 },
  ],
  ask: { word: "HELICOPTER" },
  options: ["IDMHDQCVNT", "IDMHQDVNCT", "IDMHDQNVCT", "IDMHDQVCNT"],
};

describe("letterStrip rules", () => {
  it("shifts letters by a fixed amount, wrapping Z round to A", () => {
    expect(applyRule("MOBILITY", [{ op: "shift", by: 1 }])).toBe("NPCJMJUZ");
    expect(applyRule("AZ", [{ op: "shift", by: -1 }])).toBe("ZY");
    expect(applyRule("YZ", [{ op: "shift", by: 2 }])).toBe("AB");
  });

  it("repeats a list of shifts along a stretch, starting again at the stretch's first letter", () => {
    expect(applyRule("TELEVISION", television.rule as Step[])).toBe("UDMDWKQKMP");
    expect(applyRule("RADIO", [{ op: "shift", by: [1, -1] }])).toBe("SZEHP");
    expect(applyRule("ABC", [{ op: "shift", by: "position" }])).toBe("BDF");
  });

  it("counts a stretch from the end with negative positions", () => {
    // 744f0c81-style: BIRTHDAY, reverse all but the last letter.
    expect(applyRule("BIRTHDAY", [{ op: "reverse", from: 1, to: -2 }])).toBe("ADHTRIBY");
    expect(applyRule("BIRTHDAY", [{ op: "swapPairs" }])).toBe("IBTRDHYA");
    expect(applyRule("PLANT", [{ op: "swap", a: 1, b: 2 }, { op: "swap", a: -2, b: -1 }, { op: "shift", by: [2, 2, 3, 2, 2] }])).toBe("NRDVP");
  });

  it("changes only the letters a step lists with `at`", () => {
    expect(applyRule("PHANTOM", [{ op: "opposite", at: [1, -1] }, { op: "shift", by: [4, -8, 3, 6, -3], from: 2, to: -2 }])).toBe("KLSQZLN");
    expect(applyRule("ABCDE", [{ op: "shift", by: [1, 2], at: [2, 4] }])).toBe("ACCFE");
  });

  it("swaps letters for their opposites (A and Z, positions adding to 27)", () => {
    expect(applyRule("BEAR", [{ op: "opposite" }])).toBe("YVZI");
    expect(applyRule("FIGURE", [{ op: "opposite" }, { op: "shift", by: 1 }])).toBe("VSUGJW");
  });

  it("turns letters into numbers, written one after another or added up", () => {
    expect(applyRule("DGOUT", [{ op: "numbers", f: "x - 2" }])).toBe("25131918");
    expect(applyRule("ESTATE", [{ op: "sum", then: "x + 10" }])).toBe("80");
  });
});

describe("letterStrip scene", () => {
  it("proves the rule on the examples, then picks the option the asked word gives", () => {
    expect(value(television)).toBe(3);
    // 0295c0d4: MOBILITY to NPCJMJUZ, so EXAMPLE is FYBNQMF.
    expect(value({ examples: [{ word: "MOBILITY", code: "NPCJMJUZ" }], rule: [{ op: "shift", by: 1 }], ask: { word: "EXAMPLE" }, options: ["FYBNQMF", "EYBNQMF", "FYBNRME", "FZBNQMF"] })).toBe(1);
    // e9c49927: the end letters take their opposites, the middle five move by a list.
    const phantom = {
      examples: [{ word: "PHANTOM", code: "KLSQZLN" }],
      rule: [
        { op: "opposite", from: 1, to: 1 },
        { op: "opposite", from: -1, to: -1 },
        { op: "shift", by: [4, -8, 3, 6, -3], from: 2, to: -2 },
      ],
      ask: { word: "SPECTOR" },
      options: ["HFKXGLI", "HGKXGQI", "HTWFZLI", "HGLXGQJ"],
    };
    expect(value(phantom)).toBe(3);
  });

  it("reads codes made of numbers, ignoring spaces and dashes between them", () => {
    // 0a68e020: each letter is its position minus 2.
    const dgout = {
      examples: [{ word: "DGOUT", code: "25131918" }, { word: "RCQFM", code: "16115411" }],
      rule: [{ op: "numbers", f: "x - 2" }],
      ask: { word: "OVHPI" },
      options: ["11186048", "13196149", "13 20 6 14 7", "12196247"],
    };
    expect(value(dgout)).toBe(3);
    // 0326f237: the sum of the positions plus 10.
    expect(value({ examples: [{ word: "ESTATE", code: "80" }, { word: "FAMOUS", code: "85" }], rule: [{ op: "sum", then: "x + 10" }], ask: { word: "FOREST" }, options: ["88", "90", "93", "83"] })).toBe(3);
  });

  it("prints codes as the question prints them, separators and all", () => {
    // 0b7c2d85: TIGER is 20-9-7-5-18; the answer line reads the option, not 1857920.
    const tiger = {
      examples: [{ word: "TIGER", code: "20-9-7-5-18" }, { word: "RIGHT", code: "18-9-7-8-20" }],
      rule: [{ op: "numbers" }],
      ask: { word: "REGIT" },
      options: ["18-5-7-20-9", "18-5-9-7-20", "18-5-7-9-20", "18-7-5-9-20"],
    };
    const all = texts(tiger, ["example", "check", "apply", "answer"]).join(" | ");
    expect(all).toMatch(/RIGHT → 18-9-7-8-20 ✓/);
    expect(all).toMatch(/REGIT → 18-5-7-9-20: option C/);
    expect(scene.checkText(ok(tiger), 3)).toMatch(/18-5-7-9-20/);
  });

  it("decodes: the option that the rule turns into the asked code", () => {
    expect(value({ examples: [{ word: "MOBILITY", code: "NPCJMJUZ" }], rule: [{ op: "shift", by: 1 }], ask: { code: "FYBNQMF" }, options: ["EXEMPLE", "EXAMPLE", "EXAMPEL", "EYAMPLE"] })).toBe(2);
  });

  it("refuses a rule its own examples disprove, naming the example", () => {
    const wrong = { ...television, rule: [{ op: "shift", by: [1, -1] }] };
    expect(parse(wrong).error).toMatch(/TELEVISION/);
  });

  it("gives no answer when no option or several options match", () => {
    expect(value({ ...television, options: ["A", "B", "C", "D"] })).toBe(0);
    expect(value({ ...television, options: ["IDMHDQNVCT", "X", "IDMHDQNVCT", "Y"] })).toBe(0);
  });

  it("refuses a number step that is not last, a stretch off the word and a word too long to draw", () => {
    expect(parse({ ...television, rule: [{ op: "sum" }, { op: "shift", by: 1 }] }).error).toMatch(/last/);
    expect(parse({ ...television, rule: [{ op: "shift", by: 1, from: 3, to: 12 }] }).error).toMatch(/TELEVISION|stretch|position/);
    expect(parse({ ...television, ask: { word: "ABCDEFGHIJKLM" } }).error).toMatch(/12/);
    expect(parse({ ...television, rule: [{ op: "spin" }] }).error).toMatch(/op/);
    expect(parse({ ...television, rule: [{ op: "reverse", at: [1, 2] }] }).error).toMatch(/at/);
    expect(parse({ ...television, rule: [{ op: "opposite", at: [1], from: 2 }] }).error).toMatch(/not both/);
  });

  it("says a list of shifts repeats only when it does, and names listed letters", () => {
    const captions = (raw: unknown) => texts(raw, ["example"]).join(" | ");
    expect(captions(television)).toMatch(/\+1 −1 repeated \(letters 1–5\)/);
    const phantom = {
      examples: [{ word: "PHANTOM", code: "KLSQZLN" }],
      rule: [{ op: "opposite", at: [1, -1] }, { op: "shift", by: [4, -8, 3, 6, -3], from: 2, to: -2 }],
      ask: { word: "SPECTOR" },
      options: ["HFKXGLI", "HGKXGQI", "HTWFZLI", "HGLXGQJ"],
    };
    expect(captions(phantom)).toMatch(/\+4 −8 \+3 \+6 −3 \(letters 2–6\)/);
    expect(captions(phantom)).not.toMatch(/repeated/);
    expect(captions(phantom)).toMatch(/opposite letter \(A↔Z\) \(letters 1 and 7\)/);
    expect(value(phantom)).toBe(3);
  });

  it("works the first example, checks the others, then the asked word, and names the option last", () => {
    const ex = texts(television, ["example"]).join(" ");
    expect(ex).toMatch(/TELEVISION|T/);
    expect(ex).not.toMatch(/HELICOPTER/);
    expect(texts(television, ["example", "check"]).join(" ")).toMatch(/PUNISHMENT.*✓/);
    const applied = texts(television, ["example", "check", "apply"]);
    expect(applied).toEqual(expect.arrayContaining(["I", "D", "M", "H", "Q", "N", "V", "C", "T"]));
    expect(applied.join(" ")).not.toMatch(/option/);
    expect(texts(television, ["example", "check", "apply", "answer"]).join(" ")).toMatch(/option C/);
  });

  it("marks each letter's jump on the A-Z ruler while it moves, saying when it wraps", () => {
    const mid = texts(television, ["example"], 0.05).join(" ");
    expect(mid).toMatch(/\+1/);
    const wrap = { examples: [{ word: "YZ", code: "AB" }], rule: [{ op: "shift", by: 2 }], ask: { word: "XY" }, options: ["ZA", "YZ"] };
    expect(texts(wrap, ["example"], 0.1).join(" ")).toMatch(/\+2 past Z/);
  });
});

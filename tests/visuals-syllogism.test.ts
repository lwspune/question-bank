import { describe, expect, it } from "vitest";
import { judge, type Claim } from "@/lib/visuals/syllogism";
import { getScene } from "@/lib/visuals/registry";
import { labelBoxes } from "@/lib/visuals/scenes/circles";
import type { Shape } from "@/lib/visuals/types";

// Syllogisms (owner, 2026-10-31): a conclusion FOLLOWS when it holds in every
// way the sets can overlap that the statements allow (each set non-empty); a
// possibility follows when it holds in at least one. Real SSC CGL questions.
const C = (form: Claim["form"], a: string, b: string, possible = false): Claim => ({ form, a, b, possible });

describe("syllogism logic", () => {
  it("1e1ac640: cards, postcards, books, novels: only I follows", () => {
    const r = judge(["cards", "postcards", "books", "novels"], [C("all", "cards", "postcards"), C("some", "postcards", "books"), C("all", "books", "novels")], [
      C("some", "postcards", "novels"),
      C("no", "cards", "books"),
      C("all", "cards", "novels"),
    ]);
    expect(r.follows).toEqual([true, false, false]);
  });

  it("27d2131c and 5446b557: conversions follow (some B are A from all A are B)", () => {
    expect(
      judge(["grapes", "berries", "juices", "sodas"], [C("all", "grapes", "berries"), C("some", "berries", "juices"), C("all", "juices", "sodas")], [
        C("some", "berries", "grapes"),
        C("some", "sodas", "berries"),
      ]).follows,
    ).toEqual([true, true]);
    expect(judge(["apple", "blue", "orange"], [C("no", "apple", "blue"), C("all", "orange", "apple")], [C("no", "orange", "blue"), C("some", "apple", "orange")]).follows).toEqual([true, true]);
  });

  it("8332f49c and ef10c2ba: some-not conclusions", () => {
    // "All tablets can never be medicines" = some tablets are not medicines.
    expect(
      judge(["medicine", "capsule", "tablet", "laptop"], [C("no", "medicine", "capsule"), C("some", "capsule", "tablet"), C("some", "tablet", "laptop")], [
        C("some", "capsule", "laptop"),
        C("someNot", "tablet", "medicine"),
      ]).follows,
    ).toEqual([false, true]);
    expect(judge(["circle", "square", "triangle"], [C("no", "circle", "square"), C("some", "square", "triangle")], [C("someNot", "triangle", "circle"), C("no", "triangle", "circle")]).follows).toEqual([true, false]);
  });

  it("86ec6bde: some roads are highways does not make all roads streets", () => {
    expect(judge(["road", "highway", "street"], [C("some", "road", "highway"), C("all", "highway", "street")], [C("all", "road", "street"), C("some", "street", "highway")]).follows).toEqual([false, true]);
  });

  it("finds an either/or pair: neither follows, exactly one is always true", () => {
    const r = judge(["A", "B", "C"], [C("all", "A", "B")], [C("some", "B", "C"), C("no", "B", "C")]);
    expect(r.follows).toEqual([false, false]);
    expect(r.either).toEqual([[1, 2]]);
  });

  it("lets a possibility follow when some arrangement allows it", () => {
    const r = judge(["A", "B"], [C("some", "A", "B")], [C("all", "A", "B", true), C("no", "A", "B", true)]);
    expect(r.follows).toEqual([true, false]);
  });

  it("refuses statements no arrangement can satisfy", () => {
    expect(() => judge(["A", "B"], [C("all", "A", "B"), C("no", "A", "B")], [C("some", "A", "B")])).toThrow(/no arrangement/);
  });
});

const scene = getScene("circles")!;
const parse = (raw: unknown) => scene.parse(raw) as { error?: string };
const ok = (raw: unknown) => {
  const p = scene.parse(raw);
  if ("error" in (p as object)) throw new Error((p as { error: string }).error);
  return p;
};
const texts = (raw: unknown, played: string[], t = 1) =>
  scene
    .frame(ok(raw), { played, t, slider: undefined })
    .filter((s): s is Extract<Shape, { kind: "text" }> => s.kind === "text")
    .map((s) => s.text);

// ef10c2ba: No circles are squares. Some squares are triangles.
const shapes = {
  sets: [
    { id: "circle", label: "Circles", x: 18, y: 30, r: 14 },
    { id: "square", label: "Squares", x: 52, y: 30, r: 16 },
    { id: "triangle", label: "Triangles", x: 76, y: 30, r: 15 },
  ],
  statements: [
    { form: "no", a: "circle", b: "square", show: "No circle is a square", step: "s1" },
    { form: "some", a: "square", b: "triangle", show: "Some squares are triangles", step: "s2" },
  ],
  conclusions: [
    { form: "someNot", a: "triangle", b: "circle", show: "I. Some triangles are not circles", step: "c1" },
    { form: "no", a: "triangle", b: "circle", show: "II. No triangle is a circle", step: "c2", alt: { set: "triangle", x: 40, y: 30, r: 26 } },
  ],
  options: [
    { text: "Only I follows", means: { follow: [1] } },
    { text: "Only II follows", means: { follow: [2] } },
    { text: "Both I and II follow", means: { follow: [1, 2] } },
    { text: "Neither I nor II follows", means: { follow: [] } },
  ],
};

describe("circles scene", () => {
  it("picks the option whose set of following conclusions matches", () => {
    expect(scene.check(ok(shapes))).toBe(1);
    expect(scene.checkText(ok(shapes), 1)).toMatch(/I/);
  });

  it("picks an either/or option and refuses 'neither' then", () => {
    const raw = {
      sets: [
        { id: "A", label: "A", x: 30, y: 30, r: 10 },
        { id: "B", label: "B", x: 34, y: 30, r: 20 },
        { id: "C", label: "C", x: 75, y: 30, r: 12 },
      ],
      statements: [{ form: "all", a: "A", b: "B", show: "All A are B", step: "s1" }],
      conclusions: [
        { form: "some", a: "B", b: "C", show: "I. Some B are C", step: "c1" },
        { form: "no", a: "B", b: "C", show: "II. No B is C", step: "c2" },
      ],
      options: [
        { text: "Only I follows", means: { follow: [1] } },
        { text: "Neither follows", means: { follow: [] } },
        { text: "Either I or II follows", means: { either: [1, 2] } },
      ],
    };
    expect(scene.check(ok(raw))).toBe(3);
  });

  it("refuses a drawing that contradicts a statement", () => {
    // "No circle is a square" drawn overlapping.
    expect(parse({ ...shapes, sets: [{ ...shapes.sets[0], x: 40 }, ...shapes.sets.slice(1)] }).error).toMatch(/No circle is a square/);
  });

  it("checks a counter-picture: the statements still hold and the conclusion fails in it", () => {
    // Moving the triangles circle away from the circles does not break "No triangle is a circle".
    const bad = { ...shapes, conclusions: [shapes.conclusions[0], { ...shapes.conclusions[1], alt: { set: "triangle", x: 78, y: 30, r: 15 } }] };
    expect(parse(bad).error).toMatch(/II/);
    // An alt that breaks a statement is refused too.
    const breaks = { ...shapes, conclusions: [shapes.conclusions[0], { ...shapes.conclusions[1], alt: { set: "triangle", x: 10, y: 30, r: 8 } }] };
    expect(parse(breaks).error).toMatch(/Some squares are triangles/);
  });

  it("refuses a following conclusion the main picture contradicts", () => {
    const wrong = { ...shapes, conclusions: [{ ...shapes.conclusions[0], form: "no", show: "I. No triangle is a square" , a: "triangle", b: "square" }, shapes.conclusions[1]] };
    // "No triangle is a square" does not follow, so this is not a contradiction: it parses.
    expect(parse(wrong).error).toBeUndefined();
  });

  it("draws the circles with the statements, then marks each conclusion, then names the option", () => {
    expect(texts(shapes, ["s1"])).toEqual(expect.arrayContaining(["Circles", "Squares"]));
    expect(texts(shapes, ["s1"])).not.toContain("Triangles");
    const c = texts(shapes, ["s1", "s2", "c1", "c2"]).join(" | ");
    expect(c).toMatch(/follows/);
    expect(c).toMatch(/does not follow/);
    expect(c).not.toMatch(/option/);
    expect(texts(shapes, ["s1", "s2", "c1", "c2", "answer"]).join(" | ")).toMatch(/option A/);
  });

  it("shows a conclusion only when its own beat plays, whatever order the solution takes them in", () => {
    const shown = texts(shapes, ["s1", "s2", "c2"]).join(" | ");
    expect(shown).toMatch(/II\. No triangle/);
    expect(shown).not.toMatch(/I\. Some triangles/);
    expect(texts(shapes, ["s1", "s2", "c2", "answer"]).join(" | ")).toMatch(/I\. Some triangles/);
  });

  it("places every label clear of every circle's outline and of the other labels", () => {
    // 029c9353: 'Woman' sat on its own circle's top edge; 36e97931: 'Brothers' sat on the Fathers circle.
    const pics = [
      [
        { id: "humans", label: "Humans", x: 26, y: 30, r: 24 },
        { id: "woman", label: "Woman", x: 26, y: 36, r: 11 },
        { id: "lions", label: "Lions", x: 76, y: 28, r: 16 },
      ],
      [
        { id: "males", label: "Males", x: 50, y: 30, r: 27 },
        { id: "fathers", label: "Fathers", x: 40, y: 32, r: 12 },
        { id: "brothers", label: "Brothers", x: 57, y: 32, r: 12 },
      ],
      [
        { id: "E", label: "Electronics", x: 50, y: 30, r: 27 },
        { id: "L", label: "Laptops", x: 38, y: 34, r: 12 },
        { id: "M", label: "Microwaves", x: 62, y: 34, r: 12 },
      ],
    ];
    // A label no spot can hold is refused, not drawn across a line.
    expect(() => labelBoxes([pics[2][0], pics[2][1], { ...pics[2][2], label: "Microwave ovens" }])).toThrow(/no place for the label of M/);
    for (const sets of pics) {
      const boxes = labelBoxes(sets);
      for (const b of boxes) {
        for (const c of sets) {
          const cx = 10 + c.x * 3.4;
          const cy = 26 + c.y * 3.4;
          const R = c.r * 3.4;
          const corners = [[b.x0, b.y0], [b.x1, b.y0], [b.x0, b.y1], [b.x1, b.y1]].map(([x, y]) => Math.hypot(x - cx, y - cy));
          const nx = Math.max(b.x0, Math.min(cx, b.x1));
          const ny = Math.max(b.y0, Math.min(cy, b.y1));
          const inside = corners.every((d) => d <= R - 1);
          const outside = Math.hypot(nx - cx, ny - cy) >= R + 1;
          expect(inside || outside, `${b.id} label on ${c.id}'s outline`).toBe(true);
        }
        for (const o of boxes) if (o !== b) expect(b.x0 < o.x1 && o.x0 < b.x1 && b.y0 < o.y1 && o.y0 < b.y1, `${b.id} touches ${o.id}`).toBe(false);
      }
    }
  });

  it("answers a pick-the-diagram question with the figure the drafter names, once the drawing fits every relation", () => {
    // 'Woman, Humans, Lions': women inside humans, lions apart.
    const raw = {
      sets: [
        { id: "humans", label: "Humans", x: 30, y: 30, r: 22 },
        { id: "woman", label: "Woman", x: 30, y: 36, r: 10 },
        { id: "lions", label: "Lions", x: 78, y: 30, r: 12 },
      ],
      statements: [
        { form: "all", a: "woman", b: "humans", show: "Every woman is a human", step: "s1" },
        { form: "no", a: "lions", b: "humans", show: "No lion is a human", step: "s2" },
      ],
      conclusions: [],
      figure: 4,
    };
    expect(scene.check(ok(raw))).toBe(4);
    expect(parse({ ...raw, sets: [raw.sets[0], { ...raw.sets[1], x: 60 }, raw.sets[2]] }).error).toMatch(/woman/i);
  });
});

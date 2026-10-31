import { describe, expect, it } from "vitest";
import { getScene } from "@/lib/visuals/registry";
import type { Shape } from "@/lib/visuals/types";

// Blood relations (owner, 2026-10-31): the statements build a family tree one
// link at a time; every option is then FOLLOWED on the tree, and the answer is
// the one option that holds whatever sex an unstated person has. Every case
// is a real SSC CGL question.
const scene = getScene("familyTree")!;
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

// 42a4fef8: R # S & T, where # is "father of" and & is "husband of".
const coded = {
  people: [
    { id: "R", sex: "m" },
    { id: "S", sex: "m" },
    { id: "T", sex: "f" },
  ],
  facts: [
    { rel: "parent", a: "R", b: "S", step: "f1" },
    { rel: "spouse", a: "S", b: "T", step: "f2" },
  ],
  rows: [["R"], ["S", "T"]],
  ask: { who: "R", of: "T" },
  options: [
    { text: "R is the father of T", means: { rel: "father" } },
    { text: "R is the brother of T", means: { rel: "brother" } },
    { text: "R is the father-in-law of T", means: { rel: "father-in-law" } },
    { text: "R is the husband of T", means: { rel: "husband" } },
  ],
};

// da333715: P's brother is Q, Q is R's father, R is S's sister; S's sex is never stated.
const unstated = {
  people: [
    { id: "P", sex: "?" },
    { id: "Q", sex: "m" },
    { id: "R", sex: "f" },
    { id: "S", sex: "?" },
  ],
  facts: [
    { rel: "sibling", a: "P", b: "Q", step: "f1" },
    { rel: "parent", a: "Q", b: "R", step: "f2" },
    { rel: "sibling", a: "R", b: "S", step: "f3" },
  ],
  rows: [["P", "Q"], ["R", "S"]],
  ask: { who: "S", of: "P" },
  options: [
    { text: "Son", means: { rel: "son" } },
    { text: "Nephew", means: { rel: "nephew" } },
    { text: "Niece", means: { rel: "niece" } },
    { text: "Cannot be determined", means: { undetermined: true } },
  ],
};

describe("familyTree scene", () => {
  it("follows every option on the tree and picks the one that holds", () => {
    expect(value(coded)).toBe(3);
    // 0b66184c: B is A's wife and D's daughter; C is A's daughter. C is D's daughter's daughter.
    expect(
      value({
        people: [
          { id: "D", sex: "?" },
          { id: "A", sex: "m" },
          { id: "B", sex: "f" },
          { id: "C", sex: "f" },
        ],
        facts: [
          { rel: "spouse", a: "B", b: "A", step: "f1" },
          { rel: "parent", a: "D", b: "B", step: "f1" },
          { rel: "parent", a: "A", b: "C", step: "f2" },
        ],
        rows: [["D"], ["A", "B"], ["C"]],
        ask: { who: "C", of: "D" },
        options: [
          { text: "Son’s son", means: { chain: ["son", "son"] } },
          { text: "Daughter’s daughter", means: { chain: ["daughter", "daughter"] } },
          { text: "Daughter", means: { rel: "daughter" } },
          { text: "Son", means: { rel: "son" } },
        ],
      }),
    ).toBe(2);
  });

  it("reads an option about a different pair (P is R's father)", () => {
    // 7318617c: P is Q's father, Q is R's sister.
    const raw = {
      people: [
        { id: "P", sex: "m" },
        { id: "Q", sex: "f" },
        { id: "R", sex: "?" },
      ],
      facts: [
        { rel: "parent", a: "P", b: "Q", step: "f1" },
        { rel: "sibling", a: "Q", b: "R", step: "f2" },
      ],
      rows: [["P"], ["Q", "R"]],
      ask: { who: "P", of: "R" },
      options: [
        { text: "P is R's uncle", means: { rel: "uncle" } },
        { text: "Q is R's mother", means: { who: "Q", of: "R", rel: "mother" } },
        { text: "P is R’s father", means: { rel: "father" } },
        { text: "R is P’s mother", means: { who: "R", of: "P", rel: "mother" } },
      ],
    };
    expect(value(raw)).toBe(3);
  });

  it("answers 'cannot be determined' only when no option holds for every possible sex", () => {
    expect(value(unstated)).toBe(4);
    // With S stated as a boy, Nephew holds and 'cannot be determined' does not.
    expect(value({ ...unstated, people: unstated.people.map((p) => (p.id === "S" ? { ...p, sex: "m" } : p)) })).toBe(2);
    expect(scene.checkText(ok(unstated), 4)).toMatch(/S/);
  });

  it("drops a sex that the tree rules out (a husband's wife is a woman)", () => {
    // a86280a1: 3 is 2's father, 1 and 3 are married: who is 2's mother? 1's sex is left open.
    const raw = {
      people: ["1", "2", "3", "4", "5", "6"].map((id) => ({ id, sex: ({ "3": "m", "2": "f", "4": "f", "5": "f", "6": "m" } as Record<string, string>)[id] ?? "?" })),
      facts: [
        { rel: "parent", a: "3", b: "2", step: "f1" },
        { rel: "spouse", a: "1", b: "3", step: "f2" },
        { rel: "sibling", a: "5", b: "3", step: "f3" },
        { rel: "parent", a: "1", b: "4", step: "f4" },
        { rel: "sibling", a: "6", b: "2", step: "f5" },
      ],
      rows: [["5", "3", "1"], ["2", "4", "6"]],
      ask: { who: "1", of: "2" },
      options: ["2", "1", "4", "5"].map((id) => ({ text: id, means: { who: id, of: "2", rel: "mother" } })),
    };
    expect(value(raw)).toBe(2);
    // 1's sex is not stated, but the tree settles it, so the route says "mother".
    expect(texts(raw, ["f1", "f2", "f3", "f4", "f5", "path"]).join(" | ")).toMatch(/2's mother is 1/);
  });

  it("says a person is themself, not that there is no route (Azad himself)", () => {
    const self = {
      people: [
        { id: "Azad", sex: "m" },
        { id: "dad", sex: "m" },
      ],
      facts: [{ rel: "parent", a: "dad", b: "Azad", step: "f1" }],
      rows: [["dad"], ["Azad"]],
      ask: { who: "Azad", of: "Azad" },
      options: [
        { text: "Azad himself", means: { self: true } },
        { text: "His father", means: { rel: "father" } },
      ],
    };
    expect(value(self)).toBe(1);
    const path = texts(self, ["f1", "path"]).join(" | ");
    expect(path).toMatch(/Azad himself/);
    expect(path).not.toMatch(/no route/);
  });

  it("gives no answer when several options hold", () => {
    expect(value({ ...coded, options: [...coded.options.slice(0, 3), { text: "R is the father-in-law", means: { rel: "father-in-law" } }] })).toBe(0);
  });

  it("refuses rows that contradict the facts, and words it does not know", () => {
    expect(parse({ ...coded, rows: [["S", "T"], ["R"]] }).error).toMatch(/row/);
    expect(parse({ ...coded, rows: [["R"], ["S"], ["T"]] }).error).toMatch(/row/);
    expect(parse({ ...coded, people: [...coded.people, { id: "X", sex: "m" }] }).error).toMatch(/X/);
    expect(parse({ ...coded, options: [{ text: "Great-uncle", means: { rel: "great-uncle" } }, ...coded.options.slice(1)] }).error).toMatch(/great-uncle/);
    expect(parse({ ...coded, facts: [{ ...coded.facts[0], step: "f9" }, coded.facts[1]] }).error).toMatch(/step/);
  });

  it("adds people as the statements name them, then walks the path, then names the option", () => {
    expect(texts(coded, ["f1"])).toEqual(expect.arrayContaining(["R", "S"]));
    expect(texts(coded, ["f1"])).not.toContain("T");
    expect(texts(coded, ["f1", "f2"])).toContain("T");
    const path = texts(coded, ["f1", "f2", "path"]).join(" | ");
    expect(path).toMatch(/T's husband's father is R/);
    expect(path).not.toMatch(/option/);
    expect(texts(coded, ["f1", "f2", "path", "answer"]).join(" | ")).toMatch(/option C/);
  });

  it("marks a person whose sex is not stated, and says why nothing can be decided", () => {
    const end = texts(unstated, ["f1", "f2", "f3", "path", "answer"]).join(" | ");
    expect(end).toMatch(/sex not stated/i);
    expect(end).toMatch(/option D/);
  });
});

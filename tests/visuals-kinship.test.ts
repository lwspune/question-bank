import { describe, expect, it } from "vitest";
import { buildFamily, follow, holds, KinError, pathBetween, type Person, type Fact } from "@/lib/visuals/kinship";

// Blood relations (owner, 2026-10-31): a family built from a question's
// statements, then asked questions by following relations from a person.
const fam = (people: Person[], facts: Fact[]) => buildFamily(people, facts);
const P = (id: string, sex: "m" | "f" | "?" = "?"): Person => ({ id, sex });

describe("kinship: building the family", () => {
  it("gives a spouse the children of the other spouse", () => {
    // 2712403e: C is B's husband, D is C's son, so B is D's mother too.
    const f = fam([P("B", "f"), P("C", "m"), P("D", "m")], [
      { rel: "spouse", a: "C", b: "B" },
      { rel: "parent", a: "C", b: "D" },
    ]);
    expect([...follow(f, "D", ["mother"])]).toEqual(["B"]);
  });

  it("gives siblings the same parents", () => {
    // 7318617c: P is Q's father, Q is R's sister, so P is R's father.
    const f = fam([P("P", "m"), P("Q", "f"), P("R")], [
      { rel: "parent", a: "P", b: "Q" },
      { rel: "sibling", a: "Q", b: "R" },
    ]);
    expect([...follow(f, "R", ["father"])]).toEqual(["P"]);
    expect([...follow(f, "R", ["sister"])]).toEqual(["Q"]);
  });

  it("makes children of one parent siblings", () => {
    const f = fam([P("A", "m"), P("B", "f"), P("C", "m")], [
      { rel: "parent", a: "A", b: "B" },
      { rel: "parent", a: "A", b: "C" },
    ]);
    expect([...follow(f, "B", ["brother"])]).toEqual(["C"]);
  });

  it("refuses a family that contradicts itself", () => {
    expect(() => fam([P("A", "m"), P("B", "m")], [{ rel: "spouse", a: "A", b: "B" }])).toThrow(KinError);
    expect(() =>
      fam([P("A"), P("B"), P("C"), P("D")], [
        { rel: "parent", a: "A", b: "D" },
        { rel: "parent", a: "B", b: "D" },
        { rel: "parent", a: "C", b: "D" },
      ]),
    ).toThrow(/3 parents/);
    expect(() => fam([P("A")], [{ rel: "parent", a: "A", b: "Z" }])).toThrow(/Z/);
  });
});

describe("kinship: what an option says", () => {
  // 42a4fef8: R # S & T = R is S's father, S is T's husband.
  const coded = [P("R", "m"), P("S", "m"), P("T", "f")];
  const codedFacts: Fact[] = [
    { rel: "parent", a: "R", b: "S" },
    { rel: "spouse", a: "S", b: "T" },
  ];

  it("reads standard terms, each defined once", () => {
    const f = fam(coded, codedFacts);
    expect(holds(f, "R", "T", { rel: "father-in-law" })).toBe(true);
    expect(holds(f, "R", "T", { rel: "father" })).toBe(false);
    expect(holds(f, "T", "R", { rel: "daughter-in-law" })).toBe(true);
    expect(holds(f, "S", "T", { rel: "husband" })).toBe(true);
  });

  it("reads a chain of steps (Daughter's daughter)", () => {
    // 0b66184c: B is A's wife and D's daughter; C is A's daughter.
    const f = fam([P("A", "m"), P("B", "f"), P("C", "f"), P("D")], [
      { rel: "spouse", a: "B", b: "A" },
      { rel: "parent", a: "D", b: "B" },
      { rel: "parent", a: "A", b: "C" },
    ]);
    expect(holds(f, "C", "D", { chain: ["daughter", "daughter"] })).toBe(true);
    expect(holds(f, "C", "D", { chain: ["son", "son"] })).toBe(false);
    expect(holds(f, "C", "D", { rel: "granddaughter" })).toBe(true);
  });

  it("knows uncles, aunts, cousins and in-laws by marriage too", () => {
    const f = fam([P("G", "m"), P("F", "m"), P("U", "m"), P("Au", "f"), P("Me", "f"), P("Co", "m"), P("Wi", "f")], [
      { rel: "parent", a: "G", b: "F" },
      { rel: "parent", a: "G", b: "U" },
      { rel: "spouse", a: "U", b: "Au" },
      { rel: "parent", a: "F", b: "Me" },
      { rel: "parent", a: "U", b: "Co" },
      { rel: "spouse", a: "F", b: "Wi" },
    ]);
    expect(holds(f, "U", "Me", { rel: "uncle" })).toBe(true);
    expect(holds(f, "U", "Me", { rel: "paternal uncle" })).toBe(true);
    expect(holds(f, "U", "Me", { rel: "maternal uncle" })).toBe(false);
    expect(holds(f, "Au", "Me", { rel: "aunt" })).toBe(true);
    expect(holds(f, "Co", "Me", { rel: "cousin" })).toBe(true);
    expect(holds(f, "Au", "Wi", { rel: "sister-in-law" })).toBe(false);
    expect(holds(f, "U", "Wi", { rel: "brother-in-law" })).toBe(true);
    expect(holds(f, "Me", "U", { rel: "niece" })).toBe(true);
    expect(holds(f, "G", "Me", { rel: "paternal grandfather" })).toBe(true);
  });

  it("takes either of several meanings (Niece/Nephew) and a person as themself", () => {
    const f = fam([P("Q", "m"), P("P", "m"), P("S", "f")], [
      { rel: "sibling", a: "P", b: "Q" },
      { rel: "parent", a: "Q", b: "S" },
    ]);
    expect(holds(f, "S", "P", { any: [{ rel: "niece" }, { rel: "nephew" }] })).toBe(true);
    expect(holds(f, "S", "S", { self: true })).toBe(true);
  });

  it("refuses a term it does not know, rather than guessing", () => {
    const f = fam(coded, codedFacts);
    expect(() => holds(f, "R", "T", { rel: "great-uncle" })).toThrow(/great-uncle/);
  });
});

describe("kinship: the path from one person to another", () => {
  it("walks the shortest route and names each step by the next person's sex", () => {
    const f = fam([P("R", "m"), P("S", "m"), P("T", "f")], [
      { rel: "parent", a: "R", b: "S" },
      { rel: "spouse", a: "S", b: "T" },
    ]);
    expect(pathBetween(f, "T", "R")).toEqual([
      { to: "S", step: "husband" },
      { to: "R", step: "father" },
    ]);
  });

  it("says parent, child, sibling or spouse when the sex is not stated", () => {
    const f = fam([P("A"), P("B", "f")], [{ rel: "parent", a: "A", b: "B" }]);
    expect(pathBetween(f, "B", "A")).toEqual([{ to: "A", step: "parent" }]);
  });
});

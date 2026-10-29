import { describe, expect, it } from "vitest";
import { getScene } from "@/lib/visuals/registry";
import type { Shape } from "@/lib/visuals/types";

// Claims about a set (owner, 2026-10-29): every member is tested in turn and
// the claim's truth value is read off; ∀ needs every member, ∃ needs one.
const scene = getScene("setClaim")!;
const parse = (raw: unknown) => scene.parse(raw) as { error?: string };
const ok = (raw: unknown) => {
  const p = scene.parse(raw);
  if ("error" in (p as object)) throw new Error((p as { error: string }).error);
  return p;
};
const value = (raw: unknown) => scene.check(ok(raw));
const texts = (raw: unknown, played: string[]) =>
  scene
    .frame(ok(raw), { played, t: 1, slider: undefined })
    .filter((s): s is Extract<Shape, { kind: "text" }> => s.kind === "text")
    .map((s) => s.text);

const A = { name: "A", members: [1, 2, 3, 4, 5] };
// HSC 047a1be4: ∀x ∈ A, x + 1 ≥ 3 is F (x = 1 gives 2).
const forAll = { set: A, claims: [{ quant: "all", lhs: "x + 1", rel: ">=", rhs: "3", show: "x + 1 ≥ 3" }] };

describe("setClaim scene", () => {
  it("works out a claim's truth value from every member of a finite set", () => {
    expect(value(forAll)).toBe(0);
    expect(value({ set: A, claims: [{ quant: "some", lhs: "x - 4", rel: "=", rhs: "3", show: "x − 4 = 3" }] })).toBe(0);
    expect(value({ set: A, claims: [{ quant: "some", lhs: "x - 4", rel: "=", rhs: "1", show: "x − 4 = 1" }] })).toBe(1);
    expect(value({ set: A, claims: [{ quant: "all", lhs: "mod(x^2 + x, 2)", rel: "=", rhs: "0", show: "x² + x is even" }] })).toBe(1);
  });

  it("on an infinite set, accepts only what the listed members settle: a counterexample or a witness", () => {
    const N = { name: "N", members: [1, 2, 3], infinite: true };
    // ∀ n ∈ N, n + 6 > 8 is F: n = 1 fails.
    expect(value({ set: N, claims: [{ quant: "all", lhs: "x + 6", rel: ">", rhs: "8", show: "n + 6 > 8" }] })).toBe(0);
    // ∃ n ∈ N, n + 8 > 11 is T: n = 4 works, once 4 is listed.
    expect(value({ set: { ...N, members: [1, 2, 3, 4] }, claims: [{ quant: "some", lhs: "x + 8", rel: ">", rhs: "11", show: "n + 8 > 11" }] })).toBe(1);
    // A "for all" that holds on the listed members proves nothing about the rest.
    expect(parse({ set: N, claims: [{ quant: "all", lhs: "x", rel: ">", rhs: "0", show: "n > 0" }] }).error).toMatch(/settle/);
    expect(parse({ set: N, claims: [{ quant: "some", lhs: "x", rel: "<", rhs: "0", show: "n < 0" }] }).error).toMatch(/settle/);
  });

  it("picks out the one claim a multiple-choice question asks for", () => {
    const four = {
      set: A,
      ask: "false",
      claims: [
        { quant: "all", lhs: "x + 3", rel: "<", rhs: "10", show: "∀x, x + 3 < 10" },
        { quant: "some", lhs: "x + 3", rel: "<", rhs: "5", show: "∃x, x + 3 < 5" },
        { quant: "some", lhs: "x + 3", rel: "=", rhs: "8", show: "∃x, x + 3 = 8" },
        { quant: "all", lhs: "x + 3", rel: "<=", rhs: "7", show: "∀x, x + 3 ≤ 7" },
      ],
    };
    expect(value(four)).toBe(4);
    // Two false claims: no single answer, so the check fails.
    expect(value({ ...four, claims: [...four.claims.slice(0, 3), { ...four.claims[3], rhs: "6" }].map((c, i) => (i === 0 ? { ...c, rhs: "4" } : c)) })).toBe(0);
    expect(parse({ ...four, ask: undefined }).error).toMatch(/ask/);
  });

  it("shows the members first, each member's verdict as it is tested, and the claim's truth value last", () => {
    expect(texts(forAll, ["set"])).toEqual(expect.arrayContaining(["1", "5"]));
    expect(texts(forAll, ["set"]).join(" ")).not.toMatch(/✗/);
    expect(texts(forAll, ["set", "test"]).join(" ")).toMatch(/✗/);
    expect(texts(forAll, ["set", "test", "answer"]).join(" ")).toMatch(/F/);
  });

  it("refuses an unknown relation, an empty set and too many members", () => {
    expect(parse({ ...forAll, claims: [{ ...forAll.claims[0], rel: "~" }] })).toHaveProperty("error");
    expect(parse({ ...forAll, set: { name: "A", members: [] } })).toHaveProperty("error");
    expect(parse({ ...forAll, set: { name: "A", members: Array.from({ length: 13 }, (_, i) => i) } })).toHaveProperty("error");
  });
});

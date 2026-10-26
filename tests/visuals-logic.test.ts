import { describe, expect, it } from "vitest";
import { classify, equivalent, evaluate, parseLogic, showLogic, transform, varsOf } from "@/lib/visuals/logic";

const ev = (src: string, env: Record<string, boolean>) => evaluate(parseLogic(src), env);
const same = (a: string, b: string) => equivalent(parseLogic(a), parseLogic(b));

describe("logic formulas: parsing and evaluation", () => {
  it("reads the connectives in ASCII and in the symbols the bank prints", () => {
    expect(ev("p & q", { p: true, q: false })).toBe(false);
    expect(ev("p | q", { p: true, q: false })).toBe(true);
    expect(ev("~p", { p: true })).toBe(false);
    expect(ev("p -> q", { p: true, q: false })).toBe(false);
    expect(ev("p <-> q", { p: false, q: false })).toBe(true);
    expect(ev("∼p ∨ (q ∧ ¬r)", { p: true, q: true, r: false })).toBe(true);
    expect(ev("p → q", { p: false, q: false })).toBe(true);
    expect(ev("p ↔ q", { p: true, q: false })).toBe(false);
    expect(ev("T & ~F", {})).toBe(true);
  });
  it("binds not, and, or, implies, iff in that order; implication groups to the right", () => {
    // ~p & q | r  ==  ((~p) & q) | r
    expect(same("~p & q | r", "((~p) & q) | r")).toBe(true);
    // p -> q -> r  ==  p -> (q -> r), not (p -> q) -> r
    expect(same("p -> q -> r", "p -> (q -> r)")).toBe(true);
    expect(same("p -> q -> r", "(p -> q) -> r")).toBe(false);
    // p <-> q -> r  ==  p <-> (q -> r)
    expect(same("p <-> q -> r", "p <-> (q -> r)")).toBe(true);
  });
  it("lists a formula's variables in alphabetical order", () => {
    expect(varsOf(parseLogic("(r -> p) & ~q"))).toEqual(["p", "q", "r"]);
  });
  it("refuses anything outside the grammar", () => {
    for (const bad of ["p &", "(p | q", "p q", "alert(1)", "pq", "p + q", "", "p &&& q"]) expect(() => parseLogic(bad), bad).toThrow();
    expect(() => parseLogic("p & ".repeat(40) + "p")).toThrow(/long/);
  });
  it("prints a formula back with the bank's symbols and only the brackets it needs", () => {
    expect(showLogic(parseLogic("((~p) | q) -> (p & ~q)"))).toBe("(∼p ∨ q) → (p ∧ ∼q)");
    expect(showLogic(parseLogic("~(p & q)"))).toBe("∼(p ∧ q)");
    expect(showLogic(parseLogic("p -> (q -> r)"))).toBe("p → (q → r)");
  });
});

describe("logic formulas: what the questions ask", () => {
  it("tells a tautology, a contradiction and a contingency apart", () => {
    // MHT-CET: [(p ∧ q) → (∼p ∨ r)] ∨ [(∼p ∨ r) → (p ∧ q)] is a tautology.
    expect(classify(parseLogic("((p & q) -> (~p | r)) | ((~p | r) -> (p & q))"))).toBe("tautology");
    expect(classify(parseLogic("p & ~p"))).toBe("contradiction");
    expect(classify(parseLogic("p | q"))).toBe("contingency");
  });
  it("checks logical equivalence over every row", () => {
    // MHT-CET: ∼[(p → ∼q) ∧ (∼q ∨ p)] is equivalent to q.
    expect(same("~((p -> ~q) & (~q | p))", "q")).toBe(true);
    expect(same("p -> (q -> p)", "p -> (p | q)")).toBe(true);
    expect(same("p -> q", "q -> p")).toBe(false);
  });
  it("compares formulas over the union of their variables", () => {
    expect(same("p | (q & ~q)", "p")).toBe(true);
    expect(same("p", "p & r")).toBe(false);
  });
  it("forms the negation, converse, inverse and contrapositive of an implication", () => {
    const f = parseLogic("(p & ~q) -> r");
    expect(equivalent(transform(f, "negation"), parseLogic("p & ~q & ~r"))).toBe(true);
    expect(equivalent(transform(f, "converse"), parseLogic("r -> (p & ~q)"))).toBe(true);
    // MHT-CET: the converse of [p ∧ (∼q)] → r is (∼p ∨ q) → ∼r (its contrapositive form).
    expect(equivalent(transform(f, "converse"), parseLogic("(~p | q) -> ~r"))).toBe(true);
    expect(equivalent(transform(f, "inverse"), parseLogic("~(p & ~q) -> ~r"))).toBe(true);
    expect(equivalent(transform(f, "contrapositive"), parseLogic("~r -> ~(p & ~q)"))).toBe(true);
  });
  it("reads a disjunction as an implication from its negated left side", () => {
    // MHT-CET: the contrapositive of ∼p ∨ (q ∧ ∼r) is (r ∨ ∼q) → ∼p.
    expect(equivalent(transform(parseLogic("~p | (q & ~r)"), "contrapositive"), parseLogic("(r | ~q) -> ~p"))).toBe(true);
  });
  it("forms the dual: implications removed, then and/or and T/F swapped", () => {
    // MHT-CET: ∼p → ∼(∼p → q) is p ∨ (∼p ∧ ∼q), so its dual is p ∧ (∼p ∨ ∼q), the key's p ∧ (p → ∼q).
    expect(equivalent(transform(parseLogic("~p -> ~(~p -> q)"), "dual"), parseLogic("p & (p -> ~q)"))).toBe(true);
    expect(equivalent(transform(parseLogic("p & T"), "dual"), parseLogic("p | F"))).toBe(true);
  });
  it("refuses a converse of something that is not an implication or a disjunction", () => {
    expect(() => transform(parseLogic("p & q"), "converse")).toThrow();
    expect(() => transform(parseLogic("p <-> q"), "contrapositive")).toThrow();
  });
});

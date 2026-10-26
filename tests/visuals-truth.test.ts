import { describe, expect, it } from "vitest";
import { getScene } from "@/lib/visuals/registry";
import { truthFacts } from "@/lib/visuals/scenes/truthTable";
import type { Shape } from "@/lib/visuals/types";

const scene = () => getScene("truthTable")!;
function parse(raw: unknown) {
  const p = scene().parse(raw);
  if (p && typeof p === "object" && "error" in (p as object)) throw new Error(String((p as { error: string }).error));
  return p;
}
const value = (raw: unknown) => scene().check(parse(raw));
const parseError = (raw: unknown) => ((scene().parse(raw) as { error?: string }).error ?? "");

describe("truthTable answers", () => {
  it("confirms an equivalence and rejects a non-equivalence", () => {
    // MHT-CET: ∼[(p → ∼q) ∧ (∼q ∨ p)] is equivalent to q.
    expect(value({ ask: { kind: "equivalent", a: "~((p -> ~q) & (~q | p))", b: "q" } })).toBe(1);
    expect(value({ ask: { kind: "equivalent", a: "~((p -> ~q) & (~q | p))", b: "p" } })).toBe(0);
  });
  it("classifies a statement pattern", () => {
    const f = "((p & q) -> (~p | r)) | ((~p | r) -> (p & q))";
    expect(value({ ask: { kind: "classify", f, expect: "tautology" } })).toBe(1);
    expect(value({ ask: { kind: "classify", f, expect: "contingency" } })).toBe(0);
  });
  it("finds the only row where a statement takes a value", () => {
    // MHT-CET: (p ∧ ∼r) → (∼p ∨ q) is false only when p, q, r are T, F, F.
    const f = "(p & ~r) -> (~p | q)";
    expect(value({ ask: { kind: "solve", f, value: false, expect: { p: true, q: false, r: false } } })).toBe(1);
    expect(value({ ask: { kind: "solve", f, value: false, expect: { p: true, q: true, r: false } } })).toBe(0);
  });
  it("refuses a solve whose rows disagree on the keyed letters", () => {
    // p ∧ q is false on three rows, so 'p is T, q is F' is not forced.
    expect(value({ ask: { kind: "solve", f: "p & q", value: false, expect: { p: true, q: false } } })).toBe(0);
    // ...but every row where p → q is false has p = T.
    expect(value({ ask: { kind: "solve", f: "p -> q", value: false, expect: { p: true } } })).toBe(1);
  });
  it("evaluates statements at given truth values", () => {
    const at = { p: true, q: true, r: false, s: false };
    expect(value({ ask: { kind: "evaluate", at, f: ["p & r", "~q | s", "p -> r"], expect: [false, false, false] } })).toBe(1);
    expect(value({ ask: { kind: "evaluate", at, f: ["p & r", "p | r"], expect: [false, false] } })).toBe(0);
  });
  it("checks a negation, converse, contrapositive or dual against the keyed statement", () => {
    // MHT-CET: the contrapositive of ∼p ∨ (q ∧ ∼r) is (r ∨ ∼q) → ∼p.
    expect(value({ ask: { kind: "transform", of: "~p | (q & ~r)", op: "contrapositive", equals: "(r | ~q) -> ~p" } })).toBe(1);
    expect(value({ ask: { kind: "transform", of: "(p & q) -> (~p | r)", op: "negation", equals: "p & q & ~r" } })).toBe(1);
    expect(value({ ask: { kind: "transform", of: "(p & q) -> (~p | r)", op: "negation", equals: "p & q & r" } })).toBe(0);
  });
});

describe("truthTable refuses what it cannot draw honestly", () => {
  it("refuses a bad formula, an unknown ask, more than 4 letters and a table too wide", () => {
    expect(parseError({ ask: { kind: "equivalent", a: "p &", b: "q" } })).toMatch(/a/);
    expect(parseError({ ask: { kind: "guess" } })).toMatch(/ask/);
    expect(parseError({ ask: { kind: "classify", f: "p & q & r & s & t", expect: "contingency" } })).toMatch(/letters/);
    const long = "((p -> q) & (q -> r)) -> ((p -> r) | (q <-> ~p))";
    const five = [long, `${long} & p`, `${long} & q`, `${long} | p`, `${long} | q`];
    expect(parseError({ columns: five.map((f, i) => ({ f, label: `a long column label ${i}` })), ask: { kind: "classify", f: "p", expect: "contingency" } })).toMatch(/wide/);
  });
  it("refuses a solve with a letter the statement does not have, and a transform it cannot form", () => {
    expect(parseError({ ask: { kind: "solve", f: "p -> q", value: false, expect: { r: true } } })).toMatch(/r/);
    expect(parseError({ ask: { kind: "transform", of: "p & q", op: "converse", equals: "q & p" } })).toMatch(/converse/);
  });
});

describe("truthTable drawing", () => {
  const raw = { columns: [{ f: "~r" }, { f: "p & ~r" }, { f: "~p | q" }], ask: { kind: "solve", f: "(p & ~r) -> (~p | q)", value: false, expect: { p: true, q: false, r: false } } };
  const cells = (played: string[], t = 1) =>
    scene()
      .frame(parse(raw), { played, t, slider: undefined })
      .filter((s): s is Extract<Shape, { kind: "text" }> => s.kind === "text" && (s.text === "T" || s.text === "F"));
  it("has one row per assignment and one column per letter and statement", () => {
    const f = truthFacts(parse(raw));
    expect(f.vars).toEqual(["p", "q", "r"]);
    expect(f.rows).toHaveLength(8);
    // The asked statement is added as the last column.
    expect(f.columns.map((c) => c.label)).toEqual(["∼r", "p ∧ ∼r", "∼p ∨ q", "(p ∧ ∼r) → (∼p ∨ q)"]);
  });
  it("wraps a long heading onto two lines at its main connective, so the table stays phone-width", () => {
    const wide = { columns: [{ f: "(~p | q) -> (p | ~q)" }, { f: "(p & ~q) -> (~p & q)" }], ask: { kind: "equivalent", a: "(~p | q) -> (p | ~q)", b: "(p & ~q) -> (~p & q)" } };
    const p = parse(wide);
    const heads = scene().frame(p, { played: ["vars"], t: 1, slider: undefined }).filter((s): s is Extract<Shape, { kind: "text" }> => s.kind === "text" && s.tone === "amber").map((s) => s.text);
    expect(heads).toContain("(∼p ∨ q) →");
    expect(heads).toContain("(p ∨ ∼q)");
    expect(scene().viewBox(p).w).toBeLessThanOrEqual(440);
  });
  it("fills the letters first, then the statements column by column", () => {
    expect(cells(["vars"])).toHaveLength(24);
    expect(cells(["vars", "columns"], 0.5)).toHaveLength(24 + 16);
    expect(cells(["vars", "columns"])).toHaveLength(24 + 32);
  });
  it("fills the whole table when a later beat plays without an earlier one", () => {
    // A step list that goes straight from the letters (or nothing) to the answer still shows every value.
    expect(cells(["vars", "answer"])).toHaveLength(24 + 32);
    expect(cells(["answer"])).toHaveLength(24 + 32);
    expect(cells(["columns"])).toHaveLength(24 + 32);
  });
  it("highlights the answer row and names it once the answer plays", () => {
    const shapes = (played: string[]) => scene().frame(parse(raw), { played, t: 1, slider: undefined });
    const lit = (played: string[]) => shapes(played).filter((s) => s.kind === "rect" && s.fill === "goodSoft");
    expect(lit(["vars", "columns"])).toHaveLength(0);
    expect(lit(["vars", "columns", "answer"])).toHaveLength(1);
    expect(shapes(["vars", "columns", "answer"]).some((s) => s.kind === "text" && /T, F, F/.test(s.text))).toBe(true);
  });
});

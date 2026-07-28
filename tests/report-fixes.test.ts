import { describe, expect, it } from "vitest";
import { planFix, type QuestionState, type Fix } from "../scripts/reports/fixes";

const base = (): QuestionState => ({
  text: "Stem here",
  context: null,
  solution: "Old solution",
  options: [
    { label: "A", text: "one", is_correct: false },
    { label: "B", text: "two", is_correct: true },
    { label: "C", text: "three", is_correct: false },
    { label: "D", text: "four", is_correct: false },
  ],
});

const fix = (over: Partial<Fix> = {}): Fix => ({
  id: "q1",
  label: "Q1",
  reason: "test",
  ...over,
});

describe("planFix", () => {
  it("is a no-op when the fix restates current values (idempotent re-run)", () => {
    const p = planFix(base(), fix({ text: "Stem here", options: { A: "one" } }));
    expect(p.isNoop).toBe(true);
    expect(p.needsRehash).toBe(false);
    expect(p.changed).toEqual([]);
  });

  it("flags a rehash when the stem changes", () => {
    const p = planFix(base(), fix({ text: "New stem" }));
    expect(p.finalText).toBe("New stem");
    expect(p.needsRehash).toBe(true);
    expect(p.changed).toContain("text");
  });

  it("flags a rehash when an option text changes, and leaves others alone", () => {
    const p = planFix(base(), fix({ options: { C: "THREE" } }));
    expect(p.needsRehash).toBe(true);
    expect(p.finalOptions.map((o) => o.text)).toEqual(["one", "two", "THREE", "four"]);
    expect(p.changed).toContain("option:C");
  });

  it("does NOT flag a rehash for a context-only edit (context is not in contentHash)", () => {
    const p = planFix(base(), fix({ context: "Shared instruction" }));
    expect(p.needsRehash).toBe(false);
    expect(p.isNoop).toBe(false);
    expect(p.changed).toEqual(["context"]);
  });

  it("does NOT flag a rehash for a solution-only edit", () => {
    const p = planFix(base(), fix({ solution: "Rewritten" }));
    expect(p.needsRehash).toBe(false);
    expect(p.changed).toEqual(["solution"]);
  });

  it("moves the key and flags a rehash (the answer is part of contentHash)", () => {
    const p = planFix(base(), fix({ correct: "D" }));
    expect(p.finalCorrect).toBe("D");
    expect(p.needsRehash).toBe(true);
    expect(p.finalOptions.find((o) => o.label === "D")!.is_correct).toBe(true);
    expect(p.finalOptions.filter((o) => o.is_correct)).toHaveLength(1);
  });

  it("keeps the existing key when the fix does not name one", () => {
    const p = planFix(base(), fix({ text: "New stem" }));
    expect(p.finalCorrect).toBe("B");
  });

  it("reports a problem when the named correct label does not exist", () => {
    const p = planFix(base(), fix({ correct: "E" }));
    expect(p.problems.join()).toMatch(/correct label E/i);
  });

  it("reports a problem when an option edit would duplicate another option", () => {
    const p = planFix(base(), fix({ options: { A: "two" } }));
    expect(p.problems.join()).toMatch(/duplicate/i);
  });

  it("reports a problem when the fix names an option label that does not exist", () => {
    const p = planFix(base(), fix({ options: { Z: "nope" } }));
    expect(p.problems.join()).toMatch(/unknown option label Z/i);
  });

  it("reports a problem when a row has no correct option and none is named", () => {
    const s = base();
    s.options = s.options.map((o) => ({ ...o, is_correct: false }));
    const p = planFix(s, fix({ text: "New stem" }));
    expect(p.problems.join()).toMatch(/no correct option/i);
  });

  it("allows clearing context to null", () => {
    const s = base();
    s.context = "something";
    const p = planFix(s, fix({ context: null }));
    expect(p.finalContext).toBeNull();
    expect(p.changed).toEqual(["context"]);
  });

  it("handles a subjective row (zero options) without inventing a key", () => {
    const s: QuestionState = { text: "Prove it", context: null, solution: "old", options: [] };
    const p = planFix(s, fix({ solution: "new" }));
    expect(p.problems).toEqual([]);
    expect(p.finalCorrect).toBeNull();
    expect(p.needsRehash).toBe(false);
  });
});

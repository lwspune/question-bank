import { describe, expect, it } from "vitest";
import { buildMcqVerifyInputs } from "../src/lib/reviews/emit";

// 2026-11-17 (SUGGESTIONS 2026-09-09): withholding the key does not make a pass
// blind when the same context produced the answer. A verify run records
// blind_rederivation only when its verifier is DECLARED independent; otherwise
// the weaker solution_audit, which does not suppress a later genuine blind pass.
const rows = [
  { id: "q1", ref: "Ex 1", derived_answer: "B", matches_current: true },
  { id: "q2", ref: "Ex 2", derived_answer: "C", matches_current: false },
  { id: "q3", ref: "Ex 3", derived_answer: "A", matches_current: true },
];
const hashes = new Map([["q1", "h1"], ["q2", "h2"], ["q3", "h3"]]);

describe("buildMcqVerifyInputs", () => {
  it("records agreeing rows only", () => {
    const inputs = buildMcqVerifyInputs(rows, hashes, "run", { independentVerifier: true });
    expect(inputs.map((i) => i.questionId)).toEqual(["q1", "q3"]);
  });

  it("records blind_rederivation for a declared independent verifier", () => {
    const inputs = buildMcqVerifyInputs(rows, hashes, "run", { independentVerifier: true });
    expect(inputs.every((i) => i.method === "blind_rederivation")).toBe(true);
  });

  it("records the weaker solution_audit when independence is not declared", () => {
    const inputs = buildMcqVerifyInputs(rows, hashes, "run", {});
    expect(inputs.every((i) => i.method === "solution_audit")).toBe(true);
    expect(inputs[0].note).toMatch(/not declared independent/);
  });

  it("skips a row whose question is no longer in the bank", () => {
    const inputs = buildMcqVerifyInputs(rows, new Map([["q1", "h1"]]), "run", { independentVerifier: true });
    expect(inputs.map((i) => i.questionId)).toEqual(["q1"]);
  });
});

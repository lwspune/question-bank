import { describe, expect, it } from "vitest";
import {
  auditSolution,
  hasMathMarkup,
  maskMath,
  stripProvenance,
} from "../scripts/cds-maths/solutionText";

const PROV =
  " [Derived answer — this booklet carries no official key. Two independent blind derivations agreed; confidence: HIGH.]";

describe("stripProvenance", () => {
  it("removes the appended provenance clause", () => {
    expect(stripProvenance("The answer is 7." + PROV)).toBe("The answer is 7.");
  });

  it("leaves a solution with no provenance clause alone", () => {
    expect(stripProvenance("The answer is 7.")).toBe("The answer is 7.");
  });

  it("does NOT eat a mid-sentence bracket", () => {
    // Only a trailing clause is provenance; an interval like [-1, 1] must survive.
    const s = "sin lies in [-1, 1] so nothing vanishes.";
    expect(stripProvenance(s)).toBe(s);
  });
});

describe("maskMath", () => {
  it("blanks inline math zones so prose probes cannot fire inside them", () => {
    const out = maskMath("value \\(\\pi r^2\\) here");
    expect(out).not.toContain("pi");
    expect(out).toContain("value");
    expect(out).toContain("here");
    expect(out.length).toBe("value \\(\\pi r^2\\) here".length);
  });

  it("is a no-op when there is no math", () => {
    expect(maskMath("plain text")).toBe("plain text");
  });
});

describe("auditSolution — jargon", () => {
  it("flags a runner-up note, which is a reviewer-only field", () => {
    const f = auditSolution("The answer is B. RUNNER-UP: option C, if the interval were closed." + PROV);
    expect(f.some((x) => x.kind === "JARGON" && /runner-up/i.test(x.detail))).toBe(true);
  });

  it("flags adjudication and pass-disagreement language", () => {
    const f = auditSolution("ADJUDICATED BY HAND -- the two blind passes DISAGREED here." + PROV);
    expect(f.filter((x) => x.kind === "JARGON").length).toBeGreaterThanOrEqual(2);
  });

  it("flags naming the CAS", () => {
    const f = auditSolution("Verified with sympy's Poly coefficients." + PROV);
    expect(f.some((x) => x.kind === "JARGON" && /CAS/.test(x.detail))).toBe(true);
  });

  it("does NOT flag the provenance clause itself, which legitimately says 'blind derivations' and 'confidence:'", () => {
    // This is the load-bearing case: the disclosure is deliberate and must survive.
    const f = auditSolution("Half-chord is 12, so the distance is 16." + PROV);
    expect(f.filter((x) => x.kind === "JARGON")).toEqual([]);
  });
});

describe("auditSolution — ASCII maths", () => {
  it("flags a solution written entirely in ASCII as NO_MATH_MARKUP", () => {
    const f = auditSolution("The product vanishes only if sin alpha equals -2." + PROV);
    expect(f.some((x) => x.kind === "NO_MATH_MARKUP")).toBe(true);
  });

  it("flags ASCII leaking into a solution that DOES use LaTeX elsewhere", () => {
    const f = auditSolution("We know \\(x = 2\\), and sqrt(16) = 4." + PROV);
    expect(f.some((x) => x.kind === "ASCII_MATH")).toBe(true);
  });

  it("does NOT fire on properly typeset maths", () => {
    const f = auditSolution("Area is \\(\\pi r^2\\) with \\(\\theta = 30^\\circ\\), so \\(A = 4\\pi\\)." + PROV);
    expect(f).toEqual([]);
  });

  it("word-anchors: 'pi' must not match inside 'pipe', 'mu' not inside 'must'", () => {
    // A previous probe in this repo matched `cement` inside `displacement`.
    const f = auditSolution("Water flows through the pipe and the sum must be 12 rupees." + PROV);
    expect(f.filter((x) => x.kind === "ASCII_MATH" || x.kind === "NO_MATH_MARKUP")).toEqual([]);
  });

  it("a pure-prose answer with no maths at all is NOT flagged", () => {
    // Data-sufficiency answers legitimately carry no formula.
    const f = auditSolution("Statement I alone fixes the value; Statement II does not." + PROV);
    expect(f).toEqual([]);
  });
});

describe("hasMathMarkup", () => {
  it("detects inline and display zones", () => {
    expect(hasMathMarkup("a \\(x\\) b")).toBe(true);
    expect(hasMathMarkup("a \\[x\\] b")).toBe(true);
    expect(hasMathMarkup("no maths here")).toBe(false);
  });
});

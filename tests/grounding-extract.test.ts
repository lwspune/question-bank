import { describe, it, expect } from "vitest";
import {
  latexToPlainText,
  parseModelJson,
  validateSolutionJson,
  detectKeyMismatch,
  needsGrounding,
  needsEmbedding,
  correctOptionLabel,
  type SolutionJson,
} from "../scripts/grounding/lib";

describe("latexToPlainText", () => {
  it("drops inline math delimiters, keeping the inner content", () => {
    expect(latexToPlainText("The value \\(x\\) is positive.")).toBe("The value x is positive.");
  });

  it("drops display math delimiters", () => {
    expect(latexToPlainText("\\[x + 1\\]")).toBe("x + 1");
  });

  it("collapses \\frac{a}{b} to a/b", () => {
    expect(latexToPlainText("\\(\\frac{a}{b}\\)")).toBe("a/b");
  });

  it("renders \\sqrt{x} as sqrt(x)", () => {
    expect(latexToPlainText("\\sqrt{2}")).toBe("sqrt(2)");
  });

  it("maps \\times and \\cdot to *", () => {
    expect(latexToPlainText("a \\times b \\cdot c")).toBe("a * b * c");
  });

  it("unwraps \\left( ... \\right)", () => {
    expect(latexToPlainText("\\left(x\\right)")).toBe("(x)");
  });

  it("collapses runs of whitespace and trims", () => {
    expect(latexToPlainText("  a   b \n c  ")).toBe("a b c");
  });

  it("preserves function/operator command NAMES instead of deleting them", () => {
    expect(latexToPlainText("\\log x")).toBe("log x");
    expect(latexToPlainText("\\(\\int \\sin x \\, dx\\)")).toBe("int sin x dx");
  });

  it("separates adjacent commands so they don't glue", () => {
    expect(latexToPlainText("\\cos\\theta")).toBe("cos theta");
  });

  it("strips matrix environment wrappers, keeping the entries", () => {
    expect(latexToPlainText("\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}")).toBe("1 2 3 4");
  });

  it("strips formatting wrappers but keeps their content", () => {
    expect(latexToPlainText("\\text{hello} \\mathbf{x}")).toBe("hello x");
  });
});

describe("parseModelJson", () => {
  it("parses a bare JSON object", () => {
    expect(parseModelJson('{"a":1}')).toEqual({ a: 1 });
  });

  it("strips a ```json fence before parsing", () => {
    expect(parseModelJson('```json\n{"a":1}\n```')).toEqual({ a: 1 });
  });

  it("strips a bare ``` fence before parsing", () => {
    expect(parseModelJson('```\n{"a":1}\n```')).toEqual({ a: 1 });
  });

  it("throws on non-JSON content", () => {
    expect(() => parseModelJson("sorry, I cannot help with that")).toThrow();
  });
});

describe("validateSolutionJson", () => {
  const valid: SolutionJson = {
    approach: "Use Vieta's relations.",
    steps: ["sum of roots = -b/a", "product = c/a"],
    final_answer: "3/4",
    option_matched: "B",
  };

  it("accepts a well-formed solution and returns it typed", () => {
    expect(validateSolutionJson(valid)).toEqual(valid);
  });

  it("allows option_matched = null (undeterminable)", () => {
    expect(validateSolutionJson({ ...valid, option_matched: null }).option_matched).toBeNull();
  });

  it("rejects a missing steps array", () => {
    const { steps, ...rest } = valid;
    void steps;
    expect(() => validateSolutionJson(rest)).toThrow();
  });

  it("rejects an option_matched outside A|B|C|D|null", () => {
    expect(() => validateSolutionJson({ ...valid, option_matched: "E" })).toThrow();
  });

  it("rejects steps that are not strings", () => {
    expect(() => validateSolutionJson({ ...valid, steps: [1, 2] })).toThrow();
  });
});

describe("detectKeyMismatch", () => {
  it("flags a genuine disagreement", () => {
    expect(detectKeyMismatch("A", "B")).toBe(true);
  });

  it("does not flag agreement", () => {
    expect(detectKeyMismatch("B", "B")).toBe(false);
  });

  it("treats a null re-derivation as undeterminable, not a mismatch", () => {
    expect(detectKeyMismatch(null, "B")).toBe(false);
  });
});

describe("needsGrounding", () => {
  it("is true when plain_text is null", () => {
    expect(needsGrounding({ plain_text: null })).toBe(true);
  });

  it("is true when plain_text is empty/whitespace", () => {
    expect(needsGrounding({ plain_text: "   " })).toBe(true);
  });

  it("is false when plain_text is present", () => {
    expect(needsGrounding({ plain_text: "the value x is positive" })).toBe(false);
  });
});

describe("correctOptionLabel", () => {
  it("returns the label of the is_correct option", () => {
    expect(
      correctOptionLabel([
        { label: "A", is_correct: false },
        { label: "B", is_correct: true },
        { label: "C", is_correct: false },
      ]),
    ).toBe("B");
  });

  it("returns null when no option is correct", () => {
    expect(
      correctOptionLabel([
        { label: "A", is_correct: false },
        { label: "B", is_correct: false },
      ]),
    ).toBeNull();
  });

  it("returns the first correct label when several are flagged", () => {
    expect(
      correctOptionLabel([
        { label: "A", is_correct: true },
        { label: "B", is_correct: true },
      ]),
    ).toBe("A");
  });
});

describe("needsEmbedding", () => {
  it("is true when embedding is null", () => {
    expect(needsEmbedding({ embedding: null })).toBe(true);
  });

  it("is false when embedding is present", () => {
    expect(needsEmbedding({ embedding: [0.1, 0.2, 0.3] })).toBe(false);
  });
});

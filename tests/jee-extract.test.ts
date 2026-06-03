import { describe, it, expect } from "vitest";
import {
  cleanText,
  parseAnswerKey,
  parseAnswerTokens,
  localSection,
  matchValueToOption,
  splitSolutions,
  parseOptionsFromText,
  segmentQuestions,
  normalizeMathFunctions,
} from "../scripts/jee/lib";

describe("cleanText", () => {
  it("strips bold markers", () => {
    expect(cleanText("**Four identical particles**")).toBe("Four identical particles");
  });

  it("unescapes pandoc literal parens/brackets", () => {
    expect(cleanText("\\(a\\) 0")).toBe("(a) 0");
    expect(cleanText("\\[x\\]")).toBe("[x]");
  });

  it("converts inline $...$ to \\(...\\)", () => {
    expect(cleanText("$8:1$")).toBe("\\(8:1\\)");
  });

  it("converts display $$...$$ to \\[...\\]", () => {
    expect(cleanText("$$\\Rightarrow w = 0$$")).toBe("\\[\\Rightarrow w = 0\\]");
  });

  it("strips \\mathbf{} wrappers inside math, keeping subscripts", () => {
    expect(cleanText("$\\mathbf{S}_{\\mathbf{1}}$")).toBe("\\(S_{1}\\)");
  });

  it("preserves a real fraction/root answer faithfully", () => {
    expect(cleanText("$\\frac{\\sqrt{(1 + 2\\sqrt{2})G}}{2}$")).toBe(
      "\\(\\frac{\\sqrt{(1 + 2\\sqrt{2})G}}{2}\\)"
    );
  });

  it("collapses whitespace and trims", () => {
    expect(cleanText("  a   b\n c  ")).toBe("a b c");
  });

  it("de-glues macros that ran into a following letter (OMML adjacency)", () => {
    expect(cleanText("$\\betat^{2}$")).toBe("\\(\\beta t^{2}\\)");
    expect(cleanText("$T+\\DeltaT$")).toBe("\\(T+\\Delta T\\)");
    expect(cleanText("$A\\rightarrowH$")).toBe("\\(A\\rightarrow H\\)");
    expect(cleanText("$\\lbrackx\\rbrack$")).toBe("\\(\\lbrack x\\rbrack\\)");
  });

  it("does not split operator names or arg-taking macros", () => {
    expect(cleanText("$\\sin x + \\cos y$")).toBe("\\(\\sin x + \\cos y\\)");
    expect(cleanText("$\\frac{a}{b}$")).toBe("\\(\\frac{a}{b}\\)");
  });

  it("removes \\mspace / \\hspace artifacts", () => {
    expect(cleanText("$a\\mspace{2mu}b$")).toBe("\\(a b\\)");
  });

  it("strips image markdown (incl. multi-line attributes) from prose", () => {
    expect(cleanText('before ![](media/image20.png){width="6.04in" height="0.93in"} after')).toBe("before after");
    expect(cleanText("![](media/img.png){width=\"2in\"\nheight=\"1in\"} tail")).toBe("tail");
  });

  it("strips pandoc <!-- --> separators", () => {
    expect(cleanText("step one <!-- --> step two")).toBe("step one step two");
  });
});

describe("parseAnswerKey", () => {
  it("maps question number to uppercase answer letter", () => {
    const md = `1.  **(a)**

something

2.  **(a)** We know that

3.  **(d)**

more`;
    const key = parseAnswerKey(md);
    expect(key.get(1)).toBe("A");
    expect(key.get(2)).toBe("A");
    expect(key.get(3)).toBe("D");
    expect(key.size).toBe(3);
  });
});

describe("parseAnswerTokens", () => {
  it("captures the raw token (letter OR value) per question", () => {
    const md = `1.  **(a)** x

62. **(1625)**

63. **(c)** y`;
    const t = parseAnswerTokens(md);
    expect(t.get(1)).toBe("a");
    expect(t.get(62)).toBe("1625");
    expect(t.get(63)).toBe("c");
  });
});

describe("localSection", () => {
  it("maps the first 20 of each 30-block part to A, last 10 to B", () => {
    expect(localSection(1)).toBe("A");
    expect(localSection(20)).toBe("A");
    expect(localSection(21)).toBe("B");
    expect(localSection(30)).toBe("B");
    expect(localSection(55)).toBe("B"); // chemistry numerical count
    expect(localSection(62)).toBe("A"); // maths MCQ
    expect(localSection(81)).toBe("B");
  });
});

describe("matchValueToOption", () => {
  const opts = ["560", "1050", "\\(1625\\)", "575"];
  it("maps a value token to the matching option label", () => {
    expect(matchValueToOption("1625", opts)).toBe("C");
    expect(matchValueToOption("560", opts)).toBe("A");
  });
  it("returns null when no option matches", () => {
    expect(matchValueToOption("999", opts)).toBeNull();
  });
});

describe("splitSolutions", () => {
  it("captures the worked text per question number", () => {
    const md = `1.  **(a)** first line

$$x = 1$$

2.  **(b)** second`;
    const sols = splitSolutions(md);
    expect(sols.get(1)).toContain("first line");
    expect(sols.get(1)).toContain("\\[x = 1\\]");
    expect(sols.get(1)).not.toContain("second");
    expect(sols.get(2)).toContain("second");
  });

  it("captures solutions whose header is a value answer, not a letter", () => {
    const md = `61.  **(b)** letter answer

62. **(1625)** value answer here

63. **(c)** next`;
    const sols = splitSolutions(md);
    expect(sols.get(62)).toContain("value answer here");
    expect(sols.get(62)).not.toContain("next");
  });
});

describe("parseOptionsFromText", () => {
  it("splits 4 options on one line and returns the stem", () => {
    const res = parseOptionsFromText("The ratio is - (a) \\(8:1\\) (b) \\(1:8\\) (c) 2:1 (d) \\(1:4\\)");
    expect(res).not.toBeNull();
    expect(res!.stem).toBe("The ratio is -");
    expect(res!.options).toEqual(["\\(8:1\\)", "\\(1:8\\)", "2:1", "\\(1:4\\)"]);
  });

  it("handles a missing space after the marker", () => {
    const res = parseOptionsFromText("Total work is - (a) 0 (b)nRT (c)nRTln2 (d) nRT-1");
    expect(res!.options).toEqual(["0", "nRT", "nRTln2", "nRT-1"]);
  });

  it("does not mistake math \\(...\\) for an option marker", () => {
    const res = parseOptionsFromText("Find \\(a\\) value (a) one (b) two (c) three (d) four");
    expect(res!.options).toEqual(["one", "two", "three", "four"]);
  });

  it("returns null when 4 ordered markers are absent (numerical question)", () => {
    expect(parseOptionsFromText("Calculate the quality factor of this resonator is")).toBeNull();
  });
});

describe("normalizeMathFunctions", () => {
  it("upgrades a bare function glued to a variable, inserting a space", () => {
    expect(normalizeMathFunctions("\\(logn\\)")).toBe("\\(\\log n\\)");
    expect(normalizeMathFunctions("\\(2sinx\\)")).toBe("\\(2\\sin x\\)");
  });

  it("upgrades a bare function followed by a non-letter without adding a space", () => {
    expect(normalizeMathFunctions("\\(cos45^{\\circ}\\)")).toBe("\\(\\cos45^{\\circ}\\)");
    expect(normalizeMathFunctions("\\(log\\frac{1}{n}\\)")).toBe("\\(\\log\\frac{1}{n}\\)");
  });

  it("is idempotent on already-correct macros", () => {
    expect(normalizeMathFunctions("\\(\\sin x\\)")).toBe("\\(\\sin x\\)");
    expect(normalizeMathFunctions("\\(\\lim_{x\\to0}\\)")).toBe("\\(\\lim_{x\\to0}\\)");
  });

  it("does not split longer function names (sinh/cosh/tanh)", () => {
    expect(normalizeMathFunctions("\\(tanh y\\)")).toBe("\\(\\tanh y\\)");
    expect(normalizeMathFunctions("\\(\\cosh x\\)")).toBe("\\(\\cosh x\\)");
  });

  it("maps cosec to \\csc", () => {
    expect(normalizeMathFunctions("\\(cosec\\theta\\)")).toBe("\\(\\csc\\theta\\)");
  });

  it("leaves prose (outside math zones) untouched", () => {
    expect(normalizeMathFunctions("read the log table and sin curve")).toBe("read the log table and sin curve");
  });

  it("handles a full expression with several functions", () => {
    expect(normalizeMathFunctions("\\[\\frac{2sinx}{sinx+\\sqrt{3}cosx}\\]")).toBe(
      "\\[\\frac{2\\sin x}{\\sin x+\\sqrt{3}\\cos x}\\]"
    );
  });
});

describe("segmentQuestions", () => {
  const md = `> **PART-I PHYSICS**
>
> **SECTION-A**

1.  **First physics question is here -**\\
    (a) $1$ (b) $2$\\
    (c) $3$ (d) $4$

<!-- -->

2.  **Second with a figure -**

![](media/media/image1.jpeg){width="2in" height="2in"}

(a) one (b) two (c) three (d) four

> **SECTION-B**

21. **A numerical question with no options here**

> **PART-II CHEMISTRY**
>
> **SECTION - A**

31. **A chemistry MCQ -**\\
    (a) p (b) q (c) r (d) s`;

  const qs = segmentQuestions(md);

  it("segments all numbered blocks", () => {
    expect(qs.map((q) => q.number)).toEqual([1, 2, 21, 31]);
  });

  it("assigns subject from the PART marker", () => {
    expect(qs.find((q) => q.number === 1)!.subject).toBe("Physics");
    expect(qs.find((q) => q.number === 31)!.subject).toBe("Chemistry");
  });

  it("parses 4 options for MCQs and null for numericals", () => {
    expect(qs.find((q) => q.number === 1)!.options).toEqual([
      "\\(1\\)",
      "\\(2\\)",
      "\\(3\\)",
      "\\(4\\)",
    ]);
    expect(qs.find((q) => q.number === 21)!.options).toBeNull();
  });

  it("captures image refs in a block", () => {
    expect(qs.find((q) => q.number === 2)!.imageRefs).toEqual(["media/media/image1.jpeg"]);
  });
});

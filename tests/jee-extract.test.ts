import { describe, it, expect } from "vitest";
import {
  cleanText,
  parseAnswerKey,
  parseAnswerTokens,
  findDuplicateSolutionNumbers,
  localSection,
  subjectForNumber,
  parseAnswerTokensOrdered,
  splitSolutionsOrdered,
  solnNumberingIsBroken,
  matchValueToOption,
  gridTableToPipe,
  splitSolutions,
  parseOptionsFromText,
  segmentQuestions,
  dropProseHardBreaks,
} from "../scripts/jee/lib";
import { isCommittable } from "../scripts/jee/config";
import { subtopicNameFrom } from "../scripts/jee/promote-gaps";
import {
  normalizeMathFunctions,
  keepForSubject,
  parseSubjectArg,
  parseNumericAnswer,
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

  it("strips a leaked trailing hard-break backslash but keeps math closes", () => {
    expect(cleanText("S stands for :\\")).toBe("S stands for :");
    expect(cleanText("the value is $x$")).toBe("the value is \\(x\\)"); // trailing \) kept
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

  it("tolerates a leaked hard-break backslash before the closing ** (2026 pandoc: `**(c)\\**`)", () => {
    const md = `4.  **(d)\\**

61. **(c)\\**

24. **(16)\\**`;
    const t = parseAnswerTokens(md);
    expect(t.get(4)).toBe("d");
    expect(t.get(61)).toBe("c");
    expect(t.get(24)).toBe("16");
    const key = parseAnswerKey(md);
    expect(key.get(4)).toBe("D");
    expect(key.get(61)).toBe("C");
  });
});

describe("findDuplicateSolutionNumbers", () => {
  it("flags a number that appears more than once (mis-numbered soln block)", () => {
    const md = `1.  **(b)** zener explanation

1.  **(a)**

3.  **(b)** next`;
    expect(findDuplicateSolutionNumbers(md)).toEqual([1]);
  });

  it("returns empty when all solution numbers are unique", () => {
    expect(findDuplicateSolutionNumbers("1.  **(a)**\n\n2.  **(b)**")).toEqual([]);
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
  it("2025 layout (subjectSize 25): first 20 of each 25-block part to A, last 5 to B", () => {
    expect(localSection(51, 25)).toBe("A"); // maths shift-1 MCQ start
    expect(localSection(70, 25)).toBe("A");
    expect(localSection(71, 25)).toBe("B"); // maths shift-1 NAT start
    expect(localSection(75, 25)).toBe("B");
    expect(localSection(126, 25)).toBe("A"); // maths shift-2 MCQ start
    expect(localSection(146, 25)).toBe("B");
  });
});

describe("subjectForNumber", () => {
  it("maps the continuous 1-90 numbering to Physics/Chemistry/Maths", () => {
    expect(subjectForNumber(1)).toBe("Physics");
    expect(subjectForNumber(30)).toBe("Physics");
    expect(subjectForNumber(31)).toBe("Chemistry");
    expect(subjectForNumber(60)).toBe("Chemistry");
    expect(subjectForNumber(61)).toBe("Maths");
    expect(subjectForNumber(90)).toBe("Maths");
  });
  it("wraps a 2-shift (180-block) file per 90 — shift 2 repeats the subject blocks", () => {
    expect(subjectForNumber(91)).toBe("Physics"); // shift 2 Physics
    expect(subjectForNumber(120)).toBe("Physics");
    expect(subjectForNumber(121)).toBe("Chemistry");
    expect(subjectForNumber(150)).toBe("Chemistry");
    expect(subjectForNumber(151)).toBe("Maths"); // shift 2 Maths
    expect(subjectForNumber(180)).toBe("Maths");
  });
  it("2025 layout (shiftSize 75): 25-block subjects, 2 shifts = 150", () => {
    expect(subjectForNumber(1, 75)).toBe("Physics");
    expect(subjectForNumber(25, 75)).toBe("Physics");
    expect(subjectForNumber(26, 75)).toBe("Chemistry");
    expect(subjectForNumber(50, 75)).toBe("Chemistry");
    expect(subjectForNumber(51, 75)).toBe("Maths");
    expect(subjectForNumber(75, 75)).toBe("Maths");
    expect(subjectForNumber(76, 75)).toBe("Physics"); // shift 2
    expect(subjectForNumber(126, 75)).toBe("Maths"); // shift 2 Maths
    expect(subjectForNumber(150, 75)).toBe("Maths");
  });
});

describe("positional key mapping (all-1. soln docs)", () => {
  const allOne = "1.  **(c)** first\n\n1.  **(7)** second\n\n1.  **(b)** third\n";
  const sequential = "1.  **(c)** first\n\n2.  **(7)** second\n\n3.  **(b)** third\n";
  it("solnNumberingIsBroken flags an all-1. doc, not a sequential one", () => {
    // needs >=20 blocks to trip; build a 30-block all-1. doc
    const big = Array.from({ length: 30 }, () => "1.  **(a)** x").join("\n\n");
    expect(solnNumberingIsBroken(big)).toBe(true);
    const seq = Array.from({ length: 30 }, (_, i) => `${i + 1}.  **(a)** x`).join("\n\n");
    expect(solnNumberingIsBroken(seq)).toBe(false);
  });
  it("parseAnswerTokensOrdered returns tokens in document order regardless of number", () => {
    expect(parseAnswerTokensOrdered(allOne)).toEqual(["c", "7", "b"]);
    expect(parseAnswerTokensOrdered(sequential)).toEqual(["c", "7", "b"]);
  });
  it("splitSolutionsOrdered aligns bodies 1:1 with the tokens", () => {
    const bodies = splitSolutionsOrdered(allOne);
    expect(bodies).toHaveLength(3);
    expect(bodies[0]).toContain("first");
    expect(bodies[2]).toContain("third");
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

  it("does not treat a match-list code like (a)-(ii) as an option marker", () => {
    const res = parseOptionsFromText(
      "Choose: (a) (a)-(i), (b)-(ii) (b) (a)-(ii), (b)-(i) (c) (a)-(iii), (b)-(iv) (d) (a)-(iv), (b)-(iii)"
    );
    expect(res!.stem).toBe("Choose:");
    expect(res!.options).toEqual([
      "(a)-(i), (b)-(ii)",
      "(a)-(ii), (b)-(i)",
      "(a)-(iii), (b)-(iv)",
      "(a)-(iv), (b)-(iii)",
    ]);
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

  it("preserves matrix row separators (\\\\) at end of line, not just pandoc hard-breaks", () => {
    const md = `1.  Let \\[\\begin{matrix} a \\\\
    b \\end{matrix}\\] hold.\\
    (a) p (b) q (c) r (d) s`;
    const out = segmentQuestions(md);
    expect(out[0].stem).toContain("\\\\"); // the matrix row break survived
    expect(out[0].stem).toContain("\\begin{matrix}");
  });

  it("keeps a stem line that merely STARTS with the word 'part'", () => {
    // Anchoring the banner filter to line-start was not enough: ordinary prose
    // often begins with "part" — "part (B) and part (C), respectively..." and
    // "part of it submerged in water..." were both still being deleted. A real
    // banner is the WHOLE line and names a roman numeral or a section letter.
    const md = `1.  For the given circuit the input and output are shown in
    part (B) and part (C), respectively. Identify the components used.\\
    (a) p (b) q (c) r (d) s

> **SECTION-B**

2.  The cube floats with a
    part of it submerged in water. Find the mass.`;
    const out = segmentQuestions(md);
    expect(out[0].stem).toContain("Identify the components used");
    expect(out[1].stem).toContain("submerged in water");
    expect(out[1].stem).not.toContain("SECTION-B");
  });

  it("still drops every real banner variant the corpus prints", () => {
    // The separator has to stay loose: the papers print "SECTION-A",
    // "SECTION: B", "Section -- B" and even a misspelled "PART- I PHYSCIS".
    const banners = [
      "**SECTION-A**", "**SECTION: B**", "**Section -- B**",
      "**PART-I PHYSICS**", "**PART- I PHYSCIS**", "**PART-II CHEMISTRY**",
    ];
    for (const b of banners) {
      const out = segmentQuestions(`1.  Stem text here.\n\n${b}\n\n2.  Next stem.`);
      expect(out[0].stem, `banner leaked: ${b}`).toBe("Stem text here.");
    }
  });

  it("keeps a stem line that merely CONTAINS 'section'/'part' (cross-section, intersection)", () => {
    // The stray-header filter was an unanchored /PART-|SECTION/i, so any stem line
    // mentioning a cross-section or an intersection was silently deleted — 215
    // content lines across 77 of the 91 extracted papers, all three subjects.
    const md = `1.  A cylindrical conductor of length 2 m and area of cross-section
    $0.2 mm^2$ carries a current of 1.6 A.\\
    (a) p (b) q (c) r (d) s

> **SECTION-B**

2.  Find the point of intersection of the line and the curve.\\
    (a) w (b) x (c) y (d) z`;
    const out = segmentQuestions(md);
    expect(out[0].stem).toContain("cylindrical conductor");
    expect(out[0].stem).toContain("cross-section");
    expect(out[1].stem).toContain("intersection");
    // ...while a real SECTION header on its own line is still dropped.
    expect(out[1].stem).not.toContain("SECTION-B");
    expect(out[0].stem).not.toContain("SECTION-B");
  });

  it("drops a bare subject-name header so it can't leak into the previous stem", () => {
    // The last question of a subject block is followed by the NEXT subject's
    // banner. `PART-`/`SECTION` headers were already skipped, but the 2025/2026
    // sittings print a bare `**CHEMISTRY**` line, which the segmenter absorbed
    // into the preceding stem (83 rows corpus-wide).
    // A NAT last-question has no option markers to absorb the stray line, so it
    // lands in the stem; an MCQ last-question absorbs it into option (d).
    const md = `1.  **A numerical last question with no options**

> **CHEMISTRY**

26. **A chemistry MCQ -**\\
    (a) p (b) q (c) r (d) s

> **MATHEMATICS**

51. **A maths MCQ -**\\
    (a) w (b) x (c) y (d) z`;
    const out = segmentQuestions(md, 75);
    expect(out[0].stem).not.toContain("CHEMISTRY");
    expect(out.find((q) => q.number === 26)!.options![3]).not.toContain("MATHEMATICS");
    expect(out.map((q) => q.number)).toEqual([1, 26, 51]);
  });

  it("segments a question whose number is alone on its line (stem after an image)", () => {
    // pandoc renders `9.  ` with the stem after an interspersed figure; trimEnd
    // strips the trailing space, so the start anchor must allow end-of-line.
    const md = `1.  **First -**\\
    (a) $1$ (b) $2$ (c) $3$ (d) $4$

<!-- -->

9.

![](media/media/image2.png){width="2in" height="1in"}

The logic circuit shown above is equivalent to (a) p (b) q (c) r (d) s`;
    const out = segmentQuestions(md);
    expect(out.map((q) => q.number)).toEqual([1, 9]);
    const q9 = out.find((q) => q.number === 9)!;
    expect(q9.stem).toContain("The logic circuit");
    expect(q9.imageRefs).toEqual(["media/media/image2.png"]);
  });
});

describe("keepForSubject (Maths-first single-subject commit filter)", () => {
  it("keeps every row when no target is given (full-paper commit)", () => {
    expect(keepForSubject(undefined, "Physics")).toBe(true);
    expect(keepForSubject(undefined, "Maths", "Chemistry")).toBe(true);
  });

  it("keeps a row whose position-derived subject matches the target", () => {
    expect(keepForSubject("Maths", "Maths")).toBe(true);
    expect(keepForSubject("Maths", "Physics")).toBe(false);
  });

  it("lets a content classification override the position subject (compilations)", () => {
    // Maths question sitting at a Chemistry position (compilation): classification wins.
    expect(keepForSubject("Maths", "Chemistry", "Maths")).toBe(true);
    // A real Chemistry question at a Maths position: classification excludes it.
    expect(keepForSubject("Maths", "Maths", "Chemistry")).toBe(false);
  });
});

describe("parseSubjectArg", () => {
  it("extracts the --subject=<name> value", () => {
    expect(parseSubjectArg(["node", "commit.ts", "2021-p19", "--subject=Maths", "--apply"])).toBe("Maths");
  });
  it("returns undefined when absent", () => {
    expect(parseSubjectArg(["node", "commit.ts", "2021-p19", "--apply"])).toBeUndefined();
  });
});

describe("parseNumericAnswer (JEE Section B / NAT answers)", () => {
  it("parses a plain integer answer", () => {
    expect(parseNumericAnswer("7744")).toBe(7744);
    expect(parseNumericAnswer("5")).toBe(5);
  });
  it("parses decimals and strips thousands commas", () => {
    expect(parseNumericAnswer("1.50")).toBe(1.5);
    expect(parseNumericAnswer("2,021")).toBe(2021);
  });
  it("parses a negative value", () => {
    expect(parseNumericAnswer("-3")).toBe(-3);
  });
  it("returns null for an unparseable / ambiguous token (forces an override)", () => {
    expect(parseNumericAnswer("5 or 6")).toBeNull();
    expect(parseNumericAnswer("abc")).toBeNull();
    expect(parseNumericAnswer("")).toBeNull();
    expect(parseNumericAnswer(undefined)).toBeNull();
  });
});

describe("isCommittable — numericOverride of 0 (config.ts)", () => {
  // Regression: a legitimate NAT answer of 0 must not read as "no override".
  const paper = (o: Record<string, unknown>) => ({ classification: {}, ...o }) as never;

  it("commits a needs_review row whose numericOverride is 0", () => {
    expect(isCommittable("needs_review", 61, paper({ numericOverrides: { "61": 0 } }))).toBe(true);
  });
  it("commits a needs_review row whose numericOverride is a nonzero number", () => {
    expect(isCommittable("needs_review", 47, paper({ numericOverrides: { "47": 96 } }))).toBe(true);
  });
  it("drops a needs_review row with no override of any kind", () => {
    expect(isCommittable("needs_review", 50, paper({ numericOverrides: { "61": 0 } }))).toBe(false);
  });
  it("still commits clean MCQ rows regardless of overrides", () => {
    expect(isCommittable("ok", 1, paper({}))).toBe(true);
  });
});

describe("parseOptionsFromText — pandoc hard-break at the stem/option seam", () => {
  it("drops a trailing hard-break `\` left on the stem by the split", () => {
    // The backslash is mid-string when cleanText runs (options follow it), so it
    // only becomes trailing after the stem is cut — cleanText cannot catch it.
    const r = parseOptionsFromText("The logic gate circuit is\ (a) X (b) Y (c) Z (d) W");
    expect(r?.stem).toBe("The logic gate circuit is");
  });

  it("preserves a LaTeX row separator `\\` and a closing `\)`", () => {
    const r = parseOptionsFromText("Matrix \(\begin{matrix} a \\ b \end{matrix}\) (a) X (b) Y (c) Z (d) W");
    expect(r?.stem).toBe("Matrix \(\begin{matrix} a \\ b \end{matrix}\)");
  });

  it("drops a trailing hard-break on an option too", () => {
    const r = parseOptionsFromText("Q (a) first\ (b) second (c) third (d) fourth");
    expect(r?.options[0]).toBe("first");
  });
});

describe("dropProseHardBreaks — pandoc line-break marker stranded mid-prose", () => {
  it("removes a break mid-sentence", () => {
    expect(dropProseHardBreaks("with time.\\ The impulse")).toBe("with time. The impulse");
  });

  it("removes a break before an inline statement list", () => {
    expect(dropProseHardBreaks("Identify the correct statements:\\ (A) foo")).toBe(
      "Identify the correct statements: (A) foo",
    );
  });

  it("keeps a thin space INSIDE a math zone (there it is a legal macro)", () => {
    const s = "value \\(a\\ b\\) here";
    expect(dropProseHardBreaks(s)).toBe(s);
  });

  it("keeps a LaTeX row separator", () => {
    const s = "\\(\\begin{matrix} a \\\\ b \\end{matrix}\\) x";
    expect(dropProseHardBreaks(s)).toBe(s);
  });

  it("does not splice a math zone into prose that contains bare numbers", () => {
    // Regression: a numeric placeholder would collide with "6" / "40" here.
    expect(dropProseHardBreaks("takes 6 min. 40 s over \\(200\\alpha\\) then 7 and 8\\ next")).toBe(
      "takes 6 min. 40 s over \\(200\\alpha\\) then 7 and 8 next",
    );
  });
});

describe("gridTableToPipe (pandoc grid table -> GFM pipe table)", () => {
  it("leaves text with no grid table untouched", () => {
    const s = "Plain stem with \\(a|b\\) and a | pipe but no table.";
    expect(gridTableToPipe(s)).toBe(s);
  });

  it("converts a simple flattened 2-column grid table", () => {
    const s =
      "Data: +------+------+ | A | B | +:====:+:====:+ | 1 | 2 | +------+------+ | 3 | 4 | +------+------+";
    const out = gridTableToPipe(s);
    expect(out).toContain("| A | B |");
    expect(out).toContain("| --- | --- |");
    expect(out).toContain("| 1 | 2 |");
    expect(out).toContain("| 3 | 4 |");
    expect(out).not.toMatch(/\+[-=:]{3,}\+/);
  });

  it("emits the separator row GFM requires, on its own line", () => {
    const s = "+---+---+ | A | B | +===+===+ | 1 | 2 | +---+---+";
    const lines = gridTableToPipe(s).split("\n").map((l) => l.trim()).filter(Boolean);
    const sep = lines.findIndex((l) => /^\|\s*---/.test(l));
    expect(sep).toBeGreaterThan(0);
    expect(lines[sep - 1]).toBe("| A | B |");
  });

  it("joins a multi-line header into one cell per column", () => {
    // pandoc splits a tall header cell across physical rows; they must merge.
    const s =
      "+------+------+ | Compound | Enthalpy | | | | | | (kJ/mol) | +:====:+:====:+ | XY | 42 | +------+------+";
    const out = gridTableToPipe(s);
    expect(out).toContain("| Compound | Enthalpy (kJ/mol) |");
  });

  it("preserves math zones inside cells verbatim", () => {
    const s = "+---+---+ | \\[X_{2}(g)\\] | \\[\\Delta_{f}H\\] | +===+===+ | 8 | 140 | +---+---+";
    const out = gridTableToPipe(s);
    expect(out).toContain("\\[X_{2}(g)\\]");
    expect(out).toContain("\\[\\Delta_{f}H\\]");
  });

  it("does not split a cell on a pipe that lives inside a math zone", () => {
    // `\(|A|\)` in a cell must stay ONE cell, else the columns shift right.
    const s = "+---+---+ | \\(|A| = 3\\) | ok | +===+===+ | 1 | 2 | +---+---+";
    const out = gridTableToPipe(s);
    expect(out).toContain("| \\(|A| = 3\\) | ok |");
    expect(out).toContain("| 1 | 2 |");
  });

  it("aligns a 3-column multi-physical-row header to the right columns", () => {
    // Regression (real data, 2026-apr05-s2 Q29): pandoc puts the units on a
    // second physical row. Adjacent rows leave a separator artifact when the
    // stem is flattened, so a naive `k % cols` drifts by one per row and files
    // the units under the WRONG column.
    const s =
      "+----+----+----+ | Compound | dfH | S | | | | | | | (kJ/mol) | (J/mol K) | " +
      "+:==:+:==:+:==:+ | XY(g) | 42 | 200 | +----+----+----+ | X2(g) | 8 | 140 | +----+----+----+";
    const out = gridTableToPipe(s);
    expect(out).toContain("| Compound | dfH (kJ/mol) | S (J/mol K) |");
    expect(out).toContain("| XY(g) | 42 | 200 |");
    expect(out).toContain("| X2(g) | 8 | 140 |");
  });

  it("keeps the prose that precedes the table", () => {
    const s = "Consider the data for the reaction: +---+---+ | A | B | +===+===+ | 1 | 2 | +---+---+";
    expect(gridTableToPipe(s)).toMatch(/^Consider the data for the reaction:/);
  });

  it("does not fire on an inline math pipe (determinant / abs value)", () => {
    const s = "Given \\(|A| = 3\\) and \\(|x|\\), find y.";
    expect(gridTableToPipe(s)).toBe(s);
  });

  it("is idempotent on an already-converted table", () => {
    const once = gridTableToPipe("+---+---+ | A | B | +===+===+ | 1 | 2 | +---+---+");
    expect(gridTableToPipe(once)).toBe(once);
  });
});

describe("subtopicNameFrom (guard on agent taxonomy proposals)", () => {
  it("accepts a bare subtopic name", () => {
    expect(subtopicNameFrom("Nernst Equation and Cell EMF")).toBe("Nernst Equation and Cell EMF");
    expect(subtopicNameFrom("  Stability of Complexes  ")).toBe("Stability of Complexes");
  });

  it("accepts a name containing an apostrophe or parentheses", () => {
    expect(subtopicNameFrom("Enthalpy Changes, Hess's Law and Bond Enthalpy")).toBe(
      "Enthalpy Changes, Hess's Law and Bond Enthalpy",
    );
    expect(subtopicNameFrom("Bond Parameters (Bond Length, Bond Angle, Bond Order)")).toBe(
      "Bond Parameters (Bond Length, Bond Angle, Bond Order)",
    );
  });

  it("REFUSES prose rather than digging a name out of it", () => {
    // Recovering the quoted span looks tempting but mangles any name with an
    // apostrophe: "Hess's" closes the quote early and yields "s Law and Bond
    // Enthalpy", which would be created as a real subtopic.
    const prose =
      "Chemical Thermodynamics has no subtopic for enthalpy. Proposed: 'Enthalpy Changes, Hess's Law and Bond Enthalpy'.";
    expect(subtopicNameFrom(prose)).toBeNull();
  });

  it("refuses an over-long value and an empty one", () => {
    expect(subtopicNameFrom("x".repeat(71))).toBeNull();
    expect(subtopicNameFrom("   ")).toBeNull();
  });

  it("refuses anything that reads like a proposal sentence", () => {
    expect(subtopicNameFrom("Proposed: Henry's Law")).toBeNull();
    expect(subtopicNameFrom("no subtopic covers this")).toBeNull();
  });
});

describe("subtopicNameFrom — recovering a name from the agent's usual shapes", () => {
  it("takes the name before the ' - ' justification", () => {
    expect(
      subtopicNameFrom(
        "Group 14 Elements (Compounds of Tin and Lead) - no group-14 subtopic exists under The p-Block Elements",
      ),
    ).toBe("Group 14 Elements (Compounds of Tin and Lead)");
  });

  it("splits on ' :: ' BEFORE ' - ', because a chapter name can contain ' - '", () => {
    // "Organic Chemistry - Some Basic Principles and Techniques" has its own
    // hyphen; cutting on the hyphen first truncates mid-chapter.
    expect(
      subtopicNameFrom(
        "Organic Chemistry - Some Basic Principles and Techniques :: Electronic Effects and Reaction Intermediates - no such subtopic exists",
      ),
    ).toBe("Electronic Effects and Reaction Intermediates");
  });

  it("takes the subtopic half of a Chapter :: Subtopic proposal", () => {
    expect(subtopicNameFrom("Biomolecules :: Nucleic Acids - the chapter has no nucleic-acid subtopic")).toBe(
      "Nucleic Acids",
    );
  });

  it("drops a trailing parenthetical gloss only when needed to fit", () => {
    expect(
      subtopicNameFrom(
        "Chemical Kinetics :: Rate of Reaction and Rate Expressions (stoichiometric rate relations, read off a concentration-time plot) - neither existing subtopic covers it",
      ),
    ).toBe("Rate of Reaction and Rate Expressions");
  });

  it("still refuses when no name can be isolated", () => {
    expect(subtopicNameFrom("there is really no good fit here. Consider something else entirely.")).toBeNull();
  });
});

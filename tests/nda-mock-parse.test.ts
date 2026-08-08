import { describe, it, expect } from "vitest";
import {
  splitQuestionBlocks,
  parseOptionsFromBlock,
  parseTailAnswerKey,
  parseInlineAnswers,
  parseSolutionBlocks,
  stripSourceTag,
  detectDirectionSets,
  normalizeMathDelimiters,
  unescapePandocBrackets,
  parseCombinedBlock,
  stripKatexUnsupported,
  parseSupplementSolutions,
  fixStackedOperators,
  stripPandocInlineMarkup,
} from "../scripts/nda-mock/parse";
import { parseVisionAnswerKey } from "../scripts/nda-mock/extract-vision";

// ── Mock 1/2/3/5 house style: markdown ordered list, options on \-broken lines,
//    ANSWER KEYS block at the tail. ──────────────────────────────────────────
const HOUSE_A = `**[ TEST 1 ]**

1.  If 3 is the root of \\(x^{2} - 8x + k = 0\\) then what is K?\\
    (a) -15 (b) 9\\
    (c) 15 (d) 24

2.  Two straight lines \\(x - 3y - 2 = 0\\)\\
    (a) never intersect\\
    (b) intersect at a single point\\
    (c) Intersect at infinite number of points\\
    (d) Intersect at more than one point

**[ANSWER KEYS]{.underline}**

1.  C

2.  A
`;

// ── Mock 6/7/8 house style: escaped plain-number paragraphs. ────────────────
const HOUSE_B = `**[(TEST-6)]{.underline}**

**[Instructions]{.underline}**

1.  **[These booklets contains *120* questions.]**

2.  **[All questions carry equal marks.]**

1\\. If $A = \\{1,3\\}$, then $A' \\cup B$ is\\
(a) $A$\\
(b) $N$\\
(c) $B$\\
(d) None of these

2\\. If \\(f(x)\\) is a polynomial then \\(f(2) =\\)\\
(a) 7 (b) 4\\
(c) 9 (d) 6
`;

describe("splitQuestionBlocks", () => {
  it("splits house-A markdown-list numbering and stops at the ANSWER KEYS block", () => {
    const blocks = splitQuestionBlocks(HOUSE_A);
    expect(blocks.map((b) => b.number)).toEqual([1, 2]);
    expect(blocks[0].body).toContain("If 3 is the root");
    // the tail answer key must NOT be re-parsed as questions 1 and 2
    expect(blocks[0].body).not.toContain("ANSWER KEYS");
    expect(blocks[1].body).not.toMatch(/^\s*A\s*$/m);
  });

  it("splits house-B escaped numbering and ignores the instructions list", () => {
    const blocks = splitQuestionBlocks(HOUSE_B);
    expect(blocks.map((b) => b.number)).toEqual([1, 2]);
    expect(blocks[0].body).toContain("A' \\cup B");
    expect(blocks[0].body).not.toContain("booklets contains");
  });

  it("does not treat a question's indented sub-list as new questions", () => {
    // Mock 1 Q4 embeds "1. AB is defined / 2. BA is defined / 3. AB = BA" as a
    // 4-space-indented list. Reading those as question starts truncated the
    // paper at Q4 and silently lost 89 of 120 questions.
    const md = `1.  First question?\\
    (a) 1 (b) 2\\
    (c) 3 (d) 4

4.  Which of the following is/are correct?\\
    1. AB is defined\\
    2. BA is defined\\
    3. AB = BA\\
    (a) Only 1 (b) Only 2\\
    (c) 1 and 2 (d) 1, 2 and 3

5.  Third question?\\
    (a) 1 (b) 2\\
    (c) 3 (d) 4
`;
    const blocks = splitQuestionBlocks(md);
    expect(blocks.map((b) => b.number)).toEqual([1, 4, 5]);
    expect(blocks[1].body).toContain("AB is defined");
  });

  it("keeps the LAST occurrence when a number repeats outside the key block", () => {
    // a stray '1.' inside prose must not silently truncate the paper
    const blocks = splitQuestionBlocks(HOUSE_A);
    expect(blocks).toHaveLength(2);
  });

  it("cuts a question's body at a following Directions header", () => {
    // A Directions block sits BETWEEN two questions, so it lands inside the
    // preceding question's body. Its (a)-(d) answer codes then won the
    // "last chain wins" tie-break and replaced that question's real options.
    const md = [
      "44. Under what condition are the two lines orthogonal?\\",
      "(a) \\(p = 0\\) (b) \\(q = 0\\)\\",
      "(c) \\(r = 1\\) (d) \\(r = 0\\)",
      "",
      "**Directions -** (Q. Nos. 45-48) Each item has an assertion and a reason.\\",
      "**(a)** Both true and R explains A.\\",
      "**(b)** Both true but R does not explain A.\\",
      "**(c)** A true, R false.\\",
      "**(d)** A false, R true.",
      "",
      "45. Assertion something",
    ].join("\n");
    const blocks = splitQuestionBlocks(md);
    const q44 = blocks.find((b) => b.number === 44)!;
    expect(q44.body).not.toContain("Directions");
    expect(q44.body).not.toContain("R explains A");
    const { options } = parseOptionsFromBlock(q44.body);
    expect(options.map((o) => o.text)).toEqual(["\\(p = 0\\)", "\\(q = 0\\)", "\\(r = 1\\)", "\\(r = 0\\)"]);
  });

  it("does not read a decimal in a data table as a question start", () => {
    // Mock 1's solution 113 embeds a frequency table whose class intervals
    // ("5.5 - 10.5") look exactly like a numbered start.
    const md = `1\\. First\n\n2\\. Second\n\n  Cl             f\n  5.5 - 10.5     7\n  10.5 - 15.5    6\n\n3\\. Third\n`;
    expect(splitQuestionBlocks(md).map((b) => b.number)).toEqual([1, 2, 3]);
  });

  it("recovers a question whose text landed in an image alt attribute", () => {
    // Mock 10 Q108 was emitted as `![108. The perpendicular distance ...](x.emf)`
    // and vanished entirely from the numbering scan.
    const md = [
      "107\\. First question?\n\n(a) 1 (b) 2 (c) 3 (d) 4",
      "![108. The perpendicular distance of A(1,4,-2) from BC is](media/image28.emf)\n\n(a) 5 (b) 6 (c) 7 (d) 8",
      "109\\. Third?\n\n(a) 1 (b) 2 (c) 3 (d) 4",
    ].join("\n\n");
    const blocks = splitQuestionBlocks(md);
    expect(blocks.map((b) => b.number)).toEqual([107, 108, 109]);
    expect(blocks[1].body).toContain("perpendicular distance");
  });

  it("does not unwrap a decorative image whose alt is a file path", () => {
    // Mock 1's banner alt is `C:\Users\...\WhatsApp Image...`; unwrapping it
    // would inject a filesystem path into the question flow.
    const md = "![C:\\Users\\user 1\\Desktop\\image\\WhatsApp Image.jpeg](media/image1.jpeg)\n\n1\\. Q?\n\n(a) 1 (b) 2 (c) 3 (d) 4";
    const blocks = splitQuestionBlocks(md);
    expect(blocks.map((b) => b.number)).toEqual([1]);
    expect(blocks[0].body).not.toContain("WhatsApp");
  });

  it("keeps the tail when interior noise breaks the ascending run", () => {
    // The real failure: noise inside item 2 split the run into [1,2] and
    // [3,4]; picking the longest silently discarded the tail.
    const md = `1\\. One\n\n2\\. Two\n\n  9. stray noise\n\n3\\. Three\n\n4\\. Four\n`;
    expect(splitQuestionBlocks(md).map((b) => b.number)).toEqual([1, 2, 3, 4]);
  });
});

describe("parseOptionsFromBlock", () => {
  it("parses two-per-line (a)..(d) options and strips the stem", () => {
    const b = splitQuestionBlocks(HOUSE_A)[0];
    const { stem, options } = parseOptionsFromBlock(b.body);
    expect(stem).toBe("If 3 is the root of \\(x^{2} - 8x + k = 0\\) then what is K?");
    expect(options.map((o) => o.label)).toEqual(["A", "B", "C", "D"]);
    expect(options.map((o) => o.text)).toEqual(["-15", "9", "15", "24"]);
  });

  it("parses one-per-line options carrying math", () => {
    // NB: math is `$...$` here because parseOptionsFromBlock runs on RAW pandoc
    // output — the conversion to \(...\) happens afterwards. That distinction
    // matters: in pandoc output `\(A\)` is an ESCAPED LITERAL PAREN, i.e. a
    // genuine option label, not a math zone.
    const b = splitQuestionBlocks(HOUSE_B)[0];
    const { stem, options } = parseOptionsFromBlock(b.body);
    expect(stem).toContain("A' \\cup B");
    expect(options.map((o) => o.text)).toEqual(["$A$", "$N$", "$B$", "None of these"]);
  });

  it("accepts uppercase (A)..(D) labels", () => {
    const { options } = parseOptionsFromBlock("Foo?\\\n(A) 1\\\n(B) 2\\\n(C) 3\\\n(D) 4");
    expect(options.map((o) => o.text)).toEqual(["1", "2", "3", "4"]);
  });

  it("accepts 'a.' style labels used by Mock 10", () => {
    const { options } = parseOptionsFromBlock("Foo?\n\na. Zero b. One c. Two d. Four");
    expect(options.map((o) => o.text)).toEqual(["Zero", "One", "Two", "Four"]);
  });

  it("accepts pandoc's escaped 'a\\.' label at a line start", () => {
    // pandoc escapes a line-initial "a." as "a\." — so in Mock 10 the FIRST
    // label of each option line is escaped while its siblings are plain.
    const { options } = parseOptionsFromBlock(
      "Foo?\n\na\\. Zero b. One\n\nc\\. Two d. Four"
    );
    expect(options.map((o) => o.text)).toEqual(["Zero", "One", "Two", "Four"]);
  });

  it("accepts a bare 'a)' label with no opening paren", () => {
    // Mock 6 Q10/Q83: "a)  Only 1 b) Only II c) Both Correct d) Both Wrong".
    const { options } = parseOptionsFromBlock(
      "Which statement is Correct ?\n\na)  Only 1 b) Only II c) Both Correct d) Both Wrong"
    );
    expect(options.map((o) => o.text)).toEqual(["Only 1", "Only II", "Both Correct", "Both Wrong"]);
  });

  it("accepts a label glued to the previous option's last WORD", () => {
    // Mock 6 Q8: "(a) Are real and negative(b) Have negative real parts".
    const { stem, options } = parseOptionsFromBlock(
      "If a > 0 then both roots are\\\n(a) Are real and negative(b) Have negative real parts\\\n(c) Are rational numbers(d) None of these"
    );
    expect(stem).toContain("both roots are");
    expect(options.map((o) => o.text)).toEqual([
      "Are real and negative",
      "Have negative real parts",
      "Are rational numbers",
      "None of these",
    ]);
  });

  it("still prefers a strict chain over a permissive one", () => {
    // The permissive scan must not let `f(a)`/`g(b)`/`h(c)`/`k(d)` in a stem
    // displace the real option run below it.
    const { stem, options } = parseOptionsFromBlock(
      "If f(a), g(b), h(c) and k(d) are functions, which is odd?\\\n(a) 1 (b) 2\\\n(c) 3 (d) 4"
    );
    expect(stem).toContain("k(d) are functions");
    expect(options.map((o) => o.text)).toEqual(["1", "2", "3", "4"]);
  });

  it("parses an option label glued to the end of the previous option's math", () => {
    // Real Mock 1 Q61/Q110: "... + c$(d) $\frac{\pi}{2}..." with no space.
    const { options } = parseOptionsFromBlock(
      "What is the integral?\\\n(a) \\(1\\) (b) \\(2\\)\\\n(c) \\(3\\)(d) \\(4\\)"
    );
    expect(options.map((o) => o.text)).toEqual(["\\(1\\)", "\\(2\\)", "\\(3\\)", "\\(4\\)"]);
  });

  it("keeps a LaTeX row separator while stripping a pandoc hard break", () => {
    // pandoc ends a soft-wrapped line with a single trailing backslash, but a
    // matrix row ends with TWO (`\\`). Stripping blindly ate one of them and
    // silently broke every matrix and determinant in the paper.
    const { stem } = parseOptionsFromBlock(
      "If \\(A = \\begin{bmatrix}\n1 & 2 \\\\\n3 & 4\n\\end{bmatrix}\\) then?\\\n(a) 1 (b) 2\\\n(c) 3 (d) 4"
    );
    expect(stem).toContain("1 & 2 \\\\");
    expect(stem).not.toContain("1 & 2 \\\n");
  });

  it("accepts pandoc's escaped '\\(a\\)' option labels", () => {
    // pandoc escapes a line-initial literal paren, so the first option of a
    // block often arrives as `\(a\)` while the rest stay `(b)`.
    const { options } = parseOptionsFromBlock("Foo?\n\n\\(a\\) 5 (b) 6\n\n\\(c\\) 8 (d) 10");
    expect(options.map((o) => o.text)).toEqual(["5", "6", "8", "10"]);
  });

  it("finds a label that directly follows another label's option text", () => {
    // Mock 5 Q114: "(c) Only (A) and (B) (d) Only (A)". The (B) match consumed
    // the following space, leaving (d) with no boundary character to match
    // against — so the option run stopped at three and the question was lost.
    const { options } = parseOptionsFromBlock(
      "Which of these is/are correct?\\\n(a) (1), (2) and (3) (b) Only (2)\\\n(c) Only (A) and (B) (d) Only (A)"
    );
    expect(options.map((o) => o.label)).toEqual(["A", "B", "C", "D"]);
    expect(options[2].text).toBe("Only (A) and (B)");
    expect(options[3].text).toBe("Only (A)");
  });

  it("throws when a block does not yield exactly four options", () => {
    expect(() => parseOptionsFromBlock("Foo?\\\n(a) 1\\\n(b) 2")).toThrow(/four options/i);
  });

  it("does not mistake inline '(a)' inside the stem for an option label", () => {
    const { stem, options } = parseOptionsFromBlock(
      "If (a) and (b) are constants, find x.\\\n(a) 1 (b) 2\\\n(c) 3 (d) 4"
    );
    expect(stem).toBe("If (a) and (b) are constants, find x.");
    expect(options.map((o) => o.text)).toEqual(["1", "2", "3", "4"]);
  });
});

describe("parseCombinedBlock", () => {
  it("separates stem, options, solution and answer in a Mock-10 block", () => {
    const body = [
      "How many real roots does the equation $x^{2}$ + 3$|x| + 2 = 0$ have?",
      "",
      "a\\. Zero b. One c. Two d. Four",
      "",
      "**SOL. (a)** $x^{2}$ + 3$|x| + 2 = 0$",
      "",
      "$\\therefore$ No real roots exist.",
    ].join("\n");
    const { stem, options, solution, answer } = parseCombinedBlock(body);
    expect(stem).toContain("How many real roots");
    expect(options.map((o) => o.text)).toEqual(["Zero", "One", "Two", "Four"]);
    expect(answer).toBe("A");
    expect(solution).toContain("No real roots exist.");
  });

  it("handles the unbolded 'SOL.' spelling", () => {
    const r = parseCombinedBlock("Stem?\n\na\\. 1 b. 2 c. 3 d. 4\n\nSOL. (c) because reasons");
    expect(r.options[3].text).toBe("4");
    expect(r.answer).toBe("C");
    expect(r.solution).toBe("because reasons");
  });

  it("handles a bare bolded answer letter with the word SOL omitted", () => {
    // Mock 10 Q32: the marker is just `**(a)**`, glued to option (d)'s text.
    const r = parseCombinedBlock(
      "The value of the determinant is\n\n(a) 1 (b) 2\n\n(c) 3 (d) none of these **(a)** We have, D = 0"
    );
    expect(r.options[3].text).toBe("none of these");
    expect(r.answer).toBe("A");
    expect(r.solution).toBe("We have, D = 0");
  });

  it("does NOT mistake a bolded option label for the answer marker", () => {
    // The regression this ordering exists to prevent: searching the raw block
    // for a bolded letter cut it off before the options had been found.
    const r = parseCombinedBlock("Stem?\n\n**(a)** 1 **(b)** 2\n\n**(c)** 3 **(d)** 4");
    expect(r.options.map((o) => o.text)).toEqual(["1", "2", "3", "4"]);
    expect(r.answer).toBeNull();
    expect(r.solution).toBeNull();
  });

  it("finds the answer letter when it is wrapped in a math zone", () => {
    // Mock 10 Q40: `SOL. \(\text{~(d)}\)` — the letter sits inside \text{}.
    const r = parseCombinedBlock(
      "Stem?\n\n(a) 0 (b) 1\n\n(c) $x$ (d) $y$ SOL. \\(\\text{~(d)}\\) working here"
    );
    expect(r.answer).toBe("D");
    expect(r.options[3].text).toBe("$y$");
    expect(r.solution).toContain("working here");
  });

  it("does not read ordinary bracketed algebra as the answer letter", () => {
    // `(x - 13)` and `(a + b)` must not match: the letter must be ALONE.
    const r = parseCombinedBlock("Stem?\n\n(a) 1 (b) 2\n\n(c) 3 (d) 4 SOL. $(x - 13)(a + b) = 0$");
    expect(r.answer).toBeNull();
    expect(r.solution).toContain("(x - 13)(a + b)");
  });

  it("reports no solution when the block has no marker at all", () => {
    const r = parseCombinedBlock("Stem?\n(a) 1 (b) 2 (c) 3 (d) 4");
    expect(r.solution).toBeNull();
    expect(r.answer).toBeNull();
    expect(r.options[3].text).toBe("4");
  });
});

describe("parseTailAnswerKey", () => {
  it("reads the ANSWER KEYS block only, not the question numbering", () => {
    const key = parseTailAnswerKey(HOUSE_A);
    expect(key.get(1)).toBe("C");
    expect(key.get(2)).toBe("A");
    expect(key.size).toBe(2);
  });

  it("returns an empty map when there is no key block", () => {
    expect(parseTailAnswerKey(HOUSE_B).size).toBe(0);
  });

  it("reads the same block when it sits in the SOLUTION doc instead", () => {
    // Mock 4's question paper carries no key at all; the ANSWER KEYS block is
    // printed at the end of the solution document in the identical format.
    const solMd = `1\\. (b) Some working here.

2\\. (c) More working.

**[ANSWER KEYS]{.underline}**

1.  B

2.  C
`;
    const key = parseTailAnswerKey(solMd);
    expect(key.get(1)).toBe("B");
    expect(key.get(2)).toBe("C");
    expect(key.size).toBe(2);
  });
});

describe("parseInlineAnswers", () => {
  it("reads 'N.(c)' and 'N. (b)' solution-leading answers", () => {
    const m = parseInlineAnswers("38.(c) General term\n\n39\\. (b) Since roots\n\n40. ( d ) foo");
    expect(m.get(38)).toBe("C");
    expect(m.get(39)).toBe("B");
    expect(m.get(40)).toBe("D");
  });

  it("reads Mock-10 '**SOL. (a)**' answers keyed to the preceding question", () => {
    const m = parseInlineAnswers("1\\. How many roots?\n\na. Zero b. One\n\n**SOL. (a)** none exist\n");
    expect(m.get(1)).toBe("A");
  });

  it("ignores an option label that merely starts a line", () => {
    const m = parseInlineAnswers("(a) 15\n(b) 20\n");
    expect(m.size).toBe(0);
  });
});

describe("parseSolutionBlocks", () => {
  it("splits a solution file into per-question bodies and drops the answer letter", () => {
    const sols = parseSolutionBlocks("14.(c) Since coefficients are real\n\nmore work\n\n15.(a) Next one\n");
    expect(sols.get(14)).toContain("Since coefficients are real");
    expect(sols.get(14)).toContain("more work");
    expect(sols.get(14)!.startsWith("(c)")).toBe(false);
    expect(sols.get(15)).toBe("Next one");
  });

  it("returns empty — and TERMINATES — for a document with no question starts", () => {
    // Mock 8's solution supplement heads its entries "Solution 8", which
    // Q_START rightly declines. With no candidates the subsequence walk read
    // prev[0] === undefined, which is not -1, so it looped forever unshifting
    // undefined: the extract HUNG rather than failing. The assertion that
    // matters here is that this call returns at all.
    expect(parseSolutionBlocks("Solution 8\n\nThe correct option is D\n").size).toBe(0);
    expect(splitQuestionBlocks("no numbered starts anywhere in this text\n")).toEqual([]);
  });
});

describe("parseSupplementSolutions", () => {
  // Mock 8 ships three solutions and an answer key for Q1-3 in a separate file,
  // formatted nothing like the main solution document.
  const SUPPLEMENT = `Solution 8\\
The correct option is $\\mathbf{D}$

$$\\left| \\begin{matrix}
b & b \\\\
2b & 2b
\\end{matrix} \\right| = 0$$

Solution 38

{1.2} = 0.2 , {2.2} = 0.2, so the period of f(x) is 1

Solution -- 56

Height $= 2R/\\sqrt{3}$

Answer key of 1 , 2 & 3

Q. 1 -- b

Q. 2- b

Q. 3 - c
`;

  it("reads `Solution N`, `Solution -- N` headings the main parser cannot", () => {
    const { solutions } = parseSupplementSolutions(SUPPLEMENT);
    expect([...solutions.keys()].sort((a, b) => a - b)).toEqual([8, 38, 56]);
    expect(solutions.get(8)).toContain("\\begin{matrix}");
    expect(solutions.get(38)).toContain("period of f(x) is 1");
    expect(solutions.get(56)).toContain("2R/\\sqrt{3}");
  });

  it("recovers the tail answer key, which no other source in the paper carries", () => {
    const { answers } = parseSupplementSolutions(SUPPLEMENT);
    expect(answers.get(1)).toBe("B");
    expect(answers.get(2)).toBe("B");
    expect(answers.get(3)).toBe("C");
  });

  it("does not fold an answer line into the preceding solution body", () => {
    const { solutions } = parseSupplementSolutions(SUPPLEMENT);
    expect(solutions.get(56)).not.toContain("Q. 1");
  });

  it("drops a heading with an empty body rather than masking the gap", () => {
    const { solutions } = parseSupplementSolutions("Solution 12\n\n\nSolution 13\n\nreal work\n");
    expect(solutions.has(12)).toBe(false);
    expect(solutions.get(13)).toBe("real work");
  });
});

describe("stripKatexUnsupported", () => {
  it("removes the \\mspace command KaTeX rejects", () => {
    expect(stripKatexUnsupported("\\lim_{x \\rightarrow 0}\\mspace{2mu}\\frac{a}{b}")).toBe(
      "\\lim_{x \\rightarrow 0}\\frac{a}{b}"
    );
  });

  it("leaves everything else untouched", () => {
    const s = "\\frac{1}{2} + \\quad x \\, y";
    expect(stripKatexUnsupported(s)).toBe(s);
  });
});

describe("fixStackedOperators", () => {
  it("turns a Word-stacked lim that pandoc read as a binomial back into a limit", () => {
    // 29 zones across Mock 10. Valid LaTeX either way, so no validator complains —
    // it just renders as "(lim choose x->pi/6)" in parentheses.
    expect(fixStackedOperators("\\(\\binom{\\lim}{x \\rightarrow \\frac{\\pi}{6}}\\frac{a}{b}\\)")).toBe(
      "\\(\\lim_{x \\rightarrow \\frac{\\pi}{6}}\\frac{a}{b}\\)"
    );
  });

  it("brace-matches the limit expression rather than stopping at the first }", () => {
    expect(fixStackedOperators("\\binom{\\lim}{n \\to \\infty}")).toBe("\\lim_{n \\to \\infty}");
    expect(fixStackedOperators("\\binom{\\max}{\\{a,b\\}} x")).toBe("\\max_{\\{a,b\\}} x");
  });

  it("leaves a genuine binomial coefficient alone", () => {
    const s = "\\binom{n}{r} = \\frac{n!}{r!(n-r)!}";
    expect(fixStackedOperators(s)).toBe(s);
  });

  it("leaves an unbalanced fragment alone rather than corrupting it", () => {
    const s = "\\binom{\\lim}{x \\to 0";
    expect(fixStackedOperators(s)).toBe(s);
  });
});

describe("stripPandocInlineMarkup", () => {
  it("drops pandoc's inter-token separator, which renders literally", () => {
    expect(stripPandocInlineMarkup("vertex (\\(\\pm\\)`<!-- -->`{=html}5,0)")).toBe("vertex (\\(\\pm\\)5,0)");
  });

  it("drops leftover image layout attributes", () => {
    expect(stripPandocInlineMarkup('Then,{width="1.55in" height="1.59in"} tan q')).toBe("Then, tan q");
  });

  it("drops an image link pointing at the local extraction directory", () => {
    // The link resolves for no reader, AND the path contains a literal `\n`
    // (`scripts\nda-mock`) that normalizeNewlines turns into a real line break.
    const s = "![](C:\\Users\\x\\scripts\\nda-mock\\out\\m3\\q/media/image2.png) The frequency curve";
    expect(stripPandocInlineMarkup(s)).toBe("The frequency curve");
  });

  it("is a no-op on clean text", () => {
    expect(stripPandocInlineMarkup("\\(x^{2}\\) + 1 = 0")).toBe("\\(x^{2}\\) + 1 = 0");
  });
});

describe("parseCombinedBlock — fused blocks", () => {
  const q = (n: string, sol: string) =>
    `${n}\n\n**(a)** one **(b)** two **(c)** three **(d)** four\n\nSOL. **(${sol})** working here`;

  it("flags a block that swallowed a second, unnumbered question", () => {
    // Mock 10 numbers two questions "96", so one loses its number and its whole
    // text lands in the previous block. `parseOptionsFromBlock` takes the LAST
    // option chain, so the first question is handed its neighbour's answer.
    const fused = `${q("first question here", "b")}\n\n${q("second question here", "a")}`;
    const parsed = parseCombinedBlock(fused);
    expect(parsed.fused).toBe(true);
    expect(parsed.answer).toBe("A"); // the LAST chain's answer — hence the flag
  });

  it("does not flag a well-formed single question", () => {
    const parsed = parseCombinedBlock(q("just one question", "c"));
    expect(parsed.fused).toBe(false);
    expect(parsed.answer).toBe("C");
    expect(parsed.options.map((o) => o.text)).toEqual(["one", "two", "three", "four"]);
  });
});

describe("unescapePandocBrackets", () => {
  it("restores literal square brackets pandoc escaped", () => {
    expect(unescapePandocBrackets("\\[from Eq. (i) \\]")).toBe("[from Eq. (i) ]");
  });

  it("keeps a math zone that the literal brackets WRAP intact", () => {
    // Mock 4 Q33: "[but $x != log2(-1)$]". Left escaped, the \[ \] read as a
    // DISPLAY math zone containing an inline one — illegal nesting that KaTeX
    // rejects outright. pandoc writes real display math as $$, never \[.
    const out = unescapePandocBrackets("\\[but $x \\neq 1$\\]");
    expect(out).toBe("[but $x \\neq 1$]");
    expect(normalizeMathDelimiters(out)).toBe("[but \\(x \\neq 1\\)]");
  });

  it("leaves a LaTeX command that ends in a bracket alone", () => {
    expect(unescapePandocBrackets("\\left[ x \\right]")).toBe("\\left[ x \\right]");
  });

  it("unescapes a bracket that follows a LETTER", () => {
    // Mock 7 Q94: "[ \(...\) is in III Quadrant\]". A guard against a preceding
    // letter (added to protect \left[ / \right], which carry no backslash before
    // the bracket and were never at risk) left this `\]` escaped, so the solution
    // read as an unclosed DISPLAY math zone and blocked the commit.
    expect(unescapePandocBrackets("[ x is in III Quadrant\\]")).toBe("[ x is in III Quadrant]");
  });

  it("leaves a matrix row break followed by a bracket alone", () => {
    // `\\[` is a row break then math content, not an escaped literal.
    expect(unescapePandocBrackets("a \\\\[ b")).toBe("a \\\\[ b");
  });
});

describe("normalizeMathDelimiters", () => {
  it("converts pandoc's $...$ to the bank's \\(...\\)", () => {
    expect(normalizeMathDelimiters("If $x^{2} = 4$ then $x = 2$.")).toBe(
      "If \\(x^{2} = 4\\) then \\(x = 2\\)."
    );
  });

  it("converts display $$...$$ to \\[...\\]", () => {
    expect(normalizeMathDelimiters("Result: $$\\frac{a}{b}$$")).toBe("Result: \\[\\frac{a}{b}\\]");
  });

  it("leaves an escaped literal dollar alone", () => {
    // pandoc writes a real currency sign as \$; converting it would corrupt
    // the text and unbalance every zone after it.
    expect(normalizeMathDelimiters("costs \\$5 and \\$6")).toBe("costs \\$5 and \\$6");
  });

  it("leaves text already using \\(...\\) untouched", () => {
    expect(normalizeMathDelimiters("already \\(x\\) fine")).toBe("already \\(x\\) fine");
  });

  it("leaves an unpaired dollar as literal text rather than opening a zone", () => {
    expect(normalizeMathDelimiters("a lone $ sign")).toBe("a lone $ sign");
  });

  it("does not treat a dollar inside an existing math zone as a delimiter", () => {
    expect(normalizeMathDelimiters("$a$ and $b$")).toBe("\\(a\\) and \\(b\\)");
  });

  it("converts a math zone that spans newlines (a matrix)", () => {
    // Matrices are the common case in this source and pandoc breaks them
    // across lines, so a newline-forbidding regex silently skips them.
    const src = "If $A = \\begin{bmatrix}\n1 & 2 \\\\\n3 & 4\n\\end{bmatrix}$ then";
    expect(normalizeMathDelimiters(src)).toBe(
      "If \\(A = \\begin{bmatrix}\n1 & 2 \\\\\n3 & 4\n\\end{bmatrix}\\) then"
    );
  });

  it("does NOT swallow prose between two adjacent math zones", () => {
    // The regression that mattered: when the first (multi-line) zone failed to
    // match, its closing $ paired with the NEXT zone's opening $ and turned
    // " is such that " into math.
    const src = "$A = \\begin{bmatrix}\n1\n\\end{bmatrix}$ is such that $A^{2} = I,$ then";
    const out = normalizeMathDelimiters(src);
    expect(out).toContain("\\end{bmatrix}\\) is such that \\(A^{2} = I,\\)");
    expect(out).not.toContain("\\( is such that \\)");
  });

  it("closes a zone whose content ends in a backslash", () => {
    // pandoc emits a trailing `\` inside math before the closing `$`; treating
    // it as an escape left the zone open and cascaded into the next one. The
    // zone must close — and the stray break is dropped (see the test below).
    const out = normalizeMathDelimiters("Given $\\alpha = 2b\\$ next");
    expect(out.endsWith(" next")).toBe(true);
    expect(out).toContain("\\(\\alpha = 2b");
    expect(out).not.toContain("$");
  });

  it("drops a stray trailing backslash that pandoc left inside the zone", () => {
    // `$... = 2b\$` — the hard-break marker landed INSIDE the math. KaTeX
    // rejects a lone trailing backslash, so 25 zones failed to render.
    expect(normalizeMathDelimiters("Given $\\alpha = 2b\\$ next")).toBe("Given \\(\\alpha = 2b\\) next");
    expect(normalizeMathDelimiters("$\\end{bmatrix}\\$")).toBe("\\(\\end{bmatrix}\\)");
  });

  it("keeps a trailing row separator, which is not a stray break", () => {
    expect(normalizeMathDelimiters("$1 & 2 \\\\$")).toBe("\\(1 & 2 \\\\\\)");
  });

  it("stops at a paragraph break rather than running away on an unpaired $", () => {
    const src = "an unpaired $ here\n\nnew paragraph $x$ ok";
    const out = normalizeMathDelimiters(src);
    expect(out).toContain("an unpaired $ here");
    expect(out).toContain("\\(x\\)");
  });

  it("drops a content-free math zone instead of emitting an empty one", () => {
    // `$$$$` (Mock 6 Q90) became `\[\]`; the site's math splitter needs at least
    // one character inside a zone, so that empty opener paired with a far-later
    // `\]` and swallowed the prose between.
    expect(normalizeMathDelimiters("( a )$$$$ln OAB, tan45 = 1")).toBe("( a )ln OAB, tan45 = 1");
    expect(normalizeMathDelimiters("a $ $ b")).toBe("a  b");
  });

  it("recognises a CRLF paragraph break as a boundary", () => {
    // These documents are CRLF, so a guard keyed on the literal "\n\n" never
    // fires: an unpaired `$$` then paired with the NEXT paragraph's opener and
    // swallowed everything in between (Mock 6 Q90).
    const src = "tan45 = OB/OA$$\r\n\r\n$$\\begin{matrix}a\\end{matrix}$$";
    const out = normalizeMathDelimiters(src);
    expect(out).toContain("tan45 = OB/OA");
    expect(out).toContain("\\[\\begin{matrix}a\\end{matrix}\\]");
    // the runaway signature: the first $$ must NOT have paired across the break
    expect(out).not.toMatch(/\\\[[^[\]]*\r?\n\r?\n/);
  });
});

describe("stripSourceTag", () => {
  it("removes a bracketed exam attribution and reports it", () => {
    const r = stripSourceTag("If A and B are matrices, then \\[**Orissa JEE 2003**\\]");
    expect(r.text).toBe("If A and B are matrices, then");
    expect(r.tag).toBe("Orissa JEE 2003");
  });

  it("leaves an ordinary stem untouched", () => {
    const r = stripSourceTag("Find \\(x\\) such that \\[x = 1\\]");
    expect(r.tag).toBeNull();
    expect(r.text).toBe("Find \\(x\\) such that \\[x = 1\\]");
  });
});

describe("detectDirectionSets", () => {
  it("captures a 'Direction (Q. Nos. 84-85)' shared context and its members", () => {
    const sets = detectDirectionSets("> Direction (Q. Nos. 84-85) Let \\(a,b\\) be sides.\n>\n> Q.84 foo");
    expect(sets).toHaveLength(1);
    expect(sets[0].from).toBe(84);
    expect(sets[0].to).toBe(85);
    expect(sets[0].context).toContain("Let \\(a,b\\) be sides.");
  });

  it("captures a 'Passage I (Q. Nos. 1-3)' shared context", () => {
    const sets = detectDirectionSets("Passage I (Q. Nos. 1-3) Consider \\(z_1\\) and \\(z_2\\).\\\n1. Complex number");
    expect(sets).toHaveLength(1);
    expect(sets[0].from).toBe(1);
    expect(sets[0].to).toBe(3);
    expect(sets[0].context).toContain("Consider");
  });

  it("accepts Mock 7's 'Passage I (Ex. Nos. 9-10)' — Ex., not Q.", () => {
    // Accepting only `Q. Nos.` left this whole passage glued onto Q8's option
    // (D) and Q9/Q10 with no context at all.
    const md = [
      "8. Let \\(\\mathbf{a}\\) be a vector\\",
      "   (a) one (b) two\\",
      "   (c) three (d) four",
      "",
      "Passage I (Ex. Nos. 9-10) Two lines whose equations are \\(\\frac{x-3}{2}\\) and \\(\\frac{x-2}{3}\\) lie in a plane.",
      "",
      "9. Point of intersection lies on",
    ].join("\n");
    const sets = detectDirectionSets(md);
    expect(sets).toHaveLength(1);
    expect(sets[0].from).toBe(9);
    expect(sets[0].to).toBe(10);
    expect(sets[0].context).toContain("Two lines whose equations");
    // and the header must not survive inside the PRECEDING question's options
    const blocks = splitQuestionBlocks(md);
    const q8 = blocks.find((b) => b.number === 8)!;
    expect(q8.body).not.toContain("Passage I");
    expect(parseOptionsFromBlock(q8.body).options[3].text).toBe("four");
  });

  it("accepts the 'Direction: (Q. Nos. 71-75)' colon spelling", () => {
    // Mock 1 writes the colon; without it these five questions lost the data
    // they depend on and became unanswerable.
    const sets = detectDirectionSets(
      "Direction: (Q. Nos. 71-75) The students of a class are offered three languages.\n\n71. How many?"
    );
    expect(sets).toHaveLength(1);
    expect(sets[0].from).toBe(71);
    expect(sets[0].to).toBe(75);
    expect(sets[0].context).toContain("three languages");
  });

  it("lifts the shared option codes out of an assertion-reason Directions block", () => {
    // Mock 2 Q102-105: the four A/R codes are printed ONCE in the Directions
    // block and none of the four questions repeats them.
    const md = [
      "**Directions --** (Q. Nos. 102-105) Each question has an assertion (A) and a Reason (R).\\",
      "**(a)** Both A and R are true and R explains A.\\",
      "**(b)** Both A and R are true but R does not explain A.\\",
      "**(c)** A is true but R is false.\\",
      "**(d)** A is false but R is true.",
      "",
      "102. Assertion(A) something",
    ].join("\n");
    const sets = detectDirectionSets(md);
    expect(sets).toHaveLength(1);
    expect(sets[0].options?.map((o) => o.label)).toEqual(["A", "B", "C", "D"]);
    expect(sets[0].options?.[2].text).toBe("A is true but R is false.");
    // the codes belong in `options`, not repeated in the shared context
    expect(sets[0].context).toContain("assertion (A) and a Reason (R)");
    expect(sets[0].context).not.toContain("A is false but R is true");
  });

  it("leaves a data-passage Directions block without options", () => {
    // Mock 1's Q71-75 block is prose data, not answer codes — it must NOT be
    // mined for options.
    const sets = detectDirectionSets(
      "Direction: (Q. Nos. 71-75) The students of a class are offered three languages.\n\n71. How many?"
    );
    expect(sets[0].options).toBeUndefined();
  });

  it("returns nothing for a paper with no sets", () => {
    expect(detectDirectionSets(HOUSE_A)).toEqual([]);
  });
});

describe("parseVisionAnswerKey", () => {
  it("reads `N. (b)` headings out of a solution document's text layer", () => {
    // Mock 9's answer letters come from TEXT, not vision: they are ordinary
    // characters, and a letter read by eye is exactly what a transcription slip
    // corrupts silently.
    const text = "SOLUTION MOCK TEST-9\n1.  (b)   => Put x = 1 ...\n2. (b) => General term ...\n3. (a) => The sum ...\n";
    const keys = parseVisionAnswerKey(text, 120);
    expect(keys.get(1)).toBe("B");
    expect(keys.get(2)).toBe("B");
    expect(keys.get(3)).toBe("A");
  });

  it("ignores an inline (a) inside a worked solution", () => {
    const keys = parseVisionAnswerKey("7. (c) => since (a) and (b) both fail, we get\n", 120);
    expect(keys.get(7)).toBe("C");
    expect(keys.size).toBe(1);
  });

  it("keeps the FIRST heading for a number a later solution cites", () => {
    const keys = parseVisionAnswerKey("5. (a) => work\n9. (d) => as in\n5. (b) above\n", 120);
    expect(keys.get(5)).toBe("A");
  });

  it("rejects a number outside the paper", () => {
    expect(parseVisionAnswerKey("500. (a) => x\n", 120).size).toBe(0);
  });
});

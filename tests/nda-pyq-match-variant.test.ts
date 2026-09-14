import { describe, expect, it } from "vitest";
import {
  normText,
  labelMap,
  scorePair,
  adjudicatedLabelMap,
  type LabelAdjudication,
} from "../scripts/nda-pyq/match-variant";
import type { TQ } from "../scripts/cds-maths/lib";

const baseQ = (over: Partial<TQ> = {}): TQ => ({
  number: 1,
  stem: "What is the area of the triangle?",
  options: [
    { label: "A", text: "\\(32\\) square units" },
    { label: "B", text: "\\(24\\) square units" },
    { label: "C", text: "\\(16\\) square units" },
    { label: "D", text: "\\(12\\) square units" },
  ],
  chapter: "x",
  difficulty: "EASY",
  ...over,
});

describe("normText — folding publication LaTeX onto terse plain text", () => {
  it("expands fractions so \\dfrac{1}{4} and 1/4 converge", () => {
    // The whole matcher rests on this: the base series carries \dfrac and the
    // matching pass carries "1/4". Without expansion they share almost nothing.
    expect(normText("\\(\\dfrac{1}{4}\\)")).toBe(normText("1/4"));
    expect(normText("\\frac{1}{2}")).toBe(normText("1/2"));
    expect(normText("\\tfrac{3}{4}")).toBe(normText("3/4"));
  });

  it("keeps LaTeX command NAMES so sqrt(2) matches \\sqrt{2}", () => {
    expect(normText("\\(\\sqrt{2}\\)")).toBe(normText("sqrt(2)"));
    expect(normText("\\(\\pi\\)")).toBe(normText("pi"));
  });

  it("does NOT collapse genuinely different options", () => {
    expect(normText("\\(32\\) square units")).not.toBe(normText("24 square units"));
    expect(normText("1/4")).not.toBe(normText("1/2"));
    // The near-miss family that recurs across this paper.
    expect(normText("n2^{n-1} - 2^n + 1")).not.toBe(normText("n2^n - 2^{n-1} + 1"));
  });

  it("survives \\text{} and spacing differences", () => {
    expect(normText("\\text{Limit does not exist}")).toBe(normText("Limit  does not exist"));
  });
});

describe("normText — LaTeX/terse synonyms, every case measured on this paper", () => {
  // Each of these was a REAL match failure. Series B and C are independently
  // transcribed booklets and both failed on the SAME nine base questions, which
  // is what identified the base-side normalisation as the common factor rather
  // than either transcription.

  it("expands a NESTED fraction — the flat regex leaves a literal 'frac' behind", () => {
    // A-Q71 / A-Q73 / A-Q116. \frac{x^{3/2}}{3} has braces inside its numerator,
    // so the non-nesting expansion never fires and the residue poisons the key.
    expect(normText("\\(\\frac{x^{3/2}}{3} + c\\)")).toBe(normText("x^(3/2)/3 + c"));
    expect(normText("\\(\\frac{e^{2x}}{2} + c\\)")).toBe(normText("e^(2x)/2 + c"));
    expect(normText("\\(\\frac{5}{2\\sqrt{3}}\\)")).toBe(normText("5/(2 sqrt(3))"));
  });

  it("folds \\infty onto the word the matching pass writes", () => {
    // A-Q81, A-Q97: "(0, \infty)" vs "(0, infinity)".
    expect(normText("\\((0, \\infty)\\)")).toBe(normText("(0, infinity)"));
    expect(normText("\\((-\\infty, -1)\\)")).toBe(normText("(-infinity, -1)"));
  });

  it("folds \\int onto 'integral' AND drops the English glue of a written-out integral", () => {
    // A-Q97: "\int xe^x dx" vs "integral x e^x dx".
    expect(normText("\\(\\int xe^x dx\\)")).toBe(normText("integral x e^x dx"));
    // A-Q75: the terse form spells the bounds out in words.
    expect(normText("\\(\\int_0^1 f(x)\\,dx\\)")).toBe(normText("integral from 0 to 1 of f(x) dx"));
  });

  it("drops \\vec and folds \\times onto 'x', keeping dot and cross DISTINCT", () => {
    // A-Q70: "\sqrt{2}(\vec{b} \times \vec{c})" vs "sqrt(2) (b x c)".
    expect(normText("\\(\\sqrt{2}(\\vec{b} \\times \\vec{c})\\)")).toBe(normText("sqrt(2) (b x c)"));
    // The decoration goes; the OPERATOR must not — a dot product and a cross
    // product are different options and several questions here offer both.
    expect(normText("\\(\\vec{a} \\cdot \\vec{b}\\)")).not.toBe(normText("a x b"));
  });

  it("folds \\overline{X} onto the 'Xbar' the matching pass writes", () => {
    // A-Q104, the regression-lines question.
    expect(normText("\\(X = \\overline{X}\\)")).toBe(normText("X = Xbar"));
    expect(normText("\\(\\bar{Y}\\)")).toBe(normText("Ybar"));
  });

  it("drops \\ldots so a LaTeX ellipsis matches a typed one", () => {
    // A-Q42, the binomial-coefficient options.
    expect(normText("\\(2n(2n - 1) \\ldots (n + 1)n\\)")).toBe(normText("2n(2n-1) ... (n+1)n"));
  });

  it("folds the ASCII relational operators the brief tells agents to type", () => {
    // Not among the nine, but VARIANT_BRIEF.md mandates "<=" and "!=", and the
    // base writes \le / \neq — so this pair is a latent failure, not a
    // hypothetical one.
    expect(normText("\\(x \\le 2\\)")).toBe(normText("x <= 2"));
    expect(normText("\\(x \\geq 2\\)")).toBe(normText("x >= 2"));
    expect(normText("\\(x \\neq 2\\)")).toBe(normText("x != 2"));
  });

  it("leaves a bare variable x alone — folding \\times must not eat it", () => {
    // The \times -> "x" direction is deliberately one-way: the BASE is rewritten
    // to the variant's convention. Rewriting a standalone " x " to "times" on
    // the variant side would corrupt "f(x) = x + 1", which is far commoner than
    // a cross product.
    expect(normText("\\(f(x) = x + 1\\)")).toBe(normText("f(x) = x + 1"));
    expect(normText("x + 1")).not.toBe(normText("times + 1"));
  });

  it("STILL does not collapse genuinely different options", () => {
    // The whole risk of loosening normalisation is that labelMap's 1-to-1
    // requirement starts matching the wrong option. These must stay apart.
    expect(normText("\\(\\frac{1}{2}\\)")).not.toBe(normText("2/1"));
    expect(normText("\\((0, \\infty)\\)")).not.toBe(normText("(0, infinity) - {1}"));
    expect(normText("\\(\\frac{e^{2x}}{2} + c\\)")).not.toBe(normText("e^(2x)/4 + c"));
    expect(normText("\\(\\int_0^1 f(x)\\,dx\\)")).not.toBe(normText("2 integral from 0 to 1 of f(x) dx"));
    expect(normText("\\(X + Y + 11 = 0\\)")).not.toBe(normText("Xbar + Ybar + 11 = 0"));
    // The cheap way to make "<=" meet "\le" is to strip both to nothing — which
    // silently equates it with ">=". The operators must be ALIASED, not dropped.
    expect(normText("x <= 2")).not.toBe(normText("x >= 2"));
    expect(normText("\\(x \\le 2\\)")).not.toBe(normText("\\(x \\ge 2\\)"));
  });
});

describe("normText — SIGN survives, because stripping it silently mis-keys", () => {
  // Found on Set D Q102/Q104 by the agent transcribing them: stripping every
  // non-alphanumeric collapses a sign-only option pair to one string. labelMap
  // then pairs greedily in variant order and can INVERT the (a)/(c) mapping
  // with no error anywhere — the worst failure this pass has, because a
  // reported non-match is visible and a wrong map is not.
  //
  // The asymmetry that decides the rule: a character kept too eagerly costs a
  // match the tool REPORTS as too weak; a character stripped too eagerly costs
  // a wrong answer letter nobody sees. Prefer keeping.

  it("keeps a leading minus — '-1' and '1' are different options", () => {
    expect(normText("-1")).not.toBe(normText("1"));
    expect(normText("\\(-1\\)")).not.toBe(normText("\\(1\\)"));
  });

  it("keeps an internal sign — the D-Q104 pair differs ONLY by one operator", () => {
    expect(normText("n2^(n-1) - 2^n + 1")).not.toBe(normText("n2^(n-1) - 2^n - 1"));
    expect(normText("\\(n2^{n-1} - 2^n + 1\\)")).not.toBe(normText("\\(n2^{n-1} - 2^n - 1\\)"));
  });

  it("still folds the two sides of a sign-bearing pair onto each other", () => {
    // Keeping the sign must not cost the LaTeX-vs-terse match it exists inside.
    expect(normText("\\(n2^{n-1} - 2^n + 1\\)")).toBe(normText("n2^(n-1) - 2^n + 1"));
    expect(normText("\\((-\\infty, -1)\\)")).toBe(normText("(-infinity, -1)"));
    expect(normText("\\(\\sin^{-1}(x^{3/2})\\)")).toBe(normText("sin^(-1)(x^(3/2))"));
  });

  it("folds the 'inf' abbreviation onto 'infinity'", () => {
    // Set D Q107: the Hindi-sourced band typed "(-inf, 0)" where the base has
    // "\((-\infty, 0)\)". Word-bounded so it cannot chew the middle out of
    // "infinity" itself.
    expect(normText("(-inf, 0)")).toBe(normText("\\((-\\infty, 0)\\)"));
    expect(normText("(0, inf)")).toBe(normText("(0, infinity)"));
    expect(normText("(-inf, 0)")).not.toBe(normText("(0, inf)"));
  });

  it("folds typographic dashes onto the ASCII minus", () => {
    // The base carries publication text; a unicode minus or en-dash there
    // against an ASCII hyphen in the terse pass would be a NEW mismatch
    // introduced by the very rule that keeps the sign.
    expect(normText("−1")).toBe(normText("-1"));
    expect(normText("x – 1")).toBe(normText("x - 1"));
    expect(normText("x − 1")).toBe(normText("x - 1"));
  });
});

describe("labelMap — where each variant label's text sits in the base", () => {
  const q = baseQ();

  it("returns the identity when the option order is unchanged", () => {
    const v = {
      number: 5,
      stem: "area of triangle",
      options: [
        { label: "A", text: "32 square units" },
        { label: "B", text: "24 square units" },
        { label: "C", text: "16 square units" },
        { label: "D", text: "12 square units" },
      ],
    };
    expect(labelMap(v, q)).toEqual({ A: "A", B: "B", C: "C", D: "D" });
  });

  it("detects a genuine reshuffle — the case this whole pass exists for", () => {
    const v = {
      number: 5,
      stem: "area of triangle",
      options: [
        { label: "A", text: "12 square units" },
        { label: "B", text: "32 square units" },
        { label: "C", text: "24 square units" },
        { label: "D", text: "16 square units" },
      ],
    };
    // Base answer A ("32") would be at variant label B.
    expect(labelMap(v, q)).toEqual({ A: "D", B: "A", C: "B", D: "C" });
  });

  it("REFUSES when an option has no counterpart, rather than forcing a map", () => {
    const v = {
      number: 5,
      stem: "area of triangle",
      options: [
        { label: "A", text: "32 square units" },
        { label: "B", text: "24 square units" },
        { label: "C", text: "16 square units" },
        { label: "D", text: "99 cubic parsecs" },
      ],
    };
    // A genuinely different option is a FINDING — silently mapping it to the
    // nearest survivor would mis-key the question.
    expect(labelMap(v, q)).toBeNull();
  });

  it("never maps two variant labels onto the same base label", () => {
    const v = {
      number: 5,
      stem: "area",
      options: [
        { label: "A", text: "32 square units" },
        { label: "B", text: "32 square units" },
        { label: "C", text: "16 square units" },
        { label: "D", text: "12 square units" },
      ],
    };
    const m = labelMap(v, q);
    if (m) expect(new Set(Object.values(m)).size).toBe(4);
  });
});

describe("scorePair — separating siblings that share everything but a letter", () => {
  // Q7/Q8 of this paper: same shared context, byte-identical option set, and
  // stems differing only in "tan A" vs "tan B". Measured on the real booklet.
  const ctx = "For the next two items: Given that tan((A+B)/2) = p and tan((A-B)/2) = q, where pq != +-1.";
  const opts = [
    { label: "A", text: "(p-q)/(1+pq)" },
    { label: "B", text: "(p+q)/(1-pq)" },
    { label: "C", text: "(p+q)/(1+pq)" },
    { label: "D", text: "(p-q)/(1-pq)" },
  ];
  const q7 = baseQ({ number: 7, context: ctx, stem: "What is tan A equal to?", options: opts });
  const q8 = baseQ({ number: 8, context: ctx, stem: "What is tan B equal to?", options: opts });
  const v7 = { number: 37, stem: `${ctx} What is tan A equal to?`, options: opts };

  it("prefers the true sibling, even though both share context and options", () => {
    const s7 = scorePair(v7, q7).score;
    const s8 = scorePair(v7, q8).score;
    expect(s7).toBeGreaterThan(s8);
  });

  it("scores a set member highly despite its bare stem being four words", () => {
    // Guards the context-in-base-text rule: without it a folded variant stem is
    // compared against "What is tan A equal to?" alone and scores poorly.
    expect(scorePair(v7, q7).score).toBeGreaterThan(0.6);
  });
});

describe("adjudicatedLabelMap — a hand map that REFUSES once its question moves", () => {
  // D-Q106 is the real case: "Minimum value is at x = -2" against the base's
  // "minimum occurs at \(x = -2\)". Two independent transcriptions of one
  // question worded differently. Trigram similarity puts the correct pairing on
  // the diagonal of every row AND column, but at 0.38 against a 0.32 runner-up —
  // far too thin to lower a threshold that is protecting 119 other questions.
  // So it is adjudicated by hand and the adjudication asserts its own premises,
  // because a hand map that silently survives a re-transcription is a wrong key
  // waiting to happen.
  const v = {
    number: 106,
    stem: "For the curve y = x e^(2x)",
    options: [
      { label: "A", text: "Minimum value is at x = -2" },
      { label: "B", text: "Minimum value is at x = -1" },
      { label: "C", text: "Minimum value is at x = -1/2" },
      { label: "D", text: "Maximum value is at x = -1/2" },
    ],
  };
  const q: TQ = {
    number: 96,
    stem: "For the curve \(y = xe^{2x}\)",
    options: [
      { label: "A", text: "minimum occurs at \(x = -2\)" },
      { label: "B", text: "minimum occurs at \(x = -1\)" },
      { label: "C", text: "minimum occurs at \(x = -1/2\)" },
      { label: "D", text: "maximum occurs at \(x = -1/2\)" },
    ],
    chapter: "x",
    difficulty: "EASY",
  };
  const adj: LabelAdjudication = {
    number: 106,
    base: 96,
    labels: { A: "A", B: "B", C: "C", D: "D" },
    reason: "same four statements, reworded; values -2/-1/-1/2 and min/max agree exactly",
    assertVariantOptions: {
      A: "Minimum value is at x = -2",
      B: "Minimum value is at x = -1",
      C: "Minimum value is at x = -1/2",
      D: "Maximum value is at x = -1/2",
    },
    assertBaseOptions: {
      A: "minimum occurs at \(x = -2\)",
      B: "minimum occurs at \(x = -1\)",
      C: "minimum occurs at \(x = -1/2\)",
      D: "maximum occurs at \(x = -1/2\)",
    },
  };

  it("applies when every asserted text still matches", () => {
    expect(adjudicatedLabelMap(v, q, adj)).toEqual({ A: "A", B: "B", C: "C", D: "D" });
  });

  it("REFUSES when a variant option has been re-transcribed", () => {
    const moved = {
      ...v,
      options: v.options.map((o) => (o.label === "C" ? { ...o, text: "Minimum value is at x = -3" } : o)),
    };
    expect(() => adjudicatedLabelMap(moved, q, adj)).toThrow(/variant option C/i);
  });

  it("REFUSES when the BASE option text has moved under it", () => {
    const moved: TQ = {
      ...q,
      options: q.options.map((o) => (o.label === "A" ? { ...o, text: "minimum occurs at \(x = -4\)" } : o)),
    };
    expect(() => adjudicatedLabelMap(v, moved, adj)).toThrow(/base option A/i);
  });

  it("REFUSES when it is pointed at a different base question", () => {
    expect(() => adjudicatedLabelMap(v, { ...q, number: 95 }, adj)).toThrow(/base question/i);
  });

  it("REFUSES a map that is not a bijection onto A-D", () => {
    const bad = { ...adj, labels: { A: "A", B: "A", C: "C", D: "D" } };
    expect(() => adjudicatedLabelMap(v, q, bad)).toThrow(/bijection/i);
  });
});

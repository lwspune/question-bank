import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_AI_CONDITIONAL_NOTE: SubtopicNote = {
  subtopicName: "Conditional Identities",
  title: "Conditional Identities",
  oneLineDefinition:
    "When a question gives a relation between the letters, use it to rewrite each piece of the expression until the pieces match; the answer is usually a constant.",
  whyItMatters:
    "Sixteen PYQs, eleven of them HARD — the hardest page in the chapter by count. Almost all of them have a small constant answer (0, 1, −1, 2). That makes a numeric test the fastest check: pick numbers that satisfy the condition, evaluate, and strike out options.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsai-rewrite-with-condition",
      name: "Rewrite each piece with the condition",
      intuition:
        "The condition is a machine for replacing one expression by another. Apply it to each denominator or bracket separately; the pieces usually turn into multiples of one common factor, which then cancels.",
      definition:
        "- \\(ab + bc + ca = 0\\) gives \\(bc = -a(b + c)\\), so \\(a^2 - bc = a(a + b + c)\\), and likewise for \\(b\\) and \\(c\\).\n" +
        "- \\(a + b = 2c\\) gives \\(b - c = c - a = -(a - c)\\).\n" +
        "- \\(x^2 = y + z\\) gives \\(x^2 + x = x + y + z\\), so \\(\\dfrac{1}{x + 1} = \\dfrac{x}{x + y + z}\\).\n" +
        "- A relation like \\(\\left(x + \\dfrac{1}{yz}\\right) - \\left(y + \\dfrac{1}{zx}\\right)\\) regroups as \\((x - y)\\left(1 + \\dfrac{1}{xyz}\\right)\\).\n" +
        "Check the result on numbers that satisfy the condition, avoiding values that make a denominator zero.",
      formula: {
        label: "A typical rewrite",
        latex: "ab + bc + ca = 0 \\;\\Rightarrow\\; a^2 - bc = a(a + b + c)",
      },
      authoredExample: {
        prompt: "If \\(a + b = 2c\\), find \\(\\dfrac{a}{a - c} + \\dfrac{b}{b - c}\\).",
        steps: [
          "\\(b - c = -(a - c)\\), so the sum is \\(\\dfrac{a - b}{a - c}\\).",
          "With \\(b = 2c - a\\), \\(a - b = 2(a - c)\\).",
          "Check: \\(a = 1\\), \\(b = 3\\), \\(c = 2\\) gives \\(-1 + 3 = 2\\).",
        ],
        answer: "\\(2\\).",
      },
      selfCheckExample: {
        prompt: "If \\(x + y + z = 0\\) and none is zero, find \\(\\dfrac{(x + y)(y + z)(z + x)}{xyz}\\).",
        steps: ["Each bracket is minus the missing letter: \\((-z)(-x)(-y) = -xyz\\)."],
        answer: "\\(-1\\).",
      },
      practiceSet: [
        { prompt: "\\(a + b = 2c\\). Find \\(\\dfrac{a - c}{b - c}\\).", answer: "\\(-1\\)" },
        { prompt: "\\(ab + bc + ca = 0\\). Rewrite \\(b^2 - ca\\).", answer: "\\(b(a + b + c)\\)" },
        { prompt: "\\(x^2 = y + z\\). Rewrite \\(\\dfrac{1}{x + 1}\\).", answer: "\\(\\dfrac{x}{x + y + z}\\)" },
        { prompt: "\\(a + b + c = 0\\). \\(b + c\\) equals?", answer: "\\(-a\\)" },
      ],
      pyqExampleId: "b04410c2-c905-42be-b8ba-55d2515e9948", // 2017 (II) — ab + bc + ca = 0, Σa²/(a² − bc)
      traps: [
        {
          title: "Test with numbers that fit",
          body:
            "When \\(ab + bc + ca = 0\\), \\(a = b = 1\\) does not fit unless \\(c = -\\dfrac12\\). Build the test triple from the condition, then evaluate; a single wrong-looking value rules out options quickly.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsai-equal-ratios",
      name: "Equal ratios",
      intuition:
        "If several fractions are equal, each is also equal to the fraction you get by adding all the numerators and all the denominators. That gives the common value at once — unless the denominators add to zero, which is a separate case.",
      definition:
        "- If \\(\\dfrac{a}{b} = \\dfrac{c}{d} = \\dfrac{e}{f} = k\\), then \\(k = \\dfrac{a + c + e}{b + d + f}\\) whenever \\(b + d + f \\ne 0\\).\n" +
        "- Write each numerator as \\(k\\) times its denominator and add; if the added denominators are zero, solve that case directly.\n" +
        "- \\(\\dfrac{p + q}{q + r} = \\dfrac{r + s}{s + p}\\): cross-multiply and factor, giving \\((p - r)(p + q + r + s) = 0\\) — either one or the other.",
      formula: {
        label: "Adding equal ratios",
        latex: "\\dfrac ab = \\dfrac cd = \\dfrac ef = k \\;\\Rightarrow\\; k = \\dfrac{a + c + e}{b + d + f}",
      },
      authoredExample: {
        prompt: "If \\(\\dfrac{a + b}{c} = \\dfrac{b + c}{a} = \\dfrac{c + a}{b} = k\\), find the possible values of \\(k\\).",
        steps: [
          "Adding numerators and denominators: \\(k = \\dfrac{2(a + b + c)}{a + b + c} = 2\\), if \\(a + b + c \\ne 0\\).",
          "If \\(a + b + c = 0\\), then \\(a + b = -c\\) and \\(k = -1\\).",
        ],
        answer: "\\(2\\) or \\(-1\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\dfrac a3 = \\dfrac b4 = \\dfrac c5\\), find \\(\\dfrac{a + b + c}{b}\\).",
        steps: ["Take \\(a, b, c = 3k, 4k, 5k\\): \\(\\dfrac{12k}{4k}\\)."],
        answer: "\\(3\\).",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac x2 = \\dfrac y3 = \\dfrac z4\\), \\(x + y + z = 18\\). Find \\(z\\).", answer: "\\(8\\)" },
        { prompt: "\\(\\dfrac ab = \\dfrac cd\\). Then \\(\\dfrac{a + c}{b + d}\\)?", answer: "\\(\\dfrac ab\\)" },
        { prompt: "\\(\\dfrac ab = \\dfrac bc\\). Then?", answer: "\\(b^2 = ac\\)" },
        { prompt: "\\((p - r)(p + q + r + s) = 0\\) means?", answer: "\\(p = r\\) or \\(p + q + r + s = 0\\)" },
      ],
      pyqExampleId: "f529b339-ce9b-4722-a01f-8682e76c5de4", // 2019 (II) — a/(b + c) = b/(c + a) = c/(a + b)
      traps: [
        {
          title: "Do not drop the zero-sum case",
          body:
            "Adding numerators and denominators divides by their sum. When that sum can be zero, the ratio takes a second value, and the options usually include both the full answer and the half answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsai-factor-then-substitute",
      name: "Factor first, then substitute",
      intuition:
        "If a quadratic expression is given a value and a linear one is also known, the quadratic almost always factors with the linear one as a factor. Divide and the rest drops out.",
      definition:
        "- Factor the expression so the given combination appears: \\(4p^2 + 4pq - 3q^2 = (2p + 3q)(2p - q)\\).\n" +
        "- Differences of squares hide in products like \\((u + v)(u - v)\\) with \\(u\\), \\(v\\) themselves sums.\n" +
        "- Surds: if \\(x - 2 = u + u^2\\) with \\(u^3 = 2\\), cube both sides; the \\(u^3\\) terms become numbers.\n" +
        "- Divide only by factors known to be non-zero, and say so.",
      formula: {
        label: "Divide out the known factor",
        latex: "x^2 + xy - 2y^2 = (x + 2y)(x - y)",
      },
      authoredExample: {
        prompt: "If \\(x + 2y = 5\\) and \\(x^2 + xy - 2y^2 = 15\\), find \\(x - y\\).",
        steps: ["\\(x^2 + xy - 2y^2 = (x + 2y)(x - y)\\).", "So \\(5(x - y) = 15\\)."],
        answer: "\\(x - y = 3\\).",
      },
      selfCheckExample: {
        prompt: "If \\(a - b = 4\\) and \\(a^2 - b^2 = 28\\), find \\(a\\).",
        steps: ["\\(a + b = \\dfrac{28}{4} = 7\\).", "Add to \\(a - b = 4\\): \\(2a = 11\\)."],
        answer: "\\(5.5\\).",
      },
      practiceSet: [
        { prompt: "\\((x + y)(x - y) = 24\\), \\(x - y = 3\\). Find \\(x + y\\).", answer: "\\(8\\)" },
        { prompt: "\\(x^2 - 5xy + 6y^2 = 0\\). Possible \\(x : y\\)?", answer: "\\(2\\) or \\(3\\)" },
        { prompt: "\\(a^2 - b^2 = 21\\), \\(a + b = 7\\). Find \\(a - b\\).", answer: "\\(3\\)" },
        { prompt: "\\(x = 1 + \\sqrt[3]{2}\\). Find \\((x - 1)^3\\).", answer: "\\(2\\)" },
      ],
      pyqExampleId: "994dda8d-0793-46f3-8d33-89d2a2ac0ae0", // 2016 (II) — 2p + 3q given, 4p² + 4pq − 3q² given
      traps: [
        {
          title: "Dividing by something that could be zero",
          body:
            "From \\(x^2(m - 1) = mab(m - 1)\\) you may cancel \\(m - 1\\) only if \\(m \\ne 1\\). From \\((x - y)k = (y - z)k\\) you may not conclude \\(x - y = y - z\\) unless \\(k \\ne 0\\) — and sometimes \\(k = 0\\) is the answer the question wants.",
        },
      ],
    },
  ],
};

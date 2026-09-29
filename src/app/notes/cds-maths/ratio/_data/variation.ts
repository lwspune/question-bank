import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_RA_VARIATION_NOTE: SubtopicNote = {
  subtopicName: "Direct and Inverse Variation",
  title: "Direct and Inverse Variation",
  oneLineDefinition:
    "'y varies as x' means y = kx; 'inversely' means y = k/x; find k from one pair of values and use it for another.",
  whyItMatters:
    "Eighteen PYQs, the largest page in the chapter. Every computational one is the same three steps: write the equation with k, find k from the given pair, substitute the new values. The statement questions ask which expressions still vary together — substitute x = ky and see whether the ratio is constant.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsra-direct-inverse",
      name: "Finding the constant of variation",
      intuition:
        "'Varies as' is shorthand for 'is a constant multiple of'. Once that constant is known from one situation, every other situation follows. Inverse variation keeps the PRODUCT constant.",
      definition:
        "- \\(y \\propto x\\): \\(y = kx\\). \\(y \\propto x^n\\): \\(y = kx^n\\). \\(y \\propto \\dfrac1x\\): \\(xy = k\\).\n" +
        "- Joint variation: \\(p \\propto \\dfrac{q}{r^2}\\) means \\(p = \\dfrac{kq}{r^2}\\); percentage changes multiply through.\n" +
        "- Fixed stock shared among men for days: men \\(\\times\\) days is constant.\n" +
        "- A quantity 'reduced by an amount varying as \\(\\sqrt n\\)': \\(v = v_0 - c\\sqrt n\\).",
      formula: {
        label: "Direct and inverse",
        latex: "y = kx^n, \\qquad x^n y = k",
      },
      authoredExample: {
        prompt: "\\(y\\) varies inversely as \\(x^2\\), and \\(y = 12\\) when \\(x = 2\\). Find \\(y\\) when \\(x = 4\\).",
        steps: ["\\(x^2y = k = 4\\times 12 = 48\\).", "\\(y = \\dfrac{48}{16}\\)."],
        answer: "\\(3\\).",
      },
      selfCheckExample: {
        prompt: "\\(p\\) varies directly as \\(q\\) and inversely as \\(r\\). If \\(q\\) rises by \\(50\\%\\) and \\(r\\) falls by \\(25\\%\\), by what percentage does \\(p\\) change?",
        steps: ["\\(p\\) is multiplied by \\(\\dfrac{1.5}{0.75} = 2\\)."],
        answer: "An increase of \\(100\\%\\).",
      },
      practiceSet: [
        { prompt: "\\(y \\propto x\\), \\(y = 15\\) at \\(x = 3\\). \\(y\\) at \\(x = 7\\)?", answer: "\\(35\\)" },
        { prompt: "Food for \\(60\\) men for \\(20\\) days lasts \\(40\\) men how long?", answer: "\\(30\\) days" },
        { prompt: "\\(y \\propto \\sqrt x\\), \\(y = 6\\) at \\(x = 9\\). \\(y\\) at \\(x = 25\\)?", answer: "\\(10\\)" },
        { prompt: "\\(y \\propto x^2\\), \\(x\\) doubled. \\(y\\)?", answer: "Multiplied by \\(4\\)" },
      ],
      pyqExampleId: "8e813e8f-af6d-43dd-8e40-95a2a0844496", // 2019 (I) — y inversely proportional to √x
      traps: [
        {
          title: "Inverse means the product is constant",
          body:
            "If \\(y\\) varies inversely as \\(\\sqrt x\\), then \\(y\\sqrt x\\) is constant, so a bigger \\(y\\) needs a SMALLER \\(x\\). An answer larger than the starting \\(x\\) signals a direct-variation slip.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsra-variation-statements",
      name: "Which quantities vary together",
      intuition:
        "To test whether \\(A\\) varies as \\(B\\), substitute the given relation (\\(x = ky\\)) and look at \\(\\dfrac AB\\). If it is a constant — no \\(x\\) or \\(y\\) left — they vary together.",
      definition:
        "- If \\(x = ky\\), then any two expressions of the same degree in \\(x, y\\) vary together: \\(x^2 + y^2 = (k^2 + 1)y^2\\).\n" +
        "- \\(\\dfrac{x^3}{y^4} = \\dfrac{k^3}{y}\\) varies INVERSELY as \\(y\\).\n" +
        "- If \\(x \\propto yz\\), then \\(y \\propto \\dfrac xz\\), i.e. \\(y\\) varies inversely as \\(\\dfrac zx\\).\n" +
        "- If \\(P^2 \\propto R\\) and \\(Q^2 \\propto R\\), then \\(P^2 \\pm Q^2\\) and \\(PQ\\) also vary as \\(R\\).",
      formula: {
        label: "Test for variation",
        latex: "A \\propto B \\iff \\dfrac AB = \\text{constant}",
      },
      authoredExample: {
        prompt: "If \\(x\\) varies as \\(y\\), does \\(x^2 - xy\\) vary as \\(y^2\\)?",
        steps: ["With \\(x = ky\\): \\(x^2 - xy = (k^2 - k)y^2\\), a constant times \\(y^2\\)."],
        answer: "Yes.",
      },
      selfCheckExample: {
        prompt: "If \\(a\\) varies as \\(b\\), does \\(\\dfrac{a^2}{b}\\) vary as \\(b\\)?",
        steps: ["\\(\\dfrac{a^2}{b} = \\dfrac{k^2b^2}{b} = k^2b\\)."],
        answer: "Yes.",
      },
      practiceSet: [
        { prompt: "\\(x \\propto y\\). Does \\(x + y \\propto y\\)?", answer: "Yes" },
        { prompt: "\\(x \\propto y\\). Does \\(xy \\propto y\\)?", answer: "No (it varies as \\(y^2\\))" },
        { prompt: "\\(x \\propto yz\\). \\(z\\) varies as?", answer: "\\(\\dfrac xy\\)" },
        { prompt: "\\(x \\propto y\\). \\(\\dfrac{x}{y^2}\\) varies inversely as?", answer: "\\(y\\)" },
      ],
      pyqExampleId: "a669e221-8245-4cc8-9ab8-79b2a73a033e", // 2026 (I) — x varies as y: x² + y² and x³/y⁴
      traps: [
        {
          title: "Count the degree",
          body:
            "After \\(x = ky\\), an expression of degree \\(n\\) becomes a constant times \\(y^n\\). So \\(\\dfrac{x^3}{y^4}\\) (degree \\(-1\\)) varies inversely as \\(y\\), not directly.",
        },
      ],
    },
  ],
};

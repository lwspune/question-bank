import type { SubtopicNote } from "@/app/notes/_types";

export const RANGE_FN_NOTE: SubtopicNote = {
  subtopicName: "Range, One-One and Onto",
  title: "Range, One-One and Onto",
  oneLineDefinition:
    "Finding the set of values a function takes, by bounding, by the discriminant or by monotonicity, and using it to decide whether a function is one-one, onto, both or neither.",
  whyItMatters:
    "Twenty-six PYQs, split evenly. Half ask for a range; the other half ask whether a function is one-one and onto, and the onto half of that question is a range question in disguise. Two ideas cover the page.",
  concepts: [
    // C1 — finding the range
    {
      kind: "formula" as const,
      slug: "jfn-range",
      name: "Finding the range",
      intuition:
        "Three tools cover almost everything. If the formula is built from a bounded piece such as \\(\\sin x\\), \\(|x|\\) or \\((x-a)^2\\), shift and scale that piece's range. For \\(y=\\frac{p(x)}{q(x)}\\) with quadratics, rearrange into a quadratic in \\(x\\) and require its discriminant to be \\(\\ge0\\). If the function is monotonic on an interval, its range runs between the values at the ends.",
      definition:
        "- **Bounded piece:** \\(\\sin x\\in[-1,1]\\), \\(a\\sin x+b\\cos x\\in[-\\sqrt{a^2+b^2},\\sqrt{a^2+b^2}]\\).\n" +
        "- **Rational:** \\(y\\,q(x)-p(x)=0\\) must have a real root: discriminant \\(\\ge0\\).\n" +
        "- **Monotonic on \\([a,b]\\):** range between \\(f(a)\\) and \\(f(b)\\).",
      formula: {
        label: "Rational function",
        latex: "y=\\frac{p(x)}{q(x)}\\ \\Rightarrow\\ \\Delta_x\\ge0",
      },
      authoredExample: {
        prompt: "Find the range of \\(\\frac{1}{5-2\\sin x}\\).",
        steps: [
          "\\(5-2\\sin x\\in[3,7]\\).",
        ],
        answer: "\\(\\left[\\frac17,\\frac13\\right]\\).",
      },
      selfCheckExample: {
        prompt: "Find the range of \\(\\frac{x}{x^2+1}\\).",
        steps: [
          "\\(yx^2-x+y=0\\); for \\(y\\ne0\\) need \\(1-4y^2\\ge0\\). \\(y=0\\) at \\(x=0\\).",
        ],
        answer: "\\(\\left[-\\frac12,\\frac12\\right]\\).",
      },
      practiceSet: [
        { prompt: "Range of \\(x^2+2x+3\\)?", answer: "\\([2,\\infty)\\)" },
        { prompt: "Range of \\(3\\sin x+4\\cos x\\)?", answer: "\\([-5,5]\\)" },
        { prompt: "Range of \\(2^x\\) on \\([1,3]\\)?", answer: "\\([2,8]\\)" },
        { prompt: "Range of \\(\\sqrt{4-x^2}\\)?", answer: "\\([0,2]\\)" },
      ],
      pyqExampleId: "914af6d6-25d6-4e11-8593-7a1e90fd60da", // 2023 — range of sqrt(3 - x) + sqrt(2 + x)
      traps: [
        {
          title: "When the x² term vanishes",
          body: "In the discriminant method, the value of \\(y\\) that makes the \\(x^2\\) coefficient zero turns the equation linear. Check it separately: it may or may not be in the range.",
        },
      ],
    },

    // C2 — one-one and onto
    {
      kind: "formula" as const,
      slug: "jfn-one-one-onto",
      name: "Deciding one-one and onto",
      intuition:
        "A function is one-one if different inputs give different outputs. It is enough that the function is strictly increasing or strictly decreasing, for instance with a derivative of one sign. To show it is not one-one, find two inputs with the same output: an even function, or a rational function that tends to the same value at both ends and turns in between. A function is onto if its range equals the stated codomain, so find the range and compare.",
      definition:
        "- **One-one:** \\(f(a)=f(b)\\Rightarrow a=b\\). Strictly monotonic suffices.\n" +
        "- **Onto:** range = codomain.\n" +
        "- **Neither:** a bounded, turning function into \\(\\mathbb R\\).\n" +
        "- Onto depends on the codomain given; one-one depends on the domain.",
      formula: {
        label: "The two tests",
        latex: "\\text{one-one: } f(a)=f(b)\\Rightarrow a=b;\\qquad \\text{onto: } f(A)=B",
      },
      authoredExample: {
        prompt: "Is \\(f:\\mathbb R\\to\\mathbb R\\), \\(f(x)=x^3+x\\), one-one and onto?",
        steps: [
          "\\(f'(x)=3x^2+1>0\\): strictly increasing, so one-one.",
          "It tends to \\(\\pm\\infty\\) at the ends, so its range is \\(\\mathbb R\\).",
        ],
        answer: "Both one-one and onto.",
      },
      selfCheckExample: {
        prompt: "Is \\(f:\\mathbb R\\to\\mathbb R\\), \\(f(x)=\\frac{x^2}{x^2+1}\\), one-one? Onto?",
        steps: [
          "Even, so \\(f(1)=f(-1)\\): not one-one.",
          "Range \\([0,1)\\ne\\mathbb R\\): not onto.",
        ],
        answer: "Neither.",
      },
      practiceSet: [
        { prompt: "\\(e^x:\\mathbb R\\to\\mathbb R\\)?", answer: "One-one, not onto" },
        { prompt: "\\(x^2:[0,\\infty)\\to[0,\\infty)\\)?", answer: "Both" },
        { prompt: "\\(|x|:\\mathbb R\\to\\mathbb R\\)?", answer: "Neither" },
        { prompt: "\\(2x+3:\\mathbb R\\to\\mathbb R\\)?", answer: "Both" },
      ],
      pyqExampleId: "58a8a62d-0dd8-488b-978a-ac8c5770f152", // 2025 — (2^x - 2^-x)/(2^x + 2^-x) from R to (-inf, 1)
      traps: [
        {
          title: "Read the codomain",
          body: "The same formula can be onto one codomain and not another. A range of \\((-1,1)\\) is not onto \\((-\\infty,1)\\), even though every value is below 1.",
        },
      ],
    },
  ],
};

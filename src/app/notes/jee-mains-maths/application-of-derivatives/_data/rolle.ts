import type { SubtopicNote } from "@/app/notes/_types";

export const ROLLE_AOD_NOTE: SubtopicNote = {
  subtopicName: "Rolle's and Mean Value Theorems",
  title: "Rolle's and Mean Value Theorems",
  oneLineDefinition:
    "The two theorems that guarantee a point where the derivative takes a given value, and how they count the zeros that f′ and f″ must have.",
  whyItMatters:
    "Six PYQs, four of them multiple choice. Three apply Rolle's theorem or the mean value theorem directly — find the point, or a parameter that makes the theorem hold; three count how many zeros f′ or f″ must have, given where f vanishes or takes equal values. Two ideas cover the page.",
  concepts: [
    // C1 — the theorems
    {
      kind: "formula" as const,
      slug: "jaod-rolle",
      name: "Rolle's theorem and the mean value theorem",
      intuition:
        "If \\(f\\) is continuous on \\([a,b]\\), differentiable on \\((a,b)\\), and \\(f(a)=f(b)\\), the graph must turn somewhere between: \\(f'(c)=0\\) for some \\(c\\) in \\((a,b)\\). Tilt the picture and you get the mean value theorem: some tangent is parallel to the chord, \\(f'(c)=\\frac{f(b)-f(a)}{b-a}\\).",
      definition:
        "- Rolle: continuous on \\([a,b]\\), differentiable on \\((a,b)\\), \\(f(a)=f(b)\\) gives \\(f'(c)=0\\).\n" +
        "- MVT: under the first two conditions, \\(f'(c)=\\frac{f(b)-f(a)}{b-a}\\).\n" +
        "- Both give at least one such \\(c\\), strictly inside.",
      formula: {
        label: "Mean value theorem",
        latex: "f'(c)=\\frac{f(b)-f(a)}{b-a},\\quad c\\in(a,b)",
      },
      authoredExample: {
        prompt: "Find \\(c\\) for the mean value theorem for \\(x^2\\) on \\([1,3]\\).",
        steps: [
          "\\(2c=\\frac{9-1}{3-1}=4\\).",
        ],
        answer: "\\(c=2\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(c\\) for Rolle's theorem for \\(x^2-4x\\) on \\([0,4]\\).",
        steps: [
          "\\(f(0)=f(4)=0\\) and \\(2c-4=0\\).",
        ],
        answer: "\\(c=2\\).",
      },
      practiceSet: [
        { prompt: "MVT point for \\(x^3\\) on \\([0,3]\\)?", answer: "\\(\\sqrt3\\)" },
        { prompt: "Rolle point for \\(\\sin x\\) on \\([0,\\pi]\\)?", answer: "\\(\\frac\\pi2\\)" },
        { prompt: "Does \\(|x|\\) on \\([-1,1]\\) satisfy Rolle's hypotheses?", answer: "No — not differentiable at 0" },
        { prompt: "MVT point for \\(e^x\\) on \\([0,1]\\)?", answer: "\\(\\ln(e-1)\\)" },
      ],
      pyqExampleId: "ad36ee8c-750d-4df0-9471-af884beb7c3d", // 2021 — a and b for which Rolle's theorem holds with f'(4/3) = 0
      traps: [
        {
          title: "Check the hypotheses",
          body: "Rolle's theorem needs differentiability inside the interval. \\(|x|\\) on \\([-1,1]\\) has equal end values but no point with \\(f'=0\\).",
        },
      ],
    },

    // C2 — counting zeros of derivatives
    {
      kind: "formula" as const,
      slug: "jaod-zeros",
      name: "Zeros of f′ and f″",
      intuition:
        "Between two zeros of \\(f\\) lies a zero of \\(f'\\), so \\(n\\) distinct zeros of \\(f\\) give at least \\(n-1\\) of \\(f'\\) and \\(n-2\\) of \\(f''\\). When \\(f\\) is not zero but meets a line or curve several times, subtract it: \\(h=f-(\\text{line})\\) has zeros there, and \\(h''=f''\\). Symmetry supplies zeros too: an odd function vanishes at 0.",
      definition:
        "- \\(n\\) distinct zeros of \\(f\\): at least \\(n-1\\) of \\(f'\\), \\(n-2\\) of \\(f''\\).\n" +
        "- \\(f\\) meets \\(y=mx+c\\) at \\(n\\) points: \\(h=f-mx-c\\) has \\(n\\) zeros, and \\(h''=f''\\).\n" +
        "- An odd differentiable function has \\(f(0)=0\\); the derivative of an even one is odd.",
      formula: {
        label: "Rolle, repeated",
        latex: "n\\ \\text{zeros of }f\\ \\Rightarrow\\ \\ge n-1\\ \\text{zeros of }f'",
      },
      authoredExample: {
        prompt: "A twice differentiable \\(f\\) has \\(f(0)=f(1)=f(2)=0\\). How many zeros must \\(f'\\) and \\(f''\\) have?",
        steps: [
          "One zero of \\(f'\\) in each of \\((0,1)\\) and \\((1,2)\\); then one of \\(f''\\) between them.",
        ],
        answer: "At least 2 for \\(f'\\), at least 1 for \\(f''\\).",
      },
      selfCheckExample: {
        prompt: "A twice differentiable \\(f\\) has \\(f(1)=1\\), \\(f(2)=4\\), \\(f(3)=9\\). Show that \\(f''(c)=2\\) for some \\(c\\).",
        steps: [
          "\\(h=f-x^2\\) is 0 at 1, 2 and 3, so \\(h''=f''-2\\) has a zero.",
        ],
        answer: "Some \\(c\\in(1,3)\\) has \\(f''(c)=2\\).",
      },
      practiceSet: [
        { prompt: "A polynomial with 4 distinct real roots: real roots of \\(f'\\), at least?", answer: "\\(3\\)" },
        { prompt: "\\(f(a)=f(b)\\): what must \\(f'\\) do in \\((a,b)\\)?", answer: "Vanish somewhere" },
        { prompt: "\\(f-x\\) is 0 at 0, 1 and 2: then?", answer: "\\(f''\\) vanishes somewhere in \\((0,2)\\)" },
        { prompt: "Roots of \\(e^x-x-1=0\\)?", answer: "\\(1\\) (\\(x=0\\))" },
      ],
      pyqExampleId: "97061e0a-b626-49b1-ab11-5aeabf3e7a48", // 2021 — f(0) = 0, f(1) = 1, f(2) = 2 forces f'' = 0 somewhere
      traps: [
        {
          title: "The zeros must be distinct",
          body: "Rolle needs two different points with equal values. A repeated root counts once for this argument, so count the distinct zeros before subtracting one.",
        },
      ],
    },
  ],
};

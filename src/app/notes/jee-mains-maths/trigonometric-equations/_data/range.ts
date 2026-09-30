import type { SubtopicNote } from "@/app/notes/_types";

export const RANGE_TEQ_NOTE: SubtopicNote = {
  subtopicName: "Range and Existence of Solutions",
  title: "Range and Existence of Solutions",
  oneLineDefinition:
    "An equation f(x) = k has a solution exactly when k lies in the range of f, so finding the range answers the question.",
  whyItMatters:
    "Ten PYQs, eight of them multiple choice, and three from 2026. Six find the range of one side, to fix the values of a constant for which a solution exists or to show there is none; four write a cos x + b sin x as one sine or cosine and solve it. Two ideas cover the page.",
  concepts: [
    // C1 — the range decides existence
    {
      kind: "formula" as const,
      slug: "jteq-range-param",
      name: "The range decides whether a solution exists",
      intuition:
        "To find the values of \\(k\\) for which \\(f(x)=k\\) has a solution, find the range of \\(f\\). Write \\(f\\) in one ratio, say \\(t=\\cos x\\in[-1,1]\\), and find the range of the polynomial in \\(t\\) on \\([-1,1]\\); watch where the vertex falls. The same test proves that an equation has no solution: if one side can never reach the other, the count is 0.",
      definition:
        "- \\(f(x)=k\\) has a solution exactly when \\(k\\) lies in the range of \\(f\\).\n" +
        "- For \\(g(t)=at^2+bt+c\\) on \\([-1,1]\\): compare \\(g(-1)\\), \\(g(1)\\) and, if \\(-\\frac{b}{2a}\\) lies inside, the vertex value.\n" +
        "- A constant inside the equation: solve for it in terms of \\(t\\) first.\n" +
        "- \\(\\sin x\\) or \\(\\cos x\\) outside \\([-1,1]\\), or \\(e^{\\sin x}\\) outside \\([e^{-1},e]\\): no solution.",
      formula: {
        label: "Existence",
        latex: "f(x)=k\\ \\text{has a solution exactly when}\\ \\min f\\le k\\le\\max f",
      },
      authoredExample: {
        prompt: "For which \\(k\\) has \\(\\cos2x+2\\sin x=k\\) a real solution?",
        steps: [
          "With \\(s=\\sin x\\): \\(k=g(s)=1-2s^2+2s\\), \\(s\\in[-1,1]\\).",
          "The vertex \\(s=\\frac12\\) is inside, and \\(g\\left(\\frac12\\right)=\\frac32\\) is the largest value.",
          "The ends: \\(g(-1)=-3\\), \\(g(1)=1\\). The least value is \\(-3\\).",
        ],
        answer: "\\(k\\in\\left[-3,\\frac32\\right]\\).",
      },
      selfCheckExample: {
        prompt: "How many solutions has \\(\\sin^2x+3\\cos x=4\\)?",
        steps: [
          "With \\(c=\\cos x\\): the left side is \\(g(c)=1-c^2+3c\\).",
          "Its vertex \\(c=\\frac32\\) is outside \\([-1,1]\\), so \\(g\\) increases there; its largest value is \\(g(1)=3\\).",
        ],
        answer: "The left side never exceeds 3, so there is no solution.",
      },
      practiceSet: [
        { prompt: "\\(\\cos^2x+\\cos x\\): least value?", answer: "\\(-\\frac14\\), at \\(\\cos x=-\\frac12\\)" },
        { prompt: "\\(\\cos^2x-\\cos x\\): largest value?", answer: "\\(2\\), at \\(\\cos x=-1\\)" },
        { prompt: "\\(e^{\\sin x}=3\\): how many solutions?", answer: "None, since \\(e^{\\sin x}\\le e<3\\)" },
        { prompt: "\\(\\sin^2x=k\\) has a solution for?", answer: "\\(0\\le k\\le1\\)" },
      ],
      pyqExampleId: "4e542fb4-7a4d-47bc-954c-955707a036e0", // 2026 — the range of −3cos²x + 12cos x fixes the integers p
      traps: [
        {
          title: "The vertex may be outside",
          body: "The range of \\(at^2+bt+c\\) on \\([-1,1]\\) does not always reach the vertex value. If the vertex lies outside \\([-1,1]\\), the extremes are \\(g(-1)\\) and \\(g(1)\\).",
        },
      ],
    },

    // C2 — a cos x + b sin x = c
    {
      kind: "formula" as const,
      slug: "jteq-acos-bsin",
      name: "a cos x + b sin x = c by the auxiliary angle",
      intuition:
        "Divide by \\(R=\\sqrt{a^2+b^2}\\). The left side becomes \\(R\\cos(x-\\varphi)\\), one ratio of one angle. Then solve \\(\\cos(x-\\varphi)=\\frac cR\\): there is no solution if \\(|c|>R\\), and otherwise two per period. When \\(\\varphi\\) is not a standard angle, use \\(t=\\tan\\frac x2\\) instead and solve a quadratic in \\(t\\).",
      definition:
        "- \\(a\\cos x+b\\sin x=R\\cos(x-\\varphi)\\), with \\(R=\\sqrt{a^2+b^2}\\) and \\(\\tan\\varphi=\\frac ba\\).\n" +
        "- A solution exists exactly when \\(|c|\\le R\\).\n" +
        "- \\(\\sin x=\\frac{2t}{1+t^2}\\), \\(\\cos x=\\frac{1-t^2}{1+t^2}\\) with \\(t=\\tan\\frac x2\\).\n" +
        "- The \\(t\\) substitution misses \\(x=\\pi\\); test it separately.",
      formula: {
        label: "Auxiliary angle",
        latex: "a\\cos x+b\\sin x=\\sqrt{a^2+b^2}\\,\\cos(x-\\varphi),\\qquad\\tan\\varphi=\\frac ba",
      },
      authoredExample: {
        prompt: "Find all \\(x\\in[0,2\\pi]\\) with \\(\\sin x+\\cos x=1\\).",
        steps: [
          "\\(\\sin x+\\cos x=\\sqrt2\\sin\\left(x+\\frac{\\pi}{4}\\right)\\), so \\(\\sin\\left(x+\\frac{\\pi}{4}\\right)=\\frac{1}{\\sqrt2}\\).",
          "\\(x+\\frac{\\pi}{4}\\in\\left[\\frac{\\pi}{4},\\frac{9\\pi}{4}\\right]\\), where it equals \\(\\frac{\\pi}{4},\\frac{3\\pi}{4},\\frac{9\\pi}{4}\\).",
          "So \\(x=0,\\frac{\\pi}{2},2\\pi\\); both endpoints are solutions.",
        ],
        answer: "3 solutions: \\(0,\\frac{\\pi}{2},2\\pi\\).",
      },
      selfCheckExample: {
        prompt: "If \\(3\\cos x+4\\sin x=3\\) with \\(0<x<\\pi\\), find \\(\\tan\\frac x2\\) and \\(\\tan x\\).",
        steps: [
          "With \\(t=\\tan\\frac x2\\): \\(3(1-t^2)+8t=3(1+t^2)\\), so \\(6t^2-8t=0\\).",
          "\\(t=0\\) gives \\(x=0\\), outside \\((0,\\pi)\\); so \\(t=\\frac43\\).",
          "\\(\\tan x=\\frac{2t}{1-t^2}=\\frac{8/3}{-7/9}=-\\frac{24}{7}\\).",
        ],
        answer: "\\(\\tan\\frac x2=\\frac43\\) and \\(\\tan x=-\\frac{24}{7}\\).",
      },
      practiceSet: [
        { prompt: "\\(R\\) for \\(5\\cos x+12\\sin x\\)?", answer: "13" },
        { prompt: "\\(\\sqrt3\\sin x+\\cos x\\) as one sine?", answer: "\\(2\\sin\\left(x+\\frac{\\pi}{6}\\right)\\)" },
        { prompt: "\\(3\\cos x+4\\sin x=6\\): how many solutions?", answer: "None, since \\(6>5\\)" },
        { prompt: "\\(\\sin x-\\cos x=\\sqrt2\\) in \\([0,2\\pi]\\)?", answer: "\\(x=\\frac{3\\pi}{4}\\) only" },
      ],
      pyqExampleId: "a0cb870e-8848-4cf6-98c9-77cde35cec6c", // 2026 — √3 sin θ − cos θ = 1 by the auxiliary angle, summed over (−2π, 2π)
      traps: [
        {
          title: "Squaring adds roots",
          body: "Squaring \\(a\\cos x=c-b\\sin x\\) to get a quadratic in \\(\\sin x\\) also brings in the roots of \\(a\\cos x=-(c-b\\sin x)\\). Check each root in the original equation, or use the auxiliary angle, which needs no check.",
        },
      ],
    },
  ],
};

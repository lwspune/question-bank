import type { SubtopicNote } from "@/app/notes/_types";

export const PARAMETERS_AOI_NOTE: SubtopicNote = {
  subtopicName: "Unknown Parameters and Area Ratios",
  title: "Unknown Parameters and Area Ratios",
  oneLineDefinition:
    "The area is given, compared or optimised, and the question asks for a constant in a curve: find the area in terms of the constant, then solve.",
  whyItMatters:
    "Twelve PYQs, five of them multiple choice, and three from 2026. Eight give an area, or set two areas equal, and ask for a constant in a curve; four divide an area in a ratio, or choose a constant that makes an area largest or smallest. Two ideas cover the page.",
  concepts: [
    // C1 — area in terms of the constant
    {
      kind: "formula" as const,
      slug: "jaoi-find-parameter",
      name: "Area in terms of the constant, then solve",
      intuition:
        "Keep the constant as a letter. Find the meeting points in terms of it, integrate, and set the result equal to the given area. Parabola-and-line areas have closed forms, so most of these reduce to one equation such as \\(m^3=216\\).",
      definition:
        "- \\(y=ax^2\\) and \\(y=mx\\) meet at \\(x=\\frac ma\\); the area between them is \\(\\frac{m^3}{6a^2}\\).\n" +
        "- \\(y^2=4ax\\) and \\(y=mx\\): area \\(\\frac{8a^2}{3m^3}\\).\n" +
        "- \\(y=ax^2\\) and \\(y=c\\): area \\(\\frac43c\\sqrt{\\frac ca}\\).",
      formula: {
        label: "Parabola and a line through its vertex",
        latex: "y=ax^2,\\ y=mx:\\quad A=\\frac{m^3}{6a^2}",
      },
      authoredExample: {
        prompt: "The area between \\(y=x^2\\) and \\(y=mx\\) (\\(m>0\\)) is 36. Find m.",
        steps: [
          "They meet at \\(x=0\\) and \\(x=m\\), and the area is \\(\\frac{m^3}6\\).",
          "\\(\\frac{m^3}6=36\\), so \\(m^3=216\\).",
        ],
        answer: "\\(m=6\\).",
      },
      selfCheckExample: {
        prompt: "The area between \\(y^2=4ax\\) (\\(a>0\\)) and \\(y=x\\) is 24. Find a.",
        steps: [
          "With \\(m=1\\) the area is \\(\\frac{8a^2}3\\).",
          "\\(\\frac{8a^2}3=24\\) gives \\(a^2=9\\).",
        ],
        answer: "\\(a=3\\).",
      },
      practiceSet: [
        { prompt: "Area between \\(y=x^2\\) and \\(y=2x\\)?", answer: "\\(\\frac43\\)" },
        { prompt: "Area between \\(y=x^2\\) and \\(y=9\\)?", answer: "\\(36\\)" },
        { prompt: "The area between \\(y=x^2\\) and \\(y=mx\\) is \\(\\frac92\\): m?", answer: "\\(3\\)" },
        { prompt: "\\(\\int_0^a x\\,dx=8\\), \\(a>0\\): a?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "da14d59b-bab2-4401-bcb5-04f732c7c941", // 2026 — one area six times another, solve for alpha
      traps: [
        {
          title: "Keep the sign condition",
          body: "A square root gives two values of the constant; the condition in the question (\\(a>0\\), \\(\\alpha>0\\)) keeps one. Check the kept value also makes the curves meet as the region needs.",
        },
      ],
    },

    // C2 — dividing an area, or optimising it
    {
      kind: "formula" as const,
      slug: "jaoi-ratios-extremes",
      name: "Dividing an area, and making it largest or smallest",
      intuition:
        "For a line that bisects an area or divides it in a ratio, find the piece on one side as a function of the constant and set it equal to the right fraction of the total. For a largest or smallest area, write the area as a function of the constant and minimise or maximise it — often by completing the square, without calculus.",
      definition:
        "- Bisect: the piece on one side is half the total.\n" +
        "- Ratio \\(m:n\\): the first piece is \\(\\frac m{m+n}\\) of the total.\n" +
        "- Largest or smallest: set \\(\\frac{dA}{dk}=0\\), or complete the square, and check the endpoints.",
      formula: {
        label: "A piece in a given ratio",
        latex: "A_1=\\frac{m}{m+n}\\,A_{\\text{total}}",
      },
      authoredExample: {
        prompt: "The line \\(y=c\\) bisects the area between \\(y=x^2\\) and \\(y=4\\). Find c.",
        steps: [
          "The area between \\(y=x^2\\) and \\(y=c\\) is \\(\\frac43c\\sqrt c\\); the total, at \\(c=4\\), is \\(\\frac{32}3\\).",
          "\\(\\frac43c^{3/2}=\\frac{16}3\\), so \\(c^{3/2}=4\\).",
        ],
        answer: "\\(c=4^{2/3}=2\\sqrt[3]2\\).",
      },
      selfCheckExample: {
        prompt: "A line through \\((1,2)\\) cuts off a region from \\(y=x^2\\). For which slope is its area least, and what is it?",
        steps: [
          "The line \\(y=m(x-1)+2\\) meets \\(y=x^2\\) where \\(x^2-mx+m-2=0\\).",
          "The roots differ by \\(\\sqrt{m^2-4m+8}=\\sqrt{(m-2)^2+4}\\), and the area is \\(\\frac{(\\beta-\\alpha)^3}6\\).",
          "Least at \\(m=2\\), where \\(\\beta-\\alpha=2\\).",
        ],
        answer: "\\(m=2\\), area \\(\\frac43\\).",
      },
      practiceSet: [
        { prompt: "Total area 12 split \\(1:2\\): the smaller piece?", answer: "\\(4\\)" },
        { prompt: "Least value of \\(A(k)=k^2-4k+7\\)?", answer: "\\(3\\)" },
        { prompt: "\\(x=c\\) bisects the area under \\(y=x\\) on \\([0,2]\\): c?", answer: "\\(\\sqrt2\\)" },
        { prompt: "Pieces \\(\\frac32\\) and \\(\\frac92\\): the ratio?", answer: "\\(1:3\\)" },
      ],
      pyqExampleId: "ea8d0858-e654-47ac-bdf0-35b2d079bec5", // 2026 — a vertical line divides a parabola-line region
      traps: [
        {
          title: "Which piece comes first",
          body: "A ratio \\(m:n\\) depends on which piece the question names first. Compute both pieces and match the order in the question before reading off m and n.",
        },
      ],
    },
  ],
};

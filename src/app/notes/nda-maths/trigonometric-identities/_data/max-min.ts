import type { SubtopicNote } from "@/app/notes/_types";

export const MAX_MIN_NOTE: SubtopicNote = {
  subtopicName: "Maximum and Minimum of Trigonometric Expressions",
  title: "Maximum & Minimum Values",
  oneLineDefinition:
    "Three reliable tools: the a·sinx + b·cosx amplitude bound, AM-GM for reciprocal sums, and substitution to a quadratic in sin²x — covering almost every extremum question.",
  whyItMatters:
    "Optimisation questions look varied but reduce to one of three moves. Knowing which to reach for — amplitude √(a²+b²), AM-GM, or a quadratic substitution — turns a scary-looking max/min into a one-liner.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "trig-asinx-bcosx-range",
      name: "Range of a·sin x + b·cos x",
      intuition:
        "Any combination \\(a\\sin x+b\\cos x\\) is a single sinusoid of amplitude \\(\\sqrt{a^2+b^2}\\). So its values run exactly over \\([-\\sqrt{a^2+b^2},\\ \\sqrt{a^2+b^2}]\\) — the maximum and minimum drop out immediately.",
      definition:
        "Write \\(a\\sin x+b\\cos x=R\\sin(x+\\varphi)\\) with \\(R=\\sqrt{a^2+b^2}\\). Then **max \\(=+\\sqrt{a^2+b^2}\\)**, **min \\(=-\\sqrt{a^2+b^2}\\)**. A constant \\(c\\) added shifts the whole range to \\([c-R,\\ c+R]\\). The extremum is attained when \\(\\sin(x+\\varphi)=\\pm 1\\).",
      visualizationSlug: "trig-amplitude-phase",
      authoredExample: {
        prompt: "Find the maximum and minimum of \\(3\\sin x+4\\cos x\\).",
        steps: [
          "\\(R=\\sqrt{3^2+4^2}=5\\).",
          "Max \\(=5\\), min \\(=-5\\).",
        ],
        answer: "Maximum \\(5\\), minimum \\(-5\\).",
      },
      selfCheckExample: {
        prompt: "Find the maximum of \\(\\sin\\!\\left(x+\\tfrac\\pi6\\right)+\\cos\\!\\left(x+\\tfrac\\pi6\\right)\\).",
        steps: [
          "Let \\(u=x+\\tfrac\\pi6\\): the expression is \\(\\sin u+\\cos u\\), with \\(R=\\sqrt{1^2+1^2}=\\sqrt2\\).",
          "Maximum \\(=\\sqrt2\\).",
        ],
        answer: "\\(\\sqrt2\\).",
      },
      practiceSet: [
        { prompt: "Max of \\(a\\sin x+b\\cos x\\)?", answer: "\\(\\sqrt{a^2+b^2}\\)" },
        { prompt: "Min of \\(3\\sin x+4\\cos x\\)?", answer: "\\(-5\\)" },
        { prompt: "Range of \\(2+\\sin x+\\cos x\\)?", answer: "\\([2-\\sqrt2,\\ 2+\\sqrt2]\\)" },
        { prompt: "Max of \\(\\cos x+\\sqrt3\\sin x\\)?", answer: "\\(2\\)" },
      ],
      pyqExampleId: "fce04eb8-c903-4550-8a5e-89aa6f9847c0", // max sin(x+π/6)+cos(x+π/6)
    },

    {
      kind: "formula" as const,
      slug: "trig-am-gm-minimum",
      name: "AM-GM for reciprocal-type minima",
      intuition:
        "When an expression is a sum of a term and (a constant times) its reciprocal — \\(\\cot^2\\theta+n^2\\tan^2\\theta\\), \\(\\sec^2+\\csc^2\\) combinations, \\(\\cos+\\sec\\) — AM-GM gives the minimum in one line, with equality pinning the optimal angle.",
      definition:
        "By AM-GM, \\(u+v\\ge 2\\sqrt{uv}\\) for positive \\(u,v\\), equality at \\(u=v\\). So \\(\\cot^2\\theta+n^2\\tan^2\\theta\\ge 2n\\), and \\(\\cos\\theta+\\sec\\theta\\ge 2\\). For \\(\\dfrac{a^2}{\\cos^2 x}+\\dfrac{b^2}{\\sin^2 x}\\), the minimum is \\((a+b)^2\\) (Cauchy–Schwarz / AM-GM).",
      formula: {
        label: "AM-GM minimum",
        latex: "u+v\\ge 2\\sqrt{uv}\\ \\ (u,v>0),\\quad \\text{equality at } u=v",
      },
      authoredExample: {
        prompt: "Find the minimum of \\(\\cot^2\\theta+9\\tan^2\\theta\\).",
        steps: [
          "AM-GM: \\(\\cot^2\\theta+9\\tan^2\\theta\\ge 2\\sqrt{9\\cot^2\\theta\\tan^2\\theta}=2\\sqrt9=6\\).",
          "Equality when \\(\\cot^2\\theta=9\\tan^2\\theta\\).",
        ],
        answer: "Minimum \\(=6\\).",
      },
      selfCheckExample: {
        prompt: "Find the least value of \\(9\\tan^2\\theta+4\\cot^2\\theta\\).",
        steps: [
          "AM-GM: \\(9\\tan^2\\theta+4\\cot^2\\theta\\ge 2\\sqrt{9\\cdot 4\\,\\tan^2\\theta\\cot^2\\theta}=2\\sqrt{36}=12\\).",
          "Equality when \\(9\\tan^2\\theta=4\\cot^2\\theta\\).",
        ],
        answer: "\\(12\\).",
      },
      practiceSet: [
        { prompt: "Min of \\(\\cot^2\\theta+n^2\\tan^2\\theta\\)?", answer: "\\(2n\\)" },
        { prompt: "Min of \\(\\cos\\theta+\\sec\\theta\\) (\\(\\cos\\theta>0\\))?", answer: "\\(2\\)" },
        { prompt: "Min of \\(\\dfrac{a^2}{\\cos^2x}+\\dfrac{b^2}{\\sin^2x}\\)?", answer: "\\((a+b)^2\\)" },
        { prompt: "AM-GM equality holds when?", answer: "The two terms are equal" },
      ],
      pyqExampleId: "b47a9d58-bcc8-43f1-adbc-eda5cf712d3a", // 25csc²+36sec²
    },

    {
      kind: "formula" as const,
      slug: "trig-substitution-range",
      name: "Substitute to a quadratic (let t = sin²x)",
      intuition:
        "When sin and cos appear only as even powers, set \\(t=\\sin^2 x\\in[0,1]\\) and the expression becomes a quadratic in \\(t\\). Optimise the quadratic on \\([0,1]\\) — vertex or endpoints. The same idea bounds a parameter via \\(\\tan^2 A\\ge 0\\).",
      definition:
        "Substitute \\(t=\\sin^2 x\\) (so \\(\\cos^2 x=1-t\\), \\(t\\in[0,1]\\)), reduce to \\(f(t)=\\alpha t^2+\\beta t+\\gamma\\), and read off the extremum at the vertex \\(t=-\\tfrac{\\beta}{2\\alpha}\\) (if in range) or at an endpoint. For parameter questions, \\(\\tan^2 A=g(K)\\ge 0\\) constrains the allowed \\(K\\).",
      authoredExample: {
        prompt: "Find the range of \\(A=\\sin^2\\theta+\\cos^4\\theta\\).",
        steps: [
          "Let \\(t=\\sin^2\\theta\\in[0,1]\\): \\(A=t+(1-t)^2=t^2-t+1\\).",
          "Vertex at \\(t=\\tfrac12\\): \\(A_{\\min}=\\tfrac34\\); endpoints \\(t=0,1\\) give \\(A=1\\) (max).",
        ],
        answer: "\\(A\\in\\left[\\tfrac34,\\ 1\\right]\\).",
      },
      selfCheckExample: {
        prompt: "Find the maximum of \\(3(\\sin x-\\cos x)^4+6(\\sin x+\\cos x)^2+4(\\sin^6 x+\\cos^6 x)\\) — outline the substitution.",
        steps: [
          "Let \\(u=\\sin x\\cos x=\\tfrac12\\sin 2x\\in[-\\tfrac12,\\tfrac12]\\); each term is a polynomial in \\(u\\).",
          "\\((\\sin x-\\cos x)^4=(1-2u)^2\\), \\((\\sin x+\\cos x)^2=1+2u\\), \\(\\sin^6+\\cos^6=1-3u^2\\); combine and optimise on \\([-\\tfrac12,\\tfrac12]\\).",
        ],
        answer: "Maximum \\(=13\\) (at \\(u=-\\tfrac12\\)).",
      },
      practiceSet: [
        { prompt: "Good substitution when only even powers appear?", answer: "\\(t=\\sin^2 x\\in[0,1]\\)" },
        { prompt: "Min of \\(\\sin^2\\theta+\\cos^4\\theta\\)?", answer: "\\(\\tfrac34\\)" },
        { prompt: "After substituting, optimise the quadratic where?", answer: "Vertex (if in range) or endpoints" },
        { prompt: "What bounds a parameter \\(K\\) in these problems?", answer: "\\(\\tan^2 A\\ge 0\\) (a real-value condition)" },
      ],
      pyqExampleId: "937b3aa1-caa9-4d99-abe7-9978b1453c2a", // sin²θ+cos⁴θ range
    },
  ],
  related: [
    { label: "Product-to-Sum & Sum-to-Product", href: "/notes/nda-maths/trigonometric-identities/trig-product-sum" },
    { label: "Standard Values & Special Angles", href: "/notes/nda-maths/trigonometric-identities/trig-values-quadrants" },
  ],
};

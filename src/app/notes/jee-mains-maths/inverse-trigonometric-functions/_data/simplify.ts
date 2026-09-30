import type { SubtopicNote } from "@/app/notes/_types";

export const SIMPLIFY_ITF_NOTE: SubtopicNote = {
  subtopicName: "Simplifying Inverse Functions of a Variable",
  title: "Simplifying Inverse Functions of a Variable",
  oneLineDefinition:
    "Simplifying an inverse function of an expression in x by a trigonometric substitution, turning compositions into algebra, and using the complementary identities.",
  whyItMatters:
    "Fourteen PYQs, ten of them multiple choice, and one from 2026. Four simplify an inverse function of x by a trigonometric substitution; six turn a composition into algebra and then solve or eliminate; four combine sin⁻¹x + cos⁻¹x = π/2, or a sum of inverse sines equal to π, with a given condition. Three ideas cover the page.",
  concepts: [
    // C1 — substitution
    {
      kind: "formula" as const,
      slug: "jitf-substitute",
      name: "Substitute and track the interval",
      intuition:
        "An expression like \\(2x\\sqrt{1-x^2}\\) is \\(\\sin2\\theta\\) once \\(x=\\sin\\theta\\). Then \\(\\sin^{-1}(\\sin2\\theta)\\) equals \\(2\\theta\\) only if \\(2\\theta\\) lies in \\(\\left[-\\frac\\pi2,\\frac\\pi2\\right]\\). The given interval for \\(x\\) fixes the interval for \\(\\theta\\), and that decides the answer.",
      definition:
        "- \\(\\sqrt{1-x^2}\\): put \\(x=\\sin\\theta\\) or \\(x=\\cos\\theta\\). \\(\\sqrt{1+x^2}\\): put \\(x=\\tan\\theta\\).\n" +
        "- With \\(x=\\tan\\theta\\): \\(\\frac{2x}{1+x^2}=\\sin2\\theta\\), \\(\\frac{1-x^2}{1+x^2}=\\cos2\\theta\\), \\(\\frac{2x}{1-x^2}=\\tan2\\theta\\).\n" +
        "- With \\(x=\\sin\\theta\\): \\(3x-4x^3=\\sin3\\theta\\); with \\(x=\\cos\\theta\\): \\(2x^2-1=\\cos2\\theta\\).\n" +
        "- Find \\(\\theta\\)'s interval from \\(x\\)'s, then bring the multiple of \\(\\theta\\) into the principal range.",
      formula: {
        label: "Standard substitutions",
        latex: "2\\tan^{-1}x=\\sin^{-1}\\frac{2x}{1+x^2}\\ \\ (|x|\\le1),\\qquad 2\\tan^{-1}x=\\cos^{-1}\\frac{1-x^2}{1+x^2}\\ \\ (x\\ge0)",
      },
      authoredExample: {
        prompt: "Simplify \\(\\sin^{-1}\\left(2x\\sqrt{1-x^2}\\right)\\) for \\(\\frac1{\\sqrt2}\\le x\\le1\\).",
        steps: [
          "Put \\(x=\\sin\\theta\\) with \\(\\theta\\in\\left[\\frac\\pi4,\\frac\\pi2\\right]\\). The argument is \\(\\sin2\\theta\\).",
          "\\(2\\theta\\in\\left[\\frac\\pi2,\\pi\\right]\\), so \\(\\sin^{-1}(\\sin2\\theta)=\\pi-2\\theta\\).",
        ],
        answer: "\\(\\pi-2\\sin^{-1}x\\).",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\cos^{-1}\\left(\\frac{1-x^2}{1+x^2}\\right)\\) for \\(x<0\\).",
        steps: [
          "Put \\(x=\\tan\\theta\\) with \\(\\theta\\in\\left(-\\frac\\pi2,0\\right)\\). The argument is \\(\\cos2\\theta=\\cos(-2\\theta)\\).",
          "\\(-2\\theta\\in(0,\\pi)\\), so the value is \\(-2\\theta\\).",
        ],
        answer: "\\(-2\\tan^{-1}x\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin^{-1}\\left(2x\\sqrt{1-x^2}\\right)\\) for \\(|x|\\le\\frac1{\\sqrt2}\\)?", answer: "\\(2\\sin^{-1}x\\)" },
        { prompt: "\\(\\tan^{-1}\\frac{2x}{1-x^2}\\) for \\(|x|<1\\)?", answer: "\\(2\\tan^{-1}x\\)" },
        { prompt: "\\(\\cos^{-1}(2x^2-1)\\) for \\(0\\le x\\le1\\)?", answer: "\\(2\\cos^{-1}x\\)" },
        { prompt: "\\(\\sin^{-1}(3x-4x^3)\\) for \\(|x|\\le\\frac12\\)?", answer: "\\(3\\sin^{-1}x\\)" },
      ],
      pyqExampleId: "c7ae4eda-6297-4abe-b5fd-ea7a2fb2598f", // 2025 — sin⁻¹ of a sine of a sum, with an interval for x
      traps: [
        {
          title: "The interval for x decides the formula",
          body: "\\(\\sin^{-1}\\left(2x\\sqrt{1-x^2}\\right)\\) is \\(2\\sin^{-1}x\\) only for \\(|x|\\le\\frac1{\\sqrt2}\\). Outside that interval it is \\(\\pi-2\\sin^{-1}x\\) or \\(-\\pi-2\\sin^{-1}x\\). Read the interval before using a standard result.",
        },
      ],
    },

    // C2 — composition to algebra
    {
      kind: "formula" as const,
      slug: "jitf-algebraic",
      name: "Turning a composition into algebra",
      intuition:
        "A trigonometric function of an inverse function is an algebraic expression. For example, \\(\\sin(\\tan^{-1}x)=\\frac{x}{\\sqrt{1+x^2}}\\), read off a triangle with sides \\(x\\) and 1. Replace each composition this way and the question becomes an equation or an identity in \\(x\\).",
      definition:
        "- \\(\\sin(\\tan^{-1}x)=\\frac{x}{\\sqrt{1+x^2}}\\), \\(\\cos(\\tan^{-1}x)=\\frac1{\\sqrt{1+x^2}}\\).\n" +
        "- \\(\\cos(\\sin^{-1}x)=\\sqrt{1-x^2}\\), \\(\\sin(\\cos^{-1}x)=\\sqrt{1-x^2}\\).\n" +
        "- \\(\\sec^2(\\tan^{-1}x)=1+x^2\\), \\(\\csc^2(\\cot^{-1}x)=1+x^2\\).\n" +
        "- \\(\\cos(2\\sin^{-1}x)=1-2x^2\\), \\(\\sin(2\\tan^{-1}x)=\\frac{2x}{1+x^2}\\).",
      formula: {
        label: "Composition to algebra",
        latex: "\\sin(\\tan^{-1}x)=\\frac{x}{\\sqrt{1+x^2}},\\qquad \\cos(\\sin^{-1}x)=\\sqrt{1-x^2}",
      },
      authoredExample: {
        prompt: "Solve \\(\\cos(\\tan^{-1}x)=\\sin\\left(\\cot^{-1}\\frac34\\right)\\).",
        steps: [
          "\\(\\cot^{-1}\\frac34\\) is an acute angle with cotangent \\(\\frac34\\), so its sine is \\(\\frac45\\).",
          "\\(\\frac1{\\sqrt{1+x^2}}=\\frac45\\) gives \\(x^2=\\frac9{16}\\).",
        ],
        answer: "\\(x=\\pm\\frac34\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sec^2(\\tan^{-1}2)+\\csc^2(\\cot^{-1}3)\\).",
        steps: [
          "\\((1+2^2)+(1+3^2)\\).",
        ],
        answer: "\\(15\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin(\\tan^{-1}x)\\)?", answer: "\\(\\frac{x}{\\sqrt{1+x^2}}\\)" },
        { prompt: "\\(\\cos(\\sin^{-1}x)\\)?", answer: "\\(\\sqrt{1-x^2}\\)" },
        { prompt: "\\(\\tan(\\cos^{-1}x)\\) for \\(0<x\\le1\\)?", answer: "\\(\\frac{\\sqrt{1-x^2}}x\\)" },
        { prompt: "\\(\\cos(2\\sin^{-1}x)\\)?", answer: "\\(1-2x^2\\)" },
      ],
      pyqExampleId: "6d74d3ee-1da5-4b30-a599-0261352d161f", // 2026 — an equation between two compositions
      traps: [
        {
          title: "Squaring brings extra roots",
          body: "\\(\\cos(\\sin^{-1}x)=\\sqrt{1-x^2}\\) is never negative, but \\(\\tan(\\cos^{-1}x)=\\frac{\\sqrt{1-x^2}}x\\) takes the sign of \\(x\\). After squaring an equation, put each root back and check its sign.",
        },
      ],
    },

    // C3 — complementary identities with a condition
    {
      kind: "formula" as const,
      slug: "jitf-complement",
      name: "Complementary identities with a condition",
      intuition:
        "Since \\(\\sin^{-1}x+\\cos^{-1}x=\\frac\\pi2\\), a second condition on the two angles pins each one down. A ratio condition splits \\(\\frac\\pi2\\) in that ratio. A difference of squares factors as a sum times a difference, and the sum is \\(\\frac\\pi2\\).",
      definition:
        "- \\(\\sin^{-1}x+\\cos^{-1}x=\\frac\\pi2\\) for \\(|x|\\le1\\); the same for \\(\\tan^{-1}\\) and \\(\\cot^{-1}\\).\n" +
        "- Ratio: if \\(\\frac{\\sin^{-1}x}{a}=\\frac{\\cos^{-1}x}{b}=k\\), then \\(k(a+b)=\\frac\\pi2\\).\n" +
        "- \\((\\sin^{-1}x)^2-(\\cos^{-1}x)^2=\\frac\\pi2\\left(\\sin^{-1}x-\\cos^{-1}x\\right)\\).\n" +
        "- If \\(\\sin^{-1}\\alpha+\\sin^{-1}\\beta+\\sin^{-1}\\gamma=\\pi\\), then \\(\\alpha,\\beta,\\gamma\\) are the sines of the angles of a triangle, and the sine rule applies.",
      formula: {
        label: "Complementary identity",
        latex: "\\sin^{-1}x+\\cos^{-1}x=\\frac{\\pi}{2},\\quad -1\\le x\\le1",
      },
      authoredExample: {
        prompt: "If \\(\\sin^{-1}x:\\cos^{-1}x=1:2\\), find \\(x\\).",
        steps: [
          "Let \\(\\sin^{-1}x=k\\), \\(\\cos^{-1}x=2k\\). Then \\(3k=\\frac\\pi2\\), so \\(k=\\frac\\pi6\\).",
        ],
        answer: "\\(x=\\frac12\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\sin^{-1}x-\\cos^{-1}x=\\frac\\pi6\\).",
        steps: [
          "\\(\\sin^{-1}x-\\left(\\frac\\pi2-\\sin^{-1}x\\right)=\\frac\\pi6\\), so \\(2\\sin^{-1}x=\\frac{2\\pi}3\\).",
        ],
        answer: "\\(x=\\frac{\\sqrt3}2\\).",
      },
      practiceSet: [
        { prompt: "\\(\\tan^{-1}5+\\cot^{-1}5\\)?", answer: "\\(\\frac\\pi2\\)" },
        { prompt: "\\(\\sin^{-1}x=\\frac\\pi5\\): \\(\\cos^{-1}x\\)?", answer: "\\(\\frac{3\\pi}{10}\\)" },
        { prompt: "\\((\\sin^{-1}x)^2-(\\cos^{-1}x)^2\\) at \\(x=1\\)?", answer: "\\(\\frac{\\pi^2}4\\)" },
        { prompt: "\\(\\sin^{-1}x=\\cos^{-1}x\\): \\(x\\)?", answer: "\\(\\frac1{\\sqrt2}\\)" },
      ],
      pyqExampleId: "2ed14a56-2eb1-4510-a23c-d11da372360e", // 2024 — three inverse sines summing to π
      traps: [
        {
          title: "The identity needs the same argument",
          body: "\\(\\sin^{-1}x+\\cos^{-1}y=\\frac\\pi2\\) holds only when \\(x=y\\). And \\(\\sec^{-1}x+\\csc^{-1}x=\\frac\\pi2\\) needs \\(|x|\\ge1\\). Check the arguments match before replacing a sum by \\(\\frac\\pi2\\).",
        },
      ],
    },
  ],
};

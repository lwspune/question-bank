import type { SubtopicNote } from "@/app/notes/_types";

export const EQUATIONS_ITF_NOTE: SubtopicNote = {
  subtopicName: "Equations in Inverse Trigonometric Functions",
  title: "Equations in Inverse Trigonometric Functions",
  oneLineDefinition:
    "Solving equations in inverse functions by combining terms and taking a tangent, sine or cosine, then checking each root against the principal ranges.",
  whyItMatters:
    "Sixteen PYQs, ten of them multiple choice, and two from 2026. Six are equations in tan⁻¹ and cot⁻¹, or become one; seven are equations in sin⁻¹ and cos⁻¹, solved by taking a sine or cosine; three are settled by the domain alone. Three ideas cover the page.",
  concepts: [
    // C1 — tan⁻¹ and cot⁻¹ equations
    {
      kind: "formula" as const,
      slug: "jitf-tan-eq",
      name: "Equations in inverse tangents",
      intuition:
        "Combine the inverse tangents with the addition formula, take the tangent of both sides, and solve the resulting polynomial. Taking the tangent forgets which quadrant the angle was in, so some roots of the polynomial do not satisfy the original equation. Put every root back.",
      definition:
        "- \\(\\tan^{-1}a+\\tan^{-1}b=c\\): take tangents, \\(\\frac{a+b}{1-ab}=\\tan c\\).\n" +
        "- \\(\\cot^{-1}x=\\tan^{-1}\\frac1x\\) only for \\(x>0\\); for \\(x<0\\) it is \\(\\pi+\\tan^{-1}\\frac1x\\).\n" +
        "- A root is valid only if the left side, with principal values, really equals the right side.\n" +
        "- For a count of solutions, also check the stated interval for \\(x\\).",
      formula: {
        label: "Taking tangents",
        latex: "\\tan^{-1}a+\\tan^{-1}b=c\\ \\Rightarrow\\ \\frac{a+b}{1-ab}=\\tan c",
      },
      authoredExample: {
        prompt: "Solve \\(\\tan^{-1}2x+\\tan^{-1}3x=\\frac\\pi4\\).",
        steps: [
          "\\(\\frac{5x}{1-6x^2}=1\\), so \\(6x^2+5x-1=0\\), that is \\((6x-1)(x+1)=0\\).",
          "\\(x=-1\\): \\(\\tan^{-1}(-2)+\\tan^{-1}(-3)=-\\frac{3\\pi}4\\), not \\(\\frac\\pi4\\). Reject.",
          "\\(x=\\frac16\\): both angles are positive and \\(6x^2<1\\). Keep.",
        ],
        answer: "\\(x=\\frac16\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\tan^{-1}\\frac{x-1}{x-2}+\\tan^{-1}\\frac{x+1}{x+2}=\\frac\\pi4\\).",
        steps: [
          "Sum of the arguments: \\(\\frac{2x^2-4}{x^2-4}\\). One minus their product: \\(\\frac{-3}{x^2-4}\\).",
          "So \\(\\frac{2x^2-4}{-3}=1\\), giving \\(x^2=\\frac12\\).",
          "For both roots the product of the arguments is \\(\\frac17<1\\) and both arguments are positive, so both are valid.",
        ],
        answer: "\\(x=\\pm\\frac1{\\sqrt2}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\tan^{-1}x+\\tan^{-1}1=\\frac\\pi2\\): \\(x\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\tan^{-1}2x=\\frac\\pi3\\): \\(x\\)?", answer: "\\(\\frac{\\sqrt3}2\\)" },
        { prompt: "\\(\\tan^{-1}x-\\tan^{-1}\\frac12=\\frac\\pi4\\): \\(x\\)?", answer: "\\(3\\)" },
        { prompt: "\\(2\\tan^{-1}x=\\tan^{-1}\\frac43\\): \\(x\\)?", answer: "\\(\\frac12\\)" },
      ],
      pyqExampleId: "ba641143-c939-44b7-8598-9bf2f97ed4b2", // 2026 — number of solutions of a sum of two inverse tangents
      traps: [
        {
          title: "Taking tangents loses the range",
          body: "\\(\\tan(A+B)=1\\) also holds when \\(A+B=-\\frac{3\\pi}4\\). Every root of the polynomial must be put back into the original equation; a negative root often fails.",
        },
      ],
    },

    // C2 — sin⁻¹ and cos⁻¹ equations
    {
      kind: "formula" as const,
      slug: "jitf-sincos-eq",
      name: "Equations in inverse sines and cosines",
      intuition:
        "First use \\(\\cos^{-1}x=\\frac\\pi2-\\sin^{-1}x\\) to reduce the number of different functions. Isolate one inverse function, then take the sine or cosine of both sides. The result is algebraic, often after squaring. Squaring and taking sines both create extra roots, so check each root against the ranges.",
      definition:
        "- Replace \\(\\cos^{-1}x\\) by \\(\\frac\\pi2-\\sin^{-1}x\\) to leave one function where possible.\n" +
        "- If \\(\\sin^{-1}u=\\theta\\), then \\(u=\\sin\\theta\\) and \\(\\theta\\) must lie in \\(\\left[-\\frac\\pi2,\\frac\\pi2\\right]\\).\n" +
        "- A side that must lie in a range gives a sign condition on \\(x\\); use it to reject roots.\n" +
        "- If the reduced equation asks for \\(\\cos^{-1}x\\) outside \\([0,\\pi]\\), there is no solution.",
      formula: {
        label: "Isolate, then take the sine",
        latex: "\\sin^{-1}u=\\theta\\ \\Rightarrow\\ u=\\sin\\theta,\\quad -\\tfrac{\\pi}{2}\\le\\theta\\le\\tfrac{\\pi}{2}",
      },
      authoredExample: {
        prompt: "Solve \\(\\sin^{-1}(1-x)-2\\sin^{-1}x=\\frac\\pi2\\).",
        steps: [
          "\\(\\sin^{-1}(1-x)=\\frac\\pi2+2\\sin^{-1}x\\). Take sines: \\(1-x=\\cos(2\\sin^{-1}x)=1-2x^2\\).",
          "\\(2x^2-x=0\\), so \\(x=0\\) or \\(x=\\frac12\\).",
          "\\(x=\\frac12\\): \\(\\frac\\pi6-\\frac\\pi3=-\\frac\\pi6\\ne\\frac\\pi2\\). Reject. \\(x=0\\): \\(\\frac\\pi2-0=\\frac\\pi2\\). Keep.",
        ],
        answer: "\\(x=0\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\sin^{-1}(6x)+\\sin^{-1}(6\\sqrt3x)=-\\frac\\pi2\\).",
        steps: [
          "\\(\\sin^{-1}(6\\sqrt3x)=-\\frac\\pi2-\\sin^{-1}(6x)\\). Take sines: \\(6\\sqrt3x=-\\sqrt{1-36x^2}\\), so \\(x\\le0\\).",
          "Squaring: \\(108x^2=1-36x^2\\), so \\(x^2=\\frac1{144}\\).",
          "With \\(x\\le0\\): \\(x=-\\frac1{12}\\). Check: \\(-\\frac\\pi6-\\frac\\pi3=-\\frac\\pi2\\).",
        ],
        answer: "\\(x=-\\frac1{12}\\).",
      },
      practiceSet: [
        { prompt: "\\(2\\sin^{-1}x+\\cos^{-1}x=\\pi\\): \\(x\\)?", answer: "\\(1\\)" },
        { prompt: "Number of solutions of \\(\\sin^{-1}x+2\\cos^{-1}x=2\\pi\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\sin^{-1}x=2\\sin^{-1}\\frac12\\): \\(x\\)?", answer: "\\(\\frac{\\sqrt3}2\\)" },
        { prompt: "\\(\\cos^{-1}x=\\sin^{-1}\\frac12+\\cos^{-1}\\frac12\\): \\(x\\)?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "3cb96257-0770-4a7c-aa62-73cf2d559661", // 2025 — an equation in cos⁻¹ and two inverse sines
      traps: [
        {
          title: "Squaring adds roots",
          body: "Taking a sine and squaring keeps every true root but can add false ones. In the worked example \\(x=\\frac12\\) solves the quadratic but not the equation. Check each root in the original equation, with principal values.",
        },
      ],
    },

    // C3 — the domain decides
    {
      kind: "formula" as const,
      slug: "jitf-domain-force",
      name: "When the domain pins x down",
      intuition:
        "Sometimes the conditions for the terms to exist leave only a few values of \\(x\\). \\(\\sin^{-1}\\sqrt{u}\\) needs \\(0\\le u\\le1\\); if another term needs \\(u\\ge1\\), then \\(u=1\\) exactly. Find those few values first, then test each in the equation. No trigonometric manipulation is needed.",
      definition:
        "- \\(\\sin^{-1}u,\\ \\cos^{-1}u\\): \\(|u|\\le1\\). \\(\\sqrt u\\): \\(u\\ge0\\). \\(\\sec^{-1}u\\): \\(|u|\\ge1\\).\n" +
        "- Two conditions such as \\(u\\ge1\\) and \\(u\\le1\\) force \\(u=1\\): a few values of \\(x\\).\n" +
        "- \\(\\sin^{-1}[t]\\) with the greatest integer: \\([t]\\in\\{-1,0,1\\}\\), so the value is \\(-\\frac\\pi2\\), 0 or \\(\\frac\\pi2\\).\n" +
        "- Test each allowed \\(x\\) in the equation; the answer can be none.",
      formula: {
        label: "Squeezed argument",
        latex: "u\\ge1\\ \\text{and}\\ u\\le1\\ \\Rightarrow\\ u=1",
      },
      authoredExample: {
        prompt: "Solve \\(\\cos^{-1}(x^2-2x+2)+\\tan^{-1}(x-1)=0\\).",
        steps: [
          "\\(x^2-2x+2=(x-1)^2+1\\ge1\\), and \\(\\cos^{-1}\\) needs it \\(\\le1\\). So \\((x-1)^2=0\\), \\(x=1\\).",
          "\\(x=1\\): \\(\\cos^{-1}1+\\tan^{-1}0=0\\).",
        ],
        answer: "\\(x=1\\).",
      },
      selfCheckExample: {
        prompt: "How many real \\(x\\) satisfy \\(\\sin^{-1}(x^2+1)+\\tan^{-1}x=\\pi\\)?",
        steps: [
          "\\(x^2+1\\le1\\) forces \\(x=0\\).",
          "\\(x=0\\): \\(\\sin^{-1}1+\\tan^{-1}0=\\frac\\pi2\\ne\\pi\\).",
        ],
        answer: "None.",
      },
      practiceSet: [
        { prompt: "Domain of \\(\\sin^{-1}(x^2+1)\\)?", answer: "\\(\\{0\\}\\)" },
        { prompt: "Domain of \\(\\cos^{-1}(x^2+2)\\)?", answer: "Empty" },
        { prompt: "Possible values of \\(\\sin^{-1}[t]\\)?", answer: "\\(-\\frac\\pi2,\\ 0,\\ \\frac\\pi2\\)" },
        { prompt: "Domain of \\(\\sqrt{1-x}+\\sin^{-1}(x-2)\\)?", answer: "\\(\\{1\\}\\)" },
      ],
      pyqExampleId: "8e38b2a9-5179-4fc3-941d-a370a38ea145", // 2023 — a parabola whose values are squeezed by the domain
      traps: [
        {
          title: "Find the domain first",
          body: "Manipulating the equation before checking the domain wastes time and can give roots at which a term is undefined. When a square root and an inverse sine share an argument, find the allowed \\(x\\) first.",
        },
      ],
    },
  ],
};

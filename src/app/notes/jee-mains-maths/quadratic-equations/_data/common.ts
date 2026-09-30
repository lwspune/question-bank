import type { SubtopicNote } from "@/app/notes/_types";

export const COMMON_QE_NOTE: SubtopicNote = {
  subtopicName: "Common Roots and New Equations",
  title: "Common Roots and New Equations",
  oneLineDefinition:
    "Two equations that share a root, and new equations whose roots are built from the roots of an old one.",
  whyItMatters:
    "Thirteen PYQs, eight of them multiple choice, and two from 2026. Eight have two equations sharing a root — eliminate the square term to find it, or, when the roots are not real, match the coefficients; five build an equation — four from new roots made out of old ones, one from a work problem. Two ideas cover the page.",
  concepts: [
    // C1 — common root
    {
      kind: "formula" as const,
      slug: "jqe-common-root",
      name: "A root shared by two equations",
      intuition:
        "If \\(\\alpha\\) satisfies both equations, scale them so the \\(x^2\\) terms match and subtract. What is left is linear in \\(\\alpha\\), so the common root comes out directly; the sum or product in each equation then gives its other root. If one equation has non-real roots and both have real coefficients, sharing one root means sharing both, because non-real roots come in conjugate pairs — so the coefficients are proportional.",
      definition:
        "- Eliminate \\(x^2\\) (or the constant) between the two equations; the linear equation left gives \\(\\alpha\\).\n" +
        "- Then Vieta on each equation gives the other roots.\n" +
        "- Non-real roots, real coefficients: both roots are shared, so \\(\\frac{a_1}{a_2}=\\frac{b_1}{b_2}=\\frac{c_1}{c_2}\\).",
      formula: {
        label: "Condition for one common root",
        latex: "(c_1a_2-c_2a_1)^2=(a_1b_2-a_2b_1)(b_1c_2-b_2c_1)",
      },
      authoredExample: {
        prompt: "For which \\(k\\ne0\\) do \\(x^2-3x+k=0\\) and \\(x^2-5x+2k=0\\) share a root?",
        steps: [
          "Subtract: \\(2x-k=0\\), so \\(\\alpha=\\frac k2\\).",
          "In the first equation: \\(\\frac{k^2}{4}-\\frac{3k}{2}+k=0\\), so \\(k(k-2)=0\\).",
        ],
        answer: "\\(k=2\\); the common root is \\(1\\), and the other roots are \\(2\\) and \\(4\\).",
      },
      selfCheckExample: {
        prompt: "\\(x^2+x+1=0\\) and \\(ax^2+bx+3=0\\), with \\(a,b\\) real, share a root. Find \\(a+b\\).",
        steps: [
          "\\(x^2+x+1=0\\) has non-real roots, so both are shared.",
          "\\(\\frac a1=\\frac b1=\\frac31\\).",
        ],
        answer: "\\(a+b=6\\).",
      },
      practiceSet: [
        { prompt: "Common root of \\(x^2-4x+3=0\\) and \\(x^2-6x+5=0\\)?", answer: "\\(1\\)" },
        { prompt: "\\(x^2+px+4=0\\) and \\(x^2+4x+p=0\\), \\(p\\ne4\\), share a root. \\(p\\)?", answer: "\\(-5\\) (common root \\(1\\))" },
        { prompt: "\\(2x^2+3x+4=0\\) and \\(4x^2+cx+8=0\\) share a root. \\(c\\)?", answer: "\\(6\\)" },
        { prompt: "Real coefficients, one equation with non-real roots, one root shared: how many shared?", answer: "Both" },
      ],
      pyqExampleId: "b9f14700-86ae-4628-9e56-e5aa350f75a2", // 2023 — eliminate λ to find the common root, then form a new equation
      traps: [
        {
          title: "Proportional only for non-real roots",
          body: "Two equations with real roots can share one root and not the other. Making the coefficients proportional then gives a wrong answer. Use proportionality only when one equation's roots are non-real.",
        },
      ],
    },

    // C2 — building an equation from its roots
    {
      kind: "formula" as const,
      slug: "jqe-new-equation",
      name: "Building an equation from its roots",
      intuition:
        "A quadratic with leading coefficient 1 is fixed by its roots: \\(x^2-(\\text{sum})x+\\text{product}=0\\). When the new roots are made from old ones, find their sum and product from \\(\\alpha+\\beta\\) and \\(\\alpha\\beta\\) — never from \\(\\alpha\\) and \\(\\beta\\) separately, unless they are easy to find. Some changes have shortcuts: reciprocal roots reverse the coefficients, and scaling or shifting the roots changes \\(x\\) in the old equation.",
      definition:
        "- Roots \\(r_1,r_2\\): \\(x^2-(r_1+r_2)x+r_1r_2=0\\).\n" +
        "- Roots \\(\\frac1\\alpha,\\frac1\\beta\\): reverse the coefficients, \\(cx^2+bx+a=0\\).\n" +
        "- Roots \\(k\\alpha,k\\beta\\): replace \\(x\\) by \\(\\frac xk\\).\n" +
        "- Roots \\(\\alpha+h,\\beta+h\\): replace \\(x\\) by \\(x-h\\).",
      formula: {
        label: "Equation from its roots",
        latex: "x^2-(r_1+r_2)x+r_1r_2=0",
      },
      authoredExample: {
        prompt: "The roots of \\(x^2-5x+2=0\\) are \\(\\alpha,\\beta\\). Find the equation with roots \\(\\alpha+\\frac1\\beta\\) and \\(\\beta+\\frac1\\alpha\\).",
        steps: [
          "Sum: \\((\\alpha+\\beta)+\\frac{\\alpha+\\beta}{\\alpha\\beta}=5+\\frac52=\\frac{15}{2}\\).",
          "Product: \\(\\alpha\\beta+2+\\frac{1}{\\alpha\\beta}=2+2+\\frac12=\\frac92\\).",
        ],
        answer: "\\(2x^2-15x+9=0\\).",
      },
      selfCheckExample: {
        prompt: "Find the equation whose roots are the reciprocals of the roots of \\(4x^2-9x+2=0\\).",
        steps: [
          "Reverse the coefficients.",
        ],
        answer: "\\(2x^2-9x+4=0\\) (roots \\(\\frac12\\) and \\(4\\)).",
      },
      practiceSet: [
        { prompt: "Equation with roots \\(2\\) and \\(-5\\)?", answer: "\\(x^2+3x-10=0\\)" },
        { prompt: "The roots of \\(x^2-3x+1=0\\), doubled?", answer: "\\(x^2-6x+4=0\\)" },
        { prompt: "The roots of \\(x^2+x-6=0\\), each increased by \\(1\\)?", answer: "\\(x^2-x-6=0\\)" },
        { prompt: "The roots of \\(x^2-4x+1=0\\), squared?", answer: "\\(x^2-14x+1=0\\)" },
      ],
      pyqExampleId: "7155eb24-d154-464e-8f05-97d89a5829ba", // 2026 — find the roots from two linked equations, then m
      traps: [
        {
          title: "Divide by the leading coefficient",
          body: "For \\(ax^2+bx+c=0\\) the sum of the roots is \\(-\\frac ba\\), not \\(-b\\). Read the sum and product only after dividing by \\(a\\), and clear fractions at the end so the answer matches the options.",
        },
      ],
    },
  ],
};

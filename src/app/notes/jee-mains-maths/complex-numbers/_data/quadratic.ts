import type { SubtopicNote } from "@/app/notes/_types";

export const QUADRATIC_CX_NOTE: SubtopicNote = {
  subtopicName: "Quadratic Equations with Complex Roots",
  title: "Quadratic Equations with Complex Roots",
  oneLineDefinition:
    "Quadratics whose roots, or whose coefficients, are complex: solving them, using the sum and product of the roots, and finding high powers of the roots.",
  whyItMatters:
    "Seventeen PYQs, eleven of them multiple choice, and four from 2026. Ten solve a quadratic or use the sum and product of its roots; seven ask for a high power of the roots, found by a recurrence or by polar form. Two ideas cover the page.",
  concepts: [
    // C1 — roots and Vieta
    {
      kind: "formula" as const,
      slug: "jcx-roots",
      name: "Roots, sum and product",
      intuition:
        "The quadratic formula works with complex coefficients too; the only new step is a square root of a complex number, found by solving \\((p+iq)^2=a+ib\\). The sum and product of the roots, \\(-\\frac ba\\) and \\(\\frac ca\\), hold whatever the coefficients. When the coefficients are real, non-real roots come in conjugate pairs; with complex coefficients they need not.",
      definition:
        "- \\(\\alpha+\\beta=-\\frac ba\\), \\(\\alpha\\beta=\\frac ca\\).\n" +
        "- \\(\\sqrt{a+ib}\\): solve \\(p^2-q^2=a\\), \\(2pq=b\\).\n" +
        "- Real coefficients: if \\(p+iq\\) is a root, so is \\(p-iq\\).\n" +
        "- \\(\\alpha^2+\\beta^2=(\\alpha+\\beta)^2-2\\alpha\\beta\\); \\(\\alpha^3+\\beta^3=(\\alpha+\\beta)^3-3\\alpha\\beta(\\alpha+\\beta)\\).\n" +
        "- For monic \\(P\\) with roots \\(x_i\\): \\(\\prod(c-x_i)=P(c)\\).",
      formula: {
        label: "Sum and product of the roots",
        latex: "\\alpha+\\beta=-\\frac ba,\\qquad\\alpha\\beta=\\frac ca",
      },
      authoredExample: {
        prompt: "Solve \\(z^2-(3+i)z+(2+2i)=0\\).",
        steps: [
          "Discriminant: \\((3+i)^2-4(2+2i)=-2i=(1-i)^2\\).",
          "\\(z=\\frac{(3+i)\\pm(1-i)}{2}\\).",
        ],
        answer: "\\(z=2\\) or \\(z=1+i\\).",
      },
      selfCheckExample: {
        prompt: "If \\(2+i\\) is a root of \\(x^2+px+q=0\\) with \\(p,q\\) real, find \\(p\\) and \\(q\\).",
        steps: [
          "The other root is \\(2-i\\): sum 4, product 5.",
        ],
        answer: "\\(p=-4\\), \\(q=5\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sqrt{-5+12i}\\)?", answer: "\\(\\pm(2+3i)\\)" },
        { prompt: "Sum of the roots of \\(z^2-2iz+3=0\\)?", answer: "\\(2i\\)" },
        { prompt: "\\(z_1^2+z_2^2\\) if \\(z_1+z_2=2\\), \\(z_1z_2=5\\)?", answer: "\\(-6\\)" },
        { prompt: "Real quadratic with a root \\(3i\\)?", answer: "\\(x^2+9=0\\)" },
      ],
      pyqExampleId: "a0c20704-4782-498c-93fc-c922e38f234c", // 2026 — (beta^3 - alpha^3)^2 from beta - alpha and beta^2 - alpha^2
      traps: [
        {
          title: "Conjugate roots need real coefficients",
          body: "For \\(z^2-(3+i)z+(2+2i)=0\\) the roots are \\(2\\) and \\(1+i\\), not a conjugate pair. Use the conjugate root only when every coefficient is real.",
        },
      ],
    },

    // C2 — powers of the roots
    {
      kind: "formula" as const,
      slug: "jcx-powers",
      name: "Powers of the roots",
      intuition:
        "For \\(\\alpha^n+\\beta^n\\) there are two routes. If the roots have equal modulus, as they do for a real quadratic with negative discriminant, write them as \\(\\rho e^{\\pm i\\theta}\\) and use De Moivre. Otherwise use the equation itself: \\(\\alpha^2=p\\alpha+q\\) gives \\(S_{n+2}=pS_{n+1}+qS_n\\) for \\(S_n=\\alpha^n+\\beta^n\\) (and the same for \\(\\alpha^n-\\beta^n\\)), and it also turns any power of \\(\\alpha\\) into a linear expression \\(A\\alpha+B\\).",
      definition:
        "- \\(\\alpha^2=p\\alpha+q\\) gives \\(S_{n+2}=pS_{n+1}+qS_n\\).\n" +
        "- Real coefficients with \\(D<0\\): \\(\\alpha,\\beta=\\rho e^{\\pm i\\theta}\\), \\(\\rho=\\sqrt{c/a}\\), and \\(\\alpha^n+\\beta^n=2\\rho^n\\cos n\\theta\\).\n" +
        "- Any \\(\\alpha^k\\) reduces to \\(A\\alpha+B\\) using the equation.",
      formula: {
        label: "Recurrence for power sums",
        latex: "S_{n+2}=p\\,S_{n+1}+q\\,S_n\\qquad(\\alpha^2=p\\alpha+q)",
      },
      authoredExample: {
        prompt: "\\(\\alpha,\\beta\\) are the roots of \\(x^2-2x+2=0\\). Find \\(\\alpha^8+\\beta^8\\).",
        steps: [
          "The roots are \\(1\\pm i=\\sqrt2e^{\\pm i\\pi/4}\\).",
          "\\(\\alpha^8+\\beta^8=2\\cdot16\\cos2\\pi\\).",
        ],
        answer: "\\(32\\).",
      },
      selfCheckExample: {
        prompt: "\\(\\alpha,\\beta\\) are the roots of \\(x^2-x-1=0\\) and \\(S_n=\\alpha^n+\\beta^n\\). Find \\(S_5\\).",
        steps: [
          "\\(S_1=1\\), \\(S_2=3\\), and \\(S_{n+2}=S_{n+1}+S_n\\): \\(S_3=4\\), \\(S_4=7\\).",
        ],
        answer: "\\(S_5=11\\).",
      },
      practiceSet: [
        { prompt: "\\(\\alpha^3\\) if \\(\\alpha^2=\\alpha-1\\)?", answer: "\\(-1\\)" },
        { prompt: "\\(\\alpha^3+\\beta^3\\) for the roots of \\(x^2+x+1=0\\)?", answer: "\\(2\\)" },
        { prompt: "\\(\\alpha\\beta\\) for \\(1\\pm i\\)?", answer: "\\(2\\)" },
        { prompt: "\\(S_4\\) for \\(x^2-2x-1=0\\)?", answer: "\\(34\\)" },
      ],
      pyqExampleId: "469e64bd-a8ad-471b-baa2-00b61a71546a", // 2023 — alpha^14 + beta^14 for x^2 - sqrt(2)x + 2 = 0
      traps: [
        {
          title: "Which root is alpha",
          body: "When a question fixes \\(\\mathrm{Im}(\\alpha)>\\mathrm{Im}(\\beta)\\), expressions like \\(\\alpha^n-\\beta^n\\) or \\(\\frac\\alpha\\beta\\) depend on the choice. Name the roots before computing.",
        },
      ],
    },
  ],
};

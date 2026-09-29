import type { SubtopicNote } from "@/app/notes/_types";

export const REDUCTION_DI_NOTE: SubtopicNote = {
  subtopicName: "Reduction Formulas and Beta Integrals",
  title: "Reduction Formulas and Beta Integrals",
  oneLineDefinition:
    "Families of integrals indexed by n, linked by a relation between neighbouring members, and the Beta integral B(m, n) with its symmetry and its sum rule.",
  whyItMatters:
    "Twelve PYQs. None asks for a single integral's value: each asks for a relation between members of a family, or a ratio, sum or combination of them, which the reduction formula collapses. Two ideas cover the page.",
  concepts: [
    // C1 — reduction formulas
    {
      kind: "formula" as const,
      slug: "jdi-reduction",
      name: "Reduction formulas by parts",
      intuition:
        "Integrate \\(I_n\\) by parts, or split off one power, to express it through \\(I_{n-1}\\) or \\(I_{n-2}\\). Once the relation is known, ratios like \\(\\frac{I_n}{I_{n+1}}\\) and sums like \\(I_n+I_{n+2}\\) collapse to simple expressions in \\(n\\).",
      definition:
        "- \\(\\int_0^1(1-x^k)^n\\,dx=I_n\\): \\(I_n=\\frac{nk}{nk+1}I_{n-1}\\).\n" +
        "- \\(\\int_0^{\\pi/4}\\tan^nx\\,dx=I_n\\): \\(I_n+I_{n+2}=\\frac1{n+1}\\).\n" +
        "- \\(\\int_0^{\\pi/2}\\sin^nx\\,dx=I_n\\): \\(I_n=\\frac{n-1}nI_{n-2}\\).\n" +
        "- \\(\\int_0^1x^ne^x\\,dx=I_n\\): \\(I_n=e-nI_{n-1}\\).",
      formula: {
        label: "Powers of sine",
        latex: "\\int_0^{\\pi/2}\\sin^n x\\,dx=\\frac{n-1}{n}\\int_0^{\\pi/2}\\sin^{n-2}x\\,dx",
      },
      authoredExample: {
        prompt: "\\(I_n=\\int_0^1x^ne^x\\,dx\\). Find \\(I_2\\).",
        steps: [
          "By parts, \\(I_n=e-nI_{n-1}\\), with \\(I_0=e-1\\).",
          "\\(I_1=e-(e-1)=1\\), \\(I_2=e-2\\cdot1\\).",
        ],
        answer: "\\(e-2\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2}\\sin^4x\\,dx\\).",
        steps: [
          "\\(\\frac34\\cdot\\frac12\\cdot\\frac\\pi2\\).",
        ],
        answer: "\\(\\frac{3\\pi}{16}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int_0^{\\pi/2}\\sin^3x\\,dx\\)?", answer: "\\(\\frac23\\)" },
        { prompt: "\\(I_n+I_{n+2}\\) for \\(\\int_0^{\\pi/4}\\tan^nx\\,dx\\)?", answer: "\\(\\frac1{n+1}\\)" },
        { prompt: "\\(\\int_0^1(1-x^2)\\,dx\\)?", answer: "\\(\\frac23\\)" },
        { prompt: "\\(I_n=\\int_0^1(1-x^k)^n\\,dx\\): \\(\\frac{I_n}{I_{n-1}}\\)?", answer: "\\(\\frac{nk}{nk+1}\\)" },
      ],
      pyqExampleId: "b96c6774-6a19-4b2a-aff9-e49d7d0f507f", // 2021 — I_n = integral of cot^n x over [pi/4, pi/2]
      traps: [
        {
          title: "Keep the boundary term",
          body: "The term \\([uv]\\) from integrating by parts is often what gives the relation its constant, as the \\(e\\) in \\(I_n=e-nI_{n-1}\\). Dropping it makes the relation wrong.",
        },
      ],
    },

    // C2 — Beta integrals
    {
      kind: "formula" as const,
      slug: "jdi-beta",
      name: "Beta integrals",
      intuition:
        "\\(B(m,n)=\\int_0^1x^{m-1}(1-x)^{n-1}dx\\). Putting \\(x\\to1-x\\) shows \\(B(m,n)=B(n,m)\\). Since \\(x+(1-x)=1\\), the integrand of \\(B(m,n)\\) splits into those of \\(B(m+1,n)\\) and \\(B(m,n+1)\\). For whole numbers, \\(B(m,n)=\\frac{(m-1)!\\,(n-1)!}{(m+n-1)!}\\). The substitution \\(t=x^k\\) turns \\(\\int_0^1(1-x^k)^n\\,dx\\) into a Beta integral.",
      definition:
        "- \\(B(m,n)=\\int_0^1x^{m-1}(1-x)^{n-1}dx=B(n,m)\\).\n" +
        "- \\(B(m+1,n)+B(m,n+1)=B(m,n)\\).\n" +
        "- Whole numbers: \\(B(m,n)=\\frac{(m-1)!(n-1)!}{(m+n-1)!}\\).\n" +
        "- \\(\\int_0^1(1-x^k)^n\\,dx=\\frac1kB\\left(\\frac1k,n+1\\right)\\).",
      formula: {
        label: "The sum rule",
        latex: "B(m+1,n)+B(m,n+1)=B(m,n)",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^1x(1-x)^3\\,dx\\).",
        steps: [
          "\\(B(2,4)=\\frac{1!\\,3!}{5!}\\).",
        ],
        answer: "\\(\\frac1{20}\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(B(3,2)\\) and compare it with \\(B(2,3)\\).",
        steps: [
          "\\(\\frac{2!\\,1!}{4!}\\); the two are equal by symmetry.",
        ],
        answer: "Both \\(\\frac1{12}\\).",
      },
      practiceSet: [
        { prompt: "\\(B(1,1)\\)?", answer: "\\(1\\)" },
        { prompt: "\\(B(m,n)\\) equals \\(B(?,?)\\)?", answer: "\\(B(n,m)\\)" },
        { prompt: "\\(\\int_0^1x^2(1-x)^2\\,dx\\)?", answer: "\\(\\frac1{30}\\)" },
        { prompt: "\\(t=x^{10}\\) in \\(\\int_0^1(1-x^{10})^{20}dx\\) brings which factor?", answer: "\\(\\frac1{10}\\)" },
      ],
      pyqExampleId: "d2325810-698b-4d7b-abcf-f9e78da95729", // 2025 — I(9,14) + I(10,13) as one Beta integral
      traps: [
        {
          title: "The exponents are m − 1 and n − 1",
          body: "\\(x^2(1-x)^2\\) is \\(B(3,3)\\), not \\(B(2,2)\\). Add 1 to each exponent to read off \\(m\\) and \\(n\\).",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const HOMOGENEOUS_DET_NOTE: SubtopicNote = {
  subtopicName: "Homogeneous Systems and Non-trivial Solutions",
  title: "Homogeneous Systems and Non-trivial Solutions",
  oneLineDefinition:
    "Systems with every right-hand side zero: they always have the zero solution, and have others exactly when the coefficient determinant is zero.",
  whyItMatters:
    "Ten PYQs, nine of them multiple choice, and two from 2026. Five have an angle in the coefficients and ask for the values of the angle giving a non-trivial solution; five have an algebraic constant instead. Both reduce to Δ = 0. Two ideas cover the page.",
  concepts: [
    // C1 — trig parameter
    {
      kind: "formula" as const,
      slug: "jdet-homog-trig",
      name: "An angle in the coefficients",
      intuition:
        "A homogeneous system always has \\(x=y=z=0\\). It has another solution exactly when \\(\\Delta=0\\). With \\(\\sin\\theta\\) or \\(\\cos\\theta\\) in the coefficients, \\(\\Delta=0\\) becomes a trigonometric equation; solve it and list the solutions in the interval asked for.",
      definition:
        "- Homogeneous: all right-hand sides 0; the trivial solution always exists.\n" +
        "- Non-trivial solution exactly when \\(\\Delta=0\\) (then infinitely many).\n" +
        "- Solve \\(\\Delta(\\theta)=0\\) in the given interval.",
      formula: {
        label: "Non-trivial solutions",
        latex: "A\\mathbf x=\\mathbf0\\ \\text{has }\\mathbf x\\neq\\mathbf0\\ \\text{exactly when}\\ |A|=0",
      },
      authoredExample: {
        prompt: "For which \\(\\theta\\in[0,2\\pi)\\) has \\(x+(\\sin\\theta)y=0\\), \\((\\sin\\theta)x+y=0\\) a non-trivial solution?",
        steps: [
          "\\(\\Delta=1-\\sin^2\\theta=0\\), so \\(\\sin\\theta=\\pm1\\).",
        ],
        answer: "\\(\\theta=\\frac\\pi2,\\ \\frac{3\\pi}2\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(\\theta\\in(0,\\pi)\\) has \\((\\cos\\theta)x+y=0\\), \\(x+(\\cos\\theta)y=0\\) a non-trivial solution?",
        steps: [
          "\\(\\cos^2\\theta=1\\) needs \\(\\theta=0\\) or \\(\\pi\\), both outside the open interval.",
        ],
        answer: "No value.",
      },
      practiceSet: [
        { prompt: "Does a homogeneous system always have a solution?", answer: "Yes, the zero solution" },
        { prompt: "\\(\\Delta\\neq0\\) for a homogeneous system?", answer: "Only the trivial solution" },
        { prompt: "Solutions of \\(\\sin2\\theta=0\\) in \\((0,\\pi)\\)?", answer: "\\(\\frac\\pi2\\)" },
        { prompt: "\\(\\Delta=0\\): how many solutions?", answer: "Infinitely many" },
      ],
      pyqExampleId: "04448236-dcf3-4ad9-9b44-dfa01a70d9df", // 2026 — angle values giving a non-trivial solution
      traps: [
        {
          title: "Open or closed interval",
          body: "Trig solutions often sit at the ends, \\(0\\) or \\(\\pi\\). Check whether the interval includes them before counting.",
        },
      ],
    },

    // C2 — algebraic parameter
    {
      kind: "formula" as const,
      slug: "jdet-homog-param",
      name: "An algebraic constant",
      intuition:
        "With a constant \\(k\\) in the coefficients, expand \\(\\Delta\\) — row operations first when the rows are similar — and solve \\(\\Delta=0\\). Follow-up questions then use the non-trivial solution: express \\(x:y:z\\) from two equations.",
      definition:
        "- Non-trivial solution: \\(\\Delta(k)=0\\).\n" +
        "- The ratio \\(x:y:z\\) comes from any two independent equations.\n" +
        "- Symmetric systems: add all rows first.",
      formula: {
        label: "Symmetric determinant",
        latex: "\\begin{vmatrix}k&1&1\\\\1&k&1\\\\1&1&k\\end{vmatrix}=(k+2)(k-1)^2",
      },
      authoredExample: {
        prompt: "For which \\(k\\) has \\(x+2y+3z=0\\), \\(2x+y+kz=0\\), \\(x-y+z=0\\) a non-trivial solution?",
        steps: [
          "\\(\\Delta=1(1+k)-2(2-k)+3(-3)=3k-12\\).",
        ],
        answer: "\\(k=4\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(k\\) has \\(kx+y+z=0\\), \\(x+ky+z=0\\), \\(x+y+kz=0\\) a non-trivial solution?",
        steps: [
          "Adding the columns, \\(\\Delta=(k+2)(k-1)^2\\).",
        ],
        answer: "\\(k=1\\) or \\(k=-2\\).",
      },
      practiceSet: [
        { prompt: "\\(x+y=0\\), \\(x+ky=0\\) non-trivial for?", answer: "\\(k=1\\)" },
        { prompt: "\\(x:y\\) from \\(x+2y=0\\)?", answer: "\\(-2:1\\)" },
        { prompt: "\\(\\Delta=k^2-4\\): values?", answer: "\\(\\pm2\\)" },
        { prompt: "Only the trivial solution when?", answer: "\\(\\Delta\\neq0\\)" },
      ],
      pyqExampleId: "2e6c235d-1ca4-4ff0-af12-7b88ea862765", // 2024 — constant for which a homogeneous system has a non-trivial solution
      traps: [
        {
          title: "Every root counts",
          body: "\\((k+2)(k-1)^2=0\\) has two distinct values. A question asking for the sum or number of values needs both.",
        },
      ],
    },
  ],
};

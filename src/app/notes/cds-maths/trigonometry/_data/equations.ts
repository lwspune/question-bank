import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TR_EQUATIONS_NOTE: SubtopicNote = {
  subtopicName: "Trigonometric Equations",
  title: "Trigonometric Equations",
  oneLineDefinition:
    "Turn the equation into one ratio, solve it as an ordinary equation, then throw out every root the ratio or the stated range cannot allow.",
  whyItMatters:
    "Twenty-six PYQs, mostly MODERATE, and nearly every one ends by asking for some other quantity once θ is known. The solving is routine; the marks are lost at the last step, where a root outside [−1, 1] or outside the stated interval has to be rejected.",
  concepts: [
    // C1 — reduce to one ratio
    {
      kind: "formula" as const,
      slug: "cdstr-reduce-to-one-ratio",
      name: "Reduce to one ratio and solve the quadratic",
      intuition:
        "An equation with both \\(\\sin^2\\theta\\) and \\(\\cos^2\\theta\\), or both \\(\\tan^2\\theta\\) and \\(\\sec\\theta\\), becomes an ordinary quadratic once one ratio is written in terms of the other. Solve it, then keep only the roots a ratio can actually take and the stated range allows.",
      definition:
        "- Replace \\(\\cos^2\\theta\\) by \\(1 - \\sin^2\\theta\\) (or the reverse), or \\(\\tan^2\\theta\\) by \\(\\sec^2\\theta - 1\\).\n" +
        "- Solve the resulting quadratic in the single ratio.\n" +
        "- **Reject** a root that the ratio cannot take (\\(\\sin\\theta = 3\\), \\(\\sec\\theta = \\dfrac12\\)), and a root outside the stated interval.\n" +
        "- A 'how many solutions' question is answered by counting the roots that survive — often zero.",
      formula: {
        label: "The substitutions",
        latex: "\\cos^2\\theta = 1 - \\sin^2\\theta, \\qquad \\tan^2\\theta = \\sec^2\\theta - 1",
      },
      authoredExample: {
        prompt: "Solve \\(2\\sin^2\\theta - 3\\cos\\theta = 0\\) for \\(0^\\circ < \\theta < 90^\\circ\\).",
        steps: [
          "Replace \\(\\sin^2\\theta\\): \\(2(1 - \\cos^2\\theta) - 3\\cos\\theta = 0\\), i.e. \\(2\\cos^2\\theta + 3\\cos\\theta - 2 = 0\\).",
          "Factor: \\((2\\cos\\theta - 1)(\\cos\\theta + 2) = 0\\).",
          "\\(\\cos\\theta = -2\\) is impossible, so \\(\\cos\\theta = \\dfrac12\\) and \\(\\theta = 60^\\circ\\).",
        ],
        answer: "\\(\\theta = 60^\\circ\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\sec^2\\theta + \\tan\\theta = 3\\) for \\(0^\\circ < \\theta < 90^\\circ\\).",
        steps: [
          "Replace \\(\\sec^2\\theta\\) by \\(1 + \\tan^2\\theta\\): \\(\\tan^2\\theta + \\tan\\theta - 2 = 0\\).",
          "Factor: \\((\\tan\\theta + 2)(\\tan\\theta - 1) = 0\\).",
          "In the first quadrant \\(\\tan\\theta > 0\\), so \\(\\tan\\theta = 1\\) and \\(\\theta = 45^\\circ\\).",
        ],
        answer: "\\(45^\\circ\\).",
      },
      practiceSet: [
        { prompt: "Solve \\(2\\cos^2\\theta = 1\\) for acute \\(\\theta\\).", answer: "\\(45^\\circ\\)" },
        { prompt: "Roots of \\(\\sin^2\\theta - 4\\sin\\theta + 3 = 0\\) that a sine can take?", answer: "\\(\\sin\\theta = 1\\) only" },
        { prompt: "Solve \\(4\\sin^2\\theta = 3\\) for acute \\(\\theta\\).", answer: "\\(60^\\circ\\)" },
        { prompt: "Solve \\(3\\tan^2\\theta = 1\\) for acute \\(\\theta\\).", answer: "\\(30^\\circ\\)" },
      ],
      pyqExampleId: "22d7da49-d4cc-4783-866d-4f9372ac8cf7", // 2023 (I) — 2cos²θ + sin θ − 2 = 0
      traps: [
        {
          title: "A strict interval can exclude the only root",
          body:
            "If the only surviving root is \\(\\sin\\theta = 1\\), that is \\(\\theta = 90^\\circ\\). On \\(0 < \\theta < \\dfrac{\\pi}{2}\\) — a strict inequality — it is excluded, and the equation has **no** solution. Read the inequality signs of the range before answering.",
        },
      ],
    },

    // C2 — t + 1/t equations
    {
      kind: "formula" as const,
      slug: "cdstr-reciprocal-sum-equations",
      name: "Equations in a ratio and its reciprocal",
      intuition:
        "Equations like \\(\\sec\\theta + \\cos\\theta = \\dfrac52\\) or \\(12(\\tan\\theta + \\cot\\theta) = 25\\) are \\(t + \\dfrac1t = c\\) in disguise. Multiply through by \\(t\\) to get a quadratic; its two roots are reciprocals of each other, and the stated range picks one.",
      definition:
        "- \\(t + \\dfrac1t = c\\) becomes \\(t^2 - ct + 1 = 0\\), whose roots multiply to \\(1\\).\n" +
        "- For \\(\\cos\\theta + \\sec\\theta\\), the root with \\(|t| \\le 1\\) is the cosine.\n" +
        "- For \\(\\tan\\theta + \\cot\\theta\\), the two roots are \\(\\tan\\theta\\) for two complementary angles; a range like \\(45^\\circ < \\theta < 90^\\circ\\) picks the root above \\(1\\).\n" +
        "- \\(t + \\dfrac1t = 2\\) forces \\(t = 1\\): the sum of a positive number and its reciprocal is \\(2\\) only at \\(1\\).",
      formula: {
        label: "Clearing the reciprocal",
        latex: "t + \\frac1t = c \\;\\Rightarrow\\; t^2 - ct + 1 = 0",
      },
      authoredExample: {
        prompt: "If \\(6(\\tan\\theta + \\cot\\theta) = 13\\) with \\(0^\\circ < \\theta < 45^\\circ\\), find \\(\\sin\\theta\\).",
        steps: [
          "With \\(t = \\tan\\theta\\): \\(6t^2 - 13t + 6 = 0\\), so \\(t = \\dfrac32\\) or \\(t = \\dfrac23\\).",
          "Below \\(45^\\circ\\), \\(\\tan\\theta < 1\\), so \\(\\tan\\theta = \\dfrac23\\).",
          "Hypotenuse \\(\\sqrt{4 + 9} = \\sqrt{13}\\), so \\(\\sin\\theta = \\dfrac{2}{\\sqrt{13}}\\).",
        ],
        answer: "\\(\\dfrac{2}{\\sqrt{13}}\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\cos\\theta + \\sec\\theta = \\dfrac{10}{3}\\), find \\(\\sin^2\\theta\\).",
        steps: [
          "With \\(c = \\cos\\theta\\): \\(3c^2 - 10c + 3 = 0\\), so \\(c = 3\\) or \\(c = \\dfrac13\\).",
          "A cosine cannot be \\(3\\), so \\(\\cos\\theta = \\dfrac13\\).",
          "\\(\\sin^2\\theta = 1 - \\dfrac19 = \\dfrac89\\).",
        ],
        answer: "\\(\\dfrac89\\).",
      },
      practiceSet: [
        { prompt: "Roots of \\(t + \\dfrac1t = \\dfrac52\\)?", answer: "\\(2\\) and \\(\\dfrac12\\)" },
        { prompt: "If \\(\\tan A + \\cot A = 2\\), then \\(\\tan A\\)?", answer: "\\(1\\)" },
        { prompt: "If \\(\\cos\\theta + \\sec\\theta = 2\\), then \\(\\theta\\) in \\([0^\\circ, 90^\\circ)\\)?", answer: "\\(0^\\circ\\)" },
        { prompt: "Product of the roots of \\(t^2 - ct + 1 = 0\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "ea1cc99b-6574-46cc-b92b-7c4cef7b1f7a", // 2021 (I) — sec θ + cos θ = 5/2
      traps: [
        {
          title: "Both roots of tan θ + cot θ = c are real angles",
          body:
            "\\(\\tan\\theta = \\dfrac43\\) and \\(\\tan\\theta = \\dfrac34\\) both solve \\(12(\\tan\\theta + \\cot\\theta) = 25\\); they are complementary angles. Only the stated range decides which one the question means — so a range like \\(45^\\circ < \\theta < 90^\\circ\\) is not decoration.",
        },
      ],
    },

    // C3 — linear a sin + b cos = c
    {
      kind: "formula" as const,
      slug: "cdstr-linear-sin-cos-equations",
      name: "Linear equations a sin θ + b cos θ = c",
      intuition:
        "An equation like \\(8\\sin\\theta - \\cos\\theta = 4\\) has two unknowns tied by \\(\\sin^2\\theta + \\cos^2\\theta = 1\\). Solve the linear equation for one of them, substitute into the identity, and a quadratic appears. One of its roots usually gives the wrong sign for the range and must go.",
      definition:
        "- From \\(a\\sin\\theta + b\\cos\\theta = c\\), express \\(\\cos\\theta\\) in terms of \\(\\sin\\theta\\) (or the reverse).\n" +
        "- Substitute into \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) and solve the quadratic.\n" +
        "- For each root, compute the other ratio and **check its sign** against the range. Squaring has introduced a spurious root.\n" +
        "- If \\(c^2 = a^2 + b^2\\), the equation is at its maximum and has one solution: \\(\\sin\\theta = \\dfrac{a}{c}\\), \\(\\cos\\theta = \\dfrac{b}{c}\\).",
      formula: {
        label: "Substitute into the identity",
        latex: "a\\sin\\theta + b\\cos\\theta = c, \\quad \\sin^2\\theta + \\cos^2\\theta = 1",
      },
      authoredExample: {
        prompt: "If \\(7\\sin\\theta - \\cos\\theta = 5\\) with \\(0 < \\theta < 90^\\circ\\), find \\(\\sin\\theta\\).",
        steps: [
          "\\(\\cos\\theta = 7\\sin\\theta - 5\\). Substitute: \\(\\sin^2\\theta + (7\\sin\\theta - 5)^2 = 1\\).",
          "\\(50\\sin^2\\theta - 70\\sin\\theta + 24 = 0\\), i.e. \\(25s^2 - 35s + 12 = 0\\), so \\(s = \\dfrac45\\) or \\(\\dfrac35\\).",
          "\\(s = \\dfrac45\\) gives \\(\\cos\\theta = \\dfrac{28}{5} - 5 = \\dfrac35 > 0\\): valid. \\(s = \\dfrac35\\) gives \\(\\cos\\theta = \\dfrac{21}{5} - 5 = -\\dfrac45\\): not in the first quadrant.",
        ],
        answer: "\\(\\dfrac45\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\sqrt3\\sin\\theta + \\cos\\theta = 2\\), find \\(\\theta\\) in \\((0^\\circ, 90^\\circ)\\).",
        steps: [
          "Here \\(a^2 + b^2 = 3 + 1 = 4 = c^2\\), so the equation is at its maximum.",
          "Then \\(\\sin\\theta = \\dfrac{\\sqrt3}{2}\\) and \\(\\cos\\theta = \\dfrac12\\).",
        ],
        answer: "\\(60^\\circ\\).",
      },
      practiceSet: [
        { prompt: "If \\(\\sin\\theta + \\cos\\theta = 1\\), acute or zero \\(\\theta\\)?", answer: "\\(0^\\circ\\)", method: "or \\(90^\\circ\\) if allowed" },
        { prompt: "Maximum of \\(3\\sin\\theta + 4\\cos\\theta\\)?", answer: "\\(5\\)" },
        { prompt: "If \\(6\\sin\\theta + 8\\cos\\theta = 10\\), then \\(\\tan\\theta\\)?", answer: "\\(\\dfrac34\\)" },
        { prompt: "What must you check after squaring?", answer: "The sign of the other ratio in the given range" },
      ],
      pyqExampleId: "44d3fb30-20a8-4c97-8b8d-7d5a545ee76b", // 2025 (II) — 8 sin θ − cos θ = 4
      traps: [
        {
          title: "The quadratic always offers a root that fails",
          body:
            "Substituting and squaring doubles the solutions. In the first quadrant both sine and cosine must be positive; the rejected root almost always gives a negative cosine. The paper prints its value among the options.",
        },
      ],
    },

    // C4 — systems of angle equations
    {
      kind: "formula" as const,
      slug: "cdstr-angle-systems",
      name: "Systems in two or three angles",
      intuition:
        "When the paper gives \\(\\cos(x + y) = 0\\) and \\(\\sin(x - y) = \\dfrac12\\), each equation pins down one combination of the angles as a standard value. The trig is over after one line; what remains is solving two linear equations for \\(x\\) and \\(y\\).",
      definition:
        "- Turn each given value into an angle, using the range to choose it: \\(\\cos(x + y) = 0\\) with \\(x + y \\in [0, \\pi]\\) gives \\(x + y = \\dfrac{\\pi}{2}\\).\n" +
        "- Solve the resulting linear system.\n" +
        "- For three angles given as \\(B + C - A\\), \\(C + A - B\\), \\(A + B - C\\), **add** the three combinations to get \\(A + B + C\\) directly.",
      formula: {
        label: "Sum of the three combinations",
        latex: "(B + C - A) + (C + A - B) + (A + B - C) = A + B + C",
      },
      authoredExample: {
        prompt: "If \\(\\sin(A + B) = 1\\) and \\(\\cos(A - B) = \\dfrac{\\sqrt3}{2}\\) with \\(A > B\\) acute, find \\(A\\) and \\(B\\).",
        steps: [
          "\\(\\sin(A + B) = 1\\) gives \\(A + B = 90^\\circ\\).",
          "\\(\\cos(A - B) = \\dfrac{\\sqrt3}{2}\\) with \\(A > B\\) gives \\(A - B = 30^\\circ\\).",
          "Solving: \\(A = 60^\\circ\\), \\(B = 30^\\circ\\).",
        ],
        answer: "\\(A = 60^\\circ\\), \\(B = 30^\\circ\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\tan(x + y) = \\sqrt3\\) and \\(\\tan(x - y) = 1\\), with \\(x + y\\) and \\(x - y\\) acute, find \\(x\\).",
        steps: [
          "\\(x + y = 60^\\circ\\) and \\(x - y = 45^\\circ\\).",
          "Adding: \\(2x = 105^\\circ\\), so \\(x = 52.5^\\circ\\).",
        ],
        answer: "\\(52.5^\\circ\\).",
      },
      practiceSet: [
        { prompt: "If \\(\\cos(A + B) = 0\\) and \\(A = 2B\\), acute, find \\(B\\).", answer: "\\(30^\\circ\\)" },
        { prompt: "If \\(\\sin(x - y) = \\dfrac12\\) and \\(x + y = 90^\\circ\\), find \\(x\\).", answer: "\\(60^\\circ\\)" },
        { prompt: "\\(A + B + C\\) if \\(B + C - A = 60^\\circ\\), \\(C + A - B = 30^\\circ\\), \\(A + B - C = 90^\\circ\\)?", answer: "\\(180^\\circ\\)" },
        { prompt: "If \\(\\tan(A - B) = 0\\) with \\(A, B\\) acute, then?", answer: "\\(A = B\\)" },
      ],
      pyqExampleId: "da0d7019-5d30-4fd5-828c-3894907c0fa8", // 2022 (I) — cos(x + y) = 0, sin(x − y) = 1/2
      traps: [
        {
          title: "Use the range to choose the angle, not the calculator's first answer",
          body:
            "\\(\\sin(A + B) = \\dfrac{\\sqrt3}{2}\\) allows \\(A + B = 60^\\circ\\) or \\(120^\\circ\\). The condition that \\(A\\) and \\(B\\) are acute decides which, and the wrong one is always among the options.",
        },
      ],
    },
  ],
};

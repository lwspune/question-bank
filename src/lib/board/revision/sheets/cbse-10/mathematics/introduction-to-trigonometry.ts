import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 10 Mathematics, Ch. 8 Introduction to Trigonometry. Statements checked
 * against the NCERT Class 10 text (rationalised); formulas rebuilt; most-asked
 * years and marks from the CBSE board past-paper questions in the bank,
 * 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Introduction to Trigonometry",
  chapterSlug: "introduction-to-trigonometry",
  source: "NCERT Mathematics (CBSE Class 10), Chapter 8",
  keyPoints: [
    {
      term: "Trigonometric ratios",
      text: "In right triangle ABC, right-angled at B: \\(\\sin A = \\frac{\\text{opposite}}{\\text{hypotenuse}}\\), \\(\\cos A = \\frac{\\text{adjacent}}{\\text{hypotenuse}}\\), \\(\\tan A = \\frac{\\text{opposite}}{\\text{adjacent}}\\).",
    },
    {
      term: "Reciprocal ratios",
      text: "cosec A, sec A and cot A are the reciprocals of sin A, cos A and tan A. Also \\(\\tan A = \\frac{\\sin A}{\\cos A}\\) and \\(\\cot A = \\frac{\\cos A}{\\sin A}\\).",
    },
    {
      term: "One ratio gives all",
      text: "If one ratio of an acute angle is known, the rest can be found: draw a right triangle, take the sides as \\(k\\) multiples, find the third side by Pythagoras.",
    },
    {
      term: "Range of values",
      text: "For an acute angle, \\(\\sin A\\) or \\(\\cos A\\) never exceeds 1, while \\(\\sec A\\) and \\(\\operatorname{cosec} A\\) are always \\(\\geq 1\\). \\(\\tan A\\) can take any value \\(\\geq 0\\).",
    },
    {
      term: "Not defined",
      text: "\\(\\tan 90^\\circ\\) and \\(\\sec 90^\\circ\\) are not defined; \\(\\cot 0^\\circ\\) and \\(\\operatorname{cosec} 0^\\circ\\) are not defined (division by zero).",
    },
    {
      term: "Trigonometric identity",
      text: "An equation involving trigonometric ratios of an angle is a trigonometric identity if it is true for **all values** of the angle involved.",
    },
    {
      term: "Three identities",
      text: "\\(\\sin^2 A + \\cos^2 A = 1\\); \\(\\sec^2 A - \\tan^2 A = 1\\) for \\(0^\\circ \\leq A < 90^\\circ\\); \\(\\operatorname{cosec}^2 A - \\cot^2 A = 1\\) for \\(0^\\circ < A \\leq 90^\\circ\\).",
    },
    {
      term: "Proving an identity",
      text: "Start from the more complicated side. Convert to sin and cos, or to sec and tan (divide by \\(\\cos\\theta\\)). Work on one side only and end with '= RHS'.",
    },
  ],
  formulas: [
    {
      label: "Values at standard angles",
      latex: "\\begin{array}{c|ccccc} A & 0^\\circ & 30^\\circ & 45^\\circ & 60^\\circ & 90^\\circ \\\\ \\hline \\sin A & 0 & \\frac{1}{2} & \\frac{1}{\\sqrt{2}} & \\frac{\\sqrt{3}}{2} & 1 \\\\ \\cos A & 1 & \\frac{\\sqrt{3}}{2} & \\frac{1}{\\sqrt{2}} & \\frac{1}{2} & 0 \\\\ \\tan A & 0 & \\frac{1}{\\sqrt{3}} & 1 & \\sqrt{3} & \\text{not defined} \\end{array}",
    },
    { label: "Quotient relations", latex: "\\tan A = \\frac{\\sin A}{\\cos A}, \\qquad \\cot A = \\frac{\\cos A}{\\sin A}" },
    { label: "Reciprocal relations", latex: "\\operatorname{cosec} A = \\frac{1}{\\sin A}, \\quad \\sec A = \\frac{1}{\\cos A}, \\quad \\cot A = \\frac{1}{\\tan A}" },
    { label: "Identity 1", latex: "\\sin^2 A + \\cos^2 A = 1" },
    { label: "Identity 2", latex: "1 + \\tan^2 A = \\sec^2 A" },
    { label: "Identity 3", latex: "1 + \\cot^2 A = \\operatorname{cosec}^2 A" },
    { label: "Useful products", latex: "(\\sec A - \\tan A)(\\sec A + \\tan A) = 1, \\qquad (\\operatorname{cosec} A - \\cot A)(\\operatorname{cosec} A + \\cot A) = 1" },
    { label: "tan + cot", latex: "\\tan A + \\cot A = \\frac{1}{\\sin A\\cos A} = \\sec A\\operatorname{cosec} A" },
  ],
  derivations: [
    {
      title: "Using \\(\\sin^2 A + \\cos^2 A = 1\\), prove \\(1 + \\tan^2 A = \\sec^2 A\\) and \\(1 + \\cot^2 A = \\operatorname{cosec}^2 A\\)",
      steps: [
        "Divide \\(\\sin^2 A + \\cos^2 A = 1\\) by \\(\\cos^2 A\\) (\\(A \\neq 90^\\circ\\)): \\(\\tan^2 A + 1 = \\sec^2 A\\).",
        "Divide it by \\(\\sin^2 A\\) (\\(A \\neq 0^\\circ\\)): \\(1 + \\cot^2 A = \\operatorname{cosec}^2 A\\).",
      ],
    },
    {
      title: "Prove \\(\\frac{\\sin\\theta - \\cos\\theta + 1}{\\sin\\theta + \\cos\\theta - 1} = \\frac{1}{\\sec\\theta - \\tan\\theta}\\)",
      steps: [
        "Divide numerator and denominator by \\(\\cos\\theta\\): LHS \\(= \\frac{\\tan\\theta + \\sec\\theta - 1}{\\tan\\theta - \\sec\\theta + 1}\\).",
        "Multiply numerator and denominator by \\((\\tan\\theta - \\sec\\theta)\\). Numerator: \\((\\tan^2\\theta - \\sec^2\\theta) - (\\tan\\theta - \\sec\\theta) = -1 - \\tan\\theta + \\sec\\theta\\).",
        "So LHS \\(= \\frac{-(\\tan\\theta - \\sec\\theta + 1)}{(\\tan\\theta - \\sec\\theta + 1)(\\tan\\theta - \\sec\\theta)} = \\frac{-1}{\\tan\\theta - \\sec\\theta}\\).",
        "\\(= \\frac{1}{\\sec\\theta - \\tan\\theta}\\) = RHS.",
      ],
    },
    {
      title: "Prove \\(\\frac{\\tan\\theta}{1 - \\cot\\theta} + \\frac{\\cot\\theta}{1 - \\tan\\theta} = 1 + \\sec\\theta\\operatorname{cosec}\\theta\\)",
      steps: [
        "Put \\(\\cot\\theta = \\frac{1}{\\tan\\theta}\\); write \\(t = \\tan\\theta\\): LHS \\(= \\frac{t^2}{t - 1} - \\frac{1}{t(t - 1)} = \\frac{t^3 - 1}{t(t - 1)}\\).",
        "Use \\(t^3 - 1 = (t - 1)(t^2 + t + 1)\\): LHS \\(= \\frac{t^2 + t + 1}{t} = 1 + \\tan\\theta + \\cot\\theta\\).",
        "\\(\\tan\\theta + \\cot\\theta = \\frac{\\sin^2\\theta + \\cos^2\\theta}{\\sin\\theta\\cos\\theta} = \\sec\\theta\\operatorname{cosec}\\theta\\). So LHS = RHS.",
      ],
    },
    {
      title: "If \\(\\sec\\theta + \\tan\\theta = m\\), show that \\(\\frac{m^2 - 1}{m^2 + 1} = \\sin\\theta\\)",
      steps: [
        "\\(m = \\frac{1 + \\sin\\theta}{\\cos\\theta}\\), so \\(m^2 = \\frac{(1 + \\sin\\theta)^2}{1 - \\sin^2\\theta} = \\frac{1 + \\sin\\theta}{1 - \\sin\\theta}\\).",
        "\\(\\frac{m^2 - 1}{m^2 + 1} = \\frac{(1 + \\sin\\theta) - (1 - \\sin\\theta)}{(1 + \\sin\\theta) + (1 - \\sin\\theta)} = \\frac{2\\sin\\theta}{2} = \\sin\\theta\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "Prove a trigonometric identity", marks: 3, years: [2026, 2025, 2024, 2023] },
    { topic: "Evaluate an expression with the values at 0°, 30°, 45°, 60°, 90°", marks: 2, years: [2026, 2025, 2024, 2023] },
    { topic: "Find angles from given values, such as \\(\\sin(A + B) = 1\\) and \\(\\cos(A - B) = 1\\)", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "One ratio is given: find the other ratios or an expression in them", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "A condition is given (\\(\\sec\\theta + \\tan\\theta = m\\), \\(\\sin\\theta + \\cos\\theta = p\\)): prove a relation or find a value", years: [2026, 2025, 2024, 2023] },
    { topic: "Simplify with the identities, or pick the true statement (MCQ, assertion-reason)", marks: 1, years: [2026, 2025, 2024, 2023] },
  ],
  mistakes: [
    {
      title: "Writing sin A as sin × A",
      body: "\\(\\sin A\\) is one symbol, a ratio. Also \\(\\sin^2 A = (\\sin A)^2\\), not \\(\\sin(A^2)\\).",
    },
    {
      title: "Wrong form of the identities",
      body: "\\(\\sec^2\\theta = 1 + \\tan^2\\theta\\), not \\(1 - \\tan^2\\theta\\). \\(\\cos^2\\theta - \\sin^2\\theta\\) is not 1.",
    },
    {
      title: "A negative ratio for an acute angle",
      body: "For an acute angle all six ratios are positive. If \\(\\sin\\theta = \\frac{3}{5}\\), then \\(\\cos\\theta = \\frac{4}{5}\\), not \\(-\\frac{4}{5}\\).",
    },
    {
      title: "Working on both sides at once",
      body: "In a proof, simplify one side until it becomes the other. Do not cross-multiply or move terms across the '=' sign.",
    },
    {
      title: "Mixing up the values at 30° and 60°",
      body: "\\(\\sin 30^\\circ = \\cos 60^\\circ = \\frac{1}{2}\\) and \\(\\sin 60^\\circ = \\cos 30^\\circ = \\frac{\\sqrt{3}}{2}\\). \\(\\tan 30^\\circ = \\frac{1}{\\sqrt{3}}\\), \\(\\tan 60^\\circ = \\sqrt{3}\\).",
    },
  ],
};

export default sheet;

import type { SubtopicNote } from "@/app/notes/_types";

export const TRIANGLE_HALF_ANGLE_NOTE: SubtopicNote = {
  subtopicName: "Solution of Triangle — Half-Angle Formulas, Napier's Analogy and Area",
  title: "Solution of a Triangle — Half-Angle Formulas, Napier's Analogy and Area",
  oneLineDefinition:
    "With s the semi-perimeter, the half-angle formulas express sin, cos and tan of A/2 through s and the sides; Napier's analogy links the difference of two angles to the difference of their sides; and Heron's formula gives the area from the sides alone.",
  whyItMatters:
    "24 PYQs. Eleven are half-angle products and sums (tan A/2 · tan C/2, cot B/2 · cot C/2, the sum of cotangents), five are Napier's analogy, five put tan of two half-angles of a right triangle as the roots of a quadratic, and three are area. " +
    "Almost every one is solved by two memorised results, so this is the fastest page of the chapter once they are in hand.",
  concepts: [
    // 1 — half-angle formulas in s
    {
      kind: "formula" as const,
      slug: "cettf-half-angle-formulas",
      name: "Half-Angle Formulas in Terms of s",
      intuition:
        "The half-angle formulas trade angles for lengths. Their products are what the paper asks for, because they collapse: in \\(\\tan\\frac{A}{2}\\tan\\frac{C}{2}\\) the factors \\((s - a)\\) and \\((s - c)\\) cancel and only \\(\\frac{s - b}{s}\\) is left. So a condition on the sides such as \\(a + c = 2b\\) turns straight into a number.",
      definition:
        "- \\(s = \\frac{a + b + c}{2}\\). \\(\\tan\\frac{A}{2} = \\sqrt{\\dfrac{(s - b)(s - c)}{s(s - a)}}\\), \\(\\sin\\frac{A}{2} = \\sqrt{\\dfrac{(s - b)(s - c)}{bc}}\\), \\(\\cos\\frac{A}{2} = \\sqrt{\\dfrac{s(s - a)}{bc}}\\).\n" +
        "- **Products**: \\(\\tan\\frac{A}{2}\\tan\\frac{C}{2} = \\dfrac{s - b}{s}\\), \\(\\cot\\frac{B}{2}\\cot\\frac{C}{2} = \\dfrac{s}{s - a}\\) — the leftover factor is the side NOT named.\n" +
        "- **Sides in A.P.** (\\(a + c = 2b\\)) means \\(s = \\frac{3b}{2}\\), so \\(\\tan\\frac{A}{2}\\tan\\frac{C}{2} = \\frac13\\). Conversely a product of \\(\\frac13\\) means the sides, and the angles, are in A.P.\n" +
        "- **Sum of cotangents**: \\(\\cot\\frac{A}{2} + \\cot\\frac{B}{2} + \\cot\\frac{C}{2} = \\dfrac{s^2}{\\Delta}\\).\n" +
        "- \\(\\cos^2\\frac{C}{2} = \\frac{1 + \\cos C}{2}\\) plus the projection rule gives \\(a\\cos^2\\frac{C}{2} + c\\cos^2\\frac{A}{2} = s\\).\n" +
        "- \\((a + b + c)(b + c - a) = 4s(s - a) = 4bc\\cos^2\\frac{A}{2}\\).",
      formula: {
        label: "Half-angle formulas",
        latex:
          "\\tan\\frac{A}{2}=\\sqrt{\\frac{(s-b)(s-c)}{s(s-a)}} \\qquad \\tan\\frac{A}{2}\\tan\\frac{C}{2}=\\frac{s-b}{s} \\qquad \\cot\\frac{B}{2}\\cot\\frac{C}{2}=\\frac{s}{s-a}",
        symbols: [{ symbol: "s", meaning: "semi-perimeter, (a + b + c)/2" }],
      },
      authoredExample: {
        prompt: "In \\(\\triangle ABC\\), \\(a + b = 3c\\). Find \\(\\tan\\frac{A}{2}\\tan\\frac{B}{2}\\).",
        steps: [
          "\\(2s = a + b + c = 4c\\), so \\(s = 2c\\).",
          "\\(\\tan\\frac{A}{2}\\tan\\frac{B}{2} = \\frac{s - c}{s} = \\frac{c}{2c}\\).",
        ],
        answer: "\\(\\dfrac12\\)",
      },
      selfCheckExample: {
        prompt: "If \\(a, b, c\\) are in A.P., find \\(\\cot\\frac{A}{2}\\cot\\frac{C}{2}\\).",
        steps: ["\\(\\cot\\frac{A}{2}\\cot\\frac{C}{2} = \\frac{s}{s - b}\\) with \\(s = \\frac{3b}{2}\\)."],
        answer: "3",
      },
      practiceSet: [
        { prompt: "\\(\\tan\\frac{A}{2} = \\frac56\\), \\(\\tan\\frac{C}{2} = \\frac25\\). What can you say about \\(a, b, c\\)?", answer: "They are in A.P.", method: "The product is \\(\\frac13 = \\frac{s - b}{s}\\), so \\(2b = a + c\\)." },
        { prompt: "\\(\\cos\\frac{B}{2} = \\sqrt{\\frac{c + a}{2a}}\\). Then \\(a^2 = ?\\)", answer: "\\(b^2 + c^2\\)" },
      ],
      pyqExampleId: "605addde-eec6-4dad-bad1-66338d6b2740",
      traps: [
        {
          title: "Using the side you were given instead of the one left over",
          body: "\\(\\tan\\frac{A}{2}\\tan\\frac{C}{2}\\) leaves \\(s - b\\), not \\(s - a\\) or \\(s - c\\). Name the angle that is missing from the product — its side is the one in the numerator.",
        },
      ],
    },

    // 2 — Napier's analogy
    {
      kind: "formula" as const,
      slug: "cettf-napier-analogy",
      name: "Napier's Analogy — the Difference of Two Angles",
      intuition:
        "When a question gives two sides and the angle between them and asks about the OTHER two angles, the cosine rule is a detour. Napier's analogy goes straight to their half-difference, and \\(\\tan\\frac{B + C}{2} = \\cot\\frac{A}{2}\\) supplies the half-sum.",
      definition:
        "- \\(\\tan\\dfrac{B - C}{2} = \\dfrac{b - c}{b + c}\\cot\\dfrac{A}{2}\\) (and cyclically).\n" +
        "- Since \\(\\frac{A + B}{2} = \\frac{\\pi}{2} - \\frac{C}{2}\\): \\(\\cot\\frac{A + B}{2}\\tan\\frac{A - B}{2} = \\dfrac{a - b}{a + b}\\).\n" +
        "- **Given \\(\\cos(A - B)\\)**: convert to \\(\\tan\\frac{A - B}{2} = \\sqrt{\\frac{1 - \\cos(A - B)}{1 + \\cos(A - B)}}\\), apply Napier to find \\(\\tan\\frac{C}{2}\\), then \\(\\cos C\\) and the cosine rule for \\(c\\).\n" +
        "- \\(\\cot\\frac{A}{2} = \\frac{b + c}{a}\\) means \\(\\cos\\frac{A}{2} = \\cos\\frac{B - C}{2}\\), so \\(A = B - C\\) and \\(B = 90^\\circ\\).",
      formula: {
        label: "Napier's analogy",
        latex: "\\tan\\frac{B-C}{2}=\\frac{b-c}{b+c}\\cot\\frac{A}{2}",
      },
      authoredExample: {
        prompt: "Two sides are \\(3\\) and \\(1\\) and the included angle is \\(60^\\circ\\). Find the difference of the other two angles.",
        steps: [
          "\\(\\tan\\frac{B - C}{2} = \\frac{3 - 1}{3 + 1}\\cot 30^\\circ = \\frac12 \\cdot \\sqrt3 = \\frac{\\sqrt3}{2}\\).",
          "So \\(\\frac{B - C}{2} = \\tan^{-1}\\frac{\\sqrt3}{2}\\).",
        ],
        answer: "\\(B - C = 2\\tan^{-1}\\dfrac{\\sqrt3}{2}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\tan\\frac{B - C}{2} = x\\cot\\frac{A}{2}\\), what is \\(x\\)?",
        steps: ["Napier's analogy, read directly."],
        answer: "\\(\\dfrac{b - c}{b + c}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\cot\\frac{A + B}{2}\\tan\\frac{A - B}{2} = ?\\)", answer: "\\(\\frac{a - b}{a + b}\\)" },
      ],
      pyqExampleId: "dd90d1b0-6b32-49a2-9335-826613b2203e",
    },

    // 3 — right triangle, half-angle tangents as roots
    {
      kind: "formula" as const,
      slug: "cettf-half-angle-roots",
      name: "Right Triangle: tan of the Two Half-Angles as Roots of a Quadratic",
      intuition:
        "In a right triangle the two acute angles add to \\(90^\\circ\\), so their halves add to \\(45^\\circ\\) and \\(\\tan\\) of that sum is 1. Feed the roots' sum and product into the compound-angle formula and the coefficients of the quadratic must satisfy one fixed relation.",
      definition:
        "- If \\(C = 90^\\circ\\): \\(\\frac{A}{2} + \\frac{B}{2} = \\frac{\\pi}{4}\\), so \\(\\dfrac{\\tan\\frac{A}{2} + \\tan\\frac{B}{2}}{1 - \\tan\\frac{A}{2}\\tan\\frac{B}{2}} = 1\\).\n" +
        "- For roots of \\(px^2 + qx + r = 0\\): sum \\(-\\frac{q}{p}\\), product \\(\\frac{r}{p}\\). Then \\(-\\frac{q}{p} = 1 - \\frac{r}{p}\\), i.e. \\(p + q = r\\).\n" +
        "- The letters change from paper to paper (\\(a + b = c\\), \\(a_1 + b_1 = c_1\\)) and so does which vertex is the right angle; the relation is always 'first coefficient plus second equals the third'.",
      formula: {
        label: "The relation",
        latex: "\\tan\\left(\\tfrac{A}{2}+\\tfrac{B}{2}\\right)=1 \\;\\Rightarrow\\; p+q=r \\quad\\text{for } px^2+qx+r=0",
      },
      authoredExample: {
        prompt: "In a right triangle, \\(\\tan\\frac{A}{2}\\) and \\(\\tan\\frac{B}{2}\\) are the roots of \\(6x^2 + qx + 1 = 0\\), \\(C = 90^\\circ\\). Find \\(q\\).",
        steps: ["The relation \\(p + q = r\\) gives \\(6 + q = 1\\)."],
        answer: "\\(q = -5\\)",
      },
      selfCheckExample: {
        prompt: "Check: are \\(\\frac12\\) and \\(\\frac13\\) possible values of \\(\\tan\\frac{A}{2}, \\tan\\frac{B}{2}\\) in a right triangle?",
        steps: ["\\(\\tan\\left(\\frac{A}{2} + \\frac{B}{2}\\right) = \\frac{\\frac12 + \\frac13}{1 - \\frac16} = 1\\)."],
        answer: "Yes",
      },
      pyqExampleId: "04b8a82c-7c93-4a8f-b54c-7c8a937d6438",
    },

    // 4 — area
    {
      kind: "formula" as const,
      slug: "cettf-area-heron",
      name: "Area — Heron's Formula and Its Consequences",
      intuition:
        "Once the three sides are known, the area follows without any angle: Heron's formula. And the area is the bridge back to the angles, since \\(\\Delta = \\frac12 bc\\sin A\\) gives \\(\\sin A = \\frac{2\\Delta}{bc}\\).",
      definition:
        "- \\(\\Delta = \\sqrt{s(s - a)(s - b)(s - c)}\\) = \\(\\frac12 bc\\sin A\\) = \\(\\frac{abc}{4R}\\).\n" +
        "- \\(\\sin A = \\dfrac{2\\Delta}{bc}\\). The 13-14-15 triangle has \\(s = 21\\), \\(\\Delta = 84\\).\n" +
        "- **Sides given through sums** (\\(\\frac{a + b}{7} = \\frac{b + c}{8} = \\frac{c + a}{9} = k\\)): add to get \\(s = 12k\\), subtract to get \\(a = 4k\\), \\(b = 3k\\), \\(c = 5k\\) — a right triangle, area \\(6k^2\\).\n" +
        "- A side ratio that is a Pythagorean triple (5 : 12 : 13) is a right triangle: area \\(= \\frac12\\) × the two shorter sides.",
      formula: {
        label: "Heron's formula",
        latex: "\\Delta=\\sqrt{s(s-a)(s-b)(s-c)}=\\tfrac12\\,bc\\sin A",
      },
      authoredExample: {
        prompt: "Find the area of the triangle with sides 5, 5 and 6.",
        steps: ["\\(s = 8\\); \\(\\Delta = \\sqrt{8 \\cdot 3 \\cdot 3 \\cdot 2} = \\sqrt{144}\\)."],
        answer: "12",
      },
      selfCheckExample: {
        prompt: "Find the area of the triangle with sides 7, 8 and 9, and then \\(\\sin C\\) (opposite 9).",
        steps: [
          "\\(s = 12\\); \\(\\Delta = \\sqrt{12 \\cdot 5 \\cdot 4 \\cdot 3} = \\sqrt{720} = 12\\sqrt5\\).",
          "\\(\\sin C = \\frac{2\\Delta}{ab} = \\frac{24\\sqrt5}{56}\\).",
        ],
        answer: "\\(\\Delta = 12\\sqrt5,\\ \\sin C = \\dfrac{3\\sqrt5}{7}\\)",
      },
      pyqExampleId: "1912f058-a053-4e62-802e-d7e0013e3494",
    },
  ],
  related: [
    { label: "Sine, cosine and projection rules", href: "/notes/mht-cet-maths/trigonometric-functions/cettf-triangle-rules" },
    { label: "Inverse trigonometry — principal values", href: "/notes/mht-cet-maths/trigonometric-functions/cettf-inverse-values" },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const TRIANGLE_RULES_NOTE: SubtopicNote = {
  subtopicName: "Solution of Triangle — Sine, Cosine and Projection Rules",
  title: "Solution of a Triangle — the Sine, Cosine and Projection Rules",
  oneLineDefinition:
    "In a triangle with sides a, b, c opposite angles A, B, C, the sine rule links each side to its opposite angle, the cosine rule links three sides to one angle, and the projection rule writes each side as the sum of the other two sides' projections on it.",
  whyItMatters:
    "45 PYQs, the larger of the two triangle pages. Sixteen are the sine rule (angle ratios to side ratios, circumradius, which triangles exist), twenty-four the cosine rule (an angle from three sides, or an angle from a relation among the sides), and five the projection rule. " +
    "The rule to use is decided by what the stem gives you, so recognising the given data is most of the question.",
  concepts: [
    // 1 — sine rule
    {
      kind: "formula" as const,
      slug: "cettf-sine-rule",
      name: "The Sine Rule and the Circumradius",
      intuition:
        "Every triangle sits in a circle, and each side is a chord of it seen from the opposite vertex. A chord's length is \\(2R\\sin(\\text{angle it subtends})\\), so every side over the sine of its opposite angle is the same number, \\(2R\\). Angles in a ratio therefore give sides in the ratio of their SINES, not of the angles.",
      definition:
        "- \\(\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R\\), \\(R\\) the circumradius. So \\(a : b : c = \\sin A : \\sin B : \\sin C\\).\n" +
        "- **Angles in a ratio**: find the angles first (ratio 2:3:7 of \\(180^\\circ\\) gives \\(30^\\circ, 45^\\circ, 105^\\circ\\)), then take sines. Use \\(\\sin 75^\\circ = \\sin 105^\\circ = \\frac{\\sqrt3 + 1}{2\\sqrt2}\\) and \\(\\sin 15^\\circ = \\frac{\\sqrt3 - 1}{2\\sqrt2}\\).\n" +
        "- **Angles in A.P.** means the middle angle is \\(60^\\circ\\).\n" +
        "- **Circumradius**: \\(R = \\dfrac{a}{2\\sin A}\\). A right triangle has \\(R\\) = half the hypotenuse.\n" +
        "- **Does the triangle exist?** Given \\(a, b, A\\), compute \\(\\sin B = \\frac{b\\sin A}{a}\\). If it exceeds 1 there is no triangle; if it is below 1, check whether both \\(B\\) and \\(180^\\circ - B\\) leave room for \\(A\\).\n" +
        "- **A cevian**: if \\(D\\) divides \\(BC\\) as \\(m : n\\), the sine rule in triangles \\(ABD\\) and \\(ACD\\) gives \\(\\dfrac{\\sin\\angle BAD}{\\sin\\angle CAD} = \\dfrac{m}{n}\\cdot\\dfrac{\\sin B}{\\sin C}\\) — the \\(AD\\) cancels.",
      formula: {
        label: "Sine rule",
        latex: "\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}=2R",
        symbols: [{ symbol: "R", meaning: "radius of the circumcircle" }],
      },
      authoredExample: {
        prompt: "The angles of a triangle are in the ratio 1 : 2 : 3. Find the ratio of its sides.",
        steps: [
          "\\(k + 2k + 3k = 180^\\circ\\), so the angles are \\(30^\\circ, 60^\\circ, 90^\\circ\\).",
          "\\(a : b : c = \\sin 30^\\circ : \\sin 60^\\circ : \\sin 90^\\circ = \\frac12 : \\frac{\\sqrt3}{2} : 1\\).",
          "Multiply by 2.",
        ],
        answer: "\\(1 : \\sqrt3 : 2\\)",
      },
      selfCheckExample: {
        prompt: "In \\(\\triangle ABC\\), \\(a = 6\\) and \\(A = 30^\\circ\\). Find the circumradius.",
        steps: ["\\(2R = \\frac{a}{\\sin A} = \\frac{6}{1/2} = 12\\)."],
        answer: "\\(R = 6\\)",
      },
      practiceSet: [
        { prompt: "Angles in the ratio 4 : 1 : 1. Longest side : perimeter?", answer: "\\(\\sqrt3 : (2 + \\sqrt3)\\)", method: "Angles \\(120^\\circ, 30^\\circ, 30^\\circ\\); sides \\(\\sqrt3 : 1 : 1\\)." },
        { prompt: "\\(a = 5\\), \\(b = 7\\), \\(\\sin A = \\frac34\\). How many triangles?", answer: "None — \\(\\sin B = \\frac{21}{20} > 1\\)." },
        { prompt: "One side is double another and their opposite angles differ by \\(60^\\circ\\). What kind of triangle?", answer: "Right-angled", method: "\\(2\\sin A = \\sin(A + 60^\\circ)\\) gives \\(\\cos A = 0\\)." },
      ],
      pyqExampleId: "78f1bbb4-67f3-480b-a05a-c15cd4398474",
      traps: [
        {
          title: "Putting the sides in the ratio of the angles",
          body: "Angles 2 : 3 : 7 do NOT give sides 2 : 3 : 7. The sides follow the sines — \\(\\sqrt2 : 2 : (\\sqrt3 + 1)\\) here — and the option that copies the angle ratio is the distractor.",
        },
      ],
    },

    // 2 — cosine rule for values
    {
      kind: "formula" as const,
      slug: "cettf-cosine-rule",
      name: "The Cosine Rule — an Angle from Three Sides, a Side from Two and the Included Angle",
      intuition:
        "The cosine rule is Pythagoras with a correction: \\(c^2 = a^2 + b^2\\) exactly when \\(C = 90^\\circ\\), and the \\(-2ab\\cos C\\) term measures how far the angle is from a right angle. A negative cosine means an obtuse angle, and the largest angle always faces the largest side.",
      definition:
        "- \\(c^2 = a^2 + b^2 - 2ab\\cos C\\), and backwards \\(\\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab}\\) (likewise for \\(A\\), \\(B\\)).\n" +
        "- **Use it when** you have three sides, or two sides and the angle BETWEEN them — the cases the sine rule cannot start.\n" +
        "- **Largest or smallest angle**: it is opposite the largest or smallest side, so compute only that one cosine. Sides 3, 5, 7: \\(\\cos C = \\frac{9 + 25 - 49}{30} = -\\frac12\\), \\(C = 120^\\circ\\).\n" +
        "- **Angles in A.P. with two sides known**: \\(B = 60^\\circ\\) gives a quadratic in the third side; keep the root the stem allows.\n" +
        "- **Sides given in a ratio** (\\(\\frac{b + c}{11} = \\frac{c + a}{12} = \\frac{a + b}{13}\\)): add to get \\(a + b + c\\), subtract to get each side as a multiple of \\(k\\), then use the cosine rule.",
      formula: {
        label: "Cosine rule",
        latex: "c^2=a^2+b^2-2ab\\cos C \\qquad \\cos C=\\frac{a^2+b^2-c^2}{2ab}",
      },
      authoredExample: {
        prompt: "Two sides of a triangle are 5 and 8 and the angle between them is \\(60^\\circ\\). Find the third side.",
        steps: [
          "\\(c^2 = 25 + 64 - 2 \\cdot 5 \\cdot 8 \\cdot \\frac12 = 89 - 40 = 49\\).",
        ],
        answer: "\\(c = 7\\)",
      },
      selfCheckExample: {
        prompt: "The sides of a triangle are 7, 8 and 13. Find its largest angle.",
        steps: [
          "The largest angle faces 13: \\(\\cos C = \\frac{49 + 64 - 169}{112} = -\\frac{56}{112} = -\\frac12\\).",
        ],
        answer: "\\(120^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Sides \\(7,\\ 4\\sqrt3,\\ \\sqrt{13}\\). Smallest angle?", answer: "\\(\\frac{\\pi}{6}\\)" },
        { prompt: "\\(a = 4\\), \\(b = 8\\), \\(C = 60^\\circ\\). Find \\(B\\).", answer: "\\(90^\\circ\\)", method: "\\(c^2 = 48\\), then \\(\\cos B = 0\\)." },
      ],
      pyqExampleId: "2823cd19-43aa-4036-b813-a18504607730",
      traps: [
        {
          title: "Computing the angle opposite the wrong side",
          body: "The largest angle is opposite the largest side. Plugging the sides into \\(\\cos C\\) in the order printed, rather than putting the largest side as \\(c\\), gives a positive cosine and an acute answer that looks plausible.",
        },
      ],
    },

    // 3 — cosine rule from a relation among the sides
    {
      kind: "formula" as const,
      slug: "cettf-cosine-rule-relations",
      name: "Reading an Angle off a Relation Among the Sides",
      intuition:
        "Many stems never give numbers: they give an identity like \\((a + b + c)(a + b - c) = 3ab\\) and ask for an angle. Every one of them is the cosine rule in disguise — expand, collect \\(a^2 + b^2 - c^2\\), and divide by \\(2ab\\).",
      definition:
        "- Aim for \\(a^2 + b^2 - c^2 = k\\,ab\\); then \\(\\cos C = \\frac{k}{2}\\).\n" +
        "- \\((a + b + c)(a + b - c) = (a + b)^2 - c^2\\); so \\(= 3ab\\) gives \\(a^2 + b^2 - c^2 = ab\\), \\(C = 60^\\circ\\); \\(= ab\\) would give \\(C = 120^\\circ\\).\n" +
        "- \\(2ac\\cos B = c^2 + a^2 - b^2\\) — watch for it disguised as \\(2ac\\sin\\frac{A - B + C}{2}\\), since \\(\\frac{A - B + C}{2} = \\frac{\\pi}{2} - B\\).\n" +
        "- **Sums of cosines over sides**: \\(\\dfrac{\\cos A}{a} + \\dfrac{\\cos B}{b} + \\dfrac{\\cos C}{c} = \\dfrac{a^2 + b^2 + c^2}{2abc}\\).\n" +
        "- \\((a - b)^2\\cos^2\\frac{C}{2} + (a + b)^2\\sin^2\\frac{C}{2}\\) expands to \\(a^2 + b^2 - 2ab\\cos C = c^2\\).\n" +
        "- A fourth-degree relation (\\(a^4 + b^4 + c^4 = 2a^2c^2 + 2b^2c^2\\)) gives \\((a^2 + b^2 - c^2)^2 = 2a^2b^2\\), so \\(\\cos^2 C = \\frac12\\): \\(C = 45^\\circ\\) or \\(135^\\circ\\); read the options.",
      formula: {
        label: "Target form",
        latex: "a^2+b^2-c^2=k\\,ab \\iff \\cos C=\\frac{k}{2}",
      },
      authoredExample: {
        prompt: "In \\(\\triangle ABC\\), \\((a + b)^2 - c^2 = 2ab\\). Find \\(C\\).",
        steps: [
          "Expand: \\(a^2 + b^2 - c^2 + 2ab = 2ab\\), so \\(a^2 + b^2 - c^2 = 0\\).",
          "\\(\\cos C = 0\\).",
        ],
        answer: "\\(C = 90^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\frac{1}{a + c} + \\frac{1}{b + c} = \\frac{3}{a + b + c}\\), find \\(C\\).",
        steps: [
          "Multiply out: \\((b + c)(a + b + c) + (a + c)(a + b + c) = 3(a + c)(b + c)\\).",
          "This simplifies to \\(a^2 + b^2 - c^2 = ab\\).",
        ],
        answer: "\\(C = 60^\\circ\\)",
      },
      practiceSet: [
        { prompt: "\\(2ac\\sin\\frac{A - B + C}{2} = ?\\)", answer: "\\(c^2 + a^2 - b^2\\)" },
        { prompt: "Sides are the roots of \\(x^3 - 11x^2 + 38x - 40 = 0\\). Find \\(\\sum\\frac{\\cos A}{a}\\).", answer: "\\(\\frac{9}{16}\\)", method: "Roots 2, 4, 5; \\(\\frac{a^2 + b^2 + c^2}{2abc} = \\frac{45}{80}\\)." },
      ],
      pyqExampleId: "053b58b7-9e84-4e77-b0b6-a79bb52707b3",
      traps: [
        {
          title: "Losing the sign of k",
          body: "\\(a^2 + b^2 - c^2 = -ab\\) is an obtuse \\(C = 120^\\circ\\), not \\(60^\\circ\\). The stems that give the sum and product of two sides (\\(x^2 - c^2 = y\\)) lead exactly there.",
        },
      ],
    },

    // 4 — projection rule
    {
      kind: "formula" as const,
      slug: "cettf-projection-rule",
      name: "The Projection Rule",
      intuition:
        "Drop a perpendicular from \\(A\\) to \\(BC\\): the foot splits \\(a\\) into \\(c\\cos B\\) and \\(b\\cos C\\). That is the projection rule, and because it is LINEAR in the sides it clears identities that the quadratic cosine rule would make messy.",
      definition:
        "- \\(a = b\\cos C + c\\cos B\\), \\(b = c\\cos A + a\\cos C\\), \\(c = a\\cos B + b\\cos A\\).\n" +
        "- **Sums like** \\((a + b)\\cos C + (b + c)\\cos A + (c + a)\\cos B\\) regroup into the three projections, giving \\(a + b + c\\).\n" +
        "- **\\(a\\cos B = b\\cos A\\)** means the two projections on \\(c\\) are equal, so the triangle is isosceles with \\(a = b\\).\n" +
        "- **With a free angle**: \\(a\\cos(B - \\theta) + b\\cos(A + \\theta) = \\cos\\theta(a\\cos B + b\\cos A) + \\sin\\theta(a\\sin B - b\\sin A) = c\\cos\\theta\\), because the sine rule makes the second bracket 0.",
      formula: {
        label: "Projection rule",
        latex: "a=b\\cos C+c\\cos B \\qquad b=c\\cos A+a\\cos C \\qquad c=a\\cos B+b\\cos A",
      },
      authoredExample: {
        prompt: "Simplify \\(b\\cos C + c\\cos B + a\\).",
        steps: ["The first two terms are the projection form of \\(a\\)."],
        answer: "\\(2a\\)",
      },
      selfCheckExample: {
        prompt: "If \\((a + b)\\cos C + (b + c)\\cos A + (c + a)\\cos B = 60\\), find the perimeter.",
        steps: ["Regroup: \\((b\\cos C + c\\cos B) + (a\\cos C + c\\cos A) + (a\\cos B + b\\cos A) = a + b + c\\)."],
        answer: "60",
      },
      practiceSet: [
        { prompt: "If \\(a\\cos B = b\\cos A\\), the triangle is?", answer: "Isosceles (\\(a = b\\))" },
      ],
      pyqExampleId: "2a7b2626-7e8d-45aa-8991-85a131f13b2f",
    },
  ],
  related: [
    { label: "Half-angle formulas, Napier's analogy and area", href: "/notes/mht-cet-maths/trigonometric-functions/cettf-triangle-half-angle" },
    { label: "Trigonometric equations", href: "/notes/mht-cet-maths/trigonometric-functions/cettf-equations" },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_TF_TRIANGLE_NOTE: SubtopicNote = {
  subtopicName: "Solution of Triangle: Sine, Cosine and Projection Rules",
  title: "The Sine, Cosine and Projection Rules",
  oneLineDefinition:
    "Three rules link the sides and angles of any triangle: a/sin A = b/sin B = c/sin C = 2R, a² = b² + c² − 2bc cos A, and a = b cos C + c cos B.",
  whyItMatters:
    "29 questions. Ten were set in board papers: find angle B when a = 2, b = 3 and sin A = 2/3 (2020, 2025), find B when c² + a² − b² = ac (2022, 2023), prove the cosine rule (2025), show that the triangle with sides 2, 3, 4 is obtuse (2025), show that a cos A = b cos B makes a triangle right angled or isosceles (2024), prove a(b cos C − c cos B) = b² − c² (2026), simplify (a + b) cos C + (b + c) cos A + (c + a) cos B (2025), and two half-angle values (2026). The textbook adds ratios of sides and longer proofs.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmtf-sine-rule",
      name: "The sine rule and the circumradius",
      intuition:
        "In any triangle a longer side faces a larger angle, and the sine rule makes this exact: each side divided by the sine of the angle opposite it gives the same number, the diameter of the circle through the three vertices. So a side and its opposite angle let you find every other side from its angle.",
      definition:
        "- **Sine rule:** in \\(\\triangle ABC\\) with the usual notation, \\(\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R\\), where \\(R\\) is the circumradius.\n" +
        "- **Proof outline (textbook):** draw \\(AD \\perp BC\\). Then \\(AD = b\\sin C\\), so \\(A(\\triangle ABC) = \\dfrac{1}{2}ab\\sin C\\).\n" +
        "- In the same way \\(A(\\triangle ABC) = \\dfrac{1}{2}ac\\sin B = \\dfrac{1}{2}bc\\sin A\\), so \\(bc\\sin A = ac\\sin B = ab\\sin C\\).\n" +
        "- Divide by \\(abc\\): \\(\\dfrac{\\sin A}{a} = \\dfrac{\\sin B}{b} = \\dfrac{\\sin C}{c}\\).\n" +
        "- For \\(2R\\): draw the diameter \\(AP\\) of the circumcircle. \\(\\angle ABC = \\angle APC\\) (same arc) and \\(\\triangle ACP\\) is right angled at \\(C\\), so \\(\\sin B = \\dfrac{b}{2R}\\).\n" +
        "- **Forms used in proofs:** \\(a = 2R\\sin A\\), \\(b = 2R\\sin B\\), \\(c = 2R\\sin C\\), and \\(a : b : c = \\sin A : \\sin B : \\sin C\\).\n" +
        "- Use it when you know two angles and a side, or two sides and an angle opposite one of them.",
      formula: {
        label: "Sine rule",
        latex: "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R",
        symbols: [
          { symbol: "\\(a, b, c\\)", meaning: "the sides opposite the angles A, B, C" },
          { symbol: "\\(R\\)", meaning: "the circumradius of the triangle" },
        ],
      },
      authoredExample: {
        prompt: "In \\(\\triangle ABC\\), \\(A = 30^\\circ\\), \\(B = 45^\\circ\\) and \\(a = 4\\) cm. Find \\(b\\) and the circumradius \\(R\\).",
        steps: [
          "Given: \\(A = 30^\\circ\\), \\(B = 45^\\circ\\), \\(a = 4\\) cm.",
          "By the sine rule, \\(\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = 2R\\).",
          "\\(\\dfrac{4}{\\sin 30^\\circ} = \\dfrac{4}{1/2} = 8\\), so \\(2R = 8\\) and \\(R = 4\\) cm.",
          "\\(b = 8\\sin 45^\\circ = 8 \\times \\dfrac{1}{\\sqrt{2}} = 4\\sqrt{2}\\) cm.",
        ],
        answer: "\\(b = 4\\sqrt{2}\\) cm (about 5.66 cm) and \\(R = 4\\) cm",
      },
      selfCheckExample: {
        prompt: "In \\(\\triangle ABC\\), \\(\\sin A : \\sin B : \\sin C = 3 : 5 : 7\\). Find the largest angle.",
        steps: [
          "By the sine rule, \\(a : b : c = 3 : 5 : 7\\). Take \\(a = 3k\\), \\(b = 5k\\), \\(c = 7k\\).",
          "The largest angle is \\(C\\): \\(\\cos C = \\dfrac{9 + 25 - 49}{2 \\times 3 \\times 5} = \\dfrac{-15}{30} = -\\dfrac{1}{2}\\).",
        ],
        answer: "\\(C = 120^\\circ\\)",
      },
      practiceSet: [
        { prompt: "In \\(\\triangle ABC\\), \\(b = 6\\) and \\(B = 90^\\circ\\). Find the circumradius.", answer: "\\(2R = \\dfrac{6}{\\sin 90^\\circ} = 6\\), so \\(R = 3\\)" },
        { prompt: "In \\(\\triangle ABC\\), \\(a = 3\\), \\(b = 6\\) and \\(\\sin A = \\dfrac{1}{4}\\). Find \\(\\sin B\\).", answer: "\\(\\sin B = \\dfrac{b\\sin A}{a} = \\dfrac{6 \\times 1/4}{3} = \\dfrac{1}{2}\\)" },
        { prompt: "In \\(\\triangle ABC\\), prove that \\(\\dfrac{a + b}{b} = \\dfrac{\\sin A + \\sin B}{\\sin B}\\).", answer: "\\(\\dfrac{a + b}{b} = \\dfrac{2R\\sin A + 2R\\sin B}{2R\\sin B} = \\dfrac{\\sin A + \\sin B}{\\sin B}\\)" },
      ],
      pyqExampleId: "d34ea3fd-4200-480f-bdfb-8afc936b21cd",
      traps: [
        {
          title: "Two angles from one sine",
          body: "\\(\\sin B = \\dfrac{1}{2}\\) gives \\(B = 30^\\circ\\) or \\(150^\\circ\\). Keep \\(150^\\circ\\) only if the angles of the triangle still add to \\(180^\\circ\\) with room to spare.",
        },
        {
          title: "Writing a = sin A",
          body: "The sine rule gives ratios, not equal values: \\(a = 2R\\sin A\\). Keep the \\(2R\\) (or a constant \\(k\\)) on every line of a proof.",
        },
        {
          title: "Only one case from sin 2A = sin 2B",
          body: "\\(\\sin 2A = \\sin 2B\\) has two cases inside a triangle: \\(2A = 2B\\), or \\(2A = \\pi - 2B\\). Give both and say what each means for the triangle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmtf-cosine-rule",
      name: "The cosine rule and the type of a triangle",
      intuition:
        "The cosine rule is Pythagoras with a correction. When angle A is \\(90^\\circ\\), \\(\\cos A = 0\\) and \\(a^2 = b^2 + c^2\\). A smaller angle makes the opposite side shorter, so \\(2bc\\cos A\\) is taken away; an obtuse angle makes the cosine negative and the side longer.",
      definition:
        "- **Cosine rule:** \\(a^2 = b^2 + c^2 - 2bc\\cos A\\), \\(b^2 = c^2 + a^2 - 2ca\\cos B\\), \\(c^2 = a^2 + b^2 - 2ab\\cos C\\).\n" +
        "- **Angle form:** \\(\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}\\), and in the same way for \\(B\\) and \\(C\\).\n" +
        "- **Proof outline (textbook, by co-ordinates):** take \\(A\\) as the origin and the X-axis along \\(AB\\).\n" +
        "- Then \\(A \\equiv (0, 0)\\), \\(B \\equiv (c, 0)\\) and \\(C \\equiv (b\\cos A, b\\sin A)\\).\n" +
        "- By the distance formula, \\(a^2 = BC^2 = (c - b\\cos A)^2 + (0 - b\\sin A)^2\\).\n" +
        "- \\(= c^2 - 2bc\\cos A + b^2\\cos^2 A + b^2\\sin^2 A = b^2 + c^2 - 2bc\\cos A\\).\n" +
        "- **Type of triangle:** the largest angle is opposite the largest side. If its cosine is negative the triangle is obtuse, if zero it is right angled, if positive every angle is acute.\n" +
        "- Use it to find an angle from three sides, or a side from two sides and the angle between them.",
      formula: {
        label: "Cosine rule",
        latex: "a^2 = b^2 + c^2 - 2bc\\cos A, \\qquad \\cos A = \\frac{b^2 + c^2 - a^2}{2bc}",
      },
      authoredExample: {
        prompt: "In \\(\\triangle ABC\\), \\(a = 7\\), \\(b = 8\\) and \\(c = 13\\). Find the largest angle of the triangle.",
        steps: [
          "The largest side is \\(c = 13\\), so the largest angle is \\(C\\).",
          "By the cosine rule, \\(\\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab}\\).",
          "\\(\\cos C = \\dfrac{49 + 64 - 169}{2 \\times 7 \\times 8} = \\dfrac{-56}{112} = -\\dfrac{1}{2}\\).",
          "\\(0 < C < 180^\\circ\\) and \\(\\cos C = -\\dfrac{1}{2}\\), so \\(C = 120^\\circ\\).",
        ],
        answer: "The largest angle is \\(C = 120^\\circ\\), so the triangle is obtuse",
      },
      selfCheckExample: {
        prompt: "In \\(\\triangle ABC\\), \\(a = 3\\), \\(b = 5\\) and \\(C = 120^\\circ\\). Find \\(c\\).",
        steps: [
          "\\(c^2 = a^2 + b^2 - 2ab\\cos C = 9 + 25 - 2(3)(5)\\left(-\\dfrac{1}{2}\\right)\\).",
          "\\(c^2 = 34 + 15 = 49\\).",
        ],
        answer: "\\(c = 7\\)",
      },
      practiceSet: [
        { prompt: "The sides of a triangle are 5, 6 and 8. Is it acute, right angled or obtuse?", answer: "Obtuse: the angle opposite 8 has cosine \\(\\dfrac{25 + 36 - 64}{60} = -\\dfrac{1}{20}\\)" },
        { prompt: "In \\(\\triangle ABC\\), \\(b^2 + c^2 - a^2 = -bc\\). Find \\(A\\).", answer: "\\(\\cos A = -\\dfrac{1}{2}\\), so \\(A = 120^\\circ\\)" },
        { prompt: "In \\(\\triangle ABC\\), \\(a = 4\\), \\(b = 5\\) and \\(c = 6\\). Find \\(\\cos A\\).", answer: "\\(\\cos A = \\dfrac{25 + 36 - 16}{60} = \\dfrac{3}{4}\\)" },
      ],
      pyqExampleId: "a3fec1d7-d6d6-4d4d-b2ed-c1a8d0c6ec36",
      traps: [
        {
          title: "Proving the rule from the rule",
          body: "A proof must start from the co-ordinates of \\(A\\), \\(B\\) and \\(C\\) and the distance formula, with the figure. Starting from the result itself proves nothing.",
        },
        {
          title: "Testing the wrong angle",
          body: "To decide whether a triangle is obtuse, test the angle opposite the largest side. If that one is acute, so are the other two.",
        },
        {
          title: "Wrong side on the minus",
          body: "In \\(\\cos A\\), the side opposite \\(A\\) is the one subtracted: \\(\\dfrac{b^2 + c^2 - a^2}{2bc}\\). Putting it with a plus sign gives the wrong angle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmtf-projection-rule",
      name: "The projection rule",
      intuition:
        "Drop the altitude from A onto BC. It cuts BC into two pieces, and each piece is the shadow (projection) of one of the other sides. The shadow of AB is \\(c\\cos B\\) and the shadow of AC is \\(b\\cos C\\), and together they make up \\(a\\).",
      definition:
        "- **Projection rule:** \\(a = b\\cos C + c\\cos B\\), \\(b = c\\cos A + a\\cos C\\), \\(c = a\\cos B + b\\cos A\\).\n" +
        "- **Proof outline (textbook):** let the altitude from \\(A\\) meet \\(BC\\) at \\(D\\). \\(BD\\) is the projection of \\(AB\\) on \\(BC\\) and \\(DC\\) the projection of \\(AC\\).\n" +
        "- Case (i), \\(B\\) and \\(C\\) acute: \\(BD = c\\cos B\\), \\(DC = b\\cos C\\), and \\(a = BD + DC = b\\cos C + c\\cos B\\).\n" +
        "- Case (ii), \\(B\\) obtuse: \\(BD = c\\cos(\\pi - B) = -c\\cos B\\) and \\(a = DC - BD = b\\cos C + c\\cos B\\).\n" +
        "- Case (iii), \\(B\\) a right angle: \\(D\\) is \\(B\\), \\(\\cos B = 0\\), and \\(b\\cos C = a\\).\n" +
        "- **Memory hook:** a side equals each of the other two sides times the cosine of the angle it makes with the first side.\n" +
        "- In proofs, multiply out the brackets and regroup the terms into projection pairs.",
      formula: {
        label: "Projection rule",
        latex: "a = b\\cos C + c\\cos B, \\quad b = c\\cos A + a\\cos C, \\quad c = a\\cos B + b\\cos A",
      },
      authoredExample: {
        prompt: "In \\(\\triangle ABC\\), prove that \\(c(a\\cos B - b\\cos A) = a^2 - b^2\\).",
        steps: [
          "By the projection rule, \\(a = b\\cos C + c\\cos B\\), so \\(c\\cos B = a - b\\cos C\\).",
          "Also \\(b = a\\cos C + c\\cos A\\), so \\(c\\cos A = b - a\\cos C\\).",
          "L.H.S. \\(= a(c\\cos B) - b(c\\cos A) = a(a - b\\cos C) - b(b - a\\cos C)\\).",
          "\\(= a^2 - ab\\cos C - b^2 + ab\\cos C = a^2 - b^2 = \\) R.H.S.",
        ],
        answer: "Hence proved: \\(c(a\\cos B - b\\cos A) = a^2 - b^2\\)",
      },
      selfCheckExample: {
        prompt: "In \\(\\triangle ABC\\), \\(a = 4\\), \\(B = 60^\\circ\\) and \\(c\\cos B = 3\\). Find \\(b\\cos C\\).",
        steps: ["By the projection rule, \\(a = b\\cos C + c\\cos B\\).", "\\(b\\cos C = 4 - 3 = 1\\)."],
        answer: "\\(b\\cos C = 1\\)",
      },
      practiceSet: [
        { prompt: "Write the projection rule for side \\(b\\).", answer: "\\(b = c\\cos A + a\\cos C\\)" },
        { prompt: "In a triangle right angled at \\(C\\), what does \\(c = a\\cos B + b\\cos A\\) say?", answer: "The hypotenuse is the sum of the projections of the two legs on it" },
        { prompt: "Using the projection rule, simplify \\(\\dfrac{b - a\\cos C}{c - a\\cos B}\\).", answer: "\\(\\dfrac{c\\cos A}{b\\cos A} = \\dfrac{c}{b}\\)" },
      ],
      pyqExampleId: "2813a677-af18-4faa-a64e-ce76ab5585e7",
      traps: [
        {
          title: "Pairing the wrong cosines",
          body: "In \\(a = b\\cos C + c\\cos B\\), side \\(b\\) goes with angle \\(C\\), where \\(b\\) meets \\(a\\). Writing \\(b\\cos B\\) breaks the rule.",
        },
        {
          title: "Proving only one case",
          body: "When the proof is asked, show the acute case with its figure and say how the obtuse and right-angle cases give the same result.",
        },
      ],
    },
  ],
};

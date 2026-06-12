import type { SubtopicNote } from "@/app/notes/_types";

export const TRIANGLE_IDENTITIES_NOTE: SubtopicNote = {
  subtopicName: "Triangle Identities — A+B+C=π, Half-Angle, and Double-Angle",
  title: "Triangle Identities — A+B+C = π, Half & Double Angle",
  oneLineDefinition:
    "Because the three angles of a triangle add to π, the usual trig identities collapse into special triangle forms — sin(B+C) becomes sin A, and tan A + tan B + tan C becomes their product.",
  whyItMatters:
    "14 PYQs, 6 HARD. Every identity here is a consequence of A + B + C = π. Knowing the handful of derived forms — the half-angle complements, the tan-product identity, and the cos 2A sum — turns intimidating expressions into one-line simplifications.",
  concepts: [
    // angle-sum consequences
    {
      kind: "formula" as const,
      slug: "pt-angle-sum-consequences",
      name: "Consequences of A + B + C = π",
      pyqExampleId: "372da98a-744d-4aeb-8f1d-1225d948723e",
      intuition:
        "Since any one angle is π minus the other two, every sine/cosine of a sum of two angles rewrites in terms of the third — and the half-angle of two angles becomes the complementary half-angle of the third.",
      definition:
        "From \\(A + B + C = \\pi\\):\n" +
        "- \\(\\sin(B+C) = \\sin A\\), \\(\\cos(B+C) = -\\cos A\\).\n" +
        "- \\(\\dfrac{B+C}{2} = \\dfrac{\\pi}{2} - \\dfrac{A}{2}\\), so \\(\\sin\\dfrac{B+C}{2} = \\cos\\dfrac{A}{2}\\) and \\(\\tan\\dfrac{B+C}{2} = \\cot\\dfrac{A}{2}\\).\n" +
        "- Equations like \\(\\sin A = \\cos B + \\cos C\\) are solved by replacing \\(\\sin A = \\sin(B+C)\\) and using sum-to-product.",
      formula: {
        label: "Half-angle complement",
        latex: "\\sin\\dfrac{B+C}{2} = \\cos\\dfrac{A}{2}, \\qquad \\sin(B+C) = \\sin A",
      },
      authoredExample: {
        prompt: "In \\(\\triangle ABC\\), simplify \\(\\cos\\dfrac{A+B}{2}\\).",
        steps: [
          "\\(A + B = \\pi - C\\), so \\(\\dfrac{A+B}{2} = \\dfrac{\\pi}{2} - \\dfrac{C}{2}\\).",
          "\\(\\cos\\!\\left(\\dfrac{\\pi}{2} - \\dfrac{C}{2}\\right) = \\sin\\dfrac{C}{2}\\).",
        ],
        answer: "\\(\\cos\\dfrac{A+B}{2} = \\sin\\dfrac{C}{2}\\).",
      },
      traps: [
        {
          title: "\\(\\sin(B+C) = +\\sin A\\), but \\(\\cos(B+C) = -\\cos A\\)",
          body:
            "Both \\(B+C\\) and \\(A\\) sum to \\(\\pi\\), so \\(\\sin(B+C) = \\sin A\\) (same sign) but \\(\\cos(B+C) = -\\cos A\\) (opposite sign). Forgetting the minus on the cosine is the standard error.",
        },
      ],
    },

    // tan / cot product identity
    {
      kind: "formula" as const,
      slug: "pt-tan-cot-product-identity",
      name: "The tan-Sum = tan-Product Identity",
      pyqExampleId: "971d53bc-014b-44c1-ba4a-69665e9bc294",
      intuition:
        "In a triangle the sum of the three tangents equals their product — a surprising identity that turns a sum into a product (and vice versa). The cotangents satisfy a companion identity.",
      definition:
        "For \\(A + B + C = \\pi\\):\n" +
        "- \\(\\tan A + \\tan B + \\tan C = \\tan A\\,\\tan B\\,\\tan C\\).\n" +
        "- \\(\\cot A\\cot B + \\cot B\\cot C + \\cot C\\cot A = 1\\).\n" +
        "- \\(\\tan\\dfrac{A}{2}\\tan\\dfrac{B}{2} + \\tan\\dfrac{B}{2}\\tan\\dfrac{C}{2} + \\tan\\dfrac{C}{2}\\tan\\dfrac{A}{2} = 1\\).\n" +
        "Sign reading: \\(\\cot A\\cot B\\cot C > 0\\) forces all angles acute (acute triangle).",
      formula: {
        label: "tan sum = tan product",
        latex: "\\tan A + \\tan B + \\tan C = \\tan A\\,\\tan B\\,\\tan C",
      },
      authoredExample: {
        prompt: "In \\(\\triangle ABC\\), \\(\\tan A + \\tan B + \\tan C = 6\\). Find \\(\\cot A\\cot B\\cot C\\).",
        steps: [
          "By the identity, \\(\\tan A\\tan B\\tan C = \\tan A + \\tan B + \\tan C = 6\\).",
          "\\(\\cot A\\cot B\\cot C = \\dfrac{1}{\\tan A\\tan B\\tan C} = \\dfrac{1}{6}\\).",
        ],
        answer: "\\(\\dfrac{1}{6}\\).",
      },
      traps: [
        {
          title: "The sum equals the PRODUCT, only in a triangle",
          body:
            "\\(\\tan A + \\tan B + \\tan C = \\tan A\\tan B\\tan C\\) holds because \\(A+B+C=\\pi\\). It is NOT a general identity — don't apply it unless the three angles are a triangle's angles.",
        },
      ],
    },

    // cos2A / sin^2 identities
    {
      kind: "formula" as const,
      slug: "pt-cos2-sin2-identities",
      name: "cos 2A Sums & Right-Angle Detection",
      pyqExampleId: "ebdff27e-1d77-4b18-beaf-91e96aab40a5",
      intuition:
        "Sums of cos 2A or sin²A over the three angles collapse to clean values that signal the triangle's type — in particular, a specific value of these sums means one angle is exactly 90°.",
      definition:
        "Standard triangle identities:\n" +
        "- \\(\\cos 2A + \\cos 2B + \\cos 2C = -1 - 4\\cos A\\cos B\\cos C\\).\n" +
        "- \\(\\sin^2 A + \\sin^2 B + \\sin^2 C = 2 + 2\\cos A\\cos B\\cos C\\); it **equals 2 iff the triangle is right-angled** (one cosine is 0).\n" +
        "- Equivalently \\(\\cos^2 A + \\cos^2 B + \\cos^2 C = 1\\) iff right-angled. A value of \\(\\cos 2A + \\cos 2B + \\cos 2C = -1\\) forces \\(\\cos A\\cos B\\cos C = 0\\).",
      formula: {
        label: "Right-angle signature",
        latex: "\\sin^2 A + \\sin^2 B + \\sin^2 C = 2 \\iff \\text{right-angled}",
      },
      authoredExample: {
        prompt: "If \\(\\triangle ABC\\) has \\(\\sin^2 A + \\sin^2 B + \\sin^2 C = 2\\), what can you conclude?",
        steps: [
          "Use \\(\\sin^2 A + \\sin^2 B + \\sin^2 C = 2 + 2\\cos A\\cos B\\cos C\\).",
          "Setting it to 2 gives \\(\\cos A\\cos B\\cos C = 0\\), so one cosine is 0 — that angle is \\(90^\\circ\\).",
        ],
        answer: "The triangle is right-angled.",
      },
    },

    // half-angle + sum-to-product
    {
      kind: "formula" as const,
      slug: "pt-half-angle-and-sum-product",
      name: "Half-Angle Formulas & Sum-to-Product",
      pyqExampleId: "dee74cf1-dbc8-4e6e-9003-05ff046a226d",
      intuition:
        "The half-angle formulas express tan(A/2) through the sides and the inradius; sum-to-product turns cos A + cos B (and similar) into a product that simplifies using A + B + C = π. Both are workhorses for the harder identity questions.",
      definition:
        "- **Half-angle (sides):** \\(\\tan\\dfrac{A}{2} = \\dfrac{r}{s-a} = \\sqrt{\\dfrac{(s-b)(s-c)}{s(s-a)}}\\), and \\(\\sin\\dfrac{A}{2} = \\sqrt{\\dfrac{(s-b)(s-c)}{bc}}\\).\n" +
        "- **Sum-to-product:** \\(\\cos A + \\cos B = 2\\cos\\dfrac{A+B}{2}\\cos\\dfrac{A-B}{2}\\); in a triangle \\(\\cos\\dfrac{A+B}{2} = \\sin\\dfrac{C}{2}\\).\n" +
        "- **Product-to-sum:** \\(\\sin X\\sin Y = \\tfrac12[\\cos(X-Y) - \\cos(X+Y)]\\), useful for \\(\\sin\\tfrac{A}{2}\\sin\\tfrac{3A}{2}\\)-type expressions.\n" +
        "- Note \\(\\tan\\dfrac{B}{2} + \\cot\\dfrac{B}{2} = \\dfrac{2}{\\sin B}\\).",
      formula: {
        label: "Half-angle tangent",
        latex: "\\tan\\dfrac{A}{2} = \\dfrac{r}{s-a} = \\sqrt{\\dfrac{(s-b)(s-c)}{s(s-a)}}",
      },
      authoredExample: {
        prompt: "In \\(\\triangle ABC\\) with \\(C = 60^\\circ\\), simplify \\(\\dfrac{\\cos A + \\cos B}{\\cos\\frac{A-B}{2}}\\).",
        steps: [
          "Sum-to-product: \\(\\cos A + \\cos B = 2\\cos\\dfrac{A+B}{2}\\cos\\dfrac{A-B}{2}\\).",
          "Since \\(C = 60^\\circ\\), \\(A + B = 120^\\circ\\), so \\(\\cos\\dfrac{A+B}{2} = \\cos 60^\\circ = \\tfrac12\\).",
          "The expression is \\(2\\cdot\\tfrac12\\cos\\dfrac{A-B}{2} \\div \\cos\\dfrac{A-B}{2}\\).",
        ],
        answer: "\\(1\\).",
      },
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const TRIANGLES_POT_NOTE: SubtopicNote = {
  subtopicName: "Solution of Triangles",
  title: "Solution of Triangles",
  oneLineDefinition:
    "Relating the sides and angles of a triangle through the sine and cosine rules, and its area to the radii of its incircle and circumcircle.",
  whyItMatters:
    "Eleven PYQs, six of them multiple choice, from 2021 to 2024. Five solve a triangle with the sine or cosine rule; three turn a condition on the angles into one on the sides; three use the area, the inradius and the circumradius together. Three ideas cover the page.",
  concepts: [
    // C1 — sine and cosine rules
    {
      kind: "formula" as const,
      slug: "jpot-sine-cosine",
      name: "The sine and cosine rules",
      intuition:
        "The sine rule links each side with the angle opposite it and with the circumradius; the cosine rule finds an angle from three sides, or the third side from two sides and the angle between them. Given a side and an angle that is not between the known sides, the cosine rule gives a quadratic, and both roots may need checking.",
      definition:
        "- Sine rule: \\(\\frac a{\\sin A}=\\frac b{\\sin B}=\\frac c{\\sin C}=2R\\).\n" +
        "- Cosine rule: \\(a^2=b^2+c^2-2bc\\cos A\\).\n" +
        "- Angles add to \\(\\pi\\); the larger side faces the larger angle.",
      formula: {
        label: "Cosine rule",
        latex: "a^2=b^2+c^2-2bc\\cos A",
      },
      authoredExample: {
        prompt: "In a triangle, \\(b=5\\), \\(c=8\\) and \\(A=60^\\circ\\). Find \\(a\\).",
        steps: [
          "\\(a^2=25+64-2\\cdot5\\cdot8\\cdot\\frac12=49\\).",
        ],
        answer: "\\(a=7\\).",
      },
      selfCheckExample: {
        prompt: "A triangle has \\(a=6\\) and \\(A=30^\\circ\\). Find its circumradius.",
        steps: [
          "\\(2R=\\frac{6}{\\sin30^\\circ}=12\\).",
        ],
        answer: "\\(R=6\\).",
      },
      practiceSet: [
        { prompt: "\\(\\cos A\\) for sides \\(a=7,b=5,c=8\\)?", answer: "\\(\\frac12\\)" },
        { prompt: "\\(b\\) if \\(a=4\\), \\(A=30^\\circ\\), \\(B=90^\\circ\\)?", answer: "\\(8\\)" },
        { prompt: "Largest angle of the triangle 3, 5, 7?", answer: "\\(120^\\circ\\)" },
        { prompt: "\\(2R\\) if \\(c=10\\), \\(C=90^\\circ\\)?", answer: "\\(10\\)" },
      ],
      pyqExampleId: "f5fc071a-374e-44ab-83ec-08cb30e574e6", // 2024 — a side from the cosine rule, then cos 3C
      traps: [
        {
          title: "Check both roots",
          body: "The cosine rule for an unknown side next to a known angle is a quadratic. A negative root is impossible, but two positive roots can both be triangles; the question's other data decide.",
        },
      ],
    },

    // C2 — conditions on the angles
    {
      kind: "formula" as const,
      slug: "jpot-angle-conditions",
      name: "Conditions on the angles",
      intuition:
        "A condition like \\(\\cos A+2\\cos B+\\cos C=2\\) or \\(\\frac{\\sin A}{\\sin B}=\\dots\\) becomes a condition on the sides once each sine is replaced by the side over \\(2R\\), or each cosine by its cosine-rule expression. The half-angle formulas turn products of \\(\\sin\\frac A2\\) into the inradius.",
      definition:
        "- \\(\\sin A=\\frac a{2R}\\), and similarly for \\(B,C\\).\n" +
        "- \\(\\cos A+\\cos B+\\cos C=1+\\frac rR\\).\n" +
        "- \\(\\sin\\frac A2\\sin\\frac B2\\sin\\frac C2=\\frac r{4R}\\).\n" +
        "- Projection rule: \\(a=b\\cos C+c\\cos B\\).",
      formula: {
        label: "Sines to sides",
        latex: "\\sin A=\\frac{a}{2R}",
      },
      authoredExample: {
        prompt: "In a triangle, \\(a\\cos A=b\\cos B\\) with \\(a\\neq b\\). What kind of triangle is it?",
        steps: [
          "\\(\\sin A\\cos A=\\sin B\\cos B\\), so \\(\\sin2A=\\sin2B\\) and \\(2A=\\pi-2B\\).",
        ],
        answer: "Right-angled at \\(C\\).",
      },
      selfCheckExample: {
        prompt: "For an equilateral triangle, find \\(\\cos A+\\cos B+\\cos C\\) and hence \\(\\frac rR\\).",
        steps: [
          "\\(3\\cdot\\frac12=1+\\frac rR\\).",
        ],
        answer: "\\(\\frac32\\); \\(\\frac rR=\\frac12\\).",
      },
      practiceSet: [
        { prompt: "\\(\\frac{\\sin A}{\\sin B}\\) in terms of sides?", answer: "\\(\\frac ab\\)" },
        { prompt: "\\(\\sin\\frac A2\\sin\\frac B2\\sin\\frac C2\\) for an equilateral triangle?", answer: "\\(\\frac18\\)" },
        { prompt: "\\(a=b\\cos C+c\\cos B\\) is the?", answer: "Projection rule" },
        { prompt: "\\(\\sin^2A+\\sin^2B=\\sin^2C\\) means?", answer: "\\(C=90^\\circ\\)" },
      ],
      pyqExampleId: "10a85d4c-f05a-4fd1-ba7a-6dbc25f62598", // 2023 — cos A + 2cos B + cos C = 2 with two sides given
      traps: [
        {
          title: "sin 2A = sin 2B has two cases",
          body: "\\(\\sin2A=\\sin2B\\) gives \\(A=B\\) or \\(A+B=\\frac\\pi2\\). Discard one only when the data rule it out.",
        },
      ],
    },

    // C3 — radii and area
    {
      kind: "formula" as const,
      slug: "jpot-radii-area",
      name: "Area, inradius and circumradius",
      intuition:
        "The area \\(\\Delta\\) connects everything: \\(\\Delta=rs\\) with the semi-perimeter \\(s\\), and \\(\\Delta=\\frac{abc}{4R}\\). Find the sides (or their ratio), the area by Heron's formula or \\(\\frac12bc\\sin A\\), and then \\(r\\) and \\(R\\) follow.",
      definition:
        "- \\(\\Delta=\\frac12bc\\sin A=\\sqrt{s(s-a)(s-b)(s-c)}\\).\n" +
        "- \\(r=\\frac\\Delta s\\), \\(R=\\frac{abc}{4\\Delta}\\).\n" +
        "- In a right triangle, \\(R\\) is half the hypotenuse and \\(r=s-c\\).",
      formula: {
        label: "The two radii",
        latex: "r=\\frac{\\Delta}{s},\\qquad R=\\frac{abc}{4\\Delta}",
      },
      authoredExample: {
        prompt: "Find \\(r\\) and \\(R\\) for the triangle with sides 13, 14, 15.",
        steps: [
          "\\(s=21\\), \\(\\Delta=\\sqrt{21\\cdot8\\cdot7\\cdot6}=84\\).",
          "\\(r=\\frac{84}{21}\\), \\(R=\\frac{13\\cdot14\\cdot15}{336}\\).",
        ],
        answer: "\\(r=4\\), \\(R=\\frac{65}8\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(r\\) and \\(R\\) for the right triangle with sides 6, 8, 10.",
        steps: [
          "\\(\\Delta=24\\), \\(s=12\\); \\(R\\) is half the hypotenuse.",
        ],
        answer: "\\(r=2\\), \\(R=5\\).",
      },
      practiceSet: [
        { prompt: "Area of the equilateral triangle of side 2?", answer: "\\(\\sqrt3\\)" },
        { prompt: "\\(r\\) for sides 3, 4, 5?", answer: "\\(1\\)" },
        { prompt: "\\(R\\) for sides 3, 4, 5?", answer: "\\(\\frac52\\)" },
        { prompt: "\\(\\frac Rr\\) for an equilateral triangle?", answer: "\\(2\\)" },
      ],
      pyqExampleId: "0aeb79d3-4c34-406a-b58f-b23213be6971", // 2022 — R/r from sides in a given ratio
      traps: [
        {
          title: "Semi-perimeter, not perimeter",
          body: "\\(r=\\frac\\Delta s\\) uses half the perimeter. Dividing by the full perimeter halves the inradius.",
        },
      ],
    },
  ],
};

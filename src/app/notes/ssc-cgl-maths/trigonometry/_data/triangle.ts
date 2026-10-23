import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TG_TRIANGLE_NOTE: SubtopicNote = {
  subtopicName: "Ratios in a Right Triangle",
  title: "Ratios in a Right Triangle",
  oneLineDefinition:
    "Given one ratio or two sides, draw the right triangle, find the third side by Pythagoras, and read off any other ratio.",
  whyItMatters:
    "59 questions in the bank, the most of any page in this chapter, and 52 of them are EASY. 20 are from 2025, more than from either earlier year. Fifteen are a fraction in sin θ and cos θ with tan θ given, which one division turns into a single line.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctgrt-sides",
      name: "Ratios from the sides of a right triangle",
      intuition:
        "Before any ratio, decide which side is which. The hypotenuse never changes, but the opposite and adjacent sides swap when you move from one acute angle to the other.",
      definition:
        "- The **hypotenuse** is opposite the right angle. In a triangle PQR right-angled at R, it is PQ, the side that does not touch R.\n" +
        "- The side **opposite** angle A is **adjacent** to the other acute angle. That is why \\(\\sin A = \\cos C\\) when B is the right angle.\n" +
        "- Find a missing side with Pythagoras: \\(\\text{leg}^2 + \\text{leg}^2 = \\text{hypotenuse}^2\\).\n" +
        "- Learn the common **triples** so the third side is instant: 3, 4, 5 · 5, 12, 13 · 8, 15, 17 · 7, 24, 25 · 20, 21, 29 · 9, 40, 41. Any multiple works too (6, 8, 10).\n" +
        "- A side from an angle: opposite \\(= \\text{hypotenuse} \\times \\sin\\theta\\), adjacent \\(= \\text{hypotenuse} \\times \\cos\\theta\\), opposite \\(= \\text{adjacent} \\times \\tan\\theta\\).",
      formula: {
        label: "Sides of a right triangle",
        latex:
          "a^2 + b^2 = c^2 \\qquad \\text{opposite} = \\text{hypotenuse} \\times \\sin\\theta \\qquad \\text{adjacent} = \\text{hypotenuse} \\times \\cos\\theta",
      },
      authoredExample: {
        prompt: "Triangle ABC is right-angled at B, with AB = 8 cm and AC = 17 cm. Find \\(\\sin C\\) and \\(\\tan A\\).",
        steps: [
          "AC is opposite the right angle, so it is the hypotenuse. \\(BC = \\sqrt{17^2 - 8^2} = \\sqrt{225} = 15\\) cm.",
          "At C the opposite side is AB: \\(\\sin C = \\frac{8}{17}\\).",
          "At A the opposite side is BC and the adjacent side is AB: \\(\\tan A = \\frac{15}{8}\\).",
        ],
        answer: "\\(\\sin C = \\frac{8}{17}\\), \\(\\tan A = \\frac{15}{8}\\)",
      },
      selfCheckExample: {
        prompt: "Triangle ABC is right-angled at B, with \\(\\angle A = 30^\\circ\\) and AC = 20 cm. Find BC and AB.",
        steps: [
          "BC is opposite A: \\(BC = 20 \\sin 30^\\circ = 10\\) cm.",
          "AB is adjacent to A: \\(AB = 20 \\cos 30^\\circ = 10\\sqrt{3}\\) cm.",
        ],
        answer: "BC = 10 cm, AB = \\(10\\sqrt{3}\\) cm",
      },
      practiceSet: [
        { prompt: "The two shorter sides of a right triangle are 9 and 40. What is the hypotenuse?", answer: "41" },
        {
          prompt: "A right triangle has hypotenuse 13 and a side of 5 opposite the angle θ. What is \\(\\cos\\theta\\)?",
          answer: "The third side is 12, so \\(\\cos\\theta = \\frac{12}{13}\\)",
        },
        {
          prompt: "A 10 m ladder leans against a wall and makes 60° with the ground. How high up the wall does it reach?",
          answer: "\\(10 \\sin 60^\\circ = 5\\sqrt{3}\\) m",
        },
        {
          prompt: "Triangle PQR is right-angled at Q, with PQ = 7 and QR = 24. What is \\(\\tan R\\)?",
          answer: "\\(\\frac{PQ}{QR} = \\frac{7}{24}\\)",
        },
      ],
      pyqExampleId: "6cbb1c49-03c1-4c13-b969-f651dd8cdde7",
      traps: [
        {
          title: "Using the longest printed number as a leg",
          body:
            "Find the right angle first. The side that does not touch it is the hypotenuse, whatever order the sides are printed in. Subtract squares to get a leg; add squares only to get the hypotenuse.",
        },
        {
          title: "Opposite and adjacent belong to one angle",
          body:
            "In a right triangle, the side opposite one acute angle is adjacent to the other. Rename the sides every time the question moves to a different angle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctgrt-one",
      name: "One ratio gives the other five",
      intuition:
        "A ratio is a fraction of two sides, so you can draw a triangle with exactly those sides. Pythagoras gives the third side, and then every other ratio is a reading from the picture.",
      definition:
        "- \\(\\tan\\theta = \\frac{a}{b}\\): opposite a, adjacent b, hypotenuse \\(\\sqrt{a^2 + b^2}\\).\n" +
        "- \\(\\sin\\theta = \\frac{a}{c}\\): opposite a, hypotenuse c, adjacent \\(\\sqrt{c^2 - a^2}\\). For \\(\\cos\\theta\\), swap opposite and adjacent.\n" +
        "- sec, cosec and cot: turn them over first. \\(\\sec\\theta = \\frac{29}{20}\\) means hypotenuse 29, adjacent 20.\n" +
        "- Letters work the same way: \\(\\sin A = \\frac{m}{n}\\) gives \\(\\cos A = \\frac{\\sqrt{n^2 - m^2}}{n}\\). For \\(\\sin A = \\frac{2x}{1 + x^2}\\) the third side is \\(1 - x^2\\), because \\((1 + x^2)^2 - (2x)^2 = (1 - x^2)^2\\).\n" +
        "- **Fast route:** spot the triple. \\(\\cot\\theta = \\frac{24}{7}\\) is the 7, 24, 25 triangle, so \\(\\sin\\theta = \\frac{7}{25}\\) with no square root to work out.\n" +
        "- **Limit:** the triangle gives positive values, so it answers only for an acute angle. If the angle is in another quadrant, the signs change (Complementary and Allied Angles).",
      formula: {
        label: "From tan θ = a/b",
        latex: "\\sin\\theta = \\frac{a}{\\sqrt{a^2 + b^2}} \\qquad \\cos\\theta = \\frac{b}{\\sqrt{a^2 + b^2}}",
      },
      authoredExample: {
        prompt: "If \\(40\\tan\\theta = 9\\) and θ is acute, find \\(\\cos\\theta - \\sin\\theta\\).",
        steps: [
          "\\(\\tan\\theta = \\frac{9}{40}\\): opposite 9, adjacent 40.",
          "Hypotenuse \\(= \\sqrt{81 + 1600} = \\sqrt{1681} = 41\\) (the 9, 40, 41 triple).",
          "\\(\\cos\\theta - \\sin\\theta = \\frac{40}{41} - \\frac{9}{41} = \\frac{31}{41}\\).",
        ],
        answer: "\\(\\frac{31}{41}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\sin A = \\frac{2}{3}\\) and A is acute, find \\(\\cos A + \\cot A\\).",
        steps: [
          "Opposite 2, hypotenuse 3, so the adjacent side is \\(\\sqrt{9 - 4} = \\sqrt{5}\\).",
          "\\(\\cos A = \\frac{\\sqrt{5}}{3}\\) and \\(\\cot A = \\frac{\\sqrt{5}}{2}\\).",
          "Sum \\(= \\frac{2\\sqrt{5} + 3\\sqrt{5}}{6} = \\frac{5\\sqrt{5}}{6}\\).",
        ],
        answer: "\\(\\frac{5\\sqrt{5}}{6}\\)",
      },
      practiceSet: [
        { prompt: "If \\(\\cos\\theta = \\frac{7}{25}\\) and θ is acute, what is \\(\\tan\\theta\\)?", answer: "\\(\\frac{24}{7}\\)" },
        { prompt: "If \\(\\tan\\theta = \\frac{1}{2}\\) and θ is acute, what is \\(\\sin\\theta\\)?", answer: "\\(\\frac{1}{\\sqrt{5}}\\)" },
        { prompt: "If \\(\\sec\\theta = \\frac{5}{4}\\) and θ is acute, what is \\(\\cot\\theta\\)?", answer: "\\(\\frac{4}{3}\\)" },
        {
          prompt: "If \\(\\sin\\theta = \\frac{p}{q}\\) and θ is acute, what is \\(\\tan\\theta\\)?",
          answer: "\\(\\frac{p}{\\sqrt{q^2 - p^2}}\\)",
        },
      ],
      pyqExampleId: "53db2d58-7309-44b0-bc37-d9698a4f1fa5",
      traps: [
        {
          title: "Using the triangle outside the first quadrant",
          body:
            "If the angle lies between 90° and 360°, the triangle gives only the size of each ratio. In the second quadrant, for example, cos and tan are negative, so the sign must be fixed by the quadrant.",
        },
        {
          title: "Rejecting a correct answer that looks different",
          body:
            "\\(\\frac{8}{\\sqrt{113}}\\) and \\(\\frac{8\\sqrt{113}}{113}\\) are the same number. If no option matches your form, rationalise or un-rationalise before deciding you are wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctgrt-divide",
      name: "Dividing by cos θ when tan θ is given",
      intuition:
        "In a fraction like \\(\\frac{3\\sin\\theta + 2\\cos\\theta}{3\\sin\\theta - 2\\cos\\theta}\\), every term carries exactly one sin or one cos. Divide top and bottom by \\(\\cos\\theta\\) and each sin becomes tan while each cos becomes 1, so the given tan goes straight in.",
      definition:
        "- \\(\\frac{a\\sin\\theta + b\\cos\\theta}{c\\sin\\theta + d\\cos\\theta} = \\frac{a\\tan\\theta + b}{c\\tan\\theta + d}\\).\n" +
        "- If cot is given, divide by \\(\\sin\\theta\\) instead, and the fraction becomes one in \\(\\cot\\theta\\).\n" +
        "- **Fast route:** \\(\\tan\\theta = \\frac{2}{5}\\) means you may put \\(\\sin\\theta = 2\\) and \\(\\cos\\theta = 5\\) straight into the fraction. The common scale cancels, so there is no hypotenuse to find.\n" +
        "- **Backwards:** if the fraction is given equal to a number, cross-multiply, collect the sin terms on one side and the cos terms on the other, and read off tan.\n" +
        "- **Limit:** every term must have the same degree. A lone number, or a tan mixed with sin and cos, breaks the cancellation. Then find sin and cos from the triangle and substitute.",
      formula: {
        label: "Divide through by cos θ",
        latex: "\\frac{a\\sin\\theta + b\\cos\\theta}{c\\sin\\theta + d\\cos\\theta} = \\frac{a\\tan\\theta + b}{c\\tan\\theta + d}",
      },
      authoredExample: {
        prompt: "If \\(4\\tan\\theta = 5\\), find \\(\\frac{8\\sin\\theta - 3\\cos\\theta}{2\\sin\\theta + 5\\cos\\theta}\\).",
        steps: [
          "Divide top and bottom by \\(\\cos\\theta\\): \\(\\frac{8\\tan\\theta - 3}{2\\tan\\theta + 5}\\).",
          "With \\(\\tan\\theta = \\frac{5}{4}\\): numerator \\(10 - 3 = 7\\), denominator \\(\\frac{5}{2} + 5 = \\frac{15}{2}\\).",
          "Value \\(= 7 \\times \\frac{2}{15} = \\frac{14}{15}\\). Fast check with sin = 5, cos = 4: \\(\\frac{40 - 12}{10 + 20} = \\frac{28}{30}\\).",
        ],
        answer: "\\(\\frac{14}{15}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\frac{2\\sin\\theta + 3\\cos\\theta}{\\sin\\theta - \\cos\\theta} = 7\\), find \\(\\tan\\theta\\).",
        steps: [
          "Cross-multiply: \\(2\\sin\\theta + 3\\cos\\theta = 7\\sin\\theta - 7\\cos\\theta\\).",
          "Collect: \\(10\\cos\\theta = 5\\sin\\theta\\), so \\(\\tan\\theta = 2\\).",
        ],
        answer: "2",
      },
      practiceSet: [
        {
          prompt: "If \\(\\tan\\theta = 2\\), find \\(\\frac{\\sin\\theta + \\cos\\theta}{\\sin\\theta - \\cos\\theta}\\).",
          answer: "\\(\\frac{2 + 1}{2 - 1} = 3\\)",
        },
        {
          prompt: "If \\(\\cot\\theta = 3\\), find \\(\\frac{\\cos\\theta + \\sin\\theta}{\\cos\\theta - \\sin\\theta}\\).",
          answer: "Divide by \\(\\sin\\theta\\): \\(\\frac{3 + 1}{3 - 1} = 2\\)",
        },
        {
          prompt: "If \\(\\tan\\theta = \\frac{3}{4}\\), find \\(\\frac{4\\sin\\theta - 3\\cos\\theta}{4\\sin\\theta + 3\\cos\\theta}\\).",
          answer: "\\(\\frac{3 - 3}{3 + 3} = 0\\)",
        },
        { prompt: "If \\(3\\sin\\theta = 4\\cos\\theta\\), what is \\(\\tan\\theta\\)?", answer: "\\(\\frac{4}{3}\\)" },
      ],
      pyqExampleId: "20a2cf8d-4b41-456d-8ada-cdb1afad06c3",
      traps: [
        {
          title: "Dividing when a constant term is present",
          body:
            "\\(\\frac{\\sin\\theta + 1}{\\cos\\theta}\\) does not become a fraction in tan alone, because the 1 turns into \\(\\sec\\theta\\). The trick needs every term to be a single sin or cos.",
        },
        {
          title: "Getting tan after dividing by sin",
          body:
            "Dividing by \\(\\sin\\theta\\) turns \\(\\cos\\theta\\) into \\(\\cot\\theta\\), not tan. Divide by the ratio that leaves the one you were given.",
        },
      ],
    },
  ],
};

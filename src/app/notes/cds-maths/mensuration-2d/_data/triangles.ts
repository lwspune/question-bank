import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_M2_TRIANGLES_NOTE: SubtopicNote = {
  subtopicName: "Areas of Triangles",
  title: "Areas of Triangles",
  oneLineDefinition:
    "Half base times height, half the product of two sides and the sine of the angle between them, and Heron's formula when only the three sides are known.",
  whyItMatters:
    "The busiest page of the chapter, with a question in almost every sitting. Most of them are quick once you pick the right formula for the data given, and the fastest check of all is spotting a right triangle hidden in the three sides.",
  concepts: [
    // C1 — base-height and the sine form
    {
      kind: "formula" as const,
      slug: "cdsm2-base-height-sine",
      name: "Base × height, or two sides and the angle between them",
      intuition:
        "Every triangle formula is \\(\\dfrac12\\times\\text{base}\\times\\text{height}\\) in disguise. When the stem gives two sides and the angle between them, the height is the second side times the sine of that angle.",
      definition:
        "- \\(\\text{Area} = \\dfrac12\\,b\\,h\\), where \\(h\\) is the perpendicular to the chosen base.\n" +
        "- \\(\\text{Area} = \\dfrac12\\,ab\\sin C\\), where \\(C\\) is the angle **between** sides \\(a\\) and \\(b\\).\n" +
        "- In a right triangle either leg is the height for the other, and the altitude to the hypotenuse is \\(\\dfrac{\\text{leg}_1\\times\\text{leg}_2}{\\text{hypotenuse}}\\).\n" +
        "When the foot of an altitude is unknown, write the altitude's square twice (once from each side) and equate.",
      formula: {
        label: "Two sides and the included angle",
        latex: "\\text{Area} = \\tfrac12 bh = \\tfrac12\\,ab\\sin C",
      },
      authoredExample: {
        prompt: "Two sides of a triangle are \\(10\\) cm and \\(9\\) cm and the angle between them is \\(150^\\circ\\). Find the area.",
        steps: [
          "The angle is the one between the two given sides, so use \\(\\dfrac12 ab\\sin C\\).",
          "\\(\\sin 150^\\circ = \\sin 30^\\circ = \\dfrac12\\).",
          "\\(\\text{Area} = \\dfrac12\\times 10\\times 9\\times\\dfrac12 = 22.5\\) cm\\(^2\\).",
        ],
        answer: "\\(22.5\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "A right triangle has legs \\(15\\) cm and \\(20\\) cm. Find the altitude drawn to its hypotenuse.",
        steps: [
          "The hypotenuse is \\(\\sqrt{15^2 + 20^2} = 25\\) cm.",
          "The area is \\(\\dfrac12\\times 15\\times 20 = 150\\) cm\\(^2\\).",
          "Taking the hypotenuse as base, \\(\\dfrac12\\times 25\\times h = 150\\), so \\(h = 12\\) cm.",
        ],
        answer: "\\(12\\) cm.",
      },
      practiceSet: [
        { prompt: "Sides \\(8\\) and \\(5\\) with \\(90^\\circ\\) between them: area?", answer: "\\(20\\)" },
        { prompt: "Sides \\(6\\) and \\(10\\) with \\(30^\\circ\\) between them: area?", answer: "\\(15\\)" },
        { prompt: "Sides \\(4\\) and \\(4\\) with \\(60^\\circ\\) between them: area?", answer: "\\(4\\sqrt3\\)" },
        { prompt: "Base \\(14\\), height \\(9\\): area?", answer: "\\(63\\)" },
      ],
      pyqExampleId: "1f758fb5-011f-40ec-ad01-5e6dcbe7e812", // 2024 (II) — AB = 6, BC = 8, ∠B = 60°
      traps: [
        {
          title: "The angle must be the one between the two sides",
          body:
            "\\(\\dfrac12 ab\\sin C\\) needs \\(C\\) to sit between \\(a\\) and \\(b\\). If the stem gives two angles and one side, find the third angle first and use the side opposite it, as in \\(\\text{Area} = \\dfrac{c^2\\sin A\\sin B}{2\\sin C}\\).",
        },
      ],
    },

    // C2 — Heron
    {
      kind: "formula" as const,
      slug: "cdsm2-heron",
      name: "Heron's formula — three sides only",
      intuition:
        "With three sides and nothing else, Heron's formula gives the area. But first spend two seconds testing for a right triangle: CDS picks triples like \\(5, 12, 13\\) and \\(9, 40, 41\\) on purpose, and then the area is just half the product of the legs.",
      definition:
        "- Semi-perimeter \\(s = \\dfrac{a + b + c}{2}\\).\n" +
        "- \\(\\text{Area} = \\sqrt{s(s - a)(s - b)(s - c)}\\).\n" +
        "- Test first: if \\(a^2 + b^2 = c^2\\), the area is \\(\\dfrac12 ab\\).\n" +
        "- Isosceles with equal sides \\(p\\) and base \\(q\\): the height is \\(\\sqrt{p^2 - \\dfrac{q^2}{4}}\\).\n" +
        "Common triples: \\(3, 4, 5\\); \\(5, 12, 13\\); \\(8, 15, 17\\); \\(7, 24, 25\\); \\(9, 40, 41\\); \\(11, 60, 61\\); \\(20, 21, 29\\).",
      formula: {
        label: "Heron's formula",
        latex: "\\text{Area} = \\sqrt{s(s-a)(s-b)(s-c)}, \\quad s = \\tfrac{a+b+c}{2}",
      },
      authoredExample: {
        prompt: "Find the area of a triangle with sides \\(13\\), \\(14\\) and \\(15\\) cm.",
        steps: [
          "\\(13^2 + 14^2 = 365 \\neq 225\\): not a right triangle, so use Heron.",
          "\\(s = \\dfrac{13 + 14 + 15}{2} = 21\\), and \\(s - a, s - b, s - c = 8, 7, 6\\).",
          "\\(\\text{Area} = \\sqrt{21\\times 8\\times 7\\times 6} = \\sqrt{7056} = 84\\) cm\\(^2\\).",
        ],
        answer: "\\(84\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "Find the area of a triangle with sides \\(10\\), \\(10\\) and \\(12\\) units.",
        steps: [
          "It is isosceles with base \\(12\\), so the height is \\(\\sqrt{10^2 - 6^2} = 8\\).",
          "\\(\\text{Area} = \\dfrac12\\times 12\\times 8 = 48\\). Heron agrees: \\(s = 16\\) and \\(\\sqrt{16\\times 6\\times 6\\times 4} = 48\\).",
        ],
        answer: "\\(48\\) square units.",
      },
      practiceSet: [
        { prompt: "Sides \\(6, 8, 10\\): area?", answer: "\\(24\\)" },
        { prompt: "Sides \\(8, 15, 17\\): area?", answer: "\\(60\\)" },
        { prompt: "Sides \\(5, 5, 6\\): area?", answer: "\\(12\\)" },
        { prompt: "Sides \\(7, 8, 9\\): the value of \\(s\\)?", answer: "\\(12\\)" },
      ],
      pyqExampleId: "19ee9149-8263-4a8d-a0f7-ead5fe876f0f", // 2017 (II) — sides 51, 37, 20
      traps: [
        {
          title: "Two sides plus the perimeter is three sides",
          body:
            "A stem that gives two sides and the perimeter has given all three: subtract to get the third, then test for a right triangle before reaching for Heron.",
        },
      ],
    },

    // C3 — right triangle from perimeter
    {
      kind: "formula" as const,
      slug: "cdsm2-right-from-perimeter",
      name: "A right triangle from its perimeter",
      intuition:
        "You rarely need the two legs separately. The area is \\(\\dfrac{ab}{2}\\), and \\(2ab\\) falls straight out of squaring the sum of the legs: \\((a + b)^2 - (a^2 + b^2)\\).",
      definition:
        "For legs \\(a, b\\) and hypotenuse \\(c\\):\n" +
        "- \\(a + b = \\text{perimeter} - c\\) and \\(a^2 + b^2 = c^2\\).\n" +
        "- \\(2ab = (a + b)^2 - c^2\\), so the area is \\(\\dfrac{(a+b)^2 - c^2}{4}\\).\n" +
        "- Isosceles right triangle with leg \\(L\\): perimeter \\(L(2 + \\sqrt2)\\), area \\(\\dfrac{L^2}{2}\\).\n" +
        "- With the hypotenuse fixed, the area is largest when the triangle is isosceles: \\(\\dfrac{c^2}{4}\\).\n" +
        "- The incircle of a right triangle has radius \\(\\dfrac{a + b - c}{2}\\).",
      formula: {
        label: "Area from the sum of the legs",
        latex: "\\text{Area} = \\frac{ab}{2} = \\frac{(a+b)^2 - c^2}{4}",
      },
      authoredExample: {
        prompt: "A right triangle has perimeter \\(40\\) cm and hypotenuse \\(17\\) cm. Find its area.",
        steps: [
          "The legs add to \\(40 - 17 = 23\\).",
          "\\(2ab = 23^2 - 17^2 = 529 - 289 = 240\\), so \\(ab = 120\\).",
          "The area is \\(\\dfrac{ab}{2} = 60\\) cm\\(^2\\) (the legs are \\(8\\) and \\(15\\)).",
        ],
        answer: "\\(60\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "The hypotenuse of a right triangle is \\(8\\) cm. What is the largest area it can have?",
        steps: [
          "\\(ab \\le \\dfrac{a^2 + b^2}{2} = \\dfrac{64}{2} = 32\\), with equality when \\(a = b\\).",
          "So the area \\(\\dfrac{ab}{2}\\) is at most \\(16\\) cm\\(^2\\).",
        ],
        answer: "\\(16\\) cm\\(^2\\).",
      },
      practiceSet: [
        { prompt: "Perimeter \\(12\\), hypotenuse \\(5\\): area?", answer: "\\(6\\)" },
        { prompt: "Isosceles right triangle with leg \\(6\\): area?", answer: "\\(18\\)" },
        { prompt: "Legs \\(5\\) and \\(12\\): inradius?", answer: "\\(2\\)" },
        { prompt: "Legs add to \\(7\\), hypotenuse \\(5\\): area?", answer: "\\(6\\)" },
      ],
      pyqExampleId: "c555dbd1-2213-483c-8d16-68d637c60d17", // 2021 (I) — perimeter 30, hypotenuse 13
      traps: [
        {
          title: "Don't solve for the legs unless you must",
          body:
            "Solving the quadratic for \\(a\\) and \\(b\\) works but costs a minute. The identity \\(2ab = (a + b)^2 - c^2\\) gives the area in one line.",
        },
      ],
    },

    // C4 — equilateral
    {
      kind: "formula" as const,
      slug: "cdsm2-equilateral",
      name: "The equilateral triangle",
      intuition:
        "One length fixes everything in an equilateral triangle. Learn the three conversions (side to height, side to area, height to area) and every question in this family is a substitution.",
      definition:
        "For side \\(a\\):\n" +
        "- Height (which is also the median and the angle bisector) \\(= \\dfrac{\\sqrt3}{2}a\\).\n" +
        "- Area \\(= \\dfrac{\\sqrt3}{4}a^2\\).\n" +
        "- From the height \\(h\\): area \\(= \\dfrac{h^2}{\\sqrt3}\\).\n" +
        "Areas of equilateral triangles are proportional to the squares of their sides, so \\(n^2\\) small ones tile a big one of \\(n\\) times the side.",
      formula: {
        label: "Equilateral triangle, side a",
        latex: "h = \\tfrac{\\sqrt3}{2}a, \\qquad \\text{Area} = \\tfrac{\\sqrt3}{4}a^2 = \\tfrac{h^2}{\\sqrt3}",
      },
      authoredExample: {
        prompt: "The height of an equilateral triangle is \\(6\\) cm. Find its area.",
        steps: [
          "\\(a = \\dfrac{2h}{\\sqrt3} = \\dfrac{12}{\\sqrt3} = 4\\sqrt3\\).",
          "\\(\\text{Area} = \\dfrac{\\sqrt3}{4}(4\\sqrt3)^2 = \\dfrac{\\sqrt3}{4}\\times 48 = 12\\sqrt3\\) cm\\(^2\\). (Check: \\(\\dfrac{h^2}{\\sqrt3} = \\dfrac{36}{\\sqrt3} = 12\\sqrt3\\).)",
        ],
        answer: "\\(12\\sqrt3\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "Sixteen equilateral tiles of side \\(3\\) cm are joined into one large equilateral triangle. What is its side?",
        steps: [
          "\\(16 = 4^2\\) small triangles make a big one with \\(4\\) times the side.",
          "The side is \\(4\\times 3 = 12\\) cm.",
        ],
        answer: "\\(12\\) cm.",
      },
      practiceSet: [
        { prompt: "Side \\(6\\): area?", answer: "\\(9\\sqrt3\\)" },
        { prompt: "Side \\(10\\): height?", answer: "\\(5\\sqrt3\\)" },
        { prompt: "Area \\(25\\sqrt3\\): side?", answer: "\\(10\\)" },
        { prompt: "Sides \\(5\\) and \\(12\\): side of the equilateral triangle with the sum of their areas?", answer: "\\(13\\)" },
      ],
      pyqExampleId: "eb527484-17db-4278-98b8-793b9a52c443", // 2019 (I) — area from the median l
    },

    // C5 — scaling
    {
      kind: "formula" as const,
      slug: "cdsm2-area-scaling",
      name: "Scale the sides, square the area",
      intuition:
        "Multiply every side by \\(k\\) and the area is multiplied by \\(k^2\\). The triangle formed by joining the midpoints has half the sides, so a quarter of the area.",
      definition:
        "- Similar figures: \\(\\dfrac{\\text{Area}_1}{\\text{Area}_2} = \\left(\\dfrac{\\text{side}_1}{\\text{side}_2}\\right)^2\\).\n" +
        "- The midpoint triangle has \\(\\dfrac14\\) of the area; the trapezium left over has \\(\\dfrac34\\).\n" +
        "- A percentage change of \\(p\\%\\) in every side changes the area by the factor \\(\\left(1 + \\dfrac{p}{100}\\right)^2\\).",
      formula: {
        label: "Similar figures",
        latex: "\\frac{A_1}{A_2} = \\left(\\frac{s_1}{s_2}\\right)^2",
      },
      authoredExample: {
        prompt: "Every side of a triangle is increased by \\(20\\%\\). By what percentage does its area increase?",
        steps: [
          "The sides are multiplied by \\(1.2\\), so the area is multiplied by \\(1.2^2 = 1.44\\).",
          "The increase is \\(44\\%\\).",
        ],
        answer: "\\(44\\%\\).",
      },
      selfCheckExample: {
        prompt: "A triangle has area \\(96\\) cm\\(^2\\). Find the area of the triangle formed by joining the midpoints of its sides.",
        steps: [
          "Its sides are half the original sides, so its area is \\(\\left(\\dfrac12\\right)^2 = \\dfrac14\\) of the original.",
          "\\(\\dfrac{96}{4} = 24\\) cm\\(^2\\).",
        ],
        answer: "\\(24\\) cm\\(^2\\).",
      },
      practiceSet: [
        { prompt: "Sides tripled: area multiplied by?", answer: "\\(9\\)" },
        { prompt: "Sides halved: percentage decrease in area?", answer: "\\(75\\%\\)" },
        { prompt: "Areas in ratio \\(4 : 9\\): sides in ratio?", answer: "\\(2 : 3\\)" },
        { prompt: "Midpoint triangle of an area-\\(60\\) triangle: area?", answer: "\\(15\\)" },
      ],
      pyqExampleId: "a5e2c239-21aa-4f54-937a-428162d37567", // 2025 (II) — midpoint triangle of 11, 60, 61
    },

    // C6 — recover the sides first
    {
      kind: "formula" as const,
      slug: "cdsm2-sides-first",
      name: "Recover the sides first",
      intuition:
        "Some stems hide the sides behind sums, ratios or algebra. Undo the disguise first; the area is then routine, and the sides often turn out to be a right triangle.",
      definition:
        "- Pairwise sums \\(a + b\\), \\(b + c\\), \\(c + a\\): add all three to get \\(2(a + b + c)\\), then subtract each.\n" +
        "- \"\\(b + c\\) exceeds \\(a\\) by \\(k\\)\" gives \\(s - a = \\dfrac{k}{2}\\) directly, which is exactly what Heron needs.\n" +
        "- Altitudes in a ratio: since \\(a\\,h_a = b\\,h_b = c\\,h_c = 2\\times\\text{Area}\\), the sides are in the **inverse** ratio of the altitudes.\n" +
        "- Sides written in letters: look for a coordinate triangle, or substitutions that make \\(s - a\\), \\(s - b\\), \\(s - c\\) simple.",
      formula: {
        label: "Sides from altitudes",
        latex: "a : b : c = \\frac{1}{h_a} : \\frac{1}{h_b} : \\frac{1}{h_c}",
      },
      authoredExample: {
        prompt: "In a triangle, \\(a + b = 15\\), \\(b + c = 17\\) and \\(c + a = 16\\). Find the area.",
        steps: [
          "Adding, \\(2(a + b + c) = 48\\), so \\(a + b + c = 24\\).",
          "Subtracting each sum: \\(c = 9\\), \\(a = 7\\), \\(b = 8\\).",
          "\\(s = 12\\) and \\(\\text{Area} = \\sqrt{12\\times 5\\times 4\\times 3} = \\sqrt{720} = 12\\sqrt5\\).",
        ],
        answer: "\\(12\\sqrt5\\) square units.",
      },
      selfCheckExample: {
        prompt: "The altitudes of a triangle are in the ratio \\(2 : 3 : 6\\). Find the ratio of its sides.",
        steps: [
          "The sides are in the inverse ratio: \\(\\dfrac12 : \\dfrac13 : \\dfrac16\\).",
          "Multiplying by \\(6\\): \\(3 : 2 : 1\\). (Such a triangle cannot exist, since \\(2 + 1 = 3\\): a useful check when the stem is a statement question.)",
        ],
        answer: "\\(3 : 2 : 1\\), which is degenerate.",
      },
      practiceSet: [
        { prompt: "\\(a + b = 7\\), \\(b + c = 9\\), \\(c + a = 8\\): perimeter?", answer: "\\(12\\)" },
        { prompt: "Altitudes \\(1 : 2 : 3\\): sides in ratio?", answer: "\\(6 : 3 : 2\\)" },
        { prompt: "\\(b + c - a = 6\\): the value of \\(s - a\\)?", answer: "\\(3\\)" },
        { prompt: "Sides \\(a, b, c\\) with \\(s - a = 1\\), \\(s - b = 2\\), \\(s - c = 3\\): area?", answer: "\\(6\\)" },
      ],
      pyqExampleId: "b21d1d66-55c7-45b5-b0cb-711a99d5c797", // 2026 (II) — AB + BC exceeds CA by 10 …
      traps: [
        {
          title: "Altitudes and sides go the opposite way",
          body:
            "The longest side has the shortest altitude. Altitudes \\(3 : 5 : 6\\) give sides \\(\\dfrac13 : \\dfrac15 : \\dfrac16 = 10 : 6 : 5\\), not \\(3 : 5 : 6\\).",
        },
      ],
    },
  ],
};

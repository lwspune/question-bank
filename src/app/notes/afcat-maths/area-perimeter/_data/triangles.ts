import type { SubtopicNote } from "@/app/notes/_types";

export const AF_AP_TRIANGLES_NOTE: SubtopicNote = {
  subtopicName: "Triangles",
  title: "Triangles: Base and Height, Right Triangles and Heron's Formula",
  oneLineDefinition:
    "A triangle's area is half its base times its height; when the height is not given, Pythagoras or Heron's formula supplies it from the sides.",
  whyItMatters:
    "Most of the page is EASY, and the questions differ only in what they hand you: a base and height, two legs, or three sides. The marks go when the half is dropped, when a slant side is used as the height, or when Heron's formula is started from the full perimeter instead of half of it.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afap-base-height",
      name: "Half the base times the height",
      intuition:
        "A triangle is half of a rectangle with the same base and height. Draw the rectangle round it and the triangle fills exactly half, whichever way it leans. Any side can be the base, as long as the height is measured at right angles to that side.",
      definition:
        "- **Area** \\(= \\tfrac12 \\times \\text{base} \\times \\text{height}\\), the height perpendicular to the base.\n" +
        "- In a right triangle the two legs are a base and its height.\n" +
        "- The same area gives a height for every side: \\(h = \\dfrac{2A}{\\text{side}}\\).\n" +
        "- **Perimeter** is the sum of the three sides; an equilateral triangle of side \\(a\\) has perimeter \\(3a\\).",
      formula: {
        label: "Area of a triangle",
        latex: "A = \\tfrac12 \\times b \\times h,\\qquad h = \\dfrac{2A}{b}",
      },
      authoredExample: {
        prompt: "A triangle has a base of 14 cm and a height of 9 cm. Find its area, and the height to its 18 cm side.",
        steps: [
          "Area \\(= \\tfrac12 \\times 14 \\times 9 = 63\\) cm².",
          "On the 18 cm side, \\(h = \\dfrac{2 \\times 63}{18} = 7\\) cm.",
        ],
        answer: "63 cm²; 7 cm.",
      },
      selfCheckExample: {
        prompt: "A triangle of area 54 cm² stands on a base of 12 cm. Find its height. Then find the area of a right triangle with legs 7 cm and 10 cm.",
        steps: [
          "\\(h = \\dfrac{2 \\times 54}{12} = 9\\) cm.",
          "The legs are base and height: \\(\\tfrac12 \\times 7 \\times 10 = 35\\) cm².",
        ],
        answer: "9 cm; 35 cm².",
      },
      practiceSet: [
        { prompt: "Find the area of a triangle with base 16 cm and height 5 cm.", answer: "\\(40\\) cm²" },
        { prompt: "Find the perimeter of a triangle with sides 9 cm, 10 cm and 11 cm.", answer: "\\(30\\) cm" },
        { prompt: "A triangle of area 72 cm² has a height of 9 cm. Find its base.", answer: "\\(16\\) cm" },
        { prompt: "Find the area of a right triangle whose legs are 15 cm and 4 cm.", answer: "\\(30\\) cm²" },
      ],
      pyqExampleId: "df5eae74-0066-4ba9-bb31-609f1bd3e299",
      traps: [
        {
          title: "Keep the half",
          body: "A base of 14 and a height of 9 give 63, not 126. The product alone is the rectangle round the triangle.",
        },
        {
          title: "The height is not the slant side",
          body: "In a triangle with a 10 cm slant side and a 7 cm height on a 12 cm base, the area is \\(\\tfrac12 \\times 12 \\times 7 = 42\\). The slant side is not used.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afap-right-triangle",
      name: "Right triangles and Pythagoras",
      intuition:
        "In a right triangle the square on the hypotenuse equals the squares on the two legs together. That single fact turns two sides into the third, and with the legs known the area is half their product.",
      definition:
        "- **Pythagoras:** \\(c^2 = a^2 + b^2\\), where \\(c\\) is the side opposite the right angle.\n" +
        "- Triples worth knowing: 3, 4, 5 · 5, 12, 13 · 8, 15, 17 · 9, 40, 41 · 20, 21, 29, and any multiple of them.\n" +
        "- **Isosceles right triangle** with legs \\(a\\): hypotenuse \\(a\\sqrt 2\\), area \\(\\dfrac{a^2}{2}\\).\n" +
        "- Legs from their difference and the area: \\((a + b)^2 = (a - b)^2 + 4ab\\), where \\(ab = 2 \\times \\text{area}\\).\n" +
        "- Squares drawn on the three sides: the square on the hypotenuse is as big as the other two together.",
      formula: {
        label: "Pythagoras",
        latex: "c^2 = a^2 + b^2,\\qquad (a + b)^2 = (a - b)^2 + 4ab",
      },
      authoredExample: {
        prompt: "The legs of a right triangle differ by 3 cm and its area is 54 cm². Find its perimeter.",
        steps: [
          "\\(ab = 2 \\times 54 = 108\\), so \\((a + b)^2 = 3^2 + 4 \\times 108 = 441\\) and \\(a + b = 21\\).",
          "With \\(a - b = 3\\), the legs are 12 cm and 9 cm.",
          "Hypotenuse \\(= \\sqrt{144 + 81} = 15\\) cm, so the perimeter is \\(12 + 9 + 15 = 36\\) cm.",
        ],
        answer: "36 cm.",
      },
      selfCheckExample: {
        prompt: "An isosceles right triangle has an area of 32 cm². Find its hypotenuse.",
        steps: ["\\(\\dfrac{a^2}{2} = 32\\), so \\(a = 8\\) cm.", "Hypotenuse \\(= 8\\sqrt 2\\) cm."],
        answer: "\\(8\\sqrt 2\\) cm.",
      },
      practiceSet: [
        { prompt: "Find the hypotenuse of a right triangle with legs 8 cm and 15 cm.", answer: "\\(17\\) cm" },
        { prompt: "A right triangle has a hypotenuse of 29 cm and one leg of 20 cm. Find the other leg.", answer: "\\(21\\) cm" },
        { prompt: "An isosceles right triangle has a hypotenuse of \\(6\\sqrt 2\\) cm. Find its area.", answer: "\\(18\\) cm²" },
        {
          prompt: "Squares are drawn outward on the three sides of a right triangle with legs 3 cm and 4 cm. Find the total area of the triangle and the three squares.",
          answer: "\\(56\\) cm²",
          method: "\\(9 + 16 + 25 + 6\\).",
        },
      ],
      pyqExampleId: "66dc0a34-865c-4042-8da7-8193cdc143ed",
      traps: [
        {
          title: "The hypotenuse faces the right angle",
          body: "With sides 9, 12 and 15, the legs are 9 and 12 and the area is 54. Taking 12 and 15 as the base and height gives 90, which is wrong: 15 is opposite the right angle.",
        },
        {
          title: "Legs, not the hypotenuse, in the isosceles case",
          body: "An isosceles right triangle with hypotenuse \\(4\\sqrt 2\\) has legs of 4 and area 8. Squaring the hypotenuse and halving gives 16, twice too much.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afap-heron",
      name: "Heron's formula and the isosceles triangle",
      intuition:
        "When only the three sides are known, Heron's formula gives the area without any height. For an isosceles triangle there is a shorter road: the height from the apex cuts the base in half, so Pythagoras gives it at once.",
      definition:
        "- **Heron:** \\(s = \\dfrac{a + b + c}{2}\\) (half the perimeter), then area \\(= \\sqrt{s(s - a)(s - b)(s - c)}\\).\n" +
        "- Before using it, test for a right triangle: if the sides are a triple, half the product of the legs is quicker.\n" +
        "- **Isosceles** with equal sides \\(a\\) and base \\(b\\): height \\(= \\sqrt{a^2 - \\left(\\tfrac b2\\right)^2}\\), area \\(= \\tfrac12 \\times b \\times\\) height.",
      formula: {
        label: "Heron's formula",
        latex: "A = \\sqrt{s(s - a)(s - b)(s - c)},\\quad s = \\dfrac{a + b + c}{2}",
      },
      authoredExample: {
        prompt: "Find the area of a triangle with sides 9 cm, 10 cm and 17 cm.",
        steps: [
          "\\(s = \\dfrac{36}{2} = 18\\), so \\(s - a, s - b, s - c\\) are 9, 8 and 1.",
          "Area \\(= \\sqrt{18 \\times 9 \\times 8 \\times 1} = \\sqrt{1296} = 36\\) cm².",
        ],
        answer: "36 cm².",
      },
      selfCheckExample: {
        prompt: "An isosceles triangle has equal sides of 26 cm and a base of 20 cm. Find its area.",
        steps: ["The height halves the base: \\(\\sqrt{26^2 - 10^2} = \\sqrt{576} = 24\\) cm.", "Area \\(= \\tfrac12 \\times 20 \\times 24 = 240\\) cm²."],
        answer: "240 cm².",
      },
      practiceSet: [
        { prompt: "Find the area of a triangle with sides 5 cm, 5 cm and 6 cm.", answer: "\\(12\\) cm²", method: "\\(s = 8\\): \\(\\sqrt{8 \\times 3 \\times 3 \\times 2}\\)." },
        { prompt: "Find the area of a triangle with sides 11 cm, 60 cm and 61 cm.", answer: "\\(330\\) cm²", method: "\\(11^2 + 60^2 = 61^2\\), a right triangle." },
        { prompt: "An isosceles triangle has equal sides of 10 cm and a base of 16 cm. Find its area.", answer: "\\(48\\) cm²", method: "The height is 6 cm." },
      ],
      pyqExampleId: "69fa5eca-46dd-41e1-9c5e-d48f044d1a6a",
      traps: [
        {
          title: "s is half the perimeter",
          body: "For sides 9, 10 and 17, \\(s = 18\\). Starting from 36 makes every bracket wrong and the root of a non-square.",
        },
        {
          title: "Halve the base for the height",
          body: "With equal sides 26 and base 20, the height uses half the base: \\(\\sqrt{676 - 100}\\). Using the whole base gives \\(\\sqrt{276}\\), which is not the height.",
        },
      ],
    },
  ],
};

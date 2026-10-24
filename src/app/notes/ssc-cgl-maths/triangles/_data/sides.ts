import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TR_SIDES_NOTE: SubtopicNote = {
  subtopicName: "Sides of a Triangle",
  title: "Sides of a Triangle",
  oneLineDefinition:
    "Any two sides of a triangle add to more than the third, the square on the longest side tells you whether the triangle is right, acute or obtuse, and the altitude to a hypotenuse follows from the area.",
  whyItMatters:
    "Sixteen questions in the bank, 13 EASY and 3 MODERATE. Eight ask which lengths can make a triangle, five use Pythagoras or its converse, and three draw the altitude to the hypotenuse. The fast routes are a short list of triples and one counting rule for whole-number sides.",
  related: [{ label: "Circles: angles in a circle", href: "/notes/ssc-cgl-maths/circles/ssc-ci-angles" }],
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctrsd-inequality",
      name: "Triangle inequality: the third side lies between the difference and the sum",
      intuition:
        "Walking straight from A to C is shorter than walking from A to B and then on to C. If the detour were only as long as the straight path, B would sit on the line AC and there would be no triangle.",
      definition:
        "- **Any two sides add to more than the third.** If they only equal it, the three points lie on one line.\n" +
        "- So when two sides \\(a\\) and \\(b\\) are known, the third side \\(x\\) satisfies \\(|a - b| < x < a + b\\). Both ends are excluded.\n" +
        "- **Counting whole-number values:** the third side runs from \\(|a - b| + 1\\) to \\(a + b - 1\\). That is \\(2 \\times\\) (the smaller side) \\(- 1\\) values. This shortcut needs whole-number sides.\n" +
        "- **Each side is less than half the perimeter**, because it is less than the sum of the other two.\n" +
        "- **The longer side faces the larger angle.** And the perpendicular is the shortest path from a point to a line, so an altitude is shorter than either side from the same corner.\n" +
        "- In an isosceles triangle with two given lengths, try each one as the repeated side and keep the choice that passes the inequality.",
      formula: {
        label: "Range of the third side",
        latex: "|a - b| < x < a + b \\qquad \\text{each side} < \\frac{a + b + c}{2}",
        symbols: [
          { symbol: "a, b", meaning: "the two known sides" },
          { symbol: "x", meaning: "the third side" },
        ],
      },
      authoredExample: {
        prompt: "Two sides of a triangle are 9 cm and 14 cm. Between which values must the third side lie, and how many whole-number lengths can it have?",
        steps: [
          "\\(14 - 9 < x < 14 + 9\\), so \\(5 < x < 23\\).",
          "The whole numbers are 6, 7, ..., 22: that is \\(22 - 6 + 1 = 17\\) values.",
          "Fast route: \\(2 \\times 9 - 1 = 17\\).",
        ],
        answer: "Between 5 cm and 23 cm (ends excluded); 17 whole-number lengths",
      },
      selfCheckExample: {
        prompt: "Two sides of an isosceles triangle are 5 cm and 11 cm. Find its perimeter.",
        steps: [
          "If the third side were 5 cm, then \\(5 + 5 = 10\\), which is not more than 11. No triangle.",
          "So the third side is 11 cm: \\(5 + 11 > 11\\) works, and the perimeter is \\(5 + 11 + 11 = 27\\) cm.",
        ],
        answer: "27 cm",
      },
      practiceSet: [
        { prompt: "Can 4 cm, 7 cm and 12 cm be the sides of a triangle?", answer: "No", method: "\\(4 + 7 = 11\\), which is less than 12." },
        { prompt: "The perimeter of a triangle is 40 cm. Every side must be shorter than what length?", answer: "20 cm" },
        { prompt: "Two sides of a triangle are 8 cm and 3 cm. How many whole-number values can the third side take?", answer: "5 (6, 7, 8, 9 or 10 cm)" },
        { prompt: "In triangle ABC, AB = 7 cm, BC = 9 cm and CA = 5 cm. Which angle is the largest?", answer: "∠A, opposite the longest side BC" },
      ],
      pyqExampleId: "a7ad76e4-d698-40cb-8036-0d8b14201799",
      traps: [
        {
          title: "Including the ends of the range",
          body: "A third side equal to the sum or to the difference of the other two flattens the triangle into a line, so the range uses strict signs at both ends.",
        },
        {
          title: "Counting from the difference itself",
          body: "With sides 4 and 10 the third side runs from 7 to 13, not from 6 to 14. That gives 7 whole-number values, which is 2 × 4 − 1.",
        },
        {
          title: "Repeating the short side of an isosceles triangle",
          body: "With sides 4 cm and 9 cm, the triangle 4, 4, 9 fails because 4 + 4 is less than 9. The repeated side must be the 9 cm one.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctrsd-pythagoras",
      name: "Pythagoras theorem, triples and the acute or obtuse test",
      intuition:
        "In a right triangle the square on the longest side is exactly the two smaller squares put together. Open the right angle wider and the far side grows, so its square becomes too big; close it and the square becomes too small.",
      definition:
        "- **Right angle at C:** \\(c^2 = a^2 + b^2\\), where \\(c\\) is the **hypotenuse**, the longest side, opposite the right angle.\n" +
        "- **Triples to know at sight:** 3, 4, 5 · 5, 12, 13 · 8, 15, 17 · 7, 24, 25 · 20, 21, 29 · 9, 40, 41, and any multiple of one (6, 8, 10 or 9, 12, 15).\n" +
        "- **Converse test,** with \\(c\\) the longest side: \\(c^2 = a^2 + b^2\\) right, \\(c^2 < a^2 + b^2\\) acute, \\(c^2 > a^2 + b^2\\) obtuse.\n" +
        "- **Isosceles triangle:** the perpendicular from the apex cuts the base in half, so (half base)\\(^2\\) + height\\(^2\\) = (equal side)\\(^2\\).\n" +
        "- **Equilateral triangle of side \\(a\\):** height \\(= \\frac{\\sqrt{3}}{2}a\\).\n" +
        "- **A perpendicular PS onto QR** gives two right triangles sharing PS, so \\(PQ^2 - QS^2 = PS^2 = PR^2 - SR^2\\).",
      formula: {
        label: "Pythagoras and the equilateral height",
        latex: "c^2 = a^2 + b^2 \\qquad h = \\frac{\\sqrt{3}}{2}a \\qquad PQ^2 - QS^2 = PR^2 - SR^2",
        symbols: [
          { symbol: "c", meaning: "the hypotenuse" },
          { symbol: "h", meaning: "the height of an equilateral triangle of side a" },
          { symbol: "S", meaning: "the foot of the perpendicular from P to QR" },
        ],
      },
      authoredExample: {
        prompt:
          "The two equal sides of an isosceles triangle are 13 cm each and the base is 10 cm. Find the height to the base, and say whether the triangle is acute, right or obtuse.",
        steps: [
          "The height cuts the base into two halves of 5 cm, so height \\(= \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12\\) cm.",
          "The longest side is 13 cm. Compare \\(13^2 = 169\\) with \\(13^2 + 10^2 = 269\\): the square of the longest side is smaller, so the triangle is acute.",
        ],
        answer: "Height 12 cm; acute",
      },
      selfCheckExample: {
        prompt: "Which of these sets of lengths makes an obtuse-angled triangle: 6, 8, 9 or 6, 8, 11?",
        steps: [
          "\\(6^2 + 8^2 = 100\\).",
          "\\(9^2 = 81 < 100\\), so 6, 8, 9 is acute. \\(11^2 = 121 > 100\\), so 6, 8, 11 is obtuse (and \\(6 + 8 > 11\\), so it is a triangle).",
        ],
        answer: "6, 8, 11",
      },
      practiceSet: [
        { prompt: "Is a triangle with sides 9 cm, 40 cm and 41 cm right-angled?", answer: "Yes", method: "\\(81 + 1600 = 1681 = 41^2\\)." },
        { prompt: "Find the height of an equilateral triangle of side 10 cm.", answer: "\\(5\\sqrt{3}\\) cm" },
        { prompt: "The hypotenuse of a right triangle is 25 cm and one leg is 7 cm. Find the other leg.", answer: "24 cm" },
        {
          prompt: "In triangle ABC, AD is perpendicular to BC with D on BC, AB = 13 cm, BD = 5 cm and DC = 16 cm. Find AC.",
          answer: "20 cm",
          method: "\\(AD = 12\\), then \\(AC = \\sqrt{144 + 256}\\).",
        },
      ],
      pyqExampleId: "2c58f4ec-7715-4831-9c74-b7b816fee615",
      traps: [
        {
          title: "Testing with a side that is not the longest",
          body: "The acute or obtuse test compares the square of the longest side with the sum of the squares of the other two. Any other pairing tells you nothing.",
        },
        {
          title: "Using the whole base in an isosceles triangle",
          body: "The perpendicular from the apex splits the base into two equal halves. Put half the base into Pythagoras, then double the result if the base is asked.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctrsd-altitude",
      name: "The altitude to the hypotenuse of a right triangle",
      intuition:
        "A right triangle's area can be read two ways: half the product of its legs, or half the hypotenuse times the altitude onto it. Setting the two equal gives the altitude, and Pythagoras in the two smaller triangles gives the pieces of the hypotenuse.",
      definition:
        "- Let the right angle be at B and BD the altitude to the hypotenuse AC.\n" +
        "- **Altitude:** \\(\\frac{1}{2} \\times AB \\times BC = \\frac{1}{2} \\times AC \\times BD\\), so \\(BD = \\frac{AB \\times BC}{AC}\\).\n" +
        "- **Each leg squared is its own piece times the hypotenuse:** \\(AB^2 = AD \\times AC\\) and \\(BC^2 = DC \\times AC\\). The piece AD is the one that touches A.\n" +
        "- **The altitude squared is the product of the two pieces:** \\(BD^2 = AD \\times DC\\).\n" +
        "- All of these follow from Pythagoras in triangles ABD and CBD, so use them as a check on each other.\n" +
        "- **A right triangle with its three corners on a circle** has its hypotenuse as a diameter (the angle in a semicircle is 90°).",
      formula: {
        label: "Altitude to the hypotenuse",
        latex: "BD = \\frac{AB \\times BC}{AC} \\qquad AB^2 = AD \\times AC \\qquad BD^2 = AD \\times DC",
        symbols: [
          { symbol: "B", meaning: "the right angle" },
          { symbol: "D", meaning: "the foot of the altitude on the hypotenuse AC" },
        ],
      },
      authoredExample: {
        prompt: "Triangle ABC is right-angled at B with AB = 15 cm and BC = 20 cm. BD is the altitude to AC. Find BD, AD and DC.",
        steps: [
          "\\(AC = \\sqrt{225 + 400} = 25\\) cm (a 3, 4, 5 triple scaled by 5).",
          "\\(BD = \\frac{15 \\times 20}{25} = 12\\) cm.",
          "\\(AD = \\frac{AB^2}{AC} = \\frac{225}{25} = 9\\) cm and \\(DC = \\frac{400}{25} = 16\\) cm.",
          "Check: \\(BD^2 = 144 = 9 \\times 16\\).",
        ],
        answer: "BD = 12 cm, AD = 9 cm, DC = 16 cm",
      },
      selfCheckExample: {
        prompt: "In a triangle right-angled at C, CM is the altitude to the hypotenuse AB, with AM = 4 cm and MB = 9 cm. Find CM and AC.",
        steps: [
          "\\(CM^2 = AM \\times MB = 36\\), so \\(CM = 6\\) cm.",
          "\\(AC^2 = AM \\times AB = 4 \\times 13 = 52\\), so \\(AC = 2\\sqrt{13}\\) cm. Check: \\(AM^2 + CM^2 = 16 + 36 = 52\\).",
        ],
        answer: "CM = 6 cm, AC = 2√13 cm",
      },
      practiceSet: [
        { prompt: "The legs of a right triangle are 9 cm and 12 cm. Find the altitude to the hypotenuse.", answer: "7.2 cm" },
        { prompt: "The altitude to the hypotenuse of a right triangle cuts the hypotenuse into pieces of 2 cm and 8 cm. Find the altitude.", answer: "4 cm" },
        { prompt: "A right triangle has all three corners on a circle of radius 13 cm. How long is its hypotenuse?", answer: "26 cm" },
        {
          prompt: "In a triangle right-angled at B, the altitude BD meets the hypotenuse AC at D, AC = 18 cm and AB = 12 cm. Find AD.",
          answer: "8 cm",
        },
      ],
      pyqExampleId: "a57c64b9-74c7-49b6-a944-d257956fd1d4",
      traps: [
        {
          title: "Taking the radius as the hypotenuse",
          body: "A right triangle with its corners on a circle has the diameter as its hypotenuse. A circle of radius 5 cm gives a hypotenuse of 10 cm.",
        },
        {
          title: "Pairing a leg with the far piece",
          body: "AB² = AD × AC uses the piece AD that touches A. Using DC instead gives BC², the other leg.",
        },
      ],
    },
  ],
};

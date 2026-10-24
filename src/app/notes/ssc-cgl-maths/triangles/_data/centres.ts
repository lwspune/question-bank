import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TR_CENTRES_NOTE: SubtopicNote = {
  subtopicName: "Centres of a Triangle",
  title: "Centres of a Triangle",
  oneLineDefinition:
    "The centroid, incentre, circumcentre and orthocentre are where the medians, angle bisectors, perpendicular bisectors and altitudes meet; the in- and circumradius each have a short formula.",
  whyItMatters:
    "Fifteen questions in the bank, 14 EASY and 1 MODERATE, and nine of them come from the 2025 shifts. Four ask where a centre lies, three ask the angle at the incentre, and eight ask for a radius, nearly always of a right or an equilateral triangle. Know the right-triangle and equilateral formulas cold and these are ten-second questions.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssctrce-locate",
      name: "The four centres of a triangle and where each one lies",
      intuition:
        "Each centre is where three special lines cross. Two of them always stay inside the triangle; the other two move outside when one angle opens past 90°.",
      definition:
        "- **Centroid (G):** where the three medians meet. It divides each median 2 : 1.\n" +
        "- **Incentre (I):** where the three angle bisectors meet. It is the same distance from all three **sides**, so it is the centre of the inscribed circle (the incircle).\n" +
        "- **Circumcentre (O):** where the perpendicular bisectors of the sides meet. It is the same distance from all three **corners**, so it is the centre of the circle through them (the circumcircle).\n" +
        "- **Orthocentre (H):** where the three altitudes meet.\n" +
        "- In an equilateral triangle all four are the same point.",
      table: {
        columns: ["Centre", "Lines that meet there", "Acute triangle", "Right triangle", "Obtuse triangle"],
        rows: [
          { cells: ["Centroid", "the three medians", "inside", "inside", "inside"] },
          { cells: ["Incentre", "the three angle bisectors", "inside", "inside", "inside"] },
          {
            cells: ["Circumcentre", "the perpendicular bisectors of the sides", "inside", "at the midpoint of the hypotenuse", "outside, beyond the longest side"],
            noteAmber: "The circumradius of a right triangle is half its hypotenuse.",
          },
          {
            cells: ["Orthocentre", "the three altitudes", "inside", "at the corner with the right angle", "outside, beyond the obtuse corner"],
            noteAmber: "The two legs of a right triangle are altitudes of each other, so they meet at the right angle.",
          },
        ],
        caption: "Centroid and incentre never leave the triangle; circumcentre and orthocentre do.",
      },
      selfCheckExample: {
        prompt: "Where are the circumcentre and the orthocentre of a triangle whose angles are 30°, 60° and 90°?",
        steps: [
          "The triangle is right-angled.",
          "The circumcentre is the midpoint of the hypotenuse, and the orthocentre is the corner with the 90° angle.",
        ],
        answer: "Circumcentre at the midpoint of the hypotenuse; orthocentre at the right-angle corner",
      },
      practiceSet: [
        { prompt: "Which centre of a triangle is the same distance from all three sides?", answer: "The incentre" },
        { prompt: "Where is the orthocentre of a triangle whose angles are 50°, 60° and 70°?", answer: "Inside the triangle" },
        { prompt: "Which two centres of a triangle can never lie outside it?", answer: "The centroid and the incentre" },
        { prompt: "In which kind of triangle do the centroid, incentre, circumcentre and orthocentre all coincide?", answer: "An equilateral triangle" },
      ],
      pyqExampleId: "7499da81-553f-42a5-bdf9-7fe3693db031",
      traps: [
        {
          title: "Swapping the circumcentre and the orthocentre of a right triangle",
          body: "In a right triangle the circumcentre is the midpoint of the hypotenuse and the orthocentre is the right-angle corner.",
        },
        {
          title: "Making the incentre equidistant from the corners",
          body: "The incentre is the same distance from the three sides. The point the same distance from the three corners is the circumcentre.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctrce-bisectors",
      name: "The angle at the incentre between two angle bisectors",
      intuition:
        "Triangle BIC keeps only half of angles B and C. Half of B + C is 90° minus half of A, so the angle at I is 90° plus half of A.",
      definition:
        "- The bisectors of \\(\\angle B\\) and \\(\\angle C\\) meet at the incentre I. Then **\\(\\angle BIC = 90^\\circ + \\frac{\\angle A}{2}\\)**.\n" +
        "- Why: in triangle BIC, \\(\\angle BIC = 180^\\circ - \\frac{\\angle B + \\angle C}{2} = 180^\\circ - \\frac{180^\\circ - \\angle A}{2}\\).\n" +
        "- **Working back:** \\(\\angle A = 2(\\angle BIC - 90^\\circ)\\).\n" +
        "- The angle a side makes at the incentre is always more than 90°, by half of the angle opposite that side.",
      formula: {
        label: "Angle at the incentre",
        latex: "\\angle BIC = 90^\\circ + \\frac{\\angle A}{2}",
        symbols: [{ symbol: "I", meaning: "the incentre, where the bisectors of angles B and C meet" }],
      },
      authoredExample: {
        prompt: "In triangle ABC, the bisectors of \\(\\angle B\\) and \\(\\angle C\\) meet at I, and \\(\\angle A = 64^\\circ\\). Find \\(\\angle BIC\\).",
        steps: [
          "\\(\\angle BIC = 90^\\circ + 32^\\circ = 122^\\circ\\).",
          "Check: \\(\\angle B + \\angle C = 116^\\circ\\), half of it is \\(58^\\circ\\), and \\(180^\\circ - 58^\\circ = 122^\\circ\\).",
        ],
        answer: "122°",
      },
      selfCheckExample: {
        prompt: "In triangle XYZ, \\(\\angle Y = 48^\\circ\\) and \\(\\angle Z = 76^\\circ\\). The bisectors of \\(\\angle Y\\) and \\(\\angle Z\\) meet at I. Find \\(\\angle YIZ\\).",
        steps: [
          "In triangle YIZ the angles at Y and Z are \\(24^\\circ\\) and \\(38^\\circ\\).",
          "\\(\\angle YIZ = 180^\\circ - 62^\\circ = 118^\\circ\\). Check: \\(\\angle X = 56^\\circ\\) and \\(90^\\circ + 28^\\circ = 118^\\circ\\).",
        ],
        answer: "118°",
      },
      practiceSet: [
        { prompt: "In triangle ABC, \\(\\angle A = 90^\\circ\\) and the bisectors of \\(\\angle B\\) and \\(\\angle C\\) meet at I. Find \\(\\angle BIC\\).", answer: "135°" },
        { prompt: "The bisectors of \\(\\angle B\\) and \\(\\angle C\\) of triangle ABC meet at I, and \\(\\angle BIC = 130^\\circ\\). Find \\(\\angle A\\).", answer: "80°" },
        { prompt: "Can the angle that a side of a triangle makes at the incentre be less than 90°?", answer: "No" },
      ],
      pyqExampleId: "6bfd92cd-cd1d-48fc-921d-8f7e2f0fb691",
      traps: [
        {
          title: "Adding the whole of the opposite angle",
          body: "The angle at the incentre is 90° plus half the opposite angle. With ∠A = 60° it is 120°, not 150°.",
        },
        {
          title: "Using the wrong angle of the triangle",
          body: "The formula for ∠BIC uses ∠A, the corner whose bisector is not involved. Angles B and C have already been halved inside triangle BIC.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctrce-inradius",
      name: "Inradius: the area divided by the semi-perimeter",
      intuition:
        "Join the incentre to the three corners and the triangle splits into three triangles, each with height r on one side as base. Their areas add to r times half the perimeter.",
      definition:
        "- The **inradius** r is the distance from the incentre to any side.\n" +
        "- **Area \\(= r \\times s\\),** where \\(s = \\frac{a + b + c}{2}\\) is the semi-perimeter. So \\(r = \\frac{\\text{Area}}{s} = \\frac{2 \\times \\text{Area}}{a + b + c}\\).\n" +
        "- **Right triangle** with legs \\(a\\), \\(b\\) and hypotenuse \\(c\\): \\(r = \\frac{a + b - c}{2}\\). This comes from the equal tangents from each corner.\n" +
        "- **Equilateral triangle of side \\(a\\):** \\(r = \\frac{a}{2\\sqrt{3}}\\), one third of the height.\n" +
        "- **Working back:** with r and one leg known in a right triangle, write the hypotenuse in terms of the other leg and use Pythagoras.",
      formula: {
        label: "Inradius",
        latex: "r = \\frac{\\text{Area}}{s} \\qquad s = \\frac{a + b + c}{2} \\qquad r_{\\text{right}} = \\frac{a + b - c}{2}",
        symbols: [
          { symbol: "s", meaning: "the semi-perimeter" },
          { symbol: "c", meaning: "the hypotenuse, in the right-triangle form" },
        ],
      },
      authoredExample: {
        prompt: "Find the inradius of a right triangle with legs 8 cm and 15 cm.",
        steps: [
          "Hypotenuse \\(= \\sqrt{64 + 225} = 17\\) cm.",
          "\\(r = \\frac{8 + 15 - 17}{2} = 3\\) cm.",
          "Check: area \\(= 60\\), \\(s = 20\\), and \\(\\frac{60}{20} = 3\\).",
        ],
        answer: "3 cm",
      },
      selfCheckExample: {
        prompt: "A triangle has sides 13 cm, 14 cm and 15 cm and an area of 84 cm². Find its inradius.",
        steps: ["\\(s = \\frac{13 + 14 + 15}{2} = 21\\) cm.", "\\(r = \\frac{84}{21} = 4\\) cm."],
        answer: "4 cm",
      },
      practiceSet: [
        { prompt: "Find the inradius of a right triangle with legs 7 cm and 24 cm.", answer: "3 cm" },
        { prompt: "A triangle has an area of 30 cm² and a perimeter of 30 cm. Find its inradius.", answer: "2 cm" },
        { prompt: "Find the inradius of an equilateral triangle of side \\(6\\sqrt{3}\\) cm.", answer: "3 cm" },
        {
          prompt: "A circle of radius 3 cm is inscribed in triangle ABC, right-angled at C, and AC = 15 cm. Find BC.",
          answer: "8 cm",
          method: "\\(15 + BC - AB = 6\\), so \\(AB = BC + 9\\); then \\((BC + 9)^2 = 225 + BC^2\\).",
        },
      ],
      pyqExampleId: "048a4d79-46ce-4018-864f-228e7ad3e488",
      traps: [
        {
          title: "Dividing the area by the full perimeter",
          body: "The inradius is the area divided by the semi-perimeter. Dividing by the whole perimeter gives half the radius.",
        },
        {
          title: "Adding the hypotenuse in the right-triangle form",
          body: "For a right triangle r = (a + b − c) ÷ 2: the two legs minus the hypotenuse. Adding all three sides gives the semi-perimeter instead.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctrce-circumradius",
      name: "Circumradius of a right, an equilateral and any triangle",
      intuition:
        "The circle through the three corners of a right triangle has the hypotenuse as a diameter, so its radius is half the hypotenuse. For an equilateral triangle the centre is the centroid, two thirds of the way down a median.",
      definition:
        "- The **circumradius** R is the distance from the circumcentre to each corner.\n" +
        "- **Right triangle:** \\(R = \\frac{\\text{hypotenuse}}{2}\\). Check for a Pythagorean triple first.\n" +
        "- **Equilateral triangle of side \\(a\\):** \\(R = \\frac{a}{\\sqrt{3}}\\), two thirds of the height, and \\(r = \\frac{a}{2\\sqrt{3}}\\), so **R : r = 2 : 1**.\n" +
        "- **Any triangle:** \\(R = \\frac{abc}{4 \\times \\text{Area}}\\).",
      formula: {
        label: "Circumradius",
        latex: "R = \\frac{abc}{4 \\times \\text{Area}} \\qquad R_{\\text{right}} = \\frac{\\text{hypotenuse}}{2} \\qquad R_{\\text{equilateral}} = \\frac{a}{\\sqrt{3}}",
        symbols: [{ symbol: "a, b, c", meaning: "the three sides" }],
      },
      authoredExample: {
        prompt: "Find the circumradius of a triangle with sides 20 cm, 21 cm and 29 cm.",
        steps: [
          "\\(20^2 + 21^2 = 400 + 441 = 841 = 29^2\\), so the triangle is right-angled with hypotenuse 29 cm.",
          "\\(R = \\frac{29}{2} = 14.5\\) cm.",
          "Check: area \\(= 210\\), and \\(\\frac{20 \\times 21 \\times 29}{4 \\times 210} = \\frac{12180}{840} = 14.5\\).",
        ],
        answer: "14.5 cm",
      },
      selfCheckExample: {
        prompt: "Find the circumradius and the inradius of an equilateral triangle of side 9 cm.",
        steps: ["\\(R = \\frac{9}{\\sqrt{3}} = 3\\sqrt{3}\\) cm.", "\\(r = \\frac{R}{2} = \\frac{3\\sqrt{3}}{2}\\) cm."],
        answer: "R = 3√3 cm, r = 3√3/2 cm",
      },
      practiceSet: [
        { prompt: "Find the circumradius of a right triangle with legs 9 cm and 12 cm.", answer: "7.5 cm" },
        { prompt: "The circumradius of an equilateral triangle is 8 cm. Find its inradius.", answer: "4 cm" },
        {
          prompt: "A triangle has sides 5 cm, 5 cm and 6 cm and an area of 12 cm². Find its circumradius.",
          answer: "\\(\\frac{25}{8}\\) cm",
          method: "\\(\\frac{5 \\times 5 \\times 6}{4 \\times 12} = \\frac{150}{48}\\).",
        },
      ],
      pyqExampleId: "97d898a6-5442-48fe-be07-888a6ff9e4b6",
      traps: [
        {
          title: "Halving a leg instead of the hypotenuse",
          body: "The circumradius of a right triangle is half the hypotenuse, the longest side. Half of a leg is not a radius of anything here.",
        },
        {
          title: "Swapping R and r in an equilateral triangle",
          body: "The circumradius a ÷ √3 is twice the inradius a ÷ (2√3). The circle through the corners is the bigger one.",
        },
      ],
    },
  ],
};

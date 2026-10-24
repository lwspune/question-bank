import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_CI_EXTERNAL_NOTE: SubtopicNote = {
  subtopicName: "Tangents from an External Point",
  title: "Tangents from an External Point",
  oneLineDefinition:
    "The two tangents from a point outside a circle are equal, and the angle between them and the angle between the radii add to 180 degrees.",
  whyItMatters:
    "Twelve questions in the bank, five EASY and seven MODERATE: a third tangent cutting a pair of tangents, the angle between two tangents, a square of tangents and radii, and the circle inside a right triangle. One idea settles all of them: from any outside point, the two tangent pieces are equal.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiciex-equal",
      name: "Two tangents from one point are equal",
      intuition:
        "Draw tangents PA and PB from an outside point P to a circle with centre O. Triangles OAP and OBP are both right-angled, share the side OP and have equal radii OA and OB, so they are congruent. That makes PA equal to PB.",
      definition:
        "- \\(PA = PB\\): the two tangents from an outside point are **equal**.\n" +
        "- OP **bisects** \\(\\angle APB\\), so \\(\\angle APO = \\angle BPO\\).\n" +
        "- Every outside point gives its own equal pair. When a third tangent cuts the first two, split each long tangent into pieces and match the equal pairs.\n" +
        "- If \\(PA = PB\\) and \\(\\angle APB = 60^\\circ\\), triangle PAB is **equilateral**, so AB = PA.\n" +
        "- A circle inside a quadrilateral ABCD that touches all four sides gives \\(AB + CD = AD + BC\\).",
      formula: {
        label: "Equal tangents",
        latex: "PA = PB \\qquad AB + CD = AD + BC \\text{ (circle touching all four sides)}",
      },
      authoredExample: {
        prompt:
          "From a point P, tangents PA and PB are drawn to a circle. A third tangent touches the circle at R and meets PA at C and PB at D. If PA = 10 cm, find the perimeter of triangle PCD.",
        steps: [
          "From C the two tangents are CA and CR, so CR = CA. From D, DR = DB.",
          "Perimeter \\(= PC + CR + RD + DP = PC + CA + DB + DP\\).",
          "\\(PC + CA = PA = 10\\) and \\(DB + DP = PB = PA = 10\\).",
          "Perimeter \\(= 10 + 10 = 20\\) cm.",
        ],
        answer: "20 cm",
      },
      selfCheckExample: {
        prompt: "PA and PB are tangents from P to a circle, and \\(\\angle APB = 60^\\circ\\). If PA = 9 cm, find the chord AB.",
        steps: [
          "PA = PB, so triangle PAB is isosceles with \\(60^\\circ\\) between the equal sides.",
          "Each base angle is \\(\\frac{180^\\circ - 60^\\circ}{2} = 60^\\circ\\), so the triangle is equilateral.",
          "AB = 9 cm.",
        ],
        answer: "9 cm",
      },
      practiceSet: [
        {
          prompt: "PA and PB are tangents from P to a circle with centre O and radius 5 cm. If OP = 13 cm, find PA + PB.",
          answer: "Each is \\(\\sqrt{169 - 25} = 12\\) cm, so the sum is 24 cm",
        },
        {
          prompt: "CP and CQ are tangents from C to a circle. A third tangent touches the circle at R and meets CQ at B. If CP = 15 cm and CB = 9 cm, find BR.",
          answer: "\\(BQ = 15 - 9 = 6\\) cm, and \\(BR = BQ = 6\\) cm",
        },
        { prompt: "A circle touches all four sides of a quadrilateral ABCD. If AB = 6 cm, BC = 7 cm and CD = 8 cm, find AD.", answer: "\\(6 + 8 = 7 + AD\\), so AD = 7 cm" },
        { prompt: "PA and PB are tangents from P to a circle with centre O. If \\(\\angle APO = 35^\\circ\\), find \\(\\angle APB\\).", answer: "\\(70^\\circ\\)" },
      ],
      pyqExampleId: "192d54bd-900c-47d8-893b-ef9544e4b5f4",
      traps: [
        {
          title: "Matching the wrong pair of pieces",
          body: "When B lies on the tangent CQ and BR is a tangent from B, the equal pair is BR and BQ. Find BQ as CQ minus CB first; BR is not equal to CB.",
        },
        {
          title: "Thinking only the first point gives equal tangents",
          body: "Every outside point has two equal tangents, including the points where a third tangent cuts the first two. Use each of them.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiciex-angle",
      name: "The angle between two tangents and the angle at the centre",
      intuition:
        "The two tangents and the two radii make a four-sided figure. Its angles add to 360 degrees and two of them are right angles, so the angle between the tangents and the angle between the radii share the other 180 degrees.",
      definition:
        "- \\(\\angle OAP = \\angle OBP = 90^\\circ\\), so in quadrilateral OAPB, \\(\\angle APB + \\angle AOB = 180^\\circ\\).\n" +
        "- To get tangents at a chosen angle, draw radii at \\(180^\\circ\\) minus that angle.\n" +
        "- OA = OB, so triangle OAB is isosceles and \\(\\angle OAB = \\angle OBA = \\frac{1}{2}\\angle APB\\).\n" +
        "- If \\(\\angle APB = 90^\\circ\\), OAPB is a **square** of side \\(r\\), and each diagonal (AB and OP) is \\(r\\sqrt{2}\\).",
      formula: {
        label: "Tangents and radii",
        latex: "\\angle APB + \\angle AOB = 180^\\circ",
      },
      authoredExample: {
        prompt: "Two tangents to a circle meet at P at an angle of \\(70^\\circ\\). Find the angle between the radii drawn to the two points of contact.",
        steps: [
          "The quadrilateral of tangents and radii has angles \\(90^\\circ\\), \\(90^\\circ\\), \\(70^\\circ\\) and the angle at the centre.",
          "Angle at the centre \\(= 360^\\circ - 90^\\circ - 90^\\circ - 70^\\circ = 110^\\circ\\).",
        ],
        answer: "\\(110^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "PA and PB are tangents to a circle with centre O, and \\(\\angle AOB = 128^\\circ\\). Find \\(\\angle APB\\).",
        steps: ["\\(\\angle APB = 180^\\circ - 128^\\circ = 52^\\circ\\)."],
        answer: "\\(52^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Tangents PA and PB to a circle with centre O meet at right angles, and the radius is 4 cm. Find OP.", answer: "\\(4\\sqrt{2}\\) cm, the diagonal of a square of side 4 cm" },
        { prompt: "PA and PB are tangents to a circle with centre O. If \\(\\angle APB = 50^\\circ\\), find \\(\\angle OAB\\).", answer: "\\(25^\\circ\\)" },
        { prompt: "PA and PB are tangents to a circle with centre O. If \\(\\angle APB = 40^\\circ\\), find \\(\\angle AOB\\).", answer: "\\(140^\\circ\\)" },
        {
          prompt: "PA and PB are tangents to a circle with centre O, and \\(\\angle AOB = 100^\\circ\\). Find \\(\\angle OAP + \\angle APB\\).",
          answer: "\\(90^\\circ + 80^\\circ = 170^\\circ\\)",
        },
      ],
      pyqExampleId: "56b66f3e-49d9-40f2-b4ee-b0597c0dfe94",
      traps: [
        {
          title: "Taking 90 minus the angle instead of 180 minus it",
          body: "Tangents at \\(40^\\circ\\) need radii at \\(140^\\circ\\), not \\(50^\\circ\\). The two angles add to \\(180^\\circ\\) because the other two corners are right angles.",
        },
        {
          title: "Forgetting the two right angles",
          body: "The angles of OAPB add to \\(360^\\circ\\), and the corners at the points of contact are \\(90^\\circ\\) each. Subtract both before finding the last angle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiciex-incircle",
      name: "The circle inside a triangle",
      intuition:
        "The circle inside a triangle touches all three sides, so each corner is an outside point with two equal tangents. In a right triangle the corner at the right angle makes a small square with the centre, which gives the radius at once.",
      definition:
        "- The **incircle** touches all three sides. From each corner the two tangent pieces are equal.\n" +
        "- In a right triangle with legs \\(a\\), \\(b\\) and hypotenuse \\(c\\), the tangents from the right-angle corner are \\(r\\) each. The other pieces are \\(a - r\\) and \\(b - r\\), and they make up the hypotenuse: \\(c = (a - r) + (b - r)\\).\n" +
        "- For any triangle: \\(r = \\dfrac{\\text{Area}}{s}\\), where \\(s\\) is **half** the perimeter.\n" +
        "- The perimeter is twice the sum of the three different tangent lengths.",
      formula: {
        label: "Radius of the incircle",
        latex: "r = \\frac{a + b - c}{2} \\text{ (right triangle)} \\qquad r = \\frac{\\text{Area}}{s}, \\quad s = \\frac{\\text{perimeter}}{2}",
      },
      authoredExample: {
        prompt: "A right triangle has legs 8 cm and 15 cm. Find the radius of its incircle.",
        steps: [
          "Hypotenuse \\(= \\sqrt{64 + 225} = \\sqrt{289} = 17\\) cm.",
          "\\(r = \\frac{8 + 15 - 17}{2} = \\frac{6}{2} = 3\\) cm.",
          "Check: area \\(= \\frac{1}{2} \\times 8 \\times 15 = 60\\), \\(s = \\frac{8 + 15 + 17}{2} = 20\\), and \\(\\frac{60}{20} = 3\\).",
        ],
        answer: "3 cm",
      },
      selfCheckExample: {
        prompt: "A triangle has sides 13 cm, 14 cm and 15 cm and area 84 cm². Find the radius of its incircle.",
        steps: ["\\(s = \\frac{13 + 14 + 15}{2} = 21\\).", "\\(r = \\frac{84}{21} = 4\\) cm."],
        answer: "4 cm",
      },
      practiceSet: [
        { prompt: "A right triangle has legs 7 cm and 24 cm. Find the radius of its incircle.", answer: "Hypotenuse 25 cm, so \\(r = \\frac{7 + 24 - 25}{2} = 3\\) cm" },
        { prompt: "A triangle has area 30 cm² and perimeter 30 cm. Find the radius of its incircle.", answer: "\\(s = 15\\), so \\(r = 2\\) cm" },
        {
          prompt: "The incircle of triangle ABC touches AB at P, BC at Q and CA at R. If AP = 4 cm, BQ = 5 cm and CR = 6 cm, find the perimeter of the triangle.",
          answer: "\\(2(4 + 5 + 6) = 30\\) cm",
        },
        { prompt: "A right triangle has legs 20 cm and 21 cm and hypotenuse 29 cm. Find the radius of its incircle.", answer: "\\(\\frac{20 + 21 - 29}{2} = 6\\) cm" },
      ],
      pyqExampleId: "2e7c06eb-30d6-4e4a-a11e-b2304a89ed0a",
      traps: [
        {
          title: "Dividing the area by the whole perimeter",
          body: "In \\(r = \\frac{\\text{Area}}{s}\\), \\(s\\) is half the perimeter. Dividing by the whole perimeter gives half the true radius.",
        },
        {
          title: "Halving the hypotenuse",
          body: "Half the hypotenuse of a right triangle is the radius of the circle through its three corners, a different circle. The circle inside has radius \\(\\frac{a + b - c}{2}\\).",
        },
      ],
    },
  ],
};

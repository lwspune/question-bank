import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_CI_TANGENTS_NOTE: SubtopicNote = {
  subtopicName: "Tangents from an External Point",
  title: "Tangents from an External Point",
  oneLineDefinition:
    "A tangent meets the radius at its point of contact at a right angle, so the radius, the tangent and the line from the outside point to the centre make a right triangle.",
  whyItMatters:
    "Thirty-two questions in the bank, 27 EASY and 5 MODERATE. Half of them are one right triangle with the line to the centre as the hypotenuse. The rest use the two equal tangents from one point, the tangents from the corners of a triangle, and the alternate segment theorem, which carries all the MODERATE angle work.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscitg-length",
      name: "Tangent at right angles to the radius, and its length",
      intuition:
        "A tangent only grazes the circle. The radius to the point where it touches is the shortest way from the centre to that line, and the shortest way to a line is always at a right angle to it.",
      definition:
        "- A **tangent** touches the circle at exactly one point, the **point of contact**. A line through two points of the circle is a secant, not a tangent.\n" +
        "- **The radius to the point of contact is perpendicular to the tangent.** This holds for every circle, and for the diameter through that point too.\n" +
        "- From an outside point P at distance \\(d\\) from the centre, the tangent \\(t\\), the radius \\(r\\) and \\(d\\) form a right triangle with \\(d\\) as the **hypotenuse**: \\(d^2 = r^2 + t^2\\).\n" +
        "- Two of \\(d\\), \\(r\\), \\(t\\) give the third. Find \\(r\\) first when the question asks for the diameter or the area of the circle.\n" +
        "- **Fast route:** the triples 3, 4, 5 and 5, 12, 13 and 8, 15, 17 and 7, 24, 25 settle most of these at sight. For an approximate answer, place the square between two perfect squares.",
      formula: {
        label: "Length of a tangent",
        latex: "t = \\sqrt{d^2 - r^2}",
        symbols: [
          { symbol: "t", meaning: "the length of the tangent from the outside point" },
          { symbol: "d", meaning: "the distance from the outside point to the centre" },
          { symbol: "r", meaning: "the radius" },
        ],
      },
      authoredExample: {
        prompt: "A point P is 29 cm from the centre of a circle of radius 20 cm. Find the length of the tangent from P.",
        steps: [
          "The radius meets the tangent at a right angle, and the 29 cm line to the centre is the hypotenuse.",
          "\\(t = \\sqrt{29^2 - 20^2} = \\sqrt{841 - 400} = \\sqrt{441} = 21\\) cm.",
          "Fast route: 20, 21, 29 is a triple.",
        ],
        answer: "21 cm",
      },
      selfCheckExample: {
        prompt: "The tangent from a point 26 cm from the centre of a circle is 24 cm long. Find the diameter of the circle.",
        steps: ["\\(r = \\sqrt{26^2 - 24^2} = \\sqrt{676 - 576} = 10\\) cm.", "Diameter \\(= 20\\) cm."],
        answer: "20 cm",
      },
      practiceSet: [
        { prompt: "What angle does a tangent make with the radius at the point of contact?", answer: "90°" },
        { prompt: "The tangent from a point P to a circle of radius 9 cm is 12 cm long. How far is P from the centre?", answer: "15 cm" },
        { prompt: "A point is 10 cm from the centre of a circle of radius 6 cm. How long is the tangent from it?", answer: "8 cm" },
        {
          prompt: "The tangent from a point 41 cm from the centre of a circle is 40 cm long. Find the area of the circle in terms of π.",
          answer: "81π cm²",
          method: "\\(r = \\sqrt{1681 - 1600} = 9\\).",
        },
      ],
      pyqExampleId: "e56a8b2a-90d4-449c-86cb-708c5cc2ecc7",
      traps: [
        {
          title: "Adding the squares when the distance is given",
          body: "The line from the outside point to the centre is the hypotenuse. With that distance and the radius known, subtract the squares to get the tangent.",
        },
        {
          title: "Answering with the radius when the diameter is asked",
          body: "The right triangle gives the radius. A question about the diameter or the area of the circle needs one more step.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscitg-pair",
      name: "Two tangents from one outside point",
      intuition:
        "The two tangents from P make two right triangles, OAP and OBP, that share the side OP and have equal radii. The triangles are congruent, so everything about one tangent is true of the other.",
      definition:
        "- **The two tangents from an outside point are equal:** PA = PB.\n" +
        "- OP **bisects** both \\(\\angle APB\\) and \\(\\angle AOB\\).\n" +
        "- In quadrilateral OAPB the angles at A and B are \\(90^\\circ\\), so **\\(\\angle APB + \\angle AOB = 180^\\circ\\)**.\n" +
        "- If \\(\\angle APB = 90^\\circ\\), OAPB is a square and \\(OP = r\\sqrt{2}\\). If \\(\\angle APB = 60^\\circ\\), then \\(\\angle APO = 30^\\circ\\) and \\(OP = 2r\\).\n" +
        "- **Area of OAPB** is two right triangles: \\(2 \\times \\frac{1}{2} \\times r \\times t = r \\times t\\).\n" +
        "- The tangents at the two ends of a chord AB meet at T on the line through O and the chord's midpoint M. Triangles OMA and OAT are similar, so \\(TA = \\frac{r \\times AM}{OM}\\).",
      formula: {
        label: "Two tangents from P",
        latex: "PA = PB \\qquad \\angle APB + \\angle AOB = 180^\\circ \\qquad \\text{Area}(OAPB) = r \\times t",
        symbols: [
          { symbol: "r", meaning: "the radius" },
          { symbol: "t", meaning: "the length of each tangent" },
        ],
      },
      authoredExample: {
        prompt:
          "Tangents PA and PB are drawn from an outside point P to a circle with centre O, and \\(\\angle APB = 50^\\circ\\). Find \\(\\angle AOB\\) and \\(\\angle OPA\\).",
        steps: [
          "The angles at A and B are \\(90^\\circ\\), so \\(\\angle AOB = 180^\\circ - 50^\\circ = 130^\\circ\\).",
          "OP bisects \\(\\angle APB\\), so \\(\\angle OPA = 25^\\circ\\).",
        ],
        answer: "130° and 25°",
      },
      selfCheckExample: {
        prompt:
          "From a point P that is 25 cm from the centre O of a circle of radius 7 cm, tangents PA and PB are drawn. Find the area of quadrilateral OAPB.",
        steps: ["Each tangent is \\(\\sqrt{625 - 49} = 24\\) cm.", "Area \\(= r \\times t = 7 \\times 24 = 168\\) cm²."],
        answer: "168 cm²",
      },
      practiceSet: [
        {
          prompt: "One tangent from an outside point to a circle is 9 cm long. How long is the other tangent from the same point?",
          answer: "9 cm",
        },
        {
          prompt: "Tangents PA and PB from a point P to a circle with centre O make \\(\\angle APB = 70^\\circ\\). Find \\(\\angle AOB\\).",
          answer: "110°",
        },
        {
          prompt: "Tangents PA and PB to a circle with centre O make \\(\\angle AOB = 100^\\circ\\). Find \\(\\angle APB\\).",
          answer: "80°",
        },
        {
          prompt: "Two tangents from a point P to a circle of radius 6 cm contain an angle of 60°. How far is P from the centre?",
          answer: "12 cm",
          method: "\\(\\angle APO = 30^\\circ\\), so OP is twice the radius.",
        },
      ],
      pyqExampleId: "3c1b29b0-f3d3-40c0-9c5b-a1998462a49f",
      traps: [
        {
          title: "Setting the angle at the centre equal to the angle between the tangents",
          body: "The two angles add to 180°, because the other two corners of OAPB are right angles. Tangents at 40° give 140° at the centre.",
        },
        {
          title: "Using the whole angle between the tangents in triangle OAP",
          body: "OP halves the angle between the tangents, so triangle OAP has half of it at P.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscitg-incircle",
      name: "Tangent lengths from the corners of a triangle to its inscribed circle",
      intuition:
        "A circle inside a triangle touching all three sides is touched by two tangents from each corner. Each corner's two tangents are equal, so the three sides are built from just three lengths.",
      definition:
        "- Let the circle touch BC at D, CA at E and AB at F. Then \\(AE = AF\\), \\(BD = BF\\) and \\(CD = CE\\).\n" +
        "- Call these \\(x\\), \\(y\\) and \\(z\\). The perimeter is \\(2(x + y + z)\\), so \\(x + y + z = s\\), the semi-perimeter.\n" +
        "- **The tangent from A is \\(s\\) minus the side opposite A:** \\(AF = s - BC\\). Likewise \\(BD = s - CA\\) and \\(CE = s - AB\\).\n" +
        "- Tangents PA and PB to a circle, and a third tangent touching the minor arc that cuts PA at R and PB at S: the perimeter of triangle PRS is \\(PA + PB = 2PA\\), because RS splits into two tangents that replace the pieces RA and SB.",
      formula: {
        label: "Tangent from a corner",
        latex: "AF = s - a \\qquad s = \\frac{a + b + c}{2}",
        symbols: [
          { symbol: "a", meaning: "the side BC, opposite the corner A" },
          { symbol: "s", meaning: "half the perimeter of the triangle" },
        ],
      },
      authoredExample: {
        prompt:
          "A circle is inscribed in triangle ABC with AB = 12 cm, BC = 10 cm and CA = 8 cm. It touches AB at F. Find AF and BF.",
        steps: [
          "\\(s = \\frac{12 + 10 + 8}{2} = 15\\).",
          "\\(AF = s - BC = 15 - 10 = 5\\) cm and \\(BF = s - CA = 15 - 8 = 7\\) cm.",
          "Check: \\(5 + 7 = 12 = AB\\).",
        ],
        answer: "AF = 5 cm, BF = 7 cm",
      },
      selfCheckExample: {
        prompt:
          "A circle inside a triangle touches all three sides. The tangent lengths from the three corners are 4 cm, 5 cm and 6 cm. Find the perimeter of the triangle.",
        steps: ["Each side is the sum of two tangent lengths, so every tangent length is counted twice.", "Perimeter \\(= 2(4 + 5 + 6) = 30\\) cm."],
        answer: "30 cm",
      },
      practiceSet: [
        {
          prompt: "The circle inscribed in triangle PQR touches PQ at D. If PQ = 10 cm, QR = 12 cm and RP = 8 cm, find PD.",
          answer: "3 cm",
          method: "\\(s = 15\\), and \\(PD = s - QR\\).",
        },
        {
          prompt: "The circle inscribed in an equilateral triangle of side 12 cm touches one side at D. How far is D from either end of that side?",
          answer: "6 cm",
        },
        {
          prompt: "The tangent lengths from the corners of a triangle to its inscribed circle are 3 cm, 4 cm and 5 cm. How long is the longest side?",
          answer: "9 cm",
        },
      ],
      pyqExampleId: "f3662f22-9bbf-4d11-925c-07c4241e1a32",
      traps: [
        {
          title: "Subtracting a neighbouring side from the semi-perimeter",
          body: "The tangent from a corner is the semi-perimeter minus the side opposite that corner, the one side that does not touch it.",
        },
        {
          title: "Adding the tangent lengths once for the perimeter",
          body: "Every tangent length appears in two sides, so the perimeter is twice the sum of the three tangent lengths.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscitg-altsegment",
      name: "The alternate segment theorem",
      intuition:
        "Slide a point along the circle towards C and the angle it sees chord CA at stays the same. When the point reaches C, the line to it has become the tangent, so the tangent makes that same angle with the chord.",
      definition:
        "- Let a tangent touch the circle at C and let CA be a chord. **The angle between the tangent and the chord equals the angle the chord subtends at any point B in the other segment** (the arc on the far side of the chord from that angle).\n" +
        "- The same angle is **half the centre angle** on the arc CA that lies inside the tangent-chord angle.\n" +
        "- A quick check with the radius: \\(\\angle OCA = 90^\\circ - \\) the tangent-chord angle, because the radius OC is perpendicular to the tangent.\n" +
        "- In a figure with a tangent and a secant from one point, pair this theorem with the exterior angle of a triangle (an exterior angle equals the sum of the two opposite interior angles).",
      formula: {
        label: "Tangent and chord",
        latex: "\\angle(\\text{tangent}, CA) = \\angle CBA = \\frac{1}{2}\\angle COA",
        symbols: [
          { symbol: "B", meaning: "a point on the arc on the other side of the chord CA" },
          { symbol: "O", meaning: "the centre" },
        ],
      },
      authoredExample: {
        prompt:
          "PT is a tangent to a circle with centre O at T, and TA is a chord with \\(\\angle PTA = 48^\\circ\\), the angle opening towards the minor arc TA. B is a point on the major arc. Find \\(\\angle TBA\\) and \\(\\angle TOA\\).",
        steps: [
          "B is in the segment on the other side of TA, so \\(\\angle TBA = \\angle PTA = 48^\\circ\\).",
          "The centre angle on the minor arc TA is twice that: \\(\\angle TOA = 96^\\circ\\).",
          "Check with the radius: \\(\\angle OTA = 90^\\circ - 48^\\circ = 42^\\circ\\), and in isosceles triangle OTA, \\(180^\\circ - 2 \\times 42^\\circ = 96^\\circ\\).",
        ],
        answer: "48° and 96°",
      },
      selfCheckExample: {
        prompt:
          "The tangent at a point C of a circle with centre O makes an angle of 62° with the chord CA, on the side of the minor arc CA. Find \\(\\angle OCA\\) and \\(\\angle COA\\).",
        steps: ["OC is perpendicular to the tangent, so \\(\\angle OCA = 90^\\circ - 62^\\circ = 28^\\circ\\).", "\\(\\angle COA = 2 \\times 62^\\circ = 124^\\circ\\). Check: \\(180^\\circ - 2 \\times 28^\\circ = 124^\\circ\\)."],
        answer: "28° and 124°",
      },
      practiceSet: [
        {
          prompt: "A tangent and a chord drawn from its point of contact contain 35°. What angle does the chord subtend at a point in the alternate segment?",
          answer: "35°",
        },
        {
          prompt: "A chord CA of a circle subtends 140° at the centre. What angle does it make with the tangent at C, on the side of the minor arc?",
          answer: "70°",
        },
        {
          prompt: "The tangent at C and the chord CB contain 75°, on the side of the minor arc CB. What angle does CB subtend at the centre?",
          answer: "150°",
        },
        { prompt: "The tangent at T is at right angles to the chord TA. What is the chord TA?", answer: "A diameter" },
      ],
      pyqExampleId: "7f5193f1-8635-4136-9fff-2de79b2dd066",
      traps: [
        {
          title: "Using the angle in the same segment instead of the alternate one",
          body: "The tangent-chord angle equals the angle the chord subtends on the far side of the chord. A point on the near side sees 180° minus it.",
        },
        {
          title: "Doubling the tangent-chord angle to get the angle at the circumference",
          body: "The tangent-chord angle already equals the angle at the circumference. Only the centre angle is twice it.",
        },
      ],
    },
  ],
};

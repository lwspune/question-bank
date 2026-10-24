import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_CI_ANGLES_NOTE: SubtopicNote = {
  subtopicName: "Angles in a Circle",
  title: "Angles in a Circle",
  oneLineDefinition:
    "An arc subtends at the centre twice the angle it subtends at any point on the rest of the circle, and the angle rules for semicircles and cyclic quadrilaterals follow from that one fact.",
  whyItMatters:
    "Thirty-two questions in the bank, 22 EASY and 10 MODERATE. The EASY ones halve or double a single angle. The MODERATE ones chain two rules, usually a right angle from a diameter with the angle sum of a triangle, or opposite angles of a cyclic quadrilateral.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscian-centre",
      name: "Angle at the centre is twice the angle at the circumference",
      intuition:
        "Look at an arc AB from the centre O and from a point C on the rest of the circle. From the centre the arc looks twice as wide. Every point C on the same remaining arc sees it at the same angle, because the centre angle does not change.",
      definition:
        "- **Angle at the centre \\(= 2 \\times\\) angle at the circumference**, when both stand on the same arc and C is on the remaining part of the circle.\n" +
        "- **Angles in the same segment are equal:** a chord subtends the same angle at every point of one arc.\n" +
        "- A chord whose centre angle is \\(\\theta\\) subtends \\(\\frac{\\theta}{2}\\) at a point of the **major arc**. A point of the **minor arc** stands on the major arc, so it sees half the reflex angle: \\(\\frac{360^\\circ - \\theta}{2} = 180^\\circ - \\frac{\\theta}{2}\\).\n" +
        "- The **reflex angle** at the centre is \\(360^\\circ - \\theta\\). An arc's degree measure is its centre angle; a semicircle is \\(180^\\circ\\).\n" +
        "- **Two radii make an isosceles triangle:** in triangle OAB, \\(OA = OB\\), so \\(\\angle OAB = \\angle OBA = \\frac{180^\\circ - \\angle AOB}{2}\\).\n" +
        "- Arcs given in a ratio share \\(360^\\circ\\) (or \\(180^\\circ\\) on one side of a diameter) in that ratio.",
      formula: {
        label: "Centre and circumference",
        latex: "\\angle AOB = 2\\,\\angle ACB \\qquad \\text{reflex } \\angle AOB = 360^\\circ - \\angle AOB",
        symbols: [
          { symbol: "O", meaning: "the centre" },
          { symbol: "C", meaning: "a point on the arc that does not contain the arc AB" },
        ],
      },
      authoredExample: {
        prompt:
          "A chord AB of a circle subtends 124° at the centre O. Find the angle AB subtends at a point C on the major arc and at a point D on the minor arc.",
        steps: [
          "C is on the major arc: \\(\\angle ACB = \\frac{124^\\circ}{2} = 62^\\circ\\).",
          "D is on the minor arc, so it stands on the major arc, whose centre angle is the reflex angle \\(360^\\circ - 124^\\circ = 236^\\circ\\).",
          "\\(\\angle ADB = \\frac{236^\\circ}{2} = 118^\\circ\\). Check: \\(62^\\circ + 118^\\circ = 180^\\circ\\).",
        ],
        answer: "62° and 118°",
      },
      selfCheckExample: {
        prompt:
          "In a circle with centre O, AB is a chord and \\(\\angle OAB = 40^\\circ\\). What angle does AB subtend at a point P on the major arc?",
        steps: [
          "OA = OB, so \\(\\angle OBA = 40^\\circ\\) and \\(\\angle AOB = 180^\\circ - 80^\\circ = 100^\\circ\\).",
          "P is on the major arc: \\(\\angle APB = \\frac{100^\\circ}{2} = 50^\\circ\\).",
        ],
        answer: "50°",
      },
      practiceSet: [
        { prompt: "A chord subtends 96° at the centre of a circle. What angle does it subtend at a point on the major arc?", answer: "48°" },
        {
          prompt: "Points P and Q lie on the same arc of a circle, and chord AB subtends 37° at P. What angle does AB subtend at Q?",
          answer: "37°",
        },
        { prompt: "An arc AB subtends 150° at the centre O. What is the reflex angle AOB?", answer: "210°" },
        {
          prompt: "AC is a diameter of a circle with centre O, and B is on the circle with arc AB twice arc BC. Find angle AOB.",
          answer: "120°",
          method: "Arc AB + arc BC \\(= 180^\\circ\\) in the ratio 2 : 1.",
        },
      ],
      pyqExampleId: "88b39f00-6195-4897-b8fd-ec5736db3f69",
      traps: [
        {
          title: "Doubling instead of halving",
          body: "The angle at the centre is the larger one. From the centre angle you halve to reach the circumference; from a circumference angle you double to reach the centre.",
        },
        {
          title: "Halving the centre angle for a point on the minor arc",
          body: "A point on the minor arc sees half the reflex angle, which is 180° minus half the centre angle. For a centre angle of 100°, that point sees 130°, not 50°.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscian-semicircle",
      name: "Angle in a semicircle and the circle through three points",
      intuition:
        "A diameter is a chord whose centre angle is a straight angle, 180°. Half of that is 90°, so every point on the circle sees a diameter at a right angle. Turned round, the longest side of any right triangle is a diameter of the circle through its corners.",
      definition:
        "- **The angle in a semicircle is \\(90^\\circ\\):** if AB is a diameter and C is on the circle, \\(\\angle ACB = 90^\\circ\\).\n" +
        "- So the **hypotenuse of a right triangle is a diameter of its circumcircle**, and the circumradius is half the hypotenuse.\n" +
        "- **Exactly one circle** passes through three points that are not in a straight line. **No circle** passes through three points in a line. If two of the three distances add up to the third, the points are in a line.\n" +
        "- Two circles meet at P and Q, with diameters PR and PS. Then \\(\\angle PQR = \\angle PQS = 90^\\circ\\), so R, Q and S lie in one line.\n" +
        "- When a diameter appears in a triangle question, mark the \\(90^\\circ\\) first, then use the angle sum of the triangle.",
      formula: {
        label: "Diameter and right angle",
        latex: "\\angle ACB = 90^\\circ \\text{ when } AB \\text{ is a diameter} \\qquad R = \\frac{\\text{hypotenuse}}{2}",
        symbols: [{ symbol: "R", meaning: "the radius of the circle through the three corners" }],
      },
      authoredExample: {
        prompt: "AB is a diameter of a circle and C is a point on the circle with \\(\\angle CAB = 34^\\circ\\). Find \\(\\angle ABC\\).",
        steps: [
          "AB is a diameter, so \\(\\angle ACB = 90^\\circ\\).",
          "Angle sum of triangle ABC: \\(\\angle ABC = 180^\\circ - 90^\\circ - 34^\\circ = 56^\\circ\\).",
        ],
        answer: "56°",
      },
      selfCheckExample: {
        prompt: "A right triangle has legs of 20 cm and 21 cm. Find the radius of the circle through its three corners.",
        steps: [
          "Hypotenuse \\(= \\sqrt{400 + 441} = \\sqrt{841} = 29\\) cm.",
          "The hypotenuse is a diameter, so the radius is \\(14.5\\) cm.",
        ],
        answer: "14.5 cm",
      },
      practiceSet: [
        { prompt: "What angle does a diameter subtend at a point on the circle?", answer: "90°" },
        { prompt: "How many circles pass through three points that lie on one straight line?", answer: "None" },
        {
          prompt: "Points P, Q and R have PQ = 7 cm, QR = 9 cm and PR = 16 cm. How many circles pass through all three?",
          answer: "None: 7 + 9 = 16, so the points are in a line",
        },
        {
          prompt: "A right triangle has a hypotenuse of 26 cm. What is the area of the circle through its corners, in terms of π?",
          answer: "169π cm²",
        },
      ],
      pyqExampleId: "17dc11a5-3cea-46bb-a92b-bc41bec3455b",
      traps: [
        {
          title: "Taking a shorter side of a right triangle as the diameter",
          body: "Only the hypotenuse, the side facing the right angle, is a diameter of the circle through the three corners.",
        },
        {
          title: "Assuming any three points lie on a circle",
          body: "Three points have a circle through them only when they are not in a line. If two of the distances add up to the third, the answer is zero circles.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscian-cyclic",
      name: "Opposite angles of a cyclic quadrilateral",
      intuition:
        "Put four points on a circle and join them in order. Two opposite corners stand on the two arcs that make up the whole circle. Their centre angles add to 360°, so the corners themselves add to half of that, 180°.",
      definition:
        "- A **cyclic quadrilateral** has all four corners on one circle.\n" +
        "- **Opposite angles add to \\(180^\\circ\\):** \\(\\angle A + \\angle C = 180^\\circ\\) and \\(\\angle B + \\angle D = 180^\\circ\\). Adjacent angles follow no such rule.\n" +
        "- **An exterior angle equals the interior opposite angle.** If side QR is produced beyond R to T, then \\(\\angle SRT = \\angle SPQ\\).\n" +
        "- With the centre O: if \\(\\angle QOS = \\theta\\) faces the corner R, then \\(\\angle QPS = \\frac{\\theta}{2}\\) and \\(\\angle QRS = 180^\\circ - \\frac{\\theta}{2}\\).\n" +
        "- A diameter as one side gives a right angle at each of the other two corners, which often finishes the question.",
      formula: {
        label: "Cyclic quadrilateral",
        latex: "\\angle A + \\angle C = 180^\\circ \\qquad \\angle B + \\angle D = 180^\\circ",
      },
      authoredExample: {
        prompt:
          "ABCD is a cyclic quadrilateral with \\(\\angle A = (4x + 10)^\\circ\\) and \\(\\angle C = (2x + 20)^\\circ\\). Find \\(\\angle A\\) and \\(\\angle C\\).",
        steps: [
          "A and C are opposite, so \\(4x + 10 + 2x + 20 = 180\\).",
          "\\(6x = 150\\), so \\(x = 25\\).",
          "\\(\\angle A = 110^\\circ\\) and \\(\\angle C = 70^\\circ\\). Check: they add to \\(180^\\circ\\).",
        ],
        answer: "110° and 70°",
      },
      selfCheckExample: {
        prompt:
          "PQRS is a cyclic quadrilateral and side QR is produced beyond R to T. If \\(\\angle SPQ = 76^\\circ\\), find \\(\\angle SRT\\).",
        steps: [
          "\\(\\angle QRS = 180^\\circ - 76^\\circ = 104^\\circ\\) (opposite angles).",
          "\\(\\angle SRT = 180^\\circ - 104^\\circ = 76^\\circ\\), the interior opposite angle.",
        ],
        answer: "76°",
      },
      practiceSet: [
        { prompt: "One angle of a cyclic quadrilateral is 65°. What is the angle opposite it?", answer: "115°" },
        {
          prompt: "The angles of a quadrilateral, taken in order, are 80°, 95°, 100° and 85°. Can its corners lie on one circle?",
          answer: "Yes: 80° + 100° = 180° and 95° + 85° = 180°",
        },
        { prompt: "ABCD is a cyclic quadrilateral with \\(\\angle B = 3\\angle D\\). Find \\(\\angle D\\).", answer: "45°" },
        {
          prompt: "A chord AB subtends 100° at the centre O of a circle, and C is a point on the minor arc AB. Find \\(\\angle ACB\\).",
          answer: "130°",
          method: "A point D on the major arc sees 50°, and ACBD is cyclic.",
        },
      ],
      pyqExampleId: "709db769-308f-4b01-b869-2a71a5f55a85",
      traps: [
        {
          title: "Adding adjacent angles to 180°",
          body: "Only opposite angles of a cyclic quadrilateral add to 180°. Two neighbouring angles can add to anything.",
        },
        {
          title: "Matching an exterior angle with the wrong interior angle",
          body: "An exterior angle of a cyclic quadrilateral equals the interior angle at the opposite corner, not the interior angle beside it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscian-chordlength",
      name: "A chord's length from the angle it subtends",
      intuition:
        "The two radii to the ends of a chord and the chord itself form an isosceles triangle. Its top angle is the centre angle, so that angle fixes the chord. For 60°, 90° and 120° the triangle is one you already know.",
      definition:
        "- Triangle OAB has \\(OA = OB = r\\) and top angle \\(\\theta\\), the centre angle. An angle at the circumference must be doubled first.\n" +
        "- \\(\\theta = 60^\\circ\\): the triangle is **equilateral**, so the chord equals the radius. (A chord subtending \\(30^\\circ\\) on the major arc is a radius long.)\n" +
        "- \\(\\theta = 90^\\circ\\): chord \\(= r\\sqrt{2}\\). \\(\\theta = 120^\\circ\\): chord \\(= r\\sqrt{3}\\). \\(\\theta = 180^\\circ\\): chord \\(= 2r\\).\n" +
        "- Drop the perpendicular from O: it halves both the chord and the angle. A \\(30^\\circ\\), \\(60^\\circ\\), \\(90^\\circ\\) triangle has sides in the ratio \\(1 : \\sqrt{3} : 2\\), and a \\(45^\\circ\\), \\(45^\\circ\\), \\(90^\\circ\\) triangle \\(1 : 1 : \\sqrt{2}\\).\n" +
        "- In general the chord is \\(2r\\sin\\frac{\\theta}{2}\\) and its distance from the centre is \\(r\\cos\\frac{\\theta}{2}\\).\n" +
        "- In a triangle on a diameter, a side equal to the radius faces \\(30^\\circ\\), so the angles are \\(30^\\circ\\), \\(60^\\circ\\) and \\(90^\\circ\\).",
      formula: {
        label: "Chord from the centre angle",
        latex: "c = 2r\\sin\\frac{\\theta}{2}",
        symbols: [
          { symbol: "c", meaning: "the chord" },
          { symbol: "\\(\\theta\\)", meaning: "the angle the chord subtends at the centre" },
        ],
      },
      authoredExample: {
        prompt: "A chord of a circle of radius 9 cm subtends 120° at the centre. Find its length and its distance from the centre.",
        steps: [
          "Drop the perpendicular OM from the centre to the chord AB. It halves the angle, so \\(\\angle AOM = 60^\\circ\\) and \\(\\angle OAM = 30^\\circ\\).",
          "In the \\(30^\\circ\\), \\(60^\\circ\\), \\(90^\\circ\\) triangle OMA the hypotenuse OA is 9, so \\(OM = 4.5\\) and \\(AM = \\frac{9\\sqrt{3}}{2}\\).",
          "Chord \\(AB = 2 \\times AM = 9\\sqrt{3}\\) cm, at \\(4.5\\) cm from the centre.",
        ],
        answer: "\\(9\\sqrt{3}\\) cm long, 4.5 cm from the centre",
      },
      selfCheckExample: {
        prompt: "A chord AB subtends 45° at a point on the major arc of a circle of radius 8 cm. Find AB.",
        steps: [
          "The centre angle is \\(2 \\times 45^\\circ = 90^\\circ\\).",
          "Triangle OAB is right-angled and isosceles with legs 8, so \\(AB = 8\\sqrt{2}\\) cm.",
        ],
        answer: "\\(8\\sqrt{2}\\) cm",
      },
      practiceSet: [
        { prompt: "A chord subtends 60° at the centre of a circle of radius 11 cm. How long is it?", answer: "11 cm" },
        { prompt: "A chord of a circle is as long as the radius. What angle does it subtend at the centre?", answer: "60°" },
        { prompt: "A chord subtends 90° at the centre of a circle of radius 5 cm. How long is it?", answer: "\\(5\\sqrt{2}\\) cm" },
        { prompt: "A chord subtends 120° at the centre of a circle of radius 6 cm. How far is it from the centre?", answer: "3 cm" },
      ],
      pyqExampleId: "526e6c10-f6bb-4129-906c-3c3e7f661624",
      traps: [
        {
          title: "Using the angle at the circumference as the centre angle",
          body: "A chord that subtends 30° at a point on the circle subtends 60° at the centre. Double first, then use the triangle of two radii.",
        },
      ],
    },
  ],
};

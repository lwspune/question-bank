import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_TR_ANGLES_NOTE: SubtopicNote = {
  subtopicName: "Angles, Sides and Pythagoras Theorem",
  title: "Angles, Sides and Pythagoras Theorem",
  oneLineDefinition:
    "The three angles of a triangle add to 180°, an exterior angle equals the two far interior angles, any two sides add to more than the third, and in a right triangle the square on the hypotenuse equals the squares on the other two sides.",
  whyItMatters:
    "Eight questions in the bank, seven of them EASY: angles in a ratio, an exterior angle, a triangle that cannot be drawn, two ladders against a wall and a 7, 24, 25 triangle. Every later page of this chapter leans on these four facts, so learn them first.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spitran-angle-sum",
      name: "The angle sum of a triangle",
      intuition:
        "Tear the three corners off a paper triangle and put them side by side: they make a straight line. That is why the three angles always add to 180°, whatever the shape of the triangle.",
      definition:
        "- The three angles of every triangle add to **180°**.\n" +
        "- Angles in a ratio \\(a : b : c\\): write them as \\(ak, bk, ck\\), add to 180° and find \\(k\\).\n" +
        "- In an **isosceles** triangle the angles opposite the two equal sides are equal.\n" +
        "- In an **equilateral** triangle every angle is 60°.",
      formula: {
        label: "Angle sum",
        latex: "\\angle A + \\angle B + \\angle C = 180^\\circ \\qquad ak + bk + ck = 180^\\circ",
      },
      authoredExample: {
        prompt: "The angles of a triangle are in the ratio 2 : 3 : 4. Find them.",
        steps: [
          "Write the angles as \\(2k, 3k, 4k\\).",
          "\\(2k + 3k + 4k = 9k = 180^\\circ\\), so \\(k = 20^\\circ\\).",
          "The angles are \\(40^\\circ, 60^\\circ, 80^\\circ\\). Check: \\(40 + 60 + 80 = 180\\).",
        ],
        answer: "\\(40^\\circ, 60^\\circ, 80^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "The angles of a triangle are in the ratio 1 : 2 : 3. Find the largest angle.",
        steps: ["\\(k + 2k + 3k = 6k = 180^\\circ\\), so \\(k = 30^\\circ\\).", "The largest angle is \\(3k = 90^\\circ\\)."],
        answer: "\\(90^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Two angles of a triangle are \\(50^\\circ\\) and \\(65^\\circ\\). Find the third angle.", answer: "\\(65^\\circ\\)" },
        { prompt: "The angles of a triangle are in the ratio 3 : 5 : 7. Find the smallest angle.", answer: "\\(36^\\circ\\) (\\(15k = 180^\\circ\\), \\(k = 12^\\circ\\))" },
        { prompt: "An isosceles triangle has the angle between its equal sides equal to \\(40^\\circ\\). Find each of the other two angles.", answer: "\\(70^\\circ\\) each" },
        { prompt: "What is each angle of an equilateral triangle?", answer: "\\(60^\\circ\\)" },
      ],
      pyqExampleId: "4cfd5809-74f6-4963-9209-5d3435343710",
      traps: [
        {
          title: "Dividing 180 by the wrong number",
          body:
            "For the ratio 2 : 3 : 4 you divide 180° by the SUM of the parts, 9, to get \\(k\\). Dividing by 3 (the number of angles) or by the largest part gives angles that do not add to 180°.",
        },
        {
          title: "Which angles of an isosceles triangle are equal",
          body:
            "The two equal angles are the ones opposite the equal sides, not the angle between them. If the angle between the equal sides is \\(40^\\circ\\), the other two are \\(70^\\circ\\) each.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spitran-exterior",
      name: "The exterior angle of a triangle",
      intuition:
        "Stretch one side of a triangle past a corner and you make an outside angle. It fills the gap the two far corners leave, so it equals their sum.",
      definition:
        "- An **exterior angle** is made by one side and the next side extended.\n" +
        "- It equals the sum of the two **interior opposite** angles (the two corners away from it).\n" +
        "- It and the interior angle next to it make a straight line, so they add to 180°.",
      formula: {
        label: "Exterior angle property",
        latex: "\\text{exterior angle} = \\text{sum of the two interior opposite angles}",
      },
      authoredExample: {
        prompt: "An exterior angle of a triangle is \\(120^\\circ\\) and one interior opposite angle is \\(50^\\circ\\). Find the other interior opposite angle.",
        steps: [
          "Exterior angle \\(=\\) sum of the two interior opposite angles.",
          "Other angle \\(= 120^\\circ - 50^\\circ = 70^\\circ\\).",
        ],
        answer: "\\(70^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "An exterior angle of a triangle is \\(130^\\circ\\) and its two interior opposite angles are equal. Find each of them.",
        steps: ["The two angles add to \\(130^\\circ\\).", "Each is \\(130^\\circ \\div 2 = 65^\\circ\\)."],
        answer: "\\(65^\\circ\\)",
      },
      practiceSet: [
        { prompt: "An exterior angle of a triangle is \\(95^\\circ\\) and one interior opposite angle is \\(40^\\circ\\). Find the other interior opposite angle.", answer: "\\(55^\\circ\\)" },
        { prompt: "An exterior angle of a triangle is \\(115^\\circ\\). Find the interior angle next to it.", answer: "\\(65^\\circ\\) (\\(180^\\circ - 115^\\circ\\))" },
        { prompt: "An exterior angle of a triangle is \\(140^\\circ\\) and its interior opposite angles are in the ratio 3 : 4. Find them.", answer: "\\(60^\\circ\\) and \\(80^\\circ\\)" },
      ],
      pyqExampleId: "cb09de3a-8242-47c5-a8a5-8666fb96c732",
      traps: [
        {
          title: "Taking 180° away instead of the given angle",
          body:
            "180° minus the exterior angle gives the interior angle NEXT to it. The far interior angle you are asked for is the exterior angle minus the other far angle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spitran-side-rule",
      name: "Any two sides are longer than the third",
      intuition:
        "Walking straight from one corner to another is always shorter than going round through the third corner. So the two other sides together must be longer than the side they go round.",
      definition:
        "- In every triangle the sum of any two sides is **greater than** the third side.\n" +
        "- Three lengths make a triangle only if the two shorter ones add to more than the longest.\n" +
        "- If they add to exactly the longest, the three points lie on one line and there is no triangle.\n" +
        "- So the third side lies strictly between the difference and the sum of the other two.",
      formula: {
        label: "Triangle inequality",
        latex: "a + b > c \\qquad |a - b| < c < a + b",
      },
      authoredExample: {
        prompt: "Can a triangle have sides 3 cm, 4 cm and 8 cm?",
        steps: [
          "Add the two shorter sides: \\(3 + 4 = 7\\).",
          "7 is less than 8, the longest side, so the sides cannot meet.",
        ],
        answer: "No",
      },
      selfCheckExample: {
        prompt: "Two sides of a triangle are 5 cm and 9 cm. Between which values must the third side lie?",
        steps: ["Greater than \\(9 - 5 = 4\\) cm.", "Less than \\(9 + 5 = 14\\) cm."],
        answer: "Between 4 cm and 14 cm",
      },
      practiceSet: [
        { prompt: "Can a triangle have sides 6 cm, 7 cm and 12 cm?", answer: "Yes (\\(6 + 7 = 13 > 12\\))" },
        { prompt: "Can a triangle have sides 2 cm, 3 cm and 5 cm?", answer: "No (\\(2 + 3 = 5\\) is not greater than 5)" },
        { prompt: "Two sides of a triangle are 7 cm and 10 cm. What is the smallest whole number of centimetres the third side can be?", answer: "4 cm (it must be more than 3 cm)" },
      ],
      pyqExampleId: "66b3fec7-282b-4cf8-93c6-d49cb95dd2d0",
      traps: [
        {
          title: "Equal is not enough",
          body:
            "Sides 2, 3 and 5 do not make a triangle: \\(2 + 3\\) equals 5 instead of being greater, so the points fall on one straight line.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spitran-pythagoras",
      name: "Pythagoras theorem and its converse",
      intuition:
        "In a right triangle the longest side, the hypotenuse, sits opposite the right angle. The square built on it has exactly the area of the squares on the other two sides put together.",
      definition:
        "- In a triangle right-angled at B: \\(AC^2 = AB^2 + BC^2\\), where AC is the **hypotenuse**.\n" +
        "- To find a **leg**, subtract: \\(\\text{leg}^2 = \\text{hypotenuse}^2 - \\text{other leg}^2\\).\n" +
        "- **Converse:** if the square of the longest side equals the sum of the squares of the other two, the triangle is right-angled.\n" +
        "- If the longest side's square is **more** than that sum, the triangle is obtuse; if **less**, it is acute.\n" +
        "- Triples worth knowing: 3, 4, 5; 5, 12, 13; 8, 15, 17; 7, 24, 25 (and their multiples, such as 6, 8, 10).",
      formula: {
        label: "Pythagoras theorem",
        latex: "\\text{hypotenuse}^2 = \\text{base}^2 + \\text{height}^2",
      },
      authoredExample: {
        prompt: "A ladder 25 m long leans against a wall and its top reaches a window 24 m above the ground. How far is the foot of the ladder from the wall?",
        steps: [
          "The ladder is the hypotenuse; the wall height and the ground distance are the legs.",
          "Distance \\(= \\sqrt{25^2 - 24^2} = \\sqrt{625 - 576} = \\sqrt{49} = 7\\) m.",
          "Check: \\(7^2 + 24^2 = 49 + 576 = 625 = 25^2\\).",
        ],
        answer: "7 m",
      },
      selfCheckExample: {
        prompt: "Is a triangle with sides 9 cm, 40 cm and 41 cm right-angled?",
        steps: ["\\(9^2 + 40^2 = 81 + 1600 = 1681\\).", "\\(41^2 = 1681\\), the same, so by the converse it is right-angled."],
        answer: "Yes",
      },
      practiceSet: [
        { prompt: "The legs of a right triangle are 5 cm and 12 cm. Find the hypotenuse.", answer: "13 cm" },
        { prompt: "A rectangle is 6 cm by 8 cm. How long is its diagonal?", answer: "10 cm" },
        { prompt: "A right triangle has hypotenuse 17 cm and one leg 8 cm. Find the other leg.", answer: "15 cm" },
        { prompt: "Is a triangle with sides 4 cm, 5 cm and 6 cm acute, right or obtuse?", answer: "Acute (\\(6^2 = 36\\) is less than \\(4^2 + 5^2 = 41\\))" },
      ],
      pyqExampleId: "2f293c0a-4b24-4336-a1ed-58edf57fcc2a",
      traps: [
        {
          title: "Adding when you should subtract",
          body:
            "When the hypotenuse is given and a leg is asked, subtract the squares. A 25 m ladder with its top 24 m up stands 7 m out, not \\(\\sqrt{25^2 + 24^2}\\) m.",
        },
        {
          title: "Testing the wrong side as the hypotenuse",
          body:
            "In the converse, square the LONGEST side and compare it with the other two. For 7, 24 and 25, check \\(7^2 + 24^2 = 25^2\\), not \\(7^2 + 25^2\\).",
        },
      ],
    },
  ],
};

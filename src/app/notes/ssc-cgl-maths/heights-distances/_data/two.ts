import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HD_TWO_NOTE: SubtopicNote = {
  subtopicName: "Two Angles of Elevation or Depression",
  title: "Two Angles of Elevation or Depression",
  oneLineDefinition:
    "Two right triangles that share a side: two observers looking at one tower, or one observer looking at two points, with the shared height or distance tying them together.",
  whyItMatters:
    "Ten questions in the bank, all from the 2025 shifts, and every MODERATE row of the chapter is on this page (seven of the ten). Each is two one-angle triangles joined by a side they share, so the method is the same every time: write each ground distance in terms of the height, then add or subtract.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sschdtw-opposite",
      name: "Two observers on opposite sides of a tower",
      intuition:
        "When the two observers stand on opposite sides of the tower, the tower's foot lies between them. So the gap between them is the sum of their two distances from the foot, and the tower's height is shared by both triangles.",
      definition:
        "- Write each distance from the height: at angle \\(\\theta\\), distance \\(= \\frac{h}{\\tan\\theta}\\). So 30° gives \\(h\\sqrt{3}\\), 45° gives \\(h\\) and 60° gives \\(\\frac{h}{\\sqrt{3}}\\).\n" +
        "- **Opposite sides:** gap \\(=\\) sum of the two distances. Solve for \\(h\\) if the gap is given, or add if the height is given.\n" +
        "- The same works from above: two boats or cars seen from a tower top, a cliff or a plane on opposite sides. Each angle of depression is the angle of elevation from that point.\n" +
        "- **Fast route:** for 30° and 45° the gap is \\(h(\\sqrt{3} + 1)\\); for 30° and 60° it is \\(h\\sqrt{3} + \\frac{h}{\\sqrt{3}} = \\frac{4h}{\\sqrt{3}}\\).",
      formula: {
        label: "Two observers on opposite sides",
        latex: "\\text{gap} = \\frac{h}{\\tan\\alpha} + \\frac{h}{\\tan\\beta}",
        symbols: [
          { symbol: "\\(\\alpha, \\beta\\)", meaning: "the two angles of elevation, one from each side" },
          { symbol: "h", meaning: "the height of the tower" },
        ],
      },
      authoredExample: {
        prompt:
          "Two points on the ground lie on opposite sides of a 60 m tower, and the angles of elevation of its top from them are 30° and 60°. How far apart are the points?",
        steps: [
          "At 30°: distance \\(= \\frac{60}{\\tan 30^\\circ} = 60\\sqrt{3}\\) m.",
          "At 60°: distance \\(= \\frac{60}{\\sqrt{3}} = 20\\sqrt{3}\\) m.",
          "Opposite sides, so add: \\(60\\sqrt{3} + 20\\sqrt{3} = 80\\sqrt{3} \\approx 138.6\\) m.",
        ],
        answer: "\\(80\\sqrt{3}\\) m",
      },
      selfCheckExample: {
        prompt:
          "Two points on opposite sides of a tower are 120 m apart, and the angles of elevation of its top from them are 30° and 60°. Find the height of the tower.",
        steps: [
          "\\(h\\sqrt{3} + \\frac{h}{\\sqrt{3}} = 120\\), so \\(\\frac{4h}{\\sqrt{3}} = 120\\).",
          "\\(h = 30\\sqrt{3} \\approx 51.96\\) m.",
        ],
        answer: "\\(30\\sqrt{3}\\) m",
      },
      practiceSet: [
        { prompt: "From the top of an 80 m lighthouse, two boats on opposite sides of it are both seen at a depression of 45°. How far apart are the boats?", answer: "160 m" },
        { prompt: "Two points on opposite sides of a 30 m tower see its top at 60° and 30°. How far apart are the points?", answer: "\\(40\\sqrt{3}\\) m", method: "\\(10\\sqrt{3} + 30\\sqrt{3}\\)." },
        {
          prompt: "Two points on opposite sides of a 15 m pole are \\(15(\\sqrt{3} + 1)\\) m apart. From one point the angle of elevation of the top is 45°. What is it from the other point?",
          answer: "30°",
          method: "The 45° point is 15 m away, so the other is \\(15\\sqrt{3}\\) m away and \\(\\tan\\theta = \\frac{1}{\\sqrt{3}}\\).",
        },
        { prompt: "From the top of a 90 m tower, two buoys on opposite sides of it are seen at depressions of 30° and 60°. How far apart are the buoys?", answer: "\\(120\\sqrt{3}\\) m" },
      ],
      pyqExampleId: "758e4c47-06db-45dc-8d8f-c8f7681a7fde",
      traps: [
        {
          title: "Subtracting the distances for observers on opposite sides",
          body:
            "On opposite sides the foot of the tower lies between the observers, so their distances add. Subtracting is only for two observers on the same side.",
        },
        {
          title: "Leaving a surd in the bottom when matching options",
          body:
            "\\(\\frac{300}{\\sqrt{3} + 1}\\) is printed as \\(150(\\sqrt{3} - 1)\\). Multiply top and bottom by \\(\\sqrt{3} - 1\\), since \\((\\sqrt{3} + 1)(\\sqrt{3} - 1) = 2\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sschdtw-same",
      name: "Two observers on the same side of a tower",
      intuition:
        "Walking towards a tower makes the angle of elevation grow. Both points lie on one side of the foot, so the distance walked is the far distance minus the near one, and the height is the same in both triangles.",
      definition:
        "- The nearer point always sees the larger angle.\n" +
        "- **Same side:** gap \\(=\\) far distance \\(-\\) near distance \\(= \\frac{h}{\\tan\\alpha} - \\frac{h}{\\tan\\beta}\\), with \\(\\alpha\\) the smaller angle.\n" +
        "- Or set the near distance as \\(x\\), write the height twice (once from each angle), and equate.\n" +
        "- **Fast route for 30° and 60° only:** the far point is 3 times as far as the near point, so the gap is twice the near distance and \\(h = \\frac{\\sqrt{3}}{2} \\times\\) gap. For other angle pairs, use the full method.",
      formula: {
        label: "Two observers on the same side",
        latex: "\\text{gap} = \\frac{h}{\\tan\\alpha} - \\frac{h}{\\tan\\beta} \\qquad (\\alpha < \\beta)",
        symbols: [
          { symbol: "\\(\\alpha\\)", meaning: "the smaller angle, seen from the farther point" },
          { symbol: "\\(\\beta\\)", meaning: "the larger angle, seen from the nearer point" },
        ],
      },
      authoredExample: {
        prompt:
          "A man sees the top of a tower at an elevation of 30°. He walks 50 m straight towards it, and the elevation becomes 45°. Find the height of the tower.",
        steps: [
          "Far distance \\(= h\\sqrt{3}\\), near distance \\(= h\\). Same side, so \\(h\\sqrt{3} - h = 50\\).",
          "\\(h = \\frac{50}{\\sqrt{3} - 1} = \\frac{50(\\sqrt{3} + 1)}{2} = 25(\\sqrt{3} + 1)\\).",
          "As a decimal: \\(25 \\times 2.732 \\approx 68.3\\) m.",
        ],
        answer: "\\(25(\\sqrt{3} + 1)\\) m, about 68.3 m",
      },
      selfCheckExample: {
        prompt:
          "Two points on the same side of a tower, in line with its foot, are 24 m apart. The angles of elevation of its top from them are 45° and 60°. Find the height of the tower.",
        steps: [
          "\\(h - \\frac{h}{\\sqrt{3}} = 24\\), so \\(h \\cdot \\frac{\\sqrt{3} - 1}{\\sqrt{3}} = 24\\).",
          "\\(h = \\frac{24\\sqrt{3}}{\\sqrt{3} - 1} = 12\\sqrt{3}(\\sqrt{3} + 1) = 36 + 12\\sqrt{3} \\approx 56.8\\) m.",
        ],
        answer: "\\(12(3 + \\sqrt{3})\\) m",
      },
      practiceSet: [
        {
          prompt: "Points A and B lie on the same side of a pole, in line with its foot. From A the top is at 30° and from B at 60°. B is 7 m from the foot. How far apart are A and B?",
          answer: "14 m",
          method: "A is 3 times as far as B, so 21 m from the foot.",
        },
        { prompt: "From two points on the same side of a tower, the elevations of its top are 45° and 60°. What is the ratio of their distances from the foot?", answer: "\\(\\sqrt{3} : 1\\)" },
        { prompt: "The angle of elevation of the top of a 30 m pole changes from 30° to 60° as a man walks straight towards it. How far does he walk?", answer: "\\(20\\sqrt{3}\\) m" },
        {
          prompt: "From a point the top of a tower is at 45°. After walking 20 m towards it the angle is 60°. Taking \\(\\sqrt{3} = 1.732\\), find the height to one decimal place.",
          answer: "47.3 m",
          method: "\\(h = 10(3 + \\sqrt{3})\\).",
        },
      ],
      pyqExampleId: "24939205-6b69-4e0f-af25-f30d307ed346",
      traps: [
        {
          title: "Giving the larger angle to the farther point",
          body:
            "As you walk towards a tower its top rises in your view, so the nearer point has the larger angle. Swap them and the distance walked comes out negative.",
        },
        {
          title: "Using the 30° and 60° shortcut for other angles",
          body:
            "'The far point is 3 times as far' holds only for 30° and 60°. For 30° and 45° the ratio is \\(\\sqrt{3} : 1\\), so write both distances in terms of \\(h\\) and subtract.",
        },
        {
          title: "Treating two printed forms as different answers",
          body:
            "\\(\\frac{10\\sqrt{3}}{\\sqrt{3} - 1}\\) and \\(5(3 + \\sqrt{3})\\) are the same number. Rationalise before you compare options, or compare their decimal values.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sschdtw-complement",
      name: "Complementary angles from two points",
      intuition:
        "If the two angles of elevation add up to 90°, the tangent of one is the cotangent of the other, so the two tangents multiply to 1. That turns the two distances into the height directly.",
      definition:
        "- From points at distances \\(a\\) and \\(b\\) from the foot, the angles are complementary exactly when \\(h^2 = ab\\).\n" +
        "- So \\(h = \\sqrt{ab}\\): the height is the geometric mean of the two distances. Only the distances from the foot matter, not which side each point is on.\n" +
        "- Why: \\(\\tan\\theta = \\frac{h}{a}\\) and \\(\\tan(90^\\circ - \\theta) = \\cot\\theta = \\frac{h}{b}\\). Since \\(\\cot\\theta = \\frac{1}{\\tan\\theta}\\), the two multiply to 1, so \\(\\frac{h}{a} \\times \\frac{h}{b} = 1\\).",
      formula: {
        label: "Complementary angles of elevation",
        latex: "\\theta_1 + \\theta_2 = 90^\\circ \\Rightarrow h^2 = ab",
        symbols: [{ symbol: "a, b", meaning: "the distances of the two points from the foot" }],
      },
      authoredExample: {
        prompt:
          "From two points 4 m and 9 m from the foot of a tower, on a line through its foot, the angles of elevation of its top are complementary. Find the height of the tower.",
        steps: ["\\(h^2 = 4 \\times 9 = 36\\).", "\\(h = 6\\) m."],
        answer: "6 m",
      },
      selfCheckExample: {
        prompt:
          "A tower is 12 m high. From a point 8 m from its foot the angle of elevation of its top is θ. How far from the foot, on the same line, is the angle 90° minus θ?",
        steps: ["\\(ab = 12^2 = 144\\), so \\(b = \\frac{144}{8} = 18\\) m."],
        answer: "18 m",
      },
      practiceSet: [
        { prompt: "From points 3 m and 27 m from the foot of a pole, the angles of elevation of its top are complementary. How tall is the pole?", answer: "9 m" },
        { prompt: "If \\(x + y = 90^\\circ\\), what is \\(\\tan x \\times \\tan y\\)?", answer: "1" },
        { prompt: "From points 2 m and 50 m from the foot of a pole, the angles of elevation of its top are complementary. How tall is the pole?", answer: "10 m" },
        {
          prompt: "The top of a tower is seen at 60° from a point 16 m from its foot. How far from the foot, on the same line, is it seen at 30°?",
          answer: "48 m",
          method: "60° and 30° are complementary, so \\(b = \\frac{h^2}{a} = \\frac{(16\\sqrt{3})^2}{16}\\).",
        },
      ],
      pyqExampleId: "8585f1e4-b3dd-4974-847b-b4103c3fd75e",
      traps: [
        {
          title: "Taking the average of the two distances",
          body:
            "For complementary angles the height is \\(\\sqrt{ab}\\), the geometric mean, not \\(\\frac{a + b}{2}\\). From 4 m and 16 m the height is 8 m, not 10 m.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sschdtw-onepoint",
      name: "One observer reading two angles on the same vertical line",
      intuition:
        "One observer reads two angles to two points on the same vertical line: the bottom and top of a statue, or the top and foot of a building. Both triangles share the same ground distance, so find that distance from one angle and use it in the other.",
      definition:
        "- **Step 1:** use the angle whose triangle has a known side to find the shared ground distance.\n" +
        "- **Step 2:** use the other angle with that distance to find the second height.\n" +
        "- **Step 3:** the answer is the difference of the two heights (the statue alone, the flagstaff alone) or what is left (the building is the tower minus the drop to its top).\n" +
        "- Looking down from a tower top, the depression to the building's foot gives the distance; the depression to its top gives how far the building's top is below you.",
      authoredExample: {
        prompt:
          "From the top of a 60 m tower, the angles of depression of the top and the foot of a building are 30° and 60°. Find the height of the building.",
        steps: [
          "The 60° depression goes to the foot: distance \\(= \\frac{60}{\\tan 60^\\circ} = 20\\sqrt{3}\\) m.",
          "The 30° depression goes to the top: drop \\(= 20\\sqrt{3} \\tan 30^\\circ = 20\\) m below the tower top.",
          "Building \\(= 60 - 20 = 40\\) m.",
        ],
        answer: "40 m",
      },
      selfCheckExample: {
        prompt:
          "A flagstaff stands on top of a building 15 m tall. From a point on the ground, the angles of elevation of the bottom and the top of the flagstaff are 30° and 60°. Find the length of the flagstaff.",
        steps: [
          "Bottom at 30°: distance \\(= \\frac{15}{\\tan 30^\\circ} = 15\\sqrt{3}\\) m.",
          "Top at 60°: height \\(= 15\\sqrt{3} \\times \\sqrt{3} = 45\\) m.",
          "Flagstaff \\(= 45 - 15 = 30\\) m.",
        ],
        answer: "30 m",
      },
      practiceSet: [
        {
          prompt: "From a point on the ground 30 m from a building, the angles of elevation of the bottom and the top of a pole on its roof are 45° and 60°. How long is the pole?",
          answer: "\\(30(\\sqrt{3} - 1)\\) m",
        },
        {
          prompt: "From the top of a 100 m cliff, the angle of depression of the foot of a tower is 45° and of its top is 30°. How tall is the tower?",
          answer: "\\(100\\left(1 - \\frac{1}{\\sqrt{3}}\\right)\\) m, about 42.3 m",
        },
        {
          prompt: "From the top of a 40 m building, the angle of elevation of the top of a tower is 45° and the angle of depression of its foot is 45°. How tall is the tower?",
          answer: "80 m",
          method: "The distance is 40 m, and the tower rises 40 m above the building's top.",
        },
      ],
      pyqExampleId: "435005db-1855-4aca-832c-60509c8518dd",
      traps: [
        {
          title: "Giving the building the height of the drop",
          body:
            "From a tower top, the depression to a building's top gives how far that top is below you. The building's height is the tower's height minus that drop.",
        },
        {
          title: "Using the wrong angle for the shared distance",
          body:
            "Find the ground distance from the triangle whose height you already know: the pedestal, the building or the tower. The other angle only gives a height once that distance is known.",
        },
      ],
    },
  ],
};

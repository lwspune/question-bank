import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_HD_TWO_NOTE: SubtopicNote = {
  subtopicName: "Two Angles of Elevation or Depression",
  title: "Two Angles of Elevation or Depression",
  oneLineDefinition:
    "Two angles to the same height give two ground distances: subtract them when both points are on one side of the tower, add them when the points are on opposite sides.",
  whyItMatters:
    "6 questions in the Tier II bank, 4 EASY and 2 MODERATE. Each writes the same height twice, once from each angle, and links the two distances.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2hdtw-same",
      name: "Two angles on the same side",
      visualizationSlug: "af-two-sightings",
      intuition:
        "When an observer, or a ship, moves towards a tower along one line, each angle gives a distance from the foot. The distance moved is the difference of the two.",
      definition:
        "- Distance at angle \\(\\theta\\) from a height h: \\(d = h\\cot\\theta = \\frac{h}{\\tan\\theta}\\).\n" +
        "- Moving from angle \\(\\alpha\\) to \\(\\beta\\) (closer, so larger): distance moved \\(= h(\\cot\\alpha - \\cot\\beta)\\).\n" +
        "- At 30° and 60°: the distances are in the ratio 3 : 1, so the distance moved is \\(\\frac{2}{3}\\) of the first.\n" +
        "- Two angles from one observer to two heights (top of a building, top of a tower): write each height from the same distance.",
      formula: {
        label: "Distance moved",
        latex: "d = h\\left(\\cot\\alpha - \\cot\\beta\\right)",
      },
      authoredExample: {
        prompt: "From the top of a cliff \\(60\\sqrt{3}\\) m high, a boat's angle of depression changes from 30° to 60° as it comes in. How far did the boat travel?",
        steps: [
          "At 30°: \\(60\\sqrt{3} \\times \\sqrt{3} = 180\\) m. At 60°: \\(\\frac{60\\sqrt{3}}{\\sqrt{3}} = 60\\) m.",
          "Distance \\(= 180 - 60 = 120\\) m.",
        ],
        answer: "120 m",
      },
      selfCheckExample: {
        prompt: "Walking 20 m towards a tower, a man finds the angle of elevation of its top rise from 30° to 60°. How tall is the tower?",
        steps: ["\\(h\\left(\\sqrt{3} - \\frac{1}{\\sqrt{3}}\\right) = 20\\), so \\(h \\times \\frac{2}{\\sqrt{3}} = 20\\).", "\\(h = 10\\sqrt{3}\\) m."],
        answer: "\\(10\\sqrt{3}\\) m",
      },
      practiceSet: [
        { prompt: "A tower is 30 m tall. How far apart are the points on one side where its top is seen at 30° and at 60°?", answer: "\\(20\\sqrt{3}\\) m" },
        { prompt: "From a point, the top of a tower is at 45°. Moving 10 m closer, it is at 60°. Is the tower taller or shorter than 20 m?", answer: "Taller: about 23.7 m" },
        { prompt: "At 30° and 60° on the same side, the two distances are in what ratio?", answer: "3 : 1" },
      ],
      pyqExampleId: "0f78a146-bd7d-413d-b6c4-a9421fd4207e",
      traps: [
        {
          title: "Adding the distances when both points are on one side",
          body: "If both points are on the same side of the tower, the gap between them is the DIFFERENCE of their distances from the foot, not the sum.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2hdtw-opposite",
      name: "Points on opposite sides",
      intuition:
        "When the two points are on opposite sides of a tower, or a road runs between two equal pillars, the two distances lie end to end, so they add up to the total gap.",
      definition:
        "- Two points on opposite sides of a tower of height h: total distance \\(= h(\\cot\\alpha + \\cot\\beta)\\).\n" +
        "- Two equal pillars across a road of width w, seen from a point between them: \\(h(\\cot\\alpha + \\cot\\beta) = w\\).\n" +
        "- With tan values given as fractions, \\(\\cot = \\frac{1}{\\tan}\\) turns each distance into a multiple of h.",
      formula: {
        label: "Opposite sides",
        latex: "w = h\\left(\\cot\\alpha + \\cot\\beta\\right)",
      },
      authoredExample: {
        prompt: "Two equal pillars stand on either side of a road 80 m wide. From a point on the road between them, their tops are seen at 30° and 60°. Find the height of the pillars.",
        steps: ["\\(h\\left(\\sqrt{3} + \\frac{1}{\\sqrt{3}}\\right) = 80\\), so \\(h \\times \\frac{4}{\\sqrt{3}} = 80\\).", "\\(h = 20\\sqrt{3}\\) m."],
        answer: "\\(20\\sqrt{3}\\) m",
      },
      selfCheckExample: {
        prompt: "From the top of a 30 m lighthouse, two boats on opposite sides are seen at angles of depression of 45° and 60°. How far apart are the boats?",
        steps: ["Distances: \\(30\\) m and \\(\\frac{30}{\\sqrt{3}} = 10\\sqrt{3}\\) m.", "Apart: \\(30 + 10\\sqrt{3}\\) m, about 47.3 m."],
        answer: "\\(30 + 10\\sqrt{3}\\) m",
      },
      practiceSet: [
        { prompt: "Two pillars of equal height are 120 m apart. From a point between them the tops are seen with \\(\\tan = \\frac{1}{2}\\) and \\(\\tan = \\frac{1}{4}\\). Find the height.", answer: "20 m" },
        { prompt: "A tower is 15 m tall. Two points on opposite sides see its top at 45°. How far apart are they?", answer: "30 m" },
        { prompt: "From a point midway between two equal poles 40 m apart, both tops are seen at 45°. How tall are the poles?", answer: "20 m" },
      ],
      pyqExampleId: "a8036171-8a86-413b-b1f5-deff5313e782",
      traps: [
        {
          title: "Using tan when the stem gives the distance",
          body: "Distance is height divided by tan, which is height times cot. With \\(\\tan = \\frac{2}{5}\\), the distance is \\(\\frac{5h}{2}\\), not \\(\\frac{2h}{5}\\).",
        },
      ],
    },
  ],
};

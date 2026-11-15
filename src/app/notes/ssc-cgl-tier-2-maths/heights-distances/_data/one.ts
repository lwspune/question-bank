import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_HD_ONE_NOTE: SubtopicNote = {
  subtopicName: "One Line of Sight",
  title: "One Line of Sight",
  oneLineDefinition:
    "One angle and one length fix a right triangle: tan of the angle is height over ground distance, and an observer on a pole or building first takes off his own height.",
  whyItMatters:
    "5 questions in the Tier II bank, all EASY. Each is a single tan of 30, 45 or 60 degrees, plus one subtraction when the observer is raised.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2hdon-ground",
      name: "From the ground",
      intuition:
        "Looking up at the top of a tower from the ground makes a right triangle: the tower is the upright side, the ground distance the flat side, and the angle of elevation is at the observer. So the height is the distance times tan of that angle.",
      definition:
        "- \\(\\tan\\theta = \\frac{\\text{height}}{\\text{distance}}\\), so height \\(=\\) distance \\(\\times \\tan\\theta\\).\n" +
        "- \\(\\tan 30^\\circ = \\frac{1}{\\sqrt{3}}\\), \\(\\tan 45^\\circ = 1\\), \\(\\tan 60^\\circ = \\sqrt{3}\\).\n" +
        "- An observer whose eye is h above the ground adds h to the height found from the angle.\n" +
        "- The angle of depression from the top equals the angle of elevation from the bottom (alternate angles).",
      formula: {
        label: "Height from one angle",
        latex: "\\text{height} = \\text{distance} \\times \\tan\\theta",
      },
      authoredExample: {
        prompt: "From a point 40 m from the foot of a tower, the angle of elevation of its top is 60°. Find the height of the tower.",
        steps: ["Height \\(= 40 \\times \\tan 60^\\circ\\).", "\\(= 40\\sqrt{3}\\) m."],
        answer: "\\(40\\sqrt{3}\\) m",
      },
      selfCheckExample: {
        prompt: "A boy whose eyes are 1.5 m above the ground stands 20 m from a tree and sees its top at 45°. How tall is the tree?",
        steps: ["Above his eyes the tree rises \\(20 \\times \\tan 45^\\circ = 20\\) m.", "Tree \\(= 20 + 1.5 = 21.5\\) m."],
        answer: "21.5 m",
      },
      practiceSet: [
        { prompt: "A ladder leaning on a wall makes 60° with the ground, and its foot is 3 m from the wall. How long is the ladder?", answer: "6 m" },
        { prompt: "The angle of elevation of the top of a 50 m tower is 45°. How far is the observer from the tower?", answer: "50 m" },
        { prompt: "A pole 10 m tall casts a shadow of \\(10\\sqrt{3}\\) m. Find the sun's angle of elevation.", answer: "\\(30^\\circ\\)" },
      ],
      pyqExampleId: "4a4e42ce-9755-40b0-bc19-a990e5321158",
      traps: [
        {
          title: "Using sin or cos for height over distance",
          body: "Height and ground distance are the two shorter sides, so the ratio is tan. sin or cos would need the slanting line of sight.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2hdon-above",
      name: "From a height",
      intuition:
        "When the observer stands on a pole or a building, the right triangle starts at the observer's height, not at the ground. Take that height off the tower (or add it on) before using the angle.",
      definition:
        "- Looking UP from a height h to a taller tower H: \\(\\tan\\theta = \\frac{H - h}{d}\\).\n" +
        "- Looking DOWN from a tower H to a shorter building h: \\(\\tan\\theta = \\frac{H - h}{d}\\) as well.\n" +
        "- Looking down at a point on the ground: \\(\\tan\\theta = \\frac{H}{d}\\).",
      formula: {
        label: "Observer at a height",
        latex: "\\tan\\theta = \\frac{H - h}{d}",
      },
      authoredExample: {
        prompt: "From the top of a 20 m building, the angle of elevation of the top of a tower 30 m away is 30°. Find the height of the tower.",
        steps: ["Above the building, the tower rises \\(30 \\times \\tan 30^\\circ = \\frac{30}{\\sqrt{3}} = 10\\sqrt{3}\\) m.", "Tower \\(= 20 + 10\\sqrt{3}\\) m."],
        answer: "\\(20 + 10\\sqrt{3}\\) m",
      },
      selfCheckExample: {
        prompt: "From the top of a 100 m tower, the angle of depression of the top of a 40 m building is 45°. How far apart are they?",
        steps: ["The drop from tower top to building top is 60 m.", "Distance \\(= \\frac{60}{\\tan 45^\\circ} = 60\\) m."],
        answer: "60 m",
      },
      practiceSet: [
        { prompt: "From a cliff 75 m high, a boat is seen at an angle of depression of 30°. How far is the boat from the foot of the cliff?", answer: "\\(75\\sqrt{3}\\) m" },
        { prompt: "From a 12 m pole, the top of a tower 12 m away is seen at 45°. How tall is the tower?", answer: "24 m" },
        { prompt: "From the top of a 60 m tower, the top of a building is seen at 60° below the horizontal, 20 m away. How tall is the building?", answer: "\\(60 - 20\\sqrt{3}\\) m" },
      ],
      pyqExampleId: "5569a602-24f8-496d-90dc-81b5b1567d24",
      traps: [
        {
          title: "Using the whole tower height from a raised point",
          body: "From the top of a 20 m building, the angle measures only the part of the tower above 20 m. Add the 20 m back at the end.",
        },
      ],
    },
  ],
};

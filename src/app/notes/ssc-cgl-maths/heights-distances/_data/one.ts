import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HD_ONE_NOTE: SubtopicNote = {
  subtopicName: "One Line of Sight",
  title: "One Line of Sight",
  oneLineDefinition:
    "One right triangle: an object's height, a distance along the ground and the angle between them, or a ladder, rope or wire that is the slant side.",
  whyItMatters:
    "Ten questions in the bank, all EASY. Four use tan to find a height, a distance, a shadow or the sun's angle, and six give a ladder, a pole, a rope, a wire, a string or a ramp as the slant side. Each is one ratio at 30°, 45° or 60°, so the work is picking the right ratio, not the arithmetic.",
  related: [{ label: "Trigonometry: standard values", href: "/notes/ssc-cgl-maths/trigonometry/ssc-tg-values" }],
  concepts: [
    {
      kind: "formula" as const,
      slug: "sschdon-tan",
      name: "Height and ground distance from one angle",
      intuition:
        "A tower, its shadow or the ground up to an observer, and the line of sight make a right triangle. The height is the side opposite the angle and the ground distance the side next to it, so tan links them and nothing else is needed.",
      definition:
        "- The **angle of elevation** is the angle between the level ground (the horizontal) and your line of sight when you look up at something.\n" +
        "- The **angle of depression** is the angle between the horizontal and your line of sight when you look down. It is measured from the horizontal, never from the vertical.\n" +
        "- The angle of depression from the top of a tower to a point on the ground equals the angle of elevation of the tower top from that point, because the two horizontals are parallel.\n" +
        "- **Height \\(=\\) distance \\(\\times \\tan\\theta\\)**, and **distance \\(=\\) height \\(\\div \\tan\\theta\\)**. A shadow is the ground distance, with \\(\\theta\\) the sun's elevation.\n" +
        "- The three values you need: \\(\\tan 30^\\circ = \\frac{1}{\\sqrt{3}}\\), \\(\\tan 45^\\circ = 1\\), \\(\\tan 60^\\circ = \\sqrt{3}\\).\n" +
        "- **Fast route:** at 45° the height equals the distance. At 60° the height is \\(\\sqrt{3}\\) times the distance, and at 30° the distance is \\(\\sqrt{3}\\) times the height. When the options are decimals, use \\(\\sqrt{3} \\approx 1.732\\).",
      formula: {
        label: "Height and distance from the angle of elevation",
        latex: "h = d \\tan\\theta \\qquad d = \\frac{h}{\\tan\\theta} \\qquad \\tan\\theta = \\frac{h}{d}",
        symbols: [
          { symbol: "h", meaning: "the height of the object" },
          { symbol: "d", meaning: "the distance along the ground to its foot, or the length of its shadow" },
          { symbol: "θ", meaning: "the angle of elevation (or of depression, seen from the top)" },
        ],
      },
      authoredExample: {
        prompt: "From a point 45 m from the foot of a tower, the angle of elevation of its top is 30°. Find the height of the tower.",
        steps: [
          "The 45 m is next to the angle and the height is opposite it, so use tan.",
          "\\(h = 45 \\tan 30^\\circ = \\frac{45}{\\sqrt{3}} = 15\\sqrt{3}\\) m.",
          "As a decimal: \\(15 \\times 1.732 \\approx 25.98\\) m.",
        ],
        answer: "\\(15\\sqrt{3}\\) m, about 26 m",
      },
      selfCheckExample: {
        prompt: "A pole \\(6\\sqrt{3}\\) m tall casts a shadow 18 m long. What is the angle of elevation of the sun?",
        steps: ["\\(\\tan\\theta = \\frac{6\\sqrt{3}}{18} = \\frac{\\sqrt{3}}{3} = \\frac{1}{\\sqrt{3}}\\).", "So \\(\\theta = 30^\\circ\\)."],
        answer: "30°",
      },
      practiceSet: [
        { prompt: "A tower casts a shadow 25 m long when the sun's elevation is 45°. How tall is the tower?", answer: "25 m" },
        { prompt: "The top of a 36 m building is seen at an elevation of 60° from a point on the ground. How far is the point from the building?", answer: "\\(12\\sqrt{3}\\) m", method: "\\(\\frac{36}{\\sqrt{3}} = 12\\sqrt{3}\\)." },
        { prompt: "From the top of a 40 m cliff, the angle of depression of a boat is 30°. How far is the boat from the foot of the cliff?", answer: "\\(40\\sqrt{3}\\) m" },
        { prompt: "Taking \\(\\sqrt{3} = 1.732\\), find the height of a tree whose top is seen at 60° from a point 20 m from its foot.", answer: "34.64 m" },
      ],
      pyqExampleId: "18e0cec4-90de-441a-a017-52e746b66795",
      traps: [
        {
          title: "Measuring the angle of depression from the vertical",
          body:
            "The angle of depression is between the horizontal and the line of sight. A depression of 30° means the line of sight makes 60° with the vertical, and using 60° gives the wrong triangle.",
        },
        {
          title: "Swapping the 30° and 60° ratios",
          body:
            "\\(\\tan 60^\\circ = \\sqrt{3}\\) and \\(\\tan 30^\\circ = \\frac{1}{\\sqrt{3}}\\). A higher sun means a larger angle and a shorter shadow, so at 60° the shadow is shorter than the height.",
        },
        {
          title: "Expecting an exact answer when the options are rounded",
          body:
            "SSC sometimes asks for an approximate distance and prints \\(500\\sqrt{3}\\) as 866. Work exactly, then multiply by 1.732 at the end.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sschdon-slant",
      name: "A ladder, rope or wire as the slant side",
      intuition:
        "When the question gives the length of something slanting (a ladder, a rope, a kite string, a ramp, a wire), that length is the hypotenuse. Sin then links it to the height, and cos links it to the ground distance.",
      definition:
        "- **Height reached \\(=\\) length \\(\\times \\sin\\theta\\)**, where \\(\\theta\\) is the angle with the ground.\n" +
        "- **Ground distance \\(=\\) length \\(\\times \\cos\\theta\\)**: how far the foot is from the wall or the pole.\n" +
        "- Going the other way, length \\(=\\) height \\(\\div \\sin\\theta\\) or ground distance \\(\\div \\cos\\theta\\).\n" +
        "- The values you need: \\(\\sin 30^\\circ = \\cos 60^\\circ = \\frac{1}{2}\\), \\(\\sin 60^\\circ = \\cos 30^\\circ = \\frac{\\sqrt{3}}{2}\\), \\(\\sin 45^\\circ = \\cos 45^\\circ = \\frac{1}{\\sqrt{2}}\\).\n" +
        "- **Fast route, the special triangles:** in a 30°, 60°, 90° triangle the sides are in the ratio \\(1 : \\sqrt{3} : 2\\), so the side opposite 30° is half the slant side. In a 45°, 45°, 90° triangle they are \\(1 : 1 : \\sqrt{2}\\), so the slant side is \\(\\sqrt{2}\\) times the height.\n" +
        "- An angle given with the wall is the complement of the angle with the ground: 30° with the wall is 60° with the ground.",
      formula: {
        label: "Slant side, height and ground distance",
        latex: "h = L\\sin\\theta \\qquad d = L\\cos\\theta \\qquad L = \\frac{h}{\\sin\\theta} = \\frac{d}{\\cos\\theta}",
        symbols: [
          { symbol: "L", meaning: "the slanting length: ladder, rope, wire or ramp" },
          { symbol: "θ", meaning: "the angle the slant side makes with the ground" },
        ],
      },
      authoredExample: {
        prompt:
          "A ladder 14 m long leans against a wall and makes an angle of 60° with the ground. How high up the wall does it reach, and how far is its foot from the wall?",
        steps: [
          "The ladder is the slant side, \\(L = 14\\).",
          "Height \\(= 14 \\sin 60^\\circ = 14 \\times \\frac{\\sqrt{3}}{2} = 7\\sqrt{3}\\) m.",
          "Foot \\(= 14 \\cos 60^\\circ = 14 \\times \\frac{1}{2} = 7\\) m.",
          "Check: \\(7^2 + (7\\sqrt{3})^2 = 49 + 147 = 196 = 14^2\\).",
        ],
        answer: "\\(7\\sqrt{3}\\) m up the wall, 7 m from it",
      },
      selfCheckExample: {
        prompt:
          "A wire is tied to the top of a 9 m pole and pegged to the ground so that it makes 45° with the ground. Find the length of the wire.",
        steps: ["\\(L = \\frac{9}{\\sin 45^\\circ} = 9\\sqrt{2}\\) m.", "As a decimal: \\(9 \\times 1.414 \\approx 12.73\\) m."],
        answer: "\\(9\\sqrt{2}\\) m, about 12.7 m",
      },
      practiceSet: [
        { prompt: "A slide rises 2 m and makes 30° with the ground. How long is the slide?", answer: "4 m" },
        { prompt: "A rope 16 m long is tied to the top of a pole and makes 60° with the ground. How tall is the pole?", answer: "\\(8\\sqrt{3}\\) m" },
        { prompt: "A ladder 12 m long makes 60° with the ground. How far is its foot from the wall?", answer: "6 m" },
        { prompt: "A balloon is held by a cord 50 m long that makes 30° with the ground. How high is the balloon?", answer: "25 m" },
      ],
      pyqExampleId: "e5f0d420-0d5e-4347-b778-47573f75b0f6",
      traps: [
        {
          title: "Using tan when the slant length is given",
          body:
            "When the length of the ladder or rope is known, it is the hypotenuse, so the ratio is sin (for the height) or cos (for the ground distance). Tan links height and ground distance only.",
        },
        {
          title: "Reading the angle with the wall as the angle with the ground",
          body:
            "A ladder at 30° to the wall is at 60° to the ground. Its height up the wall is then \\(L\\sin 60^\\circ\\), not \\(L\\sin 30^\\circ\\).",
        },
        {
          title: "Rounding too early when the answer is to the nearest metre",
          body:
            "\\(5\\sqrt{2}\\) is about 7.07, so it rounds to 7. Rounding \\(\\sqrt{2}\\) to 1.5 first gives 7.5, which rounds to 8 and picks the wrong option.",
        },
      ],
    },
  ],
};

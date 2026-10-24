import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_HD_SLANT_NOTE: SubtopicNote = {
  subtopicName: "Kites, Ropes and Slopes",
  title: "Kites, Ropes and Slopes",
  oneLineDefinition:
    "When a kite string, a rope, a slide or a ramp is the slanting side of the triangle, it is the hypotenuse, and sin or cos joins it to the height or the ground distance.",
  whyItMatters:
    "Eleven questions in the bank, seven EASY and four MODERATE. In the EASY ones a string, rope, slide or ramp is the slanting side, so the ratio is sin or cos instead of tan. The four MODERATE ones hide the triangle: a wire between two poles, a broken tree, or a line drawn inside a rectangle.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spihdsl-hypotenuse",
      name: "The slanting side is the hypotenuse",
      intuition:
        "A tight string from a kite to the ground, a rope from a pole top to the ground, a slide or a ramp: each runs along the slanting side of a right triangle. That side is the hypotenuse, so the height opposite the angle uses sin and the ground distance next to it uses cos.",
      definition:
        "- Height \\(=\\) slant length \\(\\times \\sin\\theta\\), so slant length \\(=\\) height \\(\\div \\sin\\theta\\).\n" +
        "- Ground distance \\(=\\) slant length \\(\\times \\cos\\theta\\).\n" +
        "- \\(\\theta\\) is the angle the slant side makes with the **ground**.\n" +
        "- 'No slack' or 'tightly stretched' means the string is a straight line, so the triangle is exact.",
      formula: {
        label: "Height and ground distance from a slant length",
        latex: "h = L\\sin\\theta, \\qquad d = L\\cos\\theta, \\qquad L = \\frac{h}{\\sin\\theta}",
        symbols: [
          { symbol: "L", meaning: "the slant length (string, rope, slide, ramp)" },
          { symbol: "h", meaning: "the height of its top end" },
          { symbol: "d", meaning: "the ground distance it covers" },
        ],
      },
      authoredExample: {
        prompt: "A kite is flying at a height of 45 m and its string makes an angle of \\(60^\\circ\\) with the ground. Find the length of the string.",
        steps: [
          "The string is the hypotenuse: \\(\\sin 60^\\circ = \\dfrac{45}{L}\\).",
          "\\(L = \\dfrac{45}{\\sqrt{3}/2} = \\dfrac{90}{\\sqrt{3}} = 30\\sqrt{3}\\) m.",
        ],
        answer: "\\(30\\sqrt{3}\\) m (about 52 m)",
      },
      selfCheckExample: {
        prompt: "A rope 16 m long is stretched tight from the top of a pole to the ground and makes \\(30^\\circ\\) with the ground. Find the height of the pole.",
        steps: ["\\(h = 16 \\sin 30^\\circ = 16 \\times \\frac{1}{2} = 8\\) m."],
        answer: "8 m",
      },
      practiceSet: [
        {
          prompt: "A 20 m ladder leans against a wall and makes \\(60^\\circ\\) with the ground. How far is its foot from the wall?",
          answer: "\\(20\\cos 60^\\circ = 10\\) m",
        },
        {
          prompt: "A kite string is 50 m long and the kite is 25 m above the ground. What angle does the string make with the ground?",
          answer: "\\(\\sin\\theta = \\frac{1}{2}\\), so \\(30^\\circ\\)",
        },
        { prompt: "A ramp must rise 3 m at a slope of \\(45^\\circ\\). How long is the ramp?", answer: "\\(\\frac{3}{\\sin 45^\\circ} = 3\\sqrt{2}\\) m" },
      ],
      pyqExampleId: "f49c4b78-6aa9-4992-aae4-c399f167dd2c",
      traps: [
        {
          title: "Using tan with a slant length",
          body:
            "tan joins the height and the ground distance only. When the string or rope length is given or asked, the hypotenuse is involved, so use sin or cos.",
        },
        {
          title: "Swapping sin and cos",
          body:
            "The angle sits at the ground. The height is across from it (sin) and the ground distance touches it (cos). A 30 m ladder at \\(30^\\circ\\) reaches 15 m up the wall, and its foot is \\(15\\sqrt{3}\\) m out.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spihdsl-shapes",
      name: "Finding the triangle in a wire, a broken tree or a rectangle",
      intuition:
        "Some questions draw no triangle at all. Make one: a wire between two pole tops rises only by the difference in their heights; a broken tree is a standing part plus a fallen part leaning to the ground; a line across a rectangle cuts off a right triangle at a corner.",
      definition:
        "- **Wire between two poles:** draw a horizontal line from the top of the shorter pole. The upright side of the triangle is the **difference** in heights, and the wire is the hypotenuse.\n" +
        "- **Broken tree:** the standing part is upright, the broken part is the hypotenuse, and the gap from the foot to where the top touches is the ground side. The full height is standing part plus broken part.\n" +
        "- **Rectangle:** every corner is a right angle, so a line from one corner to a side makes a right triangle with two sides of the rectangle. Opposite sides are equal.",
      authoredExample: {
        prompt: "The tops of two poles 18 m and 10 m high are joined by a wire that makes \\(30^\\circ\\) with the horizontal. Find the length of the wire.",
        steps: [
          "The wire rises \\(18 - 10 = 8\\) m.",
          "\\(\\sin 30^\\circ = \\dfrac{8}{L}\\), so \\(L = 8 \\div \\frac{1}{2} = 16\\) m.",
        ],
        answer: "16 m",
      },
      selfCheckExample: {
        prompt: "A tree breaks so that its top touches the ground 12 m from its foot, the broken part making \\(60^\\circ\\) with the ground. Find the height of the part still standing.",
        steps: [
          "The standing part is opposite the \\(60^\\circ\\) angle and the 12 m gap is next to it.",
          "Standing part \\(= 12\\tan 60^\\circ = 12\\sqrt{3}\\) m.",
        ],
        answer: "\\(12\\sqrt{3}\\) m",
      },
      practiceSet: [
        {
          prompt: "A tree breaks so that its top touches the ground 8 m from its foot, and the broken part makes \\(45^\\circ\\) with the ground. How long is the broken part?",
          answer: "\\(\\frac{8}{\\cos 45^\\circ} = 8\\sqrt{2}\\) m",
        },
        {
          prompt: "The tops of poles 25 m and 15 m high are joined by a wire at \\(45^\\circ\\) to the horizontal. How long is the wire?",
          answer: "\\(\\frac{10}{\\sin 45^\\circ} = 10\\sqrt{2}\\) m",
        },
        {
          prompt: "A rectangle's diagonal makes \\(30^\\circ\\) with its longer side, which is 12 cm. How long is the shorter side?",
          answer: "\\(12\\tan 30^\\circ = 4\\sqrt{3}\\) cm",
        },
      ],
      pyqExampleId: "7603e57b-de0f-4449-a4de-419924f5053a",
      traps: [
        {
          title: "Using the taller pole's full height",
          body:
            "A wire between poles of 20 m and 12 m rises only 8 m. The ground below the shorter pole's top is not part of the triangle.",
        },
        {
          title: "Calling the broken part the whole tree",
          body:
            "The broken part is only the hypotenuse. If the question asks for the tree's height before it broke, add the standing part to the broken part.",
        },
      ],
    },
  ],
};

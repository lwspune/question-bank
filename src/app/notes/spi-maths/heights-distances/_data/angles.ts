import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_HD_ANGLES_NOTE: SubtopicNote = {
  subtopicName: "Angles of Elevation and Depression",
  title: "Angles of Elevation and Depression",
  oneLineDefinition:
    "An angle of elevation is how far you look up from the horizontal to see an object, an angle of depression is how far you look down, and tan links the height to the distance along the ground.",
  whyItMatters:
    "Eleven questions in the bank, all EASY. Ten are one right triangle with an upright height and flat ground, solved with tan: find a height, a distance or the angle. Five of those are a pole and its shadow under the sun, and the eleventh asks for the instrument that measures these angles.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spihdan-terms",
      name: "Line of sight, elevation and depression",
      intuition:
        "The **line of sight** is the straight line from your eye to the object. If the object is above you, the angle between that line and the horizontal is the **angle of elevation**. If it is below you, as when you look down from a tower, the angle is the **angle of depression**.",
      definition:
        "- Both angles are measured from the **horizontal** at the eye, never from the vertical.\n" +
        "- The angle of depression from the top equals the angle of elevation from the ground point. The horizontal at the top and the ground are parallel, so these are alternate angles.\n" +
        "- So a depression question becomes the usual triangle: put the same angle at the ground point.\n" +
        "- A **clinometer** (inclinometer) is the instrument that measures these angles.",
      formula: {
        label: "Depression equals elevation",
        latex: "\\text{angle of depression from the top} = \\text{angle of elevation from the ground point}",
      },
      authoredExample: {
        prompt: "From the top of a cliff 60 m high, the angle of depression of a boat is \\(30^\\circ\\). How far is the boat from the foot of the cliff?",
        steps: [
          "The angle of elevation of the cliff top from the boat is also \\(30^\\circ\\).",
          "\\(\\tan 30^\\circ = \\dfrac{60}{d}\\), so \\(d = 60 \\div \\dfrac{1}{\\sqrt{3}} = 60\\sqrt{3}\\) m.",
        ],
        answer: "\\(60\\sqrt{3}\\) m (about 103.9 m)",
      },
      selfCheckExample: {
        prompt: "From the top of a lighthouse 50 m high, the angle of depression of a ship is \\(45^\\circ\\). How far is the ship from the lighthouse?",
        steps: ["The elevation from the ship is \\(45^\\circ\\), and \\(\\tan 45^\\circ = 1\\).", "So the distance equals the height: 50 m."],
        answer: "50 m",
      },
      practiceSet: [
        {
          prompt: "What is the angle between the line of sight and the horizontal called when the object is above the eye?",
          answer: "The angle of elevation",
        },
        {
          prompt: "A bird on top of a 12 m pole sees a worm on the ground at an angle of depression of \\(30^\\circ\\). How far is the worm from the foot of the pole?",
          answer: "\\(12 \\div \\frac{1}{\\sqrt{3}} = 12\\sqrt{3}\\) m",
        },
        {
          prompt: "A man on the ground sees the top of a tower at an angle of elevation of \\(35^\\circ\\). At what angle of depression does a person at the top see the man?",
          answer: "\\(35^\\circ\\)",
        },
      ],
      pyqExampleId: "e9a4506c-df41-46c0-b76e-d87c54c0fd0d",
      traps: [
        {
          title: "Measuring depression from the tower",
          body:
            "The angle of depression is measured down from the horizontal at the eye. The angle between the line of sight and the upright tower is \\(90^\\circ\\) minus it, so using that angle swaps tan for cot.",
        },
        {
          title: "Putting the depression angle at the top of the triangle",
          body:
            "Inside the triangle, the angle at the top is not the angle of depression. Move the angle to the ground point, where it becomes the angle of elevation, and work from there.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spihdan-tan",
      name: "Height and distance through tan",
      intuition:
        "The height stands upright on flat ground, so the height, the ground distance and the line of sight make a right triangle. The height is opposite the angle and the ground distance is next to it, so tan joins them.",
      definition:
        "- \\(\\tan\\theta = \\dfrac{\\text{height}}{\\text{distance}}\\).\n" +
        "- Height \\(=\\) distance \\(\\times \\tan\\theta\\); distance \\(=\\) height \\(\\div \\tan\\theta\\).\n" +
        "- Given both lengths, find \\(\\tan\\theta\\) and read the angle from the table: \\(\\frac{1}{\\sqrt{3}}\\) is \\(30^\\circ\\), 1 is \\(45^\\circ\\), \\(\\sqrt{3}\\) is \\(60^\\circ\\).\n" +
        "- The distance is measured along the ground to the **foot** of the height.",
      formula: {
        label: "Height and ground distance",
        latex: "\\tan\\theta = \\frac{h}{d}, \\qquad h = d\\tan\\theta, \\qquad d = \\frac{h}{\\tan\\theta}",
        symbols: [
          { symbol: "h", meaning: "the upright height" },
          { symbol: "d", meaning: "the distance along the ground to its foot" },
        ],
      },
      authoredExample: {
        prompt: "The top of a tower is seen at an angle of elevation of \\(60^\\circ\\) from a point 25 m from its foot. Find the height of the tower.",
        steps: ["\\(h = d\\tan 60^\\circ = 25 \\times \\sqrt{3}\\).", "\\(h = 25\\sqrt{3}\\) m, about 43.3 m."],
        answer: "\\(25\\sqrt{3}\\) m",
      },
      selfCheckExample: {
        prompt: "A tower \\(30\\sqrt{3}\\) m high is seen from a point 30 m from its foot. Find the angle of elevation of its top.",
        steps: ["\\(\\tan\\theta = \\dfrac{30\\sqrt{3}}{30} = \\sqrt{3}\\).", "So \\(\\theta = 60^\\circ\\)."],
        answer: "\\(60^\\circ\\)",
      },
      practiceSet: [
        { prompt: "A tree is seen at an angle of elevation of \\(45^\\circ\\) from a point 18 m from its foot. How tall is the tree?", answer: "18 m" },
        {
          prompt: "The top of a 10 m pole is seen at an angle of elevation of \\(30^\\circ\\) from a point on the ground. How far is the point from the pole?",
          answer: "\\(10\\sqrt{3}\\) m",
        },
        { prompt: "A building 40 m high is seen from a point 40 m from its foot. What is the angle of elevation of its top?", answer: "\\(45^\\circ\\)" },
      ],
      pyqExampleId: "64cb58e5-1ded-4e5a-8a46-4efea4a28376",
      traps: [
        {
          title: "Turning tan upside down",
          body:
            "\\(\\tan\\theta\\) is height over distance. Writing distance over height gives \\(\\cot\\theta\\), and with it the other standard angle: \\(60^\\circ\\) where the answer is \\(30^\\circ\\).",
        },
        {
          title: "Dividing when you should multiply",
          body:
            "To find a height, multiply the distance by \\(\\tan\\theta\\). To find a distance, divide the height by it. A quick check: at \\(45^\\circ\\) the two are equal, and above \\(45^\\circ\\) the height is the longer one.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spihdan-shadow",
      name: "The sun's elevation and a shadow",
      intuition:
        "Sunlight comes in straight lines. The pole, its shadow on the ground and the ray from the top of the pole to the tip of the shadow make a right triangle, and the angle at the tip of the shadow is the sun's elevation (its **altitude**).",
      definition:
        "- \\(\\tan(\\text{sun's elevation}) = \\dfrac{\\text{height of the object}}{\\text{length of its shadow}}\\).\n" +
        "- A ratio of height to shadow of \\(1 : \\sqrt{3}\\) gives \\(30^\\circ\\); \\(1 : 1\\) gives \\(45^\\circ\\); \\(\\sqrt{3} : 1\\) gives \\(60^\\circ\\).\n" +
        "- The higher the sun, the shorter the shadow.",
      formula: {
        label: "Sun's elevation from a shadow",
        latex: "\\tan\\theta = \\frac{\\text{height}}{\\text{shadow}}",
      },
      authoredExample: {
        prompt: "A tower 21 m high casts a shadow \\(21\\sqrt{3}\\) m long. Find the sun's elevation.",
        steps: ["\\(\\tan\\theta = \\dfrac{21}{21\\sqrt{3}} = \\dfrac{1}{\\sqrt{3}}\\).", "So \\(\\theta = 30^\\circ\\)."],
        answer: "\\(30^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "When the sun's elevation is \\(45^\\circ\\), a building casts a shadow 14 m long. How tall is the building?",
        steps: ["\\(\\text{height} = 14 \\times \\tan 45^\\circ = 14\\) m."],
        answer: "14 m",
      },
      practiceSet: [
        { prompt: "The sun's elevation is \\(30^\\circ\\). How long is the shadow of a 5 m pole?", answer: "\\(5\\sqrt{3}\\) m" },
        { prompt: "A pole and its shadow have the same length. What is the sun's elevation?", answer: "\\(45^\\circ\\)" },
        { prompt: "The ratio of a pole's height to the length of its shadow is \\(\\sqrt{3} : 1\\). What is the sun's elevation?", answer: "\\(60^\\circ\\)" },
      ],
      pyqExampleId: "3c4d8474-704e-40d9-9431-f6395dc053a3",
      traps: [
        {
          title: "Reading the ratio the wrong way",
          body:
            "Height to shadow \\(1 : \\sqrt{3}\\) means the shadow is longer, so the sun is low: \\(30^\\circ\\). Reading it as shadow to height gives \\(60^\\circ\\), which is printed as a wrong option.",
        },
        {
          title: "A high sun does not lengthen the shadow",
          body:
            "As the sun's elevation grows from \\(30^\\circ\\) to \\(60^\\circ\\), the shadow of the same pole shrinks to a third of its length. A bigger angle always means a shorter shadow.",
        },
      ],
    },
  ],
};

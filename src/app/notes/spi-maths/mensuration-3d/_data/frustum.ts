import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_M3_FRUSTUM_NOTE: SubtopicNote = {
  subtopicName: "Combined Solids and the Frustum",
  title: "Combined Solids and the Frustum",
  oneLineDefinition:
    "A joined solid's volume is the sum of its parts and its surface is only what shows outside; a frustum is the piece of a cone left when its top is cut off parallel to the base.",
  whyItMatters:
    "Eleven questions in the bank, the hardest page of the chapter: nine MODERATE, one HARD and one EASY. Ice-cream cones, toys, buildings with a conical roof, buckets and glasses: each needs the formulas of the last two pages put together, plus the frustum's own three.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spim3fr-combined",
      name: "Solids joined together",
      intuition:
        "Glue a cone onto a half-ball and you get a toy. To fill it you need both volumes added. To paint it you paint only what you can see: the circle where the two pieces meet is hidden inside.",
      definition:
        "- **Volume** of a joined solid \\(=\\) the volumes of its parts added.\n" +
        "- **Surface** \\(=\\) only the outside. Faces glued together are hidden and are not counted.\n" +
        "- Cone on a hemisphere: \\(\\pi rl + 2\\pi r^2\\). Cylinder with a conical top (a tent or a building): \\(2\\pi rh + \\pi rl\\), plus \\(\\pi r^2\\) only if the floor is asked for.\n" +
        "- A cone whose **vertical angle is a right angle** has a half-angle of \\(45^\\circ\\), so its height equals its radius and \\(l = r\\sqrt{2}\\).",
      formula: {
        label: "Cone on a hemisphere",
        latex: "V = \\frac{1}{3}\\pi r^2 h + \\frac{2}{3}\\pi r^3, \\qquad S = \\pi rl + 2\\pi r^2",
      },
      authoredExample: {
        prompt: "A toy is a cone of radius 3 cm and height 4 cm standing on a hemisphere of the same radius. Find its volume and its surface area, in terms of π.",
        steps: [
          "Cone: \\(\\frac{1}{3}\\pi \\times 9 \\times 4 = 12\\pi\\). Hemisphere: \\(\\frac{2}{3}\\pi \\times 27 = 18\\pi\\). Volume \\(= 30\\pi\\) cubic cm.",
          "Slant height \\(l = \\sqrt{9 + 16} = 5\\) cm.",
          "Surface \\(= \\pi \\times 3 \\times 5 + 2\\pi \\times 9 = 15\\pi + 18\\pi = 33\\pi\\) square cm.",
        ],
        answer: "\\(30\\pi\\) cubic cm and \\(33\\pi\\) square cm",
      },
      selfCheckExample: {
        prompt:
          "A tent is a cylinder of radius 7 m and height 3 m with a cone of the same radius and slant height 10 m on top. How much canvas is needed? (No floor.)",
        steps: [
          "Cylinder wall: \\(2 \\times \\frac{22}{7} \\times 7 \\times 3 = 132\\) square m.",
          "Cone: \\(\\frac{22}{7} \\times 7 \\times 10 = 220\\) square m.",
          "Canvas \\(= 132 + 220 = 352\\) square m.",
        ],
        answer: "352 square m",
      },
      practiceSet: [
        {
          prompt: "A solid is a cylinder of radius 3 cm and height 10 cm with a cone of the same radius and height 4 cm on top. What is its volume, in terms of π?",
          answer: "\\(90\\pi + 12\\pi = 102\\pi\\) cubic cm",
        },
        {
          prompt: "A capsule is a cylinder of radius 2 cm and length 6 cm with a hemisphere on each end. What is its volume, in terms of π?",
          answer: "\\(24\\pi + \\frac{32\\pi}{3} = \\frac{104\\pi}{3}\\) cubic cm",
        },
        { prompt: "A cone has a vertical angle of 90° and a base radius of 5 cm. What is its height?", answer: "5 cm" },
      ],
      pyqExampleId: "497ab924-d37c-4743-94f6-1cdf829186ff",
      traps: [
        {
          title: "Counting the glued faces",
          body:
            "A cone on a hemisphere shows the cone's curved surface and the hemisphere's curved surface: \\(\\pi rl + 2\\pi r^2\\). Writing \\(3\\pi r^2\\) for the hemisphere counts a flat face that is glued out of sight.",
        },
        {
          title: "A right vertical angle is the whole angle",
          body:
            "The vertical angle is measured across the tip. If it is \\(90^\\circ\\), each side makes \\(45^\\circ\\) with the axis, so the height equals the radius.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spim3fr-frustum",
      name: "The frustum: buckets and glasses",
      intuition:
        "A bucket or a drinking glass is a cone with its tip cut off: two circles of different sizes joined by a sloping side. It has its own slant height, curved surface and volume formulas.",
      definition:
        "- **Slant height**: \\(l = \\sqrt{h^2 + (R - r)^2}\\), using the **difference** of the radii.\n" +
        "- **Curved surface** \\(= \\pi(R + r)l\\).\n" +
        "- **Volume** \\(= \\frac{1}{3}\\pi h(R^2 + r^2 + Rr)\\).\n" +
        "- A **bucket** is open at the top: its metal is the curved surface plus the smaller bottom circle, \\(\\pi(R + r)l + \\pi r^2\\).\n" +
        "- Capacity in litres: divide cubic cm by 1000.",
      formula: {
        label: "Frustum",
        latex: "l = \\sqrt{h^2 + (R - r)^2}, \\quad \\text{CSA} = \\pi(R + r)l, \\quad V = \\frac{1}{3}\\pi h(R^2 + r^2 + Rr)",
        symbols: [
          { symbol: "R, r", meaning: "radii of the larger and the smaller circular ends" },
          { symbol: "h", meaning: "vertical height" },
          { symbol: "l", meaning: "slant height" },
        ],
      },
      authoredExample: {
        prompt: "A bucket has end radii 10 cm and 4 cm and is 8 cm high. Find its slant height, curved surface area and volume. (Use π = 3.14.)",
        steps: [
          "\\(l = \\sqrt{8^2 + (10 - 4)^2} = \\sqrt{64 + 36} = 10\\) cm.",
          "\\(\\text{CSA} = 3.14 \\times (10 + 4) \\times 10 = 439.6\\) square cm.",
          "\\(V = \\frac{1}{3} \\times 3.14 \\times 8 \\times (100 + 16 + 40) = 3.14 \\times \\frac{8 \\times 156}{3} = 3.14 \\times 416 = 1306.24\\) cubic cm.",
        ],
        answer: "10 cm, 439.6 square cm, 1306.24 cubic cm",
      },
      selfCheckExample: {
        prompt: "A frustum has end radii 14 cm and 7 cm and height 6 cm. Find its volume.",
        steps: [
          "\\(R^2 + r^2 + Rr = 196 + 49 + 98 = 343\\).",
          "\\(V = \\frac{1}{3} \\times \\frac{22}{7} \\times 6 \\times 343 = \\frac{22}{7} \\times 2 \\times 343 = 2156\\) cubic cm.",
        ],
        answer: "2156 cubic cm",
      },
      practiceSet: [
        { prompt: "A frustum has end radii 8 cm and 5 cm and height 4 cm. What is its slant height?", answer: "\\(\\sqrt{16 + 9} = 5\\) cm" },
        { prompt: "A frustum has end radii 2 cm and 5 cm and slant height 7 cm. What is its curved surface area?", answer: "\\(\\frac{22}{7} \\times 7 \\times 7 = 154\\) square cm" },
        { prompt: "A bucket holds 28 600 cubic cm of water. How many litres is that?", answer: "28.6 litres" },
        {
          prompt: "An open bucket has end radii 6 cm (top) and 3 cm (bottom) and slant height 5 cm. How much metal is used, in terms of π?",
          answer: "\\(\\pi \\times 9 \\times 5 + \\pi \\times 9 = 54\\pi\\) square cm",
        },
      ],
      pyqExampleId: "2d8de001-96d7-4553-ab72-13dd00739b01",
      traps: [
        {
          title: "Adding the radii in the slant height",
          body: "The slant height uses the difference: \\(\\sqrt{h^2 + (R - r)^2}\\). The sum \\(R + r\\) belongs in the curved surface, not here.",
        },
        {
          title: "Closing the top of a bucket",
          body: "A bucket is open at the top. Its metal is the curved surface plus the smaller bottom circle only, not both circles.",
        },
        {
          title: "Leaving the capacity in cubic cm",
          body: "If the options are in litres, divide by 1000: 45 600 cubic cm is 45.6 litres.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spim3fr-cut",
      name: "A cone cut parallel to its base",
      intuition:
        "Slice the top off a cone with a cut parallel to the base. The little cone you remove is a smaller copy of the whole one, so the scaling rule from spheres works here too.",
      definition:
        "- The small top cone is **similar** to the whole cone: its height and radius are the same fraction \\(k\\) of the whole cone's.\n" +
        "- Its volume is \\(k^3\\) of the whole, so from a volume fraction take the **cube root**.\n" +
        "- \\(k\\) gives the small cone's height, measured from the tip. The cut is \\(H - kH\\) above the base.",
      formula: {
        label: "Similar top cone",
        latex: "\\frac{h}{H} = \\frac{r}{R} = k, \\qquad \\frac{V_{\\text{top}}}{V} = k^3",
      },
      authoredExample: {
        prompt: "A cone 24 cm high is cut parallel to its base so that the small top cone has \\(\\frac{1}{8}\\) of the volume. How high above the base is the cut?",
        steps: [
          "\\(k^3 = \\frac{1}{8}\\), so \\(k = \\frac{1}{2}\\).",
          "The small cone is \\(\\frac{1}{2} \\times 24 = 12\\) cm tall, measured from the tip.",
          "The cut is \\(24 - 12 = 12\\) cm above the base.",
        ],
        answer: "12 cm",
      },
      selfCheckExample: {
        prompt: "A cone of height 20 cm and base radius 10 cm is cut parallel to its base, 15 cm above the base. Find the radius of the cut face.",
        steps: [
          "The small top cone is \\(20 - 15 = 5\\) cm tall, so \\(k = \\frac{5}{20} = \\frac{1}{4}\\).",
          "Radius \\(= \\frac{1}{4} \\times 10 = 2.5\\) cm.",
        ],
        answer: "2.5 cm",
      },
      practiceSet: [
        { prompt: "A cone is cut parallel to its base halfway up its height. What fraction of its volume is the small top cone?", answer: "\\(\\frac{1}{8}\\)" },
        { prompt: "The small cone cut from the top of a cone has \\(\\frac{1}{64}\\) of its volume. What fraction of the height is it?", answer: "\\(\\frac{1}{4}\\)" },
        {
          prompt: "A cone 12 cm high is cut parallel to its base, leaving a top cone 4 cm high. What is the ratio of the top cone's volume to the frustum's volume?",
          answer: "\\(k = \\frac{1}{3}\\): \\(\\frac{1}{27} : \\frac{26}{27} = 1 : 26\\)",
        },
      ],
      pyqExampleId: "22d4ec68-56a3-4d09-b77b-3299fe42a01a",
      traps: [
        {
          title: "Measuring from the wrong end",
          body: "The cube root gives the height of the small cone, measured from the tip. The height of the cut above the base is the whole height minus that.",
        },
        {
          title: "Square root for a volume fraction",
          body: "A volume fraction needs the cube root. \\(\\frac{1}{8}\\) of the volume means half the height, not \\(\\frac{1}{\\sqrt{8}}\\).",
        },
      ],
    },
  ],
};

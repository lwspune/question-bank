import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_M3_CONES_NOTE: SubtopicNote = {
  subtopicName: "Cones",
  title: "Cones",
  oneLineDefinition:
    "A cone is built on one right triangle of radius, height and slant height; find the missing side, then use one third of the cylinder's volume or the fan-shaped curved surface.",
  whyItMatters:
    "10 questions in the Tier II bank, 8 EASY and 2 MODERATE. In nearly all of them the first step is the same: find the third side of the cone's right triangle.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2m3co-slant",
      name: "The cone's right triangle",
      intuition:
        "Cut a cone from its tip to the centre of its base and the cut face shows a right triangle: the radius along the floor, the height standing up, the slant height as the long side. Most cone stems give two of these, or their ratio, and Pythagoras gives the third.",
      definition:
        "- \\(l^2 = r^2 + h^2\\).\n" +
        "- Triples worth knowing: 3, 4, 5; 5, 12, 13; 7, 24, 25; 8, 15, 17; 20, 21, 29; 12, 35, 37.\n" +
        "- A ratio such as \\(r : h = 3 : 4\\) means \\(r = 3k\\), \\(h = 4k\\), \\(l = 5k\\); find \\(k\\) from the one number given.\n" +
        "- 'Curved surface is \\(n\\) times the base area' means \\(\\pi rl = n\\pi r^2\\), so \\(l = nr\\).",
      formula: {
        label: "Slant height and volume",
        latex: "l = \\sqrt{r^2 + h^2}, \\quad V = \\tfrac{1}{3}\\pi r^2 h",
      },
      authoredExample: {
        prompt: "A cone's radius and height are in the ratio 5 : 12 and its slant height is 26 cm. Find its volume.",
        steps: [
          "\\(r = 5k\\), \\(h = 12k\\), \\(l = 13k = 26\\), so \\(k = 2\\).",
          "\\(r = 10\\), \\(h = 24\\).",
          "Volume \\(= \\frac{1}{3}\\pi \\times 100 \\times 24 = 800\\pi\\ \\text{cm}^3\\).",
        ],
        answer: "\\(800\\pi\\ \\text{cm}^3\\)",
      },
      selfCheckExample: {
        prompt: "A cone's curved surface is 3 times the area of its base, and its height is \\(8\\sqrt{2}\\) cm. Find its radius.",
        steps: ["\\(l = 3r\\), so \\(h^2 = 9r^2 - r^2 = 8r^2\\).", "\\(8r^2 = 128\\), so \\(r = 4\\) cm."],
        answer: "4 cm",
      },
      practiceSet: [
        { prompt: "Find the slant height of a cone of radius 7 cm and height 24 cm.", answer: "25 cm" },
        { prompt: "What is the volume of a cone whose radius is 12 cm and whose slant height is 37 cm?", answer: "\\(1680\\pi\\ \\text{cm}^3\\)", method: "\\(h = 35\\)" },
        { prompt: "A cone's height is 21 cm and its slant height is 29 cm. Find its radius.", answer: "20 cm" },
      ],
      pyqExampleId: "7e69528d-d7e1-447e-97ec-5f8b1ba959dc",
      traps: [
        {
          title: "Putting the slant height into the volume",
          body: "The volume uses the vertical height: \\(\\frac{1}{3}\\pi r^2 h\\). Using \\(l\\) in its place gives a volume that is too big.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2m3co-surface",
      name: "Cone surfaces, and a cone on a hemisphere",
      intuition:
        "A cone's curved surface unrolls into a fan whose area is \\(\\pi rl\\). A solid cone adds its base circle. On a toy made of two solids glued together, only the outside counts: the circle where they meet is hidden inside.",
      definition:
        "- Curved surface \\(= \\pi rl\\); total surface of a solid cone \\(= \\pi r(l + r)\\).\n" +
        "- Curved surface \\(\\div\\) base area \\(= \\frac{l}{r}\\).\n" +
        "- Cone on a hemisphere of the same radius: outer surface \\(= \\pi rl + 2\\pi r^2\\); volume \\(= \\frac{1}{3}\\pi r^2 h + \\frac{2}{3}\\pi r^3\\).",
      formula: {
        label: "Cone surfaces",
        latex: "\\text{CSA} = \\pi r l, \\quad \\text{TSA} = \\pi r(l + r)",
      },
      authoredExample: {
        prompt: "A solid cone has radius 9 cm and height 40 cm. Find its total surface area.",
        steps: ["\\(l = \\sqrt{81 + 1600} = 41\\) cm.", "Total \\(= \\pi \\times 9 \\times (41 + 9) = 450\\pi\\ \\text{cm}^2\\)."],
        answer: "\\(450\\pi\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "A toy is a cone of radius 5 cm and height 12 cm set on a hemisphere of the same radius. Find the toy's surface area.",
        steps: ["\\(l = 13\\), so the cone's curved surface is \\(65\\pi\\).", "The hemisphere's curved surface is \\(2\\pi \\times 25 = 50\\pi\\); total \\(115\\pi\\ \\text{cm}^2\\)."],
        answer: "\\(115\\pi\\ \\text{cm}^2\\)",
      },
      practiceSet: [
        { prompt: "A cone's base area is 154 cm² and its slant height is 10 cm. Find its curved surface. (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "\\(220\\ \\text{cm}^2\\)", method: "\\(r = 7\\)" },
        { prompt: "Find the volume of a cone of radius 14 cm and height 9 cm. (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "\\(1848\\ \\text{cm}^3\\)" },
        { prompt: "A toy is a cone of radius 3 cm and height 4 cm on a hemisphere of radius 3 cm. Find its volume.", answer: "\\(30\\pi\\ \\text{cm}^3\\)", method: "\\(12\\pi + 18\\pi\\)" },
      ],
      pyqExampleId: "13280260-a556-4d22-9ac4-dfcbf43110a5",
      traps: [
        {
          title: "Counting the circle where two solids join",
          body: "On a cone set on a hemisphere, the flat circle between them is inside the toy. The surface is \\(\\pi rl + 2\\pi r^2\\), with no \\(\\pi r^2\\) added for the joint.",
        },
      ],
    },
  ],
};

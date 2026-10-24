import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_M3_SPHERES_NOTE: SubtopicNote = {
  subtopicName: "Spheres and Hemispheres",
  title: "Spheres and Hemispheres",
  oneLineDefinition:
    "A sphere's surface is four times the area of its great circle and its volume is four thirds of π times the radius cubed; a hemisphere is exactly half the solid.",
  whyItMatters:
    "Nine questions in the bank, five EASY and four MODERATE, one of them from the 2022 paper. Each needs one of three formulas, or the rule that areas scale with the square of the radius and volumes with its cube. The usual slip is the flat face of a solid hemisphere.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spim3sp-sphere",
      name: "Surface area and volume of a sphere",
      intuition:
        "A sphere has one measurement, its radius. The surface needs the radius squared and the volume the radius cubed, so working back from a volume means taking a cube root.",
      definition:
        "- **Surface area** \\(= 4\\pi r^2\\).\n" +
        "- **Volume** \\(= \\frac{4}{3}\\pi r^3\\).\n" +
        "- If the diameter is given, halve it before using either formula.\n" +
        "- Working back from a volume: get \\(r^3\\) alone, then look for a perfect cube. \\(343 = 7^3\\), \\(9261 = 21^3\\), and a value ending in .875 or .125 is often a half-number cubed, such as \\(3.5^3 = 42.875\\).",
      formula: {
        label: "Sphere",
        latex: "S = 4\\pi r^2, \\qquad V = \\frac{4}{3}\\pi r^3",
      },
      authoredExample: {
        prompt: "A sphere has radius 7 cm. Find its surface area and its volume.",
        steps: [
          "\\(S = 4 \\times \\frac{22}{7} \\times 49 = 4 \\times 154 = 616\\) square cm.",
          "\\(V = \\frac{4}{3} \\times \\frac{22}{7} \\times 343 = \\frac{4}{3} \\times 1078 = \\frac{4312}{3} \\approx 1437.33\\) cubic cm.",
        ],
        answer: "616 square cm and about 1437.33 cubic cm",
      },
      selfCheckExample: {
        prompt: "A sphere has volume \\(288\\pi\\) cubic cm. Find its surface area.",
        steps: [
          "\\(\\frac{4}{3}\\pi r^3 = 288\\pi\\), so \\(r^3 = 216\\) and \\(r = 6\\) cm.",
          "\\(S = 4\\pi \\times 36 = 144\\pi\\) square cm.",
        ],
        answer: "\\(144\\pi\\) square cm",
      },
      practiceSet: [
        { prompt: "The surface area of a sphere is 1386 square cm. What is its radius?", answer: "\\(r^2 = 1386 \\times \\frac{7}{88} = 110.25\\), so 10.5 cm" },
        { prompt: "What is the volume of a sphere of radius 2 cm, in terms of π?", answer: "\\(\\frac{32\\pi}{3}\\) cubic cm" },
        { prompt: "The surface area of a sphere is \\(100\\pi\\) square cm. What is its radius?", answer: "5 cm" },
      ],
      pyqExampleId: "1038262b-c4bf-40c1-bbeb-0736c6f09b1b",
      traps: [
        {
          title: "Using the diameter as the radius",
          body: "A ball of diameter 14 cm has radius 7 cm. Putting 14 into \\(\\frac{4}{3}\\pi r^3\\) makes the volume 8 times too big.",
        },
        {
          title: "Answering with the radius when the diameter is asked",
          body: "After the cube root gives \\(r\\), check the question. If it asks for the diameter, double it; the radius is usually printed as a wrong option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spim3sp-hemisphere",
      name: "Surface area and volume of a hemisphere",
      intuition:
        "Cut a ball in half. Each half keeps half the curved skin, but the cut makes a brand new flat circle on each piece. A bowl has no flat face; a solid half-ball does.",
      definition:
        "- **Curved surface** \\(= 2\\pi r^2\\). This is all a hollow bowl has.\n" +
        "- **Total surface** of a solid hemisphere \\(= 2\\pi r^2 + \\pi r^2 = 3\\pi r^2\\).\n" +
        "- **Volume** \\(= \\frac{2}{3}\\pi r^3\\), half the sphere.\n" +
        "- Cutting a sphere into two halves adds two new circles: the two pieces together show \\(6\\pi r^2\\), more than the sphere's \\(4\\pi r^2\\).",
      formula: {
        label: "Hemisphere",
        latex: "\\text{CSA} = 2\\pi r^2, \\quad \\text{TSA} = 3\\pi r^2, \\quad V = \\frac{2}{3}\\pi r^3",
      },
      authoredExample: {
        prompt: "A solid hemisphere has radius 21 cm. Find its total surface area and its volume.",
        steps: [
          "\\(\\text{TSA} = 3 \\times \\frac{22}{7} \\times 441 = 3 \\times 1386 = 4158\\) square cm.",
          "\\(V = \\frac{2}{3} \\times \\frac{22}{7} \\times 9261 = \\frac{2}{3} \\times 29106 = 19404\\) cubic cm.",
        ],
        answer: "4158 square cm and 19404 cubic cm",
      },
      selfCheckExample: {
        prompt: "The volume of a hemisphere is \\(144\\pi\\) cubic cm. Find its radius.",
        steps: ["\\(\\frac{2}{3}\\pi r^3 = 144\\pi\\), so \\(r^3 = 216\\).", "\\(r = 6\\) cm."],
        answer: "6 cm",
      },
      practiceSet: [
        { prompt: "What is the curved surface area of a hemispherical bowl of radius 7 cm?", answer: "\\(2 \\times 154 = 308\\) square cm" },
        { prompt: "What is the total surface area of a solid hemisphere of radius 10 cm? (Use π = 3.14.)", answer: "\\(3 \\times 3.14 \\times 100 = 942\\) square cm" },
        { prompt: "A solid hemisphere has total surface area \\(75\\pi\\) square cm. What is its radius?", answer: "\\(r^2 = 25\\), so 5 cm" },
        { prompt: "A solid sphere of radius r is cut into two halves. How much new surface does the cut make?", answer: "Two circles: \\(2\\pi r^2\\)" },
      ],
      pyqExampleId: "2f4f83b1-06c3-453d-a6ad-2381b9c64a49",
      traps: [
        {
          title: "Bowl or solid",
          body: "A hollow bowl is \\(2\\pi r^2\\). A solid hemisphere also has its flat circle, so its total is \\(3\\pi r^2\\). Read whether the question says solid.",
        },
        {
          title: "A hemisphere is not half the sphere's surface",
          body:
            "Half of \\(4\\pi r^2\\) is \\(2\\pi r^2\\), the curved part only. A solid half also has its new flat face, so each half shows \\(3\\pi r^2\\), three quarters of the whole sphere's surface.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spim3sp-scaling",
      name: "Ratios and percent changes: square for area, cube for volume",
      intuition:
        "Double a ball's radius and its skin grows four times but the stuff inside grows eight times. Lengths, areas and volumes change by k, k squared and k cubed.",
      definition:
        "- If two spheres have radii in the ratio \\(k\\), their surfaces are in \\(k^2\\) and their volumes in \\(k^3\\).\n" +
        "- Going back from volumes, take the **cube root**: volumes \\(8 : 27\\) mean radii \\(2 : 3\\). From areas, take the **square root**.\n" +
        "- **Percent change**: write the new radius as a multiple of the old. 20% less is \\(0.8r\\), so the area becomes \\(0.64\\) of the old (36% less).\n" +
        "- Diameters are in the same ratio as radii, and a difference of diameters is twice the difference of radii.",
      formula: {
        label: "Scaling rule",
        latex: "\\frac{S_1}{S_2} = \\left(\\frac{r_1}{r_2}\\right)^2, \\qquad \\frac{V_1}{V_2} = \\left(\\frac{r_1}{r_2}\\right)^3",
      },
      authoredExample: {
        prompt: "Two spheres have surface areas in the ratio 4 : 9. Find the ratio of their volumes.",
        steps: [
          "Radii: \\(\\sqrt{4} : \\sqrt{9} = 2 : 3\\).",
          "Volumes: \\(2^3 : 3^3 = 8 : 27\\).",
        ],
        answer: "8 : 27",
      },
      selfCheckExample: {
        prompt: "The radius of a sphere is increased by 10%. By what percent does its surface area increase?",
        steps: ["New radius \\(= 1.1r\\), so new area \\(= 1.1^2 = 1.21\\) times the old.", "Increase \\(= 21\\%\\)."],
        answer: "21%",
      },
      practiceSet: [
        { prompt: "Two spheres have radii in the ratio 1 : 3. What is the ratio of their volumes?", answer: "1 : 27" },
        { prompt: "The volumes of two spheres are in the ratio 1 : 8. What is the ratio of their surface areas?", answer: "Radii 1 : 2, so 1 : 4" },
        { prompt: "The radius of a sphere is halved. What fraction of the volume is left?", answer: "\\(\\frac{1}{8}\\)" },
        { prompt: "Two spheres have radii in the ratio 2 : 5 and their radii add up to 21 cm. What are the radii?", answer: "6 cm and 15 cm" },
      ],
      pyqExampleId: "c674f245-8815-43b5-985c-3fdf222629d6",
      traps: [
        {
          title: "Using the volume ratio as the radius ratio",
          body: "Volumes 1 : 8 do not mean radii 1 : 8. Take the cube root: radii 1 : 2.",
        },
        {
          title: "Copying the percent of the length to the area",
          body: "A diameter 20% shorter gives an area \\(0.8^2 = 0.64\\) of the old, so 36% less, not 20% and not 40%.",
        },
      ],
    },
  ],
};

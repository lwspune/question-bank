import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_M3_RECASTING_NOTE: SubtopicNote = {
  subtopicName: "Melting and Recasting",
  title: "Melting & Recasting",
  oneLineDefinition:
    "A solid melted and recast into other shapes keeps its volume: find how many pieces, the new dimension, or how the surface area changes.",
  whyItMatters:
    "One of the paper's favourite families, and almost always MODERATE. The whole method is one equation — old volume equals new volume — and the only traps are units (millimetres against centimetres) and forgetting that surface area is NOT conserved.",
  concepts: [
    // C1 — volume is conserved
    {
      kind: "formula" as const,
      slug: "cdsm3-volume-conserved",
      name: "Volume is conserved",
      intuition:
        "Melting changes the shape, never the amount of metal. Write the old volume, write the new volume with the unknown in it, and set them equal. Common factors like \\(\\pi\\) or \\(\\dfrac43\\pi\\) usually cancel.",
      definition:
        "- Old volume \\(=\\) total new volume.\n" +
        "- Several spheres into one: \\(R^3 = r_1^3 + r_2^3 + \\cdots\\) (the \\(\\dfrac43\\pi\\) cancels).\n" +
        "- A hollow solid: use only the metal, e.g. \\(\\dfrac43\\pi(R^3 - r^3)\\) for a shell.\n" +
        "- A thin plate is a very short cylinder: area \\(\\times\\) thickness.",
      formula: {
        label: "Recasting",
        latex: "V_{\\text{old}} = V_{\\text{new}}",
      },
      authoredExample: {
        prompt: "Three metal spheres of radii \\(1\\), \\(6\\) and \\(8\\) cm are melted into one sphere. Find its radius.",
        steps: [
          "\\(R^3 = 1 + 216 + 512 = 729\\).",
          "\\(R = 9\\) cm.",
        ],
        answer: "\\(9\\) cm.",
      },
      selfCheckExample: {
        prompt: "A cube of edge \\(11\\) cm is melted into a cone of radius \\(7\\) cm. Find the cone's height. \\((\\pi = \\tfrac{22}{7})\\)",
        steps: [
          "Cube \\(= 1331\\) cm\\(^3\\).",
          "\\(\\dfrac13\\times\\dfrac{22}{7}\\times 49\\times h = \\dfrac{154h}{3} = 1331\\).",
          "\\(h = \\dfrac{3993}{154} = 25.93\\) cm.",
        ],
        answer: "about \\(25.9\\) cm.",
      },
      practiceSet: [
        { prompt: "Spheres of radii \\(6, 8, 10\\) into one: radius?", answer: "\\(12\\)" },
        { prompt: "Cube of edge \\(6\\) into cubes of edges \\(3, 4\\) and one more: its edge?", answer: "\\(5\\)" },
        { prompt: "Sphere of radius \\(3\\) into a cone of radius \\(3\\): cone's height?", answer: "\\(12\\)" },
        { prompt: "Cylinder \\(r = 2\\), \\(h = 9\\) into a sphere: radius?", answer: "\\(3\\)" },
      ],
      pyqExampleId: "41040a6e-078e-4c25-859f-5f0161556d8f", // 2019 (I) — spheres of radii 3, 4, 5 recast
    },

    // C2 — counting pieces
    {
      kind: "formula" as const,
      slug: "cdsm3-counting-pieces",
      name: "How many pieces?",
      intuition:
        "The number of small pieces is the big volume divided by one small volume. When both are the same shape, the formula's constant cancels and the count is just the ratio of the cubes of the lengths.",
      definition:
        "- Count \\(= \\dfrac{\\text{volume of the source}}{\\text{volume of one piece}}\\).\n" +
        "- Same shape: count \\(= \\left(\\dfrac{R}{r}\\right)^3\\).\n" +
        "- Convert every length to ONE unit first — mm and cm in the same stem are the usual trap.\n" +
        "- Filling containers (a bowl into bottles, a cylinder of ice-cream into cones) is the same count.",
      formula: {
        label: "Same-shape pieces",
        latex: "n = \\left(\\frac{R}{r}\\right)^3",
      },
      authoredExample: {
        prompt: "How many lead shots of diameter \\(3\\) mm can be made from a sphere of radius \\(6\\) cm?",
        steps: [
          "In mm: big radius \\(60\\), small radius \\(1.5\\).",
          "\\(n = \\left(\\dfrac{60}{1.5}\\right)^3 = 40^3 = 64000\\).",
        ],
        answer: "\\(64000\\).",
      },
      selfCheckExample: {
        prompt: "A cylinder of radius \\(6\\) cm and height \\(20\\) cm is full of juice, poured into cylindrical glasses of radius \\(3\\) cm and height \\(10\\) cm. How many glasses are filled?",
        steps: [
          "\\(\\dfrac{\\pi(36)(20)}{\\pi(9)(10)} = \\dfrac{720}{90} = 8\\).",
        ],
        answer: "\\(8\\).",
      },
      practiceSet: [
        { prompt: "Balls of radius \\(1\\) from a ball of radius \\(5\\): how many?", answer: "\\(125\\)" },
        { prompt: "Cubes of edge \\(2\\) from a cube of edge \\(10\\): how many?", answer: "\\(125\\)" },
        { prompt: "Hemisphere of radius \\(6\\) into cylinders \\(r = 1\\), \\(h = 4\\): how many?", answer: "\\(36\\)" },
        { prompt: "\\(8\\) cm in mm?", answer: "\\(80\\)" },
      ],
      pyqExampleId: "4955159a-37cc-4357-a793-a715db2c0f64", // 2021 (II) — coins of 3.5 cm, 4 mm thick, into a cuboid
    },

    // C3 — drawn into a wire
    {
      kind: "formula" as const,
      slug: "cdsm3-drawn-into-wire",
      name: "Drawn into a wire",
      intuition:
        "A wire is a long thin cylinder. Its volume is its cross-section times its length, so given one of radius or length, the other follows. Keep the length and the radius in the same unit.",
      definition:
        "- \\(\\pi\\rho^2 L = \\) the volume of the source.\n" +
        "- Sphere of radius \\(R\\) into a wire of radius \\(\\rho\\): \\(L = \\dfrac{4R^3}{3\\rho^2}\\).",
      formula: {
        label: "Sphere into wire",
        latex: "\\pi\\rho^2 L = \\tfrac43\\pi R^3",
      },
      authoredExample: {
        prompt: "A sphere of radius \\(6\\) cm is drawn into a wire of radius \\(2\\) mm. Find the length of the wire in metres.",
        steps: [
          "\\(\\rho = 0.2\\) cm: \\(L = \\dfrac{4\\times 216}{3\\times 0.04} = 7200\\) cm.",
          "That is \\(72\\) m.",
        ],
        answer: "\\(72\\) m.",
      },
      selfCheckExample: {
        prompt: "A copper sphere of diameter \\(4\\) cm is drawn into a wire \\(32\\) cm long. Find the wire's diameter.",
        steps: [
          "Sphere volume \\(= \\dfrac43\\pi(8) = \\dfrac{32\\pi}{3}\\).",
          "\\(\\pi\\rho^2(32) = \\dfrac{32\\pi}{3}\\), so \\(\\rho^2 = \\dfrac13\\) and \\(\\rho \\approx 0.577\\) cm.",
          "Diameter \\(\\approx 1.15\\) cm.",
        ],
        answer: "about \\(1.15\\) cm.",
      },
      practiceSet: [
        { prompt: "Sphere \\(R = 3\\) into wire \\(\\rho = 1\\): length?", answer: "\\(36\\)" },
        { prompt: "Cylinder \\(r = 1\\), \\(h = 10\\) drawn to radius \\(0.5\\): length?", answer: "\\(40\\)" },
        { prompt: "Wire radius halved, same metal: length multiplied by?", answer: "\\(4\\)" },
        { prompt: "\\(576\\) cm in metres?", answer: "\\(5.76\\)" },
      ],
      pyqExampleId: "960a042f-8d7f-4917-b0fe-7bf14eab5015", // 2021 (I) — sphere of diameter 60 mm into a 144 cm wire
    },

    // C4 — surface after recasting
    {
      kind: "formula" as const,
      slug: "cdsm3-surface-after-recast",
      name: "Surface area is not conserved",
      intuition:
        "Volume stays; surface grows when you break a solid into smaller pieces. One sphere recast into \\(n\\) equal spheres has each radius \\(n^{-1/3}\\) of the original, and the total surface grows by the factor \\(n^{1/3}\\).",
      definition:
        "- \\(n\\) equal spheres from one: \\(r = \\dfrac{R}{\\sqrt[3]{n}}\\); total surface \\(= \\sqrt[3]{n}\\times\\) the original.\n" +
        "- The reverse, many into one, shrinks the total surface.",
      formula: {
        label: "One sphere into n",
        latex: "\\frac{S_{\\text{new}}}{S_{\\text{old}}} = \\sqrt[3]{n}",
      },
      authoredExample: {
        prompt: "A ball is recast into \\(27\\) equal balls. By what factor does the total surface area change?",
        steps: [
          "\\(\\sqrt[3]{27} = 3\\): each radius is a third, and \\(27\\times\\dfrac19 = 3\\).",
          "The surface is multiplied by \\(3\\), an increase of \\(200\\%\\).",
        ],
        answer: "\\(\\times 3\\).",
      },
      selfCheckExample: {
        prompt: "After recasting a sphere into \\(n\\) equal spheres, the total surface area is \\(5\\) times the original. Find \\(n\\).",
        steps: [
          "\\(\\sqrt[3]{n} = 5\\), so \\(n = 125\\).",
        ],
        answer: "\\(125\\).",
      },
      practiceSet: [
        { prompt: "One into \\(8\\): surface multiplied by?", answer: "\\(2\\)" },
        { prompt: "One into \\(1000\\): surface increase?", answer: "\\(900\\%\\)" },
        { prompt: "One into \\(n\\): big surface : total small surface?", answer: "\\(1 : \\sqrt[3]{n}\\)" },
        { prompt: "Is volume or surface conserved on melting?", answer: "Volume" },
      ],
      pyqExampleId: "f30736e5-e2ec-42df-9fb5-5e3cfb16a050", // 2023 (I) — one ball into 64
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_GEO_SOLIDS_NOTE: SubtopicNote = {
  subtopicName: "Surface Area and Volume",
  title: "Solids: Surface Area, Volume and Scaling",
  oneLineDefinition:
    "Volumes and surface areas of prisms, cylinders, cones, spheres and pyramids, and how they change when every length is scaled.",
  whyItMatters:
    "The 2024 paper asked for the volume of a cylinder from its radius and height, and a 2014 question added up the surface areas of spheres of different radii.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-geo-solid-formulas",
      name: "Volume and surface area of the standard solids",
      intuition:
        "A prism or cylinder has the same cross-section all the way along, so its volume is that area times the length. A cone or pyramid tapers to a point and holds exactly one third of the matching prism or cylinder. Surface area is the area of the net: every face laid out flat.",
      definition:
        "- The **height** \\(h\\) of a cone or pyramid is measured straight up from the base to the apex. The **slant height** \\(l\\) of a cone runs along its side, and \\(l^2 = r^2 + h^2\\).\n" +
        "- **Total surface area** includes the base(s); **curved surface area** is the curved part only.\n" +
        "- Volume units are cubed (\\(\\text{cm}^3\\)); area units are squared (\\(\\text{cm}^2\\)). \\(1\\ \\text{litre} = 1000\\ \\text{cm}^3\\).",
      table: {
        columns: ["Solid", "Volume", "Surface area"],
        rows: [
          { cells: ["Prism, cross-section area \\(A\\), length \\(L\\)", "\\(AL\\)", "Two end faces plus the rectangles round the side"] },
          { cells: ["Cuboid \\(a \\times b \\times c\\)", "\\(abc\\)", "\\(2(ab + bc + ca)\\)"] },
          { cells: ["Cylinder, radius \\(r\\), height \\(h\\)", "\\(\\pi r^2 h\\)", "\\(2\\pi r^2 + 2\\pi r h\\) (curved part \\(2\\pi r h\\))"] },
          { cells: ["Cone, radius \\(r\\), height \\(h\\), slant \\(l\\)", "\\(\\tfrac{1}{3}\\pi r^2 h\\)", "\\(\\pi r^2 + \\pi r l\\) (curved part \\(\\pi r l\\))"] },
          { cells: ["Sphere, radius \\(r\\)", "\\(\\tfrac{4}{3}\\pi r^3\\)", "\\(4\\pi r^2\\)"] },
          { cells: ["Pyramid, base area \\(B\\), height \\(h\\)", "\\(\\tfrac{1}{3}Bh\\)", "Base plus the triangular faces"] },
        ],
      },
      selfCheckExample: {
        prompt: "A cone has a base radius of 6 cm and a slant height of 10 cm. What is its volume?",
        options: [
          "\\(120\\pi\\ \\text{cm}^3\\)",
          "\\(288\\pi\\ \\text{cm}^3\\)",
          "\\(96\\pi\\ \\text{cm}^3\\)",
          "\\(60\\pi\\ \\text{cm}^3\\)",
          "\\(384\\pi\\ \\text{cm}^3\\)",
        ],
        steps: [
          "First the vertical height: \\(h = \\sqrt{10^2 - 6^2} = 8\\) cm.",
          "\\(V = \\tfrac{1}{3}\\pi \\times 6^2 \\times 8 = 96\\pi\\ \\text{cm}^3\\).",
          "A uses the slant height as \\(h\\); B forgets the \\(\\tfrac{1}{3}\\); D is the curved surface area \\(\\pi r l\\); E uses the diameter as the radius.",
        ],
        answer: "(C) \\(96\\pi\\ \\text{cm}^3\\)",
      },
      practiceSet: [
        { prompt: "Volume of a cylinder with radius 3 cm and height 10 cm?", answer: "\\(90\\pi\\ \\text{cm}^3\\)" },
        { prompt: "Volume and surface area of a sphere of radius 3?", answer: "Volume \\(36\\pi\\), surface area \\(36\\pi\\)" },
        { prompt: "Volume and surface area of a \\(2 \\times 3 \\times 4\\) cuboid?", answer: "Volume 24, surface area 52" },
        { prompt: "Volume of a pyramid with a square base of side 6 and height 5?", answer: "60", method: "\\(\\tfrac{1}{3} \\times 36 \\times 5\\)" },
      ],
      traps: [
        {
          title: "A cone's volume uses the vertical height, not the slant height",
          body: "\\(V = \\tfrac{1}{3}\\pi r^2 h\\) needs the height measured straight up. If you are given the slant height, find \\(h\\) with Pythagoras first. The slant height belongs only in the curved surface area \\(\\pi r l\\).",
        },
        {
          title: "Sphere: 4πr² for area, (4/3)πr³ for volume",
          body: "The surface area of a sphere is \\(4\\pi r^2\\), with no \\(\\tfrac{1}{3}\\). Mixing the two formulas gives a wrong answer with the wrong units: area must come out in squared units, volume in cubed units.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-geo-scaling",
      name: "How area and volume scale with length",
      intuition:
        "Double every length of a cube and you can fit 4 small faces on each big face and 8 small cubes inside the big one. In general, scaling lengths by \\(k\\) scales areas by \\(k^2\\) and volumes by \\(k^3\\). The mass of a solid object goes with its volume.",
      definition:
        "If two shapes are **similar** with length scale factor \\(k\\):\n" +
        "- Every length (edges, radii, heights, perimeters) is multiplied by \\(k\\).\n" +
        "- Every area (surface area, cross-section) is multiplied by \\(k^2\\).\n" +
        "- Every volume (and the mass, for the same material) is multiplied by \\(k^3\\).\n" +
        "- This holds only when **all** lengths scale. Changing only the radius of a cylinder at fixed height multiplies its volume by \\(k^2\\), not \\(k^3\\).",
      formula: {
        label: "Scale factors",
        latex: "\\frac{A_2}{A_1} = k^2 \\qquad \\frac{V_2}{V_1} = k^3",
        symbols: [{ symbol: "\\(k\\)", meaning: "ratio of matching lengths, large to small" }],
      },
      authoredExample: {
        prompt:
          "Two similar jugs have heights 12 cm and 18 cm. The smaller holds 0.8 litres and needs \\(150\\ \\text{cm}^2\\) of glaze. How much does the larger hold, and how much glaze does it need?",
        steps: [
          "\\(k = 18 / 12 = 1.5\\).",
          "Capacity: \\(0.8 \\times 1.5^3 = 0.8 \\times 3.375 = 2.7\\) litres.",
          "Glaze (an area): \\(150 \\times 1.5^2 = 150 \\times 2.25 = 337.5\\ \\text{cm}^2\\).",
        ],
        answer: "2.7 litres; \\(337.5\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "The radius of a sphere is increased by 20%. By what percentage does its volume increase?",
        options: ["20%", "44%", "60%", "72.8%", "172.8%"],
        steps: [
          "\\(k = 1.2\\), so the volume is multiplied by \\(1.2^3 = 1.728\\).",
          "That is an increase of 72.8%.",
          "B is the increase in surface area (\\(1.2^2 = 1.44\\)); C adds 20% three times; E gives the new volume as a percentage of the old, not the increase.",
        ],
        answer: "(D) 72.8%",
      },
      practiceSet: [
        { prompt: "Every length of a shape is doubled. What happens to its area?", answer: "It is multiplied by 4" },
        { prompt: "Two similar solids have volumes in the ratio 8 : 27. What is the ratio of their lengths?", answer: "2 : 3", method: "Cube roots" },
        { prompt: "A cylinder's radius is tripled and its height kept the same. What happens to its volume?", answer: "It is multiplied by 9", method: "Only \\(r^2\\) changes" },
        { prompt: "The side of a cube is halved. What fraction of the volume is left?", answer: "\\(\\tfrac{1}{8}\\)" },
      ],
      traps: [
        {
          title: "Volume goes with the cube of the length",
          body: "Doubling every length makes a solid 8 times as heavy, not 2 or 4 times. A percentage change in length must be cubed for volume and squared for area, never just multiplied by 3 or 2.",
        },
      ],
    },
  ],
};

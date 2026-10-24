import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_M3_RECASTING_NOTE: SubtopicNote = {
  subtopicName: "Melting, Recasting and Water",
  title: "Melting, Recasting and Water",
  oneLineDefinition:
    "Melting a solid into new shapes, pouring a liquid from one vessel into others, or sinking a stone in water never changes the volume, so you set the volume before equal to the volume after.",
  whyItMatters:
    "Twenty-one questions in the bank, twelve EASY and nine MODERATE, seventeen of them from the 2025 shifts. Every one rests on the single fact that the volume does not change. Write volume before equal to volume after, cancel the common factors such as four thirds of π, and the arithmetic is short.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscm3rc-conserved",
      name: "Melting and recasting keeps the volume the same",
      intuition:
        "Metal melted into new shapes is the same metal. However the pieces look, their volumes add up to the volume you started with, unless the question says some is wasted.",
      definition:
        "- **Volume before \\(=\\) volume after.** Write both sides with their formulas and cancel what is common.\n" +
        "- Several spheres melted into one sphere: \\(\\frac{4}{3}\\pi\\) cancels, so \\(R^3 = r_1^3 + r_2^3 + \\dots\\). The same works with diameters, and with cubes and their edges.\n" +
        "- Know the cubes up to \\(20^3 = 8000\\), so the final cube root is quick.\n" +
        "- **Different shapes**: write each formula in full. A sphere into a cone: \\(\\frac{4}{3}\\pi R^3 = \\frac{1}{3}\\pi r^2 h\\), and \\(\\frac{1}{3}\\pi\\) cancels to \\(4R^3 = r^2 h\\).\n" +
        "- A **hollow** sphere has metal \\(\\frac{4}{3}\\pi(R^3 - r^3)\\), and that is what gets recast.\n" +
        "- Two equal hemispheres make exactly one sphere of the same radius.",
      formula: {
        label: "Volume is conserved",
        latex: "V_{\\text{before}} = V_{\\text{after}} \\qquad R^3 = r_1^3 + r_2^3 + r_3^3",
      },
      authoredExample: {
        prompt: "A solid metal sphere of radius 6 cm is melted and recast into a cone whose base radius is also 6 cm. Find the height of the cone.",
        steps: [
          "\\(\\frac{4}{3}\\pi \\times 6^3 = \\frac{1}{3}\\pi \\times 6^2 \\times h\\).",
          "Cancel \\(\\frac{1}{3}\\pi \\times 6^2\\): \\(4 \\times 6 = h\\), so \\(h = 24\\) cm.",
        ],
        answer: "24 cm",
      },
      selfCheckExample: {
        prompt: "A metal cone of radius 4 cm and height 9 cm is melted and recast into a cylinder of radius 2 cm. Find the height of the cylinder.",
        steps: [
          "Cone \\(= \\frac{1}{3}\\pi \\times 16 \\times 9 = 48\\pi\\ \\text{cm}^3\\).",
          "Cylinder: \\(\\pi \\times 4 \\times h = 48\\pi\\), so \\(h = 12\\) cm.",
        ],
        answer: "12 cm",
      },
      practiceSet: [
        { prompt: "Three metal cubes of edges 6 cm, 8 cm and 10 cm are melted into one cube. Find its edge.", answer: "12 cm" },
        {
          prompt: "A metal cylinder of radius 3 cm and height 5 cm is melted into a cone of radius 3 cm. Find the height of the cone.",
          answer: "15 cm",
          method: "Same base, so the cone is 3 times as tall.",
        },
        { prompt: "Two solid hemispheres of radius 5 cm are melted into one sphere. What is its radius?", answer: "5 cm" },
        {
          prompt: "A hollow metal sphere has outer radius 4 cm and inner radius 3 cm. It is melted into a solid sphere of radius \\(R\\). Find \\(R^3\\).",
          answer: "37",
          method: "\\(64 - 27\\).",
        },
      ],
      pyqExampleId: "80c96f02-1fed-4479-8474-1ac3c8269420",
      traps: [
        {
          title: "Adding the radii",
          body:
            "Spheres of radii 1 cm, 6 cm and 8 cm melt into a sphere of radius 9 cm, not 15 cm. Volumes add, so it is the cubes of the radii that add: \\(1 + 216 + 512 = 729 = 9^3\\).",
        },
        {
          title: "Forgetting the one third in a cone",
          body:
            "A cylinder melted into a cone on the same base gives a cone 3 times as tall as the cylinder, because the cone's formula carries \\(\\frac{1}{3}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm3rc-count",
      name: "How many smaller solids, or how many containers",
      intuition:
        "When one big solid becomes many identical small ones, divide: the number is the big volume over one small volume. The same division counts the containers a tank can fill.",
      definition:
        "- \\(n = \\frac{V_{\\text{big}}}{V_{\\text{small}}}\\).\n" +
        "- Same shape with every length scaled (spheres, hemispheres, cubes): \\(n = \\left(\\frac{R}{r}\\right)^3\\).\n" +
        "- Different shapes: cancel \\(\\pi\\) and simplify the fraction before you multiply.\n" +
        "- Litres: \\(1\\ \\text{m}^3 = 1000\\) litres, so buckets of \\(b\\) litres fill a \\(1\\ \\text{m}^3\\) tank in \\(\\frac{1000}{b}\\) trips.",
      formula: {
        label: "Number of pieces",
        latex: "n = \\frac{V_{\\text{big}}}{V_{\\text{small}}} \\qquad n_{\\text{same shape}} = \\left(\\frac{R}{r}\\right)^3",
      },
      authoredExample: {
        prompt: "How many lead balls of radius 1 cm can be made from a solid lead sphere of radius 5 cm?",
        steps: [
          "Full method: \\(\\frac{\\frac{4}{3}\\pi \\times 125}{\\frac{4}{3}\\pi \\times 1} = 125\\).",
          "Fast route: same shape, so \\(n = \\left(\\frac{5}{1}\\right)^3 = 125\\).",
        ],
        answer: "125",
      },
      selfCheckExample: {
        prompt: "A cylindrical drum of radius 7 cm and height 20 cm is full of oil. The oil is poured into cones of radius 3.5 cm and height 5 cm. How many cones are filled?",
        steps: [
          "Drum \\(= \\pi \\times 49 \\times 20 = 980\\pi\\).",
          "One cone \\(= \\frac{1}{3}\\pi \\times 12.25 \\times 5 = \\frac{61.25\\pi}{3}\\).",
          "\\(n = \\frac{980 \\times 3}{61.25} = 48\\).",
        ],
        answer: "48",
      },
      practiceSet: [
        { prompt: "How many cubes of edge 2 cm can be made by melting a cube of edge 6 cm?", answer: "27" },
        { prompt: "How many buckets of 12.5 litres fill a tank of one cubic metre?", answer: "80" },
        { prompt: "A solid hemisphere of radius 6 cm is melted into hemispheres of radius 3 cm. How many are made?", answer: "8" },
      ],
      pyqExampleId: "e6bae944-318f-42b5-a14e-93a4b32aed13",
      traps: [
        {
          title: "Dividing the radii instead of the volumes",
          body:
            "A ball of radius 4 cm makes 64 balls of radius 1 cm, not 4. The count is the ratio of the volumes, \\(\\left(\\frac{4}{1}\\right)^3\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm3rc-surface",
      name: "Surface area after recasting",
      intuition:
        "Volume survives melting, but surface does not. Turn one ball into many small ones and there is far more skin, which is why crushed ice melts faster than a block.",
      definition:
        "- Use the volume first to find the new size, then work out the new surface.\n" +
        "- One solid split into \\(n\\) equal copies of its own shape: each length becomes \\(\\frac{1}{\\sqrt[3]{n}}\\) of the old, and the total surface becomes \\(\\sqrt[3]{n}\\) times the old.\n" +
        "- So 27 equal balls have three times the surface of the ball they came from, and 64 have four times.",
      formula: {
        label: "Total surface after splitting into n equal copies",
        latex: "S_{\\text{after}} = \\sqrt[3]{n} \\times S_{\\text{before}}",
      },
      authoredExample: {
        prompt: "A metal sphere of radius 9 cm is melted into 27 equal small spheres. Find the ratio of the total surface area of the small spheres to the surface area of the big one.",
        steps: [
          "\\(27r^3 = 9^3\\), so \\(r = 3\\) cm.",
          "Small spheres: \\(27 \\times 4\\pi \\times 9 = 972\\pi\\). Big sphere: \\(4\\pi \\times 81 = 324\\pi\\).",
          "Ratio \\(= 972 : 324 = 3 : 1\\), which is \\(\\sqrt[3]{27} = 3\\).",
        ],
        answer: "\\(3 : 1\\)",
      },
      selfCheckExample: {
        prompt: "A cube of edge 8 cm is melted into 64 equal cubes. Find the total surface area of the 64 cubes.",
        steps: [
          "\\(64a^3 = 512\\), so \\(a^3 = 8\\) and \\(a = 2\\) cm.",
          "Total surface \\(= 64 \\times 6 \\times 4 = 1536\\ \\text{cm}^2\\), four times the old \\(6 \\times 64 = 384\\ \\text{cm}^2\\).",
        ],
        answer: "\\(1536\\ \\text{cm}^2\\)",
      },
      practiceSet: [
        { prompt: "A sphere is melted into 125 equal spheres. How many times the old surface is the new total surface?", answer: "5" },
        { prompt: "A sphere of radius 8 cm is recast into 64 equal spheres. What is the radius of each?", answer: "2 cm" },
      ],
      pyqExampleId: "1ec14fbe-cafe-4d53-852c-b0176e25ac82",
      traps: [
        {
          title: "Assuming the surface stays the same",
          body:
            "Only the volume is kept. Splitting a ball into 27 equal balls triples the total surface, so treating the two surfaces as equal is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm3rc-water",
      name: "Water displaced and the rise in level",
      intuition:
        "A stone sunk in a tank pushes aside exactly its own volume of water. That water has nowhere to go but up, so it spreads over the tank's base as a thin slab.",
      definition:
        "- A fully sunk solid **displaces its own volume**. The size of the tank does not change that, as long as the solid fits and is fully under water.\n" +
        "- **Rise in level** \\(= \\frac{\\text{volume sunk}}{\\text{base area of the tank}}\\).\n" +
        "- The base is \\(\\pi R^2\\) for a cylindrical tank and length \\(\\times\\) breadth for a rectangular one. The water already in the tank does not enter the sum.\n" +
        "- Several identical solids: multiply one volume by the number first.",
      formula: {
        label: "Rise in water level",
        latex: "\\text{rise} = \\frac{V_{\\text{sunk}}}{\\text{base area}}",
      },
      authoredExample: {
        prompt: "A cylindrical jar of radius 6 cm holds some water. A solid ball of radius 3 cm is dropped in and sinks completely. By how much does the water rise?",
        steps: [
          "Ball \\(= \\frac{4}{3}\\pi \\times 27 = 36\\pi\\ \\text{cm}^3\\).",
          "Base of the jar \\(= \\pi \\times 36 = 36\\pi\\ \\text{cm}^2\\).",
          "Rise \\(= \\frac{36\\pi}{36\\pi} = 1\\) cm.",
        ],
        answer: "1 cm",
      },
      selfCheckExample: {
        prompt: "A rectangular tank has a base 40 cm by 30 cm. Twelve solid cubes of edge 5 cm are sunk in it. Find the rise in the water level.",
        steps: [
          "Cubes \\(= 12 \\times 125 = 1500\\ \\text{cm}^3\\); base \\(= 1200\\ \\text{cm}^2\\).",
          "Rise \\(= \\frac{1500}{1200} = 1.25\\) cm.",
        ],
        answer: "1.25 cm",
      },
      practiceSet: [
        { prompt: "A stone of volume \\(600\\ \\text{cm}^3\\) is sunk in a tank with base area \\(300\\ \\text{cm}^2\\). How much does the level rise?", answer: "2 cm" },
        { prompt: "A ball of radius 3 cm is fully under water. What volume of water does it displace, in terms of \\(\\pi\\)?", answer: "\\(36\\pi\\ \\text{cm}^3\\)" },
        {
          prompt: "The water in a cylinder of radius 7 cm rises by 2 cm when a stone is sunk in it. Find the stone's volume. (Take \\(\\pi = \\frac{22}{7}\\).)",
          answer: "\\(308\\ \\text{cm}^3\\)",
          method: "Base \\(154 \\times\\) rise \\(2\\).",
        },
      ],
      pyqExampleId: "93b0eefd-df4c-4807-a829-5902e9bc9433",
      traps: [
        {
          title: "Using the water already in the tank",
          body:
            "The rise depends only on the volume sunk and the base area. The starting depth of the water never enters the sum.",
        },
        {
          title: "Dividing by the tank's volume",
          body: "Divide the volume sunk by the base area of the tank, not by its volume: the answer is a length.",
        },
      ],
    },
  ],
};

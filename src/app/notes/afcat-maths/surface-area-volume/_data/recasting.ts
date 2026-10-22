import type { SubtopicNote } from "@/app/notes/_types";

export const AF_SV_RECASTING_NOTE: SubtopicNote = {
  subtopicName: "Melting, Recasting and Displacement",
  title: "Melting, Recasting and Displacement",
  oneLineDefinition:
    "A solid melted and recast, a liquid poured, a body sunk in water, earth dug and spread or water pumped through a pipe: the volume stays the same, so set the two volumes equal.",
  whyItMatters:
    "Every question here is one equation, volume before equals volume after, and π cancels whenever both shapes are round. The marks go on units (cm³ against m³ and litres, km/h against a pipe measured in cm²) and on spreading earth over the field less the pit, not the whole field.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afsv-recast-one",
      name: "One solid melted into another",
      intuition:
        "Melting changes the shape, never the amount of metal. Write the volume of the old solid, set it equal to the volume of the new one, and solve for the length you want.",
      definition:
        "- \\(V_{\\text{before}} = V_{\\text{after}}\\). With round solids on both sides, \\(\\pi\\) cancels at once.\n" +
        "- A liquid poured from one vessel to another keeps its volume in the same way.\n" +
        "- Into a hollow shape: a hollow cylinder holds \\(\\pi h(R^2 - r^2)\\) and a hollow sphere \\(\\tfrac43 \\pi(R^3 - r^3)\\). Find the inner radius, then the thickness \\(R - r\\).\n" +
        "- Carved and then recast: only the material left after carving is melted.",
      formula: {
        label: "Volume is kept",
        latex: "V_{\\text{before}} = V_{\\text{after}}",
      },
      authoredExample: {
        prompt: "A metal cone of radius 10 cm and height 18 cm is melted and recast into a cylinder of radius 5 cm. Find the cylinder's height.",
        steps: [
          "Cone: \\(\\tfrac13 \\pi \\times 100 \\times 18 = 600\\pi\\).",
          "Cylinder: \\(\\pi \\times 25 \\times H = 600\\pi\\), so \\(H = 24\\).",
        ],
        answer: "24 cm.",
      },
      selfCheckExample: {
        prompt:
          "A solid cone of radius 12 cm and height 7 cm is recast into a hollow cylinder 7 cm tall with outer radius 8 cm. Find the thickness of the cylinder.",
        steps: [
          "Cone: \\(\\tfrac13 \\pi \\times 144 \\times 7 = 336\\pi\\).",
          "\\(\\pi (64 - r^2) \\times 7 = 336\\pi\\), so \\(64 - r^2 = 48\\) and \\(r = 4\\).",
          "Thickness \\(8 - 4\\).",
        ],
        answer: "4 cm.",
      },
      practiceSet: [
        { prompt: "A cylinder of radius 9 cm and height 12 cm is melted into a sphere. Find the sphere's radius.", answer: "9 cm", method: "\\(\\tfrac43 R^3 = 972\\)." },
        { prompt: "A conical flask of radius \\(r\\) and height \\(h\\) is full of water, poured into a cylinder of radius \\(r\\). How high does the water stand?", answer: "\\(\\tfrac h3\\)" },
        { prompt: "A hemisphere of radius 4 cm is recast into a cone of radius 4 cm. Find the cone's height.", answer: "8 cm" },
      ],
      pyqExampleId: "6d687c07-4e4c-40c1-bfc9-772871fd7e99",
      traps: [
        {
          title: "Melt only what is left",
          body: "If a sphere is first carved from a block and the rest is recast, the new solid holds the block minus the sphere, not the whole block.",
        },
        {
          title: "Radius in, diameter out",
          body: "Stems give diameters for one solid and radii for the other, and some ask for a diameter at the end. Halve going in and double coming out.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsv-recast-many",
      name: "Many small solids from one, or many into one",
      intuition:
        "Small balls from a big one: the number is how many small volumes fit in the big volume. For spheres every \\(\\tfrac43 \\pi\\) cancels, so the count is just the ratio of the radii cubed. Merging works the other way: the cubes of the radii add.",
      definition:
        "- Number of small spheres of radius \\(r\\) from one of radius \\(R\\): \\(\\left(\\dfrac Rr\\right)^3\\).\n" +
        "- Several spheres melted into one: \\(R^3 = r_1^3 + r_2^3 + \\dots\\)\n" +
        "- \\(n\\) equal drops merging: \\(R = r\\sqrt[3]{n}\\).\n" +
        "- Merging keeps the volume but cuts the surface: \\(n\\) drops have \\(\\sqrt[3]{n}\\) times the surface of the big drop they form.\n" +
        "- 'Can these shots be made?' Compare the sum of their cubed radii with the original's cube.",
      formula: {
        label: "Spheres recast",
        latex: "n = \\left(\\dfrac{R}{r}\\right)^3,\\quad R^3 = r_1^3 + r_2^3 + \\dots",
      },
      authoredExample: {
        prompt: "How many lead shots of radius 0.3 cm can be made from a sphere of radius 1.5 cm?",
        steps: [
          "\\(\\dfrac{1.5}{0.3} = 5\\).",
          "\\(5^3 = 125\\).",
        ],
        answer: "125 shots.",
      },
      selfCheckExample: {
        prompt: "Spheres of radii 3 cm, 4 cm and 5 cm are melted into one sphere. Find its radius.",
        steps: [
          "\\(R^3 = 27 + 64 + 125 = 216\\).",
          "\\(R = 6\\).",
        ],
        answer: "6 cm.",
      },
      practiceSet: [
        { prompt: "64 drops of radius 0.1 cm merge into one drop. Find its radius.", answer: "0.4 cm" },
        { prompt: "How many spheres of radius 2 cm can be cast from a sphere of radius 6 cm?", answer: "27" },
        {
          prompt: "27 equal spheres are melted into one. What fraction of their total surface does the big sphere have?",
          answer: "\\(\\tfrac 13\\)",
          method: "Radius \\(3r\\): \\(9\\) against \\(27\\).",
        },
      ],
      pyqExampleId: "a019c108-b55d-4f9a-964a-c7c2a10a7ab7",
      traps: [
        {
          title: "Radii do not add",
          body: "Spheres of radii 3, 4 and 5 make one of radius 6, not 12. Add the cubes, then take the cube root.",
        },
        {
          title: "Merging cuts the surface",
          body: "64 drops merge into one drop of four times the radius, with 16 times one drop's surface. The 64 drops had 64 times, so the surface falls to a quarter.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsv-displacement",
      name: "A body sunk in water raises the level",
      intuition:
        "A solid pushed fully under water takes up its own volume, and the water has nowhere to go but up. The rise is that volume spread over the floor of the vessel.",
      definition:
        "- **Rise** = volume sunk ÷ base area of the vessel (for a vessel with straight sides).\n" +
        "- People diving, stones dropped and balls sunk all work the same way; several of them: multiply first.\n" +
        "- 'How many balls before it spills?' The empty space above the water ÷ one ball's volume.\n" +
        "- Keep one unit: a rise in cm needs the volume in cm³ and the area in cm².",
      formula: {
        label: "Rise in level",
        latex: "\\text{rise} = \\dfrac{V_{\\text{sunk}}}{\\text{base area of the vessel}}",
      },
      authoredExample: {
        prompt: "A stone of volume 1,540 cm³ is sunk in a cylindrical jar of radius 7 cm partly full of water. How far does the water rise? (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: [
          "Base of the jar: \\(\\tfrac{22}{7} \\times 49 = 154\\) cm².",
          "Rise: \\(1540 \\div 154 = 10\\) cm.",
        ],
        answer: "10 cm.",
      },
      selfCheckExample: {
        prompt: "Two iron balls of radius 3 cm are dropped into a cylinder of radius 6 cm partly full of water. Find the rise in level.",
        steps: [
          "Balls: \\(2 \\times \\tfrac43 \\pi \\times 27 = 72\\pi\\).",
          "Base: \\(36\\pi\\). Rise \\(72\\pi \\div 36\\pi\\).",
        ],
        answer: "2 cm.",
      },
      practiceSet: [
        { prompt: "A cube of edge 10 cm is sunk in a tank 50 cm × 40 cm. Find the rise in level.", answer: "0.5 cm" },
        { prompt: "50 people, each displacing 0.08 m³, get into a pool 20 m × 10 m. How many cm does the water rise?", answer: "2 cm" },
        {
          prompt: "A cylinder of radius 4 cm has 8 cm of empty space above its water. How many balls of radius 1 cm can be dropped in before it spills?",
          answer: "96",
          method: "\\(128\\pi \\div \\tfrac43 \\pi\\).",
        },
      ],
      pyqExampleId: "741633ee-9f17-473b-a246-f767aab58b03",
      traps: [
        {
          title: "Divide by the vessel's base, not the object's",
          body: "A cube sunk in a tank raises the water by its volume over the tank's floor. The cube's own face area plays no part.",
        },
        {
          title: "Match the units before dividing",
          body: "0.08 m³ over a pool of 200 m² is a rise of 0.0004 m, which is 0.04 cm. Convert at the end, not halfway.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsv-earth-flow",
      name: "Earth dug and spread, water flowing and stored",
      intuition:
        "Earth dug from a pit is a cuboid of soil, and spread out it becomes a thin layer of the same volume. Water through a pipe is a long cylinder: each hour the pipe delivers its cross-section times the distance the water travels.",
      definition:
        "- Earth spread over a field: rise = earth's volume ÷ the area it covers. If it is spread on the rest of the field, take the field's area less the pit's.\n" +
        "- Flow: volume per hour = cross-section × speed. Put both in metres first.\n" +
        "- Units: 1 m³ = 1,000 litres; 1 m² = 10,000 cm²; 1 km = 1,000 m.\n" +
        "- Water lasting a town: stored litres ÷ litres used a day.",
      formula: {
        label: "Flow in a pipe",
        latex: "\\text{volume per hour} = \\text{cross-section} \\times \\text{speed}",
      },
      authoredExample: {
        prompt:
          "A pit 10 m × 8 m × 2.4 m is dug in a field 50 m × 40 m and the earth is spread evenly over the rest of the field. By how much is the field raised?",
        steps: [
          "Earth: \\(10 \\times 8 \\times 2.4 = 192\\) m³.",
          "Rest of the field: \\(2000 - 80 = 1920\\) m².",
          "Rise: \\(192 \\div 1920 = 0.1\\) m.",
        ],
        answer: "10 cm.",
      },
      selfCheckExample: {
        prompt:
          "Water flows at 6 km/h through a pipe of cross-section 25 cm² into a tank 10 m × 5 m. How much does the level rise in half an hour?",
        steps: [
          "In half an hour the water travels 3 km = 3,000 m, through \\(0.0025\\) m²: \\(7.5\\) m³.",
          "Over \\(50\\) m²: \\(7.5 \\div 50 = 0.15\\) m.",
        ],
        answer: "15 cm.",
      },
      practiceSet: [
        { prompt: "How many litres does a tank 4 m × 2.5 m × 1.5 m hold?", answer: "15,000 litres" },
        {
          prompt: "A trench 25 m × 2 m × 1.2 m is dug and its earth spread over a plot 40 m × 30 m beside it. By how much is the plot raised?",
          answer: "5 cm",
        },
        {
          prompt: "A tank 40 m × 15 m × 6 m supplies 4,000 people who each use 150 litres a day. For how many days does it last?",
          answer: "6 days",
          method: "3,600,000 litres against 600,000 a day.",
        },
      ],
      pyqExampleId: "2984d299-55de-4ef1-9970-e324659815cc",
      traps: [
        {
          title: "Spread over the field less the pit",
          body: "With 192 m³ of earth on a 2,000 m² field holding an 80 m² pit, dividing by 2,000 gives 9.6 cm. The earth covers only 1,920 m², so the rise is 10 cm.",
        },
        {
          title: "cm² to m² is ten thousand, not a hundred",
          body: "A pipe of cross-section 25 cm² is 0.0025 m². Dividing by 100 gives 0.25 m², a pipe a hundred times too wide.",
        },
      ],
    },
  ],
};

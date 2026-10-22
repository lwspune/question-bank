import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_FL_PRESSURE_NOTE: SubtopicNote = {
  subtopicName: "Thrust and Liquid Pressure",
  title: "Thrust and Liquid Pressure",
  oneLineDefinition:
    "Pressure is the force pressing on each square metre of a surface, and inside a liquid at rest it depends only on how deep you are and how dense the liquid is.",
  whyItMatters:
    "Three questions in the bank, one EASY and two MODERATE: which faces of an iron cuboid press equally on sand, two points at the same depth in a tank, and the pressure under two layers of liquid. All three come down to P equals F over A and P equals hρg, used with care over units.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiflpr-thrust",
      name: "Thrust, pressure and the pressure of a liquid column",
      intuition:
        "A sharp knife cuts and a blunt one does not, though you push just as hard. The same force on a smaller area presses harder. Pressure measures exactly that: force shared out over area.",
      definition:
        "- **Thrust** is the force acting at right angles to a surface. Its unit is the newton (N).\n" +
        "- **Pressure** \\(=\\) thrust \\(\\div\\) area. Its unit is the **pascal**: \\(1\\ \\text{Pa} = 1\\ \\text{N/m}^2\\).\n" +
        "- The same weight on a **smaller face** gives a **larger pressure**. Opposite faces of a cuboid have equal areas, so they give equal pressures.\n" +
        "- A column of liquid of height h presses on its base with its weight. That gives a pressure of \\(h\\rho g\\), where \\(\\rho\\) is the density of the liquid.\n" +
        "- With two layers of liquid, work out \\(h\\rho g\\) for each layer and **add** them.\n" +
        "- Change a density in g/cm³ (g/cc) to kg/m³ by multiplying by 1000: water is 1 g/cm³ \\(= 1000\\ \\text{kg/m}^3\\).",
      formula: {
        label: "Pressure",
        latex: "P = \\frac{F}{A} \\qquad P_{\\text{liquid}} = h\\rho g \\qquad 1\\ \\text{g/cm}^3 = 1000\\ \\text{kg/m}^3",
        symbols: [
          { symbol: "F", meaning: "thrust (force at right angles), in newtons" },
          { symbol: "A", meaning: "area, in square metres" },
          { symbol: "h", meaning: "depth of liquid, in metres" },
          { symbol: "ρ", meaning: "density of the liquid, in kg/m³" },
        ],
      },
      authoredExample: {
        prompt: "A block weighing 120 N measures 0.2 m by 0.3 m by 0.5 m. Find the greatest and the least pressure it can put on the floor.",
        steps: [
          "The faces have areas \\(0.2 \\times 0.3 = 0.06\\), \\(0.2 \\times 0.5 = 0.1\\) and \\(0.3 \\times 0.5 = 0.15\\) square metres.",
          "Greatest pressure on the smallest face: \\(\\frac{120}{0.06} = 2000\\) Pa.",
          "Least pressure on the largest face: \\(\\frac{120}{0.15} = 800\\) Pa.",
        ],
        answer: "2000 Pa and 800 Pa",
      },
      selfCheckExample: {
        prompt: "Find the pressure due to the water at the bottom of a pond 4 m deep. Take \\(\\rho = 1000\\ \\text{kg/m}^3\\) and \\(g = 10\\ \\text{m/s}^2\\).",
        steps: ["\\(P = h\\rho g = 4 \\times 1000 \\times 10\\).", "\\(P = 40000 = 4 \\times 10^4\\) Pa."],
        answer: "\\(4 \\times 10^4\\) Pa",
      },
      practiceSet: [
        { prompt: "A force of 50 N acts at right angles on an area of 0.25 square metres. What is the pressure?", answer: "200 Pa" },
        { prompt: "Change a density of 0.8 g/cm³ into kg/m³.", answer: "800 kg/m³" },
        { prompt: "A vessel holds 0.5 m of water with 0.5 m of oil of density 800 kg/m³ on top. What is the pressure at the bottom due to the liquids? Take \\(g = 10\\ \\text{m/s}^2\\).", answer: "\\(5000 + 4000 = 9000\\) Pa" },
        { prompt: "Why does a sharp knife cut better than a blunt one with the same push?", answer: "Its edge has a smaller area, so the same force gives a larger pressure." },
      ],
      pyqExampleId: "d736b6f6-1043-4ef7-9922-45dccb5fba3c",
      traps: [
        {
          title: "Using g/cm³ in h ρ g",
          body:
            "With h in metres and g in m/s², the density must be in kg/m³. An oil of 0.9 g/cm³ is 900 kg/m³; leaving it as 0.9 makes the answer a thousand times too small.",
        },
        {
          title: "Thinking a heavier-looking face presses harder",
          body:
            "The weight is the same whichever face is down. Only the area changes, so the smallest face gives the largest pressure, and opposite faces give the same pressure.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiflpr-depth",
      name: "Pressure in a liquid depends only on depth",
      intuition:
        "A diver feels the same squeeze in the middle of a pool and near its wall, as long as she is at the same depth. What matters is how much liquid is stacked above her, not how wide the pool is or where she is in it.",
      definition:
        "- Pressure in a liquid at rest **increases with depth**.\n" +
        "- At the **same depth** in the same liquid, the pressure is the **same** everywhere: near the wall or in the middle, in a wide jar or a narrow one.\n" +
        "- At any point it acts **equally in all directions**, sideways and upwards as well as down.\n" +
        "- In a **denser** liquid, the pressure at the same depth is larger.\n" +
        "- This is why a dam wall is made **thicker at the bottom**.",
      formula: {
        label: "Pressure at a depth",
        latex: "P = P_0 + h\\rho g",
        symbols: [
          { symbol: "P₀", meaning: "air pressure on the open surface" },
          { symbol: "h", meaning: "depth below the free surface" },
        ],
      },
      authoredExample: {
        prompt: "A wide jar and a narrow jar are both filled with water to a height of 0.3 m. Compare the pressure due to the water at their bottoms. Take \\(\\rho = 1000\\ \\text{kg/m}^3\\) and \\(g = 10\\ \\text{m/s}^2\\).",
        steps: [
          "Pressure depends only on the depth and the liquid, not on the width.",
          "Both: \\(0.3 \\times 1000 \\times 10 = 3000\\) Pa.",
        ],
        answer: "Equal, 3000 Pa each.",
      },
      selfCheckExample: {
        prompt: "In a lake, point X is 2 m below the surface and point Y is 0.5 m below it. Which has more water pressure, and by how much? Take \\(\\rho = 1000\\ \\text{kg/m}^3\\) and \\(g = 10\\ \\text{m/s}^2\\).",
        steps: [
          "X is deeper by \\(2 - 0.5 = 1.5\\) m.",
          "Extra pressure \\(= 1.5 \\times 1000 \\times 10 = 15000\\) Pa.",
        ],
        answer: "X, by \\(1.5 \\times 10^4\\) Pa.",
      },
      practiceSet: [
        { prompt: "Does the pressure at a point inside a liquid act only downwards?", answer: "No: it acts equally in all directions." },
        { prompt: "Why is a dam wall made thicker at the bottom than at the top?", answer: "The water pressure is greatest at the bottom, where the water is deepest." },
        { prompt: "At a depth of 5 m, is the pressure greater in fresh water or in sea water, which is denser?", answer: "In sea water" },
      ],
      pyqExampleId: "6a7439b6-0f70-455b-b365-f3659947f712",
      traps: [
        {
          title: "Thinking the wall changes the pressure",
          body:
            "Two points at the same depth have the same pressure, whether one is near the wall and the other in the middle. Only depth and the liquid's density matter.",
        },
        {
          title: "Thinking a wider vessel gives more pressure",
          body:
            "A wide tank holds more water than a narrow one of the same height, but the pressure at the bottom is the same. The extra water is spread over a larger base.",
        },
      ],
    },
  ],
};

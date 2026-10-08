import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_FLU_PRESSURE_NOTE: SubtopicNote = {
  subtopicName: "Pressure in Fluids",
  title: "Pressure, Depth and the Hydraulic Press",
  oneLineDefinition:
    "Pressure is force per area; in a liquid at rest it grows with depth, and any extra pressure you add is passed on to every point.",
  whyItMatters:
    "Pressure appears in the 2012, 2021, 2025 and 2026 papers. The two ministry questions asked for a fact: which way a still liquid pushes on its container, and how deep a diver goes before the pressure doubles.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-flu-pressure-def",
      name: "Pressure as force per area, and its units",
      intuition:
        "The same push hurts more through a needle than through a palm. Pressure measures how concentrated a force is: the force divided by the area it is spread over. Halve the area and the pressure doubles, though the force has not changed.",
      definition:
        "**Pressure** is the perpendicular force on a surface divided by the area of that surface.\n" +
        "- SI unit: the **pascal**, \\(1\\ \\text{Pa} = 1\\ \\text{N/m}^2\\).\n" +
        "- IMAT also uses units outside SI: \\(1\\ \\text{atm} \\approx 1.013 \\times 10^5\\ \\text{Pa} = 760\\ \\text{mmHg}\\), and \\(1\\ \\text{bar} = 10^5\\ \\text{Pa}\\).\n" +
        "- Area conversions are the usual slip: \\(1\\ \\text{cm}^2 = 10^{-4}\\ \\text{m}^2\\) and \\(1\\ \\text{mm}^2 = 10^{-6}\\ \\text{m}^2\\).",
      formula: {
        label: "Pressure",
        latex: "p = \\frac{F}{A}",
        symbols: [
          { symbol: "\\(p\\)", meaning: "pressure, in Pa" },
          { symbol: "\\(F\\)", meaning: "force perpendicular to the surface, in N" },
          { symbol: "\\(A\\)", meaning: "area, in m²" },
        ],
      },
      authoredExample: {
        prompt:
          "A crate weighing 600 N rests on the floor on a face measuring 0.20 m by 0.30 m. It is then turned over onto a face measuring 0.10 m by 0.20 m. Find the pressure on the floor in each position.",
        steps: [
          "First face: \\(A = 0.20 \\times 0.30 = 0.060\\ \\text{m}^2\\), so \\(p = 600 / 0.060 = 1.0 \\times 10^4\\ \\text{Pa}\\).",
          "Second face: \\(A = 0.10 \\times 0.20 = 0.020\\ \\text{m}^2\\), so \\(p = 600 / 0.020 = 3.0 \\times 10^4\\ \\text{Pa}\\).",
          "The weight is the same both times; the area is three times smaller, so the pressure is three times larger.",
        ],
        answer: "\\(1.0 \\times 10^4\\ \\text{Pa}\\), then \\(3.0 \\times 10^4\\ \\text{Pa}\\)",
      },
      selfCheckExample: {
        prompt:
          "A thumb pushes a drawing pin into a board with a force of 50 N. The point of the pin has an area of 0.25 mm². What pressure does the point exert on the board?",
        options: [
          "\\(2.0 \\times 10^2\\ \\text{Pa}\\)",
          "\\(2.0 \\times 10^5\\ \\text{Pa}\\)",
          "\\(2.0 \\times 10^6\\ \\text{Pa}\\)",
          "\\(2.0 \\times 10^8\\ \\text{Pa}\\)",
          "\\(5.0 \\times 10^{-9}\\ \\text{Pa}\\)",
        ],
        steps: [
          "Convert the area: \\(0.25\\ \\text{mm}^2 = 0.25 \\times 10^{-6}\\ \\text{m}^2 = 2.5 \\times 10^{-7}\\ \\text{m}^2\\).",
          "\\(p = F/A = 50 / (2.5 \\times 10^{-7}) = 2.0 \\times 10^8\\ \\text{Pa}\\).",
          "Option A forgets to convert; B and C convert mm² with the wrong power of ten; E divides area by force.",
        ],
        answer: "(D) \\(2.0 \\times 10^8\\ \\text{Pa}\\)",
      },
      practiceSet: [
        { prompt: "A force of 120 N acts evenly on an area of 0.040 m². What is the pressure?", answer: "3000 Pa", method: "\\(120 / 0.040\\)" },
        { prompt: "Express an area of 1 cm² in square metres.", answer: "\\(1 \\times 10^{-4}\\ \\text{m}^2\\)", method: "\\(1\\ \\text{cm} = 10^{-2}\\ \\text{m}\\), squared" },
        { prompt: "Express a pressure of 380 mmHg in atmospheres.", answer: "0.50 atm", method: "\\(380/760\\)" },
        { prompt: "About how many pascals is a pressure of 2.0 atm?", answer: "About \\(2.0 \\times 10^5\\ \\text{Pa}\\)", method: "\\(1\\ \\text{atm} \\approx 1.0 \\times 10^5\\ \\text{Pa}\\)" },
      ],
      traps: [
        {
          title: "Square millimetres are not a thousandth of a square metre",
          body: "A millimetre is \\(10^{-3}\\) m, so a square millimetre is \\((10^{-3})^2 = 10^{-6}\\ \\text{m}^2\\). Converting the length and forgetting to square it gives an answer a thousand times too small, and IMAT puts that wrong answer among the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-flu-hydrostatic",
      name: "Pressure at a depth in a liquid (Stevin's law)",
      intuition:
        "At any depth, the liquid is holding up the column of liquid above it. A taller column weighs more, so the pressure rises steadily as you go down. Only the depth matters, not the width or shape of the container. A still liquid can only push straight against a surface, never along it, so its force on every wall is perpendicular to that wall.",
      definition:
        "In a liquid at rest:\n" +
        "- The pressure at depth \\(h\\) is the pressure at the surface plus \\(\\rho g h\\) (**Stevin's law**).\n" +
        "- Points at the **same depth** in the same connected liquid have the **same pressure**, whatever the shape of the vessel.\n" +
        "- The force a still liquid exerts on a wall is **perpendicular to the wall** at every point.\n" +
        "- For water, \\(\\rho g h\\) reaches about \\(1\\ \\text{atm}\\) at \\(h \\approx 10\\ \\text{m}\\). So at about 10 m down the total pressure is twice the surface pressure.\n" +
        "- **Gauge pressure** is \\(\\rho g h\\) alone; **absolute pressure** adds the atmosphere on top.",
      formula: {
        label: "Pressure at depth h",
        latex: "p = p_0 + \\rho g h",
        symbols: [
          { symbol: "\\(p_0\\)", meaning: "pressure at the surface (often atmospheric)" },
          { symbol: "\\(\\rho\\)", meaning: "density of the liquid, in kg/m³" },
          { symbol: "\\(g\\)", meaning: "gravitational field strength, about 9.8 N/kg (IMAT often says 10)" },
          { symbol: "\\(h\\)", meaning: "depth below the surface, in m" },
        ],
      },
      authoredExample: {
        prompt:
          "A diver is 25 m below the surface of a freshwater lake. Take \\(\\rho = 1000\\ \\text{kg/m}^3\\), \\(g = 10\\ \\text{N/kg}\\) and atmospheric pressure \\(1.0 \\times 10^5\\ \\text{Pa}\\). Find the gauge and the absolute pressure on the diver.",
        steps: [
          "Gauge pressure: \\(\\rho g h = 1000 \\times 10 \\times 25 = 2.5 \\times 10^5\\ \\text{Pa}\\).",
          "Absolute pressure: \\(p_0 + \\rho g h = 1.0 \\times 10^5 + 2.5 \\times 10^5 = 3.5 \\times 10^5\\ \\text{Pa}\\).",
          "That is about 3.5 atm: one from the air, and one for each 10 m of water.",
        ],
        answer: "Gauge \\(2.5 \\times 10^5\\ \\text{Pa}\\); absolute \\(3.5 \\times 10^5\\ \\text{Pa}\\)",
      },
      selfCheckExample: {
        prompt:
          "A tank is filled with oil of density 800 kg/m³ to a depth of 5.0 m. Taking \\(g = 10\\ \\text{N/kg}\\), what is the pressure at the bottom due to the oil alone?",
        options: [
          "\\(4.0 \\times 10^3\\ \\text{Pa}\\)",
          "\\(4.0 \\times 10^4\\ \\text{Pa}\\)",
          "\\(4.0 \\times 10^5\\ \\text{Pa}\\)",
          "\\(1.4 \\times 10^5\\ \\text{Pa}\\)",
          "\\(1.6 \\times 10^3\\ \\text{Pa}\\)",
        ],
        steps: [
          "Due to the oil alone means gauge pressure: \\(\\rho g h\\).",
          "\\(800 \\times 10 \\times 5.0 = 4.0 \\times 10^4\\ \\text{Pa}\\).",
          "Option D adds the atmosphere, which the question excludes; E divides by the depth instead of multiplying.",
        ],
        answer: "(B) \\(4.0 \\times 10^4\\ \\text{Pa}\\)",
      },
      practiceSet: [
        { prompt: "Two points in the same lake are 3.0 m apart vertically. Taking \\(g = 10\\ \\text{N/kg}\\), what is their pressure difference?", answer: "\\(3.0 \\times 10^4\\ \\text{Pa}\\)", method: "\\(1000 \\times 10 \\times 3.0\\)" },
        { prompt: "At about what depth in water is the gauge pressure 2 atm?", answer: "About 20 m", method: "About 10 m of water per atmosphere" },
        { prompt: "At a depth of 1 m, which gives the greater pressure: water or mercury?", answer: "Mercury", method: "\\(\\rho g h\\) grows with density; mercury is about 13.6 times denser" },
        { prompt: "A narrow tube and a wide tank hold water to the same depth. How do the pressures at their bottoms compare?", answer: "They are equal", method: "Pressure depends on depth, not on width or volume" },
      ],
      traps: [
        {
          title: "Doubling the pressure means doubling the absolute pressure",
          body: "At the surface the pressure is already about 1 atm from the air. It doubles when the water adds another 1 atm, at about 10 m. Answering with the depth where the water's own pressure doubles has no meaning, because that pressure starts at zero.",
        },
        {
          title: "A still liquid pushes perpendicular to the wall",
          body: "A liquid at rest cannot push along a surface; any sideways component would make it flow. So the force on each part of a wall is at right angles to that part, at every point. Options saying the force can be in any direction, or parallel to the wall, are wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-flu-pascal",
      name: "Pascal's principle and the hydraulic press",
      intuition:
        "Squeeze a closed bag of liquid at one spot and it bulges everywhere: the extra pressure reaches every point. A hydraulic press uses this. A small force on a small piston makes a pressure, and that same pressure acting on a large piston makes a large force. Nothing is free, though: the large piston moves only a short way.",
      definition:
        "**Pascal's principle**: a change in pressure applied to an enclosed liquid is passed on undiminished to every point of the liquid and to the walls.\n" +
        "- In a hydraulic press the two pistons are at the same level, so the pressure under each is the same: \\(F_1/A_1 = F_2/A_2\\).\n" +
        "- The force is multiplied by the area ratio \\(A_2/A_1\\). If you are given diameters, the area ratio is the diameter ratio **squared**.\n" +
        "- The liquid's volume is fixed, so \\(A_1 d_1 = A_2 d_2\\): the large piston moves a shorter distance, and the work done on each piston is the same.",
      formula: {
        label: "Hydraulic press",
        latex: "\\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\qquad A_1 d_1 = A_2 d_2",
        symbols: [
          { symbol: "\\(F_1, A_1, d_1\\)", meaning: "force on, area of, and distance moved by the small piston" },
          { symbol: "\\(F_2, A_2, d_2\\)", meaning: "the same for the large piston" },
        ],
      },
      authoredExample: {
        prompt:
          "A hydraulic jack has a small piston of area 4.0 cm² and a large piston of area 200 cm². A force of 30 N pushes the small piston down by 25 cm. Find the force on the large piston and how far it rises.",
        steps: [
          "Area ratio: \\(200 / 4.0 = 50\\), so \\(F_2 = 30 \\times 50 = 1500\\ \\text{N}\\).",
          "Volume pushed in: \\(4.0 \\times 25 = 100\\ \\text{cm}^3\\). The large piston rises \\(100 / 200 = 0.50\\ \\text{cm}\\).",
          "Check with work: \\(30 \\times 0.25 = 7.5\\ \\text{J}\\) in, and \\(1500 \\times 0.0050 = 7.5\\ \\text{J}\\) out. The force is multiplied; the energy is not.",
        ],
        answer: "1500 N, rising 0.50 cm",
      },
      selfCheckExample: {
        prompt:
          "In a hydraulic lift, the large piston has 5 times the diameter of the small piston. What load can the large piston support when a force of 40 N is applied to the small piston?",
        options: ["200 N", "1000 N", "8 N", "40 N", "1.6 N"],
        steps: [
          "Area goes as diameter squared, so the area ratio is \\(5^2 = 25\\).",
          "\\(F_2 = 40 \\times 25 = 1000\\ \\text{N}\\).",
          "Option A multiplies by the diameter ratio instead of the area ratio.",
        ],
        answer: "(B) 1000 N",
      },
      practiceSet: [
        { prompt: "Pistons have areas in the ratio 1 : 20. What force on the small one balances 300 N on the large one?", answer: "15 N", method: "\\(300 / 20\\)" },
        { prompt: "In a hydraulic press at rest, how do the pressures under the two pistons compare, if both are at the same height?", answer: "They are equal", method: "Pascal's principle" },
        { prompt: "A small piston moves 30 cm while the large one moves 1.5 cm. What is the ratio of their areas?", answer: "Large to small is 20 : 1", method: "\\(A_1 d_1 = A_2 d_2\\)" },
      ],
      traps: [
        {
          title: "A hydraulic press multiplies force, not energy",
          body: "The output force is larger by the area ratio, but the output piston moves a distance smaller by the same ratio. Work in equals work out (ignoring friction). An option claiming the press gives out more energy than it takes in is always wrong.",
        },
      ],
    },
  ],
};

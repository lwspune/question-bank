import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_GAS_STATES_NOTE: SubtopicNote = {
  subtopicName: "States and Kinetic Model",
  title: "Solids, Liquids, Gases and the Kinetic Model",
  oneLineDefinition:
    "Matter is made of particles in constant motion; how close they are and how freely they move decides the state, and their average kinetic energy is set by the absolute temperature.",
  whyItMatters:
    "The 2023 ministry paper asked why a kilogram of ice takes up more room than a kilogram of liquid water. The 2018 and 2021 papers asked how the kinetic energy of molecules changes when the temperature changes.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-gas-kinetic-model",
      name: "The three states of matter in the particle model",
      intuition:
        "Every substance is made of tiny particles (atoms, molecules or ions) that never stop moving. Forces of attraction pull them together; their motion pulls them apart. In a solid the attractions win, in a gas the motion wins, and a liquid sits in between.",
      definition:
        "The **kinetic model** (kinetic theory) of matter says:\n" +
        "- All matter is made of particles that are always moving.\n" +
        "- In a **solid** the particles are packed closely in fixed positions and **vibrate** about those positions.\n" +
        "- In a **liquid** the particles are still close together but can **slide past one another**, so a liquid flows.\n" +
        "- In a **gas** the particles are **far apart** and move fast and randomly in straight lines between collisions.\n" +
        "- Heating a substance gives its particles more kinetic energy; this is what eventually overcomes the attractions and changes the state.",
      table: {
        columns: ["State", "Arrangement and spacing", "Motion of particles", "Shape and volume", "Compressible?"],
        rows: [
          { cells: ["Solid", "Close together, usually in a regular pattern", "Vibrate about fixed positions", "Fixed shape and fixed volume", "Almost not at all"] },
          { cells: ["Liquid", "Close together, no regular pattern", "Move around and slide past one another", "Takes the shape of the container, fixed volume", "Almost not at all"] },
          { cells: ["Gas", "Far apart, random", "Fast, random, straight lines between collisions", "Fills the whole container", "Very easily"] },
        ],
        caption: "A gas at room conditions is mostly empty space: the gaps between molecules are about ten times the size of the molecules.",
      },
      selfCheckExample: {
        prompt: "Which statement correctly describes the particles in a liquid?",
        options: [
          "They vibrate about fixed positions and cannot move past one another",
          "They are close together and can move past one another",
          "They are far apart and move in straight lines between collisions",
          "They are close together and have no kinetic energy",
          "They form a regular lattice, but with more space between particles than in the solid",
        ],
        steps: [
          "In a liquid the particles are about as close as in a solid, which is why liquids are hard to compress.",
          "Unlike a solid, they are not held in fixed positions, so they slide past one another and the liquid flows.",
          "A describes a solid, C a gas. D is wrong because particles in every state are moving. E mixes up a solid's regular lattice with a liquid.",
        ],
        answer: "(B) They are close together and can move past one another",
      },
      practiceSet: [
        { prompt: "Why can a gas be squeezed into a smaller volume but a liquid hardly at all?", answer: "The particles of a gas have large spaces between them; those of a liquid are already touching.", method: "Compare the spacing" },
        { prompt: "In which state do the particles have the most freedom of movement?", answer: "Gas", method: "Weakest effect of attractions" },
        { prompt: "What happens to the average speed of the particles of a gas when it is heated?", answer: "It increases", method: "More kinetic energy means faster motion" },
      ],
      traps: [
        {
          title: "Particles in a solid still move",
          body: "Particles in a solid are not still. They vibrate about fixed positions, and they vibrate more as the solid gets hotter. Options saying the particles of a solid have no kinetic energy are wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-gas-kelvin-ke",
      name: "Absolute temperature and the average kinetic energy of particles",
      intuition:
        "Temperature is a measure of how fast the particles are moving on average. The Celsius scale puts its zero at the melting point of ice, which is an arbitrary choice. The kelvin scale puts its zero where the particle motion would be at its minimum, so on that scale the average kinetic energy is directly proportional to the number.",
      definition:
        "- The **kelvin** (K) is the SI unit of temperature. **Absolute zero**, 0 K, is \\(-273.15\\ ^\\circ\\text{C}\\).\n" +
        "- A temperature step of 1 K is the same size as a step of 1 °C, so only the zero point differs.\n" +
        "- The **average kinetic energy** of the particles is **directly proportional to the absolute temperature**. Doubling the kelvin temperature doubles it; doubling the Celsius temperature does not.\n" +
        "- At the same temperature, all gases have the **same average kinetic energy** per molecule. Heavier molecules therefore move more slowly.\n" +
        "- For a gas, the average kinetic energy per molecule is \\(\\tfrac{3}{2}k_B T\\), where \\(k_B\\) is the Boltzmann constant.",
      formula: {
        label: "Kelvin from Celsius, and kinetic energy",
        latex: "T\\,(\\text{K}) = \\theta\\,({}^{\\circ}\\text{C}) + 273.15 \\qquad \\bar{E}_k \\propto T",
        symbols: [
          { symbol: "\\(T\\)", meaning: "absolute temperature, in K" },
          { symbol: "\\(\\theta\\)", meaning: "temperature in degrees Celsius (IMAT often uses 273 instead of 273.15)" },
          { symbol: "\\(\\bar{E}_k\\)", meaning: "average kinetic energy of the particles" },
        ],
      },
      authoredExample: {
        prompt:
          "A sample of argon is at \\(-73\\ ^\\circ\\text{C}\\). To what Celsius temperature must it be heated so that the average kinetic energy of its atoms becomes 1.5 times larger?",
        steps: [
          "Convert to kelvin: \\(-73 + 273 = 200\\ \\text{K}\\).",
          "Kinetic energy is proportional to the kelvin temperature, so the new temperature is \\(1.5 \\times 200 = 300\\ \\text{K}\\).",
          "Convert back: \\(300 - 273 = 27\\ ^\\circ\\text{C}\\).",
          "Multiplying \\(-73\\ ^\\circ\\text{C}\\) by 1.5 would give a colder temperature, which shows that the Celsius number cannot be used in a ratio.",
        ],
        answer: "\\(27\\ ^\\circ\\text{C}\\) (300 K)",
      },
      selfCheckExample: {
        prompt:
          "The average kinetic energy of the atoms in a sample of neon at 127 °C is E. At what temperature will the average kinetic energy be 2E?",
        options: ["254 °C", "800 °C", "527 °C", "400 °C", "673 °C"],
        steps: [
          "Convert to kelvin: \\(127 + 273 = 400\\ \\text{K}\\).",
          "Doubling the kinetic energy needs double the kelvin temperature: 800 K.",
          "Convert back: \\(800 - 273 = 527\\ ^\\circ\\text{C}\\).",
          "A doubles the Celsius value. B is 800 K written as °C. D is the starting temperature in kelvin. E adds 273 instead of subtracting it at the end.",
        ],
        answer: "(C) 527 °C",
      },
      practiceSet: [
        { prompt: "Convert body temperature, 37 °C, to kelvin.", answer: "310 K", method: "\\(37 + 273\\)" },
        { prompt: "Convert 250 K to degrees Celsius.", answer: "\\(-23\\ ^\\circ\\text{C}\\)", method: "\\(250 - 273\\)" },
        { prompt: "A gas is heated from 300 K to 600 K. By what factor does the average kinetic energy of its molecules change?", answer: "It doubles", method: "\\(\\bar{E}_k \\propto T\\)" },
        { prompt: "Helium and oxygen are both at 50 °C. Which has the greater average kinetic energy per molecule?", answer: "Neither: they are equal", method: "Same temperature, same average kinetic energy" },
      ],
      traps: [
        {
          title: "Only kelvin temperatures can be used in ratios",
          body: "Going from 20 °C to 40 °C does not double the kinetic energy: in kelvin it is 293 K to 313 K, a rise of under 7%. Any calculation where the answer depends on a ratio of temperatures must use kelvin.",
        },
        {
          title: "At the same temperature, heavier molecules are slower, not more energetic",
          body: "All gases at the same temperature have the same average kinetic energy per molecule. Since \\(E_k = \\tfrac{1}{2}mv^2\\), the heavier molecules move more slowly.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-gas-water-anomaly",
      name: "Water is unusual: ice is less dense than liquid water",
      intuition:
        "For most substances the solid is the most tightly packed state. Water is different because of hydrogen bonding. In ice every molecule is held by hydrogen bonds in an open, cage-like lattice with a lot of empty space. When ice melts, part of that lattice collapses and the molecules crowd closer together.",
      definition:
        "- **Ice is less dense than liquid water**: about 0.92 g/cm³ against about 1.00 g/cm³. So the same mass of ice has a **larger volume** (about 9% more), and ice floats.\n" +
        "- The reason is the **open hexagonal lattice** of hydrogen-bonded molecules in ice: the particles are **further apart** in ice than in the liquid.\n" +
        "- Liquid water is densest at about **4 °C**. Below 4 °C it expands again as it cools.\n" +
        "- Ice and water at 0 °C have the **same average kinetic energy** (same temperature). The energy taken in on melting goes into breaking hydrogen bonds, not into speeding the molecules up.\n" +
        "- Consequences: ponds freeze from the top down, water in a sealed bottle or a pipe can burst it on freezing, and higher pressure slightly lowers the melting point of ice.",
      table: {
        columns: ["Property", "Ice at 0 °C", "Liquid water at 0 °C"],
        rows: [
          { cells: ["Density", "About 0.92 g/cm³", "About 1.00 g/cm³"] },
          { cells: ["Volume of 1 kg", "About 1.09 L", "About 1.00 L"] },
          { cells: ["Arrangement", "Open lattice held by hydrogen bonds; molecules further apart", "Some hydrogen bonds broken; molecules packed closer"] },
          { cells: ["Average kinetic energy", "Same as the liquid at 0 °C", "Same as the ice at 0 °C"] },
        ],
        caption: "Water is one of very few substances whose solid floats on its own liquid.",
      },
      selfCheckExample: {
        prompt:
          "A sealed glass bottle filled to the top with water cracks when it is left in a freezer overnight. Which statement explains this?",
        options: [
          "Water molecules move faster in ice, so they push harder on the glass",
          "Water contracts as it freezes and pulls the glass inwards",
          "Ice has a greater mass than the water it formed from",
          "The glass expands more than the water as it cools",
          "The same mass of ice takes up more volume, because hydrogen bonds hold its molecules further apart",
        ],
        steps: [
          "Freezing turns liquid water into ice, which has a lower density.",
          "Mass is conserved, so a lower density means a larger volume (about 9% larger). The ice has no room to expand and breaks the glass.",
          "A is wrong because the ice is colder, so its molecules have less kinetic energy, not more. B has the volume change backwards. C is impossible: freezing does not change mass. D: glass contracts as it cools.",
        ],
        answer: "(E) The same mass of ice takes up more volume, because hydrogen bonds hold its molecules further apart",
      },
      practiceSet: [
        { prompt: "What volume does 1.00 kg of ice of density 0.917 g/cm³ occupy?", answer: "About 1090 cm³ (1.09 L)", method: "\\(1000 / 0.917\\)" },
        { prompt: "At about what temperature does liquid water have its greatest density?", answer: "About 4 °C" },
        { prompt: "Why does a lake freeze from the top down?", answer: "Ice is less dense, so it floats on the water below; water at about 4 °C, the densest, sinks to the bottom.", method: "Compare densities" },
      ],
      traps: [
        {
          title: "The solid is not always the densest state",
          body: "For most substances the solid is denser than the liquid, but water is the exception: ice is less dense than liquid water because its molecules are further apart. The explanation is the spacing of the molecules, not their kinetic energy.",
        },
      ],
    },
  ],
};

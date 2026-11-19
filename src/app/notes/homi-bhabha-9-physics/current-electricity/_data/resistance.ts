import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_CE_RESISTANCE_NOTE: SubtopicNote = {
  subtopicName: "Ohm's Law and Resistance",
  title: "Ohm's Law and Resistance",
  oneLineDefinition:
    "Ohm's law says V = IR at a fixed temperature; a wire's resistance grows with its length and falls as it gets thicker (R = ρl/A), while its resistivity ρ depends only on its material and temperature.",
  whyItMatters:
    "The busiest page of the chapter: nine questions, one EASY, seven MODERATE and one HARD. One uses V = IR on a table of readings. Five compare wires of the same metal by their length and area of cross-section (the same four-piece figure was asked in January 2021 and again in 2024). Three are about resistivity: putting metals in order, what changes it, and the temperature at which resistance almost vanishes.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9cere-ohm",
      name: "Ohm's law: V = IR",
      intuition:
        "Push harder and more water flows through a pipe. In the same way, a bigger potential difference drives a bigger current through a wire. For a metal wire kept at the same temperature, the current goes up in exactly the same proportion: double the voltage, double the current. The fixed ratio of the two is the wire's resistance.",
      definition:
        "- **Ohm's law**: at a constant temperature, the current through a conductor is **directly proportional** to the potential difference across it.\n" +
        "- So \\(\\frac{V}{I}\\) is a constant, the **resistance** R: \\(V = IR\\).\n" +
        "- Unit of resistance: the **ohm (Ω)**. 1 Ω is the resistance that lets 1 A flow when 1 V is applied.\n" +
        "- A graph of V against I for such a conductor is a **straight line through the origin**.\n" +
        "- Change **milliamperes** to amperes first: 1 mA = 0.001 A.",
      formula: {
        label: "Ohm's law",
        latex: "V = IR \\qquad I = \\frac{V}{R} \\qquad R = \\frac{V}{I}",
        symbols: [
          { symbol: "V", meaning: "potential difference, in volts (V)" },
          { symbol: "I", meaning: "current, in amperes (A)" },
          { symbol: "R", meaning: "resistance, in ohms (Ω)" },
        ],
      },
      authoredExample: {
        prompt: "A heater coil draws a current of 4 A from a 220 V supply. Find its resistance. What current would it draw from a 110 V supply?",
        steps: [
          "Resistance: \\(R = \\frac{V}{I} = \\frac{220}{4} = 55\\) Ω.",
          "On 110 V the resistance is the same: \\(I = \\frac{V}{R} = \\frac{110}{55} = 2\\) A.",
        ],
        answer: "55 Ω; it would draw 2 A",
      },
      selfCheckExample: {
        prompt: "A current of 0.2 A flows through a 15 Ω resistor. What is the potential difference across it?",
        steps: ["\\(V = IR = 0.2 \\times 15 = 3\\) V."],
        answer: "3 V",
      },
      practiceSet: [
        { prompt: "A 12 V battery drives a current of 3 A through a lamp. What is the resistance of the lamp?", answer: "\\(\\frac{12}{3} = 4\\) Ω" },
        { prompt: "The potential difference across a resistor is doubled while its temperature stays the same. What happens to the current through it?", answer: "The current also doubles" },
        { prompt: "Write 250 mA in amperes.", answer: "0.25 A" },
        { prompt: "A 40 Ω resistor carries a current of 0.5 A. What is the potential difference across it?", answer: "\\(0.5 \\times 40 = 20\\) V" },
      ],
      pyqExampleId: "425e8709-d2c6-43f8-b99a-0d29ee0a5a53",
      traps: [
        {
          title: "Using milliamperes as amperes",
          body: "Change mA to A before using V = IR. A current of 100 mA through 30 Ω needs 3 V, not 3000 V.",
        },
        {
          title: "Thinking the resistance changes with the voltage",
          body: "For a metal wire at the same temperature, R stays the same. If V doubles, I doubles, and V divided by I is unchanged.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9cere-factors",
      name: "Length, thickness and resistance: R = ρl/A",
      intuition:
        "Electrons bump into the metal's atoms as they move. A longer wire means more bumps, so more resistance. A thicker wire is like a wider road: more electrons can pass side by side, so less resistance. That is why the resistance goes up with length and down with the area of cross-section.",
      definition:
        "- For one material, resistance is **directly proportional to length**: \\(R \\propto l\\).\n" +
        "- It is **inversely proportional to the area of cross-section**: \\(R \\propto \\frac{1}{A}\\).\n" +
        "- Together: \\(R = \\rho\\frac{l}{A}\\), where ρ is the **resistivity** of the material.\n" +
        "- To compare pieces of the **same metal**, just compare \\(\\frac{l}{A}\\) for each piece.\n" +
        "- For a round wire \\(A = \\pi r^2\\): doubling the **radius** makes the area **4 times**, so the resistance becomes **one quarter**.\n" +
        "- **Stretching** a wire to twice its length also halves its area (the volume stays the same), so its resistance becomes **4 times**.",
      formula: {
        label: "Resistance of a wire",
        latex: "R = \\rho\\frac{l}{A} \\qquad A = \\pi r^2",
        symbols: [
          { symbol: "R", meaning: "resistance, in ohms (Ω)" },
          { symbol: "ρ", meaning: "resistivity of the material, in ohm metre (Ω m)" },
          { symbol: "l", meaning: "length of the wire, in metres" },
          { symbol: "A", meaning: "area of cross-section, in square metres" },
          { symbol: "r", meaning: "radius of a round wire" },
        ],
      },
      authoredExample: {
        prompt: "Wire X has a length of 40 cm and an area of cross-section of 2 mm². Wire Y, of the same metal, has a length of 120 cm and an area of cross-section of 0.5 mm². Find the ratio of the resistance of X to that of Y.",
        steps: [
          "Same metal, so compare \\(\\frac{l}{A}\\).",
          "X: \\(\\frac{40}{2} = 20\\). Y: \\(\\frac{120}{0.5} = 240\\).",
          "\\(R_X : R_Y = 20 : 240 = 1 : 12\\).",
        ],
        answer: "1 : 12 (Y has 12 times the resistance of X)",
      },
      selfCheckExample: {
        prompt: "The radius of a copper wire is doubled while its length is kept the same. What happens to its resistance?",
        steps: [
          "The area is \\(\\pi r^2\\), so doubling r makes the area 4 times.",
          "Resistance is inversely proportional to area.",
        ],
        answer: "It becomes one quarter of what it was.",
      },
      practiceSet: [
        { prompt: "A copper wire is cut into two equal halves. What is the resistance of each half, compared with the whole wire?", answer: "Half the resistance of the whole wire" },
        { prompt: "Two wires of the same metal have the same length, but one has twice the area of cross-section of the other. Which has the greater resistance, and how many times?", answer: "The thinner wire, with twice the resistance" },
        { prompt: "A wire is stretched to twice its length while its volume stays the same. How does its resistance change?", answer: "It becomes 4 times" },
        { prompt: "Wire P has length l and area A. Wire Q, of the same metal, has length 4l and area 2A. Which has more resistance, and how many times?", answer: "Q, with \\(\\frac{4}{2} = 2\\) times the resistance of P" },
      ],
      pyqExampleId: "c1f6479e-dc4d-411b-bdbb-1f1c9ad510f3",
      traps: [
        {
          title: "Thinking a thicker wire has more resistance",
          body: "A thicker wire gives the current more room, so its resistance is less. Resistance falls as the area of cross-section grows.",
        },
        {
          title: "Forgetting that area goes as the radius squared",
          body: "Doubling the radius makes the area 4 times, not 2 times, so the resistance becomes one quarter, not one half.",
        },
        {
          title: "Comparing pieces of different metals by l/A alone",
          body: "Comparing l/A works only for pieces of the same material. Different metals have different resistivities, which must be included.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9cere-resistivity",
      name: "Resistivity of materials and the effect of temperature",
      intuition:
        "Resistance belongs to one particular wire; resistivity belongs to the material it is made of. A long copper wire and a short copper wire have different resistances but exactly the same resistivity, just as a big and a small gold coin have the same density.",
      definition:
        "- **Resistivity** (ρ) is a property of the **material**. It does **not** change with the length or thickness of the wire.\n" +
        "- Its unit is the **ohm metre (Ω m)**.\n" +
        "- **Silver** and **copper** have the lowest resistivity, which is why copper is used for wires. **Alloys** such as **nichrome** have a much higher resistivity, so they are used for heating coils.\n" +
        "- The resistance of a **metal increases** when it is **heated** and decreases when it is cooled.\n" +
        "- Cooled close to **absolute zero** (0 K, which is about −273 °C), some materials lose all their resistance: they become **superconductors**. Mercury does this at about 4 K.",
      table: {
        columns: ["Material", "Resistivity at 20 °C (Ω m)", "Use or note"],
        rows: [
          { cells: ["Silver", "1.6 × 10⁻⁸", "The best conductor"] },
          { cells: ["Copper", "1.7 × 10⁻⁸", "Electric wires"] },
          { cells: ["Aluminium", "2.7 × 10⁻⁸", "Overhead power lines"] },
          { cells: ["Tungsten", "5.6 × 10⁻⁸", "Bulb filaments"] },
          { cells: ["Platinum", "10.6 × 10⁻⁸", "Hardly reacts, so used in special wires and contacts"] },
          { cells: ["Nichrome (an alloy)", "About 1.1 × 10⁻⁶", "Heating coils of irons and heaters"] },
        ],
        caption: "In increasing order: silver, copper, aluminium, tungsten, platinum, nichrome. Alloys come last.",
      },
      selfCheckExample: {
        prompt: "Why is the coil of an electric heater made of nichrome and not copper?",
        steps: [
          "Nichrome has a much higher resistivity than copper, so a coil of it has a high resistance and gets very hot.",
          "It also stays solid and does not burn away at red heat.",
        ],
        answer: "Nichrome's high resistivity makes the coil heat up, and it can stay red hot without melting or burning.",
      },
      practiceSet: [
        { prompt: "A copper wire is cut into two halves. What happens to the resistivity of each half?", answer: "It stays the same: resistivity depends only on the material" },
        { prompt: "Arrange in increasing order of resistivity: nichrome, silver, aluminium.", answer: "Silver, aluminium, nichrome" },
        { prompt: "What is a material called that loses all its resistance when cooled close to absolute zero?", answer: "A superconductor" },
        { prompt: "How does the resistance of a metal wire change when it gets hotter?", answer: "It increases" },
      ],
      pyqExampleId: "f4484358-5ac4-43a9-8345-af2616a79bc5",
      traps: [
        {
          title: "Treating resistivity like resistance",
          body: "Cutting, stretching or thickening a wire changes its resistance, but its resistivity stays the same as long as the material and temperature do not change.",
        },
        {
          title: "Thinking resistance vanishes at 0 °C",
          body: "0 °C is only the freezing point of water. Resistance nearly vanishes close to absolute zero, 0 K, which is about −273 °C.",
        },
        {
          title: "Writing the unit of resistivity as the ohm",
          body: "Resistance is measured in ohms; resistivity is measured in ohm metres (Ω m).",
        },
      ],
    },
  ],
};

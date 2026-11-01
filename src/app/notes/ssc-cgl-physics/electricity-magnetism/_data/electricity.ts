import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_FEM_ELECTRICITY_NOTE: SubtopicNote = {
  subtopicName: "Circuits, Power and Magnetism",
  title: "Circuits, Power and Magnetism",
  oneLineDefinition:
    "Ohm's law and resistors in parallel, resistivity and its unit, electrical energy in units and fuse ratings, and magnets, the right-hand thumb rule and electromagnetic devices.",
  whyItMatters:
    "Fifteen questions in the bank, five from each year's shifts, 13 of them EASY. The four sums use two formulas, and the rest are single facts about magnets and devices.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscfemel-circuits",
      name: "Ohm's law and resistance",
      intuition:
        "Current is pushed by voltage and held back by resistance. In parallel, each resistor gets the full voltage, so the currents simply add.",
      definition:
        "The rules:\n" +
        "- **Ohm's law**: V = IR, so with V fixed, **doubling R halves I**.\n" +
        "- **Parallel**: 1/R = 1/R1 + 1/R2; for two resistors, R = R1R2 / (R1 + R2). **Series**: R = R1 + R2.\n" +
        "- **Resistivity** (specific resistance) has the unit **ohm metre**.\n" +
        "- **Alloys** such as **nichrome** have far higher resistivity than pure metals (silver lowest).",
      formula: {
        latex: "I = \\frac{V}{R}, \\qquad \\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2}",
        label: "Ohm's law and parallel resistors",
        symbols: [
          { symbol: "I", meaning: "Current" },
          { symbol: "V", meaning: "Potential difference" },
          { symbol: "R_p", meaning: "Resistance of the parallel combination" },
        ],
      },
      authoredExample: {
        prompt: "Resistors of 3 ohm and 6 ohm are in parallel across a 12 V battery. Find the total current.",
        steps: ["R = 3 x 6 / (3 + 6) = 2 ohm.", "I = 12 / 2 = 6 A. Check: 12/3 + 12/6 = 4 + 2 = 6 A."],
        answer: "6 A.",
      },
      pyqExampleId: "a5ade2cb-17dc-4c4f-8fbe-6f85cc38365a",
      selfCheckExample: {
        prompt: "A wire carries 2 A at a fixed voltage. Its resistance is doubled. What is the new current?",
        steps: ["I = V / R, with V fixed.", "Doubling R halves I: 2 / 2 = 1 A."],
        answer: "1 A.",
      },
      practiceSet: [
        { prompt: "What is the unit of resistivity?", answer: "Ohm metre" },
        { prompt: "Which has the higher resistivity, nichrome or silver?", answer: "Nichrome" },
        { prompt: "What is the total of 4 ohm and 4 ohm in series?", answer: "8 ohm" },
      ],
      traps: [
        {
          title: "Parallel is less than either",
          body: "Two resistors in **parallel** give **less** resistance than the smaller one. If your answer is bigger, you added them as in series.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscfemel-power",
      name: "Electrical energy and heating",
      intuition:
        "Energy is power times time. The electricity board's unit is the kilowatt-hour, so turn watts into kilowatts and minutes into hours first.",
      definition:
        "The rules:\n" +
        "- **Energy = power x time**; **1 unit = 1 kilowatt-hour**.\n" +
        "- **Current = power / voltage**. A 1 kW iron at 220 V draws about 4.5 A, so it needs a **5 A** fuse.\n" +
        "- A **heating element** (nichrome) needs **high resistivity** and a **high melting point**.",
      formula: {
        latex: "E\\ (\\text{kWh}) = P\\ (\\text{kW}) \\times t\\ (\\text{h})",
        label: "Electrical energy in units",
        symbols: [
          { symbol: "P", meaning: "Power in kilowatts" },
          { symbol: "t", meaning: "Time in hours" },
        ],
      },
      authoredExample: {
        prompt: "A 1,500 W heater runs 2 hours a day for 10 days. How many units does it use?",
        steps: ["Per day: 1.5 kW x 2 h = 3 kWh.", "In 10 days: 3 x 10 = 30 units."],
        answer: "30 units.",
      },
      pyqExampleId: "88b7d45f-b6f4-41ee-a3d7-3f4733f16b6f",
      selfCheckExample: {
        prompt: "Why is a 5 A fuse right for a 1 kW electric iron on a 220 V supply?",
        steps: ["Current = 1000 / 220, about 4.5 A.", "The fuse must be a little above the working current, so 5 A."],
        answer: "The iron draws about 4.5 A, just under 5 A.",
      },
      practiceSet: [
        { prompt: "How many watt-hours make one unit?", answer: "1,000" },
        { prompt: "Why does a heating element need a high melting point?", answer: "So it stays solid when red hot" },
        { prompt: "What alloy is used in heater elements?", answer: "Nichrome" },
      ],
      traps: [
        {
          title: "Convert watts first",
          body: "60 W is **0.06 kW**. Multiplying 60 by hours gives watt-hours, a thousand times too big for units.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscfemel-magnetism",
      name: "Magnets and devices",
      intuition:
        "A current makes a magnetic field, and a changing field makes a current. Most devices here use one or the other.",
      definition:
        "Magnets:\n" +
        "- A hanging bar magnet's north pole points **north**.\n" +
        "- **Steel** makes **permanent** magnets; an **electromagnet** is temporary.\n" +
        "- The **tesla** is the field giving 1 N on 1 m of wire carrying 1 A.\n" +
        "- **Right-hand thumb rule**: thumb along the **current**, fingers curl along the field.\n" +
        "- **Faraday** discovered **electromagnetic induction** in **1831**.\n\n" +
        "Devices:\n" +
        "- **Electric bell**: the **magnetic effect** of current. **Generator**: mechanical to electrical energy. **Transformer**: **AC** only.\n" +
        "- **Cathode ray tube**: an electron beam on a phosphor screen.\n" +
        "- **Gauss and Weber** built the first electromagnetic telegraph in **1833**.",
      table: {
        columns: ["Item", "Fact"],
        rows: [
          { cells: ["Electric bell", "Magnetic effect of current"], pyqExampleId: "ff51086a-903d-48a2-a286-8b1433629655" },
          { cells: ["Thumb in the rule", "Direction of current"], pyqExampleId: "5f739f06-ceaf-494d-927f-b49047a0c488" },
          { cells: ["Permanent magnet", "Steel"], pyqExampleId: "56573681-d11b-4573-8743-4b466ed72e2d" },
          { cells: ["First electromagnetic telegraph", "Gauss and Weber, 1833"], pyqExampleId: "311dba26-b967-41c2-aae3-d9d6c66d9d13" },
          { cells: ["Electron beam on phosphor", "Cathode ray tube"], pyqExampleId: "0ea314cd-0963-43c6-8da3-3166d95c2dff" },
        ],
      },
      pyqExampleId: "4347ff2a-a402-4dd4-a332-61971ae6199b",
      selfCheckExample: {
        prompt: "Correct this pair: transformer, works on DC to change voltage.",
        steps: ["A transformer needs a changing current to induce a voltage.", "Only AC changes all the time, so it works on AC."],
        answer: "A transformer works only on AC.",
      },
      practiceSet: [
        { prompt: "Which way does a freely hung magnet's north pole point?", answer: "North" },
        { prompt: "Is an electromagnet permanent or temporary?", answer: "Temporary" },
        { prompt: "What does a generator convert?", answer: "Mechanical energy to electrical energy" },
      ],
      traps: [
        {
          title: "Generator and motor run opposite ways",
          body: "A **generator** turns **mechanical** energy into electrical; a motor does the reverse. A pair giving the generator the motor's job is false.",
        },
      ],
    },
  ],
};

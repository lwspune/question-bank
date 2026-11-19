import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_CE_CURRENT_NOTE: SubtopicNote = {
  subtopicName: "Current, Cells and Circuits",
  title: "Current, Cells and Circuits",
  oneLineDefinition:
    "Electric current is the charge flowing past a point each second (I = Q/t); a cell drives it round a closed circuit, the ammeter goes in series and the voltmeter across the part it measures.",
  whyItMatters:
    "Eight questions in the bank, two EASY, five MODERATE and one HARD. Two are the same electron-count question (asked in 2023 and again in 2024), one asks which way current and electrons flow and what energy changes happen, one asks which cell can be recharged, and four read circuit diagrams: standard symbols, which part is the ammeter or voltmeter, and which keys light a bulb.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9cecu-charge",
      name: "Current, charge and electrons",
      intuition:
        "A wire is like a pipe full of electrons. A cell pushes them along, and the current tells you how much charge passes a point every second. One electron carries a very tiny charge, so even a small current means a huge number of electrons passing each second.",
      definition:
        "- **Electric current** is the rate of flow of charge: \\(I = \\frac{Q}{t}\\). Its unit is the **ampere (A)**: 1 A is 1 coulomb passing each second.\n" +
        "- Charge is measured in **coulombs (C)**. One electron carries \\(1.6 \\times 10^{-19}\\) C, so 1 C is the charge of \\(6.25 \\times 10^{18}\\) electrons.\n" +
        "- Number of electrons: \\(n = \\frac{Q}{e}\\).\n" +
        "- Outside the cell, the **current** is taken to flow from the **positive** terminal to the **negative** terminal. The **electrons** actually move the **other way**, from negative to positive.\n" +
        "- In a cell **chemical energy** turns into **electric energy**; a bulb turns it into light (and heat), and a coil wound on an iron nail turns it into magnetic energy.",
      formula: {
        label: "Current and charge",
        latex: "I = \\frac{Q}{t} \\qquad Q = It \\qquad n = \\frac{Q}{e} \\qquad e = 1.6 \\times 10^{-19}\\ \\mathrm{C}",
        symbols: [
          { symbol: "I", meaning: "current, in amperes (A)" },
          { symbol: "Q", meaning: "charge, in coulombs (C)" },
          { symbol: "t", meaning: "time, in seconds" },
          { symbol: "n", meaning: "number of electrons" },
          { symbol: "e", meaning: "charge on one electron" },
        ],
      },
      authoredExample: {
        prompt: "A current of 0.5 A flows through a torch bulb for 2 minutes. How much charge passes through the bulb, and how many electrons is that?",
        steps: [
          "Change the time to seconds: 2 minutes = 120 s.",
          "Charge: \\(Q = It = 0.5 \\times 120 = 60\\) C.",
          "Electrons: \\(n = \\frac{Q}{e} = \\frac{60}{1.6 \\times 10^{-19}} = 3.75 \\times 10^{20}\\).",
        ],
        answer: "60 C, which is \\(3.75 \\times 10^{20}\\) electrons",
      },
      selfCheckExample: {
        prompt: "A charge of 30 C passes through a wire in 15 s. What current flows in the wire?",
        steps: ["\\(I = \\frac{Q}{t} = \\frac{30}{15} = 2\\) A."],
        answer: "2 A",
      },
      practiceSet: [
        { prompt: "How many electrons make up a charge of 1 coulomb?", answer: "\\(\\frac{1}{1.6 \\times 10^{-19}} = 6.25 \\times 10^{18}\\) electrons" },
        { prompt: "A current of 3 A flows through a heater for 10 s. How much charge passes through it?", answer: "\\(3 \\times 10 = 30\\) C" },
        { prompt: "In a wire joined across a cell, in which direction do the electrons move?", answer: "From the negative terminal, through the wire, to the positive terminal" },
        { prompt: "What energy change takes place inside a cell that is lighting a bulb?", answer: "Chemical energy changes into electric energy" },
      ],
      pyqExampleId: "143ddbbb-25c3-4d04-9798-075944fc1719",
      traps: [
        {
          title: "Taking the current's direction as the electrons' direction",
          body: "Current is taken to flow from the positive terminal to the negative one outside the cell. Electrons move the opposite way, from negative to positive.",
        },
        {
          title: "Leaving the time in minutes",
          body: "Q = It needs the time in seconds. A current of 2 A for 1 minute moves 120 C, not 2 C.",
        },
        {
          title: "Multiplying by the electron's charge",
          body: "The number of electrons is the charge divided by \\(1.6 \\times 10^{-19}\\) C. Multiplying gives a tiny number, which cannot be a count of electrons.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9cecu-cells",
      name: "Cells and circuit symbols",
      intuition:
        "Some cells are used once and thrown away, like the dry cell in a torch. Others can be charged again and again, like the battery in a phone or a car. To draw a circuit quickly, everyone uses the same small symbols, so a diagram drawn in Pune can be read in Delhi.",
      definition:
        "- A **primary cell** cannot be recharged once its chemicals are used up: the **dry cell**, the **Leclanché cell** and the **Daniell cell**.\n" +
        "- A **secondary cell** can be **recharged** by passing current back through it: the **lead acid cell**, the **nickel cadmium (Ni Cd) cell** and the **lithium ion cell**.\n" +
        "- Two or more cells joined together make a **battery**.\n" +
        "- In the symbol of a cell the **longer, thinner line** is the **positive** terminal and the shorter, thicker line the negative terminal.\n" +
        "- Other standard symbols: a **zigzag line** for a resistor, **A** in a circle for an ammeter, **V** in a circle for a voltmeter, and a plug key drawn **open** (no plug) or **closed** (with the plug).\n" +
        "- Two wires that are **joined** meet at a **dot**; wires that cross **without** being joined are drawn with **no dot**, or with a small **hump** where one wire jumps over the other.",
      table: {
        columns: ["Cell", "Primary or secondary", "Where it is used"],
        rows: [
          { cells: ["Dry cell", "Primary (not rechargeable)", "Torches, clocks, remote controls"] },
          { cells: ["Leclanché cell", "Primary (not rechargeable)", "Older electric bells"] },
          { cells: ["Daniell cell", "Primary (not rechargeable)", "Laboratory cell with copper and zinc"] },
          { cells: ["Lead acid cell", "Secondary (rechargeable)", "Car and inverter batteries"] },
          { cells: ["Nickel cadmium cell", "Secondary (rechargeable)", "Rechargeable torch cells, cordless tools"] },
          { cells: ["Lithium ion cell", "Secondary (rechargeable)", "Mobile phones, laptops"] },
        ],
        caption: "If a question asks which cell is rechargeable, look for the secondary cell among the choices.",
      },
      selfCheckExample: {
        prompt: "Which of these can be charged again after it runs down: a dry cell or a lead acid cell?",
        steps: ["A dry cell is a primary cell.", "A lead acid cell is a secondary cell, so it can be recharged."],
        answer: "The lead acid cell",
      },
      practiceSet: [
        { prompt: "In the circuit symbol of an electric cell, which line stands for the positive terminal?", answer: "The longer, thinner line" },
        { prompt: "What is a battery?", answer: "Two or more cells joined together" },
        { prompt: "Name a rechargeable cell used in car batteries.", answer: "The lead acid cell" },
        { prompt: "How is a joint between two wires shown in a circuit diagram?", answer: "By a dot where the wires meet; wires crossing without a dot are not joined" },
      ],
      pyqExampleId: "162f3fdf-77ce-4ef3-a4b9-b1c5ea16af14",
      traps: [
        {
          title: "Thinking a dry cell can be recharged",
          body: "The dry cell, Leclanché cell and Daniell cell are primary cells and are thrown away when used up. Lead acid, nickel cadmium and lithium ion cells are the rechargeable ones.",
        },
        {
          title: "Reading the short line of a cell as positive",
          body: "In the cell symbol the longer line is the positive terminal and the shorter line the negative terminal.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9cecu-meters",
      name: "Ammeter, voltmeter and keys in a circuit",
      intuition:
        "An ammeter counts the charge flowing through a wire, so all of the current must pass through it: it goes in the line, in series. A voltmeter compares the push at two points, so its two ends are touched across the part being tested: it goes alongside, in parallel. A key is a gate: open it and the whole path is broken.",
      definition:
        "- An **ammeter** measures **current**. It is joined **in series** with the part, and has a very **low resistance** so it does not cut down the current.\n" +
        "- A **voltmeter** measures **potential difference**. It is joined **in parallel** (across) the part, and has a very **high resistance** so it takes almost no current.\n" +
        "- The **positive (+) terminal** of each meter is joined to the side that leads to the **positive terminal of the cell**.\n" +
        "- A **plug key** (switch) goes **in series**. When it is open, the circuit is broken and no current flows anywhere in that path.\n" +
        "- **Circuit to verify Ohm's law**: cell, plug key, ammeter, rheostat and resistor all in series, with the voltmeter across the resistor.",
      table: {
        columns: ["Device", "What it does", "How it is connected"],
        rows: [
          { cells: ["Ammeter", "Measures current, in amperes", "In series, so all the current passes through it"] },
          { cells: ["Voltmeter", "Measures potential difference, in volts", "In parallel, across the part being measured"] },
          { cells: ["Plug key", "Opens or closes the circuit", "In series"] },
          { cells: ["Rheostat", "Changes the current by changing the resistance", "In series"] },
        ],
        caption: "To spot the voltmeter in a diagram, find the meter whose two ends join both ends of the resistor.",
      },
      selfCheckExample: {
        prompt: "A student wants to measure the current through a bulb and the potential difference across it. How should she connect the ammeter and the voltmeter?",
        steps: ["Current must pass through the ammeter, so it goes in series with the bulb.", "The voltmeter compares the two ends of the bulb, so it goes across the bulb."],
        answer: "Ammeter in series with the bulb; voltmeter in parallel across the bulb.",
      },
      practiceSet: [
        { prompt: "Which meter is connected in parallel across a resistor?", answer: "The voltmeter" },
        { prompt: "Why must an ammeter have a very low resistance?", answer: "So that it does not reduce the current it is measuring" },
        { prompt: "What happens to the current in a simple circuit when the plug is taken out of the plug key?", answer: "The circuit is broken, so no current flows" },
        { prompt: "Why must a voltmeter have a very high resistance?", answer: "So that it takes almost no current from the part it is connected across" },
      ],
      pyqExampleId: "daf25e27-4ef5-442d-8be2-f6f4817b5932",
      traps: [
        {
          title: "Putting the voltmeter in series",
          body: "A voltmeter always goes across the part whose potential difference you want. In series its high resistance would almost stop the current.",
        },
        {
          title: "Putting the ammeter across a part",
          body: "An ammeter goes in series, in the line of the current. Its low resistance means that, joined across a part, it would carry nearly all the current and read wrongly.",
        },
      ],
    },
  ],
};

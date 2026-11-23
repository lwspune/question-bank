import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_CE_POTENTIOMETER_NOTE: SubtopicNote = {
  subtopicName: "Potentiometer",
  title: "The Potentiometer",
  oneLineDefinition:
    "A long uniform wire carrying a steady current, used by the null method to measure e.m.f. without drawing current: its principle, potential gradient, comparing two cells and finding a cell's internal resistance.",
  whyItMatters:
    "32 questions, the largest page in this chapter. Eleven were set in board papers from 2016 to 2026: define potential gradient, name the instrument that measures e.m.f., state its advantages over a voltmeter or distinguish the two, explain how it finds internal resistance, and short calculations of e.m.f. and internal resistance. The textbook adds comparing two cells, the factors behind potential gradient and its disadvantages.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpce-pot-principle",
      name: "Principle and potential gradient",
      intuition:
        "Send a steady current through a long wire of uniform cross section. The potential then falls evenly along it, so the potential difference between any two points is proportional to the length between them. Tap a cell against the wire through a galvanometer and find the length where the galvanometer reads zero: there the wire's potential difference exactly matches the cell's e.m.f., and the cell supplies no current at all.",
      definition:
        "- **Principle:** for a wire of uniform cross section carrying a constant current, the potential difference between two points is directly proportional to the length between them: \\(V \\propto l\\), so \\(V = Kl\\).\n" +
        "- **Potential gradient** K is the potential difference per unit length of the wire: \\(K = \\dfrac{V}{L}\\). SI unit V/m.\n" +
        "- At the balance point the cell under test supplies no current, so \\(\\varepsilon = Kl\\), where l is the balancing length.\n" +
        "- K depends on the e.m.f. and internal resistance of the driving cell, the resistance in series with the wire (rheostat), and the resistance and length of the wire. More current through the wire means a larger K and a shorter balancing length.\n" +
        "- The jockey is tapped, never slid, so the wire stays uniform.",
      formula: {
        label: "Potentiometer",
        latex: "K = \\frac{V}{L}, \\qquad \\varepsilon = K\\,l",
      },
      authoredExample: {
        prompt:
          "A potentiometer wire 5 m long has a potential difference of 2 V across it. A cell is balanced against 300 cm of the wire. Find the potential gradient and the e.m.f. of the cell.",
        steps: [
          "Given: \\(V = 2\\) V, \\(L = 5\\) m, \\(l = 300\\) cm \\(= 3\\) m.",
          "\\(K = \\dfrac{V}{L} = \\dfrac{2}{5} = 0.4\\) V/m.",
          "\\(\\varepsilon = Kl = 0.4 \\times 3 = 1.2\\) V.",
        ],
        answer: "K = 0.4 V/m; e.m.f. 1.2 V",
      },
      selfCheckExample: {
        prompt: "The current through a potentiometer wire is increased. Does the balancing length for the same cell increase or decrease?",
        steps: ["A larger current gives a larger potential difference across the wire, so K increases.", "\\(l = \\varepsilon / K\\) then becomes smaller."],
        answer: "It decreases",
      },
      practiceSet: [
        { prompt: "Define potential gradient and give its SI unit.", answer: "Potential difference per unit length of the potentiometer wire; V/m" },
        { prompt: "A potentiometer wire 10 m long has a potential difference of 2 V across it. Find the potential gradient.", answer: "0.2 V/m" },
        { prompt: "At the balance point, which source supplies current to the potentiometer circuit?", answer: "Only the driving (auxiliary) battery; the cell under test supplies none" },
        { prompt: "Why must the jockey be tapped and not slid along a potentiometer wire?", answer: "Sliding scrapes the wire and spoils its uniform cross section" },
      ],
      pyqExampleId: "1e8ee4b9-2df3-4d7a-9691-33acfe4b60af",
      traps: [
        {
          title: "Mixing centimetres and metres",
          body: "If K is in V/m, the balancing length must be in metres. 250 cm is 2.5 m; multiplying 0.4 V/m by 250 gives 100 V, an impossible e.m.f. for a cell.",
        },
        {
          title: "Dropping the unit of K",
          body: "Potential gradient has a unit, V/m (or V/cm). A bare number for K loses the mark for the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpce-pot-compare",
      name: "Comparing the e.m.f.s of two cells",
      intuition:
        "On one wire with one steady current, K is the same for every cell you test. So each e.m.f. is K times its own balancing length, and K cancels in the ratio. In the sum and difference method the two cells are first joined to help each other, then to oppose each other, which gives two lengths for \\(\\varepsilon_1 + \\varepsilon_2\\) and \\(\\varepsilon_1 - \\varepsilon_2\\).",
      definition:
        "- **Individual method:** balance each cell in turn: \\(\\varepsilon_1 = Kl_1\\), \\(\\varepsilon_2 = Kl_2\\), so \\(\\dfrac{\\varepsilon_1}{\\varepsilon_2} = \\dfrac{l_1}{l_2}\\).\n" +
        "- **Sum and difference method:** cells helping: \\(\\varepsilon_1 + \\varepsilon_2 = Kl_1\\); cells opposing: \\(\\varepsilon_1 - \\varepsilon_2 = Kl_2\\). So \\(\\dfrac{\\varepsilon_1}{\\varepsilon_2} = \\dfrac{l_1 + l_2}{l_1 - l_2}\\).\n" +
        "- The driving battery's e.m.f. must be larger than the e.m.f. being balanced, or no balance point exists on the wire.",
      formula: {
        label: "Comparing e.m.f.s",
        latex: "\\frac{\\varepsilon_1}{\\varepsilon_2} = \\frac{l_1}{l_2}, \\qquad \\frac{\\varepsilon_1}{\\varepsilon_2} = \\frac{l_1 + l_2}{l_1 - l_2}",
      },
      authoredExample: {
        prompt: "Two cells are balanced one at a time on the same potentiometer wire, at 180 cm and 120 cm. Find the ratio of their e.m.f.s.",
        steps: ["Formula: \\(\\dfrac{\\varepsilon_1}{\\varepsilon_2} = \\dfrac{l_1}{l_2}\\).", "\\(\\dfrac{\\varepsilon_1}{\\varepsilon_2} = \\dfrac{180}{120} = \\dfrac{3}{2}\\)."],
        answer: "3 : 2",
      },
      selfCheckExample: {
        prompt: "In the sum and difference method, why is the balancing length shorter when the cells oppose each other?",
        steps: ["Opposing cells give an effective e.m.f. \\(\\varepsilon_1 - \\varepsilon_2\\), smaller than \\(\\varepsilon_1 + \\varepsilon_2\\)."],
        answer: "The effective e.m.f. is smaller, and the balancing length is proportional to it",
      },
      practiceSet: [
        { prompt: "A 1.5 V cell balances at 120 cm of a potentiometer wire. At what length does a 1.1 V cell balance on the same wire?", answer: "88 cm" },
        { prompt: "Why must the driving battery have a larger e.m.f. than the cells being compared?", answer: "Otherwise the whole wire's potential difference is less than the e.m.f. and there is no balance point" },
      ],
      pyqExampleId: "ec7a5eaf-3c1f-4a20-8678-68118c44ccf4",
      traps: [
        {
          title: "Swapping the sum and difference lengths",
          body: "The longer length belongs to the cells helping each other. Put \\(l_1 + l_2\\) over \\(l_1 - l_2\\) with \\(l_1\\) the longer one, or the ratio comes out below 1.",
        },
        {
          title: "Changing the current between readings",
          body: "The ratio works only because K is the same for both readings. Do not touch the rheostat between the two balance points.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpce-internal-resistance",
      name: "Internal resistance of a cell",
      intuition:
        "Balance the cell first with no current drawn from it: the balancing length measures its e.m.f. Then join a resistance R across the cell. Now a current flows, some voltage is lost inside the cell, and the balancing length measures the smaller terminal potential difference. The shortfall between the two lengths is what the internal resistance costs.",
      definition:
        "- **Open circuit** (key in the resistance box branch open): \\(\\varepsilon = Kl_1\\).\n" +
        "- **Closed circuit** with R across the cell: terminal potential difference \\(V = Kl_2\\).\n" +
        "- Since \\(\\varepsilon = I(R + r)\\) and \\(V = IR\\): \\(\\dfrac{\\varepsilon}{V} = \\dfrac{R + r}{R}\\), so \\(r = R\\left(\\dfrac{\\varepsilon}{V} - 1\\right) = R\\left(\\dfrac{l_1 - l_2}{l_2}\\right)\\).\n" +
        "- Internal resistance increases with the distance between the electrodes and decreases with the area of the electrodes dipped in the electrolyte; it also depends on the nature and concentration of the electrolyte and on temperature.",
      formula: {
        label: "Internal resistance",
        latex: "r = R\\left(\\frac{l_1 - l_2}{l_2}\\right)",
      },
      authoredExample: {
        prompt:
          "A cell balances against 150 cm of a potentiometer wire on open circuit. When a 5 Ω resistor is joined across the cell, the balancing length becomes 125 cm. Find the internal resistance of the cell.",
        steps: [
          "Given: \\(l_1 = 150\\) cm, \\(l_2 = 125\\) cm, \\(R = 5\\ \\Omega\\).",
          "Formula: \\(r = R\\left(\\dfrac{l_1 - l_2}{l_2}\\right)\\).",
          "\\(r = 5 \\times \\dfrac{150 - 125}{125} = 5 \\times \\dfrac{25}{125} = 1\\ \\Omega\\).",
        ],
        answer: "r = 1 Ω",
      },
      selfCheckExample: {
        prompt: "When a cell is shunted by 6 Ω, its balancing length falls to two thirds of its open circuit value. Find its internal resistance.",
        steps: ["\\(\\dfrac{l_1 - l_2}{l_2} = \\dfrac{1 - 2/3}{2/3} = \\dfrac{1}{2}\\).", "\\(r = 6 \\times \\dfrac{1}{2} = 3\\ \\Omega\\)."],
        answer: "3 Ω",
      },
      practiceSet: [
        { prompt: "Why is the balancing length shorter when the cell is shunted by a resistor?", answer: "A current now flows, so the terminal potential difference is less than the e.m.f." },
        { prompt: "Name two factors on which the internal resistance of a cell depends.", answer: "The distance between the electrodes and the area of the electrodes in the electrolyte (also the electrolyte and the temperature)" },
        { prompt: "Write the internal resistance in terms of the e.m.f. E, the terminal potential difference V and the shunt R.", answer: "\\(r = R\\left(\\dfrac{E}{V} - 1\\right)\\)" },
      ],
      pyqExampleId: "452a839a-e749-47ee-95c3-cced7883175a",
      traps: [
        {
          title: "Dividing by the wrong length",
          body: "The denominator is \\(l_2\\), the shorter closed circuit length. Dividing by \\(l_1\\) gives a smaller and wrong r.",
        },
        {
          title: "Calling the closed circuit length the e.m.f.",
          body: "Only the open circuit balance measures the e.m.f. With R joined across the cell, the balance measures the terminal potential difference.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpce-pot-vs-voltmeter",
      name: "Potentiometer and voltmeter compared",
      intuition:
        "A voltmeter must draw some current to deflect, so it reads the terminal potential difference, a little less than the e.m.f. A potentiometer reads at a null point, where the cell gives no current, so it measures the e.m.f. itself. That one difference explains every row below.",
      definition:
        "- The board asks this as 'distinguish between' or 'state the advantages of a potentiometer over a voltmeter'. Write two or three clear points in a table.\n" +
        "- Disadvantages of a potentiometer: it is not portable, it gives no direct reading, and finding a balance point takes time.",
      table: {
        columns: ["Point", "Potentiometer", "Voltmeter"],
        rows: [
          {
            cells: ["Current drawn from the cell", "None at the balance point", "A small current always"],
            pyqExampleId: "5cfae4a4-9652-4d49-a942-ff5095beae25",
            noteAmber: "Board 2022 asked you to distinguish the two.",
          },
          { cells: ["What it measures", "The e.m.f. itself", "The terminal potential difference, less than the e.m.f."] },
          { cells: ["Method", "Null (zero deflection) method", "Deflection method"] },
          { cells: ["Sensitivity", "Can be increased by using a longer wire", "Fixed by the instrument"] },
          { cells: ["Use", "Laboratory only, not portable", "Portable, gives a direct reading"] },
        ],
      },
      practiceSet: [
        { prompt: "Name an instrument that measures the e.m.f. of a cell exactly.", answer: "A potentiometer" },
        { prompt: "Why does a voltmeter read less than the e.m.f. of a cell?", answer: "It draws a current, so part of the e.m.f. is lost across the internal resistance" },
        { prompt: "State one disadvantage of a potentiometer.", answer: "It is not portable (or: it gives no direct reading)" },
      ],
      traps: [
        {
          title: "One-sided points",
          body: "In a 'distinguish' answer each point must compare both instruments on the same feature. 'A potentiometer draws no current' without the voltmeter's side earns half the mark.",
        },
      ],
    },
  ],
};

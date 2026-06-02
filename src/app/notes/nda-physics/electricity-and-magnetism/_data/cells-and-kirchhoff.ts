import type { SubtopicNote } from "@/app/notes/_types";

export const CELLS_AND_KIRCHHOFF_NOTE: SubtopicNote = {
  subtopicName: "Cells, EMF and Kirchhoff's Laws",
  title: "Cells, EMF and Kirchhoff's Laws",
  oneLineDefinition:
    "A cell's EMF is the full push it can give; its internal resistance drops some of that, leaving the terminal voltage V = ε − Ir. Kirchhoff's two laws — junction (charge conservation) and loop (energy conservation) — let you solve any circuit.",
  whyItMatters:
    "NDA tests this lightly — just 3 PYQs — but the ideas are load-bearing: EMF vs terminal voltage, internal resistance, how cells and bulbs combine to change brightness, and Kirchhoff's loop rule as a statement of energy conservation. Learn the concepts even where the bank is thin; they underpin every multi-cell circuit.",
  concepts: [
    // 1 — EMF & internal resistance (foundation — its only PYQ is image-based, used as a drill)
    {
      kind: "formula" as const,
      slug: "emf-and-internal-resistance",
      name: "EMF, internal resistance and terminal voltage",
      intuition:
        "A real cell isn't a perfect battery — it has its own small internal resistance. The EMF (ε) is the full voltage it would give with no current flowing; once current flows, some voltage is 'lost' inside the cell across its internal resistance, so the voltage you actually get at the terminals is a little less.",
      definition:
        "**EMF (ε)** is the energy a cell gives per unit charge — the open-circuit (no-current) voltage. " +
        "A real cell has **internal resistance r**. When it drives current \\(I\\), the **terminal voltage** is\n" +
        "**\\(V = \\varepsilon - I r\\)** — the EMF minus the internal drop. " +
        "Connected to an external resistance \\(R\\): \\(I = \\dfrac{\\varepsilon}{R + r}\\).",
      visualizationSlug: "emf-internal-resistance",
      formula: {
        label: "Terminal voltage and circuit current",
        latex: "V = \\varepsilon - I r, \\qquad I = \\dfrac{\\varepsilon}{R + r}",
        symbols: [
          { symbol: "\\varepsilon", meaning: "EMF of the cell (volt)" },
          { symbol: "r", meaning: "internal resistance (Ω)" },
          { symbol: "R", meaning: "external resistance (Ω)" },
          { symbol: "V", meaning: "terminal voltage (volt)" },
        ],
      },
      authoredExample: {
        prompt:
          "A cell of EMF 1.5 V and internal resistance 0.5 Ω drives a current through a 2.5 Ω resistor. Find the current and the terminal voltage.",
        steps: [
          "Total resistance = external + internal = \\(2.5 + 0.5 = 3\\,\\Omega\\).",
          "Current \\(I = \\varepsilon/(R+r) = 1.5/3 = 0.5\\) A.",
          "Terminal voltage \\(V = \\varepsilon - Ir = 1.5 - 0.5\\times0.5 = 1.25\\) V.",
        ],
        answer: "I = 0.5 A, terminal voltage = 1.25 V.",
      },
      selfCheckExample: {
        prompt:
          "A battery of EMF 12 V has terminal voltage 11.4 V when it supplies 3 A. What is its internal resistance?",
        steps: [
          "Internal drop = EMF − terminal voltage = \\(12 - 11.4 = 0.6\\) V.",
          "That drop equals \\(I r\\): \\(0.6 = 3 \\times r\\).",
          "\\(r = 0.2\\,\\Omega\\).",
        ],
        answer: "r = 0.2 Ω.",
      },
      practiceSet: [
        { prompt: "What is the terminal voltage of a cell on open circuit (no current)?", answer: "Equal to its EMF", method: "V = ε − Ir, with I = 0" },
        { prompt: "Cell of EMF 2 V, internal 1 Ω, across a 3 Ω resistor — current?", answer: "0.5 A", method: "I = ε/(R+r) = 2/4" },
        { prompt: "Why is terminal voltage less than EMF when current flows?", answer: "Voltage is dropped across the internal resistance (Ir)" },
      ],
      traps: [
        {
          title: "Terminal voltage drops as current rises",
          body:
            "EMF is fixed, but the terminal voltage V = ε − Ir falls as the cell delivers more current. A heavily loaded battery (large I) shows a noticeably lower terminal voltage — that's the internal resistance at work.",
        },
      ],
    },

    // 2 — Kirchhoff's laws
    {
      kind: "formula" as const,
      slug: "kirchhoffs-laws",
      name: "Kirchhoff's two laws",
      intuition:
        "Kirchhoff's rules are just conservation laws in disguise. At any junction, the charge that flows in must flow out — nothing piles up (charge conservation). Around any closed loop, all the voltage gains and drops must cancel to zero — because a charge returning to its start has the same energy it began with (energy conservation).",
      definition:
        "- **Junction (current) rule** — the sum of currents into a junction equals the sum out: \\(\\sum I_\\text{in} = \\sum I_\\text{out}\\). This is **conservation of charge**.\n" +
        "- **Loop (voltage) rule** — around any closed loop, the algebraic sum of EMFs and potential drops is zero: \\(\\sum \\varepsilon + \\sum (-IR) = 0\\). This is **conservation of energy**.",
      formula: {
        label: "Kirchhoff's laws",
        latex: "\\sum_\\text{junction} I = 0, \\qquad \\sum_\\text{loop} (\\varepsilon - IR) = 0",
      },
      authoredExample: {
        prompt:
          "At a junction, currents of 3 A and 2 A flow in along two wires, and current flows out along a third wire. What is the outgoing current?",
        steps: [
          "Junction rule: total current in = total current out.",
          "In = \\(3 + 2 = 5\\) A.",
          "So the single outgoing wire carries 5 A.",
        ],
        answer: "5 A.",
      },
      selfCheckExample: {
        prompt:
          "\"The sum of EMFs and potential differences around any closed loop is zero.\" Which conservation principle is this a direct consequence of?",
        steps: [
          "Follow a charge once around the loop and back to its start.",
          "Its potential energy must return to the same value (it's at the same point).",
          "So all the energy gains (EMFs) and losses (IR drops) must cancel.",
          "That is conservation of ENERGY — not charge, not momentum.",
        ],
        answer: "Conservation of energy.",
      },
      practiceSet: [
        { prompt: "Kirchhoff's junction rule expresses conservation of…", answer: "Charge" },
        { prompt: "Kirchhoff's loop rule expresses conservation of…", answer: "Energy" },
        { prompt: "Currents 4 A and 1 A enter a junction; 2 A leaves on one wire. What leaves on the other?", answer: "3 A", method: "in = out: 5 = 2 + 3" },
      ],
      pyqExampleId: "54747d9c-c81c-4d6c-8e65-3e138fe081c6", // 2019 — loop rule = energy conservation
      traps: [
        {
          title: "Loop rule = energy; junction rule = charge",
          body:
            "Don't mix them up. The LOOP (voltage) rule comes from energy conservation; the JUNCTION (current) rule comes from charge conservation. The distractors 'Ohm's law' and 'conservation of momentum' are both wrong for the loop rule.",
        },
      ],
    },

    // 3 — combining cells and brightness
    {
      kind: "formula" as const,
      slug: "combining-cells-and-brightness",
      name: "Combining cells and bulb brightness",
      intuition:
        "Cells in series add their EMFs — two equal cells give double the voltage. A bulb's brightness is its power, P = V²/R, so the bulb that has the MOST voltage across it (and isn't sharing current) glows brightest. Bulbs in parallel each get the full supply voltage; bulbs in series have to split it.",
      definition:
        "**Cells in series** add EMF: two cells of EMF ε give 2ε. " +
        "**Bulb brightness = power dissipated** in it (\\(P = V^2/R\\)). " +
        "Bulbs in **parallel** each receive the full supply voltage (brighter); bulbs in **series** share the voltage (dimmer). " +
        "So the brightest single bulb is the one across the highest voltage carrying its own current — e.g. two cells in series feeding bulbs in parallel.",
      authoredExample: {
        prompt:
          "All cells and bulbs are identical (EMF ε, bulb resistance R; ignore internal resistance). Which glows brightest: (a) 1 cell + 1 bulb, or (b) 2 cells in series + 2 bulbs in parallel?",
        steps: [
          "(a) One bulb across one cell: voltage ε, power \\(P = \\varepsilon^2/R\\).",
          "(b) Two cells in series give 2ε; bulbs in parallel each get the full 2ε.",
          "Each bulb's power = \\((2\\varepsilon)^2/R = 4\\varepsilon^2/R\\).",
          "(b) is four times brighter per bulb than (a).",
        ],
        answer: "(b) — each bulb dissipates 4ε²/R, the brightest of the two.",
      },
      selfCheckExample: {
        prompt:
          "Two identical bulbs are connected in series across one cell, versus a single bulb across the same cell. Which single bulb is brighter, and why?",
        steps: [
          "Single bulb: full voltage ε across it ⟹ \\(P = \\varepsilon^2/R\\).",
          "Two in series: they split ε, so each gets ε/2 ⟹ \\(P = (\\varepsilon/2)^2/R = \\varepsilon^2/4R\\).",
          "The lone bulb has 4× the power of each series bulb.",
        ],
        answer: "The single bulb is brighter — it gets the full voltage instead of half.",
      },
      practiceSet: [
        { prompt: "Two equal cells in series give what EMF (each ε)?", answer: "2ε" },
        { prompt: "Do bulbs in parallel or series each get the full supply voltage?", answer: "Parallel" },
        { prompt: "Brightness of a bulb corresponds to which quantity?", answer: "Power dissipated (P = V²/R)" },
      ],
      pyqExampleId: "1a752190-2422-41d8-8f0f-7125575205ed", // 2024 — 2 cells series + 2 bulbs parallel = brightest
      traps: [
        {
          title: "Parallel bulbs each get full voltage — series bulbs split it",
          body:
            "More cells in series AND bulbs in parallel both raise the voltage across each bulb. The brightest arrangement maximises per-bulb voltage: two cells in series feeding bulbs in parallel beats any series-bulb arrangement.",
        },
      ],
    },
  ],
};

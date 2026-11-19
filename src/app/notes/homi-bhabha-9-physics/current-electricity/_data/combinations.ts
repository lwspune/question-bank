import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_CE_COMBINATIONS_NOTE: SubtopicNote = {
  subtopicName: "Resistors in Series and Parallel",
  title: "Resistors in Series and Parallel",
  oneLineDefinition:
    "In series one current flows through every resistor and the resistances add up; in parallel every resistor has the same potential difference, the current divides, and the total resistance is less than the smallest one.",
  whyItMatters:
    "Eight questions in the bank, two EASY and six MODERATE. Four pick the true or false statements about series and parallel connections (one of them asks why the appliances in a house are joined in parallel). The other four are short sums: finding one resistor from the total, the ratio of currents in two branches, and the ratio of potential differences across three branches.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9ceco-rules",
      name: "Series and parallel: what stays the same and what divides",
      intuition:
        "In series the resistors stand one after another on a single path, like people in one queue: everyone passes through every gate, so the current is the same and the hold-ups add up. In parallel each resistor has its own path between the same two points, like several open gates side by side: each gate faces the same push, the crowd splits, and more gates mean less hold-up overall.",
      definition:
        "- **Series**: one path. The **same current** flows through each resistor. The potential difference **divides**, with a bigger share across a bigger resistor. Total resistance \\(R_s = R_1 + R_2 + R_3\\), **more than the largest** one.\n" +
        "- **Parallel**: separate paths between the same two points. The **same potential difference** acts across each resistor. The current **divides**, with **more current through the smaller resistance**. \\(\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}\\), so the total is **less than the smallest** one.\n" +
        "- Joining resistors in parallel is a way to **reduce** the resistance of a circuit; joining them in series **increases** it.\n" +
        "- **Household appliances are joined in parallel**: each gets the full supply voltage and so works at its rated power, each can be switched on or off by itself, and if one fails the rest keep working.",
      table: {
        columns: ["Property", "Series", "Parallel"],
        rows: [
          { cells: ["Current", "The same through every resistor", "Divides; more through the smaller resistor"] },
          { cells: ["Potential difference", "Divides; more across the larger resistor", "The same across every resistor"] },
          { cells: ["Total resistance", "R = R₁ + R₂ + R₃, more than the largest", "1/R = 1/R₁ + 1/R₂ + 1/R₃, less than the smallest"] },
          { cells: ["If one part breaks", "The whole circuit stops", "The other branches keep working"] },
          { cells: ["Everyday use", "A string of small decorative bulbs", "The wiring of a house"] },
        ],
        caption: "In a true or false question, check each statement against the right column, not against the other.",
      },
      selfCheckExample: {
        prompt: "Three bulbs are joined in series to a battery and one of them fuses. What happens to the other two, and why?",
        steps: ["In series there is only one path for the current.", "A fused bulb breaks that path, so no current flows anywhere."],
        answer: "Both go off, because the only path for the current is broken.",
      },
      practiceSet: [
        { prompt: "In which kind of connection is the potential difference the same across every resistor?", answer: "In a parallel connection" },
        { prompt: "Give two reasons why the appliances in a house are connected in parallel.", answer: "Each gets the full supply voltage, and each can be switched on or off without affecting the others" },
        { prompt: "How does the total resistance of resistors joined in series compare with each of them?", answer: "It is more than the largest of them" },
        { prompt: "Two resistors are joined in parallel. Through which of them does more current flow?", answer: "Through the one with the smaller resistance" },
      ],
      pyqExampleId: "719f553b-a4dc-4344-a11f-5563fdac2522",
      traps: [
        {
          title: "Saying the same current flows through parallel resistors",
          body: "In parallel the potential difference is the same and the current divides. The same current through each resistor is the rule for series.",
        },
        {
          title: "Adding resistances that are in parallel",
          body: "Resistances add only in series. In parallel the reciprocals add, and the total comes out smaller than any one resistor.",
        },
        {
          title: "Writing the parallel rule without its left side",
          body: "It is the reciprocal of the total that equals the sum of the reciprocals: 1/R = 1/R₁ + 1/R₂. The total itself is not the sum of the reciprocals.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9ceco-calc",
      name: "Working out series and parallel circuits",
      intuition:
        "Turn the whole group of resistors into one equivalent resistor, use V = IR for the whole circuit, then go back to each resistor. In parallel, start from the shared potential difference; in series, start from the shared current.",
      definition:
        "- **Series**: \\(R_s = R_1 + R_2 + \\dots\\). Find \\(I = \\frac{V}{R_s}\\), then the potential difference across each resistor is \\(IR_1\\), \\(IR_2\\) and so on.\n" +
        "- **Parallel**: \\(\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots\\). For **two** resistors, \\(R_p = \\frac{R_1 R_2}{R_1 + R_2}\\). For **n equal** resistors R, \\(R_p = \\frac{R}{n}\\).\n" +
        "- In parallel each branch has the full V, so each current is \\(\\frac{V}{R}\\) for that branch, and the currents are in the **inverse ratio** of the resistances.\n" +
        "- When one resistor is given as a multiple of another (say \\(R_2 = 2R_1\\)), write every resistor in terms of \\(R_1\\), find the total, and set it equal to the given value.",
      formula: {
        label: "Combining resistors",
        latex: "R_s = R_1 + R_2 + R_3 \\qquad \\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3} \\qquad R_p = \\frac{R_1 R_2}{R_1 + R_2}",
        symbols: [
          { symbol: "Rₛ", meaning: "total resistance in series" },
          { symbol: "Rₚ", meaning: "total resistance in parallel" },
          { symbol: "R₁, R₂, R₃", meaning: "the separate resistances, in ohms" },
        ],
      },
      authoredExample: {
        prompt: "Resistors of 3 Ω and 6 Ω are joined in parallel to a 12 V battery. Find the total resistance, the current drawn from the battery, and the current in each resistor.",
        steps: [
          "Total: \\(R_p = \\frac{3 \\times 6}{3 + 6} = \\frac{18}{9} = 2\\) Ω.",
          "Current from the battery: \\(I = \\frac{12}{2} = 6\\) A.",
          "Each resistor has the full 12 V: \\(\\frac{12}{3} = 4\\) A and \\(\\frac{12}{6} = 2\\) A. Check: 4 + 2 = 6 A.",
        ],
        answer: "2 Ω; 6 A from the battery; 4 A in the 3 Ω resistor and 2 A in the 6 Ω resistor",
      },
      selfCheckExample: {
        prompt: "Resistors of 5 Ω, 10 Ω and 15 Ω are joined in series to a 6 V battery. What current flows?",
        steps: ["\\(R_s = 5 + 10 + 15 = 30\\) Ω.", "\\(I = \\frac{6}{30} = 0.2\\) A."],
        answer: "0.2 A",
      },
      practiceSet: [
        { prompt: "Four resistors of 8 Ω each are joined in parallel. What is their total resistance?", answer: "\\(\\frac{8}{4} = 2\\) Ω" },
        { prompt: "Resistors of 10 Ω and 40 Ω are joined in parallel. What is their total resistance?", answer: "\\(\\frac{10 \\times 40}{10 + 40} = \\frac{400}{50} = 8\\) Ω" },
        { prompt: "A 2 Ω and a 3 Ω resistor are joined in series to a 10 V battery. What is the potential difference across the 3 Ω resistor?", answer: "The current is \\(\\frac{10}{5} = 2\\) A, so \\(2 \\times 3 = 6\\) V" },
        { prompt: "Two resistors joined in parallel carry currents in the ratio 1 : 4. What is the ratio of their resistances?", answer: "4 : 1, the inverse of the ratio of the currents" },
      ],
      pyqExampleId: "9c4ea0a0-dbfd-4ded-a316-ee293c2236b8",
      traps: [
        {
          title: "Forgetting to turn 1/R upside down",
          body: "Adding the reciprocals gives 1/R, not R. For 2 Ω and 2 Ω in parallel, 1/R = 1, so R = 1 Ω.",
        },
        {
          title: "Giving parallel currents the same ratio as the resistances",
          body: "Each branch has the same potential difference, so the smaller resistance carries the larger current: the currents are in the inverse ratio of the resistances.",
        },
        {
          title: "Getting a parallel total larger than one branch",
          body: "The total resistance in parallel is always less than the smallest resistor. If your answer is bigger, you have added instead of using reciprocals.",
        },
      ],
    },
  ],
};

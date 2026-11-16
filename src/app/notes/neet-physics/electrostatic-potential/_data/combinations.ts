import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_EP_COMBINATIONS_NOTE: SubtopicNote = {
  subtopicName: "Capacitor Combinations and Energy",
  title: "Capacitor Combinations and Energy",
  oneLineDefinition:
    "Capacitors in series and in parallel, capacitors that hold no charge, the energy U = ½CV² stored in the field, and what happens to charge and energy when a charged capacitor is joined to another.",
  whyItMatters:
    "Nine NEET questions from 2021 to 2026, six of them with a circuit figure. Four ask for an equivalent capacitance: a short-circuited capacitor (2021), series and parallel groups (2023 and 2026) and a balanced bridge (2024). Three ask for stored energy: from the field between the plates (2021), from ½CV² (Re-NEET 2024) and the share held by one capacitor of a network (Re-NEET 2026). Two join a charged capacitor to an uncharged one and ask the energy left (2022) or lost (2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphep-combinations",
      name: "Series and parallel capacitors",
      intuition:
        "In series, the charge pushed onto the first plate induces the same charge on every plate down the line, so each capacitor holds the same charge and they share the voltage. In parallel, every capacitor is across the same two wires, so they share one voltage and the charges add. The rules are the reverse of those for resistors.",
      definition:
        "- **Series** (same charge Q on each): \\(\\dfrac{1}{C} = \\dfrac{1}{C_1} + \\dfrac{1}{C_2} + \\dots\\). Each voltage is \\(\\dfrac{Q}{C_i}\\): the smallest capacitor takes the largest voltage.\n" +
        "- Two in series: \\(C = \\dfrac{C_1C_2}{C_1 + C_2}\\). n equal capacitors C in series: \\(\\dfrac{C}{n}\\).\n" +
        "- **Parallel** (same voltage V on each): \\(C = C_1 + C_2 + \\dots\\), and each charge is \\(C_iV\\).\n" +
        "- A capacitor whose two plates are joined to the same wire has no potential difference across it, so it holds no charge. Leave it out.\n" +
        "- A bridge of four capacitors with a fifth across the middle: if the ratios of the two halves are equal, the two ends of the middle capacitor are at one potential. It holds no charge and can be left out.",
      formula: {
        label: "Combinations",
        latex: "\\frac{1}{C_s} = \\sum \\frac{1}{C_i}, \\qquad C_p = \\sum C_i, \\qquad C_s = \\frac{C_1C_2}{C_1 + C_2}",
      },
      authoredExample: {
        prompt:
          "Capacitors of 2 μF and 4 μF are in parallel, and this pair is in series with a 3 μF capacitor, across a 9 V battery. Find the equivalent capacitance and the voltage across the 3 μF capacitor.",
        steps: [
          "Parallel pair: 2 + 4 = 6 μF.",
          "In series with 3 μF: \\(C = \\dfrac{6 \\times 3}{6 + 3} = 2\\) μF.",
          "Charge from the battery: \\(Q = 2 \\times 9 = 18\\) μC, the same on the 3 μF and on the pair.",
          "Voltage on the 3 μF: \\(\\dfrac{18}{3} = 6\\) V (and 3 V on the pair; 6 + 3 = 9 V checks).",
        ],
        answer: "2 μF; 6 V",
      },
      selfCheckExample: {
        prompt: "Three 6 μF capacitors are joined first in series, then in parallel. Find the ratio of the two equivalent capacitances, series to parallel.",
        steps: [
          "Series: \\(\\dfrac{6}{3} = 2\\) μF.",
          "Parallel: 6 + 6 + 6 = 18 μF.",
          "Ratio 2 : 18 = 1 : 9.",
        ],
        answer: "1 : 9",
      },
      practiceSet: [
        { prompt: "Two 4 μF capacitors are joined in series. Equivalent capacitance?", answer: "2 μF" },
        { prompt: "Two capacitors are in series. Which one has the larger voltage across it: the larger or the smaller capacitance?", answer: "The smaller capacitance" },
        { prompt: "Both plates of a capacitor are joined to the same wire. How much charge does it hold?", answer: "None" },
        { prompt: "Capacitors of 1 μF and 2 μF are in parallel across 10 V. Total charge?", answer: "30 μC" },
      ],
      pyqExampleId: "534fd1f1-6e25-4146-b059-1bf6978ccccb",
      traps: [
        {
          title: "Capacitors combine the opposite way to resistors",
          body: "Capacitors in series combine like resistors in parallel (reciprocals add), and capacitors in parallel simply add. Using the resistor rules swaps the answers.",
        },
        {
          title: "Series capacitors share charge, not voltage",
          body: "Every capacitor in a series chain carries the same charge as the equivalent capacitor. Splitting the charge among them is wrong; it is the voltage that splits.",
        },
        {
          title: "Look for a capacitor with no voltage across it",
          body: "Before adding anything, check whether a capacitor has both plates on one wire or sits across a balanced bridge. Such a capacitor holds no charge and drops out.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphep-energy-stored",
      name: "Energy stored in a capacitor",
      intuition:
        "Charging a capacitor means pushing each new bit of charge against the voltage already built up. The voltage grows from zero to V, so on average the work is half of QV. That energy is stored in the electric field between the plates, at a fixed amount per cubic metre for a given field.",
      definition:
        "- \\(U = \\dfrac{1}{2}CV^{2} = \\dfrac{Q^{2}}{2C} = \\dfrac{1}{2}QV\\).\n" +
        "- The energy sits in the field. **Energy density** (per unit volume): \\(u = \\dfrac{1}{2}\\varepsilon_0 E^{2}\\). Between parallel plates the volume is Ad, so \\(U = u \\times Ad\\).\n" +
        "- Battery kept on (V fixed): use \\(\\dfrac{1}{2}CV^{2}\\). Battery removed (Q fixed): use \\(\\dfrac{Q^{2}}{2C}\\).\n" +
        "- In a network, find each capacitor's own charge or voltage first, then its energy. In series (same Q) the smaller capacitor stores more; in parallel (same V) the larger one does.",
      formula: {
        label: "Stored energy",
        latex: "U = \\frac{1}{2}CV^{2} = \\frac{Q^{2}}{2C} = \\frac{1}{2}QV, \\qquad u = \\frac{1}{2}\\varepsilon_0 E^{2}",
      },
      authoredExample: {
        prompt:
          "A 4 μF capacitor is charged to 50 V. Find its energy. The battery is then removed and the gap between the plates doubled. Find the new energy.",
        steps: [
          "\\(U = \\dfrac{1}{2} \\times 4 \\times 10^{-6} \\times 50^{2} = 5 \\times 10^{-3}\\) J.",
          "Charge: \\(Q = 4 \\times 50 = 200\\) μC, and it stays the same once the battery is gone.",
          "Doubling the gap halves C to 2 μF: \\(U' = \\dfrac{Q^{2}}{2C} = \\dfrac{(200 \\times 10^{-6})^{2}}{2 \\times 2 \\times 10^{-6}} = 10^{-2}\\) J.",
        ],
        answer: "5 mJ, then 10 mJ",
      },
      selfCheckExample: {
        prompt:
          "Capacitors of 2 μF and 4 μF are in series across 6 V. Find the energy stored in each.",
        steps: [
          "\\(C = \\dfrac{2 \\times 4}{6} = \\dfrac{4}{3}\\) μF, so \\(Q = \\dfrac{4}{3} \\times 6 = 8\\) μC on each.",
          "2 μF: \\(\\dfrac{(8 \\times 10^{-6})^{2}}{2 \\times 2 \\times 10^{-6}} = 16\\) μJ. 4 μF: \\(\\dfrac{(8 \\times 10^{-6})^{2}}{2 \\times 4 \\times 10^{-6}} = 8\\) μJ.",
          "Check: \\(\\dfrac{1}{2} \\times \\dfrac{4}{3} \\times 10^{-6} \\times 36 = 24\\) μJ = 16 + 8.",
        ],
        answer: "16 μJ in the 2 μF and 8 μJ in the 4 μF",
      },
      practiceSet: [
        { prompt: "Find the energy stored in a 10 μF capacitor charged to 100 V.", answer: "0.05 J" },
        { prompt: "The charge on a capacitor is doubled with C unchanged. By what factor does its energy change?", answer: "4 times" },
        { prompt: "Write the energy of a capacitor in terms of Q and V alone.", answer: "\\(U = \\tfrac{1}{2}QV\\)" },
        { prompt: "Capacitors of 1 μF and 3 μF are in parallel across a battery. Ratio of their energies?", answer: "1 : 3" },
      ],
      pyqExampleId: "5531bd54-e984-4beb-a743-89600c4dc630",
      traps: [
        {
          title: "Use the form that holds fixed what the circuit holds fixed",
          body: "With the battery joined, V is fixed, so use \\(\\tfrac{1}{2}CV^{2}\\). With it removed, Q is fixed, so use \\(Q^{2}/2C\\). The wrong form gives the wrong direction of change.",
        },
        {
          title: "Energy density is per unit volume",
          body: "\\(\\tfrac{1}{2}\\varepsilon_0 E^{2}\\) is energy per cubic metre. To get the energy of a capacitor, multiply by the volume between the plates, Ad.",
        },
        {
          title: "The stored energy is half of QV",
          body: "A battery that charges a capacitor to V does work QV, but the capacitor stores only \\(\\tfrac{1}{2}QV\\). Writing QV for the stored energy doubles it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphep-sharing",
      name: "Joining a charged capacitor to another",
      intuition:
        "Join a charged capacitor to an uncharged one and charge flows until both sit at the same voltage. No charge is lost, because it has nowhere else to go. Energy is lost, though: some of it turns into heat in the wires while the charge rushes across. So charge is conserved but energy is not.",
      definition:
        "- Plates of like sign joined: charge is conserved, so the common potential is \\(V = \\dfrac{C_1V_1 + C_2V_2}{C_1 + C_2}\\).\n" +
        "- Plates of opposite sign joined: the charges partly cancel, so \\(V = \\dfrac{C_1V_1 - C_2V_2}{C_1 + C_2}\\).\n" +
        "- Energy after = \\(\\dfrac{1}{2}(C_1 + C_2)V^{2}\\), always less than before.\n" +
        "- Energy lost: \\(\\Delta U = \\dfrac{1}{2}\\dfrac{C_1C_2}{C_1 + C_2}(V_1 - V_2)^{2}\\), given out as heat in the connecting wires.",
      formula: {
        label: "Common potential and energy lost",
        latex: "V = \\frac{C_1V_1 + C_2V_2}{C_1 + C_2}, \\qquad \\Delta U = \\frac{1}{2}\\frac{C_1C_2}{C_1 + C_2}(V_1 - V_2)^{2}",
      },
      authoredExample: {
        prompt:
          "A 3 μF capacitor charged to 100 V is joined to an uncharged 1 μF capacitor. Find the common potential and the energy lost.",
        steps: [
          "Charge: \\(3 \\times 100 = 300\\) μC, shared over 4 μF: \\(V = \\dfrac{300}{4} = 75\\) V.",
          "Before: \\(\\dfrac{1}{2} \\times 3 \\times 10^{-6} \\times 100^{2} = 0.015\\) J. After: \\(\\dfrac{1}{2} \\times 4 \\times 10^{-6} \\times 75^{2} = 0.01125\\) J.",
          "Lost: 0.015 − 0.01125 = 0.00375 J. Check: \\(\\dfrac{1}{2} \\times \\dfrac{3 \\times 1}{4} \\times 10^{-6} \\times 100^{2} = 0.00375\\) J.",
        ],
        answer: "75 V; 3.75 mJ lost",
      },
      selfCheckExample: {
        prompt:
          "A 2 μF capacitor charged to 50 V and a 6 μF capacitor charged to 10 V are joined with plates of like sign together. Find the common potential and the energy lost.",
        steps: [
          "\\(V = \\dfrac{2 \\times 50 + 6 \\times 10}{2 + 6} = \\dfrac{160}{8} = 20\\) V.",
          "\\(\\Delta U = \\dfrac{1}{2} \\times \\dfrac{2 \\times 6}{8} \\times 10^{-6} \\times (50 - 10)^{2} = 1.2 \\times 10^{-3}\\) J.",
          "Check: before \\(2.5 + 0.3 = 2.8\\) mJ, after \\(\\dfrac{1}{2} \\times 8 \\times 10^{-6} \\times 20^{2} = 1.6\\) mJ, so 1.2 mJ lost.",
        ],
        answer: "20 V; \\(1.2 \\times 10^{-3}\\) J lost",
      },
      practiceSet: [
        { prompt: "When two charged capacitors are joined, which is conserved: the total charge or the total energy?", answer: "The total charge" },
        { prompt: "A 1 μF capacitor at 90 V is joined to an uncharged 2 μF capacitor. Common potential?", answer: "30 V" },
        { prompt: "Where does the energy lost on joining two capacitors go?", answer: "Into heat in the connecting wires" },
        { prompt: "A 4 μF capacitor at 20 V is joined to a 1 μF capacitor at 70 V, like plates together. Common potential?", answer: "30 V" },
      ],
      pyqExampleId: "b39f0513-4bfc-4baf-bad4-ef122d777225",
      traps: [
        {
          title: "Charge is conserved, energy is not",
          body: "When capacitors are joined, add their charges to find the common potential. Adding their energies gives too much: some energy is always lost as heat.",
        },
        {
          title: "Equal sharing halves the energy",
          body: "A charged capacitor joined to an identical uncharged one ends at half the voltage, and the two together keep only half the energy it had.",
        },
      ],
    },
  ],
};

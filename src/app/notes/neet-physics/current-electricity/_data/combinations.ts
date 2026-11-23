import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_CE_COMBINATIONS_NOTE: SubtopicNote = {
  subtopicName: "Combinations of Resistors",
  title: "Combinations of Resistors",
  oneLineDefinition:
    "Resistors in series add, resistors in parallel add as reciprocals, and current splits between parallel branches in the inverse ratio of their resistances.",
  whyItMatters:
    "Eight NEET questions from 2021 to 2026, five of them from 2024 or later. Five reduce a set of equal pieces: four wires in parallel then in series, ten resistors switched from series to parallel, a wire cut into parts, and a stretched wire bent into a circle. Three split a current: the share of one branch, the current in a bridging wire, and a circuit whose capacitor has stopped charging.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphce-series-parallel",
      name: "Series and parallel combinations",
      visualizationSlug: "resistors-series-parallel",
      intuition:
        "In series the same current must push through every resistor one after another, so the resistances add. In parallel each resistor offers a separate path for the same voltage, so adding a path always lowers the total. A useful check: a parallel total is smaller than the smallest resistor in it.",
      definition:
        "- Series: \\(R_s = R_1 + R_2 + \\dots\\). Same current through each, voltages share in proportion to R.\n" +
        "- Parallel: \\(\\dfrac{1}{R_p} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dots\\). Same voltage across each. For two: \\(R_p = \\dfrac{R_1R_2}{R_1 + R_2}\\).\n" +
        "- n equal resistors R: series nR, parallel \\(\\dfrac{R}{n}\\), so \\(\\dfrac{R_s}{R_p} = n^{2}\\). On the same battery the parallel current is \\(n^{2}\\) times the series current.\n" +
        "- A wire of resistance R cut into n equal pieces: each piece is \\(\\dfrac{R}{n}\\).\n" +
        "- A uniform wire of resistance R bent into a circle: across a diameter the two halves \\(\\dfrac{R}{2}\\) are in parallel, giving \\(\\dfrac{R}{4}\\).",
      formula: {
        label: "Equivalent resistance",
        latex: "R_s = R_1 + R_2 + \\dots, \\qquad \\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots, \\qquad \\frac{R_s}{R_p} = n^{2}",
      },
      authoredExample: {
        prompt:
          "A wire of resistance 24 Ω is cut into 4 equal pieces. Two pieces are joined in parallel, and this pair is joined in series with the other two pieces. Find the total resistance.",
        steps: [
          "Each piece: \\(24/4 = 6\\ \\Omega\\).",
          "Two in parallel: \\(6/2 = 3\\ \\Omega\\).",
          "In series with the other two: \\(3 + 6 + 6 = 15\\ \\Omega\\).",
        ],
        answer: "15 Ω",
      },
      selfCheckExample: {
        prompt:
          "A uniform wire of resistance 8 Ω is bent into a circle. What is the resistance between the two ends of a diameter?",
        steps: [
          "The diameter splits the circle into two halves of 4 Ω each.",
          "Between those two points the halves are in parallel: \\(\\dfrac{4 \\times 4}{4 + 4} = 2\\ \\Omega\\).",
        ],
        answer: "2 Ω",
      },
      practiceSet: [
        { prompt: "Resistors of 3 Ω and 6 Ω are joined in parallel. Equivalent resistance?", answer: "2 Ω" },
        { prompt: "Five equal resistors give 25 Ω in series. What do they give in parallel?", answer: "1 Ω" },
        { prompt: "Resistors of 2 Ω, 3 Ω and 6 Ω are joined in parallel. Equivalent resistance?", answer: "1 Ω" },
        { prompt: "Two equal resistors in series draw 1 A from a battery of negligible internal resistance. What do they draw in parallel?", answer: "4 A" },
      ],
      pyqExampleId: "27d6f3e1-5c67-40c7-8685-8e0abb775deb",
      traps: [
        {
          title: "Find one piece first",
          body: "When a wire is cut, each piece carries its share of the original resistance, \\(R/n\\). Using the whole wire's R for a piece makes every later step wrong.",
        },
        {
          title: "The current ratio is n squared",
          body: "Switching n equal resistors from series to parallel on the same battery multiplies the current by \\(n^{2}\\), not n, because the resistance falls from nR to R/n.",
        },
        {
          title: "Stretch, then bend",
          body: "A wire stretched to twice its length has four times its resistance before it is bent. Across a diameter the circle then gives a quarter of that new value.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphce-current-division",
      name: "Current division and steady state",
      intuition:
        "At a junction the current shares out so that every parallel branch has the same voltage across it. That means the branch with less resistance takes more current. A charged capacitor in a DC circuit is like a broken wire: once it is full, no current flows through its branch.",
      definition:
        "- Two branches in parallel carrying a total I: \\(I_1 = I\\dfrac{R_2}{R_1 + R_2}\\), \\(I_2 = I\\dfrac{R_1}{R_1 + R_2}\\). Each takes the other's resistance on top.\n" +
        "- Same voltage across parallel branches: \\(I_1R_1 = I_2R_2\\).\n" +
        "- The current in a wire joining two junctions is found from the junction rule: what flows in minus what flows out along the other paths.\n" +
        "- Steady state with a capacitor: its branch carries no current, so remove that branch, then solve the rest. The capacitor's voltage equals the voltage across the points it joins.",
      formula: {
        label: "Current divider",
        latex: "I_1 = I\\,\\frac{R_2}{R_1 + R_2}, \\qquad I_2 = I\\,\\frac{R_1}{R_1 + R_2}",
      },
      authoredExample: {
        prompt:
          "A current of 9 A enters a pair of parallel resistors of 3 Ω and 6 Ω. How much current flows in each?",
        steps: [
          "\\(I_{3\\Omega} = 9 \\times \\dfrac{6}{3 + 6} = 6\\) A.",
          "\\(I_{6\\Omega} = 9 \\times \\dfrac{3}{3 + 6} = 3\\) A.",
          "Check: both branches have \\(6 \\times 3 = 3 \\times 6 = 18\\) V across them.",
        ],
        answer: "6 A in the 3 Ω, 3 A in the 6 Ω",
      },
      selfCheckExample: {
        prompt:
          "A 12 V battery of negligible internal resistance is joined to a 4 Ω resistor in series with a 2 Ω resistor. A capacitor is joined across the 2 Ω resistor. In the steady state, what is the current and the capacitor's voltage?",
        steps: [
          "In the steady state the capacitor carries no current, so the circuit is just 4 Ω and 2 Ω in series.",
          "\\(I = \\dfrac{12}{6} = 2\\) A.",
          "The capacitor's voltage is that across the 2 Ω resistor: \\(2 \\times 2 = 4\\) V.",
        ],
        answer: "2 A, and 4 V across the capacitor",
      },
      practiceSet: [
        { prompt: "In two parallel branches of 2 Ω and 8 Ω, what fraction of the total current goes through the 2 Ω?", answer: "4/5" },
        { prompt: "How much current flows through the branch of a fully charged capacitor in a DC circuit?", answer: "None" },
        { prompt: "Two parallel branches have currents 4 A and 2 A. Ratio of their resistances?", answer: "1 : 2" },
        { prompt: "A total of 10 A splits between parallel branches of 5 Ω and 20 Ω. Current in the 20 Ω?", answer: "2 A" },
      ],
      pyqExampleId: "295af3c1-ee5e-4b44-b727-569a124e54e2",
      traps: [
        {
          title: "Each branch takes the other's resistance",
          body: "In \\(I_1 = I R_2/(R_1 + R_2)\\) the numerator is the OTHER branch's resistance. Putting \\(R_1\\) on top gives the larger current to the larger resistor, which is backwards.",
        },
        {
          title: "A full capacitor is an open switch",
          body: "In the steady state no current flows through a capacitor's branch. Leaving that branch in the resistance calculation gives a wrong total.",
        },
      ],
    },
  ],
};

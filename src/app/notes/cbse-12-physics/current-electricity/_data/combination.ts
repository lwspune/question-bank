import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_CE_COMBINATION_NOTE: SubtopicNote = {
  subtopicName: "Combination of Resistors",
  title: "Resistors in Series and in Parallel",
  oneLineDefinition:
    "The series and parallel rules for resistors, and how to reduce a network drawn in a figure to one resistance step by step, including spotting a balanced bridge.",
  whyItMatters:
    "10 questions, all from board papers from 2023 to 2026, seven of them in 2025. The board asks you to choose how to join three equal resistors to get a stated value (2025), find Rs − Rp for n equal resistors (2025), compare the brightness of bulbs in series and in parallel (2025), and reduce networks drawn in a figure: a balanced bridge (2023), a ladder with a battery (2024) and rings and branches of resistors (2025). The present NCERT Class 12 chapter has no section on combining resistors; it uses the series and parallel rules from Class 10. Learn the rules quickly and spend your time on reducing networks.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpce-series-parallel",
      name: "The series and parallel rules",
      intuition:
        "Resistors one after another carry the same current, and their potential differences add, so their resistances add. Resistors across the same two points share the same potential difference, and their currents add, so the reciprocals of their resistances add. A parallel combination is always smaller than its smallest resistor, because you have opened an extra path for the current.",
      definition:
        "- **Series:** same current through each. \\(R_s = R_1 + R_2 + \\dots\\)\n" +
        "- **Parallel:** same potential difference across each. \\(\\dfrac{1}{R_p} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dots\\); for two, \\(R_p = \\dfrac{R_1R_2}{R_1 + R_2}\\).\n" +
        "- n equal resistors R: \\(R_s = nR\\) and \\(R_p = \\dfrac{R}{n}\\).\n" +
        "- In parallel, the current divides in the inverse ratio of the resistances.\n" +
        "- Two wires of the same length and area but resistivities \\(\\rho_1\\) and \\(\\rho_2\\), joined end to end, make one wire of twice the length with \\(R = \\dfrac{(\\rho_1 + \\rho_2)l}{A}\\).\n" +
        "- The present NCERT Class 12 book has no section on this; the board asked it in 2023, 2024, 2025 and 2026.",
      formula: {
        label: "Series and parallel",
        latex: "R_s = R_1 + R_2 + \\dots, \\qquad \\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots",
      },
      authoredExample: {
        prompt:
          "Resistors of 4 Ω, 6 Ω and 12 Ω are joined (a) in series and (b) in parallel. Find the equivalent resistance each way. In case (b) they are across a 12 V battery of negligible internal resistance: find the current in each resistor and from the battery.",
        steps: [
          "(a) \\(R_s = 4 + 6 + 12 = 22\\ \\Omega\\).",
          "(b) \\(\\dfrac{1}{R_p} = \\dfrac{1}{4} + \\dfrac{1}{6} + \\dfrac{1}{12} = \\dfrac{3 + 2 + 1}{12} = \\dfrac{1}{2}\\), so \\(R_p = 2\\ \\Omega\\).",
          "Each resistor has the full 12 V across it: currents \\(\\dfrac{12}{4} = 3\\) A, \\(\\dfrac{12}{6} = 2\\) A, \\(\\dfrac{12}{12} = 1\\) A.",
          "From the battery: \\(3 + 2 + 1 = 6\\) A, which agrees with \\(\\dfrac{12}{R_p} = \\dfrac{12}{2} = 6\\) A.",
        ],
        answer: "22 Ω in series; 2 Ω in parallel, with 3 A, 2 A, 1 A and 6 A in all",
      },
      selfCheckExample: {
        prompt: "Using all three of three resistors, each of resistance R, how would you get 3R/2?",
        steps: ["Two in parallel give R/2; add the third in series: \\(\\dfrac{R}{2} + R = \\dfrac{3R}{2}\\)."],
        answer: "Two in parallel, then that pair in series with the third",
      },
      practiceSet: [
        {
          prompt: "A current of 4 A enters a 3 Ω and a 6 Ω resistor joined in parallel. Find the current in the 3 Ω resistor.",
          answer: "The currents divide inversely as the resistances, 2 : 1, so \\(\\dfrac{2}{3} \\times 4 = 2.67\\) A",
        },
        { prompt: "Is a parallel combination larger or smaller than the smallest resistor in it?", answer: "Smaller" },
        {
          prompt: "Two identical bulbs in parallel are joined in series with a third identical bulb across a battery. Which bulb glows brightest?",
          answer: "The bulb in series. It carries the whole current, and each of the other two carries half of it",
        },
      ],
      pyqExampleId: "0b4e20d7-0b0e-4fe6-89ce-60086a37807b",
      traps: [
        {
          title: "Adding parallel resistances directly",
          body: "In parallel it is the reciprocals that add. Write \\(1/R_p\\) first, add, then turn the sum upside down. Forgetting the last step leaves the answer as \\(1/R_p\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpce-network-reduction",
      name: "Reducing a network drawn in a figure",
      intuition:
        "A network in a figure looks hard until you redraw it. Give every junction a letter, merge points joined by plain wire into one point, and look for resistors that share both ends (parallel) or carry the same current with nothing branching between them (series). Start from the end farthest from the battery and work back. If the network is a bridge, test it for balance before doing anything else.",
      definition:
        "- Points joined by a wire of no resistance are at the **same potential**: treat them as one junction.\n" +
        "- A resistor with both ends at the same junction (or across a plain wire) carries **no current**: leave it out.\n" +
        "- **Balanced bridge:** if four resistors P, Q, R, S around a bridge satisfy \\(\\dfrac{P}{Q} = \\dfrac{R}{S}\\), the resistor across the middle carries no current and can be removed.\n" +
        "- A **ladder** is reduced from the far end: each rung combines with what lies beyond it.\n" +
        "- An open key removes its branch; a closed key with no resistance can short out what lies across it.\n" +
        "- Wires drawn crossing with a small hop are **not** joined.",
      formula: {
        label: "Two resistors in parallel",
        latex: "R_p = \\frac{R_1R_2}{R_1 + R_2}",
      },
      authoredExample: {
        prompt:
          "Resistors of 9 Ω and 18 Ω are joined in parallel, and the pair is joined in series with a 3 Ω resistor across a 27 V battery of negligible internal resistance. Find the current from the battery and the current in the 9 Ω resistor.",
        steps: [
          "Parallel pair: \\(R_p = \\dfrac{9 \\times 18}{9 + 18} = 6\\ \\Omega\\).",
          "Total: \\(R = 6 + 3 = 9\\ \\Omega\\). Current from the battery: \\(I = \\dfrac{27}{9} = 3\\) A.",
          "Potential difference across the pair: \\(3 \\times 6 = 18\\) V.",
          "Current in the 9 Ω resistor: \\(\\dfrac{18}{9} = 2\\) A (and 1 A in the 18 Ω resistor).",
        ],
        answer: "3 A from the battery; 2 A in the 9 Ω resistor",
      },
      selfCheckExample: {
        prompt:
          "A bridge has P = 2 Ω and Q = 4 Ω in one side and R = 3 Ω and S = 6 Ω in the other, with a 5 Ω resistor across the middle. Find the resistance between the two ends of the bridge.",
        steps: [
          "\\(\\dfrac{P}{Q} = \\dfrac{2}{4} = \\dfrac{R}{S} = \\dfrac{3}{6}\\): balanced, so the 5 Ω carries no current.",
          "\\((2 + 4) \\parallel (3 + 6) = \\dfrac{6 \\times 9}{15}\\).",
        ],
        answer: "3.6 Ω",
      },
      practiceSet: [
        {
          prompt: "A 6 Ω resistor and a plain wire of no resistance are joined in parallel between two points. What is the resistance between the points?",
          answer: "Zero. The wire shorts the resistor, which carries no current",
        },
        {
          prompt: "In a circuit diagram, two wires cross with a small hop drawn in one of them. Are they joined?",
          answer: "No. The hop shows that they cross without touching",
        },
      ],
      pyqExampleId: "0ed788d8-3a88-4553-861c-10104115311c",
      traps: [
        {
          title: "Combining before checking for a balanced bridge",
          body: "A bridge cannot be reduced by series and parallel alone. Test \\(P/Q = R/S\\) first; if it holds, remove the middle resistor and the rest falls into series and parallel.",
        },
        {
          title: "Not showing the steps of the reduction",
          body: "Write each combination you make on its own line (which resistors, series or parallel, the value). A bare final value earns little if it is wrong, and the steps carry most of the marks.",
        },
      ],
    },
  ],
};

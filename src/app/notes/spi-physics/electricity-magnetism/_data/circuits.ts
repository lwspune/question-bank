import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_EM_CIRCUITS_NOTE: SubtopicNote = {
  subtopicName: "Series and Parallel Circuits",
  title: "Series and Parallel Circuits",
  oneLineDefinition:
    "Resistors in series share one current and their resistances add; resistors in parallel share one voltage and the reciprocals of their resistances add.",
  whyItMatters:
    "Four questions in the bank, two EASY and two MODERATE: what stays the same in a parallel circuit, the smallest resistance from equal resistors, a wire cut in two and joined in parallel, and the voltage across one resistor in a small network. Each needs the right rule for each group, so know which quantity is shared.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiemci-combine",
      name: "Adding resistors in series and in parallel",
      intuition:
        "In **series** the resistors sit one after another on a single path, so the same current flows through all of them and the battery's voltage is shared out. In **parallel** each resistor is its own path between the same two points, so each gets the full voltage and the current splits.",
      definition:
        "- **Series:** same current through each; voltages add up to the battery voltage; \\(R_s = R_1 + R_2 + R_3\\). The total is bigger than the biggest resistor.\n" +
        "- **Parallel:** same voltage across each; currents add up to the total current; \\(\\dfrac{1}{R_p} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dfrac{1}{R_3}\\). The total is smaller than the smallest resistor.\n" +
        "- For two in parallel: \\(R_p = \\dfrac{R_1 R_2}{R_1 + R_2}\\) (product over sum).\n" +
        "- Houses are wired in **parallel**: every appliance gets the full mains voltage and can be switched on or off by itself.\n" +
        "- In a network, find each group's resistance first. A branch joined straight across the battery has the full battery voltage across it.",
      formula: {
        label: "Series and parallel",
        latex: "R_s = R_1 + R_2 + R_3 \\qquad \\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3} \\qquad R_p = \\frac{R_1 R_2}{R_1 + R_2}",
      },
      authoredExample: {
        prompt: "A 3 \\(\\Omega\\) and a 6 \\(\\Omega\\) resistor are joined in parallel across a 6 V battery. Find the combined resistance and the current through each.",
        steps: [
          "\\(R_p = \\frac{3 \\times 6}{3 + 6} = \\frac{18}{9} = 2\\,\\Omega\\).",
          "Each resistor has the full 6 V across it.",
          "Through 3 \\(\\Omega\\): \\(\\frac{6}{3} = 2\\) A. Through 6 \\(\\Omega\\): \\(\\frac{6}{6} = 1\\) A.",
          "Check: total current \\(= \\frac{6}{2} = 3\\) A \\(= 2 + 1\\).",
        ],
        answer: "2 \\(\\Omega\\); 2 A and 1 A",
      },
      selfCheckExample: {
        prompt: "A 4 \\(\\Omega\\) and an 8 \\(\\Omega\\) resistor are joined in series across a 6 V battery. Find the potential difference across the 4 \\(\\Omega\\) resistor.",
        steps: [
          "\\(R_s = 4 + 8 = 12\\,\\Omega\\), so \\(I = \\frac{6}{12} = 0.5\\) A.",
          "Across 4 \\(\\Omega\\): \\(0.5 \\times 4 = 2\\) V.",
        ],
        answer: "2 V",
      },
      practiceSet: [
        { prompt: "Resistors of 2, 3 and 5 \\(\\Omega\\) are joined in series. What is the total resistance?", answer: "10 \\(\\Omega\\)" },
        { prompt: "A 12 \\(\\Omega\\) and a 4 \\(\\Omega\\) resistor are joined in parallel. What is the combined resistance?", answer: "\\(\\frac{48}{16} = 3\\,\\Omega\\)" },
        { prompt: "In a series circuit, which quantity is the same for every resistor?", answer: "The current" },
        { prompt: "Why are the appliances in a house joined in parallel?", answer: "Each gets the full mains voltage and can be switched on or off by itself" },
      ],
      pyqExampleId: "c53f270c-49e0-473e-b7d1-15ae4734a51b",
      traps: [
        {
          title: "Adding resistances that are in parallel",
          body: "Plain adding is only for series. A 3 \\(\\Omega\\) and a 6 \\(\\Omega\\) resistor in parallel give 2 \\(\\Omega\\), not 9 \\(\\Omega\\): a parallel total is always smaller than the smallest resistor.",
        },
        {
          title: "Swapping what is shared",
          body: "In series the CURRENT is the same and the voltages differ; in parallel the VOLTAGE is the same and the currents differ.",
        },
        {
          title: "Splitting the battery voltage between parallel branches",
          body: "Two branches joined straight across a battery each have the full battery voltage. Share the voltage only between resistors that are in series inside one branch.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiemci-equal",
      name: "Equal resistors and cutting a wire",
      intuition:
        "With identical resistors the formulas collapse into one multiplication or division. And cutting a wire into pieces makes each piece a smaller resistor, because resistance is proportional to length.",
      definition:
        "- n equal resistors R in **series**: \\(nR\\). This is the **largest** total you can make.\n" +
        "- n equal resistors R in **parallel**: \\(\\dfrac{R}{n}\\). This is the **smallest** total you can make.\n" +
        "- A wire of resistance R cut into n equal pieces: each piece is \\(\\dfrac{R}{n}\\). Joined in parallel they give \\(\\dfrac{R/n}{n} = \\dfrac{R}{n^2}\\).",
      formula: {
        label: "n equal resistors",
        latex: "R_s = nR \\qquad R_p = \\frac{R}{n} \\qquad \\text{cut into } n \\text{ and joined in parallel: } \\frac{R}{n^2}",
      },
      authoredExample: {
        prompt: "You have four resistors of 2 \\(\\Omega\\) each. Find the largest and the smallest resistance you can make with all four.",
        steps: [
          "Largest: all in series, \\(4 \\times 2 = 8\\,\\Omega\\).",
          "Smallest: all in parallel, \\(\\frac{2}{4} = 0.5\\,\\Omega\\).",
        ],
        answer: "8 \\(\\Omega\\) and 0.5 \\(\\Omega\\)",
      },
      selfCheckExample: {
        prompt: "A wire of resistance 9 \\(\\Omega\\) is cut into three equal pieces, and the pieces are joined in parallel. Find the resistance.",
        steps: ["Each piece is \\(\\frac{9}{3} = 3\\,\\Omega\\).", "Three 3 \\(\\Omega\\) in parallel: \\(\\frac{3}{3} = 1\\,\\Omega\\)."],
        answer: "1 \\(\\Omega\\)",
      },
      practiceSet: [
        { prompt: "Ten resistors of 5 \\(\\Omega\\) each are joined in parallel. What is the total resistance?", answer: "0.5 \\(\\Omega\\)" },
        { prompt: "Three resistors of 4 \\(\\Omega\\) each are joined in series. What is the total resistance?", answer: "12 \\(\\Omega\\)" },
        { prompt: "Two 6 \\(\\Omega\\) resistors are joined in parallel. What is the total resistance?", answer: "3 \\(\\Omega\\)" },
        { prompt: "For n equal resistors, how many times the smallest total is the largest total?", answer: "\\(n^2\\) times (\\(nR\\) over \\(\\frac{R}{n}\\))" },
      ],
      pyqExampleId: "136d32c2-9599-41ad-b1b1-ffb98b5e42fd",
      traps: [
        {
          title: "Forgetting that cutting changes each piece",
          body: "Each half of a cut wire has half the resistance. Joining two halves of a 10 \\(\\Omega\\) wire in parallel gives \\(\\frac{5}{2} = 2.5\\,\\Omega\\), not \\(\\frac{10}{2} = 5\\,\\Omega\\).",
        },
        {
          title: "Picking series for the minimum",
          body: "Series always gives the largest total and parallel the smallest. 'Minimum resistance' from equal resistors means all of them in parallel.",
        },
      ],
    },
  ],
};

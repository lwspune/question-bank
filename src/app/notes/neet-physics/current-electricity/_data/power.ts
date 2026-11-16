import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_CE_POWER_NOTE: SubtopicNote = {
  subtopicName: "Power, Cells and EMF",
  title: "Power, Cells and EMF",
  oneLineDefinition:
    "Electrical power P = VI = I²R = V²/R and what a power rating fixes, then a cell's emf, its internal resistance and the terminal voltage it delivers.",
  whyItMatters:
    "Five NEET questions from 2022 to 2026, four of them from 2024 or later. Three are about power: the heat shared by two resistors in parallel, two heaters joined in series and then in parallel, and a heater run on a lower supply. Two ask for a cell's terminal voltage from its emf and internal resistance.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphce-power",
      name: "Electrical power and ratings",
      intuition:
        "A resistor turns electrical energy into heat at the rate P = VI. A rating like 220 V, 400 W fixes one thing that never changes, the device's resistance R = V²/P. On a different supply, or joined with other devices, R stays and the power changes. Pick the form of the power formula that holds fixed what the circuit holds fixed: the current in series, the voltage in parallel.",
      definition:
        "- \\(P = VI = I^{2}R = \\dfrac{V^{2}}{R}\\). Heat in a time t: \\(H = I^{2}Rt\\).\n" +
        "- From a rating: \\(R = \\dfrac{V_0^{2}}{P_0}\\). On a supply V: \\(P = P_0\\left(\\dfrac{V}{V_0}\\right)^{2}\\).\n" +
        "- In series (same current): \\(P \\propto R\\). In parallel (same voltage): \\(P \\propto \\dfrac{1}{R}\\).\n" +
        "- Two devices rated \\(P_1\\) and \\(P_2\\) at the same voltage, used on that voltage: in parallel the total is \\(P_1 + P_2\\); in series \\(\\dfrac{P_1P_2}{P_1 + P_2}\\).",
      formula: {
        label: "Power",
        latex: "P = VI = I^{2}R = \\frac{V^{2}}{R}, \\qquad R = \\frac{V_0^{2}}{P_0}, \\qquad P = P_0\\left(\\frac{V}{V_0}\\right)^{2}",
      },
      authoredExample: {
        prompt:
          "A 220 V, 100 W bulb and a 220 V, 25 W bulb are joined in series across 220 V. Which glows brighter, and what is the total power drawn?",
        steps: [
          "\\(R_1 = \\dfrac{220^{2}}{100} = 484\\ \\Omega\\), \\(R_2 = \\dfrac{220^{2}}{25} = 1936\\ \\Omega\\).",
          "In series the current is the same, so \\(P \\propto R\\): the 25 W bulb glows brighter.",
          "Total: \\(\\dfrac{P_1P_2}{P_1 + P_2} = \\dfrac{100 \\times 25}{125} = 20\\) W.",
        ],
        answer: "The 25 W bulb; 20 W in all",
      },
      selfCheckExample: {
        prompt: "An electric iron rated 1000 W, 250 V is used on a 200 V supply. What power does it draw?",
        steps: [
          "Its resistance is fixed: \\(P = P_0\\left(\\dfrac{V}{V_0}\\right)^{2}\\).",
          "\\(P = 1000 \\times \\left(\\dfrac{200}{250}\\right)^{2} = 1000 \\times 0.64 = 640\\) W.",
        ],
        answer: "640 W",
      },
      practiceSet: [
        { prompt: "Resistors of 2 Ω and 4 Ω are in series. Ratio of heat produced in them in the same time?", answer: "1 : 2" },
        { prompt: "What is the resistance of a 200 V, 50 W lamp?", answer: "800 Ω" },
        { prompt: "The voltage across a resistor is halved. By what factor does its power change?", answer: "It becomes one quarter" },
        { prompt: "Two 60 W, 220 V bulbs are joined in series across 220 V. Total power?", answer: "30 W" },
      ],
      pyqExampleId: "bcf3f4ec-c459-47a4-93d8-203febb4a70e",
      traps: [
        {
          title: "In parallel the smaller resistor heats more",
          body: "Parallel resistors share a voltage, so heat goes as \\(V^{2}/R\\): the smaller resistor gives more heat. Using \\(I^{2}R\\) with one current gets the order backwards.",
        },
        {
          title: "Power goes as the square of the voltage",
          body: "Dropping a supply from 220 V to 200 V does not cut the power by 20/220. Square the factor: \\((200/220)^{2}\\) is about 0.83.",
        },
        {
          title: "In series the lower rating glows more",
          body: "A 25 W bulb has more resistance than a 100 W bulb of the same voltage, so with the same current it dissipates more. In parallel the order flips.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphce-emf",
      name: "Emf, internal resistance and terminal voltage",
      intuition:
        "A cell is a source of emf E with a small resistance r inside it, the electrolyte between its plates. When the cell drives a current, part of its emf is used up pushing that current through r. What is left across its terminals, the terminal voltage, is less than E. With no current, the terminal voltage equals the emf.",
      definition:
        "- Current from a cell into an external resistor R: \\(I = \\dfrac{E}{R + r}\\).\n" +
        "- Terminal voltage while the cell supplies current: \\(V = E - Ir = \\dfrac{ER}{R + r}\\). With no current \\(V = E\\).\n" +
        "- Short circuit (R = 0): the largest current, \\(\\dfrac{E}{r}\\).\n" +
        "- Cells in series: \\(E_{eq} = E_1 + E_2\\) and \\(r_{eq} = r_1 + r_2\\) (a cell joined the other way round subtracts its emf).\n" +
        "- Two cells in parallel: \\(E_{eq} = \\dfrac{E_1r_2 + E_2r_1}{r_1 + r_2}\\), \\(r_{eq} = \\dfrac{r_1r_2}{r_1 + r_2}\\). For n identical cells: E and \\(\\dfrac{r}{n}\\).",
      formula: {
        label: "Terminal voltage",
        latex: "I = \\frac{E}{R + r}, \\qquad V = E - Ir, \\qquad E_{eq} = \\frac{E_1r_2 + E_2r_1}{r_1 + r_2}",
      },
      authoredExample: {
        prompt:
          "A cell of emf 6 V and internal resistance 0.5 Ω is joined to a 2.5 Ω resistor. Find the current and the terminal voltage.",
        steps: [
          "\\(I = \\dfrac{6}{2.5 + 0.5} = 2\\) A.",
          "\\(V = E - Ir = 6 - 2 \\times 0.5 = 5\\) V.",
          "Check: \\(V = IR = 2 \\times 2.5 = 5\\) V.",
        ],
        answer: "2 A and 5 V",
      },
      selfCheckExample: {
        prompt:
          "A cell gives 1.5 V on open circuit and 1.2 V when joined to a 4 Ω resistor. What is its internal resistance?",
        steps: [
          "Open circuit gives the emf: E = 1.5 V. With the resistor, \\(I = \\dfrac{1.2}{4} = 0.3\\) A.",
          "\\(Ir = E - V = 0.3\\) V, so \\(r = \\dfrac{0.3}{0.3} = 1\\ \\Omega\\).",
        ],
        answer: "1 Ω",
      },
      practiceSet: [
        { prompt: "What current does a 2 V cell of internal resistance 0.1 Ω give on short circuit?", answer: "20 A" },
        { prompt: "Two cells, each 1.5 V with 0.5 Ω, are joined in series. Their emf and internal resistance together?", answer: "3 V and 1 Ω" },
        { prompt: "Four identical cells of emf E and internal resistance r are joined in parallel. Equivalent emf and internal resistance?", answer: "E and r/4" },
        { prompt: "When no current is drawn from a cell, how does its terminal voltage compare with its emf?", answer: "They are equal" },
      ],
      pyqExampleId: "abbc9c22-7588-4b83-bdca-d45db89615d4",
      traps: [
        {
          title: "Subtract only the drop inside the cell",
          body: "Terminal voltage is \\(E - Ir\\), with the internal resistance r. Subtracting \\(IR\\) with the external resistance gives zero, not the terminal voltage.",
        },
        {
          title: "Parallel cells do not add their emfs",
          body: "Identical cells in parallel keep the emf of one cell and divide the internal resistance by n. Only cells in series add their emfs.",
        },
      ],
    },
  ],
};

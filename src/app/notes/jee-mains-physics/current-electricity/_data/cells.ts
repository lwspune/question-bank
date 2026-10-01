import type { SubtopicNote } from "@/app/notes/_types";

export const CELLS_CE_NOTE: SubtopicNote = {
  subtopicName: "Cells: EMF, Internal Resistance and Combinations",
  title: "Cells: EMF, Internal Resistance and Combinations",
  oneLineDefinition:
    "A real cell is an emf ε in series with an internal resistance r, so it drives I = ε/(R + r) and its terminal voltage ε − Ir falls as it delivers more current.",
  whyItMatters:
    "Twenty-five PYQs, fifteen of them multiple choice, and six from 2026. Thirteen are about one cell, or two in series, driving a load: internal resistance from two readings, the terminal voltage while a cell delivers or takes current, the load that draws the most power, and the load for which one cell's terminal voltage is zero. Twelve combine cells in series, in parallel or against each other, including four where the same current flows either way.",
  concepts: [
    // C1 — emf, internal resistance, terminal voltage
    {
      kind: "formula" as const,
      slug: "jpce-terminal-voltage",
      name: "EMF, internal resistance and terminal voltage",
      intuition:
        "Inside every real cell there is some resistance. When the cell delivers a current, part of its emf is used up pushing that current through itself, so less is left at the terminals. The more current it gives, the lower its terminal voltage. When a stronger source pushes current backwards through it, as in charging, the terminal voltage is higher than the emf.",
      definition:
        "- \\(I = \\dfrac{\\varepsilon}{R + r}\\). Delivering current: \\(V = \\varepsilon - Ir\\). Being charged: \\(V = \\varepsilon + Ir\\).\n" +
        "- With no current (an ideal voltmeter alone across it), \\(V = \\varepsilon\\). Short circuit: \\(I = \\varepsilon/r\\).\n" +
        "- r from two loads: \\(\\varepsilon = I_1(R_1 + r) = I_2(R_2 + r)\\). If voltages are given instead, first find each current as V/R.\n" +
        "- r from one load and a voltmeter: \\(r = R\\left(\\dfrac{\\varepsilon}{V} - 1\\right)\\).\n" +
        "- The power in R is largest when \\(R = r\\); then \\(P_{\\max} = \\dfrac{\\varepsilon^{2}}{4r}\\).\n" +
        "- Cells in series: for one cell's terminal voltage to be zero, its \\(\\varepsilon - Ir\\) must vanish. Set \\(I = \\varepsilon/r\\) for that cell and solve for R.",
      formula: {
        label: "A real cell",
        latex: "I = \\frac{\\varepsilon}{R + r}, \\qquad V = \\varepsilon \\mp Ir, \\qquad P_{\\max} = \\frac{\\varepsilon^{2}}{4r}\\ (R = r)",
      },
      authoredExample: {
        prompt:
          "A cell drives 1 A through a 10 Ω resistor and 2 A through a 4 Ω resistor. Find its emf and internal resistance.",
        steps: [
          "\\(\\varepsilon = 1(10 + r) = 2(4 + r)\\).",
          "\\(10 + r = 8 + 2r\\), so \\(r = 2\\ \\Omega\\).",
          "\\(\\varepsilon = 10 + 2 = 12\\) V.",
        ],
        answer: "ε = 12 V, r = 2 Ω",
      },
      selfCheckExample: {
        prompt:
          "Two 3 V cells, with internal resistances 2 Ω and 0.5 Ω, are joined in series with a resistor R. For what R is the terminal voltage of the 2 Ω cell zero?",
        steps: [
          "\\(I = \\dfrac{6}{R + 2.5}\\).",
          "Zero terminal voltage for the first cell: \\(3 - 2I = 0\\), so \\(I = 1.5\\) A.",
          "\\(R + 2.5 = 6/1.5 = 4\\), so \\(R = 1.5\\ \\Omega\\).",
        ],
        answer: "1.5 Ω",
      },
      practiceSet: [
        { prompt: "ε = 6 V, r = 1 Ω, load 5 Ω. Terminal voltage?", answer: "5 V" },
        { prompt: "A 12 V battery with r = 0.5 Ω is charged at 4 A. Terminal voltage?", answer: "14 V" },
        { prompt: "ε = 9 V, r = 3 Ω. Largest power that can be drawn in an external resistor?", answer: "6.75 W, with R = 3 Ω" },
        { prompt: "A 2 V cell gives 1.8 V across a 9 Ω load. Internal resistance?", answer: "1 Ω" },
      ],
      pyqExampleId: "180c4f3b-c531-4349-896d-a26794f0947f", // 2026: 0.25 A through 5 Ω, 0.5 A through 2 Ω; find r
      traps: [
        {
          title: "Charging adds Ir",
          body: "When a cell is pushed backwards by a stronger one, its terminal voltage is ε + Ir, higher than its emf. Using ε − Ir for the weaker cell in opposition gives the wrong sign.",
        },
        {
          title: "Maximum power is at R = r, not R = 0",
          body: "A short circuit gives the largest current but no power in the load. The power in R peaks when R matches r.",
        },
        {
          title: "Include r in the total",
          body: "The current is ε/(R + r). Dividing ε by R alone forgets the cell's own resistance.",
        },
      ],
    },

    // C2 — combinations of cells
    {
      kind: "formula" as const,
      slug: "jpce-cell-combinations",
      name: "Cells in series, parallel and opposition",
      intuition:
        "Cells in series stack their emfs and their internal resistances, like resistors in series; a reversed cell subtracts its emf but still adds its resistance. Cells in parallel share the load. Their combined emf is a weighted average, with each cell weighted by 1/r, so a cell with low internal resistance has more say. The combined emf always lies between the separate emfs when the cells face the same way.",
      definition:
        "- **Series**: \\(\\varepsilon_{\\text{eq}} = \\sum \\pm\\varepsilon_i\\) (minus for a reversed cell), \\(r_{\\text{eq}} = \\sum r_i\\).\n" +
        "- **Parallel**: \\(\\varepsilon_{\\text{eq}} = \\dfrac{\\sum \\pm\\varepsilon_i/r_i}{\\sum 1/r_i}\\), \\(\\dfrac{1}{r_{\\text{eq}}} = \\sum \\dfrac{1}{r_i}\\). Reversing a cell flips only the sign of its \\(\\varepsilon/r\\) term.\n" +
        "- n identical cells in parallel: emf ε, internal resistance r/n.\n" +
        "- m rows, each of n identical cells in series: \\(\\varepsilon_{\\text{eq}} = n\\varepsilon\\), \\(r_{\\text{eq}} = nr/m\\), \\(I = \\dfrac{n\\varepsilon}{R + nr/m}\\).\n" +
        "- n identical cells give the same current in series and in parallel when \\(\\dfrac{n\\varepsilon}{R + nr} = \\dfrac{\\varepsilon}{R + r/n}\\); clearing the fractions gives \\(R = r\\).",
      formula: {
        label: "Two cells in parallel",
        latex: "\\varepsilon_{\\text{eq}} = \\frac{\\varepsilon_1/r_1 + \\varepsilon_2/r_2}{1/r_1 + 1/r_2}, \\qquad r_{\\text{eq}} = \\frac{r_1r_2}{r_1 + r_2}",
      },
      authoredExample: {
        prompt:
          "A 6 V cell (r = 2 Ω) and a 4 V cell (r = 1 Ω) are joined in parallel, + to +, across a 4 Ω resistor. Find the current. Then find it with the 4 V cell reversed.",
        steps: [
          "\\(\\varepsilon_{\\text{eq}} = \\dfrac{6/2 + 4/1}{1/2 + 1} = \\dfrac{7}{1.5} = \\dfrac{14}{3}\\) V; \\(r_{\\text{eq}} = \\dfrac{2 \\times 1}{3} = \\dfrac{2}{3}\\ \\Omega\\).",
          "\\(I = \\dfrac{14/3}{4 + 2/3} = \\dfrac{14/3}{14/3} = 1\\) A.",
          "Reversed: \\(\\varepsilon_{\\text{eq}} = \\dfrac{3 - 4}{1.5} = -\\dfrac{2}{3}\\) V, and \\(r_{\\text{eq}}\\) is unchanged. \\(I = \\dfrac{2/3}{14/3} = \\dfrac{1}{7}\\) A, in the opposite direction.",
        ],
        answer: "1 A; then 1/7 A the other way",
      },
      selfCheckExample: {
        prompt:
          "Twelve identical cells, each 1.5 V with r = 0.5 Ω, are arranged as 3 parallel rows of 4 cells in series. They drive a 10/3 Ω resistor. Find the current.",
        steps: [
          "Each row: \\(4 \\times 1.5 = 6\\) V and \\(4 \\times 0.5 = 2\\ \\Omega\\).",
          "Three rows in parallel: 6 V and \\(2/3\\ \\Omega\\).",
          "\\(I = \\dfrac{6}{10/3 + 2/3} = \\dfrac{6}{4} = 1.5\\) A.",
        ],
        answer: "1.5 A",
      },
      practiceSet: [
        { prompt: "Three 1.5 V cells, each with r = 0.3 Ω, in series with 4.1 Ω. Current?", answer: "0.9 A" },
        { prompt: "Two identical cells (2 V, 1 Ω) in parallel. Equivalent emf and internal resistance?", answer: "2 V and 0.5 Ω" },
        { prompt: "A 3 V cell (1 Ω) and a 6 V cell (2 Ω) in parallel, + to +. Equivalent emf?", answer: "4 V" },
        { prompt: "Two identical 1.5 V cells in series, one reversed, across 3 Ω. Current?", answer: "Zero" },
      ],
      pyqExampleId: "50858ab6-c924-4e3c-9c05-c1f712015e3b", // 2026: 1 V (2 Ω) and 2 V (1 Ω) in parallel, then one cell reversed
      traps: [
        {
          title: "Weight the emfs by 1/r",
          body: "The emf of cells in parallel is not the plain average. A 6 V cell with 2 Ω and a 4 V cell with 1 Ω give 14/3 V, not 5 V.",
        },
        {
          title: "A reversed cell still adds its resistance",
          body: "Reversing a cell flips the sign of its emf term only. Its internal resistance stays in the combined internal resistance exactly as before.",
        },
        {
          title: "Equivalent emf lies between the emfs",
          body: "For two cells facing the same way in parallel, the combined emf is between the two emfs, and the combined internal resistance is smaller than either. An answer outside that range signals a slip.",
        },
      ],
    },
  ],
};

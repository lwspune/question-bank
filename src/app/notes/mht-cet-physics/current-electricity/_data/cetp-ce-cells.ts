import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/current-electricity";

export const CELLS_NOTE: SubtopicNote = {
  subtopicName: "Ohm's Law, Cells, EMF, and Internal Resistance",
  title: "E.m.f., Internal Resistance and Cells Together",
  oneLineDefinition:
    "A cell's e.m.f. is the voltage it would show with no current; drawing a current I through its internal resistance r lowers the terminal voltage to E − Ir, cells in series add their e.m.f.s and internal resistances, and identical cells in parallel keep their e.m.f. but share the current.",
  whyItMatters:
    "Four PYQs on cells, two of them HARD: the internal resistance from a voltmeter reading, the external resistance that makes one of two series cells show zero terminal voltage, the reading of a voltmeter across two unequal cells in parallel, and the steady current and capacitor charge in a network. " +
    "One card.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-ce-emf-internal-resistance",
      name: "Terminal Voltage and Cells in Series or Parallel",
      intuition:
        "A real cell is an ideal e.m.f. E with a small resistance r inside it. With current I flowing, the terminals show V = E − Ir, less than E by the drop inside. A voltmeter of resistance R_V across a cell reads E·R_V/(R_V + r), which is how r is found from a reading. Two cells in series driving R carry I = (E₁ + E₂)/(R + r₁ + r₂); one of them shows zero terminal voltage when its own drop Ir equals its E. Two unequal cells in parallel settle at a common voltage that is the resistance-weighted mean of their e.m.f.s. In the steady state a capacitor carries no current, so its branch drops out of the current calculation but it still charges to the voltage across it.",
      definition:
        "- \\(V = E - Ir\\); voltmeter of resistance R across the cell: \\(r = \\dfrac{E - V}{V/R}\\) (3 V, reads 2.5 V on 150 Ω ⇒ 30 Ω).\n" +
        "- **Series**: \\(E = E_1 + E_2\\), \\(r = r_1 + r_2\\). Equal cells E with \\(r_1 > r_2\\): the first shows zero terminal voltage when \\(R = r_1 - r_2\\).\n" +
        "- **Parallel** (same polarity): \\(V = \\dfrac{E_1/r_1 + E_2/r_2}{1/r_1 + 1/r_2}\\) (12 V, 2 Ω with 6 V, 1 Ω ⇒ 8 V).\n" +
        "- **Steady state with a capacitor**: its branch carries no current; it charges to the voltage across it, \\(Q = CV\\).",
      formula: {
        label: "Terminal voltage",
        latex: "V = E - Ir, \\qquad I = \\frac{E}{R + r}",
      },
      authoredExample: {
        prompt: "A 9 V cell of internal resistance 1 Ω drives a 2 Ω resistor. Current and terminal voltage?",
        steps: ["I = 9/(2 + 1) = 3 A.", "V = 9 − 3 × 1 = 6 V."],
        answer: "3 A; 6 V",
      },
      selfCheckExample: {
        prompt: "A voltmeter of 150 Ω across a 3 V cell reads 2.5 V. Internal resistance?",
        steps: ["I = 2.5/150 = 1/60 A; r = 0.5/(1/60)."],
        answer: "30 Ω",
      },
      practiceSet: [
        { prompt: "Two equal cells E (r₁ > r₂) in series with R. Terminal voltage of the first is zero. R?", answer: "r₁ − r₂" },
        { prompt: "12 V, 2 Ω and 6 V, 1 Ω in parallel, same polarity. Voltmeter across them?", answer: "8 V" },
      ],
      pyqExampleId: "87dfcc37-ea62-4f54-beae-bc570f612259",
      traps: [
        {
          title: "Reading e.m.f. and terminal voltage as the same",
          body:
            "A voltmeter across a cell that is delivering current reads E − Ir, less than the e.m.f. The e.m.f. appears only when no current flows.",
        },
      ],
    },
  ],
  related: [
    { label: "Kirchhoff's Laws — when cells and resistors form a network", href: `${BASE}/cetp-ce-kirchhoff` },
  ],
};

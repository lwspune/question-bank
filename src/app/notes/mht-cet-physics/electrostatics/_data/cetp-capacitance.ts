import type { SubtopicNote } from "@/app/notes/_types";

export const CAPACITANCE_NOTE: SubtopicNote = {
  subtopicName: "Capacitance and Combinations of Capacitors",
  title: "Capacitance and Combinations of Capacitors",
  oneLineDefinition:
    "Capacitance is the charge stored per volt, C = Q/V, fixed by a capacitor's geometry; in series capacitors share one charge and their reciprocals add, in parallel they share one voltage and they add directly.",
  whyItMatters:
    "22 PYQs, four HARD: two networks read from a figure, a seven-capacitor puzzle, and two plates with unequal charges. The recurring shapes: C from geometry (plates, a sphere, the Earth), " +
    "an equivalent capacitance or a 'which arrangement of seven capacitors gives this value' puzzle, how voltage divides in series, and reading C off a V–Q graph.",
  concepts: [
    // 1 — capacitance from geometry
    {
      kind: "formula" as const,
      slug: "cetp-capacitance-basics",
      name: "Capacitance of Plates and Spheres",
      intuition:
        "A capacitor stores more charge per volt when its plates are bigger and closer: C = ε₀A/d. For a lone sphere the 'other plate' is at infinity and C = 4πε₀R — so even the Earth has a capacitance of under a millifarad.",
      definition:
        "- \\(C = \\dfrac{Q}{V}\\); unit farad. Plates at \\(+20\\) V and \\(-20\\) V differ by 40 V.\n" +
        "- Parallel plates: \\(C = \\dfrac{\\varepsilon_0 A}{d}\\); circular plates \\(A = \\pi r^2\\), so radius \\(\\times\\sqrt{2}\\) doubles \\(A\\).\n" +
        "- Field between the plates: \\(E = \\dfrac{Q}{\\varepsilon_0 A} = \\dfrac{Q}{Cd}\\).\n" +
        "- Isolated sphere: \\(C = 4\\pi\\varepsilon_0 R\\). For a sphere of volume \\(V\\) and area \\(A\\), \\(R = \\dfrac{3V}{A}\\).\n" +
        "- Plates given unequal charges \\(q_1, q_2\\): the facing surfaces carry \\(\\pm\\dfrac{q_1 - q_2}{2}\\), so \\(V = \\dfrac{q_1 - q_2}{2C}\\).\n" +
        "- Charge \\(Q\\) at voltage \\(V\\), \\(Q_1\\) at \\(V - V_1\\): \\(V = \\dfrac{QV_1}{Q - Q_1}\\).",
      formula: {
        label: "Parallel-plate and spherical capacitors",
        latex: "C = \\frac{\\varepsilon_0 A}{d}, \\qquad C_{\\text{sphere}} = 4\\pi\\varepsilon_0 R",
      },
      authoredExample: {
        prompt: "Plates of area 0.02 m² are 1 mm apart in air. Capacitance?",
        steps: ["\\(C = \\dfrac{8.85 \\times 10^{-12} \\times 0.02}{10^{-3}} = 1.77 \\times 10^{-10}\\) F."],
        answer: "177 pF",
      },
      selfCheckExample: {
        prompt: "The radius of circular plates is tripled and their separation is tripled. New capacitance?",
        steps: ["Area \\(\\times 9\\), gap \\(\\times 3\\): \\(C \\times 3\\)."],
        answer: "\\(3C\\)",
      },
      practiceSet: [
        { prompt: "Plates at \\(+15\\) V and \\(-15\\) V carry \\(60\\,\\mu\\)C. Capacitance?", answer: "\\(2\\,\\mu\\)F" },
        { prompt: "Capacitance of the Earth (\\(R = 6.4 \\times 10^6\\) m)?", answer: "About \\(711\\,\\mu\\)F" },
        { prompt: "Plates carrying \\(5\\,\\mu\\)C and \\(1\\,\\mu\\)C form a \\(2\\,\\mu\\)F capacitor. Voltage between them?", answer: "1 V" },
        { prompt: "Field between the plates of a capacitor \\(C\\) with charge \\(Q\\) and gap \\(t\\)?", answer: "\\(\\dfrac{Q}{Ct}\\)" },
      ],
      pyqExampleId: "bd09b9e3-7820-4661-b3ca-4d3d72a3e78a",
      traps: [
        {
          title: "Half the voltage from ±V plates",
          body:
            "Plates at \\(+20\\) V and \\(-20\\) V have a 40 V difference between them. Using 20 V doubles the capacitance and lands on a printed option.",
        },
      ],
    },

    // 2 — series and parallel
    {
      kind: "formula" as const,
      slug: "cetp-series-parallel",
      name: "Series and Parallel Combinations",
      intuition:
        "In series the same charge sits on every capacitor, so the voltages split in inverse proportion to C — the small capacitor takes the big voltage — and the total is less than the smallest. In parallel every capacitor sees the same voltage, so the charges split in proportion to C and the capacitances simply add.",
      definition:
        "- Series: \\(\\dfrac{1}{C} = \\sum\\dfrac{1}{C_i}\\), same \\(Q\\), \\(V_i \\propto \\dfrac{1}{C_i}\\). \\(n\\) identical: \\(\\dfrac{C}{n}\\), and the breakdown voltage becomes \\(nV\\).\n" +
        "- Parallel: \\(C = \\sum C_i\\), same \\(V\\), \\(Q_i \\propto C_i\\).\n" +
        "- 'Seven identical capacitors' puzzles: \\(n\\) in parallel, then \\(7 - n\\) in series with that block: \\(\\dfrac{1}{C} = \\dfrac{1}{nC_0} + \\dfrac{7 - n}{C_0}\\).\n" +
        "- Networks from a figure: reduce the innermost series or parallel group first, and redraw after each step.",
      formula: {
        label: "Combinations",
        latex: "\\frac{1}{C_s} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\cdots, \\qquad C_p = C_1 + C_2 + \\cdots",
      },
      authoredExample: {
        prompt: "\\(4\\,\\mu\\)F and \\(12\\,\\mu\\)F are in series across 64 V. Charge and voltage on each?",
        steps: [
          "\\(C = \\dfrac{4 \\times 12}{16} = 3\\,\\mu\\)F, so \\(Q = 3 \\times 64 = 192\\,\\mu\\)C on each.",
          "\\(V_4 = \\dfrac{192}{4} = 48\\) V, \\(V_{12} = \\dfrac{192}{12} = 16\\) V.",
        ],
        answer: "\\(192\\,\\mu\\)C each; 48 V and 16 V",
      },
      selfCheckExample: {
        prompt: "Two \\(6\\,\\mu\\)F capacitors in parallel are joined in series with a \\(4\\,\\mu\\)F one. Equivalent capacitance?",
        steps: ["Parallel pair: \\(12\\,\\mu\\)F. With \\(4\\,\\mu\\)F in series: \\(\\dfrac{12 \\times 4}{16} = 3\\,\\mu\\)F."],
        answer: "\\(3\\,\\mu\\)F",
      },
      practiceSet: [
        { prompt: "Three identical capacitors \\(C\\), breakdown voltage \\(V\\), in series: capacitance and breakdown voltage?", answer: "\\(\\dfrac{C}{3}\\) and \\(3V\\)" },
        { prompt: "\\(C\\) and \\(3C\\) in series across 12 V. Voltage on \\(C\\)?", answer: "9 V" },
        { prompt: "Seven \\(2\\,\\mu\\)F: four in parallel, then three in series. Result?", answer: "\\(\\dfrac{8}{13}\\,\\mu\\)F" },
        { prompt: "Three in series, then that group in parallel with a fourth (all \\(C\\))?", answer: "\\(\\dfrac{4C}{3}\\)" },
      ],
      pyqExampleId: "dc49323a-c050-4756-bbbb-44d2574da9b1",
      traps: [
        {
          title: "Giving the bigger voltage to the bigger capacitor",
          body:
            "In series \\(V \\propto \\frac{1}{C}\\): \\(3\\,\\mu\\)F and \\(2\\,\\mu\\)F across 100 V put 60 V on the \\(2\\,\\mu\\)F. Asked for \\(V_2 : V_1\\), the answer is \\(3 : 2\\), and \\(2 : 3\\) is waiting.",
        },
      ],
    },

    // 3 — the V–Q graph
    {
      kind: "formula" as const,
      slug: "cetp-qv-graph",
      name: "Reading Capacitance From a Graph",
      intuition:
        "On a graph of V against Q the slope is 1/C, so the FLATTER line is the bigger capacitor. Flip the axes to Q against V and the slope is C itself, so the steeper line is bigger. Check the axes before comparing slopes.",
      definition:
        "- V on the y-axis, Q on the x-axis: slope \\(= \\dfrac{1}{C}\\); smaller slope, larger \\(C\\).\n" +
        "- Q on the y-axis: slope \\(= C\\).\n" +
        "- Same charge: the line lower on a V–Q graph has less voltage, so more capacitance.",
      formula: {
        label: "Slope of the line",
        latex: "V = \\frac{1}{C}\\,Q",
      },
      authoredExample: {
        prompt: "On a V–Q graph two lines have slopes 2 V/μC and 5 V/μC. Their capacitances?",
        steps: ["\\(C = \\dfrac{1}{\\text{slope}}\\): \\(0.5\\,\\mu\\)F and \\(0.2\\,\\mu\\)F."],
        answer: "\\(0.5\\,\\mu\\)F and \\(0.2\\,\\mu\\)F",
      },
      selfCheckExample: {
        prompt: "On a Q–V graph (Q vertical) line X is steeper than line Y. Which has the larger capacitance?",
        steps: ["With Q vertical the slope is \\(C\\) itself."],
        answer: "X",
      },
      practiceSet: [
        { prompt: "V–Q graph: which line has more capacitance, the steeper or the flatter?", answer: "The flatter" },
        { prompt: "What does the area under a V–Q line up to charge Q give?", answer: "The energy stored, \\(\\dfrac{Q^2}{2C}\\)" },
      ],
      pyqExampleId: "911152bf-2450-46a8-a0df-da735f67de81",
      traps: [
        {
          title: "Steeper means bigger — on the wrong graph",
          body:
            "With V on the y-axis, the steeper line needs more volts for the same charge: it is the SMALLER capacitor.",
        },
      ],
    },
  ],
  related: [
    { label: "Dielectrics — what filling the gap does to C", href: "/notes/mht-cet-physics/electrostatics/cetp-dielectrics" },
    { label: "Energy Stored in a Capacitor", href: "/notes/mht-cet-physics/electrostatics/cetp-capacitor-energy" },
  ],
};

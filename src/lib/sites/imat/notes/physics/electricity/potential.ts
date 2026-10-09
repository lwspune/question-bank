import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_ELE_POTENTIAL_NOTE: SubtopicNote = {
  subtopicName: "Potential and Capacitors",
  title: "Electric Potential, the Electronvolt and Capacitors",
  oneLineDefinition:
    "Potential difference is the energy given to each coulomb of charge; a capacitor stores charge, and energy, in proportion to the voltage across it.",
  whyItMatters:
    "Only one past question sits here: a 2012 question ranking three arrangements of identical capacitors. Potential, the work W = qV and the electronvolt are in the syllabus but not yet asked, and they are quick marks when they come.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-ele-potential-work",
      name: "Potential difference, the work W = qV and the electronvolt",
      intuition:
        "Lifting a mass gives it gravitational energy; moving a charge against an electric field gives it electrical energy. The potential difference between two points tells you how much energy each coulomb gains or loses going from one to the other. Multiply by the charge and you have the energy.",
      definition:
        "The **potential difference** (p.d., voltage) between two points is the work done per unit charge moving a charge between them: \\(V = W/q\\), in **volts** (\\(1\\ \\text{V} = 1\\ \\text{J/C}\\)).\n" +
        "- The work done on a charge \\(q\\) crossing a p.d. \\(V\\) is \\(W = qV\\). A charge released in a field turns that work into kinetic energy.\n" +
        "- The **electronvolt** is a unit of **energy**: the energy one elementary charge gains crossing 1 V. \\(1\\ \\text{eV} = 1.6 \\times 10^{-19}\\ \\text{J}\\).\n" +
        "- In a **uniform field** between parallel plates a distance \\(d\\) apart, \\(E = V/d\\).\n" +
        "- Moving a charge along an **equipotential** (a line of equal potential, always at right angles to field lines) takes no work.",
      formula: {
        label: "Work on a charge, and the uniform field",
        latex: "W = qV \\qquad E = \\frac{V}{d}",
        symbols: [
          { symbol: "\\(W\\)", meaning: "work done on the charge (energy gained), in J" },
          { symbol: "\\(q\\)", meaning: "charge, in C" },
          { symbol: "\\(V\\)", meaning: "potential difference crossed, in V" },
          { symbol: "\\(d\\)", meaning: "separation of the plates, in m" },
        ],
      },
      authoredExample: {
        prompt:
          "An electron starts at rest and is accelerated between two plates 4.0 mm apart with a p.d. of 2000 V between them. Find the field between the plates and the kinetic energy the electron gains, in eV and in joules.",
        steps: [
          "Field: \\(E = V/d = 2000 / (4.0 \\times 10^{-3}) = 5.0 \\times 10^5\\ \\text{V/m}\\).",
          "One elementary charge across 2000 V gains 2000 eV.",
          "In joules: \\(W = qV = 1.6 \\times 10^{-19} \\times 2000 = 3.2 \\times 10^{-16}\\ \\text{J}\\).",
        ],
        answer: "\\(5.0 \\times 10^5\\ \\text{V/m}\\); 2000 eV \\(= 3.2 \\times 10^{-16}\\ \\text{J}\\)",
      },
      selfCheckExample: {
        prompt:
          "An alpha particle (charge \\(+2e\\)) is accelerated from rest through a potential difference of 500 V. How much kinetic energy does it gain? (\\(e = 1.6 \\times 10^{-19}\\ \\text{C}\\))",
        options: [
          "\\(8.0 \\times 10^{-17}\\ \\text{J}\\)",
          "\\(1.6 \\times 10^{-16}\\ \\text{J}\\)",
          "\\(6.4 \\times 10^{-22}\\ \\text{J}\\)",
          "\\(1.0 \\times 10^{3}\\ \\text{J}\\)",
          "\\(3.2 \\times 10^{-16}\\ \\text{J}\\)",
        ],
        steps: [
          "\\(W = qV = 2 \\times 1.6 \\times 10^{-19} \\times 500 = 1.6 \\times 10^{-16}\\ \\text{J}\\) (that is 1000 eV).",
          "A uses the charge of a single electron. C divides the charge by the voltage. D writes 1000 eV as 1000 J. E doubles twice.",
        ],
        answer: "(B) \\(1.6 \\times 10^{-16}\\ \\text{J}\\)",
      },
      practiceSet: [
        { prompt: "Express 1 eV in joules.", answer: "\\(1.6 \\times 10^{-19}\\ \\text{J}\\)", method: "Charge \\(e\\) times 1 V" },
        { prompt: "Through what p.d. must a proton be accelerated to gain 5.0 keV?", answer: "5000 V", method: "A charge of \\(e\\) gains 1 eV per volt" },
        { prompt: "Parallel plates 0.010 m apart have 50 V across them. What is the field between them?", answer: "5000 V/m", method: "\\(50 / 0.010\\)" },
        { prompt: "How much work is needed to move a charge along an equipotential line?", answer: "None", method: "No change of potential, so \\(W = q \\times 0\\)" },
      ],
      traps: [
        {
          title: "The electronvolt is energy, not voltage",
          body: "Despite its name, the eV measures energy: \\(1\\ \\text{eV} = 1.6 \\times 10^{-19}\\ \\text{J}\\). A particle with charge \\(2e\\) crossing 500 V gains 1000 eV, not 500 eV. Writing an eV value in joules without converting gives an answer about \\(10^{19}\\) times too big.",
        },
        {
          title: "Plate spacing goes in metres",
          body: "In \\(E = V/d\\) the spacing must be in metres. Using millimetres directly makes the field 1000 times too small.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ele-capacitor",
      name: "Capacitors: C = Q/V, stored energy, series and parallel",
      intuition:
        "A capacitor is two conducting plates separated by an insulator. Connect it to a battery and electrons pile up on one plate and leave the other, until the voltage across the plates matches the battery. A bigger capacitor holds more charge for the same voltage, and the energy stored is what it took to push that charge on.",
      definition:
        "**Capacitance** is the charge stored per volt: \\(C = Q/V\\), in **farads** (F). Real capacitors are usually \\(\\mu\\text{F}\\) or nF.\n" +
        "- The plates carry \\(+Q\\) and \\(-Q\\); \\(Q\\) is the charge on one plate.\n" +
        "- For parallel plates, \\(C\\) grows with the plate area and falls as the gap widens: \\(C = \\varepsilon A/d\\).\n" +
        "- Stored energy: \\(U = \\tfrac{1}{2}QV = \\tfrac{1}{2}CV^2\\).\n" +
        "- **Parallel**: capacitances **add**, \\(C = C_1 + C_2 + \\dots\\) (more plate area).\n" +
        "- **Series**: reciprocals add, \\(1/C = 1/C_1 + 1/C_2 + \\dots\\) (the total is smaller than the smallest).\n" +
        "- These rules are the **reverse** of the rules for resistors.",
      formula: {
        label: "Capacitance, energy and combinations",
        latex: "C = \\frac{Q}{V} \\qquad U = \\tfrac{1}{2}CV^2 \\qquad C_{\\parallel} = C_1 + C_2 \\qquad \\frac{1}{C_{\\text{series}}} = \\frac{1}{C_1} + \\frac{1}{C_2}",
        symbols: [
          { symbol: "\\(C\\)", meaning: "capacitance, in F" },
          { symbol: "\\(Q\\)", meaning: "charge on one plate, in C" },
          { symbol: "\\(V\\)", meaning: "p.d. across the capacitor, in V" },
          { symbol: "\\(U\\)", meaning: "energy stored, in J" },
        ],
      },
      authoredExample: {
        prompt:
          "A \\(50\\ \\mu\\text{F}\\) capacitor is charged to 20 V. Find the charge on its plates and the energy it stores.",
        steps: [
          "\\(Q = CV = 50 \\times 10^{-6} \\times 20 = 1.0 \\times 10^{-3}\\ \\text{C}\\).",
          "\\(U = \\tfrac{1}{2}CV^2 = 0.5 \\times 50 \\times 10^{-6} \\times 400 = 0.010\\ \\text{J}\\).",
          "Check: \\(\\tfrac{1}{2}QV = 0.5 \\times 1.0 \\times 10^{-3} \\times 20 = 0.010\\ \\text{J}\\).",
        ],
        answer: "\\(1.0 \\times 10^{-3}\\ \\text{C}\\); 0.010 J",
      },
      selfCheckExample: {
        prompt:
          "Three identical \\(6.0\\ \\mu\\text{F}\\) capacitors are connected so that two of them are in parallel, and that pair is in series with the third. What is the total capacitance?",
        options: [
          "\\(18\\ \\mu\\text{F}\\)",
          "\\(2.0\\ \\mu\\text{F}\\)",
          "\\(4.0\\ \\mu\\text{F}\\)",
          "\\(9.0\\ \\mu\\text{F}\\)",
          "\\(12\\ \\mu\\text{F}\\)",
        ],
        steps: [
          "The parallel pair adds: \\(6.0 + 6.0 = 12\\ \\mu\\text{F}\\).",
          "In series with \\(6.0\\ \\mu\\text{F}\\): \\(1/C = 1/12 + 1/6 = 3/12\\), so \\(C = 4.0\\ \\mu\\text{F}\\).",
          "D uses the resistor rules (\\(3 + 6\\)). A puts all three in parallel, B all three in series; E stops after the parallel pair.",
        ],
        answer: "(C) \\(4.0\\ \\mu\\text{F}\\)",
      },
      practiceSet: [
        { prompt: "Two \\(10\\ \\mu\\text{F}\\) capacitors are joined in series. Total capacitance?", answer: "\\(5.0\\ \\mu\\text{F}\\)", method: "Two equal ones in series give half" },
        { prompt: "What charge does a \\(2.0\\ \\mu\\text{F}\\) capacitor hold at 6.0 V?", answer: "\\(12\\ \\mu\\text{C}\\)", method: "\\(Q = CV\\)" },
        { prompt: "The voltage across a capacitor is doubled. By what factor does its stored energy change?", answer: "4", method: "\\(U \\propto V^2\\)" },
      ],
      traps: [
        {
          title: "Capacitors combine the opposite way to resistors",
          body: "Capacitors in parallel add directly; in series you add reciprocals. Resistors do the reverse. Swapping the rules is the most common wrong answer in capacitor network questions.",
        },
        {
          title: "Stored energy is half QV",
          body: "The energy in a charged capacitor is \\(\\tfrac{1}{2}QV\\), not \\(QV\\). The voltage builds up from zero while charging, so on average each bit of charge was pushed on at half the final voltage.",
        },
      ],
    },
  ],
};

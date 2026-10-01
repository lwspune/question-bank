import type { SubtopicNote } from "@/app/notes/_types";

export const CAPACITANCE_ES_NOTE: SubtopicNote = {
  subtopicName: "Capacitance and Capacitor Combinations",
  title: "Capacitance and Capacitor Combinations",
  oneLineDefinition:
    "Capacitance C = Q/V depends only on shape, size and the medium; in series every capacitor holds the same charge and 1/C adds, in parallel every one has the same voltage and C adds.",
  whyItMatters:
    "Thirty-three PYQs, twenty-three of them multiple choice, and four from 2026. Seventeen are about a single capacitor: the capacitance of plates and spheres, the field and energy between the plates, facts about dielectrics, leakage and charging current. Sixteen reduce a network: series and parallel, bridges and ladders, and capacitors inside DC circuits once the currents have settled.",
  concepts: [
    // C1 — a single capacitor
    {
      kind: "formula" as const,
      slug: "jpes-cap-basics",
      name: "Capacitance of plates and spheres",
      intuition:
        "A capacitor stores charge at a potential difference, and C tells you how much charge per volt. Bigger plates hold more charge; closer plates let a small voltage make a strong field. Neither the charge nor the voltage changes C: double the charge and the voltage doubles with it. A dielectric between the plates weakens the field for the same charge, so C grows by K.",
      definition:
        "- \\(C = \\dfrac{Q}{V}\\). Parallel plates: \\(C = \\dfrac{K\\varepsilon_0 A}{d}\\).\n" +
        "- Isolated sphere: \\(C = 4\\pi\\varepsilon_0 R\\), the same for hollow and solid spheres. Spherical capacitor with the outer sphere earthed: \\(\\dfrac{4\\pi\\varepsilon_0 R_1R_2}{R_2 - R_1}\\).\n" +
        "- Between the plates: \\(E = \\dfrac{\\sigma}{\\varepsilon_0} = \\dfrac{V}{d}\\); energy per unit volume \\(\\tfrac{1}{2}\\varepsilon_0E^{2}\\); force between the plates \\(\\dfrac{Q^{2}}{2\\varepsilon_0 A}\\).\n" +
        "- Plates carrying \\(q_1\\) and \\(q_2\\): the inner faces hold \\(\\pm\\dfrac{q_1 - q_2}{2}\\), so \\(V = \\dfrac{q_1 - q_2}{2C}\\).\n" +
        "- Dielectrics: the induced surface charge is \\(Q\\left(1 - \\dfrac{1}{K}\\right)\\). Non-polar molecules have no permanent dipole; polar ones do, but at random, so a sample has none until a field lines them up. A material's breakdown field caps the voltage.\n" +
        "- A leaky dielectric of resistivity ρ: \\(RC = \\rho K\\varepsilon_0\\), whatever the plate size. While charging, the current is \\(i = C\\dfrac{dV}{dt}\\).",
      formula: {
        label: "Plates and spheres",
        latex: "C = \\frac{K\\varepsilon_0 A}{d}, \\qquad C_{\\text{sphere}} = 4\\pi\\varepsilon_0 R, \\qquad C_{\\text{spherical}} = \\frac{4\\pi\\varepsilon_0 R_1R_2}{R_2 - R_1}",
      },
      authoredExample: {
        prompt:
          "An air capacitor has plates of area 0.02 m² that are 1 mm apart, with 50 V across it. Find C, Q, the field between the plates and the energy per unit volume. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\))",
        steps: [
          "\\(C = \\dfrac{8.85 \\times 10^{-12} \\times 0.02}{10^{-3}} = 1.77 \\times 10^{-10}\\) F = 177 pF.",
          "\\(Q = CV = 1.77 \\times 10^{-10} \\times 50 \\approx 8.9 \\times 10^{-9}\\) C.",
          "\\(E = \\dfrac{V}{d} = 5 \\times 10^{4}\\) V/m.",
          "\\(u = \\tfrac{1}{2}\\varepsilon_0E^{2} = 0.5 \\times 8.85 \\times 10^{-12} \\times 2.5 \\times 10^{9} \\approx 0.011\\ \\text{J/m}^{3}\\).",
        ],
        answer: "177 pF; about 8.9 nC; \\(5 \\times 10^{4}\\) V/m; about 0.011 J/m³.",
      },
      selfCheckExample: {
        prompt:
          "A sphere of radius 9 cm sits inside a concentric earthed sphere of radius 10 cm. Find the capacitance, and compare it with the 9 cm sphere alone.",
        steps: [
          "\\(C = 4\\pi\\varepsilon_0 \\times \\dfrac{0.09 \\times 0.1}{0.01} = 4\\pi\\varepsilon_0 \\times 0.9 = \\dfrac{0.9}{9 \\times 10^{9}} = 10^{-10}\\) F.",
          "Alone: \\(\\dfrac{0.09}{9 \\times 10^{9}} = 10^{-11}\\) F.",
        ],
        answer: "100 pF, ten times the 10 pF of the sphere alone.",
      },
      practiceSet: [
        { prompt: "A parallel-plate capacitor's area is doubled and its gap halved. New capacitance?", answer: "4 times the old value" },
        { prompt: "Capacitance of an isolated sphere of radius 9 m?", answer: "1 nF" },
        { prompt: "The plates of a \\(2\\ \\mu\\text{F}\\) capacitor carry \\(+5\\ \\mu\\text{C}\\) and \\(+1\\ \\mu\\text{C}\\). Potential difference?", answer: "1 V" },
        { prompt: "A capacitor's dielectric has dielectric constant K and resistivity ρ. Time constant RC?", answer: "\\(\\rho K\\varepsilon_0\\)" },
      ],
      pyqExampleId: "87fdb27f-d8cc-4a96-8eca-d0cc3a966610", // 2022: isolated sphere's C becomes n times with an earthed outer sphere, R₂/R₁ = n/(n − 1)
      traps: [
        {
          title: "C does not depend on Q or V",
          body: "Charging a capacitor further raises Q and V together. Only the geometry and the medium change C.",
        },
        {
          title: "Hollow or solid, the same C",
          body: "A conductor's charge sits on its surface, so a hollow sphere and a solid one of the same radius have the same capacitance.",
        },
        {
          title: "Unequal plate charges",
          body: "Only half the difference of the two charges sits on the inner faces. Using q₁ alone for Q in V = Q/C gives a voltage that is too large.",
        },
      ],
    },

    // C2 — combinations and networks
    {
      kind: "formula" as const,
      slug: "jpes-combinations",
      name: "Series, parallel and networks",
      intuition:
        "In series, the charge that leaves one plate arrives at the next, so every capacitor holds the same charge and the voltages add. In parallel, every capacitor sits across the same two points, so the voltages are equal and the charges add. A complicated drawing becomes simple once you name its nodes: points joined by plain wire are one node, and each capacitor sits between two of them.",
      definition:
        "- Series: same Q; \\(\\dfrac{1}{C} = \\sum \\dfrac{1}{C_i}\\). The voltage splits in inverse proportion to C, and the total is less than the smallest.\n" +
        "- Parallel: same V; \\(C = \\sum C_i\\). The charge splits in proportion to C.\n" +
        "- Two equal capacitors: series C/2, parallel 2C, a ratio of 1 : 4.\n" +
        "- Network: label the nodes, merge points joined by wire, drop any capacitor whose two plates are on one node (it holds no charge), then combine step by step.\n" +
        "- Bridge with \\(C_1/C_2 = C_3/C_4\\): the middle capacitor holds no charge.\n" +
        "- DC circuit at steady state: no current flows through a capacitor's branch. Find the voltage across it from the resistor currents, then \\(Q = CV\\).",
      formula: {
        label: "Series and parallel",
        latex: "\\frac{1}{C_{s}} = \\sum_i \\frac{1}{C_i}, \\qquad C_{p} = \\sum_i C_i",
      },
      authoredExample: {
        prompt:
          "Capacitors of \\(3\\ \\mu\\text{F}\\) and \\(6\\ \\mu\\text{F}\\) in series are joined in parallel with a \\(4\\ \\mu\\text{F}\\) capacitor, all across 12 V. Find the charge on each.",
        steps: [
          "Series pair: \\(\\dfrac{3 \\times 6}{3 + 6} = 2\\ \\mu\\text{F}\\). It has the full 12 V across it.",
          "Pair's charge: \\(2 \\times 12 = 24\\ \\mu\\text{C}\\), the same on the 3 and 6 μF (8 V and 4 V across them).",
          "The \\(4\\ \\mu\\text{F}\\) has 12 V: \\(48\\ \\mu\\text{C}\\). Total \\(72\\ \\mu\\text{C}\\) on \\(6\\ \\mu\\text{F}\\).",
        ],
        answer: "\\(24\\ \\mu\\text{C}\\) on each of the 3 and 6 μF; \\(48\\ \\mu\\text{C}\\) on the 4 μF.",
      },
      selfCheckExample: {
        prompt:
          "A 12 V battery of negligible internal resistance drives a current through 2 Ω and 4 Ω in series. A \\(5\\ \\mu\\text{F}\\) capacitor is connected across the 4 Ω resistor. Charge on it once the current is steady?",
        steps: [
          "No current enters the capacitor's branch: \\(I = \\dfrac{12}{6} = 2\\) A.",
          "Voltage across the 4 Ω: 8 V, so \\(Q = 5 \\times 8 = 40\\ \\mu\\text{C}\\).",
        ],
        answer: "\\(40\\ \\mu\\text{C}\\)",
      },
      practiceSet: [
        { prompt: "Three \\(6\\ \\mu\\text{F}\\) capacitors in series. Equivalent?", answer: "\\(2\\ \\mu\\text{F}\\)" },
        { prompt: "\\(2\\ \\mu\\text{F}\\) and \\(3\\ \\mu\\text{F}\\) in series across 10 V. Voltage on the 2 μF?", answer: "6 V" },
        { prompt: "Bridge arms 2, 4, 3 and 6 μF, so that 2/4 = 3/6, with a fifth capacitor across the middle. Charge on the fifth?", answer: "Zero" },
        { prompt: "Two \\(4\\ \\mu\\text{F}\\) in parallel, then in series with \\(8\\ \\mu\\text{F}\\). Equivalent?", answer: "\\(4\\ \\mu\\text{F}\\)" },
      ],
      pyqExampleId: "fc9f8180-f3e7-479c-98e5-c700e9190d7a", // 2023: six-capacitor ladder across 10 V, charge on C₄ = 4 μC (needs its figure)
      traps: [
        {
          title: "Decide by the nodes, not by the drawing",
          body: "Two capacitors drawn one after the other are in parallel if both connect the same two nodes. Label the nodes before calling anything series.",
        },
        {
          title: "A shorted capacitor stores nothing",
          body: "If a wire joins a capacitor's two plates, both are on one node, so it holds no charge and drops out of the network.",
        },
        {
          title: "Steady state means no capacitor current",
          body: "Once the currents settle, a capacitor branch carries none. Remove the capacitors, find the currents, then read each capacitor's voltage from its two nodes.",
        },
      ],
    },
  ],
};

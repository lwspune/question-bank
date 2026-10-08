import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_ELE_CURRENT_NOTE: SubtopicNote = {
  subtopicName: "Current and Resistance",
  title: "Current, Ohm's Law and Resistivity",
  oneLineDefinition:
    "Current is the rate of flow of charge; resistance is how hard a component makes that flow, and for a wire it depends on the material, the length and the cross-section.",
  whyItMatters:
    "The 2018 paper asked for the resistance of a wire from its resistivity, length and diameter. The 2025 ministry paper asked which particles move, and which way, in a metal wire carrying a current.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-ele-current-flow",
      name: "Electric current: charge per second, and which way it flows",
      intuition:
        "A current is charge on the move, and its size is how many coulombs pass a point each second. Long before electrons were discovered, current was defined as flowing from the positive terminal to the negative. In a metal it is actually electrons that move, and they go the other way.",
      definition:
        "**Current** is the rate of flow of charge: \\(I = Q/t\\), in **amperes** (\\(1\\ \\text{A} = 1\\ \\text{C/s}\\)).\n" +
        "- **Conventional current** flows from the **positive** terminal, round the circuit, to the **negative** terminal.\n" +
        "- In a **metal** the moving charges are **electrons**, drifting **opposite** to the conventional current. The positive ions stay in place; protons never move along a wire.\n" +
        "- In an **electrolyte** both kinds of ion move: positive ions with the conventional current, negative ions against it.\n" +
        "- The current is the same at every point of a single loop: charge is not used up, only its energy is.",
      formula: {
        label: "Current",
        latex: "I = \\frac{Q}{t}",
        symbols: [
          { symbol: "\\(I\\)", meaning: "current, in A" },
          { symbol: "\\(Q\\)", meaning: "charge passing a point, in C" },
          { symbol: "\\(t\\)", meaning: "time, in s" },
        ],
      },
      authoredExample: {
        prompt:
          "A lamp carries a steady current of 0.40 A for 5.0 minutes. How much charge passes through it, and how many electrons is that?",
        steps: [
          "Convert the time: \\(5.0\\ \\text{min} = 300\\ \\text{s}\\).",
          "\\(Q = It = 0.40 \\times 300 = 120\\ \\text{C}\\).",
          "Electrons: \\(n = Q/e = 120 / 1.6 \\times 10^{-19} = 7.5 \\times 10^{20}\\).",
        ],
        answer: "120 C, about \\(7.5 \\times 10^{20}\\) electrons",
      },
      selfCheckExample: {
        prompt: "A charge of 90 C flows through a heater in 1.5 minutes. What is the current?",
        options: ["1.0 A", "60 A", "135 A", "0.017 A", "8100 A"],
        steps: [
          "Convert: \\(1.5\\ \\text{min} = 90\\ \\text{s}\\).",
          "\\(I = Q/t = 90 / 90 = 1.0\\ \\text{A}\\).",
          "B divides by 1.5 without converting to seconds. C multiplies by the time. D divides time by charge.",
        ],
        answer: "(A) 1.0 A",
      },
      practiceSet: [
        { prompt: "Conventional current flows east along a copper wire. Which way do the electrons move?", answer: "West", method: "Electrons drift against the conventional current" },
        { prompt: "How much charge passes in 10 s when the current is 2.0 mA?", answer: "0.020 C", method: "\\(2.0 \\times 10^{-3} \\times 10\\)" },
        { prompt: "In salt water carrying a current, do the chloride ions move with or against the conventional current?", answer: "Against it", method: "Negative charges move opposite to conventional current" },
      ],
      traps: [
        {
          title: "Electrons move against the conventional current",
          body: "The arrow on a circuit diagram shows conventional current, from + to −. In a metal wire the charges actually moving are electrons, going the opposite way. Protons do not move along a wire at all, so any option with moving protons in a metal is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ele-ohm",
      name: "Resistance and Ohm's law",
      intuition:
        "A voltage pushes charge round a circuit; resistance holds it back. For a metal wire at a steady temperature, double the push and you double the flow: the current is proportional to the voltage. That straight-line rule is Ohm's law, and the slope tells you the resistance.",
      definition:
        "**Resistance** is the p.d. across a component divided by the current through it: \\(R = V/I\\), in **ohms** (\\(1\\ \\Omega = 1\\ \\text{V/A}\\)).\n" +
        "- **Ohm's law**: for a metal conductor at constant temperature, \\(I\\) is proportional to \\(V\\), so \\(R\\) is constant. Such a component is **ohmic**.\n" +
        "- A **filament lamp** is not ohmic: as it heats up its resistance rises, so its current-voltage graph curves towards the voltage axis.\n" +
        "- The resistance of a metal **rises with temperature**; that of a semiconductor (a thermistor) **falls**.\n" +
        "- A **superconductor** below its critical temperature has **zero resistance** (mercury below 4.2 K is the classic example).",
      formula: {
        label: "Ohm's law",
        latex: "V = I R",
        symbols: [
          { symbol: "\\(V\\)", meaning: "p.d. across the component, in V" },
          { symbol: "\\(I\\)", meaning: "current through it, in A" },
          { symbol: "\\(R\\)", meaning: "resistance, in Ω" },
        ],
      },
      authoredExample: {
        prompt:
          "A heater connected to 230 V draws a current of 5.0 A. Find its resistance. If its resistance stayed the same, what current would it draw from 115 V?",
        steps: [
          "\\(R = V/I = 230 / 5.0 = 46\\ \\Omega\\).",
          "At 115 V: \\(I = V/R = 115 / 46 = 2.5\\ \\text{A}\\).",
          "Halving the voltage halves the current, as Ohm's law says for a constant resistance.",
        ],
        answer: "\\(46\\ \\Omega\\); 2.5 A",
      },
      selfCheckExample: {
        prompt:
          "A resistor carries a current of 0.25 A when the p.d. across it is 6.0 V. Its temperature does not change. What current flows when the p.d. is raised to 9.0 V?",
        options: ["0.17 A", "0.25 A", "0.38 A", "1.5 A", "2.3 A"],
        steps: [
          "\\(R = 6.0 / 0.25 = 24\\ \\Omega\\), and it stays 24 Ω.",
          "\\(I = 9.0 / 24 = 0.375\\ \\text{A} \\approx 0.38\\ \\text{A}\\).",
          "A scales by the inverse ratio of voltages. B assumes the current cannot change. D divides the voltages. E multiplies 9.0 by 0.25.",
        ],
        answer: "(C) 0.38 A",
      },
      practiceSet: [
        { prompt: "A component passes 3.0 mA at 12 V. What is its resistance?", answer: "4000 Ω", method: "\\(12 / 3.0 \\times 10^{-3}\\)" },
        { prompt: "What p.d. drives 50 mA through a 220 Ω resistor?", answer: "11 V", method: "\\(0.050 \\times 220\\)" },
        { prompt: "A filament lamp gets hotter as the voltage rises. Does its resistance go up, go down or stay the same?", answer: "Go up", method: "A metal's resistance rises with temperature" },
      ],
      traps: [
        {
          title: "Ohm's law needs a constant resistance",
          body: "\\(R = V/I\\) defines resistance for any component at any moment, but Ohm's law (current proportional to voltage) holds only when the resistance is constant, as for a metal at steady temperature. A filament lamp does not obey it, so doubling its voltage less than doubles its current.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ele-resistivity",
      name: "Resistivity: how a wire's length and thickness set its resistance",
      intuition:
        "A longer wire is like a longer corridor: the charges have further to push through, so the resistance grows in proportion to the length. A thicker wire is like a wider corridor: more paths side by side, so the resistance falls as the cross-section area grows. The material itself sets the starting value, its resistivity.",
      definition:
        "The resistance of a uniform wire is \\(R = \\rho L/A\\).\n" +
        "- \\(\\rho\\) is the **resistivity**, a property of the material and its temperature, in \\(\\Omega\\,\\text{m}\\). It does not depend on the wire's shape.\n" +
        "- Good conductors have tiny resistivities (copper about \\(1.7 \\times 10^{-8}\\ \\Omega\\,\\text{m}\\)); insulators have enormous ones.\n" +
        "- For a round wire, \\(A = \\pi r^2 = \\pi d^2/4\\). Doubling the **diameter** makes the area four times larger and the resistance four times smaller.",
      formula: {
        label: "Resistance of a wire",
        latex: "R = \\frac{\\rho L}{A} \\qquad A = \\frac{\\pi d^2}{4}",
        symbols: [
          { symbol: "\\(\\rho\\)", meaning: "resistivity of the material, in Ω m" },
          { symbol: "\\(L\\)", meaning: "length, in m" },
          { symbol: "\\(A\\)", meaning: "cross-section area, in m²" },
          { symbol: "\\(d\\)", meaning: "diameter of the wire, in m" },
        ],
      },
      authoredExample: {
        prompt:
          "A copper wire (\\(\\rho = 1.7 \\times 10^{-8}\\ \\Omega\\,\\text{m}\\)) is 10 m long with a diameter of 1.0 mm. Find its resistance.",
        steps: [
          "Radius \\(0.50\\ \\text{mm} = 5.0 \\times 10^{-4}\\ \\text{m}\\), so \\(A = \\pi (5.0 \\times 10^{-4})^2 \\approx 7.85 \\times 10^{-7}\\ \\text{m}^2\\).",
          "\\(R = \\rho L/A = 1.7 \\times 10^{-8} \\times 10 / 7.85 \\times 10^{-7} \\approx 0.22\\ \\Omega\\).",
          "Leaving the answer with \\(\\pi\\) in it is also fine on IMAT: \\(R = 1.7 \\times 10^{-7}/(\\pi \\times 2.5 \\times 10^{-7}) = 0.68/\\pi\\ \\Omega\\).",
        ],
        answer: "About \\(0.22\\ \\Omega\\)",
      },
      selfCheckExample: {
        prompt:
          "Wire X has resistance \\(R\\). Wire Y is made of the same metal, is twice as long and has twice the diameter of X. What is the resistance of Y?",
        options: ["\\(\\dfrac{R}{4}\\)", "\\(\\dfrac{R}{2}\\)", "\\(R\\)", "\\(2R\\)", "\\(8R\\)"],
        steps: [
          "Length doubled: \\(R\\) is multiplied by 2.",
          "Diameter doubled: area multiplied by \\(2^2 = 4\\), so \\(R\\) is divided by 4.",
          "Overall \\(2/4 = 1/2\\), so \\(R/2\\). C treats the area as proportional to the diameter. D ignores the diameter. E multiplies by the area change instead of dividing.",
        ],
        answer: "(B) \\(\\dfrac{R}{2}\\)",
      },
      practiceSet: [
        { prompt: "A wire of resistivity \\(5.0 \\times 10^{-7}\\ \\Omega\\,\\text{m}\\) is 2.0 m long with a cross-section of \\(1.0 \\times 10^{-6}\\ \\text{m}^2\\). Its resistance?", answer: "1.0 Ω", method: "\\(5.0 \\times 10^{-7} \\times 2.0 / 1.0 \\times 10^{-6}\\)" },
        { prompt: "A wire is cut into two equal halves. What is the resistance of each half?", answer: "Half the original", method: "\\(R \\propto L\\)" },
        { prompt: "A wire is stretched to twice its length; its volume stays the same. What happens to its resistance?", answer: "It becomes 4 times larger", method: "Length doubles and area halves" },
      ],
      traps: [
        {
          title: "Diameter is squared in the area",
          body: "The area of a round wire is \\(\\pi d^2/4\\). Doubling the diameter quarters the resistance, it does not halve it. Forgetting the 4 in \\(\\pi d^2/4\\), or using the diameter as the radius, gives an answer four times off.",
        },
      ],
    },
  ],
};

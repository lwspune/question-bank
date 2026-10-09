import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_ELE_CIRCUITS_NOTE: SubtopicNote = {
  subtopicName: "Series and Parallel Circuits",
  title: "Resistor Networks, Kirchhoff's Rules and Internal Resistance",
  oneLineDefinition:
    "Resistors in series add, resistors in parallel give a total smaller than the smallest, current splits at junctions, and a real battery loses some voltage inside itself.",
  whyItMatters:
    "This is the most asked page of the chapter: past papers from 2011, 2014, 2016, 2022 and 2025 all hinged on combining resistors, either to find a current, the largest and smallest totals, meter readings or the resistance of a big regular network.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-ele-series-parallel",
      name: "Resistors in series and in parallel",
      intuition:
        "In series the current has to pass through every resistor in turn, so the obstacles add up. In parallel the current has several roads to choose from, so adding another road always makes the whole thing easier to get through. Collapse a network one group at a time, from the inside out.",
      definition:
        "- **Series**: the same current flows through each; the total is the sum, \\(R = R_1 + R_2 + \\dots\\)\n" +
        "- **Parallel**: each has the same p.d. across it; reciprocals add, \\(1/R = 1/R_1 + 1/R_2 + \\dots\\)\n" +
        "- Two in parallel: \\(R = \\dfrac{R_1 R_2}{R_1 + R_2}\\) (product over sum).\n" +
        "- \\(n\\) **identical** resistors \\(R\\): \\(nR\\) in series, \\(R/n\\) in parallel.\n" +
        "- A parallel total is always **smaller than the smallest** branch. Adding a branch in parallel lowers the total and raises the current from the battery.",
      formula: {
        label: "Series and parallel",
        latex: "R_{\\text{series}} = R_1 + R_2 + \\dots \\qquad \\frac{1}{R_{\\parallel}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots",
        symbols: [
          { symbol: "\\(R_1, R_2\\)", meaning: "the individual resistances, in Ω" },
          { symbol: "\\(R_{\\parallel}\\)", meaning: "the single resistance equal to the parallel group" },
        ],
      },
      authoredExample: {
        prompt:
          "A 22 V battery with no internal resistance is connected to a 5.0 Ω resistor in series with a parallel pair of 10 Ω and 15 Ω. Find the current from the battery and the current in each branch of the pair.",
        steps: [
          "Parallel pair: \\(\\dfrac{10 \\times 15}{10 + 15} = 150/25 = 6.0\\ \\Omega\\).",
          "Total: \\(5.0 + 6.0 = 11\\ \\Omega\\), so \\(I = 22/11 = 2.0\\ \\text{A}\\).",
          "P.d. across the pair: \\(2.0 \\times 6.0 = 12\\ \\text{V}\\). Branch currents: \\(12/10 = 1.2\\ \\text{A}\\) and \\(12/15 = 0.80\\ \\text{A}\\), which add back to 2.0 A.",
        ],
        answer: "2.0 A from the battery; 1.2 A in the 10 Ω, 0.80 A in the 15 Ω",
      },
      selfCheckExample: {
        prompt:
          "Four identical 12 Ω resistors are arranged as two parallel pairs, and the two pairs are connected in series. What is the total resistance?",
        options: ["3.0 Ω", "48 Ω", "12 Ω", "6.0 Ω", "24 Ω"],
        steps: [
          "Each parallel pair: \\(12/2 = 6.0\\ \\Omega\\).",
          "Two pairs in series: \\(6.0 + 6.0 = 12\\ \\Omega\\).",
          "A puts all four in parallel and B all four in series. D stops after one pair. E adds the pairs without halving them first.",
        ],
        answer: "(C) 12 Ω",
      },
      practiceSet: [
        { prompt: "What are the largest and smallest totals you can make from four 10 Ω resistors, using all of them?", answer: "40 Ω and 2.5 Ω", method: "All in series; all in parallel" },
        { prompt: "Five identical 20 Ω resistors are connected in parallel. Total?", answer: "4.0 Ω", method: "\\(R/n = 20/5\\)" },
        { prompt: "A 30 Ω and a 60 Ω resistor are in parallel. Total?", answer: "20 Ω", method: "\\(1800/90\\)" },
        { prompt: "A third resistor is added in parallel to a pair. Does the battery current go up or down?", answer: "Up", method: "The total resistance falls" },
      ],
      traps: [
        {
          title: "A parallel total is smaller than every branch",
          body: "Putting resistors in parallel gives the current extra paths, so the total is less than the smallest single resistor. If your parallel answer is bigger than one of the branches, you have added the resistances instead of their reciprocals.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ele-kirchhoff",
      name: "Kirchhoff's rules, the potential divider and meters",
      intuition:
        "Charge does not pile up anywhere in a circuit, so whatever flows into a junction must flow out. Energy is not made or lost either: going all the way round a loop, the voltage the battery gives is used up exactly by the components. These two bookkeeping rules solve every simple circuit.",
      definition:
        "- **Junction rule** (charge conservation): the total current into a junction equals the total current out.\n" +
        "- **Loop rule** (energy conservation): round any closed loop, the e.m.f.s add up to the sum of the p.d.s (\\(IR\\) values).\n" +
        "- **Potential divider**: resistors in series share the supply voltage in proportion to their resistances, \\(V_1 = V\\,R_1/(R_1 + R_2)\\).\n" +
        "- An **ammeter** goes **in series** and ideally has **zero** resistance. A **voltmeter** goes **in parallel** and ideally has **infinite** resistance (it takes no current).",
      formula: {
        label: "Potential divider",
        latex: "V_1 = V \\, \\frac{R_1}{R_1 + R_2}",
        symbols: [
          { symbol: "\\(V\\)", meaning: "total p.d. across the series chain, in V" },
          { symbol: "\\(V_1\\)", meaning: "p.d. across \\(R_1\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "A 12 V supply with no internal resistance is connected across a 2.0 kΩ and a 4.0 kΩ resistor in series. Find the current and the p.d. across each resistor.",
        steps: [
          "Total \\(6.0\\ \\text{k}\\Omega\\), so \\(I = 12 / 6000 = 2.0 \\times 10^{-3}\\ \\text{A} = 2.0\\ \\text{mA}\\).",
          "\\(V_1 = 2.0\\ \\text{mA} \\times 2.0\\ \\text{k}\\Omega = 4.0\\ \\text{V}\\); \\(V_2 = 2.0\\ \\text{mA} \\times 4.0\\ \\text{k}\\Omega = 8.0\\ \\text{V}\\).",
          "Loop rule check: \\(4.0 + 8.0 = 12\\ \\text{V}\\). The larger resistor takes the larger share.",
        ],
        answer: "2.0 mA; 4.0 V and 8.0 V",
      },
      selfCheckExample: {
        prompt:
          "Resistors of 1.0 kΩ, 2.0 kΩ and 3.0 kΩ are connected in series across a 12 V battery with no internal resistance. What does an ideal voltmeter read when connected across the 2.0 kΩ resistor?",
        options: ["4.0 V", "6.0 V", "2.0 V", "8.0 V", "12 V"],
        steps: [
          "Total \\(6.0\\ \\text{k}\\Omega\\), current \\(12/6000 = 2.0\\ \\text{mA}\\).",
          "Across 2.0 kΩ: \\(2.0\\ \\text{mA} \\times 2.0\\ \\text{k}\\Omega = 4.0\\ \\text{V}\\). Or by share: \\(12 \\times 2/6 = 4.0\\ \\text{V}\\).",
          "C is the p.d. across the 1.0 kΩ, D across the other two together. B splits the voltage in half, E gives the whole supply.",
        ],
        answer: "(A) 4.0 V",
      },
      practiceSet: [
        { prompt: "3.0 A flows into a junction; one branch leaving it carries 1.2 A. What does the other branch carry?", answer: "1.8 A", method: "Junction rule" },
        { prompt: "Two lamps are in parallel across a 6.0 V supply. What is the p.d. across each?", answer: "6.0 V", method: "Parallel branches share the same p.d." },
        { prompt: "What is the resistance of an ideal voltmeter?", answer: "Infinite", method: "It must draw no current from the circuit" },
      ],
      traps: [
        {
          title: "Meters in the wrong place",
          body: "An ammeter in parallel with a component short-circuits it, because the ammeter has almost no resistance. A voltmeter placed in series stops the current almost completely and reads close to the full supply voltage. Read each meter's position before using its reading.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ele-emf",
      name: "EMF and internal resistance of a battery",
      intuition:
        "A battery is not a perfect voltage source. Its chemicals have some resistance of their own, so when current flows, some of the battery's energy is spent inside it. The more current you draw, the more voltage is lost inside and the less reaches the outside circuit.",
      definition:
        "- The **e.m.f.** \\(\\varepsilon\\) is the energy the battery gives each coulomb, in volts. Despite its name it is not a force.\n" +
        "- The **internal resistance** \\(r\\) acts like a small resistor in series inside the battery.\n" +
        "- The **terminal p.d.** (what reaches the circuit) is \\(V = \\varepsilon - Ir\\). The \\(Ir\\) part is the \"lost volts\".\n" +
        "- With no current (an open switch, or an ideal voltmeter alone), \\(V = \\varepsilon\\).\n" +
        "- A **short circuit** (\\(R = 0\\)) draws the largest possible current, \\(I = \\varepsilon / r\\).",
      formula: {
        label: "EMF and internal resistance",
        latex: "\\varepsilon = I(R + r) \\qquad V = \\varepsilon - I r",
        symbols: [
          { symbol: "\\(\\varepsilon\\)", meaning: "e.m.f. of the battery, in V" },
          { symbol: "\\(R\\)", meaning: "external (load) resistance, in Ω" },
          { symbol: "\\(r\\)", meaning: "internal resistance, in Ω" },
          { symbol: "\\(V\\)", meaning: "terminal p.d., in V" },
        ],
      },
      authoredExample: {
        prompt:
          "A battery of e.m.f. 12 V and internal resistance 0.50 Ω is connected to a 5.5 Ω resistor. Find the current, the terminal p.d. and the lost volts.",
        steps: [
          "\\(I = \\varepsilon/(R + r) = 12 / (5.5 + 0.50) = 12/6.0 = 2.0\\ \\text{A}\\).",
          "Lost volts: \\(Ir = 2.0 \\times 0.50 = 1.0\\ \\text{V}\\).",
          "Terminal p.d.: \\(12 - 1.0 = 11\\ \\text{V}\\) (check: \\(IR = 2.0 \\times 5.5 = 11\\ \\text{V}\\)).",
        ],
        answer: "2.0 A; 11 V; 1.0 V",
      },
      selfCheckExample: {
        prompt:
          "A cell of e.m.f. 1.5 V is connected to a 2.5 Ω resistor, and the p.d. across the resistor is 1.25 V. What is the internal resistance of the cell?",
        options: ["0.25 Ω", "3.0 Ω", "2.5 Ω", "0.50 Ω", "0.10 Ω"],
        steps: [
          "Current: \\(I = 1.25 / 2.5 = 0.50\\ \\text{A}\\).",
          "Lost volts: \\(1.5 - 1.25 = 0.25\\ \\text{V}\\), so \\(r = 0.25 / 0.50 = 0.50\\ \\Omega\\).",
          "A writes the lost volts as a resistance. B is the total resistance \\(R + r\\). E divides the lost volts by \\(R\\) instead of by \\(I\\).",
        ],
        answer: "(D) 0.50 Ω",
      },
      practiceSet: [
        { prompt: "A 9.0 V battery has internal resistance 1.5 Ω. What current flows if it is short-circuited?", answer: "6.0 A", method: "\\(\\varepsilon / r\\)" },
        { prompt: "A battery of e.m.f. 6.0 V and internal resistance 1.0 Ω drives a 2.0 Ω resistor. Current and terminal p.d.?", answer: "2.0 A; 4.0 V", method: "\\(6.0/3.0\\), then \\(2.0 \\times 2.0\\)" },
        { prompt: "An ideal voltmeter is connected directly across a battery, with nothing else attached. What does it read?", answer: "The e.m.f.", method: "No current, so no lost volts" },
      ],
      traps: [
        {
          title: "Terminal p.d. is less than the e.m.f. when current flows",
          body: "The e.m.f. is reached only when no current flows. Draw a current and the battery loses \\(Ir\\) inside itself, so the voltage across the circuit falls. The bigger the current (the smaller the load resistance), the bigger the drop.",
        },
      ],
    },
  ],
};

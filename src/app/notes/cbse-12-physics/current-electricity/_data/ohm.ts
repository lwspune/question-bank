import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_CE_OHM_NOTE: SubtopicNote = {
  subtopicName: "Electric Current and Ohm's Law",
  title: "Electric Current, Resistance and Ohm's Law",
  oneLineDefinition:
    "Current as charge per second, Ohm's law V = RI with R = ρl/A, how stretching a wire changes its resistance, and the three ways a material can fail to obey Ohm's law.",
  whyItMatters:
    "15 questions, fourteen of them from board papers from 2023 to 2026. The board asks you to find a current from a count of electrons (2023) or from an orbiting electron (2026), find the charge carried by a changing current (2023), work out how stretching changes a resistance (2024, 2025), show that E = ρj leads to Ohm's law (2025) and mark the negative resistance and Ohm's law regions on a GaAs graph (2024). The textbook adds a resistivity found from a measured resistance.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpce-current",
      name: "Electric current and the charge it carries",
      intuition:
        "Current tells you how much charge crosses a section of a wire every second. In a metal that charge is carried by electrons, each with a charge of only 1.6 × 10⁻¹⁹ C, so even a small current means a huge number of electrons crossing every second. If the current changes with time, you cannot just multiply current by time: add up the charge bit by bit, which is the area under the current against time graph.",
      definition:
        "- **Steady current:** \\(I = \\dfrac{q}{t}\\), the net charge crossing a section per unit time. Its SI unit is the **ampere** (A).\n" +
        "- **Changing current:** the current at an instant is \\(I = \\lim_{\\Delta t \\to 0} \\dfrac{\\Delta Q}{\\Delta t}\\), so the charge in a time interval is the area under the \\(I\\) against \\(t\\) graph.\n" +
        "- Charge carried by \\(N\\) electrons: \\(q = Ne\\), with \\(e = 1.6 \\times 10^{-19}\\) C. So \\(N = \\dfrac{It}{e}\\).\n" +
        "- A charge going round a circle \\(n\\) times a second crosses any point \\(n\\) times a second, so it is a current \\(I = ne\\).\n" +
        "- Current is a **scalar**: currents meeting at a junction add as plain numbers. The arrow on a wire only shows the sense of flow.\n" +
        "- When the current density \\(j\\) is not the same across a section, add up \\(j\\) times the area of each thin ring.",
      formula: {
        label: "Current and charge",
        latex: "I = \\frac{q}{t} = \\frac{Ne}{t}",
        symbols: [
          { symbol: "\\(I\\)", meaning: "current, in ampere" },
          { symbol: "\\(q\\)", meaning: "charge crossing the section in time t, in coulomb" },
          { symbol: "\\(N\\)", meaning: "number of electrons crossing" },
          { symbol: "\\(e\\)", meaning: "charge of one electron, 1.6 × 10⁻¹⁹ C" },
        ],
      },
      authoredExample: {
        prompt:
          "A steady current of 3.2 A flows through a wire. How many electrons cross a cross-section of the wire in 5 s? Take \\(e = 1.6 \\times 10^{-19}\\) C.",
        steps: [
          "Given: \\(I = 3.2\\) A, \\(t = 5\\) s, \\(e = 1.6 \\times 10^{-19}\\) C.",
          "Formula: \\(q = It\\) and \\(N = \\dfrac{q}{e}\\).",
          "Charge: \\(q = 3.2 \\times 5 = 16\\) C.",
          "Number of electrons: \\(N = \\dfrac{16}{1.6 \\times 10^{-19}} = 1.0 \\times 10^{20}\\).",
        ],
        answer: "1.0 × 10²⁰ electrons",
      },
      selfCheckExample: {
        prompt: "2.5 × 10¹⁸ electrons pass a section of a wire every second. Find the current.",
        steps: ["\\(I = \\dfrac{Ne}{t} = 2.5 \\times 10^{18} \\times 1.6 \\times 10^{-19}\\) A."],
        answer: "0.40 A",
      },
      practiceSet: [
        {
          prompt: "The charge through a wire varies as \\(q = 4t^2\\) coulomb, with t in seconds. Find the current at \\(t = 2\\) s.",
          answer: "\\(I = \\dfrac{dq}{dt} = 8t = 16\\) A",
        },
        {
          prompt: "An electron goes round a circular orbit 6.0 × 10¹⁵ times per second. Find the equivalent current.",
          answer: "\\(I = ne = 6.0 \\times 10^{15} \\times 1.6 \\times 10^{-19} = 9.6 \\times 10^{-4}\\) A",
        },
        {
          prompt: "Two currents of 2 A and 3 A flow into a junction along wires at right angles to each other. What current flows out along the only other wire?",
          answer: "5 A. Current is a scalar, so currents at a junction add as numbers whatever the angle between the wires",
        },
      ],
      pyqExampleId: "e58b9769-dccd-4f62-80fa-6cf09f2b2984",
      traps: [
        {
          title: "Leaving the current in milliamperes",
          body: "Convert milliamperes to amperes before you multiply by the time: 1 mA is \\(10^{-3}\\) A. Using the milliampere number as it is makes the electron count a thousand times too big.",
        },
        {
          title: "Using q = It for a current that changes",
          body: "\\(q = It\\) holds only for a steady current. When I changes with time, find the area under the \\(I\\) against \\(t\\) graph (a triangle for \\(I \\propto t\\)), or integrate \\(I\\,dt\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpce-resistance",
      name: "Ohm's law, resistance and stretching a wire",
      intuition:
        "Push harder and more current flows: for a metal wire the current is proportional to the potential difference, and the ratio V/I is its resistance. A longer wire resists more and a thicker one less, so R grows with length and falls with area. When you stretch a wire, the metal is the same and so is its volume: it gets longer and thinner at the same time, and both changes raise the resistance.",
      definition:
        "- **Ohm's law:** the potential difference across a conductor is proportional to the current through it, \\(V \\propto I\\), so \\(V = RI\\). R is the **resistance**, unit ohm (Ω).\n" +
        "- \\(R = \\dfrac{\\rho l}{A}\\): R is proportional to the length \\(l\\) and inversely proportional to the area of cross-section \\(A\\). The **resistivity** \\(\\rho\\) depends on the material, not on its size or shape.\n" +
        "- **From \\(E = \\rho j\\) to Ohm's law:** for a uniform conductor \\(E = \\dfrac{V}{l}\\) and \\(j = \\dfrac{I}{A}\\).\n" +
        "- So \\(\\dfrac{V}{l} = \\rho\\dfrac{I}{A}\\), which gives \\(V = I\\left(\\dfrac{\\rho l}{A}\\right) = IR\\).\n" +
        "- **Stretching a wire:** the volume \\(Al\\) stays the same. Stretched to n times its length, the area becomes \\(A/n\\), so \\(R' = n^2R\\).\n" +
        "- **Measuring R:** the voltmeter goes in parallel across the resistor and the ammeter in series with it; a rheostat changes the current. Then \\(R = V/I\\).",
      formula: {
        label: "Resistance of a wire",
        latex: "V = RI, \\qquad R = \\frac{\\rho l}{A}",
        symbols: [
          { symbol: "\\(\\rho\\)", meaning: "resistivity of the material, in ohm metre" },
          { symbol: "\\(l\\)", meaning: "length of the wire" },
          { symbol: "\\(A\\)", meaning: "area of cross-section" },
        ],
      },
      authoredExample: {
        prompt:
          "A wire 2.0 m long with an area of cross-section of 0.50 mm² has a resistance of 4.0 Ω. (i) Find the resistivity of its material. (ii) The wire is cut into two equal halves, which are joined in parallel. Find the resistance of the pair.",
        steps: [
          "Given: \\(l = 2.0\\) m, \\(A = 0.50\\ \\text{mm}^2 = 0.50 \\times 10^{-6}\\ \\text{m}^2\\), \\(R = 4.0\\ \\Omega\\).",
          "(i) Formula: \\(\\rho = \\dfrac{RA}{l} = \\dfrac{4.0 \\times 0.50 \\times 10^{-6}}{2.0} = 1.0 \\times 10^{-6}\\ \\Omega\\,\\text{m}\\).",
          "(ii) Each half has half the length and the same area, so \\(R_{half} = \\dfrac{4.0}{2} = 2.0\\ \\Omega\\).",
          "Two 2.0 Ω in parallel: \\(R_p = \\dfrac{2.0 \\times 2.0}{2.0 + 2.0} = 1.0\\ \\Omega\\).",
        ],
        answer: "ρ = 1.0 × 10⁻⁶ Ω m; 1.0 Ω for the pair",
      },
      selfCheckExample: {
        prompt: "Two wires of the same material have lengths in the ratio 1 : 2 and radii in the ratio 2 : 1. Find the ratio of their resistances.",
        steps: ["\\(R \\propto \\dfrac{l}{r^2}\\), so \\(\\dfrac{R_1}{R_2} = \\dfrac{1}{2} \\times \\left(\\dfrac{1}{2}\\right)^2 = \\dfrac{1}{8}\\)."],
        answer: "1 : 8",
      },
      practiceSet: [
        {
          prompt: "A wire has a resistance of 10 Ω. Find the resistance of a wire of the same material that is twice as long and has twice the radius.",
          answer: "\\(R \\propto l/r^2\\), so \\(R = 10 \\times \\dfrac{2}{4} = 5\\ \\Omega\\)",
        },
        {
          prompt: "Two wires of the same material and radius, 1 m and 4 m long, are joined in parallel to a battery that supplies 10 A. Find the current in the shorter wire.",
          answer: "The resistances are 1 : 4, so the currents are 4 : 1. The shorter wire carries 8 A",
        },
        {
          prompt: "When finding an unknown resistance from voltmeter and ammeter readings, how is each meter connected?",
          answer: "The voltmeter in parallel across the resistor, the ammeter in series with it",
        },
      ],
      pyqExampleId: "4c66752d-0e6d-4796-b8f4-71b7576c43f2",
      traps: [
        {
          title: "Forgetting that stretching thins the wire",
          body: "Taking \\(R \\propto l\\) alone gives the wrong answer for a stretched wire. The area falls as the length rises, so \\(R \\propto l^2\\): double the length and R becomes four times, not two.",
        },
        {
          title: "Thinking resistivity changes with the shape",
          body: "Cutting, stretching or bending a wire changes its resistance, not its resistivity. \\(\\rho\\) changes only with the material and its temperature.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpce-ohm-limits",
      name: "Where Ohm's law fails",
      intuition:
        "Ohm's law is not a law of nature that every material obeys. It says the graph of V against I is a straight line through the origin. Many materials and devices give a curve instead, and some of them are very useful in electronics. Learn the three ways the straight line can fail, each with its example.",
      definition:
        "- \\(E = \\rho j\\) (or \\(j = \\sigma E\\)) is Ohm's law written for a point inside the conductor, with \\(\\sigma = 1/\\rho\\) the **conductivity**.\n" +
        "- A material obeys Ohm's law when V is proportional to I. The deviations are of three kinds, listed below.\n" +
        "- \\(V = IR\\) can be used to define R for any conductor. Ohm's law is the statement that this R stays the same as V and I change.",
      table: {
        columns: ["Deviation", "What the graph shows", "Example"],
        rows: [
          {
            cells: [
              "V stops being proportional to I",
              "The V against I graph bends away from a straight line",
              "A good conductor over a wide range of current",
            ],
            pyqExampleId: "3c06760e-b146-45ec-8b59-11f595ad3794",
            noteAmber: "Board 2025 asked you to show that E = ρj leads to Ohm's law and to give one condition in which it is not valid.",
          },
          {
            cells: [
              "The relation depends on the sign of V",
              "Reversing V does not give the same size of current in the other direction",
              "A diode",
            ],
          },
          {
            cells: [
              "V is not unique for a given I",
              "The current rises, falls, then rises again, so one current has more than one voltage",
              "GaAs (gallium arsenide)",
            ],
            pyqExampleId: "3bc1c332-8201-4e95-a2c7-93a7ef1eb02a",
            noteAmber: "Board 2024 asked you to plot I against V for GaAs and mark where the resistance is negative and where Ohm's law holds.",
          },
        ],
      },
      practiceSet: [
        { prompt: "Name a material for which one value of current can go with more than one value of voltage.", answer: "GaAs (gallium arsenide)" },
        { prompt: "Name a device for which the relation between V and I depends on the sign of V.", answer: "A diode" },
        {
          prompt: "Why is V = IR, written on its own, not a statement of Ohm's law?",
          answer: "It only defines R. Ohm's law says that R stays the same as V and I change, so that V is proportional to I",
        },
      ],
      traps: [
        {
          title: "Calling V = IR the statement of Ohm's law",
          body: "\\(V = IR\\) only defines resistance, and it can be written for any conductor. The law is that R stays constant, so that the V against I graph is a straight line through the origin. The board has asked you to explain exactly this.",
        },
        {
          title: "A graph without labelled axes",
          body: "A plot asked for carries marks for the axes (current and voltage, with units) and for marking the regions asked about. An unlabelled curve loses them.",
        },
      ],
    },
  ],
};

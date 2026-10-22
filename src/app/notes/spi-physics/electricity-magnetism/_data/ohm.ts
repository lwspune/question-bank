import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_EM_OHM_NOTE: SubtopicNote = {
  subtopicName: "Ohm's Law and Resistance",
  title: "Ohm's Law and Resistance",
  oneLineDefinition:
    "The current through a metal wire is proportional to the voltage across it, so V = IR, and the wire's resistance R depends on its length, its thickness and what it is made of.",
  whyItMatters:
    "Five questions in the bank, three EASY and two MODERATE. Three are one line of V = IR, one reads a V against I graph, and one asks which metal resists current the most. The marks go on dividing the wrong way round and on forgetting that Ohm's law needs a steady temperature.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiemoh-current",
      name: "Current, charge and potential difference",
      intuition:
        "An electric **current** is charge on the move, like water flowing in a pipe. The **potential difference** is the push that drives it: the work done to move each coulomb of charge from one point to the other.",
      definition:
        "- **Current** \\(I = \\dfrac{Q}{t}\\): charge passing a point each second. Unit: ampere (A). \\(1\\text{ mA} = 0.001\\text{ A}\\).\n" +
        "- **Potential difference** \\(V = \\dfrac{W}{Q}\\): work done per coulomb. Unit: volt (V).\n" +
        "- Charge is measured in coulombs (C).\n" +
        "- An **ammeter** goes in series with the part it measures; a **voltmeter** goes in parallel across it.",
      formula: {
        label: "Current and potential difference",
        latex: "I = \\frac{Q}{t} \\qquad V = \\frac{W}{Q}",
        symbols: [
          { symbol: "Q", meaning: "charge, in coulombs" },
          { symbol: "t", meaning: "time, in seconds" },
          { symbol: "W", meaning: "work done, in joules" },
        ],
      },
      authoredExample: {
        prompt: "A charge of 30 C flows through a lamp in one minute. Find the current.",
        steps: ["One minute is 60 s.", "\\(I = \\frac{Q}{t} = \\frac{30}{60} = 0.5\\) A."],
        answer: "0.5 A",
      },
      selfCheckExample: {
        prompt: "12 J of work is done in moving 4 C of charge between two points. Find the potential difference.",
        steps: ["\\(V = \\frac{W}{Q} = \\frac{12}{4} = 3\\) V."],
        answer: "3 V",
      },
      practiceSet: [
        { prompt: "A current of 2 A flows for 10 s. How much charge passes?", answer: "\\(Q = It = 20\\) C" },
        { prompt: "Write 250 mA in amperes.", answer: "0.25 A" },
        { prompt: "How is an ammeter connected in a circuit?", answer: "In series with the part whose current it measures" },
        { prompt: "How is a voltmeter connected in a circuit?", answer: "In parallel, across the part" },
      ],
      traps: [
        {
          title: "Time in minutes",
          body: "Current is coulombs per SECOND. 30 C in one minute is \\(\\frac{30}{60} = 0.5\\) A, not 30 A.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiemoh-ohm",
      name: "Ohm's law: V = IR",
      intuition:
        "Double the push across a metal wire and twice as much current flows. The fixed ratio of voltage to current is the wire's **resistance**: how hard it is for current to get through.",
      definition:
        "- **Ohm's law:** at constant temperature, the current through a metal conductor is proportional to the potential difference across it.\n" +
        "- So \\(V = IR\\), and the same rule rearranged gives \\(I = \\dfrac{V}{R}\\) and \\(R = \\dfrac{V}{I}\\).\n" +
        "- Resistance is measured in ohms (\\(\\Omega\\)): \\(1\\,\\Omega = 1\\text{ V per A}\\).\n" +
        "- A graph of V against I is a **straight line through the origin**, and its slope is R. The ratio V/I is the same at every point.\n" +
        "- If the temperature changes (a glowing filament), R changes and the graph bends: the law no longer holds.",
      formula: {
        label: "Ohm's law",
        latex: "V = IR \\qquad I = \\frac{V}{R} \\qquad R = \\frac{V}{I}",
      },
      authoredExample: {
        prompt: "A current of 0.5 A flows through a 12 \\(\\Omega\\) resistor. Find the potential difference across it.",
        steps: ["\\(V = IR = 0.5 \\times 12 = 6\\) V."],
        answer: "6 V",
      },
      selfCheckExample: {
        prompt: "A 9 V battery is connected across a 6 \\(\\Omega\\) resistor. Find the current.",
        steps: ["\\(I = \\frac{V}{R} = \\frac{9}{6} = 1.5\\) A."],
        answer: "1.5 A",
      },
      practiceSet: [
        { prompt: "A 12 V supply drives 3 A through a heater coil. What is its resistance?", answer: "\\(R = \\frac{12}{3} = 4\\,\\Omega\\)" },
        { prompt: "A current of 0.2 A flows through a 50 \\(\\Omega\\) resistor. What is the potential difference across it?", answer: "10 V" },
        { prompt: "A V against I graph for a wire passes through 0.5 A at 2 V. What is the wire's resistance?", answer: "\\(\\frac{2}{0.5} = 4\\,\\Omega\\)" },
        { prompt: "Under what condition does Ohm's law hold for a metal wire?", answer: "Its temperature stays constant" },
      ],
      pyqExampleId: "0a173f78-ecd5-43b5-a8ad-55115852021d",
      traps: [
        {
          title: "Dividing the wrong way round",
          body: "Resistance is \\(R = \\frac{V}{I}\\). For 6 V and 4 A that is 1.5 \\(\\Omega\\); \\(\\frac{I}{V} = \\frac{4}{6}\\) is not a resistance at all.",
        },
        {
          title: "Thinking V/I changes along a straight-line graph",
          body: "A straight line through the origin means V/I is the SAME at every point. That is what Ohm's law says, so the conductor is ohmic.",
        },
        {
          title: "Leaving out the temperature condition",
          body: "Ohm's law holds for a metal only while its temperature stays constant. A hot filament's resistance rises, so its V against I graph curves.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiemoh-resistivity",
      name: "What a wire's resistance depends on",
      intuition:
        "A longer wire is a longer obstacle course, so it resists more. A thicker wire gives the current more room, so it resists less. And some metals let current through far more easily than others.",
      definition:
        "- \\(R = \\rho \\dfrac{L}{A}\\): resistance is **proportional to length** and **inversely proportional to cross-section area**.\n" +
        "- \\(\\rho\\) (rho) is the **resistivity**. It depends only on the material and the temperature, not on the wire's size. Unit: ohm metre (\\(\\Omega\\,\\text{m}\\)).\n" +
        "- Best conductors (lowest resistivity): silver, then copper, then aluminium. Copper and aluminium carry current in house wiring.\n" +
        "- **Tungsten** has a much higher resistivity and melts at about \\(3400^\\circ\\text{C}\\), so it makes bulb filaments.\n" +
        "- **Nichrome** (an alloy) has a high resistivity and does not burn easily when red hot, so it makes heater elements.",
      formula: {
        label: "Resistance of a wire",
        latex: "R = \\rho \\frac{L}{A}",
        symbols: [
          { symbol: "ρ", meaning: "resistivity of the material" },
          { symbol: "L", meaning: "length of the wire" },
          { symbol: "A", meaning: "area of cross-section" },
        ],
      },
      authoredExample: {
        prompt: "A copper wire 2 m long has a resistance of 4 \\(\\Omega\\). What is the resistance of a 5 m wire of the same copper and the same thickness?",
        steps: [
          "Same material and thickness, so R is proportional to length.",
          "Resistance per metre \\(= \\frac{4}{2} = 2\\,\\Omega\\).",
          "For 5 m: \\(5 \\times 2 = 10\\,\\Omega\\).",
        ],
        answer: "10 \\(\\Omega\\)",
      },
      selfCheckExample: {
        prompt: "A wire has a resistance of 8 \\(\\Omega\\). Another wire of the same metal and length has twice the area of cross-section. Find its resistance.",
        steps: ["R is inversely proportional to area.", "Twice the area gives half the resistance: \\(\\frac{8}{2} = 4\\,\\Omega\\)."],
        answer: "4 \\(\\Omega\\)",
      },
      practiceSet: [
        { prompt: "Which material is used for the element of an electric heater?", answer: "Nichrome" },
        { prompt: "Which metal is used for the filament of a bulb?", answer: "Tungsten" },
        { prompt: "A wire's length is halved, keeping its thickness. What happens to its resistance?", answer: "It is halved" },
        { prompt: "Which is the best conductor: silver, copper or aluminium?", answer: "Silver" },
        { prompt: "What is the SI unit of resistivity?", answer: "Ohm metre" },
      ],
      pyqExampleId: "0121cf5a-3576-407e-b3a5-9fa33bb29143",
      traps: [
        {
          title: "Mixing resistance with resistivity",
          body: "Cutting or stretching a wire changes its resistance, but its resistivity stays the same: resistivity belongs to the material, not the wire.",
        },
        {
          title: "Thicker means more resistance",
          body: "It is the other way round. Doubling the area of cross-section halves the resistance, because the current has more room.",
        },
      ],
    },
  ],
};

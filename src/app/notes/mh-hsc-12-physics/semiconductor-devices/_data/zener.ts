import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_SD_ZENER_NOTE: SubtopicNote = {
  subtopicName: "Zener Diode",
  title: "The Zener Diode and the Voltage Regulator",
  oneLineDefinition:
    "Why a heavily doped diode breaks down at a low reverse voltage without damage, how its I-V characteristic holds the voltage at VZ, and how it keeps the voltage across a load constant.",
  whyItMatters:
    "7 questions. Two were set in board papers: what a Zener diode is and how it is used as a voltage regulator (2018), and what voltage regulation is, with the working of the Zener regulator (2024). The textbook adds the forward and reverse characteristic, how a Zener differs from an ordinary diode, why a series resistance is used and a worked design of a 5 V supply.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpsd-zener-diode",
      name: "Zener breakdown and the Zener characteristic",
      intuition:
        "Dope a diode very heavily and its depletion layer becomes very thin. Then even a small reverse voltage sets up a huge electric field across it, about 3 × 10⁷ V/m, strong enough to pull electrons out of their covalent bonds. Suddenly there are many free carriers and the reverse current shoots up. The useful part: from then on the voltage across the diode hardly changes, however much the current changes.",
      definition:
        "- **Zener breakdown:** as the reverse voltage rises, the field across the junction rises; the strong field breaks covalent bonds at the junction and frees electrons, so the reverse current increases sharply. It happens in heavily doped diodes, whose depletion layer is narrow, and it **does not damage** the diode.\n" +
        "- **Zener diode:** a p-n junction diode designed to work in the breakdown region. It is used as a voltage regulator or voltage stabiliser.\n" +
        "- **Zener voltage \\(V_Z\\)** depends on the doping: heavier doping gives a thinner depletion layer and a lower \\(V_Z\\). Diodes with \\(V_Z\\) below about 6 V work mainly by Zener breakdown, those above 6 V mainly by avalanche breakdown, but both are called Zener diodes.\n" +
        "- **Forward characteristic:** like that of an ordinary diode.\n" +
        "- **Reverse characteristic:** a very small reverse current until \\(V_Z\\); at \\(V_Z\\) the current rises suddenly, and the voltage stays constant at \\(V_Z\\) as the current increases. Draw the forward branch in the first quadrant and the reverse branch, with its nearly vertical part at \\(V_Z\\), in the third.",
      table: {
        columns: ["Point", "Zener diode", "Ordinary diode"],
        rows: [
          {
            cells: ["Doping", "Heavily doped, so the depletion layer is thin", "Lightly doped, so the depletion layer is wider"],
            pyqExampleId: "98d41b79-db3b-49de-b236-237a91579549",
            noteAmber: "The textbook asks how a Zener diode differs from an ordinary diode.",
          },
          { cells: ["Breakdown voltage", "Low", "Higher"] },
          { cells: ["Region it is used in", "Reverse bias, in the breakdown region", "Forward bias, for example in a rectifier"] },
          { cells: ["Effect of breakdown", "Does not damage the diode", "The reverse current rises sharply; it is not meant to work there"] },
          { cells: ["Main use", "Voltage regulator, fixed reference voltage", "Rectifier"] },
        ],
      },
      practiceSet: [
        { prompt: "Name the breakdown that takes place at a low reverse voltage in a heavily doped diode.", answer: "Zener breakdown" },
        { prompt: "How does the Zener voltage change when the doping of the diode is increased?", answer: "It decreases" },
        { prompt: "How does a Zener diode behave when it is forward biased?", answer: "Like an ordinary p-n junction diode" },
      ],
      traps: [
        {
          title: "Saying breakdown destroys a Zener diode",
          body: "Zener breakdown does not damage the diode. The diode is meant to work in breakdown, as long as a series resistance keeps the current within its rating.",
        },
        {
          title: "Drawing only half the characteristic",
          body: "'Explain the forward and the reverse characteristic' needs both branches on one graph: the forward branch like a normal diode, and the reverse branch turning sharply at \\(V_Z\\). Label \\(V_Z\\) on the axis.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsd-zener-regulator",
      name: "The Zener diode as a voltage regulator",
      intuition:
        "Put the Zener in reverse bias across the load, with a resistance in series with the supply. The Zener acts like a reservoir: it takes whatever current the load does not need, while the series resistance soaks up whatever voltage is left over. Since the voltage across the Zener stays at VZ, so does the voltage across the load.",
      definition:
        "- **Voltage regulator:** a circuit that keeps the voltage across a load constant in spite of changes in the input voltage and in the load current.\n" +
        "- **Circuit:** a Zener diode of breakdown voltage \\(V_Z\\) is joined in **reverse bias** to an input \\(V_{in}\\) (\\(V_{in} > V_Z\\)) through a series resistance \\(R_S\\), which limits the current. The load \\(R_L\\) is joined **in parallel** with the Zener, so \\(V_O = V_Z\\).\n" +
        "- **(a) Input voltage rises:** the current through \\(R_S\\) and the Zener rises, so the drop across \\(R_S\\) rises. The voltage across the Zener does not change, so the output stays constant.\n" +
        "- **(b) Load resistance falls (load current rises):** the extra load current cannot come from the source, because the drop across \\(R_S\\) does not change. It comes from a fall in the Zener current \\(I_Z\\). The output stays constant.\n" +
        "- **(c) No load:** the load current is zero and all the current passes through the Zener, so it dissipates the most power. \\(R_S\\) is chosen so that the power rating is not exceeded.\n" +
        "- Hence a regulated output \\(V_O = V_Z\\) is obtained whenever the input stays between a minimum and a maximum value.",
      formula: {
        label: "Zener regulator",
        latex: "V_O = V_Z, \\qquad I_S = \\frac{V_{in} - V_Z}{R_S}, \\qquad I_S = I_Z + I_L",
        symbols: [
          { symbol: "\\(I_S\\)", meaning: "current through the series resistance" },
          { symbol: "\\(I_Z\\)", meaning: "current through the Zener diode" },
          { symbol: "\\(I_L\\)", meaning: "current through the load" },
        ],
      },
      authoredExample: {
        prompt:
          "A Zener diode with \\(V_Z = 6\\) V is joined through a series resistance of 100 Ω to an unregulated 10 V supply, and a load of 300 Ω is joined across the diode. Find the current through the series resistance, the load current and the Zener current.",
        steps: [
          "Given: \\(V_{in} = 10\\) V, \\(V_Z = 6\\) V, \\(R_S = 100\\ \\Omega\\), \\(R_L = 300\\ \\Omega\\).",
          "\\(I_S = \\dfrac{V_{in} - V_Z}{R_S} = \\dfrac{10 - 6}{100} = 0.04\\) A \\(= 40\\) mA.",
          "\\(I_L = \\dfrac{V_Z}{R_L} = \\dfrac{6}{300} = 0.02\\) A \\(= 20\\) mA.",
          "\\(I_Z = I_S - I_L = 40 - 20 = 20\\) mA. The load voltage is 6 V.",
        ],
        answer: "40 mA through the series resistance, 20 mA through the load, 20 mA through the Zener",
      },
      selfCheckExample: {
        prompt:
          "A Zener regulator has \\(V_Z = 6\\) V, \\(R_S = 100\\ \\Omega\\) and a load drawing a steady 20 mA. The input rises from 10 V to 12 V. Find the Zener current before and after the rise.",
        steps: [
          "Before: \\(I_S = (10 - 6)/100 = 40\\) mA, so \\(I_Z = 40 - 20 = 20\\) mA.",
          "After: \\(I_S = (12 - 6)/100 = 60\\) mA, so \\(I_Z = 60 - 20 = 40\\) mA. The output stays at 6 V.",
        ],
        answer: "20 mA before, 40 mA after",
      },
      practiceSet: [
        { prompt: "In a Zener regulator, is the load joined in series or in parallel with the Zener diode?", answer: "In parallel" },
        { prompt: "In a Zener regulator, is the Zener diode forward biased or reverse biased?", answer: "Reverse biased" },
        { prompt: "The load current of a Zener regulator rises by 5 mA while the input stays the same. What happens to the Zener current?", answer: "It falls by 5 mA" },
      ],
      pyqExampleId: "908accbe-495b-4ad4-864b-a7b1d6815c3c",
      traps: [
        {
          title: "Explaining only one case",
          body: "A regulator holds the output steady against BOTH a change in the input voltage and a change in the load current. Explaining only the input change earns half the working marks.",
        },
        {
          title: "Drawing the Zener forward biased",
          body: "In the regulator circuit the Zener's cathode goes to the positive side of the supply, so that it is reverse biased. Drawn the other way it conducts like a normal diode and regulates nothing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsd-zener-design",
      name: "Designing a Zener regulator",
      intuition:
        "The worst moment for a Zener is when no load is connected, because then the whole current from the supply goes through it. So the power rating fixes the largest safe Zener current, and that current fixes the smallest series resistance you may use.",
      definition:
        "- **Maximum power rating:** \\(P_Z = I_{Z(\\max)} V_Z\\), so \\(I_{Z(\\max)} = P_Z / V_Z\\).\n" +
        "- **Minimum series resistance:** \\(R_S = \\dfrac{V_S - V_Z}{I_{Z(\\max)}}\\). A smaller \\(R_S\\) would let too large a current through the Zener at no load.\n" +
        "- **Load current:** \\(I_L = V_Z / R_L\\). **Zener current with the load:** \\(I_Z = I_S - I_L\\).\n" +
        "- Stabilisation needs a minimum Zener current, and the supply voltage \\(V_S\\) must be greater than \\(V_Z\\).\n" +
        "- **Applications (textbook):** voltage regulator, fixed reference voltage in transistor biasing circuits, peak clipper or limiter, protection of meters against accidental fluctuations.",
      formula: {
        label: "Design equations",
        latex: "I_{Z(\\max)} = \\frac{P_Z}{V_Z}, \\qquad R_S = \\frac{V_S - V_Z}{I_{Z(\\max)}}, \\qquad I_L = \\frac{V_Z}{R_L}",
      },
      authoredExample: {
        prompt:
          "A 9 V stabilised supply is to be built from a 15 V DC source with a Zener diode of power rating 1.8 W. Find the maximum Zener current, the minimum series resistance, the load current for a 900 Ω load, and the Zener current with that load.",
        steps: [
          "Given: \\(V_S = 15\\) V, \\(V_Z = 9\\) V, \\(P_Z = 1.8\\) W, \\(R_L = 900\\ \\Omega\\).",
          "\\(I_{Z(\\max)} = \\dfrac{P_Z}{V_Z} = \\dfrac{1.8}{9} = 0.2\\) A \\(= 200\\) mA.",
          "\\(R_S = \\dfrac{V_S - V_Z}{I_{Z(\\max)}} = \\dfrac{15 - 9}{0.2} = 30\\ \\Omega\\).",
          "\\(I_L = \\dfrac{V_Z}{R_L} = \\dfrac{9}{900} = 0.01\\) A \\(= 10\\) mA.",
          "\\(I_Z = I_S - I_L = 200 - 10 = 190\\) mA.",
        ],
        answer: "200 mA; 30 Ω; 10 mA; 190 mA",
      },
      selfCheckExample: {
        prompt: "A 12 V Zener diode can safely carry at most 50 mA. Find its power rating.",
        steps: ["\\(P_Z = I_{Z(\\max)} V_Z = 0.05 \\times 12\\)."],
        answer: "0.6 W",
      },
      practiceSet: [
        { prompt: "A 5 V Zener diode has a 500 Ω load across it. Find the load current.", answer: "10 mA" },
        { prompt: "A Zener diode rated 1 W works at 10 V. Find the largest current it can carry safely.", answer: "0.1 A (100 mA)" },
        { prompt: "Name two uses of a Zener diode other than a voltage regulator.", answer: "Any two: fixed reference voltage in transistor biasing, peak clipper or limiter, protection of meters" },
      ],
      pyqExampleId: "6faddc99-dfdb-42d9-8322-7a63f81ce789",
      traps: [
        {
          title: "Dividing by milliamperes",
          body: "Convert the current to amperes before using \\(R_S = (V_S - V_Z)/I\\). Dividing volts by a number of milliamperes gives an answer a thousand times too small.",
        },
        {
          title: "Taking a smaller series resistance to be safe",
          body: "The value found from the power rating is the MINIMUM series resistance. A smaller one lets a larger current through the Zener at no load and can burn it out.",
        },
      ],
    },
  ],
};

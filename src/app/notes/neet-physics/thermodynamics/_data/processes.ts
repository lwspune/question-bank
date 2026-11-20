import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_TD_PROCESSES_NOTE: SubtopicNote = {
  subtopicName: "Processes and Heat Engines",
  title: "Processes and Heat Engines",
  oneLineDefinition:
    "Isothermal, adiabatic, isochoric and isobaric processes with the work and heat in each, then heat engines, refrigerators, the second law and the Carnot engine.",
  whyItMatters:
    "Three NEET questions from 2022 to 2026. Two are about processes: picking the adiabatic curve from four drawn from one state (2022) and the work done in an adiabatic expansion from its fall in temperature (Re-NEET 2026). One finds the sink temperature of a Carnot engine from its efficiency (2023).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphtd-processes",
      name: "Isothermal, adiabatic, isochoric and isobaric processes",
      visualizationSlug: "ht-pv-process-diagram",
      intuition:
        "Most questions fix one thing and let the rest change. Keep the temperature fixed and the process is isothermal; let no heat in or out and it is adiabatic; fix the volume and it is isochoric; fix the pressure and it is isobaric. Apply the first law to each, and each gets its own rule for work and heat.",
      definition:
        "- **Isothermal** (T fixed): \\(PV\\) constant, \\(\\Delta U = 0\\), so \\(\\Delta Q = \\Delta W = \\mu RT\\ln\\dfrac{V_2}{V_1}\\).\n" +
        "- **Adiabatic** (no heat, \\(\\Delta Q = 0\\)): \\(PV^{\\gamma}\\) constant. The work done by the gas comes out of its internal energy: \\(\\Delta W = \\dfrac{\\mu R(T_1 - T_2)}{\\gamma - 1} = -\\Delta U\\). An adiabatic expansion cools a gas.\n" +
        "- **Isochoric** (V fixed): \\(\\Delta W = 0\\), so \\(\\Delta Q = \\Delta U = \\mu C_v\\Delta T\\).\n" +
        "- **Isobaric** (P fixed): \\(\\Delta W = P\\Delta V = \\mu R\\Delta T\\), and \\(\\Delta Q = \\mu C_p\\Delta T\\).\n" +
        "- On a P-V graph through one point: isobaric is horizontal, isochoric vertical, and the adiabatic curve is steeper than the isothermal one (its slope is \\(\\gamma\\) times as large).",
      formula: {
        label: "Processes",
        latex: "PV^{\\gamma} = \\text{constant}, \\qquad W_{adiabatic} = \\frac{\\mu R(T_1 - T_2)}{\\gamma - 1}, \\qquad W_{isothermal} = \\mu RT\\ln\\frac{V_2}{V_1}",
        symbols: [
          { symbol: "\\(\\gamma\\)", meaning: "ratio of specific heats Cp over Cv" },
          { symbol: "\\(\\mu\\)", meaning: "number of moles" },
        ],
      },
      authoredExample: {
        prompt:
          "A gas at \\(1 \\times 10^{5}\\) Pa with \\(\\gamma = \\dfrac{5}{3}\\) is compressed adiabatically to one-eighth of its volume. What is its final pressure?",
        steps: [
          "\\(P_1V_1^{\\gamma} = P_2V_2^{\\gamma}\\), so \\(P_2 = P_1\\left(\\dfrac{V_1}{V_2}\\right)^{\\gamma} = 1 \\times 10^{5} \\times 8^{5/3}\\).",
          "\\(8^{1/3} = 2\\), so \\(8^{5/3} = 2^{5} = 32\\).",
          "\\(P_2 = 32 \\times 10^{5} = 3.2 \\times 10^{6}\\) Pa.",
        ],
        answer: "\\(3.2 \\times 10^{6}\\) Pa",
      },
      selfCheckExample: {
        prompt:
          "Two moles of an ideal gas expand isothermally at 300 K to twice their volume. How much work does the gas do? (R = 8.3 J/mol K, ln 2 = 0.693)",
        steps: [
          "\\(\\Delta W = \\mu RT\\ln\\dfrac{V_2}{V_1} = 2 \\times 8.3 \\times 300 \\times 0.693\\).",
          "\\(\\Delta W \\approx 3.45 \\times 10^{3}\\) J.",
        ],
        answer: "About 3450 J",
      },
      practiceSet: [
        { prompt: "In an isothermal expansion a gas does 500 J of work. How much heat does it take in?", answer: "500 J" },
        { prompt: "One mole of a monatomic ideal gas is heated at constant pressure from 300 K to 400 K. How much heat does it take in? (\\(C_p = \\dfrac{5}{2}R\\), R = 8.3 J/mol K)", answer: "2075 J" },
        { prompt: "In which of the four processes (isothermal, adiabatic, isochoric, isobaric) is the work done by a gas zero?", answer: "Isochoric" },
        { prompt: "A gas expands adiabatically. Does its temperature rise, fall or stay the same?", answer: "It falls" },
      ],
      pyqExampleId: "b1935b56-921c-4223-bfb4-a703fd26599f",
      traps: [
        {
          title: "Isothermal means no change in internal energy, not no heat",
          body: "In an isothermal process heat does flow: all of it becomes work, \\(\\Delta Q = \\Delta W\\). It is the adiabatic process that has \\(\\Delta Q = 0\\).",
        },
        {
          title: "The adiabatic curve is the steeper one",
          body: "Through the same point, the adiabatic curve falls faster than the isothermal curve, because its slope is \\(\\gamma\\) times larger and \\(\\gamma > 1\\).",
        },
        {
          title: "In an adiabatic process the temperature changes",
          body: "No heat flows, but the temperature is not fixed: a gas cools as it expands adiabatically and warms when it is compressed.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphtd-carnot",
      name: "Heat engines, refrigerators and the Carnot engine",
      intuition:
        "A heat engine takes heat from a hot body, turns part of it into work, and throws the rest away to a cold body. The second law says that some heat must always be thrown away, so no engine is 100% efficient. A refrigerator runs the other way: work is spent to pull heat out of a cold place. The best possible engine between two temperatures is the reversible Carnot engine.",
      definition:
        "- Heat engine: takes \\(Q_1\\) from the source, does work W, rejects \\(Q_2\\) to the sink. \\(W = Q_1 - Q_2\\) and efficiency \\(\\eta = \\dfrac{W}{Q_1} = 1 - \\dfrac{Q_2}{Q_1}\\).\n" +
        "- Refrigerator: takes \\(Q_2\\) from the cold inside using work W and gives \\(Q_1 = Q_2 + W\\) to the room. Coefficient of performance \\(\\alpha = \\dfrac{Q_2}{W}\\).\n" +
        "- **Second law:** no engine can turn all the heat it takes in into work (Kelvin-Planck), and no refrigerator can move heat from a colder to a hotter body with no work done (Clausius).\n" +
        "- **Carnot engine:** a reversible engine between a source at \\(T_1\\) and a sink at \\(T_2\\), made of two isothermal and two adiabatic steps. \\(\\dfrac{Q_2}{Q_1} = \\dfrac{T_2}{T_1}\\), so \\(\\eta = 1 - \\dfrac{T_2}{T_1}\\) with T in kelvin.\n" +
        "- No engine between the same two temperatures beats a Carnot engine, and its efficiency does not depend on the working substance.",
      formula: {
        label: "Engines",
        latex: "\\eta = \\frac{W}{Q_1} = 1 - \\frac{Q_2}{Q_1}, \\qquad \\eta_{Carnot} = 1 - \\frac{T_2}{T_1}, \\qquad \\alpha = \\frac{Q_2}{W}",
        symbols: [
          { symbol: "\\(Q_1\\)", meaning: "heat taken from the source" },
          { symbol: "\\(Q_2\\)", meaning: "heat given to the sink" },
          { symbol: "\\(T_1, T_2\\)", meaning: "source and sink temperatures in kelvin" },
        ],
      },
      authoredExample: {
        prompt:
          "An engine takes 1000 J of heat from its source and rejects 600 J to its sink in each cycle. Find the work done per cycle and the efficiency.",
        steps: [
          "\\(W = Q_1 - Q_2 = 1000 - 600 = 400\\) J.",
          "\\(\\eta = \\dfrac{W}{Q_1} = \\dfrac{400}{1000} = 0.4\\), that is 40%.",
        ],
        answer: "400 J per cycle; 40%",
      },
      selfCheckExample: {
        prompt:
          "A Carnot engine works between 400 K and 300 K and takes 1200 J of heat from its source in each cycle. How much work does it do per cycle?",
        steps: [
          "\\(\\eta = 1 - \\dfrac{300}{400} = 0.25\\).",
          "\\(W = \\eta Q_1 = 0.25 \\times 1200 = 300\\) J.",
        ],
        answer: "300 J",
      },
      practiceSet: [
        { prompt: "A refrigerator takes 300 J of heat from its inside while 100 J of work is done on it. What is its coefficient of performance?", answer: "3" },
        { prompt: "Can an engine working in a cycle turn all the heat it takes in into work?", answer: "No. The second law (Kelvin-Planck) forbids it" },
        { prompt: "Does the efficiency of a Carnot engine depend on the working substance?", answer: "No. It depends only on the two temperatures" },
      ],
      pyqExampleId: "44479584-c3b3-45db-b6e0-97ed71f56e50",
      traps: [
        {
          title: "Put the temperatures in kelvin",
          body: "A Carnot engine between 227 °C and 27 °C has \\(\\eta = 1 - \\dfrac{300}{500} = 40\\%\\), not \\(1 - \\dfrac{27}{227}\\), which is about 88%.",
        },
        {
          title: "No engine is 100% efficient",
          body: "Even a Carnot engine must reject some heat to its sink. Its efficiency would be 1 only with a sink at 0 K.",
        },
        {
          title: "A refrigerator's figure is not an efficiency",
          body: "The coefficient of performance \\(Q_2/W\\) is not an efficiency. It can be larger than 1, and for a refrigerator it usually is.",
        },
      ],
    },
  ],
};

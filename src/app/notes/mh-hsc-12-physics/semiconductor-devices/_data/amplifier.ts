import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_SD_AMPLIFIER_NOTE: SubtopicNote = {
  subtopicName: "Transistor as an Amplifier",
  title: "The Transistor as an Amplifier",
  oneLineDefinition:
    "How a transistor in the common emitter configuration, biased in its active region, turns a small change in base current into a large change in output voltage, with its voltage gain and power gain.",
  whyItMatters:
    "1 question, from the textbook: which method of biasing is used to operate a transistor as an amplifier. No board paper in this bank has set this section, but the biasing rule and the gain formulas take only a few lines to learn.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpsd-ce-amplifier",
      name: "The common emitter amplifier",
      intuition:
        "The base current controls the collector current, and the collector current flows through a load resistance. So a small wobble in the base current makes a large wobble in the voltage across the load, which is the amplified output. As the collector current rises, the drop across the load rises and the collector voltage falls, so the output swings the opposite way to the input.",
      definition:
        "- **Amplifier:** a device that increases the amplitude of an alternating signal (voltage, current or power).\n" +
        "- **Biasing:** the transistor is used in its active state: emitter-base junction **forward biased**, collector-base junction **reverse biased**.\n" +
        "- **Common emitter (CE) configuration:** input between the base and the emitter, output between the collector and the emitter. It gives the highest current gain and power gain of the three configurations, because its input impedance is low (a forward biased junction) and its output impedance high (a reverse biased junction).\n" +
        "- **Input characteristic:** \\(I_B\\) against \\(V_{BE}\\) at constant \\(V_{CE}\\); input resistance \\(r_i = \\dfrac{\\Delta V_{BE}}{\\Delta I_B}\\). **Output characteristic:** \\(I_C\\) against \\(V_{CE}\\) at constant \\(I_B\\); output resistance \\(r_o = \\dfrac{\\Delta V_{CE}}{\\Delta I_C}\\).\n" +
        "- **Working:** in the output loop \\(V_{CC} = V_{CE} + I_C R_L\\). The input signal changes \\(I_B\\), which changes \\(I_C\\); since \\(V_{CC}\\) is fixed, \\(V_{CE}\\) changes, and this change is the amplified output. A capacitor in the output blocks the DC part.\n" +
        "- **AC current gain** \\(\\beta_{ac} = \\dfrac{\\Delta I_C}{\\Delta I_B}\\), almost the same as \\(\\beta_{DC}\\).",
      formula: {
        label: "Voltage gain and power gain",
        latex: "A_V = \\frac{v_o}{v_i} = -\\beta_{ac}\\,\\frac{R_L}{r_i}, \\qquad A_P = \\beta_{ac} \\times A_V",
        symbols: [
          { symbol: "\\(R_L\\)", meaning: "load resistance in the collector circuit" },
          { symbol: "\\(r_i\\)", meaning: "input resistance of the transistor" },
          { symbol: "\\(-\\)", meaning: "the output is out of phase with the input" },
        ],
      },
      authoredExample: {
        prompt:
          "In a common emitter amplifier, \\(\\beta_{ac} = 100\\), the load resistance is 2 kΩ and the input resistance is 1 kΩ. Find the voltage gain and the power gain.",
        steps: [
          "Given: \\(\\beta_{ac} = 100\\), \\(R_L = 2\\ \\text{k}\\Omega = 2000\\ \\Omega\\), \\(r_i = 1\\ \\text{k}\\Omega = 1000\\ \\Omega\\).",
          "Formula: \\(A_V = -\\beta_{ac} \\dfrac{R_L}{r_i}\\).",
          "Substitution: \\(A_V = -100 \\times \\dfrac{2000}{1000} = -200\\). The minus sign means the output is out of phase with the input.",
          "Power gain (magnitude): \\(A_P = \\beta_{ac} \\times |A_V| = 100 \\times 200 = 20\\,000\\).",
        ],
        answer: "Voltage gain −200 (magnitude 200); power gain 20 000",
      },
      selfCheckExample: {
        prompt: "A common emitter amplifier has a current gain of 50 and a voltage gain of magnitude 150. Find its power gain.",
        steps: ["\\(A_P = \\beta_{ac} \\times |A_V| = 50 \\times 150\\)."],
        answer: "7500",
      },
      practiceSet: [
        { prompt: "Why is the common emitter configuration preferred for an amplifier?", answer: "It gives the highest current gain and power gain of the three configurations" },
        { prompt: "What does the minus sign in the voltage gain of a CE amplifier tell you?", answer: "The output voltage is out of phase with the input voltage" },
        { prompt: "A change of 0.02 V in the base-emitter voltage changes the base current by 20 μA. Find the input resistance.", answer: "1000 Ω (1 kΩ)" },
      ],
      pyqExampleId: "6178054c-2119-4299-974b-a458fcc82919",
      traps: [
        {
          title: "Dropping the minus sign without a word",
          body: "Write \\(A_V = -\\beta_{ac} R_L / r_i\\) and say that the minus sign shows the output is out of phase with the input. For the power gain, use the magnitude of \\(A_V\\).",
        },
        {
          title: "Kilohms against ohms",
          body: "\\(R_L / r_i\\) is a ratio, so both must be in the same unit. 2 kΩ over 1000 Ω is 2, not 0.002.",
        },
      ],
    },
  ],
};

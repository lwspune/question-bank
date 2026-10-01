import type { SubtopicNote } from "@/app/notes/_types";

export const ZENER_SEMI_NOTE: SubtopicNote = {
  subtopicName: "Zener Diode as a Voltage Regulator",
  title: "Zener Diode as a Voltage Regulator",
  oneLineDefinition:
    "Once a reverse-biased Zener breaks down, the load voltage is fixed at the Zener voltage; the series resistor takes up the rest of the supply, and the Zener carries whatever current the load does not.",
  whyItMatters:
    "Seventeen PYQs, three from 2026, and nine of them ask for a number: the most numerical page in the chapter. Nine find a current or a power in a drawn regulator circuit: the series current, the load current, the Zener current or the Zener's power. Eight are design questions: the safe series resistor from a power rating, or the range of load resistance the circuit can hold. Every one uses the same three lines of working, once you have checked that the Zener has broken down.",
  concepts: [
    // C1 — currents in a regulator
    {
      kind: "formula" as const,
      slug: "jpsemi-zener-currents",
      name: "Currents in a Zener regulator",
      intuition:
        "A Zener in parallel with the load holds the load voltage at V_Z, as long as it is in breakdown. The series resistor then has the rest of the supply across it, which fixes the total current. The load takes V_Z ÷ R_L of that, and the Zener takes what is left. If the supply is too small to reach breakdown, the Zener is simply an open circuit.",
      definition:
        "- **Check breakdown first.** Remove the Zener and find the load voltage from the divider: \\(V_L = V_{in}\\dfrac{R_L}{R_s + R_L}\\). If this exceeds \\(V_Z\\), the Zener breaks down; if not, it carries no current.\n" +
        "- In breakdown, the load voltage is \\(V_Z\\).\n" +
        "- Series current: \\(I_s = \\dfrac{V_{in} - V_Z}{R_s}\\). Load current: \\(I_L = \\dfrac{V_Z}{R_L}\\). Zener current: \\(I_Z = I_s - I_L\\).\n" +
        "- Power in the Zener: \\(P_Z = V_Z I_Z\\).\n" +
        "- The Zener current is largest at the largest input voltage, and when the load draws least.\n" +
        "- Forward biased, a Zener behaves as an ordinary diode.",
      formula: {
        label: "Regulator currents",
        latex: "I_s = \\frac{V_{in} - V_Z}{R_s}, \\quad I_L = \\frac{V_Z}{R_L}, \\quad I_Z = I_s - I_L, \\quad P_Z = V_Z I_Z",
      },
      authoredExample: {
        prompt:
          "A 14 V supply feeds a 6 V Zener through a 400 Ω series resistor. The load is 1.5 kΩ. Find the Zener current and the power in the Zener.",
        steps: [
          "Check: without the Zener, the load would get \\(14 \\times \\dfrac{1500}{1900} \\approx 11\\) V, more than 6 V. The Zener breaks down.",
          "Series current: \\(I_s = \\dfrac{14 - 6}{400} = 20\\) mA.",
          "Load current: \\(I_L = \\dfrac{6}{1500} = 4\\) mA.",
          "Zener current: \\(20 - 4 = 16\\) mA; power \\(6 \\times 16 = 96\\) mW.",
        ],
        answer: "16 mA; 96 mW.",
      },
      selfCheckExample: {
        prompt:
          "A 10 V supply feeds a 6 V Zener through a 3 kΩ series resistor, with a 2 kΩ load across the Zener. Find the current through the Zener and the voltage across the load.",
        steps: [
          "Without the Zener, the load would get \\(10 \\times \\dfrac{2}{5} = 4\\) V, less than 6 V.",
          "The Zener does not break down, so it carries no current.",
          "The circuit is a plain divider: the load has 4 V across it.",
        ],
        answer: "Zero; 4 V.",
      },
      practiceSet: [
        { prompt: "A regulator holds 5 V across a 250 Ω load. Load current?", answer: "20 mA" },
        { prompt: "A 9 V Zener carries 12 mA. Power in it?", answer: "108 mW" },
        { prompt: "The series current is 25 mA and the load takes 8 mA. Zener current?", answer: "17 mA" },
        { prompt: "The Zener current is three times the load current. How does the series current compare with the load current?", answer: "It is four times the load current" },
      ],
      pyqExampleId: "dbe8483d-6aaa-43dd-b6e5-d788a7545cf8", // 2022: 100–120 V input, 60 V Zener, max I_Z = 9 mA
      traps: [
        {
          title: "Check breakdown before using V_Z",
          body: "If the divider voltage across the load is below V_Z, the Zener is off and the load voltage is not V_Z. Assuming breakdown without checking gives a negative or wrong Zener current.",
        },
        {
          title: "The Zener current is not the series current",
          body: "The current through the series resistor splits between the load and the Zener. The Zener carries I_s − I_L; it carries all of I_s only when the load is removed.",
        },
        {
          title: "Load current comes from V_Z, not the supply",
          body: "In breakdown the load has V_Z across it, so I_L = V_Z ÷ R_L. Dividing the supply voltage by R_L overstates it.",
        },
      ],
    },

    // C2 — designing the series resistor
    {
      kind: "formula" as const,
      slug: "jpsemi-zener-design",
      name: "Choosing the series resistor for a Zener",
      intuition:
        "A Zener can dissipate only so much power, so its current has a ceiling, P_max ÷ V_Z. The series resistor must keep the current below that ceiling in the worst case: the highest input voltage with no load connected, when every milliampere goes through the Zener. With a load, the same circuit regulates only over a range of load resistance.",
      definition:
        "- Largest safe Zener current: \\(I_{Z,\\max} = \\dfrac{P_{\\max}}{V_Z}\\).\n" +
        "- Smallest safe series resistor (highest input, load removed): \\(R_{s,\\min} = \\dfrac{V_{in,\\max} - V_Z}{I_{Z,\\max}}\\).\n" +
        "- For a fixed \\(R_s\\), the series current is \\(I_s = (V_{in} - V_Z)/R_s\\), and \\(I_L = I_s - I_Z\\).\n" +
        "- Smallest load resistance: when the Zener current falls to zero, \\(R_{L,\\min} = V_Z/I_s\\).\n" +
        "- Largest load resistance: when the Zener current reaches its maximum, \\(R_{L,\\max} = V_Z/(I_s - I_{Z,\\max})\\).\n" +
        "- If the input can fall below \\(V_Z\\), the circuit cannot regulate there; safety is still set by the highest input.",
      formula: {
        label: "Safe series resistor",
        latex: "I_{Z,\\max} = \\frac{P_{\\max}}{V_Z}, \\qquad R_{s,\\min} = \\frac{V_{in,\\max} - V_Z}{I_{Z,\\max}}",
      },
      authoredExample: {
        prompt:
          "A Zener of breakdown voltage 6 V is rated 0.3 W. It is to be used on a 16 V supply. Find the smallest series resistor that keeps it safe.",
        steps: [
          "\\(I_{Z,\\max} = \\dfrac{0.3}{6} = 0.05\\) A.",
          "The resistor drops \\(16 - 6 = 10\\) V.",
          "\\(R_{s,\\min} = \\dfrac{10}{0.05} = 200\\ \\Omega\\).",
        ],
        answer: "200 Ω",
      },
      selfCheckExample: {
        prompt:
          "A 9 V Zener with a maximum current of 10 mA is fed from 12 V through 200 Ω. Find the smallest and largest load resistances for which it regulates.",
        steps: [
          "Series current: \\(I_s = \\dfrac{12 - 9}{200} = 15\\) mA.",
          "Smallest load: the Zener current is zero and the load takes all 15 mA, \\(R_L = \\dfrac{9}{0.015} = 600\\ \\Omega\\).",
          "Largest load: the Zener takes 10 mA, the load 5 mA, \\(R_L = \\dfrac{9}{0.005} = 1800\\ \\Omega\\).",
        ],
        answer: "600 Ω to 1.8 kΩ.",
      },
      practiceSet: [
        { prompt: "A 12 V Zener is rated 0.6 W. Largest safe current?", answer: "50 mA" },
        { prompt: "The supply varies from 18 V to 24 V; \\(V_Z = 9\\) V and \\(I_{Z,\\max} = 30\\) mA. Smallest safe series resistor?", answer: "500 Ω" },
        { prompt: "Which input voltage sets the safe series resistor, the highest or the lowest?", answer: "The highest: the Zener current is largest there" },
        { prompt: "With the load removed, what current flows through the Zener?", answer: "All of the series current" },
      ],
      pyqExampleId: "ca30dc3f-0528-4fdc-b1dc-07b42d1c94f0", // 2026: 10 V, 0.4 W, 15 V supply, 125 Ω
      traps: [
        {
          title: "Divide the power by V_Z",
          body: "The Zener's own voltage is V_Z, so its largest current is P ÷ V_Z. Dividing the power by the supply voltage gives a current that is too small and a resistor that is too large.",
        },
        {
          title: "Design for the highest input",
          body: "The current, and so the heating, is largest at the highest input. Using the lowest input voltage gives a resistor that lets the Zener burn out when the supply rises.",
        },
        {
          title: "No load is the worst case",
          body: "With the load disconnected, the whole series current goes through the Zener. The safe resistor is found for that case unless the question fixes the load.",
        },
      ],
    },
  ],
};

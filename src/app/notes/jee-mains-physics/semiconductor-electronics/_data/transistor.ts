import type { SubtopicNote } from "@/app/notes/_types";

export const TRANSISTOR_SEMI_NOTE: SubtopicNote = {
  subtopicName: "Transistors and the CE Amplifier",
  title: "Transistors and the CE Amplifier",
  oneLineDefinition:
    "A transistor's emitter current splits into a small base current and a large collector current; their ratios α and β, and the common-emitter gains built from β, are what the questions ask for.",
  whyItMatters:
    "Eighteen PYQs, thirteen of them multiple choice: five from 2021, nine from 2022 and four from 2023. Transistors have since left the JEE Main syllabus, and the bank agrees: there has been no transistor question since 2023, the last one from April 2023. Nine are about structure, α, β and the operating regions; nine are about the common-emitter amplifier, finding β from a characteristic and then the voltage or power gain. The page is kept for revising the older papers.",
  concepts: [
    // C1 — structure, alpha and beta
    {
      kind: "formula" as const,
      slug: "jpsemi-transistor-basics",
      name: "Transistor structure, α and β",
      intuition:
        "A transistor is three layers, n-p-n or p-n-p. The emitter is packed with carriers and pushes them into a very thin, lightly doped base. Few of them recombine there; almost all sweep on into the collector. So the collector current is nearly the whole emitter current, and the small base current controls a much larger collector current.",
      definition:
        "- **Emitter:** heavily doped, supplies the carriers. **Base:** very thin and lightly doped. **Collector:** the largest region, moderately doped.\n" +
        "- Two diodes joined back to back do not make a transistor: their common middle region is far too thick, so the carriers recombine there.\n" +
        "- Currents: \\(I_E = I_B + I_C\\). \\(\\alpha = I_C/I_E\\) is just under 1; \\(\\beta = I_C/I_B\\) is tens to hundreds.\n" +
        "- \\(\\alpha = \\dfrac{\\beta}{1 + \\beta}\\) and \\(\\beta = \\dfrac{\\alpha}{1 - \\alpha}\\). The same holds for changes: \\(\\Delta I_B = \\Delta I_E - \\Delta I_C\\).\n" +
        "- **Active region** (emitter-base forward biased, collector-base reverse biased): the transistor amplifies.\n" +
        "- **Cut-off** (both junctions reverse biased) and **saturation** (both forward biased): the transistor is a switch, off and on.\n" +
        "- An n-p-n transistor carries more current than a p-n-p one, because electrons move more easily than holes.\n" +
        "- An oscillator is an amplifier with positive feedback: part of the output is fed back to the input in phase.",
      formula: {
        label: "Transistor currents",
        latex: "I_E = I_B + I_C, \\qquad \\alpha = \\frac{\\beta}{1 + \\beta}, \\qquad \\beta = \\frac{\\alpha}{1 - \\alpha}",
      },
      authoredExample: {
        prompt:
          "In a transistor the emitter current is 5 mA and the base current is 100 μA. Find the collector current, α and β.",
        steps: [
          "\\(I_C = I_E - I_B = 5 - 0.1 = 4.9\\) mA.",
          "\\(\\alpha = \\dfrac{4.9}{5} = 0.98\\).",
          "\\(\\beta = \\dfrac{4.9}{0.1} = 49\\). Check: \\(\\dfrac{49}{1 + 49} = 0.98\\).",
        ],
        answer: "4.9 mA; α = 0.98; β = 49.",
      },
      selfCheckExample: {
        prompt: "A transistor has \\(\\alpha = 0.995\\). Find β.",
        steps: [
          "\\(\\beta = \\dfrac{\\alpha}{1 - \\alpha} = \\dfrac{0.995}{0.005}\\).",
          "\\(\\beta = 199\\).",
        ],
        answer: "199",
      },
      practiceSet: [
        { prompt: "A transistor has \\(\\beta = 19\\). Find α.", answer: "0.95" },
        { prompt: "The emitter current changes by 2 mA and the collector current by 1.98 mA. Find β for these changes.", answer: "99" },
        { prompt: "In which region must a transistor work to amplify?", answer: "The active region" },
        { prompt: "Which region of a transistor is the most heavily doped?", answer: "The emitter" },
      ],
      pyqExampleId: "7547912e-6b02-47dc-b1cf-ad48cc29b589", // 2021: α = β/(1 + β)
      traps: [
        {
          title: "α is below 1, β is large",
          body: "α compares the collector current with the larger emitter current, so it is just under 1. β compares it with the small base current, so it is tens or hundreds. A relation that gives α above 1 has the two swapped.",
        },
        {
          title: "The emitter current is the sum",
          body: "I_E = I_B + I_C. From a change in emitter and collector current, the base change is their difference, and β is the collector change divided by that difference.",
        },
        {
          title: "A switch uses cut-off and saturation",
          body: "The active region is for amplifying. A transistor used as a switch is driven between cut-off (off) and saturation (on).",
        },
      ],
    },

    // C2 — the common-emitter amplifier
    {
      kind: "formula" as const,
      slug: "jpsemi-ce-amplifier",
      name: "Gains of a common-emitter amplifier",
      intuition:
        "In the common-emitter circuit a small signal on the base changes the base current a little and the collector current β times as much. That collector change flows through the load resistor, so the output voltage changes far more than the input did. The voltage gain is β scaled by the ratio of load resistance to input resistance.",
      definition:
        "- Input resistance: \\(r_i = \\dfrac{\\Delta V_{BE}}{\\Delta I_B}\\) at constant \\(V_{CE}\\).\n" +
        "- Current gain: \\(\\beta = \\dfrac{\\Delta I_C}{\\Delta I_B}\\), the slope of the transfer characteristic (\\(I_C\\) against \\(I_B\\)).\n" +
        "- Voltage gain: \\(A_V = \\beta\\,\\dfrac{R_L}{r_i}\\). Output voltage: \\(v_{out} = A_V v_{in}\\), 180° out of phase with the input.\n" +
        "- Power gain: \\(A_P = \\beta A_V = \\beta^{2}\\,\\dfrac{R_L}{r_i}\\).\n" +
        "- d.c. working point: \\(I_C = \\beta I_B\\) and \\(V_{CE} = V_{CC} - I_C R_C\\).\n" +
        "- Keep the units straight: a change in mA divided by a change in μA is a factor of 1000.",
      formula: {
        label: "Common-emitter gains",
        latex: "\\beta = \\frac{\\Delta I_C}{\\Delta I_B}, \\quad r_i = \\frac{\\Delta V_{BE}}{\\Delta I_B}, \\quad A_V = \\beta\\,\\frac{R_L}{r_i}, \\quad A_P = \\beta A_V",
      },
      authoredExample: {
        prompt:
          "In a common-emitter amplifier, a 20 mV change in base-emitter voltage changes the base current by 40 μA and the collector current by 4 mA. The load is 3 kΩ. Find the input resistance, β, the voltage gain and the power gain.",
        steps: [
          "\\(r_i = \\dfrac{20 \\times 10^{-3}}{40 \\times 10^{-6}} = 500\\ \\Omega\\).",
          "\\(\\beta = \\dfrac{4 \\times 10^{-3}}{40 \\times 10^{-6}} = 100\\).",
          "\\(A_V = 100 \\times \\dfrac{3000}{500} = 600\\).",
          "\\(A_P = \\beta A_V = 100 \\times 600 = 6 \\times 10^{4}\\).",
        ],
        answer: "500 Ω; 100; 600; \\(6 \\times 10^{4}\\).",
      },
      selfCheckExample: {
        prompt:
          "On a transistor's transfer characteristic, the collector current rises from 2 mA to 5 mA as the base current rises from 20 μA to 45 μA. With a 2.4 kΩ load and an input resistance of 0.8 kΩ, find the voltage gain and the output for a 5 mV input.",
        steps: [
          "\\(\\beta = \\dfrac{3\\ \\text{mA}}{25\\ \\mu\\text{A}} = 120\\).",
          "\\(A_V = 120 \\times \\dfrac{2.4}{0.8} = 360\\).",
          "\\(v_{out} = 360 \\times 5\\ \\text{mV} = 1.8\\) V.",
        ],
        answer: "360; 1.8 V.",
      },
      practiceSet: [
        { prompt: "β = 80, load 4 kΩ, input resistance 1 kΩ. Voltage gain?", answer: "320" },
        { prompt: "A CE amplifier has voltage gain 250 and β = 50. Power gain?", answer: "12 500" },
        { prompt: "A 4 mV signal goes into an amplifier of voltage gain 125. Output amplitude?", answer: "0.5 V" },
        { prompt: "Phase difference between the input and output of a CE amplifier?", answer: "180°" },
      ],
      pyqExampleId: "e255eceb-b5d0-4e67-9424-4a782d029c98", // 2022: 10 mV, 10 μA, 1.5 mA, 5 kΩ, A_V = 750
      traps: [
        {
          title: "mA over μA is a factor of a thousand",
          body: "β from a 3 mA change against a 25 μA change is 120, not 0.12. Convert both to the same unit before dividing.",
        },
        {
          title: "Power gain has β twice",
          body: "Power gain is current gain times voltage gain, β × A_V = β² R_L ÷ r_i. Using β once gives the voltage gain again.",
        },
        {
          title: "Use the input resistance, not the base resistor",
          body: "The voltage gain uses r_i, the transistor's own input resistance. When the question gives a separate input resistance, use it rather than the base resistor R_B; R_B stands in for r_i only when nothing else on the input side is given.",
        },
      ],
    },
  ],
};

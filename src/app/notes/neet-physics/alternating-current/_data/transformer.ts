import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_AC_TRANSFORMER_NOTE: SubtopicNote = {
  subtopicName: "LC Oscillations and Transformers",
  title: "LC Oscillations and Transformers",
  oneLineDefinition:
    "A charged capacitor and an inductor passing energy back and forth at ω = 1/√(LC), and the transformer, which changes an ac voltage in the ratio of its turns while the power carries through.",
  whyItMatters:
    "Five NEET questions from 2021 to 2024. One is an LC circuit whose oscillations die away, asking when the charge falls to half (Re-NEET 2024). Four are transformers: the primary current for a lamp on the secondary in 2021 and 2023, the secondary current of a step-up transformer in Re-NEET 2024, and the voltage ratio from the turns ratio in NEET 2024. All five are short calculations.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphac-lc",
      name: "LC oscillations",
      intuition:
        "Connect a charged capacitor across an inductor and the charge starts to flow out as a current. The inductor keeps the current going after the capacitor is empty, so the capacitor charges up the other way. Energy moves from the capacitor's electric field to the inductor's magnetic field and back, like a mass on a spring. With no resistance this would go on for ever. A real circuit has some resistance, which turns a little energy into heat each cycle, so the swings die away.",
      definition:
        "- Angular frequency of the oscillation: \\(\\omega = \\dfrac{1}{\\sqrt{LC}}\\). Starting with charge \\(Q_0\\): \\(q = Q_0\\cos\\omega t\\).\n" +
        "- Energy: \\(\\dfrac{q^{2}}{2C} + \\dfrac{1}{2}Li^{2} = \\dfrac{Q_0^{2}}{2C}\\) at every instant, when there is no resistance.\n" +
        "- The current is largest when the capacitor is empty and all the energy is in the inductor: \\(I_{\\max} = \\dfrac{Q_0}{\\sqrt{LC}} = Q_0\\omega\\).\n" +
        "- With resistance the oscillations are **damped**: the charge amplitude falls with time. A question may give the law, such as \\(Q = Q_0e^{-Rt/2L}\\); then take natural logs: \\(\\dfrac{Rt}{2L} = \\ln\\dfrac{Q_0}{Q}\\).",
      formula: {
        label: "LC oscillator",
        latex: "\\omega = \\frac{1}{\\sqrt{LC}}, \\qquad \\frac{q^{2}}{2C} + \\frac{1}{2}Li^{2} = \\frac{Q_0^{2}}{2C}, \\qquad I_{\\max} = \\frac{Q_0}{\\sqrt{LC}}",
      },
      authoredExample: {
        prompt:
          "A \\(5\\ \\mu\\text{F}\\) capacitor charged to 40 V is connected across a 0.2 H inductor. Find the angular frequency, the largest charge and the largest current.",
        steps: [
          "\\(LC = 0.2 \\times 5 \\times 10^{-6} = 10^{-6}\\), so \\(\\omega = \\dfrac{1}{\\sqrt{10^{-6}}} = 1000\\ \\text{rad/s}\\).",
          "\\(Q_0 = CV_0 = 5 \\times 10^{-6} \\times 40 = 2 \\times 10^{-4}\\ \\text{C}\\).",
          "\\(I_{\\max} = Q_0\\omega = 2 \\times 10^{-4} \\times 1000 = 0.2\\ \\text{A}\\).",
        ],
        answer: "1000 rad/s, \\(200\\ \\mu\\text{C}\\), 0.2 A",
      },
      selfCheckExample: {
        prompt:
          "In an LC circuit with no resistance, the charge on the capacitor is half its largest value. What fraction of the total energy is in the inductor at that moment?",
        steps: [
          "Energy in the capacitor goes as \\(q^{2}\\): \\(\\left(\\dfrac{1}{2}\\right)^{2} = \\dfrac{1}{4}\\) of the total.",
          "The rest, \\(1 - \\dfrac{1}{4} = \\dfrac{3}{4}\\), is in the inductor.",
        ],
        answer: "Three quarters",
      },
      practiceSet: [
        { prompt: "In an LC circuit the inductance is doubled and the capacitance halved. What happens to the angular frequency?", answer: "It stays the same" },
        { prompt: "In an LC circuit, where is all the energy at the instant the current is largest?", answer: "In the inductor's magnetic field" },
        { prompt: "Why do the oscillations of a real LC circuit die away?", answer: "Its resistance turns some energy into heat each cycle" },
        { prompt: "An LC circuit has \\(Q_0 = 10\\ \\mu\\text{C}\\), L = 0.1 H and \\(C = 10\\ \\mu\\text{F}\\). What is the largest current?", answer: "10 mA" },
      ],
      pyqExampleId: "760f0460-d03e-4f51-b4e6-787485733664",
      traps: [
        {
          title: "Energy goes as charge squared",
          body: "Half the largest charge leaves only a quarter of the energy in the capacitor. The other three quarters is in the inductor.",
        },
        {
          title: "Natural log, not log to base 10",
          body: "To solve \\(Q = Q_0e^{-Rt/2L}\\) for a fall to half, use \\(\\ln 2 = 0.693\\), not \\(\\log 2 = 0.301\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphac-transformer",
      name: "Transformers",
      intuition:
        "A transformer is two coils wound on one soft-iron core. The ac in the primary coil sets up a changing magnetic flux, and the core carries it through the secondary coil too. Every turn of either coil gets the same emf, so each coil's voltage is in proportion to its number of turns. An ideal transformer wastes no energy, so the power in equals the power out: where the voltage goes up, the current goes down.",
      definition:
        "- A transformer works on mutual induction. It needs a changing current, so it works only on ac.\n" +
        "- Turns ratio: \\(\\dfrac{V_s}{V_p} = \\dfrac{N_s}{N_p}\\). **Step-up:** \\(N_s > N_p\\). **Step-down:** \\(N_s < N_p\\).\n" +
        "- Ideal transformer: \\(V_pI_p = V_sI_s\\), so \\(\\dfrac{I_s}{I_p} = \\dfrac{N_p}{N_s}\\).\n" +
        "- Efficiency \\(= \\dfrac{\\text{output power}}{\\text{input power}}\\). Real transformers lose energy by flux leakage, by the resistance of the windings, by eddy currents in the core (cut down by making the core of thin laminated sheets) and by hysteresis.",
      formula: {
        label: "Transformer",
        latex: "\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}, \\qquad V_p I_p = V_s I_s",
        symbols: [
          { symbol: "\\(N_p, N_s\\)", meaning: "turns on the primary and the secondary" },
          { symbol: "\\(V_p, V_s\\)", meaning: "primary and secondary voltages" },
        ],
      },
      authoredExample: {
        prompt:
          "An ideal transformer has 100 turns on its primary and 2000 on its secondary. The primary is on 220 V ac and the secondary supplies 0.05 A. Find the secondary voltage and the primary current.",
        steps: [
          "\\(V_s = V_p \\times \\dfrac{N_s}{N_p} = 220 \\times 20 = 4400\\ \\text{V}\\).",
          "\\(I_p = I_s \\times \\dfrac{N_s}{N_p} = 0.05 \\times 20 = 1\\ \\text{A}\\).",
          "Check the power: \\(220 \\times 1 = 4400 \\times 0.05 = 220\\ \\text{W}\\).",
        ],
        answer: "4400 V, 1 A",
      },
      selfCheckExample: {
        prompt:
          "A transformer takes 500 W from the mains and delivers 450 W to its load. What is its efficiency, and where does the rest go?",
        steps: [
          "Efficiency \\(= \\dfrac{450}{500} = 0.9\\), that is 90%.",
          "The missing 50 W is lost in the transformer itself, mostly as heat in the windings and the core.",
        ],
        answer: "90%; lost as heat in the transformer",
      },
      practiceSet: [
        { prompt: "In a step-down transformer, which coil has more turns?", answer: "The primary" },
        { prompt: "Why is the core of a transformer made of thin laminated sheets?", answer: "To reduce eddy current losses" },
        { prompt: "Can a transformer step up a steady dc voltage?", answer: "No: it needs a changing flux, so it works only on ac" },
        { prompt: "An ideal transformer has \\(\\dfrac{N_s}{N_p} = 10\\). Its secondary current is 0.2 A. What is the primary current?", answer: "2 A" },
      ],
      pyqExampleId: "cc2e3d4b-70bd-4d23-8e04-ca971af28de0",
      traps: [
        {
          title: "Current changes the other way to voltage",
          body: "A step-up transformer raises the voltage and lowers the current by the same factor. In an ideal one the power is the same on both sides.",
        },
        {
          title: "Ratings give the power",
          body: "A lamp rated 12 V, 60 W on the secondary takes 60 W. An ideal transformer then takes 60 W from the mains too, so the primary current is that power divided by the primary voltage, not by 12 V.",
        },
      ],
    },
  ],
};

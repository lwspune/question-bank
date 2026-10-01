import type { SubtopicNote } from "@/app/notes/_types";

export const LC_TRANSFORMER_AC_NOTE: SubtopicNote = {
  subtopicName: "LC Oscillations, Transformers and AC Devices",
  title: "LC Oscillations, Transformers and AC Devices",
  oneLineDefinition:
    "A charged capacitor across an inductor swaps its energy back and forth at ω = 1/√(LC); a transformer changes a.c. voltage in the ratio of its turns while the power, less its losses, carries through.",
  whyItMatters:
    "Fifteen PYQs, eleven of them multiple choice. Five are LC oscillations: the largest current, a new frequency, or how long the energy takes to move into the inductor. Ten are transformers and devices: turns, voltages and currents with or without losses, and match lists of the principle each device works on. Energy conservation and the turns ratio do almost all the work.",
  concepts: [
    // C1 — LC oscillations
    {
      kind: "formula" as const,
      slug: "jpac-lc",
      name: "LC oscillations",
      intuition:
        "Connect a charged capacitor across an inductor and the charge flows out as a current. The inductor keeps the current going after the capacitor is empty, charging it the other way. Energy moves from the capacitor's electric field to the inductor's magnetic field and back, like a mass on a spring. With no resistance the total never changes, so the largest current comes from setting all the energy in the inductor.",
      definition:
        "- Starting with charge \\(Q_0\\): \\(q = Q_0\\cos\\omega t\\), \\(i = -Q_0\\omega\\sin\\omega t\\), with \\(\\omega = \\dfrac{1}{\\sqrt{LC}}\\).\n" +
        "- Energy: \\(U_C = \\dfrac{q^{2}}{2C}\\), \\(U_L = \\dfrac{1}{2}Li^{2}\\), and \\(U_C + U_L = \\dfrac{Q_0^{2}}{2C}\\) at every instant.\n" +
        "- Largest current: \\(I_{max} = Q_0\\omega = \\dfrac{Q_0}{\\sqrt{LC}} = V_0\\sqrt{\\dfrac{C}{L}}\\), from \\(\\dfrac{1}{2}CV_0^{2} = \\dfrac{1}{2}LI_{max}^{2}\\).\n" +
        "- Energy share to time: if the inductor holds a fraction k of the energy, the capacitor holds \\(1 - k\\), so \\(q = Q_0\\sqrt{1 - k}\\). Solve \\(\\cos\\omega t = \\sqrt{1 - k}\\).\n" +
        "- Scaling: \\(\\omega \\propto \\dfrac{1}{\\sqrt{LC}}\\). L times a and C times b give \\(\\dfrac{\\omega}{\\sqrt{ab}}\\).",
      formula: {
        label: "LC oscillator",
        latex: "\\omega = \\frac{1}{\\sqrt{LC}} \\qquad I_{max} = \\frac{Q_0}{\\sqrt{LC}} = V_0\\sqrt{\\frac{C}{L}}",
      },
      authoredExample: {
        prompt:
          "A \\(5\\ \\mu\\text{F}\\) capacitor charged to 40 V is connected across a 0.2 H inductor. Find \\(\\omega\\), the largest charge and the largest current.",
        steps: [
          "\\(LC = 0.2 \\times 5 \\times 10^{-6} = 10^{-6}\\), so \\(\\omega = 1000\\ \\text{rad/s}\\).",
          "\\(Q_0 = CV_0 = 5 \\times 10^{-6} \\times 40 = 2 \\times 10^{-4}\\ \\text{C}\\).",
          "\\(I_{max} = Q_0\\omega = 0.2\\ \\text{A}\\). Check: \\(40\\sqrt{\\dfrac{5 \\times 10^{-6}}{0.2}} = 40 \\times 0.005 = 0.2\\ \\text{A}\\).",
        ],
        answer: "\\(1000\\ \\text{rad/s}\\), \\(200\\ \\mu\\text{C}\\), \\(0.2\\ \\text{A}\\)",
      },
      selfCheckExample: {
        prompt:
          "In the oscillator above, how long after it is connected does the inductor first hold half of the total energy?",
        steps: [
          "Half the energy in the capacitor means \\(q^{2} = \\dfrac{Q_0^{2}}{2}\\), so \\(\\cos\\omega t = \\dfrac{1}{\\sqrt{2}}\\) and \\(\\omega t = \\dfrac{\\pi}{4}\\).",
          "\\(t = \\dfrac{\\pi}{4 \\times 1000} \\approx 7.85 \\times 10^{-4}\\ \\text{s}\\), one eighth of a period.",
        ],
        answer: "\\(\\dfrac{\\pi}{4000}\\ \\text{s} \\approx 0.79\\ \\text{ms}\\)",
      },
      practiceSet: [
        { prompt: "L is doubled and C halved. New \\(\\omega\\)?", answer: "Unchanged" },
        { prompt: "L made 4 times and C made 9 times. New \\(\\omega\\)?", answer: "\\(\\dfrac{\\omega}{6}\\)" },
        { prompt: "\\(Q_0 = 10\\ \\mu\\text{C}\\), L = 0.1 H, C = \\(10\\ \\mu\\text{F}\\). Largest current?", answer: "\\(10\\ \\text{mA}\\)" },
        { prompt: "When \\(q = \\dfrac{Q_0}{2}\\), what fraction of the energy is in the inductor?", answer: "\\(\\dfrac{3}{4}\\)" },
      ],
      pyqExampleId: "7aac52fd-48a6-40b9-8557-f298cb63d37b", // 29 Jan 2024: largest current from C, V and L
      traps: [
        {
          title: "√(C/L) or √(L/C)",
          body: "From ½CV₀² = ½LI², the current is V₀√(C/L). A large capacitor or a small inductor gives a large current.",
        },
        {
          title: "Charge fraction and energy fraction",
          body: "Energy goes as q². Half the charge leaves a quarter of the energy in the capacitor, not half.",
        },
      ],
    },

    // C2 — transformers and devices
    {
      kind: "formula" as const,
      slug: "jpac-transformer",
      name: "Transformers and a.c. devices",
      intuition:
        "Both coils of a transformer share one changing flux, so each turn has the same emf. Voltage therefore goes in the ratio of the turns. Power cannot be made, so where the voltage goes up the current comes down. A real transformer loses a little, and its efficiency says how much of the input power comes out.",
      definition:
        "- \\(\\dfrac{V_s}{V_p} = \\dfrac{N_s}{N_p}\\). Step-up if \\(N_s > N_p\\), step-down if \\(N_s < N_p\\).\n" +
        "- Ideal: \\(V_pI_p = V_sI_s\\), so \\(\\dfrac{I_s}{I_p} = \\dfrac{N_p}{N_s}\\). The current changes the opposite way to the voltage.\n" +
        "- Efficiency: \\(\\eta = \\dfrac{P_{out}}{P_{in}}\\), so \\(V_sI_s = \\eta V_pI_p\\).\n" +
        "- A resistive load R on the secondary: \\(P = \\dfrac{V_s^{2}}{R}\\). Seen from the primary it looks like \\(\\left(\\dfrac{N_p}{N_s}\\right)^{2}R\\).\n" +
        "- A.c. generator: electromagnetic induction, turning mechanical energy into electrical.\n" +
        "- Transformer: mutual induction between two coils. Galvanometer: detects a current. Quality factor: the sharpness of resonance. Resonance needs both L and C. A metal detector is described in NCERT as using resonance in an a.c. circuit.",
      formula: {
        label: "Transformer",
        latex: "\\frac{V_s}{V_p} = \\frac{N_s}{N_p} \\qquad V_sI_s = \\eta\\,V_pI_p",
      },
      authoredExample: {
        prompt:
          "A transformer steps 11 kV down to 440 V. Its primary has 2500 turns and takes 4 A, and its efficiency is \\(88\\%\\). Find the number of secondary turns and the secondary current.",
        steps: [
          "\\(N_s = 2500 \\times \\dfrac{440}{11000} = 100\\) turns.",
          "\\(P_{in} = 11000 \\times 4 = 44\\ \\text{kW}\\); \\(P_{out} = 0.88 \\times 44 = 38.72\\ \\text{kW}\\).",
          "\\(I_s = \\dfrac{38720}{440} = 88\\ \\text{A}\\). An ideal transformer would give 100 A.",
        ],
        answer: "100 turns, \\(88\\ \\text{A}\\)",
      },
      selfCheckExample: {
        prompt:
          "An ideal transformer steps 240 V down to 12 V and feeds a \\(6\\ \\Omega\\) load. Find the turns ratio, the secondary and primary currents, and the load as seen from the primary.",
        steps: [
          "\\(N_p : N_s = 240 : 12 = 20 : 1\\).",
          "\\(I_s = \\dfrac{12}{6} = 2\\ \\text{A}\\); power 24 W, so \\(I_p = \\dfrac{24}{240} = 0.1\\ \\text{A}\\).",
          "Seen from the primary: \\(\\dfrac{240}{0.1} = 2400\\ \\Omega = 20^{2} \\times 6\\).",
        ],
        answer: "20 : 1; 2 A and 0.1 A; \\(2400\\ \\Omega\\)",
      },
      practiceSet: [
        { prompt: "\\(N_p = 200\\), \\(N_s = 1000\\), \\(V_p = 50\\) V. \\(V_s\\), and step-up or step-down?", answer: "250 V, step-up" },
        { prompt: "Ideal transformer with \\(V_s = 10V_p\\). Compare \\(I_s\\) with \\(I_p\\).", answer: "\\(I_s = \\dfrac{I_p}{10}\\)" },
        { prompt: "Input 2 kW, efficiency \\(75\\%\\), output at 100 V. Output current?", answer: "\\(15\\ \\text{A}\\)" },
        { prompt: "Which device works on mutual induction?", answer: "The transformer" },
      ],
      pyqExampleId: "bff38ff1-5e9b-4b9f-9da3-23fbe60a3b11", // 30 Jan 2024: output current at 90% efficiency
      traps: [
        {
          title: "Turning the ratio upside down",
          body: "Voltage follows the turns: more turns, more volts. Current goes the other way. Write \\(\\dfrac{V_s}{V_p} = \\dfrac{N_s}{N_p}\\) before putting numbers in.",
        },
        {
          title: "Forgetting the efficiency on the current",
          body: "With losses, the output power is η times the input. Find the output current from that power, not from the ideal turns ratio.",
        },
      ],
    },
  ],
};

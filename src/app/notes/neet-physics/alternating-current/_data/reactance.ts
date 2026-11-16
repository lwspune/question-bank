import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_AC_REACTANCE_NOTE: SubtopicNote = {
  subtopicName: "AC Values and Reactance",
  title: "AC Values and Reactance",
  oneLineDefinition:
    "An alternating current as a sine wave with a peak and an rms value, and how a pure inductor and a pure capacitor oppose it: reactance ωL and 1/ωC, each with the current a quarter cycle out of step with the voltage.",
  whyItMatters:
    "Five NEET questions from 2022 to 2026. Two are about the sine wave itself (the peak as √2 times the rms value in 2022, the time from zero to the peak in 2026), one writes the voltage across an inductor from its current (Re-NEET 2024) and two are about a capacitor: its peak current from the supply in NEET 2024, and what happens to its current when the frequency drops in 2023.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphac-rms",
      name: "Peak, rms and instantaneous values",
      intuition:
        "The mains does not push current one way. It pushes it forward, then back, fifty times a second, in the shape of a sine wave. The largest value in each swing is the peak. Because the current spends most of its time below the peak, we also use the rms value: the steady current that would heat a resistor just as much. Every meter reading and every rating such as 220 V is an rms value.",
      definition:
        "- Instantaneous current: \\(i = I_0\\sin\\omega t\\), with \\(\\omega = 2\\pi f\\) and period \\(T = \\dfrac{1}{f}\\). The same shape holds for voltage.\n" +
        "- rms value: \\(I_{rms} = \\dfrac{I_0}{\\sqrt{2}} \\approx 0.707\\,I_0\\), and \\(V_{rms} = \\dfrac{V_0}{\\sqrt{2}}\\). So the peak is \\(\\sqrt{2}\\) times the rms value.\n" +
        "- ac ammeters and voltmeters read rms values. The 220 V of the mains is an rms value.\n" +
        "- Over one full cycle the average of a sine current is zero.\n" +
        "- The current is zero twice in every cycle. It rises from zero to its peak in a quarter of a period, \\(\\dfrac{T}{4}\\).",
      formula: {
        label: "AC values",
        latex: "i = I_0 \\sin \\omega t, \\qquad \\omega = 2\\pi f, \\qquad I_{rms} = \\frac{I_0}{\\sqrt{2}}, \\qquad V_{rms} = \\frac{V_0}{\\sqrt{2}}",
        symbols: [
          { symbol: "\\(I_0\\)", meaning: "peak current" },
          { symbol: "\\(\\omega\\)", meaning: "angular frequency in rad/s" },
          { symbol: "\\(f\\)", meaning: "frequency in hertz" },
        ],
      },
      authoredExample: {
        prompt:
          "The mains supply in India is 220 V at 50 Hz. Find the peak voltage and write the instantaneous voltage.",
        steps: [
          "220 V is the rms value, so \\(V_0 = 220\\sqrt{2} \\approx 311\\ \\text{V}\\).",
          "\\(\\omega = 2\\pi f = 2\\pi \\times 50 = 100\\pi\\ \\text{rad/s}\\).",
          "So \\(v = 311\\sin(100\\pi t)\\ \\text{V}\\).",
        ],
        answer: "\\(V_0 \\approx 311\\ \\text{V}\\), \\(v = 311\\sin(100\\pi t)\\ \\text{V}\\)",
      },
      selfCheckExample: {
        prompt:
          "A current is \\(i = 10\\sin(100\\pi t)\\) A. What does an ac ammeter in the circuit read, and what is the frequency?",
        steps: [
          "The ammeter reads rms: \\(\\dfrac{10}{\\sqrt{2}} = 5\\sqrt{2} \\approx 7.07\\ \\text{A}\\).",
          "\\(\\omega = 100\\pi\\), so \\(f = \\dfrac{100\\pi}{2\\pi} = 50\\ \\text{Hz}\\).",
        ],
        answer: "About 7.07 A; 50 Hz",
      },
      practiceSet: [
        { prompt: "An alternating current has a peak value of \\(2\\sqrt{2}\\) A. What does an ac ammeter read?", answer: "2 A" },
        { prompt: "What is the peak voltage of a 100 V rms supply?", answer: "\\(100\\sqrt{2} \\approx 141\\ \\text{V}\\)" },
        { prompt: "What is the average value of a sine-wave current over one full cycle?", answer: "Zero" },
        { prompt: "How many times each second is a 50 Hz alternating current zero?", answer: "100 times" },
      ],
      pyqExampleId: "3200c68b-045c-4480-b1e6-fcd6bafb9a26",
      traps: [
        {
          title: "Meters and ratings are rms",
          body: "220 V mains means 220 V rms. Its peak is \\(220\\sqrt{2} \\approx 311\\ \\text{V}\\). An ac ammeter or voltmeter always shows the rms value, never the peak.",
        },
        {
          title: "Zero to peak is a quarter cycle",
          body: "A sine current rises from zero to its peak in \\(\\dfrac{T}{4}\\), not \\(\\dfrac{T}{2}\\). At 50 Hz that is \\(\\dfrac{1}{200}\\) s, or 5 ms.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphac-inductor",
      name: "An inductor in an ac circuit",
      intuition:
        "A coil fights any change in the current through it, by the emf it induces in itself. The faster the current changes, the harder the coil fights. So its opposition, the inductive reactance, grows with frequency, and for steady dc it is zero. The voltage across the coil is largest when the current is changing fastest, which is when the current passes through zero. That puts the voltage a quarter cycle ahead of the current.",
      definition:
        "- Inductive reactance: \\(X_L = \\omega L = 2\\pi fL\\), measured in ohm. For dc, \\(f = 0\\) and \\(X_L = 0\\).\n" +
        "- Current: \\(I_{rms} = \\dfrac{V_{rms}}{X_L}\\), or peak with peak: \\(V_0 = I_0X_L\\).\n" +
        "- If \\(i = I_0\\sin\\omega t\\), the voltage is \\(v = I_0\\omega L\\sin\\left(\\omega t + \\dfrac{\\pi}{2}\\right) = I_0\\omega L\\cos\\omega t\\).\n" +
        "- **Phase:** in a pure inductor the voltage leads the current by \\(\\dfrac{\\pi}{2}\\), so the current lags.\n" +
        "- Average power over a cycle is zero: the coil stores energy in its magnetic field and gives it back.",
      formula: {
        label: "Inductive reactance",
        latex: "X_L = \\omega L = 2\\pi f L, \\qquad V_0 = I_0 X_L",
      },
      authoredExample: {
        prompt:
          "A pure inductor of 0.2 H is connected to a 220 V, 50 Hz supply. Find its reactance and the rms current.",
        steps: [
          "\\(X_L = 2\\pi fL = 2\\pi \\times 50 \\times 0.2 = 20\\pi \\approx 62.8\\ \\Omega\\).",
          "\\(I_{rms} = \\dfrac{V_{rms}}{X_L} = \\dfrac{220}{62.8} \\approx 3.5\\ \\text{A}\\).",
        ],
        answer: "\\(X_L \\approx 62.8\\ \\Omega\\), \\(I_{rms} \\approx 3.5\\ \\text{A}\\)",
      },
      selfCheckExample: {
        prompt:
          "A pure inductor draws 2 A from a 50 Hz supply. The frequency is raised to 100 Hz with the same voltage. What current flows now?",
        steps: [
          "\\(X_L = 2\\pi fL\\), so doubling f doubles \\(X_L\\).",
          "With the same voltage, \\(I = \\dfrac{V}{X_L}\\) halves: 1 A.",
        ],
        answer: "1 A",
      },
      practiceSet: [
        { prompt: "What is the reactance of a 0.1 H inductor at \\(\\omega = 500\\) rad/s?", answer: "\\(50\\ \\Omega\\)" },
        { prompt: "What is the reactance of an inductor to a steady dc current?", answer: "Zero" },
        { prompt: "In a pure inductor, does the current lead or lag the voltage, and by how much?", answer: "It lags by \\(\\dfrac{\\pi}{2}\\)" },
        { prompt: "What average power does a pure inductor take from an ac source over a full cycle?", answer: "Zero" },
      ],
      pyqExampleId: "530aa23c-d1ef-4dfe-b1bb-c2ea4399f874",
      traps: [
        {
          title: "A given ω is already in rad/s",
          body: "In \\(\\sin(500t)\\) or \\(\\sin(100\\pi t)\\), the number that multiplies t is \\(\\omega\\) itself. Use \\(2\\pi f\\) only when the frequency is given in hertz.",
        },
        {
          title: "In an inductor the voltage leads",
          body: "The voltage across a pure inductor reaches its peak a quarter cycle before the current does. The current lags the voltage; it does not lead it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphac-capacitor",
      name: "A capacitor in an ac circuit",
      intuition:
        "On ac a capacitor charges, discharges and charges the other way, every cycle. Charge flows on and off its plates, so a current flows in the wires even though no charge crosses the gap. The faster this happens, the more current flows for the same voltage. So the capacitive reactance falls as the frequency rises, and for steady dc it is infinite. The current is largest when the voltage is changing fastest, so the current is a quarter cycle ahead of the voltage.",
      definition:
        "- Capacitive reactance: \\(X_C = \\dfrac{1}{\\omega C} = \\dfrac{1}{2\\pi fC}\\), in ohm. For dc it is infinite: a capacitor blocks steady current.\n" +
        "- Current: \\(I_{rms} = \\dfrac{V_{rms}}{X_C} = V_{rms}\\,\\omega C\\), or peak with peak.\n" +
        "- If \\(v = V_0\\sin\\omega t\\), the current is \\(i = V_0\\omega C\\sin\\left(\\omega t + \\dfrac{\\pi}{2}\\right)\\).\n" +
        "- **Phase:** in a pure capacitor the current leads the voltage by \\(\\dfrac{\\pi}{2}\\).\n" +
        "- Between the plates no charge flows, but the changing electric field there gives a **displacement current** equal to the conduction current in the wires.\n" +
        "- Average power over a cycle is zero.",
      formula: {
        label: "Capacitive reactance",
        latex: "X_C = \\frac{1}{\\omega C} = \\frac{1}{2\\pi f C}, \\qquad I_0 = V_0 \\omega C",
      },
      authoredExample: {
        prompt:
          "A \\(20\\ \\mu\\text{F}\\) capacitor is connected to a 100 V rms source with \\(\\omega = 500\\) rad/s. Find its reactance, the rms current and the peak current.",
        steps: [
          "\\(X_C = \\dfrac{1}{\\omega C} = \\dfrac{1}{500 \\times 20 \\times 10^{-6}} = \\dfrac{1}{0.01} = 100\\ \\Omega\\).",
          "\\(I_{rms} = \\dfrac{100}{100} = 1\\ \\text{A}\\).",
          "Peak current \\(= \\sqrt{2} \\times 1 \\approx 1.41\\ \\text{A}\\).",
        ],
        answer: "\\(100\\ \\Omega\\), 1 A, about 1.41 A",
      },
      selfCheckExample: {
        prompt:
          "The wires leading to a capacitor in an ac circuit carry an rms current of 0.5 A. What is the rms displacement current between its plates?",
        steps: [
          "No charge crosses the gap, but the displacement current there equals the conduction current in the wires.",
          "So it is 0.5 A.",
        ],
        answer: "0.5 A",
      },
      practiceSet: [
        { prompt: "What is the reactance of a \\(10\\ \\mu\\text{F}\\) capacitor at \\(\\omega = 1000\\) rad/s?", answer: "\\(100\\ \\Omega\\)" },
        { prompt: "What is the reactance of a capacitor to a steady dc current?", answer: "Infinite: it blocks dc" },
        { prompt: "In a pure capacitor, does the current lead or lag the voltage?", answer: "It leads by \\(\\dfrac{\\pi}{2}\\)" },
        { prompt: "The capacitance is doubled at the same frequency. What happens to the capacitive reactance?", answer: "It halves" },
      ],
      pyqExampleId: "10e8b5ba-3c5d-43e4-9726-e3535e97054d",
      traps: [
        {
          title: "Capacitive reactance falls with frequency",
          body: "\\(X_C = \\dfrac{1}{2\\pi fC}\\) goes down as f or C goes up. Raising the frequency lets more current through a capacitor, unlike an inductor.",
        },
        {
          title: "In a capacitor the current leads",
          body: "In a pure capacitor the current leads the voltage by \\(\\dfrac{\\pi}{2}\\). A memory aid is CIVIL: in C, I leads V; V leads I in L.",
        },
      ],
    },
  ],
};

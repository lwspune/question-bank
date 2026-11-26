import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_AC_REACTANCE_NOTE: SubtopicNote = {
  subtopicName: "AC Voltage Applied to an Inductor and a Capacitor",
  title: "AC Voltage Across an Inductor and a Capacitor: Reactance and Phase",
  oneLineDefinition:
    "The current through a pure inductor and through a pure capacitor, the phase of each current, inductive and capacitive reactance, and how each reactance changes with frequency.",
  whyItMatters:
    "24 questions, seventeen of them from board papers. The board asks you to derive the current through a capacitor and its reactance (2023), identify an element or state its phase from how the current leads or lags (2023, 2024, 2025, 2026), find a reactance or a current (2023, 2024), say how a reactance changes with frequency or capacitance (2023, 2024, 2025), draw graphs of resistance and reactance against frequency (2024, 2025), read an inductance or capacitance ratio from a reactance graph (2024, 2026), sketch the voltage across an inductor from its current graph (2025), and explain how an inductor or a capacitor behaves on dc and on ac (2024, 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpac-inductor",
      name: "AC voltage across a pure inductor",
      intuition:
        "An inductor fights any change in the current through it by producing a back emf. With ac the current is always changing, so the inductor always opposes it. The faster the change, which means the higher the frequency, the stronger the opposition. Because the voltage across an inductor depends on how fast the current changes, the voltage is largest when the current is passing through zero, so the current reaches its peak a quarter cycle after the voltage.",
      definition:
        "- **Derivation outline:**\n" +
        "- Loop rule for a pure inductor across \\(v = v_m \\sin \\omega t\\): \\(L\\dfrac{di}{dt} = v_m \\sin \\omega t\\).\n" +
        "- Integrate: \\(i = -\\dfrac{v_m}{\\omega L} \\cos \\omega t = i_m \\sin\\left(\\omega t - \\dfrac{\\pi}{2}\\right)\\), with \\(i_m = \\dfrac{v_m}{\\omega L}\\).\n" +
        "- Compare with Ohm's law: \\(X_L = \\omega L = 2\\pi\\nu L\\), the **inductive reactance**, in ohms. So \\(i_m = \\dfrac{v_m}{X_L}\\) and \\(I = \\dfrac{V}{X_L}\\).\n" +
        "- The current **lags** the voltage by \\(\\pi/2\\), a quarter of a cycle. In the phasor diagram the current phasor is \\(\\pi/2\\) behind the voltage phasor.\n" +
        "- The average power supplied to a pure inductor over a complete cycle is zero.\n" +
        "- On a steady dc supply \\(X_L = 0\\) and an ideal inductor is just a conductor; at high frequency \\(X_L\\) is large and the current is small.\n" +
        "- Putting an iron rod inside a coil increases its inductance, so \\(X_L\\) rises and a bulb in series with it glows less.",
      formula: {
        label: "Pure inductor",
        latex: "i = i_m \\sin\\left(\\omega t - \\frac{\\pi}{2}\\right), \\qquad X_L = \\omega L = 2\\pi\\nu L, \\qquad I = \\frac{V}{X_L}",
        symbols: [
          { symbol: "\\(X_L\\)", meaning: "inductive reactance in ohms" },
          { symbol: "\\(L\\)", meaning: "self-inductance in henry" },
          { symbol: "\\(I, V\\)", meaning: "rms current and rms voltage" },
        ],
      },
      authoredExample: {
        prompt:
          "An inductor of 0.5 H and negligible resistance is connected to a 220 V, 50 Hz supply. Find the inductive reactance, the rms current and the peak current.",
        steps: [
          "Given: \\(L = 0.5\\) H, \\(V = 220\\) V, \\(\\nu = 50\\) Hz.",
          "Formula: \\(X_L = 2\\pi\\nu L\\), \\(I = \\dfrac{V}{X_L}\\).",
          "\\(X_L = 2 \\times 3.142 \\times 50 \\times 0.5 = 157.1\\ \\Omega\\).",
          "\\(I = \\dfrac{220}{157.1} = 1.40\\) A.",
          "\\(i_m = \\sqrt{2}\\, I = 1.414 \\times 1.40 = 1.98\\) A, lagging the voltage by \\(\\pi/2\\).",
        ],
        answer: "157.1 Ω; 1.40 A rms; 1.98 A peak",
      },
      selfCheckExample: {
        prompt: "A coil of negligible resistance draws 2 A from a 100 V, 50 Hz supply. Find its inductance.",
        steps: [
          "\\(X_L = \\dfrac{V}{I} = \\dfrac{100}{2} = 50\\ \\Omega\\).",
          "\\(L = \\dfrac{X_L}{2\\pi\\nu} = \\dfrac{50}{2 \\times 3.142 \\times 50} = 0.159\\) H.",
        ],
        answer: "0.159 H",
      },
      practiceSet: [
        { prompt: "By what fraction of a cycle does the current in a pure inductor lag the voltage?", answer: "A quarter of a cycle (\\(\\pi/2\\))" },
        { prompt: "The frequency of the supply across an inductor is doubled. What happens to its reactance?", answer: "It doubles" },
        { prompt: "What is the average power taken by a pure inductor over a complete cycle?", answer: "Zero" },
        { prompt: "What is the voltage across an ideal inductor while the current through it is steady?", answer: "Zero, since \\(L\\,di/dt = 0\\)" },
      ],
      pyqExampleId: "c80d9459-e29c-4770-8472-43d11e397a17",
      traps: [
        {
          title: "Leads or lags the wrong way round",
          body: "In an inductor the current lags the voltage by \\(\\pi/2\\), so \\(i = i_m \\sin(\\omega t - \\pi/2)\\). A plus sign there describes a capacitor.",
        },
        {
          title: "Drawing the voltage the same shape as the current",
          body: "The voltage across an inductor is \\(L\\,di/dt\\), so it follows the SLOPE of the current graph. A current rising at a steady rate gives a constant voltage, not a rising one.",
        },
        {
          title: "Calling an inductor an open circuit on dc",
          body: "On steady dc an ideal inductor has zero reactance and behaves as a plain conductor. It is the capacitor that blocks dc.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpac-capacitor",
      name: "AC voltage across a pure capacitor",
      intuition:
        "A capacitor on dc charges once and then the current stops. On ac it is charged one way, discharged, then charged the other way, again and again, so a current keeps flowing in the wires. The charge on it follows the voltage, and the current is the rate at which that charge changes, so the current is largest when the voltage is passing through zero. The current therefore reaches its peak a quarter cycle before the voltage.",
      definition:
        "- **Derivation outline:**\n" +
        "- Loop rule for a pure capacitor across \\(v = v_m \\sin \\omega t\\): \\(\\dfrac{q}{C} = v_m \\sin \\omega t\\), so \\(q = C v_m \\sin \\omega t\\).\n" +
        "- Current: \\(i = \\dfrac{dq}{dt} = \\omega C v_m \\cos \\omega t = i_m \\sin\\left(\\omega t + \\dfrac{\\pi}{2}\\right)\\), with \\(i_m = \\dfrac{v_m}{1/\\omega C}\\).\n" +
        "- Compare with Ohm's law: \\(X_C = \\dfrac{1}{\\omega C} = \\dfrac{1}{2\\pi\\nu C}\\), the **capacitive reactance**, in ohms. So \\(I = \\dfrac{V}{X_C}\\).\n" +
        "- The current **leads** the voltage by \\(\\pi/2\\), a quarter of a cycle.\n" +
        "- The average power supplied to a pure capacitor over a complete cycle is zero.\n" +
        "- On dc (\\(\\nu = 0\\)) \\(X_C\\) is infinite: once charged, the capacitor stops the current, so a lamp in series with it does not glow. On ac the lamp glows, and less brightly if C is reduced, since \\(X_C\\) then rises.",
      formula: {
        label: "Pure capacitor",
        latex: "i = i_m \\sin\\left(\\omega t + \\frac{\\pi}{2}\\right), \\qquad X_C = \\frac{1}{\\omega C} = \\frac{1}{2\\pi\\nu C}, \\qquad I = \\frac{V}{X_C}",
        symbols: [
          { symbol: "\\(X_C\\)", meaning: "capacitive reactance in ohms" },
          { symbol: "\\(C\\)", meaning: "capacitance in farad" },
        ],
      },
      authoredExample: {
        prompt:
          "A \\(10\\ \\mu\\text{F}\\) capacitor is connected to a 220 V, 50 Hz supply. Find the capacitive reactance, the rms current and the peak current. How is the current related in phase to the voltage?",
        steps: [
          "Given: \\(C = 10\\ \\mu\\text{F} = 10 \\times 10^{-6}\\) F, \\(V = 220\\) V, \\(\\nu = 50\\) Hz.",
          "Formula: \\(X_C = \\dfrac{1}{2\\pi\\nu C}\\), \\(I = \\dfrac{V}{X_C}\\).",
          "\\(X_C = \\dfrac{1}{2 \\times 3.142 \\times 50 \\times 10 \\times 10^{-6}} = 318.3\\ \\Omega\\).",
          "\\(I = \\dfrac{220}{318.3} = 0.691\\) A; \\(i_m = 1.414 \\times 0.691 = 0.977\\) A.",
          "The current leads the voltage by \\(\\pi/2\\).",
        ],
        answer: "318.3 Ω; 0.691 A rms; 0.977 A peak; current leads by π/2",
      },
      selfCheckExample: {
        prompt: "A \\(20\\ \\mu\\text{F}\\) capacitor is connected to a 100 V, 50 Hz supply. Find the rms current.",
        steps: [
          "\\(X_C = \\dfrac{1}{2 \\times 3.142 \\times 50 \\times 20 \\times 10^{-6}} = 159.2\\ \\Omega\\).",
          "\\(I = \\dfrac{100}{159.2} = 0.628\\) A.",
        ],
        answer: "0.628 A",
      },
      practiceSet: [
        { prompt: "The capacitance and the frequency are both halved. By what factor does the capacitive reactance change?", answer: "It becomes four times as large" },
        { prompt: "A lamp is joined in series with a capacitor across a dc battery. Does the lamp glow once the capacitor is charged?", answer: "No. No current flows once the capacitor is charged" },
        { prompt: "A capacitor has a reactance of 100 Ω at 50 Hz. What is its reactance at 200 Hz?", answer: "25 Ω" },
      ],
      pyqExampleId: "5b018027-1916-4d26-9dbf-d2f86c248d5d",
      traps: [
        {
          title: "Forgetting to convert microfarads",
          body: "\\(1\\ \\mu\\text{F} = 10^{-6}\\) F. Putting C in microfarads straight into \\(1/2\\pi\\nu C\\) makes the reactance a million times too small.",
        },
        {
          title: "No graph when one is asked",
          body: "When the question says 'plot a graph of i against ωt', draw v and i on the same axes and show i reaching its peak a quarter cycle before v. The graph carries its own mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpac-frequency",
      name: "How resistance and reactance change with frequency",
      intuition:
        "A resistor does not care how fast the current changes. An inductor opposes fast change, so it opposes high frequencies. A capacitor has no time to charge up at high frequency, so it lets high frequencies through and blocks low ones. These three graphs explain almost everything in a series LCR circuit.",
      definition:
        "- \\(X_L = 2\\pi\\nu L\\) rises in proportion to frequency; \\(X_C = \\dfrac{1}{2\\pi\\nu C}\\) falls as frequency rises. R does not depend on frequency.\n" +
        "- Ratio of the two reactances: \\(\\dfrac{X_L}{X_C} = \\dfrac{\\omega L}{1/\\omega C} = \\omega^2 LC\\), a pure number.\n" +
        "- A graph of \\(X_L\\) against \\(\\omega\\) is a straight line through the origin with slope L. A graph of \\(X_C\\) against \\(1/\\omega\\) is a straight line through the origin with slope \\(1/C\\).\n" +
        "- The board asks you to draw these graphs: label both axes and give the right shape.",
      table: {
        columns: ["Element", "Opposition to ac", "Graph against frequency", "On dc", "Current compared with voltage"],
        rows: [
          {
            cells: ["Resistor", "Resistance R", "Horizontal straight line: R does not change", "Same R", "In phase"],
          },
          {
            cells: ["Pure inductor", "\\(X_L = 2\\pi\\nu L\\)", "Straight line through the origin", "Zero reactance: a plain conductor", "Lags by \\(\\pi/2\\)"],
            pyqExampleId: "d69cf0f9-4b3b-440f-9c46-2cd539c1aa64",
            noteAmber: "Board 2023 asked what happens as the frequency is lowered: the inductor's reactance falls and the capacitor's rises.",
          },
          {
            cells: ["Pure capacitor", "\\(X_C = \\dfrac{1}{2\\pi\\nu C}\\)", "Curve falling as \\(1/\\nu\\), very large at low frequency, never touching either axis", "Infinite reactance: blocks the current", "Leads by \\(\\pi/2\\)"],
          },
        ],
      },
      practiceSet: [
        { prompt: "What is the shape of a graph of capacitive reactance against \\(1/\\omega\\)?", answer: "A straight line through the origin, of slope \\(1/C\\)" },
        { prompt: "Write the ratio of inductive to capacitive reactance in terms of \\(\\omega\\), L and C.", answer: "\\(\\omega^2 LC\\)" },
        { prompt: "Which element lets high frequency ac pass easily but blocks dc?", answer: "A capacitor" },
      ],
      pyqExampleId: "b53eec1c-e57b-4801-ad03-8d530109e9bb",
      traps: [
        {
          title: "Reading the slope the wrong way",
          body: "On \\(X_L\\) against \\(\\omega\\), the steeper line has the larger L. On \\(X_C\\) against \\(1/\\omega\\), the slope is \\(1/C\\), so the steeper line has the SMALLER C.",
        },
        {
          title: "Drawing the capacitor graph as a straight line",
          body: "Against frequency, \\(X_C\\) is a curve falling as \\(1/\\nu\\) that never meets the axes. Only against \\(1/\\nu\\) is it a straight line.",
        },
      ],
    },
  ],
};

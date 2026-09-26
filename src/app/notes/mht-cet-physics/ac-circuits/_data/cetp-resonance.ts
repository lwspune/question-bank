import type { SubtopicNote } from "@/app/notes/_types";

export const RESONANCE_NOTE: SubtopicNote = {
  subtopicName: "Resonance in Series LCR Circuits",
  title: "Resonance in Series LCR Circuits",
  oneLineDefinition:
    "At the frequency where X_L = X_C, a series LCR circuit behaves as a pure resistor: impedance is least (Z = R), current is greatest and in phase with the voltage, and f₀ = 1/2π√(LC).",
  whyItMatters:
    "32 PYQs, five HARD. Three shapes: the resonant frequency and what changes it (only L and C — never R), what happens at resonance (Z least, current greatest, zero phase), " +
    "and the large voltages across L and C at resonance, measured by the quality factor.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-resonant-frequency",
      name: "The Resonant Frequency",
      intuition:
        "X_L rises with frequency and X_C falls; they cross at one frequency, set only by L and C. Change L or C and f₀ moves as 1/√(LC); change R and it does not move at all.",
      definition:
        "- \\(\\omega_0 = \\dfrac{1}{\\sqrt{LC}}\\), \\(f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}\\). Independent of \\(R\\).\n" +
        "- \\(L \\to 3L\\), \\(C \\to 6C\\): \\(f \\to \\dfrac{f}{\\sqrt{18}} = \\dfrac{f}{3\\sqrt{2}}\\). Keep \\(f_0\\) when \\(C \\to 3C\\): \\(L \\to \\dfrac{L}{3}\\).\n" +
        "- Frequency doubled, keep resonance: \\(LC\\) must fall 4 times — e.g. both halved.\n" +
        "- Capacitance for resonance (or 'voltage and current in phase', 'maximum current'): \\(C = \\dfrac{1}{\\omega^2L} = \\dfrac{1}{4\\pi^2f^2L}\\).\n" +
        "- Combined elements: series inductors add, parallel capacitors add — then use \\(L_{\\text{eq}}C_{\\text{eq}}\\).",
      formula: {
        label: "Resonant frequency",
        latex: "f_0 = \\frac{1}{2\\pi\\sqrt{LC}}",
      },
      authoredExample: {
        prompt: "\\(L = 0.4\\) H and \\(C = 10\\,\\mu\\)F in a series circuit. Resonant frequency?",
        steps: ["\\(\\sqrt{LC} = \\sqrt{4 \\times 10^{-6}} = 2 \\times 10^{-3}\\).", "\\(f_0 = \\dfrac{1}{2\\pi \\times 2 \\times 10^{-3}} \\approx 79.6\\) Hz."],
        answer: "≈ 80 Hz",
      },
      selfCheckExample: {
        prompt: "L is doubled and C is made 8 times. New resonant frequency?",
        steps: ["\\(LC \\times 16\\), so \\(f \\times \\dfrac{1}{4}\\)."],
        answer: "\\(\\dfrac{f}{4}\\)",
      },
      practiceSet: [
        { prompt: "The resistance is made a third. Resonant frequency?", answer: "Unchanged" },
        { prompt: "\\(L = \\dfrac{2}{\\pi^2}\\) H, 50 Hz. C for resonance?", answer: "\\(50\\,\\mu\\)F" },
        { prompt: "L tripled and C increased by 3C (to 4C). New frequency?", answer: "\\(\\dfrac{f}{2\\sqrt{3}}\\)" },
      ],
      pyqExampleId: "5d52bcab-1df4-4c21-8f28-8fb94b9fdf47",
      traps: [
        {
          title: "'Increased by 3C' is 4C",
          body:
            "'C increased BY 3C' makes 4C; 'changed TO 3C' makes 3C. The two readings land on different options, \\(\\frac{f}{2\\sqrt{3}}\\) and \\(\\frac{f}{3}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-resonance-behaviour",
      name: "What Happens at Resonance",
      intuition:
        "At resonance the two reactances cancel, so the circuit looks like its resistor alone. Sweep the frequency upward and the impedance falls to R and rises again — so the current, and a series bulb's brightness, rise to a peak and fall.",
      definition:
        "- \\(Z_{\\min} = R\\), \\(I_{\\max} = \\dfrac{V}{R}\\), \\(\\phi = 0\\), power factor 1.\n" +
        "- \\(Z\\) against \\(f\\): large at low \\(f\\) (\\(X_C\\)), least at \\(f_0\\), large again at high \\(f\\) (\\(X_L\\)).\n" +
        "- \\(V_L = V_C\\) and they cancel: the whole supply appears across \\(R\\).\n" +
        "- A circuit with L and C can never pass more current than R alone at the same voltage: \\(Z \\ge R\\).\n" +
        "- PARALLEL LC at resonance: current from the source least, voltage across the pair greatest.",
      formula: {
        label: "At resonance",
        latex: "X_L = X_C, \\quad Z = R, \\quad \\phi = 0",
      },
      authoredExample: {
        prompt: "A series LCR circuit with \\(R = 40\\,\\Omega\\) is at resonance on 200 V. Impedance, current and phase?",
        steps: ["\\(Z = R = 40\\,\\Omega\\).", "\\(I = 5\\) A, in phase with the voltage."],
        answer: "40 Ω; 5 A; zero phase",
      },
      selfCheckExample: {
        prompt: "A bulb, a coil and a capacitor in series; the supply frequency is raised steadily through resonance. The bulb?",
        steps: ["Current peaks at resonance."],
        answer: "Brightens to a maximum, then dims",
      },
      practiceSet: [
        { prompt: "Impedance of a series LCR circuit at resonance?", answer: "R" },
        { prompt: "At resonance \\(V_L = V_C = 100\\) V on a 60 V supply. Voltage across R?", answer: "60 V — the whole supply" },
      ],
      pyqExampleId: "93934042-c9e7-404f-ae5c-593dda65aa59",
      traps: [
        {
          title: "Impedance zero at resonance",
          body:
            "The reactances cancel, the resistance does not: \\(Z = R\\), never zero. 'At resonance, impedance is zero' is a planted false statement.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-resonance-voltages-q",
      name: "Voltages Across L and C at Resonance, and the Quality Factor",
      intuition:
        "At resonance the current is limited only by R, so it can be large, and I × X_L across the coil can be far larger than the supply voltage. The quality factor Q = X_L/R says how many times larger — and how sharp the resonance is.",
      definition:
        "- \\(I = \\dfrac{V}{R}\\); \\(V_L = V_C = IX_L\\). 0.1 V, \\(2\\,\\Omega\\), \\(X_L = 500\\,\\Omega\\) ⇒ 25 V across the coil, 250 times the supply.\n" +
        "- \\(Q = \\dfrac{V_L}{V_R} = \\dfrac{\\omega_0L}{R} = \\dfrac{1}{R}\\sqrt{\\dfrac{L}{C}}\\); bandwidth \\(= \\dfrac{R}{L}\\) rad/s.\n" +
        "- From measured voltages: \\(L = \\dfrac{V_LR}{V_R\\omega}\\), \\(C = \\dfrac{V_R}{V_L\\omega R}\\).\n" +
        "- 'Ratio of energies in L and C at maximum current': the papers use \\(\\dfrac{\\frac{1}{2}LI^2}{\\frac{1}{2}CV^2}\\) with \\(V\\) the applied voltage, giving \\(\\dfrac{L}{CR^2}\\).",
      formula: {
        label: "Quality factor",
        latex: "Q = \\frac{V_L}{V_R} = \\frac{1}{R}\\sqrt{\\frac{L}{C}}",
      },
      authoredExample: {
        prompt: "At resonance \\(X_L = X_C = 200\\,\\Omega\\), \\(R = 10\\,\\Omega\\), supply 5 V. Current, voltage across L, and Q?",
        steps: ["\\(I = \\dfrac{5}{10} = 0.5\\) A.", "\\(V_L = 0.5 \\times 200 = 100\\) V; \\(Q = \\dfrac{200}{10} = 20\\)."],
        answer: "0.5 A; 100 V; 20",
      },
      selfCheckExample: {
        prompt: "At resonance \\(V_R = 100\\) V and \\(V_L = 400\\) V. Quality factor?",
        steps: ["\\(Q = \\dfrac{V_L}{V_R}\\)."],
        answer: "4",
      },
      practiceSet: [
        { prompt: "At resonance, can the voltage across the inductor exceed the supply voltage?", answer: "Yes — by the factor Q" },
        { prompt: "\\(C = 2\\,\\mu\\)F, \\(L = 5\\) mH, \\(R = 5\\,\\Omega\\): the papers' \\(\\dfrac{L}{CR^2}\\)?", answer: "100" },
      ],
      pyqExampleId: "f581d379-72bc-411f-a3a7-450da288f00d",
      traps: [
        {
          title: "Capping V_L at the supply voltage",
          body:
            "Series resonance MAGNIFIES the voltage on L and C. 0.1 V applied can put 25 V across the coil; the answer below the supply voltage is there for students who assume otherwise.",
        },
      ],
    },
  ],
  related: [
    { label: "Series LCR — Impedance and Phase", href: "/notes/mht-cet-physics/ac-circuits/cetp-lcr-impedance" },
    { label: "LC Oscillations, Transformer and Generator", href: "/notes/mht-cet-physics/ac-circuits/cetp-lc-transformer" },
  ],
};

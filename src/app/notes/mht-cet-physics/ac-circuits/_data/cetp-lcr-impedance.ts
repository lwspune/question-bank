import type { SubtopicNote } from "@/app/notes/_types";

export const LCR_IMPEDANCE_NOTE: SubtopicNote = {
  subtopicName: "Series LCR — Impedance, Phase and Phasors",
  title: "Series LR, RC and LCR: Impedance, Phase and Phasors",
  oneLineDefinition:
    "In a series circuit the resistor's voltage and the reactances' voltages are 90° apart, so they add like the sides of a right triangle: Z = √(R² + (X_L − X_C)²), and tan φ = (X_L − X_C)/R gives the phase.",
  whyItMatters:
    "33 PYQs, five HARD. Three shapes: an impedance and a current (including the coil that draws one current on d.c. and less on a.c.), " +
    "a phase angle — or a component found from a given phase — and the voltages across R, L and C adding as phasors, never as numbers.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-impedance",
      name: "Impedance and Current",
      intuition:
        "Impedance is the a.c. resistance of the whole circuit. Resistance and net reactance are at right angles, so they combine by Pythagoras. A real coil has both: on d.c. only its resistance shows; on a.c. its reactance joins in and the current drops.",
      definition:
        "- \\(Z = \\sqrt{R^2 + (X_L - X_C)^2}\\); \\(I = \\dfrac{V}{Z}\\). LR only: \\(Z = \\sqrt{R^2 + 4\\pi^2f^2L^2}\\).\n" +
        "- A coil on d.c. then a.c.: \\(R = \\dfrac{V}{I_{\\text{dc}}}\\), \\(Z = \\dfrac{V}{I_{\\text{ac}}}\\), \\(X_L = \\sqrt{Z^2 - R^2}\\), \\(L = \\dfrac{X_L}{2\\pi f}\\).\n" +
        "- Adding a capacitor to an LR circuit reduces the net reactance (for \\(X_C < 2X_L\\)), so the current RISES.\n" +
        "- Admittance \\(= \\dfrac{1}{Z}\\).\n" +
        "- With \\(|X_L - X_C| = R\\): \\(Z = \\sqrt{2}R\\).",
      formula: {
        label: "Impedance",
        latex: "Z = \\sqrt{R^2 + (X_L - X_C)^2}",
      },
      authoredExample: {
        prompt: "\\(R = 30\\,\\Omega\\) and \\(X_L = 40\\,\\Omega\\) are in series on 100 V. Impedance and current?",
        steps: ["\\(Z = \\sqrt{900 + 1600} = 50\\,\\Omega\\).", "\\(I = \\dfrac{100}{50} = 2\\) A."],
        answer: "50 Ω; 2 A",
      },
      selfCheckExample: {
        prompt: "A coil draws 2 A from 20 V d.c. and 1 A from 20 V, 50 Hz a.c. Its inductance?",
        steps: ["\\(R = 10\\,\\Omega\\), \\(Z = 20\\,\\Omega\\), \\(X_L = \\sqrt{400 - 100} \\approx 17.3\\,\\Omega\\).", "\\(L = \\dfrac{17.3}{314} \\approx 0.055\\) H."],
        answer: "≈ 0.055 H",
      },
      practiceSet: [
        { prompt: "\\(L = \\dfrac{0.3}{\\pi}\\) H, \\(R = 40\\,\\Omega\\), 230 V, 50 Hz. Z and I?", answer: "50 Ω; 4.6 A" },
        { prompt: "\\(E = 4\\cos(1000t)\\) on 3 mH and \\(4\\,\\Omega\\). Peak current?", answer: "0.8 A" },
        { prompt: "What is the reciprocal of impedance called?", answer: "Admittance" },
      ],
      pyqExampleId: "27fa167d-9c60-487a-b50d-faa2a9d2fe9c",
      traps: [
        {
          title: "Adding R and X directly",
          body:
            "\\(Z = R + X_L\\) is the tempting shortcut and is always wrong: 30 Ω and 40 Ω make 50 Ω, not 70 Ω.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-phase-angle",
      name: "The Phase Angle",
      intuition:
        "The phase angle measures how far the circuit is from purely resistive. More inductive reactance tips the voltage ahead of the current; more capacitive tips it behind. Given the angle, the same equation runs backwards to find L, C or R.",
      definition:
        "- \\(\\tan\\phi = \\dfrac{X_L - X_C}{R}\\); \\(\\cos\\phi = \\dfrac{R}{Z}\\).\n" +
        "- \\(X_L > X_C\\): voltage LEADS; \\(X_C > X_L\\): current leads. Current leading by \\(45^\\circ\\) ⇒ \\(X_L = X_C - R\\).\n" +
        "- Voltage leading by \\(45^\\circ\\): \\(\\omega L - \\dfrac{1}{\\omega C} = R\\), so \\(L = \\dfrac{1 + 2\\pi fCR}{4\\pi^2f^2C}\\).\n" +
        "- From \\(Z\\) and \\(\\phi\\): \\(R = Z\\cos\\phi\\). 15 V, 0.5 A, \\(\\phi = 60^\\circ\\): \\(Z = 30\\), \\(R = 15\\,\\Omega\\).",
      formula: {
        label: "Phase angle",
        latex: "\\tan\\phi = \\frac{X_L - X_C}{R}",
      },
      authoredExample: {
        prompt: "\\(R = 100\\,\\Omega\\), \\(X_L = 250\\,\\Omega\\), \\(X_C = 150\\,\\Omega\\). Phase angle, and which leads?",
        steps: ["\\(\\tan\\phi = \\dfrac{100}{100} = 1\\), so \\(\\phi = 45^\\circ\\).", "\\(X_L > X_C\\): the voltage leads."],
        answer: "45°, voltage leading",
      },
      selfCheckExample: {
        prompt: "The current leads the voltage by \\(45^\\circ\\), with \\(R = 20\\,\\Omega\\) and \\(X_L = 10\\,\\Omega\\). \\(X_C\\)?",
        steps: ["\\(X_C - X_L = R \\Rightarrow X_C = 30\\,\\Omega\\)."],
        answer: "30 Ω",
      },
      practiceSet: [
        { prompt: "Coil of \\(80\\,\\Omega\\) with voltage leading by \\(45^\\circ\\) at 480 Hz. L?", answer: "\\(\\dfrac{1}{12\\pi}\\) H" },
        { prompt: "\\(R = \\dfrac{X_L}{2} = 2X_C\\). Z and \\(\\tan\\phi\\)?", answer: "\\(\\dfrac{\\sqrt{13}}{2}R\\); \\(\\dfrac{3}{2}\\)" },
        { prompt: "Reactance of a coil is \\(\\sqrt{3}\\) times its resistance. Phase difference?", answer: "\\(60^\\circ\\)" },
      ],
      pyqExampleId: "7ad62dd5-5197-4207-aa81-0695c7bc72a7",
      traps: [
        {
          title: "Inverting the tangent",
          body:
            "\\(\\tan\\phi = \\frac{X}{R}\\), reactance on top. \\(X_L = 400\\), \\(R = 300\\) gives \\(\\tan^{-1}\\frac{4}{3}\\); \\(\\tan^{-1}\\frac{3}{4}\\) sits beside it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-phasor-voltages",
      name: "Voltages Add as Phasors",
      intuition:
        "V_L and V_C point in opposite directions and both stand at right angles to V_R, so the supply voltage is the hypotenuse of V_R and the difference V_L − V_C. The same geometry makes the currents in a parallel L and C subtract.",
      definition:
        "- \\(V^2 = V_R^2 + (V_L - V_C)^2\\) — never \\(V = V_R + V_L + V_C\\).\n" +
        "- \\(V_L\\) and \\(V_C\\) are \\(180^\\circ\\) apart; each is \\(90^\\circ\\) from \\(V_R\\); neither is in phase with the source (except at resonance, where they cancel).\n" +
        "- Parallel \\(L\\) and \\(C\\): their currents are opposite, so the source supplies \\(|I_L - I_C|\\).",
      formula: {
        label: "Series voltages",
        latex: "V = \\sqrt{V_R^2 + (V_L - V_C)^2}",
      },
      authoredExample: {
        prompt: "In a series LCR circuit \\(V_R = 30\\) V, \\(V_L = 90\\) V, \\(V_C = 50\\) V. Supply voltage?",
        steps: ["\\(V = \\sqrt{30^2 + 40^2} = 50\\) V."],
        answer: "50 V",
      },
      selfCheckExample: {
        prompt: "An inductor and a capacitor in parallel on an a.c. source carry 2 A and 0.5 A. Current from the source?",
        steps: ["Opposite in phase: \\(2 - 0.5\\)."],
        answer: "1.5 A",
      },
      practiceSet: [
        { prompt: "\\(V_R = 40\\), \\(V_L = 80\\), \\(V_C = 40\\) V. Source e.m.f.?", answer: "\\(40\\sqrt{2}\\) V" },
        { prompt: "Are the voltages across L and C in phase with the source voltage?", answer: "No" },
      ],
      pyqExampleId: "e14825ba-ff9d-4ce1-a0b2-1dbd8dfaa2ad",
      traps: [
        {
          title: "Adding the voltages as numbers",
          body:
            "50 V across a circuit can put 90 V on L and 60 V on C — more than the source — because they cancel in part. Only the phasor sum equals the supply.",
        },
      ],
    },
  ],
  related: [
    { label: "Resonance — when X_L = X_C", href: "/notes/mht-cet-physics/ac-circuits/cetp-resonance" },
    { label: "Power in AC Circuits — cos φ = R/Z", href: "/notes/mht-cet-physics/ac-circuits/cetp-ac-power" },
  ],
};

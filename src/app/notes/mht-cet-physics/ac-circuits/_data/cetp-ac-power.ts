import type { SubtopicNote } from "@/app/notes/_types";

export const AC_POWER_NOTE: SubtopicNote = {
  subtopicName: "Power in AC Circuit — Average, Factor, Wattless",
  title: "Power in AC Circuits: Average Power, Power Factor and Wattless Current",
  oneLineDefinition:
    "Only the resistor takes power in an a.c. circuit: the average power is V_rms I_rms cos φ, where the power factor cos φ = R/Z — zero for a pure inductor or capacitor, one at resonance.",
  whyItMatters:
    "25 PYQs, one HARD. Three shapes: the average power from given equations or components, the power factor and how it changes when the frequency changes or a component is added, " +
    "and the wattless current of a purely reactive circuit.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-average-power",
      name: "Average Power",
      intuition:
        "Inductors and capacitors store energy for part of a cycle and hand it all back, so over a cycle only the resistor takes energy. Hence P = I²R, which is the same as V_rms I_rms cos φ.",
      definition:
        "- \\(P = V_{\\text{rms}}I_{\\text{rms}}\\cos\\phi = \\dfrac{V_0I_0}{2}\\cos\\phi = I_{\\text{rms}}^2R\\).\n" +
        "- From equations: \\(e = 160\\sin(100t)\\), \\(i = 0.25\\sin\\left(100t + \\dfrac{\\pi}{3}\\right)\\) ⇒ \\(P = \\dfrac{160 \\times 0.25}{2} \\times \\dfrac{1}{2} = 10\\) W.\n" +
        "- LR circuit with \\(E = E_0\\cos\\omega t\\): \\(P = \\dfrac{E_0^2R}{2Z^2}\\). \\(X_L = R\\) ⇒ \\(\\dfrac{E_0^2}{4R}\\); \\(X_L = 2R\\) ⇒ \\(\\dfrac{E_0^2}{10R}\\); \\(X_L = \\sqrt{3}R\\) ⇒ \\(\\dfrac{E_0^2}{8R}\\).\n" +
        "- Given \\(R\\) and \\(Z\\): \\(P = \\dfrac{V_{\\text{rms}}^2R}{Z^2}\\).",
      formula: {
        label: "Average power",
        latex: "P = V_{\\text{rms}}I_{\\text{rms}}\\cos\\phi = I_{\\text{rms}}^2R",
      },
      authoredExample: {
        prompt: "\\(v = 200\\sin\\omega t\\) volt and \\(i = 4\\sin\\left(\\omega t - \\dfrac{\\pi}{3}\\right)\\) A. Average power?",
        steps: ["\\(P = \\dfrac{200 \\times 4}{2}\\cos 60^\\circ = 400 \\times 0.5 = 200\\) W."],
        answer: "200 W",
      },
      selfCheckExample: {
        prompt: "In a series circuit \\(R = 40\\,\\Omega\\) and \\(Z = 50\\,\\Omega\\) on 100 V r.m.s. Power consumed?",
        steps: ["\\(I = 2\\) A, \\(P = I^2R = 160\\) W."],
        answer: "160 W",
      },
      practiceSet: [
        { prompt: "\\(R = 18\\,\\Omega\\), \\(Z = 33\\,\\Omega\\), 220 V r.m.s. True power?", answer: "800 W" },
        { prompt: "A coil takes 108 W at 3 A. Its resistance?", answer: "\\(12\\,\\Omega\\)" },
        { prompt: "\\(X_L = 3R\\), \\(X_C = R\\), \\(e = E_0\\cos\\omega t\\). Average power?", answer: "\\(\\dfrac{E_0^2}{10R}\\)" },
      ],
      pyqExampleId: "2a5753b5-3653-44d2-a7c1-794061aa6054",
      traps: [
        {
          title: "Using peak values without the ½",
          body:
            "\\(P = \\frac{V_0I_0}{2}\\cos\\phi\\): the ½ turns two peaks into r.m.s. values. Dropping it doubles the power and lands on a printed option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-power-factor",
      name: "Power Factor",
      intuition:
        "The power factor cos φ = R/Z says what fraction of V_rms I_rms is actually used. Anything that moves the circuit toward resonance raises it; anything that adds net reactance lowers it.",
      definition:
        "- \\(\\cos\\phi = \\dfrac{R}{Z} = \\dfrac{\\text{true power}}{\\text{apparent power}}\\); apparent power \\(= V_{\\text{rms}}I_{\\text{rms}}\\), and their ratio the other way is \\(\\dfrac{Z}{R}\\).\n" +
        "- LR with power factor \\(\\dfrac{1}{\\sqrt{2}}\\) (\\(X_L = R\\)): frequency doubled ⇒ \\(X_L = 2R\\), factor \\(\\dfrac{1}{\\sqrt{5}}\\). CR with \\(\\dfrac{1}{\\sqrt{2}}\\): frequency HALVED ⇒ \\(X_C = 2R\\), also \\(\\dfrac{1}{\\sqrt{5}}\\).\n" +
        "- Adding \\(X_C = X_L\\) to an LR circuit makes the factor 1.\n" +
        "- Removing L leaves the phase at \\(\\dfrac{\\pi}{3}\\), removing C also \\(\\dfrac{\\pi}{3}\\) ⇒ \\(X_L = X_C\\), so with both the factor is 1.",
      formula: {
        label: "Power factor",
        latex: "\\cos\\phi = \\frac{R}{Z} = \\frac{R}{\\sqrt{R^2 + (X_L - X_C)^2}}",
      },
      authoredExample: {
        prompt: "\\(R = 60\\,\\Omega\\), \\(X_L = 100\\,\\Omega\\), \\(X_C = 20\\,\\Omega\\). Power factor?",
        steps: ["\\(Z = \\sqrt{60^2 + 80^2} = 100\\,\\Omega\\).", "\\(\\cos\\phi = \\dfrac{60}{100} = 0.6\\)."],
        answer: "0.6",
      },
      selfCheckExample: {
        prompt: "An LR circuit has power factor \\(\\dfrac{1}{\\sqrt{2}}\\). The frequency is tripled. New power factor?",
        steps: ["\\(X_L\\): \\(R \\to 3R\\); \\(\\cos\\phi = \\dfrac{R}{\\sqrt{10}R}\\)."],
        answer: "\\(\\dfrac{1}{\\sqrt{10}}\\)",
      },
      practiceSet: [
        { prompt: "\\(R = 80\\), \\(X_L = 70\\), \\(X_C = 130\\,\\Omega\\). Power factor?", answer: "0.8" },
        { prompt: "Ratio of true power to apparent power?", answer: "\\(\\dfrac{R}{Z}\\)" },
        { prompt: "LR with \\(X_L = 3R\\); then \\(X_C = R\\) added. Ratio of power factors before : after?", answer: "\\(1 : \\sqrt{2}\\)" },
      ],
      pyqExampleId: "2282fc7b-d94e-4673-b3d0-cb4e6438c027",
      traps: [
        {
          title: "Doubling the frequency of an RC circuit",
          body:
            "Frequency UP lowers \\(X_C\\) and RAISES an RC circuit's power factor. To make \\(X_C = 2R\\) the frequency must be halved — the RC and LR versions of the same question move in opposite directions.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-wattless-current",
      name: "Wattless Current",
      intuition:
        "In a pure inductor or capacitor the current is 90° out of step with the voltage, so the power it takes in one quarter-cycle it returns in the next. The current flows but no net power is used — a wattless current.",
      definition:
        "- Pure \\(L\\) or pure \\(C\\): \\(\\phi = 90^\\circ\\), power factor 0, average power 0.\n" +
        "- \\(i = 5\\sin\\left(100t - \\dfrac{\\pi}{2}\\right)\\) with \\(e = 200\\sin 100t\\): 0 W.\n" +
        "- Wattless current: the component \\(I_{\\text{rms}}\\sin\\phi\\), at \\(90^\\circ\\) to the voltage.",
      formula: {
        label: "Purely reactive circuit",
        latex: "\\phi = 90^\\circ \\;\\Rightarrow\\; P = V_{\\text{rms}}I_{\\text{rms}}\\cos 90^\\circ = 0",
      },
      authoredExample: {
        prompt: "An ideal inductor carries 3 A r.m.s. on 230 V. Average power?",
        steps: ["A pure inductor: \\(\\phi = 90^\\circ\\)."],
        answer: "0 W",
      },
      selfCheckExample: {
        prompt: "Phase difference between voltage and current when the current is wattless?",
        steps: ["\\(\\cos\\phi = 0\\)."],
        answer: "\\(90^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Average power in an ideal inductor and an ideal capacitor over a cycle?", answer: "Zero, zero" },
      ],
      pyqExampleId: "747f90be-e828-4227-a0f9-004068b910b7",
      traps: [
        {
          title: "Current means power",
          body:
            "A pure coil can carry amperes and consume nothing. Multiplying \\(V_{\\text{rms}}I_{\\text{rms}}\\) without \\(\\cos\\phi\\) gives the apparent power, not the power used.",
        },
      ],
    },
  ],
  related: [
    { label: "Series LCR — Impedance and Phase", href: "/notes/mht-cet-physics/ac-circuits/cetp-lcr-impedance" },
    { label: "Resonance — power factor 1", href: "/notes/mht-cet-physics/ac-circuits/cetp-resonance" },
  ],
};

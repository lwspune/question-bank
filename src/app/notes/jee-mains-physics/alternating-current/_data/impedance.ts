import type { SubtopicNote } from "@/app/notes/_types";

export const IMPEDANCE_AC_NOTE: SubtopicNote = {
  subtopicName: "Series LCR: Impedance, Phase and Power",
  title: "Series LCR: Impedance, Phase and Power",
  oneLineDefinition:
    "In a series LCR circuit the resistance and the net reactance combine at right angles: Z = √(R² + (ωL − 1/ωC)²), the power factor is R/Z, and only the resistance takes power.",
  whyItMatters:
    "Thirty PYQs, twenty of them multiple choice, and five from 2026 alone. Twelve find an impedance, a current or the voltage across one part. Twelve find a phase angle or a power factor, often after the frequency changes or a part is added. Six find the average power or test wattless current and the choke coil. One right-angled triangle of R and X answers nearly all of them.",
  concepts: [
    // C1 — impedance and voltages
    {
      kind: "formula" as const,
      slug: "jpac-impedance",
      name: "Impedance and the voltage triangle",
      intuition:
        "The voltage across R is in step with the current, the voltage across L is 90° ahead, and the voltage across C is 90° behind. So \\(V_L\\) and \\(V_C\\) pull in opposite directions and cancel in part, and what is left sits at right angles to \\(V_R\\). Add them like the sides of a right triangle, never as plain numbers. Divide every side by the current and you get the impedance triangle.",
      definition:
        "- \\(Z = \\sqrt{R^{2} + (X_L - X_C)^{2}}\\); \\(I = \\dfrac{V}{Z}\\), peak with peak and rms with rms.\n" +
        "- \\(V_R = IR\\), \\(V_L = IX_L\\), \\(V_C = IX_C\\), and \\(V^{2} = V_R^{2} + (V_L - V_C)^{2}\\).\n" +
        "- R and L only: \\(Z = \\sqrt{R^{2} + X_L^{2}}\\) and \\(V^{2} = V_R^{2} + V_L^{2}\\). R and C only: the same with \\(X_C\\).\n" +
        "- A new frequency changes both reactances the opposite way: at \\(k\\omega\\), \\(X_L \\to kX_L\\) and \\(X_C \\to \\dfrac{X_C}{k}\\). Recompute Z after scaling both.\n" +
        "- A lamp rated P at V in series: its resistance is \\(\\dfrac{V^{2}}{P}\\) and its current at full brightness is \\(\\dfrac{P}{V}\\). The rest of the supply voltage sits at right angles across the L or C.\n" +
        "- The sign of \\(X_L - X_C\\) does not change Z, but it does decide whether the current leads or lags.",
      formula: {
        label: "Impedance and voltages",
        latex: "Z = \\sqrt{R^{2} + (X_L - X_C)^{2}} \\qquad V^{2} = V_R^{2} + (V_L - V_C)^{2}",
      },
      authoredExample: {
        prompt:
          "R = \\(40\\ \\Omega\\), L = 0.2 H and C = \\(50\\ \\mu\\text{F}\\) are in series across \\(v = 100\\sin(250t)\\ \\text{V}\\). Find Z, the peak current and the peak voltage across each part.",
        steps: [
          "\\(X_L = 250 \\times 0.2 = 50\\ \\Omega\\); \\(X_C = \\dfrac{1}{250 \\times 50 \\times 10^{-6}} = 80\\ \\Omega\\).",
          "\\(Z = \\sqrt{40^{2} + (50 - 80)^{2}} = \\sqrt{1600 + 900} = 50\\ \\Omega\\); \\(I_0 = \\dfrac{100}{50} = 2\\ \\text{A}\\).",
          "\\(V_R = 80\\ \\text{V}\\), \\(V_L = 100\\ \\text{V}\\), \\(V_C = 160\\ \\text{V}\\).",
          "Check: \\(\\sqrt{80^{2} + (100 - 160)^{2}} = \\sqrt{6400 + 3600} = 100\\ \\text{V}\\). The plain sum, 340 V, is far above the supply.",
        ],
        answer: "\\(50\\ \\Omega\\), \\(2\\ \\text{A}\\); 80 V, 100 V, 160 V",
      },
      selfCheckExample: {
        prompt:
          "A 60 W, 120 V lamp must glow normally on a 200 V, 50 Hz supply, with a pure inductor in series. Find the inductance.",
        steps: [
          "Lamp current \\(I = \\dfrac{60}{120} = 0.5\\ \\text{A}\\); its voltage is 120 V.",
          "Inductor voltage: \\(V_L = \\sqrt{200^{2} - 120^{2}} = 160\\ \\text{V}\\), so \\(X_L = \\dfrac{160}{0.5} = 320\\ \\Omega\\).",
          "\\(L = \\dfrac{320}{2\\pi \\times 50} \\approx 1.02\\ \\text{H}\\).",
        ],
        answer: "\\(\\approx 1.02\\ \\text{H}\\)",
      },
      practiceSet: [
        { prompt: "R = \\(6\\ \\Omega\\), \\(X_L = 12\\ \\Omega\\), \\(X_C = 4\\ \\Omega\\). Impedance?", answer: "\\(10\\ \\Omega\\)" },
        { prompt: "\\(V_R = 30\\) V, \\(V_L = 90\\) V, \\(V_C = 50\\) V. Supply voltage?", answer: "\\(50\\ \\text{V}\\)" },
        { prompt: "In an RC circuit the angular frequency is made one third. What happens to \\(X_C\\)?", answer: "It becomes 3 times" },
        { prompt: "A coil of no resistance and a \\(40\\ \\Omega\\) resistor are across 100 V. The resistor reads 60 V. Voltage across the coil?", answer: "\\(80\\ \\text{V}\\)" },
      ],
      pyqExampleId: "39f949dc-0870-4fec-961c-0138ae7626c3", // 27 Jul 2022: current amplitude 60% below resonance
      traps: [
        {
          title: "Adding the voltages as numbers",
          body: "\\(V_R + V_L + V_C\\) is not the supply voltage. The parts are out of phase, so use \\(V^{2} = V_R^{2} + (V_L - V_C)^{2}\\).",
        },
        {
          title: "Changing only one reactance with the frequency",
          body: "When ω changes, \\(X_L\\) and \\(X_C\\) both change, in opposite directions. Scale both before finding Z.",
        },
        {
          title: "Mixing peak and rms",
          body: "Peak voltage over Z gives the peak current; rms over Z gives rms. A 'percent lower' frequency means ω times the remaining fraction: 30% lower is 0.7ω.",
        },
      ],
    },

    // C2 — phase angle and power factor
    {
      kind: "formula" as const,
      slug: "jpac-power-factor",
      name: "Phase angle and power factor",
      intuition:
        "The phase angle is the angle of the impedance triangle: net reactance up, resistance across. Its cosine, R/Z, is the power factor. If the inductive side wins, the current lags; if the capacitive side wins, it leads; if they balance, the power factor is 1. Since only R and the reactances set the triangle, the source's amplitude never changes the power factor.",
      definition:
        "- \\(\\tan\\phi = \\dfrac{X_L - X_C}{R}\\); power factor \\(\\cos\\phi = \\dfrac{R}{Z}\\).\n" +
        "- \\(X_L > X_C\\): inductive, current lags. \\(X_C > X_L\\): capacitive, current leads. \\(X_L = X_C\\): \\(\\cos\\phi = 1\\).\n" +
        "- From the equations: if \\(v = V_0\\sin(\\omega t + \\alpha)\\) and \\(i = I_0\\sin(\\omega t + \\beta)\\), then \\(\\phi = |\\alpha - \\beta|\\).\n" +
        "- Remove one part and read the angle: an RL circuit lagging by \\(45^{\\circ}\\) has \\(X_L = R\\); an RC circuit leading by \\(45^{\\circ}\\) has \\(X_C = R\\).\n" +
        "- New frequency: from the old angle get \\(X_L/R\\) (or \\(X_C/R\\)), scale it, then find the new \\(\\cos\\phi\\).\n" +
        "- Adding a capacitor to an RL circuit cancels part of \\(X_L\\) and raises the power factor.",
      formula: {
        label: "Phase angle and power factor",
        latex: "\\tan\\phi = \\frac{X_L - X_C}{R} \\qquad \\cos\\phi = \\frac{R}{Z}",
      },
      authoredExample: {
        prompt:
          "An RL circuit has power factor 0.6 at \\(\\omega = 500\\ \\text{rad/s}\\). Find its power factor at \\(\\omega = 1000\\ \\text{rad/s}\\).",
        steps: [
          "\\(\\cos\\phi = 0.6\\) gives \\(\\tan\\phi = \\dfrac{4}{3}\\), so \\(X_L = \\dfrac{4R}{3}\\) at 500 rad/s.",
          "At double the frequency \\(X_L = \\dfrac{8R}{3}\\).",
          "\\(\\cos\\phi' = \\dfrac{R}{\\sqrt{R^{2} + 64R^{2}/9}} = \\dfrac{3}{\\sqrt{73}} \\approx 0.35\\).",
        ],
        answer: "\\(\\dfrac{3}{\\sqrt{73}} \\approx 0.35\\)",
      },
      selfCheckExample: {
        prompt:
          "A series circuit has R = \\(60\\ \\Omega\\), \\(X_L = 140\\ \\Omega\\), \\(X_C = 60\\ \\Omega\\). Find the power factor and say whether the current leads or lags. A different capacitor then makes \\(X_C = 140\\ \\Omega\\). New power factor?",
        steps: [
          "Net reactance \\(80\\ \\Omega\\); \\(Z = \\sqrt{60^{2} + 80^{2}} = 100\\ \\Omega\\).",
          "\\(\\cos\\phi = 0.6\\), and \\(X_L > X_C\\), so the current lags (by about \\(53^{\\circ}\\)).",
          "With \\(X_C = X_L\\) the reactances cancel: \\(Z = R\\), so \\(\\cos\\phi = 1\\).",
        ],
        answer: "0.6, lagging; then 1",
      },
      practiceSet: [
        { prompt: "R = \\(12\\ \\Omega\\), \\(X_L = 20\\ \\Omega\\), \\(X_C = 4\\ \\Omega\\). Power factor?", answer: "0.6" },
        { prompt: "An RC circuit's current leads by \\(45^{\\circ}\\). Compare \\(X_C\\) and R.", answer: "Equal" },
        { prompt: "\\(v = 10\\sin\\omega t\\), \\(i = 2\\sin(\\omega t - \\pi/6)\\). Power factor, and lead or lag?", answer: "\\(\\dfrac{\\sqrt{3}}{2}\\), lagging" },
        { prompt: "Only the source amplitude is doubled. Does the power factor change?", answer: "No" },
      ],
      pyqExampleId: "cd9b9f3c-a6bf-4119-a1fe-c6a3db469a1c", // 30 Jan 2024: RL power factor after ω doubles
      traps: [
        {
          title: "Using sin φ for the power factor",
          body: "The power factor is cos φ = R/Z. The ratio of the net reactance to Z is sin φ.",
        },
        {
          title: "Losing lead or lag",
          body: "cos φ is the same for +φ and −φ. Decide lead or lag from which reactance is bigger, or from which equation has the larger phase constant.",
        },
        {
          title: "Letting the amplitude change the power factor",
          body: "A new source amplitude changes the current, not the angle. Only a new frequency or a new part changes the power factor.",
        },
      ],
    },

    // C3 — average power, wattless current, choke
    {
      kind: "formula" as const,
      slug: "jpac-power",
      name: "Average power, wattless current and the choke coil",
      intuition:
        "Over a cycle an inductor or a capacitor takes energy and gives all of it back, so only the resistance uses power. That is why the average power carries the factor cos φ. A current that is 90° out of step with the voltage does no work at all: it is called wattless. A choke uses this to limit a current without wasting power.",
      definition:
        "- \\(P = V_{rms}I_{rms}\\cos\\phi = \\dfrac{1}{2}V_0I_0\\cos\\phi = I_{rms}^{2}R\\).\n" +
        "- From \\(v = V_0\\sin\\omega t\\) and \\(i = I_0\\sin(\\omega t \\pm \\phi)\\): \\(P = \\dfrac{V_0I_0}{2}\\cos\\phi\\). Watch the units: mA times V gives mW.\n" +
        "- Pure L, pure C, or L with C and no R: \\(\\cos\\phi = 0\\), so \\(P = 0\\). The current is wattless.\n" +
        "- Zero net reactance needs no empty circuit: \\(X_L = X_C\\) cancel each other.\n" +
        "- A choke coil has a large L and a tiny R. It cuts the current in a tube-light circuit with almost no power loss, where a series resistor would waste \\(I^{2}R\\).",
      formula: {
        label: "Average power",
        latex: "P = V_{rms}I_{rms}\\cos\\phi = \\frac{1}{2}V_0I_0\\cos\\phi = I_{rms}^{2}R",
      },
      authoredExample: {
        prompt:
          "A voltage \\(v = 50\\sin(100t)\\ \\text{V}\\) drives a current \\(i = 4\\sin\\left(100t - \\dfrac{\\pi}{6}\\right)\\ \\text{A}\\). Find the average power.",
        steps: [
          "The phase gap is \\(\\phi = \\dfrac{\\pi}{6}\\), so \\(\\cos\\phi = \\dfrac{\\sqrt{3}}{2}\\).",
          "\\(P = \\dfrac{50 \\times 4}{2} \\times \\dfrac{\\sqrt{3}}{2} = 50\\sqrt{3} \\approx 86.6\\ \\text{W}\\).",
        ],
        answer: "\\(\\approx 86.6\\ \\text{W}\\)",
      },
      selfCheckExample: {
        prompt:
          "A \\(6\\ \\Omega\\) resistor and a capacitor of reactance \\(8\\ \\Omega\\) are in series across a 50 V (rms) supply. Find the average power.",
        steps: [
          "\\(Z = \\sqrt{36 + 64} = 10\\ \\Omega\\), so \\(I_{rms} = 5\\ \\text{A}\\).",
          "\\(P = I_{rms}^{2}R = 25 \\times 6 = 150\\ \\text{W}\\). Check: \\(50 \\times 5 \\times 0.6 = 150\\ \\text{W}\\).",
        ],
        answer: "\\(150\\ \\text{W}\\)",
      },
      practiceSet: [
        { prompt: "\\(V_{rms} = 100\\) V, \\(I_{rms} = 2\\) A, \\(\\phi = 60^{\\circ}\\). Power?", answer: "\\(100\\ \\text{W}\\)" },
        { prompt: "Average power taken by a pure capacitor?", answer: "Zero" },
        { prompt: "\\(I_{rms} = 3\\) A in a series circuit with R = \\(10\\ \\Omega\\). Power?", answer: "\\(90\\ \\text{W}\\)" },
        { prompt: "Why a choke and not a resistor to limit a tube light's current?", answer: "It limits the current with almost no power loss" },
      ],
      pyqExampleId: "ccedf088-5a5b-4d43-8ea3-ee7b3d074cef", // 31 Jan 2024: power from v and i equations
      traps: [
        {
          title: "Peak values in the rms formula",
          body: "\\(V_{rms}I_{rms}\\cos\\phi\\) needs rms values. With peak values, halve the product: \\(\\dfrac{1}{2}V_0I_0\\cos\\phi\\).",
        },
        {
          title: "Using Z in I²R",
          body: "Power is \\(I_{rms}^{2}R\\). Writing \\(I^{2}Z\\) charges the inductor and capacitor for power they never keep.",
        },
      ],
    },
  ],
};

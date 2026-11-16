import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_AC_LCR_NOTE: SubtopicNote = {
  subtopicName: "Series LCR Circuit and Resonance",
  title: "Series LCR Circuit and Resonance",
  oneLineDefinition:
    "A resistor, inductor and capacitor in series on ac: the impedance and phase angle, resonance when the two reactances cancel, and the power the circuit takes.",
  whyItMatters:
    "Eight NEET questions from 2021 to 2026, the busiest page of the chapter. Three find an impedance or current (from three voltmeter readings in 2021, from a circuit figure in 2023, the current and phase angle in 2025), four are about resonance (the resonant frequency in 2022, 2023 and 2026, the current at resonance in Re-NEET 2026) and one asks for the two half-power frequencies (2021).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphac-impedance",
      name: "Impedance and phase angle",
      intuition:
        "In series the same current flows through R, L and C. The voltage across R is in step with it, the voltage across L is a quarter cycle ahead and the voltage across C a quarter cycle behind. So the L and C voltages point opposite ways and partly cancel. What is left adds to the resistor's voltage at right angles, like the two short sides of a right triangle. The total opposition of the circuit is its impedance.",
      definition:
        "- The same current I flows in R, L and C: \\(V_R = IR\\), \\(V_L = IX_L\\), \\(V_C = IX_C\\).\n" +
        "- Supply voltage: \\(V = \\sqrt{V_R^{2} + (V_L - V_C)^{2}}\\). The three voltages add as phasors, not as plain numbers.\n" +
        "- **Impedance:** \\(Z = \\sqrt{R^{2} + (X_L - X_C)^{2}}\\), in ohm. Then \\(I = \\dfrac{V}{Z}\\), rms with rms or peak with peak.\n" +
        "- **Phase angle** between the current and the supply voltage: \\(\\tan\\phi = \\dfrac{X_L - X_C}{R}\\).\n" +
        "- If \\(X_L > X_C\\) the circuit is inductive and the current lags the voltage. If \\(X_C > X_L\\) it is capacitive and the current leads.",
      formula: {
        label: "Series LCR",
        latex: "Z = \\sqrt{R^{2} + (X_L - X_C)^{2}}, \\qquad \\tan\\phi = \\frac{X_L - X_C}{R}, \\qquad V = \\sqrt{V_R^{2} + (V_L - V_C)^{2}}",
        symbols: [
          { symbol: "\\(Z\\)", meaning: "impedance" },
          { symbol: "\\(\\phi\\)", meaning: "phase angle between current and voltage" },
        ],
      },
      authoredExample: {
        prompt:
          "In a series LCR circuit, ac voltmeters read 60 V across R, 120 V across L and 40 V across C. Find the supply voltage and say whether the current leads or lags it, and by what angle.",
        steps: [
          "\\(V = \\sqrt{60^{2} + (120 - 40)^{2}} = \\sqrt{3600 + 6400} = 100\\ \\text{V}\\).",
          "\\(V_L > V_C\\), so \\(X_L > X_C\\): the circuit is inductive and the current lags.",
          "\\(\\tan\\phi = \\dfrac{80}{60} = \\dfrac{4}{3}\\), so \\(\\phi \\approx 53^{\\circ}\\).",
        ],
        answer: "100 V; the current lags by about 53°",
      },
      selfCheckExample: {
        prompt:
          "A series circuit has \\(R = 8\\ \\Omega\\), \\(X_L = 10\\ \\Omega\\) and \\(X_C = 4\\ \\Omega\\). Find its impedance and say whether it is inductive or capacitive.",
        steps: [
          "\\(Z = \\sqrt{8^{2} + (10 - 4)^{2}} = \\sqrt{64 + 36} = 10\\ \\Omega\\).",
          "\\(X_L > X_C\\), so it is inductive: the current lags the voltage.",
        ],
        answer: "\\(10\\ \\Omega\\), inductive",
      },
      practiceSet: [
        { prompt: "A 3 Ω resistor and an inductor of reactance 4 Ω are in series. What is the impedance?", answer: "\\(5\\ \\Omega\\)" },
        { prompt: "In a series LCR circuit the voltages are 30 V across R, 50 V across L and 10 V across C. What is the rms supply voltage?", answer: "50 V" },
        { prompt: "In a series LCR circuit \\(X_C > X_L\\). Does the current lead or lag the supply voltage?", answer: "It leads" },
        { prompt: "Why can the voltages across R, L and C in series not be added as plain numbers?", answer: "They are out of phase, so they add as phasors" },
      ],
      pyqExampleId: "c82a108c-18ff-4c7c-8003-f198d076a753",
      traps: [
        {
          title: "Voltages add as phasors",
          body: "Readings of 40 V across L, 10 V across C and 40 V across R do not make a 90 V supply. The supply is \\(\\sqrt{40^{2} + (40 - 10)^{2}} = 50\\ \\text{V}\\).",
        },
        {
          title: "Subtract the reactances",
          body: "\\(X_L\\) and \\(X_C\\) act in opposite directions, so the impedance uses \\(X_L - X_C\\). Adding them gives an impedance that is too large.",
        },
        {
          title: "Keep peak with peak",
          body: "\\(Z = \\dfrac{V}{I}\\) holds with both values rms or both peak. If the current amplitude is given, divide it by \\(\\sqrt{2}\\) before using it with an rms voltage.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphac-resonance",
      name: "Resonance in a series LCR circuit",
      intuition:
        "As the frequency rises, the inductor's reactance grows and the capacitor's falls. At one frequency the two are equal and cancel completely. Then only the resistor is left to oppose the current, so the impedance is the smallest it can be and the current the largest. This is resonance, and it is how a radio picks one station out of many.",
      definition:
        "- Resonance happens when \\(X_L = X_C\\), that is \\(\\omega L = \\dfrac{1}{\\omega C}\\).\n" +
        "- Resonant angular frequency \\(\\omega_0 = \\dfrac{1}{\\sqrt{LC}}\\) in rad/s; resonant frequency \\(f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}\\) in hertz.\n" +
        "- At resonance \\(Z = R\\), the current amplitude is largest, \\(I_0 = \\dfrac{V_0}{R}\\), and the current is in phase with the voltage.\n" +
        "- The voltages across L and C are equal in size and opposite in phase, so they cancel.\n" +
        "- The resonant frequency depends on L and C only. R decides how large the current is at resonance, not where resonance happens.\n" +
        "- To test whether a source drives a circuit at resonance, work out \\(X_L\\) and \\(X_C\\) at the source's \\(\\omega\\) and compare them.",
      formula: {
        label: "Resonance",
        latex: "\\omega_0 = \\frac{1}{\\sqrt{LC}}, \\qquad f_0 = \\frac{1}{2\\pi\\sqrt{LC}}, \\qquad Z_{\\min} = R",
      },
      authoredExample: {
        prompt:
          "A coil of inductance 0.1 H and resistance 20 Ω is to resonate at \\(\\omega = 1000\\) rad/s with a capacitor in series, on a 10 V rms supply. What capacitance is needed, and what rms current flows at resonance?",
        steps: [
          "\\(\\omega_0^{2} = \\dfrac{1}{LC}\\), so \\(C = \\dfrac{1}{\\omega_0^{2}L} = \\dfrac{1}{10^{6} \\times 0.1} = 10^{-5}\\ \\text{F} = 10\\ \\mu\\text{F}\\).",
          "At resonance \\(Z = R = 20\\ \\Omega\\), so \\(I = \\dfrac{10}{20} = 0.5\\ \\text{A}\\).",
        ],
        answer: "\\(10\\ \\mu\\text{F}\\), 0.5 A",
      },
      selfCheckExample: {
        prompt:
          "A voltage \\(v = 100\\sin(500t)\\) V is applied to a series circuit with L = 0.2 H, \\(C = 20\\ \\mu\\text{F}\\) and R = 50 Ω. Is the circuit at resonance? Find the current amplitude.",
        steps: [
          "\\(X_L = 500 \\times 0.2 = 100\\ \\Omega\\); \\(X_C = \\dfrac{1}{500 \\times 20 \\times 10^{-6}} = 100\\ \\Omega\\).",
          "They are equal, so the circuit is at resonance and \\(Z = R = 50\\ \\Omega\\).",
          "\\(I_0 = \\dfrac{V_0}{R} = \\dfrac{100}{50} = 2\\ \\text{A}\\).",
        ],
        answer: "Yes; 2 A",
      },
      practiceSet: [
        { prompt: "What is the impedance of a series LCR circuit at resonance?", answer: "R, its resistance" },
        { prompt: "What is the phase difference between the current and the voltage in a series LCR circuit at resonance?", answer: "Zero" },
        { prompt: "In a series LCR circuit the inductance is made four times, with C unchanged. What happens to the resonant frequency?", answer: "It halves" },
        { prompt: "At resonance, how do the voltages across L and C in a series LCR circuit compare?", answer: "Equal in size and opposite in phase, so they cancel" },
      ],
      pyqExampleId: "bbf19de1-60cc-4f3e-9b26-ec2e86ada5f6",
      traps: [
        {
          title: "rad/s or hertz",
          body: "\\(\\dfrac{1}{\\sqrt{LC}}\\) is the angular frequency in rad/s. Divide by \\(2\\pi\\) for hertz. With L = 10 mH and C = 1 μF, \\(\\omega_0 = 10^{4}\\) rad/s but \\(f_0 \\approx 1.59\\) kHz.",
        },
        {
          title: "Resistance does not move resonance",
          body: "The resonant frequency depends on L and C only. A resistance given in the question changes the current at resonance, never \\(f_0\\).",
        },
        {
          title: "Convert milli and micro first",
          body: "Put L in henry and C in farad before using \\(\\dfrac{1}{\\sqrt{LC}}\\): 10 mH is \\(10^{-2}\\) H and 1 μF is \\(10^{-6}\\) F.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphac-power",
      name: "Power, power factor and half-power frequencies",
      intuition:
        "Only the resistor turns electrical energy into heat. An inductor or a capacitor takes energy in one quarter cycle and gives it back in the next. So the average power depends on how much of the current is in step with the voltage, and that share is the power factor. Near resonance the power is large; move the frequency away and it falls. The two frequencies where it has fallen to half mark how sharp the resonance is.",
      definition:
        "- Average power: \\(P = V_{rms}I_{rms}\\cos\\phi\\). The factor \\(\\cos\\phi = \\dfrac{R}{Z}\\) is the **power factor**.\n" +
        "- Since only R uses energy, \\(P = I_{rms}^{2}R\\) as well.\n" +
        "- Pure resistor: \\(\\cos\\phi = 1\\). Pure inductor or capacitor: \\(\\phi = 90^{\\circ}\\), \\(\\cos\\phi = 0\\), no power is used, and the current is called **wattless**.\n" +
        "- At resonance \\(\\cos\\phi = 1\\) and the power is the largest, \\(\\dfrac{V_{rms}^{2}}{R}\\).\n" +
        "- **Half-power frequencies:** the power is half its resonant value when the current is \\(\\dfrac{1}{\\sqrt{2}}\\) of its resonant value, that is when \\(Z = \\sqrt{2}R\\). For a sharp resonance these are \\(\\omega = \\omega_0 \\pm \\dfrac{R}{2L}\\), so they are \\(\\dfrac{R}{L}\\) apart (the bandwidth).\n" +
        "- A smaller R gives a narrower, sharper resonance.",
      formula: {
        label: "Power in ac",
        latex: "P = V_{rms} I_{rms} \\cos\\phi, \\qquad \\cos\\phi = \\frac{R}{Z}, \\qquad \\omega_{1,2} = \\omega_0 \\pm \\frac{R}{2L}",
      },
      authoredExample: {
        prompt:
          "A circuit draws an rms current of 2 A from a 200 V rms supply, with the current lagging the voltage by 60°. Find the average power and the power factor.",
        steps: [
          "Power factor \\(= \\cos 60^{\\circ} = 0.5\\).",
          "\\(P = V_{rms}I_{rms}\\cos\\phi = 200 \\times 2 \\times 0.5 = 200\\ \\text{W}\\).",
        ],
        answer: "200 W; power factor 0.5",
      },
      selfCheckExample: {
        prompt:
          "A series LCR circuit has R = 100 Ω and impedance 200 Ω on a 220 V rms supply. Find the power factor and the average power.",
        steps: [
          "\\(\\cos\\phi = \\dfrac{R}{Z} = \\dfrac{100}{200} = 0.5\\).",
          "\\(I_{rms} = \\dfrac{220}{200} = 1.1\\ \\text{A}\\), so \\(P = 220 \\times 1.1 \\times 0.5 = 121\\ \\text{W}\\).",
          "Check: \\(I_{rms}^{2}R = 1.21 \\times 100 = 121\\ \\text{W}\\).",
        ],
        answer: "0.5; 121 W",
      },
      practiceSet: [
        { prompt: "What is the power factor of a circuit that contains only a pure inductor?", answer: "Zero" },
        { prompt: "What is the power factor of a series LCR circuit at resonance?", answer: "1" },
        { prompt: "The resistance of a series LCR circuit is doubled. What happens to the gap between its two half-power frequencies?", answer: "It doubles: the resonance becomes less sharp" },
        { prompt: "What average power is used in a 50 Ω resistor carrying an rms current of 2 A?", answer: "200 W" },
      ],
      pyqExampleId: "a20e8105-5230-47bd-b173-cf4f918b4cc2",
      traps: [
        {
          title: "Use rms values for power",
          body: "\\(P = V I\\cos\\phi\\) needs rms values. With peak values the power is \\(\\dfrac{1}{2}V_0I_0\\cos\\phi\\).",
        },
        {
          title: "Half power is not half current",
          body: "At a half-power frequency the current is \\(\\dfrac{1}{\\sqrt{2}}\\) of its resonant value, not half. Each half-power frequency sits \\(\\dfrac{R}{2L}\\) from \\(\\omega_0\\), so the two are \\(\\dfrac{R}{L}\\) apart.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_AC_PHASORS_NOTE: SubtopicNote = {
  subtopicName: "Phasors and Types of AC Circuits",
  title: "Phasors, Reactance and the Series LCR Circuit",
  oneLineDefinition:
    "Phasors as rotating arrows, how a pure resistor, inductor and capacitor each respond to AC, and how their voltages combine into the impedance of a series LCR circuit.",
  whyItMatters:
    "31 questions, the most of any page. Thirteen came from board papers: derive the impedance of a series LCR circuit with its phasor diagram (twice in 2024, and in 2025 with admittance), define inductive reactance, capacitive reactance and impedance (2022, 2026), the phase of the voltage across a capacitor (2017), capacitive reactance (2018), a resistor fed by e = 140 sin ωt (2023, 2025, 2026), the phase difference from R, XL and XC (2025), the sign of tan φ (2026) and the peak current through an inductor (2026). The textbook adds the derivations for a pure inductor and capacitor and many LCR calculations.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpac-resistor",
      name: "Phasors and the pure resistor",
      intuition:
        "A phasor is an arrow that turns anticlockwise at the angular frequency of the supply. Its length is the peak value, and its shadow on the vertical axis is the value at that instant. Two quantities in step are drawn along the same line. In a pure resistor the current rises and falls exactly with the voltage, so its arrow lies on top of the voltage arrow.",
      definition:
        "- **Phasor:** a rotating vector that represents a quantity varying sinusoidally with time. The diagram showing phasors is a **phasor diagram**.\n" +
        "- Phasors rotate anticlockwise with angular velocity \\(\\omega\\); the length of the arrow is the peak value (\\(e_0\\) or \\(i_0\\)); the angle between two phasors is their phase difference.\n" +
        "- **Pure resistor:** for \\(e = e_0 \\sin \\omega t\\), the current is \\(i = i_0 \\sin \\omega t\\) with \\(i_0 = \\dfrac{e_0}{R}\\). Current and voltage are **in phase**.\n" +
        "- Ohm's law holds for peak values and for rms values: \\(i_{rms} = \\dfrac{e_{rms}}{R}\\). The resistance does not depend on the frequency.",
      formula: {
        label: "Pure resistor",
        latex: "i = \\frac{e_0}{R} \\sin \\omega t, \\qquad i_{rms} = \\frac{e_{rms}}{R}",
      },
      authoredExample: {
        prompt:
          "A 40 Ω resistor is connected to a source of e.m.f. \\(e = 200 \\sin (100\\pi t)\\) V. Find the peak current and the rms current, and write the equation of the current.",
        steps: [
          "Given: \\(e_0 = 200\\) V, \\(\\omega = 100\\pi\\) rad/s, \\(R = 40\\ \\Omega\\).",
          "Peak current: \\(i_0 = \\dfrac{e_0}{R} = \\dfrac{200}{40} = 5\\) A.",
          "RMS current: \\(i_{rms} = 0.707 \\times 5 = 3.535\\) A.",
          "In a resistor the current is in phase with the e.m.f.: \\(i = 5 \\sin (100\\pi t)\\) A.",
        ],
        answer: "Peak 5 A, rms 3.535 A; i = 5 sin (100πt) A",
      },
      selfCheckExample: {
        prompt: "A pure resistor draws an rms current of 2 A from a 230 V rms supply. Find the resistance and the peak current.",
        steps: ["\\(R = \\dfrac{230}{2} = 115\\ \\Omega\\).", "\\(i_0 = 1.414 \\times 2 = 2.828\\) A."],
        answer: "115 Ω; 2.828 A",
      },
      practiceSet: [
        { prompt: "What is the phase difference between the voltage and the current in a pure resistor?", answer: "Zero: they are in phase" },
        { prompt: "What does the length of a phasor represent?", answer: "The peak value of the quantity" },
        { prompt: "In which sense do phasors rotate, and how fast?", answer: "Anticlockwise, with angular velocity \\(\\omega\\)" },
      ],
      pyqExampleId: "c3bda88f-6e9d-454d-b2b8-fdd8094b06fc",
      traps: [
        {
          title: "Mixing peak and rms in one line",
          body: "Divide a peak e.m.f. by R to get a peak current, and an rms e.m.f. to get an rms current. Dividing \\(e_0\\) by R and calling it the rms current is a common slip.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpac-l-and-c",
      name: "Pure inductor and pure capacitor",
      intuition:
        "An inductor fights any change of current with a back e.m.f., so the current always arrives a quarter cycle late: it lags the voltage by π/2. A capacitor has to fill with charge before its voltage can rise, so the current comes first: it leads the voltage by π/2. The faster the supply alternates, the harder an inductor resists and the more easily a capacitor passes current.",
      definition:
        "- **Pure inductor**, outline of the proof: \\(e = L\\dfrac{di}{dt}\\), so \\(di = \\dfrac{e_0}{L}\\sin \\omega t\\, dt\\). Integrating, \\(i = -\\dfrac{e_0}{\\omega L}\\cos \\omega t = i_0 \\sin \\left(\\omega t - \\dfrac{\\pi}{2}\\right)\\) with \\(i_0 = \\dfrac{e_0}{\\omega L}\\). The current **lags** the voltage by \\(\\pi/2\\) (the voltage leads).\n" +
        "- **Inductive reactance** \\(X_L = \\omega L = 2\\pi f L\\), in ohm. It rises with frequency; for DC (\\(f = 0\\)) it is zero.\n" +
        "- **Pure capacitor**, outline of the proof: \\(q = Ce = Ce_0 \\sin \\omega t\\), so \\(i = \\dfrac{dq}{dt} = \\omega C e_0 \\cos \\omega t = i_0 \\sin \\left(\\omega t + \\dfrac{\\pi}{2}\\right)\\) with \\(i_0 = \\dfrac{e_0}{1/\\omega C}\\). The current **leads** the voltage by \\(\\pi/2\\) (the voltage lags).\n" +
        "- **Capacitive reactance** \\(X_C = \\dfrac{1}{\\omega C} = \\dfrac{1}{2\\pi f C}\\), in ohm. It falls as frequency rises: a capacitor blocks DC and acts almost like a plain wire at very high frequency.\n" +
        "- In both, \\(i_{rms} = \\dfrac{e_{rms}}{X}\\), and on a graph of e and i against \\(\\omega t\\) the two sine curves are shifted by a quarter cycle.",
      formula: {
        label: "Reactances",
        latex: "X_L = \\omega L = 2\\pi f L, \\qquad X_C = \\frac{1}{\\omega C} = \\frac{1}{2\\pi f C}",
        symbols: [
          { symbol: "\\(X_L\\)", meaning: "inductive reactance, in ohm" },
          { symbol: "\\(X_C\\)", meaning: "capacitive reactance, in ohm" },
          { symbol: "\\(f\\)", meaning: "frequency of the supply" },
        ],
      },
      authoredExample: {
        prompt:
          "A 20 μF capacitor, and separately a 0.1 H pure inductor, are each connected to a 100 V rms, 50 Hz supply. Find the rms current in each and state its phase relative to the voltage. (\\(\\pi = 3.142\\))",
        steps: [
          "Given: \\(C = 20 \\times 10^{-6}\\) F, \\(L = 0.1\\) H, \\(e_{rms} = 100\\) V, \\(f = 50\\) Hz.",
          "Capacitor: \\(X_C = \\dfrac{1}{2\\pi f C} = \\dfrac{1}{2 \\times 3.142 \\times 50 \\times 20 \\times 10^{-6}} = 159.1\\ \\Omega\\).",
          "\\(i_{rms} = \\dfrac{100}{159.1} = 0.6285\\) A, leading the voltage by \\(\\pi/2\\).",
          "Inductor: \\(X_L = 2\\pi f L = 2 \\times 3.142 \\times 50 \\times 0.1 = 31.42\\ \\Omega\\).",
          "\\(i_{rms} = \\dfrac{100}{31.42} = 3.183\\) A, lagging the voltage by \\(\\pi/2\\).",
        ],
        answer: "Capacitor: 0.6285 A, leading by π/2; inductor: 3.183 A, lagging by π/2",
      },
      selfCheckExample: {
        prompt: "At what frequency does a 0.2 H pure inductor have a reactance of 100 Ω? (\\(\\pi = 3.142\\))",
        steps: ["\\(f = \\dfrac{X_L}{2\\pi L} = \\dfrac{100}{2 \\times 3.142 \\times 0.2}\\).", "\\(f = 79.57\\) Hz."],
        answer: "79.57 Hz",
      },
      practiceSet: [
        { prompt: "Why does a capacitor block direct current?", answer: "For DC, f = 0, so \\(X_C = 1/(2\\pi f C)\\) is infinite" },
        { prompt: "A capacitor has a reactance of 200 Ω at 50 Hz. What is its reactance at 100 Hz?", answer: "100 Ω" },
        { prompt: "An inductor has a reactance of 30 Ω at 50 Hz. What is its reactance at 150 Hz?", answer: "90 Ω" },
        { prompt: "In which element does the current lead the voltage by \\(\\pi/2\\)?", answer: "A pure capacitor" },
      ],
      pyqExampleId: "e69575d9-3c64-4535-8e9b-a7f83acc3fe6",
      traps: [
        {
          title: "Turning 'current leads' into 'voltage leads'",
          body: "In a capacitor the current leads, so the voltage lags by \\(\\pi/2\\). In an inductor the voltage leads and the current lags. Learn one sentence for each and read the question for which quantity it names.",
        },
        {
          title: "Forgetting the prefix",
          body: "Write \\(\\mu\\)F as \\(\\times 10^{-6}\\) F and mH as \\(\\times 10^{-3}\\) H before substituting. A capacitance left as 20 instead of \\(20 \\times 10^{-6}\\) F makes \\(X_C\\) a million times too small.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpac-terms",
      name: "Resistance, reactance, impedance and admittance",
      intuition:
        "All four are measured in ohm (admittance in its reciprocal), but they are not the same thing. A resistance turns electrical energy into heat. A reactance only stores energy in a magnetic or electric field and gives it back, and it changes with frequency. Impedance is the total opposition of a circuit that has both.",
      definition:
        "- **Inductive reactance:** the opposition offered by a pure inductor to the flow of AC. \\(X_L = \\omega L\\).\n" +
        "- **Capacitive reactance:** the opposition offered by a pure capacitor to the flow of AC. \\(X_C = 1/\\omega C\\).\n" +
        "- **Impedance:** the total effective opposition offered by the inductor, capacitor and resistor of an LCR circuit to the flow of AC. \\(Z = e_{rms}/i_{rms}\\).\n" +
        "- **Admittance:** the reciprocal of impedance, \\(Y = 1/Z\\). Its SI unit is \\(\\Omega^{-1}\\), or siemens.\n" +
        "- To compare resistance and reactance, set them side by side point by point, as in the table.",
      table: {
        columns: ["Point", "Resistance", "Reactance"],
        rows: [
          {
            cells: ["Effect on energy", "Dissipates energy as heat (\\(i^2R\\))", "Stores energy and returns it; no heat"],
          },
          {
            cells: ["Dependence on frequency", "Independent of frequency", "\\(X_L\\) rises with f; \\(X_C\\) falls with f"],
          },
          {
            cells: ["Phase of current", "In phase with the voltage", "Lags by \\(\\pi/2\\) (inductor) or leads by \\(\\pi/2\\) (capacitor)"],
          },
          {
            cells: ["Works for", "AC and DC alike", "AC only: \\(X_L = 0\\) and \\(X_C\\) infinite for DC"],
          },
          {
            cells: ["Symbol and unit", "R, ohm", "\\(X_L\\) or \\(X_C\\), ohm"],
            pyqExampleId: "b8f10185-3a6d-4df9-b10a-c24b60c52a17",
            noteAmber: "Board 2022 and 2026 asked you to define inductive reactance, capacitive reactance and impedance.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Name the quantity, give its formula and its unit: the opposition offered by a pure capacitor to the flow of alternating current.",
        steps: ["It is the capacitive reactance.", "\\(X_C = \\dfrac{1}{\\omega C} = \\dfrac{1}{2\\pi f C}\\), measured in ohm."],
        answer: "Capacitive reactance, \\(X_C = 1/(2\\pi f C)\\), ohm",
      },
      practiceSet: [
        { prompt: "Define admittance and give its SI unit.", answer: "The reciprocal of impedance, \\(Y = 1/Z\\); unit \\(\\Omega^{-1}\\) (siemens)" },
        { prompt: "Which of resistance and reactance produces heat?", answer: "Resistance" },
        { prompt: "Which of R, \\(X_L\\) and \\(X_C\\) does not change with frequency?", answer: "R" },
      ],
      traps: [
        {
          title: "Definition with no formula",
          body: "A one-line 'opposition to AC' earns part of the mark. Add the formula (\\(X_L = \\omega L\\), \\(X_C = 1/\\omega C\\), \\(Z = \\sqrt{R^2 + (X_L - X_C)^2}\\)) and the unit, ohm.",
        },
        {
          title: "One-sided comparison",
          body: "In 'compare resistance and reactance' each point must give both sides. 'Reactance stores energy' without 'resistance turns it into heat' is half a point.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpac-series-lcr",
      name: "Impedance of a series LCR circuit",
      intuition:
        "In a series circuit the same current flows through R, L and C, so draw the current as the reference arrow. The resistor's voltage lies along it, the inductor's points a quarter turn ahead and the capacitor's a quarter turn behind. The last two point in opposite directions, so they partly cancel. The supply voltage is the diagonal of the rectangle formed by what is left, which is why voltages here add by Pythagoras, not by simple addition.",
      definition:
        "- **Derivation** (draw the phasor diagram; it carries marks). Same current in all three: \\(i = i_0 \\sin \\omega t\\). Voltages: \\(e_R = i_0R\\) in phase with i, \\(e_L = i_0X_L\\) leading i by \\(90^\\circ\\), \\(e_C = i_0X_C\\) lagging i by \\(90^\\circ\\).\n" +
        "- Draw \\(i_0\\) along OX; \\(OA = e_R\\) along OX, \\(OB = e_L\\) upward, \\(OC = e_C\\) downward.\n" +
        "- \\(e_L\\) and \\(e_C\\) are \\(180^\\circ\\) apart, so they combine to \\(OB' = e_L - e_C\\) (for \\(e_L > e_C\\)).\n" +
        "- The applied e.m.f. is the diagonal OK of the rectangle OAKB': \\(e_0 = \\sqrt{e_R^2 + (e_L - e_C)^2} = i_0\\sqrt{R^2 + (X_L - X_C)^2}\\).\n" +
        "- So \\(Z = \\dfrac{e_0}{i_0} = \\sqrt{R^2 + (X_L - X_C)^2}\\), and the phase angle is \\(\\tan \\phi = \\dfrac{X_L - X_C}{R}\\).\n" +
        "- \\(X_L > X_C\\): inductive, \\(\\tan\\phi\\) positive, current lags. \\(X_C > X_L\\): capacitive, current leads. \\(X_L = X_C\\): \\(Z = R\\), the least value (resonance).",
      formula: {
        label: "Series LCR circuit",
        latex: "Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\qquad \\tan \\phi = \\frac{X_L - X_C}{R}, \\qquad i_{rms} = \\frac{e_{rms}}{Z}",
      },
      authoredExample: {
        prompt:
          "A 40 Ω resistor, an inductor of reactance 50 Ω and a capacitor of reactance 80 Ω are joined in series across a 200 V rms supply. Find the impedance, the rms current, the phase angle, and the rms voltage across each element.",
        steps: [
          "Given: \\(R = 40\\ \\Omega\\), \\(X_L = 50\\ \\Omega\\), \\(X_C = 80\\ \\Omega\\), \\(e_{rms} = 200\\) V.",
          "\\(Z = \\sqrt{40^2 + (50 - 80)^2} = \\sqrt{1600 + 900} = 50\\ \\Omega\\).",
          "\\(i_{rms} = \\dfrac{200}{50} = 4\\) A.",
          "\\(\\tan \\phi = \\dfrac{50 - 80}{40} = -0.75\\), so \\(\\phi = 36.9^\\circ\\); \\(X_C > X_L\\), so the current leads the voltage.",
          "\\(V_R = 4 \\times 40 = 160\\) V, \\(V_L = 4 \\times 50 = 200\\) V, \\(V_C = 4 \\times 80 = 320\\) V.",
          "Check: \\(\\sqrt{160^2 + (320 - 200)^2} = \\sqrt{25600 + 14400} = 200\\) V, the supply voltage.",
        ],
        answer: "Z = 50 Ω, 4 A, current leads by 36.9°; 160 V, 200 V and 320 V",
      },
      selfCheckExample: {
        prompt:
          "A coil of resistance 6 Ω and inductive reactance 8 Ω is connected to a 100 V rms supply. Find the rms current and the phase angle.",
        steps: [
          "\\(Z = \\sqrt{6^2 + 8^2} = 10\\ \\Omega\\), so \\(i_{rms} = \\dfrac{100}{10} = 10\\) A.",
          "\\(\\tan\\phi = \\dfrac{8}{6}\\), so \\(\\phi = 53.1^\\circ\\), the current lagging.",
        ],
        answer: "10 A, lagging the voltage by 53.1°",
      },
      practiceSet: [
        { prompt: "In a series LCR circuit \\(X_L = X_C\\). What is the impedance?", answer: "Z = R" },
        { prompt: "In a series LCR circuit \\(X_C > X_L\\). Does the current lead or lag the voltage?", answer: "It leads" },
        { prompt: "Find Z when R = 5 Ω and \\(X_L - X_C = 12\\ \\Omega\\).", answer: "13 Ω" },
        { prompt: "Why does adding a capacitor in series with L and R usually lower the impedance?", answer: "The capacitor's voltage is opposite to the inductor's, so the net reactance \\(X_L - X_C\\) is smaller" },
      ],
      pyqExampleId: "f6378844-6ba8-4c37-84f1-db971e9e3ccf",
      traps: [
        {
          title: "Adding the three voltages",
          body: "\\(V_R + V_L + V_C\\) is not the supply voltage; they are out of phase. In the example above 160 + 200 + 320 = 680 V, but the supply is only 200 V. Combine them as phasors.",
        },
        {
          title: "Derivation with no phasor diagram",
          body: "The board asks you to derive Z 'with a phasor diagram'. Without the labelled diagram (current along OX, \\(e_L\\) up, \\(e_C\\) down, the resultant at angle \\(\\phi\\)) the derivation loses marks even if the algebra is right.",
        },
        {
          title: "Sign of the phase angle",
          body: "\\(\\tan\\phi = (X_L - X_C)/R\\) is positive when the circuit is inductive (current lags) and negative when it is capacitive (current leads). State which one your answer means.",
        },
      ],
    },
  ],
};

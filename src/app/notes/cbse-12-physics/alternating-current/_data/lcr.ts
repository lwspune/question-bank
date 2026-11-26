import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_AC_LCR_NOTE: SubtopicNote = {
  subtopicName: "Series LCR Circuit and Resonance",
  title: "The Series LCR Circuit, Impedance and Resonance",
  oneLineDefinition:
    "The phasor diagram of a series LCR circuit, its impedance and phase angle, numericals on RL, RC and LCR circuits, and resonance: its condition, its frequency and the current and voltages it gives.",
  whyItMatters:
    "33 questions, twenty-eight of them from board papers, the most of any page in this chapter. The board asks you to derive the impedance and phase angle with a phasor diagram (2023, 2024, 2025, 2026), find impedance, phase angle, current or voltages in RL, RC and LCR circuits (2023, 2024, 2025, 2026), identify elements from how the current leads or lags (2023, 2024, 2025, 2026), state the condition for resonance, what the resonant frequency depends on and draw the current against frequency graph (2023, 2024, 2025, 2026), and find the current and the voltage across L or C at resonance (2023, 2024, 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpac-impedance",
      name: "Phasor diagram, impedance and phase angle",
      intuition:
        "In a series circuit the same current flows through R, L and C, so draw the current first and place each voltage against it. The resistor's voltage is in step with the current, the inductor's is a quarter turn ahead and the capacitor's a quarter turn behind. The inductor and capacitor voltages point in opposite directions, so they partly cancel. What is left is added to the resistor's voltage like the two sides of a right triangle, not in a straight line.",
      definition:
        "- **Derivation outline (NCERT's symbols):**\n" +
        "- The same current \\(i = i_m \\sin(\\omega t + \\phi)\\) flows through R, L and C. Take the current phasor I as reference.\n" +
        "- \\(V_R\\) is parallel to I, \\(V_L\\) is \\(\\pi/2\\) ahead of I and \\(V_C\\) is \\(\\pi/2\\) behind I, with amplitudes \\(v_{Rm} = i_m R\\), \\(v_{Lm} = i_m X_L\\), \\(v_{Cm} = i_m X_C\\).\n" +
        "- \\(V_L\\) and \\(V_C\\) lie along one line in opposite directions, so they combine into one phasor of size \\(|v_{Cm} - v_{Lm}|\\), at right angles to \\(V_R\\).\n" +
        "- The source voltage V is the hypotenuse: \\(v_m^2 = v_{Rm}^2 + (v_{Cm} - v_{Lm})^2 = i_m^2 \\left[R^2 + (X_C - X_L)^2\\right]\\).\n" +
        "- So \\(i_m = \\dfrac{v_m}{Z}\\) with **impedance** \\(Z = \\sqrt{R^2 + (X_C - X_L)^2}\\), and the phase angle is \\(\\tan \\phi = \\dfrac{X_C - X_L}{R}\\). The right triangle with sides R, \\(X_C - X_L\\) and Z is the impedance diagram.\n" +
        "- If \\(X_C > X_L\\) the circuit is mainly capacitive and the current leads the source voltage; if \\(X_L > X_C\\) it is mainly inductive and the current lags.\n" +
        "- **Resistance and impedance differ:** resistance opposes dc and ac alike and does not depend on frequency; impedance is the total opposition of R, L and C to ac and depends on frequency through \\(X_L\\) and \\(X_C\\).",
      formula: {
        label: "Impedance and phase angle",
        latex: "Z = \\sqrt{R^2 + (X_C - X_L)^2}, \\qquad \\tan \\phi = \\frac{X_C - X_L}{R}, \\qquad i_m = \\frac{v_m}{Z}",
        symbols: [
          { symbol: "\\(Z\\)", meaning: "impedance in ohms" },
          { symbol: "\\(\\phi\\)", meaning: "phase angle between the source voltage and the current" },
        ],
      },
      authoredExample: {
        prompt:
          "A series LCR circuit has \\(R = 8\\ \\Omega\\), \\(X_L = 10\\ \\Omega\\) and \\(X_C = 4\\ \\Omega\\), connected to a 100 V (rms) ac supply. Find the impedance, the rms current and the phase angle. Does the current lead or lag the voltage?",
        steps: [
          "Given: \\(R = 8\\ \\Omega\\), \\(X_L = 10\\ \\Omega\\), \\(X_C = 4\\ \\Omega\\), \\(V = 100\\) V.",
          "Formula: \\(Z = \\sqrt{R^2 + (X_C - X_L)^2}\\).",
          "\\(Z = \\sqrt{8^2 + (4 - 10)^2} = \\sqrt{64 + 36} = 10\\ \\Omega\\).",
          "\\(I = \\dfrac{V}{Z} = \\dfrac{100}{10} = 10\\) A.",
          "\\(\\tan \\phi = \\dfrac{4 - 10}{8} = -0.75\\), so \\(\\phi = -36.9^\\circ\\).",
          "\\(X_L > X_C\\): the circuit is inductive and the current lags the voltage by \\(36.9^\\circ\\).",
        ],
        answer: "10 Ω; 10 A; current lags by 36.9°",
      },
      selfCheckExample: {
        prompt: "A series LCR circuit has \\(R = 30\\ \\Omega\\), \\(X_L = 20\\ \\Omega\\) and \\(X_C = 60\\ \\Omega\\). Find its impedance and say whether the current leads or lags.",
        steps: [
          "\\(Z = \\sqrt{30^2 + (60 - 20)^2} = \\sqrt{900 + 1600} = 50\\ \\Omega\\).",
          "\\(\\tan \\phi = \\dfrac{40}{30}\\), so \\(\\phi = 53.1^\\circ\\); \\(X_C > X_L\\), so the current leads.",
        ],
        answer: "50 Ω; current leads by 53.1°",
      },
      practiceSet: [
        { prompt: "Why can the voltages across L and C in a series circuit be combined into a single phasor?", answer: "They lie along the same line in opposite directions, \\(\\pi\\) apart" },
        { prompt: "What is the impedance of a series LCR circuit when \\(X_L = X_C\\)?", answer: "\\(Z = R\\)" },
        { prompt: "Give one difference between resistance and impedance.", answer: "Resistance does not depend on frequency; impedance does, through the reactances" },
      ],
      pyqExampleId: "0514e15b-dd4e-46dd-bef5-ca733677b376",
      traps: [
        {
          title: "Adding R and the reactances in a straight line",
          body: "Z is not \\(R + X_L + X_C\\). The reactances subtract from each other, and the result adds to R at right angles: \\(Z = \\sqrt{R^2 + (X_C - X_L)^2}\\).",
        },
        {
          title: "A phasor diagram with nothing labelled",
          body: "Draw I as the reference, \\(V_R\\) along it, \\(V_L\\) a quarter turn ahead and \\(V_C\\) a quarter turn behind, then the resultant V and the angle \\(\\phi\\). An unlabelled sketch loses the diagram mark.",
        },
        {
          title: "Giving φ without saying which leads",
          body: "Some books write \\(\\tan \\phi = (X_L - X_C)/R\\); the size of the angle is the same. Always add in words whether the current leads or lags the voltage.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpac-series",
      name: "Numericals on RL, RC and LCR circuits",
      intuition:
        "Every series numerical follows one path: find each reactance, find Z, then the current from \\(I = V/Z\\), then each voltage from the current. The voltages across the parts, read on separate voltmeters, add up to more than the supply. That is not a mistake: they peak at different moments, so only their phasor sum equals the supply. A coil is often a resistance and an inductance together; dc sees only its resistance, ac sees both.",
      definition:
        "- RL circuit: \\(Z = \\sqrt{R^2 + X_L^2}\\), current lags, \\(\\tan \\phi = X_L/R\\).\n" +
        "- RC circuit: \\(Z = \\sqrt{R^2 + X_C^2}\\), current leads, \\(\\tan \\phi = X_C/R\\).\n" +
        "- Voltages: \\(V_R = IR\\), \\(V_L = IX_L\\), \\(V_C = IX_C\\), and \\(V = \\sqrt{V_R^2 + (V_L - V_C)^2}\\).\n" +
        "- Reading a source: \\(v = 311 \\sin(314 t)\\) means \\(v_m = 311\\) V, \\(V = v_m/\\sqrt{2} = 220\\) V and \\(\\omega = 314\\) rad/s. Use rms values throughout, or peak values throughout, never a mix.\n" +
        "- Values such as \\(L = \\tfrac{3}{\\pi}\\) H at \\(\\omega = 2\\pi \\times 50\\) rad/s are chosen so that \\(\\pi\\) cancels: \\(X_L = 300\\ \\Omega\\).\n" +
        "- Identifying elements: in phase means a resistor; current lagging by \\(\\pi/2\\) means an inductor; leading by \\(\\pi/2\\) means a capacitor. A lag or lead of \\(\\pi/4\\) means a resistance with a reactance equal to it.",
      formula: {
        label: "Series circuit values",
        latex: "I = \\frac{V}{Z}, \\qquad V_R = IR, \\quad V_L = IX_L, \\quad V_C = IX_C, \\qquad V = \\sqrt{V_R^2 + (V_L - V_C)^2}",
      },
      authoredExample: {
        prompt:
          "A resistor of 60 Ω and a capacitor of \\(\\left(\\dfrac{62.5}{\\pi}\\right)\\ \\mu\\text{F}\\) are joined in series to a 220 V, 100 Hz supply. Find (a) the current, (b) the voltage across each element. (c) Is the algebraic sum of these voltages more than 220 V? Explain.",
        steps: [
          "Given: \\(R = 60\\ \\Omega\\), \\(C = \\dfrac{62.5}{\\pi} \\times 10^{-6}\\) F, \\(V = 220\\) V, \\(\\omega = 2\\pi \\times 100 = 200\\pi\\) rad/s.",
          "\\(X_C = \\dfrac{1}{\\omega C} = \\dfrac{1}{200\\pi \\times \\dfrac{62.5}{\\pi} \\times 10^{-6}} = \\dfrac{1}{0.0125} = 80\\ \\Omega\\).",
          "\\(Z = \\sqrt{60^2 + 80^2} = 100\\ \\Omega\\), so (a) \\(I = \\dfrac{220}{100} = 2.2\\) A.",
          "(b) \\(V_R = 2.2 \\times 60 = 132\\) V; \\(V_C = 2.2 \\times 80 = 176\\) V.",
          "(c) \\(132 + 176 = 308\\) V, more than 220 V. The two voltages are \\(\\pi/2\\) apart in phase, so they add as phasors: \\(\\sqrt{132^2 + 176^2} = 220\\) V, the supply voltage.",
        ],
        answer: "(a) 2.2 A; (b) 132 V and 176 V; (c) yes, 308 V, but their phasor sum is 220 V",
      },
      selfCheckExample: {
        prompt: "A resistor and a pure inductor are in series across a 50 V ac supply. A voltmeter reads 30 V across the resistor. What does it read across the inductor?",
        steps: ["\\(V_L = \\sqrt{V^2 - V_R^2} = \\sqrt{50^2 - 30^2} = \\sqrt{1600} = 40\\) V."],
        answer: "40 V",
      },
      practiceSet: [
        { prompt: "A coil takes 4 A from a 12 V dc supply and 2.4 A from a 12 V ac supply. Find its resistance and its reactance.", answer: "\\(R = 3\\ \\Omega\\), \\(Z = 5\\ \\Omega\\), so \\(X_L = 4\\ \\Omega\\)" },
        { prompt: "In a series circuit the current lags the voltage by \\(\\pi/4\\). What does this tell you about R and the reactance?", answer: "The circuit is inductive and \\(X_L - X_C = R\\)" },
        { prompt: "A resistor and a capacitor in series each have 40 V across them. What is the supply voltage?", answer: "\\(40\\sqrt{2} = 56.6\\) V" },
      ],
      pyqExampleId: "3e11df71-5593-4a1b-8540-bcc1c57f705a",
      traps: [
        {
          title: "Adding voltmeter readings",
          body: "In an ac series circuit the separate voltages do not add up to the supply. The option you get by simply adding or subtracting the readings is the bait; use \\(V^2 = V_R^2 + V_L^2\\).",
        },
        {
          title: "Mixing peak and rms values",
          body: "If the source is given as \\(v_m \\sin \\omega t\\), first write \\(V = v_m/\\sqrt{2}\\). A current found from the peak voltage is a peak current; say so.",
        },
        {
          title: "Millihenry and microfarad left unconverted",
          body: "\\(1\\) mH \\(= 10^{-3}\\) H and \\(1\\ \\mu\\text{F} = 10^{-6}\\) F. Convert before finding the reactance, and give every answer its unit.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpac-resonance",
      name: "Resonance: its condition and the resonant frequency",
      intuition:
        "Raise the frequency of the source slowly. At low frequency the capacitor's reactance is huge; at high frequency the inductor's is. Somewhere between, the two reactances are equal and cancel, leaving only R. There the impedance is least and the current is largest, like a swing pushed in time with its own natural rhythm. A radio is tuned this way: turning the knob changes C until the circuit resonates with one station.",
      definition:
        "- **Condition:** as \\(\\omega\\) varies, \\(Z = \\sqrt{R^2 + (X_C - X_L)^2}\\) is least when \\(X_C = X_L\\), that is \\(\\omega_0 L = \\dfrac{1}{\\omega_0 C}\\).\n" +
        "- **Resonant frequency:** \\(\\omega_0 = \\dfrac{1}{\\sqrt{LC}}\\), so \\(\\nu_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}\\). It depends only on L and C, not on R or on the source voltage.\n" +
        "- At resonance \\(Z = R\\), the current amplitude is largest, \\(i_m = v_m/R\\), and the current is in phase with the voltage: the circuit behaves as a pure resistor.\n" +
        "- **Graph:** current amplitude against \\(\\omega\\) rises to a single peak at \\(\\omega_0\\) and falls again. With a smaller R the peak is taller (half the R gives twice the peak current).\n" +
        "- Below \\(\\omega_0\\), \\(X_C > X_L\\) and the circuit is capacitive; above \\(\\omega_0\\), \\(X_L > X_C\\) and it is inductive. So as the frequency rises, Z first falls to R and then rises.\n" +
        "- Resonance needs both L and C in the circuit; only then can their voltages cancel.\n" +
        "- Uses: tuning a radio or TV, and the metal detector at an airport, where metal in the coil changes the impedance and so the current.",
      formula: {
        label: "Resonant frequency",
        latex: "X_L = X_C \\;\\Rightarrow\\; \\omega_0 = \\frac{1}{\\sqrt{LC}}, \\qquad \\nu_0 = \\frac{1}{2\\pi\\sqrt{LC}}, \\qquad Z_{\\min} = R",
      },
      authoredExample: {
        prompt:
          "A series LCR circuit has \\(L = 0.5\\) H, \\(C = 20\\ \\mu\\text{F}\\) and \\(R = 50\\ \\Omega\\), and is driven by a 100 V (rms) source of variable frequency. Find the resonant angular frequency, the resonant frequency, and the impedance and rms current at resonance.",
        steps: [
          "Given: \\(L = 0.5\\) H, \\(C = 20 \\times 10^{-6}\\) F, \\(R = 50\\ \\Omega\\), \\(V = 100\\) V.",
          "Formula: \\(\\omega_0 = \\dfrac{1}{\\sqrt{LC}}\\).",
          "\\(LC = 0.5 \\times 20 \\times 10^{-6} = 10^{-5}\\ \\text{s}^2\\), so \\(\\omega_0 = \\dfrac{1}{\\sqrt{10^{-5}}} = 316.2\\) rad/s.",
          "\\(\\nu_0 = \\dfrac{316.2}{2 \\times 3.142} = 50.3\\) Hz.",
          "At resonance \\(Z = R = 50\\ \\Omega\\) and \\(I = \\dfrac{100}{50} = 2\\) A.",
        ],
        answer: "316.2 rad/s; 50.3 Hz; Z = 50 Ω; I = 2 A",
      },
      selfCheckExample: {
        prompt: "A series LCR circuit is driven at a frequency below its resonant frequency. Is the circuit inductive or capacitive, and does the current lead or lag?",
        steps: [
          "Below \\(\\omega_0\\), \\(X_C = 1/\\omega C\\) is larger than \\(X_L = \\omega L\\).",
          "So the circuit is capacitive and the current leads the voltage.",
        ],
        answer: "Capacitive; the current leads",
      },
      practiceSet: [
        { prompt: "Can a series circuit of a resistor and an inductor alone show resonance?", answer: "No. Resonance needs both L and C" },
        { prompt: "Assertion (A): Doubling R does not change the resonant frequency of a series LCR circuit. Reason (R): \\(\\nu_0 = 1/2\\pi\\sqrt{LC}\\) contains no R. Choose: both true and R explains A / both true and R does not explain A / A true, R false / both false.", answer: "Both true and R explains A" },
        { prompt: "What is the phase difference between the current and the source voltage at resonance?", answer: "Zero" },
      ],
      pyqExampleId: "d1f92bea-4a52-48e2-a0a4-604478f56f19",
      traps: [
        {
          title: "Saying the resonant frequency depends on R",
          body: "R sets the height of the current peak, not where it sits. The resonant frequency depends on L and C alone.",
        },
        {
          title: "A resonance graph without its peak marked",
          body: "Label the axes (current amplitude against \\(\\omega\\)), mark \\(\\omega_0\\) under the peak and the peak value \\(v_m/R\\). An unlabelled hump loses the graph mark.",
        },
        {
          title: "Both statements true is not enough",
          body: "In an assertion-reason item, after finding both statements true, ask whether the reason is WHY the assertion holds. Choose 'R explains A' only if it does.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpac-resonance-values",
      name: "Current and voltages at resonance",
      intuition:
        "At resonance the inductor and capacitor voltages are equal and exactly opposite, so together they add to zero and the whole supply voltage appears across R. But each of them on its own equals the current times its reactance, and with a large current that can be many times the supply voltage. A capacitor in such a circuit must be rated for that larger voltage.",
      definition:
        "- At resonance: \\(Z = R\\), \\(I = \\dfrac{V}{R}\\), current amplitude \\(i_m = \\sqrt{2}\\, I\\).\n" +
        "- \\(V_R = IR = V\\): the whole source voltage is across R.\n" +
        "- \\(V_L = IX_L\\) and \\(V_C = IX_C\\) are equal in size and opposite in phase, so the voltage across L and C together is zero. Each can be far larger than V.\n" +
        "- To find \\(V_L\\) or \\(V_C\\), first find \\(\\omega_0 = 1/\\sqrt{LC}\\), then \\(X_L = \\omega_0 L\\) or \\(X_C = 1/\\omega_0 C\\).\n" +
        "- A charged capacitor joined to an inductor oscillates freely at the same angular frequency, \\(\\omega_0 = 1/\\sqrt{LC}\\).",
      formula: {
        label: "At resonance",
        latex: "I = \\frac{V}{R}, \\qquad V_L = V_C = I\\omega_0 L = \\frac{I}{\\omega_0 C}, \\qquad V_{LC} = 0",
      },
      authoredExample: {
        prompt:
          "A series LCR circuit with \\(R = 5\\ \\Omega\\), \\(L = 0.4\\) H and \\(C = 2.5\\ \\mu\\text{F}\\) is connected to a 60 V (rms) source of variable frequency. At resonance find (a) the rms current, (b) the rms voltage across the inductor, the capacitor and the resistor.",
        steps: [
          "Given: \\(R = 5\\ \\Omega\\), \\(L = 0.4\\) H, \\(C = 2.5 \\times 10^{-6}\\) F, \\(V = 60\\) V.",
          "\\(\\omega_0 = \\dfrac{1}{\\sqrt{LC}} = \\dfrac{1}{\\sqrt{0.4 \\times 2.5 \\times 10^{-6}}} = \\dfrac{1}{10^{-3}} = 1000\\) rad/s.",
          "(a) At resonance \\(Z = R\\): \\(I = \\dfrac{60}{5} = 12\\) A.",
          "(b) \\(X_L = \\omega_0 L = 1000 \\times 0.4 = 400\\ \\Omega\\), so \\(V_L = 12 \\times 400 = 4800\\) V.",
          "\\(X_C = \\dfrac{1}{\\omega_0 C} = \\dfrac{1}{1000 \\times 2.5 \\times 10^{-6}} = 400\\ \\Omega\\), so \\(V_C = 4800\\) V.",
          "\\(V_R = 12 \\times 5 = 60\\) V. \\(V_L\\) and \\(V_C\\) are opposite in phase and cancel.",
        ],
        answer: "(a) 12 A; (b) 4800 V across L, 4800 V across C, 60 V across R",
      },
      selfCheckExample: {
        prompt: "A charged \\(2\\ \\mu\\text{F}\\) capacitor is connected across a 50 mH inductor. Find the angular frequency of the free oscillations.",
        steps: [
          "\\(LC = 50 \\times 10^{-3} \\times 2 \\times 10^{-6} = 10^{-7}\\ \\text{s}^2\\).",
          "\\(\\omega_0 = \\dfrac{1}{\\sqrt{10^{-7}}} = 3162\\) rad/s.",
        ],
        answer: "3162 rad/s",
      },
      practiceSet: [
        { prompt: "At resonance the voltage across the resistor of a series LCR circuit is 30 V. What is the source voltage?", answer: "30 V" },
        { prompt: "Find the resonant angular frequency for \\(L = 1\\) H and \\(C = 4\\ \\mu\\text{F}\\).", answer: "500 rad/s" },
        { prompt: "Why is the voltage across the L and C together zero at resonance?", answer: "\\(V_L\\) and \\(V_C\\) are equal in size and opposite in phase" },
      ],
      pyqExampleId: "e234c6b1-787d-4cec-a73a-8c6196a6b10c",
      traps: [
        {
          title: "Giving the rms current when the amplitude is asked",
          body: "The amplitude of the current is the peak value, \\(\\sqrt{2}\\) times the rms value. A source quoted as 230 V means 230 V rms unless it says peak.",
        },
        {
          title: "Thinking a large voltage across C is impossible",
          body: "\\(V_C\\) can be many times the supply voltage at resonance. It is cancelled by \\(V_L\\), so the supply has to provide only \\(V_R\\).",
        },
      ],
    },
  ],
};

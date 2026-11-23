import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_AC_RESONANCE_NOTE: SubtopicNote = {
  subtopicName: "Electrical Resonance and Q Factor",
  title: "Electrical Resonance and the Q Factor",
  oneLineDefinition:
    "The frequency at which the inductive and capacitive reactances cancel, what a series (acceptor) and a parallel (rejector) circuit do at that frequency, and the Q factor that measures how sharp the resonance is.",
  whyItMatters:
    "4 questions. Three came from board papers: derive the resonant frequency of a series resonant circuit (2026), calculate it for 0.1 H and 25 μF in series (2022), and state the conditions for parallel resonance and derive its resonant frequency (2019). The textbook adds the impedance and current of a series circuit at resonance. The Q factor was asked once, in 2024, as half of a question filed on the power page.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpac-series-resonance",
      name: "Series resonance and the Q factor",
      intuition:
        "The inductor's reactance grows with frequency and the capacitor's falls, so at one frequency they are equal. There their voltages, being opposite, cancel exactly, the impedance drops to just R and the current is as large as it can be. A radio tuner uses this: it lets the station at its resonant frequency through and turns the others away. The sharper the peak, the better it picks one station.",
      definition:
        "- **Derivation** of the resonant frequency. Impedance \\(Z = \\sqrt{R^2 + (X_L - X_C)^2}\\); the current \\(i = e/Z\\) is largest when Z is least.\n" +
        "- Z is least when \\(X_L = X_C\\), that is \\(\\omega_r L = \\dfrac{1}{\\omega_r C}\\).\n" +
        "- So \\(\\omega_r^2 = \\dfrac{1}{LC}\\), \\(\\omega_r = \\dfrac{1}{\\sqrt{LC}}\\), and with \\(\\omega_r = 2\\pi f_r\\), \\(f_r = \\dfrac{1}{2\\pi\\sqrt{LC}}\\).\n" +
        "- **Characteristics:** \\(Z = R\\) (least), the circuit is purely resistive, current and voltage are in phase, the current is maximum \\(i_0 = e_0/R\\). It accepts the resonant frequency and rejects others, so it is an **acceptor circuit**. Resonance needs both L and C: an LR or CR circuit cannot resonate.\n" +
        "- **Q factor:** the ratio of the resonant frequency to the difference of the two frequencies, one on each side of it, at which the current amplitude is \\(1/\\sqrt{2}\\) times its value at resonance: \\(Q = \\dfrac{\\omega_r}{\\omega_2 - \\omega_1} = \\dfrac{\\omega_r}{2\\Delta\\omega}\\) = resonant frequency / bandwidth.\n" +
        "- Q has no unit. A larger Q means a smaller bandwidth, a sharper peak and a more selective circuit.",
      formula: {
        label: "Resonant frequency and Q factor",
        latex: "f_r = \\frac{1}{2\\pi\\sqrt{LC}}, \\qquad Q = \\frac{\\omega_r}{\\omega_2 - \\omega_1}",
      },
      authoredExample: {
        prompt:
          "A 10 Ω resistor, a 0.2 H inductor and a 50 μF capacitor are joined in series to a 100 V rms source whose frequency can be varied. Find the resonant frequency, and the impedance and rms current at resonance. (\\(\\pi = 3.142\\))",
        steps: [
          "Given: \\(R = 10\\ \\Omega\\), \\(L = 0.2\\) H, \\(C = 50 \\times 10^{-6}\\) F, \\(e_{rms} = 100\\) V.",
          "\\(LC = 0.2 \\times 50 \\times 10^{-6} = 10^{-5}\\), so \\(\\sqrt{LC} = 3.162 \\times 10^{-3}\\).",
          "\\(f_r = \\dfrac{1}{2 \\times 3.142 \\times 3.162 \\times 10^{-3}} = 50.32\\) Hz.",
          "At resonance \\(Z = R = 10\\ \\Omega\\), so \\(i_{rms} = \\dfrac{100}{10} = 10\\) A.",
        ],
        answer: "50.32 Hz; Z = 10 Ω; 10 A",
      },
      selfCheckExample: {
        prompt:
          "A series LCR circuit resonates at 1000 rad/s. The current falls to \\(1/\\sqrt{2}\\) of its peak value at 950 rad/s and at 1050 rad/s. Find the Q factor.",
        steps: ["Bandwidth \\(\\omega_2 - \\omega_1 = 1050 - 950 = 100\\) rad/s.", "\\(Q = \\dfrac{1000}{100} = 10\\)."],
        answer: "10",
      },
      practiceSet: [
        { prompt: "Why is a series resonant circuit called an acceptor circuit?", answer: "It allows the largest current at the resonant frequency and rejects other frequencies" },
        { prompt: "Can an LR circuit show resonance?", answer: "No. Both L and C are needed so that their voltages can cancel" },
        { prompt: "What is the unit of the Q factor?", answer: "It has none; it is a ratio of two frequencies" },
        { prompt: "Does the resistance change the resonant frequency of a series LCR circuit?", answer: "No. It depends on L and C only; R decides the size of the current at resonance" },
      ],
      pyqExampleId: "6b55812e-b139-4c4a-8d64-1db7b625644c",
      traps: [
        {
          title: "Using the supply frequency",
          body: "The resonant frequency comes from L and C alone. A question may quote the supply's frequency, its voltage and R as well; none of them enters \\(1/(2\\pi\\sqrt{LC})\\).",
        },
        {
          title: "A condition stated without its result",
          body: "'At resonance \\(X_L = X_C\\)' is the condition. For full marks also give what follows: Z = R (minimum), current maximum and in phase with the voltage.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpac-parallel-resonance",
      name: "Series and parallel resonance compared",
      intuition:
        "Join the inductor and capacitor side by side instead. The inductor's current lags the e.m.f. by a quarter cycle and the capacitor's leads it by a quarter cycle, so the two branch currents point in opposite directions. At the frequency where they are equal they cancel and the source supplies almost no current. The same frequency that a series circuit welcomes, a parallel circuit blocks.",
      definition:
        "- **Derivation** for an inductor L and a capacitor C in parallel (the present book's circuit): \\(i_L = \\dfrac{e_0}{X_L}\\sin\\left(\\omega t - \\dfrac{\\pi}{2}\\right)\\) and \\(i_C = \\dfrac{e_0}{X_C}\\sin\\left(\\omega t + \\dfrac{\\pi}{2}\\right)\\).\n" +
        "- Total current \\(i = i_L + i_C = e_0 \\cos\\omega t\\left(\\dfrac{1}{X_C} - \\dfrac{1}{X_L}\\right) = e_0\\cos\\omega t\\left(\\omega C - \\dfrac{1}{\\omega L}\\right)\\).\n" +
        "- i is minimum when \\(\\omega C = \\dfrac{1}{\\omega L}\\), so \\(\\omega^2 = \\dfrac{1}{LC}\\) and \\(f_r = \\dfrac{1}{2\\pi\\sqrt{LC}}\\).\n" +
        "- The 2019 paper began 'assuming the expression for impedance in a parallel resonant circuit'. The present book gives no such impedance formula; it uses L and C only and works with the currents, so learn the derivation above and the table below. In 2020 the board asked the resonant frequency of a parallel LC circuit as a calculation.",
      table: {
        columns: ["Point", "Series resonance", "Parallel resonance"],
        rows: [
          { cells: ["Arrangement", "L, C and R in series", "L and C in parallel across the source"] },
          {
            cells: ["Condition", "\\(X_L = X_C\\)", "\\(X_L = X_C\\)"],
            pyqExampleId: "33d2abc5-0e00-4abf-afeb-2e802ebd7292",
            noteAmber: "Board 2019 asked the conditions for parallel resonance and an expression for its resonant frequency.",
          },
          { cells: ["Resonant frequency", "\\(f_r = 1/(2\\pi\\sqrt{LC})\\)", "\\(f_r = 1/(2\\pi\\sqrt{LC})\\), the same"] },
          { cells: ["Impedance", "Minimum, equal to R", "Maximum"] },
          { cells: ["Current from the source", "Maximum", "Minimum"] },
          { cells: ["Name", "Acceptor circuit", "Rejector circuit"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A 0.1 H inductor and a 10 μF capacitor are joined in parallel across a variable-frequency source. Find the resonant frequency and say what the current drawn from the source does there. (\\(\\pi = 3.142\\))",
        steps: [
          "\\(\\sqrt{LC} = \\sqrt{0.1 \\times 10 \\times 10^{-6}} = 10^{-3}\\).",
          "\\(f_r = \\dfrac{1}{2 \\times 3.142 \\times 10^{-3}} = 159.1\\) Hz. The current from the source is minimum there.",
        ],
        answer: "159.1 Hz; the current drawn is a minimum",
      },
      practiceSet: [
        { prompt: "Why is a parallel resonant circuit called a rejector circuit?", answer: "It offers a very high impedance to the current of the resonant frequency and rejects it" },
        { prompt: "Is the impedance of a parallel resonant circuit maximum or minimum at resonance?", answer: "Maximum" },
        { prompt: "Do a series and a parallel circuit made from the same L and C resonate at the same frequency?", answer: "Yes, both at \\(1/(2\\pi\\sqrt{LC})\\)" },
      ],
      traps: [
        {
          title: "Calling a parallel circuit an acceptor",
          body: "Series resonance: Z minimum, current maximum, acceptor. Parallel resonance: Z maximum, current minimum, rejector. Swapping the names is the commonest slip in this question.",
        },
        {
          title: "Giving the parallel circuit a different frequency",
          body: "Both circuits resonate at \\(X_L = X_C\\), so the formula for \\(f_r\\) is the same. Only the behaviour at resonance differs.",
        },
      ],
    },
  ],
};

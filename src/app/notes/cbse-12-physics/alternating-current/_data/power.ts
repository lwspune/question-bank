import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_AC_POWER_NOTE: SubtopicNote = {
  subtopicName: "Power in AC Circuits and the Power Factor",
  title: "Power in an AC Circuit and the Power Factor",
  oneLineDefinition:
    "The average power taken by a series LCR circuit, the power factor and how to find it, and the wattless current in a purely inductive or capacitive circuit.",
  whyItMatters:
    "10 questions, seven of them from board papers. The board asks you to derive the average power in a series LCR circuit (2023, 2024), give the power factor of a purely inductive and a purely resistive circuit (2023), choose the expression for average power (2025), find the phase difference when one quantity is a sine and the other a cosine (2024), find a power factor from the circuit values (2023, 2026), and distinguish reactance from impedance and show that an ideal inductor takes no power (2024).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpac-average-power",
      name: "Average power in a series LCR circuit",
      intuition:
        "Power at any instant is voltage times current. When the two are in step, the product is always positive and energy flows steadily into the circuit. When they are out of step, the product is negative for part of each cycle: energy flows back to the source. Averaged over a cycle, only the part of the current in step with the voltage delivers power, and the cosine of the phase angle measures that part.",
      definition:
        "- **Derivation outline:**\n" +
        "- \\(v = v_m \\sin \\omega t\\) drives \\(i = i_m \\sin(\\omega t + \\phi)\\).\n" +
        "- Instantaneous power: \\(p = vi = v_m i_m \\sin \\omega t \\sin(\\omega t + \\phi) = \\dfrac{v_m i_m}{2}\\left[\\cos \\phi - \\cos(2\\omega t + \\phi)\\right]\\).\n" +
        "- The first term is constant. The second varies with time and its average over a cycle is zero.\n" +
        "- So \\(P = \\dfrac{v_m i_m}{2} \\cos \\phi = \\dfrac{v_m}{\\sqrt{2}} \\dfrac{i_m}{\\sqrt{2}} \\cos \\phi = VI \\cos \\phi\\), which can also be written \\(P = I^2 Z \\cos \\phi\\).\n" +
        "- \\(\\cos \\phi\\) is the **power factor**. The average power depends on V and I and also on the phase angle between them.",
      formula: {
        label: "Average power",
        latex: "P = \\frac{v_m i_m}{2} \\cos \\phi = VI \\cos \\phi = I^2 Z \\cos \\phi",
        symbols: [
          { symbol: "\\(V, I\\)", meaning: "rms voltage and rms current" },
          { symbol: "\\(\\cos \\phi\\)", meaning: "power factor" },
        ],
      },
      authoredExample: {
        prompt:
          "A voltage \\(v = 200 \\sin \\omega t\\) V drives a current \\(i = 5 \\sin(\\omega t - \\pi/3)\\) A in a circuit. Find the average power taken by the circuit.",
        steps: [
          "Given: \\(v_m = 200\\) V, \\(i_m = 5\\) A, \\(\\phi = \\pi/3 = 60^\\circ\\) (the current lags).",
          "Formula: \\(P = \\dfrac{v_m i_m}{2} \\cos \\phi\\).",
          "\\(P = \\dfrac{200 \\times 5}{2} \\times \\cos 60^\\circ = 500 \\times 0.5\\).",
          "\\(P = 250\\) W.",
        ],
        answer: "250 W",
      },
      selfCheckExample: {
        prompt: "In a circuit \\(i = 4 \\sin \\omega t\\) A and \\(v = 100 \\cos \\omega t\\) V. Find the phase difference and the average power.",
        steps: [
          "\\(v = 100 \\cos \\omega t = 100 \\sin(\\omega t + \\pi/2)\\), so the phase difference is \\(\\pi/2\\).",
          "\\(P = \\dfrac{100 \\times 4}{2} \\cos 90^\\circ = 0\\).",
        ],
        answer: "π/2; zero power",
      },
      practiceSet: [
        { prompt: "An ac circuit carries 2 A rms at 220 V rms with a phase angle of \\(60^\\circ\\). Find the average power.", answer: "220 W" },
        { prompt: "Why does the term \\(\\cos(2\\omega t + \\phi)\\) drop out of the average power?", answer: "Its average over a complete cycle is zero" },
        { prompt: "Write the average power in terms of the rms current, the impedance and the phase angle.", answer: "\\(P = I^2 Z \\cos \\phi\\)" },
      ],
      pyqExampleId: "c35db126-c94e-411f-be1c-12b8ed084a92",
      traps: [
        {
          title: "Forgetting the factor of one half",
          body: "With peak values, \\(P = \\tfrac{1}{2} v_m i_m \\cos \\phi\\). With rms values the half is already inside, \\(P = VI \\cos \\phi\\). Using peak values without the half doubles the answer.",
        },
        {
          title: "Subtracting the phase of a sine from that of a cosine",
          body: "Write both as sines first, using \\(\\cos \\theta = \\sin(\\theta + \\pi/2)\\), and only then subtract the phases.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpac-power-factor",
      name: "Finding the power factor",
      intuition:
        "Only the resistor turns electrical energy into heat; the inductor and capacitor store energy for a quarter cycle and hand it back. So the power factor is simply the share of the impedance that is resistance, R out of Z. It runs from 0 for a pure inductor or capacitor to 1 for a pure resistor or a circuit at resonance.",
      definition:
        "- **Power factor:** \\(\\cos \\phi = \\dfrac{R}{Z}\\), the cosine of the phase angle between the voltage and the current. It lies between 0 and 1.\n" +
        "- Average power is dissipated in R only: \\(P = VI \\cos \\phi = I^2 R\\).\n" +
        "- At resonance \\(X_C = X_L\\), \\(\\phi = 0\\) and \\(\\cos \\phi = 1\\): the power is \\(I^2 R\\), the most the circuit can take.\n" +
        "- **Why a low power factor is costly:** to deliver a given power at a given voltage, a small \\(\\cos \\phi\\) needs a large current, and the line loss \\(I^2 R\\) in transmission becomes large.",
      formula: {
        label: "Power factor",
        latex: "\\cos \\phi = \\frac{R}{Z} = \\frac{R}{\\sqrt{R^2 + (X_C - X_L)^2}}, \\qquad P = VI \\cos \\phi = I^2 R",
      },
      authoredExample: {
        prompt:
          "A series LCR circuit with \\(R = 12\\ \\Omega\\), \\(X_L = 14\\ \\Omega\\) and \\(X_C = 9\\ \\Omega\\) is connected to a 260 V (rms) ac supply. Find the impedance, the power factor, the rms current and the average power.",
        steps: [
          "Given: \\(R = 12\\ \\Omega\\), \\(X_L = 14\\ \\Omega\\), \\(X_C = 9\\ \\Omega\\), \\(V = 260\\) V.",
          "\\(Z = \\sqrt{12^2 + (9 - 14)^2} = \\sqrt{144 + 25} = 13\\ \\Omega\\).",
          "\\(\\cos \\phi = \\dfrac{R}{Z} = \\dfrac{12}{13} = 0.923\\).",
          "\\(I = \\dfrac{V}{Z} = \\dfrac{260}{13} = 20\\) A.",
          "\\(P = I^2 R = 20^2 \\times 12 = 4800\\) W. Check: \\(VI \\cos \\phi = 260 \\times 20 \\times \\dfrac{12}{13} = 4800\\) W.",
        ],
        answer: "13 Ω; 0.923; 20 A; 4800 W",
      },
      selfCheckExample: {
        prompt: "A circuit draws 5 A from a 200 V ac supply and takes 800 W. Find its power factor.",
        steps: ["\\(\\cos \\phi = \\dfrac{P}{VI} = \\dfrac{800}{200 \\times 5} = 0.8\\)."],
        answer: "0.8",
      },
      practiceSet: [
        { prompt: "What is the power factor of a series LCR circuit at resonance?", answer: "1" },
        { prompt: "A circuit has a resistance of 45 Ω and an impedance of 50 Ω. Find its power factor.", answer: "0.9" },
        { prompt: "A series LCR circuit with \\(R = 25\\ \\Omega\\) is at resonance on a 100 V supply. Find the average power.", answer: "400 W" },
      ],
      pyqExampleId: "58110cc3-b7b9-415a-af50-e58f351fb794",
      traps: [
        {
          title: "Adding the two reactances",
          body: "The net reactance is \\(X_L - X_C\\) (or \\(X_C - X_L\\)), never their sum. Adding them gives a power factor far too small.",
        },
        {
          title: "Using X over Z",
          body: "The power factor is \\(R/Z\\). The ratio \\(X/Z\\) is \\(\\sin \\phi\\), which belongs to the wattless part of the current.",
        },
        {
          title: "Putting the peak current into I²R",
          body: "Average power is \\(I^2 R\\) with the rms current. Squaring the peak current doubles the answer.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpac-wattless",
      name: "Power factor of each kind of circuit and the wattless current",
      intuition:
        "A current can flow and still deliver no power. In a pure inductor or capacitor the current is a quarter cycle out of step with the voltage, so energy flows in for one quarter cycle and back out in the next. Such a current is called wattless. In any circuit, the part of the current in step with the voltage carries the power; the part at right angles carries none.",
      definition:
        "- In a purely inductive or capacitive circuit \\(\\cos \\phi = 0\\), so no power is dissipated even though a current flows. This current is called a **wattless current**.\n" +
        "- Resolve the current I into \\(I_p = I \\cos \\phi\\) along V (the **power component**) and \\(I_q = I \\sin \\phi\\) at right angles to V (the **wattless component**).\n" +
        "- A lagging power factor is improved by connecting a capacitor of suitable value in **parallel**: its leading wattless current cancels \\(I_q\\), so the power is effectively \\(I_p V\\).\n" +
        "- **Reactance and impedance:** reactance is the opposition of an inductor or capacitor alone and dissipates no power; impedance is the total opposition of R, L and C together, and only its resistance takes power.",
      table: {
        columns: ["Circuit", "Phase of current", "Power factor", "Average power"],
        rows: [
          { cells: ["Pure resistor", "In phase, \\(\\phi = 0\\)", "1", "VI, all of it dissipated"] },
          {
            cells: ["Pure inductor", "Lags by \\(\\pi/2\\)", "0", "Zero: a wattless current"],
            noteAmber: "Board 2024 asked you to show that an ideal inductor in an ac circuit dissipates no power.",
          },
          { cells: ["Pure capacitor", "Leads by \\(\\pi/2\\)", "0", "Zero: a wattless current"] },
          { cells: ["Series LCR", "\\(\\tan \\phi = (X_C - X_L)/R\\)", "\\(R/Z\\)", "\\(VI \\cos \\phi\\), all in R"] },
          { cells: ["Series LCR at resonance", "In phase, \\(\\phi = 0\\)", "1", "\\(I^2 R\\), the most for that circuit"] },
        ],
      },
      practiceSet: [
        { prompt: "What is meant by a wattless current?", answer: "A current that flows in a purely inductive or capacitive circuit with no power dissipated, since \\(\\cos \\phi = 0\\)" },
        { prompt: "Which component of the current, \\(I \\cos \\phi\\) or \\(I \\sin \\phi\\), carries the power?", answer: "\\(I \\cos \\phi\\), the component in phase with the voltage" },
        { prompt: "How can the power factor of a circuit with a lagging current be improved?", answer: "Connect a capacitor of suitable value in parallel" },
      ],
      pyqExampleId: "0b587dd4-c0cf-4da9-b228-efc3f67ce95b",
      traps: [
        {
          title: "Wattless does not mean no current",
          body: "A wattless current can be large. It is called wattless because it takes no average power, not because it is small.",
        },
        {
          title: "Showing zero power without the working",
          body: "For 'show that an ideal inductor dissipates no power', write \\(P = VI \\cos \\phi\\), state that the current lags by \\(\\pi/2\\), and conclude \\(\\cos 90^\\circ = 0\\). The bare answer 'zero' earns little.",
        },
      ],
    },
  ],
};

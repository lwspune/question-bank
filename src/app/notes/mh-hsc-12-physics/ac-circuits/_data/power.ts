import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_AC_POWER_NOTE: SubtopicNote = {
  subtopicName: "Power in an AC Circuit",
  title: "Power in an AC Circuit",
  oneLineDefinition:
    "The average (true) power taken by an AC circuit, the power factor cos φ that decides how much of the supply does useful work, and why a pure inductor or capacitor takes no power at all.",
  whyItMatters:
    "17 questions. Five came from board papers: derive the average power in a series LCR circuit (2025), state the formulae for average power and the Q factor (2024), the power factor when the phase difference is 45° (2024) and for a purely inductive or capacitive circuit (2026), and the rms current and power in a 100 Ω resistor (2023). The textbook adds proofs that an ideal inductor and an ideal capacitor take no power, wattless current, and power factor calculations.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpac-average-power",
      name: "Average (true) power",
      intuition:
        "In an AC circuit the power changes every instant, and in a reactive circuit it is even negative for part of each cycle, when energy flows back to the source. What matters is the average over a cycle. When current and voltage are out of step by φ, only the part of the current in step with the voltage does work, which brings in the factor cos φ.",
      definition:
        "- **Derivation** for a series LCR circuit. Let \\(e = e_0 \\sin \\omega t\\) and \\(i = i_0 \\sin (\\omega t \\pm \\phi)\\). Instantaneous power \\(P = ei = e_0 i_0 \\sin \\omega t \\sin(\\omega t \\pm \\phi)\\).\n" +
        "- Expand: \\(P = e_0 i_0 [\\sin^2 \\omega t \\cos \\phi \\pm \\sin \\omega t \\cos \\omega t \\sin \\phi]\\).\n" +
        "- Over one cycle the average of \\(\\sin^2 \\omega t\\) is \\(\\dfrac{1}{2}\\) and the average of \\(\\sin \\omega t \\cos \\omega t\\) is zero.\n" +
        "- So \\(P_{av} = \\dfrac{e_0 i_0}{2}\\cos \\phi = \\dfrac{e_0}{\\sqrt{2}} \\cdot \\dfrac{i_0}{\\sqrt{2}}\\cos \\phi = e_{rms}\\, i_{rms} \\cos \\phi\\).\n" +
        "- \\(P_{av}\\) is the **true power**; \\(e_{rms}\\, i_{rms}\\) is the **apparent power**.\n" +
        "- For a pure resistor \\(\\phi = 0\\), so \\(P_{av} = e_{rms}\\, i_{rms} = i_{rms}^2 R\\). In any circuit the power is dissipated in the resistance only.",
      formula: {
        label: "Average power",
        latex: "P_{av} = e_{rms}\\, i_{rms} \\cos \\phi = \\frac{e_0 i_0}{2} \\cos \\phi",
      },
      authoredExample: {
        prompt:
          "A series LCR circuit has a resistance of 60 Ω and an impedance of 100 Ω, and is connected to a 220 V rms supply. Find the rms current, the apparent power, the power factor and the true power.",
        steps: [
          "Given: \\(R = 60\\ \\Omega\\), \\(Z = 100\\ \\Omega\\), \\(e_{rms} = 220\\) V.",
          "\\(i_{rms} = \\dfrac{e_{rms}}{Z} = \\dfrac{220}{100} = 2.2\\) A.",
          "Apparent power \\(= e_{rms}\\, i_{rms} = 220 \\times 2.2 = 484\\) W.",
          "Power factor \\(\\cos \\phi = \\dfrac{R}{Z} = \\dfrac{60}{100} = 0.6\\).",
          "True power \\(P_{av} = 484 \\times 0.6 = 290.4\\) W. Check: \\(i_{rms}^2 R = 2.2^2 \\times 60 = 290.4\\) W.",
        ],
        answer: "2.2 A; apparent power 484 W; power factor 0.6; true power 290.4 W",
      },
      selfCheckExample: {
        prompt:
          "In a circuit, \\(e = 200 \\sin \\omega t\\) V and \\(i = 5 \\sin (\\omega t - \\pi/3)\\) A. Find the average power.",
        steps: ["\\(\\phi = \\pi/3\\), so \\(\\cos \\phi = 0.5\\).", "\\(P_{av} = \\dfrac{200 \\times 5}{2} \\times 0.5 = 250\\) W."],
        answer: "250 W",
      },
      practiceSet: [
        { prompt: "An electric iron takes 1000 W from a 250 V rms supply. Find the rms current.", answer: "4 A" },
        { prompt: "A 50 Ω resistor carries an rms current of 2 A. Find the average power.", answer: "200 W" },
        { prompt: "In a series LCR circuit, which element dissipates the power?", answer: "The resistor alone" },
      ],
      pyqExampleId: "174bb700-6eb1-4f4c-9db4-a048a06d6930",
      traps: [
        {
          title: "Peak values without the half",
          body: "With peak values the average power is \\(\\dfrac{e_0 i_0}{2}\\cos\\phi\\). Writing \\(e_0 i_0 \\cos \\phi\\) doubles the answer.",
        },
        {
          title: "Dropping cos φ",
          body: "\\(e_{rms}\\, i_{rms}\\) alone is the apparent power. The true power needs the factor \\(\\cos\\phi\\) unless the circuit is purely resistive or at resonance.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpac-power-factor",
      name: "Power factor",
      intuition:
        "The power factor tells you what share of the apparent power the circuit actually uses. It is 1 when current and voltage are in step (a resistor, or a circuit at resonance) and 0 when they are a quarter cycle apart (a pure inductor or capacitor). Read it off the impedance triangle: R along the base, the net reactance upright, Z along the slope.",
      definition:
        "- **Power factor** \\(= \\cos \\phi = \\dfrac{\\text{true power}}{\\text{apparent power}} = \\dfrac{R}{Z}\\).\n" +
        "- Pure resistor, or LCR at resonance (\\(X_L = X_C\\)): \\(\\phi = 0\\), power factor 1.\n" +
        "- Pure inductor or ideal capacitor: \\(\\phi = 90^\\circ\\), power factor 0.\n" +
        "- A power line carries \\(I_{rms} = \\dfrac{P}{V_{rms}\\cos\\phi}\\) to deliver power P. A low power factor needs a larger current, and the loss \\(I_{rms}^2 R\\) in the line grows as its square. So a low power factor means a large power loss in transmission.",
      formula: {
        label: "Power factor",
        latex: "\\cos \\phi = \\frac{R}{Z} = \\frac{R}{\\sqrt{R^2 + (X_L - X_C)^2}}",
      },
      authoredExample: {
        prompt:
          "A coil of resistance 8 Ω and inductive reactance 6 Ω is connected to a 220 V rms supply. Find the power factor and the power taken by the coil.",
        steps: [
          "Given: \\(R = 8\\ \\Omega\\), \\(X_L = 6\\ \\Omega\\), \\(e_{rms} = 220\\) V.",
          "\\(Z = \\sqrt{8^2 + 6^2} = 10\\ \\Omega\\).",
          "Power factor \\(\\cos\\phi = \\dfrac{R}{Z} = \\dfrac{8}{10} = 0.8\\).",
          "\\(i_{rms} = \\dfrac{220}{10} = 22\\) A.",
          "\\(P_{av} = e_{rms}\\, i_{rms}\\cos\\phi = 220 \\times 22 \\times 0.8 = 3872\\) W.",
        ],
        answer: "Power factor 0.8; power 3872 W",
      },
      selfCheckExample: {
        prompt: "What resistance in series with a capacitor of reactance 40 Ω gives a power factor of 0.6?",
        steps: [
          "\\(\\dfrac{R}{\\sqrt{R^2 + 40^2}} = 0.6\\), so \\(R^2 = 0.36R^2 + 576\\).",
          "\\(0.64R^2 = 576\\), \\(R^2 = 900\\), \\(R = 30\\ \\Omega\\).",
        ],
        answer: "30 Ω",
      },
      practiceSet: [
        { prompt: "What is the power factor of a series LCR circuit at resonance?", answer: "1" },
        { prompt: "Power factor is true power divided by which power?", answer: "The apparent power, \\(e_{rms}\\, i_{rms}\\)" },
        { prompt: "A series circuit has R = 12 Ω and Z = 13 Ω. Find its power factor.", answer: "0.923" },
      ],
      pyqExampleId: "3abe37d6-c05e-4cfa-88ed-abbb4f0bf3e9",
      traps: [
        {
          title: "Using X/Z for the power factor",
          body: "The power factor is \\(R/Z\\), the base of the impedance triangle over its slope. \\(X/Z\\) is \\(\\sin\\phi\\), not the power factor.",
        },
        {
          title: "'Low power factor, low loss'",
          body: "It is the other way round. For the same power delivered, a low power factor needs a larger current, so the \\(I^2R\\) loss in the line is larger.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpac-wattless",
      name: "Wattless current and the choke coil",
      intuition:
        "In a pure inductor or capacitor the current and voltage are a quarter cycle apart. For one quarter cycle the source pushes energy into the magnetic or electric field; in the next quarter the field hands it all back. The current is real and flows all the time, but over a cycle no energy is used. A choke coil puts this to work: it cuts down an alternating current almost without wasting energy.",
      definition:
        "- Pure inductor or ideal capacitor: \\(\\phi = 90^\\circ\\), so \\(P_{av} = e_{rms}\\, i_{rms}\\cos 90^\\circ = 0\\).\n" +
        "- Proof for an inductor: \\(i = -i_0 \\cos \\omega t\\), so \\(P = -e_0 i_0 \\sin \\omega t \\cos \\omega t = -\\dfrac{e_0 i_0}{2}\\sin 2\\omega t\\), whose average over a cycle is zero. For a capacitor \\(i = i_0\\cos\\omega t\\) and the same steps give zero.\n" +
        "- **Wattless (idle) current:** the current through a pure inductor or ideal capacitor, which consumes no power for its maintenance in the circuit. Power is dissipated only because of resistance.\n" +
        "- **Choke coil:** an inductor used to reduce AC without much loss of energy. It is thick insulated copper wire wound in many turns on a laminated soft iron core. Its large \\(X_L = \\omega L\\) cuts the current; its power factor \\(\\dfrac{R}{\\sqrt{R^2 + \\omega^2 L^2}}\\) is nearly zero because R is small and L large. The laminated core reduces eddy current loss. A resistor would waste energy as heat instead.",
      formula: {
        label: "Pure inductor or capacitor",
        latex: "P_{av} = e_{rms}\\, i_{rms} \\cos 90^\\circ = 0",
      },
      authoredExample: {
        prompt:
          "A pure inductor of 0.5 H is connected to a 220 V rms, 50 Hz supply. Find the rms current and the average power taken. (\\(\\pi = 3.142\\))",
        steps: [
          "Given: \\(L = 0.5\\) H, \\(e_{rms} = 220\\) V, \\(f = 50\\) Hz.",
          "\\(X_L = 2\\pi f L = 2 \\times 3.142 \\times 50 \\times 0.5 = 157.1\\ \\Omega\\).",
          "\\(i_{rms} = \\dfrac{220}{157.1} = 1.400\\) A.",
          "For a pure inductor \\(\\phi = 90^\\circ\\): \\(P_{av} = 220 \\times 1.400 \\times \\cos 90^\\circ = 0\\).",
        ],
        answer: "1.400 A flows, but the average power is zero",
      },
      selfCheckExample: {
        prompt: "A choke coil has a resistance of 2 Ω and an inductive reactance of 100 Ω. Find its power factor.",
        steps: ["\\(Z = \\sqrt{2^2 + 100^2} = 100.02\\ \\Omega\\).", "\\(\\cos\\phi = \\dfrac{2}{100.02} = 0.02\\)."],
        answer: "0.02, nearly zero",
      },
      practiceSet: [
        { prompt: "What is wattless current?", answer: "Current through a pure inductor or ideal capacitor, which consumes no power" },
        { prompt: "Why is a choke coil preferred to a resistor for reducing an alternating current?", answer: "A resistor wastes energy as heat; a choke coil has a power factor near zero, so it wastes very little" },
        { prompt: "Why is the core of a choke coil laminated?", answer: "To reduce eddy current loss" },
      ],
      pyqExampleId: "45ef1ca4-5967-419b-8675-7d41ee1be9ce",
      traps: [
        {
          title: "'Wattless' means no current",
          body: "A wattless current does flow, and an AC ammeter reads it. It is the average power that is zero, because energy goes into the field and comes back each cycle.",
        },
        {
          title: "Proving it only with cos 90°",
          body: "For a 'prove that' question, write the instantaneous power and show its average over a cycle is zero. \\(P_{av} = e_{rms}\\, i_{rms}\\cos 90^\\circ\\) alone is a quick check, not the full proof.",
        },
      ],
    },
  ],
};

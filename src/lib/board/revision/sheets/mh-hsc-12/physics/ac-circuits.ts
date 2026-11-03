import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Physics, Ch. 13 AC Circuits. Statements checked against the
 * Balbharati text; most-asked years from the 25 board past-paper questions in
 * the bank, 2017-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "AC Circuits",
  chapterSlug: "ac-circuits",
  source: "Balbharati Physics Std XII (Maharashtra State Board), Chapter 13",
  keyPoints: [
    {
      term: "Peak value",
      text: "The maximum value of the alternating current (or emf) in either direction. For \\(e = e_0\\sin\\omega t\\), \\(e_0\\) is the peak value and \\(\\omega = 2\\pi f\\).",
    },
    {
      term: "Average value",
      text: "Over a full cycle the average of AC is always **zero**, so the mean value of AC over a cycle has no significance. It is defined over one half cycle: \\(i_{av} = 0.637\\,i_0\\), \\(e_{av} = 0.637\\,e_0\\).",
    },
    {
      term: "RMS (effective) value",
      text: "The steady current that produces the same heat in the same resistance in the same time as the AC. \\(i_{rms} = \\frac{i_0}{\\sqrt{2}} = 0.707\\,i_0\\). Moving coil meters read the average, so they cannot measure AC; heating does not depend on direction.",
    },
    {
      term: "Phasor",
      text: "A rotating vector that represents a sinusoidally varying quantity, so that voltages and currents can be added by the laws of vector addition.",
    },
    {
      term: "Phase in pure R, L and C",
      text: "Resistor: voltage and current in phase. Pure inductor: current lags the voltage by \\(\\frac{\\pi}{2}\\). Capacitor: current leads the voltage by \\(\\frac{\\pi}{2}\\) (the voltage across it lags).",
    },
    {
      term: "Inductive reactance",
      text: "The opposing nature of an inductor to the flow of alternating current: \\(X_L = \\omega L = 2\\pi fL\\). SI unit ohm. It grows with frequency.",
    },
    {
      term: "Capacitive reactance",
      text: "The effective resistance offered by a capacitor to AC: \\(X_C = \\frac{1}{\\omega C} = \\frac{1}{2\\pi fC}\\). SI unit ohm. It falls as frequency rises.",
    },
    {
      term: "Impedance",
      text: "The total effective resistance of an LCR circuit to AC, the ratio of rms voltage to rms current: \\(Z = \\sqrt{R^2 + (X_L - X_C)^2}\\), in ohm. Its reciprocal is the **admittance**, unit ohm⁻¹ or siemens.",
    },
    {
      term: "Power factor",
      text: "\\(\\cos\\phi = \\frac{R}{Z}\\) = true power / apparent power. Resistive circuit (or resonance): \\(\\cos\\phi = 1\\). Pure inductor or capacitor: \\(\\phi = 90^\\circ\\), so power factor = 0.",
    },
    {
      term: "Wattless current",
      text: "Current through a pure inductor or ideal capacitor which consumes no power for its maintenance in the circuit. Power is dissipated in a circuit by the resistance only.",
    },
    {
      term: "Series resonance",
      text: "Occurs when \\(X_L = X_C\\): impedance is minimum (\\(Z = R\\)), the circuit is purely resistive and the current is maximum. It accepts only one frequency, so it is an **acceptor circuit** (radio and TV tuning).",
    },
    {
      term: "Parallel resonance",
      text: "L and C in parallel. At \\(f_r = \\frac{1}{2\\pi\\sqrt{LC}}\\) the impedance is maximum and the current minimum; it rejects the resonant frequency, so it is a **rejector circuit**, used in radio transmission and filters.",
    },
    {
      term: "Q factor",
      text: "The ratio of the resonant frequency to the bandwidth: \\(Q = \\frac{\\omega_r}{2\\Delta\\omega}\\). Dimensionless. Larger Q, narrower bandwidth and a sharper, more selective resonance.",
    },
    {
      term: "Choke coil",
      text: "An inductor used to reduce AC in a circuit without much loss of energy: thick insulated copper wire on a laminated soft iron core. Large \\(X_L\\) cuts the current; power factor is nearly zero.",
    },
  ],
  formulas: [
    { label: "Alternating emf", latex: "e = e_0\\sin\\omega t = e_0\\sin 2\\pi f t" },
    { label: "Average (half cycle) and rms values", latex: "i_{av} = \\frac{2}{\\pi}i_0 = 0.637\\,i_0 \\qquad i_{rms} = \\frac{i_0}{\\sqrt{2}} = 0.707\\,i_0" },
    { label: "Reactances", latex: "X_L = \\omega L = 2\\pi fL \\qquad X_C = \\frac{1}{\\omega C} = \\frac{1}{2\\pi fC}" },
    { label: "Impedance of series LCR", latex: "Z = \\sqrt{R^2 + (X_L - X_C)^2} \\qquad i_0 = \\frac{e_0}{Z}" },
    { label: "Phase angle", latex: "\\tan\\phi = \\frac{X_L - X_C}{R}" },
    { label: "Average power", latex: "P_{av} = e_{rms}\\,i_{rms}\\cos\\phi" },
    { label: "Power factor", latex: "\\cos\\phi = \\frac{R}{Z}" },
    { label: "Resonant frequency (series or parallel)", latex: "f_r = \\frac{1}{2\\pi\\sqrt{LC}}" },
    { label: "Q factor", latex: "Q = \\frac{\\omega_r}{\\omega_2 - \\omega_1} = \\frac{\\omega_r}{2\\Delta\\omega}" },
  ],
  derivations: [
    {
      title: "Using a phasor diagram, obtain the impedance of a series LCR circuit",
      steps: [
        "The same current \\(i\\) flows through R, L and C in series. \\(e_R\\) is in phase with \\(i\\) (along OX); \\(e_L\\) leads \\(i\\) by 90° (along OY); \\(e_C\\) lags \\(i\\) by 90° (along OY').",
        "\\(e_L\\) and \\(e_C\\) differ in phase by 180°, so the net reactive voltage is \\(e_L - e_C\\) (taking \\(e_L > e_C\\)).",
        "Resultant: \\(e_0^2 = e_R^2 + (e_L - e_C)^2 = i_0^2[R^2 + (X_L - X_C)^2]\\).",
        "So \\(Z = \\frac{e_0}{i_0} = \\sqrt{R^2 + (X_L - X_C)^2}\\), and \\(\\tan\\phi = \\frac{X_L - X_C}{R}\\).",
      ],
    },
    {
      title: "Obtain an expression for the average power dissipated in a series LCR circuit",
      steps: [
        "Take \\(e = e_0\\sin\\omega t\\) and \\(i = i_0\\sin(\\omega t - \\phi)\\). Instantaneous power \\(P = ei\\).",
        "Average over one cycle: the term in \\(\\sin 2\\omega t\\) averages to zero.",
        "\\(P_{av} = \\frac{e_0 i_0}{2}\\cos\\phi = e_{rms}\\,i_{rms}\\cos\\phi\\) (true power); \\(\\cos\\phi\\) is the power factor.",
        "Pure L or C: \\(\\phi = 90^\\circ\\), \\(P_{av} = 0\\). Pure R: \\(\\phi = 0\\), \\(P_{av} = e_{rms} i_{rms}\\).",
      ],
    },
    {
      title: "Derive an expression for the resonant frequency of a series LCR circuit",
      steps: [
        "\\(Z = \\sqrt{R^2 + (X_L - X_C)^2}\\) is least when \\(X_L = X_C\\); then \\(Z = R\\) and the current is maximum.",
        "\\(\\omega_r L = \\frac{1}{\\omega_r C}\\), so \\(\\omega_r = \\frac{1}{\\sqrt{LC}}\\).",
        "\\(f_r = \\frac{1}{2\\pi\\sqrt{LC}}\\): the series resonant frequency.",
      ],
    },
    {
      title: "Parallel resonance: state the conditions and obtain the resonant frequency",
      steps: [
        "L and C in parallel across \\(e = e_0\\sin\\omega t\\). Current in L lags the emf by \\(\\frac{\\pi}{2}\\); current in C leads it by \\(\\frac{\\pi}{2}\\).",
        "The two currents are opposite in phase, so the total current is \\(i = i_C - i_L\\), which is minimum when \\(X_L = X_C\\).",
        "\\(\\omega L = \\frac{1}{\\omega C}\\) gives \\(f_r = \\frac{1}{2\\pi\\sqrt{LC}}\\).",
        "At \\(f_r\\): impedance maximum, current minimum.",
      ],
    },
    {
      title: "Show that the rms value of AC is 0.707 times its peak value",
      steps: [
        "Heat in R over one cycle: \\(H = \\int_0^{T} i_0^2\\sin^2\\omega t\\,R\\,dt = \\frac{i_0^2 R T}{2}\\).",
        "A steady current \\(i_{rms}\\) gives \\(H = i_{rms}^2 R T\\) in the same time.",
        "Equate: \\(i_{rms} = \\frac{i_0}{\\sqrt{2}} = 0.707\\,i_0\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Phasor diagram of a series LCR circuit", labels: ["current i0 along OX", "eR in phase with i", "eL ahead by 90°", "eC behind by 90°", "resultant e0 and angle φ"] },
    { title: "Impedance triangle", labels: ["R along the base", "XL minus XC perpendicular", "Z as the hypotenuse", "phase angle φ"] },
    { title: "Phasor diagrams for pure L and pure C", labels: ["e0 and i0 phasors", "i lags e by 90° (L)", "i leads e by 90° (C)", "angle ωt"] },
    { title: "Series and parallel resonance curves", labels: ["current against frequency", "fr at the peak (series)", "fr at the minimum (parallel)", "lower R, sharper peak"] },
  ],
  mostAsked: [
    { topic: "Impedance of a series LCR circuit with its phasor diagram, or its phase angle", years: [2026, 2025, 2024] },
    { topic: "Define inductive reactance, capacitive reactance and impedance, or a reactance numerical", years: [2026, 2022, 2018, 2017] },
    { topic: "From \\(e = e_0\\sin\\omega t\\): peak value, frequency, rms value or power in a resistor", years: [2026, 2025, 2024, 2023] },
    { topic: "Resonant frequency of a series or a parallel LC circuit: derive or a numerical", years: [2026, 2022, 2020, 2019] },
    { topic: "Average power in an LCR circuit, power factor and Q factor", years: [2026, 2025, 2024] },
    { topic: "Average value of AC over a complete cycle", years: [2023, 2022] },
  ],
  mistakes: [
    {
      title: "Reading the coefficient of t as the frequency",
      body: "In \\(e = 140\\sin 314.2t\\), 314.2 is \\(\\omega\\), not \\(f\\). \\(f = \\frac{\\omega}{2\\pi} = 50\\) Hz.",
    },
    {
      title: "Mixing peak and rms values",
      body: "Mains \"220 V\" is an rms value. \\(e_0 = \\sqrt{2}\\,e_{rms}\\); use rms values in \\(P = e_{rms} i_{rms}\\cos\\phi\\) and peak with peak in \\(i_0 = \\frac{e_0}{Z}\\).",
    },
    {
      title: "Giving 0.637 i0 as the average over a full cycle",
      body: "Over a full cycle the average of AC is zero. \\(0.637\\,i_0\\) is the average over a half cycle.",
    },
    {
      title: "Forgetting units in reactance",
      body: "Use L in henry and C in farad: 200 mH = 0.2 H, 5 μF = \\(5 \\times 10^{-6}\\) F, before \\(X_L = 2\\pi fL\\) or \\(X_C = \\frac{1}{2\\pi fC}\\).",
    },
    {
      title: "Mixing up series and parallel resonance",
      body: "Same \\(f_r\\), opposite behaviour. Series: Z minimum, current maximum (acceptor). Parallel: Z maximum, current minimum (rejector).",
    },
  ],
};

export default sheet;

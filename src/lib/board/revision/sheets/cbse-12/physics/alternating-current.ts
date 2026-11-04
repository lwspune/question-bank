import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 12 Physics, Ch. 7 Alternating Current. Statements checked against the
 * NCERT text (definitions are the book's own wording); most-asked years from
 * all 79 CBSE board past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Alternating Current",
  chapterSlug: "alternating-current",
  source: "NCERT Physics Part I (CBSE Class 12), Chapter 7",
  keyPoints: [
    {
      term: "Why ac is preferred",
      text: "A voltage that varies like a sine function with time is an alternating voltage. The main reason for preferring ac over dc is that ac voltages can be easily and efficiently converted from one voltage to another by transformers; electrical energy can also be transmitted economically over long distances.",
    },
    {
      term: "rms or effective value",
      text: "The rms current I is the value of dc that gives the same average power: \\(I = \\frac{i_m}{\\sqrt{2}} = 0.707\\,i_m\\). One ampere rms produces the same average heating as one ampere of dc. A given ac value (240 V at home) is the rms value; its peak is about 340 V.",
    },
    {
      term: "Phasor",
      text: "A vector which rotates about the origin with angular speed \\(\\omega\\). Its magnitude is the peak value; its projection on the vertical axis gives the instantaneous value. Voltage and current are scalars: phasors only add the same way as rotating vectors.",
    },
    {
      term: "AC through a resistor",
      text: "\\(i = i_m\\sin\\omega t\\) with \\(i_m = \\frac{v_m}{R}\\): voltage and current are in phase. Average power \\(\\frac{1}{2}i_m^2R = I^2R\\).",
    },
    {
      term: "AC through an inductor",
      text: "The current lags the voltage by \\(\\frac{\\pi}{2}\\) (one-quarter cycle). Inductive reactance \\(X_L = \\omega L\\) is directly proportional to the inductance and to the frequency. With dc (\\(\\omega = 0\\)), \\(X_L = 0\\). An iron rod in the coil raises L, so \\(X_L\\) rises and a bulb in series glows less.",
    },
    {
      term: "AC through a capacitor",
      text: "The current leads the voltage by \\(\\frac{\\pi}{2}\\). Capacitive reactance \\(X_C = \\frac{1}{\\omega C}\\) is inversely proportional to the frequency and the capacitance. A capacitor blocks dc: once charged, no current flows.",
    },
    {
      term: "No power in a pure L or C",
      text: "The average power supplied to an ideal inductor or capacitor over one complete cycle is zero. The only element that dissipates energy in an ac circuit is the resistance.",
    },
    {
      term: "Impedance",
      text: "In a series LCR circuit \\(Z = \\sqrt{R^2 + (X_C - X_L)^2}\\) and \\(i_m = \\frac{v_m}{Z}\\). The impedance diagram is a right triangle with Z as its hypotenuse. If \\(X_C > X_L\\) the circuit is capacitive and the current leads; if \\(X_L > X_C\\) it is inductive and the current lags.",
    },
    {
      term: "Adding voltages",
      text: "Voltages across different elements are added with their phases. In an RC circuit \\(V_{RC} = \\sqrt{V_R^2 + V_C^2}\\), not \\(V_R + V_C\\), so the algebraic sum can exceed the source voltage.",
    },
    {
      term: "Resonance",
      text: "At one frequency \\(\\omega_0\\), \\(X_C = X_L\\); the impedance is minimum (\\(Z = R\\)) and the current amplitude is maximum, \\(\\frac{v_m}{R}\\). This is the resonant frequency. Resonance needs both L and C. Used in tuning a radio or TV: C is varied until the resonant frequency equals the signal frequency.",
    },
    {
      term: "Power factor",
      text: "Average power \\(P = VI\\cos\\phi\\); \\(\\cos\\phi\\) is the power factor. Pure R: \\(\\cos\\phi = 1\\), maximum power. Pure L or C: \\(\\cos\\phi = 0\\), no power though current flows (wattless current). At resonance \\(\\cos\\phi = 1\\) and maximum power is dissipated.",
    },
    {
      term: "Why power factor matters",
      text: "A low power factor means a larger current for the same power, so a large \\(I^2R\\) loss in transmission. It is improved by a capacitor in parallel, whose leading wattless current cancels the lagging wattless current.",
    },
    {
      term: "Transformer",
      text: "Changes an alternating voltage using the principle of mutual induction. Primary (\\(N_p\\) turns) and secondary (\\(N_s\\) turns) are insulated coils on a soft-iron core. Step-up: \\(N_s > N_p\\), so \\(V_s > V_p\\) and \\(I_s < I_p\\). This does not violate conservation of energy: the current falls in the same proportion.",
    },
    {
      term: "Energy losses in a transformer",
      text: "1. Flux leakage: wind the coils one over the other. 2. Resistance of the windings (\\(I^2R\\)): use thick wire. 3. Eddy currents in the core: use a laminated core. 4. Hysteresis: use a material with low hysteresis loss. Power is transmitted at high voltage so that the current, and \\(I^2R\\) loss, is small.",
    },
  ],
  formulas: [
    { label: "rms values", latex: "I = \\frac{i_m}{\\sqrt{2}} \\qquad V = \\frac{v_m}{\\sqrt{2}}" },
    { label: "Average values", latex: "\\langle i \\rangle_{\\text{full cycle}} = 0 \\qquad \\langle i \\rangle_{\\text{half cycle}} = \\frac{2i_m}{\\pi}" },
    { label: "Power in a resistor", latex: "P = \\frac{1}{2}i_m^2R = I^2R" },
    { label: "Inductor", latex: "i = i_m\\sin\\left(\\omega t - \\frac{\\pi}{2}\\right) \\qquad X_L = \\omega L = 2\\pi\\nu L" },
    { label: "Capacitor", latex: "i = i_m\\sin\\left(\\omega t + \\frac{\\pi}{2}\\right) \\qquad X_C = \\frac{1}{\\omega C} = \\frac{1}{2\\pi\\nu C}" },
    { label: "Impedance of series LCR", latex: "Z = \\sqrt{R^2 + (X_C - X_L)^2} \\qquad i_m = \\frac{v_m}{Z}" },
    { label: "Phase angle", latex: "\\tan\\phi = \\frac{X_C - X_L}{R} \\qquad i = i_m\\sin(\\omega t + \\phi)" },
    { label: "RL and RC circuits", latex: "Z_{RL} = \\sqrt{R^2 + X_L^2} \\qquad Z_{RC} = \\sqrt{R^2 + X_C^2}" },
    { label: "Resonance", latex: "\\omega_0 = \\frac{1}{\\sqrt{LC}} \\qquad \\nu_0 = \\frac{1}{2\\pi\\sqrt{LC}} \\qquad Z = R" },
    { label: "Average power", latex: "P = VI\\cos\\phi = I^2Z\\cos\\phi = I^2R \\qquad \\cos\\phi = \\frac{R}{Z}" },
    { label: "Ideal transformer", latex: "\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s} \\qquad V_pI_p = V_sI_s" },
  ],
  derivations: [
    {
      title: "rms value of an alternating current in terms of its peak value",
      steps: [
        "Current \\(i = i_m\\sin\\omega t\\) in R: power \\(p = i_m^2R\\sin^2\\omega t\\).",
        "\\(\\langle\\sin^2\\omega t\\rangle = \\frac{1}{2}\\left(1 - \\langle\\cos 2\\omega t\\rangle\\right) = \\frac{1}{2}\\), since \\(\\langle\\cos 2\\omega t\\rangle = 0\\) over a cycle.",
        "Average power \\(\\bar{P} = \\frac{1}{2}i_m^2R\\). Writing it as \\(I^2R\\) gives \\(I = \\sqrt{\\langle i^2\\rangle} = \\frac{i_m}{\\sqrt{2}} = 0.707\\,i_m\\).",
      ],
    },
    {
      title: "AC voltage applied to an inductor: current, phase and inductive reactance",
      steps: [
        "\\(v_m\\sin\\omega t - L\\frac{di}{dt} = 0\\) (no resistance), so \\(\\frac{di}{dt} = \\frac{v_m}{L}\\sin\\omega t\\).",
        "Integrating: \\(i = -\\frac{v_m}{\\omega L}\\cos\\omega t = i_m\\sin\\left(\\omega t - \\frac{\\pi}{2}\\right)\\), with \\(i_m = \\frac{v_m}{\\omega L}\\).",
        "\\(X_L = \\omega L\\) (ohm); the current lags the voltage by \\(\\frac{\\pi}{2}\\).",
        "Power \\(p = -i_mv_m\\sin\\omega t\\cos\\omega t = -\\frac{i_mv_m}{2}\\sin 2\\omega t\\); its average over a cycle is zero.",
      ],
    },
    {
      title: "AC voltage applied to a capacitor: current, phase and capacitive reactance",
      steps: [
        "\\(v = \\frac{q}{C} = v_m\\sin\\omega t\\), so \\(q = Cv_m\\sin\\omega t\\).",
        "\\(i = \\frac{dq}{dt} = \\omega Cv_m\\cos\\omega t = i_m\\sin\\left(\\omega t + \\frac{\\pi}{2}\\right)\\), with \\(i_m = \\frac{v_m}{1/\\omega C}\\).",
        "\\(X_C = \\frac{1}{\\omega C}\\); the current leads the voltage by \\(\\frac{\\pi}{2}\\). Average power over a cycle is zero.",
      ],
    },
    {
      title: "Impedance and phase angle of a series LCR circuit using a phasor diagram",
      steps: [
        "Current phasor I is common. \\(V_R = i_mR\\) is along I; \\(V_L = i_mX_L\\) leads I by \\(\\frac{\\pi}{2}\\); \\(V_C = i_mX_C\\) lags I by \\(\\frac{\\pi}{2}\\).",
        "\\(V_L\\) and \\(V_C\\) are opposite, so their resultant is \\(i_m(X_C - X_L)\\), perpendicular to \\(V_R\\).",
        "Pythagoras: \\(v_m^2 = (i_mR)^2 + [i_m(X_C - X_L)]^2\\), so \\(i_m = \\frac{v_m}{Z}\\) with \\(Z = \\sqrt{R^2 + (X_C - X_L)^2}\\).",
        "Phase angle: \\(\\tan\\phi = \\frac{X_C - X_L}{R}\\). For an RC circuit put \\(X_L = 0\\): \\(Z = \\sqrt{R^2 + X_C^2}\\).",
      ],
    },
    {
      title: "Condition for resonance and the resonant frequency of a series LCR circuit",
      steps: [
        "\\(i_m = \\frac{v_m}{\\sqrt{R^2 + (X_C - X_L)^2}}\\) is largest when \\(X_C = X_L\\).",
        "\\(\\frac{1}{\\omega_0C} = \\omega_0L\\) gives \\(\\omega_0 = \\frac{1}{\\sqrt{LC}}\\), or \\(\\nu_0 = \\frac{1}{2\\pi\\sqrt{LC}}\\).",
        "At resonance \\(Z = R\\) (minimum), \\(i_m = \\frac{v_m}{R}\\) (maximum), \\(\\phi = 0\\); it depends only on L and C, not on R.",
      ],
    },
    {
      title: "Average power in a series LCR circuit; power factor",
      steps: [
        "\\(v = v_m\\sin\\omega t\\), \\(i = i_m\\sin(\\omega t + \\phi)\\): \\(p = vi = \\frac{v_mi_m}{2}[\\cos\\phi - \\cos(2\\omega t + \\phi)]\\).",
        "The second term averages to zero over a cycle, so \\(P = \\frac{v_mi_m}{2}\\cos\\phi = VI\\cos\\phi\\).",
        "\\(\\cos\\phi = \\frac{R}{Z}\\) is the power factor. Pure L or C: \\(\\phi = \\frac{\\pi}{2}\\), \\(P = 0\\). Resonance: \\(\\phi = 0\\), \\(P = I^2R\\), maximum.",
      ],
    },
    {
      title: "Ratio of secondary to primary voltage (and current) in a transformer",
      steps: [
        "Ideal transformer: the same flux \\(\\phi\\) per turn links both coils; primary resistance negligible.",
        "Secondary emf \\(\\varepsilon_s = -N_s\\frac{d\\phi}{dt}\\); back emf in the primary \\(\\varepsilon_p = -N_p\\frac{d\\phi}{dt}\\).",
        "With \\(v_p = \\varepsilon_p\\) and \\(v_s = \\varepsilon_s\\) (small secondary current): \\(\\frac{v_s}{v_p} = \\frac{N_s}{N_p}\\).",
        "No energy loss: \\(i_pv_p = i_sv_s\\), so \\(\\frac{i_s}{i_p} = \\frac{N_p}{N_s}\\). Step-up raises voltage and lowers current.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Step-up transformer",
      labels: ["laminated soft-iron core", "primary coil, fewer turns (Np)", "secondary coil, more turns (Ns)", "ac input Vp and output Vs", "coils wound one over the other or on separate limbs"],
    },
    {
      title: "Phasor diagram of a series LCR circuit",
      labels: ["current phasor I", "VR along I", "VL ahead of I by 90°, VC behind by 90°", "resultant V at angle φ to I"],
    },
    {
      title: "Impedance diagram",
      labels: ["R along the base", "XC minus XL as the height", "Z as the hypotenuse", "phase angle φ between R and Z"],
    },
    {
      title: "Phasor and graphs of v and i: inductor and capacitor",
      labels: ["inductor: i lags v by π/2", "capacitor: i leads v by π/2", "v and i plotted against ωt", "rotating phasors V and I"],
    },
    {
      title: "Resonance curve: current amplitude against ω",
      labels: ["peak at the resonant frequency ω0", "smaller R gives a taller, sharper peak", "im = vm/R at the peak"],
    },
    {
      title: "Reactance against frequency",
      labels: ["R constant (horizontal line)", "XL a straight line through the origin", "XC falling as 1/ν (a hyperbola)"],
    },
  ],
  mostAsked: [
    { topic: "AC through an inductor or a capacitor: reactance, phase of current and voltage, and graphs against frequency", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Transformer: principle, labelled diagram of a step-up transformer, turns ratio, energy losses, or a numerical", years: [2026, 2025, 2024, 2023] },
    { topic: "Series LCR (or RL, RC) circuit: phasor diagram, impedance and phase angle, or a numerical", marks: 3, years: [2026, 2025, 2024, 2023] },
    { topic: "Peak, rms and average values of an alternating current or voltage", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Resonance in a series LCR circuit: condition, resonant frequency and the current or impedance curve", marks: 1, years: [2025, 2024, 2023] },
    { topic: "Phase between voltage and current: identify the element (R, L or C), or find the phase difference", marks: 3, years: [2026, 2025, 2024, 2023] },
    { topic: "Power in an ac circuit and power factor; zero power in an ideal inductor or capacitor", marks: 3, years: [2026, 2025, 2024, 2023] },
  ],
  mistakes: [
    {
      title: "Mixing peak and rms",
      body: "An ammeter or voltmeter reads rms. \\(v = 14\\sin 314t\\) has peak 14 V and rms \\(\\frac{14}{\\sqrt{2}} \\approx 10\\) V. Use rms values in \\(P = VI\\cos\\phi\\), or put \\(\\frac{1}{2}v_mi_m\\cos\\phi\\) with peaks.",
    },
    {
      title: "Adding voltages as numbers",
      body: "Across R and L of 12 V and the source 20 V: \\(V_L = \\sqrt{20^2 - 12^2} = 16\\) V, not 8 V. Only \\(V_L\\) and \\(V_C\\), being opposite, simply subtract.",
    },
    {
      title: "Forgetting \\(2\\pi\\) in the reactance",
      body: "\\(X_L = 2\\pi\\nu L\\) and \\(X_C = \\frac{1}{2\\pi\\nu C}\\). In \\(v = v_m\\sin(100\\pi t)\\), \\(\\omega = 100\\pi\\) rad/s and \\(\\nu = 50\\) Hz. Doubling both C and \\(\\nu\\) makes \\(X_C\\) a quarter, not a half.",
    },
    {
      title: "Getting the phase backwards",
      body: "Inductor: current lags (ELI: emf before I). Capacitor: current leads (ICE: I before emf). Voltage leading the current by \\(\\frac{\\pi}{4}\\) means R with L, with \\(X_L = R\\).",
    },
    {
      title: "Average over a full cycle",
      body: "The average of a sine current over a full cycle is zero; over a half cycle it is \\(\\frac{2i_m}{\\pi} = 0.637\\,i_m\\), and the rms value is \\(0.707\\,i_m\\).",
    },
    {
      title: "Transformer on dc, and power output",
      body: "A transformer does not work on dc: steady current gives no changing flux, so no emf in the secondary. A step-up transformer raises voltage but cannot raise power: \\(V_pI_p = V_sI_s\\) at best.",
    },
  ],
};

export default sheet;

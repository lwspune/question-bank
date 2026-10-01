import type { SubtopicNote } from "@/app/notes/_types";

export const REACTANCE_AC_NOTE: SubtopicNote = {
  subtopicName: "Reactance of a Resistor, Inductor and Capacitor",
  title: "Reactance of a Resistor, Inductor and Capacitor",
  oneLineDefinition:
    "An inductor opposes a.c. with reactance ωL, which grows with frequency; a capacitor with 1/ωC, which falls with it; and in each the current is a quarter cycle out of step with the voltage.",
  whyItMatters:
    "Twenty-two PYQs, fifteen of them multiple choice, and eight from 2024. Twelve compute a reactance or the current through one inductor or capacitor. Five ask whether the current leads or lags the voltage. Five test a real coil on d.c. and then on a.c., or a network at a frequency so high that capacitors short and inductors open.",
  concepts: [
    // C1 — X_L and X_C
    {
      kind: "formula" as const,
      slug: "jpac-reactance",
      name: "Reactance: ωL and 1/ωC",
      intuition:
        "A coil fights changes in current, so the faster the current changes, the more it opposes: its reactance ωL grows with frequency and is zero for steady d.c. A capacitor passes changes easily, so its reactance 1/ωC falls as the frequency rises and is infinite for d.c. A resistor does not care about frequency at all.",
      definition:
        "- \\(X_L = \\omega L = 2\\pi fL\\): a straight line through the origin on an \\(X\\)–f graph.\n" +
        "- \\(X_C = \\dfrac{1}{\\omega C} = \\dfrac{1}{2\\pi fC}\\): a falling curve, \\(X_C \\propto \\dfrac{1}{f}\\).\n" +
        "- R does not change with f: a horizontal line.\n" +
        "- Current through one element: \\(I = \\dfrac{V}{X}\\), peak with peak and rms with rms. Pure capacitor: \\(I_0 = V_0\\omega C\\). Pure inductor: \\(I_0 = \\dfrac{V_0}{\\omega L}\\).\n" +
        "- Halve f: \\(X_L\\) halves, so the inductor current doubles; \\(X_C\\) doubles, so the capacitor current halves.\n" +
        "- More capacitance (a dielectric slipped in) lowers \\(X_C\\), so more current flows through anything in series with it.\n" +
        "- Between the plates the displacement current equals the conduction current in the wires: \\(I_d = V\\omega C\\).\n" +
        "- R, \\(X_L\\) and \\(X_C\\) are all in ohm, so a ratio of two of them has no unit, while \\(X_LX_C = \\dfrac{L}{C}\\) is in \\(\\text{ohm}^{2}\\).",
      formula: {
        label: "Reactances",
        latex: "X_L = \\omega L = 2\\pi fL \\qquad X_C = \\frac{1}{\\omega C} = \\frac{1}{2\\pi fC}",
      },
      authoredExample: {
        prompt:
          "A \\(20\\ \\mu\\text{F}\\) capacitor is connected to \\(e = 50\\sin(500t)\\ \\text{V}\\). Find its reactance, the peak current, and the reading of an a.c. ammeter in series.",
        steps: [
          "Here \\(\\omega = 500\\ \\text{rad/s}\\) is given directly, so \\(X_C = \\dfrac{1}{500 \\times 20 \\times 10^{-6}} = 100\\ \\Omega\\).",
          "Peak current \\(I_0 = \\dfrac{50}{100} = 0.5\\ \\text{A}\\).",
          "The ammeter reads rms: \\(\\dfrac{0.5}{\\sqrt{2}} \\approx 0.35\\ \\text{A}\\).",
        ],
        answer: "\\(100\\ \\Omega\\), \\(0.5\\ \\text{A}\\), \\(\\approx 0.35\\ \\text{A}\\)",
      },
      selfCheckExample: {
        prompt:
          "A pure \\(0.4\\ \\text{H}\\) inductor is connected to \\(v = 100\\sqrt{2}\\sin(250t)\\ \\text{V}\\). Find the rms current. What is it if the frequency is halved?",
        steps: [
          "\\(X_L = 250 \\times 0.4 = 100\\ \\Omega\\); \\(V_{rms} = 100\\ \\text{V}\\), so \\(I_{rms} = 1\\ \\text{A}\\).",
          "Half the frequency: \\(X_L = 50\\ \\Omega\\), so \\(I_{rms} = 2\\ \\text{A}\\).",
        ],
        answer: "\\(1\\ \\text{A}\\); then \\(2\\ \\text{A}\\)",
      },
      practiceSet: [
        { prompt: "\\(X_L\\) of a 50 mH inductor at \\(\\omega = 400\\ \\text{rad/s}\\)?", answer: "\\(20\\ \\Omega\\)" },
        { prompt: "\\(X_C\\) of a \\(5\\ \\mu\\text{F}\\) capacitor at \\(\\omega = 1000\\ \\text{rad/s}\\)?", answer: "\\(200\\ \\Omega\\)" },
        { prompt: "The frequency doubles. What happens to \\(X_L\\) and \\(X_C\\)?", answer: "\\(X_L\\) doubles, \\(X_C\\) halves" },
        { prompt: "Which has no unit: \\(X_L/R\\) or \\(X_LX_C\\)?", answer: "\\(X_L/R\\)" },
      ],
      pyqExampleId: "86cef38d-4886-4fd7-b108-421f6c3894e0", // 6 Apr 2023: peak current through a capacitor
      traps: [
        {
          title: "Making the capacitive reactance rise with frequency",
          body: "Capacitive reactance goes DOWN as f or C goes up. Doubling both divides it by 4.",
        },
        {
          title: "Multiplying a given ω by 2π",
          body: "In sin(500t) the 500 is already ω in rad/s. Use 2πf only when the frequency is given in hertz.",
        },
        {
          title: "Peak or rms",
          body: "An emf written as E₀ sin ωt gives the PEAK current. An a.c. ammeter shows the rms value, √2 times smaller.",
        },
      ],
    },

    // C2 — phase in R, L, C (reference)
    {
      kind: "reference" as const,
      slug: "jpac-phase-pure",
      name: "Phase of the current in R, L and C",
      intuition:
        "In a resistor the current follows the voltage step for step. In an inductor the voltage is L di/dt, so it peaks when the current changes fastest, a quarter cycle ahead of the current. In a capacitor the current is C dv/dt, so the current is the one a quarter cycle ahead. When the current is zero just as the voltage peaks, the two are 90° apart.",
      definition:
        "- Pure L: if \\(i = I_0\\sin\\omega t\\), then \\(v = L\\dfrac{di}{dt} = I_0\\omega L\\sin\\left(\\omega t + \\dfrac{\\pi}{2}\\right)\\). The voltage leads.\n" +
        "- Pure C: if \\(v = V_0\\sin\\omega t\\), then \\(i = C\\dfrac{dv}{dt} = V_0\\omega C\\sin\\left(\\omega t + \\dfrac{\\pi}{2}\\right)\\). The current leads.\n" +
        "- Memory aid CIVIL: in C, I leads V; V leads I in L.\n" +
        "- On a phasor diagram the arrows turn anticlockwise; the arrow further round in that direction leads.\n" +
        "- To write the voltage across an inductor from its current: multiply the amplitude by \\(\\omega L\\) and add \\(\\dfrac{\\pi}{2}\\) to the phase.",
      table: {
        columns: ["Element", "Opposition", "Change with frequency", "Current compared with voltage", "Average power"],
        rows: [
          { cells: ["Pure resistor", "R", "None", "In phase", "\\(V_{rms}I_{rms}\\)"] },
          { cells: ["Pure inductor", "\\(X_L = \\omega L\\)", "Grows in proportion to f", "Lags by \\(\\dfrac{\\pi}{2}\\)", "Zero"] },
          { cells: ["Pure capacitor", "\\(X_C = \\dfrac{1}{\\omega C}\\)", "Falls as \\(\\dfrac{1}{f}\\)", "Leads by \\(\\dfrac{\\pi}{2}\\)", "Zero"] },
          { cells: ["Ideal L and C in series", "\\(|X_L - X_C|\\)", "Falls to zero at resonance", "Lags by \\(\\dfrac{\\pi}{2}\\) if \\(X_L > X_C\\), leads if \\(X_C > X_L\\)", "Zero"], noteAmber: "No resistance anywhere, so the gap is exactly 90° whichever reactance wins." },
          { cells: ["Series LCR", "\\(\\sqrt{R^{2} + (X_L - X_C)^{2}}\\)", "Least at resonance", "Angle \\(\\phi\\) with \\(\\tan\\phi = \\dfrac{X_L - X_C}{R}\\)", "\\(V_{rms}I_{rms}\\cos\\phi\\)"] },
        ],
        caption: "Current zero while the voltage is at its peak means a 90° gap: no resistance in the circuit.",
      },
      selfCheckExample: {
        prompt:
          "The current in a pure 40 mH inductor is \\(i = 2\\sin(250t - 60^{\\circ})\\ \\text{A}\\). Write the voltage across it.",
        steps: [
          "\\(X_L = 250 \\times 0.04 = 10\\ \\Omega\\), so the voltage amplitude is \\(2 \\times 10 = 20\\ \\text{V}\\).",
          "The voltage leads the current by \\(90^{\\circ}\\): phase \\(-60^{\\circ} + 90^{\\circ} = 30^{\\circ}\\).",
        ],
        answer: "\\(v = 20\\sin(250t + 30^{\\circ})\\ \\text{V}\\)",
      },
      practiceSet: [
        { prompt: "In a pure capacitor, does the current lead or lag the voltage?", answer: "Leads by \\(90^{\\circ}\\)" },
        { prompt: "Phase difference between current and voltage in a pure resistor?", answer: "Zero" },
        { prompt: "Average power taken by a pure inductor over a cycle?", answer: "Zero" },
        { prompt: "Ideal L and C in series with \\(X_C > X_L\\). Current leads or lags?", answer: "Leads by \\(90^{\\circ}\\)" },
      ],
      pyqExampleId: "1c7ef131-129f-4afb-bc0b-c54c4a9723d8", // 4 Apr 2024: current zero when voltage maximum
      traps: [
        {
          title: "Which one leads in an inductor",
          body: "In an inductor the VOLTAGE leads the current. Saying 'the current leads' is the capacitor's rule. CIVIL settles it.",
        },
        {
          title: "Adding 90° to the wrong quantity",
          body: "Going from current to voltage in an inductor, add π/2. Going from voltage to current, subtract it. For a capacitor it is the other way round.",
        },
      ],
    },

    // C3 — a real coil, and frequency limits
    {
      kind: "formula" as const,
      slug: "jpac-coil-limits",
      name: "A real coil on d.c. and a.c., and the frequency limits",
      intuition:
        "A real coil is a resistance and an inductance in series. On d.c. the inductance does nothing, so the current shows the resistance alone. On a.c. the current shows the impedance √(R² + X²). Only the resistance takes power. The same idea of extremes works for whole networks: at a very high frequency capacitors act like wires and inductors like breaks; on d.c. it is the reverse.",
      definition:
        "- On d.c.: \\(R = \\dfrac{V_{dc}}{I_{dc}}\\).\n" +
        "- On a.c.: \\(Z = \\dfrac{V_{rms}}{I_{rms}}\\), \\(X_L = \\sqrt{Z^{2} - R^{2}}\\), \\(L = \\dfrac{X_L}{2\\pi f}\\).\n" +
        "- Power taken by the coil: \\(P = I_{rms}^{2}R\\). The inductance takes none on average.\n" +
        "- Magnetic energy: \\(\\dfrac{1}{2}LI^{2}\\). Averaged over a cycle it is \\(\\dfrac{1}{2}LI_{rms}^{2}\\); its peak is \\(\\dfrac{1}{2}LI_0^{2}\\). Read which one the question means.\n" +
        "- Very high f: \\(X_C \\to 0\\) (a wire) and \\(X_L \\to \\infty\\) (a break). Very low f or d.c.: \\(X_C \\to \\infty\\) and \\(X_L \\to 0\\).\n" +
        "- Redraw the network with those wires and breaks, then combine the resistors that are left.",
      formula: {
        label: "Coil on d.c. and on a.c.",
        latex: "R = \\frac{V_{dc}}{I_{dc}} \\qquad Z = \\frac{V_{rms}}{I_{rms}} = \\sqrt{R^{2} + X_L^{2}}",
      },
      authoredExample: {
        prompt:
          "A coil draws 2 A from a 24 V d.c. supply and 1.2 A from a 24 V (rms), 50 Hz supply. Find its resistance, reactance, inductance and the power it takes on a.c.",
        steps: [
          "D.c.: \\(R = \\dfrac{24}{2} = 12\\ \\Omega\\).",
          "A.c.: \\(Z = \\dfrac{24}{1.2} = 20\\ \\Omega\\), so \\(X_L = \\sqrt{400 - 144} = 16\\ \\Omega\\).",
          "\\(L = \\dfrac{16}{2\\pi \\times 50} \\approx 0.051\\ \\text{H} = 51\\ \\text{mH}\\).",
          "Power: \\(P = 1.2^{2} \\times 12 \\approx 17.3\\ \\text{W}\\).",
        ],
        answer: "\\(12\\ \\Omega\\), \\(16\\ \\Omega\\), \\(\\approx 51\\ \\text{mH}\\), \\(\\approx 17.3\\ \\text{W}\\)",
      },
      selfCheckExample: {
        prompt:
          "A \\(10\\ \\Omega\\) resistor is in series with two parallel branches: a \\(20\\ \\Omega\\) resistor with a capacitor, and a \\(30\\ \\Omega\\) resistor with an inductor. A 60 V source drives it. Find the current at a very high frequency and on d.c.",
        steps: [
          "Very high f: the capacitor is a wire and the inductor a break, so only the \\(20\\ \\Omega\\) branch conducts. Total \\(10 + 20 = 30\\ \\Omega\\); \\(I = 2\\ \\text{A}\\).",
          "D.c.: the capacitor is a break and the inductor a wire, so only the \\(30\\ \\Omega\\) branch conducts. Total \\(40\\ \\Omega\\); \\(I = 1.5\\ \\text{A}\\).",
        ],
        answer: "\\(2\\ \\text{A}\\) at very high f; \\(1.5\\ \\text{A}\\) on d.c.",
      },
      practiceSet: [
        { prompt: "A coil takes 2 A from a 10 V d.c. supply. Its resistance?", answer: "\\(5\\ \\Omega\\)" },
        { prompt: "The same coil has \\(Z = 13\\ \\Omega\\) on a.c. Its reactance?", answer: "\\(12\\ \\Omega\\)" },
        { prompt: "At a very high frequency a capacitor acts as what?", answer: "A plain wire" },
        { prompt: "On d.c., an ideal inductor acts as what?", answer: "A plain wire" },
      ],
      pyqExampleId: "91cf9333-5830-40ad-9100-0af3cd4c9d21", // 9 Apr 2024: coil on d.c. then on a.c.
      traps: [
        {
          title: "Taking V/I on a.c. as the reactance",
          body: "V/I on a.c. is the impedance, which still contains the coil's resistance. Find R on d.c. first, then \\(X_L = \\sqrt{Z^{2} - R^{2}}\\).",
        },
        {
          title: "Power in the inductance",
          body: "Only the resistance takes power: P = I²R with the rms current. I²Z overstates it.",
        },
        {
          title: "Average or peak stored energy",
          body: "½LI² with the rms current is the energy averaged over a cycle; with the peak current it is the maximum. The two differ by a factor of 2.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const RESONANCE_AC_NOTE: SubtopicNote = {
  subtopicName: "Resonance, Quality Factor and Bandwidth",
  title: "Resonance, Quality Factor and Bandwidth",
  oneLineDefinition:
    "A series LCR circuit resonates when its two reactances are equal, at ω₀ = 1/√(LC); there the impedance is just R, the current and power are largest, and the quality factor ω₀L/R sets how sharp the peak is.",
  whyItMatters:
    "Thirty-one PYQs, fifteen of them asking for a number, the highest share in the chapter. Sixteen find the resonant frequency or the L or C that produces it. Ten ask what the current, impedance and power do at resonance. Five use the quality factor or the bandwidth. Most are one formula and a careful power of ten.",
  concepts: [
    // C1 — resonant frequency
    {
      kind: "formula" as const,
      slug: "jpac-res-frequency",
      name: "The resonant frequency",
      intuition:
        "As the frequency rises, the inductor's reactance climbs and the capacitor's falls. At one frequency they are equal and cancel. That is resonance. Setting ωL = 1/ωC gives ω₀ = 1/√(LC), and the resistance plays no part in it. Questions rarely say 'resonance'; they say maximum current, current in phase with the emf, maximum power or minimum impedance, and all of these mean the same thing.",
      definition:
        "- Resonance: \\(X_L = X_C\\), so \\(\\omega_0 = \\dfrac{1}{\\sqrt{LC}}\\) and \\(f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}\\). R does not appear.\n" +
        "- Signs of resonance: maximum current, maximum average power, minimum impedance (Z = R), current in phase with the emf, power factor 1.\n" +
        "- Missing part: \\(L = \\dfrac{1}{\\omega_0^{2}C}\\) or \\(C = \\dfrac{1}{\\omega_0^{2}L}\\). If \\(X_L\\) at the source frequency is given, the capacitor must have \\(X_C = X_L\\), so \\(C = \\dfrac{1}{\\omega X_L}\\).\n" +
        "- At resonance each reactance equals \\(\\omega_0L = \\sqrt{\\dfrac{L}{C}}\\).\n" +
        "- To raise \\(f_0\\), make LC smaller. A capacitor added in series lowers the total C. To keep \\(f_0\\) fixed, LC must stay fixed.\n" +
        "- A long line spreads its capacitance: total C = (capacitance per km) × length.\n" +
        "- Two tests on the same circuit: removing C and finding a lag of \\(45^{\\circ}\\) gives \\(X_L = R\\); removing L and finding a lead of \\(45^{\\circ}\\) gives \\(X_C = R\\). If both hold, \\(X_L = X_C\\) and the full circuit is at resonance.",
      formula: {
        label: "Resonant frequency",
        latex: "\\omega_0 = \\frac{1}{\\sqrt{LC}} \\qquad f_0 = \\frac{1}{2\\pi\\sqrt{LC}}",
      },
      authoredExample: {
        prompt:
          "A series circuit has L = 0.5 H, C = \\(8\\ \\mu\\text{F}\\) and R = \\(10\\ \\Omega\\). Find \\(\\omega_0\\), \\(f_0\\) and the reactance of each part at resonance.",
        steps: [
          "\\(LC = 0.5 \\times 8 \\times 10^{-6} = 4 \\times 10^{-6}\\), so \\(\\sqrt{LC} = 2 \\times 10^{-3}\\) and \\(\\omega_0 = 500\\ \\text{rad/s}\\).",
          "\\(f_0 = \\dfrac{500}{2\\pi} \\approx 79.6\\ \\text{Hz}\\).",
          "\\(X_L = 500 \\times 0.5 = 250\\ \\Omega\\), and \\(X_C\\) is also \\(250\\ \\Omega\\). The \\(10\\ \\Omega\\) was never used.",
        ],
        answer: "\\(500\\ \\text{rad/s}\\), \\(\\approx 79.6\\ \\text{Hz}\\), \\(250\\ \\Omega\\) each",
      },
      selfCheckExample: {
        prompt:
          "A 0.1 H inductor, a resistor and a variable capacitor are in series with a 200 Hz source. For what capacitance is the current largest? (Take \\(\\pi^{2} = 10\\).)",
        steps: [
          "\\(\\omega = 2\\pi \\times 200 = 400\\pi\\), so \\(\\omega^{2} = 160000\\,\\pi^{2} = 1.6 \\times 10^{6}\\).",
          "\\(C = \\dfrac{1}{\\omega^{2}L} = \\dfrac{1}{1.6 \\times 10^{6} \\times 0.1} = 6.25 \\times 10^{-6}\\ \\text{F}\\).",
        ],
        answer: "\\(6.25\\ \\mu\\text{F}\\)",
      },
      practiceSet: [
        { prompt: "L = 1 H, C = \\(1\\ \\mu\\text{F}\\). \\(\\omega_0\\)?", answer: "\\(1000\\ \\text{rad/s}\\)" },
        { prompt: "R is doubled. What happens to \\(\\omega_0\\)?", answer: "Nothing" },
        { prompt: "C is made 9 times. What inductance keeps \\(f_0\\) the same?", answer: "\\(\\dfrac{L}{9}\\)" },
        { prompt: "\\(X_L = 50\\ \\Omega\\) at the source frequency. What \\(X_C\\) gives the largest current?", answer: "\\(50\\ \\Omega\\)" },
      ],
      pyqExampleId: "8b5d5a5d-9de6-4462-82a1-eccdf2d244ed", // 5 Apr 2026 S2: X_L at resonance
      traps: [
        {
          title: "ω or f",
          body: "\\(\\dfrac{1}{\\sqrt{LC}}\\) is ω in rad/s. For hertz, divide by 2π. Check which one the blank asks for.",
        },
        {
          title: "Putting R into the formula",
          body: "The resistance changes how tall and wide the resonance peak is, never where it sits.",
        },
        {
          title: "Losing a power of ten",
          body: "Convert first: \\(1\\ \\mu\\text{F} = 10^{-6}\\ \\text{F}\\), \\(1\\ \\text{nF} = 10^{-9}\\ \\text{F}\\), \\(1\\ \\text{mH} = 10^{-3}\\ \\text{H}\\). Most wrong answers here are off by a power of ten.",
        },
      ],
    },

    // C2 — current and power at resonance
    {
      kind: "formula" as const,
      slug: "jpac-res-current",
      name: "Current, impedance and power at resonance",
      intuition:
        "At resonance the reactances cancel, so the circuit behaves as if only R were there. The current is V/R, it is in step with the voltage, and the power is V²/R. L and C decide where resonance happens; only R decides how big the current gets. Below resonance the capacitor's reactance is larger, so the circuit is capacitive; above it, inductive.",
      definition:
        "- At resonance \\(Z = R\\): \\(I_0 = \\dfrac{V_0}{R}\\), \\(I_{rms} = \\dfrac{V_{rms}}{R}\\), \\(\\cos\\phi = 1\\), \\(P = \\dfrac{V_{rms}^{2}}{R}\\).\n" +
        "- The resonant current goes as \\(\\dfrac{1}{R}\\): halving R doubles it. Changing L or C (with LC kept fixed) does not change it.\n" +
        "- Current against ω: it rises, peaks at \\(\\omega_0\\) and falls. Left of \\(\\omega_0\\): capacitive (\\(X_C > X_L\\)), current leads. Right of it: inductive, current lags.\n" +
        "- The same R alone across the same supply draws V/R. A series LCR with that R can only match it, at resonance; anywhere else it draws less.\n" +
        "- At resonance \\(V_L = V_C = IX_L\\). These can be far larger than the supply voltage; they cancel each other.\n" +
        "- Ideal L and C in PARALLEL at resonance: infinite impedance, so the line current is zero.\n" +
        "- Resonance needs both an L and a C. A circuit with only one of them cannot resonate.",
      formula: {
        label: "At resonance",
        latex: "Z = R \\qquad I_0 = \\frac{V_0}{R} \\qquad P_{max} = \\frac{V_{rms}^{2}}{R}",
      },
      authoredExample: {
        prompt:
          "R = \\(25\\ \\Omega\\), L = 0.2 H and C = \\(20\\ \\mu\\text{F}\\) are in series with a 150 V (rms) variable-frequency supply. At resonance find the rms and peak current, the rms voltage across L, and the power.",
        steps: [
          "\\(\\omega_0 = \\dfrac{1}{\\sqrt{0.2 \\times 20 \\times 10^{-6}}} = 500\\ \\text{rad/s}\\), so \\(X_L = X_C = 100\\ \\Omega\\).",
          "\\(I_{rms} = \\dfrac{150}{25} = 6\\ \\text{A}\\); \\(I_0 = 6\\sqrt{2} \\approx 8.49\\ \\text{A}\\).",
          "\\(V_L = 6 \\times 100 = 600\\ \\text{V}\\), four times the supply; \\(V_C\\) is also 600 V and cancels it.",
          "\\(P = \\dfrac{150^{2}}{25} = 900\\ \\text{W}\\).",
        ],
        answer: "\\(6\\ \\text{A}\\), \\(\\approx 8.49\\ \\text{A}\\), \\(600\\ \\text{V}\\), \\(900\\ \\text{W}\\)",
      },
      selfCheckExample: {
        prompt:
          "At resonance a series LCR circuit carries a current amplitude of 3 A. The resistance is made three times larger. What is the new current amplitude at resonance, and does the resonant frequency change?",
        steps: [
          "At resonance \\(I_0 = \\dfrac{V_0}{R}\\), so tripling R cuts the current to a third.",
          "\\(\\omega_0 = \\dfrac{1}{\\sqrt{LC}}\\) has no R in it.",
        ],
        answer: "\\(1\\ \\text{A}\\); no change",
      },
      practiceSet: [
        { prompt: "200 V (rms) supply, R = \\(40\\ \\Omega\\), circuit at resonance. RMS current?", answer: "\\(5\\ \\text{A}\\)" },
        { prompt: "Power factor at resonance?", answer: "1" },
        { prompt: "Below \\(\\omega_0\\), is a series LCR circuit capacitive or inductive?", answer: "Capacitive" },
        { prompt: "Ideal L and C in parallel at resonance. Line current?", answer: "Zero" },
      ],
      pyqExampleId: "fc893a09-8ee9-4177-bc5d-e60f9a2f3453", // 31 Jan 2023: current in phase, amplitude from R
      traps: [
        {
          title: "Forgetting √2 on the amplitude",
          body: "A supply quoted as '220 V' is rms. At resonance V/R is then the rms current; the amplitude is √2 times that.",
        },
        {
          title: "Using L and C to find the resonant current",
          body: "Once the circuit is at resonance, L and C have cancelled. The current depends only on V and R.",
        },
        {
          title: "Reading the I–ω curve the wrong way round",
          body: "On the low-frequency side \\(X_C\\) is large, so the circuit is capacitive. On the high side \\(X_L\\) wins.",
        },
      ],
    },

    // C3 — Q factor and bandwidth
    {
      kind: "formula" as const,
      slug: "jpac-q-bandwidth",
      name: "Quality factor and bandwidth",
      intuition:
        "The resonance peak can be sharp or broad. Its width is measured between the two frequencies where the current falls to 1/√2 of its peak, which is where the power halves. That width, the bandwidth, is R/L. The quality factor compares the resonant frequency with the width: a small R gives a narrow, tall peak and a large Q.",
      definition:
        "- \\(Q = \\dfrac{\\omega_0L}{R} = \\dfrac{1}{\\omega_0CR} = \\dfrac{1}{R}\\sqrt{\\dfrac{L}{C}}\\). It has no unit.\n" +
        "- Half-power frequencies \\(\\omega_1, \\omega_2\\): the current is \\(\\dfrac{I_{max}}{\\sqrt{2}}\\) and the power is half the peak.\n" +
        "- Bandwidth \\(\\Delta\\omega = \\omega_2 - \\omega_1 = \\dfrac{R}{L}\\), and \\(Q = \\dfrac{\\omega_0}{\\Delta\\omega}\\). For a sharp peak \\(\\omega_0 \\approx \\dfrac{\\omega_1 + \\omega_2}{2}\\).\n" +
        "- Raising R widens the bandwidth and lowers Q; \\(\\omega_0\\) stays put.\n" +
        "- Scaling with C fixed: \\(Q \\propto \\dfrac{\\sqrt{L}}{R}\\). L made 4 times gives Q twice; R made 3 times gives Q a third.\n" +
        "- \\(\\dfrac{Q}{\\Delta\\omega} = \\dfrac{\\omega_0L^{2}}{R^{2}}\\), with the unit of time.",
      formula: {
        label: "Quality factor and bandwidth",
        latex: "Q = \\frac{\\omega_0L}{R} = \\frac{1}{R}\\sqrt{\\frac{L}{C}} \\qquad \\Delta\\omega = \\frac{R}{L} = \\frac{\\omega_0}{Q}",
      },
      authoredExample: {
        prompt:
          "R = \\(20\\ \\Omega\\), L = 0.4 H and C = \\(10\\ \\mu\\text{F}\\) are in series. Find \\(\\omega_0\\), Q, the bandwidth and the two half-power frequencies.",
        steps: [
          "\\(\\omega_0 = \\dfrac{1}{\\sqrt{0.4 \\times 10 \\times 10^{-6}}} = \\dfrac{1}{2 \\times 10^{-3}} = 500\\ \\text{rad/s}\\).",
          "\\(Q = \\dfrac{500 \\times 0.4}{20} = 10\\).",
          "\\(\\Delta\\omega = \\dfrac{R}{L} = \\dfrac{20}{0.4} = 50\\ \\text{rad/s}\\), which is also \\(\\dfrac{\\omega_0}{Q}\\).",
          "Half-power frequencies, about \\(25\\ \\text{rad/s}\\) either side: \\(\\approx 475\\) and \\(525\\ \\text{rad/s}\\).",
        ],
        answer: "\\(500\\ \\text{rad/s}\\), 10, \\(50\\ \\text{rad/s}\\); \\(\\approx 475\\) and \\(525\\ \\text{rad/s}\\)",
      },
      selfCheckExample: {
        prompt:
          "The half-power frequencies of a series LCR circuit are 980 rad/s and 1020 rad/s, and R = \\(8\\ \\Omega\\). Find L and the quality factor.",
        steps: [
          "\\(\\Delta\\omega = 40\\ \\text{rad/s} = \\dfrac{R}{L}\\), so \\(L = \\dfrac{8}{40} = 0.2\\ \\text{H}\\).",
          "\\(\\omega_0 \\approx 1000\\ \\text{rad/s}\\), so \\(Q = \\dfrac{1000}{40} = 25\\).",
        ],
        answer: "\\(L = 0.2\\ \\text{H}\\), \\(Q = 25\\)",
      },
      practiceSet: [
        { prompt: "Q = 50 at \\(\\omega_0 = 10^{4}\\ \\text{rad/s}\\). Bandwidth?", answer: "\\(200\\ \\text{rad/s}\\)" },
        { prompt: "R is doubled, L and C fixed. What happens to Q?", answer: "It halves" },
        { prompt: "L is made 4 times, R and C fixed. What happens to Q?", answer: "It doubles" },
        { prompt: "At a half-power frequency, the current is what fraction of the peak?", answer: "\\(\\dfrac{1}{\\sqrt{2}}\\)" },
      ],
      pyqExampleId: "7d894e23-7c86-4492-90a9-dbd69ae5db2a", // 8 Apr 2023: Q from R, L and C
      traps: [
        {
          title: "Half power is not half current",
          body: "At the edges of the band the CURRENT is 1/√2 of its peak. Power goes as I², so the power is half.",
        },
        {
          title: "Q with f₀ instead of ω₀",
          body: "Q = ω₀L/R uses the angular frequency. Using f₀ makes Q too small by a factor of 2π.",
        },
        {
          title: "Bandwidth in rad/s or in Hz",
          body: "R/L is a bandwidth in rad/s. In hertz it is R/(2πL).",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const LC_TRANSFORMER_NOTE: SubtopicNote = {
  subtopicName: "LC Oscillations, Transformer, and AC Generator",
  title: "LC Oscillations, the Transformer and the AC Generator",
  oneLineDefinition:
    "A charged capacitor discharging through an inductor swaps its energy back and forth at ω = 1/√(LC); a transformer steps voltage by the turns ratio; and a coil turning in a field generates e₀ = NABω.",
  whyItMatters:
    "9 PYQs, three HARD. Three separate ideas share this page: the energy swap of an LC circuit (its peak current and the quarter-period timing), " +
    "the transformer's turns and efficiency, and the peak e.m.f. and power of a rotating coil.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-lc-oscillations",
      name: "LC Oscillations",
      intuition:
        "With no resistance, the energy that sat in the capacitor's field moves into the inductor's field and back, over and over. All of ½CV² becomes ½LI₀² at the moment the capacitor is empty — which is a quarter-period after it was full.",
      definition:
        "- \\(\\omega = \\dfrac{1}{\\sqrt{LC}}\\), \\(T = 2\\pi\\sqrt{LC}\\).\n" +
        "- Energy: \\(\\dfrac{1}{2}CV^2 = \\dfrac{1}{2}LI_0^2 \\Rightarrow I_0 = V\\sqrt{\\dfrac{C}{L}}\\). The instantaneous current can take any value up to this.\n" +
        "- Capacitor full to current greatest: \\(\\dfrac{T}{4} = \\dfrac{\\pi}{2}\\sqrt{LC}\\). The current keeps reversing; the energy is all magnetic only at the instants the capacitor is empty.\n" +
        "- Inductor on a.c.: its stored energy goes from greatest to zero in \\(\\dfrac{T}{4}\\).",
      formula: {
        label: "LC circuit",
        latex: "T = 2\\pi\\sqrt{LC}, \\qquad I_0 = V\\sqrt{\\frac{C}{L}}",
      },
      authoredExample: {
        prompt: "A \\(4\\,\\mu\\)F capacitor at 100 V discharges through a 1 mH inductor. Peak current and period?",
        steps: [
          "\\(I_0 = 100\\sqrt{\\dfrac{4 \\times 10^{-6}}{10^{-3}}} = 100 \\times 0.063 \\approx 6.3\\) A.",
          "\\(T = 2\\pi\\sqrt{4 \\times 10^{-9}} \\approx 4.0 \\times 10^{-4}\\) s.",
        ],
        answer: "≈ 6.3 A; ≈ 0.4 ms",
      },
      selfCheckExample: {
        prompt: "The magnetic energy in an inductor on a.c. falls from its greatest to zero in 5 ms. Frequency?",
        steps: ["That is \\(\\dfrac{T}{4}\\): \\(T = 20\\) ms."],
        answer: "50 Hz",
      },
      practiceSet: [
        { prompt: "\\(1\\,\\mu\\)F at 50 V through 10 mH. Peak current?", answer: "0.5 A" },
        { prompt: "\\(L = 16\\) mH, \\(C = 10\\,\\mu\\)F, capacitor full at \\(t = 0\\). When is the current greatest?", answer: "\\(2\\pi \\times 10^{-4}\\) s" },
      ],
      pyqExampleId: "ecacfaa5-0700-40b5-b935-11f71e0ca57a",
      traps: [
        {
          title: "Taking the full period for 'current greatest'",
          body:
            "From a full capacitor, the current is greatest a QUARTER period later. \\(2\\pi\\sqrt{LC}\\) is the time to come back to a full capacitor of the same polarity.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-transformer",
      name: "The Transformer",
      intuition:
        "A transformer passes power from one coil to another through a shared changing flux, so the voltage per turn is the same in both. An ideal one loses nothing: it raises voltage only by lowering current.",
      definition:
        "- \\(\\dfrac{V_s}{V_p} = \\dfrac{N_s}{N_p}\\); ideal: \\(V_pI_p = V_sI_s\\), so \\(\\dfrac{I_s}{I_p} = \\dfrac{N_p}{N_s}\\).\n" +
        "- Efficiency \\(\\eta = \\dfrac{V_sI_s}{V_pI_p}\\): 3 kW in at 200 V and 90% ⇒ \\(I_p = 15\\) A and 2700 W out.\n" +
        "- A transformer works only on a.c.",
      formula: {
        label: "Transformer",
        latex: "\\frac{V_s}{V_p} = \\frac{N_s}{N_p}, \\qquad \\eta = \\frac{V_sI_s}{V_pI_p}",
      },
      authoredExample: {
        prompt: "An ideal transformer steps 200 V up to 800 V. The primary has 100 turns; the secondary delivers 2 A. Secondary turns and primary current?",
        steps: ["\\(N_s = 100 \\times 4 = 400\\).", "\\(I_p = 2 \\times 4 = 8\\) A."],
        answer: "400 turns; 8 A",
      },
      selfCheckExample: {
        prompt: "An 80% efficient transformer takes 1 kW at 250 V and gives 1000 V. Primary and secondary currents?",
        steps: ["\\(I_p = \\dfrac{1000}{250} = 4\\) A; output 800 W, \\(I_s = \\dfrac{800}{1000} = 0.8\\) A."],
        answer: "4 A; 0.8 A",
      },
      practiceSet: [
        { prompt: "An ideal transformer raises 220 V to 4.4 kV to send 6.6 kW. Secondary current?", answer: "1.5 A" },
      ],
      pyqExampleId: "6b00506f-accc-4bf8-abe8-b8b95ac5b896",
      traps: [
        {
          title: "Applying the efficiency to the primary current",
          body:
            "The primary current comes from the INPUT power, \\(\\frac{3000}{200} = 15\\) A. The 90% applies to what comes out: \\(V_s = \\frac{2700}{6} = 450\\) V.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-ac-generator",
      name: "The AC Generator",
      intuition:
        "A coil turning in a magnetic field has its flux change sinusoidally, so it produces e = NABω sin ωt. The peak e.m.f. grows with every factor — turns, area, field and speed.",
      definition:
        "- \\(e = NAB\\omega\\sin\\omega t\\), \\(e_0 = NAB\\omega\\).\n" +
        "- Into a resistance \\(R\\): average power \\(\\dfrac{e_0^2}{2R} = \\dfrac{N^2A^2B^2\\omega^2}{2R}\\).",
      formula: {
        label: "Generator e.m.f.",
        latex: "e_0 = NAB\\omega, \\qquad \\bar P = \\frac{(NAB\\omega)^2}{2R}",
      },
      authoredExample: {
        prompt: "A 50-turn coil of area 0.02 m² spins at 100 rad/s in a 0.5 T field. Peak e.m.f.?",
        steps: ["\\(e_0 = 50 \\times 0.02 \\times 0.5 \\times 100 = 50\\) V."],
        answer: "50 V",
      },
      selfCheckExample: {
        prompt: "That generator drives a \\(25\\,\\Omega\\) load. Average power?",
        steps: ["\\(\\dfrac{50^2}{2 \\times 25} = 50\\) W."],
        answer: "50 W",
      },
      practiceSet: [
        { prompt: "The coil's speed is doubled. Peak e.m.f. and average power change by?", answer: "×2 and ×4" },
      ],
      pyqExampleId: "2a3f1a26-2458-4424-bcac-fcb635080cde",
      traps: [
        {
          title: "Squaring only part of e₀",
          body:
            "Power goes as \\(e_0^2\\), so as \\(N^2A^2B^2\\omega^2\\) — every factor squared. Options with \\(NAB\\omega\\) to the first power are the e.m.f., not the power.",
        },
      ],
    },
  ],
  related: [
    { label: "Resonance in Series LCR Circuits", href: "/notes/mht-cet-physics/ac-circuits/cetp-resonance" },
    { label: "AC Basics — peak and r.m.s.", href: "/notes/mht-cet-physics/ac-circuits/cetp-ac-basics" },
  ],
};

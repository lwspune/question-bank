import type { SubtopicNote } from "@/app/notes/_types";

export const AC_BASICS_NOTE: SubtopicNote = {
  subtopicName: "RMS, Peak, and AC Source Characteristics",
  title: "Alternating Current: Instantaneous, Peak and RMS Values",
  oneLineDefinition:
    "An alternating current follows I = I₀ sin(ωt + φ); its peak is I₀, and its r.m.s. value I₀/√2 is the steady current that would heat a resistor equally.",
  whyItMatters:
    "7 PYQs, one HARD. Two things are asked: when a sinusoid first reaches its peak, half its peak or zero, " +
    "and converting between peak and r.m.s. values — what an a.c. ammeter or voltmeter reads.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-ac-instantaneous",
      name: "Reading a Sinusoid: Peak Times, Zeros and Phase",
      intuition:
        "The phase ωt + φ tells you where in its cycle the signal is. It reaches its peak when the phase is π/2, half its peak (from zero) when the phase is π/6, and it crosses zero twice every cycle — so f cycles a second means 2f zeros.",
      definition:
        "- \\(i = I_0\\sin(\\omega t + \\phi)\\), \\(\\omega = 2\\pi f = \\dfrac{2\\pi}{T}\\).\n" +
        "- First peak: \\(\\omega t + \\phi = \\dfrac{\\pi}{2}\\). With \\(\\phi = \\dfrac{\\pi}{3}\\): \\(t = \\dfrac{T}{12}\\).\n" +
        "- From zero to half the peak: \\(\\omega t = \\dfrac{\\pi}{6}\\), \\(t = \\dfrac{T}{12}\\); to the peak: \\(\\dfrac{T}{4}\\).\n" +
        "- Zero crossings per second \\(= 2f\\): \\(\\sin(50\\pi t)\\) has \\(f = 25\\) Hz and 50 zeros a second.",
      formula: {
        label: "Instantaneous value",
        latex: "i = I_0\\sin(\\omega t + \\phi), \\qquad \\omega = 2\\pi f",
      },
      authoredExample: {
        prompt: "\\(v = 10\\sin\\left(100\\pi t + \\dfrac{\\pi}{6}\\right)\\). When does it first reach its peak?",
        steps: ["\\(100\\pi t + \\dfrac{\\pi}{6} = \\dfrac{\\pi}{2} \\Rightarrow 100\\pi t = \\dfrac{\\pi}{3}\\).", "\\(t = \\dfrac{1}{300}\\) s."],
        answer: "\\(\\dfrac{1}{300}\\) s",
      },
      selfCheckExample: {
        prompt: "\\(i = 5\\sin(100\\pi t)\\). How many times a second is the current zero?",
        steps: ["\\(f = 50\\) Hz, two zeros per cycle."],
        answer: "100",
      },
      practiceSet: [
        { prompt: "\\(e = e_0\\sin\\omega t\\) from zero: time to reach half its peak?", answer: "\\(\\dfrac{T}{12}\\)" },
        { prompt: "\\(I = 3\\sin\\left(50\\pi t + \\dfrac{\\pi}{4}\\right)\\): first maximum at?", answer: "\\(\\dfrac{1}{200}\\) s" },
      ],
      pyqExampleId: "3b576412-2ed9-49ee-8601-cc50e0a563d2",
      traps: [
        {
          title: "Forgetting the starting phase",
          body:
            "With a phase \\(\\phi\\) already in the equation, the peak comes EARLIER: solve \\(\\omega t + \\phi = \\frac{\\pi}{2}\\), not \\(\\omega t = \\frac{\\pi}{2}\\). \\(\\frac{T}{4}\\) is the planted answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-rms-values",
      name: "Peak and R.M.S. Values",
      intuition:
        "Meters read r.m.s. values, and the mains '230 V' is an r.m.s. value too. For a sine wave the r.m.s. is the peak divided by √2 — the equation gives the peak, the meter gives the r.m.s.",
      definition:
        "- \\(I_{\\text{rms}} = \\dfrac{I_0}{\\sqrt{2}}\\), \\(V_{\\text{rms}} = \\dfrac{V_0}{\\sqrt{2}}\\); \\(e = 200\\sin 50t\\) has \\(V_{\\text{rms}} = 100\\sqrt{2}\\) V.\n" +
        "- A resistor: \\(I_{\\text{rms}} = \\dfrac{V_{\\text{rms}}}{R}\\), in phase, so \\(P = V_{\\text{rms}}I_{\\text{rms}}\\).\n" +
        "- A phase written into the voltage alone (\\(\\sin(\\omega t + 60^\\circ)\\)) is a starting point, not a phase DIFFERENCE — a lamp still has power factor 1.",
      formula: {
        label: "R.m.s. value",
        latex: "I_{\\text{rms}} = \\frac{I_0}{\\sqrt{2}} \\approx 0.707\\,I_0",
      },
      authoredExample: {
        prompt: "\\(e = 311\\sin 314t\\) volt drives a \\(110\\,\\Omega\\) resistor. R.m.s. voltage and current?",
        steps: ["\\(V_{\\text{rms}} = \\dfrac{311}{\\sqrt{2}} \\approx 220\\) V.", "\\(I_{\\text{rms}} = \\dfrac{220}{110} = 2\\) A."],
        answer: "220 V; 2 A",
      },
      selfCheckExample: {
        prompt: "\\(e = 170\\sin(100\\pi t)\\) volt across \\(60\\,\\Omega\\). R.m.s. voltage and current?",
        steps: ["\\(V_{\\text{rms}} = \\dfrac{170}{\\sqrt{2}} \\approx 120\\) V.", "\\(I_{\\text{rms}} = \\dfrac{120}{60} = 2\\) A."],
        answer: "≈ 120 V; 2 A",
      },
      practiceSet: [
        { prompt: "Lamps of total 1000 W on \\(E = 200\\sin(310t + 60^\\circ)\\). R.m.s. current?", answer: "\\(5\\sqrt{2}\\) A" },
      ],
      pyqExampleId: "c92cf8ff-94ee-44bf-ad05-6386e9093a6a",
      traps: [
        {
          title: "Using the peak where the r.m.s. is meant",
          body:
            "The number in front of \\(\\sin\\) is the PEAK. A meter reading, a power, or a '220 V supply' all mean r.m.s.; divide by \\(\\sqrt{2}\\) first.",
        },
      ],
    },
  ],
  related: [
    { label: "Reactance — single-element circuits", href: "/notes/mht-cet-physics/ac-circuits/cetp-reactance" },
    { label: "Power in AC Circuits", href: "/notes/mht-cet-physics/ac-circuits/cetp-ac-power" },
  ],
};

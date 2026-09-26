import type { SubtopicNote } from "@/app/notes/_types";

export const PROGRESSIVE_WAVES_NOTE: SubtopicNote = {
  subtopicName: "Progressive Wave, Wave Equation, and Velocity",
  title: "Progressive Waves: the Wave Equation, Phase and Particle Velocity",
  oneLineDefinition:
    "A progressive wave y = A sin(ωt − kx) carries a disturbance at v = ω/k = fλ; two points Δx apart differ in phase by 2πΔx/λ, and each particle oscillates with a top speed Aω that is quite separate from the wave's speed.",
  whyItMatters:
    "34 PYQs, three HARD. Three shapes: reading ω, k, λ, v and the direction off a wave equation (and the speed on a string, √(T/μ)), converting between phase and path difference, " +
    "and comparing the particles' maximum velocity with the wave velocity.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-wave-equation",
      name: "Reading the Wave Equation",
      intuition:
        "Everything is in the two coefficients: the number multiplying t is ω, the one multiplying x is k. Their ratio is the speed, and the relative sign of the t and x terms gives the direction — opposite signs, the wave moves toward +x; same signs, toward −x.",
      definition:
        "- \\(y = A\\sin(\\omega t - kx + \\phi)\\): \\(f = \\dfrac{\\omega}{2\\pi}\\), \\(\\lambda = \\dfrac{2\\pi}{k}\\), \\(v = \\dfrac{\\omega}{k} = f\\lambda\\). Opposite signs: along \\(+x\\); same signs: along \\(-x\\).\n" +
        "- \\(y = A\\sin 2\\pi\\left(\\dfrac{t}{T} - \\dfrac{x}{\\lambda}\\right)\\) reads off \\(T\\) and \\(\\lambda\\) directly.\n" +
        "- Frequency is fixed by the source; entering a new medium changes \\(v\\) and \\(\\lambda\\) together.\n" +
        "- String: \\(v = \\sqrt{\\dfrac{T}{\\mu}}\\). Hanging rope with a load: tension, and so \\(\\lambda\\), grows toward the top.\n" +
        "- Sound: \\(v \\propto \\sqrt{T_{\\text{abs}}}\\). Reflection at a rigid wall: phase reverses (\\(180^\\circ\\)), speed unchanged.",
      formula: {
        label: "Progressive wave",
        latex: "y = A\\sin(\\omega t - kx), \\qquad v = \\frac{\\omega}{k} = f\\lambda",
      },
      authoredExample: {
        prompt: "\\(y = 0.05\\sin(200\\pi t - 4\\pi x)\\) (SI). Frequency, wavelength, speed and direction?",
        steps: ["\\(f = 100\\) Hz; \\(\\lambda = \\dfrac{2\\pi}{4\\pi} = 0.5\\) m.", "\\(v = 100 \\times 0.5 = 50\\) m/s, along \\(+x\\) (opposite signs)."],
        answer: "100 Hz; 0.5 m; 50 m/s along +x",
      },
      selfCheckExample: {
        prompt: "A string of mass per unit length 0.1 kg/m is under 90 N tension. Wave speed?",
        steps: ["\\(v = \\sqrt{\\dfrac{90}{0.1}} = 30\\) m/s."],
        answer: "30 m/s",
      },
      practiceSet: [
        { prompt: "\\(y = 0.002\\sin(100t + x)\\). Speed and direction?", answer: "100 m/s along −x" },
        { prompt: "45 sea waves pass in a minute; wavelength 7 m. Speed?", answer: "5.25 m/s" },
        { prompt: "A 2 m string of mass 0.2 kg at 2.5 N. Time for a pulse to cross it?", answer: "0.4 s" },
      ],
      pyqExampleId: "8a621bab-afd0-43e3-80df-89808397ae93",
      traps: [
        {
          title: "Leaving π in the wave number",
          body:
            "In \\(12\\pi t - 0.02\\pi x\\), \\(k = 0.02\\pi\\), so \\(v = 600\\) m/s. Reading \\(k = 0.02\\) gives \\(600\\pi\\) — watch whether the \\(\\pi\\) is attached to x.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-phase-path",
      name: "Phase Difference and Path Difference",
      intuition:
        "One wavelength of distance is one full cycle of phase, 2π. So any separation along the wave converts to phase by the fraction of a wavelength it covers — 60° is a sixth of a wavelength.",
      definition:
        "- \\(\\Delta\\phi = \\dfrac{2\\pi}{\\lambda}\\Delta x\\), \\(\\Delta x = \\dfrac{\\lambda}{2\\pi}\\Delta\\phi\\).\n" +
        "- Points \\(60^\\circ\\) apart: \\(\\dfrac{\\lambda}{6}\\); \\(90^\\circ\\): \\(\\dfrac{\\lambda}{4}\\).\n" +
        "- Two waves at a point \\((x, t)\\): phase difference = difference of their full phases, e.g. \\((25x - 40t) - (20x - 30t)\\).\n" +
        "- \\(a\\cos(\\theta)\\) leads \\(a\\sin(\\theta)\\) by \\(\\dfrac{\\pi}{2}\\), so a sine and a cosine wave with an extra \\(\\phi\\) differ by \\(\\phi + \\dfrac{\\pi}{2}\\).\n" +
        "- Points in the same state of vibration are a whole number of wavelengths apart.",
      formula: {
        label: "Phase and path",
        latex: "\\Delta\\phi = \\frac{2\\pi}{\\lambda}\\,\\Delta x",
      },
      authoredExample: {
        prompt: "Sound of 680 Hz in air at 340 m/s. How far apart are two points \\(60^\\circ\\) out of phase?",
        steps: ["\\(\\lambda = \\dfrac{340}{680} = 0.5\\) m.", "\\(\\Delta x = \\dfrac{0.5}{6} \\approx 0.083\\) m."],
        answer: "≈ 8.3 cm",
      },
      selfCheckExample: {
        prompt: "\\(\\lambda = 0.6\\) m. Phase difference between points 0.15 m apart?",
        steps: ["\\(\\dfrac{2\\pi}{0.6} \\times 0.15 = \\dfrac{\\pi}{2}\\)."],
        answer: "\\(\\dfrac{\\pi}{2}\\)",
      },
      practiceSet: [
        { prompt: "40 cm of path is 1.6π of phase; v = 330 m/s. Frequency?", answer: "660 Hz" },
        { prompt: "\\(y = 12\\sin(5t - 4x)\\). Separation of points \\(90^\\circ\\) apart?", answer: "\\(\\dfrac{\\pi}{8}\\) m" },
      ],
      pyqExampleId: "3f487029-5e21-4833-b0c8-11a861c90186",
      traps: [
        {
          title: "Mixing degrees and radians",
          body:
            "\\(\\Delta x = \\frac{\\lambda}{2\\pi}\\Delta\\phi\\) needs \\(\\Delta\\phi\\) in radians; in degrees use \\(\\frac{\\Delta\\phi}{360^\\circ}\\lambda\\). Plugging 60 into the radian form is the classic slip.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-particle-velocity",
      name: "Particle Velocity Against Wave Velocity",
      intuition:
        "The wave moves along x at ω/k; each particle just bobs up and down, fastest as it passes the middle, at Aω. Their ratio, Aω ÷ (ω/k) = Ak, depends only on the amplitude and the wavelength.",
      definition:
        "- Particle: \\(v_{p,\\max} = A\\omega\\), \\(a_{\\max} = A\\omega^2\\). Wave: \\(v = \\dfrac{\\omega}{k}\\).\n" +
        "- \\(\\dfrac{v_{p,\\max}}{v} = Ak = \\dfrac{2\\pi A}{\\lambda}\\).\n" +
        "- \\(y = a\\sin 2\\pi(bt - cx)\\): \\(v = \\dfrac{b}{c}\\), \\(v_{p,\\max} = 2\\pi ab\\).\n" +
        "- \\(y = A\\sin^2(\\omega t - kx)\\) is a wave of amplitude \\(\\dfrac{A}{2}\\) at \\(2\\omega\\) and \\(2k\\): \\(v_{p,\\max} = A\\omega\\), wavelength \\(\\dfrac{\\pi}{k}\\).\n" +
        "- Energy of a wave \\(\\propto n^2A^2\\).",
      formula: {
        label: "Speed ratio",
        latex: "\\frac{v_{p,\\max}}{v_{\\text{wave}}} = Ak = \\frac{2\\pi A}{\\lambda}",
      },
      authoredExample: {
        prompt: "\\(y = 0.02\\sin(100t - 5x)\\) (SI). Maximum particle speed, wave speed and their ratio?",
        steps: ["\\(v_{p,\\max} = 0.02 \\times 100 = 2\\) m/s; \\(v = \\dfrac{100}{5} = 20\\) m/s.", "Ratio \\(0.1 = Ak = 0.02 \\times 5\\)."],
        answer: "2 m/s; 20 m/s; 0.1",
      },
      selfCheckExample: {
        prompt: "Two waves carry equal energy; one has half the other's frequency. Ratio of its amplitude to the other's?",
        steps: ["\\(n^2A^2\\) equal: \\(A \\propto \\dfrac{1}{n}\\)."],
        answer: "2",
      },
      practiceSet: [
        { prompt: "\\(y = 60\\sin(1200t - 6x)\\) μm. Ratio of max particle speed to wave speed?", answer: "\\(3.6 \\times 10^{-4}\\)" },
        { prompt: "\\(y = a\\sin 2\\pi(bt - cx)\\): for \\(v_{p,\\max} = \\frac{1}{2}v\\), c = ?", answer: "\\(\\dfrac{1}{4\\pi a}\\)" },
      ],
      pyqExampleId: "ee4a9174-3de6-4ef2-9a1e-260609d24f32",
      traps: [
        {
          title: "Treating a sin² wave like a sine wave",
          body:
            "\\(A\\sin^2\\theta = \\frac{A}{2}(1 - \\cos 2\\theta)\\): the oscillation has amplitude \\(\\frac{A}{2}\\) at twice the frequency, so the particles peak at \\(A\\omega\\), not \\(2A\\omega\\) — and the wavelength is \\(\\frac{\\pi}{k}\\).",
        },
      ],
    },
  ],
  related: [
    { label: "Superposition of Two Waves", href: "/notes/mht-cet-physics/superposition-of-waves/cetp-superposition" },
    { label: "Stationary Waves and Strings", href: "/notes/mht-cet-physics/superposition-of-waves/cetp-stationary-waves" },
  ],
};

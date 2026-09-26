import type { SubtopicNote } from "@/app/notes/_types";

export const INTERFERENCE_INTENSITY_NOTE: SubtopicNote = {
  subtopicName: "Interference Intensity and Coherent Sources",
  title: "Intensity in an Interference Pattern",
  oneLineDefinition:
    "Two coherent waves of equal intensity I₀ combine to 4I₀cos²(φ/2), where the phase difference is φ = 2π × (path difference)/λ; with unequal intensities the maxima and minima are (√I₁ ± √I₂)², so the dark fringes are no longer dark.",
  whyItMatters:
    "29 PYQs, six HARD. Two shapes: the intensity at a point with a given path or phase difference (and which fringe sits there), " +
    "and the maximum-to-minimum ratio when the two sources are unequal — including light reflected from the two faces of a glass plate.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-intensity-phase",
      name: "Intensity From the Phase Difference",
      intuition:
        "Convert the path difference into a phase difference, halve it, and square the cosine. A whole number of wavelengths gives the full 4I₀ (a bright fringe); an odd number of half-wavelengths gives zero (a dark fringe); everything else lies between.",
      definition:
        "- \\(\\phi = \\dfrac{2\\pi}{\\lambda}\\Delta x\\); \\(I = 4I_0\\cos^2\\dfrac{\\phi}{2} = I_{\\max}\\cos^2\\dfrac{\\phi}{2}\\) for equal sources.\n" +
        "- Path \\(\\dfrac{\\lambda}{4}\\): \\(\\dfrac{I_{\\max}}{2}\\). \\(\\dfrac{\\lambda}{6}\\): \\(\\dfrac{3I_{\\max}}{4}\\). \\(\\dfrac{\\lambda}{3}\\): \\(\\dfrac{I_{\\max}}{4}\\).\n" +
        "- Dark fringes: \\(\\phi = (2n - 1)\\pi\\); bright: \\(\\phi = 2n\\pi\\). A path difference of \\(n\\lambda\\) is the \\(n\\)th bright band.\n" +
        "- At a height \\(y\\) on the screen: \\(\\Delta x = \\dfrac{yd}{D}\\).\n" +
        "- \\(y_1 = a\\sin(\\omega t - kx)\\) and \\(y_2 = a\\cos(\\omega t - kx + \\phi)\\) differ in phase by \\(\\phi + \\dfrac{\\pi}{2}\\).",
      formula: {
        label: "Two equal coherent sources",
        latex: "I = 4I_0\\cos^2\\frac{\\phi}{2}, \\qquad \\phi = \\frac{2\\pi}{\\lambda}\\,\\Delta x",
      },
      authoredExample: {
        prompt: "The maximum intensity is \\(I_{\\max}\\). What is the intensity where the path difference is \\(\\dfrac{\\lambda}{3}\\)?",
        steps: ["\\(\\phi = \\dfrac{2\\pi}{3}\\), \\(\\dfrac{\\phi}{2} = 60^\\circ\\).", "\\(I = I_{\\max}\\cos^2 60^\\circ = \\dfrac{I_{\\max}}{4}\\)."],
        answer: "\\(\\dfrac{I_{\\max}}{4}\\)",
      },
      selfCheckExample: {
        prompt: "Intensity where the path difference is \\(\\dfrac{\\lambda}{8}\\), as a fraction of the maximum?",
        steps: ["\\(\\phi = \\dfrac{\\pi}{4}\\); \\(\\cos^2 22.5^\\circ \\approx 0.85\\)."],
        answer: "≈ 0.85 \\(I_{\\max}\\)",
      },
      practiceSet: [
        { prompt: "Phase difference for the nth dark fringe?", answer: "\\((2n - 1)\\pi\\)" },
        { prompt: "Ratio of intensities at path differences 0 and \\(\\dfrac{\\lambda}{2}\\)?", answer: "\\(\\infty : 1\\)" },
        { prompt: "Rays through media \\(\\mu_1, L_1\\) and \\(\\mu_2, L_2\\): phase difference?", answer: "\\(\\dfrac{2\\pi}{\\lambda}(\\mu_1L_1 - \\mu_2L_2)\\)" },
      ],
      pyqExampleId: "717b8ba5-4af8-45d4-a2eb-05fdb05fd197",
      traps: [
        {
          title: "Forgetting to halve the phase",
          body:
            "\\(I \\propto \\cos^2\\frac{\\phi}{2}\\). At \\(\\frac{\\lambda}{4}\\), \\(\\phi = 90^\\circ\\) and the answer is \\(\\frac{1}{2}\\), not \\(\\cos^2 90^\\circ = 0\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-unequal-sources",
      name: "Unequal Sources: Maxima, Minima and Contrast",
      intuition:
        "Amplitudes add at a bright fringe and subtract at a dark one, and intensity goes as amplitude squared. With unequal sources the subtraction never reaches zero, so the dark fringes glow and the contrast drops. Work with square roots of intensities throughout.",
      definition:
        "- \\(I_{\\max} = (\\sqrt{I_1} + \\sqrt{I_2})^2\\), \\(I_{\\min} = (\\sqrt{I_1} - \\sqrt{I_2})^2\\). General point: \\(I = I_1 + I_2 + 2\\sqrt{I_1I_2}\\cos\\phi\\).\n" +
        "- \\(I_1 : I_2 = 9 : 1\\) ⇒ \\(\\dfrac{I_{\\max}}{I_{\\min}} = \\left(\\dfrac{3 + 1}{3 - 1}\\right)^2 = 4\\). Reverse: \\(\\dfrac{I_{\\max}}{I_{\\min}} = 9\\) ⇒ \\(I_1 : I_2 = 4 : 1\\).\n" +
        "- Amplitude ratio at bright and dark fringes \\(= \\sqrt{\\dfrac{I_{\\max}}{I_{\\min}}}\\).\n" +
        "- One slit made wider (or brighter): both maxima and minima brighten. One slit dimmed: maxima dim, minima brighten.\n" +
        "- Reflections from the two faces of a plate: each carries its share of the energy — compute both, then use the same formula.",
      formula: {
        label: "Maxima and minima",
        latex: "\\frac{I_{\\max}}{I_{\\min}} = \\left(\\frac{\\sqrt{I_1} + \\sqrt{I_2}}{\\sqrt{I_1} - \\sqrt{I_2}}\\right)^2",
      },
      authoredExample: {
        prompt: "Two coherent sources have intensities in the ratio 16 : 1. Ratio of maximum to minimum intensity?",
        steps: ["\\(\\left(\\dfrac{4 + 1}{4 - 1}\\right)^2 = \\dfrac{25}{9}\\)."],
        answer: "25 : 9",
      },
      selfCheckExample: {
        prompt: "The maximum-to-minimum ratio is 25. Ratio of the two source intensities?",
        steps: ["\\(\\dfrac{x + 1}{x - 1} = 5\\) with \\(x = \\sqrt{\\dfrac{I_1}{I_2}}\\), so \\(x = 1.5\\)."],
        answer: "9 : 4",
      },
      practiceSet: [
        { prompt: "Sources I and 9I, phase difference \\(\\dfrac{\\pi}{2}\\) at P and \\(\\pi\\) at Q. \\(I_P - I_Q\\)?", answer: "6I" },
        { prompt: "One source is twice as intense as the other. \\(\\dfrac{I_{\\max}}{I_{\\min}}\\)?", answer: "≈ 34 : 1" },
      ],
      pyqExampleId: "f7ecd926-aec8-4089-89eb-68e21007f884",
      traps: [
        {
          title: "Taking the intensity ratio as the max–min ratio",
          body:
            "Sources in the ratio 9 : 1 do NOT give fringes in the ratio 9 : 1. Take square roots (3 and 1), add and subtract, then square: 4 : 1.",
        },
      ],
    },
  ],
  related: [
    { label: "Young's Double Slit — fringe positions", href: "/notes/mht-cet-physics/wave-optics/cetp-ydse-fringes" },
    { label: "Wavefronts and Coherent Sources", href: "/notes/mht-cet-physics/wave-optics/cetp-wavefronts" },
  ],
};

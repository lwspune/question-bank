import type { SubtopicNote } from "@/app/notes/_types";

export const WAVEFRONTS_NOTE: SubtopicNote = {
  subtopicName: "Wavefronts, Huygens, and Coherence",
  title: "Wavefronts, Huygens' Principle and Coherent Sources",
  oneLineDefinition:
    "A wavefront is a surface of equal phase, always perpendicular to the rays; Huygens' principle builds each new wavefront from secondary wavelets; and only coherent sources — same frequency, fixed phase difference — give a steady interference pattern.",
  whyItMatters:
    "5 PYQs, none HARD — a short page of recall. What a wavefront is and what happens to it at a boundary, what the wave theory explains that the corpuscle theory does not, and why two different colours cannot interfere.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-huygens",
      name: "Wavefronts and the Wave Theory",
      intuition:
        "Every point on a wavefront sends out a small spherical wavelet; the surface touching all of them a moment later is the new wavefront. In a slower medium the wavelets are smaller, so the wavefront — and the wavelength — shrink; going into a faster, rarer medium they widen.",
      definition:
        "- A wavefront joins points in the same phase; it is PERPENDICULAR to the direction of propagation.\n" +
        "- Wave theory: colour is set by wavelength; light is SLOWER in a denser medium; it explains reflection and refraction. Different 'corpuscle sizes' for colours belong to Newton's corpuscular theory.\n" +
        "- Denser to rarer medium: speed and wavelength rise, the wavefront widens.\n" +
        "- In a medium \\(\\lambda_m = \\dfrac{\\lambda}{\\mu}\\), so the number of waves in thickness \\(t\\) is \\(\\dfrac{\\mu t}{\\lambda}\\).",
      formula: {
        label: "Wavelength in a medium",
        latex: "\\lambda_{\\text{medium}} = \\frac{\\lambda_{\\text{vacuum}}}{\\mu}, \\qquad N = \\frac{\\mu t}{\\lambda}",
      },
      authoredExample: {
        prompt: "Light fits the same number of waves into 4 cm of glass (\\(\\mu = 1.5\\)) as into a height h of water (\\(\\mu = 1.33\\)). Find h.",
        steps: ["Equal \\(\\mu t\\): \\(1.5 \\times 4 = 1.33\\,h\\).", "\\(h \\approx 4.5\\) cm."],
        answer: "≈ 4.5 cm",
      },
      selfCheckExample: {
        prompt: "In which direction does a wavefront lie relative to the ray?",
        steps: ["Rays are the normals to the wavefront."],
        answer: "Perpendicular",
      },
      practiceSet: [
        { prompt: "According to the wave theory, is light faster in a denser or a rarer medium?", answer: "Rarer" },
        { prompt: "A wavefront passes from a denser to a rarer medium. Its width?", answer: "Increases" },
      ],
      pyqExampleId: "9d49a841-0bb5-434e-9d02-69601f23057b",
      traps: [
        {
          title: "Crediting Huygens with corpuscles",
          body:
            "'Different colours are due to different sizes of the corpuscles' is Newton's picture, and the statement a 'NOT correct for Huygens' question wants.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-coherence",
      name: "Coherent Sources",
      intuition:
        "Interference needs a phase difference that stays fixed, point by point, for the whole time you look. Two waves of different frequency slip past each other in phase millions of times a second, so no steady pattern forms.",
      definition:
        "- Coherent: same frequency (wavelength) and a constant phase difference — in practice, two images of ONE source (double slit, biprism).\n" +
        "- Two independent lamps, or one slit behind a red filter and the other behind a blue one, give no interference fringes.",
      formula: {
        label: "Condition for a steady pattern",
        latex: "\\nu_1 = \\nu_2, \\quad \\phi_1 - \\phi_2 = \\text{constant}",
      },
      authoredExample: {
        prompt: "Two sodium lamps light the two slits of a Young's experiment. Are fringes seen?",
        steps: ["Independent sources: their relative phase changes randomly."],
        answer: "No",
      },
      selfCheckExample: {
        prompt: "White light; one slit covered by a red filter, the other by a blue one. What is seen?",
        steps: ["Different frequencies cannot keep a fixed phase difference."],
        answer: "No interference fringes",
      },
      practiceSet: [
        { prompt: "How does a biprism make two coherent sources?", answer: "It forms two virtual images of one slit" },
      ],
      pyqExampleId: "28e39d5a-7f9a-40b4-8d27-796eb275aa42",
      traps: [
        {
          title: "Expecting red and blue fringes side by side",
          body:
            "Each filter passes a different frequency, so there is no pattern at all — not separate red and blue fringe systems, which the options offer.",
        },
      ],
    },
  ],
  related: [
    { label: "Young's Double Slit — fringe width and positions", href: "/notes/mht-cet-physics/wave-optics/cetp-ydse-fringes" },
    { label: "Interference Intensity", href: "/notes/mht-cet-physics/wave-optics/cetp-interference-intensity" },
  ],
};

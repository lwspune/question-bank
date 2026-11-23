import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_SW_SUPERPOSITION_NOTE: SubtopicNote = {
  subtopicName: "Superposition of Waves",
  title: "Superposition and the Amplitude of the Resultant Wave",
  oneLineDefinition:
    "When two waves meet, their displacements add: the resultant amplitude of two waves of the same frequency, when it is largest and smallest, and how the path difference from two sources sets the phase difference.",
  whyItMatters:
    "4 questions, all from the textbook and none from a board paper: the amplitude of the resultant of two waves with a phase difference, the largest and smallest intensity of two interfering waves, the phase difference at a point from two sources, and the points of maximum sound between two sources out of phase. The resultant amplitude is also the first step in stationary waves and beats, which the board asks every year.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpsw-resultant-amplitude",
      name: "Resultant amplitude of two waves",
      intuition:
        "Where two waves overlap, each particle is pushed by both at once, so its displacement is simply the sum of the two displacements. If the waves have the same frequency, the sum is again a simple harmonic wave of that frequency. How big it is depends on how far out of step the two waves are: in step they help each other fully, half a cycle out of step they cancel as far as they can.",
      definition:
        "- **Principle of superposition:** when two or more waves arrive at a point at the same time, the resultant displacement is the algebraic sum of the displacements due to each wave.\n" +
        "- The derivation (textbook Ex. Q.6) takes the three steps below.\n" +
        "- Take \\(y_1 = A_1\\sin\\omega t\\) and \\(y_2 = A_2\\sin(\\omega t + \\varphi)\\), so \\(y = y_1 + y_2 = (A_1 + A_2\\cos\\varphi)\\sin\\omega t + (A_2\\sin\\varphi)\\cos\\omega t\\).\n" +
        "- Put \\(A_1 + A_2\\cos\\varphi = A\\cos\\theta\\) and \\(A_2\\sin\\varphi = A\\sin\\theta\\). Then \\(y = A\\sin(\\omega t + \\theta)\\), a wave of the same frequency.\n" +
        "- Squaring and adding: \\(A^2 = A_1^2 + A_2^2 + 2A_1A_2\\cos\\varphi\\).\n" +
        "- Intensity is proportional to the square of the amplitude, \\(I \\propto A^2\\).\n" +
        "- **Maximum (constructive):** \\(\\varphi = 0, 2\\pi, 4\\pi, \\dots\\), \\(A = A_1 + A_2\\). **Minimum (destructive):** \\(\\varphi = \\pi, 3\\pi, \\dots\\), \\(A = |A_1 - A_2|\\).",
      formula: {
        label: "Resultant amplitude",
        latex: "A = \\sqrt{A_1^2 + A_2^2 + 2A_1A_2\\cos\\varphi}, \\qquad I \\propto A^2",
      },
      authoredExample: {
        prompt:
          "Two waves of the same frequency, of amplitudes 3 cm and 4 cm, meet at a point with a phase difference of \\(\\dfrac{\\pi}{2}\\). Find the resultant amplitude there. Also find the ratio of the largest to the smallest intensity these two waves can give.",
        steps: [
          "Given: \\(A_1 = 3\\) cm, \\(A_2 = 4\\) cm, \\(\\varphi = \\dfrac{\\pi}{2}\\), so \\(\\cos\\varphi = 0\\).",
          "Formula: \\(A = \\sqrt{A_1^2 + A_2^2 + 2A_1A_2\\cos\\varphi} = \\sqrt{9 + 16 + 0} = 5\\) cm.",
          "Largest amplitude \\(A_1 + A_2 = 7\\) cm; smallest \\(A_2 - A_1 = 1\\) cm.",
          "\\(\\dfrac{I_{max}}{I_{min}} = \\dfrac{7^2}{1^2} = 49\\).",
        ],
        answer: "Resultant amplitude 5 cm; intensity ratio 49 : 1",
      },
      selfCheckExample: {
        prompt: "Two waves, each of amplitude a, meet in phase. How many times the intensity of one wave alone is the resultant intensity?",
        steps: ["In phase, the resultant amplitude is \\(a + a = 2a\\).", "\\(I \\propto A^2\\), so the intensity is \\((2a)^2 / a^2 = 4\\) times."],
        answer: "4 times",
      },
      practiceSet: [
        { prompt: "Two waves of amplitudes 5 mm and 3 mm meet. Find the largest and the smallest possible resultant amplitudes.", answer: "8 mm and 2 mm" },
        { prompt: "Two waves of equal amplitude a meet with a phase difference of \\(\\dfrac{2\\pi}{3}\\). Find the resultant amplitude.", answer: "a, since \\(a^2 + a^2 + 2a^2\\cos 120^\\circ = a^2\\)" },
        { prompt: "State the principle of superposition of waves.", answer: "When waves arrive at a point together, the resultant displacement is the algebraic sum of the displacements due to each wave" },
      ],
      pyqExampleId: "1f15b566-0061-4bc7-932a-42cf96944772",
      traps: [
        {
          title: "Adding amplitudes that are out of step",
          body: "\\(A = A_1 + A_2\\) holds only when the waves are in phase. For any other phase difference use the full formula with \\(\\cos\\varphi\\).",
        },
        {
          title: "Taking intensity proportional to amplitude",
          body: "Intensity goes as the square of the amplitude. Doubling the amplitude makes the intensity four times, not two.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsw-path-phase",
      name: "Path difference, phase difference and loud or soft points",
      intuition:
        "Two sources sending out waves in step reach a point after travelling different distances. Each extra wavelength of path puts the two waves one full cycle apart, which changes nothing; an extra half wavelength puts them in opposite phase, and they cancel. So the path difference, measured in wavelengths, decides whether a point is loud or soft.",
      definition:
        "- For two sources in phase, a path difference \\(\\Delta\\) gives a phase difference \\(\\Delta\\phi = \\dfrac{2\\pi}{\\lambda}\\Delta\\).\n" +
        "- **Maximum intensity:** \\(\\Delta = 0, \\lambda, 2\\lambda, \\dots\\) (phase difference \\(0, 2\\pi, 4\\pi, \\dots\\)).\n" +
        "- **Minimum intensity:** \\(\\Delta = \\dfrac{\\lambda}{2}, \\dfrac{3\\lambda}{2}, \\dots\\) (phase difference \\(\\pi, 3\\pi, \\dots\\)).\n" +
        "- If the sources are \\(\\pi\\) out of phase, add that \\(\\pi\\) to the phase from the path: the loud and soft points swap places.\n" +
        "- For a point between two sources, at distance x from the midpoint, the path difference is \\(2x\\).",
      formula: {
        label: "Phase from path",
        latex: "\\Delta\\phi = \\frac{2\\pi}{\\lambda}\\,\\Delta",
      },
      authoredExample: {
        prompt:
          "Two sources in phase are 3 m apart and send out sound of wavelength 1 m. Find the points between them where the sound is loudest.",
        steps: [
          "Given: separation 3 m, \\(\\lambda = 1\\) m, sources in phase. Take the midpoint as origin, so the sources are at \\(-1.5\\) m and \\(+1.5\\) m.",
          "For a point at x between them, the path difference is \\((1.5 + x) - (1.5 - x) = 2x\\).",
          "Loudest where \\(2x = 0, \\pm 1, \\pm 2\\) m, so \\(x = 0, \\pm 0.5, \\pm 1\\) m.",
          "\\(2x = \\pm 3\\) m would put the point at a source, so it is not between them.",
        ],
        answer: "At the midpoint and at 0.5 m and 1 m on either side of it (five points)",
      },
      selfCheckExample: {
        prompt: "Two sources in phase send out waves of wavelength 0.4 m. Is a point with a path difference of 1.2 m a point of maximum or of minimum intensity?",
        steps: ["\\(\\dfrac{1.2}{0.4} = 3\\), a whole number of wavelengths.", "So the waves arrive in phase there."],
        answer: "Maximum intensity",
      },
      practiceSet: [
        { prompt: "For two sources in phase, write the path difference at a point of minimum intensity.", answer: "An odd multiple of \\(\\dfrac{\\lambda}{2}\\)" },
        { prompt: "For two sources in phase, write the phase difference at a point of maximum intensity.", answer: "\\(0, 2\\pi, 4\\pi, \\dots\\) (an even multiple of \\(\\pi\\))" },
        { prompt: "Two sources of equal amplitude are \\(\\pi\\) out of phase. What is the intensity at a point equally far from both?", answer: "Zero: the waves arrive in opposite phase and cancel" },
      ],
      pyqExampleId: "1128a103-539b-4a44-9fe6-a651f0a8589b",
      traps: [
        {
          title: "Forgetting the sources' own phase difference",
          body: "The path rule (loud at whole wavelengths) is for sources in phase. If the sources are \\(\\pi\\) out of phase, the midpoint becomes a soft point and loud points sit at odd multiples of \\(\\dfrac{\\lambda}{2}\\).",
        },
        {
          title: "Phase difference left without a unit",
          body: "A phase difference is an angle: write it in radians (or degrees) and show the step \\(\\dfrac{2\\pi}{\\lambda}\\Delta\\), or the answer loses its mark.",
        },
      ],
    },
  ],
};

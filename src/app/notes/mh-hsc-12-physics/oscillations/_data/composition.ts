import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_OS_COMPOSITION_NOTE: SubtopicNote = {
  subtopicName: "Composition of Two S.H.M.s",
  title: "Composition of Two S.H.M.s",
  oneLineDefinition:
    "Adding two parallel S.H.M.s of the same period: the amplitude and initial phase of the resultant motion, and the special cases of in phase, opposite phase and a quarter cycle apart.",
  whyItMatters:
    "3 questions, one of them from a board paper: the resultant amplitude of two parallel S.H.M.s of amplitude 2 with a phase difference of π/3 (2026). The textbook adds finding the amplitude and epoch of a resultant, and proving that a sin ωt + b cos ωt is an S.H.M.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpos-resultant",
      name: "Resultant amplitude and initial phase",
      intuition:
        "Two S.H.M.s along the same line with the same period add up to one S.H.M. of that same period. Think of each as a rotating arrow on its own reference circle: the two arrows turn together, so their sum is one arrow of fixed length. That length is the resultant amplitude, and its angle is the resultant initial phase.",
      definition:
        "- Let \\(x_1 = A_1\\sin(\\omega t + \\alpha_1)\\) and \\(x_2 = A_2\\sin(\\omega t + \\alpha_2)\\), along the same line with the same \\(\\omega\\).\n" +
        "- \\(x = x_1 + x_2\\). Expanding the sines and collecting terms: \\(x = \\sin\\omega t\\,(A_1\\cos\\alpha_1 + A_2\\cos\\alpha_2) + \\cos\\omega t\\,(A_1\\sin\\alpha_1 + A_2\\sin\\alpha_2)\\).\n" +
        "- Put \\(A_1\\cos\\alpha_1 + A_2\\cos\\alpha_2 = R\\cos\\delta\\) and \\(A_1\\sin\\alpha_1 + A_2\\sin\\alpha_2 = R\\sin\\delta\\). Then \\(x = R\\sin(\\omega t + \\delta)\\), an S.H.M. of the same period.\n" +
        "- Squaring and adding: \\(R = \\sqrt{A_1^{2} + A_2^{2} + 2A_1A_2\\cos(\\alpha_1 - \\alpha_2)}\\).\n" +
        "- Dividing: \\(\\tan\\delta = \\dfrac{A_1\\sin\\alpha_1 + A_2\\sin\\alpha_2}{A_1\\cos\\alpha_1 + A_2\\cos\\alpha_2}\\).",
      formula: {
        label: "Resultant of two parallel S.H.M.s",
        latex:
          "R = \\sqrt{A_1^{2} + A_2^{2} + 2A_1A_2\\cos(\\alpha_1 - \\alpha_2)}, \\qquad \\tan\\delta = \\frac{A_1\\sin\\alpha_1 + A_2\\sin\\alpha_2}{A_1\\cos\\alpha_1 + A_2\\cos\\alpha_2}",
      },
      authoredExample: {
        prompt:
          "Two parallel S.H.M.s, \\(x_1 = 6\\sin\\omega t\\) cm and \\(x_2 = 8\\sin(\\omega t + \\pi/3)\\) cm, act on a particle. Find the amplitude and the initial phase of the resultant S.H.M.",
        steps: [
          "Given: \\(A_1 = 6\\) cm, \\(\\alpha_1 = 0\\); \\(A_2 = 8\\) cm, \\(\\alpha_2 = \\pi/3 = 60^{\\circ}\\).",
          "\\(R = \\sqrt{36 + 64 + 2 \\times 6 \\times 8 \\times \\cos 60^{\\circ}} = \\sqrt{100 + 48} = \\sqrt{148} = 12.17\\) cm.",
          "\\(\\tan\\delta = \\dfrac{6\\sin 0^{\\circ} + 8\\sin 60^{\\circ}}{6\\cos 0^{\\circ} + 8\\cos 60^{\\circ}} = \\dfrac{6.928}{6 + 4} = 0.6928\\).",
          "\\(\\delta = 34.7^{\\circ}\\), about \\(34^{\\circ}43'\\).",
        ],
        answer: "Amplitude 12.17 cm; initial phase about 34.7°",
      },
      selfCheckExample: {
        prompt:
          "Two parallel S.H.M.s of the same period, \\(x_1 = 2\\sin\\omega t\\) and \\(x_2 = 2\\sin(\\omega t + \\pi/2)\\), are given to a particle. Find the initial phase of the resultant.",
        steps: ["\\(\\tan\\delta = \\dfrac{0 + 2\\sin 90^{\\circ}}{2 + 2\\cos 90^{\\circ}} = \\dfrac{2}{2} = 1\\).", "\\(\\delta = 45^{\\circ} = \\pi/4\\) rad."],
        answer: "\\(\\pi/4\\) rad",
      },
      practiceSet: [
        { prompt: "Is the resultant of two parallel S.H.M.s of the same period an S.H.M.? What is its period?", answer: "Yes; it has the same period" },
        { prompt: "Which angle appears inside the cosine in the formula for the resultant amplitude?", answer: "The phase difference \\(\\alpha_1 - \\alpha_2\\)" },
        { prompt: "When is the resultant amplitude of two parallel S.H.M.s greatest?", answer: "When they are in phase; then \\(R = A_1 + A_2\\)" },
      ],
      pyqExampleId: "edc1c6bd-4d39-4a44-ac38-b4a331de4b23",
      traps: [
        {
          title: "Stopping at R squared",
          body: "The formula puts \\(R^{2}\\) under the square root. Take the root before writing the answer.",
        },
        {
          title: "Using the sum of the phases",
          body: "The cosine takes the phase difference \\(\\alpha_1 - \\alpha_2\\), not the sum of the two phases.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpos-special-cases",
      name: "Special cases of composition",
      intuition:
        "In phase, the two motions help each other fully and the amplitudes add. In opposite phase, they work against each other and the amplitudes subtract. A quarter cycle apart, the two arrows on the reference circle are at right angles, so the amplitudes add like the sides of a right triangle.",
      definition:
        "- **In phase** (\\(\\alpha_1 - \\alpha_2 = 0\\)): \\(R = A_1 + A_2\\), the largest possible.\n" +
        "- **Opposite phase** (\\(\\alpha_1 - \\alpha_2 = \\pi\\)): \\(R = |A_1 - A_2|\\), the smallest. Equal amplitudes cancel completely.\n" +
        "- With a phase difference of \\(\\pi/2\\): \\(R = \\sqrt{A_1^{2} + A_2^{2}}\\).\n" +
        "- So \\(x = a\\sin\\omega t + b\\cos\\omega t\\) is an S.H.M. Put \\(a = A\\cos\\phi\\) and \\(b = A\\sin\\phi\\): then \\(x = A\\sin(\\omega t + \\phi)\\), with \\(A = \\sqrt{a^{2} + b^{2}}\\) and \\(\\tan\\phi = b/a\\).",
      formula: {
        label: "Special cases",
        latex: "R_{\\text{in phase}} = A_1 + A_2, \\quad R_{\\text{opposite}} = |A_1 - A_2|, \\quad R_{\\pi/2} = \\sqrt{A_1^{2} + A_2^{2}}",
      },
      authoredExample: {
        prompt:
          "Two parallel S.H.M.s of the same period with amplitudes 5 cm and 3 cm act on a particle. Find the resultant amplitude when they are (a) in phase, (b) in opposite phase, (c) a quarter of a period apart.",
        steps: [
          "(a) In phase: \\(R = 5 + 3 = 8\\) cm.",
          "(b) Opposite phase: \\(R = |5 - 3| = 2\\) cm.",
          "(c) A quarter period apart means a phase difference of \\(\\pi/2\\): \\(R = \\sqrt{25 + 9} = \\sqrt{34} = 5.83\\) cm.",
        ],
        answer: "(a) 8 cm (b) 2 cm (c) 5.83 cm",
      },
      selfCheckExample: {
        prompt:
          "The resultant amplitude of two parallel S.H.M.s of amplitudes 3 cm and 4 cm (same period) is 5 cm. Find the phase difference between them.",
        steps: [
          "\\(25 = 9 + 16 + 2 \\times 3 \\times 4\\cos\\delta\\), so \\(24\\cos\\delta = 0\\).",
          "\\(\\cos\\delta = 0\\), so \\(\\delta = \\pi/2\\).",
        ],
        answer: "\\(\\pi/2\\) rad",
      },
      practiceSet: [
        { prompt: "What phase difference between two parallel S.H.M.s gives the greatest resultant amplitude?", answer: "Zero, when they are in phase" },
        { prompt: "Two equal S.H.M.s of the same period are superposed in opposite phase. What is the resultant amplitude?", answer: "Zero" },
        { prompt: "Two parallel S.H.M.s of amplitudes 9 cm and 4 cm have the same period. What are the largest and smallest possible resultant amplitudes?", answer: "13 cm and 5 cm" },
      ],
      pyqExampleId: "d45b5b6b-5f4f-4d13-8d7f-db903f4e39c3",
      traps: [
        {
          title: "Motions with different periods",
          body: "These results hold only for two S.H.M.s along the same line with the same period. With different periods the sum is not a simple S.H.M.",
        },
        {
          title: "A negative amplitude",
          body: "In opposite phase \\(R = |A_1 - A_2|\\). An amplitude is never negative, so take the larger minus the smaller.",
        },
      ],
    },
  ],
};

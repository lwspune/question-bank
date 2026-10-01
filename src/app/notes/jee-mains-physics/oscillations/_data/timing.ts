import type { SubtopicNote } from "@/app/notes/_types";

export const TIMING_OSC_NOTE: SubtopicNote = {
  subtopicName: "Timing in SHM and Combining SHMs",
  title: "Timing in SHM and Combining SHMs",
  oneLineDefinition:
    "The time between two positions is the phase covered divided by ω; two SHMs of the same frequency on one line add like vectors into one SHM.",
  whyItMatters:
    "Seventeen PYQs, eight of them asking for a number, and three from 2026. Ten ask for the time to go between two positions, or work back from such a time to the period. Seven add two SHMs or ask whether a given function is simple harmonic at all.",
  concepts: [
    // C1 — time between two positions
    {
      kind: "formula" as const,
      slug: "jposc-timing",
      name: "Time taken to move between two positions in SHM",
      intuition:
        "The phase grows at a steady rate ω, but the particle does not move at a steady speed. So time is found from the phase, never from the distance. Write the motion with a sine if it starts at the mean position and with a cosine if it starts at an extreme; then read the phase at each position.",
      definition:
        "- From the mean: \\(x = A\\sin\\omega t\\). From an extreme: \\(x = A\\cos\\omega t\\).\n" +
        "- Time \\(= \\dfrac{\\text{phase covered}}{\\omega} = \\dfrac{\\text{phase covered}}{2\\pi}\\,T\\).\n" +
        "- Mean to \\(A/2\\): \\(T/12\\). \\(A/2\\) to \\(A\\): \\(T/6\\). Mean to \\(A/\\sqrt{2}\\): \\(T/8\\). \\(A\\) to \\(A/\\sqrt{2}\\): \\(T/8\\). \\(A\\) to \\(\\sqrt{3}A/2\\): \\(T/12\\). Mean to extreme: \\(T/4\\).\n" +
        "- **Distance**: \\(4A\\) in each full period and \\(2A\\) in each half period. A quarter period adds exactly A only when it starts at the mean or at an extreme.\n" +
        "- **Energy instants** (from the mean, \\(U \\propto \\sin^{2}\\omega t\\)): K = U first at \\(T/8\\); U is largest at \\(T/4\\); the slope \\(dU/dt \\propto \\sin 2\\omega t\\) is largest first at \\(T/8\\).",
      formula: {
        label: "Time from the phase covered",
        latex: "t = \\frac{\\Delta\\theta}{\\omega} = \\frac{\\Delta\\theta}{2\\pi}\\,T",
      },
      authoredExample: {
        prompt:
          "A particle does SHM with period 12 s and amplitude 4 cm. Find (a) the time to go from \\(x = A\\) to \\(x = A/2\\), (b) the time to go from the mean position to \\(x = A/\\sqrt{2}\\), and (c) the distance it covers in 15 s starting from the mean position.",
        steps: [
          "(a) From the extreme, \\(x = A\\cos\\omega t\\): \\(\\cos\\omega t = \\dfrac{1}{2}\\) gives \\(\\omega t = \\dfrac{\\pi}{3}\\), so \\(t = \\dfrac{T}{6} = 2\\) s.",
          "(b) From the mean, \\(x = A\\sin\\omega t\\): \\(\\sin\\omega t = \\dfrac{1}{\\sqrt{2}}\\) gives \\(\\omega t = \\dfrac{\\pi}{4}\\), so \\(t = \\dfrac{T}{8} = 1.5\\) s.",
          "(c) \\(15 = 12 + 3 = T + \\dfrac{T}{4}\\). One period covers \\(4A = 16\\) cm; the quarter period from the mean covers \\(A = 4\\) cm.",
        ],
        answer: "(a) 2 s; (b) 1.5 s; (c) 20 cm.",
      },
      selfCheckExample: {
        prompt:
          "Starting from the mean position, a particle in SHM reaches half its amplitude after 1.5 s. Find its period, and the time it then takes to reach the extreme.",
        steps: [
          "Mean to \\(A/2\\) is a phase of \\(\\pi/6\\), which takes \\(T/12\\). So \\(T = 12 \\times 1.5 = 18\\) s.",
          "\\(A/2\\) to \\(A\\) is a phase of \\(\\pi/2 - \\pi/6 = \\pi/3\\), which takes \\(T/6 = 3\\) s.",
        ],
        answer: "\\(T = 18\\) s; a further 3 s.",
      },
      practiceSet: [
        { prompt: "Period 8 s. How long from the mean position to \\(x = A/\\sqrt{2}\\)?", answer: "\\(1\\) s" },
        { prompt: "Period 4 s, amplitude 3 cm. Distance covered in 9 s, starting from an extreme?", answer: "\\(27\\) cm" },
        { prompt: "\\(x = A\\sin\\omega t\\), period T. When are the kinetic and potential energies first equal?", answer: "\\(t = T/8\\)" },
        { prompt: "Period 24 s. How long from \\(x = A\\) to \\(x = \\sqrt{3}A/2\\)?", answer: "\\(2\\) s" },
      ],
      pyqExampleId: "d3e6c1bd-3fd9-4d5d-bfb1-6365b523a8b4", // 2026: time from x = A to x = A/√2 with T = 5 s
      traps: [
        {
          title: "Starting at an extreme needs the cosine",
          body: "From x = A to x = A/2 is a phase of π/3 in x = A cos ωt, so it takes T/6. Reading it with x = A sin ωt gives T/12, which is the time from the mean to A/2, a different journey.",
        },
        {
          title: "Equal distances do not take equal times",
          body: "Mean to A/2 takes T/12, but A/2 to A takes T/6, twice as long, because the particle slows down near the extreme.",
        },
        {
          title: "A quarter period covers A only from the mean or an extreme",
          body: "Starting anywhere else, the distance in T/4 is not A. In a half period the distance is always 2A, wherever the motion starts.",
        },
      ],
    },

    // C2 — superposition and the SHM test
    {
      kind: "formula" as const,
      slug: "jposc-superposition",
      name: "Adding two SHMs of the same frequency, and telling SHM from periodic motion",
      intuition:
        "Two SHMs along one line with the same ω add like two vectors (phasors) at an angle equal to their phase difference. The result is one SHM with the same ω. A motion is SHM only if it can be written as one sine of ωt, perhaps shifted by a constant; a sum of different frequencies may repeat, but it is not SHM.",
      definition:
        "- Same ω, phase difference \\(\\Delta\\phi\\): \\(A = \\sqrt{A_1^{2} + A_2^{2} + 2A_1A_2\\cos\\Delta\\phi}\\).\n" +
        "- In phase: \\(A_1 + A_2\\). Opposite in phase: \\(|A_1 - A_2|\\). At \\(\\pi/2\\): \\(\\sqrt{A_1^{2} + A_2^{2}}\\).\n" +
        "- \\(a\\sin\\omega t + b\\cos\\omega t = \\sqrt{a^{2} + b^{2}}\\,\\sin(\\omega t + \\phi)\\) with \\(\\tan\\phi = b/a\\).\n" +
        "- \\(\\sin^{2}\\omega t = \\dfrac{1}{2} - \\dfrac{1}{2}\\cos 2\\omega t\\): SHM about \\(x = \\dfrac{1}{2}\\) with period \\(\\pi/\\omega\\).\n" +
        "- \\(\\sin^{3}\\omega t = \\dfrac{3\\sin\\omega t - \\sin 3\\omega t}{4}\\): periodic, not SHM.\n" +
        "- \\(\\cos\\omega t + \\cos 2\\omega t\\): periodic with period \\(2\\pi/\\omega\\), not SHM.\n" +
        "- \\(\\sin\\omega t + \\cos\\pi\\omega t\\): the two periods are in the ratio π, which is irrational, so the motion never repeats.",
      formula: {
        label: "Resultant of two SHMs of the same frequency",
        latex: "A = \\sqrt{A_1^{2} + A_2^{2} + 2A_1A_2\\cos\\Delta\\phi} \\qquad a\\sin\\omega t + b\\cos\\omega t = \\sqrt{a^{2} + b^{2}}\\,\\sin\\left(\\omega t + \\tan^{-1}\\frac{b}{a}\\right)",
      },
      authoredExample: {
        prompt:
          "A particle is subjected to \\(x_1 = 6\\sin 4t\\) cm and \\(x_2 = 6\\sin\\left(4t + \\dfrac{2\\pi}{3}\\right)\\) cm at the same time. Find the amplitude of the resulting motion and its maximum acceleration.",
        steps: [
          "Same \\(\\omega = 4\\) rad/s, so the result is SHM at 4 rad/s.",
          "\\(A^{2} = 36 + 36 + 2 \\times 6 \\times 6 \\times \\cos\\dfrac{2\\pi}{3} = 72 - 36 = 36\\), so \\(A = 6\\) cm.",
          "\\(a_{max} = \\omega^{2}A = 16 \\times 6 = 96\\) cm/s².",
        ],
        answer: "Amplitude 6 cm; maximum acceleration 96 cm/s².",
      },
      selfCheckExample: {
        prompt:
          "Find the amplitude, the initial phase and the period of \\(x = 3\\sin 2\\pi t + 4\\cos 2\\pi t\\) (x in cm, t in s).",
        steps: [
          "Amplitude \\(\\sqrt{3^{2} + 4^{2}} = 5\\) cm.",
          "Initial phase \\(\\tan^{-1}(4/3) \\approx 53^{\\circ}\\).",
          "\\(\\omega = 2\\pi\\) rad/s, so \\(T = 1\\) s.",
        ],
        answer: "5 cm; about \\(53^{\\circ}\\); 1 s.",
      },
      practiceSet: [
        { prompt: "What is the amplitude of \\(y = \\sin\\omega t + \\sqrt{3}\\cos\\omega t\\)?", answer: "\\(2\\)" },
        { prompt: "Two SHMs of the same frequency, amplitudes 4 cm and 3 cm, differ in phase by \\(\\pi/2\\). Resultant amplitude?", answer: "\\(5\\) cm" },
        { prompt: "Is \\(x = \\cos^{2}\\omega t\\) simple harmonic? If so, what is its period?", answer: "Yes, about \\(x = 1/2\\), with period \\(\\pi/\\omega\\)" },
        { prompt: "Is \\(x = \\sin\\omega t + \\sin 2\\omega t\\) simple harmonic?", answer: "No; it is periodic with period \\(2\\pi/\\omega\\) but not SHM" },
      ],
      pyqExampleId: "34195935-0cbf-4f77-98e4-7aea232079e2", // 2025: √7 sin 5t and 2√7 sin(5t + π/3), maximum acceleration
      traps: [
        {
          title: "Amplitudes add as vectors, not as numbers",
          body: "Amplitudes 3 and 4 at a phase difference of π/2 give 5, not 7. Only SHMs exactly in phase give A₁ + A₂.",
        },
        {
          title: "A constant shift does not spoil SHM",
          body: "sin²ωt equals 1/2 − (1/2)cos 2ωt. That is SHM about x = 1/2, with angular frequency 2ω and period π/ω, half the period of sin ωt.",
        },
        {
          title: "Two different frequencies never make SHM",
          body: "cos ωt + cos 2ωt repeats every 2π/ω but is not SHM. If the two periods have an irrational ratio, as in sin ωt + cos πωt, the motion does not repeat at all.",
        },
      ],
    },
  ],
};

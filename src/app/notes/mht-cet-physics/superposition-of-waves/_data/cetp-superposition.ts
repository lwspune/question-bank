import type { SubtopicNote } from "@/app/notes/_types";

export const SUPERPOSITION_NOTE: SubtopicNote = {
  subtopicName: "Superposition, Phase/Path Difference, and Interference",
  title: "Superposition of Two Waves",
  oneLineDefinition:
    "Two waves of the same frequency add into one of the same frequency whose amplitude depends on their phase difference: R² = a₁² + a₂² + 2a₁a₂cos φ — largest when in step, smallest when opposite.",
  whyItMatters:
    "8 PYQs, one HARD. Two shapes: the resultant amplitude for a given phase difference (or the phase difference for a given amplitude), " +
    "and the resultant intensity, with the extra care needed when one wave is written as a sine and the other as a cosine.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-resultant-amplitude",
      name: "The Resultant Amplitude",
      intuition:
        "Draw each wave's amplitude as an arrow at its phase angle and add the arrows. In phase they add straight up; opposite they subtract; at 90° they form a right triangle; at 120°, two equal arrows make a third of the same length.",
      definition:
        "- \\(R^2 = a_1^2 + a_2^2 + 2a_1a_2\\cos\\phi\\).\n" +
        "- \\(\\phi = 0\\): \\(a_1 + a_2\\); \\(\\phi = \\pi\\): \\(|a_1 - a_2|\\); \\(\\phi = \\dfrac{\\pi}{2}\\): \\(\\sqrt{a_1^2 + a_2^2}\\).\n" +
        "- Equal amplitudes \\(a\\): \\(R = 2a\\cos\\dfrac{\\phi}{2}\\); \\(R = a\\) when \\(\\phi = 120^\\circ\\), i.e. \\(\\cos\\phi = -\\dfrac{1}{2}\\).\n" +
        "- \\(b_1\\sin\\omega t \\pm b_2\\cos\\omega t\\) is a \\(90^\\circ\\) pair: \\(R = \\sqrt{b_1^2 + b_2^2}\\) either sign.",
      formula: {
        label: "Resultant amplitude",
        latex: "R^2 = a_1^2 + a_2^2 + 2a_1a_2\\cos\\phi",
      },
      authoredExample: {
        prompt: "Waves of amplitude 3 and 4 units superpose. Resultant amplitude in phase, at \\(90^\\circ\\), and in opposition?",
        steps: ["\\(3 + 4 = 7\\); \\(\\sqrt{9 + 16} = 5\\); \\(4 - 3 = 1\\)."],
        answer: "7, 5, 1",
      },
      selfCheckExample: {
        prompt: "Two waves of equal amplitude a give a resultant of amplitude a. Phase difference?",
        steps: ["\\(a^2 = 2a^2(1 + \\cos\\phi)\\) ⇒ \\(\\cos\\phi = -\\dfrac{1}{2}\\)."],
        answer: "\\(120^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Equal amplitudes A at phase difference \\(\\dfrac{\\pi}{2}\\). Resultant?", answer: "\\(\\sqrt{2}A\\)" },
        { prompt: "Path difference \\(\\dfrac{\\lambda}{3}\\), equal amplitudes A. Resultant?", answer: "A" },
      ],
      pyqExampleId: "226eee37-734d-4670-83be-537ca08fc183",
      traps: [
        {
          title: "Adding amplitudes at 90°",
          body:
            "Two waves a quarter-cycle apart do not give 2A; they give \\(\\sqrt{2}A\\). Only waves in step add their amplitudes directly.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-resultant-intensity",
      name: "Resultant Intensity and Mixed Sine–Cosine Waves",
      intuition:
        "Intensity goes as amplitude squared, so the intensity rule is the amplitude rule with the square roots of the intensities. For equal sources it becomes 4I₀cos²(φ/2). Before using any of it, write both waves as sines — a cosine is a sine a quarter-cycle ahead.",
      definition:
        "- \\(I = I_1 + I_2 + 2\\sqrt{I_1I_2}\\cos\\phi\\); equal sources: \\(I \\propto \\cos^2\\dfrac{\\phi}{2}\\).\n" +
        "- Sources I and 4I at \\(\\phi = \\pi\\): \\(I + 4I - 4I = I\\).\n" +
        "- \\(a\\cos(\\theta + \\phi) = a\\sin\\left(\\theta + \\phi + \\dfrac{\\pi}{2}\\right)\\): phase difference \\(\\phi + \\dfrac{\\pi}{2}\\), path difference \\(\\dfrac{\\lambda}{2\\pi}\\left(\\phi + \\dfrac{\\pi}{2}\\right)\\).",
      formula: {
        label: "Resultant intensity",
        latex: "I = I_1 + I_2 + 2\\sqrt{I_1I_2}\\cos\\phi",
      },
      authoredExample: {
        prompt: "Sources of intensity I and 9I meet with phase difference \\(\\dfrac{\\pi}{3}\\). Resultant intensity?",
        steps: ["\\(I + 9I + 2\\sqrt{9I^2}\\cos 60^\\circ = 10I + 3I\\)."],
        answer: "13I",
      },
      selfCheckExample: {
        prompt: "\\(y_1 = a\\sin\\theta\\) and \\(y_2 = a\\cos\\theta\\). Phase difference?",
        steps: ["The cosine is the sine shifted forward by a quarter-cycle."],
        answer: "\\(\\dfrac{\\pi}{2}\\)",
      },
      practiceSet: [
        { prompt: "Two identical waves with phase difference φ: intensity is proportional to?", answer: "\\(\\cos^2\\dfrac{\\phi}{2}\\)" },
      ],
      pyqExampleId: "ad94a88d-59ce-4b4b-8ed4-6bd7726c5d52",
      traps: [
        {
          title: "Reading φ off a sine–cosine pair",
          body:
            "\\(a_1\\sin(\\omega t - kx)\\) and \\(a_2\\cos(\\omega t - kx + \\phi)\\) differ by \\(\\phi + \\frac{\\pi}{2}\\), not \\(\\phi\\). Convert the cosine first.",
        },
      ],
    },
  ],
  related: [
    { label: "Progressive Waves", href: "/notes/mht-cet-physics/superposition-of-waves/cetp-progressive-waves" },
    { label: "Beats", href: "/notes/mht-cet-physics/superposition-of-waves/cetp-beats" },
  ],
};

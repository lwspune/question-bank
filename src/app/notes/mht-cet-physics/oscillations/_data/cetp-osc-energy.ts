import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/oscillations";

export const ENERGY_NOTE: SubtopicNote = {
  subtopicName: "SHM Energy — Kinetic, Potential, and Total",
  title: "Energy in Simple Harmonic Motion",
  oneLineDefinition:
    "The total energy of SHM, ½mω²A² (= ½kA²), stays fixed while it passes back and forth between potential energy ½kx² and kinetic energy ½k(A² − x²); so the split at any point depends only on x/A, and the total grows as the square of both the amplitude and the frequency.",
  whyItMatters:
    "17 PYQs, 2 HARD. Thirteen are the split between kinetic and potential energy — the ratio at half the amplitude, at T/6 or T/12 after the mean position, where they are equal, where one is 8 times the other, and the potential energy at x + y from its values at x and y (the HARD pair); four are the total energy — of a pendulum at its extreme, when its length is changed, and of two sources of different frequency. " +
    "Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-osc-ke-pe-split",
      name: "Kinetic and Potential Energy at a Point",
      intuition:
        "With the total fixed at ½kA², potential energy is the fraction (x/A)² of it and kinetic energy the rest, 1 − (x/A)². So at x = A/2 the PE is a quarter and KE:PE = 3:1; they are equal at x = A/√2; PE = 8 KE at x = (2√2/3)A. In time from the mean position x = A sin ωt, so PE:KE = tan² ωt — at T/12 (30°) it is 1:3, at T/6 (60°) 3:1. Because PE goes as x², potential energies at x and y combine at x + y as (√E₁ + √E₂)².",
      definition:
        "- \\(U = \\tfrac{1}{2}kx^2\\), \\(K = \\tfrac{1}{2}k(A^2 - x^2)\\), \\(E = \\tfrac{1}{2}kA^2 = \\tfrac{1}{2}m\\omega^2A^2\\).\n" +
        "- \\(\\dfrac{U}{E} = \\left(\\dfrac{x}{A}\\right)^2\\): \\(x = \\tfrac{A}{2}\\) ⇒ K:U = 3:1; \\(x = \\tfrac{A}{\\sqrt{2}}\\) ⇒ equal; \\(x = \\tfrac{\\sqrt{3}}{2}A\\) ⇒ E = 4K.\n" +
        "- In time from the mean: \\(\\dfrac{U}{K} = \\tan^2\\omega t\\); KE 75% of E at \\(\\tfrac{T}{12}\\), 50% at \\(\\tfrac{T}{8}\\).\n" +
        "- **K = 1.25 U** with A = 3 cm ⇒ x = 2 cm.\n" +
        "- **PE at x + y**: \\(\\left(\\sqrt{E_x} + \\sqrt{E_y}\\right)^2 = E_x + E_y + 2\\sqrt{E_xE_y}\\).",
      formula: {
        label: "Energy split",
        latex: "\\frac{U}{E} = \\frac{x^2}{A^2}, \\qquad \\frac{K}{E} = 1 - \\frac{x^2}{A^2}",
      },
      authoredExample: {
        prompt: "At what displacement is the kinetic energy three times the potential energy, amplitude 6 cm?",
        steps: ["U = E/4 ⇒ x² = A²/4.", "x = 3 cm."],
        answer: "3 cm",
      },
      selfCheckExample: {
        prompt: "Amplitude 4 cm. Displacement where the energy is half kinetic and half potential?",
        steps: ["x = A/√2."],
        answer: "2√2 cm",
      },
      practiceSet: [
        { prompt: "From the mean position with period T, ratio PE : KE at t = T/12?", answer: "1 : 3" },
        { prompt: "PE is 8 times KE. x in terms of A?", answer: "2√2A/3" },
        { prompt: "Displacement 40 cos 30° cm with A = 40 cm and KE 200 J. k = 10ˣ N/m; x?", answer: "4" },
      ],
      pyqExampleId: "f807bed2-9495-431b-8db3-f869e118281c",
      traps: [
        {
          title: "Putting the energies equal at half the amplitude",
          body:
            "At A/2 the potential energy is only a quarter of the total. The half-and-half point is A/√2 ≈ 0.71A.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-osc-total-energy",
      name: "Total Energy and What It Depends On",
      intuition:
        "E = ½mω²A² grows with the square of the amplitude AND the square of the frequency. For a pendulum ω² = g/L, so at the same amplitude a quarter-length pendulum holds four times the energy, and its energy at the extreme, all potential, is mgA²/(2L). Two sources of the same energy with frequencies in the ratio 4 : 1 must have amplitudes in the ratio 1 : 4.",
      definition:
        "- \\(E = \\tfrac{1}{2}m\\omega^2A^2 \\propto n^2A^2\\).\n" +
        "- **Pendulum**: \\(E = \\dfrac{mgA^2}{2L}\\); length ÷ 4 at the same amplitude ⇒ E × 4; length ÷ 3 ⇒ × 3.\n" +
        "- **Equal energies, frequencies n and n/4**: amplitudes A and 4A.",
      formula: {
        label: "Total energy",
        latex: "E = \\tfrac{1}{2}m\\omega^2A^2",
      },
      authoredExample: {
        prompt: "A 0.2 kg mass oscillates with amplitude 5 cm at 2 Hz. Total energy (π² = 10)?",
        steps: ["ω = 4π; ω² = 160.", "E = ½ × 0.2 × 160 × 0.0025 = 0.04 J."],
        answer: "0.04 J",
      },
      selfCheckExample: {
        prompt: "Potential energy of a pendulum (length L, mass m) at its extreme, amplitude A?",
        steps: ["ω² = g/L."],
        answer: "mgA²/(2L)",
      },
      practiceSet: [
        { prompt: "Pendulum length made a quarter, same amplitude. Total energy?", answer: "4 times" },
        { prompt: "Two instruments, frequencies n and n/4, equal energies. Amplitude of the second, first is A_P?", answer: "4A_P" },
      ],
      pyqExampleId: "97ff3c85-9e65-481a-8865-4688d60d39e2",
      traps: [
        {
          title: "Forgetting the frequency in the energy",
          body:
            "Same amplitude does not mean same energy. Energy goes as ω²A², so a stiffer or shorter oscillator at the same amplitude carries more.",
        },
      ],
    },
  ],
  related: [
    { label: "Simple Pendulum — tension and speed from energy", href: `${BASE}/cetp-osc-pendulum` },
  ],
};

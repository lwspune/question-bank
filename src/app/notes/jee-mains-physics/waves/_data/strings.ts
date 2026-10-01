import type { SubtopicNote } from "@/app/notes/_types";

export const STRINGS_WAVE_NOTE: SubtopicNote = {
  subtopicName: "Superposition and Standing Waves on Strings",
  title: "Superposition and Standing Waves on Strings",
  oneLineDefinition:
    "Two waves at one point add their displacements; two equal waves running in opposite directions on a string fixed at both ends make a standing wave with frequencies nv/2L.",
  whyItMatters:
    "Fourteen PYQs, thirteen of them asking for a number, and one from 2026. Five find the resultant amplitude of two waves or the phase difference between them, and one counts loud points as a recorder moves between two loudspeakers. Eight are standing waves on a string fixed at both ends: harmonics, a length or a hanging mass for a new frequency, and the amplitude at one point. Almost all are short numerical answers with no options to check against.",
  concepts: [
    // C1 — superposing two waves of the same frequency
    {
      kind: "formula" as const,
      slug: "jpwave-superposition",
      name: "Resultant amplitude of two waves of the same frequency",
      intuition:
        "Two waves of the same frequency add to one wave of that frequency. How big it is depends on the phase difference: in step they add, half a cycle apart they cancel, and in between the amplitudes add like vectors at an angle φ. First write each wave as a single sine with its own phase, then compare the phases.",
      definition:
        "- \\(A^{2} = A_1^{2} + A_2^{2} + 2A_1A_2\\cos\\phi\\).\n" +
        "- In phase (\\(\\phi = 0, 2\\pi, \\dots\\)): \\(A = A_1 + A_2\\). Opposite phase (\\(\\phi = \\pi, 3\\pi, \\dots\\)): \\(A = |A_1 - A_2|\\).\n" +
        "- Equal amplitudes a: \\(A = 2a\\cos\\dfrac{\\phi}{2}\\).\n" +
        "- \\(a\\sin\\omega t + b\\cos\\omega t = \\sqrt{a^{2} + b^{2}}\\,\\sin(\\omega t + \\alpha)\\) with \\(\\tan\\alpha = b/a\\): rewrite such a sum as one sine before comparing phases.\n" +
        "- A shift \\(x_0\\) inside \\(\\sin k(x - vt + x_0)\\) is a phase \\(kx_0\\); a constant c inside \\(\\sin 2\\pi(x - vt + c)\\) is a phase \\(2\\pi c\\).\n" +
        "- Path difference \\(\\Delta\\) from two sources in step: a maximum when \\(\\Delta = n\\lambda\\), a minimum when \\(\\Delta = (n + \\tfrac{1}{2})\\lambda\\). Moving a detector past N maxima means \\(\\Delta\\) changed by \\(N\\lambda\\).",
      formula: {
        label: "Resultant amplitude",
        latex: "A^{2} = A_1^{2} + A_2^{2} + 2A_1A_2\\cos\\phi \\qquad \\phi = \\frac{2\\pi}{\\lambda}\\,\\Delta",
      },
      authoredExample: {
        prompt:
          "Two waves \\(y_1 = 3\\sin\\omega t\\) and \\(y_2 = 4\\cos\\omega t\\) (in cm) meet at a point. Find the resultant amplitude. What would it be if they were in opposite phase instead?",
        steps: [
          "\\(4\\cos\\omega t = 4\\sin\\left(\\omega t + \\dfrac{\\pi}{2}\\right)\\), so \\(\\phi = \\dfrac{\\pi}{2}\\) and \\(\\cos\\phi = 0\\).",
          "\\(A^{2} = 9 + 16 + 0 = 25\\), so \\(A = 5\\ \\text{cm}\\).",
          "In opposite phase \\(\\cos\\phi = -1\\): \\(A = |3 - 4| = 1\\ \\text{cm}\\).",
        ],
        answer: "5 cm; 1 cm in opposite phase",
      },
      selfCheckExample: {
        prompt:
          "Two waves of equal amplitude 5 mm and the same frequency combine to give an amplitude of \\(5\\sqrt{2}\\) mm. Find the phase difference.",
        steps: [
          "With equal amplitudes, \\(A^{2} = 2a^{2}(1 + \\cos\\phi)\\): \\(50 = 50(1 + \\cos\\phi)\\).",
          "So \\(\\cos\\phi = 0\\) and \\(\\phi = 90^{\\circ}\\).",
        ],
        answer: "\\(90^{\\circ}\\)",
      },
      practiceSet: [
        { prompt: "Phase difference between \\(A_1\\sin 2\\pi(x - vt)\\) and \\(A_2\\sin 2\\pi(x - vt + 0.25)\\)?", answer: "\\(\\pi/2\\)" },
        { prompt: "Amplitudes 7 cm and 2 cm. Resultant in phase, and in opposite phase?", answer: "9 cm and 5 cm" },
        { prompt: "Two sources in step; path difference \\(2.5\\lambda\\) at a point. Loud or quiet?", answer: "Quiet (a minimum)" },
        { prompt: "Two waves of amplitude a differ in phase by \\(120^{\\circ}\\). The resultant amplitude?", answer: "a" },
      ],
      pyqExampleId: "89f501f7-d162-40a4-9205-cab77d45585f", // 31 Jan 2023: second wave given as sin + √3 cos; resultant amplitude
      traps: [
        {
          title: "Amplitudes add only in phase",
          body: "A₁ + A₂ is the largest possible resultant, reached only when the phase difference is zero or a whole number of cycles. At any other phase use the cosine formula.",
        },
        {
          title: "A constant inside 2π( ) is not the phase",
          body: "In sin 2π(x − vt + 0.75) the phase is 2π × 0.75 = 3π/2, not 0.75 rad. Multiply the constant by 2π before putting it into the cosine formula.",
        },
      ],
    },

    // C2 — standing waves and harmonics on a string fixed at both ends
    {
      kind: "formula" as const,
      slug: "jpwave-string-harmonics",
      name: "Standing waves and harmonics of a string fixed at both ends",
      intuition:
        "A wave and its reflection on a string fixed at both ends make a standing wave, with a node at each end. The string can only hold a whole number of half-wavelengths, so only some frequencies fit: the fundamental v/2L and every whole-number multiple of it. Two neighbouring resonances therefore differ by exactly the fundamental.",
      definition:
        "- Standing wave \\(y = 2A\\cos kx\\,\\sin\\omega t\\): the amplitude at position x is \\(|2A\\cos kx|\\). Nodes are \\(\\lambda/2\\) apart; an antinode lies midway.\n" +
        "- Fixed at both ends: \\(L = n\\dfrac{\\lambda}{2}\\), so \\(f_n = \\dfrac{nv}{2L} = \\dfrac{n}{2L}\\sqrt{\\dfrac{T}{\\mu}}\\), n = 1, 2, 3, … All harmonics occur; the nth has n loops.\n" +
        "- Consecutive resonances: \\(f_{n+1} - f_n = \\dfrac{v}{2L}\\), the fundamental.\n" +
        "- Same string, same tension: \\(f \\propto \\dfrac{1}{L}\\). Sonometer with a hanging mass m: \\(T = mg\\), so \\(f \\propto \\sqrt{m}\\).\n" +
        "- Fundamental from the wave speed: \\(\\lambda = 2L\\), \\(v = 2Lf_1\\).",
      formula: {
        label: "Harmonics of a string",
        latex: "f_n = \\frac{n}{2L}\\sqrt{\\frac{T}{\\mu}} \\qquad f_{n+1} - f_n = \\frac{v}{2L} \\qquad y = 2A\\cos kx\\,\\sin\\omega t",
      },
      authoredExample: {
        prompt:
          "A string 50 cm long with \\(\\mu = 2\\ \\text{g/m}\\) is fixed at both ends under a tension of 80 N. Find the wave speed and the first three harmonics. Where is the first node away from an end in the third harmonic?",
        steps: [
          "\\(v = \\sqrt{\\dfrac{80}{0.002}} = \\sqrt{40000} = 200\\ \\text{m/s}\\).",
          "\\(f_1 = \\dfrac{v}{2L} = \\dfrac{200}{1.0} = 200\\ \\text{Hz}\\); then 400 Hz and 600 Hz.",
          "The third harmonic has three loops of length \\(L/3\\), so the first inner node is \\(50/3 \\approx 16.7\\ \\text{cm}\\) from an end.",
        ],
        answer: "\\(200\\ \\text{m/s}\\); 200, 400, 600 Hz; about 16.7 cm",
      },
      selfCheckExample: {
        prompt:
          "A string 1.5 m long, fixed at both ends, resonates at 240 Hz and next at 300 Hz. Find the fundamental, which harmonics these are, and the wave speed.",
        steps: [
          "Consecutive resonances differ by the fundamental: \\(f_1 = 300 - 240 = 60\\ \\text{Hz}\\).",
          "\\(240 = 4 \\times 60\\) and \\(300 = 5 \\times 60\\): the 4th and 5th harmonics.",
          "\\(v = 2Lf_1 = 2 \\times 1.5 \\times 60 = 180\\ \\text{m/s}\\).",
        ],
        answer: "60 Hz; 4th and 5th; \\(180\\ \\text{m/s}\\)",
      },
      practiceSet: [
        { prompt: "Under one tension, 100 cm of a sonometer wire gives 200 Hz. Length for 250 Hz?", answer: "80 cm" },
        { prompt: "The hanging mass on a sonometer goes from 1 kg to 4 kg. The frequency becomes?", answer: "Twice as much" },
        { prompt: "\\(y = 6\\cos\\left(\\dfrac{\\pi x}{3}\\right)\\sin 50t\\) (cm). Amplitude at x = 1 cm, and the first node?", answer: "3 cm; x = 1.5 cm" },
        { prompt: "In a standing wave of wavelength 40 cm, the distance between adjacent nodes?", answer: "20 cm" },
      ],
      pyqExampleId: "7fd6a336-63e4-4c0b-9746-a9244f12069b", // 27 Jul 2022: nth and (n+1)th harmonics, find μ
      traps: [
        {
          title: "Frequency goes as the root of the hanging mass",
          body: "The tension is mg and f ∝ √T, so f ∝ √m. To raise a sonometer's frequency by a factor of 3, the hanging mass must be 9 times larger, not 3 times.",
        },
        {
          title: "The difference of two resonances is the fundamental",
          body: "Two neighbouring resonances of a string differ by v/2L. That difference is the first harmonic itself; it does not tell you n until you divide either frequency by it.",
        },
        {
          title: "A standing wave's amplitude depends on position",
          body: "In y = 2A cos kx sin ωt, the factor 2A is only the amplitude at an antinode. At any other point the amplitude is |2A cos kx|, and at a node it is zero.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_RO_PRISMS_NOTE: SubtopicNote = {
  subtopicName: "Prisms",
  title: "Prisms",
  oneLineDefinition:
    "How a prism deviates a ray, the angle of minimum deviation and the refractive index it gives, dispersion into colours, and rays that graze out of a prism or are totally reflected inside it.",
  whyItMatters:
    "Three NEET questions, from 2021, 2024 and 2026, each with a figure. One finds the deviation of a ray that runs parallel to the base of an equilateral prism (2026), one finds the refractive index of a right-angled prism that a ray grazes out of (2024), and one finds the angle of emergence of a ray that enters a face normally (2021).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphro-deviation",
      name: "Deviation and minimum deviation",
      visualizationSlug: "opt-prism-dispersion",
      intuition:
        "A prism bends a ray twice, once at each face, both times towards its base. The total turn is the angle of deviation. As the angle of incidence grows, the deviation first falls and then rises again, so there is one angle of incidence that gives the smallest deviation. At that point the ray passes through the prism symmetrically, and this is the easiest state in which to measure the glass's refractive index.",
      definition:
        "- Angles inside: \\(r_1 + r_2 = A\\). Deviation: \\(\\delta = i + e - A\\).\n" +
        "- **Minimum deviation:** \\(i = e\\) and \\(r_1 = r_2 = \\dfrac{A}{2}\\). The ray inside runs parallel to the base of an equilateral (or isosceles) prism, and \\(D_m = 2i - A\\).\n" +
        "- Refractive index from minimum deviation: \\(n = \\dfrac{\\sin\\frac{A + D_m}{2}}{\\sin\\frac{A}{2}}\\).\n" +
        "- **Thin prism** (small angle A): \\(\\delta = (n - 1)A\\).\n" +
        "- **Dispersion:** the refractive index of glass is larger for violet light than for red, so violet is deviated most and red least. White light spreads into a spectrum of colours.",
      formula: {
        label: "Prism",
        latex: "r_1 + r_2 = A, \\qquad \\delta = i + e - A, \\qquad n = \\frac{\\sin\\frac{A + D_m}{2}}{\\sin\\frac{A}{2}}",
        symbols: [
          { symbol: "\\(A\\)", meaning: "angle of the prism" },
          { symbol: "\\(e\\)", meaning: "angle of emergence" },
          { symbol: "\\(D_m\\)", meaning: "angle of minimum deviation" },
        ],
      },
      authoredExample: {
        prompt:
          "A prism of angle 60° gives a minimum deviation of 30°. Find the refractive index of its glass.",
        steps: [
          "\\(\\dfrac{A + D_m}{2} = \\dfrac{60^{\\circ} + 30^{\\circ}}{2} = 45^{\\circ}\\) and \\(\\dfrac{A}{2} = 30^{\\circ}\\).",
          "\\(n = \\dfrac{\\sin 45^{\\circ}}{\\sin 30^{\\circ}} = \\dfrac{1/\\sqrt{2}}{1/2} = \\sqrt{2}\\).",
        ],
        answer: "\\(\\sqrt{2}\\)",
      },
      selfCheckExample: {
        prompt: "A thin prism of angle 5° is made of glass of refractive index 1.6. By how much does it deviate a ray?",
        steps: [
          "For a thin prism \\(\\delta = (n - 1)A\\).",
          "\\(\\delta = 0.6 \\times 5^{\\circ} = 3^{\\circ}\\).",
        ],
        answer: "3°",
      },
      practiceSet: [
        { prompt: "A prism of angle 60° has refractive index \\(\\sqrt{3}\\). What is its angle of minimum deviation?", answer: "60°" },
        { prompt: "In a prism of angle 60°, a ray is refracted at the first face with an angle of refraction of 35°. What is the angle of refraction at the second face?", answer: "25°" },
        { prompt: "Which colour of white light is deviated most by a glass prism?", answer: "Violet" },
        { prompt: "A thin prism of angle 4° deviates a ray by 2°. What is its refractive index?", answer: "1.5" },
      ],
      pyqExampleId: "90d70022-b408-494e-a266-6defc97f9bd8",
      traps: [
        {
          title: "Deviation uses both faces",
          body: "The deviation of a prism is \\(\\delta = i + e - A\\), not \\(i - r\\). At minimum deviation \\(i = e\\), so \\(D_m = 2i - A\\).",
        },
        {
          title: "The thin prism rule needs a small angle",
          body: "\\(\\delta = (n - 1)A\\) holds only for a prism of small angle. For a 60° prism use the sine formula for minimum deviation.",
        },
        {
          title: "Violet bends most, red least",
          body: "Glass has a larger refractive index for violet than for red, so violet light is deviated more. Red, with the longest wavelength, is deviated least.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphro-prism-tir",
      name: "Grazing emergence and total reflection in a prism",
      intuition:
        "Inside the prism, the ray meets the second face from the glass side, going from denser to rarer. If it meets that face at more than the critical angle, it cannot get out and is totally reflected. Exactly at the critical angle, it just escapes, skimming along the face. This one condition, the angle at the second face against the critical angle, decides every such question.",
      definition:
        "- A ray leaves the second face only if \\(r_2 \\le C\\), where \\(\\sin C = \\dfrac{1}{n}\\).\n" +
        "- **Grazing emergence:** at \\(r_2 = C\\) the ray comes out along the face, so \\(e = 90^{\\circ}\\). Then \\(r_1 = A - C\\) and \\(\\sin i = n \\sin(A - C)\\).\n" +
        "- If \\(r_2 > C\\), the ray is totally reflected inside the prism.\n" +
        "- A ray that falls normally on a face goes straight in: \\(i = 0\\) and \\(r_1 = 0\\), so \\(r_2 = A\\).\n" +
        "- A right-angled prism with 45° angles, made of glass with n above \\(\\sqrt{2}\\), turns light through 90° or 180° by total reflection.",
      formula: {
        label: "Grazing emergence",
        latex: "r_2 = C, \\quad \\sin C = \\frac{1}{n}, \\qquad r_1 = A - C, \\qquad \\sin i = n\\sin r_1",
      },
      authoredExample: {
        prompt:
          "A prism of angle 60° is made of glass of refractive index \\(\\sqrt{2}\\). For what angle of incidence does the ray just graze out of the second face?",
        steps: [
          "\\(\\sin C = \\dfrac{1}{\\sqrt{2}}\\), so \\(C = 45^{\\circ}\\), and grazing emergence needs \\(r_2 = 45^{\\circ}\\).",
          "\\(r_1 = A - r_2 = 60^{\\circ} - 45^{\\circ} = 15^{\\circ}\\).",
          "\\(\\sin i = \\sqrt{2} \\sin 15^{\\circ} = 1.414 \\times 0.259 \\approx 0.366\\), so \\(i \\approx 21.5^{\\circ}\\).",
        ],
        answer: "About 21.5°",
      },
      selfCheckExample: {
        prompt:
          "A ray enters normally through one short face of a right-angled prism with two 45° angles, made of glass of refractive index 1.5. Does it come out of the long face?",
        steps: [
          "It goes straight in and meets the long face at 45°.",
          "\\(\\sin C = \\dfrac{1}{1.5} = 0.67\\), so \\(C \\approx 42^{\\circ}\\).",
          "45° is more than 42°, so the ray is totally reflected and turns through 90°.",
        ],
        answer: "No: it is totally reflected and turned through 90°",
      },
      practiceSet: [
        { prompt: "A ray falls normally on one face of a prism. What is the angle of refraction at that face?", answer: "0°" },
        { prompt: "What is the angle of emergence when a ray just grazes out of a prism's second face?", answer: "90°" },
        { prompt: "For a ray to come out of a prism's second face, how must the angle of incidence there compare with the critical angle?", answer: "It must not be more than the critical angle: \\(r_2 \\le C\\)" },
        { prompt: "Inside a right-angled prism with two 45° angles, light meets the long face at 45°. What is the least refractive index for total reflection there?", answer: "\\(\\sqrt{2}\\)" },
      ],
      pyqExampleId: "60d761ed-e526-44db-8057-93b7e62853c6",
      traps: [
        {
          title: "A normal ray does not bend at the first face",
          body: "At normal incidence \\(r_1 = 0\\), so the whole prism angle appears at the second face: \\(r_2 = A\\).",
        },
        {
          title: "Grazing emergence means the critical angle inside",
          body: "When the ray comes out along the face, the angle outside is 90°, but the angle inside the glass at that face is the critical angle C, not 90°.",
        },
      ],
    },
  ],
};

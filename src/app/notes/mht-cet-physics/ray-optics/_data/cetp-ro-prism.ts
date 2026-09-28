import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/ray-optics";

export const PRISM_NOTE: SubtopicNote = {
  subtopicName: "Prism — Deviation, Dispersion, and Refractive Index",
  title: "The Prism: Deviation and Dispersion",
  oneLineDefinition:
    "A prism of angle A refracts a ray twice, with r₁ + r₂ = A and deviation δ = i + e − A; the deviation is least when the ray passes symmetrically, μ = sin((A + δₘ)/2)/sin(A/2), and a thin prism deviates every ray by (μ − 1)A, different for each colour.",
  whyItMatters:
    "17 PYQs, 8 of them HARD. Thirteen are deviation: minimum deviation, a thin prism in air and in water, a ray grazing the second face, a silvered face that sends the ray back, two rays through a double prism. " +
    "Four are dispersion — dispersive powers of two prisms, an achromatic doublet, the rainbow. Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-ro-prism-deviation",
      name: "Deviation and Minimum Deviation",
      intuition:
        "Inside a prism the two refraction angles add to the prism angle, r₁ + r₂ = A, and the total deviation is δ = i + e − A. At minimum deviation the path is symmetric: i = e, r = A/2, and the ray inside runs parallel to the base, which gives μ = sin((A + δₘ)/2)/sin(A/2); for an equilateral prism μ = 2 sin((60° + δₘ)/2). A thin prism deviates by (μ − 1)A at small angles; in water, use the relative index μ_g/μ_w, which cuts the deviation of a 3/2 prism to a quarter. If the emergent ray just grazes the second face, r₂ is the critical angle. If the second face is silvered and the ray returns along its path, it must strike that face normally, so r₁ = A and μ = sin i / sin A.",
      definition:
        "- \\(r_1 + r_2 = A\\); \\(\\delta = i + e - A\\).\n" +
        "- Minimum deviation: \\(i = e\\), \\(\\mu = \\dfrac{\\sin\\frac{A + \\delta_m}{2}}{\\sin\\frac{A}{2}}\\) (equilateral, i = 50° ⇒ δₘ = 40°).\n" +
        "- Thin prism: \\(\\delta = (\\mu - 1)A\\); in water \\(\\mu' = \\dfrac{3/2}{4/3} = \\dfrac{9}{8}\\) ⇒ δ/4.\n" +
        "- Grazing emergence: \\(r_2 = C\\) (μ = √2, A = 60° ⇒ \\(r_1 = 15^\\circ\\), \\(i = \\sin^{-1}(\\sqrt{2}\\sin 15^\\circ)\\)).\n" +
        "- Silvered second face, ray retraces: \\(r_1 = A\\); at incidence 2A, \\(\\mu = 2\\cos A\\).",
      formula: {
        label: "Prism",
        latex: "\\mu = \\frac{\\sin\\frac{A + \\delta_m}{2}}{\\sin\\frac{A}{2}}, \\qquad \\delta_{\\text{thin}} = (\\mu - 1)A",
      },
      authoredExample: {
        prompt: "An equilateral prism gives a minimum deviation of 30°. Its refractive index?",
        steps: ["μ = sin 45°/sin 30°.", "μ = (1/√2)/(1/2) = √2."],
        answer: "√2 ≈ 1.41",
      },
      selfCheckExample: {
        prompt: "A thin prism of angle 5° and μ = 1.6. Deviation?",
        steps: ["(μ − 1)A."],
        answer: "3°",
      },
      practiceSet: [
        { prompt: "Ray inside an equilateral prism is parallel to the base. Relation between i and e?", answer: "i = e" },
        { prompt: "Equilateral prism, i = e = (3/4)A. Deviation?", answer: "30°" },
      ],
      pyqExampleId: "c1fe9c06-85af-4934-b01b-65a6aa94b057",
      traps: [
        {
          title: "Using the glass's own index in water",
          body:
            "In water the prism bends light by the RELATIVE index, μ_glass/μ_water = 9/8. The deviation drops from 0.5A to A/8.",
        },
        {
          title: "Forgetting that a retracing ray meets the silvered face normally",
          body:
            "To come straight back, the ray inside must hit the silvered face at 90°, so r₁ equals the prism angle A.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-ro-dispersion",
      name: "Dispersion, Dispersive Power and Achromatism",
      intuition:
        "Violet bends more than red because its refractive index is higher. The spread between them relative to the mean deviation is the dispersive power: ω = (δ_V − δ_R)/δ_Y, with δ_Y the average of the two. Two lenses in contact are achromatic — the same focus for all colours — when ω₁P₁ + ω₂P₂ = 0, so the dispersive powers are in the inverse ratio of the powers. A rainbow is refraction, dispersion and reflection inside drops; the angular deviation of the ray is part of it too.",
      definition:
        "- \\(\\omega = \\dfrac{\\delta_V - \\delta_R}{\\delta_Y}\\), \\(\\delta_Y = \\dfrac{\\delta_V + \\delta_R}{2}\\) (9° and 11° against 11° and 13° ⇒ 5 : 6).\n" +
        "- Achromatic pair in contact: \\(\\omega_1P_1 + \\omega_2P_2 = 0\\) (+2 D from +5 D and −3 D ⇒ ω ratio 3 : 5).",
      formula: {
        label: "Dispersive power",
        latex: "\\omega = \\frac{\\delta_V - \\delta_R}{\\delta_Y}, \\qquad \\omega_1P_1 + \\omega_2P_2 = 0",
      },
      authoredExample: {
        prompt: "A prism deviates red by 8° and violet by 12°. Its dispersive power?",
        steps: ["δ_Y = 10°.", "ω = 4/10."],
        answer: "0.4",
      },
      selfCheckExample: {
        prompt: "A glass has μ_V = 1.66, μ_R = 1.64, μ_Y = 1.65. Dispersive power?",
        steps: ["ω = (μ_V − μ_R)/(μ_Y − 1)."],
        answer: "≈ 0.031",
      },
      practiceSet: [
        { prompt: "Prism A: 10° and 12°; prism B: 8° and 10°. ω_A : ω_B?", answer: "9 : 11" },
      ],
      pyqExampleId: "132a9af6-bde9-4263-8a42-072cb2f86f06",
      traps: [
        {
          title: "Dividing by the violet or red deviation",
          body:
            "Dispersive power divides the spread by the MEAN (yellow) deviation. Using δ_V or δ_R changes the ratio of two prisms.",
        },
      ],
    },
  ],
  related: [
    { label: "Refraction — Snell's law at one surface", href: `${BASE}/cetp-ro-refraction` },
    { label: "Lenses — two refracting surfaces", href: `${BASE}/cetp-ro-lenses` },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/magnetic-materials";

export const MAGNETISATION_NOTE: SubtopicNote = {
  subtopicName: "Magnetisation, Susceptibility, Permeability, and B-H-M Relations",
  title: "Magnetisation, Susceptibility and Permeability",
  oneLineDefinition:
    "Inside a material the field is B = μ₀(H + M), where H is set by the currents and M, the magnetisation, is the material's own dipole moment per unit volume; M = χH defines the susceptibility, so B = μ₀(1 + χ)H and the relative permeability is μᵣ = 1 + χ.",
  whyItMatters:
    "13 PYQs, none HARD. Nine connect B, H, M, χ and μ — the relative permeability from a susceptibility, the absolute permeability, the percentage rise in a toroid's field when it is filled. " +
    "Four compute a magnetisation from a moment and a volume or from a solenoid's current. Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-mm-bhm-relations",
      name: "B, H, M, χ and μ",
      intuition:
        "H is what the free currents supply: nI inside a solenoid. The material responds with a magnetisation M = χH, and the total field is B = μ₀(H + M) = μ₀(1 + χ)H. So μᵣ = 1 + χ and μ = μ₀(1 + χ). A susceptibility of 5499 means μᵣ = 5500. Filling a toroid with a material raises B by the fraction χ. Paramagnets have a small positive χ, diamagnets a small negative one, ferromagnets a very large one. μ = B/H can also be read off a flux measurement: B = Φ/A.",
      definition:
        "- \\(B = \\mu_0(H + M)\\), \\(M = \\chi H\\), \\(\\dfrac{B}{H} = \\mu_0(1 + \\chi)\\).\n" +
        "- \\(\\mu_r = 1 + \\chi\\); \\(\\mu = \\mu_0(1 + \\chi)\\) (χ = 599 ⇒ \\(2.4\\pi\\times10^{-4}\\)).\n" +
        "- Filled toroid: B rises by \\(\\chi \\times 100\\%\\).\n" +
        "- From flux: \\(\\mu = \\dfrac{\\Phi/A}{H}\\) (\\(2.4\\times10^{-5}\\) Wb on 0.4 cm² at 500 A/m ⇒ \\(1.2\\times10^{-3}\\)).",
      formula: {
        label: "Field in a material",
        latex: "B = \\mu_0(H + M) = \\mu_0(1 + \\chi)H, \\qquad \\mu_r = 1 + \\chi",
      },
      authoredExample: {
        prompt: "A material has susceptibility 2 × 10⁻³ and is placed in H = 1000 A/m. Magnetisation and field B?",
        steps: ["M = χH = 2 A/m.", "B = μ₀(H + M) = 4π × 10⁻⁷ × 1002 ≈ 1.26 × 10⁻³ T."],
        answer: "2 A/m; ≈ 1.26 × 10⁻³ T",
      },
      selfCheckExample: {
        prompt: "A material has χ = 999. Relative permeability?",
        steps: ["1 + χ."],
        answer: "1000",
      },
      practiceSet: [
        { prompt: "Susceptibility of a paramagnet is?", answer: "Positive and small" },
      ],
      pyqExampleId: "233fba13-3454-4d5a-91e6-8adc7ea52f50",
      traps: [
        {
          title: "Taking μᵣ = χ",
          body:
            "μᵣ = 1 + χ. For iron with χ = 5499, μᵣ = 5500; the option 5499 is the trap.",
        },
        {
          title: "Quoting (1 + χ) as the percentage rise",
          body:
            "A toroid filled with a material of susceptibility χ has B multiplied by (1 + χ), so the RISE is χ × 100%.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-mm-magnetisation-values",
      name: "Computing a Magnetisation",
      intuition:
        "Magnetisation is dipole moment per unit volume: M = m/V. For a bar of known mass, get the volume from the density first. In a solenoid core, H = nI and M = (μᵣ − 1)nI, very nearly μᵣnI when μᵣ is large.",
      definition:
        "- \\(M = \\dfrac{m}{V}\\) (6 A m² in 4 cm × 2 cm² ⇒ \\(7.5\\times10^5\\) A/m).\n" +
        "- From mass: \\(V = \\dfrac{\\text{mass}}{\\rho}\\) (2.4 A m², 66 g, 7700 kg/m³ ⇒ \\(2.8\\times10^5\\) A/m).\n" +
        "- Solenoid core: \\(M = (\\mu_r - 1)nI\\) (400/m, 0.5 A, μᵣ = 400 ⇒ \\(8\\times10^4\\) A/m).",
      formula: {
        label: "Magnetisation",
        latex: "M = \\frac{m}{V} = (\\mu_r - 1)\\,nI",
      },
      authoredExample: {
        prompt: "A solenoid of 1000 turns/m carries 2 A around an iron core with μᵣ = 1001. Magnetisation?",
        steps: ["H = nI = 2000 A/m.", "M = 1000 × 2000 = 2 × 10⁶ A/m."],
        answer: "2 × 10⁶ A/m",
      },
      selfCheckExample: {
        prompt: "A magnet of moment 2 A m² has volume 10⁻⁵ m³. Its magnetisation?",
        steps: ["m/V."],
        answer: "2 × 10⁵ A/m",
      },
      practiceSet: [
        { prompt: "Solenoid of 500 turns/m, 3 A, iron core μᵣ = 5000. Magnetisation?", answer: "≈ 7.5 × 10⁶ A/m" },
      ],
      pyqExampleId: "d10f0412-c8bc-46e9-b425-af2f60c38deb",
      traps: [
        {
          title: "Leaving cm² and cm in the volume",
          body:
            "4 cm × 2 cm² is 8 × 10⁻⁶ m³. Mixed units put the answer off by powers of ten, and the options are spaced that way.",
        },
        {
          title: "Using μᵣ where μᵣ − 1 belongs",
          body:
            "M = (μᵣ − 1)nI. With μᵣ = 5000 the difference is negligible, but with a weakly magnetic core, using μᵣ counts the vacuum part of the field as magnetisation.",
        },
      ],
    },
  ],
  related: [
    { label: "Dipole Moment", href: `${BASE}/cetp-mm-dipole` },
    { label: "Classes of Magnetic Material", href: `${BASE}/cetp-mm-classification` },
  ],
};

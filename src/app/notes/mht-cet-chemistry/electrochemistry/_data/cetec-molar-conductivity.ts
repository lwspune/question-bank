import type { SubtopicNote } from "@/app/notes/_types";

export const MOLAR_CONDUCTIVITY_NOTE: SubtopicNote = {
  subtopicName: "Molar Conductivity, Kohlrausch's Law and Degree of Dissociation",
  title: "Molar Conductivity, Kohlrausch's Law and Degree of Dissociation",
  oneLineDefinition:
    "Molar conductivity Λ = 1000κ/c is the conductivity of one mole of electrolyte; it rises on dilution to a limit Λ₀ that Kohlrausch's law builds from the ions, and the ratio Λ/Λ₀ is the degree of dissociation of a weak electrolyte.",
  whyItMatters:
    "24 PYQs, none HARD. Half are the conversion between κ and Λ in either direction (the 1000 is where marks are lost), a quarter are Kohlrausch — add and subtract Λ₀ values, or count ions with their coefficients — and the rest are α = Λ/Λ₀ as a fraction or a percentage. " +
    "Two formulas and one factor of 1000.",
  concepts: [
    // 1 — molar conductivity and conductivity
    {
      kind: "formula" as const,
      slug: "cetec-molar-conductivity-and-conductivity",
      name: "Molar Conductivity: Λ = 1000κ/c and Back",
      intuition:
        "κ counts the ions in one cm³; Λ counts the conductance one whole mole would give. Dividing κ by the concentration in mol per cm³ (c/1000 for c in mol L⁻¹) does it. Diluting a solution lowers κ (fewer ions per cm³) but raises Λ (each mole is more completely dissociated and less crowded).",
      definition:
        "- \\(\\Lambda = \\dfrac{1000\\,\\kappa}{c}\\), κ in S cm⁻¹, c in mol L⁻¹; unit \\(\\text{S cm}^2\\,\\text{mol}^{-1}\\). 0.02 M AgNO₃, κ = 0.00216 → \\(\\Lambda = 108\\).\n" +
        "- Reverse: \\(\\kappa = \\dfrac{\\Lambda \\cdot c}{1000}\\). 0.02 M KCl, Λ = 410 → \\(\\kappa = 8.2 \\times 10^{-3}\\). And \\(c = \\dfrac{1000\\kappa}{\\Lambda}\\).\n" +
        "- On dilution: \\(\\kappa\\) DECREASES, \\(\\Lambda\\) INCREASES. The most dilute solution has the highest Λ (0.001 M beats 0.005 M).\n" +
        "- Strong electrolytes: Λ rises slowly and linearly in √c to Λ₀. Weak electrolytes: Λ shoots up at high dilution, so Λ₀ cannot be read off a graph — it comes from Kohlrausch.",
      formula: {
        label: "Molar conductivity",
        latex:
          "\\Lambda = \\frac{1000\\,\\kappa}{c},\\qquad \\kappa = \\frac{\\Lambda\\,c}{1000}",
      },
      authoredExample: {
        prompt: "The conductivity of 0.05 M NaCl is \\(5.5 \\times 10^{-3}\\ \\text{S cm}^{-1}\\). Find its molar conductivity.",
        steps: [
          "\\(\\Lambda = \\dfrac{1000 \\times 5.5 \\times 10^{-3}}{0.05} = 110\\ \\text{S cm}^2\\,\\text{mol}^{-1}\\).",
        ],
        answer: "\\(110\\ \\text{S cm}^2\\,\\text{mol}^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "Molar conductivity of 0.1 M HCl is 391 S cm² mol⁻¹. Find κ.",
        steps: [
          "\\(\\kappa = \\dfrac{391 \\times 0.1}{1000} = 0.0391\\ \\text{S cm}^{-1}\\).",
        ],
        answer: "\\(0.0391\\ \\text{S cm}^{-1}\\)",
      },
      practiceSet: [
        { prompt: "0.005 M NaI, \\(\\kappa = 6.065 \\times 10^{-4}\\): Λ?", answer: "\\(121.3\\ \\text{S cm}^2\\,\\text{mol}^{-1}\\)" },
        { prompt: "0.05 M BaCl₂, Λ = 220: κ?", answer: "\\(0.011\\ \\text{S cm}^{-1}\\)" },
        { prompt: "Λ = 101, \\(\\kappa = 1.01 \\times 10^{-2}\\): c?", answer: "0.1 M" },
        { prompt: "On dilution, Λ and κ?", answer: "Λ increases, κ decreases" },
      ],
      pyqExampleId: "7f8b615c-2681-46b8-b90e-014616017ab5",
      traps: [
        {
          title: "Dropping the 1000",
          body:
            "\\(\\kappa/c\\) with c in mol L⁻¹ is a thousand times too small. The factor converts litres to cm³ because κ is per cm. Options are set one factor of 1000 apart to catch exactly this.",
        },
      ],
    },

    // 2 — Kohlrausch's law
    {
      kind: "formula" as const,
      slug: "cetec-kohlrausch-law",
      name: "Kohlrausch's Law: Λ₀ From the Ions",
      intuition:
        "At infinite dilution every ion moves independently, so Λ₀ of an electrolyte is the sum of its ions' limiting conductivities, each weighted by how many of that ion the formula releases. It also lets you build Λ₀ of a weak acid from three strong electrolytes: add the ones that carry the ions you want, subtract the one that carries the ions you don't.",
      definition:
        "- \\(\\Lambda_0 = \\nu_+\\lambda_+^0 + \\nu_-\\lambda_-^0\\). AB₃: \\(\\lambda^0_{A^{3+}} + 3\\lambda^0_{B^-}\\). A₂B₃: \\(2\\lambda^0_{A^{3+}} + 3\\lambda^0_{B^{2-}}\\). Al₂(SO₄)₃: \\(2(189) + 3(50.1) = 528.3\\).\n" +
        "- Weak acid from salts: \\(\\Lambda_0(\\text{CH}_2\\text{ClCOOH}) = \\Lambda_0(\\text{HCl}) + \\Lambda_0(\\text{CH}_2\\text{ClCOOK}) - \\Lambda_0(\\text{KCl})\\) = 4.2 + 1.1 − 1.5 = 3.8.\n" +
        "- Same trick for any salt: \\(\\Lambda_0(\\text{NaBr}) = \\Lambda_0(\\text{NaCl}) + \\Lambda_0(\\text{KBr}) - \\Lambda_0(\\text{KCl})\\) = 126 + 152 − 150 = 128.\n" +
        "- Halve a 2:1 salt when you need one ion of it: \\(\\Lambda_0(\\text{NH}_4\\text{OH}) = \\Lambda_0(\\text{NH}_4\\text{Cl}) + \\tfrac{1}{2}\\Lambda_0(\\text{Ba(OH)}_2) - \\tfrac{1}{2}\\Lambda_0(\\text{BaCl}_2)\\) = 129 + 260 − 140 = 249.",
      formula: {
        label: "Kohlrausch's law",
        latex:
          "\\Lambda_0 = \\nu_+\\,\\lambda_+^0 + \\nu_-\\,\\lambda_-^0",
      },
      authoredExample: {
        prompt: "Λ₀ of NaOH, HCl and NaCl are 248, 426 and 126 S cm² mol⁻¹. Find Λ₀ of water (H⁺ + OH⁻).",
        steps: [
          "H⁺ from HCl, OH⁻ from NaOH; remove Na⁺ and Cl⁻ with NaCl: \\(426 + 248 - 126 = 548\\).",
        ],
        answer: "\\(548\\ \\text{S cm}^2\\,\\text{mol}^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "Write Λ₀ of CaCl₂ in terms of ionic conductivities, and compute it for \\(\\lambda^0_{\\text{Ca}^{2+}} = 119\\), \\(\\lambda^0_{\\text{Cl}^-} = 76.3\\).",
        steps: [
          "\\(\\Lambda_0 = \\lambda^0_{\\text{Ca}^{2+}} + 2\\lambda^0_{\\text{Cl}^-} = 119 + 152.6 = 271.6\\).",
        ],
        answer: "\\(271.6\\ \\text{S cm}^2\\,\\text{mol}^{-1}\\)",
      },
      practiceSet: [
        { prompt: "Λ₀ of AB₃ in terms of ions?", answer: "\\(\\lambda^0_{A^{3+}} + 3\\lambda^0_{B^-}\\)" },
        { prompt: "HCl 4.2, KCl 1.5, CH₂ClCOOK 1.1: Λ₀ of CH₂ClCOOH?", answer: "3.8" },
        { prompt: "NaCl 126, KBr 152, KCl 150: Λ₀ of NaBr?", answer: "128" },
        { prompt: "For which can Λ₀ NOT be found graphically: HNO₃, H₂SO₄, CH₃COOH, KCl?", answer: "CH₃COOH" },
      ],
      pyqExampleId: "07b0be51-9a15-43dc-a26a-a99a229b6130",
      traps: [
        {
          title: "Adding all three values",
          body:
            "The third electrolyte supplies the ions you must REMOVE, so it is subtracted. 4.2 + 1.1 + 1.5 = 6.8 is nowhere near an option; 4.2 + 1.1 − 1.5 = 3.8 is the key.",
        },
      ],
    },

    // 3 — degree of dissociation
    {
      kind: "formula" as const,
      slug: "cetec-degree-of-dissociation",
      name: "Degree of Dissociation: α = Λ/Λ₀",
      intuition:
        "A weak electrolyte's molar conductivity at concentration c is low because only a fraction α of its molecules are ions. If all were ions it would show Λ₀. So α = Λ_c/Λ₀ — a ratio of two numbers the paper hands you, then sometimes asks as a percentage.",
      definition:
        "- \\(\\alpha = \\dfrac{\\Lambda_c}{\\Lambda_0}\\). 0.01 M acetic acid: \\(16.5/390.7 = 0.0422\\).\n" +
        "- Percentage dissociation \\(= 100\\alpha\\): \\(3.3/132 = 0.025 = 2.5\\%\\).\n" +
        "- Dissociation constant follows: \\(K_a = \\dfrac{c\\alpha^2}{1 - \\alpha} \\approx c\\alpha^2\\) (Ostwald's dilution law).\n" +
        "- α rises with dilution — which is why Λ_c climbs towards Λ₀.",
      formula: {
        label: "Degree of dissociation",
        latex:
          "\\alpha = \\frac{\\Lambda_c}{\\Lambda_0}",
      },
      authoredExample: {
        prompt: "Λ of 0.1 M HCOOH is 5.2 and Λ₀ is 404.5 S cm² mol⁻¹. Find α and Ka.",
        steps: [
          "\\(\\alpha = 5.2/404.5 = 0.0129\\).",
          "\\(K_a \\approx c\\alpha^2 = 0.1 \\times (0.0129)^2 = 1.66 \\times 10^{-5}\\).",
        ],
        answer: "\\(\\alpha = 0.0129\\); \\(K_a \\approx 1.7 \\times 10^{-5}\\)",
      },
      selfCheckExample: {
        prompt: "Λ_c = 7.92, Λ₀ = 232.7. Degree of dissociation?",
        steps: [
          "\\(7.92 / 232.7 = 0.0340\\).",
        ],
        answer: "\\(0.034\\)",
      },
      practiceSet: [
        { prompt: "Λ_c = 15, Λ₀ = 300: α?", answer: "0.05" },
        { prompt: "Λ_c = 3.3, Λ₀ = 132: percentage dissociation?", answer: "2.5%" },
        { prompt: "Does α rise or fall on dilution?", answer: "Rises" },
        { prompt: "Λ_c = 16.5, Λ₀ = 390.7: α?", answer: "0.0422" },
      ],
      pyqExampleId: "1dc6590f-c011-4f0b-a447-31b680f44414",
      traps: [
        {
          title: "Inverting the ratio",
          body:
            "α is the SMALL number over the big one and must come out below 1. Λ₀/Λ_c gives 23.7 for acetic acid — no option, but a sign the fraction is upside down.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Conductivity — the κ that feeds Λ",
      href: "/notes/mht-cet-chemistry/electrochemistry/cetec-conductivity",
    },
    {
      label: "Ionic Equilibria — Ostwald's dilution law and Ka",
      href: "/notes/mht-cet-chemistry/ionic-equilibria",
    },
  ],
};

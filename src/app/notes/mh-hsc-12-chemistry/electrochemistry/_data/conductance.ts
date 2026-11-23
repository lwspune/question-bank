import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_EC_CONDUCTANCE_NOTE: SubtopicNote = {
  subtopicName: "Electric Conduction and Conductance of Solutions",
  title: "Conductance of Electrolytic Solutions",
  oneLineDefinition:
    "How a solution of an electrolyte conducts, its conductivity and cell constant, molar conductivity and how both change on dilution, Kohlrausch's law, and the degree of dissociation of a weak electrolyte.",
  whyItMatters:
    "23 questions. Nine were set in board papers: the cell constant from a resistance and a conductivity (2014), the molar conductivity of NaOH from a resistance (2017), conductivity from molar conductivity and back for BaCl₂ (2019, 2023), the SI unit of molar conductivity (2024), the formula for molar conductivity (2025), and in 2026 the SI unit of cell constant, the relation between conductivity and molar conductivity, and Kohlrausch's law. The textbook adds the effect of dilution, the cell constant by Wheatstone bridge, limiting molar conductivities and acetic acid.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccec-conductivity",
      name: "Conductance, conductivity and cell constant",
      intuition:
        "A solution conducts because its ions move. How well it conducts depends on the solution and also on the cell: plates far apart or small plates give a large resistance. Conductivity removes the cell from the picture. It is the conductance of a cube of solution 1 cm on each side, so it describes the solution alone. The cell constant, l/a, is the part that belongs to the cell.",
      definition:
        "- **Metallic conduction** is a flow of electrons with no chemical change. **Electrolytic conduction** is the movement of ions in a molten electrolyte or a solution, and it is accompanied by a chemical change.\n" +
        "- **Resistance** \\(R = \\dfrac{V}{I}\\), unit ohm (Ω). **Conductance** \\(G = \\dfrac{1}{R}\\), unit siemens: \\(1\\ \\text{S} = 1\\ \\Omega^{-1}\\).\n" +
        "- \\(R = \\rho \\dfrac{l}{a}\\), where \\(\\rho\\) is the resistivity, so \\(G = k \\dfrac{a}{l}\\).\n" +
        "- **Conductivity** \\(k\\) is the conductance of a conductor of unit length and unit area of cross section, that is of a unit cube; \\(k = \\dfrac{1}{\\rho}\\). SI unit S m⁻¹; common unit Ω⁻¹ cm⁻¹.\n" +
        "- **Cell constant** \\(= \\dfrac{l}{a}\\), the distance between the electrodes divided by the area of an electrode. SI unit m⁻¹, usually given in cm⁻¹. So \\(k = \\dfrac{\\text{cell constant}}{R}\\).\n" +
        "- **Measurement:** the conductivity cell (two platinum plates coated with platinum black) is put in one arm of a Wheatstone bridge, with a known variable resistance \\(R_x\\) in the other and an AC source. At the null point C on the wire AB, \\(R_{\\text{solution}} = \\dfrac{l(\\text{AC})}{l(\\text{BC})} \\times R_x\\).\n" +
        "- The cell constant is found first with 1 M, 0.1 M or 0.01 M KCl, whose conductivity is known: cell constant \\(= k_{\\text{KCl}} \\times R_{\\text{KCl}}\\).",
      formula: {
        label: "Conductivity from resistance",
        latex: "k = \\frac{1}{R} \\times \\frac{l}{a} = \\frac{\\text{cell constant}}{R}",
      },
      authoredExample: {
        prompt:
          "A conductivity cell has a cell constant of 1.25 cm⁻¹. When it is filled with a solution, the resistance measured is 250 Ω. Calculate the conductivity of the solution.",
        steps: [
          "Given: cell constant \\(= 1.25\\ \\text{cm}^{-1}\\), \\(R = 250\\ \\Omega\\).",
          "Formula: \\(k = \\dfrac{\\text{cell constant}}{R}\\).",
          "Substitution: \\(k = \\dfrac{1.25\\ \\text{cm}^{-1}}{250\\ \\Omega}\\).",
          "\\(k = 5.0 \\times 10^{-3}\\ \\Omega^{-1}\\ \\text{cm}^{-1}\\).",
        ],
        answer: "Conductivity = 5.0 × 10⁻³ Ω⁻¹ cm⁻¹",
      },
      selfCheckExample: {
        prompt: "The electrodes of a conductivity cell are 0.90 cm apart and each has an area of 1.5 cm². Find the cell constant.",
        steps: ["Cell constant \\(= \\dfrac{l}{a} = \\dfrac{0.90\\ \\text{cm}}{1.5\\ \\text{cm}^2}\\).", "\\(= 0.60\\ \\text{cm}^{-1}\\)."],
        answer: "0.60 cm⁻¹",
      },
      practiceSet: [
        { prompt: "What is the SI unit of conductance?", answer: "Siemens (S), equal to Ω⁻¹" },
        { prompt: "How is conductivity related to resistivity?", answer: "\\(k = 1/\\rho\\)" },
        { prompt: "A solution in a conductivity cell has a resistance of 100 Ω. What is its conductance?", answer: "\\(G = 1/R = 0.01\\) S" },
        { prompt: "Which solution is used to find the cell constant of a conductivity cell, and why?", answer: "1 M, 0.1 M or 0.01 M KCl, because its conductivity is accurately known at various temperatures" },
      ],
      pyqExampleId: "b9304343-8534-4f89-bc2d-db66b15955bd",
      traps: [
        {
          title: "Turning the cell constant upside down",
          body: "The cell constant is \\(l/a\\), distance over area, so its unit is cm⁻¹ (SI m⁻¹). Writing \\(a/l\\) gives a unit of cm and a wrong answer.",
        },
        {
          title: "Conductance and conductivity are different",
          body: "Conductance \\(G = 1/R\\) depends on the cell and is in S. Conductivity \\(k\\) belongs to the solution and is in S cm⁻¹ or S m⁻¹. Name the one asked for.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccec-molar-conductivity",
      name: "Molar conductivity and the effect of dilution",
      intuition:
        "Conductivity counts the ions in 1 cm³, so a stronger solution always wins and two solutions cannot be compared fairly. Molar conductivity counts the ions that come from one mole of the electrolyte, whatever volume that mole sits in. On dilution, 1 cm³ holds fewer ions, so conductivity falls; but one mole gives more ions, so molar conductivity rises.",
      definition:
        "- **Molar conductivity** \\(\\Lambda\\) is the conductivity divided by the molar concentration: \\(\\Lambda = \\dfrac{k}{c}\\). It is the conductance of the ions from 1 mole of the electrolyte.\n" +
        "- If V cm³ of solution holds 1 mol, then \\(\\Lambda = kV\\), and \\(V = \\dfrac{1000}{c}\\) for c in mol L⁻¹. So \\(\\Lambda = \\dfrac{1000\\,k}{c}\\).\n" +
        "- **Units:** SI unit S m² mol⁻¹; common unit Ω⁻¹ cm² mol⁻¹. \\(1\\ \\text{S m}^2\\ \\text{mol}^{-1} = 10^4\\ \\Omega^{-1}\\ \\text{cm}^2\\ \\text{mol}^{-1}\\).\n" +
        "- **Conductivity falls on dilution:** the total number of ions rises (more dissociation), but not in proportion to the dilution, so the ions per cm³ decrease.\n" +
        "- **Molar conductivity rises on dilution:** one mole of electrolyte gives more ions.\n" +
        "- **Strong electrolytes:** \\(\\Lambda\\) rises a little and approaches a limiting value \\(\\Lambda_0\\) at about 0.001 M; \\(\\Lambda = \\Lambda_0 - a\\sqrt{c}\\), so a plot of \\(\\Lambda\\) against \\(\\sqrt{c}\\) is a straight line, and extrapolating it to zero gives \\(\\Lambda_0\\).\n" +
        "- **Weak electrolytes:** \\(\\Lambda\\) rises sharply on dilution and is still below \\(\\Lambda_0\\) even at 0.0001 M; the plot is not linear, so \\(\\Lambda_0\\) cannot be found by extrapolation.",
      formula: {
        label: "Molar conductivity",
        latex: "\\Lambda = \\frac{1000\\,k}{c}",
        symbols: [
          { symbol: "\\(k\\)", meaning: "conductivity in Ω⁻¹ cm⁻¹" },
          { symbol: "\\(c\\)", meaning: "concentration in mol L⁻¹" },
          { symbol: "\\(\\Lambda\\)", meaning: "molar conductivity in Ω⁻¹ cm² mol⁻¹" },
        ],
      },
      authoredExample: {
        prompt:
          "The conductivity of a 0.020 M solution of KCl at 25 °C is 2.77 × 10⁻³ Ω⁻¹ cm⁻¹. Calculate its molar conductivity.",
        steps: [
          "Given: \\(k = 2.77 \\times 10^{-3}\\ \\Omega^{-1}\\ \\text{cm}^{-1}\\), \\(c = 0.020\\ \\text{mol L}^{-1}\\).",
          "Formula: \\(\\Lambda = \\dfrac{1000\\,k}{c}\\).",
          "Substitution: \\(\\Lambda = \\dfrac{1000\\ \\text{cm}^3\\ \\text{L}^{-1} \\times 2.77 \\times 10^{-3}\\ \\Omega^{-1}\\ \\text{cm}^{-1}}{0.020\\ \\text{mol L}^{-1}}\\).",
          "\\(\\Lambda = 138.5\\ \\Omega^{-1}\\ \\text{cm}^2\\ \\text{mol}^{-1}\\).",
        ],
        answer: "Molar conductivity = 138.5 Ω⁻¹ cm² mol⁻¹",
      },
      selfCheckExample: {
        prompt: "A 0.1 M solution has a molar conductivity of 106 Ω⁻¹ cm² mol⁻¹. Find its conductivity.",
        steps: ["\\(k = \\dfrac{\\Lambda c}{1000} = \\dfrac{106 \\times 0.1}{1000}\\).", "\\(k = 0.0106\\ \\Omega^{-1}\\ \\text{cm}^{-1}\\)."],
        answer: "0.0106 Ω⁻¹ cm⁻¹",
      },
      practiceSet: [
        { prompt: "What concentration of silver nitrate solution has a molar conductivity of 121.4 Ω⁻¹ cm² mol⁻¹ and a conductivity of 2.428 × 10⁻³ Ω⁻¹ cm⁻¹?", answer: "\\(c = \\dfrac{1000\\,k}{\\Lambda} = 0.020\\) M" },
        { prompt: "Express 0.0150 S m² mol⁻¹ in Ω⁻¹ cm² mol⁻¹.", answer: "150 Ω⁻¹ cm² mol⁻¹" },
        { prompt: "On dilution, which rises and which falls: conductivity or molar conductivity?", answer: "Molar conductivity rises; conductivity falls" },
        { prompt: "Why can the limiting molar conductivity of a strong electrolyte be found by extrapolation?", answer: "Its molar conductivity varies linearly with the square root of concentration" },
      ],
      pyqExampleId: "67c9a20a-39e7-49d5-b1cf-80cc9fbf9f5f",
      traps: [
        {
          title: "Leaving out the 1000",
          body: "With k in Ω⁻¹ cm⁻¹ and c in mol L⁻¹, the factor 1000 (cm³ in a litre) must appear: \\(\\Lambda = 1000k/c\\). Without it the answer is a thousand times too small.",
        },
        {
          title: "Saying conductivity rises on dilution",
          body: "Dilution lowers the conductivity, because fewer ions sit in each cm³, and raises the molar conductivity. Give the reason for each, not only the direction.",
        },
        {
          title: "Squaring the length conversion wrongly",
          body: "Molar conductivity contains an area: \\(1\\ \\text{m}^2 = 10^4\\ \\text{cm}^2\\), not \\(10^2\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccec-kohlrausch",
      name: "Kohlrausch law of independent migration of ions",
      intuition:
        "At infinite dilution the ions are so far apart that each moves on its own. Then a sodium ion carries the same share of the current whether it came from NaCl or from CH₃COONa. So the limiting molar conductivity of a salt is just the sum of its ions' shares, and shares can be added and subtracted between salts.",
      definition:
        "- **Statement:** at infinite dilution each ion migrates independently of its co-ion and contributes to the total molar conductivity of the electrolyte, irrespective of the nature of the other ion with which it is associated.\n" +
        "- \\(\\Lambda_0 = n_+\\lambda_+^0 + n_-\\lambda_-^0\\), where \\(\\lambda_+^0, \\lambda_-^0\\) are the molar ionic conductivities and \\(n_+, n_-\\) the numbers of cations and anions in one formula unit.\n" +
        "- **Use for weak electrolytes:** their \\(\\Lambda_0\\) cannot be found by extrapolation, so it is built from \\(\\Lambda_0\\) of strong electrolytes. For acetic acid: \\(\\Lambda_0(\\text{CH}_3\\text{COOH}) = \\Lambda_0(\\text{HCl}) + \\Lambda_0(\\text{CH}_3\\text{COONa}) - \\Lambda_0(\\text{NaCl})\\).\n" +
        "- Choose the three strong electrolytes so that the unwanted ions cancel: two that each contain one wanted ion, minus one made of the two unwanted ions.",
      formula: {
        label: "Kohlrausch law",
        latex: "\\Lambda_0 = n_+\\lambda_+^0 + n_-\\lambda_-^0",
      },
      authoredExample: {
        prompt:
          "The molar ionic conductivities at zero concentration of Mg²⁺ and Cl⁻ are 106.1 and 76.3 Ω⁻¹ cm² mol⁻¹. Calculate the molar conductivity of MgCl₂ at zero concentration.",
        steps: [
          "Given: \\(\\lambda^0_{\\text{Mg}^{2+}} = 106.1\\), \\(\\lambda^0_{\\text{Cl}^-} = 76.3\\ \\Omega^{-1}\\ \\text{cm}^2\\ \\text{mol}^{-1}\\).",
          "One MgCl₂ gives one Mg²⁺ and two Cl⁻. Formula: \\(\\Lambda_0(\\text{MgCl}_2) = \\lambda^0_{\\text{Mg}^{2+}} + 2\\lambda^0_{\\text{Cl}^-}\\).",
          "Substitution: \\(\\Lambda_0 = 106.1 + 2 \\times 76.3\\).",
          "\\(\\Lambda_0 = 258.7\\ \\Omega^{-1}\\ \\text{cm}^2\\ \\text{mol}^{-1}\\).",
        ],
        answer: "Λ₀(MgCl₂) = 258.7 Ω⁻¹ cm² mol⁻¹",
      },
      selfCheckExample: {
        prompt:
          "The molar conductivities at zero concentration of HCl, CH₃COONa and NaCl are 426.1, 91.0 and 126.5 Ω⁻¹ cm² mol⁻¹. Find the molar conductivity of acetic acid at zero concentration.",
        steps: [
          "\\(\\Lambda_0(\\text{CH}_3\\text{COOH}) = \\Lambda_0(\\text{HCl}) + \\Lambda_0(\\text{CH}_3\\text{COONa}) - \\Lambda_0(\\text{NaCl})\\).",
          "\\(= 426.1 + 91.0 - 126.5 = 390.6\\ \\Omega^{-1}\\ \\text{cm}^2\\ \\text{mol}^{-1}\\).",
        ],
        answer: "390.6 Ω⁻¹ cm² mol⁻¹",
      },
      practiceSet: [
        { prompt: "Write the molar conductivity at zero concentration of K₂SO₄ in terms of its ionic conductivities.", answer: "\\(2\\lambda^0_{\\text{K}^+} + \\lambda^0_{\\text{SO}_4^{2-}}\\)" },
        { prompt: "Which three strong electrolytes give Λ₀ of NH₄OH?", answer: "\\(\\Lambda_0(\\text{NH}_4\\text{Cl}) + \\Lambda_0(\\text{NaOH}) - \\Lambda_0(\\text{NaCl})\\)" },
        { prompt: "At what condition does Kohlrausch law hold?", answer: "At infinite dilution (zero concentration)" },
      ],
      pyqExampleId: "ba256c11-f1dd-438c-81b7-5bd24fab9ac1",
      traps: [
        {
          title: "Forgetting the number of each ion",
          body: "Multiply each ionic conductivity by the number of that ion in one formula unit: CaCl₂ needs \\(2\\lambda^0_{\\text{Cl}^-}\\), Na₂SO₄ needs \\(2\\lambda^0_{\\text{Na}^+}\\).",
        },
        {
          title: "Stating the law without 'infinite dilution'",
          body: "The ions move independently only at infinite dilution. A statement without that condition loses the mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccec-weak-dissociation",
      name: "Degree of dissociation of a weak electrolyte",
      intuition:
        "At infinite dilution a weak electrolyte is fully dissociated and its molar conductivity reaches Λ₀. At an ordinary concentration only a fraction α has split into ions, so it conducts only that fraction as well. The ratio of the two molar conductivities is therefore the degree of dissociation.",
      definition:
        "- \\(\\alpha = \\dfrac{\\Lambda_c}{\\Lambda_0}\\), where \\(\\Lambda_c\\) is the molar conductivity at concentration c and \\(\\Lambda_0\\) the molar conductivity at zero concentration (often found with Kohlrausch law).\n" +
        "- For a weak acid HA of concentration c, Ostwald's dilution law gives the dissociation constant \\(K_a = \\dfrac{\\alpha^2 c}{1 - \\alpha}\\).\n" +
        "- Work in two steps in a board answer: find \\(\\alpha\\) first, then \\(K_a\\).",
      formula: {
        label: "Degree of dissociation and dissociation constant",
        latex: "\\alpha = \\frac{\\Lambda_c}{\\Lambda_0}, \\qquad K_a = \\frac{\\alpha^2 c}{1 - \\alpha}",
      },
      authoredExample: {
        prompt:
          "The molar conductivity of 0.025 M formic acid at 25 °C is 46.1 Ω⁻¹ cm² mol⁻¹, and its molar conductivity at zero concentration is 404.0 Ω⁻¹ cm² mol⁻¹. Calculate the degree of dissociation and the dissociation constant.",
        steps: [
          "Given: \\(\\Lambda_c = 46.1\\), \\(\\Lambda_0 = 404.0\\ \\Omega^{-1}\\ \\text{cm}^2\\ \\text{mol}^{-1}\\), \\(c = 0.025\\ \\text{mol L}^{-1}\\).",
          "Formula: \\(\\alpha = \\dfrac{\\Lambda_c}{\\Lambda_0} = \\dfrac{46.1}{404.0} = 0.114\\).",
          "Formula: \\(K_a = \\dfrac{\\alpha^2 c}{1 - \\alpha}\\).",
          "Substitution: \\(K_a = \\dfrac{(0.114)^2 \\times 0.025}{1 - 0.114} = 3.67 \\times 10^{-4}\\).",
        ],
        answer: "α = 0.114; Ka = 3.67 × 10⁻⁴",
      },
      selfCheckExample: {
        prompt: "A weak electrolyte is 4% dissociated in a solution, and its molar conductivity at zero concentration is 350 Ω⁻¹ cm² mol⁻¹. Find its molar conductivity in that solution.",
        steps: ["\\(\\Lambda_c = \\alpha \\Lambda_0 = 0.04 \\times 350\\).", "\\(\\Lambda_c = 14\\ \\Omega^{-1}\\ \\text{cm}^2\\ \\text{mol}^{-1}\\)."],
        answer: "14 Ω⁻¹ cm² mol⁻¹",
      },
      practiceSet: [
        { prompt: "A 0.1 M weak acid is 2% dissociated. Find its dissociation constant.", answer: "\\(K_a = \\dfrac{(0.02)^2 \\times 0.1}{0.98} = 4.08 \\times 10^{-5}\\)" },
        { prompt: "What is the degree of dissociation of a weak electrolyte at infinite dilution?", answer: "1, since \\(\\Lambda_c\\) becomes \\(\\Lambda_0\\)" },
      ],
      pyqExampleId: "cfb5d599-1d87-4c92-ad6b-fe0a75db7f78",
      traps: [
        {
          title: "Using the ratio the wrong way up",
          body: "\\(\\alpha = \\Lambda_c/\\Lambda_0\\), which is less than 1. A value above 1 means the two were swapped.",
        },
      ],
    },
  ],
};

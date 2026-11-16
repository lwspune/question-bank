import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_EC_CONDUCTANCE_NOTE: SubtopicNote = {
  subtopicName: "Conductance of Electrolytic Solutions",
  title: "Conductance of Electrolytic Solutions",
  oneLineDefinition:
    "Resistance, conductivity and the cell constant, molar conductivity and how it changes with dilution, Kohlrausch's law of independent migration of ions, and the degree of dissociation of a weak electrolyte.",
  whyItMatters:
    "Five NEET questions from 2021 to 2026, all numerical. One finds a cell constant from conductivity and resistance (2023). Two use Kohlrausch's law: the limiting molar conductivity of acetic acid from three salts (2021), and an ion's limiting molar conductivity from the slope of the Λm against √c plot (Re-NEET 2026). Two find the degree of dissociation of a weak acid, one going on to its dissociation constant (2021, 2025).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchec-conductivity",
      name: "Conductivity, cell constant and molar conductivity",
      intuition:
        "A solution of ions conducts electricity, and we measure how well by placing it between two electrodes in a conductivity cell. The resistance we read depends on the cell too: electrodes far apart give more resistance, large electrodes give less. Conductivity removes the cell's shape and belongs to the solution alone. Molar conductivity goes one step further: it divides by the concentration, so it tells how well each mole of electrolyte conducts.",
      definition:
        "- \\(R = \\rho\\dfrac{l}{A}\\); conductance \\(G = \\dfrac{1}{R}\\), unit siemens (S), where \\(1\\ \\text{S} = 1\\ \\Omega^{-1}\\).\n" +
        "- **Conductivity** \\(\\kappa = \\dfrac{1}{\\rho}\\), unit S m⁻¹ (often S cm⁻¹).\n" +
        "- **Cell constant** \\(G^* = \\dfrac{l}{A} = R\\kappa\\), unit m⁻¹ or cm⁻¹.\n" +
        "- **Molar conductivity** \\(\\Lambda_m = \\dfrac{\\kappa}{c}\\). With \\(\\kappa\\) in S cm⁻¹ and c in mol L⁻¹: \\(\\Lambda_m = \\dfrac{1000\\,\\kappa}{c}\\) in S cm² mol⁻¹.\n" +
        "- \\(1\\ \\text{S cm}^2\\,\\text{mol}^{-1} = 10^{-4}\\ \\text{S m}^2\\,\\text{mol}^{-1}\\).\n" +
        "- Conductivity of an electrolytic solution depends on the nature of the electrolyte, the size of its ions and their solvation, the nature and viscosity of the solvent, the concentration and the temperature (it rises as temperature rises).\n" +
        "- On dilution, **conductivity falls** (fewer ions per cm³) but **molar conductivity rises**.",
      formula: {
        label: "Conductivity and molar conductivity",
        latex: "\\kappa = \\frac{G^*}{R}, \\qquad \\Lambda_m = \\frac{1000\\,\\kappa}{c}",
        symbols: [
          { symbol: "\\(\\kappa\\)", meaning: "conductivity, in S cm⁻¹" },
          { symbol: "\\(G^*\\)", meaning: "cell constant l/A, in cm⁻¹" },
          { symbol: "\\(c\\)", meaning: "concentration, in mol L⁻¹" },
        ],
      },
      authoredExample: {
        prompt:
          "A conductivity cell with cell constant 1.5 cm⁻¹ shows a resistance of 500 Ω when filled with a 0.02 M solution. Find the conductivity and the molar conductivity.",
        steps: [
          "\\(\\kappa = \\dfrac{G^*}{R} = \\dfrac{1.5}{500} = 3.0 \\times 10^{-3}\\ \\text{S cm}^{-1}\\).",
          "\\(\\Lambda_m = \\dfrac{1000 \\times 3.0 \\times 10^{-3}}{0.02} = \\dfrac{3.0}{0.02} = 150\\ \\text{S cm}^2\\,\\text{mol}^{-1}\\).",
        ],
        answer: "\\(\\kappa = 3.0 \\times 10^{-3}\\ \\text{S cm}^{-1}\\); \\(\\Lambda_m = 150\\ \\text{S cm}^2\\,\\text{mol}^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "Express a molar conductivity of 150 S cm² mol⁻¹ in S m² mol⁻¹.",
        steps: [
          "\\(1\\ \\text{cm}^2 = 10^{-4}\\ \\text{m}^2\\).",
          "\\(150 \\times 10^{-4} = 0.015\\ \\text{S m}^2\\,\\text{mol}^{-1}\\).",
        ],
        answer: "\\(1.5 \\times 10^{-2}\\ \\text{S m}^2\\,\\text{mol}^{-1}\\)",
      },
      practiceSet: [
        { prompt: "What is the SI unit of conductivity?", answer: "S m⁻¹" },
        { prompt: "A 0.1 M solution has conductivity 0.012 S cm⁻¹. Find its molar conductivity.", answer: "120 S cm² mol⁻¹", method: "\\(\\dfrac{1000 \\times 0.012}{0.1}\\)" },
        { prompt: "A solution is diluted. What happens to its conductivity and to its molar conductivity?", answer: "Conductivity falls; molar conductivity rises" },
        { prompt: "What happens to the conductivity of an electrolytic solution when it is warmed?", answer: "It increases" },
      ],
      pyqExampleId: "6b352986-61b6-448f-af09-ceb649df5aff",
      traps: [
        {
          title: "The cell constant is κ times R",
          body: "\\(G^* = R\\kappa\\), not \\(\\kappa/R\\). A larger resistance for the same solution means a larger cell constant.",
        },
        {
          title: "Remember the 1000",
          body: "With \\(\\kappa\\) in S cm⁻¹ and c in mol L⁻¹, \\(\\Lambda_m = \\dfrac{1000\\,\\kappa}{c}\\). Leaving out the 1000 makes the answer a thousand times too small.",
        },
        {
          title: "Two quantities move opposite ways on dilution",
          body: "Diluting a solution lowers its conductivity but raises its molar conductivity. A statement that both fall, or both rise, is false.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchec-kohlrausch",
      name: "Molar conductivity on dilution and Kohlrausch's law",
      intuition:
        "As a solution is diluted, each mole of electrolyte conducts better. For a strong electrolyte the ions are already all free; dilution only moves them apart so they drag on each other less, and Λm rises slowly in a straight line against √c. A weak electrolyte splits into more ions as it is diluted, so its Λm shoots up near zero concentration. At infinite dilution every ion moves on its own, so the limiting molar conductivity is just the sum of each ion's share.",
      definition:
        "- **Strong electrolyte:** \\(\\Lambda_m = \\Lambda_m^\\circ - A\\sqrt{c}\\). Plotting \\(\\Lambda_m\\) against \\(\\sqrt{c}\\) gives a straight line of slope \\(-A\\) and intercept \\(\\Lambda_m^\\circ\\). A depends on the type of electrolyte (the charges on its ions).\n" +
        "- **Weak electrolyte:** \\(\\Lambda_m\\) rises steeply at low concentration, so \\(\\Lambda_m^\\circ\\) cannot be found by extending the plot to zero.\n" +
        "- **Kohlrausch's law:** \\(\\Lambda_m^\\circ = \\nu_{+}\\lambda^\\circ_{+} + \\nu_{-}\\lambda^\\circ_{-}\\), where \\(\\nu\\) is the number of each ion in the formula.\n" +
        "- So \\(\\Lambda_m^\\circ\\) of a weak electrolyte comes from strong ones: \\(\\Lambda_m^\\circ(\\text{CH}_3\\text{COOH}) = \\Lambda_m^\\circ(\\text{CH}_3\\text{COONa}) + \\Lambda_m^\\circ(\\text{HCl}) - \\Lambda_m^\\circ(\\text{NaCl})\\).\n" +
        "- Some limiting ionic conductivities at 298 K (S cm² mol⁻¹): H⁺ 349.6, OH⁻ 199.1, K⁺ 73.5, Na⁺ 50.1, Ca²⁺ 119.0, Mg²⁺ 106.0, Cl⁻ 76.3, Br⁻ 78.1, CH₃COO⁻ 40.9, SO₄²⁻ 160.0.",
      formula: {
        label: "Dilution and Kohlrausch's law",
        latex: "\\Lambda_m = \\Lambda_m^\\circ - A\\sqrt{c}, \\qquad \\Lambda_m^\\circ = \\nu_{+}\\lambda^\\circ_{+} + \\nu_{-}\\lambda^\\circ_{-}",
        symbols: [
          { symbol: "\\(\\Lambda_m^\\circ\\)", meaning: "limiting molar conductivity, at infinite dilution" },
          { symbol: "\\(\\lambda^\\circ_{+}, \\lambda^\\circ_{-}\\)", meaning: "limiting molar conductivities of the cation and the anion" },
          { symbol: "\\(\\nu_{+}, \\nu_{-}\\)", meaning: "number of cations and anions in one formula unit" },
        ],
      },
      authoredExample: {
        prompt:
          "At infinite dilution, \\(\\Lambda_m^\\circ\\) of HCl, NaCl and CH₃COONa are 425.9, 126.4 and 91.0 S cm² mol⁻¹. Find \\(\\Lambda_m^\\circ\\) of acetic acid.",
        steps: [
          "Acetic acid needs H⁺ and CH₃COO⁻. HCl gives H⁺ and CH₃COONa gives CH₃COO⁻; the extra Na⁺ and Cl⁻ together make up NaCl.",
          "\\(\\Lambda_m^\\circ(\\text{CH}_3\\text{COOH}) = 91.0 + 425.9 - 126.4\\).",
          "\\(= 390.5\\ \\text{S cm}^2\\,\\text{mol}^{-1}\\).",
        ],
        answer: "390.5 S cm² mol⁻¹",
      },
      selfCheckExample: {
        prompt:
          "Given \\(\\lambda^\\circ(\\text{Ca}^{2+}) = 119.0\\) and \\(\\lambda^\\circ(\\text{Cl}^{-}) = 76.3\\) S cm² mol⁻¹, find \\(\\Lambda_m^\\circ\\) of CaCl₂.",
        steps: [
          "One formula unit gives one Ca²⁺ and two Cl⁻.",
          "\\(\\Lambda_m^\\circ = 119.0 + 2 \\times 76.3 = 271.6\\ \\text{S cm}^2\\,\\text{mol}^{-1}\\).",
        ],
        answer: "271.6 S cm² mol⁻¹",
      },
      practiceSet: [
        { prompt: "Find \\(\\Lambda_m^\\circ\\) of KCl from \\(\\lambda^\\circ(\\text{K}^{+}) = 73.5\\) and \\(\\lambda^\\circ(\\text{Cl}^{-}) = 76.3\\) S cm² mol⁻¹.", answer: "149.8 S cm² mol⁻¹" },
        { prompt: "Find \\(\\Lambda_m^\\circ\\) of MgSO₄ from \\(\\lambda^\\circ(\\text{Mg}^{2+}) = 106.0\\) and \\(\\lambda^\\circ(\\text{SO}_4^{2-}) = 160.0\\) S cm² mol⁻¹.", answer: "266.0 S cm² mol⁻¹" },
        { prompt: "Which shows a steep rise of molar conductivity at very low concentration: KCl or acetic acid?", answer: "Acetic acid (a weak electrolyte)" },
        { prompt: "Why can \\(\\Lambda_m^\\circ\\) of acetic acid not be found by extending its \\(\\Lambda_m\\) against \\(\\sqrt{c}\\) plot to zero?", answer: "The plot is not a straight line: Λm rises steeply near zero concentration" },
      ],
      pyqExampleId: "cf41ed07-85f5-44e1-976b-1c35dbf28f18",
      traps: [
        {
          title: "Count every ion in the formula",
          body: "For CaCl₂ the chloride term is counted twice: \\(\\Lambda_m^\\circ = \\lambda^\\circ(\\text{Ca}^{2+}) + 2\\lambda^\\circ(\\text{Cl}^{-})\\).",
        },
        {
          title: "Extending the plot works only for strong electrolytes",
          body: "A strong electrolyte gives a straight line against \\(\\sqrt{c}\\), so its intercept is \\(\\Lambda_m^\\circ\\). A weak electrolyte does not; its \\(\\Lambda_m^\\circ\\) comes from Kohlrausch's law.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchec-dissociation",
      name: "Degree of dissociation from molar conductivity",
      intuition:
        "A weak acid such as acetic acid is only partly split into ions. At infinite dilution it would be split completely, and then it would conduct at its full Λm°. At any real concentration it conducts at Λm, a fraction of that. That fraction is the share of molecules that have split, the degree of dissociation. Once you know it, the dissociation constant follows from the usual equilibrium expression.",
      definition:
        "- Degree of dissociation: \\(\\alpha = \\dfrac{\\Lambda_m}{\\Lambda_m^\\circ}\\).\n" +
        "- For a weak acid HA of concentration c: \\(K_a = \\dfrac{c\\alpha^2}{1 - \\alpha}\\).\n" +
        "- When \\(\\alpha\\) is small, \\(1 - \\alpha \\approx 1\\) and \\(K_a \\approx c\\alpha^2\\).\n" +
        "- Get \\(\\Lambda_m^\\circ\\) from Kohlrausch's law, as the sum of the ions' limiting conductivities.\n" +
        "- As a weak electrolyte is diluted, \\(\\alpha\\) increases.",
      formula: {
        label: "Degree of dissociation and Ka",
        latex: "\\alpha = \\frac{\\Lambda_m}{\\Lambda_m^\\circ}, \\qquad K_a = \\frac{c\\alpha^2}{1 - \\alpha}",
        symbols: [
          { symbol: "\\(\\alpha\\)", meaning: "fraction of the electrolyte split into ions" },
          { symbol: "\\(c\\)", meaning: "concentration of the weak acid, in mol L⁻¹" },
        ],
      },
      authoredExample: {
        prompt:
          "The conductivity of 0.001028 M acetic acid is \\(4.95 \\times 10^{-5}\\ \\text{S cm}^{-1}\\), and its \\(\\Lambda_m^\\circ\\) is 390.5 S cm² mol⁻¹. Find its dissociation constant.",
        steps: [
          "\\(\\Lambda_m = \\dfrac{1000 \\times 4.95 \\times 10^{-5}}{0.001028} = 48.15\\ \\text{S cm}^2\\,\\text{mol}^{-1}\\).",
          "\\(\\alpha = \\dfrac{48.15}{390.5} = 0.1233\\).",
          "\\(K_a = \\dfrac{0.001028 \\times (0.1233)^2}{1 - 0.1233} = \\dfrac{1.563 \\times 10^{-5}}{0.8767} = 1.78 \\times 10^{-5}\\ \\text{mol L}^{-1}\\).",
        ],
        answer: "\\(K_a = 1.78 \\times 10^{-5}\\ \\text{mol L}^{-1}\\)",
      },
      selfCheckExample: {
        prompt:
          "A 0.01 M weak monobasic acid is 4% dissociated. Find its dissociation constant.",
        steps: [
          "\\(\\alpha = 0.04\\) and \\(c = 0.01\\) M.",
          "\\(K_a = \\dfrac{0.01 \\times (0.04)^2}{1 - 0.04} = \\dfrac{1.6 \\times 10^{-5}}{0.96} = 1.67 \\times 10^{-5}\\).",
          "The shortcut \\(c\\alpha^2\\) gives \\(1.6 \\times 10^{-5}\\), close enough when \\(\\alpha\\) is this small.",
        ],
        answer: "\\(K_a \\approx 1.7 \\times 10^{-5}\\)",
      },
      practiceSet: [
        { prompt: "Write the degree of dissociation of a weak electrolyte in terms of its molar conductivities.", answer: "\\(\\alpha = \\Lambda_m/\\Lambda_m^\\circ\\)" },
        { prompt: "What happens to the degree of dissociation of acetic acid as its solution is diluted?", answer: "It increases" },
        { prompt: "A 0.1 M weak acid is 1% dissociated. Find \\(K_a\\), using \\(1 - \\alpha \\approx 1\\).", answer: "\\(1 \\times 10^{-5}\\)", method: "\\(0.1 \\times (0.01)^2\\)" },
        { prompt: "When may \\(1 - \\alpha\\) be replaced by 1 in the expression for \\(K_a\\)?", answer: "When α is small" },
      ],
      pyqExampleId: "6694c863-ae05-467f-836b-f4677570bba4",
      traps: [
        {
          title: "Divide by the limiting value",
          body: "\\(\\alpha = \\Lambda_m/\\Lambda_m^\\circ\\), the measured value over the value at infinite dilution. Turned the other way it comes out greater than 1, which no fraction can be.",
        },
        {
          title: "Square α in Ka",
          body: "\\(K_a = c\\alpha^2\\) for small α. Using \\(c\\alpha\\) gives an answer too large by a factor of \\(1/\\alpha\\).",
        },
      ],
    },
  ],
};

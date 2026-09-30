import type { SubtopicNote } from "@/app/notes/_types";

export const VANTHOFF_SOL_NOTE: SubtopicNote = {
  subtopicName: "Van't Hoff Factor and Abnormal Molar Mass",
  title: "Van't Hoff Factor and Abnormal Molar Mass",
  oneLineDefinition:
    "The van 't Hoff factor i is the number of particles a formula unit really gives in solution; it multiplies every colligative effect, exceeds 1 for dissociation and falls below 1 for association.",
  whyItMatters:
    "Twenty-eight PYQs, the largest page, eighteen of them numeric, and two from 2026. Seven rank solutions by boiling or freezing point, which is a count of particles; sixteen find i, a degree of dissociation or an acid's Ka from a measured shift; five treat a solute that associates, such as a carboxylic acid pairing up in benzene.",
  concepts: [
    // C1 — ranking by particle count
    {
      kind: "formula" as const,
      slug: "jcsol-particle-count",
      name: "Ranking solutions by particle concentration, i × m",
      intuition:
        "Every colligative effect counts particles. So to rank solutions by boiling point, freezing point or osmotic pressure, work out \\(i \\times\\) concentration for each and sort. A salt at a lower concentration can still beat a non-electrolyte at a higher one.",
      definition:
        "- Effective concentration \\(= i \\times m\\) (or \\(i \\times C\\)). The largest has the highest boiling point and the LOWEST freezing point.\n" +
        "- Complete dissociation: glucose, urea 1; NaCl, KI 2; \\(\\mathrm{CaCl_2}\\), \\(\\mathrm{K_2SO_4}\\) 3; \\(\\mathrm{AlCl_3}\\) 4; \\(\\mathrm{Al_2(SO_4)_3}\\) 5.\n" +
        "- \\(\\mathrm{KHSO_4}\\) gives \\(\\mathrm{K^+}\\) and \\(\\mathrm{HSO_4^-}\\), which ionises further, so its \\(i\\) lies between 2 and 3.\n" +
        "- A strong electrolyte's \\(i\\) rises towards its full ion count on dilution, because the ions attract each other less when far apart.\n" +
        "- When the solutions differ in both salt and concentration, compute each \\(i \\times m\\); do not rank by \\(i\\) alone.",
      formula: {
        label: "Colligative effects scale with particle concentration",
        latex: "\\Delta T_b = i K_b m \\qquad \\Delta T_f = i K_f m \\qquad \\pi = iCRT",
      },
      authoredExample: {
        prompt:
          "Arrange in increasing order of freezing point, assuming complete dissociation: 0.1 m glucose, 0.05 m \\(\\mathrm{K_2SO_4}\\), 0.04 m \\(\\mathrm{AlCl_3}\\), 0.06 m NaCl.",
        steps: [
          "\\(i \\times m\\): glucose \\(0.10\\); \\(\\mathrm{K_2SO_4}\\) \\(3 \\times 0.05 = 0.15\\); \\(\\mathrm{AlCl_3}\\) \\(4 \\times 0.04 = 0.16\\); NaCl \\(2 \\times 0.06 = 0.12\\).",
          "The largest \\(i \\times m\\) has the lowest freezing point.",
        ],
        answer: "\\(\\mathrm{AlCl_3} < \\mathrm{K_2SO_4} <\\) NaCl \\(<\\) glucose",
      },
      selfCheckExample: {
        prompt:
          "Rank by increasing boiling point, assuming complete dissociation: 1.5 g of urea (0.025 mol) in 100 mL of solution; 2.925 g of NaCl (0.05 mol) in 200 mL; 3.33 g of \\(\\mathrm{CaCl_2}\\) (0.03 mol) in 300 mL.",
        steps: [
          "Urea: 0.25 M \\(\\times 1 = 0.25\\).",
          "NaCl: 0.25 M \\(\\times 2 = 0.50\\).",
          "\\(\\mathrm{CaCl_2}\\): 0.1 M \\(\\times 3 = 0.30\\).",
        ],
        answer: "Urea \\(< \\mathrm{CaCl_2} <\\) NaCl",
      },
      practiceSet: [
        { prompt: "What is \\(i\\) for \\(\\mathrm{Al_2(SO_4)_3}\\) on complete dissociation?", answer: "\\(5\\)" },
        { prompt: "Which 0.1 M solution has the largest freezing-point depression: glucose, KCl or \\(\\mathrm{K_2SO_4}\\)?", answer: "\\(\\mathrm{K_2SO_4}\\)" },
        { prompt: "Whose \\(i\\) is closer to 2: 0.1 M NaCl or 0.001 M NaCl?", answer: "0.001 M NaCl" },
        { prompt: "What is \\(i \\times m\\) for 0.02 m \\(\\mathrm{MgCl_2}\\), fully dissociated?", answer: "\\(0.06\\)" },
      ],
      pyqExampleId: "87beb5d6-3641-4328-886c-85ebc3707424", // 2026 — four solutions by mass and volume, order of boiling point
      traps: [
        {
          title: "Ten times the concentration beats twice the ions",
          body: "0.01 M KCl has \\(iC = 0.02\\); 0.001 M KCl has \\(0.002\\). Two solutions of the same salt are not about equal when one is ten times as concentrated. Compute \\(i \\times C\\) for each.",
        },
        {
          title: "Dilution raises a strong electrolyte's i",
          body: "For NaCl at 0.1, 0.01 and 0.001 M, \\(i\\) increases towards 2 as the solution gets more dilute. The reversed order is the planted option.",
        },
      ],
    },

    // C2 — dissociation
    {
      kind: "formula" as const,
      slug: "jcsol-dissociation",
      name: "Van 't Hoff factor for dissociation, i = 1 + (n − 1)α",
      intuition:
        "Start with one mole. A fraction \\(\\alpha\\) splits into \\(n\\) ions and the rest stays whole, so the particles are \\(1 - \\alpha + n\\alpha = 1 + (n - 1)\\alpha\\). A measured shift divided by the expected shift gives \\(i\\), and \\(i\\) gives \\(\\alpha\\).",
      definition:
        "- \\(i = \\dfrac{\\text{observed shift}}{\\text{expected shift}} = \\dfrac{\\text{normal molar mass}}{\\text{observed molar mass}}\\).\n" +
        "- Dissociation into \\(n\\) ions: \\(i = 1 + (n - 1)\\alpha\\), so \\(\\alpha = \\dfrac{i - 1}{n - 1}\\). For \\(\\mathrm{MX_2}\\) or \\(\\mathrm{A_2B}\\), \\(n = 3\\); for \\(\\mathrm{MX_3}\\), \\(n = 4\\).\n" +
        "- Weak monobasic acid HA: \\(i = 1 + \\alpha\\), \\(K_a = \\dfrac{C\\alpha^2}{1 - \\alpha}\\), and \\(\\alpha \\approx \\sqrt{K_a/C}\\) when \\(\\alpha\\) is small.\n" +
        "- The observed shift is \\((i - 1) \\times 100\\%\\) above the expected one: \\(\\alpha = 0.2\\) for HA makes it 20% larger.\n" +
        "- A precipitate removes its ions from solution, so recount the particles after it forms.",
      formula: {
        label: "Degree of dissociation",
        latex: "i = 1 + (n - 1)\\alpha \\qquad \\alpha = \\frac{i - 1}{n - 1} \\qquad K_a = \\frac{C\\alpha^2}{1 - \\alpha}",
      },
      authoredExample: {
        prompt:
          "A 0.2 m aqueous solution of \\(\\mathrm{AB_2}\\) (\\(\\mathrm{AB_2 \\rightarrow A^{2+} + 2B^-}\\)) freezes at \\(-0.93\\) °C. Find \\(i\\) and the degree of dissociation (\\(K_f = 1.86\\) K kg/mol).",
        steps: [
          "Expected \\(\\Delta T_f = 1.86 \\times 0.2 = 0.372\\) K.",
          "\\(i = 0.93/0.372 = 2.5\\).",
          "\\(n = 3\\): \\(\\alpha = \\dfrac{2.5 - 1}{2} = 0.75\\).",
        ],
        answer: "\\(i = 2.5\\), \\(\\alpha = 0.75\\) (75%)",
      },
      selfCheckExample: {
        prompt:
          "A 0.1 m solution of a weak monobasic acid HA freezes at \\(-0.2046\\) °C. Taking molarity equal to molality, find \\(\\alpha\\) and \\(K_a\\) (\\(K_f = 1.86\\) K kg/mol).",
        steps: [
          "Expected \\(\\Delta T_f = 0.186\\) K, so \\(i = 0.2046/0.186 = 1.1\\) and \\(\\alpha = 0.1\\).",
          "\\(K_a = \\dfrac{0.1 \\times 0.1^2}{1 - 0.1} = \\dfrac{10^{-3}}{0.9} = 1.11 \\times 10^{-3}\\).",
        ],
        answer: "\\(\\alpha = 0.1\\), \\(K_a \\approx 1.1 \\times 10^{-3}\\)",
      },
      practiceSet: [
        { prompt: "A salt \\(\\mathrm{MX_3}\\) is 50% dissociated. What is \\(i\\)?", answer: "\\(2.5\\)" },
        { prompt: "KCl has \\(i = 1.8\\). What is its degree of dissociation?", answer: "\\(0.8\\)" },
        { prompt: "A weak monobasic acid is 20% dissociated. What is \\(i\\)?", answer: "\\(1.2\\)" },
        { prompt: "A solute that splits into two ions shows an observed molar mass of 40 against a formula mass of 60. What is \\(\\alpha\\)?", answer: "\\(i = 1.5\\), so \\(\\alpha = 0.5\\)" },
      ],
      pyqExampleId: "202a8c03-bdeb-4ed0-8bdd-1f2ea661f99f", // 2026 — fluoroacetic acid, Ka from the freezing point
      traps: [
        {
          title: "Divide by n − 1, not by n",
          body: "\\(\\alpha = (i - 1)/(n - 1)\\). For \\(\\mathrm{MX_3}\\) with \\(i = 1.9\\), \\(\\alpha = 0.9/3 = 0.3\\), not \\(0.9/4\\). For a two-ion salt it is simply \\(i - 1\\).",
        },
        {
          title: "Count the ions from the formula",
          body: "\\(\\mathrm{MX_2}\\) and \\(\\mathrm{A_2B}\\) give three ions each; \\(\\mathrm{MX_3}\\) gives four. Using \\(n = 2\\) for every salt gives the wrong degree of dissociation.",
        },
        {
          title: "Observed molar mass is LOWER for dissociation",
          body: "More particles mean a larger shift and so a smaller apparent molar mass: \\(M_{\\text{obs}} = M_{\\text{normal}}/i\\). If your observed mass came out larger than the formula mass for a salt, the ratio is upside down.",
        },
      ],
    },

    // C3 — association
    {
      kind: "formula" as const,
      slug: "jcsol-association",
      name: "Van 't Hoff factor for association, i = 1 − (1 − 1/n)α",
      intuition:
        "When molecules pair up, two become one particle, so the count falls. Carboxylic acids do this in benzene: two molecules hold each other by two hydrogen bonds. The shift is smaller than expected and the apparent molar mass is larger.",
      definition:
        "- Association into \\(n\\)-mers: \\(i = 1 - \\alpha + \\dfrac{\\alpha}{n} = 1 - \\left(1 - \\dfrac{1}{n}\\right)\\alpha\\).\n" +
        "- Dimers (\\(n = 2\\)): \\(i = 1 - \\dfrac{\\alpha}{2}\\), so \\(\\alpha = 2(1 - i)\\).\n" +
        "- Complete association: \\(i = 1/n\\). Benzoic acid and acetic acid in benzene give \\(i \\approx 0.5\\): dimers.\n" +
        "- Observed molar mass \\(= M/i\\), larger than the formula mass.\n" +
        "- Mixed fates add: if 40% of HA dimerises and the other 60% splits into two ions, \\(i = 0.2 + 1.2 = 1.4\\).",
      formula: {
        label: "Degree of association",
        latex: "i = 1 - \\left(1 - \\frac{1}{n}\\right)\\alpha \\qquad \\text{dimer: } i = 1 - \\frac{\\alpha}{2}",
      },
      authoredExample: {
        prompt:
          "1.2 g of acetic acid (M = 60) in 50 g of benzene lowers its freezing point by 1.28 K (\\(K_f = 5.12\\) K kg/mol). Find the percent association into dimers and the observed molar mass.",
        steps: [
          "\\(m = \\dfrac{0.02}{0.050} = 0.4\\) mol/kg; expected \\(\\Delta T_f = 5.12 \\times 0.4 = 2.048\\) K.",
          "\\(i = 1.28/2.048 = 0.625\\).",
          "\\(\\alpha = 2(1 - 0.625) = 0.75\\). Observed molar mass \\(= 60/0.625 = 96\\).",
        ],
        answer: "75% associated; observed molar mass 96 g/mol",
      },
      selfCheckExample: {
        prompt:
          "3.66 g of benzoic acid (M = 122) in 60 g of benzene lowers the freezing point by 1.28 K (\\(K_f = 5.12\\) K kg/mol). Assuming complete association, how many molecules form each unit?",
        steps: [
          "\\(m = \\dfrac{0.03}{0.060} = 0.5\\) mol/kg; expected \\(\\Delta T_f = 2.56\\) K.",
          "\\(i = 1.28/2.56 = 0.5 = 1/n\\).",
        ],
        answer: "\\(n = 2\\) (dimers)",
      },
      practiceSet: [
        { prompt: "A solute dimerises with \\(\\alpha = 0.6\\). What is \\(i\\)?", answer: "\\(0.7\\)" },
        { prompt: "A solute is completely associated and \\(i = 0.5\\). How many molecules are in each unit?", answer: "\\(2\\)" },
        { prompt: "A solute shows an observed molar mass of 120 against a formula mass of 60. What is \\(i\\)?", answer: "\\(0.5\\)" },
        { prompt: "A solute trimerises with \\(\\alpha = 0.9\\). What is \\(i\\)?", answer: "\\(0.4\\)" },
      ],
      pyqExampleId: "bdfd2015-b418-4fe6-b37f-ae2f469d387e", // 2022 — associating solute, percent association from ΔTf
      traps: [
        {
          title: "A dimer halves, it does not vanish",
          body: "For dimerisation \\(i = 1 - \\alpha/2\\), not \\(1 - \\alpha\\). With \\(i = 0.7\\), \\(\\alpha = 0.6\\); using \\(1 - \\alpha\\) gives 0.3 and a wrong percentage.",
        },
        {
          title: "Association raises the apparent molar mass",
          body: "Fewer particles give a smaller shift, so the molar mass worked out from it is too LARGE: about twice the formula mass for a fully dimerised acid.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const RLVP_SOL_NOTE: SubtopicNote = {
  subtopicName: "Relative Lowering of Vapour Pressure",
  title: "Relative Lowering of Vapour Pressure",
  oneLineDefinition:
    "A non-volatile solute lowers the solvent's vapour pressure, and the fractional lowering (p° − p)/p° equals the mole fraction of the solute.",
  whyItMatters:
    "Eleven PYQs, seven of them numeric, and four from 2026. Seven apply the relative lowering directly to find a vapour pressure, a mass of solute or a number of moles; four reach it through a boiling-point elevation, because both depend on the same moles of solute. The skill that decides these is counting the solvent's moles correctly.",
  concepts: [
    // C1 — relative lowering from moles
    {
      kind: "formula" as const,
      slug: "jcsol-rlvp",
      name: "Relative lowering of vapour pressure equals the solute's mole fraction",
      intuition:
        "Only solvent molecules can escape from the surface, and a non-volatile solute takes up part of it. The solution's vapour pressure is the solvent's share times \\(p^\\circ\\), so the fraction lost is the solute's share.",
      definition:
        "- \\(p = x_1 p^\\circ\\), so \\(\\dfrac{p^\\circ - p}{p^\\circ} = x_2 = \\dfrac{n_2}{n_1 + n_2}\\).\n" +
        "- Dilute form: \\(\\dfrac{p^\\circ - p}{p^\\circ} \\approx \\dfrac{n_2}{n_1}\\). Use it when the stem says the solution is dilute or the solute amount is negligible.\n" +
        "- Electrolyte: replace \\(n_2\\) by \\(i\\,n_2\\), where \\(i\\), the van 't Hoff factor, is the number of particles each formula unit gives (NaCl fully dissociated: \\(i = 2\\); for example \\(\\mathrm{MgCl_2}\\) with 80% dissociation has \\(i = 2.6\\)).\n" +
        "- Percent w/v: grams of solute per 100 mL of SOLUTION. Mass of solvent \\(=\\) density \\(\\times\\) volume \\(-\\) mass of solute.",
      formula: {
        label: "Raoult's law for a non-volatile solute",
        latex: "\\frac{p^\\circ - p}{p^\\circ} = x_2 = \\frac{n_2}{n_1 + n_2} \\approx \\frac{n_2}{n_1}",
      },
      authoredExample: {
        prompt:
          "15 g of urea (M = 60 g/mol) is dissolved in 85.5 g of water. The vapour pressure of pure water is 32 mmHg. Find the vapour pressure of the solution.",
        steps: [
          "Urea: \\(15/60 = 0.25\\) mol. Water: 85.5 g is 4.75 mol.",
          "\\(x_2 = \\dfrac{0.25}{4.75 + 0.25} = 0.05\\).",
          "Lowering \\(= 0.05 \\times 32 = 1.6\\) mmHg, so \\(p = 32 - 1.6 = 30.4\\) mmHg.",
        ],
        answer: "\\(30.4\\) mmHg",
      },
      selfCheckExample: {
        prompt:
          "5.85 g of NaCl (M = 58.5 g/mol, complete dissociation) is dissolved in 144 g of water, whose vapour pressure is 20 mmHg. Using the dilute form, find the vapour pressure of the solution.",
        steps: [
          "NaCl: 0.1 mol, and \\(i = 2\\), so 0.2 mol of ions. Water: 144 g is 8 mol.",
          "\\(\\dfrac{p^\\circ - p}{p^\\circ} \\approx \\dfrac{i\\,n_2}{n_1} = \\dfrac{0.2}{8} = 0.025\\).",
          "\\(p = 20(1 - 0.025) = 19.5\\) mmHg.",
        ],
        answer: "\\(19.5\\) mmHg",
      },
      practiceSet: [
        { prompt: "0.1 mol of a non-volatile solute is dissolved in 0.9 mol of solvent. What is the relative lowering of vapour pressure?", answer: "\\(0.1\\)" },
        { prompt: "A solvent has \\(p^\\circ = 50\\) mmHg and the relative lowering is 0.02. What is the solution's vapour pressure?", answer: "\\(49\\) mmHg" },
        { prompt: "The relative lowering of vapour pressure equals the mole fraction of which component?", answer: "The solute" },
        { prompt: "A 20% w/v aqueous solution has density 1.15 g/mL. What mass of water is in 100 mL of it?", answer: "\\(115 - 20 = 95\\) g" },
      ],
      pyqExampleId: "6fc2bc1d-1e53-4d5d-a2c9-543acb00337b", // 2023 — 30% w/v glucose with the solution's density
      traps: [
        {
          title: "Solute's mole fraction, or solvent's?",
          body: "The relative lowering is the SOLUTE's mole fraction; the solution's vapour pressure divided by \\(p^\\circ\\) is the SOLVENT's. If the solute's mole fraction is 0.4, the solvent's is 0.6. Read which one the question asks for.",
        },
        {
          title: "Mass of solution is not mass of solvent",
          body: "In a w/v solution, 100 mL of solution weighs density times 100 mL, and the solute's mass must be taken out to get the solvent's. Using the solution's full mass overcounts the water.",
        },
        {
          title: "An electrolyte multiplies the solute's moles",
          body: "A salt that dissociates gives \\(i\\) particles per formula unit. Leaving out \\(i\\) for \\(\\mathrm{MgCl_2}\\) or NaCl gives a lowering that is too small.",
        },
      ],
    },

    // C2 — linked to boiling point elevation
    {
      kind: "formula" as const,
      slug: "jcsol-rlvp-linked",
      name: "Relative lowering of vapour pressure from a boiling-point elevation",
      intuition:
        "Both effects count the same solute particles. The elevation gives the molality, the molality gives the solute's moles in the solvent, and the solvent's own moles come from its molar mass. From there the relative lowering is one division.",
      definition:
        "- Molality from the elevation: \\(m = \\dfrac{\\Delta T_b}{K_b}\\).\n" +
        "- Moles of solute \\(= m \\times\\) kg of solvent; moles of solvent \\(=\\) grams of solvent \\(/M_1\\).\n" +
        "- Dilute form in one line: \\(\\dfrac{p^\\circ - p}{p^\\circ} \\approx \\dfrac{n_2}{n_1} = \\dfrac{m M_1}{1000}\\), with \\(M_1\\) in g/mol.\n" +
        "- The exact form \\(\\dfrac{n_2}{n_1 + n_2}\\) differs only in the third significant figure for a dilute solution.",
      formula: {
        label: "Linking the two colligative effects",
        latex: "\\frac{p^\\circ - p}{p^\\circ} \\approx \\frac{m\\,M_1}{1000} = \\frac{\\Delta T_b\\,M_1}{1000\\,K_b}",
      },
      authoredExample: {
        prompt:
          "A non-volatile solute raises the boiling point of benzene (\\(K_b = 2.53\\) K kg/mol, M = 78 g/mol) by 0.506 K. Find the relative lowering of the vapour pressure of benzene.",
        steps: [
          "\\(m = 0.506/2.53 = 0.2\\) mol/kg.",
          "In 1 kg of benzene: solute 0.2 mol, benzene \\(1000/78 = 12.82\\) mol.",
          "\\(\\dfrac{p^\\circ - p}{p^\\circ} \\approx \\dfrac{0.2}{12.82} = 0.0156\\).",
        ],
        answer: "About \\(1.56 \\times 10^{-2}\\)",
      },
      selfCheckExample: {
        prompt:
          "A dilute aqueous solution of a non-volatile non-electrolyte shows a relative lowering of vapour pressure of 0.0027. Find the elevation of its boiling point (\\(K_b = 0.52\\) K kg/mol for water).",
        steps: [
          "\\(m = \\dfrac{0.0027 \\times 1000}{18} = 0.15\\) mol/kg.",
          "\\(\\Delta T_b = 0.52 \\times 0.15 = 0.078\\) K.",
        ],
        answer: "\\(0.078\\) K",
      },
      practiceSet: [
        { prompt: "An aqueous solution has \\(\\Delta T_b = 1.04\\) K and \\(K_b = 0.52\\) K kg/mol. What is its molality?", answer: "\\(2\\) mol/kg" },
        { prompt: "A 1 mol/kg aqueous solution: about how many moles of solute per mole of water?", answer: "\\(1/55.56 \\approx 0.018\\)" },
        { prompt: "What is the relative lowering for a 0.5 mol/kg solution in a solvent of molar mass 100 g/mol?", answer: "About \\(0.05\\)" },
        { prompt: "A solution of molality 2 mol/kg contains 0.25 kg of solvent. How many moles of solute does it hold?", answer: "\\(0.5\\) mol" },
      ],
      pyqExampleId: "d1705ac1-4099-4fba-a668-0a40ce43f951", // 2026 — elevation in solvent Y, relative lowering asked
      traps: [
        {
          title: "Moles of solute come from the elevation, not from a molar mass",
          body: "When the solute's molar mass is not given, the only route to its moles is \\(m = \\Delta T_b/K_b\\) times the kilograms of solvent. Look for the molar mass of the SOLVENT instead: it is what turns grams of solvent into moles.",
        },
        {
          title: "Kilograms for molality, grams for moles of solvent",
          body: "Molality uses kilograms of solvent; moles of solvent use grams divided by its molar mass. Mixing the two gives an answer off by a factor of 1000.",
        },
      ],
    },
  ],
};

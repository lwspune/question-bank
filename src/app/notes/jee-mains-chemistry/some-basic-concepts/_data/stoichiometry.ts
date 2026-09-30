import type { SubtopicNote } from "@/app/notes/_types";

export const STOICHIOMETRY_SBC_NOTE: SubtopicNote = {
  subtopicName: "Reaction Stoichiometry and Limiting Reagent",
  title: "Reaction Stoichiometry and Limiting Reagent",
  oneLineDefinition:
    "Mass, mole and volume relations from a balanced equation, with purity and yield, and finding which reactant runs out first.",
  whyItMatters:
    "Thirty-four PYQs, half of them multiple choice and six from 2026, which makes this the chapter's largest page. Eighteen turn a mass of one substance into a mass, mole or volume of another, often with a purity or a yield. Sixteen give two reactants and ask which runs out first and how much of the other is left. Both rest on the same mole ratio.",
  concepts: [
    // C1 — mole ratios, purity, yield
    {
      kind: "formula" as const,
      slug: "jcsbc-mass-relations",
      name: "Mole ratios, purity and yield",
      intuition:
        "A balanced equation is a recipe in moles. Convert the given mass to moles, scale by the ratio of coefficients, and convert back. Purity trims the amount you start with; yield trims the amount you end with.",
      definition:
        "- For \\(a\\,\\mathrm{A}\\rightarrow b\\,\\mathrm{B}\\): \\(n_B=n_A\\times\\frac{b}{a}\\). Balance the equation first.\n" +
        "- Purity: use only the pure part, \\(m_{\\text{pure}}=\\frac{\\%}{100}\\times m\\).\n" +
        "- \\(\\%\\text{ yield}=\\frac{\\text{actual}}{\\text{theoretical}}\\times100\\).\n" +
        "- Residues on heating: \\(\\mathrm{CaCO_3\\rightarrow CaO}\\) keeps 56 g of every 100 g; \\(\\mathrm{MgCO_3\\rightarrow MgO}\\) keeps 40 g of every 84 g.\n" +
        "- \\(\\mathrm{Ag_2CO_3}\\) leaves metallic silver, because the \\(\\mathrm{Ag_2O}\\) formed also decomposes.\n" +
        "- A mixture of two carbonates: two unknowns, two equations (total mass and residue mass).",
      formula: {
        label: "Mass to mass",
        latex: "m_B=\\frac{m_A}{M_A}\\times\\frac{b}{a}\\times M_B",
      },
      authoredExample: {
        prompt: "What mass of \\(\\mathrm{O_2}\\) burns \\(11\\) g of propane, and what mass of \\(\\mathrm{CO_2}\\) forms? \\(\\mathrm{C_3H_8+5O_2\\rightarrow3CO_2+4H_2O}\\).",
        steps: [
          "\\(n(\\mathrm{C_3H_8})=\\frac{11}{44}=0.25\\) mol.",
          "\\(\\mathrm{O_2}\\): \\(0.25\\times5=1.25\\) mol \\(=40\\) g.",
          "\\(\\mathrm{CO_2}\\): \\(0.25\\times3=0.75\\) mol \\(=33\\) g.",
        ],
        answer: "\\(40\\) g of \\(\\mathrm{O_2}\\); \\(33\\) g of \\(\\mathrm{CO_2}\\).",
      },
      selfCheckExample: {
        prompt: "Heating \\(50\\) g of \\(90\\%\\) pure \\(\\mathrm{CaCO_3}\\) gives \\(21\\) g of CaO. Find the percentage yield.",
        steps: [
          "Pure \\(\\mathrm{CaCO_3}=45\\) g \\(=0.45\\) mol.",
          "Theoretical CaO \\(=0.45\\times56=25.2\\) g.",
          "Yield \\(=\\frac{21}{25.2}\\times100=83.3\\%\\).",
        ],
        answer: "\\(83.3\\%\\).",
      },
      practiceSet: [
        { prompt: "Moles of \\(\\mathrm{CO_2}\\) from burning 2 mol of \\(\\mathrm{C_2H_6}\\)?", answer: "4" },
        { prompt: "Mass of CaO from 10 g of \\(\\mathrm{CaCO_3}\\)?", answer: "\\(5.6\\) g" },
        { prompt: "Moles of \\(\\mathrm{H_2}\\) from 2 mol of Al with excess HCl?", answer: "3" },
        { prompt: "Theoretical 40 g, actual 30 g. Yield?", answer: "\\(75\\%\\)" },
      ],
      pyqExampleId: "6a3df0b4-bd9e-4f92-9ffd-868de6925cee", // 2 Apr 2026 S1 — iron converted to Fe3O4 by steam
      traps: [
        {
          title: "Silver carbonate leaves silver",
          body: "\\(\\mathrm{Ag_2CO_3}\\) gives \\(\\mathrm{Ag_2O}\\), and \\(\\mathrm{Ag_2O}\\) loses its oxygen too on strong heating. The residue is metallic silver: 2 mol of Ag per mole of carbonate.",
        },
        {
          title: "Using the impure mass",
          body: "A '75% pure' sample reacts only through its pure part. Scale the mass down before converting to moles, not after.",
        },
      ],
    },

    // C2 — limiting reagent
    {
      kind: "formula" as const,
      slug: "jcsbc-limiting",
      name: "Limiting reagent and the excess left",
      intuition:
        "Divide each reactant's moles by its coefficient. The smallest result runs out first and fixes how much product forms. The other reactant is left over by whatever it did not need.",
      definition:
        "- Limiting reagent: the smallest \\(\\frac{n}{\\text{coefficient}}\\), not the smallest \\(n\\).\n" +
        "- Work out every product from the limiting reagent only.\n" +
        "- Excess left \\(=\\) supplied \\(-\\) used, where used \\(=\\) the limiting moles \\(\\times\\) the coefficient ratio.\n" +
        "- The molar mass of \\(\\mathrm{AB_2}\\) is \\(M_A+2M_B\\).\n" +
        "- Gases in a closed vessel at fixed volume and temperature: partial pressures behave like moles.",
      formula: {
        label: "Limiting reagent test",
        latex: "\\text{limiting reagent}=\\text{the smallest }\\frac{n_i}{\\nu_i}",
      },
      authoredExample: {
        prompt: "\\(4.8\\) g of Mg is heated with \\(4.0\\) g of \\(\\mathrm{O_2}\\): \\(\\mathrm{2Mg+O_2\\rightarrow2MgO}\\). Find the limiting reagent, the mass of MgO and the \\(\\mathrm{O_2}\\) left.",
        steps: [
          "Mg: \\(\\frac{4.8}{24}=0.2\\) mol, and \\(\\frac{0.2}{2}=0.1\\). \\(\\mathrm{O_2}\\): \\(\\frac{4.0}{32}=0.125\\) mol, and \\(\\frac{0.125}{1}=0.125\\).",
          "Mg has the smaller quotient, so it is limiting. MgO \\(=0.2\\) mol \\(=0.2\\times40=8.0\\) g.",
          "\\(\\mathrm{O_2}\\) used \\(=0.1\\) mol, so \\(0.025\\) mol \\(=0.8\\) g is left.",
        ],
        answer: "Mg is limiting; \\(8.0\\) g of MgO; \\(0.8\\) g of \\(\\mathrm{O_2}\\) left.",
      },
      selfCheckExample: {
        prompt: "\\(2\\) g of \\(\\mathrm{H_2}\\) and \\(24\\) g of \\(\\mathrm{O_2}\\) react: \\(\\mathrm{2H_2+O_2\\rightarrow2H_2O}\\). Which runs out, and how much water forms?",
        steps: [
          "\\(\\mathrm{H_2}\\): 1 mol, \\(\\frac{1}{2}=0.5\\). \\(\\mathrm{O_2}\\): \\(0.75\\) mol, \\(\\frac{0.75}{1}=0.75\\).",
          "\\(\\mathrm{H_2}\\) is limiting, though it has more moles. Water \\(=1\\) mol \\(=18\\) g; \\(0.25\\) mol \\(=8\\) g of \\(\\mathrm{O_2}\\) is left.",
        ],
        answer: "\\(\\mathrm{H_2}\\) runs out; \\(18\\) g of water.",
      },
      practiceSet: [
        { prompt: "2 mol \\(\\mathrm{H_2}\\) and 2 mol \\(\\mathrm{O_2}\\) form water. Limiting?", answer: "\\(\\mathrm{H_2}\\)" },
        { prompt: "\\(\\mathrm{A+2B\\rightarrow AB_2}\\) with 3 mol A and 4 mol B. Moles of \\(\\mathrm{AB_2}\\)?", answer: "2" },
        { prompt: "1 mol \\(\\mathrm{N_2}\\) and 1 mol \\(\\mathrm{H_2}\\). Moles of \\(\\mathrm{NH_3}\\)?", answer: "\\(\\frac{2}{3}\\)" },
        { prompt: "Molar mass of \\(\\mathrm{AB_2}\\) if A \\(=40\\), B \\(=35.5\\)?", answer: "\\(111\\) g mol\\(^{-1}\\)" },
      ],
      pyqExampleId: "37101706-9854-4433-b7f7-3c0995ea1450", // 22 Jan 2026 S2 — A + 2B → AB2, which statements are correct
      traps: [
        {
          title: "Fewest moles is not the test",
          body: "Compare \\(\\frac{n}{\\text{coefficient}}\\). In \\(\\mathrm{N_2+3H_2}\\), \\(0.5\\) mol of \\(\\mathrm{N_2}\\) and \\(1.2\\) mol of \\(\\mathrm{H_2}\\): \\(\\mathrm{H_2}\\) runs out (\\(0.4<0.5\\)) although it has more moles.",
        },
        {
          title: "Product from the excess reagent",
          body: "Working the product from the reactant in excess gives a larger answer, and it is always one of the options.",
        },
      ],
    },
  ],
};

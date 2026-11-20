import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_SB_STOICHIOMETRY_NOTE: SubtopicNote = {
  subtopicName: "Stoichiometry",
  title: "Stoichiometry",
  oneLineDefinition:
    "Using a balanced equation to find masses and volumes of reactants and products, with impure reactants, solutions, limiting reagents and reactions between gases.",
  whyItMatters:
    "Five NEET questions, from 2022 to 2026. Two start from an impure reactant: 95% pure CaCO₃ to neutralise 50 mL of 0.5 M HCl (NEET 2022) and 20% pure limestone heated to give CO₂ (NEET 2023). One finds the NaOH left after 1 g of it reacts with 25 mL of 0.75 M HCl (NEET 2024), one burns 116 g of butane (Re-NEET 2026), and one finds the gases left after CO₂ passes over hot coke (NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchsb-mass-mass",
      name: "Mole ratios from a balanced equation",
      intuition:
        "A balanced equation is a recipe written in moles. Its coefficients say how many moles of each substance react or form, not how many grams. So every problem has three steps: grams to moles, moles across the equation by the coefficients, moles back to grams.",
      definition:
        "- **Balance the equation first.** The same number of each kind of atom must appear on both sides.\n" +
        "- The coefficients give the **mole ratio**: in \\(\\text{CH}_4 + 2\\text{O}_2 \\rightarrow \\text{CO}_2 + 2\\text{H}_2\\text{O}\\), 1 mol of methane needs 2 mol of oxygen and gives 1 mol of \\(\\text{CO}_2\\) and 2 mol of water.\n" +
        "- In masses the same equation reads 16 g of methane + 64 g of oxygen gives 44 g of \\(\\text{CO}_2\\) + 36 g of water: mass is conserved, but the masses are not in the ratio 1 : 2 : 1 : 2.\n" +
        "- **Method:** given mass \\(\\rightarrow\\) moles \\(\\rightarrow\\) multiply by the ratio of coefficients \\(\\rightarrow\\) moles of the wanted substance \\(\\rightarrow\\) mass.",
      formula: {
        label: "Mass to mass through moles",
        latex: "n_B = n_A \\times \\frac{b}{a}, \\qquad m_B = n_B \\times M_B \\quad (a\\text{A} \\rightarrow b\\text{B})",
        symbols: [
          { symbol: "\\(a, b\\)", meaning: "coefficients of A and B in the balanced equation" },
          { symbol: "\\(n_A, n_B\\)", meaning: "moles of A used and of B formed" },
          { symbol: "\\(M_B\\)", meaning: "molar mass of B" },
        ],
      },
      authoredExample: {
        prompt: "Potassium chlorate decomposes on heating: \\(2\\text{KClO}_3 \\rightarrow 2\\text{KCl} + 3\\text{O}_2\\). What mass of oxygen forms from 24.5 g of \\(\\text{KClO}_3\\) (molar mass 122.5 g mol\\(^{-1}\\))?",
        steps: [
          "Moles of \\(\\text{KClO}_3 = \\dfrac{24.5}{122.5} = 0.2\\) mol.",
          "2 mol of \\(\\text{KClO}_3\\) give 3 mol of \\(\\text{O}_2\\), so 0.2 mol gives \\(0.2 \\times \\dfrac{3}{2} = 0.3\\) mol.",
          "Mass of \\(\\text{O}_2 = 0.3 \\times 32 = 9.6\\) g.",
        ],
        answer: "9.6 g of oxygen",
      },
      selfCheckExample: {
        prompt: "For \\(\\text{N}_2 + 3\\text{H}_2 \\rightarrow 2\\text{NH}_3\\), what mass of hydrogen is needed to make 34 g of ammonia (N = 14, H = 1)?",
        steps: [
          "Moles of \\(\\text{NH}_3 = \\dfrac{34}{17} = 2\\) mol.",
          "2 mol of \\(\\text{NH}_3\\) need 3 mol of \\(\\text{H}_2\\), which weighs \\(3 \\times 2 = 6\\) g.",
        ],
        answer: "6 g of hydrogen",
      },
      practiceSet: [
        { prompt: "In \\(2\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O}\\), how many moles of oxygen react with 4 mol of hydrogen?", answer: "2 mol" },
        { prompt: "What mass of water forms when 4 g of hydrogen burns completely in oxygen (\\(2\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O}\\))?", answer: "36 g", method: "2 mol of \\(\\text{H}_2\\) give 2 mol of water." },
        { prompt: "Balance \\(\\text{Fe} + \\text{O}_2 \\rightarrow \\text{Fe}_2\\text{O}_3\\).", answer: "\\(4\\text{Fe} + 3\\text{O}_2 \\rightarrow 2\\text{Fe}_2\\text{O}_3\\)" },
        { prompt: "For \\(\\text{CaCO}_3 \\rightarrow \\text{CaO} + \\text{CO}_2\\), how many moles of CaO form from 0.5 mol of \\(\\text{CaCO}_3\\)?", answer: "0.5 mol" },
      ],
      pyqExampleId: "80d3d0ca-4efa-4dcb-98c2-f2cdcacedc6a",
      traps: [
        {
          title: "Coefficients are moles, not grams",
          body: "In \\(\\text{CH}_4 + 2\\text{O}_2 \\rightarrow \\text{CO}_2 + 2\\text{H}_2\\text{O}\\), 16 g of methane needs 64 g of oxygen, not 32 g. Turn grams into moles before you use the coefficients.",
        },
        {
          title: "An unbalanced equation gives a wrong ratio",
          body: "Balance the equation before reading any ratio from it. Burning \\(\\text{C}_4\\text{H}_{10}\\) gives 4 mol of \\(\\text{CO}_2\\) per mole only once the equation is balanced.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchsb-purity",
      name: "Impure reactants and solutions",
      intuition:
        "Only the pure part of a sample reacts. So before you turn a mass into moles, cut it down to the pure substance it contains. For a reactant in solution, the moles come from the concentration and the volume instead of from a mass.",
      definition:
        "- **Percentage purity** \\(= \\dfrac{\\text{mass of pure substance}}{\\text{mass of sample}} \\times 100\\). The impurities are taken not to react.\n" +
        "- Mass of pure substance \\(= \\dfrac{\\text{purity}}{100} \\times\\) mass of sample.\n" +
        "- Working back: mass of sample needed \\(= \\dfrac{\\text{mass of pure substance needed}}{\\text{purity}/100}\\).\n" +
        "- **Molarity** (M) is moles of solute per litre of solution, so moles in a solution \\(= M \\times V\\) in litres. (Molarity is taught in full in Solutions.)",
      formula: {
        label: "Purity and moles in solution",
        latex: "m_{\\text{pure}} = \\frac{\\text{purity}}{100} \\times m_{\\text{sample}}, \\qquad n = M \\times V(\\text{L})",
      },
      authoredExample: {
        prompt: "10 g of zinc that is 65% pure reacts with excess dilute HCl: \\(\\text{Zn} + 2\\text{HCl} \\rightarrow \\text{ZnCl}_2 + \\text{H}_2\\). What volume of hydrogen forms at STP (Zn = 65)?",
        steps: [
          "Pure zinc \\(= \\dfrac{65}{100} \\times 10 = 6.5\\) g, which is \\(\\dfrac{6.5}{65} = 0.1\\) mol.",
          "1 mol of Zn gives 1 mol of \\(\\text{H}_2\\), so 0.1 mol of \\(\\text{H}_2\\) forms.",
          "Volume at STP \\(= 0.1 \\times 22.7 = 2.27\\) L.",
        ],
        answer: "2.27 L of hydrogen",
      },
      selfCheckExample: {
        prompt: "2.0 g of an impure sample of magnesium burns in excess oxygen and gives 2.0 g of MgO: \\(2\\text{Mg} + \\text{O}_2 \\rightarrow 2\\text{MgO}\\). Find the percentage purity of the magnesium (Mg = 24, O = 16).",
        steps: [
          "Moles of MgO \\(= \\dfrac{2.0}{40} = 0.05\\) mol, so 0.05 mol of Mg reacted.",
          "Mass of pure Mg \\(= 0.05 \\times 24 = 1.2\\) g.",
          "Purity \\(= \\dfrac{1.2}{2.0} \\times 100 = 60\\%\\).",
        ],
        answer: "60%",
      },
      practiceSet: [
        { prompt: "How many moles of HCl are there in 200 mL of 0.5 M HCl?", answer: "0.1 mol" },
        { prompt: "What mass of the pure compound is in 25 g of a sample that is 80% pure?", answer: "20 g" },
        { prompt: "What mass of a 90% pure sample contains 45 g of the pure compound?", answer: "50 g" },
        { prompt: "For \\(\\text{H}_2\\text{SO}_4 + 2\\text{NaOH} \\rightarrow \\text{Na}_2\\text{SO}_4 + 2\\text{H}_2\\text{O}\\), how many moles of NaOH neutralise 0.1 mol of \\(\\text{H}_2\\text{SO}_4\\)?", answer: "0.2 mol" },
      ],
      pyqExampleId: "e645b49b-ebf3-4a23-8502-0f165cf1c3a3",
      traps: [
        {
          title: "Cut the sample down to its pure part first",
          body: "Only the pure substance reacts. Multiply the sample mass by the purity before you divide by the molar mass; dividing the whole sample mass gives too many moles.",
        },
        {
          title: "Millilitres must become litres",
          body: "Molarity is moles per litre, so 50 mL of 0.5 M HCl holds \\(0.5 \\times 0.050 = 0.025\\) mol, not 25 mol.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchsb-limiting",
      name: "Limiting reagent",
      visualizationSlug: "neet-limiting-reagent",
      intuition:
        "When reactants are not mixed in the exact ratio of the equation, one runs out first and the reaction stops. That reactant, the limiting reagent, decides how much product forms. Whatever is left of the other reactant is the excess.",
      definition:
        "- The **limiting reagent** is the reactant used up first. It sets the amount of every product.\n" +
        "- **To find it:** divide the moles of each reactant by its coefficient in the balanced equation. The smallest result is the limiting reagent.\n" +
        "- Amount of product: from the moles of the limiting reagent and the mole ratio.\n" +
        "- Excess left \\(=\\) moles of the excess reactant present \\(-\\) moles of it used by the limiting reagent.",
      formula: {
        label: "Finding the limiting reagent",
        latex: "\\text{limiting reagent} = \\text{smallest } \\frac{n}{\\text{coefficient}}",
      },
      authoredExample: {
        prompt: "4 g of hydrogen and 64 g of oxygen are allowed to react: \\(2\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O}\\). Which is the limiting reagent, what mass of water forms, and what is left over?",
        steps: [
          "Moles: \\(\\text{H}_2 = \\dfrac{4}{2} = 2\\) mol; \\(\\text{O}_2 = \\dfrac{64}{32} = 2\\) mol.",
          "Divide by the coefficients: \\(\\text{H}_2\\), \\(\\dfrac{2}{2} = 1\\); \\(\\text{O}_2\\), \\(\\dfrac{2}{1} = 2\\). Hydrogen is the limiting reagent.",
          "2 mol of \\(\\text{H}_2\\) give 2 mol of water, \\(2 \\times 18 = 36\\) g, and use 1 mol of \\(\\text{O}_2\\).",
          "Oxygen left \\(= 2 - 1 = 1\\) mol, which is 32 g.",
        ],
        answer: "Hydrogen limits; 36 g of water forms and 32 g of oxygen is left",
      },
      selfCheckExample: {
        prompt: "3 mol of zinc are added to 4 mol of HCl: \\(\\text{Zn} + 2\\text{HCl} \\rightarrow \\text{ZnCl}_2 + \\text{H}_2\\). How many moles of hydrogen form?",
        steps: [
          "Divide by the coefficients: Zn, \\(\\dfrac{3}{1} = 3\\); HCl, \\(\\dfrac{4}{2} = 2\\). HCl is the limiting reagent.",
          "2 mol of HCl give 1 mol of \\(\\text{H}_2\\), so 4 mol of HCl give 2 mol of \\(\\text{H}_2\\).",
        ],
        answer: "2 mol of hydrogen",
      },
      practiceSet: [
        { prompt: "1 mol of \\(\\text{N}_2\\) is mixed with 2 mol of \\(\\text{H}_2\\) (\\(\\text{N}_2 + 3\\text{H}_2 \\rightarrow 2\\text{NH}_3\\)). Which is the limiting reagent?", answer: "\\(\\text{H}_2\\)" },
        { prompt: "2 mol of CO react with 2 mol of \\(\\text{O}_2\\) (\\(2\\text{CO} + \\text{O}_2 \\rightarrow 2\\text{CO}_2\\)). How many moles of \\(\\text{O}_2\\) are left?", answer: "1 mol" },
        { prompt: "4 mol of Al react with 4 mol of \\(\\text{O}_2\\) (\\(4\\text{Al} + 3\\text{O}_2 \\rightarrow 2\\text{Al}_2\\text{O}_3\\)). How many moles of \\(\\text{Al}_2\\text{O}_3\\) form?", answer: "2 mol", method: "Al limits: \\(\\frac{4}{4} = 1\\) is less than \\(\\frac{4}{3}\\)." },
        { prompt: "Which reactant decides the amount of product formed: the limiting reagent or the excess reagent?", answer: "The limiting reagent" },
      ],
      pyqExampleId: "4b9197c9-a6f9-4fd6-b364-479ebbda96c4",
      traps: [
        {
          title: "Fewer moles does not always mean limiting",
          body: "Divide each reactant's moles by its coefficient before you compare. With 2 mol of \\(\\text{H}_2\\) and 1 mol of \\(\\text{N}_2\\), hydrogen limits even though there is more of it, because the equation needs 3 mol of \\(\\text{H}_2\\) per mole of \\(\\text{N}_2\\).",
        },
        {
          title: "The excess left is not the excess present",
          body: "Subtract what the limiting reagent used up. The amount left is what was added minus what reacted.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchsb-gas-volume",
      name: "Volume relations in gas reactions",
      intuition:
        "Equal volumes of gases at the same temperature and pressure hold equal numbers of molecules. So for gases the coefficients of a balanced equation are also a volume ratio. Solids and liquids take part in the reaction but add almost nothing to the gas volume.",
      definition:
        "- At the same temperature and pressure, the **volume ratio of gases equals their mole ratio** (Avogadro's law).\n" +
        "- In \\(2\\text{CO} + \\text{O}_2 \\rightarrow 2\\text{CO}_2\\), 2 L of CO react with 1 L of \\(\\text{O}_2\\) and give 2 L of \\(\\text{CO}_2\\).\n" +
        "- Count only the gases. A solid (carbon, coke) or a liquid (water after cooling) has no gas volume.\n" +
        "- For a mass-to-volume problem, change moles to a volume with 22.7 L per mole at STP.\n" +
        "- When the total volume changes, let x be the volume that reacts and write each gas in terms of x.",
      formula: {
        label: "Gas volumes at the same temperature and pressure",
        latex: "\\frac{V_1}{V_2} = \\frac{n_1}{n_2}, \\qquad V = n \\times 22.7\\ \\text{L mol}^{-1}\\ (\\text{STP})",
      },
      authoredExample: {
        prompt: "2 L of carbon monoxide burns completely in oxygen: \\(2\\text{CO} + \\text{O}_2 \\rightarrow 2\\text{CO}_2\\). All volumes are at the same temperature and pressure. What volume of oxygen is used, what volume of \\(\\text{CO}_2\\) forms, and by how much does the total gas volume change?",
        steps: [
          "The volume ratio is 2 : 1 : 2, so 2 L of CO use 1 L of \\(\\text{O}_2\\).",
          "2 L of CO give 2 L of \\(\\text{CO}_2\\).",
          "Gas before: 2 + 1 = 3 L. Gas after: 2 L. The volume falls by 1 L.",
        ],
        answer: "1 L of oxygen used, 2 L of \\(\\text{CO}_2\\) formed; the volume falls by 1 L",
      },
      selfCheckExample: {
        prompt: "10 mL of hydrogen and 10 mL of oxygen are exploded together and cooled to room temperature, so the water formed is liquid: \\(2\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O}\\). What gas is left, and how much?",
        steps: [
          "10 mL of \\(\\text{H}_2\\) need 5 mL of \\(\\text{O}_2\\), so hydrogen is used up.",
          "Oxygen left \\(= 10 - 5 = 5\\) mL. The liquid water has no gas volume.",
        ],
        answer: "5 mL of oxygen",
      },
      practiceSet: [
        { prompt: "What volume of \\(\\text{NH}_3\\) forms from 3 L of \\(\\text{H}_2\\) and excess \\(\\text{N}_2\\) at the same temperature and pressure (\\(\\text{N}_2 + 3\\text{H}_2 \\rightarrow 2\\text{NH}_3\\))?", answer: "2 L" },
        { prompt: "How many moles of gas are there in 11.35 L at STP (273.15 K and 1 bar)?", answer: "0.5 mol" },
        { prompt: "What volume of oxygen is needed to burn 1 L of methane completely, at the same temperature and pressure (\\(\\text{CH}_4 + 2\\text{O}_2 \\rightarrow \\text{CO}_2 + 2\\text{H}_2\\text{O}\\))?", answer: "2 L" },
        { prompt: "What volume of \\(\\text{CO}_2\\) at STP (273.15 K and 1 bar) forms when 12 g of carbon burns completely (\\(\\text{C} + \\text{O}_2 \\rightarrow \\text{CO}_2\\))?", answer: "22.7 L" },
      ],
      pyqExampleId: "5badf2de-59b4-4b34-9094-2ef929959872",
      traps: [
        {
          title: "Solids and liquids have no gas volume",
          body: "In \\(\\text{C} + \\text{CO}_2 \\rightarrow 2\\text{CO}\\), the carbon is a solid, so 1 volume of gas becomes 2 volumes. Liquid water after cooling also adds nothing to the gas volume.",
        },
        {
          title: "Volume ratio needs the same temperature and pressure",
          body: "Coefficients are a volume ratio only when every gas is measured at the same temperature and pressure. Otherwise go through moles.",
        },
      ],
    },
  ],
};

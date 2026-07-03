import type { SubtopicNote } from "@/app/notes/_types";

export const STOICHIOMETRY_NOTE: SubtopicNote = {
  subtopicName: "Stoichiometry and Concentration",
  title: "Stoichiometry and Concentration",
  oneLineDefinition:
    "A balanced equation is a recipe in moles: convert the given mass or gas volume to moles, scale by the coefficient ratio, and convert to the target — then read solution strength (H2O2 volume strength, % by mass) off the same mole bridge.",
  whyItMatters:
    "Nine PYQs, and the workhorse is one skill: mass-or-volume to moles, scale by the balanced-equation ratio, convert to what is asked. The KClO3 to O2 and Mg + HCl mass problems (six of the nine) are all this one move. " +
    "Two questions test gas reactions where the volumes are already in the coefficient ratio (CH4 combustion, N2 + 3H2), which brings in limiting-reagent thinking. One HARD question turns H2O2 volume strength into % by mass — a two-formula chain that CET repeats almost every year.",
  concepts: [
    // mole ratios from a balanced equation — the workhorse
    {
      kind: "formula" as const,
      slug: "cetsbcc-stoich-mole-ratios",
      name: "Mole ratios from a balanced equation",
      intuition:
        "The big coefficients in a balanced equation are a ratio of moles, never of grams. " +
        "So every problem is the same three-step bridge: turn the known mass or gas volume into moles, scale by the coefficient ratio, then turn the target moles back into grams (or molecules).",
      definition:
        "Stoichiometry in three steps:\n" +
        "- Balance the equation; the coefficients are the **mole ratio** of reactants to products.\n" +
        "- Convert the known quantity to moles: mass gives \\(n = m/M\\); a gas volume at STP gives \\(n = V/22.4\\) (with \\(V\\) in \\(\\text{dm}^3\\)).\n" +
        "- Scale by the ratio, then convert the target moles to what is asked — mass \\(= n\\times M\\), or molecules \\(= n\\times 6.022\\times 10^{23}\\).\n" +
        "- For \\(2\\text{KClO}_3 \\to 2\\text{KCl} + 3\\text{O}_2\\), the ratio \\(\\text{KClO}_3 : \\text{O}_2\\) is **2 : 3**, so \\(n_{\\text{KClO}_3} = \\tfrac{2}{3}\\,n_{\\text{O}_2}\\).",
      formula: {
        label: "Mass of product from a known reactant quantity",
        latex:
          "m_{\\text{target}} = n_{\\text{known}} \\times \\dfrac{\\text{coeff}_{\\text{target}}}{\\text{coeff}_{\\text{known}}} \\times M_{\\text{target}}",
        symbols: [
          { symbol: "n_{\\text{known}}", meaning: "moles of the given substance (mass/M or volume/22.4)" },
          { symbol: "\\text{coeff}", meaning: "the balanced-equation coefficient of each substance" },
          { symbol: "M_{\\text{target}}", meaning: "molar mass of the substance being found" },
        ],
      },
      pyqExampleId: "283ca157-107b-41df-a01d-3deab2e3e484", // KClO3 for 5.6 dm3 O2 = 20.40 g
      authoredExample: {
        prompt:
          "What mass of aluminium reacts with excess HCl to liberate 3.36 dm3 of hydrogen at STP? 2Al + 6HCl -> 2AlCl3 + 3H2 (Al = 27 g/mol).",
        steps: [
          "Moles of \\(\\text{H}_2 = \\dfrac{3.36}{22.4} = 0.15\\) mol.",
          "Ratio \\(\\text{Al} : \\text{H}_2\\) is 2 : 3, so \\(n_{\\text{Al}} = \\dfrac{2}{3}\\times 0.15 = 0.1\\) mol.",
          "Mass \\(= 0.1 \\times 27 = 2.7\\) g.",
        ],
        answer: "\\(2.7\\) g of aluminium.",
      },
      selfCheckExample: {
        prompt:
          "According to Mg(s) + 2HCl(aq) -> MgCl2(aq) + H2(g), what mass of magnesium liberates 4.48 dm3 of H2 at STP? (Mg = 24 g/mol)",
        steps: [
          "Moles of \\(\\text{H}_2 = \\dfrac{4.48}{22.4} = 0.2\\) mol.",
          "Ratio \\(\\text{Mg} : \\text{H}_2\\) is 1 : 1, so moles of Mg \\(= 0.2\\) mol.",
          "Mass \\(= 0.2 \\times 24 = 4.8\\) g.",
        ],
        answer: "\\(4.8\\) g of Mg.",
      },
      practiceSet: [
        {
          prompt:
            "In 2KClO3 -> 2KCl + 3O2, how many moles of KClO3 give 1 mole of O2?",
          answer: "\\(\\tfrac{2}{3}\\) mole",
          method: "ratio KClO3 : O2 = 2 : 3",
        },
        {
          prompt: "How many moles of CO2 form when 0.6 g of carbon (C = 12) burns completely in air?",
          answer: "0.05 mol",
          method: "0.6/12 = 0.05 mol C, and C : CO2 is 1 : 1",
        },
        {
          prompt: "Mass of KClO3 needed to release 22.4 dm3 O2 at STP? (KClO3 = 122.5 g/mol)",
          answer: "81.67 g",
          method: "1 mol O2 -> 2/3 mol KClO3 -> (2/3)(122.5)",
        },
      ],
      traps: [
        {
          title: "Coefficients are moles, not grams",
          body:
            "The 2 : 3 in \\(2\\text{KClO}_3 \\to 3\\text{O}_2\\) is a **mole** ratio. You cannot put masses straight into it — always convert to moles first, scale, then convert back. A gram-to-gram shortcut only works by accident when the molar masses happen to match.",
        },
        {
          title: "Do not skip the fractional ratio",
          body:
            "For \\(0.25\\) mol \\(\\text{O}_2\\), the moles of \\(\\text{KClO}_3\\) are \\(\\tfrac{2}{3}\\times 0.25\\), not \\(0.25\\). Dropping the \\(\\tfrac{2}{3}\\) gives \\(0.25\\times 122.5 \\approx 30.6\\) g — a wrong distractor. Keep the ratio the right way up: fewer moles of \\(\\text{KClO}_3\\) than of \\(\\text{O}_2\\).",
        },
      ],
    },

    // combining gaseous volumes + limiting reagent
    {
      kind: "formula" as const,
      slug: "cetsbcc-stoich-combining-volumes",
      name: "Combining gaseous volumes and the limiting reagent",
      intuition:
        "For gases measured at the same temperature and pressure, volumes behave exactly like moles — so you can skip the mole conversion and work directly in the coefficient ratio (Gay-Lussac's law of combining volumes, which follows from Avogadro's law). " +
        "The one extra check is which reactant runs out first: the limiting reagent decides how much product forms.",
      definition:
        "Gas-phase stoichiometry shortcut (same T and P):\n" +
        "- By **Avogadro's law**, equal volumes hold equal numbers of molecules, so gas volumes are in the same ratio as the balanced-equation coefficients.\n" +
        "- For \\(\\text{CH}_4 + 2\\text{O}_2 \\to \\text{CO}_2 + 2\\text{H}_2\\text{O}\\), each volume of \\(\\text{CH}_4\\) needs **2** volumes of \\(\\text{O}_2\\).\n" +
        "- **Limiting reagent:** divide each reactant's supplied amount by its coefficient; the smallest quotient is the reagent that runs out and controls the product.\n" +
        "- Product volume \\(=\\) (limiting reactant volume) \\(\\times\\) (product coefficient / limiting-reactant coefficient).",
      formula: {
        label: "Product volume from a limiting gaseous reactant",
        latex:
          "V_{\\text{product}} = V_{\\text{limiting}} \\times \\dfrac{\\text{coeff}_{\\text{product}}}{\\text{coeff}_{\\text{limiting}}}",
      },
      pyqExampleId: "e938688d-ba0c-45c0-92ba-bb0d201c1585", // N2 + 3H2 -> 2NH3, 10 + 30 -> 20 dm3
      authoredExample: {
        prompt:
          "What volume of ammonia forms when 10 dm3 of N2 reacts with 30 dm3 of H2 at the same temperature and pressure? N2 + 3H2 -> 2NH3.",
        steps: [
          "Check the limiting reagent: \\(\\text{N}_2\\) supplied/coeff \\(= 10/1 = 10\\); \\(\\text{H}_2\\) supplied/coeff \\(= 30/3 = 10\\). They match, so both are fully used.",
          "\\(\\text{N}_2 : \\text{NH}_3\\) is 1 : 2, so \\(10\\) dm\\(^3\\) \\(\\text{N}_2\\) gives \\(2\\times 10 = 20\\) dm\\(^3\\) \\(\\text{NH}_3\\).",
        ],
        answer: "\\(20\\) dm\\(^3\\) of \\(\\text{NH}_3\\).",
      },
      selfCheckExample: {
        prompt:
          "What volume of oxygen at STP is needed for complete combustion of 0.25 mol of methane? CH4 + 2O2 -> CO2 + 2H2O.",
        steps: [
          "Ratio \\(\\text{CH}_4 : \\text{O}_2\\) is 1 : 2, so moles of \\(\\text{O}_2 = 2\\times 0.25 = 0.5\\) mol.",
          "Volume at STP \\(= 0.5 \\times 22.4 = 11.2\\) dm\\(^3\\).",
        ],
        answer: "\\(11.2\\) dm\\(^3\\) of \\(\\text{O}_2\\).",
      },
      practiceSet: [
        {
          prompt: "In CH4 + 2O2 -> CO2 + 2H2O, volume of O2 to burn 5 dm3 CH4 (same T, P)?",
          answer: "10 dm3",
          method: "CH4 : O2 = 1 : 2",
        },
        {
          prompt: "In N2 + 3H2 -> 2NH3, which reagent is limiting given 10 dm3 N2 and 30 dm3 H2?",
          answer: "Neither — both are used exactly (10/1 = 30/3)",
        },
        {
          prompt: "In N2 + 3H2 -> 2NH3, NH3 volume from 10 dm3 N2 (H2 in excess)?",
          answer: "20 dm3",
          method: "N2 : NH3 = 1 : 2",
        },
      ],
      traps: [
        {
          title: "Identify the limiting reagent before scaling",
          body:
            "Do not scale off the reactant you happen to see first. Divide each supplied volume by its coefficient and use the **smallest** quotient. In \\(\\text{N}_2 + 3\\text{H}_2\\), 30 dm\\(^3\\) \\(\\text{H}_2\\) only reacts with 10 dm\\(^3\\) \\(\\text{N}_2\\); if you had 40 dm\\(^3\\) \\(\\text{H}_2\\), \\(\\text{N}_2\\) would still cap the product at 20 dm\\(^3\\) \\(\\text{NH}_3\\).",
        },
        {
          title: "Volumes need the same T and P",
          body:
            "The volume-equals-mole shortcut only holds when all gases are at the same temperature and pressure. If a question gives one gas at STP and asks about another under different conditions, convert to moles first.",
        },
      ],
    },

    // concentration — % by mass and H2O2 volume strength
    {
      kind: "formula" as const,
      slug: "cetsbcc-stoich-concentration",
      name: "Concentration: percent by mass and H2O2 volume strength",
      intuition:
        "Percent by mass is just the mass of solute per 100 g of solution. Hydrogen peroxide is sold by 'volume strength' — the litres of O2 one litre of the solution releases on decomposition — and there is a fixed conversion from that number to molarity, from which % by mass follows.",
      definition:
        "Two linked results the CET repeats:\n" +
        "- **Percent by mass** \\(= \\dfrac{\\text{mass of solute}}{\\text{mass of solution}} \\times 100\\).\n" +
        "- **Volume strength of \\(\\text{H}_2\\text{O}_2\\):** an 'X volume' solution releases X litres of \\(\\text{O}_2\\) per litre of solution at STP.\n" +
        "- Because \\(2\\text{H}_2\\text{O}_2 \\to 2\\text{H}_2\\text{O} + \\text{O}_2\\), this fixes molarity as \\(M = \\dfrac{\\text{volume strength}}{11.2}\\).\n" +
        "- Then in 1 L (mass \\(1000\\) g at density \\(1\\) g/mL): mass of \\(\\text{H}_2\\text{O}_2 = M\\times 34\\), so % by mass \\(= \\dfrac{M\\times 34}{1000}\\times 100\\).",
      formula: {
        label: "H2O2 molarity from volume strength, and percent by mass",
        latex:
          "M_{\\text{H}_2\\text{O}_2} = \\dfrac{\\text{volume strength}}{11.2} \\qquad \\%\\text{ by mass} = \\dfrac{\\text{mass of solute}}{\\text{mass of solution}}\\times 100",
      },
      pyqExampleId: "80bd70c1-cc95-4b73-b645-40b031427e25", // 67.2 volume H2O2 -> 20.40% by mass
      authoredExample: {
        prompt:
          "Calculate the percent by mass of an H2O2 solution that is '67.2 volume'. (H2O2 = 34 g/mol, solution density = 1 g/mL.)",
        steps: [
          "Molarity \\(= \\dfrac{67.2}{11.2} = 6\\) mol/L.",
          "In 1 L, mass of \\(\\text{H}_2\\text{O}_2 = 6 \\times 34 = 204\\) g; mass of solution \\(= 1000\\) g.",
          "% by mass \\(= \\dfrac{204}{1000}\\times 100 = 20.4\\%\\).",
        ],
        answer: "\\(20.40\\%\\) by mass.",
      },
      selfCheckExample: {
        prompt:
          "Find the percent by mass of an H2O2 solution that is '11.2 volume'. (H2O2 = 34 g/mol, density = 1 g/mL.)",
        steps: [
          "Molarity \\(= \\dfrac{11.2}{11.2} = 1\\) mol/L.",
          "Mass of \\(\\text{H}_2\\text{O}_2\\) in 1 L \\(= 1\\times 34 = 34\\) g; mass of solution \\(= 1000\\) g.",
          "% by mass \\(= \\dfrac{34}{1000}\\times 100 = 3.4\\%\\).",
        ],
        answer: "\\(3.4\\%\\) by mass.",
      },
      practiceSet: [
        {
          prompt: "Molarity of a '22.4 volume' H2O2 solution?",
          answer: "2 mol/L",
          method: "M = volume strength / 11.2 = 22.4/11.2",
        },
        {
          prompt: "Percent by mass if 20 g of solute is dissolved to make 200 g of solution?",
          answer: "10%",
          method: "(20/200) x 100",
        },
        {
          prompt: "Mass of H2O2 in 1 L of a 6 mol/L solution? (H2O2 = 34)",
          answer: "204 g",
          method: "6 x 34",
        },
      ],
      traps: [
        {
          title: "Divide volume strength by 11.2, not 22.4",
          body:
            "One mole of \\(\\text{H}_2\\text{O}_2\\) releases only **half** a mole of \\(\\text{O}_2\\) (\\(2\\text{H}_2\\text{O}_2 \\to 2\\text{H}_2\\text{O} + \\text{O}_2\\)), so 1 mol/L gives \\(11.2\\) L of \\(\\text{O}_2\\) per litre — hence \\(M = \\text{volume strength}/11.2\\). Using \\(22.4\\) halves your answer.",
        },
        {
          title: "Percent by mass uses the mass of solution, not solvent",
          body:
            "The denominator is the **total** mass of the solution (solute + solvent), which is why 1 L at density 1 g/mL is taken as 1000 g. Dividing by the mass of water alone gives a wrong, slightly larger percentage.",
        },
      ],
    },
  ],
  related: [
    {
      label: "NDA Chemistry: Stoichiometry and the Laws of Chemical Combination",
      href: "/notes/nda-chemistry/mole-concept/mole-stoichiometry-laws",
    },
  ],
};

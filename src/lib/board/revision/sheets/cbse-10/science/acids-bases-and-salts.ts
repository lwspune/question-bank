import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 10 Science, Ch. 2 Acids, Bases and Salts. Statements checked
 * against the NCERT text (definitions in the book's own words); every equation
 * rebuilt and its atoms counted. Most-asked years and marks from all 155 CBSE
 * board past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Science",
  subjectRoute: "science",
  chapterName: "Acids, Bases and Salts",
  chapterSlug: "acids-bases-and-salts",
  source: "NCERT Science (CBSE Class 10), Chapter 2",
  keyPoints: [
    {
      term: "Indicators",
      text: "Acids turn blue litmus red; bases turn red litmus blue. Phenolphthalein turns pink in a base; methyl orange turns red in an acid; turmeric turns reddish brown in a base. **Olfactory indicators** (onion, vanilla essence, clove oil) change their odour in acidic or basic media: useful for a visually impaired student.",
    },
    {
      term: "Acids with metals",
      text: "Acid + metal gives salt + hydrogen gas. Test: bring a burning candle near the gas; it burns with a pop sound. Example: \\(\\ce{Zn + H2SO4 -> ZnSO4 + H2}\\).",
    },
    {
      term: "Bases with metals",
      text: "Some metals react with a base too and give hydrogen, with a salt whose negative ion has the metal and oxygen: zinc and sodium hydroxide give **sodium zincate**, \\(\\ce{Zn + 2NaOH -> Na2ZnO2 + H2}\\). Not every metal does this.",
    },
    {
      term: "Carbonates and hydrogencarbonates with acids",
      text: "Metal carbonate or hydrogencarbonate + acid gives salt + water + carbon dioxide. \\(\\ce{CO2}\\) turns lime water milky (\\(\\ce{CaCO3}\\) forms); excess \\(\\ce{CO2}\\) makes it clear again (soluble \\(\\ce{Ca(HCO3)2}\\)).",
    },
    {
      term: "Neutralisation and oxides",
      text: "The reaction between an acid and a base to give a salt and water is a neutralisation reaction. Metallic oxides are **basic** (CuO with HCl gives a blue-green solution of \\(\\ce{CuCl2}\\)). Non-metallic oxides are **acidic** (\\(\\ce{CO2}\\) with lime water).",
    },
    {
      term: "Ions in water",
      text: "Acids give \\(\\ce{H+}\\) ions in water, shown as \\(\\ce{H+(aq)}\\) or hydronium \\(\\ce{H3O+}\\); bases give \\(\\ce{OH-}\\) ions. So their solutions conduct electricity. Glucose and alcohol contain hydrogen but give no \\(\\ce{H+}\\), so they are not acids. Dry HCl gas gives no \\(\\ce{H+}\\) without water. Bases soluble in water are **alkalis**.",
    },
    {
      term: "Diluting an acid",
      text: "Dissolving an acid or a base in water is highly exothermic. The acid must always be added slowly to water with constant stirring. Adding water to a concentrated acid can make the mixture splash out and the glass break.",
    },
    {
      term: "pH scale and strength",
      text: "pH runs from 0 (very acidic) to 14 (very alkaline); 7 is neutral. Higher the hydronium ion concentration, lower the pH. Acids that give more \\(\\ce{H+}\\) ions are strong (HCl); those that give fewer are weak (acetic acid). A universal indicator, a mixture of indicators, shows different colours at different pH.",
    },
    {
      term: "pH in everyday life",
      text: "Body: 7.0 to 7.8. Acid rain: pH below 5.6. Stomach makes HCl; excess is neutralised by antacids such as milk of magnesia. Tooth decay starts when mouth pH falls below 5.5: enamel (calcium hydroxyapatite) corrodes; basic toothpaste prevents it. Bee sting: rub baking soda. Nettle and ant stings inject methanoic acid.",
    },
    {
      term: "Family of salts and pH of salts",
      text: "Salts with the same positive or negative radical belong to a family (NaCl and \\(\\ce{Na2SO4}\\): sodium salts; NaCl and KCl: chloride salts). Strong acid + strong base gives a neutral salt (pH 7, NaCl). Strong acid + weak base: acidic (\\(\\ce{NH4Cl}\\)). Weak acid + strong base: basic (\\(\\ce{Na2CO3}\\), \\(\\ce{CH3COONa}\\)).",
    },
    {
      term: "Chlor-alkali process",
      text: "Electricity is passed through brine (aqueous NaCl). Chlorine at the anode, hydrogen at the cathode, sodium hydroxide near the cathode. Named for its products: chlor for chlorine, alkali for sodium hydroxide.",
    },
    {
      term: "Bleaching powder",
      text: "Made by the action of chlorine on dry slaked lime; written \\(\\ce{CaOCl2}\\). Uses: bleaching cotton and linen, and wood pulp; bleaching washed clothes in laundry; an oxidising agent in industry; disinfecting drinking water.",
    },
    {
      term: "Baking soda and washing soda",
      text: "Baking soda \\(\\ce{NaHCO3}\\): mild non-corrosive base; on heating gives \\(\\ce{CO2}\\), which makes cakes soft and spongy. Baking powder = baking soda + tartaric acid. Also used in antacids and soda-acid fire extinguishers. Washing soda \\(\\ce{Na2CO3.10H2O}\\): glass, soap and paper industries, borax, cleaning, removing permanent hardness of water.",
    },
    {
      term: "Water of crystallisation and Plaster of Paris",
      text: "The fixed number of water molecules in one formula unit of a salt: \\(\\ce{CuSO4.5H2O}\\) (blue, turns white on heating), \\(\\ce{Na2CO3.10H2O}\\), gypsum \\(\\ce{CaSO4.2H2O}\\), \\(\\ce{FeSO4.7H2O}\\). Gypsum heated at 373 K gives Plaster of Paris, \\(\\ce{CaSO4.1/2H2O}\\): used for fractured bones, toys, decoration. With water it sets back to hard gypsum.",
    },
  ],
  formulas: [
    { label: "Acid and metal", latex: "\\ce{Zn + H2SO4 -> ZnSO4 + H2 ^}" },
    { label: "Zinc and sodium hydroxide", latex: "\\ce{Zn + 2NaOH -> Na2ZnO2 + H2 ^}" },
    { label: "Carbonate and hydrogencarbonate with acid", latex: "\\ce{Na2CO3 + 2HCl -> 2NaCl + H2O + CO2} \\qquad \\ce{NaHCO3 + HCl -> NaCl + H2O + CO2}" },
    { label: "Lime water test for CO2", latex: "\\ce{Ca(OH)2 + CO2 -> CaCO3 v + H2O} \\qquad \\ce{CaCO3 + H2O + CO2 -> Ca(HCO3)2}" },
    { label: "Neutralisation", latex: "\\ce{NaOH + HCl -> NaCl + H2O}" },
    { label: "Metal oxide with acid", latex: "\\ce{CuO + 2HCl -> CuCl2 + H2O}" },
    { label: "Chlor-alkali process", latex: "\\ce{2NaCl(aq) + 2H2O(l) -> 2NaOH(aq) + Cl2(g) + H2(g)}" },
    { label: "Bleaching powder", latex: "\\ce{Ca(OH)2 + Cl2 -> CaOCl2 + H2O}" },
    { label: "Baking soda (from brine)", latex: "\\ce{NaCl + H2O + CO2 + NH3 -> NH4Cl + NaHCO3}" },
    { label: "Heating baking soda", latex: "\\ce{2NaHCO3 ->[heat] Na2CO3 + H2O + CO2}" },
    { label: "Washing soda", latex: "\\ce{Na2CO3 + 10H2O -> Na2CO3.10H2O}" },
    { label: "Plaster of Paris from gypsum", latex: "\\ce{CaSO4.2H2O ->[373 K] CaSO4.1/2H2O + 3/2H2O}" },
    { label: "Plaster of Paris sets", latex: "\\ce{CaSO4.1/2H2O + 3/2H2O -> CaSO4.2H2O}" },
    { label: "Heating copper sulphate crystals", latex: "\\ce{CuSO4.5H2O ->[heat] CuSO4 + 5H2O}" },
  ],
  derivations: [],
  diagrams: [
    {
      title: "Zinc with dilute sulphuric acid, testing hydrogen (Figure 2.1)",
      labels: ["test tube with zinc granules and dilute H₂SO₄", "delivery tube", "soap solution with bubbles", "burning candle: pop sound"],
    },
    {
      title: "Carbon dioxide through lime water (Figure 2.2)",
      labels: ["sodium carbonate with dilute HCl", "delivery tube", "calcium hydroxide solution", "lime water turns milky"],
    },
    {
      title: "Acid solution conducts electricity (Figure 2.3)",
      labels: ["beaker with dilute HCl", "two nails fixed on a cork", "bulb", "6 V battery and switch"],
    },
    {
      title: "Preparation of HCl gas (Figure 2.4)",
      labels: ["solid NaCl with conc. H₂SO₄", "guard tube with calcium chloride", "dry and moist blue litmus", "HCl gas"],
    },
    {
      title: "Products of the chlor-alkali process (Figure 2.8)",
      labels: ["brine", "Cl₂ at anode, H₂ at cathode", "NaOH near cathode", "uses: bleaching powder, HCl, soaps, fuels"],
    },
  ],
  mostAsked: [
    {
      topic: "pH in everyday life: tooth decay, antacids, bee and ant stings, acid rain, body pH, and the natural sources of acids",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Reactions of acids and bases: with metals (hydrogen, pop test), carbonates (\\(\\ce{CO2}\\) turns lime water milky), metal oxides, neutralisation",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Indicators, ions in water and safety: olfactory and natural indicators, why acid solutions conduct, dry HCl, adding acid to water",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "pH scale and strength: arrange solutions by pH, \\(\\ce{H+}\\) concentration, strong and weak acids, universal indicator",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Baking soda, baking powder and washing soda: preparation with equation, formula and uses",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Chlor-alkali process: products at anode and cathode, equation and uses; bleaching powder from chlorine",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Salts: family of salts, parent acid and base, and whether a salt solution is acidic, basic or neutral",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Water of crystallisation and Plaster of Paris: define, examples, heating copper sulphate or gypsum, uses",
      years: [2026, 2025, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Adding water to acid",
      body: "Always add the **acid to water**, slowly, with stirring. The reverse heats the small amount of water so fast that acid splashes out.",
    },
    {
      title: "Getting the pH order backwards",
      body: "Lower pH means **more** \\(\\ce{H+}\\) ions: pH 1 is more acidic than pH 4. Going from pH 4 to pH 2 makes the \\(\\ce{H+}\\) concentration 100 times larger.",
    },
    {
      title: "Mixing up the soda formulas",
      body: "Baking soda is \\(\\ce{NaHCO3}\\) (sodium hydrogencarbonate). Washing soda is \\(\\ce{Na2CO3.10H2O}\\). Plaster of Paris is \\(\\ce{CaSO4.1/2H2O}\\); gypsum is \\(\\ce{CaSO4.2H2O}\\). Bleaching powder (\\(\\ce{CaOCl2}\\)) has no water of crystallisation.",
    },
    {
      title: "Wrong natural acid",
      body: "Vinegar: acetic acid. Orange, lemon: citric. Tamarind: tartaric. Tomato: oxalic. Curd (sour milk): lactic. Ant sting and nettle sting: methanoic acid.",
    },
    {
      title: "Calling every salt neutral",
      body: "Find the parent acid and base. NaCl and \\(\\ce{KNO3}\\) are neutral; \\(\\ce{NH4Cl}\\) is acidic (turns universal indicator pink or blue litmus red); \\(\\ce{Na2CO3}\\) and \\(\\ce{NaHCO3}\\) are basic.",
    },
    {
      title: "Forgetting the anode and cathode in chlor-alkali",
      body: "Chlorine forms at the **anode**, hydrogen at the **cathode**, and sodium hydroxide near the cathode. Balance it with 2NaCl and \\(\\ce{2H2O}\\).",
    },
  ],
};

export default sheet;

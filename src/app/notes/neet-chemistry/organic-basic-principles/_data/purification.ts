import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_OC_PURIFICATION_NOTE: SubtopicNote = {
  subtopicName: "Purification and Analysis",
  title: "Purification and Analysis",
  oneLineDefinition:
    "How an organic compound is purified (sublimation, crystallisation, extraction, chromatography and the four kinds of distillation), how Lassaigne's test shows nitrogen, sulphur, halogens and phosphorus, and how the percentage of each element is found.",
  whyItMatters:
    "Ten NEET questions from 2022 to 2026, the most of any page in this chapter. Four are on purification: sublimation named from its principle (NEET 2024), the boiling point in steam distillation (Re-NEET 2024), four mixtures matched to four kinds of distillation (2025) and separating the two nitrotoluenes made by nitrating toluene (NEET 2026). Three are on Lassaigne's test: the blood red complex given by nitrogen and sulphur together (2023), the one reaction that is not part of the test (2025) and what sodium fusion does to the elements (2026). Two are on estimation: carbon and hydrogen from combustion (Re-NEET 2024) and which compound Kjeldahl's method can analyse (2022). One, from NEET 2026, is a salt-analysis question: the acetate ion found by its smell of vinegar.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchoc-crystallisation",
      name: "Sublimation, crystallisation, extraction and chromatography",
      intuition:
        "Every purification method uses one property in which the compound and its impurity differ. A solid that turns straight into vapour can be sublimed away from one that does not. A solid more soluble hot than cold, in a solvent where the impurity behaves differently, can be crystallised. A compound more soluble in an organic solvent than in water can be extracted. When the differences are small, chromatography separates the parts of a mixture by how strongly each one is held back by a stationary phase.",
      definition:
        "- **Sublimation**: some solids change from solid to vapour on heating without becoming liquid. Such a solid is separated from impurities that do not sublime.\n" +
        "- **Crystallisation**: based on the difference in solubility of the compound and its impurities in a suitable solvent. The impure compound is dissolved in the hot solvent and crystallises on cooling. Coloured impurities are removed by **activated charcoal**; repeated crystallisation removes impurities of similar solubility.\n" +
        "- **Differential extraction**: an aqueous solution is shaken with an organic solvent in which the compound dissolves better, in a separating funnel. If the compound dissolves only a little in the organic solvent, **continuous extraction** is used.\n" +
        "- **Chromatography**: a mixture is put on a **stationary phase** and a **mobile phase** (a solvent) moves over it, carrying each part a different distance.\n" +
        "- **Adsorption chromatography** uses alumina or silica gel: **column chromatography** (the most strongly adsorbed part stays near the top) and **thin layer chromatography (TLC)**. **Paper chromatography** is partition chromatography: the stationary phase is the water held in the paper.\n" +
        "- **Retardation factor**: \\(R_f = \\dfrac{\\text{distance moved by the substance from the base line}}{\\text{distance moved by the solvent from the base line}}\\).\n" +
        "- Colourless spots on a TLC plate are seen under ultraviolet light, with iodine (brown spots) or, for amino acids, with ninhydrin.",
      table: {
        columns: ["Method", "Based on", "Used for"],
        rows: [
          {
            cells: ["Sublimation", "A solid going straight to vapour on heating", "A solid that sublimes, freed from one that does not"],
            noteAmber: "NEET 2024 described the principle (solid to vapour without becoming liquid) and asked for the name of the method.",
          },
          { cells: ["Crystallisation", "Different solubilities of compound and impurity in a solvent", "Purifying a solid"] },
          { cells: ["Differential extraction", "The compound dissolving better in an organic solvent than in water", "Taking a compound out of an aqueous solution"] },
          { cells: ["Column and thin layer chromatography", "Different adsorption on alumina or silica gel", "Separating the parts of a mixture"] },
          { cells: ["Paper chromatography", "Different partition between the water in the paper and the solvent", "Separating small amounts, such as dyes or amino acids"] },
        ],
      },
      pyqExampleId: "de07f17d-501e-46cb-ab3b-292c7ae08eb6",
      selfCheckExample: {
        prompt: "On a TLC plate the solvent rises 8.0 cm above the base line and a spot rises 5.2 cm. Find the \\(R_f\\) value of the spot.",
        steps: [
          "\\(R_f = \\dfrac{\\text{distance of the spot}}{\\text{distance of the solvent}}\\).",
          "\\(R_f = \\dfrac{5.2}{8.0} = 0.65\\).",
        ],
        answer: "\\(R_f = 0.65\\)",
      },
      practiceSet: [
        { prompt: "What is added during crystallisation to remove coloured impurities?", answer: "Activated charcoal" },
        { prompt: "What is the stationary phase in paper chromatography?", answer: "The water held in the paper" },
        { prompt: "Which reagent shows amino acids as spots on a TLC plate?", answer: "Ninhydrin" },
        { prompt: "In column chromatography, which part of a mixture stays near the top of the column?", answer: "The part most strongly adsorbed" },
      ],
      traps: [
        {
          title: "Sublimation skips the liquid state",
          body: "In sublimation the solid becomes vapour directly. Distillation boils a liquid; crystallisation uses a solvent. Only sublimation fits a solid that never melts on the way.",
        },
        {
          title: "An \\(R_f\\) value cannot be more than 1",
          body: "A spot cannot travel further than the solvent that carries it, so \\(R_f\\) always lies between 0 and 1. Divide the spot's distance by the solvent's, never the other way.",
        },
        {
          title: "Paper chromatography is partition, not adsorption",
          body: "In paper chromatography the parts of the mixture share themselves between the water in the paper and the moving solvent. Column chromatography and TLC are adsorption methods.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchoc-distillation",
      name: "Choosing a distillation method",
      intuition:
        "Distillation turns a liquid into vapour and cools it back. Which kind you choose depends on two questions. How far apart are the boiling points? Far apart, simple distillation; close together, fractional distillation. And can the liquid survive its own boiling point? If it decomposes, lower the pressure so it boils cooler, or, if it does not mix with water and its vapour comes over with steam, use steam distillation.",
      definition:
        "- **Simple distillation**: separates a volatile liquid from a non-volatile impurity, or two liquids whose boiling points are far apart.\n" +
        "- **Fractional distillation**: for liquids whose boiling points are close. The vapours rise through a **fractionating column**, where the higher-boiling liquid condenses back again and again.\n" +
        "- **Distillation under reduced pressure**: for a liquid with a very high boiling point, or one that decomposes at or below its boiling point. Lower pressure makes it boil at a lower temperature.\n" +
        "- **Steam distillation**: for a compound that is **steam volatile** and **does not mix with water**. Steam is passed through it, and the mixture boils when the vapour pressure of water plus that of the compound equals the atmospheric pressure. So each part boils below its own boiling point, and the mixture boils close to but below 373 K (100 °C).",
      table: {
        columns: ["Method", "When to use it", "Example"],
        rows: [
          { cells: ["Simple distillation", "Boiling points far apart", "Chloroform (334 K) from aniline (457 K)"] },
          {
            cells: ["Fractional distillation", "Boiling points close together", "The fractions of crude oil in the petroleum industry"],
            noteAmber: "NEET 2026: the o- and p-nitrotoluene made by nitrating toluene were separated by fractional distillation.",
          },
          { cells: ["Distillation under reduced pressure", "The liquid decomposes at or below its boiling point", "Glycerol from spent-lye in the soap industry"] },
          {
            cells: ["Steam distillation", "Steam volatile and does not mix with water", "Aniline from a mixture of aniline and water"],
            noteAmber: "Re-NEET 2024: a compound boiling at 250 °C, steam distilled, comes over close to but below 100 °C.",
          },
        ],
        caption: "NEET 2025 matched all four of these examples to their methods in one question.",
      },
      pyqExampleId: "d217770c-520a-4ecc-ae1a-8c6882c6da36",
      selfCheckExample: {
        prompt:
          "During steam distillation at an atmospheric pressure of 760 mm Hg, the vapour pressure of water at the boiling point of the mixture is 650 mm Hg. What is the vapour pressure of the organic compound at that temperature?",
        steps: [
          "The mixture boils when \\(p_{\\text{water}} + p_{\\text{compound}} = p_{\\text{atmosphere}}\\).",
          "\\(p_{\\text{compound}} = 760 - 650 = 110\\) mm Hg.",
        ],
        answer: "110 mm Hg",
      },
      practiceSet: [
        { prompt: "What is fitted between the flask and the condenser to separate liquids whose boiling points are close?", answer: "A fractionating column" },
        { prompt: "Why is a liquid that decomposes near its boiling point distilled under reduced pressure?", answer: "Lower pressure lowers its boiling point, so it distils before it decomposes" },
        { prompt: "Which two properties must a compound have to be purified by steam distillation?", answer: "It must be steam volatile and must not mix with water" },
        { prompt: "Why does a mixture of water and a steam-volatile oil boil below 373 K?", answer: "The two vapour pressures add up, so together they reach the atmospheric pressure at a lower temperature" },
      ],
      traps: [
        {
          title: "Steam distillation boils below 100 °C",
          body: "The mixture does not boil between the two boiling points. It boils when the two vapour pressures add up to the atmospheric pressure, which happens close to but below 100 °C.",
        },
        {
          title: "Close boiling points need a fractionating column",
          body: "Simple distillation works only when the boiling points are far apart. When they are close, the vapour must be condensed and boiled again many times in a fractionating column.",
        },
        {
          title: "Reduced pressure is for liquids that would break down",
          body: "Glycerol decomposes before it boils at normal pressure, so it is distilled under reduced pressure, not by steam distillation.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchoc-lassaigne",
      name: "Lassaigne's test",
      intuition:
        "Nitrogen, sulphur and halogens are held by covalent bonds in an organic compound, so they give none of the usual tests for ions. Fusing the compound with sodium metal turns them into ionic sodium compounds: sodium cyanide, sodium sulphide and sodium halides. The fused mass is boiled with water, and this sodium fusion extract is then tested for each ion.",
      definition:
        "- **Sodium fusion** converts the elements from the covalent form to the ionic form: \\(\\text{Na} + \\text{C} + \\text{N} \\rightarrow \\text{NaCN}\\); \\(2\\text{Na} + \\text{S} \\rightarrow \\text{Na}_2\\text{S}\\); \\(\\text{Na} + \\text{X} \\rightarrow \\text{NaX}\\).\n" +
        "- If nitrogen and sulphur are both present, sodium thiocyanate, NaSCN, can form. It gives a blood red colour with \\(\\text{Fe}^{3+}\\) and no Prussian blue, because there are no free cyanide ions.\n" +
        "- Before testing for halogens, the extract is boiled with **nitric acid** to break down any NaCN and \\(\\text{Na}_2\\text{S}\\), which would otherwise react with \\(\\text{AgNO}_3\\) too.\n" +
        "- Phosphorus: the compound is heated with an oxidising agent (sodium peroxide) to turn phosphorus into phosphate, which gives a yellow precipitate with nitric acid and ammonium molybdate.\n" +
        "- Carbon and hydrogen are detected separately, by heating the compound with copper(II) oxide: carbon gives \\(\\text{CO}_2\\), which turns lime water milky, and hydrogen gives water, which turns anhydrous copper sulphate blue. This is not part of Lassaigne's test.",
      table: {
        columns: ["Element", "Present in the extract as", "Test", "Positive result"],
        rows: [
          { cells: ["Nitrogen", "NaCN", "Boil with \\(\\text{FeSO}_4\\), then acidify with concentrated \\(\\text{H}_2\\text{SO}_4\\)", "Prussian blue, \\(\\text{Fe}_4[\\text{Fe(CN)}_6]_3 \\cdot x\\text{H}_2\\text{O}\\)"] },
          { cells: ["Sulphur", "\\(\\text{Na}_2\\text{S}\\)", "Acidify with acetic acid, add lead acetate", "Black precipitate of PbS"] },
          { cells: ["Sulphur", "\\(\\text{Na}_2\\text{S}\\)", "Sodium nitroprusside", "Violet colour, \\([\\text{Fe(CN)}_5\\text{NOS}]^{4-}\\)"] },
          {
            cells: ["Nitrogen and sulphur together", "NaSCN", "\\(\\text{Fe}^{3+}\\)", "Blood red colour, \\([\\text{Fe(SCN)}]^{2+}\\)"],
            noteAmber: "NEET 2023: the blood red colour is due to \\([\\text{Fe(SCN)}]^{2+}\\).",
          },
          { cells: ["Halogens", "NaX", "Boil with \\(\\text{HNO}_3\\), then add \\(\\text{AgNO}_3\\)", "White (Cl, soluble in ammonia), pale yellow (Br, sparingly soluble), yellow (I, insoluble)"] },
          { cells: ["Phosphorus", "Phosphate, after heating with \\(\\text{Na}_2\\text{O}_2\\)", "Boil with \\(\\text{HNO}_3\\), add ammonium molybdate", "Yellow ammonium phosphomolybdate"] },
        ],
        caption: "NEET 2026 asked what fusion does: the elements change from the covalent form to the ionic form.",
      },
      pyqExampleId: "01e54158-c3dc-40bf-a1f1-63408c4409de",
      selfCheckExample: {
        prompt: "A sodium fusion extract is acidified with acetic acid and lead acetate is added. A black precipitate forms. Which element does the compound contain?",
        steps: [
          "Sulphur is in the extract as \\(\\text{Na}_2\\text{S}\\).",
          "Sulphide ions and lead ions give black lead sulphide, PbS.",
        ],
        answer: "Sulphur",
      },
      practiceSet: [
        { prompt: "Why is the sodium fusion extract boiled with nitric acid before silver nitrate is added?", answer: "To break down NaCN and \\(\\text{Na}_2\\text{S}\\), which would also react with \\(\\text{AgNO}_3\\)" },
        { prompt: "Which halogen gives a yellow precipitate with silver nitrate that does not dissolve in ammonia?", answer: "Iodine" },
        { prompt: "What colour does sodium nitroprusside give with the extract of a compound containing sulphur?", answer: "Violet" },
        { prompt: "In the sodium fusion extract test, the Prussian blue colour shows which element?", answer: "Nitrogen" },
      ],
      traps: [
        {
          title: "Fusion makes ions out of covalent atoms",
          body: "Lassaigne's test works because sodium fusion changes the elements from the covalent form to the ionic form. Without fusion, the covalently bonded halogen gives no precipitate with \\(\\text{AgNO}_3\\).",
        },
        {
          title: "Nitrogen with sulphur gives blood red, not Prussian blue",
          body: "When both are present, the extract can hold NaSCN instead of NaCN. With \\(\\text{Fe}^{3+}\\) it turns blood red, and no Prussian blue forms because there are no free cyanide ions.",
        },
        {
          title: "Use nitric acid, not hydrochloric acid",
          body: "Before the halogen test the extract is boiled with \\(\\text{HNO}_3\\). Hydrochloric acid would add chloride ions and give white AgCl whatever the compound held.",
        },
        {
          title: "The copper oxide test is not Lassaigne's test",
          body: "Heating with CuO detects carbon and hydrogen. Lassaigne's test is sodium fusion, and it detects nitrogen, sulphur, halogens and phosphorus.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchoc-estimation",
      name: "Estimating the elements",
      intuition:
        "To find how much of an element a compound holds, turn all of that element into one product you can weigh or measure. Carbon becomes carbon dioxide, hydrogen becomes water, nitrogen becomes nitrogen gas or ammonia, a halogen becomes a silver halide, sulphur becomes barium sulphate. Then the element's share of that product, times the product's mass, divided by the sample's mass, gives the percentage.",
      definition:
        "- **Carbon and hydrogen**: a weighed sample is burnt with copper(II) oxide. The water is absorbed in a U-tube of anhydrous \\(\\text{CaCl}_2\\), the \\(\\text{CO}_2\\) in a U-tube of concentrated KOH. Carbon is 12/44 of the \\(\\text{CO}_2\\) and hydrogen 2/18 of the water.\n" +
        "- **Nitrogen, Dumas method**: the compound is heated with CuO in an atmosphere of \\(\\text{CO}_2\\). Its nitrogen comes off as \\(\\text{N}_2\\); any oxides of nitrogen are reduced over a heated copper gauze; the gas is collected over KOH solution, which absorbs the \\(\\text{CO}_2\\). 22400 mL of \\(\\text{N}_2\\) at STP weighs 28 g.\n" +
        "- **Nitrogen, Kjeldahl method**: the compound is heated with concentrated \\(\\text{H}_2\\text{SO}_4\\), turning its nitrogen into \\(\\text{(NH}_4\\text{)}_2\\text{SO}_4\\). NaOH sets free \\(\\text{NH}_3\\), which is absorbed in a known volume of standard acid. Each \\(\\text{H}_2\\text{SO}_4\\) takes up two \\(\\text{NH}_3\\), and each \\(\\text{NH}_3\\) carries one N (14 g mol⁻¹).\n" +
        "- Kjeldahl's method **does not work** for nitrogen in nitro groups, azo groups or a ring (pyridine), because that nitrogen does not change into ammonium sulphate.\n" +
        "- **Halogens, Carius method**: heated with fuming \\(\\text{HNO}_3\\) and \\(\\text{AgNO}_3\\) in a sealed Carius tube; the silver halide is weighed (AgCl 143.5, AgBr 188, AgI 235).\n" +
        "- **Sulphur**: heated with fuming \\(\\text{HNO}_3\\) or sodium peroxide in a Carius tube to give \\(\\text{H}_2\\text{SO}_4\\), then precipitated by \\(\\text{BaCl}_2\\) as \\(\\text{BaSO}_4\\) (233): sulphur is 32/233 of it.\n" +
        "- **Oxygen** is found by difference: 100 minus the sum of all the other percentages.",
      formula: {
        label: "Percentage of an element",
        latex:
          "\\%\\,\\text{C} = \\frac{12}{44} \\times \\frac{m_{\\text{CO}_2}}{m} \\times 100 \\qquad \\%\\,\\text{H} = \\frac{2}{18} \\times \\frac{m_{\\text{H}_2\\text{O}}}{m} \\times 100 \\qquad \\%\\,\\text{N} = \\frac{28}{22400} \\times \\frac{V_0}{m} \\times 100",
        symbols: [
          { symbol: "\\(m\\)", meaning: "mass of the organic compound taken, in g" },
          { symbol: "\\(V_0\\)", meaning: "volume of nitrogen gas at STP, in mL (Dumas method)" },
        ],
      },
      authoredExample: {
        prompt:
          "In Kjeldahl's method, the ammonia set free from 0.40 g of an organic compound exactly neutralises 10 mL of 0.50 M \\(\\text{H}_2\\text{SO}_4\\). Find the percentage of nitrogen.",
        steps: [
          "Moles of \\(\\text{H}_2\\text{SO}_4\\) = \\(0.50 \\times \\dfrac{10}{1000} = 0.0050\\).",
          "Each \\(\\text{H}_2\\text{SO}_4\\) takes two \\(\\text{NH}_3\\): moles of \\(\\text{NH}_3\\) = \\(2 \\times 0.0050 = 0.010\\), and that is also the moles of N.",
          "Mass of N = \\(0.010 \\times 14 = 0.14\\) g.",
          "\\(\\%\\,\\text{N} = \\dfrac{0.14}{0.40} \\times 100 = 35\\%\\).",
        ],
        answer: "35% nitrogen",
      },
      selfCheckExample: {
        prompt: "In Dumas' method, 0.30 g of an organic compound gives 44.8 mL of nitrogen gas, measured at STP. Find the percentage of nitrogen.",
        steps: [
          "Mass of \\(\\text{N}_2\\) = \\(\\dfrac{28 \\times 44.8}{22400} = 0.056\\) g.",
          "\\(\\%\\,\\text{N} = \\dfrac{0.056}{0.30} \\times 100 = 18.7\\%\\).",
        ],
        answer: "18.7% nitrogen",
      },
      practiceSet: [
        { prompt: "In a Carius estimation, 0.15 g of an organic compound gives 0.188 g of AgBr (188 g mol⁻¹). Find the percentage of bromine (Br = 80).", answer: "53.3%" },
        { prompt: "In a sulphur estimation, 0.20 g of an organic compound gives 0.466 g of \\(\\text{BaSO}_4\\) (233 g mol⁻¹). Find the percentage of sulphur.", answer: "32%" },
        { prompt: "Why can Kjeldahl's method not estimate the nitrogen of nitrobenzene?", answer: "Nitrogen in a nitro group does not change into ammonium sulphate" },
        { prompt: "In the estimation of carbon, which U-tube absorbs the carbon dioxide?", answer: "The tube of concentrated KOH" },
      ],
      pyqExampleId: "85715a19-f1cc-4250-94ce-372bb560cac1",
      traps: [
        {
          title: "Hydrogen is 2/18 of water, not 1/18",
          body: "Each water molecule holds two hydrogen atoms, so hydrogen is 2/18 of its mass. Using 1/18 halves the percentage of hydrogen.",
        },
        {
          title: "Kjeldahl fails for nitro, azo and ring nitrogen",
          body: "Nitrobenzene, azobenzene and pyridine do not give all their nitrogen as ammonium sulphate. Aniline, with an \\(\\text{-NH}_2\\) group, can be analysed by Kjeldahl's method.",
        },
        {
          title: "Nitrogen gas is 28 g per 22400 mL",
          body: "In Dumas' method the gas is \\(\\text{N}_2\\), so 22400 mL at STP weighs 28 g. Using 14 g halves the answer.",
        },
        {
          title: "Oxygen is never weighed",
          body: "No step of the analysis collects oxygen. Its percentage is what is left when all the other percentages are taken from 100.",
        },
      ],
    },
  ],
};

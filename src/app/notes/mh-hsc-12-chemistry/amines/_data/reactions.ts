import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_AM_REACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Chemical Properties of Amines",
  title: "Reactions and Tests of Amines",
  oneLineDefinition:
    "Alkylation and acylation at the nitrogen, the carbylamine test, the action of nitrous acid with diazotisation, and Hinsberg's test that tells primary, secondary and tertiary amines apart.",
  whyItMatters:
    "21 questions. Nine were set in board papers: the action of nitrous acid on ethylamine, aniline or diethylamine (2017, 2018, 2023, 2025, 2026), the carbylamine reaction (2016, 2023, 2026), Hinsberg's reagent (2024, 2025), excess ethyl bromide on ethylamine (2024), the moles of methyl iodide for exhaustive methylation (2020), and acylation by an acid anhydride (2022). The textbook adds acetic anhydride on three amines, diazotisation, salt formation and the sulfonamide of p-toluenesulfonyl chloride.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccam-alkylation-acylation",
      name: "Alkylation and acylation at nitrogen",
      intuition:
        "Most reactions of amines happen at the nitrogen, and what can happen depends on how many hydrogen atoms it still carries. An alkyl halide replaces them one by one with alkyl groups and then adds one more to make a quaternary salt. An acyl group replaces an N-H too, so only primary and secondary amines, which have an N-H, can be acylated.",
      definition:
        "- **Salts with acids:** amines are bases and form substituted ammonium salts, \\(\\text{R-NH}_2 + \\text{HCl} \\rightarrow \\text{R-NH}_3^+\\text{Cl}^-\\). With dibasic \\(\\text{H}_2\\text{SO}_4\\) a 1 : 1 ratio gives the hydrogensulfate.\n" +
        "- **Hofmann's exhaustive alkylation:** a primary amine heated with excess primary alkyl halide gives secondary and tertiary amines and the tetraalkylammonium halide; with enough alkyl halide the quaternary salt is the major product. With methyl iodide it is called exhaustive methylation.\n" +
        "- Primary, secondary and tertiary amines use **three, two and one** moles of alkyl halide to reach the quaternary salt. Mild base NaHCO₃ is added to neutralise the HX formed.\n" +
        "- Quaternary ammonium salts are crystalline solids: four alkyl groups replace all four H of \\(\\text{NH}_4^+\\). Acetylcholine (a neurotransmitter) is one, and they are present in cationic detergents.\n" +
        "- **Hofmann elimination:** a quaternary ammonium halide with moist silver oxide gives the quaternary ammonium hydroxide (deliquescent, strongly basic like NaOH). On strong heating it undergoes β-elimination to an alkene, the **least substituted** alkene being the major product (unlike Saytzeff elimination).\n" +
        "- **Acylation:** primary and secondary amines (aliphatic and aromatic) have replaceable, positively polarised H on nitrogen. Acetyl chloride or acetic anhydride replaces it by an acetyl group, giving an **amide**, in the presence of a strong base such as pyridine, which neutralises the acid formed. It is a nucleophilic substitution, the amide is less basic than the amine, and benzoyl chloride reacts the same way. Tertiary amines have no N-H and are not acylated.",
      formula: {
        label: "Alkylation and acylation",
        latex:
          "\\text{R-NH}_2 \\xrightarrow{\\text{R-X}} \\text{R}_2\\text{NH} \\xrightarrow{\\text{R-X}} \\text{R}_3\\text{N} \\xrightarrow{\\text{R-X}} \\text{R}_4\\text{N}^+\\text{X}^-, \\qquad \\text{R-NH}_2 + \\text{CH}_3\\text{COCl} \\xrightarrow{\\text{pyridine}} \\text{R-NHCOCH}_3 + \\text{HCl}",
      },
      authoredExample: {
        prompt:
          "How many moles of ethyl iodide does one mole of diethylamine need to form a quaternary ammonium salt? Write the reactions and name the final product.",
        steps: [
          "Diethylamine, \\((\\text{C}_2\\text{H}_5)_2\\text{NH}\\), is secondary: it has two groups on nitrogen and needs two more to reach four.",
          "\\((\\text{C}_2\\text{H}_5)_2\\text{NH} + \\text{C}_2\\text{H}_5\\text{I} \\rightarrow (\\text{C}_2\\text{H}_5)_3\\text{N} + \\text{HI}\\)",
          "\\((\\text{C}_2\\text{H}_5)_3\\text{N} + \\text{C}_2\\text{H}_5\\text{I} \\rightarrow (\\text{C}_2\\text{H}_5)_4\\text{N}^+\\text{I}^-\\)",
          "One mole of ethyl iodide is used at each step.",
        ],
        answer: "Two moles; tetraethylammonium iodide",
      },
      selfCheckExample: {
        prompt: "Write the reaction of ethylamine with acetyl chloride in the presence of pyridine, and name the product.",
        steps: [
          "Ethylamine is primary, so one of its N-H hydrogen atoms is replaced by the acetyl group:",
          "\\(\\text{C}_2\\text{H}_5\\text{NH}_2 + \\text{CH}_3\\text{COCl} \\xrightarrow{\\text{pyridine}} \\text{C}_2\\text{H}_5\\text{NHCOCH}_3 + \\text{HCl}\\)",
          "Pyridine neutralises the HCl formed.",
        ],
        answer: "N-Ethylethanamide (N-ethylacetamide)",
      },
      practiceSet: [
        { prompt: "Is the amide formed by acylation more or less basic than the amine it came from?", answer: "Less basic" },
        { prompt: "What forms when a quaternary ammonium iodide is treated with moist silver oxide?", answer: "The quaternary ammonium hydroxide" },
        { prompt: "In Hofmann elimination, is the more substituted or the less substituted alkene the major product?", answer: "The least substituted alkene" },
        { prompt: "Why is NaHCO₃ added during exhaustive alkylation?", answer: "To neutralise the large quantity of HX formed" },
      ],
      pyqExampleId: "b8b37b59-623c-4456-9bb8-4aabd55306de",
      traps: [
        {
          title: "Counting moles from ammonia",
          body: "Do not start the count from ammonia. Count the groups the amine already has on nitrogen and add groups until there are four: each mole of alkyl halide adds exactly one.",
        },
        {
          title: "Acylating a tertiary amine",
          body: "Acylation replaces an H on nitrogen. A tertiary amine has none, so it gives no amide with acetyl chloride or acetic anhydride.",
        },
        {
          title: "Hofmann elimination follows Saytzeff",
          body: "It does not. Heating a quaternary ammonium hydroxide gives the LEAST substituted alkene as the major product.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccam-carbylamine",
      name: "Carbylamine reaction",
      intuition:
        "Warm a primary amine with chloroform and potassium hydroxide and you get an isocyanide, which has a horrible smell you cannot miss. The reaction uses up both hydrogen atoms of the \\(\\text{-NH}_2\\) group, so only an amine with two H atoms on nitrogen, a primary amine, can do it. That makes the smell a test for primary amines.",
      definition:
        "- Aliphatic or aromatic **primary** amines, heated with chloroform and alcoholic KOH, give foul (offensive) smelling **alkyl or aryl isocyanides**, also called carbylamines.\n" +
        "- It is a **test for primary amines**. Secondary and tertiary amines do not give this test.\n" +
        "- In a board answer write the full balanced equation, name the isocyanide, and state the observation (offensive smell).",
      formula: {
        label: "Carbylamine reaction",
        latex: "\\text{R-NH}_2 + \\text{CHCl}_3 + 3\\text{KOH} \\xrightarrow{\\Delta} \\text{R-NC} + 3\\text{KCl} + 3\\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt: "Write the carbylamine reaction using aniline as the starting material. Name the product and state the observation.",
        steps: [
          "Aniline is an aromatic primary amine, so it gives the carbylamine reaction.",
          "\\(\\text{C}_6\\text{H}_5\\text{NH}_2 + \\text{CHCl}_3 + 3\\text{KOH} \\xrightarrow{\\Delta} \\text{C}_6\\text{H}_5\\text{NC} + 3\\text{KCl} + 3\\text{H}_2\\text{O}\\)",
          "The product is phenyl isocyanide (phenyl carbylamine).",
          "Observation: a foul, offensive smell.",
        ],
        answer: "Phenyl isocyanide, \\(\\text{C}_6\\text{H}_5\\text{NC}\\), recognised by its offensive smell",
      },
      selfCheckExample: {
        prompt: "Methylamine is warmed with chloroform and alcoholic KOH. Write the equation and name the product.",
        steps: [
          "Methylamine is a primary amine, so it gives the carbylamine reaction.",
          "\\(\\text{CH}_3\\text{NH}_2 + \\text{CHCl}_3 + 3\\text{KOH} \\xrightarrow{\\Delta} \\text{CH}_3\\text{NC} + 3\\text{KCl} + 3\\text{H}_2\\text{O}\\)",
        ],
        answer: "Methyl isocyanide (methyl carbylamine), \\(\\text{CH}_3\\text{NC}\\)",
      },
      practiceSet: [
        { prompt: "Name the product when propan-1-amine is heated with chloroform and alcoholic KOH.", answer: "Propyl isocyanide, \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{NC}\\)" },
        { prompt: "Why does a secondary amine not give the carbylamine reaction?", answer: "It has only one H on nitrogen; the reaction needs two" },
        { prompt: "What is another name for the isocyanides formed in this reaction?", answer: "Carbylamines" },
        { prompt: "How many moles of KOH are used per mole of amine?", answer: "Three" },
      ],
      pyqExampleId: "ba6ac938-d486-4828-9325-06a2df887edf",
      traps: [
        {
          title: "Writing a cyanide",
          body: "The product is an ISOcyanide, R-NC, not a cyanide (nitrile), R-CN. The nitrogen of the amine stays bonded to R.",
        },
        {
          title: "No observation in a test answer",
          body: "A test is answered by what you see or smell. Write 'offensive smell of the isocyanide' and that only primary amines give it; the equation alone does not answer 'how is it tested'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccam-nitrous-acid",
      name: "Nitrous acid and diazotisation",
      intuition:
        "Nitrous acid turns a primary amine's \\(\\text{-NH}_2\\) into a diazonium group, \\(\\text{-N}_2^+\\). On an alkyl chain that group cannot survive: it falls apart at once in water, giving an alcohol and bubbles of nitrogen. On a benzene ring, resonance holds it together long enough, if kept near 273 K, to be used for further reactions. That difference is what the board asks you to show.",
      definition:
        "- Nitrous acid is unstable, so it is made **in situ**: aqueous NaNO₂ is added to HCl already mixed with the amine, at **273 to 278 K**.\n" +
        "- **Aliphatic primary amines** form aliphatic diazonium salts as very unstable intermediates, which decompose at once with the solvent water: the alcohol forms and **nitrogen gas is liberated** (brisk effervescence).\n" +
        "- **Aromatic primary amines** form arene diazonium salts, which have reasonable stability at 273 K because they are resonance stabilised. This is **diazotisation**: \\(\\text{C}_6\\text{H}_5\\text{NH}_2 + \\text{HNO}_2 + \\text{HCl} \\xrightarrow{273\\text{ to }278\\ \\text{K}} \\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- + 2\\text{H}_2\\text{O}\\).\n" +
        "- **Secondary amines (board 2017, 2018):** they cannot form a diazonium salt; they give a yellow oily N-nitrosoamine and no gas, \\((\\text{C}_2\\text{H}_5)_2\\text{NH} + \\text{HNO}_2 \\rightarrow (\\text{C}_2\\text{H}_5)_2\\text{N-N=O} + \\text{H}_2\\text{O}\\). The present textbook treats only primary amines with nitrous acid, so give this less time.",
      formula: {
        label: "Aliphatic primary amine with nitrous acid",
        latex: "\\text{R-NH}_2 + \\text{HNO}_2 \\xrightarrow[\\text{NaNO}_2 + \\text{HCl}]{273\\text{ to }278\\ \\text{K}} [\\text{R-N}_2^+\\text{Cl}^-] \\xrightarrow{\\text{H}_2\\text{O}} \\text{R-OH} + \\text{N}_2\\uparrow + \\text{HCl}",
      },
      authoredExample: {
        prompt: "Write the action of nitrous acid (NaNO₂ and dilute HCl at 273 to 278 K) on (a) methylamine and (b) aniline. State what is seen in each.",
        steps: [
          "(a) Methylamine is an aliphatic primary amine. Its diazonium salt decomposes at once in water:",
          "\\(\\text{CH}_3\\text{NH}_2 + \\text{HNO}_2 \\rightarrow [\\text{CH}_3\\text{N}_2^+\\text{Cl}^-] \\xrightarrow{\\text{H}_2\\text{O}} \\text{CH}_3\\text{OH} + \\text{N}_2\\uparrow + \\text{HCl}\\)",
          "Seen: brisk effervescence of nitrogen; methanol is formed.",
          "(b) Aniline is an aromatic primary amine. Its diazonium salt is stable at 273 K:",
          "\\(\\text{C}_6\\text{H}_5\\text{NH}_2 + \\text{HNO}_2 + \\text{HCl} \\rightarrow \\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- + 2\\text{H}_2\\text{O}\\)",
          "Seen: no gas; benzenediazonium chloride stays in solution.",
        ],
        answer: "(a) Methanol and nitrogen gas; (b) benzenediazonium chloride, no gas",
      },
      selfCheckExample: {
        prompt: "An unbranched primary amine of formula C₃H₉N gives an alcohol and nitrogen gas with nitrous acid. Name the amine and the alcohol.",
        steps: [
          "An unbranched primary amine with three carbon atoms is \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{NH}_2\\).",
          "Its diazonium salt decomposes in water, replacing \\(\\text{-NH}_2\\) by \\(\\text{-OH}\\): \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{OH}\\).",
        ],
        answer: "Propan-1-amine gives propan-1-ol",
      },
      practiceSet: [
        { prompt: "Why is nitrous acid prepared in the reaction mixture and not taken from a bottle?", answer: "It is unstable" },
        { prompt: "At what temperature is diazotisation carried out?", answer: "273 to 278 K" },
        { prompt: "Which gas is evolved when an aliphatic primary amine reacts with nitrous acid?", answer: "Nitrogen, \\(\\text{N}_2\\)" },
        { prompt: "Name the product of diazotisation of an aromatic primary amine.", answer: "An arene diazonium salt" },
      ],
      pyqExampleId: "edba2d1e-6cf8-4def-86e5-82a5094073c5",
      traps: [
        {
          title: "Stopping at the aliphatic diazonium salt",
          body: "An alkyl diazonium salt is not the product: it decomposes at once to the alcohol and nitrogen. Write it in square brackets as an intermediate and carry on.",
        },
        {
          title: "Leaving out the temperature",
          body: "Write 273 to 278 K (and NaNO₂ + HCl) on the arrow. Above this the arene diazonium salt itself decomposes, so the condition is part of the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccam-hinsberg",
      name: "Hinsberg's test",
      intuition:
        "Benzenesulfonyl chloride swaps its chlorine for the amine's nitrogen wherever the nitrogen has an H to give up. A primary amine keeps one H on nitrogen in the product, and the sulfonyl group makes that H acidic, so the product dissolves in alkali. A secondary amine's product has no H left, so it does not dissolve. A tertiary amine has no H to give up at all, so it does not react.",
      definition:
        "- **Hinsberg's reagent** is benzenesulfonyl chloride, \\(\\text{C}_6\\text{H}_5\\text{SO}_2\\text{Cl}\\).\n" +
        "- **Primary amine:** gives an N-alkylbenzenesulfonamide. The H left on nitrogen is strongly acidic, so the product is **soluble in alkali**.\n" +
        "- **Secondary amine:** gives an N,N-dialkylbenzenesulfonamide with no H on nitrogen; it is not acidic and **does not dissolve in alkali**.\n" +
        "- **Tertiary amine:** has no H on nitrogen, so it **does not react**.\n" +
        "- So the test tells 1°, 2° and 3° amines apart: soluble product, insoluble product, no reaction.",
      formula: {
        label: "Hinsberg's reagent with a primary amine",
        latex: "\\text{C}_6\\text{H}_5\\text{SO}_2\\text{Cl} + \\text{H}_2\\text{N-R} \\rightarrow \\text{C}_6\\text{H}_5\\text{SO}_2\\text{NH-R} + \\text{HCl}",
      },
      authoredExample: {
        prompt: "How will you distinguish between methylamine, dimethylamine and trimethylamine by Hinsberg's test?",
        steps: [
          "Shake each amine with benzenesulfonyl chloride, then add aqueous alkali.",
          "Methylamine (1°): \\(\\text{C}_6\\text{H}_5\\text{SO}_2\\text{Cl} + \\text{CH}_3\\text{NH}_2 \\rightarrow \\text{C}_6\\text{H}_5\\text{SO}_2\\text{NHCH}_3 + \\text{HCl}\\). The N-H of the sulfonamide is acidic, so it dissolves in alkali.",
          "Dimethylamine (2°): \\(\\text{C}_6\\text{H}_5\\text{SO}_2\\text{Cl} + (\\text{CH}_3)_2\\text{NH} \\rightarrow \\text{C}_6\\text{H}_5\\text{SO}_2\\text{N(CH}_3)_2 + \\text{HCl}\\). No H on nitrogen, so it does not dissolve in alkali.",
          "Trimethylamine (3°): no H on nitrogen, so no reaction.",
        ],
        answer: "1°: product soluble in alkali; 2°: product insoluble in alkali; 3°: no reaction",
      },
      selfCheckExample: {
        prompt: "An amine of formula C₄H₁₁N reacts with Hinsberg's reagent, and the product does not dissolve in aqueous NaOH. Is the amine primary, secondary or tertiary? Give one possible structure.",
        steps: [
          "It reacted, so it has an H on nitrogen: not tertiary.",
          "The product is insoluble in alkali, so no H is left on its nitrogen: the amine had only one, so it is secondary.",
          "One secondary amine of formula C₄H₁₁N is diethylamine, \\((\\text{C}_2\\text{H}_5)_2\\text{NH}\\).",
        ],
        answer: "Secondary, for example diethylamine",
      },
      practiceSet: [
        { prompt: "Write the formula of Hinsberg's reagent.", answer: "\\(\\text{C}_6\\text{H}_5\\text{SO}_2\\text{Cl}\\), benzenesulfonyl chloride" },
        { prompt: "Why does the sulfonamide of a primary amine dissolve in alkali?", answer: "The H on its nitrogen is strongly acidic" },
        { prompt: "Why does a tertiary amine not react with benzenesulfonyl chloride?", answer: "It has no H atom on nitrogen" },
      ],
      pyqExampleId: "e2de88bc-e53d-4b0f-a02b-1bb891c3548a",
      traps: [
        {
          title: "Secondary amines 'do not react'",
          body: "A secondary amine DOES react; its sulfonamide simply does not dissolve in alkali. 'No reaction' is the tertiary amine's result.",
        },
        {
          title: "Forgetting the alkali step",
          body: "The test is read in alkali. Say whether each product dissolves in aqueous NaOH or KOH; the sulfonamide equations alone do not distinguish anything.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const TESTS_ORM_NOTE: SubtopicNote = {
  subtopicName: "Functional Group Identification Tests",
  title: "Functional Group Identification Tests",
  oneLineDefinition:
    "Each laboratory test pairs one reagent with one functional group and one thing you see, a colour, a precipitate, a smell or a gas, and an unknown is identified by the tests it passes and fails.",
  whyItMatters:
    "Eight PYQs, two of them asking for a number. Five match a test to what it detects or what you see: bromine water, Baeyer's reagent, ceric ammonium nitrate, neutral FeCl₃, the phthalein dye test, 2,4-DNP, Schiff's, Benedict's, carbylamine, Molisch and biuret. Three combine clues: compounds that pass two tests at once, a solubility screen with NaHCO₃ and NaOH, and a C₈H₉Br isomer identified from its oxidation product and alcoholic AgNO₃.",
  concepts: [
    // C1 — tests and screens
    {
      kind: "reference" as const,
      slug: "jcorm-colour-tests",
      name: "Functional-group tests: reagent, group and observation",
      intuition:
        "A test is a fast reaction that only one kind of group gives, with a result you can see. Learn each as three linked facts: the reagent, the group it detects, and the observation. Questions give one of the three and ask for another, or list compounds and ask how many pass. When two tests are named together, a compound counts only if it passes both.",
      definition:
        "- Unsaturation: bromine water loses its reddish-orange colour; Baeyer's reagent (cold, dilute, alkaline \\(\\mathrm{KMnO_4}\\)) loses its pink colour. Phenol and aniline also decolourise bromine water, with a white precipitate.\n" +
        "- Alcohol: ceric ammonium nitrate turns from yellow to red. Phenol: neutral \\(\\mathrm{FeCl_3}\\) gives a violet, blue, green or red colour; the phthalein dye test gives a pink dye in alkali.\n" +
        "- Carbonyl: 2,4-DNP gives a yellow, orange or orange-red precipitate with any aldehyde or ketone. Aldehyde only: Tollens' silver mirror, Schiff's pink colour, Fehling's or Benedict's red-brown \\(\\mathrm{Cu_2O}\\) (aliphatic aldehydes only).\n" +
        "- Iodoform (\\(\\mathrm{I_2}\\) and NaOH, or KI and NaOCl): yellow \\(\\mathrm{CHI_3}\\) from \\(\\mathrm{CH_3CO{-}}\\) or \\(\\mathrm{CH_3CH(OH){-}}\\). Ethanol and ethanal are the only primary alcohol and aldehyde that pass.\n" +
        "- Amines: carbylamine (\\(\\mathrm{CHCl_3}\\), alcoholic KOH) gives a foul-smelling isocyanide with a primary amine only; Hinsberg's reagent sorts 1°, 2° and 3°. Molisch (α-naphthol, conc. \\(\\mathrm{H_2SO_4}\\)) detects carbohydrates; biuret (alkaline \\(\\mathrm{CuSO_4}\\)) detects the peptide bond.\n" +
        "- **Solubility screen**: cold \\(\\mathrm{NaHCO_3}\\) dissolves a carboxylic acid (with \\(\\mathrm{CO_2}\\)); cold NaOH also dissolves a phenol; an ester dissolves only in HOT NaOH, by hydrolysis; an ether or hydrocarbon dissolves in none.\n" +
        "- **Structure clues**: hot \\(\\mathrm{KMnO_4}\\) turns every alkyl side chain with a benzylic H into COOH, so the acid formed shows which ring positions carry groups. Alcoholic \\(\\mathrm{AgNO_3}\\) gives AgX quickly only with a reactive halide (benzylic, allylic or tertiary), never with a halogen on the ring. From percentages: atoms of an element = molar mass × % ÷ atomic mass.",
      table: {
        columns: ["Test (reagent)", "Detects", "Positive result", "Example that passes"],
        rows: [
          { cells: ["Bromine water", "C=C or C≡C; also phenol and aniline", "Reddish-orange colour disappears; white precipitate with phenol or aniline", "Cyclohexene"] },
          { cells: ["Baeyer's reagent: cold, dilute, alkaline \\(\\mathrm{KMnO_4}\\)", "C=C or C≡C", "Pink colour disappears; brown \\(\\mathrm{MnO_2}\\)", "But-2-ene"] },
          { cells: ["Ceric ammonium nitrate", "Alcoholic –OH", "Yellow solution turns red", "Ethanol"] },
          { cells: ["Neutral \\(\\mathrm{FeCl_3}\\)", "Phenol (and enols)", "Violet, blue, green or red colour", "Phenol gives violet"] },
          { cells: ["Phthalein dye: phthalic anhydride and conc. \\(\\mathrm{H_2SO_4}\\), then NaOH", "Phenol", "Pink or red dye in alkali", "Phenol gives phenolphthalein"] },
          { cells: ["Lucas reagent: conc. HCl and \\(\\mathrm{ZnCl_2}\\)", "Class of alcohol", "Cloudy at once for 3°, in about 5 min for 2°, not at room temperature for 1°", "2-Methylpropan-2-ol, at once"] },
          { cells: ["2,4-Dinitrophenylhydrazine (2,4-DNP)", "C=O of aldehydes and ketones", "Yellow, orange or orange-red precipitate", "Propanone"] },
          { cells: ["Tollens' reagent: ammoniacal \\(\\mathrm{AgNO_3}\\)", "Aldehyde, aliphatic or aromatic", "Silver mirror", "Benzaldehyde"] },
          { cells: ["Fehling's or Benedict's solution", "Aliphatic aldehyde", "Red-brown precipitate of \\(\\mathrm{Cu_2O}\\)", "Ethanal"] },
          { cells: ["Schiff's reagent", "Aldehyde", "Pink or magenta colour returns", "Methanal"] },
          { cells: ["Iodoform: \\(\\mathrm{I_2}\\) and NaOH, or KI and NaOCl", "\\(\\mathrm{CH_3CO{-}}\\) or \\(\\mathrm{CH_3CH(OH){-}}\\)", "Yellow precipitate of \\(\\mathrm{CHI_3}\\)", "Propan-2-ol"] },
          { cells: ["\\(\\mathrm{NaHCO_3}\\) solution", "Carboxylic acid", "Brisk effervescence of \\(\\mathrm{CO_2}\\)", "Ethanoic acid"] },
          { cells: ["Carbylamine: \\(\\mathrm{CHCl_3}\\) and alcoholic KOH", "Primary amine, aliphatic or aromatic", "Foul-smelling isocyanide", "Aniline"] },
          { cells: ["Hinsberg's reagent, \\(\\mathrm{C_6H_5SO_2Cl}\\)", "Primary, secondary or tertiary amine", "1°: product dissolves in alkali; 2°: insoluble solid; 3°: no reaction", "Ethanamine dissolves; N-methylaniline gives an insoluble solid"] },
          { cells: ["Azo dye: \\(\\mathrm{NaNO_2/HCl}\\) at 0–5 °C, then alkaline 2-naphthol", "Aromatic primary amine", "Orange-red dye", "Aniline"] },
          { cells: ["Molisch's test: α-naphthol and conc. \\(\\mathrm{H_2SO_4}\\)", "Carbohydrate", "Violet ring where the layers meet", "Glucose"] },
          { cells: ["Biuret test: alkaline \\(\\mathrm{CuSO_4}\\)", "Peptide bond", "Violet colour", "Egg albumin"] },
          { cells: ["Alcoholic \\(\\mathrm{AgNO_3}\\), warm", "Reactive C–X: benzylic, allylic or tertiary", "AgCl white, AgBr pale yellow precipitate", "Benzyl chloride"], noteAmber: "A halogen on the ring (chlorobenzene) gives no precipitate." },
        ],
        caption: "Every row is reagent, group and observation; a question gives one and asks for another.",
      },
      selfCheckExample: {
        prompt:
          "Four compounds are shaken separately with cold \\(\\mathrm{NaHCO_3}\\), cold NaOH and hot NaOH: benzoic acid, 4-methylphenol, ethyl benzoate and methoxybenzene. Which dissolves in cold \\(\\mathrm{NaHCO_3}\\), which in cold NaOH but not \\(\\mathrm{NaHCO_3}\\), which only in hot NaOH, and which in none?",
        steps: [
          "\\(\\mathrm{NaHCO_3}\\) is a weak base; only the carboxylic acid is acidic enough: benzoic acid dissolves with effervescence.",
          "NaOH also removes the proton of a phenol: 4-methylphenol dissolves in cold NaOH but not in \\(\\mathrm{NaHCO_3}\\).",
          "An ester has no acidic H, but hot NaOH hydrolyses it to soluble sodium benzoate and ethanol: ethyl benzoate dissolves only when heated.",
          "Methoxybenzene is an ether and has nothing for the base to act on.",
        ],
        answer: "Benzoic acid in \\(\\mathrm{NaHCO_3}\\); 4-methylphenol in cold NaOH; ethyl benzoate only in hot NaOH; methoxybenzene in none.",
      },
      practiceSet: [
        { prompt: "Which reagent tells phenol from ethanol by a violet colour?", answer: "Neutral \\(\\mathrm{FeCl_3}\\); phenol gives the colour" },
        { prompt: "Which test is positive for propanal but not for propanone?", answer: "Tollens' test (a silver mirror); Fehling's and Schiff's also work" },
        { prompt: "Which of pentan-2-ol and pentan-3-ol gives a yellow precipitate with iodine and NaOH?", answer: "Pentan-2-ol, which has the \\(\\mathrm{CH_3CH(OH){-}}\\) unit" },
        { prompt: "An isomer of \\(\\mathrm{C_7H_7Cl}\\) gives a white precipitate at once with warm alcoholic \\(\\mathrm{AgNO_3}\\). Which isomer is it?", answer: "Benzyl chloride, \\(\\mathrm{C_6H_5CH_2Cl}\\); the chlorotoluenes, with Cl on the ring, give none" },
      ],
      pyqExampleId: "4c93f2f4-eec0-4088-94bd-b18b7cfaff8a", // 2023 — reagent to compound match: Benedict, FeCl3, carbylamine, iodoform
      traps: [
        {
          title: "Fehling's and Benedict's miss aromatic aldehydes",
          body: "Benzaldehyde gives a silver mirror with Tollens' reagent but does not reduce Fehling's or Benedict's solution. Only aliphatic aldehydes give the red-brown \\(\\mathrm{Cu_2O}\\).",
        },
        {
          title: "Iodoform needs CH₃CO or CH₃CH(OH)",
          body: "A tertiary alcohol with a methyl group, such as 2-methylpropan-2-ol, fails: its carbinol carbon has no H, so it cannot be oxidised to a methyl ketone. Ethanol and ethanal pass; methanol, propan-1-ol and propanal fail.",
        },
        {
          title: "Phenols dissolve in NaOH but not in NaHCO₃",
          body: "A simple phenol is too weak an acid to release \\(\\mathrm{CO_2}\\) from hydrogencarbonate. Only carboxylic acids (and strongly acidic phenols such as 2,4,6-trinitrophenol) dissolve in \\(\\mathrm{NaHCO_3}\\).",
        },
        {
          title: "CAN is for alcohols, FeCl₃ is for phenols",
          body: "Ceric ammonium nitrate gives a red colour with an alcoholic OH; neutral \\(\\mathrm{FeCl_3}\\) gives a violet or similar colour with a phenol. A match list that swaps them is wrong.",
        },
        {
          title: "Decolourised bromine water does not prove a C=C",
          body: "Phenol and aniline also remove the colour of bromine water, by ring substitution, and give a white precipitate. Baeyer's reagent is the cleaner test for a C=C.",
        },
      ],
    },
  ],
};

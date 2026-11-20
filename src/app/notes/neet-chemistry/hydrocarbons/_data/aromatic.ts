import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_HC_AROMATIC_NOTE: SubtopicNote = {
  subtopicName: "Aromatic Hydrocarbons",
  title: "Aromatic Hydrocarbons",
  oneLineDefinition:
    "The structure of benzene and Hückel's rule for deciding aromaticity, the ways benzene is made, and its reactions: electrophilic substitution, the two addition reactions, and which groups direct a new group to the ortho, para or meta position.",
  whyItMatters:
    "Four NEET questions from 2022 to 2026. Two are about aromaticity: the species that is not aromatic (2022) and how many species in a list obey Hückel's rule (2023). One asks which reaction does not give benzene (2025), and one counts the chlorine atoms when benzene reacts with chlorine by substitution and by addition (NEET 2026). None of the four has asked about directing groups yet.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchhc-aromaticity",
      name: "Benzene and Hückel's rule",
      intuition:
        "Benzene is not a ring of fixed single and double bonds. All six carbons are \\(sp^2\\), and each has one p orbital standing up from the flat ring; the six p orbitals overlap all the way round, so the six π electrons spread over the whole ring. That spread makes benzene unusually stable. Any ring that is flat, has a p orbital on every ring atom so the π electrons can spread all the way round, and holds 2, 6, 10 or 14 π electrons gets the same special stability: it is aromatic.",
      definition:
        "- Benzene is a resonance hybrid of the two Kekulé structures. All six C-C bonds are equal, 139 pm, between C-C (154 pm) and C=C (134 pm).\n" +
        "- **Hückel's rule**: a species is aromatic if it is **planar**, has **complete delocalisation** of π electrons in the ring, and has **(4n + 2) π electrons**, n = 0, 1, 2, ...\n" +
        "- Counting π electrons: each ring C=C gives 2. A ring carbon with a negative charge (a lone pair in a p orbital) gives 2 more. A ring carbon with a positive charge gives an empty p orbital and 0 electrons.\n" +
        "- A ring \\(\\text{CH}_2\\) (an \\(sp^3\\) carbon) has no p orbital, so it breaks the delocalisation: cyclopentadiene and cycloheptatriene are not aromatic.\n" +
        "- 4, 8 or other 4n π electrons do not fit the rule: cyclobutadiene (4) and cyclooctatetraene (8) are not aromatic.",
      formula: {
        label: "Hückel's rule",
        latex: "\\text{number of } \\pi \\text{ electrons} = 4n + 2, \\quad n = 0, 1, 2, \\ldots",
        symbols: [
          { symbol: "\\(n\\)", meaning: "zero or a whole number; 2, 6, 10 and 14 π electrons fit n = 0, 1, 2 and 3" },
        ],
      },
      authoredExample: {
        prompt: "Decide whether the cycloheptatrienyl (tropylium) cation, \\(\\text{C}_7\\text{H}_7^+\\), and cyclopentadiene, \\(\\text{C}_5\\text{H}_6\\), are aromatic.",
        steps: [
          "Tropylium cation: three C=C give 6 π electrons. The seventh carbon carries the positive charge and an empty p orbital, so every ring atom has a p orbital.",
          "It is planar and 6 = 4(1) + 2, so the cation is aromatic.",
          "Cyclopentadiene: two C=C give 4 π electrons, and its \\(\\text{CH}_2\\) carbon is \\(sp^3\\) with no p orbital, so the delocalisation is broken.",
        ],
        answer: "The tropylium cation is aromatic; cyclopentadiene is not",
      },
      selfCheckExample: {
        prompt: "Is the cyclopentadienyl cation, \\(\\text{C}_5\\text{H}_5^+\\), aromatic?",
        steps: [
          "Two C=C give 4 π electrons; the positive carbon adds an empty p orbital and no electrons.",
          "4 is not of the form 4n + 2 for any whole number n.",
        ],
        answer: "No: it has 4 π electrons",
      },
      practiceSet: [
        { prompt: "How many π electrons does benzene have, and which value of n in Hückel's rule does it fit?", answer: "6, which fits n = 1" },
        { prompt: "What is the length of each C-C bond in benzene?", answer: "139 pm (all six are equal)" },
        { prompt: "What is the hybridisation of each carbon atom in benzene?", answer: "\\(sp^2\\)" },
        { prompt: "A flat ring with complete delocalisation holds 10 π electrons. Which value of n does it fit, and is it aromatic?", answer: "n = 2; yes, it is aromatic" },
      ],
      pyqExampleId: "7fe4a07f-8885-404e-997c-ff9dee855c8f",
      traps: [
        {
          title: "A ring CH₂ breaks aromaticity",
          body: "Cycloheptatriene has 6 π electrons but one \\(sp^3\\) \\(\\text{CH}_2\\) carbon, so the π electrons cannot spread all round the ring. It is not aromatic, although its cation is.",
        },
        {
          title: "A charge changes the count",
          body: "The cyclopropenyl cation has 2 π electrons (aromatic, n = 0), but the cyclopropenyl anion has 4 (not aromatic). Count the electrons the charge adds or removes.",
        },
        {
          title: "Fused rings count too",
          body: "Naphthalene (10 π electrons) and anthracene (14) both fit 4n + 2 and are aromatic.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchhc-benzene-prep",
      name: "Making benzene",
      intuition:
        "Every laboratory route to benzene starts from something that already has six ring carbons or can be made to have them. Three ethyne molecules can close into one ring. An aromatic acid can lose its carboxyl group, just as an aliphatic acid does with soda lime. And a group already on the ring, such as OH, can be taken off. Learn each route as its reagent and conditions, because a question usually hides one route that gives something else.",
      definition:
        "- **Cyclic polymerisation of ethyne**: ethyne passed through a red hot iron tube at 873 K gives benzene (three ethyne molecules make one benzene).\n" +
        "- **Decarboxylation of an aromatic acid**: sodium benzoate heated with soda lime gives benzene.\n" +
        "- **Reduction of phenol**: phenol vapour passed over heated zinc dust gives benzene.\n" +
        "- **Aromatisation of n-hexane** over oxides of V, Mo or Cr gives benzene (see the Alkanes page).\n" +
        "- From NCERT Class 12: benzenediazonium chloride with hypophosphorous acid \\(\\text{(H}_3\\text{PO}_2\\text{)}\\) gives benzene, but with warm water it gives **phenol**.",
      table: {
        columns: ["Starting material", "Reagent and conditions", "Product"],
        rows: [
          { cells: ["Ethyne", "Red hot iron tube, 873 K", "Benzene"] },
          { cells: ["Sodium benzoate", "Soda lime, heat", "Benzene"] },
          { cells: ["Phenol", "Heated zinc dust", "Benzene"] },
          { cells: ["n-Hexane", "Oxides of V, Mo or Cr on alumina, 773 K, 10 to 20 atm", "Benzene"] },
          { cells: ["Benzenediazonium chloride", "\\(\\text{H}_3\\text{PO}_2\\)", "Benzene"] },
          { cells: ["Benzenediazonium chloride", "Warm water", "Phenol, with \\(\\text{N}_2\\) and HCl"], noteAmber: "NEET 2025: this was the one reaction in the list that does not give benzene." },
        ],
      },
      pyqExampleId: "59be23c6-cfbf-4381-823f-98c42602dedd",
      selfCheckExample: {
        prompt: "Phenol vapour is passed over heated zinc dust. What is the organic product?",
        steps: [
          "Zinc dust removes the oxygen of the OH group.",
          "The ring is left with a hydrogen in its place.",
        ],
        answer: "Benzene",
      },
      practiceSet: [
        { prompt: "How many molecules of ethyne join to form one molecule of benzene?", answer: "Three" },
        { prompt: "What does sodium 4-methylbenzoate give when heated with soda lime?", answer: "Toluene (methylbenzene)" },
        { prompt: "What does benzenediazonium chloride give with hypophosphorous acid?", answer: "Benzene" },
        { prompt: "At what temperature does ethyne form benzene in a red hot iron tube?", answer: "873 K" },
      ],
      traps: [
        {
          title: "Diazonium salt and warm water give phenol",
          body: "Benzenediazonium chloride warmed with water gives phenol, nitrogen and HCl. Benzene needs a reducing agent such as \\(\\text{H}_3\\text{PO}_2\\).",
        },
        {
          title: "Soda lime keeps the ring",
          body: "Soda lime removes only the COONa carbon. Sodium benzoate gives benzene, not a smaller ring or a chain.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchhc-eas",
      name: "Reactions of benzene and directing groups",
      visualizationSlug: "cet-directing-effects",
      intuition:
        "Benzene's ring of π electrons attracts electrophiles, but adding to the ring would destroy the special stability. So benzene prefers to swap a hydrogen for the electrophile and keep its ring of six π electrons: electrophilic substitution. Only under harsh conditions (UV light, or hydrogen with nickel at high temperature and pressure) does it add. When the ring already carries a group, that group decides where the next one goes.",
      definition:
        "- **Mechanism** (three steps): the reagent and catalyst make the electrophile; the electrophile attacks the ring to give a carbocation (arenium ion); the ring loses \\(\\text{H}^+\\) and becomes aromatic again.\n" +
        "- **Addition** needs harsh conditions: \\(\\text{H}_2\\) with Ni at high temperature and pressure gives cyclohexane; \\(\\text{Cl}_2\\) in UV light at 500 K adds three molecules to give benzene hexachloride, \\(\\text{C}_6\\text{H}_6\\text{Cl}_6\\).\n" +
        "- **Ortho and para directing, activating**: \\(\\text{-OH}\\), \\(\\text{-NH}_2\\), \\(\\text{-NHR}\\), \\(\\text{-NHCOCH}_3\\), \\(\\text{-OCH}_3\\), \\(\\text{-CH}_3\\), \\(\\text{-C}_2\\text{H}_5\\).\n" +
        "- **Halogens** direct ortho and para but **deactivate** the ring.\n" +
        "- **Meta directing, deactivating**: \\(\\text{-NO}_2\\), \\(\\text{-CN}\\), \\(\\text{-CHO}\\), \\(\\text{-COR}\\), \\(\\text{-COOH}\\), \\(\\text{-COOR}\\), \\(\\text{-SO}_3\\text{H}\\).",
      table: {
        columns: ["Reaction", "Reagent", "Electrophile or type", "Product from benzene"],
        rows: [
          { cells: ["Nitration", "Conc. \\(\\text{HNO}_3\\) and conc. \\(\\text{H}_2\\text{SO}_4\\)", "Nitronium ion, \\(\\text{NO}_2^+\\)", "Nitrobenzene"] },
          { cells: ["Halogenation", "\\(\\text{Cl}_2\\) with anhydrous \\(\\text{FeCl}_3\\) or \\(\\text{AlCl}_3\\)", "\\(\\text{Cl}^+\\)", "Chlorobenzene; with excess \\(\\text{Cl}_2\\) in the dark and cold, hexachlorobenzene \\(\\text{C}_6\\text{Cl}_6\\)"], noteAmber: "NEET 2026: substitution with six Cl₂ gives C₆Cl₆ and addition with three Cl₂ gives C₆H₆Cl₆, so both products carry 6 Cl." },
          { cells: ["Sulphonation", "Fuming sulphuric acid (oleum)", "Substitution", "Benzenesulphonic acid"] },
          { cells: ["Friedel-Crafts alkylation", "\\(\\text{CH}_3\\text{Cl}\\) with anhydrous \\(\\text{AlCl}_3\\)", "\\(\\text{CH}_3^+\\)", "Toluene"] },
          { cells: ["Friedel-Crafts acylation", "\\(\\text{CH}_3\\text{COCl}\\) with anhydrous \\(\\text{AlCl}_3\\)", "\\(\\text{CH}_3\\text{CO}^+\\)", "Acetophenone"] },
          { cells: ["Addition of chlorine", "\\(\\text{Cl}_2\\), UV light, 500 K", "Addition", "Benzene hexachloride, \\(\\text{C}_6\\text{H}_6\\text{Cl}_6\\)"] },
          { cells: ["Hydrogenation", "\\(\\text{H}_2\\), Ni, high temperature and pressure", "Addition", "Cyclohexane"] },
        ],
      },
      pyqExampleId: "3c922d4e-5f67-454e-a536-4c5cac70f5c9",
      selfCheckExample: {
        prompt: "Toluene is nitrated with conc. \\(\\text{HNO}_3\\) and conc. \\(\\text{H}_2\\text{SO}_4\\). Where does the nitro group go, and is the reaction faster or slower than with benzene?",
        steps: [
          "The \\(\\text{-CH}_3\\) group is ortho and para directing.",
          "It is also activating, so the ring reacts faster than benzene.",
        ],
        answer: "To the ortho and para positions; faster than benzene",
      },
      practiceSet: [
        { prompt: "What is the electrophile in the nitration of benzene?", answer: "The nitronium ion, \\(\\text{NO}_2^+\\)" },
        { prompt: "Nitrobenzene is brominated with \\(\\text{Br}_2\\) and \\(\\text{FeBr}_3\\). What is the main product?", answer: "m-Bromonitrobenzene (the nitro group directs meta)" },
        { prompt: "Does a chlorine atom on a benzene ring activate or deactivate it, and where does it direct a new group?", answer: "It deactivates the ring but directs ortho and para" },
        { prompt: "What does benzene give with ethanoyl chloride, \\(\\text{CH}_3\\text{COCl}\\), and anhydrous \\(\\text{AlCl}_3\\)?", answer: "Acetophenone, \\(\\text{C}_6\\text{H}_5\\text{COCH}_3\\)" },
      ],
      traps: [
        {
          title: "Substitution keeps the ring aromatic",
          body: "With a Lewis acid catalyst, benzene swaps H for Cl and stays aromatic. Only UV light makes chlorine add across the ring, and then the product is no longer aromatic.",
        },
        {
          title: "Halogens are the odd ones out",
          body: "A halogen directs a new group to the ortho and para positions, like an activating group, yet it deactivates the ring.",
        },
        {
          title: "Groups that pull electrons direct meta",
          body: "The groups CHO, COR, COOH, COOR, NO₂, CN and SO₃H all pull electrons from the ring, slow the reaction and send a new group to the meta position.",
        },
      ],
    },
  ],
};

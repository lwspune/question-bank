import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_AK_ACIDPREP_NOTE: SubtopicNote = {
  subtopicName: "Methods of Preparation of Carboxylic Acids",
  title: "Preparation of Carboxylic Acids",
  oneLineDefinition:
    "Carboxylic acids by oxidising primary alcohols, aldehydes and alkylbenzenes, by hydrolysing nitriles, amides, acyl halides, anhydrides and esters, and from Grignard reagents with carbon dioxide.",
  whyItMatters:
    "10 questions, six of them from board papers from 2022 to 2025: converting toluene, ethylbenzene, acetophenone or bromobenzene to benzoic acid (2023, 2024), and the acid from a Grignard reagent and carbon dioxide (2022, 2024, 2025). The textbook adds conversions starting from benzene and an ester to identify from its hydrolysis products.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcak-acid-oxidation",
      name: "Acids by oxidation: alcohols, aldehydes and alkylbenzenes",
      intuition:
        "A carboxylic acid is the end of the oxidation road for a carbon carrying hydrogen: primary alcohol, then aldehyde, then acid. On a benzene ring, a strong oxidising agent burns any side chain back to the single carbon joined to the ring, and that carbon becomes -COOH.",
      definition:
        "- **Primary alcohols** are oxidised to acids by **KMnO₄** (neutral, acidic or alkaline), or by **K₂Cr₂O₇** or **CrO₃** in acid (**Jones reagent**).\n" +
        "- **Aldehydes** are oxidised to acids even by mild oxidising agents.\n" +
        "- **Alkylbenzenes:** vigorous oxidation with **chromic acid** or **acidic or alkaline KMnO₄** turns the **entire side chain**, whatever its length, into -COOH. Primary and secondary alkyl groups are oxidised this way; a **tertiary** group is not affected.\n" +
        "- Suitably substituted **alkenes** are also oxidised to carboxylic acids by these reagents.",
      table: {
        columns: ["Starting compound", "Reagent", "Product"],
        rows: [
          { cells: ["Primary alcohol", "CrO₃ and H₂SO₄ (Jones reagent), or KMnO₄", "\\(\\text{CH}_3(\\text{CH}_2)_2\\text{CH}_2\\text{OH} \\rightarrow \\text{CH}_3(\\text{CH}_2)_2\\text{COOH}\\) (butan-1-ol to butanoic acid)"] },
          { cells: ["Aldehyde", "Mild oxidising agents (Tollens', Fehling's) or KMnO₄", "\\(\\text{RCHO} \\rightarrow \\text{RCOOH}\\)"] },
          {
            cells: ["Alkylbenzene", "KMnO₄ and KOH, heat, then H₃O⁺", "\\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{CH}_3 \\rightarrow \\text{C}_6\\text{H}_5\\text{COOH}\\): the whole side chain becomes -COOH"],
            pyqExampleId: "39ff6b41-ab7a-46e3-830f-f866069c5735",
            noteAmber: "Board 2023 asked acetophenone, ethylbenzene and bromobenzene to benzoic acid in one question.",
          },
          { cells: ["Alkene", "Hot KMnO₄", "Cyclohexene gives hexanedioic acid (adipic acid)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Cyclopentene is oxidised with hot KMnO₄. Write the product.",
        steps: [
          "Strong oxidation cuts the C=C and turns each of its two carbons into -COOH.",
          "The ring opens, so one five-carbon chain carries a -COOH at each end.",
          "\\(\\text{C}_5\\text{H}_8 \\xrightarrow{\\text{KMnO}_4,\\ \\text{heat}} \\text{HOOC-(CH}_2)_3\\text{-COOH}\\)",
        ],
        answer: "Pentanedioic acid, HOOC(CH₂)₃COOH",
      },
      practiceSet: [
        { prompt: "Does tert-butylbenzene give benzoic acid with hot alkaline KMnO₄?", answer: "No: a tertiary alkyl group is not oxidised" },
        { prompt: "Name the reagent CrO₃ in aqueous H₂SO₄.", answer: "Jones reagent; it oxidises a primary alcohol to the carboxylic acid" },
        { prompt: "4-Methylacetophenone is oxidised with hot KMnO₄. Which acid forms?", answer: "Benzene-1,4-dicarboxylic acid: both side chains become -COOH" },
      ],
      pyqExampleId: "86be2b1e-ec3b-45ad-aff3-435582e6f476",
      traps: [
        {
          title: "Keeping part of the side chain",
          body: "Ethylbenzene gives benzoic acid, not phenylacetic acid: strong oxidation leaves only the carbon joined to the ring. Count the carbons in the product: always the ring plus one.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcak-acid-grignard",
      name: "Acids from Grignard reagents, nitriles and acid derivatives",
      intuition:
        "Carbon dioxide is a carbonyl compound too, so a Grignard reagent adds to it; acid then frees the carboxylic acid. A nitrile already has the right carbon: water, with acid or alkali, turns -CN into -CONH₂ and then into -COOH. Both routes turn an alkyl halide into an acid with one carbon more.",
      definition:
        "- **Grignard reagents** react with **carbon dioxide (dry ice)** to give salts of carboxylic acids; **acidification** with mineral acid gives the acid.\n" +
        "- **Nitriles** are hydrolysed, with H⁺ or OH⁻ as catalyst, first to **amides** and then to **acids**. Mild conditions stop the reaction at the amide.\n" +
        "- Both routes start from an alkyl halide and give an acid with **one carbon more** (ascending the series).\n" +
        "- **Acyl chlorides** are hydrolysed by water (faster by aqueous base, then acid); **anhydrides** by water.\n" +
        "- **Esters:** acidic hydrolysis gives the acid directly; basic hydrolysis gives the carboxylate, which acid turns into the acid.",
      formula: {
        label: "Carboxylic acid from a Grignard reagent",
        latex: "\\text{R-MgX} + \\text{CO}_2 \\xrightarrow{\\text{dry ether}} \\text{R-COOMgX} \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{R-COOH}",
      },
      authoredExample: {
        prompt: "Convert bromoethane into propanoic acid by two different routes.",
        steps: [
          "Both routes must add one carbon: two carbons in, three out.",
          "Grignard route: \\(\\text{C}_2\\text{H}_5\\text{Br} \\xrightarrow{\\text{Mg, dry ether}} \\text{C}_2\\text{H}_5\\text{MgBr} \\xrightarrow{\\text{CO}_2} \\text{C}_2\\text{H}_5\\text{COOMgBr} \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{C}_2\\text{H}_5\\text{COOH}\\)",
          "Nitrile route: \\(\\text{C}_2\\text{H}_5\\text{Br} \\xrightarrow{\\text{KCN}} \\text{C}_2\\text{H}_5\\text{CN} \\xrightarrow{\\text{H}_3\\text{O}^+,\\ \\text{heat}} \\text{C}_2\\text{H}_5\\text{COOH}\\)",
        ],
        answer: "Through C₂H₅MgBr and CO₂, or through C₂H₅CN and hydrolysis: propanoic acid, CH₃CH₂COOH",
      },
      selfCheckExample: {
        prompt: "Ethyl ethanoate is boiled with dilute sulphuric acid. Write the equation and name the products.",
        steps: [
          "Acidic hydrolysis of an ester gives the carboxylic acid and the alcohol directly.",
          "\\(\\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{H}_2\\text{O} \\xrightarrow{\\text{H}^+} \\text{CH}_3\\text{COOH} + \\text{C}_2\\text{H}_5\\text{OH}\\)",
        ],
        answer: "Ethanoic acid and ethanol",
      },
      practiceSet: [
        { prompt: "Which acid forms when C₆H₅MgBr reacts with dry ice and the product is acidified?", answer: "Benzoic acid, C₆H₅COOH" },
        { prompt: "How is the hydrolysis of a nitrile stopped at the amide stage?", answer: "By using mild reaction conditions" },
        { prompt: "What forms when ethanoyl chloride is hydrolysed with water?", answer: "Ethanoic acid and HCl" },
      ],
      pyqExampleId: "a844497c-bf6b-4446-957a-573e717e12df",
      traps: [
        {
          title: "Forgetting the extra carbon",
          body: "The carbon of CO₂ becomes the -COOH carbon, so the acid has one carbon more than the Grignard reagent's alkyl group. Propylmagnesium bromide gives butanoic acid, not propanoic acid.",
        },
        {
          title: "Stopping basic ester hydrolysis at the salt",
          body: "Hydrolysis with alkali gives the carboxylate salt. Write the acidification step to get the free acid.",
        },
      ],
    },
  ],
};

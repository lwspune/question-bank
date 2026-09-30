import type { SubtopicNote } from "@/app/notes/_types";

export const TESTS_AMINE_NOTE: SubtopicNote = {
  subtopicName: "Carbylamine and Hinsberg Tests",
  title: "Carbylamine and Hinsberg Tests",
  oneLineDefinition:
    "The carbylamine test picks out primary amines by the smell of an isocyanide, and Hinsberg's reagent sorts primary, secondary and tertiary amines by whether a sulphonamide forms and dissolves in alkali.",
  whyItMatters:
    "Twenty-one PYQs, three numerical, four from 2026. Five test the carbylamine reaction and the isocyanide it gives; eleven test Hinsberg's reagent, often by counting how many amines in a list react or give an alkali-soluble product; five combine several tests to identify an amine from its formula.",
  concepts: [
    // C1 — carbylamine
    {
      kind: "formula" as const,
      slug: "jcamine-carbylamine",
      name: "Carbylamine (isocyanide) test for primary amines",
      intuition:
        "Chloroform and alcoholic KOH make dichlorocarbene, which attacks the amine nitrogen. Only a nitrogen with two hydrogens can lose both and end up as R–N≡C, an isocyanide with a very unpleasant smell. Secondary and tertiary amines cannot, so the smell marks a primary amine.",
      definition:
        "- Heat the amine with \\(\\mathrm{CHCl_3}\\) and alcoholic KOH. A foul smell means a **primary** amine.\n" +
        "- Works for primary aliphatic and primary aromatic amines alike. Secondary and tertiary amines give no isocyanide.\n" +
        "- The isocyanide can be hydrolysed back by dilute acid: \\(\\mathrm{RNC + 2H_2O \\xrightarrow{H^+} RNH_2 + HCOOH}\\).\n" +
        "- Isocyanides also form from alkyl halides and **AgCN** (covalent: nitrogen attacks), while KCN (ionic: carbon attacks) gives nitriles.\n" +
        "- The test distinguishes ethylamine from diethylamine; it does not tell aliphatic from aromatic primary amines.",
      formula: {
        label: "Carbylamine reaction",
        latex: "\\mathrm{RNH_2 + CHCl_3 + 3KOH \\xrightarrow{\\Delta} R{-}N{\\equiv}C + 3KCl + 3H_2O}",
      },
      authoredExample: {
        prompt:
          "Which of these give the carbylamine test: 4-methylaniline, N-methylaniline, cyclohexylamine and triethylamine?",
        steps: [
          "The test needs a primary amine, with two hydrogens on nitrogen.",
          "4-Methylaniline, \\(\\mathrm{CH_3C_6H_4NH_2}\\), is primary aromatic: positive.",
          "N-Methylaniline, \\(\\mathrm{C_6H_5NHCH_3}\\), is secondary: negative.",
          "Cyclohexylamine, \\(\\mathrm{C_6H_{11}NH_2}\\), is primary aliphatic: positive.",
          "Triethylamine is tertiary: negative.",
        ],
        answer: "4-Methylaniline and cyclohexylamine",
      },
      selfCheckExample: {
        prompt: "Give two different ways to make ethyl isocyanide, \\(\\mathrm{C_2H_5NC}\\).",
        steps: [
          "From an amine: the carbylamine reaction on ethanamine, \\(\\mathrm{C_2H_5NH_2 + CHCl_3 + 3KOH}\\).",
          "From a halide: bromoethane with AgCN, whose nitrogen attacks the carbon.",
        ],
        answer: "Ethanamine with \\(\\mathrm{CHCl_3}\\) and alcoholic KOH; or bromoethane with AgCN",
      },
      practiceSet: [
        { prompt: "Does N,N-dimethylaniline give the carbylamine test?", answer: "No: it is a tertiary amine" },
        { prompt: "Which reagent distinguishes ethanamine from N-ethylethanamine?", answer: "\\(\\mathrm{CHCl_3}\\) with alcoholic KOH: only ethanamine gives the foul-smelling isocyanide" },
        { prompt: "What forms when benzylamine is heated with \\(\\mathrm{CHCl_3}\\) and alcoholic KOH?", answer: "Benzyl isocyanide, \\(\\mathrm{C_6H_5CH_2NC}\\)" },
        { prompt: "Which gives an isocyanide with an alkyl halide: KCN or AgCN?", answer: "AgCN" },
      ],
      pyqExampleId: "d214c5a9-674f-4983-b4c5-89eca1dca0fb", // 2021 — primary amine to isonitrile, acid hydrolysis
      traps: [
        {
          title: "The carbylamine test covers aromatic amines too",
          body: "Aniline gives phenyl isocyanide just as ethanamine gives ethyl isocyanide. The test separates primary from secondary and tertiary amines, not aliphatic from aromatic.",
        },
        {
          title: "Isocyanide from a halide needs AgCN",
          body: "KCN with an alkyl halide gives a nitrile, R–C≡N. AgCN gives the isocyanide, R–N≡C. An aryl halide gives neither under ordinary conditions.",
        },
      ],
    },

    // C2 — Hinsberg
    {
      kind: "reference" as const,
      slug: "jcamine-hinsberg",
      name: "Hinsberg test: benzenesulphonyl chloride with primary, secondary and tertiary amines",
      intuition:
        "Benzenesulphonyl chloride reacts with any amine that still has an N–H, giving a sulphonamide. What happens next depends on whether an N–H is left. The sulphonyl group makes a remaining N–H acidic, so a primary amine's sulphonamide dissolves in alkali. A secondary amine's sulphonamide has no N–H and stays as a solid. A tertiary amine does not react at all.",
      definition:
        "- **Hinsberg's reagent** is benzenesulphonyl chloride, \\(\\mathrm{C_6H_5SO_2Cl}\\); p-toluenesulphonyl chloride works the same way.\n" +
        "- Primary: \\(\\mathrm{RNH_2 \\to C_6H_5SO_2NHR}\\), soluble in KOH or NaOH because the N–H is acidic.\n" +
        "- Secondary: \\(\\mathrm{R_2NH \\to C_6H_5SO_2NR_2}\\), a solid insoluble in alkali.\n" +
        "- Tertiary: no reaction; no N–H to replace.\n" +
        "- The same rules hold for aryl amines: aniline, N-methylaniline and diphenylamine all react; N,N-dimethylaniline and triphenylamine do not.\n" +
        "- The test is used both to tell the three classes apart and to separate a mixture of them.",
      table: {
        columns: ["Amine class", "Example", "Product with the reagent", "Behaviour in alkali"],
        rows: [
          { cells: ["Primary aliphatic", "\\(\\mathrm{C_2H_5NH_2}\\)", "\\(\\mathrm{C_6H_5SO_2NHC_2H_5}\\)", "Dissolves: the N–H is acidic"] },
          { cells: ["Primary aromatic", "\\(\\mathrm{C_6H_5NH_2}\\)", "\\(\\mathrm{C_6H_5SO_2NHC_6H_5}\\)", "Dissolves: the N–H is acidic"] },
          { cells: ["Secondary aliphatic", "\\(\\mathrm{(C_2H_5)_2NH}\\)", "\\(\\mathrm{C_6H_5SO_2N(C_2H_5)_2}\\)", "Insoluble solid: no N–H left"] },
          { cells: ["Secondary aromatic", "\\(\\mathrm{C_6H_5NHCH_3}\\)", "\\(\\mathrm{C_6H_5SO_2N(CH_3)C_6H_5}\\)", "Insoluble solid: no N–H left"] },
          { cells: ["Tertiary", "\\(\\mathrm{(C_2H_5)_3N}\\) or \\(\\mathrm{C_6H_5N(CH_3)_2}\\)", "No reaction", "The amine is unchanged"] },
        ],
        caption: "Reacts and dissolves: primary. Reacts and stays solid: secondary. No reaction: tertiary.",
      },
      selfCheckExample: {
        prompt:
          "How many of these give an alkali-soluble product with Hinsberg's reagent: propan-1-amine, N-methylpropan-1-amine, N,N-dimethylpropan-1-amine and 4-methylaniline?",
        steps: [
          "Only primary amines give an alkali-soluble sulphonamide.",
          "Propan-1-amine is primary; 4-methylaniline is primary aromatic.",
          "N-Methylpropan-1-amine is secondary (insoluble product) and N,N-dimethylpropan-1-amine is tertiary (no reaction).",
        ],
        answer: "Two: propan-1-amine and 4-methylaniline",
      },
      practiceSet: [
        { prompt: "What is Hinsberg's reagent?", answer: "Benzenesulphonyl chloride, \\(\\mathrm{C_6H_5SO_2Cl}\\)" },
        { prompt: "Why is the sulphonamide from a primary amine soluble in alkali?", answer: "The \\(\\mathrm{SO_2}\\) group makes its remaining N–H acidic, so alkali removes it as a proton" },
        { prompt: "What does \\(\\mathrm{(CH_3)_2NH}\\) give with benzenesulphonyl chloride?", answer: "N,N-Dimethylbenzenesulphonamide, a solid insoluble in alkali" },
        { prompt: "Does triethylamine react with Hinsberg's reagent?", answer: "No" },
      ],
      pyqExampleId: "75493268-b4b5-4443-9aad-fd0e873ee2fc", // 2022 — which statement about p-toluenesulphonyl chloride is wrong
      traps: [
        {
          title: "A secondary amine's product does not dissolve in alkali",
          body: "The sulphonamide from a secondary amine has no hydrogen on nitrogen, so alkali has nothing to remove. It stays as an insoluble solid. Only a primary amine's product dissolves.",
        },
        {
          title: "A clear solution means a primary amine",
          body: "When a primary amine reacts with the reagent in alkali, the sulphonamide dissolves as its salt and the solution stays clear. A precipitate means a secondary amine; an unchanged amine means a tertiary one.",
        },
      ],
    },

    // C3 — putting the tests together
    {
      kind: "reference" as const,
      slug: "jcamine-identify-amine",
      name: "Identifying an amine from its test results",
      intuition:
        "Most identification questions give a formula and three or four observations. Each observation removes a class: the carbylamine smell means primary, an alkali-soluble Hinsberg product means primary, nitrogen gas with nitrous acid means primary aliphatic, and a coloured dye after diazotisation means primary aromatic. Read every clue against the table before drawing structures.",
      definition:
        "- Every amine dissolves in dilute mineral acid as its salt; this confirms a base but not its class.\n" +
        "- A primary aliphatic amine gives \\(\\mathrm{N_2}\\) with nitrous acid in the cold; a primary aromatic amine gives a diazonium salt that couples with β-naphthol to an orange-red dye.\n" +
        "- A secondary amine with nitrous acid gives an N-nitrosamine, a yellow oil.\n" +
        "- A tertiary aromatic amine such as N,N-dimethylaniline is nitrosated on the ring, para to nitrogen.\n" +
        "- Optical activity points to a stereocentre: among \\(\\mathrm{C_4H_{11}N}\\) primary amines only butan-2-amine is chiral.",
      table: {
        columns: ["Test", "Primary aliphatic", "Primary aromatic", "Secondary", "Tertiary"],
        rows: [
          { cells: ["\\(\\mathrm{CHCl_3}\\) + alcoholic KOH, heat", "Foul-smelling isocyanide", "Foul-smelling isocyanide", "No isocyanide", "No isocyanide"] },
          { cells: ["Hinsberg's reagent, then alkali", "Sulphonamide, dissolves", "Sulphonamide, dissolves", "Sulphonamide, insoluble solid", "No reaction"] },
          { cells: ["\\(\\mathrm{NaNO_2}\\) + HCl, cold", "\\(\\mathrm{N_2}\\) gas and an alcohol", "Diazonium salt, no gas at 273–278 K", "N-Nitrosamine, yellow oil", "Aliphatic: soluble salt; aromatic: p-nitroso compound"] },
          { cells: ["Diazotise, then β-naphthol in NaOH", "No dye", "Orange-red azo dye", "No dye", "No dye"] },
          { cells: ["Dilute HCl", "Dissolves as a salt", "Dissolves as a salt", "Dissolves as a salt", "Dissolves as a salt"] },
        ],
        caption: "The dye test is the one that separates primary aromatic from primary aliphatic amines.",
      },
      selfCheckExample: {
        prompt:
          "An amine \\(\\mathrm{C_7H_9N}\\) dissolves in dilute HCl, gives a foul smell with \\(\\mathrm{CHCl_3}\\) and alcoholic KOH, and after diazotisation at 273 K couples with β-naphthol to give an orange-red dye. Which isomers fit?",
        steps: [
          "The foul smell means a primary amine.",
          "The dye means a primary aromatic amine, with \\(\\mathrm{NH_2}\\) on the ring; this rules out benzylamine, whose nitrogen is on \\(\\mathrm{CH_2}\\).",
          "N-Methylaniline is secondary and is ruled out by the smell test.",
        ],
        answer: "2-, 3- or 4-methylaniline (the toluidines)",
      },
      practiceSet: [
        { prompt: "Which test separates aniline from cyclohexylamine?", answer: "Diazotisation at 273–278 K followed by β-naphthol: only aniline gives an orange-red dye" },
        { prompt: "What does a secondary amine give with nitrous acid?", answer: "An N-nitrosamine, a yellow oily compound" },
        { prompt: "Which primary amine of formula \\(\\mathrm{C_4H_{11}N}\\) is optically active?", answer: "Butan-2-amine, \\(\\mathrm{CH_3CH_2CH(NH_2)CH_3}\\)" },
        { prompt: "An amine gives no reaction with Hinsberg's reagent but dissolves in dilute HCl. What class is it?", answer: "Tertiary" },
      ],
      pyqExampleId: "0209fc84-3be0-44f2-8d09-38f3ec24ed88", // 2026 — C6H7N identified as aniline, H types in its sulphonamide
      traps: [
        {
          title: "Dissolving in acid does not identify the class",
          body: "Primary, secondary and tertiary amines all dissolve in dilute mineral acid as salts. Solubility in acid shows only that the compound is a base.",
        },
        {
          title: "Benzylamine behaves as an aliphatic amine in the tests",
          body: "Benzylamine gives the carbylamine test and an alkali-soluble Hinsberg product, but with nitrous acid it gives nitrogen gas and benzyl alcohol, not a stable diazonium salt, so it gives no azo dye.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const REACTIONS_AND_BASICITY_NOTE: SubtopicNote = {
  subtopicName: "Chemical Reactions and Basicity of Amines",
  title: "Chemical Reactions and Basicity of Amines",
  oneLineDefinition:
    "Amines are bases — in water the secondary alkylamine is strongest and aniline weakest, so pKb runs the other way — and their reactions sort them by degree: acylation and the Hinsberg test need an N–H, the carbylamine test needs NH₂, exhaustive methylation and Hofmann elimination take any amine to an alkene.",
  whyItMatters:
    "28 PYQs, 3 HARD — the largest page in the chapter. Fourteen are basicity in one wording or another (highest or lowest pKb, the aqueous methylamine order, the stability of R₃NH⁺); six are the tests (Hinsberg's reagent by name and formula, carbylamine's product and which amine gives it, which amine cannot be acylated); eight are exhaustive methylation and Hofmann elimination, including the two HARD rows on which alkene leaves a triethylpropylammonium salt. " +
    "Three cards.",
  concepts: [
    // 1 — basicity
    {
      kind: "formula" as const,
      slug: "cetam-basicity-and-pkb",
      name: "Basicity: the Aqueous Order and pKb",
      intuition:
        "Alkyl groups push electrons onto N (+I), so in the gas phase basicity rises 1° < 2° < 3°. In WATER the ammonium ion must also be solvated, and a tertiary ion has only one N–H to hydrogen-bond with — so the secondary amine wins and the tertiary drops to third: (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃. Aniline is far weaker than all of them because its lone pair is delocalised into the ring. Low pKb = strong base.",
      definition:
        "- Aqueous: \\((\\text{CH}_3)_2\\text{NH} > \\text{CH}_3\\text{NH}_2 > (\\text{CH}_3)_3\\text{N} > \\text{NH}_3\\); for ethyl: \\((\\text{C}_2\\text{H}_5)_2\\text{NH} > (\\text{C}_2\\text{H}_5)_3\\text{N} > \\text{C}_2\\text{H}_5\\text{NH}_2 > \\text{NH}_3\\). 'Expected' (+I only, as the 2025 paper keys): \\(\\text{NH}_3 < \\text{RNH}_2 < \\text{R}_2\\text{NH} < \\text{R}_3\\text{N}\\).\n" +
        "- Strongest base among ammonia, ethylamine, diethylamine, triethylamine: **diethylamine**. Lowest pKb among N-methylethanamine, propan-2-amine, NH₃, aniline: **N-methylethanamine**.\n" +
        "- Aromatic amines: aniline weakest (highest pKb); benzylamine \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{NH}_2\\) is aliphatic and much stronger. Order: p-toluidine > aniline > p-nitroaniline.\n" +
        "- Conjugate-acid stability: \\(\\text{R}_3\\text{NH}^+ > \\text{R}_2\\text{NH}_2^+ > \\text{RNH}_3^+ > \\text{NH}_4^+\\) (+I); NH₄⁺ least stable.\n" +
        "- pKb decreasing: \\(\\text{NH}_3 > \\text{RNH}_2 > \\text{R}_2\\text{NH}\\).",
      formula: {
        label: "Aqueous basicity",
        latex:
          "\\text{R}_2\\text{NH} > \\text{RNH}_2 \\gtrless \\text{R}_3\\text{N} > \\text{NH}_3 \\gg \\text{C}_6\\text{H}_5\\text{NH}_2;\\qquad \\text{low } pK_b = \\text{strong base}",
      },
      authoredExample: {
        prompt: "Arrange aniline, ammonia, methylamine and dimethylamine by increasing pKb, and say which of N-methylaniline and benzylamine is the stronger base.",
        steps: [
          "Strongest base has the lowest pKb: dimethylamine < methylamine < ammonia < aniline. Benzylamine — its N is not on the ring.",
        ],
        answer: "(CH₃)₂NH < CH₃NH₂ < NH₃ < C₆H₅NH₂; benzylamine",
      },
      selfCheckExample: {
        prompt: "Which has the highest pKb: (CH₃)₂NH, (CH₃)₃N, CH₃NH₂, C₆H₅NH₂? And the lowest among C₂H₅NH₂, (CH₃)₃N, C₆H₅NH₂, C₆H₅CH₂NH₂?",
        steps: [
          "Highest pKb = weakest base = aniline. Lowest as keyed: ethylamine.",
        ],
        answer: "Aniline; ethylamine",
      },
      practiceSet: [
        { prompt: "Strongest base in water: NH₃, CH₃NH₂, (CH₃)₂NH, (CH₃)₃N?", answer: "(CH₃)₂NH" },
        { prompt: "Highest pKb: arylamine, 3°, 2° or 1° alkanamine?", answer: "Arylamine" },
        { prompt: "Most stable: NH₄⁺, RNH₃⁺, R₂NH₂⁺, R₃NH⁺?", answer: "R₃NH⁺" },
        { prompt: "Increasing basic strength of methylamines in water?", answer: "NH₃ < (CH₃)₃N < CH₃NH₂ < (CH₃)₂NH" },
      ],
      pyqExampleId: "00b57328-210b-491b-8f4a-b50887ae9cc8",
      traps: [
        {
          title: "Reading pKb as basic strength",
          body:
            "pKb is −log Kb: the STRONGER the base, the SMALLER the number. 'Highest pKb' asks for the weakest base — aniline — and the strongest base has the lowest.",
        },
      ],
    },

    // 2 — tests and acylation
    {
      kind: "formula" as const,
      slug: "cetam-acylation-carbylamine-and-hinsberg",
      name: "Acylation, the Carbylamine Test and Hinsberg's Reagent",
      intuition:
        "Each reaction needs a particular hydrogen on nitrogen. Acylation (acetyl chloride, acetic anhydride) replaces an N–H, so primary and secondary amines react and tertiary ones do not. The carbylamine reaction needs BOTH hydrogens: only a primary amine with chloroform and alcoholic KOH gives the foul-smelling isocyanide. Hinsberg's reagent, benzenesulphonyl chloride, gives a KOH-soluble sulphonamide with a primary amine, an insoluble one with a secondary amine, and nothing with a tertiary amine.",
      definition:
        "- **Acylation**: \\(\\text{RNH}_2\\) or \\(\\text{R}_2\\text{NH}\\) + \\(\\text{CH}_3\\text{COCl}\\) → N-acyl amide. Does NOT react: \\((\\text{C}_2\\text{H}_5)_3\\text{N}\\), N,N-dimethylaniline, ethyldimethylamine. N-Methylaniline DOES.\n" +
        "- **Carbylamine**: \\(\\text{RNH}_2 + \\text{CHCl}_3 + 3\\text{KOH} \\to \\text{R-NC}\\) (alkyl isocyanide) + 3KCl + 3H₂O. Foul smell; primary amines only — ethylamine yes, dimethylamine and trimethylamine no.\n" +
        "- **Hinsberg's reagent** = benzenesulphonyl chloride \\(\\text{C}_6\\text{H}_5\\text{SO}_2\\text{Cl}\\). 1°: sulphonamide soluble in alkali; 2°: insoluble; 3°: no reaction.\n" +
        "- Aniline + Br₂ water → 2,4,6-tribromoaniline; aniline + H₂SO₄ → sulphanilic acid; nitration of aniline needs acetylation first.",
      formula: {
        label: "Carbylamine reaction",
        latex:
          "\\text{R-NH}_2 + \\text{CHCl}_3 + 3\\text{KOH} \\xrightarrow{\\Delta} \\text{R-N≡C} + 3\\text{KCl} + 3\\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt: "Three liquids are ethylamine, diethylamine and triethylamine. Use Hinsberg's reagent and the carbylamine test to identify each.",
        steps: [
          "Carbylamine (CHCl₃/KOH): only ethylamine smells foul. Hinsberg: ethylamine gives an alkali-soluble sulphonamide, diethylamine an insoluble one, triethylamine nothing.",
        ],
        answer: "Ethylamine — foul smell, soluble sulphonamide; diethylamine — insoluble sulphonamide; triethylamine — no reaction",
      },
      selfCheckExample: {
        prompt: "Which does not react with acetyl chloride: CH₃CH₂NH₂, CH₃CH₂CH₂NHCH₃, (CH₃CH₂)₃N, (CH₃)₃CNH₂?",
        steps: [
          "The tertiary amine has no N–H.",
        ],
        answer: "\\((\\text{CH}_3\\text{CH}_2)_3\\text{N}\\)",
      },
      practiceSet: [
        { prompt: "Formula of Hinsberg's reagent?", answer: "\\(\\text{C}_6\\text{H}_5\\text{SO}_2\\text{Cl}\\)" },
        { prompt: "Major product of the carbylamine reaction?", answer: "Alkyl isocyanide" },
        { prompt: "Foul smell with CHCl₃/alc. KOH: (CH₃)₃N, (CH₃)₂NH, (C₂H₅)₂NH or CH₃CH₂NH₂?", answer: "CH₃CH₂NH₂" },
        { prompt: "Which undergoes acylation: N-methylaniline or N,N-dimethylaniline?", answer: "N-Methylaniline" },
      ],
      pyqExampleId: "07f70aaf-cd6a-43db-b437-7132ae4c16c5",
      traps: [
        {
          title: "Giving the carbylamine test to a secondary amine",
          body:
            "It needs two N–H hydrogens to form the isocyanide; secondary and tertiary amines give no smell. Acylation, by contrast, needs only ONE N–H — so secondary amines acylate but do not give carbylamine.",
        },
      ],
    },

    // 3 — alkylation and Hofmann elimination
    {
      kind: "formula" as const,
      slug: "cetam-alkylation-and-hofmann-elimination",
      name: "Exhaustive Methylation and Hofmann Elimination",
      intuition:
        "An amine keeps attacking methyl iodide until nitrogen carries four groups — a quaternary ammonium iodide; from a primary amine that takes THREE CH₃I. Moist Ag₂O swaps the iodide for hydroxide, and heating eliminates: the hydroxide takes a β-hydrogen from the LEAST substituted alkyl group and that group leaves as an alkene (Hofmann, anti-Saytzeff), the rest staying as a tertiary amine. On a triethylpropylammonium salt the ethyl's β-H is the more accessible, so ETHENE leaves — n moles of it from n moles of salt.",
      definition:
        "- \\(\\text{CH}_3\\text{NH}_2 \\xrightarrow{3\\,\\text{CH}_3\\text{I}} (\\text{CH}_3)_4\\text{N}^+\\text{I}^-\\): **three** moles of iodomethane (two N–H replaced, then the lone pair).\n" +
        "- **Hofmann elimination**: \\(\\text{R}_4\\text{N}^+\\text{X}^- \\xrightarrow{\\text{moist Ag}_2\\text{O}} \\text{R}_4\\text{N}^+\\text{OH}^- \\xrightarrow{\\Delta} \\text{alkene} + \\text{R}_3\\text{N} + \\text{H}_2\\text{O}\\). This is the ELIMINATION; \\(\\text{RCONH}_2 \\to \\text{RNH}_2\\) is the DEGRADATION; \\(\\text{RNH}_2 \\to \\text{R}_4\\text{NX}\\) is exhaustive methylation.\n" +
        "- Least substituted alkene leaves: \\(\\text{C}_3\\text{H}_7\\text{N}^+(\\text{C}_2\\text{H}_5)_3\\text{I}^-\\) → **ethene** (n mol per n mol salt) + triethylamine-free amine \\(\\text{C}_3\\text{H}_7\\text{N(C}_2\\text{H}_5)_2\\); not propene.\n" +
        "- Diethyldimethylammonium hydroxide → \\(\\text{CH}_2\\text{=CH}_2\\) + \\(\\text{CH}_3\\text{CH}_2\\text{N(CH}_3)_2\\).",
      formula: {
        label: "Hofmann elimination",
        latex:
          "\\text{R}_3\\text{N}^+\\text{-CH}_2\\text{CH}_3\\ \\text{OH}^- \\xrightarrow{\\Delta} \\text{R}_3\\text{N} + \\text{CH}_2\\text{=CH}_2 + \\text{H}_2\\text{O} \\quad (\\text{least substituted alkene})",
      },
      authoredExample: {
        prompt: "Ethylamine is treated with excess CH₃I, then moist Ag₂O, then heated. Give the alkene and the amine formed, and the number of CH₃I consumed.",
        steps: [
          "Three CH₃I give ethyltrimethylammonium iodide. Ag₂O then heat: the ethyl group's β-H is taken — ethene + trimethylamine.",
        ],
        answer: "Ethene + trimethylamine; 3 mol CH₃I",
      },
      selfCheckExample: {
        prompt: "Which conversion is Hofmann ELIMINATION: RCONH₂ → RNH₂ (Br₂/KOH); RNH₂ → R₄NX (excess RX); R₄NX → alkene + R₃N (moist Ag₂O, Δ); RCN → RCH₂NH₂ (Na/EtOH)?",
        steps: [
          "The quaternary salt losing an alkene.",
        ],
        answer: "\\(\\text{R}_4\\text{NX} \\to\\) alkene + \\(\\text{R}_3\\text{N}\\)",
      },
      practiceSet: [
        { prompt: "Moles of CH₃I to take CH₃NH₂ to (CH₃)₄N⁺I⁻?", answer: "Three" },
        { prompt: "Alkene from N,N,N-triethylpropylammonium iodide with moist Ag₂O, then heat?", answer: "Ethene" },
        { prompt: "Moles of ethene from n mol of that salt?", answer: "n" },
        { prompt: "Substrate giving CH₃CH₂N(CH₃)₂ + ethene on Hofmann elimination?", answer: "Diethyldimethylammonium halide" },
      ],
      pyqExampleId: "bc3ede43-bf11-43a9-9c75-a9798ac784ca",
      traps: [
        {
          title: "Eliminating the propyl group because it is 'bigger'",
          body:
            "Hofmann elimination removes the β-hydrogen that is easiest to reach — on the LEAST substituted, least hindered alkyl. Ethyl beats propyl: ethene forms, propene does not.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Preparation — Hofmann degradation, the other Hofmann",
      href: "/notes/mht-cet-chemistry/amines/cetam-preparation",
    },
    {
      label: "Diazonium Salts — what a primary AROMATIC amine does with nitrous acid",
      href: "/notes/mht-cet-chemistry/amines/cetam-diazonium-salts",
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_AM_REACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Chemical Reactions of Amines",
  title: "Chemical Reactions of Amines",
  oneLineDefinition:
    "Basic character and pKb of aliphatic and aromatic amines, alkylation and acylation, the carbylamine reaction, nitrous acid, Hinsberg's test, and electrophilic substitution in aniline with the -NH₂ group protected.",
  whyItMatters:
    "103 questions, ninety of them from board papers, from 12 in 2022 to 22 in each of 2025 and 2026. Putting amines in order of basic strength or pKb is asked every year, in water and once in the gas phase (2024). The carbylamine test comes every year and Hinsberg's reagent in 2022, 2024, 2025 and 2026, often as MCQs on which amine gives an alkali-soluble product. Why aniline does not undergo Friedel-Crafts reaction (2022, 2023 and 2024) and why its nitration gives so much meta product (2022, 2023, 2025 and 2026) are the favourite \"give reasons\".",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcam-basic-alkyl",
      name: "Basic strength of aliphatic amines",
      intuition:
        "An amine is a base because the lone pair on its nitrogen can take a proton. Alkyl groups push electrons towards the nitrogen, so the lone pair is more available and the cation formed is more stable. In the gas phase that is the whole story. In water the cation is also held by hydrogen bonds to water through its N-H hydrogens, and big groups get in the way, so the order changes.",
      definition:
        "- Amines react with acids to form **salts**; NaOH gives the amine back. The salts dissolve in water but not in ether, which is used to separate amines from non-basic compounds.\n" +
        "- Amines behave as **Lewis bases** because of the unshared pair on nitrogen. Larger Kb, or smaller pKb, means a stronger base.\n" +
        "- pKb of ammonia is 4.75. Aliphatic amines (pKb 3 to 4.22) are **stronger bases than ammonia** because of the **+I effect** of the alkyl groups.\n" +
        "- **Gas phase:** only the +I effect acts, so 3° > 2° > 1° > NH₃.\n" +
        "- **In water:** the substituted ammonium ion is also stabilised by **solvation** (hydrogen bonding with water). More N-H hydrogens mean better solvation, which favours 1° > 2° > 3°. Groups bigger than -CH₃ also cause **steric hindrance** to hydrogen bonding.\n" +
        "- The balance of inductive effect, solvation and steric hindrance gives, in water: **(C₂H₅)₂NH > (C₂H₅)₃N > C₂H₅NH₂ > NH₃** and **(CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃**.\n" +
        "- pKb values in water: (CH₃)₂NH 3.27, CH₃NH₂ 3.38, (CH₃)₃N 4.22; (C₂H₅)₂NH 3.00, (C₂H₅)₃N 3.25, C₂H₅NH₂ 3.29.",
      formula: {
        label: "Base dissociation constant of an amine",
        latex: "\\text{R-NH}_2 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{R-NH}_3^+ + \\text{OH}^- \\qquad K_b = \\dfrac{[\\text{R-NH}_3^+][\\text{OH}^-]}{[\\text{R-NH}_2]} \\qquad \\text{p}K_b = -\\log K_b",
        symbols: [
          { symbol: "\\(K_b\\)", meaning: "base dissociation constant: larger means a stronger base" },
          { symbol: "\\(\\text{p}K_b\\)", meaning: "minus the log of Kb: smaller means a stronger base" },
        ],
      },
      authoredExample: {
        prompt: "Arrange C₂H₅NH₂, (C₂H₅)₂NH, (C₂H₅)₃N and NH₃ in increasing order of basic strength (a) in the gas phase and (b) in water.",
        steps: [
          "Gas phase: no solvent, so only the +I effect counts. More ethyl groups, stronger base.",
          "(a) \\(\\text{NH}_3 < \\text{C}_2\\text{H}_5\\text{NH}_2 < (\\text{C}_2\\text{H}_5)_2\\text{NH} < (\\text{C}_2\\text{H}_5)_3\\text{N}\\)",
          "Water: solvation and steric hindrance also count. The tertiary cation has only one N-H for hydrogen bonding and three bulky ethyl groups, so it falls behind the secondary amine; the primary amine has the weakest +I effect.",
          "(b) \\(\\text{NH}_3 < \\text{C}_2\\text{H}_5\\text{NH}_2 < (\\text{C}_2\\text{H}_5)_3\\text{N} < (\\text{C}_2\\text{H}_5)_2\\text{NH}\\)",
          "Check with pKb: 3.29, 3.25 and 3.00 for the primary, tertiary and secondary amines.",
        ],
        answer: "Gas phase: NH₃ < C₂H₅NH₂ < (C₂H₅)₂NH < (C₂H₅)₃N. Water: NH₃ < C₂H₅NH₂ < (C₂H₅)₃N < (C₂H₅)₂NH",
      },
      selfCheckExample: {
        prompt: "The pKb of methanamine is 3.38 and that of ammonia is 4.75. Which is the stronger base, and why?",
        steps: [
          "A smaller pKb means a stronger base, so methanamine is stronger.",
          "The methyl group pushes electrons to the nitrogen (+I effect), making the lone pair more available.",
          "It also spreads the positive charge of CH₃NH₃⁺, stabilising the cation.",
        ],
        answer: "Methanamine, because the +I effect of the methyl group makes its lone pair more available and stabilises its cation",
      },
      practiceSet: [
        { prompt: "Complete and name the product: CH₃CH₂NH₂ + HCl →", answer: "CH₃CH₂NH₃⁺Cl⁻, ethanaminium chloride (ethylammonium chloride)" },
        { prompt: "How can an amine be separated from a non-basic organic compound that does not dissolve in water?", answer: "Shake with acid: the amine salt dissolves in water; then add NaOH to get the amine back" },
        { prompt: "Which has the higher pKb in water, (C₂H₅)₃N or (C₂H₅)₂NH?", answer: "(C₂H₅)₃N (3.25 against 3.00); it is the weaker base" },
      ],
      pyqExampleId: "d2b1a32d-a5dd-4e1a-8c1c-21ade4872cbd",
      traps: [
        {
          title: "Using the gas-phase order in water",
          body: "3° > 2° > 1° is the gas-phase order. In water the secondary amine is strongest for both methyl and ethyl amines. Read the phrase \"in aqueous solution\" before you write.",
        },
        {
          title: "Methyl and ethyl orders are not the same",
          body: "In water (C₂H₅)₃N is stronger than C₂H₅NH₂, but (CH₃)₃N is weaker than CH₃NH₂. Changing the alkyl group from -CH₃ to -C₂H₅ changes the balance of +I effect, solvation and steric hindrance. Learn both orders as NCERT prints them.",
        },
        {
          title: "Reading pKb the wrong way",
          body: "A higher pKb means a weaker base. \"Decreasing order of pKb\" starts with the weakest base, so it is the reverse of decreasing basic strength.",
        },
        {
          title: "More alkyl groups, more steric hindrance",
          body: "Board 2023 gave the Reason \"diethylamine has more steric hindrance and +I effect than triethylamine\". Both are false: two ethyl groups give less of each than three. The Assertion was true, so (C).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcam-basic-aryl",
      name: "Arylamines and the effect of substituents",
      intuition:
        "In aniline the -NH₂ is joined straight to the ring, so the lone pair on nitrogen is shared with the ring by resonance. Aniline has five resonance structures but the anilinium ion has only two, so aniline is more stable than its cation and is reluctant to take a proton. Anything that pushes electrons towards the nitrogen makes the base stronger; anything that pulls them away makes it weaker.",
      definition:
        "- **Aromatic amines are weaker bases than ammonia** because the aryl group withdraws electrons: the lone pair is in conjugation with the ring and less available for protonation.\n" +
        "- Aniline is a resonance hybrid of **five** structures; the anilinium ion has only **two**. More resonance structures, more stability, so aniline is more stable than its cation and its basic strength is low (pKb 9.38).\n" +
        "- **Electron-releasing groups** on the ring, such as -OCH₃ and -CH₃, **increase** basic strength.\n" +
        "- **Electron-withdrawing groups**, such as -NO₂, -SO₃H, -COOH and -X, **decrease** it.\n" +
        "- A CH₂ between the ring and nitrogen, as in **benzylamine** (phenylmethanamine, pKb 4.70), breaks the conjugation: it behaves like an aliphatic amine.\n" +
        "- Alkyl groups on the nitrogen of aniline raise the basic strength a little: N-methylaniline (9.30), N,N-dimethylaniline (8.92).\n" +
        "- In **acetanilide** the lone pair on nitrogen is shared with the C=O oxygen by resonance, so it is a weaker base than aniline.",
      table: {
        columns: ["Amine", "pKb or position", "Why"],
        rows: [
          {
            cells: ["Aniline, C₆H₅NH₂", "9.38 (ammonia 4.75)", "Lone pair delocalised into the ring; aniline more stable than anilinium ion"],
            pyqExampleId: "a5c40b9d-39e7-4c7b-ab5d-a9b48ab09c5e",
            noteAmber: "Board 2024 asserted that aniline is a stronger base than ammonia, with the true resonance Reason: (D).",
          },
          {
            cells: ["Benzylamine, C₆H₅CH₂NH₂", "4.70", "CH₂ breaks the conjugation; behaves as an aliphatic amine"],
            pyqExampleId: "e6d31002-b3ea-41b3-93ac-2f1fbadcec48",
            noteAmber: "Board 2023 and 2026 asked for the strongest base among benzylamine, aniline, 4-methylaniline and 4-nitroaniline.",
          },
          {
            cells: ["N-Methylaniline, C₆H₅NHCH₃", "9.30", "+I effect of the methyl on nitrogen"],
            pyqExampleId: "db4eb61d-baaf-4c45-81af-ec1546046620",
            noteAmber: "Board 2026 asked the decreasing order of pKb for aniline, N-methylaniline and ethylamine.",
          },
          {
            cells: ["N,N-Dimethylaniline, C₆H₅N(CH₃)₂", "8.92", "Two methyls on nitrogen: the strongest of the anilines here"],
            pyqExampleId: "25be7b6d-09c4-4a8d-8e9f-7a114e05d6d8",
            noteAmber: "Board 2026 asked which of four anilines has the lowest pKb.",
          },
          { cells: ["p-Toluidine (4-methylaniline)", "Stronger than aniline", "-CH₃ releases electrons"] },
          {
            cells: ["p-Nitroaniline", "Much weaker than aniline", "-NO₂ withdraws electrons by resonance and inductive effect"],
            pyqExampleId: "b495c232-7235-45b8-a960-7b1b44d53128",
            noteAmber: "Board 2024 set this as assertion-reason twice, once calling -NO₂ electron donating (Reason false).",
          },
          {
            cells: ["Acetanilide, C₆H₅NHCOCH₃", "Weaker than aniline", "Lone pair on N shared with the C=O oxygen"],
            pyqExampleId: "a2825762-9bbf-4ee0-b23c-e83db5b0ff84",
            noteAmber: "Board 2024 and 2025: acetanilide is less basic than aniline, and the fall in electron density on N is the reason, (A).",
          },
        ],
        caption: "pKb values in water from NCERT's Table 9.3.",
      },
      selfCheckExample: {
        prompt: "Arrange aniline, p-toluidine and p-nitroaniline in increasing order of basic strength.",
        steps: [
          "All three have -NH₂ on the ring, so the ring substituent decides.",
          "-NO₂ withdraws electrons: p-nitroaniline is weakest.",
          "-CH₃ releases electrons: p-toluidine is strongest.",
        ],
        answer: "p-Nitroaniline < aniline < p-toluidine",
      },
      practiceSet: [
        { prompt: "Which is the stronger base, aniline or N,N-dimethylaniline?", answer: "N,N-Dimethylaniline (pKb 8.92 against 9.38)" },
        { prompt: "Name two groups that lower the basic strength of aniline when they are on the ring.", answer: "Any two of -NO₂, -SO₃H, -COOH and a halogen" },
        { prompt: "How many resonance structures do aniline and the anilinium ion have?", answer: "Aniline five, the anilinium ion two" },
      ],
      pyqExampleId: "4664f82e-f21d-40eb-82e8-3e15d316aa0b",
      traps: [
        {
          title: "Treating benzylamine as an arylamine",
          body: "In C₆H₅CH₂NH₂ the nitrogen is on a CH₂, not on the ring, so its lone pair is not delocalised. It is the strongest base in any list with aniline and substituted anilines.",
        },
        {
          title: "Calling -NO₂ electron donating",
          body: "The nitro group withdraws electrons. A Reason that calls it electron donating is false even when the Assertion (p-nitroaniline is weaker) is true: (C).",
        },
        {
          title: "Half an answer for aniline",
          body: "\"Aniline is resonance stabilised\" is not enough for full marks. Say that the lone pair on nitrogen is delocalised into the ring, so it is less available to take a proton, and compare with the other amine.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcam-acylation",
      name: "Alkylation, acylation and benzoylation",
      intuition:
        "A primary or secondary amine still has a hydrogen on its nitrogen. Its lone pair attacks an acid chloride or anhydride, and an acyl group takes the place of that hydrogen. The product is an amide. A tertiary amine has no hydrogen on nitrogen to replace, so it is not acylated.",
      definition:
        "- **Alkylation:** amines react with alkyl halides, as in ammonolysis. Aniline with excess CH₃I ends as the quaternary salt C₆H₅N⁺(CH₃)₃I⁻.\n" +
        "- **Acylation:** aliphatic and aromatic **primary and secondary** amines react with **acid chlorides, anhydrides and esters** by nucleophilic substitution. A hydrogen of -NH₂ or >N-H is replaced by the acyl group and the product is an **amide**.\n" +
        "- The reaction is carried out with a **base stronger than the amine, like pyridine**, which removes the HCl formed and shifts the equilibrium to the right.\n" +
        "- **Benzoylation:** the same reaction with **benzoyl chloride**, C₆H₅COCl. CH₃NH₂ gives CH₃NHCOC₆H₅, N-methylbenzamide.\n" +
        "- With **carboxylic acids**, amines form **salts** at room temperature.\n" +
        "- Amides are **less basic** than amines: the lone pair on nitrogen is shared with the C=O group.",
      formula: {
        label: "Acetylation of aniline",
        latex: "\\text{C}_6\\text{H}_5\\text{NH}_2 + \\text{CH}_3\\text{COCl} \\xrightarrow{\\text{pyridine}} \\text{C}_6\\text{H}_5\\text{NHCOCH}_3 + \\text{HCl}",
      },
      authoredExample: {
        prompt: "Write the equation for the reaction of ethanamine with benzoyl chloride. Name the product and say why a base is added.",
        steps: [
          "The lone pair of the amine attacks the C=O carbon; the benzoyl group replaces one hydrogen on nitrogen.",
          "\\(\\text{C}_2\\text{H}_5\\text{NH}_2 + \\text{C}_6\\text{H}_5\\text{COCl} \\xrightarrow{\\text{base}} \\text{C}_2\\text{H}_5\\text{NHCOC}_6\\text{H}_5 + \\text{HCl}\\)",
          "The base (pyridine or NaOH) removes the HCl and shifts the equilibrium to the right.",
        ],
        answer: "N-Ethylbenzamide, C₂H₅NHCOC₆H₅; the base removes HCl so the reaction goes to completion",
      },
      selfCheckExample: {
        prompt: "Diethylamine reacts with acetyl chloride. Write the product. Would triethylamine react in the same way?",
        steps: [
          "\\((\\text{C}_2\\text{H}_5)_2\\text{NH} + \\text{CH}_3\\text{COCl} \\longrightarrow (\\text{C}_2\\text{H}_5)_2\\text{NCOCH}_3 + \\text{HCl}\\)",
          "Triethylamine has no hydrogen on nitrogen to be replaced by an acyl group.",
        ],
        answer: "N,N-Diethylethanamide, (C₂H₅)₂NCOCH₃; triethylamine is not acylated",
      },
      practiceSet: [
        { prompt: "What is the role of pyridine in the acylation of amines?", answer: "It is a stronger base than the amine; it removes the HCl formed and shifts the equilibrium to the right" },
        { prompt: "Name the product of aniline with benzoyl chloride.", answer: "N-Phenylbenzamide (benzanilide), C₆H₅NHCOC₆H₅" },
        { prompt: "What do amines form with carboxylic acids at room temperature?", answer: "Salts" },
      ],
      pyqExampleId: "d994f310-69b3-4243-801c-415eafe3f7e4",
      traps: [
        {
          title: "Losing the group on nitrogen",
          body: "In acylation the acyl group replaces a hydrogen on nitrogen; the alkyl group stays. C₂H₅NH₂ gives C₂H₅NHCOCH₃, not acetamide CH₃CONH₂.",
        },
        {
          title: "Acylating a tertiary amine",
          body: "Only primary and secondary amines are acylated; a tertiary amine has no N-H.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcam-carbylamine",
      name: "Carbylamine reaction and nitrous acid",
      intuition:
        "Both are tests that depend on the hydrogens on nitrogen. A primary amine, with two of them, gives a foul-smelling isocyanide with chloroform and alkali; secondary and tertiary amines cannot. Nitrous acid turns a primary aliphatic amine into an unstable diazonium salt that breaks down to an alcohol and bubbles of nitrogen.",
      definition:
        "- **Carbylamine reaction (isocyanide test):** aliphatic and aromatic **primary** amines heated with **chloroform and ethanolic KOH** form **isocyanides (carbylamines)**, which are foul-smelling. Secondary and tertiary amines do not show it, so it is a **test for primary amines**.\n" +
        "- **Nitrous acid** is made in the reaction mixture from a mineral acid and sodium nitrite.\n" +
        "- **Primary aliphatic amines** form unstable aliphatic diazonium salts, which give off **nitrogen gas quantitatively** and form **alcohols**. The measured nitrogen is used to estimate amino acids and proteins.\n" +
        "- **Primary aromatic amines** at **273 to 278 K** form diazonium salts (see the diazonium page).\n" +
        "- Secondary and tertiary amines react with nitrous acid in a different way.",
      formula: {
        label: "Carbylamine reaction",
        latex: "\\text{R-NH}_2 + \\text{CHCl}_3 + 3\\text{KOH} \\xrightarrow{\\Delta} \\text{R-NC} + 3\\text{KCl} + 3\\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt: "Write the reaction of propan-1-amine with nitrous acid in the cold. What would you observe?",
        steps: [
          "Nitrous acid is made from NaNO₂ and HCl in the mixture.",
          "\\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{NH}_2 \\xrightarrow{\\text{NaNO}_2 + \\text{HCl}} [\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{N}_2^+\\text{Cl}^-] \\xrightarrow{\\text{H}_2\\text{O}} \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{OH} + \\text{N}_2 + \\text{HCl}\\)",
          "The aliphatic diazonium salt is unstable, so nitrogen comes off at once.",
        ],
        answer: "Propan-1-ol forms and nitrogen gas is seen bubbling off",
      },
      selfCheckExample: {
        prompt: "Ethanamine and N-methylmethanamine are both C₂H₇N. Give one test to tell them apart.",
        steps: [
          "Warm each with chloroform and ethanolic KOH.",
          "Ethanamine is primary, so it forms ethyl isocyanide, C₂H₅NC, which has a foul smell.",
          "N-Methylmethanamine is secondary and gives no isocyanide.",
        ],
        answer: "Carbylamine test: only ethanamine gives the foul smell of ethyl isocyanide",
      },
      practiceSet: [
        { prompt: "Which gas is given off when ethanamine reacts with nitrous acid?", answer: "Nitrogen, N₂" },
        { prompt: "Why is the reaction of nitrous acid with primary aliphatic amines used to estimate amino acids?", answer: "Nitrogen is given off quantitatively, so measuring it gives the amount of amine" },
        { prompt: "Does N,N-dimethylaniline give the carbylamine test?", answer: "No: it is a tertiary amine" },
      ],
      pyqExampleId: "a2fbea43-fb68-43b6-9b8b-67abfe913647",
      traps: [
        {
          title: "Isocyanide or cyanide",
          body: "The carbylamine product is R-NC, with the group joined to nitrogen. R-CN is a cyanide (nitrile), a different compound. Write the formula with N next to R.",
        },
        {
          title: "Carbylamine for secondary amines",
          body: "Only primary amines, aliphatic or aromatic, give it. A secondary amine has one N-H and gives no isocyanide.",
        },
        {
          title: "An aliphatic diazonium salt that survives",
          body: "Ethanamine with nitrous acid does not give a usable diazonium salt even in the cold. It gives ethanol and N₂. Only aromatic amines give diazonium salts that last at 273 to 278 K.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcam-hinsberg",
      name: "Hinsberg's test with benzenesulphonyl chloride",
      intuition:
        "Benzenesulphonyl chloride reacts with an N-H. A primary amine keeps one hydrogen on nitrogen after the reaction, and the strongly electron-withdrawing sulphonyl group makes that hydrogen acidic, so the product dissolves in alkali. A secondary amine keeps none, so its product does not. A tertiary amine has no N-H and does not react.",
      definition:
        "- **Hinsberg's reagent** is **benzenesulphonyl chloride, C₆H₅SO₂Cl**. It reacts with primary and secondary amines to form **sulphonamides**.\n" +
        "- **Primary amine:** gives an N-alkylbenzenesulphonamide. The hydrogen on its nitrogen is **strongly acidic** because of the electron-withdrawing sulphonyl group, so the product is **soluble in alkali**.\n" +
        "- **Secondary amine:** gives an N,N-dialkylbenzenesulphonamide with **no hydrogen on nitrogen**; it is not acidic and is **insoluble in alkali**.\n" +
        "- **Tertiary amine:** **does not react**.\n" +
        "- The test is used to **distinguish** primary, secondary and tertiary amines and to **separate** a mixture of them. These days p-toluenesulphonyl chloride is used in place of benzenesulphonyl chloride.",
      table: {
        columns: ["Amine (example)", "Product with C₆H₅SO₂Cl", "Product in alkali (KOH or NaOH)"],
        rows: [
          {
            cells: ["Primary (C₂H₅NH₂)", "C₆H₅SO₂NHC₂H₅, N-ethylbenzenesulphonamide", "Dissolves: the N-H is acidic"],
            pyqExampleId: "185a52da-09c3-4906-b5ad-1c8d47971e97",
            noteAmber: "Board 2024 and 2025 asked which amine gives an alkali-soluble product.",
          },
          {
            cells: ["Secondary ((C₂H₅)₂NH)", "C₆H₅SO₂N(C₂H₅)₂, N,N-diethylbenzenesulphonamide", "Insoluble: no hydrogen on nitrogen"],
            pyqExampleId: "e2477bc4-0faa-48cd-92f3-7819f3010e50",
            noteAmber: "Board 2024 and 2025 asked which amine gives an alkali-insoluble product.",
          },
          {
            cells: ["Tertiary ((C₂H₅)₃N)", "No reaction", "The amine is left unchanged"],
            pyqExampleId: "0b5e14d1-e146-46a0-b80e-995f0e755210",
            noteAmber: "Board 2024 asked which amine does not react with benzenesulphonyl chloride.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Three unlabelled bottles hold ethanamine, N-ethylethanamine and N,N-diethylethanamine. How does Hinsberg's reagent tell them apart?",
        steps: [
          "Shake a sample of each with benzenesulphonyl chloride, then add aqueous KOH.",
          "Ethanamine (primary): \\(\\text{C}_2\\text{H}_5\\text{NH}_2 + \\text{C}_6\\text{H}_5\\text{SO}_2\\text{Cl} \\longrightarrow \\text{C}_6\\text{H}_5\\text{SO}_2\\text{NHC}_2\\text{H}_5 + \\text{HCl}\\); the product dissolves in the alkali.",
          "N-Ethylethanamine (secondary): \\((\\text{C}_2\\text{H}_5)_2\\text{NH} + \\text{C}_6\\text{H}_5\\text{SO}_2\\text{Cl} \\longrightarrow \\text{C}_6\\text{H}_5\\text{SO}_2\\text{N(C}_2\\text{H}_5)_2 + \\text{HCl}\\); the product stays undissolved.",
          "N,N-Diethylethanamine (tertiary): no reaction.",
        ],
        answer: "Product soluble in alkali: ethanamine; product insoluble in alkali: N-ethylethanamine; no reaction: N,N-diethylethanamine",
      },
      practiceSet: [
        { prompt: "Write the formula of Hinsberg's reagent.", answer: "C₆H₅SO₂Cl (benzenesulphonyl chloride)" },
        { prompt: "Which reagent is used in place of benzenesulphonyl chloride today?", answer: "p-Toluenesulphonyl chloride" },
        { prompt: "Why is N-ethylbenzenesulphonamide soluble in alkali?", answer: "The hydrogen on its nitrogen is strongly acidic because of the electron-withdrawing sulphonyl group" },
      ],
      pyqExampleId: "e73467fa-87c2-4253-bc58-1b15325358b4",
      traps: [
        {
          title: "Insoluble product or no reaction",
          body: "A secondary amine does react and gives a product that will not dissolve in alkali. A tertiary amine gives no product at all. Do not mix up the two.",
        },
        {
          title: "Carbylamine test or Hinsberg's test",
          body: "The carbylamine test picks out primary amines only. Hinsberg's test tells all three classes apart. Choose the test that fits the pair in the question.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcam-ring-substitution",
      name: "Electrophilic substitution in aniline",
      intuition:
        "The lone pair of -NH₂ flows into the ring and makes the ortho and para positions rich in electrons, so -NH₂ is a powerful activating, ortho and para directing group. It is so powerful that bromine water puts on three bromines at once. To get one substituent, tame the group first by acetylation, then take the acetyl group off again.",
      definition:
        "- **-NH₂ is ortho and para directing and a powerful activating group:** in the five resonance structures of aniline, the ortho and para positions carry high electron density.\n" +
        "- **Bromination:** aniline with **bromine water** at room temperature gives a **white precipitate of 2,4,6-tribromoaniline**.\n" +
        "- **Controlling the activity:** protect -NH₂ by **acetylation with acetic anhydride**, carry out the substitution, then **hydrolyse** the amide back to the amine. In acetanilide the lone pair on nitrogen is shared with the oxygen by resonance, so **-NHCOCH₃ is less activating than -NH₂**.\n" +
        "- **Nitration:** direct nitration gives **tarry oxidation products** as well as nitro compounds. In the strongly acidic medium aniline is **protonated to the anilinium ion, which is meta directing**, so a **significant amount of meta product** forms besides ortho and para (about 51% para, 47% meta and 2% ortho). After acetylation, the p-nitro compound is the major product.\n" +
        "- **Sulphonation:** aniline with conc. H₂SO₄ forms **anilinium hydrogensulphate**; heating it at **453 to 473 K** gives **sulphanilic acid** (p-aminobenzenesulphonic acid). Sulphanilic acid exists as a zwitter ion, ⁺H₃N-C₆H₄-SO₃⁻ (the -SO₃H gives its proton to the -NH₂); Board 2023 asked for this structure.\n" +
        "- **No Friedel-Crafts reaction:** aniline forms a **salt with AlCl₃**, the Lewis acid catalyst. The nitrogen gets a positive charge and becomes a **strongly deactivating** group.",
      formula: {
        label: "Bromination of aniline with bromine water",
        latex: "\\text{C}_6\\text{H}_5\\text{NH}_2 + 3\\text{Br}_2 \\xrightarrow{\\text{H}_2\\text{O}} \\text{2,4,6-Br}_3\\text{C}_6\\text{H}_2\\text{NH}_2 \\downarrow + 3\\text{HBr}",
      },
      authoredExample: {
        prompt: "Convert aniline into p-bromoaniline.",
        steps: [
          "Bromine water alone gives 2,4,6-tribromoaniline, so protect -NH₂ first.",
          "\\(\\text{C}_6\\text{H}_5\\text{NH}_2 \\xrightarrow[\\text{pyridine}]{(\\text{CH}_3\\text{CO})_2\\text{O}} \\text{C}_6\\text{H}_5\\text{NHCOCH}_3\\) (acetanilide)",
          "Brominate: the milder -NHCOCH₃ allows one bromine, mainly para. \\(\\text{C}_6\\text{H}_5\\text{NHCOCH}_3 \\xrightarrow[\\text{CH}_3\\text{COOH}]{\\text{Br}_2} \\text{p-BrC}_6\\text{H}_4\\text{NHCOCH}_3\\)",
          "Hydrolyse: \\(\\text{p-BrC}_6\\text{H}_4\\text{NHCOCH}_3 \\xrightarrow{\\text{H}^+ \\text{ or } \\text{OH}^-} \\text{p-BrC}_6\\text{H}_4\\text{NH}_2\\)",
        ],
        answer: "Acetylate, brominate, then hydrolyse: p-bromoaniline",
      },
      selfCheckExample: {
        prompt: "Why does aniline not undergo the Friedel-Crafts reaction?",
        steps: [
          "The catalyst AlCl₃ is a Lewis acid; the lone pair on aniline's nitrogen makes it a Lewis base.",
          "They form a salt, so the nitrogen carries a positive charge.",
          "A positively charged group strongly deactivates the ring, so substitution does not take place.",
        ],
        answer: "Aniline forms a salt with AlCl₃; the positive nitrogen strongly deactivates the ring",
      },
      practiceSet: [
        { prompt: "What is formed when anilinium hydrogensulphate is heated at 453 to 473 K?", answer: "Sulphanilic acid (p-aminobenzenesulphonic acid)" },
        { prompt: "What is seen when aniline is shaken with bromine water?", answer: "A white precipitate of 2,4,6-tribromoaniline" },
        { prompt: "How is p-nitroaniline obtained from aniline as the major product?", answer: "Acetylate with acetic anhydride, nitrate the acetanilide, then hydrolyse" },
      ],
      pyqExampleId: "d1d29ea5-0aac-4cd6-afa5-216623cb6280",
      traps: [
        {
          title: "\"-NHCOCH₃ is more activating\"",
          body: "False. Acetylation makes the group less activating, which is why it stops at one substitution. Board 2023 and 2026 used the wrong version as the Reason: Assertion true, Reason false, (C).",
        },
        {
          title: "The Friedel-Crafts Reason",
          body: "\"Friedel-Crafts is an electrophilic substitution\" is true but does not explain why aniline fails (B). \"Friedel-Crafts is a nucleophilic substitution\" is false (C). Only salt formation with AlCl₃ explains it (A).",
        },
        {
          title: "Leaving out the anilinium ion",
          body: "For the meta product, write that the acid protonates aniline to C₆H₅NH₃⁺, and that this ion is meta directing. Saying only \"-NH₂ is o, p directing\" earns nothing.",
        },
      ],
    },
  ],
};

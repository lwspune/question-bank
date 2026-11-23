import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_AP_ALCOHOLS_NOTE: SubtopicNote = {
  subtopicName: "Alcohols and Phenols",
  title: "Alcohols and Phenols: Preparation, Properties and Reactions",
  oneLineDefinition:
    "How alcohols and phenol are made, why they boil high and dissolve in water, why phenol is acidic and an alcohol is not, and the reactions of each.",
  whyItMatters:
    "46 questions. Twenty-three were set in board papers from 2016 to 2026, fourteen of them from 2024 to 2026. The board asks most often for phenol: from cumene (2022, 2024, 2025), from benzene sulphonic acid (2017, 2018) and by the Dow process (2023), and its reactions with zinc dust (2019, 2025), the nitrating mixture, chloroform and alkali (Reimer-Tiemann) (2025), carbon dioxide (Kolbe, 2026), an oxidising agent (2024, 2026) and hydrogen (2024, 2026). It also asked for isopropyl alcohol from acetaldehyde (2020, 2024), two 'identify A, B and C' chains (2024), why ethanol boils above ethane (2018) and the C₄H₁₀O alcohol that resists oxidation (2025). The textbook adds acidity orders, laboratory tests and solved problems on boiling points and solubility.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccap-preparation",
      name: "Preparing alcohols and phenol",
      intuition:
        "Every method puts an \\(-\\text{OH}\\) where something else used to be: water added across a double bond, hydrogen added to a carbonyl group, or a group on a benzene ring swapped for oxygen. Learn each method as three things: the starting compound, the reagent with its conditions, and the product. The board gives marks for all three.",
      definition:
        "- **Hydration of an alkene** (Markownikoff): the alkene and sulphuric acid give an alkyl hydrogen sulphate, which water hydrolyses to the alcohol. Propene gives propan-2-ol.\n" +
        "- **Hydroboration oxidation** (anti-Markownikoff): diborane adds to the alkene to give a trialkylborane, \\(\\text{R}_3\\text{B}\\), which hydrogen peroxide in alkaline medium oxidises to the alcohol. Propene gives propan-1-ol.\n" +
        "- **Reduction:** aldehydes give 1° alcohols and ketones give 2° alcohols with \\(\\text{H}_2/\\text{Ni}\\) or \\(\\text{LiAlH}_4\\). \\(\\text{LiAlH}_4\\) leaves an isolated C=C untouched, so it turns an unsaturated aldehyde into an unsaturated alcohol. Carboxylic acids need \\(\\text{LiAlH}_4\\).\n" +
        "- **Grignard reagent:** \\(\\text{R}'\\text{MgX}\\) adds to a carbonyl compound in dry ether, and dilute acid hydrolyses the adduct. Formaldehyde gives a 1° alcohol, any other aldehyde a 2° alcohol, a ketone a 3° alcohol: \\(\\text{R}-\\text{CHO} + \\text{R}'\\text{MgX} \\xrightarrow{\\text{dry ether}} \\text{R}-\\text{CH}(\\text{OMgX})-\\text{R}' \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{R}-\\text{CH}(\\text{OH})-\\text{R}'\\).\n" +
        "- **Phenol, Dow process:** \\(\\text{C}_6\\text{H}_5\\text{Cl} + \\text{NaOH} \\xrightarrow{623\\ \\text{K},\\ 300\\ \\text{atm}} \\text{C}_6\\text{H}_5\\text{ONa} \\xrightarrow{\\text{dil. HCl}} \\text{C}_6\\text{H}_5\\text{OH}\\).\n" +
        "- **Phenol from cumene** (the commercial method): \\(\\text{C}_6\\text{H}_5\\text{CH}(\\text{CH}_3)_2 + \\text{O}_2 \\xrightarrow{\\text{Co-naphthenate},\\ 423\\ \\text{K}} \\text{C}_6\\text{H}_5\\text{C}(\\text{CH}_3)_2\\text{OOH} \\xrightarrow{\\text{dil. acid}} \\text{C}_6\\text{H}_5\\text{OH} + \\text{CH}_3\\text{COCH}_3\\). Acetone is a valuable by-product.\n" +
        "- **Phenol from benzene sulphonic acid:** neutralise with NaOH, fuse the sodium salt with solid NaOH at 573 K to get sodium phenoxide, then add dilute acid.\n" +
        "- **Phenol from aniline:** nitrous acid (\\(\\text{NaNO}_2 + \\text{HCl}\\)) at low temperature gives benzene diazonium chloride, which on hydrolysis gives phenol.",
      table: {
        columns: ["Method", "Reagent and conditions", "Product"],
        rows: [
          { cells: ["Hydrolysis of an alkyl halide", "Aqueous alkali or moist silver oxide", "Alcohol"] },
          { cells: ["Hydration of an alkene", "Sulphuric acid, then water (Markownikoff)", "Propene gives propan-2-ol"] },
          { cells: ["Hydroboration oxidation", "B₂H₆, then H₂O₂ with NaOH (anti-Markownikoff)", "Propene gives propan-1-ol"] },
          { cells: ["Reduction of aldehydes and ketones", "H₂/Ni or LiAlH₄", "Aldehyde gives 1°, ketone gives 2° alcohol"] },
          {
            cells: ["Grignard reagent and a carbonyl compound", "R'MgX in dry ether, then dilute acid", "HCHO gives 1°, other aldehydes 2°, ketones 3° alcohol"],
            pyqExampleId: "abdb7f3e-aeb6-4cb8-99dc-32614358eab7",
            noteAmber: "Board 2020 and 2024 asked for the alcohol from acetaldehyde and CH₃MgBr.",
          },
          {
            cells: ["Dow process", "Chlorobenzene fused with NaOH at 623 K and 300 atm, then dilute HCl", "Phenol"],
            pyqExampleId: "486f2b4b-b380-4969-afb3-4156b4512b6f",
            noteAmber: "Board 2023 asked for the Dow process.",
          },
          {
            cells: ["Cumene process", "Air with Co-naphthenate at 423 K, then dilute acid", "Phenol and acetone"],
            pyqExampleId: "ee29952a-2eb5-428d-9fdf-b09135551219",
            noteAmber: "Board 2022, 2024 and 2025 asked for phenol from cumene.",
          },
          {
            cells: ["From benzene sulphonic acid", "NaOH, then fusion with solid NaOH at 573 K, then dilute acid", "Phenol"],
            pyqExampleId: "f8de02ea-d68d-411d-81c7-1f85402bea32",
            noteAmber: "Board 2017 and 2018 asked for carbolic acid from benzene sulphonic acid.",
          },
          { cells: ["From aniline", "NaNO₂ and HCl at low temperature, then hydrolysis", "Phenol"] },
        ],
      },
      selfCheckExample: {
        prompt: "Propanone is treated with methyl magnesium bromide in dry ether and the product is hydrolysed with dilute acid. Name the alcohol formed and classify it.",
        steps: [
          "\\(\\text{CH}_3\\text{COCH}_3 + \\text{CH}_3\\text{MgBr} \\xrightarrow{\\text{dry ether}} (\\text{CH}_3)_3\\text{C}-\\text{OMgBr}\\).",
          "\\((\\text{CH}_3)_3\\text{C}-\\text{OMgBr} \\xrightarrow{\\text{H}_3\\text{O}^+} (\\text{CH}_3)_3\\text{C}-\\text{OH}\\).",
          "A ketone always gives a tertiary alcohol with a Grignard reagent.",
        ],
        answer: "2-Methylpropan-2-ol, a tertiary alcohol",
      },
      practiceSet: [
        { prompt: "Name the alcohol formed when but-1-ene undergoes hydroboration oxidation.", answer: "Butan-1-ol (anti-Markownikoff)" },
        { prompt: "Which reagent reduces \\(\\text{CH}_2{=}\\text{CH}-\\text{CHO}\\) to \\(\\text{CH}_2{=}\\text{CH}-\\text{CH}_2\\text{OH}\\) without touching the double bond?", answer: "\\(\\text{LiAlH}_4\\)" },
        { prompt: "Which carbonyl compound gives a primary alcohol with a Grignard reagent?", answer: "Formaldehyde, HCHO" },
        { prompt: "State the temperature and pressure used in the Dow process.", answer: "623 K and 300 atm" },
      ],
      pyqExampleId: "ee29952a-2eb5-428d-9fdf-b09135551219",
      traps: [
        {
          title: "Swapping Markownikoff and anti-Markownikoff",
          body: "Acid catalysed hydration puts \\(-\\text{OH}\\) on the more substituted carbon (propan-2-ol from propene). Hydroboration oxidation puts it on the end carbon (propan-1-ol).",
        },
        {
          title: "Leaving out the conditions",
          body: "A preparation answer without conditions loses marks. Write 623 K and 300 atm for the Dow process, Co-naphthenate and 423 K for cumene, and 573 K for the fusion of sodium benzene sulphonate.",
        },
        {
          title: "Forgetting the by-product of the cumene process",
          body: "The hydroperoxide splits into phenol AND acetone. Write both products in the second equation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccap-physical",
      name: "Boiling points and solubility: hydrogen bonding",
      intuition:
        "The \\(-\\text{OH}\\) group lets the hydrogen of one molecule cling to the oxygen of the next. Those hydrogen bonds hold alcohol and phenol molecules together, so a lot of heat is needed to boil them, and the same bonds to water molecules make the small ones dissolve. A branched molecule is more compact, touches its neighbours less, and boils lower.",
      definition:
        "- Alcohols and phenols are very polar because of the \\(-\\text{OH}\\) group, and their molecules are held together by **intermolecular hydrogen bonding**. So they boil far higher than hydrocarbons and ethers of comparable molecular mass.\n" +
        "- **Boiling points** rise with molecular mass. Among isomers, **branching lowers** the boiling point because the van der Waals forces become weaker: propan-1-ol 97 °C, propan-2-ol 83 °C.\n" +
        "- **Solubility:** phenols and the lower alcohols (up to three carbons) dissolve appreciably in water because they form hydrogen bonds with water molecules.\n" +
        "- **o-Nitrophenol vs p-nitrophenol:** in the ortho compound the \\(-\\text{OH}\\) forms an **intramolecular** hydrogen bond with the nitro group next to it, so it bonds less with water and is less soluble. The para compound forms **intermolecular** hydrogen bonds with water.\n" +
        "- **Physical state:** lower alcohols are colourless, toxic liquids with an alcoholic smell; pure phenol is a colourless, toxic, low-melting solid with a carbolic smell.\n" +
        "- Of the four alcohols of formula C₄H₁₀O, only butan-2-ol has a carbon joined to four different groups, so only it is optically active.",
      authoredExample: {
        prompt: "Propan-1-ol boils at 97 °C and propan-2-ol at 83 °C. Explain the difference.",
        steps: [
          "Both are alcohols of the same molecular mass, so both are held together by intermolecular hydrogen bonds.",
          "Propan-1-ol is a straight chain; propan-2-ol is branched, with the \\(-\\text{OH}\\) on the middle carbon.",
          "Branching makes the molecule more compact, so the van der Waals forces between molecules are weaker.",
          "Less energy is needed to separate the molecules of propan-2-ol, so it boils lower.",
        ],
        answer: "Propan-2-ol is branched, so its intermolecular forces are weaker and it boils lower than propan-1-ol",
      },
      selfCheckExample: {
        prompt: "n-Hexyl alcohol and methyl n-pentyl ether both have a molecular mass of 102, but boil at 430 K and 373 K. Explain.",
        steps: [
          "The alcohol has an \\(-\\text{OH}\\) group, so its molecules are joined by intermolecular hydrogen bonds.",
          "The ether has no hydrogen on its oxygen, so its molecules cannot hydrogen bond to one another.",
        ],
        answer: "Hydrogen bonding between alcohol molecules raises the boiling point of n-hexyl alcohol",
      },
      practiceSet: [
        { prompt: "Which is more soluble in water, o-nitrophenol or p-nitrophenol?", answer: "p-Nitrophenol" },
        { prompt: "What kind of hydrogen bond is present in o-nitrophenol?", answer: "Intramolecular hydrogen bonding" },
        { prompt: "Up to how many carbon atoms do alcohols show appreciable solubility in water?", answer: "Three" },
        { prompt: "Arrange n-butyl alcohol and tert-butyl alcohol in increasing order of boiling point.", answer: "tert-Butyl alcohol (83 °C) < n-butyl alcohol (118 °C)" },
      ],
      pyqExampleId: "432ddef5-a10a-45b3-8eae-3cc714f3ec84",
      traps: [
        {
          title: "Explaining a boiling point by molecular mass alone",
          body: "When an alcohol boils far above a compound of similar mass, the reason the board wants is intermolecular hydrogen bonding. Name it and say which atoms take part.",
        },
        {
          title: "Calling the hydrogen bond in o-nitrophenol intermolecular",
          body: "In o-nitrophenol the bond is inside one molecule (intramolecular). That is exactly why it dissolves less in water than p-nitrophenol.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccap-acidity-tests",
      name: "Acidity and laboratory tests",
      intuition:
        "An acid is only as strong as its anion is stable. When an alcohol loses a proton, the alkyl group pushes electrons onto the negative oxygen and makes things worse, so an alcohol hardly ionises. When phenol loses a proton, the negative charge spreads round the ring, so phenol ionises a little and is weakly acidic. The laboratory tests are this difference made visible.",
      definition:
        "- **Alcohols:** \\(\\text{R}-\\text{OH} \\rightleftharpoons \\text{R}-\\text{O}^- + \\text{H}^+\\) lies far to the left. The **+I effect** of the alkyl group destabilises the alkoxide ion, so alcohols behave as neutral compounds in water. More alkyl groups, weaker acid: ethanol is stronger than 2-methylpropan-2-ol.\n" +
        "- **Phenol:** the phenoxide ion is **resonance stabilised** (five resonance structures), so phenol ionises to a moderate extent and is weakly acidic.\n" +
        "- **p-Nitrophenol** is a stronger acid than phenol: its anion has six resonance structures, one with the negative charge only on electronegative oxygens. An electron-donating group such as \\(-\\text{CH}_3\\) makes a phenol weaker.\n" +
        "- Order: p-nitrophenol > phenol > ethanol > 2-methylpropan-2-ol.\n" +
        "- With sodium: \\(2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{Na} \\longrightarrow 2\\text{C}_2\\text{H}_5\\text{ONa} + \\text{H}_2\\). The hydrogen gas detects an alcoholic \\(-\\text{OH}\\) group.\n" +
        "- **Lucas reagent** (conc. HCl with anhydrous \\(\\text{ZnCl}_2\\)): the alcohol dissolves but the alkyl chloride formed does not, so the solution turns turbid.",
      table: {
        columns: ["Test", "Alcohol", "Phenol"],
        rows: [
          { cells: ["Litmus (aqueous solution)", "Neutral: no change", "Turns blue litmus red"] },
          { cells: ["Aqueous NaHCO₃", "No reaction", "No reaction (too weak an acid)"] },
          { cells: ["Aqueous NaOH", "No reaction", "Dissolves as sodium phenoxide; HCl gives phenol back"] },
          {
            cells: ["Sodium metal", "Hydrogen gas evolved; sodium alkoxide formed", "Hydrogen gas evolved; sodium phenoxide formed"],
            pyqExampleId: "14699502-ce7a-4ff7-ab70-4c78a97f037d",
            noteAmber: "Board 2019 asked for the equation of sodium with ethanol.",
          },
          { cells: ["Neutral FeCl₃ solution", "No colour", "Deep violet (purple or green) colour of ferric phenoxide"] },
          { cells: ["Lucas reagent", "Turbid at once (3°), slowly (2°), only on heating (1°)", "Used for alcohols only"] },
        ],
      },
      practiceSet: [
        { prompt: "Why does phenol not react with aqueous \\(\\text{NaHCO}_3\\)?", answer: "Phenol is too weak an acid to react with a weak base; it needs NaOH" },
        { prompt: "Which of propan-1-ol, propan-2-ol and 2-methylpropan-2-ol turns Lucas reagent turbid at once?", answer: "2-Methylpropan-2-ol, the tertiary alcohol" },
        { prompt: "Arrange phenol, ethanol and 2-methylpropan-2-ol in increasing order of acid strength.", answer: "2-Methylpropan-2-ol < ethanol < phenol" },
        { prompt: "Name a reagent that gives a coloured product with phenol but not with ethanol.", answer: "Neutral ferric chloride solution (violet colour)" },
      ],
      pyqExampleId: "14699502-ce7a-4ff7-ab70-4c78a97f037d",
      traps: [
        {
          title: "Explaining acidity with the acid instead of its anion",
          body: "Compare the conjugate bases. Say that the phenoxide ion is resonance stabilised and the alkoxide ion is destabilised by the +I effect of the alkyl group.",
        },
        {
          title: "Thinking NaOH makes sodium ethoxide",
          body: "Alcohols do not react with aqueous NaOH. Sodium ethoxide is made with sodium metal, which also gives off hydrogen.",
        },
        {
          title: "Putting the Lucas order backwards",
          body: "Tertiary alcohols turn Lucas reagent turbid instantly, secondary slowly, primary only on heating.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccap-alcohol-reactions",
      name: "Reactions of alcohols: esters, halides, dehydration and oxidation",
      intuition:
        "An alcohol reacts in two ways. It can lose the hydrogen of O-H (to sodium, or to an acid in esterification), or it can lose the whole \\(-\\text{OH}\\) (to a halogen acid, or as water when it is dehydrated). Oxidation needs a hydrogen on the carbon that carries \\(-\\text{OH}\\): a primary alcohol has two, a secondary one, a tertiary none.",
      definition:
        "- **Esterification:** \\(\\text{R}'\\text{COOH} + \\text{R}\\text{OH} \\rightleftharpoons \\text{R}'\\text{COOR} + \\text{H}_2\\text{O}\\) with concentrated \\(\\text{H}_2\\text{SO}_4\\). It is reversible; removing water as it forms pushes it forward. Acid anhydrides react with an acid catalyst; acid chlorides react in pyridine, which takes up the HCl.\n" +
        "- **Acetyl derivatives:** acetylation adds one \\(\\text{CH}_3\\text{CO}-\\) group per \\(-\\text{OH}\\), so it counts the \\(-\\text{OH}\\) groups. Aspirin is the acetyl derivative of salicylic acid.\n" +
        "- **Hydrogen halides:** 3° > 2° > 1° alcohols, and HI > HBr > HCl. HCl needs anhydrous \\(\\text{ZnCl}_2\\). \\(\\text{PCl}_5\\) and \\(\\text{PX}_3\\) also give alkyl halides.\n" +
        "- **Dehydration** with conc. \\(\\text{H}_2\\text{SO}_4\\), \\(\\text{H}_3\\text{PO}_4\\) or alumina gives an alkene: \\(\\text{C}_2\\text{H}_5\\text{OH} \\xrightarrow{\\text{conc. H}_2\\text{SO}_4,\\ 443\\ \\text{K}} \\text{CH}_2{=}\\text{CH}_2 + \\text{H}_2\\text{O}\\). The more substituted alkene is the major product (**Saytzeff rule**). Mechanism: protonation of the alcohol, slow loss of water to a carbocation, fast loss of \\(\\text{H}^+\\). Since the slow step makes a carbocation, 3° alcohols lose water most easily.\n" +
        "- **Oxidation:** a 1° alcohol gives an aldehyde with \\(\\text{CrO}_3\\) or, better, PCC; with \\(\\text{KMnO}_4\\), \\(\\text{K}_2\\text{Cr}_2\\text{O}_7\\) or \\(\\text{HNO}_3\\) it goes on to the acid with the same number of carbons. A 2° alcohol gives a ketone. A 3° alcohol resists oxidation; strong agents at high temperature break C-C bonds and give acids with fewer carbons.\n" +
        "- **Hot copper at 573 K:** 1° gives an aldehyde, 2° a ketone (both lose \\(\\text{H}_2\\)), 3° an alkene (loses \\(\\text{H}_2\\text{O}\\)).\n" +
        "- Board 2016 asked the mechanism of esterification. The present book does not teach it, so give it less time; in outline the acid's C=O is protonated, the alcohol's oxygen attacks that carbon, a proton moves, water leaves and \\(\\text{H}^+\\) is lost.",
      formula: {
        label: "Oxidation of primary and secondary alcohols",
        latex: "\\text{R}-\\text{CH}_2\\text{OH} \\xrightarrow{[\\text{O}]} \\text{R}-\\text{CHO} \\xrightarrow{[\\text{O}]} \\text{R}-\\text{COOH}, \\qquad \\text{R}_2\\text{CH}-\\text{OH} \\xrightarrow{[\\text{O}]} \\text{R}_2\\text{C}{=}\\text{O}",
      },
      authoredExample: {
        prompt: "Write the reactions when the vapours of (a) propan-1-ol, (b) propan-2-ol and (c) 2-methylpropan-2-ol are passed over hot copper at 573 K. Name each product.",
        steps: [
          "(a) Primary alcohol, dehydrogenated: \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{OH} \\xrightarrow{\\text{Cu},\\ 573\\ \\text{K}} \\text{CH}_3\\text{CH}_2\\text{CHO} + \\text{H}_2\\). Product: propanal.",
          "(b) Secondary alcohol, dehydrogenated: \\(\\text{CH}_3\\text{CH}(\\text{OH})\\text{CH}_3 \\xrightarrow{\\text{Cu},\\ 573\\ \\text{K}} \\text{CH}_3\\text{COCH}_3 + \\text{H}_2\\). Product: propanone.",
          "(c) Tertiary alcohol, no hydrogen on the carbinol carbon, so it is dehydrated: \\((\\text{CH}_3)_3\\text{C}-\\text{OH} \\xrightarrow{\\text{Cu},\\ 573\\ \\text{K}} (\\text{CH}_3)_2\\text{C}{=}\\text{CH}_2 + \\text{H}_2\\text{O}\\). Product: 2-methylpropene.",
        ],
        answer: "Propanal, propanone and 2-methylpropene",
      },
      selfCheckExample: {
        prompt: "Write the equation for the esterification of methanol with ethanoic acid and say how the yield of ester can be increased.",
        steps: [
          "\\(\\text{CH}_3\\text{COOH} + \\text{CH}_3\\text{OH} \\overset{\\text{conc. H}_2\\text{SO}_4}{\\rightleftharpoons} \\text{CH}_3\\text{COOCH}_3 + \\text{H}_2\\text{O}\\).",
          "The reaction is reversible, so removing the water as it forms shifts it forward.",
        ],
        answer: "Methyl ethanoate is formed; remove water as soon as it forms",
      },
      practiceSet: [
        { prompt: "Arrange HCl, HBr and HI in decreasing order of reactivity towards alcohols.", answer: "HI > HBr > HCl" },
        { prompt: "Name the reagent that oxidises a primary alcohol to an aldehyde without going on to the acid.", answer: "PCC (pyridinium chlorochromate)" },
        { prompt: "Which rule decides the major alkene formed when an alcohol is dehydrated?", answer: "Saytzeff rule: the more substituted alkene" },
        { prompt: "Name the product when butan-2-ol is oxidised with chromic anhydride.", answer: "Butan-2-one (a ketone)" },
      ],
      pyqExampleId: "7bfe4b6d-c5d6-448f-abc7-b47ef2ced95e",
      traps: [
        {
          title: "A tertiary alcohol over hot copper",
          body: "A 3° alcohol has no hydrogen on its carbinol carbon, so hot copper dehydrates it to an alkene. It does not give a ketone.",
        },
        {
          title: "Stopping a primary alcohol at the aldehyde with dichromate",
          body: "With acidified \\(\\text{K}_2\\text{Cr}_2\\text{O}_7\\) or \\(\\text{KMnO}_4\\) the aldehyde is oxidised further to the carboxylic acid. Only PCC (or \\(\\text{CrO}_3\\)) stops at the aldehyde.",
        },
        {
          title: "Aqueous or alcoholic KOH",
          body: "An alkyl halide with aqueous KOH gives an alcohol; with alcoholic KOH it gives an alkene. In an 'identify A' chain, read the word aqueous before you answer.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccap-phenol-reactions",
      name: "Reactions of phenol",
      intuition:
        "The \\(-\\text{OH}\\) group pushes electrons into the benzene ring, most of all at the two ortho positions and the para position. So phenol takes up electrophiles far more easily than benzene, often without a catalyst, and usually at all three of those positions at once. The other reactions change the ring itself: oxidation, hydrogenation and removal of the oxygen.",
      definition:
        "- The \\(-\\text{OH}\\) group is **ring activating** and **ortho, para directing**, so phenol undergoes electrophilic substitution more readily than benzene.\n" +
        "- **Reimer-Tiemann reaction:** phenol with chloroform in aqueous NaOH, then acid, gives salicylaldehyde (o-hydroxybenzaldehyde). With carbon tetrachloride in place of chloroform, salicylic acid forms.\n" +
        "- **Kolbe reaction:** sodium phenoxide with \\(\\text{CO}_2\\) at 398 K and 6 atm, then acid, gives salicylic acid: \\(\\text{C}_6\\text{H}_5\\text{ONa} + \\text{CO}_2 \\xrightarrow{398\\ \\text{K},\\ 6\\ \\text{atm}} \\text{o-HOC}_6\\text{H}_4\\text{COONa} \\xrightarrow{\\text{H}^+} \\text{o-HOC}_6\\text{H}_4\\text{COOH}\\). Sodium phenoxide is used because it is more reactive than phenol and \\(\\text{CO}_2\\) is a weak electrophile.\n" +
        "- **Hydrogenation and reduction:** \\(\\text{C}_6\\text{H}_5\\text{OH} + 3\\text{H}_2 \\xrightarrow{\\text{Ni},\\ 433\\ \\text{K}} \\text{C}_6\\text{H}_{11}\\text{OH}\\) (cyclohexanol); heating with zinc dust gives benzene: \\(\\text{C}_6\\text{H}_5\\text{OH} + \\text{Zn} \\xrightarrow{\\Delta} \\text{C}_6\\text{H}_6 + \\text{ZnO}\\).\n" +
        "- **Acetylation:** salicylic acid with acetic anhydride gives aspirin (acetylsalicylic acid) and acetic acid.",
      table: {
        columns: ["Reaction", "Reagent and conditions", "Product"],
        rows: [
          { cells: ["Bromination in water", "Bromine water", "2,4,6-Tribromophenol, a white precipitate"] },
          { cells: ["Bromination in a less polar solvent", "Bromine in CS₂, CHCl₃ or CCl₄", "o- and p-bromophenol"] },
          { cells: ["Nitration with dilute acid", "Dilute HNO₃ at low temperature", "o- and p-nitrophenol"] },
          {
            cells: ["Nitration with concentrated acid", "Concentrated HNO₃ (nitrating mixture)", "2,4,6-Trinitrophenol (picric acid)"],
            pyqExampleId: "e360e646-0c4d-4eff-8f4a-7730f82c01ab",
            noteAmber: "Board 2025 asked the action of the nitrating mixture and of zinc dust on phenol.",
          },
          {
            cells: ["Sulphonation", "Concentrated H₂SO₄: room temperature, or 373 K", "o-Phenolsulphonic acid at room temperature; p-phenolsulphonic acid at 373 K"],
            pyqExampleId: "90136f81-117d-4234-9f23-ffb2f10112b2",
            noteAmber: "Board 2026 asked phenol into o-phenolsulphonic acid.",
          },
          {
            cells: ["Reimer-Tiemann", "CHCl₃ and aqueous NaOH, then acid", "Salicylaldehyde"],
            pyqExampleId: "d571cc6a-321c-4a31-b28c-9f2ad5383d6f",
            noteAmber: "Board 2025 asked for a note on the Reimer-Tiemann reaction.",
          },
          { cells: ["Kolbe", "Sodium phenoxide and CO₂ at 398 K and 6 atm, then acid", "Salicylic acid"] },
          {
            cells: ["Oxidation", "Na₂Cr₂O₇ with H₂SO₄, or chromic anhydride", "p-Benzoquinone"],
            pyqExampleId: "a91edf63-146a-4748-bb10-f0e1859291ef",
            noteAmber: "Board 2024 and 2026 asked phenol into p-benzoquinone.",
          },
          {
            cells: ["Catalytic hydrogenation", "H₂ over nickel at 433 K", "Cyclohexanol"],
            pyqExampleId: "e5011e71-71c3-42a9-b85e-6c45a6b2da1c",
            noteAmber: "Board 2026 asked to complete phenol with 3H₂ over nickel.",
          },
          {
            cells: ["Reduction", "Heat with zinc dust", "Benzene"],
            pyqExampleId: "78037258-d5f4-479c-bd4f-dacb79face02",
            noteAmber: "Board 2019 and 2025 asked the action of zinc dust on phenol.",
          },
        ],
      },
      practiceSet: [
        { prompt: "Name the product when phenol reacts with chloroform in aqueous NaOH and the product is acidified.", answer: "Salicylaldehyde (o-hydroxybenzaldehyde)" },
        { prompt: "In the Reimer-Tiemann reaction, what forms if carbon tetrachloride is used in place of chloroform?", answer: "Salicylic acid" },
        { prompt: "Why is sodium phenoxide, not phenol, used in the Kolbe reaction?", answer: "Sodium phenoxide is more reactive towards electrophilic substitution, so it can react with the weak electrophile \\(\\text{CO}_2\\)" },
        { prompt: "What does phenol give with bromine in carbon disulphide?", answer: "A mixture of o-bromophenol and p-bromophenol" },
      ],
      pyqExampleId: "e360e646-0c4d-4eff-8f4a-7730f82c01ab",
      traps: [
        {
          title: "Dilute or concentrated nitric acid",
          body: "Dilute \\(\\text{HNO}_3\\) at low temperature gives o- and p-nitrophenol. Concentrated acid gives 2,4,6-trinitrophenol (picric acid).",
        },
        {
          title: "Bromine water or bromine in CS₂",
          body: "In water all three positions are brominated and 2,4,6-tribromophenol precipitates. In a less polar solvent such as \\(\\text{CS}_2\\) only one bromine goes in, at the ortho or para position.",
        },
        {
          title: "Zinc dust and hydrogen confused",
          body: "Zinc dust removes the oxygen and gives benzene. Hydrogen over nickel keeps the \\(-\\text{OH}\\) and saturates the ring, giving cyclohexanol.",
        },
      ],
    },
  ],
};

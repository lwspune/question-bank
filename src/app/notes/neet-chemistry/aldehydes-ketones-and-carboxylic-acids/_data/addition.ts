import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_AK_ADDITION_NOTE: SubtopicNote = {
  subtopicName: "Nucleophilic Addition and Reduction",
  title: "Nucleophilic Addition and Reduction",
  oneLineDefinition:
    "Why nucleophiles attack the carbon of the C=O group, what HCN, sodium hydrogensulphite, alcohols and ammonia derivatives add to give, how Grignard reagents build alcohols and ketones, and the reagents that reduce C=O to an alcohol or all the way to CH₂.",
  whyItMatters:
    "Five NEET questions from 2021 to 2025. One matches cyanohydrin, acetal, Schiff's base and oxime to their reagents (2022), one follows a cyanohydrin on to an unsaturated acid with hot concentrated H₂SO₄ (2023), and one adds excess CH₃MgBr to a compound with both a ketone and a nitrile group (2025). Two are reductions: NaBH₄ reducing a ketone but not an ester (2021), and Clemmensen reduction of two C=O groups to CH₂ (2023).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchak-nucleophilic-addition",
      name: "Nucleophilic addition to the carbonyl group",
      visualizationSlug: "cet-carbonyl-addition",
      intuition:
        "Oxygen pulls the electrons of the C=O bond towards itself, leaving the carbon slightly positive. A nucleophile attacks that carbon, the π bond moves onto oxygen, and the flat carbon becomes tetrahedral. The oxygen then picks up a proton. With ammonia derivatives the addition product goes on to lose water, so a C=N bond replaces the C=O.",
      definition:
        "- The nucleophile attacks the carbonyl carbon at right angles to the plane of the group. The carbon changes from \\(sp^2\\) to \\(sp^3\\), giving a tetrahedral alkoxide intermediate, which takes up a proton.\n" +
        "- **Aldehydes react faster than ketones**, for two reasons: the two groups on a ketone's carbonyl carbon crowd the nucleophile (steric), and two alkyl groups push electrons in and make that carbon less positive (electronic).\n" +
        "- Benzaldehyde is less reactive than propanal, because resonance with the ring makes its carbonyl carbon less positive.\n" +
        "- **HCN** adds to give a cyanohydrin. A little base speeds it up by making the stronger nucleophile \\(\\text{CN}^-\\).\n" +
        "- **Sodium hydrogensulphite** adds to give a crystalline compound; dilute acid or alkali gives the carbonyl compound back, so this is used to separate and purify aldehydes.\n" +
        "- **Alcohols** with dry HCl: an aldehyde gives a hemiacetal and then an acetal. A ketone with ethylene glycol gives a cyclic ketal.\n" +
        "- **Ammonia derivatives** \\(\\text{Z-NH}_2\\) in weakly acidic solution add and then lose water, giving \\(\\text{C=N-Z}\\).",
      table: {
        columns: ["Reagent", "Product", "Type of product"],
        rows: [
          { cells: ["HCN (base catalysed)", "\\(\\text{R}_2\\text{C(OH)CN}\\)", "Cyanohydrin"] },
          { cells: ["\\(\\text{NaHSO}_3\\)", "Crystalline addition compound", "Bisulphite adduct"] },
          { cells: ["Alcohol, dry HCl (aldehyde)", "\\(\\text{RCH(OR}')_2\\)", "Acetal, through a hemiacetal"] },
          { cells: ["Ethylene glycol, dry HCl (ketone)", "Cyclic compound", "Ethylene glycol ketal"] },
          { cells: ["Hydroxylamine \\(\\text{NH}_2\\text{OH}\\)", "\\(\\text{C=N-OH}\\)", "Oxime"] },
          { cells: ["Hydrazine \\(\\text{NH}_2\\text{NH}_2\\)", "\\(\\text{C=N-NH}_2\\)", "Hydrazone"] },
          { cells: ["Phenylhydrazine", "\\(\\text{C=N-NHC}_6\\text{H}_5\\)", "Phenylhydrazone"] },
          { cells: ["2,4-Dinitrophenylhydrazine", "Yellow, orange or red solid", "2,4-DNP derivative"] },
          { cells: ["Semicarbazide \\(\\text{NH}_2\\text{NHCONH}_2\\)", "\\(\\text{C=N-NHCONH}_2\\)", "Semicarbazone"] },
          { cells: ["Primary amine \\(\\text{RNH}_2\\)", "\\(\\text{C=N-R}\\)", "Schiff's base (substituted imine)"], pyqExampleId: "cb4eec6b-4a06-4ab5-9208-3166ad5b8510", noteAmber: "NEET 2022: cyanohydrin was matched with HCN, acetal with alcohol, Schiff's base with RNH₂ and oxime with NH₂OH." },
        ],
      },
      pyqExampleId: "cb4eec6b-4a06-4ab5-9208-3166ad5b8510",
      selfCheckExample: {
        prompt: "Propanone is warmed with semicarbazide in weakly acidic solution. What kind of reaction happens, and what is the product called?",
        steps: [
          "The \\(\\text{NH}_2\\) group of semicarbazide attacks the carbonyl carbon (addition).",
          "The addition product loses a molecule of water, so C=O becomes \\(\\text{C=N-NHCONH}_2\\) (elimination).",
        ],
        answer: "Addition followed by loss of water; the product is propanone semicarbazone",
      },
      practiceSet: [
        { prompt: "Which reagent separates an aldehyde from a mixture by forming a crystalline addition compound?", answer: "Sodium hydrogensulphite, \\(\\text{NaHSO}_3\\)" },
        { prompt: "What does ethanal give with phenylhydrazine?", answer: "Ethanal phenylhydrazone" },
        { prompt: "Which is more reactive in nucleophilic addition: propanal or propanone?", answer: "Propanal" },
        { prompt: "What does a ketone give with ethylene glycol and dry HCl?", answer: "A cyclic ketal (ethylene glycol ketal)" },
      ],
      traps: [
        {
          title: "Ketones are slower, for two reasons",
          body: "A ketone has two groups on its carbonyl carbon. They block the nucleophile and, being electron donating, make the carbon less positive. Both reasons make ketones less reactive than aldehydes.",
        },
        {
          title: "Oxime, hydrazone and Schiff's base come from different reagents",
          body: "Hydroxylamine gives an oxime, hydrazine a hydrazone, and a primary amine a Schiff's base. In each the new bond to carbon is C=N, and a molecule of water is lost.",
        },
        {
          title: "A cyanohydrin has one more carbon",
          body: "HCN adds a new C-C bond, so the cyanohydrin of cyclohexanone has seven carbons. Hydrolysing its CN group gives a COOH group on that extra carbon.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchak-grignard",
      name: "Grignard reagents with carbonyl compounds and nitriles",
      intuition:
        "In a Grignard reagent RMgX the carbon bonded to magnesium carries a negative charge, so R behaves as a nucleophile. It adds to the carbon of C=O, and water then turns the O-MgX into O-H. The new C-C bond is the useful part: the alcohol has the carbons of both partners. Added to a nitrile instead, R gives a ketone after hydrolysis.",
      definition:
        "- Methanal gives a **primary** alcohol, any other aldehyde a **secondary** alcohol, and a ketone a **tertiary** alcohol.\n" +
        "- The alcohol's carbon count is the carbonyl compound's plus the R group's.\n" +
        "- A nitrile, RCN, with R′MgX followed by hydrolysis gives a **ketone**, RCOR′.\n" +
        "- With \\(\\text{CO}_2\\) (dry ice), followed by acid, a Grignard reagent gives a carboxylic acid.\n" +
        "- Water must be kept out until the end: it destroys the Grignard reagent.",
      formula: {
        label: "Grignard addition, then hydrolysis",
        latex: "\\text{R}_2\\text{C=O} + \\text{R}'\\text{MgX} \\rightarrow \\text{R}_2\\text{C(OMgX)R}' \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{R}_2\\text{C(OH)R}'",
        symbols: [
          { symbol: "\\(\\text{R}'\\)", meaning: "the alkyl or aryl group brought by the Grignard reagent" },
          { symbol: "\\(\\text{X}\\)", meaning: "a halogen: Cl, Br or I" },
        ],
      },
      authoredExample: {
        prompt: "Ethanal is treated with CH₃MgBr and the product is hydrolysed. Name the alcohol formed and say whether it is primary, secondary or tertiary.",
        steps: [
          "The \\(\\text{CH}_3\\) group of the reagent adds to the carbonyl carbon of \\(\\text{CH}_3\\text{CHO}\\).",
          "Hydrolysis gives \\(\\text{CH}_3\\text{CH(OH)CH}_3\\).",
          "The carbon carrying OH is bonded to two other carbons, so the alcohol is secondary.",
        ],
        answer: "Propan-2-ol, a secondary alcohol",
      },
      selfCheckExample: {
        prompt: "Which carbonyl compound and which Grignard reagent give 2-methylpropan-2-ol, (CH₃)₃COH?",
        steps: [
          "The alcohol is tertiary, so the carbonyl compound is a ketone.",
          "Remove one \\(\\text{CH}_3\\) from the carbinol carbon: what is left, \\(\\text{(CH}_3)_2\\text{C=O}\\), is the ketone, and the removed group came from \\(\\text{CH}_3\\text{MgBr}\\).",
        ],
        answer: "Propanone with CH₃MgBr (then hydrolysis)",
      },
      practiceSet: [
        { prompt: "Which alcohol forms when methanal reacts with C₂H₅MgBr and the product is hydrolysed?", answer: "Propan-1-ol, \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{OH}\\)" },
        { prompt: "What kind of alcohol does a ketone give with a Grignard reagent?", answer: "A tertiary alcohol" },
        { prompt: "What does ethanenitrile give with C₂H₅MgBr followed by H₃O⁺?", answer: "Butan-2-one, \\(\\text{CH}_3\\text{COCH}_2\\text{CH}_3\\)" },
        { prompt: "Which carbonyl compound gives a primary alcohol with a Grignard reagent?", answer: "Methanal" },
      ],
      pyqExampleId: "c901d7e2-f18c-4714-869c-bb4c627c25a1",
      traps: [
        {
          title: "Only methanal gives a primary alcohol",
          body: "Every other aldehyde gives a secondary alcohol, and every ketone a tertiary one. Count the carbons on the carbinol carbon to check.",
        },
        {
          title: "A nitrile ends as a ketone",
          body: "With a nitrile the Grignard reagent adds once to the C≡N carbon. The C=O appears only when the product is hydrolysed, so the nitrile ends up as a ketone, not an alcohol.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchak-reduction",
      name: "Reducing aldehydes and ketones",
      intuition:
        "Reduction can take a C=O group to two different places. Hydride reagents and hydrogen add across the C=O and give an alcohol. Clemmensen and Wolff-Kishner reductions remove the oxygen completely and leave a CH₂ group. The reagents also differ in strength: NaBH₄ is mild, LiAlH₄ strong.",
      definition:
        "- **To an alcohol:** \\(\\text{NaBH}_4\\), \\(\\text{LiAlH}_4\\) or \\(\\text{H}_2\\) with Ni, Pt or Pd. An aldehyde gives a primary alcohol, a ketone a secondary alcohol.\n" +
        "- \\(\\text{NaBH}_4\\) is mild: it reduces aldehydes and ketones but not a carboxyl group. \\(\\text{LiAlH}_4\\) also reduces acids and esters to primary alcohols.\n" +
        "- **To \\(\\text{CH}_2\\):** zinc amalgam and concentrated HCl (**Clemmensen reduction**), or hydrazine followed by KOH in ethylene glycol on heating (**Wolff-Kishner reduction**).",
      table: {
        columns: ["Reagent", "What it reduces", "C=O becomes"],
        rows: [
          { cells: ["\\(\\text{NaBH}_4\\)", "Aldehydes and ketones; not acids or esters", "CH-OH"], pyqExampleId: "8571ed14-faa6-4a77-91b2-cb5e47658bde", noteAmber: "NEET 2021: NaBH₄ reduced the ring ketone to an alcohol and left the ester side chain unchanged." },
          { cells: ["\\(\\text{LiAlH}_4\\)", "Aldehydes, ketones, acids and esters", "CH-OH (acids and esters give primary alcohols)"] },
          { cells: ["\\(\\text{H}_2\\) with Ni, Pt or Pd", "Aldehydes and ketones", "CH-OH"] },
          { cells: ["Zn-Hg and conc. HCl (Clemmensen)", "Aldehydes and ketones", "\\(\\text{CH}_2\\)"], pyqExampleId: "5081923f-cb67-4272-ab25-937ebb34d4fa", noteAmber: "NEET 2023: both C=O groups of a diketone became CH₂, giving two ethyl groups." },
          { cells: ["\\(\\text{NH}_2\\text{NH}_2\\), then KOH in ethylene glycol, heat (Wolff-Kishner)", "Aldehydes and ketones", "\\(\\text{CH}_2\\)"] },
        ],
      },
      pyqExampleId: "8571ed14-faa6-4a77-91b2-cb5e47658bde",
      selfCheckExample: {
        prompt: "Propanone is heated with hydrazine and then with KOH in ethylene glycol. Name the product.",
        steps: [
          "This is the Wolff-Kishner reduction: the C=O group becomes \\(\\text{CH}_2\\).",
          "\\(\\text{CH}_3\\text{COCH}_3\\) becomes \\(\\text{CH}_3\\text{CH}_2\\text{CH}_3\\).",
        ],
        answer: "Propane",
      },
      practiceSet: [
        { prompt: "What does butanone give on Clemmensen reduction?", answer: "Butane" },
        { prompt: "Which reagents are used in Clemmensen reduction?", answer: "Zinc amalgam and concentrated HCl" },
        { prompt: "Which alcohol forms when propanal is reduced with NaBH₄?", answer: "Propan-1-ol" },
        { prompt: "Does NaBH₄ reduce a carboxylic acid?", answer: "No: \\(\\text{LiAlH}_4\\) or diborane is needed" },
      ],
      traps: [
        {
          title: "Clemmensen and Wolff-Kishner give CH₂, not an alcohol",
          body: "These two remove the carbonyl oxygen completely. A ketone becomes a hydrocarbon chain, never CH-OH.",
        },
        {
          title: "NaBH₄ is the mild one",
          body: "\\(\\text{NaBH}_4\\) reduces the C=O of aldehydes and ketones only. In a molecule that also has an acid or ester group, that group survives. \\(\\text{LiAlH}_4\\) would reduce it as well.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_AL_PREP_NOTE: SubtopicNote = {
  subtopicName: "Preparation of Alcohols and Phenols",
  title: "Preparation of Alcohols and Phenols",
  oneLineDefinition:
    "How alcohols are made from alkenes by hydration and hydroboration, from carbonyl compounds, acids and esters by reduction and with Grignard reagents, and how phenol is made from chlorobenzene, benzenesulphonic acid, diazonium salts and cumene.",
  whyItMatters:
    "Four NEET questions from 2021 to 2026. Two use a Grignard reagent: acetone with C₂H₅MgBr (2021), and ethanol carried through ethyl iodide and a Grignard reagent to methanal (Re-NEET 2024). One tests what diborane does to propene (Re-NEET 2024), and one matches four conversions, two of them ending in phenol, to their products (2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchal-hydration",
      name: "Hydration and hydroboration-oxidation of alkenes",
      intuition:
        "Both reactions add H and OH across a C=C bond, but they put the OH on different carbons. In acid, the alkene first takes up a proton and forms the more stable carbocation, so the OH ends up on the carbon with fewer hydrogens (Markovnikov's rule). In hydroboration, the boron atom joins the carbon that carries more hydrogens, and the boron is later replaced by OH, so the OH ends up on the end carbon.",
      definition:
        "- **Acid-catalysed hydration:** an alkene with water and an acid catalyst gives an alcohol. For an unsymmetrical alkene the addition follows **Markovnikov's rule**.\n" +
        "- The steps: the alkene is protonated to a carbocation, water attacks the carbocation, and a proton is lost.\n" +
        "- **Hydroboration-oxidation:** diborane, \\(\\text{(BH}_3)_2\\), adds to the alkene to give a trialkylborane. This is oxidised by hydrogen peroxide in aqueous NaOH to the alcohol.\n" +
        "- Boron attaches to the \\(sp^2\\) carbon that carries **more hydrogen atoms**, so the alcohol looks as if water had added **against** Markovnikov's rule. The yield is excellent.\n" +
        "- Propene gives propan-2-ol by acid hydration but propan-1-ol by hydroboration-oxidation.",
      formula: {
        label: "Hydroboration-oxidation of a terminal alkene",
        latex:
          "\\text{R-CH=CH}_2 \\xrightarrow{\\text{(i) B}_2\\text{H}_6\\quad \\text{(ii) H}_2\\text{O}_2,\\ \\text{OH}^-} \\text{R-CH}_2\\text{-CH}_2\\text{-OH}",
        symbols: [
          { symbol: "\\(\\text{B}_2\\text{H}_6\\)", meaning: "diborane, which adds boron to the end carbon" },
          { symbol: "\\(\\text{H}_2\\text{O}_2,\\ \\text{OH}^-\\)", meaning: "hydrogen peroxide in aqueous NaOH, which replaces boron by OH" },
        ],
      },
      authoredExample: {
        prompt: "But-1-ene, CH₃CH₂CH=CH₂, is treated once with water and dilute acid, and once with diborane followed by H₂O₂ in NaOH. Name the two alcohols.",
        steps: [
          "With acid, the proton goes to the end carbon and the more stable secondary carbocation forms on carbon 2: \\(\\text{CH}_3\\text{CH}_2\\overset{+}{\\text{C}}\\text{HCH}_3\\).",
          "Water attacks carbon 2 and a proton is lost, giving \\(\\text{CH}_3\\text{CH}_2\\text{CH(OH)CH}_3\\), butan-2-ol.",
          "With diborane, boron joins the end carbon, which carries two hydrogens. Oxidation puts OH where the boron was: \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_2\\text{OH}\\), butan-1-ol.",
        ],
        answer: "Butan-2-ol with acid; butan-1-ol by hydroboration-oxidation",
      },
      selfCheckExample: {
        prompt: "Name the alcohol that 2-methylpropene, (CH₃)₂C=CH₂, gives with dilute acid, and the one it gives by hydroboration-oxidation.",
        steps: [
          "In acid the proton goes to the \\(\\text{CH}_2\\) carbon and the tertiary carbocation \\(\\text{(CH}_3)_3\\text{C}^+\\) forms. Water then gives \\(\\text{(CH}_3)_3\\text{COH}\\).",
          "Diborane puts boron on the \\(\\text{CH}_2\\) carbon, which has more hydrogens. Oxidation gives \\(\\text{(CH}_3)_2\\text{CHCH}_2\\text{OH}\\).",
        ],
        answer: "2-Methylpropan-2-ol with acid; 2-methylpropan-1-ol by hydroboration-oxidation",
      },
      practiceSet: [
        { prompt: "Which reagents turn pent-1-ene into pentan-1-ol: water with dilute acid, or diborane followed by H₂O₂ in NaOH?", answer: "Diborane, then \\(\\text{H}_2\\text{O}_2\\) in aqueous NaOH" },
        { prompt: "In the acid-catalysed hydration of an alkene, what is formed when the alkene takes up a proton?", answer: "A carbocation" },
        { prompt: "Cyclohexene is treated with diborane and then with H₂O₂ in NaOH. Name the product.", answer: "Cyclohexanol" },
        { prompt: "Which rule does acid-catalysed hydration of an unsymmetrical alkene follow?", answer: "Markovnikov's rule" },
      ],
      pyqExampleId: "2c6086fa-d136-4ccc-8937-7f5d548272d1",
      traps: [
        {
          title: "Boron goes to the carbon with more hydrogens",
          body: "In hydroboration the boron, not a hydrogen, bonds to the \\(\\text{CH}_2\\) end of the double bond. So propene gives tripropylborane, \\(\\text{(CH}_3\\text{CH}_2\\text{CH}_2)_3\\text{B}\\), and then propan-1-ol.",
        },
        {
          title: "Acid hydration and hydroboration give different alcohols",
          body: "Acid hydration of propene gives propan-2-ol (Markovnikov). Hydroboration-oxidation of propene gives propan-1-ol. Only a symmetrical alkene such as ethene or cyclohexene gives the same alcohol both ways.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchal-carbonyl-routes",
      name: "Reduction and Grignard routes to alcohols",
      intuition:
        "Adding hydrogen to a C=O group turns it into a CH-OH group and keeps every carbon. A Grignard reagent adds its own alkyl group to the C=O carbon instead, so the alcohol gets more carbons. In both routes, the carbonyl compound you start from decides whether the alcohol is primary, secondary or tertiary.",
      definition:
        "- **Aldehydes and ketones** are reduced by hydrogen over Pt, Pd or Ni, or by \\(\\text{NaBH}_4\\) or \\(\\text{LiAlH}_4\\). Aldehydes give **primary** alcohols; ketones give **secondary** alcohols.\n" +
        "- **Carboxylic acids** are reduced to primary alcohols by \\(\\text{LiAlH}_4\\), a strong reducing agent.\n" +
        "- \\(\\text{LiAlH}_4\\) is expensive, so in industry an acid is first turned into its **ester** and the ester is reduced with **hydrogen and a catalyst**.\n" +
        "- **Grignard reagents** (taught in full in Aldehydes, Ketones and Carboxylic Acids): with methanal they give a primary alcohol, with other aldehydes a secondary alcohol, and with ketones a tertiary alcohol, after hydrolysis.",
      table: {
        columns: ["Starting compound", "Reagent", "Alcohol formed"],
        rows: [
          { cells: ["Aldehyde, \\(\\text{RCHO}\\)", "\\(\\text{H}_2\\) with Pt, Pd or Ni; \\(\\text{NaBH}_4\\); or \\(\\text{LiAlH}_4\\)", "Primary, \\(\\text{RCH}_2\\text{OH}\\)"] },
          { cells: ["Ketone, \\(\\text{RCOR}'\\)", "\\(\\text{H}_2\\) with Pt, Pd or Ni; \\(\\text{NaBH}_4\\); or \\(\\text{LiAlH}_4\\)", "Secondary, \\(\\text{RCH(OH)R}'\\)"] },
          { cells: ["Carboxylic acid, \\(\\text{RCOOH}\\)", "\\(\\text{LiAlH}_4\\), then \\(\\text{H}_2\\text{O}\\)", "Primary, \\(\\text{RCH}_2\\text{OH}\\)"] },
          { cells: ["Ester, \\(\\text{RCOOR}'\\)", "\\(\\text{H}_2\\) with a catalyst", "\\(\\text{RCH}_2\\text{OH}\\) and \\(\\text{R}'\\text{OH}\\)"], noteAmber: "NEET 2026: acetic acid was made into its methyl ester and then hydrogenated over a catalyst to give ethanol." },
          { cells: ["Methanal, \\(\\text{HCHO}\\)", "\\(\\text{RMgX}\\), then \\(\\text{H}_2\\text{O}\\)", "Primary, \\(\\text{RCH}_2\\text{OH}\\)"], pyqExampleId: "7eab257c-63ab-4d86-bd08-f2aafcbb227c", noteAmber: "Re-NEET 2024: ethanol was turned into iodoethane with P and I₂, then into C₂H₅MgI; with methanal and water it gave propan-1-ol." },
          { cells: ["Any other aldehyde", "\\(\\text{RMgX}\\), then \\(\\text{H}_2\\text{O}\\)", "Secondary"] },
          { cells: ["Ketone", "\\(\\text{RMgX}\\), then \\(\\text{H}_2\\text{O}\\)", "Tertiary"], pyqExampleId: "8f63bc6d-bc62-4d8d-9e64-064e6160436b", noteAmber: "NEET 2021: acetone with C₂H₅MgBr, then acid, gave 2-methylbutan-2-ol." },
        ],
      },
      pyqExampleId: "7eab257c-63ab-4d86-bd08-f2aafcbb227c",
      selfCheckExample: {
        prompt: "Name the alcohol formed when propanone is reduced with NaBH₄, and the alcohol formed when ethanal reacts with CH₃MgBr followed by water.",
        steps: [
          "\\(\\text{NaBH}_4\\) turns the C=O of propanone, \\(\\text{CH}_3\\text{COCH}_3\\), into CH-OH and keeps all three carbons: \\(\\text{CH}_3\\text{CH(OH)CH}_3\\).",
          "\\(\\text{CH}_3\\text{MgBr}\\) adds a methyl group to the C=O carbon of ethanal, \\(\\text{CH}_3\\text{CHO}\\). Hydrolysis gives \\(\\text{CH}_3\\text{CH(OH)CH}_3\\).",
        ],
        answer: "Propan-2-ol both times: a secondary alcohol by two different routes",
      },
      practiceSet: [
        { prompt: "What class of alcohol does a ketone give when it is reduced with H₂ over Ni?", answer: "A secondary alcohol" },
        { prompt: "Which reagent reduces a carboxylic acid directly to a primary alcohol?", answer: "\\(\\text{LiAlH}_4\\)" },
        { prompt: "Why is an acid turned into its ester before it is reduced to an alcohol in industry?", answer: "\\(\\text{LiAlH}_4\\) is expensive; an ester can be reduced with hydrogen and a catalyst" },
        { prompt: "Which kind of carbonyl compound gives a tertiary alcohol with a Grignard reagent?", answer: "A ketone" },
      ],
      traps: [
        {
          title: "Reduction keeps the carbons; a Grignard reagent adds them",
          body: "Reducing a carbonyl compound gives an alcohol with the same carbon chain. A Grignard reagent adds its alkyl group to the C=O carbon, so the alcohol has more carbons than the carbonyl compound.",
        },
        {
          title: "Only methanal gives a primary alcohol with a Grignard reagent",
          body: "Every other aldehyde gives a secondary alcohol, and a ketone gives a tertiary alcohol. To make a primary alcohol by reduction, start from any aldehyde, an acid or an ester.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchal-phenol-prep",
      name: "Preparing phenol",
      intuition:
        "Phenol is an OH group on a benzene ring. The ring does not easily take an OH directly, so each route first puts a group on the ring that can be swapped for OH or O⁻: a chlorine, a sulphonic acid group, a diazonium group, or the hydroperoxide made from cumene. Most routes give sodium phenoxide first, and acid then frees phenol.",
      definition:
        "- **From chlorobenzene:** fused with NaOH at 623 K under high pressure, it gives sodium phenoxide; acid then gives phenol.\n" +
        "- **From benzenesulphonic acid:** benzene is sulphonated with **oleum**; the benzenesulphonic acid formed is heated with **molten NaOH** to sodium phenoxide, and acid gives phenol.\n" +
        "- **From diazonium salts:** an aromatic primary amine with nitrous acid (\\(\\text{NaNO}_2\\) and HCl) at 273 to 278 K gives a diazonium salt. Warming it with water, or treating it with dilute acid, gives phenol.\n" +
        "- **From cumene:** cumene (isopropylbenzene) is oxidised by air to **cumene hydroperoxide**, which dilute acid turns into phenol and **acetone**. Acetone is obtained in large amounts as a by-product.",
      table: {
        columns: ["Starting compound", "Reagents", "What else to know"],
        rows: [
          { cells: ["Chlorobenzene", "NaOH at 623 K, high pressure; then acid", "Sodium phenoxide forms first"] },
          { cells: ["Benzene", "Oleum; then molten NaOH; then acid", "Goes through benzenesulphonic acid"], pyqExampleId: "0d8d391a-a5c7-4680-b6d5-839732b18228", noteAmber: "NEET 2026: benzene with oleum, then NaOH on heating, then acid, was matched to phenol." },
          { cells: ["Benzenediazonium chloride", "Warm water, or dilute acid", "Nitrogen gas is given off"] },
          { cells: ["Cumene", "Air (\\(\\text{O}_2\\)); then dilute acid", "Goes through cumene hydroperoxide; acetone forms too"], pyqExampleId: "0d8d391a-a5c7-4680-b6d5-839732b18228", noteAmber: "NEET 2026: cumene with O₂, then aqueous acid, was matched to phenol." },
        ],
      },
      pyqExampleId: "0d8d391a-a5c7-4680-b6d5-839732b18228",
      selfCheckExample: {
        prompt: "Starting from aniline, how is phenol made? Name the intermediate and the reagents for each step.",
        steps: [
          "Aniline with \\(\\text{NaNO}_2\\) and HCl at 273 to 278 K gives benzenediazonium chloride, \\(\\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^-\\).",
          "Warming this salt with water replaces the diazonium group by OH, and nitrogen gas is given off.",
        ],
        answer: "Aniline to benzenediazonium chloride (NaNO₂ and HCl, 273 to 278 K), then warm with water to get phenol",
      },
      practiceSet: [
        { prompt: "Name the by-product formed alongside phenol when cumene hydroperoxide is treated with dilute acid.", answer: "Acetone (propanone)" },
        { prompt: "What is formed when chlorobenzene is fused with NaOH, before any acid is added?", answer: "Sodium phenoxide" },
        { prompt: "What does cumene give when it is oxidised by air?", answer: "Cumene hydroperoxide" },
        { prompt: "With which reagent is benzene sulphonated on the way to phenol?", answer: "Oleum" },
      ],
      traps: [
        {
          title: "Chlorobenzene needs harsh conditions",
          body: "The chlorine on a benzene ring is not replaced by OH under mild conditions. Chlorobenzene must be fused with NaOH at 623 K under high pressure to give sodium phenoxide.",
        },
        {
          title: "The last step is acid",
          body: "Fusing with NaOH gives sodium phenoxide, not phenol. Phenol is set free only when the phenoxide is treated with acid.",
        },
      ],
    },
  ],
};

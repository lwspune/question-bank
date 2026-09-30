import type { SubtopicNote } from "@/app/notes/_types";

export const TESTS_ALD_NOTE: SubtopicNote = {
  subtopicName: "Oxidation and Identification Tests",
  title: "Oxidation and Identification Tests",
  oneLineDefinition:
    "Tollens' and Fehling's reagents detect aldehydes by oxidising them, 2,4-DNP detects any aldehyde or ketone, and the iodoform test detects a CH₃CO or CH₃CH(OH) group.",
  whyItMatters:
    "Twenty-three PYQs, four numerical, seven from 2026, more recent questions than any other page. Twelve use Tollens', Fehling's or 2,4-DNP to tell compounds apart; eleven ask which compounds give the iodoform test, or what it produces.",
  concepts: [
    // C1 — Tollens', Fehling's, 2,4-DNP
    {
      kind: "reference" as const,
      slug: "jcald-tollens-fehling",
      name: "Tollens', Fehling's and the 2,4-DNP test",
      intuition:
        "An aldehyde has an H on its carbonyl carbon, so mild oxidants turn it into an acid; a ketone has no such H and resists. Tollens' reagent is strong enough for every aldehyde. Fehling's is weaker and misses aromatic aldehydes. 2,4-DNP does not oxidise anything: it condenses with any C=O of an aldehyde or ketone.",
      definition:
        "- **Tollens' reagent**, ammoniacal silver nitrate \\(\\mathrm{[Ag(NH_3)_2]^+}\\): the aldehyde is oxidised to the carboxylate and silver is deposited as a mirror.\n" +
        "- **Fehling's solution** (\\(\\mathrm{Cu^{2+}}\\) with tartrate in alkali) and **Benedict's solution** (\\(\\mathrm{Cu^{2+}}\\) with citrate): aliphatic aldehydes reduce \\(\\mathrm{Cu^{2+}}\\) to a red-brown precipitate of \\(\\mathrm{Cu_2O}\\). Aromatic aldehydes do not.\n" +
        "- An α-hydroxy ketone (\\(\\mathrm{RCOCH_2OH}\\), as in fructose) passes both tests, although it is a ketone. Methanoic acid, which contains an aldehyde-like C–H, passes Tollens'.\n" +
        "- **2,4-DNP** gives a yellow, orange or red precipitate with any aldehyde or ketone. It cannot tell the two apart. The C=O of acids, esters and amides does not react.\n" +
        "- To tell an aldehyde from a ketone of the same formula (propanal from propanone), use Tollens' or Fehling's, never 2,4-DNP.",
      table: {
        columns: ["Test and reagent", "Positive sign", "Positive for", "Negative for"],
        rows: [
          { cells: ["Tollens': \\(\\mathrm{[Ag(NH_3)_2]^+}\\), \\(\\mathrm{OH^-}\\)", "Silver mirror", "All aldehydes, aliphatic and aromatic; methanoic acid; α-hydroxy ketones; reducing sugars", "Simple ketones; carboxylic acids other than methanoic acid"] },
          { cells: ["Fehling's: \\(\\mathrm{Cu^{2+}}\\), tartrate, NaOH", "Red-brown precipitate of \\(\\mathrm{Cu_2O}\\)", "Aliphatic aldehydes; α-hydroxy ketones such as fructose", "Aromatic aldehydes; simple ketones"] },
          { cells: ["Benedict's: \\(\\mathrm{Cu^{2+}}\\), citrate, \\(\\mathrm{Na_2CO_3}\\)", "Red-brown precipitate of \\(\\mathrm{Cu_2O}\\)", "Aliphatic aldehydes; α-hydroxy ketones such as fructose", "Aromatic aldehydes; simple ketones"] },
          { cells: ["2,4-DNP", "Yellow, orange or red precipitate", "Any aldehyde or ketone", "Carboxylic acids, esters, amides, alcohols, ethers"] },
          { cells: ["Iodoform: \\(\\mathrm{I_2}\\), NaOH", "Yellow precipitate of \\(\\mathrm{CHI_3}\\)", "\\(\\mathrm{CH_3CO{-}}\\) on C or H; \\(\\mathrm{CH_3CH(OH){-}}\\)", "Ketones and alcohols without these groups; acetic acid and its esters"] },
          { cells: ["\\(\\mathrm{NaHCO_3}\\) solution", "Effervescence of \\(\\mathrm{CO_2}\\)", "Carboxylic acids; picric acid", "Aldehydes, ketones, alcohols, most phenols"] },
        ],
        caption: "Tollens' catches every aldehyde; Fehling's catches only aliphatic ones.",
      },
      selfCheckExample: {
        prompt: "Which of propanal, butanone, 2-methylbenzaldehyde and 1-hydroxypropan-2-one give Tollens' test, and which give Fehling's test?",
        steps: [
          "Propanal is an aliphatic aldehyde: positive in both.",
          "Butanone is a simple ketone: negative in both.",
          "2-Methylbenzaldehyde is aromatic: positive with Tollens', negative with Fehling's.",
          "1-Hydroxypropan-2-one, \\(\\mathrm{CH_3COCH_2OH}\\), is an α-hydroxy ketone: positive in both.",
        ],
        answer: "Tollens': propanal, 2-methylbenzaldehyde, 1-hydroxypropan-2-one. Fehling's: propanal, 1-hydroxypropan-2-one",
      },
      practiceSet: [
        { prompt: "Does benzaldehyde give Fehling's test?", answer: "No: aromatic aldehydes do not reduce Fehling's solution" },
        { prompt: "Does fructose give Tollens' test?", answer: "Yes: it is an α-hydroxy ketone" },
        { prompt: "Which test tells propanal from propanone?", answer: "Tollens' or Fehling's; 2,4-DNP is positive for both" },
        { prompt: "Does ethyl ethanoate give a precipitate with 2,4-DNP?", answer: "No: the ester C=O does not condense" },
      ],
      pyqExampleId: "673afaeb-2dcf-4836-992a-13094ff29c37", // 2024 — count the compounds that give Fehling's test
      traps: [
        {
          title: "Aromatic aldehydes fail Fehling's but pass Tollens'",
          body: "Benzaldehyde and its ring-substituted relatives give a silver mirror but no red precipitate. Counting 'aldehydes' is not enough for a Fehling's count.",
        },
        {
          title: "2,4-DNP does not separate aldehydes from ketones",
          body: "Both give the orange precipitate. The test only shows that a C=O of an aldehyde or ketone is present.",
        },
      ],
    },

    // C2 — haloform
    {
      kind: "formula" as const,
      slug: "jcald-haloform",
      name: "The iodoform test and the haloform reaction",
      intuition:
        "Hypoiodite in base replaces all three hydrogens of a methyl group next to a C=O by iodine. The \\(\\mathrm{CI_3}\\) group then leaves as iodoform, \\(\\mathrm{CHI_3}\\), a yellow solid, and the rest becomes a carboxylate with one carbon fewer. Hypoiodite is also an oxidant, so an alcohol that it can oxidise to such a methyl ketone passes too.",
      definition:
        "- **Positive**: \\(\\mathrm{CH_3CO{-}}\\) joined to H or C, so ethanal and every methyl ketone, including aryl methyl ketones and α,β-unsaturated methyl ketones.\n" +
        "- **Also positive**: \\(\\mathrm{CH_3CH(OH){-}}\\) joined to H or C, so ethanol and every 2° alcohol with a methyl on the carbinol carbon. They are first oxidised to the methyl ketone.\n" +
        "- **Negative**: methanol; methanoic acid; acetic acid, its esters and amides (the \\(\\mathrm{CH_3CO}\\) is joined to O or N); 3° alcohols; ketones and alcohols with no methyl next to the C=O or CHOH (pentan-3-one, pentan-3-ol).\n" +
        "- The reagent is \\(\\mathrm{I_2}\\) with NaOH, or KI with NaOCl, which also gives hypoiodite \\(\\mathrm{OI^-}\\).",
      formula: {
        label: "Haloform reaction of a methyl ketone",
        latex:
          "\\mathrm{RCOCH_3 + 3I_2 + 4NaOH \\to RCOONa + CHI_3\\downarrow + 3NaI + 3H_2O}",
      },
      authoredExample: {
        prompt: "How many of these give the iodoform test: methanol, propan-1-ol, 1-phenylethanol, 3-methylbutan-2-one, propanoic acid, 2-methylpropan-2-ol, hexan-2-ol, ethyl ethanoate?",
        steps: [
          "Look for \\(\\mathrm{CH_3CO{-}C}\\) or \\(\\mathrm{CH_3CH(OH){-}C}\\) (or H in place of that C).",
          "1-Phenylethanol, \\(\\mathrm{C_6H_5CH(OH)CH_3}\\): yes. 3-Methylbutan-2-one, \\(\\mathrm{CH_3COCH(CH_3)_2}\\): yes. Hexan-2-ol, \\(\\mathrm{CH_3CH(OH)C_4H_9}\\): yes.",
          "Methanol and propan-1-ol lack the group; propanoic acid has none; 2-methylpropan-2-ol is 3° and cannot be oxidised; in ethyl ethanoate the \\(\\mathrm{CH_3CO}\\) is joined to O.",
        ],
        answer: "Three: 1-phenylethanol, 3-methylbutan-2-one and hexan-2-ol",
      },
      selfCheckExample: {
        prompt: "Which pairs can the iodoform test tell apart: propan-2-ol and propan-1-ol; hexan-2-one and hexan-3-one; ethanoic acid and propanoic acid?",
        steps: [
          "Propan-2-ol has \\(\\mathrm{CH_3CH(OH){-}}\\); propan-1-ol does not. One positive, one negative.",
          "Hexan-2-one is a methyl ketone; hexan-3-one, \\(\\mathrm{CH_3CH_2COCH_2CH_2CH_3}\\), is not. One positive, one negative.",
          "Both acids are negative, so the test cannot separate them.",
        ],
        answer: "The first two pairs; not the two acids",
      },
      practiceSet: [
        { prompt: "Does acetophenone give the iodoform test?", answer: "Yes: it is a methyl ketone" },
        { prompt: "Does 2-methylpropan-2-ol give the iodoform test?", answer: "No: it is a 3° alcohol" },
        { prompt: "What are the products of propanone with \\(\\mathrm{I_2}\\) and NaOH?", answer: "Iodoform \\(\\mathrm{CHI_3}\\) and sodium ethanoate" },
        { prompt: "Is hypoiodite an oxidising or a reducing agent?", answer: "Oxidising: it turns \\(\\mathrm{CH_3CH(OH){-}}\\) into \\(\\mathrm{CH_3CO{-}}\\)" },
      ],
      pyqExampleId: "fc6cf483-aea0-4c20-b1ee-d6dd7622dba3", // 2025 — count the compounds that cannot give iodoform
      traps: [
        {
          title: "Acetic acid and its esters are negative",
          body: "They contain \\(\\mathrm{CH_3CO}\\), but it is joined to oxygen. The test needs \\(\\mathrm{CH_3CO}\\) joined to carbon or hydrogen.",
        },
        {
          title: "Ethanol and ethanal are the only positives in their classes",
          body: "Ethanol is the only 1° alcohol that gives the test and ethanal the only aldehyde. Methanol and methanal are both negative.",
        },
      ],
    },
  ],
};

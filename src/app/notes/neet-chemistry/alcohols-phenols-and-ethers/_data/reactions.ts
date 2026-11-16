import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_AL_REACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Reactions of Alcohols",
  title: "Reactions of Alcohols",
  oneLineDefinition:
    "What alcohols do when the C-O bond breaks: they give alkyl halides with halogen acids and phosphorus halides (the basis of the Lucas test) and alkenes on dehydration, both through carbocations; and how they are oxidised to aldehydes, ketones and acids.",
  whyItMatters:
    "Five NEET questions from 2022 to 2024. Two are on the Lucas test: which statement about it is wrong (2022) and which butanol reacts at once (2024). Two turn on carbocations: which compound is dehydrated most readily in acid (2023) and what 3-methylbutan-2-ol gives with HBr (2023). One picks the reagents that take an alkene through an alcohol to an aldehyde (2024).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchal-lucas",
      name: "Alkyl halides from alcohols and the Lucas test",
      intuition:
        "The OH group is a poor leaving group. In acid it takes up a proton and leaves as a water molecule, and the halide ion takes its place. The easier the carbocation forms, the faster this goes, so tertiary alcohols react fastest and primary alcohols slowest. The Lucas test simply watches this speed: the alcohol dissolves in the reagent, but the alkyl chloride does not, so the solution turns cloudy when the chloride forms.",
      definition:
        "- **Halogen acids:** \\(\\text{R-OH} + \\text{HX} \\rightarrow \\text{R-X} + \\text{H}_2\\text{O}\\). Order of reactivity of alcohols with a given acid: **3° > 2° > 1°**.\n" +
        "- **Lucas reagent** is concentrated HCl with anhydrous \\(\\text{ZnCl}_2\\). Alcohols dissolve in it; the alkyl chlorides they form do not, and make the solution **turbid** (cloudy).\n" +
        "- A **tertiary** alcohol gives turbidity **at once**, because it forms the halide easily. A secondary alcohol reacts more slowly. A **primary** alcohol gives **no turbidity at room temperature**.\n" +
        "- **Phosphorus halides:** \\(3\\,\\text{R-OH} + \\text{PBr}_3 \\rightarrow 3\\,\\text{R-Br} + \\text{H}_3\\text{PO}_3\\). \\(\\text{PBr}_3\\) and \\(\\text{PI}_3\\) are usually made in the flask from red phosphorus with bromine or iodine.\n" +
        "- **Thionyl chloride:** \\(\\text{R-OH} + \\text{SOCl}_2 \\rightarrow \\text{R-Cl} + \\text{SO}_2 + \\text{HCl}\\). Both side products are gases.",
      table: {
        columns: ["Reagent", "Alcohol", "Result"],
        rows: [
          { cells: ["Lucas reagent, conc. HCl and anhydrous \\(\\text{ZnCl}_2\\)", "Tertiary", "Turbid at once"], pyqExampleId: "45c7be16-205f-461a-b2bb-e21dddb85753", noteAmber: "NEET 2024: of four butanols, only 2-methylpropan-2-ol, (CH₃)₃COH, reacted at once." },
          { cells: ["Lucas reagent", "Secondary", "Turbid, but more slowly"] },
          { cells: ["Lucas reagent", "Primary", "No turbidity at room temperature"], pyqExampleId: "2b6fee20-db1b-45ea-9235-2b6c60deaaec", noteAmber: "NEET 2022: the statement that primary alcohols are the most reactive was the wrong one." },
          { cells: ["Red P with \\(\\text{I}_2\\) (or \\(\\text{PBr}_3\\))", "Any", "Alkyl iodide (or bromide) and \\(\\text{H}_3\\text{PO}_3\\)"] },
          { cells: ["\\(\\text{SOCl}_2\\)", "Any", "Alkyl chloride, with \\(\\text{SO}_2\\) and HCl gases"] },
        ],
      },
      pyqExampleId: "45c7be16-205f-461a-b2bb-e21dddb85753",
      selfCheckExample: {
        prompt: "Write the products, with the number of moles of each, when 3 moles of propan-1-ol react with 1 mole of PBr₃.",
        steps: [
          "Each OH group is replaced by Br, so 3 moles of propan-1-ol give 3 moles of 1-bromopropane, \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{Br}\\).",
          "The phosphorus ends up as phosphorous acid: \\(3\\,\\text{C}_3\\text{H}_7\\text{OH} + \\text{PBr}_3 \\rightarrow 3\\,\\text{C}_3\\text{H}_7\\text{Br} + \\text{H}_3\\text{PO}_3\\).",
        ],
        answer: "3 moles of 1-bromopropane and 1 mole of H₃PO₃",
      },
      practiceSet: [
        { prompt: "Lucas reagent is a mixture of which two substances?", answer: "Concentrated HCl and anhydrous \\(\\text{ZnCl}_2\\)" },
        { prompt: "Why does the solution turn cloudy in the Lucas test?", answer: "The alkyl chloride formed does not dissolve in the reagent" },
        { prompt: "Arrange primary, secondary and tertiary alcohols by how fast they react with HBr.", answer: "Tertiary > secondary > primary" },
        { prompt: "Besides HCl, which gas is given off when an alcohol reacts with SOCl₂?", answer: "\\(\\text{SO}_2\\)" },
      ],
      traps: [
        {
          title: "Tertiary alcohols react fastest, primary slowest",
          body: "With Lucas reagent a tertiary alcohol turns cloudy at once and a primary alcohol stays clear at room temperature. Reactivity follows the ease of forming the carbocation: 3° > 2° > 1°.",
        },
        {
          title: "The cloudiness is the alkyl chloride",
          body: "Lucas reagent does not change colour. The test is read from turbidity: the alkyl chloride formed is insoluble in the reagent and separates as a cloudy layer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchal-dehydration",
      name: "Dehydration and carbocation stability",
      intuition:
        "Strong acid protonates the OH group, water leaves, and a carbocation is left behind. A neighbouring carbon then loses a proton and a C=C bond forms. Making the carbocation is the slow step, so an alcohol that gives a more stable carbocation loses water more easily and under milder conditions. A carbocation can also rearrange into a more stable one before it reacts.",
      definition:
        "- Alcohols lose water on heating with concentrated \\(\\text{H}_2\\text{SO}_4\\) or \\(\\text{H}_3\\text{PO}_4\\), or with anhydrous \\(\\text{ZnCl}_2\\) or alumina, to give **alkenes**.\n" +
        "- Ethanol: conc. \\(\\text{H}_2\\text{SO}_4\\) at **443 K**. A secondary alcohol: 85% \\(\\text{H}_3\\text{PO}_4\\) at 440 K. A tertiary alcohol: 20% \\(\\text{H}_3\\text{PO}_4\\) at 358 K.\n" +
        "- Ease of dehydration: **3° > 2° > 1°**, the order of carbocation stability.\n" +
        "- The three steps: protonation of the alcohol, loss of water to form the carbocation (the **slowest** step), and loss of a proton to form the alkene.\n" +
        "- **Rearrangement:** a secondary carbocation next to a carbon that carries a hydrogen and two alkyl groups can move that hydrogen across with its electron pair. This gives a more stable tertiary carbocation, and the product comes from it.",
      formula: {
        label: "Dehydration of ethanol",
        latex:
          "\\text{C}_2\\text{H}_5\\text{OH} \\xrightarrow{\\text{conc. H}_2\\text{SO}_4,\\ 443\\ \\text{K}} \\text{CH}_2\\text{=CH}_2 + \\text{H}_2\\text{O}",
        symbols: [
          { symbol: "\\(443\\ \\text{K}\\)", meaning: "the temperature that gives ethene; at 413 K the ether forms instead" },
        ],
      },
      authoredExample: {
        prompt: "Which of butan-1-ol, butan-2-ol and 2-methylpropan-2-ol is dehydrated most easily by acid, and which alkene does it give?",
        steps: [
          "Losing water from the protonated alcohol leaves a primary, a secondary and a tertiary carbocation in turn.",
          "The tertiary carbocation, \\(\\text{(CH}_3)_3\\text{C}^+\\), is the most stable, so 2-methylpropan-2-ol loses water most easily.",
          "A proton leaves from a methyl group next to the positive carbon, giving \\(\\text{(CH}_3)_2\\text{C=CH}_2\\).",
        ],
        answer: "2-Methylpropan-2-ol, giving 2-methylpropene",
      },
      selfCheckExample: {
        prompt: "Ethanol is heated with concentrated H₂SO₄, once at 443 K and once at 413 K. Name the main product each time.",
        steps: [
          "At 443 K each ethanol molecule loses water on its own, giving ethene, \\(\\text{CH}_2\\text{=CH}_2\\).",
          "At 413 K one molecule of ethanol attacks another, and water is lost between the two, giving ethoxyethane, \\(\\text{C}_2\\text{H}_5\\text{OC}_2\\text{H}_5\\).",
        ],
        answer: "Ethene at 443 K; ethoxyethane at 413 K",
      },
      practiceSet: [
        { prompt: "Which step is the slowest in the acid dehydration of an alcohol?", answer: "Loss of water to form the carbocation" },
        { prompt: "Arrange primary, secondary and tertiary alcohols by how easily they are dehydrated.", answer: "Tertiary > secondary > primary" },
        { prompt: "Which carbocation is more stable: (CH₃)₂CH⁺ or (CH₃)₃C⁺?", answer: "\\(\\text{(CH}_3)_3\\text{C}^+\\), the tertiary one" },
        { prompt: "Which acid and temperature are used to dehydrate a tertiary alcohol?", answer: "20% \\(\\text{H}_3\\text{PO}_4\\) at 358 K" },
      ],
      pyqExampleId: "f46b6553-b59d-41e4-a151-6cbd077ae6d6",
      traps: [
        {
          title: "The carbocation can move before it reacts",
          body: "A secondary carbocation next to a carbon carrying one hydrogen and two alkyl groups shifts that hydrogen and becomes tertiary. The bromide ion or the lost proton then acts on the tertiary carbon, so the product is not the one the starting OH position suggests.",
        },
        {
          title: "Temperature decides alkene or ether",
          body: "Ethanol with conc. \\(\\text{H}_2\\text{SO}_4\\) gives ethene at 443 K but ethoxyethane at 413 K. Read the temperature before naming the product.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchal-oxidation",
      name: "Oxidation and dehydrogenation of alcohols",
      intuition:
        "Oxidising an alcohol removes the hydrogen of the OH and a hydrogen from the carbon that carries it, so that carbon becomes C=O. A primary alcohol has two such hydrogens and can go on from aldehyde to acid; a secondary alcohol has one and stops at a ketone; a tertiary alcohol has none and resists oxidation.",
      definition:
        "- **Primary alcohols** give an **aldehyde**, which is easily oxidised further to a **carboxylic acid**. Acidified \\(\\text{KMnO}_4\\) takes them straight to the acid.\n" +
        "- To stop at the aldehyde, use \\(\\text{CrO}_3\\) in an anhydrous medium, or better, **PCC** (pyridinium chlorochromate).\n" +
        "- **Secondary alcohols** are oxidised by \\(\\text{CrO}_3\\) to **ketones**.\n" +
        "- **Tertiary alcohols** do not undergo oxidation. Strong oxidising agents such as \\(\\text{KMnO}_4\\) at high temperature break C-C bonds and give a mixture of acids with fewer carbons.\n" +
        "- **Over heated copper at 573 K** the alcohol vapour is dehydrogenated: primary alcohols give aldehydes, secondary alcohols give ketones, and tertiary alcohols lose water to give alkenes.",
      table: {
        columns: ["Alcohol", "Reagent", "Product"],
        rows: [
          { cells: ["Primary", "PCC, or \\(\\text{CrO}_3\\) in an anhydrous medium", "Aldehyde"], pyqExampleId: "fc3e88c8-ee32-412d-b1ae-67a85302d880", noteAmber: "NEET 2024: allylbenzene was taken by BH₃ and then H₂O₂ in NaOH to a primary alcohol, and PCC stopped it at the aldehyde." },
          { cells: ["Primary", "Acidified \\(\\text{KMnO}_4\\)", "Carboxylic acid"] },
          { cells: ["Secondary", "\\(\\text{CrO}_3\\)", "Ketone"] },
          { cells: ["Tertiary", "Mild oxidising agents", "No reaction"] },
          { cells: ["Primary", "Cu at 573 K", "Aldehyde"] },
          { cells: ["Secondary", "Cu at 573 K", "Ketone"] },
          { cells: ["Tertiary", "Cu at 573 K", "Alkene (loss of water)"] },
        ],
      },
      pyqExampleId: "fc3e88c8-ee32-412d-b1ae-67a85302d880",
      selfCheckExample: {
        prompt: "Butan-1-ol is treated once with PCC and once with acidified KMnO₄. Name the two products.",
        steps: [
          "PCC removes two hydrogens and stops at the aldehyde: \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CHO}\\), butanal.",
          "Acidified \\(\\text{KMnO}_4\\) oxidises the aldehyde further: \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{COOH}\\), butanoic acid.",
        ],
        answer: "Butanal with PCC; butanoic acid with acidified KMnO₄",
      },
      practiceSet: [
        { prompt: "What does propan-2-ol give when its vapour is passed over copper at 573 K?", answer: "Propanone, \\(\\text{CH}_3\\text{COCH}_3\\)" },
        { prompt: "What does 2-methylpropan-2-ol give over copper at 573 K, and why not a ketone?", answer: "2-Methylpropene; the carbon carrying the OH has no hydrogen to lose" },
        { prompt: "Which reagent stops the oxidation of a primary alcohol at the aldehyde?", answer: "PCC (pyridinium chlorochromate)" },
        { prompt: "What does a secondary alcohol give with CrO₃?", answer: "A ketone" },
      ],
      traps: [
        {
          title: "Acidified KMnO₄ does not stop at the aldehyde",
          body: "Acidified \\(\\text{KMnO}_4\\) oxidises a primary alcohol all the way to the carboxylic acid. Use PCC when the aldehyde is wanted.",
        },
        {
          title: "Tertiary alcohols resist oxidation",
          body: "A tertiary alcohol has no hydrogen on the carbon carrying the OH, so it gives no aldehyde or ketone. Over hot copper it loses water to an alkene instead.",
        },
      ],
    },
  ],
};

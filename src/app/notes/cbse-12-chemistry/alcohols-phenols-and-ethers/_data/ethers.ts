import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_AP_ETHERS_NOTE: SubtopicNote = {
  subtopicName: "Ethers",
  title: "Ethers: Preparation, Properties and Reactions",
  oneLineDefinition:
    "Ethers from alcohols at 413 K and by Williamson synthesis (and why a tertiary halide fails), their bond angle, boiling points and solubility, cleavage of the C-O bond by HI, and ring substitution in anisole.",
  whyItMatters:
    "42 questions. Twenty-nine were set in board papers from 2023 to 2026. Every year the board asks for Williamson synthesis and what an ether gives with HI (anisole, an ether with a tertiary group, an unsymmetrical ether, excess HI). It asks why a tertiary halide gives an alkene instead of an ether and which reagents to use instead (2023, 2025, 2026), the mechanism of ether formation from ethanol at 413 K (2023, 2025), the C-O-C bond angle (2025, 2026), and nitration and Friedel-Crafts reactions of anisole (2025, 2026). The textbook adds the mechanism of HI with methoxymethane and the limits of Williamson synthesis.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcap-ether-dehydration",
      name: "Ethers by dehydration of alcohols, and the mechanism",
      intuition:
        "The same acid and the same alcohol give two different products, and the temperature decides. At 443 K ethanol loses water from one molecule and gives ethene. At 413 K a second alcohol molecule attacks the protonated alcohol and pushes out water, joining the two through oxygen: ethoxyethane.",
      definition:
        "- Alcohols dehydrate with protic acids (H₂SO₄, H₃PO₄). Ethanol with sulphuric acid gives ethene at 443 K and ethoxyethane at 413 K.\n" +
        "- The ether forms by a nucleophilic bimolecular reaction (SN2): an alcohol molecule attacks a protonated alcohol.\n" +
        "- Step 1, protonation: \\(\\text{CH}_3\\text{CH}_2-\\text{OH} + \\text{H}^+ \\rightarrow \\text{CH}_3\\text{CH}_2-\\overset{+}{\\text{O}}\\text{H}_2\\).\n" +
        "- Step 2, a second ethanol molecule attacks and water leaves: \\(\\text{CH}_3\\text{CH}_2-\\text{OH} + \\text{CH}_3\\text{CH}_2-\\overset{+}{\\text{O}}\\text{H}_2 \\rightarrow \\text{CH}_3\\text{CH}_2-\\overset{+}{\\text{O}}(\\text{H})-\\text{CH}_2\\text{CH}_3 + \\text{H}_2\\text{O}\\).\n" +
        "- Step 3, loss of a proton: \\(\\text{CH}_3\\text{CH}_2-\\overset{+}{\\text{O}}(\\text{H})-\\text{CH}_2\\text{CH}_3 \\rightarrow \\text{CH}_3\\text{CH}_2-\\text{O}-\\text{CH}_2\\text{CH}_3 + \\text{H}^+\\).\n" +
        "- The method suits only ethers with primary, unhindered alkyl groups, made at a low temperature. Secondary and tertiary alcohols give alkenes instead, because elimination competes over substitution.",
      formula: {
        label: "Ether from ethanol",
        latex: "2\\,\\text{C}_2\\text{H}_5\\text{OH} \\xrightarrow{\\text{conc. H}_2\\text{SO}_4,\\ 413\\ \\text{K}} \\text{C}_2\\text{H}_5-\\text{O}-\\text{C}_2\\text{H}_5 + \\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt: "Write the mechanism for the formation of methoxymethane from methanol in the presence of acid.",
        steps: [
          "Step 1, protonation: \\(\\text{CH}_3-\\text{OH} + \\text{H}^+ \\rightarrow \\text{CH}_3-\\overset{+}{\\text{O}}\\text{H}_2\\).",
          "Step 2, SN2 attack by a second methanol molecule, water leaves: \\(\\text{CH}_3-\\text{OH} + \\text{CH}_3-\\overset{+}{\\text{O}}\\text{H}_2 \\rightarrow \\text{CH}_3-\\overset{+}{\\text{O}}(\\text{H})-\\text{CH}_3 + \\text{H}_2\\text{O}\\).",
          "Step 3, loss of a proton: \\(\\text{CH}_3-\\overset{+}{\\text{O}}(\\text{H})-\\text{CH}_3 \\rightarrow \\text{CH}_3-\\text{O}-\\text{CH}_3 + \\text{H}^+\\).",
        ],
        answer: "Protonation, SN2 attack by a second alcohol molecule with loss of water, then loss of H⁺",
      },
      selfCheckExample: {
        prompt: "Why is acid dehydration of a mixture of methanol and ethanol not a good way to make ethyl methyl ether?",
        steps: [
          "Any alcohol molecule can attack any protonated alcohol.",
          "So methanol with methanol, ethanol with ethanol and methanol with ethanol all react.",
        ],
        answer: "A mixture of three ethers forms (methoxymethane, ethoxyethane and methoxyethane), not one",
      },
      practiceSet: [
        { prompt: "Why are ethers not made by acid dehydration of tertiary alcohols?", answer: "Elimination competes over substitution, so an alkene forms easily instead of the ether" },
        { prompt: "What kind of alkyl group must an alcohol have for acid dehydration to give a good yield of ether?", answer: "A primary, unhindered alkyl group, with the temperature kept low" },
        { prompt: "Write the equation for making 1-propoxypropane from propan-1-ol by acid dehydration.", answer: "\\(2\\,\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{OH} \\xrightarrow{\\text{conc. H}_2\\text{SO}_4,\\ \\text{low temperature}} (\\text{CH}_3\\text{CH}_2\\text{CH}_2)_2\\text{O} + \\text{H}_2\\text{O}\\)" },
      ],
      pyqExampleId: "8f94e678-5ec8-481e-b1b6-cd4d0821eff3",
      traps: [
        {
          title: "Mixing up the two temperatures",
          body: "The lower temperature gives the ether and the higher one gives the alkene. Read the temperature in the question before you choose the mechanism.",
        },
        {
          title: "A carbocation in the ether mechanism",
          body: "For ethanol at 413 K the ether forms by SN2: a second alcohol molecule attacks the protonated alcohol as water leaves. Do not write a free carbocation step here.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcap-williamson",
      name: "Williamson synthesis and its limits",
      intuition:
        "An alkoxide ion attacks the carbon of an alkyl halide from the back and pushes out the halide. Backside attack needs an open carbon, so the halide must be primary. The alkoxide is also a strong base: given a crowded tertiary halide, it pulls off a hydrogen instead and makes an alkene. So put the bulky group on the alkoxide side and the small group on the halide side.",
      definition:
        "- An alkyl halide reacts with a sodium alkoxide; it makes both symmetrical and unsymmetrical ethers.\n" +
        "- The reaction is SN2 attack of the alkoxide ion on a **primary** alkyl halide. Ethers with secondary or tertiary groups can still be made, if that group comes from the alkoxide.\n" +
        "- With secondary and tertiary halides, elimination competes over substitution; a tertiary halide gives only the alkene, because alkoxides are strong bases as well as nucleophiles: \\(\\text{CH}_3\\text{ONa} + (\\text{CH}_3)_3\\text{C}-\\text{Br} \\rightarrow (\\text{CH}_3)_2\\text{C}{=}\\text{CH}_2 + \\text{NaBr} + \\text{CH}_3\\text{OH}\\).\n" +
        "- The right pairing for the same ether: \\((\\text{CH}_3)_3\\text{C}-\\text{ONa} + \\text{CH}_3-\\text{Br} \\rightarrow (\\text{CH}_3)_3\\text{C}-\\text{O}-\\text{CH}_3 + \\text{NaBr}\\).\n" +
        "- Phenols are used as the phenoxide: \\(\\text{C}_6\\text{H}_5\\text{ONa} + \\text{R}-\\text{X} \\rightarrow \\text{C}_6\\text{H}_5-\\text{O}-\\text{R} + \\text{NaX}\\). An aryl halide cannot be the halide part.",
      formula: {
        label: "Williamson synthesis",
        latex: "\\text{R}-\\text{X} + \\text{R}'-\\text{O}^-\\text{Na}^+ \\rightarrow \\text{R}-\\text{O}-\\text{R}' + \\text{NaX}",
        symbols: [
          { symbol: "\\(\\text{R}-\\text{X}\\)", meaning: "a primary alkyl halide" },
          { symbol: "\\(\\text{R}'-\\text{O}^-\\text{Na}^+\\)", meaning: "a sodium alkoxide or phenoxide, which may carry a bulky group" },
        ],
      },
      authoredExample: {
        prompt: "How would you prepare ethoxybenzene by Williamson synthesis? Write the reagents and equations.",
        steps: [
          "The aryl group cannot come from a halide, so it must come from phenol as sodium phenoxide.",
          "\\(\\text{C}_6\\text{H}_5\\text{OH} + \\text{NaOH} \\rightarrow \\text{C}_6\\text{H}_5\\text{ONa} + \\text{H}_2\\text{O}\\).",
          "The ethyl group comes from a primary halide, bromoethane: \\(\\text{C}_6\\text{H}_5\\text{ONa} + \\text{C}_2\\text{H}_5\\text{Br} \\rightarrow \\text{C}_6\\text{H}_5-\\text{O}-\\text{C}_2\\text{H}_5 + \\text{NaBr}\\).",
        ],
        answer: "Sodium phenoxide with bromoethane gives ethoxybenzene",
      },
      selfCheckExample: {
        prompt: "Which pair is right for 1-methoxy-4-nitrobenzene: (a) sodium 4-nitrophenoxide with CH₃Br, or (b) 4-bromonitrobenzene with CH₃ONa? Why?",
        steps: [
          "In (a) the halide is CH₃Br, a methyl halide, open to SN2 attack.",
          "In (b) the halogen is on a benzene ring; an aryl halide does not undergo SN2.",
        ],
        answer: "Pair (a)",
      },
      practiceSet: [
        { prompt: "What type of reaction is Williamson synthesis?", answer: "Nucleophilic substitution, SN2" },
        { prompt: "Name the alkoxide and the halide used to make 2-ethoxy-3-methylpentane.", answer: "Sodium 3-methylpentan-2-oxide (from 3-methylpentan-2-ol and Na) and bromoethane" },
        { prompt: "Write the reagents for 1-ethoxypropane by Williamson synthesis.", answer: "Sodium ethoxide with 1-bromopropane (or sodium propoxide with bromoethane: both halides are primary)" },
      ],
      pyqExampleId: "056ebd29-747b-4e16-a540-84f385ad7c34",
      traps: [
        {
          title: "Putting the tertiary group on the halide",
          body: "A tertiary halide with an alkoxide gives an alkene, not an ether. The tertiary group must come from the alkoxide, and the halide must be primary.",
        },
        {
          title: "Saying \"No\" without the fix",
          body: "When a question asks whether a pair can be used, say no, give the reason (elimination by the strongly basic alkoxide), and write the correct pair with its equation. The fix carries marks.",
        },
        {
          title: "Using an aryl halide",
          body: "Bromobenzene cannot be the halide in Williamson synthesis. The aryl group goes in as phenoxide.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcap-ether-cleavage",
      name: "Cleavage of ethers by HI",
      intuition:
        "Ethers are unreactive, but hot concentrated HI breaks the C-O bond. The acid first puts H⁺ on the oxygen; then I⁻ attacks a carbon. Which carbon depends on the groups: normally the smaller, less crowded one (SN2); but a tertiary group leaves as a stable carbocation (SN1), so the tertiary carbon gets the iodine. A phenyl group never gets it.",
      definition:
        "- The C-O bond breaks only under drastic conditions, with excess hydrogen halide at high temperature. Order of reactivity: HI > HBr > HCl.\n" +
        "- Step 1, the ether is protonated: \\(\\text{CH}_3-\\text{O}-\\text{CH}_2\\text{CH}_3 + \\text{HI} \\rightleftharpoons \\text{CH}_3-\\overset{+}{\\text{O}}(\\text{H})-\\text{CH}_2\\text{CH}_3 + \\text{I}^-\\).\n" +
        "- Step 2, I⁻ attacks the least substituted carbon by SN2 and an alcohol leaves: \\(\\text{I}^- + \\text{CH}_3-\\overset{+}{\\text{O}}(\\text{H})-\\text{CH}_2\\text{CH}_3 \\rightarrow \\text{CH}_3\\text{I} + \\text{CH}_3\\text{CH}_2\\text{OH}\\).\n" +
        "- Step 3, with excess HI at high temperature the alcohol is also turned into its iodide: \\(\\text{CH}_3\\text{CH}_2\\text{OH} + \\text{HI} \\rightarrow \\text{CH}_3\\text{CH}_2\\text{I} + \\text{H}_2\\text{O}\\). So a dialkyl ether gives two alkyl halide molecules.\n" +
        "- With primary or secondary groups, the lower alkyl group forms the alkyl iodide (SN2).\n" +
        "- When one group is tertiary, the tertiary halide forms: the leaving alcohol leaves behind the stable (CH₃)₃C⁺, and the reaction follows SN1.\n" +
        "- Alkyl aryl ethers break at the alkyl-oxygen bond, giving phenol and an alkyl halide: the O-C₆H₅ bond has partial double bond character and its carbon is sp². Phenol does not react further, because an sp² carbon does not undergo nucleophilic substitution.",
      formula: {
        label: "Dialkyl ether with excess HX",
        latex: "\\text{R}-\\text{O}-\\text{R} + 2\\,\\text{HX} \\xrightarrow{\\Delta} 2\\,\\text{R}-\\text{X} + \\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt: "Write the products and the mechanism when 1-methoxybutane is heated with HI (one mole).",
        steps: [
          "Step 1: \\(\\text{CH}_3-\\text{O}-\\text{C}_4\\text{H}_9 + \\text{HI} \\rightleftharpoons \\text{CH}_3-\\overset{+}{\\text{O}}(\\text{H})-\\text{C}_4\\text{H}_9 + \\text{I}^-\\).",
          "Both groups are primary, so the reaction is SN2 and I⁻ attacks the less crowded CH₃ carbon.",
          "Step 2: \\(\\text{I}^- + \\text{CH}_3-\\overset{+}{\\text{O}}(\\text{H})-\\text{C}_4\\text{H}_9 \\rightarrow \\text{CH}_3\\text{I} + \\text{C}_4\\text{H}_9\\text{OH}\\).",
        ],
        answer: "Iodomethane and butan-1-ol",
      },
      selfCheckExample: {
        prompt: "Write the products when ethoxybenzene is heated with HI.",
        steps: [
          "The O-C₆H₅ bond has partial double bond character, so it does not break.",
          "I⁻ attacks the ethyl carbon: \\(\\text{C}_6\\text{H}_5-\\text{O}-\\text{C}_2\\text{H}_5 + \\text{HI} \\rightarrow \\text{C}_6\\text{H}_5\\text{OH} + \\text{C}_2\\text{H}_5\\text{I}\\).",
        ],
        answer: "Phenol and iodoethane",
      },
      practiceSet: [
        { prompt: "What does methoxymethane give with excess HI?", answer: "Two molecules of iodomethane and water: \\(\\text{CH}_3\\text{OCH}_3 + 2\\text{HI} \\rightarrow 2\\,\\text{CH}_3\\text{I} + \\text{H}_2\\text{O}\\)" },
        { prompt: "Arrange HCl, HI and HBr in order of their reactivity towards ethers.", answer: "HI > HBr > HCl" },
        { prompt: "What does 2-methoxypropane give with HI (one mole)?", answer: "Iodomethane and propan-2-ol: the smaller methyl group takes the iodine (SN2)" },
      ],
      pyqExampleId: "d0cfb69b-de62-4adc-84c9-2a098d7a3df5",
      traps: [
        {
          title: "The smaller-group rule has an exception",
          body: "Normally the smaller alkyl group ends up as the iodide. If one group is tertiary, the reaction goes by SN1 and the tertiary group takes the iodine, while the other group stays as the alcohol.",
        },
        {
          title: "Iodobenzene from an aryl ether",
          body: "An alkyl aryl ether always gives phenol and an alkyl halide. Iodobenzene never forms, even with excess HI.",
        },
        {
          title: "Ignoring the word excess",
          body: "With one mole of HI a dialkyl ether gives an alcohol and an alkyl iodide. With excess HI the alcohol reacts too, and two alkyl iodides form.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcap-ether-properties",
      name: "Bond angle, boiling points and ring substitution in anisole",
      intuition:
        "An ether's oxygen holds two bulky groups, which push each other apart, so the C-O-C angle opens a little past tetrahedral. With no H on oxygen, ether molecules cannot hydrogen bond to each other, so ethers boil about as low as alkanes of the same mass. On a benzene ring, the OR group behaves like the OH of phenol: it activates the ring and sends new groups to ortho and para positions.",
      definition:
        "- The two bond pairs and two lone pairs on oxygen are arranged roughly tetrahedrally. The C-O-C angle is slightly greater than tetrahedral because of the repulsion between the two bulky R groups. The C-O bond (141 pm) is about as long as in alcohols.\n" +
        "- C-O bonds are polar, so ethers have a net dipole moment, but this hardly affects their boiling points: n-pentane 309.1 K, ethoxyethane 307.6 K, butan-1-ol 390 K. The large gap between alcohols and ethers is due to hydrogen bonding in alcohols.\n" +
        "- Ethers mix with water about as well as alcohols of the same mass (ethoxyethane 7.5 g and butan-1-ol 9 g per 100 mL water), because the ether oxygen can form hydrogen bonds with water.\n" +
        "- The alkoxy group (-OR) activates the ring and is ortho, para directing, as in phenol.\n" +
        "- **Bromination:** anisole reacts with bromine in ethanoic acid even without FeBr₃; the para isomer forms in 90% yield.\n" +
        "- **Friedel-Crafts:** with an alkyl halide or acyl halide and anhydrous AlCl₃, alkyl and acyl groups go to the ortho and para positions.\n" +
        "- **Nitration:** concentrated H₂SO₄ and HNO₃ give a mixture of ortho and para nitroanisole.",
      table: {
        columns: ["Reaction of anisole", "Reagents", "Products"],
        rows: [
          {
            cells: ["Bromination", "Br₂ in ethanoic acid, no catalyst", "4-Bromoanisole (90%) with some 2-bromoanisole"],
            pyqExampleId: "92e69201-655d-4fe4-be1c-9088caee2f41",
          },
          {
            cells: ["Friedel-Crafts alkylation", "CH₃Cl, anhydrous AlCl₃", "2-Methoxytoluene and 4-methoxytoluene"],
            pyqExampleId: "c5e2fcea-8fb2-44bf-a1ae-9dfc07599c97",
            noteAmber: "Board 2026 asked this alkylation and the nitration together.",
          },
          { cells: ["Friedel-Crafts acylation", "CH₃COCl, anhydrous AlCl₃", "2-Methoxyacetophenone and 4-methoxyacetophenone"] },
          { cells: ["Nitration", "Conc. H₂SO₄ and conc. HNO₃", "2-Nitroanisole and 4-nitroanisole"] },
          {
            cells: ["Bond angle C-O-C", "Not a reaction: a property", "Slightly more than tetrahedral, from repulsion of the two bulky R groups"],
            pyqExampleId: "c61fd11c-1940-45f8-9839-25ce0a409e0b",
            noteAmber: "Board 2025 and 2026 asked why the angle is greater than tetrahedral.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Why does ethoxyethane dissolve in water about as well as butan-1-ol, while pentane hardly dissolves?",
        steps: [
          "Ethoxyethane has no O-H, but its oxygen has lone pairs.",
          "Water molecules form hydrogen bonds to that oxygen; pentane has nothing to bond with.",
        ],
        answer: "The ether oxygen forms hydrogen bonds with water molecules",
      },
      practiceSet: [
        { prompt: "Which boils higher, ethoxyethane or butan-1-ol? Give the reason.", answer: "Butan-1-ol (390 K against 307.6 K): its molecules are joined by hydrogen bonds; ether molecules are not" },
        { prompt: "Why does anisole react with bromine without FeBr₃?", answer: "The OCH₃ group activates the ring enough by resonance" },
        { prompt: "Name the main products when anisole reacts with acetyl chloride and anhydrous AlCl₃.", answer: "2-Methoxyacetophenone and 4-methoxyacetophenone" },
      ],
      pyqExampleId: "4103699a-de02-42ab-b063-ab1aed2dae41",
      traps: [
        {
          title: "The wrong side of tetrahedral",
          body: "In an alcohol the C-O-H angle is slightly less than tetrahedral (lone pair repulsion). In an ether the C-O-C angle is slightly more (the two bulky R groups push apart). Do not mix them up.",
        },
        {
          title: "Only one product from anisole",
          body: "Substitution on anisole gives both the ortho and the para product. Write both, and name the para one as the major product.",
        },
      ],
    },
  ],
};

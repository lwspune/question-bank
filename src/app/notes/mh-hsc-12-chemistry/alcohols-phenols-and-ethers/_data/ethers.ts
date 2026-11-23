import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_AP_ETHERS_NOTE: SubtopicNote = {
  subtopicName: "Ethers",
  title: "Ethers: Preparation, Properties and Reactions",
  oneLineDefinition:
    "How ethers are made from alcohols and by Williamson synthesis, why they boil like alkanes yet dissolve like alcohols, how their C-O bond is broken, and how anisole reacts on its ring.",
  whyItMatters:
    "20 questions. Fourteen were set in board papers from 2014 to 2026. The board asked for Williamson synthesis from ethyl bromide (2022, 2024), methoxyethane from methyl iodide and from diazomethane (2014), the continuous etherification process (2017, 2020) and what ethers are and how they are classified (2019). It asked the action of hot HI, PCl₅ and dilute H₂SO₄ on methoxyethane (2022), diethyl ether into ethyl chloride (2023), anisole into phenol (2024, 2026), PCl₅ on ethyl methyl ether (2025), its hydrolysis (2026) and bromine in acetic acid on anisole (2025). The textbook adds Williamson synthesis with a secondary halide, the storage of ethers and a structure puzzle with excess HI.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccap-ether-prep",
      name: "Preparing ethers: dehydration and Williamson synthesis",
      intuition:
        "An ether is two alkyl groups sharing one oxygen. You can make it by squeezing water out of two alcohol molecules, which works well only for simple ethers, or by letting an alkoxide ion push a halide ion off an alkyl halide, which can make mixed ethers too. The second way is a backside attack, so it needs an uncrowded (primary) carbon on the halide. With a crowded halide the alkoxide pulls off a hydrogen instead, and you get an alkene.",
      definition:
        "- **Dehydration of alcohols:** with conc. \\(\\text{H}_2\\text{SO}_4\\) or \\(\\text{H}_3\\text{PO}_4\\), ethanol gives ethoxyethane at 413 K but ethene at 443 K: \\(2\\text{C}_2\\text{H}_5\\text{OH} \\xrightarrow{\\text{conc. H}_2\\text{SO}_4,\\ 413\\ \\text{K}} \\text{C}_2\\text{H}_5-\\text{O}-\\text{C}_2\\text{H}_5 + \\text{H}_2\\text{O}\\). It suits symmetrical ethers from primary alcohols; a higher temperature, or a 2° or 3° alcohol, gives mainly the alkene.\n" +
        "- **Williamson synthesis:** an alkyl halide with a sodium alkoxide or sodium phenoxide gives a dialkyl or an alkyl aryl ether. It makes simple and mixed ethers alike.\n" +
        "- It follows the **SN2** mechanism: the alkoxide ion attacks the carbon carrying the halogen from the back. So the alkyl halide **must be primary**. A 2° or 3° halide gives mainly an alkene by elimination. Aryl halides do not take part.\n" +
        "- Both reagents come from alcohols: HX turns an alcohol into the alkyl halide, and sodium turns an alcohol into the alkoxide.\n" +
        "- Board papers of 2014, 2017 and 2020 asked for the continuous etherification process and for methoxyethane from diazomethane. The present book does not teach these, so give them less time. In the continuous process ethanol and conc. \\(\\text{H}_2\\text{SO}_4\\) first give ethyl hydrogen sulphate, which reacts with more ethanol at 413 K to give the ether and set the acid free again.",
      formula: {
        label: "Williamson synthesis",
        latex: "\\text{R}-\\text{X} + \\text{R}'-\\text{ONa} \\longrightarrow \\text{R}-\\text{O}-\\text{R}' + \\text{NaX} \\quad (\\text{R}-\\text{X}\\ \\text{primary})",
      },
      authoredExample: {
        prompt: "Prepare tert-butyl methyl ether by Williamson synthesis. Explain why tert-butyl chloride and sodium methoxide cannot be used.",
        steps: [
          "Choose the pair in which the halide is primary: methyl bromide and sodium tert-butoxide.",
          "\\(\\text{CH}_3-\\text{Br} + (\\text{CH}_3)_3\\text{C}-\\text{ONa} \\longrightarrow (\\text{CH}_3)_3\\text{C}-\\text{O}-\\text{CH}_3 + \\text{NaBr}\\).",
          "The tert-butoxide ion attacks the uncrowded methyl carbon from the back (SN2) and bromide leaves.",
          "tert-Butyl chloride is a tertiary halide. The methoxide ion would remove a hydrogen from it instead, giving 2-methylpropene by elimination, not the ether.",
        ],
        answer: "Methyl bromide with sodium tert-butoxide; a tertiary halide gives an alkene",
      },
      selfCheckExample: {
        prompt: "Write the Williamson synthesis of anisole (methoxybenzene).",
        steps: [
          "The halide must be an alkyl halide, since aryl halides do not react: use methyl bromide with sodium phenoxide.",
          "\\(\\text{C}_6\\text{H}_5-\\text{ONa} + \\text{CH}_3-\\text{Br} \\longrightarrow \\text{C}_6\\text{H}_5-\\text{O}-\\text{CH}_3 + \\text{NaBr}\\).",
        ],
        answer: "Sodium phenoxide with methyl bromide gives anisole and NaBr",
      },
      practiceSet: [
        { prompt: "Ethanol is heated with conc. \\(\\text{H}_2\\text{SO}_4\\). At what temperature is ethoxyethane formed, and at what temperature ethene?", answer: "Ethoxyethane at 413 K; ethene at 443 K" },
        { prompt: "Which mechanism does Williamson synthesis follow?", answer: "SN2 (backside attack by the alkoxide ion)" },
        { prompt: "Can bromobenzene and sodium methoxide be used to make anisole? Why?", answer: "No. Aryl halides do not take part in Williamson synthesis" },
        { prompt: "What is formed mainly when sodium ethoxide reacts with tert-butyl chloride?", answer: "An alkene, 2-methylpropene, by elimination" },
      ],
      pyqExampleId: "87fd4afe-71bf-4d55-beb8-45447779919e",
      traps: [
        {
          title: "Putting the crowded group on the halide",
          body: "In Williamson synthesis the halide must be primary. Put the secondary or tertiary group on the alkoxide, or the answer turns into an elimination.",
        },
        {
          title: "Mixing up 413 K and 443 K",
          body: "Ethanol with conc. \\(\\text{H}_2\\text{SO}_4\\) gives the ether at 413 K and the alkene at 443 K. Writing the wrong temperature gives the wrong product.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccap-ether-properties",
      name: "What ethers are, their properties and storage",
      intuition:
        "An ether has the bent C-O-C shape of water but no hydrogen on its oxygen. Without that hydrogen, ether molecules cannot hydrogen bond to each other, so ethers boil about as low as alkanes. Water molecules, though, can still hydrogen bond to the ether's oxygen, so small ethers dissolve in water about as well as alcohols do.",
      definition:
        "- **Ethers** contain an oxygen atom bonded to two alkyl groups, two aryl groups or one of each: \\(\\text{R}-\\text{O}-\\text{R}'\\). They are organic oxides and are regarded as anhydrides of alcohols.\n" +
        "- **Classified** as symmetrical (simple) ethers, \\(\\text{R}-\\text{O}-\\text{R}\\), and unsymmetrical (mixed) ethers, \\(\\text{R}-\\text{O}-\\text{R}'\\); by the groups, as dialkyl, alkyl aryl and diaryl ethers.\n" +
        "- The C-O-C angle is 110°, not 180°, so the two bond dipoles do not cancel and ethers have a small net dipole moment (diethyl ether 1.18 D).\n" +
        "- Ethers are **neutral**. They do not react with bases, cold dilute acids, reducing agents, oxidising agents or active metals, but they dissolve in cold concentrated \\(\\text{H}_2\\text{SO}_4\\) by forming **oxonium salts**.\n" +
        "- On long contact with air ethers form **peroxides**, which decompose violently on heating. So ethers are kept in air-tight brown bottles.",
      table: {
        columns: ["Property", "What the textbook says"],
        rows: [
          {
            cells: ["Classes", "Symmetrical (simple) and unsymmetrical (mixed); dialkyl, alkyl aryl and diaryl"],
            pyqExampleId: "96eaa7b5-7464-47bc-9644-2b8a85605b70",
            noteAmber: "Board 2019 asked what ethers are and how they are classified.",
          },
          { cells: ["Physical state", "Dimethyl ether and ethyl methyl ether are gases; other ethers are colourless liquids with a pleasant smell"] },
          { cells: ["Volatility", "Lower ethers are highly volatile and highly inflammable"] },
          { cells: ["Boiling point", "About the same as an alkane of similar mass: n-heptane 371 K, methyl n-pentyl ether 373 K, n-hexyl alcohol 430 K"] },
          { cells: ["Solubility in water", "Like alcohols of similar mass, through hydrogen bonds to the ether oxygen: diethyl ether 7.5 g and n-butyl alcohol 9 g per 100 g water"] },
          { cells: ["Cold concentrated H₂SO₄", "Dissolves the ether as an oxonium salt"] },
          { cells: ["Air", "Slowly forms explosive peroxides; store in air-tight brown bottles"] },
          { cells: ["Uses of diethyl ether", "Once a general anaesthetic; a solvent for Grignard reagents, fats, waxes and oils"] },
        ],
      },
      practiceSet: [
        { prompt: "Why do ethers have a small net dipole moment?", answer: "The C-O-C bond angle is 110°, so the two C-O bond dipoles do not cancel" },
        { prompt: "Why does an ether dissolve in cold concentrated \\(\\text{H}_2\\text{SO}_4\\)?", answer: "Its oxygen is protonated and it forms an oxonium salt" },
        { prompt: "Write two uses of diethyl ether.", answer: "Solvent for Grignard reagents, fats, waxes and oils; formerly a general anaesthetic" },
        { prompt: "Name two ethers that are gases at room temperature.", answer: "Dimethyl ether and ethyl methyl ether" },
      ],
      pyqExampleId: "96eaa7b5-7464-47bc-9644-2b8a85605b70",
      traps: [
        {
          title: "Ethers hydrogen bond to each other",
          body: "They cannot: there is no hydrogen on the ether oxygen. They do hydrogen bond with water, which is why their solubility is like that of alcohols while their boiling points are like those of alkanes.",
        },
        {
          title: "A brown bottle is not about moisture",
          body: "Ethers are kept in air-tight brown bottles to keep out air and light, which form explosive peroxides.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccap-ether-cleavage",
      name: "Breaking the C-O bond: HI, PCl₅ and dilute acid",
      intuition:
        "Ethers are calm molecules, but a strong acid can protonate the oxygen and turn one half into a good leaving group. Then the iodide ion, a strong nucleophile, attacks the less crowded carbon. In an aryl alkyl ether the oxygen-ring bond is shorter and stronger than an ordinary single bond, so it is always the alkyl side that breaks.",
      definition:
        "- **Hot dilute \\(\\text{H}_2\\text{SO}_4\\) under pressure** hydrolyses an ether to alcohols (or a phenol): \\(\\text{R}-\\text{O}-\\text{R}' + \\text{H}_2\\text{O} \\xrightarrow{\\text{dil. H}_2\\text{SO}_4,\\ \\Delta,\\ \\text{pressure}} \\text{R}-\\text{OH} + \\text{R}'-\\text{OH}\\).\n" +
        "- **PCl₅** gives alkyl chlorides: \\(\\text{R}-\\text{O}-\\text{R}' + \\text{PCl}_5 \\longrightarrow \\text{R}-\\text{Cl} + \\text{R}'-\\text{Cl} + \\text{POCl}_3\\). No alcohol is left.\n" +
        "- **Hot concentrated HI or HBr** gives an alcohol and an alkyl halide. Step 1: the oxygen is protonated to an oxonium ion. Step 2: \\(\\text{I}^-\\) attacks the **less substituted** carbon (SN2), so the smaller group becomes the iodide and the larger one the alcohol.\n" +
        "- With **excess HI** the alcohol formed is also turned into its alkyl iodide.\n" +
        "- If one group is **tertiary**, the reaction goes by SN1 and the tertiary iodide forms, not the tertiary alcohol.\n" +
        "- **Aryl alkyl ethers:** the O-aryl bond is stronger and shorter, so the oxygen-alkyl bond breaks, giving a phenol and an alkyl iodide: \\(\\text{C}_6\\text{H}_5-\\text{O}-\\text{CH}_3 + \\text{HI} \\longrightarrow \\text{C}_6\\text{H}_5-\\text{OH} + \\text{CH}_3-\\text{I}\\).",
      formula: {
        label: "Cleavage by hot concentrated HI",
        latex: "\\text{R}-\\text{O}-\\text{R}' + \\text{HI} \\xrightarrow{\\Delta} \\text{R}-\\text{I} + \\text{R}'-\\text{OH} \\quad (\\text{R the less substituted group})",
      },
      authoredExample: {
        prompt: "Write the reaction of 1-methoxypropane with hot concentrated HI. What forms if HI is in excess?",
        steps: [
          "The oxygen is protonated first: \\(\\text{CH}_3-\\overset{+}{\\text{O}}\\text{H}-\\text{CH}_2\\text{CH}_2\\text{CH}_3\\).",
          "\\(\\text{I}^-\\) attacks the less substituted carbon, the methyl carbon, by SN2.",
          "\\(\\text{CH}_3-\\text{O}-\\text{CH}_2\\text{CH}_2\\text{CH}_3 + \\text{HI} \\xrightarrow{\\Delta} \\text{CH}_3-\\text{I} + \\text{CH}_3\\text{CH}_2\\text{CH}_2-\\text{OH}\\).",
          "With excess HI the propan-1-ol is converted too: \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{OH} + \\text{HI} \\longrightarrow \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{I} + \\text{H}_2\\text{O}\\).",
        ],
        answer: "Iodomethane and propan-1-ol; with excess HI, iodomethane and 1-iodopropane",
      },
      selfCheckExample: {
        prompt: "Write the products when diethyl ether is heated with dilute sulphuric acid under pressure.",
        steps: [
          "Hydrolysis breaks the C-O bond and each ethyl group takes an \\(-\\text{OH}\\).",
          "\\(\\text{C}_2\\text{H}_5-\\text{O}-\\text{C}_2\\text{H}_5 + \\text{H}_2\\text{O} \\xrightarrow{\\text{dil. H}_2\\text{SO}_4} 2\\text{C}_2\\text{H}_5\\text{OH}\\).",
        ],
        answer: "Two molecules of ethanol",
      },
      practiceSet: [
        { prompt: "tert-Butyl methyl ether is heated with hot HI. Which iodide is formed and by which mechanism?", answer: "tert-Butyl iodide (with methanol), by SN1" },
        { prompt: "In the cleavage of an ether by HI, which carbon does the iodide ion attack?", answer: "The less substituted carbon" },
        { prompt: "Which reagent breaks both C-O bonds of an ether and leaves no alcohol?", answer: "\\(\\text{PCl}_5\\) (the oxygen leaves as \\(\\text{POCl}_3\\))" },
      ],
      pyqExampleId: "bf138c13-1f2d-48e0-8629-fb48870e957c",
      traps: [
        {
          title: "Iodobenzene from an aryl alkyl ether",
          body: "The bond between oxygen and the ring is shorter and stronger, so it does not break. An aryl alkyl ether gives a phenol and an alkyl iodide, never an aryl iodide.",
        },
        {
          title: "Putting iodine on the bigger group",
          body: "\\(\\text{I}^-\\) attacks the less substituted carbon, so the smaller group becomes the iodide. The only exception is a tertiary group, which reacts by SN1 and gives the tertiary iodide.",
        },
        {
          title: "Writing an alcohol for PCl₅",
          body: "\\(\\text{PCl}_5\\) turns both groups into alkyl chlorides and the oxygen into \\(\\text{POCl}_3\\). Hot HI, by contrast, gives one alcohol and one iodide.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccap-aromatic-ethers",
      name: "Electrophilic substitution in anisole",
      intuition:
        "The methoxy group's oxygen pushes its lone pair into the ring, just as the \\(-\\text{OH}\\) of phenol does. That piles extra electron density on the two ortho carbons and the para carbon, so anisole reacts with electrophiles easily and puts the new group there, mostly at the less crowded para position.",
      definition:
        "- The alkoxy group of an aromatic ether is **ring activating** and **ortho, para directing**. Its +R effect raises the electron density at the two ortho positions and the para position.\n" +
        "- **Halogenation:** anisole is brominated by bromine in acetic acid even without a \\(\\text{FeBr}_3\\) catalyst, because the ring is activated. p-Bromoanisole is the major product and o-bromoanisole the minor one.\n" +
        "- **Friedel-Crafts reaction:** anisole reacts with an alkyl halide or an acyl chloride in the presence of anhydrous \\(\\text{AlCl}_3\\) as catalyst. With methyl chloride, 4-methoxytoluene is the major and 2-methoxytoluene the minor product: \\(\\text{C}_6\\text{H}_5\\text{OCH}_3 + \\text{CH}_3\\text{Cl} \\xrightarrow{\\text{anhyd. AlCl}_3} \\text{p-CH}_3\\text{C}_6\\text{H}_4\\text{OCH}_3 + \\text{HCl}\\).\n" +
        "- **Nitration:** the nitrating mixture (conc. \\(\\text{HNO}_3\\) with conc. \\(\\text{H}_2\\text{SO}_4\\)) gives a mixture of o-nitroanisole and p-nitroanisole.",
      table: {
        columns: ["Reaction", "Reagent", "Products"],
        rows: [
          {
            cells: ["Bromination", "Br₂ in acetic acid (no FeBr₃ needed)", "p-Bromoanisole (major), o-bromoanisole (minor)"],
            pyqExampleId: "eec0307c-0ada-4e1c-994d-620358ead161",
            noteAmber: "Board 2025 asked the action of bromine in acetic acid on anisole.",
          },
          { cells: ["Friedel-Crafts alkylation", "CH₃Cl with anhydrous AlCl₃", "4-Methoxytoluene (major), 2-methoxytoluene (minor)"] },
          { cells: ["Friedel-Crafts acylation", "CH₃COCl with anhydrous AlCl₃", "4-Methoxyacetophenone (major), 2-methoxyacetophenone (minor)"] },
          { cells: ["Nitration", "Conc. HNO₃ with conc. H₂SO₄", "o-Nitroanisole and p-nitroanisole"] },
        ],
      },
      practiceSet: [
        { prompt: "Name the catalyst used in the Friedel-Crafts reaction of anisole.", answer: "Anhydrous \\(\\text{AlCl}_3\\)" },
        { prompt: "Is the methoxy group of anisole ring activating or deactivating, and which positions does it direct to?", answer: "Activating; ortho and para" },
        { prompt: "Name the products when anisole is treated with the nitrating mixture.", answer: "o-Nitroanisole and p-nitroanisole" },
      ],
      pyqExampleId: "eec0307c-0ada-4e1c-994d-620358ead161",
      traps: [
        {
          title: "Adding a Lewis acid for bromination",
          body: "Anisole needs no \\(\\text{FeBr}_3\\): the methoxy group activates the ring enough. Friedel-Crafts reactions, though, do need anhydrous \\(\\text{AlCl}_3\\).",
        },
        {
          title: "Giving only one product",
          body: "These substitutions give an ortho and a para product. Name both and say which is major (para).",
        },
      ],
    },
  ],
};

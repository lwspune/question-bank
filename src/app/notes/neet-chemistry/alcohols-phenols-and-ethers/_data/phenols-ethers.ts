import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_AL_PHENOLS_ETHERS_NOTE: SubtopicNote = {
  subtopicName: "Phenols and Ethers",
  title: "Phenols and Ethers",
  oneLineDefinition:
    "Why phenol is more acidic than an alcohol and how ring substituents change that, the reactions of the phenol ring (nitration, bromination, Kolbe and Reimer-Tiemann) and its tests, and how ethers are made by Williamson synthesis, split by HI and counted as isomers.",
  whyItMatters:
    "Four NEET questions from 2022 to 2026. One tests how the position of a nitro group changes the acidity of phenol (2022), and one names the test that identifies a phenolic group (2026). On ethers, one asks what HI does to a benzyl aryl ether (2023), and one counts the cyclic ethers of formula C₄H₈O, stereoisomers included (2025).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchal-acidity",
      name: "Acidity of alcohols and phenols",
      intuition:
        "An acid is strong when the ion left behind after losing H⁺ is stable. In an alkoxide ion the negative charge stays on the oxygen. In the phenoxide ion the charge spreads into the benzene ring by resonance, so phenol gives up its proton far more readily. A group that pulls electrons from the ring spreads the charge further and makes the phenol stronger; a group that pushes electrons in makes it weaker.",
      definition:
        "- Alcohols react with active metals such as Na and K to give **alkoxides** and hydrogen. Their acid strength: **1° > 2° > 3°**. Alcohols are **weaker** acids than water.\n" +
        "- Phenols react with Na, and also with aqueous **NaOH**, to give phenoxides. Alcohols do not react with NaOH.\n" +
        "- In phenol the OH is on an \\(sp^2\\) carbon, and the phenoxide ion is **stabilised by resonance**.\n" +
        "- **Electron-withdrawing groups** such as \\(\\text{NO}_2\\) increase the acidity, most of all at the **ortho and para** positions, where the ring charge can reach the nitro group. At the meta position only the inductive pull acts.\n" +
        "- **Electron-releasing groups** such as alkyl groups decrease the acidity: the cresols are weaker acids than phenol.",
      formula: {
        label: "pKa values (lower pKa means a stronger acid)",
        latex:
          "p\\text{-nitrophenol}\\ (7.1) < o\\text{-nitrophenol}\\ (7.2) < m\\text{-nitrophenol}\\ (8.3) < \\text{phenol}\\ (10.0) < \\text{ethanol}\\ (15.9)",
        symbols: [
          { symbol: "\\(\\text{p}K_a\\)", meaning: "the measure of acid strength; the smaller it is, the stronger the acid" },
        ],
      },
      authoredExample: {
        prompt: "Arrange phenol, p-cresol, m-nitrophenol and 2,4,6-trinitrophenol in order of increasing acid strength.",
        steps: [
          "The methyl group of p-cresol pushes electrons into the ring, so p-cresol is weaker than phenol (pKa 10.2 against 10.0).",
          "A nitro group at the meta position pulls electrons inductively, so m-nitrophenol (pKa 8.3) is stronger than phenol.",
          "Three nitro groups at the ortho and para positions spread the charge of the phenoxide very widely, so 2,4,6-trinitrophenol (picric acid) is the strongest.",
        ],
        answer: "p-Cresol < phenol < m-nitrophenol < 2,4,6-trinitrophenol",
      },
      selfCheckExample: {
        prompt: "Which is the stronger acid, ethanol or phenol? Which of the two reacts with aqueous NaOH?",
        steps: [
          "Ethanol has pKa 15.9 and phenol 10.0; the lower pKa belongs to the stronger acid.",
          "The phenoxide ion is stabilised by resonance with the ring, the ethoxide ion is not.",
          "Phenol is acidic enough to react with NaOH; ethanol, a weaker acid than water, is not.",
        ],
        answer: "Phenol is the stronger acid, and only phenol reacts with aqueous NaOH",
      },
      practiceSet: [
        { prompt: "Does a methyl group on the ring make phenol more or less acidic?", answer: "Less acidic: it pushes electrons into the ring" },
        { prompt: "Which reacts with sodium metal to give hydrogen: ethanol, phenol or both?", answer: "Both" },
        { prompt: "Arrange primary, secondary and tertiary alcohols in order of acid strength.", answer: "Primary > secondary > tertiary" },
        { prompt: "Which is the stronger acid: ethanol or water?", answer: "Water" },
      ],
      pyqExampleId: "73704c23-a920-4838-9c5a-651b0374d630",
      traps: [
        {
          title: "The position of the nitro group matters",
          body: "A nitro group raises the acidity of phenol from every position, but o-nitrophenol (7.2) and p-nitrophenol (7.1) are much stronger than m-nitrophenol (8.3). Isomers with one nitro group do not have the same acid strength.",
        },
        {
          title: "Alcohols do not react with NaOH",
          body: "Alcohols react with sodium metal to give alkoxides and hydrogen, but they are weaker acids than water and do not react with aqueous NaOH. Phenol does react with NaOH.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchal-phenol-reactions",
      name: "Reactions and tests of phenol",
      intuition:
        "The OH group feeds electrons into the benzene ring, so the ring of phenol reacts with electrophiles much faster than benzene does, and the new group goes to the ortho and para positions. The phenoxide ion pushes in even more electrons, so it reacts even with a weak electrophile such as carbon dioxide.",
      definition:
        "- The OH group **activates** the ring and directs incoming groups to the **ortho and para** positions.\n" +
        "- **Nitration:** dilute \\(\\text{HNO}_3\\) at 298 K gives a mixture of o- and p-nitrophenol. o-Nitrophenol is **steam volatile** because of an intramolecular hydrogen bond; p-nitrophenol is less volatile because its molecules are hydrogen bonded to each other. Concentrated \\(\\text{HNO}_3\\) gives 2,4,6-trinitrophenol (picric acid), in poor yield.\n" +
        "- **Bromination:** bromine in \\(\\text{CS}_2\\) or \\(\\text{CHCl}_3\\) at low temperature gives monobromophenols. **Bromine water** gives a white precipitate of **2,4,6-tribromophenol**.\n" +
        "- **Kolbe's reaction:** sodium phenoxide with \\(\\text{CO}_2\\), then acid, gives **2-hydroxybenzoic acid** (salicylic acid).\n" +
        "- **Reimer-Tiemann reaction:** phenol with \\(\\text{CHCl}_3\\) and aqueous NaOH puts a **CHO group at the ortho position**, giving salicylaldehyde after acid.\n" +
        "- Phenol heated with **zinc dust** gives benzene; with chromic acid it is oxidised to benzoquinone.",
      table: {
        columns: ["Reaction", "Reagents", "Main product"],
        rows: [
          { cells: ["Nitration", "Dilute \\(\\text{HNO}_3\\), 298 K", "o- and p-Nitrophenol"] },
          { cells: ["Nitration", "Concentrated \\(\\text{HNO}_3\\)", "2,4,6-Trinitrophenol (picric acid)"] },
          { cells: ["Bromination", "\\(\\text{Br}_2\\) in \\(\\text{CS}_2\\), low temperature", "o- and p-Bromophenol"] },
          { cells: ["Bromination", "Bromine water", "2,4,6-Tribromophenol, a white precipitate"] },
          { cells: ["Kolbe's reaction", "Sodium phenoxide and \\(\\text{CO}_2\\), then \\(\\text{H}^+\\)", "Salicylic acid"] },
          { cells: ["Reimer-Tiemann reaction", "\\(\\text{CHCl}_3\\) and aqueous NaOH, then \\(\\text{H}^+\\)", "Salicylaldehyde"] },
          { cells: ["Reduction", "Zinc dust, heat", "Benzene"] },
          { cells: ["Phthalein dye test", "Phthalic anhydride and conc. \\(\\text{H}_2\\text{SO}_4\\), heat; then NaOH", "Phenolphthalein, pink in alkali"], pyqExampleId: "5e50293a-ac5c-4c40-b2b0-47eaac7191b8", noteAmber: "NEET 2026: the phthalein dye test identifies the phenolic group." },
        ],
      },
      pyqExampleId: "5e50293a-ac5c-4c40-b2b0-47eaac7191b8",
      selfCheckExample: {
        prompt: "Phenol is shaken with bromine water. What is seen, and what is the product? What changes if bromine in CS₂ at low temperature is used instead?",
        steps: [
          "In water the OH group activates the ring so strongly that all three ortho and para positions are brominated.",
          "2,4,6-Tribromophenol separates as a white precipitate.",
          "In \\(\\text{CS}_2\\), a solvent of low polarity, at low temperature only one bromine goes in, at the ortho or para position.",
        ],
        answer: "A white precipitate of 2,4,6-tribromophenol; in CS₂ at low temperature, o- and p-bromophenol",
      },
      practiceSet: [
        { prompt: "Name the main product of Kolbe's reaction.", answer: "2-Hydroxybenzoic acid (salicylic acid)" },
        { prompt: "Which group does the Reimer-Tiemann reaction put on the phenol ring, and at which position?", answer: "A CHO group, at the ortho position" },
        { prompt: "Which is steam volatile: o-nitrophenol or p-nitrophenol?", answer: "o-Nitrophenol, because of its intramolecular hydrogen bond" },
        { prompt: "What does phenol give when it is heated with zinc dust?", answer: "Benzene" },
      ],
      traps: [
        {
          title: "Bromine water gives the tribromo compound",
          body: "Phenol needs no Lewis acid to react with bromine. In bromine water all three ortho and para positions are substituted, giving 2,4,6-tribromophenol. Only bromine in \\(\\text{CS}_2\\) or \\(\\text{CHCl}_3\\) at low temperature stops at one bromine.",
        },
        {
          title: "Kolbe's reaction uses the phenoxide ion",
          body: "Carbon dioxide is a weak electrophile. It reacts with sodium phenoxide, which is more reactive than phenol, and the COOH group goes to the ortho position.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchal-ethers",
      name: "Williamson synthesis and cleavage of ethers by HI",
      intuition:
        "In the Williamson synthesis an alkoxide ion pushes the halogen out of an alkyl halide and joins on, forming the C-O-C link. This works when the halide carbon is easy to reach, which means a primary alkyl halide. Splitting an ether runs the other way: HI protonates the oxygen, and an iodide ion attacks one of the two carbons. Which carbon it attacks decides which half becomes the alkyl iodide.",
      definition:
        "- **From alcohols:** a primary alcohol with conc. \\(\\text{H}_2\\text{SO}_4\\) at **413 K** gives a symmetrical ether (ethanol gives ethoxyethane). Secondary and tertiary alcohols give alkenes instead.\n" +
        "- **Williamson synthesis:** an alkyl halide with a sodium alkoxide gives an ether, \\(\\text{R-X} + \\text{R}'\\text{-ONa} \\rightarrow \\text{R-O-R}' + \\text{NaX}\\). It is an \\(\\text{S}_\\text{N}2\\) reaction and works best with **primary** alkyl halides.\n" +
        "- With a **tertiary** alkyl halide the alkoxide acts as a base and removes HX, so an **alkene** forms instead of the ether.\n" +
        "- Alkyl aryl ethers are made from a **sodium phenoxide** and an alkyl halide.\n" +
        "- **Cleavage by HX:** reactivity HI > HBr > HCl. A dialkyl ether gives an alkyl halide and an alcohol; with excess HX the alcohol is also turned into a halide.\n" +
        "- If both groups are primary or secondary, the **smaller** alkyl group becomes the iodide (\\(\\text{S}_\\text{N}2\\)). If one group is **tertiary**, it becomes the iodide, because its carbocation forms easily (\\(\\text{S}_\\text{N}1\\)).\n" +
        "- An **alkyl aryl ether** always gives a **phenol** and an alkyl iodide: the aryl C-O bond does not break.",
      table: {
        columns: ["Ether", "Products with HI", "Why"],
        rows: [
          { cells: ["\\(\\text{CH}_3\\text{-O-CH(CH}_3)_2\\)", "\\(\\text{CH}_3\\text{I}\\) and \\(\\text{(CH}_3)_2\\text{CHOH}\\)", "Iodide attacks the smaller methyl group"] },
          { cells: ["\\(\\text{(CH}_3)_3\\text{C-O-CH}_3\\)", "\\(\\text{(CH}_3)_3\\text{C-I}\\) and \\(\\text{CH}_3\\text{OH}\\)", "The tertiary carbocation forms easily"] },
          { cells: ["Anisole, \\(\\text{C}_6\\text{H}_5\\text{-O-CH}_3\\)", "\\(\\text{C}_6\\text{H}_5\\text{OH}\\) and \\(\\text{CH}_3\\text{I}\\)", "The aryl C-O bond does not break"] },
          { cells: ["Benzyl aryl ether, \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{-O-Ar}\\)", "\\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{I}\\) and a phenol, ArOH", "The benzyl carbocation is stabilised by the ring"], pyqExampleId: "5e05ba1c-5792-40d0-8e9b-25656628956d", noteAmber: "NEET 2023: a benzyl aryl ether heated with HI gave benzyl iodide and a phenol." },
        ],
      },
      pyqExampleId: "5e05ba1c-5792-40d0-8e9b-25656628956d",
      selfCheckExample: {
        prompt: "Which pair makes 2-methoxy-2-methylpropane, (CH₃)₃C-O-CH₃, by Williamson synthesis: (CH₃)₃C-Br with CH₃ONa, or CH₃Br with (CH₃)₃C-ONa? What does the other pair give?",
        steps: [
          "The Williamson synthesis needs the alkoxide to attack a primary alkyl halide, here \\(\\text{CH}_3\\text{Br}\\). So \\(\\text{CH}_3\\text{Br}\\) with \\(\\text{(CH}_3)_3\\text{C-ONa}\\) gives the ether.",
          "With the tertiary halide \\(\\text{(CH}_3)_3\\text{C-Br}\\), the methoxide ion acts as a base and removes HBr, giving \\(\\text{(CH}_3)_2\\text{C=CH}_2\\).",
        ],
        answer: "CH₃Br with sodium tert-butoxide gives the ether; the other pair gives 2-methylpropene",
      },
      practiceSet: [
        { prompt: "Arrange HCl, HBr and HI by how well they split ethers.", answer: "HI > HBr > HCl" },
        { prompt: "Why is anisole made from sodium phenoxide and a methyl halide, not from chlorobenzene and sodium methoxide?", answer: "The chlorine of chlorobenzene is not replaced by the methoxide ion" },
        { prompt: "What does ethoxyethane give when it is heated with excess HI?", answer: "Two molecules of iodoethane, \\(\\text{C}_2\\text{H}_5\\text{I}\\)" },
        { prompt: "Which kind of alkyl halide gives the best yield in the Williamson synthesis?", answer: "A primary alkyl halide" },
      ],
      traps: [
        {
          title: "A tertiary alkyl halide gives an alkene",
          body: "In the Williamson synthesis a tertiary alkyl halide loses HX to the alkoxide and gives an alkene, not an ether. Put the tertiary group on the alkoxide and use the primary halide.",
        },
        {
          title: "An alkyl aryl ether never gives an aryl iodide",
          body: "HI splits an alkyl aryl ether between the oxygen and the alkyl group. The products are a phenol and an alkyl iodide, never an iodobenzene and an alcohol.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchal-ether-isomers",
      name: "Counting ether isomers",
      intuition:
        "To count isomers, first list the structures, then ask of each one whether it has a mirror image twin. In a cyclic ether the oxygen sits in the ring, so you try each ring size and place the carbons that are left as side groups. A structure with one chiral carbon counts twice. A ring with two like chiral carbons has a trans pair that counts twice and a cis form that is its own mirror image and counts once.",
      definition:
        "- A **chiral carbon** carries four different groups. A structure with one chiral carbon exists as **two** enantiomers.\n" +
        "- On a small ring, two groups can be on the **same side (cis)** or on **opposite sides (trans)**.\n" +
        "- If two ring carbons each carry the same group (as in 2,3-dimethyloxirane), the trans form is chiral and counts as **two**, while the cis form has a mirror plane and counts as **one** (a meso form).\n" +
        "- Ethers with the same formula but different alkyl groups on the two sides of the oxygen are **metamers**, such as ethoxyethane and methoxypropane.\n" +
        "- An ether and an alcohol of the same formula are **functional isomers**.",
      formula: {
        label: "Isomers from one structure",
        latex:
          "\\text{one chiral carbon} \\Rightarrow 2;\\qquad \\text{two like chiral carbons on a ring} \\Rightarrow 2\\ (\\text{trans}) + 1\\ (\\text{cis})",
      },
      authoredExample: {
        prompt: "How many isomers, stereoisomers included, are there of cyclic ethers with formula C₃H₆O?",
        steps: [
          "A four-membered ring of O and three carbons uses every carbon: oxetane. It has no chiral carbon, so it counts once.",
          "A three-membered ring of O and two carbons leaves one carbon as a methyl group: methyloxirane.",
          "The ring carbon carrying the methyl group holds O, a ring \\(\\text{CH}_2\\), \\(\\text{CH}_3\\) and H: four different groups. So methyloxirane counts twice.",
          "Total: \\(1 + 2 = 3\\).",
        ],
        answer: "3",
      },
      selfCheckExample: {
        prompt: "How many open-chain (not cyclic) ethers have the formula C₄H₁₀O?",
        steps: [
          "Split the four carbons between the two sides of the oxygen: 1 and 3, or 2 and 2.",
          "1 and 3: 1-methoxypropane, \\(\\text{CH}_3\\text{OCH}_2\\text{CH}_2\\text{CH}_3\\), and 2-methoxypropane, \\(\\text{CH}_3\\text{OCH(CH}_3)_2\\).",
          "2 and 2: ethoxyethane, \\(\\text{C}_2\\text{H}_5\\text{OC}_2\\text{H}_5\\).",
          "None has a chiral carbon: the middle carbon of 2-methoxypropane carries two identical methyl groups.",
        ],
        answer: "3",
      },
      practiceSet: [
        { prompt: "Is 2-methyloxolane (2-methyltetrahydrofuran) chiral?", answer: "Yes: its carbon 2 carries O, a ring \\(\\text{CH}_2\\), \\(\\text{CH}_3\\) and H" },
        { prompt: "Is 3-methyloxolane chiral?", answer: "Yes: its carbon 3 carries H, \\(\\text{CH}_3\\), a ring \\(\\text{CH}_2\\) bonded to O and a ring \\(\\text{CH}_2\\) that is not" },
        { prompt: "Name a metamer of ethoxyethane.", answer: "1-Methoxypropane (or 2-methoxypropane)" },
        { prompt: "Name the alcohol and the ether that share the formula C₂H₆O.", answer: "Ethanol and methoxymethane" },
      ],
      pyqExampleId: "29759635-abbb-4a99-a2cd-270c7e8af7ca",
      traps: [
        {
          title: "A chiral structure counts twice",
          body: "When a question counts stereoisomers, every structure with one chiral carbon adds two isomers, not one. Ethyloxirane and 2-methyloxetane each count twice.",
        },
        {
          title: "The cis form of a ring with two like groups is not chiral",
          body: "cis-2,3-Dimethyloxirane has a mirror plane, so it is the same as its mirror image and counts once. Only the trans form exists as a pair of enantiomers.",
        },
      ],
    },
  ],
};

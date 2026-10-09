import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_ORG_ISOMERISM_NOTE: SubtopicNote = {
  subtopicName: "Isomerism",
  title: "Isomerism: Structural Isomers, Cis/Trans and Chirality",
  oneLineDefinition:
    "Isomers have the same molecular formula but a different arrangement of atoms, either in what is bonded to what (structural) or in how it is arranged in space (stereo).",
  whyItMatters:
    "Isomers were the favourite topic of the Cambridge papers, which asked 'which of these are structural isomers' in most years from 2013 to 2022. The ministry papers asked for isomers of hexanoic acid in 2023 and, in 2026, which families a given formula with one oxygen could belong to.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-org-structural",
      name: "Structural isomers: chain, position and functional group",
      intuition:
        "With the same set of atoms you can build different skeletons, put a group on a different carbon, or even build a different family. A ring uses up hydrogens exactly like a double bond, so a cyclic compound and an open-chain alkene can be isomers.",
      definition:
        "**Isomers** have the same molecular formula. **Structural isomers** differ in which atoms are bonded to which.\n" +
        "- **Chain** isomers: different skeletons (pentane, 2-methylbutane, 2,2-dimethylpropane are the three \\(\\mathrm{C_5H_{12}}\\)).\n" +
        "- **Position** isomers: same group on a different carbon (propan-1-ol and propan-2-ol).\n" +
        "- **Functional group** isomers: different families with one formula. Alcohol and ether; aldehyde and ketone; carboxylic acid and ester; alkene and cycloalkane.\n" +
        "- A formula with one O and DoU 1 (like \\(\\mathrm{C_4H_8O}\\)) can be an aldehyde, a ketone, or an alcohol or ether that has a C=C or a ring.\n" +
        "- Isomers usually have **different physical properties** (boiling point, solubility), and functional group isomers different chemistry too.\n" +
        "- Test: write both molecular formulas and compare. Then check the two drawings are not the same molecule turned round.",
      authoredExample: {
        prompt: "How many structural isomers have the formula \\(\\mathrm{C_4H_{10}O}\\)? Name them.",
        steps: [
          "DoU \\(= (8 + 2 - 10)/2 = 0\\): no rings, no double bonds, so only alcohols and ethers.",
          "Alcohols (4): butan-1-ol, butan-2-ol, 2-methylpropan-1-ol, 2-methylpropan-2-ol.",
          "Ethers (3): methoxypropane \\(\\mathrm{CH_3OCH_2CH_2CH_3}\\), 2-methoxypropane \\(\\mathrm{CH_3OCH(CH_3)_2}\\), ethoxyethane \\(\\mathrm{CH_3CH_2OCH_2CH_3}\\).",
          "Total: 7 structural isomers.",
        ],
        answer: "7 (4 alcohols and 3 ethers)",
      },
      selfCheckExample: {
        prompt: "Which compound is a structural isomer of pentan-2-one?",
        options: [
          "Pentanal",
          "Pentan-2-ol",
          "Pentanoic acid",
          "2-methylbutane",
          "Cyclopentanone",
        ],
        steps: [
          "Pentan-2-one is \\(\\mathrm{CH_3COCH_2CH_2CH_3}\\), \\(\\mathrm{C_5H_{10}O}\\).",
          "Pentanal \\(\\mathrm{CH_3CH_2CH_2CH_2CHO}\\) is also \\(\\mathrm{C_5H_{10}O}\\): a functional group isomer.",
          "Pentan-2-ol is \\(\\mathrm{C_5H_{12}O}\\) (two more H). Pentanoic acid is \\(\\mathrm{C_5H_{10}O_2}\\) (one more O). 2-methylbutane has no O. Cyclopentanone is \\(\\mathrm{C_5H_8O}\\): the ring costs two H.",
        ],
        answer: "(A) Pentanal",
      },
      practiceSet: [
        { prompt: "How many structural isomers does \\(\\mathrm{C_5H_{12}}\\) have?", answer: "3", method: "Pentane, 2-methylbutane, 2,2-dimethylpropane" },
        { prompt: "Are ethanoic acid and methyl methanoate isomers?", answer: "Yes, both are \\(\\mathrm{C_2H_4O_2}\\)", method: "Acid and ester: functional group isomers" },
        { prompt: "Are cyclohexane and hex-2-ene isomers?", answer: "Yes, both are \\(\\mathrm{C_6H_{12}}\\)", method: "A ring and a C=C each remove 2 H" },
        { prompt: "Are \\(\\mathrm{CH_3CH_2CH_2CH_3}\\) and \\(\\mathrm{CH_3(CH_2)_2CH_3}\\) isomers?", answer: "No, they are the same molecule (butane)", method: "Same connections, written differently" },
      ],
      traps: [
        {
          title: "Isomers need not have similar physical properties",
          body: "The definition only requires the same molecular formula and a different structure. Ethanol boils at about 78 °C while its isomer dimethyl ether boils at about −24 °C. A statement that isomers must have similar properties is false.",
        },
        {
          title: "A formula with one oxygen and one degree of unsaturation is not only a carbonyl compound",
          body: "\\(\\mathrm{C_4H_8O}\\) can be butanal or butanone, but also an alcohol with a C=C (but-3-en-1-ol) or a ring (cyclobutanol), or a cyclic ether. Options that rule out the alcohol forget that a ring or C=C can supply the missing two hydrogens.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-org-cis-trans",
      name: "Cis/trans (geometric) isomerism around a C=C",
      intuition:
        "Groups on a single bond can spin round, but a double bond is locked by its π bond. So two groups on the carbons of a C=C can be fixed on the same side or on opposite sides. That gives two different molecules, but only if each carbon has two different things attached.",
      definition:
        "**Stereoisomers** have the same atoms bonded in the same order, but a different arrangement in space.\n" +
        "- **Cis/trans** (also called geometric or E/Z) isomerism needs **restricted rotation** (a C=C, or a ring) and **two different groups on each carbon** of the double bond.\n" +
        "- **Cis**: the matching groups on the same side. **Trans**: on opposite sides.\n" +
        "- If either carbon of the C=C carries two identical groups (two H, two \\(\\mathrm{CH_3}\\)), there is no cis/trans isomerism.\n" +
        "- Cis and trans isomers have different physical properties, such as boiling point and melting point.",
      table: {
        columns: ["Compound", "Groups on the two C=C carbons", "Cis/trans isomers?"],
        rows: [
          { cells: ["But-2-ene \\(\\mathrm{CH_3CH{=}CHCH_3}\\)", "H and \\(\\mathrm{CH_3}\\); H and \\(\\mathrm{CH_3}\\)", "Yes"] },
          { cells: ["But-1-ene \\(\\mathrm{CH_2{=}CHCH_2CH_3}\\)", "H and H; H and \\(\\mathrm{C_2H_5}\\)", "No: carbon 1 has two H"] },
          { cells: ["2-methylbut-2-ene \\(\\mathrm{(CH_3)_2C{=}CHCH_3}\\)", "\\(\\mathrm{CH_3}\\) and \\(\\mathrm{CH_3}\\); H and \\(\\mathrm{CH_3}\\)", "No: carbon 2 has two \\(\\mathrm{CH_3}\\)"] },
          { cells: ["1,2-dichloroethene \\(\\mathrm{CHCl{=}CHCl}\\)", "H and Cl; H and Cl", "Yes"] },
          { cells: ["1,1-dichloroethene \\(\\mathrm{CCl_2{=}CH_2}\\)", "Cl and Cl; H and H", "No"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of the following compounds can exist as cis and trans isomers?",
        options: [
          "Pent-1-ene",
          "Propene",
          "Pent-2-ene",
          "2-methylbut-2-ene",
          "Butane",
        ],
        steps: [
          "Pent-2-ene is \\(\\mathrm{CH_3CH{=}CHCH_2CH_3}\\): carbon 2 has H and \\(\\mathrm{CH_3}\\), carbon 3 has H and \\(\\mathrm{C_2H_5}\\). Both carbons have two different groups, so it has cis and trans forms.",
          "Pent-1-ene and propene have a \\(\\mathrm{CH_2{=}}\\) end with two H. 2-methylbut-2-ene has two \\(\\mathrm{CH_3}\\) on one carbon. Butane has no C=C and rotates freely.",
        ],
        answer: "(C) Pent-2-ene",
      },
      practiceSet: [
        { prompt: "Why is there no cis/trans isomerism around a C-C single bond?", answer: "The groups rotate freely about a single bond", method: "Only a π bond (or a ring) locks the geometry" },
        { prompt: "Does hex-3-ene have cis and trans forms?", answer: "Yes", method: "Each C=C carbon has H and \\(\\mathrm{C_2H_5}\\)" },
        { prompt: "In a cis isomer, where are the two matching groups?", answer: "On the same side of the double bond", method: "Trans means opposite sides" },
      ],
      traps: [
        {
          title: "A C=C is needed for cis/trans, but it is not enough",
          body: "Every alkene has a C=C, but only some have cis/trans isomers. If either double-bond carbon carries two identical groups, swapping sides gives the same molecule. Check both carbons separately.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-org-chirality",
      name: "Chirality: chiral carbons and optical isomers",
      intuition:
        "Your left and right hands are mirror images, but you cannot lay one exactly on top of the other. A carbon with four different groups is the same: it and its mirror image are two different molecules. They behave identically in almost every way, which is why they are hard to tell apart.",
      definition:
        "- A **chiral centre** (asymmetric carbon) is an sp³ carbon bonded to **four different groups**.\n" +
        "- A molecule with one chiral centre exists as two **enantiomers** (optical isomers): non-superimposable mirror images.\n" +
        "- Enantiomers have the **same** boiling point, melting point, density and solubility. They rotate **plane-polarised light** by the same angle in **opposite** directions.\n" +
        "- A 50:50 mixture of two enantiomers is a **racemic mixture** and shows no overall rotation.\n" +
        "- Enzymes are chiral, so they often act on only one enantiomer. All amino acids except glycine are chiral; proteins use the L forms.\n" +
        "- A molecule with \\(n\\) chiral centres has at most \\(2^n\\) stereoisomers.",
      formula: {
        label: "Maximum number of stereoisomers",
        latex: "N_{\\max} = 2^{n}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of chiral centres" },
          { symbol: "\\(N_{\\max}\\)", meaning: "upper limit; symmetric molecules can have fewer" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the chiral centres in 3-chlorobutan-2-ol, \\(\\mathrm{CH_3CH(OH)CH(Cl)CH_3}\\), and the maximum number of stereoisomers.",
        steps: [
          "Carbon 2 carries H, OH, \\(\\mathrm{CH_3}\\) and \\(\\mathrm{CH(Cl)CH_3}\\): four different groups, so it is chiral.",
          "Carbon 3 carries H, Cl, \\(\\mathrm{CH_3}\\) and \\(\\mathrm{CH(OH)CH_3}\\): also four different groups, chiral.",
          "The end carbons carry three H each and cannot be chiral.",
          "\\(n = 2\\), so at most \\(2^2 = 4\\) stereoisomers.",
        ],
        answer: "Two chiral centres (carbons 2 and 3); at most 4 stereoisomers",
      },
      selfCheckExample: {
        prompt: "Which of these alcohols contains a chiral carbon atom?",
        options: [
          "Propan-2-ol",
          "Pentan-3-ol",
          "2-methylpropan-2-ol",
          "Butan-2-ol",
          "Ethanol",
        ],
        steps: [
          "Butan-2-ol, \\(\\mathrm{CH_3CH(OH)CH_2CH_3}\\): carbon 2 has H, OH, \\(\\mathrm{CH_3}\\) and \\(\\mathrm{C_2H_5}\\). Four different groups: chiral.",
          "Propan-2-ol has two \\(\\mathrm{CH_3}\\) on the OH carbon. Pentan-3-ol has two \\(\\mathrm{C_2H_5}\\). 2-methylpropan-2-ol has three \\(\\mathrm{CH_3}\\). Ethanol's OH carbon has two H.",
          "Pentan-3-ol is the tempting one: the OH sits in the middle of the chain, but the two halves are identical.",
        ],
        answer: "(D) Butan-2-ol",
      },
      practiceSet: [
        { prompt: "Is glycine, \\(\\mathrm{H_2NCH_2COOH}\\), chiral?", answer: "No", method: "Its central carbon carries two H" },
        { prompt: "What is the maximum number of stereoisomers for a molecule with 3 chiral centres?", answer: "8", method: "\\(2^3\\)" },
        { prompt: "How do the boiling points of two enantiomers compare?", answer: "They are the same", method: "Enantiomers differ only in optical rotation and in reactions with other chiral molecules" },
        { prompt: "What does a racemic mixture do to plane-polarised light?", answer: "No overall rotation", method: "The two rotations cancel" },
      ],
      traps: [
        {
          title: "Enantiomers have the same physical properties",
          body: "Boiling point, melting point, density and solubility are identical for the two enantiomers. They differ only in the direction they rotate plane-polarised light and in how they interact with other chiral molecules, such as enzymes and receptors.",
        },
        {
          title: "A carbon in a double bond cannot be a chiral centre",
          body: "A chiral centre needs four different groups on four single bonds, so it must be sp³. A C=C or C=O carbon is joined to only three atoms and is never chiral.",
        },
      ],
    },
  ],
};

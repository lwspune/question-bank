import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_AP_NOMENCLATURE_NOTE: SubtopicNote = {
  subtopicName: "Nomenclature",
  title: "Classifying and Naming Alcohols, Phenols and Ethers",
  oneLineDefinition:
    "How alcohols, phenols and ethers are sorted into classes, and how each is named in the common system and the IUPAC system.",
  whyItMatters:
    "11 questions. One was set in a board paper: the structures and IUPAC names of all the isomers of C₃H₈O, with two uses of phenol (2014). The textbook adds drawing structures from IUPAC names and naming alcohols, a phenol and an ether from their structures.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccap-classes",
      name: "Classes of alcohols, phenols and ethers",
      intuition:
        "Everything in this chapter is a cousin of water. Replace one hydrogen of H₂O by an alkyl group and you get an alcohol; by a benzene ring and you get a phenol; replace both hydrogens and you get an ether. Once you can see which carbon carries the oxygen, and what that carbon is joined to, you can classify any compound in the chapter.",
      definition:
        "- **Alcohol:** a hydroxyl group, \\(-\\text{OH}\\), attached to a saturated carbon atom. **Phenol:** \\(-\\text{OH}\\) attached directly to a carbon of a benzene ring. **Aromatic alcohol:** \\(-\\text{OH}\\) in the side chain of an aromatic ring, as in \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{OH}\\).\n" +
        "- **Mono, di, tri and polyhydric:** one, two, three or more \\(-\\text{OH}\\) groups in the molecule.\n" +
        "- **Primary, secondary, tertiary (1°, 2°, 3°):** the carbon carrying \\(-\\text{OH}\\) is joined to one, two or three other carbon atoms.\n" +
        "- **Allylic and benzylic:** the \\(sp^3\\) carbon carrying \\(-\\text{OH}\\) is joined to a carbon-carbon double bond or to an aromatic ring. Each can be 1°, 2° or 3°. **Vinylic:** \\(-\\text{OH}\\) is on an \\(sp^2\\) carbon of the double bond itself.\n" +
        "- **Ethers** have an oxygen joined to two alkyl groups, two aryl groups or one of each: \\(\\text{R}-\\text{O}-\\text{R}'\\), \\(\\text{R}-\\text{O}-\\text{Ar}\\), \\(\\text{Ar}-\\text{O}-\\text{Ar}'\\). They are **symmetrical (simple)** when the two groups are the same and **unsymmetrical (mixed)** when they differ.\n" +
        "- An alcohol and an ether with the same molecular formula are **functional isomers**; two alcohols that differ only in where the \\(-\\text{OH}\\) sits are **position isomers**.\n" +
        "- **Uses of phenol** (the textbook's list): making phenol formaldehyde resin such as bakelite, and as an antiseptic in mouthwash, deodorants, air fresheners, calamine lotion and floor cleaners.",
      table: {
        columns: ["Class", "What decides it", "Example"],
        rows: [
          { cells: ["Monohydric, dihydric, trihydric", "One, two or three OH groups", "Ethanol; ethane-1,2-diol; propane-1,2,3-triol"] },
          {
            cells: ["Primary, secondary, tertiary alcohol", "Carbon with OH joined to one, two or three carbons", "Propan-1-ol (1°); propan-2-ol (2°); 2-methylpropan-2-ol (3°)"],
            pyqExampleId: "a6a7f6f0-23fa-412b-a93b-5b190cafd722",
            noteAmber: "Board 2014 asked for every isomer of C₃H₈O with its IUPAC name, and two uses of phenol.",
          },
          { cells: ["Allylic alcohol", "sp³ carbon with OH joined to a C=C", "Prop-2-en-1-ol, CH₂=CH-CH₂OH"] },
          { cells: ["Benzylic alcohol", "sp³ carbon with OH joined to a benzene ring", "Phenylmethanol, C₆H₅CH₂OH"] },
          { cells: ["Vinylic alcohol", "OH on an sp² carbon of a C=C", "Vinyl alcohol, CH₂=CH-OH"] },
          { cells: ["Phenol", "OH directly on a benzene ring carbon", "Phenol, C₆H₅OH"] },
          { cells: ["Symmetrical (simple) ether", "Both groups on oxygen the same", "CH₃-O-CH₃; C₆H₅-O-C₆H₅"] },
          { cells: ["Unsymmetrical (mixed) ether", "The two groups on oxygen differ", "CH₃-O-C₂H₅; C₆H₅-O-CH₃"] },
        ],
      },
      practiceSet: [
        { prompt: "Classify 2-methylpropan-2-ol as primary, secondary or tertiary, and give the reason.", answer: "Tertiary: the carbon carrying \\(-\\text{OH}\\) is joined to three other carbon atoms" },
        { prompt: "Is phenylmethanol, \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{OH}\\), a phenol?", answer: "No. Its \\(-\\text{OH}\\) is on a side-chain carbon, so it is an aromatic (benzylic) alcohol" },
        { prompt: "Classify methoxybenzene, \\(\\text{C}_6\\text{H}_5-\\text{O}-\\text{CH}_3\\), as a symmetrical or an unsymmetrical ether.", answer: "Unsymmetrical (mixed): one group is phenyl, the other methyl" },
        { prompt: "How many hydroxyl groups does a trihydric alcohol carry? Name one.", answer: "Three; propane-1,2,3-triol (glycerol)" },
      ],
      pyqExampleId: "a6a7f6f0-23fa-412b-a93b-5b190cafd722",
      traps: [
        {
          title: "Calling every aromatic hydroxy compound a phenol",
          body: "A phenol has \\(-\\text{OH}\\) on a ring carbon. If the \\(-\\text{OH}\\) is on a \\(-\\text{CH}_2-\\) outside the ring, as in phenylmethanol, the compound is an alcohol.",
        },
        {
          title: "Missing the ether in an isomer question",
          body: "When the board asks for all the isomers of a formula like \\(\\text{C}_n\\text{H}_{2n+2}\\text{O}\\), the ethers count too. Leaving out the ether loses a mark even when every alcohol is right.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccap-naming-alcohols",
      name: "Naming alcohols and phenols",
      intuition:
        "An IUPAC name is a set of instructions for drawing the molecule. Find the longest chain that holds the carbon carrying \\(-\\text{OH}\\), number it so that \\(-\\text{OH}\\) gets the smallest number, change the final 'e' of the alkane to 'ol', and add the branches in front with their numbers. Phenols are named on benzene, with the \\(-\\text{OH}\\) carbon as C-1.",
      definition:
        "- **Common names:** the name of the alkyl group followed by 'alcohol': methyl alcohol, isopropyl alcohol, tert-butyl alcohol.\n" +
        "- **Carbinol system:** the alcohol is seen as a derivative of methyl alcohol, called carbinol. Name the groups on the carbinol carbon in alphabetical order, then add 'carbinol': \\(\\text{CH}_3\\text{CH}_2\\text{OH}\\) is methyl carbinol.\n" +
        "- **IUPAC:** alcohols are **alkanols**. The 'e' of the parent alkane, alkene or alkyne is replaced by 'ol'. For two or more \\(-\\text{OH}\\) groups the 'e' is kept and di, tri are put before 'ol' with locants: ethane-1,2-diol.\n" +
        "- **Numbering:** give the carbon carrying \\(-\\text{OH}\\) the lowest number; with several \\(-\\text{OH}\\) groups, the lowest set of numbers.\n" +
        "- **Cyclic alcohols:** prefix 'cyclo' to the alkane and take the \\(-\\text{OH}\\) carbon as C-1: cyclobutanol, 2-ethylcyclopentanol.\n" +
        "- **Phenols:** the IUPAC name of phenol is benzenol, and 'phenol' is also accepted. Common names use ortho, meta, para; IUPAC uses 2-, 3-, 4-: o-cresol is 2-methylphenol, p-nitrophenol is 4-nitrophenol. Catechol, resorcinol and quinol are benzene-1,2-, 1,3- and 1,4-diol.",
      authoredExample: {
        prompt: "Write the IUPAC name of \\(\\text{CH}_3-\\text{CH}(\\text{CH}_3)-\\text{CH}_2-\\text{CH}(\\text{OH})-\\text{CH}_3\\) and classify the alcohol.",
        steps: [
          "Longest chain holding the \\(-\\text{OH}\\) carbon: five carbons, so the parent is pentane and the alcohol is a pentanol.",
          "Numbering from the right puts \\(-\\text{OH}\\) on C-2; from the left it would be on C-4. So number from the right. The methyl branch is then on C-4.",
          "Replace the 'e' of pentane by 'ol' and add the branch: 4-methylpentan-2-ol.",
          "The \\(-\\text{OH}\\) carbon is joined to two other carbons, so the alcohol is secondary.",
        ],
        answer: "4-Methylpentan-2-ol, a secondary alcohol",
      },
      selfCheckExample: {
        prompt: "Write the IUPAC name of tert-butyl alcohol, \\((\\text{CH}_3)_3\\text{C}-\\text{OH}\\), and its name in the carbinol system.",
        steps: [
          "Longest chain through the \\(-\\text{OH}\\) carbon: three carbons, with \\(-\\text{OH}\\) and a methyl group both on C-2.",
          "IUPAC name: 2-methylpropan-2-ol.",
          "The carbinol carbon carries three methyl groups: trimethyl carbinol.",
        ],
        answer: "2-Methylpropan-2-ol; trimethyl carbinol",
      },
      practiceSet: [
        { prompt: "Write the IUPAC name of resorcinol.", answer: "Benzene-1,3-diol" },
        { prompt: "Write the structure of propane-1,2-diol.", answer: "\\(\\text{HO}-\\text{CH}_2-\\text{CH}(\\text{OH})-\\text{CH}_3\\)" },
        { prompt: "Write the IUPAC name of isobutyl alcohol, \\((\\text{CH}_3)_2\\text{CH}-\\text{CH}_2-\\text{OH}\\).", answer: "2-Methylpropan-1-ol" },
        { prompt: "In naming a diol, is the final 'e' of the alkane dropped or kept?", answer: "Kept: ethane-1,2-diol, not ethan-1,2-diol" },
      ],
      pyqExampleId: "90ba5da0-b81d-4ffe-b560-67dcd118a5ef",
      traps: [
        {
          title: "Numbering from the wrong end",
          body: "The \\(-\\text{OH}\\) carbon must get the lowest number, even if a branch then gets a higher one. \\(\\text{CH}_3\\text{CH}(\\text{OH})\\text{CH}_2\\text{CH}_3\\) is butan-2-ol, never butan-3-ol.",
        },
        {
          title: "Dropping the 'e' in a diol",
          body: "Only a single \\(-\\text{OH}\\) replaces the 'e': propan-1-ol. With two or more, the 'e' stays: pentane-1,4-diol.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccap-naming-ethers",
      name: "Naming ethers",
      intuition:
        "Think of an ether as an alkane with an alkoxy group hanging on it. The bigger group is the parent alkane; the smaller group, together with the oxygen, becomes the prefix methoxy, ethoxy, propoxy. In the common system you just read out the two groups in alphabetical order and say 'ether'.",
      definition:
        "- **Common system:** name the two groups on the oxygen in alphabetical order and add 'ether': ethyl methyl ether. If both groups are the same, use 'di': dimethyl ether.\n" +
        "- **IUPAC system:** ethers are **alkoxyalkanes**. The larger group is the parent alkane; the smaller one is named as an alkoxy prefix with its locant: \\(\\text{CH}_3-\\text{CH}(\\text{OCH}_3)-\\text{CH}_3\\) is 2-methoxypropane.\n" +
        "- Alkoxy groups: methoxy \\(\\text{CH}_3\\text{O}-\\), ethoxy \\(\\text{C}_2\\text{H}_5\\text{O}-\\), n-propoxy, isopropoxy.\n" +
        "- Textbook examples: dimethyl ether is methoxymethane, ethyl methyl ether is methoxyethane, methyl n-propyl ether is 1-methoxypropane, anisole (methyl phenyl ether) is methoxybenzene, phenyl n-propyl ether is 1-propoxybenzene.",
      authoredExample: {
        prompt: "Write the common name and the IUPAC name of \\(\\text{C}_2\\text{H}_5-\\text{O}-\\text{CH}(\\text{CH}_3)_2\\).",
        steps: [
          "The groups on oxygen are ethyl (two carbons) and isopropyl (three carbons).",
          "Common name: groups in alphabetical order, then 'ether': ethyl isopropyl ether.",
          "IUPAC: the larger group, propane, is the parent. The ethoxy group sits on its middle carbon, C-2.",
          "IUPAC name: 2-ethoxypropane.",
        ],
        answer: "Ethyl isopropyl ether; 2-ethoxypropane",
      },
      selfCheckExample: {
        prompt: "Write the IUPAC name of \\(\\text{CH}_3-\\text{O}-\\text{CH}_2-\\text{CH}_2-\\text{CH}_3\\).",
        steps: ["The larger group has three carbons: propane is the parent.", "The methoxy group is on C-1: 1-methoxypropane."],
        answer: "1-Methoxypropane (methyl n-propyl ether)",
      },
      practiceSet: [
        { prompt: "Write the IUPAC name of anisole.", answer: "Methoxybenzene" },
        { prompt: "Write the common name of methoxymethane.", answer: "Dimethyl ether" },
        { prompt: "Name the alkoxy group \\(\\text{C}_2\\text{H}_5\\text{O}-\\).", answer: "Ethoxy" },
      ],
      pyqExampleId: "d701382b-8ea8-4447-b7e7-604c014b8a9b",
      traps: [
        {
          title: "Taking the smaller group as the parent",
          body: "In an alkoxyalkane the larger group is the parent. \\(\\text{CH}_3-\\text{O}-\\text{C}_2\\text{H}_5\\) is methoxyethane, not ethoxymethane.",
        },
      ],
    },
  ],
};

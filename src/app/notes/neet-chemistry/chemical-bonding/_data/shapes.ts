import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_CB_SHAPES_NOTE: SubtopicNote = {
  subtopicName: "VSEPR, Hybridisation and Shapes",
  title: "VSEPR, Hybridisation and Shapes",
  oneLineDefinition:
    "How electron pairs around a central atom fix a molecule's shape (VSEPR), the hybrid orbitals that match each shape, and how to count σ and π bonds.",
  whyItMatters:
    "Eight NEET questions from 2021 to 2026, the largest page of this chapter. Four match molecules to shapes (PCl₅, SF₆, BrF₅, BF₃, NH₃, XeF₄, BF₄⁻ and a square planar nickel complex) or ask which molecule has the most lone pair repulsion. Two use hybridisation: BF₃'s sp² boron with six electrons, and how the s-character of a carbon sets the strength of its C-H bond. Two count σ and π bonds, in 2024 and again in 2026.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchcb-vsepr",
      name: "VSEPR theory and the shapes of molecules",
      intuition:
        "Electron pairs around a central atom repel each other, so they spread out as far apart as they can. Count the pairs, bond pairs and lone pairs together, and that number fixes how they are arranged. The shape you name is then where the ATOMS are, so lone pairs count for the arrangement but are invisible in the shape's name. Lone pairs also repel more strongly than bond pairs, which squeezes the bond angles.",
      definition:
        "- Repulsion order: lone pair with lone pair > lone pair with bond pair > bond pair with bond pair.\n" +
        "- Total pairs 2: linear. 3: trigonal planar. 4: tetrahedral. 5: trigonal bipyramidal. 6: octahedral.\n" +
        "- Lone pairs take the place of atoms and change the name of the shape (see the table).\n" +
        "- In a trigonal bipyramid, lone pairs go to the equatorial positions, where they have more room.\n" +
        "- Bond angles fall as lone pairs are added: \\(\\text{CH}_4\\) 109.5°, \\(\\text{NH}_3\\) 107°, \\(\\text{H}_2\\text{O}\\) 104.5°.",
      table: {
        columns: ["Bond pairs and lone pairs", "Shape", "Examples"],
        rows: [
          { cells: ["3 bond, 0 lone", "Trigonal planar", "\\(\\text{BF}_3\\)"] },
          { cells: ["4 bond, 0 lone", "Tetrahedral", "\\(\\text{CH}_4\\), \\(\\text{NH}_4^+\\), \\(\\text{BF}_4^-\\)"] },
          { cells: ["3 bond, 1 lone", "Trigonal pyramidal", "\\(\\text{NH}_3\\)"] },
          { cells: ["2 bond, 2 lone", "Bent (angular)", "\\(\\text{H}_2\\text{O}\\)"] },
          { cells: ["5 bond, 0 lone", "Trigonal bipyramidal", "\\(\\text{PCl}_5\\)"] },
          { cells: ["4 bond, 1 lone", "See-saw", "\\(\\text{SF}_4\\)"] },
          { cells: ["3 bond, 2 lone", "T-shaped", "\\(\\text{ClF}_3\\)"] },
          { cells: ["2 bond, 3 lone", "Linear", "\\(\\text{XeF}_2\\)"] },
          { cells: ["6 bond, 0 lone", "Octahedral", "\\(\\text{SF}_6\\)"] },
          { cells: ["5 bond, 1 lone", "Square pyramidal", "\\(\\text{BrF}_5\\), \\(\\text{IF}_5\\)"], noteAmber: "NEET 2021, NEET 2024 and Re-NEET 2026 all matched BrF₅ with square pyramidal." },
          { cells: ["4 bond, 2 lone", "Square planar", "\\(\\text{XeF}_4\\)"] },
        ],
      },
      pyqExampleId: "dce153c3-65b4-4deb-8db9-cd7f34be8c68",
      selfCheckExample: {
        prompt: "Sulphur in SF₄ has four bond pairs and one lone pair. What is the shape of SF₄, and where does the lone pair sit?",
        steps: [
          "Five pairs in all: they are arranged as a trigonal bipyramid.",
          "The lone pair takes an equatorial position, leaving four atoms in a see-saw.",
        ],
        answer: "See-saw, with the lone pair in an equatorial position",
      },
      practiceSet: [
        { prompt: "What is the shape of ClF₃?", answer: "T-shaped" },
        { prompt: "How many lone pairs does xenon have in XeF₂?", answer: "3" },
        { prompt: "Which repulsion between electron pairs is the strongest: lone pair with lone pair, lone pair with bond pair, or bond pair with bond pair?", answer: "Lone pair with lone pair" },
        { prompt: "Why is the bond angle in H₂O smaller than in NH₃?", answer: "Water has two lone pairs on oxygen, ammonia only one, and lone pairs push the bonds closer together" },
      ],
      traps: [
        {
          title: "Count lone pairs, then name only the atoms",
          body: "\\(\\text{XeF}_2\\) has five electron pairs around Xe, but three are lone pairs, so the molecule is linear, not trigonal bipyramidal.",
        },
        {
          title: "Square pyramidal and square planar differ by one lone pair",
          body: "\\(\\text{BrF}_5\\) (one lone pair) is square pyramidal; \\(\\text{XeF}_4\\) (two lone pairs) is square planar. Both start from an octahedral arrangement.",
        },
        {
          title: "Most lone pairs, most lone pair repulsion",
          body: "Among \\(\\text{ClF}_3\\), \\(\\text{SF}_4\\), \\(\\text{IF}_5\\) and \\(\\text{XeF}_2\\), xenon in \\(\\text{XeF}_2\\) carries three lone pairs, the most, so the repulsion between lone pairs is greatest there.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchcb-hybridisation",
      name: "Hybridisation",
      intuition:
        "To explain shapes, the atomic orbitals of the central atom are pictured as mixing into a set of equal new orbitals, hybrid orbitals, that point in the right directions. The number of hybrid orbitals equals the number of orbitals mixed, and equals the number of electron pairs (bond pairs plus lone pairs) the atom must hold. More s in the mix (sp has 50%, sp³ only 25%) holds electrons closer to the nucleus.",
      definition:
        "- sp (2 pairs, linear, 180°): \\(\\text{BeCl}_2\\), the carbons of ethyne.\n" +
        "- sp² (3 pairs, trigonal planar, 120°): \\(\\text{BF}_3\\), \\(\\text{BCl}_3\\), the carbons of ethene and benzene.\n" +
        "- sp³ (4 pairs, tetrahedral, 109.5°): \\(\\text{CH}_4\\), \\(\\text{NH}_3\\), \\(\\text{H}_2\\text{O}\\).\n" +
        "- sp³d (5 pairs, trigonal bipyramidal): \\(\\text{PCl}_5\\). sp³d² (6 pairs, octahedral): \\(\\text{SF}_6\\).\n" +
        "- Hybrid orbitals form only σ bonds; π bonds come from unhybridised p orbitals.\n" +
        "- s-character: sp 50%, sp² 33%, sp³ 25%. A C-H bond is stronger the more s-character the carbon uses: sp > sp² > sp³.",
      table: {
        columns: ["Hybridisation", "Electron pairs", "Arrangement", "Example"],
        rows: [
          { cells: ["sp", "2", "Linear, 180°", "\\(\\text{BeCl}_2\\)"] },
          { cells: ["sp²", "3", "Trigonal planar, 120°", "\\(\\text{BF}_3\\)"], noteAmber: "NEET 2021: in BF₃ boron is sp² hybridised with six electrons around it." },
          { cells: ["sp³", "4", "Tetrahedral, 109.5°", "\\(\\text{CH}_4\\)"] },
          { cells: ["sp³d", "5", "Trigonal bipyramidal", "\\(\\text{PCl}_5\\)"] },
          { cells: ["sp³d²", "6", "Octahedral", "\\(\\text{SF}_6\\)"] },
        ],
      },
      pyqExampleId: "ee166202-c562-4e4a-8871-38a9cd397c5d",
      selfCheckExample: {
        prompt: "Which C-H bond is the strongest: one on a carbon of ethane, of ethene or of ethyne?",
        steps: [
          "The carbons are sp³ in ethane, sp² in ethene and sp in ethyne.",
          "More s-character holds the bonding electrons closer and makes the bond stronger.",
        ],
        answer: "The C-H bond of ethyne (sp carbon)",
      },
      practiceSet: [
        { prompt: "What is the hybridisation of phosphorus in PCl₅?", answer: "sp³d" },
        { prompt: "What percentage s-character does an sp² orbital have?", answer: "About 33%" },
        { prompt: "Do hybrid orbitals form π bonds?", answer: "No, only σ bonds" },
        { prompt: "What is the hybridisation of sulphur in SF₆?", answer: "sp³d²" },
      ],
      traps: [
        {
          title: "Lone pairs need hybrid orbitals too",
          body: "Count lone pairs when choosing the hybridisation: nitrogen in \\(\\text{NH}_3\\) is sp³ (three bonds and one lone pair), not sp².",
        },
        {
          title: "More s-character, stronger C-H bond",
          body: "An sp carbon forms a stronger C-H bond than an sp² carbon, which beats an sp³ carbon. Reversing the order is a common slip.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchcb-sigma-pi",
      name: "Sigma and pi bonds",
      intuition:
        "The first bond between two atoms is always a σ bond, made by orbitals overlapping head-on along the line joining the nuclei. A second or third bond between the same atoms can only form by side-on overlap of p orbitals, above and below that line: these are π bonds. So count σ bonds by counting every bonded pair once, then add π bonds for each double or triple bond.",
      definition:
        "- Single bond: 1 σ. Double bond: 1 σ + 1 π. Triple bond: 1 σ + 2 π.\n" +
        "- σ bonds come from head-on overlap and are stronger; π bonds from side-on overlap of p orbitals.\n" +
        "- Ethane: 7 σ, no π. Ethene: 5 σ and 1 π. Ethyne: 3 σ and 2 π. Methane: 4 σ.\n" +
        "- Between its two carbons, ethene has 1 σ + 1 π and ethyne 1 σ + 2 π.\n" +
        "- In the \\(\\text{C}_2\\) molecule the two carbons are joined by two π bonds and no σ bond (from MO theory).",
      table: {
        columns: ["Molecule", "σ bonds", "π bonds"],
        rows: [
          { cells: ["Ethane, \\(\\text{C}_2\\text{H}_6\\)", "7", "0"] },
          { cells: ["Ethene, \\(\\text{C}_2\\text{H}_4\\)", "5", "1"] },
          { cells: ["Ethyne, \\(\\text{C}_2\\text{H}_2\\)", "3", "2"] },
          { cells: ["Methane, \\(\\text{CH}_4\\)", "4", "0"] },
          { cells: ["\\(\\text{C}_2\\) molecule", "0", "2"], noteAmber: "NEET 2024: the bond between the two carbons of C₂ was matched with two π bonds." },
        ],
      },
      pyqExampleId: "7483e05c-01e7-4c87-bd89-428872f05f06",
      selfCheckExample: {
        prompt: "How many σ and π bonds are there in a molecule of hydrogen cyanide, H-C≡N?",
        steps: [
          "The H-C single bond: 1 σ.",
          "The C≡N triple bond: 1 σ and 2 π.",
        ],
        answer: "2 σ and 2 π",
      },
      practiceSet: [
        { prompt: "How many π bonds are there in a triple bond?", answer: "2" },
        { prompt: "How many σ bonds does ethane have?", answer: "7" },
        { prompt: "Which is stronger, a σ bond or a π bond between the same two atoms?", answer: "The σ bond" },
        { prompt: "How many σ and π bonds are there in CO₂, O=C=O?", answer: "2 σ and 2 π" },
      ],
      traps: [
        {
          title: "Count every C-H bond as a σ bond",
          body: "Ethene has 5 σ bonds, not 1: four C-H bonds plus the σ part of the C=C bond.",
        },
        {
          title: "C₂ is the odd one",
          body: "A double bond is normally one σ and one π. In the \\(\\text{C}_2\\) molecule both bonds are π bonds.",
        },
      ],
    },
  ],
};

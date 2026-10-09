import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_ORG_BONDING_NOTE: SubtopicNote = {
  subtopicName: "Carbon Bonding and Formulas",
  title: "How Carbon Bonds, and How We Write Organic Molecules",
  oneLineDefinition:
    "Carbon always makes four bonds; how many atoms it bonds to sets its hybridisation and shape, and every formula is a way of counting those atoms.",
  whyItMatters:
    "The 2025 paper asked for the hybridisation and shape of the carbons in benzene, and older papers asked for the molecular formula of a molecule drawn as a skeleton. Almost every other question in the chapter also needs you to turn a drawing or a condensed formula into atoms quickly.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-org-hybrid",
      name: "Carbon's four bonds and its hybridisation (sp³, sp², sp)",
      intuition:
        "A carbon atom has four electrons to share, so it always makes four bonds. Those bonds point as far apart as possible. If the carbon is joined to four atoms, they spread into a tetrahedron. A double or triple bond holds extra electrons between just two atoms, so fewer directions are used and the shape becomes flat or straight.",
      definition:
        "**Hybridisation** describes how carbon's outer orbitals mix before bonding. Count the atoms joined to the carbon:\n" +
        "- 4 atoms (all single bonds): **sp³**, tetrahedral, angles about 109.5°.\n" +
        "- 3 atoms (one double bond): **sp²**, trigonal planar, angles 120°.\n" +
        "- 2 atoms (a triple bond, or two double bonds): **sp**, linear, angle 180°.\n" +
        "- Every single bond is one **σ (sigma) bond**. A double bond is one σ plus one **π (pi) bond**; a triple bond is one σ plus two π bonds.\n" +
        "- Atoms can rotate freely about a single bond, but not about a double bond, because the π bond would break.",
      table: {
        columns: ["Hybridisation", "Atoms joined to the carbon", "Shape and bond angle", "Example"],
        rows: [
          {
            cells: [
              "\\(\\mathrm{sp^3}\\)",
              "4 (four single bonds: 4 σ)",
              "Tetrahedral, about 109.5°",
              "Both carbons of ethane \\(\\mathrm{CH_3CH_3}\\); the carbon of \\(\\mathrm{CH_4}\\)",
            ],
          },
          {
            cells: [
              "\\(\\mathrm{sp^2}\\)",
              "3 (one double bond: 3 σ and 1 π)",
              "Trigonal planar, 120°",
              "Both carbons of ethene \\(\\mathrm{CH_2{=}CH_2}\\); the C of a C=O group; every carbon of benzene",
            ],
          },
          {
            cells: [
              "\\(\\mathrm{sp}\\)",
              "2 (a triple bond, or two double bonds: 2 σ and 2 π)",
              "Linear, 180°",
              "Both carbons of ethyne \\(\\mathrm{HC{\\equiv}CH}\\); the carbon of \\(\\mathrm{CO_2}\\)",
            ],
          },
        ],
        caption: "Count atoms, not bonds: a carbon in a C=C still has four bonds, but it is joined to only three atoms, so it is sp².",
      },
      selfCheckExample: {
        prompt:
          "Propyne has the formula \\(\\mathrm{CH_3C{\\equiv}CH}\\). Reading from left to right, what is the hybridisation of its three carbon atoms?",
        options: [
          "\\(\\mathrm{sp^3}\\), \\(\\mathrm{sp^2}\\), \\(\\mathrm{sp^2}\\)",
          "\\(\\mathrm{sp}\\), \\(\\mathrm{sp}\\), \\(\\mathrm{sp}\\)",
          "\\(\\mathrm{sp^3}\\), \\(\\mathrm{sp^3}\\), \\(\\mathrm{sp}\\)",
          "\\(\\mathrm{sp^3}\\), \\(\\mathrm{sp}\\), \\(\\mathrm{sp}\\)",
          "\\(\\mathrm{sp^2}\\), \\(\\mathrm{sp}\\), \\(\\mathrm{sp}\\)",
        ],
        steps: [
          "The \\(\\mathrm{CH_3}\\) carbon is joined to 4 atoms (3 H and 1 C): \\(\\mathrm{sp^3}\\).",
          "Each carbon of the triple bond is joined to only 2 atoms: \\(\\mathrm{sp}\\), and both are \\(\\mathrm{sp}\\).",
          "Option A treats a triple bond like a double bond. Option B forgets that the methyl carbon has only single bonds. Option C gives the two ends of the same triple bond different hybridisations, which is impossible.",
        ],
        answer: "(D) \\(\\mathrm{sp^3}\\), \\(\\mathrm{sp}\\), \\(\\mathrm{sp}\\)",
      },
      practiceSet: [
        { prompt: "What is the hybridisation of the carbon in methanal, \\(\\mathrm{HCHO}\\)?", answer: "\\(\\mathrm{sp^2}\\)", method: "Joined to 3 atoms (2 H and the O of C=O)" },
        { prompt: "What is the H-C-C bond angle in ethyne?", answer: "180°", method: "Each carbon is sp, so the molecule is linear" },
        { prompt: "How many σ and how many π bonds are in ethene, \\(\\mathrm{CH_2{=}CH_2}\\)?", answer: "5 σ and 1 π", method: "4 C-H bonds and the σ part of C=C; the π is the second half of C=C" },
        { prompt: "Is the carbon in \\(\\mathrm{CO_2}\\) sp, sp² or sp³?", answer: "sp", method: "Joined to 2 atoms by two double bonds" },
      ],
      traps: [
        {
          title: "A double bond is one σ and one π, not two π bonds",
          body: "The first bond between two atoms is always σ. Only the second and third bonds are π. So a double bond has 1 σ + 1 π and a triple bond 1 σ + 2 π. Options that call a double bond two π bonds are wrong.",
        },
        {
          title: "Hybridisation follows the number of atoms joined, not the number of bonds",
          body: "Every carbon makes four bonds, so counting bonds tells you nothing. Count the atoms attached: 4 gives sp³, 3 gives sp², 2 gives sp.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-org-formulas",
      name: "Molecular, condensed and skeletal formulas, and counting the hydrogens",
      intuition:
        "Chemists draw the same molecule in several ways, from a full picture of every bond to a bare zigzag of lines. The shorter drawings hide the hydrogens on carbon, because you can always work them out: every carbon must end up with four bonds. Whatever is missing is hydrogen.",
      definition:
        "- **Molecular formula**: the number of each atom only, e.g. \\(\\mathrm{C_3H_8O}\\).\n" +
        "- **Condensed (structural) formula**: atoms carbon by carbon, e.g. \\(\\mathrm{CH_3CH_2CH_2OH}\\). Brackets show a branch: \\(\\mathrm{CH_3CH(CH_3)CH_3}\\).\n" +
        "- **Displayed formula**: every atom and every bond drawn.\n" +
        "- **Skeletal formula**: only the carbon skeleton as lines. Each corner and each line end is a carbon. Hydrogens on carbon are not drawn. Every other atom (O, N, Cl) is drawn, and so are the hydrogens on it (OH, \\(\\mathrm{NH_2}\\)).\n" +
        "- A ring drawn as a polygon has one carbon at each corner: a hexagon is six carbons.",
      formula: {
        label: "Hidden hydrogens on a skeletal carbon",
        latex: "n_{\\mathrm{H}} = 4 - (\\text{number of bonds drawn to that carbon})",
        symbols: [
          { symbol: "\\(n_{\\mathrm{H}}\\)", meaning: "hydrogens on that carbon" },
          { symbol: "bonds drawn", meaning: "a double line counts 2, a triple line counts 3" },
        ],
      },
      authoredExample: {
        prompt:
          "Write the molecular formula of the compound \\(\\mathrm{CH_3CH_2CH(OH)CH_2CHO}\\).",
        steps: [
          "Carbons: \\(\\mathrm{CH_3}\\), \\(\\mathrm{CH_2}\\), \\(\\mathrm{CH}\\), \\(\\mathrm{CH_2}\\), \\(\\mathrm{CHO}\\): 5 carbons.",
          "Hydrogens: \\(3 + 2 + 1 + 1\\ (\\text{on the OH}) + 2 + 1 = 10\\).",
          "Oxygens: one in OH and one in CHO: 2.",
          "Molecular formula \\(\\mathrm{C_5H_{10}O_2}\\).",
        ],
        answer: "\\(\\mathrm{C_5H_{10}O_2}\\)",
      },
      selfCheckExample: {
        prompt:
          "A skeletal formula shows a hexagon with only single bonds. From one corner of the hexagon a short line leads to OH. What is the molecular formula?",
        options: [
          "\\(\\mathrm{C_6H_{12}O}\\)",
          "\\(\\mathrm{C_6H_{11}O}\\)",
          "\\(\\mathrm{C_6H_{6}O}\\)",
          "\\(\\mathrm{C_6H_{14}O}\\)",
          "\\(\\mathrm{C_6H_{10}O}\\)",
        ],
        steps: [
          "Six corners: six carbons in a ring.",
          "Five ring carbons have two ring bonds each, so each carries \\(4 - 2 = 2\\) H: 10 H.",
          "The carbon holding OH has three bonds drawn, so it carries 1 H. Add the H of the OH: \\(10 + 1 + 1 = 12\\).",
          "Option B forgets the H on the oxygen. C treats the hexagon as a benzene ring, but there are no double bonds. D counts the molecule as an open chain, which has two more H than a ring.",
        ],
        answer: "(A) \\(\\mathrm{C_6H_{12}O}\\)",
      },
      practiceSet: [
        { prompt: "Give the molecular formula of \\(\\mathrm{CH_3COCH_2CH_3}\\).", answer: "\\(\\mathrm{C_4H_8O}\\)", method: "4 C; H: 3 + 2 + 3 = 8; one O" },
        { prompt: "Give the molecular formula of \\(\\mathrm{(CH_3)_3CCl}\\).", answer: "\\(\\mathrm{C_4H_9Cl}\\)", method: "Three methyls plus a central carbon with no H" },
        { prompt: "A skeletal formula is a zigzag line with four corners and ends in total, all single bonds. What is the compound?", answer: "Butane, \\(\\mathrm{C_4H_{10}}\\)", method: "Two end carbons with 3 H, two middle carbons with 2 H" },
        { prompt: "In a skeletal formula, a corner carbon has three lines drawn to it, all single. How many hydrogens does it carry?", answer: "1", method: "\\(4 - 3\\)" },
      ],
      traps: [
        {
          title: "The hydrogens you cannot see in a skeletal formula are still there",
          body: "A skeletal formula hides the hydrogens on carbon but shows the ones on O and N. Forgetting the hidden ones gives a formula short of hydrogen; forgetting the drawn OH hydrogen loses one more. Count carbon by carbon with \\(4 - \\text{bonds drawn}\\).",
        },
      ],
    },
  ],
};

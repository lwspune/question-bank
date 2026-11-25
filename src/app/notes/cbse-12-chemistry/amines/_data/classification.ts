import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_AM_CLASSIFICATION_NOTE: SubtopicNote = {
  subtopicName: "Classification",
  title: "Structure and Classification of Amines",
  oneLineDefinition:
    "Amines as derivatives of ammonia, their pyramidal shape, and primary, secondary and tertiary amines decided by how many carbon groups sit on the nitrogen.",
  whyItMatters:
    "8 questions, seven of them from board papers. The board asked you to pick the primary, the secondary or the tertiary amine from four formulas (three MCQs in 2024) and to classify two naphthylamines (2026). Three more rows here are about what the hydrogens on nitrogen do to boiling point and solubility: why primary amines boil higher than tertiary ones (2026), an assertion-reason item on trimethylamine and propan-1-amine (2025), and whether butan-1-amine or butan-1-ol dissolves better in water (2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcam-classes",
      name: "Primary, secondary and tertiary amines",
      intuition:
        "Start from ammonia, NH₃, and replace its hydrogen atoms one at a time with alkyl or aryl groups. One group gives a primary amine, two a secondary amine, three a tertiary amine. So to classify an amine, look only at the nitrogen and count the carbon groups joined to it. The carbon that carries the nitrogen does not matter, which is the opposite of the rule for alcohols.",
      definition:
        "- **Amines** are derivatives of ammonia in which one or more hydrogen atoms are replaced by alkyl or aryl groups.\n" +
        "- **Structure:** like ammonia, the nitrogen is trivalent and carries one unshared pair of electrons. Its orbitals are sp³ hybridised and the shape is **pyramidal**.\n" +
        "- The lone pair pushes the bonds together, so the C-N-C angle is less than 109.5°: it is 108° in trimethylamine.\n" +
        "- **Primary (1°):** one hydrogen of NH₃ replaced, RNH₂ or ArNH₂.\n" +
        "- **Secondary (2°):** two replaced, R-NH-R′. The two groups may be the same or different.\n" +
        "- **Tertiary (3°):** all three replaced, R₃N. No hydrogen is left on the nitrogen.\n" +
        "- An amine is **simple** when all the groups on nitrogen are the same and **mixed** when they are different.",
      formula: {
        label: "The three classes of amine",
        latex: "\\text{R-NH}_2\\ (1^\\circ) \\qquad \\text{R-NH-R}'\\ (2^\\circ) \\qquad \\text{R}_3\\text{N}\\ (3^\\circ)",
        symbols: [
          { symbol: "\\(\\text{R}, \\text{R}'\\)", meaning: "alkyl or aryl groups joined to the nitrogen" },
        ],
      },
      authoredExample: {
        prompt: "Classify CH₃CH₂CH(NH₂)CH₃, C₆H₅NHC₂H₅ and (CH₃)₂N-CH₂CH₃ as primary, secondary or tertiary amines.",
        steps: [
          "Count the carbon groups on the nitrogen, not on the carbon that holds it.",
          "\\(\\text{CH}_3\\text{CH}_2\\text{CH(NH}_2)\\text{CH}_3\\): the nitrogen carries one carbon group and two hydrogens, so it is primary, even though the carbon it sits on is a secondary carbon.",
          "\\(\\text{C}_6\\text{H}_5\\text{NHC}_2\\text{H}_5\\): a phenyl and an ethyl group on the nitrogen, one hydrogen left, so it is secondary.",
          "\\((\\text{CH}_3)_2\\text{N-CH}_2\\text{CH}_3\\): three groups and no hydrogen on the nitrogen, so it is tertiary (and mixed, since the groups differ).",
        ],
        answer: "Butan-2-amine is primary, N-ethylaniline is secondary and N,N-dimethylethanamine is tertiary",
      },
      selfCheckExample: {
        prompt: "Why is the C-N-C bond angle in trimethylamine smaller than the tetrahedral angle?",
        steps: [
          "The nitrogen is sp³ hybridised: three orbitals bond to carbon and the fourth holds the unshared pair.",
          "The lone pair repels the bonding pairs more strongly than they repel one another.",
          "So the bonds are pushed closer together than 109.5°.",
        ],
        answer: "The lone pair on nitrogen squeezes the bonds, so the angle is 108° instead of 109.5°",
      },
      practiceSet: [
        { prompt: "Is benzylamine, C₆H₅CH₂NH₂, a primary, secondary or tertiary amine?", answer: "Primary: only one carbon group (benzyl) is joined to the nitrogen" },
        { prompt: "Is (CH₃)₂NC₂H₅ a simple or a mixed amine?", answer: "Mixed: the groups on the nitrogen are not all the same" },
        { prompt: "Which class of amine has no hydrogen atom on its nitrogen?", answer: "Tertiary amines" },
      ],
      pyqExampleId: "494c5bde-f2d3-47c2-93a1-bd23a2219c12",
      traps: [
        {
          title: "Classifying by the carbon, as for alcohols",
          body: "(CH₃)₃C-NH₂ looks like a tertiary alcohol pattern, but its nitrogen carries one carbon group and two hydrogens: it is a primary amine. For amines, count the groups on the nitrogen.",
        },
        {
          title: "Forgetting that an aryl group counts",
          body: "In C₆H₅-NH-CH₃ the phenyl ring is one of the groups on nitrogen, so the amine is secondary, not primary.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcam-nh-count",
      name: "What the hydrogens on nitrogen decide",
      intuition:
        "The class of an amine tells you how many hydrogen atoms are left on its nitrogen: two, one or none. Those hydrogens are what one molecule uses to hydrogen bond to the nitrogen of its neighbour. More hydrogen bonding holds the liquid together more firmly, so it boils higher.",
      definition:
        "- Primary and secondary amines associate through **intermolecular hydrogen bonds** between the nitrogen of one molecule and the hydrogen of another.\n" +
        "- The association is **more in primary amines** (two hydrogens on N) than in secondary amines (one).\n" +
        "- **Tertiary amines** have no hydrogen on nitrogen, so they do not associate in this way.\n" +
        "- So for **isomeric** amines the boiling points run **primary > secondary > tertiary**.\n" +
        "- Oxygen (electronegativity 3.5) is more electronegative than nitrogen (3.0), so an alcohol forms stronger hydrogen bonds than an amine of the same chain: it boils higher and is more soluble in water.",
      table: {
        columns: ["Comparison", "Result", "Reason"],
        rows: [
          {
            cells: ["Primary and tertiary isomers", "The primary amine boils higher", "Two hydrogens on its nitrogen give intermolecular hydrogen bonds; the tertiary amine has none"],
          },
          {
            cells: ["Trimethylamine and propan-1-amine (both C₃H₉N)", "Propan-1-amine boils higher", "Primary amine with two N-H hydrogens; trimethylamine has no hydrogen on nitrogen"],
            pyqExampleId: "480132f9-6663-42c1-b5d3-7e62c6f7f4cf",
            noteAmber: "Board 2025 claimed the opposite order as the Assertion with a true Reason, so the answer was (D).",
          },
          {
            cells: ["Butan-1-amine and butan-1-ol in water", "Butan-1-ol is more soluble", "The O-H group forms stronger hydrogen bonds with water than the N-H group"],
            pyqExampleId: "53a3bce6-7d5c-4860-a1db-99ac55954313",
            noteAmber: "Board 2026 asked which of the two is more soluble in water.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "N-Methylpropan-1-amine and N,N-dimethylethanamine are isomers of C₄H₁₁N. Which boils higher? Give the reason.",
        steps: [
          "N-Methylpropan-1-amine is secondary: one hydrogen on its nitrogen.",
          "N,N-Dimethylethanamine is tertiary: no hydrogen on its nitrogen.",
          "Only the secondary amine can hydrogen bond to its neighbours, so more energy is needed to separate its molecules.",
        ],
        answer: "N-Methylpropan-1-amine, because its molecules are held together by hydrogen bonds and the tertiary amine's are not",
      },
      practiceSet: [
        { prompt: "Why can tertiary amines not form hydrogen bonds with one another?", answer: "No hydrogen atom is attached to their nitrogen" },
        { prompt: "Which forms more intermolecular hydrogen bonds, a primary or a secondary amine of the same formula?", answer: "The primary amine: it has two hydrogens on nitrogen, the secondary only one" },
        { prompt: "Which is more soluble in water, ethanol or ethanamine?", answer: "Ethanol: oxygen is more electronegative than nitrogen, so its hydrogen bonds with water are stronger" },
      ],
      pyqExampleId: "a9f32ba4-0db4-4795-8336-03909a692fe5",
      traps: [
        {
          title: "Using the order for amines that are not isomers",
          body: "Primary > secondary > tertiary holds for isomers, which have the same molar mass. A heavy tertiary amine can boil higher than a light primary one, so check the formulas first.",
        },
        {
          title: "Naming only one side",
          body: "In \"why do primary amines boil higher than tertiary amines\", say both halves: the primary amine has two N-H hydrogens and forms hydrogen bonds; the tertiary amine has no N-H and cannot.",
        },
      ],
    },
  ],
};

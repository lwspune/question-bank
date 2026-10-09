import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_BMO_LIPIDS_NOTE: SubtopicNote = {
  subtopicName: "Lipids",
  title: "Fatty Acids, Triglycerides, Phospholipids and Steroids",
  oneLineDefinition:
    "Lipids are non-polar molecules: triglycerides store energy, phospholipids build membranes, and steroids such as cholesterol have a ring structure with no fatty acids at all.",
  whyItMatters:
    "Lipid questions so far come from the older papers: the formula of a triglyceride (2021), the water involved in breaking up a phospholipid (2013), and which molecules carry carboxyl and hydroxyl groups (2019). They test the chemistry of the ester bond more than lists of facts.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-bmo-fatty-acids",
      name: "Fatty acids: saturated and unsaturated",
      intuition:
        "A fatty acid is a long chain of carbon and hydrogen with an acid group at one end. If every carbon in the chain holds as many hydrogens as it can, the chain is saturated and straight, and the molecules pack tightly into a solid fat. A carbon to carbon double bond puts a kink in the chain, the molecules pack loosely, and the fat is a liquid oil.",
      definition:
        "- A **fatty acid** is a hydrocarbon chain (usually 14 to 22 carbons) with a **carboxyl group** \\(\\mathrm{-COOH}\\) at one end. Saturated fatty acids have the formula \\(\\mathrm{C}_n\\mathrm{H}_{2n}\\mathrm{O_2}\\).\n" +
        "- **Saturated**: no C=C double bonds; straight chains; animal fats, solid at room temperature.\n" +
        "- **Unsaturated**: one (**monounsaturated**) or more (**polyunsaturated**) C=C double bonds; each double bond means two fewer H atoms; kinked chains; plant oils, liquid at room temperature.\n" +
        "- Most natural unsaturated fats are **cis**. **Trans** fats (mainly from industrial hydrogenation) have straighter chains and are linked to heart disease.\n" +
        "- **Glycerol**, the other building block of fats, is a three-carbon alcohol with three \\(\\mathrm{-OH}\\) groups and no carboxyl group.",
      table: {
        columns: ["Feature", "Saturated fatty acid", "Unsaturated fatty acid"],
        rows: [
          { cells: ["C=C double bonds", "None", "One or more"] },
          { cells: ["Shape of chain", "Straight", "Kinked at each cis double bond"] },
          { cells: ["State of the fat at room temperature", "Usually solid (butter, lard)", "Usually liquid (olive oil)"] },
          { cells: ["Hydrogen atoms for the same chain length", "The maximum possible", "Two fewer for each double bond"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which of these statements about an unsaturated fatty acid is/are correct? 1. Its chain contains at least one carbon to carbon double bond. 2. It has a carboxyl group. 3. It has more hydrogen atoms than a saturated fatty acid with the same number of carbon atoms.",
        options: ["1 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3", "3 only"],
        steps: [
          "Statement 1 is the definition of unsaturated. Correct.",
          "Statement 2: every fatty acid, saturated or not, has a carboxyl group. Correct.",
          "Statement 3 is backwards: each double bond removes two hydrogens, so the unsaturated one has fewer. Wrong.",
          "Option A forgets that the carboxyl group belongs to all fatty acids.",
        ],
        answer: "(B) 1 and 2 only",
      },
      practiceSet: [
        { prompt: "Why are plant oils usually liquid at room temperature?", answer: "Their unsaturated chains are kinked and cannot pack tightly" },
        { prompt: "A saturated fatty acid has 16 carbons. What is its formula?", answer: "\\(\\mathrm{C_{16}H_{32}O_2}\\)", method: "\\(\\mathrm{C}_n\\mathrm{H}_{2n}\\mathrm{O_2}\\)" },
        { prompt: "How many hydroxyl groups and how many carboxyl groups does glycerol have?", answer: "Three hydroxyl groups, no carboxyl group" },
      ],
      traps: [
        {
          title: "Unsaturated means fewer hydrogens, not more",
          body: "Saturated means saturated with hydrogen: the most H atoms the chain can hold. Each C=C double bond removes two hydrogen atoms. So an unsaturated fatty acid always has fewer hydrogens than the saturated one of the same length.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-bmo-triglycerides",
      name: "Triglycerides: ester bonds and their formula",
      intuition:
        "Each of glycerol's three OH groups reacts with the carboxyl group of one fatty acid. Each reaction is a condensation: it makes an ester bond and releases a water molecule. So a triglyceride is glycerol plus three fatty acids minus three waters, and digesting it with lipase puts three waters back.",
      definition:
        "- A **triglyceride** is one **glycerol** joined to **three fatty acids** by three **ester bonds**.\n" +
        "- An ester bond forms by condensation between an \\(\\mathrm{-OH}\\) group and a \\(\\mathrm{-COOH}\\) group: \\(\\mathrm{-COOH} + \\mathrm{HO-} \\rightarrow \\mathrm{-COO-} + \\mathrm{H_2O}\\).\n" +
        "- Forming one triglyceride releases **3** water molecules; full hydrolysis uses 3.\n" +
        "- Triglycerides are the body's main long-term **energy store** (about twice the energy per gram of carbohydrate or protein, because they carry so many C-H bonds and little oxygen). They also insulate and protect organs. They are insoluble, so they do not affect osmosis.",
      formula: {
        label: "Formula of a triglyceride",
        latex: "\\mathrm{C_3H_8O_3} + 3\\,(\\text{fatty acid}) - 3\\,\\mathrm{H_2O}",
        symbols: [
          { symbol: "\\(\\mathrm{C_3H_8O_3}\\)", meaning: "glycerol" },
          { symbol: "\\(3\\,\\mathrm{H_2O}\\)", meaning: "one water released per ester bond" },
        ],
      },
      authoredExample: {
        prompt:
          "Lauric acid is a saturated fatty acid, \\(\\mathrm{C_{12}H_{24}O_2}\\). What is the formula of the triglyceride made from glycerol \\((\\mathrm{C_3H_8O_3})\\) and three lauric acid molecules?",
        steps: [
          "Three fatty acids: \\(3 \\times \\mathrm{C_{12}H_{24}O_2} = \\mathrm{C_{36}H_{72}O_6}\\).",
          "Add glycerol: \\(\\mathrm{C_{39}H_{80}O_9}\\).",
          "Remove three waters \\((\\mathrm{H_6O_3})\\): \\(\\mathrm{C_{39}H_{74}O_6}\\).",
          "Check: a triglyceride always ends with 6 oxygens (two in each ester group).",
        ],
        answer: "\\(\\mathrm{C_{39}H_{74}O_6}\\)",
      },
      selfCheckExample: {
        prompt:
          "Palmitic acid has the formula \\(\\mathrm{C_{16}H_{32}O_2}\\). Glycerol is \\(\\mathrm{C_3H_8O_3}\\). What is the formula of the triglyceride formed from glycerol and three palmitic acid molecules?",
        options: [
          "\\(\\mathrm{C_{51}H_{104}O_9}\\)",
          "\\(\\mathrm{C_{51}H_{100}O_7}\\)",
          "\\(\\mathrm{C_{48}H_{90}O_3}\\)",
          "\\(\\mathrm{C_{51}H_{96}O_5}\\)",
          "\\(\\mathrm{C_{51}H_{98}O_6}\\)",
        ],
        steps: [
          "Glycerol plus three palmitic acids: \\(\\mathrm{C_3H_8O_3} + \\mathrm{C_{48}H_{96}O_6} = \\mathrm{C_{51}H_{104}O_9}\\).",
          "Three ester bonds release three waters: \\(\\mathrm{C_{51}H_{104}O_9} - \\mathrm{H_6O_3} = \\mathrm{C_{51}H_{98}O_6}\\).",
          "A removes no water, B removes two, D removes four, and C leaves out the glycerol.",
        ],
        answer: "(E) \\(\\mathrm{C_{51}H_{98}O_6}\\)",
      },
      practiceSet: [
        { prompt: "How many water molecules are released when one triglyceride is formed?", answer: "3" },
        { prompt: "Stearic acid is \\(\\mathrm{C_{18}H_{36}O_2}\\). Give the formula of the triglyceride made with three stearic acids.", answer: "\\(\\mathrm{C_{57}H_{110}O_6}\\)", method: "\\(\\mathrm{C_3H_8O_3} + \\mathrm{C_{54}H_{108}O_6} - \\mathrm{H_6O_3}\\)" },
        { prompt: "Which enzyme hydrolyses triglycerides, and what are the products?", answer: "Lipase; fatty acids and glycerol" },
        { prompt: "Name the bond between glycerol and a fatty acid.", answer: "An ester bond" },
      ],
      traps: [
        {
          title: "Triglycerides are joined by ester bonds, not glycosidic or peptide bonds",
          body: "Each name belongs to one class: glycosidic bonds in carbohydrates, peptide bonds in proteins, ester bonds in lipids, phosphodiester bonds in nucleic acids. Mixing them up is a favourite distractor.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bmo-phospholipids-steroids",
      name: "Phospholipids and steroids",
      intuition:
        "Swap one fatty acid of a triglyceride for a charged phosphate group and you get a molecule with a water-loving head and two water-fearing tails. In water these molecules turn their tails away from the water and form a double layer: the basis of every cell membrane. Steroids look nothing like this: they are four rings of carbon fused together.",
      definition:
        "- A **phospholipid** is glycerol joined to **two fatty acids** and one **phosphate group** (often carrying a small extra group such as choline). It is **amphipathic**: a **hydrophilic** head and two **hydrophobic** tails.\n" +
        "- In water, phospholipids form a **bilayer**, tails inwards. This is the basis of the **fluid mosaic** membrane.\n" +
        "- Breaking the simplest phospholipid into glycerol, two fatty acids and phosphate is hydrolysis of its three ester bonds (two to the fatty acids, one to the phosphate): it uses three water molecules and releases none.\n" +
        "- **Steroids** are lipids built from **four fused carbon rings**. They contain no fatty acids and no glycerol, and are not made by condensation of repeating units.\n" +
        "- **Cholesterol** sits among the phospholipids of animal membranes and regulates fluidity; it is also the starting material for steroid hormones (testosterone, oestrogen, cortisol), bile salts and vitamin D.\n" +
        "- **Waxes** (a long fatty acid joined to a long alcohol) waterproof leaves and insect cuticles.",
      table: {
        columns: ["Lipid", "Built from", "Key property", "Main role"],
        rows: [
          { cells: ["Triglyceride", "Glycerol + 3 fatty acids", "Non-polar, insoluble", "Energy store, insulation"] },
          { cells: ["Phospholipid", "Glycerol + 2 fatty acids + phosphate", "Amphipathic (polar head, non-polar tails)", "Membrane bilayer"] },
          { cells: ["Cholesterol (steroid)", "Four fused carbon rings", "Mostly non-polar, one OH group", "Membrane fluidity; makes steroid hormones"] },
          { cells: ["Wax", "Fatty acid + long-chain alcohol", "Very water-repellent", "Waterproofing of leaves and cuticles"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of the following lipids contains no fatty acids?",
        options: ["A triglyceride", "A phospholipid", "Cholesterol", "A wax", "Olive oil"],
        steps: [
          "Triglycerides (including oils such as olive oil), phospholipids and waxes are all made with fatty acids joined by ester bonds.",
          "Cholesterol is a steroid: a framework of four fused rings, with no fatty acid and no glycerol.",
        ],
        answer: "(C) Cholesterol",
      },
      practiceSet: [
        { prompt: "Which part of a phospholipid faces the water in a membrane?", answer: "The phosphate head (hydrophilic)" },
        { prompt: "How many fatty acids are in one phospholipid?", answer: "Two" },
        { prompt: "Name two kinds of molecule made in the body from cholesterol.", answer: "Steroid hormones (such as testosterone or cortisol) and bile salts (also vitamin D)" },
      ],
      traps: [
        {
          title: "Cholesterol contains no peptide bonds and no fatty acids",
          body: "Cholesterol is a steroid lipid made of fused rings. It is not a protein, so it has no peptide bonds, and it is not a fat, so it has no fatty acids or ester bonds in its ring frame. It is typical of animal membranes; plant membranes use related sterols instead.",
        },
      ],
    },
  ],
};

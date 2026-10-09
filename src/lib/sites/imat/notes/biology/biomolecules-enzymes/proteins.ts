import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_BMO_PROTEINS_NOTE: SubtopicNote = {
  subtopicName: "Proteins and Nucleic Acids",
  title: "Amino Acids, Protein Structure and Nucleotides",
  oneLineDefinition:
    "Proteins are chains of amino acids joined by peptide bonds and folded through four levels of structure; nucleic acids are chains of nucleotides joined by phosphodiester bonds.",
  whyItMatters:
    "This is the most asked part of the chapter. The older papers asked about the parts of an amino acid (2015, 2020), the bond that breaks in a dipeptide (2016), the levels of structure of haemoglobin and of an enzyme (2017, 2018) and which structures contain proteins (2013, 2018). The 2025 ministry paper asked where collagen is found.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-bmo-amino-acids",
      name: "The structure of an amino acid",
      intuition:
        "All amino acids share the same backbone: a central carbon holding an amino group, a carboxyl group and a hydrogen atom. The fourth position holds the R group, and that is the only part that changes. Twenty different R groups give twenty amino acids, and their different sizes, charges and polarities are what make each protein fold its own way.",
      definition:
        "- An **amino acid** has a central carbon (the **α-carbon**) bonded to an **amino group** \\(\\mathrm{-NH_2}\\), a **carboxyl group** \\(\\mathrm{-COOH}\\), a **hydrogen atom** and a variable **R group** (side chain).\n" +
        "- The part common to every amino acid is the α-carbon with its amino group, carboxyl group and H. Only the R group differs.\n" +
        "- The carboxyl group is the **acidic** group (it can lose \\(\\mathrm{H^+}\\)); the amino group is **basic** (it can gain \\(\\mathrm{H^+}\\)). At the pH of the body an amino acid carries both charges at once (a **zwitterion**).\n" +
        "- There are **20** amino acids in human proteins. **Essential** amino acids (nine in adults) cannot be made by the body and must come from food.\n" +
        "- Glycine has the simplest R group, a single H atom. Cysteine and methionine contain **sulfur**.",
      table: {
        columns: ["Part", "Formula", "Property"],
        rows: [
          { cells: ["Amino group", "\\(\\mathrm{-NH_2}\\)", "Basic; same in all amino acids"] },
          { cells: ["Carboxyl group", "\\(\\mathrm{-COOH}\\)", "Acidic; same in all amino acids"] },
          { cells: ["Hydrogen on the α-carbon", "\\(\\mathrm{-H}\\)", "Same in all amino acids"] },
          { cells: ["R group (side chain)", "Varies (H in glycine, \\(\\mathrm{CH_3}\\) in alanine)", "Decides polarity, charge and size; the only part that differs"] },
        ],
      },
      selfCheckExample: {
        prompt: "In which part of their structure do the 20 amino acids found in human proteins differ from one another?",
        options: [
          "The amino group",
          "The carboxyl group",
          "The central carbon atom",
          "The R group",
          "The hydrogen atom on the central carbon",
        ],
        steps: [
          "The central carbon with its amino group, carboxyl group and hydrogen is the same in every amino acid.",
          "Only the side chain, the R group, changes from one amino acid to another.",
        ],
        answer: "(D) The R group",
      },
      practiceSet: [
        { prompt: "Which group of an amino acid is acidic?", answer: "The carboxyl group, \\(\\mathrm{-COOH}\\)" },
        { prompt: "What is the R group of glycine?", answer: "A single hydrogen atom" },
        { prompt: "Name the element found in cysteine and methionine but in no other amino acid of human proteins.", answer: "Sulfur" },
      ],
      traps: [
        {
          title: "The R group can contain N, O or even its own COOH",
          body: "Some R groups carry extra amino, amide or carboxyl groups. When asked for the part common to all amino acids, choose the α-carbon with one amino group, one carboxyl group and one H, and treat everything else on that carbon as the R group.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-bmo-peptide-bond",
      name: "The peptide bond and the mass of a polypeptide",
      intuition:
        "The carboxyl group of one amino acid reacts with the amino group of the next. An OH and an H leave as water, and the carbon of the first is joined directly to the nitrogen of the second. Repeat this and you get a chain with a free amino group at one end and a free carboxyl group at the other.",
      definition:
        "- A **peptide bond** is the C-N bond between the carbon of one amino acid's carboxyl group and the nitrogen of the next amino acid's amino group: \\(\\mathrm{-CO-NH-}\\).\n" +
        "- It forms by **condensation** (one water released) on the **ribosome**, and is broken by **hydrolysis**, which splits exactly this C-N bond.\n" +
        "- Two amino acids make a **dipeptide**, many make a **polypeptide**. A chain has an **N-terminus** (free amino group) and a **C-terminus** (free carboxyl group).\n" +
        "- One chain of \\(n\\) amino acids has \\(n-1\\) peptide bonds. A protein of \\(k\\) separate chains with \\(n\\) amino acids in total has \\(n-k\\).\n" +
        "- **Proteases** (peptidases) are the enzymes that hydrolyse peptide bonds.",
      formula: {
        label: "Mass of a single polypeptide chain",
        latex: "M = n\\,\\bar{m} - 18\\,(n-1)",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of amino acids in the chain" },
          { symbol: "\\(\\bar{m}\\)", meaning: "average relative mass of the free amino acids" },
          { symbol: "\\(18\\)", meaning: "relative mass of one water molecule lost per peptide bond" },
        ],
      },
      authoredExample: {
        prompt:
          "Glycine \\((\\mathrm{C_2H_5NO_2}\\), relative mass 75) joins alanine \\((\\mathrm{C_3H_7NO_2}\\), relative mass 89) by a peptide bond. Give the formula and relative mass of the dipeptide.",
        steps: [
          "Add the two: \\(\\mathrm{C_5H_{12}N_2O_4}\\), mass \\(75 + 89 = 164\\).",
          "One peptide bond releases one water: subtract \\(\\mathrm{H_2O}\\) and 18.",
          "Dipeptide: \\(\\mathrm{C_5H_{10}N_2O_3}\\), relative mass \\(164 - 18 = 146\\).",
        ],
        answer: "\\(\\mathrm{C_5H_{10}N_2O_3}\\), relative mass 146",
      },
      selfCheckExample: {
        prompt:
          "A polypeptide is a single chain of 101 amino acids. The average relative mass of the free amino acids is 128 and water is 18. What is the relative mass of the polypeptide?",
        options: ["12 928", "11 128", "12 910", "11 110", "1 800"],
        steps: [
          "101 amino acids in one chain make 100 peptide bonds, so 100 waters are lost.",
          "\\(101 \\times 128 = 12\\,928\\); \\(100 \\times 18 = 1800\\); \\(12\\,928 - 1800 = 11\\,128\\).",
          "A ignores the water, C removes only one water, D removes 101 waters (one per amino acid), and E is the mass of the water alone.",
        ],
        answer: "(B) 11 128",
      },
      practiceSet: [
        { prompt: "How many peptide bonds are in a single chain of 250 amino acids?", answer: "249" },
        { prompt: "A protein has two chains of 120 amino acids each. How many peptide bonds does it have?", answer: "238", method: "\\(2 \\times 119\\)" },
        { prompt: "How many water molecules are needed to hydrolyse a 30-amino-acid peptide completely?", answer: "29" },
        { prompt: "Which two atoms does a peptide bond join?", answer: "The carbon of a carboxyl group and the nitrogen of an amino group" },
      ],
      traps: [
        {
          title: "Hydrolysis breaks the C-N peptide bond, not a bond inside an R group",
          body: "To split a dipeptide back into its two amino acids, the bond between the carbonyl carbon and the nitrogen of the next unit is broken by adding water. The C=O and N-H bonds next to it, and bonds in the R groups, stay as they are.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bmo-protein-structure",
      name: "The four levels of protein structure",
      intuition:
        "The amino acid sequence is like a string of beads. Hydrogen bonds along the backbone twist parts of the string into coils and pleats. Attractions between the R groups then fold the whole chain into one particular 3D shape. Some proteins also need several folded chains fitted together before they work.",
      definition:
        "- **Primary structure**: the sequence of amino acids, held by **peptide bonds**. It is coded by the gene and decides every higher level.\n" +
        "- **Secondary structure**: the **α-helix** and the **β-pleated sheet**, held by **hydrogen bonds** between the C=O and N-H groups of the backbone.\n" +
        "- **Tertiary structure**: the overall 3D folding of one chain, held by interactions between **R groups**: hydrogen bonds, **ionic bonds**, **disulfide bridges** (covalent S-S bonds between two cysteines) and **hydrophobic interactions**.\n" +
        "- **Quaternary structure**: two or more polypeptide chains held together, sometimes with a non-protein **prosthetic group**. Only proteins with more than one chain have it.\n" +
        "- The shape of an enzyme's **active site** depends on every level the protein has. If the active site is built from two chains, the quaternary level shapes it too.",
      table: {
        columns: ["Level", "What it is", "Held by", "Example"],
        rows: [
          { cells: ["Primary", "Sequence of amino acids", "Peptide bonds", "Any protein; one change can alter the whole fold (sickle cell haemoglobin)"] },
          { cells: ["Secondary", "α-helix or β-pleated sheet", "Hydrogen bonds in the backbone", "α-helices of keratin; β-sheets of silk"] },
          { cells: ["Tertiary", "3D fold of a single chain", "R-group bonds: hydrogen, ionic, disulfide, hydrophobic", "Myoglobin (one chain); many enzymes"] },
          { cells: ["Quaternary", "Several chains together", "The same R-group bonds, between chains", "Haemoglobin (four chains, each with a haem group); collagen (three chains)"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Myoglobin, the oxygen store in muscle, is a single polypeptide chain folded into a compact shape that contains several α-helices. Which levels of structure does myoglobin have?",
        options: [
          "Primary only",
          "Primary and secondary only",
          "Primary, secondary, tertiary and quaternary",
          "Tertiary only",
          "Primary, secondary and tertiary only",
        ],
        steps: [
          "It has a sequence (primary), α-helices (secondary) and a compact 3D fold (tertiary).",
          "It is one chain, so it has no quaternary structure. Option C is the answer for haemoglobin, which has four chains.",
        ],
        answer: "(E) Primary, secondary and tertiary only",
      },
      practiceSet: [
        { prompt: "Which type of bond holds an α-helix in shape?", answer: "Hydrogen bonds between backbone C=O and N-H groups" },
        { prompt: "Which amino acid forms disulfide bridges?", answer: "Cysteine" },
        { prompt: "Does haemoglobin have a quaternary structure?", answer: "Yes: four polypeptide chains" },
        { prompt: "Which level of structure is decided directly by the gene?", answer: "The primary structure (the sequence)" },
      ],
      traps: [
        {
          title: "A protein with a quaternary level still has all the lower levels",
          body: "Levels build on each other. A protein made of several chains has primary, secondary, tertiary and quaternary structure, never a quaternary structure with a level missing. A single-chain protein stops at tertiary.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bmo-protein-types",
      name: "Fibrous and globular proteins, where they act, and denaturation",
      intuition:
        "Long fibrous proteins are built to be strong and insoluble, like ropes and cables. Globular proteins are compact and soluble, built to carry, signal and catalyse. Both depend on their shape, and that shape is held mostly by weak bonds. Heat or the wrong pH breaks those weak bonds and the protein unfolds.",
      definition:
        "- **Fibrous proteins** (collagen, keratin, elastin) are long, insoluble and structural.\n" +
        "- **Globular proteins** (enzymes, haemoglobin, antibodies, insulin) are compact, soluble and do metabolic jobs.\n" +
        "- **Collagen** is the most abundant protein in mammals. It is secreted by cells and works **outside** them, in the extracellular matrix of skin, tendons, bone and cartilage.\n" +
        "- Proteins are part of membranes (channels and carriers), **ribosomes** (rRNA plus protein), **cilia** (microtubules of tubulin), **viruses** (the capsid), **antibodies** and **enzymes**. Amylose, triglycerides and cholesterol contain no protein.\n" +
        "- **Denaturation**: heat, extreme pH, heavy-metal ions or some solvents break the hydrogen bonds, ionic bonds and hydrophobic interactions that hold the 3D shape. The protein unfolds and loses its function. The **peptide bonds stay intact**, so the primary structure is unchanged. It is usually irreversible.\n" +
        "- The **biuret test** (turns purple) detects peptide bonds.",
      table: {
        columns: ["Protein", "Type", "Where it acts", "Function"],
        rows: [
          { cells: ["Collagen", "Fibrous", "Outside cells (extracellular matrix)", "Tensile strength of skin, tendon, bone"] },
          { cells: ["Keratin", "Fibrous", "Inside cells of skin, hair and nails", "Toughness, waterproofing"] },
          { cells: ["Haemoglobin", "Globular", "Inside red blood cells", "Carries oxygen"] },
          { cells: ["Antibodies", "Globular", "Blood plasma and body fluids", "Bind antigens"] },
          { cells: ["Myosin and actin", "Fibrous filaments", "Inside muscle cells", "Contraction (myosin thick filaments, actin thin filaments)"] },
        ],
      },
      selfCheckExample: {
        prompt: "When an egg white is boiled, its proteins are denatured. Which bonds in these proteins normally remain intact?",
        options: [
          "Peptide bonds",
          "Hydrogen bonds",
          "Ionic bonds between R groups",
          "Hydrophobic interactions",
          "The bonds that hold the α-helices in shape",
        ],
        steps: [
          "Denaturation breaks the weaker bonds that hold the 3D shape: hydrogen bonds (including those in the α-helices), ionic bonds and hydrophobic interactions.",
          "The covalent peptide bonds of the backbone survive, so the amino acid sequence is unchanged.",
        ],
        answer: "(A) Peptide bonds",
      },
      practiceSet: [
        { prompt: "Is collagen found mainly inside or outside cells?", answer: "Outside, in the extracellular matrix" },
        { prompt: "Name a protein found in the thick filaments of muscle.", answer: "Myosin" },
        { prompt: "Do ribosomes contain protein?", answer: "Yes: ribosomal RNA plus many proteins" },
        { prompt: "Which test turns purple in the presence of protein?", answer: "The biuret test" },
      ],
      traps: [
        {
          title: "Denaturation does not break peptide bonds",
          body: "A denatured protein has lost its shape, not its sequence. Breaking peptide bonds is hydrolysis, done by proteases or by boiling in strong acid for a long time, not by ordinary heating.",
        },
        {
          title: "Collagen is not a muscle filament",
          body: "Collagen is a fibrous protein outside cells, in connective tissue. The thick filaments in muscle are myosin and the thin ones actin.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bmo-nucleic-acids",
      name: "Nucleotides and nucleic acids in outline",
      intuition:
        "A nucleotide has three parts: a phosphate, a five-carbon sugar and a nitrogen-containing base. Condensation links the phosphate of one nucleotide to the sugar of the next, making a sugar-phosphate backbone with the bases sticking out. The order of the bases is the genetic information. The details of DNA and RNA belong to Molecular Biology.",
      definition:
        "- A **nucleotide** = **phosphate group** + **pentose sugar** + **nitrogenous base**.\n" +
        "- DNA uses **deoxyribose** and the bases A, T, G, C. RNA uses **ribose** and A, U, G, C.\n" +
        "- Nucleotides join by **condensation** into a strand held by **phosphodiester bonds** between the phosphate of one nucleotide and the sugar of the next.\n" +
        "- The two strands of DNA are held together by **hydrogen bonds** between paired bases (A with T, G with C).\n" +
        "- **ATP** is a nucleotide: adenine, ribose and three phosphate groups.\n" +
        "- Enzymes that copy nucleic acids (DNA polymerase, RNA polymerase, reverse transcriptase) all make phosphodiester bonds.",
      table: {
        columns: ["Feature", "DNA", "RNA"],
        rows: [
          { cells: ["Sugar", "Deoxyribose", "Ribose"] },
          { cells: ["Bases", "A, T, G, C", "A, U, G, C"] },
          { cells: ["Strands", "Two, in a double helix", "Usually one"] },
          { cells: ["Bond within a strand", "Phosphodiester", "Phosphodiester"] },
          { cells: ["Main location in a eukaryotic cell", "Nucleus (also mitochondria and chloroplasts)", "Nucleus, cytoplasm and ribosomes"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which bond links neighbouring nucleotides within one strand of DNA?",
        options: ["Glycosidic bond", "Peptide bond", "Phosphodiester bond", "Hydrogen bond", "Disulfide bridge"],
        steps: [
          "Within a strand, the phosphate of one nucleotide is joined to the sugar of the next: a phosphodiester bond.",
          "Hydrogen bonds join the two strands to each other, not the nucleotides along one strand. Peptide bonds and disulfide bridges belong to proteins, and glycosidic bonds join sugars.",
        ],
        answer: "(C) Phosphodiester bond",
      },
      practiceSet: [
        { prompt: "Name the three parts of a nucleotide.", answer: "A phosphate group, a pentose sugar and a nitrogenous base" },
        { prompt: "Which base is found in RNA but not in DNA?", answer: "Uracil" },
        { prompt: "Which sugar is in ATP?", answer: "Ribose" },
      ],
      traps: [
        {
          title: "Hydrogen bonds join the strands; phosphodiester bonds join the nucleotides",
          body: "The covalent phosphodiester bonds make the backbone of each strand. The weak hydrogen bonds between bases hold the two strands of DNA together and let them separate for copying.",
        },
      ],
    },
  ],
};

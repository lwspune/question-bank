import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_BM_POLYMERS_NOTE: SubtopicNote = {
  subtopicName: "Proteins, Polysaccharides and Nucleic Acids",
  title: "Proteins, Polysaccharides and Nucleic Acids",
  oneLineDefinition:
    "The three true biomacromolecules: proteins and their jobs, polysaccharides such as starch, cellulose and chitin, nucleic acids, the bonds that join their building blocks, and the four levels of protein structure.",
  whyItMatters:
    "Nine NEET questions from 2021 to 2026. The levels of protein structure were asked three times (NEET 2023, Re-NEET 2024 and NEET 2026), polysaccharides twice (NEET 2022 and NEET 2023), the jobs of proteins and other biomolecules three times (NEET 2022, NEET 2024 and Re-NEET 2026) and the bonds between monomers once (NEET 2021).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzobm-protein-roles",
      name: "Proteins and what they do",
      intuition:
        "A protein is a long chain of amino acids, like a necklace made from 21 kinds of bead. Because the beads differ, a protein is a heteropolymer. The order of the beads decides what the protein does: carry nutrients, fight germs, act as a hormone or speed up a reaction as an enzyme.",
      definition:
        "- **Proteins are polypeptides**: linear chains of amino acids linked by **peptide bonds**.\n" +
        "- Each protein is a polymer of amino acids. There are **21 types** of amino acid (alanine, cysteine, proline, tryptophan, lysine and others), so a protein is a **heteropolymer**, not a homopolymer.\n" +
        "- **Non-essential amino acids** are those our body can make. **Essential amino acids** must come from our **diet**: dietary proteins are their source.\n" +
        "- Proteins do many jobs: some **transport nutrients across the cell membrane**, some **fight infectious organisms**, some are **hormones** and some are **enzymes**.\n" +
        "- **Collagen** is the most abundant protein in the **animal world**. **RuBisCO** (ribulose bisphosphate carboxylase-oxygenase) is the most abundant protein in the **whole biosphere**.",
      table: {
        columns: ["Protein", "Function"],
        rows: [
          { cells: ["Collagen", "Intercellular ground substance"] },
          { cells: ["Trypsin", "Enzyme"] },
          { cells: ["Insulin", "Hormone"] },
          { cells: ["Antibody", "Fights infectious agents"] },
          { cells: ["Receptor", "Sensory reception (smell, taste, hormone)"] },
          { cells: ["GLUT-4", "Enables glucose transport into cells"] },
        ],
      },
      pyqExampleId: "66b8668e-5625-4c82-9b9d-6478d2397b3b",
      selfCheckExample: {
        prompt: "Collagen and RuBisCO are both called the most abundant protein. What is the difference between the two claims?",
        steps: [
          "Collagen is the most abundant protein in the animal world.",
          "RuBisCO, the enzyme that fixes carbon dioxide in plants, is the most abundant protein in the whole biosphere.",
        ],
        answer: "Collagen is the most abundant in the animal world; RuBisCO is the most abundant in the whole biosphere.",
      },
      practiceSet: [
        { prompt: "What is the function of trypsin, as listed in NCERT's table of proteins?", answer: "It is an enzyme" },
        { prompt: "What is the function of insulin, as listed in NCERT's table of proteins?", answer: "It is a hormone" },
        { prompt: "Why is a protein called a heteropolymer and not a homopolymer?", answer: "It is built from many different types of amino acid (21 types), not one" },
        { prompt: "From where must the body get its essential amino acids?", answer: "From the diet (dietary proteins)" },
        { prompt: "What is the function of collagen, as listed in NCERT's table of proteins?", answer: "Intercellular ground substance" },
      ],
      traps: [
        {
          title: "Two different most abundant proteins",
          body: "**Collagen** is the most abundant protein in the **animal world**; **RuBisCO** is the most abundant in the **whole biosphere**. Swapping the two is the usual false statement.",
        },
        {
          title: "Concanavalin A is a lectin",
          body: "**Concanavalin A** is a **lectin**, listed among the secondary metabolites. **GLUT-4** is the protein that lets **glucose into cells**, and the **antibody** fights infection.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobm-polysaccharides",
      name: "Polysaccharides: starch, glycogen, cellulose, inulin and chitin",
      intuition:
        "A polysaccharide is a long thread of sugars. Cellulose, starch and glycogen are all threads of glucose, but they are built and folded differently. Starch coils into helices that can trap iodine and turn blue. Cellulose has no such coils, so it stays colourless with iodine. Some polysaccharides are built from modified sugars instead, like the chitin of an insect's shell.",
      definition:
        "- **Polysaccharides are long chains of sugars**, threads with monosaccharides as building blocks.\n" +
        "- **Cellulose** is made of only one type of monosaccharide, **glucose**, so it is a **homopolymer**. Plant cell walls are made of cellulose; **paper** (from plant pulp) and **cotton fibre** are cellulosic.\n" +
        "- **Starch** is a variant of this that is the **store house of energy in plant tissues**. Animals have another variant, **glycogen**.\n" +
        "- **Inulin** is a polymer of **fructose**.\n" +
        "- In a polysaccharide chain such as glycogen, the **right end is the reducing end** and the **left end is the non-reducing end**. Glycogen has **branches**.\n" +
        "- **Starch forms helical secondary structures** and can hold **I₂ molecules** in its helical part. The **starch-iodine** complex is **blue**. **Cellulose does not have complex helices**, so it **cannot hold iodine**.\n" +
        "- More complex polysaccharides are built from **amino-sugars and chemically modified sugars** (for example **glucosamine** and **N-acetyl galactosamine**). The **exoskeleton of arthropods** has the complex polysaccharide **chitin**. These complex polysaccharides are **mostly homopolymers**.",
      table: {
        columns: ["Polysaccharide", "Monomer", "Where or what"],
        rows: [
          { cells: ["Cellulose", "Glucose", "Plant cell walls, paper, cotton fibre; no complex helices, so no colour with iodine"] },
          { cells: ["Starch", "Glucose", "Energy store in plant tissues; helices hold iodine and turn blue"] },
          { cells: ["Glycogen", "Glucose", "Energy store in animals; branched, with a reducing right end"] },
          { cells: ["Inulin", "Fructose", "A polymer of fructose"] },
          {
            cells: ["Chitin", "Amino-sugars (modified sugars)", "Exoskeleton of arthropods"],
            noteAmber: "NEET 2022: the exoskeleton of arthropods is made of chitin, not cellulose or cutin.",
            pyqExampleId: "d097ddae-9ab6-4bf6-a953-bc64ed17cf98",
          },
        ],
      },
      pyqExampleId: "9880af50-2518-4a2e-b346-fece8e6fb6e7",
      selfCheckExample: {
        prompt: "Paper and cotton fibre are both made of the same polysaccharide. Name it and the one monosaccharide it is built from.",
        steps: [
          "NCERT says paper made from plant pulp and cotton fibre are cellulosic.",
          "Cellulose is a homopolymer of a single monosaccharide, glucose.",
        ],
        answer: "Cellulose, built only from glucose.",
      },
      practiceSet: [
        { prompt: "Inulin is a polymer of which monosaccharide?", answer: "Fructose" },
        { prompt: "What is the storage polysaccharide of animals called?", answer: "Glycogen" },
        { prompt: "In a glycogen chain, is the right end the reducing or the non-reducing end?", answer: "The reducing end" },
        { prompt: "Name two modified sugars NCERT gives as building blocks of complex polysaccharides.", answer: "Glucosamine and N-acetyl galactosamine" },
        { prompt: "In which tissues does starch act as the store house of energy?", answer: "Plant tissues" },
      ],
      traps: [
        {
          title: "Inulin is fructose, not glucose",
          body: "**Cellulose, starch and glycogen** are all built from **glucose**. **Inulin** is a polymer of **fructose**.",
        },
        {
          title: "Cellulose fails the iodine test because it has no helices",
          body: "Starch turns blue because its **helices hold iodine**. Cellulose is a carbohydrate (a polysaccharide) but has **no complex helices**, so it **cannot hold iodine**.",
        },
        {
          title: "Chitin is the arthropod exoskeleton",
          body: "The exoskeleton of arthropods is the complex polysaccharide **chitin**, built from modified sugars. **Cellulose** is the plant cell wall; **cutin** is not a polysaccharide.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobm-nucleic-bonds",
      name: "Nucleic acids and the bonds that join monomers",
      intuition:
        "Every biomacromolecule is a chain of small units held by one kind of link. In a protein the link is a peptide bond, in a polysaccharide a glycosidic bond, and in a nucleic acid a phosphodiester bond. Most of these links form when water is removed as the two units join.",
      definition:
        "Nucleic acids:\n" +
        "- The building block of a nucleic acid is a **nucleotide**, which has **three parts**: a **heterocyclic compound** (the nitrogen base), a **monosaccharide** (the sugar) and **phosphoric acid or phosphate**.\n" +
        "- The bases are **adenine, guanine, uracil, cytosine and thymine**. Adenine and guanine are substituted **purines**; the rest are substituted **pyrimidines**.\n" +
        "- The sugar in a polynucleotide is either **ribose** (a pentose monosaccharide) or **2'-deoxyribose**. A nucleic acid with deoxyribose is **DNA**; one with ribose is **RNA**.\n\n" +
        "The bonds between monomers:\n" +
        "- **Peptide bond** (proteins): forms when the **carboxyl (-COOH) group** of one amino acid reacts with the **amino (-NH₂) group** of the next, with the **loss of a water molecule** (dehydration).\n" +
        "- **Glycosidic bond** (polysaccharides): links the monosaccharides, and also forms by dehydration, between two carbon atoms of neighbouring sugars.\n" +
        "- **Phosphodiester bond** (nucleic acids): a phosphate links the **3'-carbon** of the sugar of one nucleotide to the **5'-carbon** of the sugar of the next. The bond between the phosphate and the sugar's hydroxyl group is an **ester bond**; there is one on each side, hence **phospho-di-ester**.\n" +
        "- A **C=C double bond** is not a link between monomers: it is what makes a fatty acid **unsaturated**.",
      table: {
        columns: ["Molecule", "Monomer", "Bond or feature"],
        rows: [
          { cells: ["Protein", "Amino acid", "Peptide bond"] },
          { cells: ["Polysaccharide", "Monosaccharide", "Glycosidic bond"] },
          { cells: ["Nucleic acid", "Nucleotide", "Phosphodiester bond (3' carbon to 5' carbon)"] },
          { cells: ["Unsaturated fatty acid", "Not a polymer", "One or more C=C double bonds"] },
        ],
      },
      pyqExampleId: "0e9f6659-c36f-49b2-810c-bd5a3aa2f9ae",
      selfCheckExample: {
        prompt: "Why is the link between nucleotides in a nucleic acid called a phosphodiester bond, and not just an ester bond?",
        steps: [
          "The phosphate forms an ester bond with the hydroxyl group of the sugar.",
          "It does this on both sides: with the 3'-carbon of one sugar and the 5'-carbon of the next.",
        ],
        answer: "Because there is one ester bond on each side of the phosphate, two in all.",
      },
      practiceSet: [
        { prompt: "Name the three chemically distinct parts of a nucleotide.", answer: "A nitrogen base (heterocyclic compound), a sugar (monosaccharide) and a phosphate" },
        { prompt: "Which sugar does RNA contain?", answer: "Ribose" },
        { prompt: "Which sugar does DNA contain?", answer: "2'-deoxyribose" },
        { prompt: "Which two groups of neighbouring amino acids react to form a peptide bond, and what is lost?", answer: "The carboxyl group of one and the amino group of the next; a water molecule is lost" },
        { prompt: "In a nucleic acid, the phosphate links which carbon of one sugar to which carbon of the next sugar?", answer: "The 3'-carbon of one sugar to the 5'-carbon of the next" },
      ],
      traps: [
        {
          title: "Each polymer has its own bond",
          body: "**Proteins: peptide bonds. Polysaccharides: glycosidic bonds. Nucleic acids: phosphodiester bonds.** The C=C double bond belongs to **unsaturated fatty acids**, which are not polymers.",
        },
        {
          title: "Phosphodiester runs 3' to 5'",
          body: "The phosphate joins the **3'-carbon** of one sugar to the **5'-carbon** of the **next** sugar, not 5' to 5' or 3' to 3'.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobm-protein-structure",
      name: "The four levels of protein structure",
      intuition:
        "Think of a long wool thread. First, the order of colours along the thread (primary). Then parts of it twist into springs (secondary). Then the whole thread is wound into a ball (tertiary). Finally, a few separate balls are packed together into one unit (quaternary), the way haemoglobin is built from four chains.",
      definition:
        "- **Primary structure:** the **sequence of amino acids**, the positional information (which is first, which is second, and so on). A protein is imagined as a **line**: the **left end** is the **first amino acid**, the **N-terminal** amino acid, and the **right end** is the **last amino acid**, the **C-terminal** amino acid.\n" +
        "- **Secondary structure:** the thread is not a rigid rod. Some portions fold into a **helix** (like a revolving staircase); other regions fold into other forms. In proteins **only right-handed helices** are seen.\n" +
        "- **Tertiary structure:** the long chain folds upon itself like a **hollow woollen ball**, giving a **3-dimensional view**. It is **absolutely necessary** for many biological activities of proteins.\n" +
        "- **Quaternary structure:** some proteins are an **assembly of more than one polypeptide** (subunits). How the folded subunits are arranged with respect to each other (a linear string of spheres, spheres in a cube or a plate) is the quaternary structure.\n" +
        "- **Adult human haemoglobin** has **4 subunits**: **two of α type and two of β type**.",
      table: {
        columns: ["Level", "What it is", "Example"],
        rows: [
          {
            cells: ["Primary", "Sequence of amino acids, from N-terminal (first, left) to C-terminal (last, right)", "Any polypeptide chain"],
            noteAmber: "NEET 2023: a statement putting the C-terminal amino acid at the left (first) end was false.",
            pyqExampleId: "c2b03e82-3985-4c96-8d3f-c1d18e9ce791",
          },
          {
            cells: ["Secondary", "Parts of the thread folded into a helix or other forms", "Right-handed α-helix, β sheet"],
            noteAmber: "NEET 2026: the α-helix is secondary structure.",
            pyqExampleId: "57712c9a-9f01-4521-b38f-31107a1bbd7f",
          },
          { cells: ["Tertiary", "Chain folded on itself like a hollow woollen ball; a 3-D shape", "Needed for most biological activity"] },
          { cells: ["Quaternary", "Arrangement of two or more folded polypeptide subunits", "Adult human haemoglobin (2 α and 2 β)"] },
        ],
      },
      pyqExampleId: "8df1d15f-452e-4afc-8d8d-397050ac4756",
      selfCheckExample: {
        prompt: "A protein is written as a line of amino acids. At which end is the first amino acid written, and what is that amino acid called?",
        steps: [
          "NCERT imagines a protein as a line read from left to right.",
          "The first amino acid sits at the left end and is called the N-terminal amino acid; the last one, at the right end, is the C-terminal.",
        ],
        answer: "At the left end; it is the N-terminal amino acid.",
      },
      practiceSet: [
        { prompt: "Which handedness of helix is found in proteins?", answer: "Only right-handed helices" },
        { prompt: "How many subunits does adult human haemoglobin have, and how many of them are of the α type?", answer: "Four subunits, two of them α type (and two β type)" },
        { prompt: "Which level of protein structure does NCERT call absolutely necessary for many of its biological activities?", answer: "Tertiary structure" },
        { prompt: "What is the last amino acid of a protein chain called?", answer: "The C-terminal amino acid" },
      ],
      traps: [
        {
          title: "N-terminal is first, C-terminal is last",
          body: "The **left end** holds the **first** amino acid, the **N-terminal**; the **right end** holds the **last**, the **C-terminal**. A statement that swaps them is false.",
        },
        {
          title: "The α-helix is secondary, not tertiary",
          body: "The **α-helix and β sheet** are **secondary** structure. The **hollow woollen ball** is **tertiary**; a set of subunits such as **haemoglobin** is **quaternary**.",
        },
        {
          title: "Disulphide bonds go with tertiary structure",
          body: "NCERT does not name the bonds, but Re-NEET 2024 matched **tertiary structure** with **disulphide bonds**, the links that help hold the folded ball together. Primary structure is simply the **polypeptide chain** in sequence.",
        },
      ],
    },
  ],
};

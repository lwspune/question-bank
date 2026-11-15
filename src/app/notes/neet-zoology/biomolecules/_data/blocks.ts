import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_BM_BLOCKS_NOTE: SubtopicNote = {
  subtopicName: "Building Blocks and Metabolites",
  title: "Building Blocks and Metabolites",
  oneLineDefinition:
    "How a tissue is analysed for its chemicals, what primary and secondary metabolites are, and the small building blocks of life: amino acids, lipids, sugars, nitrogen bases and nucleotides.",
  whyItMatters:
    "Nine NEET questions from 2021 to 2026. Four are about lipids (NEET 2021, NEET 2022, NEET 2024 and Re-NEET 2024), and lecithin turns up in every one of the four. NEET 2026 asked two statement questions, one on amino acids and one on purines and other biomolecules, and a match question on metabolites. Re-NEET 2026 asked which elements make up most of the body by weight.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzobm-analysis",
      name: "Analysing a tissue, and primary and secondary metabolites",
      intuition:
        "To find out what a living tissue is made of, you grind it in a strong acid and filter it. The small molecules pass through the cloth and the big ones stay behind. Burning a tissue leaves ash, which holds the inorganic part. Animal cells carry one familiar set of small compounds, the primary metabolites. Plants, fungi and microbes make thousands more whose job in the organism we mostly do not know: the secondary metabolites.",
      definition:
        "Chemical analysis of a tissue:\n" +
        "- Grind a living tissue (a vegetable or a piece of liver) in **trichloroacetic acid** (\\(\\text{Cl}_3\\text{CCOOH}\\)) with a mortar and pestle to get a thick slurry, then strain it through cheesecloth or cotton.\n" +
        "- The **filtrate** is the **acid-soluble pool** (thousands of small organic compounds). The **retentate** is the **acid-insoluble fraction**.\n" +
        "- To find the **inorganic** part, burn the tissue: the **ash** holds inorganic elements such as **calcium and magnesium**. Inorganic compounds such as sulphate and phosphate are seen in the acid-soluble fraction.\n" +
        "- Carbon makes up **18.5%** of the human body but only **0.03%** of the earth's crust; oxygen is the largest share of both (65.0% of the body, 46.6% of the crust).\n\n" +
        "What the two fractions hold:\n" +
        "- The acid-soluble pool has compounds of molecular weight **18 to about 800 daltons**. These are the **micromolecules** (biomolecules under 1000 Da).\n" +
        "- The acid-insoluble fraction has only **four kinds** of organic compound: **proteins, nucleic acids, polysaccharides and lipids**. All except lipids weigh **ten thousand daltons and above**: these are the **macromolecules**.\n" +
        "- **Lipids** weigh no more than 800 Da, yet they land in the acid-insoluble fraction. Grinding breaks the cell membranes into pieces that form **water-insoluble vesicles**, and these separate out with the insoluble fraction. So lipids are not strictly macromolecules.\n" +
        "- In a cell, **water** is the most abundant chemical: **70 to 90%** of the cell. Proteins are 10 to 15%, nucleic acids 5 to 7%, carbohydrates 3%, lipids 2% and ions 1%.\n\n" +
        "Primary and secondary metabolites:\n" +
        "- The compounds found in animal tissues (amino acids, sugars, lipids, nucleotides and so on) are **primary metabolites**. They have **identifiable functions** and known roles in normal physiology.\n" +
        "- Plant, fungal and microbial cells hold thousands of other compounds: **secondary metabolites**. We do not yet know the role of all of them in the host, but many are **useful to human welfare** (rubber, drugs, spices, scents, pigments), and some have **ecological importance**.",
      table: {
        columns: ["Kind of secondary metabolite", "NCERT examples"],
        rows: [
          { cells: ["Pigments", "Carotenoids, anthocyanins"] },
          { cells: ["Alkaloids", "Morphine, codeine"] },
          { cells: ["Terpenoids", "Monoterpenes, diterpenes"] },
          { cells: ["Essential oils", "Lemon grass oil"] },
          { cells: ["Toxins", "Abrin, ricin"] },
          { cells: ["Lectins", "Concanavalin A"] },
          { cells: ["Drugs", "Vinblastin, curcumin"] },
          { cells: ["Polymeric substances", "Rubber, gums, cellulose"] },
        ],
      },
      pyqExampleId: "84fd8bf9-5006-4722-99fc-6a03fc36300f",
      selfCheckExample: {
        prompt: "A dry leaf is burnt completely. What is left behind, and what part of the leaf's chemistry does it show?",
        steps: [
          "Burning removes all the carbon compounds.",
          "What remains is ash, which holds the inorganic elements such as calcium and magnesium.",
        ],
        answer: "Ash, which shows the inorganic elements of the tissue.",
      },
      practiceSet: [
        { prompt: "Which acid is a living tissue ground in to separate its acid-soluble pool from its acid-insoluble fraction?", answer: "Trichloroacetic acid" },
        { prompt: "When a ground tissue is strained through cheesecloth, is the filtrate the acid-soluble pool or the acid-insoluble fraction?", answer: "The acid-soluble pool" },
        { prompt: "Abrin and ricin belong to which group of secondary metabolites?", answer: "Toxins" },
        { prompt: "Lipids weigh under 800 daltons. Why do they still come out with the acid-insoluble fraction?", answer: "Grinding breaks the cell membranes into water-insoluble vesicles, which separate with the insoluble fraction" },
        { prompt: "What is the most abundant chemical in a living cell, and about what share of the cell is it?", answer: "Water, 70 to 90%" },
      ],
      traps: [
        {
          title: "Lipids are not true macromolecules",
          body: "Lipids sit in the **acid-insoluble fraction**, but their molecular weight does **not exceed 800 Da**. They are there only because broken membranes form insoluble vesicles. The true macromolecules (10,000 Da and above) are **proteins, nucleic acids and polysaccharides**.",
        },
        {
          title: "Cellulose is in the secondary metabolite table",
          body: "NCERT lists **rubber, gums and cellulose** together as **polymeric substances** among secondary metabolites. **Concanavalin A** is listed there too, as a **lectin**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobm-amino-acids",
      name: "Amino acids",
      intuition:
        "Picture a carbon atom with four hands. Three hands always hold the same things: a hydrogen, an amino group and a carboxyl group. The fourth hand holds the R group, and the R group is what makes glycine different from alanine or serine. That is why NCERT calls amino acids substituted methanes.",
      definition:
        "- Amino acids carry an **amino group** and an **acidic (carboxyl) group** on the **same carbon**, the **α-carbon**, so they are called **α-amino acids**.\n" +
        "- They are **substituted methanes**. The four groups on the α-carbon are **hydrogen, carboxyl group, amino group and a variable R group**.\n" +
        "- Many amino acids exist, but those in proteins are of only **21 types**.\n" +
        "- Their chemical and physical properties come from the **amino, carboxyl and R** groups.\n" +
        "- By the number of amino and carboxyl groups, amino acids are **acidic, basic or neutral**. There are also **aromatic** amino acids.\n" +
        "- The **-NH₂ and -COOH groups are ionisable**, so in solutions of different pH the structure of an amino acid changes. The form that carries both charges is the **zwitterionic form**.",
      table: {
        columns: ["Group", "NCERT example", "What sets it apart"],
        rows: [
          { cells: ["R group is hydrogen", "Glycine", "The simplest R group"] },
          { cells: ["R group is methyl", "Alanine", "R group is CH₃"] },
          { cells: ["R group is hydroxy methyl", "Serine", "R group is CH₂OH"] },
          { cells: ["Acidic", "Glutamic acid", "More carboxyl groups than amino groups"] },
          { cells: ["Basic", "Lysine", "More amino groups than carboxyl groups"] },
          { cells: ["Neutral", "Valine", "Equal numbers of amino and carboxyl groups"] },
          { cells: ["Aromatic", "Tyrosine, phenylalanine, tryptophan", "Carry an aromatic ring in the R group"] },
        ],
      },
      pyqExampleId: "d5189fc4-da8c-4503-b6e9-0d9ea2d69238",
      selfCheckExample: {
        prompt: "Why does the structure of an amino acid change when it is put in solutions of different pH?",
        steps: [
          "An amino acid carries an amino group and a carboxyl group.",
          "Both groups are ionisable: they gain or lose a proton depending on the pH around them.",
        ],
        answer: "Because its -NH₂ and -COOH groups are ionisable, and how they ionise depends on the pH.",
      },
      practiceSet: [
        { prompt: "What is the R group of glycine?", answer: "A hydrogen atom" },
        { prompt: "What is the R group of alanine?", answer: "A methyl group" },
        { prompt: "How many types of amino acids occur in proteins?", answer: "21" },
        { prompt: "Name the three aromatic amino acids NCERT gives as examples.", answer: "Tyrosine, phenylalanine and tryptophan" },
        { prompt: "On which carbon atom of an α-amino acid are the amino and carboxyl groups attached?", answer: "The same carbon, the α-carbon" },
      ],
      traps: [
        {
          title: "Lysine is basic, glutamic acid is acidic",
          body: "NCERT's examples: **glutamic acid** is acidic, **lysine** is basic and **valine** is neutral. A statement calling lysine acidic is false.",
        },
        {
          title: "Serine is not aromatic",
          body: "Serine's R group is a **hydroxy methyl** group. The aromatic amino acids are **tyrosine, phenylalanine and tryptophan**.",
        },
        {
          title: "21 amino acids, not 20",
          body: "NCERT says the amino acids that occur in proteins are of **21 types**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobm-lipids",
      name: "Lipids: fatty acids, glycerides and phospholipids",
      intuition:
        "Lipids are the cell's oily molecules: they do not mix with water. The simplest are fatty acids, which are chains of carbons ending in a carboxyl group. Glycerol is a small three-carbon alcohol. Join fatty acids to glycerol and you get fats and oils. Add phosphorus and you get the phospholipids that build cell membranes.",
      definition:
        "- Lipids are **generally water insoluble** (they dissolve in some organic solvents). They could be **simple fatty acids**.\n" +
        "- A **fatty acid** has a **carboxyl group attached to an R group**. The R group could be a methyl (-CH₃), an ethyl (-C₂H₅) or a longer chain of -CH₂ groups (**1 to 19 carbons**).\n" +
        "- **Palmitic acid has 16 carbons** including the carboxyl carbon. **Arachidonic acid has 20 carbons** including the carboxyl carbon.\n" +
        "- **Saturated** fatty acids have **no double bond**. **Unsaturated** fatty acids have **one or more C=C double bonds**.\n" +
        "- **Glycerol** is another simple lipid: it is **trihydroxy propane**.\n" +
        "- Many lipids have both glycerol and fatty acids, with the fatty acids **esterified with glycerol**. These are **monoglycerides, diglycerides and triglycerides**.\n" +
        "- By melting point they are called **fats and oils**. Oils have a **lower melting point** (for example **gingelly oil**), so they stay as oil in winter.\n" +
        "- Some lipids have **phosphorus and a phosphorylated organic compound**: these are **phospholipids**, found in the **cell membrane**. **Lecithin** is one example.\n" +
        "- Some tissues, especially **neural tissues**, have lipids with more complex structures.",
      table: {
        columns: ["Lipid", "What it is", "NCERT detail"],
        rows: [
          {
            cells: ["Palmitic acid", "Fatty acid", "16 carbons, counting the carboxyl carbon"],
            noteAmber: "NEET 2021: palmitic acid 20 carbons and arachidonic acid 16 carbons were both false (they are 16 and 20).",
            pyqExampleId: "732814f4-556f-4b0d-999b-2a47f061ad2d",
          },
          { cells: ["Arachidonic acid", "Fatty acid", "20 carbons, counting the carboxyl carbon"] },
          { cells: ["Glycerol", "Simple lipid", "Trihydroxy propane"] },
          {
            cells: ["Glycerides (fats and oils)", "Fatty acids esterified with glycerol", "Mono-, di- and triglycerides; oils such as gingelly oil have a lower melting point"],
            noteAmber: "NEET 2022: gingelly oil stays liquid in winter, and esterifying a fatty acid with glycerol gives a monoglyceride.",
            pyqExampleId: "f3ec3295-2c1c-4517-a4a3-647d5e5ffe0d",
          },
          {
            cells: ["Lecithin", "Phospholipid", "Has phosphorus and a phosphorylated compound; found in the cell membrane"],
            noteAmber: "NEET 2024: lecithin is an example of a phospholipid.",
            pyqExampleId: "92abff20-5842-43a4-bf58-046599bf768d",
          },
        ],
      },
      pyqExampleId: "f6e7faeb-2f79-477c-ad90-37167ac24fa2",
      selfCheckExample: {
        prompt: "Fats and oils are both glycerides. Which property decides whether a glyceride is called a fat or an oil?",
        steps: [
          "NCERT names glycerides fats or oils by their melting point.",
          "An oil has a lower melting point, so it stays liquid even in winter.",
        ],
        answer: "Its melting point: oils have a lower melting point than fats.",
      },
      practiceSet: [
        { prompt: "How many carbon atoms does palmitic acid have, counting the carboxyl carbon?", answer: "16" },
        { prompt: "What is the chemical name NCERT gives for glycerol?", answer: "Trihydroxy propane" },
        { prompt: "A fatty acid has one C=C double bond in its chain. Is it saturated or unsaturated?", answer: "Unsaturated" },
        { prompt: "Which kind of tissue has lipids with more complex structures, according to NCERT?", answer: "Neural tissue" },
        { prompt: "What three kinds of glyceride can form when fatty acids are esterified with glycerol?", answer: "Monoglycerides, diglycerides and triglycerides" },
      ],
      traps: [
        {
          title: "Saturated means no double bond",
          body: "A **saturated** fatty acid has only single bonds; an **unsaturated** one has **one or more C=C double bonds**. Calling a single-bond fatty acid unsaturated is the usual false statement.",
        },
        {
          title: "Palmitic 16, arachidonic 20",
          body: "**Palmitic acid has 16 carbons** and **arachidonic acid has 20**, both counting the carboxyl carbon. Questions swap the two numbers.",
        },
        {
          title: "Lecithin is a phospholipid",
          body: "**Lecithin** is a **phospholipid** in the cell membrane. It is **not a glycolipid**, not a glyceride and not a fatty acid.",
        },
        {
          title: "Amino acids with acid in the name are not fatty acids",
          body: "**Glutamic acid** and **aspartic acid** are **amino acids**. The fatty acids in NCERT are **palmitic acid** and **arachidonic acid**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobm-bases",
      name: "Sugars, nitrogen bases, nucleosides and nucleotides",
      intuition:
        "Some carbon compounds in cells have rings that contain nitrogen. These are the nitrogen bases. A base on its own is the smallest unit. Join it to a sugar and it becomes a nucleoside. Add a phosphate to that sugar and it becomes a nucleotide, the building block of DNA and RNA.",
      definition:
        "- Living things have many carbon compounds with **heterocyclic rings**. Some of these are the **nitrogen bases**: **adenine, guanine, cytosine, uracil and thymine**.\n" +
        "- **Adenine and guanine** are **substituted purines**. **Cytosine, uracil and thymine** are **substituted pyrimidines**.\n" +
        "- A nitrogen base attached to a **sugar** is a **nucleoside**: adenosine, guanosine, thymidine, uridine and cytidine.\n" +
        "- If a **phosphate group** is also esterified to the sugar, it is a **nucleotide**: adenylic acid, guanylic acid, thymidylic acid, uridylic acid and cytidylic acid.\n" +
        "- Nucleic acids like **DNA and RNA consist of nucleotides only**, and they work as the **genetic material**.\n" +
        "- Sugars (carbohydrates) among the small biomolecules include **glucose** and **ribose**.",
      table: {
        columns: ["Base", "Ring type", "Nucleoside", "Nucleotide"],
        rows: [
          { cells: ["Adenine", "Purine", "Adenosine", "Adenylic acid"] },
          { cells: ["Guanine", "Purine", "Guanosine", "Guanylic acid"] },
          { cells: ["Cytosine", "Pyrimidine", "Cytidine", "Cytidylic acid"] },
          { cells: ["Uracil", "Pyrimidine", "Uridine", "Uridylic acid"] },
          { cells: ["Thymine", "Pyrimidine", "Thymidine", "Thymidylic acid"] },
        ],
      },
      pyqExampleId: "71ceca52-bcf6-4509-ac58-425559fe98b2",
      selfCheckExample: {
        prompt: "Of adenosine and adenylic acid, which is the nucleoside and which is the nucleotide, and what extra group does the nucleotide carry?",
        steps: [
          "A nucleoside is a nitrogen base joined to a sugar.",
          "A nucleotide also has a phosphate group esterified to that sugar.",
        ],
        answer: "Adenosine is the nucleoside; adenylic acid is the nucleotide, which also carries a phosphate group.",
      },
      practiceSet: [
        { prompt: "What is a nitrogen base called when it is attached to a sugar?", answer: "A nucleoside" },
        { prompt: "What is the nucleoside of uracil called?", answer: "Uridine" },
        { prompt: "What is the nucleotide of cytosine called?", answer: "Cytidylic acid" },
        { prompt: "Name the five nitrogen bases NCERT lists.", answer: "Adenine, guanine, cytosine, uracil and thymine" },
      ],
      traps: [
        {
          title: "Purines are A and G",
          body: "**Adenine and guanine** are **substituted purines**. **Cytosine, uracil and thymine** are **substituted pyrimidines**. A statement putting adenine among the pyrimidines is false.",
        },
        {
          title: "A nucleoside has no phosphate",
          body: "Base plus sugar is a **nucleoside** (adenosine). Base plus sugar plus **phosphate** is a **nucleotide** (adenylic acid).",
        },
      ],
    },
  ],
};

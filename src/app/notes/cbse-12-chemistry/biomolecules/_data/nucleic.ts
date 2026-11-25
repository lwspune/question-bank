import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_BM_NUCLEIC_NOTE: SubtopicNote = {
  subtopicName: "Nucleic Acids",
  title: "Nucleic Acids: Nucleotides, DNA and RNA",
  oneLineDefinition:
    "What nucleic acids are made of, how a nucleoside differs from a nucleotide, the phosphodiester linkage, the double helix with its complementary strands, and the structural and functional differences between DNA and RNA.",
  whyItMatters:
    "28 questions, and twenty-one of them come from board papers, in every year from 2023 to 2026. The board asks the difference between a nucleoside and a nucleotide, the products of hydrolysis of a DNA nucleotide containing thymine, the linkage that joins nucleotides, two differences between DNA and RNA, the base found in only one of them, and why the two strands of DNA are complementary. These are one to three-mark answers: name the sugar, the bases and the strands exactly.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcbm-nucleotide",
      name: "Nucleosides, nucleotides and the phosphodiester linkage",
      intuition:
        "A nucleic acid is a long chain, and each link of the chain has three parts: a base, a sugar and a phosphate. Base plus sugar is a nucleoside. Add the phosphate and it becomes a nucleotide. The phosphate is what lets one link hold on to the next.",
      definition:
        "- Nucleic acids are long-chain polymers of **nucleotides**, so they are also called **polynucleotides**. They are of two types: deoxyribonucleic acid (**DNA**) and ribonucleic acid (**RNA**).\n" +
        "- **Complete hydrolysis** of DNA or RNA gives a **pentose sugar**, **phosphoric acid** and nitrogen-containing heterocyclic compounds called **bases**.\n" +
        "- The sugar in DNA is **β-D-2-deoxyribose**; in RNA it is **β-D-ribose**.\n" +
        "- **Nucleoside:** a unit formed by the attachment of a **base to the 1′ position of the sugar**. The sugar carbons are numbered 1′, 2′, 3′ to tell them apart from the atoms of the base.\n" +
        "- **Nucleotide:** a nucleoside linked to **phosphoric acid at the 5′ position** of the sugar.\n" +
        "- Nucleotides are joined by a **phosphodiester linkage** between the **5′ and 3′ carbon atoms** of the pentose sugar.\n" +
        "- The sequence of nucleotides in the chain is the **primary structure** of a nucleic acid.",
      table: {
        columns: ["Point", "Nucleoside", "Nucleotide"],
        rows: [
          { cells: ["Components", "Base + pentose sugar", "Base + pentose sugar + phosphoric acid"] },
          { cells: ["How it is formed", "Base attached at the 1′ position of the sugar", "Nucleoside linked to phosphoric acid at the 5′ position"] },
          {
            cells: ["Place in a nucleic acid", "Part of each repeating unit", "The repeating unit, joined by phosphodiester linkages"],
            noteAmber: "Board 2025 MCQ: nucleotides are joined together by the phosphodiester linkage.",
            pyqExampleId: "76116ef4-03c0-4ac0-bd86-a5f85a563edb",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Name the linkage that joins nucleotides in a nucleic acid chain, and say which carbon atoms of the sugar it connects.",
        steps: [
          "Nucleotides are joined through a phosphate group bonded to two sugars: a phosphodiester linkage.",
          "It joins the 5′ carbon of one pentose sugar to the 3′ carbon of the next.",
        ],
        answer: "Phosphodiester linkage, between the 5′ and 3′ carbon atoms of the pentose sugar",
      },
      practiceSet: [
        { prompt: "What is a nucleoside?", answer: "A unit formed when a base is attached to the 1′ position of a pentose sugar" },
        { prompt: "Name the sugar present in DNA and the sugar present in RNA.", answer: "β-D-2-deoxyribose in DNA; β-D-ribose in RNA" },
        { prompt: "What is meant by the primary structure of a nucleic acid?", answer: "The sequence of nucleotides in its chain" },
      ],
      pyqExampleId: "ea6c978f-65ab-49cd-a45e-aae893f981d2",
      traps: [
        {
          title: "Nucleoside has no phosphate",
          body: "Nucleoside = base + sugar; nucleotide = base + sugar + phosphate. The 2024 MCQ on what nucleotides are made of offered the two-part nucleoside as a wrong option.",
        },
        {
          title: "Polymers of nucleotides, not nucleosides",
          body: "Nucleic acids are polymers of nucleotides. Nucleosides lack the phosphate that links the chain, so \"nucleosides\" is the trap option.",
        },
        {
          title: "DNA has deoxyribose",
          body: "Hydrolysis of a DNA nucleotide gives β-D-2-deoxyribose, not ribose. Ribose belongs to RNA.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcbm-dnarna",
      name: "DNA and RNA: structure and functions",
      intuition:
        "DNA is the master copy of a cell's instructions, kept safe in two strands and copied whenever the cell divides. RNA is the working copy that the cell uses to build proteins. They differ in their sugar, in one base and in the number of strands.",
      definition:
        "- The particles in the nucleus responsible for heredity, the **chromosomes**, are made of proteins and nucleic acids.\n" +
        "- **DNA** contains adenine (A), guanine (G), cytosine (C) and **thymine (T)**. **RNA** contains the first three and **uracil (U)** in place of thymine.\n" +
        "- **DNA** is a **double-strand helix** (Watson and Crick). In **RNA** a **single-stranded helix** is present, which sometimes folds back on itself.\n" +
        "- RNA molecules are of **three types**: messenger RNA (m-RNA), ribosomal RNA (r-RNA) and transfer RNA (t-RNA).\n" +
        "- **Functions:** DNA is the **chemical basis of heredity** and the reserve of genetic information; it maintains the identity of species over millions of years. DNA is capable of **self-duplication** during cell division, and identical DNA strands pass to the daughter cells.\n" +
        "- The other important function of nucleic acids is **protein synthesis**: proteins are made by the RNA molecules in the cell, but the message for a particular protein is present in DNA.",
      table: {
        columns: ["Point", "DNA", "RNA"],
        rows: [
          { cells: ["Sugar", "β-D-2-deoxyribose", "β-D-ribose"] },
          {
            cells: ["Bases", "Adenine, guanine, cytosine, thymine", "Adenine, guanine, cytosine, uracil"],
            noteAmber: "Board 2026 MCQ: thymine is the base present in DNA but not in RNA.",
            pyqExampleId: "3afb745b-d568-4d44-871c-ea1ec0631e7e",
          },
          { cells: ["Strands", "Double-strand helix", "Single-stranded helix, sometimes folded back on itself"] },
          {
            cells: ["Replication", "Self-duplicates during cell division", "Does not self-duplicate"],
            noteAmber: "Board 2024 assertion-reason: \"Uracil is present in DNA\" is false and \"DNA undergoes self-replication\" is true, so (D).",
            pyqExampleId: "01bbfd2c-7189-4180-a94a-c7d08f0c4684",
          },
          {
            cells: ["Main function", "Heredity: the reserve of genetic information", "Protein synthesis"],
            noteAmber: "Board 2025 asked two important functions of nucleic acids.",
            pyqExampleId: "c42ccf0d-12e6-42ab-8355-264aafed9ab4",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Name the three types of RNA found in the cell, and say what job they share.",
        steps: [
          "The three types are messenger RNA (m-RNA), ribosomal RNA (r-RNA) and transfer RNA (t-RNA).",
          "Proteins are synthesised by the RNA molecules of the cell, using the message present in DNA.",
        ],
        answer: "m-RNA, r-RNA and t-RNA; they carry out protein synthesis",
      },
      practiceSet: [
        { prompt: "Which nucleic acid is capable of self-duplication?", answer: "DNA" },
        { prompt: "Why are nucleic acids also called polynucleotides?", answer: "They are long-chain polymers of nucleotides" },
        { prompt: "Which base present in RNA is not found in DNA?", answer: "Uracil" },
      ],
      pyqExampleId: "9477ea5f-7e2a-40ca-847f-0dd6b2f54758",
      traps: [
        {
          title: "A difference must name both sides",
          body: "\"DNA is double stranded\" is half a difference. Write \"DNA is a double-strand helix, whereas RNA is single stranded\", and do the same for the sugar and the bases.",
        },
        {
          title: "RNA does not replicate itself",
          body: "\"RNA undergoes self-replication\" was the false Reason in a 2024 assertion-reason item (answer C). DNA self-duplicates; RNA carries out protein synthesis.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcbm-helix",
      name: "The double helix: complementary strands",
      intuition:
        "Each base on one strand of DNA has exactly one partner it can hydrogen bond with on the other strand. So once you know one strand, the other is fixed letter by letter. The two strands are not copies of each other; they fit each other like a lock and its key.",
      definition:
        "- In the **double-strand helix** (Watson and Crick), two nucleic acid chains are wound about each other and held together by **hydrogen bonds between pairs of bases**.\n" +
        "- The two strands are **complementary** because the hydrogen bonds are formed between **specific pairs of bases**: **adenine with thymine**, and **cytosine with guanine**.\n" +
        "- So the sequence of one strand decides the sequence of the other, but the two are not identical.\n" +
        "- In RNA a single-stranded helix is present, so its bases are not paired off one for one.",
      table: {
        columns: ["Base on one strand", "Base opposite it", "Bond between them"],
        rows: [
          { cells: ["Adenine (A)", "Thymine (T)", "Hydrogen bonds"] },
          { cells: ["Thymine (T)", "Adenine (A)", "Hydrogen bonds"] },
          { cells: ["Cytosine (C)", "Guanine (G)", "Hydrogen bonds"] },
          { cells: ["Guanine (G)", "Cytosine (C)", "Hydrogen bonds"] },
        ],
      },
      selfCheckExample: {
        prompt: "One strand of a DNA double helix has the base sequence A G G C T A. Write the sequence of bases on the opposite strand.",
        steps: [
          "Adenine pairs with thymine and cytosine with guanine.",
          "Go base by base: A to T, G to C, G to C, C to G, T to A, A to T.",
        ],
        answer: "T C C G A T",
      },
      practiceSet: [
        { prompt: "What holds the two strands of DNA together?", answer: "Hydrogen bonds between specific pairs of bases" },
        { prompt: "Who proposed the double-strand helix structure of DNA?", answer: "James Watson and Francis Crick" },
        { prompt: "When RNA is hydrolysed, there is no fixed relation among the amounts of its bases. What does this suggest about its structure?", answer: "RNA is single stranded: its bases are not paired with a complementary strand" },
      ],
      pyqExampleId: "ea064e41-8325-4e2d-af4d-2dac9cda6f6e",
      traps: [
        {
          title: "Complementary does not mean identical",
          body: "The two strands of DNA are not the same sequence. Each base faces its partner, so the strands are complementary. Give the reason: hydrogen bonds form only between specific base pairs, A with T and C with G.",
        },
        {
          title: "Pairs are A with T, C with G",
          body: "Adenine never pairs with cytosine or guanine in DNA. Write the pairs by name when asked why the strands are complementary.",
        },
      ],
    },
  ],
};

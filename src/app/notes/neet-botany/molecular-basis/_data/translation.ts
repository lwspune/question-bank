import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_MB_TRANSLATION_NOTE: SubtopicNote = {
  subtopicName: "Genetic Code and Translation",
  title: "Genetic Code and Translation",
  oneLineDefinition:
    "Who cracked the genetic code and its features (triplet, degenerate, comma-less, nearly universal, AUG with two jobs, three stop codons), point and frameshift mutations, tRNA as the adapter, and the steps of translation on the ribosome.",
  whyItMatters:
    "Six NEET questions from 2021 to 2025, four of them EASY: none since 2025. Two are on the code itself (what AUG codes for in NEET 2021, who proposed a triplet code in NEET 2025) and four on translation: which RNAs are needed, when translation begins, how many proteins a ribosome has, and whether tRNA and rRNA touch mRNA.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbomb-genetic-code",
      name: "The genetic code and mutations",
      intuition:
        "Four bases must spell out twenty amino acids. Pairs of bases give only 16 words, too few; triplets give 64, more than enough. So the code is read three bases at a time, with spare codons: several codons can mean the same amino acid, and three mean stop. Add or remove one base and every triplet after it is misread; add or remove three and only one amino acid changes.",
      definition:
        "What NCERT says:\n" +
        "- **George Gamow**, a physicist, argued that 4 bases coding for 20 amino acids need a combination of bases, and proposed a code of **three nucleotides**: 4 × 4 × 4 gives 64 codons.\n" +
        "- **Har Gobind Khorana**'s chemical method made RNA with defined combinations of bases. **Marshall Nirenberg**'s **cell-free system** for protein synthesis finally helped decipher the code. **Severo Ochoa**'s enzyme (**polynucleotide phosphorylase**) helped make RNA with defined sequences without a template.\n" +
        "- Features: the codon is a **triplet**; **61 codons** code for amino acids and **3 are stop codons**; the code is **degenerate** (some amino acids have more than one codon); it is read **contiguously, with no punctuation**; it is **unambiguous and specific** (one codon, one amino acid); it is **nearly universal** (UUU codes for phenylalanine from bacteria to humans; exceptions in mitochondria and some protozoans).\n" +
        "- **AUG** has **dual functions**: it codes for **methionine** and acts as the **initiator codon**. **UAA, UAG and UGA** are the **stop** codons.\n" +
        "- **Point mutation**: in **sickle-cell anaemia**, a change of a single base pair in the beta globin gene changes the amino acid **glutamate to valine**.\n" +
        "- **Frameshift mutation**: inserting or deleting **one or two** bases changes the reading frame from that point on. Inserting or deleting **three** (or a multiple of three) adds or removes whole codons, so one or more amino acids change and the frame after that point is unaltered.",
      table: {
        columns: ["Feature", "What it means"],
        rows: [
          { cells: ["Triplet", "Three bases make one codon; 64 codons in all"] },
          { cells: ["61 and 3", "61 codons code for amino acids; 3 code for none and are stop codons"] },
          { cells: ["Degenerate", "Some amino acids are coded by more than one codon"] },
          { cells: ["Comma-less", "Codons are read one after another, with no punctuation"] },
          { cells: ["Unambiguous and specific", "One codon codes for only one amino acid"] },
          { cells: ["Nearly universal", "UUU codes for phenylalanine from bacteria to humans; a few exceptions in mitochondria and some protozoans"] },
          { cells: ["AUG", "Codes for methionine and is also the initiator (start) codon"] },
          { cells: ["UAA, UAG, UGA", "Stop (terminator) codons"] },
          {
            cells: ["Proposed the triplet code", "George Gamow, a physicist"],
            noteAmber: "NEET 2025: George Gamow proposed that the code for amino acids should be made of three nucleotides.",
            pyqExampleId: "39845b88-97ac-4fa5-8e10-5989b3562709",
          },
        ],
      },
      pyqExampleId: "c67c51d2-143f-4194-b32b-94a3dacf511e",
      selfCheckExample: {
        prompt: "In a gene, one extra base is inserted near the start. In another copy of the same gene, three extra bases are inserted at the same place. How does each change affect the protein made?",
        steps: [
          "The code is read in triplets with no punctuation.",
          "One extra base shifts the reading frame, so every codon after it is read wrongly: a frameshift.",
          "Three extra bases add one whole codon, so one extra amino acid is added and the frame after it stays the same.",
        ],
        answer: "One base: frameshift, every amino acid after the insertion may change. Three bases: one extra amino acid, the rest unchanged.",
      },
      practiceSet: [
        { prompt: "Whose cell-free system for protein synthesis finally helped decipher the genetic code?", answer: "Marshall Nirenberg" },
        { prompt: "Whose chemical method made RNA molecules with defined combinations of bases?", answer: "Har Gobind Khorana" },
        { prompt: "How many of the 64 codons code for amino acids?", answer: "61" },
        { prompt: "In sickle-cell anaemia, which amino acid replaces which in beta globin?", answer: "Valine replaces glutamate" },
        { prompt: "What does it mean that the genetic code is degenerate?", answer: "Some amino acids are coded by more than one codon" },
        { prompt: "Name the three stop codons.", answer: "UAA, UAG and UGA" },
      ],
      traps: [
        {
          title: "Degenerate is not ambiguous",
          body: "**Degenerate**: one amino acid can have **several codons**. **Unambiguous**: one codon means **only one** amino acid. The code is both.",
        },
        {
          title: "AUG means methionine only",
          body: "**AUG** codes for **methionine** and also signals **start**. It codes for no other amino acid; UUU is the phenylalanine codon.",
        },
        {
          title: "Three bases keep the frame",
          body: "Inserting or deleting **one or two** bases shifts the frame. Inserting or deleting **three** removes or adds a whole codon and leaves the frame after it **unchanged**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbomb-translation",
      name: "tRNA and translation on the ribosome",
      intuition:
        "A codon cannot grab an amino acid by itself, so tRNA acts as the go-between: one end reads the codon with its anticodon, the other end carries the matching amino acid. The ribosome holds the mRNA and two charged tRNAs side by side and joins their amino acids. It then steps along to the next codon, and so on until a stop codon.",
      definition:
        "What NCERT says:\n" +
        "- All three RNAs are needed to make protein: **mRNA** gives the template, **tRNA** brings amino acids and reads the code, and **rRNAs** play a structural and catalytic role.\n" +
        "- **tRNA** is the **adapter molecule** whose presence Francis Crick postulated. It was earlier called **sRNA (soluble RNA)**. It has an **anticodon loop** with bases complementary to the code and an **amino acid acceptor end**. A specific **initiator tRNA** starts translation; there are **no tRNAs for stop codons**. Its secondary structure is a **clover-leaf**; its real 3-D shape is an **inverted L**.\n" +
        "- **Charging (aminoacylation) of tRNA**: amino acids are activated in the presence of **ATP** and linked to their own tRNA. This is the first phase, and it supplies the energy for the peptide bond.\n" +
        "- The **ribosome** is made of **structural RNAs and about 80 different proteins**. Inactive, it is two subunits, large and small. **When the small subunit meets an mRNA, translation begins.** The large subunit has **two sites** for neighbouring amino acids. In bacteria the **23S rRNA** catalyses the peptide bond: it is a **ribozyme**.\n" +
        "- A **translational unit** of mRNA runs from a **start codon (AUG)** to a **stop codon**. **Untranslated regions (UTRs)** lie at the 5' end (before the start codon) and at the 3' end (after the stop codon); they are needed for efficient translation.\n" +
        "- **Initiation** at AUG, recognised only by the initiator tRNA. **Elongation**: charged tRNAs pair with codons by their anticodons, amino acids join by peptide bonds and the ribosome moves codon by codon. **Termination**: a **release factor** binds the stop codon and the polypeptide is released.",
      table: {
        columns: ["Part or step", "What NCERT says"],
        rows: [
          {
            cells: ["RNAs needed", "mRNA (template), tRNA (brings amino acids, reads code) and rRNA (structural and catalytic)"],
            noteAmber: "NEET 2021: siRNA is not one of the RNAs needed for protein synthesis.",
            pyqExampleId: "d5270e59-6d1c-4ad6-9e0e-67fb13c956e2",
          },
          { cells: ["tRNA", "Adapter with an anticodon loop and an amino acid acceptor end; clover-leaf in 2-D, inverted L in 3-D"] },
          { cells: ["Charging of tRNA", "Amino acid activated by ATP and linked to its own tRNA"] },
          {
            cells: ["Ribosome", "Structural RNAs and about 80 different proteins, in a large and a small subunit"],
            noteAmber: "NEET 2023: a ribosome consists of structural RNAs and about 80 different proteins.",
            pyqExampleId: "a7a30fdc-bdae-4b25-9606-37428d5e1959",
          },
          { cells: ["Ribozyme", "23S rRNA of bacteria, which catalyses the peptide bond"] },
          { cells: ["UTRs", "Untranslated regions at the 5' end before AUG and at the 3' end after the stop codon"] },
          { cells: ["Initiation", "Ribosome binds the start codon AUG, read only by the initiator tRNA"] },
          { cells: ["Termination", "A release factor binds the stop codon and frees the polypeptide"] },
        ],
      },
      pyqExampleId: "01b08045-c9b8-49fe-813d-309996f1fc93",
      selfCheckExample: {
        prompt: "An mRNA has the translational unit 5' AUG UUU UAA 3'. How many amino acids does the finished polypeptide have, which are they, and what ends the process?",
        steps: [
          "AUG is the start codon and codes for methionine; it is read by the initiator tRNA.",
          "UUU codes for phenylalanine.",
          "UAA is a stop codon: no tRNA reads it, and a release factor binds there instead.",
        ],
        answer: "Two amino acids, methionine then phenylalanine; a release factor at UAA ends translation.",
      },
      practiceSet: [
        { prompt: "What is the linking of an amino acid to its own tRNA, using ATP, called?", answer: "Charging (aminoacylation) of tRNA" },
        { prompt: "Which rRNA acts as an enzyme (ribozyme) for peptide bond formation in bacteria?", answer: "23S rRNA" },
        { prompt: "What shape does tRNA have in its secondary structure, and in its real 3-D structure?", answer: "Clover-leaf; inverted L" },
        { prompt: "Where in an mRNA are the untranslated regions found?", answer: "At the 5' end before the start codon and at the 3' end after the stop codon" },
        { prompt: "What binds to the stop codon to end translation?", answer: "A release factor" },
        { prompt: "What was tRNA called before its role as an adapter was known?", answer: "sRNA (soluble RNA)" },
      ],
      traps: [
        {
          title: "The small subunit meets mRNA first",
          body: "Translation begins when the **small subunit** of the ribosome meets the mRNA. The two subunits are separate while the ribosome is inactive.",
        },
        {
          title: "tRNA and rRNA do work on mRNA",
          body: "tRNA reads the codons of mRNA and rRNA is part of the ribosome that holds it. A statement that tRNA and rRNA do not interact with mRNA is false.",
        },
        {
          title: "No tRNA for a stop codon",
          body: "Stop codons code for no amino acid, so **no tRNA** reads them. A **release factor** binds the stop codon instead.",
        },
        {
          title: "The peptide bond is made by RNA",
          body: "In bacteria the peptide bond is catalysed by the **23S rRNA**, a **ribozyme**, not by a ribosomal protein.",
        },
      ],
    },
  ],
};

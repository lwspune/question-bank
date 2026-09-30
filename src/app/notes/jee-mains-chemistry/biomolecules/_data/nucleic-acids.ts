import type { SubtopicNote } from "@/app/notes/_types";

export const NUCLEIC_ACIDS_BIO_NOTE: SubtopicNote = {
  subtopicName: "Nucleic Acids",
  title: "Nucleic Acids",
  oneLineDefinition:
    "A nucleotide is a base on C-1′ of a pentose sugar with a phosphate on C-5′, and nucleotides join through phosphodiester links; DNA uses 2-deoxyribose and the bases A, G, C, T, RNA uses ribose and A, G, C, U, and in the DNA double helix A pairs with T by two hydrogen bonds and G with C by three.",
  whyItMatters:
    "Twelve PYQs, nine multiple choice and three asking for a number, one from 2026. Eight are on the parts of a nucleotide: which sugar and which bases each nucleic acid has, the link between nucleotides, where the chirality comes from, the structures of the bases, and counting the oxygen atoms in a nucleotide. Four are on base pairing, from writing the complementary strand and counting hydrogen bonds to what DNA and RNA each do.",
  concepts: [
    // C1 — components
    {
      kind: "reference" as const,
      slug: "jcbio-nucleic-components",
      name: "Nucleosides, nucleotides and the bases and sugars of DNA and RNA",
      intuition:
        "A nucleic acid is a long chain of nucleotides. Each nucleotide has three parts: a nitrogen base, a five-carbon sugar and a phosphate. The base sits on C-1′ of the sugar and the phosphate on C-5′. The phosphate of one nucleotide then bonds to C-3′ of the next sugar, so the backbone is sugar–phosphate–sugar and the bases hang off it.",
      definition:
        "- **Nucleoside** = base + sugar, the base attached at C-1′. **Nucleotide** = nucleoside + phosphoric acid at C-5′. Sugar carbons are numbered 1′, 2′, 3′ to keep them apart from the base atoms.\n" +
        "- Nucleotides are joined by **phosphodiester** links between C-5′ of one sugar and C-3′ of the next, not by glycosidic links.\n" +
        "- Sugars: **β-D-2-deoxyribose** in DNA, **β-D-ribose** in RNA. Both are five-membered (furanose) rings in the D series; the D-sugar is the source of the chirality of DNA and RNA. 2-Deoxyribose has no oxygen at C-2′. Free ribose, like any monosaccharide, is a reducing sugar.\n" +
        "- Bases: **purines** (two fused rings) adenine and guanine; **pyrimidines** (one ring) cytosine, thymine and uracil. Thymine is 5-methyluracil. Uracil in RNA is in its diketo form.\n" +
        "- **Oxygen count of a nucleotide** = oxygens in the base (A 0, G 1, C 1, T 2, U 2) + oxygens left on the sugar after both links (ribose 3: the ring O and the 2′ and 3′ OH; deoxyribose 2) + 4 in the phosphate.\n" +
        "- RNA comes in three kinds: messenger (m-RNA), ribosomal (r-RNA) and transfer (t-RNA). DNA is a double helix; RNA is single stranded.",
      table: {
        columns: ["Component", "Kind", "In DNA", "In RNA"],
        rows: [
          { cells: ["Adenine (A)", "Purine base, two rings", "Yes", "Yes"] },
          { cells: ["Guanine (G)", "Purine base, two rings", "Yes", "Yes"] },
          { cells: ["Cytosine (C)", "Pyrimidine base, one ring", "Yes", "Yes"] },
          { cells: ["Thymine (T)", "Pyrimidine base, 5-methyluracil", "Yes", "No"] },
          { cells: ["Uracil (U)", "Pyrimidine base", "No", "Yes"] },
          { cells: ["β-D-2-Deoxyribose", "Pentose sugar, furanose ring", "Yes", "No"] },
          { cells: ["β-D-Ribose", "Pentose sugar, furanose ring", "No", "Yes"] },
          { cells: ["Phosphate", "Joins C-5′ of one sugar to C-3′ of the next", "Yes", "Yes"] },
        ],
        caption: "Thymine and deoxyribose mark DNA; uracil and ribose mark RNA.",
      },
      selfCheckExample: {
        prompt: "How many oxygen atoms are there in cytidine 5′-monophosphate, the nucleotide of cytosine and ribose?",
        steps: [
          "Cytosine has one C=O oxygen: 1.",
          "Ribose keeps its ring O and the 2′ and 3′ OH groups: 3.",
          "The phosphate group carries 4.",
          "Total \\(1 + 3 + 4 = 8\\).",
        ],
        answer: "8",
      },
      practiceSet: [
        { prompt: "What link joins two nucleotides in a nucleic acid?", answer: "A phosphodiester link" },
        { prompt: "Which sugar is present in RNA?", answer: "β-D-Ribose" },
        { prompt: "Which base occurs only in RNA?", answer: "Uracil" },
        { prompt: "Is adenine a purine or a pyrimidine?", answer: "A purine" },
      ],
      pyqExampleId: "4c79fb4e-673b-43d6-ac0c-a36823ac0814", // 2022 — oxygen atoms in the nucleotide of uracil (UMP)
      traps: [
        {
          title: "The nucleic-acid sugar is a β furanose",
          body: "Ribose and 2-deoxyribose sit in nucleic acids as five-membered β-D rings. A statement that the sugar is a pyranose, or the α anomer, is false.",
        },
        {
          title: "Nucleotides are joined by phosphodiester links",
          body: "The glycosidic link joins the base to C-1′ of its own sugar. Nucleotide to nucleotide is a phosphodiester link between C-5′ and C-3′, not a C-1 to C-4 glycosidic link.",
        },
        {
          title: "Chirality comes from the sugar",
          body: "The bases are flat and the phosphate is not a stereocentre. DNA and RNA are chiral because every unit carries a D-sugar.",
        },
      ],
    },

    // C2 — base pairing
    {
      kind: "formula" as const,
      slug: "jcbio-base-pairing",
      name: "Base pairing and counting hydrogen bonds in DNA",
      intuition:
        "The two strands of DNA are held by hydrogen bonds between bases, and only two pairings fit: A with T, and G with C. So one strand fixes the other. The A–T pair has two hydrogen bonds and the G–C pair three, so from one strand you can count every hydrogen bond in the helix.",
      definition:
        "- **Complementary pairs**: A with T and G with C in DNA; in RNA, A pairs with U.\n" +
        "- The strands are antiparallel: write the complement of a 5′ → 3′ strand from 3′ to 5′ under it.\n" +
        "- **A–T** is held by two hydrogen bonds and **G–C** by three (NCERT Biology XII).\n" +
        "- Each base of one strand is part of exactly one pair, so count on one strand only: every A or T gives an A–T pair, every G or C a G–C pair.\n" +
        "- **Functions** (NCERT): DNA is the reserve of genetic information. It self-duplicates during cell division, and identical strands pass to the daughter cells. The message for making each protein is in DNA, but the proteins are made by RNA.",
      formula: {
        label: "Hydrogen bonds in a DNA double helix",
        latex: "N_{\\text{H-bonds}} = 2\\,n_{\\mathrm{A=T}} + 3\\,n_{\\mathrm{G\\equiv C}}",
      },
      authoredExample: {
        prompt:
          "One strand of a DNA helix is \\(5'\\text{-ATTGCAGC-}3'\\). Write the complementary strand and count the hydrogen bonds in the helix.",
        steps: [
          "Pair each base: A→T, T→A, G→C, C→G. The complement is \\(3'\\text{-TAACGTCG-}5'\\).",
          "A and T in the given strand: A, T, T, A, so 4 A–T pairs.",
          "G and C in the given strand: G, C, G, C, so 4 G–C pairs.",
          "\\(N = 2 \\times 4 + 3 \\times 4 = 8 + 12 = 20\\).",
        ],
        answer: "\\(3'\\text{-TAACGTCG-}5'\\); 20 hydrogen bonds.",
      },
      selfCheckExample: {
        prompt: "One strand of a DNA helix is \\(5'\\text{-GACTTA-}3'\\). Write its complement and count the hydrogen bonds.",
        steps: [
          "Complement: \\(3'\\text{-CTGAAT-}5'\\).",
          "G and C in the strand: G, C, so 2 G–C pairs, giving \\(2 \\times 3 = 6\\).",
          "A and T in the strand: A, T, T, A, so 4 A–T pairs, giving \\(4 \\times 2 = 8\\).",
          "Total \\(6 + 8 = 14\\).",
        ],
        answer: "\\(3'\\text{-CTGAAT-}5'\\); 14 hydrogen bonds.",
      },
      practiceSet: [
        { prompt: "Write the complement of \\(5'\\text{-AGGT-}3'\\).", answer: "\\(3'\\text{-TCCA-}5'\\)" },
        { prompt: "How many hydrogen bonds hold a G–C pair?", answer: "3" },
        { prompt: "Which nucleic acid is the reserve of genetic information?", answer: "DNA" },
        { prompt: "In RNA, which base pairs with adenine?", answer: "Uracil" },
      ],
      pyqExampleId: "1368e1b7-7a21-4ed1-9f00-83cc44ed121b", // 2025 — H-bonds from a 13-base strand: 33
      traps: [
        {
          title: "Count one strand, not both",
          body: "Each base of the given strand already stands for one base pair. Counting the complementary strand as well doubles the answer.",
        },
        {
          title: "RNA makes the proteins",
          body: "DNA carries the message for protein synthesis, but the proteins are made by RNA. Statements that DNA synthesises proteins, or that RNA is the reserve of genetic information, are false.",
        },
      ],
    },
  ],
};

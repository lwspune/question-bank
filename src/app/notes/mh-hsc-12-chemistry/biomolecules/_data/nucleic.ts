import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_BM_NUCLEIC_NOTE: SubtopicNote = {
  subtopicName: "Nucleic Acids",
  title: "Nucleic Acids: Nucleotides, DNA and RNA",
  oneLineDefinition:
    "The sugar, base and phosphate that make a nucleotide, how nucleotides join into the chains of DNA and RNA, how the two nucleic acids differ, and the Watson and Crick double helix with its complementary strands.",
  whyItMatters:
    "12 questions, three of them from board papers: which base is not present in DNA (2016), the structures of a nucleoside and a nucleotide (2016) and the definition of a nucleotide (2026). The textbook adds AMP and dAMP, the purine bases, the sugar-phosphate backbone and writing the complementary strand of DNA.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccbm-nucleotides",
      name: "Sugars, bases, nucleosides and nucleotides",
      intuition:
        "A nucleic acid is a long chain of repeating units, the nucleotides, and every nucleotide is built from the same three parts: a five membered sugar ring, a nitrogen base hanging from one end of the sugar, and a phosphate group on the other end. Take away the phosphate and what is left is a nucleoside.",
      definition:
        "- There are two nucleic acids: **RNA** (ribonucleic acid), found mainly in the cytoplasm, and **DNA** (deoxyribonucleic acid), found mainly in the nucleus. DNA stores the genetic information; RNA translates it into the synthesis of proteins.\n" +
        "- Nucleic acids are unbranched polymers of repeating monomers called **nucleotides**. A nucleotide has three components: a monosaccharide (a five membered furanose sugar), a nitrogen-containing base and a phosphate group.\n" +
        "- **Sugar:** D-ribose in RNA; 2-deoxy-D-ribose (no -OH at C-2) in DNA.\n" +
        "- **Bases:** three with one ring come from pyrimidine: cytosine (C), uracil (U), thymine (T). Two with two rings come from purine: adenine (A), guanine (G). Uracil occurs only in RNA and thymine only in DNA.\n" +
        "- **Nucleoside** = sugar + base: the anomeric carbon C-1' of the sugar joins N-1 of a pyrimidine base or N-9 of a purine base. Primes number the sugar atoms, to keep them apart from the atoms of the base.\n" +
        "- **Nucleotide** = a phosphate group added to the 5'-OH of a nucleoside, that is, a monophosphate of a nucleoside. In names such as AMP, dAMP, UMP and dTMP, the capital letter is the base, MP means monophosphate and a small d means deoxyribose.\n" +
        "- Board 2016 paired nucleosides and nucleotides with 'what are vitamins' and two diseases of vitamin A deficiency. The present book does not teach vitamins, so give that part little time.",
      authoredExample: {
        prompt: "Name the nucleotide made of 2-deoxy-D-ribose, thymine and a phosphate group, and state where the base and the phosphate are joined to the sugar.",
        steps: [
          "Thymine is a pyrimidine base, so its N-1 bonds to C-1' of the sugar. Sugar plus base is the nucleoside.",
          "The phosphate group is added to the 5'-OH of that nucleoside, which gives the nucleotide.",
          "Name: d for deoxyribose, T for thymine, MP for monophosphate.",
        ],
        answer: "dTMP: thymine joined at C-1' (through its N-1), phosphate at C-5'",
      },
      selfCheckExample: {
        prompt: "Which of the five bases present in nucleic acids are purine bases?",
        steps: ["Purine bases have two fused rings."],
        answer: "Adenine and guanine",
      },
      practiceSet: [
        { prompt: "Which nitrogen atom of guanine bonds to C-1' of the sugar in a nucleoside?", answer: "N-9, because guanine is a purine" },
        { prompt: "What does the small letter d in dAMP stand for?", answer: "Deoxyribose" },
        { prompt: "Which sugar is present in the nucleotides of RNA?", answer: "D-ribose" },
        { prompt: "Name the pyrimidine base that occurs only in DNA.", answer: "Thymine" },
      ],
      pyqExampleId: "7afed656-b2de-47bf-bc6b-9ca34464a63e",
      traps: [
        {
          title: "Purines and pyrimidines swapped",
          body: "Purine bases have two rings: adenine and guanine. Pyrimidine bases have one ring: cytosine, uracil and thymine.",
        },
        {
          title: "A nucleoside called a nucleotide",
          body: "A nucleoside is sugar + base only. It becomes a nucleotide when a phosphate group is added to its 5'-OH.",
        },
        {
          title: "Phosphate placed at C-1'",
          body: "C-1' carries the base. The phosphate of a nucleotide sits on the 5'-OH.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccbm-dna-rna",
      name: "DNA and RNA compared, and the polynucleotide chain",
      intuition:
        "DNA and RNA are built the same way, a backbone of sugar and phosphate with a base on every sugar, but they differ in three small things: the sugar, one base, and the number of strands. Those three differences are what the board asks you to sort.",
      definition:
        "- Nucleotides are joined by linking the 3'-OH of one nucleotide with the 5'-phosphate of the next.\n" +
        "- The **backbone** is alternating sugar and phosphate groups (written P-S-P-S), with a base on each sugar.\n" +
        "- The two ends differ: the **5' end** has a free phosphate group at the 5' position; the **3' end** has a free -OH at the 3' position.\n" +
        "- The **primary structure** of a nucleic acid is its sequence of bases. A chain is named by its bases with one-letter symbols, starting from the 5' end: in the segment ACT, A is at the 5' end and T at the 3' end.",
      table: {
        columns: ["Point", "DNA", "RNA"],
        rows: [
          { cells: ["Sugar", "2-deoxy-D-ribose", "D-ribose"] },
          {
            cells: ["Bases", "A, G, C and T", "A, G, C and U"],
            pyqExampleId: "248e9200-52cf-409e-b00e-2150c0fabee2",
            noteAmber: "Board 2016 asked which base is not present in DNA: uracil.",
          },
          { cells: ["Strands", "Two, wound into a right handed double helix", "One: a single strand"] },
          { cells: ["Where found", "Mainly in the nucleus", "Mainly in the cytoplasm"] },
          { cells: ["Size", "Several million nucleotides", "A few thousand nucleotides"] },
          { cells: ["Role", "Stores the genetic information", "Translates it into the synthesis of proteins"] },
        ],
      },
      practiceSet: [
        { prompt: "Which end of a polynucleotide chain carries a free phosphate group?", answer: "The 5' end" },
        { prompt: "What is the backbone of a nucleic acid made of?", answer: "Alternating sugar and phosphate groups" },
        { prompt: "Which of the bases A, G, C, T and U occur in both DNA and RNA?", answer: "A, G and C" },
      ],
      pyqExampleId: "248e9200-52cf-409e-b00e-2150c0fabee2",
      traps: [
        {
          title: "RNA called double stranded",
          body: "Only DNA is a double helix. RNA exists as a single strand.",
        },
        {
          title: "Deoxyribose put in RNA",
          body: "RNA carries D-ribose; the deoxy sugar, with no -OH at C-2, belongs to DNA.",
        },
        {
          title: "Writing a sequence from the 3' end",
          body: "A chain is named from its 5' end. Write the 5' and 3' labels at the two ends so the direction is clear.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccbm-double-helix",
      name: "The DNA double helix and complementary strands",
      intuition:
        "DNA is a twisted ladder. The two rails are sugar-phosphate backbones running in opposite directions, and each rung is a pair of bases held by hydrogen bonds. A pairs only with T and G only with C, so once you know one strand, the other is fixed.",
      definition:
        "- Watson and Crick put forward the double helix model of DNA in 1953.\n" +
        "- DNA has two polynucleotide strands wound into a **right handed double helix**.\n" +
        "- The two strands run in **opposite directions**: one from the 5' end to the 3' end, the other from the 3' end to the 5' end.\n" +
        "- The sugar-phosphate backbone is on the outside; the bases are on the inside, perpendicular to the axis of the helix.\n" +
        "- The helix is held by hydrogen bonds between the bases: adenine forms **two** hydrogen bonds with thymine, and guanine forms **three** with cytosine. A-T and C-G are **complementary base pairs**, and the two strands are complementary.\n" +
        "- So in any DNA the number of adenine units equals the number of thymine units, and guanine equals cytosine.",
      authoredExample: {
        prompt: "Write the sequence of the strand complementary to the DNA segment 5'-GATTCA-3'.",
        steps: [
          "Pair each base: A with T, T with A, G with C, C with G.",
          "The complementary strand runs the opposite way, from its 3' end to its 5' end.",
          "Original strand: 5'-G A T T C A-3'.",
          "Complementary strand: 3'-C T A A G T-5'.",
        ],
        answer: "3'-CTAAGT-5', which read from its 5' end is 5'-TGAATC-3'",
      },
      selfCheckExample: {
        prompt: "How many hydrogen bonds join the DNA segment 5'-GCA-3' to its complementary strand?",
        steps: ["G with C: 3. C with G: 3. A with T: 2.", "Total \\(= 3 + 3 + 2 = 8\\)."],
        answer: "8",
      },
      practiceSet: [
        { prompt: "How many hydrogen bonds join guanine to cytosine in DNA?", answer: "Three" },
        { prompt: "Where does the sugar-phosphate backbone lie in the DNA double helix?", answer: "On the outside, with the bases inside" },
        { prompt: "A DNA sample has 30 adenine units in every 100 bases. How many guanine units does it have in every 100 bases?", answer: "T = 30, so G + C = 40 and G = 20" },
      ],
      pyqExampleId: "6d6254c1-f796-472c-b220-467b08584c86",
      traps: [
        {
          title: "Complementary strand written in the same direction",
          body: "The complementary strand is antiparallel. Mark its ends 3' and 5', or reverse it if you write it from the 5' end.",
        },
        {
          title: "Pairing A with U in DNA",
          body: "DNA has no uracil. In the double helix adenine pairs with thymine.",
        },
        {
          title: "Three hydrogen bonds for A-T",
          body: "A-T is held by two hydrogen bonds and G-C by three.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_MOL_TRANSCRIPTION_NOTE: SubtopicNote = {
  subtopicName: "Transcription and RNA Processing",
  title: "Transcription: From DNA to mRNA",
  oneLineDefinition:
    "RNA polymerase copies one strand of a gene into RNA; in eukaryotes the first transcript is then capped, given a poly-A tail and spliced before it leaves the nucleus.",
  whyItMatters:
    "The papers ask where transcription happens (2015), which nucleic acids take part in it (2016), what a freshly made transcript contains (2022), what transcription makes (2013) and how it differs from replication (2020). Writing an mRNA from a DNA strand comes up inside many sequence questions.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-mol-transcription-steps",
      name: "The stages of transcription and where it happens",
      intuition:
        "A gene is a recipe kept safely in the DNA. Transcription makes a working copy in RNA, so the DNA never has to leave the nucleus. RNA polymerase does nearly everything itself: it finds the start, opens the helix, builds the RNA and lets go at the end.",
      definition:
        "**Transcription** is the synthesis of RNA from a DNA template by **RNA polymerase**.\n" +
        "- It starts at a **promoter**, a DNA sequence just before the gene.\n" +
        "- Only one strand, the **template strand**, is read, 3′→5′; the RNA grows **5′→3′**.\n" +
        "- RNA polymerase unwinds the DNA itself and needs **no primer**.\n" +
        "- Base pairing: template A → RNA U, T → A, G → C, C → G.\n" +
        "- Products: mRNA, tRNA and rRNA are all made by transcription.",
      table: {
        columns: ["Stage or feature", "What happens"],
        rows: [
          { cells: ["Initiation", "RNA polymerase binds the promoter (in eukaryotes helped by transcription factors, often at a TATA box) and opens a short stretch of the helix"] },
          { cells: ["Elongation", "RNA polymerase moves along the template, adding ribonucleotides to the 3′ end of the growing RNA; the DNA closes again behind it"] },
          { cells: ["Termination", "at a terminator sequence (bacteria) or after a polyadenylation signal (eukaryotes) the RNA and the enzyme are released"] },
          { cells: ["Where", "eukaryotes: in the nucleus, and in mitochondria and chloroplasts, which have their own DNA; prokaryotes: in the cytoplasm"] },
          { cells: ["Enzymes", "bacteria: one RNA polymerase; eukaryotes: three (I makes most rRNA, II makes mRNA, III makes tRNA)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which statement about RNA polymerase is correct?",
        options: [
          "It needs an RNA primer before it can begin.",
          "It adds nucleotides to the 5′ end of the growing RNA.",
          "It copies both strands of a gene at the same time.",
          "It binds to the promoter and can separate the DNA strands itself.",
          "It joins amino acids together with peptide bonds.",
        ],
        steps: [
          "RNA polymerase binds the promoter and opens the helix without help from helicase, so D is correct.",
          "A describes DNA polymerase. B is backwards: nucleotides are added to the 3′ end. C is wrong: only the template strand is read.",
          "E describes the ribosome in translation.",
        ],
        answer: "(D) It binds to the promoter and can separate the DNA strands itself.",
      },
      practiceSet: [
        { prompt: "What DNA sequence does RNA polymerase bind to start transcription?", answer: "The promoter" },
        { prompt: "Which eukaryotic RNA polymerase makes mRNA?", answer: "RNA polymerase II" },
        { prompt: "Where does transcription happen in a bacterium?", answer: "In the cytoplasm (there is no nucleus)" },
      ],
      traps: [
        {
          title: "Transcription makes RNA, not protein",
          body: "The direct product of transcribing any gene, even the insulin gene, is an RNA molecule. The protein is made later, by translation. Options naming a protein as the product of transcription are wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-mol-template-coding",
      name: "Template strand, coding strand and the mRNA sequence",
      intuition:
        "The mRNA is built as the complement of the template strand. The other DNA strand, the coding strand, is also the complement of the template. So the mRNA and the coding strand carry the same sequence, except that RNA uses U where DNA uses T.",
      definition:
        "The two DNA strands of a gene have names:\n" +
        "- The **template** (antisense) strand is the one RNA polymerase reads.\n" +
        "- The **coding** (sense) strand is its partner. Its sequence matches the mRNA, with T in place of U.\n" +
        "- Number of U in the mRNA = number of A in the template strand = number of T in the coding strand.",
      formula: {
        label: "mRNA from the two DNA strands",
        latex: "\\text{mRNA} = \\text{coding strand with } T \\rightarrow U = \\text{complement of the template strand}",
      },
      authoredExample: {
        prompt: "The template strand of a short gene reads 3′-TACCGGATT-5′. Write the mRNA and the coding strand.",
        steps: [
          "Complement each template base, using U for A: T→A, A→U, C→G, G→C.",
          "mRNA: 5′-AUGGCCUAA-3′. It runs antiparallel to the template, so its 5′ end lies beneath the template's 3′ end.",
          "Coding strand: the mRNA sequence with T for U, 5′-ATGGCCTAA-3′.",
        ],
        answer: "mRNA 5′-AUGGCCUAA-3′; coding strand 5′-ATGGCCTAA-3′",
      },
      selfCheckExample: {
        prompt: "The template strand of a section of a gene reads 3′-GCATTAC-5′. What is the mRNA transcribed from it?",
        options: [
          "5′-CGUAAUG-3′",
          "5′-CGTAATG-3′",
          "5′-GCAUUAC-3′",
          "5′-GUAAUGC-3′",
          "5′-GCATTAC-3′",
        ],
        steps: [
          "Complement each base with RNA letters: G→C, C→G, A→U, T→A, giving CGUAAUG.",
          "It is antiparallel to the template, so it runs 5′→3′ left to right: 5′-CGUAAUG-3′.",
          "B keeps T, so it is the coding strand, not RNA. C copies the template with U. D is the right mRNA written backwards. E relabels the template.",
        ],
        answer: "(A) 5′-CGUAAUG-3′",
      },
      practiceSet: [
        { prompt: "The coding strand reads 5′-ATGTTC-3′. What is the mRNA?", answer: "5′-AUGUUC-3′", method: "Same as the coding strand with U for T" },
        { prompt: "A template strand contains 7 adenines. How many uracils are in its mRNA?", answer: "7" },
        { prompt: "How many uracils are in the mRNA made from the template 3′-AAGTCA-5′?", answer: "3", method: "mRNA is 5′-UUCAGU-3′" },
      ],
      traps: [
        {
          title: "The mRNA matches the coding strand, not the template",
          body: "The template strand is the one read, so the mRNA is its complement. Writing the template's own letters with U for T gives the wrong mRNA, and that error is usually among the options.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mol-replication-vs-transcription",
      name: "Replication compared with transcription",
      intuition:
        "Both processes open the DNA, pair new nucleotides with a template and link them into a chain. So the bonds involved are the same. What differs is how much DNA is copied, which enzyme does it, and what the product is made of.",
      definition:
        "Shared by **both** processes:\n" +
        "- Hydrogen bonds between DNA bases are **broken**.\n" +
        "- New hydrogen bonds form between template bases and incoming nucleotides.\n" +
        "- Phosphodiester bonds form as the new chain grows 5′→3′.\n" +
        "So none of these three events can tell replication from transcription. The differences are in the table.",
      table: {
        columns: ["Feature", "Replication", "Transcription"],
        rows: [
          { cells: ["Template", "both strands of the whole molecule", "one strand of one gene at a time"] },
          { cells: ["Main enzyme", "DNA polymerase (with helicase, primase, ligase)", "RNA polymerase"] },
          { cells: ["Primer", "needed (RNA primer)", "not needed"] },
          { cells: ["Sugar and bases added", "deoxyribose; A, T, G, C", "ribose; A, U, G, C"] },
          { cells: ["Product", "two double-stranded DNA molecules", "one single-stranded RNA"] },
          { cells: ["When", "once per cell cycle, in S phase", "continually, gene by gene, as the cell needs"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of the following happens during transcription but NOT during DNA replication?",
        options: [
          "Hydrogen bonds between the bases of the two DNA strands are broken.",
          "Phosphodiester bonds are formed.",
          "Nucleotides are added to the 3′ end of the growing chain.",
          "The template strand is read in the 3′→5′ direction.",
          "Adenine in the template pairs with uracil in the new strand.",
        ],
        steps: [
          "Uracil is used only in RNA, so pairing A with U happens only in transcription. E is correct.",
          "A, B, C and D are all true of replication as well: both open the helix, both make phosphodiester bonds, both grow chains 5′→3′ by reading templates 3′→5′.",
        ],
        answer: "(E) Adenine in the template pairs with uracil in the new strand.",
      },
      practiceSet: [
        { prompt: "Does transcription form phosphodiester bonds?", answer: "Yes, between the ribonucleotides of the new RNA" },
        { prompt: "Which of the two processes needs a primer?", answer: "Replication" },
        { prompt: "Which nucleic acid is the template in both processes?", answer: "DNA" },
      ],
      traps: [
        {
          title: "The same three bond events happen in both processes",
          body: "Breaking hydrogen bonds, forming hydrogen bonds and forming phosphodiester bonds all occur in replication and in transcription. A statement using one of these to tell them apart is wrong; the real differences are the sugar, the base U or T, the enzyme and the product.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mol-rna-processing",
      name: "Processing eukaryotic mRNA: cap, poly-A tail and splicing",
      intuition:
        "In a eukaryote the first transcript is not ready to use. It is a rough copy of the whole gene, including stretches that do not code for the protein. Before it leaves the nucleus it is protected at both ends and the non-coding stretches are cut out.",
      definition:
        "The first transcript (**pre-mRNA**) is processed in the nucleus:\n" +
        "- **Exons** are the parts kept (expressed); **introns** are the intervening parts cut out.\n" +
        "- The mature mRNA is shorter than the gene and leaves through the nuclear pores.\n" +
        "- **Prokaryotes** have no nucleus and almost no introns: their mRNA is not capped or spliced, and ribosomes start translating it while it is still being made.\n" +
        "- A freshly made transcript is a chain of ribonucleotides: it contains ribose, phosphodiester bonds and the bases A, U, G, C, but no peptide bonds.",
      table: {
        columns: ["Step", "What is added or removed", "Why"],
        rows: [
          { cells: ["5′ cap", "a modified guanine (7-methylguanosine) added to the 5′ end", "protects the 5′ end and helps the ribosome bind"] },
          { cells: ["Poly-A tail", "about 100 to 250 adenine nucleotides added to the 3′ end, without a template", "protects the mRNA from breakdown and helps export"] },
          { cells: ["Splicing", "introns cut out and exons joined by the spliceosome (small nuclear RNAs and proteins)", "leaves one continuous coding sequence"] },
          { cells: ["Alternative splicing", "different combinations of exons kept in different cells", "one gene can give several different proteins"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which part of a mature eukaryotic mRNA is NOT coded for by the DNA of its gene?",
        options: ["the exons", "the poly-A tail", "the introns", "the start codon", "the stop codon"],
        steps: [
          "The poly-A tail is added by an enzyme after transcription, with no DNA template. B is correct.",
          "Exons and both start and stop codons are copied from the gene. Introns are coded in the gene but are not in the mature mRNA at all.",
        ],
        answer: "(B) the poly-A tail",
      },
      practiceSet: [
        { prompt: "Which are removed during splicing, introns or exons?", answer: "Introns" },
        { prompt: "A pre-mRNA of 3000 nucleotides contains introns totalling 1800 nucleotides. How long are its exons together?", answer: "1200 nucleotides" },
        { prompt: "Do bacterial mRNAs receive a 5′ cap?", answer: "No" },
      ],
      traps: [
        {
          title: "Exons are expressed; introns are removed",
          body: "The names help: EXons are EXpressed, INtrons stay IN the nucleus. So a mature mRNA is shorter than its gene, and protein length cannot be predicted from the length of the whole gene.",
        },
      ],
    },
  ],
};

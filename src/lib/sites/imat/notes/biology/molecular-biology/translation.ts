import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_MOL_TRANSLATION_NOTE: SubtopicNote = {
  subtopicName: "Genetic Code and Translation",
  title: "The Genetic Code and Protein Synthesis",
  oneLineDefinition:
    "The mRNA is read three bases at a time; each codon is matched by a tRNA anticodon on the ribosome, which joins the amino acids into a polypeptide.",
  whyItMatters:
    "The 2024 ministry paper asked three definitions here (translation twice, the anticodon once), and the 2023 paper asked what share of all codons are stop codons. Older papers built a DNA template from tRNA anticodons (2018), counted uracils in anticodons (2017) and asked which nucleic acid takes no direct part in translation (2016).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-mol-codons",
      name: "Codons: why the code uses triplets, and the start and stop codons",
      intuition:
        "Four bases must spell 20 amino acids. Pairs of bases give only 16 words, not enough. Triplets give 64, more than enough, so most amino acids get several codons and three codons are left to mean 'stop'.",
      definition:
        "A **codon** is a group of three mRNA bases that stands for one amino acid or for stop.\n" +
        "- There are \\(4^3 = 64\\) codons: **61** code for the 20 amino acids and **3** are **stop codons** (UAA, UAG, UGA).\n" +
        "- **AUG** is the **start codon**; it also codes for methionine inside a chain.\n" +
        "- Codons are read in order from the start codon, in one **reading frame**, 5′→3′ along the mRNA.\n" +
        "- A stop codon has no matching tRNA and adds no amino acid, so a polypeptide has one amino acid fewer than the codons from start to stop.",
      formula: {
        label: "Number of possible codons",
        latex: "\\text{codons} = 4^{\\,n}, \\qquad 4^3 = 64 = 61 \\text{ (amino acids)} + 3 \\text{ (stop)}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of bases per codon" },
          { symbol: "\\(4\\)", meaning: "number of different bases in mRNA (A, U, G, C)" },
        ],
      },
      authoredExample: {
        prompt:
          "(a) Show why a code of two-base codons could not specify all 20 amino acids. (b) The coding part of an mRNA, from the first base of AUG to the last base of the stop codon, is 1203 nucleotides long. How many amino acids are in the polypeptide?",
        steps: [
          "(a) Two-base codons give \\(4^2 = 16\\) combinations, fewer than 20 amino acids. Three bases give \\(4^3 = 64\\), enough.",
          "(b) Codons: \\(1203 / 3 = 401\\), including the stop codon.",
          "The stop codon adds no amino acid, so the polypeptide has \\(401 - 1 = 400\\) amino acids.",
        ],
        answer: "(a) \\(4^2 = 16 < 20\\); (b) 400 amino acids",
      },
      selfCheckExample: {
        prompt: "In the standard genetic code, what percentage of all possible three-base codons specify an amino acid?",
        options: ["4.7%", "31.3%", "95.3%", "93.8%", "100%"],
        steps: [
          "Of the 64 codons, 3 are stop codons, so 61 specify an amino acid.",
          "\\(61 / 64 \\times 100 \\approx 95.3\\%\\).",
          "A is the share of stop codons. B divides 20 amino acids by 64 codons. D removes the start codon too, but AUG codes for methionine. E forgets the stop codons.",
        ],
        answer: "(C) 95.3%",
      },
      practiceSet: [
        { prompt: "How many codons are there in the genetic code?", answer: "64" },
        { prompt: "Name the three stop codons.", answer: "UAA, UAG, UGA" },
        { prompt: "A polypeptide has 150 amino acids. How many nucleotides long, at least, is its coding mRNA, counting the stop codon?", answer: "453", method: "\\((150 + 1) \\times 3\\)" },
        { prompt: "Which amino acid does the start codon code for?", answer: "Methionine" },
      ],
      traps: [
        {
          title: "Stop codons code for no amino acid and have no tRNA",
          body: "At a stop codon a protein release factor, not a tRNA, binds the ribosome. So count stop codons when finding mRNA length, but not when counting amino acids.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mol-code-properties",
      name: "Properties of the genetic code: degenerate, unambiguous, universal",
      intuition:
        "Because there are more codons than amino acids, most amino acids have several codons, usually differing only in the third base. But each codon has only one meaning, and almost every organism uses the same dictionary, which is why a human gene can be read by a bacterium.",
      definition:
        "Six properties of the code, each tested by name:\n" +
        "- **Triplet**, **degenerate** (redundant), **unambiguous**, **non-overlapping**, **nearly universal**, with fixed **start and stop** signals.\n" +
        "- Degeneracy mostly lies in the **third base** of the codon, which also pairs loosely with the anticodon (the **wobble** position).\n" +
        "- Known exceptions to universality are small, for example human mitochondria read UGA as tryptophan instead of stop.\n" +
        "- Universality is what makes gene transfer between species possible; that technology belongs to the biotechnology chapter.",
      table: {
        columns: ["Property", "Meaning", "Example"],
        rows: [
          { cells: ["Triplet", "three bases make one codon", "AUG is one codon"] },
          { cells: ["Degenerate", "most amino acids have more than one codon", "glycine: GGU, GGC, GGA and GGG"] },
          { cells: ["Unambiguous", "each codon has only one meaning", "GGU always means glycine"] },
          { cells: ["Non-overlapping", "each base belongs to one codon, read codon after codon with no gaps", "AUGGCC is read AUG, then GCC"] },
          { cells: ["Nearly universal", "the same codons mean the same in almost all organisms", "bacteria can make human insulin from the human gene"] },
        ],
      },
      selfCheckExample: {
        prompt: "Many substitutions of the third base of a codon have no effect on the protein. Which property of the genetic code explains this?",
        options: [
          "It is universal.",
          "It is non-overlapping.",
          "It is unambiguous.",
          "The third base of a codon is never read.",
          "It is degenerate.",
        ],
        steps: [
          "Several codons for one amino acid, usually differing in the third base, is degeneracy. E is correct.",
          "Universality (A) is about organisms sharing the code. Non-overlapping (B) and unambiguous (C) are true but do not explain the effect.",
          "D is false: the third base is read; it often just does not change the meaning.",
        ],
        answer: "(E) It is degenerate.",
      },
      practiceSet: [
        { prompt: "Can one codon code for two different amino acids?", answer: "No: the code is unambiguous" },
        { prompt: "How many codons code for glycine?", answer: "Four (GGU, GGC, GGA, GGG)" },
        { prompt: "Give one exception to the universal code.", answer: "In human mitochondria UGA codes for tryptophan, not stop" },
      ],
      traps: [
        {
          title: "Degenerate is not the same as ambiguous",
          body: "Degenerate means one amino acid has several codons. Ambiguous would mean one codon has several amino acids, which never happens. The code is degenerate but unambiguous.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mol-rna-roles",
      name: "mRNA, tRNA and rRNA: structure and job of each",
      intuition:
        "Three kinds of RNA share the work. mRNA carries the message, tRNA carries the amino acids and reads the message, and rRNA with proteins forms the machine that joins the amino acids. All three are single strands made by transcription, but tRNA and rRNA fold back on themselves.",
      definition:
        "All three are **single polynucleotide strands** of ribonucleotides (ribose; A, U, G, C), made by transcription.\n" +
        "- A **codon** is on the mRNA; the matching **anticodon** is three bases on a tRNA.\n" +
        "- tRNA and rRNA fold into shapes held by **hydrogen bonds between their own bases**.\n" +
        "- DNA is used directly in transcription but not in translation; tRNA is used directly in translation but not in transcription.",
      table: {
        columns: ["RNA", "Structure", "Job"],
        rows: [
          { cells: ["mRNA (messenger)", "one linear strand of codons; in eukaryotes with a cap and a poly-A tail", "carries the gene's message from DNA to the ribosome"] },
          { cells: ["tRNA (transfer)", "one strand of about 75 to 90 nucleotides folded into a cloverleaf, with an anticodon loop; the amino acid binds the 3′ end", "brings one kind of amino acid and pairs its anticodon with the codon"] },
          { cells: ["rRNA (ribosomal)", "long strands folded and combined with proteins into the two ribosome subunits", "forms the ribosome; the rRNA of the large subunit makes the peptide bonds"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which statement about tRNA is correct?",
        options: [
          "It contains hydrogen bonds between some of its own bases.",
          "It contains thymine in place of uracil.",
          "It is made of two polynucleotide strands.",
          "It carries a codon that pairs with an anticodon on the mRNA.",
          "It is made by translation.",
        ],
        steps: [
          "tRNA folds into a cloverleaf because parts of its single strand pair with each other through hydrogen bonds. A is correct.",
          "B is wrong: RNA uses uracil. C is wrong: tRNA is one strand. D swaps the terms: the anticodon is on the tRNA. E is wrong: every RNA is made by transcription.",
        ],
        answer: "(A) It contains hydrogen bonds between some of its own bases.",
      },
      practiceSet: [
        { prompt: "Which RNA catalyses peptide bond formation?", answer: "rRNA of the large ribosomal subunit" },
        { prompt: "Which nucleic acid takes no direct part in translation?", answer: "DNA" },
        { prompt: "At which end of a tRNA is the amino acid attached?", answer: "The 3′ end" },
      ],
      traps: [
        {
          title: "Codons are on mRNA; anticodons are on tRNA",
          body: "rRNA has no anticodons, and mRNA has no anticodons. A codon is a triplet of the message; an anticodon is the complementary triplet on the tRNA that reads it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-mol-anticodons",
      name: "From DNA to mRNA codons to tRNA anticodons",
      intuition:
        "Each step is a complement. The mRNA is the complement of the template strand, and the anticodon is the complement of the mRNA codon. Two complements bring you back to the template's letters, with U in place of T.",
      definition:
        "Lined up base by base:\n" +
        "- **Codon** (mRNA, 5′→3′) = complement of the template strand.\n" +
        "- **Anticodon** (tRNA, written 3′→5′ under the codon) = complement of the codon.\n" +
        "- So the anticodons read like the **template strand**, with U for T, and the codons read like the **coding strand**, with U for T.\n" +
        "- To find the template DNA from anticodons, keep the letters and change U to T.",
      formula: {
        label: "Anticodons and the template strand",
        latex: "\\text{anticodon} = \\text{complement of the codon} = \\text{template strand with } T \\rightarrow U",
      },
      authoredExample: {
        prompt:
          "A template strand reads 3′-TAC GGA CTT-5′. Write the mRNA codons, the anticodons that read them, and the amino acids. Use: AUG = Met, CCU = Pro, GAA = Glu.",
        steps: [
          "mRNA: complement of the template, 5′-AUG CCU GAA-3′.",
          "Anticodons: complement of each codon, lined up 3′→5′: UAC, GGA, CUU. These are the template's letters with U for T.",
          "Amino acids from the codons: Met, Pro, Glu.",
        ],
        answer: "Codons AUG CCU GAA; anticodons UAC GGA CUU; Met-Pro-Glu",
      },
      selfCheckExample: {
        prompt:
          "The coding strand of a section of a gene reads 5′-ATG AAC GTA-3′. Which shows the anticodons of the tRNAs that read its mRNA, written 3′→5′ and lined up under the codons?",
        options: [
          "AUG AAC GUA",
          "TAC TTG CAT",
          "UAC UUC CAU",
          "UAC UUG CAU",
          "ATG AAC GTA",
        ],
        steps: [
          "mRNA = coding strand with U for T: 5′-AUG AAC GUA-3′.",
          "Anticodons = complements of the codons: UAC, UUG, CAU.",
          "A is the mRNA itself. B uses DNA letters (it is the template strand). C mispairs the middle G. E is the coding strand.",
        ],
        answer: "(D) UAC UUG CAU",
      },
      practiceSet: [
        { prompt: "Which anticodon (written 3′→5′) pairs with the codon 5′-GCU-3′?", answer: "CGA" },
        { prompt: "The anticodons UUA and GCC (3′→5′) are used in turn. What is the template DNA strand?", answer: "3′-TTA GCC-5′", method: "Same letters, T for U" },
        { prompt: "How many uracils are there in total in the anticodons that read the codons 5′-AAA GAC-3′?", answer: "4", method: "Anticodons UUU and CUG" },
      ],
      traps: [
        {
          title: "Anticodons match the template strand, not the coding strand",
          body: "Two complements cancel out: template → mRNA → anticodon brings you back to the template sequence, with U for T. An option that matches the coding strand describes the mRNA, not the anticodons.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mol-translation-steps",
      name: "Translation on the ribosome: initiation, elongation, termination",
      intuition:
        "The ribosome slides along the mRNA one codon at a time. At each codon the right tRNA arrives with its amino acid, the ribosome moves the growing chain onto that amino acid, and the empty tRNA leaves. A stop codon ends the process.",
      definition:
        "**Translation** is the synthesis of a polypeptide from the information in mRNA.\n" +
        "- It happens in the **cytoplasm** on ribosomes, free or on the rough ER, in prokaryotes and eukaryotes alike.\n" +
        "- Ribosomes: **70S** (30S + 50S subunits) in prokaryotes, **80S** (40S + 60S) in the eukaryotic cytoplasm.\n" +
        "- The mRNA is read **5′→3′**; the chain grows from its amino (N) end to its carboxyl (C) end.\n" +
        "- Each amino acid is joined to its tRNA by an **aminoacyl-tRNA synthetase**, using ATP; elongation uses GTP.\n" +
        "- Several ribosomes can read one mRNA at once (a **polysome**).",
      table: {
        columns: ["Stage", "What happens"],
        rows: [
          { cells: ["Initiation", "the small subunit binds the mRNA and finds AUG; the initiator tRNA carrying methionine pairs with it in the P site; the large subunit joins"] },
          { cells: ["Elongation", "a charged tRNA enters the A site; the rRNA forms a peptide bond, passing the chain onto the new amino acid; the ribosome moves one codon along and the empty tRNA leaves from the E site"] },
          { cells: ["Termination", "a stop codon reaches the A site; a release factor (a protein) binds; the polypeptide is freed and the subunits separate"] },
          { cells: ["After translation", "the chain folds; proteins for secretion, made on the rough ER, are modified in the Golgi apparatus"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which statement about translation is correct?",
        options: [
          "It takes place in the nucleus of eukaryotic cells.",
          "The ribosome reads the mRNA from the 5′ end towards the 3′ end.",
          "A tRNA pairs with each stop codon.",
          "It happens only in eukaryotic cells.",
          "Its product is an RNA molecule.",
        ],
        steps: [
          "Codons are read 5′→3′ from the start codon, so B is correct.",
          "A is wrong: translation is in the cytoplasm. C is wrong: release factors recognise stop codons.",
          "D is wrong: bacteria translate too. E describes transcription; translation makes a polypeptide.",
        ],
        answer: "(B) The ribosome reads the mRNA from the 5′ end towards the 3′ end.",
      },
      practiceSet: [
        { prompt: "What is the size of a bacterial ribosome?", answer: "70S" },
        { prompt: "Which enzyme attaches an amino acid to its tRNA?", answer: "Aminoacyl-tRNA synthetase" },
        { prompt: "Into which ribosome site does a newly arriving charged tRNA enter?", answer: "The A site" },
      ],
      traps: [
        {
          title: "Translation is in the cytoplasm, in every kind of cell",
          body: "Capping, splicing and transcription happen in the eukaryotic nucleus, but translation happens on ribosomes in the cytoplasm. It is not special to eukaryotes: bacteria translate on their own 70S ribosomes.",
        },
      ],
    },
  ],
};

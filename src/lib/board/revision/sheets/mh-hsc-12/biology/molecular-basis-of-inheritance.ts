import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Biology, Ch. 4 Molecular Basis of Inheritance. Definitions and
 * experiments checked against the Balbharati text (the book's own wording,
 * trimmed); most-asked years from the 13 board past-paper questions in the
 * bank, 2024-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Molecular Basis of Inheritance",
  chapterSlug: "molecular-basis-of-inheritance",
  source: "Balbharati Biology Std XII (Maharashtra State Board), Chapter 4",
  keyPoints: [
    {
      term: "Transforming principle (Griffith, 1928)",
      text: "Griffith used the bacterium **Streptococcus pneumoniae**. Conclusion: the harmless R strain took up a **transforming principle** from heat-killed S bacteria and became virulent; the change was genetic.",
    },
    {
      term: "Avery, MacLeod and McCarty (1944)",
      text: "Only DNA transformed R cells into S cells. Protein-digesting enzymes (**proteases**) and RNA-digesting enzymes (RNases) did not affect transformation; **DNase** stopped it. So the transforming principle is DNA.",
    },
    {
      term: "Hershey and Chase (1952)",
      text: "Bacteriophages labelled with radioactive \\(^{32}\\mathrm{P}\\) (DNA) or \\(^{35}\\mathrm{S}\\) (protein) infected E. coli. Only radioactive P entered the bacteria, so **DNA is the genetic material**, not protein.",
    },
    {
      term: "Nucleosome",
      text: "Negatively charged DNA wrapped round a positively charged **histone octamer** (two each of H2A, H2B, H3, H4). About **200 bp** per nucleosome, of which about **146 bp** wind round the octamer; the rest is linker DNA, bound by **H1**. Chromatin looks like beads-on-string.",
    },
    {
      term: "Semiconservative replication",
      text: "In each newly formed DNA molecule, **one strand is old (conserved)** and the other is newly synthesized. Proposed by Watson and Crick; proved by **Meselson and Stahl (1958)** by density gradient centrifugation.",
    },
    {
      term: "Central dogma",
      text: "The one-way flow of information from DNA to RNA to protein, postulated by F.H.C. Crick in 1958. Retroviruses copy RNA into DNA first (**reverse transcription**: Temin and Baltimore, 1970).",
    },
    {
      term: "Transcription unit",
      text: "**Promoter** (upstream, binding site for RNA polymerase), **structural gene** and **terminator** (downstream). The 3' to 5' strand is the **template**; the other strand, with the same sequence as the RNA (U for T), is the **coding (sense) strand**.",
    },
    {
      term: "Exons, introns and splicing",
      text: "Eukaryotic structural genes are interrupted by non-coding **introns**; the coding sequences are **exons**. Only exons appear in processed mRNA: introns are removed by **splicing**. Bacterial mRNA needs no processing.",
    },
    {
      term: "RNA polymerases of eukaryotes",
      text: "RNA polymerase I: rRNA. RNA polymerase II: mRNA (primary transcript, **hnRNA**). RNA polymerase III: tRNA and snRNA. Prokaryotes have only one type.",
    },
    {
      term: "Initiation and termination codons",
      text: "**AUG** is always the initiation codon; it codes for **methionine**. **UAA, UAG and UGA** are termination (stop) codons: no tRNA reads them. 64 codons in all.",
    },
    {
      term: "Operon",
      text: "A transcriptional control mechanism of gene regulation (Jacob and Monod, 1961): a stretch of DNA in which an **operator** regulates a set of **structural genes** transcribed as one (polycistronic) mRNA.",
    },
    {
      term: "Inducer of lac operon",
      text: "**Allolactose (lactose)**, a chemical in the cytoplasm. It binds and inactivates the repressor so the operator is free. It is **not a component** of the lac operon; lactose induces its own breakdown.",
    },
    {
      term: "DNA profiling (fingerprinting)",
      text: "The technique to identify a person with the help of DNA restriction analysis. First given by **Dr. Alec Jeffreys (1984)**. Used in forensic cases, disputed parentage and pedigree analysis.",
    },
    {
      term: "VNTRs",
      text: "**Variable Number of Tandem Repeats**: short sequences of 20-100 bp repeated several times. The length of the regions having VNTRs differs in each person, and is **the key factor in DNA profiling**.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Griffith's experiment: bacterium used and conclusion",
      steps: [
        "Bacterium: **Streptococcus pneumoniae**. S strain: smooth, encapsulated, virulent. R strain: rough, non-virulent.",
        "Live R injected: mice survived. Live S injected: mice died of pneumonia.",
        "Heat-killed S injected: mice survived.",
        "Heat-killed S + live R injected: **mice died**: the harmless R strain had changed into the deadly S strain.",
        "Conclusion: R bacteria took up a **transforming principle** from heat-killed S and were transformed into S; the change was genetic.",
      ],
    },
    {
      title: "Why is DNA replication called semiconservative? (Meselson and Stahl's experiment)",
      steps: [
        "Each daughter DNA keeps **one parental strand** and gets one new strand: half is conserved.",
        "E. coli grown for many generations in heavy \\(^{15}\\mathrm{N}\\) medium has heavy DNA; the cells are then moved to \\(^{14}\\mathrm{N}\\) medium.",
        "DNA is separated by density gradient centrifugation in 6M CsCl.",
        "After the first generation: one **hybrid** band (\\(^{15}\\mathrm{N}\\)-\\(^{14}\\mathrm{N}\\)).",
        "After the second generation: one hybrid and one **light** band (\\(^{14}\\mathrm{N}\\)), as the semiconservative model predicts.",
      ],
    },
    {
      title: "Describe transcription and processing of hnRNA to mRNA in eukaryotes",
      steps: [
        "RNA polymerase II binds the **promoter** and copies the template strand in the 5' to 3' direction (U pairs with A).",
        "At the **terminator** it leaves the DNA and the primary transcript, **hnRNA**, is released; it has exons and introns.",
        "**Capping**: methylated guanosine triphosphate is added at the 5' end.",
        "**Tailing**: polyadenylation (a poly A tail) at the 3' end.",
        "**Splicing**: the introns are removed and the exons joined, giving functional mRNA.",
      ],
    },
    {
      title: "Enlist the characteristics of the genetic code",
      steps: [
        "**Triplet**: three bases (a codon) code for one amino acid. **Distinct polarity**: read 5' to 3'.",
        "**Non-overlapping**: each base is part of only one codon. **Commaless**: no gap between codons.",
        "**Degenerate**: some amino acids have more than one codon (explained by the Wobble hypothesis).",
        "**Universal**: a codon means the same amino acid in almost all organisms. **Non-ambiguous**: one codon never codes two amino acids.",
        "**Initiation and termination codons**: AUG starts; UAA, UAG, UGA stop.",
      ],
    },
    {
      title: "Explain the working of the lac operon",
      steps: [
        "Parts: regulator gene (i), promoter, operator and structural genes **z, y, a** (beta-galactosidase, permease, transacetylase).",
        "No lactose: the regulator makes a **repressor**, which binds the operator; RNA polymerase cannot pass; genes are switched off.",
        "Lactose present: the **inducer** (allolactose) binds the repressor, which cannot bind the operator.",
        "RNA polymerase moves from the promoter through the operator; z, y, a are transcribed as one polycistronic mRNA and the enzymes digest lactose.",
        "When lactose falls, the repressor blocks the operator again: negative control, lactose inducing its own breakdown.",
      ],
    },
    {
      title: "Steps of DNA fingerprinting, in order",
      steps: [
        "1. **Isolation of DNA** from a little blood, hair roots or skin.",
        "2. **Restriction digestion**: restriction enzymes cut DNA into fragments of different lengths (RFLP).",
        "3. **Gel electrophoresis**: negatively charged fragments move to the positive pole by length; alkali splits dsDNA to ssDNA.",
        "4. **Southern blotting**: fragments transferred to a nitrocellulose or nylon membrane.",
        "5. **Selection of DNA probe** (radioactive ssDNA). 6. **Hybridization** with the host DNA. 7. **Photography** by autoradiography on X-ray film.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Nucleosome",
      labels: ["histone octamer (H2A, H2B, H3, H4)", "DNA wound round it", "H1 histone", "linker DNA"],
    },
    {
      title: "Griffith's experiment",
      labels: ["live R strain: mouse alive", "live S strain: mouse dead", "heat-killed S: mouse alive", "heat-killed S + live R: mouse dead"],
    },
    {
      title: "Meselson and Stahl's experiment",
      labels: ["heavy band (15N)", "hybrid band (15N-14N)", "light band (14N)", "first and second generation"],
    },
    {
      title: "Transcription and processing of hnRNA to mRNA",
      labels: ["exons and introns", "capping at 5' end", "poly A tail at 3' end", "RNA splicing", "mature mRNA"],
    },
    {
      title: "Working of lac operon",
      labels: ["regulator gene i and repressor", "promoter and operator", "structural genes z, y, a", "inducer (allolactose)", "inactivated repressor", "polycistronic mRNA"],
    },
    {
      title: "DNA fingerprinting",
      labels: ["restriction digestion", "gel electrophoresis", "Southern blotting", "DNA probes", "hybridization", "autoradiograph"],
    },
  ],
  mostAsked: [
    { topic: "DNA profiling: what it is, its key factor (VNTRs) and its steps in order", years: [2026, 2024] },
    { topic: "Transcription and processing of hnRNA to mRNA in eukaryotes", years: [2025, 2024] },
    { topic: "Nucleosome: labelled diagram, base pairs round the histone octamer", years: [2026, 2025] },
    { topic: "DNA is the genetic material: Griffith's experiment, proteases in Avery's work", years: [2026, 2024] },
    { topic: "Genetic code: characteristics, initiation codon", years: [2026, 2025] },
    { topic: "Why DNA replication is semiconservative, and who proved it", years: [2024] },
    { topic: "Lac operon: its parts (the inducer is not one)", years: [2024] },
  ],
  mistakes: [
    {
      title: "Listing the inducer as a part of the lac operon",
      body: "The operon is the regulator gene, promoter, operator and structural genes. The inducer (allolactose) is a cytoplasmic chemical acting on it, not a part of it.",
    },
    {
      title: "Steps of DNA fingerprinting out of order",
      body: "Isolation, restriction digestion, gel electrophoresis, Southern blotting, probe, hybridization, autoradiography. Blotting comes **after** electrophoresis, and hybridization after blotting.",
    },
    {
      title: "200 bp or 146 bp round the octamer?",
      body: "A nucleosome has about **200 bp**; only about **146 bp** wind round the histone octamer. The rest is linker DNA, held by H1, which is outside the octamer.",
    },
    {
      title: "Naming Watson and Crick as the proof of semiconservative replication",
      body: "Watson and Crick **proposed** it. **Meselson and Stahl (1958)** proved it experimentally.",
    },
    {
      title: "Splicing out the exons",
      body: "Splicing removes the **introns** and joins the exons. Capping is at the **5'** end, the poly A tail at the **3'** end.",
    },
  ],
};

export default sheet;

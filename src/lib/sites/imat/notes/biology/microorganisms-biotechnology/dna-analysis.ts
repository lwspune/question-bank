import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_MBT_DNA_ANALYSIS_NOTE: SubtopicNote = {
  subtopicName: "PCR, Gels and Sequencing",
  title: "PCR, Gel Electrophoresis, Probes and Sequencing",
  oneLineDefinition:
    "PCR copies a stretch of DNA by doubling it each cycle, gel electrophoresis sorts the pieces by size, probes find a sequence by base pairing, and sequencing reads the bases in order.",
  whyItMatters:
    "Only one past question sits here: a 2015 item on which probes of a DNA microarray bind a sample, which is base pairing. PCR, gels and sequencing have not been asked in this chapter yet, but they are standard syllabus and easy marks.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-mbt-pcr",
      name: "The polymerase chain reaction (PCR)",
      intuition:
        "PCR is DNA replication in a test tube, repeated over and over. Heat replaces the helicase that would unzip DNA in a cell, and a heat-proof polymerase builds the new strands. Each cycle copies every strand present, so the number of copies doubles each time: a single molecule becomes about a billion after 30 cycles.",
      definition:
        "A PCR tube contains the **template DNA**, two short single-stranded DNA **primers** (one for each end of the target), free nucleotides (**dNTPs**), a heat-stable **Taq polymerase** (from Thermus aquaticus, a hot-spring bacterium) and a buffer with magnesium ions. Each cycle has three steps:\n" +
        "- **Denaturation, about 95 °C**: hydrogen bonds break and the two strands separate.\n" +
        "- **Annealing, about 50 to 65 °C**: the primers bind (by base pairing) to their complementary sequences. This is the coolest step.\n" +
        "- **Extension, about 72 °C**: Taq polymerase adds nucleotides to the 3' end of each primer, copying the template.\n" +
        "Uses: forensic samples, diagnosing infections, cloning a gene. **RT-PCR** first copies RNA into DNA with reverse transcriptase (used to detect RNA viruses such as SARS-CoV-2). PCR was invented by Kary Mullis (1983).",
      formula: {
        label: "Copies after n cycles (ideal)",
        latex: "N = N_0 \\times 2^{n}",
        symbols: [
          { symbol: "\\(N_0\\)", meaning: "number of double-stranded copies at the start" },
          { symbol: "\\(n\\)", meaning: "number of cycles" },
          { symbol: "\\(N\\)", meaning: "number of copies after n cycles" },
        ],
      },
      authoredExample: {
        prompt:
          "A forensic sample contains a single copy of a target DNA sequence. About how many copies are there after 25 cycles of PCR, assuming perfect doubling?",
        steps: [
          "\\(N = 1 \\times 2^{25}\\).",
          "\\(2^{10} = 1024 \\approx 10^3\\), so \\(2^{25} = 2^{5} \\times 2^{10} \\times 2^{10} \\approx 32 \\times 10^6\\).",
          "Exactly, \\(2^{25} = 33\\,554\\,432 \\approx 3.4 \\times 10^7\\).",
        ],
        answer: "About \\(3.4 \\times 10^7\\) copies",
      },
      selfCheckExample: {
        prompt:
          "A PCR starts with 50 copies of a DNA fragment. Assuming the number doubles in every cycle, about how many copies are there after 10 cycles?",
        options: [
          "500",
          "\\(1.0 \\times 10^3\\)",
          "\\(2.6 \\times 10^4\\)",
          "\\(5.1 \\times 10^4\\)",
          "\\(1.0 \\times 10^5\\)",
        ],
        steps: [
          "\\(N = 50 \\times 2^{10} = 50 \\times 1024 = 51\\,200 \\approx 5.1 \\times 10^4\\). So D.",
          "A multiplies by 10 instead of \\(2^{10}\\). B forgets the 50 starting copies. C is 9 cycles and E is 11 cycles.",
        ],
        answer: "(D) \\(5.1 \\times 10^4\\)",
      },
      practiceSet: [
        { prompt: "At which step of PCR do the two DNA strands separate, and at about what temperature?", answer: "Denaturation, about 95 °C" },
        { prompt: "Why is Taq polymerase used instead of human DNA polymerase?", answer: "It is not destroyed at 95 °C", method: "It comes from a bacterium living in hot springs" },
        { prompt: "How many copies does one DNA molecule give after 4 cycles?", answer: "16", method: "\\(2^4\\)" },
        { prompt: "What is the job of the primers?", answer: "They pair with the ends of the target and give the polymerase a 3' end to extend" },
      ],
      traps: [
        {
          title: "PCR needs no helicase, and its primers are DNA",
          body: "In PCR, heat separates the strands, so no helicase is added. The primers are short pieces of DNA made in the laboratory, whereas in a living cell the primers for replication are RNA made by primase. And annealing, not extension, is the lowest temperature in the cycle.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mbt-gel",
      name: "Gel electrophoresis and DNA profiling",
      intuition:
        "Every nucleotide carries one negative phosphate group, so every DNA molecule has the same charge per unit length. In an electric field all fragments are pulled towards the positive electrode equally hard. The gel is a tangle of fibres that holds back long pieces more than short ones, so the fragments end up sorted by size alone.",
      definition:
        "- DNA is loaded into **wells** at the end of an **agarose gel** next to the **negative electrode (cathode)**.\n" +
        "- DNA is **negatively charged** (phosphate groups), so it moves towards the **positive electrode (anode)**.\n" +
        "- **Smaller fragments move further**; large ones stay near the wells.\n" +
        "- Sizes are read by comparing the bands with a **DNA ladder** of known sizes run in the next lane.\n" +
        "- DNA is invisible, so the bands are shown with a stain under UV light, or with a labelled probe.\n" +
        "- **DNA profiling** compares regions that vary greatly between people, such as **short tandem repeats (STRs)**. In a paternity test, every band of the child must match a band of the mother or of the father.\n" +
        "- Proteins can be separated the same way, in polyacrylamide gels.",
      table: {
        columns: ["Feature", "What happens", "Why"],
        rows: [
          { cells: ["Direction of movement", "Towards the positive electrode", "Phosphate groups make DNA negative"] },
          { cells: ["Distance travelled", "Short fragments travel furthest", "The gel slows long molecules more"] },
          { cells: ["Fragment nearest the wells", "The largest one", "It is held back most by the gel"] },
          { cells: ["Size of an unknown band", "Read against the DNA ladder", "Same gel, same conditions"] },
          { cells: ["Child in a paternity test", "Each band matches the mother or the father", "Half of each person's DNA comes from each parent"] },
        ],
      },
      selfCheckExample: {
        prompt: "A mixture of DNA fragments is separated by gel electrophoresis. Which fragment will be found closest to the wells at the end of the run?",
        options: [
          "The largest fragment",
          "The smallest fragment",
          "The fragment richest in G and C",
          "The fragment with the most negative charge per base",
          "None: all fragments travel the same distance, because they carry the same charge per base",
        ],
        steps: [
          "All DNA has the same charge per base, so the gel sorts by size: the largest fragment moves least and stays nearest the wells. So A.",
          "B is the reverse. C and D: base composition and charge per base do not differ enough to matter.",
          "E has the right premise but the wrong conclusion: equal charge per base is exactly why size decides.",
        ],
        answer: "(A) The largest fragment",
      },
      practiceSet: [
        { prompt: "Towards which electrode does DNA move in a gel?", answer: "The positive electrode (anode)" },
        { prompt: "What is a DNA ladder used for?", answer: "Estimating the sizes of unknown bands, by comparison" },
        { prompt: "A child has a band that the mother lacks. Where must it come from?", answer: "The biological father" },
        { prompt: "Which part of the DNA nucleotide gives the molecule its negative charge?", answer: "The phosphate group" },
      ],
      traps: [
        {
          title: "DNA runs to the positive electrode, smallest first",
          body: "DNA is negative, so it moves to the anode (positive), away from the wells at the cathode. The shortest fragments go furthest. Options with DNA moving to the negative electrode, or large fragments moving fastest, are wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-mbt-probes",
      name: "Complementary base pairing, probes and microarrays",
      intuition:
        "A probe is a short single strand of DNA with a label on it. It sticks only where the bases on the other strand pair with its own, A with T and G with C, all along its length. So a probe works as a search tool: if it lights up, the matching sequence is there.",
      definition:
        "- In DNA, **A pairs with T** (two hydrogen bonds) and **G pairs with C** (three hydrogen bonds). In RNA, U replaces T, so A pairs with U.\n" +
        "- The two strands run in opposite directions (**antiparallel**): one 5' to 3', the other 3' to 5'.\n" +
        "- A **DNA probe** is a short, labelled (fluorescent or radioactive), single-stranded DNA that **hybridises** (pairs) with its complementary sequence.\n" +
        "- A **DNA microarray** is a chip with thousands of different probes in spots. A labelled sample is washed over it; the spots whose probes are complementary to part of the sample light up. Used to test many genes or mutations at once.\n" +
        "- Because of pairing, double-stranded DNA has as much A as T and as much G as C (**Chargaff's rule**).",
      formula: {
        label: "Base pairing",
        latex: "A \\leftrightarrow T \\quad (\\text{RNA: } A \\leftrightarrow U) \\qquad G \\leftrightarrow C",
      },
      authoredExample: {
        prompt:
          "A target strand reads 5'-ACGGTTCA-3'. Write the probe that binds to it along its whole length, first lined up under the target, then written 5' to 3'.",
        steps: [
          "Pair each base in turn: A with T, C with G, G with C, G with C, T with A, T with A, C with G, A with T.",
          "Lined up under the target, the probe runs the other way: 3'-TGCCAAGT-5'.",
          "Written from its own 5' end, the same probe reads 5'-TGAACCGT-3'. Both lines describe the same molecule.",
        ],
        answer: "3'-TGCCAAGT-5', which is the same as 5'-TGAACCGT-3'",
      },
      selfCheckExample: {
        prompt:
          "A labelled single-stranded DNA sample has the sequence 5'-CATTGCAG-3'. Each probe below is written 3' to 5', lined up under the sample. Which probe binds to the sample along its whole length?",
        options: [
          "3'-CATTGCAG-5'",
          "3'-GTAACGTC-5'",
          "3'-GUAACGUC-5'",
          "3'-GTAAGCTC-5'",
          "3'-CTGCAATG-5'",
        ],
        steps: [
          "Pair base by base under C A T T G C A G: G T A A C G T C. So B.",
          "A copies the sample instead of pairing with it. C uses U, which belongs in RNA, not in a DNA probe.",
          "D swaps the C and G in the middle, so two bases fail to pair. E is the complement written backwards: with the 3' and 5' labels given, it does not line up.",
        ],
        answer: "(B) 3'-GTAACGTC-5'",
      },
      practiceSet: [
        { prompt: "Write the strand that pairs with 5'-GGATC-3', lined up underneath it.", answer: "3'-CCTAG-5'" },
        { prompt: "In RNA, which base pairs with A?", answer: "Uracil (U)" },
        { prompt: "In a sample of double-stranded DNA, 30% of the bases are A. What percentage are G?", answer: "20%", method: "T is also 30%, leaving 40% for G and C together" },
        { prompt: "What makes a probe detectable once it has bound?", answer: "Its label: a fluorescent dye or a radioactive atom" },
      ],
      traps: [
        {
          title: "A DNA probe or sticky end contains T, never U",
          body: "Uracil is found only in RNA. When asked for the bases of a DNA sticky end or a DNA probe, any answer containing U is wrong, even if the pairing is otherwise right. Work out each base by pairing with the opposite strand: A with T, G with C.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mbt-sequencing",
      name: "DNA sequencing in outline",
      intuition:
        "Sequencing reads the order of bases. The classic Sanger method makes copies of a strand that stop at random points, each ending with a labelled base. Line the copies up by length and the ending of each one, from shortest to longest, spells out the sequence.",
      definition:
        "- **Sanger (chain termination) sequencing** (1977): DNA polymerase copies the template using normal nucleotides plus a small amount of labelled **dideoxynucleotides (ddNTPs)**.\n" +
        "- A ddNTP has **no 3'-OH group**, so once it is added no further phosphodiester bond can form and the chain stops.\n" +
        "- This gives fragments of every length, each ending with a coloured base. They are separated by size (capillary electrophoresis), and the colours read from shortest to longest give the sequence of the new strand, which is the **complement** of the template.\n" +
        "- **Next-generation sequencing** reads millions of fragments in parallel, so a whole genome takes days and costs little.\n" +
        "- The **Human Genome Project** finished in 2003: about 3 billion base pairs and about 20,000 protein-coding genes.",
      table: {
        columns: ["Method or project", "Key idea", "What to remember"],
        rows: [
          { cells: ["Sanger sequencing", "Chain termination by ddNTPs", "ddNTPs lack the 3'-OH; fragments sorted by size"] },
          { cells: ["Next-generation sequencing", "Millions of fragments read at the same time", "Whole genomes quickly and cheaply"] },
          { cells: ["Human Genome Project", "First full human genome sequence, 2003", "About 3 billion base pairs, about 20,000 protein-coding genes"] },
          { cells: ["Bioinformatics", "Computers store and compare sequences", "Finds genes, mutations and relationships between species"] },
        ],
      },
      selfCheckExample: {
        prompt: "In Sanger sequencing, why does adding a dideoxynucleotide stop the growing DNA strand?",
        options: [
          "It cannot pair with any base on the template",
          "It has no phosphate group",
          "It lacks the 3'-OH group needed to form the next phosphodiester bond",
          "It cuts the template strand",
          "It contains uracil instead of thymine",
        ],
        steps: [
          "The next nucleotide is always joined to the 3'-OH of the last one. A dideoxynucleotide has no OH at the 3' carbon, so nothing can be added after it. So C.",
          "A: it does pair normally, which is why it is put in the right place. B: it does have a phosphate. D and E are invented.",
        ],
        answer: "(C) It lacks the 3'-OH group needed to form the next phosphodiester bond",
      },
      practiceSet: [
        { prompt: "How are the fragments separated in Sanger sequencing?", answer: "By size, by electrophoresis" },
        { prompt: "How is the sequence read related to the template strand?", answer: "It is the complementary sequence" },
        { prompt: "About how many base pairs are in the human genome?", answer: "About 3 billion (\\(3 \\times 10^9\\))" },
        { prompt: "In what year was the Human Genome Project completed?", answer: "2003" },
      ],
      traps: [
        {
          title: "Sanger sequencing reads the new strand",
          body: "The labelled fragments are copies made against the template, so the colours give the complementary strand. To get the template sequence, pair each base back.",
        },
      ],
    },
  ],
};

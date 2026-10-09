import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_CDR_CELL_CYCLE_NOTE: SubtopicNote = {
  subtopicName: "Cell Cycle and Mitosis",
  title: "Chromosomes, the Cell Cycle and Mitosis",
  oneLineDefinition:
    "A body cell copies its DNA, then splits it equally by mitosis, so each of the two daughter cells gets the same chromosomes as the parent.",
  whyItMatters:
    "This page and the meiosis page carry almost all of the chapter's questions. The papers from 2012 to 2022 asked for the order of the mitosis stages, what happens in anaphase, which stage a root-tip cell shows, the alleles a cell holds before and after DNA copying, and how many cells repeated divisions make.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-cdr-chromosome-structure",
      name: "Chromosome structure: chromatids, centromere and homologous pairs",
      intuition:
        "A chromosome is one long DNA molecule wound round proteins. Before a cell divides it copies every chromosome, and the two copies stay joined until the split. Body cells carry two sets of chromosomes, one from each parent, so chromosomes come in matching pairs.",
      definition:
        "Words you need for every question in this chapter:\n" +
        "- **Chromatin**: DNA wound round **histone** proteins. Loose in interphase, tightly coiled (visible) during division.\n" +
        "- **Sister chromatids**: the two identical copies of one chromosome made in S phase, joined at the **centromere**.\n" +
        "- **Kinetochore**: the protein patch on the centromere where **spindle fibres** (microtubules) attach.\n" +
        "- **Homologous chromosomes**: a pair with the same genes in the same order (one from each parent), possibly with different **alleles**.\n" +
        "- **Diploid (2n)**: two sets of chromosomes. **Haploid (n)**: one set. Humans: \\(2n = 46\\) (22 pairs of autosomes plus XX or XY), \\(n = 23\\).",
      table: {
        columns: ["Term", "What it is", "Fact IMAT tests"],
        rows: [
          { cells: ["Gene", "A section of DNA on a chromosome that codes for a product", "Each chromosome carries hundreds to thousands of genes"] },
          { cells: ["Centromere", "The joining point of two sister chromatids", "Spindle fibres attach here, at the kinetochore"] },
          { cells: ["Centriole", "A small cylinder of microtubules; two make a centrosome", "Organises the spindle in animal cells; plants have none"] },
          { cells: ["Sister chromatids", "Two copies of one chromosome after S phase", "Genetically identical (barring a copying error)"] },
          { cells: ["Homologous pair", "Two chromosomes, one from each parent, same genes", "Can carry different alleles; X and Y in a male pair only partly"] },
        ],
        caption: "A replicated chromosome is still counted as ONE chromosome. Count centromeres to count chromosomes.",
      },
      selfCheckExample: {
        prompt: "Which statement about a human chromosome at metaphase of mitosis is correct?",
        options: [
          "It is made of two sister chromatids joined at the centromere",
          "Its two chromatids carry different alleles of most genes",
          "It is attached to the spindle at a centriole",
          "It is made of DNA with no protein",
          "It lies side by side with its homologous partner",
        ],
        steps: [
          "DNA was copied in S phase, so at metaphase each chromosome is two sister chromatids held at the centromere.",
          "Sister chromatids are copies of the same DNA, so they carry the same alleles: B is wrong.",
          "Fibres attach at the kinetochore on the centromere; centrioles sit at the poles: C is wrong.",
          "Chromosomes contain histone proteins (D wrong), and homologues pair only in meiosis I (E wrong).",
        ],
        answer: "(A) It is made of two sister chromatids joined at the centromere",
      },
      practiceSet: [
        { prompt: "How many autosomes are in a human body cell?", answer: "44", method: "22 pairs" },
        { prompt: "What proteins does DNA wind round to form chromatin?", answer: "Histones" },
        { prompt: "A replicated chromosome has two chromatids. Is it counted as one chromosome or two?", answer: "One", method: "One centromere, one chromosome" },
        { prompt: "Do plant cells have centrioles?", answer: "No; they still build a spindle without them" },
      ],
      traps: [
        {
          title: "Spindle fibres attach at the centromere, not the centriole",
          body: "The names are close, and IMAT uses that. The **centromere** is on the chromosome; its kinetochore is where the fibres grip. The **centrioles** are at the poles of an animal cell and help organise the spindle. A chromosome never attaches to a centriole.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-cdr-cycle-phases",
      name: "Phases of the cell cycle and their checkpoints",
      intuition:
        "Most of a cell's life is spent in interphase, growing and copying its DNA. Division itself is short. The cell checks itself at fixed points, like a pilot's checklist, and only goes on when each check passes. Cancer starts when those checks fail.",
      definition:
        "The **cell cycle** is interphase (G1, S, G2) followed by M phase (mitosis and cytokinesis).\n" +
        "- **Interphase** takes about 90% of the cycle. DNA is copied only in **S phase**.\n" +
        "- **G0** is a resting state outside the cycle: mature nerve cells and most muscle cells stay there.\n" +
        "- **Checkpoints**: G1 (is the cell big enough, is the DNA undamaged?), G2/M (is all DNA copied correctly?), and the spindle checkpoint in metaphase (is every chromosome attached?).\n" +
        "- The cycle is driven by **cyclins** binding **cyclin-dependent kinases (CDKs)**. The protein **p53** stops the cycle when DNA is damaged and can trigger **apoptosis** (programmed cell death).\n" +
        "- **Cancer** is uncontrolled division after mutations in **proto-oncogenes** (which then become oncogenes) and **tumour suppressor genes** such as p53.",
      table: {
        columns: ["Phase", "Main events", "Chromosomes and DNA"],
        rows: [
          { cells: ["G1", "Cell grows, makes proteins and organelles", "2n chromosomes, each one chromatid; DNA content 2c"] },
          { cells: ["S", "DNA replication; centrosome duplicates", "Still 2n chromosomes, now two chromatids each; DNA rises to 4c"] },
          { cells: ["G2", "More growth, checks the copied DNA, prepares for division", "2n chromosomes, two chromatids each; 4c"] },
          { cells: ["M", "Mitosis splits the nucleus, cytokinesis splits the cytoplasm", "Each daughter: 2n, one chromatid each; 2c"] },
          { cells: ["G0", "Cell has left the cycle and does its job", "Stays at 2n and 2c"] },
        ],
        caption: "c is the DNA content of one unreplicated set of chromosomes.",
      },
      selfCheckExample: {
        prompt: "A mature neuron in an adult brain no longer divides. In which stage does it spend its life?",
        options: ["G1", "S", "G0", "G2", "Metaphase"],
        steps: [
          "A cell that has left the cycle for good is in G0, a resting state outside G1, S and G2.",
          "G1 is part of a cycle that will continue; S and G2 lead straight to division.",
          "Metaphase is a stage of mitosis, so a non-dividing cell cannot be in it.",
        ],
        answer: "(C) G0",
      },
      practiceSet: [
        { prompt: "In which phase is DNA replicated?", answer: "S phase" },
        { prompt: "Which phases together make interphase?", answer: "G1, S and G2" },
        { prompt: "Name the protein that halts the cycle when DNA is damaged.", answer: "p53" },
        { prompt: "What is programmed cell death called?", answer: "Apoptosis" },
      ],
      traps: [
        {
          title: "Interphase is not a resting phase",
          body: "Older books call interphase resting, but the cell is busy: it grows, copies its DNA and checks it. The true resting state is G0, which is outside the cycle.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-cdr-mitosis-stages",
      name: "The stages of mitosis in order: prophase, metaphase, anaphase, telophase",
      intuition:
        "Mitosis is a sorting job. First pack the long DNA threads into short chromosomes, line them up in the middle, pull each one apart into its two copies, then wrap a new nucleus round each group. Remember the order as PMAT, then cytokinesis.",
      definition:
        "**Mitosis** divides one nucleus into two genetically identical nuclei with the same chromosome number as the parent.\n" +
        "- It is used for **growth**, **repair**, and **asexual reproduction** in eukaryotes.\n" +
        "- **Cytokinesis** (division of the cytoplasm) follows it, usually starting in late anaphase or telophase.\n" +
        "- In animal cells a **cleavage furrow** pinches the cell in two; in plant cells a **cell plate** forms from Golgi vesicles and becomes the new wall.\n" +
        "- Root tips and shoot tips (meristems) are where plant cells divide, so they are used to see mitosis under a microscope.",
      table: {
        columns: ["Stage", "What happens", "How to spot it"],
        rows: [
          { cells: ["Prophase", "Chromatin condenses into visible chromosomes; nucleolus disappears; spindle forms; nuclear envelope breaks down at the end", "Thick threads inside or just leaving the nucleus"] },
          { cells: ["Metaphase", "Chromosomes line up singly on the equator; fibres from both poles attach to each kinetochore", "One straight line of chromosomes across the middle"] },
          { cells: ["Anaphase", "Centromeres split; sister chromatids are pulled to opposite poles as the fibres shorten", "Two V-shaped groups moving apart"] },
          { cells: ["Telophase", "Chromosomes reach the poles and uncoil; nuclear envelopes and nucleoli reform; spindle breaks down", "Two clusters at the ends, new nuclei forming"] },
          { cells: ["Cytokinesis", "Cytoplasm divides: furrow in animals, cell plate in plants", "Two separate daughter cells"] },
        ],
        caption: "Some books add prometaphase (envelope breaks, fibres attach) between prophase and metaphase.",
      },
      selfCheckExample: {
        prompt:
          "In an onion root tip, a cell shows its chromosomes in a single straight line across the middle, with no nuclear envelope. Which stage of mitosis comes straight after the one shown?",
        options: ["Prophase", "Anaphase", "Telophase", "Interphase", "Metaphase"],
        steps: [
          "A single line of chromosomes on the equator is metaphase.",
          "The next stage is anaphase, when the sister chromatids separate and move to the poles.",
          "Telophase comes after anaphase; prophase and interphase come before metaphase; E names the stage shown, not the next one.",
        ],
        answer: "(B) Anaphase",
      },
      practiceSet: [
        { prompt: "In which stage do the nuclear envelopes reform?", answer: "Telophase" },
        { prompt: "In which stage do sister chromatids separate?", answer: "Anaphase" },
        { prompt: "Which stage is best for counting chromosomes under a microscope?", answer: "Metaphase", method: "Chromosomes are most condensed and spread in one line" },
        { prompt: "How does cytokinesis differ in a plant cell?", answer: "A cell plate forms in the middle instead of a cleavage furrow" },
      ],
      traps: [
        {
          title: "In mitosis, chromatids separate, not homologous pairs",
          body: "Homologous chromosomes never pair up in mitosis. Each chromosome lines up on its own and is split into its two sister chromatids in anaphase. Pairs of homologues lining up and separating is meiosis I.",
        },
        {
          title: "DNA is copied before mitosis, not during it",
          body: "DNA replication happens in S phase of interphase. An option placing DNA copying in prophase or anaphase is wrong: by prophase each chromosome already has two chromatids.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-cdr-cycle-counting",
      name: "Counting cells, chromosomes, chromatids and DNA through mitosis",
      intuition:
        "Each round of mitosis doubles the number of cells, so the count grows as a power of 2. Inside each cell, the DNA doubles in S phase and halves again when the cell splits, but the chromosome number never changes. The alleles behave like the DNA: they are copied, so a cell that was Aa becomes AAaa until it divides.",
      definition:
        "Three counts to keep apart:\n" +
        "- **Chromosomes**: count the centromeres. Through mitosis the number stays at the parent's (2n stays 2n).\n" +
        "- **Chromatids**: one per chromosome in G1, two per chromosome from S phase to metaphase.\n" +
        "- **DNA content** (c): 2c in G1, 4c after S, back to 2c in each daughter cell.\n" +
        "- **Alleles**: a heterozygous cell is Aa in G1 and AAaa after S phase (each allele now on two sister chromatids). Each daughter is Aa again.\n" +
        "- **Cell number**: starting with one cell, after \\(k\\) rounds of division there are \\(2^k\\) cells (if none die).",
      formula: {
        label: "Cells after k rounds of mitosis",
        latex: "N = N_0 \\times 2^{k}",
        symbols: [
          { symbol: "\\(N_0\\)", meaning: "number of cells at the start" },
          { symbol: "\\(k\\)", meaning: "number of rounds of division" },
          { symbol: "\\(N\\)", meaning: "number of cells at the end" },
        ],
      },
      authoredExample: {
        prompt:
          "A plant cell has 12 chromosomes and 10 pg of DNA in G1. It divides by mitosis 6 times and every cell survives. Give the chromosomes and DNA of one cell in G2, and the number of cells at the end.",
        steps: [
          "In G2 the DNA has been copied: \\(2 \\times 10 = 20\\ \\text{pg}\\). The chromosome number is still 12, each with two chromatids (24 chromatids).",
          "Cells after 6 rounds: \\(2^6 = 64\\).",
          "Each of the 64 cells has 12 chromosomes and, in G1, 10 pg of DNA, just like the first cell.",
        ],
        answer: "G2: 12 chromosomes, 24 chromatids, 20 pg DNA; 64 cells at the end",
      },
      selfCheckExample: {
        prompt:
          "A body cell of an animal with \\(2n = 20\\) is heterozygous, Bb, for one gene. Which row describes this cell in G2?",
        options: [
          "40 chromosomes, 40 chromatids, alleles BBbb",
          "20 chromosomes, 20 chromatids, alleles Bb",
          "10 chromosomes, 20 chromatids, alleles B or b",
          "20 chromosomes, 40 chromatids, alleles BBbb",
          "40 chromosomes, 80 chromatids, alleles BBbb",
        ],
        steps: [
          "After S phase the chromosome number stays 20, but each now has two chromatids: 40 chromatids.",
          "Each allele was copied with its chromatid, so the cell holds BBbb.",
          "A doubles the chromosome count by counting chromatids as chromosomes; B describes G1; C halves the number, as if the cell were a gamete; E doubles everything twice.",
        ],
        answer: "(D) 20 chromosomes, 40 chromatids, alleles BBbb",
      },
      practiceSet: [
        { prompt: "One cell divides by mitosis 5 times. How many cells result?", answer: "32", method: "\\(2^5\\)" },
        { prompt: "Three cells each divide 4 times. How many cells result?", answer: "48", method: "\\(3 \\times 2^4\\)" },
        { prompt: "What is the fewest rounds of division that turns one cell into at least 500 cells?", answer: "9", method: "\\(2^8 = 256\\), \\(2^9 = 512\\)" },
        { prompt: "A cell has 8 pg of DNA in G2. How much does each daughter cell have after mitosis?", answer: "4 pg", method: "G2 is 4c; each daughter gets 2c" },
      ],
      traps: [
        {
          title: "Ten divisions do not make ten or twenty cells",
          body: "Every cell divides each round, so the count doubles every time: 2, 4, 8, 16 and so on. The total after k rounds is \\(2^k\\), not \\(k + 1\\) or \\(2k\\).",
        },
        {
          title: "Copying DNA does not double the chromosome number",
          body: "After S phase a human cell still has 46 chromosomes, but 92 chromatids and twice the DNA. Counting each chromatid as a chromosome is the classic wrong row in IMAT tables.",
        },
      ],
    },
  ],
};

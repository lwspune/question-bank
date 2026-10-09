import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_MOL_REGULATION_NOTE: SubtopicNote = {
  subtopicName: "Genome and Gene Regulation",
  title: "The Genome, Chromatin and the Control of Genes",
  oneLineDefinition:
    "Eukaryotic DNA is packed round histones into chromatin, and every cell switches on only the genes it needs: bacteria with operons, eukaryotes at several levels.",
  whyItMatters:
    "The 2024 ministry paper asked what a prokaryotic operon is. Older papers asked what regulates gene expression (2012) and how chromosomes, nucleosomes and histones rank by size (2020).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-mol-chromatin",
      name: "Chromatin packing and the organisation of the genome",
      intuition:
        "Each human cell holds about 2 m of DNA in a nucleus a few micrometres wide. It fits because the DNA is wound round protein spools, the histones, and the spools are coiled and looped again and again. The tighter the packing, the harder it is for RNA polymerase to reach a gene.",
      definition:
        "The **genome** is all the DNA of an organism.\n" +
        "- **Human** nuclear genome: about \\(3.2 \\times 10^9\\) base pairs per haploid set, on 46 chromosomes in a body cell (22 pairs of autosomes plus XX or XY). The X chromosome is much larger than the Y.\n" +
        "- Only about 1 to 2% of human DNA codes for protein, in roughly 20000 genes; the rest is introns, regulatory sequences, repeated sequences and genes for RNA.\n" +
        "- **Histones** are small proteins, positively charged, so they bind the negatively charged phosphates of DNA.\n" +
        "- **Euchromatin** is loosely packed and actively transcribed; **heterochromatin** is tightly packed and mostly silent.\n" +
        "- **Prokaryotes**: usually one circular chromosome in the nucleoid, not wrapped round histones, little non-coding DNA, often extra small circles called **plasmids**. Mitochondria and chloroplasts also have their own circular DNA.",
      table: {
        columns: ["Level", "What it is", "Approximate size"],
        rows: [
          { cells: ["Histone", "one small protein; eight (two each of H2A, H2B, H3, H4) form a core", "a few nanometres"] },
          { cells: ["Nucleosome", "about 147 base pairs of DNA wound nearly twice round a histone core", "about 10 nm across ('beads on a string')"] },
          { cells: ["Chromatin fibre", "nucleosomes packed together, helped by histone H1", "about 30 nm thick"] },
          { cells: ["Looped domains", "the fibre folded in loops on a protein scaffold", "a few hundred nanometres"] },
          { cells: ["Metaphase chromosome", "the most condensed form: two sister chromatids", "about 1 µm wide and several µm long"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which statement about chromatin is correct?",
        options: [
          "Histones are negatively charged, which lets them bind DNA.",
          "A nucleosome is a stretch of DNA wound round a core of eight histone proteins.",
          "Heterochromatin is loosely packed and actively transcribed.",
          "Bacterial DNA is wound round histones inside a nucleus.",
          "Most of the human genome codes for proteins.",
        ],
        steps: [
          "The nucleosome is DNA wrapped round a histone octamer, so B is correct.",
          "A is wrong: histones are positive, which is why they attract the negative DNA. C describes euchromatin.",
          "D is wrong: bacteria have no nucleus and no histone spools. E is wrong: only about 1 to 2% codes for protein.",
        ],
        answer: "(B) A nucleosome is a stretch of DNA wound round a core of eight histone proteins.",
      },
      practiceSet: [
        { prompt: "How many chromosomes are there in a human sperm cell?", answer: "23" },
        { prompt: "Which is larger, a nucleosome or a single histone?", answer: "A nucleosome (it contains eight histones plus DNA)" },
        { prompt: "Which form of chromatin is usually being transcribed?", answer: "Euchromatin" },
      ],
      traps: [
        {
          title: "Rank the packing levels by what contains what",
          body: "A chromosome contains many nucleosomes, and each nucleosome contains eight histones, so chromosome > nucleosome > histone. Options that put a histone above a nucleosome reverse the nesting.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mol-lac-operon",
      name: "The lac operon: switching bacterial genes on with lactose",
      intuition:
        "A bacterium should only make the enzymes for digesting lactose when lactose is there and better food is not. The three lactose genes sit side by side under one switch. A repressor blocks the switch until lactose arrives and pulls the repressor off.",
      definition:
        "An **operon** is a functional unit of prokaryotic DNA: a group of adjacent genes, controlled together and transcribed from one promoter into one mRNA, together with the regulatory sequences.\n" +
        "- The **lac operon** of E. coli has a **promoter**, an **operator** and three structural genes: lacZ (β-galactosidase, which splits lactose into glucose and galactose), lacY (permease, which takes lactose in) and lacA (transacetylase).\n" +
        "- A separate regulatory gene, **lacI**, with its own promoter, makes the **repressor** all the time.\n" +
        "- Lactose (as **allolactose**) binds the repressor and changes its shape, so it leaves the operator: the operon is **inducible**.\n" +
        "- With glucose present, little cAMP is made, so the activator CAP does not help RNA polymerase and transcription stays low.\n" +
        "- The **trp operon** is the opposite case, **repressible**: when tryptophan is plentiful it activates the repressor and the genes switch off.",
      table: {
        columns: ["Lactose", "Glucose", "Repressor", "Transcription of lacZ, lacY, lacA"],
        rows: [
          { cells: ["absent", "present or absent", "bound to the operator", "off"] },
          { cells: ["present", "present", "released (allolactose bound)", "low (no help from CAP)"] },
          { cells: ["present", "absent", "released (allolactose bound)", "high (cAMP and CAP help RNA polymerase bind)"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "In an E. coli cell, a mutation in lacI produces a repressor that can no longer bind the operator. Glucose and lactose are both absent. What happens to the lac genes?",
        options: [
          "They are not transcribed, because no lactose is present.",
          "Only lacZ is transcribed.",
          "The faulty repressor binds lactose instead and blocks the promoter.",
          "The operator is removed from the DNA.",
          "They are transcribed even though no lactose is present.",
        ],
        steps: [
          "The repressor is the only thing keeping the operon off when lactose is absent. If it cannot bind the operator, nothing blocks RNA polymerase.",
          "With no glucose, cAMP and CAP also help, so the genes are transcribed. E is correct.",
          "A assumes the switch still works. B is wrong: the three genes share one mRNA. C and D invent events that do not happen.",
        ],
        answer: "(E) They are transcribed even though no lactose is present.",
      },
      practiceSet: [
        { prompt: "Which molecule acts as the inducer of the lac operon?", answer: "Allolactose (formed from lactose)" },
        { prompt: "Is the lac operon inducible or repressible?", answer: "Inducible" },
        { prompt: "Which enzyme does lacZ code for?", answer: "β-galactosidase" },
      ],
      traps: [
        {
          title: "The repressor gene is outside the operon and always active",
          body: "lacI has its own promoter and makes the repressor all the time. Lactose does not stop its production; it binds the repressor and changes its shape so that it falls off the operator.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mol-eukaryotic-control",
      name: "Control of gene expression in eukaryotes, in outline",
      intuition:
        "All your body cells carry the same genome, yet a liver cell and a nerve cell make very different proteins. They differ in which genes they use. Eukaryotes have no operons; instead they control each gene at several steps between DNA and finished protein, mostly at transcription.",
      definition:
        "**Gene expression** is the use of a gene's information to make an RNA or protein. In eukaryotes it is controlled at several levels:\n" +
        "- The main point of control is transcription, through **transcription factors** binding the promoter and distant **enhancers** (activate) or **silencers** (repress).\n" +
        "- **Differentiation** comes from cells expressing different subsets of the same genes; they do not lose the genes they do not use.\n" +
        "- Some hormones act this way: a **steroid hormone** enters the cell and binds a receptor that works as a transcription factor.\n" +
        "- **Housekeeping genes** (for example those for glycolysis enzymes) are expressed in almost every cell.",
      table: {
        columns: ["Level", "How expression is controlled"],
        rows: [
          { cells: ["Chromatin", "acetylating histones loosens chromatin and allows transcription; methylating DNA silences genes"] },
          { cells: ["Transcription", "transcription factors bind promoters, enhancers and silencers to switch genes on or off"] },
          { cells: ["RNA processing", "alternative splicing chooses which exons enter the mRNA"] },
          { cells: ["mRNA lifetime and translation", "microRNAs and the length of the poly-A tail decide how long an mRNA lasts and how often it is read"] },
          { cells: ["Protein", "proteins are activated by modification (for example phosphorylation) or destroyed by the proteasome"] },
        ],
      },
      selfCheckExample: {
        prompt: "A liver cell and a nerve cell from the same person make very different sets of proteins. What is the best explanation?",
        options: [
          "They contain different genes.",
          "One of them has lost its introns.",
          "They express different subsets of the same genes, controlled largely by transcription factors.",
          "They use different genetic codes.",
          "Nerve cells have no promoters.",
        ],
        steps: [
          "Both cells carry the same genome; they switch on different genes. C is correct.",
          "A is the common misconception: differentiated cells keep all their genes. B, D and E are false: introns stay in the DNA, the code is the same, and every gene has a promoter.",
        ],
        answer: "(C) They express different subsets of the same genes, controlled largely by transcription factors.",
      },
      practiceSet: [
        { prompt: "Does acetylating histones usually switch genes on or off?", answer: "On, by loosening the chromatin" },
        { prompt: "What kind of protein binds an enhancer to increase transcription?", answer: "A transcription factor (an activator)" },
        { prompt: "Which process lets one gene give several different proteins?", answer: "Alternative splicing" },
      ],
      traps: [
        {
          title: "Transcription factors regulate genes; RNA polymerase only transcribes them",
          body: "RNA polymerase is needed for every gene and does not choose which genes are used. Gene expression is regulated by transcription factors (and by chromatin, splicing and the other levels), not by replication factors or by organelles such as the rough ER.",
        },
      ],
    },
  ],
};

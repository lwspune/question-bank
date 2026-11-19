import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_MB_GENOME_NOTE: SubtopicNote = {
  subtopicName: "Human Genome Project and DNA Fingerprinting",
  title: "Human Genome Project and DNA Fingerprinting",
  oneLineDefinition:
    "The goals, methods and findings of the Human Genome Project, and how DNA fingerprinting uses repetitive DNA, satellite DNA and VNTRs to tell people apart.",
  whyItMatters:
    "Six NEET questions from 2021 to 2026. Three are on the Human Genome Project (sequence annotation in NEET 2022, ESTs in NEET 2023, the chromosome with most genes in NEET 2025) and three on DNA fingerprinting (repetitive DNA in NEET 2021, DNA polymorphism in NEET 2022, the order of its steps in NEET 2026). Each turns on one exact NCERT term or number.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbomb-hgp",
      name: "The Human Genome Project",
      intuition:
        "The Human Genome Project set out to read all three billion base pairs of human DNA. It took two routes: one read only the genes that are switched on, the other read everything and worked out the meaning afterwards. Its biggest surprise was how little of our DNA codes for protein, and how few genes we have.",
      definition:
        "What NCERT says:\n" +
        "- Launched in **1990**, completed in **2003**: a **13-year** project coordinated by the **U.S. Department of Energy** and the **National Institute of Health**; the **Wellcome Trust (U.K.)** became a major partner, with help from Japan, France, Germany, China and others.\n" +
        "- Goals included identifying all the approximately **20,000 to 25,000 genes** and the sequence of the **3 billion** base pairs, storing it in databases and addressing the ethical, legal and social issues (ELSI). At about US **$3 per bp**, the cost was estimated at **9 billion US dollars**; typed in books of 1000 pages with 1000 letters a page, it would fill **3300 books**.\n" +
        "- **Two approaches**: identifying all the genes that are **expressed as RNA**, the **Expressed Sequence Tags (ESTs)**; and the **blind approach** of sequencing the whole genome, coding and non-coding, and later assigning functions: **Sequence Annotation**.\n" +
        "- DNA was cut into random fragments and cloned in **bacteria and yeast** using **BAC (bacterial artificial chromosomes)** and **YAC (yeast artificial chromosomes)**. Fragments were read by automated sequencers based on **Frederick Sanger**'s method and arranged by their overlapping regions. **Chromosome 1** was the last to be completed, in **May 2006**.\n" +
        "- Non-human organisms sequenced too: bacteria, yeast, *Caenorhabditis elegans*, *Drosophila*, rice and *Arabidopsis*.",
      table: {
        columns: ["Finding", "Value"],
        rows: [
          { cells: ["Total bases in the human genome", "3164.7 million nucleotide bases"] },
          { cells: ["Total number of genes", "About 30,000 (earlier estimates 80,000 to 1,40,000)"] },
          { cells: ["Average gene", "3000 bases"] },
          { cells: ["Largest known human gene", "Dystrophin, 2.4 million bases"] },
          { cells: ["Bases the same in all people", "99.9 per cent"] },
          { cells: ["Genes of unknown function", "Over 50 per cent of those discovered"] },
          { cells: ["Part of the genome coding for proteins", "Less than 2 per cent"] },
          {
            cells: ["Chromosome with most genes", "Chromosome 1, with 2968 genes"],
            noteAmber: "NEET 2025: chromosome 1 has the highest number of genes.",
            pyqExampleId: "ede3196b-dddc-48ee-8b0e-1a61435594bd",
          },
          { cells: ["Chromosome with fewest genes", "Y, with 231 genes"] },
          { cells: ["Single nucleotide polymorphisms (SNPs)", "About 1.4 million locations"] },
          {
            cells: ["Sequence everything, assign functions later", "Sequence Annotation"],
            noteAmber: "NEET 2022: the blind approach of sequencing the whole genome and then assigning functions is sequence annotation.",
            pyqExampleId: "825df7c5-d8bb-4273-9dfd-f3703e81c43b",
          },
        ],
      },
      pyqExampleId: "4564debd-9362-4daa-b156-bb3e2ee165d9",
      selfCheckExample: {
        prompt: "For sequencing in the Human Genome Project, DNA fragments were cloned in two kinds of host using two kinds of vector. Name both hosts and both vectors.",
        steps: [
          "The hosts were bacteria and yeast.",
          "The vectors were the bacterial artificial chromosome (BAC) and the yeast artificial chromosome (YAC).",
        ],
        answer: "Hosts: bacteria and yeast. Vectors: BAC and YAC.",
      },
      practiceSet: [
        { prompt: "In which years did the Human Genome Project begin and end?", answer: "Began in 1990, completed in 2003" },
        { prompt: "Which human chromosome has the fewest genes, and how many?", answer: "The Y chromosome, with 231 genes" },
        { prompt: "Name the largest known human gene and its size.", answer: "Dystrophin, 2.4 million bases" },
        { prompt: "What part of the human genome codes for proteins?", answer: "Less than 2 per cent" },
        { prompt: "On whose method did the automated DNA sequencers of the Human Genome Project work?", answer: "Frederick Sanger's" },
        { prompt: "At about how many locations do single-base DNA differences (SNPs) occur in humans?", answer: "About 1.4 million" },
      ],
      traps: [
        {
          title: "ESTs are expressed as RNA",
          body: "**ESTs** are the genes **expressed as RNA**, not as protein, and not all genes whether expressed or not. Sequencing everything first and finding functions later is **sequence annotation**.",
        },
        {
          title: "Most genes on 1, fewest on Y",
          body: "**Chromosome 1** has the most genes (**2968**); the **Y** has the fewest (**231**). Neither the X nor any other autosome holds the record.",
        },
        {
          title: "Fewer genes than expected",
          body: "The genome has about **30,000** genes, far fewer than the earlier estimates of 80,000 to 1,40,000, and **less than 2 per cent** of it codes for protein.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbomb-fingerprinting",
      name: "DNA fingerprinting",
      visualizationSlug: "imat-gel-electrophoresis",
      intuition:
        "People share 99.9 per cent of their DNA, so comparing whole genomes tells us little. Fingerprinting looks instead at short stretches repeated many times, because the number of repeats differs from person to person. The pattern of repeat lengths is the same in every tissue of one person and is inherited from the parents, which makes it useful in crime cases and paternity tests.",
      definition:
        "What NCERT says:\n" +
        "- DNA fingerprinting identifies differences in specific regions called **repetitive DNA**, where a small stretch of DNA is repeated many times.\n" +
        "- In density gradient centrifugation the bulk DNA forms a **major peak** and the repetitive DNA forms small peaks called **satellite DNA**. By base composition, length and number of repeats, satellite DNA is classed as **micro-satellites, mini-satellites** and so on. These do not usually code for protein but form a large part of the genome.\n" +
        "- These sequences show a **high degree of polymorphism**, which is the basis of DNA fingerprinting. DNA from **every tissue** (blood, hair follicle, skin, bone, saliva, sperm) of one person shows the same polymorphism, so it is used in **forensics**; being inherited, it is the basis of **paternity testing**.\n" +
        "- Polymorphism arises by **mutation**. An inheritable mutation found in a population at high frequency (**more than 0.01**) is a **DNA polymorphism**. Polymorphism is the basis of **genetic mapping** of the human genome as well as of **DNA fingerprinting**.\n" +
        "- The technique was developed by **Alec Jeffreys**, using as probe a satellite DNA with very high polymorphism, the **Variable Number of Tandem Repeats (VNTR)**, a **mini-satellite**. VNTR size varies from **0.1 to 20 kb**.\n" +
        "- Steps: (i) isolate DNA; (ii) digest it with **restriction endonucleases**; (iii) separate fragments by **electrophoresis**; (iv) **blot** them onto nitrocellulose or nylon membranes; (v) **hybridise** with a labelled VNTR probe; (vi) detect hybridised fragments by **autoradiography**. **PCR** increases the sensitivity of the technique.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          {
            cells: ["Repetitive DNA", "Regions where a small stretch of DNA is repeated many times; the regions compared in fingerprinting"],
            noteAmber: "NEET 2021: DNA fingerprinting identifies differences in regions called repetitive DNA.",
            pyqExampleId: "f285d272-3a91-4a8b-aa91-e4de888682a2",
          },
          { cells: ["Satellite DNA", "Repetitive DNA forming small peaks beside the major peak of bulk DNA in density gradient centrifugation"] },
          { cells: ["VNTR", "Variable Number of Tandem Repeats; a mini-satellite of 0.1 to 20 kb, used as the probe"] },
          { cells: ["DNA polymorphism", "An inheritable mutation at a frequency above 0.01 in a population"] },
          { cells: ["SNP", "Single nucleotide polymorphism: a single-base difference in DNA between people"] },
        ],
      },
      pyqExampleId: "9072cfa7-59d1-4394-80bb-c864973e2e87",
      selfCheckExample: {
        prompt: "Put these steps of DNA fingerprinting in order: hybridisation with a VNTR probe, digestion with restriction enzymes, autoradiography, isolation of DNA, blotting, electrophoresis.",
        steps: [
          "First get the DNA: isolation.",
          "Cut it into fragments: digestion with restriction enzymes.",
          "Separate the fragments by size: electrophoresis.",
          "Move them onto a membrane: blotting.",
          "Find the matching fragments: hybridisation with a labelled VNTR probe, then autoradiography.",
        ],
        answer: "Isolation, digestion, electrophoresis, blotting, hybridisation, autoradiography.",
      },
      practiceSet: [
        { prompt: "Who first developed the technique of DNA fingerprinting?", answer: "Alec Jeffreys" },
        { prompt: "To which class of satellite DNA does VNTR belong?", answer: "Mini-satellite" },
        { prompt: "What is the size range of a VNTR?", answer: "0.1 to 20 kb" },
        { prompt: "Above what frequency in a population is an inheritable mutation called a DNA polymorphism?", answer: "0.01" },
        { prompt: "Which technique is used to increase the sensitivity of DNA fingerprinting?", answer: "PCR (polymerase chain reaction)" },
        { prompt: "Onto which membranes are the separated DNA fragments blotted?", answer: "Nitrocellulose or nylon" },
      ],
      traps: [
        {
          title: "Repetitive DNA, not genes",
          body: "Fingerprinting compares **repetitive DNA**, stretches that normally do **not** code for protein. Satellite DNA and VNTRs are kinds of repetitive DNA; the NCERT name for the regions is repetitive DNA.",
        },
        {
          title: "Satellite peaks are the small ones",
          body: "In density gradient centrifugation, bulk DNA forms the **major** peak and **satellite DNA** the **small** peaks.",
        },
        {
          title: "Same pattern in every tissue",
          body: "Blood, hair follicle, skin, bone, saliva and sperm of one person all give the **same** DNA fingerprint. That is why any tissue left at a crime scene can be used.",
        },
      ],
    },
  ],
};

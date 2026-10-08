import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_MOL_REPLICATION_NOTE: SubtopicNote = {
  subtopicName: "DNA Replication",
  title: "DNA Replication: Semi-conservative Copying",
  oneLineDefinition:
    "Before a cell divides it copies its DNA: the helix is unzipped and each old strand is the template for a new partner, so every copy keeps one old strand.",
  whyItMatters:
    "Replication has been asked as a labelled-strand calculation over several rounds (2015), as a comparison with transcription (2020) and as a plain definition in the 2024 ministry paper. The 2026 paper asked about the history of the double helix.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-mol-semiconservative",
      name: "Semi-conservative replication and counting labelled strands",
      intuition:
        "Unzip a ladder down the middle and build a new half onto each old half: you get two ladders, each half old and half new. Old strands are never destroyed. After many rounds the two original strands still exist, but they are spread into just two of the many molecules.",
      definition:
        "**Replication** uses each strand of DNA as a template to build a new complementary strand.\n" +
        "- It is **semi-conservative**: each daughter molecule has one parental strand and one new strand.\n" +
        "- Starting from one molecule, after n rounds there are \\(2^n\\) molecules and \\(2^{n+1}\\) strands.\n" +
        "- The 2 original strands are always in exactly 2 molecules (as long as both are labelled the same way).\n" +
        "- **Meselson and Stahl** (1958) grew bacteria on heavy nitrogen (¹⁵N), moved them to light nitrogen (¹⁴N) and separated the DNA by density: after one round all DNA was of intermediate density; after two rounds, half intermediate and half light.",
      formula: {
        label: "Molecules after n rounds",
        latex: "\\text{molecules} = 2^n, \\qquad \\text{fraction holding an original strand} = \\frac{2}{2^n}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of rounds of replication" },
        ],
      },
      authoredExample: {
        prompt:
          "A bacterium whose DNA contains only ¹⁵N is moved to a medium with only ¹⁴N. After two rounds of replication, what fractions of the DNA molecules are heavy (both strands ¹⁵N), intermediate (one of each) and light (both ¹⁴N)?",
        steps: [
          "Round 1: each heavy molecule gives 2 molecules, each with one ¹⁵N strand and one new ¹⁴N strand. All intermediate.",
          "Round 2: \\(2^2 = 4\\) molecules. The two ¹⁵N strands sit in 2 of them, each paired with a new ¹⁴N strand.",
          "The other 2 molecules are made from the ¹⁴N strands of round 1 and new ¹⁴N strands, so they are light.",
          "No molecule can be heavy again, because every new strand is ¹⁴N.",
        ],
        answer: "Heavy 0, intermediate \\(\\tfrac{1}{2}\\), light \\(\\tfrac{1}{2}\\)",
      },
      selfCheckExample: {
        prompt:
          "A DNA molecule with both strands labelled with ¹⁵N replicates five times in a medium containing only ¹⁴N. What percentage of the resulting DNA molecules contain any ¹⁵N?",
        options: ["50%", "12.5%", "6.25%", "3.125%", "0%"],
        steps: [
          "After 5 rounds there are \\(2^5 = 32\\) molecules.",
          "The two original ¹⁵N strands are in 2 of them: \\(2/32 = 6.25\\%\\).",
          "D counts strands instead of molecules (2 of 64). B is the answer after 4 rounds. A is the answer after 2 rounds. E forgets that old strands are kept.",
        ],
        answer: "(C) 6.25%",
      },
      practiceSet: [
        { prompt: "After one round of replication in ¹⁴N, what density is all the DNA of a fully ¹⁵N bacterium?", answer: "Intermediate (hybrid)" },
        { prompt: "What would a conservative model predict after one round instead?", answer: "Half heavy and half light, with no intermediate band" },
        { prompt: "One molecule replicates 3 times. What fraction of all the strands are original strands?", answer: "\\(\\tfrac{1}{8}\\) (12.5%)", method: "2 old strands out of \\(2 \\times 2^3 = 16\\)" },
      ],
      traps: [
        {
          title: "Molecules and strands give different fractions",
          body: "After n rounds there are \\(2^n\\) molecules but \\(2^{n+1}\\) strands. The 2 original strands are \\(2/2^n\\) of the molecules but only \\(2/2^{n+1}\\) of the strands. Check which one the question asks for.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mol-replication-enzymes",
      name: "The enzymes of DNA replication and what each one does",
      intuition:
        "Copying DNA is a production line. One enzyme opens the helix, others keep it open and relieve the twisting, one lays a short starter, the polymerase builds the new strand, and a last enzyme seals the gaps. Each step either breaks or makes a particular bond, which is what IMAT options test.",
      definition:
        "Replication begins at **origins of replication**: one on a bacterial circular chromosome, thousands along each eukaryotic chromosome. Each origin opens into a bubble with two **replication forks**.\n" +
        "- **DNA polymerase** cannot start a strand: it needs a **primer** with a free 3′ end, made of RNA.\n" +
        "- It adds nucleotides only to the **3′ end**, so every new strand grows **5′→3′**.\n" +
        "- The raw materials are deoxyribonucleoside triphosphates; releasing two of their phosphates supplies the energy.\n" +
        "- DNA polymerase **proofreads**. After proofreading and repair only about 1 base in \\(10^9\\) to \\(10^{10}\\) is wrong.\n" +
        "- In eukaryotes replication happens in the **S phase** of interphase. Eukaryotic polymerases have other names (α, δ, ε) but do the same jobs.",
      table: {
        columns: ["Enzyme or protein", "Job", "Bond made or broken"],
        rows: [
          { cells: ["Helicase", "unwinds the helix at the fork and separates the strands", "breaks hydrogen bonds between bases"] },
          { cells: ["Topoisomerase (DNA gyrase in bacteria)", "relieves the over-twisting ahead of the fork", "cuts and rejoins phosphodiester bonds"] },
          { cells: ["Single-strand binding proteins", "keep the separated strands apart", "makes or breaks none; they only bind"] },
          { cells: ["Primase", "lays down a short RNA primer", "makes phosphodiester bonds in RNA"] },
          { cells: ["DNA polymerase III (bacteria)", "extends the primer 5′→3′, pairing each new base with the template, and proofreads", "makes phosphodiester bonds"] },
          { cells: ["DNA polymerase I (bacteria)", "removes the RNA primers and fills the gaps with DNA", "breaks and makes phosphodiester bonds"] },
          { cells: ["DNA ligase", "seals the last gap in the backbone between neighbouring fragments", "makes one phosphodiester bond"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which enzyme seals the gaps between the short fragments of new DNA on the lagging strand?",
        options: ["helicase", "DNA ligase", "primase", "RNA polymerase", "topoisomerase"],
        steps: [
          "Sealing a gap in the backbone means making the last phosphodiester bond, which is the job of DNA ligase.",
          "Helicase breaks hydrogen bonds to open the helix. Primase makes RNA primers. RNA polymerase belongs to transcription.",
          "Topoisomerase does cut and rejoin backbones, but only to relieve twisting ahead of the fork, not to join new fragments.",
        ],
        answer: "(B) DNA ligase",
      },
      practiceSet: [
        { prompt: "Which enzyme makes the RNA primer?", answer: "Primase" },
        { prompt: "In which direction does every new DNA strand grow?", answer: "5′→3′" },
        { prompt: "In which phase of the cell cycle is DNA replicated?", answer: "S phase of interphase" },
        { prompt: "Which enzyme breaks the hydrogen bonds between the two strands?", answer: "Helicase" },
      ],
      traps: [
        {
          title: "DNA polymerase needs a primer; RNA polymerase does not",
          body: "DNA polymerase can only add to an existing 3′ end, so every new DNA strand starts on a short RNA primer. RNA polymerase in transcription starts a chain on its own. An option saying DNA polymerase begins a new strand from nothing is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mol-leading-lagging",
      name: "Leading and lagging strands and Okazaki fragments",
      intuition:
        "The fork opens in one direction, but the two template strands point opposite ways. DNA polymerase can only build 5′→3′. On one template that direction follows the opening fork, so the new strand grows smoothly. On the other it points away from the fork, so the strand has to be built in short pieces, each started again as more template is exposed.",
      definition:
        "Replication is **semi-discontinuous**:\n" +
        "- The **leading strand** is made continuously, towards the fork.\n" +
        "- The **lagging strand** is made in short pieces, the **Okazaki fragments** (about 1000 to 2000 nucleotides in bacteria, 100 to 200 in eukaryotes), each growing away from the fork.\n" +
        "- Each Okazaki fragment needs its own RNA primer; the primers are later replaced with DNA and the fragments joined by DNA ligase.\n" +
        "- At the ends of a linear eukaryotic chromosome the last primer cannot be replaced, so chromosomes shorten a little each round. The repeated end sequences, **telomeres**, protect the genes; **telomerase** lengthens them in germ cells, stem cells and most cancer cells.",
      table: {
        columns: ["Feature", "Leading strand", "Lagging strand"],
        rows: [
          { cells: ["Direction of growth", "5′→3′, towards the fork", "5′→3′, away from the fork"] },
          { cells: ["How it is made", "continuously, in one piece", "in short Okazaki fragments"] },
          { cells: ["RNA primers needed", "one, at the origin", "one for every fragment"] },
          { cells: ["Work for DNA ligase", "very little", "joins every pair of neighbouring fragments"] },
        ],
      },
      selfCheckExample: {
        prompt: "Why is the lagging strand made as a series of short fragments?",
        options: [
          "Helicase can separate only one strand at a time.",
          "DNA ligase can work only on short pieces of DNA.",
          "RNA primers fall off after a few hundred bases.",
          "The template for the lagging strand is made of RNA.",
          "DNA polymerase adds nucleotides only to a 3′ end, and the template strands are antiparallel.",
        ],
        steps: [
          "New DNA can only grow 5′→3′. Because the templates are antiparallel, on one of them that direction points away from the opening fork.",
          "So that strand must be restarted repeatedly as the fork opens: these restarts are the Okazaki fragments.",
          "A, B and C invent limits that do not exist. D is false: both templates are DNA.",
        ],
        answer: "(E) DNA polymerase adds nucleotides only to a 3′ end, and the template strands are antiparallel.",
      },
      practiceSet: [
        { prompt: "Which strand needs more RNA primers?", answer: "The lagging strand" },
        { prompt: "Roughly how long is an Okazaki fragment in a human cell?", answer: "About 100 to 200 nucleotides" },
        { prompt: "Which enzyme keeps telomeres long in stem cells?", answer: "Telomerase" },
      ],
      traps: [
        {
          title: "The lagging strand is not built 3′→5′",
          body: "No strand is ever built 3′→5′. The lagging strand is built 5′→3′ like the leading strand, but in pieces, each pointing away from the fork. An option saying one strand grows 3′→5′ is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mol-discoveries",
      name: "Key experiments: DNA as the genetic material and its structure",
      intuition:
        "Each famous experiment answered one question: is the gene DNA or protein, what shape is DNA, and how is it copied? Learn each name with its method and its answer, because IMAT asks for the pairing, not the details.",
      definition:
        "The classic evidence, in order:\n" +
        "- **Transformation** showed a chemical passes genes between bacteria; **Avery's** group showed that chemical is DNA.\n" +
        "- **Hershey and Chase** confirmed that viruses inject DNA, not protein.\n" +
        "- **Chargaff**, **Franklin** and **Watson and Crick** solved the structure.\n" +
        "- **Meselson and Stahl** showed how it is copied.\n" +
        "Using DNA as a tool (cloning, PCR, gel electrophoresis) belongs to the biotechnology chapter.",
      table: {
        columns: ["Who and when", "What they did", "What it showed"],
        rows: [
          { cells: ["Griffith (1928)", "mixed heat-killed virulent pneumococci with live harmless ones; the mice died", "a 'transforming principle' can pass between bacteria"] },
          { cells: ["Avery, MacLeod and McCarty (1944)", "destroyed each type of molecule in the extract in turn", "the transforming principle is DNA"] },
          { cells: ["Chargaff (about 1950)", "measured the bases in DNA from many species", "A = T and G = C"] },
          { cells: ["Hershey and Chase (1952)", "labelled phage protein with ³⁵S and phage DNA with ³²P", "only DNA enters the bacterium: genes are DNA"] },
          { cells: ["Franklin and Wilkins (1951 to 1953)", "X-ray crystallography of DNA fibres", "a regular helix with the backbone on the outside"] },
          { cells: ["Watson and Crick (1953)", "built the double-helix model", "base pairing suggests how DNA is copied"] },
          { cells: ["Meselson and Stahl (1958)", "grew bacteria in ¹⁵N then ¹⁴N and separated DNA by density", "replication is semi-conservative"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which experiment showed that DNA replication is semi-conservative?",
        options: [
          "Meselson and Stahl's density separation of DNA from bacteria moved from ¹⁵N to ¹⁴N",
          "Hershey and Chase's labelling of phages with ³²P and ³⁵S",
          "Griffith's experiment with pneumococci and mice",
          "Franklin's X-ray crystallography of DNA fibres",
          "Chargaff's measurement of base ratios",
        ],
        steps: [
          "Only Meselson and Stahl followed old and new strands through rounds of copying, using their different densities.",
          "B and C are about whether genes are DNA; D and E gave clues to the structure, not to how it is copied.",
        ],
        answer: "(A) Meselson and Stahl's density separation of DNA from bacteria moved from ¹⁵N to ¹⁴N",
      },
      practiceSet: [
        { prompt: "Why did Hershey and Chase use ³⁵S to label protein?", answer: "Proteins contain sulfur but DNA does not" },
        { prompt: "What did Avery's group identify as the transforming principle?", answer: "DNA" },
        { prompt: "Whose images showed that DNA is a helix?", answer: "Rosalind Franklin's (with Maurice Wilkins), by X-ray crystallography" },
      ],
      traps: [
        {
          title: "X-ray crystallography, not electron microscopy, revealed the helix",
          body: "Franklin's evidence came from the pattern X-rays make after passing through DNA fibres. Electron microscopes, chromatography and electrophoresis played no part in finding the double helix.",
        },
      ],
    },
  ],
};

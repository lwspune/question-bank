import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_CDR_MEIOSIS_NOTE: SubtopicNote = {
  subtopicName: "Meiosis",
  title: "Meiosis, Chromosome Numbers and Variation",
  oneLineDefinition:
    "Meiosis is two divisions after one round of DNA copying, so one diploid cell makes four haploid cells that are genetically different from each other.",
  whyItMatters:
    "Meiosis is asked as often as mitosis. The papers want chromosome numbers in the zygote and in cells made by each division, the state of a cell before and during meiosis, which stage a description shows, what crossing over produces, and (in 2026) what tells meiosis apart from mitosis.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-cdr-meiosis-stages",
      name: "The stages of meiosis I and meiosis II",
      intuition:
        "Meiosis I separates the two members of each homologous pair, so each new cell gets one of every chromosome: that is where the number halves. Meiosis II then splits each chromosome into its two chromatids, exactly like mitosis. The DNA is copied once, before meiosis I, and never between the two divisions.",
      definition:
        "**Meiosis** is a reduction division: one diploid cell gives four **haploid** cells.\n" +
        "- **Prophase I**: homologous chromosomes pair up (**synapsis**) to form **bivalents** (tetrads: two chromosomes, four chromatids). **Crossing over** happens at points called **chiasmata**.\n" +
        "- **Meiosis I** separates **homologous chromosomes**. **Meiosis II** separates **sister chromatids**.\n" +
        "- Between the two divisions (**interkinesis**) there is no S phase.\n" +
        "- In animals meiosis happens in the gonads and makes gametes; in plants it happens in sporangia and makes spores.",
      table: {
        columns: ["Stage", "What happens", "Chromosomes in each cell"],
        rows: [
          { cells: ["Prophase I", "Chromosomes condense, homologues pair into bivalents, crossing over", "2n, each with two chromatids"] },
          { cells: ["Metaphase I", "Bivalents (pairs) line up on the equator, each pair facing a random pole", "2n, as pairs"] },
          { cells: ["Anaphase I", "Homologous chromosomes go to opposite poles; sister chromatids stay joined", "2n in the cell, n moving to each pole"] },
          { cells: ["Telophase I", "Two cells form", "n, each still with two chromatids"] },
          { cells: ["Metaphase II", "Chromosomes line up singly on the equator", "n, each with two chromatids"] },
          { cells: ["Anaphase II", "Centromeres split; sister chromatids go to opposite poles", "n moving to each pole"] },
          { cells: ["Telophase II", "Four haploid cells form", "n, each with one chromatid"] },
        ],
        caption: "Pairs on the equator means meiosis I; single chromosomes on the equator means mitosis or meiosis II.",
      },
      selfCheckExample: {
        prompt: "At which stage of cell division are bivalents arranged across the equator of the cell?",
        options: ["Prophase I", "Anaphase I", "Metaphase II", "Metaphase of mitosis", "Metaphase I"],
        steps: [
          "Bivalents are homologous pairs, which exist only in meiosis I.",
          "Lined up on the equator means metaphase, so metaphase I.",
          "In prophase I the pairs form but are not yet on the equator; in anaphase I they are being pulled apart; in metaphase II and in mitosis the chromosomes line up singly.",
        ],
        answer: "(E) Metaphase I",
      },
      practiceSet: [
        { prompt: "In which stage does crossing over happen?", answer: "Prophase I" },
        { prompt: "What separates in anaphase I?", answer: "Homologous chromosomes" },
        { prompt: "What separates in anaphase II?", answer: "Sister chromatids" },
        { prompt: "Is DNA copied between meiosis I and meiosis II?", answer: "No" },
      ],
      traps: [
        {
          title: "Homologous pairs moving apart means anaphase I",
          body: "If whole chromosomes (each still two chromatids) are moving to the poles in pairs that have split, the cell is in anaphase I. In mitosis and in anaphase II it is single chromatids that move. Look at what is being separated, not just at the movement.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-cdr-meiosis-numbers",
      name: "Chromosome number (n) and DNA content (c) at each stage of meiosis",
      intuition:
        "Track two numbers separately. The chromosome number halves once, in meiosis I. The DNA content doubles once, in S phase, and then halves twice. Fertilisation then joins two haploid gametes and restores the diploid number.",
      definition:
        "For a species with diploid number 2n:\n" +
        "- Before meiosis (G1): 2n chromosomes, DNA **2c**. After S phase: still 2n, but **4c**.\n" +
        "- After meiosis I: each cell is **haploid** (n chromosomes), but each chromosome still has two chromatids, so **2c**.\n" +
        "- After meiosis II: each of the four cells has n chromosomes and **1c**.\n" +
        "- The four cells together hold 4n chromosomes, double the 2n of the original cell, because DNA was copied once and the cell divided twice.\n" +
        "- **Fertilisation**: \\(n + n = 2n\\). The zygote, and every body cell made from it by mitosis, is diploid.",
      formula: {
        label: "Ploidy and DNA through meiosis",
        latex: "2n,\\,4c \\xrightarrow{\\text{meiosis I}} n,\\,2c \\xrightarrow{\\text{meiosis II}} n,\\,c",
        symbols: [
          { symbol: "\\(n\\)", meaning: "haploid number: one set of chromosomes" },
          { symbol: "\\(c\\)", meaning: "DNA content of one unreplicated set" },
        ],
      },
      authoredExample: {
        prompt:
          "An animal has \\(2n = 14\\). For one cell that goes through meiosis, give the chromosomes, chromatids and DNA content (in c) after S phase, after meiosis I and after meiosis II.",
        steps: [
          "After S phase: 14 chromosomes, 28 chromatids, 4c.",
          "After meiosis I: homologues have separated, so each of 2 cells has 7 chromosomes, 14 chromatids, 2c.",
          "After meiosis II: sister chromatids have separated, so each of 4 cells has 7 chromosomes, 7 chromatids, 1c.",
          "Check: a gamete (7) plus a gamete (7) gives a zygote of 14.",
        ],
        answer: "14, 28, 4c; then 7, 14, 2c per cell; then 7, 7, 1c per cell",
      },
      selfCheckExample: {
        prompt: "A plant has \\(2n = 24\\). How many chromosomes and chromatids does one cell have at metaphase II?",
        options: [
          "24 chromosomes, 48 chromatids",
          "12 chromosomes, 24 chromatids",
          "12 chromosomes, 12 chromatids",
          "24 chromosomes, 24 chromatids",
          "6 chromosomes, 12 chromatids",
        ],
        steps: [
          "Meiosis I has already halved the number: 12 chromosomes.",
          "The chromatids separate only in anaphase II, so at metaphase II each chromosome still has two: 24 chromatids.",
          "A is metaphase I; C is after telophase II; D mixes the diploid count with single chromatids; E halves twice.",
        ],
        answer: "(B) 12 chromosomes, 24 chromatids",
      },
      practiceSet: [
        { prompt: "A dog has \\(2n = 78\\). How many chromosomes are in a dog sperm?", answer: "39" },
        { prompt: "How many chromatids does a human primary spermatocyte have at prophase I?", answer: "92", method: "46 chromosomes, two chromatids each" },
        { prompt: "Is a human cell at the start of meiosis II haploid or diploid?", answer: "Haploid", method: "23 chromosomes, each still two chromatids" },
        { prompt: "A cell with \\(2n = 8\\) completes meiosis. How many chromosomes are there in all four cells together?", answer: "16", method: "\\(4 \\times 4\\)" },
      ],
      traps: [
        {
          title: "A cell after meiosis I is haploid, even though its DNA is 2c",
          body: "Ploidy counts chromosome sets, not DNA. After meiosis I each cell has one chromosome from every pair, so it is haploid. Its chromosomes still have two chromatids, so its DNA content equals that of a diploid G1 cell. Calling it diploid because of the DNA is wrong.",
        },
        {
          title: "Daughter cells of mitosis are not haploid",
          body: "Mitosis keeps the parent's number: a 2n cell gives 2n daughters. Only meiosis halves it. A zygote is 2n, every cell mitosis makes from it is 2n, and only the cells meiosis makes are n.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-cdr-meiosis-variation",
      name: "Sources of variation in meiosis: crossing over, independent assortment, random fertilisation",
      intuition:
        "Meiosis shuffles the genes three ways. Crossing over swaps pieces between the maternal and paternal chromosome of a pair. Independent assortment lets each pair face either pole at random. Then any sperm can meet any egg. Together they make almost every gamete and every zygote unique.",
      definition:
        "Three sources of genetic variation in sexual reproduction:\n" +
        "- **Crossing over** (prophase I): non-sister chromatids of a homologous pair exchange segments. One crossover gives **2 recombinant** and 2 parental chromatids out of the 4, and the four cells made at the end each get a different chromatid.\n" +
        "- **Independent assortment** (metaphase I): each pair lines up facing either pole at random, so a cell with haploid number n can make \\(2^n\\) chromosome combinations.\n" +
        "- **Random fertilisation**: any one of the male's gametes can fuse with any one of the female's.\n" +
        "- New alleles themselves come only from **mutation**; meiosis reshuffles alleles that already exist.",
      formula: {
        label: "Gamete combinations from independent assortment",
        latex: "\\text{combinations} = 2^{n}",
        symbols: [{ symbol: "\\(n\\)", meaning: "haploid number (number of homologous pairs)" }],
      },
      authoredExample: {
        prompt:
          "An insect has 4 pairs of chromosomes. Ignoring crossing over, how many chromosome combinations can its gametes have? How many combinations can a zygote of two such insects have?",
        steps: [
          "Use the haploid number, \\(n = 4\\): \\(2^4 = 16\\) kinds of gamete from each parent.",
          "Any of 16 sperm types can meet any of 16 egg types: \\(16 \\times 16 = 256\\).",
          "Crossing over makes the real number far larger.",
        ],
        answer: "16 gamete combinations; 256 zygote combinations",
      },
      selfCheckExample: {
        prompt:
          "A plant has \\(2n = 10\\). Ignoring crossing over, how many genetically different gametes can one plant make by independent assortment alone?",
        options: ["1024", "10", "32", "25", "5"],
        steps: [
          "The haploid number is \\(n = 5\\), so the number of combinations is \\(2^5 = 32\\).",
          "A uses the diploid number (\\(2^{10}\\)); D squares the wrong number (\\(5^2\\)); B and E just repeat the chromosome numbers.",
        ],
        answer: "(C) 32",
      },
      practiceSet: [
        { prompt: "How many chromosome combinations can a human gamete have by independent assortment?", answer: "\\(2^{23}\\), about 8.4 million" },
        { prompt: "A species has \\(n = 3\\). How many gamete combinations are possible?", answer: "8", method: "\\(2^3\\)" },
        { prompt: "In a bivalent with one crossover, how many of the four chromatids are recombinant?", answer: "2" },
        { prompt: "Which process is the only source of brand new alleles?", answer: "Mutation" },
      ],
      traps: [
        {
          title: "Use n, not 2n, in 2 to the power n",
          body: "Each homologous PAIR has two ways to face the poles, so the power is the number of pairs, which is the haploid number. Using the diploid number squares the true answer.",
        },
        {
          title: "Crossing over is between non-sister chromatids",
          body: "Sister chromatids are identical, so swapping between them would change nothing. Crossing over happens between a chromatid of the maternal chromosome and one of the paternal chromosome, in prophase I only. It does not happen in mitosis.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-cdr-mitosis-vs-meiosis",
      name: "Mitosis compared with meiosis",
      intuition:
        "Both divisions copy DNA once and use a spindle of microtubules. The difference is the goal: mitosis makes copies for growth and repair, meiosis makes varied haploid cells for sexual reproduction. Every difference in the table follows from that.",
      definition:
        "**Mitosis** keeps the chromosome number and gives identical cells; **meiosis** halves it and gives genetically varied cells.\n" +
        "- Both are preceded by one S phase, and both use spindle **microtubules**.\n" +
        "- Both happen in single-celled eukaryotes too: yeast and many algae undergo meiosis.\n" +
        "- Prokaryotes do neither: bacteria divide by **binary fission**.",
      table: {
        columns: ["Feature", "Mitosis", "Meiosis"],
        rows: [
          { cells: ["Divisions after one S phase", "One", "Two"] },
          { cells: ["Cells made from one cell", "Two", "Four"] },
          { cells: ["Chromosome number", "Same as parent (2n gives 2n)", "Halved (2n gives n)"] },
          { cells: ["Genetic make-up", "Identical to parent and to each other", "Different from parent and from each other"] },
          { cells: ["Homologues pair, crossing over", "Never", "In prophase I"] },
          { cells: ["Where in humans", "Somatic (body) cells everywhere", "Germ cells in the testes and ovaries"] },
          { cells: ["Role", "Growth, repair, asexual reproduction", "Making gametes (animals) or spores (plants)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of these happens in meiosis but never in mitosis?",
        options: [
          "Separation of sister chromatids",
          "Formation of a spindle of microtubules",
          "Replication of DNA before division begins",
          "Pairing of homologous chromosomes",
          "Condensation of chromatin into visible chromosomes",
        ],
        steps: [
          "Homologues pair (synapsis) only in prophase I of meiosis.",
          "Sister chromatids separate in mitosis and in meiosis II, so A happens in both.",
          "Both divisions use a spindle, both follow an S phase, and both condense chromatin: B, C and E are shared.",
        ],
        answer: "(D) Pairing of homologous chromosomes",
      },
      practiceSet: [
        { prompt: "How many cells does one cell make by meiosis?", answer: "Four" },
        { prompt: "Are the daughter cells of mitosis genetically identical?", answer: "Yes, apart from rare mutations" },
        { prompt: "Which division makes gametes in a human?", answer: "Meiosis" },
        { prompt: "Can single-celled organisms undergo meiosis?", answer: "Yes, for example yeast" },
      ],
      traps: [
        {
          title: "Meiosis is not limited to multicellular organisms or to special machinery",
          body: "Single-celled eukaryotes such as yeast reproduce sexually using meiosis, and both mitosis and meiosis build a spindle from microtubules. The real differences are the number of divisions, pairing and crossing over, and haploid, varied products.",
        },
      ],
    },
  ],
};

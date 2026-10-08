import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_GEN_LINKAGE_NOTE: SubtopicNote = {
  subtopicName: "Linkage and Chromosome Errors",
  title: "Linkage, Gene Maps, Variation and Non-disjunction",
  oneLineDefinition:
    "Genes on the same chromosome travel together unless crossing over separates them; how often that happens maps the genes, and errors in meiosis change the chromosome number.",
  whyItMatters:
    "Gene order from crossover values was asked in 2011 and 2018. Other older questions asked why a brother and sister differ (2018), what mitosis does to two linked genes (2016), and whether a faulty sperm with the SRY gene could give a female with an extra sex chromosome (2021).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-gen-linkage-recombination",
      name: "Linked genes and recombination frequency",
      intuition:
        "Two genes on the same chromosome are physically joined, so they tend to enter the same gamete. They can be separated only when homologous chromosomes swap segments by crossing over between them. The further apart the genes are, the more often a crossover falls between them, so the share of recombinant offspring measures their distance.",
      definition:
        "- **Linked genes** are on the same chromosome and do not assort independently.\n" +
        "- **Crossing over** happens in **prophase I** of meiosis, between **non-sister chromatids** of homologous chromosomes, at points called **chiasmata**.\n" +
        "- In a test cross of a double heterozygote, **parental** combinations are the majority; **recombinant** (new) combinations are the minority.\n" +
        "- The **recombination frequency** (crossover value) is the percentage of recombinant offspring. It is at most **50%**; 50% means the genes behave as unlinked.\n" +
        "- Mitosis does not separate linked alleles or homologues: both daughter cells get the same genotype as the parent cell.",
      formula: {
        label: "Recombination frequency",
        latex: "RF = \\frac{\\text{number of recombinant offspring}}{\\text{total offspring}} \\times 100\\%",
        symbols: [
          { symbol: "\\(RF\\)", meaning: "recombination frequency (crossover value), in %" },
        ],
      },
      authoredExample: {
        prompt:
          "In fruit flies, grey body (\\(G\\)) and long wings (\\(L\\)) are dominant to black body (\\(g\\)) and vestigial wings (\\(l\\)). A fly heterozygous for both genes, which received \\(G\\) and \\(L\\) together from one parent, is test-crossed with a \\(ggll\\) fly. Offspring: 420 grey long, 405 black vestigial, 88 grey vestigial, 87 black long. Are the genes linked, and what is the recombination frequency?",
        steps: [
          "Unlinked genes would give about 1 : 1 : 1 : 1. Here two classes dominate, so the genes are linked.",
          "The large classes (grey long, black vestigial) keep the parental combinations; the small classes (grey vestigial, black long) are recombinants.",
          "Total: \\(420 + 405 + 88 + 87 = 1000\\). Recombinants: \\(88 + 87 = 175\\).",
          "\\(RF = 175/1000 \\times 100\\% = 17.5\\%\\).",
        ],
        answer: "Linked; recombination frequency 17.5%",
      },
      selfCheckExample: {
        prompt:
          "A double heterozygote that received \\(A\\) and \\(B\\) together from one parent is test-crossed with \\(aabb\\). The offspring are: 460 \\(AaBb\\), 440 \\(aabb\\), 52 \\(Aabb\\), 48 \\(aaBb\\). What is the recombination frequency between the two genes?",
        options: ["5%", "11%", "90%", "50%", "10%"],
        steps: [
          "The recombinants are the two small classes: \\(52 + 48 = 100\\).",
          "Total offspring: 1000. \\(RF = 100/1000 = 10\\%\\).",
          "B divides by the parental total (900) instead of the whole. C is the parental share. A halves the answer for no reason.",
        ],
        answer: "(E) 10%",
      },
      practiceSet: [
        { prompt: "What is the largest recombination frequency two genes can show?", answer: "50%", method: "That is what unlinked genes give" },
        { prompt: "Between which chromatids does crossing over occur?", answer: "Non-sister chromatids of a pair of homologous chromosomes" },
        { prompt: "A test cross gives 30 recombinants out of 400 offspring. What is the recombination frequency?", answer: "7.5%" },
        { prompt: "A cell of genotype \\(AaBb\\) divides by mitosis. What is the genotype of each daughter cell?", answer: "\\(AaBb\\)", method: "Mitosis copies; it does not sort alleles" },
      ],
      traps: [
        {
          title: "Crossing over happens inside one parent's meiosis",
          body: "Crossing over is between the two homologous chromosomes of one person, during prophase I as that person makes gametes. It is never between a chromosome from the sperm and one from the egg at fertilisation, and it does not happen in the zygote's mitotic divisions.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-gen-gene-maps",
      name: "Building a gene map from crossover values",
      intuition:
        "If recombination frequency measures distance, a set of pairwise distances is like the distances between towns on one straight road. The two towns farthest apart must be at the two ends. Every other town is then placed by its distance from one end, and the remaining distances check the answer.",
      definition:
        "- One **map unit** (one **centimorgan**, cM) corresponds to a recombination frequency of **1%**.\n" +
        "- Distances along one chromosome **add**: if C lies between A and B, then \\(AC + CB = AB\\).\n" +
        "- Method: (1) find the **largest** value; those two genes are at the **ends**. (2) Place each other gene by its distance from one end. (3) Check every given value.\n" +
        "- Over long distances double crossovers go uncounted, so a large measured value can fall slightly short of the sum of the smaller ones.",
      formula: {
        label: "Distances add along a chromosome",
        latex: "d(A,B) = d(A,C) + d(C,B) \\quad \\text{when C lies between A and B}",
        symbols: [
          { symbol: "\\(d\\)", meaning: "map distance, in map units (= % recombination)" },
        ],
      },
      authoredExample: {
        prompt:
          "Crossover values for four genes on one chromosome: J and M 26%, J and K 12%, K and L 5%, L and M 9%, K and M 14%. Find the gene order.",
        steps: [
          "The largest value is J to M (26), so J and M are the ends.",
          "Place from J: K is 12 from J. M is 26 from J, and K to M is 14: \\(12 + 14 = 26\\), consistent.",
          "L is 5 from K and 9 from M. Between K and M: \\(5 + 9 = 14\\), which matches K to M. So L sits at 17 from J.",
          "Order: J (0), K (12), L (17), M (26).",
        ],
        answer: "J K L M (or the reverse, M L K J)",
      },
      selfCheckExample: {
        prompt:
          "Four genes lie on one chromosome. Crossover values: X and Y 22%, W and X 7%, W and Z 11%, Y and Z 4%, W and Y 15%. Which order of the genes fits all the values?",
        options: ["W X Z Y", "X W Y Z", "X W Z Y", "X Z W Y", "W X Y Z"],
        steps: [
          "The largest value is X to Y (22): X and Y are the ends.",
          "From X: W is at 7. W to Y is 15, and \\(7 + 15 = 22\\): consistent.",
          "Z is 11 from W, so at 18 from X; then Z to Y is \\(22 - 18 = 4\\), which matches. Order X W Z Y.",
          "B puts Y inside the chromosome although X and Y are farthest apart. A and E put W at an end.",
        ],
        answer: "(C) X W Z Y",
      },
      practiceSet: [
        { prompt: "Genes A and B are 20 map units apart, B and C 8, and A and C 12. Which gene is in the middle?", answer: "C", method: "\\(12 + 8 = 20\\)" },
        { prompt: "What recombination frequency corresponds to 1 map unit?", answer: "1%" },
        { prompt: "Two genes show 3% recombination and two others 30%. Which pair is closer?", answer: "The pair with 3%" },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-gen-meiosis-variation",
      name: "Meiosis and fertilisation as sources of genetic variation",
      intuition:
        "Brothers and sisters share parents but are not identical. Each parent's meiosis shuffles chromosomes in two ways: whole chromosomes are dealt out at random, and crossing over mixes alleles within chromosomes. Then any sperm can meet any egg. Multiplying these choices gives an enormous number of possible children.",
      definition:
        "Three sources of variation in sexual reproduction (beyond new mutations):\n" +
        "- **Independent assortment**: homologous pairs line up in **random orientation** at the equator in **metaphase I**. With haploid number \\(n\\) there are \\(2^n\\) chromosome combinations per gamete.\n" +
        "- **Crossing over** in **prophase I** creates new combinations of alleles on each chromosome.\n" +
        "- **Random fertilisation**: any gamete of one parent can fuse with any gamete of the other.\n" +
        "- In humans (\\(n = 23\\)) independent assortment alone gives \\(2^{23} \\approx 8.4\\) million kinds of gamete, and about \\(7 \\times 10^{13}\\) combinations for a zygote.\n" +
        "- **Mutation** is the original source of new alleles.",
      formula: {
        label: "Chromosome combinations from independent assortment",
        latex: "\\text{gametes} = 2^{n} \\qquad \\text{zygotes} = 2^{n} \\times 2^{n}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "haploid chromosome number (number of homologous pairs)" },
        ],
      },
      authoredExample: {
        prompt:
          "An animal has a diploid number \\(2n = 8\\). Ignoring crossing over, how many chromosome combinations can its gametes have, and how many combinations are possible for a zygote from two such parents?",
        steps: [
          "\\(2n = 8\\), so \\(n = 4\\) homologous pairs.",
          "Each pair can face either pole: \\(2^4 = 16\\) kinds of gamete.",
          "A zygote combines one gamete from each parent: \\(16 \\times 16 = 256\\).",
        ],
        answer: "16 kinds of gamete; 256 zygote combinations",
      },
      selfCheckExample: {
        prompt:
          "A plant has a diploid number of 12. Ignoring crossing over, how many different chromosome combinations are possible in its gametes as a result of independent assortment?",
        options: ["12", "6", "64", "4096", "36"],
        steps: [
          "\\(2n = 12\\), so \\(n = 6\\).",
          "Combinations: \\(2^6 = 64\\).",
          "D is \\(64 \\times 64\\), the zygote count. A and B use the chromosome number directly; E squares 6 instead of raising 2 to the power 6.",
        ],
        answer: "(C) 64",
      },
      practiceSet: [
        { prompt: "About how many chromosome combinations can a human gamete have from independent assortment alone?", answer: "\\(2^{23}\\), about 8.4 million" },
        { prompt: "In which phase of meiosis does independent assortment of homologous pairs occur?", answer: "Metaphase I (separated in anaphase I)" },
        { prompt: "Do identical twins differ in their alleles?", answer: "No; they come from one zygote", method: "Differences come from environment, or rare later mutations" },
      ],
      traps: [
        {
          title: "Variation between siblings is made before fertilisation",
          body: "The differences between a brother and a sister come from each parent's meiosis (random orientation in metaphase I, crossing over in prophase I) and from which sperm meets which egg. Nothing in the zygote's own mitotic divisions reshuffles alleles.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-gen-nondisjunction",
      name: "Non-disjunction and aneuploidy: Down, Turner and Klinefelter syndromes",
      intuition:
        "In meiosis, each pair of chromosomes must split cleanly between the gametes. If a pair fails to separate, one gamete gets both copies and another gets none. When such a gamete is fertilised, the zygote has one chromosome too many or one too few, in every cell of the body.",
      definition:
        "- **Non-disjunction**: homologous chromosomes fail to separate in **anaphase I**, or sister chromatids fail to separate in **anaphase II**.\n" +
        "- The result is gametes with \\(n + 1\\) and \\(n - 1\\) chromosomes. Fertilisation by a normal gamete gives a **trisomy** (\\(2n + 1 = 47\\)) or a **monosomy** (\\(2n - 1 = 45\\)). This is **aneuploidy**.\n" +
        "- Down syndrome is most often due to non-disjunction in the mother's meiosis, and its risk rises with the mother's age.\n" +
        "- Sex is still decided by SRY: any karyotype with a Y (and working SRY) develops as male.\n" +
        "- A **karyotype** (the chromosomes photographed and arranged in pairs) shows these changes; it is used, for example, in prenatal diagnosis.",
      table: {
        columns: ["Condition", "Karyotype", "Sex", "Main features"],
        rows: [
          { cells: ["Down syndrome (trisomy 21)", "47, +21", "Either", "Learning disability, typical facial features, heart defects"] },
          { cells: ["Turner syndrome", "45, X", "Female", "Short stature, ovaries do not work, usually infertile"] },
          { cells: ["Klinefelter syndrome", "47, XXY", "Male", "Small testes, usually infertile, sometimes breast growth"] },
          { cells: ["Triple X", "47, XXX", "Female", "Often no obvious signs; may be tall"] },
          { cells: ["XYY", "47, XYY", "Male", "Often no obvious signs; may be tall"] },
        ],
        caption: "An embryo missing a whole autosome almost never survives to birth; 45, X is the only monosomy commonly seen in live births.",
      },
      selfCheckExample: {
        prompt:
          "In a man's meiosis, the X and Y chromosomes fail to separate in anaphase I. A sperm carrying both X and Y fertilises a normal egg. What is the karyotype and condition of the child?",
        options: [
          "45, X: Turner syndrome, female",
          "47, XXY: Klinefelter syndrome, male",
          "47, +21: Down syndrome",
          "47, XXX: triple X, female",
          "46, XY: a normal male",
        ],
        steps: [
          "The sperm carries X and Y (\\(n + 1 = 24\\)); the egg carries X. The zygote is 47, XXY.",
          "It has a Y with SRY, so it develops as male: Klinefelter syndrome.",
          "A would come from a sperm with no sex chromosome. C involves chromosome 21, not the sex chromosomes. D needs two X chromosomes from one gamete and no Y.",
        ],
        answer: "(B) 47, XXY: Klinefelter syndrome, male",
      },
      practiceSet: [
        { prompt: "How many chromosomes are in a body cell of a person with Down syndrome?", answer: "47" },
        { prompt: "How many chromosomes does a human gamete formed after non-disjunction carry, if it has an extra one?", answer: "24" },
        { prompt: "Which karyotype gives Turner syndrome?", answer: "45, X" },
        { prompt: "Which parent's age is most linked to the risk of Down syndrome?", answer: "The mother's" },
      ],
      traps: [
        {
          title: "Klinefelter is male, Turner is female",
          body: "Sex follows the presence of the Y (with SRY), not the number of X chromosomes. XXY is male despite two X chromosomes; X with no second sex chromosome is female.",
        },
      ],
    },
  ],
};

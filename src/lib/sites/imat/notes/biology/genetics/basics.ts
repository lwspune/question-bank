import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_GEN_BASICS_NOTE: SubtopicNote = {
  subtopicName: "Genes, Alleles and Mendel",
  title: "Genes, Alleles, Mendel's Laws and Mutations",
  oneLineDefinition:
    "A gene is a stretch of DNA at a fixed place on a chromosome; its alternative versions are alleles, and Mendel's laws describe how alleles pass to gametes.",
  whyItMatters:
    "The ministry papers lean hard on this page: the 2023 paper asked which statements are Mendel's laws, the 2024 paper asked for the meaning of allele, dominance and mutation, and the 2026 paper asked about the chromosomal theory and sickle-cell haemoglobin. The older papers (2012, 2019) asked whether genes or alleles differ between siblings and between cells of one body.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-gen-vocabulary",
      name: "Gene, allele, genotype and phenotype: the core vocabulary",
      intuition:
        "Think of a gene as a recipe slot, such as \"flower colour\", and the alleles as the different versions of that recipe (purple, white). Every body cell of a diploid organism has two copies of each chromosome, so it carries two alleles of each gene, one from each parent. The genotype is the pair of alleles; the phenotype is what you can see or measure.",
      definition:
        "- A **gene** is a length of DNA that codes for a product (usually a polypeptide) and sits at a fixed position, its **locus**, on a chromosome.\n" +
        "- An **allele** is one of the alternative forms of a gene. Alleles of the same gene sit at the same locus on the two **homologous chromosomes**.\n" +
        "- The **genotype** is the pair of alleles an individual has (e.g. \\(Tt\\)); the **phenotype** is the observable trait (e.g. tall), shaped by the genotype and the environment.\n" +
        "- **Homozygous**: two identical alleles (\\(TT\\) or \\(tt\\)). **Heterozygous**: two different alleles (\\(Tt\\)).\n" +
        "- A **dominant** allele shows in the phenotype even in a heterozygote; a **recessive** allele shows only when homozygous.\n" +
        "- All the body cells of one person carry the same genes and the same alleles. Cells differ because they switch different genes on, not because their alleles differ.",
      table: {
        columns: ["Term", "Meaning", "Example"],
        rows: [
          { cells: ["Gene", "A DNA sequence coding for a product, at a fixed locus", "The gene for pea plant height"] },
          { cells: ["Allele", "One alternative form of a gene", "\\(T\\) (tall) and \\(t\\) (dwarf)"] },
          { cells: ["Genotype", "The two alleles an individual carries", "\\(TT\\), \\(Tt\\) or \\(tt\\)"] },
          { cells: ["Phenotype", "The trait that is seen or measured", "Tall or dwarf"] },
          { cells: ["Homozygous", "Both alleles the same", "\\(TT\\) or \\(tt\\)"] },
          { cells: ["Heterozygous", "Two different alleles", "\\(Tt\\), which is tall"] },
          {
            cells: ["Dominant allele", "Expressed even when only one copy is present", "\\(T\\) in a \\(Tt\\) plant"],
            noteAmber: "In a heterozygote, only the dominant allele is certain to show in the phenotype.",
          },
          { cells: ["Recessive allele", "Expressed only when two copies are present", "\\(t\\), seen only in \\(tt\\)"] },
        ],
        caption: "By convention the dominant allele takes a capital letter and the recessive allele the same letter in lower case.",
      },
      selfCheckExample: {
        prompt: "A pea plant has the genotype \\(Tt\\) and is tall. Which statement about this plant is correct?",
        options: [
          "\\(T\\) and \\(t\\) are two different genes",
          "\\(T\\) and \\(t\\) are alleles of one gene, at the same locus on a pair of homologous chromosomes",
          "The plant is homozygous for height",
          "The plant's phenotype is \\(Tt\\)",
          "The allele \\(t\\) is lost from the plant's body cells because it is not expressed",
        ],
        steps: [
          "\\(T\\) and \\(t\\) are two versions of the same gene (height), so they are alleles, and they occupy the same locus on the two homologues.",
          "A is the classic mix-up of gene and allele. C is wrong: two different alleles make the plant heterozygous.",
          "D confuses genotype with phenotype: the phenotype is \"tall\". E is wrong: a recessive allele is still present in every cell, only masked.",
        ],
        answer: "(B) \\(T\\) and \\(t\\) are alleles of one gene, at the same locus on a pair of homologous chromosomes",
      },
      practiceSet: [
        { prompt: "How many alleles of one autosomal gene does a normal human body cell carry?", answer: "Two", method: "One on each homologous chromosome" },
        { prompt: "Write the genotype of a plant homozygous for the recessive dwarf allele \\(t\\).", answer: "\\(tt\\)" },
        { prompt: "Non-identical twins: do they have the same genes, the same alleles, or both?", answer: "The same genes, but different combinations of alleles", method: "Every human has the same set of genes" },
        { prompt: "A cell in the liver and a cell in the skin of one person: do their alleles differ?", answer: "No; they differ in which genes are switched on", method: "All body cells come from one zygote by mitosis" },
      ],
      traps: [
        {
          title: "Genes are shared; alleles differ",
          body: "All humans carry the same genes (a gene for eye colour, a gene for blood group). What differs between two people, even siblings, is which alleles of those genes they carry. Options that say siblings or twins have \"different genes\" are wrong; \"different alleles\" is right for non-identical twins.",
        },
        {
          title: "Dominant does not mean common or stronger",
          body: "Dominance only describes what shows in a heterozygote. A dominant allele can be rare in a population (the allele for Huntington's disease is dominant and rare), and a recessive allele can be very common.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-gen-mendel-laws",
      name: "Mendel's laws and the chromosomal theory of inheritance",
      intuition:
        "Mendel bred garden peas and counted the offspring. He saw that traits came in fixed units that did not blend, and that each parent passed on exactly one unit for each trait. Decades later, biologists noticed that chromosomes behave in meiosis exactly as Mendel's units do, which is how we know genes are carried on chromosomes.",
      definition:
        "- **Law of segregation**: the two alleles of a gene separate when gametes form, so each gamete carries only one allele of each gene, chosen at random.\n" +
        "- **Law of independent assortment**: alleles of different genes go into gametes independently of each other. This holds for genes on different chromosomes (or far apart on one).\n" +
        "- **Law of dominance**: in a heterozygote, the dominant allele decides the phenotype.\n" +
        "- **Chromosomal theory of inheritance** (Sutton and Boveri, about 1902): genes are located on chromosomes, and the behaviour of chromosomes in meiosis explains Mendel's laws.\n" +
        "- Mendel's laws are about inheritance. Ideas about survival of the fittest belong to natural selection (Darwin), not to Mendel.",
      table: {
        columns: ["Law or idea", "What it says", "Explained in meiosis by"],
        rows: [
          { cells: ["Segregation", "Each gamete gets one allele of each gene", "Homologous chromosomes separating in anaphase I"] },
          { cells: ["Independent assortment", "Alleles of different genes are sorted into gametes independently", "Random orientation of homologous pairs at the equator in metaphase I"] },
          { cells: ["Dominance", "The dominant allele masks the recessive one in a heterozygote", "Not a meiosis event: it is about gene expression"] },
          { cells: ["Chromosomal theory", "Genes are carried on chromosomes", "Chromosomes and alleles both come in pairs and both segregate in meiosis"] },
        ],
        caption: "Independent assortment fails for genes close together on the same chromosome: they are linked.",
      },
      selfCheckExample: {
        prompt: "Which of the following describes Mendel's law of segregation?",
        options: [
          "Alleles of genes on the same chromosome are inherited together",
          "Each gamete carries both alleles of every gene",
          "The two alleles of a gene separate when gametes form, so each gamete receives one",
          "Homologous chromosomes exchange segments during prophase I",
          "The dominant allele is always the more common allele in a population",
        ],
        steps: [
          "Segregation is the separation of the two alleles of one gene into different gametes, so option C.",
          "A describes linkage, which is an exception to independent assortment. B is the opposite of segregation.",
          "D describes crossing over, unknown to Mendel. E confuses dominance with frequency.",
        ],
        answer: "(C) The two alleles of a gene separate when gametes form, so each gamete receives one",
      },
      practiceSet: [
        { prompt: "Which event in meiosis explains the law of independent assortment?", answer: "Random orientation of homologous pairs at the equator in metaphase I" },
        { prompt: "Which organism did Mendel use for his crosses?", answer: "The garden pea (Pisum sativum)" },
        { prompt: "For which kind of genes does the law of independent assortment fail?", answer: "Linked genes, close together on the same chromosome" },
        { prompt: "What does the chromosomal theory of inheritance state?", answer: "Genes are located on chromosomes" },
      ],
      traps: [
        {
          title: "Natural selection is not one of Mendel's laws",
          body: "A statement such as \"individuals with useful traits survive and reproduce more\" is Darwin's natural selection. Mendel's laws are segregation, independent assortment and dominance. Exam lists of statements often mix the two.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-gen-mutations",
      name: "Mutations: changes in the genetic information, and sickle-cell anaemia",
      intuition:
        "A mutation is any change in the genetic information of a cell. Because the genetic code is read in triplets, the effect of a change depends on what happens to the codons: one swapped base may change nothing, change one amino acid, or stop the protein early. A base added or removed shifts every codon after it.",
      definition:
        "A **mutation** is a change in the DNA base sequence (a **gene mutation**) or in the structure or number of chromosomes (a **chromosome mutation**).\n" +
        "- **Substitution**: one base replaced. It can be **silent** (same amino acid, because the code is degenerate), **missense** (a different amino acid) or **nonsense** (a stop codon).\n" +
        "- **Insertion or deletion** of one or two bases causes a **frameshift**: every codon after it is read wrongly.\n" +
        "- Only mutations in cells that make gametes (**germline**) are passed to offspring; **somatic** mutations are not.\n" +
        "- **Sickle-cell anaemia**: a missense substitution in the \\(\\beta\\)-globin gene (codon 6 changes from \\(\\text{GAG}\\) to \\(\\text{GTG}\\) in the DNA) puts valine in place of glutamic acid. The haemoglobin (HbS) has a different structure; it still carries oxygen, but at low oxygen it forms fibres that distort red cells into sickles. It is autosomal recessive, and carriers are partly protected against malaria.",
      table: {
        columns: ["Type", "What changes", "Typical effect"],
        rows: [
          { cells: ["Silent substitution", "One base, but the codon still codes the same amino acid", "No change in the protein"] },
          { cells: ["Missense substitution", "One base, giving a different amino acid", "One amino acid changed (sickle-cell haemoglobin)"] },
          { cells: ["Nonsense substitution", "One base, giving a stop codon", "A shortened, usually useless protein"] },
          { cells: ["Frameshift", "One or two bases inserted or deleted", "Every amino acid after the change can be different"] },
          { cells: ["Chromosome mutation", "Chromosome structure or number", "Many genes affected (e.g. trisomy 21)"] },
        ],
      },
      selfCheckExample: {
        prompt: "A substitution changes the codon GAA to GAG in an mRNA. Both codons code for glutamic acid. This mutation is best described as:",
        options: ["silent", "missense", "nonsense", "a frameshift", "a chromosome mutation"],
        steps: [
          "The amino acid is unchanged, so the protein is unchanged: a silent mutation.",
          "Missense needs a different amino acid; nonsense needs a stop codon.",
          "A frameshift needs an insertion or deletion, and a single base swap is a gene mutation, not a chromosome mutation.",
        ],
        answer: "(A) silent",
      },
      practiceSet: [
        { prompt: "Which amino acid replaces glutamic acid in sickle-cell haemoglobin?", answer: "Valine" },
        { prompt: "Does sickle-cell haemoglobin carry oxygen?", answer: "Yes; it has a changed structure and polymerises at low oxygen", method: "The fault is shape, not oxygen binding" },
        { prompt: "Why does deleting three bases usually do less harm than deleting one?", answer: "Three bases remove one codon and keep the reading frame", method: "No frameshift" },
        { prompt: "Is a mutation in a skin cell passed to a person's children?", answer: "No; only germline mutations are inherited" },
      ],
      traps: [
        {
          title: "Sickle-cell haemoglobin still carries oxygen",
          body: "HbS differs from normal haemoglobin by one amino acid in each \\(\\beta\\) chain, which changes its structure. It still binds and transports oxygen. The problem is that deoxygenated HbS forms long fibres that bend red cells into sickles, which block capillaries and are destroyed early.",
        },
      ],
    },
  ],
};

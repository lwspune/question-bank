import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Biology, Ch. 3 Inheritance and Variation. Laws and definitions
 * checked against the Balbharati text (the book's own wording, trimmed);
 * most-asked years from the 14 board past-paper questions in the bank,
 * 2024-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Inheritance and Variation",
  chapterSlug: "inheritance-and-variation",
  source: "Balbharati Biology Std XII (Maharashtra State Board), Chapter 3",
  keyPoints: [
    {
      term: "Reasons for Mendel's success",
      text: "Experiments carefully planned with large samples; numbers of each type recorded and results expressed as ratios; contrasting characters of pea easily recognised; each of the seven characters controlled by a single factor; traits studied one at a time; data processed mathematically and statistically.",
    },
    {
      term: "Law of dominance",
      text: "When two homozygous individuals with one or more sets of contrasting characters are crossed, the alleles that appear in F1 are **dominant** and those which do not appear in F1 are **recessive**.",
    },
    {
      term: "Law of segregation (purity of gametes)",
      text: "When the hybrid (F1) forms gametes, the alleles segregate from each other and enter different gametes. Each gamete is pure: it carries only one allele, dominant or recessive.",
    },
    {
      term: "Law of independent assortment",
      text: "When a hybrid with two (or more) pairs of contrasting factors forms gametes, the factors in each pair segregate **independently** of the other pair. Based on the dihybrid cross: F2 phenotypic ratio 9:3:3:1.",
    },
    {
      term: "Test cross",
      text: "The cross of an F1 hybrid with the **homozygous recessive** parent, to test whether an individual is homozygous (all dominant offspring) or heterozygous (1:1).",
    },
    {
      term: "Incomplete dominance and co-dominance",
      text: "**Incomplete dominance**: F1 is intermediate, e.g. flower colour of Mirabilis jalapa (F2 red : pink : white, 1:2:1). **Co-dominance**: both alleles express together, e.g. coat colour in cattle (red, roan, white in 1:2:1).",
    },
    {
      term: "Multiple alleles",
      text: "More than two alternative forms of a gene in a population, occupying the same locus on a chromosome or its homologue. They arise by mutation of the wild type gene. e.g. A, B, O blood groups in human beings.",
    },
    {
      term: "Pleiotropy",
      text: "A single gene influencing two or more unrelated traits (pleiotropic gene), e.g. sickle cell anaemia (Hbs). A carrier marriage gives normal, carrier and anaemic in 1:2:1; the anaemics die, so the ratio is **1:2 instead of 3:1**.",
    },
    {
      term: "Centromere and types of chromosomes",
      text: "Two chromatids are joined at the **centromere (primary constriction)**, which has a disc-shaped **kinetochore** where spindle fibres attach. By centromere position: metacentric (V), submetacentric (L), acrocentric (J) and telocentric (I).",
    },
    {
      term: "Aneuploidy",
      text: "Chromosome number not an exact multiple of the haploid set: addition or deletion of one or more chromosomes. Monosomy 2n-1, nullisomy 2n-2, trisomy 2n+1, tetrasomy 2n+2.",
    },
    {
      term: "Complete and incomplete sex linkage",
      text: "**Complete**: genes on the **non-homologous** regions of X and Y; they inherit together, as crossing over does not occur there. **Incomplete**: genes on the **homologous** regions of X and Y; crossing over occurs, so they do not inherit together, e.g. total colour blindness, nephritis, retinitis pigmentosa.",
    },
    {
      term: "Holandric (Y-linked) genes",
      text: "Genes on the non-homologous region of the Y chromosome. They are inherited directly from male to male, **father to son**, e.g. hypertrichosis (excess hair on the pinna of the ear).",
    },
    {
      term: "Criss-cross inheritance",
      text: "An X-linked recessive gene passes from an affected father to his **grandson through his daughter** (a carrier), as in colour blindness and haemophilia.",
    },
    {
      term: "Hermaphrodite and dioecious",
      text: "Both male and female reproductive organs in the same organism: **bisexual, hermaphrodite or monoecious**. Either male or female organs only: **dioecious** or unisexual (humans).",
    },
  ],
  formulas: [
    { label: "Monohybrid cross, F2", latex: "3:1 \\text{ (phenotype)} \\qquad 1:2:1 \\text{ (genotype)}" },
    { label: "Dihybrid cross, F2 phenotypes", latex: "9:3:3:1" },
    { label: "Test cross of a heterozygote", latex: "1:1 \\text{ (monohybrid)} \\qquad 1:1:1:1 \\text{ (dihybrid)}" },
    { label: "Incomplete dominance or co-dominance, F2", latex: "1:2:1" },
    { label: "Lethal gene (pleiotropy, sickle cell)", latex: "1:2 \\text{ instead of } 3:1" },
    { label: "Aneuploidy", latex: "\\text{monosomy } 2n-1 \\quad \\text{nullisomy } 2n-2 \\quad \\text{trisomy } 2n+1 \\quad \\text{tetrasomy } 2n+2" },
  ],
  derivations: [
    {
      title: "Explain criss-cross inheritance with reference to haemophilia (bleeder's disease), with charts",
      steps: [
        "Haemophilia: X-linked recessive; blood fails to clot or clots very slowly (lack of clotting factor VIII or IX). Normal \\(X^H\\), haemophilic \\(X^h\\).",
        "Cross 1: haemophilic male \\(X^hY\\) × normal female \\(X^HX^H\\). F1: carrier daughters \\(X^HX^h\\) (50%), normal sons \\(X^HY\\) (50%).",
        "Cross 2: carrier daughter \\(X^HX^h\\) × normal male \\(X^HY\\). Gametes \\(X^H, X^h\\) and \\(X^H, Y\\).",
        "F2: normal female, carrier female, normal male, haemophilic male: 25% each.",
        "The gene went from the affected grandfather to the grandson through the carrier daughter: **criss-cross inheritance**.",
      ],
    },
    {
      title: "Explain the haplo-diploid sex determination in honey bees, with a chart",
      steps: [
        "Sex depends on the number of sets of chromosomes received. Females are diploid (2n = 32), males haploid (n = 16).",
        "The queen makes haploid eggs (n = 16) by meiosis; the drone makes haploid sperms (n = 16) by **mitosis**.",
        "A fertilized egg gives a diploid female (2n = 32): queen or worker.",
        "An unfertilized egg gives a haploid male, the **drone** (n = 16), by **parthenogenesis**.",
        "Larvae fed royal jelly become queens (fertile); the rest become workers (sterile females).",
      ],
    },
    {
      title: "Down's syndrome: cause and characteristics",
      steps: [
        "Cause: an extra copy of chromosome 21 (**trisomy 21**), 47 chromosomes, by non-disjunction during gamete formation; commoner in mothers over 45.",
        "Mild or moderate mental retardation; poor skeletal development.",
        "Small head, ears and mouth; flat, rounded face with flat nose.",
        "Open mouth with protruding tongue; eyes slant up and out with epicanthal folds.",
        "Flat hands, stubby fingers; broad palm with a single palmar crease.",
      ],
    },
    {
      title: "Describe Turner's syndrome and Klinefelter's syndrome",
      steps: [
        "Chromosomal disorders are caused by absence or excess of one or more chromosomes, or their abnormal arrangement.",
        "**Turner's** (44 + XO, X monosomy): non-disjunction in egg formation. Female; short, webbed neck, low posterior hair line, broad shield-shaped chest, poorly developed ovaries and breasts, low intelligence.",
        "**Klinefelter's** (44 + XXY): extra X by non-disjunction in ovum formation. Male but feminized: tall, long arms, gynaecomastia, under developed testis, no spermatogenesis, sterile.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Structure of chromosome",
      labels: ["chromatids", "primary constriction (centromere)", "kinetochore", "secondary constriction and satellite", "telomere", "chromonemata and matrix"],
    },
    {
      title: "Structure of X and Y chromosomes",
      labels: ["X chromosome (longer)", "Y chromosome (shorter)", "homologous region", "non-homologous regions", "centromere"],
    },
    {
      title: "Sex linked inheritance of haemophilia (chart)",
      labels: ["parents with genotypes", "gametes", "F1 with genotypes", "carrier and haemophilic named", "percentages"],
    },
    {
      title: "Sex determination in honey bee (chart)",
      labels: ["queen 2n = 32 and drone n = 16", "gametes n = 16 (meiosis, mitosis)", "fertilized egg: female 2n = 32", "unfertilized egg: male n = 16 (parthenogenesis)"],
    },
  ],
  mostAsked: [
    { topic: "Chromosomal disorders: Down's syndrome (trisomy 21) and its symptoms, Turner's and Klinefelter's syndromes", years: [2025, 2024] },
    { topic: "Holandric (Y-linked) genes, passed from father to son; aneuploidy terms", years: [2026] },
    { topic: "Criss-cross inheritance (haemophilia); complete versus incomplete sex linkage", years: [2026] },
    { topic: "Sex determination in honey bees; terms hermaphrodite, Y-linked gene, drone", years: [2026, 2024] },
    { topic: "Chromosome structure: types by position of centromere; primary constriction", years: [2025, 2024] },
    { topic: "Deviations from Mendel: pleiotropy (1:2), incomplete dominance, co-dominance, multiple alleles", years: [2025, 2024] },
    { topic: "Reasons for the success of Mendel", years: [2024] },
  ],
  mistakes: [
    {
      title: "Calling the 1:2 ratio incomplete dominance",
      body: "Incomplete dominance gives 1:2:1. A **1:2** ratio means the recessive homozygote dies (lethal gene), as in sickle cell anaemia, which the book treats under **pleiotropy**.",
    },
    {
      title: "Writing that the drone's sperms are made by meiosis",
      body: "The drone is already haploid (n = 16), so it makes sperms by **mitosis**. Only the queen's eggs come from meiosis.",
    },
    {
      title: "Charts without genotypes and gametes",
      body: "A criss-cross or honey bee chart scores only with parents' genotypes, gametes, offspring genotypes and the phenotype names (carrier, haemophilic) with percentages.",
    },
    {
      title: "Mixing up Turner's and Klinefelter's karyotypes",
      body: "Turner's: **44 + XO**, a female. Klinefelter's: **44 + XXY**, a male. Down's is an autosomal trisomy (21), not a sex chromosome disorder.",
    },
    {
      title: "Confusing complete and incomplete sex linkage",
      body: "Complete sex linkage: genes on the **non-homologous** parts of X and Y. Incomplete: genes on the **homologous** parts, so they can cross over.",
    },
  ],
};

export default sheet;

import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Biology, Ch. 4 Principles of Inheritance and Variation.
 * Laws, ratios and disorders checked against the NCERT text (the book's own
 * wording, trimmed); most-asked years and marks from the CBSE board
 * past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Principles of Inheritance and Variation",
  chapterSlug: "principles-of-inheritance-and-variation",
  source: "NCERT Biology (CBSE Class 12), Chapter 4",
  keyPoints: [
    {
      term: "Mendel's experiments",
      text: "Hybridisation on garden pea for seven years (1856-1863). First use of **statistical analysis and mathematical logic** in biology; a **large sampling size**; inferences confirmed over successive generations. He used **true-breeding** lines (stable traits over generations of self-pollination): 14 varieties, **7 pairs of contrasting traits**.",
    },
    {
      term: "Laws of dominance and segregation",
      text: "**Dominance**: characters are controlled by discrete units called factors; factors occur in pairs; in a dissimilar pair one (dominant) dominates the other (recessive). **Segregation**: alleles do not blend; during gamete formation the factors of a pair segregate, so a gamete receives only one of the two.",
    },
    {
      term: "Law of independent assortment",
      text: "When two pairs of traits are combined in a hybrid, segregation of one pair of characters is **independent** of the other pair. Dihybrid F2: round yellow, wrinkled yellow, round green, wrinkled green in **9:3:3:1**, a combination of 3 yellow : 1 green with 3 round : 1 wrinkled.",
    },
    {
      term: "Incomplete dominance",
      text: "The F1 resembles neither parent but is **in between**. Snapdragon: red RR x white rr gives **pink** Rr. F2: 1 red : 2 pink : 1 white, so the phenotypic ratio equals the genotypic ratio, **1:2:1**. Starch grains in pea (Bb: intermediate size) show it too, though Bb seeds are round.",
    },
    {
      term: "Co-dominance and multiple alleles",
      text: "**Co-dominance**: the F1 resembles **both** parents. ABO blood groups: gene I with three alleles \\(I^A\\), \\(I^B\\), \\(i\\). \\(I^A\\) and \\(I^B\\) are dominant over \\(i\\), but together both express their sugars (AB). **Six genotypes, four phenotypes.** More than two alleles for one character (**multiple alleles**) are seen only in population studies.",
    },
    {
      term: "Polygenic inheritance and pleiotropy",
      text: "**Polygenic**: traits controlled by three or more genes, spread across a gradient, also influenced by environment; the effect of each allele is **additive** (human height, skin colour: AABBCC darkest, aabbcc lightest). **Pleiotropy**: one gene with multiple phenotypic expressions, e.g. **phenylketonuria**.",
    },
    {
      term: "Linkage and recombination",
      text: "Morgan's dihybrid crosses in **Drosophila**: genes on the same chromosome give far more parental combinations, so the F2 deviates from 9:3:3:1. **Linkage**: physical association of genes on a chromosome. **Recombination**: generation of non-parental combinations. White and yellow: 1.3 per cent (tight); white and miniature wing: 37.2 per cent (loose). **Sturtevant** mapped genes by recombination frequency.",
    },
    {
      term: "Sex determination: XO, XY and ZW",
      text: "**Henking (1891)** saw an 'X body' in half the sperms. **XO** (grasshopper): male X, female XX. **XY** (humans, Drosophila): male XY, female XX. Both are **male heterogamety**. **ZW** (birds): female ZW, male ZZ: **female heterogamety**. In humans, 50 per cent of sperms carry X and 50 per cent Y, so the sperm decides the sex.",
    },
    {
      term: "Sex determination in honey bee",
      text: "**Haplodiploid**: a fertilised egg becomes a **female** (queen or worker), diploid, **32 chromosomes**; an unfertilised egg becomes a **male** (drone) by **parthenogenesis**, haploid, **16 chromosomes**. Males produce sperms by **mitosis**, have no father and cannot have sons, but have a grandfather and can have grandsons.",
    },
    {
      term: "Pedigree analysis; Mendelian and chromosomal disorders",
      text: "**Pedigree analysis**: analysis of a trait over several generations of a family, used since control crosses are not possible in humans. **Mendelian disorders**: mutation in a single gene (haemophilia, cystic fibrosis, sickle-cell anaemia, colour blindness, phenylketonuria, thalassemia). **Chromosomal disorders**: absence, excess or abnormal arrangement of chromosomes.",
    },
    {
      term: "Haemophilia and colour blindness",
      text: "**Sex-linked recessive**, genes on the **X chromosome**: passed from a carrier female to some sons. Haemophilia: one protein of the blood clotting cascade is affected, so a cut bleeds non-stop; a haemophilic female is extremely rare. Colour blindness (red or green cone defect): about **8 per cent of males** and only **0.4 per cent of females**.",
    },
    {
      term: "Sickle-cell anaemia",
      text: "**Autosomal recessive**, alleles HbA and HbS; only HbSHbS is diseased, HbAHbS carriers show the sickle-cell trait. A **point mutation**: GAG to GUG at the sixth codon of the beta globin gene, so **glutamic acid is replaced by valine** at the sixth position. At low oxygen tension the haemoglobin polymerises and the RBC becomes sickle shaped.",
    },
    {
      term: "Phenylketonuria and thalassemia",
      text: "**Phenylketonuria**: autosomal recessive inborn error of metabolism; no enzyme to convert phenylalanine into tyrosine, so phenylpyruvic acid accumulates in the brain (mental retardation). **Thalassemia**: autosomal recessive; too few globin chains. **Alpha**: genes HBA1 and HBA2 on chromosome 16. **Beta**: gene HBB on chromosome 11.",
    },
    {
      term: "Chromosomal disorders",
      text: "**Aneuploidy**: gain or loss of a chromosome from failure of chromatid segregation. **Polyploidy**: a whole extra set, from failure of cytokinesis (common in plants). **Down's**: trisomy 21; short, small round head, furrowed tongue, palm crease. **Klinefelter's**: 47, XXY; masculine with gynaecomastia, sterile. **Turner's**: 45, X0; sterile female, rudimentary ovaries.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Monohybrid cross up to F2: true-breeding tall (TT) x dwarf (tt) pea",
      steps: [
        "Parents TT and tt give gametes T and t; the **F1 is Tt, all tall**.",
        "F1 selfed: each makes T and t gametes in equal proportion; a Punnett square gives TT, Tt, Tt, tt.",
        "**Phenotypic ratio 3 tall : 1 dwarf; genotypic ratio 1 TT : 2 Tt : 1 tt.**",
        "The dwarf trait, hidden in F1, reappears unchanged in F2: alleles do not blend (**law of segregation**); tall masks dwarf in Tt (**law of dominance**).",
      ],
    },
    {
      title: "Test cross: is a tall pea plant TT or Tt?",
      steps: [
        "Cross the plant with the dominant phenotype with the **recessive parent** (tt) instead of selfing it.",
        "If all progeny are tall, the plant is **homozygous (TT)**.",
        "If the progeny are **1 tall : 1 dwarf**, the plant is **heterozygous (Tt)**.",
        "For two traits (e.g. violet axial plant x white terminal vvaa): all one type means homozygous; **1:1:1:1** means heterozygous for both.",
      ],
    },
    {
      title: "Dihybrid cross up to F2: round yellow (RRYY) x wrinkled green (rryy)",
      steps: [
        "Gametes RY and ry; the **F1 is RrYy**, all round and yellow (round and yellow are dominant).",
        "F1 forms four kinds of gametes, RY, Ry, rY, ry, in equal proportion (independent assortment).",
        "A 16-box Punnett square gives **9 round yellow : 3 wrinkled yellow : 3 round green : 1 wrinkled green**.",
        "Each pair still segregates 3:1 (12 round : 4 wrinkled, 12 yellow : 4 green), proving the **law of independent assortment**.",
      ],
    },
    {
      title: "Snapdragon flower colour up to F2, against pea flower colour",
      steps: [
        "Snapdragon: red RR x white rr gives F1 Rr, **pink** (R is not completely dominant).",
        "F2: **1 red : 2 pink : 1 white**; phenotype and genotype ratios are both 1:2:1.",
        "Pea: violet VV x white vv gives F1 Vv, all **violet** (complete dominance).",
        "F2: **3 violet : 1 white**, genotypes 1 VV : 2 Vv : 1 vv.",
      ],
    },
    {
      title: "Haemophilia crosses (X = normal, Xh = haemophilic)",
      steps: [
        "Carrier female (\\(XX^h\\)) x normal male (XY): normal daughters and **carrier daughters**, normal sons and **haemophilic sons** (each half of their sex).",
        "Normal female (XX) x haemophilic male (\\(X^hY\\)): **all daughters carriers**, all sons normal.",
        "Carrier female x haemophilic male: half the daughters haemophilic, half carriers; half the sons haemophilic.",
        "Conclusion: **X-linked recessive**; a son gets the gene from his **mother**, and a father passes it only to his daughters.",
      ],
    },
    {
      title: "Why Mendel's work remained unrecognised till 1900",
      steps: [
        "Communication was not easy, so his work was not widely publicised.",
        "His factors as stable, discrete units that do not blend were not accepted to explain the continuous variation seen in nature.",
        "Using mathematics to explain biology was new and unacceptable to many biologists.",
        "He could give **no physical proof** of the factors. In 1900 de Vries, Correns and von Tschermak rediscovered his results.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Symbols used in human pedigree analysis (Figure 4.13)",
      labels: ["male (square), female (circle)", "affected individual (shaded)", "mating", "mating between relatives (double line)", "parents with offspring", "sex unspecified (diamond)"],
    },
    {
      title: "Representative pedigrees: autosomal dominant and recessive (Figure 4.14)",
      labels: ["autosomal dominant: myotonic dystrophy", "affected child has an affected parent", "autosomal recessive: sickle-cell anaemia", "unaffected carrier parents, affected child"],
    },
    {
      title: "Punnett square of a dihybrid cross (Figure 4.7)",
      labels: ["parents RRYY and rryy", "F1 RrYy", "gametes RY, Ry, rY, ry", "F2 ratio 9:3:3:1"],
    },
    {
      title: "Determination of sex by chromosomal differences (Figure 4.12)",
      labels: ["XX female, XY male (humans, Drosophila)", "male heterogamety", "ZW female, ZZ male (birds)", "female heterogamety"],
    },
    {
      title: "Sex determination in honey bee (Figure 4.13)",
      labels: ["queen 2n = 32", "drone n = 16, from unfertilised egg", "meiosis in the female, mitosis in the male", "worker or queen from a fertilised egg"],
    },
    {
      title: "Sickle-cell anaemia: RBCs and the beta chain (Figure 4.15)",
      labels: ["normal biconcave RBC", "sickle-shaped RBC", "GAG to GUG at the sixth codon", "Glu replaced by Val at position 6"],
    },
  ],
  mostAsked: [
    {
      topic: "Pedigrees and sex-linked disorders: dominant or recessive, autosomal or sex-linked, genotypes; haemophilia and colour blindness crosses",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Monohybrid cross and test cross: work out the cross, find the genotype of a tall plant, Mendel's laws and why he succeeded",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Deviations from Mendel: incomplete dominance (snapdragon), co-dominance and multiple alleles (ABO), pleiotropy, polygenic inheritance",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Chromosomal disorders: aneuploidy, Down's, Klinefelter's and Turner's syndromes, karyotypes and symptoms",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Sex determination: Henking, XO, XY and ZW types, honey bee haplodiploidy",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Autosomal Mendelian disorders: sickle-cell anaemia, thalassemia, phenylketonuria, point mutation",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Linkage and recombination: Morgan's work on Drosophila, tight and loose linkage, gene mapping",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Dihybrid cross: 9:3:3:1, the law of independent assortment, counts of progeny or gametes",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Mixing up the ratios",
      body: "Monohybrid F2: **3:1** phenotype, **1:2:1** genotype. Test cross: **1:1**; two genes, **1:1:1:1**. Dihybrid F2: **9:3:3:1**. Incomplete dominance F2: **1:2:1** for both. Of 2400 dihybrid F2 plants, about 1350 show both dominant traits and 150 both recessive.",
    },
    {
      title: "Calling co-dominance incomplete dominance",
      body: "Incomplete dominance: the F1 is **in between** (pink snapdragon). Co-dominance: the F1 shows **both** parents' traits fully (AB blood group; red and white hairs on one coat). Pleiotropy is one gene with many effects; polygenic is many genes for one trait.",
    },
    {
      title: "Wrong route for an X-linked gene",
      body: "A son's X comes from his **mother**, so a haemophilic or colour-blind son has a carrier (or affected) mother. A father gives his X only to **daughters**. A colour-blind man and a non-carrier woman: no affected children, all daughters carriers.",
    },
    {
      title: "Getting heterogamety the wrong way round",
      body: "Humans, Drosophila and grasshopper: **male heterogamety**, the sperm decides sex. Birds: **female heterogamety** (ZW), so the **egg** decides the sex of the chick. Honey bee males make sperms by **mitosis**, not meiosis.",
    },
    {
      title: "Confusing thalassemia with sickle-cell anaemia",
      body: "Thalassemia is **quantitative** (too few globin chains made); sickle-cell anaemia is **qualitative** (an incorrectly functioning globin). Both involve haemoglobin, not myoglobin. Alpha thalassemia: HBA1 and HBA2, chromosome 16; beta: HBB, chromosome 11.",
    },
    {
      title: "Wrong karyotypes for the syndromes",
      body: "Klinefelter's: **47, XXY**, a sterile male with gynaecomastia, tall. Turner's: **45, X0**, a sterile short female. Down's: **trisomy 21**, an autosomal aneuploidy. Phenylketonuria is a gene disorder, not aneuploidy.",
    },
  ],
};

export default sheet;

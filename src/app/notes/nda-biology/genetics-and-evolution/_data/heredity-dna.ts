import type { SubtopicNote } from "@/app/notes/_types";

export const HEREDITY_DNA_NOTE: SubtopicNote = {
  subtopicName: "Heredity and DNA",
  title: "Heredity, DNA and Genes",
  oneLineDefinition:
    "Heredity is the passing of traits from parents to offspring through genes — segments of DNA, the double-helix molecule whose A–T and G–C base pairing carries all genetic information.",
  whyItMatters:
    "This is the foundation of the whole chapter — the NDA tests it as straight recall (base pairing, the meaning of 'allele', who discovered DNA's structure). " +
    "Three facts carry almost every PYQ: A pairs with T and G pairs with C, an allele is a variant form of a gene, and Watson, Crick and Wilkins shared the 1962 Nobel Prize for the double helix. " +
    "All EASY or MODERATE — learn the facts, win the marks.",
  concepts: [
    // Foundation — what heredity is (no PYQ)
    {
      kind: "formula" as const,
      slug: "gen-what-is-heredity",
      name: "Heredity — genes, chromosomes and DNA",
      intuition:
        "Children resemble their parents because they inherit instructions written in a chemical code. " +
        "That code is DNA; a meaningful stretch of it is a gene; genes are packaged into thread-like structures called chromosomes inside the nucleus of every cell. " +
        "Heredity is simply the transfer of these instructions from one generation to the next.",
      definition:
        "The key terms of inheritance, smallest to largest:\n" +
        "- **DNA** (deoxyribonucleic acid) — the molecule that stores genetic information as a sequence of four bases.\n" +
        "- **Gene** — a segment of DNA that codes for one trait or one protein; the basic unit of heredity.\n" +
        "- **Chromosome** — a long, coiled thread of DNA wrapped on protein; humans have **23 pairs (46 in total)**.\n" +
        "- **Genome** — the complete set of genes in an organism.\n" +
        "**Heredity** is the transmission of these genes from parents to offspring; the study of heredity is called **genetics** (a term coined by William Bateson; Gregor Mendel is the 'Father of Genetics').",
      authoredExample: {
        prompt:
          "Arrange from smallest to largest: chromosome, gene, DNA base, genome.",
        steps: [
          "A single DNA base (A, T, G or C) is the smallest unit of the code.",
          "A gene is a sequence of many bases that codes for one trait.",
          "A chromosome is one long DNA thread carrying many genes.",
          "The genome is the entire set of chromosomes/genes in the organism.",
        ],
        answer: "DNA base → gene → chromosome → genome.",
      },
    },

    // DNA structure + base pairing (PYQ: cc85ea66 base pairing) + diagram
    {
      kind: "formula" as const,
      slug: "gen-dna-structure",
      name: "DNA structure and base pairing",
      intuition:
        "DNA is shaped like a twisted ladder — the double helix. The two side-rails are made of sugar and phosphate; the rungs are pairs of nitrogen bases. " +
        "The bases pair in a fixed way, and that fixed pairing is what lets DNA copy itself faithfully every time a cell divides.",
      definition:
        "DNA is a **double helix** of two strands held together by base pairs:\n" +
        "- The four bases are **Adenine (A), Thymine (T), Guanine (G), Cytosine (C)**.\n" +
        "- **A always pairs with T** (2 hydrogen bonds); **G always pairs with C** (3 hydrogen bonds). This is **complementary base pairing**.\n" +
        "- **Chargaff's rule** follows from it: in any DNA, amount of A = amount of T, and G = C.\n" +
        "- A and G are **purines** (double-ring); T and C are **pyrimidines** (single-ring). A purine always pairs with a pyrimidine, keeping the helix an even width.\n" +
        "In **RNA**, thymine (T) is replaced by **uracil (U)**, so A pairs with U.",
      formula: {
        label: "The base-pairing rule",
        latex: "A = T \\qquad G \\equiv C",
        symbols: [
          { symbol: "A = T", meaning: "Adenine pairs with Thymine via 2 hydrogen bonds" },
          { symbol: "G ≡ C", meaning: "Guanine pairs with Cytosine via 3 hydrogen bonds" },
        ],
      },
      visualizationSlug: "gen-dna-base-pairing",
      authoredExample: {
        prompt:
          "One strand of a DNA molecule reads A–G–C–T. What is the sequence of the complementary strand?",
        steps: [
          "Replace each base with its partner: A pairs with T, G pairs with C, C pairs with G, T pairs with A.",
          "A → T, G → C, C → G, T → A.",
        ],
        answer: "The complementary strand reads T–C–G–A.",
      },
      pyqExampleId: "cc85ea66-7b53-47f6-b347-046bd80cf3b7", // base pairing A-T
      traps: [
        {
          title: "A pairs with T, not with G or C",
          body:
            "The distractors offer Adenine–Guanine, Adenine–Cytosine, Thymine–Guanine. None are valid. A purine pairs only with its specific pyrimidine: **A–T and G–C**. Mnemonic: 'Apple in the Tree, Car in the Garage' (A–T, C–G).",
        },
        {
          title: "G–C has 3 hydrogen bonds, A–T has 2",
          body:
            "DNA rich in G–C pairs is more stable (harder to separate) because each G–C rung has three hydrogen bonds versus two for A–T.",
        },
      ],
    },

    // genes, alleles, genotype (PYQ: b76fa1dc alleles)
    {
      kind: "formula" as const,
      slug: "gen-genes-alleles",
      name: "Genes, alleles and genotype",
      intuition:
        "A gene controls a trait — say, flower colour. But a gene can come in different versions: one version makes red flowers, another makes white. " +
        "These alternative versions of the same gene are called alleles, and the particular combination an organism carries is its genotype.",
      definition:
        "The vocabulary of variation:\n" +
        "- **Allele** — one of the different forms (variants) of the same gene; alleles sit at the same **locus** (position) on homologous chromosomes.\n" +
        "- **Genotype** — the actual alleles an organism carries for a trait (e.g. Tt).\n" +
        "- **Phenotype** — the visible, expressed trait (e.g. tall).\n" +
        "- **Homozygous** — two identical alleles (TT or tt); **Heterozygous** — two different alleles (Tt).\n" +
        "- **Dominant** allele — expressed even when one copy is present (written capital, T); **Recessive** — expressed only when both copies are recessive (tt).",
      authoredExample: {
        prompt:
          "A pea plant has the genotype Tt for height, where T (tall) is dominant over t (short). Is the plant tall or short, and is it homozygous or heterozygous?",
        steps: [
          "The plant carries one tall allele (T) and one short allele (t) → two different alleles → heterozygous.",
          "T is dominant, so a single T is enough to show the tall trait.",
        ],
        answer: "The plant is tall (phenotype) and heterozygous (genotype Tt).",
      },
      pyqExampleId: "b76fa1dc-53f9-4453-8c63-026f77303515", // alleles
      traps: [
        {
          title: "Allele vs genotype vs isomer",
          body:
            "An **allele** is a variant of a gene. A **genotype** is the whole allele combination. An **isomer** is a chemistry term (same formula, different structure) and never describes genes — it is a classic distractor here.",
        },
      ],
    },

    // Mendel's laws — foundation (no PYQ)
    {
      kind: "formula" as const,
      slug: "gen-mendel-laws",
      name: "Mendel's laws of inheritance",
      intuition:
        "Gregor Mendel crossed pea plants and worked out the rules of inheritance long before anyone knew DNA existed. " +
        "His two laws explain why a trait can disappear in one generation and reappear in the next, and why different traits are inherited independently.",
      definition:
        "Mendel's three principles:\n" +
        "- **Law of Dominance** — in a heterozygote, only the dominant allele is expressed; the recessive one is masked.\n" +
        "- **Law of Segregation** — the two alleles of a gene separate during gamete formation, so each gamete carries only one allele.\n" +
        "- **Law of Independent Assortment** — alleles of different genes are distributed to gametes independently of one another.\n" +
        "A **monohybrid cross** (Tt × Tt) gives a phenotype ratio of **3 : 1** (3 tall : 1 short) and a genotype ratio of **1 : 2 : 1** (TT : Tt : tt).",
      authoredExample: {
        prompt:
          "Two heterozygous tall pea plants (Tt × Tt) are crossed. What fraction of the offspring are expected to be short (tt)?",
        steps: [
          "Set up the cross Tt × Tt. Each parent gives T or t with equal chance.",
          "The four equally likely combinations are TT, Tt, tT, tt.",
          "Only tt is short → 1 out of 4.",
        ],
        answer: "1/4 (25%) of the offspring are expected to be short.",
      },
      traps: [
        {
          title: "3 : 1 is the phenotype ratio, 1 : 2 : 1 is the genotype ratio",
          body:
            "A Tt × Tt cross gives **3 tall : 1 short** by appearance (phenotype) but **1 TT : 2 Tt : 1 tt** by genetic make-up (genotype). The bank can ask for either — read which one is wanted.",
        },
      ],
    },

    // Discovery of DNA structure (REFERENCE; PYQ bca204f3 Wilkins Nobel)
    {
      kind: "reference" as const,
      slug: "gen-dna-discovery",
      name: "Who discovered the structure of DNA",
      intuition:
        "The double-helix model is one of the most famous discoveries in biology, and the NDA likes to test who did what. " +
        "Watson and Crick built the model, but they relied on Wilkins' and Franklin's X-ray photographs and Chargaff's base-ratio rule. " +
        "The 1962 Nobel Prize went to Watson, Crick and Wilkins — Franklin had died in 1958 and the prize is not awarded posthumously.",
      definition:
        "The scientists behind the DNA story and the contribution the bank tests. Note the trap: **the 1962 Nobel Prize was shared by Watson, Crick and Wilkins** — not Franklin or Chargaff.",
      table: {
        columns: ["Scientist", "Contribution"],
        rows: [
          {
            cells: [
              "**James Watson & Francis Crick**",
              "Built the double-helix model of DNA (1953)",
            ],
          },
          {
            cells: [
              "**Maurice Wilkins**",
              "X-ray diffraction studies of DNA; shared the 1962 Nobel Prize",
            ],
            noteAmber:
              "Wilkins is the name the 1962-Nobel question asks for — alongside Watson and Crick.",
          },
          {
            cells: [
              "**Rosalind Franklin**",
              "X-ray photograph ('Photo 51') that revealed the helix; died 1958, so not in the 1962 prize",
            ],
          },
          {
            cells: [
              "**Erwin Chargaff**",
              "Chargaff's rules — in DNA, A = T and G = C",
            ],
          },
        ],
        caption:
          "Watson + Crick + Wilkins shared the 1962 Nobel Prize in Physiology or Medicine for the molecular structure of nucleic acids.",
      },
      selfCheckExample: {
        prompt:
          "Whose X-ray photograph was crucial to discovering the helix but who was not awarded the 1962 Nobel Prize, and why?",
        steps: [
          "Rosalind Franklin's 'Photo 51' revealed the helical structure.",
          "She died in 1958; the Nobel Prize is not awarded posthumously, so the 1962 prize went to Watson, Crick and Wilkins.",
        ],
        answer: "Rosalind Franklin — she had died before the 1962 award.",
      },
      practiceSet: [
        { prompt: "Who built the double-helix model of DNA?", answer: "James Watson and Francis Crick (1953)" },
        { prompt: "Which three scientists shared the 1962 Nobel Prize for DNA's structure?", answer: "Watson, Crick and Wilkins" },
        { prompt: "Whose rule states that in DNA, A = T and G = C?", answer: "Chargaff's rule (Erwin Chargaff)" },
        { prompt: "Who is called the 'Father of Genetics'?", answer: "Gregor Mendel" },
      ],
      pyqExampleId: "bca204f3-3f46-4576-a227-c41014e763ab", // Wilkins 1962 Nobel
      traps: [
        {
          title: "Franklin and Chargaff are the distractors in the 1962-Nobel question",
          body:
            "The 1962 Nobel was shared by Watson, Crick and **Wilkins**. Rosalind Franklin (who died in 1958) and Erwin Chargaff are offered as wrong options — both contributed, but neither shared that prize.",
        },
      ],
    },
  ],
};

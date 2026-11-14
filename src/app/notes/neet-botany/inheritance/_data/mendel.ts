import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_PI_MENDEL_NOTE: SubtopicNote = {
  subtopicName: "Mendelian Inheritance",
  title: "Mendelian Inheritance",
  oneLineDefinition:
    "How Mendel worked with garden peas, the seven characters he chose, the words genetics uses for genes and crosses, the monohybrid cross with the laws of dominance and segregation, the test cross, and the dihybrid cross with the law of independent assortment.",
  whyItMatters:
    "Nine NEET questions, from 2021 to Re-NEET 2026, and NEET 2024 alone asked three. Three make you work a cross: which plant to use in a test cross, the F2 ratio of a dihybrid cross, and a parent's genotype from its progeny. The rest test Mendel's characters, laws and terms, line by line.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbopi-experiments",
      name: "Mendel's experiments and his seven characters",
      intuition:
        "Mendel chose plants that bred true and that differed in just one character with two clear forms, such as tall or dwarf. He then crossed them and counted large numbers of offspring. Counting is what let him see clean ratios where others saw only a mix. Learn his seven characters with the dominant form of each, because NEET checks the list itself.",
      definition:
        "What NCERT says:\n" +
        "- Mendel did **hybridisation experiments** on the **garden pea** for **seven years (1856 to 1863)** and proposed the laws of inheritance.\n" +
        "- He was the first to apply **statistical analysis** and mathematical logic to problems in biology, and his large sample sizes made his data credible.\n" +
        "- He selected **14 true-breeding** pea varieties: **seven pairs**, each pair alike except for one character with **contrasting traits**.\n" +
        "- A **true-breeding line** is one that, after continuous self-pollination, shows stable inheritance and expression of a trait for several generations.\n" +
        "- Seed shape and seed colour are two separate characters, and so are pod shape and pod colour.",
      table: {
        columns: ["Character", "Dominant trait", "Recessive trait"],
        rows: [
          { cells: ["Stem height", "Tall", "Dwarf"] },
          { cells: ["Flower colour", "Violet", "White"] },
          { cells: ["Flower position", "Axial", "Terminal"] },
          { cells: ["Pod shape", "Inflated", "Constricted"] },
          { cells: ["Pod colour", "Green", "Yellow"] },
          { cells: ["Seed shape", "Round", "Wrinkled"] },
          { cells: ["Seed colour", "Yellow", "Green"] },
        ],
      },
      pyqExampleId: "49451428-396b-4501-9bf8-bf3ca614be21",
      selfCheckExample: {
        prompt: "Among Mendel's seven pea characters, yellow appears in two of them. In which character is yellow the dominant trait, and in which is it the recessive trait?",
        steps: [
          "For seed colour, yellow seeds are dominant over green seeds.",
          "For pod colour, green pods are dominant over yellow pods.",
        ],
        answer: "Yellow is dominant for seed colour and recessive for pod colour.",
      },
      practiceSet: [
        { prompt: "For how many years did Mendel carry out his hybridisation experiments on garden pea?", answer: "Seven years (1856 to 1863)" },
        { prompt: "How many true-breeding pea varieties did Mendel select for his experiments?", answer: "14 (seven pairs)" },
        { prompt: "In Mendel's pea, which flower position is dominant: axial or terminal?", answer: "Axial" },
        { prompt: "In Mendel's pea, which pod shape is dominant: inflated or constricted?", answer: "Inflated" },
        { prompt: "What is a true-breeding line?", answer: "A line that, after continuous self-pollination, shows stable inheritance and expression of a trait for several generations" },
      ],
      traps: [
        {
          title: "Green pods but yellow seeds",
          body: "In pea, **green** is dominant for **pod colour**, while **yellow** is dominant for **seed colour**. Do not carry one character's dominant colour over to the other.",
        },
        {
          title: "Seven characters, fourteen varieties",
          body: "Mendel studied **seven** characters using **14** true-breeding varieties, two contrasting forms for each. Seed shape and seed colour count as two characters; so do pod shape and pod colour.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopi-terms",
      name: "The words of genetics",
      intuition:
        "Most mistakes in this chapter are mistakes of words. Genotype is what the plant carries; phenotype is what you see. A test cross and a back cross sound alike but are not the same. Get each word right once, and the match-the-column questions become easy.",
      definition:
        "Key terms (NCERT):\n" +
        "- **Factor** or **gene**: the unit passed from parent to offspring that controls a character. Mendel called it a factor; we now call it a gene.\n" +
        "- **Alleles**: slightly different forms of the same gene, coding for a pair of contrasting traits (T and t).\n" +
        "- **Homozygous**: two identical alleles (TT, tt). **Heterozygous**: two different alleles (Tt).\n" +
        "- **Genotype**: the genetic make-up (TT, Tt). **Phenotype**: the trait you see (tall).\n" +
        "- **Punnett square**: a grid, developed by the British geneticist **Reginald C. Punnett**, that shows the gametes, the zygotes and the F1 and F2 offspring, and the probability of each genotype.\n" +
        "- **Test cross**: an organism with the dominant phenotype is crossed with the **recessive parent**, and the progeny show its genotype.\n" +
        "- **Inbreeding**: mating of closely related individuals. It increases homozygosity, so harmful recessive genes are exposed and removed by selection. Continued close inbreeding lowers fertility and productivity: **inbreeding depression**.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          { cells: ["Allele", "One of two or more alternative forms of a gene"] },
          { cells: ["Homozygous", "Both alleles of the gene alike, as in TT or tt"] },
          { cells: ["Heterozygous", "The two alleles different, as in Tt"] },
          {
            cells: ["Punnett square", "A grid showing the gametes of the parents, the zygotes and the F1 and F2 offspring"],
            noteAmber: "NEET 2021: the diagram that shows gamete production, zygote formation and the F1 and F2 plants is the Punnett square.",
            pyqExampleId: "d4f53da0-6fda-4e85-b727-a9cba90257d9",
          },
          { cells: ["Test cross", "Cross of a dominant-looking organism (often F1) with the homozygous recessive parent"] },
          { cells: ["Back cross", "Cross of the F1 with either of its parents"] },
          { cells: ["Ploidy", "The number of chromosome sets in a cell"] },
          { cells: ["Inbreeding depression", "Fall in fertility and productivity after continued close inbreeding"] },
        ],
      },
      pyqExampleId: "496da5dc-8102-41eb-9bff-e9c7ef4091b8",
      selfCheckExample: {
        prompt: "A pea plant has the genotype Tt. Name its two alleles, say whether it is homozygous or heterozygous, and give its phenotype.",
        steps: [
          "The alleles are T (tall) and t (dwarf).",
          "The two alleles are different, so the plant is heterozygous.",
          "T is dominant over t, so the plant is tall.",
        ],
        answer: "Alleles T and t; heterozygous; tall.",
      },
      practiceSet: [
        { prompt: "Who developed the Punnett square?", answer: "Reginald C. Punnett, a British geneticist" },
        { prompt: "Is a pea plant with genotype tt homozygous or heterozygous?", answer: "Homozygous (recessive)" },
        { prompt: "What is the genetic make-up of an organism called, as against the trait you can see?", answer: "Its genotype (the visible trait is the phenotype)" },
        { prompt: "What does inbreeding do to homozygosity?", answer: "It increases homozygosity" },
        { prompt: "What is the fall in fertility and productivity after continued close inbreeding called?", answer: "Inbreeding depression" },
      ],
      traps: [
        {
          title: "Test cross is always with the recessive",
          body: "A **test cross** crosses the dominant-looking organism with the **homozygous recessive**. A **back cross** is the F1 crossed with **either** parent. A test cross with the recessive parent is a kind of back cross, but a back cross with the dominant parent is not a test cross.",
        },
        {
          title: "Inbreeding increases homozygosity",
          body: "Inbreeding **increases** homozygosity; it never decreases it. Its cost comes later: continued close inbreeding causes **inbreeding depression**, a fall in fertility and productivity.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nbopi-monohybrid",
      name: "The monohybrid cross and the laws of dominance and segregation",
      intuition:
        "Each parent carries two alleles of a gene but puts only one into each gamete. A Tt plant makes T and t gametes in equal numbers. When two Tt plants are crossed, the four meetings TT, Tt, tT and tt are equally likely. Three of the four carry T and look tall, so the F2 is 3 tall to 1 dwarf by look and 1 to 2 to 1 by genotype.",
      definition:
        "What NCERT says:\n" +
        "- Mendel crossed true-breeding tall and dwarf peas. The **F1 was all tall**. Selfing the F1 gave an **F2** of tall and dwarf in **3 : 1**, and the dwarf plants were as dwarf as the original parent.\n" +
        "- The F2 genotypes are **1 TT : 2 Tt : 1 tt**.\n" +
        "- **Law of Dominance**: (i) characters are controlled by discrete units called **factors**; (ii) factors occur in **pairs**; (iii) in a dissimilar pair of factors one member **dominates** (dominant) and the other is **recessive**. It explains why only one parental character shows in the F1 and both show in the F2, and the 3 : 1 ratio.\n" +
        "- **Law of Segregation**: alleles do not blend, and both characters are recovered as such in the F2 though one of them is not seen in the F1. The two alleles of a parent **segregate** during gamete formation, so each gamete gets **only one** of them.\n" +
        "- A homozygous parent makes one kind of gamete; a heterozygous parent makes **two kinds in equal proportion**.\n" +
        "- **Test cross**: cross the dominant-looking plant with the recessive (tt). All progeny dominant: the plant is **TT**. Dominant and recessive in **1 : 1**: the plant is **Tt**.",
      formula: {
        label: "Monohybrid F2 ratios",
        latex: "\\text{Tt} \\times \\text{Tt} \\rightarrow 1\\,\\text{TT} : 2\\,\\text{Tt} : 1\\,\\text{tt}",
        symbols: [
          { symbol: "TT and tt", meaning: "homozygous plants: tall and dwarf" },
          { symbol: "Tt", meaning: "heterozygous plants: tall, because T is dominant" },
          { symbol: "3 : 1", meaning: "the phenotype ratio, (TT + Tt) tall to tt dwarf" },
        ],
      },
      authoredExample: {
        prompt: "A true-breeding tall pea (TT) is crossed with a true-breeding dwarf pea (tt). Find the F1, and the genotype and phenotype ratios of the F2.",
        steps: [
          "The tall parent makes only T gametes; the dwarf parent makes only t gametes. Every F1 plant is Tt, and tall.",
          "Selfing the F1: each Tt parent makes T and t gametes, half each.",
          "The Punnett square gives TT, Tt, Tt and tt, one quarter each.",
          "Genotypes: 1 TT : 2 Tt : 1 tt. Phenotypes: TT and Tt are tall, tt is dwarf, so 3 tall : 1 dwarf.",
        ],
        answer: "F1 all tall (Tt). F2: 1 TT : 2 Tt : 1 tt by genotype, 3 tall : 1 dwarf by phenotype.",
      },
      pyqExampleId: "23a8cea9-d070-4bd7-bcc2-382bb86cbadd",
      selfCheckExample: {
        prompt: "A tall pea plant is crossed with a dwarf plant, and the progeny are 52 tall and 48 dwarf. What was the genotype of the tall parent?",
        steps: [
          "The dwarf parent is tt, so it gives only t gametes.",
          "Dwarf progeny are tt, so they must have received a t from the tall parent too.",
          "A tall plant carrying t is Tt; the near 1 : 1 ratio of tall to dwarf confirms it.",
        ],
        answer: "Tt (heterozygous tall).",
      },
      practiceSet: [
        { prompt: "In Mendel's monohybrid cross, what fraction of the F2 plants are dwarf?", answer: "One quarter (1/4)" },
        { prompt: "Of the tall plants in a monohybrid F2, what fraction are homozygous (TT)?", answer: "One third", method: "1 TT out of 3 tall (1 TT and 2 Tt)" },
        { prompt: "How many kinds of gamete does a Tt pea plant make, and in what proportion?", answer: "Two kinds, T and t, in equal numbers" },
        { prompt: "A tall pea plant crossed with a dwarf plant gives only tall progeny. What is the genotype of the tall plant?", answer: "TT" },
        { prompt: "Which of Mendel's laws rests on the fact that the dwarf trait reappears unchanged in the F2?", answer: "The Law of Segregation" },
        { prompt: "Out of 800 F2 plants of a monohybrid cross between tall and dwarf peas, about how many would be tall?", answer: "600", method: "\\(\\tfrac{3}{4} \\times 800\\)" },
      ],
      traps: [
        {
          title: "3 : 1 is the phenotype, 1 : 2 : 1 the genotype",
          body: "The monohybrid F2 is **3 : 1** by **phenotype** (tall to dwarf) and **1 : 2 : 1** by **genotype** (TT to Tt to tt).",
        },
        {
          title: "No blending is the Law of Segregation",
          body: "The **Law of Dominance** explains one parental character in the F1 and the 3 : 1 ratio. The fact that alleles do **not blend** and both characters come back as such in the F2 is the basis of the **Law of Segregation**.",
        },
        {
          title: "A test cross uses the recessive, not a hybrid",
          body: "To learn whether a tall plant is TT or Tt, cross it with **tt**. Crossing it with Tt or TT cannot tell the two apart as cleanly.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nbopi-dihybrid",
      name: "The dihybrid cross and the law of independent assortment",
      intuition:
        "With two genes on different chromosomes, each pair of alleles separates on its own. So an RrYy plant makes four kinds of gamete in equal numbers. The F2 is then two 3 : 1 ratios multiplied together, which gives 9 : 3 : 3 : 1. Any one character, counted alone, is still 3 : 1.",
      definition:
        "What NCERT says:\n" +
        "- Mendel crossed **round yellow** (RRYY) with **wrinkled green** (rryy) peas. The **F1** was all **round yellow** (RrYy).\n" +
        "- Selfing the F1 gave four kinds of F2 plant: round yellow, round green, wrinkled yellow and wrinkled green in **9 : 3 : 3 : 1**.\n" +
        "- Counted one character at a time, the F2 still shows **3 : 1** (round to wrinkled, yellow to green).\n" +
        "- **Law of Independent Assortment**: when two pairs of traits are combined in a hybrid, segregation of one pair of characters is independent of the other pair.\n" +
        "- So RrYy makes **four** kinds of gamete, **RY, Ry, rY and ry**, each 25% (one quarter).",
      formula: {
        label: "Dihybrid F2 phenotype ratio",
        latex: "(3 : 1) \\times (3 : 1) = 9 : 3 : 3 : 1",
        symbols: [
          { symbol: "9", meaning: "both dominant traits (round yellow)" },
          { symbol: "3 and 3", meaning: "one dominant and one recessive trait (round green, wrinkled yellow)" },
          { symbol: "1", meaning: "both recessive traits (wrinkled green)" },
        ],
      },
      authoredExample: {
        prompt: "In the F2 of RrYy selfed, what fraction of plants are round green, and what fraction are true-breeding round yellow (RRYY)?",
        steps: [
          "The two genes assort independently, so multiply their separate chances.",
          "Round green: round is \\(\\tfrac{3}{4}\\), green is \\(\\tfrac{1}{4}\\), so \\(\\tfrac{3}{4} \\times \\tfrac{1}{4} = \\tfrac{3}{16}\\).",
          "RRYY: RR is \\(\\tfrac{1}{4}\\), YY is \\(\\tfrac{1}{4}\\), so \\(\\tfrac{1}{4} \\times \\tfrac{1}{4} = \\tfrac{1}{16}\\).",
        ],
        answer: "Round green 3/16; true-breeding round yellow 1/16.",
      },
      pyqExampleId: "6a1dca6e-f39c-4e7c-8045-6163b23e4262",
      selfCheckExample: {
        prompt: "A pea plant heterozygous for seed shape and seed colour (RrYy) is crossed with a wrinkled green plant (rryy). What phenotypes appear in the progeny, and in what ratio?",
        steps: [
          "RrYy makes four gametes in equal numbers: RY, Ry, rY and ry.",
          "rryy makes only ry gametes.",
          "The progeny are RrYy (round yellow), Rryy (round green), rrYy (wrinkled yellow) and rryy (wrinkled green), one quarter each.",
        ],
        answer: "Round yellow, round green, wrinkled yellow and wrinkled green in 1 : 1 : 1 : 1.",
      },
      practiceSet: [
        { prompt: "How many kinds of gamete does a pea plant of genotype RrYy produce?", answer: "Four: RY, Ry, rY and ry, in equal numbers" },
        { prompt: "In the F2 of Mendel's dihybrid cross, what fraction of plants are wrinkled green?", answer: "1/16" },
        { prompt: "In the dihybrid F2, what is the ratio of round to wrinkled seeds when seed shape alone is counted?", answer: "3 : 1", method: "(9 + 3) : (3 + 1) = 12 : 4" },
        { prompt: "State Mendel's Law of Independent Assortment.", answer: "When two pairs of traits are combined in a hybrid, segregation of one pair of characters is independent of the other pair" },
        { prompt: "Out of 1600 F2 plants from an RrYy plant selfed, about how many would be round yellow?", answer: "900", method: "\\(\\tfrac{9}{16} \\times 1600\\)" },
      ],
      traps: [
        {
          title: "9 : 3 : 3 : 1 is the F2, not the F1",
          body: "The F1 of RRYY × rryy is **all round yellow**. The **9 : 3 : 3 : 1** appears only in the **F2**, after the F1 is selfed.",
        },
        {
          title: "Four kinds of gamete, not two",
          body: "RrYy makes **four** kinds of gamete (RY, Ry, rY, ry), not just RY and ry. Leaving out Ry and rY loses the new combinations, and with them the 9 : 3 : 3 : 1.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_HV_INHERITANCE_NOTE: SubtopicNote = {
  subtopicName: "Inheritance and Sickle Cell Anaemia",
  title: "Inheritance and Sickle Cell Anaemia",
  oneLineDefinition:
    "Each parent passes one of its two copies of a gene to a child, so a Punnett square gives the ratios of the children; sickle cell anaemia is a one-gene disorder inherited this way.",
  whyItMatters:
    "Five questions in the bank, one EASY, three MODERATE and one HARD. Three are crosses: Mendel's 3 : 1 ratio, the children of two sickle-cell carriers, and the children of a carrier and a normal parent. Two are about the disease itself: its signs, and why patients take folic acid every day.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9hvme-cross",
      name: "Monohybrid crosses and the Punnett square",
      intuition:
        "You get two copies of every gene, one from each parent, and each parent hands over only one of its two copies, chosen by chance. Write one parent's two copies across the top of a box and the other's down the side, fill in the four squares, and you have every child the pair can have, each equally likely.",
      definition:
        "- A trait is set by a **pair of genes**. A **dominant** gene (capital letter, T) shows even when only one copy is present; a **recessive** gene (small letter, t) shows only when both copies are recessive.\n" +
        "- **Genotype** is the gene pair (TT, Tt, tt); **phenotype** is the trait you see (tall or dwarf).\n" +
        "- Mendel crossed a pure tall pea (TT) with a pure dwarf pea (tt): the **F1** were all tall (Tt).\n" +
        "- Crossing two F1 plants (Tt × Tt), the **F2** gives the **phenotypic ratio 3 : 1** (3 tall : 1 dwarf) and the **genotypic ratio 1 : 2 : 1** (1 TT : 2 Tt : 1 tt).\n" +
        "- For a recessive disorder such as sickle cell anaemia: **normal** = two normal genes, **carrier** = one normal and one sickle gene (healthy, but can pass it on), **sufferer** = two sickle genes.\n" +
        "- Two carriers: 1 normal : 2 carriers : 1 sufferer. A carrier and a normal parent: half normal, half carriers, no sufferer.",
      formula: {
        label: "Ratios of a one-gene cross",
        latex: "Tt \\times Tt \\Rightarrow 1\\,TT : 2\\,Tt : 1\\,tt \\qquad \\text{phenotypes } 3 : 1 \\qquad Tt \\times tt \\Rightarrow 1\\,Tt : 1\\,tt",
        symbols: [
          { symbol: "T", meaning: "the dominant gene (for example, tall)" },
          { symbol: "t", meaning: "the recessive gene (for example, dwarf)" },
          { symbol: "Tt", meaning: "one copy of each: shows the dominant trait, carries the recessive one" },
        ],
      },
      authoredExample: {
        prompt: "In pea plants, round seed (R) is dominant over wrinkled seed (r). Two plants, each Rr, are crossed. What ratios of seed shape and of gene pairs are expected among the offspring?",
        steps: [
          "Each parent gives R or r. The four squares of the Punnett square are RR, Rr, rR and rr.",
          "Gene pairs: 1 RR : 2 Rr : 1 rr.",
          "RR and Rr both have round seeds, so 3 round : 1 wrinkled.",
        ],
        answer: "Seed shape 3 round : 1 wrinkled; gene pairs 1 RR : 2 Rr : 1 rr",
      },
      selfCheckExample: {
        prompt: "A man who suffers from sickle cell anaemia marries a woman who is a carrier. What share of their children are expected to suffer from the disease?",
        steps: [
          "The man (ss) can pass only s. The woman (Ss) passes S or s, each half the time.",
          "Children: Ss (carrier) or ss (sufferer), equally likely.",
        ],
        answer: "50% sufferers (and 50% carriers)",
      },
      practiceSet: [
        { prompt: "A pure tall pea plant (TT) is crossed with a pure dwarf pea plant (tt). What are all the F1 plants like?", answer: "All tall, with the gene pair Tt" },
        { prompt: "What is the genotypic ratio in the F2 generation of a monohybrid cross?", answer: "1 : 2 : 1" },
        { prompt: "Two parents both suffer from sickle cell anaemia. What will all their children be?", answer: "Sufferers, since each parent can pass on only the sickle gene" },
        { prompt: "What is the phenotypic ratio in the F2 generation of Mendel's dihybrid cross?", answer: "9 : 3 : 3 : 1" },
      ],
      pyqExampleId: "755e9b42-7c0f-49c9-a875-260798bf9c3a",
      traps: [
        {
          title: "Giving 1 : 2 : 1 as the phenotypic ratio",
          body: "1 : 2 : 1 is the ratio of gene pairs (genotypes). Because Tt looks the same as TT, the traits you see come in 3 : 1.",
        },
        {
          title: "Making a carrier a sufferer",
          body: "A carrier has one normal and one sickle gene and is usually healthy. Only a child with two sickle genes suffers.",
        },
        {
          title: "Giving sufferers to a carrier and a normal parent",
          body: "The normal parent passes only the normal gene, so every child gets at least one normal copy: half are normal and half are carriers.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9hvme-sickle",
      name: "Sickle cell anaemia: the disease and its care",
      intuition:
        "Healthy red blood cells are soft round discs that slip through the narrowest blood vessels. In sickle cell anaemia a faulty gene makes the haemoglobin inside them stiff, so many cells bend into a sickle (crescent) shape. These cells block small vessels and break down quickly, so the body is always short of red blood cells.",
      definition:
        "- It is a **monogenic** (one-gene) disorder caused by a **recessive** gene for **haemoglobin**.\n" +
        "- Red blood cells become **sickle-shaped**, block small blood vessels and **break down fast**, so **haemoglobin is low** (anaemia).\n" +
        "- Signs: **constant low-grade fever**, **swelling of the hands and feet**, pain in the joints, tiredness, **pale skin** and **yellowish eyes**.\n" +
        "- Care: a **folic acid** tablet **every day**, because folic acid helps the body make new red blood cells; blood transfusion when needed.\n" +
        "- Poorly developed reproductive organs are a sign of **chromosomal** disorders such as Turner and Klinefelter syndromes, **not** of sickle cell anaemia.",
      table: {
        columns: ["Feature", "In sickle cell anaemia"],
        rows: [
          { cells: ["Cause", "A recessive gene for haemoglobin (monogenic)"] },
          { cells: ["Shape of red blood cells", "Sickle (crescent) shaped, stiff"] },
          { cells: ["Haemoglobin", "Low"] },
          { cells: ["Signs", "Low-grade fever, swollen hands and feet, joint pain, pale skin, yellowish eyes"] },
          { cells: ["Daily care", "Folic acid tablet, to help make red blood cells"] },
        ],
        caption: "The eyes turn yellowish, because broken-down red cells release a yellow pigment.",
      },
      selfCheckExample: {
        prompt: "Why do the red blood cells of a sickle cell patient fail to pass easily through narrow blood vessels?",
        steps: ["The faulty haemoglobin makes the cells stiff and sickle-shaped instead of soft and round."],
        answer: "They are stiff and sickle-shaped, so they get stuck and block the small vessels.",
      },
      practiceSet: [
        { prompt: "What kind of disorder is sickle cell anaemia: monogenic or chromosomal?", answer: "Monogenic: it is caused by one gene" },
        { prompt: "Why is a sickle cell patient advised to take folic acid every day?", answer: "Folic acid helps the body make new red blood cells, which break down fast in this disease" },
        { prompt: "What colour do the eyes of a sickle cell patient often turn?", answer: "Yellowish" },
        { prompt: "What happens to the haemoglobin level of a person with sickle cell anaemia?", answer: "It is low" },
      ],
      pyqExampleId: "7c337952-b3f4-4dc6-bb15-62864408809d",
      traps: [
        {
          title: "Saying the eyes turn pink",
          body: "In sickle cell anaemia the skin turns pale and the eyes turn yellowish, not pink.",
        },
        {
          title: "Giving folic acid to the wrong disorder",
          body: "Folic acid is the daily tablet for sickle cell anaemia, to help replace red blood cells. It is not the treatment for albinism or for Down or Turner syndrome.",
        },
      ],
    },
  ],
};

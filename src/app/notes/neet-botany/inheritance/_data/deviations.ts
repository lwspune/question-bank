import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_PI_DEVIATIONS_NOTE: SubtopicNote = {
  subtopicName: "Deviations from Mendel",
  title: "Deviations from Mendel",
  oneLineDefinition:
    "Where inheritance is not a clean case of one allele hiding another: incomplete dominance in snapdragon, co-dominance and multiple alleles in the ABO blood groups, pleiotropy and polygenic inheritance.",
  whyItMatters:
    "Ten NEET questions, all from 2023 to Re-NEET 2026. Four work out ABO genotypes or the chance of a blood group (NEET 2024, Re-NEET 2024, NEET 2026 and Re-NEET 2026). The same four-way match, incomplete dominance, co-dominance, pleiotropy and polygenic inheritance with their NCERT examples, came in Re-NEET 2024 and again in NEET 2026.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbopi-dominance",
      name: "Incomplete dominance and co-dominance",
      intuition:
        "Tall and dwarf pea was a clean case: one allele hides the other. Not every gene works that way. In snapdragon the heterozygote is in between, pink between red and white. In the ABO blood groups both alleles show at once. Whether an allele looks dominant can even depend on which trait you look at.",
      definition:
        "What NCERT says:\n" +
        "- **Incomplete dominance**: the F1 does not resemble either parent and is in between. In snapdragon (*Antirrhinum* sp.), red (RR) × white (rr) gives a **pink** F1 (Rr).\n" +
        "- Selfing the pink F1 gives **1 red : 2 pink : 1 white**. Here the phenotype ratio is the same as the genotype ratio, because every genotype has its own colour.\n" +
        "- **Co-dominance**: the F1 resembles **both** parents. Example: the **ABO blood groups**, where a person with both the A and B alleles is group AB.\n" +
        "- **How dominance works**: a gene often codes for an enzyme. A modified allele that makes a normal or a less efficient enzyme behaves like the normal allele. One that makes a non-functional enzyme, or none, is the **recessive** allele.\n" +
        "- **Dominance depends on the phenotype you look at**: starch synthesis in pea is controlled by one gene with alleles B and b. BB seeds make large starch grains and are round; bb seeds make smaller grains and are wrinkled. Bb seeds are round, so B looks dominant, but their starch grains are of intermediate size: for grain size the alleles show incomplete dominance.",
      table: {
        columns: ["Pattern", "What the heterozygote shows", "NCERT example"],
        rows: [
          { cells: ["Complete dominance", "Only the dominant trait", "Tall (Tt) pea plants"] },
          {
            cells: ["Incomplete dominance", "A trait in between the two parents", "Flower colour in snapdragon (*Antirrhinum*): Rr is pink"],
            noteAmber: "NEET 2024: pink (Rr) × red (RR) snapdragon gives red and pink plants in 1 : 1, and no white.",
            pyqExampleId: "d56a2c24-ce08-455f-b496-b1a7d493341c",
          },
          {
            cells: ["Co-dominance", "Both parental traits together", "ABO blood groups: a person with alleles A and B is group AB"],
            noteAmber: "Re-NEET 2024: blood groups with co-dominance, Antirrhinum flower colour with incomplete dominance, phenylketonuria with pleiotropy, skin colour with polygenic inheritance.",
            pyqExampleId: "74c0d605-a4b5-466a-869c-00050b0da9e9",
          },
          { cells: ["Starch grain size in pea", "Grains of intermediate size in Bb, though the seed is round", "Starch synthesis gene with alleles B and b"] },
        ],
      },
      pyqExampleId: "095062cf-cce7-4adf-bb41-d66dc10a9bff",
      selfCheckExample: {
        prompt: "In snapdragon, two pink-flowered plants are crossed. What flower colours appear in the progeny, and in what ratio?",
        steps: [
          "Pink is the heterozygote, Rr, so the cross is Rr × Rr.",
          "The progeny are RR, Rr and rr in 1 : 2 : 1.",
          "RR is red, Rr is pink and rr is white.",
        ],
        answer: "Red, pink and white in 1 : 2 : 1.",
      },
      practiceSet: [
        { prompt: "In snapdragon, what flower colour does the F1 of a red × white cross have?", answer: "Pink (Rr)" },
        { prompt: "In incomplete dominance, how does the F2 phenotype ratio compare with the F2 genotype ratio?", answer: "They are the same, 1 : 2 : 1" },
        { prompt: "In which pattern of inheritance does the F1 resemble both parents?", answer: "Co-dominance" },
        { prompt: "For starch grain size in pea seeds, what do the alleles B and b show?", answer: "Incomplete dominance (Bb grains are of intermediate size)" },
        { prompt: "A modified allele makes a non-functional enzyme. Is it likely to be dominant or recessive?", answer: "Recessive" },
      ],
      traps: [
        {
          title: "In between is incomplete, both together is co-dominance",
          body: "**Incomplete dominance** (snapdragon) gives an **in-between** trait. **Co-dominance** (AB blood group) shows **both** traits fully. Do not swap the two NCERT examples.",
        },
        {
          title: "The alleles still segregate",
          body: "In snapdragon the F2 is **1 : 2 : 1** by phenotype as well as genotype, because each genotype has its own colour. The alleles R and r do not blend: red and white plants come back in the F2.",
        },
        {
          title: "The same alleles can look dominant or incompletely dominant",
          body: "For **seed shape**, B is dominant (Bb seeds are round). For **starch grain size**, the same alleles show **incomplete dominance** (Bb grains are intermediate).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nbopi-abo",
      name: "ABO blood groups and multiple alleles",
      intuition:
        "The ABO gene has three alleles, but each person carries only two. The A and B alleles each put a slightly different sugar on the red blood cell; the i allele puts none. So A and B each hide i, and together both show. To find a child's chances, list the gametes each parent can make and fill a small Punnett square.",
      definition:
        "What NCERT says:\n" +
        "- The ABO blood groups are controlled by the gene **I**, which has **three alleles**: \\(I^A\\), \\(I^B\\) and \\(i\\).\n" +
        "- The plasma membrane of red blood cells carries sugar polymers, and the gene controls which sugar. \\(I^A\\) and \\(I^B\\) make slightly different forms of the sugar; \\(i\\) makes **none**.\n" +
        "- \\(I^A\\) and \\(I^B\\) are **completely dominant** over \\(i\\). When \\(I^A\\) and \\(I^B\\) are together, **both express**: co-dominance.\n" +
        "- Three alleles give **six genotypes** and **four phenotypes**:\n" +
        "- Group A: \\(I^AI^A\\) or \\(I^Ai\\). Group B: \\(I^BI^B\\) or \\(I^Bi\\). Group AB: \\(I^AI^B\\). Group O: \\(ii\\).\n" +
        "- **Multiple alleles**: more than two alleles governing the same character. Since one person has only two alleles, multiple alleles can be found only when **population studies** are made.",
      formula: {
        label: "Chance of a child's blood group",
        latex: "P(\\text{child}) = P(\\text{allele from mother}) \\times P(\\text{allele from father})",
        symbols: [
          { symbol: "P(allele from mother)", meaning: "the share of the mother's eggs carrying the allele needed: 1 if she is homozygous for it, one half for each allele if she is heterozygous" },
          { symbol: "P(allele from father)", meaning: "the same for the father's sperm" },
        ],
      },
      authoredExample: {
        prompt: "A mother of blood group AB (\\(I^AI^B\\)) and a father of group O (\\(ii\\)) have a child. What blood groups can the child have, and with what chance?",
        steps: [
          "The mother makes \\(I^A\\) and \\(I^B\\) eggs, half each. The father makes only \\(i\\) sperm.",
          "Child \\(I^Ai\\) (group A): \\(\\tfrac{1}{2} \\times 1 = \\tfrac{1}{2}\\).",
          "Child \\(I^Bi\\) (group B): \\(\\tfrac{1}{2} \\times 1 = \\tfrac{1}{2}\\).",
          "No child can be AB (the father has no \\(I^A\\) or \\(I^B\\)) or O (the mother has no \\(i\\)).",
        ],
        answer: "Group A or group B, each with a chance of 1/2; never AB or O.",
      },
      pyqExampleId: "92b6879e-5ffa-47dc-ba05-cae81039eecc",
      selfCheckExample: {
        prompt: "A man of blood group A, whose mother was group O, marries a woman of group AB. What is the chance that their child is group B?",
        steps: [
          "His mother was \\(ii\\), so she gave him \\(i\\): he is \\(I^Ai\\).",
          "A group B child must be \\(I^Bi\\): \\(I^B\\) from the woman and \\(i\\) from the man.",
          "\\(\\tfrac{1}{2} \\times \\tfrac{1}{2} = \\tfrac{1}{4}\\).",
        ],
        answer: "1/4 (25%).",
      },
      practiceSet: [
        { prompt: "How many genotypes and how many phenotypes do the three ABO alleles give?", answer: "Six genotypes and four phenotypes" },
        { prompt: "Which ABO allele does not produce any sugar on the red blood cell?", answer: "\\(i\\)" },
        { prompt: "Can parents of blood groups AB and O have a child of group AB?", answer: "No", method: "the O parent gives only \\(i\\), so every child carries \\(i\\)" },
        { prompt: "Two parents of group A, both \\(I^Ai\\), have a child. What is the chance that the child is group A?", answer: "3/4", method: "only \\(ii\\) (1/4) is not group A" },
        { prompt: "Why can multiple alleles be found only when population studies are made?", answer: "Because one individual can carry only two alleles of a gene" },
        { prompt: "List the genotypes possible for blood group B.", answer: "\\(I^BI^B\\) or \\(I^Bi\\)" },
      ],
      traps: [
        {
          title: "Group A can hide an i",
          body: "A person of group A may be \\(I^AI^A\\) **or** \\(I^Ai\\). Two parents of groups A and B can have a group O child when **both** carry \\(i\\).",
        },
        {
          title: "An AB parent never has an O child",
          body: "An \\(I^AI^B\\) parent gives \\(I^A\\) or \\(I^B\\) to every child, never \\(i\\). So no child of an AB parent can be group O.",
        },
        {
          title: "Three alleles, only two per person",
          body: "The ABO gene has **three** alleles in the population, but each person carries just **two**. Six genotypes, four blood groups.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopi-polygenic",
      name: "Pleiotropy and polygenic inheritance",
      intuition:
        "These two sound alike and are opposites. In pleiotropy one gene has many effects. In polygenic inheritance many genes add up to one trait, which is why human skin colour comes in many shades rather than just two.",
      definition:
        "What NCERT says:\n" +
        "- **Pleiotropy**: a **single gene** shows **multiple phenotypic expression**. Such a gene is called a **pleiotropic gene**. The underlying mechanism is usually the gene's effect on **metabolic pathways**.\n" +
        "- Example: **phenylketonuria**. A mutation in the single gene for the enzyme **phenylalanine hydroxylase** shows up as **mental retardation** and **reduced hair and skin pigmentation**.\n" +
        "- **Polygenic inheritance**: a trait controlled by **three or more genes**, also influenced by the **environment**. Example: **human skin colour**.\n" +
        "- In a polygenic trait the phenotype reflects the contribution of **each allele**: the effect of each allele is **additive**.\n" +
        "- With three genes A, B and C controlling skin colour, AABBCC is the darkest, aabbcc the lightest, and AaBbCc (three dark alleles) is in between.",
      table: {
        columns: ["Pattern", "Meaning", "NCERT example"],
        rows: [
          {
            cells: ["Pleiotropy", "One gene with several phenotypic effects", "Phenylketonuria in humans"],
            noteAmber: "NEET 2023: pleiotropism is a single gene affecting multiple phenotypic expression.",
            pyqExampleId: "02c48622-dee0-4555-9e70-e5d248a25f70",
          },
          { cells: ["Polygenic inheritance", "Three or more genes add up to one trait; environment also acts", "Human skin colour"] },
          { cells: ["Multiple alleles", "More than two alleles of one gene, seen in a population", "ABO blood groups"] },
        ],
      },
      pyqExampleId: "e0350c1f-a29a-4293-8d99-099ae65dddde",
      selfCheckExample: {
        prompt: "Skin colour is controlled by three genes, A, B and C, each with a dark allele (capital letter) and a light allele. Rank three people from darkest to lightest: AaBbCc, AABBCC and aabbcc.",
        steps: [
          "Each dark allele adds the same amount of colour, so count the capital letters.",
          "AABBCC has 6, AaBbCc has 3 and aabbcc has 0.",
        ],
        answer: "AABBCC, then AaBbCc, then aabbcc.",
      },
      practiceSet: [
        { prompt: "The gene for which enzyme is mutated in phenylketonuria?", answer: "Phenylalanine hydroxylase" },
        { prompt: "Name two phenotypic effects of the mutated gene in phenylketonuria.", answer: "Mental retardation, and reduced hair and skin pigmentation" },
        { prompt: "How many genes generally control a polygenic trait?", answer: "Three or more" },
        { prompt: "Besides genes, what else influences a polygenic trait such as human skin colour?", answer: "The environment" },
        { prompt: "How many dark alleles does a person of genotype AaBbCc carry, if capital letters are the dark alleles?", answer: "Three" },
      ],
      traps: [
        {
          title: "Skin colour is polygenic, not pleiotropic",
          body: "**Pleiotropy** is **one gene**, many effects (phenylketonuria). **Polygenic inheritance** is **many genes**, one trait (skin colour). Human skin colour is not an example of pleiotropy.",
        },
        {
          title: "Many genes, not many alleles",
          body: "Many **alleles** of a **single gene** governing a character is **multiple allelism** (ABO). Polygenic inheritance needs **several genes**, each adding its effect.",
        },
      ],
    },
  ],
};

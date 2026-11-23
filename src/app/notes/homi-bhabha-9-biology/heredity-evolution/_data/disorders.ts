import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_HV_DISORDERS_NOTE: SubtopicNote = {
  subtopicName: "Chromosomal and Mitochondrial Disorders",
  title: "Chromosomal and Mitochondrial Disorders",
  oneLineDefinition:
    "A chromosomal disorder comes from one chromosome too many or too few (Down, Turner, Klinefelter syndromes); a mitochondrial disorder comes from faulty mitochondrial DNA and passes only from the mother.",
  whyItMatters:
    "Eight questions in the bank, one EASY and seven MODERATE. Five ask the chromosome set of a syndrome: Klinefelter is 44 + XXY, Turner 44 + X, Down an extra chromosome 21, and which pair has 47. Three ask which disorders pass only from the mother, one of them by naming Leber hereditary optic neuropathy.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9hvdi-chromosomal",
      name: "Down, Turner and Klinefelter syndromes",
      intuition:
        "A normal human cell has 46 chromosomes: 44 autosomes and 2 sex chromosomes (XX in a female, XY in a male). If a mistake during the making of an egg or sperm leaves a child with one extra chromosome or one missing, the body develops differently. Count the chromosomes and look at the sex chromosomes, and you can name the syndrome.",
      definition:
        "- Normal: **44 + XX** (female) and **44 + XY** (male), **46** in all.\n" +
        "- **Down syndrome** (also called **mongolism**, or **trisomy 21**): **three copies of chromosome 21**, so 45 + XX or 45 + XY, **47** in all. It can occur in boys and girls.\n" +
        "- **Turner syndrome**: a **female** with only **one X**, **44 + X** (also written 44 + XO), **45** in all. She is sterile.\n" +
        "- **Klinefelter syndrome**: a **male** with **one extra X**, **44 + XXY**, **47** in all. He is sterile.\n" +
        "- Chromosomal disorders often leave the **reproductive organs poorly developed**.",
      table: {
        columns: ["Syndrome", "Chromosome set", "Total", "Sex"],
        rows: [
          { cells: ["Normal female", "44 + XX", "46", "Female"] },
          { cells: ["Normal male", "44 + XY", "46", "Male"] },
          { cells: ["Down syndrome (trisomy 21)", "45 + XX or 45 + XY (extra chromosome 21)", "47", "Either"] },
          { cells: ["Turner syndrome", "44 + X", "45", "Female"] },
          { cells: ["Klinefelter syndrome", "44 + XXY", "47", "Male"], noteAmber: "Down and Klinefelter are the two with 47." },
        ],
        caption: "Turner is the only one with fewer than 46.",
      },
      selfCheckExample: {
        prompt: "A boy's cells are found to have 47 chromosomes, with three copies of chromosome 21 and the sex chromosomes XY. Name the disorder.",
        steps: ["An extra copy of chromosome 21 is trisomy 21.", "His sex chromosomes are normal, so it is not Klinefelter syndrome."],
        answer: "Down syndrome (trisomy 21)",
      },
      practiceSet: [
        { prompt: "How many chromosomes does a person with Turner syndrome have?", answer: "45 (44 + X)" },
        { prompt: "What is the chromosome set in Klinefelter syndrome?", answer: "44 + XXY" },
        { prompt: "By what other name is Down syndrome known?", answer: "Mongolism, or trisomy 21" },
        { prompt: "Is a person with Turner syndrome male or female?", answer: "Female" },
      ],
      pyqExampleId: "e8141274-ac18-42bf-af9b-a2640753905e",
      traps: [
        {
          title: "Swapping Turner and Klinefelter",
          body: "Turner is a female with one X too few (44 + X). Klinefelter is a male with one X too many (44 + XXY).",
        },
        {
          title: "Giving Turner syndrome 47 chromosomes",
          body: "Turner syndrome has 45. The two common disorders with 47 are Down syndrome and Klinefelter syndrome.",
        },
        {
          title: "Calling Down syndrome a sex-chromosome disorder",
          body: "Down syndrome is an extra copy of chromosome 21, an autosome. The sex chromosomes are normal, and it occurs in both boys and girls.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9hvdi-mito",
      name: "Mitochondrial, monogenic and polygenic disorders",
      intuition:
        "A baby gets its nucleus from both parents, but almost all of its cytoplasm, mitochondria included, comes from the mother's egg: the sperm brings little more than its nucleus. Mitochondria carry a little DNA of their own, so a fault in that DNA can only come down the mother's line.",
      definition:
        "- **Mitochondrial disorders**: caused by faults in the **DNA of the mitochondria**. They pass **only from the mother** to her children. Example: **Leber hereditary optic neuropathy** (loss of eyesight).\n" +
        "- **Monogenic disorders**: caused by a fault in **one gene**. Examples: **sickle cell anaemia**, **albinism**, **haemophilia**, **galactosaemia**.\n" +
        "- **Polygenic disorders**: caused by **many genes** acting together, with the surroundings playing a part, as in diabetes and high blood pressure.\n" +
        "- **Chromosomal disorders**: too many or too few chromosomes (Down, Turner, Klinefelter).\n" +
        "- Monogenic, polygenic and chromosomal disorders can come through **either parent**.",
      table: {
        columns: ["Kind of disorder", "Cause", "Examples", "Passed on by"],
        rows: [
          { cells: ["Mitochondrial", "Faulty mitochondrial DNA", "Leber hereditary optic neuropathy", "The mother only"] },
          { cells: ["Monogenic", "One faulty gene", "Sickle cell anaemia, albinism, haemophilia", "Either parent"] },
          { cells: ["Polygenic", "Many genes together with the surroundings", "Diabetes, high blood pressure", "Either parent"] },
          { cells: ["Chromosomal", "An extra or a missing chromosome", "Down, Turner, Klinefelter syndromes", "An error in making the egg or sperm"] },
        ],
        caption: "Only from the mother means mitochondrial, every time.",
      },
      selfCheckExample: {
        prompt: "Why can a father not pass a mitochondrial disorder on to his children?",
        steps: ["The baby's mitochondria come from the mother's egg, not from the sperm."],
        answer: "His sperm does not give mitochondria to the baby, so faulty mitochondrial DNA comes only from the mother.",
      },
      practiceSet: [
        { prompt: "Which part of the cell carries the DNA that causes mitochondrial disorders?", answer: "The mitochondria" },
        { prompt: "What kind of disorder is albinism?", answer: "A monogenic disorder" },
        { prompt: "What kind of disorder is caused by many genes acting together?", answer: "A polygenic disorder" },
        { prompt: "Which sense is lost in Leber hereditary optic neuropathy?", answer: "Eyesight" },
      ],
      pyqExampleId: "a4245056-e2f6-4007-8259-573ff660bec1",
      traps: [
        {
          title: "Thinking chromosomal disorders pass only from the mother",
          body: "Only mitochondrial disorders come from the mother alone, because the baby's mitochondria come from the egg.",
        },
        {
          title: "Calling sickle cell anaemia a chromosomal disorder",
          body: "Sickle cell anaemia is a fault in one gene, so it is monogenic. The chromosome number stays a normal 46.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_GE_HEREDITY_NOTE: SubtopicNote = {
  subtopicName: "Heredity and Mendel's Crosses",
  title: "Heredity and Mendel's Crosses",
  oneLineDefinition:
    "Each trait is set by a pair of genes, one from each parent; when the two differ, the dominant one shows, and Mendel's crosses predict the ratios in the next generation.",
  whyItMatters:
    "Three questions in the bank: one MODERATE (counting one kind of plant in a dihybrid F2) and two HARD (the father of human genetics, and what therapeutic cloning rests on, from the 2022 paper). The cross is pure method and always gives 9 : 3 : 3 : 1; the other two are names to learn.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spigehe-mendel",
      name: "Monohybrid and dihybrid crosses",
      intuition:
        "Mendel crossed pea plants that differed in one trait, then in two. Each parent gives one gene of each pair to its offspring. " +
        "In the second generation the hidden (recessive) trait comes back in a fixed share: one in four for one trait, and a 9 : 3 : 3 : 1 pattern for two traits.",
      definition:
        "- A **gene** controls a trait; its two forms are **alleles**. A capital letter (T) is **dominant**, a small letter (t) is **recessive**.\n" +
        "- **Genotype** is the gene pair (TT, Tt, tt); **phenotype** is what shows (tall or dwarf). Tt looks like TT.\n" +
        "- **Monohybrid** (one trait): TT \\(\\times\\) tt gives F1 all Tt (all tall). Selfing F1 gives F2 phenotypes **3 : 1** and genotypes **1 : 2 : 1** (TT : Tt : tt).\n" +
        "- **Dihybrid** (two traits): RRYY \\(\\times\\) rryy gives F1 all RrYy. Selfing F1 gives F2 **9 : 3 : 3 : 1** out of 16.\n" +
        "- The **9** shows both dominant traits, each **3** shows one dominant and one recessive, the **1** shows both recessive.\n" +
        "- To count plants: multiply the class's share by the total, such as \\(\\frac{3}{16}\\) of the F2.",
      formula: {
        label: "F2 ratios",
        latex: "\\text{monohybrid } 3:1,\\quad \\text{dihybrid } 9:3:3:1,\\quad \\text{number in a class} = \\frac{\\text{class share}}{16} \\times \\text{total}",
      },
      authoredExample: {
        prompt:
          "Tall (T) is dominant over dwarf (t). A pure tall pea plant is crossed with a dwarf one, and the F1 plants are selfed to give 400 F2 plants. How many F2 plants are dwarf?",
        steps: [
          "TT \\(\\times\\) tt gives F1 all Tt.",
          "Tt \\(\\times\\) Tt gives TT : Tt : tt \\(= 1 : 2 : 1\\), so tall : dwarf \\(= 3 : 1\\).",
          "Dwarf \\(= \\frac{1}{4} \\times 400 = 100\\).",
        ],
        answer: "100",
      },
      selfCheckExample: {
        prompt:
          "Round seed (R) is dominant over wrinkled (r), and yellow (Y) over green (y). RRYY is crossed with rryy and the F1 is selfed to give 320 F2 plants. How many are round and green?",
        steps: [
          "F1 is RrYy. Selfing gives 9 round yellow : 3 round green : 3 wrinkled yellow : 1 wrinkled green.",
          "Round green is one of the 3 classes: \\(\\frac{3}{16} \\times 320 = 60\\).",
        ],
        answer: "60",
      },
      practiceSet: [
        { prompt: "What is the F2 genotype ratio of a monohybrid cross?", answer: "1 : 2 : 1 (TT : Tt : tt)" },
        { prompt: "What is the F2 phenotype ratio of a dihybrid cross?", answer: "9 : 3 : 3 : 1" },
        {
          prompt: "In a dihybrid cross RRYY \\(\\times\\) rryy, the F1 is selfed to give 640 plants. How many show both recessive traits?",
          answer: "\\(\\frac{1}{16} \\times 640 = 40\\)",
        },
        { prompt: "A pure tall plant TT is crossed with a dwarf plant tt. What do all the F1 plants look like?", answer: "Tall (they are all Tt)" },
      ],
      pyqExampleId: "2793f8e6-f798-4211-bda2-dba3be6eb82c",
      traps: [
        {
          title: "Using 9/16 for a mixed class",
          body: "A class with one dominant and one recessive trait is one of the two '3' classes, so its share is 3/16. Only the class with both dominant traits is 9/16.",
        },
        {
          title: "Reading a capital letter as a fixed colour",
          body: "Which trait is dominant is given in the question. If it says green is dominant over yellow, then G is green, even though Mendel's own peas had yellow dominant.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spigehe-pioneers",
      name: "Names in genetics and cloning",
      intuition:
        "A few scientists are remembered by a title, such as 'father of genetics'. Learn each title with its owner, and learn what the two kinds of cloning make.",
      definition:
        "- **Gregor Mendel**: father of **genetics** (laws of inheritance, pea plants).\n" +
        "- **Sir Archibald Garrod**: father of **human genetics** (inherited disorders, 'inborn errors of metabolism').\n" +
        "- **T H Morgan**: worked on fruit flies and showed genes lie on chromosomes.\n" +
        "- **Har Gobind Khorana**: helped crack the **genetic code**.\n" +
        "- **Watson and Crick**: the **double helix** model of DNA.\n" +
        "- **Cloning** makes a genetically identical copy. **Reproductive cloning** makes a whole animal (**Dolly the sheep**, 1996). **Therapeutic cloning** grows **stem cells** to repair a patient's tissues.",
      table: {
        columns: ["Scientist", "Known for"],
        rows: [
          { cells: ["Gregor Mendel", "Father of genetics"] },
          {
            cells: ["Sir Archibald Garrod", "Father of human genetics"],
            noteAmber: "Mendel is the father of genetics; Garrod of human genetics.",
          },
          { cells: ["T H Morgan", "Genes on chromosomes, fruit flies"] },
          { cells: ["Har Gobind Khorana", "The genetic code"] },
          { cells: ["Watson and Crick", "Double helix of DNA"] },
          { cells: ["Ian Wilmut", "Dolly, the first cloned mammal"] },
        ],
      },
      selfCheckExample: {
        prompt: "Spot the wrong pair: (a) Watson and Crick: double helix (b) Mendel: pea plants (c) Khorana: theory of natural selection (d) Morgan: fruit flies",
        steps: ["Watson and Crick, Mendel and Morgan are matched rightly.", "Khorana worked on the genetic code. Natural selection is Darwin's."],
        answer: "(c) is wrong: Khorana worked on the genetic code.",
      },
      practiceSet: [
        { prompt: "Who is called the father of genetics?", answer: "Gregor Mendel" },
        { prompt: "What was the name of the first mammal cloned from an adult cell?", answer: "Dolly the sheep" },
        { prompt: "Which scientists gave the double helix model of DNA?", answer: "Watson and Crick" },
        { prompt: "Which kind of cloning aims to grow stem cells for treatment, not a whole animal?", answer: "Therapeutic cloning" },
      ],
      pyqExampleId: "55cbb688-c3be-46fd-b57c-bb382a883fbf",
      traps: [
        {
          title: "Mendel for human genetics",
          body: "Mendel worked on peas and is the father of genetics as a whole. The father of human genetics is Sir Archibald Garrod.",
        },
        {
          title: "Therapeutic cloning makes a whole animal",
          body: "Reproductive cloning makes a whole animal, like Dolly. Therapeutic cloning stops at stem cells, which are grown into the tissue a patient needs.",
        },
      ],
    },
  ],
};

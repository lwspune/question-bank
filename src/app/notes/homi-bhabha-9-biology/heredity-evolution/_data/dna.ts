import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_HV_DNA_NOTE: SubtopicNote = {
  subtopicName: "DNA and Chromosomes",
  title: "DNA and Chromosomes",
  oneLineDefinition:
    "DNA is a double helix built of nucleotides with four bases; it is packed into chromosomes, which are named by where the centromere sits, and every species has its own fixed number of them.",
  whyItMatters:
    "The busiest page of the chapter: ten questions, two EASY, five MODERATE and three HARD. Four are on DNA itself (the parts of a nucleotide, purines and pyrimidines, thymine against uracil), three name chromosome shapes from a drawing (the same drawing came in November 2021 and again in 2023), and all three HARD questions ask chromosome numbers of animals and plants.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9hvdn-dna",
      name: "DNA, nucleotides and the four bases",
      intuition:
        "DNA is like a twisted ladder. Each side rail is a chain of sugar and phosphate, and each rung is a pair of bases holding hands. The order of the bases along the ladder is the code for every trait you inherit, and a gene is one stretch of that code.",
      definition:
        "- A **nucleotide** is made of three parts: a **sugar** (deoxyribose in DNA), a **phosphate** group (from phosphoric acid) and a **nitrogenous base**.\n" +
        "- The bases of DNA: **adenine (A)** and **guanine (G)** are **purines** (two rings); **cytosine (C)** and **thymine (T)** are **pyrimidines** (one ring).\n" +
        "- In the double helix **A pairs with T** and **G pairs with C**.\n" +
        "- **RNA** has the sugar **ribose** and the base **uracil (U)** in place of thymine. So thymine is found **only in DNA** and uracil **only in RNA**; A, G and C are in both.\n" +
        "- **Watson and Crick** gave the **double helix** model of DNA in **1953**. The structure is the same in all living things.\n" +
        "- Each chromosome holds **one long DNA molecule**. A **gene** is a part of it that controls one trait.",
      table: {
        columns: ["Base", "Group", "Found in", "Pairs with (in DNA)"],
        rows: [
          { cells: ["Adenine (A)", "Purine", "DNA and RNA", "Thymine"] },
          { cells: ["Guanine (G)", "Purine", "DNA and RNA", "Cytosine"] },
          { cells: ["Cytosine (C)", "Pyrimidine", "DNA and RNA", "Guanine"] },
          { cells: ["Thymine (T)", "Pyrimidine", "DNA only", "Adenine"] },
          { cells: ["Uracil (U)", "Pyrimidine", "RNA only", "Takes the place of thymine in RNA"] },
        ],
        caption: "A short memory aid: the purines are A and G (pure As Gold).",
      },
      selfCheckExample: {
        prompt: "Which base is found in RNA but never in DNA, and which base does it replace?",
        steps: ["DNA uses thymine; RNA uses uracil in its place."],
        answer: "Uracil, which takes the place of thymine",
      },
      practiceSet: [
        { prompt: "Which sugar is present in the nucleotides of DNA?", answer: "Deoxyribose" },
        { prompt: "Name the two purine bases of DNA.", answer: "Adenine and guanine" },
        { prompt: "In DNA, with which base does guanine always pair?", answer: "Cytosine" },
        { prompt: "Who gave the double helix model of DNA?", answer: "Watson and Crick (1953)" },
      ],
      pyqExampleId: "b2cc0684-7eef-4bf3-9743-c6fde38a88a1",
      traps: [
        {
          title: "Putting uracil in DNA",
          body: "Uracil is a base of RNA. DNA has adenine, guanine, cytosine and thymine.",
        },
        {
          title: "Calling adenine a pyrimidine",
          body: "Adenine and guanine are the purines (two rings). The pyrimidines are cytosine, thymine and, in RNA, uracil.",
        },
        {
          title: "Adding an extra acid to the nucleotide",
          body: "A nucleotide has only sugar, phosphate and a nitrogenous base. Carbonic acid or any other acid is not part of it.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9hvdn-types",
      name: "Types of chromosomes by the place of the centromere",
      intuition:
        "Every chromosome has a pinch point, the centromere, which splits it into two arms. Where the pinch sits decides the shape: in the middle you get a V with equal arms; a little off centre gives an L; near one end gives a J; right at the end gives a straight rod.",
      definition:
        "- The **centromere** divides a chromosome into two **arms**.\n" +
        "- **Metacentric**: centromere in the **middle**; two **equal** arms; looks like a **V**.\n" +
        "- **Submetacentric**: centromere **a little away** from the middle; one arm slightly shorter; looks like an **L**.\n" +
        "- **Acrocentric**: centromere **near one end**; one arm **very short**; looks like a **J**.\n" +
        "- **Telocentric**: centromere **at the very tip**; only **one arm**; looks like a **rod (I)**.",
      table: {
        columns: ["Type", "Where the centromere is", "Arms", "Shape"],
        rows: [
          { cells: ["Metacentric", "In the middle", "Two equal arms", "V"] },
          { cells: ["Submetacentric", "Slightly away from the middle", "One arm a little shorter", "L"] },
          { cells: ["Acrocentric", "Near one end", "One arm very short", "J"] },
          { cells: ["Telocentric", "At the tip", "Only one arm", "Rod (I)"] },
        ],
        caption: "As the centromere moves from the middle to the tip, the order is metacentric, submetacentric, acrocentric, telocentric.",
      },
      selfCheckExample: {
        prompt: "A chromosome has its centromere right at one end, so it looks like a straight rod with a single arm. What type is it?",
        steps: ["A centromere at the very tip leaves only one arm: telocentric."],
        answer: "Telocentric",
      },
      practiceSet: [
        { prompt: "What shape does a metacentric chromosome have?", answer: "A V shape, with two equal arms" },
        { prompt: "Where is the centromere in an acrocentric chromosome?", answer: "Near one end, so one arm is very short" },
        { prompt: "Which type of chromosome looks like the letter L?", answer: "Submetacentric" },
        { prompt: "What divides a chromosome into two arms?", answer: "The centromere" },
      ],
      pyqExampleId: "fb36c394-feca-44a7-a081-171c5d81bb25",
      traps: [
        {
          title: "Swapping acrocentric and telocentric",
          body: "An acrocentric chromosome still has a tiny second arm (a J). A telocentric one has the centromere at the very tip and only one arm (a rod).",
        },
        {
          title: "Calling the L shape metacentric",
          body: "Metacentric arms are equal, giving a V. When one arm is a little shorter, as in an L, the chromosome is submetacentric.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9hvdn-number",
      name: "Chromosome numbers of animals and plants",
      intuition:
        "Each species carries a fixed number of chromosomes in its body cells, the same in every cell and in every member of the species. The number has nothing to do with size or cleverness: a dog has far more than a human, and a potato more than a frog.",
      definition:
        "- Body cells have chromosomes in **pairs**: humans have **46** (23 pairs).\n" +
        "- The number is fixed for a species, but it does **not** show how big or complex the organism is.\n" +
        "- Animals of the **cat family** (domestic cat, lion, tiger) all have **38**.\n" +
        "- The **roundworm** Ascaris has only **2**, one of the smallest numbers known.",
      table: {
        columns: ["Organism", "Chromosomes in a body cell"],
        rows: [
          { cells: ["Roundworm (Ascaris)", "2"] },
          { cells: ["Fruit fly", "8"] },
          { cells: ["Pea", "14"] },
          { cells: ["Onion", "16"] },
          { cells: ["Maize", "20"] },
          { cells: ["Rice", "24"] },
          { cells: ["Frog", "26"] },
          { cells: ["Cat, lion, tiger", "38"] },
          { cells: ["Mouse", "40"] },
          { cells: ["Wheat", "42"] },
          { cells: ["Human", "46"] },
          { cells: ["Chimpanzee, potato", "48"] },
          { cells: ["Horse", "64"] },
          { cells: ["Dog", "78"], noteAmber: "The largest number in this table." },
        ],
        caption: "The table runs in ascending order, which is how an ordering question wants the answer.",
      },
      selfCheckExample: {
        prompt: "Arrange in ascending order of chromosome number: horse, onion, human.",
        steps: ["Onion has 16, human 46 and horse 64."],
        answer: "Onion, human, horse",
      },
      practiceSet: [
        { prompt: "How many chromosomes are there in a human body cell?", answer: "46 (23 pairs)" },
        { prompt: "Which has more chromosomes: a dog or a human?", answer: "A dog (78, against 46 in a human)" },
        { prompt: "How many chromosomes does a tiger have?", answer: "38, the same as a lion and a domestic cat" },
        { prompt: "Arrange in ascending order of chromosome number: rice, pea, wheat.", answer: "Pea (14), rice (24), wheat (42)" },
      ],
      pyqExampleId: "0481b949-9849-4459-bf6b-64a24d8320ee",
      traps: [
        {
          title: "Thinking a bigger animal has more chromosomes",
          body: "Chromosome number has nothing to do with size. The lion and the domestic cat both have 38, and a dog (78) has more than a horse (64).",
        },
        {
          title: "Thinking humans have the most chromosomes",
          body: "Humans have 46. The chimpanzee and the potato have 48 and the dog 78.",
        },
      ],
    },
  ],
};

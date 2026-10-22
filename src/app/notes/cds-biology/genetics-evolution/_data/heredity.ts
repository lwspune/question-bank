import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_GE_HEREDITY_NOTE: SubtopicNote = {
  subtopicName: "Heredity and DNA",
  title: "Heredity and DNA",
  oneLineDefinition:
    "What chromosomes and genes are made of, how Mendel's crosses give their ratios, how the sex of a child is decided, and the enzymes and products of genetic engineering.",
  whyItMatters:
    "Nine CDS questions from 2017 (II) to 2026 (II), and both HARD questions of the chapter are here: how many insulin genes a person has, and what Photo 51 shows. Five are about chromosomes and DNA, one is a Mendel ratio, one is about a girl's chromosomes, and two are about genetic engineering.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbige-chromosomes",
      name: "Chromosomes, DNA and genes",
      intuition:
        "Every cell keeps its instructions in long threads of DNA inside the nucleus. To fit, the DNA is wound around little spools of protein called histones, the way thread is wound on a reel, and the wound-up thread is a chromosome. A gene is one stretch of that DNA that holds the recipe for one protein. A change in the DNA is a mutation.",
      definition:
        "Chromosomes and DNA (NCERT Class 10 and 12):\n" +
        "- A **chromosome** is made of **DNA and proteins**. The main proteins are the **histones**: basic proteins, found **in the nucleus**, around which DNA is wound to form **nucleosomes**.\n" +
        "- **DNA** is a **double helix** (Watson and Crick, 1953). Its bases pair as **adenine with thymine** and **guanine with cytosine**.\n" +
        "- The double helix was worked out with the help of **Photo 51**, an X-ray picture of DNA taken by **Rosalind Franklin** (with Raymond Gosling).\n" +
        "- A **gene** is a stretch of DNA that codes for a protein. Humans have **one functional insulin gene**; the hormone's two chains are cut from one long chain made from it.\n" +
        "- A **mutation** is a change in the **genetic material** (the DNA, or the RNA of an RNA virus).\n" +
        "- A human body cell has **46 chromosomes** (23 pairs).",
      table: {
        columns: ["Term", "Fact"],
        rows: [
          {
            cells: ["Histones", "Basic proteins in the nucleus, bound to DNA"],
            noteAmber: "CDS 2019 (I): histones are proteins present in the nucleus in association with DNA.",
            pyqExampleId: "6ab5650f-1845-4dd6-870f-9a452af3e323",
          },
          {
            cells: ["Photo 51", "X-ray picture of DNA by Rosalind Franklin"],
            noteAmber: "CDS 2024 (I), HARD: Photo 51 is an image of DNA molecules.",
            pyqExampleId: "a00581d9-ca53-42d3-af36-ab30a3b62dbe",
          },
          { cells: ["Double helix", "Watson and Crick, 1953"] },
          { cells: ["Base pairs", "A with T, G with C"] },
          {
            cells: ["Insulin gene", "One functional gene in adult humans"],
            noteAmber: "CDS 2017 (II), HARD: adult humans have one functional insulin gene.",
            pyqExampleId: "d514a395-873e-40ef-9f89-b4d362e1c571",
          },
          {
            cells: ["Mutation", "A change in the genetic material"],
            noteAmber: "CDS 2022 (I): a mutation in a virus is a change in its genetic material.",
            pyqExampleId: "38a330a7-2778-45bf-9d5a-dbfe02aa6345",
          },
          { cells: ["Human chromosome number", "46, in 23 pairs"] },
        ],
      },
      pyqExampleId: "f3e78a3f-39d7-41f1-beae-9ecfdf6c4dc1",
      selfCheckExample: {
        prompt: "In a sample of double-stranded DNA, 30 per cent of the bases are adenine. What percentage are guanine?",
        steps: [
          "Adenine pairs with thymine, so thymine is also 30 per cent.",
          "Together A and T make 60 per cent, leaving 40 per cent for guanine and cytosine.",
          "Guanine pairs with cytosine, so they share it equally: 20 per cent each.",
        ],
        answer: "20 per cent guanine.",
      },
      practiceSet: [
        { prompt: "Who proposed the double-helix model of DNA?", answer: "James Watson and Francis Crick (1953)" },
        { prompt: "How many chromosomes does a human body cell have?", answer: "46 (23 pairs)" },
        { prompt: "What is a stretch of DNA that codes for a protein called?", answer: "A gene" },
        { prompt: "With which base does guanine pair in DNA?", answer: "Cytosine" },
      ],
      traps: [
        {
          title: "Histones live in the nucleus",
          body: "**Histones** are proteins wound up with DNA **in the nucleus**. They are not membrane proteins of the mitochondria, and they are not joined to lipids or carbohydrates in the cytosol.",
        },
        {
          title: "Photo 51 is DNA, not a virus",
          body: "**Photo 51** is Rosalind Franklin's X-ray picture of **DNA**. It has nothing to do with the COVID-19 virus, the common cold or the Moon.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsbige-mendel",
      name: "Mendel's monohybrid cross",
      intuition:
        "Each pea plant carries two copies of the gene for height, one from each parent, and passes on only one of them to each seed. Tall (T) wins over short (t), so a plant with even one T is tall. Cross a pure tall plant with a short one and every child is Tt, and tall. Cross two of those children, and the four ways the copies can meet give one TT, two Tt and one tt.",
      definition:
        "Mendel's rules for one character (NCERT Class 10 and 12):\n" +
        "- **Dominant** trait (T, tall) shows even when only one copy is present; **recessive** (t, short) shows only in **tt**.\n" +
        "- **Pure** (true-breeding) plants have two **identical** copies: **TT** or **tt**. A **hybrid** has **Tt**.\n" +
        "- **F1** of TT × tt: all **Tt**, all tall.\n" +
        "- **F2** (F1 × F1): genotypes **1 TT : 2 Tt : 1 tt**, phenotypes **3 tall : 1 short**.\n" +
        "- A **test cross** (unknown tall × tt) shows the genotype: all tall means TT; half tall and half short means Tt.\n" +
        "- For two characters (a **dihybrid** cross) the F2 phenotypes come out **9 : 3 : 3 : 1**.",
      formula: {
        label: "Monohybrid cross",
        latex:
          "TT \\times tt \\;\\to\\; F_1:\\ Tt \\qquad Tt \\times Tt \\;\\to\\; F_2:\\ 1\\,TT : 2\\,Tt : 1\\,tt",
        symbols: [
          { symbol: "T", meaning: "dominant copy (tall)" },
          { symbol: "t", meaning: "recessive copy (short)" },
          { symbol: "F1, F2", meaning: "first and second generations" },
        ],
      },
      authoredExample: {
        prompt: "Two hybrid tall pea plants (Tt) are crossed. Find the genotype and phenotype ratios of the offspring.",
        steps: [
          "Each parent makes two kinds of gamete in equal numbers: T and t.",
          "Draw the 2 × 2 Punnett square: T with T gives TT; T with t gives Tt (twice); t with t gives tt.",
          "Genotypes: 1 TT : 2 Tt : 1 tt.",
          "TT and Tt are both tall, so phenotypes are 3 tall : 1 short.",
        ],
        answer: "Genotypes 1 TT : 2 Tt : 1 tt; phenotypes 3 tall : 1 short.",
      },
      pyqExampleId: "96852ab5-a385-487a-8ef1-9fc08ae8ba52",
      selfCheckExample: {
        prompt: "A tall pea plant of unknown genotype is crossed with a short plant (tt). Half the offspring are tall and half are short. What was the genotype of the tall parent?",
        steps: [
          "The short parent can only give t.",
          "If the tall parent were TT, every child would be Tt and tall.",
          "Short children (tt) need a t from the tall parent too, so it must carry one.",
        ],
        answer: "Tt (a hybrid tall plant).",
      },
      practiceSet: [
        { prompt: "In the F1 of a cross between a pure tall (TT) and a short (tt) plant, what fraction of plants is tall?", answer: "All of them", method: "Every F1 plant is Tt" },
        { prompt: "What is the F2 phenotypic ratio in a dihybrid cross?", answer: "9 : 3 : 3 : 1" },
        { prompt: "When two Tt plants are crossed, what fraction of the offspring is short?", answer: "One quarter", method: "Only tt is short" },
        { prompt: "Is a plant with genotype Tt pure-breeding or hybrid?", answer: "Hybrid" },
      ],
      traps: [
        {
          title: "Pure tall means TT only",
          body: "A **pure** tall plant is **TT**. The **Tt** plants are tall too, but they are hybrids. So in the F2 of TT × tt, 'tall' is 3 in 4, while 'pure tall' is only **1 in 4**.",
        },
        {
          title: "3 : 1 is what you see, 1 : 2 : 1 is what they carry",
          body: "**3 : 1** is the F2 **phenotype** ratio (tall : short). **1 : 2 : 1** is the **genotype** ratio (TT : Tt : tt). Read which one the question asks for.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbige-sex",
      name: "How sex is decided",
      intuition:
        "A woman has two X chromosomes, so every egg she makes carries an X. A man has one X and one Y, so half his sperm carry X and half carry Y. The egg is always the same; it is the sperm that decides. An X sperm makes a girl, and a Y sperm makes a boy.",
      definition:
        "Sex determination in humans (NCERT Class 10):\n" +
        "- Of the 23 pairs, **22 pairs are autosomes** and **1 pair is the sex chromosomes**.\n" +
        "- **Female**: **XX**. Every egg carries **X**.\n" +
        "- **Male**: **XY**. Half the sperm carry **X**, half carry **Y**.\n" +
        "- Egg (X) + sperm (X) gives **XX, a girl**: one X from the mother and one X from the father.\n" +
        "- Egg (X) + sperm (Y) gives **XY, a boy**.\n" +
        "- So the **father's sperm decides** the sex of the child, and each birth has an **equal chance** of a boy or a girl.",
      table: {
        columns: ["Egg from mother", "Sperm from father", "Child"],
        rows: [
          {
            cells: ["X", "X", "XX: girl"],
            noteAmber: "CDS 2020 (II): a normal girl gets one X from the mother and one X from the father.",
            pyqExampleId: "14e012fe-3b18-4262-b9e9-f89d1f38d043",
          },
          { cells: ["X", "Y", "XY: boy"] },
        ],
      },
      pyqExampleId: "14e012fe-3b18-4262-b9e9-f89d1f38d043",
      selfCheckExample: {
        prompt: "A couple already has three daughters. What is the chance that their fourth child will be a son?",
        steps: [
          "Every egg carries X; the sex depends only on whether an X or a Y sperm fertilises it.",
          "Half the father's sperm carry Y, so each child has a one-in-two chance of being a boy.",
          "Earlier births do not change this chance.",
        ],
        answer: "One in two (50 per cent), the same as for every child.",
      },
      practiceSet: [
        { prompt: "How many pairs of autosomes does a human cell have?", answer: "22" },
        { prompt: "Which parent's gamete decides the sex of a child?", answer: "The father's (the sperm)" },
        { prompt: "What sex chromosomes does a human male have?", answer: "XY" },
        { prompt: "What fraction of a man's sperm carry a Y chromosome?", answer: "Half" },
      ],
      traps: [
        {
          title: "The mother can only give X",
          body: "A woman is XX, so every egg carries **one X**. Options that give a child two X chromosomes from the mother, or an X and a Y from the father, cannot happen.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbige-engineering",
      name: "Genetic engineering",
      intuition:
        "Genetic engineering moves a useful gene from one living thing into another. Special enzymes act as scissors and glue: one kind cuts DNA at exact spots, another sticks the pieces together. The gene is carried into the new host on a small ring of DNA called a plasmid. Bacteria given the human insulin gene make human insulin, and cotton given a gene from a bacterium kills the insects that eat it.",
      definition:
        "Tools and products (NCERT Class 12, Biotechnology):\n" +
        "- **Nucleases** cut DNA. **Exonucleases remove nucleotides from the ends** of DNA; **endonucleases cut at positions within** it.\n" +
        "- **Restriction endonucleases** cut DNA at **specific sequences**. They are used in genetic engineering to form **recombinant** molecules of DNA, made of DNA from different genomes.\n" +
        "- **DNA ligase** joins the cut pieces together. A **plasmid** (a small ring of bacterial DNA) is the usual **vector** that carries the gene into the host.\n" +
        "- An organism given a gene from another species is **transgenic** (a genetically modified organism, GMO).\n" +
        "- It is used in **bacteria, plants and animals**: **human insulin** made by E. coli; **Bt cotton** with an insect-killing gene from **Bacillus thuringiensis**; **Golden Rice** rich in vitamin A; transgenic animals, made by putting the gene in at a **very early stage**.\n" +
        "- One worry: genes for insect resistance may **spread from crops to wild plants**.",
      table: {
        columns: ["Tool or product", "What it is or does"],
        rows: [
          {
            cells: ["Restriction endonuclease", "Cuts DNA at a specific sequence; used to form recombinant DNA"],
            noteAmber: "CDS 2026 (II): exonucleases remove end nucleotides AND restriction endonucleases are used to form recombinant DNA; both statements are correct.",
            pyqExampleId: "69e7e45b-e8dd-4daa-8974-6bba92380e63",
          },
          { cells: ["Exonuclease", "Removes nucleotides from the ends of DNA"] },
          { cells: ["DNA ligase", "Joins pieces of DNA"] },
          { cells: ["Plasmid", "Small ring of bacterial DNA used as a vector"] },
          { cells: ["Human insulin", "Made by genetically engineered bacteria"] },
          {
            cells: ["Bt cotton", "Carries an insect-killing gene from Bacillus thuringiensis"],
            noteAmber: "CDS 2022 (I): the false statement is that genetic modification is used only in plants.",
            pyqExampleId: "98bd0ac2-b60b-46a2-8f89-102d3a5de7b1",
          },
        ],
      },
      pyqExampleId: "69e7e45b-e8dd-4daa-8974-6bba92380e63",
      selfCheckExample: {
        prompt: "Outline how bacteria can be made to produce human insulin.",
        steps: [
          "Cut out the human insulin gene, and open a plasmid, with the same restriction enzyme.",
          "Join the gene into the plasmid with DNA ligase, making recombinant DNA.",
          "Put the plasmid into a bacterium such as E. coli, and grow the bacteria in large tanks.",
          "The bacteria read the human gene and make insulin, which is then purified.",
        ],
        answer: "Cut the gene and plasmid with one restriction enzyme, join them with ligase, put the plasmid into bacteria and grow them.",
      },
      practiceSet: [
        { prompt: "Which enzyme joins pieces of DNA together?", answer: "DNA ligase" },
        { prompt: "From which bacterium does Bt cotton get its insect-killing gene?", answer: "Bacillus thuringiensis" },
        { prompt: "What is an organism that carries a gene from another species called?", answer: "Transgenic (a genetically modified organism)" },
        { prompt: "What small ring of DNA is used to carry a gene into a bacterium?", answer: "A plasmid" },
      ],
      traps: [
        {
          title: "Genetic engineering is not only for plants",
          body: "It is used in **bacteria** (human insulin), **plants** (Bt cotton) and **animals** (transgenic animals). A statement limiting it to plants is false.",
        },
        {
          title: "Scissors and glue",
          body: "**Restriction enzymes** cut DNA; **ligase** joins it. Exonucleases nibble from the ends, endonucleases cut inside.",
        },
      ],
    },
  ],
};

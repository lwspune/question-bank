import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_PI_DISORDERS_NOTE: SubtopicNote = {
  subtopicName: "Mutation and Genetic Disorders",
  title: "Mutation and Genetic Disorders",
  oneLineDefinition:
    "What a mutation is and what causes one, the symbols of a human pedigree, the single-gene (Mendelian) disorders and how each is inherited, the chance of a child in an X-linked cross, and the chromosomal disorders.",
  whyItMatters:
    "Fourteen NEET questions, from 2021 to Re-NEET 2026: the most asked page of the chapter. Six touch chromosomal disorders (Down's, Klinefelter's and Turner's syndromes, and aneuploidy against polyploidy). The other eight test single-gene disorders five times (sickle-cell anaemia in NEET 2021 and NEET 2026, colour blindness in NEET 2022), a pedigree symbol, a mutagen and one pedigree probability.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbopi-mutation",
      name: "Mutation and pedigree analysis",
      intuition:
        "A mutation is a change in the DNA sequence. If it changes a single base pair, it is a point mutation; if bases are added or lost, everything after the change is read out of step. Human families cannot be bred to order, so geneticists follow a disorder through a family tree, drawn with a small set of standard symbols.",
      definition:
        "What NCERT says:\n" +
        "- **Mutation** is a phenomenon that alters the DNA sequence and so changes the genotype and the phenotype. Besides recombination, it is the other source of variation in DNA.\n" +
        "- Loss (**deletion**) or gain (**insertion** or duplication) of a segment of DNA alters a chromosome. Such **chromosomal aberrations** are commonly seen in **cancer cells**.\n" +
        "- **Point mutation**: a change in a **single base pair** of DNA. Example: **sickle-cell anaemia**.\n" +
        "- Deletions and insertions of base pairs cause **frameshift mutations**.\n" +
        "- **Mutagens** are the chemical and physical factors that induce mutations. **UV radiation** can cause mutations, and radiations such as **gamma rays** are used to induce mutations in plants.\n" +
        "- **Pedigree analysis**: tracing a trait through several generations of a family. Controlled crosses are not possible in humans, so this is how a human trait is studied.",
      table: {
        columns: ["Pedigree symbol", "What it stands for"],
        rows: [
          { cells: ["Square", "Male"] },
          { cells: ["Circle", "Female"] },
          { cells: ["Diamond", "Sex not specified"] },
          { cells: ["Filled (shaded) symbol", "An affected individual"] },
          { cells: ["Single horizontal line joining a square and a circle", "Mating"] },
          {
            cells: ["Double horizontal line joining a square and a circle", "Mating between relatives (consanguineous mating)"],
            noteAmber: "NEET 2023: mating between relatives is a square and a circle joined by a double horizontal line.",
            pyqExampleId: "dd5bbb32-0b4d-4dfe-a876-f14bfb8c2eec",
          },
        ],
      },
      pyqExampleId: "3aa0a103-9032-43ae-92c9-351d522dbce4",
      selfCheckExample: {
        prompt: "A single base pair is lost from the middle of a gene. What kind of mutation is this, and how is it different from a point mutation such as the one in sickle-cell anaemia?",
        steps: [
          "Loss of a base pair is a deletion, and deletions or insertions of base pairs cause frameshift mutations.",
          "A point mutation changes one base pair for another and leaves the rest of the gene as it was.",
        ],
        answer: "A frameshift mutation (a deletion); a point mutation only swaps a single base pair.",
      },
      practiceSet: [
        { prompt: "What is a change in a single base pair of DNA called?", answer: "A point mutation" },
        { prompt: "What are the chemical and physical factors that induce mutations called?", answer: "Mutagens" },
        { prompt: "In which cells are chromosomal aberrations commonly observed?", answer: "Cancer cells" },
        { prompt: "In a human pedigree chart, what does a diamond stand for?", answer: "An individual whose sex is not specified" },
        { prompt: "In a human pedigree chart, what does a filled circle show?", answer: "An affected female" },
      ],
      traps: [
        {
          title: "Kinetin and zeatin are hormones, not mutagens",
          body: "**Kinetin** and **zeatin** are cytokinins (plant growth regulators). Radiations such as **UV** and **gamma rays** are the physical mutagens.",
        },
        {
          title: "A double line means relatives",
          body: "A **single** line joins any mating pair. A **double** line marks **mating between relatives** (consanguineous mating).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopi-mendelian-disorders",
      name: "Mendelian disorders",
      intuition:
        "A Mendelian disorder comes from a change in one gene, so it passes down by Mendel's rules. Two questions fix its pattern: is the gene on an autosome or on the X chromosome, and is the faulty allele dominant or recessive? Learn each disorder with its pattern and the one thing that goes wrong.",
      definition:
        "What NCERT says:\n" +
        "- Mendelian disorders are caused by alteration or mutation in a **single gene**. They follow Mendel's principles and can be traced in a pedigree. The trait may be **dominant or recessive**, and on an **autosome** or the **X chromosome**.\n" +
        "- **Sickle-cell anaemia**: controlled by one pair of alleles, \\(\\text{Hb}^A\\) and \\(\\text{Hb}^S\\). Only \\(\\text{Hb}^S\\text{Hb}^S\\) shows the disease; heterozygotes look unaffected but are **carriers**, passing the allele to half their children.\n" +
        "- In sickle-cell anaemia, **glutamic acid** is replaced by **valine** at the **sixth** position of the beta globin chain, because the sixth codon of the beta globin gene changes from **GAG to GUG**. The mutant haemoglobin **polymerises** under **low oxygen tension**, and the red blood cell changes from a biconcave disc to a sickle shape.\n" +
        "- **Phenylketonuria**: an inborn error of metabolism. The person lacks the enzyme that converts **phenylalanine into tyrosine**, so phenylalanine builds up and is turned into **phenylpyruvic acid**. Its build-up in the brain causes mental retardation; it is also passed in the urine.\n" +
        "- **Thalassemia**: too few globin chains are made, so abnormal haemoglobin forms and causes anaemia. **α-thalassemia** is controlled by two closely linked genes, HBA1 and HBA2, on **chromosome 16**; **β-thalassemia** by a single gene, HBB, on **chromosome 11**.\n" +
        "- Thalassemia is a **quantitative** problem (too few globin molecules); sickle-cell anaemia is a **qualitative** problem (a globin that works wrongly).\n" +
        "- **Colour blindness**: a defect in the red or green cone of the eye. It occurs in about **8%** of males and only about **0.4%** of females.\n" +
        "- **Haemophilia**: a protein of the blood-clotting cascade is affected, so a simple cut may bleed without stopping.",
      table: {
        columns: ["Disorder", "How it is inherited", "What goes wrong"],
        rows: [
          { cells: ["Haemophilia", "X-linked recessive", "A protein of the blood-clotting cascade is affected"] },
          { cells: ["Colour blindness", "X-linked recessive", "Defect in the red or green cone of the eye"] },
          {
            cells: ["Sickle-cell anaemia", "Autosomal recessive", "Valine replaces glutamic acid at the sixth position of beta globin; codon GAG becomes GUG"],
            noteAmber: "NEET 2026: the mutant sixth codon of the beta globin gene is GUG.",
            pyqExampleId: "837877cd-4a00-470c-8895-3bb0c78c06bf",
          },
          { cells: ["Phenylketonuria", "Autosomal recessive", "No enzyme to convert phenylalanine into tyrosine"] },
          {
            cells: ["Thalassemia", "Autosomal recessive", "Too few globin chains: α on chromosome 16 (HBA1, HBA2), β on chromosome 11 (HBB)"],
            noteAmber: "NEET 2024: α-thalassemia with chromosome 16, β-thalassemia with chromosome 11, Down's syndrome with chromosome 21 and Klinefelter's syndrome with the X chromosome.",
            pyqExampleId: "049de017-b087-4dd4-9c24-97d598d3741a",
          },
          { cells: ["Myotonic dystrophy", "Autosomal dominant", "NCERT's example of an autosomal dominant trait in a pedigree"] },
        ],
      },
      pyqExampleId: "6d9b63c7-3111-4683-92ff-a00089ecf35c",
      selfCheckExample: {
        prompt: "Thalassemia and sickle-cell anaemia both affect globin. How does the problem in thalassemia differ from the problem in sickle-cell anaemia?",
        steps: [
          "In thalassemia, too few globin chains are made.",
          "In sickle-cell anaemia, enough globin is made, but it is faulty.",
        ],
        answer: "Thalassemia is a quantitative problem (too few globin molecules); sickle-cell anaemia is a qualitative problem (an incorrectly functioning globin).",
      },
      practiceSet: [
        { prompt: "In sickle-cell haemoglobin, which amino acid replaces glutamic acid?", answer: "Valine" },
        { prompt: "Under what condition does sickle-cell haemoglobin polymerise?", answer: "Low oxygen tension" },
        { prompt: "Which genotype shows sickle-cell disease: \\(\\text{Hb}^A\\text{Hb}^A\\), \\(\\text{Hb}^A\\text{Hb}^S\\) or \\(\\text{Hb}^S\\text{Hb}^S\\)?", answer: "\\(\\text{Hb}^S\\text{Hb}^S\\)" },
        { prompt: "Name the two X-linked recessive disorders in NCERT.", answer: "Haemophilia and colour blindness" },
        { prompt: "Roughly what percentage of human males are colour blind?", answer: "About 8%" },
        { prompt: "In phenylketonuria, what is phenylalanine converted into when it builds up?", answer: "Phenylpyruvic acid (and other derivatives)" },
      ],
      traps: [
        {
          title: "Myotonic dystrophy is the dominant one",
          body: "Of NCERT's single-gene disorders, **myotonic dystrophy** is **autosomal dominant**. Sickle-cell anaemia, phenylketonuria and thalassemia are autosomal **recessive**; haemophilia and colour blindness are **X-linked recessive**.",
        },
        {
          title: "Thalassemia is quantitative, sickle-cell is qualitative",
          body: "**Thalassemia**: too **few** globin molecules. **Sickle-cell anaemia**: a **faulty** globin. Both are autosomal recessive.",
        },
        {
          title: "GAG becomes GUG, glutamic acid becomes valine",
          body: "The sickle-cell change is **GAG to GUG** at the **sixth** codon, so **glutamic acid** is replaced by **valine**. Not the other way round.",
        },
        {
          title: "Alpha on 16, beta on 11",
          body: "**α-thalassemia** genes (HBA1, HBA2) are on **chromosome 16**; the **β-thalassemia** gene (HBB) is on **chromosome 11**. Chromosome 21 belongs to Down's syndrome.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nbopi-sex-linked",
      name: "Working out an X-linked cross",
      intuition:
        "A male has one X, and it came from his mother. One recessive allele on it is enough for him to show the disorder. A female has two X chromosomes and needs the allele on both. That is why a carrier mother passes an X-linked disorder to half her sons, and why affected females are rare.",
      definition:
        "What NCERT says, and how to use it:\n" +
        "- In an X-linked recessive disorder (haemophilia, colour blindness), a **male** with the allele on his one X is **affected**. A **female** with one copy is a **carrier**: she does not show the disorder but can pass it on.\n" +
        "- A son gets his X from his **mother** and his Y from his father. A daughter gets one X from each parent.\n" +
        "- So a son of a carrier woman has a **50%** chance of being affected, and a daughter is affected only if her mother is at least a carrier **and** her father is affected. NCERT calls a haemophilic female extremely rare for this reason.\n" +
        "- Queen Victoria was a carrier of haemophilia; her family tree shows several haemophilic descendants.\n" +
        "- For an **autosomal recessive** disorder such as sickle-cell anaemia, two carrier parents have a 1 in 4 chance of an affected child.\n" +
        "- To find a chance: write each parent's genotype, list the gametes, fill the Punnett square, and count only the children that match what the question asks.",
      formula: {
        label: "Carrier mother × normal father",
        latex: "\\text{X}^c\\text{X} \\times \\text{XY} \\rightarrow \\text{X}^c\\text{X},\\ \\text{XX},\\ \\text{X}^c\\text{Y},\\ \\text{XY}\\ \\left(\\tfrac{1}{4}\\text{ each}\\right)",
        symbols: [
          { symbol: "\\(\\text{X}^c\\)", meaning: "an X chromosome carrying the recessive allele" },
          { symbol: "\\(\\text{X}^c\\text{X}\\)", meaning: "carrier female: unaffected" },
          { symbol: "\\(\\text{X}^c\\text{Y}\\)", meaning: "affected male" },
        ],
      },
      authoredExample: {
        prompt: "A woman with normal vision, whose father was colour blind, marries a man with normal vision. What fraction of their sons, and what fraction of all their children, will be colour blind?",
        steps: [
          "Her father gave her his only X, which carried the allele, so she is a carrier: \\(\\text{X}^c\\text{X}\\). The man is \\(\\text{XY}\\).",
          "Children: \\(\\text{X}^c\\text{X}\\) (carrier daughter), \\(\\text{XX}\\) (normal daughter), \\(\\text{X}^c\\text{Y}\\) (colour-blind son), \\(\\text{XY}\\) (normal son), one quarter each.",
          "Sons: 1 of the 2 son types is colour blind, so \\(\\tfrac{1}{2}\\).",
          "All children: 1 of 4, so \\(\\tfrac{1}{4}\\).",
        ],
        answer: "Half of the sons; one quarter of all the children.",
      },
      pyqExampleId: "ee11bfdd-dd71-4fdc-bdfc-d5bb61a97491",
      selfCheckExample: {
        prompt: "A haemophilic man marries a woman who neither has haemophilia nor carries it. What fraction of their daughters are carriers, and what fraction of their sons are haemophilic?",
        steps: [
          "Every daughter gets the father's only X, which carries the allele, and a normal X from her mother: all daughters are carriers.",
          "Every son gets his X from the mother, who has no faulty allele: no son is haemophilic.",
        ],
        answer: "All the daughters are carriers; none of the sons is haemophilic.",
      },
      practiceSet: [
        { prompt: "From which parent does a son inherit his X chromosome?", answer: "From his mother" },
        { prompt: "A carrier woman marries a normal man. What fraction of their daughters will have the X-linked recessive disorder?", answer: "None (half of them will be carriers)" },
        { prompt: "Why is a haemophilic female extremely rare?", answer: "Her mother must be at least a carrier and her father must be haemophilic" },
        { prompt: "Two carriers of sickle-cell anaemia (\\(\\text{Hb}^A\\text{Hb}^S\\)) have a child. What is the chance that the child has the disease?", answer: "1/4", method: "\\(\\tfrac{1}{2} \\times \\tfrac{1}{2}\\) for \\(\\text{Hb}^S\\text{Hb}^S\\)" },
        { prompt: "A colour-blind woman marries a man with normal vision. What fraction of their sons will be colour blind?", answer: "All of them", method: "every son gets an \\(\\text{X}^c\\) from his mother" },
      ],
      traps: [
        {
          title: "A son's X comes from his mother",
          body: "A son gets his **X** from his **mother** and his **Y** from his father. A father never passes an X-linked allele to his sons; he passes it to **every daughter**.",
        },
        {
          title: "A carrier is not affected",
          body: "A carrier female has one recessive allele and does **not show** the disorder. When a question asks for a child who is unaffected but a carrier, count only the \\(\\text{X}^c\\text{X}\\) daughters.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopi-chromosomal",
      name: "Chromosomal disorders",
      intuition:
        "Here the fault is not in one gene but in whole chromosomes: one too many, one too few, or whole extra sets. A missing or extra chromosome comes from chromatids that fail to separate. Whole extra sets come from a cell that fails to divide after telophase.",
      definition:
        "What NCERT says:\n" +
        "- Chromosomal disorders are caused by the **absence, excess or abnormal arrangement** of one or more chromosomes.\n" +
        "- **Aneuploidy**: failure of segregation of chromatids during cell division causes the **gain or loss of a chromosome (or chromosomes)**.\n" +
        "- **Polyploidy**: failure of **cytokinesis after telophase** causes an increase in a **whole set** of chromosomes. It is often seen in **plants**.\n" +
        "- A normal human cell has **46** chromosomes (23 pairs): 22 pairs of autosomes and one pair of sex chromosomes.\n" +
        "- An extra copy of a chromosome is **trisomy**; the lack of one chromosome of a pair is **monosomy**.\n" +
        "- **Down's syndrome**: an extra copy of chromosome **21** (trisomy 21). First described by **Langdon Down (1866)**. Short stature with a small round head, furrowed tongue and partly open mouth, a broad palm with a characteristic palm crease, and retarded physical, psychomotor and mental development.\n" +
        "- **Klinefelter's syndrome**: an extra X chromosome, karyotype **47, XXY**. Overall masculine development, but feminine development (development of breasts, **gynaecomastia**) is also expressed. Such individuals are **sterile**.\n" +
        "- **Turner's syndrome**: absence of one X chromosome, **45 with X0**. Such females are **sterile**, as the ovaries are rudimentary, and they lack other secondary sexual characters.",
      table: {
        columns: ["Disorder or event", "Chromosomes", "Key features (NCERT)"],
        rows: [
          {
            cells: ["Aneuploidy", "Gain or loss of one or more chromosomes", "Chromatids fail to separate during cell division"],
            noteAmber: "Re-NEET 2024: aneuploidy comes from addition or deletion of chromosomes, not substitution, translocation or inversion.",
            pyqExampleId: "b9a44544-1bdf-48d6-9d06-056605cbe477",
          },
          {
            cells: ["Polyploidy", "A whole extra set of chromosomes", "Cytokinesis fails after telophase; often seen in plants"],
            noteAmber: "Re-NEET 2024: both statements false; aneuploidy is not the gain or loss of a whole set, and polyploidy follows failed cytokinesis after telophase, not anaphase.",
            pyqExampleId: "94a15f24-7209-43ad-8fa5-69978d6c0636",
          },
          {
            cells: ["Down's syndrome", "Trisomy 21 (47 chromosomes)", "Described by Langdon Down (1866); short, small round head, furrowed tongue, partly open mouth, broad palm with a crease; retarded development"],
            noteAmber: "NEET 2023: a broad palm with a crease, small round head and furrowed tongue point to Down's syndrome.",
            pyqExampleId: "89530c0d-946c-4c29-8194-8a7244fd6dfa",
          },
          { cells: ["Klinefelter's syndrome", "47, XXY", "Masculine development with some feminine development (gynaecomastia); sterile"] },
          {
            cells: ["Turner's syndrome", "45, X0", "Sterile female with rudimentary ovaries; lacks other secondary sexual characters"],
            noteAmber: "Re-NEET 2026: both statements false; Down's syndrome is an extra chromosome 21, and Turner's syndrome is a missing X chromosome.",
            pyqExampleId: "32e111ee-0aee-4b70-9bdd-597eac41ea56",
          },
        ],
      },
      pyqExampleId: "1d09ab7c-2465-4c82-a14c-9155f3157336",
      selfCheckExample: {
        prompt: "One person has 47 chromosomes with three copies of chromosome 21. Another has 45 chromosomes with only one X. Name each syndrome, and say which is a trisomy and which a monosomy.",
        steps: [
          "Three copies of chromosome 21 is Down's syndrome: one extra copy, so a trisomy.",
          "One X and no second sex chromosome is Turner's syndrome: one chromosome of a pair missing, so a monosomy.",
        ],
        answer: "Down's syndrome (trisomy 21) and Turner's syndrome (monosomy of the X).",
      },
      practiceSet: [
        { prompt: "How many chromosomes does a normal human cell have, and how many pairs of them are autosomes?", answer: "46; 22 pairs" },
        { prompt: "Who first described Down's syndrome, and in which year?", answer: "Langdon Down, in 1866" },
        { prompt: "What is the lack of one chromosome of a pair called?", answer: "Monosomy" },
        { prompt: "What does failure of cytokinesis after telophase lead to?", answer: "Polyploidy (an increase in a whole set of chromosomes)" },
        { prompt: "Why are females with Turner's syndrome sterile?", answer: "Their ovaries are rudimentary" },
      ],
      traps: [
        {
          title: "Langdon Down described Down's syndrome",
          body: "**Langdon Down (1866)** described **Down's syndrome**, not Klinefelter's. Short stature, a small round head and retarded development are also Down's features, not Klinefelter's.",
        },
        {
          title: "Aneuploidy is a chromosome, polyploidy a whole set",
          body: "**Aneuploidy**: gain or loss of **one or more chromosomes**, from chromatids that fail to separate. **Polyploidy**: a **whole set** added, from cytokinesis failing **after telophase**.",
        },
        {
          title: "Klinefelter's is an extra X, Turner's a missing X",
          body: "**Klinefelter's**: **47, XXY**, a sterile male with some feminine development. **Turner's**: **45, X0**, a sterile female. **Down's**: an extra **chromosome 21**, not a sex chromosome.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_PI_LINKAGE_NOTE: SubtopicNote = {
  subtopicName: "Linkage and Sex Determination",
  title: "Linkage and Sex Determination",
  oneLineDefinition:
    "How genes came to be placed on chromosomes: the chromosomal theory of inheritance, Morgan's linkage and recombination in Drosophila, Sturtevant's gene maps, and the XO, XY, ZW and honeybee systems of sex determination.",
  whyItMatters:
    "Six NEET questions, three of them in NEET 2022. The grasshopper's XO system came in 2022 and again in 2026, the second time as a chromosome count. The one gene-mapping sum, putting four genes in order from their recombination frequencies, was a HARD question in NEET 2022.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbopi-linkage",
      name: "The chromosomal theory, linkage and recombination",
      intuition:
        "Mendel never saw a gene. Once chromosomes were seen pairing and separating in meiosis, Sutton and Boveri noticed that they behave just like Mendel's factors. Morgan then found that genes on the same chromosome tend to travel together, so they do not assort independently. The closer two genes sit, the less often they are separated.",
      definition:
        "What NCERT says:\n" +
        "- Mendel published his work in **1865**, but it stayed unrecognised until **1900**, when **de Vries, Correns and von Tschermak** independently rediscovered it.\n" +
        "- **Walter Sutton** and **Theodore Boveri** noted that chromosomes and genes behave in parallel. Sutton united chromosomal segregation with Mendel's principles and called it the **chromosomal theory of inheritance**.\n" +
        "- **Thomas Hunt Morgan** and his colleagues verified it experimentally in the fruit fly *Drosophila melanogaster*. The fly grows on a simple synthetic medium, completes its life cycle in about **two weeks**, gives many progeny from one mating, has clearly different sexes (the male is smaller) and shows many hereditary variations.\n" +
        "- Morgan's dihybrid crosses with genes on the X chromosome gave F2 ratios far from 9 : 3 : 3 : 1: the two genes did not segregate independently.\n" +
        "- **Linkage**: the physical association of genes on a chromosome. **Recombination**: the generation of non-parental gene combinations.\n" +
        "- **Tightly linked** genes show **low** recombination; **loosely linked** genes show **high** recombination. In *Drosophila*, yellow body and white eye recombined **1.3%** of the time; white eye and miniature wing, **37.2%**.\n" +
        "- So independent assortment holds for genes on different chromosomes, but not for genes that lie close together on the same chromosome.",
      table: {
        columns: ["Scientist", "Contribution (NCERT)"],
        rows: [
          { cells: ["Gregor Mendel", "Laws of inheritance from pea hybridisation (1856 to 1863), published in 1865"] },
          { cells: ["de Vries, Correns and von Tschermak", "Rediscovered Mendel's work independently in 1900"] },
          { cells: ["Walter Sutton and Theodore Boveri", "Chromosomal theory of inheritance"] },
          { cells: ["Thomas Hunt Morgan", "Verified the chromosomal theory in *Drosophila*; worked out linkage and recombination"] },
          {
            cells: ["Alfred Sturtevant", "First used the frequency of recombination between gene pairs as a measure of distance, to map genes on a chromosome"],
            noteAmber: "NEET 2023: Sturtevant, not Morgan or Sutton and Boveri, first used recombination frequency to map gene positions.",
            pyqExampleId: "c05aea2b-d125-4993-8ba6-49d8757d59ad",
          },
          { cells: ["Henking", "Saw a nuclear structure in insect sperm in 1891 and named it the X body, later the X chromosome"] },
        ],
      },
      pyqExampleId: "82a6bb0b-f140-45ad-8fc6-4b782a772599",
      selfCheckExample: {
        prompt: "Genes P and Q show 2% recombination, and genes Q and R show 30%. Which pair is more tightly linked, and which pair is separated more often?",
        steps: [
          "Tightly linked genes show low recombination; loosely linked genes show high recombination.",
          "2% is low, so P and Q are tightly linked. 30% is high, so Q and R are separated more often.",
        ],
        answer: "P and Q are more tightly linked; Q and R are separated more often.",
      },
      practiceSet: [
        { prompt: "Which three scientists independently rediscovered Mendel's work in 1900?", answer: "de Vries, Correns and von Tschermak" },
        { prompt: "Which organism did Morgan use to verify the chromosomal theory of inheritance?", answer: "The fruit fly, *Drosophila melanogaster*" },
        { prompt: "What is the physical association of genes on a chromosome called?", answer: "Linkage" },
        { prompt: "What is the generation of non-parental gene combinations called?", answer: "Recombination" },
        { prompt: "Give two reasons why *Drosophila* suits genetic studies.", answer: "Any two: it grows on a simple synthetic medium; its life cycle takes about two weeks; one mating gives many progeny; the sexes are clearly different; it shows many hereditary variations" },
      ],
      traps: [
        {
          title: "Sutton and Boveri proposed, Morgan proved",
          body: "**Sutton and Boveri** proposed the chromosomal theory of inheritance. **Morgan** verified it in *Drosophila* and worked out linkage. **Sturtevant** made the first gene map.",
        },
        {
          title: "Close genes do not assort independently",
          body: "Mendel's law of independent assortment holds for genes on **different chromosomes**. Genes lying **close together** on one chromosome are **linked** and are inherited together more often than chance.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nbopi-gene-mapping",
      name: "Recombination frequency and gene mapping",
      intuition:
        "Crossing over is more likely to split two genes the farther apart they lie. So the percentage of recombinant offspring works as a ruler: the bigger the percentage, the longer the distance. Distances along a line add up, so the order of the genes can be read from which distances add.",
      definition:
        "How it works:\n" +
        "- **Recombination frequency** is the share of offspring, as a percentage, that show a non-parental combination of the two genes.\n" +
        "- **Sturtevant** used it as a measure of the distance between genes on the same chromosome and mapped their positions.\n" +
        "- Distances along the chromosome **add up**: if gene B lies between A and C, then the A to C distance equals A to B plus B to C.\n" +
        "- To order several genes, start with the closest pair and place each other gene so that every distance adds up.",
      formula: {
        label: "Recombination frequency",
        latex: "\\text{RF}\\,(\\%) = \\dfrac{\\text{recombinant offspring}}{\\text{total offspring}} \\times 100",
        symbols: [
          { symbol: "Recombinant offspring", meaning: "offspring with a non-parental combination of the two genes" },
          { symbol: "Total offspring", meaning: "all the offspring counted" },
        ],
      },
      authoredExample: {
        prompt: "Genes P, Q and R lie on one chromosome. Recombination frequencies: P and Q 8%, Q and R 12%, P and R 20%. In what order do the genes lie?",
        steps: [
          "The largest distance, P to R (20%), marks the two outer genes.",
          "Check the middle: P to Q plus Q to R is \\(8 + 12 = 20\\), which equals P to R.",
          "So Q lies between P and R.",
        ],
        answer: "P, Q, R (Q in the middle).",
      },
      pyqExampleId: "02a142d0-3122-43d7-b97f-4be63befdb4e",
      selfCheckExample: {
        prompt: "A test cross gives 400 offspring: 340 show the parental combinations of two genes and 60 are recombinants. What is the recombination frequency between the two genes?",
        steps: [
          "\\(\\text{RF} = \\dfrac{60}{400} \\times 100\\).",
          "\\(= 15\\%\\).",
        ],
        answer: "15%.",
      },
      practiceSet: [
        { prompt: "Out of 1000 test-cross offspring, 70 are recombinants. What is the recombination frequency between the two genes?", answer: "7%", method: "\\(\\tfrac{70}{1000} \\times 100\\)" },
        { prompt: "Genes X and Y show 5% recombination, Y and Z show 10%, and X and Z show 15%. Which gene lies in the middle?", answer: "Y", method: "\\(5 + 10 = 15\\)" },
        { prompt: "Which pair of *Drosophila* genes lies farther apart: yellow body and white eye (1.3%), or white eye and miniature wing (37.2%)?", answer: "White eye and miniature wing" },
        { prompt: "What does a low recombination frequency between two genes tell you about them?", answer: "They lie close together on the chromosome (tightly linked)" },
      ],
      traps: [
        {
          title: "Order the genes by adding distances",
          body: "Gene order comes from distances that **add up** along the chromosome, not from the order in which the genes are named or from sorting the percentages.",
        },
        {
          title: "Higher recombination means farther apart",
          body: "A **high** recombination frequency means the genes are **far apart** (loosely linked); a **low** one means they are **close** (tightly linked).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopi-sex-determination",
      name: "Sex determination",
      intuition:
        "In many animals one sex makes two kinds of gamete, and that sex decides the sex of the offspring. In grasshoppers and humans it is the male; in birds it is the female. Honeybees use a different rule altogether: the number of chromosome sets.",
      definition:
        "What NCERT says:\n" +
        "- **Henking (1891)** studied sperm formation in an insect and saw a nuclear structure that only half the sperm received. He called it the **X body**; it was later named the **X chromosome**. Chromosomes involved in sex determination are **sex chromosomes**; the rest are **autosomes**.\n" +
        "- **XO type** (grasshopper): all eggs carry one X besides the autosomes. Some sperm carry an X and some do not. Females are **XX**; males are **XO** and have **one chromosome fewer** than females.\n" +
        "- **XY type** (many insects including *Drosophila*, and mammals including humans): females XX, males XY. The male makes two kinds of gamete: **male heterogamety**.\n" +
        "- **ZW type** (birds): females are **ZW** and make two kinds of gamete (**female heterogamety**); males are **ZZ**.\n" +
        "- **Humans**: 22 pairs of autosomes plus XX or XY. Each child has a 50% chance of being male or female, and the **sperm** decides which.\n" +
        "- **Honeybee**: sex depends on the **number of sets** of chromosomes. A fertilised egg becomes a **female** (queen or worker); an **unfertilised egg** becomes a **male** (drone) by **parthenogenesis**. Females are diploid (**32**); males are haploid (**16**). This is a **haplodiploid** system. Males make sperm by **mitosis**. A male has no father and so cannot have sons, but has a grandfather and can have grandsons.",
      table: {
        columns: ["System", "Female", "Male", "Example"],
        rows: [
          {
            cells: ["XO type", "XX", "XO", "Grasshopper"],
            noteAmber: "NEET 2022: XO sex determination is found in grasshoppers, not in Drosophila, birds or monkeys.",
            pyqExampleId: "2338851a-ad86-4909-a694-dbf96aeb5471",
          },
          {
            cells: ["XO type, by chromosome count", "One chromosome more than the male", "One chromosome fewer than the female", "A grasshopper species with 24 (female) and 23 (male)"],
            noteAmber: "NEET 2026: in a grasshopper species, members with 23 chromosomes are males and those with 24 are females.",
            pyqExampleId: "a99d1149-1a54-407f-b7db-db7dd233630b",
          },
          { cells: ["XY type", "XX", "XY", "Humans, *Drosophila*"] },
          { cells: ["ZW type", "ZW", "ZZ", "Birds"] },
          { cells: ["Haplodiploid", "Diploid, 32 chromosomes", "Haploid, 16 chromosomes", "Honeybee"] },
        ],
      },
      pyqExampleId: "a66e3c81-995b-46f0-be77-502522fa2c6f",
      selfCheckExample: {
        prompt: "In birds, which parent decides the sex of the chick, and why?",
        steps: [
          "Birds have ZW sex determination: the female is ZW and the male is ZZ.",
          "The male makes only Z sperm. The female makes Z eggs and W eggs.",
          "So the kind of egg decides the sex of the chick.",
        ],
        answer: "The female, because she is ZW and makes two kinds of egg.",
      },
      practiceSet: [
        { prompt: "Who first saw the X body, and in which year?", answer: "Henking, in 1891" },
        { prompt: "What are the sex chromosomes of a male *Drosophila*?", answer: "XY" },
        { prompt: "In humans, which parent's gamete decides the sex of the child?", answer: "The father's (the sperm)" },
        { prompt: "How many pairs of autosomes does a human cell have?", answer: "22" },
        { prompt: "A honeybee drone has no father. Can it have sons, and can it have grandsons?", answer: "It cannot have sons, but it can have grandsons" },
      ],
      traps: [
        {
          title: "Drosophila is XY, not XO",
          body: "The **grasshopper** is NCERT's XO example. *Drosophila* is **XY**, like humans.",
        },
        {
          title: "Birds show female heterogamety",
          body: "In **birds** the **female is ZW** and makes two kinds of egg; the male is ZZ. In grasshoppers and humans it is the **male** that makes two kinds of gamete.",
        },
        {
          title: "The XO male has the smaller count",
          body: "In grasshoppers the **male** (XO) has **one chromosome fewer** than the female (XX). The odd number belongs to the male.",
        },
        {
          title: "Drones make sperm by mitosis",
          body: "A drone is already **haploid**, so it makes sperm by **mitosis**, not by meiosis.",
        },
      ],
    },
  ],
};

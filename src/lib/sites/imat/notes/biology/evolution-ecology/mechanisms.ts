import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_EVO_MECHANISMS_NOTE: SubtopicNote = {
  subtopicName: "Mechanisms of Evolution",
  title: "Natural Selection, Drift and Hardy-Weinberg",
  oneLineDefinition:
    "Evolution is a change in allele frequencies in a population over generations, driven by natural selection, genetic drift, gene flow and mutation.",
  whyItMatters:
    "Most of the chapter's questions sit here. The papers asked which organisms natural selection acts on, why antibiotics lose their power, what can make a phenotype commoner, which processes are random, what directional selection can look like, and (in 2023) which mutations can take part in evolution.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-evo-natural-selection",
      name: "Darwin's natural selection, and why Lamarck's idea fails",
      intuition:
        "Individuals differ, and many of the differences are inherited. More young are born than can survive, so the ones whose traits suit the environment leave more offspring. Over generations those traits become common. Nothing in the animal changes on purpose: the population changes because some variants out-breed others.",
      definition:
        "**Natural selection** (Darwin and Wallace, 1858; Darwin's book On the Origin of Species, 1859): heritable variants that raise survival and reproduction become more common in a population.\n" +
        "- **Fitness** means reproductive success, not strength.\n" +
        "- Selection acts on **phenotypes** of individuals, but it is **populations** that evolve.\n" +
        "- It acts on every population with heritable variation: sexual or asexual, in a changing or a stable environment.\n" +
        "- **Lamarck** proposed that organs grow with use and shrink with disuse, and that these **acquired characteristics** are inherited. This fails: changes to body cells during a lifetime do not alter the DNA of the gametes, so they are not passed on.\n" +
        "- The **modern synthesis** (1930s to 1940s) joined Darwin's theory with Mendelian genetics: evolution is a change in **allele frequencies** in a population's **gene pool**.",
      table: {
        columns: ["Step", "What happens", "Bacteria and an antibiotic"],
        rows: [
          { cells: ["Variation", "Individuals differ; much of it is genetic", "A few cells already carry a resistance allele (from a random mutation)"] },
          { cells: ["Overproduction", "More offspring are made than can survive", "Bacteria multiply very fast"] },
          { cells: ["Selection", "Some variants survive and reproduce better", "The antibiotic kills sensitive cells; resistant cells survive"] },
          { cells: ["Inheritance", "Survivors pass their alleles on", "Resistant cells divide and their offspring are resistant"] },
          { cells: ["Change over generations", "Favoured alleles become more frequent", "The infection becomes resistant; overuse and unfinished courses speed this up"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A crop pest is sprayed with the same insecticide every year, and after ten years most of the pests survive the spray. Which explanation is correct?",
        options: [
          "Each insect built up resistance during its life and passed it to its young",
          "Some insects already carried resistance alleles, survived and bred more, so those alleles became common",
          "The insecticide caused the mutations the insects needed to survive it",
          "The insects became immune to the insecticide, as people do after a vaccine",
          "Farmers chose which insects should breed, so this is artificial selection",
        ],
        steps: [
          "Resistance alleles were present by chance before spraying; the spray only killed the others.",
          "A is Lamarck's inheritance of acquired characteristics. C is wrong because mutations are random, not caused to order by need.",
          "D confuses immunity, which is not inherited and does not apply to poisons, with resistance. E is wrong: no one chose the parents; the spray did the selecting.",
        ],
        answer: "(B) Some insects already carried resistance alleles, survived and bred more, so those alleles became common",
      },
      practiceSet: [
        { prompt: "Who proposed natural selection at the same time as Darwin?", answer: "Alfred Russel Wallace" },
        { prompt: "What does fitness mean in evolution?", answer: "Reproductive success: how many offspring an individual leaves" },
        { prompt: "Does an individual organism evolve?", answer: "No; populations evolve over generations" },
        { prompt: "What was Lamarck's mechanism called?", answer: "The inheritance of acquired characteristics" },
      ],
      traps: [
        {
          title: "Bacteria become resistant, not the patient",
          body: "Antibiotic resistance is a property of the bacteria, selected when the drug kills their sensitive neighbours. People do not become resistant or immune to an antibiotic. Overuse and not finishing a course both help resistant bacteria take over.",
        },
        {
          title: "Selection works in stable environments and on asexual organisms",
          body: "In a stable environment, selection keeps removing the extremes (stabilising selection). Asexual organisms such as bacteria vary through mutation, so they are selected too. Any population with heritable variation is subject to natural selection.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-evo-variation-drift",
      name: "Sources of variation and the forces that change allele frequencies",
      intuition:
        "Mutation writes new alleles. Meiosis and fertilisation shuffle them into new combinations. Then several forces change how common each allele is: selection does it by fitness, drift by pure luck, gene flow by migration, and humans by choosing which animals and plants breed.",
      definition:
        "Variation comes from:\n" +
        "- **Mutation**: the only source of **new** alleles. It is random with respect to what the organism needs. In animals only mutations in the **germ line** (cells that make gametes) are inherited; a mutation in a body cell dies with the individual. Whether the allele is dominant or recessive does not decide this.\n" +
        "- **Recombination** in sexual reproduction: crossing over, independent assortment and random fertilisation.\n" +
        "Allele frequencies are then changed by:\n" +
        "- **Genetic drift**: random change by chance, strongest in **small** populations. A **bottleneck** (a population crashes, as in cheetahs) and the **founder effect** (a few individuals start a new population, often on an island) are extreme cases.\n" +
        "- **Gene flow**: alleles move between populations through migration, making them more alike.\n" +
        "- **Artificial selection**: humans choose which individuals breed (dog breeds, crops, dairy cattle). Darwin used it as a model for natural selection.",
      table: {
        columns: ["Force", "Random?", "Main effect"],
        rows: [
          { cells: ["Mutation", "Yes: not directed by need", "Adds new alleles"] },
          { cells: ["Genetic drift", "Yes: chance decides who breeds", "Can fix or lose alleles, even useful ones, in small populations"] },
          { cells: ["Gene flow", "Not driven by fitness; depends on who migrates", "Brings in alleles; makes populations more similar"] },
          { cells: ["Natural selection", "No: better-suited variants reproduce more", "Adapts the population to its environment"] },
          { cells: ["Artificial selection", "No: humans pick the parents", "Exaggerates traits humans want"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "In a population of 20 beetles, a storm kills half of them at random, and an allele that was common becomes rare. What is this an example of?",
        options: ["Natural selection", "Artificial selection", "Gene flow", "Directional selection", "Genetic drift"],
        steps: [
          "The deaths were random, not linked to any trait, so the change in allele frequency was by chance.",
          "A chance change in allele frequency, especially in a small population, is genetic drift (here a bottleneck).",
          "Natural and directional selection need a trait that affects survival; artificial selection needs a human choosing; gene flow needs migration.",
        ],
        answer: "(E) Genetic drift",
      },
      practiceSet: [
        { prompt: "Is drift stronger in small or in large populations?", answer: "Small" },
        { prompt: "A mutation arises in a skin cell of a man. Can his children inherit it?", answer: "No; only germ-line mutations are inherited" },
        { prompt: "Which force makes two neighbouring populations more alike?", answer: "Gene flow" },
        { prompt: "A few birds blown to an island start a new population. What is the effect on allele frequencies called?", answer: "The founder effect" },
      ],
      traps: [
        {
          title: "Artificial selection is not a random process",
          body: "Mutation and genetic drift are random. Artificial selection is the opposite: a breeder deliberately chooses which individuals reproduce. Natural selection is not random either, although the variation it acts on arises at random.",
        },
        {
          title: "Only germ-line mutations matter to evolution",
          body: "For a mutation to change the next generation it must be in a cell that makes gametes. A mutation in a body cell, dominant or recessive, however it was caused, is not passed on in animals.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-evo-selection-types",
      name: "Directional, stabilising and disruptive selection",
      intuition:
        "Picture a bell-shaped curve of a trait, such as body size. Selection can push the whole curve one way, squeeze it towards the middle, or split it into two peaks. Which one happens depends on which part of the curve survives and breeds best.",
      definition:
        "Three patterns of selection on a continuous trait:\n" +
        "- **Directional**: one extreme is favoured, so the mean shifts. The favoured phenotype may start rare, and its allele may be recessive or dominant. Any agent can cause it: a predator, a drug, a change of climate.\n" +
        "- **Stabilising**: the middle is favoured, so variation shrinks. Typical of a stable environment.\n" +
        "- **Disruptive**: both extremes beat the middle, which can split a population and lead to new species.\n" +
        "- **Sexual selection**: traits that win mates spread, even at a cost to survival.",
      table: {
        columns: ["Type", "Favoured", "Effect on the curve", "Example"],
        rows: [
          { cells: ["Directional", "One extreme", "Mean shifts that way", "Dark peppered moths on sooty trees in industrial England"] },
          { cells: ["Stabilising", "The middle", "Narrower, same mean", "Human birth weight: very light and very heavy babies fared worst"] },
          { cells: ["Disruptive", "Both extremes", "Splits into two peaks", "Finches with large or small beaks where only large or small seeds exist"] },
          { cells: ["Sexual", "Traits that attract mates", "Showy traits spread", "The peacock's tail"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "In a lizard population, those of medium leg length survive best: short-legged ones are caught by predators and long-legged ones lose heat too fast. Which type of selection is this?",
        options: ["Stabilising", "Directional", "Disruptive", "Sexual", "Genetic drift"],
        steps: [
          "Both extremes do worse and the middle does best, which is stabilising selection.",
          "Directional would favour one extreme; disruptive would favour both extremes over the middle.",
          "Sexual selection concerns mating success; drift is chance, not a trait affecting survival.",
        ],
        answer: "(A) Stabilising",
      },
      practiceSet: [
        { prompt: "Which type of selection can lead to a population splitting into two species?", answer: "Disruptive" },
        { prompt: "What does stabilising selection do to variation?", answer: "Reduces it" },
        { prompt: "Bacteria exposed to rising antibiotic doses become more resistant over time. Which type of selection?", answer: "Directional" },
      ],
      traps: [
        {
          title: "Directional selection can favour a rare or a recessive phenotype",
          body: "At the start, the favoured phenotype is often rare (dark moths were once uncommon). The allele behind it may be recessive, and its frequency still rises. Directional selection is defined by which end of the range is favoured, not by how common or how dominant it is.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-evo-hardy-weinberg",
      name: "The Hardy-Weinberg principle for allele and genotype frequencies",
      intuition:
        "If nothing is changing a population, its allele frequencies stay the same generation after generation, and the genotype frequencies follow from them by simple probability. You can only see the recessive homozygotes, so start from them and work back to the alleles.",
      definition:
        "For a gene with two alleles, dominant frequency \\(p\\) and recessive frequency \\(q\\):\n" +
        "- \\(p + q = 1\\), and the genotype frequencies are \\(p^2\\) (AA), \\(2pq\\) (Aa) and \\(q^2\\) (aa).\n" +
        "- The frequencies stay constant only if: the population is **large**, mating is **random**, there is **no mutation**, **no migration** and **no selection**.\n" +
        "- So a population in Hardy-Weinberg equilibrium is one that is **not evolving**. A mismatch with the predicted frequencies is evidence that something is acting on it.",
      formula: {
        label: "Hardy-Weinberg equations",
        latex: "p + q = 1 \\qquad p^2 + 2pq + q^2 = 1",
        symbols: [
          { symbol: "\\(p\\)", meaning: "frequency of the dominant allele" },
          { symbol: "\\(q\\)", meaning: "frequency of the recessive allele" },
          { symbol: "\\(q^2\\)", meaning: "frequency of homozygous recessive individuals (the visible recessive phenotype)" },
          { symbol: "\\(2pq\\)", meaning: "frequency of heterozygotes (carriers)" },
        ],
      },
      authoredExample: {
        prompt:
          "Albinism is recessive. In one population, 1 person in 10,000 is albino. Find the frequency of the albino allele and the share of people who are carriers.",
        steps: [
          "Albinos are aa: \\(q^2 = 1/10\\,000 = 0.0001\\), so \\(q = 0.01\\).",
          "\\(p = 1 - q = 0.99\\).",
          "Carriers: \\(2pq = 2 \\times 0.99 \\times 0.01 = 0.0198\\), about 2%, or 1 person in 50.",
        ],
        answer: "\\(q = 0.01\\); about 2% are carriers",
      },
      selfCheckExample: {
        prompt:
          "In a population in Hardy-Weinberg equilibrium, 16% of individuals show a recessive phenotype. What percentage are heterozygous?",
        options: ["16%", "40%", "48%", "36%", "24%"],
        steps: [
          "\\(q^2 = 0.16\\), so \\(q = 0.4\\) and \\(p = 0.6\\).",
          "Heterozygotes: \\(2pq = 2 \\times 0.6 \\times 0.4 = 0.48\\), so 48%.",
          "B is \\(q\\), D is \\(p^2\\), E forgets the 2 in \\(2pq\\), and A repeats \\(q^2\\).",
        ],
        answer: "(C) 48%",
      },
      practiceSet: [
        { prompt: "The recessive allele has frequency 0.3. What fraction of the population is homozygous dominant?", answer: "0.49", method: "\\(p = 0.7\\), \\(p^2 = 0.49\\)" },
        { prompt: "The dominant allele has frequency 0.8. What fraction are heterozygous?", answer: "0.32", method: "\\(2 \\times 0.8 \\times 0.2\\)" },
        { prompt: "9% of a population show a recessive trait. What is the frequency of the recessive allele?", answer: "0.3", method: "\\(\\sqrt{0.09}\\)" },
        { prompt: "Name three conditions for Hardy-Weinberg equilibrium.", answer: "Any three of: large population, random mating, no mutation, no migration, no selection" },
      ],
      traps: [
        {
          title: "The recessive phenotype gives q squared, not q",
          body: "Individuals showing a recessive trait are aa, so their share is \\(q^2\\). Take the square root to get \\(q\\). Using the phenotype percentage directly as the allele frequency is the commonest mistake, and IMAT includes that number among the options.",
        },
      ],
    },
  ],
};

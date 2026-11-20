import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_EV_HARDY_NOTE: SubtopicNote = {
  subtopicName: "Hardy-Weinberg Principle",
  title: "Hardy-Weinberg Principle",
  oneLineDefinition:
    "The Hardy-Weinberg equation, the five factors that disturb genetic equilibrium, de Vries and mutation, and the three outcomes of natural selection.",
  whyItMatters:
    "Six NEET questions from 2021 to 2026. One is a calculation (Re-NEET 2026: the frequency of AA from the frequency of allele A); one asks what causes the founder effect, one asks which factor does not disturb the equilibrium, one matches the terms gene pool, drift, gene flow and gene frequency, and two ask the outcomes of natural selection.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nzoev-hw-equation",
      name: "The Hardy-Weinberg equation",
      visualizationSlug: "imat-hardy-weinberg",
      intuition:
        "Think of every copy of a gene in a population as a bead in a jar: some beads are A, the rest are a. If p is the share of A beads and q the share of a beads, then p plus q fills the whole jar. Draw two beads at random to make a diploid individual and the chance of each pair follows from squaring p plus q.",
      definition:
        "The principle, in NCERT:\n" +
        "- In a population, the **frequency of the alleles** of a gene is **stable** and **constant from generation to generation**. The **gene pool** (the total genes and their alleles in a population) stays constant. This is called **genetic equilibrium**.\n" +
        "- The sum of all allelic frequencies is **1**. In a diploid, if \\(p\\) is the frequency of allele A and \\(q\\) the frequency of allele a, then \\(p + q = 1\\).\n" +
        "- The frequency of **AA** individuals is \\(p^2\\), of **aa** is \\(q^2\\), and of **Aa** is \\(2pq\\). So \\(p^2 + 2pq + q^2 = 1\\), the binomial expansion of \\((p + q)^2\\).\n" +
        "- When the measured frequency **differs** from the expected value, the difference (and its direction) shows the **extent of evolutionary change**. A disturbance of Hardy-Weinberg equilibrium is read as **evolution**.",
      formula: {
        label: "Hardy-Weinberg equation",
        latex: "p^2 + 2pq + q^2 = 1",
        symbols: [
          { symbol: "\\(p\\)", meaning: "frequency of allele A" },
          { symbol: "\\(q\\)", meaning: "frequency of allele a, so that p + q = 1" },
          { symbol: "\\(p^2\\)", meaning: "frequency of AA individuals" },
          { symbol: "\\(2pq\\)", meaning: "frequency of Aa individuals" },
          { symbol: "\\(q^2\\)", meaning: "frequency of aa individuals" },
        ],
      },
      authoredExample: {
        prompt: "In a population at Hardy-Weinberg equilibrium, 16% of individuals show the recessive trait (aa). Find the frequencies of allele a, allele A, and of AA and Aa individuals.",
        steps: [
          "aa individuals: \\(q^2 = 0.16\\), so \\(q = \\sqrt{0.16} = 0.4\\).",
          "\\(p = 1 - q = 1 - 0.4 = 0.6\\).",
          "AA: \\(p^2 = 0.6^2 = 0.36\\). Aa: \\(2pq = 2 \\times 0.6 \\times 0.4 = 0.48\\).",
          "Check: \\(0.36 + 0.48 + 0.16 = 1\\).",
        ],
        answer: "q = 0.4, p = 0.6; AA = 0.36, Aa = 0.48.",
      },
      pyqExampleId: "ccbc7668-0243-4337-a5a7-fc6472df0e83",
      selfCheckExample: {
        prompt: "In a population at Hardy-Weinberg equilibrium the frequency of allele A is 0.7. What is the frequency of heterozygous Aa individuals?",
        steps: [
          "\\(q = 1 - 0.7 = 0.3\\).",
          "Aa \\(= 2pq = 2 \\times 0.7 \\times 0.3 = 0.42\\).",
        ],
        answer: "0.42",
      },
      practiceSet: [
        { prompt: "In a population at Hardy-Weinberg equilibrium, the frequency of allele a is 0.2. What is the frequency of aa individuals?", answer: "0.04", method: "\\(q^2 = 0.2^2\\)" },
        { prompt: "In a population at Hardy-Weinberg equilibrium with p = 0.5, what is the frequency of Aa individuals?", answer: "0.5", method: "\\(2pq = 2 \\times 0.5 \\times 0.5\\)" },
        { prompt: "In a population at Hardy-Weinberg equilibrium, 9% of individuals are aa. What is the frequency of allele A?", answer: "0.7", method: "\\(q = \\sqrt{0.09} = 0.3\\), so \\(p = 0.7\\)" },
        { prompt: "The Hardy-Weinberg equation is the binomial expansion of which expression?", answer: "\\((p + q)^2\\)" },
        { prompt: "What name does NCERT give to the state in which the gene pool stays constant?", answer: "Genetic equilibrium" },
      ],
      traps: [
        {
          title: "Heterozygotes are 2pq",
          body: "The frequency of **Aa** is \\(2pq\\), not \\(pq\\): an Aa individual can get A from either parent.",
        },
        {
          title: "q is the square root of the aa frequency",
          body: "If 16% are aa, then \\(q^2 = 0.16\\) and \\(q = 0.4\\). Taking q as 0.16 is the commonest slip.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoev-hw-factors",
      name: "Factors that disturb the equilibrium",
      intuition:
        "The jar of beads stays the same only if nothing adds beads, removes them or swaps them. Animals moving in or out, a small group drifting off by chance, a gene changing, genes reshuffling when gametes form, and nature favouring some beads over others: each of these changes the mix, and a changed mix is evolution.",
      definition:
        "Five factors affect Hardy-Weinberg equilibrium:\n" +
        "- **Gene migration or gene flow:** when a section of a population moves to another place and population, gene frequencies change in **both** the old and the new population. If this migration happens **multiple times**, it is **gene flow**.\n" +
        "- **Genetic drift:** the same change in gene frequency happening **by chance**. Sometimes the new sample is so different that it becomes a different species. The **original drifted population** becomes the **founders**, and this is the **founder effect**.\n" +
        "- **Mutation:** pre-existing advantageous mutations, when selected, give new phenotypes; over a few generations this results in speciation.\n" +
        "- **Genetic recombination**, during gametogenesis.\n" +
        "- **Natural selection.**\n\n" +
        "Mutation as the cause of evolution: **Hugo de Vries**, working on the **evening primrose**, proposed that **mutation** (a large difference arising suddenly in a population) causes evolution, not the minor variations Darwin spoke of.\n" +
        "- **Mutations are random and directionless**; Darwinian variations are **small and directional**.\n" +
        "- For Darwin, evolution was **gradual**; de Vries believed mutation caused speciation in one step and called it **saltation** (a single-step large mutation).",
      table: {
        columns: ["Term", "NCERT meaning"],
        rows: [
          { cells: ["Gene pool", "The total genes and their alleles in a population"] },
          { cells: ["Gene migration", "A section of a population moves to another place; frequencies change in both populations"] },
          {
            cells: ["Gene flow", "Gene migration happening multiple times"],
            noteAmber: "Re-NEET 2024 matched gene pool to the total genes and alleles, genetic drift to change by chance, gene flow to transfer of genes into or out of a population, and gene frequency to stable within a generation.",
            pyqExampleId: "c74b0085-ee0a-49cb-a61a-bdb9d6abe2ac",
          },
          { cells: ["Genetic drift", "A change in gene frequency by chance"] },
          {
            cells: ["Founder effect", "The original drifted population becomes the founders of a new population"],
            noteAmber: "NEET 2021: the factor that leads to the founder effect is genetic drift.",
            pyqExampleId: "2f798cac-ff98-4291-aa00-4babc3ff1380",
          },
          { cells: ["Saltation", "Hugo de Vries: a single-step large mutation causing speciation"] },
        ],
      },
      pyqExampleId: "b2caa6f9-f322-4ab9-b78b-9685086e33d6",
      selfCheckExample: {
        prompt: "A few birds of a mainland population are blown to an island, and by chance their allele frequencies differ from the mainland. What is this change called, and what are the birds that start the island population called?",
        steps: [
          "A change in gene frequency by chance is genetic drift.",
          "NCERT calls the original drifted population the founders, and the effect the founder effect.",
        ],
        answer: "Genetic drift; the founders (founder effect).",
      },
      practiceSet: [
        { prompt: "Name the five factors that affect Hardy-Weinberg equilibrium.", answer: "Gene migration or gene flow, genetic drift, mutation, genetic recombination and natural selection" },
        { prompt: "On which plant did Hugo de Vries base his idea of mutation?", answer: "The evening primrose" },
        { prompt: "What did de Vries call a single-step large mutation causing speciation?", answer: "Saltation" },
        { prompt: "Which are random and directionless: mutations or Darwinian variations?", answer: "Mutations" },
        { prompt: "During which process does genetic recombination change gene frequencies?", answer: "Gametogenesis" },
      ],
      traps: [
        {
          title: "A constant gene pool does not disturb the equilibrium",
          body: "A **constant gene pool** is the equilibrium itself. The disturbing factors are **gene flow, genetic drift, mutation, recombination and natural selection**.",
        },
        {
          title: "The founder effect comes from genetic drift",
          body: "The **founder effect** is a result of **genetic drift**, a change by **chance**. It is not caused by natural selection, mutation or recombination.",
        },
        {
          title: "Darwinian variations are directional",
          body: "**Darwinian variations** are **small and directional**; **mutations** (de Vries) are **random and directionless**. Swapping the two is a common false statement.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoev-selection-types",
      name: "Stabilisation, directional change and disruption",
      intuition:
        "Plot how many individuals have each value of a trait, say body size, and you get a hump with most near the average. Nature can favour the average and make the hump taller and narrower, favour one end and slide the hump sideways, or favour both ends and split it into two humps.",
      definition:
        "**Natural selection** is a process in which heritable variations that enable better survival are enabled to reproduce and leave a greater number of progeny. Variation from mutation, from recombination during gametogenesis, or from gene flow or genetic drift changes the frequency of genes and alleles in the next generation.\n\n" +
        "Natural selection can lead to three outcomes:\n" +
        "- **Stabilisation:** **more individuals acquire the mean** character value.\n" +
        "- **Directional change:** **more individuals acquire a value other than the mean** character value.\n" +
        "- **Disruption:** **more individuals acquire peripheral character values at both ends** of the distribution curve.",
      table: {
        columns: ["Outcome", "Which individuals increase", "Shape of the curve"],
        rows: [
          { cells: ["Stabilisation", "Those with the mean character value", "The peak stays at the mean and grows taller"] },
          { cells: ["Directional change", "Those with a value other than the mean", "The peak shifts to one side"] },
          {
            cells: ["Disruption", "Those with peripheral values at both ends", "Two peaks, one at each end"],
            noteAmber: "Re-NEET 2026: natural selection can lead to stabilisation, directional change and disruption; genetic drift is not one of its outcomes.",
            pyqExampleId: "666fd06d-dcd1-4793-b039-b1eacbbfc505",
          },
        ],
      },
      pyqExampleId: "ae798cff-e22f-4590-8ada-bb4f73efcc83",
      selfCheckExample: {
        prompt: "In a bird population, both very small and very large beaks become commoner while medium beaks become rare. Which outcome of natural selection is this?",
        steps: [
          "More individuals now have values at both ends of the curve.",
          "That is disruption.",
        ],
        answer: "Disruption.",
      },
      practiceSet: [
        { prompt: "Which outcome of natural selection makes more individuals acquire the mean character value?", answer: "Stabilisation" },
        { prompt: "Which outcome of natural selection gives two peaks at the ends of the distribution curve?", answer: "Disruption" },
        { prompt: "What does natural selection let heritable variations that enable better survival do, according to NCERT?", answer: "Reproduce and leave a greater number of progeny" },
      ],
      traps: [
        {
          title: "Directional means one side, disruption means both ends",
          body: "In **directional change** more individuals take a value **other than the mean**, on one side. In **disruption** they take values at **both ends**. In **stabilisation** they cluster at the **mean**.",
        },
        {
          title: "Genetic drift is not an outcome of natural selection",
          body: "Natural selection leads to **stabilisation, directional change or disruption**. **Genetic drift** is a separate, chance factor.",
        },
      ],
    },
  ],
};

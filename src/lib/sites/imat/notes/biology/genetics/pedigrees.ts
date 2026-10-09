import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_GEN_PEDIGREES_NOTE: SubtopicNote = {
  subtopicName: "Pedigrees and Populations",
  title: "Pedigree Analysis and Allele Frequencies",
  oneLineDefinition:
    "A pedigree is a family tree of a trait: its pattern reveals how the trait is inherited, and the same reasoning scaled up to a population gives allele frequencies.",
  whyItMatters:
    "Pedigree diagrams appeared in 2013, 2014, 2019, 2021 and 2022: name the pattern a family rules out, give each person's genotype, or the chance that someone carries the allele. The 2023 ministry paper asked for an allele frequency from a short list of genotypes.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-gen-pedigree-patterns",
      name: "Reading a pedigree: symbols and the five inheritance patterns",
      intuition:
        "A pedigree question is a logic puzzle. A few family events can only happen under certain patterns: two unaffected parents with an affected child, two affected parents with an unaffected child, or a father passing a trait to his son. Find one such event, and it rules whole patterns in or out.",
      definition:
        "**Symbols**: square = male, circle = female, filled = affected, half-filled or dotted = carrier; a horizontal line joins parents, a vertical line leads to their children; generations are numbered I, II, III.\n" +
        "- **Unaffected parents, affected child**: the allele is **recessive** (both parents carry it).\n" +
        "- **Affected parents, unaffected child**: the allele is **dominant** (both parents are heterozygous).\n" +
        "- **Unaffected father, affected daughter**: it cannot be X-linked recessive (her father would be affected).\n" +
        "- **Affected father, affected son**: it cannot be X-linked (a son gets his father's Y).\n" +
        "- A new **mutation** can explain one affected person in an otherwise unaffected family.",
      table: {
        columns: ["Pattern", "Typical clues", "Proof or key rule"],
        rows: [
          { cells: ["Autosomal recessive", "Skips generations; both sexes equally", "Two unaffected parents have an affected child"] },
          { cells: ["Autosomal dominant", "Appears in every generation; both sexes equally", "Two affected parents have an unaffected child"] },
          { cells: ["X-linked recessive", "Mostly males; passed through unaffected carrier mothers", "An affected woman's father and all her sons are affected"] },
          { cells: ["X-linked dominant", "More females than males affected", "An affected man has all daughters and no sons affected"] },
          { cells: ["Y-linked", "Males only", "Passed from father to every son"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "In a family, two unaffected parents have an affected daughter and two unaffected sons. Assuming no new mutation, which inheritance pattern fits?",
        options: ["Autosomal dominant", "X-linked recessive", "X-linked dominant", "Y-linked", "Autosomal recessive"],
        steps: [
          "Unaffected parents with an affected child: the allele is recessive, so A and C are out.",
          "X-linked recessive would need the daughter to get an affected X from her father, but he is unaffected: B is out.",
          "Y-linked traits never appear in daughters: D is out. Only autosomal recessive fits.",
        ],
        answer: "(E) Autosomal recessive",
      },
      practiceSet: [
        { prompt: "An affected father has an affected son. Which patterns are ruled out?", answer: "Both X-linked patterns", method: "A son gets his father's Y, not his X" },
        { prompt: "Two affected parents have an unaffected child. What does this prove?", answer: "The allele is dominant" },
        { prompt: "A condition appears only in men and is passed on through their unaffected daughters to grandsons. Which pattern is most likely?", answer: "X-linked recessive" },
      ],
      traps: [
        {
          title: "An affected boy with unaffected parents fits several patterns",
          body: "An affected son of two unaffected parents fits autosomal recessive (both parents carriers), X-linked recessive (carrier mother) and a new mutation. It does not fit any dominant pattern, because a dominant allele inherited from a parent would show in that parent.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-gen-pedigree-probability",
      name: "Probabilities from a pedigree, including the two-thirds rule",
      intuition:
        "First fix every genotype the family proves. Then, for people whose genotype is uncertain, use what you know about them. An unaffected child of two carriers cannot be \\(aa\\), so only three of the four Punnett boxes remain, and two of those three are carriers. Then multiply the chances along the family line.",
      definition:
        "- Write the certain genotypes first: affected people with a recessive condition are \\(aa\\); their unaffected parents are \\(Aa\\).\n" +
        "- **Two-thirds rule**: an **unaffected** child of two carriers is a carrier with probability \\(\\tfrac23\\) (not \\(\\tfrac12\\)).\n" +
        "- For X-linked recessive: the unaffected sister of an affected boy (with an unaffected father) is a carrier with probability \\(\\tfrac12\\).\n" +
        "- Multiply each uncertain step: \\(P(\\text{parent 1 carrier}) \\times P(\\text{parent 2 carrier}) \\times P(\\text{child affected, if both are})\\).",
      formula: {
        label: "Chance of an affected child from uncertain carriers",
        latex: "P(\\text{affected child}) = P_1 \\times P_2 \\times \\tfrac14",
        symbols: [
          { symbol: "\\(P_1, P_2\\)", meaning: "probability that each parent is a carrier" },
          { symbol: "\\(\\tfrac14\\)", meaning: "chance two carriers have an affected child" },
        ],
      },
      authoredExample: {
        prompt:
          "Cystic fibrosis is autosomal recessive. Luca is unaffected, but his sister has cystic fibrosis and his parents are unaffected. (a) What is the probability that Luca is a carrier? (b) Luca's partner is a known carrier. What is the probability that their first child has cystic fibrosis? (c) What if instead his partner is an unrelated person from a population where 1 in 25 people is a carrier?",
        steps: [
          "His sister is \\(cc\\), so both parents are \\(Cc\\).",
          "(a) Luca is unaffected, so he is \\(CC\\) or \\(Cc\\) in the ratio 1 : 2: \\(P(\\text{carrier}) = \\tfrac23\\).",
          "(b) \\(\\tfrac23 \\times 1 \\times \\tfrac14 = \\tfrac16\\).",
          "(c) \\(\\tfrac23 \\times \\tfrac{1}{25} \\times \\tfrac14 = \\tfrac{1}{150}\\).",
        ],
        answer: "(a) \\(\\tfrac23\\); (b) \\(\\tfrac16\\); (c) \\(\\tfrac{1}{150}\\)",
      },
      selfCheckExample: {
        prompt:
          "Haemophilia is X-linked recessive. Anna's parents are both unaffected, but her brother has haemophilia. Anna has children with an unaffected man. What is the probability that her first son has haemophilia?",
        options: ["\\(\\tfrac12\\)", "\\(\\tfrac18\\)", "\\(\\tfrac14\\)", "\\(\\tfrac23\\)", "0"],
        steps: [
          "The brother's \\(X^h\\) came from the mother, so she is \\(X^H X^h\\). The father is \\(X^H Y\\).",
          "Anna got \\(X^H\\) from her father and either X from her mother: she is a carrier with probability \\(\\tfrac12\\).",
          "If she is a carrier, a son is affected with probability \\(\\tfrac12\\). So \\(\\tfrac12 \\times \\tfrac12 = \\tfrac14\\).",
          "A assumes Anna is surely a carrier. B is the chance that her first child, of either sex, is an affected son. D uses the autosomal two-thirds rule, which does not apply here.",
        ],
        answer: "(C) \\(\\tfrac14\\)",
      },
      practiceSet: [
        { prompt: "Two unaffected parents have a child with an autosomal recessive condition. What is the chance their next child is affected?", answer: "\\(\\tfrac14\\)" },
        { prompt: "A person heterozygous for an autosomal dominant condition has children with an unaffected partner. What is the chance each child is affected?", answer: "\\(\\tfrac12\\)" },
        { prompt: "Two carriers of an autosomal recessive allele: what is the chance a child is unaffected AND not a carrier?", answer: "\\(\\tfrac14\\)", method: "Only \\(AA\\)" },
        { prompt: "An unaffected woman's sister has an autosomal recessive condition, and both parents are unaffected. What is the chance she is a carrier?", answer: "\\(\\tfrac23\\)" },
      ],
      traps: [
        {
          title: "An unaffected sibling of an affected person is a carrier with 2/3, not 1/2",
          body: "Of the four equally likely children of two carriers, one is \\(aa\\). If we know the child is unaffected, that box is gone; of the three left (\\(AA\\), \\(Aa\\), \\(aA\\)), two are carriers. Using \\(\\tfrac12\\) or \\(\\tfrac14\\) here gives one of the wrong options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-gen-hardy-weinberg",
      name: "Allele frequencies and the Hardy-Weinberg principle",
      intuition:
        "Count alleles, not people. Every person carries two alleles of a gene, so a population of N people carries 2N alleles. The frequency of an allele is its share of those. If mating is random and nothing changes the alleles, the genotype shares in the next generation follow simply from the allele shares, like drawing two alleles at random.",
      definition:
        "- **Allele frequency** = copies of the allele / total alleles. Each homozygote has 2 copies, each heterozygote 1.\n" +
        "- With two alleles of frequencies \\(p\\) and \\(q\\): \\(p + q = 1\\).\n" +
        "- **Hardy-Weinberg principle**: the genotype frequencies are \\(p^2\\) (\\(AA\\)), \\(2pq\\) (\\(Aa\\)), \\(q^2\\) (\\(aa\\)), and they stay constant across generations.\n" +
        "- It holds only if: the population is **large**, mating is **random**, and there is **no mutation, no selection and no migration**. A population that departs from it is evolving.\n" +
        "- For a recessive condition, the affected share is \\(q^2\\), so \\(q = \\sqrt{\\text{affected share}}\\).",
      formula: {
        label: "Hardy-Weinberg equations",
        latex: "p + q = 1 \\qquad p^2 + 2pq + q^2 = 1",
        symbols: [
          { symbol: "\\(p\\)", meaning: "frequency of the dominant allele \\(A\\)" },
          { symbol: "\\(q\\)", meaning: "frequency of the recessive allele \\(a\\)" },
          { symbol: "\\(2pq\\)", meaning: "frequency of heterozygotes (carriers)" },
        ],
      },
      authoredExample: {
        prompt:
          "The MN blood group is controlled by two codominant alleles, M and N. A sample of 200 people contains 98 MM, 84 MN and 18 NN. Find the allele frequencies, then check whether the sample fits Hardy-Weinberg proportions.",
        steps: [
          "Total alleles: \\(2 \\times 200 = 400\\).",
          "M copies: \\(2 \\times 98 + 84 = 280\\), so \\(p = 280/400 = 0.70\\) and \\(q = 0.30\\).",
          "Expected: \\(p^2 = 0.49\\) gives 98 MM; \\(2pq = 0.42\\) gives 84 MN; \\(q^2 = 0.09\\) gives 18 NN.",
          "These match the sample exactly, so it fits Hardy-Weinberg proportions.",
        ],
        answer: "\\(p = 0.70\\), \\(q = 0.30\\); the sample fits",
      },
      selfCheckExample: {
        prompt:
          "An autosomal recessive condition affects 1 person in 400 in a population at Hardy-Weinberg equilibrium. What is the frequency of carriers (heterozygotes)?",
        options: ["0.0025", "0.05", "0.0475", "0.095", "0.9025"],
        steps: [
          "\\(q^2 = 1/400 = 0.0025\\), so \\(q = 0.05\\) and \\(p = 0.95\\).",
          "Carriers: \\(2pq = 2 \\times 0.95 \\times 0.05 = 0.095\\), about 1 in 10.5.",
          "A is \\(q^2\\) (the affected), B is \\(q\\), C forgets the 2 in \\(2pq\\), E is \\(p^2\\).",
        ],
        answer: "(D) 0.095",
      },
      practiceSet: [
        { prompt: "In a group of 10, three are \\(AA\\), four \\(Aa\\) and three \\(aa\\). What is the frequency of \\(A\\)?", answer: "0.5", method: "\\((2 \\times 3 + 4)/20\\)" },
        { prompt: "If \\(q = 0.4\\), what fraction of the population is \\(AA\\) at equilibrium?", answer: "0.36", method: "\\(p = 0.6\\), \\(p^2\\)" },
        { prompt: "If \\(q = 0.4\\), what fraction is heterozygous at equilibrium?", answer: "0.48", method: "\\(2 \\times 0.6 \\times 0.4\\)" },
        { prompt: "Name two conditions needed for Hardy-Weinberg equilibrium.", answer: "Any two of: large population, random mating, no mutation, no selection, no migration" },
      ],
      traps: [
        {
          title: "Count alleles, not individuals",
          body: "The frequency of \\(A\\) is not the share of people with an \\(A\\). Each \\(AA\\) person contributes two copies, each \\(Aa\\) one, and the total is twice the number of people. Dividing by the number of people, or counting \\(AA\\) once, gives a wrong option.",
        },
      ],
    },
  ],
};

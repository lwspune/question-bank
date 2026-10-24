import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_GE_EVOLUTION_NOTE: SubtopicNote = {
  subtopicName: "Evolution",
  title: "Evolution",
  oneLineDefinition:
    "Why a skill learnt in life is not inherited, what Lamarck, Darwin and Hardy-Weinberg said, how variation and natural selection drive evolution, and how to tell homologous from analogous organs.",
  whyItMatters:
    "Four CDS questions from 2020 (II) to 2026 (II), two of them in the 2026 papers. Each one tests a single idea: acquired traits are not inherited, variations do not all survive equally, Hardy-Weinberg means stable allele frequencies, and bird and bat wings are analogous.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbige-theories",
      name: "Inherited and acquired traits, and the theories",
      intuition:
        "A trait is passed on only if it is written in the DNA of the egg or sperm. Curly hair and freckles are written there. A skill you learn, a muscle you build or a scar you get changes your body, but not the DNA of your egg or sperm cells, so your children do not get it. Lamarck thought such acquired traits were passed on; Darwin explained evolution without that idea.",
      definition:
        "Theories of evolution (NCERT Class 10 and 12):\n" +
        "- **Inherited traits** are coded in the **DNA of the germ cells**: eye colour, curly hair, attached or free earlobes, freckles.\n" +
        "- **Acquired traits** are gained during life (a learnt skill, a strong muscle, a cut tail) and are **not inherited**, because they do not change the DNA of the germ cells.\n" +
        "- **Lamarck**: use and disuse of organs, and **inheritance of acquired characters** (the giraffe stretched its neck). This idea was rejected.\n" +
        "- **Darwin** (Origin of Species, 1859): **branching descent** and **natural selection** are the two key ideas.\n" +
        "- **Hugo de Vries**: the **mutation** theory, from work on the evening primrose.\n" +
        "- **Hardy-Weinberg principle**: allele frequencies in a population **stay stable** from one generation to the next. Five factors upset this balance: **gene flow** (migration), **genetic drift**, **mutation**, **genetic recombination** and **natural selection**.",
      table: {
        columns: ["Person or principle", "Key idea"],
        rows: [
          { cells: ["Lamarck", "Inheritance of acquired characters (rejected)"] },
          { cells: ["Darwin", "Branching descent and natural selection"] },
          { cells: ["Hugo de Vries", "Evolution by mutation"] },
          {
            cells: ["Hardy-Weinberg", "Allele frequencies stay stable unless disturbed"],
            noteAmber: "CDS 2026 (II): the wrong statement says Hardy-Weinberg makes allele frequencies unstable.",
            pyqExampleId: "5271cb92-4e39-4f70-8bf0-199c9ed5edb8",
          },
          { cells: ["Weismann", "Cut the tails of mice for generations; the young still had tails"] },
        ],
      },
      pyqExampleId: "4c33c414-645a-482b-b9d6-5c6884dce2ed",
      selfCheckExample: {
        prompt: "Lamarck said the giraffe got its long neck because its ancestors stretched to reach high leaves. How would Darwin explain the long neck instead?",
        steps: [
          "Giraffes were born with necks of slightly different lengths (natural variation).",
          "Those with longer necks reached more food, lived longer and left more young.",
          "Over many generations the long-neck variation became common. Stretching itself was never passed on.",
        ],
        answer: "By natural selection of giraffes born with longer necks, not by passing on stretched necks.",
      },
      practiceSet: [
        { prompt: "Who proposed the inheritance of acquired characters?", answer: "Lamarck" },
        { prompt: "In which year was Darwin's Origin of Species published?", answer: "1859" },
        { prompt: "Who proposed the mutation theory of evolution?", answer: "Hugo de Vries" },
        { prompt: "Is a muscle built up by exercise passed on to one's children?", answer: "No: it is an acquired trait" },
      ],
      traps: [
        {
          title: "Learnt skills are not in the DNA",
          body: "A skill such as **chess** or swimming is **acquired**, so children do not inherit it. Hair type, earlobes and freckles are **inherited** because genes decide them.",
        },
        {
          title: "Hardy-Weinberg means stable",
          body: "The **Hardy-Weinberg principle** says allele frequencies **stay constant** in a population. Mutation, gene flow, drift, recombination and selection are what **disturb** that balance.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbige-variation",
      name: "Variation and natural selection",
      intuition:
        "No two members of a species are exactly alike: these differences are variations. They arise when DNA is copied with small changes, and when sexual reproduction mixes the genes of two parents. When the surroundings change, some variants happen to cope better, survive and have more young. Over time their kind becomes common. That is natural selection.",
      definition:
        "Variation and selection (NCERT Class 10 and 12):\n" +
        "- Variation comes from **changes in the genetic material** (mutation), from **sexual reproduction** (genes of two parents combined) and from **crossing over** (recombination).\n" +
        "- **Asexual** reproduction gives very **little** variation, only from small errors in copying DNA.\n" +
        "- **Natural selection**: the **environment selects** the variants best suited to it; they survive and reproduce more. So **different variations have different chances of survival**.\n" +
        "- **Industrial melanism**: in England, after soot darkened tree trunks, **dark peppered moths** became common because birds could not spot them.\n" +
        "- **Antibiotic resistance**: a few bacteria that can survive a drug multiply until most of the population resists it.\n" +
        "- **Genetic drift** is a chance change in gene frequencies, strongest in small populations; **gene flow** is the movement of genes between populations.",
      table: {
        columns: ["Source or process", "What happens"],
        rows: [
          { cells: ["Mutation", "A change in the DNA creates a new variant"] },
          { cells: ["Sexual reproduction", "Genes of two parents mix in new combinations"] },
          { cells: ["Asexual reproduction", "Very little variation"] },
          {
            cells: ["Natural selection", "Variants best suited to the environment survive and reproduce more"],
            noteAmber: "CDS 2021 (II): the false statement is that all variations in a species have equal chances of survival.",
            pyqExampleId: "cb1b4d86-c9ff-4545-995a-91ba6f19bf4c",
          },
          { cells: ["Genetic drift", "Chance change in gene frequency in a small population"] },
        ],
      },
      pyqExampleId: "cb1b4d86-c9ff-4545-995a-91ba6f19bf4c",
      selfCheckExample: {
        prompt: "A population of bacteria is treated with an antibiotic. Most die, but a few survive. Weeks later, nearly all the bacteria resist the drug. Explain this using natural selection.",
        steps: [
          "Before the drug was used, a few bacteria already carried a variation that let them survive it.",
          "The drug killed the others, so only the resistant ones were left to multiply.",
          "Their offspring inherited the resistance, so the population became mostly resistant.",
        ],
        answer: "The drug selected the variants that could resist it; they survived, multiplied and passed the trait on.",
      },
      practiceSet: [
        { prompt: "What is a chance change in gene frequencies, strongest in a small population, called?", answer: "Genetic drift" },
        { prompt: "What is the movement of genes from one population into another called?", answer: "Gene flow" },
        { prompt: "Which moths became common in industrial England as soot darkened tree trunks?", answer: "Dark (melanic) peppered moths" },
        { prompt: "Name a process during sex-cell formation that mixes the genes on a chromosome pair.", answer: "Crossing over (recombination)" },
      ],
      traps: [
        {
          title: "Variations are not equal in survival",
          body: "Some variants suit the environment better than others, so they have **better chances of survival**. That inequality is exactly what **natural selection** works on.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbige-organs",
      name: "Homologous and analogous organs",
      intuition:
        "Two organs can look alike for two very different reasons. Some share a common ancestor and so the same basic plan of bones, even if they now do different jobs: these are homologous. Others come from different ancestors and are built differently, but do the same job because they faced the same problem, like flying: these are analogous.",
      definition:
        "Evidence from organs (NCERT Class 10 and 12):\n" +
        "- **Homologous organs**: **same basic structure and origin, different functions**. The forelimbs of a human, whale, bat and cheetah; the thorn of Bougainvillea and the tendril of Cucurbita (both modified stems). They show **divergent** evolution.\n" +
        "- **Analogous organs**: **different origin and structure, same function**. The **wings of birds and bats** (NCERT Class 10), the wings of a butterfly and a bird, the eyes of an octopus and a mammal, the potato (stem) and sweet potato (root). They show **convergent** evolution.\n" +
        "- A bird's wing is a forelimb covered in **feathers**; a bat's wing is **skin** stretched between long finger bones. Same job, different design.\n" +
        "- **Vestigial organs** are reduced and no longer used, such as the human appendix.",
      table: {
        columns: ["Kind", "Origin and function", "Examples"],
        rows: [
          { cells: ["Homologous", "Same origin, different function", "Forelimbs of human, whale and bat; thorn of Bougainvillea and tendril of Cucurbita"] },
          {
            cells: ["Analogous", "Different origin, same function", "Wings of bird and bat; wings of butterfly and bird; potato and sweet potato"],
            noteAmber: "CDS 2020 (II): bird and bat wings are analogous because they have a different origin and a common function.",
            pyqExampleId: "d7f30ecb-191e-4e6d-a8bc-17510ae27478",
          },
          { cells: ["Vestigial", "Reduced, no longer used", "Human appendix, wisdom teeth"] },
        ],
      },
      pyqExampleId: "d7f30ecb-191e-4e6d-a8bc-17510ae27478",
      selfCheckExample: {
        prompt: "The thorn of Bougainvillea protects the plant, and the tendril of Cucurbita helps it climb. Both grow from the same position, as modified stems. Are they homologous or analogous?",
        steps: [
          "Both are modified stems, so they share the same origin.",
          "They now do different jobs: protection and climbing.",
          "Same origin with different function is the mark of homologous organs.",
        ],
        answer: "Homologous: same origin (stem), different functions.",
      },
      practiceSet: [
        { prompt: "Are the forelimbs of a whale and of a human homologous or analogous?", answer: "Homologous" },
        { prompt: "Which kind of evolution do analogous organs show?", answer: "Convergent evolution" },
        { prompt: "Are a potato and a sweet potato homologous or analogous?", answer: "Analogous: one is a stem, the other a root, both store food" },
        { prompt: "What are reduced organs that no longer do a job, such as the human appendix, called?", answer: "Vestigial organs" },
      ],
      traps: [
        {
          title: "Analogous: different origin, same job",
          body: "**Analogous** organs have a **different origin** and a **common function**. **Homologous** organs have a **common origin** and may do **different** jobs. Swapping the two halves is the trap in every option set.",
        },
        {
          title: "Homologous shows divergence, analogous convergence",
          body: "Homologous organs show **divergent** evolution (one plan, many uses). Analogous organs show **convergent** evolution (many plans, one use).",
        },
      ],
    },
  ],
};

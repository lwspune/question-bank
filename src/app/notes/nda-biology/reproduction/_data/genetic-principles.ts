import type { SubtopicNote } from "@/app/notes/_types";

export const REPRO_GENETIC_PRINCIPLES_NOTE: SubtopicNote = {
  subtopicName: "Sexual Reproduction — Genetic Principles",
  title: "Sexual Reproduction — Why Two Parents and Meiosis",
  oneLineDefinition:
    "Sexual reproduction mixes genetic material from two parents through meiosis (which makes varied haploid gametes) and fertilisation (which rejoins them) — the source of the variation that lets a species survive over evolutionary time.",
  whyItMatters:
    "This is the conceptual spine of the whole chapter, and the NDA tests it directly (3 PYQs, 2023 — two EASY, one HARD). " +
    "The bank's favourite trap is the ploidy paradox: meiosis HALVES the chromosome number, yet across a full generation the chromosome number stays CONSTANT — because fertilisation doubles it back. " +
    "Reason it out once and you can answer any 'remains constant / decreases / increases' question cold.",
  concepts: [
    // Foundation — no PYQ
    {
      kind: "formula" as const,
      slug: "repro-asexual-vs-sexual",
      name: "Asexual vs sexual reproduction — one parent or two",
      intuition:
        "Reproduction makes new individuals. Asexual reproduction uses ONE parent and copies it (offspring are clones — genetically identical). Sexual reproduction uses TWO parents and shuffles their genes — offspring are genetically different from each other and from the parents. " +
        "That single difference — clones vs variation — is what the whole chapter hangs on.",
      definition:
        "Two modes of reproduction:\n" +
        "- **Asexual reproduction** — one parent, no gametes, no fusion. Offspring are **genetically identical clones**. Fast and reliable (binary fission in bacteria, budding in yeast, vegetative propagation in plants).\n" +
        "- **Sexual reproduction** — two parents, gametes formed by **meiosis**, fused by **fertilisation**. Offspring show **genetic variation**. Slower, but variation is the raw material natural selection acts on.\n" +
        "The two engines of variation in sexual reproduction are **meiosis** (crossing over + random assortment make every gamete different) and **fertilisation** (combines two parents' genomes).",
      authoredExample: {
        prompt:
          "A gardener grows two new rose plants. Plant 1 was grown from a cutting of an existing rose; Plant 2 was grown from a seed produced after two roses cross-pollinated. Which plant is genetically identical to its parent, and why?",
        steps: [
          "A cutting is asexual (vegetative) propagation — one parent, no gametes, no fusion.",
          "Asexual offspring are clones, so Plant 1 is genetically identical to the rose it was cut from.",
          "A seed forms after pollination + fertilisation — that is sexual reproduction with two parents.",
          "Sexual reproduction shuffles genes via meiosis and fertilisation, so Plant 2 is genetically different from both parents.",
        ],
        answer:
          "Plant 1 (the cutting) is the clone — asexual reproduction copies one parent. Plant 2 (the seed) shows variation because sexual reproduction mixes two parents' genes.",
      },
      practiceSet: [
        {
          prompt: "How many parents does asexual reproduction need?",
          answer: "One",
          method: "no gametes, no fusion — offspring are clones",
        },
        {
          prompt: "Are offspring of asexual reproduction genetically identical or varied?",
          answer: "Identical (clones)",
        },
        {
          prompt: "Which mode of reproduction produces genetic variation?",
          answer: "Sexual reproduction",
          method: "via meiosis + fertilisation",
        },
      ],
      traps: [
        {
          title: "Clones come from asexual reproduction, not sexual",
          body:
            "If a question says offspring are 'genetically identical' to the parent, the answer is **asexual** reproduction. Sexual reproduction always introduces variation — that is its entire evolutionary point.",
        },
      ],
    },

    // PYQ: 566769ac — two features that create diversity = meiosis + fertilization
    {
      kind: "formula" as const,
      slug: "repro-two-engines-of-variation",
      name: "The two engines of genetic variation — meiosis and fertilisation",
      intuition:
        "Sexual reproduction creates diversity in two steps. Meiosis builds gametes that are each genetically unique (crossing over swaps DNA between chromosomes; random assortment deals the chromosomes out differently every time). Then fertilisation randomly pairs one varied gamete with another. " +
        "Two random shuffles in a row is why no two siblings (except identical twins) are alike.",
      definition:
        "The two features of sexual reproduction that generate diversity in offspring:\n" +
        "- **Meiosis** — the cell division that makes gametes. It introduces variation by **crossing over** (exchange of segments between homologous chromosomes) and **random assortment** (each gamete gets a random mix of maternal and paternal chromosomes).\n" +
        "- **Fertilisation** — the random fusion of one male gamete with one female gamete, combining two different genomes.\n" +
        "Mitosis, binary fission, and budding all produce identical copies — they are NOT sources of variation.",
      authoredExample: {
        prompt:
          "A student lists four processes — mitosis, meiosis, fertilisation, binary fission. Which TWO together are responsible for genetic diversity in sexually reproducing offspring?",
        steps: [
          "Mitosis makes identical body cells — no new variation. Cross it off.",
          "Binary fission is asexual cloning in bacteria — no variation. Cross it off.",
          "Meiosis makes varied gametes through crossing over and random assortment. Keep it.",
          "Fertilisation randomly combines two varied gametes from two parents. Keep it.",
        ],
        answer: "Meiosis and fertilisation — the two random shuffles that create genetic diversity.",
      },
      practiceSet: [
        {
          prompt: "Name the two processes that create genetic diversity in sexual reproduction.",
          answer: "Meiosis and fertilisation",
        },
        {
          prompt: "Does mitosis create genetic variation?",
          answer: "No",
          method: "mitosis makes identical copies",
        },
        {
          prompt: "Which event in meiosis swaps DNA segments between homologous chromosomes?",
          answer: "Crossing over",
        },
      ],
      pyqExampleId: "566769ac-40eb-4dbb-99e2-2641e0c991b4",
      traps: [
        {
          title: "Meiosis pairs with fertilisation — not mitosis, not conjugation",
          body:
            "The distractors offer 'mitosis and fertilisation' and 'meiosis and conjugation'. Mitosis makes identical cells, and conjugation is a bacterial gene-transfer, not a step of normal sexual reproduction. The answer is always **meiosis AND fertilisation**.",
        },
      ],
    },

    // PYQ: cdc5f588 — advantage of sexual reproduction = more variation
    {
      kind: "formula" as const,
      slug: "repro-advantage-of-variation",
      name: "Why variation is an evolutionary advantage",
      intuition:
        "Sexual reproduction is slower and needs two parents — so why has evolution kept it? Because variation is insurance. When the environment changes (a new disease, a drought), a varied population is likely to contain some individuals that happen to cope. A population of clones either all survive or all die. " +
        "Variation, not the NUMBER of offspring, is the long-term survival advantage.",
      definition:
        "The key advantage of sexual reproduction over asexual reproduction is that it produces **more variation in offspring**.\n" +
        "- Variation gives a population the **raw material for natural selection** — different individuals respond differently to a changing environment.\n" +
        "- This lets the species **adapt and survive over long evolutionary time**.\n" +
        "Sexual reproduction does NOT produce more offspring per cycle, nor guaranteed 'healthier' offspring, nor genetically similar offspring — those are distractor framings.",
      authoredExample: {
        prompt:
          "A new fungal disease sweeps through two fields. Field A is planted with genetically identical cloned crops; Field B with seed-grown crops showing genetic variation. Which field is more likely to have some surviving plants, and why is this the evolutionary advantage of sexual reproduction?",
        steps: [
          "Field A's clones are all genetically identical — if the disease can kill one, it can kill all.",
          "Field B's varied plants differ genetically — some may carry resistance by chance.",
          "Those resistant plants survive and reproduce, so the population persists.",
          "This is exactly the advantage sexual reproduction confers: variation lets a species survive a changing environment.",
        ],
        answer:
          "Field B (the varied, seed-grown crop) is more likely to have survivors — because sexual reproduction produces variation, the raw material for surviving environmental change.",
      },
      practiceSet: [
        {
          prompt: "What is the main evolutionary advantage of sexual reproduction?",
          answer: "It produces more variation in offspring",
        },
        {
          prompt: "Does sexual reproduction produce more offspring per cycle than asexual?",
          answer: "No",
          method: "its advantage is variation, not number",
        },
        {
          prompt: "Why does variation help a species survive over long time?",
          answer: "Some varied individuals can cope with environmental change (raw material for natural selection)",
        },
      ],
      pyqExampleId: "cdc5f588-86fd-4e7d-a6ff-651d3168559f",
      traps: [
        {
          title: "The advantage is variation, NOT more or 'healthier' offspring",
          body:
            "Tempting distractors say sexual reproduction gives 'more offspring' or 'robust and healthy offspring' or 'genetically similar offspring'. Wrong on all counts — its single evolutionary payoff is **more variation in offspring**.",
        },
      ],
    },

    // PYQ: 44916a53 (HARD) — chromosome number AND DNA content remain constant
    {
      kind: "formula" as const,
      slug: "repro-constant-chromosome-number",
      name: "Why chromosome number stays constant across generations",
      intuition:
        "Here is the paradox the NDA loves: meiosis HALVES the chromosome number to make gametes — yet a child has the SAME chromosome number as its parents. How? Fertilisation puts the two halves back together. Half from each parent doubles back to a full set. " +
        "So over the complete cycle, both chromosome number and DNA content of the species are held CONSTANT — meiosis and fertilisation cancel out.",
      definition:
        "Across a full sexual life cycle the species' chromosome number is conserved:\n" +
        "- A diploid parent cell has **2n** chromosomes.\n" +
        "- **Meiosis** halves it: each gamete is haploid (**n**).\n" +
        "- **Fertilisation** fuses two gametes: n + n = **2n** zygote — the original number is restored.\n" +
        "Because the halving (meiosis) and the doubling (fertilisation) cancel, **both the chromosome number and the DNA content of the species remain constant** from parent to offspring. This is true for the parent and offspring as a generation, even though individual gametes are haploid.",
      authoredExample: {
        prompt:
          "Humans have 46 chromosomes in body cells. A sperm and an egg each carry 23. Show that the child also has 46, and state what stays constant from parent to offspring.",
        steps: [
          "Body cells are diploid: 46 chromosomes (2n).",
          "Meiosis halves this to make gametes: sperm 23, egg 23 (n).",
          "Fertilisation fuses them: 23 + 23 = 46 in the zygote (2n).",
          "So the child's body cells again have 46 — the same as both parents.",
        ],
        answer:
          "Both the chromosome number (46) and the DNA content remain constant from parent to offspring — meiosis halves it, fertilisation restores it.",
      },
      practiceSet: [
        {
          prompt:
            "Across a full sexual cycle, does the species' chromosome number increase, decrease, or stay constant?",
          answer: "Stay constant",
          method: "meiosis halves it, fertilisation doubles it back",
        },
        {
          prompt: "A diploid cell has 2n chromosomes. How many does a gamete have?",
          answer: "n (haploid)",
        },
        {
          prompt: "n + n gametes fuse at fertilisation to give what?",
          answer: "2n zygote (diploid — original number restored)",
        },
      ],
      pyqExampleId: "44916a53-0bba-4c62-ad7c-0963dd5c54aa",
      traps: [
        {
          title: "Constant, not decreasing — fertilisation undoes meiosis",
          body:
            "Students see 'meiosis halves the chromosomes' and pick 'decreases'. That is true only for the GAMETE. The question asks about parent vs offspring across the whole cycle — and fertilisation restores the full number, so **both chromosome number AND DNA content remain constant**.",
        },
      ],
    },
  ],
};

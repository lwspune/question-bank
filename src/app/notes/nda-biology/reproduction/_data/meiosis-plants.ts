import type { SubtopicNote } from "@/app/notes/_types";

export const REPRO_MEIOSIS_PLANTS_NOTE: SubtopicNote = {
  subtopicName: "Meiosis and DNA in Flowering Plants",
  title: "Meiosis in Flowering Plants — Where the DNA Halves",
  oneLineDefinition:
    "In a flowering plant the diploid DNA content is halved by meiosis during gamete formation — specifically when pollen (the male gamete) and the egg are made, not during seed germination, fruit formation, or bud formation.",
  whyItMatters:
    "A single but sharp PYQ (2023, MODERATE) that tests one idea: meiosis — and therefore the halving of DNA — happens at GAMETE FORMATION, before fertilisation, not at any later stage of the plant's life. " +
    "It is the plant-specific version of the ploidy reasoning from the previous subtopic.",
  concepts: [
    // PYQ: 1bbb5159 — DNA halved during pollen formation
    {
      kind: "formula" as const,
      slug: "repro-dna-halved-at-pollen-formation",
      name: "DNA is halved during pollen (gamete) formation",
      intuition:
        "Walk the timeline of a flowering plant. The plant is diploid (2n). To make gametes it does meiosis, which halves the DNA to haploid (n) — this happens when POLLEN forms in the anther and when the egg forms in the ovule. Fertilisation then restores 2n. " +
        "So the only moment the DNA drops to half is gamete formation. Everything after fertilisation (seed, fruit, germination) is already back to 2n.",
      definition:
        "In flowering plants, the parent's DNA content is halved by **meiosis during gamete (pollen and egg) formation**:\n" +
        "- **Pollen formation** (microsporogenesis, in the anther) — meiosis halves DNA → haploid pollen. **This is the answer.**\n" +
        "- **Seed germination** — the embryo is already diploid (2n); no halving.\n" +
        "- **Fruit formation** — the ovary (2n) develops into fruit after fertilisation; no halving.\n" +
        "- **Flower bud formation** — ordinary growth by **mitosis**, which keeps the DNA content the same.\n" +
        "Halving happens **once**, at gamete formation, BEFORE fertilisation.",
      authoredExample: {
        prompt:
          "At which stage of a flowering plant's life is the DNA content reduced to half: when the anther makes pollen, when a flower bud grows, when a fruit ripens, or when a seed germinates?",
        steps: [
          "Flower bud growth and seed germination both happen by mitosis — DNA content is unchanged (still 2n).",
          "Fruit ripening is the ovary (already 2n) enlarging after fertilisation — no halving.",
          "Pollen forms by meiosis in the anther — meiosis halves the DNA to haploid.",
          "So the halving occurs at pollen (gamete) formation.",
        ],
        answer: "When the anther makes pollen — pollen formation, by meiosis, halves the DNA to haploid.",
      },
      practiceSet: [
        {
          prompt: "At which stage does a flowering plant halve its DNA content?",
          answer: "Pollen (gamete) formation",
          method: "meiosis in the anther / ovule",
        },
        {
          prompt: "Which cell division halves the chromosome number — mitosis or meiosis?",
          answer: "Meiosis",
        },
        {
          prompt: "Does seed germination halve the DNA content?",
          answer: "No",
          method: "the embryo is already diploid (2n)",
        },
      ],
      pyqExampleId: "1bbb5159-8d66-4fbc-a9f2-ccbfbd06d00a",
      traps: [
        {
          title: "Halving = gamete formation, not germination or fruiting",
          body:
            "The distractors (seed germination, fruit formation, flower bud formation) all occur by mitosis or after fertilisation — they keep the DNA at 2n. Only **pollen/gamete formation** uses meiosis and halves the DNA.",
        },
      ],
    },
  ],
};

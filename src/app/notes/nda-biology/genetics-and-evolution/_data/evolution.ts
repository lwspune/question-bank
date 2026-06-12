import type { SubtopicNote } from "@/app/notes/_types";

export const EVOLUTION_NOTE: SubtopicNote = {
  subtopicName: "Theory of Evolution",
  title: "The Theory of Evolution",
  oneLineDefinition:
    "Evolution is the gradual change in the heritable characteristics of a population over many generations; Darwin explained it through natural selection — the survival and reproduction of the best-adapted individuals.",
  whyItMatters:
    "The NDA tests this as a one-line recall fact — most often 'who wrote The Origin of Species?' (Charles Darwin). " +
    "Learn Darwin and the core idea of natural selection, and keep Lamarck (the disproven alternative) straight from Darwin. EASY recall.",
  concepts: [
    // Foundation — what evolution is (no PYQ)
    {
      kind: "formula" as const,
      slug: "gen-what-is-evolution",
      name: "What evolution means",
      intuition:
        "Living things are not fixed — over very long stretches of time, species change, and new species arise from older ones. " +
        "This slow change in inherited traits across generations is evolution. It acts on populations over generations, never on a single individual within its lifetime.",
      definition:
        "**Evolution** is the change in the heritable characteristics of a population over successive generations — 'descent with modification'.\n" +
        "- It operates on **populations**, not individuals, and over **many generations**.\n" +
        "- The raw material is **variation** — small inherited differences between individuals.\n" +
        "- Evidence for evolution includes **fossils** (the record of past life), **homologous organs** (same basic structure, different function — e.g. a human arm, a whale flipper, a bat wing) and **vestigial organs** (reduced, functionless remnants — e.g. the appendix).",
      authoredExample: {
        prompt:
          "A bat's wing, a whale's flipper and a human arm all share the same arrangement of bones. What does this similarity suggest, and what are such organs called?",
        steps: [
          "The same underlying bone plan, used for different functions, points to a shared ancestor.",
          "Organs with the same basic structure but different functions are called homologous organs.",
        ],
        answer:
          "It suggests a common ancestor (evidence for evolution); such organs are homologous organs.",
      },
    },

    // Darwin + natural selection (PYQ 47058e32 Darwin)
    {
      kind: "formula" as const,
      slug: "gen-darwin-natural-selection",
      name: "Darwin and natural selection",
      intuition:
        "Charles Darwin's big idea was natural selection: individuals vary, more are born than can survive, and those whose traits best fit the environment survive and leave more offspring. " +
        "Over generations, the helpful traits become common — the population has evolved.",
      definition:
        "**Charles Darwin** published **'On the Origin of Species by Means of Natural Selection'** in **1859**, drawing on observations from his voyage on **HMS Beagle** (including the Galápagos finches).\n" +
        "Natural selection rests on four observations:\n" +
        "- **Variation** — individuals in a population differ in their inherited traits.\n" +
        "- **Overproduction** — more offspring are produced than can survive.\n" +
        "- **Struggle for existence** — they compete for limited resources.\n" +
        "- **Survival of the fittest** — those best adapted survive and reproduce, passing on their traits.\n" +
        "Contrast **Lamarck**, whose theory of 'inheritance of acquired characters' (e.g. a giraffe stretching its neck and passing the longer neck to offspring) is now **disproven** — acquired (non-genetic) changes are not inherited.",
      authoredExample: {
        prompt:
          "In a population of beetles, dark beetles are better camouflaged than light ones and so are eaten less by birds. Over many generations, what happens to the colour of the population, and what is this process called?",
        steps: [
          "Dark beetles survive more often and leave more offspring than light beetles.",
          "The dark-colour trait is inherited, so its frequency rises each generation.",
          "Selection by the environment favouring the better-adapted variant is natural selection.",
        ],
        answer:
          "The population becomes darker over time; this is natural selection (survival of the fittest).",
      },
      pyqExampleId: "47058e32-0b9f-4a0c-838b-7bff51487d7c", // Darwin Origin of Species
      traps: [
        {
          title: "Darwin wrote 'The Origin of Species' — not Linnaeus or Lamarck",
          body:
            "The distractors offer **Carolus Linnaeus** (who founded binomial nomenclature and classification, not evolution) and others. The Origin of Species (1859) is **Charles Darwin**. Linnaeus = naming/classification; Darwin = evolution by natural selection.",
        },
        {
          title: "Darwin vs Lamarck",
          body:
            "**Darwin** = natural selection acting on inherited variation. **Lamarck** = inheritance of acquired characters (use and disuse), which is disproven. Don't swap them — acquired traits during an individual's life are not passed on.",
        },
      ],
    },
  ],
};

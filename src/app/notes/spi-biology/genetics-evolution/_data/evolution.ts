import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_GE_EVOLUTION_NOTE: SubtopicNote = {
  subtopicName: "Evolution and Its Evidence",
  title: "Evolution and Its Evidence",
  oneLineDefinition:
    "Evolution is the slow change of living things over many generations, explained by theories such as Darwin's natural selection and shown by evidence such as fossils and homologous organs.",
  whyItMatters:
    "Four questions in the bank, two EASY and two MODERATE: who gave natural selection, who gave the germplasm theory, what a deep fossil tells us, and which set of organs is homologous. Two are theory-and-author pairs; two are about reading the evidence.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spigeev-theories",
      name: "Theories of evolution and their authors",
      intuition:
        "Each theory tried to answer one question: how do new kinds of living things arise? Lamarck said by use and disuse; Darwin said by nature choosing the fittest; de Vries said by sudden big changes. Learn each theory with its author.",
      definition:
        "- **Lamarck**: **inheritance of acquired characters** (use and disuse of organs; the giraffe's long neck).\n" +
        "- **Charles Darwin**: **natural selection**, survival of the fittest (book: On the Origin of Species, 1859).\n" +
        "- **August Weismann**: **germplasm theory**. Only changes in the germ cells (sperm and egg) pass to offspring; changes in body cells do not. This went against Lamarck.\n" +
        "- **Hugo de Vries**: **mutation theory**: new species arise by sudden large changes.\n" +
        "- **Mendel** gave the laws of inheritance, not a theory of evolution.",
      table: {
        columns: ["Scientist", "Theory"],
        rows: [
          { cells: ["Lamarck", "Inheritance of acquired characters"] },
          {
            cells: ["Charles Darwin", "Natural selection"],
            noteAmber: "Darwin's book: On the Origin of Species (1859).",
          },
          { cells: ["August Weismann", "Germplasm theory"] },
          { cells: ["Hugo de Vries", "Mutation theory"] },
        ],
        caption: "A change a body acquires in life (a strong arm, a cut tail) is not passed on: Weismann's point against Lamarck.",
      },
      selfCheckExample: {
        prompt: "Spot the wrong pair: (a) Lamarck: use and disuse (b) Darwin: survival of the fittest (c) Hugo de Vries: germplasm theory (d) Weismann: only germ cell changes are inherited",
        steps: ["Lamarck, Darwin and Weismann are matched rightly.", "Hugo de Vries gave the mutation theory."],
        answer: "(c) is wrong: de Vries gave the mutation theory.",
      },
      practiceSet: [
        { prompt: "Who gave the theory of inheritance of acquired characters?", answer: "Lamarck" },
        { prompt: "Who gave the mutation theory?", answer: "Hugo de Vries" },
        { prompt: "Which book by Charles Darwin set out natural selection?", answer: "On the Origin of Species" },
        { prompt: "According to the germplasm theory, changes in which cells pass to the offspring?", answer: "The germ cells (sperm and egg)" },
      ],
      pyqExampleId: "9785834a-6cfa-42bd-a9da-1da841887d04",
      traps: [
        {
          title: "Darwin for every evolution question",
          body: "Darwin gave natural selection only. The germplasm theory is Weismann's, the mutation theory de Vries's and acquired characters Lamarck's.",
        },
        {
          title: "Mendel as an evolution theorist",
          body: "Mendel worked out how traits are inherited. He gave no theory of how species change.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spigeev-evidence",
      name: "Fossils, homologous and analogous organs",
      intuition:
        "Evidence for evolution comes from what animals and plants left behind (fossils) and from their bodies today. " +
        "Organs built the same way but used differently show a shared ancestor; organs used the same way but built differently do not.",
      definition:
        "- **Fossils**: remains or traces of old organisms preserved in rock. Rock layers settle one on top of another, so **deeper layers are older**: a deep fossil is of an organism that lived long ago.\n" +
        "- The age of a fossil can be found by **carbon dating** (radioactive carbon).\n" +
        "- **Homologous organs**: **same basic structure and origin**, different jobs. The **forelimbs** of a frog, lizard, bird, bat, cow, whale and human share one bone pattern.\n" +
        "- **Analogous organs**: **same job**, different structure and origin. The wing of a butterfly and the wing of a bird; also the wing of a bat and the wing of a bird, taken as wings.\n" +
        "- Archaeopteryx, a fossil with feathers and teeth, links reptiles and birds.",
      table: {
        columns: ["Type", "Structure", "Job", "Example"],
        rows: [
          {
            cells: ["Homologous", "Same", "Different", "Forelimbs of cow, duck, lizard, human"],
            noteAmber: "Homologous: same build, different use.",
          },
          { cells: ["Analogous", "Different", "Same", "Wings of butterfly and bird"] },
        ],
        caption: "Homologous organs point to a common ancestor; analogous organs only to a common need.",
      },
      selfCheckExample: {
        prompt: "The flipper of a whale and the arm of a human have the same pattern of bones but do different jobs. Are they homologous or analogous?",
        steps: ["Same structure, different job.", "That is the definition of homologous organs."],
        answer: "Homologous",
      },
      practiceSet: [
        { prompt: "The wing of a bird and the wing of an insect do the same job but are built differently. What are such organs called?", answer: "Analogous organs" },
        { prompt: "Which fossil links reptiles and birds?", answer: "Archaeopteryx" },
        { prompt: "Which method is used to find the age of a fossil?", answer: "Carbon dating" },
        { prompt: "A fossil lies in a layer just below the surface. Did the organism live recently or long ago, compared with one found much deeper?", answer: "More recently: shallower layers are younger" },
      ],
      pyqExampleId: "c567733b-8a01-406f-9e4d-236f14cc8149",
      traps: [
        {
          title: "Calling any two wings homologous",
          body: "Wings do the same job, so two wings are analogous: a butterfly's and a bird's are built from different parts. Homologous organs are the ones with the same build but different jobs, such as forelimbs.",
        },
        {
          title: "Thinking depth says nothing about age",
          body: "Rock layers pile up over time, so the deeper the layer, the older the fossil in it.",
        },
      ],
    },
  ],
};

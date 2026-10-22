import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_RP_PLANTS_NOTE: SubtopicNote = {
  subtopicName: "Reproduction in Flowering Plants",
  title: "Reproduction in Flowering Plants",
  oneLineDefinition:
    "A flower is the plant's reproductive part: pollen from the stamen reaches the stigma, a pollen tube carries the male gamete to the ovule, and the gametes fuse.",
  whyItMatters:
    "Three questions in the bank, two EASY and one MODERATE: a pair of bisexual flowers, what fertilisation means, and why one pollen grain on a stigma did not grow a tube. Learn the parts of a flower, then the order: pollination first, fertilisation after.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spirppl-flowers",
      name: "Parts of a flower, bisexual and unisexual flowers",
      intuition:
        "The male part of a flower is the stamen, which makes pollen. The female part is the pistil (carpel), which holds the ovules. " +
        "A flower with both is bisexual; a flower with only one of them is unisexual.",
      definition:
        "- **Stamen** (male): an anther on a filament. The anther makes **pollen grains**.\n" +
        "- **Pistil or carpel** (female): **stigma** (sticky top), **style** (tube), **ovary** (holds the **ovules**).\n" +
        "- **Bisexual** flower: has both stamens and pistil. Examples: **hibiscus, mustard**, rose, pea.\n" +
        "- **Unisexual** flower: has only stamens or only a pistil. Examples: **papaya, watermelon**, cucumber, maize.\n" +
        "- After fertilisation the **ovary becomes the fruit** and the **ovules become seeds**.",
      table: {
        columns: ["Flower", "Stamens and pistil", "Type"],
        rows: [
          { cells: ["Hibiscus", "Both", "Bisexual"] },
          { cells: ["Mustard", "Both", "Bisexual"] },
          { cells: ["Papaya", "Only one, on separate plants", "Unisexual"] },
          {
            cells: ["Watermelon", "Only one in each flower", "Unisexual"],
            noteAmber: "Papaya and watermelon are the unisexual examples to remember.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "After fertilisation, which part of the flower becomes the fruit, and which part becomes the seed?",
        steps: ["The ovary holds the ovules and swells into the fruit.", "Each fertilised ovule becomes a seed."],
        answer: "The ovary becomes the fruit; the ovules become seeds.",
      },
      practiceSet: [
        { prompt: "Which part of the stamen makes pollen grains?", answer: "The anther" },
        { prompt: "Is a papaya flower bisexual or unisexual?", answer: "Unisexual" },
        { prompt: "Name the sticky top of the pistil that receives pollen.", answer: "The stigma" },
        { prompt: "What is a flower with both stamens and a pistil called?", answer: "Bisexual" },
      ],
      pyqExampleId: "6c94b283-75bb-4c59-b71b-b3db9a3f3120",
      traps: [
        {
          title: "Taking every flower as bisexual",
          body: "Many flowers have both parts, but papaya and watermelon do not. Check each flower in a pair: one unisexual flower makes the pair wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spirppl-fertilisation",
      name: "Pollination and fertilisation",
      intuition:
        "Pollination is delivery: pollen is carried to a stigma. Fertilisation is the meeting itself: a male gamete fuses with the female gamete inside the ovule. " +
        "In between, the pollen grain must grow a tube down the style, and it grows only on a stigma of its own kind of plant.",
      definition:
        "- **Pollination**: transfer of pollen from an anther to a stigma, by insects, wind, water or birds.\n" +
        "- **Self-pollination**: the same flower or plant. **Cross-pollination**: another plant of the same kind.\n" +
        "- On a **compatible** stigma (same species), the pollen grain grows a **pollen tube** down the style to the ovule. Pollen of another species does not grow.\n" +
        "- **Fertilisation**: the **fusion of the nuclei** of the male and female gametes. It forms the **zygote**.\n" +
        "- Making gametes is a different step, done before all of this.",
      table: {
        columns: ["Step", "What happens", "Where"],
        rows: [
          { cells: ["Pollination", "Pollen carried to the stigma", "Anther to stigma"] },
          { cells: ["Pollen tube", "Grows from the pollen grain to the ovule", "Down the style"] },
          {
            cells: ["Fertilisation", "Male and female gamete nuclei fuse into a zygote", "Inside the ovule"],
            noteAmber: "Transfer is pollination; fusion is fertilisation.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Pollen of a mango flower lands on the stigma of a rose. Will it grow a pollen tube?",
        steps: ["A pollen grain grows its tube only on a stigma of a compatible plant, its own species.", "Mango and rose are different species."],
        answer: "No: the pollen is from an incompatible species.",
      },
      practiceSet: [
        { prompt: "What is the transfer of pollen from an anther to a stigma called?", answer: "Pollination" },
        { prompt: "What is formed when a male gamete fuses with a female gamete?", answer: "A zygote" },
        { prompt: "Through which part of the pistil does the pollen tube grow?", answer: "The style" },
        { prompt: "Pollen carried to a flower of another plant of the same kind: is this self or cross pollination?", answer: "Cross-pollination" },
      ],
      pyqExampleId: "f6cb0700-e092-4e8b-b873-dee73a7d59d0",
      traps: [
        {
          title: "Calling the transfer of a gamete fertilisation",
          body: "Carrying the male gamete to the female one is only the step before. Fertilisation is the fusion of their nuclei.",
        },
        {
          title: "Blaming the way pollen arrived",
          body:
            "Once a pollen grain is resting on the stigma, it does not matter whether wind or an insect brought it. What decides if it grows a tube is whether it comes from a compatible plant.",
        },
      ],
    },
  ],
};

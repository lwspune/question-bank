import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_ERC_WORDS_NOTE: SubtopicNote = {
  subtopicName: "RC: Words in the Passage",
  title: "RC: Words in the Passage",
  oneLineDefinition:
    "The meaning, synonym or antonym of a word as it is used in the passage, or the meaning of a phrase.",
  whyItMatters:
    "16 of the 97 Tier II RC questions, 14 EASY and 2 MODERATE. They are the quickest RC marks, since the sentence around the word gives its meaning.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssc2ercwd-meaning",
      name: "A word's meaning in the passage",
      intuition:
        "A word can have several meanings, and the passage uses one. Go back to the sentence, put each option in place of the word, and keep the one that leaves the sentence's sense unchanged.",
      definition:
        "How to answer:\n" +
        "- **Find the word** in the passage and read its whole sentence.\n" +
        "- **Swap each option in.** The right one reads naturally and keeps the meaning.\n" +
        "- **Use word parts:** cognitive (cogn- = know) is about the mind; contiguous (contig- = touching) is adjoining.",
      table: {
        columns: ["Word in the passage", "Meaning asked", "Asked in"],
        rows: [
          { cells: ["Contiguous", "Adjoining", "2022"] },
          { cells: ["Spotted", "Witnessed", "2022"] },
          { cells: ["Peak", "Zenith", "2022"] },
          { cells: ["Debris", "Detritus", "2022"] },
          { cells: ["Partially", "Partly", "2022"] },
          { cells: ["Clamoured", "Screamed (in a match question)", "2022"] },
          { cells: ["Luscious", "Juicy", "2023"] },
          { cells: ["Cognitive development", "Mental development", "2024"] },
          { cells: ["Inherent", "Natural", "2024"] },
          { cells: ["Impurities", "Scum", "2024"] },
          { cells: ["A clarion call", "A strongly expressed demand", "2024"] },
          { cells: ["Sustainable development", "Long-term gains in welfare", "2025"] },
        ],
      },
      pyqExampleId: "44305cc2-2b14-45ba-931c-d521605bfa65",
      selfCheckExample: {
        prompt: "In 'The roof was partially damaged by the storm', 'partially' means: (a) completely (b) partly (c) badly (d) never",
        steps: ["Swap each option in.", "'Partly damaged' keeps the sense."],
        answer: "(b) partly",
      },
      practiceSet: [
        { prompt: "In 'The two fields are contiguous', what does 'contiguous' mean?", answer: "Next to each other, adjoining" },
        { prompt: "In 'The climbers reached the peak at noon', give a synonym for 'peak'.", answer: "Summit (or zenith)" },
        { prompt: "In 'Kindness is inherent in her', what does 'inherent' mean?", answer: "Natural, part of her nature" },
      ],
      traps: [
        {
          title: "Using the word's most common meaning",
          body: "'Spotted' can mean marked with spots, but in 'an explosion was spotted' it means seen or witnessed. The passage decides.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssc2ercwd-antonym",
      name: "Antonyms and word hunts",
      intuition:
        "Some questions ask for the opposite of a passage word, or ask you to find a word in the passage that means something. The passage's use of the word still decides which sense to flip.",
      definition:
        "How to answer:\n" +
        "- **Antonym:** find the word's sense in its sentence first, then pick the option with the opposite sense.\n" +
        "- **Word hunt** ('which word in the passage means...'): scan the passage for a word of the same part of speech that fits the meaning.",
      table: {
        columns: ["Word", "Antonym or match", "Asked in"],
        rows: [
          { cells: ["Set (as the sun sets)", "Rise", "2022"] },
          { cells: ["Revolting", "Attractive", "2022"] },
          { cells: ["Accept", "Decline", "2022"] },
          { cells: ["Stare", "Glimpse", "2023"] },
        ],
      },
      pyqExampleId: "9bdc51f0-3ab3-431d-933b-ba7513db02f8",
      selfCheckExample: {
        prompt: "In 'The smell from the drain was revolting', choose the antonym of 'revolting'. (a) Disgusting (b) Pleasant (c) Strong (d) Strange",
        steps: ["Revolting here means very unpleasant.", "The opposite is pleasant; disgusting is a synonym."],
        answer: "(b) Pleasant",
      },
      practiceSet: [
        { prompt: "Antonym of 'accept' in 'She will accept the offer'?", answer: "Decline (or refuse)" },
        { prompt: "Antonym of 'stare' (a long, fixed look)?", answer: "Glimpse (a quick, brief look)" },
        { prompt: "Antonym of 'scarce' in 'Water was scarce in summer'?", answer: "Plentiful (abundant)" },
      ],
      traps: [
        {
          title: "Picking a synonym when the question asks for an antonym",
          body: "SSC places a synonym of the word among the options. Read the question's last word (synonym or antonym) before choosing.",
        },
      ],
    },
  ],
};

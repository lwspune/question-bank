import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_EVO_MEANING_NOTE: SubtopicNote = {
  subtopicName: "Synonyms, Antonyms and Word Meaning",
  title: "Synonyms, Antonyms and Word Meaning",
  oneLineDefinition:
    "Choosing the word closest in meaning, or opposite in meaning, to a given or underlined word, often inside a sentence that shows how it is used.",
  whyItMatters:
    "25 questions in the Tier II bank, 23 EASY and 2 MODERATE; 15 of them ask for an antonym. A word in a sentence can be guessed from the sentence, so read it before the options.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssc2evomn-antonym",
      name: "Antonyms",
      intuition:
        "An antonym is the opposite in meaning, and SSC usually adds a synonym among the options as bait. Decide whether the word is positive or negative first: the answer must flip it.",
      definition:
        "How to answer:\n" +
        "- **Find the word's direction:** placid is calm (positive), clandestine is secret, ameliorate is make better.\n" +
        "- **Remove the synonyms:** an option that means the same is the most common trap.\n" +
        "- **Use the sentence:** 'stern, yet he understands' tells you stern is the strict side, so the antonym is lenient.",
      table: {
        columns: ["Word", "Antonym", "Asked in"],
        rows: [
          { cells: ["Placid", "Angry", "2022"] },
          { cells: ["Clandestine", "Overt", "2022"] },
          { cells: ["Often", "Seldom", "2022"] },
          { cells: ["Stable", "Mutable", "2022"] },
          { cells: ["Sneered", "Lauded", "2022"] },
          { cells: ["Colossal", "Tiny", "2022"] },
          { cells: ["Insolvent", "Affluent", "2022"] },
          { cells: ["Stern", "Lenient", "2022"] },
          { cells: ["Melancholy", "Pleasant", "2024"] },
          { cells: ["Accumulated", "Scattered", "2024"] },
          { cells: ["Ameliorate", "Exacerbate", "2024"] },
          { cells: ["Enhance", "Impair", "2024"] },
          { cells: ["Generous", "Selfish", "2024"] },
          { cells: ["Thrifty", "Extravagant", "2024"] },
          { cells: ["Gullibility", "Skepticism", "2025"] },
        ],
      },
      pyqExampleId: "aee962c8-ca51-43db-9603-1533bcbf0f75",
      selfCheckExample: {
        prompt: "Choose the antonym of 'Thrifty'. (a) Careful (b) Extravagant (c) Economical (d) Poor",
        steps: ["Thrifty means careful with money.", "Careful and economical are synonyms; the opposite is extravagant."],
        answer: "(b) Extravagant",
      },
      practiceSet: [
        { prompt: "Antonym of 'Clandestine'?", answer: "Overt (open)" },
        { prompt: "Antonym of 'Enhance'?", answer: "Impair (weaken)" },
        { prompt: "Antonym of 'Insolvent'?", answer: "Affluent (wealthy)" },
        { prompt: "Antonym of 'Melancholy'?", answer: "Pleasant (cheerful)" },
      ],
      traps: [
        {
          title: "Picking a word that leans the same way",
          body: "For 'ameliorate' (make better), 'succour' (help) leans the same way and tempts. The question asks for the opposite: exacerbate (make worse).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssc2evomn-synonym",
      name: "Synonyms and a word's meaning in context",
      intuition:
        "A synonym is the word that could replace the given one without changing the sentence's sense. When the word is in a sentence, swap each option in and keep the one that leaves the meaning unchanged.",
      definition:
        "How to answer:\n" +
        "- **Swap test:** 'in vogue these days' becomes 'in fashion these days'; the sense holds.\n" +
        "- **Same strength:** erroneous (wrong) matches fallacious, not 'doubtful'.\n" +
        "- **Pairs inside a sentence:** when asked for two underlined words that mean the same, look for shared sense (threshold and dawn both mean a beginning).",
      table: {
        columns: ["Word", "Synonym or meaning", "Asked in"],
        rows: [
          { cells: ["Vogue", "Fashion", "2022"] },
          { cells: ["Fruition", "Accomplishment", "2022"] },
          { cells: ["Unacknowledged", "Unidentified", "2022"] },
          { cells: ["Advised (medicine)", "Prescribed", "2022"] },
          { cells: ["Threshold and dawn", "Both mean a beginning", "2022"] },
          { cells: ["Trivial", "Insignificant", "2023"] },
          { cells: ["Charisma", "Charm", "2024"] },
          { cells: ["Leisurely", "Without haste", "2024"] },
          { cells: ["Denotation of 'blue'", "A colour (its literal meaning)", "2024"] },
          { cells: ["Erroneous", "Fallacious", "2025"] },
        ],
      },
      pyqExampleId: "2628b070-da53-464c-8255-9f137b7a2b46",
      selfCheckExample: {
        prompt: "Choose the synonym of the underlined word: Short skirts were in vogue in the sixties. (a) Doubt (b) Fashion (c) Danger (d) Debate",
        steps: ["Swap each option into 'were in ___ in the sixties'.", "Only 'fashion' keeps the sense."],
        answer: "(b) Fashion",
      },
      practiceSet: [
        { prompt: "Synonym of 'Trivial'?", answer: "Insignificant" },
        { prompt: "Synonym of 'Charisma'?", answer: "Charm" },
        { prompt: "What does 'leisurely' mean in 'He walked leisurely'?", answer: "Without hurry" },
      ],
      traps: [
        {
          title: "Choosing the opposite by mistake",
          body: "For 'erroneous' (wrong), the options 'right' and 'accurate' are its opposites, placed as bait. Only fallacious keeps the meaning 'wrong'.",
        },
      ],
    },
  ],
};

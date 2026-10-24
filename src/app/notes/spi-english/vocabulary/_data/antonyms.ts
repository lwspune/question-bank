import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_VO_ANTONYMS_NOTE: SubtopicNote = {
  subtopicName: "Antonyms",
  title: "Antonyms",
  oneLineDefinition:
    "An antonym question asks for the option opposite in meaning to a word, and the usual wrong options are words that mean the same.",
  whyItMatters:
    "Fourteen questions in the bank ask for the opposite, one of them from the 2022 paper, and five are MODERATE. In the harder ones three options are synonyms of the word, so the fastest route is to strike those and keep the one that turns the meaning round.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spivoan-method",
      name: "Strike the synonyms, then match the strength",
      intuition:
        "An antonym list is built to catch you. One or two options mean the same as the word, one is unrelated, and one turns the meaning round. " +
        "Remove the look-the-same options first. Then, of what is left, pick the word that reverses the meaning by the same amount.",
      definition:
        "The method:\n" +
        "- Say the word's meaning in plain words.\n" +
        "- Strike every option that means the **same**. These are the commonest wrong answers.\n" +
        "- Strike words of a **different kind**: the opposite of an action word is an action word, and the opposite of a describing word is a describing word.\n" +
        "- Of what is left, choose the one that reverses the meaning at the **same strength**. The opposite of 'warm' is 'cool'; the opposite of 'hot' is 'cold'.",
      authoredExample: {
        prompt:
          "Choose the word opposite in meaning: The shop is \\(\\underline{\\text{seldom}}\\) open on Sundays. (a) never (b) rarely (c) frequently (d) hardly",
        steps: [
          "Seldom means not often, only a few times.",
          "Rarely and hardly mean nearly the same. Strike them.",
          "Never is stronger than seldom: it means not even once, so it does not reverse the meaning.",
          "Frequently means many times, the same distance on the other side.",
        ],
        answer: "(c) frequently",
      },
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning: He tried to \\(\\underline{\\text{conceal}}\\) his fear. (a) hide (b) reveal (c) feel (d) cover",
        steps: [
          "Conceal means to hide.",
          "Hide and cover mean the same. Strike them. Feel is unrelated.",
          "Reveal means to show what was hidden.",
        ],
        answer: "(b) reveal",
      },
      practiceSet: [
        { prompt: "Opposite of 'expand': (a) enlarge (b) contract (c) explain (d) extend", answer: "(b) contract" },
        { prompt: "Opposite of 'accept': (a) receive (b) reject (c) except (d) admit", answer: "(b) reject" },
        { prompt: "Give the opposite of 'victory'.", answer: "defeat" },
        { prompt: "Give the opposite of 'temporary'.", answer: "permanent" },
      ],
      pyqExampleId: "ae9a56aa-73a6-4960-8e95-62f9f9b36b10",
      traps: [
        {
          title: "Choosing the synonym by mistake",
          body:
            "When you are asked for the opposite, the word that 'feels right' is often the one that means the same. Say to yourself 'opposite' as you read each option.",
        },
        {
          title: "Too strong an opposite",
          body:
            "The opposite of 'seldom' is 'often' or 'frequently', not 'always'. Always and never are the two ends of the scale, and each is the other's opposite.",
        },
        {
          title: "Giving up is not losing",
          body:
            "To surrender or forsake something is to give it up by choice. To lose it is to stop having it. The opposite of gaining is losing, so read what kind of action the word names.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spivoan-everyday",
      name: "Everyday words and their opposites",
      intuition:
        "Some antonym questions use plain words a Class 10 student already knows. The mark is lost only by hurrying past a near synonym or a word from the same topic.",
      definition:
        "Two ways an opposite is made:\n" +
        "- A **different word**: clever and foolish, ancient and modern.\n" +
        "- A **prefix** that means not: **in-** (gratitude, ingratitude), **un-** (happy, unhappy), **dis-** (honest, dishonest).\n" +
        "- Check a prefix word before you trust it: **invaluable** means very valuable, not worthless.",
      table: {
        columns: ["Word", "Meaning", "Opposite"],
        rows: [
          { cells: ["misery", "great unhappiness", "contentment, happiness"] },
          { cells: ["clever", "quick to learn and understand", "foolish"] },
          { cells: ["ancient", "very old, from long ago", "modern"] },
          { cells: ["gratitude", "thankfulness", "ingratitude"] },
          { cells: ["scarcity", "a shortage", "plenty, abundance"] },
          { cells: ["ascend", "to go up", "descend"] },
          { cells: ["honest", "telling the truth", "dishonest"] },
          { cells: ["visible", "able to be seen", "invisible"] },
          { cells: ["permanent", "lasting for ever", "temporary"] },
        ],
        caption: "An opposite is the same kind of word: a noun for a noun, a describing word for a describing word.",
      },
      pyqExampleId: "62a73136-f8d2-4fa0-b8b3-f5232e36bec4",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning: The village faces a \\(\\underline{\\text{scarcity}}\\) of water every summer. (a) shortage (b) plenty (c) supply (d) lack",
        steps: [
          "Scarcity means a shortage.",
          "Shortage and lack mean the same. Strike them.",
          "Supply is the act of providing, not the opposite of a shortage.",
          "Plenty means more than enough.",
        ],
        answer: "(b) plenty",
      },
      practiceSet: [
        { prompt: "Give the opposite of 'ascend'.", answer: "descend" },
        { prompt: "Add a prefix to make the opposite of 'honest'.", answer: "dishonest" },
        {
          prompt: "Spot the wrong pair: clever and foolish; victory and defeat; permanent and lasting; ancient and modern.",
          answer: "permanent and lasting",
          method: "They mean the same. The opposite of permanent is temporary.",
        },
        { prompt: "Give the opposite of 'gratitude'.", answer: "ingratitude" },
      ],
      traps: [
        {
          title: "A prefix does not always mean not",
          body:
            "Invaluable means so valuable that no price is enough, and inflammable means easily set on fire. Learn these two, because they look like opposites and are not.",
        },
        {
          title: "A word from the same topic is not an opposite",
          body:
            "'Age' sits next to 'ancient' in meaning but does not reverse it. The opposite of a word about time must also be about time: ancient and modern.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spivoan-formal",
      name: "Harder words and their opposites",
      intuition:
        "The MODERATE antonym questions use formal words. Here the trick is plain: three options usually mean the same as the word, and only one means the reverse.",
      definition:
        "How to use this table:\n" +
        "- Learn the meaning first, then the opposite.\n" +
        "- In the question, find the three options that share a meaning. The **odd one out** is usually the key.\n" +
        "- Many of these come in families: **scrupulously**, **assiduously** and **painstakingly** all mean with great care.",
      table: {
        columns: ["Word", "Meaning", "Opposite"],
        rows: [
          { cells: ["fallible", "able to make mistakes", "perfect, infallible"] },
          { cells: ["vague", "not clear or definite", "precise"] },
          { cells: ["conscientiously", "carefully, with a sense of duty", "carelessly"] },
          { cells: ["incidental", "minor, coming along with the main thing", "essential"] },
          { cells: ["disdainful", "looking down on others", "respectful, reverential"] },
          { cells: ["vigilant", "watchful and alert", "oblivious, unaware"] },
          { cells: ["ratify", "to approve a treaty or law formally", "annul, cancel"] },
          { cells: ["frugal", "careful not to waste money", "extravagant"] },
          { cells: ["transparent", "clear enough to see through", "opaque"] },
        ],
        caption: "Synonym families to strike: frail, erring and mortal (like fallible); derisive, insolent and supercilious (like disdainful).",
      },
      pyqExampleId: "19d1b893-c11b-416d-94ea-0098dd2c038f",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning: My grandfather lives a \\(\\underline{\\text{frugal}}\\) life. (a) thrifty (b) simple (c) extravagant (d) careful",
        steps: [
          "Frugal means careful not to waste money.",
          "Thrifty and careful mean the same, and simple is close. Strike them.",
          "Extravagant means spending far too much.",
        ],
        answer: "(c) extravagant",
      },
      practiceSet: [
        { prompt: "Give the opposite of 'transparent'.", answer: "opaque" },
        {
          prompt: "Spot the wrong pair: vigilant and oblivious; fallible and perfect; incidental and essential; disdainful and scornful.",
          answer: "disdainful and scornful",
          method: "They mean the same. The opposite of disdainful is respectful.",
        },
        { prompt: "Which word means 'watchful and alert'?", answer: "vigilant" },
        { prompt: "Opposite of 'incidental': (a) minor (b) essential (c) secondary (d) accidental", answer: "(b) essential" },
      ],
      traps: [
        {
          title: "Three options agree, so the fourth wins",
          body:
            "When three options share one meaning, they are usually the word's synonyms, and none of them can be its opposite. Check the odd one out first.",
        },
        {
          title: "Fallible has nothing to do with falling",
          body:
            "Fallible means able to make mistakes, and infallible means never wrong. Do not read it as 'likely to fall' and pick a word like 'steady'.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_VO_SYNONYMS_NOTE: SubtopicNote = {
  subtopicName: "Synonyms",
  title: "Synonyms",
  oneLineDefinition:
    "A synonym question asks for the option nearest in meaning to a word, and the sentence around the word decides which of its meanings counts.",
  whyItMatters:
    "Nineteen questions in the bank ask for the nearest meaning, one of them from the 2022 paper, and six are MODERATE. Most of the lost marks come from a word with two meanings, where the option you know best is the wrong sense.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spivosy-sense",
      name: "Put the option back into the sentence",
      intuition:
        "Many English words have more than one meaning. The examiner often prints the commonest meaning as a wrong option and hides the right one behind it. " +
        "So never match the word alone. Read the sentence, decide what the word is doing there, and try each option in its place.",
      definition:
        "The method:\n" +
        "- Read the whole sentence and ask what the bold or underlined word is doing: describing a thing, naming a thing, or showing an action.\n" +
        "- Say its meaning **in this sentence** in plain words.\n" +
        "- Put each option in the word's place. The right one keeps the sentence's meaning; a wrong one changes it or makes it odd.\n" +
        "- A word from the same area is not enough. **Rank** and **eminence** are about position, so they cannot replace **dignity**, which is about worth.",
      authoredExample: {
        prompt:
          "Choose the word nearest in meaning: The speaker made a \\(\\underline{\\text{novel}}\\) suggestion at the meeting. (a) book (b) new (c) story (d) long",
        steps: [
          "Novel has two meanings: a long story in a book, and new or original.",
          "Here it describes the suggestion, so it is the second meaning.",
          "Try each option: 'a book suggestion' and 'a story suggestion' make no sense, and 'a long suggestion' changes the meaning.",
          "'A new suggestion' keeps it.",
        ],
        answer: "(b) new",
      },
      selfCheckExample: {
        prompt:
          "Choose the word nearest in meaning: The soldiers stood \\(\\underline{\\text{firm}}\\) against the attack. (a) company (b) business (c) steady (d) loud",
        steps: [
          "As a noun, firm means a company or a business. Here it describes how the soldiers stood.",
          "So it means not moving or giving way.",
          "'Stood steady against the attack' keeps the meaning.",
        ],
        answer: "(c) steady",
      },
      practiceSet: [
        {
          prompt: "Nearest meaning of 'grave' in 'He made a grave mistake': (a) tomb (b) serious (c) buried (d) quiet",
          answer: "(b) serious",
          method: "A grave as a noun is a tomb; as a describing word it means serious.",
        },
        {
          prompt: "Nearest meaning of 'sound' in 'My uncle gave me sound advice': (a) noise (b) loud (c) reliable (d) asleep",
          answer: "(c) reliable",
        },
        {
          prompt: "Nearest meaning of 'fair' in 'The umpire was fair to both teams': (a) pale (b) just (c) market (d) pretty",
          answer: "(b) just",
        },
        {
          prompt: "Nearest meaning of 'bear' in 'I cannot bear this noise': (a) animal (b) carry (c) tolerate (d) bare",
          answer: "(c) tolerate",
        },
      ],
      pyqExampleId: "0e9821e9-c632-4600-9b13-a4a2fe9ec413",
      traps: [
        {
          title: "The meaning you know best can be the wrong one",
          body:
            "'A mean trick' is an unkind trick; 'the mean of five numbers' is their average. Decide which meaning the sentence uses before you look at the options.",
        },
        {
          title: "Same area is not same meaning",
          body:
            "An option can belong to the right topic and still be wrong. 'Interruption' and 'interference' are both about getting in the way, but only one of them means stepping in to act.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spivosy-people",
      name: "Words about people and how they behave",
      intuition:
        "Many synonym words describe a person: how hard they work, how they treat others, or what is said about them. Most carry a clear charge, praising or blaming, so the charge alone often removes two options.",
      definition:
        "How to use this table:\n" +
        "- Learn each word with its **charge**: polite and amiable praise, atrocity and tarnish blame.\n" +
        "- An option with the opposite charge is never the synonym. **Rude** cannot mean **polite**.\n" +
        "- When the last option is **All of these**, check every other option. It is right only if each one fits.",
      table: {
        columns: ["Word", "Meaning", "Nearest word"],
        rows: [
          { cells: ["industrious", "hard-working", "diligent"] },
          { cells: ["polite", "having good manners", "well-mannered"] },
          { cells: ["amiable", "friendly and pleasant", "friendly, cheerful"] },
          { cells: ["eulogy", "a speech or writing in praise of someone", "praise"], noteAmber: "Not an elegy, which is a sad poem for the dead." },
          { cells: ["caution (verb)", "to tell someone about a danger", "warn"] },
          { cells: ["tarnish", "to spoil a good name or a shine", "taint, stain"] },
          { cells: ["atrocity", "an act of great cruelty", "brutality, cruelty"] },
          { cells: ["humble", "not proud of oneself", "modest"] },
          { cells: ["candid", "saying openly what one thinks", "frank"] },
          { cells: ["timid", "shy and easily frightened", "shy"] },
          { cells: ["generous", "happy to give to others", "giving, kind"] },
        ],
        caption: "Praising words: polite, amiable, industrious, humble, candid, generous. Blaming words: atrocity, tarnish.",
      },
      pyqExampleId: "4677b0da-b08f-43d4-8bb2-6b4f5aca4c72",
      selfCheckExample: {
        prompt:
          "Choose the word nearest in meaning: The old soldier was \\(\\underline{\\text{humble}}\\) about his medals. (a) proud (b) modest (c) loud (d) rich",
        steps: [
          "Humble means not proud of oneself.",
          "Proud is the opposite, and loud and rich are about other things.",
          "Modest keeps the meaning.",
        ],
        answer: "(b) modest",
      },
      practiceSet: [
        { prompt: "Nearest meaning of 'candid': (a) frank (b) sweet (c) hidden (d) bright", answer: "(a) frank" },
        { prompt: "Give one word nearest in meaning to 'timid'.", answer: "shy" },
        {
          prompt: "Spot the wrong pair: industrious = diligent; eulogy = praise; tarnish = polish; caution = warn.",
          answer: "tarnish = polish",
          method: "To tarnish is to spoil a shine or a good name, the opposite of polishing it.",
        },
        { prompt: "Nearest meaning of 'generous': (a) greedy (b) giving (c) general (d) gentle", answer: "(b) giving" },
      ],
      traps: [
        {
          title: "'All of these' needs every option",
          body:
            "If even one of the first three options does not mean the word, 'All of these' is wrong. Test each option on its own before you choose it.",
        },
        {
          title: "Eulogy is praise, not prayer",
          body:
            "A eulogy is spoken or written praise, often for someone who has died. Because it is given at a funeral, students pick 'prayer' or 'sorrow'. The word itself means good words: eu (good) + logy (speaking).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spivosy-things",
      name: "Words for size, change and understanding",
      intuition:
        "The other synonym words describe things rather than people: how big something is, whether it grows or shrinks, how dull or lively it is, and how easy it is to see or understand.",
      definition:
        "Three groups to learn:\n" +
        "- **Size and amount**: mammoth and enormous (huge), meagre (very small), abundant (more than enough), diminish (to become smaller).\n" +
        "- **Dull or lively**: monotonous (dull, the same all the time), frolic (lively play), vivid (bright and clear).\n" +
        "- **Seeing and understanding**: discern (to make out something hard to see), elusive (hard to catch or understand).",
      table: {
        columns: ["Word", "Meaning", "Nearest word"],
        rows: [
          { cells: ["mammoth", "very large", "huge"], noteAmber: "As a describing word it means huge, not the animal." },
          { cells: ["enormous", "very large", "huge"] },
          { cells: ["meagre", "very small in amount", "scanty"] },
          { cells: ["abundant", "more than enough", "plentiful"] },
          { cells: ["diminish", "to become or make smaller", "decrease"] },
          { cells: ["monotonous", "dull, with no change or variety", "dull, tedious"] },
          { cells: ["frolic", "lively, playful fun", "merriment"] },
          { cells: ["vivid", "bright and clear", "bright"] },
          { cells: ["discern", "to make out something hard to see", "detect"] },
          { cells: ["elusive", "hard to catch, hold or understand", "baffling"] },
        ],
        caption: "Most of these words come with a near opposite among the options: huge against small, dull against lively.",
      },
      pyqExampleId: "fb39136b-f8c7-49aa-9154-5bec7cbdcf9e",
      selfCheckExample: {
        prompt:
          "Choose the word nearest in meaning: The prize money for the race was \\(\\underline{\\text{meagre}}\\). (a) plentiful (b) scanty (c) secret (d) fair",
        steps: [
          "Meagre means very small in amount.",
          "Plentiful is the opposite, and secret and fair are about other things.",
          "Scanty means too little, which keeps the meaning.",
        ],
        answer: "(b) scanty",
      },
      practiceSet: [
        { prompt: "Nearest meaning of 'abundant': (a) plentiful (b) absent (c) rare (d) silent", answer: "(a) plentiful" },
        { prompt: "Give one word that means 'to become or make smaller'.", answer: "diminish (or decrease)" },
        { prompt: "Nearest meaning of 'vivid': (a) dull (b) bright (c) wide (d) vital", answer: "(b) bright" },
        { prompt: "Which word means 'to make out something that is hard to see'?", answer: "discern" },
      ],
      traps: [
        {
          title: "A look-alike is not a synonym",
          body:
            "Discern (to make out) is printed next to discard (to throw away), and elusive (hard to catch) next to illusive (not real). Read the letters, not the shape of the word.",
        },
        {
          title: "Frolic names the fun, not the feeling",
          body:
            "A frolic is lively, playful fun, so its nearest word is merriment. Happiness is a feeling, not an activity, so it is a weaker match.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PREP_WORD_CHOICE_NOTE: SubtopicNote = {
  subtopicName: "Connector Blanks: Word Choice and Collocation",
  title: "Choosing the right word for the blank",
  oneLineDefinition:
    "Some blanks need a word of the right form (noun, adjective or adverb); others need the word that English speakers habitually pair with the noun nearby: substantial progress, excruciating pain.",
  whyItMatters:
    "These items mix grammar and vocabulary. First the position of the blank rules out the wrong forms; then the pairing decides between words of similar meaning. " +
    "Distractors are often look-alike words (evade and invade, instil and install), so read each option letter by letter.",
  concepts: [
    // C1 — word form
    {
      kind: "formula" as const,
      slug: "cdsenprep-word-form",
      name: "Word form: noun, adjective or adverb",
      intuition:
        "The options are often one word in four forms: scene, scenery, scenic, scenically. You do not need the meaning to choose. You need the job of the blank: before a noun, it describes the noun; before an adjective, it describes the adjective; after 'the' or 'and the', it is a noun.",
      definition:
        "The terms:\n" +
        "- **Adjective**: describes a noun (a scenic place, a devastating flood). Common endings: -ic, -ing, -ous, -ful, -al.\n" +
        "- **Adverb**: describes a verb, an adjective or another adverb (extremely dense, visibly old). Most end in -ly.\n" +
        "- **Noun**: names a thing or an idea (proscription, beauty). Common endings: -tion, -ment, -ness, -ity.\n" +
        "The method:\n" +
        "- Look at the word right after the blank.\n" +
        "- A noun after the blank → an adjective is needed.\n" +
        "- An adjective after the blank → an adverb is needed.\n" +
        "- After a/the, or joined by and to another noun → a noun is needed, of the same type as its partner.\n" +
        "- Then choose by meaning among the options of the right form.\n" +
        "Words tested this way:\n" +
        "- a place of remarkably **scenic** beauty (2024 I); a **devastating** flood (2023 II)\n" +
        "- the prosecution and eventual **proscription** of the play (2023 II): proscription = official ban; prescription = a doctor's order\n" +
        "- an area of **extremely** dense population (2024 I); **visibly** dilapidated (2024 I)\n" +
        "- he **was broke** = he had no money (2021 I); broken is for things that are damaged",
      authoredExample: {
        prompt: "The exam was ______ difficult this year. (a) surprise (b) surprising (c) surprisingly (d) surprised",
        steps: [
          "The word after the blank is difficult, an adjective.",
          "A word that describes an adjective is an adverb.",
          "Only surprisingly is an adverb (-ly). Surprise is a noun or verb; surprising and surprised are adjectives.",
        ],
        answer: "(c) surprisingly.",
      },
      selfCheckExample: {
        prompt: "The ______ of the new bridge took two years. (a) construct (b) constructive (c) construction (d) constructively",
        steps: [
          "The word before the blank is the; after it comes 'of the new bridge'.",
          "After the, and followed by of, the blank must be a noun.",
          "Construction is the noun (-tion).",
        ],
        answer: "(c) construction.",
      },
      practiceSet: [
        { prompt: "She sings ______. (beautiful / beautifully)", answer: "beautifully", method: "describes the verb sings" },
        { prompt: "It was a ______ decision. (wise / wisely)", answer: "wise", method: "describes the noun decision" },
        { prompt: "His ______ surprised everyone. (honest / honesty)", answer: "honesty", method: "a noun as the subject" },
        { prompt: "The kitchen was ______ clean. (spotless / spotlessly)", answer: "spotlessly", method: "describes the adjective clean" },
      ],
      pyqExampleId: "91460a3e-549f-4181-90e6-a9f0711218d6",
      traps: [
        {
          title: "Two words before a noun can have two jobs",
          body:
            "In 'remarkably ___ beauty', remarkably is an adverb. It needs an adjective to describe, and the adjective describes beauty. So the blank is an adjective, even though an adverb sits before it.",
        },
        {
          title: "Keep a list parallel",
          body:
            "'the prosecution and eventual ___' joins the blank to a noun with and. The blank must be a noun too (proscription), not a gerund like proscribing.",
        },
        {
          title: "Prescription and proscription",
          body:
            "**prescription** = a doctor's written order, or a rule laid down. **proscription** = an official ban. One letter apart, opposite in spirit. A play banned by the government suffers proscription.",
        },
        {
          title: "Broke and broken",
          body:
            "A person who has lost all his money **is broke** (informal). A thing that is damaged **is broken**. 'He was broken' means his spirit was crushed, not that his wallet was empty.",
        },
      ],
    },

    // C2 — public-affairs words
    {
      kind: "reference" as const,
      slug: "cdsenprep-public-words",
      name: "Words for progress, difficulty, law and crime",
      intuition:
        "Newspaper English has its own pairs: we make **substantial** progress, face an **insurmountable** difficulty, and an act has a **purview**. When four adjectives all mean 'big', the noun beside the blank picks the one that belongs with it.",
      definition:
        "The method:\n" +
        "- Look at the noun next to the blank (progress, difficulty, capture, evidence).\n" +
        "- Ask which option English pairs with that noun.\n" +
        "- Strike look-alikes that mean something else (invade for evade, review for purview).\n" +
        "- Strike words that only repeat the sentence (rash and reckless mean the same).",
      table: {
        columns: ["Word", "Meaning", "Tested as", "Sitting"],
        rows: [
          { cells: ["**substantial**", "large and real", "make substantial progress", "2017 (II)"] },
          { cells: ["**insurmountable**", "too great to overcome", "faced almost insurmountable difficulty", "2024 (I)"] },
          { cells: ["**potential**", "possible, likely in future", "Every rash driver becomes a potential killer.", "2018 (I)"] },
          { cells: ["**offences**", "crimes", "offences against women", "2023 (II)"] },
          { cells: ["**purview**", "scope, range of authority", "come under the purview of this act", "2023 (II)"] },
          { cells: ["**evade**", "escape, avoid", "evade capture by the police", "2024 (I)"] },
          { cells: ["**evidence**", "proof", "seen as evidence of their literary interest", "2023 (II)"] },
        ],
        caption: "The noun next to the blank chooses its partner.",
      },
      pyqExampleId: "3f6ea998-8949-4fdd-b8d8-f3b8dc9c32f6",
      selfCheckExample: {
        prompt:
          "Which pairing is wrong? (a) substantial progress (b) insurmountable difficulty (c) invade capture (d) offences against women",
        steps: [
          "Substantial progress, insurmountable difficulty and offences against women are natural pairs.",
          "Invade means attack and enter. Escaping capture is evade.",
        ],
        answer: "(c): it should be evade capture.",
      },
      practiceSet: [
        { prompt: "A danger that could become real is a ______ danger.", answer: "potential" },
        { prompt: "We have made ______ progress: large and real. (substantial / infinite)", answer: "substantial" },
        { prompt: "Crimes committed ______ children. (against / for)", answer: "against" },
        { prompt: "A problem that cannot be overcome is ______.", answer: "insurmountable" },
      ],
      traps: [
        {
          title: "Evade or invade?",
          body:
            "**evade** = escape from, avoid (evade capture, evade tax). **invade** = enter by force (invade a country). One letter apart; the meaning is the reverse.",
        },
        {
          title: "Do not choose a word that repeats the sentence",
          body:
            "'Every rash driver becomes a ___ killer.' Reckless means the same as rash, so it adds nothing. The sentence needs a word about what he may become: **potential**.",
        },
        {
          title: "Sound-alike nouns ending in -ence",
          body:
            "**evidence** (proof), **insistence** (demanding firmly), **subsistence** (bare survival), **dependence** (relying on). Only evidence fits 'seen as ___ of their interest'.",
        },
      ],
    },

    // C3 — feeling, manner, lifestyle words
    {
      kind: "reference" as const,
      slug: "cdsenprep-feeling-words",
      name: "Words for feeling, manner and lifestyle",
      intuition:
        "These words describe people: how they feel, how they live, how they act. Many pairs are fixed: a **debt of gratitude**, an **opulent** lifestyle, to **instil** a feeling. Learn the word with its partner.",
      definition:
        "The method:\n" +
        "- Find the clue in the sentence (very angry, several sports cars, a maestro, freedom fighters).\n" +
        "- Choose the word whose meaning matches the clue and which pairs with the noun.\n" +
        "- Check its charge: praise for a maestro (silken), not blame (grating).",
      table: {
        columns: ["Word", "Meaning", "Tested as", "Sitting"],
        rows: [
          { cells: ["**mollify**", "calm an angry person", "no one can mollify him when he is angry", "2017 (II)"] },
          { cells: ["**gratitude**", "thankfulness", "a deep debt of gratitude to the freedom fighters", "2018 (I)"] },
          { cells: ["**silken**", "smooth and refined", "the silken touch of a maestro", "2022 (II)"] },
          { cells: ["**opulent**", "rich and luxurious", "owns several sports cars and has an opulent lifestyle", "2024 (II)"] },
          { cells: ["**excruciating**", "extremely painful", "suffered excruciating pain from a leg injury", "2024 (II)"] },
          { cells: ["**instil**", "slowly build a feeling or idea in someone", "continues to instil a sense of patriotism", "2023 (II)"] },
        ],
        caption: "Learn each word with the noun it travels with.",
      },
      pyqExampleId: "f3f5dbac-7042-4369-b02b-95525aee4785",
      selfCheckExample: {
        prompt:
          "Which pairing is wrong? (a) a debt of gratitude (b) an opulent lifestyle (c) install a sense of discipline (d) a silken touch",
        steps: [
          "A debt of gratitude, an opulent lifestyle and a silken touch are natural pairs.",
          "Install is for equipment or software. A feeling or a habit is instilled.",
        ],
        answer: "(c): it should be instil a sense of discipline.",
      },
      practiceSet: [
        { prompt: "To calm an angry person is to ______ him.", answer: "mollify", method: "also pacify, appease" },
        { prompt: "A very rich, luxurious lifestyle is an ______ lifestyle.", answer: "opulent" },
        { prompt: "We need a technician to ______ the new software. (instil / install)", answer: "install" },
        { prompt: "The smooth, gentle touch of an expert is a ______ touch.", answer: "silken" },
      ],
      traps: [
        {
          title: "Instil or install?",
          body:
            "**instil** a value, a habit, a sense of pride (slowly put it into a mind). **install** a machine, an app, an officer in a post. And after 'continues to', the base form is needed: instil, not installs.",
        },
        {
          title: "Look-alike words that start the same way",
          body:
            "**opulent** (rich), **occult** (magical, hidden), **ocular** (of the eye), **obscure** (unknown). The options share the first letters on purpose. Match the meaning to the clue (several sports cars).",
        },
        {
          title: "Check the charge of the word",
          body:
            "A maestro is praised, so the touch is **silken**, not **grating** (harsh) or **heavy**. If the sentence praises, a negative word cannot fit.",
        },
        {
          title: "Humour is not mollify",
          body:
            "**humour** someone = go along with their wishes to keep them happy. **mollify** = calm someone who is already angry. 'When he gets very angry, no one can ___ him' needs mollify.",
        },
      ],
    },
  ],
};

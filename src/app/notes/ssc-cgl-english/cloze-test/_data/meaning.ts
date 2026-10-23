import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_ECZ_MEANING_NOTE: SubtopicNote = {
  subtopicName: "Reading the Passage's Meaning",
  title: "Reading the Passage's Meaning",
  oneLineDefinition:
    "Blanks whose options are the same kind of word, so only the sense of the passage picks one: its direction, the words that turn it, and the phrases that explain the blank.",
  whyItMatters:
    "One hundred and fifty-five questions in the bank, 57 from the 2023 shifts, 65 from the 2024 shifts and 33 from the 2025 shifts, and 20 of the chapter's 22 HARD questions. The options here are usually the same part of speech, so grammar cannot choose; the passage around the blank does.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscczme-tone",
      name: "The direction of the passage",
      intuition:
        "Before reading the options, decide what kind of word the blank needs: a good thing or a bad thing, more or less, help or harm. The sentence and its neighbours almost always tell you, and two or three options usually point the wrong way.",
      definition:
        "1. Read the sentence with the blank, and the sentences before and after it.\n" +
        "2. Decide the direction: positive or negative, increase or decrease, help or harm.\n" +
        "3. Cross out the options that point the other way.\n" +
        "4. Choose among the rest by the exact sense of the sentence.\n" +
        "- **Lists:** a word in a list matches the others: a benefit among benefits, a threat among threats.\n" +
        "- **Topic:** the subject of the passage limits the choice: a long drought brings hunger, not floods.",
      authoredExample: {
        prompt:
          "Regular reading builds vocabulary and sharpens the mind. It is one of the most ___ habits a student can form. (a) harmful (b) useless (c) valuable (d) costly",
        steps: [
          "The sentence before praises reading, so the blank must be positive.",
          "Harmful, useless and costly are negative; valuable is positive.",
        ],
        answer: "(c) valuable",
      },
      selfCheckExample: {
        prompt:
          "Floods washed away roads and bridges, and thousands lost their homes. The damage was ___. (a) minor (b) severe (c) pleasant (d) welcome",
        steps: ["Roads washed away and homes lost: the blank must be negative and large.", "Only severe fits."],
        answer: "(b) severe",
      },
      practiceSet: [
        { prompt: "The blank sits in a list of threats to wildlife: hunting, pollution and ___. Is the missing word positive or negative?", answer: "Negative" },
        { prompt: "What should you decide before reading the options?", answer: "The direction the blank needs: positive or negative, more or less." },
        { prompt: "A word in a list of benefits must be of what kind?", answer: "Another benefit" },
        { prompt: "Two options are positive and two negative, and the passage is praising something. How many options are left?", answer: "Two: the positive ones" },
      ],
      pyqExampleId: "b7d0fb54-0e0a-4b5d-9ed1-b6178081e22c",
      traps: [
        {
          title: "Choosing a word because it looks difficult",
          body: "The hardest-looking option is no more likely to be right. Direction and sense decide, not how learned a word looks.",
        },
        {
          title: "Reading only the blank's own sentence",
          body: "The sentence before or after often settles the blank. Read one sentence on each side before you choose.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscczme-turn",
      name: "Words that turn or keep the sense",
      intuition:
        "But, yet, however, unfortunately and not ... but turn the sense, so the blank goes against what came before. And, also and moreover keep it, so the blank goes the same way. Find the signal word and you know the direction.",
      definition:
        "- **Turn:** but, yet, however, although, unfortunately, on the other hand, instead: the blank opposes what came before.\n" +
        "- **Keep:** and, also, moreover, not only ... but also, in fact: the blank continues in the same direction.\n" +
        "- **Not X but Y, not merely X but Y:** Y is the opposite of X, or a much stronger form of it.\n" +
        "- **Unfortunately, sadly:** what follows is bad news.",
      authoredExample: {
        prompt:
          "The old house looked dull from outside, yet inside it was ___. (a) gloomy (b) bright (c) dark (d) shabby",
        steps: [
          "\"Yet\" turns the sense: the inside is the opposite of dull.",
          "Gloomy, dark and shabby keep the dull sense; bright opposes it.",
        ],
        answer: "(b) bright",
      },
      selfCheckExample: {
        prompt:
          "Unfortunately, the only train left at midnight, so the journey was ___. (a) convenient (b) tiring (c) pleasant (d) short",
        steps: ["\"Unfortunately\" signals bad news.", "Of the options, only tiring is bad."],
        answer: "(b) tiring",
      },
      practiceSet: [
        { prompt: "After \"but\", does the blank continue or oppose the sense before it?", answer: "Oppose" },
        { prompt: "After \"moreover\", does the blank continue or oppose the sense?", answer: "Continue" },
        { prompt: "Complete the sense: Prices did not fall; instead, they ___.", answer: "rose" },
        { prompt: "What does \"unfortunately\" tell you about the news that follows?", answer: "That it is bad news." },
      ],
      pyqExampleId: "c2cbaa30-6cb8-4171-b5d5-919d76a127b0",
      traps: [
        {
          title: "Missing a turn in the middle of a sentence",
          body: "Yet and although can sit mid-sentence. Read the whole sentence: a turn after the comma changes what the blank must be.",
        },
        {
          title: "Treating 'not only ... but also' as a turn",
          body: "It adds a second point in the same direction. It does not oppose the first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscczme-gloss",
      name: "The passage explains the blank",
      intuition:
        "In dense passages, the words near the blank often explain it: a phrase after a dash or a colon, a word paired with it, or the next sentence naming the same idea again. Find that explanation and choose the option that means it.",
      definition:
        "- **After a dash or colon:** the phrase that follows often restates the blank in plainer words.\n" +
        "- **The next sentence:** it may name the same thing again (\"this method\", \"such measures\") or describe it.\n" +
        "- **Pairs and lists:** a word paired with the blank (cruel and ___) has the same force.\n" +
        "- **Echoes:** a word used earlier in the passage may come back in the blank.\n" +
        "- **The 2025 passages** are academic writing with rare words; match the explanation, not how a word looks.",
      authoredExample: {
        prompt:
          "The new policy was an empty ___: it promised much, changed little, and was soon forgotten. (a) triumph (b) gesture (c) revolution (d) mandate",
        steps: [
          "The words after the colon explain the blank: something that promised much and changed little.",
          "A triumph and a revolution change a great deal, and a mandate is an order; an empty gesture promises without doing.",
        ],
        answer: "(b) gesture",
      },
      selfCheckExample: {
        prompt:
          "The village is famous for its ___: pottery, weaving and wood carving draw visitors from far away. (a) crafts (b) crops (c) festivals (d) rivers",
        steps: ["The colon lists pottery, weaving and wood carving.", "All three are crafts."],
        answer: "(a) crafts",
      },
      practiceSet: [
        { prompt: "Where should you look first for the meaning of a hard blank?", answer: "Just after it: after a dash or colon, or in the next sentence." },
        { prompt: "The blank is paired with \"cruel\". What force must the missing word have?", answer: "The same: harsh or cruel" },
        { prompt: "The next sentence calls the blank \"this method\". What must the blank name?", answer: "A method, a way of doing something" },
        { prompt: "A blank is followed by \": a sudden, complete stop\". Which fits better, halt or delay?", answer: "Halt" },
      ],
      pyqExampleId: "0196ce79-ced8-440b-85f0-c570515bd96d",
      traps: [
        {
          title: "Choosing the grandest word",
          body: "In the 2025 passages several options are rare words. The one that matches the explanation wins, not the most academic-sounding one.",
        },
        {
          title: "Stopping at the blank's sentence",
          body: "The explanation is often after the blank, in the same sentence or the next one. Keep reading before you decide.",
        },
      ],
    },
  ],
};

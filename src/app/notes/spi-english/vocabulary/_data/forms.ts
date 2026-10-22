import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_VO_FORMS_NOTE: SubtopicNote = {
  subtopicName: "Spelling and One-Word Substitutes",
  title: "Spelling and One-Word Substitutes",
  oneLineDefinition:
    "These questions test the form of a word: how it is spelt, which single word replaces a phrase, and which pairs of words English always uses together.",
  whyItMatters:
    "Ten questions in the bank: five ask you to spot the misspelt word, four ask for one word that replaces a phrase, and one asks which pair of words does not belong together. Nine are EASY, so these are marks to collect quickly once the patterns are learnt.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spivosp-spelling",
      name: "Spelling patterns that trip students",
      intuition:
        "A spot-the-wrong-spelling question prints three correct words and one with a small slip: two letters swapped, a letter added or a vowel changed. A few patterns explain almost every slip.",
      definition:
        "Patterns to learn:\n" +
        "- **i before e, except after c**: achieve, believe, field; but receive, deceive, ceiling.\n" +
        "- **Drop the silent e** of the base word before some endings: wise and wisdom, true and truly, argue and argument.\n" +
        "- **Keep the base word whole** when adding an ending: avoid + able = avoidable.\n" +
        "- Some endings are just learnt: **tendency**, **dependency**, **governance**.",
      table: {
        columns: ["Pattern", "Correct", "Common misspelling"],
        rows: [
          { cells: ["i before e", "achieve, believe, field", "acheive, beleive"] },
          { cells: ["e before i after c", "receive, deceive, ceiling", "recieve, cieling"] },
          { cells: ["Drop the silent e", "wisdom, truly, argument", "wisedom, truely, arguement"] },
          { cells: ["Keep the base word", "avoidable, enjoyable", "aviodable, enjoiable"] },
          { cells: ["Learn the ending", "tendency, dependency", "tendancy, dependancy"] },
          { cells: ["Double c, single s", "occasion", "occassion, ocasion"] },
        ],
        caption: "Say the word in syllables and check each one: oc-ca-sion.",
      },
      pyqExampleId: "487812e4-c598-4a68-801f-14aae1527530",
      selfCheckExample: {
        prompt: "Choose the wrongly spelt word: (a) believe (b) recieve (c) ceiling (d) field",
        steps: [
          "Believe and field: i before e, correct.",
          "Ceiling: e before i after c, correct.",
          "Receive has c, so it must be ei. Recieve is wrong.",
        ],
        answer: "(b) recieve",
      },
      practiceSet: [
        { prompt: "Which is correct: 'argument' or 'arguement'?", answer: "argument", method: "The e of argue is dropped." },
        { prompt: "Which is correct: 'truly' or 'truely'?", answer: "truly" },
        { prompt: "Which is correct: 'dependency' or 'dependancy'?", answer: "dependency" },
        { prompt: "Choose the wrongly spelt word: (a) deceive (b) chief (c) cieling (d) field", answer: "(c) cieling", method: "After c the order is ei: ceiling." },
      ],
      traps: [
        {
          title: "The ie rule has exceptions",
          body:
            "Weird, seize and their have ei with no c before them. Learn these as exceptions, so you do not mark a correct spelling as wrong.",
        },
        {
          title: "A swapped pair of letters is easy to miss",
          body:
            "Writing 'aviod' for 'avoid' keeps every letter but swaps two of them. Read each option letter by letter, not by its shape.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spivosp-oneword",
      name: "One word for a phrase",
      intuition:
        "A one-word substitute question gives a phrase such as 'which cannot be seen' and asks for the single word that means it. The options are usually look-alikes that all start with in-, so the root of the word decides.",
      definition:
        "Two parts build most of these words:\n" +
        "- A **prefix**: **in-**, **il-** and **ir-** mean not; **pre-** means before.\n" +
        "- A **root**: **aud** (hear), **vis** (see), **sol** (loosen or solve), **leg** (read), **cred** (believe), **dict** (say).\n" +
        "- The ending **-ible** or **-able** means can be. So in + aud + ible is 'cannot be heard'.",
      table: {
        columns: ["Phrase", "One word"],
        rows: [
          { cells: ["which cannot be solved", "insoluble"] },
          { cells: ["which cannot be heard", "inaudible"] },
          { cells: ["which cannot be seen", "invisible"] },
          { cells: ["which cannot be divided", "indivisible"] },
          { cells: ["which cannot be read (handwriting)", "illegible"] },
          { cells: ["which cannot be believed", "incredible"] },
          { cells: ["which cannot be cured", "incurable"] },
          { cells: ["not qualified for something", "ineligible"] },
          { cells: ["to say beforehand what will happen", "predict"] },
          { cells: ["to bring into being, to produce", "generate"] },
        ],
        caption: "Match the root to the sense: hearing is aud, seeing is vis, reading is leg.",
      },
      pyqExampleId: "3369f9f2-ff1c-423a-9fb7-66f457198180",
      selfCheckExample: {
        prompt: "One word for 'handwriting that cannot be read': (a) illegible (b) ineligible (c) invisible (d) incurable",
        steps: [
          "Reading is the root leg.",
          "il + leg + ible: cannot be read.",
          "Ineligible means not qualified, which only looks alike.",
        ],
        answer: "(a) illegible",
      },
      practiceSet: [
        { prompt: "One word for 'a disease which cannot be cured'.", answer: "incurable" },
        { prompt: "One word for 'which cannot be divided'.", answer: "indivisible" },
        { prompt: "What does 'ineligible' mean? (a) not qualified (b) cannot be read (c) cannot be seen (d) cannot be heard", answer: "(a) not qualified" },
        { prompt: "One word for 'a story so strange that it cannot be believed'.", answer: "incredible" },
      ],
      traps: [
        {
          title: "Illegible is not ineligible",
          body:
            "Illegible (cannot be read) and ineligible (not qualified) differ by only a few letters. The root leg means read; the root elig means choose.",
        },
        {
          title: "Insoluble is not insolvent",
          body:
            "Insoluble means cannot be solved, or cannot be dissolved. Insolvent means unable to pay one's debts, a word about money.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spivosp-pairs",
      name: "Fixed word pairs",
      intuition:
        "English has pairs of words that always travel together, joined by 'and', in a fixed order. A question may ask which pair is not one of them.",
      definition:
        "What makes a fixed pair:\n" +
        "- The two words are joined by **and** and used together as one idea: safe and sound means unharmed.\n" +
        "- The **order is fixed**: we say bread and butter, never butter and bread.\n" +
        "- Two words that only **rhyme** are not a pair unless English uses them together.",
      table: {
        columns: ["Pair", "Meaning or use"],
        rows: [
          { cells: ["sweet and sour", "a taste that is both at once"] },
          { cells: ["this and that", "various small things"] },
          { cells: ["Adam and Eve", "the first man and woman in the Bible story"] },
          { cells: ["safe and sound", "unharmed"] },
          { cells: ["ups and downs", "good times and bad times"] },
          { cells: ["pros and cons", "the points for and against"] },
          { cells: ["bread and butter", "a person's main way of earning a living"] },
          { cells: ["now and then", "sometimes, not often"] },
        ],
      },
      pyqExampleId: "de4bcec3-3148-4011-a732-edbe4b487842",
      selfCheckExample: {
        prompt: "Complete the pair: Despite the storm, the children came home safe and ____.",
        steps: ["The fixed pair is 'safe and sound', meaning unharmed."],
        answer: "sound",
      },
      practiceSet: [
        { prompt: "What does 'pros and cons' mean?", answer: "the points for and against" },
        { prompt: "Complete the pair: Every life has its ups and ____.", answer: "downs" },
        { prompt: "Complete the pair: We visit our cousins now and ____.", answer: "then" },
        { prompt: "What does 'bread and butter' mean when we say 'Teaching is his bread and butter'?", answer: "his main way of earning a living" },
      ],
      traps: [
        {
          title: "Rhyme is not a pair",
          body:
            "Two words can rhyme and still mean nothing together. A fixed pair carries one idea, such as safe and sound (unharmed).",
        },
        {
          title: "Do not swap the order",
          body:
            "A fixed pair keeps its order: ups and downs, pros and cons, bread and butter. 'Downs and ups' sounds wrong to an English ear.",
        },
      ],
    },
  ],
};

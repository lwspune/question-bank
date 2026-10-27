import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_EVO_SPELLING_NOTE: SubtopicNote = {
  subtopicName: "Spelling",
  title: "Spelling",
  oneLineDefinition:
    "Spotting the misspelt word, or choosing the correct spelling, by checking doubled letters, word endings, and vowels, silent letters and ie or ei.",
  whyItMatters:
    "Two hundred and twenty-two questions in the bank, 75 from the 2023 shifts, 72 from the 2024 shifts and 75 from the 2025 shifts, and 191 of them EASY. The 2023 and 2024 shifts mostly ask you to find the one misspelt word among four; the 2025 shifts more often give four spellings of one word and ask for the correct one.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscevosp-double",
      name: "Doubled and single letters",
      intuition:
        "The commonest trap is a letter doubled where it should be single (allimony) or single where it should be doubled (submisive). A word built from parts often keeps a double letter where the parts meet: ac + commodate, oc + currence.",
      definition:
        "The groups:\n" +
        "- **Double where many go wrong:** accommodate (cc and mm), occurrence (cc and rr), harassment (one r, double s), necessary (one c, double s), embarrass (rr and ss), committee (mm, tt, ee).\n" +
        "- **Single where many double:** alimony, almost, robust, patron, remission (one m).\n" +
        "- **Adding an ending:** a stressed final consonant doubles (begin, beginning; occur, occurrence); an unstressed one does not (benefit, benefited).",
      table: {
        columns: ["Misspelling", "Correct", "Asked in"],
        rows: [
          { cells: ["Occurence", "Occurrence", "2024 (twice)"] },
          { cells: ["Allimony", "Alimony", "2023"] },
          { cells: ["Submisive", "Submissive", "2023"] },
          { cells: ["Remmission", "Remission", "2023"] },
          { cells: ["Harrasment", "Harassment", "2023"] },
          { cells: ["Aggreement", "Agreement", "2023"] },
          { cells: ["Allmost", "Almost", "2023"] },
          { cells: ["Neccessary", "Necessary", "2024"] },
          { cells: ["Beggining", "Beginning", "2024"] },
          { cells: ["Eficient", "Efficient", "2024"] },
          { cells: ["Atempt", "Attempt", "2024"] },
          { cells: ["Occassionally", "Occasionally", "2025"] },
        ],
      },
      pyqExampleId: "7b71a9b3-8baa-4a0c-a4fe-0e9c4d16ecfd",
      selfCheckExample: {
        prompt: "Select the INCORRECTLY spelt word. (a) Committee (b) Embarass (c) Necessary (d) Accommodate",
        steps: ["Embarrass has a double r and a double s.", "\"Embarass\" has only one r."],
        answer: "(b) Embarass",
      },
      practiceSet: [
        { prompt: "How many r's and s's in harassment?", answer: "One r, two s's" },
        { prompt: "Spell the word: a-c-c-o-m-?-o-d-a-t-e (one m or two?)", answer: "Two: accommodate" },
        { prompt: "Which is right: begining or beginning?", answer: "Beginning" },
        { prompt: "Which is right: occasionally or occassionally?", answer: "Occasionally" },
      ],
      traps: [
        {
          title: "Doubling every consonant that sounds strong",
          body: "Harassment has one r, and necessary one c. Learn these words as they are written, not as they sound.",
        },
        {
          title: "Missing a double in a long word",
          body: "In a four-option question, a long word such as accommodate or occurrence is the most likely to hide a missing letter. Check it letter by letter.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscevosp-ending",
      name: "Endings: -able or -ible, -ance or -ence, -cede or -ceed",
      intuition:
        "Many errors sit in the ending, where two spellings sound the same: acceptable and tangible, preference and acquaintance, precede and proceed. A related word often shows the right vowel: accept takes -able, prefer gives preference.",
      definition:
        "The groups:\n" +
        "- **-able and -ible:** acceptable, indispensable, but tangible, flexible.\n" +
        "- **-ance and -ence:** maintenance, acquaintance, but preference, quintessence.\n" +
        "- **-cede, -ceed, -sede:** precede, but proceed and succeed; supersede is the only -sede word.\n" +
        "- **-ous and -ious:** mischievous (no i before -ous), conscientious.\n" +
        "- **-cient:** sufficient, efficient.",
      table: {
        columns: ["Misspelling", "Correct", "Asked in"],
        rows: [
          { cells: ["Mischievious", "Mischievous", "2024 (twice)"] },
          { cells: ["Consciencious", "Conscientious", "2024, 2025"] },
          { cells: ["Acceptible", "Acceptable", "2023"] },
          { cells: ["Prefferance", "Preference", "2023"] },
          { cells: ["Sufficeint", "Sufficient", "2023"] },
          { cells: ["Preceed", "Precede", "2024"] },
          { cells: ["Tangiable", "Tangible", "2024"] },
          { cells: ["Removel", "Removal", "2024"] },
          { cells: ["Indispensible", "Indispensable", "2025"] },
          { cells: ["Quintessance", "Quintessence", "2025"] },
        ],
      },
      pyqExampleId: "59de7a17-819d-4164-974f-f103ffd2a1dd",
      selfCheckExample: {
        prompt: "Select the correctly spelt word. (a) Mischievious (b) Mischevous (c) Mischievous (d) Mischeivous",
        steps: ["The word is mischief + -ous.", "There is no i before -ous: mischievous."],
        answer: "(c) Mischievous",
      },
      practiceSet: [
        { prompt: "-able or -ible: indispens___", answer: "-able: indispensable" },
        { prompt: "-cede or -ceed: pre___", answer: "-cede: precede" },
        { prompt: "-ance or -ence: prefer___", answer: "-ence: preference" },
        { prompt: "Which is the only English word ending in -sede?", answer: "Supersede" },
      ],
      traps: [
        {
          title: "Adding an extra i",
          body: "Mischievous and grievous have no i before -ous. \"Mischievious\" was printed as the wrong spelling twice.",
        },
        {
          title: "Precede and proceed",
          body: "Precede (come before) ends in -cede; proceed (go on) ends in -ceed. They are spelt differently though they sound alike.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscevosp-letters",
      name: "Vowels, silent letters and ie or ei",
      intuition:
        "The rest of the errors swap or drop a letter the ear does not catch: a vowel (calender for calendar), a silent letter (charishma), c for s (conspirasy), or ie and ei (recieve). Say the word slowly in parts and picture it written.",
      definition:
        "The groups:\n" +
        "- **ie and ei:** i before e (believe, achieve) except after c (receive, receipt, conceive) and in some exceptions (seize, weird).\n" +
        "- **c or s:** conspiracy, vicious, avarice, cowardice.\n" +
        "- **Vowels you do not hear clearly:** calendar, stationery (paper and pens), restaurant, relevant, convenient, pronunciation (not pronounciation).\n" +
        "- **Swapped letters:** approach (not appraoch), gauge (not guage).\n" +
        "- **Silent or extra letters:** charisma (no h after s), privilege (no d), souvenir.",
      table: {
        columns: ["Misspelling", "Correct", "Asked in"],
        rows: [
          { cells: ["Recieve, recieved", "Receive, received", "2024 (three times)"] },
          { cells: ["Reciept", "Receipt", "2023"] },
          { cells: ["Sieze", "Seize", "2023"] },
          { cells: ["Wierd", "Weird", "2023"] },
          { cells: ["Concieve", "Conceive", "2023"] },
          { cells: ["Calender", "Calendar", "2023"] },
          { cells: ["Stetionery", "Stationery", "2023"] },
          { cells: ["Pronounciation", "Pronunciation", "2023"] },
          { cells: ["Guage", "Gauge", "2023"] },
          { cells: ["Conspirasy", "Conspiracy", "2023"] },
          { cells: ["Resturant", "Restaurant", "2024"] },
          { cells: ["Convinient", "Convenient", "2024"] },
          { cells: ["Priviledge", "Privilege", "2025"] },
          { cells: ["Onomatopiea", "Onomatopoeia", "2025"] },
        ],
      },
      pyqExampleId: "0e41fe17-21c4-494c-a87f-0b9401f3897b",
      selfCheckExample: {
        prompt: "Select the INCORRECTLY spelt word. (a) Receipt (b) Believe (c) Recieve (d) Achieve",
        steps: ["After c, the order is ei: receive, receipt.", "\"Recieve\" breaks the rule."],
        answer: "(c) Recieve",
      },
      practiceSet: [
        { prompt: "ie or ei: rec___ve", answer: "ei: receive" },
        { prompt: "Which is right: calender or calendar (a chart of dates)?", answer: "Calendar" },
        { prompt: "Which spelling means writing paper and pens: stationary or stationery?", answer: "Stationery" },
        { prompt: "Which is right: pronounciation or pronunciation?", answer: "Pronunciation" },
      ],
      traps: [
        {
          title: "Applying i before e to every word",
          body: "Seize and weird break the rule, and SSC printed both wrongly as sieze and wierd. Learn the exceptions with the rule.",
        },
        {
          title: "Spelling pronunciation like pronounce",
          body: "Pronounce keeps its o-u, but pronunciation drops it: p-r-o-n-u-n.",
        },
      ],
    },
  ],
};

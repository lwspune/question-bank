import type { SubtopicNote } from "@/app/notes/_types";

/** An underlined sentence part, written the way the paper prints it. */
const u = (s: string): string => `\\(\\underline{\\text{${s}}}\\)`;
/** A three-part spotting-errors item with option (d) No error. */
const item = (a: string, b: string, c: string): string =>
  `Find the part with the error. (a) ${u(a)} (b) ${u(b)} (c) ${u(c)} (d) No error`;

export const SPI_SE_VERBS_NOTE: SubtopicNote = {
  subtopicName: "Agreement and Verb Forms",
  title: "Agreement and Verb Forms",
  oneLineDefinition:
    "The first check on any sentence is its verb: it must agree with its subject, it must be a full verb, and after some words it must take a fixed form.",
  whyItMatters:
    "Nine questions in the bank turn on the verb, two of them from the 2022 paper. Five are EASY and four MODERATE. The verb is the commonest place for an error, so check it first in every sentence.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiseve-agreement",
      name: "The verb agrees with its subject",
      intuition:
        "Every verb has a subject: the person or thing that does it. A singular subject (one person or thing) takes a singular verb, and a plural subject takes a plural verb. " +
        "In the present tense the singular verb usually ends in -s: she runs, he has, it is. The plural one does not: they run, they have, they are.",
      definition:
        "How to check agreement:\n" +
        "- Find the verb, then ask **who or what** does it. That word is the subject.\n" +
        "- Ignore words that sit between the subject and its verb. In 'The colour of the walls is pale', the subject is **colour**, not walls.\n" +
        "- An **-ing word** naming one activity (swimming, cycling) is singular.\n" +
        "- With **as well as**, **along with** or **together with**, the verb follows the **first** subject.\n" +
        "- **Each**, **every**, **everyone** and **one of** take a singular verb.",
      table: {
        columns: ["Subject", "Verb form", "Correct example"],
        rows: [
          { cells: ["he, she, it, or one name", "singular: adds -s (believes, has, is)", "My sister speaks three languages."] },
          { cells: ["a plural (many people, the boys, they)", "plural: no -s (want, have, are)", "The boys want a new ball."] },
          { cells: ["an -ing word for one activity", "singular", "Swimming keeps you fit."] },
          {
            cells: ["A as well as B, A along with B", "agrees with A", "The captain, along with his players, was praised."],
            noteAmber: "The words after 'as well as' do not change the verb.",
          },
          { cells: ["each, every, everyone, one of the", "singular", "Each of the girls has a bag."] },
        ],
        caption: "Find the true subject first. The noun just before the verb is often a trap.",
      },
      pyqExampleId: "f27bc586-1ff8-442e-8621-797beb0a08bb",
      selfCheckExample: {
        prompt: item("The price of these shoes", "are too high", "for me."),
        steps: [
          "The verb is 'are'. Ask what is too high: the price, not the shoes.",
          "Price is singular, so the verb must be 'is'.",
          "The correct sentence: The price of these shoes is too high for me.",
        ],
        answer: "(b) are too high",
      },
      practiceSet: [
        { prompt: "Correct the verb: 'Each of the players have a new bat.'", answer: "Each of the players has a new bat." },
        {
          prompt: "Correct the verb: 'Reading novels help me relax.'",
          answer: "Reading novels helps me relax.",
          method: "The subject is the activity 'reading', which is singular.",
        },
        { prompt: "Choose the verb: 'The teacher, as well as her pupils, (was / were) late.'", answer: "was" },
        { prompt: "Correct the verb: 'My uncle drive a bus in Pune.'", answer: "My uncle drives a bus in Pune." },
      ],
      traps: [
        {
          title: "The nearest noun is not always the subject",
          body:
            "In 'The box of pencils is on the table', the noun next to the verb is 'pencils', but the box is on the table. Ask who or what does the verb before you decide singular or plural.",
        },
        {
          title: "An activity is one thing",
          body:
            "A subject like 'Playing video games' looks plural because of 'games', but it names one activity. It takes a singular verb: 'Playing video games wastes time.'",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiseve-full-verb",
      name: "Every clause needs a full verb, and a passive needs be",
      intuition:
        "A clause is a group of words with a subject and a verb. If the verb part is missing a word, the clause does not say anything. " +
        "Watch 'had' and 'was' most of all: they are helpers, and a helper alone often cannot say where someone was or what was done.",
      definition:
        "Two checks:\n" +
        "- **Is there a full verb?** 'The guests were in the hall' works. 'The guests had in the hall' does not: 'had' needs a third form after it (had gone, had been).\n" +
        "- **Did the subject do the action?** If not, the verb must be **passive**: a form of **be** plus the third form of the verb. 'The wall was painted', 'The road had been repaired'.\n" +
        "- Passive forms: is made, was made, has been made, had been made, will be made.\n" +
        "- Test: ask 'who did it?'. If the answer is someone other than the subject, the passive is needed.",
      authoredExample: {
        prompt: item("The new bridge", "had opened by the minister", "last March."),
        steps: [
          "Ask who did the opening. The minister did; the bridge did not open anything.",
          "So the verb must be passive: be plus the third form.",
          "'Last March' is a finished past time, so the simple past passive fits: 'was opened'.",
          "The correct sentence: The new bridge was opened by the minister last March.",
        ],
        answer: "(b) had opened by the minister",
      },
      selfCheckExample: {
        prompt: item("The letters", "were post", "this morning."),
        steps: [
          "The letters did not post anything; someone posted them. So the verb is passive.",
          "A passive needs the third form: 'posted', not 'post'.",
          "The correct sentence: The letters were posted this morning.",
        ],
        answer: "(b) were post",
      },
      practiceSet: [
        { prompt: "Correct the sentence: 'The match was cancel because of rain.'", answer: "The match was cancelled because of rain." },
        {
          prompt: "Correct the sentence: 'The walls had painted before the party.'",
          answer: "The walls had been painted before the party.",
          method: "Walls cannot paint, so the passive 'had been painted' is needed.",
        },
        { prompt: "Correct the sentence: 'The students not in the class when the bell rang.'", answer: "The students were not in the class when the bell rang." },
        { prompt: "Choose: 'This cake (baked / was baked) by my mother.'", answer: "was baked" },
      ],
      pyqExampleId: "cab10308-5774-4aeb-9bb0-4e04cd4a3a9a",
      traps: [
        {
          title: "'Had' alone is not a full verb here",
          body:
            "'Had' as a helper must be followed by a third form: had gone, had been. 'They had not at home' is wrong; say 'They were not at home' or 'They had not been at home'.",
        },
        {
          title: "A thing that is acted on needs 'been'",
          body:
            "'The shops had opened' is fine, because shops can open. 'The tents had put up' is wrong, because tents are put up by someone: 'The tents had been put up'.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiseve-to-ing",
      name: "The form after a word: to, -ing or the third form",
      intuition:
        "Some words decide the form of the verb that follows them. After 'decide' you need 'to' and the verb. After 'enjoy' you need the -ing form. These pairs are fixed and must be learnt. " +
        "The third form of a verb (broken, written) can also describe a noun, and then it shows that something was done to it.",
      definition:
        "Learn these groups:\n" +
        "- **to + verb** after refuse, agree, decide, hope, want, plan, promise.\n" +
        "- **-ing** after enjoy, finish, avoid, mind, keep, and after a phrase that ends in the preposition **to**: look forward to, be used to, object to.\n" +
        "- **Plain verb, no to** after can, could, must, should, will, would, may.\n" +
        "- **Third form as a describing word**: a broken cup, a trusted friend, a lost child. The cup was broken; it did not break anything.",
      table: {
        columns: ["After this word", "Use", "Correct example"],
        rows: [
          { cells: ["refuse, agree, decide, hope, want", "to + verb", "She agreed to help us."] },
          { cells: ["enjoy, finish, avoid, mind, keep", "-ing", "He enjoys swimming."] },
          {
            cells: ["look forward to, be used to, object to", "-ing", "I am used to waking early."],
            noteAmber: "Here 'to' is a preposition, so the verb after it takes -ing.",
          },
          { cells: ["can, must, should, will, may", "plain verb, no to", "You must sit down."] },
          { cells: ["a noun the action is done to", "third form before the noun", "a broken window, a trusted friend"] },
        ],
        caption: "If you are not sure, say the pair aloud: 'decided joining' and 'must to go' sound wrong because they are.",
      },
      pyqExampleId: "97eee46e-34d1-4109-bd1d-d9a5ef38b53e",
      selfCheckExample: {
        prompt: item("The boys enjoy", "to play football", "after school."),
        steps: [
          "'Enjoy' is followed by the -ing form, not by 'to'.",
          "The correct sentence: The boys enjoy playing football after school.",
        ],
        answer: "(b) to play football",
      },
      practiceSet: [
        { prompt: "Correct the sentence: 'She decided joining the army.'", answer: "She decided to join the army." },
        {
          prompt: "Correct the sentence: 'He is used to get up at five.'",
          answer: "He is used to getting up at five.",
          method: "In 'be used to', the word 'to' is a preposition, so -ing follows.",
        },
        { prompt: "Correct the sentence: 'We found a break chair in the store room.'", answer: "We found a broken chair in the store room." },
        { prompt: "Correct the sentence: 'You must to finish your homework.'", answer: "You must finish your homework." },
      ],
      traps: [
        {
          title: "Not every 'to' is followed by a plain verb",
          body:
            "In 'look forward to', 'be used to' and 'object to', the 'to' is a preposition. A preposition takes the -ing form: 'I object to waiting', not 'I object to wait'.",
        },
        {
          title: "Something done to a noun takes the third form",
          body:
            "A window that someone broke is 'a broken window', not 'a break window'. When the noun had the action done to it, use the third form (broken, written, stolen) before it.",
        },
      ],
    },
  ],
};

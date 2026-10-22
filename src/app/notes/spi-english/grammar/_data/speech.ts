import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_GR_SPEECH_NOTE: SubtopicNote = {
  subtopicName: "Reported Statements",
  title: "Reported Speech: Statements",
  oneLineDefinition:
    "Reported (indirect) speech gives what someone said in your own words: after a past reporting verb the tense moves one step back, and the pronouns and time words change to fit the new speaker.",
  whyItMatters:
    "Eleven questions in the bank, 6 MODERATE and 5 EASY, and five of them run the other way, from reported speech back to the speaker's own words. Three changes decide every one: the tense, the pronouns and the words for time and place.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spigrsp-tense-shift",
      name: "The backshift: each tense moves one step into the past",
      intuition:
        "By the time you report the words, they were said in the past. So when the reporting verb is past (said, told), every verb inside moves one step further back.",
      definition:
        "- With a **past** reporting verb (said, told, shouted), the reported verb moves one step back (see the table).\n" +
        "- With a **present** reporting verb (says, tells), nothing changes: 'She says she is tired.'\n" +
        "- **No change** for a universal truth ('the earth is round'), for an unreal condition ('if I had the money I would buy it') and for **used to**.\n" +
        "- Join the reported words with **that** after said or told.\n" +
        "- **Said to + a person** usually becomes **told + the person**: 'He said to me' becomes 'He told me'.",
      table: {
        columns: ["Direct speech", "Reported speech"],
        rows: [
          { cells: ["am, is", "was"] },
          { cells: ["are", "were"] },
          { cells: ["do, does (simple present)", "did (simple past)"] },
          { cells: ["is going, are going", "was going, were going"] },
          { cells: ["has, have + past participle", "had + past participle"] },
          { cells: ["did (simple past)", "had + past participle"] },
          { cells: ["will, shall", "would"] },
          { cells: ["can", "could"] },
          { cells: ["may", "might"] },
        ],
        caption: "Each row moves one step back. A verb already as far back as 'had done' stays as it is.",
      },
      selfCheckExample: {
        prompt: "Change to reported speech: Meena said, \"I have lost my purse.\"",
        steps: [
          "The reporting verb 'said' is past, so 'have lost' moves back to 'had lost'.",
          "'I' and 'my' refer to Meena, so they become 'she' and 'her'.",
        ],
        answer: "Meena said that she had lost her purse.",
      },
      practiceSet: [
        { prompt: "Change to reported speech: He said, \"I am hungry.\"", answer: "He said that he was hungry." },
        { prompt: "Change to reported speech: They said, \"We can swim.\"", answer: "They said that they could swim." },
        { prompt: "Change to reported speech: She said, \"I will help you.\" (spoken to me)", answer: "She said that she would help me." },
        { prompt: "Change to reported speech: The teacher said, \"The earth moves round the sun.\"", answer: "The teacher said that the earth moves round the sun." },
        { prompt: "Change to reported speech: Ravi says, \"I am ready.\"", answer: "Ravi says that he is ready." },
      ],
      pyqExampleId: "83b914d5-c59b-490a-a417-3a293cb6a149",
      traps: [
        {
          title: "Forgetting to move the tense back",
          body: "After a past reporting verb, 'is' must become 'was' and 'has done' must become 'had done'. 'He said that he is going home' keeps the wrong tense.",
        },
        {
          title: "Moving back an unreal condition",
          body:
            "'If I had a car, I could drive you' is already an unreal past form, so it stays the same in reported speech. Only the pronouns change.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spigrsp-pronouns-time",
      name: "Pronouns, time words and place words",
      intuition:
        "Ask who is speaking now and to whom. 'I' in the quotation means the original speaker, 'you' means the listener. Words like here, now and tomorrow belonged to the original moment, so they change to words that point back to it.",
      definition:
        "- **I, me, my, we** become the person who spoke: he, him, his, they.\n" +
        "- **You, your** become the person spoken to: he, she, they, or me if it was you.\n" +
        "- **This, these, here, now** become **that, those, there, then**.\n" +
        "- **Today** becomes **that day**, **tomorrow** becomes **the next day**, **yesterday** becomes **the day before**, **ago** becomes **before**.",
      table: {
        columns: ["Direct speech", "Reported speech"],
        rows: [
          { cells: ["now", "then"] },
          { cells: ["today", "that day"] },
          { cells: ["tomorrow", "the next day"] },
          { cells: ["yesterday", "the day before"] },
          { cells: ["next week", "the following week"] },
          { cells: ["two days ago", "two days before"] },
          { cells: ["this, these", "that, those"] },
          { cells: ["here", "there"] },
        ],
        caption: "Change a pronoun by who it means, not by the word: 'you' can become he, she, they or me.",
      },
      selfCheckExample: {
        prompt: "Change to reported speech: The boys said to me, \"We met your brother here yesterday.\"",
        steps: [
          "'We' means the boys: they. 'Your' means me: my.",
          "'Here' becomes 'there' and 'yesterday' becomes 'the day before'.",
          "'Met' is simple past, so it moves back to 'had met'.",
        ],
        answer: "The boys told me that they had met my brother there the day before.",
      },
      practiceSet: [
        { prompt: "Change to reported speech: She said, \"I am busy today.\"", answer: "She said that she was busy that day." },
        { prompt: "Change to reported speech: He said to us, \"You are late.\"", answer: "He told us that we were late." },
        { prompt: "What does 'tomorrow' become in reported speech?", answer: "the next day" },
        { prompt: "What does 'these' become in reported speech?", answer: "those" },
      ],
      pyqExampleId: "dd824cad-c45f-45b8-bd2d-5f138ff99488",
      traps: [
        {
          title: "Keeping 'you' from the quotation",
          body: "In reported speech, 'you' must become the person who was spoken to: 'He told the girls that they were late', not 'that you are late'.",
        },
        {
          title: "Changing words that were never spoken",
          body:
            "Only the words in the quotation change form. Adding or dropping a word such as very or really changes what was said, so that option is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spigrsp-back-to-direct",
      name: "Turning reported speech back into direct speech",
      intuition:
        "This is the backshift run in reverse. Move every tense one step forward, turn the pronouns back into I and you, and put the words inside quotation marks.",
      definition:
        "- Move each tense **one step forward**: was to is (or am, are), had done to has done or did, would to will or shall, could to can.\n" +
        "- **Used to** stays used to.\n" +
        "- The speaker becomes **I**; the person spoken to becomes **you**.\n" +
        "- **There, that, then, the next day, the day before** go back to **here, this, now, tomorrow, yesterday**.\n" +
        "- 'No one would be allowed' (passive) can come from 'We will not allow anyone'. Keep the meaning, not every word.",
      authoredExample: {
        prompt: "Change to direct speech: Arun told me that he would meet me there the next day.",
        steps: [
          "Arun is the speaker, so 'he' becomes 'I'. I was spoken to, so 'me' becomes 'you'.",
          "'Would' moves forward to 'will'.",
          "'There' becomes 'here' and 'the next day' becomes 'tomorrow'.",
        ],
        answer: "Arun said to me, \"I will meet you here tomorrow.\"",
      },
      selfCheckExample: {
        prompt: "Change to direct speech: Priya said that she was not feeling well that day.",
        steps: [
          "'She' (Priya, the speaker) becomes 'I'.",
          "'Was not feeling' moves forward to 'am not feeling'.",
          "'That day' becomes 'today'.",
        ],
        answer: "Priya said, \"I am not feeling well today.\"",
      },
      practiceSet: [
        { prompt: "Change to direct speech: He said that he was tired.", answer: "He said, \"I am tired.\"" },
        { prompt: "Change to direct speech: She told me that she had seen my dog.", answer: "She said to me, \"I have seen your dog.\" (\"I saw your dog\" is also right.)" },
        { prompt: "Change to direct speech: They said that they could not come then.", answer: "They said, \"We cannot come now.\"" },
        { prompt: "Change to direct speech: He said that he used to play hockey.", answer: "He said, \"I used to play hockey.\"" },
      ],
      pyqExampleId: "10e7918e-1e21-4808-9132-570c0e5f0d0b",
      traps: [
        {
          title: "Leaving a past tense inside the quotation",
          body: "The quotation holds the speaker's own words at the time, so 'she was going' goes back to 'I am going', not 'I was going'.",
        },
        {
          title: "Changing 'used to' in the direct form",
          body: "'Used to' does not shift in either direction. 'She said that she used to live in Pune' comes from \"I used to live in Pune\".",
        },
      ],
    },
  ],
};

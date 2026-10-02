import type { SubtopicNote } from "@/app/notes/_types";

/** An underlined sentence part, written the way the paper prints it. */
const u = (s: string): string => `\\(\\underline{\\text{${s}}}\\)`;
/** A three-part spotting-errors item with option (d) No error. */
const item = (a: string, b: string, c: string): string =>
  `Find the part with the error. (a) ${u(a)} (b) ${u(b)} (c) ${u(c)} (d) No error`;

export const CDSEN_SEB_TENSES_NOTE: SubtopicNote = {
  subtopicName: "Tenses and Sequence of Tenses",
  title: "Tenses: match the verb to the time",
  oneLineDefinition:
    "The second check on every sentence: does each verb show the right time? A time word or another verb in the same sentence nearly always tells you which tense is correct.",
  whyItMatters:
    "Tense items give their clue inside the sentence: 'Look!', 'yesterday', 'for three hours', 'so far', or a past verb such as 'asked' or 'said'. Find the clue first and the correct tense follows. " +
    "The verb with the wrong tense and the clue are often in different parts, so read the whole sentence before you mark.",
  concepts: [
    // C1 — simple vs continuous, stative verbs
    {
      kind: "reference" as const,
      slug: "cdsenseb-continuous-stative",
      name: "Simple vs continuous, and stative verbs (own, think, know)",
      intuition:
        "An English verb shows two things: the time (past, present, future) and the shape of the action. Is it a plain fact, an action still in progress, or an action already complete? 'I write' is a habit. 'I am writing' is happening now. " +
        "Some verbs describe a state, not an action. They almost never take the -ing form.",
      definition:
        "- A tense is built from **auxiliaries** (helping verbs: be, have, do, will) plus the main verb.\n" +
        "- **Simple** (I play, I played): a fact, a habit or a general truth.\n" +
        "- **Continuous** (be + -ing: I am playing): an action in progress at one moment. Clues: **Look!**, **Listen!**, **now**, **at the moment**, a change happening as you speak ('It is getting dark').\n" +
        "- **Perfect** (have + the third form of the verb, its past participle: I have played): an action complete by some point of time.\n" +
        "- **Perfect continuous** (have been + -ing): an action that began in the past and is still going on, with a length of time: **for three hours**, **since morning**.\n" +
        "- **Stative verbs** describe a state: own, possess, belong, know, understand, believe, think (when it means 'believe'), like, love, want, need, seem, contain. Use them in the simple form: 'I know him', not 'I am knowing him'.",
      table: {
        columns: ["Clue in the sentence", "Tense needed", "Correct example", "Tested in"],
        rows: [
          {
            cells: ["Look! or Listen!", "Present continuous", "Look! The bus is coming.", "2021 (II)"],
            pyqExampleId: "224eac34-17c5-4bbc-9e0e-11ef54aa36e4",
          },
          {
            cells: ["A change happening as you speak", "Present continuous", "It is getting cold; shall I close the window?", "2021 (II)"],
            pyqExampleId: "06fdf19b-6bb5-4214-9816-e84a2d81b5cb",
          },
          {
            cells: ["for + a length of time, still going on", "Present perfect continuous", "She has been studying for two hours.", "2021 (II)"],
            pyqExampleId: "bb4ecdf5-d369-479b-b3ea-785feeee4681",
          },
          {
            cells: ["think meaning 'believe'", "Simple present", "My father thinks I work too hard.", "2022 (I)"],
            pyqExampleId: "fa732190-fa7b-418d-accd-fb6507332429",
          },
          {
            cells: ["own, possess, belong", "Simple present", "This land belongs to the state.", "2024 (II)"],
            pyqExampleId: "0fc76bc4-758e-4111-9a8b-b612c6bcef4f",
          },
        ],
        caption: "Other stative verbs to watch: know, understand, believe, prefer, mean, consist, contain, seem.",
      },
      pyqExampleId: "0fc76bc4-758e-4111-9a8b-b612c6bcef4f",
      selfCheckExample: {
        prompt: item("I am knowing", "the answer", "to your question."),
        steps: [
          "The verb is 'am knowing', a continuous form.",
          "'Know' is a stative verb: it describes a state of mind, not an action in progress.",
          "Stative verbs take the simple form, so 'I am knowing' must be 'I know'. The wrong words are in part (a).",
        ],
        answer: "(a). I **know** the answer to your question.",
      },
      practiceSet: [
        { prompt: "Correct it: 'Listen! Someone knocks at the door.'", answer: "Listen! Someone **is knocking** at the door.", method: "'Listen!' points to now: continuous." },
        { prompt: "Correct it: 'This bag is belonging to my brother.'", answer: "This bag **belongs** to my brother.", method: "'Belong' is stative." },
        { prompt: "Correct it: 'We wait here since ten o'clock.'", answer: "We **have been waiting** here since ten o'clock.", method: "Began in the past, still going on, with 'since'." },
        { prompt: "Correct it: 'She is wanting a new phone.'", answer: "She **wants** a new phone.", method: "'Want' is stative." },
      ],
      traps: [
        {
          title: "'Think' has two meanings",
          body: "'I am thinking about the test' is correct: here 'think' means 'consider', an action. 'I am thinking you are right' is wrong: here it means 'believe', a state. Ask which meaning the sentence uses.",
        },
        {
          title: "A duration still running needs 'have been + -ing'",
          body: "When a sentence gives a length of time (for three hours, since morning) for an action that is still going on, the exam wants the perfect continuous: 'I have been playing for three hours'.",
        },
        {
          title: "Simple present is not for 'right now'",
          body: "After 'Look!' or 'Listen!', or for a change happening as you speak ('It begins to turn dark'), the simple present is wrong. Use be + -ing: 'It is beginning to turn dark'.",
        },
      ],
    },

    // C2 — present perfect vs simple past
    {
      kind: "formula" as const,
      slug: "cdsenseb-perfect-vs-past",
      name: "Present perfect vs simple past: the time marker decides",
      intuition:
        "The present perfect (has gone, have seen) joins the past to now. The simple past (went, saw) closes the action at a finished time. So a word that names a finished time, such as 'yesterday', rules out the present perfect.",
      definition:
        "- A **time marker** is a word or phrase that fixes when the action happens.\n" +
        "- Finished-time markers take the **simple past**: yesterday, last week, in 2015, two days ago, and a 'when' clause about the past ('When she heard the news, she **was** pleased').\n" +
        "- Up-to-now markers take the **present perfect**: so far, yet, already, ever, since, recently, just, this week, today (while today is still going on).\n" +
        "- Never use **has/have + past participle** with a finished-time marker: 'I have seen him yesterday' is wrong.\n" +
        "- Two linked clauses about the same time keep the same time: 'The project is going well; we **haven't faced** any delays.'",
      authoredExample: {
        prompt: item("The train", "has left the station", "ten minutes ago."),
        steps: [
          "Read the whole sentence and find the time marker: 'ten minutes ago'.",
          "'Ago' names a finished time, so the verb must be in the simple past.",
          "'Has left' is present perfect. It clashes with 'ago'.",
          "The clue is in part (c), but the wrong verb is in part (b). Mark (b).",
        ],
        answer: "(b). The train **left** the station ten minutes ago.",
      },
      selfCheckExample: {
        prompt: item("So far this year", "our team won", "six matches."),
        steps: [
          "The time marker is 'so far this year': a period that runs up to now.",
          "Up-to-now markers take the present perfect.",
          "So 'won' must be 'has won'. The wrong verb is in part (b).",
        ],
        answer: "(b). So far this year our team **has won** six matches.",
      },
      practiceSet: [
        { prompt: "Correct it: 'I have met him last Monday.'", answer: "I **met** him last Monday.", method: "'Last Monday' is a finished time." },
        { prompt: "Correct it: 'He has joined the army in 2019.'", answer: "He **joined** the army in 2019.", method: "A year in the past is a finished time." },
        { prompt: "Correct it: 'She did not finish her homework yet.'", answer: "She **has not finished** her homework yet.", method: "'Yet' looks up to now." },
        { prompt: "Correct it: 'When I was a child, I have lived in Shimla.'", answer: "When I was a child, I **lived** in Shimla.", method: "'When I was a child' is a finished time." },
      ],
      pyqExampleId: "5203c142-c922-485f-9e24-fc49e5e665f4",
      traps: [
        {
          title: "Mark the verb, not the time word",
          body: "The time marker ('yesterday', 'ago') is usually correct. The wrong word is the verb that clashes with it, and it often sits in a different part.",
        },
        {
          title: "'Today' can take more than one tense",
          body: "'I have had two cups of tea today' (the day is still going on) and 'I had a good lunch today' (the lunch is over) are both correct. What is wrong is the simple present for a single event that has already happened: 'The students have a good time today' needs 'had' or 'have had'.",
        },
        {
          title: "A past 'when' clause is a finished time",
          body: "'When she heard the news, she hasn't been pleased' is wrong. The 'when' clause fixes a past moment, so the main verb is simple past: 'she wasn't pleased'.",
        },
      ],
    },

    // C3 — sequence of tenses
    {
      kind: "formula" as const,
      slug: "cdsenseb-sequence",
      name: "Sequence of tenses: past perfect, reported clauses, keeping one time frame",
      intuition:
        "When a sentence is about the past, its verbs should stay in the past. If one past action happened before another, the earlier one goes one step further back: had + past participle.",
      definition:
        "- The **past perfect** (had + past participle) marks the **earlier** of two past actions: 'The train **had left** before we reached the station.'\n" +
        "- A **reporting verb** (said, asked, told, thought, knew) passes on someone's words. This is **reported speech**. When the reporting verb is past, the reported clause moves into the past too: will becomes would, can becomes could, is becomes was, has done becomes had done.\n" +
        "- Exception: a universal truth stays in the present: 'The teacher said that the earth **moves** round the sun.'\n" +
        "- Keep **one time frame**: two verbs that share a subject, or are joined by 'and', take the same tense ('it produces ... and consumes ...').\n" +
        "- In a contrast, the second clause repeats the first clause's helper: 'Some could swim, while others **couldn't**.'",
      authoredExample: {
        prompt: item("By the time the fire brigade arrived,", "the house burnt", "to the ground."),
        steps: [
          "Read the whole sentence. There are two past actions: the brigade arrived, and the house burnt.",
          "Which came first? The house had finished burning before the brigade arrived.",
          "The earlier past action takes the past perfect: had + past participle.",
          "So 'burnt' must be 'had burnt'. The wrong verb is in part (b).",
        ],
        answer: "(b). By the time the fire brigade arrived, the house **had burnt** to the ground.",
      },
      selfCheckExample: {
        prompt: item("The doctor said", "that the patient can", "go home on Sunday."),
        steps: [
          "The reporting verb 'said' is in the past.",
          "So the reported clause moves into the past: 'can' becomes 'could'.",
          "The wrong word is in part (b).",
        ],
        answer: "(b). The doctor said that the patient **could** go home on Sunday.",
      },
      practiceSet: [
        { prompt: "Correct it: 'She said that she is tired.'", answer: "She said that she **was** tired.", method: "Past reporting verb: the clause moves into the past." },
        { prompt: "Correct it: 'He reads the letter and tore it up.'", answer: "He **read** the letter and tore it up.", method: "One subject, two linked verbs: one time frame." },
        { prompt: "Correct it: 'I had finished my work before he comes.'", answer: "I had finished my work before he **came**.", method: "Both actions are past." },
        { prompt: "Correct it: 'Our teacher told us that the sun rose in the east.'", answer: "Our teacher told us that the sun **rises** in the east.", method: "A universal truth stays in the present." },
      ],
      pyqExampleId: "ade7fc35-c4fb-43db-babd-4ee082b23eef",
      traps: [
        {
          title: "Universal truths do not shift",
          body: "After 'said' or 'taught', a fact that is always true keeps the present tense: 'He taught us that honesty **is** the best policy.' Do not push it into the past.",
        },
        {
          title: "'Had' needs a second past action",
          body: "Use the past perfect only when one past action came before another. 'I had gone to Delhi last year', with no second action, should be 'I went to Delhi last year'.",
        },
        {
          title: "Match the helper in a contrast",
          body: "'Some people could write well, while others didn't' mixes two helpers. The second clause repeats the first: 'while others **couldn't**'.",
        },
        {
          title: "A general statement keeps every verb in the present",
          body: "If a sentence states a general truth in the present ('Our greatest glory is ...'), a past verb later in it is the error: 'rising every time we **fall**', not 'we fell'.",
        },
      ],
    },

    // C4 — conditionals and the subjunctive
    {
      kind: "reference" as const,
      slug: "cdsenseb-conditionals",
      name: "Conditionals and the subjunctive (If I were, had + V3, recommend that he go)",
      intuition:
        "An 'if' sentence has two halves: the condition and the result. Each kind of condition has a fixed pair of tenses. Learn the pairs, then check that the two halves match.",
      definition:
        "- A **conditional** is a sentence with an 'if' clause and a result clause.\n" +
        "- **Real future:** If + present, will + verb. 'If it rains, we will stay in.'\n" +
        "- **Unreal present (second conditional):** If + past, would + verb. With 'be', use **were** for every subject: 'If I were you, I would ...'.\n" +
        "- **Unreal past (third conditional):** If + **had + past participle**, would have + past participle. 'If you had asked, I would have helped.'\n" +
        "- **Never put 'would' in the if-clause.** 'If he would have come' is wrong; say 'If he had come'.\n" +
        "- **The subjunctive:** after recommend, suggest, insist, demand, propose + that, use the plain dictionary form of the verb for every subject: 'I suggest that he **leave** early', not 'he leaves' or 'he would leave'. ('He should leave' is also accepted.)",
      table: {
        columns: ["Pattern", "Correct form", "Wrong forms the exam prints", "Tested in"],
        rows: [
          {
            cells: ["Unreal past (third conditional)", "If you had checked, you would have known.", "If you have checked ... / If you would have checked ...", "2017 (II), 2020 (I)"],
            pyqExampleId: "6736b57e-092b-4e48-98cd-8cb797f2ef04",
          },
          {
            cells: ["Unreal present with 'be'", "If I were in his place, I would refuse.", "If I was in his place ... / If I am in his place ...", "2017 (II), 2022 (I)"],
            pyqExampleId: "f821c22e-48fd-4640-85d9-a6938e50b8bf",
          },
          {
            cells: ["recommend / suggest / insist + that", "The doctor suggested that she rest.", "that she would rest / that she rests", "2026 (II)"],
            pyqExampleId: "c5152bcc-8d2f-464f-a12a-3817bacaefd3",
          },
        ],
        caption: "Read both halves before you judge the 'if' part: the result clause tells you which pair you need.",
      },
      pyqExampleId: "db4dfb4a-34bc-41f3-98f2-5a69e6695c83",
      selfCheckExample: {
        prompt: item("If he would have left early,", "he would have caught", "the last bus."),
        steps: [
          "The result clause 'would have caught' is an unreal past: the third conditional.",
          "The if-clause of a third conditional takes 'had + past participle', and never 'would'.",
          "So 'If he would have left' must be 'If he had left'. The wrong words are in part (a).",
        ],
        answer: "(a). If he **had left** early, he would have caught the last bus.",
      },
      practiceSet: [
        { prompt: "Correct it: 'If I was the captain, I would change the batting order.'", answer: "If I **were** the captain, I would change the batting order.", method: "Unreal present: 'were' for every subject." },
        { prompt: "Correct it: 'The coach insisted that every player attends the camp.'", answer: "The coach insisted that every player **attend** the camp.", method: "insist + that: plain verb form." },
        { prompt: "Correct it: 'If you had told me, I will have come.'", answer: "If you had told me, I **would have come**.", method: "Third conditional result: would have + past participle." },
        { prompt: "Correct it: 'If it will rain tomorrow, the match will be cancelled.'", answer: "If it **rains** tomorrow, the match will be cancelled.", method: "No 'will' in the if-clause." },
      ],
      traps: [
        {
          title: "No 'would' in the if-clause",
          body: "'Would' belongs in the result half only. 'If the plan would have worked ...' is always wrong; the if-half takes 'had worked'.",
        },
        {
          title: "'Were' for every person",
          body: "You will hear 'If I was you' in speech. In this exam the answer is 'If I were you', and the same for he, she and it.",
        },
        {
          title: "Match the two halves",
          body: "'Would have + past participle' in the result needs 'had + past participle' in the if-clause. 'If she has known, she would have helped' has the wrong pair: the result is right, so the error is in the if-part ('If she had known').",
        },
      ],
    },
  ],
};

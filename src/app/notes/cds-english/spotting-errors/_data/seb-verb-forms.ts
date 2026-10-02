import type { SubtopicNote } from "@/app/notes/_types";

/** An underlined sentence part, written the way the paper prints it. */
const u = (s: string): string => `\\(\\underline{\\text{${s}}}\\)`;
/** A three-part spotting-errors item with option (d) No error. */
const item = (a: string, b: string, c: string): string =>
  `Find the part with the error. (a) ${u(a)} (b) ${u(b)} (c) ${u(c)} (d) No error`;

export const CDSEN_SEB_VERB_FORMS_NOTE: SubtopicNote = {
  subtopicName: "Verb Forms and Voice",
  title: "Verb forms: the right shape after every helper",
  oneLineDefinition:
    "Once the tense is right, check the shape of the verb: the correct past form, the plain form after a modal, be + past participle in the passive, and -ing or to + verb where each belongs.",
  whyItMatters:
    "These errors sit in one word: 'have ran' for 'have run', 'to described' for 'to describe', 'was been resolved' for 'was resolved'. " +
    "Each helper word demands one form of the verb after it. Learn what has, did, can, must, to and worth demand, and these items take seconds.",
  concepts: [
    // C1 — irregular verbs
    {
      kind: "reference" as const,
      slug: "cdsenseb-irregular",
      name: "Irregular verbs: past and past participle",
      intuition:
        "Every verb has three main forms. Regular verbs add -ed for the second and third forms (walk, walked, walked). Irregular verbs change in their own way (go, went, gone), and the exam picks the ones students get wrong.",
      definition:
        "- **V1, the base form:** the dictionary form (go, run, spring).\n" +
        "- **V2, the simple past:** used alone, with no helper: 'He **ran** home.'\n" +
        "- **V3, the past participle:** used after has/have/had, and after a form of be in the passive: 'He has **run**', 'The floor was **swept**'.\n" +
        "- The check: after **has/have/had**, use V3. In a past sentence with **no helper**, use V2.\n" +
        "- **Hang** has two sets of forms: hang, hung, hung for objects (a picture, a shirt); hang, hanged, hanged only for putting a person to death.",
      table: {
        columns: ["Base (V1)", "Past (V2)", "Past participle (V3)", "Tested in"],
        rows: [
          {
            cells: ["sweep", "swept", "swept", "2017 (I)"],
            pyqExampleId: "e0219706-2fec-480e-bdca-bd0f58d3c6df",
          },
          {
            cells: ["run", "ran", "run", "2019 (II)"],
            pyqExampleId: "ad0d388c-e9e7-4ee4-a828-295efe5b88cd",
          },
          {
            cells: ["spring (jump up)", "sprang", "sprung", "2025 (I)"],
            pyqExampleId: "cfe524c6-42da-441d-ab73-a6d36ce5466f",
          },
          {
            cells: ["hang (an object)", "hung", "hung", "2025 (I)"],
            noteAmber: "'Hanged' is only for putting a person to death. A shirt or a picture is hung.",
            pyqExampleId: "22e5c94a-f3bd-457b-a3ed-54018f84aed5",
          },
        ],
        caption: "Also learn: begin, began, begun; drink, drank, drunk; swim, swam, swum; ring, rang, rung; lie, lay, lain; lay, laid, laid; seek, sought, sought.",
      },
      pyqExampleId: "e0219706-2fec-480e-bdca-bd0f58d3c6df",
      selfCheckExample: {
        prompt: item("By noon the children", "had drank", "all the juice."),
        steps: [
          "The helper is 'had', so the verb after it must be V3.",
          "Drink, drank, drunk: 'drank' is V2, 'drunk' is V3.",
          "So 'had drank' must be 'had drunk'. The wrong word is in part (b).",
        ],
        answer: "(b). By noon the children **had drunk** all the juice.",
      },
      practiceSet: [
        { prompt: "Correct it: 'The bell has rang.'", answer: "The bell **has rung**.", method: "After 'has': V3." },
        { prompt: "Correct it: 'He swum across the river yesterday.'", answer: "He **swam** across the river yesterday.", method: "No helper, past time: V2." },
        { prompt: "Correct it: 'She has began her new job.'", answer: "She **has begun** her new job.", method: "After 'has': V3." },
        { prompt: "Correct it: 'The old photo was hanged in the hall.'", answer: "The old photo was **hung** in the hall.", method: "An object is hung." },
      ],
      traps: [
        {
          title: "V2 after 'has' or 'have'",
          body: "'Have ran', 'has began', 'had drank' all use the simple past where the past participle is needed. After has/have/had, always check that the verb is the third form.",
        },
        {
          title: "Adding -ed to an irregular verb",
          body: "'Catched', 'teached', 'bringed' do not exist. When a familiar verb ends in -ed in the sentence, stop and check whether it is irregular: caught, taught, brought.",
        },
        {
          title: "'Sprung' is not the past",
          body: "'She sprung up from her bed' uses V3 with no helper. The simple past is 'sprang'. The same pattern catches 'sung' for 'sang' and 'begun' for 'began'.",
        },
      ],
    },

    // C2 — base form after do/did, modals and to
    {
      kind: "formula" as const,
      slug: "cdsenseb-base-form",
      name: "Base form after do/did, modals and 'to'",
      intuition:
        "Some helpers must be followed by the plain base form of the verb and nothing else: no -s, no -ed, no -ing. Spot the helper, then check the very next verb.",
      definition:
        "- After **do / does / did**: base form. 'Did he reach?' 'She does not know.' The helper already carries the tense and the -s.\n" +
        "- After a **modal** (can, could, may, might, shall, should, will, would, must): base form. 'She can swim', not 'can swims'.\n" +
        "- After **to** when it is part of the verb (to + verb): base form. 'too tired **to walk**', 'went there **to improve**'.\n" +
        "- After **appear, seem, want, hope, try**: to + base form. 'They appear to like the place.'\n" +
        "- Careful: in 'look forward to', 'be used to' (be accustomed to) and 'with a view to', the word 'to' is a preposition and takes a noun or -ing: 'I look forward to meeting you.'",
      authoredExample: {
        prompt: item("The old man", "did not wanted", "to sell his land."),
        steps: [
          "Read the whole sentence and find each helper: 'did' in part (b), 'to' in part (c).",
          "After 'did', the verb must be the base form. 'Wanted' has an extra -ed.",
          "After 'to', the verb 'sell' is already the base form, so part (c) is correct.",
          "The wrong word is in part (b): 'did not want'.",
        ],
        answer: "(b). The old man **did not want** to sell his land.",
      },
      selfCheckExample: {
        prompt: item("He went to the market", "to bought", "some vegetables."),
        steps: [
          "'To' here shows purpose: why did he go?",
          "After 'to', the verb must be the base form: 'buy', not 'bought'.",
          "The wrong word is in part (b).",
        ],
        answer: "(b). He went to the market **to buy** some vegetables.",
      },
      practiceSet: [
        { prompt: "Correct it: 'She must leaves now.'", answer: "She **must leave** now.", method: "Modal + base form." },
        { prompt: "Correct it: 'Does he knows the way?'", answer: "**Does he know** the way?", method: "Does + base form." },
        { prompt: "Correct it: 'We hope to finished by noon.'", answer: "We hope **to finish** by noon.", method: "To + base form." },
        { prompt: "Correct it: 'They might came tomorrow.'", answer: "They **might come** tomorrow.", method: "Modal + base form." },
      ],
      pyqExampleId: "47747606-5698-4239-8d3e-b83d88f91198",
      traps: [
        {
          title: "The helper takes the ending, not the main verb",
          body: "'Did reached', 'does knows' and 'can goes' mark the tense or the -s twice. Only the helper changes; the main verb stays plain.",
        },
        {
          title: "'No sooner' still uses did + base form",
          body: "After 'No sooner', the helper comes before the subject: 'No sooner **did I reach** there than the children left.' The verb after 'did' stays in the base form, and the pair is 'no sooner ... than'.",
        },
        {
          title: "Not every 'to' takes the base form",
          body: "In 'look forward to', 'object to', 'be used to' and 'lead to', 'to' is a preposition. It takes a noun or an -ing form: 'I look forward to hearing from you', not 'to hear'.",
        },
      ],
    },

    // C3 — passive voice
    {
      kind: "formula" as const,
      slug: "cdsenseb-passive",
      name: "Passive voice: be + past participle, and when not to use it",
      intuition:
        "In the **active voice** the subject does the action: 'The clerk sent the letter.' In the **passive voice** the subject receives it: 'The letter was sent.' The passive always needs two parts: a form of be and the past participle.",
      definition:
        "- **Passive = be + past participle (V3):** is sent, was sent, has been sent, will be sent, should be sent, to be sent.\n" +
        "- Both parts must be there. 'Things are achieve' lacks the V3 ('are achieved'). 'These shoes designed for runners' lacks the be ('are designed').\n" +
        "- There is no 'was been'. The past passive is **was + V3** ('was resolved'); the perfect passive is **has/had been + V3** ('has been resolved').\n" +
        "- A verb that has its own object stays **active**: 'Wind power has made steady progress' ('progress' is the object, so no 'been').\n" +
        "- An **adjective** after the subject takes a form of **be**, not have: 'He is unwilling', 'She is aware'.\n" +
        "- After a modal: modal + be + V3 ('should be done'). After to: to be + V3 ('to be updated').",
      authoredExample: {
        prompt: item("The results", "were announce", "on Monday."),
        steps: [
          "Read the whole sentence. The results did not announce anything; someone announced them. So the sentence is passive.",
          "Passive needs be + past participle. 'Were' is the be part.",
          "'Announce' is the base form, not the past participle 'announced'.",
          "The wrong word is in part (b).",
        ],
        answer: "(b). The results **were announced** on Monday.",
      },
      selfCheckExample: {
        prompt: item("For years the farmers", "have been grown wheat", "on this land."),
        steps: [
          "The farmers do the growing, and 'wheat' is the object. So the verb must be active.",
          "'Have been grown' is passive. It needs 'have grown' (or 'have been growing').",
          "The wrong words are in part (b).",
        ],
        answer: "(b). For years the farmers **have grown** wheat on this land.",
      },
      practiceSet: [
        { prompt: "Correct it: 'The letter was wrote by hand.'", answer: "The letter was **written** by hand.", method: "Passive: be + V3." },
        { prompt: "Correct it: 'The parcel has delivered this morning.'", answer: "The parcel **has been delivered** this morning.", method: "The parcel receives the action: perfect passive." },
        { prompt: "Correct it: 'She has aware of the risk.'", answer: "She **is** aware of the risk.", method: "An adjective takes 'be'." },
        { prompt: "Correct it: 'The form should be fill in ink.'", answer: "The form should be **filled** in ink.", method: "Modal + be + V3." },
      ],
      pyqExampleId: "b3d3047f-6459-4917-8cc7-c26faa53308c",
      traps: [
        {
          title: "A passive needs both parts",
          body: "Check for a form of be AND a past participle. Drop either one and the verb is broken: 'are achieve', 'shoes designed for runners'.",
        },
        {
          title: "'Was been' is never right",
          body: "'Been' needs has, have or had before it. 'The matter was been resolved' should be 'was resolved' or 'has been resolved'.",
        },
        {
          title: "Don't make an active verb passive",
          body: "If the verb has its own object, the subject is doing the action: 'Wind power has made steady progress', not 'has been made steady progress'.",
        },
        {
          title: "'Has' before an adjective",
          body: "Unwilling, afraid, aware and able are adjectives. They take 'is' or 'was': 'he is unwilling to move', not 'he has unwilling'.",
        },
      ],
    },

    // C4 — gerund, infinitive, participle
    {
      kind: "reference" as const,
      slug: "cdsenseb-non-finites",
      name: "Gerund, infinitive, participle: worth doing, parallel lists, dangling participles",
      intuition:
        "Some verb forms show no tense: the -ing form, to + verb, and the past participle. Certain words decide which of these must follow them. A list must keep one form all through. And an opening -ing phrase must belong to the subject that follows it.",
      definition:
        "- **Gerund:** the -ing form used as a noun: 'Swimming is fun.'\n" +
        "- **Infinitive:** to + base form: 'to swim'.\n" +
        "- **Participle:** the -ing or V3 form used like an adjective: 'a running tap', 'a broken chair'.\n" +
        "- After **worth**, **busy**, **no use**, and after any **preposition** (about, for, of, in, at, without, before), use the **-ing** form.\n" +
        "- **Parallelism:** items in a list or a pair take the same form: 'to take, to mail and to call', or 'taking, mailing and calling'.\n" +
        "- A **dangling participle** is an opening -ing phrase with no proper doer in the main clause. 'Walking down the road, the trees looked lovely' says the trees were walking. The subject after the comma must be the one doing the -ing.",
      table: {
        columns: ["Word or pattern", "What follows", "Correct example", "Tested in"],
        rows: [
          {
            cells: ["worth", "-ing form", "This book is worth reading twice.", "2017 (I)"],
            pyqExampleId: "38af597f-eb44-4048-ba66-415276546bfc",
          },
          {
            cells: ["anxious about (a preposition)", "-ing form", "She was nervous about having to speak first.", "2018 (I)"],
            pyqExampleId: "71417e76-68d0-447c-ad1b-9272e1b52c46",
          },
          {
            cells: ["lead to ('to' is a preposition)", "a noun or -ing form", "Hard work can lead to success.", "2019 (I)"],
            pyqExampleId: "d7791958-f6ad-4ac6-a1d9-b74f8a7b041d",
          },
          {
            cells: ["a list of duties", "one form all through", "His duties are to take notes, to answer calls and to file letters.", "2017 (II)"],
            pyqExampleId: "cb0b13e4-65d3-45d5-97e5-226ec2b73fa5",
          },
          {
            cells: ["an opening participle phrase", "the subject that does the action", "It being a rainy day, we stayed indoors.", "2017 (I)"],
            pyqExampleId: "e793f78b-b51f-4984-925b-368e0a1016e5",
          },
        ],
        caption: "Other words that take -ing: avoid, enjoy, finish, mind, can't help, insist on, succeed in, interested in.",
      },
      pyqExampleId: "38af597f-eb44-4048-ba66-415276546bfc",
      selfCheckExample: {
        prompt: item("There is no point", "in argue", "with him now."),
        steps: [
          "'In' is a preposition.",
          "After a preposition, a verb takes the -ing form.",
          "So 'in argue' must be 'in arguing'. The wrong word is in part (b).",
        ],
        answer: "(b). There is no point **in arguing** with him now.",
      },
      practiceSet: [
        { prompt: "Correct it: 'He left without say goodbye.'", answer: "He left without **saying** goodbye.", method: "Preposition + -ing." },
        { prompt: "Correct it: 'She likes reading, painting and to swim.'", answer: "She likes reading, painting and **swimming**.", method: "Keep a list parallel." },
        { prompt: "Correct it: 'Running to the bus, my bag fell in the mud.'", answer: "Running to the bus, **I dropped** my bag in the mud.", method: "The bag was not running: give the -ing phrase its doer." },
        { prompt: "Correct it: 'It is no use to cry now.'", answer: "It is no use **crying** now.", method: "'No use' takes -ing." },
      ],
      traps: [
        {
          title: "'To' is sometimes a preposition",
          body: "In 'lead to', 'look forward to', 'object to' and 'be used to', the 'to' takes a noun or -ing form. 'This will lead to escape suffering' is wrong; 'lead to escaping suffering' or 'lead to escape from suffering' is right.",
        },
        {
          title: "A list breaks at the point where the form changes",
          body: "In 'to take the minutes, mailing the letters and calling the members', the first item does not match the other two. Mark the part where the forms mix.",
        },
        {
          title: "Dangling opener: ask who is doing it",
          body: "'Being a rainy day, we did not go out' says that we were a rainy day. Fix it with its own subject: 'It being a rainy day' or 'As it was a rainy day'.",
        },
      ],
    },

    // C5 — questions, reported questions, tags
    {
      kind: "formula" as const,
      slug: "cdsenseb-questions-tags",
      name: "Word order in questions, reported questions and question tags",
      intuition:
        "A direct question swaps the subject and the helper: 'You are' becomes 'Are you?'. A reported question, one placed inside a longer sentence, does not swap. A question tag at the end repeats the helper and the subject, with the opposite sign.",
      definition:
        "- **Inversion:** in a direct question the helper comes before the subject: 'How long **have you** been here?', not 'How long you are here?'.\n" +
        "- **Reported question:** no inversion and no question mark: 'I asked him where **he was** going', not 'where was he going'.\n" +
        "- **Question tag:** a short question added to a statement: helper + pronoun. A **positive** statement takes a **negative** tag, and a **negative** statement a **positive** tag: 'You are late, **aren't you**?' 'She can't swim, **can she**?'\n" +
        "- The tag uses the same helper as the statement, or do/does/did if there is none, and a pronoun for the subject: 'Ravi plays well, **doesn't he**?'\n" +
        "- Words such as never, hardly, seldom and scarcely make the statement negative, so the tag is positive: 'He never complains, **does he**?'\n" +
        "- In a statement, keep the object close to its verb and put a long phrase at the end: 'The war brought great hardship to the town', not 'brought to the town great hardship'.",
      authoredExample: {
        prompt: item("Your sister", "has finished her exams,", "isn't it?"),
        steps: [
          "Read the whole sentence. It ends with a question tag in part (c).",
          "The statement is positive and uses the helper 'has'. So the tag must be negative and use 'has'.",
          "The subject 'your sister' becomes the pronoun 'she'.",
          "The tag should be 'hasn't she?'. The wrong words are in part (c).",
        ],
        answer: "(c). Your sister has finished her exams, **hasn't she?**",
      },
      selfCheckExample: {
        prompt: item("Can you tell me", "what time does the train leave", "from platform two?"),
        steps: [
          "The direct question is 'Can you tell me ...?'. The part after 'tell me' is a reported question.",
          "A reported question keeps statement order: subject, then verb.",
          "So 'what time does the train leave' must be 'what time the train leaves'. The wrong words are in part (b).",
        ],
        answer: "(b). Can you tell me **what time the train leaves** from platform two?",
      },
      practiceSet: [
        { prompt: "Correct it: 'Where you are going?'", answer: "**Where are you** going?", method: "Direct question: helper before subject." },
        { prompt: "Correct it: 'They won't come, won't they?'", answer: "They won't come, **will they?**", method: "Negative statement, positive tag." },
        { prompt: "Correct it: 'He asked me what was my name.'", answer: "He asked me **what my name was**.", method: "Reported question: no inversion." },
        { prompt: "Correct it: 'Let us go now, shan't we?'", answer: "Let us go now, **shall we?**", method: "'Let us' takes the tag 'shall we?'." },
      ],
      pyqExampleId: "96c633dc-a8b2-4ae1-980b-41cb966aac43",
      traps: [
        {
          title: "'Isn't it?' is not a tag for every sentence",
          body: "In everyday Indian English, 'isn't it?' is added to anything. In the exam the tag must match the statement's helper and subject: 'You are sixteen, **aren't you**?', not 'isn't it?'.",
        },
        {
          title: "Reported questions do not invert",
          body: "After asked, wondered, don't know or tell me, the question word is followed by the subject and then the verb: 'I wonder where she **lives**', not 'where does she live'.",
        },
        {
          title: "The tag takes the opposite sign",
          body: "A negative statement takes a positive tag: 'She can't drive, **can she**?'. A negative tag after a negative statement is the error.",
        },
      ],
    },
  ],
};

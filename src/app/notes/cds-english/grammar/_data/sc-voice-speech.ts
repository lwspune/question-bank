import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_SC_VOICE_SPEECH_NOTE: SubtopicNote = {
  subtopicName: "Voice and Reported Speech",
  title: "Changing the voice and reporting speech",
  oneLineDefinition:
    "Two transformations. Active to passive: the object becomes the subject and the tense stays. Direct to reported speech: the tense moves back, and pronouns and time words change.",
  whyItMatters:
    "CDS papers often set these transformations in a block. The four options usually differ in one small change: a tense, a pronoun, 'today' kept or changed. " +
    "Check every change in order, and the right option is usually the only one left standing.",
  concepts: [
    // C1 — passive: keep the tense
    {
      kind: "formula" as const,
      slug: "cdsensc-passive-tense",
      name: "Active to passive: keep the tense, swap subject and object",
      intuition:
        "In the active voice the doer comes first: The cat chased the mouse. In the passive the thing acted on comes first: The mouse was chased by the cat. " +
        "The tense does not change. Only the form of the verb does.",
      definition:
        "The terms:\n" +
        "- **Active voice**: the subject does the action. **Passive voice**: the subject receives the action.\n" +
        "- **Agent**: the doer, placed after 'by' in the passive.\n" +
        "- **V3**: the past participle (written, answered, won).\n" +
        "The steps:\n" +
        "- Find the object of the active verb. It becomes the new subject.\n" +
        "- Keep the tense: write the matching form of 'be', then V3.\n" +
        "- Make 'be' agree with the new subject: is/are, was/were, has/have.\n" +
        "- Put the old subject after 'by'. Drop it if it adds nothing (by someone, by people).\n" +
        "The forms of 'be' by tense:\n" +
        "- Present simple: is/are + V3. Past simple: was/were + V3.\n" +
        "- Present continuous: is/are being + V3. Past continuous: was/were being + V3.\n" +
        "- Present perfect: has/have been + V3. Future: will be + V3.",
      authoredExample: {
        prompt: "Change to the passive: The police were questioning the driver.",
        steps: [
          "The object is 'the driver'. It becomes the new subject.",
          "'Were questioning' is past continuous, so the passive is was/were being + V3.",
          "The new subject 'the driver' is singular, so 'was being questioned'.",
          "The old subject goes after 'by'.",
        ],
        answer: "The driver was being questioned by the police.",
      },
      pyqExampleId: "6145420b-5988-4ae5-a4f1-4a45d5da8183",
      selfCheckExample: {
        prompt: "Change to the passive: The farmers grow rice in this valley.",
        steps: [
          "The object 'rice' becomes the subject.",
          "'Grow' is present simple, so the passive is is/are + V3.",
          "Rice is uncountable and singular, so 'is grown'. The agent goes after 'by'.",
        ],
        answer: "Rice is grown in this valley by the farmers.",
      },
      practiceSet: [
        { prompt: "Passive of: She wrote a letter.", answer: "A letter was written by her." },
        { prompt: "Passive of: They will open the new road.", answer: "The new road will be opened (by them)." },
        {
          prompt: "Active of: The match is being shown by a sports channel.",
          answer: "A sports channel is showing the match.",
          method: "is being + V3 is present continuous",
        },
        {
          prompt: "Fill: The songs ___ been sung by the choir. (has / have)",
          answer: "have",
          method: "the new subject 'the songs' is plural",
        },
      ],
      traps: [
        {
          title: "Changing the tense",
          body: "The passive keeps the tense of the active. 'Elect' (present) becomes 'is elected', not 'was elected' or 'has been elected'. Two of the four options usually differ only in tense.",
        },
        {
          title: "Has with a plural new subject",
          body: "'Be' agrees with the **new** subject. 'A dozen novels and a number of poetry collections **have** been authored', not 'has'. Look at the new subject, not the old one.",
        },
        {
          title: "Reversing who did what",
          body: "'The members of the parliament are elected by their group leader' swaps the doer and the receiver. The object of the active verb, and only it, becomes the new subject.",
        },
        {
          title: "Cause and effect in a completion",
          body: "'Many accidents cause careless driving' is backwards. Careless driving is the cause, so: Many accidents **are caused by** careless driving. Ask who or what does the action.",
        },
      ],
    },
    // C2 — commands and 'is said to'
    {
      kind: "reference" as const,
      slug: "cdsensc-passive-special",
      name: "Commands and 'is said to' in the passive",
      intuition:
        "A command has no stated subject, so its passive needs a frame: Let + object + be + V3. Advice or a duty is shown with 'should be'. " +
        "And 'They say he is ...' has a short passive: He is said to be ...",
      definition:
        "The patterns:\n" +
        "- **Command** (imperative): Let + object + be + V3. Close the gate becomes Let the gate be closed.\n" +
        "- **Advice or duty**: object + should be + V3. Help the poor becomes The poor should be helped.\n" +
        "- **Reporting with say**: They say that he is rich becomes He **is said to be** rich. They said that he was rich becomes He **was said to be** rich.\n" +
        "- The tense of 'say' decides the tense of the rest: past said goes with was said, and the active form keeps 'was'.",
      table: {
        columns: ["Active form", "Passive form", "Rule", "Sitting"],
        rows: [
          {
            cells: ["Shut the door.", "Let the door be shut.", "Command: Let + object + be + V3", "2018 (II), 2024 (II)"],
            noteAmber: "The same item was set in 2018 (II) and again in 2024 (II).",
          },
          {
            cells: ["Respect your elders.", "Elders should be respected.", "Advice or duty: should be + V3", "2024 (II)"],
          },
          {
            cells: [
              "They said he was a good cricketer.",
              "He was said to be a good cricketer.",
              "Past 'said': was said to be. Going back to active, 'was' stays 'was'.",
              "2024 (II)",
            ],
          },
        ],
        caption: "A command keeps its force in the passive: Let ... be, or should be. 'Elders are respected' is a statement, not a command.",
      },
      pyqExampleId: "ffd467c3-eeae-44ef-9091-4813de04f910",
      selfCheckExample: {
        prompt: "Change to the passive: Post the letter today.",
        steps: [
          "This is a command: there is no stated subject.",
          "Use Let + object + be + V3. The object is 'the letter' and the V3 of post is 'posted'.",
          "The time word stays where it was.",
        ],
        answer: "Let the letter be posted today.",
      },
      practiceSet: [
        { prompt: "Passive of: Bring the files.", answer: "Let the files be brought." },
        { prompt: "Passive with 'should': Obey the rules.", answer: "The rules should be obeyed." },
        { prompt: "Active of: She is said to be an honest officer.", answer: "They say (that) she is an honest officer." },
        { prompt: "Passive of: People believed that he was a spy.", answer: "He was believed to be a spy." },
      ],
      traps: [
        {
          title: "Dropping 'Let'",
          body: "'The window be opened' is not a complete sentence. A command in the passive needs **Let** in front: Let the window be opened.",
        },
        {
          title: "Turning a command into a statement",
          body: "'Elders are respected' reports a fact; the order in 'Respect your elders' is lost. Keep the force of the command with **should be** or **Let ... be**.",
        },
        {
          title: "The wrong tense after 'said'",
          body: "'He was said to be ...' goes back to 'They said he **was** ...'. 'They said he is ...' breaks the past sequence.",
        },
      ],
    },
    // C3 — reported statements
    {
      kind: "formula" as const,
      slug: "cdsensc-reported-statements",
      name: "Reported statements: shift tense, pronouns and time words; universal truths stay",
      intuition:
        "Reported speech tells what someone said without quoting them. Because the speaking now lies in the past, each tense moves one step back, and words like I, we, now and today change to fit the new speaker. " +
        "A fact that is always true keeps its present tense.",
      definition:
        "The terms:\n" +
        "- **Reporting verb**: the verb that introduces the speech: said, told, asked.\n" +
        "- **Backshift**: moving each tense one step into the past after a past reporting verb.\n" +
        "- **Universal truth**: a fact that is always true. It keeps the present.\n" +
        "The tense steps:\n" +
        "- Present becomes past: is becomes was, need becomes needed.\n" +
        "- Present perfect becomes past perfect: have received becomes had received.\n" +
        "- Past becomes past perfect: sowed becomes had sown.\n" +
        "- Will becomes would; can becomes could.\n" +
        "The other changes:\n" +
        "- **Pronouns** follow the reporter's point of view: we becomes they, our becomes their, I becomes he or she.\n" +
        "- **Time and place words**: now becomes then, today becomes that day, tomorrow becomes the next day, yesterday becomes the day before, last week becomes the week before, this becomes that, here becomes there.\n" +
        "- **Said to + person** becomes **told + person + that**.\n" +
        "- A universal truth keeps the present: The teacher said that the earth moves round the sun.",
      authoredExample: {
        prompt: "Report this: Meena said to me, \"I am leaving for Goa tomorrow.\"",
        steps: [
          "'Said to me' becomes 'told me that'.",
          "'I' is Meena, so it becomes 'she'.",
          "'Am leaving' moves back one step to 'was leaving'.",
          "'Tomorrow' becomes 'the next day'.",
        ],
        answer: "Meena told me that she was leaving for Goa the next day.",
      },
      pyqExampleId: "936cb845-82a4-44a0-b497-50e9275bdbed",
      selfCheckExample: {
        prompt: "Report this: The coach said, \"We have won three matches this week.\"",
        steps: [
          "There is no listener named, so keep 'said that'.",
          "'We' becomes 'they'.",
          "'Have won' (present perfect) becomes 'had won'.",
          "'This week' becomes 'that week'.",
        ],
        answer: "The coach said that they had won three matches that week.",
      },
      practiceSet: [
        { prompt: "Report: He said, \"I can swim.\"", answer: "He said that he could swim." },
        {
          prompt: "Report: The teacher said, \"Water boils at 100 degrees Celsius.\"",
          answer: "The teacher said that water boils at 100 degrees Celsius.",
          method: "a scientific fact keeps the present",
        },
        { prompt: "Report: Ravi said, \"I met her yesterday.\"", answer: "Ravi said that he had met her the day before." },
        { prompt: "Report: She said to us, \"You will pass.\"", answer: "She told us that we would pass." },
      ],
      traps: [
        {
          title: "Half a change",
          body: "Options often change the tense but keep 'our' or 'now', or change the pronoun but keep 'this season'. Check every word that can change: tense, each pronoun, each time word.",
        },
        {
          title: "Backshifting a universal truth",
          body: "'The teacher said that the earth **moved** round the sun' is wrong. A fact that is always true keeps the present: moves.",
        },
        {
          title: "Said + person + that",
          body: "'The manager said his colleagues that ...' is wrong. With a listener, use **told + person + that**; 'said' needs 'to' before the person.",
        },
        {
          title: "Asked for a statement",
          body: "'Asked' reports a question. A statement is reported with **said** or **told**. 'He asked her that the train was late' is wrong.",
        },
      ],
    },
    // C4 — questions, requests, orders, exclamations, wishes
    {
      kind: "reference" as const,
      slug: "cdsensc-reported-questions-commands",
      name: "Reporting verbs by sentence type: questions, requests, orders, exclamations, wishes",
      intuition:
        "The reporting verb changes with the type of sentence. A question is reported with asked; a polite request with requested; a command with ordered; an exclamation with exclaimed; a blessing with blessed or prayed. " +
        "After 'asked', the words go back to the order of a statement.",
      definition:
        "The terms:\n" +
        "- **Sentence types**: statement, question, request, command, exclamation, wish.\n" +
        "- **Statement order**: subject before verb (where she had been), not question order (where had she been).\n" +
        "The patterns:\n" +
        "- **Yes/no question**: asked + if or whether + statement order.\n" +
        "- **Wh-question**: asked + wh-word + statement order.\n" +
        "- **Polite request** (Could you please ...?): requested + person + to + verb. Drop 'please'.\n" +
        "- **Command**: ordered or commanded + person + to + verb.\n" +
        "- **Exclamation** (What a ...! How ...!): exclaimed + that + statement.\n" +
        "- **Wish or blessing** (May you ...!): blessed or prayed + that + would or might.\n" +
        "- Backshift and the time-word changes still apply: today becomes that day, last evening becomes the previous evening.",
      table: {
        columns: ["Sentence type", "Reporting verb", "Pattern", "Tested in", "Sitting"],
        rows: [
          {
            cells: [
              "Command",
              "ordered",
              "ordered + person + to + verb",
              "Move forward and face the target now. March forward and aim at the peak of the hill today.",
              "2018 (II), 2020 (I)",
            ],
          },
          {
            cells: [
              "Polite request: Could you please ...?",
              "requested",
              "requested + person + to + verb, with no 'please'",
              "Turn off the switch. Close the door. Pass the bill this week.",
              "2018 (II), 2020 (I)",
            ],
          },
          {
            cells: [
              "Wh-question",
              "asked",
              "asked + wh-word + subject + verb",
              "Where were your ideas when we faced the troubles last week? What is the way to solve the question? Where were you last evening?",
              "2018 (II), 2020 (I)",
            ],
          },
          {
            cells: [
              "Yes/no question",
              "asked",
              "asked + if + subject + verb",
              "Will you go with me for a cup of tea in the evening today?",
              "2018 (II)",
            ],
          },
          {
            cells: ["Exclamation", "exclaimed", "exclaimed + that + statement", "What a scintillating beauty it is!", "2020 (I)"],
          },
          {
            cells: [
              "Wish: May you ...",
              "blessed / prayed",
              "blessed + person + that + would",
              "May you live long with all good things of life.",
              "2020 (I)",
            ],
          },
        ],
        caption: "Name the sentence type first. It decides the reporting verb before you check any tense.",
      },
      pyqExampleId: "7a2339d5-3172-49d7-803f-6692e508a71f",
      selfCheckExample: {
        prompt: "Report this: The clerk said to me, \"Where do you live?\"",
        steps: [
          "It is a wh-question, so the reporting verb is 'asked'.",
          "'You' is the listener, me, so it becomes 'I'.",
          "Use statement order (subject before verb) and backshift: 'do you live' becomes 'I lived'.",
        ],
        answer: "The clerk asked me where I lived.",
      },
      practiceSet: [
        {
          prompt: "Report: She said to him, \"Could you please lend me a pen?\"",
          answer: "She requested him to lend her a pen.",
        },
        { prompt: "Report: He said, \"What a lovely garden it is!\"", answer: "He exclaimed that it was a lovely garden." },
        { prompt: "Report: Mother said to Anu, \"Are you hungry?\"", answer: "Mother asked Anu if she was hungry." },
        {
          prompt: "Report: The old man said to me, \"May God bless you!\"",
          answer: "The old man prayed that God might bless me.",
        },
      ],
      traps: [
        {
          title: "Keeping question order",
          body: "'The lady asked her maid where **had she been**' keeps the order of a question. Reported questions use statement order: where **she had been**.",
        },
        {
          title: "Told for a question",
          body: "'Told' introduces a statement, not a question. 'Rahul told his teacher what the way was' is wrong because Rahul was asking. Use **asked**.",
        },
        {
          title: "Ordered versus requested",
          body: "Politeness decides the verb. 'Could you please ...?' is a request, so **requested**. 'Get out of my office!' from an angry manager is an order, so **ordered**. Swapping them is a standard wrong option.",
        },
        {
          title: "Keeping 'please' or 'what a'",
          body: "'Requested his friend to please close the door' keeps a word the reporting verb already carries. 'Exclaimed what a beauty it was' keeps the exclamation form. Drop both.",
        },
      ],
    },
  ],
};

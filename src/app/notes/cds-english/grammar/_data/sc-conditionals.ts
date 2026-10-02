import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_SC_CONDITIONALS_NOTE: SubtopicNote = {
  subtopicName: "Conditionals and Tense Sequence",
  title: "Conditionals and the order of tenses",
  oneLineDefinition:
    "An if-clause and its main clause must use matching tenses, and two linked events must keep their order in time. Learn three if-patterns and four tense-order rules, and most endings choose themselves.",
  whyItMatters:
    "Conditionals are one of the most tested patterns in CDS sentence completion: the paper gives the if-clause and asks for the result, or the other way round. " +
    "The 'combine the two sentences' items test the same tense rules from the other side. Marks are lost on endings that sound natural but break the tense pattern.",
  concepts: [
    // C1 — if-types
    {
      kind: "formula" as const,
      slug: "cdsensc-if-types",
      name: "The three if-patterns and their inverted forms",
      intuition:
        "An if-sentence has two halves. The if-clause states a condition; the main clause states the result. " +
        "The tense of the if-clause tells you how real the condition is, and that fixes the tense of the result.",
      definition:
        "The terms:\n" +
        "- **Clause**: a group of words with its own subject and verb.\n" +
        "- **If-clause**: the half that gives the condition. **Main clause**: the half that gives the result.\n" +
        "- **V3 (past participle)**: the third form of a verb: gone, done, fared, completed.\n" +
        "- **Past perfect**: had + V3 (had gone, had planned).\n" +
        "The three patterns:\n" +
        "- **Type 1, real or likely**: If + present, will/can + verb. If it rains, we will stay in.\n" +
        "- **Type 2, unreal now**: If + past, would/could + verb. Use **were** for every subject. If I were rich, I would travel.\n" +
        "- **Type 3, unreal past**: If + had + V3, would/could have + V3. If he had run, he would have caught the bus.\n" +
        "Two more rules:\n" +
        "- **Inversion**: drop 'if' and put the helping verb first. Had I known = If I had known. Were he here = If he were here.\n" +
        "- A command or request in the main clause takes the present after if: Let me know if you **have** news.\n" +
        "- Never put will or would inside the if-clause.",
      authoredExample: {
        prompt:
          "Choose the ending: If she had left home earlier, ___ (a) she will catch the train (b) she would catch the train (c) she would have caught the train (d) she had caught the train",
        steps: [
          "Read the if-clause first: 'had left' is had + V3, so this is Type 3, a past that did not happen.",
          "Type 3 needs would/could have + V3 in the main clause.",
          "(a) 'will catch' belongs to Type 1 and (b) 'would catch' to Type 2. (d) puts the past perfect in the result half, which never takes it.",
        ],
        answer: "(c) If she had left home earlier, she would have caught the train.",
      },
      pyqExampleId: "b44d4e82-3cb1-486d-bb08-6f534a8ea893",
      selfCheckExample: {
        prompt: "Rewrite without 'if': If I had known about the test, I would have studied.",
        steps: [
          "The if-clause is Type 3: had + V3.",
          "To invert, drop 'if' and move 'had' in front of the subject.",
          "The main clause does not change.",
        ],
        answer: "Had I known about the test, I would have studied.",
      },
      practiceSet: [
        { prompt: "If you ask him, he ___ help you. (will / would have)", answer: "will", method: "present in the if-clause, so Type 1" },
        { prompt: "If I ___ a bird, I would fly. (am / were)", answer: "were", method: "Type 2 uses were for every subject" },
        { prompt: "If they had invited me, I ___ gone. (would have / will have)", answer: "would have", method: "had + V3, so Type 3" },
        { prompt: "___ he more careful, he would make fewer mistakes. (Was / Were)", answer: "Were", method: "inverted Type 2" },
      ],
      traps: [
        {
          title: "Will or would inside the if-clause",
          body: "'If you would won' and 'if you will win' are both wrong. The if-clause takes a present, a past or had + V3. Will and would belong in the main clause.",
        },
        {
          title: "An extra 'been'",
          body: "'They would have **been** won the match' is wrong. Winning is an action the subject does, so Type 3 needs only would have + V3: would have won.",
        },
        {
          title: "Halves from two different types",
          body: "'If you had planned the work, you **shall have completed** it' mixes a Type 3 condition with a result that belongs to no pattern. Find the type from the if-clause, then pick the matching result.",
        },
        {
          title: "Was in Type 2",
          body: "Formal English uses **were** for every subject in an unreal condition: if I were, were he. In the exam, 'was he more honest' reads as a question, not a condition.",
        },
      ],
    },
    // C2 — unless, as long as, in case
    {
      kind: "formula" as const,
      slug: "cdsensc-unless-provided",
      name: "Unless, as long as, in case: conditions without 'if'",
      intuition:
        "Not every condition starts with 'if'. Unless means 'if not'. As long as means 'only on this condition'. In case means 'to be ready, because it may happen'. " +
        "Each word carries its own condition, so the ending must make sense with that meaning.",
      definition:
        "The words:\n" +
        "- **Unless = if ... not**. Unless you hurry, you will miss the bus = If you do not hurry, you will miss the bus.\n" +
        "- Do not add another 'not' after unless: 'unless you do not hurry' doubles the negative.\n" +
        "- **As long as / provided that**: on this one condition. The present follows it: You can borrow my bike as long as you return it today.\n" +
        "- **In case**: as a precaution, before the thing happens. Take an umbrella in case it rains.\n" +
        "The method:\n" +
        "- Replace the word with its meaning (if not, only if, to be ready if).\n" +
        "- Test whether the ending follows logically from that meaning.\n" +
        "- Then check the tense: a condition about the future takes the present, not will.",
      authoredExample: {
        prompt:
          "Choose the ending: You may stay out late ___ (a) as long as you phone us at ten (b) as long as you phoned us at ten (c) as long as you will not phone us (d) as long as you cannot phone us",
        steps: [
          "As long as means 'only on this condition'. The condition must be something the parents would want.",
          "The condition is about the future, so it takes the present: you phone.",
          "(b) is in the past. (c) puts will after the condition word. (d) makes no sense: being unable to phone is not a condition anyone would set.",
        ],
        answer: "(a) You may stay out late as long as you phone us at ten.",
      },
      pyqExampleId: "7eb8cabd-8698-41c9-bad8-ea08c1a3ebc3",
      selfCheckExample: {
        prompt: "Choose: Keep some cash with you ___ the card machine is not working. (in case / although / because of)",
        steps: [
          "The cash is a precaution against something that may happen.",
          "That is the meaning of 'in case'.",
          "'Although' signals a contrast, and 'because of' needs a noun, not a clause.",
        ],
        answer: "Keep some cash with you in case the card machine is not working.",
      },
      practiceSet: [
        {
          prompt: "Do these mean the same? 'Take a torch in case the lights go out.' and 'Take a torch if the lights go out.'",
          answer: "No",
          method: "in case = take it now, as a precaution; if = take it only when they go out",
        },
        { prompt: "You can join the team ___ you attend every practice. (as long as / although)", answer: "as long as" },
        {
          prompt: "I will lend you the book provided that you ___ it on Monday. (return / will return)",
          answer: "return",
          method: "a condition about the future takes the present",
        },
        { prompt: "I'll carry a raincoat ___ it rains. (in case / as long as)", answer: "in case" },
      ],
      traps: [
        {
          title: "A double negative after unless",
          body: "Unless already means 'if not'. 'Unless you do not work' is a double negative. Write 'unless you work' or 'if you do not work'.",
        },
        {
          title: "An ending that fights the condition",
          body: "'Unless you work harder, you will pass' is grammatical but illogical. Replace unless with 'if not' and read it again: if you do not work harder, you will **fail**.",
        },
        {
          title: "Will after a condition word",
          body: "'As long as you will return it' is wrong. After as long as, provided that and in case, a future condition takes the present: as long as you return it.",
        },
        {
          title: "In case is not if",
          body: "'In case' is about getting ready before something happens, not about doing it only when it happens. 'In case of' + noun also exists (in case of fire, in case of rain), but the noun must be an event that may happen. 'In case of time' means nothing.",
        },
      ],
    },
    // C3 — tense sequence
    {
      kind: "formula" as const,
      slug: "cdsensc-tense-sequence",
      name: "Tense sequence: time clauses, the earlier past, keeping the given tense",
      intuition:
        "When two actions sit in one sentence, their tenses must show their real order in time. A future event after 'when' takes the present. " +
        "Of two past events, the earlier one takes had + V3. After a past verb of telling, the reported fact moves into the past too.",
      definition:
        "The terms:\n" +
        "- **Tense sequence**: the rule that the verbs in one sentence must fit together in time.\n" +
        "- **Time clause**: a clause that starts with when, as soon as, before, after or until.\n" +
        "The four rules:\n" +
        "- A time clause about the **future** takes the **present**: I will call you when I **reach**. Not 'when I will reach'.\n" +
        "- Of two past actions, the **earlier** one takes **had + V3**: When we arrived, the film **had started**.\n" +
        "- After a **past** verb of telling (said, told, was informed), the reported verb goes into the **past**: She was told that the shop **closed** at six.\n" +
        "- When you **combine two sentences**, keep the tense each one already has unless a rule forces a change. 'Has been waiting' stays 'has been waiting'.\n" +
        "Also:\n" +
        "- **When** marks a point in time. **As, because** and **since** can give a reason, so they do not fit 'She got married when she was 22'.",
      authoredExample: {
        prompt:
          "Combine: The guests will arrive at eight. We will serve dinner then. (a) We will serve dinner when the guests will arrive at eight. (b) We will serve dinner when the guests arrive at eight. (c) We served dinner when the guests arrived at eight. (d) We will serve dinner when the guests arrived at eight.",
        steps: [
          "Both actions are in the future.",
          "The 'when' half is a time clause. A time clause about the future takes the present: the guests arrive.",
          "(a) puts will inside the time clause. (c) moves both actions into the past. (d) mixes a future with a past.",
        ],
        answer: "(b) We will serve dinner when the guests arrive at eight.",
      },
      pyqExampleId: "4822299f-744b-4726-908d-d8397b4bf311",
      selfCheckExample: {
        prompt: "Choose: By the time the fire brigade came, the house ___ (burnt / had burnt / has burnt) down.",
        steps: [
          "There are two past actions: the brigade came, and the house burnt down.",
          "The house burnt down first, before the brigade arrived.",
          "The earlier past action takes had + V3.",
        ],
        answer: "By the time the fire brigade came, the house had burnt down.",
      },
      practiceSet: [
        { prompt: "She will phone you as soon as she ___. (lands / will land)", answer: "lands", method: "future time clause, so present" },
        { prompt: "I came to Delhi ___ I was ten. (when / because)", answer: "when", method: "a point in time, not a reason" },
        {
          prompt: "When I opened the door, the thief ___ already ___. (escaped / had escaped)",
          answer: "had already escaped",
          method: "the escape came first",
        },
        {
          prompt: "Combine, keeping the tense: She has been learning Hindi for a year. She wants to work in Delhi.",
          answer: "She has been learning Hindi for a year because she wants to work in Delhi.",
          method: "'has been learning' stays as it is",
        },
      ],
      traps: [
        {
          title: "Will in a time clause",
          body: "'You can meet him when he **will return**' is wrong. After when, as soon as, before and until, a future event takes the present: when he **returns**.",
        },
        {
          title: "Had + V3 on both actions",
          body: "Only the **earlier** of two past actions takes had + V3. The later one stays in the simple past: When she **reached** the station, the bus **had** already **left**.",
        },
        {
          title: "Changing a tense you were given",
          body: "In 'combine the two sentences' items, an option that turns 'has been trying' into 'had been trying' or 'is trying' changes the meaning. It is wrong even if it is grammatical.",
        },
        {
          title: "When versus as, because, since",
          body: "'Julia got married **as** she was 22' says her age was the reason. A point in time needs **when**.",
        },
      ],
    },
  ],
};

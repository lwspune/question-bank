import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_GR_TENSES_NOTE: SubtopicNote = {
  subtopicName: "Tenses and Verb Forms",
  title: "Tenses and Verb Forms",
  oneLineDefinition:
    "A tense is the form of the verb that shows when an action happens and whether it is finished or still going on.",
  whyItMatters:
    "Fifteen questions in the bank: 11 EASY, 3 MODERATE and 1 HARD, and four of the five Grammar questions from the 2022 paper sit here. Most are settled by one time word in the sentence (ago, since, yet, by tomorrow), so find that word before you read the options.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spigrte-forms",
      name: "The twelve tense forms and how to name them",
      intuition:
        "Every tense is built from two choices: the time (past, present or future) and the shape (simple, continuous, perfect or perfect continuous). Learn the helping verbs of each shape and you can name any tense on sight.",
      definition:
        "- **Simple**: the verb alone (plays, played, will play).\n" +
        "- **Continuous**: a form of **be** + verb-ing (is playing, was playing, will be playing).\n" +
        "- **Perfect**: a form of **have** + past participle (has played, had played, will have played).\n" +
        "- **Perfect continuous**: a form of **have been** + verb-ing (has been playing, had been playing).\n" +
        "- Old books call the simple tenses **indefinite**: Past Indefinite means Simple Past.",
      table: {
        columns: ["Tense", "Form", "Example"],
        rows: [
          { cells: ["Simple Present", "verb or verb + s", "She reads every day."] },
          { cells: ["Present Continuous", "am, is, are + verb-ing", "She is reading now."] },
          { cells: ["Present Perfect", "has, have + past participle", "She has read the letter."] },
          { cells: ["Present Perfect Continuous", "has, have been + verb-ing", "She has been reading since noon."] },
          { cells: ["Simple Past", "past form", "She read the letter yesterday."] },
          { cells: ["Past Continuous", "was, were + verb-ing", "She was reading when I called."] },
          { cells: ["Past Perfect", "had + past participle", "She had read it before I came."] },
          { cells: ["Past Perfect Continuous", "had been + verb-ing", "She had been reading for an hour."] },
          { cells: ["Simple Future", "will, shall + verb", "She will read it tomorrow."] },
          { cells: ["Future Continuous", "will be + verb-ing", "She will be reading at six."] },
          { cells: ["Future Perfect", "will have + past participle", "She will have read it by Monday."] },
          { cells: ["Future Perfect Continuous", "will have been + verb-ing", "She will have been reading for two hours by six."] },
        ],
        caption: "To name a tense, look only at the helping verbs and the ending of the main verb.",
      },
      selfCheckExample: {
        prompt: "Name the tense: The farmers had been waiting for rain all summer.",
        steps: [
          "The helping verbs are 'had been' and the main verb ends in -ing.",
          "'Had been' + verb-ing is the past perfect continuous form.",
        ],
        answer: "Past Perfect Continuous",
      },
      practiceSet: [
        { prompt: "Name the tense: We are watching a match.", answer: "Present Continuous" },
        { prompt: "Name the tense: He has finished his lunch.", answer: "Present Perfect" },
        { prompt: "Name the tense: They will have left by noon.", answer: "Future Perfect" },
        { prompt: "Name the tense: The bus had gone.", answer: "Past Perfect" },
        { prompt: "What is another name for the Simple Past tense?", answer: "Past Indefinite" },
      ],
      pyqExampleId: "8ec875d0-6ceb-4c31-8b3d-30799fc1f80b",
      traps: [
        {
          title: "Calling every '-ing' form perfect continuous",
          body:
            "Was or were + verb-ing is only the Past Continuous. The Past Perfect Continuous needs 'had been' before the -ing verb.",
        },
        {
          title: "Reading 'have not' as the simple present",
          body:
            "'I have not seen it' is have + past participle, so it is the Present Perfect, even though 'have' looks like a present verb.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spigrte-time-words",
      name: "Time words that fix the tense",
      intuition:
        "Most tense questions hide a clue word that names the time. A finished time in the past wants the simple past; a period that runs up to now wants the present perfect; a deadline in the future wants the future perfect.",
      definition:
        "- **Yesterday, last week, in 2019, two years ago**: finished past time, so the **simple past**.\n" +
        "- **Since, for, yet, already, so far, this week**: a period that reaches up to now, so the **present perfect**.\n" +
        "- **Ago** never goes with the present perfect: say 'I met him two years ago', not 'I have met him two years ago'.\n" +
        "- **By tomorrow, by next Monday**: finished before a future time, so the **future perfect**.\n" +
        "- **When + a short past action**: the longer action that was going on takes the **past continuous**.",
      table: {
        columns: ["Clue word", "Tense", "Example"],
        rows: [
          { cells: ["ago, yesterday, last month", "Simple Past", "We visited Pune last month."] },
          { cells: ["since, for, so far", "Present Perfect", "He has lived here since 2020."] },
          { cells: ["yet, already, this week", "Present Perfect", "She has not called yet."] },
          { cells: ["by tomorrow, by next week", "Future Perfect", "I will have finished the book by Friday."] },
          { cells: ["when + short past action", "Past Continuous", "I was cooking when the lights went out."] },
          { cells: ["now, look, listen", "Present Continuous", "Listen! The baby is crying."] },
        ],
        caption: "Find the clue word first, then pick the option whose tense matches it.",
      },
      selfCheckExample: {
        prompt: "Choose the verb: My uncle ____ (has visited / visited) us three days ago.",
        steps: [
          "The clue word is 'ago', which names a finished past time.",
          "A finished past time takes the simple past, and 'ago' never goes with 'has'.",
        ],
        answer: "My uncle visited us three days ago.",
      },
      practiceSet: [
        { prompt: "Fill in: She ____ (is / has been) ill since Sunday.", answer: "has been" },
        { prompt: "Fill in: We ____ (go / went) to Goa last year.", answer: "went" },
        { prompt: "Fill in: By next June I ____ (will finish / will have finished) school.", answer: "will have finished" },
        { prompt: "Fill in: The phone rang while I ____ (bathed / was bathing).", answer: "was bathing" },
        { prompt: "Fill in: He ____ (did not reply / has not replied) to my letter yet.", answer: "has not replied" },
      ],
      pyqExampleId: "b11db206-1b10-435a-91f4-a47adaec0d93",
      traps: [
        {
          title: "Putting 'ago' with the present perfect",
          body:
            "'Has been built two years ago' is wrong. A word like ago or last year names a finished time, and a finished time takes the simple past: 'was built two years ago'.",
        },
        {
          title: "Using the simple past with 'since'",
          body:
            "'I did not eat since morning' is wrong. Since marks a period that runs up to now, so it takes the present perfect: 'I have not eaten since morning'.",
        },
        {
          title: "Using the simple future with 'by'",
          body:
            "'By Monday' means finished before Monday, so the verb is the future perfect: 'will have done', not 'will do' or 'will be doing'.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spigrte-sequence",
      name: "Sequence of tenses: a past main verb pulls the next verb into the past",
      intuition:
        "When the main part of a sentence is in the past, the part that depends on it usually goes into the past too. If one past action happened before another, the earlier one takes 'had'.",
      definition:
        "- A past main verb (knew, said, thought, was) is followed by a past verb: 'I hadn't gone out because I **was** tired', not 'because I am tired'.\n" +
        "- Of two past actions, the **earlier** one takes the **past perfect** (had + past participle): 'She saw that he **had left**.'\n" +
        "- After **before**, the event that had not yet happened may take the past perfect: 'The film was over before we had found our seats.'\n" +
        "- A universal truth stays in the present: 'The teacher said that the earth **moves** round the sun.'",
      table: {
        columns: ["Main verb", "Following verb", "Example"],
        rows: [
          { cells: ["Past (thought)", "Simple past", "I thought he was at home."] },
          { cells: ["Past (found)", "Past perfect for the earlier action", "We found that the shop had closed."] },
          { cells: ["Past (ended)", "Past perfect after before", "The rain ended before we had reached the gate."] },
          { cells: ["Past (taught)", "Present for a universal truth", "He taught us that water boils at 100 degrees."] },
          { cells: ["Present (says)", "Any tense the meaning needs", "She says she will come."] },
        ],
      },
      selfCheckExample: {
        prompt: "Correct the sentence: I stayed at home yesterday because I have a cold.",
        steps: [
          "The main verb 'stayed' and the word 'yesterday' put the sentence in the past.",
          "The reason belongs to the same past time, so 'have' must become 'had'.",
        ],
        answer: "I stayed at home yesterday because I had a cold.",
      },
      practiceSet: [
        { prompt: "Fill in: He said that he ____ (is / was) busy.", answer: "was" },
        { prompt: "Fill in: When we arrived, the train ____ (has left / had left).", answer: "had left" },
        { prompt: "Fill in: She told us that the sun ____ (rises / rose) in the east.", answer: "rises: a universal truth stays in the present" },
        { prompt: "Fill in: I realised that I ____ (have forgotten / had forgotten) my bag.", answer: "had forgotten" },
      ],
      pyqExampleId: "a3b75d9a-4cc6-456c-9aac-dfd915aeb2b2",
      traps: [
        {
          title: "Mixing a present verb into a past sentence",
          body:
            "'I did not come because I am sick' mixes two times. If the main verb is past, the reason is past too: 'because I was sick'.",
        },
        {
          title: "Changing a correct past perfect",
          body:
            "After a past verb such as knew or found, 'had + past participle' for the earlier action is already right. 'No improvement' is often the answer.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spigrte-modals",
      name: "Modals and the base form of the verb",
      intuition:
        "Can, must, should and their family never change their own form, and the verb after them is always the plain base form. Each modal carries its own meaning, so pick it by what the sentence wants to say.",
      definition:
        "- After a **modal** (can, could, may, might, must, should, will, would, shall), use the **base form**: 'can go', never 'can goes', 'can going' or 'can to go'.\n" +
        "- After **going to**, also the base form: 'It is going to snow.'\n" +
        "- **Must** shows duty or need; **can** shows ability; **may** and **might** show possibility or permission; **should** shows advice.\n" +
        "- The pattern 'it takes (someone) time **to** do something' needs 'to' + the base form.",
      table: {
        columns: ["Modal", "Meaning", "Example"],
        rows: [
          { cells: ["must", "duty or necessity", "Students must wear the school uniform."] },
          { cells: ["can, could", "ability", "She can swim across the river."] },
          { cells: ["may, might", "possibility or permission", "It may rain this evening."] },
          { cells: ["should", "advice", "You should drink more water."] },
          { cells: ["going to", "a plan or a sign of what comes next", "Look at that sky: it is going to snow."] },
          { cells: ["it takes ... to", "time needed", "It takes ten minutes to walk to school."] },
        ],
        caption: "The verb after a modal or 'going to' has no -s, no -ing and no 'to'.",
      },
      selfCheckExample: {
        prompt: "Correct the sentence: You should to see a doctor about that cough.",
        steps: [
          "'Should' is a modal, and a modal is followed by the base form with no 'to'.",
          "Drop 'to': should see.",
        ],
        answer: "You should see a doctor about that cough.",
      },
      practiceSet: [
        { prompt: "Fill in: She can ____ (sings / sing) very well.", answer: "sing" },
        { prompt: "Which modal shows a duty: might, must or could?", answer: "must" },
        { prompt: "Fill in: It took him an hour ____ (to finish / finishing) the test.", answer: "to finish" },
        { prompt: "Fill in: The clouds are dark. It is going to ____ (pour / pouring).", answer: "pour" },
      ],
      pyqExampleId: "fd8b2098-43bd-4554-b2f8-359e0ef92559",
      traps: [
        {
          title: "Adding -s or -ing after a modal",
          body:
            "'He can drives' and 'we can't going' are wrong. A modal is always followed by the bare base form: 'can drive', 'can't go'.",
        },
        {
          title: "Choosing a modal by sound, not meaning",
          body:
            "Might, could and can only show possibility or ability. A rule everyone has to follow needs 'must'.",
        },
      ],
    },
  ],
};

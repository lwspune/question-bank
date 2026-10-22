import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_GR_PASSIVE_SPECIAL_NOTE: SubtopicNote = {
  subtopicName: "Passive Questions, Modals and Special Verbs",
  title: "Passive Questions, Modals and Special Verbs",
  oneLineDefinition:
    "Questions, modal verbs and verbs such as make, believe and know follow the same passive steps, with one extra rule each.",
  whyItMatters:
    "Ten questions in the bank, 7 of them MODERATE and 3 EASY: the hardest share of any Grammar page. Each one adds a twist to the plain passive (who becomes by whom, a modal keeps its place, make takes to), and the wrong options are built on missing that twist.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spigrps-questions",
      name: "Questions in the passive: who becomes by whom",
      intuition:
        "A passive question is still a question, so a helping verb must come before the subject. The question word who turns into by whom, because the person who did it now sits after by.",
      definition:
        "- **Who** + active verb becomes **By whom** + helping verb + new subject + past participle.\n" +
        "- A yes or no question starting with **do, does, did** starts with **is, are, was, were** in the passive.\n" +
        "- The helping verb comes **before** the subject: 'By whom was it written?', not 'By whom it was written?'\n" +
        "- The helping verb agrees with the new subject: 'were you', never 'was you'.\n" +
        "- A passive with no doer ('Are you paid?') goes back to an active with a vague subject such as they.",
      table: {
        columns: ["Active question", "Passive question"],
        rows: [
          { cells: ["Who wrote this poem?", "By whom was this poem written?"] },
          { cells: ["Who invites them?", "By whom are they invited?"] },
          { cells: ["Did she bake the bread?", "Was the bread baked by her?"] },
          { cells: ["Does he clean the car?", "Is the car cleaned by him?"] },
          { cells: ["What did they buy?", "What was bought by them?"] },
          { cells: ["When do they pay the workers?", "When are the workers paid?"] },
        ],
        caption: "Question word or by whom first, then the helping verb, then the subject.",
      },
      selfCheckExample: {
        prompt: "Change to the passive voice: Who broke the window?",
        steps: [
          "'Who' becomes 'By whom'.",
          "'Broke' is simple past and the new subject 'the window' is singular, so the helping verb is 'was', placed before the subject.",
        ],
        answer: "By whom was the window broken?",
      },
      practiceSet: [
        { prompt: "Change to the passive: Who built this temple?", answer: "By whom was this temple built?" },
        { prompt: "Change to the passive: Did Ravi win the prize?", answer: "Was the prize won by Ravi?" },
        { prompt: "Change to the passive: Who helps the poor children?", answer: "By whom are the poor children helped?" },
        { prompt: "Change to the active: By whom was the song composed?", answer: "Who composed the song?" },
      ],
      pyqExampleId: "fbd4a488-aaf2-4b51-a537-f5bd31e1802e",
      traps: [
        {
          title: "Writing a passive question in statement order",
          body: "'By whom you were told?' is wrong. A question needs the helping verb before the subject: 'By whom were you told?'",
        },
        {
          title: "Using 'was' with 'you'",
          body: "You always takes were in the past, even for one person: 'By whom were you invited?'",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spigrps-modals",
      name: "Modals in the passive: modal + be + past participle",
      intuition:
        "A modal (can, should, must, need not) does not change at all. Put 'be' after it and then the past participle, and keep any word that describes the result, such as dead or open.",
      definition:
        "- Active **modal + verb** becomes passive **modal + be + past participle**: 'can do' to 'can be done'.\n" +
        "- The modal itself never changes: cannot stays cannot, should stays should.\n" +
        "- A describing word after the object stays after the verb: 'They painted the door green' to 'The door was painted green'.\n" +
        "- Use the correct **past participle**: wind (turn a key) to wound; wound (hurt) to wounded; find to found; hang (a picture) to hung.",
      table: {
        columns: ["Active", "Passive"],
        rows: [
          { cells: ["You must finish the work.", "The work must be finished (by you)."] },
          { cells: ["We cannot solve this sum.", "This sum cannot be solved by us."] },
          { cells: ["They should keep the gate open.", "The gate should be kept open."] },
          { cells: ["You need not lock the drawer.", "The drawer need not be locked."] },
          { cells: ["He may sell the house.", "The house may be sold by him."] },
          { cells: ["Somebody will find the key.", "The key will be found."] },
        ],
        caption: "The modal stays exactly as it was; only be + past participle follows it.",
      },
      selfCheckExample: {
        prompt: "Change to the passive voice: You should water these plants daily.",
        steps: [
          "Keep the modal 'should' and add 'be' + the past participle 'watered'.",
          "The object 'these plants' becomes the subject; the vague 'you' can be dropped.",
        ],
        answer: "These plants should be watered daily.",
      },
      practiceSet: [
        { prompt: "Change to the passive: We must keep the room clean.", answer: "The room must be kept clean." },
        { prompt: "Change to the passive: She can sing this song.", answer: "This song can be sung by her." },
        { prompt: "Change to the passive: They may cancel the match.", answer: "The match may be cancelled." },
        { prompt: "What is the past participle of 'hang' when it means to hang a picture?", answer: "hung" },
      ],
      pyqExampleId: "0dd54080-737c-46db-8634-99bb0ef447d9",
      traps: [
        {
          title: "Changing the modal while changing the voice",
          body: "'Cannot utter' becomes 'cannot be uttered', not 'will not be uttered' or 'did not utter'. The modal is copied unchanged.",
        },
        {
          title: "Dropping the word that shows the result",
          body: "'They shot the thief dead' becomes 'The thief was shot dead'. Dropping dead, or adding at, changes the meaning.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spigrps-special",
      name: "Make, say, know, believe and expect in the passive",
      intuition:
        "After make, an active sentence has a bare verb (made him run), but the passive needs to (he was made to run). Verbs of saying and thinking have two passive shapes: one starting with It and one starting with the person.",
      definition:
        "- **Make, see, hear** + object + bare verb become **was made to, was seen to, was heard to** + verb: 'They made her sing' to 'She was made to sing.'\n" +
        "- **Say, know, believe, think, consider** + that-clause has two passives: 'It is said that he is rich' and 'He is said to be rich.'\n" +
        "- An earlier action in the that-clause becomes **to have + past participle**: 'It is known that he has lied' or 'He is known to have lied.'\n" +
        "- If the people who expect or believe are the same people the clause is about, keep them: 'It was expected by the players that they would win.'",
      table: {
        columns: ["Active", "Passive"],
        rows: [
          { cells: ["The teacher made us stand.", "We were made to stand by the teacher."] },
          { cells: ["People say that he is a thief.", "It is said that he is a thief. He is said to be a thief."] },
          { cells: ["They consider her clever.", "She is considered clever."] },
          { cells: ["They believe him to be honest.", "He is believed to be honest."] },
          { cells: ["People know that she has helped many.", "She is known to have helped many."] },
          { cells: ["We saw him leave.", "He was seen to leave."] },
        ],
        caption: "Make, see and hear lose their bare verb in the passive: add to.",
      },
      selfCheckExample: {
        prompt: "Change to the passive voice: The coach made the boys run ten rounds.",
        steps: [
          "'Made' is simple past and the new subject 'the boys' is plural: were made.",
          "In the passive, make needs 'to' before the next verb: were made to run.",
        ],
        answer: "The boys were made to run ten rounds by the coach.",
      },
      practiceSet: [
        { prompt: "Change to the passive: People say that the fort is haunted.", answer: "It is said that the fort is haunted, or: The fort is said to be haunted." },
        { prompt: "Change to the passive: They heard her cry.", answer: "She was heard to cry." },
        { prompt: "Change to the passive: Everyone knows that he has won twice.", answer: "He is known to have won twice." },
        { prompt: "Change to the passive: We consider him a good player.", answer: "He is considered a good player." },
      ],
      pyqExampleId: "6353860e-9bd5-451d-9a62-1212a7b876c5",
      traps: [
        {
          title: "Leaving out 'to' after a passive 'made'",
          body: "'We were made work' is wrong. In the passive, make, see and hear need to before the next verb: 'were made to work'.",
        },
        {
          title: "Adding a modal or changing the tense",
          body:
            "'They say' becomes 'It is said' or 'He is said', in the same simple present. 'Could be said' or 'has been said' changes the tense.",
        },
        {
          title: "Swapping who did what",
          body:
            "'It is known that the dog bit the man' must keep the dog as the biter. An option that makes the man the doer has reversed the meaning.",
        },
      ],
    },
  ],
};

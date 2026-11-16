import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_EGR_VOICE_NOTE: SubtopicNote = {
  subtopicName: "Active and Passive Voice",
  title: "Active and Passive Voice",
  oneLineDefinition:
    "Changing a sentence from active (the doer is the subject) to passive (the thing done to is the subject), or back, without changing its tense.",
  whyItMatters:
    "24 questions in the Tier II bank, 21 EASY and 3 MODERATE. The tense must stay the same, and most wrong options change it, so checking the tense removes them fast.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssc2egrvo-statement",
      name: "Statements: keep the tense",
      intuition:
        "To make a sentence passive, the object moves to the front, the verb becomes a form of 'be' plus the past participle, and the doer moves to the end after 'by'. The form of 'be' carries the tense, so it must match the active verb's tense.",
      definition:
        "Three steps:\n" +
        "- **Swap:** the object becomes the subject; the subject goes after 'by' (or is dropped if it is 'someone', 'they' or 'people').\n" +
        "- **Verb:** a form of 'be' in the SAME tense + the past participle (created, delivered, made).\n" +
        "- **Pronouns change case:** he becomes him, they become them, after 'by'.\n" +
        "Going back to active, do the same in reverse: 'by the director' becomes the subject.",
      table: {
        columns: ["Tense", "Active", "Passive"],
        rows: [
          { cells: ["Simple present", "She writes a letter.", "A letter is written by her."] },
          { cells: ["Simple past", "She wrote a letter.", "A letter was written by her."] },
          { cells: ["Present continuous", "She is writing a letter.", "A letter is being written by her."] },
          { cells: ["Past continuous", "She was writing a letter.", "A letter was being written by her."] },
          { cells: ["Present perfect", "She has written a letter.", "A letter has been written by her."] },
          { cells: ["Simple future", "She will write a letter.", "A letter will be written by her."] },
          { cells: ["With can, should, must", "She can write a letter.", "A letter can be written by her."] },
        ],
      },
      pyqExampleId: "82bea962-59b5-439a-936c-44471b859710",
      selfCheckExample: {
        prompt: "Change to passive: The farmers were harvesting the wheat. (a) The wheat was harvested by the farmers. (b) The wheat was being harvested by the farmers. (c) The wheat is being harvested by the farmers. (d) The wheat had been harvested by the farmers.",
        steps: ["'Were harvesting' is past continuous.", "Its passive is 'was being' + past participle."],
        answer: "(b) The wheat was being harvested by the farmers.",
      },
      practiceSet: [
        { prompt: "Change to passive: The chef has cooked the meal.", answer: "The meal has been cooked by the chef." },
        { prompt: "Change to active: The windows will be cleaned by the staff tomorrow.", answer: "The staff will clean the windows tomorrow." },
        { prompt: "Change to passive: They elected him captain.", answer: "He was elected captain (by them)." },
        { prompt: "Change to active: The report has been finished.", answer: "Someone has finished the report." },
      ],
      traps: [
        {
          title: "Changing the tense with the voice",
          body: "'Was being painted' is past continuous, so the active is 'were painting', not 'painted' or 'had painted'. Only the voice changes.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssc2egrvo-special",
      name: "Questions, commands and sentences with no doer",
      intuition:
        "A question stays a question, and a command becomes a 'let' sentence. When no doer is named, the active needs a stand-in like someone or they, or becomes a polite command.",
      definition:
        "- **Yes/no question:** 'Did you hear that noise?' becomes 'Was that noise heard by you?'\n" +
        "- **Wh- question:** 'Who taught you?' and 'By whom were you taught?' are each other's voice.\n" +
        "- **Command:** 'Close the door' becomes 'Let the door be closed'; a negative 'Don't park here' becomes 'Let your car not be parked here'.\n" +
        "- **No doer:** 'My request should be considered' becomes 'Please consider my request'.\n" +
        "- **Already passive:** if the sentence given is already in the voice asked for, SSC wants the other voice; read the question twice.",
      table: {
        columns: ["Kind", "Active", "Passive"],
        rows: [
          { cells: ["Yes/no question", "Did she sign the form?", "Was the form signed by her?"] },
          { cells: ["Wh- question", "Why did he call you?", "Why were you called by him?"] },
          { cells: ["Who question", "Who wrote this poem?", "By whom was this poem written?"] },
          { cells: ["Command", "Switch off the fan.", "Let the fan be switched off."] },
          { cells: ["Polite request", "Please check my answer.", "You are requested to check my answer."] },
        ],
      },
      pyqExampleId: "378b5372-b2e5-431a-b62b-0726b7dd4aee",
      selfCheckExample: {
        prompt: "Change to active: Why was the meeting cancelled by the manager? (a) Why did the manager cancel the meeting? (b) Why the manager cancelled the meeting? (c) Why has the manager cancelled the meeting? (d) Why does the manager cancel the meeting?",
        steps: ["The question stays a question in the simple past.", "Simple past question: 'Why did ... cancel'."],
        answer: "(a) Why did the manager cancel the meeting?",
      },
      practiceSet: [
        { prompt: "Change to passive: Open the window.", answer: "Let the window be opened." },
        { prompt: "Change to active: By whom was the bell rung?", answer: "Who rang the bell?" },
        { prompt: "Change to passive: Did they finish the project?", answer: "Was the project finished by them?" },
      ],
      traps: [
        {
          title: "Turning a question into a statement",
          body: "The passive of a question is still a question with the helping verb first ('Was that noise heard...?'). An option without the question form is wrong.",
        },
      ],
    },
  ],
};

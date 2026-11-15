import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_EGR_SPEECH_NOTE: SubtopicNote = {
  subtopicName: "Direct and Indirect Speech",
  title: "Direct and Indirect Speech",
  oneLineDefinition:
    "Turning a speaker's exact words into reported speech, or back: the reporting verb, the tense, the pronouns and the time words all change together.",
  whyItMatters:
    "25 questions in the Tier II bank, 23 EASY and 2 MODERATE, split between statements, questions and commands. Each kind has its own reporting verb, so spotting the kind first rules out half the options.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssc2egrsp-statement",
      name: "Statements: tense, pronouns and time words",
      intuition:
        "When the reporting verb is in the past (said, told), the speaker's words move one step back in time, 'I' becomes he or she, and 'this' and 'tomorrow' become 'that' and 'the next day'.",
      definition:
        "- **Reporting verb:** said to becomes told; join with 'that'.\n" +
        "- **One step back:** is to was, has to had, bought to had bought, will or shall to would.\n" +
        "- **Pronouns** follow who is speaking: 'I' of the speaker becomes he or she.\n" +
        "- **No change** for a universal truth ('two and two make four') or when the reporting verb is in the present.\n" +
        "- **Direct from indirect:** do the steps in reverse: 'would' back to 'will', 'the next day' back to 'tomorrow'.",
      table: {
        columns: ["Direct", "Indirect"],
        rows: [
          { cells: ["am, is / are", "was / were"] },
          { cells: ["has, have / bought", "had / had bought"] },
          { cells: ["will, shall, can", "would, would, could"] },
          { cells: ["this, these, here", "that, those, there"] },
          { cells: ["now, today", "then, that day"] },
          { cells: ["tomorrow, next week", "the next day, the following week"] },
          { cells: ["yesterday, ago", "the previous day, before"] },
        ],
      },
      pyqExampleId: "9ad87a3c-f879-44b4-9fa7-d4dd19b4fb5c",
      selfCheckExample: {
        prompt: "Change to indirect speech: Neha said, \"I have lost my umbrella.\" (a) Neha said that she has lost her umbrella. (b) Neha said that she had lost her umbrella. (c) Neha said that I had lost my umbrella. (d) Neha told that she lost her umbrella.",
        steps: ["'Have lost' moves back to 'had lost'.", "'I' and 'my' become 'she' and 'her'."],
        answer: "(b) Neha said that she had lost her umbrella.",
      },
      practiceSet: [
        { prompt: "Change to indirect: He said, \"I will call you tomorrow.\"", answer: "He said that he would call me the next day." },
        { prompt: "Change to indirect: The teacher said, \"The Earth goes round the Sun.\"", answer: "The teacher said that the Earth goes round the Sun." },
        { prompt: "Change to direct: She said that she was busy that day.", answer: "She said, \"I am busy today.\"" },
      ],
      traps: [
        {
          title: "Shifting a universal truth",
          body: "'Two and two make four' stays in the present even after 'he said'. An option with 'made four' is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssc2egrsp-question",
      name: "Questions",
      intuition:
        "A reported question is no longer a question: 'said' becomes 'asked', the question mark goes, and the words return to statement order (she was doing, not was she doing).",
      definition:
        "- **Yes/no questions:** asked + if or whether. 'Are you upset?' becomes 'asked if she was upset'.\n" +
        "- **Wh- questions:** asked + the wh- word, no 'that'. 'How are you doing?' becomes 'asked how she was doing'.\n" +
        "- **Statement order:** subject before verb in the reported part.\n" +
        "- **Feeling verbs** (jeered, inquired) can replace 'asked' when the quotation shows that feeling.",
      table: {
        columns: ["Direct", "Indirect"],
        rows: [
          { cells: ["He said to me, \"Are you ready?\"", "He asked me if I was ready."] },
          { cells: ["She said, \"Where do you live?\"", "She asked where I lived."] },
          { cells: ["I said, \"Will you help me?\"", "I asked whether he would help me."] },
          { cells: ["They said, \"Why is he late?\"", "They asked why he was late."] },
        ],
      },
      pyqExampleId: "dd970ff6-09ee-43f6-8813-ccbd214cb5b9",
      selfCheckExample: {
        prompt: "Change to indirect: Ravi said to his sister, \"Did you finish your homework?\" (a) Ravi asked his sister did she finish her homework. (b) Ravi asked his sister if she had finished her homework. (c) Ravi told his sister that she finished her homework. (d) Ravi asked his sister if she has finished her homework?",
        steps: ["A yes/no question: asked + if.", "'Did finish' moves back to 'had finished', in statement order, no question mark."],
        answer: "(b) Ravi asked his sister if she had finished her homework.",
      },
      practiceSet: [
        { prompt: "Change to indirect: She said to me, \"Where are you going?\"", answer: "She asked me where I was going." },
        { prompt: "Change to indirect: He said, \"Can you swim?\"", answer: "He asked if I could swim." },
        { prompt: "Change to direct: I asked him if he liked music.", answer: "I said to him, \"Do you like music?\"" },
      ],
      traps: [
        {
          title: "Keeping question order",
          body: "'Asked where was she going' keeps the question order. Reported questions use statement order: 'asked where she was going'.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssc2egrsp-command",
      name: "Commands, requests and exclamations",
      intuition:
        "A command is reported with a verb that shows its force (ordered, told, requested, warned, forbade) followed by 'to' and the plain verb. A negative command takes 'not to', or 'forbade' with 'to'.",
      definition:
        "- **Order or instruction:** ordered, told + to: \"Call the first witness\" becomes 'ordered them to call the first witness'.\n" +
        "- **Request:** requested + to. **Warning:** warned + not to.\n" +
        "- **Don't ...:** told not to, or forbade ... to (never 'forbade not to').\n" +
        "- **Exclamations and oaths** are reported by their meaning: \"So help me heaven!\" becomes 'called upon heaven to witness'.",
      table: {
        columns: ["Direct", "Indirect"],
        rows: [
          { cells: ["The coach said, \"Run faster.\"", "The coach told us to run faster."] },
          { cells: ["She said, \"Please wait here.\"", "She requested me to wait there."] },
          { cells: ["Mother said, \"Don't touch the stove.\"", "Mother warned me not to touch the stove."] },
          { cells: ["He said, \"Don't go out.\"", "He forbade me to go out."] },
        ],
      },
      pyqExampleId: "db7b0114-8263-4b81-841a-3fa0eb029518",
      selfCheckExample: {
        prompt: "Change to indirect: The officer said to the guards, \"Lock the gate.\" (a) The officer told the guards that lock the gate. (b) The officer ordered the guards to lock the gate. (c) The officer asked the guards if they locked the gate. (d) The officer ordered the guards that they lock the gate.",
        steps: ["It is an order.", "Ordered + object + to + plain verb."],
        answer: "(b) The officer ordered the guards to lock the gate.",
      },
      practiceSet: [
        { prompt: "Change to indirect: The doctor said to me, \"Take rest.\"", answer: "The doctor advised me to take rest." },
        { prompt: "Change to indirect: She said to him, \"Don't be late.\"", answer: "She told him not to be late." },
        { prompt: "Change to direct: He requested me to open the door.", answer: "He said to me, \"Please open the door.\"" },
      ],
      traps: [
        {
          title: "Writing 'forbade not to'",
          body: "'Forbade' already means 'told not to'. 'Forbade me to play' is right; 'forbade me not to play' says the opposite.",
        },
      ],
    },
  ],
};

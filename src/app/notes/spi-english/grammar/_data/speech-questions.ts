import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_GR_SPEECH_QUESTIONS_NOTE: SubtopicNote = {
  subtopicName: "Reported Questions, Commands and Exclamations",
  title: "Reported Speech: Questions, Commands and Exclamations",
  oneLineDefinition:
    "A question, an order, a request or an exclamation is reported with its own verb (asked, ordered, requested, exclaimed) and turned into ordinary statement order.",
  whyItMatters:
    "Thirteen questions in the bank, 9 MODERATE, 3 EASY and 1 HARD. The backshift of tenses still applies; what these add is the choice of reporting verb (asked, advised, requested, warned, remarked) and the change from question order to statement order.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spigrsq-questions",
      name: "Reported questions: asked if or whether, and statement order",
      intuition:
        "A reported question is no longer a question, so it loses its question mark and its question order. A yes or no question is joined with if or whether; a question with what, when, why or how keeps that word as the joiner.",
      definition:
        "- The reporting verb becomes **asked** (or enquired, wanted to know).\n" +
        "- A **yes or no** question is joined with **if** or **whether**: 'Is it ready?' to 'asked if it was ready'.\n" +
        "- A **wh-question** keeps its question word: 'Where do you live?' to 'asked where I lived'.\n" +
        "- Use **statement order** (subject before verb) and no question mark: 'asked where she lived', not 'asked where did she live'.\n" +
        "- The tense, pronoun and time-word changes are the same as for statements.\n" +
        "- Going back to direct speech, restore the question order and the question mark, and use **said to** or **asked**.",
      table: {
        columns: ["Direct question", "Reported question"],
        rows: [
          { cells: ["He said to me, \"Are you hungry?\"", "He asked me if I was hungry."] },
          { cells: ["She said to him, \"Have you finished?\"", "She asked him whether he had finished."] },
          { cells: ["I said to her, \"Where do you live?\"", "I asked her where she lived."] },
          { cells: ["They said to us, \"Why are you laughing?\"", "They asked us why we were laughing."] },
          { cells: ["The guard said, \"Who are you?\"", "The guard asked who I was."] },
        ],
        caption: "If, whether or the wh-word joins; then subject, then verb; then a full stop.",
      },
      selfCheckExample: {
        prompt: "Change to reported speech: Rahul said to his sister, \"Will you lend me your bicycle?\"",
        steps: [
          "It is a yes or no question, so use 'asked ... whether' (or if).",
          "'You' is the sister: she. 'Me' is Rahul: him. 'Your' becomes 'her'.",
          "'Will' moves back to 'would', and the order becomes statement order.",
        ],
        answer: "Rahul asked his sister whether she would lend him her bicycle.",
      },
      practiceSet: [
        { prompt: "Change to reported speech: She said to me, \"Do you like mangoes?\"", answer: "She asked me if I liked mangoes." },
        { prompt: "Change to reported speech: The man said to the boy, \"What is your name?\"", answer: "The man asked the boy what his name was." },
        { prompt: "Change to reported speech: I said to him, \"When will you return?\"", answer: "I asked him when he would return." },
        { prompt: "Change to direct speech: She asked me why I was crying.", answer: "She said to me, \"Why are you crying?\"" },
        { prompt: "Which two words join a reported yes or no question?", answer: "if, whether" },
      ],
      pyqExampleId: "b381159a-454a-426e-95bf-b7288172503e",
      traps: [
        {
          title: "Keeping question order in a reported question",
          body: "'He asked me where was I going' is wrong. A reported question uses statement order: 'He asked me where I was going.'",
        },
        {
          title: "Leaving out the person who was asked",
          body: "When the quotation names the listener, the report keeps that person after asked: 'She asked Ravi whether he was free', not 'Ravi asked whether he was free'.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spigrsq-commands",
      name: "Reported commands, requests, advice and warnings: verb + to",
      intuition:
        "An order or a request has no tense to shift; it becomes a reporting verb plus 'to' and the verb. A 'Don't' order becomes 'not to'. Pick the reporting verb that matches the speaker's tone.",
      definition:
        "- **Order**: told, ordered, commanded + person + **to** + verb.\n" +
        "- **Request** ('please', 'would you mind', 'could you'): **requested** + person + to + verb.\n" +
        "- **Advice** (caring guidance): **advised** + person + to + verb.\n" +
        "- **Warning** ('be careful', 'look out'): **warned** + person + to + verb.\n" +
        "- A negative order ('Don't ...') becomes **not to** + verb: advised him **not to** go.\n" +
        "- A reason given with the order is joined with **as** or **because**, and its tense moves back: 'Be quick; the bus is leaving' becomes 'told me to be quick as the bus was leaving'.\n" +
        "- Any other verb in the sentence still moves back: 'until you have eaten' to 'until he had eaten'.",
      table: {
        columns: ["Direct speech", "Tone", "Reported speech"],
        rows: [
          { cells: ["The officer said, \"Stand up.\"", "order", "The officer ordered them to stand up."] },
          { cells: ["She said to me, \"Please open the window.\"", "request", "She requested me to open the window."] },
          { cells: ["He said, \"Would you mind closing the gate?\"", "polite request", "He requested me to close the gate."] },
          { cells: ["The doctor said, \"Take this medicine twice a day.\"", "advice", "The doctor advised me to take the medicine twice a day."] },
          { cells: ["Father said, \"Don't touch the wire.\"", "warning", "Father warned us not to touch the wire."] },
        ],
        caption: "Reporting verb, then the listener, then to (or not to), then the verb.",
      },
      selfCheckExample: {
        prompt: "Change to reported speech: The coach said to the players, \"Don't drink cold water after the match.\"",
        steps: [
          "It is a negative piece of guidance, so use 'advised ... not to'.",
          "The coach is guiding the players for their own good: advised the players not to drink cold water after the match.",
        ],
        answer: "The coach advised the players not to drink cold water after the match.",
      },
      practiceSet: [
        { prompt: "Change to reported speech: The teacher said to us, \"Sit down.\"", answer: "The teacher told us to sit down." },
        { prompt: "Change to reported speech: She said to him, \"Please wait for me.\"", answer: "She requested him to wait for her." },
        { prompt: "Change to reported speech: Mother said to me, \"Don't play in the sun.\"", answer: "Mother told me not to play in the sun (or advised me not to play in the sun)." },
        { prompt: "Change to reported speech: He said to me, \"Be careful; the water is deep.\"", answer: "He warned me to be careful as the water was deep." },
        { prompt: "Which reporting verb suits 'Would you mind helping me?'", answer: "requested" },
      ],
      pyqExampleId: "cf12bb74-f8ae-47ed-a0ac-27c3aa82fecd",
      traps: [
        {
          title: "Turning a command into a 'that' statement",
          body: "'She advised him that he would not go' turns advice into a forecast. A command or advice is reported with to or not to: 'advised him not to go'.",
        },
        {
          title: "Choosing a reporting verb that changes the tone",
          body: "A kind warning from a parent is advised or warned, never threatened or persuaded. Match the verb to how the words were meant.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spigrsq-exclamations",
      name: "Reported exclamations: exclaimed, confessed, remarked",
      intuition:
        "An exclamation shows a feeling. In reported speech the feeling goes into the reporting verb (exclaimed with joy, confessed with regret), the 'How ...!' or 'What ...!' becomes a plain statement with very or great, and the tense moves back.",
      definition:
        "- **Hurrah!** becomes 'exclaimed with joy that ...'.\n" +
        "- **Alas!** becomes 'exclaimed with sorrow that ...' or 'confessed with regret that ...'.\n" +
        "- **How + adjective ...!** becomes 'exclaimed (or remarked) that it was very + adjective'.\n" +
        "- **What a ...!** becomes 'exclaimed that it was a very ...' or 'a great ...'.\n" +
        "- Drop the exclamation mark and move the tense back as usual.",
      table: {
        columns: ["Direct speech", "Reported speech"],
        rows: [
          { cells: ["He said, \"Hurrah! We have won.\"", "He exclaimed with joy that they had won."] },
          { cells: ["She said, \"Alas! My dog is dead.\"", "She exclaimed with sorrow that her dog was dead."] },
          { cells: ["They said, \"How beautiful the garden is!\"", "They exclaimed that the garden was very beautiful."] },
          { cells: ["He said, \"What a fine day it is!\"", "He exclaimed that it was a very fine day."] },
          { cells: ["She said to me, \"How kind of you!\"", "She remarked that it was very kind of me."] },
        ],
        caption: "The feeling moves into the reporting verb; the sentence becomes a plain statement.",
      },
      selfCheckExample: {
        prompt: "Change to reported speech: The girl said, \"What a lovely dress Mina has!\"",
        steps: [
          "'What a ...!' becomes a plain statement with 'very': Mina has a very lovely dress.",
          "The reporting verb becomes 'exclaimed', and 'has' moves back to 'had'.",
        ],
        answer: "The girl exclaimed that Mina had a very lovely dress.",
      },
      practiceSet: [
        { prompt: "Change to reported speech: He said, \"Hurrah! I have passed.\"", answer: "He exclaimed with joy that he had passed." },
        { prompt: "Change to reported speech: She said, \"Alas! I have lost my ring.\"", answer: "She exclaimed with sorrow that she had lost her ring." },
        { prompt: "Change to reported speech: They said, \"How tall the tower is!\"", answer: "They exclaimed that the tower was very tall." },
        { prompt: "Which feeling does 'Alas!' show?", answer: "Sorrow or regret" },
      ],
      pyqExampleId: "c0474ca5-29c0-425a-b5fc-c311d3686449",
      traps: [
        {
          title: "Keeping the present tense after a past reporting verb",
          body: "'He remarked that it is very kind' keeps the wrong tense. After remarked or exclaimed, 'is' moves back to 'was'.",
        },
        {
          title: "Keeping the exclamation word",
          body: "Words like Alas and Hurrah do not appear in the reported sentence. Their feeling goes into the verb: 'confessed with regret', 'exclaimed with joy'.",
        },
      ],
    },
  ],
};

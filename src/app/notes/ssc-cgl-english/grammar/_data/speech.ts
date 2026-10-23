import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_EGR_SPEECH_NOTE: SubtopicNote = {
  subtopicName: "Direct and Indirect Speech",
  title: "Direct and Indirect Speech",
  oneLineDefinition:
    "Reporting what someone said: moving the tense back, changing pronouns and time words, reporting questions and orders, and going from indirect speech back to the words actually spoken.",
  whyItMatters:
    "Eighty-two questions in the bank, 81 of them from the 2025 shifts, which set them both ways: from direct speech to indirect, and from indirect back to direct. Thirty-four are MODERATE, a far higher share than on the voice page.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscegrsp-shift",
      name: "Reporting a statement",
      intuition:
        "When the reporting verb is in the past (said), the spoken words move one step back in time (is becomes was, has becomes had, will becomes would), the pronouns change to fit who is reporting, and words of time and place move too (today becomes that day). A universal truth keeps its present tense.",
      definition:
        "- **Tense back one step:** am, is become was; are becomes were; do becomes did; did becomes had done; has, have become had; will becomes would; can becomes could; may becomes might.\n" +
        "- **No change:** had done, could, might, should, used to, and universal truths (\"water boils at 100 degrees\").\n" +
        "- **Pronouns:** I and we become the speaker's pronoun; you becomes the listener's.\n" +
        "- **Time and place:** now becomes then, today becomes that day, yesterday becomes the day before, tomorrow becomes the next day, last night becomes the previous night, this becomes that, here becomes there, ago becomes before.\n" +
        "- **Said to + a person** becomes **told + the person**; \"that\" may be kept or left out.",
      authoredExample: {
        prompt: "Change to indirect speech: He said, \"I am going to the market today.\"",
        steps: [
          "Said is past, so am going moves back to was going.",
          "I becomes he, and today becomes that day.",
        ],
        answer: "He said that he was going to the market that day.",
      },
      selfCheckExample: {
        prompt: "Change to indirect speech: She said to me, \"I will call you tomorrow.\"",
        steps: ["Said to me becomes told me; will becomes would.", "I becomes she, you becomes me, tomorrow becomes the next day."],
        answer: "She told me that she would call me the next day.",
      },
      practiceSet: [
        { prompt: "Change to indirect speech: He said, \"I can swim.\"", answer: "He said that he could swim." },
        { prompt: "Change to indirect speech: The guide said, \"Light travels faster than sound.\"", answer: "The guide said that light travels faster than sound." },
        { prompt: "What does \"yesterday\" become in indirect speech?", answer: "The day before (or the previous day)" },
        { prompt: "Change to indirect speech: He said to me, \"You are late.\"", answer: "He told me that I was late." },
      ],
      pyqExampleId: "0e99fccd-1129-4944-9957-ce6466e4c886",
      traps: [
        {
          title: "Backshifting a universal truth",
          body: "\"The sun rises in the east\" stays in the present even after said. Only facts that could change move back.",
        },
        {
          title: "Forgetting the time and place words",
          body: "Moving the tense but keeping today, tomorrow or here leaves the option half-converted, and SSC's wrong options are often exactly that.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscegrsp-question",
      name: "Reporting questions, orders and exclamations",
      intuition:
        "A question is reported with asked, in statement order: a yes or no question takes if or whether, a question with where or why keeps that word. An order or request takes told, ordered, requested or advised + to; a negative one takes not to. Let us becomes suggested that we should.",
      definition:
        "- **Yes or no questions:** asked + if or whether + statement order: \"Are you ready?\" becomes \"asked if I was ready\".\n" +
        "- **Question-word questions:** asked + the question word + statement order: \"Where do you live?\" becomes \"asked where I lived\".\n" +
        "- **Orders:** told or ordered + person + to: \"Sit down\" becomes \"told me to sit down\"; \"Don't shout\" becomes \"told me not to shout\".\n" +
        "- **Requests:** \"Please help me\" becomes \"requested me to help him\".\n" +
        "- **Advice:** \"You should rest\" becomes \"advised me to rest\".\n" +
        "- **Let us:** becomes suggested that we should.\n" +
        "- **Exclamations:** \"Alas!\", \"Hurrah!\" become exclaimed with sorrow, or with joy, that ...",
      authoredExample: {
        prompt: "Change to indirect speech: He said to me, \"Where are you going?\"",
        steps: [
          "A question with where is reported with asked + where.",
          "Statement order and a past tense: \"where I was going\".",
        ],
        answer: "He asked me where I was going.",
      },
      selfCheckExample: {
        prompt: "Change to indirect speech: The doctor said to him, \"Don't eat sweets.\"",
        steps: ["A negative command of advice takes advised (or told) + not to.", "\"The doctor advised him not to eat sweets.\""],
        answer: "The doctor advised him not to eat sweets.",
      },
      practiceSet: [
        { prompt: "Change to indirect speech: She said, \"Are you hungry?\"", answer: "She asked if (or whether) I was hungry." },
        { prompt: "Change to indirect speech: He said to us, \"Let us play.\"", answer: "He suggested that we should play." },
        { prompt: "Change to indirect speech: The officer said to the soldiers, \"March!\"", answer: "The officer ordered the soldiers to march." },
        { prompt: "Change to indirect speech: She said, \"Hurrah! We have won.\"", answer: "She exclaimed with joy that they had won." },
      ],
      pyqExampleId: "ac51dc04-d57b-412f-a4a9-b96679377bd8",
      traps: [
        {
          title: "Keeping the question order",
          body: "\"He asked me where was I going\" keeps the question order. A reported question uses statement order: where I was going.",
        },
        {
          title: "That with an order",
          body: "\"She told me that open the window\" is wrong. An order is reported with to: \"She told me to open the window\".",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscegrsp-back",
      name: "From indirect speech back to direct",
      intuition:
        "Going from indirect speech to direct reverses every change: put the words in quotation marks, move the tense one step forward (was becomes is, would becomes will), give the speaker back I and the listener you, and restore today, tomorrow and here.",
      definition:
        "- **Tense forward:** was becomes is or am; were becomes are; had + participle becomes has or have + participle (or the simple past); would becomes will; could becomes can; might becomes may.\n" +
        "- **Pronouns:** the speaker's he or she becomes I; the listener becomes you.\n" +
        "- **Time and place:** that day becomes today, the next day tomorrow, the previous day yesterday, there here.\n" +
        "- **Forms that stay:** must, used to, and a third conditional (had ... would have).\n" +
        "- **Questions and orders:** asked if becomes a yes or no question; told ... to becomes a command.\n" +
        "- **Punctuation:** the spoken words go inside quotation marks with a capital letter; a question ends with a question mark.",
      authoredExample: {
        prompt: "Change to direct speech: She said that she was busy that day.",
        steps: [
          "Was moves forward to am, and she (the speaker) becomes I.",
          "That day becomes today.",
        ],
        answer: "She said, \"I am busy today.\"",
      },
      selfCheckExample: {
        prompt: "Change to direct speech: He told me that he would meet me there the next day.",
        steps: ["Told me becomes said to me; would becomes will.", "He becomes I, me becomes you, there becomes here, the next day becomes tomorrow."],
        answer: "He said to me, \"I will meet you here tomorrow.\"",
      },
      practiceSet: [
        { prompt: "Change to direct speech: He said that he had lost his pen.", answer: "He said, \"I have lost my pen.\"" },
        { prompt: "Change to direct speech: She asked me if I liked tea.", answer: "She said to me, \"Do you like tea?\"" },
        { prompt: "Change to direct speech: The teacher told us to be quiet.", answer: "The teacher said to us, \"Be quiet.\"" },
        { prompt: "Going back to direct speech, does must change?", answer: "No: must stays must." },
      ],
      pyqExampleId: "7ab1c5a0-7af2-4e02-bfc2-985f8dd6d2f3",
      traps: [
        {
          title: "Moving a fixed form forward",
          body: "Used to, must and a third conditional (had known ... would have) stay as they are. Moving them forward gives a wrong option.",
        },
        {
          title: "Leaving the speaker in the third person",
          body: "In the spoken words the speaker says I. \"He said, 'He will come'\" usually means someone else will come, which changes the sense.",
        },
      ],
    },
  ],
};

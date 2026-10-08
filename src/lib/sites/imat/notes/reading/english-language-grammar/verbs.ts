import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_ENG_VERBS_NOTE: SubtopicNote = {
  subtopicName: "Verb Forms and Voice",
  title: "Tenses, Voice, Reported Speech and Conditionals",
  oneLineDefinition:
    "The verb carries time, aspect and voice; recognising its form lets you spot a passive, report speech correctly and match the two halves of a conditional.",
  whyItMatters:
    "The 2024 ministry paper asked which of five sentences has a passive verb, the only grammar question of the current format so far. The wrong options were active sentences in different tenses, so knowing the tenses is what makes the passive easy to spot.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-eng-tenses",
      name: "The English tenses: time and aspect",
      intuition:
        "Every English verb form combines a time (past, present, future) with an aspect: simple (a fact or a whole event), continuous (an action in progress), perfect (completed before a later point), or perfect continuous (going on up to a point). Look at the helping verbs and at the form of the main verb, and you know the tense.",
      definition:
        "- **Simple**: the base form or the past form (works, worked, will work).\n" +
        "- **Continuous** (progressive): a form of **be** + the **-ing** form (is working).\n" +
        "- **Perfect**: a form of **have** + the **past participle** (has worked).\n" +
        "- **Perfect continuous**: **have been** + the **-ing** form (has been working).\n" +
        "- The **past participle** of a regular verb ends in -ed (worked, tested). Irregular verbs have their own: written, sung, taken, begun, known.",
      table: {
        columns: ["Tense", "Form", "Example", "Typical use"],
        rows: [
          { cells: ["Present simple", "base form (+ s after he, she, it)", "She studies every evening.", "Habits and general truths"] },
          { cells: ["Present continuous", "am, is, are + -ing", "She is studying now.", "An action in progress now"] },
          { cells: ["Present perfect", "have, has + past participle", "She has studied anatomy.", "A past action linked to now"] },
          { cells: ["Present perfect continuous", "have, has been + -ing", "She has been studying for two hours.", "An action continuing up to now"] },
          { cells: ["Past simple", "past form", "She studied in Rome.", "A finished action at a past time"] },
          { cells: ["Past continuous", "was, were + -ing", "She was studying when I called.", "An action in progress at a past moment"] },
          { cells: ["Past perfect", "had + past participle", "She had studied before the exam began.", "An action before another past action"] },
          { cells: ["Future simple", "will + base form", "She will study tomorrow.", "Predictions and decisions"] },
          { cells: ["Future continuous", "will be + -ing", "She will be studying at nine.", "In progress at a future moment"] },
          { cells: ["Future perfect", "will have + past participle", "She will have finished by June.", "Completed before a future time"] },
        ],
        caption: "The helping verb carries the time; the form of the main verb (-ing or past participle) carries the aspect.",
      },
      selfCheckExample: {
        prompt: "Which sentence is in the present perfect continuous?",
        options: [
          "The team had tested the vaccine for a year.",
          "The team has been testing the vaccine since March.",
          "The team is testing the vaccine.",
          "The team will have tested the vaccine by May.",
          "The team was testing the vaccine.",
        ],
        steps: [
          "Present perfect continuous = has or have been + -ing. B: 'has been testing'.",
          "A is past perfect (had + past participle). C is present continuous (is + -ing).",
          "D is future perfect (will have + past participle). E is past continuous (was + -ing).",
        ],
        answer: "(B) The team has been testing the vaccine since March.",
      },
      practiceSet: [
        { prompt: "Name the tense: 'They had left before we arrived.'", answer: "Past perfect (had left)." },
        { prompt: "Put 'write' into the present perfect with 'she'.", answer: "She has written." },
        { prompt: "Name the tense: 'I will be travelling at noon.'", answer: "Future continuous." },
      ],
      traps: [
        {
          title: "A past participle alone is not a verb",
          body: "'Written', 'taken' and 'sung' are past participles. They need a helping verb: 'has written' is the present perfect, 'was written' is a passive. The past participle never works as the main verb of a sentence on its own.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-eng-passive",
      name: "Active and passive voice: recognising and forming the passive in every tense",
      intuition:
        "In the active voice the subject does the action: the nurse checked the chart. In the passive the subject receives it: the chart was checked by the nurse. The passive always uses a form of 'be' followed by a past participle, and it is the 'be' that carries the tense.",
      definition:
        "- **Passive** = a form of **be** in the tense of the sentence + the **past participle** of the main verb. The doer may follow after **by**, or be left out.\n" +
        "- Only verbs that take an **object** (transitive verbs) can be passive. 'Arrive', 'sleep' and 'happen' cannot.\n" +
        "- **To form it**: the active object becomes the subject; 'be' takes the tense of the active verb; the old subject moves after 'by' or is dropped.\n" +
        "- **Not passive**: be + -ing is the active continuous ('was singing'); have + past participle is the active perfect ('has sung'); be + an adjective describes a state ('is tired').\n" +
        "- A passive can sit inside a perfect or continuous tense: 'has been sung', 'is being sung'.",
      formula: {
        label: "Passive voice",
        latex: "\\text{passive} = \\textit{be}\\ (\\text{in the tense}) + \\text{past participle}",
        symbols: [
          { symbol: "be", meaning: "am, is, are, was, were, been, being, will be" },
          { symbol: "past participle", meaning: "the third form of the verb: checked, written, taken, sung" },
        ],
      },
      authoredExample: {
        prompt:
          "Rewrite each active sentence in the passive.\n" +
          "(1) The lab analyses the samples.\n" +
          "(2) The lab analysed the samples.\n" +
          "(3) The lab is analysing the samples.\n" +
          "(4) The lab has analysed the samples.\n" +
          "(5) The lab will analyse the samples.",
        steps: [
          "The object 'the samples' becomes the subject; it is plural, so 'be' is plural. The main verb becomes the past participle 'analysed'.",
          "(1) Present simple: are + analysed. The samples are analysed by the lab.",
          "(2) Past simple: were + analysed. The samples were analysed by the lab.",
          "(3) Present continuous: are being + analysed. The samples are being analysed by the lab.",
          "(4) Present perfect: have been + analysed. The samples have been analysed by the lab.",
          "(5) Future: will be + analysed. The samples will be analysed by the lab.",
        ],
        answer: "are analysed; were analysed; are being analysed; have been analysed; will be analysed (each followed by 'by the lab', which may be dropped).",
      },
      selfCheckExample: {
        prompt: "In which of the following sentences is the verb passive?",
        options: [
          "The surgeon has finished the operation.",
          "The patients were waiting in the corridor.",
          "The new ward will open in May.",
          "Penicillin was discovered by Alexander Fleming in 1928.",
          "The nurses are tired after the night shift.",
        ],
        steps: [
          "Look for a form of be followed by a past participle. D: 'was discovered'. The subject, penicillin, receives the action. Passive.",
          "A: has + past participle is the active present perfect; the surgeon does the finishing.",
          "B: were + -ing is the active past continuous; the patients do the waiting.",
          "C: 'open' here takes no object, so the sentence is active. E: 'tired' describes the nurses' state; there is no action done to them.",
        ],
        answer: "(D) Penicillin was discovered by Alexander Fleming in 1928.",
      },
      practiceSet: [
        { prompt: "Make passive: 'Engineers are testing the bridge.'", answer: "The bridge is being tested (by engineers)." },
        { prompt: "Active or passive, and which tense: 'The letters had been opened.'", answer: "Passive, past perfect." },
        { prompt: "Can 'The train arrived late' be made passive?", answer: "No: 'arrive' takes no object." },
        { prompt: "Make active: 'The results will be published by the journal.'", answer: "The journal will publish the results." },
      ],
      traps: [
        {
          title: "Be + -ing is not passive",
          body: "'The choir was singing' is the active past continuous: the choir does the singing. A passive needs a past participle: 'The hymn was being sung'. Do not let the 'was' fool you.",
        },
        {
          title: "A passive need not contain 'by'",
          body: "'The bridge was built in 1890' is passive although the builder is never named. Look for a form of be followed by a past participle, not for the word 'by'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-eng-reported",
      name: "Reported speech: shifting tenses, pronouns and time words",
      intuition:
        "When you report later what someone said, everything moves one step back. Their 'now' is no longer now, their 'I' is now 'he' or 'she', and their present tense becomes past. Questions turn into statements, and orders turn into 'told someone to'.",
      definition:
        "When the reporting verb is in the past (said, told, asked):\n" +
        "- **Tenses move back**: present simple → past simple; present continuous → past continuous; present perfect and past simple → past perfect; will → would; can → could; may → might; must → had to (or stays must).\n" +
        "- **Pronouns** change to fit the reporter: I → he or she; my → his or her; you → I or me, when the reporter was the person spoken to.\n" +
        "- **Time and place words** change: now → then; today → that day; tomorrow → the next day; yesterday → the day before; here → there; this → that; ago → before.\n" +
        "- **Questions** become statements with normal word order, using **if** or **whether** for yes or no questions: 'Are you ready?' → she asked if I was ready.\n" +
        "- **Orders** use **told** or **asked** + **to**: 'Sit down.' → he told me to sit down. 'Don't touch it.' → he told me not to touch it.\n" +
        "- No backshift is needed after a present reporting verb ('she says') or for a statement that is still true ('He said that water boils at 100 °C').",
      authoredExample: {
        prompt:
          "A doctor spoke to you yesterday. Report each sentence, starting 'The doctor said' or 'The doctor asked' or 'The doctor told me'.\n" +
          "(1) 'I am checking your results now.'\n" +
          "(2) 'Did you take the tablets yesterday?'\n" +
          "(3) 'You will feel better tomorrow.'\n" +
          "(4) 'Rest for two days.'",
        steps: [
          "(1) am checking → was checking; I → she; your → my; now → then. The doctor said that she was checking my results then.",
          "(2) A yes or no question: use 'if' and statement order. did take → had taken; yesterday → the day before. The doctor asked if I had taken the tablets the day before.",
          "(3) will → would; you → I; tomorrow → the next day. The doctor said that I would feel better the next day.",
          "(4) An order: told me + to + base form. The doctor told me to rest for two days.",
        ],
        answer: "She was checking my results then; if I had taken the tablets the day before; I would feel better the next day; told me to rest for two days.",
      },
      selfCheckExample: {
        prompt: "Last week Maria said: 'I have finished my report today.' Which is the correct reported form?",
        options: [
          "Maria said she had finished her report that day.",
          "Maria said she has finished her report today.",
          "Maria said I had finished my report that day.",
          "Maria said she finished her report tomorrow.",
          "Maria said she had finished her report the day before.",
        ],
        steps: [
          "Three changes: have finished → had finished; I and my → she and her; today → that day. A makes all three.",
          "B keeps the tense and 'today', but Maria spoke last week, so her 'today' is not today. C forgets to change the pronouns, so it now says the reporter finished the report.",
          "D uses the wrong tense and the wrong time word. E moves the event to the day before she spoke; her 'today' was the day she spoke, which is 'that day'.",
        ],
        answer: "(A) Maria said she had finished her report that day.",
      },
      practiceSet: [
        { prompt: "Report: 'I can swim.' (Luca said ...)", answer: "Luca said he could swim." },
        { prompt: "Report: 'Where do you live?' (She asked me ...)", answer: "She asked me where I lived." },
        { prompt: "Report: 'Don't touch the sample.' (He told us ...)", answer: "He told us not to touch the sample." },
      ],
      traps: [
        {
          title: "A reported question loses the question word order",
          body: "'Where is the lab?' becomes 'she asked where the lab was', not 'she asked where was the lab'. A reported question is a statement: subject before verb, and no question mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-eng-conditionals",
      name: "Conditionals: zero, first, second, third and mixed",
      intuition:
        "A conditional joins a condition (the if-clause) to a result (the main clause). The pair of tenses tells you how real the condition is: always true, likely in the future, imaginary now, or imaginary in the past.",
      definition:
        "- The **if-clause** does not take 'will' or 'would' in standard English: 'If it rains', not 'If it will rain'.\n" +
        "- The two clauses can swap places. Use a comma when the if-clause comes first.\n" +
        "- **Unless** means 'if not': 'Unless you hurry' = 'If you do not hurry'.\n" +
        "- In formal English the second conditional uses **were** for every person: 'If I were you'.\n" +
        "- **Mixed** conditionals join a past condition to a present result, or the other way round.",
      table: {
        columns: ["Type", "If-clause", "Main clause", "Example", "Meaning"],
        rows: [
          { cells: ["Zero", "present simple", "present simple", "If you heat ice, it melts.", "Always true: a general fact"] },
          { cells: ["First", "present simple", "will + base form", "If it rains, the match will be cancelled.", "A real, likely future"] },
          { cells: ["Second", "past simple", "would + base form", "If I had more time, I would learn Greek.", "Unreal or unlikely, now or in the future"] },
          { cells: ["Third", "past perfect", "would have + past participle", "If she had studied, she would have passed.", "Unreal past: it did not happen"] },
          { cells: ["Mixed", "past perfect", "would + base form", "If he had taken the job, he would live in Milan now.", "Past condition, present result"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of the following sentences is grammatically correct?",
        options: [
          "If I would know the answer, I would tell you.",
          "If it will rain tomorrow, we stay at home.",
          "If you had asked me, I would have helped you.",
          "If he studies harder, he would pass.",
          "If we heated water to 100 °C, it boils.",
        ],
        steps: [
          "C is a correct third conditional: past perfect in the if-clause, would have + past participle in the main clause.",
          "A and B put 'would' and 'will' in the if-clause. B should be 'If it rains tomorrow, we will stay at home'.",
          "D mixes a first-conditional if-clause with a second-conditional result. E mixes a past if-clause with a present result; a general fact needs the zero conditional: 'If we heat water to 100 °C, it boils'.",
        ],
        answer: "(C) If you had asked me, I would have helped you.",
      },
      practiceSet: [
        { prompt: "Complete in formal English: 'If I ___ (be) you, I would rest.'", answer: "were" },
        { prompt: "Which type is 'If you mix blue and yellow, you get green'?", answer: "Zero conditional (a general fact)." },
        { prompt: "Rewrite with 'unless': 'If you do not hurry, you will miss the bus.'", answer: "Unless you hurry, you will miss the bus." },
      ],
      traps: [
        {
          title: "No will or would after if",
          body: "'If it will rain' and 'If I would have known' are common errors. The if-clause takes the present for a real condition, the past for an unreal present and the past perfect for an unreal past. 'Will' and 'would' belong in the main clause.",
        },
      ],
    },
  ],
};

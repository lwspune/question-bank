import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_POS_VERBS_NOTE: SubtopicNote = {
  subtopicName: "Parts of Speech: Verbs and Verbals",
  title: "Verbs, and the -ing and to- forms",
  oneLineDefinition:
    "A verb is the action or state of the subject. Items ask whether it takes an object, which tense it is in, and what job an -ing or to- form is doing.",
  whyItMatters:
    "Verb items ask three things: which word is the verb, whether it takes an object, and what an -ing or to- form is doing. " +
    "The -ing form is the usual trap: the same word can be a describing word, a naming word or part of a tense.",
  concepts: [
    // C1 — kinds of finite verb
    {
      kind: "formula" as const,
      slug: "cdsenpos-verb-kinds",
      name: "Finite verbs: transitive, intransitive, linking, tense",
      intuition:
        "Every full sentence has a main verb that changes with its subject and its time: he **eats**, they **ate**. " +
        "Then ask one question after it: 'what?' or 'whom?'. If the sentence answers, the verb carries an object.",
      definition:
        "Terms:\n" +
        "- **Finite verb**: the main verb of the sentence; it shows tense and agrees with the subject (The artist **pranced**; The number **leapt**).\n" +
        "- **Transitive verb**: takes an object (Ravi **won** the match: won what? the match).\n" +
        "- **Intransitive verb**: takes no object (The baby **laughed**).\n" +
        "- **Linking verb**: be, seem, become, look. It joins the subject to a description and takes no object (The building **is** ancient). In these items it counts as intransitive.\n" +
        "- **Auxiliary verb**: a helping verb before another verb (is going, **has** eaten, **had** left).\n" +
        "- **Tense**: the time the verb shows. **Present perfect** = has/have + third form (has offered). **Past perfect** = had + third form (had left): an action finished before another past action.\n" +
        "The method:\n" +
        "- Is the word the action or state of the subject? Then it is a verb.\n" +
        "- Ask 'what?' or 'whom?' after it. An answer that is a noun = object = transitive. No answer = intransitive.\n" +
        "- Is it 'be' on its own before a description? Linking verb, not auxiliary.",
      authoredExample: {
        prompt:
          "Name the kind of verb underlined: The farmer \\(\\underline{\\text{sold}}\\) his cows at the fair.",
        steps: [
          "'Sold' is the action of the subject 'The farmer', so it is the finite verb.",
          "Ask 'sold what?' The answer is 'his cows'. That is an object.",
          "A verb with an object is transitive. 'At the fair' only says where.",
        ],
        answer: "Transitive verb.",
      },
      selfCheckExample: {
        prompt:
          "Name the kind of verb underlined: The baby \\(\\underline{\\text{slept}}\\) for three hours.",
        steps: [
          "Ask 'slept what?' There is no answer.",
          "'For three hours' says how long. It starts with the preposition 'for', so it is not an object.",
          "A verb with no object is intransitive.",
        ],
        answer: "Intransitive verb.",
      },
      practiceSet: [
        { prompt: "She \\(\\underline{\\text{seems}}\\) tired.", answer: "Linking (intransitive) verb", method: "it joins 'she' to the description 'tired'" },
        { prompt: "They \\(\\underline{\\text{are}}\\) watching a film.", answer: "Auxiliary verb", method: "it helps the main verb 'watching'" },
        { prompt: "By noon the guests \\(\\underline{\\text{had arrived}}\\).", answer: "Past perfect", method: "had + third form" },
        { prompt: "The children \\(\\underline{\\text{laughed}}\\) loudly.", answer: "Intransitive verb", method: "'loudly' says how; there is no object" },
      ],
      pyqExampleId: "a075b90c-caf6-4f1d-8a27-13636e4f456a",
      traps: [
        {
          title: "Not every word after a verb is an object",
          body:
            "'Slept for three hours', 'walked to school', 'ran fast': none of these has an object. An object is a noun or pronoun that answers 'what?' or 'whom?' with no preposition in front.",
        },
        {
          title: "'Is' alone is not an auxiliary",
          body:
            "'Is' is an **auxiliary** only when another verb follows it (is going). In 'The building is very ancient' it is the main verb, a **linking** verb, and takes no object, so it is intransitive.",
        },
        {
          title: "Name only the underlined word",
          body:
            "In 'Rita \\(\\underline{\\text{eats}}\\) her dinner quickly', the adverb 'quickly' is tempting, but the underlined word is the action: a **verb**. Check which word carries the line before you answer.",
        },
      ],
    },

    // C2 — verbals
    {
      kind: "formula" as const,
      slug: "cdsenpos-verbals",
      name: "Participle, gerund or infinitive",
      intuition:
        "A verbal is a verb form that does another job. The -ing form can describe a noun or name an activity. 'To' + verb can name an activity too. " +
        "Ask what the form is doing in this sentence.",
      definition:
        "The three verbals:\n" +
        "- **Participle**: a verb form used to describe a noun. **Present participle** = -ing (**Noticing** the change, the cadets returned). **Perfect participle** = having + third form (**Having** finished her work, Sharmila left).\n" +
        "- **Gerund**: an -ing form used as a noun: the subject or object of a verb, or after a preposition (**Smoking** is harmful; I am fond of **reading**).\n" +
        "- **Infinitive**: 'to' + the base form of the verb (**to find**, **To swim**). It too can be a subject or an object.\n" +
        "The method for an -ing word:\n" +
        "- Can you replace it with 'it' or 'this'? (It is good for health.) Then it names an activity: **gerund**.\n" +
        "- Does it open a phrase before a comma and describe the subject that follows? Or stand before a noun? **Participle**.\n" +
        "- Does it follow is, was, were, are? It is part of the verb's tense (were singing): name it **Verb**.",
      authoredExample: {
        prompt:
          "Name the class of the underlined word: \\(\\underline{\\text{Hearing}}\\) the bell, the students ran out of the room.",
        steps: [
          "Try the 'it' test: 'It the bell, the students ran out' makes no sense, so it is not a gerund.",
          "The -ing phrase comes before a comma and tells us about 'the students', the subject that follows.",
          "An -ing form that describes a noun is a present participle.",
        ],
        answer: "Participle.",
      },
      selfCheckExample: {
        prompt:
          "Name the class of the underlined word: He enjoys \\(\\underline{\\text{painting}}\\) landscapes.",
        steps: [
          "Ask 'enjoys what?' The answer is 'painting landscapes', so the -ing word is the object.",
          "The 'it' test works: 'He enjoys it'.",
          "An -ing form used as a noun is a gerund.",
        ],
        answer: "Gerund.",
      },
      practiceSet: [
        { prompt: "She wants \\(\\underline{\\text{to learn}}\\) French.", answer: "Infinitive", method: "to + base form; the object of 'wants'" },
        { prompt: "The \\(\\underline{\\text{sleeping}}\\) child woke up.", answer: "Participle", method: "it describes the noun 'child'" },
        { prompt: "I am fond of \\(\\underline{\\text{reading}}\\).", answer: "Gerund", method: "it follows the preposition 'of'" },
        { prompt: "They were \\(\\underline{\\text{singing}}\\) when I arrived.", answer: "Verb (part of 'were singing')", method: "it follows 'were', so it is part of the tense" },
      ],
      pyqExampleId: "412bc608-5862-4f3e-8070-1e4726c0930f",
      traps: [
        {
          title: "The same -ing word, three jobs",
          body:
            "'Swimming is good' (gerund, the subject), 'the swimming boy' (participle, describes a noun), 'He is swimming' (part of the verb). Decide by the job, never by the ending.",
        },
        {
          title: "'To' + verb is not a preposition",
          body:
            "'To' before a base verb (to find, to swim) makes an **infinitive**. 'To' before a noun (went to school) is a preposition.",
        },
        {
          title: "Gerund, not just Noun",
          body:
            "A gerund does a noun's job, so 'Noun' looks safe. But when 'Gerund' is offered, it is the exact label for an -ing verb form used as a noun. Likewise, 'Having' in 'Having finished ...' is a perfect participle, not an auxiliary verb.",
        },
      ],
    },

    // C3 — verb form in a blank
    {
      kind: "formula" as const,
      slug: "cdsenpos-verb-form-blank",
      name: "Verb form in a blank: 'were' for the unreal, 'has' for 'it'",
      intuition:
        "Two rules decide most verb blanks here. When a sentence imagines something that is not true, English uses 'were' for every subject. " +
        "And a singular subject takes the singular verb: it **has**, not it have.",
      definition:
        "The unreal 'were' (the **subjunctive**):\n" +
        "- After **if** for something untrue or imagined: If I **were** rich, I would travel.\n" +
        "- After **as if** and **as though**: He talks as if he **were** the boss.\n" +
        "- After **I wish** for a wish about now: I wish it **were** Sunday.\n" +
        "- It is 'were' for every subject: I were, he were, she were.\n" +
        "- A real, possible condition uses the normal tense: If it **rains**, we **will** stay home.\n" +
        "**Agreement** (the verb matches its subject):\n" +
        "- Singular subject (he, she, it, a singular noun): **has**, is, does.\n" +
        "- Plural subject (they, we, plural nouns): **have**, are, do.\n" +
        "- In 'it has had no results', 'has' is the helper and 'had' is the main verb 'have'. Both are needed.",
      authoredExample: {
        prompt:
          "Fill in the blank: If he _______ the captain, he would change the batting order. (a) is (b) was (c) were (d) has been",
        steps: [
          "'He would change' shows the sentence is imagining: he is not the captain.",
          "An imagined condition after 'if' takes the subjunctive 'were', even with 'he'.",
          "'Is' would suit a real condition with 'will'. 'Was' is common in speech but not the exam's answer.",
        ],
        answer: "(c) were.",
      },
      selfCheckExample: {
        prompt:
          "Fill in the blank: The old man talks as if he _______ the owner of the whole street. (a) is (b) were (c) has been (d) be",
        steps: [
          "'As if' introduces something untrue: he does not own the street.",
          "Untrue ideas after 'as if' take 'were'.",
        ],
        answer: "(b) were.",
      },
      practiceSet: [
        { prompt: "The new policy _______ had a good effect on sales. (have / has)", answer: "has", method: "'policy' is singular" },
        { prompt: "If it rains tomorrow, we _______ the match. (will cancel / would cancel)", answer: "will cancel", method: "a real, possible condition" },
        { prompt: "Suppose she _______ here now, what would she say? (is / were)", answer: "were", method: "an imagined situation" },
        { prompt: "The players _______ given their best. (has / have)", answer: "have", method: "'players' is plural" },
      ],
      pyqExampleId: "b6586102-9d9b-4726-904d-edf192607e60",
      traps: [
        {
          title: "'Was' sounds natural, 'were' scores",
          body:
            "In everyday speech many people say 'If I was'. For an unreal case the exam wants **were**, for every subject.",
        },
        {
          title: "Not every 'if' is unreal",
          body:
            "'If it rains, we will stay home' is a real possibility: normal present tense, then 'will'. Use 'were' only when the sentence is imagining something untrue, usually with 'would'.",
        },
        {
          title: "'Has had' is not a mistake",
          body:
            "'It has had no good results' is the present perfect of 'have'. 'It' is singular, so the helper is **has**; 'did' or 'didn't' cannot stand before 'had'.",
        },
      ],
    },
  ],
};

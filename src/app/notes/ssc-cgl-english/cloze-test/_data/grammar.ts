import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_ECZ_GRAMMAR_NOTE: SubtopicNote = {
  subtopicName: "Grammar of the Blank",
  title: "Grammar of the Blank",
  oneLineDefinition:
    "Blanks whose options differ in grammar rather than meaning: the part of speech the slot needs, the form and tense of a verb, the preposition a word takes, and the linker that joins two ideas.",
  whyItMatters:
    "One hundred and thirteen questions in the bank, 57 from the 2023 shifts and 56 from the 2024 shifts, and 100 of them EASY. When the options are forms of one word (is, are, was) or small words (and, but, so), the words around the blank decide, and these are the quickest marks in a passage.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscczgr-slot",
      name: "What the slot needs",
      intuition:
        "Look at the words on each side of the blank. After an article or an adjective comes a noun; before a noun comes an adjective; with a verb comes an adverb. Than needs a comparative, one of the needs a superlative and a plural.",
      definition:
        "- **Noun:** after a, an, the or an adjective, and as the object of a verb: \"a clear description\".\n" +
        "- **Adjective:** before a noun, or after be, become, seem: \"deep sleep\".\n" +
        "- **Adverb:** with a verb: \"sang beautifully\".\n" +
        "- **Comparison:** a comparative before than; as ... as with the plain form; one of the + superlative + plural noun.\n" +
        "- **Articles and determiners:** the for something unique or defined; much with uncountable nouns, many and a few with plurals.\n" +
        "- **Pronouns:** match the noun they stand for: their before a noun, one's after one.",
      authoredExample: {
        prompt: "The guide gave us a clear ___ of the old fort. (a) describe (b) description (c) descriptive (d) describing",
        steps: [
          "After \"a clear\" and before \"of\", the slot needs a noun.",
          "Describe is a verb, descriptive an adjective, describing a verb form; description is the noun.",
        ],
        answer: "(b) description",
      },
      selfCheckExample: {
        prompt: "Mount Everest is the ___ mountain in the world. (a) high (b) higher (c) highest (d) more high",
        steps: ["One mountain out of all in the world: a superlative is needed.", "\"The highest mountain.\""],
        answer: "(c) highest",
      },
      practiceSet: [
        { prompt: "After \"the\" and before \"of\", which part of speech does the slot need?", answer: "A noun" },
        { prompt: "Fill the blank: She sang ___. (beautiful / beautifully)", answer: "beautifully" },
        { prompt: "Fill the blank: one of the best ___ in the team (player / players)", answer: "players" },
        { prompt: "Fill the blank: The sky became ___ before the storm. (dark / darkly)", answer: "dark" },
      ],
      pyqExampleId: "0950a7fc-a391-4377-9eb3-2f6cdd4af29b",
      traps: [
        {
          title: "Choosing by meaning when the options are forms of one word",
          body: "If the options are describe, description and descriptive, the meaning is the same; only the part of speech the slot needs decides.",
        },
        {
          title: "A plain adjective before than",
          body: "Than always needs a comparative: taller than, more useful than. \"Tall than\" is never right.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscczgr-verb",
      name: "The verb's form and tense",
      intuition:
        "A verb blank is settled by three checks: the subject (singular or plural), the time of the passage (present story or past), and the word before the blank (a modal takes the base form; is, are or were before a participle make a passive).",
      definition:
        "- **Agreement:** a singular subject takes a singular verb (\"the fair attracts\"), even when a phrase stands between them.\n" +
        "- **Tense of the passage:** a passage told in the present keeps to the present; one told in the past keeps to the past.\n" +
        "- **Passive:** when the subject receives the action, use be + past participle: \"was built\", \"are used\".\n" +
        "- **After a modal or begins to:** the base form: will go, begins to sink.\n" +
        "- **After have, has, had:** the past participle: have occurred.\n" +
        "- **Parallel lists:** reading, writing and counting, not reading, writing and count.",
      authoredExample: {
        prompt: "The bridge ___ in 1950 by a British firm. (a) built (b) was built (c) has built (d) builds",
        steps: [
          "The bridge did not build anything; it was built by the firm, so the passive is needed.",
          "\"In 1950\" is a finished past time, so the past passive: was built.",
        ],
        answer: "(b) was built",
      },
      selfCheckExample: {
        prompt: "Every year the fair ___ thousands of visitors. (a) attract (b) attracts (c) attracting (d) attracted",
        steps: ["\"Every year\" marks a habit, so the simple present.", "The fair is singular, so attracts."],
        answer: "(b) attracts",
      },
      practiceSet: [
        { prompt: "After \"will\", which form: go, goes or went?", answer: "go" },
        { prompt: "Fill the blank: The letters were ___ yesterday. (post / posted)", answer: "posted" },
        { prompt: "The passage is told in the past. Fill the blank: He ___ home at six. (reach / reached)", answer: "reached" },
        { prompt: "Fill the blank: Reading, writing and ___ are basic skills. (count / counting)", answer: "counting" },
      ],
      pyqExampleId: "cd651b1a-3c41-47d0-8a88-384ec1aa9caf",
      traps: [
        {
          title: "Ignoring the passage's tense",
          body: "Each blank is part of a passage. If the passage tells a past story, a present-tense option breaks it even when the sentence alone would allow it.",
        },
        {
          title: "Losing the subject behind a phrase",
          body: "In \"The list of names ___ long\", the subject is list, so the verb is is, not are.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscczgr-prep",
      name: "Prepositions after a word",
      intuition:
        "Many words fix the preposition after them (fond of, according to, a surprise to), and phrasal verbs change meaning with the small word (pass on is tell, pass away is die). Read the word before the blank and the phrase after it.",
      definition:
        "- **After an adjective or noun:** fond of, capable of, according to, a surprise to, information about.\n" +
        "- **Time:** on a day (on Monday), in a month or year, at a clock time; since a point of time, for a period.\n" +
        "- **Place and spread:** across the country (all over it), within ourselves (inside), among several.\n" +
        "- **Means:** by (played by blowing, sent by post).\n" +
        "- **Phrasal verbs:** pass on (tell), cover up (hide), bring about (cause), call on (urge).",
      authoredExample: {
        prompt: "She is fond ___ music. (a) of (b) in (c) with (d) at",
        steps: ["Fond takes of.", "\"Fond of music.\""],
        answer: "(a) of",
      },
      selfCheckExample: {
        prompt: "The meeting will be held ___ Monday. (a) in (b) at (c) on (d) by",
        steps: ["Days take on.", "\"On Monday.\""],
        answer: "(c) on",
      },
      practiceSet: [
        { prompt: "Fill the blank: according ___ the rules", answer: "to" },
        { prompt: "Fill the blank: Forty years have passed ___ 1985. (from / since)", answer: "since" },
        { prompt: "Fill the blank: He passed ___ the message to his friends. (on / away)", answer: "on" },
        { prompt: "Fill the blank: The news came as a surprise ___ everyone. (to / for)", answer: "to" },
      ],
      pyqExampleId: "76a29045-ebeb-415a-9025-f55d7b67386c",
      traps: [
        {
          title: "The small word that changes a phrasal verb",
          body: "Pass on means tell, pass away means die; bring about means cause, bring out means publish. Check which meaning the passage needs.",
        },
        {
          title: "Since and for",
          body: "Since takes a point of time (since 1985), for a length of time (for forty years).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscczgr-link",
      name: "Linkers and clause openers",
      intuition:
        "A linker blank asks how two ideas relate: however and although for a contrast, therefore for a result, moreover and besides for an added point, since for a reason, until and when for time. Name the relation first, then choose the word.",
      definition:
        "- **Contrast:** however, although, whereas, yet, but.\n" +
        "- **Result:** therefore, as a result.\n" +
        "- **Addition:** moreover, besides, furthermore, as well as, and.\n" +
        "- **Reason and time:** since and because for a reason; when, while and until for time.\n" +
        "- **Alternatives:** or; neither and nor only in a negative pair.\n" +
        "- **Relative words:** who for people, which for things (and always after a comma), whose for possession.",
      authoredExample: {
        prompt: "He studied hard; ___, he failed the test. (a) therefore (b) however (c) moreover (d) besides",
        steps: [
          "Studying hard and then failing are opposed: a contrast.",
          "Therefore gives a result, moreover and besides add; however contrasts.",
        ],
        answer: "(b) however",
      },
      selfCheckExample: {
        prompt: "___ it was raining, we went for a walk. (a) Because (b) Although (c) Unless (d) Since",
        steps: ["Rain and going for a walk are opposed.", "A contrast inside one sentence takes although."],
        answer: "(b) Although",
      },
      practiceSet: [
        { prompt: "Which linker gives a result: therefore or moreover?", answer: "Therefore" },
        { prompt: "Which linker adds a point: besides or however?", answer: "Besides" },
        { prompt: "Fill the blank: the girl ___ bag was lost (who / whose)", answer: "whose" },
        { prompt: "Fill the blank: Wait here ___ I come back. (until / since)", answer: "until" },
      ],
      pyqExampleId: "44ca363e-43d3-41e8-8b3b-0f13c07e2496",
      traps: [
        {
          title: "A result word after a contrast",
          body: "\"He studied hard; therefore, he failed\" makes no sense. Name the relation before choosing: opposite ideas need a contrast linker.",
        },
        {
          title: "That after a comma",
          body: "A clause after a comma that adds information about a thing takes which, not that: \"the fort, which was built in 1600\".",
        },
      ],
    },
  ],
};

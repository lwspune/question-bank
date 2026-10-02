import type { SubtopicNote } from "@/app/notes/_types";

const COLUMNS = ["Word", "Meaning", "Opposite", "Other options", "Sitting"];

export const CDSEN_ANT_SPEECH_NOTE: SubtopicNote = {
  subtopicName: "Antonyms: Speech and Argument",
  title: "Antonyms: words for speech and argument",
  oneLineDefinition:
    "Words for how people speak and argue: long-winded or brief, clear or murky, praising or blaming, asserting or denying, with the opposites CDS has asked for.",
  whyItMatters:
    "Speech words come in tight families, and the examiner fills the options from the same family as the tested word. A word like 'magniloquent' looks frightening, but if you know it belongs to the 'grand, showy speech' family, you only need the one option that means short and plain. " +
    "Learn each family with its opposite family.",
  concepts: [
    // C1 — many words or few, planned or not
    {
      kind: "reference" as const,
      slug: "cdsenant-wordy",
      name: "Many words or few, planned or not",
      intuition:
        "Two questions about speech: how much is said, and was it planned? Too many words, or grand empty words, is the opposite of short and plain. Speaking on the spot is the opposite of speaking from preparation.",
      definition:
        "- **Too many or too grand:** wordy, verbose, diffuse, garrulous, voluble (talking a lot), magniloquent and bombastic (grand, showy), pompous, turgid, ponderous (heavy and dull).\n" +
        "- **Few and plain:** concise, terse, brief, straightforward, elegant (neat and simple).\n" +
        "- **Unplanned:** extempore, spontaneous, ad lib, unrehearsed.\n" +
        "- **Planned:** prepared, deliberate (done on purpose, after thought).",
      table: {
        columns: COLUMNS,
        rows: [
          { cells: ["eloquently", "fluently and persuasively", "confusingly", "expressively, powerfully, fluently (synonyms)", "2020 (I)"], pyqExampleId: "90b01255-4181-4c49-81df-55a516bb753f" },
          { cells: ["wordy", "using too many words", "concise", "diffuse, garrulous, voluble (synonyms)", "2019 (I)"], pyqExampleId: "087bd0f6-cf69-4166-8c15-7684ad37002d" },
          { cells: ["magniloquent", "grand and showy in speech", "terse", "pompous, turgid, lofty (synonyms)", "2022 (I)"], pyqExampleId: "073d69fc-0611-4c10-99c7-8156db0c3c28" },
          { cells: ["bombastic", "high-sounding but empty", "straight forward", "verbose (synonym), outdated, not true", "2021 (I)"], pyqExampleId: "b490ced2-9af8-4e7a-8942-74accb04fac5" },
          { cells: ["ponderous", "heavy, slow and dull (of writing)", "elegant", "profound, difficult, informative", "2026 (I)"], pyqExampleId: "187dde14-ced6-4b07-92c5-c7d5b85d2138" },
          { cells: ["extempore", "spoken without preparation", "prepared", "unrehearsed, ad lib (synonyms), ready made", "2020 (II)"], pyqExampleId: "d72a07a1-d093-4a7d-a247-a78b52a4431d" },
          { cells: ["spontaneous", "unplanned, arising on impulse", "deliberate", "prepared, alerted, well executed", "2021 (I)"], noteAmber: "Prepared was the opposite of extempore in 2020 (II). Here deliberate fits better: spontaneous is about impulse, deliberate about intention.", pyqExampleId: "a96e8aed-1a50-4e38-901d-b3091f45ee07" },
        ],
        caption: "Prepared and deliberate both oppose the 'unplanned' family; choose by the shade the sentence needs.",
      },
      pyqExampleId: "087bd0f6-cf69-4166-8c15-7684ad37002d",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. The minister's reply was \\(\\underline{\\text{laconic}}\\). (a) brief (b) curt (c) long-winded (d) pithy",
        steps: [
          "Meaning: 'laconic' means using very few words.",
          "Brief, curt and pithy all mean short: strike them.",
          "Long-winded (using far too many words) is the opposite.",
        ],
        answer: "(c) long-winded",
      },
      practiceSet: [
        { prompt: "Opposite of 'magniloquent' (grand and showy in speech)?", answer: "terse" },
        { prompt: "Opposite of 'extempore'?", answer: "prepared" },
        { prompt: "Opposite of 'bombastic'?", answer: "straightforward" },
        { prompt: "Opposite of 'eloquently'? (a) fluently (b) expressively (c) confusingly (d) powerfully", answer: "(c) confusingly", method: "The other three describe good speaking." },
      ],
      traps: [
        {
          title: "Two talkative words are not opposites",
          body:
            "'Garrulous' (talking too much) and 'verbose' (using too many words) belong to the same family as a long-winded word. When they appear as options, they are synonyms to strike, however different they look.",
        },
      ],
    },

    // C2 — clear and obscure, sensible and absurd
    {
      kind: "reference" as const,
      slug: "cdsenant-clarity",
      name: "Clear and obscure, sensible and absurd",
      intuition:
        "Is the meaning easy to see, or hidden? And does the idea make sense, or not? Words for hiding meaning (obscure, equivocal, obfuscated, clandestine) have opposites that bring it into the light (clear, illuminated, conspicuous).",
      definition:
        "- **Hidden or unclear:** obscure, equivocal (open to two meanings), ambiguous, vague, obfuscated (made unclear on purpose), clandestine and covert (secret).\n" +
        "- **Clear or open:** clear, illuminated, conspicuous (easily seen).\n" +
        "- **Sensible:** plausible (believable), reasonable.\n" +
        "- **Not sensible:** absurd, bizarre, unthinkable.",
      table: {
        columns: COLUMNS,
        rows: [
          { cells: ["obscure", "unclear, hard to understand", "clear", "obscene (sound-alike), new, infamous", "2018 (II)"], pyqExampleId: "f66f237d-67fb-4675-8091-e4394c1e229b" },
          { cells: ["equivocal", "open to two meanings, ambiguous", "clear", "obscure, ambiguous, vague (synonyms)", "2024 (II)"], pyqExampleId: "e91326cf-2677-4e95-bc41-be6862dc2d1a" },
          { cells: ["obfuscated", "made unclear on purpose", "illuminated", "mystified, obscured, muddled (synonyms)", "2023 (II)"], pyqExampleId: "31c56653-6fa6-48b9-adf1-9c0b28c9dfb5" },
          { cells: ["plausible", "seeming reasonable, believable", "unthinkable", "acceptable, believable (synonyms), solvable", "2019 (II)"], pyqExampleId: "a14fc40f-14fb-4d54-969c-8ab134963d58" },
          { cells: ["absurd", "wildly unreasonable", "reasonable", "bizarre, meaningless (synonyms), thoughtful", "2021 (I)"], pyqExampleId: "7f3fa845-079f-40de-943a-8d63d02970de" },
          { cells: ["clandestine", "secret and hidden", "conspicuous", "covert, furtive (synonyms), unknown", "2022 (I)"], pyqExampleId: "dad66261-b584-4027-8165-0f84f08d97f4" },
        ],
        caption: "Clear was the opposite for both obscure and equivocal.",
      },
      pyqExampleId: "e91326cf-2677-4e95-bc41-be6862dc2d1a",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. The instructions were \\(\\underline{\\text{explicit}}\\). (a) clear (b) definite (c) vague (d) precise",
        steps: [
          "Meaning: 'explicit' means stated clearly and fully.",
          "Clear, definite and precise mean the same: strike them.",
          "Vague (unclear) is the opposite.",
        ],
        answer: "(c) vague",
      },
      practiceSet: [
        { prompt: "Opposite of 'clandestine' (secret)?", answer: "conspicuous", method: "Easily seen." },
        { prompt: "Opposite of 'obfuscated'?", answer: "illuminated" },
        { prompt: "Opposite of 'absurd'?", answer: "reasonable" },
        { prompt: "Opposite of 'plausible'?", answer: "unthinkable" },
      ],
      traps: [
        {
          title: "Obscure is not obscene",
          body:
            "'Obscene' (offensive, indecent) shares its first letters with 'obscure' (unclear). It is a sound-alike, not an opposite. The opposite of 'obscure' is 'clear'.",
        },
        {
          title: "Unknown is not the opposite of secret",
          body:
            "For 'clandestine' (done in secret), 'unknown' looks close because secret things are unknown. It is on the same side. The opposite is 'conspicuous': plain for all to see.",
        },
      ],
    },

    // C3 — praise and blame
    {
      kind: "reference" as const,
      slug: "cdsenant-praise",
      name: "Praise and blame",
      intuition:
        "Speaking well of someone against speaking badly of them. The tested word is often a verb (chide, denounce, cherish), so the answer must be a verb too.",
      definition:
        "- **Blame:** chide, scold, reprimand, reprove, admonish, denounce (condemn in public), criticise, censure, deprecate (belittle, disapprove of).\n" +
        "- **Praise:** commend, appreciate, value, cherish (hold dear), boast (praise oneself).\n" +
        "- **Argument:** a rebuttal (denial, counter-argument) against acceptance.",
      table: {
        columns: COLUMNS,
        rows: [
          { cells: ["criticisms", "expressions of disapproval", "appreciation", "censure (synonym), scold, scorn", "2018 (I)"], pyqExampleId: "a83501c7-b943-4a5a-a098-8ec2b232ffaf" },
          { cells: ["denounce", "condemn in public", "appreciate", "criticise, censure (synonyms), comment", "2023 (II)"], pyqExampleId: "725b7f4a-f315-47ec-901a-a4e2e3a468b6" },
          { cells: ["chided", "scolded", "commended", "admonished, reprimanded, reproved (synonyms)", "2022 (I)"], pyqExampleId: "1f446581-0cb4-47d6-b054-0f7bc0e914a9" },
          { cells: ["boast", "talk with too much pride about", "deprecate", "bluster, brag, flaunt (synonyms)", "2021 (II)"], pyqExampleId: "3475b578-ea60-4dda-90fd-57a30c222bf9" },
          { cells: ["cherish", "hold dear, love", "deprecate", "value, adore (synonyms), sustain", "2022 (I)"], pyqExampleId: "29452801-b4e9-4b74-82c0-d28e6d1a1055" },
          { cells: ["rebuttal", "a denial, a counter-argument", "acceptance", "refusal, denial (synonyms), kindness", "2018 (II)"], pyqExampleId: "204edb73-de6f-49bf-8140-60b9d7640780" },
        ],
        caption: "Deprecate was the opposite of both boast and cherish: it means to play down or disapprove of.",
      },
      pyqExampleId: "1f446581-0cb4-47d6-b054-0f7bc0e914a9",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. The critics \\(\\underline{\\text{lauded}}\\) her first novel. (a) praised (b) acclaimed (c) hailed (d) condemned",
        steps: [
          "Meaning: 'lauded' means praised highly.",
          "Praised, acclaimed and hailed mean the same: strike them.",
          "Condemned (strongly criticised) is the opposite, and it is a past-tense verb like 'lauded'.",
        ],
        answer: "(d) condemned",
      },
      practiceSet: [
        { prompt: "Opposite of 'denounce'?", answer: "appreciate" },
        { prompt: "Opposite of 'cherish'?", answer: "deprecate" },
        { prompt: "Opposite of the noun 'criticisms'? (a) scold (b) appreciation (c) scorn (d) censure", answer: "(b) appreciation", method: "A noun of the praise family." },
        { prompt: "Opposite of 'rebuttal'?", answer: "acceptance" },
      ],
      traps: [
        {
          title: "Boasting is praise, of yourself",
          body:
            "'Boast' sounds negative because boasting is rude, but it means praising yourself loudly. So its opposite is a play-down word, 'deprecate', and not another blame word like 'bluster'.",
        },
      ],
    },

    // C4 — asserting, persuading, soothing
    {
      kind: "reference" as const,
      slug: "cdsenant-persuade",
      name: "Asserting, persuading, soothing",
      intuition:
        "Words for what we do to an idea or to a person with words: claim it or deny it, win a person over or push them away, calm them or anger them, think about a matter or ignore it.",
      definition:
        "- **Claim against deny:** assert, assertion, insist, declare against deny, denial.\n" +
        "- **Win over against push away:** woo, persuade against discourage.\n" +
        "- **Calm against anger:** placate, pacify, appease against provoke.\n" +
        "- **Think against ignore:** ponder, mull, reflect against ignore.",
      table: {
        columns: COLUMNS,
        rows: [
          { cells: ["assertion", "a firm claim, the enforcing of a right", "denial", "insistence, averment, statement (synonyms)", "2023 (II)"], pyqExampleId: "c7654eff-268e-4585-a7ec-c4f05bcfc832" },
          { cells: ["asserting", "stating or claiming firmly", "denying", "declaring (synonym), supporting, propagating", "2021 (I)"], pyqExampleId: "cc9a89af-d05b-4944-b53f-21d0a9af4d5e" },
          { cells: ["wooing", "trying to win someone over", "discouraging", "persuading, pursuing (synonyms), encouraging", "2020 (I)"], pyqExampleId: "77ce08dd-0535-43f0-8c6b-20d8747bd8cb" },
          { cells: ["placate", "calm someone who is angry", "provoke", "pacify (synonym), persuade, prime", "2026 (II)"], pyqExampleId: "3373edbc-f44d-4c00-bd7e-9d3dc5f687df" },
          { cells: ["ponder", "think carefully about", "ignore", "mull, rethink (synonyms), defer", "2026 (II)"], pyqExampleId: "ce0a4847-e13e-49c2-b2ff-e40aa978e399" },
        ],
        caption: "Assert has been set as a noun (assertion) and as an -ing form (asserting); the answer matched the form each time.",
      },
      pyqExampleId: "3373edbc-f44d-4c00-bd7e-9d3dc5f687df",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. The manager tried to \\(\\underline{\\text{soothe}}\\) the angry customer. (a) calm (b) comfort (c) irritate (d) settle",
        steps: [
          "Meaning: 'soothe' means to calm someone.",
          "Calm, comfort and settle mean the same: strike them.",
          "Irritate (make annoyed) is the opposite.",
        ],
        answer: "(c) irritate",
      },
      practiceSet: [
        { prompt: "Opposite of 'asserting'?", answer: "denying", method: "An -ing word for an -ing word." },
        { prompt: "Opposite of 'wooing'?", answer: "discouraging" },
        { prompt: "Opposite of 'ponder'?", answer: "ignore" },
      ],
      traps: [
        {
          title: "Persuade is not the opposite of every 'soft' verb",
          body:
            "When the tested verb means to calm someone, 'persuade' may sit among the options. Persuading changes a mind; calming changes a mood. Neither is the opposite of the other. Look for the word that makes the person angry: 'provoke', 'irritate', 'enrage'.",
        },
      ],
    },
  ],
};

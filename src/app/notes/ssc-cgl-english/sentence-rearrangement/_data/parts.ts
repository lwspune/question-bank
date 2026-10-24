import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_ESR_PARTS_NOTE: SubtopicNote = {
  subtopicName: "Ordering the Parts of a Sentence",
  title: "Ordering the Parts of a Sentence",
  oneLineDefinition:
    "Rebuilding one sentence from four or five jumbled parts by finding its subject and verb and joining the loose ends of the parts.",
  whyItMatters:
    "Forty-eight questions in the bank, 46 of them from the 2024 shifts and 36 EASY. The parts are short, so the grammar of each join (a subject and its verb, 'the' and its noun, 'had' and its participle) decides the order.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscesrpq-frame",
      name: "Subject, verb and the rest",
      intuition:
        "Rebuild the sentence around its core: the part with the subject (who or what), then the part with its verb, then what the verb needs, and last the place, time and reason. An opening phrase such as \"Despite the rain\" or an instruction such as \"stay calm\" can also start the sentence.",
      definition:
        "1. Find the subject: a noun part that could start the sentence (\"the old bus\", \"a wise man\").\n" +
        "2. Attach the part with its verb (\"carries\", \"has been\", \"provides\").\n" +
        "3. Add what the verb needs: its object or complement.\n" +
        "4. Add the parts for place, time, reason and condition (to the station, every morning, because, when).\n" +
        "- **Openers:** a phrase such as \"Despite the rain\" or \"In the book of\" can come before the subject; an instruction starts with its verb.\n" +
        "- **Reported speech:** a verb such as said or believes is followed by \"that\" and the reported words.\n" +
        "- **Fast route:** the subject part and its verb part usually decide between two options.",
      authoredExample: {
        prompt:
          "Arrange the parts: (P) to the station (Q) the old bus (R) every morning at six (S) carries workers (a) QSPR (b) SQPR (c) QPSR (d) RQSP",
        steps: [
          "The subject is \"the old bus\" (Q), and its verb part is \"carries workers\" (S).",
          "\"To the station\" (P) says where, and \"every morning at six\" (R) says when.",
          "The old bus carries workers to the station every morning at six: QSPR.",
        ],
        answer: "(a) QSPR",
      },
      selfCheckExample: {
        prompt:
          "Arrange the parts: (P) a healthy breakfast (Q) to concentrate in class (R) helps students (S) eaten every day (a) PSRQ (b) RPSQ (c) PRSQ (d) SPRQ",
        steps: [
          "The subject is \"a healthy breakfast\" (P), and \"eaten every day\" (S) describes it, so S sits right after P.",
          "The verb part \"helps students\" (R) needs \"to concentrate in class\" (Q).",
          "A healthy breakfast eaten every day helps students to concentrate in class: PSRQ.",
        ],
        answer: "(a) PSRQ",
      },
      practiceSet: [
        { prompt: "In a jumbled sentence with no opening phrase, which part usually comes first: the subject or the place phrase?", answer: "The subject" },
        { prompt: "Put in order: (P) every monsoon (Q) the river (R) floods", answer: "QRP: The river floods every monsoon." },
        { prompt: "After a verb such as said or believes, what usually follows?", answer: "\"That\" and the reported words." },
        { prompt: "Can an instruction such as \"stay calm\" open the sentence?", answer: "Yes: an instruction starts with its verb." },
      ],
      pyqExampleId: "2670504c-b6de-42f7-ade0-d8521d4d48ea",
      traps: [
        {
          title: "Opening with a part that needs something before it",
          body:
            "A part that starts with \"and\", \"that\", \"because\" or a bare verb (\"has been\") cannot open the sentence. Look for the part that can stand first.",
        },
        {
          title: "Moving a describing phrase away from its noun",
          body:
            "A phrase such as \"eaten every day\" or \"who live alone\" sits right after the noun it describes, even when that puts it between the subject and the verb.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscesrpq-joins",
      name: "Loose ends that must join",
      intuition:
        "Many parts end on a word that cannot stand alone: \"the\" and \"a\" need a noun, \"had\" needs a past participle, \"to\" often needs a verb, a preposition needs its object, and \"who\" or \"because\" needs a clause. Match each loose end with the part that completes it, and the pieces lock together.",
      definition:
        "- **Article and noun:** a, an or the, then any describing words, then the noun (\"a small red car\").\n" +
        "- **Helping verb and verb:** \"had\" + past participle (had gone), \"is going\" + to, \"has been\" + its complement.\n" +
        "- **To + verb:** \"helps them to\" + learn.\n" +
        "- **Preposition and object:** in, at, on, with, of + a noun (\"fell ill with\" + fever).\n" +
        "- **Joining words:** and, because, who, which and that begin a part that follows a complete idea; \"and\" joins two things of the same kind.\n" +
        "- **Fixed patterns:** \"X is considered Y\", \"so much so that\", \"no matter how\".\n" +
        "- **Fast route:** read the last word of each part; it tells you how the next part must begin.",
      authoredExample: {
        prompt:
          "Arrange the parts: (P) forgotten to do it (Q) the boy apologised (R) to the teacher (S) because he had (a) QRSP (b) QSRP (c) SPQR (d) RQSP",
        steps: [
          "\"The boy apologised\" (Q) has the subject and verb, and \"to the teacher\" (R) says to whom.",
          "\"Because he had\" (S) ends on a helping verb, so it needs a past participle: \"forgotten to do it\" (P).",
          "The boy apologised to the teacher because he had forgotten to do it: QRSP.",
        ],
        answer: "(a) QRSP",
      },
      selfCheckExample: {
        prompt:
          "Arrange the parts: (P) an old (Q) my uncle (R) wooden chest (S) gave me (a) QSPR (b) QPRS (c) SQPR (d) PRQS",
        steps: [
          "\"My uncle\" (Q) is the subject and \"gave me\" (S) its verb.",
          "\"An old\" (P) ends on a describing word and needs its noun: \"wooden chest\" (R).",
          "My uncle gave me an old wooden chest: QSPR.",
        ],
        answer: "(a) QSPR",
      },
      practiceSet: [
        { prompt: "A part ends with \"had\". What must the next part begin with?", answer: "A past participle, such as gone or written." },
        { prompt: "A part ends with \"helps them to\". What begins the next part?", answer: "A verb, such as learn." },
        { prompt: "Put the words in order: car, a, red, small.", answer: "A small red car." },
        { prompt: "A part begins with \"who\". What must come just before it?", answer: "The noun it describes, usually a person." },
      ],
      pyqExampleId: "e1de538b-4c3d-47bf-87c8-dd353d2d682f",
      traps: [
        {
          title: "Moving on from a part that ends in 'the'",
          body:
            "A part that ends in \"the\" or \"a\" must be followed by the part with its noun. Any other order leaves the article hanging.",
        },
        {
          title: "Joining 'and' to the wrong half",
          body:
            "\"And\" joins two things of the same kind: two nouns, two verbs or two clauses. Check that what stands on both sides of it matches.",
        },
      ],
    },
  ],
};

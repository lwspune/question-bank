import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PREP_CONNECTORS_NOTE: SubtopicNote = {
  subtopicName: "Discourse Markers and Connectors",
  title: "Connectors: cause, contrast and sequence",
  oneLineDefinition:
    "Connectors join ideas and show how they relate: because of (cause), in spite of (contrast), moreover (addition), until (time). Choose by meaning first, then by what follows the blank.",
  whyItMatters:
    "Connector blanks test two things at once: the meaning (cause or contrast?) and the grammar (is a noun phrase or a clause coming next?). " +
    "An option can have the right meaning and the wrong grammar, such as although before a noun. The two checks below catch both.",
  concepts: [
    // C1 — cause and concession: phrase or clause
    {
      kind: "formula" as const,
      slug: "cdsenprep-cause-concession",
      name: "Because of, in spite of, owing to: phrase or clause",
      intuition:
        "Ask two questions. First, meaning: does the first part **cause** the second, or does it happen **despite** it? Second, grammar: is the blank followed by a **noun phrase** (his illness) or a **clause** (he was ill)? A noun phrase needs a preposition; a clause needs a conjunction.",
      definition:
        "The terms:\n" +
        "- **Concession**: admitting a fact that might have stopped something, which still happened (in spite of the rain, we played).\n" +
        "- **Complex preposition**: a preposition of two or three words (because of, in spite of, owing to, on account of).\n" +
        "- **Conjunction**: a word that joins two clauses (although, because).\n" +
        "The method:\n" +
        "- Decide the meaning: cause, contrast, or something else (instead of, about).\n" +
        "- Look after the blank: noun phrase or clause?\n" +
        "- Pick from the right box below and check the exact form.\n" +
        "The two boxes:\n" +
        "- **Cause + noun phrase**: because of, owing to, due to, on account of, as a consequence of.\n" +
        "- **Contrast + noun phrase**: despite, in spite of, notwithstanding.\n" +
        "- **Cause + clause**: because, as, since. **Contrast + clause**: although, though, even though.\n" +
        "- Other complex prepositions: **in lieu of** = instead of; **concerning** = about.\n" +
        "Items tested this way:\n" +
        "- Despite the construction of new housing (2017 II); in spite of difficulties (2023 II); in spite of the danger (2026 I)\n" +
        "- walked slowly because of his bandaged leg (2023 II); On account of his negligence (2023 II); As a consequence of his illness (2023 II); Owing to his ill health (2022 I)\n" +
        "- Notwithstanding the resistance (2023 II); the car in lieu of his claim (2023 II); questions concerning the future (2023 II)",
      authoredExample: {
        prompt: "The flight was delayed ______ the thick fog. (a) although (b) because (c) because of (d) in spite of",
        steps: [
          "Meaning: the fog caused the delay. So it is cause, not contrast; in spite of is out.",
          "Grammar: 'the thick fog' is a noun phrase, with no verb of its own.",
          "Cause + noun phrase needs a preposition: because of. Because and although are conjunctions and need a clause.",
        ],
        answer: "(c) because of.",
      },
      selfCheckExample: {
        prompt: "______ he was tired, he finished the report. (a) Despite (b) Although (c) Owing to (d) Because of",
        steps: [
          "Meaning: he was tired, yet he finished. That is contrast.",
          "Grammar: 'he was tired' has a subject and a verb, so it is a clause.",
          "Contrast + clause needs a conjunction: although. Despite would need a noun phrase (despite his tiredness).",
        ],
        answer: "(b) Although.",
      },
      practiceSet: [
        { prompt: "______ his hard work, he was promoted. (Owing to / Although)", answer: "Owing to", method: "cause + noun phrase" },
        { prompt: "She smiled ______ she was upset. (despite / though)", answer: "though", method: "contrast + clause" },
        { prompt: "Correct the error: 'He failed despite of his efforts.'", answer: "despite his efforts (or in spite of his efforts)", method: "despite never takes of" },
        { prompt: "He took a cheque ______ cash. (in lieu of / in front of)", answer: "in lieu of", method: "= instead of" },
      ],
      pyqExampleId: "f9e258b7-b19f-4ca0-affb-922fcbe64c7a",
      traps: [
        {
          title: "Despite, or in spite of, but never despite of",
          body:
            "**despite** + noun. **in spite of** + noun. 'Despite of' mixes the two and is always wrong. When it appears among the options, strike it at once.",
        },
        {
          title: "Because of and in spite of point opposite ways",
          body:
            "'He walked slowly ___ his bandaged leg.' The leg is the reason for walking slowly: **because of**. In spite of would mean he walked slowly although his leg was fine, which is the reverse.",
        },
        {
          title: "Half a phrase is no phrase",
          body:
            "**due to**, **owing to**, **on account of**, **as a consequence of** must be complete. Options like 'Due', 'On account' or 'In consequence to' are broken forms.",
        },
        {
          title: "Although cannot sit before a noun",
          body:
            "'Although the danger' is wrong; 'although it was dangerous' is right. If only a noun phrase follows, choose despite or in spite of.",
        },
      ],
    },

    // C2 — sentence-opening discourse markers
    {
      kind: "reference" as const,
      slug: "cdsenprep-markers",
      name: "Sentence-opening discourse markers",
      intuition:
        "A discourse marker opens a sentence (or sits between commas) and tells the reader how this sentence connects to the one before: it adds, it contrasts, it concludes, it moves on in time, or it gives the writer's attitude.",
      definition:
        "The terms:\n" +
        "- **Discourse marker**: a word or phrase that links a sentence to what came before (moreover, however, finally).\n" +
        "- **Additive**: adds a point (moreover, further, besides). **Sequencing**: moves in time or order (later, finally, meanwhile). **Contrast**: however, still. **Emphatic**: indeed, significantly. **Attitude**: shows a feeling (unfortunately).\n" +
        "The method:\n" +
        "- Read the sentence before the blank, if any, and the sentence with the blank.\n" +
        "- Name the link: adding, contrasting, concluding, sequencing, or commenting.\n" +
        "- Pick the marker of that type. It must be an adverb or an adverb phrase, not an adjective.",
      table: {
        columns: ["Marker", "Function", "Sitting"],
        rows: [
          { cells: ["**Moreover**", "adds a further point", "2025 (I)"] },
          { cells: ["**Further**", "adds a further point", "2025 (I)"] },
          { cells: ["**Later**", "moves forward in time", "2025 (I)"] },
          { cells: ["**Meanwhile**", "at the same time, alongside", "2025 (I)"] },
          { cells: ["**Unfortunately**", "the writer's attitude: regret", "2025 (I)"] },
          { cells: ["**therefore**", "result or conclusion; can sit mid-sentence between commas", "2025 (II)"] },
          { cells: ["**Indeed**", "confirms and stresses what was said", "2025 (II)"] },
          { cells: ["**in particular**", "picks out one item to focus on", "2025 (II)"] },
          { cells: ["**Significantly**", "marks what follows as important", "2025 (II)"] },
          { cells: ["**Finally**", "the last point in a sequence", "2025 (II)"] },
        ],
        caption: "A marker is an adverb: Unfortunately, not Unfortunate.",
      },
      pyqExampleId: "a64f160d-4170-4016-927b-1540838af866",
      selfCheckExample: {
        prompt: "The road was closed for repairs. ______, we took a longer route. (a) Moreover (b) Therefore (c) However (d) Meanwhile",
        steps: [
          "The link: the road was closed, so we took another route. That is a result.",
          "Moreover adds a point; However contrasts; Meanwhile is about time.",
          "Therefore marks a result.",
        ],
        answer: "(b) Therefore.",
      },
      practiceSet: [
        { prompt: "He trained very hard. ______, he lost the final. (However / Moreover)", answer: "However", method: "contrast" },
        { prompt: "First, mix the flour and salt. ______, add the water slowly. (Next / Indeed)", answer: "Next", method: "sequence" },
        { prompt: "______, the rain stopped just before the match. (Fortunately / Fortunate)", answer: "Fortunately", method: "an attitude marker must be an adverb" },
        { prompt: "Many fruits, mangoes ______, are rich in vitamin C. (in particular / in fact)", answer: "in particular", method: "picks out one example" },
      ],
      traps: [
        {
          title: "An adjective cannot be a marker",
          body:
            "'**Unfortunate**, the matter cannot be settled' is wrong. Sentence-opening markers are adverbs: **Unfortunately**, **Fortunately**, **Significantly**.",
        },
        {
          title: "Despite and while cannot stand alone",
          body:
            "**Despite** needs a noun after it; **While** needs a clause. Neither can open a sentence followed by a comma. If the blank is followed by a comma, choose a true marker.",
        },
        {
          title: "Manner adverbs are distractors",
          body:
            "Words like Engagingly, Endearingly, Aggrievedly describe how someone does something. They do not link sentences. Strike them first.",
        },
      ],
    },

    // C3 — linking two clauses
    {
      kind: "formula" as const,
      slug: "cdsenprep-clause-links",
      name: "Linking two clauses: while, until, unless, whatever, either or",
      intuition:
        "These words join two clauses and each has one job. **while** = at the same time. **until** = up to the moment. **unless** = if not. **whatever** = no matter what. **either ... or** = one of two. Name the job the sentence needs, then check the verb form that goes with it.",
      definition:
        "The terms:\n" +
        "- **Subordinating conjunction**: joins a clause that depends on the main clause (while, until, unless, whatever).\n" +
        "- **Correlative conjunction**: a pair that works together (either ... or, neither ... nor, both ... and).\n" +
        "The rules:\n" +
        "- **while** + clause = at the same time (during + noun).\n" +
        "- **until** + clause = up to that moment. Use the present tense for the future: until I have found the truth, not until I will find.\n" +
        "- **unless** = if not. It already contains the not, so the verb after it is positive and in the present for a future idea: unless it rains.\n" +
        "- **whatever** + present tense with an instruction: Whatever happens, keep calm.\n" +
        "- **either ... or**: either A or B; either or both = one of the two, or the two together.\n" +
        "Items tested this way:\n" +
        "- I saw Nandini while she was waiting (2024 II); I shall not rest until I have gone to the bottom of this matter (2025 I)\n" +
        "- I'm playing tennis tomorrow unless it rains (2023 I); Whatever happens, please keep calm (2022 I)\n" +
        "- complete either or both courses (2025 II)",
      authoredExample: {
        prompt: "Wait here ______ I come back. (a) during (b) while (c) until (d) since",
        steps: [
          "The job: the waiting goes on up to the moment I return.",
          "Up to a moment = until.",
          "During needs a noun phrase; while means at the same time; since looks back to a starting point.",
          "Note the present tense 'come' even though the return is in the future.",
        ],
        answer: "(c) until.",
      },
      selfCheckExample: {
        prompt: "______ the result, we must accept it calmly. (a) Unless (b) Until (c) Whatever (d) While",
        steps: [
          "The job: no matter what the result is.",
          "No matter what = whatever.",
          "Unless, until and while each need a full clause and give the wrong meaning.",
        ],
        answer: "(c) Whatever.",
      },
      practiceSet: [
        { prompt: "You can take either the train ______ the bus.", answer: "or", method: "either ... or" },
        { prompt: "______ I was cooking, the phone rang.", answer: "While", method: "at the same time, followed by a clause" },
        { prompt: "He will not leave ______ the work is done.", answer: "until" },
        { prompt: "Neither Ravi ______ his sister came to the party.", answer: "nor", method: "neither ... nor" },
      ],
      pyqExampleId: "90bd2a33-f349-40b8-9a63-06ab633cac09",
      traps: [
        {
          title: "Unless already means 'if not'",
          body:
            "'Unless it doesn't rain' says 'if it does not not rain', a double negative. After **unless** the verb is positive.",
        },
        {
          title: "No will after until, unless, when, if",
          body:
            "For a future idea, the clause after these words takes the present tense: until I **finish**, unless it **rains**, when he **comes**. 'Until I will finish' is wrong.",
        },
        {
          title: "While needs a clause, during needs a noun",
          body:
            "'I saw her ___ she was waiting' has a clause after the blank (she was waiting), so **while**. 'During the wait' would take during.",
        },
      ],
    },
  ],
};

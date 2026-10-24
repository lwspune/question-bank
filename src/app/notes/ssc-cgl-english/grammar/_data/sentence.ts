import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_EGR_SENTENCE_NOTE: SubtopicNote = {
  subtopicName: "Sentence Grammar",
  title: "Sentence Grammar",
  oneLineDefinition:
    "Grammar inside one sentence: the tense and conditional a sentence needs, the connectors and relative words that join its clauses, articles and parts of speech, and phrasal verbs and fixed prepositions.",
  whyItMatters:
    "One hundred and five questions in the bank, 25 from the 2023 shifts, 16 from the 2024 shifts and 64 from the 2025 shifts. The 2025 shifts added a new kind of question here: naming the tense of a sentence or the grammatical job of a phrase.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscegrse-tense",
      name: "Tense and conditionals",
      intuition:
        "The time words and the other verb fix the tense. Of two past actions, the earlier takes the past perfect; by + a future time takes the future perfect; an if-clause pairs the present with will, the past with would, and had with would have.",
      definition:
        "- **Two past actions:** the earlier takes the past perfect: \"The film had started before we arrived\".\n" +
        "- **By next year, by the time + present:** the future perfect: \"will have finished\".\n" +
        "- **For the past two months, since:** the present perfect continuous: \"have been working\".\n" +
        "- **Conditionals:** if + present, will; if + past, would; had + participle (or \"Had I ...\"), would have + participle.\n" +
        "- **Time clauses about the future** take the present: \"when she comes\".\n" +
        "- **Scarcely had ... when, no sooner had ... than:** the second action is in the simple past.\n" +
        "- **It is essential (or imperative) that** + base form: \"that he be present\".\n" +
        "- **Naming a tense:** read the helping verb and the main verb's form: \"has been working\" is the present perfect continuous.",
      authoredExample: {
        prompt: "Fill the blank: By next March, she ___ here for ten years. (a) works (b) will have worked (c) worked (d) had worked",
        steps: [
          "\"By next March\" marks an action complete by a future point.",
          "That needs the future perfect: will have worked.",
        ],
        answer: "(b) will have worked",
      },
      selfCheckExample: {
        prompt: "Fill the blank: If you heat ice, it ___. (a) melts (b) melted (c) would melt (d) had melted",
        steps: ["A general truth: if + present, then the present.", "\"It melts.\""],
        answer: "(a) melts",
      },
      practiceSet: [
        { prompt: "Name the tense: They have been playing since noon.", answer: "Present perfect continuous" },
        { prompt: "Fill the blank: Had she asked, I ___ her. (would help / would have helped)", answer: "would have helped" },
        { prompt: "Fill the blank: The film ___ before we reached the hall. (started / had started)", answer: "had started" },
        { prompt: "Fill the blank: It is essential that every member ___ on time. (is / be)", answer: "be" },
      ],
      pyqExampleId: "b349da95-4f46-41b0-b0c4-86bf91b57f01",
      traps: [
        {
          title: "Will in the time clause",
          body: "\"When she will come, I will tell her\" is wrong; the when-clause takes the present: \"When she comes\".",
        },
        {
          title: "The simple past for the earlier action",
          body: "When two past actions are told, the one that happened first takes had + participle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscegrse-join",
      name: "Connectors and relative clauses",
      intuition:
        "Joining words must fit both their partner and the sense: neither with nor, so with that, rather than for a preference. A negative opener such as not until inverts the main clause. Which follows a comma for a thing, whose shows possession, and when or where follows a time or place.",
      definition:
        "- **Pairs:** neither ... nor, either ... or, no sooner ... than, scarcely ... when, so ... that, rather than.\n" +
        "- **Not until, only after** invert the main clause: \"Not until he left did I understand\".\n" +
        "- **Relative words:** who for people, which for things (and always after a comma; never that), whose for possession, when after a time, where after a place.\n" +
        "- **Concession:** nevertheless, nonetheless for \"in spite of that\".\n" +
        "- **Given** + a noun phrase means considering: \"Given the cost, we waited\".\n" +
        "- **A relative clause is an adjective clause:** it describes the noun before it.",
      authoredExample: {
        prompt: "Fill the blank: Not until the rain stopped ___ out. (a) we went (b) did we go (c) we did go (d) went we",
        steps: [
          "\"Not until\" at the start inverts the main clause.",
          "The inverted simple past uses did + subject + base verb: did we go.",
        ],
        answer: "(b) did we go",
      },
      selfCheckExample: {
        prompt: "Fill the blank: The bridge, ___ was built in 1890, is still in use. (a) that (b) which (c) who (d) what",
        steps: ["The clause sits between commas and describes a thing.", "After a comma, a thing takes which."],
        answer: "(b) which",
      },
      practiceSet: [
        { prompt: "Complete the pair: Either you apologise ___ you leave.", answer: "or" },
        { prompt: "Fill the blank: This is the town ___ I was born. (where / which)", answer: "where" },
        { prompt: "Fill the blank: He was so tired ___ he fell asleep at once.", answer: "that" },
        { prompt: "What does the clause \"who lives next door\" do in \"The man who lives next door is a doctor\"?", answer: "It is an adjective (relative) clause describing \"the man\"." },
      ],
      pyqExampleId: "d50dbdec-4eeb-4bff-b452-10aecb92196d",
      traps: [
        {
          title: "That after a comma",
          body: "A clause between commas that describes a thing takes which: \"the bridge, which was built in 1890\". That cannot follow a comma this way.",
        },
        {
          title: "No inversion after not until",
          body: "\"Not until the rain stopped we went out\" is wrong; the main clause must invert: \"did we go out\".",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscegrse-words",
      name: "Articles, agreement and parts of speech",
      intuition:
        "Many questions here test one small word: a or an by sound, the for something particular, a verb that agrees with its true subject, an adverb for a verb, an interjection that fits the feeling, and the job a phrase does in its sentence.",
      definition:
        "- **Articles:** a or an by sound (an Indian, a European, a UFO); the with superlatives, ordinals (the sixth day) and things made particular; none before a person's name.\n" +
        "- **Agreement:** along with and as well as do not change the number; each of takes a singular verb; neither ... nor agrees with the nearer subject.\n" +
        "- **Too and so:** too + adjective + to (too heavy to lift); so + adjective + that.\n" +
        "- **Adverbs:** a verb takes an adverb: spoke fluently.\n" +
        "- **Interjections** match the feeling: wow for wonder, ouch for pain, alas for sorrow, hurrah for joy.\n" +
        "- **A phrase's job:** a participle phrase (\"offering a direct link\") often works like an adverb; a phrase that opens the sentence can modify the whole main clause.\n" +
        "- **Comparison:** of all + the + superlative (the most cost-effective).",
      authoredExample: {
        prompt: "Choose the correct sentence: (a) He is a honest man. (b) He is an honest man. (c) He is the honest man of all. (d) He is honest a man.",
        steps: [
          "Honest begins with a vowel sound (the h is silent), so it takes an.",
          "(c) uses the with a plain adjective as if it were a superlative, and (d) breaks the word order.",
        ],
        answer: "(b) He is an honest man.",
      },
      selfCheckExample: {
        prompt: "Fill the blank: The parcel is too heavy ___ carry. (a) that I (b) for me to (c) so I (d) to me",
        steps: ["Too + adjective is followed by to + verb.", "\"Too heavy for me to carry.\""],
        answer: "(b) for me to",
      },
      practiceSet: [
        { prompt: "Which interjection expresses sorrow: hurrah or alas?", answer: "Alas" },
        { prompt: "Fill the blank: Each of the boys ___ a prize. (has / have)", answer: "has" },
        { prompt: "Fill the blank: She danced ___. (graceful / gracefully)", answer: "gracefully" },
        { prompt: "A or an: ___ one-way street", answer: "A (one begins with a \"w\" sound)" },
      ],
      pyqExampleId: "7288394a-a88e-4b53-864c-8eee54cbf14a",
      traps: [
        {
          title: "An article chosen by the letter",
          body: "It is the first sound that counts: an hour, an honest man, but a one-way street and a European.",
        },
        {
          title: "An interjection for the wrong feeling",
          body: "Ouch is pain and brr is cold. A sentence full of wonder needs wow, not either of them.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscegrse-prep",
      name: "Phrasal verbs and fixed prepositions",
      intuition:
        "A phrasal verb's meaning belongs to the whole phrase, not its parts: put off means postpone, take over means assume control, phase out means withdraw gradually. Many verbs and adjectives fix the preposition after them: comply with, insist on, addicted to, dispose of.",
      definition:
        "The groups:\n" +
        "- **Phrasal verbs asked:** see the table; the small word changes the meaning (call off is cancel, call on is urge or visit).\n" +
        "- **Fixed prepositions:** dispose of (get rid of), addicted to, comply with, insist on, subordinate to, opt against, a discussion of, under these conditions.\n" +
        "- **Fast route:** cover the options, say what the sentence means in one plain word (postpone, reduce, avoid), then find the phrasal verb that means it.",
      table: {
        columns: ["Phrasal verb", "Meaning", "Asked in"],
        rows: [
          { cells: ["break into", "enter by force", "2023"] },
          { cells: ["cut down (on)", "reduce", "2023"] },
          { cells: ["take over", "assume charge from someone", "2023"] },
          { cells: ["come up", "be raised for discussion", "2023"] },
          { cells: ["iron out", "settle a problem", "2023"] },
          { cells: ["pass down", "hand from one person to another", "2023"] },
          { cells: ["put off", "postpone", "2024 (twice)"] },
          { cells: ["come up with", "think of, produce", "2024"] },
          { cells: ["lay out", "set out in detail", "2024"] },
          { cells: ["shy away from", "avoid", "2025"] },
          { cells: ["clean out", "empty of unwanted things", "2025"] },
          { cells: ["take up", "begin, deal with", "2025"] },
          { cells: ["expand on", "explain in more detail", "2025"] },
          { cells: ["phase out", "withdraw gradually", "2025"] },
          { cells: ["arrive at", "reach (an agreement, a conclusion)", "2025 (twice)"] },
          { cells: ["give up", "surrender, betray (one's sources)", "2025"] },
        ],
      },
      pyqExampleId: "05e7add3-f721-47c1-be74-147f6eb094a9",
      selfCheckExample: {
        prompt: "Fill the blank: The match was ___ because of rain. (a) called off (b) called on (c) called up (d) called in",
        steps: ["Rain stops a match from being played: it is cancelled.", "To call off is to cancel."],
        answer: "(a) called off",
      },
      practiceSet: [
        { prompt: "Fill the blank: Please ___ the form before you leave. (fill in / fill on)", answer: "fill in" },
        { prompt: "Fill the preposition: She insisted ___ paying the bill.", answer: "on" },
        { prompt: "Fill the preposition: The old files were disposed ___.", answer: "of" },
        { prompt: "What does \"look after\" mean?", answer: "Take care of" },
      ],
      traps: [
        {
          title: "Reading a phrasal verb word by word",
          body: "Put off has nothing to do with putting; it means postpone. Learn the phrase's meaning as one unit.",
        },
        {
          title: "A near phrase with another meaning",
          body: "Call off is cancel, call on is urge or visit; bring up is raise a topic, bring out is publish. One small word changes the answer.",
        },
      ],
    },
  ],
};

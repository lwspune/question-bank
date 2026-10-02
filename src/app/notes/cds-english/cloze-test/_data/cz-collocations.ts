import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_CZ_COLLOCATIONS_NOTE: SubtopicNote = {
  subtopicName: "Collocations and the Precise Word",
  title: "Collocations, Fixed Phrases and the Precise Word",
  oneLineDefinition:
    "Some blanks have several options with the right grammar. The answer is the word its neighbour naturally goes with, or the one with the exact meaning.",
  whyItMatters:
    "These blanks test vocabulary inside a passage. The wrong options are real words of the right class, often close in meaning, so the slot alone cannot decide. " +
    "The right word is the one English speakers put next to the neighbour by habit, which is why the pairs and phrases tested before are worth learning as units.",
  concepts: [
    // C1 — reference: collocations tested
    {
      kind: "reference" as const,
      slug: "cdsencz-collocation-partners",
      name: "Collocations tested: the word its neighbour accepts",
      intuition:
        "English words have favourite partners. We do business and combat a disease. A word that means nearly the same can still sound wrong next to the partner, " +
        "and the examiner builds the wrong options from exactly such words.",
      definition:
        "The terms:\n" +
        "- **Collocation**: two words that English speakers put together by habit: do business, undergo change, ethical questions.\n" +
        "How to handle them:\n" +
        "- Read the word next to the blank: the verb before a noun, or the noun after an adjective.\n" +
        "- Ask which option that word naturally goes with. Say each pair in your head.\n" +
        "- An option can have the right class and a close meaning and still be wrong, because it does not partner the neighbour.\n" +
        "- Learn the pairs below as units.",
      table: {
        columns: ["Collocation", "In the passage", "Wrong options offered", "Sitting"],
        rows: [
          { cells: ["do business", "when I try to do any business there (at a bank)", "service, deed, act", "2017 (II)"] },
          { cells: ["undergo change", "Ideology also undergoes change.", "went, proceeds", "2023 (II)"] },
          { cells: ["combat diseases", "evolved antibodies to combat autoimmune diseases", "support, observe, invite", "2019 (I)"] },
          { cells: ["ethical questions", "as in all ethical questions", "answers, statements, experiences", "2019 (I)"] },
          { cells: ["numeracy skills", "the distribution of numeracy skills among adults", "number, proficiency, calculation", "2025 (II)"] },
          { cells: ["the amount of light", "the temperatures and the amount of light which suit them", "focus, share, quality", "2019 (II)"] },
          { cells: ["the first instance", "when the first instance for this art form was seen", "incident, accident, events", "2018 (II)"] },
          { cells: ["an agricultural breakthrough", "an early industrial and agricultural breakthrough", "breakout, breaking, investment", "2019 (II)"] },
          { cells: ["driven by cravings", "each person's habits are driven by different cravings", "broken, given, prescribed", "2020 (II)"] },
        ],
        caption: "Every wrong option has the right word class. Only the partner word decides.",
      },
      pyqExampleId: "8bd52464-a542-4207-8758-90f451d1db22",
      selfCheckExample: {
        prompt:
          "The regiment had to ___ a long period of hard training before the war. (a) undergo (b) proceed (c) go (d) precede",
        steps: [
          "The noun after the blank is 'training', which the regiment goes through.",
          "proceed and go need a preposition before a noun; precede means come before, which is not the sense.",
          "You undergo training, change or an operation.",
        ],
        answer: "(a) undergo",
      },
      practiceSet: [
        { prompt: "We need a large ___ of water for the camp. (amount / number)", answer: "amount", method: "amount for things you cannot count; number for things you can." },
        { prompt: "Spot the wrong pair: 'The language has performed great change over the centuries.'", answer: "Wrong. A thing that changes undergoes change.", method: "undergo change" },
        { prompt: "Doctors hope for a ___ in cancer treatment. (breakthrough / breakout)", answer: "breakthrough", method: "A breakout is an escape." },
        { prompt: "He was ___ by ambition. (driven / given)", answer: "driven", method: "driven by a desire or a craving." },
      ],
      traps: [
        {
          title: "Close in meaning, wrong partner",
          body:
            "incident, accident and events all name things that happen. But a first example of something is its **first instance**. Test the option with its neighbour, not on its own.",
        },
        {
          title: "number for something you cannot count",
          body:
            "Light, water and money cannot be counted one by one, so they take **amount**. Soldiers, books and days take number.",
        },
        {
          title: "A general word where an exact one exists",
          body:
            "'the distribution of ___ skills among adults' with number or calculation sounds close. The exact name for the skill of working with numbers is **numeracy**.",
        },
      ],
    },

    // C2 — reference: fixed phrases and phrasal verbs
    {
      kind: "reference" as const,
      slug: "cdsencz-fixed-phrases",
      name: "Fixed phrases and phrasal verbs tested",
      intuition:
        "A fixed phrase is a group of words always used in the same form. Change one word and it breaks. " +
        "A phrasal verb is a verb plus a small word, with a meaning of its own.",
      definition:
        "The terms:\n" +
        "- **Fixed phrase**: words that always go together in one form: see to it that, have no alternative but to.\n" +
        "- **Phrasal verb**: a verb plus a small word such as away, down or up, with its own meaning: keep away from, get bogged down.\n" +
        "How to handle them:\n" +
        "- If the words around the blank look like part of a known phrase, complete the phrase exactly.\n" +
        "- Do not change its small words: 'no alternative but to', not 'no alternative yet to'.\n" +
        "- Learn the tested ones below.",
      table: {
        columns: ["Phrase", "Meaning", "In the passage", "Sitting"],
        rows: [
          { cells: ["see to it that", "make sure that", "the duty of each individual to see to it that we don't use polythene bags", "2021 (II)"] },
          { cells: ["have no alternative but to", "have no other choice than to", "The Government had no alternative but to ban these polythene bags.", "2021 (II)"] },
          { cells: ["keep (someone) away from", "stop someone from reaching something", "keep low-income customers away from formal finance", "2022 (II)"] },
          { cells: ["get bogged down with", "get stuck on something and stop moving forward", "may in the process get bogged down with one or two particular issues", "2023 (II)"] },
          { cells: ["from person to person", "changing with each person", "differ from person to person and behaviour to behaviour", "2020 (II)"] },
          { cells: ["of some kind", "of one type or another", "you are a superman of some kind", "2018 (II)"] },
          { cells: ["from a ... standpoint", "from a point of view", "from a juridical or quasi-juridical standpoint", "2019 (I)"] },
          { cells: ["considered from (a standpoint)", "judged from a point of view", "is generally considered from a juridical or quasi-juridical standpoint", "2019 (I)"] },
        ],
        caption: "Complete the phrase exactly. One changed word breaks it.",
      },
      pyqExampleId: "781f6789-d2c5-4148-9621-506c6aae89a8",
      selfCheckExample: {
        prompt: "The doctor told him to keep ___ from sweets. (a) way (b) off (c) away (d) out",
        steps: [
          "The phrasal verb is keep away from: stay at a distance from.",
          "'way' only looks like away. keep off is used without 'from' ('keep off the grass').",
        ],
        answer: "(c) away",
      },
      practiceSet: [
        { prompt: "Prices vary from shop to ___. (shops / shop)", answer: "shop", method: "from X to X: the same noun twice, singular, no article." },
        { prompt: "Spot the wrong row: 'have no alternative except to'.", answer: "Wrong. The phrase is 'no alternative but to'." },
        { prompt: "Don't get bogged ___ in small details.", answer: "down" },
        { prompt: "From a soldier's ___, the plan is risky. (standpoint / formula)", answer: "standpoint", method: "from a ... standpoint = from a point of view." },
      ],
      traps: [
        {
          title: "Breaking 'from X to X'",
          body:
            "'differ from person to people' or 'to persons' breaks the pattern. Both nouns are the same word, singular, with no article: **from person to person**.",
        },
        {
          title: "Swapping the small word",
          body:
            "'no alternative yet to', 'bogged out', 'keep way from': each looks close but is not English. The small word is part of the phrase.",
        },
        {
          title: "some and same",
          body:
            "'of same kind' is wrong: same needs 'the' (of the same kind). The tested phrase is **of some kind**, meaning of one sort or another.",
        },
      ],
    },

    // C3 — near-synonyms and look-alikes
    {
      kind: "formula" as const,
      slug: "cdsencz-near-synonyms",
      name: "Near-synonyms and look-alikes: test each against the context",
      intuition:
        "Two words can mean nearly the same and still not fit the same place. One may be for a person, the other for a group; one may be for things seen, the other for things heard. " +
        "Other options only look like the right word. Test each option in the full sentence.",
      definition:
        "The terms:\n" +
        "- **Near-synonym**: a word close in meaning to another but different in use: audience (a group that listens or watches together) and spectator (one person watching).\n" +
        "- **Look-alike**: a word that looks or sounds like the right one but means something else: suffused (filled with) and suffixed (added at the end).\n" +
        "The method:\n" +
        "- Put each option in the blank and read the whole sentence.\n" +
        "- Ask: one person or a group? Seen or heard? A cause or a reason? An honour or a prize?\n" +
        "- For a look-alike, say each word's own meaning. Keep the one whose meaning fits.\n" +
        "- Prefer the exact word over a general one.\n" +
        "Pairs tested:\n" +
        "- **honours** (marks of respect given to a person) vs awards, prizes (things won).\n" +
        "- **the reasons** (why a person acts) vs the causes, the responses.\n" +
        "- **attempt** (try; takes its object directly) vs engage (needs 'in').\n" +
        "- **suffused** (filled with a colour or feeling) vs suffixed, surfaced.\n" +
        "- **far-off** (distant in time or place) vs far-out (very strange), far-fetched (hard to believe).\n" +
        "- **victorious** (winning a war or a contest) vs successful, thriving.",
      authoredExample: {
        prompt:
          "The museum guide asked the ___ to stay together as they walked through the halls. (a) mob (b) group (c) crowd (d) gang",
        steps: [
          "All four name many people, so the slot does not decide.",
          "mob: an angry, disorderly crowd. Wrong feeling for a museum visit.",
          "crowd: a large, unorganised mass. A guide does not lead a crowd from hall to hall.",
          "gang: a set of criminals or of labourers. Wrong sense.",
          "group: a small, organised set of people. A guide leads a group.",
        ],
        answer: "(b) group",
      },
      selfCheckExample: {
        prompt:
          "The old soldier's stories were so ___ that nobody believed them. (a) far-off (b) far-fetched (c) far-reaching (d) farther",
        steps: [
          "'nobody believed them': the word must mean hard to believe.",
          "far-off means distant, far-reaching means having a wide effect, farther is a comparison of distance.",
          "far-fetched means hard to believe.",
        ],
        answer: "(b) far-fetched",
      },
      practiceSet: [
        { prompt: "He made an ___ to climb the wall. (attempt / engage)", answer: "attempt", method: "engage is a verb that needs 'in'; attempt is the noun." },
        { prompt: "Her face was ___ with joy. (suffused / suffixed)", answer: "suffused", method: "suffused = filled with." },
        { prompt: "The doctor found the ___ of the fever. (cause / reason)", answer: "cause", method: "A physical event has a cause; a person's choice has a reason." },
        { prompt: "She received many ___ for her service to the nation, among them the Padma Shri. (honours / prizes)", answer: "honours", method: "A mark of respect, not a thing won in a contest." },
      ],
      pyqExampleId: "2d7ce4a1-0961-46d4-bcee-e562c012d766",
      traps: [
        {
          title: "The general word over the exact one",
          body:
            "successful can describe many things. For a side that wins a war, the exact word is **victorious**. When two options fit, ask which one names the situation exactly.",
        },
        {
          title: "Picking by sound",
          body:
            "suffixed and surfaced look like **suffused**. A picture is suffused with expression; nothing in it is suffixed. Say the meaning of each look-alike before you choose.",
        },
        {
          title: "Cause and reason",
          body:
            "'I cannot explain ___ for this' is about why a person behaves as he does, so **the reasons**. causes fits events in nature, such as the causes of a flood.",
        },
      ],
    },
  ],
};

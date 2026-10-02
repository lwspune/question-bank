import type { SubtopicNote } from "@/app/notes/_types";

/** An underlined sentence part, written the way the paper prints it. */
const u = (s: string): string => `\\(\\underline{\\text{${s}}}\\)`;
/** A three-part spotting-errors item with option (d) No error. */
const item = (a: string, b: string, c: string): string =>
  `Find the part with the error. (a) ${u(a)} (b) ${u(b)} (c) ${u(c)} (d) No error`;

export const CDSEN_SEA_REDUNDANCY_CONNECTORS_NOTE: SubtopicNote = {
  subtopicName: "Redundancy, Comparison, Connectors and Idioms",
  title: "Redundancy, comparison, connectors and idioms",
  oneLineDefinition:
    "Four smaller error types: saying the same thing twice, comparing the wrong way, joining clauses with the wrong linker or none, and changing a fixed expression.",
  whyItMatters:
    "Each of these comes up in CDS spotting-errors and sentence-improvement items from 2017 to 2026, a few at a time. " +
    "They are easy marks once you know the patterns, because each one has a short test: cross out the extra word, count the things compared, look for the linker, and check the idiom word for word.",
  concepts: [
    // C1 — redundancy and double negatives
    {
      kind: "formula" as const,
      slug: "cdsensea-redundancy",
      name: "Saying it twice: redundant words and double negatives",
      intuition:
        "Some words already carry a meaning inside them. 'Return' already means 'come back', so 'return back' says 'back' twice. " +
        "Saying the same thing twice is called **redundancy** (or **pleonasm**). A **double negative** is the same fault with 'not': 'unless' already means 'if not', so 'unless he does not' says 'not' twice.",
      definition:
        "**The cross-out test:** cross out the word you suspect. If the meaning does not change, the word was redundant.\n" +
        "**Common redundant pairs:**\n" +
        "- return back, revert back, repeat again, cooperate together, circle around, circumnavigate around.\n" +
        "- the reason is **because** (write 'the reason is **that**'); the most cleverest (write 'the cleverest').\n" +
        "- **that** before a wh-word in a reported question: 'He asked **who** was absent', not 'asked that who'.\n" +
        "- An extra word inside a proverb: 'Where there is a will, there is a way', with no 'then'.\n" +
        "**Double negatives:** these words are already negative and take no second 'not' or 'no':\n" +
        "- **unless** (= if not), **hardly, scarcely, barely, seldom, neither, nor, nobody, nothing**.\n" +
        "- 'Unless you **hurry**', 'There is **hardly any** water', 'I **can hardly** hear you'.",
      authoredExample: {
        prompt: item("The teacher asked him", "to repeat the answer again", "because nobody had heard it."),
        steps: [
          "Read the whole sentence. Nothing sounds broken, so look for a word that says something twice.",
          "'Repeat' already means 'say again'. Cross out 'again': 'to repeat the answer'. The meaning does not change.",
          "So 'again' is redundant. It sits in part (b).",
        ],
        answer: "(b). The teacher asked him **to repeat the answer** because nobody had heard it.",
      },
      selfCheckExample: {
        prompt: item("There is", "hardly no water", "left in the tank."),
        steps: [
          "'Hardly' is already negative: it means 'almost not'.",
          "'Hardly no' is a double negative. With 'hardly', use 'any'.",
          "The error sits in part (b).",
        ],
        answer: "(b). There is **hardly any** water left in the tank.",
      },
      practiceSet: [
        { prompt: "Correct it: 'Unless you do not hurry, you will miss the bus.'", answer: "**Unless you hurry**, you will miss the bus.", method: "'Unless' already means 'if not'." },
        { prompt: "Correct it: 'She asked me that where I lived.'", answer: "She asked me **where** I lived.", method: "No 'that' before a wh-word in a reported question." },
        { prompt: "Correct it: 'The reason he left is because he was ill.'", answer: "The reason he left is **that** he was ill.", method: "'Reason' already means 'because'." },
        { prompt: "Correct it: 'Let us all cooperate together on this project.'", answer: "Let us all **cooperate** on this project.", method: "'Co-' already means 'together'." },
      ],
      pyqExampleId: "877ef4b4-8abd-44dc-b941-56bef9141bb7",
      traps: [
        {
          title: "Look inside the verb",
          body: "Many redundant phrases hide the extra meaning inside the verb's own prefix: **re**turn = come back, **co**operate = work together, **circum**navigate = travel around. Adding 'back', 'together' or 'around' repeats the prefix.",
        },
        {
          title: "'Unless' is already negative",
          body: "'He will be suspended unless he reports' is correct. 'Unless he does not report' means the opposite of what is meant. When you see 'unless', check that no 'not' follows it.",
        },
        {
          title: "'That' with a reported question",
          body: "'That' introduces a reported statement: 'He said **that** he was tired.' A reported question starts with its own wh-word or 'whether', so 'asked that who' has one linker too many.",
        },
        {
          title: "A proverb is quoted exactly",
          body: "A proverb is a fixed form. 'Where there is a will, there is a way' has no 'then', and 'All that glitters is not gold' has no 'which'. One added word is an error.",
        },
      ],
    },

    // C2 — comparison
    {
      kind: "formula" as const,
      slug: "cdsensea-comparison",
      name: "Comparison: twice as much as, fewer, absolute adjectives",
      intuition:
        "A comparison has fixed shapes. A multiple uses 'as ... as': twice **as much as**. Things you can count take **fewer**; amounts you cannot count take **less**. " +
        "And some adjectives, like 'favourite' or 'unique', are already the top of their scale, so 'most' cannot go before them.",
      definition:
        "**Multiples** (twice, three times, half):\n" +
        "- **multiple + as + adjective + as**: 'twice **as much as**', 'three times **as long as**', 'half **as big as**'. Not 'twice more than'.\n" +
        "**Countable vs uncountable:**\n" +
        "- A **countable** noun has a plural (people, books, days): **fewer**, **many**, **number of**.\n" +
        "- An **uncountable** noun has no plural (water, money, time): **less**, **much**, **amount of**.\n" +
        "- A sum of money, a distance or a time taken as one amount uses 'less': 'less than twenty rupees', 'less than five kilometres'.\n" +
        "**Absolute adjectives** cannot be graded: **favourite, unique, perfect, complete, ideal, supreme, round, square**. No 'more' or 'most' before them.\n" +
        "**Two of a kind:** with exactly two things, use the comparative (taller, better), not the superlative. 'Than any' needs '**other**' when the thing is in the same group: 'bigger than any **other** city in India'.",
      authoredExample: {
        prompt: item("Everyone agreed that", "her plan was the most ideal", "solution to the problem."),
        steps: [
          "Read the sentence: it praises one plan above the others.",
          "'Ideal' means 'perfect, the best possible'. Nothing can be more than the best possible, so it is an absolute adjective.",
          "Drop 'most': 'her plan was the ideal solution'.",
          "The error sits in part (b).",
        ],
        answer: "(b). Everyone agreed that her plan was **the ideal** solution to the problem.",
      },
      selfCheckExample: {
        prompt: item("The new flat", "costs three times more than", "the one we rented last year."),
        steps: [
          "A multiple (three times) takes the shape 'three times as ... as'.",
          "The thing measured is cost, an amount, so 'as much as'.",
          "The error sits in part (b).",
        ],
        answer: "(b). The new flat costs **three times as much as** the one we rented last year.",
      },
      practiceSet: [
        { prompt: "Correct it: 'This is the most perfect answer in the class.'", answer: "This is the **best** answer in the class. (Or: This answer is **perfect**.)", method: "'Perfect' is absolute." },
        { prompt: "Correct it: 'He earns twice more than his brother.'", answer: "He earns **twice as much as** his brother." },
        { prompt: "Correct it: 'Of the two sisters, Meena is the tallest.'", answer: "Of the two sisters, Meena is the **taller**.", method: "Two things: the comparative." },
        { prompt: "Correct it: 'Mumbai is bigger than any city in India.'", answer: "Mumbai is bigger than any **other** city in India.", method: "Mumbai is itself a city in India." },
      ],
      pyqExampleId: "040f069b-fe17-45da-ada6-3202247655bf",
      traps: [
        {
          title: "Less with money, fewer with people",
          body: "'Fewer than twenty people' counts people. 'Less than twenty rupees' treats the money as one amount. Ask: am I counting separate things, or measuring an amount?",
        },
        {
          title: "'Most favourite' sounds natural, but is wrong",
          body: "'Favourite' already means 'liked most'. Write 'my **favourite** book', never 'my most favourite book'. The same holds for 'most unique', 'more perfect' and 'most ideal'.",
        },
        {
          title: "'Twice more than'",
          body: "The paper treats 'twice more than' as an error. The safe pattern is always a multiple followed by **as ... as**.",
        },
      ],
    },

    // C3 — joining clauses: conjunctions, correlative pairs, punctuation
    {
      kind: "formula" as const,
      slug: "cdsensea-connectors",
      name: "Joining clauses: conjunctions, pairs and punctuation",
      intuition:
        "A **clause** is a group of words with its own subject and verb. Two clauses need a joining word, a **conjunction** (and, but, so, because), between them. A comma alone cannot do the job. " +
        "Some joining words come in fixed pairs, and the paper often breaks the pair.",
      definition:
        "**Joining two clauses:**\n" +
        "- Two full clauses joined by only a comma make a **comma splice**, an error. Add a conjunction, or use a full stop.\n" +
        "- Two verbs that share one subject still need 'and': 'Feminism grew out of these movements **and** reached maturity ...'.\n" +
        "- An order followed by its result takes **and** (or **or** for a warning): 'Work hard **and** you will pass'; 'Hurry, **or** you will miss the bus'.\n" +
        "**Fixed pairs (correlatives):**\n" +
        "- **between ... and**, **both ... and**, **either ... or**, **neither ... nor**, **not only ... but also**, **no sooner ... than**, **hardly ... when**.\n" +
        "- **although / though** take no 'but' in the second clause ('though ... yet' is allowed).\n" +
        "**Pick the linker by meaning:** 'and' adds, 'but' and 'yet' contrast, 'so' gives a result. A linker that signals the wrong relation is an error.\n" +
        "**The apostrophe** shows possession (the visitor's ticket), never a plain plural (the visitors).",
      authoredExample: {
        prompt: item("The rain stopped at noon,", "the match began", "half an hour later."),
        steps: [
          "Read the sentence. 'The rain stopped at noon' is a full clause. 'The match began half an hour later' is another full clause.",
          "Only a comma joins them. That is a comma splice.",
          "Add a conjunction where the second clause starts: 'and the match began'.",
          "The second clause starts in part (b), so the error sits there.",
        ],
        answer: "(b). The rain stopped at noon, **and the match began** half an hour later.",
      },
      selfCheckExample: {
        prompt: item("The shop stays open", "between 9 a.m.", "to 6 p.m. on weekdays."),
        steps: [
          "'Between' starts a fixed pair. Its partner is 'and'.",
          "'From' pairs with 'to'; 'between' never does.",
          "The wrong partner 'to' sits in part (c).",
        ],
        answer: "(c). The shop stays open between 9 a.m. **and** 6 p.m. on weekdays.",
      },
      practiceSet: [
        { prompt: "Correct it: 'Both Ravi as well as Meena passed the test.'", answer: "**Both** Ravi **and** Meena passed the test." },
        { prompt: "Correct it: 'Neither the captain or the coach spoke to the press.'", answer: "Neither the captain **nor** the coach spoke to the press." },
        { prompt: "Correct it: 'Although he was tired, but he kept working.'", answer: "Although he was tired, he kept working.", method: "One linker per link: drop 'but'." },
        { prompt: "Correct it: 'The doctor's in this hospital are very kind.'", answer: "The **doctors** in this hospital are very kind.", method: "A plain plural takes no apostrophe." },
      ],
      pyqExampleId: "9257deef-d854-4278-acdc-24797c749eb8",
      traps: [
        {
          title: "A comma cannot join two sentences",
          body: "If you could put a full stop at the comma and both halves would stand as sentences, the comma alone is an error. The fault belongs to the part where the second clause begins, because that is where the missing 'and', 'but' or 'so' should go.",
        },
        {
          title: "Between ... to",
          body: "'Between 10 a.m. to 2 p.m.' mixes two pairs. Write 'between 10 a.m. **and** 2 p.m.' or 'from 10 a.m. **to** 2 p.m.'.",
        },
        {
          title: "A linker with the wrong meaning",
          body: "'Yet' and 'but' announce a contrast. In 'They mix with their own community **and** none other', the second part adds to the first; it does not contrast with it. 'Yet none other' is wrong.",
        },
        {
          title: "An apostrophe is not a plural",
          body: "'The visitor's to the zoo' should be 'the visitors'. Use an apostrophe only to show that something belongs to someone: 'the visitors' tickets'.",
        },
      ],
    },

    // C4 — fixed expressions
    {
      kind: "reference" as const,
      slug: "cdsensea-idioms",
      name: "Fixed expressions that cannot be changed",
      intuition:
        "A **fixed expression** is a group of words that native speakers always use in one form: 'day and night', 'far from done', 'if not impossible'. " +
        "Change one word, add a plural or drop a small word, and the expression breaks, even though the meaning may still come through.",
      definition:
        "How the paper breaks a fixed expression:\n" +
        "- It changes the **number**: 'days and nights' for 'day and night'.\n" +
        "- It **drops a word**: 'from done' for 'far from done', 'break in hives' for 'break out in hives'.\n" +
        "- It **swaps a word**: 'in case impossible' for 'if not impossible', 'today night' for 'tonight'.\n" +
        "- It changes the **word order**: 'no trouble is there' for 'there is no trouble'.\n" +
        "Check each expression word for word against the form you know.",
      table: {
        columns: ["Expression", "Meaning", "Wrong form in the paper", "Sitting"],
        rows: [
          { cells: ["there is no trouble", "'there is' + noun says that something exists", "no trouble is there", "2017 (I)"] },
          { cells: ["if not impossible", "perhaps even impossible", "in case impossible", "2017 (II)"], pyqExampleId: "a97bf5de-9ed8-4965-a6e5-d71ecefdeaa1" },
          { cells: ["day and night", "all the time, without stopping", "days and nights", "2018 (I)"], pyqExampleId: "840a47dc-d028-4867-bb8c-7735f999a987" },
          { cells: ["tonight", "this night", "today night", "2018 (II)"], pyqExampleId: "1c67cc51-2995-42de-a30a-42526c14465f" },
          { cells: ["come out (in support)", "openly show support", "coming in", "2019 (I)"] },
          { cells: ["far from done", "not nearly finished", "from done", "2023 (II)"], pyqExampleId: "88a51bf9-ca2e-49ec-aaa9-76660ac27f93" },
          { cells: ["break out in hives", "suddenly develop an itchy rash", "break in hives", "2024 (II)"] },
        ],
        caption: "The same family: 'last night' and 'yesterday evening', never 'yesterday night'.",
      },
      pyqExampleId: "88a51bf9-ca2e-49ec-aaa9-76660ac27f93",
      selfCheckExample: {
        prompt: item("He finished", "the whole report", "in no times."),
        steps: [
          "'In no time' is a fixed expression meaning 'very quickly'.",
          "'Time' here stays singular. 'In no times' changes the number.",
          "The broken expression sits in part (c).",
        ],
        answer: "(c). He finished the whole report **in no time**.",
      },
      practiceSet: [
        { prompt: "Complete the expression: 'The nurses worked day and ___ during the flood.'", answer: "night", method: "singular: day and night" },
        { prompt: "Complete the expression: 'It is difficult, if ___ impossible, to climb it in winter.'", answer: "not" },
        { prompt: "Which is right: 'Are you free today night?' or 'Are you free tonight?'", answer: "Are you free **tonight**?" },
        { prompt: "Complete the expression: 'When he saw the exam paper, he broke ___ in a cold sweat.'", answer: "out", method: "break out in = suddenly start to show" },
      ],
      traps: [
        {
          title: "A fixed expression keeps its number",
          body: "'Day and night', 'in no time', 'at all costs'. Making the singular plural, or the plural singular, breaks the expression.",
        },
        {
          title: "One small word missing",
          body: "'The task is from done' and 'I break in hives' each lost one small word. When a phrase sounds slightly off, ask what word is missing before you decide it is fine.",
        },
        {
          title: "Today night, yesterday night",
          body: "English says **tonight**, **last night**, **this morning**, **yesterday evening**. 'Today night' and 'yesterday night' are errors.",
        },
        {
          title: "'There is' comes first",
          body: "To say that something exists, start with 'there is' or 'there are': 'there is no trouble', 'there are many reasons'. 'No trouble is there' is a word-for-word translation, not English.",
        },
      ],
    },
  ],
};

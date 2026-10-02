import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PREP_COLLOCATIONS_NOTE: SubtopicNote = {
  subtopicName: "Fixed Prepositions after Verbs, Adjectives and Nouns",
  title: "Words that take a fixed preposition",
  oneLineDefinition:
    "Many words always travel with one preposition: averse to, capable of, insist on, entry into. No rule predicts the pair, so you learn the pair, and then the pair can also tell you which word fits a blank.",
  whyItMatters:
    "This is the largest group of preposition items in the CDS paper. Some blanks ask for the preposition after a word; others give the preposition and ask for the word. " +
    "Both are fast marks once the pairs are in your memory, and the lists below hold the pairs that past papers have asked.",
  concepts: [
    // C1 — adjective + preposition
    {
      kind: "reference" as const,
      slug: "cdsenprep-adjective",
      name: "Adjective + preposition",
      intuition:
        "An adjective that describes a feeling or a duty usually points at something: annoyed **with** a person, responsible **for** a debt, polite **to** someone. The preposition is part of the word, the way a lid belongs to its box.",
      definition:
        "The terms:\n" +
        "- **Collocation**: words that native speakers put together by habit (averse to, fed up with). Another preposition may look logical but sounds wrong.\n" +
        "- **Gerund**: the -ing form of a verb used as a noun. A verb after a preposition takes this form: capable of **winning**, not capable of win.\n" +
        "The method:\n" +
        "- Find the adjective just before the blank.\n" +
        "- Recall its partner from the list below; say the pair aloud with the noun that follows.\n" +
        "- If a verb follows the preposition, check that it is in the -ing form.",
      table: {
        columns: ["Pair", "Example", "Sitting"],
        rows: [
          {
            cells: ["annoyed **with** (a person)", "My teacher was annoyed with us for being late.", "2018 (II)"],
            noteAmber: "annoyed with a person, annoyed about or at a thing or an event.",
          },
          { cells: ["averse **to**", "People who are averse to hard work do not succeed.", "2022 (I)"] },
          { cells: ["indebted **to** (a person)", "He is indebted to his friend.", "2023 (I)"] },
          { cells: ["responsible **for**", "held responsible for my spouse's debts", "2023 (I)"] },
          {
            cells: ["liable **for** (a debt or payment)", "He is liable for his wife's debts.", "2022 (I)"],
            noteAmber: "liable to + a penalty or a verb: liable to a fine, liable to break.",
          },
          { cells: ["polite **to** (a person)", "She has always been very polite to me.", "2024 (I)"] },
          { cells: ["fed up **with**", "I'm fed up with you.", "2024 (I)"] },
          { cells: ["capable **of** + -ing", "She is capable of winning the race.", "2024 (I)"] },
        ],
        caption: "Learn each adjective with its preposition as one unit.",
      },
      pyqExampleId: "42497388-c035-4cce-90cb-a1785183aa49",
      selfCheckExample: {
        prompt: "She is very good ______ mathematics but weak in drawing. (a) in (b) at (c) with (d) for",
        steps: [
          "The adjective before the blank is good, about skill.",
          "Skill at a subject or activity collocates with at: good at, bad at.",
          "The sentence even contrasts it with 'weak in', but good still takes at.",
        ],
        answer: "(b) at.",
      },
      practiceSet: [
        { prompt: "The child is afraid ______ dogs.", answer: "of" },
        { prompt: "Her answer is similar ______ mine.", answer: "to" },
        { prompt: "Are you aware ______ the new rule?", answer: "of" },
        { prompt: "He is proud ______ his son's success.", answer: "of" },
      ],
      traps: [
        {
          title: "With a person, about a thing",
          body:
            "**annoyed with / angry with** a person; **annoyed about / angry about** a situation. If the object is a person (us, him, the driver), choose with.",
        },
        {
          title: "Liable for or liable to?",
          body:
            "**liable for** a debt or a payment (you must pay it). **liable to** a penalty, or + verb (likely to): liable to a fine, liable to change. Read what comes after the blank.",
        },
        {
          title: "A preposition is followed by -ing, not the base verb",
          body:
            "capable of **winning**, fond of **reading**, used to **working**. If an option gives 'capable to win', it is wrong twice: wrong preposition and wrong verb form.",
        },
      ],
    },

    // C2 — verb + preposition
    {
      kind: "reference" as const,
      slug: "cdsenprep-verb",
      name: "Verb + preposition",
      intuition:
        "Some verbs cannot reach their object without a preposition: we **insist on**, **complain of**, **look for**. The pair can also change meaning: you **shout to** a friend far away but **shout at** someone you are angry with.",
      definition:
        "The rules:\n" +
        "- Learn the verb with its preposition: insist **on**, blame someone **for**, take care **of**, enter **into** an agreement.\n" +
        "- Some verbs change meaning with the preposition: shout **to** (call out) vs shout **at** (in anger); connive **with** a person vs connive **at** a fault; work **with** colleagues vs work **for** someone's benefit.\n" +
        "- The preposition stays in the passive: they stared **at** me → I was stared **at**.\n" +
        "- The preposition stays when the object moves away: the man I was looking **for**.\n" +
        "- The table also lists the verbs that were tested the other way round, where the preposition was given and the verb was the blank (the next concept shows that method).",
      table: {
        columns: ["Pair", "Meaning or use", "Sitting"],
        rows: [
          { cells: ["shout **to** someone", "call out to be heard, with no anger (shout at = in anger)", "2018 (II)"] },
          { cells: ["complain **of** a headache", "complain of an illness or pain", "2018 (II)"] },
          { cells: ["insist **on** + -ing", "my mother insists on going with my brother", "2018 (II)"] },
          { cells: ["blame someone **for** something", "blame everyone for his mistakes", "2021 (I)"] },
          { cells: ["take care **of**", "look after: I will take care of myself", "2021 (I)"] },
          { cells: ["connive **with** a person", "secretly help someone do wrong (connive at a fault = ignore it)", "2022 (I)"] },
          {
            cells: ["aspire **to** / aspire **for**", "aim for: aspire to distinction", "2022 (I)"],
            noteAmber: "aspire to is the standard pair. When to is not among the options, aspire for is the one to choose.",
          },
          { cells: ["stare **at**", "the passive keeps it: being stared at", "2026 (II)"] },
          { cells: ["work **with** co-workers", "together with them", "2025 (II)"] },
          { cells: ["work **for** the people", "for their benefit", "2021 (II)"] },
          { cells: ["look **for**", "search for: the man I have been looking for", "2021 (II)"] },
          { cells: ["enter **into** an agreement", "make a formal agreement", "2022 (I), 2026 (I)"] },
          { cells: ["talk someone **through** something", "explain it step by step", "2026 (II)"] },
          { cells: ["endow someone **with** a quality", "nature has endowed them with a capacity", "2017 (II)"] },
          { cells: ["absolve someone **of** a crime", "declare free from guilt", "2018 (I)"] },
          { cells: ["embark **on** a project", "begin something big", "2024 (I)"] },
          { cells: ["result **in** unhappiness", "have as its outcome (lead takes to)", "2021 (I)"] },
          { cells: ["be premised **on** a notion", "be based on", "2023 (II)"] },
          { cells: ["differentiate the good **from** the bad", "tell one from the other", "2017 (II)"] },
          { cells: ["precipitate eye issues", "no preposition: it takes a direct object (contribute takes to)", "2024 (II)"] },
        ],
        caption: "If the preposition changes the meaning, read the sentence before you choose.",
      },
      pyqExampleId: "5d8f487f-b579-47a9-a733-2fd789189132",
      selfCheckExample: {
        prompt: "Please do not interfere ______ my work. (a) in (b) with (c) on (d) at",
        steps: [
          "The verb before the blank is interfere.",
          "Interfere with something = disturb it or stop it working. Interfere in = get involved in other people's affairs.",
          "'My work' is being disturbed, so the pair is interfere with.",
        ],
        answer: "(b) with.",
      },
      practiceSet: [
        { prompt: "Success depends ______ hard work.", answer: "on" },
        { prompt: "This bag belongs ______ my sister.", answer: "to" },
        { prompt: "The boy was laughed ______ by the whole class.", answer: "at", method: "laugh at; the passive keeps the preposition" },
        { prompt: "I agree ______ you, but I do not agree ______ the plan.", answer: "with; to", method: "agree with a person, agree to a proposal" },
      ],
      traps: [
        {
          title: "Do not drop the preposition in the passive",
          body:
            "'People laughed at him' becomes 'He was laughed **at**', not 'He was laughed'. The same goes for looked after, spoken to, stared at. An option without the preposition is wrong.",
        },
        {
          title: "Shout to or shout at?",
          body:
            "**shout to** someone = call out so they can hear. **shout at** someone = shout in anger. A girl calling from the top of a house shouts to you.",
        },
        {
          title: "Talk to someone about it, but talk someone through it",
          body:
            "**talk to / with** a person **about** a topic. **talk someone through** a task = explain each step. In 'Talk me ___ your plans', 'me' is the object, so only through fits.",
        },
      ],
    },

    // C3 — noun + preposition
    {
      kind: "reference" as const,
      slug: "cdsenprep-noun",
      name: "Noun + preposition",
      intuition:
        "Nouns have partners too. A discussion is **about** a topic, a reason is **for** something, entry is **into** a place. Many nouns take the same preposition as their verb (enter into → entry into), but not all.",
      definition:
        "The rules:\n" +
        "- Learn the noun with its preposition: discussion about, reason for, entry into, meaning in.\n" +
        "- Some fixed phrases use of to describe a person: a man **of** means (a rich man), a man of courage.\n" +
        "- When the blank also holds the article, check both parts: about **a** person, not about person.",
      table: {
        columns: ["Pair", "Example", "Sitting"],
        rows: [
          { cells: ["a discussion **about**", "We had a discussion about the project.", "2024 (I)"] },
          { cells: ["a man **of** means", "a wealthy man", "2021 (II)"] },
          { cells: ["meaning **in**", "There is no meaning in what you say.", "2021 (II)"] },
          { cells: ["choice of location **for**", "my choice of location for the family visit", "2025 (I)"] },
          { cells: ["a biography is **about a** person's life", "the blank needs the preposition and the article", "2021 (I)"] },
          { cells: ["entry **into**", "Entry into the building was restricted.", "2022 (II)"] },
          { cells: ["in the estimation **of**", "lowered him in the estimation of everyone (= in their opinion)", "2017 (II)"] },
        ],
        caption: "A noun often borrows its verb's preposition: enter into, entry into.",
      },
      pyqExampleId: "72ec370c-532c-483a-830a-d8592bdce6f8",
      selfCheckExample: {
        prompt: "There has been a sharp rise ______ the price of onions. (a) of (b) on (c) in (d) at",
        steps: [
          "The noun before the blank is rise.",
          "A rise, an increase or a fall in something takes in.",
          "A rise of names the size of the rise (a rise of 10%), which is not the meaning here.",
        ],
        answer: "(c) in.",
      },
      practiceSet: [
        { prompt: "What is the reason ______ his absence?", answer: "for" },
        { prompt: "We need a solution ______ this problem.", answer: "to" },
        { prompt: "Children should show respect ______ their elders.", answer: "for" },
        { prompt: "She is an expert ______ Indian history.", answer: "in" },
      ],
      traps: [
        {
          title: "Check whether the article is part of the answer",
          body:
            "When an option gives 'about' and another gives 'about a', read the noun after the blank. A singular countable noun like person needs an article: about **a** person's life.",
        },
        {
          title: "A man of means is not a man with plans",
          body:
            "**means** here = money, wealth. 'A man of means' = a rich man. It is a fixed phrase and takes of.",
        },
        {
          title: "Entry into, not entry of",
          body:
            "**entry into** a place (movement in). 'Entry of the building' sounds as if the building is entering something.",
        },
      ],
    },

    // C4 — backsolve: the preposition picks the word
    {
      kind: "formula" as const,
      slug: "cdsenprep-backsolve",
      name: "Let the preposition choose the word",
      intuition:
        "Turn the pairs round. When the blank is the verb and the preposition is already printed after it, the preposition is your best clue. Often only one of the four verbs can take that preposition at all.",
      definition:
        "The terms:\n" +
        "- **Transitive verb**: takes its object directly, with no preposition (precipitate a crisis, cause a problem).\n" +
        "- **Prepositional verb**: needs a preposition to reach its object (contribute **to**, result **in**, embark **on**).\n" +
        "The method:\n" +
        "- Find the preposition after the blank, even if it is far away (endowed them **with**: the with comes at the end).\n" +
        "- Test each option with that preposition. Strike every verb that cannot take it.\n" +
        "- If no preposition follows, strike the verbs that need one (contributes needs to).\n" +
        "- Of the verbs left, choose the one whose meaning fits the sentence.\n" +
        "Pairs tested this way (all in the verb table above):\n" +
        "- endowed ... with (2017 II); absolve him of (2018 I); embarking on (2024 I); result in (2021 I)\n" +
        "- premised on (2023 II); differentiate the good from the bad (2017 II); entered into an agreement (2022 I)\n" +
        "- in the estimation of (2017 II); precipitates eye issues, with no preposition (2024 II)",
      authoredExample: {
        prompt:
          "The quarrel ______ from a small misunderstanding. (a) caused (b) stemmed (c) produced (d) created",
        steps: [
          "The word after the blank is from: something comes from an origin.",
          "Test each verb with from. Caused, produced and created take a direct object (caused a quarrel); none of them takes from in this sense.",
          "Stem from = begin from, have its origin in. It takes from.",
          "The meaning also fits: the quarrel began from a misunderstanding.",
        ],
        answer: "(b) stemmed: stem from = come from.",
      },
      selfCheckExample: {
        prompt:
          "The team ______ with the problem for weeks before they found an answer. (a) handled (b) solved (c) grappled (d) tackled",
        steps: [
          "The preposition after the blank is with.",
          "Handled, solved and tackled are transitive: handled the problem, with no with.",
          "Grapple with = struggle with a difficult problem.",
        ],
        answer: "(c) grappled.",
      },
      practiceSet: [
        { prompt: "The court ______ him of the charge. (acquitted / released / excused / forgave)", answer: "acquitted", method: "acquit someone of a charge" },
        { prompt: "The illness ______ him of his strength. (deprived / took / removed / lost)", answer: "deprived", method: "deprive someone of something" },
        { prompt: "She ______ in finishing the course. (achieved / succeeded / managed / accomplished)", answer: "succeeded", method: "succeed in + -ing" },
        { prompt: "Smoking ______ to heart disease. (causes / contributes / produces / creates)", answer: "contributes", method: "only contribute takes to; the others take a direct object" },
      ],
      pyqExampleId: "9280757a-e5fd-4706-bc77-001153f107c0",
      traps: [
        {
          title: "Lead to, but result in",
          body:
            "Both mean 'cause', but they take different prepositions. Greed **leads to** unhappiness; greed **results in** unhappiness. If the blank is followed by in, lead is wrong.",
        },
        {
          title: "No preposition? Then a prepositional verb is wrong",
          body:
            "'Working in dim light ___ eye issues': there is no preposition before 'eye issues', so contributes (which needs to) cannot fit. A transitive verb such as precipitates or causes is needed.",
        },
        {
          title: "The preposition may be far from the blank",
          body:
            "In 'such capacity as nature has ___ them with', the with sits at the end of the clause. Scan the whole clause for the preposition before you test the options.",
        },
      ],
    },

    // C5 — when the blank is not a preposition
    {
      kind: "formula" as const,
      slug: "cdsenprep-not-preposition",
      name: "When the blank is not a preposition: infinitive 'to' and articles",
      intuition:
        "A blank inside a preposition question is not always a preposition. If a verb comes right after the blank, the blank is usually the **to** of the infinitive. If a noun comes after it and one option is an article, the blank may need **a**, **an** or **the**.",
      definition:
        "The terms:\n" +
        "- **Infinitive marker to**: the to before a base verb (to go, to achieve). It is not a preposition.\n" +
        "- **Article**: a, an (any one) or the (a particular one, already known).\n" +
        "The method:\n" +
        "- Look at the word right after the blank.\n" +
        "- A base verb (achieve, live, go) → the blank is to.\n" +
        "- A noun, with an article among the options → decide between a / an / the: is it any one, or a particular one?\n" +
        "- Only then think of prepositions such as for, in, on.\n" +
        "Items tested this way:\n" +
        "- impossible **to** achieve (2022 I); good rules **to** live by (2021 II)\n" +
        "- a manifestation of **the** perfection already in man (2022 II)",
      authoredExample: {
        prompt: "She has a lot of work ______ finish before Friday. (a) for (b) to (c) at (d) on",
        steps: [
          "Look at the word after the blank: finish, a base verb.",
          "A base verb after a noun (a lot of work) takes the infinitive marker to: work to finish.",
          "For, at and on are prepositions; a preposition would need finishing, not finish.",
        ],
        answer: "(b) to.",
      },
      selfCheckExample: {
        prompt: "This is ______ best answer in the class. (a) a (b) an (c) the (d) some",
        steps: [
          "The word after the blank is best, a superlative.",
          "There can be only one best answer, so it is a particular one.",
          "A superlative takes the.",
        ],
        answer: "(c) the.",
      },
      practiceSet: [
        { prompt: "It is time ______ go home.", answer: "to", method: "a base verb follows" },
        { prompt: "I have nothing ______ say.", answer: "to" },
        { prompt: "She is ______ only person who knows the code.", answer: "the", method: "only marks a particular one" },
        { prompt: "Is there a pen ______ write with?", answer: "to", method: "write is a base verb; with already follows" },
      ],
      pyqExampleId: "847ff309-41a2-427f-b8ba-97c6e17a58e6",
      traps: [
        {
          title: "Find which word the blank replaces",
          body:
            "'These are good rules ___ live by' needs **to** (the by is printed). 'These are the good rules to live ___' needs **by**. The same phrase can be tested at either word, so read what is already printed.",
        },
        {
          title: "Impossible for someone, impossible to do",
          body:
            "**impossible for** + a person (impossible for him). **impossible to** + a verb (impossible to achieve). If a verb follows, for is wrong.",
        },
        {
          title: "An article can hide in a preposition set",
          body:
            "When one option is a, the or some, check whether the noun after the blank needs an article. A famous quotation or a particular quality already known takes the.",
        },
      ],
    },
  ],
};

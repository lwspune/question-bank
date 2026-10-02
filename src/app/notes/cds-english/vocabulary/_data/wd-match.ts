import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_WD_MATCH_NOTE: SubtopicNote = {
  subtopicName: "Word Meaning: Themed Match Lists",
  title: "Match-the-list vocabulary: fix the sure pairs, strike the codes",
  oneLineDefinition:
    "Four words in List I, four meanings in List II and four answer codes. Fix the two pairs you are surest of and let the codes do the rest.",
  whyItMatters:
    "Recent CDS English papers set match lists of words and meanings, often on one theme: games and arenas, animal sounds, words for speech or belief, or words for law and money. " +
    "You rarely need to know all four words. Two sure pairs usually leave only one code standing.",
  concepts: [
    // C1 — the code method
    {
      kind: "formula" as const,
      slug: "cdsenwd-match-method",
      name: "Solve a match list: fix two sure pairs, then strike codes",
      intuition:
        "Each option is a **code**: a full set of four pairings, such as A-3, B-4, C-1, D-2. Only one code is right, so every pair you are sure of strikes the codes that disagree with it. " +
        "Start with the easiest word, not with word A.",
      definition:
        "The method:\n" +
        "- Read List I and pick the word you know best. Find its meaning in List II.\n" +
        "- Strike every code that does not have that pair.\n" +
        "- Pick a second sure word whose pair **differs** among the codes left. A pair shared by all surviving codes tells you nothing.\n" +
        "- Usually one code is left. Read it against the two hard words only to confirm.\n" +
        "- Literal senses count: a list may give the plain, physical meaning of a word (morass = muddy ground) rather than its figurative one.\n" +
        "Sets tested this way:\n" +
        "- 2025 (I): nadir (lowest point), rhapsody (expression of praise), amble (walk slowly), pittance (very small amount of money).\n" +
        "- 2025 (I): damp squib (an event less impressive than expected), excerpt (small part of a longer text), rostrum (raised platform on a stage), scourge (cause of great trouble).\n" +
        "- 2025 (II): caveat (warning), amble (walk at a slow pace), acolyte (ardent follower), archaic (old-fashioned).\n" +
        "- 2025 (II): kernel (soft part inside a seed), brook (small stream), jinx (cause of bad luck), solace (comfort).\n" +
        "- 2025 (II): hatch (a door in an aircraft), haughty (arrogant), gruff (rough and low in pitch), gruelling (tiring and demanding).\n" +
        "- 2025 (II): ensue (happen as a result), morass (muddy ground), imbroglio (complex dispute), potpourri (collection of different things).\n" +
        "- 2026 (I): blizzard (severe snowstorm with strong winds), tornado (rotating column of air from a thunderstorm to the ground), thunderstorm (storm with thunder, lightning and rain), typhoon (tropical cyclone over the western Pacific).",
      authoredExample: {
        prompt:
          "Match List I with List II. List I: A. Siesta B. Pariah C. Fiasco D. Labyrinth. List II: 1. An outcast 2. A maze 3. A short afternoon sleep 4. A complete failure. Codes: (a) A-3, B-1, C-4, D-2 (b) A-3, B-4, C-1, D-2 (c) A-2, B-1, C-4, D-3 (d) A-2, B-4, C-1, D-3",
        steps: [
          "Surest word: siesta = a short afternoon sleep, so A-3. This strikes (c) and (d).",
          "Labyrinth = a maze gives D-2, but both (a) and (b) have D-2. That pair does not separate them.",
          "Choose a pair that differs: (a) has C-4, (b) has C-1. A fiasco is a complete failure, so C-4.",
          "Only (a) survives. Confirm: pariah = an outcast, B-1.",
        ],
        answer: "(a) A-3, B-1, C-4, D-2.",
      },
      selfCheckExample: {
        prompt:
          "Match List I with List II. List I: A. Aversion B. Sheaf C. Euphemism D. Perjury. List II: 1. Lying under oath 2. A strong dislike 3. A bundle of papers or grain stalks 4. A mild word used in place of a harsh one. Codes: (a) A-2, B-3, C-4, D-1 (b) A-2, B-4, C-3, D-1 (c) A-1, B-3, C-4, D-2 (d) A-1, B-4, C-3, D-2",
        steps: [
          "Surest: aversion = a strong dislike, A-2. (a) and (b) survive.",
          "They differ on B and C. A euphemism is a mild word for a harsh one ('passed away' for 'died'), so C-4.",
          "Only (a) has C-4. Confirm: perjury = lying under oath, D-1.",
        ],
        answer: "(a) A-2, B-3, C-4, D-1.",
      },
      practiceSet: [
        { prompt: "Two codes left: A-1, B-3, C-2, D-4 and A-1, B-2, C-3, D-4. Which pair should you check next?", answer: "B or C", method: "A-1 and D-4 are shared, so they cannot separate the codes" },
        { prompt: "Pittance means (a) a small amount of money (b) a deep pit?", answer: "(a) a small amount of money" },
        { prompt: "A rostrum is (a) a raised platform for a speaker (b) a list of duties?", answer: "(a) a raised platform for a speaker", method: "a roster is a list of duties" },
        { prompt: "Which storm is a snowstorm with strong winds: a typhoon or a blizzard?", answer: "A blizzard" },
      ],
      pyqExampleId: "457850b7-52ce-4b77-942e-30dc2b9ebaec",
      traps: [
        {
          title: "Starting with word A wastes time",
          body:
            "Word A is often the hardest. Start with the word you know best, wherever it sits. One sure pair usually removes two codes at once.",
        },
        {
          title: "The common sense is not always the listed sense",
          body:
            "**Hatch** was matched with 'a door in an aircraft', not with eggs; **morass** with 'muddy ground', not just a confusing mess. Read every meaning in List II before you rule a word out.",
        },
        {
          title: "Two words for a mess",
          body:
            "**Morass** and **imbroglio** both suggest a tangle. Separate them by the literal sense: a morass is a bog, an imbroglio is a complicated quarrel or dispute.",
        },
      ],
    },

    // C2 — collocations
    {
      kind: "reference" as const,
      slug: "cdsenwd-collocations",
      name: "Collocations: groups, sounds, arenas and sport words",
      intuition:
        "Some words simply go together in English: a school of fish, a tennis court, an elephant's trumpet. Pairs like these are **collocations**. A word for a group, such as school or flock, is a **collective noun**. " +
        "You cannot work them out from meaning. You learn them as fixed pairs.",
      definition:
        "What to learn:\n" +
        "- **Collocation**: words that habitually go together (a golf course, a cricket pitch).\n" +
        "- **Collective noun**: a word for a group (a school of fish, a colony of ants).\n" +
        "- Group words also apply to things: a clump of grass, a bunch of flowers, a stack of firewood, a bundle of clothes.\n" +
        "- Sport words: each sport has its own terms (butterfly in swimming, touché in fencing).",
      table: {
        columns: ["Word", "Goes with", "Type of pair", "Sitting"],
        rows: [
          { cells: ["Golf", "Course", "Game and arena", "2024 (II)"] },
          { cells: ["Cricket", "Pitch", "Game and arena", "2024 (II)"] },
          { cells: ["Polo", "Ground", "Game and arena", "2024 (II)"] },
          { cells: ["Tennis", "Court", "Game and arena", "2024 (II)"] },
          { cells: ["Dolphin", "Click", "Animal and sound", "2024 (II)"] },
          { cells: ["Elephant", "Trumpet", "Animal and sound", "2024 (II)"] },
          { cells: ["Monkey", "Chatter", "Animal and sound", "2024 (II)"] },
          { cells: ["Cheetah", "Chirp", "Animal and sound", "2024 (II)"], noteAmber: "Cheetahs do not roar. They chirp, a high bird-like call." },
          { cells: ["Fish", "A school of", "Animal and group", "2024 (II)"] },
          { cells: ["Ducks", "A paddling of", "Animal and group", "2024 (II)"] },
          { cells: ["Ants", "A colony of", "Animal and group", "2024 (II)"] },
          { cells: ["Crows", "A flock of", "Animal and group", "2024 (II)"] },
          { cells: ["A clump of", "Grass", "Group and object", "2024 (II)"] },
          { cells: ["A bunch of", "Flowers", "Group and object", "2024 (II)"] },
          { cells: ["A stack of", "Firewood", "Group and object", "2024 (II)"] },
          { cells: ["A bundle of", "Clothes", "Group and object", "2024 (II)"] },
          { cells: ["Swimming", "Butterfly (a stroke)", "Sport and term", "2024 (II)"] },
          { cells: ["Kho kho", "Chaser", "Sport and term", "2024 (II)"] },
          { cells: ["Kabaddi", "Ankle hold", "Sport and term", "2024 (II)"] },
          { cells: ["Fencing", "Touché (a hit is admitted)", "Sport and term", "2024 (II)"] },
        ],
        caption: "Learn the pairs as sets of four: each match list in this group stayed inside one theme.",
      },
      pyqExampleId: "541d39d2-1993-4b83-b21a-8be161e56715",
      selfCheckExample: {
        prompt: "Complete each pair: a ___ of bees; a ___ of lions; a ___ of cattle.",
        steps: [
          "Bees move in a large moving mass: a swarm.",
          "Lions live in a family group: a pride.",
          "Cattle are kept and driven together: a herd.",
        ],
        answer: "A swarm of bees, a pride of lions, a herd of cattle.",
      },
      practiceSet: [
        { prompt: "A boxing match takes place in a ___.", answer: "Ring" },
        { prompt: "A horse ___.", answer: "Neighs" },
        { prompt: "A ___ of papers (a bundle tied together).", answer: "Sheaf" },
        { prompt: "Spot the wrong pair: a school of fish, a colony of ants, a paddling of crows.", answer: "A paddling of crows. Paddling is for ducks; crows come in a flock." },
      ],
      traps: [
        {
          title: "Pitch or ground",
          body:
            "Cricket is played on a **pitch** (the strip in the middle) and polo on a **ground**. Students give cricket the ground and are left with nothing for polo. Pair the game whose word is unique first.",
        },
        {
          title: "Bunch, bundle, stack and clump",
          body:
            "A **bunch** is held together at one end (flowers, keys). A **bundle** is tied up (clothes, sticks for carrying). A **stack** is piled up (firewood). A **clump** grows close together (grass, trees).",
        },
        {
          title: "The big cat sound is not always a roar",
          body:
            "The **cheetah** chirps; the **dolphin** clicks. The exam picks animals whose sound you would not guess. Learn the odd ones; the obvious ones fall into place.",
        },
      ],
    },

    // C3 — speech, language and belief
    {
      kind: "reference" as const,
      slug: "cdsenwd-speech-belief",
      name: "Words for speech, language and belief",
      intuition:
        "These words name kinds of language, ways of speaking or arguing, and beliefs ending in -ism. Within each group the words are close, so learn them side by side: who uses this language, and what is it for?",
      definition:
        "How to separate them:\n" +
        "- For a kind of language, ask **who** uses it: ordinary people (vernacular), a profession (jargon), a group (parlance), or a speaker trying to persuade (rhetoric).\n" +
        "- For a way of speaking, ask **how** it is said: aggressively (harangue), meaninglessly (gibberish), forcefully pouring out (spew), questioning (impugn).\n" +
        "- For an -ism, read the root: hedone = pleasure, ego = I, fate, nihil = nothing.",
      table: {
        columns: ["Word", "Meaning", "Hook", "Sitting"],
        rows: [
          { cells: ["Vernacular", "The language of ordinary people of a region", "The vernacular press = local-language newspapers", "2025 (I)"] },
          { cells: ["Rhetoric", "Language meant to persuade or influence people", "Often used for showy, empty speech", "2025 (I)"] },
          { cells: ["Parlance", "The way of speaking of a particular group", "In military parlance, a 'sitrep' is a situation report", "2025 (I)"] },
          { cells: ["Jargon", "Special terms used in a profession or field", "Legal or medical jargon", "2025 (I)"] },
          { cells: ["Wrangle", "A long, complicated argument", "Sounds like wrestle: a fight with words", "2025 (I)"] },
          { cells: ["Wacky", "Amusing and strange", "Informal, light", "2025 (I)"] },
          { cells: ["Codex", "An ancient text in book form", "Not a code", "2025 (I)"] },
          { cells: ["Postscript", "Information added after the main text", "post = after; the P.S. in a letter", "2025 (I)"] },
          { cells: ["Impugn", "To express doubt about, to question someone's honesty", "To impugn his motives", "2025 (II)"] },
          { cells: ["Spew", "To pour out in a forceful flow", "A volcano spews lava", "2025 (II)"] },
          { cells: ["Harangue", "A long, aggressive lecture", "A coach shouting at the team", "2025 (II)"] },
          { cells: ["Gibberish", "Meaningless talk", "Sounds like jabber", "2025 (II)"] },
          { cells: ["Inveterate", "Habitual, long-established", "An inveterate liar always lies", "2025 (I)"] },
          { cells: ["Sangfroid", "Calmness in a difficult situation", "French: cold blood", "2025 (I)"] },
          { cells: ["Oracy", "Ability to express oneself well in speech", "Oral + literacy", "2025 (I)"] },
          { cells: ["Interment", "Burial of the dead", "Not internment, which is confinement", "2025 (I)"] },
          { cells: ["Nihilism", "The denial of all reality or meaning", "nihil = nothing", "2026 (I)"] },
          { cells: ["Fatalism", "Accepting that you cannot prevent what will happen", "Fate decides", "2026 (I)"] },
          { cells: ["Hedonism", "The belief that pleasure is the most important thing", "hedone = pleasure", "2026 (I)"] },
          { cells: ["Egoism", "Thinking that you are more important than others", "ego = I", "2026 (I)"] },
        ],
        caption: "Inside a set, the four meanings are deliberately close. Match by the hook, not by the general mood of the word.",
      },
      pyqExampleId: "59bddf17-9c64-4df7-9c4e-dfbb2221291f",
      selfCheckExample: {
        prompt:
          "Doctors at a conference talk about 'idiopathic', 'comorbid' and 'contraindicated'. Their patients cannot follow. Is this vernacular, rhetoric or jargon?",
        steps: [
          "Vernacular is the everyday language of ordinary people. These words are not everyday words.",
          "Rhetoric is language meant to persuade. The doctors are not persuading anyone.",
          "Special terms of a profession, hard for outsiders, are jargon.",
        ],
        answer: "Jargon.",
      },
      practiceSet: [
        { prompt: "The P.S. at the end of a letter is a ___.", answer: "Postscript" },
        { prompt: "Interment means (a) confinement (b) burial?", answer: "(b) burial" },
        { prompt: "A person who lives only for pleasure follows ___.", answer: "Hedonism" },
        { prompt: "A soldier stays calm while defusing a bomb. He shows ___.", answer: "Sangfroid" },
      ],
      traps: [
        {
          title: "Parlance and jargon are close",
          body:
            "**Jargon** is the special vocabulary of a profession, used for specialised communication. **Parlance** is the general way a group speaks. If the meaning mentions specialised communication, choose jargon.",
        },
        {
          title: "Interment is not internment",
          body:
            "One letter changes everything. **Interment** (in + terra, earth) is burial. **Internment** is confining people, usually in wartime.",
        },
        {
          title: "Egoism is not hedonism",
          body:
            "Both sound selfish. **Egoism** is about seeing yourself as more important; **hedonism** is about chasing pleasure. **Nihilism** denies all meaning; **fatalism** accepts that events are fixed.",
        },
      ],
    },

    // C4 — law, crime, money and property
    {
      kind: "reference" as const,
      slug: "cdsenwd-law-money",
      name: "Words for law, crime, money and property",
      intuition:
        "This group comes from courts, crime, money and property. The four words in a set often share a field, so the wrong codes pair a word with its neighbour: mortgage with lease, felony with diatribe. " +
        "Learn the exact act each word names.",
      definition:
        "How to separate them:\n" +
        "- Ask **who does what to whom**: who gives property, who takes money, who is cleared.\n" +
        "- Property words: **bequeath** (leave by will), **mortgage** (pledge as security), **endowment** (fund for an institution), **lease** (rent agreement).\n" +
        "- Money words: **clawback** (getting back money already paid), **mulct** (extract money by fine or tax), **malversation** (corruption in public office).\n" +
        "- Court words: **exonerate** (clear of blame), **revoke** (cancel officially), **felony** (serious crime), **restitution** (giving back what was lost or stolen).",
      table: {
        columns: ["Word", "Meaning", "Hook", "Sitting"],
        rows: [
          { cells: ["Internecine", "Conflict within the same group or community", "An internecine war = a civil war", "2025 (I)"] },
          { cells: ["Revoke", "To officially cancel (a licence, an agreement)", "re = back + voke = call: call back", "2025 (I)"] },
          { cells: ["Exonerate", "To clear someone officially of an accusation", "ex = out + onus = burden: the burden is removed", "2025 (I)"] },
          { cells: ["Venerable", "Valued and respected, often because of age", "Venerate = respect deeply", "2025 (I)"] },
          { cells: ["Atonement", "Making amends for a wrong", "At-one-ment: being at one again", "2025 (I)"] },
          { cells: ["Sacrilege", "Violating or disrespecting a holy place or thing", "sacr = holy", "2025 (I)"] },
          { cells: ["Clawback", "Getting back money already paid", "The government claws back a wrong refund", "2025 (I)"] },
          { cells: ["Bandwagon", "A popular movement that many people join", "To jump on the bandwagon", "2025 (I)"] },
          { cells: ["Felony", "A serious crime", "Murder or robbery, not a minor offence", "2025 (I)"] },
          { cells: ["Restitution", "Returning a lost or stolen thing to its owner", "Restore", "2025 (I)"] },
          { cells: ["Chagrin", "Distress caused by humiliation or failure", "Much to his chagrin, he lost to a junior", "2025 (I)"] },
          { cells: ["Diatribe", "A long, bitter piece of criticism", "Speech or writing that attacks", "2025 (I)"] },
          { cells: ["Malversation", "Corrupt conduct by a public servant", "mal = bad", "2025 (II)"] },
          { cells: ["Conundrum", "A confusing and difficult problem", "A riddle", "2025 (II)"] },
          { cells: ["Incessant", "Continuing without a break", "Incessant rain", "2025 (II)"] },
          { cells: ["Mulct", "To extract money by fines or taxes", "Sounds like milk: to milk someone of money", "2025 (II)"] },
          { cells: ["Bequeath", "To leave property to someone through a will", "The bequest goes to the heir", "2026 (I)"] },
          { cells: ["Mortgage", "To pledge property as security for a loan", "The bank holds the house until the loan is repaid", "2026 (I)"] },
          { cells: ["Endowment", "Funds given to run a useful institution", "An endowment for a school or hospital", "2026 (I)"] },
          { cells: ["Lease", "An agreement to use property in return for rent", "A shop on a five-year lease", "2026 (I)"] },
        ],
        caption: "The four property words of 2026 (I) differ only in what happens to the property: left, pledged, funded or rented.",
      },
      pyqExampleId: "eddf5077-7d75-4cf8-a1d2-aa5fda8ab56c",
      selfCheckExample: {
        prompt:
          "A court finds that the accused did not commit the theft and clears his name. Later he is given back the money that was wrongly taken from him. Name the two acts with words from the table.",
        steps: [
          "Clearing someone officially of an accusation is to exonerate him.",
          "Giving back what was wrongly taken is restitution.",
        ],
        answer: "He was exonerated, and he received restitution.",
      },
      practiceSet: [
        { prompt: "A fight between two groups of the same party is ___.", answer: "Internecine" },
        { prompt: "The licence was cancelled officially. It was ___.", answer: "Revoked" },
        { prompt: "Chagrin means (a) delight (b) distress from humiliation?", answer: "(b) distress from humiliation" },
        { prompt: "Spot the wrong row: 'Diatribe = a serious crime'.", answer: "Wrong. A diatribe is a long, bitter criticism; a serious crime is a felony." },
      ],
      traps: [
        {
          title: "Venerable is not vulnerable",
          body:
            "**Venerable** means respected, usually for age or wisdom. **Vulnerable** means easily hurt. In a law-and-crime set, the positive word stands out; match it to 'valued and respected'.",
        },
        {
          title: "Exonerate is not punish",
          body:
            "Students tie every court word to punishment. **Exonerate** is the opposite: it clears the person. **Restitution** is also not a punishment; it returns what was lost.",
        },
        {
          title: "Atonement is done by the wrongdoer",
          body:
            "**Atonement** is making amends for your own mistake. It is not forgiveness given by others, and not the punishment itself.",
        },
      ],
    },
  ],
};

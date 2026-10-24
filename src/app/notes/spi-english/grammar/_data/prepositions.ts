import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_GR_PREPOSITIONS_NOTE: SubtopicNote = {
  subtopicName: "Prepositions",
  title: "Prepositions of time, place and fixed pairs",
  oneLineDefinition:
    "A preposition is a small word such as in, on, at, for or since that links a noun to the rest of the sentence and shows time, place or a fixed relation.",
  whyItMatters:
    "Eleven questions in the bank, 10 EASY and 1 MODERATE. Each is a single blank with four prepositions, and the right one is set either by a rule of time or place or by the word just before the blank (decide on, jealous of).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spigrpr-time",
      name: "Prepositions of time: since, for, by, in, on, at",
      intuition:
        "Since points to the moment something began; for measures how long it lasted. By sets a deadline. In, on and at go from big stretches of time down to exact moments.",
      definition:
        "- **Since** + a point of time (since Monday, since 2015, since morning), usually with the present perfect.\n" +
        "- **For** + a length of time (for two days, for an hour, for 24 hours).\n" +
        "- **By** + a time means not later than that time: 'Finish it by noon.'\n" +
        "- **In** for months, years and parts of the day; **on** for days and dates; **at** for clock times.\n" +
        "- Fixed time phrases: **at last** (finally), **in time** (early enough), **on time** (exactly at the set time).",
      table: {
        columns: ["Preposition", "Used with", "Example"],
        rows: [
          { cells: ["since", "a starting point", "She has worked here since 2018."] },
          { cells: ["for", "a length of time", "We stayed there for a week."] },
          { cells: ["by", "a deadline", "Send the form by Friday."] },
          { cells: ["in", "month, year, part of the day", "in May, in 2010, in the evening"] },
          { cells: ["on", "day or date", "on Sunday, on 5 June"] },
          { cells: ["at", "clock time, night", "at 7 o'clock, at night"] },
          { cells: ["at last", "finally, after a long wait", "At last the rain stopped."] },
        ],
        caption: "Since answers 'from when?'; for answers 'how long?'.",
      },
      selfCheckExample: {
        prompt: "Fill in since or for: He has been in hospital ____ three weeks, and his brother has stayed with him ____ the day he fell ill.",
        steps: [
          "'Three weeks' is a length of time, so: for three weeks.",
          "'The day he fell ill' is a starting point, so: since the day he fell ill.",
        ],
        answer: "for, since",
      },
      practiceSet: [
        { prompt: "Fill in: I have known her ____ ten years.", answer: "for" },
        { prompt: "Fill in: It has been raining ____ last night.", answer: "since" },
        { prompt: "Fill in: Please return the book ____ the end of the week.", answer: "by" },
        { prompt: "Fill in: The meeting is ____ 4 p.m.", answer: "at" },
        { prompt: "Fill in: My birthday is ____ 12 August.", answer: "on" },
      ],
      pyqExampleId: "966497ab-ef35-462b-bc72-2b8ea2296cca",
      traps: [
        {
          title: "Using 'from' with the present perfect",
          body: "'I have lived here from 2015' is wrong. With has or have + past participle, a starting point takes since: 'since 2015'.",
        },
        {
          title: "Using 'since' with a length of time",
          body: "'Since two hours' is wrong. A length of time takes for: 'for two hours'. Since needs a starting point.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spigrpr-place",
      name: "Prepositions of place and movement",
      intuition:
        "Picture the space. A point is at, a surface or a line is on, an enclosed space is in. When something moves, ask whether it follows a line (along), passes inside (through) or goes over the top (across, above).",
      definition:
        "- **At** a point: at the gate, at the bus stop.\n" +
        "- **On** a surface or a line such as a road, a river or a coast: on the wall, on the beach road, on the river.\n" +
        "- **In** an enclosed space: in the room, in the city.\n" +
        "- **Along** = following the length of something: along the river bank.\n" +
        "- **Through** = from one end of an enclosed space to the other: through the tunnel, through the forest.\n" +
        "- **Above** = higher than, without touching: from directly above.",
      table: {
        columns: ["Preposition", "Picture", "Example"],
        rows: [
          { cells: ["at", "a point", "Meet me at the gate."] },
          { cells: ["on", "a surface or a line", "The hotel is on the main street."] },
          { cells: ["in", "an enclosed space", "The keys are in the drawer."] },
          { cells: ["along", "following a line", "We walked along the river bank."] },
          { cells: ["through", "inside, end to end", "The train went through a long tunnel."] },
          { cells: ["across", "from one side to the other", "She swam across the lake."] },
          { cells: ["above", "higher, not touching", "The kite flew above the trees."] },
        ],
      },
      selfCheckExample: {
        prompt: "Fill in along or through: The children cycled ____ the canal and then ____ a small wood.",
        steps: [
          "A canal is a line, and cycling beside it follows its length: along the canal.",
          "A wood is an enclosed space you pass inside: through a small wood.",
        ],
        answer: "along, through",
      },
      practiceSet: [
        { prompt: "Fill in: The picture hangs ____ the wall.", answer: "on" },
        { prompt: "Fill in: The car passed ____ the tunnel.", answer: "through" },
        { prompt: "Fill in: Wait for me ____ the bus stop.", answer: "at" },
        { prompt: "Fill in: Their house is ____ the coast road.", answer: "on" },
        { prompt: "Fill in: A plane flew ____ the clouds.", answer: "above" },
      ],
      pyqExampleId: "7b1ccfb0-f70a-4649-b26a-ae5fdd5cbb89",
      traps: [
        {
          title: "Using 'through' for an open line",
          body: "Through is for enclosed spaces such as a tunnel or a forest. To follow a street or a river, use along.",
        },
        {
          title: "Using 'in' for a place on a line or an edge",
          body: "A shop or hotel beside a road or the sea front is on it: 'on the sea front', 'on the highway'.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spigrpr-fixed",
      name: "Words that always take the same preposition",
      intuition:
        "Many verbs and adjectives come with their own preposition, and no rule decides it: you learn the pair as one unit, like a spelling.",
      definition:
        "- The preposition belongs to the word **before** the blank, so read that word first.\n" +
        "- The preposition goes **after** the word it belongs to: 'laugh at him', not 'at laugh him'.\n" +
        "- Learn the pairs below as single units.",
      table: {
        columns: ["Word", "Preposition", "Example"],
        rows: [
          { cells: ["decide", "on (choose)", "We decided on the blue car."] },
          { cells: ["interested", "in", "Are you interested in chess?"] },
          { cells: ["jealous", "of", "He is jealous of his cousin."] },
          { cells: ["afraid", "of", "The child is afraid of the dark."] },
          { cells: ["laugh", "at", "Do not laugh at others' mistakes."] },
          { cells: ["good", "at", "Meera is good at maths."] },
          { cells: ["depend", "on", "We depend on rain for our crops."] },
          { cells: ["proud", "of", "Parents are proud of their children."] },
          { cells: ["angry", "with a person, at a thing", "He was angry with his son."] },
        ],
        caption: "If two prepositions sound right, the word just before the blank decides.",
      },
      selfCheckExample: {
        prompt: "Fill in: My little brother is afraid ____ dogs, but he is very good ____ drawing them.",
        steps: [
          "'Afraid' always takes 'of': afraid of dogs.",
          "'Good' at a skill takes 'at': good at drawing.",
        ],
        answer: "of, at",
      },
      practiceSet: [
        { prompt: "Fill in: We are proud ____ our soldiers.", answer: "of" },
        { prompt: "Fill in: You can depend ____ me.", answer: "on" },
        { prompt: "Fill in: The class laughed ____ the joke.", answer: "at" },
        { prompt: "Fill in: She was angry ____ her friend.", answer: "with" },
        { prompt: "Fill in: After much thought they decided ____ the red bicycle.", answer: "on" },
      ],
      pyqExampleId: "2b2ae471-8a07-41d1-9cd6-e7597a2444ae",
      traps: [
        {
          title: "Writing 'jealous on' or 'jealous about'",
          body: "The fixed pair is jealous of: 'jealous of her success'. The same goes for afraid of and proud of.",
        },
        {
          title: "Writing 'angry on someone'",
          body: "You are angry with a person and angry at a thing or a situation. 'Angry on' is never correct.",
        },
      ],
    },
  ],
};

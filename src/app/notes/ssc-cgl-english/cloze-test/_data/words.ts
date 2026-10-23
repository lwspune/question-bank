import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_ECZ_WORDS_NOTE: SubtopicNote = {
  subtopicName: "Word Partners and the Precise Word",
  title: "Word Partners and the Precise Word",
  oneLineDefinition:
    "Blanks whose options mean nearly the same thing, settled by the word English pairs with the blank's neighbours, by the word right after the blank, or by the exact sense of the scene.",
  whyItMatters:
    "One hundred and forty-two questions in the bank, all but two from the 2023 and 2024 shifts (81 and 59), and 109 of them EASY. The options often mean nearly the same thing, so the deciding test is which word English puts with the words around the blank.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscczco-partner",
      name: "Word partners (collocations)",
      intuition:
        "Some words simply go together in English: a source of energy, implement a policy, severely criticised, immense importance. When several options mean almost the same thing, choose the one English pairs with the word next to the blank.",
      definition:
        "The groups:\n" +
        "- **Verb + noun:** implement a policy, honour a pledge, broaden one's horizons, purse one's lips.\n" +
        "- **Adjective + noun:** immense importance, routine vaccinations, confidential data, ill-gotten gains.\n" +
        "- **Adverb + verb:** severely criticised.\n" +
        "- **Noun + of:** a source of energy, a succession of waves, the emission of gases.\n" +
        "- **Fast route:** say the phrase with each option; the pairing English uses sounds familiar.",
      table: {
        columns: ["Phrase", "Other options offered", "Asked in"],
        rows: [
          { cells: ["a source of energy", "gesture, control, symbol", "2023"] },
          { cells: ["the emission of greenhouse gases", "absorption, reflection, conduction", "2023 (twice)"] },
          { cells: ["implement policies", "sanctions, subsidies, restrictions", "2023"] },
          { cells: ["severely criticised", "selectively, intelligibly, legibly", "2023"] },
          { cells: ["immense importance", "sheer, complete, total", "2023"] },
          { cells: ["put the right policies in place", "desire, cut, design", "2023"] },
          { cells: ["equal distribution of wealth", "spending, partition, earning", "2023"] },
          { cells: ["pursed her lips", "stuck, dusted, dirt", "2024"] },
          { cells: ["routine vaccinations", "irregular, different, similar", "2024"] },
          { cells: ["a succession of waves", "arrest, interruption, disorder", "2024"] },
          { cells: ["honour the pledges", "take, watch, keep", "2024"] },
          { cells: ["gives the impression of", "fancy, suspicion, affect", "2024"] },
        ],
      },
      pyqExampleId: "9b32f7bf-9922-414d-b629-b05329284acd",
      selfCheckExample: {
        prompt: "Choose the word: The minister ___ a promise to build the road. (a) did (b) made (c) took (d) gave",
        steps: ["English pairs promise with make.", "\"Made a promise.\""],
        answer: "(b) made",
      },
      practiceSet: [
        { prompt: "Which verb goes with \"a decision\": make or do?", answer: "Make" },
        { prompt: "Fill the blank: heavy ___ (rain / water)", answer: "rain" },
        { prompt: "Fill the blank: to ___ a crime (do / commit)", answer: "commit" },
        { prompt: "Fill the blank: a ___ of bees (herd / swarm)", answer: "swarm" },
      ],
      traps: [
        {
          title: "Choosing a synonym that does not pair",
          body: "Severely and selectively are both adverbs, but only severely goes with criticised. Test the pair, not the word alone.",
        },
        {
          title: "Translating a pairing",
          body: "\"Do a mistake\" and \"do a promise\" come from translating. English says make a mistake, make a promise.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscczco-pattern",
      name: "The word after the blank chooses it",
      intuition:
        "Often the word right after the blank decides. Only some verbs take of (consist of), on (depend on), to (dedicated to), with (associated with) or around (revolve around). Read the blank together with the word that follows it.",
      definition:
        "- **Of:** consist of, aware of, capable of.\n" +
        "- **On:** depend on, hinge on.\n" +
        "- **To:** dedicated to, committed to, compared to, a transition to, access to.\n" +
        "- **With:** associated with, aligned with, tempered with.\n" +
        "- **Around, from, as, for:** revolve around, derived from, emerge from, perceived as, call for.\n" +
        "- **If and that:** wonder if, realise that.\n" +
        "- **Fast route:** cover the options and ask which verb you would put before that preposition.",
      authoredExample: {
        prompt: "Her success ___ on hard work and a little luck. (a) depends (b) results (c) consists (d) leads",
        steps: [
          "The word after the blank is \"on\".",
          "Results takes from, consists takes of and leads takes to; only depends takes on.",
        ],
        answer: "(a) depends",
      },
      selfCheckExample: {
        prompt: "The festival is ___ to the memory of the poet. (a) dedicated (b) presented (c) offered (d) granted",
        steps: ["The pattern is \"___ to the memory of\".", "A festival or a book is dedicated to someone's memory."],
        answer: "(a) dedicated",
      },
      practiceSet: [
        { prompt: "Which takes \"of\": consist or comprise?", answer: "Consist" },
        { prompt: "Fill the verb: Our lives ___ around our families. (revolve / rotate)", answer: "revolve" },
        { prompt: "Which preposition follows \"associated\"?", answer: "with" },
        { prompt: "Which preposition follows \"committed\" when it means devoted to a cause?", answer: "to" },
      ],
      pyqExampleId: "d2d9a4dd-5f2b-4062-9d89-0e74ccbe081a",
      traps: [
        {
          title: "Ignoring the next word",
          body: "An option can fit the meaning and still fail with the preposition after the blank. Read the blank and the next word as one unit.",
        },
        {
          title: "Comprise of",
          body: "Consist takes of; comprise takes none. \"Consists of five members\" and \"comprises five members\" are both right, \"comprises of\" is not.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscczco-precise",
      name: "The precise word among near-synonyms",
      intuition:
        "Several options can mean roughly the right thing, but only one fits exactly: oil is consumed, notes emerge from a machine, plants flourish. Picture what happens in the passage and choose the word a writer would use for that exact picture.",
      definition:
        "- **What exactly happens:** satellites are launched, data is transmitted, ATMs operate around the clock, people commute to work.\n" +
        "- **Degree and kind:** a massive increase, an abrupt quake, a joint effort (from several groups together).\n" +
        "- **The thing named:** fauna (the wild animals of a region), a caption (the text with a picture), magnitude (the size of an earthquake).\n" +
        "- **Countable or not:** the number of (countable nouns), the amount of (uncountable nouns).\n" +
        "- **Fast route:** cross out the options that are only roughly right, then choose the one that names the exact action or thing.",
      authoredExample: {
        prompt: "The ship ___ slowly into the harbour. (a) sailed (b) flew (c) drove (d) rode",
        steps: ["All four are ways of travelling.", "A ship moves on water, and the word for that is sailed."],
        answer: "(a) sailed",
      },
      selfCheckExample: {
        prompt: "The ___ of the storm was so great that trees were uprooted. (a) force (b) amount (c) number (d) quantity",
        steps: ["A storm that uproots trees has great strength.", "Strength is force; amount, number and quantity measure how much or how many."],
        answer: "(a) force",
      },
      practiceSet: [
        { prompt: "Number or amount: the ___ of students", answer: "number" },
        { prompt: "Which word names the wild animals of a region: fauna or flora?", answer: "Fauna" },
        { prompt: "Which word fits: a ___ increase in prices (massive / weighty)", answer: "massive" },
        { prompt: "What is the short text printed with a picture called?", answer: "A caption" },
      ],
      pyqExampleId: "c72acb53-faef-4252-bc6a-caccf864d90a",
      traps: [
        {
          title: "Accepting a rough synonym",
          body: "Lobbed and launched both mean sent up, but only launched is used for rockets and satellites. Choose the word for the exact action.",
        },
        {
          title: "Amount with a countable noun",
          body: "Countable nouns take number (the number of accidents); amount is for things you cannot count (the amount of water).",
        },
      ],
    },
  ],
};

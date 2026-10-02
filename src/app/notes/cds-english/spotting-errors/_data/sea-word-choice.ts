import type { SubtopicNote } from "@/app/notes/_types";

/** An underlined sentence part, written the way the paper prints it. */
const u = (s: string): string => `\\(\\underline{\\text{${s}}}\\)`;
/** A three-part spotting-errors item with option (d) No error. */
const item = (a: string, b: string, c: string): string =>
  `Find the part with the error. (a) ${u(a)} (b) ${u(b)} (c) ${u(c)} (d) No error`;

export const CDSEN_SEA_WORD_CHOICE_NOTE: SubtopicNote = {
  subtopicName: "Word Choice and Word Form",
  title: "Word choice and word form",
  oneLineDefinition:
    "Errors where the grammar looks fine but one word is wrong: a look-alike (besides for beside), a near-synonym with the wrong sense (pleasant for pleasing), or the right word in the wrong form (lowed for low).",
  whyItMatters:
    "Word-choice errors appear in CDS spotting-errors items from 2017 to 2025, and the 2025 (I) paper had several. " +
    "They are the hardest errors to see, because every part of the sentence is grammatical. You find them only by reading for meaning and asking whether each word says exactly what the sentence needs.",
  concepts: [
    // C1 — look-alike and sound-alike words
    {
      kind: "reference" as const,
      slug: "cdsensea-lookalikes",
      name: "Look-alike and sound-alike words",
      intuition:
        "English has many pairs of words that look or sound almost the same but mean different things: beside and besides, through and thorough, differ and defer. " +
        "Every one of them is a real word, so a spell-checker would pass the sentence. Only the meaning shows the error.",
      definition:
        "How to handle them:\n" +
        "- A **homophone** sounds like another word (were / where, stokes / strokes). A **look-alike** is spelt almost the same (abatement / abetment, iniquitous / inequitable).\n" +
        "- For each content word, ask: does this word mean exactly what the sentence is about? A college next to a lake is **beside** it; 'besides' means 'in addition to'.\n" +
        "- If the meaning is wrong, think of the near-twin. The intended word is nearly always one or two letters away.\n" +
        "- Learn the verb families that look alike: **lie** (rest) – lay – lain; **lay** (put down) – laid – laid; **lie** (say something false) – lied – lied.",
      table: {
        columns: ["Word in the paper", "Right word", "Meaning of each", "Sitting"],
        rows: [
          { cells: ["is besides the lake", "beside", "beside = next to; besides = in addition to", "2017 (II)"], pyqExampleId: "88b68e73-96f5-4478-893d-d23892292803" },
          { cells: ["working hardly", "hard", "hard = with effort; hardly = almost not", "2017 (I)"] },
          { cells: ["laid in the shade", "lay", "lay = past of lie (rest); laid = past of lay (put)", "2017 (I)"], pyqExampleId: "0053b95a-d76b-4bfe-b740-c775e36e00e6" },
          { cells: ["hardly won liberty", "hard-won", "hard-won = gained with great effort; hardly = scarcely", "2019 (I)"], pyqExampleId: "79f2d0da-cd11-4fed-b1e3-549f6faa45bb" },
          { cells: ["scrolling thorough", "through", "through = from one end to the other; thorough = complete, careful", "2020 (I)"], pyqExampleId: "8518d922-e6d6-45c1-a2e3-41a9c11de762" },
          { cells: ["a case were", "where", "where = in which place or case; were = past of 'are'", "2020 (I)"], pyqExampleId: "f321f0fc-146a-425a-ae2b-d500ec8c42bc" },
          { cells: ["LIC was found", "founded", "found, founded, founded = establish; found = past of find", "2022 (I)"], pyqExampleId: "198d3722-83db-4fb5-b943-b55a3c605c9d" },
          { cells: ["defers from", "differs", "differ from = be unlike; defer = put off, or give way", "2023 (I)"], pyqExampleId: "461e04ce-2869-4f7b-9649-cd62bb5b131f" },
          { cells: ["Trucked neatly under the clothes", "Tucked", "tuck = push into a snug place; truck = carry by lorry", "2023 (II)"], pyqExampleId: "76bc6cc9-1d31-46d4-ac8e-be3f45cb4053" },
          { cells: ["abatement to the crime", "abetment", "abetment = helping someone commit a crime; abatement = reduction", "2025 (I)"], pyqExampleId: "c0e0513c-1f7e-4f17-8961-9c084e92e8bc" },
          { cells: ["the imperial stokes he played", "strokes", "stroke = a shot in cricket; stoke = feed a fire", "2025 (I)"], pyqExampleId: "440292a5-8d5b-4e50-ba46-a3f8b58fca21" },
          { cells: ["distribution was iniquitous", "inequitable", "inequitable = unfair, unequal; iniquitous = wicked", "2025 (I)"], pyqExampleId: "3b2c4674-e121-433d-90fc-3971425068e0" },
        ],
      },
      pyqExampleId: "88b68e73-96f5-4478-893d-d23892292803",
      selfCheckExample: {
        prompt: item("The principal", "complemented the team", "on its fine performance."),
        steps: [
          "Read for meaning: the principal praised the team.",
          "'Complement' means 'complete' or 'go well with' (a scarf that complements a dress).",
          "Praise is a **compliment**, with an i. The look-alike sits in part (b).",
        ],
        answer: "(b). The principal **complimented** the team on its fine performance.",
      },
      practiceSet: [
        { prompt: "Which word fits: 'The new law will ___ every farmer.' (affect / effect)", answer: "affect", method: "affect = verb, to influence; effect = noun, a result" },
        { prompt: "Which word fits: 'She ___ the baby gently in the cot.' (lay / laid)", answer: "laid", method: "lay (put down) – laid – laid" },
        { prompt: "Spot the wrong row: 'abetment = reduction'.", answer: "Wrong. Abetment = helping a crime; abatement = reduction." },
        { prompt: "Which word fits: 'The two reports ___ on the cause of the fire.' (defer / differ)", answer: "differ" },
      ],
      traps: [
        {
          title: "Every look-alike is a real word",
          body: "'Stokes', 'were', 'found' and 'thorough' are all correct spellings of real words, so the sentence looks clean. Read each content word for meaning, not for spelling.",
        },
        {
          title: "Hard and hardly mean opposite things",
          body: "'She works **hard**' means with great effort. 'She **hardly** works' means she almost does not work. 'Hardly' is not the adverb of 'hard'; 'hard' is its own adverb.",
        },
        {
          title: "Lie, lay and lied",
          body: "To rest: lie – **lay** – lain ('He lay under a tree'). To put something down: lay – **laid** – laid ('She laid the book down'). To tell a falsehood: lie – **lied** – lied. A person who rested 'laid' under a tree is wrong.",
        },
        {
          title: "Found and founded",
          body: "'Found' is also a verb meaning 'establish': found – **founded** – founded. An institution 'was founded in 1956'. 'Was found' means somebody discovered it.",
        },
      ],
    },

    // C2 — right idea, wrong word (connotation and exact sense)
    {
      kind: "reference" as const,
      slug: "cdsensea-wrong-sense",
      name: "Right idea, wrong word",
      intuition:
        "Here the word is close to the right meaning but not exact. Results can be pleasing, but not pleasant. A man who started a company is its founding director, not its foundational one. " +
        "Each word has its own **connotation**: the feeling and the kind of situation it belongs to.",
      definition:
        "How to check:\n" +
        "- Say in your own words what the sentence wants to say.\n" +
        "- Take the doubtful word and give its exact meaning. If the two do not match, the word is wrong, even if it is close.\n" +
        "- Watch for words that share a root but not a use: **form** (shape) and **formation** (the process of forming); **founding** (who started it) and **foundational** (forming a base).\n" +
        "- Watch for fixed partners: you **defeat** a purpose, you **explore** opportunities, you **let** someone do something.",
      table: {
        columns: ["Word in the paper", "Right word", "Why", "Sitting"],
        rows: [
          { cells: ["test results were pleasant", "pleasing", "pleasant = enjoyable (a pleasant day); pleasing = satisfying (pleasing results)", "2018 (I)"], pyqExampleId: "ca08ce38-9834-4d9e-b6bf-d81cafc00933" },
          { cells: ["will not leave you give blood", "let", "let + base verb = allow; leave = go away from", "2018 (I)"] },
          { cells: ["the form of the Great Lakes was slow", "formation", "formation = the process; form = the shape", "2018 (I)"], pyqExampleId: "c52e850d-1e89-42be-8b39-978a7b04886d" },
          { cells: ["the foundational director", "founding", "founding = who helped start it; foundational = forming a base", "2019 (I)"], pyqExampleId: "f45bb9e3-5109-4c63-ad1c-9403a5e00ccf" },
          { cells: ["Anywhere in the world", "Everywhere", "everywhere = in every place (a general truth); anywhere = in any one place", "2019 (I)"] },
          { cells: ["expunging revenue opportunities", "exploring", "explore = look into; expunge = erase", "2023 (II)"], pyqExampleId: "f7afc07e-b0c9-4e99-adcf-3d2a10d48bb6" },
          { cells: ["an uninterested participant", "a disinterested", "disinterested = neutral, with nothing to gain; uninterested = not interested", "2024 (II)"] },
          { cells: ["defied the purpose", "defeated", "defeat the purpose = work against it; defy = openly refuse to obey", "2025 (I)"], pyqExampleId: "1d653595-1fda-4d7b-a380-5adf0ea56c65" },
        ],
      },
      pyqExampleId: "f45bb9e3-5109-4c63-ad1c-9403a5e00ccf",
      selfCheckExample: {
        prompt: item("The museum holds", "many historic documents", "from the Mughal period."),
        steps: [
          "What does the sentence mean? The documents come from, and tell about, the past.",
          "'Historic' means famous or important in history (a historic win). 'Historical' means connected with the past.",
          "Old records of a period are **historical**. The wrong word sits in part (b).",
        ],
        answer: "(b). The museum holds many **historical** documents from the Mughal period.",
      },
      practiceSet: [
        { prompt: "Which word fits: 'We spent a ___ evening by the sea.' (pleasant / pleasing)", answer: "pleasant", method: "an enjoyable experience" },
        { prompt: "Which word fits: 'My parents will not ___ me travel alone.' (leave / let)", answer: "let", method: "let + base verb = allow" },
        { prompt: "Which word fits: 'Shouting at the meeting will only ___ its purpose.' (defy / defeat)", answer: "defeat" },
        { prompt: "Which word fits: 'A judge must be ___ in every case.' (uninterested / disinterested)", answer: "disinterested", method: "neutral, with nothing to gain" },
      ],
      traps: [
        {
          title: "Disinterested does not mean bored",
          body: "**Disinterested** = neutral, with nothing to gain (a disinterested judge). **Uninterested** = not interested, bored. Someone who claims to be neutral in a deal claims to be disinterested.",
        },
        {
          title: "The wrong word can be perfectly grammatical",
          body: "'The university is expunging revenue opportunities' has a correct subject, verb and object. It is wrong only because it makes no sense. If every grammar check passes, read the sentence once more for meaning before choosing No error.",
        },
        {
          title: "A shape is not a process",
          body: "A process can be slow; a shape cannot. When a sentence talks about how something happened over time, it needs the process noun: **formation**, **construction**, **development**.",
        },
      ],
    },

    // C3 — wrong word form
    {
      kind: "formula" as const,
      slug: "cdsensea-word-form",
      name: "Wrong word form: what part of speech the slot needs",
      intuition:
        "Sometimes the word is right but its form is wrong: a verb where a noun should be, an -ed where none belongs, a plural of a word that has no plural. " +
        "Every slot in a sentence needs one **part of speech** (noun, verb, adjective, adverb). The words around the slot tell you which one.",
      definition:
        "**Read the neighbours of the slot:**\n" +
        "- After **very / extremely / too** and a linking verb (is, was, seems): an **adjective**. 'The fee is too **high**.'\n" +
        "- After an adjective, or after a preposition: a **noun**. 'attractive **returns**', 'people in **need**'.\n" +
        "- After a modal (**can, could, will, must, should, may**): the **base verb**. 'can **succeed**', never 'can succeeded'.\n" +
        "- In a list joined by 'and', every item has the same form: 'safety, liquidity and **returns**' (three nouns).\n" +
        "**Two more checks:**\n" +
        "- An **uncountable noun** has no plural: harmony, advice, information, furniture, equipment.\n" +
        "- A fixed phrase keeps its exact form: **a great deal of**, **in need**, **at the instance of**.",
      authoredExample: {
        prompt: item("The new bridge", "has made travel", "more safety for villagers."),
        steps: [
          "Read the sentence: the bridge has made travel ... what? We need a word that describes travel.",
          "'Made travel ___' needs an adjective, and 'more' before the slot also points to an adjective.",
          "'Safety' is a noun. The adjective is 'safe', and its comparative is 'safer'.",
          "The wrong form sits in part (c).",
        ],
        answer: "(c). The new bridge has made travel **safer** for villagers.",
      },
      selfCheckExample: {
        prompt: item("The committee", "will judge", "the success or failed of the plan."),
        steps: [
          "'The success or ___' joins two things with 'or', so both must be nouns.",
          "'Failed' is a verb form. The noun is 'failure'.",
          "The wrong form sits in part (c).",
        ],
        answer: "(c). The committee will judge the success or **failure** of the plan.",
      },
      practiceSet: [
        { prompt: "Correct it: 'He gave me many useful advices.'", answer: "He gave me **some useful advice**.", method: "'Advice' is uncountable: no plural, no 'many'." },
        { prompt: "Correct it: 'She must completed the form today.'", answer: "She must **complete** the form today.", method: "A modal takes the base verb." },
        { prompt: "Correct it: 'The fee is too height for most students.'", answer: "The fee is too **high** for most students.", method: "After 'too' + 'is': an adjective." },
        { prompt: "Correct it: 'His explain was not clear to anyone.'", answer: "His **explanation** was not clear to anyone.", method: "After 'his': a noun." },
      ],
      pyqExampleId: "d10bb51b-28ba-497e-b0ad-ee1f0928cde3",
      traps: [
        {
          title: "Not every -ed word is an adjective",
          body: "Some adjectives end in -ed (tired, excited, crowded). Most do not: 'low', 'high', 'deep' and 'strong' never take -ed. If the -ed form would make a verb ('lowered'), check whether the sentence wants an action or a description.",
        },
        {
          title: "Uncountable nouns have no plural",
          body: "'Harmonies', 'advices', 'informations' and 'furnitures' are errors. Use the singular, with 'much', 'some' or 'a piece of' if you need to count.",
        },
        {
          title: "A modal takes the base verb, always",
          body: "After can, could, will, would, shall, should, may, might and must, the verb has no -s, no -ed and no -ing: 'can **succeed**', 'must **go**', 'should **know**'.",
        },
        {
          title: "Fixed phrases keep their exact form",
          body: "It is 'a great **deal** of', not 'a great dealing of'; 'people in **need**', not 'in needed'. Changing one letter of a fixed phrase is an error, even when the meaning still comes through.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_CZ_LINKERS_NOTE: SubtopicNote = {
  subtopicName: "Linkers and Clause Openers",
  title: "Linkers and Clause Openers: What Joins the Two Halves",
  oneLineDefinition:
    "A linker joins two ideas and shows how they relate. Read both halves, name the relation, then check the grammar that follows the blank.",
  whyItMatters:
    "These blanks test whether you follow the writer's argument, not just the words. The options are often all joining words that signal different relations. " +
    "Choosing one that signals the opposite relation is the commonest mistake, and the second is choosing the right relation in the wrong grammar.",
  concepts: [
    // C1 — reference: linkers and what they signal
    {
      kind: "reference" as const,
      slug: "cdsencz-linker-signals",
      name: "Linkers and what they signal",
      intuition:
        "Before you look at the options, read the two halves the blank joins and say how they relate: more of the same, a contrast, a reason, a choice, or a step in time. " +
        "Then pick the linker that signals that relation and fits the grammar after it.",
      definition:
        "The terms:\n" +
        "- **Linker**: a word that joins two ideas and shows how they relate.\n" +
        "- **Addition**: the second idea adds to the first (and, also).\n" +
        "- **Contrast**: the second idea goes against the first (but, yet).\n" +
        "- **Concession**: admitting one point while making another (though, despite, even).\n" +
        "- **Reason**: the second idea explains the first (because).\n" +
        "How to handle them:\n" +
        "- Name the relation between the two halves first.\n" +
        "- Then check what follows the blank. A full clause (a subject and a verb) needs because, though or when. A noun or an -ing form needs because of or despite.\n" +
        "- also sits inside a clause, after the subject or the helping verb: they also have. It does not join two clauses on its own.",
      table: {
        columns: ["Relation", "Linker", "In the passage", "Sitting"],
        rows: [
          { cells: ["Addition", "and", "on peace and living together", "2021 (I)"] },
          { cells: ["Addition", "and", "I lose my head and when I try to do any business there, I behave like an idiot", "2017 (II)"] },
          { cells: ["Addition, inside a clause", "also", "those with more equal learning outcomes also have better average learning outcomes", "2025 (II)"] },
          { cells: ["Alternative", "or", "life grows across it like grass or trees", "2021 (I)"] },
          { cells: ["Concession, before a noun", "despite", "repeated alcohol consumption despite related legal and health issues", "2022 (I)"] },
          { cells: ["Concession, before a clause", "though", "Though the term 'ecology' was first coined and used by the German biologist Ernst Haeckel in 1869, ...", "2019 (II)"] },
          { cells: ["Emphasis: even this case", "even", "he feels that even the happiest man feels elated", "2025 (I)"] },
          { cells: ["Reason, before a clause", "because", "started dying because their internal system was getting blocked", "2021 (II)"] },
          { cells: ["First step in time", "initially", "Initially when English translations were made, they flipped the pictures", "2018 (II)"] },
        ],
        caption: "Name the relation first, then check what follows: a clause or a noun.",
      },
      pyqExampleId: "dd446534-4eab-43c7-a30b-df7ff324cb8a",
      selfCheckExample: {
        prompt:
          "The patrol pushed on ___ the heavy rain, ___ the river was rising fast. (a) despite, though (b) though, despite (c) because, despite (d) despite, because",
        steps: [
          "First blank: 'the heavy rain' is a noun, and the patrol went on against it. Concession before a noun: despite.",
          "Second blank: 'the river was rising fast' is a full clause, and it is another difficulty they faced. Concession before a clause: though.",
          "'because the river was rising' would make the rising river the reason they pushed on, which makes no sense.",
        ],
        answer: "(a) despite, though",
      },
      practiceSet: [
        { prompt: "He passed the test ___ he had little time to prepare. (because / though)", answer: "though", method: "Concession: little time, yet he passed." },
        { prompt: "___ the noise, the sentry stayed alert. (Though / Despite)", answer: "Despite", method: "A noun follows." },
        { prompt: "You can take the bus ___ walk. (or / and)", answer: "or", method: "A choice." },
        { prompt: "Spot the wrong row: 'Despite he was tired, he ran.'", answer: "Wrong. despite needs a noun: Despite being tired, or Though he was tired." },
      ],
      traps: [
        {
          title: "The right relation in the wrong grammar",
          body:
            "of and for can also give a reason, but only before a noun. A full clause such as 'their system was getting blocked' needs **because**. Check what follows the blank.",
        },
        {
          title: "A linker that signals the opposite",
          body:
            "though and because both join clauses, but one concedes and the other explains. Read both halves and ask: does the second half explain the first, or go against it?",
        },
        {
          title: "In spite of where the sentence needs a clause",
          body:
            "'In spite of the term ecology was first coined ...' is wrong: in spite of, like despite, needs a noun. Before a full clause, use **though**.",
        },
      ],
    },

    // C2 — paired linkers
    {
      kind: "formula" as const,
      slug: "cdsencz-paired-linkers",
      name: "A paired linker is decided by its partner",
      intuition:
        "Some linkers come in pairs: both ... and, either ... or, neither ... nor, not only ... but also, not ... but. " +
        "If you see one half, the blank is its partner.",
      definition:
        "The terms:\n" +
        "- **Correlative pair**: two linkers that work together across a sentence.\n" +
        "The method:\n" +
        "- Scan the whole sentence around the blank for half of a pair: not, either, neither, not only, and, or, nor.\n" +
        "- If one half is there, the blank is its partner. both goes with and; either with or; neither with nor; not only with but also; not X with but Y.\n" +
        "- If the blank comes before 'X and Y', try both: 'both on war in general, and on any particular war'.\n" +
        "- The partner can be many words away. Read to the end of the sentence.\n" +
        "- The two halves join things of the same kind: two nouns, two phrases or two clauses.",
      authoredExample: {
        prompt:
          "Fill both blanks: '___ the captain nor the coach could explain the defeat, and the players were ___ tired and hungry.' First blank: Either / Neither / Both. Second blank: both / either / neither.",
        steps: [
          "First blank: 'nor' appears later in the clause. nor is the partner of neither: Neither.",
          "Second blank: 'tired and hungry' are two adjectives joined by and. and is the partner of both: both.",
        ],
        answer: "Neither; both",
      },
      selfCheckExample: {
        prompt: "You can ___ wait here or come with us. (a) both (b) neither (c) either (d) not only",
        steps: [
          "The partner later in the sentence is 'or'.",
          "or pairs with either.",
        ],
        answer: "(c) either",
      },
      practiceSet: [
        { prompt: "___ the officers nor the men knew the route.", answer: "Neither", method: "nor pairs with neither." },
        { prompt: "The plan is ___ cheap and safe.", answer: "both", method: "and pairs with both." },
        { prompt: "Either you report on time ___ you lose your leave.", answer: "or", method: "either pairs with or." },
        { prompt: "She speaks not only Hindi ___ Marathi. (but also / and also)", answer: "but also", method: "not only pairs with but also." },
      ],
      pyqExampleId: "c7ebbcff-709f-4d8c-9974-d306f5996847",
      traps: [
        {
          title: "Mixing the partners",
          body: "'either ... nor' and 'neither ... or' are both wrong. Each half has one partner only.",
        },
        {
          title: "Missing a partner far away",
          body:
            "In a long sentence the second half can come a line later. If you choose without reading to the end, a word like 'however' or 'as well as' can look right in place of **both**.",
        },
        {
          title: "both with more than two",
          body: "both joins exactly two things. For three or more, drop both: 'He is brave, honest and fit.'",
        },
      ],
    },

    // C3 — clause openers
    {
      kind: "formula" as const,
      slug: "cdsencz-clause-openers",
      name: "Clause openers: that, whether, which, where, when, how",
      intuition:
        "Some blanks open a whole clause. The opener depends on the job of the clause: a fact (that), a yes-or-no question (whether), a time (when), " +
        "a place or a situation (where), a manner (how), or extra detail about a noun (which).",
      definition:
        "The terms:\n" +
        "- **Clause opener**: a word that starts a clause inside a bigger sentence.\n" +
        "- **Relative pronoun**: which, who or that, used to add detail about a noun. It fills a place inside its own clause, as subject or object.\n" +
        "- **Noun clause**: a clause that works as a noun, often after verbs such as show, know or judge: showed that ..., judge whether ...\n" +
        "The method:\n" +
        "- Read the clause after the blank. Is it complete, with its own subject and object, or does it have a gap?\n" +
        "- It has a gap (no subject, or a missing object): which or who. 'Leadership which initiates ...': which is the subject of initiates.\n" +
        "- It is complete and follows a noun of place or situation: where. After a noun of time: when ('a time when he was still a primitive being').\n" +
        "- It is complete and follows a verb such as show, prove or say: that.\n" +
        "- After judge, ask or know, with an open yes-or-no idea ('is or is not'): whether.\n" +
        "- It explains the way something happens: how ('understanding how habits work').\n" +
        "- 'It's not that ...' is a fixed opener for denying a reason.",
      authoredExample: {
        prompt:
          "Fill the three blanks: 'The cadets could not decide ___ the river was safe to cross. They waited for the hour ___ the water was lowest, and then held a rope ___ the guide had tied across it.' Options: (whether / that / which); (when / which / how); (which / how / when)",
        steps: [
          "First blank: 'could not decide' + an open yes-or-no idea (safe or not). That calls for whether.",
          "Second blank: after 'the hour', a noun of time, and 'the water was lowest' is complete. So when.",
          "Third blank: 'the guide had tied ___ across it' is missing its object, the rope. A gap after a noun calls for which.",
        ],
        answer: "whether; when; which",
      },
      selfCheckExample: {
        prompt: "The report proved ___ the bridge had been weakened by floods. (a) which (b) that (c) where (d) what",
        steps: [
          "'the bridge had been weakened by floods' is a complete clause; nothing is missing.",
          "It follows the verb 'proved' and states a fact: that.",
          "which needs a gap; where needs a place noun; what needs a gap too.",
        ],
        answer: "(b) that",
      },
      practiceSet: [
        { prompt: "I don't know ___ he will come or not.", answer: "whether", method: "An open yes-or-no idea." },
        { prompt: "This is the book ___ changed my life.", answer: "which", method: "The clause has no subject: which fills it." },
        { prompt: "Teach me ___ this machine works.", answer: "how", method: "The way it works." },
        { prompt: "I remember the year ___ we moved to Pune.", answer: "when", method: "A noun of time, complete clause." },
      ],
      pyqExampleId: "ff4797d1-dbd5-445f-93dd-186a2bca5552",
      traps: [
        {
          title: "which before a complete clause",
          body:
            "'the village which I was born' is wrong: 'I was born' is complete, so nothing is left for which to fill. Use **where** (or in which).",
        },
        {
          title: "that where the idea is open",
          body:
            "'it is impossible to judge ___ a war is or is not likely to be beneficial' leaves the answer open, so **whether**. that would state it as a fact.",
        },
        {
          title: "what after a noun",
          body:
            "what already contains its own noun ('the thing that'). After a noun such as 'the book', use which or that, never what.",
        },
      ],
    },
  ],
};

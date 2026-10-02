import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PQ_PREPOSITIONS_NOTE: SubtopicNote = {
  subtopicName: "Prepositions and Their Objects (PQRS)",
  title: "A preposition needs its object",
  oneLineDefinition:
    "A part that ends on of, to, in or with is unfinished, so its object must come right after it. A part that starts with of hangs on a noun that must come right before it.",
  whyItMatters:
    "Examiners often cut a sentence right after a preposition (the study of, warned us about) or right before one (of the government). " +
    "Such a cut is the strongest clue in the item. The two parts on either side of it must touch, so one look at the options often settles the order.",
  concepts: [
    // C1 — preposition at the end of a part
    {
      kind: "formula",
      slug: "cdsenpq-prep-at-end",
      name: "A part that ends in of, to, with: its object comes next",
      intuition:
        "A preposition at the end of a part points forward. The study of what? Warned us about what? " +
        "The part that answers the question must come next, with nothing in between.",
      definition:
        "The terms:\n" +
        "- **Preposition**: a small word that links a noun to the rest of the sentence: of, to, in, with, about, into, for.\n" +
        "- **Object of a preposition**: the noun phrase that follows it and completes it: in **the hills**, about **the danger**.\n" +
        "- **Hanging end**: a part that ends on a word which cannot finish a sentence, such as a preposition, 'and', 'the' or 'is'.\n" +
        "The method:\n" +
        "- Read the last word of each part. Mark every part with a hanging end.\n" +
        "- For each one ask: of what? to what? with what? The answer is a noun phrase in another part.\n" +
        "- Lock the pair: preposition part, then its object part. Two such links often form a chain of three parts.\n" +
        "- Strike every option that puts a hanging-end part last.\n" +
        "- Some words come with a fixed preposition: unaccustomed to, a testimony of, warned about, the effects of. Use them as clues.",
      authoredExample: {
        prompt:
          "Arrange the parts into one sentence. P: the dangers of / Q: the officer warned / R: the new recruits about / S: swimming in the lake at night. " +
          "Options: (a) QRPS (b) QPRS (c) RPSQ (d) QSRP",
        steps: [
          "Hanging ends: R ends on 'about', P ends on 'of'.",
          "About what? P, 'the dangers of'. Of what? S, 'swimming in the lake at night'. So the chain is R P S.",
          "Q holds the subject and verb, 'the officer warned', and warned whom? R. So Q comes first.",
          "Only (a) has Q R P S. (c) starts with R, which leaves 'the officer warned' with nothing after it.",
          "Read it: 'the officer warned the new recruits about the dangers of swimming in the lake at night'.",
        ],
        answer: "(a) QRPS",
      },
      selfCheckExample: {
        prompt:
          "Arrange the parts into one sentence. P: proud of / Q: the whole village was / R: the young athlete / S: who won the race. " +
          "Options: (a) QPRS (b) QRPS (c) RSQP (d) PRSQ",
        steps: [
          "Q ends on 'was', which needs a complement: P, 'proud of'.",
          "P ends on 'of'. Proud of whom? R, 'the young athlete'. S then describes the athlete.",
          "Only (a) has Q P R S. (c) ends on P, leaving 'of' hanging.",
        ],
        answer: "(a) QPRS",
      },
      practiceSet: [
        {
          prompt: "Can 'a deep interest in' end the sentence?",
          answer: "No.",
          method: "in needs its object: a deep interest in history.",
        },
        {
          prompt: "Arrange: P: the importance of / Q: discipline / R: the general spoke about",
          answer: "R, P, Q: the general spoke about the importance of discipline.",
          method: "Both about and of point forward, so they form a chain.",
        },
        {
          prompt: "Part Q ends on 'with'. Options: (a) SPRQ (b) PQSR (c) RSPQ (d) QRSP. Which options can you strike at once?",
          answer: "(a) and (c)",
          method: "They put Q last, so 'with' is left hanging.",
        },
      ],
      pyqExampleId: "c053ed93-8eea-4547-beeb-1be29ec7cb62",
      traps: [
        {
          title: "Leaving a preposition at the end",
          body:
            "An option that ends on a part like 'the effects of' or 'unaccustomed to' leaves the sentence unfinished. " +
            "Check the last part of every option first; it is the quickest cut.",
        },
        {
          title: "A noun that fits the shape but not the sense",
          body:
            "After 'the history of', both 'the regiment' and 'the general spoke' begin with a noun. Only one makes sense with history. " +
            "Test the meaning of the full phrase.",
        },
        {
          title: "A plain verb after a preposition",
          body:
            "After a preposition, a verb takes the -ing form: instead of **studying**, about **swimming**. " +
            "A part that starts with a plain verb (study, swim) cannot follow a part that ends on a preposition.",
        },
      ],
    },

    // C2 — preposition at the start of a part
    {
      kind: "formula",
      slug: "cdsenpq-prep-at-start",
      name: "A part that starts with of: its noun comes before",
      intuition:
        "This is the mirror image. A part that starts with of is a tail. It hangs on a noun that must end the part before it: the captain | of the team.",
      definition:
        "The terms:\n" +
        "- **Head noun**: the main noun that a following of-phrase describes: the **captain** of the team, the **completion** of the work.\n" +
        "The method:\n" +
        "- Spot a part that starts with of (or another preposition) and so cannot begin the sentence.\n" +
        "- Find the part that ends on a noun the of-phrase can belong to. That noun is its head noun.\n" +
        "- Lock the pair: head-noun part, then the of-part.\n" +
        "- If the of-part also ends on a verb (of the club is), that verb belongs to the head noun. The head-noun part is then the subject and comes first.\n" +
        "- A part that starts with of can never open the sentence.",
      authoredExample: {
        prompt:
          "Arrange the parts into one sentence. P: of the new barracks / Q: the construction / R: will begin / S: after the rains. " +
          "Options: (a) QPRS (b) PQRS (c) QRPS (d) SPQR",
        steps: [
          "P starts with of. It cannot open, so strike (b).",
          "Of the new barracks describes which noun? Q, 'the construction'. Lock Q P.",
          "Only (a) has Q then P side by side.",
          "The head noun 'construction' is the subject, so R, 'will begin', follows. S closes it.",
          "Read it: 'the construction of the new barracks will begin after the rains'.",
        ],
        answer: "(a) QPRS",
      },
      selfCheckExample: {
        prompt:
          "Arrange the parts into one sentence. P: of the club / Q: the members / R: voted against / S: the new rule. " +
          "Options: (a) QPRS (b) QRPS (c) PQRS (d) SPQR",
        steps: [
          "P starts with of, so (c) is out. Its head noun is Q, 'the members'. Lock Q P.",
          "R ends on 'against', which needs its object S.",
          "Only (a) has Q P and R S.",
        ],
        answer: "(a) QPRS",
      },
      practiceSet: [
        {
          prompt: "Which part comes right before 'of the old temple'? P: the walls / Q: is ancient",
          answer: "P: the walls of the old temple.",
        },
        {
          prompt: "Can a part that starts with 'of the hospital' open the sentence?",
          answer: "No.",
          method: "It needs a head noun before it: the doctors of the hospital.",
        },
        {
          prompt: "Lock the pair. P: of the school / Q: the principal / R: gave a speech",
          answer: "Q then P. Order QPR: the principal of the school gave a speech.",
        },
      ],
      pyqExampleId: "464a80a0-efc5-4e51-ab99-fc3d23f368ed",
      traps: [
        {
          title: "Opening with an of-part",
          body:
            "No sentence starts with 'of the government' or 'of high quality products'. Strike every option that opens with such a part.",
        },
        {
          title: "Attaching the of-phrase to the wrong noun",
          body:
            "In 'a picture / of the general / the colonel painted', the colonel painted a picture of the general. " +
            "'the colonel of the general' makes no sense. Pick the head noun that the of-phrase can really describe.",
        },
        {
          title: "Missing the verb inside the of-part",
          body:
            "A part like 'of the team is' carries the verb for its head noun. So the head-noun part is the subject. " +
            "It must come first, with the of-part right after it.",
        },
      ],
    },
  ],
};

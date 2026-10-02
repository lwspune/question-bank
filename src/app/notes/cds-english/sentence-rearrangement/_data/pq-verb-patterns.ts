import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PQ_VERB_PATTERNS_NOTE: SubtopicNote = {
  subtopicName: "Verb Patterns (PQRS)",
  title: "What a verb takes next",
  oneLineDefinition:
    "Many verbs must be followed by something specific: an object, a that-clause, or to plus a verb. Find the part that supplies it and lock it after the verb.",
  whyItMatters:
    "Once the subject and the verb are joined, the next question is what comes after the verb. " +
    "A verb like reported, ordered or uses fixes what follows it, so the part that supplies it is the next link in the chain. " +
    "This settles the options that the subject-and-verb pair alone could not.",
  concepts: [
    // C1 — verb + object
    {
      kind: "formula",
      slug: "cdsenpq-verb-object",
      name: "A doing verb takes its object",
      intuition:
        "Many verbs need a noun after them: the thing that is built, sold or visited. " +
        "If a part ends on such a verb, the next part must give that noun, and nothing else may come between them.",
      definition:
        "The terms:\n" +
        "- **Object**: the noun or noun phrase that receives the action of the verb: they built **a bridge**; she visited **the old fort**.\n" +
        "The method:\n" +
        "- Read the last word of each part. A part that ends on a verb like made, built, sold, visit or recognizing wants its object next.\n" +
        "- Find the part that gives a sensible object: something that can be built, sold or visited.\n" +
        "- Lock the pair: verb part, then object part.\n" +
        "- A verb inside a describing clause ('who are building', 'that he ordered') still needs its object right after it.\n" +
        "- Then attach the other parts, such as time, place and reason, after the object.",
      authoredExample: {
        prompt:
          "Arrange the parts into one sentence. P: a new bridge / Q: the engineers who are building / R: over the river / S: have asked for more time. " +
          "Options: (a) QPRS (b) QSPR (c) PRQS (d) QRPS",
        steps: [
          "Q ends on 'building'. Building what? The object is P, 'a new bridge'. Lock Q P.",
          "Only (a) has Q then P side by side. (b) and (d) push other parts between the verb and its object; (c) puts P before Q.",
          "Check (a): R, 'over the river', tells where the bridge is, and S gives the main verb of 'the engineers'.",
          "Read it: 'the engineers who are building a new bridge over the river have asked for more time'.",
        ],
        answer: "(a) QPRS",
      },
      selfCheckExample: {
        prompt:
          "Arrange the parts into one sentence. P: a letter / Q: to his mother / R: every Sunday / S: the young cadet writes. " +
          "Options: (a) SPQR (b) SQRP (c) RPSQ (d) SRPQ",
        steps: [
          "S holds the subject and the verb 'writes'. Writes what? P, 'a letter'. Lock S P.",
          "Only (a) has S then P side by side. In (d), 'every Sunday' cuts the verb off from its object.",
          "Read it: 'the young cadet writes a letter to his mother every Sunday'.",
        ],
        answer: "(a) SPQR",
      },
      practiceSet: [
        {
          prompt: "Which part follows 'the farmers sold'? P: in the market / Q: their wheat / R: last week",
          answer: "Q. The farmers sold their wheat in the market last week.",
          method: "The object comes right after the verb; place and time come later.",
        },
        {
          prompt: "Lock the pair. P: the old fort / Q: tourists from many countries visit / R: every winter",
          answer: "Q then P. Order QPR.",
          method: "visit needs what is visited.",
        },
        {
          prompt: "Is this order right? 'The coach praised / for their effort / the players'",
          answer: "No. The coach praised the players for their effort.",
          method: "praised needs its object before the reason.",
        },
      ],
      pyqExampleId: "d258a9bb-9857-4c68-b2a6-6abb90901a09",
      traps: [
        {
          title: "A phrase between the verb and its object",
          body:
            "'praised in the evening the players' sounds wrong because the object is pushed away from its verb. " +
            "In these items the object comes straight after the verb; time and place phrases come after the object.",
        },
        {
          title: "An object that fits the grammar but not the meaning",
          body:
            "In 'the farmer sold / the market / his crop', the words 'sold the market' have the right shape but make no sense. " +
            "Test the meaning of verb + object, not just the grammar.",
        },
        {
          title: "Missing a verb at the end of a long part",
          body:
            "The verb that needs an object may be the very last word of a long part: 'on reaching', 'by recognizing'. " +
            "Read the last word of each part, not only the first.",
        },
      ],
    },

    // C2 — reporting verb + that-clause
    {
      kind: "formula",
      slug: "cdsenpq-that-clause",
      name: "Said, found, suggested: the that-clause follows",
      intuition:
        "Verbs of saying, thinking and finding (said, believe, found out, reported, forecasts) report an idea. " +
        "The idea comes in a clause that starts with that, and it follows the verb directly.",
      definition:
        "The terms:\n" +
        "- **That-clause**: a group of words that starts with that and has its own subject and verb. It says what was said, thought or found: she said **that the road was closed**.\n" +
        "The method:\n" +
        "- Spot a part that ends on a reporting verb: said, believe, found out, reported, announced, forecasts, seeing.\n" +
        "- The part that starts with that comes right after it. Lock the pair.\n" +
        "- Then finish the that-clause. It needs its own subject and verb, and often a time, place or comparison to close it.\n" +
        "- that after a noun ('the fact that', 'a quality that') is different. It belongs to that noun, so the noun part comes right before it.",
      authoredExample: {
        prompt:
          "Arrange the parts into one sentence. P: that the bridge was unsafe / Q: the engineers reported / R: for heavy trucks / S: after the floods. " +
          "Options: (a) QPRS (b) QRPS (c) PQSR (d) QSRP",
        steps: [
          "Q holds the subject and the verb 'reported', a reporting verb.",
          "Reported what? The that-clause P, 'that the bridge was unsafe'. Lock Q P.",
          "Only (a) has Q then P side by side.",
          "R finishes the idea (unsafe for heavy trucks) and S, a time phrase, closes it.",
          "Read it: 'the engineers reported that the bridge was unsafe for heavy trucks after the floods'.",
        ],
        answer: "(a) QPRS",
      },
      selfCheckExample: {
        prompt:
          "Arrange the parts into one sentence. P: that the river had changed its course / Q: the villagers / R: noticed / S: after the storm. " +
          "Options: (a) QRPS (b) QPRS (c) RQPS (d) QSPR",
        steps: [
          "Subject Q, verb R: 'the villagers noticed'. Lock Q R.",
          "Noticed what? P, the that-clause. Lock R P.",
          "Only (a) has Q R P in a row. S closes it.",
        ],
        answer: "(a) QRPS",
      },
      practiceSet: [
        {
          prompt: "Which part follows 'the doctor believes'? P: after a week / Q: that the wound will heal",
          answer: "Q, then P. The doctor believes that the wound will heal after a week.",
        },
        {
          prompt: "Can 'the report claimed' end the sentence?",
          answer: "No.",
          method: "claimed needs what was claimed: a that-clause such as 'that the road was safe'.",
        },
        {
          prompt: "Lock the pair. P: that the train would be late / Q: the station master announced / R: by an hour",
          answer: "Q then P. Order QPR.",
        },
      ],
      pyqExampleId: "811f8148-e5e4-4fcc-b2d6-83b7f2fe281d",
      traps: [
        {
          title: "Splitting the verb from its that-clause",
          body:
            "When one part ends on a reporting verb and another starts with that, put them together. " +
            "An option that pushes a time or place phrase between them is almost always wrong.",
        },
        {
          title: "Leaving the that-clause unfinished",
          body:
            "'that some of the cadets were going to' has no end yet: going to where? The part that finishes the clause comes next, before anything else.",
        },
        {
          title: "Reading every that as reporting",
          body:
            "In 'the fact that' or 'a quality that varies', that describes the noun before it. " +
            "Do not look for a reporting verb; look for the noun, and lock the noun part before the that-part.",
        },
      ],
    },

    // C3 — reference: verb + to, verb + X as Y
    {
      kind: "reference",
      slug: "cdsenpq-to-and-as",
      name: "Verb + to, verb + X as Y",
      intuition:
        "Some verbs and nouns are followed by to plus a verb: ordered to pay, launched to provide. " +
        "Others take two items joined by as: use X as Y. Know the pattern and two parts click together.",
      definition:
        "The terms:\n" +
        "- **Verb pattern**: what a verb must have after it, fixed by usage: order someone to do something; use something as something.\n" +
        "- **To + verb**: to followed by the plain form of a verb: to pay, to provide, to think.\n" +
        "How to use the table:\n" +
        "- If a part ends on to, the next part must begin with a plain verb.\n" +
        "- If a part begins with to + verb, find the word that wants it: ordered, launched, guidelines, push someone.\n" +
        "- With use and regard the order is fixed: the verb, then the thing, then as + what it is used or seen as. The as-part never comes before the thing.",
      table: {
        columns: ["Pattern", "What follows", "In the tested sentence", "Sitting"],
        rows: [
          {
            cells: [
              "regard X as Y",
              "the thing, then as + what it is seen as",
              "he regarded his major achievements as mere stepping stones for the next advance",
              "2019 (II)",
            ],
          },
          {
            cells: [
              "be ordered to + verb",
              "to + the action required",
              "Pepsico was ordered to compensate the woman for refusing her the prize money",
              "2019 (I)",
            ],
          },
          {
            cells: [
              "use X as Y",
              "the thing, then as + its role",
              "the camel uses fat as a source of energy during its long journey in the desert",
              "2022 (II)",
            ],
          },
          {
            cells: [
              "guidelines to + verb",
              "to + what the guidelines do",
              "... were notified in 2020, with guidelines to facilitate the present and prospective entrepreneurs",
              "2025 (II)",
            ],
          },
          {
            cells: [
              "push someone to + verb",
              "the person, then to + the action",
              "... shown in a way that may push the viewers to think that they are watching a programme",
              "2025 (II)",
            ],
          },
          {
            cells: [
              "be launched to + verb",
              "to + the purpose",
              "Ujjwala 2.0 was launched in 2021 to provide additional one crore LPG connections",
              "2025 (II)",
            ],
          },
        ],
        caption: "A part ending on to needs a plain verb next. With use and regard, the thing comes before as.",
      },
      pyqExampleId: "88160b19-0d3c-4e34-86e6-9c00da387d19",
      selfCheckExample: {
        prompt:
          "Arrange the parts into one sentence. P: as a shelter / Q: the shepherds used / R: during the storm / S: the old cave. " +
          "Options: (a) QSPR (b) QPSR (c) SPQR (d) QRPS",
        steps: [
          "Q holds the subject and the verb 'used'. The pattern is use X as Y.",
          "The thing comes first: S, 'the old cave'. Then as + its role: P, 'as a shelter'. So Q S P.",
          "Only (a) has Q S P. R closes it.",
        ],
        answer: "(a) QSPR",
      },
      practiceSet: [
        {
          prompt: "Complete: 'The court ordered the company ___ the workers.' (to pay / paying)",
          answer: "to pay",
          method: "order someone to + plain verb.",
        },
        {
          prompt: "Is this order right? 'They used as a weapon the stick.'",
          answer: "No. They used the stick as a weapon.",
          method: "use X as Y: the thing before as.",
        },
        {
          prompt: "Which part follows 'a scheme was launched'? P: to help small farmers / Q: small farmers",
          answer: "P",
          method: "launched to + the purpose.",
        },
        {
          prompt: "Complete: 'The coach pushed his players ___ harder.' (to train / training)",
          answer: "to train",
          method: "push someone to + plain verb.",
        },
      ],
      traps: [
        {
          title: "as before the thing",
          body:
            "'used as fuel the wood' puts the as-part too early. With use and regard the order is verb, thing, as-part: **used the wood as fuel**.",
        },
        {
          title: "Something other than a plain verb after to",
          body:
            "In these patterns to is part of the verb: to pay, to provide, to think. " +
            "A part that starts with a noun or an -ing form cannot follow a part that ends on this to.",
        },
        {
          title: "A part ending on to placed last",
          body:
            "'with guidelines to' or 'push the viewers to' is unfinished. It can never close the sentence; strike any option that puts it last.",
        },
      ],
    },
  ],
};

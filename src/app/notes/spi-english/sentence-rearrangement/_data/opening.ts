import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_SR_OPENING_NOTE: SubtopicNote = {
  subtopicName: "Opening Part and Word Pairs",
  title: "Opening Part and Word Pairs",
  oneLineDefinition:
    "A jumbled sentence is rebuilt in two moves: find the part that can open it, then join the parts whose words must sit side by side.",
  whyItMatters:
    "Six questions in the bank, three from the 2022 paper: five EASY and one MODERATE. Each sentence is cut into four parts P, Q, R and S, and in most of them the opening part and one fixed pair settle the order before you read the options.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spisrop-subject",
      name: "Find the part that opens the sentence",
      intuition:
        "Most English sentences begin with who or what the sentence is about, and the verb follows. Find the part that names the subject and can stand at the start; it is usually the first letter of the answer.",
      definition:
        "Parts that can open a sentence:\n" +
        "- A name or a noun with its words: **Mr Rao, the new teacher**, **The old bridge**.\n" +
        "- **There was**, **There is**, **It would appear**, **It is said**.\n" +
        "Parts that almost never open one:\n" +
        "- Parts that begin with **of**, **by**, **for**, **to**, **in**, **about**: they hang on a word before them.\n" +
        "- Parts that begin with **and**, **but**, **though**, **who**, **which**, **that**: they join on to something already said.\n" +
        "Once you have the opener, look for the part that carries its verb.",
      authoredExample: {
        prompt:
          "Rearrange: P: to the old woman / Q: the young soldier / R: who had lost her way / S: gave his seat",
        steps: [
          "Q names the subject: the young soldier. It opens.",
          "S has the verb: the soldier gave his seat. So Q S.",
          "Gave his seat to whom? P: to the old woman.",
          "R begins with 'who', which must follow the person it describes: the old woman. So P R.",
        ],
        answer: "Q S P R: The young soldier gave his seat to the old woman who had lost her way.",
      },
      selfCheckExample: {
        prompt:
          "Rearrange: P: by the river / Q: a small hut / R: there stood / S: built of mud. Options: (a) RQSP (b) QRPS (c) SPRQ (d) PQSR",
        steps: [
          "R, 'there stood', opens a sentence and needs what stood: Q, a small hut.",
          "'Built of mud' (S) describes the hut, so S follows Q.",
          "P, by the river, gives the place at the end: R Q S P.",
        ],
        answer: "(a) RQSP",
      },
      practiceSet: [
        {
          prompt:
            "Parts: P: of the village / Q: the headman / R: called a meeting. Which part opens the sentence?",
          answer: "Q, the headman",
          method: "Order Q P R: The headman of the village called a meeting.",
        },
        {
          prompt:
            "Which of these parts cannot open a sentence: (a) There was a time (b) The tall boy (c) of the old fort?",
          answer: "(c) of the old fort",
          method: "A part starting with 'of' hangs on a word before it.",
        },
        {
          prompt:
            "Rearrange: P: won the first prize / Q: my sister / R: in the painting contest",
          answer: "Q P R: My sister won the first prize in the painting contest.",
        },
        {
          prompt:
            "Rearrange: P: that the bus was late / Q: it was announced",
          answer: "Q P: It was announced that the bus was late.",
        },
      ],
      pyqExampleId: "1bb46657-13b3-4cad-9812-020ad789cb90",
      traps: [
        {
          title: "Opening with a joining word",
          body:
            "A part that begins with 'though', 'but' or 'which' needs something before it. An option that starts with such a part is almost always wrong.",
        },
        {
          title: "Stopping at the opener",
          body:
            "Two options can share the right first letter. After the opener, check the next pair too before you mark.",
        },
        {
          title: "Splitting a long subject",
          body:
            "A subject with a title, like 'Mr Rao, the head of the school', may run over two parts. Keep the title part right after the name, and the verb part after that.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spisrop-pairs",
      name: "Words that must sit side by side",
      intuition:
        "Some words never stand alone: 'afraid' wants 'of', 'each' wants its noun, 'who' wants the person it is about. When one part ends with such a word and another part begins with its partner, those two parts are glued together.",
      definition:
        "Look at the last word of each part and the first word of each part:\n" +
        "- **Word and its preposition**: afraid of, proud of, fond of, famous for, in the dark about, interested in.\n" +
        "- **A or each and its noun**: 'each' is followed by 'family', 'a beautiful' by 'monument'.\n" +
        "- **Who, which, that** come right after the noun they describe.\n" +
        "- **It, he, they, this** need a word before them to point back to.\n" +
        "Join every glued pair first. Two or three pairs usually leave only one order.",
      authoredExample: {
        prompt:
          "Rearrange: P: proud of / Q: the farmer was very / R: his tall, green / S: field of wheat",
        steps: [
          "Q opens: the farmer is the subject.",
          "'very' needs a word after it, and 'proud of' fits: Q P.",
          "'Proud of' what? R: his tall, green.",
          "'His tall, green' needs its noun: S, field of wheat.",
        ],
        answer: "Q P R S: The farmer was very proud of his tall, green field of wheat.",
      },
      selfCheckExample: {
        prompt:
          "Rearrange: P: a pair / Q: she bought / R: for her father / S: of warm gloves. Options: (a) QPSR (b) PSQR (c) RQPS (d) SPQR",
        steps: [
          "Q opens: she is the subject and 'bought' the verb.",
          "'A pair' must be followed by 'of warm gloves': P S.",
          "R, for her father, ends it: Q P S R.",
        ],
        answer: "(a) QPSR",
      },
      practiceSet: [
        {
          prompt: "Which small word comes straight after 'fond': of, for or in?",
          answer: "of (fond of)",
        },
        {
          prompt: "Rearrange: P: of his low marks / Q: Rahul was ashamed",
          answer: "Q P: Rahul was ashamed of his low marks.",
        },
        {
          prompt:
            "Rearrange: P: which had a red roof / Q: they lived in a house",
          answer: "Q P: They lived in a house which had a red roof.",
          method: "'Which' follows the noun it describes, the house.",
        },
        {
          prompt:
            "Rearrange: P: famous for / Q: this town is / R: its sweets",
          answer: "Q P R: This town is famous for its sweets.",
        },
      ],
      pyqExampleId: "2a1cced1-e5a4-484e-841b-bb5ddb2c9ef3",
      traps: [
        {
          title: "Leaving a preposition hanging",
          body:
            "A part ending in 'afraid' or 'fond' must be followed by the part starting 'of'. If an option puts anything between them, cut it.",
        },
        {
          title: "Putting 'who' after the wrong noun",
          body:
            "'Who' and 'which' describe the noun just before them. Placed after a different noun, the sentence says something absurd, such as a fence being hungry.",
        },
        {
          title: "A pronoun with nothing to point to",
          body:
            "A part with 'it' or 'he' cannot come before the noun it stands for. Find the noun first and place the pronoun after it.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PQ_LINKERS_NOTE: SubtopicNote = {
  subtopicName: "Joining Words, Pairs and Pointers (PQRS)",
  title: "Linking words decide the order",
  oneLineDefinition:
    "Joining words (and, or, but also, though) and pointer words (it, they, this) fix which parts come together and which part must come first.",
  whyItMatters:
    "Many parts begin or end with a small joining word: 'and die', 'but also during', 'though he was'. " +
    "Each one tells you what must stand on its other side. A pointer word such as it or they tells you that its noun has already appeared. " +
    "Read these words first and several options fall away.",
  concepts: [
    // C1 — and/or join like with like
    {
      kind: "formula",
      slug: "cdsenpq-and-joins-like",
      name: "And and or join like with like",
      intuition:
        "And and or join two things of the same kind: two nouns, two verbs, two adjectives. " +
        "A part that ends on and needs a matching second item after it. A part that starts with and must follow the first item.",
      definition:
        "The terms:\n" +
        "- **Like with like**: and, or and but join items of the same kind and form: rice and wheat; collects and tabulates; small and quiet.\n" +
        "- **List**: three or more items: A, B and C. The and comes before the last item.\n" +
        "The method:\n" +
        "- A part that ends on and or or needs the second item next. It can never end the sentence.\n" +
        "- A part that starts with and cannot open the sentence. Ask: and what? The first item comes right before it.\n" +
        "- Match the form. A verb joins a verb with the same subject and tense (appreciated ... and emphasised); a noun joins a noun.\n" +
        "- In a list, the item after and is the last one; the others come before it.",
      authoredExample: {
        prompt:
          "Arrange the parts into one sentence. P: and the mountains / Q: the cadets trekked through / R: before reaching the base camp / S: the forests. " +
          "Options: (a) QSPR (b) QPSR (c) SPQR (d) QRSP",
        steps: [
          "P starts with and, so it cannot open. And what? The first item must be the same kind of thing: S, 'the forests'. Lock S P.",
          "Q ends on 'through', a preposition, so its object follows: S. The chain is Q S P.",
          "Only (a) has Q S P. R closes it.",
          "Read it: 'the cadets trekked through the forests and the mountains before reaching the base camp'.",
        ],
        answer: "(a) QSPR",
      },
      selfCheckExample: {
        prompt:
          "Arrange the parts into one sentence. P: and repairs the radio sets / Q: the signals unit / R: of the battalion / S: checks. " +
          "Options: (a) QRSP (b) QPSR (c) SPQR (d) QRPS",
        steps: [
          "P starts with 'and repairs', a verb. Like with like: it joins another verb, S, 'checks'. Lock S P.",
          "Q is the subject and R, an of-part, hangs on it: Q R.",
          "Only (a) has Q R S P.",
          "Read it: 'the signals unit of the battalion checks and repairs the radio sets'.",
        ],
        answer: "(a) QRSP",
      },
      practiceSet: [
        {
          prompt: "Can a part that starts with 'and' open the sentence?",
          answer: "No.",
          method: "It needs the first item before it.",
        },
        {
          prompt: "Which part follows 'rice, wheat and'? P: maize / Q: are grown here",
          answer: "P, then Q: rice, wheat and maize are grown here.",
        },
        {
          prompt: "Like with like: 'He enjoys swimming and ___.' (to run / running)",
          answer: "running",
          method: "An -ing form joins an -ing form.",
        },
        {
          prompt: "Part P ends on 'or'. Options: (a) PQRS (b) QRSP (c) SPRQ (d) RSQP. Which options must you strike?",
          answer: "(b) and (d)",
          method: "They put P last, so 'or' is left hanging.",
        },
      ],
      pyqExampleId: "051e3f65-15d3-4367-af85-c8a63151a9d2",
      traps: [
        {
          title: "Ending on and",
          body:
            "An option whose last part ends on 'and' or 'or' leaves the second item missing. Strike it without reading further.",
        },
        {
          title: "Joining unlike things",
          body:
            "'the forests and to climb' joins a noun to a verb. And needs the same kind on both sides: a noun with a noun, a verb with a verb in the same tense.",
        },
        {
          title: "The wrong first item",
          body:
            "When a part starts with and, more than one noun may seem to fit before it. " +
            "Choose the one that is the same kind of thing and fits the verb: the rivers and the lakes were frozen, not the travellers and the lakes.",
        },
      ],
    },

    // C2 — reference: correlative pairs
    {
      kind: "reference",
      slug: "cdsenpq-correlative-pairs",
      name: "Pairs that travel together",
      intuition:
        "Some joining words come in two halves: not only ... but also, so ... as, if ... then. " +
        "When one half appears in a part, the other half must come later, and the two halves frame matching items.",
      definition:
        "The terms:\n" +
        "- **Correlative pair**: two linked words that work together across a sentence, the first half always before the second: not only ... but also; so ... as; more ... than.\n" +
        "How to use the table:\n" +
        "- If a part holds the first half, find the part that holds the second half. It must come later.\n" +
        "- Put matching items after each half: not only **in the cities** but also **in the villages**.\n" +
        "- A part that holds the second half (but also, than, then, nor) can never open the sentence.\n" +
        "- Do not mix pairs: as ... as, not as ... than.",
      table: {
        columns: ["Pair", "How it works", "In the tested sentence", "Sitting"],
        rows: [
          {
            cells: [
              "not only ... but also",
              "the same kind of item follows each half",
              "peace is always the only alternative not only during war and turbulent times but also during peaceful times",
              "2024 (I)",
            ],
          },
          {
            cells: [
              "not only because ... but also because",
              "two reasons, each a full clause",
              "smallpox was a particularly dreaded disease ... not only because it was often fatal, but also because those who recovered were permanently disfigured",
              "2017 (I)",
            ],
          },
          {
            cells: [
              "not merely ... but also",
              "the second half adds a wider claim",
              "capitalism is sometimes treated not merely as an economic system but also as an ideology in its own right",
              "2023 (II)",
            ],
          },
          {
            cells: [
              "not merely ... nor",
              "a second denial, with the verb before the subject after nor",
              "the equality provisions ... are not merely anti-discriminatory ... nor are they confined to individuals as bearers of rights",
              "2023 (II)",
            ],
          },
          {
            cells: [
              "so ... as",
              "so + adjective, then as + the thing compared",
              "nothing is so easy and inviting as the retort of abuse and sarcasm",
              "2022 (I)",
            ],
          },
          {
            cells: [
              "as ... as",
              "as + adjective (+ noun) + as: two equal things",
              "a free press is as essential a limb of democracy as a parliament freely elected by the people",
              "2018 (II)",
            ],
          },
          {
            cells: [
              "more ... than",
              "more + quality, then than + the thing compared",
              "you will be more disappointed by the things you didn't do than by the ones you did do",
              "2019 (II), 2024 (II)",
            ],
          },
          {
            cells: [
              "better than",
              "better, then than + the other person or thing",
              "she who has been in trouble would know the trouble better than the one who has been troubling",
              "2024 (I)",
            ],
          },
          {
            cells: [
              "enough ... that",
              "enough + that + the result",
              "there must be something important enough that everyone should learn it",
              "2018 (II)",
            ],
          },
          {
            cells: [
              "if ... then",
              "the if-clause first, then the result",
              "if you can't handle me at my worst, then you sure don't deserve me at my best",
              "2019 (II)",
            ],
          },
          {
            cells: [
              "it is not that ... it is that",
              "rejects one reason, then gives the real one",
              "it is not that he is a fool, it is that he does not think ...",
              "2022 (II)",
            ],
          },
          {
            cells: [
              "because ... and not because",
              "the true reason first, then the false one",
              "it's because they do not come within my subject and not because they are lightly esteemed by me",
              "2022 (I)",
            ],
          },
          {
            cells: [
              "one thing ... another",
              "one thing, then another for its contrast",
              "irony is a figure of speech where you say one thing while you mean another",
              "2022 (II)",
            ],
          },
        ],
        caption: "The first half always comes first. A part holding the second half cannot open the sentence.",
      },
      pyqExampleId: "f57bd935-6666-4269-8fa6-df68022cee2f",
      selfCheckExample: {
        prompt:
          "Arrange the parts into one sentence. P: as the old one / Q: the new rifle is / R: not so heavy / S: but it is more accurate. " +
          "Options: (a) QRPS (b) QPRS (c) RPQS (d) QSRP",
        steps: [
          "R holds 'so', the first half of so ... as. P holds 'as', the second half. Lock R P.",
          "Q, the subject and verb, comes before R: 'the new rifle is not so heavy'.",
          "Only (a) has Q R P. S, the contrast, closes it.",
        ],
        answer: "(a) QRPS",
      },
      practiceSet: [
        {
          prompt: "Complete the pair: 'Either you finish the work now ___ you stay back.'",
          answer: "or",
          method: "either ... or",
        },
        {
          prompt: "Spot the error: 'He is as strong than his brother.'",
          answer: "Wrong pair. He is as strong as his brother.",
        },
        {
          prompt: "Which part comes first? P: than the march itself / Q: the waiting was more tiring",
          answer: "Q, then P.",
          method: "more ... than: than follows the comparison.",
        },
        {
          prompt: "Right or wrong? 'He is not merely a soldier but also a poet.'",
          answer: "Right.",
          method: "not merely ... but also, with a noun after each half.",
        },
      ],
      traps: [
        {
          title: "The second half first",
          body:
            "An option that puts 'but also', 'than' or 'nor' before its first half cannot be right. Strike it.",
        },
        {
          title: "Mixing two pairs",
          body:
            "as ... than and so ... than are not English. as goes with as, so (in a comparison) with as, more with than.",
        },
        {
          title: "Unequal halves",
          body:
            "The items after the two halves should match: not only **in the city** but also **in the villages**. " +
            "If one half is followed by a phrase and the other by a full clause, look for a better order.",
        },
      ],
    },

    // C3 — clause linkers
    {
      kind: "formula",
      slug: "cdsenpq-clause-linkers",
      name: "Though, as soon as, if: finish the clause the linker opens",
      intuition:
        "Words like though, unless, if, because and whatever open a clause. The clause they open must be finished right after them. " +
        "It then joins a main clause that could stand alone.",
      definition:
        "The terms:\n" +
        "- **Clause**: a group of words with its own subject and verb: the rain stopped.\n" +
        "- **Linker**: a word that joins one clause to another and shows how they relate: though (contrast), unless and if (condition), because (reason), when and as soon as (time), whatever (any thing at all).\n" +
        "The method:\n" +
        "- Find the part that holds the linker.\n" +
        "- The linker's own clause comes right after it: linker + subject + verb.\n" +
        "- The main clause goes before or after the linker's clause as a whole. Do not cut into either clause.\n" +
        "- Check the meaning the linker signals. though needs a contrast, because needs a reason. An order where the linker signals the wrong thing is wrong.\n" +
        "- 'and thus' near the end closes a chain of actions: it introduces the last step.",
      authoredExample: {
        prompt:
          "Arrange the parts into one sentence. P: the weather was bad / Q: the patrol set out / R: though / S: on time. " +
          "Options: (a) RPQS (b) RSQP (c) QRSP (d) PQRS",
        steps: [
          "R is the linker 'though'. Its clause must come right after it: subject + verb. Only P, 'the weather was bad', is a full clause that can follow. Lock R P.",
          "Only (a) has R then P side by side.",
          "The main clause Q S follows as a whole. though signals a contrast: bad weather, yet the patrol was on time.",
          "Read it: 'though the weather was bad, the patrol set out on time'.",
        ],
        answer: "(a) RPQS",
      },
      selfCheckExample: {
        prompt:
          "Arrange the parts into one sentence. P: you will miss the train / Q: unless you / R: at once / S: leave the house. " +
          "Options: (a) QSRP (b) QRPS (c) SQRP (d) PSQR",
        steps: [
          "Q holds the linker 'unless' and its subject 'you'. Its verb must come next: S, 'leave the house'. Lock Q S.",
          "Only (a) has Q then S side by side.",
          "R finishes the unless-clause; P, the main clause, follows.",
          "Read it: 'unless you leave the house at once, you will miss the train'.",
        ],
        answer: "(a) QSRP",
      },
      practiceSet: [
        {
          prompt: "Arrange: P: he kept marching / Q: although / R: he was tired",
          answer: "Q, R, P: although he was tired, he kept marching.",
          method: "The linker's own clause comes right after it.",
        },
        {
          prompt: "Which linker fits? 'He failed ___ he did not prepare.' (because / though)",
          answer: "because",
          method: "Not preparing is the reason.",
        },
        {
          prompt: "Can 'whatever you may think' stand alone as a sentence?",
          answer: "No.",
          method: "It needs a main clause: whatever you may think, the plan will go ahead.",
        },
      ],
      pyqExampleId: "4b20ebed-a4b1-4d22-af65-01ff5392d8de",
      traps: [
        {
          title: "A linker with the wrong signal",
          body:
            "though joins two facts that pull against each other; because joins a cause to its result. " +
            "If an order makes 'though' join a cause to its result, it is wrong even when it sounds smooth.",
        },
        {
          title: "Cutting into the main clause",
          body:
            "The linker's clause goes before or after the main clause as one block. " +
            "An option that drops it into the middle of the main clause breaks both.",
        },
        {
          title: "though ... but",
          body:
            "'Though he was tired, but he kept marching' is a common error. A though-clause joins the main clause directly; do not add but.",
        },
      ],
    },

    // C4 — pointer words
    {
      kind: "formula",
      slug: "cdsenpq-pointer-words",
      name: "It, they, the two, this: the noun comes first",
      intuition:
        "it, they, them, this and such point back to something already named. The thing they point to must come first.",
      definition:
        "The terms:\n" +
        "- **Pointer word**: a word that refers back to something already mentioned: it, they, them, this, these, such.\n" +
        "- **Antecedent**: the noun that a pointer word refers back to: **the soldiers** ... they.\n" +
        "The method:\n" +
        "- Spot each pointer word in the parts.\n" +
        "- Ask what it points to, and find that noun in another part.\n" +
        "- That part must come earlier in the sentence than the pointer.\n" +
        "- Check the number: they and these need two or more things; it and this need one.\n" +
        "- A part that starts with a pointer word such as it or they cannot open the sentence.",
      authoredExample: {
        prompt:
          "Arrange the parts into one sentence. P: and handed it over / Q: the boy found a wallet / R: to the police / S: on the road. " +
          "Options: (a) QSPR (b) PRQS (c) QRPS (d) SPRQ",
        steps: [
          "P contains the pointer 'it'. It points to 'a wallet', in Q. So Q comes before P.",
          "P also starts with 'and', so it cannot open. Strike (b).",
          "Q is a full clause with its subject: it opens. S tells where the wallet was found, P adds the second action, and R completes 'handed it over'.",
          "Only (a) gives Q S P R. (c) and (d) leave 'to the police' and 'on the road' in places where they make no sense.",
          "Read it: 'the boy found a wallet on the road and handed it over to the police'.",
        ],
        answer: "(a) QSPR",
      },
      selfCheckExample: {
        prompt:
          "Arrange the parts into one sentence. P: but it / Q: the old jeep broke down twice / R: on the way to the camp / S: still reached on time. " +
          "Options: (a) QRPS (b) PSQR (c) QSPR (d) RQSP",
        steps: [
          "'it' in P points to 'the old jeep' in Q. So Q comes before P.",
          "'but it' needs its verb next: S, 'still reached on time'. Lock P S.",
          "Only (a) has Q before P and P S together.",
          "Read it: 'the old jeep broke down twice on the way to the camp but it still reached on time'.",
        ],
        answer: "(a) QRPS",
      },
      practiceSet: [
        {
          prompt: "What does 'they' point to? P: and they were given medals / Q: the three firemen saved the family",
          answer: "The three firemen. So Q comes before P.",
        },
        {
          prompt: "Can 'it needs urgent repair' come before the part that names the bridge?",
          answer: "No.",
          method: "Name the thing first: the old bridge is weak and it needs urgent repair.",
        },
        {
          prompt: "it or they? 'The orders came late, so ___ could not be followed.'",
          answer: "they",
          method: "orders is plural.",
        },
      ],
      pyqExampleId: "daba1405-441e-4cb2-80bc-e72f2cc8c31f",
      traps: [
        {
          title: "The pointer before its noun",
          body:
            "An option that puts 'it' or 'they' before the noun it means leaves the reader asking 'what?'. Strike it.",
        },
        {
          title: "The wrong number",
          body:
            "they and these need a plural noun or two named things; it and this need one. Use this to choose between two possible nouns.",
        },
        {
          title: "Two nouns, one pointer",
          body:
            "When two nouns come before 'it', ask which one the sentence is about. " +
            "In 'the captain gave the map to the guide and told him to keep it safe', him is the guide and it is the map: you keep a map safe, not a captain.",
        },
      ],
    },
  ],
};

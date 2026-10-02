import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PQ_MODIFIERS_NOTE: SubtopicNote = {
  subtopicName: "Modifier Placement (PQRS)",
  title: "Put the describer next to what it describes",
  oneLineDefinition:
    "Who, which and where clauses, with-phrases and -ing phrases describe the noun right before them, so each must sit beside the noun it is about.",
  whyItMatters:
    "Here two or three options may all look grammatical. The right one puts every describing part next to the noun it describes. " +
    "The wrong ones attach it to the wrong person or thing, and the sentence ends up saying something silly. Reading for meaning is the move that decides.",
  concepts: [
    // C1 — relative clauses
    {
      kind: "formula",
      slug: "cdsenpq-relative-clause",
      name: "Who, which, where follow their noun",
      intuition:
        "A part that starts with who, which, where or whom describes a noun. It must come right after that noun, or the sentence describes the wrong thing.",
      definition:
        "The terms:\n" +
        "- **Relative word**: who (for people), which (for things), where (for places), whom or that, when it starts a clause that describes the noun just before it: the soldier **who saved the boy**.\n" +
        "The method:\n" +
        "- Spot a part that starts with who, which, where or whom.\n" +
        "- Ask: who? which thing? which place? Find its noun: a person for who, a thing for which, a place for where.\n" +
        "- The part that ends on that noun comes right before it. Lock the pair.\n" +
        "- A relative clause may run on into the next part ('who has his eyes' | 'fixed on the goal'). Finish it before the main verb.\n" +
        "- When the sentence starts with printed words such as 'The lady', a who-part often comes straight after them, and the main verb comes after the clause.",
      authoredExample: {
        prompt:
          "The sentence begins: 'The pilot'. P: was given a medal / Q: who landed the damaged plane / R: by the President / S: safely on the river. " +
          "Options: (a) QSPR (b) PRQS (c) QPRS (d) SQPR",
        steps: [
          "Q starts with who. Who? A person: 'The pilot'. So Q comes first, right after the printed words.",
          "(b) is grammatical, but it puts 'who landed the damaged plane' after 'the President'. That says the President landed the plane. Strike it.",
          "The who-clause needs its end: S, 'safely on the river'. Then the main verb P, then R.",
          "Only (a) has Q S P R.",
          "Read it: 'The pilot who landed the damaged plane safely on the river was given a medal by the President'.",
        ],
        answer: "(a) QSPR",
      },
      selfCheckExample: {
        prompt:
          "Arrange the parts into one sentence. P: where he was born / Q: the old soldier went back / R: after forty years / S: to the village. " +
          "Options: (a) RQSP (b) RQPS (c) QPSR (d) PRQS",
        steps: [
          "P starts with where, so it describes a place. The place is S, 'the village'. Lock S P.",
          "Only (a) has S then P side by side.",
          "Read it: 'after forty years the old soldier went back to the village where he was born'.",
        ],
        answer: "(a) RQSP",
      },
      practiceSet: [
        {
          prompt: "Which part comes right before 'which was built in 1857'? P: the old fort / Q: the tourists",
          answer: "P",
          method: "which describes a thing: the old fort which was built in 1857.",
        },
        {
          prompt: "who or which? 'The cadet ___ topped the course got a sword of honour.'",
          answer: "who",
          method: "The cadet is a person.",
        },
        {
          prompt: "Fix it: 'The general praised the soldiers in his speech who had fought bravely.'",
          answer: "In his speech, the general praised the soldiers who had fought bravely.",
          method: "who must touch soldiers.",
        },
      ],
      pyqExampleId: "73b9bb41-252b-49b2-9db9-2dbea70c6ed7",
      traps: [
        {
          title: "Grammatical but about the wrong person",
          body:
            "A who-clause placed after the wrong noun still reads as English. But it describes the wrong person. " +
            "Always ask who the clause is about, and check that the clause touches that noun.",
        },
        {
          title: "who for things, which for people",
          body:
            "who points to a person and which to a thing. If the only noun before a who-part is a thing, that order is wrong.",
        },
        {
          title: "Cutting the clause short",
          body:
            "A relative clause needs its own verb and its own end. If 'who has his eyes' is followed by the main verb, the clause is left unfinished. " +
            "The part that completes it ('fixed on the goal') must come first.",
        },
      ],
    },

    // C2 — participle phrases, with-phrases, appositives
    {
      kind: "formula",
      slug: "cdsenpq-modifier-beside-noun",
      name: "Describing phrases sit beside their noun",
      intuition:
        "Not every describer starts with who. 'with noisy exhausts', 'bulging with sandwiches' and 'one of the greatest poets' describe a noun too. " +
        "Each one must sit beside the noun it is about.",
      definition:
        "The terms:\n" +
        "- **Modifier**: any word or phrase that describes something.\n" +
        "- **Participle phrase**: a describing phrase built on an -ing or -ed form of a verb: bulging with food, living on its surface, channelled into rivers.\n" +
        "- **Appositive**: a noun phrase that renames the noun beside it: Iqbal, **one of the greatest poets of modern India**.\n" +
        "- **Misplaced modifier**: a modifier put next to the wrong noun, so the sentence says something you did not mean.\n" +
        "The method:\n" +
        "- For each describing part, ask: who or what is described?\n" +
        "- Put it right after that noun (an appositive or a phrase with a comma may sit right before it).\n" +
        "- If two orders are both grammatical, read both and ask what each one says. Keep the one where every describer touches its own noun.\n" +
        "- 'such as' gives examples of the noun just before it: organs, such as the lungs or the liver.",
      authoredExample: {
        prompt:
          "Arrange the parts into one sentence. P: grazing in the meadow / Q: from the top of the hill / R: we saw / S: a herd of deer. " +
          "Options: (a) QRSP (b) RSQP (c) QSPR (d) PQRS",
        steps: [
          "P, 'grazing in the meadow', describes the deer, not the hill and not us. Lock S P.",
          "Options with S then P side by side: (a) and (c).",
          "(c) puts 'we saw' after what was seen. The subject and verb must come first: 'we saw a herd of deer'.",
          "(d) opens with 'grazing in the meadow', which would make us the ones grazing. (b) places the deer on top of the hill.",
          "Read (a): 'from the top of the hill we saw a herd of deer grazing in the meadow'.",
        ],
        answer: "(a) QRSP",
      },
      selfCheckExample: {
        prompt:
          "Arrange the parts into one sentence. P: hiding under the table / Q: the children found / R: during the storm / S: the frightened puppy. " +
          "Options: (a) RQSP (b) QSRP (c) SPQR (d) RQPS",
        steps: [
          "Who was hiding? The puppy. Lock S P.",
          "Options with S then P side by side: (a) and (c). (b) and (d) split the puppy from 'hiding'.",
          "(c) starts with the puppy and only then gives 'the children found', so 'found' has nothing after it. Strike it.",
          "Read (a): 'during the storm the children found the frightened puppy hiding under the table'.",
        ],
        answer: "(a) RQSP",
      },
      practiceSet: [
        {
          prompt: "What does 'with a long tail' describe? 'The boy fed the monkey with a long tail.'",
          answer: "The monkey.",
          method: "The phrase touches monkey, so it describes the monkey.",
        },
        {
          prompt: "Fix it: 'Running to the bus, my bag fell open.'",
          answer: "As I was running to the bus, my bag fell open.",
          method: "The bag was not running. An -ing phrase at the start describes the noun right after the comma.",
        },
        {
          prompt: "Arrange: P: such as the Ganga and the Yamuna / Q: flow through the plains / R: many rivers",
          answer: "R, P, Q: many rivers, such as the Ganga and the Yamuna, flow through the plains.",
        },
        {
          prompt: "Arrange: P: the captain of the team / Q: Arjun / R: lifted the cup",
          answer: "Q, P, R: Arjun, the captain of the team, lifted the cup.",
          method: "The appositive sits right after the name it renames.",
        },
      ],
      pyqExampleId: "b2c93a49-bf75-4774-a735-b47a295de0ff",
      traps: [
        {
          title: "Two grammatical orders",
          body:
            "When two options both read as English, do not pick the first one. Ask what each one says. " +
            "The wrong one usually gives a feature to the wrong person: a shivering coat, a hill full of grazing deer.",
        },
        {
          title: "A dangling -ing phrase at the start",
          body:
            "An -ing phrase that opens the sentence describes the noun right after the comma. " +
            "'Grazing in the meadow, we saw the deer' makes us the grazers. Move the phrase next to its real noun.",
        },
        {
          title: "Splitting a phrase from its noun",
          body:
            "A time or place phrase pushed between a noun and its describer ('the deer from the hill grazing') breaks the link. " +
            "Keep the noun and its describer together and put the other phrase elsewhere.",
        },
      ],
    },

    // C3 — adverbials
    {
      kind: "formula",
      slug: "cdsenpq-adverbial-place",
      name: "Time, manner and agent phrases: where they cannot mislead",
      intuition:
        "Phrases that say when, how much or by whom can move about more freely than other parts, but not anywhere. " +
        "Put each one next to the word or event it belongs to, so the sentence cannot be misread.",
      definition:
        "The terms:\n" +
        "- **Adverbial**: a word or phrase that tells when, where, how, how much or by whom: in 1965, by the committee, only, quietly.\n" +
        "The method:\n" +
        "- Ask what the adverbial belongs to: the whole action, one verb, or one word.\n" +
        "- A time phrase for the whole action goes at the end or at the start. If there are two events, each time phrase sits next to its own event.\n" +
        "- A word that limits, such as only, just or even, sits right before the word it limits: only two guards.\n" +
        "- A by-phrase that names the doer follows its passive verb: was approved by the committee.\n" +
        "- If an adverbial could belong to two verbs, choose the place where it can only mean one thing.",
      authoredExample: {
        prompt:
          "Arrange the parts into one sentence. P: who had served in the war / Q: in 1965 / R: the village honoured the soldiers / S: at a function last week. " +
          "Options: (a) RPQS (b) RQPS (c) RSPQ (d) RPSQ",
        steps: [
          "There are two events, each with its own time: the war, and the function.",
          "'in 1965' dates the war, so Q sits right after P: 'the war in 1965'.",
          "'last week' belongs to the function, which is when the honouring happened, so S closes the sentence.",
          "(b) dates the soldiers, not the war. (c) cuts the who-clause off from 'soldiers'. (d) puts the war at last week's function.",
          "Read (a): 'the village honoured the soldiers who had served in the war in 1965 at a function last week'.",
        ],
        answer: "(a) RPQS",
      },
      selfCheckExample: {
        prompt:
          "Arrange the parts into one sentence. P: by the committee / Q: the report / R: was approved / S: after a long debate. " +
          "Options: (a) QRPS (b) PQRS (c) QSPR (d) SRQP",
        steps: [
          "Subject Q, verb R: 'the report was approved'.",
          "Approved by whom? P, the by-phrase, follows its passive verb. Lock R P.",
          "Only (a) has Q R P. S closes it.",
        ],
        answer: "(a) QRPS",
      },
      practiceSet: [
        {
          prompt: "Place 'only' to say there were no more than two guards: 'Two guards were on duty.'",
          answer: "Only two guards were on duty.",
          method: "only sits right before the word it limits.",
        },
        {
          prompt: "Place 'by the villagers': 'The well was dug last summer.'",
          answer: "The well was dug by the villagers last summer.",
          method: "The doer follows the passive verb.",
        },
        {
          prompt: "What does 'in 1947' date here? 'He wrote about the freedom won in 1947 in his diary.'",
          answer: "The freedom won.",
          method: "The time phrase touches 'won', so it dates that event.",
        },
      ],
      pyqExampleId: "8576623e-d512-4075-95f2-d34e8624d7dd",
      traps: [
        {
          title: "A time phrase next to the wrong event",
          body:
            "With two events in one sentence, a time phrase dates the event it touches. " +
            "Put each time phrase beside its own event, or the sentence gives the wrong date.",
        },
        {
          title: "A limiting word in the wrong slot",
          body:
            "'Only the captain spoke to the men' and 'the captain spoke only to the men' mean different things. " +
            "only, just and even limit the word right after them.",
        },
        {
          title: "Choosing an order that can be misread",
          body:
            "Sometimes two orders are both grammatical. The answer is the one that cannot be misread: each phrase sits where it can belong to only one word.",
        },
      ],
    },
  ],
};

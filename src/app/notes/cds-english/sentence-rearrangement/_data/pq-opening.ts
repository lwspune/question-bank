import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PQ_OPENING_NOTE: SubtopicNote = {
  subtopicName: "Opening and Closing Parts (PQRS)",
  title: "Fix the ends, then strike options",
  oneLineDefinition:
    "Decide which part can start the sentence and which can end it, lock one pair inside, strike the options that break them, and read the one that survives.",
  whyItMatters:
    "This is the full routine for a PQRS item, built from the moves on the earlier pages. " +
    "The ends are the fastest place to begin: only one or two parts can open a sentence, and a part that ends on a preposition, 'and' or a helping verb can never close it. " +
    "Fixing one end usually strikes two options before you read a single full sentence.",
  concepts: [
    // C1 — given (fixed) opening
    {
      kind: "formula",
      slug: "cdsenpq-given-opening",
      name: "Continue the given opening",
      intuition:
        "Sometimes the first words of the sentence are printed before P. They are fixed. " +
        "Ask what those words need next, and the first part is usually decided at once.",
      definition:
        "The terms:\n" +
        "- **Fixed opening**: the words printed before the jumbled parts. The sentence must start with them: 'The doctor', 'We do not know when'.\n" +
        "The method:\n" +
        "- Read the fixed opening and ask what it needs next.\n" +
        "- A noun phrase (The doctor, Children) needs its verb, or a who-clause about it.\n" +
        "- An unfinished clause (We do not know when, One of the difficulties) needs the rest of that clause.\n" +
        "- Find the part that supplies it. That is the first part. Strike every option that does not start with it.\n" +
        "- Then use the earlier moves on the rest: verb and object, preposition and object, and like with like.",
      authoredExample: {
        prompt:
          "The sentence begins: 'The new recruits'. P: before they are sent to their units / Q: must complete / R: of basic training / S: six months. " +
          "Options: (a) QSRP (b) SRQP (c) QRSP (d) RQSP",
        steps: [
          "The fixed opening is a noun phrase with no verb. It needs its verb next: Q, 'must complete'.",
          "Strike the options that do not start with Q: (b) and (d). Left: (a) and (c).",
          "'must complete' needs its object. R starts with 'of', so it cannot follow a verb; it needs a head noun before it. S, 'six months', is the object, and R hangs on it.",
          "That gives Q S R, which is (a). P closes the sentence.",
          "Read it: 'The new recruits must complete six months of basic training before they are sent to their units'.",
        ],
        answer: "(a) QSRP",
      },
      selfCheckExample: {
        prompt:
          "The sentence begins: 'We could not decide'. P: or wait for the rain to stop / Q: whether to / R: on time / S: start the march. " +
          "Options: (a) QSRP (b) QPSR (c) SQRP (d) QRSP",
        steps: [
          "'We could not decide' needs what was to be decided: Q, 'whether to'.",
          "Q ends on to, which needs a plain verb next: S, 'start the march'. Lock Q S.",
          "Only (a) has Q then S. R finishes the first choice, and P, starting with or, gives the second choice.",
        ],
        answer: "(a) QSRP",
      },
      practiceSet: [
        {
          prompt: "The sentence begins: 'The soldiers'. P: of the regiment / Q: to the border / R: marched. Which order?",
          answer: "PRQ: The soldiers of the regiment marched to the border.",
          method: "The of-part hangs on 'soldiers', then the verb.",
        },
        {
          prompt: "The sentence begins: 'I wonder'. Which part comes next? P: whether the bridge / Q: will hold",
          answer: "P: I wonder whether the bridge will hold.",
          method: "'I wonder' needs a clause starting with whether, if or why.",
        },
        {
          prompt: "The sentence begins: 'The officer who'. What must the first part give?",
          answer: "A verb for who, such as 'led the patrol'.",
          method: "who opens a clause and needs its own verb before the main verb comes.",
        },
      ],
      pyqExampleId: "06db143c-80b5-4b17-950f-dbf3afba9213",
      traps: [
        {
          title: "Ignoring the fixed opening",
          body:
            "An order can read well on its own and still not join the printed words. " +
            "Always read the fixed opening aloud with the first part before you check anything else.",
        },
        {
          title: "Missing what the opening ends on",
          body:
            "A fixed opening that ends on a comma, 'when' or 'that' is unfinished. " +
            "'We do not know when' needs a clause with its own subject and verb next, not a time phrase.",
        },
        {
          title: "Stopping after the first part",
          body:
            "Two options may start with the same part. The next link decides, so carry on with the earlier moves until one option is left.",
        },
      ],
    },

    // C2 — no opening given: first and last part
    {
      kind: "formula",
      slug: "cdsenpq-first-and-last",
      name: "No opening given: find the first and last part",
      intuition:
        "With no fixed opening, look at both ends. Few parts can open a sentence, and even fewer can close it. " +
        "Fix one end, strike the options that disagree, and the rest takes seconds.",
      definition:
        "The terms:\n" +
        "- **Strike options**: cross out every option that breaks an end or a pair you have fixed. You rarely need to build the sentence from scratch.\n" +
        "- **End punctuation**: a question mark, full stop or comma at the end of a part. A part with ? or a full stop must come last; a part ending in a comma cannot.\n" +
        "The method:\n" +
        "- Find the part that can open: a subject, a question word (how, why), a linker clause (though, if) or a time phrase. A part that starts with a verb, of, and, which or but also cannot open.\n" +
        "- Find the part that can close: one with end punctuation, or a finished phrase. A part that ends on a preposition, an article, 'and' or a helping verb cannot close.\n" +
        "- Strike the options that open or close with the wrong part. Usually one or two survive.\n" +
        "- If two survive, lock one inside pair (subject and verb, preposition and object) to choose between them.\n" +
        "- Read the survivor from start to end. It must be one sentence that makes sense.",
      authoredExample: {
        prompt:
          "Arrange the parts into one sentence. P: the safety of / Q: the first duty of / R: every soldier is / S: his comrades. " +
          "Options: (a) QRPS (b) PSQR (c) QPRS (d) RSQP",
        steps: [
          "Closing part: P ends on 'of', Q ends on 'of', R ends on 'is'. All three are hanging ends. Only S can close.",
          "Strike the options that do not end on S: (b) and (d). Left: (a) and (c).",
          "Inside pair: Q ends on 'of', so its object comes next. 'The first duty of every soldier' makes sense; 'the first duty of the safety of' does not. Lock Q R.",
          "That is (a). 'is' in R is then completed by 'the safety of his comrades'.",
          "Read it: 'the first duty of every soldier is the safety of his comrades'.",
        ],
        answer: "(a) QRPS",
      },
      selfCheckExample: {
        prompt:
          "Arrange the parts into one sentence. P: were lying / Q: when the officer entered the room, / R: the papers / S: all over the floor. " +
          "Options: (a) QRPS (b) RPSQ (c) RQPS (d) PSQR",
        steps: [
          "End punctuation: Q ends in a comma, so it cannot close. Strike (b) and (d).",
          "Q is a linker clause (when ...), so it can open. The comma tells you the main clause follows it.",
          "Main clause: subject R, verb P, then S. That is (a). (c) drops the when-clause between the subject and its verb.",
        ],
        answer: "(a) QRPS",
      },
      practiceSet: [
        {
          prompt: "Can a part ending in 'of the' close a sentence?",
          answer: "No.",
          method: "It needs its noun after it.",
        },
        {
          prompt: "Which part must be last? P: the march began / Q: at dawn. / R: from the camp",
          answer: "Q",
          method: "It carries the full stop.",
        },
        {
          prompt: "S can only open and R can only close. Options: (a) SPQR (b) SRQP (c) PSQR (d) SQRP. Which survives?",
          answer: "(a) SPQR",
          method: "Strike every option that does not start with S and end with R.",
        },
        {
          prompt: "Which part can open? P: of the bridge / Q: the repair / R: will take a week",
          answer: "Q: the repair of the bridge will take a week.",
          method: "A part that starts with of or with a verb cannot open.",
        },
      ],
      pyqExampleId: "f1b9016c-5a1e-43e6-b960-5b4c967c4683",
      traps: [
        {
          title: "Building the sentence from scratch",
          body:
            "Trying every order of four parts wastes time. Fix one end, strike options, and read only the one or two that survive.",
        },
        {
          title: "Missing the punctuation",
          body:
            "A question mark or a full stop at the end of a part decides the last part outright. A comma means the part cannot be last. " +
            "Look at the punctuation before you read the words.",
        },
        {
          title: "Trusting the ends alone",
          body:
            "Two options can share both the first and the last part. Then lock a pair inside and read both survivors in full before you choose.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PS_PAIRS_NOTE: SubtopicNote = {
  subtopicName: "Paragraph Pairs and Elimination",
  title: "Lock a pair, then strike the options",
  oneLineDefinition:
    "Find two sentences that must sit together, in a fixed order, then use that pair and one link at a time to strike options until one is left.",
  whyItMatters:
    "You do not need the whole order to answer. One pair you are sure of, checked against the four options, usually leaves one or two. " +
    "This is also the safest way through a passage where the middle feels loose: you rely on the links you can prove, not on the order that sounds nicest.",
  concepts: [
    // C1 — the mandatory pair
    {
      kind: "formula" as const,
      slug: "cdsenps-mandatory-pair",
      name: "Two sentences that must sit together",
      intuition:
        "Some sentences cannot stand alone. 'It must be finished in 25 minutes' needs the sentence that names the task, right before it. Two such sentences form a block that moves as one.",
      definition:
        "The terms:\n" +
        "- **Mandatory pair**: two sentences that must sit next to each other, in a fixed order.\n" +
        "- **Fixed block**: three sentences that form such a chain (A then B then C).\n" +
        "Signs of a pair:\n" +
        "- The second sentence uses a pronoun or pointer for something only the first names.\n" +
        "- The second starts with 'And', 'The same is true of', or completes the first ('so heavy ... that it').\n" +
        "- The second gives the exact figure or detail for a general word in the first ('a large share' then 'exactly half').\n" +
        "The method:\n" +
        "- Find the pair, and decide its order: which sentence leans on which?\n" +
        "- Check whether a third sentence joins the block before or after it.\n" +
        "- Keep only the options that show the pair side by side, in that order.",
      authoredExample: {
        prompt:
          "S1: Our cadet corps planned a three-day trek to a lake high in the hills.\n" +
          "P: On the third day, the weather turned.\n" +
          "Q: The first two days went exactly as planned.\n" +
          "R: Snow began to fall at noon.\n" +
          "S: By evening, it lay knee-deep on the path.\n" +
          "S6: The leader decided to turn back, and nobody argued.\n" +
          "(a) QPRS (b) QPSR (c) PRQS (d) QRPS",
        steps: [
          "S says 'By evening, it lay knee-deep'. 'It' is the snow, and 'evening' follows R's noon. So R-S is a mandatory pair, in that order.",
          "Check the options for R immediately followed by S: (a) has it. (b) reverses it (S-R). (c) and (d) separate R from S. Only (a) survives.",
          "Read (a) to check: the first two days (Q), the third day the weather turned (P), snow at noon (R), knee-deep by evening (S), turn back (S6).",
        ],
        answer: "(a) QPRS",
      },
      selfCheckExample: {
        prompt:
          "S1: A good soldier looks after his equipment as carefully as his health.\n" +
          "P: A rifle that is not cleaned can jam at the worst moment.\n" +
          "Q: The same is true of boots.\n" +
          "R: Wet boots that are not dried and oiled crack within weeks.\n" +
          "S: That is why cleaning is done every evening, even after the longest march.\n" +
          "S6: In battle, such small habits can decide who comes home.\n" +
          "(a) PQRS (b) QRPS (c) PRQS (d) PQSR",
        steps: [
          "Q-R is a pair: 'The same is true of boots' is completed by R, which says what happens to boots. (c) reverses it and (d) splits it. Both fail.",
          "Q's 'The same is true' also needs a specific claim before it: the rifle that jams (P). So P comes before the pair. (b) puts the pair first and fails.",
          "Read (a): P, Q, R, S, S6.",
        ],
        answer: "(a) PQRS",
      },
      practiceSet: [
        {
          prompt:
            "Which two sentences must sit together, and in what order? 'It must be finished in 25 minutes.' 'Medical checks come later.' 'The first test is a 5 km run.'",
          answer: "'The first test is a 5 km run.' then 'It must be finished in 25 minutes.'",
          method: "'It' is the run.",
        },
        {
          prompt:
            "You know R-S is a fixed pair. Options: (a) PRSQ (b) RPSQ (c) SRQP (d) QPRS. Which survive?",
          answer: "(a) and (d)",
          method: "(b) splits R and S; (c) reverses them.",
        },
        {
          prompt: "Q says 'And it never closes.' R says 'The canteen opens at 6 a.m.' What is the pair?",
          answer: "R then Q",
          method: "'And it' continues R's sentence about the canteen.",
        },
      ],
      pyqExampleId: "63402097-6ddb-4cd6-95e5-1b0aba8aff40",
      traps: [
        {
          title: "The right pair in the wrong order",
          body:
            "R-S and S-R are different orders. Before you go to the options, decide which sentence leans on the other; an option that reverses the pair fails.",
        },
        {
          title: "A pair that is only likely",
          body:
            "Two sentences on the same topic are not a fixed pair. A pair is fixed only when one cannot stand without the other: a pronoun, 'And', 'The same is true', or a figure that completes a fact.",
        },
        {
          title: "Missing the third member",
          body:
            "A pair can be part of a block of three. If the first sentence of your pair itself leans on another sentence, that sentence joins the block. Check before you strike options.",
        },
      ],
    },

    // C2 — eliminate with the options
    {
      kind: "formula" as const,
      slug: "cdsenps-strike-options",
      name: "Use the options: test one link at a time",
      intuition:
        "Four options are four guesses, and three of them break somewhere. You do not need to build the order yourself. Take one link you can prove, strike every option that breaks it, and repeat with the next link.",
      definition:
        "The terms:\n" +
        "- **Elimination**: removing options that break a proven link, until one is left.\n" +
        "The method:\n" +
        "- Start with your surest link: the opener after S1, the sentence S6 needs, or a mandatory pair.\n" +
        "- Strike every option that breaks it.\n" +
        "- Look at the options that remain. Find the place where they **differ**, and test only that link.\n" +
        "- Use links with a clear signal (a pronoun, a pointer, a linker, a date, a count). A link that only 'sounds better' is not proof.\n" +
        "- When one option is left, read it from S1 to S6 once to confirm.",
      authoredExample: {
        prompt:
          "S1: The wooden footbridge over the stream had been broken for two years.\n" +
          "P: They began by cutting four strong poles from the forest.\n" +
          "Q: Last spring, the villagers decided to rebuild it themselves.\n" +
          "R: Then they fixed planks across the poles and tied ropes along both sides.\n" +
          "S: When the rains came, the children could cross to school for the first time in two years.\n" +
          "S6: The bridge has needed only small repairs since.\n" +
          "(a) PQRS (b) QPRS (c) QRPS (d) QPSR",
        steps: [
          "Link 1: P's 'They' needs the villagers named in Q. (a) puts P first and is struck.",
          "(b), (c) and (d) all start with Q. They differ in what comes second. Link 2: P says they 'began by' cutting poles, and R fixes planks 'across the poles'. So P comes before R. (c) is struck.",
          "(b) and (d) differ in the last two places. Link 3: the children can cross (S) only after the bridge is built (R). (d) puts S before R and is struck.",
          "(b) is left. Read it: Q, P, R, S, S6.",
        ],
        answer: "(b) QPRS",
      },
      selfCheckExample: {
        prompt:
          "S1: Every winter, thousands of migratory birds visit the lake near our town.\n" +
          "P: Most of them arrive from Central Asia in November.\n" +
          "Q: They stay till March and then fly back north.\n" +
          "R: This year, however, their numbers fell by half.\n" +
          "S: Experts blame the new factory on the shore, whose waste has poisoned the fish the birds feed on.\n" +
          "S6: The district has now ordered the factory to treat its waste before releasing it.\n" +
          "(a) PQRS (b) PRQS (c) RSPQ (d) QPRS",
        steps: [
          "Surest link: S6 says 'the factory', so S must come fourth. (c) ends with Q and is struck.",
          "(a), (b) and (d) all end with S. They differ in the first three places. Q's stay till March must follow their arrival in November (P), so (d) is struck.",
          "(a) and (b) differ in second place. R's 'however' turns from the usual pattern, so the whole pattern (arrive, stay, leave) comes before it. (b) puts R between arrival and stay and is struck.",
          "(a) is left: P, Q, R, S, S6.",
        ],
        answer: "(a) PQRS",
      },
      practiceSet: [
        {
          prompt:
            "You know Q must come right after S1. Options: (a) QSPR (b) SQPR (c) QPRS (d) PQRS. Which remain?",
          answer: "(a) and (c)",
        },
        {
          prompt: "Two options remain: (a) RPQS and (b) RPSQ. Which link should you test?",
          answer: "Only the third place: does Q or S follow P?",
          method: "Both options agree on R-P, so R-P cannot separate them.",
        },
        {
          prompt: "Your own order is not among the options. What should you do?",
          answer: "Find the link in your order you are least sure of, and recheck it. Then keep the option that respects all the links you can prove.",
        },
      ],
      pyqExampleId: "2483e3c7-2985-4eeb-9325-0e25c72257fb",
      traps: [
        {
          title: "Solving fully before looking at the options",
          body:
            "Building the whole order costs time and invites a wrong guess in the middle. One proven link usually removes two or three options; use the options early.",
        },
        {
          title: "Testing what the options share",
          body:
            "If two options agree on the first two letters, those letters cannot separate them. Test only the place where they differ.",
        },
        {
          title: "Striking on a feeling",
          body:
            "Strike an option only on a link you can point to: a pronoun, a pointer, a linker, a date or a count. If two orders both read smoothly, find the signal word that decides between them before you mark.",
        },
      ],
    },
  ],
};

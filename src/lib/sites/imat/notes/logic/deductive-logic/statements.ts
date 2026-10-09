import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_DED_STATEMENTS_NOTE: SubtopicNote = {
  subtopicName: "Statements and Quantifiers",
  title: "Statements, Quantifiers and Negation",
  oneLineDefinition:
    "A statement is either true or false; words like all, some, none and at least one decide exactly what it claims, and what its opposite claims.",
  whyItMatters:
    "The ministry papers asked which conclusion follows from a single fact (2025) and which of five statements is true (2026). The older papers asked which two comparison statements mean the same thing (2011) and what must follow from a chain of comparisons (2012).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-ded-propositions",
      name: "Propositions: statements that are either true or false",
      intuition:
        "Logic works only with sentences that have a truth value. \"Close the door\" is neither true nor false, but \"The door is closed\" is one or the other. The size of a claim matters: one example is enough to show that something exists, but no number of examples proves that something holds for every case.",
      definition:
        "A **proposition** is a sentence that is either true or false, never both.\n" +
        "- A **universal** claim speaks about every member of a group: \"all\", \"every\", \"no\", \"none\".\n" +
        "- An **existential** claim says at least one member exists: \"some\", \"at least one\", \"there is\".\n" +
        "- In logic, **some** means at least one, and possibly all. It does not mean \"not all\".\n" +
        "- One example proves an existential claim. One **counterexample** disproves a universal claim.\n" +
        "- A conclusion is **deducible** only if the given statements force it. Being true in the real world is not enough.",
      authoredExample: {
        prompt:
          "You are told only this: \"Vesuvius is an active volcano in Italy.\" Which of these can be deduced? (i) At least one active volcano is in Italy. (ii) Every volcano in Italy is active. (iii) Some active volcanoes are outside Italy.",
        steps: [
          "The statement names one active volcano that is in Italy. One example proves that at least one exists, so (i) is deducible.",
          "(ii) is a universal claim about every Italian volcano. One example cannot prove it.",
          "(iii) may be true in the real world, but the statement says nothing about volcanoes outside Italy. It is not deducible.",
        ],
        answer: "Only (i)",
      },
      selfCheckExample: {
        prompt:
          "Consider the statement: \"Nine is an odd number that is also a perfect square.\" Which of the following can be deduced from it?",
        options: [
          "All perfect squares are odd.",
          "At least one odd number is a perfect square.",
          "Some odd numbers are not perfect squares.",
          "No even number is a perfect square.",
          "Every odd number is a perfect square.",
        ],
        steps: [
          "The statement gives one example: a number that is both odd and a perfect square. One example proves an existential claim, so B follows.",
          "A and E are universal claims; one example cannot prove them.",
          "C is true in real life (3 is odd and not a square), but nothing in the given statement tells you so. True is not the same as deducible.",
          "D is about even numbers, which the statement never mentions (and it is false: 4 is a square).",
        ],
        answer: "(B) At least one odd number is a perfect square.",
      },
      practiceSet: [
        { prompt: "Is \"Please sit down\" a proposition?", answer: "No", method: "It is a request; it cannot be true or false" },
        { prompt: "Does \"The penguin is a bird that cannot fly\" let you deduce \"Some birds cannot fly\"?", answer: "Yes", method: "One example proves an existential claim" },
        { prompt: "What single fact would disprove \"Every multiple of 3 is odd\"?", answer: "Any even multiple of 3, such as 6", method: "One counterexample disproves a universal claim" },
        { prompt: "\"Some students passed.\" Is it possible that every student passed?", answer: "Yes", method: "In logic, some means at least one, possibly all" },
      ],
      traps: [
        {
          title: "True is not the same as deducible",
          body: "IMAT often places a statement that is true in the real world among the options. If it does not follow from the given statements alone, it is not the answer to \"which can be deduced\".",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-ded-negation",
      name: "Negating statements with all, some, none and at least one",
      intuition:
        "The negation of a statement is the statement that is true exactly when the original is false. To break \"all A are B\", you need only one A that is not B; you do not need every A to fail. So the negation of a strong claim is usually a weak one.",
      definition:
        "The **negation** of a statement S is true in every case where S is false, and false in every case where S is true.\n" +
        "- \"All\" and \"some ... not\" are negations of each other.\n" +
        "- \"No\" and \"some\" are negations of each other.\n" +
        "- **Contraries** such as \"all A are B\" and \"no A are B\" cannot both be true, but they can both be false. So a contrary is not a negation.\n" +
        "- The negation of \"P and Q\" is \"not P, or not Q (or both)\". The negation of \"P or Q\" is \"not P and not Q\".",
      table: {
        columns: ["Statement", "Its negation", "Not the negation"],
        rows: [
          { cells: ["All A are B", "Some A are not B (at least one A is not B)", "No A are B"] },
          { cells: ["No A are B", "Some A are B", "All A are B"] },
          { cells: ["Some A are B", "No A are B", "Some A are not B"] },
          { cells: ["Some A are not B", "All A are B", "No A are B"] },
          { cells: ["At least two came", "At most one came (one or none)", "Nobody came"] },
          { cells: ["P and Q", "Not P, or not Q, or both", "Not P and not Q"] },
          { cells: ["P or Q", "Not P and not Q", "Not P, or not Q"] },
        ],
        caption: "Test a candidate negation: in every possible situation, exactly one of the pair must be true.",
      },
      selfCheckExample: {
        prompt: "Which statement is the negation of \"Every sample in the batch was labelled\"?",
        options: [
          "No sample in the batch was labelled.",
          "At least one sample in the batch was labelled.",
          "Most samples in the batch were labelled.",
          "At least one sample in the batch was not labelled.",
          "Some samples in the batch were labelled and some were not.",
        ],
        steps: [
          "The original fails as soon as one sample is unlabelled. So the negation is \"at least one sample was not labelled\": D.",
          "A is the contrary: if half were labelled, both the original and A are false, so A is not its negation.",
          "E demands at least one labelled sample as well. If no sample was labelled, the original is false and E is also false, so E is too strong.",
        ],
        answer: "(D) At least one sample in the batch was not labelled.",
      },
      practiceSet: [
        { prompt: "Negate: \"Some doctors are surgeons.\"", answer: "No doctors are surgeons." },
        { prompt: "Negate: \"It is raining and it is cold.\"", answer: "It is not raining, or it is not cold, or both." },
        { prompt: "Negate: \"At least two of the tests were positive.\"", answer: "At most one of the tests was positive.", method: "The opposite of 2 or more is 0 or 1" },
        { prompt: "Negate: \"No patient missed a dose.\"", answer: "At least one patient missed a dose." },
      ],
      traps: [
        {
          title: "The negation of all is not none",
          body: "\"Not all A are B\" means at least one A is not B. It does not mean that no A is B. Choosing the \"none\" option confuses the negation with the contrary, which is a much stronger claim.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ded-comparisons",
      name: "Comparison statements: equivalent wordings and ordering chains",
      intuition:
        "Comparison words hide a symbol. \"Not more than\" is the same as \"at most\", which allows equality; \"fewer than\" does not. Once every statement is written as a symbol, equivalent statements look identical. For an ordering, link the comparisons into a chain: only items joined by a chain can be compared for certain.",
      definition:
        "Translate each comparison into a symbol before comparing:\n" +
        "- \"more than\" is \\(>\\); \"fewer than\" or \"less than\" is \\(<\\).\n" +
        "- \"at least\", \"not fewer than\", \"no less than\" are \\(\\ge\\).\n" +
        "- \"at most\", \"not more than\", \"no more than\" are \\(\\le\\).\n" +
        "- \"not (x > y)\" is \\(x \\le y\\): negating a strict inequality brings in equality.\n" +
        "- **Ordering** is transitive: if \\(a > b\\) and \\(b > c\\), then \\(a > c\\). Two items each greater than a third cannot be ordered against each other.",
      formula: {
        label: "Negating a comparison",
        latex: "\\text{not}(x > y) \\;\\Leftrightarrow\\; x \\le y \\qquad \\text{not}(x < y) \\;\\Leftrightarrow\\; x \\ge y",
        symbols: [
          { symbol: "\\(\\le\\)", meaning: "at most, not more than" },
          { symbol: "\\(\\ge\\)", meaning: "at least, not fewer than" },
        ],
      },
      authoredExample: {
        prompt:
          "A crate holds apples (A) and pears (P). Which two of these statements say the same thing? (1) There are not fewer apples than pears. (2) There are fewer pears than apples. (3) The pears do not outnumber the apples.",
        steps: [
          "(1) \"Not fewer apples than pears\" is not \\((A < P)\\), which is \\(A \\ge P\\).",
          "(2) \"Fewer pears than apples\" is \\(P < A\\), which is \\(A > P\\): equality is not allowed.",
          "(3) \"Pears do not outnumber apples\" is not \\((P > A)\\), which is \\(P \\le A\\), the same as \\(A \\ge P\\).",
          "So (1) and (3) are equivalent. (2) differs only in the case \\(A = P\\), which (1) and (3) allow and (2) forbids.",
        ],
        answer: "(1) and (3)",
      },
      selfCheckExample: {
        prompt:
          "Four friends compare their heights. Ugo is taller than Pia. Rita is shorter than Pia. Sam is taller than Rita. No two have the same height. Which statement must be true?",
        options: [
          "Sam is taller than Pia.",
          "Pia is taller than Sam.",
          "Ugo is the tallest of the four.",
          "Sam is shorter than Ugo.",
          "Ugo is taller than Rita.",
        ],
        steps: [
          "Chain: Ugo > Pia > Rita, so Ugo > Rita. E must be true.",
          "Sam is only known to be taller than Rita. He could be above Ugo, between Ugo and Pia, or between Pia and Rita.",
          "So A, B, C and D can each be true or false: each is possible, none is certain.",
        ],
        answer: "(E) Ugo is taller than Rita.",
      },
      practiceSet: [
        { prompt: "Write \"no more than 40 people\" with a symbol.", answer: "\\(n \\le 40\\)" },
        { prompt: "\"Not fewer than 20 people came.\" Could exactly 20 have come?", answer: "Yes", method: "Not fewer than means \\(\\ge\\)" },
        { prompt: "Xena is older than Yuri, and Zoe is older than Xena. Who is the youngest?", answer: "Yuri", method: "Zoe > Xena > Yuri" },
        { prompt: "Lake L is deeper than lake M, and lake N is deeper than lake M. Is L deeper than N?", answer: "Cannot be decided", method: "Both are linked only to M" },
      ],
      traps: [
        {
          title: "\"Not more than\" allows equality",
          body: "\"There are not more cats than dogs\" means cats \\(\\le\\) dogs, so the numbers may be equal. It is not the same as \"there are fewer cats than dogs\", which rules equality out. IMAT builds wrong options on exactly this difference.",
        },
        {
          title: "Items not joined by a chain cannot be compared",
          body: "If two items are each greater than a third, nothing fixes their order against each other. An option that orders them is \"could be true\", never \"must be true\".",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const FINDING_TRUTH_VALUES_NOTE: SubtopicNote = {
  subtopicName: "Finding Truth Values of Component Statements",
  title: "Finding Truth Values of Component Statements",
  oneLineDefinition:
    "Given that a whole statement pattern is false (or true), work backwards to pin down the truth values of p, q and r.",
  whyItMatters:
    "This is the chapter's signature move and the single most repeated question shape on the paper — 16 PYQs sit here, and only 19% are HARD, " +
    "which makes it the best return on effort in the chapter. " +
    "The reason it is cheap is that you never build a table: a conditional is false in exactly one row, so being told it is false HANDS you the values " +
    "rather than leaving you to search for them. Recognise the shape and most of these take under a minute.",
  concepts: [
    // 1 — the core forced-row move
    {
      kind: "formula" as const,
      slug: "mlog-forced-row-false-conditional",
      name: "The Forced Row of a False Conditional",
      intuition:
        "A conditional fails in exactly one way. So if a question tells you that a conditional is FALSE, it has not given you a puzzle — it has given you the answer. " +
        "The antecedent must be true and the consequent must be false, and everything else follows from unpacking those two facts.",
      definition:
        "If \\(X \\to Y\\) is **false**, then immediately \\(X = T\\) and \\(Y = F\\). There is no other possibility.\n" +
        "- Unpack \\(X = T\\): every part of a conjunction must be T.\n" +
        "- Unpack \\(Y = F\\): every part of a disjunction must be F.\n" +
        "- A conjunction being true and a disjunction being false are both **forcing** — each pins down every letter inside it.\n" +
        "This is why the false case is easy and the true case is not: \\(X \\to Y = T\\) has three rows and forces nothing.",
      formula: {
        label: "The one false row of a conditional",
        latex:
          "X \\to Y = F \\iff X = T \\;\\text{ and }\\; Y = F \\qquad (A \\wedge B) = T \\Rightarrow A = B = T \\qquad (A \\vee B) = F \\Rightarrow A = B = F",
        symbols: [
          { symbol: "X", meaning: "the antecedent — forced TRUE" },
          { symbol: "Y", meaning: "the consequent — forced FALSE" },
        ],
      },
      authoredExample: {
        prompt:
          "If \\((p \\wedge \\sim q) \\to (q \\vee r)\\) is false, find the truth values of \\(p\\), \\(q\\) and \\(r\\).",
        steps: [
          "The statement is a conditional and it is false, so the antecedent is T and the consequent is F.",
          "Antecedent: \\(p \\wedge \\sim q = T\\). A conjunction is true only when both parts are, so \\(p = T\\) and \\(\\sim q = T\\), giving \\(q = F\\).",
          "Consequent: \\(q \\vee r = F\\). A disjunction is false only when both parts are, so \\(q = F\\) and \\(r = F\\).",
          "The two \\(q\\) readings agree (both F), which is the consistency check — if they had disagreed, the question would be faulty.",
        ],
        answer: "\\(p = T,\\; q = F,\\; r = F\\).",
      },
      selfCheckExample: {
        prompt:
          "If \\(p \\vee \\sim(q \\wedge r)\\) is false, find the truth values of \\(p\\), \\(q\\) and \\(r\\).",
        steps: [
          "This is a disjunction that is false, so BOTH parts are false.",
          "First part: \\(p = F\\).",
          "Second part: \\(\\sim(q \\wedge r) = F\\), so \\(q \\wedge r = T\\).",
          "A true conjunction forces both: \\(q = T\\) and \\(r = T\\).",
        ],
        answer: "\\(p = F,\\; q = T,\\; r = T\\).",
      },
      practiceSet: [
        {
          prompt: "If \\(p \\to q\\) is false, what are \\(p\\) and \\(q\\)?",
          answer: "\\(p = T,\\; q = F\\)",
          method: "The single false row of a conditional.",
        },
        {
          prompt: "If \\(p \\wedge q\\) is true, what are \\(p\\) and \\(q\\)?",
          answer: "Both true.",
          method: "A true conjunction forces every part true.",
        },
        {
          prompt: "If \\(p \\vee q\\) is false, what are \\(p\\) and \\(q\\)?",
          answer: "Both false.",
          method: "A false disjunction forces every part false.",
        },
        {
          prompt: "If \\(\\sim p \\vee q\\) is false, what are \\(p\\) and \\(q\\)?",
          answer: "\\(p = T,\\; q = F\\)",
          method: "Both parts false: \\(\\sim p = F\\) gives \\(p = T\\), and \\(q = F\\).",
        },
      ],
      pyqExampleId: "15dbc993-cb29-4437-a484-f2ff35967302",
      traps: [
        {
          title: "Trying to work backwards from a TRUE conditional",
          body:
            "\\(X \\to Y = T\\) is satisfied by three of the four rows, so it forces nothing on its own. " +
            "If a stem says a conditional is true, the information you need is somewhere else in the stem — look for a second given, not for a forced row.",
        },
      ],
    },

    // 2 — biconditional
    {
      kind: "formula" as const,
      slug: "mlog-forced-values-biconditional",
      name: "Forced Values from a Biconditional",
      intuition:
        "A biconditional says the two sides agree. So being told one is true tells you the sides match, and being told it is false tells you they differ — " +
        "and if you already know one side, the other is settled immediately.",
      definition:
        "For \\(X \\leftrightarrow Y\\):\n" +
        "- **True** means \\(X\\) and \\(Y\\) have the **same** truth value.\n" +
        "- **False** means they have **different** truth values.\n" +
        "Unlike a conditional, the TRUE case is informative here — it is a matching rule, not a three-row escape. " +
        "If the stem fixes one side by any route, the other side follows with no case work.",
      formula: {
        label: "The matching rule",
        latex:
          "X \\leftrightarrow Y = T \\iff X = Y \\qquad X \\leftrightarrow Y = F \\iff X \\neq Y",
        symbols: [
          { symbol: "X, Y", meaning: "the two sides, which may themselves be compound" },
        ],
      },
      authoredExample: {
        prompt:
          "Given that \\(q\\) is false and \\((p \\wedge q) \\leftrightarrow r\\) is true, find \\(r\\).",
        steps: [
          "Start with what is fixed: \\(q = F\\).",
          "Then \\(p \\wedge q = p \\wedge F = F\\), whatever \\(p\\) is — a conjunction with one false part is false.",
          "The biconditional is true, so both sides match.",
          "The left side is F, so \\(r = F\\). Note that \\(p\\) is never determined, and does not need to be.",
        ],
        answer: "\\(r = F\\); \\(p\\) stays undetermined.",
      },
      selfCheckExample: {
        prompt:
          "If \\(p \\leftrightarrow (q \\to p)\\) is false, find the truth values of \\(p\\) and \\(q\\).",
        steps: [
          "The biconditional is false, so the two sides differ.",
          "Try \\(p = T\\): then \\(q \\to p = q \\to T = T\\), so both sides are T and they do not differ. Rejected.",
          "So \\(p = F\\). Then the right side must be T: \\(q \\to F = T\\) requires \\(q = F\\).",
          "Check: \\(p = F\\) and \\(q \\to p = F \\to F = T\\). The sides differ, as required.",
        ],
        answer: "\\(p = F,\\; q = F\\).",
      },
      practiceSet: [
        {
          prompt: "If \\(p \\leftrightarrow q\\) is true and \\(p\\) is false, what is \\(q\\)?",
          answer: "\\(q = F\\)",
          method: "True biconditional means the sides match.",
        },
        {
          prompt: "If \\(p \\leftrightarrow q\\) is false and \\(p\\) is true, what is \\(q\\)?",
          answer: "\\(q = F\\)",
          method: "False biconditional means the sides differ.",
        },
        {
          prompt: "If \\(r\\) is false and \\(s \\leftrightarrow r\\) is true, what is \\(s\\)?",
          answer: "\\(s = F\\)",
          method: "Sides match.",
        },
        {
          prompt: "Is \\(p \\wedge q\\) determined when \\(q\\) is false?",
          answer: "Yes — it is false regardless of \\(p\\).",
          method: "One false part kills a conjunction.",
        },
      ],
      pyqExampleId: "0b2ee065-0b44-42b7-a3f8-2182e37007b4",
      traps: [
        {
          title: "Hunting for p when p is not determined",
          body:
            "In 'q is false and \\((p \\wedge q) \\leftrightarrow r\\) is true', \\(p\\) never gets pinned down and does not need to be — the answer depends only on \\(r\\). " +
            "Students lose time trying to force a value that the stem deliberately leaves open. If a letter cancels out, move on.",
        },
      ],
    },

    // 3 — chaining two givens
    {
      kind: "formula" as const,
      slug: "mlog-chaining-two-givens",
      name: "Chaining Two Given Truth Values",
      intuition:
        "Some stems give you two compound facts at once — 'p implies r is false AND p if and only if q is false'. " +
        "Take them in the order that forces the most: the false conditional pins two letters outright, and the second given then names the third.",
      definition:
        "With several givens, order your work by how much each one forces:\n" +
        "- A **false conditional** forces two letters. Do it first.\n" +
        "- A **false or true biconditional** then settles a remaining letter by matching or differing.\n" +
        "- A true conjunction or false disjunction also force; a true conditional and a true disjunction generally do not.\n" +
        "Once every letter is known, the rest of the question is plain one-row substitution.",
      authoredExample: {
        prompt:
          "The truth value of \\(p \\to r\\) is F and the truth value of \\(p \\leftrightarrow q\\) is F. Find the truth value of \\((\\sim p \\vee q) \\to (p \\vee \\sim q)\\).",
        steps: [
          "Take the false conditional first: \\(p \\to r = F\\) forces \\(p = T\\) and \\(r = F\\).",
          "Now the biconditional: \\(p \\leftrightarrow q = F\\) means the sides differ. Since \\(p = T\\), we get \\(q = F\\).",
          "All three letters are known: \\(p = T,\\; q = F,\\; r = F\\).",
          "Substitute into the target: \\(\\sim p \\vee q = F \\vee F = F\\); \\(p \\vee \\sim q = T \\vee T = T\\).",
          "So the target is \\(F \\to T\\), which is true because the antecedent is false.",
        ],
        answer: "\\(T\\)",
      },
      selfCheckExample: {
        prompt:
          "The truth value of \\(p \\to r\\) is F and of \\(p \\leftrightarrow q\\) is F. Find the truth value of \\((p \\wedge \\sim q) \\to (\\sim p \\wedge r)\\).",
        steps: [
          "As before, \\(p \\to r = F\\) gives \\(p = T,\\; r = F\\); then \\(p \\leftrightarrow q = F\\) gives \\(q = F\\).",
          "Antecedent: \\(p \\wedge \\sim q = T \\wedge T = T\\).",
          "Consequent: \\(\\sim p \\wedge r = F \\wedge F = F\\).",
          "The pattern is \\(T \\to F\\).",
        ],
        answer: "\\(F\\)",
      },
      practiceSet: [
        {
          prompt: "If \\(p \\to q\\) is F, what is \\(\\sim p\\)?",
          answer: "\\(F\\)",
          method: "\\(p = T\\), so \\(\\sim p = F\\).",
        },
        {
          prompt: "If \\(p = T\\) and \\(p \\leftrightarrow q\\) is F, what is \\(q\\)?",
          answer: "\\(F\\)",
          method: "A false biconditional means the sides differ.",
        },
        {
          prompt: "Which forces more: \\(X \\to Y = F\\) or \\(X \\to Y = T\\)?",
          answer: "The false one.",
          method: "False fixes one row; true allows three.",
        },
        {
          prompt: "If \\(p \\vee q\\) is F and \\(q \\leftrightarrow r\\) is T, what is \\(r\\)?",
          answer: "\\(F\\)",
          method: "\\(p = q = F\\), and a true biconditional matches, so \\(r = F\\).",
        },
      ],
      pyqExampleId: "00b2a6f3-2fb7-42f2-b56e-7714beac3769",
      traps: [
        {
          title: "Starting with the given that forces least",
          body:
            "Both givens are true statements about the same letters, but they are not equally useful. " +
            "Beginning with a TRUE conditional leaves you enumerating three rows; beginning with the FALSE one settles two letters at a stroke. " +
            "Scan the givens and start with a false conditional, a true conjunction or a false disjunction.",
        },
      ],
    },

    // 4 — testing the options once values are known
    {
      kind: "formula" as const,
      slug: "mlog-testing-the-options",
      name: "Testing the Options Once the Values Are Known",
      intuition:
        "Many of these stems do not ask for p, q and r at all — they ask which of four statement patterns is true, or is a tautology. " +
        "The deduction is only half the question. The other half is a quick one-row evaluation of each option, and there is a shortcut worth knowing.",
      definition:
        "Once every letter is pinned down, work through the options in this order:\n" +
        "- Look first for an option whose **antecedent is false** — it is automatically true, with no further work.\n" +
        "- Otherwise substitute and evaluate, innermost bracket outwards.\n" +
        "- Stop at the first option that matches what is asked; on MHT-CET there is **no negative marking**, so a well-founded stop is free.",
      authoredExample: {
        prompt:
          "Given \\(p = T,\\; q = F,\\; r = F\\), decide which of these is true: (A) \\(q \\to (p \\wedge r)\\)  (B) \\(p \\to (q \\wedge r)\\)  (C) \\(p \\wedge (q \\vee r)\\).",
        steps: [
          "(A) The antecedent is \\(q = F\\), so the conditional is vacuously true. (A) is **T** with no further work.",
          "(B) Antecedent \\(p = T\\); consequent \\(q \\wedge r = F \\wedge F = F\\). So \\(T \\to F = F\\).",
          "(C) \\(q \\vee r = F \\vee F = F\\), so \\(p \\wedge F = F\\).",
          "Only (A) is true, and it was the one that needed no computation.",
        ],
        answer: "(A) is true; (B) and (C) are false.",
      },
      selfCheckExample: {
        prompt:
          "Given \\(q = F\\) and \\(r = F\\) (with \\(p\\) unknown), show that \\((p \\wedge q) \\to (p \\vee r)\\) is a tautology.",
        steps: [
          "Look at the antecedent: \\(p \\wedge q = p \\wedge F = F\\) for either value of \\(p\\).",
          "A conditional with a false antecedent is true.",
          "Since this holds whether \\(p\\) is T or F, the pattern is true in every remaining row.",
        ],
        answer:
          "It is a tautology — and note the consequent was never evaluated, because a false antecedent settles it.",
      },
      practiceSet: [
        {
          prompt: "With \\(p = F\\), what is \\(p \\to (\\text{anything})\\)?",
          answer: "\\(T\\)",
          method: "A false antecedent makes a conditional vacuously true.",
        },
        {
          prompt: "With \\(p = T,\\; q = F\\), evaluate \\(q \\to p\\).",
          answer: "\\(T\\)",
          method: "Antecedent false, so vacuously true.",
        },
        {
          prompt: "With \\(p = T,\\; q = F,\\; r = F\\), evaluate \\(p \\wedge (q \\vee r)\\).",
          answer: "\\(F\\)",
          method: "\\(q \\vee r = F\\), so the conjunction is false.",
        },
        {
          prompt: "With \\(q = F\\), is \\((p \\wedge q) \\to X\\) true for every \\(X\\)?",
          answer: "Yes.",
          method: "\\(p \\wedge q\\) is false, so the conditional is vacuously true.",
        },
      ],
      pyqExampleId: "08025a2e-ec53-4915-9952-9a70e6999b91",
      traps: [
        {
          title: "Evaluating a consequent you never needed",
          body:
            "If an option's antecedent works out false, the option is true and the consequent is irrelevant — however elaborate it looks. " +
            "Checking the antecedent first turns several of these questions into a single glance.",
        },
        {
          title: "Reporting the truth values when the question asked for an option",
          body:
            "These stems often end 'then which of the following is true?' rather than 'find p, q and r'. " +
            "Deducing the letters correctly and then answering the wrong question is a common and entirely avoidable loss.",
        },
      ],
    },
  ],
  related: [
    { label: "Statements, connectives and truth tables", href: "/notes/mht-cet-maths/mathematical-logic/statements-connectives-truth-tables" },
    { label: "Mathematical Logic playbook", href: "/guide/mht-cet-maths/playbooks/mathematical-logic" },
  ],
};

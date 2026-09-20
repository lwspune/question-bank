import type { SubtopicNote } from "@/app/notes/_types";

export const STATEMENTS_CONNECTIVES_NOTE: SubtopicNote = {
  subtopicName: "Statements, Connectives and Truth Tables",
  title: "Statements, Connectives and Truth Tables",
  oneLineDefinition:
    "A statement is a sentence that is definitely true or definitely false; connectives join statements, and a truth table lists the result for every combination of inputs.",
  whyItMatters:
    "This is the machinery every other subtopic in the chapter runs on — build the table, read the last column. 13 PYQs sit here and 38% of them are HARD, " +
    "which is higher than the chapter average and surprises students who expect the opening subtopic to be the easiest. " +
    "The difficulty is almost never the logic. It is that a MHT-CET stem will hand you statements like 'the sum of the cube roots of unity is 1' or " +
    "'A squared minus B squared equals (A−B)(A+B) for matrices' and expect you to settle their truth from the rest of the syllabus before any connective is touched.",
  concepts: [
    // 1 — foundation: what counts as a statement at all
    {
      kind: "formula" as const,
      slug: "mlog-statement-and-truth-value",
      name: "Statements and Truth Values",
      intuition:
        "Logic only deals with sentences you can definitively call true or false. 'Delhi is the capital of India' qualifies. " +
        "'Close the door', 'What time is it?' and 'x + 2 = 5' do not — the first two make no claim, and the third depends on an unknown x.",
      definition:
        "A **statement** (or proposition) is a declarative sentence that is either **true** or **false**, but not both. Its **truth value** is T or F.\n" +
        "- Commands, questions, requests and exclamations are **not** statements.\n" +
        "- An **open sentence** containing a variable (\\(x + 2 = 5\\)) is not a statement until the variable is fixed or quantified.\n" +
        "- Statements are labelled \\(p, q, r, s\\); a **simple** statement contains no connective, a **compound** statement is built from simple ones.",
      authoredExample: {
        prompt:
          "Which of these are statements? (i) 3 is an even number. (ii) Solve the equation \\(x^2 = 9\\). (iii) \\(y > 7\\). (iv) Every square is a rectangle.",
        steps: [
          "(i) It is a declarative sentence and it is definitely false. A false sentence is still a statement — **statement** does not mean **true**.",
          "(ii) This is a command. It asserts nothing, so it has no truth value and is not a statement.",
          "(iii) This is an open sentence: its truth depends on \\(y\\). Not a statement as written.",
          "(iv) Declarative and definitely true. A statement.",
        ],
        answer: "(i) and (iv) are statements; (ii) is a command and (iii) is an open sentence.",
      },
      practiceSet: [
        {
          prompt: "Is 'The Earth has two moons' a statement?",
          answer: "Yes — it is a statement with truth value F.",
          method: "Declarative and definitely false, so it is a statement.",
        },
        {
          prompt: "Is 'Please sit down' a statement?",
          answer: "No.",
          method: "A request makes no claim, so it has no truth value.",
        },
        {
          prompt: "Is \\(x + 1 = 4\\) a statement?",
          answer: "No — it is an open sentence.",
          method: "Its truth depends on the value of \\(x\\).",
        },
        {
          prompt: "Is 'For every natural number \\(n\\), \\(n \\geq 1\\)' a statement?",
          answer: "Yes — truth value T.",
          method: "The quantifier 'for every' closes the variable, so the sentence makes a definite claim.",
        },
      ],
      traps: [
        {
          title: "Treating a false sentence as 'not a statement'",
          body:
            "A statement only has to HAVE a truth value, not to be true. '2 + 2 = 5' is a perfectly good statement whose truth value is F. " +
            "The test is whether the sentence makes a definite claim, never whether the claim is correct.",
        },
      ],
    },

    // 2 — the connective reference table: the chapter's single most-used lookup
    {
      kind: "reference" as const,
      slug: "mlog-the-five-connectives",
      name: "The Five Logical Connectives",
      intuition:
        "Five symbols build every compound statement in this chapter. The fastest way to hold them is not the full table but the one row where each is unusual: " +
        "an AND is true only when both parts are, an OR is false only when both parts are, and a conditional is false only when a true claim leads to a false one.",
      definition:
        "Each connective is fully described by when it is **false**, because each has exactly one interesting case:\n" +
        "- \\(p \\wedge q\\) (**and**) is true only when both are true.\n" +
        "- \\(p \\vee q\\) (**or**) is inclusive — true when at least one holds, including both.\n" +
        "- \\(p \\to q\\) (**if–then**) is false only for \\(T \\to F\\).\n" +
        "- \\(p \\leftrightarrow q\\) (**if and only if**) is true exactly when both sides match.\n" +
        "- \\(\\sim p\\) (**not**) simply flips the value.",
      table: {
        columns: ["Connective", "Symbol", "Read as", "Value"],
        rows: [
          {
            cells: [
              "Negation",
              "\\(\\sim p\\)",
              "not p",
              "Flips: \\(\\sim T = F\\), \\(\\sim F = T\\)",
            ],
          },
          {
            cells: [
              "Conjunction",
              "\\(p \\wedge q\\)",
              "p and q",
              "T only when both p and q are T",
            ],
          },
          {
            cells: [
              "Disjunction",
              "\\(p \\vee q\\)",
              "p or q",
              "F only when both p and q are F",
            ],
            noteAmber:
              "Inclusive OR: 'p or q' is TRUE when both hold. Everyday English often means the exclusive one; logic never does.",
          },
          {
            cells: [
              "Conditional",
              "\\(p \\to q\\)",
              "if p then q",
              "F only when p is T and q is F",
            ],
            noteAmber:
              "The single most-tested row in the chapter. A conditional with a FALSE antecedent is TRUE, whatever the consequent says.",
          },
          {
            cells: [
              "Biconditional",
              "\\(p \\leftrightarrow q\\)",
              "p if and only if q",
              "T when p and q have the SAME value",
            ],
          },
        ],
        caption:
          "Every question in this chapter is this table applied repeatedly. Learn the Value column and the rest is bookkeeping.",
      },
      selfCheckExample: {
        prompt:
          "With \\(p\\) true and \\(q\\) false, find the truth values of \\(p \\wedge q\\), \\(p \\vee q\\), \\(p \\to q\\) and \\(p \\leftrightarrow q\\).",
        steps: [
          "\\(p \\wedge q = T \\wedge F = F\\) — an AND needs both.",
          "\\(p \\vee q = T \\vee F = T\\) — an OR needs only one.",
          "\\(p \\to q = T \\to F = F\\) — this is the one false case of a conditional.",
          "\\(p \\leftrightarrow q = T \\leftrightarrow F = F\\) — the sides differ.",
        ],
        answer: "\\(F,\\; T,\\; F,\\; F\\) respectively.",
      },
      practiceSet: [
        {
          prompt: "When is \\(p \\vee q\\) false?",
          answer: "Only when both \\(p\\) and \\(q\\) are false.",
          method: "Disjunction needs at least one true input.",
        },
        {
          prompt: "When is \\(p \\to q\\) false?",
          answer: "Only when \\(p\\) is true and \\(q\\) is false.",
          method: "A true claim leading to a false one is the single failing case.",
        },
        {
          prompt: "When is \\(p \\leftrightarrow q\\) true?",
          answer: "When \\(p\\) and \\(q\\) have the same truth value.",
          method: "Both T, or both F.",
        },
        {
          prompt: "Evaluate \\(F \\wedge T\\) and \\(F \\vee T\\).",
          answer: "\\(F\\) and \\(T\\).",
          method: "AND fails on one false input; OR survives on one true input.",
        },
      ],
      pyqExampleId: "3dd4d3f9-a1ed-4677-9b6b-3a4e1ba5f00c",
      traps: [
        {
          title: "Reading 'or' as exclusive",
          body:
            "In logic \\(p \\vee q\\) is TRUE when p and q are both true. A student who reads 'or' as 'one or the other but not both' will mark the both-true row F " +
            "and get every disjunction question wrong by exactly one row.",
        },
      ],
    },

    // 3 — the conditional, and the vacuous-truth case four PYQ solutions turn on
    {
      kind: "formula" as const,
      slug: "mlog-conditional-and-vacuous-truth",
      name: "The Conditional and Vacuous Truth",
      intuition:
        "A conditional is a promise: 'if p, then q'. You only break the promise by having p happen and q fail. " +
        "If p never happens, you have not broken anything — so the promise counts as kept. That is why 'If 3 + 2 = 7, then the earth is flat' is a TRUE statement.",
      definition:
        "\\(p \\to q\\) is **false in exactly one row**: \\(p\\) true and \\(q\\) false. In the other three rows it is true.\n" +
        "- When \\(p\\) is **false**, \\(p \\to q\\) is true no matter what \\(q\\) says. This is called **vacuous truth**.\n" +
        "- When \\(q\\) is **true**, \\(p \\to q\\) is true no matter what \\(p\\) says.\n" +
        "- \\(p \\to q\\) has the same truth value as \\(\\sim p \\vee q\\) in every row, which is the form you will use to simplify. The next-but-one concept gives that relationship its name and its symbol.",
      formula: {
        label: "The conditional and its disjunction form",
        // Deliberately written WITHOUT \equiv and \iff: neither symbol has been
        // introduced yet at this point in the arc, and both arrive two concepts
        // later. See [[notes-teaching-arc-forward-reference]].
        latex:
          "p \\to q \\;\\text{ agrees with }\\; \\sim p \\vee q \\;\\text{ in every row} \\qquad p \\to q = F \\;\\text{ only when } p = T,\\; q = F \\qquad F \\to q = T",
        symbols: [
          { symbol: "p", meaning: "the antecedent (hypothesis)" },
          { symbol: "q", meaning: "the consequent (conclusion)" },
          { symbol: "\\(F \\to q\\)", meaning: "vacuously true — a false antecedent makes the whole conditional true" },
        ],
      },
      authoredExample: {
        prompt:
          "Decide the truth value of each: (A) If \\(2 + 2 = 5\\), then Mumbai is in India. (B) If \\(2 + 2 = 4\\), then Mumbai is in Pakistan. (C) If \\(2+2=5\\), then \\(3+3=9\\).",
        steps: [
          "(A) The antecedent \\(2 + 2 = 5\\) is F. A false antecedent makes the conditional vacuously true, so (A) is **T**.",
          "(B) The antecedent is T and the consequent is F. This is the one failing pattern, so (B) is **F**.",
          "(C) Antecedent F, consequent F. Still \\(F \\to F\\), which is **T**.",
          "Only (B) is false, and it is the only one where a true claim leads to a false one.",
        ],
        answer: "(A) T, (B) F, (C) T.",
      },
      selfCheckExample: {
        prompt:
          "The statement 'If \\(n\\) is divisible by 4, then \\(n\\) is divisible by 2' is claimed for \\(n = 7\\). Is it true for that \\(n\\)?",
        steps: [
          "Identify the parts at \\(n = 7\\): antecedent '7 is divisible by 4' is F; consequent '7 is divisible by 2' is F.",
          "The row is \\(F \\to F\\).",
          "A conditional with a false antecedent is true regardless of the consequent.",
        ],
        answer: "True — vacuously, because 7 is not divisible by 4 in the first place.",
      },
      practiceSet: [
        {
          prompt: "Truth value of \\(F \\to T\\)?",
          answer: "T",
          method: "False antecedent, so vacuously true.",
        },
        {
          prompt: "Truth value of \\(F \\to F\\)?",
          answer: "T",
          method: "Still a false antecedent; only \\(T \\to F\\) fails.",
        },
        {
          prompt: "Truth value of \\(T \\to F\\)?",
          answer: "F",
          method: "The single failing row of the conditional.",
        },
        {
          prompt: "Rewrite \\(p \\to q\\) using only \\(\\sim\\) and \\(\\vee\\).",
          answer: "\\(\\sim p \\vee q\\)",
          method: "The conditional law — the workhorse rewrite of this chapter.",
        },
      ],
      pyqExampleId: "14597045-1163-4665-b312-ce8602ca064f",
      traps: [
        {
          title: "Calling a conditional false because its parts are false",
          body:
            "'If 3 + 2 = 7, then the earth is flat' has a false antecedent AND a false consequent, and the whole statement is **true**. " +
            "Students reject it because both halves are nonsense. Only the \\(T \\to F\\) pattern makes a conditional false — check the PATTERN, not the plausibility.",
        },
        {
          title: "Chained stems that hide a false antecedent",
          body:
            "A recurring MHT-CET stem gives statements (A) and (B), then (C) = 'If both (A) and (B) are true, then …'. " +
            "If either (A) or (B) is false, (C)'s antecedent is false and **(C) is automatically true** — however absurd its consequent. " +
            "Evaluate (A) and (B) first; the answer to (C) usually falls out with no work at all.",
        },
      ],
    },

    // 4 — substitution: evaluating a pattern from given truth values
    {
      kind: "formula" as const,
      slug: "mlog-evaluating-statement-patterns",
      name: "Evaluating a Statement Pattern from Given Truth Values",
      intuition:
        "When the question hands you the truth values of p, q and r, you are not building a table at all — you are substituting numbers into a formula. " +
        "Work strictly from the innermost bracket outwards and write the value above each piece as you go.",
      definition:
        "To evaluate a compound statement for one fixed assignment of truth values:\n" +
        "- Replace every letter by its given value.\n" +
        "- Resolve every \\(\\sim\\) first, then work **outwards from the innermost bracket**.\n" +
        "- Apply one connective at a time, writing the intermediate value down rather than holding it in your head.\n" +
        "A single assignment gives one row, not a table — no other row can change the answer.",
      authoredExample: {
        prompt:
          "If \\(p\\) is true, \\(q\\) is false and \\(r\\) is true, find the truth value of \\([\\,(p \\wedge \\sim q) \\vee r\\,] \\to (q \\wedge r)\\).",
        steps: [
          "Substitute: \\(p = T,\\; q = F,\\; r = T\\).",
          "Innermost negation: \\(\\sim q = \\sim F = T\\).",
          "Antecedent, inner bracket first: \\(p \\wedge \\sim q = T \\wedge T = T\\); then \\(T \\vee r = T \\vee T = T\\).",
          "Consequent: \\(q \\wedge r = F \\wedge T = F\\).",
          "Whole statement: \\(T \\to F\\), which is the one false row of a conditional.",
        ],
        answer: "The statement pattern is **false** for this assignment.",
      },
      selfCheckExample: {
        prompt:
          "If \\(p\\) and \\(q\\) are true and \\(r\\) and \\(s\\) are false, find the truth value of \\(\\sim(p \\wedge \\sim r) \\vee (s \\vee r)\\).",
        steps: [
          "Substitute \\(p = T,\\; q = T,\\; r = F,\\; s = F\\).",
          "\\(\\sim r = T\\), so \\(p \\wedge \\sim r = T \\wedge T = T\\).",
          "Negate it: \\(\\sim(p \\wedge \\sim r) = \\sim T = F\\).",
          "Right side: \\(s \\vee r = F \\vee F = F\\).",
          "Whole: \\(F \\vee F = F\\).",
        ],
        answer: "\\(F\\)",
      },
      practiceSet: [
        {
          prompt: "With \\(p = T,\\; q = F\\), evaluate \\(\\sim p \\vee q\\).",
          answer: "\\(F\\)",
          method: "\\(\\sim T \\vee F = F \\vee F = F\\).",
        },
        {
          prompt: "With \\(p = F,\\; q = T\\), evaluate \\(p \\to q\\).",
          answer: "\\(T\\)",
          method: "False antecedent, so vacuously true.",
        },
        {
          prompt: "With \\(p = T,\\; q = T,\\; r = F\\), evaluate \\((p \\wedge q) \\vee r\\).",
          answer: "\\(T\\)",
          method: "\\((T \\wedge T) \\vee F = T \\vee F = T\\).",
        },
        {
          prompt: "With \\(p = F,\\; q = F\\), evaluate \\(p \\leftrightarrow q\\).",
          answer: "\\(T\\)",
          method: "A biconditional is true when both sides match, including both false.",
        },
      ],
      pyqExampleId: "1658698e-51c8-47bc-bb98-98f619d5c47d",
      traps: [
        {
          title: "Resolving the negation last instead of first",
          body:
            "\\(\\sim(p \\wedge q)\\) and \\(\\sim p \\wedge q\\) are different statements. The tilde binds only as far as its bracket reaches, " +
            "so decide what the \\(\\sim\\) is sitting on BEFORE you substitute anything.",
        },
      ],
    },

    // 5 — building the full table
    {
      kind: "formula" as const,
      slug: "mlog-building-the-truth-table",
      name: "Building the Full Truth Table",
      intuition:
        "When no truth values are given, you must check every possibility. Two letters need 4 rows, three letters need 8 — and the standard row order " +
        "(TT, TF, FT, FF) matters, because MHT-CET options are given as a last column like 'TFTF' and you have to match them position by position.",
      definition:
        "A statement pattern in \\(n\\) distinct letters needs \\(2^{n}\\) rows.\n" +
        "- Fill the input columns in the **standard order**: for two letters, \\(TT,\\,TF,\\,FT,\\,FF\\).\n" +
        "- Add one column per intermediate piece, working from the innermost bracket outwards.\n" +
        "- The **last column** is the statement's truth value in each row, and it is what the options quote.",
      formula: {
        label: "Number of rows in a truth table",
        latex: "\\text{rows} = 2^{n} \\qquad n = 2 \\Rightarrow 4 \\text{ rows}, \\qquad n = 3 \\Rightarrow 8 \\text{ rows}",
        symbols: [
          { symbol: "n", meaning: "the number of DISTINCT statement letters, not the number of connectives" },
        ],
      },
      authoredExample: {
        prompt: "Construct the truth table for \\((p \\vee q) \\to p\\) and write its last column.",
        steps: [
          "Two letters, so \\(2^2 = 4\\) rows in the order \\(TT,\\, TF,\\, FT,\\, FF\\).",
          "Row \\(T,T\\): \\(p \\vee q = T\\); then \\(T \\to T = T\\).",
          "Row \\(T,F\\): \\(p \\vee q = T\\); then \\(T \\to T = T\\) (the consequent is \\(p = T\\)).",
          "Row \\(F,T\\): \\(p \\vee q = T\\); then \\(T \\to F = F\\).",
          "Row \\(F,F\\): \\(p \\vee q = F\\); then \\(F \\to F = T\\).",
        ],
        answer: "Last column: \\(T,\\,T,\\,F,\\,T\\) — true in three rows and false in one. The next concept names that pattern.",
      },
      selfCheckExample: {
        prompt: "Construct the truth table for \\(\\sim p \\vee q\\) and write its last column.",
        steps: [
          "Four rows in the order \\(TT,\\, TF,\\, FT,\\, FF\\).",
          "Row \\(T,T\\): \\(\\sim p = F\\), so \\(F \\vee T = T\\).",
          "Row \\(T,F\\): \\(\\sim p = F\\), so \\(F \\vee F = F\\).",
          "Row \\(F,T\\): \\(\\sim p = T\\), so \\(T \\vee T = T\\).",
          "Row \\(F,F\\): \\(\\sim p = T\\), so \\(T \\vee F = T\\).",
        ],
        answer:
          "Last column \\(T,\\,F,\\,T,\\,T\\) — identical to \\(p \\to q\\), which is exactly the conditional law.",
      },
      practiceSet: [
        {
          prompt: "How many rows does a truth table in \\(p, q, r\\) need?",
          answer: "8",
          method: "\\(2^{3} = 8\\).",
        },
        {
          prompt: "How many rows does \\((p \\wedge q) \\vee (\\sim p \\wedge q)\\) need?",
          answer: "4",
          method: "Only two DISTINCT letters appear, so \\(2^{2} = 4\\) — the count of connectives is irrelevant.",
        },
        {
          prompt: "Write the last column of \\(p \\wedge \\sim p\\).",
          answer: "\\(F,\\,F\\)",
          method: "A statement and its negation can never both hold.",
        },
        {
          prompt: "Write the last column of \\(p \\vee \\sim p\\).",
          answer: "\\(T,\\,T\\)",
          method: "One of the two must hold in every row.",
        },
      ],
      pyqExampleId: "f30d6805-2256-478b-af91-6391ff446379",
      traps: [
        {
          title: "Counting connectives instead of letters",
          body:
            "The row count is \\(2^{n}\\) where \\(n\\) is the number of DISTINCT letters. " +
            "\\([p \\to (q \\wedge \\sim p)] \\vee [(p \\vee \\sim q) \\wedge p]\\) has six connectives and only two letters, so it needs 4 rows, not 64.",
        },
        {
          title: "Matching the last column in the wrong row order",
          body:
            "Options are quoted as a bare string like 'TTFT'. That only matches your table if you filled the input columns in the standard " +
            "\\(TT,\\,TF,\\,FT,\\,FF\\) order. Writing the rows in a different order gives a correct table and the wrong option.",
        },
      ],
    },

    // 6 — the vocabulary the WHOLE chapter runs on. Added 2026-09-20: `\equiv`
    // was used 40 times, "tautology" 3 times and "contingency" once before any
    // of them was defined, because all three lived in Logical Equivalence
    // (subtopic 5). They are READINGS OF THE LAST COLUMN, which the previous
    // concept has just taught how to build — so this is where they belong.
    // Subtopic 5 still teaches equivalence properly; it now deepens a term the
    // reader already has instead of introducing one they have been using for
    // three blocks. See [[notes-teaching-arc-forward-reference]].
    {
      kind: "reference" as const,
      slug: "mlog-reading-the-last-column",
      name: "Reading the Last Column: Equivalence, Tautology, Contradiction, Contingency",
      intuition:
        "You now know how to build the table. Everything the rest of this chapter asks you to do is a question about its LAST COLUMN — " +
        "is it all T, all F, mixed, or the same as some other pattern's last column? Those four readings have names, and they are used constantly from here on.",
      definition:
        "Four readings of one column, and one symbol:\n" +
        "- A **tautology** is true in every row.\n" +
        "- A **contradiction** is false in every row.\n" +
        "- A **contingency** is neither — at least one T and at least one F.\n" +
        "- Two patterns are **logically equivalent**, written \\(A \\equiv B\\), when their last columns match **row for row**.\n" +
        "The symbol \\(\\equiv\\) is not a connective and never appears inside a statement: \\(\\leftrightarrow\\) is evaluated row by row and produces a column, while \\(\\equiv\\) is a claim ABOUT two finished columns. " +
        "The two are linked — \\(A \\equiv B\\) exactly when \\(A \\leftrightarrow B\\) is a tautology.",
      table: {
        columns: ["Reading", "Last column looks like", "Example"],
        rows: [
          {
            cells: ["Tautology", "All T", "\\(p \\vee \\sim p\\)"],
          },
          {
            cells: ["Contradiction", "All F", "\\(p \\wedge \\sim p\\)"],
          },
          {
            cells: ["Contingency", "Mixed — some T, some F", "\\(p \\vee q\\)"],
            noteAmber:
              "The default case. Most statement patterns are contingencies; the exam asks you to spot the ones that are not.",
          },
          {
            cells: [
              "Logically equivalent \\(A \\equiv B\\)",
              "Two patterns whose columns match in EVERY row",
              "\\(p \\to q\\) and \\(\\sim p \\vee q\\)",
            ],
            noteAmber:
              "ONE disagreeing row destroys equivalence; agreeing in one row proves nothing. The asymmetry is the whole test.",
          },
        ],
        caption:
          "Every 'which of the following is a tautology / is equivalent to' question on this paper is one of these four readings. Subtopic 5 gives you the algebra that reaches them without writing the table out.",
      },
      selfCheckExample: {
        prompt:
          "Build the last column of \\(p \\vee \\sim p\\) and of \\(p \\wedge \\sim p\\), and classify each.",
        steps: [
          "Two rows suffice, since only \\(p\\) appears: \\(p = T\\) and \\(p = F\\).",
          "\\(p \\vee \\sim p\\): row \\(T\\) gives \\(T \\vee F = T\\); row \\(F\\) gives \\(F \\vee T = T\\). Column is \\(T,\\,T\\).",
          "\\(p \\wedge \\sim p\\): row \\(T\\) gives \\(T \\wedge F = F\\); row \\(F\\) gives \\(F \\wedge T = F\\). Column is \\(F,\\,F\\).",
          "All T is a tautology; all F is a contradiction.",
        ],
        answer:
          "\\(p \\vee \\sim p\\) is a **tautology**; \\(p \\wedge \\sim p\\) is a **contradiction**.",
      },
      practiceSet: [
        {
          prompt: "A pattern whose last column is \\(T,\\,T,\\,T,\\,T\\) is called what?",
          answer: "A tautology.",
          method: "True in every row.",
        },
        {
          prompt: "A pattern whose last column is \\(T,\\,F,\\,T,\\,T\\) is called what?",
          answer: "A contingency.",
          method: "It mixes T and F, so it is neither a tautology nor a contradiction.",
        },
        {
          prompt: "How many disagreeing rows are needed to show that \\(A\\) and \\(B\\) are NOT equivalent?",
          answer: "One.",
          method: "Equivalence is a claim about every row, so a single counterexample breaks it.",
        },
        {
          prompt: "Is \\(\\equiv\\) a connective you can write inside a statement?",
          answer: "No.",
          method:
            "\\(\\leftrightarrow\\) is the connective and produces a column; \\(\\equiv\\) is a claim about two finished columns.",
        },
      ],
      // No featured PYQ and no drill tags, DELIBERATELY — notes-lint's "0 tagged
      // questions" WARN on this concept is correct-by-design, not a missed
      // tagging session. This concept teaches VOCABULARY that the bank tests
      // inside the Logical Equivalence subtopic, where those questions are
      // filed and already tagged (`mlog-tautology-contradiction-contingency`,
      // 4 rows). Re-tagging them here would surface Logical-Equivalence
      // questions as drills on a Statements page and break the subtopic
      // constraint. The one Statements-subtopic question that mentions a last
      // column (f30d6805) is already the featured PYQ of the preceding concept.
      // Same reasoning as the dual concept in subtopic 5.
      traps: [
        {
          title: "Reading \\(\\equiv\\) as another name for \\(\\leftrightarrow\\)",
          body:
            "They are different kinds of object. \\(p \\leftrightarrow q\\) is a statement pattern with its own truth table, true in some rows and false in others. " +
            "\\(A \\equiv B\\) is a verdict on two whole tables, and it is either right or wrong — it has no rows. " +
            "The bridge between them is that \\(A \\equiv B\\) holds exactly when the pattern \\(A \\leftrightarrow B\\) is a tautology.",
        },
      ],
    },

    // 7 — the feature that makes this subtopic 38% HARD
    {
      kind: "formula" as const,
      slug: "mlog-truth-value-of-a-mathematical-claim",
      name: "Settling the Truth Value of a Mathematical Claim",
      intuition:
        "Some MHT-CET stems make p, q and r be mathematical assertions from other chapters — direction cosines, cube roots of unity, binomial sums, matrix algebra. " +
        "The logic in these questions is trivial. The entire difficulty is deciding whether each claim is true before you touch a connective.",
      definition:
        "For stems of the form 'p: <some mathematical claim>, q: <another> … which of the following is correct?':\n" +
        "- Settle each letter's truth value **independently and first**, using the relevant chapter's own facts.\n" +
        "- Write T or F beside each letter before reading the options.\n" +
        "- Only then substitute into the options, which is ordinary one-row evaluation.\n" +
        "A single misjudged claim flips the whole answer, so this is where the marks are actually lost.",
      authoredExample: {
        prompt:
          "Let p: the sum of the cube roots of unity is 1. Let q: \\(\\sqrt{2}\\) is irrational. Find the truth value of \\((\\sim p) \\wedge q\\).",
        steps: [
          "Settle p. The cube roots of unity are \\(1, \\omega, \\omega^{2}\\) and \\(1 + \\omega + \\omega^{2} = 0\\), not 1. So \\(p = F\\).",
          "Settle q. \\(\\sqrt{2}\\) is irrational, a standard result. So \\(q = T\\).",
          "Now the logic: \\(\\sim p = \\sim F = T\\).",
          "Combine: \\((\\sim p) \\wedge q = T \\wedge T = T\\).",
        ],
        answer: "\\(T\\) — and note that every ounce of the work was in settling p.",
      },
      selfCheckExample: {
        prompt:
          "Let p: for all \\(n \\in \\mathbb{N}\\), \\(n^{2} + n\\) is even. Let q: for all \\(n \\in \\mathbb{N}\\), \\(n^{2} - n\\) is odd. Find the truth values of \\(p \\wedge q\\) and \\(p \\vee q\\).",
        steps: [
          "\\(n^{2} + n = n(n+1)\\) is a product of two consecutive integers, so one of them is even and the product is always even. \\(p = T\\).",
          "\\(n^{2} - n = n(n-1)\\) is also a product of two consecutive integers, so it is always EVEN, never odd. \\(q = F\\).",
          "\\(p \\wedge q = T \\wedge F = F\\).",
          "\\(p \\vee q = T \\vee F = T\\).",
        ],
        answer: "\\(p \\wedge q = F\\) and \\(p \\vee q = T\\).",
      },
      practiceSet: [
        {
          prompt: "Truth value of 'there are 25 prime numbers below 100'?",
          answer: "T",
          method: "There are exactly 25. A stem claiming 26 is false — this exact off-by-one has been set.",
        },
        {
          prompt: "Truth value of '\\(\\frac{2}{\\sqrt3}, \\frac{-2}{\\sqrt3}, \\frac{-1}{\\sqrt3}\\) are direction cosines'?",
          answer: "F",
          method: "Squares must sum to 1; here \\(\\frac{4+4+1}{3} = 3 \\neq 1\\).",
        },
        {
          prompt: "Truth value of '\\({}^{8}C_1 + {}^{8}C_2 + \\cdots + {}^{8}C_8 = 256\\)'?",
          answer: "F",
          method: "The sum from \\(r = 1\\) omits \\({}^{8}C_0\\), giving \\(2^{8} - 1 = 255\\).",
        },
        {
          prompt: "Truth value of '\\(A^{2} - B^{2} = (A-B)(A+B)\\) for matrices with \\(AB \\neq BA\\)'?",
          answer: "F",
          method: "Expanding gives \\(A^2 + AB - BA - B^2\\), and \\(AB - BA \\neq O\\) here.",
        },
      ],
      pyqExampleId: "cae180cc-a2b3-4192-b526-5f7c09490e07",
      traps: [
        {
          title: "Doing the logic correctly on a misjudged claim",
          body:
            "These questions are graded on the mathematics, not the logic. If you record 'there are 26 primes below 100' as true, " +
            "every connective afterwards is applied flawlessly to the wrong input and the answer is wrong. Settle each letter before reading the options.",
        },
        {
          title: "Assuming a 'for all' claim is true because it works for small n",
          body:
            "A universally quantified claim fails on ONE counterexample. '\\(10n - 3\\) is prime whenever \\(n\\) is not divisible by 3' survives \\(n = 1, 2, 4\\) " +
            "and dies at \\(n = 8\\), where \\(77 = 7 \\times 11\\). Hunt for the counterexample rather than confirming the pattern.",
        },
      ],
    },
  ],
  related: [
    { label: "Next: Finding truth values of component statements", href: "/notes/mht-cet-maths/mathematical-logic/finding-truth-values" },
    { label: "Mathematical Logic playbook", href: "/guide/mht-cet-maths/playbooks/mathematical-logic" },
    { label: "MHT-CET Maths strategy", href: "/guide/mht-cet-maths/strategy" },
  ],
};

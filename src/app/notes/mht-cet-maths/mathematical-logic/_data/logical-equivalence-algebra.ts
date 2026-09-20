import type { SubtopicNote } from "@/app/notes/_types";

export const LOGICAL_EQUIVALENCE_ALGEBRA_NOTE: SubtopicNote = {
  subtopicName: "Logical Equivalence and Algebra of Statements",
  title: "Logical Equivalence and Algebra of Statements",
  oneLineDefinition:
    "A short list of named laws lets you reach the answer to an equivalence question by algebra instead of by building the whole truth table.",
  whyItMatters:
    "16 PYQs sit here at 31% HARD, and this is the subtopic that decides how long the rest of the chapter takes you. " +
    "You already know what equivalence MEANS — the first block defined it as two matching last columns. What is new here is the shortcut: " +
    "an eight-row table always works but is slow and error-prone, while three lines of algebra reach the same verdict. " +
    "The table is the method that always terminates; the algebra is the method that is fast. Build the table when the pattern is small, when the algebra stalls, " +
    "or when the question hands you the truth values outright — reach for the laws when there are three letters and an arrow to clear. " +
    "The same laws then do the work in Switching Circuits, so the time spent here is paid back twice.",
  concepts: [
    // 1 — what equivalence means
    {
      kind: "formula" as const,
      slug: "mlog-logical-equivalence-defined",
      name: "Why Equivalence Licenses Substitution",
      intuition:
        "You met \\(A \\equiv B\\) in the first block as a reading of the last column: two patterns whose columns match row for row. " +
        "What this block adds is the consequence — because they can never disagree, one may be SWAPPED for the other anywhere, and that permission is what makes every simplification below legal.",
      definition:
        "Recall \\(A \\equiv B\\): \\(A\\) and \\(B\\) have the **same truth value in every row**, equivalently \\(A \\leftrightarrow B\\) is a **tautology**.\n" +
        "- **The substitution licence.** Equivalent statements may replace each other inside any larger pattern without changing its truth value. Every law in the table below is used this way.\n" +
        "- **The asymmetry.** To DISPROVE equivalence you need only ONE row where they differ; to ESTABLISH it you need every row, or an algebraic derivation that stands in for every row.\n" +
        "- This is why the algebra exists at all: each law is a pre-proved equivalence you may apply without re-deriving its table.",
      formula: {
        label: "Equivalence and its test",
        latex:
          "A \\equiv B \\iff (A \\leftrightarrow B) \\text{ is a tautology} \\iff A \\text{ and } B \\text{ share every row}",
        symbols: [
          { symbol: "\\(\\equiv\\)", meaning: "logically equivalent — a claim about all rows" },
          { symbol: "\\(\\leftrightarrow\\)", meaning: "a connective, evaluated row by row" },
        ],
      },
      authoredExample: {
        prompt: "Show that \\(p \\to q\\) and \\(\\sim p \\vee q\\) are logically equivalent.",
        steps: [
          "Two letters, so four rows in the standard order \\(TT,\\, TF,\\, FT,\\, FF\\).",
          "\\(p \\to q\\) gives \\(T,\\; F,\\; T,\\; T\\) — false only in the \\(T,F\\) row.",
          "\\(\\sim p \\vee q\\): in row \\(T,T\\), \\(F \\vee T = T\\); row \\(T,F\\), \\(F \\vee F = F\\); row \\(F,T\\), \\(T \\vee T = T\\); row \\(F,F\\), \\(T \\vee F = T\\).",
          "The columns are \\(T,\\;F,\\;T,\\;T\\) in both cases.",
        ],
        answer:
          "The last columns match in all four rows, so \\(p \\to q \\equiv \\;\\sim p \\vee q\\) — the conditional law.",
      },
      selfCheckExample: {
        prompt:
          "Are \\(p \\to q\\) and \\(q \\to p\\) logically equivalent? Justify with a single row.",
        steps: [
          "To disprove equivalence, one disagreeing row is enough — no full table needed.",
          "Take \\(p = F\\) and \\(q = T\\).",
          "\\(p \\to q = F \\to T = T\\).",
          "\\(q \\to p = T \\to F = F\\).",
        ],
        answer:
          "Not equivalent — they differ in the row \\(p = F,\\; q = T\\).",
      },
      practiceSet: [
        {
          prompt: "How many disagreeing rows are needed to disprove equivalence?",
          answer: "One.",
          method: "Equivalence is a claim about every row, so a single counterexample breaks it.",
        },
        {
          prompt: "If \\(A \\leftrightarrow B\\) is a tautology, what follows?",
          answer: "\\(A \\equiv B\\).",
          method: "The biconditional is true in every row exactly when the columns match.",
        },
        {
          prompt: "Is \\(p \\wedge q \\equiv q \\wedge p\\)?",
          answer: "Yes.",
          method: "Conjunction is commutative.",
        },
        {
          prompt: "Is \\(\\sim(p \\wedge q) \\equiv \\;\\sim p \\wedge \\sim q\\)?",
          answer: "No.",
          method: "De Morgan flips the connective; the right side is \\(\\sim(p \\vee q)\\).",
        },
      ],
      pyqExampleId: "920c05ef-19b7-4597-b7c8-bb53786973dd",
      traps: [
        {
          title: "Checking one row and declaring equivalence",
          body:
            "Agreeing in a row proves nothing; equivalence needs EVERY row. The asymmetry is worth holding onto: " +
            "one row can disprove equivalence but never establish it.",
        },
      ],
    },

    // 2 — the law table
    {
      kind: "reference" as const,
      slug: "mlog-algebra-of-statements-laws",
      name: "The Algebra of Statements",
      intuition:
        "These laws are the ordinary algebra of numbers with AND behaving like multiplication and OR like addition — " +
        "except that distribution works both ways round here, which ordinary arithmetic does not allow.",
      definition:
        "The full working list, gathered in one place. **T** denotes a tautology and **F** a contradiction:\n" +
        "- **Three of these you have already met as concepts in their own right** — De Morgan and the negation of a conditional in Negation of Statements, and the conditional law itself back in the first block. They are repeated here because simplification uses them as ALGEBRA, one rewrite among ten, rather than as rules for negating.\n" +
        "- The two that do the most work are **complement** and **distributive**.\n" +
        "- The **conditional law** is what lets you remove an arrow so the others can apply.\n" +
        "- **Absorption** is the one students most often fail to spot, and it collapses a whole bracket in one move.",
      table: {
        columns: ["Law", "With AND", "With OR"],
        rows: [
          {
            cells: [
              "Commutative",
              "\\(p \\wedge q \\equiv q \\wedge p\\)",
              "\\(p \\vee q \\equiv q \\vee p\\)",
            ],
          },
          {
            cells: [
              "Associative",
              "\\((p \\wedge q) \\wedge r \\equiv p \\wedge (q \\wedge r)\\)",
              "\\((p \\vee q) \\vee r \\equiv p \\vee (q \\vee r)\\)",
            ],
          },
          {
            cells: [
              "Distributive",
              "\\(p \\wedge (q \\vee r) \\equiv (p \\wedge q) \\vee (p \\wedge r)\\)",
              "\\(p \\vee (q \\wedge r) \\equiv (p \\vee q) \\wedge (p \\vee r)\\)",
            ],
            noteAmber:
              "Both directions are legal here, unlike ordinary arithmetic where only one distribution holds.",
          },
          {
            cells: [
              "Identity",
              "\\(p \\wedge T \\equiv p\\)",
              "\\(p \\vee F \\equiv p\\)",
            ],
          },
          {
            cells: [
              "Domination",
              "\\(p \\wedge F \\equiv F\\)",
              "\\(p \\vee T \\equiv T\\)",
            ],
          },
          {
            cells: [
              "Complement",
              "\\(p \\wedge \\sim p \\equiv F\\)",
              "\\(p \\vee \\sim p \\equiv T\\)",
            ],
            noteAmber:
              "The engine of most simplifications: spot a letter meeting its own negation and a whole branch collapses to F or T.",
          },
          {
            cells: [
              "Idempotent",
              "\\(p \\wedge p \\equiv p\\)",
              "\\(p \\vee p \\equiv p\\)",
            ],
          },
          {
            cells: [
              "Absorption",
              "\\(p \\wedge (p \\vee q) \\equiv p\\)",
              "\\(p \\vee (p \\wedge q) \\equiv p\\)",
            ],
            noteAmber:
              "The whole bracket vanishes. Worth memorising by shape: a letter outside meeting itself inside swallows the rest.",
          },
          {
            cells: [
              "De Morgan",
              "\\(\\sim(p \\wedge q) \\equiv \\;\\sim p \\vee \\sim q\\)",
              "\\(\\sim(p \\vee q) \\equiv \\;\\sim p \\wedge \\sim q\\)",
            ],
          },
          {
            cells: [
              "Conditional",
              "\\(\\sim(p \\to q) \\equiv p \\wedge \\sim q\\)",
              "\\(p \\to q \\equiv \\;\\sim p \\vee q\\)",
            ],
            noteAmber:
              "Always apply this first. The other laws cannot see through an arrow.",
          },
        ],
        caption:
          "Ten laws cover every simplification the paper sets. Complement, distributive and absorption account for most of the work.",
      },
      selfCheckExample: {
        prompt: "Simplify \\(p \\vee (p \\wedge q)\\) using a named law, then verify it in one row.",
        steps: [
          "The shape is a letter outside a bracket meeting itself inside, joined the other way round — this is absorption.",
          "Absorption gives \\(p \\vee (p \\wedge q) \\equiv p\\).",
          "Verify with \\(p = F,\\; q = T\\): left side is \\(F \\vee (F \\wedge T) = F \\vee F = F\\); right side is \\(F\\). They agree.",
          "Verify with \\(p = T,\\; q = F\\): left is \\(T \\vee F = T\\); right is \\(T\\). They agree.",
        ],
        answer: "\\(p\\)",
      },
      practiceSet: [
        {
          prompt: "Simplify \\(p \\wedge \\sim p\\).",
          answer: "\\(F\\)",
          method: "Complement law.",
        },
        {
          prompt: "Simplify \\(p \\vee T\\).",
          answer: "\\(T\\)",
          method: "Domination law.",
        },
        {
          prompt: "Simplify \\(p \\wedge (p \\vee q)\\).",
          answer: "\\(p\\)",
          method: "Absorption.",
        },
        {
          prompt: "Rewrite \\(p \\to q\\) without an arrow.",
          answer: "\\(\\sim p \\vee q\\)",
          method: "Conditional law.",
        },
      ],
      pyqExampleId: "ef2d8533-5930-405e-8dec-b698e4b5e50c",
      traps: [
        {
          title: "Distributing only one way",
          body:
            "In logic, OR distributes over AND as well: \\(p \\vee (q \\wedge r) \\equiv (p \\vee q) \\wedge (p \\vee r)\\). " +
            "Students trained on ordinary algebra expect only \\(p \\wedge (q \\vee r)\\) to expand and miss the other half.",
        },
      ],
    },

    // 3 — simplification in practice
    {
      kind: "formula" as const,
      slug: "mlog-simplifying-a-statement-pattern",
      name: "Simplifying a Statement Pattern",
      intuition:
        "There is a reliable order: clear the arrows, push the negations in, then look for a letter meeting its own negation. " +
        "Almost every 'is equivalent to' question on this paper collapses within three or four lines if you work in that order.",
      definition:
        "The standard simplification order:\n" +
        "- **Clear arrows** with the conditional law, so only \\(\\sim, \\wedge, \\vee\\) remain.\n" +
        "- **Push negations inwards** with De Morgan, cancelling double negations as they appear.\n" +
        "- **Distribute or factor** to bring like letters together.\n" +
        "- **Collapse** with complement, absorption, identity and domination.\n" +
        "Stop as soon as the expression matches an option — you do not have to reach the simplest possible form.",
      authoredExample: {
        prompt: "Simplify \\([p \\wedge (q \\vee r)] \\vee [\\sim r \\wedge \\sim q \\wedge p]\\).",
        steps: [
          "There are no arrows, so start by tidying the second bracket. By De Morgan, \\(\\sim r \\wedge \\sim q \\equiv \\;\\sim(q \\vee r)\\).",
          "So the expression is \\([p \\wedge (q \\vee r)] \\vee [p \\wedge \\sim(q \\vee r)]\\).",
          "Both brackets share the factor \\(p\\). Factor it out: \\(p \\wedge [(q \\vee r) \\vee \\sim(q \\vee r)]\\).",
          "The inner bracket is a statement joined to its own negation by OR, which is a tautology by the complement law: it equals \\(T\\).",
          "Finally \\(p \\wedge T \\equiv p\\) by the identity law.",
        ],
        answer: "\\(p\\)",
      },
      selfCheckExample: {
        prompt: "Simplify \\((\\sim p \\wedge q) \\vee (\\sim p \\wedge \\sim q) \\vee (p \\wedge \\sim q)\\).",
        steps: [
          "The first two terms share \\(\\sim p\\). Factor: \\(\\sim p \\wedge (q \\vee \\sim q)\\).",
          "By complement \\(q \\vee \\sim q \\equiv T\\), so that pair becomes \\(\\sim p \\wedge T \\equiv \\;\\sim p\\).",
          "The expression is now \\(\\sim p \\vee (p \\wedge \\sim q)\\).",
          "Distribute: \\((\\sim p \\vee p) \\wedge (\\sim p \\vee \\sim q) \\equiv T \\wedge (\\sim p \\vee \\sim q)\\).",
          "Identity law leaves \\(\\sim p \\vee \\sim q\\), which by De Morgan is \\(\\sim(p \\wedge q)\\).",
        ],
        answer: "\\(\\sim p \\vee \\sim q\\), equivalently \\(\\sim(p \\wedge q)\\).",
      },
      practiceSet: [
        {
          prompt: "Simplify \\((p \\wedge q) \\vee (p \\wedge \\sim q)\\).",
          answer: "\\(p\\)",
          method: "Factor \\(p\\); the bracket \\(q \\vee \\sim q\\) is T.",
        },
        {
          prompt: "Simplify \\(\\sim(\\sim p \\vee q)\\).",
          answer: "\\(p \\wedge \\sim q\\)",
          method: "De Morgan, then cancel the double negation.",
        },
        {
          prompt: "Simplify \\(p \\to \\sim(p \\wedge \\sim q)\\).",
          answer: "\\(\\sim p \\vee q\\)",
          method: "Clear the arrow, apply De Morgan, then absorb the repeated \\(\\sim p\\).",
        },
        {
          prompt: "Simplify \\(q \\wedge (\\sim q \\vee r)\\).",
          answer: "\\(q \\wedge r\\)",
          method: "Distribute; \\(q \\wedge \\sim q\\) is F and drops out.",
        },
      ],
      pyqExampleId: "38b78aea-5688-4c1b-a600-eb3faca9e5b7",
      traps: [
        {
          title: "Simplifying around an arrow instead of clearing it",
          body:
            "De Morgan, distribution and absorption are stated for \\(\\wedge\\) and \\(\\vee\\) only. " +
            "Leaving a \\(\\to\\) in place and trying to distribute across it produces confident nonsense. Clear every arrow first.",
        },
      ],
    },

    // 4 — classification
    {
      kind: "formula" as const,
      slug: "mlog-tautology-contradiction-contingency",
      name: "Classifying a Pattern Without Building Its Table",
      intuition:
        "The three classifications were defined in the first block as readings of the last column. The point here is that you rarely need the column: " +
        "simplify with the laws and watch what falls out — a bare \\(T\\), a bare \\(F\\), or something still carrying a letter.",
      definition:
        "The classification is unchanged; what changes is how you reach it:\n" +
        "- A **tautology** simplifies to \\(T\\) — no letters survive.\n" +
        "- A **contradiction** simplifies to \\(F\\) — likewise.\n" +
        "- A **contingency** simplifies to something that **still contains a letter**, which is the tell: if a letter survives, the value must depend on it, so the column cannot be constant.\n" +
        "That last line is the whole shortcut. You do not need to find the rows that differ — you only need to see that a letter is left.",
      formula: {
        label: "Classification by last column",
        latex:
          "\\text{tautology} \\Rightarrow \\text{all } T \\qquad \\text{contradiction} \\Rightarrow \\text{all } F \\qquad \\text{contingency} \\Rightarrow \\text{mixed}",
        symbols: [
          { symbol: "\\(p \\vee \\sim p\\)", meaning: "the standard tautology" },
          { symbol: "\\(p \\wedge \\sim p\\)", meaning: "the standard contradiction" },
        ],
      },
      authoredExample: {
        prompt:
          "Classify \\((p \\wedge \\sim q) \\wedge (\\sim p \\wedge q)\\) as a tautology, contradiction or contingency.",
        steps: [
          "Everything is joined by AND, so the order may be rearranged freely by the commutative and associative laws.",
          "Group the like letters: \\((p \\wedge \\sim p) \\wedge (q \\wedge \\sim q)\\).",
          "Each bracket is a letter meeting its own negation, so each is \\(F\\) by the complement law.",
          "The whole expression is \\(F \\wedge F = F\\), in every row.",
        ],
        answer: "A contradiction.",
      },
      selfCheckExample: {
        prompt: "Classify \\([p \\to (q \\to r)] \\leftrightarrow [(p \\wedge q) \\to r]\\).",
        steps: [
          "Clear the arrows on the left: \\(q \\to r \\equiv \\;\\sim q \\vee r\\), so \\(p \\to (\\sim q \\vee r) \\equiv \\;\\sim p \\vee \\sim q \\vee r\\).",
          "Now the right: \\((p \\wedge q) \\to r \\equiv \\;\\sim(p \\wedge q) \\vee r \\equiv (\\sim p \\vee \\sim q) \\vee r\\).",
          "Both sides are \\(\\sim p \\vee \\sim q \\vee r\\), so they are identical.",
          "A biconditional whose sides are identical is true in every row.",
        ],
        answer: "A tautology.",
      },
      practiceSet: [
        {
          prompt: "Classify \\(p \\vee \\sim p\\).",
          answer: "Tautology.",
          method: "Complement law gives T.",
        },
        {
          prompt: "Classify \\(p \\wedge \\sim p\\).",
          answer: "Contradiction.",
          method: "Complement law gives F.",
        },
        {
          prompt: "Classify \\(p \\vee q\\).",
          answer: "Contingency.",
          method: "True in three rows, false in one.",
        },
        {
          prompt: "Classify \\([p \\wedge (p \\to q)] \\to q\\).",
          answer: "Tautology.",
          method: "This is modus ponens; it never fails.",
        },
      ],
      pyqExampleId: "5206c5bd-f217-487d-a677-a75eaaaff4e3",
      traps: [
        {
          title: "Calling a contingency a tautology after checking two rows",
          body:
            "A pattern that comes out T in the rows you happened to try may still be F elsewhere. " +
            "Either simplify all the way to a bare \\(T\\), or check every row — a partial table cannot establish a tautology.",
        },
      ],
    },

    // 5 — the "find r" move, now adjacent to the classification it depends on
    {
      kind: "formula" as const,
      slug: "mlog-finding-r-for-a-tautology",
      name: "Finding the Statement That Makes a Pattern a Tautology",
      intuition:
        "A recurring stem says 'this pattern is a tautology — what must r be?'. Turn it round: a conditional is a tautology exactly when " +
        "its consequent is true in every row where the antecedent is. So simplify the antecedent first and read off what it forces.",
      definition:
        "For \\(X \\to r\\) to be a **tautology**, \\(r\\) must be true in every row where \\(X\\) is true.\n" +
        "- **Simplify \\(X\\) first** — it usually collapses to something small.\n" +
        "- Read off the rows where the simplified \\(X\\) holds.\n" +
        "- The answer is the option that is true in all of those rows; it need not be true everywhere else.\n" +
        "A useful simplification: \\((p \\to q) \\wedge \\sim q \\equiv \\;\\sim p \\wedge \\sim q\\), the modus tollens pattern.",
      formula: {
        label: "Tautology condition and modus tollens",
        latex:
          "(X \\to r) \\text{ is a tautology} \\iff X = T \\Rightarrow r = T \\qquad (p \\to q) \\wedge \\sim q \\equiv\\; \\sim p \\wedge \\sim q",
        symbols: [
          { symbol: "X", meaning: "the antecedent — simplify this before anything else" },
          { symbol: "r", meaning: "the statement being solved for" },
        ],
      },
      authoredExample: {
        prompt:
          "The statement pattern \\([(p \\to q) \\wedge \\sim q] \\to r\\) is a tautology. What must \\(r\\) be equivalent to?",
        steps: [
          "Simplify the antecedent. Clear the arrow: \\((\\sim p \\vee q) \\wedge \\sim q\\).",
          "Distribute: \\((\\sim p \\wedge \\sim q) \\vee (q \\wedge \\sim q)\\). The second bracket is \\(F\\) by complement.",
          "So the antecedent is \\(\\sim p \\wedge \\sim q\\) — true only in the single row \\(p = F,\\; q = F\\).",
          "For the whole conditional to be a tautology, \\(r\\) must be true in that one row. Both \\(\\sim p\\) and \\(\\sim q\\) qualify.",
          "The options decide between them; \\(\\sim q\\) is the one offered here.",
        ],
        answer: "\\(r \\equiv \\;\\sim q\\) (and \\(\\sim p\\) would serve equally on the logic alone).",
      },
      selfCheckExample: {
        prompt:
          "Given that \\(q\\) is false, show that \\((p \\wedge q) \\to (p \\vee r)\\) is a tautology for every \\(p\\) and \\(r\\).",
        steps: [
          "Simplify the antecedent with \\(q = F\\): \\(p \\wedge F \\equiv F\\) by the domination law.",
          "So the antecedent is false in every remaining row.",
          "A conditional with a false antecedent is true.",
          "Hence the pattern is true in every row, whatever \\(p\\) and \\(r\\) are.",
        ],
        answer:
          "It is a tautology, because the antecedent can never be true once \\(q\\) is false.",
      },
      practiceSet: [
        {
          prompt: "Simplify \\((p \\to q) \\wedge \\sim q\\).",
          answer: "\\(\\sim p \\wedge \\sim q\\)",
          method: "Modus tollens pattern.",
        },
        {
          prompt: "When is \\(X \\to r\\) a tautology?",
          answer: "When \\(r\\) is true in every row where \\(X\\) is true.",
          method: "The only failing row is \\(T \\to F\\).",
        },
        {
          prompt: "If the antecedent simplifies to \\(F\\), is \\(X \\to r\\) a tautology?",
          answer: "Yes, for every \\(r\\).",
          method: "A false antecedent makes the conditional vacuously true.",
        },
        {
          prompt: "If \\(X \\equiv \\;\\sim p \\wedge \\sim q\\), name an \\(r\\) making \\(X \\to r\\) a tautology.",
          answer: "\\(\\sim q\\) (or \\(\\sim p\\)).",
          method: "Both are true in the one row where \\(X\\) holds.",
        },
      ],
      pyqExampleId: "d1fd5c79-f273-49ed-b775-5e08d2fd3594",
      traps: [
        {
          title: "Looking for an r that is true everywhere",
          body:
            "\\(r\\) only has to hold in the rows where the ANTECEDENT is true — it may be false elsewhere without harming the tautology. " +
            "Hunting for a universally true \\(r\\) rules out the correct option, which is usually a plain \\(\\sim p\\) or \\(\\sim q\\).",
        },
      ],
    },
    // 6 — dual. MOVED here from position 5 on 2026-09-20: it used to sit
    //     BETWEEN the two tautology concepts, which are a coupled pair
    //     (classify by last column -> solve for the r that forces a tautology).
    //     Duals are also the chapter's thinnest content: exactly ONE bank
    //     question touches them (see the pyqExampleId note below), so the
    //     lowest-value concept was interrupting the only two-concept thread
    //     in the subtopic. It stays in the chapter because it is Std XII
    //     syllabus and the dual-vs-negation confusion is worth pre-empting.
    {
      kind: "formula" as const,
      slug: "mlog-dual-of-a-statement",
      name: "The Dual of a Statement Pattern",
      intuition:
        "The dual is a mechanical mirror: swap every AND with OR and every T with F, and leave the letters completely alone. " +
        "It looks like a negation at a glance, and that resemblance is exactly what the paper tests.",
      definition:
        "The **dual** of a statement pattern is obtained by interchanging:\n" +
        "- \\(\\wedge\\) with \\(\\vee\\), and\n" +
        "- \\(T\\) with \\(F\\).\n" +
        "The statement letters and every \\(\\sim\\) stay **exactly as they are**. A conditional must be written in \\(\\sim, \\wedge, \\vee\\) form before a dual can be taken. " +
        "The dual of the dual returns the original, and the laws in the table above come in dual pairs — which is why they are listed in two columns.",
      formula: {
        label: "Dual versus negation",
        latex:
          "\\text{dual}(p \\wedge \\sim q) = p \\vee \\sim q \\qquad \\sim(p \\wedge \\sim q) \\equiv\\; \\sim p \\vee q",
        symbols: [
          { symbol: "dual", meaning: "swap the connectives only — letters untouched" },
          { symbol: "\\(\\sim\\)", meaning: "negation — swaps connectives AND negates every letter" },
        ],
      },
      authoredExample: {
        prompt: "Write the dual of \\([\\sim q \\wedge (p \\vee \\sim q) \\wedge \\sim r] \\vee p\\).",
        steps: [
          "Identify every connective. The pattern has three \\(\\wedge\\), one inner \\(\\vee\\) and one outer \\(\\vee\\).",
          "Swap each one: the three ANDs become ORs, and both ORs become ANDs.",
          "Leave every letter and every \\(\\sim\\) untouched — \\(\\sim q\\) stays \\(\\sim q\\), and \\(p\\) stays \\(p\\).",
          "Assemble: \\([\\sim q \\vee (p \\wedge \\sim q) \\vee \\sim r] \\wedge p\\).",
        ],
        answer: "\\([\\sim q \\vee (p \\wedge \\sim q) \\vee \\sim r] \\wedge p\\)",
      },
      selfCheckExample: {
        prompt:
          "Write the dual of \\((p \\wedge q) \\vee T\\), and separately write its negation, to see that they differ.",
        steps: [
          "Dual: swap \\(\\wedge\\) with \\(\\vee\\) and \\(T\\) with \\(F\\), leaving letters alone. That gives \\((p \\vee q) \\wedge F\\).",
          "Negation: apply De Morgan instead. \\(\\sim[(p \\wedge q) \\vee T] \\equiv \\;\\sim(p \\wedge q) \\wedge \\sim T\\).",
          "That simplifies to \\((\\sim p \\vee \\sim q) \\wedge F\\), which is \\(F\\).",
          "The two results are different objects: the dual keeps \\(p\\) and \\(q\\) positive, the negation does not.",
        ],
        answer:
          "Dual is \\((p \\vee q) \\wedge F\\); the negation is \\((\\sim p \\vee \\sim q) \\wedge F \\equiv F\\).",
      },
      practiceSet: [
        {
          prompt: "Write the dual of \\(p \\wedge q\\).",
          answer: "\\(p \\vee q\\)",
          method: "Swap the connective; letters unchanged.",
        },
        {
          prompt: "Write the dual of \\(\\sim p \\vee q\\).",
          answer: "\\(\\sim p \\wedge q\\)",
          method: "The \\(\\sim\\) is left alone.",
        },
        {
          prompt: "Write the dual of \\(p \\vee T\\).",
          answer: "\\(p \\wedge F\\)",
          method: "T and F also swap.",
        },
        {
          prompt: "Does taking a dual negate the letters?",
          answer: "No.",
          method: "Only the connectives and the constants swap.",
        },
      ],
      // No featured PYQ deliberately. Exactly ONE question in the chapter touches
      // duals (ac6df105), and its dominant skill is evaluating a pattern from given
      // truth values, so it is filed under Statements, Connectives and Truth Tables.
      // Featuring it here would break the subtopic constraint, and moving it would
      // misclassify it. The concept stays because duals are Std XII syllabus content
      // and the dual-versus-negation confusion is worth pre-empting — but the bank
      // barely tests it, so it carries no PYQ rather than a borrowed one.
      traps: [
        {
          title: "Negating the letters when asked for a dual",
          body:
            "The dual of \\(p \\wedge \\sim q\\) is \\(p \\vee \\sim q\\), NOT \\(\\sim p \\vee q\\). " +
            "The second is the negation. Duals touch connectives and constants only, and the two operations produce different statements " +
            "that both appear in the option list.",
        },
      ],
    },

  ],
  related: [
    { label: "Next: Switching circuits", href: "/notes/mht-cet-maths/mathematical-logic/switching-circuits" },
    { label: "Previous: Converse, inverse and contrapositive", href: "/notes/mht-cet-maths/mathematical-logic/converse-inverse-contrapositive" },
    { label: "Mathematical Logic playbook", href: "/guide/mht-cet-maths/playbooks/mathematical-logic" },
  ],
};

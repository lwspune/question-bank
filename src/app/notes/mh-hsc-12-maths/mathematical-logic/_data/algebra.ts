import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_ML_ALGEBRA_NOTE: SubtopicNote = {
  subtopicName: "Logical Equivalence and Algebra of Statements",
  title: "Logical Equivalence and Algebra of Statements",
  oneLineDefinition:
    "Proving that two statement patterns are equivalent, first with a truth table and then without one, using the named laws of the algebra of statements.",
  whyItMatters:
    "29 questions. Six were set in board papers: five ask you to prove or verify an equivalence with a truth table (2018, 2020, 2022 and twice in 2025; the 2018 paper and one 2025 paper set the same biconditional equivalence), and one asks for a proof without a truth table (2022). The textbook adds proofs of both kinds and one MCQ on an equivalent pattern.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmml-equivalence-table",
      name: "Proving an equivalence with a truth table",
      intuition:
        "Two patterns are equivalent when they always agree: whatever values p and q take, both are true together or false together. A truth table checks every case, so it is a complete proof.",
      definition:
        "- Two statement patterns are **equivalent** if their truth tables are identical. If A and B are equivalent, we write \\(A \\equiv B\\).\n" +
        "- Build one table with a column for each part of both sides.\n" +
        "- Point to the two final columns and state that they are identical in every row.\n" +
        "- End with: 'Hence \\(A \\equiv B\\).'",
      authoredExample: {
        prompt: "Using a truth table, prove that \\(p \\to q \\equiv \\sim q \\to \\sim p\\).",
        steps: [
          "Columns: p, q, \\(\\sim p\\), \\(\\sim q\\), \\(p \\to q\\), \\(\\sim q \\to \\sim p\\).",
          "Row 1 (p T, q T): \\(p \\to q = T\\); \\(\\sim q \\to \\sim p = F \\to F = T\\).",
          "Row 2 (p T, q F): \\(p \\to q = F\\); \\(\\sim q \\to \\sim p = T \\to F = F\\).",
          "Row 3 (p F, q T): \\(p \\to q = T\\); \\(\\sim q \\to \\sim p = F \\to T = T\\).",
          "Row 4 (p F, q F): \\(p \\to q = T\\); \\(\\sim q \\to \\sim p = T \\to T = T\\).",
          "The columns of \\(p \\to q\\) and \\(\\sim q \\to \\sim p\\) are identical: T, F, T, T.",
        ],
        answer: "Hence \\(p \\to q \\equiv \\sim q \\to \\sim p\\)",
      },
      selfCheckExample: {
        prompt: "Using a truth table, prove that \\(p \\to q \\equiv \\sim p \\lor q\\).",
        steps: [
          "\\(p \\to q\\) in the four rows: T, F, T, T.",
          "\\(\\sim p \\lor q\\): \\(F \\lor T = T\\), \\(F \\lor F = F\\), \\(T \\lor T = T\\), \\(T \\lor F = T\\).",
          "The two columns are identical.",
        ],
        answer: "Proved: both columns read T, F, T, T",
      },
      practiceSet: [
        { prompt: "How many rows are needed to prove an equivalence that uses p, q and r?", answer: "8" },
        { prompt: "The final columns of two patterns differ in one row. Are the patterns equivalent?", answer: "No. They must agree in every row" },
        { prompt: "Are \\(p \\to q\\) and \\(q \\to p\\) equivalent?", answer: "No. They differ when p is T and q is F" },
      ],
      pyqExampleId: "91b6633c-80e3-49cd-8ac7-e4e21ccf7910",
      traps: [
        {
          title: "Not saying which columns agree",
          body: "Name the two columns (for example, 'columns 5 and 6') and say they are identical in every row. The proof is the comparison, not the table alone.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscmml-laws",
      name: "The laws of the algebra of statements",
      intuition:
        "These laws are equivalences proved once by truth tables and then used as tools, the way you use identities in algebra. Most come in pairs: one form with 'and' and its dual with 'or'.",
      definition:
        "- t is a tautology and c is a contradiction.\n" +
        "- **Conditional law:** \\(p \\to q \\equiv \\sim p \\lor q\\).\n" +
        "- **Biconditional law:** \\(p \\leftrightarrow q \\equiv (p \\to q) \\land (q \\to p) \\equiv (\\sim p \\lor q) \\land (\\sim q \\lor p)\\).\n" +
        "- Double negation: \\(\\sim(\\sim p) \\equiv p\\).\n" +
        "- The textbook also proves with a truth table that \\((p \\land q) \\to r \\equiv p \\to (q \\to r)\\).",
      table: {
        columns: ["Law", "Form with and", "Form with or"],
        rows: [
          { cells: ["Idempotent", "\\(p \\land p \\equiv p\\)", "\\(p \\lor p \\equiv p\\)"] },
          { cells: ["Commutative", "\\(p \\land q \\equiv q \\land p\\)", "\\(p \\lor q \\equiv q \\lor p\\)"] },
          { cells: ["Associative", "\\(p \\land (q \\land r) \\equiv (p \\land q) \\land r\\)", "\\(p \\lor (q \\lor r) \\equiv (p \\lor q) \\lor r\\)"] },
          { cells: ["Distributive", "\\(p \\land (q \\lor r) \\equiv (p \\land q) \\lor (p \\land r)\\)", "\\(p \\lor (q \\land r) \\equiv (p \\lor q) \\land (p \\lor r)\\)"] },
          { cells: ["De Morgan's", "\\(\\sim(p \\land q) \\equiv \\sim p \\lor \\sim q\\)", "\\(\\sim(p \\lor q) \\equiv \\sim p \\land \\sim q\\)"] },
          { cells: ["Identity", "\\(p \\land t \\equiv p\\), \\(p \\land c \\equiv c\\)", "\\(p \\lor c \\equiv p\\), \\(p \\lor t \\equiv t\\)"] },
          { cells: ["Complement", "\\(p \\land \\sim p \\equiv c\\)", "\\(p \\lor \\sim p \\equiv t\\)"] },
          { cells: ["Absorption", "\\(p \\land (p \\lor q) \\equiv p\\)", "\\(p \\lor (p \\land q) \\equiv p\\)"] },
        ],
        caption: "Each 'or' form is the dual of its 'and' form. Learn the names: a proof without a truth table names a law on every line.",
      },
      selfCheckExample: {
        prompt: "Name the law used in \\(p \\lor (p \\land q) \\equiv p\\).",
        steps: ["The pattern p is absorbed: 'p or (p and q)' is just p."],
        answer: "Absorption law",
      },
      practiceSet: [
        { prompt: "By the identity law, \\(p \\lor c \\equiv\\) ?", answer: "\\(p\\)" },
        { prompt: "Name the law: \\(p \\land (q \\lor r) \\equiv (p \\land q) \\lor (p \\land r)\\).", answer: "Distributive law" },
        { prompt: "By the complement law, \\(q \\lor \\sim q \\equiv\\) ?", answer: "t" },
        { prompt: "Write \\(p \\leftrightarrow q\\) as a conjunction of two conditionals.", answer: "\\((p \\to q) \\land (q \\to p)\\)" },
      ],
      pyqExampleId: "d3e80eca-2ff6-4c8f-96a3-53955be8962b",
      traps: [
        {
          title: "Mixing up the identity and complement laws",
          body: "The identity law joins p with t or c. The complement law joins p with \\(\\sim p\\). Quote the one you actually used.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmml-prove-by-laws",
      name: "Proving an equivalence without a truth table",
      intuition:
        "Start from the longer side and simplify it, one law at a time, until it becomes the other side. It is like simplifying an algebraic expression, except that the steps are logic laws and each one must be named.",
      definition:
        "- Write 'To prove: ...', then start with 'L.H.S. \\(= \\dots\\)', usually the longer side.\n" +
        "- Change one thing on each line and write the law in brackets at the end of the line.\n" +
        "- Typical chain: Distributive law to take out a common letter, Complement law to get t or c, Identity law to remove it.\n" +
        "- Finish with '\\(=\\) R.H.S. Hence proved.'",
      authoredExample: {
        prompt: "Without using a truth table, prove that \\((p \\land q) \\lor (p \\land \\sim q) \\equiv p\\).",
        steps: [
          "L.H.S. \\(= (p \\land q) \\lor (p \\land \\sim q)\\)",
          "\\(\\equiv p \\land (q \\lor \\sim q)\\)   [Distributive law]",
          "\\(\\equiv p \\land t\\)   [Complement law]",
          "\\(\\equiv p\\)   [Identity law]",
          "\\(=\\) R.H.S.",
        ],
        answer: "Hence \\((p \\land q) \\lor (p \\land \\sim q) \\equiv p\\). Proved",
      },
      selfCheckExample: {
        prompt: "Without using a truth table, prove that \\(p \\lor (\\sim p \\land q) \\equiv p \\lor q\\).",
        steps: [
          "L.H.S. \\(\\equiv (p \\lor \\sim p) \\land (p \\lor q)\\)   [Distributive law]",
          "\\(\\equiv t \\land (p \\lor q)\\)   [Complement law]",
          "\\(\\equiv p \\lor q\\)   [Identity law]",
        ],
        answer: "Proved: L.H.S. \\(= p \\lor q =\\) R.H.S.",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\sim(\\sim p \\land q)\\) using De Morgan's law.", answer: "\\(p \\lor \\sim q\\)" },
        { prompt: "Simplify \\(p \\land (p \\lor q)\\) and name the law.", answer: "\\(p\\); Absorption law" },
        { prompt: "Simplify \\((p \\to q) \\land (q \\to p)\\).", answer: "\\(p \\leftrightarrow q\\) (Biconditional law)" },
      ],
      pyqExampleId: "74a1021a-f610-4ddd-a3b5-e7a9461a0909",
      traps: [
        {
          title: "Using a truth table when told not to",
          body: "If the question says 'without using truth table', a table earns nothing. Use the laws, one per line.",
        },
        {
          title: "Several changes on one line",
          body: "Do one law per line. Two changes on a line with one law named hide a step, and the examiner cannot give the mark.",
        },
      ],
    },
  ],
};

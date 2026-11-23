import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_ML_TABLES_NOTE: SubtopicNote = {
  subtopicName: "Truth Tables of Compound Statements",
  title: "Truth Tables of Compound Statements",
  oneLineDefinition:
    "Finding the truth value of a statement pattern from given values, working back to the values of p and q, and building the full truth table.",
  whyItMatters:
    "34 questions. Two were set in board papers, both in 2024: the truth value of a pattern when p, q are true and r, s are false, and the full truth table of a two-letter pattern. The textbook adds tables with two and three letters, and finding the truth values of p and q from given compound values.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmml-given-values",
      name: "Truth value of a pattern from given values",
      intuition:
        "When the truth values of p, q, r and s are given, a statement pattern is just a sum to work out. Put T or F in place of each letter and work from the innermost bracket outwards, one connective at a time.",
      definition:
        "- Write the given values first, and the value of each negation: if p is T, then \\(\\sim p\\) is F.\n" +
        "- Work inside the brackets first, one connective at a time.\n" +
        "- Write every step on its own line: substitution, each bracket, the final value.\n" +
        "- End with a sentence: 'Hence the truth value of the given statement pattern is T (or F).'",
      authoredExample: {
        prompt: "If p is true, q is false and r is true, find the truth value of \\((p \\lor q) \\to (\\sim r \\land q)\\).",
        steps: [
          "Given: p is T, q is F, r is T, so \\(\\sim r\\) is F.",
          "\\(p \\lor q \\equiv T \\lor F \\equiv T\\).",
          "\\(\\sim r \\land q \\equiv F \\land F \\equiv F\\).",
          "\\((p \\lor q) \\to (\\sim r \\land q) \\equiv T \\to F \\equiv F\\).",
        ],
        answer: "The truth value is F",
      },
      selfCheckExample: {
        prompt: "If p and r are false and q is true, find the truth value of \\((\\sim p \\land q) \\leftrightarrow (r \\lor \\sim q)\\).",
        steps: [
          "\\(\\sim p\\) is T and \\(\\sim q\\) is F.",
          "\\(\\sim p \\land q \\equiv T \\land T \\equiv T\\); \\(r \\lor \\sim q \\equiv F \\lor F \\equiv F\\).",
          "\\(T \\leftrightarrow F \\equiv F\\).",
        ],
        answer: "F",
      },
      practiceSet: [
        { prompt: "If p is T and q is F, find the truth value of \\(\\sim p \\lor q\\).", answer: "F" },
        { prompt: "If p is T and q is F, find the truth value of \\(\\sim (p \\to q)\\).", answer: "T, since \\(p \\to q\\) is F" },
        { prompt: "If p, q and r are all false, find the truth value of \\((p \\to q) \\land (q \\to r)\\).", answer: "T" },
      ],
      pyqExampleId: "ba75c6ec-b78e-464f-923f-ea9d4d158e3c",
      traps: [
        {
          title: "Using p where the pattern has not p",
          body: "Write the value of each negation before you start. If p is T, then \\(\\sim p\\) is F, and it is \\(\\sim p\\) that goes into the bracket.",
        },
        {
          title: "Working left to right instead of inside out",
          body: "Finish each bracket before the connective outside it. \\(\\sim (p \\to q)\\) means: find \\(p \\to q\\) first, then negate it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmml-find-values",
      name: "Finding the truth values of p and q",
      intuition:
        "Some given values leave only one row of the truth table. 'p and q is true' can happen in one way only, and so can 'p or q is false' and 'if p then q is false'. Start from the condition that pins down the row, then check the other one.",
      definition:
        "- \\(p \\land q\\) is T only when p and q are both T.\n" +
        "- \\(p \\lor q\\) is F only when p and q are both F.\n" +
        "- \\(p \\to q\\) is F only when p is T and q is F.\n" +
        "- \\(p \\leftrightarrow q\\) is T when p and q match, and F when they differ.\n" +
        "- If the first condition leaves several rows, test each one against the second condition and list every row that works.",
      authoredExample: {
        prompt: "Find the truth values of p and q if \\(p \\leftrightarrow q\\) is T and \\(p \\lor q\\) is F.",
        steps: [
          "\\(p \\lor q\\) is F only when p is F and q is F.",
          "Check the other condition: \\(p \\leftrightarrow q \\equiv F \\leftrightarrow F \\equiv T\\), as given.",
        ],
        answer: "p is F and q is F",
      },
      selfCheckExample: {
        prompt: "Find the truth values of p and q if \\(p \\land q\\) is F and \\(p \\leftrightarrow q\\) is F.",
        steps: [
          "\\(p \\leftrightarrow q\\) is F, so p and q have different values: (T, F) or (F, T).",
          "In both rows \\(p \\land q\\) is F, so both rows work.",
        ],
        answer: "p is T and q is F, or p is F and q is T",
      },
      practiceSet: [
        { prompt: "If \\(p \\to q\\) is F, find the truth values of p and q.", answer: "p is T and q is F" },
        { prompt: "If \\(\\sim p \\land q\\) is T, find the truth values of p and q.", answer: "p is F and q is T" },
        { prompt: "If \\(p \\lor q\\) is F, find the truth value of \\(p \\to q\\).", answer: "T, since p and q are both F" },
      ],
      pyqExampleId: "45c11302-1fdc-48c6-be9a-9d22d913476b",
      traps: [
        {
          title: "Stopping at one row when more rows work",
          body: "If the conditions allow two or three rows, the answer is all of them. Test each of the four rows against both conditions.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmml-build-table",
      name: "Building a truth table",
      intuition:
        "A truth table tries every possible combination of truth values of the letters. With two letters there are four combinations, with three there are eight. Build the pattern one piece at a time, a column for each piece, and the last column is the pattern itself.",
      definition:
        "- With n letters the table has \\(2^n\\) rows: 4 rows for p, q and 8 rows for p, q, r.\n" +
        "- Fill the first letter's column with half T then half F; the next column in blocks half as long; the last letter alternates T, F, T, F.\n" +
        "- Add a column for each part of the pattern, working from the inside out, and end with the whole pattern.\n" +
        "- A table that lists all possible truth values of a pattern for every combination of its prime components (p, q, r) is its **truth table**.",
      formula: {
        label: "Number of rows",
        latex: "\\text{rows} = 2^n, \\quad n = \\text{number of simple statements}",
      },
      authoredExample: {
        prompt: "Construct the truth table for \\((p \\lor \\sim q) \\to q\\).",
        steps: [
          "Two letters, so \\(2^2 = 4\\) rows. Columns: p, q, \\(\\sim q\\), \\(p \\lor \\sim q\\), \\((p \\lor \\sim q) \\to q\\).",
          "Row 1 (p T, q T): \\(\\sim q = F\\), \\(p \\lor \\sim q = T\\), \\(T \\to T = T\\).",
          "Row 2 (p T, q F): \\(\\sim q = T\\), \\(p \\lor \\sim q = T\\), \\(T \\to F = F\\).",
          "Row 3 (p F, q T): \\(\\sim q = F\\), \\(p \\lor \\sim q = F\\), \\(F \\to T = T\\).",
          "Row 4 (p F, q F): \\(\\sim q = T\\), \\(p \\lor \\sim q = T\\), \\(T \\to F = F\\).",
        ],
        answer: "The last column is T, F, T, F",
      },
      selfCheckExample: {
        prompt: "How many rows does the truth table of \\((p \\land q) \\to r\\) have, and in which row is the pattern false?",
        steps: [
          "Three letters, so \\(2^3 = 8\\) rows.",
          "A conditional is false only when the antecedent is T and the consequent is F: \\(p \\land q\\) is T (p T, q T) and r is F.",
        ],
        answer: "8 rows; false only in the row p T, q T, r F",
      },
      practiceSet: [
        { prompt: "How many rows does a truth table with four simple statements need?", answer: "16" },
        { prompt: "In a table for p, q, r in the usual order, write the q column.", answer: "T, T, F, F, T, T, F, F" },
        { prompt: "What is the last column of the truth table of \\(p \\land \\sim p\\)?", answer: "F, F" },
      ],
      pyqExampleId: "6d113c9e-d39e-486a-9171-de4c5319b998",
      traps: [
        {
          title: "Four rows for three letters",
          body: "Three letters need eight rows. A table with too few rows misses combinations, and the conclusion drawn from it can be wrong.",
        },
        {
          title: "Jumping to the last column",
          body: "Show a column for every part of the pattern. The intermediate columns are where the marks for working are given.",
        },
      ],
    },
  ],
};

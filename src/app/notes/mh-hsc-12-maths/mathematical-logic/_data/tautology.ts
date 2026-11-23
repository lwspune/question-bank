import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_ML_TAUTOLOGY_NOTE: SubtopicNote = {
  subtopicName: "Tautology, Contradiction and Contingency",
  title: "Tautology, Contradiction and Contingency",
  oneLineDefinition:
    "Building the truth table of a statement pattern and reading its last column: all T is a tautology, all F is a contradiction, and a mix is a contingency.",
  whyItMatters:
    "25 questions. Six were set in board papers, each a truth table to build and classify: a contingency in 2015, 2016 and 2017, a tautology to show in 2024, and two contradictions in 2026. The 2016 pattern is the same one the board set in 2024 on the truth tables page. The textbook adds more patterns with two and three letters to classify the same way.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmml-tautology-show",
      name: "Showing a pattern is a tautology",
      intuition:
        "A tautology is a pattern that cannot be false, whatever the truth values of its letters. 'It is raining or it is not raining' is true on every day. To show it, build the full table and point to a last column made only of T.",
      definition:
        "- A **statement pattern** is a proper combination of statement letters and connectives; p, q, r are its prime components.\n" +
        "- **Tautology:** a pattern whose truth value is T for all possible combinations of truth values of its prime components. It is denoted by **t**. Example: \\(p \\lor \\sim p\\).\n" +
        "- To show a tautology, build the truth table and state that every entry of the last column is T.\n" +
        "- End with a sentence: 'All the entries in the last column are T, hence the statement pattern is a tautology.'",
      authoredExample: {
        prompt: "Using a truth table, show that \\((p \\land q) \\to p\\) is a tautology.",
        steps: [
          "Columns: p, q, \\(p \\land q\\), \\((p \\land q) \\to p\\). Two letters, so 4 rows.",
          "Row 1 (p T, q T): \\(p \\land q = T\\), \\(T \\to T = T\\).",
          "Row 2 (p T, q F): \\(p \\land q = F\\), \\(F \\to T = T\\).",
          "Row 3 (p F, q T): \\(p \\land q = F\\), \\(F \\to F = T\\).",
          "Row 4 (p F, q F): \\(p \\land q = F\\), \\(F \\to F = T\\).",
          "All the entries in the last column are T.",
        ],
        answer: "Hence \\((p \\land q) \\to p\\) is a tautology",
      },
      selfCheckExample: {
        prompt: "Show that \\(p \\to (p \\lor q)\\) is a tautology.",
        steps: [
          "When p is T, \\(p \\lor q\\) is T, so the conditional is \\(T \\to T = T\\).",
          "When p is F, the antecedent is false, so the conditional is T whatever q is.",
          "So all four rows give T.",
        ],
        answer: "A tautology",
      },
      practiceSet: [
        { prompt: "Is \\(p \\lor \\sim p\\) a tautology, a contradiction or a contingency?", answer: "A tautology" },
        { prompt: "Which letter does the textbook use for a tautology?", answer: "t" },
        { prompt: "Is \\((p \\to q) \\leftrightarrow (\\sim q \\to \\sim p)\\) a tautology?", answer: "Yes. A conditional and its contrapositive always have the same truth value" },
      ],
      pyqExampleId: "04d54065-a12a-43ca-b7ed-275d639f4f89",
      traps: [
        {
          title: "Deciding from one row",
          body: "One T row proves nothing. A tautology needs T in every row, so build all \\(2^n\\) rows before you conclude.",
        },
        {
          title: "Leaving out the conclusion",
          body: "The question asks you to examine or show something. Finish with a sentence naming the type; the table alone is not the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmml-contradiction",
      name: "Recognising a contradiction",
      intuition:
        "A contradiction is a pattern that can never be true, such as 'it is raining and it is not raining'. Its last column is all F. Inside the pattern there is usually a statement and its own negation joined by 'and'.",
      definition:
        "- **Contradiction:** a pattern whose truth value is F for all possible combinations of truth values of its prime components. It is denoted by **c**. Example: \\(p \\land \\sim p\\).\n" +
        "- Build the truth table and state that every entry of the last column is F.\n" +
        "- The negation of a contradiction is a tautology, and the negation of a tautology is a contradiction.",
      authoredExample: {
        prompt: "Using a truth table, examine whether \\(\\sim p \\land (p \\land q)\\) is a tautology, a contradiction or a contingency.",
        steps: [
          "Columns: p, q, \\(\\sim p\\), \\(p \\land q\\), \\(\\sim p \\land (p \\land q)\\).",
          "Row 1 (p T, q T): \\(\\sim p = F\\), \\(p \\land q = T\\), \\(F \\land T = F\\).",
          "Row 2 (p T, q F): \\(\\sim p = F\\), \\(p \\land q = F\\), \\(F \\land F = F\\).",
          "Row 3 (p F, q T): \\(\\sim p = T\\), \\(p \\land q = F\\), \\(T \\land F = F\\).",
          "Row 4 (p F, q F): \\(\\sim p = T\\), \\(p \\land q = F\\), \\(T \\land F = F\\).",
          "All the entries in the last column are F.",
        ],
        answer: "Hence the statement pattern is a contradiction",
      },
      selfCheckExample: {
        prompt: "Examine \\((p \\leftrightarrow q) \\land (p \\land \\sim q)\\).",
        steps: [
          "\\(p \\land \\sim q\\) is T only in the row p T, q F.",
          "In that row \\(p \\leftrightarrow q\\) is F, so the whole pattern is F there too. Every other row is F because \\(p \\land \\sim q\\) is F.",
        ],
        answer: "A contradiction",
      },
      practiceSet: [
        { prompt: "Which letter does the textbook use for a contradiction?", answer: "c" },
        { prompt: "Is \\(p \\land \\sim p\\) a tautology, a contradiction or a contingency?", answer: "A contradiction" },
        { prompt: "A pattern is a contradiction. What is its negation?", answer: "A tautology" },
      ],
      pyqExampleId: "a0a83b66-d1d8-4f36-a3fd-e06645b824d9",
      traps: [
        {
          title: "Writing 'contradiction' for a mixed column",
          body: "A contradiction needs F in every row. A last column with even one T is a contingency.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmml-contingency",
      name: "Recognising a contingency",
      intuition:
        "Most patterns are neither always true nor always false: they are true in some rows and false in others. Such a pattern is a contingency. A plain 'p and q' is one.",
      definition:
        "- **Contingency:** a statement pattern which is neither a tautology nor a contradiction. Its last column has at least one T and at least one F.\n" +
        "- Build the full truth table, then point to one row with T and one row with F.\n" +
        "- End with: 'The last column contains both T and F, hence the statement pattern is a contingency.'",
      authoredExample: {
        prompt: "Using a truth table, examine whether \\((p \\to q) \\lor \\sim p\\) is a tautology, a contradiction or a contingency.",
        steps: [
          "Columns: p, q, \\(p \\to q\\), \\(\\sim p\\), \\((p \\to q) \\lor \\sim p\\).",
          "Row 1 (p T, q T): \\(p \\to q = T\\), \\(\\sim p = F\\), \\(T \\lor F = T\\).",
          "Row 2 (p T, q F): \\(p \\to q = F\\), \\(\\sim p = F\\), \\(F \\lor F = F\\).",
          "Row 3 (p F, q T): \\(p \\to q = T\\), \\(\\sim p = T\\), \\(T \\lor T = T\\).",
          "Row 4 (p F, q F): \\(p \\to q = T\\), \\(\\sim p = T\\), \\(T \\lor T = T\\).",
          "The last column is T, F, T, T: it contains both T and F.",
        ],
        answer: "Hence the statement pattern is a contingency",
      },
      selfCheckExample: {
        prompt: "Is \\((p \\land q) \\lor r\\) a tautology, a contradiction or a contingency?",
        steps: [
          "With p, q, r all T the pattern is T.",
          "With p, q, r all F the pattern is \\(F \\lor F = F\\).",
          "It is T in one row and F in another.",
        ],
        answer: "A contingency",
      },
      practiceSet: [
        { prompt: "The last column of a truth table reads T, F, T, T. What is the pattern?", answer: "A contingency" },
        { prompt: "Is \\(p \\to q\\) a tautology, a contradiction or a contingency?", answer: "A contingency: it is F only when p is T and q is F" },
        { prompt: "Is \\(p \\leftrightarrow q\\) a tautology, a contradiction or a contingency?", answer: "A contingency" },
      ],
      pyqExampleId: "64aca8de-6242-4a7c-a700-5974f707b7a8",
      traps: [
        {
          title: "A contingency is not 'half true'",
          body: "The number of T rows does not matter. One T and three F, or three T and one F, are both contingencies.",
        },
      ],
    },
  ],
};

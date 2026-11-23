import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_ML_CONNECTIVES_NOTE: SubtopicNote = {
  subtopicName: "Statements and Logical Connectives",
  title: "Statements and Logical Connectives",
  oneLineDefinition:
    "What makes a sentence a statement, the five connectives that join statements, and how to find the truth value of a compound statement.",
  whyItMatters:
    "66 questions. Three were set in board papers: the truth values of two compound statements (2019), the truth values of p and q when 'p and q' and 'if p then q' are both false (2023, a one-mark MCQ), and writing a compound statement in symbols (2024). The textbook adds thirty sentences to sort into statements and non-statements, and many more to write in symbols, negate and evaluate.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmml-statements",
      name: "Statements and open sentences",
      intuition:
        "Logic works only with sentences that are definitely true or definitely false. 'Mumbai is in Maharashtra' qualifies. A question, a command or a request makes no claim at all, so it has no truth value. A sentence with an unknown, like 2y + 1 = 9, is true for one value and false for others, so it is not a statement until the unknown is fixed.",
      definition:
        "- A **statement** is a declarative (assertive) sentence which is either true or false, but not both at the same time. Statements are denoted by \\(p, q, r, \\dots\\)\n" +
        "- The **truth value** of a true statement is T and of a false statement is F.\n" +
        "- Interrogative, exclamatory, command, order, request and suggestion sentences are **not** statements.\n" +
        "- An **open sentence** contains a variable, so its truth depends on the value of the variable. It is not a statement. Once the value is fixed (for example, 'when \\(x = 2\\)'), it becomes a statement.\n" +
        "- A false sentence is still a statement: \\(6 \\times 4 = 25\\) is a statement with truth value F.",
      authoredExample: {
        prompt:
          "State which of the following are statements. Justify, and give the truth value of each statement. (i) 7 is a prime number. (ii) How beautiful the Taj Mahal is! (iii) \\(2y + 1 = 9\\). (iv) Every rectangle is a square.",
        steps: [
          "(i) It is a declarative sentence and it is true, since 7 has no factor other than 1 and 7. It is a statement; truth value T.",
          "(ii) It is an exclamatory sentence. It makes no claim, so it is not a statement.",
          "(iii) It is an open sentence: it is true only for \\(y = 4\\) and false for every other value. It is not a statement.",
          "(iv) It is a declarative sentence and it is false, since a rectangle with unequal sides is not a square. It is a statement; truth value F.",
        ],
        answer: "(i) statement, T; (iv) statement, F; (ii) and (iii) are not statements",
      },
      selfCheckExample: {
        prompt: "Is the sentence '\\(x^2 - 5x + 6 = 0\\) when \\(x = 2\\)' a statement? If it is, give its truth value.",
        steps: [
          "The value of \\(x\\) is fixed, so the sentence is either true or false. It is a statement.",
          "\\(2^2 - 5(2) + 6 = 4 - 10 + 6 = 0\\), so it is true.",
        ],
        answer: "A statement; truth value T",
      },
      practiceSet: [
        { prompt: "Is 'Open the window.' a statement?", answer: "No. It is a command, so it is neither true nor false" },
        { prompt: "Is 'The square of 3 is 9' a statement? If so, give its truth value.", answer: "Yes; truth value T" },
        { prompt: "Is \\(x + 5 = 12\\) a statement?", answer: "No. It is an open sentence; its truth depends on \\(x\\)" },
        { prompt: "Is 'Every prime number is odd' a statement? If so, give its truth value.", answer: "Yes; truth value F, since 2 is an even prime" },
      ],
      pyqExampleId: "03fbf6ad-5594-4e69-8b94-e63d2dce622f",
      traps: [
        {
          title: "Calling a false sentence 'not a statement'",
          body: "A statement only has to be true or false. '\\(5 + 4 = 13\\)' is a statement whose truth value is F. Ask whether the sentence makes a definite claim, not whether the claim is correct.",
        },
        {
          title: "Not giving the reason",
          body: "The question says 'Justify'. Name the kind of sentence: a question, a command, a request, an exclamation or an open sentence. A bare 'not a statement' loses the mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscmml-connectives",
      name: "The five connectives and their symbols",
      intuition:
        "Five words build every compound statement in this chapter: and, or, if ... then, if and only if, not. Each has one case that matters most. 'And' is true only when both parts are true. 'Or' is false only when both parts are false. 'If p then q' is false only when p is true and q is false.",
      definition:
        "- Words that join statements are **logical connectives**. A statement with no connective is **simple**; a statement made of two or more simple statements is **compound**.\n" +
        "- In \\(p \\to q\\), p is the **antecedent** (hypothesis) and q is the **consequent** (conclusion).\n" +
        "- 'p is sufficient for q', 'q is necessary for p', 'p implies q', 'q follows from p' and 'p only if q' all mean \\(p \\to q\\).\n" +
        "- 'but' is written as \\(\\land\\), and 'neither p nor q' is \\(\\sim p \\land \\sim q\\).\n" +
        "- The negation of a negation is the statement itself: \\(\\sim(\\sim p) \\equiv p\\).",
      table: {
        columns: ["Connective", "Words", "Symbol", "When it is true"],
        rows: [
          {
            cells: ["Conjunction", "p and q", "\\(p \\land q\\)", "Only when both p and q are true"],
            pyqExampleId: "2e1c55db-ea5b-4825-944a-e029c67c2a4f",
            noteAmber: "Board 2024 asked you to write a sentence joined by 'and' in symbols. Define p and q first, then write \\(p \\land q\\).",
          },
          { cells: ["Disjunction", "p or q", "\\(p \\lor q\\)", "When at least one is true; false only when both are false"] },
          { cells: ["Conditional", "if p then q", "\\(p \\to q\\)", "Always, except when p is true and q is false"] },
          { cells: ["Biconditional", "p if and only if q", "\\(p \\leftrightarrow q\\)", "When p and q have the same truth value"] },
          { cells: ["Negation", "not p", "\\(\\sim p\\)", "When p is false"] },
        ],
        caption: "Learn the last column. Every truth table in the chapter is this table used again and again.",
      },
      selfCheckExample: {
        prompt: "Let p: Ravi is tall and q: Ravi is strong. Write in symbols: 'Ravi is tall but he is not strong.'",
        steps: ["'but' is a conjunction, written \\(\\land\\).", "'he is not strong' is \\(\\sim q\\)."],
        answer: "\\(p \\land \\sim q\\)",
      },
      practiceSet: [
        { prompt: "Let p: x is positive and q: x is zero. Write 'x is neither positive nor zero' in symbols.", answer: "\\(\\sim p \\land \\sim q\\)" },
        { prompt: "Write the negation of 'Pune is in Gujarat.'", answer: "Pune is not in Gujarat" },
        { prompt: "Let p: a triangle is equilateral and q: it is isosceles. Write 'A triangle is equilateral only if it is isosceles' in symbols.", answer: "\\(p \\to q\\)" },
        { prompt: "Let p: Sita passes and q: Sita studies. Write 'Sita passes if and only if she studies' in symbols.", answer: "\\(p \\leftrightarrow q\\)" },
      ],
      pyqExampleId: "2e1c55db-ea5b-4825-944a-e029c67c2a4f",
      traps: [
        {
          title: "Reading 'p only if q' as 'if q then p'",
          body: "'p only if q' means \\(p \\to q\\). The word 'only' does not turn the conditional round.",
        },
        {
          title: "Not defining the letters",
          body: "Begin with 'Let p: ..., q: ...' before writing any symbol. The symbolic form means nothing to the examiner without it, and the step carries a mark.",
        },
        {
          title: "Treating 'or' as 'one but not both'",
          body: "In logic 'p or q' is true when both parts are true. \\(T \\lor T = T\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmml-truth-value",
      name: "Truth value of a compound statement",
      intuition:
        "First settle each simple statement on its own, using mathematics or general knowledge. Only then apply the connective. Most mistakes come from rushing the first step, not from the logic.",
      definition:
        "- Write each simple statement with a letter: 'Let p: ..., q: ...'.\n" +
        "- Settle the truth value of each simple statement.\n" +
        "- Write the given statement in symbols.\n" +
        "- Put T or F in place of each letter and apply the rule of the connective.\n" +
        "- A conditional with a false antecedent is true, whatever the consequent: \\(F \\to T\\) and \\(F \\to F\\) are both T.",
      formula: {
        label: "The values to remember",
        latex: "T \\land F = F, \\quad F \\lor T = T, \\quad T \\to F = F, \\quad F \\to F = T, \\quad T \\leftrightarrow F = F",
      },
      authoredExample: {
        prompt: "Write the truth value of the statement: 'If 9 is a perfect square, then 11 is an even number.'",
        steps: [
          "Let p: 9 is a perfect square; q: 11 is an even number.",
          "p is true, since \\(3^2 = 9\\). q is false, since 11 is odd.",
          "The given statement is \\(p \\to q\\).",
          "\\(p \\to q \\equiv T \\to F \\equiv F\\).",
        ],
        answer: "The truth value is F",
      },
      selfCheckExample: {
        prompt: "Write the truth value of: '\\(\\sqrt{9} = 3\\) if and only if \\(3^2 = 6\\).'",
        steps: [
          "Let p: \\(\\sqrt{9} = 3\\), which is T; q: \\(3^2 = 6\\), which is F since \\(3^2 = 9\\).",
          "The statement is \\(p \\leftrightarrow q \\equiv T \\leftrightarrow F \\equiv F\\).",
        ],
        answer: "F",
      },
      practiceSet: [
        { prompt: "Write the truth value of '7 is odd or 7 is even.'", answer: "T" },
        { prompt: "Write the truth value of 'If \\(2 + 2 = 5\\), then the Sun rises in the west.'", answer: "T, since the antecedent is false" },
        { prompt: "If \\(p \\land q\\) is F and p is T, what is the truth value of q?", answer: "F" },
        { prompt: "Write the truth value of '12 is divisible by 3 and 12 is divisible by 5.'", answer: "F, since 12 is not divisible by 5" },
      ],
      pyqExampleId: "a55eab59-4251-4e98-8227-abd050dfc922",
      traps: [
        {
          title: "Calling a conditional false because its parts are false",
          body: "\\(F \\to F\\) is T. A conditional is false in one case only: a true antecedent with a false consequent.",
        },
        {
          title: "Giving only the final letter",
          body: "Write the letters, the symbolic form and the substitution, then the truth value. A lone 'T' earns little in a written answer.",
        },
      ],
    },
  ],
};

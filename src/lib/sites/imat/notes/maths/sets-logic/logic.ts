import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_SLG_LOGIC_NOTE: SubtopicNote = {
  subtopicName: "Propositions and Quantifiers",
  title: "Propositions, Connectives and Quantifiers",
  oneLineDefinition:
    "A proposition is a statement that is either true or false; connectives (not, and, or, implies) build compound statements, and quantifiers say for all or there exists.",
  whyItMatters:
    "No past paper has asked about propositions directly, but the ministry papers write conditions with ∧ and ∀ in their answer options (2024, 2025), and reading an if-then statement correctly is the core of the logical reasoning section.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-slg-connectives",
      name: "Propositions and the connectives not, and, or, implies",
      intuition:
        "A proposition is a sentence with a definite truth value: \"7 is prime\" is true, \"7 is even\" is false. A question or a command is not a proposition. Connectives join propositions, and the truth of the result depends only on the truth of the parts.",
      definition:
        "Let \\(p\\) and \\(q\\) be propositions.\n" +
        "- **Or** in mathematics is **inclusive**: \\(p \\vee q\\) is true when at least one part is true, including both.\n" +
        "- \\(p \\Rightarrow q\\) is false in **only one** case: \\(p\\) true and \\(q\\) false. If \\(p\\) is false, the implication is true whatever \\(q\\) is.\n" +
        "- A sentence with an unknown, such as \\(x > 3\\), becomes a proposition only once \\(x\\) is given (or a quantifier is added).",
      table: {
        columns: ["Connective", "Symbol", "Read as", "True exactly when"],
        rows: [
          { cells: ["Negation", "\\(\\neg p\\)", "not p", "p is false"] },
          { cells: ["Conjunction", "\\(p \\wedge q\\)", "p and q", "both p and q are true"] },
          { cells: ["Disjunction", "\\(p \\vee q\\)", "p or q", "at least one of p, q is true"] },
          { cells: ["Implication", "\\(p \\Rightarrow q\\)", "if p then q", "it is not the case that p is true and q is false"] },
          { cells: ["Biconditional", "\\(p \\Leftrightarrow q\\)", "p if and only if q", "p and q have the same truth value"] },
        ],
      },
      selfCheckExample: {
        prompt: "Let \\(p\\) be \"7 is a prime number\" and \\(q\\) be \"7 is an even number\". Which of the following is true?",
        options: ["\\(p \\wedge q\\)", "\\(\\neg p\\)", "\\(p \\Rightarrow q\\)", "\\(\\neg p \\vee q\\)", "\\(p \\vee q\\)"],
        steps: [
          "\\(p\\) is true and \\(q\\) is false.",
          "\\(p \\wedge q\\) needs both; \\(\\neg p\\) is false; \\(p \\Rightarrow q\\) is the one false case (true then false); \\(\\neg p \\vee q\\) is false or false.",
          "\\(p \\vee q\\) needs only one true part, and \\(p\\) is true.",
        ],
        answer: "(E) \\(p \\vee q\\)",
      },
      practiceSet: [
        { prompt: "Is \"Close the window.\" a proposition?", answer: "No", method: "A command is neither true nor false" },
        { prompt: "Is \\((2 > 3) \\vee (5 > 1)\\) true or false?", answer: "True", method: "The second part is true" },
        { prompt: "Is \\((2 > 3) \\Rightarrow (5 < 1)\\) true or false?", answer: "True", method: "A false premise makes the implication true" },
      ],
      traps: [
        {
          title: "An implication with a false premise is true",
          body: "\\(p \\Rightarrow q\\) only fails when \\(p\\) is true and \\(q\\) is false. \"If 2 > 3 then the moon is cheese\" is a true implication. Options that call it false because the parts are false are wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-slg-implication",
      name: "Implication, converse, contrapositive and negation",
      intuition:
        "\"If it rains, the road is wet\" does not mean \"if the road is wet, it rained\": a hose could have wet it. But it does mean \"if the road is dry, it did not rain\". The truth table shows this: the contrapositive always agrees with the original, the converse does not.",
      definition:
        "From \\(p \\Rightarrow q\\):\n" +
        "- **Converse** \\(q \\Rightarrow p\\) and **inverse** \\(\\neg p \\Rightarrow \\neg q\\): NOT equivalent to the original.\n" +
        "- **Contrapositive** \\(\\neg q \\Rightarrow \\neg p\\): always equivalent to the original.\n" +
        "- The **negation** of \\(p \\Rightarrow q\\) is \\(p \\wedge \\neg q\\) (\\(p\\) happens and \\(q\\) does not), not another implication.\n" +
        "- **De Morgan**: \\(\\neg(p \\wedge q)\\) is \\(\\neg p \\vee \\neg q\\), and \\(\\neg(p \\vee q)\\) is \\(\\neg p \\wedge \\neg q\\).\n" +
        "- In \\(p \\Rightarrow q\\), \\(p\\) is **sufficient** for \\(q\\) and \\(q\\) is **necessary** for \\(p\\). \"p only if q\" also means \\(p \\Rightarrow q\\).",
      table: {
        columns: ["p", "q", "p ⇒ q", "q ⇒ p (converse)", "not q ⇒ not p (contrapositive)"],
        rows: [
          { cells: ["T", "T", "T", "T", "T"] },
          { cells: ["T", "F", "F", "T", "F"] },
          { cells: ["F", "T", "T", "F", "T"] },
          { cells: ["F", "F", "T", "T", "T"] },
        ],
        caption: "The third and fifth columns match in every row: an implication and its contrapositive are equivalent. The converse differs.",
      },
      selfCheckExample: {
        prompt: "Which statement is logically equivalent to \"If a number is divisible by 6, then it is even\"?",
        options: [
          "If a number is even, then it is divisible by 6.",
          "If a number is not divisible by 6, then it is not even.",
          "If a number is not even, then it is not divisible by 6.",
          "A number is divisible by 6 and it is not even.",
          "A number is even only if it is divisible by 6.",
        ],
        steps: [
          "The contrapositive swaps the two parts and negates both: if not even, then not divisible by 6.",
          "Option A is the converse (false: 4 is even but not divisible by 6) and E says the same thing in other words. B is the inverse, also false for 4.",
          "Option D is the negation of the original statement, the opposite of what was asked.",
        ],
        answer: "(C) If a number is not even, then it is not divisible by 6.",
      },
      practiceSet: [
        { prompt: "Write the converse of \"If it rains, the road is wet\".", answer: "If the road is wet, it rains." },
        { prompt: "Negate \"If \\(x > 2\\), then \\(x^2 > 4\\)\".", answer: "\\(x > 2\\) and \\(x^2 \\le 4\\)" },
        { prompt: "Rewrite \\(\\neg(p \\vee q)\\) without brackets.", answer: "\\(\\neg p \\wedge \\neg q\\)", method: "De Morgan's law" },
      ],
      traps: [
        {
          title: "The converse is not equivalent",
          body: "From \"if p then q\" you may conclude \"if not q then not p\", but not \"if q then p\". Options that reverse the implication without negating both parts are the usual wrong answers.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-slg-quantifiers",
      name: "Quantifiers: for all and there exists",
      intuition:
        "\"For all\" makes a strong claim, so a single counterexample breaks it. \"There exists\" makes a weak claim, so a single example proves it. Negating swaps one for the other: the opposite of \"everyone passed\" is \"someone did not pass\", not \"nobody passed\".",
      definition:
        "- \\(\\forall\\) means **for all** (every); \\(\\exists\\) means **there exists** (at least one); \\(\\exists!\\) means there exists exactly one.\n" +
        "- \\(\\neg(\\forall x,\\ P(x))\\) is \\(\\exists x : \\neg P(x)\\).\n" +
        "- \\(\\neg(\\exists x : P(x))\\) is \\(\\forall x,\\ \\neg P(x)\\).\n" +
        "- A universal statement is disproved by **one counterexample**; an existential statement is proved by **one example**.",
      table: {
        columns: ["Statement", "In symbols", "Its negation"],
        rows: [
          { cells: ["Every x has property P", "\\(\\forall x,\\ P(x)\\)", "at least one x does not: \\(\\exists x : \\neg P(x)\\)"] },
          { cells: ["Some x has property P", "\\(\\exists x : P(x)\\)", "no x has it: \\(\\forall x,\\ \\neg P(x)\\)"] },
          { cells: ["Every real square is at least 0 (true)", "\\(\\forall x \\in \\mathbb{R},\\ x^2 \\ge 0\\)", "\\(\\exists x \\in \\mathbb{R} : x^2 < 0\\) (false)"] },
          { cells: ["Some integer is even and prime (true: 2)", "\\(\\exists n \\in \\mathbb{Z} : n \\text{ even} \\wedge n \\text{ prime}\\)", "every integer is odd or not prime (false)"] },
        ],
      },
      selfCheckExample: {
        prompt: "What is the negation of \"Every student in the class passed the exam\"?",
        options: [
          "At least one student in the class did not pass the exam.",
          "No student in the class passed the exam.",
          "Every student in the class failed the exam.",
          "At least one student in the class passed the exam.",
          "Some students passed and some did not.",
        ],
        steps: [
          "The negation of \"for all, P\" is \"there exists one with not P\".",
          "So the statement is false as soon as one student did not pass.",
          "Options B and C are too strong (they say nobody passed); E adds a claim that someone passed, which the negation does not require.",
        ],
        answer: "(A) At least one student in the class did not pass the exam.",
      },
      practiceSet: [
        { prompt: "Negate \"There is a real number \\(x\\) with \\(x^2 = -1\\)\".", answer: "For every real \\(x\\), \\(x^2 \\ne -1\\)" },
        { prompt: "Give one counterexample to \"every prime number is odd\".", answer: "2" },
        { prompt: "Is \\(\\forall n \\in \\mathbb{N},\\ n^2 \\ge n\\) true?", answer: "Yes", method: "True for 0, 1 and every larger whole number" },
      ],
      traps: [
        {
          title: "The negation of all is not none",
          body: "\"Not every student passed\" means at least one failed. \"No student passed\" is a much stronger claim and is not the negation. IMAT options use this confusion.",
        },
      ],
    },
  ],
};

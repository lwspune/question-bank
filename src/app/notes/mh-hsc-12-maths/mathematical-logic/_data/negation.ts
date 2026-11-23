import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_ML_NEGATION_NOTE: SubtopicNote = {
  subtopicName: "Quantifiers, Duality and Negation of Statements",
  title: "Quantifiers, Duals and Negations",
  oneLineDefinition:
    "The quantifiers 'for all' and 'there exists', the dual of a statement pattern, and the rules for negating compound and quantified statements.",
  whyItMatters:
    "86 questions. Eight were set in board papers: the negation of 'p and (if q then r)' as an MCQ (2016 and 2022), the dual of a pattern (2024, and twice in 2026), the negation of a 'there exists' statement (2025), and which quantified statement about a set is not true (2025 and 2026). The textbook adds dozens of negations with the rule named, duals with t and c, and six conditionals whose converse, inverse and contrapositive are taught on the next page.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmml-quantifiers",
      name: "Quantifiers and their truth values",
      intuition:
        "'For all' makes a promise about every member of a set, so one member that fails breaks it. 'There exists' asks for just one member that works, so one example is enough. Test the members of the set one by one.",
      definition:
        "- 'There exists' is the **existential quantifier**, written \\(\\exists\\). 'For all' is the **universal quantifier**, written \\(\\forall\\).\n" +
        "- Every quantified statement has a collection (a set) and a condition.\n" +
        "- A \\(\\forall\\) statement is true if all objects in the collection satisfy the condition, and false if at least one object does not.\n" +
        "- An \\(\\exists\\) statement is true if at least one object satisfies the condition, and false if no object does.",
      authoredExample: {
        prompt: "If \\(A = \\{2, 4, 6, 8\\}\\), determine the truth value of (i) \\(\\forall x \\in A,\\ x + 3 > 6\\) (ii) \\(\\exists x \\in A\\) such that \\(x^2 = 36\\).",
        steps: [
          "(i) For \\(x = 2\\), \\(x + 3 = 5\\), which is not greater than 6. One element fails, so the statement is false. Truth value F.",
          "(ii) For \\(x = 6\\), \\(x^2 = 36\\), and \\(6 \\in A\\). One element works, so the statement is true. Truth value T.",
        ],
        answer: "(i) F (ii) T",
      },
      selfCheckExample: {
        prompt: "If \\(B = \\{1, 3, 5, 7\\}\\), find the truth value of '\\(\\forall x \\in B\\), x is an odd number.'",
        steps: ["1, 3, 5 and 7 are all odd, so every element satisfies the condition."],
        answer: "T",
      },
      practiceSet: [
        { prompt: "If \\(A = \\{1, 2, 3\\}\\), find the truth value of '\\(\\exists x \\in A\\) such that \\(x + 4 = 9\\).'", answer: "F, since \\(x = 5\\) is not in A" },
        { prompt: "If \\(A = \\{10, 20, 30\\}\\), find the truth value of '\\(\\forall x \\in A,\\ x \\geq 10\\).'", answer: "T" },
        { prompt: "How many counter-examples are needed to show that a 'for all' statement is false?", answer: "One" },
      ],
      pyqExampleId: "c1a7ebb2-0f0e-4573-a834-a558fa85c697",
      traps: [
        {
          title: "Testing only the first element",
          body: "For \\(\\forall\\), check every element, or find one that fails. For \\(\\exists\\), keep going until you find one that works. Stopping at the first element answers neither.",
        },
        {
          title: "Using a value outside the set",
          body: "A witness for \\(\\exists x \\in A\\) must belong to A. If the equation is solved only by a number outside A, the statement is false.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmml-quantified-negation",
      name: "Negating a quantified statement",
      intuition:
        "To deny 'every student passed', you do not need 'no student passed'; one student who failed is enough. So the negation of 'for all' is 'there exists ... not', and the negation of 'there exists' is 'for all ... not'.",
      definition:
        "- Replace 'all' by 'some' and 'for every' by 'there exists', and the other way round. Then negate the condition.\n" +
        "- The negation of 'Some A are B' is 'No A is B'.\n" +
        "- Negate the condition carefully: the negation of \\(>\\) is \\(\\leq\\), of \\(<\\) is \\(\\geq\\), and of \\(=\\) is \\(\\neq\\).",
      formula: {
        label: "Negating quantifiers",
        latex: "\\sim(\\forall x,\\ P(x)) \\equiv \\exists x \\text{ such that } \\sim P(x), \\qquad \\sim(\\exists x \\text{ such that } P(x)) \\equiv \\forall x,\\ \\sim P(x)",
      },
      authoredExample: {
        prompt: "Write the negation of '\\(\\forall x \\in R,\\ x^2 + 1 > 0\\).'",
        steps: [
          "The statement uses the universal quantifier \\(\\forall\\); its negation uses \\(\\exists\\).",
          "The negation of \\(x^2 + 1 > 0\\) is \\(x^2 + 1 \\leq 0\\).",
        ],
        answer: "\\(\\exists x \\in R\\) such that \\(x^2 + 1 \\leq 0\\)",
      },
      selfCheckExample: {
        prompt: "Write the negation of 'Some rectangles are squares.'",
        steps: ["The negation of 'Some A are B' is 'No A is B'."],
        answer: "No rectangle is a square",
      },
      practiceSet: [
        { prompt: "Write the negation of 'All birds can fly.'", answer: "Some birds cannot fly" },
        { prompt: "Write the negation of '\\(\\exists x \\in N\\) such that \\(x + 2 = 7\\).'", answer: "\\(\\forall x \\in N,\\ x + 2 \\neq 7\\)" },
        { prompt: "What is the negation of the condition \\(x \\geq 4\\)?", answer: "\\(x < 4\\)" },
      ],
      pyqExampleId: "a31a694b-9a1b-4658-b415-409ced7d2246",
      traps: [
        {
          title: "Negating 'all' with 'none'",
          body: "The negation of 'All natural numbers are rational' is 'Some natural numbers are not rational', not 'No natural number is rational'.",
        },
        {
          title: "Changing the quantifier but not the condition",
          body: "Both parts change. Swapping \\(\\exists\\) for \\(\\forall\\) while keeping \\(>\\) gives a statement that is not the negation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmml-duals",
      name: "The dual of a statement pattern",
      intuition:
        "The dual is a mirror image of a pattern: every 'and' becomes 'or', every 'or' becomes 'and', and the tautology t and contradiction c swap places. Nothing else changes, not the letters and not the negation signs.",
      definition:
        "- Two statements are **duals** of each other if one is obtained from the other by interchanging \\(\\land\\) with \\(\\lor\\), and t with c.\n" +
        "- The letters and the \\(\\sim\\) signs stay as they are. The brackets stay where they are.\n" +
        "- For an equivalence, take the dual of each side and keep \\(\\equiv\\): the dual of \\((p \\lor q) \\lor r \\equiv p \\lor (q \\lor r)\\) is \\((p \\land q) \\land r \\equiv p \\land (q \\land r)\\).\n" +
        "- For example, the dual of \\(p \\lor q\\) is \\(p \\land q\\), and the dual of \\(t \\land p\\) is \\(c \\lor p\\).",
      authoredExample: {
        prompt: "Write the dual of \\((p \\lor c) \\land (\\sim q \\lor t)\\).",
        steps: [
          "Interchange \\(\\land\\) and \\(\\lor\\): the two \\(\\lor\\) become \\(\\land\\) and the middle \\(\\land\\) becomes \\(\\lor\\).",
          "Interchange t and c: c becomes t and t becomes c.",
          "\\(\\sim q\\) stays \\(\\sim q\\).",
        ],
        answer: "\\((p \\land t) \\lor (\\sim q \\land c)\\)",
      },
      selfCheckExample: {
        prompt: "Write the dual of \\(p \\land (q \\lor \\sim r)\\).",
        steps: ["Interchange \\(\\land\\) and \\(\\lor\\); keep \\(\\sim r\\)."],
        answer: "\\(p \\lor (q \\land \\sim r)\\)",
      },
      practiceSet: [
        { prompt: "Write the dual of \\(p \\lor c\\).", answer: "\\(p \\land t\\)" },
        { prompt: "Write the dual of \\(\\sim p \\land \\sim q\\).", answer: "\\(\\sim p \\lor \\sim q\\)" },
        { prompt: "Write the dual of \\(p \\land (p \\lor q) \\equiv p\\).", answer: "\\(p \\lor (p \\land q) \\equiv p\\)" },
      ],
      pyqExampleId: "e64eba04-ab31-40a5-af27-c421492b0b3c",
      traps: [
        {
          title: "Negating the letters",
          body: "A dual never adds or removes \\(\\sim\\). Turning p into \\(\\sim p\\) is negation, a different operation.",
        },
        {
          title: "Forgetting t and c",
          body: "Change every \\(\\land\\) and \\(\\lor\\), and also every t and c. An answer that swaps the connectives but keeps t is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmml-compound-negation",
      name: "Negating a compound statement",
      intuition:
        "'6 is even and perfect' is false if 6 is not even or 6 is not perfect, so the negation of 'and' is 'or' with both parts negated. A conditional 'if p then q' is false only when p happens and q does not, so its negation is 'p and not q'.",
      definition:
        "- **De Morgan's laws:** \\(\\sim(p \\land q) \\equiv \\sim p \\lor \\sim q\\) and \\(\\sim(p \\lor q) \\equiv \\sim p \\land \\sim q\\).\n" +
        "- **Negation of a conditional:** \\(\\sim(p \\to q) \\equiv p \\land \\sim q\\).\n" +
        "- **Negation of a biconditional:** \\(\\sim(p \\leftrightarrow q) \\equiv (p \\land \\sim q) \\lor (q \\land \\sim p)\\).\n" +
        "- **Double negation:** \\(\\sim(\\sim p) \\equiv p\\).\n" +
        "- Work from the outside in, one rule per line, and name the rule in brackets at the end of the line.\n" +
        "- In words: negate each simple statement and change 'and' to 'or' (or 'or' to 'and'). The negation of \\(7 > 3\\) is \\(7 \\leq 3\\).\n" +
        "- For a conditional \\(p \\to q\\), the textbook's Exercise 1.3 also asks for the converse \\(q \\to p\\), the inverse \\(\\sim p \\to \\sim q\\) and the contrapositive \\(\\sim q \\to \\sim p\\); the next page teaches them.",
      formula: {
        label: "Rules of negation",
        latex: "\\sim(p \\land q) \\equiv \\sim p \\lor \\sim q, \\quad \\sim(p \\lor q) \\equiv \\sim p \\land \\sim q, \\quad \\sim(p \\to q) \\equiv p \\land \\sim q",
      },
      authoredExample: {
        prompt: "Using the rules of negation, write the negation of \\(p \\lor (\\sim q \\to r)\\), stating the rules used.",
        steps: [
          "\\(\\sim[p \\lor (\\sim q \\to r)] \\equiv \\sim p \\land \\sim(\\sim q \\to r)\\)   [De Morgan's law]",
          "\\(\\equiv \\sim p \\land (\\sim q \\land \\sim r)\\)   [Negation of a conditional]",
        ],
        answer: "\\(\\sim p \\land (\\sim q \\land \\sim r)\\)",
      },
      selfCheckExample: {
        prompt: "Write the negation of 'If it is Sunday, then the bank is closed.'",
        steps: [
          "Let p: it is Sunday; q: the bank is closed. The statement is \\(p \\to q\\).",
          "\\(\\sim(p \\to q) \\equiv p \\land \\sim q\\).",
        ],
        answer: "It is Sunday and the bank is not closed",
      },
      practiceSet: [
        { prompt: "Write the negation of \\(\\sim p \\lor q\\).", answer: "\\(p \\land \\sim q\\)" },
        { prompt: "Write the negation of '7 is odd or 9 is prime.'", answer: "7 is not odd and 9 is not prime" },
        { prompt: "Write the negation of \\(p \\leftrightarrow \\sim q\\).", answer: "\\((p \\land q) \\lor (\\sim q \\land \\sim p)\\)" },
      ],
      pyqExampleId: "dee49a1e-8b44-4101-ac96-8db8de80fba8",
      traps: [
        {
          title: "Negating a conditional as another conditional",
          body: "The negation of \\(p \\to q\\) is \\(p \\land \\sim q\\), a conjunction. Writing \\(\\sim p \\to \\sim q\\) gives the inverse, which is not the negation.",
        },
        {
          title: "Keeping the connective",
          body: "De Morgan changes the connective as well as the parts: the negation of 'and' is 'or'. 'It is not cold and not raining' is not the negation of 'It is cold and raining'.",
        },
        {
          title: "Naming no rule",
          body: "When the question says 'stating the rules used', each line needs its rule in brackets. The rule names carry marks.",
        },
      ],
    },
  ],
};

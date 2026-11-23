import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_ML_CONVERSE_NOTE: SubtopicNote = {
  subtopicName: "Converse, Inverse and Contrapositive",
  title: "Converse, Inverse and Contrapositive",
  oneLineDefinition:
    "The three statements made from a conditional by swapping and negating its parts, which of them mean the same thing, and how to write a conditional without 'if ... then'.",
  whyItMatters:
    "19 questions. Six were set in board papers: the converse, inverse or contrapositive of a sentence in words (2015, 2018, 2020 and 2023), the inverse of a statement pattern (2025, an MCQ) and the converse of a contrapositive (2026, an MCQ). The textbook adds six conditionals in words to turn into their converse, inverse and contrapositive, and rewriting a conditional without 'if ... then'.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmml-three-relatives",
      name: "Converse, inverse and contrapositive in words",
      intuition:
        "From 'if p then q' you can make three new statements: swap the parts (converse), negate the parts (inverse), or do both (contrapositive). Only the contrapositive always says the same thing as the original. 'If it is a cow, it has four legs' is true, and so is 'if it does not have four legs, it is not a cow'; but 'if it has four legs, it is a cow' is false.",
      definition:
        "For the conditional \\(p \\to q\\):\n" +
        "- \\(q \\to p\\) is its **converse**.\n" +
        "- \\(\\sim p \\to \\sim q\\) is its **inverse**.\n" +
        "- \\(\\sim q \\to \\sim p\\) is its **contrapositive**.\n" +
        "- A conditional and its contrapositive have the same truth table: \\(p \\to q \\equiv \\sim q \\to \\sim p\\). The converse and the inverse are equivalent to each other, but not to the original.\n" +
        "- A sentence written 'q if p' is the conditional 'if p then q'. Rewrite it in that order before you start.",
      formula: {
        label: "The three relatives of p → q",
        latex: "\\text{converse: } q \\to p, \\qquad \\text{inverse: } \\sim p \\to \\sim q, \\qquad \\text{contrapositive: } \\sim q \\to \\sim p",
      },
      authoredExample: {
        prompt: "Write the converse, inverse and contrapositive of: 'If a number is divisible by 4, then it is even.'",
        steps: [
          "Let p: a number is divisible by 4; q: it is even. The given statement is \\(p \\to q\\).",
          "Converse \\((q \\to p)\\): If a number is even, then it is divisible by 4.",
          "Inverse \\((\\sim p \\to \\sim q)\\): If a number is not divisible by 4, then it is not even.",
          "Contrapositive \\((\\sim q \\to \\sim p)\\): If a number is not even, then it is not divisible by 4.",
          "Check: the original and the contrapositive are true; the converse and the inverse are false (6 is even but not divisible by 4).",
        ],
        answer: "Converse, inverse and contrapositive as above",
      },
      selfCheckExample: {
        prompt: "Write the contrapositive of 'If it is Diwali, then the school is closed.'",
        steps: [
          "Let p: it is Diwali; q: the school is closed. The contrapositive is \\(\\sim q \\to \\sim p\\).",
        ],
        answer: "If the school is not closed, then it is not Diwali",
      },
      practiceSet: [
        { prompt: "Which of the converse, inverse and contrapositive is equivalent to \\(p \\to q\\)?", answer: "The contrapositive" },
        { prompt: "Which two of the three are equivalent to each other?", answer: "The converse and the inverse" },
        { prompt: "Write the converse of 'If \\(x = 3\\), then \\(x^2 = 9\\).'", answer: "If \\(x^2 = 9\\), then \\(x = 3\\)" },
      ],
      pyqExampleId: "6e3e8dda-c9c8-47cd-9858-a5904c678b88",
      traps: [
        {
          title: "Swapping the names converse and inverse",
          body: "Converse swaps the parts; inverse negates them; contrapositive does both. Write the symbolic form beside each answer so the examiner sees which is which.",
        },
        {
          title: "Negating 'less than' as 'greater than'",
          body: "The negation of \\(x < y\\) is \\(x \\geq y\\), not \\(x > y\\). The equal case belongs to the negation.",
        },
        {
          title: "Taking 'q if p' in the written order",
          body: "In 'A family becomes literate if the woman in it is literate', the antecedent is 'the woman is literate'. Rewrite it as 'if ... then' first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmml-relatives-patterns",
      name: "Relatives of a statement pattern",
      intuition:
        "When the parts of a conditional are themselves patterns, treat each part as one block, A and B. Form the converse, inverse or contrapositive of \\(A \\to B\\), and only then open the blocks with De Morgan's laws. For stacked questions ('the converse of the contrapositive'), do one operation at a time.",
      definition:
        "- Write the given pattern as \\(A \\to B\\), with A and B the whole antecedent and consequent.\n" +
        "- Converse \\(B \\to A\\); inverse \\(\\sim A \\to \\sim B\\); contrapositive \\(\\sim B \\to \\sim A\\).\n" +
        "- Simplify each negation with De Morgan's laws and \\(\\sim(\\sim p) \\equiv p\\).\n" +
        "- Stacked operations: the converse of the contrapositive is the inverse; the contrapositive of the contrapositive is the original statement.",
      authoredExample: {
        prompt: "Write the contrapositive of \\((p \\land q) \\to \\sim r\\).",
        steps: [
          "Here \\(A \\equiv p \\land q\\) and \\(B \\equiv \\sim r\\). The contrapositive of \\(A \\to B\\) is \\(\\sim B \\to \\sim A\\).",
          "\\(\\sim B \\equiv \\sim(\\sim r) \\equiv r\\).",
          "\\(\\sim A \\equiv \\sim(p \\land q) \\equiv \\sim p \\lor \\sim q\\)   [De Morgan's law]",
        ],
        answer: "\\(r \\to (\\sim p \\lor \\sim q)\\)",
      },
      selfCheckExample: {
        prompt: "What is the inverse of the converse of \\(p \\to q\\)?",
        steps: ["The converse of \\(p \\to q\\) is \\(q \\to p\\).", "The inverse of \\(q \\to p\\) is \\(\\sim q \\to \\sim p\\)."],
        answer: "\\(\\sim q \\to \\sim p\\), which is the contrapositive of the original",
      },
      practiceSet: [
        { prompt: "Write the converse of \\(\\sim p \\to q\\).", answer: "\\(q \\to \\sim p\\)" },
        { prompt: "Write the contrapositive of \\(p \\to \\sim q\\).", answer: "\\(q \\to \\sim p\\)" },
        { prompt: "Write the inverse of \\((p \\lor q) \\to r\\).", answer: "\\((\\sim p \\land \\sim q) \\to \\sim r\\)" },
      ],
      pyqExampleId: "35974e06-8188-4962-97a1-ae840af1a5b8",
      traps: [
        {
          title: "Negating only one letter of a block",
          body: "The negation of \\(p \\lor q\\) is \\(\\sim p \\land \\sim q\\), not \\(\\sim p \\lor q\\). Negate the whole block, then use De Morgan's law.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmml-without-if-then",
      name: "Writing a conditional without 'if ... then'",
      intuition:
        "'If p then q' fails only when p happens and q does not. 'Not p, or q' fails in exactly the same case. So any conditional can be said with 'or' instead of 'if ... then'.",
      definition:
        "- **Conditional law:** \\(p \\to q \\equiv \\sim p \\lor q\\).\n" +
        "- To rewrite in words: negate the antecedent, write 'or', then write the consequent as it is.\n" +
        "- Define p and q first and show the law: 'Let p: ..., q: .... The statement is \\(p \\to q \\equiv \\sim p \\lor q\\).'",
      formula: {
        label: "Conditional law",
        latex: "p \\to q \\equiv \\sim p \\lor q",
      },
      authoredExample: {
        prompt: "Rewrite the following statement without using 'if ... then': 'If a quadrilateral is a square, then it is a rectangle.'",
        steps: [
          "Let p: a quadrilateral is a square; q: it is a rectangle. The statement is \\(p \\to q\\).",
          "\\(p \\to q \\equiv \\sim p \\lor q\\)   [Conditional law]",
        ],
        answer: "A quadrilateral is not a square or it is a rectangle",
      },
      selfCheckExample: {
        prompt: "Rewrite without 'if ... then': 'If you work hard, then you will succeed.'",
        steps: ["Let p: you work hard; q: you will succeed. \\(p \\to q \\equiv \\sim p \\lor q\\)."],
        answer: "You do not work hard or you will succeed",
      },
      practiceSet: [
        { prompt: "Write \\(p \\to q\\) using only \\(\\sim\\) and \\(\\lor\\).", answer: "\\(\\sim p \\lor q\\)" },
        { prompt: "Rewrite without 'if ... then': 'If \\(x = 2\\), then \\(x^2 = 4\\).'", answer: "\\(x \\neq 2\\) or \\(x^2 = 4\\)" },
      ],
      pyqExampleId: "c3b57988-6883-46c4-937e-3bc9a569ef07",
      traps: [
        {
          title: "Negating the consequent instead of the antecedent",
          body: "\\(p \\to q\\) becomes \\(\\sim p \\lor q\\). Writing \\(p \\lor \\sim q\\) gives a statement that means 'if q then p'.",
        },
      ],
    },
  ],
};

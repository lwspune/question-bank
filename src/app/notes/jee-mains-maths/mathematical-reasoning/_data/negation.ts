import type { SubtopicNote } from "@/app/notes/_types";

export const NEGATION_MR_NOTE: SubtopicNote = {
  subtopicName: "Negation and Simplification",
  title: "Negation and Simplification",
  oneLineDefinition:
    "Negate an implication, a biconditional or an and/or combination, and reduce a long statement to a short equivalent one.",
  whyItMatters:
    "Nineteen PYQs, all multiple choice. Seven negate an implication or a biconditional, five negate an and/or combination with De Morgan's laws, and seven reduce a statement to a shorter equivalent. Three ideas cover the page.",
  concepts: [
    // C1 — negating an implication
    {
      kind: "formula" as const,
      slug: "jmr-negate-implication",
      name: "Negating an implication",
      intuition:
        "An implication is false only when the antecedent is true and the consequent false. So its negation is exactly that case: \\(\\sim(A\\rightarrow B)\\equiv A\\wedge\\sim B\\). It is an 'and', not another implication. A biconditional is false when its two sides differ, so its negation is \\(A\\leftrightarrow\\sim B\\).",
      definition:
        "- \\(\\sim(A\\rightarrow B)\\equiv A\\wedge\\sim B\\).\n" +
        "- \\(\\sim(A\\leftrightarrow B)\\equiv A\\leftrightarrow\\sim B\\equiv(A\\wedge\\sim B)\\vee(\\sim A\\wedge B)\\).\n" +
        "- Simplify the inside first: if the antecedent is a tautology, \\(T\\rightarrow A\\equiv A\\).",
      formula: {
        label: "Negation of an implication",
        latex: "\\sim(A\\rightarrow B)\\equiv A\\wedge\\sim B",
      },
      authoredExample: {
        prompt: "Negate \\((p\\wedge q)\\rightarrow\\sim r\\).",
        steps: [
          "Here \\(A=p\\wedge q\\) and \\(B=\\sim r\\), so \\(\\sim B=r\\).",
          "\\(A\\wedge\\sim B=p\\wedge q\\wedge r\\).",
          "Check: the original is false only at \\(p=q=r=T\\), the one row where \\(p\\wedge q\\wedge r\\) is true.",
        ],
        answer: "\\(p\\wedge q\\wedge r\\).",
      },
      selfCheckExample: {
        prompt: "Negate \\((p\\rightarrow q)\\rightarrow r\\).",
        steps: [
          "\\(\\sim(A\\rightarrow r)\\equiv A\\wedge\\sim r\\) with \\(A=p\\rightarrow q\\).",
          "\\(A\\equiv\\sim p\\vee q\\).",
        ],
        answer: "\\((\\sim p\\vee q)\\wedge\\sim r\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sim(p\\rightarrow q)\\)?", answer: "\\(p\\wedge\\sim q\\)" },
        { prompt: "\\(\\sim(\\sim p\\rightarrow q)\\)?", answer: "\\(\\sim p\\wedge\\sim q\\)" },
        { prompt: "\\(\\sim(p\\leftrightarrow q)\\)?", answer: "\\(p\\leftrightarrow\\sim q\\)" },
        { prompt: "\\(\\sim(p\\rightarrow\\sim q)\\)?", answer: "\\(p\\wedge q\\)" },
      ],
      pyqExampleId: "52246fdc-90af-4e43-b808-cf8df62e73f4", // 13 Apr 2023 — negate an implication whose antecedent is a tautology
      traps: [
        {
          title: "Not the converse, not the inverse",
          body: "\\(\\sim(p\\rightarrow q)\\) is neither \\(\\sim p\\rightarrow\\sim q\\) nor \\(q\\rightarrow p\\). Each of those is true in three rows; \\(p\\wedge\\sim q\\) is true in only one.",
        },
      ],
    },

    // C2 — De Morgan
    {
      kind: "formula" as const,
      slug: "jmr-de-morgan",
      name: "De Morgan's laws",
      intuition:
        "To negate an and/or combination, push the \\(\\sim\\) inward: each \\(\\wedge\\) becomes \\(\\vee\\), each \\(\\vee\\) becomes \\(\\wedge\\), and each letter flips. Then tidy with the distributive law, which often pulls out a common letter and matches an option.",
      definition:
        "- \\(\\sim(A\\wedge B)\\equiv\\sim A\\vee\\sim B\\) and \\(\\sim(A\\vee B)\\equiv\\sim A\\wedge\\sim B\\).\n" +
        "- \\(\\sim(\\sim A)\\equiv A\\).\n" +
        "- Distributive law: \\((A\\wedge B)\\vee(A\\wedge C)\\equiv A\\wedge(B\\vee C)\\), and the same with \\(\\wedge,\\vee\\) swapped.",
      formula: {
        label: "De Morgan's laws",
        latex: "\\sim(A\\wedge B)\\equiv\\sim A\\vee\\sim B,\\qquad\\sim(A\\vee B)\\equiv\\sim A\\wedge\\sim B",
      },
      authoredExample: {
        prompt: "Negate \\((p\\wedge q)\\vee(p\\wedge r)\\) and simplify.",
        steps: [
          "Factor first: \\((p\\wedge q)\\vee(p\\wedge r)\\equiv p\\wedge(q\\vee r)\\).",
          "Negate: \\(\\sim p\\vee\\sim(q\\vee r)\\equiv\\sim p\\vee(\\sim q\\wedge\\sim r)\\).",
        ],
        answer: "\\(\\sim p\\vee(\\sim q\\wedge\\sim r)\\).",
      },
      selfCheckExample: {
        prompt: "Negate \\(\\sim p\\vee(q\\wedge\\sim r)\\).",
        steps: [
          "\\(\\sim(\\sim p)\\equiv p\\), and \\(\\sim(q\\wedge\\sim r)\\equiv\\sim q\\vee r\\).",
          "The \\(\\vee\\) between the two parts becomes \\(\\wedge\\).",
        ],
        answer: "\\(p\\wedge(\\sim q\\vee r)\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sim(p\\vee\\sim q)\\)?", answer: "\\(\\sim p\\wedge q\\)" },
        { prompt: "\\(\\sim(\\sim p\\wedge\\sim q)\\)?", answer: "\\(p\\vee q\\)" },
        { prompt: "\\(\\sim(p\\wedge q\\wedge r)\\)?", answer: "\\(\\sim p\\vee\\sim q\\vee\\sim r\\)" },
        { prompt: "\\(\\sim(p\\vee(q\\wedge r))\\)?", answer: "\\(\\sim p\\wedge(\\sim q\\vee\\sim r)\\)" },
      ],
      pyqExampleId: "7ffde20b-4b1c-4ad8-a8ef-260c84cd52f0", // 10 Apr 2023 — negate an and of two ors
      traps: [
        {
          title: "Flip the connective too",
          body: "Negating only the letters turns \\(\\sim(p\\wedge q)\\) into \\(\\sim p\\wedge\\sim q\\), which is wrong: at \\(p=T,\\ q=F\\) the true negation holds and this does not. The connective must flip as well.",
        },
      ],
    },

    // C3 — simplify
    {
      kind: "formula" as const,
      slug: "jmr-simplify",
      name: "Simplifying to a short equivalent",
      intuition:
        "Long statements in these questions usually reduce to two or three letters. Rewrite every \\(\\rightarrow\\) as \\(\\sim A\\vee B\\), apply De Morgan's laws, then collapse with absorption and the complement laws. When the options are short, a four-row truth table is just as fast: find the rows where the statement is true and match them.",
      definition:
        "- Absorption: \\(p\\vee(p\\wedge q)\\equiv p\\) and \\(p\\wedge(p\\vee q)\\equiv p\\).\n" +
        "- Complement: \\(p\\wedge\\sim p\\equiv F\\) and \\(p\\vee\\sim p\\equiv T\\); then \\(X\\wedge F\\equiv F\\) and \\(X\\vee F\\equiv X\\).\n" +
        "- \\((p\\wedge q)\\vee(\\sim p\\wedge q)\\equiv q\\).",
      formula: {
        label: "Absorption",
        latex: "p\\vee(p\\wedge q)\\equiv p,\\qquad p\\wedge(p\\vee q)\\equiv p",
      },
      authoredExample: {
        prompt: "Simplify \\(\\sim(p\\rightarrow q)\\vee(p\\wedge q)\\).",
        steps: [
          "\\(\\sim(p\\rightarrow q)\\equiv p\\wedge\\sim q\\).",
          "\\((p\\wedge\\sim q)\\vee(p\\wedge q)\\equiv p\\wedge(\\sim q\\vee q)\\equiv p\\wedge T\\).",
        ],
        answer: "\\(p\\).",
      },
      selfCheckExample: {
        prompt: "Simplify \\((p\\vee q)\\wedge\\sim p\\).",
        steps: [
          "Distribute: \\((p\\wedge\\sim p)\\vee(q\\wedge\\sim p)\\).",
          "\\(p\\wedge\\sim p\\equiv F\\), and \\(F\\vee X\\equiv X\\).",
        ],
        answer: "\\(\\sim p\\wedge q\\).",
      },
      practiceSet: [
        { prompt: "\\(p\\vee(p\\wedge q)\\)?", answer: "\\(p\\)" },
        { prompt: "\\(p\\wedge(\\sim p\\vee q)\\)?", answer: "\\(p\\wedge q\\)" },
        { prompt: "\\((p\\wedge q)\\vee(\\sim p\\wedge q)\\)?", answer: "\\(q\\)" },
        { prompt: "\\(\\sim p\\rightarrow p\\)?", answer: "\\(p\\)" },
      ],
      pyqExampleId: "b1975270-3970-4559-8691-67f1762c43f2", // 10 Apr 2023 — a negation that reduces to a contradiction
      traps: [
        {
          title: "Check one row before choosing",
          body: "Slips are easy with five or six connectives. Before choosing, evaluate the original and your answer at one row, say all letters true. If they disagree, the working has an error.",
        },
      ],
    },
  ],
};

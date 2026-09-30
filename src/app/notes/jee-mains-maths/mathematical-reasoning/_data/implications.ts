import type { SubtopicNote } from "@/app/notes/_types";

export const IMPLICATIONS_MR_NOTE: SubtopicNote = {
  subtopicName: "Implications, Converse and Statements in Words",
  title: "Implications, Converse and Statements in Words",
  oneLineDefinition:
    "Rewrite an implication in an equivalent form, form its converse and contrapositive, and turn English statements, including 'only if' and 'for all', into symbols.",
  whyItMatters:
    "Fifteen PYQs, all multiple choice. Eight ask which form is equivalent to a given implication; seven form a converse or contrapositive, or turn an English statement into symbols and negate it. Two ideas cover the page.",
  concepts: [
    // C1 — equivalent forms
    {
      kind: "formula" as const,
      slug: "jmr-implication-forms",
      name: "Equivalent forms of an implication",
      intuition:
        "Every implication is \\(\\sim A\\vee B\\), so two implications are equivalent when their or-forms match. From this come the forms JEE uses: the contrapositive, moving a condition from the consequent into the antecedent, and joining two implications that share a consequent or an antecedent.",
      definition:
        "- \\(A\\rightarrow B\\equiv\\sim A\\vee B\\equiv\\sim B\\rightarrow\\sim A\\) (the contrapositive).\n" +
        "- \\(A\\rightarrow(B\\rightarrow C)\\equiv(A\\wedge B)\\rightarrow C\\).\n" +
        "- \\((A\\rightarrow C)\\wedge(B\\rightarrow C)\\equiv(A\\vee B)\\rightarrow C\\).\n" +
        "- \\((A\\rightarrow B)\\wedge(A\\rightarrow C)\\equiv A\\rightarrow(B\\wedge C)\\).",
      formula: {
        label: "Or-form of an implication",
        latex: "A\\rightarrow B\\equiv\\sim A\\vee B\\equiv\\sim B\\rightarrow\\sim A",
      },
      authoredExample: {
        prompt: "Which is equivalent to \\(p\\rightarrow(q\\rightarrow r)\\): \\((p\\wedge q)\\rightarrow r\\) or \\((p\\rightarrow q)\\rightarrow r\\)?",
        steps: [
          "\\(p\\rightarrow(q\\rightarrow r)\\equiv\\sim p\\vee\\sim q\\vee r\\equiv\\sim(p\\wedge q)\\vee r\\equiv(p\\wedge q)\\rightarrow r\\).",
          "At \\(p=q=r=F\\), the other form is \\(T\\rightarrow F=F\\), while the original is true.",
        ],
        answer: "\\((p\\wedge q)\\rightarrow r\\).",
      },
      selfCheckExample: {
        prompt: "Is \\((p\\rightarrow q)\\wedge(p\\rightarrow r)\\) equivalent to \\(p\\rightarrow(q\\wedge r)\\)?",
        steps: [
          "\\((\\sim p\\vee q)\\wedge(\\sim p\\vee r)\\equiv\\sim p\\vee(q\\wedge r)\\) by the distributive law.",
          "That is \\(p\\rightarrow(q\\wedge r)\\).",
        ],
        answer: "Yes.",
      },
      practiceSet: [
        { prompt: "Contrapositive of \\(p\\rightarrow\\sim q\\)?", answer: "\\(q\\rightarrow\\sim p\\)" },
        { prompt: "\\(\\sim p\\rightarrow q\\) as an 'or'?", answer: "\\(p\\vee q\\)" },
        { prompt: "\\((p\\rightarrow r)\\vee(q\\rightarrow r)\\)?", answer: "\\((p\\wedge q)\\rightarrow r\\)" },
        { prompt: "\\(p\\rightarrow(p\\wedge q)\\)?", answer: "\\(p\\rightarrow q\\)" },
      ],
      pyqExampleId: "7132d223-0761-4e42-93ac-390462536135", // 6 Apr 2023 — two implications with the same consequent
      traps: [
        {
          title: "An 'or' of implications gives an 'and' on the left",
          body: "\\((p\\rightarrow r)\\vee(q\\rightarrow r)\\) is \\((p\\wedge q)\\rightarrow r\\), not \\((p\\vee q)\\rightarrow r\\). It is \\(\\sim p\\vee\\sim q\\vee r\\), and \\(\\sim p\\vee\\sim q\\equiv\\sim(p\\wedge q)\\).",
        },
      ],
    },

    // C2 — converse, contrapositive, words
    {
      kind: "formula" as const,
      slug: "jmr-words",
      name: "Converse, contrapositive and statements in words",
      intuition:
        "For \\(p\\rightarrow q\\), the converse swaps the parts, \\(q\\rightarrow p\\). The contrapositive swaps and negates, \\(\\sim q\\rightarrow\\sim p\\), and it is the only one of these equivalent to the original. In words, 'if p then q', 'p only if q' and 'q if p' all mean \\(p\\rightarrow q\\). To negate 'for all', say 'there exists' and negate the condition.",
      definition:
        "- Converse: \\(q\\rightarrow p\\). Inverse: \\(\\sim p\\rightarrow\\sim q\\). Contrapositive: \\(\\sim q\\rightarrow\\sim p\\).\n" +
        "- 'p only if q' is \\(p\\rightarrow q\\); 'p if and only if q' is \\(p\\leftrightarrow q\\).\n" +
        "- The negation of 'for all x, P(x)' is 'there exists x with \\(\\sim P(x)\\)', and the other way round.",
      formula: {
        label: "The related statements",
        latex: "p\\rightarrow q\\equiv\\sim q\\rightarrow\\sim p,\\qquad q\\rightarrow p\\equiv\\sim p\\rightarrow\\sim q",
      },
      authoredExample: {
        prompt: "Write the converse and the contrapositive of 'If it rains, the match is cancelled.'",
        steps: [
          "Let \\(p\\): it rains, and \\(q\\): the match is cancelled. The statement is \\(p\\rightarrow q\\).",
          "Converse \\(q\\rightarrow p\\): if the match is cancelled, it rains.",
          "Contrapositive \\(\\sim q\\rightarrow\\sim p\\): if the match is not cancelled, it does not rain.",
        ],
        answer: "Only the contrapositive means the same as the original.",
      },
      selfCheckExample: {
        prompt: "Negate 'Every student in the class passed.'",
        steps: [
          "'For every student, the student passed' negates to 'there is a student who did not pass'.",
        ],
        answer: "Some student in the class did not pass.",
      },
      practiceSet: [
        { prompt: "Converse of \\(\\sim p\\rightarrow q\\)?", answer: "\\(q\\rightarrow\\sim p\\)" },
        { prompt: "Contrapositive of \\(p\\rightarrow(q\\wedge r)\\)?", answer: "\\((\\sim q\\vee\\sim r)\\rightarrow\\sim p\\)" },
        { prompt: "'p only if q' in symbols?", answer: "\\(p\\rightarrow q\\)" },
        { prompt: "Negation of 'Some prime is even'?", answer: "No prime is even." },
      ],
      pyqExampleId: "4a7c418b-8a10-42a3-adb3-7c20d56244b1", // 11 Apr 2023 — the converse, written as its contrapositive
      traps: [
        {
          title: "'Only if' points forward",
          body: "'p only if q' is \\(p\\rightarrow q\\), not \\(q\\rightarrow p\\). It says p cannot happen without q; it does not say that q forces p.",
        },
      ],
    },
  ],
};

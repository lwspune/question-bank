import type { SubtopicNote } from "@/app/notes/_types";

export const TRUTH_TABLES_MR_NOTE: SubtopicNote = {
  subtopicName: "Truth Values, Tautologies and Contradictions",
  title: "Truth Values, Tautologies and Contradictions",
  oneLineDefinition:
    "Decide when a compound statement is true or false: find the one row that makes an implication false, and test whether a statement is always true or always false.",
  whyItMatters:
    "Twenty-two PYQs, twenty of them multiple choice. Seven find the row that makes an implication false or count the rows where a statement is true, eight pick the tautology from four options, and seven judge two claims that a statement is a tautology or a contradiction. Three ideas cover the page.",
  concepts: [
    // C1 — the false case of an implication
    {
      kind: "formula" as const,
      slug: "jmr-false-case",
      name: "The one row where an implication is false",
      intuition:
        "An implication \\(A\\rightarrow B\\) is false in exactly one case: \\(A\\) true and \\(B\\) false. So to find where a long implication fails, set the consequent false first; that usually fixes some letters at once. Then make the antecedent true with what is left. To count the true rows, count the false ones and subtract from \\(2^n\\).",
      definition:
        "- \\(A\\rightarrow B\\) is false only when \\(A=T\\) and \\(B=F\\).\n" +
        "- \\(A\\vee B\\) is false only when both are false; \\(A\\wedge B\\) is true only when both are true.\n" +
        "- \\(A\\leftrightarrow B\\) (A if and only if B) is true exactly when \\(A\\) and \\(B\\) have the same truth value.\n" +
        "- \\(\\equiv\\) reads 'is logically equivalent to': \\(P\\equiv Q\\) when \\(P\\) and \\(Q\\) have the same truth value in every row.\n" +
        "- \\(n\\) letters give \\(2^n\\) rows, and true rows \\(=2^n-\\) false rows.",
      formula: {
        label: "When an implication is false",
        latex: "A\\rightarrow B\\equiv\\sim A\\vee B,\\quad\\text{false only at }A=T,\\ B=F",
      },
      authoredExample: {
        prompt: "In how many of the eight rows is \\((p\\rightarrow q)\\rightarrow(p\\wedge r)\\) true?",
        steps: [
          "It is false when \\(p\\rightarrow q\\) is true and \\(p\\wedge r\\) is false.",
          "If \\(p=F\\): \\(p\\rightarrow q\\) is true and \\(p\\wedge r\\) is false for all four choices of \\(q,r\\). That is 4 false rows.",
          "If \\(p=T\\): \\(p\\rightarrow q\\) needs \\(q=T\\), and \\(p\\wedge r\\) false needs \\(r=F\\). That is 1 false row.",
          "False rows: 5, so true rows: \\(8-5=3\\).",
        ],
        answer: "3 rows.",
      },
      selfCheckExample: {
        prompt: "Find the only row that makes \\((p\\wedge\\sim q)\\rightarrow r\\) false.",
        steps: [
          "The consequent must be false: \\(r=F\\).",
          "The antecedent must be true: \\(p=T\\) and \\(\\sim q=T\\), so \\(q=F\\).",
        ],
        answer: "\\(p=T,\\ q=F,\\ r=F\\).",
      },
      practiceSet: [
        { prompt: "\\(T\\rightarrow F\\)?", answer: "\\(F\\)" },
        { prompt: "\\(F\\rightarrow F\\)?", answer: "\\(T\\)" },
        { prompt: "How many rows for four letters?", answer: "\\(16\\)" },
        { prompt: "In how many of its 8 rows is \\(p\\rightarrow(q\\vee r)\\) false?", answer: "1 (at \\(p=T,\\ q=F,\\ r=F\\))" },
      ],
      pyqExampleId: "98f7928e-8329-4e92-b37b-4591cec87372", // 29 Jan 2023 — the row that makes an implication false
      traps: [
        {
          title: "A false antecedent makes it true",
          body: "\\(F\\rightarrow B\\) is true whatever \\(B\\) is. A row with a false consequent is not a false row unless the antecedent is true there too. Only true-then-false breaks an implication.",
        },
      ],
    },

    // C2 — which statement is a tautology
    {
      kind: "formula" as const,
      slug: "jmr-tautology",
      name: "Testing for a tautology",
      intuition:
        "A tautology is true in every row. The fast test: rewrite each implication as \\(\\sim A\\vee B\\) and look for a letter and its negation joined by \\(\\vee\\). Since \\(p\\vee\\sim p\\) is always true, so is any disjunction that contains it. Or try to make the statement false: if the attempt forces a letter to be both true and false, there is no false row.",
      definition:
        "- Tautology: true in every row. Contradiction (fallacy): false in every row.\n" +
        "- \\(p\\vee\\sim p\\) is a tautology; \\(p\\wedge\\sim p\\) is a contradiction.\n" +
        "- The negation of a tautology is a contradiction, and the other way round.\n" +
        "- Two standard tautologies: \\((p\\wedge(p\\rightarrow q))\\rightarrow q\\) and \\(((p\\rightarrow q)\\wedge\\sim q)\\rightarrow\\sim p\\).",
      formula: {
        label: "The tautology test",
        latex: "A\\rightarrow B\\equiv\\sim A\\vee B,\\qquad p\\vee\\sim p\\equiv T,\\qquad p\\wedge\\sim p\\equiv F",
      },
      authoredExample: {
        prompt: "Is \\((p\\rightarrow q)\\rightarrow(\\sim q\\rightarrow\\sim p)\\) a tautology?",
        steps: [
          "\\(\\sim q\\rightarrow\\sim p\\equiv q\\vee\\sim p\\equiv p\\rightarrow q\\).",
          "So the statement is \\(X\\rightarrow X\\) with \\(X=p\\rightarrow q\\), which is \\(\\sim X\\vee X\\).",
        ],
        answer: "Yes, a tautology.",
      },
      selfCheckExample: {
        prompt: "Is \\((p\\wedge q)\\rightarrow(p\\vee r)\\) a tautology?",
        steps: [
          "Try to make it false. \\(p\\vee r\\) false needs \\(p=F\\).",
          "Then \\(p\\wedge q\\) is false, so the antecedent cannot be true. No false row exists.",
        ],
        answer: "Yes, a tautology.",
      },
      practiceSet: [
        { prompt: "\\(p\\vee\\sim p\\)?", answer: "Tautology" },
        { prompt: "\\(p\\wedge\\sim p\\)?", answer: "Contradiction" },
        { prompt: "\\(p\\rightarrow(p\\vee q)\\)?", answer: "Tautology" },
        { prompt: "\\((p\\vee q)\\rightarrow p\\)?", answer: "Neither: false at \\(p=F,\\ q=T\\)" },
      ],
      pyqExampleId: "ca4e7b91-fef2-4bba-8c15-ae244e1dc82d", // 1 Feb 2023 — pick the tautology
      traps: [
        {
          title: "Neither is a third answer",
          body: "A statement that is not a tautology need not be a contradiction. \\(p\\rightarrow q\\) is true in three rows and false in one: it is neither.",
        },
      ],
    },

    // C3 — judging (S1) and (S2)
    {
      kind: "formula" as const,
      slug: "jmr-two-statements",
      name: "Judging two claims, (S1) and (S2)",
      intuition:
        "These questions make two claims, each saying a statement is a tautology or a contradiction. Judge each claim on its own: reduce the statement, then compare it with the claim. The claim 'tautology' fails as soon as one false row appears; the claim 'contradiction' fails as soon as one true row appears.",
      definition:
        "- Reduce each statement with \\(A\\rightarrow B\\equiv\\sim A\\vee B\\) and De Morgan's laws.\n" +
        "- To refute 'tautology', find one false row. To refute 'contradiction', find one true row.\n" +
        "- \\(X\\vee\\sim X\\) is always true and \\(X\\wedge\\sim X\\) always false, however long \\(X\\) is.",
      formula: {
        label: "A statement and its negation",
        latex: "X\\vee\\sim X\\equiv T,\\qquad X\\wedge\\sim X\\equiv F",
      },
      authoredExample: {
        prompt: "(S1): \\((p\\wedge q)\\rightarrow p\\) is a tautology. (S2): \\((p\\vee q)\\wedge\\sim p\\) is a contradiction. Which claims are correct?",
        steps: [
          "(S1): if \\(p\\wedge q\\) is true, \\(p\\) is true, so there is no false row. The claim is correct.",
          "(S2): at \\(p=F,\\ q=T\\), \\((p\\vee q)\\wedge\\sim p=T\\wedge T=T\\). One true row, so it is not a contradiction. The claim is wrong.",
        ],
        answer: "Only (S1) is correct.",
      },
      selfCheckExample: {
        prompt: "(S1): \\(p\\rightarrow(q\\rightarrow p)\\) is a tautology. (S2): \\((p\\vee\\sim q)\\wedge(\\sim p\\wedge q)\\) is a contradiction. Which claims are correct?",
        steps: [
          "(S1): \\(\\sim p\\vee\\sim q\\vee p\\) contains \\(p\\vee\\sim p\\), so it is a tautology.",
          "(S2): \\(\\sim p\\wedge q\\equiv\\sim(p\\vee\\sim q)\\), so the statement is \\(X\\wedge\\sim X\\), a contradiction.",
        ],
        answer: "Both are correct.",
      },
      practiceSet: [
        { prompt: "Claim: \\(p\\wedge\\sim p\\) is a tautology. Correct?", answer: "No: it is a contradiction" },
        { prompt: "\\((p\\wedge q)\\vee\\sim(p\\wedge q)\\)?", answer: "Tautology" },
        { prompt: "One true row refutes which claim?", answer: "That the statement is a contradiction" },
        { prompt: "\\(p\\leftrightarrow\\sim p\\)?", answer: "Contradiction" },
      ],
      pyqExampleId: "37a49344-eaea-4e63-9228-86f1df65ced4", // 31 Jan 2023 — judge (S1) and (S2)
      traps: [
        {
          title: "Judge the claim, not only the statement",
          body: "Each claim names a type. A statement that is a tautology makes the claim 'it is a contradiction' wrong. Settle what the statement is first, then compare it with the type the claim names.",
        },
      ],
    },
  ],
};

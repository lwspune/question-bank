import type { SubtopicNote } from "@/app/notes/_types";

export const CONNECTIVES_MR_NOTE: SubtopicNote = {
  subtopicName: "Unknown Connectives and Missing Statements",
  title: "Unknown Connectives and Missing Statements",
  oneLineDefinition:
    "Find which connective, or which of p, q, ∼p and ∼q, makes a statement a tautology or equal to a given one.",
  whyItMatters:
    "Eleven PYQs, all multiple choice. Eight ask which connective in place of a symbol such as Δ or ∇ makes a statement a tautology; three ask which of p, q, ∼p and ∼q to put in place of r. Two ideas cover the page.",
  concepts: [
    // C1 — choose the connective
    {
      kind: "formula" as const,
      slug: "jmr-choose-connective",
      name: "Choosing the connective",
      intuition:
        "The unknown symbol is one of \\(\\wedge,\\vee,\\rightarrow,\\leftrightarrow\\), so there are at most four cases, or four pairs when there are two symbols. Test each case for a false row; one false row rules it out. A tautology usually needs a \\(\\vee\\) or a \\(\\rightarrow\\) that joins a statement with its own negation.",
      definition:
        "- Test the options, not every case: each option fixes the symbols.\n" +
        "- One false row rules a case out.\n" +
        "- \\(A\\wedge B\\) is a tautology only if both \\(A\\) and \\(B\\) are.",
      formula: {
        label: "The four connectives",
        latex: "p\\wedge q,\\quad p\\vee q,\\quad p\\rightarrow q\\equiv\\sim p\\vee q,\\quad p\\leftrightarrow q\\equiv(p\\rightarrow q)\\wedge(q\\rightarrow p)",
      },
      authoredExample: {
        prompt: "Let \\(\\Delta,\\nabla\\in\\{\\wedge,\\vee\\}\\). For how many pairs \\((\\Delta,\\nabla)\\) is \\((p\\Delta q)\\rightarrow(p\\nabla q)\\) a tautology?",
        steps: [
          "\\((\\wedge,\\wedge)\\) and \\((\\vee,\\vee)\\) give \\(X\\rightarrow X\\): both tautologies.",
          "\\((\\wedge,\\vee)\\): when \\(p\\wedge q\\) is true, \\(p\\vee q\\) is true. A tautology.",
          "\\((\\vee,\\wedge)\\): at \\(p=T,\\ q=F\\), it is \\(T\\rightarrow F=F\\). Not a tautology.",
        ],
        answer: "3 pairs.",
      },
      selfCheckExample: {
        prompt: "Let \\(*\\in\\{\\wedge,\\vee,\\rightarrow\\}\\). For which \\(*\\) is \\((p*q)\\rightarrow p\\) a tautology?",
        steps: [
          "\\(\\wedge\\): when \\(p\\wedge q\\) is true, \\(p\\) is true. A tautology.",
          "\\(\\vee\\): at \\(p=F,\\ q=T\\), it is \\(T\\rightarrow F\\). Not a tautology.",
          "\\(\\rightarrow\\): at \\(p=F\\), \\(p\\rightarrow q\\) is true, so it is \\(T\\rightarrow F\\). Not a tautology.",
        ],
        answer: "Only \\(*=\\wedge\\).",
      },
      practiceSet: [
        { prompt: "\\(p\\,?\\,\\sim p\\) is a tautology for which \\(?\\in\\{\\wedge,\\vee\\}\\)?", answer: "\\(\\vee\\)" },
        { prompt: "\\(p\\,?\\,p\\) is a tautology for which \\(?\\in\\{\\wedge,\\vee,\\rightarrow\\}\\)?", answer: "\\(\\rightarrow\\)" },
        { prompt: "\\((p\\wedge q)\\,?\\,q\\) is a tautology for which \\(?\\in\\{\\wedge,\\rightarrow\\}\\)?", answer: "\\(\\rightarrow\\)" },
        { prompt: "\\(p\\,?\\,q\\) is false only at \\(p=F,\\ q=F\\). Which connective?", answer: "\\(\\vee\\)" },
      ],
      pyqExampleId: "c540e2c7-526a-467d-a30f-f6cf0d1fd395", // 25 Jan 2023 — choose two connectives for a tautology
      traps: [
        {
          title: "\\(\\leftrightarrow\\) is not \\(\\rightarrow\\)",
          body: "\\(p\\leftrightarrow q\\) is false at \\(p=F,\\ q=T\\), where \\(p\\rightarrow q\\) is true. A case that works with \\(\\rightarrow\\) can fail with \\(\\leftrightarrow\\), so test it separately.",
        },
      ],
    },

    // C2 — choose the missing statement
    {
      kind: "formula" as const,
      slug: "jmr-choose-statement",
      name: "Choosing the missing statement",
      intuition:
        "Here a letter \\(r\\) stands for one of \\(p,q,\\sim p,\\sim q\\). Find the rows that could make the statement false, usually just one, and check each candidate there. A candidate that is true where it needs to be true, or false where it needs to be false, works.",
      definition:
        "- Substitute each candidate for \\(r\\) and test it.\n" +
        "- For an implication, only rows where the antecedent is true and the consequent false matter.\n" +
        "- When the question asks 'how many', test all four candidates.",
      formula: {
        label: "Useful reductions",
        latex: "p\\wedge\\sim p\\equiv F,\\qquad F\\rightarrow X\\equiv T,\\qquad X\\rightarrow T\\equiv T",
      },
      authoredExample: {
        prompt: "Let \\(r\\in\\{p,q,\\sim p,\\sim q\\}\\). For which \\(r\\) is \\(r\\rightarrow(p\\vee\\sim q)\\) a tautology?",
        steps: [
          "\\(p\\vee\\sim q\\) is false only at \\(p=F,\\ q=T\\). The statement is a tautology exactly when \\(r\\) is false there.",
          "At \\(p=F,\\ q=T\\): \\(p=F\\), \\(q=T\\), \\(\\sim p=T\\), \\(\\sim q=F\\).",
        ],
        answer: "\\(r=p\\) or \\(r=\\sim q\\): two values.",
      },
      selfCheckExample: {
        prompt: "Let \\(r\\in\\{p,q,\\sim p,\\sim q\\}\\). For which \\(r\\) is \\((q\\wedge\\sim p)\\rightarrow r\\) a tautology?",
        steps: [
          "The antecedent is true only at \\(p=F,\\ q=T\\). \\(r\\) must be true there.",
          "At that row \\(q\\) and \\(\\sim p\\) are true; \\(p\\) and \\(\\sim q\\) are false.",
        ],
        answer: "\\(r=q\\) or \\(r=\\sim p\\).",
      },
      practiceSet: [
        { prompt: "\\(r\\rightarrow p\\) is a tautology for which \\(r\\in\\{p,q,\\sim p,\\sim q\\}\\)?", answer: "\\(r=p\\)" },
        { prompt: "\\(p\\vee r\\) is a tautology for which \\(r\\)?", answer: "\\(r=\\sim p\\)" },
        { prompt: "\\(p\\wedge r\\) is a contradiction for which \\(r\\)?", answer: "\\(r=\\sim p\\)" },
        { prompt: "\\(r\\leftrightarrow\\sim p\\) is a tautology for which \\(r\\)?", answer: "\\(r=\\sim p\\)" },
      ],
      pyqExampleId: "5addd989-6dd7-4c5e-b632-e607b97435e0", // 31 Jan 2023 — how many r make a statement a tautology
      traps: [
        {
          title: "Test every candidate",
          body: "A 'how many values' question can have two or more answers. Stopping at the first \\(r\\) that works loses the count, so test all four.",
        },
      ],
    },
  ],
};

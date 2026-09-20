import type { SubtopicNote } from "@/app/notes/_types";

export const CONVERSE_INVERSE_CONTRAPOSITIVE_NOTE: SubtopicNote = {
  subtopicName: "Converse, Inverse, and Contrapositive",
  title: "Converse, Inverse and Contrapositive",
  oneLineDefinition:
    "Every conditional has three relatives — swap the parts for the converse, negate both for the inverse, do both for the contrapositive — and only the contrapositive is equivalent to the original.",
  whyItMatters:
    "This is the chapter's largest subtopic at 17 PYQs and a moderate 24% HARD, and it is almost pure pattern work once the three forms are automatic. " +
    "The paper tests it in two registers: half the questions hand you a symbolic pattern, half hand you an English sentence about triangles, judges or integers. " +
    "The HARD ones stack the operations — the negation of the contrapositive, or the contrapositive of the inverse — which is only bookkeeping if you apply one rule at a time.",
  concepts: [
    // 1 — the reference table of the three relatives
    {
      kind: "reference" as const,
      slug: "mlog-the-three-relatives",
      name: "The Three Relatives of a Conditional",
      intuition:
        "Start from 'if p then q'. Swapping the two halves gives the converse; negating both halves gives the inverse; doing both gives the contrapositive. " +
        "Two operations, applied separately or together, generate all three.",
      definition:
        "From the original \\(p \\to q\\):\n" +
        "- **Converse** \\(q \\to p\\) — swap only.\n" +
        "- **Inverse** \\(\\sim p \\to \\sim q\\) — negate only.\n" +
        "- **Contrapositive** \\(\\sim q \\to \\sim p\\) — swap **and** negate.\n" +
        "Note the shape: all three are still conditionals. If your answer has lost its arrow, you have negated rather than transformed.",
      table: {
        columns: ["Form", "Symbolic", "Built by", "Equivalent to original?"],
        rows: [
          {
            cells: ["Original", "\\(p \\to q\\)", "—", "Yes, trivially"],
          },
          {
            cells: ["Converse", "\\(q \\to p\\)", "Swap the two parts", "No"],
          },
          {
            cells: [
              "Inverse",
              "\\(\\sim p \\to \\sim q\\)",
              "Negate both parts, keep the order",
              "No",
            ],
          },
          {
            cells: [
              "Contrapositive",
              "\\(\\sim q \\to \\sim p\\)",
              "Swap and negate both",
              "Yes — always",
            ],
            noteAmber:
              "The only equivalent relative, and the one the paper asks about most. A statement and its contrapositive always share a truth value.",
          },
          {
            cells: [
              "Converse and inverse",
              "\\(q \\to p\\) and \\(\\sim p \\to \\sim q\\)",
              "Each is the contrapositive of the other",
              "Equivalent to EACH OTHER, not to the original",
            ],
          },
        ],
        caption:
          "Memorise the last column. Most option lists contain all three relatives, so knowing the forms is not enough — you must know which one is being asked for.",
      },
      selfCheckExample: {
        prompt:
          "Write the converse, inverse and contrapositive of 'If two numbers are equal, then their squares are equal.'",
        steps: [
          "Let \\(p\\): two numbers are equal, \\(q\\): their squares are equal. The statement is \\(p \\to q\\).",
          "Converse \\(q \\to p\\): if their squares are equal, then the two numbers are equal.",
          "Inverse \\(\\sim p \\to \\sim q\\): if two numbers are not equal, then their squares are not equal.",
          "Contrapositive \\(\\sim q \\to \\sim p\\): if their squares are not equal, then the two numbers are not equal.",
        ],
        answer:
          "Only the contrapositive is guaranteed true here — and indeed the converse and inverse both fail for 2 and \\(-2\\).",
      },
      practiceSet: [
        {
          prompt: "What is the converse of \\(p \\to q\\)?",
          answer: "\\(q \\to p\\)",
          method: "Swap the parts.",
        },
        {
          prompt: "What is the inverse of \\(p \\to q\\)?",
          answer: "\\(\\sim p \\to \\sim q\\)",
          method: "Negate both, keep the order.",
        },
        {
          prompt: "What is the contrapositive of \\(p \\to q\\)?",
          answer: "\\(\\sim q \\to \\sim p\\)",
          method: "Swap and negate.",
        },
        {
          prompt: "Which relative is equivalent to the original?",
          answer: "The contrapositive only.",
          method: "Converse and inverse are equivalent to each other instead.",
        },
      ],
      pyqExampleId: "72f86a6e-6cdb-458a-9187-af2998e69a4c",
      traps: [
        {
          title: "Offering the converse where the contrapositive was asked",
          body:
            "Both are single-step transformations of the same statement and both appear in the options every time. " +
            "Read the question word again before you commit: 'converse' swaps, 'contrapositive' swaps AND negates.",
        },
      ],
    },

    // 2 — the equivalence fact and what it buys
    {
      kind: "formula" as const,
      slug: "mlog-only-contrapositive-is-equivalent",
      name: "Only the Contrapositive Shares the Truth Value",
      intuition:
        "'If it is a dog, then it is an animal' is true, and so is 'if it is not an animal, then it is not a dog'. " +
        "But 'if it is an animal, then it is a dog' is plainly false. That is the whole content of this rule, and it is worth carrying as a concrete example.",
      definition:
        "\\(p \\to q \\equiv \\;\\sim q \\to \\sim p\\), and this is the **only** equivalence among the four forms.\n" +
        "- The converse and the inverse are equivalent to each other, and to neither the original nor the contrapositive.\n" +
        "- Practical use: to find the truth value of a conditional, you may compute its contrapositive's truth value instead — they must match.\n" +
        "- Practical use: a statement can be **replaced** by its contrapositive in any argument without changing anything.",
      formula: {
        label: "The equivalence pairs",
        latex:
          "p \\to q \\equiv\\; \\sim q \\to \\sim p \\qquad q \\to p \\equiv\\; \\sim p \\to \\sim q \\qquad p \\to q \\not\\equiv q \\to p",
        symbols: [
          { symbol: "\\(\\equiv\\)", meaning: "logically equivalent — identical last column" },
        ],
      },
      authoredExample: {
        prompt:
          "Let \\(p\\): 'If 7 is an odd number then 7 is divisible by 2', and let \\(q\\): 'If 7 is a prime number then 7 is an odd number'. Find the truth values of the contrapositives of \\(p\\) and \\(q\\).",
        steps: [
          "A statement and its contrapositive always share a truth value, so evaluate the ORIGINALS — that is the shortcut this rule buys.",
          "For \\(p\\): '7 is odd' is T and '7 is divisible by 2' is F, so \\(p\\) is \\(T \\to F = F\\).",
          "For \\(q\\): '7 is prime' is T and '7 is odd' is T, so \\(q\\) is \\(T \\to T = T\\).",
          "The contrapositives therefore have the same values: F and T respectively.",
        ],
        answer: "Contrapositive of \\(p\\) is F; contrapositive of \\(q\\) is T.",
      },
      selfCheckExample: {
        prompt:
          "Is 'If a quadrilateral is a square, then all of its sides are equal' equivalent to 'If all the sides of a quadrilateral are equal, then it is a square'?",
        steps: [
          "The first is \\(p \\to q\\) with \\(p\\): it is a square, \\(q\\): all sides are equal.",
          "The second swaps the parts, so it is \\(q \\to p\\) — the converse.",
          "The converse is not equivalent to the original.",
          "A rhombus confirms it: all sides equal, but not a square. So the second statement is false while the first is true.",
        ],
        answer:
          "No — the second is the converse, and a rhombus is the counterexample.",
      },
      practiceSet: [
        {
          prompt: "If \\(p \\to q\\) is true, what is the truth value of \\(\\sim q \\to \\sim p\\)?",
          answer: "True.",
          method: "They are equivalent.",
        },
        {
          prompt: "If \\(p \\to q\\) is true, must \\(q \\to p\\) be true?",
          answer: "No.",
          method: "The converse is independent of the original.",
        },
        {
          prompt: "Which two of the four forms are equivalent to each other but not to the original?",
          answer: "The converse and the inverse.",
          method: "Each is the contrapositive of the other.",
        },
        {
          prompt: "Give a counterexample to 'if squares are equal then the numbers are equal'.",
          answer: "\\(2\\) and \\(-2\\).",
          method: "Squares both 4, numbers unequal.",
        },
      ],
      pyqExampleId: "15428480-12d6-4717-9da7-4fb694f9300e",
      traps: [
        {
          title: "Assuming the converse follows from the original",
          body:
            "'If a number is a multiple of 9 then it is a multiple of 3' is true; its converse is false (take 6). " +
            "A true conditional says nothing whatever about its converse, and stems are built around exactly this gap.",
        },
      ],
    },

    // 3 — convert to conditional form first
    {
      kind: "formula" as const,
      slug: "mlog-convert-to-conditional-first",
      name: "Converting to Conditional Form First",
      intuition:
        "Several stems ask for the contrapositive of something that is not written as a conditional at all — it arrives as an OR. " +
        "You cannot swap and negate parts that are not there, so rewrite it as an arrow first using the conditional law.",
      definition:
        "Use \\(p \\to q \\equiv \\;\\sim p \\vee q\\) in **reverse** to expose a hidden conditional:\n" +
        "- \\(\\sim p \\vee q\\) is already \\(p \\to q\\).\n" +
        "- \\(p \\vee q\\) is \\(\\sim p \\to q\\) — negate the part you move to the front.\n" +
        "- \\(q \\vee \\sim p\\) is \\(p \\to q\\) as well, since a disjunction may be read in either order.\n" +
        "Only once the statement is an arrow can you take its converse, inverse or contrapositive.",
      formula: {
        label: "Conditional law, used in reverse",
        latex:
          "\\sim p \\vee q \\equiv p \\to q \\qquad p \\vee q \\equiv\\; \\sim p \\to q \\qquad p \\to q \\equiv\\; \\sim q \\to \\sim p",
        symbols: [
          { symbol: "\\(\\vee\\)", meaning: "the disjunction hiding a conditional" },
        ],
      },
      authoredExample: {
        prompt: "Find the contrapositive of \\(\\sim p \\vee (q \\wedge \\sim r)\\).",
        steps: [
          "The statement is a disjunction whose left part is a negation, which is exactly the \\(\\sim A \\vee B\\) shape.",
          "Rewrite as a conditional: \\(\\sim p \\vee (q \\wedge \\sim r) \\equiv p \\to (q \\wedge \\sim r)\\).",
          "Now take the contrapositive — swap and negate: \\(\\sim(q \\wedge \\sim r) \\to \\sim p\\).",
          "Tidy the antecedent with De Morgan: \\(\\sim(q \\wedge \\sim r) \\equiv \\;\\sim q \\vee r\\).",
        ],
        answer: "\\((\\sim q \\vee r) \\to \\sim p\\)",
      },
      selfCheckExample: {
        prompt:
          "Let \\(p\\): X is an equilateral triangle, \\(q\\): X is an isosceles triangle, and let \\(r\\) be the statement \\(q \\vee \\sim p\\). Write \\(r\\) as a conditional in words.",
        steps: [
          "Read the disjunction in the convenient order: \\(q \\vee \\sim p \\equiv \\;\\sim p \\vee q\\).",
          "That is the \\(\\sim A \\vee B\\) shape with \\(A = p\\), so it equals \\(p \\to q\\).",
          "Translate back into words, keeping p as the antecedent: if X is an equilateral triangle, then X is an isosceles triangle.",
          "Check it is true: every equilateral triangle has three equal sides, so it certainly has two — the conditional holds.",
        ],
        answer:
          "'If X is an equilateral triangle, then X is an isosceles triangle.' Its contrapositive, \\(\\sim q \\to \\sim p\\), says the same thing: if X is not isosceles, it is not equilateral.",
      },
      practiceSet: [
        {
          prompt: "Write \\(\\sim p \\vee q\\) as a conditional.",
          answer: "\\(p \\to q\\)",
          method: "The conditional law read backwards.",
        },
        {
          prompt: "Write \\(p \\vee q\\) as a conditional.",
          answer: "\\(\\sim p \\to q\\)",
          method: "Negate the part you move to the antecedent.",
        },
        {
          prompt: "Write \\(\\sim q \\vee \\sim p\\) as a conditional.",
          answer: "\\(q \\to \\sim p\\)",
          method: "Same law, with \\(\\sim q\\) as the negated antecedent.",
        },
        {
          prompt: "Can you take the contrapositive of \\(p \\wedge q\\)?",
          answer: "No — it is not a conditional.",
          method: "Only an implication has relatives.",
        },
      ],
      pyqExampleId: "16e2c2c2-22c8-446a-8665-d79475967550",
      traps: [
        {
          title: "Negating the wrong part when converting an OR",
          body:
            "\\(p \\vee q\\) becomes \\(\\sim p \\to q\\), not \\(p \\to q\\). " +
            "The letter that moves into the antecedent position picks up a negation — check it against the law rather than by feel.",
        },
      ],
    },

    // 4 — stacked operations
    {
      kind: "formula" as const,
      slug: "mlog-compound-relatives",
      name: "Stacked Operations: Negation of a Contrapositive, Contrapositive of an Inverse",
      intuition:
        "The HARD questions here just chain two rules you already have. There is no new idea — only the discipline of doing one operation, " +
        "writing the result down, and then starting the second from that written result rather than from the original.",
      definition:
        "Work strictly left to right through the phrase, innermost operation first:\n" +
        "- 'the negation of the contrapositive of S' means: form the contrapositive of S, **then** negate it.\n" +
        "- 'the contrapositive of the inverse of S' means: form the inverse, **then** take its contrapositive.\n" +
        "A useful shortcut: the **contrapositive of the inverse is the converse**, because inverse and converse are already contrapositives of each other. " +
        "So that particular chain collapses to one step.",
      formula: {
        label: "The chain that collapses",
        latex:
          "\\text{contrapositive}(\\text{inverse}(p \\to q)) \\equiv q \\to p \\qquad \\sim(\\text{contrapositive}(p \\to q)) \\equiv\\; \\sim q \\wedge p",
        symbols: [
          { symbol: "inverse", meaning: "\\(\\sim p \\to \\sim q\\)" },
          { symbol: "contrapositive", meaning: "swap and negate" },
        ],
      },
      authoredExample: {
        prompt: "Find the negation of the contrapositive of \\(p \\to (\\sim q \\wedge r)\\).",
        steps: [
          "First the contrapositive. Swap and negate: \\(\\sim(\\sim q \\wedge r) \\to \\sim p\\).",
          "Tidy the new antecedent with De Morgan: \\(\\sim(\\sim q \\wedge r) \\equiv q \\vee \\sim r\\). So the contrapositive is \\((q \\vee \\sim r) \\to \\sim p\\).",
          "Now negate that conditional using \\(\\sim(A \\to B) \\equiv A \\wedge \\sim B\\), with \\(A = q \\vee \\sim r\\) and \\(B = \\;\\sim p\\).",
          "That gives \\((q \\vee \\sim r) \\wedge \\sim(\\sim p) \\equiv (q \\vee \\sim r) \\wedge p\\).",
        ],
        answer: "\\((q \\vee \\sim r) \\wedge p\\)",
      },
      selfCheckExample: {
        prompt: "Find the contrapositive of the inverse of \\(p \\to (p \\to q)\\).",
        steps: [
          "Treat the whole of \\((p \\to q)\\) as the consequent \\(B\\), so the statement is \\(p \\to B\\).",
          "Inverse: negate both parts, keep the order — \\(\\sim p \\to \\sim B\\).",
          "Contrapositive of that: swap and negate — \\(\\sim(\\sim B) \\to \\sim(\\sim p)\\), which is \\(B \\to p\\).",
          "Substitute \\(B\\) back: \\((p \\to q) \\to p\\), and using the conditional law this is \\((\\sim p \\vee q) \\to p\\).",
        ],
        answer:
          "\\((p \\to q) \\to p\\), equivalently \\((\\sim p \\vee q) \\to p\\) — note it is just the CONVERSE, as the shortcut predicts.",
      },
      practiceSet: [
        {
          prompt: "The contrapositive of the inverse of \\(p \\to q\\) is which relative?",
          answer: "The converse, \\(q \\to p\\).",
          method: "Inverse and converse are contrapositives of each other.",
        },
        {
          prompt: "The contrapositive of the contrapositive of \\(p \\to q\\)?",
          answer: "\\(p \\to q\\) itself.",
          method: "Applying the operation twice returns the original.",
        },
        {
          prompt: "The inverse of the converse of \\(p \\to q\\)?",
          answer: "The contrapositive, \\(\\sim q \\to \\sim p\\).",
          method: "Swap then negate is the same as swap-and-negate.",
        },
        {
          prompt: "Negate the contrapositive of \\(p \\to q\\).",
          answer: "\\(\\sim q \\wedge p\\)",
          method: "Contrapositive \\(\\sim q \\to \\sim p\\), then negate to \\(\\sim q \\wedge p\\).",
        },
      ],
      pyqExampleId: "0837fbd0-dfea-45ed-9dd8-0411da7ffea6",
      traps: [
        {
          title: "Applying the second operation to the original statement",
          body:
            "'The negation of the contrapositive' does not mean 'the negation, and also the contrapositive, of the original'. " +
            "Form the contrapositive, write it down, and treat THAT as the new statement. Skipping the written intermediate is where these go wrong.",
        },
      ],
    },

    // 5 — necessary and sufficient
    {
      kind: "formula" as const,
      slug: "mlog-necessary-and-sufficient",
      name: "Necessary and Sufficient Condition Language",
      intuition:
        "The same conditional can be dressed in several English phrasings, and the paper uses them interchangeably. " +
        "'p only if q' sounds as though q comes first, but it is still 'if p then q' — the word 'only' is what reverses the reading.",
      definition:
        "All of the following say \\(p \\to q\\):\n" +
        "- **if p, then q**\n" +
        "- **p only if q**\n" +
        "- **q is necessary for p**\n" +
        "- **p is sufficient for q**\n" +
        "- **\\(\\sim q \\to \\sim p\\)** (the contrapositive)\n" +
        "And \\(p \\leftrightarrow q\\) is read '**p if and only if q**', equivalently '**p is necessary and sufficient for q**'.",
      formula: {
        label: "Equivalent phrasings of one conditional",
        latex:
          "p \\to q \\;\\equiv\\; (p \\text{ only if } q) \\;\\equiv\\; (q \\text{ necessary for } p) \\;\\equiv\\; (p \\text{ sufficient for } q) \\;\\equiv\\; \\sim q \\to \\sim p",
        symbols: [
          { symbol: "necessary", meaning: "the CONSEQUENT — it must hold for the antecedent to" },
          { symbol: "sufficient", meaning: "the ANTECEDENT — it is enough to guarantee the consequent" },
        ],
      },
      authoredExample: {
        prompt:
          "Let p: a number is a multiple of 9, and q: a number is a multiple of 3. Which of these say the same thing as 'if p then q'? (i) p only if q. (ii) q is necessary for p. (iii) q only if p.",
        steps: [
          "(i) 'p only if q' is a standard phrasing of \\(p \\to q\\). It matches.",
          "(ii) 'q is necessary for p' places q as the consequent, so it is \\(p \\to q\\). It matches.",
          "(iii) 'q only if p' puts q in the antecedent position, giving \\(q \\to p\\) — the converse. It does not match.",
          "Sanity check with the numbers: every multiple of 9 is a multiple of 3, but 6 is a multiple of 3 and not of 9, so the converse genuinely fails.",
        ],
        answer: "(i) and (ii) match; (iii) is the converse.",
      },
      selfCheckExample: {
        prompt:
          "Rewrite 'being divisible by 4 is sufficient for being divisible by 2' as an if-then statement, and state whether it is true.",
        steps: [
          "'A is sufficient for B' means \\(A \\to B\\), so A is the antecedent.",
          "Here A is 'divisible by 4' and B is 'divisible by 2'.",
          "So the statement is: if a number is divisible by 4, then it is divisible by 2.",
          "That is true, since any multiple of 4 is a multiple of 2.",
        ],
        answer:
          "'If a number is divisible by 4, then it is divisible by 2' — and it is true.",
      },
      practiceSet: [
        {
          prompt: "Write 'p only if q' in symbols.",
          answer: "\\(p \\to q\\)",
          method: "'Only if' points to the consequent.",
        },
        {
          prompt: "Write 'q is necessary for p' in symbols.",
          answer: "\\(p \\to q\\)",
          method: "The necessary condition is the consequent.",
        },
        {
          prompt: "Write 'p is sufficient for q' in symbols.",
          answer: "\\(p \\to q\\)",
          method: "The sufficient condition is the antecedent.",
        },
        {
          prompt: "Write 'p is necessary and sufficient for q' in symbols.",
          answer: "\\(p \\leftrightarrow q\\)",
          method: "Both directions hold.",
        },
      ],
      pyqExampleId: "01f9b38c-5793-4426-9a75-8ca6f616ef7a",
      traps: [
        {
          title: "Reading 'p only if q' as 'if q then p'",
          body:
            "The word order tempts you to put q first, but 'p only if q' is \\(p \\to q\\) — q is the NECESSARY condition, so it sits as the consequent. " +
            "'If q then p' would be the converse, and it is the distractor supplied.",
        },
        {
          title: "Swapping necessary and sufficient",
          body:
            "Necessary is the consequent; sufficient is the antecedent. " +
            "A quick anchor: being a multiple of 3 is NECESSARY for being a multiple of 9, and being a multiple of 9 is SUFFICIENT for being a multiple of 3.",
        },
      ],
    },
  ],
  related: [
    { label: "Next: Logical equivalence and algebra of statements", href: "/notes/mht-cet-maths/mathematical-logic/logical-equivalence-algebra" },
    { label: "Previous: Negation of statements and quantifiers", href: "/notes/mht-cet-maths/mathematical-logic/negation-and-quantifiers" },
    { label: "Mathematical Logic playbook", href: "/guide/mht-cet-maths/playbooks/mathematical-logic" },
  ],
};

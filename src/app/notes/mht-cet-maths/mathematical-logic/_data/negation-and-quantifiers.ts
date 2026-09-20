import type { SubtopicNote } from "@/app/notes/_types";

export const NEGATION_QUANTIFIERS_NOTE: SubtopicNote = {
  subtopicName: "Negation of Statements and Quantifiers",
  title: "Negation of Statements and Quantifiers",
  oneLineDefinition:
    "Negating a compound statement means pushing the not inwards: and becomes or, or becomes and, a conditional becomes a conjunction, and a quantifier flips.",
  whyItMatters:
    "This is the cheapest block in the chapter — 14 PYQs at just 14% HARD, well under the chapter's 31% — and that is precisely why it is worth drilling to reflex. " +
    "Nothing here is conceptually hard; every mark lost is lost mechanically, by forgetting to flip a connective or by negating an implication as another implication. " +
    "Three rewrites cover almost the whole subtopic, and the paper tests them year after year in the same four shapes.",
  concepts: [
    // 1 — De Morgan
    {
      kind: "formula" as const,
      slug: "mlog-de-morgan-laws",
      name: "De Morgan Laws for And and Or",
      intuition:
        "To deny that two things both happened, you only need to deny one of them — so the negation of an AND is an OR. " +
        "To deny that either happened, you must deny both — so the negation of an OR is an AND. The connective always flips.",
      definition:
        "Pushing a negation through a conjunction or disjunction **flips the connective** and negates each part:\n" +
        "- \\(\\sim(p \\wedge q) \\equiv \\;\\sim p \\vee \\sim q\\)\n" +
        "- \\(\\sim(p \\vee q) \\equiv \\;\\sim p \\wedge \\sim q\\)\n" +
        "Apply them **outermost first**, then repeat on whatever is left inside. A double negation cancels: \\(\\sim(\\sim p) \\equiv p\\).",
      formula: {
        label: "De Morgan laws",
        latex:
          "\\sim(p \\wedge q) \\equiv\\; \\sim p \\vee \\sim q \\qquad \\sim(p \\vee q) \\equiv\\; \\sim p \\wedge \\sim q \\qquad \\sim(\\sim p) \\equiv p",
        symbols: [
          { symbol: "\\(\\sim\\)", meaning: "negation — distributes inwards, flipping the connective as it goes" },
        ],
      },
      authoredExample: {
        prompt: "Write the negation of \\((p \\vee \\sim q) \\wedge r\\).",
        steps: [
          "The outermost connective is \\(\\wedge\\), so the first flip gives \\(\\sim(p \\vee \\sim q) \\vee \\sim r\\).",
          "Now push into the remaining bracket. \\(\\sim(p \\vee \\sim q) \\equiv \\;\\sim p \\wedge \\sim(\\sim q)\\).",
          "Cancel the double negation: \\(\\sim(\\sim q) \\equiv q\\), so that bracket is \\(\\sim p \\wedge q\\).",
          "Assemble: \\((\\sim p \\wedge q) \\vee \\sim r\\).",
        ],
        answer: "\\((\\sim p \\wedge q) \\vee \\sim r\\)",
      },
      selfCheckExample: {
        prompt:
          "Write the negation of '5 is a prime number and 9 is a perfect square', and state its truth value.",
        steps: [
          "Let \\(p\\): 5 is a prime number, and \\(q\\): 9 is a perfect square. The statement is \\(p \\wedge q\\).",
          "By De Morgan, \\(\\sim(p \\wedge q) \\equiv \\;\\sim p \\vee \\sim q\\) — the AND becomes an OR.",
          "Translate back: '5 is not a prime number or 9 is not a perfect square'.",
          "For the truth value: \\(p = T\\) and \\(q = T\\), so \\(p \\wedge q = T\\) and its negation is F.",
        ],
        answer:
          "'5 is not a prime number **or** 9 is not a perfect square' — and it is **false**, since both original parts are true.",
      },
      practiceSet: [
        {
          prompt: "Negate \\(p \\wedge \\sim q\\).",
          answer: "\\(\\sim p \\vee q\\)",
          method: "Flip to OR, negate both, cancel the double negation.",
        },
        {
          prompt: "Negate \\(\\sim p \\vee \\sim q\\).",
          answer: "\\(p \\wedge q\\)",
          method: "Flip to AND and cancel both double negations.",
        },
        {
          prompt: "Negate 'it is raining and the road is wet'.",
          answer: "'It is not raining or the road is not wet.'",
          method: "AND becomes OR.",
        },
        {
          prompt: "Simplify \\(\\sim(\\sim(p \\wedge q))\\).",
          answer: "\\(p \\wedge q\\)",
          method: "Two negations cancel.",
        },
      ],
      pyqExampleId: "ab842ace-57c7-4e44-a2e7-f9760ae44ade",
      traps: [
        {
          title: "Negating both parts but keeping the connective",
          body:
            "\\(\\sim(p \\wedge q)\\) is NOT \\(\\sim p \\wedge \\sim q\\). The connective must flip. " +
            "This is the most common single error in the chapter, and the distractor list always contains the unflipped version.",
        },
      ],
    },

    // 2 — negating a conditional
    {
      kind: "formula" as const,
      slug: "mlog-negating-a-conditional",
      name: "Negating a Conditional",
      intuition:
        "A conditional is a promise, and it is broken in exactly one way: the antecedent happens and the consequent does not. " +
        "So denying a conditional asserts the antecedent and denies the consequent — the result is an AND, never another conditional.",
      definition:
        "\\(\\sim(p \\to q) \\equiv p \\wedge \\sim q\\).\n" +
        "- The result is a **conjunction**, because the one false row of \\(p \\to q\\) is \\(p = T,\\; q = F\\).\n" +
        "- The arrow disappears entirely. Any option that still contains an arrow is wrong by shape alone.\n" +
        "- For a nested conditional, push the negation in one layer at a time.",
      formula: {
        label: "Negation of an implication",
        latex: "\\sim(p \\to q) \\equiv p \\wedge \\sim q",
        symbols: [
          { symbol: "p", meaning: "the antecedent — asserted, not negated" },
          { symbol: "\\(\\sim q\\)", meaning: "the consequent — negated" },
        ],
      },
      authoredExample: {
        prompt: "Write the negation of \\(p \\vee (q \\to \\sim r)\\).",
        steps: [
          "The outermost connective is \\(\\vee\\), so De Morgan gives \\(\\sim p \\wedge \\sim(q \\to \\sim r)\\).",
          "Negate the inner conditional using \\(\\sim(A \\to B) \\equiv A \\wedge \\sim B\\), with \\(A = q\\) and \\(B = \\;\\sim r\\).",
          "That gives \\(q \\wedge \\sim(\\sim r) \\equiv q \\wedge r\\).",
          "Assemble: \\(\\sim p \\wedge (q \\wedge r)\\), usually written \\(\\sim p \\wedge q \\wedge r\\).",
        ],
        answer: "\\(\\sim p \\wedge q \\wedge r\\)",
      },
      selfCheckExample: {
        prompt: "Write the negation of \\((p \\wedge q) \\to (\\sim p \\vee r)\\).",
        steps: [
          "Apply \\(\\sim(A \\to B) \\equiv A \\wedge \\sim B\\) with \\(A = p \\wedge q\\) and \\(B = \\;\\sim p \\vee r\\).",
          "The antecedent is asserted unchanged: \\(p \\wedge q\\).",
          "Negate the consequent by De Morgan: \\(\\sim(\\sim p \\vee r) \\equiv p \\wedge \\sim r\\).",
          "Combine: \\((p \\wedge q) \\wedge (p \\wedge \\sim r)\\), and since \\(p\\) repeats this is \\(p \\wedge q \\wedge \\sim r\\).",
        ],
        answer: "\\(p \\wedge q \\wedge \\sim r\\)",
      },
      practiceSet: [
        {
          prompt: "Negate \\(p \\to q\\).",
          answer: "\\(p \\wedge \\sim q\\)",
          method: "Assert the antecedent, deny the consequent.",
        },
        {
          prompt: "Negate \\(\\sim p \\to q\\).",
          answer: "\\(\\sim p \\wedge \\sim q\\)",
          method: "The antecedent is carried across unchanged.",
        },
        {
          prompt: "Negate \\(p \\to \\sim q\\).",
          answer: "\\(p \\wedge q\\)",
          method: "Denying \\(\\sim q\\) gives \\(q\\).",
        },
        {
          prompt: "Should the negation of a conditional contain an arrow?",
          answer: "No.",
          method: "It is always a conjunction.",
        },
      ],
      pyqExampleId: "139b8dee-07e8-48f0-b5ba-4b830ce9e4bd",
      traps: [
        {
          title: "Negating an implication as another implication",
          body:
            "The tempting wrong answer is \\(\\sim p \\to \\sim q\\), which negates both parts and keeps the arrow. " +
            "It is not the negation — it is the **inverse**, and it is not even equivalent to the original. The negation has no arrow at all.",
        },
      ],
    },

    // 3 — negating a biconditional
    {
      kind: "formula" as const,
      slug: "mlog-negating-a-biconditional",
      name: "Negating a Biconditional",
      intuition:
        "A biconditional says the two sides agree. Denying it says they disagree — exactly one of them holds. " +
        "That is why the negation comes out as two conjunctions joined by OR rather than as anything shorter.",
      definition:
        "\\(\\sim(p \\leftrightarrow q) \\equiv (p \\wedge \\sim q) \\vee (\\sim p \\wedge q)\\), read as '**exactly one** of p and q is true'.\n" +
        "- A useful companion: \\(p \\leftrightarrow \\sim q\\) is itself equivalent to \\(\\sim(p \\leftrightarrow q)\\).\n" +
        "- Consequently \\(\\sim(p \\leftrightarrow \\sim q) \\equiv p \\leftrightarrow q\\) — a negation and an internal negation cancel each other out.\n" +
        "In a verbal stem, 'if and only if' is the signal; the negation always reads as one part holding without the other.",
      formula: {
        label: "Negation of a biconditional",
        latex:
          "\\sim(p \\leftrightarrow q) \\equiv (p \\wedge \\sim q) \\vee (\\sim p \\wedge q) \\qquad \\sim(p \\leftrightarrow \\sim q) \\equiv p \\leftrightarrow q",
        symbols: [
          { symbol: "\\(\\leftrightarrow\\)", meaning: "biconditional — true when the sides agree" },
        ],
      },
      authoredExample: {
        prompt:
          "Write the negation of 'A number is divisible by 6 if and only if it is divisible by 2 and by 3.'",
        steps: [
          "Let \\(p\\): the number is divisible by 6, and \\(q\\): it is divisible by 2 and by 3. The statement is \\(p \\leftrightarrow q\\).",
          "Apply \\(\\sim(p \\leftrightarrow q) \\equiv (p \\wedge \\sim q) \\vee (\\sim p \\wedge q)\\).",
          "Translate the first bracket: the number is divisible by 6 but not by both 2 and 3.",
          "Translate the second: the number is divisible by both 2 and 3 but not by 6.",
        ],
        answer:
          "'The number is divisible by 6 but not by both 2 and 3, **or** it is divisible by both 2 and 3 but not by 6.'",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\sim(p \\leftrightarrow \\sim q)\\).",
        steps: [
          "Note first that \\(p \\leftrightarrow \\sim q\\) says p and \\(\\sim q\\) agree, which is the same as saying p and q DISagree.",
          "So \\(p \\leftrightarrow \\sim q \\equiv \\;\\sim(p \\leftrightarrow q)\\).",
          "Negating both sides: \\(\\sim(p \\leftrightarrow \\sim q) \\equiv \\;\\sim(\\sim(p \\leftrightarrow q))\\).",
          "The double negation cancels.",
        ],
        answer: "\\(p \\leftrightarrow q\\)",
      },
      practiceSet: [
        {
          prompt: "Negate \\(p \\leftrightarrow q\\).",
          answer: "\\((p \\wedge \\sim q) \\vee (\\sim p \\wedge q)\\)",
          method: "Exactly one of the two holds.",
        },
        {
          prompt: "In words, what does the negation of a biconditional say?",
          answer: "That exactly one of the two statements is true.",
          method: "The sides disagree.",
        },
        {
          prompt: "Simplify \\(p \\leftrightarrow \\sim q\\) in terms of \\(p \\leftrightarrow q\\).",
          answer: "\\(\\sim(p \\leftrightarrow q)\\)",
          method: "Agreeing with \\(\\sim q\\) is disagreeing with \\(q\\).",
        },
        {
          prompt: "Is the negation of \\(p \\leftrightarrow q\\) equal to \\(\\sim p \\leftrightarrow \\sim q\\)?",
          answer: "No.",
          method: "\\(\\sim p \\leftrightarrow \\sim q\\) is equivalent to the ORIGINAL, not to its negation.",
        },
      ],
      pyqExampleId: "fe183b2b-c0e2-42e3-89be-978881d5d47f",
      traps: [
        {
          title: "Negating both sides of a biconditional",
          body:
            "\\(\\sim p \\leftrightarrow \\sim q\\) is equivalent to \\(p \\leftrightarrow q\\) itself — if two things always agree, so do their denials. " +
            "It is therefore the exact opposite of the negation, and it appears in the option list every time this is asked.",
        },
      ],
    },

    // 4 — verbal statements
    {
      kind: "formula" as const,
      slug: "mlog-negating-verbal-statements",
      name: "Negating a Statement Given in Words",
      intuition:
        "Do not try to negate an English sentence by ear. Translate it to symbols, negate mechanically, then translate back — " +
        "the whole difficulty of these questions is in the first and last steps, not the middle one.",
      definition:
        "For a verbal compound statement:\n" +
        "- Assign letters to the **simple** statements, keeping each one positive.\n" +
        "- Write the symbolic form, watching for hidden connectives: 'but' is AND, 'unless' is usually a conditional, 'if and only if' is a biconditional.\n" +
        "- Negate symbolically using De Morgan and the conditional and biconditional rules.\n" +
        "- Translate back, and check that every connective in your answer flipped.",
      authoredExample: {
        prompt:
          "Write the negation of 'The triangle is equilateral or isosceles, and the triangle is not isosceles.'",
        steps: [
          "Let \\(p\\): the triangle is equilateral, \\(q\\): the triangle is isosceles. The statement is \\((p \\vee q) \\wedge \\sim q\\).",
          "Negate the outer AND: \\(\\sim[(p \\vee q) \\wedge \\sim q] \\equiv \\;\\sim(p \\vee q) \\vee \\sim(\\sim q)\\).",
          "Simplify each piece: \\(\\sim(p \\vee q) \\equiv \\;\\sim p \\wedge \\sim q\\), and \\(\\sim(\\sim q) \\equiv q\\).",
          "So the negation is \\((\\sim p \\wedge \\sim q) \\vee q\\).",
          "In words: the triangle is neither equilateral nor isosceles, or it is isosceles.",
        ],
        answer:
          "\\((\\sim p \\wedge \\sim q) \\vee q\\) — 'the triangle is neither equilateral nor isosceles, or it is isosceles'.",
      },
      selfCheckExample: {
        prompt:
          "Write the negation of 'The payment will be made if and only if the work is finished in time.'",
        steps: [
          "Let \\(p\\): the payment will be made, \\(q\\): the work is finished in time. The statement is \\(p \\leftrightarrow q\\).",
          "Its negation is \\((p \\wedge \\sim q) \\vee (\\sim p \\wedge q)\\).",
          "Translate the first bracket: the payment is made but the work is not finished in time.",
          "Translate the second: the work is finished in time but the payment is not made.",
        ],
        answer:
          "'The payment is made and the work is not finished in time, or the work is finished in time and the payment is not made.'",
      },
      practiceSet: [
        {
          prompt: "Symbolise 'She studies hard but does not pass.'",
          answer: "\\(p \\wedge \\sim q\\)",
          method: "'But' is a conjunction.",
        },
        {
          prompt: "Negate 'Ram is tall and Shyam is short.'",
          answer: "'Ram is not tall or Shyam is not short.'",
          method: "De Morgan: AND becomes OR.",
        },
        {
          prompt: "Negate 'All the answers are correct.'",
          answer: "'At least one answer is not correct.'",
          method: "Denying a universal claim needs only one exception.",
        },
        {
          prompt: "Negate 'If it rains, the match is cancelled.'",
          answer: "'It rains and the match is not cancelled.'",
          method: "Negating a conditional gives a conjunction.",
        },
      ],
      pyqExampleId: "577d4a77-e4bf-4558-80e0-2b41decce1c7",
      traps: [
        {
          title: "Assigning a negative statement to a letter",
          body:
            "If you set \\(p\\) = 'the triangle is NOT isosceles', every subsequent negation needs an extra cancellation and the bookkeeping collapses. " +
            "Always let the letters stand for the positive forms and carry the \\(\\sim\\) explicitly.",
        },
      ],
    },

    // 5 — quantifiers
    {
      kind: "formula" as const,
      slug: "mlog-negating-quantified-statements",
      name: "Negating Quantified Statements",
      intuition:
        "To deny 'every student passed' you do not claim 'every student failed' — you only need one who did not. " +
        "So a for-all becomes a there-exists, a there-exists becomes a for-all, and the inner claim is negated as well.",
      definition:
        "Negation swaps the quantifier **and** negates the predicate:\n" +
        "- \\(\\sim[\\forall x,\\, p(x)] \\equiv \\exists x \\text{ such that } \\sim p(x)\\)\n" +
        "- \\(\\sim[\\exists x \\text{ such that } p(x)] \\equiv \\forall x,\\, \\sim p(x)\\)\n" +
        "With several quantifiers, flip them **in order, left to right**, and negate the predicate at the end. " +
        "An inequality inside the predicate reverses and loses or gains its equality: the negation of \\(x \\geq M\\) is \\(x < M\\).",
      formula: {
        label: "Quantifier negation",
        latex:
          "\\sim(\\forall x,\\, p(x)) \\equiv \\exists x,\\; \\sim p(x) \\qquad \\sim(\\exists x,\\, p(x)) \\equiv \\forall x,\\; \\sim p(x) \\qquad \\sim(x \\geq M) \\equiv (x < M)",
        symbols: [
          { symbol: "\\(\\forall\\)", meaning: "for all / for every" },
          { symbol: "\\(\\exists\\)", meaning: "there exists / for some" },
        ],
      },
      authoredExample: {
        prompt:
          "Write the negation of 'There exists a natural number \\(n\\) such that \\(n^{2} = 2\\).'",
        steps: [
          "Symbolise: \\(\\exists n \\in \\mathbb{N}\\) such that \\(n^{2} = 2\\).",
          "The quantifier is 'there exists', so it flips to 'for all'.",
          "The predicate \\(n^{2} = 2\\) is negated to \\(n^{2} \\neq 2\\).",
          "Result: for every natural number \\(n\\), \\(n^{2} \\neq 2\\).",
        ],
        answer:
          "'For every natural number \\(n\\), \\(n^{2} \\neq 2\\)' — which happens to be true, but that is not what was asked.",
      },
      selfCheckExample: {
        prompt:
          "Write the negation of 'For all \\(M > 0\\), there exists \\(x \\in S\\) such that \\(x \\geq M\\).'",
        steps: [
          "There are two quantifiers. Flip them left to right: \\(\\forall M\\) becomes \\(\\exists M\\), and \\(\\exists x\\) becomes \\(\\forall x\\).",
          "Then negate the predicate: \\(x \\geq M\\) becomes \\(x < M\\).",
          "Assemble in the same order: there exists \\(M > 0\\) such that for all \\(x \\in S\\), \\(x < M\\).",
        ],
        answer:
          "'There exists \\(M > 0\\) such that for every \\(x \\in S\\), \\(x < M\\).' Both quantifiers flip and the inequality reverses.",
      },
      practiceSet: [
        {
          prompt: "Negate 'for every \\(x\\), \\(p(x)\\)'.",
          answer: "'There exists \\(x\\) such that \\(\\sim p(x)\\).'",
          method: "Flip the quantifier and negate the predicate.",
        },
        {
          prompt: "Negate 'some students are late'.",
          answer: "'No student is late' — that is, every student is not late.",
          method: "There-exists becomes for-all with a negated predicate.",
        },
        {
          prompt: "Negate \\(x > 5\\).",
          answer: "\\(x \\leq 5\\)",
          method: "The negation of a strict inequality includes equality.",
        },
        {
          prompt: "Negate 'there is a rational number \\(x \\in S\\) with \\(x > 0\\)'.",
          answer: "'Every rational number \\(x \\in S\\) satisfies \\(x \\leq 0\\).'",
          method: "Flip the quantifier; negate \\(x > 0\\) to \\(x \\leq 0\\).",
        },
      ],
      pyqExampleId: "8cde2cfc-5185-4986-b26b-7dd4dda87d69",
      traps: [
        {
          title: "Flipping the quantifier but leaving the predicate alone",
          body:
            "The negation of 'for all x, p(x)' is 'there exists x with **not** p(x)' — the inner claim must be negated too. " +
            "Options that flip only the quantifier are the standard distractor and look convincing at a glance.",
        },
        {
          title: "Forgetting that the inequality changes",
          body:
            "Negating \\(x \\geq M\\) gives \\(x < M\\), not \\(x \\leq M\\) and not \\(x > M\\). " +
            "When the predicate is an inequality, the boundary moves to the other side, so check the equality case explicitly.",
        },
      ],
    },
  ],
  related: [
    { label: "Next: Converse, inverse and contrapositive", href: "/notes/mht-cet-maths/mathematical-logic/converse-inverse-contrapositive" },
    { label: "Previous: Finding truth values of component statements", href: "/notes/mht-cet-maths/mathematical-logic/finding-truth-values" },
    { label: "Mathematical Logic playbook", href: "/guide/mht-cet-maths/playbooks/mathematical-logic" },
  ],
};

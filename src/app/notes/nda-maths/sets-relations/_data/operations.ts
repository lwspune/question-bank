import type { SubtopicNote } from "@/app/notes/_types";

export const OPERATIONS_NOTE: SubtopicNote = {
  subtopicName: "Set Operations, Identities, and Cartesian Products of Sets",
  title: "Set Fundamentals, Operations and Algebra",
  oneLineDefinition:
    "A set is a well-defined collection of distinct objects; the operations (union, intersection, complement, difference, symmetric difference) obey a fixed list of algebraic laws that the NDA tests by asking which identity is NOT correct.",
  whyItMatters:
    "Start here — everything else in the chapter is built on these operations. " +
    "23 PYQs live in this subtopic, and the dominant shape is identity verification: you are given four set identities and must spot the wrong one. " +
    "That is pure law-recognition (distributive, De Morgan, absorption) plus careful region-counting on a Venn diagram. All EASY or MODERATE except a handful.",
  concepts: [
    // 1 — set fundamentals (foundation+, bank-anchored)
    {
      kind: "formula" as const,
      slug: "set-fundamentals",
      name: "Sets — notation, empty set, and equal vs equivalent",
      intuition:
        "A set is just a collection of distinct objects. Two ideas trip students up and the NDA tests both: the empty set (a set with no elements, written ∅) is still a perfectly good set, and 'equal' sets are not the same as 'equivalent' sets — equal means identical elements, equivalent means merely the same NUMBER of elements.",
      definition:
        "Core vocabulary:\n" +
        "- **Set** — a well-defined collection of distinct objects; \\(x \\in A\\) means x belongs to A.\n" +
        "- **Empty (null) set** \\(\\emptyset\\) — has no elements; it is a **subset of every set**. A condition with no solutions defines \\(\\emptyset\\) (e.g. \\(\\{x \\in \\mathbb{R} : x^2 + 1 = 0\\} = \\emptyset\\)).\n" +
        "- **Subset** \\(A \\subseteq B\\) — every element of A is in B. **Proper subset** \\(A \\subset B\\) excludes \\(A = B\\).\n" +
        "- **Equal** sets have exactly the same elements; **equivalent** sets only have the same number of elements (same cardinality). Equal \\(\\Rightarrow\\) equivalent, not the reverse.",
      authoredExample: {
        prompt:
          "Are the sets \\(A = \\{1, 2, 3\\}\\) and \\(B = \\{a, e, i\\}\\) equal, equivalent, or neither?",
        steps: [
          "Equal means identical elements — A and B share no elements, so not equal.",
          "Equivalent means the same number of elements — both have 3.",
          "So they are equivalent but not equal.",
        ],
        answer: "Equivalent (both have 3 elements) but not equal.",
      },
      selfCheckExample: {
        prompt:
          "What is the set \\(S = \\{x : x \\text{ is real and } x^2 + 1 = 0\\}\\)?",
        steps: [
          "\\(x^2 + 1 = 0 \\Rightarrow x^2 = -1\\).",
          "No real number squares to a negative, so there are no real solutions.",
          "A set with no elements is the empty set.",
        ],
        answer: "\\(S = \\emptyset\\) (the empty set).",
      },
      practiceSet: [
        { prompt: "Is the empty set a subset of every set?", answer: "Yes", method: "vacuously true — it has no element that could fail to be in the other set" },
        { prompt: "How many elements does \\(\\{x \\in \\mathbb{R} : x^2 = -4\\}\\) have?", answer: "0 (it is \\(\\emptyset\\))" },
        { prompt: "Are \\(\\{1,2,3\\}\\) and \\(\\{2,4,6\\}\\) equal or equivalent?", answer: "Equivalent only", method: "same size, different elements" },
      ],
      pyqExampleId: "c1b99e13-9de9-4ba6-919f-70e538b82c9e", // S={x: x^2+1=0 real} = empty set
      traps: [
        {
          title: "Equal vs equivalent",
          body:
            "\\(\\{1,3,5\\}\\) and \\(\\{2,4,7\\}\\) are **equivalent** (both size 3) but **not equal** (different elements). The NDA pairs these words deliberately — equal is about WHICH elements, equivalent is about HOW MANY.",
        },
      ],
    },

    // 2 — set operations (formula + Venn diagram)
    {
      kind: "formula" as const,
      slug: "set-operations",
      name: "Union, intersection, complement and difference",
      intuition:
        "Five operations build every set expression. Union \\(A \\cup B\\) is 'in A OR B'; intersection \\(A \\cap B\\) is 'in A AND B'; complement \\(A'\\) is 'NOT in A'; difference \\(A - B\\) is 'in A but not B'. " +
        "Picture them as regions of a Venn diagram and most questions become a region count.",
      definition:
        "The operations and the identities the bank leans on:\n" +
        "- \\(A \\cup B\\) (union), \\(A \\cap B\\) (intersection), \\(A'\\) (complement, relative to the universal set), \\(A - B = A \\cap B'\\) (difference).\n" +
        "- **Complement is an involution**: \\((A')' = A\\). A long nested complement like \\(E-(E-(E-A))\\) collapses by cancelling in pairs.\n" +
        "- A set can be defined by a condition — solving it gives the set: \\((x-a)(x-b) > 0\\) (with \\(a<b\\)) gives \\(x < a\\) or \\(x > b\\); multiples of 2 AND 3 are the multiples of 6.",
      visualizationSlug: "sets-venn-two",
      authoredExample: {
        prompt:
          "If \\(E\\) is the universal set, simplify \\(E - (E - (E - A))\\).",
        steps: [
          "Innermost: \\(E - A = A'\\).",
          "Next: \\(E - A' = A\\) (complement of the complement).",
          "Outermost: \\(E - A = A'\\).",
          "Each \\(E-\\,\\) flips the set; an odd number of flips leaves \\(A'\\).",
        ],
        answer: "\\(A'\\).",
      },
      selfCheckExample: {
        prompt:
          "\\(A\\) is the set of multiples of 2 and \\(B\\) the set of multiples of 3. What is \\(A \\cap B\\)?",
        steps: [
          "\\(A \\cap B\\) is the numbers that are multiples of BOTH 2 and 3.",
          "A number divisible by 2 and 3 is divisible by their LCM, 6.",
          "So \\(A \\cap B\\) is the set of multiples of 6.",
        ],
        answer: "The multiples of 6.",
      },
      practiceSet: [
        { prompt: "Write \\(A - B\\) using complement.", answer: "\\(A \\cap B'\\)" },
        { prompt: "Simplify \\((A')'\\).", answer: "\\(A\\)", method: "complement is an involution" },
        { prompt: "Solve \\((x-1)(x-4) > 0\\) as a set.", answer: "\\(x < 1\\) or \\(x > 4\\)", method: "product positive outside the roots" },
        { prompt: "Multiples of 4 and multiples of 6 — their intersection is multiples of?", answer: "12 (the LCM)" },
      ],
      pyqExampleId: "afad1256-da90-4506-b58e-98e8e12c93a1", // (A∪B) − {(A−B)∪(B−A)∪(A∩B)} = ∅
      traps: [
        {
          title: "\\(A - B\\) is not symmetric",
          body:
            "\\(A - B\\) (in A, not B) is different from \\(B - A\\) (in B, not A). Only their UNION, \\((A-B)\\cup(B-A)\\), is symmetric — that is the symmetric difference. Don't write \\(A-B = B-A\\).",
        },
        {
          title: "The three disjoint pieces rebuild the union",
          body:
            "\\((A-B) \\cup (A\\cap B) \\cup (B-A) = A \\cup B\\) — the only-A, both, and only-B regions tile the whole union. Recognising this collapses many 'simplify the expression' questions to \\(\\emptyset\\) or \\(A\\).",
        },
      ],
    },

    // 3 — set algebra laws (REFERENCE)
    {
      kind: "reference" as const,
      slug: "set-algebra-laws",
      name: "The laws of set algebra",
      intuition:
        "Set operations obey a fixed list of laws — the same shape as the laws of logic. The NDA's favourite question gives you four 'identities' and asks which is NOT correct; the wrong one is always a real law with one operation swapped. Knowing the genuine laws makes it a spot-the-impostor exercise.",
      definition:
        "The laws you must recognise on sight (A, B, C are any sets):\n" +
        "- **Distributive**: \\(A \\cup (B \\cap C) = (A\\cup B)\\cap(A\\cup C)\\) and \\(A \\cap (B \\cup C) = (A\\cap B)\\cup(A\\cap C)\\).\n" +
        "- **De Morgan**: \\((A\\cup B)' = A' \\cap B'\\) and \\((A\\cap B)' = A' \\cup B'\\).\n" +
        "- **Absorption**: \\(A \\cup (A\\cap B) = A\\) and \\(A \\cap (A\\cup B) = A\\).\n" +
        "- **Idempotent / Identity / Complement**: \\(A\\cup A = A\\); \\(A\\cup\\emptyset=A\\); \\(A\\cup A' = E\\), \\(A\\cap A' = \\emptyset\\).",
      table: {
        columns: ["Law", "Statement", "The impostor to watch for"],
        rows: [
          {
            cells: ["Distributive", "\\(A\\cup(B\\cap C)=(A\\cup B)\\cap(A\\cup C)\\)", "Swapping \\(\\cup\\) / \\(\\cap\\) on one side breaks it"],
          },
          {
            cells: ["De Morgan", "\\((A\\cup B)'=A'\\cap B'\\)", "\\((A\\cup B)' = A'\\cup B'\\) is WRONG — the operation flips"],
            noteAmber: "In predicate form: \\(x\\notin(A\\cup B)\\Rightarrow x\\notin A\\) AND \\(x\\notin B\\) (not OR).",
          },
          {
            cells: ["Absorption", "\\(A\\cup(A\\cap B)=A\\)", "\\(A\\cup(A\\cap B)=A\\cup B\\) is WRONG — it collapses to just \\(A\\)"],
          },
          {
            cells: ["Subset test 'for all B'", "\\((A\\cap B)\\subseteq(C\\cap B)\\ \\forall B \\Rightarrow A\\subseteq C\\)", "Test such claims by choosing \\(B=\\emptyset\\) or \\(B=E\\)"],
          },
        ],
        caption: "Distractors are genuine laws with one operation flipped. Verify a suspect identity on a tiny example or a Venn diagram.",
      },
      selfCheckExample: {
        prompt:
          "Which is NOT a correct identity: (a) \\(A\\cap(A\\cup B)=A\\), (b) \\(A\\cup(A\\cap B)=A\\cup B\\), (c) \\((A\\cup B)'=A'\\cap B'\\)?",
        steps: [
          "(a) is absorption — correct.",
          "(c) is De Morgan — correct.",
          "(b) claims \\(A\\cup(A\\cap B)=A\\cup B\\); but absorption says it equals \\(A\\), not \\(A\\cup B\\).",
        ],
        answer: "(b) is the incorrect identity (absorption gives \\(A\\), not \\(A\\cup B\\)).",
      },
      practiceSet: [
        { prompt: "State De Morgan for \\((A\\cap B)'\\).", answer: "\\(A'\\cup B'\\)" },
        { prompt: "Simplify \\(A\\cup(A\\cap B)\\).", answer: "\\(A\\)", method: "absorption" },
        { prompt: "\\(x\\notin(A\\cup B)\\) means \\(x\\notin A\\) ___ \\(x\\notin B\\).", answer: "AND", method: "De Morgan in words" },
      ],
      pyqExampleId: "dddd2978-81b3-4141-9f27-47b8ad854d1d", // A∪(A∩B)=A∪B is NOT correct (absorption)
      traps: [
        {
          title: "The wrong option is a real law with a flipped operation",
          body:
            "These questions never use nonsense — every distractor is a genuine law with \\(\\cup\\)/\\(\\cap\\) swapped or absorption over-simplified. If unsure, plug in \\(A=\\{1\\}, B=\\{2\\}\\) and compute both sides.",
        },
      ],
    },

    // 4 — symmetric difference and equality (formula)
    {
      kind: "formula" as const,
      slug: "symmetric-difference-equality",
      name: "Symmetric difference and set-equality conditions",
      intuition:
        "The symmetric difference \\(A \\triangle B\\) collects elements in exactly one of the two sets — the union minus the overlap. It also gives a clean test for equality: two sets are equal exactly when their symmetric difference is empty. A related trap is that you CANNOT cancel sets like numbers.",
      definition:
        "Equality tools:\n" +
        "- **Symmetric difference**: \\(A \\triangle B = (A-B)\\cup(B-A) = (A\\cup B)-(A\\cap B) = (A\\cap B')\\cup(A'\\cap B)\\).\n" +
        "- \\(A \\triangle B = \\emptyset \\iff A = B\\); also \\(A\\cup B = A\\cap B \\iff A = B\\).\n" +
        "- **Cancellation fails**: \\(A\\cap B = A\\cap C\\) does NOT force \\(B=C\\); \\(A\\cup C = B\\cup C\\) forces \\(A=B\\) only when C is **disjoint** from both.",
      authoredExample: {
        prompt:
          "Sets satisfy \\(A\\cap C = B\\cap C\\) with \\(C\\) disjoint from both \\(A\\) and \\(B\\). Also \\(A\\cup C = B\\cup C\\). What can you conclude?",
        steps: [
          "Since \\(C\\) is disjoint from \\(A\\) and \\(B\\), \\(A\\cap C = \\emptyset = B\\cap C\\) — the first equation gives nothing.",
          "From \\(A\\cup C = B\\cup C\\), remove the disjoint \\(C\\) from both sides.",
          "Because \\(C\\) shares no element with \\(A\\) or \\(B\\), the leftover parts must be equal: \\(A = B\\).",
        ],
        answer: "\\(A = B\\) (but \\(C\\) need not be empty).",
      },
      selfCheckExample: {
        prompt:
          "Rewrite \\((A\\cap B') \\cup (A'\\cap B)\\) as a single named operation.",
        steps: [
          "\\(A\\cap B'\\) is 'in A, not B' \\(= A-B\\).",
          "\\(A'\\cap B\\) is 'in B, not A' \\(= B-A\\).",
          "Their union is elements in exactly one of the sets — the symmetric difference.",
        ],
        answer: "\\((A\\cup B)-(A\\cap B) = A \\triangle B\\).",
      },
      practiceSet: [
        { prompt: "When is \\(A \\triangle B = \\emptyset\\)?", answer: "Exactly when \\(A = B\\)" },
        { prompt: "Does \\(A\\cap B = A\\cap C\\) imply \\(B = C\\)?", answer: "No", method: "take \\(A=\\{1\\}, B=\\{2\\}, C=\\{3\\}\\): both intersections are \\(\\emptyset\\)" },
        { prompt: "\\(A\\cup B = A\\cap B\\) implies?", answer: "\\(A = B\\)" },
      ],
      pyqExampleId: "3fec3a58-1019-438a-92de-9340f26379b7", // C=(A∩B')∪(A'∩B) = symmetric difference
      traps: [
        {
          title: "You cannot cancel sets like numbers",
          body:
            "\\(A\\cap B = A\\cap C\\) does NOT give \\(B=C\\), and \\(A\\cup B = A\\cup C\\) does NOT give \\(B=C\\) either. Cancellation only works when the cancelled set is disjoint from the rest. Always look for a small counterexample.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_RF_RELATIONS_NOTE: SubtopicNote = {
  subtopicName: "Types of Relations",
  title: "Types of Relations: Reflexive, Symmetric and Transitive",
  oneLineDefinition:
    "A relation as a subset of A × B, the empty and universal relations, the number of relations between two sets, and how to test a relation for being reflexive, symmetric and transitive.",
  whyItMatters:
    "54 questions, twenty-eight of them from board papers in every year from 2023 to 2026. The board asks for the number of relations from one set to another (2023, 2025, 2026) and whether a given relation is a function (2025); a reflexive, symmetric and transitive check of a relation given by a rule on numbers (2023, 2024, 2025), on lines or people (2024), or on a small listed set (2023, 2025, 2026). A 2025 question on x − y + √3 being irrational repeats a 2024 question built the same way with √2.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmrf-relation",
      name: "Relations, the number of relations, and when a relation is a function",
      intuition:
        "A relation picks some ordered pairs out of all the pairs you can make. Any choice at all is a relation, even no pairs or every pair. A rule such as \\(y = 2x - 1\\) is just a way of saying which pairs are picked. A function is a special relation: every element of the first set is used, and each is used exactly once.",
      definition:
        "- A **relation** R from a set A to a set B is a subset of \\(A \\times B\\); a relation in A is a subset of \\(A \\times A\\). If \\((a, b) \\in R\\) we write \\(a\\,R\\,b\\).\n" +
        "- **Empty relation**: no element is related to any element, \\(R = \\phi\\).\n" +
        "- **Universal relation**: each element is related to every element, \\(R = A \\times A\\).\n" +
        "- If \\(n(A) = m\\) and \\(n(B) = n\\), then \\(A \\times B\\) has \\(mn\\) pairs, and each pair is either in R or not, so there are \\(2^{mn}\\) relations from A to B.\n" +
        "- To list a relation given by a rule, test each element of A in turn and keep a pair only when its second entry lies in B.\n" +
        "- **Domain** of R = the set of first entries; **range** of R = the set of second entries.\n" +
        "- R is a **function from A to B** when every element of A has exactly one image in B: no element of A is left out and none has two images.",
      formula: {
        label: "Number of relations from A to B",
        latex: "n(A) = m,\\ n(B) = n \\;\\Rightarrow\\; \\text{number of relations} = 2^{mn}",
        symbols: [
          { symbol: "\\(m\\)", meaning: "number of elements in A" },
          { symbol: "\\(n\\)", meaning: "number of elements in B" },
        ],
      },
      authoredExample: {
        prompt:
          "Let \\(A = \\{2, 3, 7\\}\\) and \\(B = \\{3, 9, 13, 15\\}\\). A relation R from A to B is \\(R = \\{(x, y) : y = 2x - 1,\\ x \\in A,\\ y \\in B\\}\\). (i) List R. (ii) Is R a function from A to B? (iii) Write the domain and range of R. (iv) How many relations are there from A to B?",
        steps: [
          "Test each \\(x \\in A\\) in \\(y = 2x - 1\\) and keep the pair only if \\(y \\in B\\).",
          "\\(x = 2\\): \\(y = 3 \\in B\\). \\(x = 3\\): \\(y = 5 \\notin B\\). \\(x = 7\\): \\(y = 13 \\in B\\).",
          "(i) \\(R = \\{(2, 3), (7, 13)\\}\\).",
          "(ii) R is not a function from A to B, because \\(3 \\in A\\) has no image.",
          "(iii) Domain of \\(R = \\{2, 7\\}\\); range of \\(R = \\{3, 13\\}\\).",
          "(iv) \\(n(A \\times B) = 3 \\times 4 = 12\\), so the number of relations from A to B is \\(2^{12} = 4096\\).",
        ],
        answer:
          "\\(R = \\{(2, 3), (7, 13)\\}\\); not a function; domain \\(\\{2, 7\\}\\), range \\(\\{3, 13\\}\\); \\(2^{12} = 4096\\) relations",
      },
      selfCheckExample: {
        prompt: "A set P has 2 elements and a set Q has 5 elements. How many relations are there from P to Q?",
        steps: [
          "\\(n(P \\times Q) = 2 \\times 5 = 10\\).",
          "Each of the 10 pairs is either in the relation or not, so there are \\(2^{10}\\) relations.",
        ],
        answer: "\\(2^{10} = 1024\\)",
      },
      practiceSet: [
        { prompt: "Is the empty set a relation from A to B?", answer: "Yes: \\(\\phi\\) is a subset of \\(A \\times B\\) (the empty relation)" },
        {
          prompt: "In the set of all students of a girls' school, \\(R = \\{(a, b) : a \\text{ is brother of } b\\}\\). What kind of relation is R?",
          answer: "The empty relation, since no student is a brother",
        },
        {
          prompt: "Is \\(\\{(1, p), (2, p), (3, q)\\}\\) a function from \\(\\{1, 2, 3\\}\\) to \\(\\{p, q\\}\\)?",
          answer: "Yes: each of 1, 2, 3 has exactly one image (two elements may share an image)",
        },
      ],
      pyqExampleId: "fe109e84-046a-4864-8ba0-e5370a484d27",
      traps: [
        {
          title: "Writing mn or 2 to the power m + n for the number of relations",
          body: "A relation is a subset of \\(A \\times B\\), which has \\(mn\\) elements, so the count is \\(2^{mn}\\). Write the step \\(n(A \\times B) = mn\\) first.",
        },
        {
          title: "Keeping a pair whose second entry is outside B",
          body: "In a relation from A to B both entries must lie in their sets. Work out y for each x and drop the pair when y is not in B.",
        },
        {
          title: "Saying 'not a function' without naming the element",
          body: "Name the element of A that has no image, or the element that has two images. The reason carries the mark, not the word 'No'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmrf-rst-rule",
      name: "Testing a relation given by a rule on numbers",
      intuition:
        "There are three questions to ask of a relation: is every element related to itself, does every pair also work the other way round, and do two linked pairs always give the pair that joins their ends? When a property holds, you must prove it for every element. When it fails, one example with actual numbers is enough.",
      definition:
        "A relation R in a set A is called\n" +
        "- **reflexive**, if \\((a, a) \\in R\\) for every \\(a \\in A\\);\n" +
        "- **symmetric**, if \\((a_1, a_2) \\in R\\) implies \\((a_2, a_1) \\in R\\), for all \\(a_1, a_2 \\in A\\);\n" +
        "- **transitive**, if \\((a_1, a_2) \\in R\\) and \\((a_2, a_3) \\in R\\) together imply \\((a_1, a_3) \\in R\\), for all \\(a_1, a_2, a_3 \\in A\\).\n" +
        "- **To prove** a property: take general elements, use the rule, and reach the pair required.\n" +
        "- **To disprove** it: give actual elements of the set, show each given pair is in R, and show the required pair is not.\n" +
        "- Give a verdict for each of the three properties, one line each.",
      formula: {
        label: "The three tests",
        latex: "(a, a) \\in R; \\qquad (a, b) \\in R \\Rightarrow (b, a) \\in R; \\qquad (a, b), (b, c) \\in R \\Rightarrow (a, c) \\in R",
      },
      authoredExample: {
        prompt: "Check whether the relation \\(R = \\{(a, b) : a \\le b + 1\\}\\) in the set \\(\\mathbb{R}\\) of real numbers is reflexive, symmetric or transitive.",
        steps: [
          "Reflexive: for any real \\(a\\), \\(a \\le a + 1\\) is true, so \\((a, a) \\in R\\). R is reflexive.",
          "Symmetric: \\((0, 3) \\in R\\), since \\(0 \\le 3 + 1\\).",
          "But \\((3, 0) \\notin R\\), since \\(3 \\le 0 + 1\\) is false. R is not symmetric.",
          "Transitive: \\((3, 2) \\in R\\), since \\(3 \\le 2 + 1\\), and \\((2, 1) \\in R\\), since \\(2 \\le 1 + 1\\).",
          "But \\((3, 1) \\notin R\\), since \\(3 \\le 1 + 1\\) is false. R is not transitive.",
          "Hence R is reflexive, but neither symmetric nor transitive.",
        ],
        answer: "Reflexive only",
      },
      selfCheckExample: {
        prompt: "Check whether \\(R = \\{(a, b) : ab \\ge 0\\}\\) in the set \\(\\mathbb{Z}\\) of integers is reflexive, symmetric or transitive.",
        steps: [
          "Reflexive: \\(a \\cdot a = a^2 \\ge 0\\) for every integer, so \\((a, a) \\in R\\).",
          "Symmetric: \\(ba = ab\\), so \\(ab \\ge 0\\) gives \\(ba \\ge 0\\).",
          "Transitive: \\((1, 0) \\in R\\) and \\((0, -1) \\in R\\) (both products are 0), but \\(1 \\times (-1) = -1 < 0\\), so \\((1, -1) \\notin R\\).",
        ],
        answer: "Reflexive and symmetric, but not transitive",
      },
      practiceSet: [
        { prompt: "In \\(\\mathbf{N}\\), \\(R = \\{(a, b) : a + b \\text{ is even}\\}\\). Is R reflexive?", answer: "Yes: \\(a + a = 2a\\) is even for every \\(a\\)" },
        { prompt: "In \\(\\mathbb{R}\\), \\(R = \\{(a, b) : a < b\\}\\). Is R transitive?", answer: "Yes: \\(a < b\\) and \\(b < c\\) give \\(a < c\\)" },
        { prompt: "How many counter-examples do you need to show that a relation is not symmetric?", answer: "One: a pair in R whose reverse is not in R" },
      ],
      pyqExampleId: "e7783a90-69dc-46fe-962c-833f6b6eebf6",
      traps: [
        {
          title: "Proving a property with one example",
          body: "An example can only break a property. To show R is symmetric or transitive, start from general \\(a, b, c\\) and argue from the rule.",
        },
        {
          title: "A counter-example whose pairs are not checked",
          body: "Show with working that each given pair is in R, then that the required pair is not. Also check your numbers lie in the set: in \\(\\mathbf{N}\\) there is no 0 and no negative number.",
        },
        {
          title: "Calling a relation not transitive when no chain exists",
          body: "If no two pairs \\((a, b)\\) and \\((b, c)\\) can both be in R, there is nothing to break, and R is transitive.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbmrf-rst-words",
      name: "Relations on lines and on people",
      intuition:
        "When a relation is described in words, decide each property from the meaning. Swap the two objects and ask if the sentence is still true: that is symmetry. Put the same object on both sides: that is reflexivity. Join two true sentences through a common middle object: that is transitivity.",
      definition:
        "- **Lines in a plane, 'is perpendicular to'**: not reflexive (no line is perpendicular to itself), symmetric, not transitive (if \\(L_1 \\perp L_2\\) and \\(L_2 \\perp L_3\\), then \\(L_1\\) is parallel to \\(L_3\\)).\n" +
        "- **'is parallel to'**: reflexive (a line is taken as parallel to itself), symmetric and transitive.\n" +
        "- **People, 'work at the same place' or 'live in the same locality'**: reflexive, symmetric and transitive.\n" +
        "- **'is father of'** or **'is exactly 7 cm taller than'**: none of the three.\n" +
        "- **'is wife of'**: transitive only, because no person can be a wife and a husband at once, so no chain of two pairs exists.\n" +
        "- In a written answer, give a concrete counter-example in words for each property that fails.",
      table: {
        columns: ["Relation", "Reflexive", "Symmetric", "Transitive"],
        rows: [
          {
            cells: ["L₁ is perpendicular to L₂ (lines in a plane)", "No", "Yes", "No"],
            noteAmber: "Board 2024 asked symmetry and transitivity of this relation in a case study.",
          },
          {
            cells: ["L₁ is parallel to L₂", "Yes", "Yes", "Yes"],
            pyqExampleId: "4db5b307-c017-4c51-bf46-6ae5c18eb1ea",
            noteAmber: "Board 2024 asked symmetry and transitivity of this relation in the same case study.",
          },
          { cells: ["x and y work at the same place", "Yes", "Yes", "Yes"] },
          { cells: ["x is father of y", "No", "No", "No"] },
          { cells: ["x is exactly 7 cm taller than y", "No", "No", "No"] },
          { cells: ["x is wife of y", "No", "No", "Yes, since no chain of two pairs exists"] },
        ],
      },
      selfCheckExample: {
        prompt: "In the set of all circles in a plane, \\(C_1\\,R\\,C_2\\) if \\(C_1\\) and \\(C_2\\) have the same centre. Is R reflexive, symmetric and transitive?",
        steps: [
          "Reflexive: a circle has the same centre as itself.",
          "Symmetric: if \\(C_1\\) has the same centre as \\(C_2\\), then \\(C_2\\) has the same centre as \\(C_1\\).",
          "Transitive: if \\(C_1, C_2\\) share a centre and \\(C_2, C_3\\) share a centre, it is the one centre of \\(C_2\\), so \\(C_1, C_3\\) share it.",
        ],
        answer: "All three; R is an equivalence relation",
      },
      practiceSet: [
        { prompt: "Is 'is perpendicular to' on the lines of a plane reflexive?", answer: "No: a line is not perpendicular to itself" },
        { prompt: "In a town, \\(R = \\{(x, y) : x \\text{ and } y \\text{ have the same mother}\\}\\). Is R transitive?", answer: "Yes: both pairs share the one mother of the middle person" },
      ],
      pyqExampleId: "cae27d46-5934-4643-ad0a-77b1eb2ff587",
      traps: [
        {
          title: "Calling 'perpendicular' transitive",
          body: "Two lines perpendicular to the same line are parallel to each other, not perpendicular. Say this in the answer; it is the counter-example.",
        },
        {
          title: "Reading the reversed sentence loosely",
          body: "If x is taller than y, the reversed pair says y is taller than x, which is false. Swap the two names exactly and read the sentence again.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmrf-rst-listed",
      name: "Relations on a small listed set",
      intuition:
        "When the relation is a short list of pairs, every check is a look-up. Reflexive: are all the diagonal pairs there? Symmetric: does each pair have its reverse? Transitive: for every two pairs that share the middle element, is the joining pair there? Write down each chain you checked, so the examiner can see the work.",
      definition:
        "- **Reflexive**: \\((a, a) \\in R\\) for every \\(a\\) in the set, including an element that appears in no other pair.\n" +
        "- **Symmetric**: every listed \\((a, b)\\) has its reverse \\((b, a)\\) listed.\n" +
        "- **Transitive**: for every two listed pairs \\((a, b)\\) and \\((b, c)\\), the pair \\((a, c)\\) is listed. A chain \\((a, b), (b, a)\\) demands \\((a, a)\\).\n" +
        "- To make R have a property with the fewest pairs, add only the pairs that property forces, then check transitivity again.\n" +
        "- **Counting reflexive relations** on a set of \\(n\\) elements: the \\(n\\) diagonal pairs must be in; each of the other \\(n^2 - n\\) pairs is in or out, so there are \\(2^{n^2 - n}\\) of them.",
      formula: {
        label: "Number of reflexive relations on a set of n elements",
        latex: "2^{n^2 - n}",
      },
      authoredExample: {
        prompt: "On \\(A = \\{4, 5, 6\\}\\), \\(R = \\{(4, 4), (5, 5), (6, 6), (4, 5), (5, 6), (4, 6)\\}\\). Check whether R is reflexive, symmetric and transitive.",
        steps: [
          "Reflexive: \\((4, 4), (5, 5), (6, 6)\\) are all in R, so R is reflexive.",
          "Symmetric: \\((4, 5) \\in R\\) but \\((5, 4) \\notin R\\), so R is not symmetric.",
          "Transitive: the chains with two different pairs are \\((4, 5), (5, 6)\\), which needs \\((4, 6)\\), and it is in R.",
          "Chains through a diagonal pair, such as \\((4, 4), (4, 5)\\), give back a pair already in R.",
          "No chain is broken, so R is transitive.",
          "Hence R is reflexive and transitive but not symmetric.",
        ],
        answer: "Reflexive and transitive, not symmetric",
      },
      selfCheckExample: {
        prompt: "How many reflexive relations are there on a set with 3 elements?",
        steps: [
          "\\(n = 3\\): the 3 diagonal pairs must be in.",
          "The other \\(9 - 3 = 6\\) pairs are each in or out: \\(2^6\\).",
        ],
        answer: "\\(2^6 = 64\\)",
      },
      practiceSet: [
        { prompt: "On \\(\\{a, b, c\\}\\), is \\(\\{(a, a), (b, b), (c, c)\\}\\) transitive?", answer: "Yes; it is reflexive, symmetric and transitive" },
        {
          prompt: "On \\(\\{1, 2, 3\\}\\), which single pair must be added to \\(\\{(2, 3), (3, 2), (3, 3)\\}\\) to make it transitive?",
          answer: "\\((2, 2)\\), forced by the chain \\((2, 3), (3, 2)\\)",
        },
        { prompt: "On \\(\\{1, 2, 3\\}\\), is \\(\\{(1, 2)\\}\\) transitive?", answer: "Yes: no two pairs form a chain" },
      ],
      pyqExampleId: "c1e85411-bde9-4ca9-a518-70cf015945cd",
      traps: [
        {
          title: "Missing one diagonal pair",
          body: "Reflexive needs \\((a, a)\\) for every element of the set. If one element sits in no pair at all, its diagonal pair is still needed.",
        },
        {
          title: "Forgetting the chain that runs back",
          body: "The chain \\((a, b), (b, a)\\) demands \\((a, a)\\). A symmetric list without its diagonal pairs is usually not transitive for this reason.",
        },
        {
          title: "Adding more pairs than asked",
          body: "'Minimum pairs' wants only the pairs each property forces. An extra pair can make a relation symmetric when the question wants it not symmetric.",
        },
      ],
    },
  ],
};

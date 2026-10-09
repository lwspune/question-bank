import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_SLG_SETS_NOTE: SubtopicNote = {
  subtopicName: "Sets and Venn Diagrams",
  title: "Sets, Intervals and Venn Diagrams",
  oneLineDefinition:
    "A set is a collection of distinct objects; union, intersection, complement, difference and the Cartesian product build new sets, and Venn diagrams count them.",
  whyItMatters:
    "The 2025 paper asked what the Cartesian product of two sets is. Set notation, intervals, ℝ and ∅ also fill the answer options of recent algebra questions, so you need to read them fluently.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-slg-set-notation",
      name: "Sets, elements, subsets and set notation",
      intuition:
        "A set only records which objects are in it: order and repetition do not matter, so \\(\\{1, 2, 2\\}\\) and \\(\\{2, 1\\}\\) are the same set. The key distinction is between being an element (one object inside) and being a subset (a smaller set inside).",
      definition:
        "A **set** is a collection of distinct objects, its **elements**. It can be given by listing, \\(\\{1, 3, 5\\}\\), or by a rule (set-builder notation), \\(\\{x \\in \\mathbb{R} : x > 2\\}\\).\n" +
        "- Two sets are **equal** when they have exactly the same elements.\n" +
        "- \\(A \\subseteq B\\) means every element of \\(A\\) is also in \\(B\\). Every set is a subset of itself, and \\(\\varnothing\\) is a subset of every set.\n" +
        "- A set with \\(n\\) elements has \\(2^n\\) subsets (each element is either in or out).",
      table: {
        columns: ["Symbol", "Read as", "Example"],
        rows: [
          { cells: ["\\(x \\in A\\)", "x is an element of A", "\\(3 \\in \\{1, 3, 5\\}\\)"] },
          { cells: ["\\(x \\notin A\\)", "x is not an element of A", "\\(2 \\notin \\{1, 3, 5\\}\\)"] },
          { cells: ["\\(A \\subseteq B\\)", "A is a subset of B", "\\(\\{1, 3\\} \\subseteq \\{1, 3, 5\\}\\)"] },
          { cells: ["\\(A \\subset B\\)", "A is a proper subset of B (a subset, not equal to B)", "\\(\\mathbb{N} \\subset \\mathbb{Z}\\)"] },
          { cells: ["\\(\\varnothing\\) or \\(\\{\\}\\)", "the empty set, with no elements", "the solutions of \\(x^2 = -1\\) in \\(\\mathbb{R}\\)"] },
          { cells: ["\\(n(A)\\) or \\(|A|\\)", "the number of elements of A", "\\(n(\\{a, b, c\\}) = 3\\)"] },
          { cells: ["\\(\\{x \\in \\mathbb{Z} : x > 0\\}\\)", "the integers x such that x is positive", "the set \\(\\{1, 2, 3, \\ldots\\}\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "How many subsets does the set \\(\\{a, b, c, d\\}\\) have?",
        options: ["8", "15", "4", "16", "24"],
        steps: [
          "Each of the 4 elements is either in a subset or not: \\(2^4 = 16\\) choices.",
          "This count includes \\(\\varnothing\\) and the whole set.",
          "Option B leaves out the whole set (it counts proper subsets only); A uses \\(2^3\\); E counts orderings, which a set ignores.",
        ],
        answer: "(D) 16",
      },
      practiceSet: [
        { prompt: "Is \\(\\varnothing \\subseteq \\{1, 2\\}\\) true?", answer: "Yes", method: "The empty set is a subset of every set" },
        { prompt: "Are \\(\\{3, 1, 1\\}\\) and \\(\\{1, 3\\}\\) equal?", answer: "Yes", method: "Repetition and order do not matter" },
        { prompt: "How many elements has \\(\\{x \\in \\mathbb{Z} : -2 \\le x < 3\\}\\)?", answer: "5", method: "\\(-2, -1, 0, 1, 2\\)" },
        { prompt: "Is \\(\\{2\\} \\in \\{1, 2, 3\\}\\) true?", answer: "No", method: "\\(2 \\in \\{1, 2, 3\\}\\) and \\(\\{2\\} \\subseteq \\{1, 2, 3\\}\\), but \\(\\{2\\}\\) is not an element" },
      ],
      traps: [
        {
          title: "An element is not a subset",
          body: "\\(2 \\in \\{1, 2, 3\\}\\) but \\(\\{2\\} \\subseteq \\{1, 2, 3\\}\\). The symbol \\(\\in\\) links an object to a set; \\(\\subseteq\\) links a set to a set. Mixing them makes a statement false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-slg-set-operations",
      name: "Union, intersection, difference, complement and Cartesian product",
      intuition:
        "Union collects, intersection keeps what is shared, difference removes, and complement takes everything else in the universe. The Cartesian product is different in kind: it does not combine elements but pairs them up, building a new set of ordered pairs.",
      definition:
        "The table uses \\(A = \\{1, 2, 3, 4\\}\\), \\(B = \\{3, 4, 5\\}\\) and the universal set \\(U = \\{1, 2, 3, 4, 5, 6\\}\\).\n" +
        "- \\(A\\) and \\(B\\) are **disjoint** when \\(A \\cap B = \\varnothing\\).\n" +
        "- **De Morgan's laws**: \\(\\overline{A \\cup B} = \\overline{A} \\cap \\overline{B}\\) and \\(\\overline{A \\cap B} = \\overline{A} \\cup \\overline{B}\\).\n" +
        "- In the **Cartesian product** order matters: \\((1, 5) \\ne (5, 1)\\), so \\(A \\times B \\ne B \\times A\\) in general, and \\(n(A \\times B) = n(A) \\cdot n(B)\\).\n" +
        "- \\(A \\times A\\) is often written \\(A^2\\); \\(\\mathbb{R} \\times \\mathbb{R}\\) is the coordinate plane.",
      table: {
        columns: ["Operation", "Symbol", "Contains", "Example"],
        rows: [
          { cells: ["Union", "\\(A \\cup B\\)", "elements in A or in B (or both)", "\\(\\{1, 2, 3, 4, 5\\}\\)"] },
          { cells: ["Intersection", "\\(A \\cap B\\)", "elements in both A and B", "\\(\\{3, 4\\}\\)"] },
          { cells: ["Difference", "\\(A \\setminus B\\)", "elements in A but not in B", "\\(\\{1, 2\\}\\)"] },
          { cells: ["Complement", "\\(\\overline{A}\\) or \\(A^c\\)", "elements of U that are not in A", "\\(\\{5, 6\\}\\)"] },
          { cells: ["Cartesian product", "\\(A \\times B\\)", "all ordered pairs \\((a, b)\\) with \\(a \\in A\\) and \\(b \\in B\\)", "contains \\((1, 5)\\) but not \\((5, 1)\\); 12 pairs"] },
        ],
      },
      selfCheckExample: {
        prompt: "Let \\(A = \\{p, q\\}\\) and \\(B = \\{1, 2, 3\\}\\). Which statement is true?",
        options: [
          "\\(A \\times B\\) has 5 elements",
          "\\((q, 3) \\in A \\times B\\)",
          "\\(A \\times B = B \\times A\\)",
          "\\((1, p) \\in A \\times B\\)",
          "\\(A \\times B = A \\cup B\\)",
        ],
        steps: [
          "\\(A \\times B\\) is the set of ordered pairs with the first entry from \\(A\\) and the second from \\(B\\).",
          "\\(q \\in A\\) and \\(3 \\in B\\), so \\((q, 3)\\) is one of them.",
          "It has \\(2 \\times 3 = 6\\) elements, not \\(2 + 3 = 5\\) (that is the size of the union). \\((1, p)\\) has its entries in the wrong order, so it belongs to \\(B \\times A\\), which is a different set.",
        ],
        answer: "(B) \\((q, 3) \\in A \\times B\\)",
      },
      practiceSet: [
        { prompt: "With \\(A = \\{2, 4, 6, 8\\}\\) and \\(B = \\{1, 2, 3, 4\\}\\), find \\(A \\cap B\\).", answer: "\\(\\{2, 4\\}\\)" },
        { prompt: "With the same sets, find \\(A \\setminus B\\) and \\(B \\setminus A\\).", answer: "\\(\\{6, 8\\}\\) and \\(\\{1, 3\\}\\)" },
        { prompt: "With the same sets, how many elements has \\(A \\times B\\)?", answer: "16", method: "\\(4 \\times 4\\)" },
      ],
      traps: [
        {
          title: "The Cartesian product is a set of pairs, not of products",
          body: "\\(A \\times B\\) does not multiply numbers: it lists ordered pairs \\((a, b)\\). It is not the union or the intersection either. Its size is \\(n(A) \\cdot n(B)\\), and the order inside each pair matters.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-slg-intervals",
      name: "Intervals of real numbers",
      intuition:
        "An interval is every real number between two endpoints, an unbroken piece of the number line. The bracket says whether the endpoint itself is included: square for in, round for out. Solutions of inequalities are written this way, and the answer options of recent papers use it.",
      definition:
        "- A **square bracket** includes the endpoint; a **round bracket** excludes it. Some Italian books write \\(]a, b[\\) for \\((a, b)\\).\n" +
        "- \\(\\pm\\infty\\) is never a number, so it always takes a round bracket.\n" +
        "- An answer such as \\(x < 1\\) or \\(x > 3\\) is a **union** of intervals: \\((-\\infty, 1) \\cup (3, +\\infty)\\). Two conditions that must both hold give an **intersection**.\n" +
        "- \\(\\mathbb{R} = (-\\infty, +\\infty)\\) means every real number is a solution; \\(\\varnothing\\) means none is.",
      table: {
        columns: ["Interval", "Inequality", "Endpoints"],
        rows: [
          { cells: ["\\([a, b]\\)", "\\(a \\le x \\le b\\)", "both included (closed)"] },
          { cells: ["\\((a, b)\\)", "\\(a < x < b\\)", "both excluded (open)"] },
          { cells: ["\\([a, b)\\)", "\\(a \\le x < b\\)", "a included, b excluded"] },
          { cells: ["\\((a, b]\\)", "\\(a < x \\le b\\)", "a excluded, b included"] },
          { cells: ["\\([a, +\\infty)\\)", "\\(x \\ge a\\)", "a included; infinity never is"] },
          { cells: ["\\((-\\infty, a)\\)", "\\(x < a\\)", "a excluded"] },
        ],
      },
      selfCheckExample: {
        prompt: "Let \\(A = [-3, 4)\\) and \\(B = (1, 6]\\). What is \\(A \\cap B\\)?",
        options: ["\\((1, 4]\\)", "\\([1, 4)\\)", "\\((1, 4)\\)", "\\([-3, 6]\\)", "\\((-3, 6)\\)"],
        steps: [
          "The intersection is the overlap: numbers above 1 and below 4.",
          "1 is excluded by \\(B\\) (round bracket) and 4 is excluded by \\(A\\) (round bracket), so both ends are open.",
          "Options D and E describe the union; A and B include an endpoint that one of the sets leaves out.",
        ],
        answer: "(C) \\((1, 4)\\)",
      },
      practiceSet: [
        { prompt: "Write \\(x \\ge -1\\) as an interval.", answer: "\\([-1, +\\infty)\\)" },
        { prompt: "Is 4 in the interval \\((-2, 4)\\)?", answer: "No", method: "The round bracket excludes 4" },
        { prompt: "Find \\([0, 5] \\cup [3, 8]\\).", answer: "\\([0, 8]\\)" },
        { prompt: "Find \\((-\\infty, 2] \\cap [2, 7)\\).", answer: "\\(\\{2\\}\\)", method: "Only the shared endpoint 2 is in both" },
      ],
      traps: [
        {
          title: "Round brackets do not mean a smaller set of whole numbers",
          body: "\\((1, 4)\\) is every real number strictly between 1 and 4, including 1.5 and 3.99. It is not the set \\(\\{2, 3\\}\\). Only set braces \\(\\{\\}\\) list individual elements.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-slg-venn-counting",
      name: "Counting with Venn diagrams: inclusion and exclusion",
      intuition:
        "Adding the sizes of two sets counts the shared elements twice, so subtract the overlap once. With three sets the pairwise overlaps are subtracted, but that removes the centre (in all three) once too often, so it is added back.",
      definition:
        "- Two sets: \\(n(A \\cup B) = n(A) + n(B) - n(A \\cap B)\\).\n" +
        "- Elements in **neither** set: \\(n(U) - n(A \\cup B)\\).\n" +
        "- In **A only**: \\(n(A) - n(A \\cap B)\\).\n" +
        "- Three sets: add the three sizes, subtract the three pairwise overlaps, add back the triple overlap.\n" +
        "- With three sets, fill the Venn diagram from the centre outwards: the triple overlap first, then each pair minus the centre, then each set alone.",
      formula: {
        label: "Inclusion and exclusion",
        latex:
          "\\begin{aligned} n(A \\cup B) &= n(A) + n(B) - n(A \\cap B) \\\\ n(A \\cup B \\cup C) &= n(A) + n(B) + n(C) - n(A \\cap B) - n(A \\cap C) - n(B \\cap C) + n(A \\cap B \\cap C) \\end{aligned}",
      },
      authoredExample: {
        prompt:
          "Of 100 students, 45 take biology, 40 chemistry and 35 physics. 15 take biology and chemistry, 10 biology and physics, 12 chemistry and physics, and 5 take all three. How many take none of the three? How many take biology only?",
        steps: [
          "Union: \\(45 + 40 + 35 - 15 - 10 - 12 + 5 = 88\\).",
          "None: \\(100 - 88 = 12\\).",
          "Biology only: start from 45, remove the two overlaps, and add back the centre that was removed twice: \\(45 - 15 - 10 + 5 = 25\\).",
        ],
        answer: "12 take none; 25 take biology only",
      },
      selfCheckExample: {
        prompt: "In a group of 60 students, 35 study Italian, 28 study Spanish and 9 study neither. How many study both languages?",
        options: ["12", "3", "51", "23", "63"],
        steps: [
          "Students in at least one language: \\(60 - 9 = 51\\).",
          "\\(35 + 28 - n(\\text{both}) = 51\\), so \\(n(\\text{both}) = 12\\).",
          "Option C is the union, E adds the two sets without removing the overlap, and D counts those who study Italian only.",
        ],
        answer: "(A) 12",
      },
      practiceSet: [
        { prompt: "\\(n(A) = 20\\), \\(n(B) = 15\\) and \\(n(A \\cup B) = 29\\). Find \\(n(A \\cap B)\\).", answer: "6" },
        { prompt: "In a group of 40, 25 like tea and 22 like coffee, and everyone likes at least one. How many like both?", answer: "7", method: "\\(25 + 22 - 40\\)" },
        { prompt: "With \\(n(A) = 18\\) and \\(n(A \\cap B) = 5\\), how many elements are in \\(A\\) only?", answer: "13" },
      ],
      traps: [
        {
          title: "Adding the set sizes counts the overlap twice",
          body: "\\(n(A) + n(B)\\) is the union only when the sets are disjoint. Otherwise subtract \\(n(A \\cap B)\\) once. With three sets, also remember to add back the centre after subtracting the pairs.",
        },
      ],
    },
  ],
};

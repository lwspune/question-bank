import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_RF_EQUIVALENCE_NOTE: SubtopicNote = {
  subtopicName: "Equivalence Relations and Classes",
  title: "Equivalence Relations and Equivalence Classes",
  oneLineDefinition:
    "A relation that is reflexive, symmetric and transitive, the standard proof layout for one, relations on ordered pairs of natural numbers, and the equivalence classes into which such a relation splits a set.",
  whyItMatters:
    "33 questions, fifteen of them from board papers in every year from 2023 to 2026. The board asks you to prove that a relation is an equivalence relation: one on integers given by divisibility (twice in 2026), a square product (2025) or a shared colony or sex (2023, 2026); one on ordered pairs of natural numbers (2023, and twice in 2024). In 2024 it set five questions on equivalence classes: the class [5] or [2], the number of classes, which statement about classes is false, and the lines parallel to a given line. On relations listed on {1, 2, 3} it asked which pairs make one an equivalence relation (2025) and set an assertion-reason item (2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmrf-equiv-proof",
      name: "Proving a relation is an equivalence relation",
      intuition:
        "An equivalence relation behaves like 'is the same as' in some one respect: same remainder, same colony, same number of pages. Anything is the same as itself, sameness works both ways, and two things the same as a third are the same as each other. The proof checks exactly these three things, in this order, and then says so.",
      definition:
        "- A relation R in a set A is an **equivalence relation** if R is reflexive, symmetric and transitive.\n" +
        "- Lay the proof out in three labelled parts (Reflexive, Symmetric, Transitive), each starting from general elements, then write the conclusion.\n" +
        "- For a divisibility rule, write it as an equation: 'n divides \\(a - b\\)' means \\(a - b = nk\\) for some integer \\(k\\). Then show the new multiplier (\\(-k\\), \\(k + m\\)) is an integer.\n" +
        "- If the rule has a modulus, such as 'p divides \\(|x - y|\\)', note that p divides \\(|x - y|\\) exactly when it divides \\(x - y\\), then work without the modulus.\n" +
        "- Relations of 'same' type (same colony, same number of pages, congruent triangles) follow the same three steps in words.",
      formula: {
        label: "Equivalence relation",
        latex: "\\text{reflexive} \\;+\\; \\text{symmetric} \\;+\\; \\text{transitive}",
      },
      authoredExample: {
        prompt: "Show that the relation \\(R = \\{(a, b) : a^2 - b^2 \\text{ is divisible by } 3\\}\\) in the set \\(\\mathbb{Z}\\) of integers is an equivalence relation.",
        steps: [
          "Reflexive: for any \\(a \\in \\mathbb{Z}\\), \\(a^2 - a^2 = 0 = 3 \\times 0\\), which is divisible by 3. So \\((a, a) \\in R\\).",
          "Symmetric: let \\((a, b) \\in R\\), so \\(a^2 - b^2 = 3k\\) for some \\(k \\in \\mathbb{Z}\\).",
          "Then \\(b^2 - a^2 = 3(-k)\\), and \\(-k \\in \\mathbb{Z}\\), so \\((b, a) \\in R\\).",
          "Transitive: let \\((a, b) \\in R\\) and \\((b, c) \\in R\\), so \\(a^2 - b^2 = 3k\\) and \\(b^2 - c^2 = 3m\\), with \\(k, m \\in \\mathbb{Z}\\).",
          "Adding, \\(a^2 - c^2 = 3(k + m)\\), and \\(k + m \\in \\mathbb{Z}\\), so \\((a, c) \\in R\\).",
          "R is reflexive, symmetric and transitive, so R is an equivalence relation.",
        ],
        answer: "R is an equivalence relation",
      },
      selfCheckExample: {
        prompt: "In the set of all students of a school, \\(x\\,R\\,y\\) if \\(x\\) and \\(y\\) were born in the same month. Is R an equivalence relation?",
        steps: [
          "Reflexive: every student is born in the same month as himself or herself.",
          "Symmetric: if \\(x\\) and \\(y\\) share a birth month, so do \\(y\\) and \\(x\\).",
          "Transitive: if \\(x, y\\) share a month and \\(y, z\\) share a month, it is the one birth month of \\(y\\), so \\(x, z\\) share it.",
        ],
        answer: "Yes, R is an equivalence relation",
      },
      practiceSet: [
        { prompt: "In \\(\\mathbb{Z}\\), \\(R = \\{(a, b) : a - b \\text{ is odd}\\}\\). Is R an equivalence relation?", answer: "No: it is not reflexive, since \\(a - a = 0\\) is not odd" },
        { prompt: "Is \\(R = \\{(a, b) : a \\le b\\}\\) in \\(\\mathbb{R}\\) an equivalence relation?", answer: "No: it is not symmetric (\\(1 \\le 2\\) but \\(2 \\le 1\\) is false)" },
        { prompt: "Is the relation 'is congruent to' on the triangles of a plane an equivalence relation?", answer: "Yes" },
      ],
      pyqExampleId: "fd0b372b-904c-41f6-b1ca-0bf28bba0e74",
      traps: [
        {
          title: "Writing 'divisible' with no equation",
          body: "Write \\(a - b = nk\\) with \\(k\\) an integer, and in each step name the new multiplier and say it is an integer. 'So it is divisible' alone does not show the step.",
        },
        {
          title: "Leaving out the conclusion",
          body: "After the three checks, write 'Hence R is an equivalence relation'. A proof that stops after transitivity has not answered the question.",
        },
        {
          title: "Adding moduli",
          body: "From \\(|x - y|\\) and \\(|y - z|\\) you cannot add to get \\(|x - z|\\). Drop the modulus first, add \\(x - y\\) and \\(y - z\\), then return to the modulus.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmrf-equiv-pairs",
      name: "Equivalence relations on ordered pairs of natural numbers",
      intuition:
        "Here each element is itself a pair, so a relation compares two pairs (a, b) and (c, d) through a condition on four numbers. The trick is to rearrange the condition so that one side uses only a and b and the other only c and d. Then the three properties follow almost at once.",
      definition:
        "- The set is \\(N \\times N\\); an element is a pair \\((a, b)\\), and \\((a, b)\\,R\\,(c, d)\\) is a condition on \\(a, b, c, d\\).\n" +
        "- **Reflexive**: put \\((c, d) = (a, b)\\) in the condition.\n" +
        "- **Symmetric**: start from the condition for \\((a, b)\\,R\\,(c, d)\\) and rearrange it into the condition for \\((c, d)\\,R\\,(a, b)\\).\n" +
        "- **Transitive**: number the two given conditions (i) and (ii), then add or multiply them so that \\(c\\) and \\(d\\) cancel.\n" +
        "- All entries are natural numbers, so none is zero and you may divide by any of them. Say this before you divide.",
      formula: {
        label: "Pairs relation",
        latex: "(a, b)\\,R\\,(c, d) \\text{ is a condition on } a, b, c, d \\in \\mathbf{N}",
      },
      authoredExample: {
        prompt: "R is defined on \\(N \\times N\\) by \\((a, b)\\,R\\,(c, d)\\) if \\(a^2 + d^2 = b^2 + c^2\\). Show that R is an equivalence relation.",
        steps: [
          "Reflexive: for any \\((a, b)\\), \\(a^2 + b^2 = b^2 + a^2\\), so \\((a, b)\\,R\\,(a, b)\\).",
          "Symmetric: let \\((a, b)\\,R\\,(c, d)\\), so \\(a^2 + d^2 = b^2 + c^2\\).",
          "Rewrite it as \\(c^2 + b^2 = d^2 + a^2\\), which is the condition for \\((c, d)\\,R\\,(a, b)\\).",
          "Transitive: let \\((a, b)\\,R\\,(c, d)\\) and \\((c, d)\\,R\\,(e, f)\\), so \\(a^2 + d^2 = b^2 + c^2\\) ...(i) and \\(c^2 + f^2 = d^2 + e^2\\) ...(ii).",
          "Adding (i) and (ii): \\(a^2 + d^2 + c^2 + f^2 = b^2 + c^2 + d^2 + e^2\\).",
          "Cancelling \\(c^2 + d^2\\): \\(a^2 + f^2 = b^2 + e^2\\), so \\((a, b)\\,R\\,(e, f)\\).",
          "Hence R is an equivalence relation on \\(N \\times N\\).",
        ],
        answer: "R is reflexive, symmetric and transitive, so it is an equivalence relation",
      },
      selfCheckExample: {
        prompt: "On \\(N \\times N\\), \\((a, b)\\,R\\,(c, d)\\) if \\(ab = cd\\). Is \\(((2, 6), (3, 4)) \\in R\\)? Is R transitive?",
        steps: [
          "\\(2 \\times 6 = 12\\) and \\(3 \\times 4 = 12\\), so the pair is in R.",
          "If \\(ab = cd\\) and \\(cd = ef\\), then \\(ab = ef\\), so R is transitive.",
        ],
        answer: "Yes, and yes",
      },
      practiceSet: [
        { prompt: "On \\(N \\times N\\), \\((a, b)\\,R\\,(c, d)\\) if \\(a + b = c + d\\). Write one pair related to \\((2, 7)\\).", answer: "Any pair with sum 9, such as \\((4, 5)\\)" },
        { prompt: "Why may you divide by \\(a\\), \\(b\\), \\(c\\) or \\(d\\) in a proof on \\(N \\times N\\)?", answer: "They are natural numbers, so none of them is zero" },
      ],
      pyqExampleId: "1a62686c-2ab9-41b7-9580-539adf95ad09",
      traps: [
        {
          title: "Dividing without saying why",
          body: "Before dividing by \\(a\\), \\(b\\), \\(c\\) or \\(d\\), write that they are natural numbers and so not zero.",
        },
        {
          title: "Transitivity from one equation",
          body: "Transitivity needs both given conditions. Write and number both, then combine them; quoting only the first cannot remove \\(c\\) and \\(d\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmrf-equiv-class",
      name: "Equivalence classes",
      intuition:
        "An equivalence relation sorts a set into groups: everything in one group is related to everything else in it, and nothing is related across groups. For 'a minus b is even' on the integers, the groups are the even numbers and the odd numbers. Each group is called an equivalence class, and the class of an element a is the group that contains a.",
      definition:
        "- The **equivalence class** \\([a]\\) is the subset of the set containing all elements related to \\(a\\). It always contains \\(a\\) itself.\n" +
        "- An equivalence relation divides a set X into mutually disjoint subsets \\(A_i\\) such that: all elements of \\(A_i\\) are related to each other; no element of \\(A_i\\) is related to any element of \\(A_j\\), \\(i \\ne j\\); \\(\\cup A_j = X\\) and \\(A_i \\cap A_j = \\phi\\), \\(i \\ne j\\).\n" +
        "- If two classes share an element, they are equal.\n" +
        "- For '2 divides \\(a - b\\)' in \\(\\mathbb{Z}\\): \\([0]\\) = even integers, \\([1]\\) = odd integers. For '3 divides \\(a - b\\)': three classes \\([0], [1], [2]\\).\n" +
        "- To write \\([a]\\) in a finite set, solve the condition for the unknown element and keep only values inside the set, checking both end points.",
      formula: {
        label: "Equivalence class of a",
        latex: "[a] = \\{x \\in X : x\\,R\\,a\\}",
      },
      authoredExample: {
        prompt: "R is the equivalence relation on \\(A = \\{x \\in \\mathbb{Z} : 0 \\le x \\le 15\\}\\) given by \\(R = \\{(a, b) : a - b \\text{ is a multiple of } 4\\}\\). Write the equivalence class \\([3]\\) and the number of equivalence classes.",
        steps: [
          "Here \\(A = \\{0, 1, 2, \\ldots, 15\\}\\).",
          "\\([3]\\) is the set of \\(x \\in A\\) with \\(x - 3 = 4k\\), that is \\(x = 3 + 4k\\), \\(k \\in \\mathbb{Z}\\).",
          "\\(k = 0, 1, 2, 3\\) give \\(x = 3, 7, 11, 15\\); \\(k = -1\\) gives \\(-1 \\notin A\\) and \\(k = 4\\) gives \\(19 \\notin A\\).",
          "So \\([3] = \\{3, 7, 11, 15\\}\\).",
          "The remainders on division by 4 are 0, 1, 2 and 3, so the classes are \\([0], [1], [2], [3]\\): four disjoint classes whose union is A.",
        ],
        answer: "\\([3] = \\{3, 7, 11, 15\\}\\); 4 equivalence classes",
      },
      selfCheckExample: {
        prompt: "R is 'is similar to' on the set of all triangles. Which of \\(T_1\\) (sides 2, 3, 4), \\(T_2\\) (sides 4, 6, 8) and \\(T_3\\) (sides 3, 4, 5) lie in the same equivalence class?",
        steps: [
          "\\(\\frac{4}{2} = \\frac{6}{3} = \\frac{8}{4} = 2\\), so \\(T_1\\) is similar to \\(T_2\\).",
          "\\(T_3\\) has sides in the ratio \\(3 : 4 : 5\\), not \\(2 : 3 : 4\\), so it is similar to neither.",
        ],
        answer: "\\(T_1\\) and \\(T_2\\)",
      },
      practiceSet: [
        { prompt: "Two equivalence classes \\([a]\\) and \\([b]\\) have an element in common. What can you say?", answer: "\\([a] = [b]\\)" },
        { prompt: "R is the identity relation \\(\\{(x, x)\\}\\) on a set of 7 elements. How many equivalence classes are there?", answer: "7, one for each element" },
        { prompt: "R is 'is parallel to' on the lines of the XY plane. Describe the class of the line \\(y = -x + 1\\).", answer: "All lines \\(y = -x + c\\), \\(c \\in \\mathbb{R}\\)" },
      ],
      pyqExampleId: "e0f66220-6d44-4f47-96f6-c9053b0acead",
      traps: [
        {
          title: "Listing elements outside the set",
          body: "A class lives inside the given set. Solve the condition, then drop values outside it, and keep both end points when the set says 'less than or equal to'.",
        },
        {
          title: "Classes that overlap",
          body: "Two different equivalence classes never share an element. An MCQ statement that says \\(A_i \\cap A_j \\ne \\phi\\) for \\(i \\ne j\\) is the false one.",
        },
        {
          title: "Leaving a out of [a]",
          body: "R is reflexive, so \\(a\\) is always in \\([a]\\). A class written without its own element is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmrf-equiv-listed",
      name: "Making a listed relation an equivalence relation",
      intuition:
        "Given a few pairs, you can build the smallest equivalence relation that contains them. Elements joined by a pair, directly or through a chain, end up in one class, and every pair inside a class must then be in the relation. Add pairs property by property, and keep checking until nothing new is forced.",
      definition:
        "- Step 1, reflexive: add every missing \\((a, a)\\).\n" +
        "- Step 2, symmetric: add the reverse of every pair.\n" +
        "- Step 3, transitive: for every chain \\((a, b), (b, c)\\) add \\((a, c)\\); then repeat step 2 for the new pairs, until nothing new is forced.\n" +
        "- The largest equivalence relation on A is the universal relation \\(A \\times A\\); the smallest is \\(\\{(a, a) : a \\in A\\}\\).\n" +
        "- On \\(\\{1, 2, 3\\}\\) there are exactly two equivalence relations containing \\((1, 2)\\): \\(\\{(1, 1), (2, 2), (3, 3), (1, 2), (2, 1)\\}\\) and the universal relation.",
      authoredExample: {
        prompt: "On \\(A = \\{p, q, r, s\\}\\), find the smallest equivalence relation that contains \\((p, q)\\) and \\((q, r)\\).",
        steps: [
          "Reflexive: add \\((p, p), (q, q), (r, r), (s, s)\\).",
          "Symmetric: add \\((q, p)\\) and \\((r, q)\\).",
          "Transitive: the chain \\((p, q), (q, r)\\) forces \\((p, r)\\); symmetry then forces \\((r, p)\\).",
          "Now p, q, r are all related to each other and s only to itself: classes \\(\\{p, q, r\\}\\) and \\(\\{s\\}\\).",
          "R = all 9 pairs of \\(\\{p, q, r\\} \\times \\{p, q, r\\}\\) together with \\((s, s)\\): 10 pairs.",
        ],
        answer: "\\(R = \\{(p, p), (q, q), (r, r), (s, s), (p, q), (q, p), (q, r), (r, q), (p, r), (r, p)\\}\\)",
      },
      selfCheckExample: {
        prompt: "On \\(\\{1, 2, 3, 4\\}\\), \\(R = \\{(1, 1), (2, 2), (3, 3), (4, 4), (3, 4)\\}\\). Which single pair makes R an equivalence relation?",
        steps: [
          "R is reflexive. Symmetry needs \\((4, 3)\\).",
          "With \\((4, 3)\\) added, the chains \\((3, 4), (4, 3)\\) and \\((4, 3), (3, 4)\\) need \\((3, 3)\\) and \\((4, 4)\\), already present.",
        ],
        answer: "\\((4, 3)\\)",
      },
      practiceSet: [
        { prompt: "On \\(\\{1, 2, 3\\}\\), is \\(\\{(1, 1), (2, 2), (3, 3)\\}\\) an equivalence relation?", answer: "Yes: it is reflexive, symmetric and transitive" },
        { prompt: "What is the largest equivalence relation on a set A?", answer: "\\(A \\times A\\), the universal relation" },
      ],
      pyqExampleId: "15e8c4a9-4b5d-4cfa-ba4e-838668900485",
      traps: [
        {
          title: "Stopping after symmetry",
          body: "After adding the reflexive and symmetric pairs, check transitivity on the new list. A chain \\((a, b), (b, c)\\) forces \\((a, c)\\), and then symmetry forces \\((c, a)\\).",
        },
        {
          title: "Adding pairs that were not forced",
          body: "'Smallest' means only forced pairs. Joining a lone element to a class without a reason gives an equivalence relation, but not the smallest one.",
        },
      ],
    },
  ],
};

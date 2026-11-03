import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Mathematics, Ch. 1 Relations and Functions. Definitions are
 * NCERT's own, trimmed; most-asked groups from the CBSE board past-paper
 * questions in the bank, 2023-2026 (one 2025 question on the domain of f + g
 * left out: the algebra of functions is not taught in this chapter).
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Relations and Functions",
  chapterSlug: "relations-and-functions",
  source: "NCERT Mathematics Part I (CBSE Class 12), Chapter 1",
  keyPoints: [
    {
      term: "Empty and universal relation",
      text: "A relation R in a set A is called **empty**, if no element of A is related to any element of A: \\(R = \\phi \\subset A \\times A\\). It is **universal**, if each element of A is related to every element of A: \\(R = A \\times A\\). Both are called trivial relations.",
    },
    {
      term: "Reflexive, symmetric, transitive",
      text: "R in A is **reflexive** if \\((a, a) \\in R\\) for every \\(a \\in A\\); **symmetric** if \\((a_1, a_2) \\in R\\) implies \\((a_2, a_1) \\in R\\); **transitive** if \\((a_1, a_2) \\in R\\) and \\((a_2, a_3) \\in R\\) imply \\((a_1, a_3) \\in R\\).",
    },
    {
      term: "Equivalence relation",
      text: "A relation R in a set A is said to be an equivalence relation if R is reflexive, symmetric and transitive. **Prove all three** for an equivalence relation; one counter-example is enough to show a property fails.",
    },
    {
      term: "Equivalence class",
      text: "The equivalence class \\([a]\\) containing \\(a \\in X\\) is the subset of X containing all elements b related to a. Example: for \\(R = \\{(a, b) : 2 \\text{ divides } a - b\\}\\) in \\(\\mathbb{Z}\\), \\([0]\\) is the even integers and \\([1]\\) the odd integers.",
    },
    {
      term: "Equivalence classes split the set",
      text: "An equivalence relation R divides X into mutually disjoint subsets \\(A_i\\): all elements of \\(A_i\\) are related to each other, no element of \\(A_i\\) is related to any element of \\(A_j\\) (\\(i \\neq j\\)), and the union of all \\(A_i\\) is X.",
    },
    {
      term: "One-one (injective)",
      text: "\\(f : X \\to Y\\) is one-one (or injective) if the images of distinct elements of X under f are distinct: \\(f(x_1) = f(x_2) \\Rightarrow x_1 = x_2\\). Otherwise f is **many-one**.",
    },
    {
      term: "Onto (surjective)",
      text: "\\(f : X \\to Y\\) is onto (or surjective) if every element of Y is the image of some element of X under f: for every \\(y \\in Y\\) there is an \\(x \\in X\\) with \\(f(x) = y\\).",
    },
    {
      term: "Onto and range",
      text: "f is onto if and only if **range of f = codomain Y**. To show f is not onto, name one element of Y that has no pre-image in X.",
    },
    {
      term: "Bijective",
      text: "\\(f : X \\to Y\\) is said to be one-one and onto (or bijective), if f is both one-one and onto.",
    },
    {
      term: "Finite set property",
      text: "For a finite set X, a function \\(f : X \\to X\\) is one-one if and only if it is onto. This is the characteristic property of a finite set; it is not true for an infinite set (\\(f(x) = 2x\\) on N is one-one but not onto).",
    },
    {
      term: "Composition",
      text: "For \\(f : A \\to B\\) and \\(g : B \\to C\\), the composition gof is the function \\(gof : A \\to C\\) given by \\(gof(x) = g(f(x))\\). In general \\(gof \\neq fog\\).",
    },
    {
      term: "Invertible function",
      text: "\\(f : X \\to Y\\) is invertible if there exists \\(g : Y \\to X\\) with \\(gof = I_X\\) and \\(fog = I_Y\\). Then g is the inverse of f, written \\(f^{-1}\\).",
    },
    {
      term: "Invertible means bijective",
      text: "f is invertible if and only if f is one-one and onto. So to prove f invertible, it is enough to show it is a bijection.",
    },
  ],
  formulas: [
    { label: "One-one test", latex: "f(x_1) = f(x_2) \\Rightarrow x_1 = x_2 \\quad \\text{for all } x_1, x_2 \\in X" },
    { label: "Onto test", latex: "\\text{for every } y \\in Y, \\; \\text{solve } y = f(x) \\text{ and check } x \\in X" },
    { label: "Composition", latex: "(gof)(x) = g(f(x))" },
    { label: "Inverse", latex: "gof = I_X, \\quad fog = I_Y \\;\\Rightarrow\\; g = f^{-1}" },
    {
      label: "Counting, with n(A) = m and n(B) = n",
      latex: "\\text{relations } A \\to B: 2^{mn} \\qquad \\text{functions } A \\to B: n^{m}",
    },
    {
      label: "One-one functions from A to B",
      latex: "\\frac{n!}{(n - m)!} \\;\\; (m \\le n), \\qquad 0 \\;\\; (m > n)",
    },
    { label: "Bijections from a set of n elements to itself", latex: "n!" },
    { label: "Relations on a set of n elements", latex: "\\text{all: } 2^{n^2} \\qquad \\text{reflexive: } 2^{n^2 - n}" },
    { label: "Onto functions from m elements to 2 elements", latex: "2^{m} - 2 \\quad (m \\ge 2)" },
  ],
  derivations: [
    {
      title: "Show that a relation is an equivalence relation, and find its equivalence classes",
      steps: [
        "**Reflexive:** show \\((a, a) \\in R\\) for every a in the set (e.g. \\(a - a = 0\\) is divisible by n).",
        "**Symmetric:** assume \\((a, b) \\in R\\) and show \\((b, a) \\in R\\) (e.g. \\(a - b = kn \\Rightarrow b - a = (-k)n\\)).",
        "**Transitive:** assume \\((a, b), (b, c) \\in R\\) and show \\((a, c) \\in R\\) (e.g. add: \\(a - c = (a - b) + (b - c)\\)).",
        "Conclude: R is an equivalence relation.",
        "Equivalence class \\([a]\\): list every element related to a. Classes are disjoint and together make up the whole set.",
      ],
    },
    {
      title: "Show that a function is one-one and onto (bijective)",
      steps: [
        "**One-one:** let \\(f(x_1) = f(x_2)\\); simplify to \\(x_1 = x_2\\). For a quadratic, factor out \\((x_1 - x_2)\\) and show the other factor is non-zero on the domain.",
        "**Onto:** take any y in the codomain, solve \\(y = f(x)\\) for x.",
        "Check that this x lies in the domain (and \\(x \\neq\\) any excluded value), and that \\(f(x) = y\\).",
        "Hence every y has a pre-image: f is onto. Both together: f is bijective.",
      ],
    },
    {
      title: "Show that a function is neither one-one nor onto",
      steps: [
        "**Not one-one:** give two different inputs with the same image (for \\(f(x) = x^2\\): \\(f(-1) = f(1) = 1\\)).",
        "**Not onto:** give one element of the codomain with no pre-image (for \\(f(x) = x^2\\) on R: \\(-2\\), since \\(x^2 \\ge 0\\)).",
        "To make it onto, restrict the codomain to the range (find the range by solving \\(y = f(x)\\) for real x).",
      ],
    },
    {
      title: "Show that a function is invertible and find its inverse",
      steps: [
        "Show f is one-one and onto, so f is invertible.",
        "Write \\(y = f(x)\\) and solve for x: \\(x = g(y)\\). For \\(f(x) = 4x + 3\\): \\(g(y) = \\frac{y - 3}{4}\\).",
        "Check \\(gof(x) = x\\) and \\(fog(y) = y\\). Then \\(f^{-1} = g\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    {
      topic: "Show that a function is one-one and onto (bijective), or that it is not; find a set so that f is onto",
      marks: 5,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Check whether a relation is reflexive, symmetric and transitive; show it is an equivalence relation",
      marks: 5,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Name the type of a relation on a small set; pairs to add; equivalence classes",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Decide whether a given function is one-one, onto, both or neither (MCQ, Assertion and Reason)",
      marks: 1,
      years: [2026, 2025, 2024],
    },
    {
      topic: "Is a relation a function? Is a function between two small sets one-one, onto or bijective?",
      years: [2026, 2025, 2023],
    },
    {
      topic: "Count the relations, reflexive relations, functions, one-one or onto functions between two sets",
      marks: 1,
      years: [2026, 2025, 2023],
    },
  ],
  mistakes: [
    {
      title: "Finding x but not checking it lies in the domain",
      body: "For onto, solving \\(y = f(x)\\) is half the work. For \\(f(x) = 2x + 1\\) on N, \\(x = \\frac{y - 1}{2}\\) is not a natural number when \\(y = 2\\): f is **not** onto. Check the excluded value too (e.g. \\(x \\neq 3\\)).",
    },
    {
      title: "Confusing codomain with range",
      body: "Onto depends on the codomain. \\(f(x) = x^2 + 1\\) from R is onto \\([1, \\infty)\\) but not onto R. Read the codomain from the question before you decide.",
    },
    {
      title: "Proving a property from one example",
      body: "One example never proves reflexive, symmetric or transitive for an infinite set: argue for general a, b, c. One counter-example **is** enough to show a property fails.",
    },
    {
      title: "Missing pairs for transitivity",
      body: "If \\((1, 2)\\) and \\((2, 1)\\) are in R, transitivity needs \\((1, 1)\\) and \\((2, 2)\\) as well. Check every chain \\((a, b), (b, c)\\), including those that come back to a.",
    },
    {
      title: "Dividing by \\(x_1 - x_2\\) without care",
      body: "For a quadratic like \\(4x^2 + 4x - 5\\) on \\([0, \\infty)\\), \\(f(x_1) = f(x_2)\\) gives \\((x_1 - x_2)(4x_1 + 4x_2 + 4) = 0\\). State that the second factor is positive on the domain, so \\(x_1 = x_2\\).",
    },
  ],
};

export default sheet;

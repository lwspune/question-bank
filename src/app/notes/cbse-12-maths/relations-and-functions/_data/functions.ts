import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_RF_FUNCTIONS_NOTE: SubtopicNote = {
  subtopicName: "One-One and Onto Functions",
  title: "One-One, Onto and Bijective Functions",
  oneLineDefinition:
    "One-one (injective), onto (surjective) and bijective functions: the standard proofs, using the range to decide onto, functions on natural numbers and integers, and functions between two finite sets.",
  whyItMatters:
    "75 questions, forty-three of them from board papers in every year from 2023 to 2026, more than any other page of the chapter. The board asks you to show that a function is one-one and onto, very often a rational function such as (x − 2)/(x − 3), set in 2024, 2025 and twice in 2026 and also in NCERT Exercise 1.2; to show a quadratic or other function is not one-one or not onto and find its range or the codomain that makes it onto (2023, 2024, 2026); MCQs and assertion-reason items on functions on N and Z (2024 to 2026); and case studies on functions between two small sets (2023, 2025, 2026). The function 4x² + 4x − 5 from [0, ∞) to [−5, ∞) was set in 2023 and again in 2026.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmrf-tests",
      name: "Proving that a function is one-one and onto",
      intuition:
        "One-one means no two inputs share an output, so you start from two equal outputs and show the inputs were equal. Onto means every element of the codomain is reached, so you take any y, solve for the x that would give it, and check that this x is really allowed in the domain. Both together make the function bijective.",
      definition:
        "- **One-one (injective)**: \\(f : X \\to Y\\) is one-one if \\(f(x_1) = f(x_2)\\) implies \\(x_1 = x_2\\) for every \\(x_1, x_2 \\in X\\). Otherwise f is **many-one**.\n" +
        "- **Onto (surjective)**: for every \\(y \\in Y\\) there is an \\(x \\in X\\) with \\(f(x) = y\\). f is onto exactly when the range of f is Y.\n" +
        "- **Bijective**: both one-one and onto.\n" +
        "- **One-one proof**: start from \\(f(x_1) = f(x_2)\\) and simplify to \\(x_1 = x_2\\).\n" +
        "- **Onto proof**: take any y in the codomain, solve \\(y = f(x)\\) for x, show this x lies in the domain (for a rational function, that it is not the excluded value), and check \\(f(x) = y\\).\n" +
        "- **Not one-one**: two different inputs with the same image. **Not onto**: one element of the codomain with no pre-image.",
      formula: {
        label: "One-one and onto",
        latex: "f(x_1) = f(x_2) \\Rightarrow x_1 = x_2; \\qquad \\forall\\, y \\in Y\\ \\exists\\, x \\in X : f(x) = y",
      },
      authoredExample: {
        prompt: "Show that \\(f : \\mathbb{R} - \\{2\\} \\to \\mathbb{R} - \\{1\\}\\), \\(f(x) = \\dfrac{x + 1}{x - 2}\\), is one-one and onto.",
        steps: [
          "One-one: let \\(x_1, x_2 \\in \\mathbb{R} - \\{2\\}\\) with \\(f(x_1) = f(x_2)\\).",
          "Then \\(\\dfrac{x_1 + 1}{x_1 - 2} = \\dfrac{x_2 + 1}{x_2 - 2}\\), so \\((x_1 + 1)(x_2 - 2) = (x_2 + 1)(x_1 - 2)\\).",
          "\\(x_1x_2 - 2x_1 + x_2 - 2 = x_1x_2 - 2x_2 + x_1 - 2\\)",
          "\\(3x_2 = 3x_1\\), so \\(x_1 = x_2\\). Hence f is one-one.",
          "Onto: let \\(y \\in \\mathbb{R} - \\{1\\}\\) and put \\(y = \\dfrac{x + 1}{x - 2}\\).",
          "\\(xy - 2y = x + 1\\), so \\(x(y - 1) = 2y + 1\\) and \\(x = \\dfrac{2y + 1}{y - 1}\\), a real number since \\(y \\ne 1\\).",
          "This x is not 2: if \\(\\dfrac{2y + 1}{y - 1} = 2\\), then \\(2y + 1 = 2y - 2\\), that is \\(1 = -2\\), which is impossible. So \\(x \\in \\mathbb{R} - \\{2\\}\\).",
          "\\(f\\left(\\dfrac{2y + 1}{y - 1}\\right) = \\dfrac{\\frac{3y}{y - 1}}{\\frac{3}{y - 1}} = y\\), so every y has a pre-image and f is onto.",
          "Hence f is one-one and onto, that is, bijective.",
        ],
        answer: "f is one-one and onto (bijective)",
      },
      selfCheckExample: {
        prompt: "Show that \\(f : \\mathbb{R} \\to \\mathbb{R}\\), \\(f(x) = 7 - 3x\\), is one-one and onto.",
        steps: [
          "One-one: \\(7 - 3x_1 = 7 - 3x_2 \\Rightarrow x_1 = x_2\\).",
          "Onto: for any real y, \\(x = \\dfrac{7 - y}{3}\\) is real and \\(f(x) = 7 - (7 - y) = y\\).",
        ],
        answer: "Bijective",
      },
      practiceSet: [
        { prompt: "For \\(f : \\mathbb{R} \\to \\mathbb{R}\\), \\(f(x) = 5x + 2\\), write the pre-image of y.", answer: "\\(x = \\dfrac{y - 2}{5}\\)" },
        { prompt: "Is \\(f : \\mathbb{R} \\to \\mathbb{R}\\), \\(f(x) = x^3 + 4\\), one-one?", answer: "Yes: \\(x_1^3 + 4 = x_2^3 + 4\\) gives \\(x_1^3 = x_2^3\\), so \\(x_1 = x_2\\)" },
        { prompt: "What is enough to show that a function is not onto?", answer: "One element of the codomain with no pre-image" },
      ],
      pyqExampleId: "2343e884-0313-4f36-91d0-5151c1c4b136",
      traps: [
        {
          title: "Not checking that the pre-image lies in the domain",
          body: "For a rational function, show that the x you found is not the excluded value. For a domain like \\([0, \\infty)\\), show that x is not negative. Without this the onto proof is incomplete.",
        },
        {
          title: "Calling f onto because f(x) is real",
          body: "Showing that every image lies in the codomain is true of every function. Onto needs the reverse: a pre-image for each y.",
        },
        {
          title: "Ignoring the codomain",
          body: "The same rule can be onto with one codomain and not with another. \\(\\dfrac{x - 2}{x - 3}\\) on \\(\\mathbb{R} - \\{3\\}\\) is onto \\(\\mathbb{R} - \\{1\\}\\) but not onto \\(\\mathbb{R}\\), because 1 is never taken.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmrf-range",
      name: "The range decides onto: quadratic and bounded functions",
      intuition:
        "A function is onto when its range fills the whole codomain. A parabola opening upwards has a lowest value, so it never reaches the numbers below it, and it takes each higher value twice, once on each side of its axis. Cut the domain down to one side of the axis and it becomes one-one; choose the codomain to be the range and it becomes onto.",
      definition:
        "- f is onto if and only if the range of f equals the codomain.\n" +
        "- To find the range, put \\(y = f(x)\\), solve for x, and see which y give an x inside the domain. Completing the square gives the least or greatest value of a quadratic.\n" +
        "- A quadratic \\(ax^2 + bx + c\\) on \\(\\mathbb{R}\\) is not one-one (equal values on both sides of the axis \\(x = -\\frac{b}{2a}\\)) and not onto \\(\\mathbb{R}\\).\n" +
        "- On a domain lying on one side of the axis, such as \\([0, \\infty)\\) when the axis is at a negative x, the quadratic is one-one.\n" +
        "- Functions like \\(x^2\\), \\(|x|\\), \\(x^4\\) and \\(\\sqrt{16 - x^2}\\) are even, \\(f(-x) = f(x)\\), so they are not one-one on a domain that contains \\(-x\\) and \\(x\\).\n" +
        "- To find the codomain A that makes \\(f : X \\to A\\) onto, take A equal to the range.",
      formula: {
        label: "Onto test with the range",
        latex: "f : X \\to Y \\text{ is onto} \\text{ exactly when } \\text{Range of } f = Y",
      },
      authoredExample: {
        prompt: "Show that \\(f : \\mathbb{R} \\to \\mathbb{R}\\), \\(f(x) = x^2 - 6x + 10\\), is neither one-one nor onto. Find all x with \\(f(x) = 5\\), and the set A for which \\(f : \\mathbb{R} \\to A\\) is onto.",
        steps: [
          "Not one-one: \\(f(2) = 4 - 12 + 10 = 2\\) and \\(f(4) = 16 - 24 + 10 = 2\\), but \\(2 \\ne 4\\).",
          "Range: \\(f(x) = (x - 3)^2 + 1 \\ge 1\\), and each \\(y \\ge 1\\) is taken at \\(x = 3 \\pm \\sqrt{y - 1}\\). So the range is \\([1, \\infty)\\).",
          "Not onto: \\(0 \\in \\mathbb{R}\\) has no pre-image, since \\(f(x) \\ge 1\\) for every x.",
          "\\(f(x) = 5\\): \\(x^2 - 6x + 5 = 0\\), \\((x - 1)(x - 5) = 0\\), so \\(x = 1\\) or \\(x = 5\\).",
          "For \\(f : \\mathbb{R} \\to A\\) to be onto, A must be the range: \\(A = [1, \\infty)\\).",
        ],
        answer: "Neither one-one nor onto; \\(x = 1, 5\\); \\(A = [1, \\infty)\\)",
      },
      selfCheckExample: {
        prompt: "Is \\(f : [0, \\infty) \\to [3, \\infty)\\), \\(f(x) = x^2 + 2x + 3\\), one-one and onto?",
        steps: [
          "One-one: \\(f(x_1) = f(x_2)\\) gives \\((x_1 - x_2)(x_1 + x_2 + 2) = 0\\), and \\(x_1 + x_2 + 2 \\ge 2\\), so \\(x_1 = x_2\\).",
          "Onto: \\(y = (x + 1)^2 + 2\\) gives \\(x = -1 + \\sqrt{y - 2}\\); for \\(y \\ge 3\\), \\(\\sqrt{y - 2} \\ge 1\\), so \\(x \\ge 0\\) and x is in the domain.",
        ],
        answer: "Yes, f is bijective",
      },
      practiceSet: [
        { prompt: "For \\(f(x) = |x| + 2\\) on \\(\\mathbb{R}\\), give two different inputs with the same image.", answer: "\\(f(-1) = f(1) = 3\\)" },
        { prompt: "What is the range of \\(f(x) = 3 - x^2\\) on \\(\\mathbb{R}\\)?", answer: "\\((-\\infty, 3]\\)" },
        { prompt: "For \\(f : \\mathbb{R} \\to A\\), \\(f(x) = x^2 + 5\\), to be onto, what is A?", answer: "\\([5, \\infty)\\)" },
      ],
      pyqExampleId: "f0af3bb7-501a-4cc4-831e-95f4c6907906",
      traps: [
        {
          title: "An open bracket at a value that is taken",
          body: "If the least value is reached, the range starts with a square bracket: \\([1, \\infty)\\), not \\((1, \\infty)\\). MCQ options are built on this slip.",
        },
        {
          title: "Keeping a root outside the domain",
          body: "When you solve \\(f(x) = k\\) on \\([0, \\infty)\\), reject a negative root and say why. It is not a value of the function there.",
        },
        {
          title: "Showing not one-one by algebra alone",
          body: "Factorising to \\((x_1 - x_2)(\\ldots) = 0\\) only suggests it. Finish with two actual different inputs that give the same image.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmrf-discrete",
      name: "Functions on N and Z, and functions defined in pieces",
      intuition:
        "On natural numbers or integers, onto usually fails for a simple reason: the x you solve for is a fraction, or 0, or negative, and so is not in the domain. One-one can also change with the domain: \\(x^2\\) is one-one on N but not on Z, where \\(-1\\) and \\(1\\) give the same square. A rule given in pieces (one for odd, one for even) is tested case by case.",
      definition:
        "- In this chapter \\(\\mathbf{N} = \\{1, 2, 3, \\ldots\\}\\) (no 0) and \\(\\mathbf{W} = \\{0, 1, 2, \\ldots\\}\\).\n" +
        "- **Not onto on N or Z**: find a y in the codomain whose solved x is not a natural number or integer. For \\(f(x) = 2x\\) on N, 1 has no pre-image.\n" +
        "- **One-one depends on the domain**: \\(x^2\\) is one-one on N (since \\(x + y > 0\\)) but not on Z.\n" +
        "- **Piecewise rule** (odd and even): for one-one, check both odd, both even, and one of each, and rule out the mixed case. For onto, give the pre-image of an odd y and of an even y separately.\n" +
        "- A piecewise function can be onto without being one-one, if it sends many inputs to one value.",
      authoredExample: {
        prompt: "Show that \\(f : \\mathbb{Z} \\to \\mathbb{Z}\\), \\(f(x) = \\begin{cases} x + 2, & x \\text{ even} \\\\ x - 2, & x \\text{ odd} \\end{cases}\\), is a bijection.",
        steps: [
          "One-one: let \\(f(x_1) = f(x_2)\\).",
          "If both are even: \\(x_1 + 2 = x_2 + 2\\), so \\(x_1 = x_2\\). If both are odd: \\(x_1 - 2 = x_2 - 2\\), so \\(x_1 = x_2\\).",
          "If \\(x_1\\) is even and \\(x_2\\) is odd: \\(x_1 + 2 = x_2 - 2\\) gives \\(x_2 - x_1 = 4\\). But odd minus even is odd and 4 is even, so this case is impossible. Hence f is one-one.",
          "Onto: if y is even, then \\(y - 2\\) is even and \\(f(y - 2) = y\\).",
          "If y is odd, then \\(y + 2\\) is odd and \\(f(y + 2) = y\\).",
          "Every integer has a pre-image, so f is onto. Hence f is a bijection.",
        ],
        answer: "f is one-one and onto",
      },
      selfCheckExample: {
        prompt: "Is \\(f : \\mathbf{N} \\to \\mathbf{N}\\), \\(f(x) = x^2 + 1\\), one-one? Is it onto?",
        steps: [
          "One-one: \\(x_1^2 + 1 = x_2^2 + 1\\) gives \\(x_1^2 = x_2^2\\), and since both are positive, \\(x_1 = x_2\\).",
          "Not onto: \\(f(x) = 1\\) needs \\(x^2 = 0\\), and \\(0 \\notin \\mathbf{N}\\).",
        ],
        answer: "One-one but not onto",
      },
      practiceSet: [
        { prompt: "Is \\(f : \\mathbb{Z} \\to \\mathbb{Z}\\), \\(f(x) = x + 7\\), onto?", answer: "Yes: the pre-image of y is \\(y - 7\\), an integer" },
        { prompt: "Give a natural number with no pre-image under \\(f(x) = 3x\\) on \\(\\mathbf{N}\\).", answer: "1 (any number that is not a multiple of 3)" },
        { prompt: "Is \\(f : \\mathbb{Z} \\to \\mathbb{Z}\\), \\(f(x) = x^2\\), one-one?", answer: "No: \\(f(-2) = f(2) = 4\\)" },
      ],
      pyqExampleId: "78fa73c9-bb20-4699-8c12-9b68a836147f",
      traps: [
        {
          title: "Taking 0 as a natural number",
          body: "Here N starts at 1. A pre-image of 0 does not count, and \\(f : \\mathbf{N} \\to \\mathbf{W}\\) is a different question from \\(f : \\mathbf{N} \\to \\mathbf{N}\\).",
        },
        {
          title: "Solving for x and stopping",
          body: "After \\(x = \\dfrac{y - b}{a}\\), check whether it is a natural number or an integer. Name one y for which it is not, and that settles 'not onto'.",
        },
        {
          title: "Forgetting the mixed case",
          body: "For an odd and even rule, the one-one proof must rule out one odd and one even input with the same image. Skipping it loses a step mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmrf-finite",
      name: "Functions between finite sets: checking and counting",
      intuition:
        "When both sets are small, you can see everything. Each element of the domain picks exactly one image. One-one means no two pick the same image, so there must be enough images to go round; onto means every element of the codomain gets picked, so there must be enough elements picking. Counting functions is counting these choices.",
      definition:
        "- A set of pairs is a function from A to B when every element of A appears exactly once as a first entry.\n" +
        "- **One-one**: no second entry is repeated. **Onto**: every element of B appears as a second entry.\n" +
        "- If \\(n(A) = m\\) and \\(n(B) = n\\): each element of A has n choices, so there are \\(n^m\\) functions from A to B.\n" +
        "- A one-one function from A to B exists only if \\(m \\le n\\); an onto function only if \\(m \\ge n\\); a bijection only if \\(m = n\\).\n" +
        "- The number of one-one functions from \\(\\{1, 2, 3\\}\\) to itself is \\(3! = 6\\); the number of onto functions from \\(\\{1, 2, \\ldots, n\\}\\) to itself is \\(n!\\).\n" +
        "- For a finite set X, a function \\(f : X \\to X\\) is one-one if and only if it is onto. This is not true for an infinite set.\n" +
        "- Onto functions from a set of m elements to a set of 2 elements: all \\(2^m\\) functions except the 2 constant ones, so \\(2^m - 2\\).",
      formula: {
        label: "Number of functions from A to B",
        latex: "n(A) = m,\\ n(B) = n \\;\\Rightarrow\\; \\text{number of functions} = n^{m}",
      },
      authoredExample: {
        prompt: "Let \\(A = \\{a_1, a_2, a_3\\}\\) and \\(B = \\{b_1, b_2, b_3, b_4\\}\\). (i) How many functions are there from A to B? (ii) How many of them are one-one? (iii) Is any function from A to B onto? (iv) Is \\(f = \\{(a_1, b_2), (a_2, b_4), (a_3, b_1)\\}\\) one-one? onto?",
        steps: [
          "(i) Each of the 3 elements of A has 4 choices: \\(4^3 = 64\\) functions.",
          "(ii) One-one: \\(a_1\\) has 4 choices, \\(a_2\\) the remaining 3, \\(a_3\\) the remaining 2: \\(4 \\times 3 \\times 2 = 24\\).",
          "(iii) No. Three elements have at most 3 different images, so one element of B is always left out.",
          "(iv) The images \\(b_2, b_4, b_1\\) are all different, so f is one-one.",
          "\\(b_3\\) is not an image, so f is not onto.",
        ],
        answer: "64 functions; 24 one-one; none onto; f is one-one but not onto",
      },
      selfCheckExample: {
        prompt: "How many onto functions are there from a set with 4 elements to a set with 2 elements?",
        steps: [
          "All functions: \\(2^4 = 16\\).",
          "Remove the 2 constant functions, which miss one element: \\(16 - 2\\).",
        ],
        answer: "14",
      },
      practiceSet: [
        { prompt: "How many functions are there from a set with 2 elements to a set with 3 elements?", answer: "\\(3^2 = 9\\)" },
        { prompt: "Can a function from a set of 5 elements to a set of 4 elements be one-one?", answer: "No: at least two elements must share an image" },
        { prompt: "\\(f : \\{1, 2, 3\\} \\to \\{1, 2, 3\\}\\) is one-one. Must f be onto?", answer: "Yes: three different images fill the three-element codomain" },
      ],
      pyqExampleId: "5f784a06-576f-4a3d-9162-47fd1e643b28",
      traps: [
        {
          title: "Mixing up the two counts",
          body: "Functions from A to B number \\(n^m\\): the size of B raised to the size of A. Relations number \\(2^{mn}\\). Writing \\(m^n\\) is the usual slip.",
        },
        {
          title: "Claiming onto when the sizes forbid it",
          body: "A set of 3 elements can never map onto a set of 4. Say so by counting the images; no listing is needed.",
        },
        {
          title: "Asking 'one-one?' of something that is not a function",
          body: "If one element of the domain has two images, the set of pairs is not a function at all. Say that first; one-one and onto do not arise.",
        },
      ],
    },
  ],
};

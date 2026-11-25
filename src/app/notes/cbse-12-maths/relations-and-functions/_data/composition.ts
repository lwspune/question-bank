import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_RF_COMPOSITION_NOTE: SubtopicNote = {
  subtopicName: "Composition and Invertible Functions",
  title: "Composition of Functions and Invertible Functions",
  oneLineDefinition:
    "The composite gof (apply f, then g), invertible functions and how to find an inverse, and the sum of two functions with its domain.",
  whyItMatters:
    "4 questions, one of them from a board paper. The present NCERT book teaches composition and invertible functions briefly, through three examples and no exercise, and none of this chapter's board questions from 2023 to 2026 is set on them. The one board question here is a 2025 assertion-reason item on the domain of the sum of two functions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmrf-gof",
      name: "Composition of two functions",
      intuition:
        "Composition is doing one function after another: the output of f becomes the input of g. The order matters. Squaring and then adding 2 is not the same as adding 2 and then squaring, so gof and fog are usually different functions.",
      definition:
        "- Let \\(f : A \\to B\\) and \\(g : B \\to C\\). The **composition** of f and g, written gof, is the function \\(gof : A \\to C\\) given by \\(gof(x) = g(f(x))\\) for all \\(x \\in A\\).\n" +
        "- In gof, f acts first and g second.\n" +
        "- In general \\(gof \\ne fog\\): one value of x where they differ is enough to show it.\n" +
        "- For a function given by a table of values, work out \\(g(f(x))\\) for each element of A in turn.",
      formula: {
        label: "Composite function",
        latex: "gof\\,(x) = g(f(x)), \\quad x \\in A",
      },
      authoredExample: {
        prompt: "Let \\(f, g : \\mathbb{R} \\to \\mathbb{R}\\) be \\(f(x) = x + 2\\) and \\(g(x) = x^3\\). Find gof and fog, and show that \\(gof \\ne fog\\).",
        steps: [
          "\\(gof(x) = g(f(x)) = g(x + 2) = (x + 2)^3\\).",
          "\\(fog(x) = f(g(x)) = f(x^3) = x^3 + 2\\).",
          "At \\(x = 0\\): \\(gof(0) = 8\\) and \\(fog(0) = 2\\).",
          "They differ at \\(x = 0\\), so \\(gof \\ne fog\\).",
        ],
        answer: "\\(gof(x) = (x + 2)^3\\), \\(fog(x) = x^3 + 2\\); they differ at \\(x = 0\\)",
      },
      selfCheckExample: {
        prompt: "\\(f : \\{1, 2, 3\\} \\to \\{3, 5\\}\\) has \\(f(1) = 3\\), \\(f(2) = 5\\), \\(f(3) = 5\\), and \\(g : \\{3, 5\\} \\to \\{7, 9\\}\\) has \\(g(3) = 7\\), \\(g(5) = 9\\). Find gof.",
        steps: ["\\(gof(1) = g(3) = 7\\), \\(gof(2) = g(5) = 9\\), \\(gof(3) = g(5) = 9\\)."],
        answer: "\\(gof = \\{(1, 7), (2, 9), (3, 9)\\}\\)",
      },
      practiceSet: [
        { prompt: "If \\(f(x) = 4x\\) and \\(g(x) = x - 1\\) on \\(\\mathbb{R}\\), find \\(fog(2)\\).", answer: "\\(f(g(2)) = f(1) = 4\\)" },
        { prompt: "In gof, which function acts first?", answer: "f" },
      ],
      pyqExampleId: "5f5574e9-92b7-4f44-80ac-7dd3faf0bd82",
      traps: [
        {
          title: "Doing g first in gof",
          body: "gof means f first, then g: \\(gof(x) = g(f(x))\\). Read it from the right.",
        },
        {
          title: "Assuming gof and fog are equal",
          body: "They are usually different. To show it, work out both at one value of x and show the numbers differ.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmrf-inverse",
      name: "Invertible functions and the inverse",
      intuition:
        "An inverse undoes a function: if f takes x to y, the inverse takes y back to x. This only works when each y comes from exactly one x and every y is reached, that is, when f is one-one and onto.",
      definition:
        "- A function \\(f : X \\to Y\\) is **invertible** if there is a function \\(g : Y \\to X\\) with \\(gof = I_X\\) and \\(fog = I_Y\\). Then g is the inverse of f, written \\(f^{-1}\\).\n" +
        "- If f is invertible, f is one-one and onto; conversely, if f is one-one and onto, f is invertible.\n" +
        "- **To find the inverse**: put \\(y = f(x)\\), solve for x, and define \\(g(y)\\) by that expression.\n" +
        "- Then check both: \\(gof(x) = x\\) for all x in X and \\(fog(y) = y\\) for all y in Y.",
      formula: {
        label: "Inverse of f",
        latex: "gof = I_X \\text{ and } fog = I_Y \\;\\Rightarrow\\; g = f^{-1}",
      },
      authoredExample: {
        prompt: "Show that \\(f : \\mathbb{R} \\to \\mathbb{R}\\), \\(f(x) = 5x - 2\\), is invertible and find its inverse.",
        steps: [
          "Put \\(y = 5x - 2\\). Then \\(x = \\dfrac{y + 2}{5}\\).",
          "Define \\(g : \\mathbb{R} \\to \\mathbb{R}\\) by \\(g(y) = \\dfrac{y + 2}{5}\\).",
          "\\(gof(x) = g(5x - 2) = \\dfrac{5x - 2 + 2}{5} = x\\), so \\(gof = I_{\\mathbb{R}}\\).",
          "\\(fog(y) = f\\left(\\dfrac{y + 2}{5}\\right) = 5 \\cdot \\dfrac{y + 2}{5} - 2 = y\\), so \\(fog = I_{\\mathbb{R}}\\).",
          "Hence f is invertible and \\(f^{-1}(y) = \\dfrac{y + 2}{5}\\).",
        ],
        answer: "\\(f^{-1}(y) = \\dfrac{y + 2}{5}\\)",
      },
      selfCheckExample: {
        prompt: "Find the inverse of \\(f : \\mathbb{R} \\to \\mathbb{R}\\), \\(f(x) = 3 - x\\).",
        steps: ["\\(y = 3 - x\\) gives \\(x = 3 - y\\).", "Check: \\(f(3 - y) = 3 - (3 - y) = y\\)."],
        answer: "\\(f^{-1}(y) = 3 - y\\); f is its own inverse",
      },
      practiceSet: [
        { prompt: "Is \\(f : \\mathbb{R} \\to \\mathbb{R}\\), \\(f(x) = x^2\\), invertible?", answer: "No: it is not one-one (and not onto)" },
        { prompt: "If f is invertible, what is \\(f^{-1}(f(5))\\)?", answer: "5" },
      ],
      pyqExampleId: "ca982f40-cf4b-473b-808a-bf2eb7fc9db4",
      traps: [
        {
          title: "Checking only one composition",
          body: "An inverse must satisfy both \\(gof = I_X\\) and \\(fog = I_Y\\). Show both lines.",
        },
        {
          title: "Inverting a function that is not one-one and onto",
          body: "Solving \\(y = x^2\\) gives two values of x, so no single inverse exists on \\(\\mathbb{R}\\). Check one-one and onto first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmrf-sum",
      name: "The sum of two functions and its domain",
      intuition:
        "To add two functions at a point, both must have a value there. So the sum is defined only where both functions are defined, the common part of their domains. Adding two functions can also spoil a property: two one-one functions can add up to one that is not one-one.",
      definition:
        "- \\((f + g)(x) = f(x) + g(x)\\), and the domain of \\(f + g\\) is \\(\\text{Dom}(f) \\cap \\text{Dom}(g)\\).\n" +
        "- This domain rule comes from Class 11. The present Class 12 book uses sums of functions only in two examples (\\(\\sin x\\) and \\(\\cos x\\) on \\(\\left[0, \\frac{\\pi}{2}\\right]\\) are one-one but their sum is not; the identity function on N is onto but its double is not) and does not teach the domain rule again. Board 2025 asked it once, as an assertion-reason item.\n" +
        "- **Assertion-reason codes in Maths papers**: (A) both true and R explains A; (B) both true and R does not explain A; (C) A true, R false; (D) A false, R true.",
      formula: {
        label: "Domain of a sum",
        latex: "\\text{Dom}(f + g) = \\text{Dom}(f) \\cap \\text{Dom}(g)",
      },
      authoredExample: {
        prompt: "Find the domain of \\(f + g\\), where \\(f(x) = \\sqrt{x - 1}\\) and \\(g(x) = \\dfrac{1}{x - 3}\\).",
        steps: [
          "\\(\\sqrt{x - 1}\\) is real when \\(x \\ge 1\\): \\(\\text{Dom}(f) = [1, \\infty)\\).",
          "\\(\\dfrac{1}{x - 3}\\) is defined when \\(x \\ne 3\\): \\(\\text{Dom}(g) = \\mathbb{R} - \\{3\\}\\).",
          "\\(\\text{Dom}(f + g) = [1, \\infty) \\cap (\\mathbb{R} - \\{3\\}) = [1, 3) \\cup (3, \\infty)\\).",
        ],
        answer: "\\([1, 3) \\cup (3, \\infty)\\)",
      },
      selfCheckExample: {
        prompt: "Assertion (A): \\(f(x) = x\\) and \\(g(x) = -x\\) are one-one on \\(\\mathbb{R}\\), but \\(f + g\\) is not one-one. Reason (R): The sum of two one-one functions is always one-one. Choose the code.",
        steps: [
          "\\((f + g)(x) = 0\\) for every x, so \\((f + g)(1) = (f + g)(2)\\): A is true.",
          "This same example shows R is false.",
        ],
        answer: "(C) A is true, R is false",
      },
      practiceSet: [
        { prompt: "If \\(\\text{Dom}(f) = [0, 5]\\) and \\(\\text{Dom}(g) = [2, 9]\\), what is the domain of \\(f + g\\)?", answer: "\\([2, 5]\\)" },
        { prompt: "In a Maths assertion-reason item, which code means 'A is false, R is true'?", answer: "(D)" },
      ],
      pyqExampleId: "649f4e00-0dd6-41e0-8b6c-ef03a24882d2",
      traps: [
        {
          title: "Taking the union of the domains",
          body: "The sum needs both functions at the point, so its domain is the intersection, not the union.",
        },
        {
          title: "Reading (D) as 'both false'",
          body: "In CBSE Maths papers, (D) means the Assertion is false and the Reason is true. Read the four codes printed above the item every time.",
        },
      ],
    },
  ],
};

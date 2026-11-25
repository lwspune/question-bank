import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_CD_CONTINUITY_NOTE: SubtopicNote = {
  subtopicName: "Continuity",
  title: "Continuity at a Point and Continuous Functions",
  oneLineDefinition:
    "A function is continuous at a point when its left hand limit, its right hand limit and its value there are all equal; this page also covers finding a constant that makes a function continuous and building continuous functions from simpler ones.",
  whyItMatters:
    "93 questions, thirty-four of them from board papers from 2023 to 2026. The board most often asks for a constant that makes a function continuous: k for (1 − cos x)/2x² (2023), c and a pair a, b (2024), a for sin² ax/x² and k for a limit with logarithms (2025), k for (x² − 4x − 5)/(x + 1) and for (sin x)/x + cos x (2026). It also asks you to check continuity at a join (2024 to 2026), where [x] is continuous (2023, 2025), whether x sin(1/x) or x² sin(1/x) is continuous at 0 (2024 to 2026, one of them an assertion-reason item) and which sums of modulus functions are continuous (2024, 2025). The textbook adds Examples 1 to 20 and all of Exercise 5.1.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmcd-at-a-point",
      name: "Continuity at a point: left hand limit, right hand limit and value",
      intuition:
        "A function is continuous at a point if you can draw its graph through that point without lifting the pen. In symbols: the values just to the left, the values just to the right and the value at the point itself all agree.",
      definition:
        "- **Continuity at c:** f is continuous at \\(x = c\\) if f is defined at c and \\(\\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = f(c)\\).\n" +
        "- If the two one-sided limits differ, or if their common value differs from \\(f(c)\\), f is **discontinuous** at c, and c is a point of discontinuity.\n" +
        "- **A continuous function** is one that is continuous at every point of its domain.\n" +
        "- **Piecewise functions:** each piece is continuous on its own interval, so only the joins need checking. At a join, take \\(f(c)\\) from the piece whose condition contains c (the one written with \\(\\le\\) or \\(\\ge\\)).\n" +
        "- **Board layout:** write \\(f(c)\\), then the left hand limit (LHL), then the right hand limit (RHL), each on its own line, then the conclusion.",
      formula: {
        label: "Continuity at x = c",
        latex: "\\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = f(c)",
      },
      authoredExample: {
        prompt:
          "Check the continuity of \\(f(x) = \\begin{cases} 5x - 4, & x \\le 1 \\\\ 4x^2 - 3x, & x > 1 \\end{cases}\\) at \\(x = 1\\).",
        steps: [
          "Value: \\(x = 1\\) lies in \\(x \\le 1\\), so \\(f(1) = 5(1) - 4 = 1\\).",
          "LHL \\(= \\lim_{x \\to 1^-} (5x - 4) = 5 - 4 = 1\\).",
          "RHL \\(= \\lim_{x \\to 1^+} (4x^2 - 3x) = 4 - 3 = 1\\).",
          "LHL \\(=\\) RHL \\(= f(1) = 1\\), so f is continuous at \\(x = 1\\).",
        ],
        answer: "Continuous at \\(x = 1\\)",
      },
      selfCheckExample: {
        prompt:
          "Is \\(f(x) = \\begin{cases} x^2 - 1, & x < 2 \\\\ 4, & x = 2 \\\\ 2x - 1, & x > 2 \\end{cases}\\) continuous at \\(x = 2\\)?",
        steps: [
          "LHL \\(= \\lim_{x \\to 2^-} (x^2 - 1) = 3\\).",
          "RHL \\(= \\lim_{x \\to 2^+} (2x - 1) = 3\\).",
          "The limit is 3, but \\(f(2) = 4\\). The limit and the value differ, so f is not continuous at \\(x = 2\\).",
        ],
        answer: "Not continuous at \\(x = 2\\)",
      },
      practiceSet: [
        { prompt: "Is \\(f(x) = x^3 - 2x\\) continuous at \\(x = 2\\)?", answer: "Yes: \\(\\lim_{x \\to 2} f(x) = 4 = f(2)\\)" },
        {
          prompt: "Is \\(f(x) = \\begin{cases} 2x + 1, & x < 0 \\\\ \\cos x, & x \\ge 0 \\end{cases}\\) continuous at \\(x = 0\\)?",
          answer: "Yes: LHL \\(= 1\\), RHL \\(= 1\\) and \\(f(0) = \\cos 0 = 1\\)",
        },
        {
          prompt: "At \\(x = c\\) a function has left hand limit 4, right hand limit 4 and value 5. Is it continuous at c?",
          answer: "No: the limit 4 is not equal to the value 5",
        },
      ],
      pyqExampleId: "e6c4413b-d685-461b-93af-296029cc4f3d",
      traps: [
        {
          title: "Checking one side only",
          body: "A limit exists only when both one-sided limits exist and are equal. At every join, write the LHL and the RHL separately before you compare them with the value.",
        },
        {
          title: "The wrong piece for the value",
          body: "At a join, \\(f(c)\\) comes from the piece whose condition includes c. For pieces on \\(x \\le 1\\) and \\(x > 1\\), the value at 1 comes from the first piece.",
        },
        {
          title: "Assertion-reason code (D) in Mathematics",
          body: "In the CBSE Mathematics paper, option (D) means the Assertion is false and the Reason is true. Judge each statement on its own first, then ask whether the Reason explains the Assertion.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmcd-find-constant",
      name: "Finding a constant that makes a function continuous",
      intuition:
        "When a function is defined in pieces with an unknown constant, continuity at the join gives an equation. Find the limit from each side, set it equal to the value, and solve.",
      definition:
        "- Set LHL \\(=\\) RHL \\(= f(c)\\) at the join and solve for the constant. Two unknowns need two equations: use two joins, or the two sides of one join together with the value.\n" +
        "- If the limit has the form \\(\\dfrac{0}{0}\\), simplify first: factorise and cancel, rationalise a root, or use a standard limit.\n" +
        "- Standard limits: \\(\\lim_{x \\to 0} \\dfrac{\\sin x}{x} = 1\\), \\(\\lim_{x \\to 0} \\dfrac{1 - \\cos x}{x} = 0\\), and \\(1 - \\cos x = 2\\sin^2\\dfrac{x}{2}\\) turns a \\(1 - \\cos x\\) limit into a sine limit. Board 2025 also used \\(\\lim_{x \\to 0} \\dfrac{\\log(1 + x)}{x} = 1\\).\n" +
        "- **Write both roots.** An equation such as \\(a^2 = 1\\) gives \\(a = \\pm 1\\), and both values make the function continuous.\n" +
        "- **No value** is possible when the left and right limits do not depend on the constant and are unequal.",
      formula: {
        label: "Standard limit",
        latex: "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1",
      },
      authoredExample: {
        prompt:
          "Find k so that \\(f(x) = \\begin{cases} \\dfrac{\\sin 5x}{2x}, & x \\ne 0 \\\\ k, & x = 0 \\end{cases}\\) is continuous at \\(x = 0\\).",
        steps: [
          "Continuity at 0 needs \\(\\lim_{x \\to 0} f(x) = f(0) = k\\).",
          "\\(\\dfrac{\\sin 5x}{2x} = \\dfrac{5}{2} \\cdot \\dfrac{\\sin 5x}{5x}\\).",
          "As \\(x \\to 0\\), \\(5x \\to 0\\), so \\(\\dfrac{\\sin 5x}{5x} \\to 1\\) and the limit is \\(\\dfrac{5}{2}\\).",
          "\\(\\therefore k = \\dfrac{5}{2}\\).",
        ],
        answer: "\\(k = \\dfrac{5}{2}\\)",
      },
      selfCheckExample: {
        prompt:
          "Find k so that \\(f(x) = \\begin{cases} \\dfrac{x^2 - 9}{x - 3}, & x \\ne 3 \\\\ k, & x = 3 \\end{cases}\\) is continuous at \\(x = 3\\).",
        steps: [
          "For \\(x \\ne 3\\), \\(\\dfrac{x^2 - 9}{x - 3} = \\dfrac{(x - 3)(x + 3)}{x - 3} = x + 3\\).",
          "\\(\\lim_{x \\to 3} (x + 3) = 6\\), and continuity needs this to equal \\(f(3) = k\\).",
        ],
        answer: "\\(k = 6\\)",
      },
      practiceSet: [
        {
          prompt: "Find k if \\(f(x) = \\begin{cases} kx^2, & x \\le 1 \\\\ 4, & x > 1 \\end{cases}\\) is continuous at \\(x = 1\\).",
          answer: "\\(k = 4\\)",
        },
        {
          prompt: "Find k if \\(f(x) = \\dfrac{\\sqrt{1 + x} - 1}{x}\\) for \\(x \\ne 0\\) and \\(f(0) = k\\) is continuous at \\(x = 0\\).",
          answer: "\\(k = \\dfrac{1}{2}\\)",
          method: "Rationalise: \\(f(x) = \\dfrac{1}{\\sqrt{1 + x} + 1} \\to \\dfrac{1}{2}\\)",
        },
        {
          prompt: "Find a if \\(f(x) = \\begin{cases} ax + 1, & x \\le 2 \\\\ 3x - 1, & x > 2 \\end{cases}\\) is continuous at \\(x = 2\\).",
          answer: "\\(a = 2\\)",
          method: "\\(2a + 1 = 5\\)",
        },
      ],
      pyqExampleId: "743a2c32-f72b-411b-ad3b-c6bfb4126c41",
      traps: [
        {
          title: "Substituting into 0/0",
          body: "Putting \\(x = 0\\) into \\(\\dfrac{\\sin 5x}{2x}\\) gives \\(\\dfrac{0}{0}\\), which is not a value. Simplify, or use a standard limit, before you substitute.",
        },
        {
          title: "Dropping a root",
          body: "When the limit gives \\(a^2 = 1\\) or \\(\\lambda^2 = 1\\), write both 1 and \\(-1\\). The board's answer in 2023 and 2025 was \\(\\pm 1\\), and a single root loses the mark.",
        },
        {
          title: "Forcing a value that cannot exist",
          body: "If the left piece is \\(\\lambda\\) times a polynomial that is zero at the join, and the right piece is not zero there, the left limit is zero for every \\(\\lambda\\) while the right limit is not. No \\(\\lambda\\) works, and 'no value' is the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmcd-algebra",
      name: "Building continuous functions: sums, products, quotients and composites",
      intuition:
        "You do not need limits for every function. Polynomials, sine, cosine and the modulus function are continuous, and continuity survives adding, subtracting, multiplying, dividing (where the bottom is not zero) and composing.",
      definition:
        "- **Theorem 1 (algebra of continuous functions):** if f and g are continuous at c, then \\(f + g\\), \\(f - g\\) and \\(f \\cdot g\\) are continuous at c, and \\(\\dfrac{f}{g}\\) is continuous at c when \\(g(c) \\ne 0\\).\n" +
        "- **Theorem 2 (composite functions):** if g is continuous at c and f is continuous at \\(g(c)\\), then \\(f \\circ g\\) is continuous at c.\n" +
        "- Every polynomial, \\(\\sin x\\), \\(\\cos x\\) and \\(|x|\\) is continuous at every real number. So \\(|\\cos x|\\), \\(\\sin |x|\\), \\(\\cos(x^2)\\) and \\(|1 - x + |x||\\) are continuous.\n" +
        "- **A bounded factor times something that tends to 0 tends to 0:** \\(\\left|x\\sin\\dfrac{1}{x}\\right| \\le |x|\\), so \\(x\\sin\\dfrac{1}{x} \\to 0\\) as \\(x \\to 0\\). NCERT's Exercise 5.1 Q24 asks this for \\(x^2\\sin\\dfrac{1}{x}\\).\n" +
        "- Continuous does not mean differentiable: \\(|x| + |x - 2|\\) is continuous everywhere but has corners at 0 and 2.",
      formula: {
        label: "Composite of continuous functions",
        latex: "g \\text{ continuous at } c,\\ f \\text{ continuous at } g(c) \\Rightarrow f \\circ g \\text{ continuous at } c",
      },
      authoredExample: {
        prompt: "Show that \\(f(x) = |\\sin x| + \\cos(x^2)\\) is a continuous function.",
        steps: [
          "\\(g(x) = \\sin x\\) and \\(h(t) = |t|\\) are continuous at every real number, so \\(|\\sin x| = (h \\circ g)(x)\\) is continuous on R.",
          "\\(p(x) = x^2\\) is a polynomial and \\(\\cos t\\) is continuous, so \\(\\cos(x^2)\\) is continuous on R.",
          "A sum of two continuous functions is continuous, so f is continuous at every real number.",
        ],
        answer: "f is continuous on R",
      },
      selfCheckExample: {
        prompt:
          "Show that \\(f(x) = \\begin{cases} x\\cos\\dfrac{1}{x}, & x \\ne 0 \\\\ 0, & x = 0 \\end{cases}\\) is continuous at \\(x = 0\\).",
        steps: [
          "\\(\\left|\\cos\\dfrac{1}{x}\\right| \\le 1\\), so \\(\\left|x\\cos\\dfrac{1}{x}\\right| \\le |x|\\) for \\(x \\ne 0\\).",
          "As \\(x \\to 0\\), \\(|x| \\to 0\\), so \\(x\\cos\\dfrac{1}{x} \\to 0\\).",
          "The limit 0 equals \\(f(0) = 0\\), so f is continuous at \\(x = 0\\).",
        ],
        answer: "Continuous at \\(x = 0\\)",
      },
      practiceSet: [
        { prompt: "Where is \\(f(x) = |x - 1| + |x + 2|\\) continuous?", answer: "At every real number" },
        {
          prompt: "Is \\(f(x) = \\dfrac{x^2 + 1}{x - 2}\\) continuous at every point of its domain?",
          answer: "Yes: it is a quotient of polynomials, and \\(x = 2\\) is not in its domain",
        },
        { prompt: "Is \\(f(x) = |x|\\sin x\\) continuous on R?", answer: "Yes: it is a product of two continuous functions" },
      ],
      pyqExampleId: "efba58fe-188a-494e-af64-e63169f2872f",
      traps: [
        {
          title: "A quotient where the bottom is zero",
          body: "A quotient of continuous functions is continuous only where the denominator is not zero. Check the denominator before you write 'continuous everywhere'.",
        },
        {
          title: "sin(1/x) on its own",
          body: "\\(\\sin\\dfrac{1}{x}\\) has no limit at 0: it keeps swinging between \\(-1\\) and 1. Only the factor x in front forces the product to 0, so say in your answer that the sine is bounded.",
        },
        {
          title: "Continuous is not differentiable",
          body: "\\(|x| + |x - 1|\\) is continuous at 0 and at 1 but not differentiable there. When an MCQ asks about both, decide continuity and differentiability separately.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbmcd-standard-functions",
      name: "Where common functions are continuous",
      intuition:
        "A handful of standard functions come up again and again. Learn where each is continuous, and remember that a point outside the domain is not a point of discontinuity.",
      definition:
        "- A function is judged only at points of its **domain**. \\(\\dfrac{1}{x}\\) is not defined at 0, so 0 is not a point of discontinuity, and \\(\\dfrac{1}{x}\\) is a continuous function (NCERT Example 9).\n" +
        "- **Greatest integer function** \\([x]\\): continuous at every non-integer and discontinuous at every integer n, because the left hand limit at n is \\(n - 1\\) while the value is n (NCERT Example 15).\n" +
        "- In an open interval such as \\(0 < x < 3\\), count only the integers inside it.",
      table: {
        columns: ["Function", "Continuous at", "Not continuous at"],
        rows: [
          { cells: ["A polynomial, sin x, cos x, |x|", "Every real number", "No point"] },
          { cells: ["A rational function p(x)/q(x)", "Every x with q(x) not zero", "No point of its domain (it is not defined where q(x) = 0)"] },
          { cells: ["tan x and sec x", "Every point of the domain", "No point of the domain (not defined at odd multiples of π/2)"] },
          {
            cells: ["Greatest integer function [x]", "Every x that is not an integer", "Every integer"],
            noteAmber: "Board 2023 asked at which of four points [x] is continuous; Board 2025 asked about x = 2.",
          },
          { cells: ["x − [x]", "Every x that is not an integer", "Every integer (NCERT Exercise 5.1 Q19)"] },
          { cells: ["1/x", "Every x other than 0", "No point of its domain (0 is not in the domain)"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Find all points of discontinuity of \\(f(x) = \\begin{cases} 2, & x \\le 0 \\\\ x + 2, & 0 < x < 3 \\\\ 8, & x \\ge 3 \\end{cases}\\).",
        steps: [
          "Each piece is continuous on its own interval, so check the joins 0 and 3.",
          "At 0: LHL \\(= 2\\), RHL \\(= 0 + 2 = 2\\), \\(f(0) = 2\\). Continuous.",
          "At 3: LHL \\(= 3 + 2 = 5\\), RHL \\(= f(3) = 8\\). As \\(5 \\ne 8\\), f is discontinuous at 3.",
        ],
        answer: "Only \\(x = 3\\)",
      },
      practiceSet: [
        { prompt: "Is \\([x]\\) continuous at \\(x = 2.5\\)?", answer: "Yes, 2.5 is not an integer" },
        { prompt: "How many points of discontinuity does \\([x]\\) have in \\(-2 < x < 2\\)?", answer: "Three: \\(x = -1, 0, 1\\)" },
        {
          prompt: "Is \\(x = 4\\) a point of discontinuity of \\(f(x) = \\dfrac{1}{x - 4}\\)?",
          answer: "No: 4 is not in the domain, and f is continuous at every point of its domain",
        },
      ],
      pyqExampleId: "91e8267e-3174-4f14-b787-4c9167e870de",
      traps: [
        {
          title: "Counting the end points",
          body: "\\(0 < x < 3\\) leaves out 0 and 3, so \\([x]\\) has only two points of discontinuity there: 1 and 2.",
        },
        {
          title: "Calling a missing point a discontinuity",
          body: "A point where the function is not defined is not a point of discontinuity in NCERT's sense. Say that the point is outside the domain.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_DI_PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "Properties of Definite Integrals",
  title: "Properties of Definite Integrals",
  oneLineDefinition:
    "The eight properties of the textbook: reversing and renaming, splitting the interval, replacing x by a + b − x, the 0 to 2a rule and the rule for even and odd functions over −a to a.",
  whyItMatters:
    "50 questions, nine of them from board papers, more than on any other page. The board asks you to prove a property and then use it: the 0 to 2a property (2016, and in 2024 with a 'hence' on sin x from 0 to π), the even and odd property (2024 with a 'hence' on the inverse tangent, and 2026), and the a + b − x property (2025 and 2026, each with a 'hence'). It also set log(1 + tan x) (2022, printed with π as the upper limit where π/4 is meant), an MCQ on x³ sin⁴ x from −π/4 to π/4 (2024) and the integral of |x| from −1 to 1 (2026). The textbook rows are the worked examples under the properties, Solved Examples 9 to 15, Part III of Exercise 4.2 and ten rows of Miscellaneous Exercise 4.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmdi-basic-properties",
      name: "Properties I to IV: reverse, rename, split",
      intuition:
        "The first four properties are bookkeeping rules. Equal limits give 0. Turning the limits round changes the sign. The name of the variable does not matter. And the interval can be cut at any point inside it. That last rule is the one that does the work: a modulus or a greatest integer function is a different formula on different pieces, so you cut the interval where the formula changes.",
      definition:
        "- **Property I:** \\(\\int_a^a f(x)\\,dx = 0\\).\n" +
        "- **Property II:** \\(\\int_a^b f(x)\\,dx = -\\int_b^a f(x)\\,dx\\).\n" +
        "- **Property III:** \\(\\int_a^b f(x)\\,dx = \\int_a^b f(t)\\,dt\\); the variable is only a name.\n" +
        "- **Property IV:** \\(\\int_a^b f(x)\\,dx = \\int_a^c f(x)\\,dx + \\int_c^b f(x)\\,dx\\), where \\(a < c < b\\).\n" +
        "- **Modulus:** split where the expression inside is zero, and drop the bars with the right sign on each piece.\n" +
        "- **Greatest integer \\([x]\\):** split at each integer; on \\([k, k + 1)\\), \\([x] = k\\).",
      formula: {
        label: "Property IV",
        latex: "\\int_a^b f(x)\\,dx = \\int_a^c f(x)\\,dx + \\int_c^b f(x)\\,dx, \\qquad a < c < b",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^3 \\left|x - 1\\right|dx\\).",
        steps: [
          "\\(x - 1 < 0\\) for \\(x < 1\\) and \\(x - 1 \\geq 0\\) for \\(x \\geq 1\\). So \\(\\left|x - 1\\right| = 1 - x\\) on \\([0, 1]\\) and \\(x - 1\\) on \\([1, 3]\\).",
          "By Property IV: \\(I = \\int_0^1 (1 - x)\\,dx + \\int_1^3 (x - 1)\\,dx\\).",
          "\\(= \\left[x - \\dfrac{x^2}{2}\\right]_0^1 + \\left[\\dfrac{x^2}{2} - x\\right]_1^3 = \\dfrac{1}{2} + \\left[\\dfrac{3}{2} - \\left(-\\dfrac{1}{2}\\right)\\right]\\).",
          "\\(= \\dfrac{1}{2} + 2 = \\dfrac{5}{2}\\).",
        ],
        answer: "\\(\\int_0^3 \\left|x - 1\\right|dx = \\dfrac{5}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^2 [x]\\,dx\\), where \\([x]\\) is the greatest integer not greater than \\(x\\).",
        steps: ["\\([x] = 0\\) on \\([0, 1)\\) and \\([x] = 1\\) on \\([1, 2)\\): \\(\\int_0^1 0\\,dx + \\int_1^2 1\\,dx\\)."],
        answer: "\\(1\\)",
      },
      practiceSet: [
        { prompt: "If \\(\\int_1^4 f(x)\\,dx = 7\\) and \\(\\int_1^2 f(x)\\,dx = 3\\), find \\(\\int_2^4 f(x)\\,dx\\).", answer: "\\(7 - 3 = 4\\)" },
        { prompt: "If \\(\\int_0^2 f(x)\\,dx = 5\\), find \\(\\int_2^0 f(t)\\,dt\\).", answer: "\\(-5\\), by Properties II and III" },
        { prompt: "Evaluate \\(\\int_3^3 e^{x^2}\\,dx\\).", answer: "\\(0\\), by Property I" },
      ],
      pyqExampleId: "b51a091c-8d02-4e67-adc9-8241a5674a64",
      traps: [
        {
          title: "Splitting a modulus at the wrong point",
          body: "Split \\(\\left|x - k\\right|\\) at \\(x = k\\), where the inside changes sign, not at 0. Then check the sign of the inside on each piece before you remove the bars.",
        },
        {
          title: "Treating [x] as x",
          body: "\\([x]\\) is constant on each piece between integers, so on \\([2, 3)\\) the integrand \\(x[x]\\) is \\(2x\\). Integrating \\(x \\cdot x\\) instead gives a wrong answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdi-kings",
      name: "Properties V and VI: replace x by a + b − x",
      intuition:
        "Replacing x by a + b − x runs the interval backwards: the left end goes to the right end and the right end to the left. The area does not change, so the integral does not change. The power of the property is that the new integrand often adds to the old one to give something simple, like 1 or a constant times a known integral. So: call the integral I, write it again with x replaced, add, and solve for I.",
      definition:
        "- **Property V:** \\(\\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx\\).\n" +
        "- Proof: in the right side put \\(a + b - x = t\\), so \\(dx = -dt\\); when \\(x = a\\), \\(t = b\\); when \\(x = b\\), \\(t = a\\).\n" +
        "- \\(\\int_a^b f(a + b - x)\\,dx = \\int_b^a f(t)(-dt) = \\int_a^b f(t)\\,dt\\) (Property II).\n" +
        "- \\(= \\int_a^b f(x)\\,dx\\) (Property III).\n" +
        "- **Property VI** (take \\(a = 0\\)): \\(\\int_0^a f(x)\\,dx = \\int_0^a f(a - x)\\,dx\\).\n" +
        "- **Method:** \\(I = \\dots\\) (i); replace \\(x\\) to get (ii); add (i) and (ii); solve \\(2I = \\dots\\).\n" +
        "- **\\(x\\,f(\\sin x)\\) on \\([0, \\pi]\\):** \\(\\sin(\\pi - x) = \\sin x\\), so adding gives \\(2I = \\pi\\int_0^{\\pi} f(\\sin x)\\,dx\\).",
      formula: {
        label: "Properties V and VI",
        latex: "\\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx, \\qquad \\int_0^a f(x)\\,dx = \\int_0^a f(a - x)\\,dx",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2}\\dfrac{\\sin x}{\\sin x + \\cos x}\\,dx\\).",
        steps: [
          "Let \\(I = \\int_0^{\\pi/2}\\dfrac{\\sin x}{\\sin x + \\cos x}\\,dx\\)   ... (i)",
          "By Property VI, replace \\(x\\) by \\(\\dfrac{\\pi}{2} - x\\): \\(I = \\int_0^{\\pi/2}\\dfrac{\\cos x}{\\cos x + \\sin x}\\,dx\\)   ... (ii)",
          "Adding (i) and (ii): \\(2I = \\int_0^{\\pi/2}\\dfrac{\\sin x + \\cos x}{\\sin x + \\cos x}\\,dx = \\int_0^{\\pi/2} 1\\,dx = \\dfrac{\\pi}{2}\\).",
          "\\(\\therefore I = \\dfrac{\\pi}{4}\\).",
        ],
        answer: "\\(\\int_0^{\\pi/2}\\dfrac{\\sin x}{\\sin x + \\cos x}\\,dx = \\dfrac{\\pi}{4}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi} x\\sin x\\,dx\\) using Property VI.",
        steps: [
          "\\(I = \\int_0^{\\pi}(\\pi - x)\\sin x\\,dx\\). Adding: \\(2I = \\pi\\int_0^{\\pi}\\sin x\\,dx = \\pi\\left[-\\cos x\\right]_0^{\\pi} = 2\\pi\\).",
        ],
        answer: "\\(\\pi\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int_0^1 x(1 - x)^9\\,dx\\).", answer: "\\(\\dfrac{1}{110}\\)", method: "Property VI: \\(\\int_0^1 (1 - x)x^9\\,dx = \\dfrac{1}{10} - \\dfrac{1}{11}\\)." },
        { prompt: "Evaluate \\(\\int_0^{\\pi/2}\\left(\\sin^2 x - \\cos^2 x\\right)dx\\).", answer: "\\(0\\)", method: "Property VI turns it into \\(-I\\), so \\(2I = 0\\)." },
        {
          prompt: "Why is \\(\\int_0^{\\pi} x\\,f(\\sin x)\\,dx = \\dfrac{\\pi}{2}\\int_0^{\\pi} f(\\sin x)\\,dx\\)?",
          answer: "Replacing \\(x\\) by \\(\\pi - x\\) leaves \\(\\sin x\\) unchanged; adding the two forms gives \\(2I = \\pi\\int_0^{\\pi} f(\\sin x)\\,dx\\)",
        },
      ],
      pyqExampleId: "3bb3ce2e-a92e-4073-b531-b8821ef0ae35",
      traps: [
        {
          title: "Changing the limits as well",
          body: "In Property V only the integrand changes. The limits stay \\(a\\) and \\(b\\). Replacing them too undoes the property.",
        },
        {
          title: "Replacing x in only part of the integrand",
          body: "Every \\(x\\) must become \\(a + b - x\\), including an \\(x\\) standing outside a function, as in \\(x\\sin x\\). Missing one gives a pair (i), (ii) that does not add to anything simple.",
        },
        {
          title: "A 'prove' answer without the substitution lines",
          body: "The marks for the proof go to \\(t = a + b - x\\), \\(dx = -dt\\), the new limits, and naming Properties II and III. Writing 'by substitution, the result follows' earns almost nothing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdi-property-seven",
      name: "Property VII and the reduction formula for powers of sin and cos",
      intuition:
        "Property VII cuts [0, 2a] at the middle and folds the right half back onto the left half. If the function takes the same value at x and at 2a − x, the two halves are equal and the integral is twice the integral over [0, a]. If the values are opposite, the halves cancel. Together with the textbook's reduction formula for powers of sin x and cos x from 0 to π/2, this settles many integrals in a line.",
      definition:
        "- **Property VII:** \\(\\int_0^{2a} f(x)\\,dx = \\int_0^a f(x)\\,dx + \\int_0^a f(2a - x)\\,dx\\).\n" +
        "- Proof: by Property IV, \\(\\int_0^{2a} f(x)\\,dx = \\int_0^a f(x)\\,dx + \\int_a^{2a} f(x)\\,dx\\)   ... (i)\n" +
        "- In the second integral put \\(x = 2a - t\\), \\(dx = -dt\\); when \\(x = a\\), \\(t = a\\); when \\(x = 2a\\), \\(t = 0\\).\n" +
        "- \\(\\int_a^{2a} f(x)\\,dx = \\int_a^0 f(2a - t)(-dt) = \\int_0^a f(2a - t)\\,dt = \\int_0^a f(2a - x)\\,dx\\). Put this in (i).\n" +
        "- So if \\(f(2a - x) = f(x)\\), \\(\\int_0^{2a} f(x)\\,dx = 2\\int_0^a f(x)\\,dx\\); if \\(f(2a - x) = -f(x)\\), it is 0.\n" +
        "- **Reduction formula:** \\(\\int_0^{\\pi/2}\\sin^n x\\,dx = \\int_0^{\\pi/2}\\cos^n x\\,dx = \\dfrac{(n - 1)(n - 3)\\cdots 2}{n(n - 2)\\cdots 3}\\) for odd \\(n\\), and \\(\\dfrac{(n - 1)(n - 3)\\cdots 1}{n(n - 2)\\cdots 2}\\cdot\\dfrac{\\pi}{2}\\) for even \\(n\\).",
      formula: {
        label: "Property VII",
        latex: "\\int_0^{2a} f(x)\\,dx = \\int_0^a f(x)\\,dx + \\int_0^a f(2a - x)\\,dx",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi}\\sin^4 x\\,dx\\).",
        steps: [
          "Here \\(2a = \\pi\\), \\(a = \\dfrac{\\pi}{2}\\), and \\(\\sin^4(\\pi - x) = \\sin^4 x\\). By Property VII, \\(\\int_0^{\\pi}\\sin^4 x\\,dx = 2\\int_0^{\\pi/2}\\sin^4 x\\,dx\\).",
          "\\(n = 4\\) is even, so \\(\\int_0^{\\pi/2}\\sin^4 x\\,dx = \\dfrac{3 \\times 1}{4 \\times 2}\\cdot\\dfrac{\\pi}{2} = \\dfrac{3\\pi}{16}\\).",
          "\\(\\int_0^{\\pi}\\sin^4 x\\,dx = 2 \\times \\dfrac{3\\pi}{16} = \\dfrac{3\\pi}{8}\\).",
        ],
        answer: "\\(\\int_0^{\\pi}\\sin^4 x\\,dx = \\dfrac{3\\pi}{8}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2}\\cos^5 x\\,dx\\).",
        steps: ["\\(n = 5\\) is odd: \\(\\dfrac{4 \\times 2}{5 \\times 3}\\)."],
        answer: "\\(\\dfrac{8}{15}\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int_0^{\\pi/2}\\sin^6 x\\,dx\\).", answer: "\\(\\dfrac{5 \\times 3 \\times 1}{6 \\times 4 \\times 2}\\cdot\\dfrac{\\pi}{2} = \\dfrac{5\\pi}{32}\\)" },
        { prompt: "If \\(f(2a - x) = -f(x)\\), what is \\(\\int_0^{2a} f(x)\\,dx\\)?", answer: "\\(0\\)" },
        {
          prompt: "Using \\(\\cos^2 x = 1 - \\sin^2 x\\) and the reduction formula, evaluate \\(\\int_0^{\\pi/2}\\sin^4 x\\cos^2 x\\,dx\\).",
          answer: "\\(\\dfrac{3\\pi}{16} - \\dfrac{5\\pi}{32} = \\dfrac{\\pi}{32}\\)",
        },
      ],
      pyqExampleId: "62ba6966-4f15-476a-8b0b-58a87a9f5b1a",
      traps: [
        {
          title: "Doubling without checking f(2a − x)",
          body: "\\(\\int_0^{2a} f(x)\\,dx = 2\\int_0^a f(x)\\,dx\\) only when \\(f(2a - x) = f(x)\\). For \\(f(x) = x - 1\\) on \\([0, 2]\\), \\(f(2 - x) = -f(x)\\), so the integral is 0, not twice anything.",
        },
        {
          title: "The factor π/2 in the reduction formula",
          body: "The factor \\(\\dfrac{\\pi}{2}\\) belongs only to an even power. For an odd power the answer is a plain fraction, such as \\(\\dfrac{2}{3}\\) for \\(n = 3\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdi-odd-even",
      name: "Property VIII: even and odd functions over −a to a",
      intuition:
        "Over an interval symmetric about 0, an even function has a mirror image on the left of what it has on the right, so the integral is twice the right half. An odd function has the same area on the left but below the axis, so the two halves cancel and the integral is 0. Test f(−x) before doing any integration: it can save the whole calculation.",
      definition:
        "- \\(f\\) is **even** if \\(f(-x) = f(x)\\), and **odd** if \\(f(-x) = -f(x)\\).\n" +
        "- **Property VIII:** \\(\\int_{-a}^{a} f(x)\\,dx = 2\\int_0^a f(x)\\,dx\\) if \\(f\\) is even, and \\(= 0\\) if \\(f\\) is odd.\n" +
        "- Proof: \\(\\int_{-a}^{a} f(x)\\,dx = \\int_{-a}^{0} f(x)\\,dx + \\int_0^a f(x)\\,dx\\)   ... (i), by Property IV.\n" +
        "- In the first, put \\(x = -t\\), \\(dx = -dt\\); when \\(x = -a\\), \\(t = a\\); when \\(x = 0\\), \\(t = 0\\).\n" +
        "- \\(\\int_{-a}^{0} f(x)\\,dx = \\int_a^0 f(-t)(-dt) = \\int_0^a f(-t)\\,dt = \\int_0^a f(-x)\\,dx\\).\n" +
        "- So \\(\\int_{-a}^{a} f(x)\\,dx = \\int_0^a \\left[f(-x) + f(x)\\right]dx\\): this is \\(2\\int_0^a f(x)\\,dx\\) when \\(f(-x) = f(x)\\), and 0 when \\(f(-x) = -f(x)\\).\n" +
        "- Odd times even is odd; odd times odd is even. A mixed integrand: split it into its odd and even parts.",
      formula: {
        label: "Property VIII",
        latex: "\\int_{-a}^{a} f(x)\\,dx = \\begin{cases} 2\\displaystyle\\int_0^a f(x)\\,dx, & f \\text{ even} \\\\ 0, & f \\text{ odd} \\end{cases}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_{-1}^{1}\\left(x^3\\cos x + 3x^2\\right)dx\\).",
        steps: [
          "Split: \\(I = \\int_{-1}^{1} x^3\\cos x\\,dx + \\int_{-1}^{1} 3x^2\\,dx\\).",
          "\\(f(x) = x^3\\cos x\\): \\(f(-x) = (-x)^3\\cos(-x) = -x^3\\cos x = -f(x)\\). \\(f\\) is odd, so its integral is 0.",
          "\\(g(x) = 3x^2\\): \\(g(-x) = 3x^2 = g(x)\\). \\(g\\) is even, so \\(\\int_{-1}^{1} 3x^2\\,dx = 2\\int_0^1 3x^2\\,dx = 2\\left[x^3\\right]_0^1 = 2\\).",
          "\\(I = 0 + 2 = 2\\).",
        ],
        answer: "\\(\\int_{-1}^{1}\\left(x^3\\cos x + 3x^2\\right)dx = 2\\)",
      },
      selfCheckExample: {
        prompt: "Is \\(f(x) = \\log\\left(\\dfrac{1 + x}{1 - x}\\right)\\) odd or even on \\((-1, 1)\\)?",
        steps: ["\\(f(-x) = \\log\\left(\\dfrac{1 - x}{1 + x}\\right) = -\\log\\left(\\dfrac{1 + x}{1 - x}\\right) = -f(x)\\)."],
        answer: "Odd",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int_{-\\pi/2}^{\\pi/2}\\sin^5 x\\,dx\\).", answer: "\\(0\\), since \\(\\sin^5 x\\) is odd" },
        { prompt: "Evaluate \\(\\int_{-1}^{1}\\left(x^2 + x\\right)dx\\).", answer: "\\(2\\int_0^1 x^2\\,dx + 0 = \\dfrac{2}{3}\\)" },
        { prompt: "Evaluate \\(\\int_{-\\pi/4}^{\\pi/4}\\sec^2 x\\,dx\\).", answer: "\\(2\\left[\\tan x\\right]_0^{\\pi/4} = 2\\)" },
      ],
      pyqExampleId: "784bce57-3235-4f65-b919-0b12ec8194ab",
      traps: [
        {
          title: "Testing with one number instead of x",
          body: "Showing \\(f(-1) = -f(1)\\) does not prove that \\(f\\) is odd. Work out \\(f(-x)\\) in letters and compare it with \\(f(x)\\).",
        },
        {
          title: "Calling the whole integrand odd when only part is",
          body: "\\(x^3 + 2\\) is neither odd nor even. Split it: the \\(x^3\\) part gives 0 and the constant part gives \\(2 \\times 2a\\) over \\([-a, a]\\).",
        },
        {
          title: "Using the property on limits that are not symmetric",
          body: "Property VIII needs limits \\(-a\\) and \\(a\\). Over \\([-1, 2]\\), an odd function does not give 0.",
        },
      ],
    },
  ],
};

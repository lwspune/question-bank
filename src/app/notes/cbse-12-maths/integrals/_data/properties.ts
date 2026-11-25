import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_IN_PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "Properties of Definite Integrals",
  title: "Properties of Definite Integrals",
  oneLineDefinition:
    "Rules P0 to P7 that change the limits or the integrand of a definite integral without changing its value, used when no antiderivative is easy to find.",
  whyItMatters:
    "89 questions, fifty-eight of them from board papers from 2022 to 2026, more than any other part of Integrals. Every year the board sets a three- or five-mark question solved by replacing x with a − x or a + b − x and adding (2022 to 2026). It also asks for integrals with a lone x in front of a trigonometric fraction (2022 to 2025), log integrals such as log(1 + tan x) from 0 to π/4 (2022 and 2023), and one-mark MCQs on even and odd functions and on which property is true (2024 to 2026). The textbook adds Examples 28 to 34, Exercise 7.10, Miscellaneous Example 42 and Miscellaneous Questions 34 and 40.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmin-def-split",
      name: "Reversing and splitting: P0, P1 and P2",
      intuition:
        "Three basic rules. The letter used for the variable does not matter. Swapping the limits changes the sign. And an interval can be cut at any point c, with the pieces added back. P2 is the rule behind every modulus question.",
      definition:
        "- **P0:** \\(\\int_a^b f(x)\\,dx = \\int_a^b f(t)\\,dt\\).\n" +
        "- **P1:** \\(\\int_a^b f(x)\\,dx = -\\int_b^a f(x)\\,dx\\). In particular \\(\\int_a^a f(x)\\,dx = 0\\).\n" +
        "- **P2:** \\(\\int_a^b f(x)\\,dx = \\int_a^c f(x)\\,dx + \\int_c^b f(x)\\,dx\\).\n" +
        "- Proof of P2: with F an antiderivative, \\((F(c) - F(a)) + (F(b) - F(c)) = F(b) - F(a)\\).\n" +
        "- For a modulus, take c where the expression inside is zero. NCERT Example 28 splits \\(|x^3 - x|\\) on \\([-1, 2]\\) at 0 and 1.\n" +
        "- For a trigonometric modulus, split where the two terms are equal, for example where \\(\\sin x = \\sqrt{3}\\cos x\\), that is \\(\\tan x = \\sqrt{3}\\).",
      formula: {
        label: "Property P2",
        latex: "\\int_a^b f(x)\\,dx = \\int_a^c f(x)\\,dx + \\int_c^b f(x)\\,dx",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{3} |x^2 - x|\\,dx\\).",
        steps: [
          "Let \\(I = \\int_0^3 |x^2 - x|\\,dx\\). Here \\(x^2 - x = x(x - 1)\\), which is zero at 0 and 1.",
          "On \\([0, 1]\\), \\(x^2 - x \\le 0\\); on \\([1, 3]\\), \\(x^2 - x \\ge 0\\).",
          "By P2, \\(I = \\int_0^1 (x - x^2)\\,dx + \\int_1^3 (x^2 - x)\\,dx\\).",
          "\\(\\int_0^1 (x - x^2)\\,dx = \\left[\\dfrac{x^2}{2} - \\dfrac{x^3}{3}\\right]_0^1 = \\dfrac{1}{6}\\).",
          "\\(\\int_1^3 (x^2 - x)\\,dx = \\left[\\dfrac{x^3}{3} - \\dfrac{x^2}{2}\\right]_1^3 = \\left(9 - \\dfrac{9}{2}\\right) - \\left(\\dfrac{1}{3} - \\dfrac{1}{2}\\right) = \\dfrac{14}{3}\\).",
          "\\(I = \\dfrac{1}{6} + \\dfrac{14}{3} = \\dfrac{29}{6}\\).",
        ],
        answer: "\\(\\dfrac{29}{6}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\int_0^{5} f(x)\\,dx = 8\\) and \\(\\int_0^{2} f(x)\\,dx = 3\\), find \\(\\int_2^{5} f(x)\\,dx\\) and \\(\\int_5^{2} f(x)\\,dx\\).",
        steps: ["By P2, \\(\\int_2^5 f(x)\\,dx = 8 - 3\\). By P1, swapping the limits changes the sign."],
        answer: "5 and \\(-5\\)",
      },
      practiceSet: [
        {
          prompt: "Evaluate \\(\\int_1^{4} |x - 3|\\,dx\\).",
          answer: "\\(\\int_1^3 (3 - x)\\,dx + \\int_3^4 (x - 3)\\,dx = 2 + \\dfrac{1}{2} = \\dfrac{5}{2}\\)",
        },
        {
          prompt: "Evaluate \\(\\int_0^{2\\pi} |\\sin x|\\,dx\\).",
          answer: "\\(\\int_0^{\\pi} \\sin x\\,dx - \\int_{\\pi}^{2\\pi} \\sin x\\,dx = 2 + 2 = 4\\)",
        },
        {
          prompt: "Evaluate \\(\\int_0^{2} (|x| + |x - 1|)\\,dx\\).",
          answer: "\\(\\int_0^2 x\\,dx = 2\\) and \\(\\int_0^1 (1 - x)\\,dx + \\int_1^2 (x - 1)\\,dx = 1\\): total 3",
        },
      ],
      pyqExampleId: "c994a0e3-46a4-45b1-9994-7b5433ad4dbd",
      traps: [
        {
          title: "Swapping limits without the sign",
          body: "\\(\\int_5^2 f(x)\\,dx = -\\int_2^5 f(x)\\,dx\\). Reversing the limits (after a substitution, for example) always brings a minus sign.",
        },
        {
          title: "Splitting at the wrong point",
          body: "Split exactly where the expression inside the modulus is zero. For \\(|\\sin x - \\sqrt{3}\\cos x|\\) that is where \\(\\tan x = \\sqrt{3}\\), not at the middle of the interval.",
        },
        {
          title: "Leaving a piece with the wrong sign",
          body: "On the piece where the inside is negative, the modulus becomes its negative. Check the sign on each piece with one test value before you integrate.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-def-swap",
      name: "P3 and P4: replace x and add the two forms",
      intuition:
        "Replacing x by a + b − x (or by a − x when the lower limit is 0) does not change the value of the integral. When that swaps sin x and cos x, or turns a fraction into its partner, add the two forms of I: the numerators add up to the denominator, the integrand becomes 1, and 2I is just the length of the interval.",
      definition:
        "- **P3:** \\(\\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx\\).\n" +
        "- **P4:** \\(\\int_0^a f(x)\\,dx = \\int_0^a f(a - x)\\,dx\\), the case \\(a = 0\\) of P3.\n" +
        "- Proof of P3: put \\(t = a + b - x\\), so \\(dt = -dx\\) and the limits swap; then use P1 and P0.\n" +
        "- On \\(\\left[0, \\dfrac{\\pi}{2}\\right]\\), replacing x by \\(\\dfrac{\\pi}{2} - x\\) swaps \\(\\sin x\\) and \\(\\cos x\\), and \\(\\tan x\\) and \\(\\cot x\\). The same happens on any interval whose limits add to \\(\\dfrac{\\pi}{2}\\), by P3.\n" +
        "- If \\(I = \\int_a^b \\dfrac{g(x)}{g(x) + g(a + b - x)}\\,dx\\), adding the two forms gives \\(2I = b - a\\).\n" +
        "- If the numerators are \\(p\\sin x + q\\cos x\\) and \\(p\\cos x + q\\sin x\\) over \\(\\sin x + \\cos x\\), they add to \\(p + q\\) times the denominator.\n" +
        "- \\(\\tan\\left(\\dfrac{\\pi}{4} - x\\right) = \\dfrac{1 - \\tan x}{1 + \\tan x}\\), so \\(1 + \\tan\\left(\\dfrac{\\pi}{4} - x\\right) = \\dfrac{2}{1 + \\tan x}\\).\n" +
        "- In a written answer, label the two forms (1) and (2) and show the line where they are added.",
      formula: {
        label: "Property P3",
        latex: "\\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_2^{5} \\dfrac{\\sqrt{x}}{\\sqrt{x} + \\sqrt{7 - x}}\\,dx\\).",
        steps: [
          "Let \\(I = \\int_2^5 \\dfrac{\\sqrt{x}}{\\sqrt{x} + \\sqrt{7 - x}}\\,dx\\) ... (1)",
          "Here \\(a + b = 2 + 5 = 7\\). By P3, replace x by \\(7 - x\\): \\(\\sqrt{x}\\) becomes \\(\\sqrt{7 - x}\\) and \\(\\sqrt{7 - x}\\) becomes \\(\\sqrt{x}\\).",
          "So \\(I = \\int_2^5 \\dfrac{\\sqrt{7 - x}}{\\sqrt{7 - x} + \\sqrt{x}}\\,dx\\) ... (2)",
          "Adding (1) and (2): \\(2I = \\int_2^5 \\dfrac{\\sqrt{x} + \\sqrt{7 - x}}{\\sqrt{x} + \\sqrt{7 - x}}\\,dx = \\int_2^5 1\\,dx\\).",
          "\\(2I = \\big[x\\big]_2^5 = 3\\).",
          "\\(I = \\dfrac{3}{2}\\).",
        ],
        answer: "\\(\\dfrac{3}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2} \\dfrac{2\\sin x + 3\\cos x}{\\sin x + \\cos x}\\,dx\\).",
        steps: [
          "By P4, \\(I = \\int_0^{\\pi/2} \\dfrac{2\\cos x + 3\\sin x}{\\cos x + \\sin x}\\,dx\\).",
          "Adding, the numerators make \\(5(\\sin x + \\cos x)\\), so \\(2I = 5 \\times \\dfrac{\\pi}{2}\\).",
        ],
        answer: "\\(\\dfrac{5\\pi}{4}\\)",
      },
      practiceSet: [
        {
          prompt: "Evaluate \\(\\int_0^{2} \\dfrac{x^3}{x^3 + (2 - x)^3}\\,dx\\).",
          answer: "By P4 the integrand becomes \\(\\dfrac{(2 - x)^3}{(2 - x)^3 + x^3}\\); adding gives \\(2I = 2\\), so \\(I = 1\\)",
        },
        {
          prompt: "Evaluate \\(\\int_0^{1} \\dfrac{e^x}{e^x + e^{1 - x}}\\,dx\\).",
          answer: "By P4 the integrand becomes \\(\\dfrac{e^{1 - x}}{e^{1 - x} + e^x}\\); adding gives \\(2I = 1\\), so \\(I = \\dfrac{1}{2}\\)",
        },
        {
          prompt: "Evaluate \\(\\int_0^{3} \\dfrac{\\sqrt[3]{x}}{\\sqrt[3]{x} + \\sqrt[3]{3 - x}}\\,dx\\).",
          answer: "By P4 with \\(a = 3\\), adding the two forms gives \\(2I = 3\\), so \\(I = \\dfrac{3}{2}\\)",
        },
      ],
      pyqExampleId: "4a4d58ed-d8cd-4da1-947f-473be05fbca9",
      traps: [
        {
          title: "Using a − x when the lower limit is not 0",
          body: "On \\(\\left[\\dfrac{\\pi}{8}, \\dfrac{3\\pi}{8}\\right]\\), replace x by \\(\\dfrac{\\pi}{2} - x\\) (that is, a + b − x), not by \\(\\dfrac{3\\pi}{8} - x\\). P4 is only for a lower limit of 0.",
        },
        {
          title: "Stopping after one form",
          body: "The second form alone is no easier than the first. The value comes only when the two forms are ADDED and the integrand becomes a constant.",
        },
        {
          title: "Forgetting to halve",
          body: "Adding the forms gives 2I. Divide by 2 at the end: the commonest wrong option in the MCQs is the value of 2I.",
        },
        {
          title: "A wrong formula for tan(π/4 − x)",
          body: "\\(\\tan\\left(\\dfrac{\\pi}{4} - x\\right) = \\dfrac{1 - \\tan x}{1 + \\tan x}\\), not \\(1 - \\tan x\\). Write the identity in full before you simplify.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-def-xfactor",
      name: "A lone x in front: remove it with P4",
      intuition:
        "An x multiplying a trigonometric fraction has no easy antiderivative. Replace x by a − x: if the rest of the integrand does not change, then I = a × (the integral of the rest) − I. So 2I equals a times a plain integral, and the x has gone.",
      definition:
        "- The trick works when \\(g(a - x) = g(x)\\): on \\([0, \\pi]\\), \\(\\sin(\\pi - x) = \\sin x\\) and \\(\\cos^2(\\pi - x) = \\cos^2 x\\); on \\(\\left[0, \\dfrac{\\pi}{2}\\right]\\), \\(\\sin x + \\cos x\\) does not change.\n" +
        "- Then \\(\\int_0^a x\\,g(x)\\,dx = \\dfrac{a}{2}\\int_0^a g(x)\\,dx\\).\n" +
        "- What is left is a plain integral: \\(\\dfrac{\\sin x}{1 + \\cos^2 x}\\) with \\(t = \\cos x\\) (NCERT Example 30); \\(\\dfrac{1}{1 + \\sin x} = \\dfrac{1 - \\sin x}{\\cos^2 x} = \\sec^2 x - \\sec x\\tan x\\); \\(\\sin x + \\cos x = \\sqrt{2}\\cos\\left(x - \\dfrac{\\pi}{4}\\right)\\).\n" +
        "- If tan x or sec x appear, rewrite in sin x and cos x first so nothing is undefined at \\(\\dfrac{\\pi}{2}\\): \\(\\dfrac{\\tan x}{\\sec x + \\tan x} = \\dfrac{\\sin x}{1 + \\sin x}\\).\n" +
        "- For \\(x(1 - x)^n\\) on \\([0, 1]\\), P4 moves the power onto x: \\(\\int_0^1 x(1 - x)^n\\,dx = \\int_0^1 (1 - x)x^n\\,dx\\).\n" +
        "- The same idea proves results like NCERT Exercise 7.10 Q19: if \\(f(a - x) = f(x)\\) and \\(g(x) + g(a - x) = k\\), then \\(\\int_0^a f(x)g(x)\\,dx = \\dfrac{k}{2}\\int_0^a f(x)\\,dx\\).",
      formula: {
        label: "Removing a factor x",
        latex: "\\int_0^a x\\,g(x)\\,dx = \\dfrac{a}{2}\\int_0^a g(x)\\,dx \\quad \\text{when } g(a - x) = g(x)",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi} x\\sin x\\cos^2 x\\,dx\\).",
        steps: [
          "Let \\(I = \\int_0^{\\pi} x\\sin x\\cos^2 x\\,dx\\) ... (1)",
          "By P4 with \\(a = \\pi\\): \\(\\sin(\\pi - x) = \\sin x\\) and \\(\\cos^2(\\pi - x) = \\cos^2 x\\), so \\(I = \\int_0^{\\pi} (\\pi - x)\\sin x\\cos^2 x\\,dx\\) ... (2)",
          "Adding (1) and (2): \\(2I = \\pi\\int_0^{\\pi} \\sin x\\cos^2 x\\,dx\\).",
          "Put \\(t = \\cos x\\), \\(dt = -\\sin x\\,dx\\). When \\(x = 0\\), \\(t = 1\\); when \\(x = \\pi\\), \\(t = -1\\).",
          "\\(2I = \\pi\\int_1^{-1} t^2\\,(-dt) = \\pi\\int_{-1}^{1} t^2\\,dt = \\pi\\left[\\dfrac{t^3}{3}\\right]_{-1}^{1} = \\dfrac{2\\pi}{3}\\).",
          "\\(I = \\dfrac{\\pi}{3}\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{3}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{1} x(1 - x)^4\\,dx\\).",
        steps: ["By P4, \\(\\int_0^1 (1 - x)x^4\\,dx = \\dfrac{1}{5} - \\dfrac{1}{6}\\)."],
        answer: "\\(\\dfrac{1}{30}\\)",
      },
      practiceSet: [
        {
          prompt: "Evaluate \\(\\int_0^{\\pi} x\\sin x\\,dx\\) using P4.",
          answer: "\\(2I = \\pi\\int_0^{\\pi} \\sin x\\,dx = 2\\pi\\), so \\(I = \\pi\\)",
        },
        {
          prompt: "Evaluate \\(\\int_0^{\\pi} x\\sin^3 x\\,dx\\).",
          answer: "\\(I = \\dfrac{\\pi}{2}\\int_0^{\\pi} \\sin^3 x\\,dx = \\dfrac{\\pi}{2} \\times \\dfrac{4}{3} = \\dfrac{2\\pi}{3}\\)",
        },
        {
          prompt: "Show that \\(\\int_0^{\\pi} x\\,f(\\sin x)\\,dx = \\dfrac{\\pi}{2}\\int_0^{\\pi} f(\\sin x)\\,dx\\).",
          answer: "By P4, \\(I = \\int_0^{\\pi} (\\pi - x)f(\\sin x)\\,dx = \\pi\\int_0^{\\pi} f(\\sin x)\\,dx - I\\), as \\(\\sin(\\pi - x) = \\sin x\\); so \\(2I = \\pi\\int_0^{\\pi} f(\\sin x)\\,dx\\)",
        },
      ],
      pyqExampleId: "25983a9e-c6d1-4644-9c95-090526eaf6ca",
      traps: [
        {
          title: "Using the trick when the rest changes",
          body: "On \\([0, \\pi]\\), \\(\\cos(\\pi - x) = -\\cos x\\), so \\(\\dfrac{x}{1 + \\cos x}\\) does NOT keep its denominator. Check that the rest of the integrand is unchanged before you add the two forms.",
        },
        {
          title: "Dropping the a",
          body: "Adding the forms gives \\(2I = a\\int_0^a g(x)\\,dx\\). Leaving out the a (often \\(\\pi\\)) is the usual slip in the last line.",
        },
        {
          title: "Integrating through a point where tan x is undefined",
          body: "On \\([0, \\pi]\\), \\(\\tan x\\) and \\(\\sec x\\) are not defined at \\(\\dfrac{\\pi}{2}\\). Rewrite in \\(\\sin x\\) and \\(\\cos x\\) so the integrand is defined everywhere, then integrate.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-def-double",
      name: "On [0, 2a]: P5 and P6",
      intuition:
        "Cut [0, 2a] in the middle. If the right half of the graph is the mirror image of the left half, f(2a − x) = f(x), the integral is twice the left half. If it is the upside-down mirror image, f(2a − x) = −f(x), the two halves cancel and the integral is 0.",
      definition:
        "- **P5:** \\(\\int_0^{2a} f(x)\\,dx = \\int_0^a f(x)\\,dx + \\int_0^a f(2a - x)\\,dx\\).\n" +
        "- **P6:** \\(\\int_0^{2a} f(x)\\,dx = 2\\int_0^a f(x)\\,dx\\) if \\(f(2a - x) = f(x)\\), and \\(= 0\\) if \\(f(2a - x) = -f(x)\\).\n" +
        "- On \\([0, \\pi]\\): \\(\\sin(\\pi - x) = \\sin x\\), \\(\\cos(\\pi - x) = -\\cos x\\), so \\(\\sin^2 x\\) and \\(\\cos^2 x\\) keep their value.\n" +
        "- On \\([0, 2\\pi]\\): \\(\\cos(2\\pi - x) = \\cos x\\) and \\(\\sin(2\\pi - x) = -\\sin x\\).\n" +
        "- P6 can be used twice: \\([0, 2\\pi] \\to [0, \\pi] \\to \\left[0, \\dfrac{\\pi}{2}\\right]\\).\n" +
        "- After halving to \\(\\left[0, \\dfrac{\\pi}{2}\\right]\\) a fraction in \\(\\sin^2 x\\) and \\(\\cos^2 x\\) is divided by \\(\\cos^2 x\\) to bring in \\(\\tan x\\). NCERT (Miscellaneous Example 42) splits at \\(\\dfrac{\\pi}{4}\\), using \\(t = \\tan x\\) on one piece and \\(u = \\cot x\\) on the other, so no limit is infinite.",
      formula: {
        label: "Property P6",
        latex: "\\int_0^{2a} f(x)\\,dx = 2\\int_0^{a} f(x)\\,dx \\quad \\text{if } f(2a - x) = f(x)",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{2\\pi} (\\cos x + \\cos^2 x)\\,dx\\).",
        steps: [
          "Let \\(I = \\int_0^{2\\pi} \\cos x\\,dx + \\int_0^{2\\pi} \\cos^2 x\\,dx = I_1 + I_2\\).",
          "\\(I_1\\): \\(\\cos(2\\pi - x) = \\cos x\\), so by P6 \\(I_1 = 2\\int_0^{\\pi} \\cos x\\,dx\\). And \\(\\cos(\\pi - x) = -\\cos x\\), so by P6 again \\(\\int_0^{\\pi} \\cos x\\,dx = 0\\). Hence \\(I_1 = 0\\).",
          "\\(I_2\\): \\(\\cos^2(2\\pi - x) = \\cos^2 x\\) and \\(\\cos^2(\\pi - x) = \\cos^2 x\\), so \\(I_2 = 2\\int_0^{\\pi} \\cos^2 x\\,dx = 4\\int_0^{\\pi/2} \\cos^2 x\\,dx\\).",
          "\\(\\int_0^{\\pi/2} \\cos^2 x\\,dx = \\dfrac{1}{2}\\left[x + \\dfrac{\\sin 2x}{2}\\right]_0^{\\pi/2} = \\dfrac{\\pi}{4}\\).",
          "So \\(I_2 = 4 \\times \\dfrac{\\pi}{4} = \\pi\\), and \\(I = 0 + \\pi\\).",
        ],
        answer: "\\(\\pi\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi} \\cos^3 x\\,dx\\).",
        steps: ["\\(\\cos^3(\\pi - x) = -\\cos^3 x\\), so by P6 the two halves cancel."],
        answer: "0",
      },
      practiceSet: [
        {
          prompt: "If \\(f(4 - x) = f(x)\\) and \\(\\int_0^{2} f(x)\\,dx = 5\\), find \\(\\int_0^{4} f(x)\\,dx\\).",
          answer: "By P6 with \\(a = 2\\): \\(2 \\times 5 = 10\\)",
        },
        {
          prompt: "Evaluate \\(\\int_0^{2\\pi} \\sin^3 x\\,dx\\).",
          answer: "\\(\\sin^3(2\\pi - x) = -\\sin^3 x\\), so by P6 the value is 0",
        },
        {
          prompt: "Evaluate \\(\\int_0^{\\pi} \\sin^2 x\\,dx\\) using P6.",
          answer: "\\(2\\int_0^{\\pi/2} \\sin^2 x\\,dx = \\left[x - \\dfrac{\\sin 2x}{2}\\right]_0^{\\pi/2} = \\dfrac{\\pi}{2}\\)",
        },
      ],
      pyqExampleId: "d198cc1c-eec6-47ce-97a7-a206d8b501fe",
      traps: [
        {
          title: "Testing the wrong point",
          body: "For \\([0, \\pi]\\), compare \\(f(\\pi - x)\\) with \\(f(x)\\), where \\(2a = \\pi\\). Comparing \\(f\\left(\\dfrac{\\pi}{2} - x\\right)\\) is P4 on a different interval.",
        },
        {
          title: "Doubling when the halves cancel",
          body: "\\(\\cos(\\pi - x) = -\\cos x\\), so \\(\\int_0^{\\pi} \\cos^5 x\\,dx = 0\\), not \\(2\\int_0^{\\pi/2} \\cos^5 x\\,dx\\). Check the sign of \\(f(2a - x)\\) before you double.",
        },
        {
          title: "A limit where tan x is not defined",
          body: "\\(\\tan\\dfrac{\\pi}{2}\\) does not exist. After \\(t = \\tan x\\) on \\(\\left[0, \\dfrac{\\pi}{2}\\right]\\), the upper limit is \\(t \\to \\infty\\); write it so, or split at \\(\\dfrac{\\pi}{4}\\) as NCERT does.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-def-logs",
      name: "Log integrals, and integrals equal to their own negative",
      intuition:
        "log sin x, log tan x and log(1 + tan x) have no antiderivative in the book. Use P4 instead: the new form either combines with the old one into a constant such as log 2, or it turns out to be exactly minus I, and then I = 0.",
      definition:
        "- **NCERT Example 34:** \\(\\int_0^{\\pi/2} \\log\\sin x\\,dx = \\int_0^{\\pi/2} \\log\\cos x\\,dx = -\\dfrac{\\pi}{2}\\log 2\\).\n" +
        "- Outline: by P4 the two integrals are equal; adding, \\(2I = \\int_0^{\\pi/2} \\log\\sin 2x\\,dx - \\dfrac{\\pi}{2}\\log 2\\); with \\(2x = t\\) and P6, \\(\\int_0^{\\pi/2} \\log\\sin 2x\\,dx = I\\); so \\(I = -\\dfrac{\\pi}{2}\\log 2\\).\n" +
        "- \\(\\int_0^{\\pi/2} \\log\\tan x\\,dx = 0\\), because \\(\\tan\\left(\\dfrac{\\pi}{2} - x\\right) = \\cot x = \\dfrac{1}{\\tan x}\\).\n" +
        "- For \\(\\log(1 + \\tan x)\\) on \\(\\left[0, \\dfrac{\\pi}{4}\\right]\\), use \\(1 + \\tan\\left(\\dfrac{\\pi}{4} - x\\right) = \\dfrac{2}{1 + \\tan x}\\).\n" +
        "- Combine logs before using a property: \\(2\\log\\cos x - \\log\\sin 2x = \\log\\dfrac{\\cot x}{2}\\).\n" +
        "- If the replaced integrand is the negative of the original, \\(I = -I\\), so \\(2I = 0\\) and \\(I = 0\\). Example: \\(\\dfrac{\\sin x - \\cos x}{1 + \\sin x\\cos x}\\) on \\(\\left[0, \\dfrac{\\pi}{2}\\right]\\).",
      formula: {
        label: "Log of sine from 0 to π/2",
        latex: "\\int_0^{\\pi/2} \\log\\sin x\\,dx = \\int_0^{\\pi/2} \\log\\cos x\\,dx = -\\dfrac{\\pi}{2}\\log 2",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2} \\log(\\tan x + \\cot x)\\,dx\\).",
        steps: [
          "\\(\\tan x + \\cot x = \\dfrac{\\sin^2 x + \\cos^2 x}{\\sin x\\cos x} = \\dfrac{1}{\\sin x\\cos x}\\).",
          "So \\(I = -\\int_0^{\\pi/2} \\log\\sin x\\,dx - \\int_0^{\\pi/2} \\log\\cos x\\,dx\\).",
          "By P4, \\(\\int_0^{\\pi/2} \\log\\cos x\\,dx = \\int_0^{\\pi/2} \\log\\sin x\\,dx\\), and each equals \\(-\\dfrac{\\pi}{2}\\log 2\\) (NCERT Example 34).",
          "\\(I = \\dfrac{\\pi}{2}\\log 2 + \\dfrac{\\pi}{2}\\log 2\\).",
          "\\(I = \\pi\\log 2\\).",
        ],
        answer: "\\(\\pi\\log 2\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2} \\log\\cot x\\,dx\\).",
        steps: ["By P4, \\(I = \\int_0^{\\pi/2} \\log\\tan x\\,dx = -I\\), so \\(2I = 0\\)."],
        answer: "0",
      },
      practiceSet: [
        {
          prompt: "Evaluate \\(\\int_0^{\\pi/2} \\log\\left(\\dfrac{2 + \\sin x}{2 + \\cos x}\\right)dx\\).",
          answer: "By P4 the integrand becomes \\(\\log\\dfrac{2 + \\cos x}{2 + \\sin x}\\), its negative, so \\(I = -I\\) and \\(I = 0\\)",
        },
        {
          prompt: "Evaluate \\(\\int_0^{\\pi/2} \\log(2\\sin x)\\,dx\\).",
          answer: "\\(\\dfrac{\\pi}{2}\\log 2 + \\int_0^{\\pi/2} \\log\\sin x\\,dx = \\dfrac{\\pi}{2}\\log 2 - \\dfrac{\\pi}{2}\\log 2 = 0\\)",
        },
        {
          prompt: "Evaluate \\(\\int_0^{\\pi/2} \\dfrac{\\cos x - \\sin x}{2 + \\sin x\\cos x}\\,dx\\).",
          answer: "By P4 the numerator changes sign and the denominator stays, so \\(I = -I\\) and \\(I = 0\\)",
        },
      ],
      pyqExampleId: "35c25985-e41a-4919-8ba1-d611774531bc",
      traps: [
        {
          title: "Trying to integrate log tan x directly",
          body: "There is no antiderivative of \\(\\log\\tan x\\) or \\(\\log\\sin x\\) in the book. The marks are for the property step, so write P4 and the replaced integrand first.",
        },
        {
          title: "The sign of the log sin result",
          body: "On \\(\\left(0, \\dfrac{\\pi}{2}\\right)\\), \\(\\sin x < 1\\), so \\(\\log\\sin x < 0\\) and the integral is negative: \\(-\\dfrac{\\pi}{2}\\log 2\\). A positive answer means a sign slip.",
        },
        {
          title: "Not combining the logs first",
          body: "\\(\\log\\sin x - \\log(2\\cos x) = \\log\\dfrac{\\tan x}{2}\\). Combine into one log before using P4, so the two forms multiply to a constant inside the log.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-def-evenodd",
      name: "Even and odd functions on [−a, a] (P7)",
      intuition:
        "On an interval symmetric about 0, an odd function's area on the left cancels its area on the right, so the integral is 0. An even function has the same area on both sides, so the integral is twice the integral from 0 to a. A function that is neither can still be handled: replace x by −x and add.",
      definition:
        "- **P7 (i):** if f is even, \\(f(-x) = f(x)\\), then \\(\\int_{-a}^a f(x)\\,dx = 2\\int_0^a f(x)\\,dx\\).\n" +
        "- **P7 (ii):** if f is odd, \\(f(-x) = -f(x)\\), then \\(\\int_{-a}^a f(x)\\,dx = 0\\).\n" +
        "- Even: \\(x^2\\), \\(|x|\\), \\(\\cos x\\), \\(\\sin^2 x\\), any function of \\(|x|\\). Odd: \\(x^3\\), \\(\\sin x\\), \\(\\tan x\\), \\(x|x|\\), \\(\\log\\dfrac{1 + x}{1 - x}\\).\n" +
        "- odd × even = odd, odd × odd = even, even × even = even.\n" +
        "- Split a sum into its odd and even parts: the odd parts give 0, the even parts double.\n" +
        "- A function that is neither, like \\(\\dfrac{x^2}{1 + 5^x}\\): replace x by \\(-x\\) (P3 with \\(a + b = 0\\)), multiply above and below by \\(5^x\\), and add the two forms, so \\(2I = \\int_{-a}^a x^2\\,dx\\).\n" +
        "- P7 needs limits \\(-a\\) and a. On \\([0, a]\\) it says nothing.",
      formula: {
        label: "Property P7",
        latex: "\\int_{-a}^{a} f(x)\\,dx = \\begin{cases} 2\\int_0^a f(x)\\,dx, & f \\text{ even} \\\\ 0, & f \\text{ odd} \\end{cases}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_{-\\pi/2}^{\\pi/2} (x^3 + x\\cos x + \\cos^2 x)\\,dx\\).",
        steps: [
          "\\(x^3\\) is odd. \\(x\\cos x\\) is odd × even, so it is odd. \\(\\cos^2 x\\) is even.",
          "By P7 (ii), \\(\\int_{-\\pi/2}^{\\pi/2} (x^3 + x\\cos x)\\,dx = 0\\).",
          "By P7 (i), \\(\\int_{-\\pi/2}^{\\pi/2} \\cos^2 x\\,dx = 2\\int_0^{\\pi/2} \\cos^2 x\\,dx\\).",
          "\\(2\\int_0^{\\pi/2} \\dfrac{1 + \\cos 2x}{2}\\,dx = \\left[x + \\dfrac{\\sin 2x}{2}\\right]_0^{\\pi/2} = \\dfrac{\\pi}{2}\\).",
          "So the value is \\(0 + \\dfrac{\\pi}{2}\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_{-1}^{1} \\dfrac{x^2}{1 + 3^x}\\,dx\\).",
        steps: [
          "Replacing x by \\(-x\\): \\(I = \\int_{-1}^{1} \\dfrac{3^x x^2}{3^x + 1}\\,dx\\).",
          "Adding, \\(2I = \\int_{-1}^{1} x^2\\,dx = \\dfrac{2}{3}\\).",
        ],
        answer: "\\(\\dfrac{1}{3}\\)",
      },
      practiceSet: [
        {
          prompt: "Evaluate \\(\\int_{-1}^{1} (x^3 + 4x^2)\\,dx\\).",
          answer: "\\(x^3\\) is odd and gives 0; \\(2\\int_0^1 4x^2\\,dx = \\dfrac{8}{3}\\)",
        },
        {
          prompt: "Evaluate \\(\\int_{-2}^{2} \\dfrac{x^3 + x}{x^4 + 1}\\,dx\\).",
          answer: "The integrand is odd (odd over even), so the value is 0",
        },
        {
          prompt: "Evaluate \\(\\int_{-a}^{a} \\dfrac{4^x}{1 + 4^x}\\,dx\\).",
          answer: "Replacing x by \\(-x\\) gives \\(\\dfrac{1}{1 + 4^x}\\); adding, \\(2I = 2a\\), so \\(I = a\\)",
        },
      ],
      pyqExampleId: "a104a2f6-8012-45ee-86c8-d26302bf1f47",
      traps: [
        {
          title: "Doubling an odd function",
          body: "\\(\\int_{-a}^a f = 2\\int_0^a f\\) is for EVEN functions only. For an odd function the value is 0, and the MCQ's wrong options usually swap the two rules.",
        },
        {
          title: "Calling sin² x odd",
          body: "\\(\\sin^2(-x) = (-\\sin x)^2 = \\sin^2 x\\), so \\(\\sin^2 x\\) is even. Test \\(f(-x)\\) every time; do not judge by the sin in it.",
        },
        {
          title: "Using P7 on the wrong interval",
          body: "P7 needs limits \\(-a\\) and a. For \\([0, 2a]\\), use P6, which compares \\(f(2a - x)\\) with \\(f(x)\\).",
        },
        {
          title: "Calling a function odd because of one odd part",
          body: "\\(x^3 + |x| + 1\\) is neither odd nor even. Split it: the \\(x^3\\) part gives 0 and the \\(|x| + 1\\) part doubles.",
        },
      ],
    },
  ],
};

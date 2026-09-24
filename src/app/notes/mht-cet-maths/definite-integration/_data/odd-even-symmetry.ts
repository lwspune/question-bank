import type { SubtopicNote } from "@/app/notes/_types";

export const ODD_EVEN_SYMMETRY_NOTE: SubtopicNote = {
  subtopicName: "Odd and Even Integrands — Symmetric Limits",
  title: "Odd and Even Integrands — Symmetric Limits",
  oneLineDefinition:
    "Over limits symmetric about 0, an odd integrand integrates to 0 and an even one to twice the half — so the first thing to do with limits −a to a is test f(−x), before any antiderivative.",
  whyItMatters:
    "11 PYQs at 55% HARD, and the fastest marks in the chapter when the test is applied first: five of the eleven are answered by writing f(−x) = −f(x) and nothing else. " +
    "The HARD ones hide the symmetry — a polynomial that becomes odd only after the variable is shifted, a log term that is odd while the rest is even, or a substitution x → 1/x that plays the role of x → −x. " +
    "One recurring stem is a trap in the other direction: an even integrand whose integral does not exist at all, keyed to a formal value the exam accepts.",
  concepts: [
    // 1 — the test
    {
      kind: "formula" as const,
      slug: "cetdi-odd-even-test",
      name: "The Odd/Even Test on Symmetric Limits",
      intuition:
        "An odd function's graph on \\([-a, 0]\\) is the upside-down mirror of its graph on \\([0, a]\\): the two signed areas cancel exactly. An even function's two halves are identical, so the whole is twice one half.",
      definition:
        "- \\(f\\) is **even** if \\(f(-x) = f(x)\\); **odd** if \\(f(-x) = -f(x)\\). Test by replacing \\(x\\) with \\(-x\\) and simplifying.\n" +
        "- \\(\\int_{-a}^{a} f(x)\\,dx = 0\\) for odd \\(f\\); \\(= 2\\int_0^a f(x)\\,dx\\) for even \\(f\\).\n" +
        "- Products: odd × odd = even, even × even = even, odd × even = odd. \\(\\sin^7x\\cos^{16}x\\) is odd (\\(\\sin\\) to an odd power); \\(x^2\\cos x\\) is even.\n" +
        "- \\(f(x) + f(-x)\\) is always even and \\(g(x) - g(-x)\\) is always odd, whatever \\(f\\) and \\(g\\) are — so their product is odd and integrates to \\(0\\) over any symmetric interval.\n" +
        "- Symmetric limits that do not look symmetric: \\(\\log\\frac12\\) to \\(\\log 2\\) is \\(-\\log 2\\) to \\(\\log 2\\). And \\(\\sin\\left(\\dfrac{e^x - 1}{e^x + 1}\\right)\\) is odd because \\(\\dfrac{e^{-x} - 1}{e^{-x} + 1} = -\\dfrac{e^x - 1}{e^x + 1}\\).",
      formula: {
        label: "Symmetric-limit rule",
        latex:
          "\\int_{-a}^{a} f(x)\\,dx = \\begin{cases} 0, & f(-x) = -f(x) \\\\[2pt] 2\\displaystyle\\int_0^a f(x)\\,dx, & f(-x) = f(x) \\end{cases}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_{-2}^{2}\\left(x^3\\cos x + x^2\\right)dx\\).",
        steps: [
          "\\(x^3\\cos x\\) is odd × even = odd: its integral over \\([-2, 2]\\) is \\(0\\).",
          "\\(x^2\\) is even: \\(2\\int_0^2 x^2\\,dx = 2\\cdot\\dfrac83 = \\dfrac{16}{3}\\).",
        ],
        answer: "\\(\\dfrac{16}{3}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_{-\\pi/2}^{\\pi/2}\\sin^5x\\cos^2x\\,dx\\).",
        steps: [
          "Replace \\(x\\) by \\(-x\\): \\((-\\sin x)^5(\\cos x)^2 = -\\sin^5x\\cos^2x\\). Odd.",
          "Symmetric limits, so the integral is \\(0\\).",
        ],
        answer: "\\(0\\)",
      },
      practiceSet: [
        {
          prompt: "Is \\(x\\sin x\\) odd or even?",
          answer: "Even (odd × odd).",
        },
        {
          prompt: "\\(\\int_{-1}^{1} x^{99}\\,dx = ?\\)",
          answer: "\\(0\\)",
        },
        {
          prompt: "\\(\\int_{-\\pi}^{\\pi}\\cos x\\,dx = ?\\)",
          answer: "\\(0\\)",
          method: "Even, but \\(2\\int_0^\\pi\\cos x = 0\\) anyway — evenness does not mean non-zero.",
        },
        {
          prompt: "\\(\\int_{-3}^{3}|x|\\,dx = ?\\)",
          answer: "\\(9\\)",
          method: "Even: \\(2\\int_0^3 x\\,dx\\).",
        },
      ],
      pyqExampleId: "4974816c-e819-41ed-b462-d4ae92255ace",
      traps: [
        {
          title: "Testing the limits instead of the function",
          body:
            "Symmetric limits are necessary, not sufficient. \\(\\int_{-1}^{1}x^2\\,dx\\) is \\(\\frac23\\), not \\(0\\): the integrand must be odd for the integral to vanish. Write \\(f(-x)\\) explicitly every time.",
        },
      ],
    },

    // 2 — split into odd + even parts
    {
      kind: "formula" as const,
      slug: "cetdi-split-into-odd-and-even-parts",
      name: "Split a Mixed Integrand into Its Odd and Even Parts",
      intuition:
        "\\(\\dfrac{17x^5 - x^4 + 29x^3 - 31x + 1}{x^2 + 1}\\) looks hopeless, but every odd-power term over the even denominator is odd and vanishes on \\([-1, 1]\\); only \\(\\dfrac{1 - x^4}{x^2 + 1} = 1 - x^2\\) survives. Split, discard, integrate what is left.",
      definition:
        "- Any integrand splits as (odd part) + (even part). On \\([-a, a]\\) the odd part contributes \\(0\\); integrate only the even part, doubled from \\(0\\) to \\(a\\).\n" +
        "- \\(\\log\\dfrac{\\pi - x}{\\pi + x}\\), \\(\\log\\dfrac{1 + x}{1 - x}\\) and \\(\\tan^{-1}x\\) are odd; multiplied by an even function (\\(\\cos x\\)) they stay odd and drop out. What remains is typically \\(x^2\\cos x\\), which needs by parts twice: \\(\\int_0^{\\pi/2}x^2\\cos x\\,dx = \\dfrac{\\pi^2}{4} - 2\\).\n" +
        "- **Shift the variable** when the interval is symmetric about a point other than \\(0\\): on \\([-2, 0]\\) put \\(t = x + 1\\); then \\(x^3 + 3x^2 + 3x + 5 = (x + 1)^3 + 4 = t^3 + 4\\) and \\((x + 1)\\cos(x + 1) = t\\cos t\\), both odd except the constant \\(4\\), so the integral is \\(4\\times 2 = 8\\).\n" +
        "- A greatest-integer term is neither odd nor even: \\(\\int_{-1/2}^{1/2}[x]\\,dx = \\int_{-1/2}^{0}(-1)\\,dx + 0 = -\\dfrac12\\), evaluated by splitting, while the odd log beside it vanishes.",
      formula: {
        label: "Odd part vanishes",
        latex:
          "\\int_{-a}^{a}\\big[\\text{odd}(x) + \\text{even}(x)\\big]dx = 2\\int_0^a \\text{even}(x)\\,dx \\qquad \\int_0^{\\pi/2}x^2\\cos x\\,dx = \\frac{\\pi^2}{4} - 2",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_{-1}^{1}\\dfrac{x^3 + x^2 + x + 1}{x^2 + 1}\\,dx\\).",
        steps: [
          "Odd part: \\(\\dfrac{x^3 + x}{x^2 + 1} = x\\), which integrates to \\(0\\) over \\([-1, 1]\\).",
          "Even part: \\(\\dfrac{x^2 + 1}{x^2 + 1} = 1\\), so the integral is \\(2\\int_0^1 1\\,dx = 2\\).",
        ],
        answer: "\\(2\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_{-\\pi/2}^{\\pi/2}\\left(x\\cos x + \\cos x\\right)dx\\).",
        steps: [
          "\\(x\\cos x\\) is odd (odd × even): contributes \\(0\\).",
          "\\(\\cos x\\) is even: \\(2\\int_0^{\\pi/2}\\cos x\\,dx = 2\\).",
        ],
        answer: "\\(2\\)",
      },
      practiceSet: [
        {
          prompt: "Is \\(\\log\\dfrac{1 + x}{1 - x}\\) odd or even?",
          answer: "Odd — replacing \\(x\\) by \\(-x\\) inverts the fraction and negates the log.",
        },
        {
          prompt: "\\(\\int_{-1}^{1}(x^5 + 3)\\,dx = ?\\)",
          answer: "\\(6\\)",
        },
        {
          prompt: "To make \\([-4, 2]\\) symmetric, substitute \\(t = ?\\)",
          answer: "\\(t = x + 1\\) (interval becomes \\([-3, 3]\\)).",
        },
        {
          prompt: "\\(\\int_{-1/2}^{1/2}[x]\\,dx = ?\\)",
          answer: "\\(-\\dfrac12\\)",
        },
      ],
      pyqExampleId: "f52f4bfc-5fbe-4d9c-a2c6-f744db886c1c",
      traps: [
        {
          title: "Discarding the constant with the odd terms",
          body:
            "\\(t^3 + 4 + t\\cos t\\) over \\([-1, 1]\\): the \\(t^3\\) and \\(t\\cos t\\) vanish, but the \\(4\\) integrates to \\(8\\). Zero is the answer for the ODD part, not for the question.",
        },
      ],
    },

    // 3 — x → 1/x symmetry
    {
      kind: "formula" as const,
      slug: "cetdi-symmetry-under-x-to-one-over-x",
      name: "Symmetry Under x → 1/x on [1/2, 2]",
      intuition:
        "On an interval like \\(\\left[\\frac12, 2\\right]\\), the substitution \\(x = \\dfrac1t\\) maps the interval onto itself and flips the sign of \\(x - \\dfrac1x\\). If the integrand is \\(\\dfrac1x\\) times an odd function of \\(x - \\dfrac1x\\), the integral equals its own negative — so it is \\(0\\).",
      definition:
        "- With \\(x = \\dfrac1t\\): \\(dx = -\\dfrac{dt}{t^2}\\), \\(\\dfrac{dx}{x} = -\\dfrac{dt}{t}\\), and \\(x - \\dfrac1x = -\\left(t - \\dfrac1t\\right)\\). Limits \\(\\frac12 \\to 2\\) become \\(2 \\to \\frac12\\), and flipping them back cancels the minus from \\(dx\\).\n" +
        "- So \\(I = \\int_{1/2}^{2}\\dfrac1x\\,g\\!\\left(x - \\dfrac1x\\right)dx\\) becomes \\(\\int_{1/2}^{2}\\dfrac1t\\,g\\!\\left(-\\left(t - \\dfrac1t\\right)\\right)dt\\); for odd \\(g\\) this is \\(-I\\), hence \\(I = 0\\).\n" +
        "- \\(\\csc^{101}\\) is odd (odd power of an odd function), so \\(\\int_{1/2}^{2}\\dfrac1x\\csc^{101}\\!\\left(x - \\dfrac1x\\right)dx = 0\\).\n" +
        "- The interval must be of the form \\(\\left[\\frac1a, a\\right]\\) and the \\(\\dfrac1x\\) factor must be present; without it the trick fails.",
      formula: {
        label: "The reciprocal symmetry",
        latex:
          "x = \\tfrac1t:\\quad \\int_{1/a}^{a}\\frac{1}{x}\\,g\\!\\left(x - \\frac1x\\right)dx = -\\int_{1/a}^{a}\\frac{1}{t}\\,g\\!\\left(t - \\frac1t\\right)dt \\ \\text{ for odd } g \\ \\Rightarrow\\ I = 0",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_{1/3}^{3}\\dfrac{1}{x}\\sin\\!\\left(x - \\dfrac1x\\right)dx\\).",
        steps: [
          "Put \\(x = \\dfrac1t\\): \\(\\dfrac{dx}{x} = -\\dfrac{dt}{t}\\), \\(x - \\dfrac1x = -\\left(t - \\dfrac1t\\right)\\), limits \\(3 \\to \\frac13\\).",
          "\\(I = \\int_3^{1/3}\\left(-\\dfrac{dt}{t}\\right)\\sin\\!\\left(-\\left(t - \\tfrac1t\\right)\\right) = \\int_3^{1/3}\\dfrac{dt}{t}\\sin\\!\\left(t - \\tfrac1t\\right) = -\\int_{1/3}^{3}\\dfrac{1}{t}\\sin\\!\\left(t - \\tfrac1t\\right)dt = -I\\).",
          "\\(2I = 0\\).",
        ],
        answer: "\\(0\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_{1/2}^{2}\\dfrac{1}{x}\\tan^{-1}\\!\\left(x - \\dfrac1x\\right)dx\\).",
        steps: [
          "\\(\\tan^{-1}\\) is odd and the interval is \\(\\left[\\frac12, 2\\right]\\) with the \\(\\frac1x\\) factor present.",
          "The reciprocal symmetry gives \\(I = -I\\).",
        ],
        answer: "\\(0\\)",
      },
      pyqExampleId: "573bf219-00bf-4952-aa54-713d0cdf5c1f",
      traps: [
        {
          title: "Applying it without the 1/x",
          body:
            "\\(\\int_{1/2}^{2}\\sin\\!\\left(x - \\frac1x\\right)dx\\) is NOT zero: without the \\(\\dfrac1x\\) the substitution produces an extra \\(\\dfrac{1}{t^2}\\) and the symmetry breaks. Check for the factor before claiming the cancellation.",
        },
      ],
    },

    // 4 — even does not mean convergent
    {
      kind: "formula" as const,
      slug: "cetdi-even-does-not-mean-convergent",
      name: "Even Does Not Mean Convergent: the csc⁴x Trap",
      intuition:
        "\\(\\csc^4x\\) is even, and doubling the half-integral is the natural move — but \\(\\csc^4x\\) blows up at \\(x = 0\\), which sits inside \\(\\left[-\\frac{\\pi}{4}, \\frac{\\pi}{4}\\right]\\). The integral does not exist; what the exam key reports is the antiderivative evaluated end to end.",
      definition:
        "- Before applying any property, check the integrand is **defined and finite on the whole interval**. \\(\\csc x\\), \\(\\sec x\\), \\(\\tan x\\), \\(\\dfrac1x\\) and \\(\\log x\\) each have points where they blow up.\n" +
        "- \\(\\int_{-\\pi/4}^{\\pi/4}\\csc^4x\\,dx\\): the antiderivative is \\(-\\cot x - \\dfrac{\\cot^3x}{3}\\); evaluated formally from \\(-\\frac{\\pi}{4}\\) to \\(\\frac{\\pi}{4}\\) it gives \\(\\left(-1 - \\frac13\\right) - \\left(1 + \\frac13\\right) = -\\dfrac83\\) — a NEGATIVE number for a positive integrand, which is the tell that something is wrong. The true integral diverges.\n" +
        "- This question has been set twice (2023 and 2025) with the official key \\(-\\dfrac83\\); on the paper, mark the key. In your understanding, know why it is meaningless.\n" +
        "- The same care applies to \\(\\int_0^{\\pi/2}\\dfrac{dx}{1 - \\cos x}\\) (blows up at \\(0\\)) and to any \\(\\int\\dfrac{dx}{x^2}\\) across \\(0\\).",
      formula: {
        label: "Check the domain first",
        latex:
          "\\int_{-\\pi/4}^{\\pi/4}\\csc^4x\\,dx \\text{ diverges}; \\quad \\left[-\\cot x - \\tfrac{\\cot^3x}{3}\\right]_{-\\pi/4}^{\\pi/4} = -\\tfrac83 \\text{ is the exam's formal key}",
      },
      authoredExample: {
        prompt: "Does \\(\\int_{-1}^{1}\\dfrac{dx}{x^2}\\) exist? What does the formal evaluation give?",
        steps: [
          "\\(\\dfrac{1}{x^2}\\) is even and positive, but undefined at \\(x = 0\\), inside the interval; near \\(0\\) it grows without bound and the integral diverges.",
          "Formally: \\(\\left[-\\dfrac1x\\right]_{-1}^{1} = -1 - 1 = -2\\) — negative for a positive integrand, which exposes the error.",
        ],
        answer: "The integral does not exist; the formal value \\(-2\\) is meaningless.",
      },
      practiceSet: [
        {
          prompt: "Is \\(\\int_0^{\\pi/2}\\cot x\\,dx\\) finite?",
          answer: "No — \\(\\cot x \\to \\infty\\) at \\(0\\) and \\(\\int\\cot x = \\log\\sin x \\to -\\infty\\).",
        },
        {
          prompt: "Sign check: can \\(\\int_{-\\pi/4}^{\\pi/4}\\csc^4x\\,dx\\) be negative?",
          answer: "No — the integrand is positive; a negative value is a formal artefact.",
        },
        {
          prompt: "Where is \\(\\sec^2x\\) undefined?",
          answer: "At odd multiples of \\(\\pi/2\\).",
        },
        {
          prompt: "\\(\\int_{-\\pi/4}^{\\pi/4}\\sec^2x\\,dx = ?\\)",
          answer: "\\(2\\)",
          method: "Finite on the interval; \\([\\tan x]\\).",
        },
      ],
      pyqExampleId: "cae91631-2d9c-4182-bc7c-d59b28b6087e",
      traps: [
        {
          title: "Marking the mathematically honest option",
          body:
            "There is no honest option — the integral diverges and the key is \\(-\\frac83\\). On this paper choose the key; on any paper, a negative value for a positive integrand should make you re-read the interval for a blow-up.",
        },
      ],
    },
  ],
  related: [
    {
      label: "King's Property — the other symmetry, about the midpoint of the interval",
      href: "/notes/mht-cet-maths/definite-integration/cetdi-kings-property",
    },
    {
      label: "Modulus and Greatest-Integer Integrands — splitting when neither parity holds",
      href: "/notes/mht-cet-maths/definite-integration/cetdi-modulus-and-greatest-integer",
    },
  ],
};

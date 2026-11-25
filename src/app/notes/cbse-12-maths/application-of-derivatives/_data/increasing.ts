import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_AD_INCREASING_NOTE: SubtopicNote = {
  subtopicName: "Increasing and Decreasing Functions",
  title: "Increasing and Decreasing Functions",
  oneLineDefinition:
    "When a function is increasing or decreasing, the sign of its derivative, finding the intervals from the points where the derivative is zero, the values of a constant that keep a function increasing, and functions with a gap in the domain.",
  whyItMatters:
    "85 questions, fifty of them from board papers in every year from 2023 to 2026. The board asks you to show that a function is increasing or decreasing on a set (2023 to 2025), to find the intervals in which a function is increasing or decreasing (every year: polynomials, logarithms, x to the power x, fractional powers, and trigonometric and inverse trigonometric functions on part of the interval from 0 to π), the values of a constant such as a, k or λ that keep a function increasing or decreasing on R (2023 to 2025), and the intervals for functions with a gap in the domain such as x + 1/x (2025, 2026). One-mark MCQs ask which interval or which statement is right. The textbook adds Exercise 6.2, its examples, and three Miscellaneous questions and two Miscellaneous examples.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmad-sign",
      name: "Increasing and decreasing: the sign of the derivative",
      intuition:
        "A function is increasing when its graph rises as you move from left to right. The derivative is the slope of the graph, so a positive derivative means the graph is rising and a negative derivative means it is falling. To show a function is increasing on an interval, show that its derivative is positive there, and say why.",
      definition:
        "- **Definition:** on an interval I, f is **increasing** if \\(x_1 < x_2\\) in I gives \\(f(x_1) \\le f(x_2)\\), and **strictly increasing** if it gives \\(f(x_1) < f(x_2)\\). Decreasing and strictly decreasing turn the second inequality round.\n" +
        "- **Theorem 1:** let f be continuous on \\([a, b]\\) and differentiable on \\((a, b)\\). If \\(f'(x) > 0\\) for each x in \\((a, b)\\), f is increasing in \\([a, b]\\); if \\(f'(x) < 0\\), f is decreasing; if \\(f'(x) = 0\\), f is constant.\n" +
        "- The proof uses the Mean Value Theorem: \\(f(x_2) - f(x_1) = f'(c)(x_2 - x_1)\\), and both factors on the right are positive.\n" +
        "- A derivative that is zero only at single points, as \\(3(x - 1)^2\\) is at \\(x = 1\\), still leaves the function increasing.\n" +
        "- **To show \\(f'(x) > 0\\) everywhere:** complete the square, or use \\(e^x > 0\\), \\(x^2 \\ge 0\\) and \\(-1 \\le \\sin x, \\cos x \\le 1\\).\n" +
        "- **On a given interval:** find the sign of each factor of \\(f'(x)\\) there, for example \\(\\cos x > 0\\) on \\(\\left(0, \\dfrac{\\pi}{2}\\right)\\).",
      formula: {
        label: "The sign test",
        latex: "f'(x) > 0 \\text{ on } (a, b) \\;\\Rightarrow\\; f \\text{ is increasing on } [a, b]",
      },
      authoredExample: {
        prompt: "Show that \\(f(x) = x^3 - 6x^2 + 15x + 4\\) is strictly increasing on R.",
        steps: [
          "\\(f'(x) = 3x^2 - 12x + 15 = 3(x^2 - 4x + 5)\\).",
          "Completing the square: \\(x^2 - 4x + 5 = (x - 2)^2 + 1\\).",
          "So \\(f'(x) = 3\\left[(x - 2)^2 + 1\\right]\\).",
          "\\((x - 2)^2 \\ge 0\\) for every real x, so \\(f'(x) \\ge 3 > 0\\) for every real x.",
          "Hence f is strictly increasing on R.",
        ],
        answer: "\\(f'(x) = 3\\left[(x - 2)^2 + 1\\right] > 0\\) for all x, so f is strictly increasing on R",
      },
      selfCheckExample: {
        prompt: "Is \\(f(x) = e^{-2x}\\) increasing or decreasing on R?",
        steps: ["\\(f'(x) = -2e^{-2x}\\), and \\(e^{-2x} > 0\\) for every x, so \\(f'(x) < 0\\)."],
        answer: "Strictly decreasing on R",
      },
      practiceSet: [
        {
          prompt: "Show that \\(f(x) = 5x - 7\\) is strictly increasing on R.",
          answer: "\\(f'(x) = 5 > 0\\) for every x",
        },
        {
          prompt: "Show that \\(f(x) = \\tan x\\) is strictly increasing on \\(\\left(-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right)\\).",
          answer: "\\(f'(x) = \\sec^2 x > 0\\) at every point of the interval",
        },
        {
          prompt: "Show that \\(f(x) = x^3 + 2x\\) is strictly increasing on R.",
          answer: "\\(f'(x) = 3x^2 + 2 \\ge 2 > 0\\), since \\(x^2 \\ge 0\\)",
        },
      ],
      pyqExampleId: "74d4bbca-0b20-4214-ad67-76463120b7f6",
      traps: [
        {
          title: "Checking f(x) instead of f′(x)",
          body: "The sign of \\(f(x)\\) says nothing about increasing. A function can be negative and still rising. Find the sign of \\(f'(x)\\).",
        },
        {
          title: "Writing 'f′(x) > 0' with no reason",
          body: "Marks go to the reason: say WHY the derivative is positive (a square is never negative, \\(e^x > 0\\), the cosine is positive in the first quadrant), not just that it is.",
        },
        {
          title: "Slips in a quotient-rule derivative",
          body: "For a function like \\(\\dfrac{4\\sin x}{2 + \\cos x} - x\\), use \\(\\sin^2 x + \\cos^2 x = 1\\) in the numerator, and keep the \\(-1\\) that comes from the \\(-x\\) term before you combine.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmad-intervals",
      name: "Finding the intervals: where the derivative is zero, and its sign",
      intuition:
        "The derivative can change sign only where it is zero (or not defined). Those points cut the domain into pieces. On each piece the derivative keeps one sign, so the function is increasing on some pieces and decreasing on others. Your job is to find the cutting points and the sign on each piece.",
      definition:
        "- **Step 1:** find \\(f'(x)\\) and factorise it.\n" +
        "- **Step 2:** solve \\(f'(x) = 0\\). These points divide the domain, or the interval given, into disjoint intervals.\n" +
        "- **Step 3:** find the sign of \\(f'(x)\\) on each interval, from the sign of each factor or by testing one point inside. In the answer, say it in words: 'on \\((-\\infty, 1)\\) both factors are negative, so \\(f'(x) > 0\\)'.\n" +
        "- **Step 4:** f is increasing where \\(f'(x) > 0\\) and decreasing where \\(f'(x) < 0\\). Write each interval separately.\n" +
        "- A square factor such as \\((x + 1)^2\\) never changes sign, so it does not split an interval.\n" +
        "- For \\(\\log x\\), \\(x^x\\) or fractional powers, write the domain first (\\(x > 0\\)); every interval in the answer must lie inside it.\n" +
        "- For trigonometric functions on part of \\((0, \\pi)\\), combine terms: \\(\\cos x - \\sin x = \\sqrt{2}\\cos\\left(x + \\dfrac{\\pi}{4}\\right)\\), then read the sign from the angle.",
      authoredExample: {
        prompt:
          "Find the intervals in which \\(f(x) = 2x^3 - 9x^2 + 12x + 5\\) is (a) strictly increasing (b) strictly decreasing.",
        steps: [
          "\\(f'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x - 1)(x - 2)\\).",
          "\\(f'(x) = 0\\) gives \\(x = 1\\) and \\(x = 2\\), which divide the real line into \\((-\\infty, 1)\\), \\((1, 2)\\) and \\((2, \\infty)\\).",
          "On \\((-\\infty, 1)\\): \\(x - 1 < 0\\) and \\(x - 2 < 0\\), so \\(f'(x) > 0\\).",
          "On \\((1, 2)\\): \\(x - 1 > 0\\) and \\(x - 2 < 0\\), so \\(f'(x) < 0\\).",
          "On \\((2, \\infty)\\): both factors are positive, so \\(f'(x) > 0\\).",
          "Hence f is strictly increasing on \\((-\\infty, 1)\\) and \\((2, \\infty)\\), and strictly decreasing on \\((1, 2)\\).",
        ],
        answer: "(a) \\((-\\infty, 1)\\) and \\((2, \\infty)\\) (b) \\((1, 2)\\)",
      },
      selfCheckExample: {
        prompt: "Find the intervals in which \\(f(x) = xe^{-x}\\) is increasing and decreasing.",
        steps: [
          "\\(f'(x) = e^{-x} - xe^{-x} = (1 - x)e^{-x}\\), and \\(e^{-x} > 0\\), so the sign is that of \\(1 - x\\).",
        ],
        answer: "Increasing on \\((-\\infty, 1)\\), decreasing on \\((1, \\infty)\\)",
      },
      practiceSet: [
        {
          prompt: "Find the intervals in which \\(f(x) = x^2 - 8x + 3\\) is increasing and decreasing.",
          answer: "\\(f'(x) = 2x - 8\\): decreasing on \\((-\\infty, 4)\\), increasing on \\((4, \\infty)\\)",
        },
        {
          prompt: "Find the intervals in which \\(f(x) = x^4 - 2x^2\\) is strictly increasing.",
          answer: "\\(f'(x) = 4x(x - 1)(x + 1)\\) is positive on \\((-1, 0)\\) and \\((1, \\infty)\\)",
        },
        {
          prompt: "Find the sub-intervals of \\((0, \\pi)\\) in which \\(f(x) = \\sin^2 x\\) is increasing and decreasing.",
          answer: "\\(f'(x) = \\sin 2x\\): increasing on \\(\\left(0, \\dfrac{\\pi}{2}\\right)\\), decreasing on \\(\\left(\\dfrac{\\pi}{2}, \\pi\\right)\\)",
        },
      ],
      pyqExampleId: "adbd9d4a-497f-4652-a4de-d585d14da2e4",
      traps: [
        {
          title: "Joining two intervals into one",
          body: "If f is increasing on \\((-\\infty, 1)\\) and on \\((2, \\infty)\\), write them as two intervals. f decreases in between, so it is not increasing on one interval that covers both.",
        },
        {
          title: "Forgetting the domain",
          body: "\\(\\log x\\), \\(x^x\\) and \\(x^{3/2}\\) exist only for \\(x > 0\\). An interval such as \\((-\\infty, 0)\\) cannot be part of the answer.",
        },
        {
          title: "Letting a squared factor split the line",
          body: "In \\(f'(x) = 4x^2(x - 3)\\) the factor \\(4x^2\\) is never negative. The sign changes only at \\(x = 3\\); at \\(x = 0\\) the derivative is zero for a moment and f goes on decreasing through it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmad-param",
      name: "A constant that keeps a function increasing or decreasing",
      intuition:
        "When a function carries an unknown constant such as a, k or λ, the question asks which values of the constant make the derivative keep one sign everywhere. The derivative usually has a part that swings between a least and a greatest value. The constant must win against that part even at its worst.",
      definition:
        "- Increasing on a set: \\(f'(x) \\ge 0\\) at every point of it, zero only at single points. Decreasing: \\(f'(x) \\le 0\\).\n" +
        "- Write the condition as 'constant compared with a function of x', for example \\(k \\ge \\cos x\\) for every x.\n" +
        "- **\\(k \\ge g(x)\\) for every x** means k is at least the GREATEST value of \\(g(x)\\). **\\(k \\le g(x)\\) for every x** means k is at most its LEAST value.\n" +
        "- Use \\(-1 \\le \\sin x, \\cos x \\le 1\\). Combine two terms into one: \\(\\sin x + \\cos x = \\sqrt{2}\\sin\\left(x + \\dfrac{\\pi}{4}\\right)\\), and \\(\\sqrt{3}\\cos x + \\sin x = 2\\sin\\left(x + \\dfrac{\\pi}{3}\\right)\\), so these lie between \\(-\\sqrt{2}\\) and \\(\\sqrt{2}\\), and between \\(-2\\) and 2.\n" +
        "- **On a closed interval** such as \\([1, 2]\\), with \\(f'\\) linear, the least value of \\(f'\\) is at an end point: make that value \\(\\ge 0\\).\n" +
        "- At the boundary value of the constant, \\(f'\\) is zero only at single points, so that value is included.",
      formula: {
        label: "Combining sine and cosine",
        latex: "\\sin x + \\cos x = \\sqrt{2}\\,\\sin\\left(x + \\dfrac{\\pi}{4}\\right)",
      },
      authoredExample: {
        prompt: "Find the values of p for which \\(f(x) = px - 2\\sin x + 3\\) is increasing on R.",
        steps: [
          "\\(f'(x) = p - 2\\cos x\\).",
          "f is increasing on R when \\(f'(x) \\ge 0\\) for every x, that is \\(p \\ge 2\\cos x\\) for every x.",
          "The greatest value of \\(2\\cos x\\) is 2, taken at \\(x = 0\\).",
          "So the condition holds for every x exactly when \\(p \\ge 2\\).",
          "At \\(p = 2\\), \\(f'(x) = 2(1 - \\cos x)\\) is zero only at single points, so \\(p = 2\\) is included.",
        ],
        answer: "\\(p \\ge 2\\), that is \\(p \\in [2, \\infty)\\)",
      },
      selfCheckExample: {
        prompt: "For what values of a is \\(f(x) = x^2 + 2ax + 5\\) increasing on \\([1, 3]\\)?",
        steps: [
          "\\(f'(x) = 2x + 2a\\) is least at \\(x = 1\\), where it is \\(2 + 2a\\).",
          "Need \\(2 + 2a \\ge 0\\).",
        ],
        answer: "\\(a \\ge -1\\)",
      },
      practiceSet: [
        {
          prompt: "Find the values of b for which \\(f(x) = bx + \\cos x\\) is decreasing on R.",
          answer: "\\(f'(x) = b - \\sin x \\le 0\\) for every x needs b at most the least value of \\(\\sin x\\): \\(b \\le -1\\)",
        },
        {
          prompt: "For which values of a is \\(f(x) = a(x + \\sin x)\\) strictly increasing on R?",
          answer: "\\(f'(x) = a(1 + \\cos x)\\) and \\(1 + \\cos x \\ge 0\\), so \\(a > 0\\) (\\(a = 0\\) gives a constant function)",
        },
        {
          prompt: "Find the greatest value of k for which \\(f(x) = x^2 - kx\\) is increasing on \\([1, 4]\\).",
          answer: "\\(f'(x) = 2x - k\\) is least at \\(x = 1\\): \\(2 - k \\ge 0\\), so \\(k \\le 2\\) and the greatest value is 2",
        },
      ],
      pyqExampleId: "29721129-4f38-4eb6-a02e-e3647333ef49",
      traps: [
        {
          title: "Using the wrong extreme value",
          body: "\\(k \\ge \\cos x\\) for EVERY x needs k to beat the greatest value of \\(\\cos x\\), which is 1. Using the least value, \\(-1\\), lets in values of k that fail near \\(x = 0\\).",
        },
        {
          title: "Taking 2 or 1 as the greatest value of sin x + cos x",
          body: "Each term is at most 1, but they are never 1 together. Combine them into \\(\\sqrt{2}\\sin\\left(x + \\dfrac{\\pi}{4}\\right)\\): the greatest value is \\(\\sqrt{2}\\).",
        },
        {
          title: "A least value that does not exist",
          body: "If every \\(a \\le 8\\) makes a function increasing, there is no least value of a, only a greatest value, 8. Read 'least' or 'greatest' with care, and say plainly when one of them does not exist.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmad-break",
      name: "Functions with a gap in the domain",
      intuition:
        "Functions such as \\(x + \\dfrac{1}{x}\\) or \\(\\dfrac{x - 3}{x + 1}\\) are not defined at one point, and the graph breaks there. Read the sign of the derivative on each side of the break, and give the answer piece by piece.",
      definition:
        "- Write the domain first: \\(R - \\{0\\}\\) for \\(\\dfrac{1}{x}\\), \\(R - \\{-1\\}\\) for \\(\\dfrac{x - 3}{x + 1}\\).\n" +
        "- The points that cut the line are the zeros of \\(f'\\) AND the point left out of the domain.\n" +
        "- For a linear fraction, \\(f'(x) = \\dfrac{ad - bc}{(cx + d)^2}\\) has the same sign everywhere, so f is increasing (or decreasing) on each of the two intervals.\n" +
        "- For \\(x + \\dfrac{k^2}{x}\\) with \\(k > 0\\): \\(f'(x) = \\dfrac{x^2 - k^2}{x^2}\\), positive for \\(|x| > k\\) and negative for \\(0 < |x| < k\\).\n" +
        "- Give the answer as separate intervals, such as \\((-\\infty, -k)\\) and \\((k, \\infty)\\). A claim that f increases across the gap needs a check of its own.",
      formula: {
        label: "Derivative of a linear fraction",
        latex: "\\dfrac{d}{dx}\\left(\\dfrac{ax + b}{cx + d}\\right) = \\dfrac{ad - bc}{(cx + d)^2}",
      },
      authoredExample: {
        prompt:
          "Find the intervals in which \\(f(x) = \\dfrac{2x + 1}{x - 3}\\), \\(x \\neq 3\\), is increasing or decreasing.",
        steps: [
          "The domain is \\(R - \\{3\\}\\), that is \\((-\\infty, 3)\\) and \\((3, \\infty)\\).",
          "By the quotient rule, \\(f'(x) = \\dfrac{2(x - 3) - (2x + 1)}{(x - 3)^2} = \\dfrac{-7}{(x - 3)^2}\\).",
          "The numerator is \\(-7\\) and the denominator is a square, positive for every \\(x \\neq 3\\). So \\(f'(x) < 0\\) at every point of the domain.",
          "Hence f is decreasing on \\((-\\infty, 3)\\) and on \\((3, \\infty)\\), and increasing for no value of x.",
        ],
        answer: "Decreasing on \\((-\\infty, 3)\\) and on \\((3, \\infty)\\)",
      },
      selfCheckExample: {
        prompt: "Find the intervals in which \\(f(x) = x^2 + \\dfrac{2}{x}\\), \\(x \\neq 0\\), is increasing and decreasing.",
        steps: [
          "\\(f'(x) = 2x - \\dfrac{2}{x^2} = \\dfrac{2(x^3 - 1)}{x^2}\\), with the sign of \\(x^3 - 1\\).",
          "The cutting points are \\(x = 0\\) (left out) and \\(x = 1\\).",
        ],
        answer: "Decreasing on \\((-\\infty, 0)\\) and \\((0, 1)\\); increasing on \\((1, \\infty)\\)",
      },
      practiceSet: [
        {
          prompt: "Is \\(f(x) = \\dfrac{1}{x}\\) increasing or decreasing on its domain?",
          answer: "\\(f'(x) = -\\dfrac{1}{x^2} < 0\\): decreasing on \\((-\\infty, 0)\\) and on \\((0, \\infty)\\), each separately",
        },
        {
          prompt: "Find the intervals in which \\(f(x) = \\dfrac{x + 2}{x - 1}\\), \\(x \\neq 1\\), is decreasing.",
          answer: "\\(f'(x) = \\dfrac{-3}{(x - 1)^2} < 0\\): decreasing on \\((-\\infty, 1)\\) and on \\((1, \\infty)\\)",
        },
        {
          prompt: "Find the intervals in which \\(f(x) = 4x + \\dfrac{1}{x}\\) is strictly decreasing.",
          answer: "\\(f'(x) = \\dfrac{(2x - 1)(2x + 1)}{x^2} < 0\\) on \\(\\left(-\\dfrac{1}{2}, 0\\right)\\) and \\(\\left(0, \\dfrac{1}{2}\\right)\\)",
        },
      ],
      pyqExampleId: "9a3f9908-ad64-401f-8716-2d0edfe7f786",
      traps: [
        {
          title: "Writing one interval through the gap",
          body: "\\(\\dfrac{6}{x}\\) is decreasing on each side of 0, yet \\(-3 < 2\\) and \\(\\dfrac{6}{-3} = -2 < 3 = \\dfrac{6}{2}\\). So it is not decreasing on \\(R - \\{0\\}\\) taken as a whole. Give the two intervals separately.",
        },
        {
          title: "Missing the point left out of the domain",
          body: "The point where f is not defined also cuts the line, even though \\(f'\\) is not zero there. List it with the zeros of \\(f'\\) before you test the signs.",
        },
        {
          title: "Stopping at the sign of f′",
          body: "When \\(f'\\) has one sign everywhere, still name the intervals: 'increasing on \\((-\\infty, -1)\\) and on \\((-1, \\infty)\\); decreasing for no value of x'. The question asks for values of x.",
        },
      ],
    },
  ],
};

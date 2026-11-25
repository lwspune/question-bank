import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_AD_ABSOLUTE_NOTE: SubtopicNote = {
  subtopicName: "Absolute Maximum and Minimum on a Closed Interval",
  title: "Absolute Maximum and Minimum on a Closed Interval",
  oneLineDefinition:
    "The greatest and least values of a function on a closed interval, found by comparing its values at the critical points inside the interval and at the two end points.",
  whyItMatters:
    "22 questions, nine of them from board papers from 2024 to 2026. The board asks for the absolute maximum and minimum of a polynomial, of x/2 + 2/x, or of a function with fractional powers on a closed interval (2024, 2025), the absolute maximum of cos x + sin² x on [0, π] (2026), and one-mark MCQs on the greatest or least value of a simple function on an interval (2025, 2026), where the answer is often at an end point. The textbook adds Examples 27 and 28 and the closed-interval questions of Exercise 6.3 and the Miscellaneous Exercise.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmad-closed",
      name: "The working rule on a closed interval",
      intuition:
        "On a closed interval the graph has a left end and a right end. Its highest point is either at the top of a hill inside the interval or at one of the two ends, and the same is true of its lowest point. So list those few points, work out f at each, and pick the greatest and the least. No second derivative is needed: comparing the values decides it.",
      definition:
        "- **Theorem 5:** a function continuous on \\([a, b]\\) has an absolute maximum value and an absolute minimum value, and takes each at least once in \\([a, b]\\).\n" +
        "- **Step 1:** find all critical points of f in the interval: points where \\(f'(x) = 0\\) or f is not differentiable.\n" +
        "- **Step 2:** take the end points a and b.\n" +
        "- **Step 3:** work out f at all these points.\n" +
        "- **Step 4:** the greatest of these values is the **absolute maximum** (greatest) value, and the least is the **absolute minimum** (least) value.\n" +
        "- Leave out a critical point that lies outside the interval.\n" +
        "- The absolute maximum value can differ from a local maximum value, and the same value may be taken at more than one point.",
      formula: {
        label: "Absolute maximum on [a, b]",
        latex: "\\text{greatest of } f(a),\\ f(b),\\ f(c_1),\\ f(c_2),\\ \\dots",
        symbols: [
          { symbol: "\\(a, b\\)", meaning: "the end points of the interval" },
          { symbol: "\\(c_1, c_2, \\dots\\)", meaning: "the critical points inside the interval" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the absolute maximum and absolute minimum values of \\(f(x) = x^3 - 6x^2 + 9x + 2\\) on \\([0, 4]\\).",
        steps: [
          "f is a polynomial, so it is continuous on \\([0, 4]\\).",
          "\\(f'(x) = 3x^2 - 12x + 9 = 3(x - 1)(x - 3)\\), so the critical points are \\(x = 1\\) and \\(x = 3\\), both in \\([0, 4]\\).",
          "\\(f(0) = 2\\).",
          "\\(f(1) = 1 - 6 + 9 + 2 = 6\\).",
          "\\(f(3) = 27 - 54 + 27 + 2 = 2\\).",
          "\\(f(4) = 64 - 96 + 36 + 2 = 6\\).",
          "The greatest of these is 6 and the least is 2.",
        ],
        answer: "Absolute maximum value 6, at \\(x = 1\\) and \\(x = 4\\); absolute minimum value 2, at \\(x = 0\\) and \\(x = 3\\)",
      },
      selfCheckExample: {
        prompt: "Find the absolute maximum and minimum values of \\(f(x) = x^2 - 4x + 1\\) on \\([0, 3]\\).",
        steps: ["\\(f'(x) = 2x - 4 = 0\\) at \\(x = 2\\). \\(f(0) = 1\\), \\(f(2) = -3\\), \\(f(3) = -2\\)."],
        answer: "Absolute maximum 1 at \\(x = 0\\); absolute minimum \\(-3\\) at \\(x = 2\\)",
      },
      practiceSet: [
        {
          prompt: "Find the absolute maximum and minimum values of \\(f(x) = 2x^3 - 6x\\) on \\([0, 2]\\).",
          answer: "Critical point \\(x = 1\\): \\(f(0) = 0\\), \\(f(1) = -4\\), \\(f(2) = 4\\). Maximum 4, minimum \\(-4\\)",
        },
        {
          prompt: "Find the absolute maximum value of \\(f(x) = x + \\dfrac{9}{x}\\) on \\([1, 6]\\).",
          answer: "Critical point \\(x = 3\\): \\(f(1) = 10\\), \\(f(3) = 6\\), \\(f(6) = 7.5\\). Maximum 10, at \\(x = 1\\)",
        },
        {
          prompt: "Find the absolute maximum and minimum values of \\(f(x) = x^{2/3}\\) on \\([-1, 8]\\).",
          answer: "\\(f'(x) = \\dfrac{2}{3x^{1/3}}\\) is not defined at 0, a critical point. \\(f(-1) = 1\\), \\(f(0) = 0\\), \\(f(8) = 4\\): maximum 4, minimum 0",
        },
      ],
      pyqExampleId: "92c7976d-ad63-4989-aaf0-8523a07aea55",
      traps: [
        {
          title: "Leaving out the end points",
          body: "The greatest or least value is often at an end point. Always work out \\(f(a)\\) and \\(f(b)\\), even when the critical points look like the answer.",
        },
        {
          title: "Using a critical point outside the interval",
          body: "For \\(\\dfrac{x}{2} + \\dfrac{2}{x}\\) on \\([1, 2]\\), the root \\(x = -2\\) of \\(f'(x) = 0\\) does not count. Check that each critical point is inside the interval before you use it.",
        },
        {
          title: "Missing a point where f′ is not defined",
          body: "For powers such as \\(x^{1/3}\\) or \\(x^{2/3}\\), \\(f'\\) is not defined at 0. If 0 is inside the interval, it is a critical point and its value must be compared.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmad-trig",
      name: "Trigonometric functions on a closed interval",
      intuition:
        "The working rule is the same, but the critical points come from a trigonometric equation, which can have several solutions in the interval. Factorise the derivative, solve each factor, keep every solution that lies in the interval, and compare the exact values.",
      definition:
        "- Differentiate and factorise: \\(\\sin x(2\\cos x + 1) = 0\\) means \\(\\sin x = 0\\) OR \\(\\cos x = -\\dfrac{1}{2}\\).\n" +
        "- List every solution inside the interval. On \\([0, \\pi]\\), \\(\\sin x = 0\\) at both end points, and \\(\\cos x = -\\dfrac{1}{2}\\) only at \\(\\dfrac{2\\pi}{3}\\).\n" +
        "- If the angle is 2x, it runs over an interval twice as long: for x in \\([0, 2\\pi]\\), 2x runs over \\([0, 4\\pi]\\).\n" +
        "- A substitution can help: with \\(t = \\sin x\\), \\(\\cos^2 x + \\sin x = 1 + t - t^2\\), and t runs over the values that \\(\\sin x\\) takes on the interval.\n" +
        "- Compare exact values. Change \\(\\pi\\) or a surd into a decimal only on the side, to decide which is bigger.",
      formula: {
        label: "Values used most often",
        latex: "\\sin\\dfrac{\\pi}{6} = \\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2},\\qquad \\sin\\dfrac{\\pi}{4} = \\cos\\dfrac{\\pi}{4} = \\dfrac{1}{\\sqrt{2}}",
      },
      authoredExample: {
        prompt: "Find the absolute maximum and minimum values of \\(f(x) = 2\\sin x + \\cos 2x\\) on \\([0, \\pi]\\).",
        steps: [
          "\\(f'(x) = 2\\cos x - 2\\sin 2x = 2\\cos x - 4\\sin x\\cos x = 2\\cos x(1 - 2\\sin x)\\).",
          "\\(\\cos x = 0\\) gives \\(x = \\dfrac{\\pi}{2}\\); \\(\\sin x = \\dfrac{1}{2}\\) gives \\(x = \\dfrac{\\pi}{6}\\) and \\(x = \\dfrac{5\\pi}{6}\\).",
          "\\(f(0) = 0 + 1 = 1\\) and \\(f(\\pi) = 0 + 1 = 1\\).",
          "\\(f\\left(\\dfrac{\\pi}{6}\\right) = 2\\left(\\dfrac{1}{2}\\right) + \\cos\\dfrac{\\pi}{3} = 1 + \\dfrac{1}{2} = \\dfrac{3}{2}\\), and in the same way \\(f\\left(\\dfrac{5\\pi}{6}\\right) = \\dfrac{3}{2}\\).",
          "\\(f\\left(\\dfrac{\\pi}{2}\\right) = 2 + \\cos\\pi = 1\\).",
          "The greatest value is \\(\\dfrac{3}{2}\\) and the least is 1.",
        ],
        answer: "Absolute maximum \\(\\dfrac{3}{2}\\) at \\(x = \\dfrac{\\pi}{6}\\) and \\(\\dfrac{5\\pi}{6}\\); absolute minimum 1 at \\(x = 0\\), \\(\\dfrac{\\pi}{2}\\) and \\(\\pi\\)",
      },
      selfCheckExample: {
        prompt: "Find the absolute maximum and minimum values of \\(f(x) = \\sin x - \\cos x\\) on \\([0, \\pi]\\).",
        steps: [
          "\\(f'(x) = \\cos x + \\sin x = 0\\) gives \\(\\tan x = -1\\), so \\(x = \\dfrac{3\\pi}{4}\\).",
          "\\(f(0) = -1\\), \\(f\\left(\\dfrac{3\\pi}{4}\\right) = \\sqrt{2}\\), \\(f(\\pi) = 1\\).",
        ],
        answer: "Maximum \\(\\sqrt{2}\\), minimum \\(-1\\)",
      },
      practiceSet: [
        {
          prompt: "At what point of \\([0, \\pi]\\) does \\(\\cos 2x\\) take its least value?",
          answer: "At \\(x = \\dfrac{\\pi}{2}\\), where \\(2x = \\pi\\); the least value is \\(-1\\)",
        },
        {
          prompt: "Find the greatest value of \\(\\sin 2x\\) on \\(\\left[0, \\dfrac{\\pi}{2}\\right]\\) and where it is taken.",
          answer: "1, at \\(x = \\dfrac{\\pi}{4}\\)",
        },
        {
          prompt: "Find the absolute maximum and minimum values of \\(f(x) = x - 2\\sin x\\) on \\([0, \\pi]\\).",
          answer: "\\(f'(x) = 1 - 2\\cos x = 0\\) at \\(x = \\dfrac{\\pi}{3}\\). \\(f(0) = 0\\), \\(f\\left(\\dfrac{\\pi}{3}\\right) = \\dfrac{\\pi}{3} - \\sqrt{3}\\), \\(f(\\pi) = \\pi\\): maximum \\(\\pi\\), minimum \\(\\dfrac{\\pi}{3} - \\sqrt{3}\\)",
        },
      ],
      pyqExampleId: "0ff79209-7514-48c5-9f05-f9edb2fd2983",
      traps: [
        {
          title: "Solving only one factor",
          body: "\\(\\cos x(1 - 2\\sin x) = 0\\) has TWO factors. Solve both, and list every solution in the interval.",
        },
        {
          title: "Comparing surds by guesswork",
          body: "To see that \\(\\dfrac{\\pi}{3} - \\sqrt{3}\\) is negative, use \\(\\pi \\approx 3.14\\) and \\(\\sqrt{3} \\approx 1.73\\) on the side, but give the exact value in the answer.",
        },
        {
          title: "The wrong interval for 2x",
          body: "On \\([0, 2\\pi]\\), \\(\\sin 2x = 1\\) at \\(x = \\dfrac{\\pi}{4}\\) AND at \\(x = \\dfrac{5\\pi}{4}\\). Let 2x run over \\([0, 4\\pi]\\) to catch both.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmad-endpoints",
      name: "When the answer is at an end point",
      intuition:
        "If the derivative keeps one sign over the whole interval, the function only rises (or only falls) there, so its greatest and least values sit at the two ends. And when the only critical point inside is a minimum, as for an upward parabola, the maximum has to be at an end.",
      definition:
        "- A monotonic function on \\([a, b]\\) takes its maximum and minimum values at the end points.\n" +
        "- If \\(f'(x) > 0\\) on \\((a, b)\\), the least value is \\(f(a)\\) and the greatest is \\(f(b)\\). If \\(f'(x) < 0\\), the greatest is \\(f(a)\\) and the least is \\(f(b)\\).\n" +
        "- For \\(k(x - p)^2 + q\\) with \\(k > 0\\): if p is in the interval, the least value is q, at \\(x = p\\); the greatest value is at the end point farther from p.\n" +
        "- In an MCQ, work out f at both end points and at any critical point inside, then compare. A common wrong option is the value at the other end.\n" +
        "- The absolute minimum value can never be larger than the absolute maximum value: if yours are the other way round, the labels are swapped.",
      formula: {
        label: "An increasing function on a closed interval",
        latex: "f'(x) > 0 \\text{ on } (a, b) \\;\\Rightarrow\\; \\text{least value} = f(a),\\ \\text{greatest value} = f(b)",
      },
      authoredExample: {
        prompt: "Find the greatest and least values of \\(f(x) = x^3 + 3x - 5\\) on \\([-1, 2]\\).",
        steps: [
          "\\(f'(x) = 3x^2 + 3 = 3(x^2 + 1) > 0\\) for every x, so f has no critical point and is increasing on \\([-1, 2]\\).",
          "So the least value is at the left end and the greatest at the right end.",
          "\\(f(-1) = -1 - 3 - 5 = -9\\).",
          "\\(f(2) = 8 + 6 - 5 = 9\\).",
        ],
        answer: "Least value \\(-9\\) at \\(x = -1\\); greatest value 9 at \\(x = 2\\)",
      },
      selfCheckExample: {
        prompt: "Find the least and greatest values of \\(f(x) = \\log x\\) on \\([1, e]\\).",
        steps: ["\\(f'(x) = \\dfrac{1}{x} > 0\\), so f is increasing: compare \\(f(1)\\) and \\(f(e)\\)."],
        answer: "Least value 0 at \\(x = 1\\); greatest value 1 at \\(x = e\\)",
      },
      practiceSet: [
        {
          prompt: "Find the absolute maximum and minimum values of \\(f(x) = (x + 1)^2 - 2\\) on \\([-2, 3]\\).",
          answer: "Least value \\(-2\\) at \\(x = -1\\); \\(f(-2) = -1\\), \\(f(3) = 14\\), so the greatest value is 14 at \\(x = 3\\)",
        },
        {
          prompt: "Find the greatest and least values of \\(f(x) = 4 - 3x\\) on \\([0, 2]\\).",
          answer: "\\(f'(x) = -3 < 0\\): greatest \\(f(0) = 4\\), least \\(f(2) = -2\\)",
        },
        {
          prompt: "Find the greatest value of \\(f(x) = x^2 - x + 3\\) on \\([0, 1]\\).",
          answer: "The critical point \\(x = \\dfrac{1}{2}\\) gives the least value \\(\\dfrac{11}{4}\\); \\(f(0) = f(1) = 3\\), so the greatest value is 3, at both ends",
        },
      ],
      pyqExampleId: "2f1398eb-5a05-4f66-a201-4a78e3937c0c",
      traps: [
        {
          title: "Taking the critical point as the maximum",
          body: "For an upward parabola the critical point inside the interval gives the LEAST value. The greatest value is then at one of the ends: compare both.",
        },
        {
          title: "Checking only the nearer end",
          body: "On \\([-4, 1]\\), \\((x + 1)^2 - 2\\) is greatest at \\(x = -4\\), the end farther from \\(x = -1\\): \\(f(-4) = 7\\), while \\(f(1) = 2\\).",
        },
        {
          title: "Swapped labels",
          body: "If your 'minimum' comes out larger than your 'maximum', you have swapped the labels. Re-read which value belongs to which point before you write the answer.",
        },
      ],
    },
  ],
};

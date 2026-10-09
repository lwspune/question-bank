import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_TRG_GRAPHS_EQUATIONS_NOTE: SubtopicNote = {
  subtopicName: "Trigonometric Graphs and Equations",
  title: "Graphs, Equations and the Sine and Cosine Rules",
  oneLineDefinition:
    "Sine and cosine are waves between minus 1 and 1 that repeat every 360°; equations in them have several solutions in a range, and the sine and cosine rules solve any triangle.",
  whyItMatters:
    "The 2023 paper asked how many solutions a trigonometric equation has in a given range, and 2025 asked which inequality in sin x or cos x holds for every real x. The sine and cosine rules have not been asked yet but are on the syllabus.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-trg-graphs-periods",
      name: "Graphs of sine, cosine and tangent: period and amplitude",
      intuition:
        "As the point goes round the unit circle again and again, its height traces the sine wave and its x-coordinate traces the cosine wave. After one full turn everything repeats, so the period is 360°. Multiplying the angle by \\(b\\) makes the point go round \\(b\\) times faster, so the wave repeats \\(b\\) times as often.",
      definition:
        "- \\(y = \\sin x\\) and \\(y = \\cos x\\): waves between \\(-1\\) and \\(1\\), **period** \\(360^\\circ\\) (\\(2\\pi\\)). \\(\\sin x\\) starts at 0; \\(\\cos x\\) starts at its maximum 1.\n" +
        "- \\(y = \\tan x\\): period \\(180^\\circ\\), takes every real value, and has vertical asymptotes at \\(x = 90^\\circ, 270^\\circ, \\ldots\\)\n" +
        "- For \\(y = a\\sin(bx) + c\\) (with \\(b > 0\\)), and the same for cosine: the **amplitude** is \\(|a|\\), the period is \\(360^\\circ / b\\), the **midline** is \\(y = c\\), and the values run from \\(c - |a|\\) to \\(c + |a|\\).",
      formula: {
        label: "Period and amplitude",
        latex: "y = a\\sin(bx) + c: \\quad \\text{amplitude } |a|, \\quad \\text{period } \\frac{360^\\circ}{b}",
      },
      authoredExample: {
        prompt: "For \\(y = 3\\sin(2x) + 1\\), find the amplitude, the period and the greatest and least values.",
        steps: [
          "Amplitude \\(|a| = 3\\).",
          "Period \\(360^\\circ / 2 = 180^\\circ\\).",
          "\\(\\sin(2x)\\) runs from \\(-1\\) to \\(1\\), so \\(y\\) runs from \\(-3 + 1 = -2\\) to \\(3 + 1 = 4\\).",
        ],
        answer: "Amplitude 3, period \\(180^\\circ\\), greatest 4, least \\(-2\\)",
      },
      selfCheckExample: {
        prompt: "What are the period and the set of values of \\(y = 2\\cos\\left(\\dfrac{x}{3}\\right) - 5\\)?",
        options: [
          "Period \\(120^\\circ\\); values from \\(-7\\) to \\(-3\\)",
          "Period \\(1080^\\circ\\); values from \\(-7\\) to \\(-3\\)",
          "Period \\(1080^\\circ\\); values from \\(-2\\) to \\(2\\)",
          "Period \\(360^\\circ\\); values from \\(-7\\) to \\(-3\\)",
          "Period \\(120^\\circ\\); values from \\(-5\\) to \\(2\\)",
        ],
        steps: [
          "Here \\(b = \\tfrac{1}{3}\\), so the period is \\(360^\\circ \\div \\tfrac{1}{3} = 1080^\\circ\\): the wave is stretched, not squeezed.",
          "The cosine part runs from \\(-2\\) to \\(2\\); subtracting 5 gives \\(-7\\) to \\(-3\\).",
          "A divides 360° by 3 instead of multiplying; C forgets the \\(-5\\); D ignores the \\(x/3\\).",
        ],
        answer: "(B) Period \\(1080^\\circ\\); values from \\(-7\\) to \\(-3\\)",
      },
      practiceSet: [
        { prompt: "Period of \\(y = \\sin(4x)\\)?", answer: "\\(90^\\circ\\)" },
        { prompt: "Greatest value of \\(y = 5 - 2\\sin x\\)?", answer: "7", method: "When \\(\\sin x = -1\\)" },
        { prompt: "Period of \\(y = \\tan(2x)\\)?", answer: "\\(90^\\circ\\)", method: "\\(180^\\circ / 2\\)" },
        { prompt: "Amplitude of \\(y = -4\\cos x\\)?", answer: "4", method: "Amplitude is \\(|a|\\)" },
      ],
      traps: [
        {
          title: "The period of sin(bx) is 360° divided by b",
          body: "A larger \\(b\\) means faster repetition and a shorter period: \\(\\sin(3x)\\) has period \\(120^\\circ\\), not \\(1080^\\circ\\). The amplitude is \\(|a|\\), a positive number, even when \\(a\\) is negative.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-trg-equations",
      name: "Solving trigonometric equations in a given range",
      intuition:
        "A wave crosses any horizontal line between its lowest and highest values twice in every period, so an equation like \\(\\sin x = k\\) usually has two solutions per turn. Find one angle from the exact values, use the symmetry of the wave for the second, then add whole periods until you leave the range. If the line is outside \\(-1\\) to \\(1\\) there are no solutions at all.",
      definition:
        "- **Sine**: \\(\\sin x = k\\) gives \\(x = \\alpha\\) and \\(x = 180^\\circ - \\alpha\\), plus multiples of \\(360^\\circ\\).\n" +
        "- **Cosine**: \\(\\cos x = k\\) gives \\(x = \\alpha\\) and \\(x = 360^\\circ - \\alpha\\), plus multiples of \\(360^\\circ\\).\n" +
        "- **Tangent**: \\(\\tan x = k\\) gives \\(x = \\alpha\\) plus multiples of \\(180^\\circ\\).\n" +
        "- **Multiple angles**: for \\(\\sin(bx) = k\\), solve for \\(u = bx\\) over the range multiplied by \\(b\\), then divide by \\(b\\).\n" +
        "- **Quadratic in sin x**: put \\(s = \\sin x\\), solve the quadratic, and reject any root outside \\([-1, 1]\\).\n" +
        "- **Inequality for every x**: with \\(s = \\sin x\\), the expression only needs checking for \\(-1 \\le s \\le 1\\).",
      formula: {
        label: "General solutions",
        latex: "\\sin x = k: \\ x = \\alpha,\\ 180^\\circ - \\alpha \\qquad \\cos x = k: \\ x = \\pm\\alpha \\qquad \\tan x = k: \\ x = \\alpha \\quad (+\\text{whole periods})",
      },
      authoredExample: {
        prompt: "Solve \\(2\\sin^2 x - 3\\sin x + 1 = 0\\) for \\(0^\\circ \\le x \\le 360^\\circ\\).",
        steps: [
          "Let \\(s = \\sin x\\): \\(2s^2 - 3s + 1 = 0\\) factorises as \\((2s - 1)(s - 1) = 0\\), so \\(s = \\tfrac{1}{2}\\) or \\(s = 1\\). Both lie in \\([-1, 1]\\).",
          "\\(\\sin x = \\tfrac{1}{2}\\): \\(x = 30^\\circ\\) or \\(180^\\circ - 30^\\circ = 150^\\circ\\).",
          "\\(\\sin x = 1\\): \\(x = 90^\\circ\\) only (the top of the wave touches the line once).",
          "Adding \\(360^\\circ\\) leaves the range, so there are three solutions.",
        ],
        answer: "\\(x = 30^\\circ, 90^\\circ, 150^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "How many solutions does \\(\\cos(2x) = \\dfrac{1}{2}\\) have for \\(0^\\circ \\le x \\le 360^\\circ\\)?",
        options: ["1", "2", "3", "4", "8"],
        steps: [
          "Let \\(u = 2x\\). Then \\(0^\\circ \\le u \\le 720^\\circ\\): two full turns.",
          "\\(\\cos u = \\tfrac{1}{2}\\) at \\(u = 60^\\circ, 300^\\circ, 420^\\circ, 660^\\circ\\).",
          "So \\(x = 30^\\circ, 150^\\circ, 210^\\circ, 330^\\circ\\): four solutions.",
          "B solves only over \\(0^\\circ\\) to \\(360^\\circ\\) for \\(u\\), forgetting that doubling \\(x\\) doubles the range.",
        ],
        answer: "(D) 4",
      },
      practiceSet: [
        { prompt: "Solve \\(\\tan x = 1\\) for \\(0^\\circ \\le x < 360^\\circ\\).", answer: "\\(45^\\circ, 225^\\circ\\)" },
        { prompt: "How many solutions has \\(\\sin x = 2\\)?", answer: "None", method: "\\(\\sin x\\) never exceeds 1" },
        { prompt: "Solve \\(\\cos x = 0\\) for \\(0^\\circ \\le x \\le 360^\\circ\\).", answer: "\\(90^\\circ, 270^\\circ\\)" },
        {
          prompt: "Is \\(\\sin^2 x + 2\\sin x - 3 \\le 0\\) true for every real \\(x\\)?",
          answer: "Yes",
          method: "\\((s + 3)(s - 1) \\le 0\\) for every \\(s\\) between \\(-1\\) and \\(1\\)",
        },
      ],
      traps: [
        {
          title: "Solve for the whole angle first",
          body: "In \\(\\cos(2x) = k\\) the angle \\(2x\\) runs over twice the range of \\(x\\). Solving for \\(x\\) directly over one turn misses half the solutions; solve for \\(2x\\) over the doubled range, then halve.",
        },
        {
          title: "Throw away values of sin x outside minus 1 to 1",
          body: "A quadratic in \\(\\sin x\\) can have a root such as 2 or \\(-3\\). It gives no angles at all, so do not count it when you count solutions.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-trg-sine-cosine-rules",
      name: "The sine rule and the cosine rule for any triangle",
      intuition:
        "SOH CAH TOA needs a right angle. In any other triangle, the sine rule links each side to the angle facing it, and the cosine rule is Pythagoras with a correction term for an angle that is not 90°. When that angle is 90°, \\(\\cos 90^\\circ = 0\\) and the correction vanishes.",
      definition:
        "In a triangle with sides \\(a, b, c\\) facing angles \\(A, B, C\\):\n" +
        "- **Sine rule**: \\(\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}\\). Use it when you know a side and the angle facing it.\n" +
        "- **Cosine rule**: \\(c^2 = a^2 + b^2 - 2ab\\cos C\\). Use it with two sides and the angle between them, or with all three sides.\n" +
        "- **Area**: \\(\\tfrac{1}{2}ab\\sin C\\), using two sides and the angle between them.\n" +
        "- An obtuse angle has a negative cosine, so the side facing it is longer than Pythagoras alone would give.",
      formula: {
        label: "Sine rule, cosine rule and area",
        latex: "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} \\qquad c^2 = a^2 + b^2 - 2ab\\cos C \\qquad \\text{Area} = \\tfrac{1}{2}ab\\sin C",
      },
      authoredExample: {
        prompt: "A triangle has \\(a = 7\\) cm, \\(b = 8\\) cm and the angle between them \\(C = 60^\\circ\\). Find \\(c\\) and the area.",
        steps: [
          "\\(c^2 = 49 + 64 - 2 \\times 7 \\times 8 \\times \\tfrac{1}{2} = 113 - 56 = 57\\), so \\(c = \\sqrt{57} \\approx 7.55\\) cm.",
          "Area \\(= \\tfrac{1}{2} \\times 7 \\times 8 \\times \\dfrac{\\sqrt{3}}{2} = 14\\sqrt{3} \\approx 24.2\\ \\text{cm}^2\\).",
        ],
        answer: "\\(c = \\sqrt{57} \\approx 7.55\\) cm; area \\(14\\sqrt{3} \\approx 24.2\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "A triangle has sides 3 cm, 5 cm and 7 cm. What is its largest angle?",
        options: ["\\(60^\\circ\\)", "\\(90^\\circ\\)", "\\(135^\\circ\\)", "\\(150^\\circ\\)", "\\(120^\\circ\\)"],
        steps: [
          "The largest angle faces the longest side, 7 cm.",
          "\\(\\cos C = \\dfrac{3^2 + 5^2 - 7^2}{2 \\times 3 \\times 5} = \\dfrac{-15}{30} = -\\dfrac{1}{2}\\), so \\(C = 120^\\circ\\).",
          "A drops the minus sign. B assumes a right angle, but \\(3^2 + 5^2 = 34 \\ne 49\\).",
        ],
        answer: "(E) \\(120^\\circ\\)",
      },
      practiceSet: [
        {
          prompt: "In a triangle \\(a = 10\\), \\(A = 30^\\circ\\) and \\(B = 45^\\circ\\). Find \\(b\\).",
          answer: "\\(10\\sqrt{2} \\approx 14.1\\)",
          method: "\\(b = 10 \\times \\sin 45^\\circ / \\sin 30^\\circ\\)",
        },
        { prompt: "What does the cosine rule become when \\(C = 90^\\circ\\)?", answer: "\\(c^2 = a^2 + b^2\\), Pythagoras" },
        { prompt: "Find the area of a triangle with sides 6 and 10 and an angle of \\(30^\\circ\\) between them.", answer: "15", method: "\\(\\tfrac{1}{2} \\times 6 \\times 10 \\times \\tfrac{1}{2}\\)" },
      ],
      traps: [
        {
          title: "The cosine rule uses the angle between the two sides",
          body: "In \\(c^2 = a^2 + b^2 - 2ab\\cos C\\), the angle \\(C\\) is the one between sides \\(a\\) and \\(b\\), facing side \\(c\\). Using any other angle gives a wrong side, and forgetting the minus sign turns an obtuse angle into an acute one.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TG_IDENTITIES_NOTE: SubtopicNote = {
  subtopicName: "Simplifying and Proving Identities",
  title: "Simplifying and Proving Identities",
  oneLineDefinition:
    "Three Pythagorean identities, used to simplify an expression to one ratio or a number, to spot a false identity, and to remove θ from a pair of equations.",
  whyItMatters:
    "49 questions in the bank, and 18 of them are MODERATE, more than on any earlier page. Nearly every one ends in sin²θ + cos²θ = 1 or one of its two cousins. When the options are expressions in θ, putting in one angle settles most of them faster than the algebra.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctgid-pythag",
      name: "The three Pythagorean identities",
      intuition:
        "Divide Pythagoras, \\(\\text{opp}^2 + \\text{adj}^2 = \\text{hyp}^2\\), by \\(\\text{hyp}^2\\), by \\(\\text{adj}^2\\) or by \\(\\text{opp}^2\\), and you get the three identities. They hold for every angle, which is what makes them identities.",
      definition:
        "- \\(\\sin^2\\theta + \\cos^2\\theta = 1\\), so \\(1 - \\sin^2\\theta = \\cos^2\\theta\\) and \\(1 - \\cos^2\\theta = \\sin^2\\theta\\).\n" +
        "- \\(1 + \\tan^2\\theta = \\sec^2\\theta\\), so \\(\\sec^2\\theta - \\tan^2\\theta = 1\\) and \\(\\frac{1}{1 + \\tan^2\\theta} = \\cos^2\\theta\\).\n" +
        "- \\(1 + \\cot^2\\theta = \\text{cosec}^2\\theta\\), so \\(\\text{cosec}^2\\theta - \\cot^2\\theta = 1\\) and \\(\\frac{1}{1 + \\cot^2\\theta} = \\sin^2\\theta\\).\n" +
        "- **Spotting a false identity, fast:** put θ = 45° (or 0°) into each statement. One angle where it fails proves it false. One angle where it holds proves nothing, so use this only to reject.\n" +
        "- **Square roots:** \\(\\sqrt{1 - \\sin^2\\theta} = \\cos\\theta\\) only when \\(\\cos\\theta \\ge 0\\), which is true for every acute angle.",
      formula: {
        label: "Pythagorean identities",
        latex:
          "\\sin^2\\theta + \\cos^2\\theta = 1 \\qquad 1 + \\tan^2\\theta = \\sec^2\\theta \\qquad 1 + \\cot^2\\theta = \\text{cosec}^2\\theta",
      },
      authoredExample: {
        prompt: "Simplify \\((\\sec^2\\theta - 1)(1 - \\sin^2\\theta)\\).",
        steps: [
          "\\(\\sec^2\\theta - 1 = \\tan^2\\theta\\) and \\(1 - \\sin^2\\theta = \\cos^2\\theta\\).",
          "\\(\\tan^2\\theta \\times \\cos^2\\theta = \\frac{\\sin^2\\theta}{\\cos^2\\theta} \\times \\cos^2\\theta = \\sin^2\\theta\\).",
          "Check at θ = 45°: \\((2 - 1)(1 - \\frac{1}{2}) = \\frac{1}{2} = \\sin^2 45^\\circ\\).",
        ],
        answer: "\\(\\sin^2\\theta\\)",
      },
      selfCheckExample: {
        prompt: "Find the value of \\(\\sin^2\\theta + \\frac{1}{1 + \\tan^2\\theta}\\).",
        steps: [
          "\\(\\frac{1}{1 + \\tan^2\\theta} = \\frac{1}{\\sec^2\\theta} = \\cos^2\\theta\\).",
          "\\(\\sin^2\\theta + \\cos^2\\theta = 1\\).",
        ],
        answer: "1",
      },
      practiceSet: [
        { prompt: "If \\(\\sin\\theta = 0.6\\), what is \\(\\cos^2\\theta\\)?", answer: "\\(1 - 0.36 = 0.64\\)" },
        { prompt: "Write \\(\\frac{1}{1 + \\cot^2\\theta}\\) as a single ratio.", answer: "\\(\\sin^2\\theta\\)" },
        {
          prompt: "Is \\(\\sec^2\\theta + \\tan^2\\theta = 1\\) an identity? Test it at θ = 45°.",
          answer: "No: \\(2 + 1 = 3\\), not 1",
        },
        { prompt: "Simplify \\(\\cos^2\\theta(1 + \\tan^2\\theta)\\).", answer: "\\(\\cos^2\\theta \\sec^2\\theta = 1\\)" },
      ],
      pyqExampleId: "df76d2b6-7c81-4237-8ee4-f5fce80d73af",
      traps: [
        {
          title: "A minus sign that is not an identity",
          body:
            "\\(\\cos^2\\theta - \\sin^2\\theta = 1\\) is false: at 45° the left side is 0. Only the sum of the squares of sin and cos is 1.",
        },
        {
          title: "Moving 1 across with the wrong sign",
          body:
            "From \\(1 + \\tan^2\\theta = \\sec^2\\theta\\), \\(\\tan^2\\theta = \\sec^2\\theta - 1\\), never \\(1 - \\sec^2\\theta\\). The second would make \\(\\tan^2\\theta\\) negative for every angle.",
        },
        {
          title: "One passing angle is not a proof",
          body:
            "A false statement can still hold at one angle: \\(\\sin\\theta = \\cos\\theta\\) is true at 45°. Use a test angle to throw options out, never to accept one on its own.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctgid-rewrite",
      name: "Rewrite in sin and cos, then simplify",
      intuition:
        "Most long expressions shrink once everything is written in sin and cos. Add the fractions, and somewhere a \\(1 - \\sin^2\\theta\\) or a \\(1 - \\cos^2\\theta\\) appears and collapses into a single square.",
      definition:
        "The full method, in order:\n" +
        "- Replace tan, cot, sec and cosec by sin and cos.\n" +
        "- Put fractions over a **common denominator**. With \\(1 \\pm \\sin\\theta\\) or \\(1 \\pm \\cos\\theta\\) below, the product is \\(\\cos^2\\theta\\) or \\(\\sin^2\\theta\\).\n" +
        "- Factor: \\(a^2 - b^2\\), \\(a^3 + b^3\\), \\(a^3 - b^3\\). With \\(a = \\sin\\theta\\) and \\(b = \\cos\\theta\\), \\(a^2 + b^2 = 1\\) inside the bracket.\n" +
        "- Cancel only common **factors**, never terms joined by + or −.\n" +
        "The fast route for options in θ: put a convenient angle into the question and into each option, and keep the option that matches.\n" +
        "- Use 45°, 60° or 30°. Avoid 90° when tan or sec appears, and 0° when cot or cosec appears.\n" +
        "- If two options give the same value at your angle, try a second angle.",
      formula: {
        label: "Factor patterns with a² + b² = 1",
        latex:
          "a^3 + b^3 = (a + b)(a^2 - ab + b^2) \\qquad a^3 - b^3 = (a - b)(a^2 + ab + b^2) \\qquad (1 - \\cos\\theta)(1 + \\cos\\theta) = \\sin^2\\theta",
      },
      authoredExample: {
        prompt: "Simplify \\(\\frac{\\cos\\theta}{1 - \\sin\\theta} - \\frac{\\cos\\theta}{1 + \\sin\\theta}\\).",
        steps: [
          "Common denominator \\((1 - \\sin\\theta)(1 + \\sin\\theta) = 1 - \\sin^2\\theta = \\cos^2\\theta\\).",
          "Numerator: \\(\\cos\\theta(1 + \\sin\\theta) - \\cos\\theta(1 - \\sin\\theta) = 2\\sin\\theta\\cos\\theta\\).",
          "\\(\\frac{2\\sin\\theta\\cos\\theta}{\\cos^2\\theta} = 2\\tan\\theta\\).",
          "Check at 30°: \\(\\frac{0.866}{0.5} - \\frac{0.866}{1.5} = 1.732 - 0.577 = 1.155\\), and \\(2\\tan 30^\\circ = 1.155\\).",
        ],
        answer: "\\(2\\tan\\theta\\)",
      },
      selfCheckExample: {
        prompt: "Simplify \\((\\text{cosec}\\,\\theta - \\cot\\theta)(1 + \\cos\\theta)\\).",
        steps: [
          "\\(\\text{cosec}\\,\\theta - \\cot\\theta = \\frac{1 - \\cos\\theta}{\\sin\\theta}\\).",
          "\\(\\frac{(1 - \\cos\\theta)(1 + \\cos\\theta)}{\\sin\\theta} = \\frac{\\sin^2\\theta}{\\sin\\theta} = \\sin\\theta\\).",
        ],
        answer: "\\(\\sin\\theta\\)",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\sin\\theta \\cot\\theta\\).", answer: "\\(\\cos\\theta\\)" },
        { prompt: "Simplify \\(\\frac{1 - \\cos^2\\theta}{\\sin\\theta}\\).", answer: "\\(\\sin\\theta\\)" },
        { prompt: "Simplify \\(\\cos\\theta \\tan\\theta \\,\\text{cosec}\\,\\theta\\).", answer: "1" },
        {
          prompt: "Simplify \\(\\sec\\theta - \\sin\\theta\\tan\\theta\\).",
          answer: "\\(\\frac{1 - \\sin^2\\theta}{\\cos\\theta} = \\cos\\theta\\)",
        },
      ],
      pyqExampleId: "015d0edc-63aa-4660-bb25-2a0440b98e82",
      traps: [
        {
          title: "Cancelling across a plus sign",
          body:
            "In \\(\\frac{\\sin\\theta + \\cos\\theta}{\\sin\\theta}\\) the sin does not cancel; the fraction is \\(1 + \\cot\\theta\\). Split the fraction or factor first, then cancel.",
        },
        {
          title: "A test angle where two options agree",
          body:
            "At θ = 90°, \\(\\frac{\\sin\\theta}{1 + \\cos\\theta}\\) and \\(\\frac{\\sin\\theta}{1 - \\cos\\theta}\\) are both 1, yet they are different expressions. If two options tie at your angle, test again at 60°.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctgid-elim",
      name: "Eliminating θ from two equations",
      intuition:
        "When x and y are both built from the same θ, look for the identity whose two pieces are x and y. Squaring and then adding or subtracting removes θ and leaves a relation in x and y alone.",
      definition:
        "- \\(x = a\\cos\\theta\\), \\(y = b\\sin\\theta\\): \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1\\).\n" +
        "- \\(x = a\\sec\\theta\\), \\(y = b\\tan\\theta\\): \\(\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1\\). The same holds for cosec and cot.\n" +
        "- \\((\\sin\\theta + \\cos\\theta)^2 + (\\sin\\theta - \\cos\\theta)^2 = 2\\), and more generally the two expressions \\(a\\cos\\theta + b\\sin\\theta\\) and \\(a\\sin\\theta - b\\cos\\theta\\) have squares that add to \\(a^2 + b^2\\). The cross terms cancel.\n" +
        "- Two equations with the same left part: divide one by the other, and the shared part goes, leaving a tan.\n" +
        "- **Fast route:** the relation is true for every θ, so put θ = 0° (or 60°) into both equations and into each option.\n" +
        "- **Limit:** choose an angle that keeps every quantity defined. sec 90° and cosec 0° do not exist.",
      formula: {
        label: "Removing θ",
        latex:
          "x = a\\cos\\theta,\\ y = b\\sin\\theta \\Rightarrow \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\qquad x = a\\sec\\theta,\\ y = b\\tan\\theta \\Rightarrow \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\qquad (a\\cos\\theta + b\\sin\\theta)^2 + (a\\sin\\theta - b\\cos\\theta)^2 = a^2 + b^2",
      },
      authoredExample: {
        prompt: "If \\(x = 5\\,\\text{cosec}\\,\\theta\\) and \\(y = 5\\cot\\theta\\), find \\(x^2 - y^2\\).",
        steps: [
          "\\(x^2 - y^2 = 25\\,\\text{cosec}^2\\theta - 25\\cot^2\\theta = 25(\\text{cosec}^2\\theta - \\cot^2\\theta)\\).",
          "\\(\\text{cosec}^2\\theta - \\cot^2\\theta = 1\\), so \\(x^2 - y^2 = 25\\).",
          "Check at θ = 90°: \\(x = 5\\), \\(y = 0\\), \\(25 - 0 = 25\\).",
        ],
        answer: "25",
      },
      selfCheckExample: {
        prompt: "If \\(m = 2\\cos\\theta + 3\\sin\\theta\\) and \\(n = 2\\sin\\theta - 3\\cos\\theta\\), find \\(m^2 + n^2\\).",
        steps: [
          "The cross terms \\(+12\\sin\\theta\\cos\\theta\\) and \\(-12\\sin\\theta\\cos\\theta\\) cancel.",
          "\\(m^2 + n^2 = 4(\\cos^2\\theta + \\sin^2\\theta) + 9(\\sin^2\\theta + \\cos^2\\theta) = 13\\).",
          "Check at θ = 0°: \\(m = 2\\), \\(n = -3\\), \\(4 + 9 = 13\\).",
        ],
        answer: "13",
      },
      practiceSet: [
        { prompt: "If \\(x = 4\\sin\\theta\\) and \\(y = 4\\cos\\theta\\), find \\(x^2 + y^2\\).", answer: "16" },
        {
          prompt: "If \\(\\sec\\theta = \\frac{a}{3}\\) and \\(\\tan\\theta = \\frac{b}{2}\\), write a relation between a and b with no θ.",
          answer: "\\(\\frac{a^2}{9} - \\frac{b^2}{4} = 1\\)",
        },
        {
          prompt: "If \\(p = \\sin\\theta + \\cos\\theta\\) and \\(q = \\sin\\theta - \\cos\\theta\\), find \\(p^2 + q^2\\).",
          answer: "2",
        },
        {
          prompt: "If \\(\\cos\\theta = 3k\\) and \\(\\sin\\theta = 4k\\) with \\(k > 0\\), find k.",
          answer: "\\(9k^2 + 16k^2 = 1\\), so \\(k = \\frac{1}{5}\\)",
        },
      ],
      pyqExampleId: "b44860e1-3540-4552-a887-41d542a68e67",
      traps: [
        {
          title: "Adding where the identity subtracts",
          body:
            "sec and tan go together with a minus: \\(\\sec^2\\theta - \\tan^2\\theta = 1\\). Only sin and cos add their squares to 1. Pair the two given quantities with the right identity before squaring.",
        },
        {
          title: "Expanding without checking the cross terms",
          body:
            "\\((a\\cos\\theta + b\\sin\\theta)^2\\) has a middle term \\(2ab\\sin\\theta\\cos\\theta\\). It cancels only if the other expression carries the same term with the opposite sign, so write both middle terms down.",
        },
      ],
    },
  ],
};

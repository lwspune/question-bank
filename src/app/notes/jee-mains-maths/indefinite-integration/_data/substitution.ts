import type { SubtopicNote } from "@/app/notes/_types";

export const SUBSTITUTION_II_NOTE: SubtopicNote = {
  subtopicName: "Algebraic Substitution",
  title: "Algebraic Substitution",
  oneLineDefinition:
    "Choosing a substitution that clears a root, a pair of linear factors or a high power of x, so the integral becomes a power of t.",
  whyItMatters:
    "Fourteen PYQs, eight of them multiple choice, and two from 2026. Seven clear a root, with x = tⁿ, with t² equal to the expression under the root, with t = √(1 + x²) + x, or with x = cos θ; four have two linear factors whose powers add to 2, settled by their ratio; three take the leading power of x out of a bracket, or put x = 1/t. Three ideas cover the page.",
  concepts: [
    // C1 — clearing a root
    {
      kind: "formula" as const,
      slug: "jii-radical",
      name: "Clearing a root",
      intuition:
        "A root blocks every standard formula, so the first move is a substitution that removes it. Several fractional powers of \\(x\\) clear together with \\(x=t^n\\), where \\(n\\) is the least common multiple of the root orders. A root of an expression clears when \\(t^2\\) equals that expression. After the change, the integrand is a polynomial or a simple fraction in \\(t\\).",
      definition:
        "- Powers \\(x^{p/q}\\) of different orders: put \\(x=t^n\\), \\(n\\) the LCM of the denominators.\n" +
        "- \\(\\sqrt{a\\pm x^2}\\) next to an odd power of \\(x\\), or \\(\\sqrt{ax+b}\\): put \\(t^2\\) equal to the expression.\n" +
        "- \\(\\sqrt{1+x^2}\\pm x\\): put \\(t=\\sqrt{1+x^2}+x\\); then \\(\\sqrt{1+x^2}-x=\\frac1t\\).\n" +
        "- \\(\\sqrt{\\frac{1-x}{1+x}}\\): put \\(x=\\cos\\theta\\), and the root becomes \\(\\tan\\frac\\theta2\\).",
      formula: {
        label: "Mixed roots of x",
        latex: "x=t^{n},\\quad dx=nt^{n-1}\\,dt,\\quad n=\\operatorname{lcm}(\\text{root orders})",
      },
      authoredExample: {
        prompt: "Find \\(\\int x^3\\sqrt{1+x^2}\\,dx\\).",
        steps: [
          "Put \\(t^2=1+x^2\\), so \\(x\\,dx=t\\,dt\\) and \\(x^2=t^2-1\\).",
          "The integral is \\(\\int(t^2-1)\\,t\\cdot t\\,dt=\\frac{t^5}5-\\frac{t^3}3\\).",
        ],
        answer: "\\(\\frac{(1+x^2)^{5/2}}{5}-\\frac{(1+x^2)^{3/2}}{3}+C\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int\\frac{dx}{x+\\sqrt x}\\).",
        steps: [
          "Put \\(x=t^2\\), \\(dx=2t\\,dt\\): \\(\\int\\frac{2t\\,dt}{t^2+t}=\\int\\frac{2\\,dt}{t+1}\\).",
        ],
        answer: "\\(2\\ln\\left(1+\\sqrt x\\right)+C\\).",
      },
      practiceSet: [
        { prompt: "Substitution for \\(\\int\\frac{dx}{x^{1/2}+x^{1/3}}\\)?", answer: "\\(x=t^6\\)" },
        { prompt: "\\(\\int\\frac{x}{\\sqrt{x+1}}dx\\)?", answer: "\\(\\frac23(x+1)^{3/2}-2\\sqrt{x+1}+C\\)" },
        { prompt: "\\(t=\\sqrt{1+x^2}+x\\). What is \\(\\sqrt{1+x^2}-x\\)?", answer: "\\(\\frac1t\\)" },
        { prompt: "\\(\\int x\\sqrt{x^2+4}\\,dx\\)?", answer: "\\(\\frac13(x^2+4)^{3/2}+C\\)" },
      ],
      pyqExampleId: "74dbc2c6-8ea6-4d9d-a8ec-1b3a6cea872f", // 2026 — x = t^6 clears two roots, then a given value fixes C
      traps: [
        {
          title: "Given values are in x",
          body: "With \\(x=t^6\\), the point \\(x=64\\) is \\(t=2\\), not \\(t=64\\). Convert the point to \\(t\\), or the answer back to \\(x\\), before fixing the constant.",
        },
      ],
    },

    // C2 — two linear factors
    {
      kind: "formula" as const,
      slug: "jii-ratio",
      name: "Two linear factors: use their ratio",
      intuition:
        "When the integrand is one over two linear factors raised to powers that add to 2, divide by the square of one factor. What is left is a power of their ratio, and the derivative of that ratio is a constant over the same square. So the ratio is the substitution, and the integral is a single power of \\(t\\).",
      definition:
        "- For \\(\\frac{1}{(x-a)^p(x+b)^q}\\) with \\(p+q=2\\), write it as \\(\\frac{1}{t^p(x+b)^2}\\), where \\(t=\\frac{x-a}{x+b}\\).\n" +
        "- \\(dt=\\frac{(a+b)\\,dx}{(x+b)^2}\\), so the integral is \\(\\frac{1}{a+b}\\int t^{-p}\\,dt\\).\n" +
        "- A linear factor times the root of a quadratic: factor the quadratic first. The powers often add to 2.",
      formula: {
        label: "Ratio substitution",
        latex: "\\int\\frac{dx}{(x-a)^p(x+b)^{2-p}}=\\frac{1}{(a+b)(1-p)}\\left(\\frac{x-a}{x+b}\\right)^{1-p}+C",
      },
      authoredExample: {
        prompt: "Find \\(\\int\\frac{dx}{\\sqrt[3]{(x-1)^2(x+2)^4}}\\).",
        steps: [
          "The powers \\(\\frac23\\) and \\(\\frac43\\) add to 2. Put \\(t=\\frac{x-1}{x+2}\\), so \\(dt=\\frac{3\\,dx}{(x+2)^2}\\).",
          "The integral is \\(\\frac13\\int t^{-2/3}\\,dt=t^{1/3}\\).",
        ],
        answer: "\\(\\left(\\frac{x-1}{x+2}\\right)^{1/3}+C\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int\\frac{dx}{\\sqrt[5]{(x-3)(x+2)^9}}\\).",
        steps: [
          "Put \\(t=\\frac{x-3}{x+2}\\), so \\(dt=\\frac{5\\,dx}{(x+2)^2}\\).",
          "The integral is \\(\\frac15\\int t^{-1/5}\\,dt=\\frac14t^{4/5}\\).",
        ],
        answer: "\\(\\frac14\\left(\\frac{x-3}{x+2}\\right)^{4/5}+C\\).",
      },
      practiceSet: [
        { prompt: "Substitution for \\(\\int\\frac{dx}{(x-1)^{2/3}(x+1)^{4/3}}\\)?", answer: "\\(t=\\frac{x-1}{x+1}\\)" },
        { prompt: "\\(t=\\frac{x-a}{x+b}\\). Find \\(dt\\).", answer: "\\(\\frac{(a+b)\\,dx}{(x+b)^2}\\)" },
        { prompt: "\\(\\int\\frac{dx}{\\sqrt{(x-1)(x+1)^3}}\\)?", answer: "\\(\\sqrt{\\frac{x-1}{x+1}}+C\\)" },
        { prompt: "\\(\\int\\frac{dx}{(x-1)(x+1)}\\) (the case \\(p=1\\))?", answer: "\\(\\frac12\\ln\\left|\\frac{x-1}{x+1}\\right|+C\\)" },
      ],
      pyqExampleId: "9d103f3f-69a6-4440-af2e-947978441ebe", // 2026 — linear factor times the root of a quadratic that factors
      traps: [
        {
          title: "Differentiate the ratio in full",
          body: "For \\(t=\\frac{2x+1}{2x+3}\\), \\(dt=\\frac{4\\,dx}{(2x+3)^2}\\), not \\(\\frac{2\\,dx}{(2x+3)^2}\\). The constant on top is \\(2\\cdot3-2\\cdot1\\), and a wrong constant scales the whole answer.",
        },
      ],
    },

    // C3 — power of x out
    {
      kind: "formula" as const,
      slug: "jii-power-out",
      name: "Taking out a power of x",
      intuition:
        "A bracket of high powers of \\(x\\) often hides a simple function of \\(\\frac1x\\). Take the leading power out of the bracket, or divide top and bottom by a power of \\(x\\), and the rest of the integrand becomes the derivative of what is inside. Then the integral is a power of the bracket. For a quadratic inside a root beside another quadratic, \\(x=\\frac1t\\) does the same job.",
      definition:
        "- \\((x^m+x^n)^k\\): take the leading power out, so the bracket becomes a function of \\(\\frac1x\\).\n" +
        "- \\(\\frac{P(x)}{Q(x)^2}\\) with high powers: divide top and bottom by a power of \\(x\\) until the top is the derivative of the new bracket.\n" +
        "- \\(\\frac{1}{(ax^2+b)\\sqrt{cx^2+d}}\\): put \\(x=\\frac1t\\), then \\(z^2\\) equal to the root.\n" +
        "- Finish with \\(\\int f'f^k\\,dx=\\frac{f^{k+1}}{k+1}\\).",
      formula: {
        label: "Power rule for a bracket",
        latex: "\\int f'(x)\\,[f(x)]^{k}\\,dx=\\frac{[f(x)]^{k+1}}{k+1}+C,\\quad k\\neq-1",
      },
      authoredExample: {
        prompt: "Find \\(\\int\\frac{2x^3+3x^2}{(x^3+x+1)^2}\\,dx\\).",
        steps: [
          "Divide top and bottom by \\(x^6\\): the bracket becomes \\(1+x^{-2}+x^{-3}\\), and the top becomes \\(2x^{-3}+3x^{-4}\\).",
          "That top is minus the derivative of the bracket, so the integral is \\(\\frac{1}{1+x^{-2}+x^{-3}}\\).",
        ],
        answer: "\\(\\frac{x^3}{x^3+x+1}+C\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int\\frac{dx}{x^2(x^4+1)^{3/4}}\\), \\(x>0\\).",
        steps: [
          "\\((x^4+1)^{3/4}=x^3(1+x^{-4})^{3/4}\\), so the integrand is \\(x^{-5}(1+x^{-4})^{-3/4}\\).",
          "Put \\(t=1+x^{-4}\\), \\(dt=-4x^{-5}\\,dx\\): \\(-\\frac14\\int t^{-3/4}\\,dt=-t^{1/4}\\).",
        ],
        answer: "\\(-\\frac{(x^4+1)^{1/4}}{x}+C\\).",
      },
      practiceSet: [
        { prompt: "Take the power out of \\(\\sqrt{x^4+x^2}\\), \\(x>0\\).", answer: "\\(x^2\\sqrt{1+x^{-2}}\\)" },
        { prompt: "\\(\\int x^{-3}(1+x^{-2})^4\\,dx\\)?", answer: "\\(-\\frac{(1+x^{-2})^5}{10}+C\\)" },
        { prompt: "\\(\\int\\frac{3x^2+2x}{(x^3+x^2+1)^2}\\,dx\\)?", answer: "\\(-\\frac{1}{x^3+x^2+1}+C\\)" },
        { prompt: "Substitution for \\(\\int\\frac{dx}{(x^2+1)\\sqrt{2-x^2}}\\)?", answer: "\\(x=\\frac1t\\), then \\(z^2=2t^2-1\\)" },
      ],
      pyqExampleId: "f9edd69e-9b52-41c6-af8b-65d9b0c99371", // 2025 — a power of x out of a 23rd root
      traps: [
        {
          title: "A root of a power",
          body: "\\(\\sqrt[n]{x^mg}=x^{m/n}\\sqrt[n]{g}\\) needs \\(x>0\\) when \\(n\\) is even; otherwise \\(\\sqrt{x^2}=|x|\\) and a sign appears. The condition \\(x>0\\) in the question is what allows the step.",
        },
      ],
    },
  ],
};

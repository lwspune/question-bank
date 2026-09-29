import type { SubtopicNote } from "@/app/notes/_types";

export const KING_DI_NOTE: SubtopicNote = {
  subtopicName: "The a + b - x Property and Other Symmetries",
  title: "The a + b − x Property and Other Symmetries",
  oneLineDefinition:
    "Writing a definite integral a second way, with x replaced by a + b − x or by 1/x, and adding the two forms so that the hard part cancels.",
  whyItMatters:
    "Twenty-seven PYQs, and nearly all look impossible to integrate directly. They are built so that the integral written a second way, with the variable reflected, adds to the first to give something simple. Two ideas cover the page.",
  concepts: [
    // C1 — a + b - x
    {
      kind: "formula" as const,
      slug: "jdi-king",
      name: "The a + b − x property",
      intuition:
        "Reflecting the interval \\([a,b]\\) in its midpoint does not change the integral: \\(\\int_a^bf(x)\\,dx=\\int_a^bf(a+b-x)\\,dx\\). Write the integral both ways and add. The sum is often simple: \\(\\frac{\\sin^nx}{\\sin^nx+\\cos^nx}\\) and its reflection add to 1 on \\(\\left[0,\\frac\\pi2\\right]\\), and in \\(\\int_0^\\pi xf(\\sin x)\\,dx\\) the \\(x\\) and \\(\\pi-x\\) add to \\(\\pi\\).",
      definition:
        "- \\(\\int_a^bf(x)\\,dx=\\int_a^bf(a+b-x)\\,dx\\).\n" +
        "- \\(\\int_0^{\\pi/2}\\frac{\\sin^nx}{\\sin^nx+\\cos^nx}dx=\\frac\\pi4\\) for every \\(n\\).\n" +
        "- \\(\\int_0^\\pi xf(\\sin x)\\,dx=\\frac\\pi2\\int_0^\\pi f(\\sin x)\\,dx\\).\n" +
        "- \\(f(x)+f(a+b-x)=c\\Rightarrow\\int_a^bf=\\frac c2(b-a)\\).",
      formula: {
        label: "Reflection in the midpoint",
        latex: "\\int_a^b f(x)\\,dx=\\int_a^b f(a+b-x)\\,dx",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2}\\frac{\\sin^3x}{\\sin^3x+\\cos^3x}dx\\).",
        steps: [
          "Reflecting gives \\(\\frac{\\cos^3x}{\\cos^3x+\\sin^3x}\\); the two add to 1.",
          "\\(2I=\\frac\\pi2\\).",
        ],
        answer: "\\(\\frac\\pi4\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^\\pi\\frac{x\\sin x}{1+\\cos^2x}dx\\).",
        steps: [
          "\\(I=\\frac\\pi2\\int_0^\\pi\\frac{\\sin x}{1+\\cos^2x}dx\\); with \\(u=\\cos x\\) the integral is \\(\\int_{-1}^1\\frac{du}{1+u^2}=\\frac\\pi2\\).",
        ],
        answer: "\\(\\frac{\\pi^2}{4}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int_0^{\\pi/2}\\frac{\\cos^5x}{\\sin^5x+\\cos^5x}dx\\)?", answer: "\\(\\frac\\pi4\\)" },
        { prompt: "\\(\\int_2^8\\frac{\\sqrt x}{\\sqrt x+\\sqrt{10-x}}dx\\)?", answer: "\\(3\\)" },
        { prompt: "\\(\\int_0^\\pi xf(\\sin x)\\,dx\\) is how many times \\(\\int_0^\\pi f(\\sin x)\\,dx\\)?", answer: "\\(\\frac\\pi2\\)" },
        { prompt: "\\(f(x)+f(2-x)=4\\). \\(\\int_0^2f\\)?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "816dbb24-19e6-498f-b458-650f3e25ba0b", // 2025 — integral of 8x/(4cos^2 x + sin^2 x) over [0, pi]
      traps: [
        {
          title: "The sum must be simpler",
          body: "The property always holds, but it helps only when the two forms add to something easier. If they do not, the question needs a different method.",
        },
      ],
    },

    // C2 — x -> 1/x
    {
      kind: "formula" as const,
      slug: "jdi-reciprocal",
      name: "The x → 1/x substitution",
      intuition:
        "On limits \\(\\frac1a\\) to \\(a\\), or 0 to \\(\\infty\\), putting \\(x=\\frac1t\\) maps the interval onto itself, reversed, with \\(dx=-\\frac{dt}{t^2}\\). Adding the two forms often cancels a logarithm, or uses \\(\\tan^{-1}x+\\tan^{-1}\\frac1x=\\frac\\pi2\\). For \\(f(x)=\\int_1^x g(t)\\,dt\\), the sum \\(f(x)+f\\left(\\frac1x\\right)\\) combines two integrands over the same range.",
      definition:
        "- \\(x=\\frac1t\\): \\(dx=-\\frac{dt}{t^2}\\); \\(\\left[\\frac1a,a\\right]\\) maps to itself.\n" +
        "- \\(\\int_0^\\infty\\frac{\\ln x}{1+x^2}dx=0\\).\n" +
        "- \\(\\tan^{-1}x+\\tan^{-1}\\frac1x=\\frac\\pi2\\) for \\(x>0\\).",
      formula: {
        label: "Reciprocal substitution",
        latex: "\\int_{1/a}^{a} f(x)\\,dx=\\int_{1/a}^{a} f\\!\\left(\\tfrac1x\\right)\\frac{dx}{x^2}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^\\infty\\frac{\\ln x}{1+x^2}dx\\).",
        steps: [
          "\\(x=\\frac1t\\) turns the integral into \\(\\int_0^\\infty\\frac{-\\ln t}{1+t^2}dt=-I\\).",
        ],
        answer: "\\(0\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_{1/3}^{3}\\frac{\\tan^{-1}x}{x}dx\\).",
        steps: [
          "\\(x\\to\\frac1x\\) gives \\(\\int\\frac{\\tan^{-1}(1/x)}{x}dx\\); adding, \\(2I=\\frac\\pi2\\int_{1/3}^3\\frac{dx}{x}=\\frac\\pi2\\cdot2\\ln3\\).",
        ],
        answer: "\\(\\frac\\pi2\\ln3\\).",
      },
      practiceSet: [
        { prompt: "\\(\\tan^{-1}x+\\tan^{-1}\\frac1x\\) for \\(x>0\\)?", answer: "\\(\\frac\\pi2\\)" },
        { prompt: "\\(x\\to\\frac1x\\) maps \\(\\left[\\frac12,2\\right]\\) to?", answer: "\\(\\left[\\frac12,2\\right]\\), reversed" },
        { prompt: "\\(\\int_0^\\infty\\frac{dx}{1+x^2}\\)?", answer: "\\(\\frac\\pi2\\)" },
        { prompt: "\\(f(x)=\\int_1^x\\frac{\\ln t}{1+t}dt\\): \\(f(x)+f\\left(\\frac1x\\right)\\)?", answer: "\\(\\frac12(\\ln x)^2\\)" },
      ],
      pyqExampleId: "ac84d21b-d8ac-49eb-bf2c-03f59b7b7ab8", // 2023 — integral of tan^-1(x)/x over [1/2, 2]
      traps: [
        {
          title: "Only for positive x",
          body: "\\(\\tan^{-1}x+\\tan^{-1}\\frac1x=\\frac\\pi2\\) holds for \\(x>0\\); for \\(x<0\\) the sum is \\(-\\frac\\pi2\\).",
        },
      ],
    },
  ],
};

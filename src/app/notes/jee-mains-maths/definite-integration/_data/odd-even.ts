import type { SubtopicNote } from "@/app/notes/_types";

export const ODD_EVEN_DI_NOTE: SubtopicNote = {
  subtopicName: "Odd, Even and Periodic Integrands",
  title: "Odd, Even and Periodic Integrands",
  oneLineDefinition:
    "Integrals over an interval symmetric about 0, where odd parts vanish and even parts double; the 1/(1 + aᵍ⁽ˣ⁾) denominator that halves an even integrand; and integrals of periodic functions over many periods.",
  whyItMatters:
    "Twenty-five PYQs, most with limits −a to a. The integrand usually has an odd part that drops out, or a denominator like 1 + eˣ that pairs with its reflection to give 1. A few integrate a periodic function over many periods. Three ideas cover the page.",
  concepts: [
    // C1 — odd and even
    {
      kind: "formula" as const,
      slug: "jdi-odd-even",
      name: "Odd parts vanish, even parts double",
      intuition:
        "On \\([-a,a]\\) an odd integrand contributes 0 and an even one contributes twice its integral on \\([0,a]\\). So split the integrand into its odd and even parts before doing anything else. A term like \\(\\frac{x^3}{x^2+2|x|+1}\\) is odd, because everything but \\(x^3\\) depends only on \\(|x|\\).",
      definition:
        "- \\(f\\) odd: \\(\\int_{-a}^af=0\\). \\(f\\) even: \\(\\int_{-a}^af=2\\int_0^af\\).\n" +
        "- odd × even = odd; odd × odd = even.\n" +
        "- \\(|x|\\), \\(x^2\\), \\(\\cos x\\) are even; \\(x\\), \\(\\sin x\\), \\(\\ln\\big(x+\\sqrt{x^2+1}\\big)\\) are odd.",
      formula: {
        label: "Symmetric limits",
        latex: "\\int_{-a}^{a}f=\\begin{cases}0,&f\\text{ odd}\\\\2\\int_0^af,&f\\text{ even}\\end{cases}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_{-1}^1(x^3+x^2+x)\\,dx\\).",
        steps: [
          "\\(x^3\\) and \\(x\\) are odd; \\(x^2\\) is even: \\(2\\int_0^1x^2\\,dx\\).",
        ],
        answer: "\\(\\frac23\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_{-\\pi/2}^{\\pi/2}(x^5\\cos x+1)\\,dx\\).",
        steps: [
          "\\(x^5\\cos x\\) is odd; the constant gives \\(\\pi\\).",
        ],
        answer: "\\(\\pi\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int_{-2}^2x^3e^{x^2}dx\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\int_{-1}^1|x|\\,dx\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\ln\\big(x+\\sqrt{x^2+1}\\big)\\): odd or even?", answer: "Odd" },
        { prompt: "\\(\\int_{-3}^3(x+|x|)\\,dx\\)?", answer: "\\(9\\)" },
      ],
      pyqExampleId: "7c660015-c1ca-49dd-8760-2622a6dd4a22", // 2026 — (x^3 + |x| + 1)/(x^2 + 2|x| + 1) over [-1, 1]
      traps: [
        {
          title: "Check the whole term",
          body: "\\(x|x|\\) is odd but \\(x^2|x|\\) is even. Decide the parity of each complete term, not of its pieces.",
        },
      ],
    },

    // C2 — 1/(1 + b^g)
    {
      kind: "formula" as const,
      slug: "jdi-exp-denominator",
      name: "A denominator 1 + bᵍ⁽ˣ⁾ with g odd",
      intuition:
        "If \\(g\\) is odd and \\(h\\) is even, replacing \\(x\\) by \\(-x\\) turns \\(\\frac{h(x)}{1+b^{g(x)}}\\) into \\(\\frac{h(x)\\,b^{g(x)}}{1+b^{g(x)}}\\). The two add to \\(h(x)\\), so the integral over \\([-a,a]\\) is half of \\(\\int_{-a}^ah\\), which is \\(\\int_0^ah\\).",
      definition:
        "- \\(\\int_{-a}^a\\frac{h(x)}{1+b^{g(x)}}dx=\\int_0^ah(x)\\,dx\\) (\\(h\\) even, \\(g\\) odd, \\(b>0\\)).\n" +
        "- Common \\(g\\): \\(x\\), \\(\\sin x\\), \\(x|x|\\), \\(x\\cos x\\).\n" +
        "- \\(\\frac{e^x}{e^x+e^{-x}}=\\frac1{1+e^{-2x}}\\) is the same form.",
      formula: {
        label: "Halving an even integrand",
        latex: "\\int_{-a}^{a}\\frac{h(x)}{1+b^{g(x)}}dx=\\int_0^{a}h(x)\\,dx",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_{-1}^1\\frac{x^2}{1+2^x}dx\\).",
        steps: [
          "\\(x^2\\) is even and \\(x\\) is odd: \\(\\int_0^1x^2\\,dx\\).",
        ],
        answer: "\\(\\frac13\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_{-\\pi/2}^{\\pi/2}\\frac{\\cos x}{1+e^{\\sin x}}dx\\).",
        steps: [
          "\\(\\cos x\\) even, \\(\\sin x\\) odd: \\(\\int_0^{\\pi/2}\\cos x\\,dx\\).",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int_{-2}^2\\frac{dx}{1+e^x}\\)?", answer: "\\(2\\)" },
        { prompt: "\\(\\int_{-1}^1\\frac{e^x}{e^x+e^{-x}}dx\\)?", answer: "\\(1\\)" },
        { prompt: "\\(x|x|\\): odd or even?", answer: "Odd" },
        { prompt: "\\(\\int_{-\\pi}^{\\pi}\\frac{\\cos^2x}{1+5^x}dx\\)?", answer: "\\(\\frac\\pi2\\)" },
      ],
      pyqExampleId: "fbb3dd10-96d0-4123-aa31-3c0e8311cb43", // 2021 — cos^2 x/(1 + 3^x) over [-pi/2, pi/2]
      traps: [
        {
          title: "The numerator must be even",
          body: "An odd numerator over \\(1+b^{g}\\) does not halve. Split the numerator into even and odd parts and treat each by its own rule.",
        },
      ],
    },

    // C3 — periodic
    {
      kind: "formula" as const,
      slug: "jdi-periodic",
      name: "Periodic integrands",
      intuition:
        "If \\(f\\) repeats every \\(T\\), every interval of length \\(T\\) gives the same integral, so \\(\\int_0^{nT}f=n\\int_0^Tf\\). A relation like \\(f(x)+f(x+k)=c\\) makes \\(f\\) repeat every \\(2k\\), and each stretch of length \\(2k\\) integrates to \\(ck\\).",
      definition:
        "- \\(f(x+T)=f(x)\\Rightarrow\\int_a^{a+nT}f=n\\int_0^Tf\\).\n" +
        "- Periods: \\(|\\sin x|\\), \\(\\sin^2x\\), \\(\\sin^4x+\\cos^4x\\): \\(\\pi\\) (the last is even \\(\\frac\\pi2\\)).\n" +
        "- \\(f(x)+f(x+k)=c\\Rightarrow\\) period \\(2k\\) and \\(\\int_a^{a+2k}f=ck\\).",
      formula: {
        label: "Many periods",
        latex: "\\int_0^{nT}f(x)\\,dx=n\\int_0^{T}f(x)\\,dx",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{10\\pi}|\\sin x|\\,dx\\).",
        steps: [
          "Period \\(\\pi\\), and \\(\\int_0^\\pi\\sin x\\,dx=2\\); ten periods.",
        ],
        answer: "\\(20\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{4\\pi}\\sin^2x\\,dx\\).",
        steps: [
          "\\(\\int_0^\\pi\\sin^2x\\,dx=\\frac\\pi2\\); four periods.",
        ],
        answer: "\\(2\\pi\\).",
      },
      practiceSet: [
        { prompt: "Period of \\(|\\sin x|\\)?", answer: "\\(\\pi\\)" },
        { prompt: "\\(\\int_0^{2\\pi}\\cos3x\\,dx\\)?", answer: "\\(0\\)" },
        { prompt: "\\(f(x)+f(x+1)=2\\). \\(\\int_0^4f\\)?", answer: "\\(4\\)" },
        { prompt: "\\(\\int_0^{100}(x-[x])\\,dx\\)?", answer: "\\(50\\)" },
      ],
      pyqExampleId: "eda8eea8-121a-4130-9e7f-0b3ec9056668", // 2026 — integral of sin^4 x + cos^4 x over [0, 20 pi]
      traps: [
        {
          title: "The right period",
          body: "\\(|\\sin x|\\) repeats every \\(\\pi\\), not \\(2\\pi\\). Using the longer period halves the number of copies and halves the answer.",
        },
      ],
    },
  ],
};

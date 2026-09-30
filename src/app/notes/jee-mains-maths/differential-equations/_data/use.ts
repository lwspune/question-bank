import type { SubtopicNote } from "@/app/notes/_types";

export const USE_DE_NOTE: SubtopicNote = {
  subtopicName: "Using a Linear Solution",
  title: "Using a Linear Solution",
  oneLineDefinition:
    "Questions where solving the linear equation is only the first half: the constant is fixed by a limit instead of a point, or the solution is then maximised, differentiated, integrated or compared with another solution.",
  whyItMatters:
    "Twenty-two PYQs, eight of them numerical answer, and 2022 alone has nine. The equation is routine; the marks are in what comes after. Seven fix the constant from behaviour at infinity or compare two solutions, eight need a maximum or a derivative of the solution, and seven integrate it. Three ideas cover the page.",
  concepts: [
    // C1 — limits fix the constant
    {
      kind: "formula" as const,
      slug: "jde-limit",
      name: "Limits that fix the constant",
      intuition:
        "The general solution of \\(y'+ky=Q\\) is a particular part plus \\(Ce^{-kx}\\). If the question says the limit at \\(+\\infty\\) or \\(-\\infty\\) is finite, the exponential part must vanish there or be killed: either \\(C=0\\), or the exponent's sign is forced. Two solutions of the same linear equation differ by \\(Ce^{-\\int P}\\), which is never zero unless \\(C=0\\), so distinct solutions never cross.",
      definition:
        "- \\(y=y_p+Ce^{-\\int P\\,dx}\\).\n" +
        "- \\(\\lim_{x\\to\\infty}y\\) finite and \\(e^{x}\\) in the solution: \\(C=0\\).\n" +
        "- \\(f'=\\alpha f+\\beta\\): \\(f=Ce^{\\alpha x}-\\frac\\beta\\alpha\\); a finite limit as \\(x\\to-\\infty\\) needs \\(\\alpha>0\\) and equals \\(-\\frac\\beta\\alpha\\).\n" +
        "- Two distinct solutions of a linear equation never intersect.",
      formula: {
        label: "General solution with constant coefficient",
        latex: "y'+ky=Q\\ \\Rightarrow\\ y=y_p(x)+Ce^{-kx}",
      },
      authoredExample: {
        prompt: "\\(f'(x)=2f(x)-4\\) and \\(\\lim_{x\\to-\\infty}f(x)\\) is finite, with \\(f(0)=3\\). Find \\(f(\\ln2)\\).",
        steps: [
          "\\(f=Ce^{2x}+2\\); the limit at \\(-\\infty\\) is 2, finite for any \\(C\\).",
          "\\(f(0)=C+2=3\\Rightarrow C=1\\).",
        ],
        answer: "\\(f(\\ln2)=4+2=6\\).",
      },
      selfCheckExample: {
        prompt: "\\(y'-y=-2\\) and \\(y\\) stays bounded as \\(x\\to\\infty\\). Find \\(y\\).",
        steps: [
          "\\(y=2+Ce^{x}\\); bounded only if \\(C=0\\).",
        ],
        answer: "\\(y=2\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lim_{t\\to\\infty}\\) of a solution of \\(y'+2y=e^{-t}\\)?", answer: "\\(0\\)" },
        { prompt: "Solutions of \\(y'=y+1\\) through \\((0,0)\\) and \\((0,2)\\) meet?", answer: "Never" },
        { prompt: "\\(f'=3f+\\alpha\\), \\(f\\to5\\) as \\(x\\to-\\infty\\): \\(\\alpha\\)?", answer: "\\(-15\\)" },
        { prompt: "\\(y=1+Ce^{x}\\), finite as \\(x\\to\\infty\\): \\(C\\)?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "e12e3c13-7a99-4037-b385-e818e1e46345", // 2024 — f' = alpha f + 3, f(0) = 2, limit 1 at -infinity
      traps: [
        {
          title: "Which infinity",
          body: "\\(e^{\\alpha x}\\to0\\) as \\(x\\to-\\infty\\) only when \\(\\alpha>0\\). Read which end the limit is taken at before deciding which sign of \\(\\alpha\\) the condition forces.",
        },
      ],
    },

    // C2 — maxima and derivatives of the solution
    {
      kind: "formula" as const,
      slug: "jde-extrema",
      name: "Maxima, critical points and derivatives of the solution",
      intuition:
        "For an extremum, you rarely need the solution's formula differentiated from scratch: the equation itself gives \\(y'\\). Set \\(y'=0\\) using the equation, or write the solution in a simple variable such as \\(t=\\cos x\\) and maximise the quadratic. For a combination like \\(xy''+2y'\\), notice it is \\((xy)''\\).",
      definition:
        "- Critical point: \\(y'=0\\), read from the equation.\n" +
        "- \\(y=\\cos x-2\\cos^2x\\): a quadratic in \\(t=\\cos x\\), maximum at \\(t=\\frac14\\).\n" +
        "- \\((xy)'=xy'+y\\), \\((xy)''=xy''+2y'\\).\n" +
        "- \\(z=x^2y-e^x\\) with \\(xy'+2y=xe^x\\): \\(z'=x(xy'+2y)-e^x\\).",
      formula: {
        label: "Derivative from the equation",
        latex: "\\frac{dy}{dx}=Q(x)-P(x)\\,y\\ \\ \\text{(no need to differentiate the solution)}",
      },
      authoredExample: {
        prompt: "\\(y'+y\\tan x=\\sin x\\) with \\(y(0)=0\\). Find the maximum of \\(y\\) on \\(\\left(0,\\frac\\pi2\\right)\\).",
        steps: [
          "Integrating factor \\(\\sec x\\): \\(y\\sec x=\\ln\\sec x\\), so \\(y=\\cos x\\ln\\sec x=-t\\ln t\\) with \\(t=\\cos x\\).",
          "\\(\\frac{d}{dt}(-t\\ln t)=-(\\ln t+1)=0\\Rightarrow t=\\frac1e\\).",
        ],
        answer: "Maximum \\(\\frac1e\\).",
      },
      selfCheckExample: {
        prompt: "\\(y=x^2-4x+C\\) solves an equation through \\((0,1)\\). Where is \\(y\\) least?",
        steps: [
          "\\(y'=2x-4=0\\).",
        ],
        answer: "At \\(x=2\\), \\(y=-3\\).",
      },
      practiceSet: [
        { prompt: "\\((xy)''\\)?", answer: "\\(xy''+2y'\\)" },
        { prompt: "Maximum of \\(t-2t^2\\)?", answer: "\\(\\frac18\\)" },
        { prompt: "\\(y'\\) changes \\(-\\) to \\(+\\) at \\(x_0\\):", answer: "Local minimum" },
        { prompt: "\\(y'=e^{x}(x^2-1)\\): local maximum at?", answer: "\\(x=-1\\)" },
      ],
      pyqExampleId: "3b08249e-f2b4-4362-918c-5b1a908c1d6c", // 2022 — y' + 2y tan x = sin x, y(pi/3) = 0, maximum of y
      traps: [
        {
          title: "Check the endpoint and the domain",
          body: "A quadratic in \\(t=\\cos x\\) has its vertex inside the range only if that value of \\(t\\) is attainable on the given interval. Otherwise the extreme value is at an end.",
        },
      ],
    },

    // C3 — integrating the solution
    {
      kind: "formula" as const,
      slug: "jde-integrate-solution",
      name: "Integrating the solution: odd parts and areas",
      intuition:
        "Many questions ask for \\(\\int_{-a}^{a}y\\,dx\\) after solving. Split the solution into odd and even parts: the odd part integrates to zero on a symmetric interval, so only the even part needs work. For an area between the solution and a line, find where they meet and integrate the difference.",
      definition:
        "- \\(\\int_{-a}^{a}g=0\\) for odd \\(g\\); \\(=2\\int_0^ag\\) for even \\(g\\).\n" +
        "- Typical: \\(y\\sqrt{1-x^2}=\\frac{x^5}{5}+x^2\\): the \\(x^5\\) term is odd.\n" +
        "- \\(\\int\\frac{x^2}{\\sqrt{1-x^2}}dx\\): put \\(x=\\sin\\theta\\).\n" +
        "- Area between \\(y=f\\) and a line: \\(\\int|f-\\text{line}|\\) between the meeting points.",
      formula: {
        label: "Symmetric interval",
        latex: "\\int_{-a}^{a}\\big(g_{\\text{odd}}+g_{\\text{even}}\\big)\\,dx=2\\int_0^{a}g_{\\text{even}}\\,dx",
      },
      authoredExample: {
        prompt: "\\(y=x^3+x^2\\cos x\\) solves an equation. Find \\(\\int_{-1}^{1}y\\,dx\\).",
        steps: [
          "\\(x^3\\) is odd, \\(x^2\\cos x\\) is even.",
          "\\(2\\int_0^1x^2\\cos x\\,dx=2\\left[x^2\\sin x+2x\\cos x-2\\sin x\\right]_0^1\\).",
        ],
        answer: "\\(2(2\\cos1-\\sin1)\\).",
      },
      selfCheckExample: {
        prompt: "\\(y=2x+x^2\\). Find \\(\\int_{-3}^{3}y\\,dx\\).",
        steps: [
          "The \\(2x\\) term vanishes; \\(2\\int_0^3x^2\\,dx=18\\).",
        ],
        answer: "\\(18\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int_{-1}^{1}x^5\\,dx\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\int_0^{1/2}\\frac{x^2}{\\sqrt{1-x^2}}dx\\)?", answer: "\\(\\frac\\pi{12}-\\frac{\\sqrt3}{8}\\)" },
        { prompt: "Is \\(x\\cos x\\) odd or even?", answer: "Odd" },
        { prompt: "\\(\\int_{-a}^{a}(x^2+1)\\cos x\\,dx\\) equals?", answer: "\\(2\\int_0^a(x^2+1)\\cos x\\,dx\\)" },
      ],
      pyqExampleId: "b6b8d3ca-6ff9-4371-8f06-c96eece4956c", // 2022 — integral of f from -sqrt3/2 to sqrt3/2
      traps: [
        {
          title: "Split before integrating",
          body: "Integrating the whole solution term by term on \\([-a,a]\\) wastes time on parts that cancel. Identify the odd terms first and drop them.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const PIECEWISE_DI_NOTE: SubtopicNote = {
  subtopicName: "Greatest Integer, Modulus and Max-Min Integrands",
  title: "Greatest Integer, Modulus and Max–Min Integrands",
  oneLineDefinition:
    "Integrands that change formula part-way: the greatest integer function, the fractional part, the modulus, and the larger or smaller of two functions. Split the interval where the formula changes and add the pieces.",
  whyItMatters:
    "Forty-eight PYQs, a quarter of the chapter. Three quarters involve the greatest integer function or the fractional part. The method never changes: find where the formula changes, split there, and add. The errors come from a missed breaking point. Three ideas cover the page.",
  concepts: [
    // C1 — greatest integer
    {
      kind: "formula" as const,
      slug: "jdi-gif",
      name: "Greatest integer: split where the value jumps",
      intuition:
        "\\([g(x)]\\) stays constant until \\(g(x)\\) crosses an integer. List the points in the interval where \\(g\\) takes integer values, split there, and add (integer value) × (length of the piece). For \\([x]\\) the pieces are unit intervals; for \\([x^2]\\) the breaks are at \\(1,\\sqrt2,\\sqrt3,2,\\dots\\). An integer can be taken out: \\([n+t]=n+[t]\\).",
      definition:
        "- \\(\\int_a^b[g(x)]\\,dx=\\sum(\\text{value})\\times(\\text{length where it holds})\\).\n" +
        "- \\([x^2]=k\\) on \\([\\sqrt k,\\sqrt{k+1})\\) for \\(x\\ge0\\).\n" +
        "- \\([x+n]=[x]+n\\) for integer \\(n\\); \\([x]+[-x]=-1\\) for non-integer \\(x\\).",
      formula: {
        label: "Greatest-integer integral",
        latex: "\\int_a^b[g(x)]\\,dx=\\sum_k k\\cdot\\ell\\{x: [g(x)]=k\\}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^2[x^2]\\,dx\\).",
        steps: [
          "\\(0\\) on \\([0,1)\\), \\(1\\) on \\([1,\\sqrt2)\\), \\(2\\) on \\([\\sqrt2,\\sqrt3)\\), \\(3\\) on \\([\\sqrt3,2)\\).",
          "\\((\\sqrt2-1)+2(\\sqrt3-\\sqrt2)+3(2-\\sqrt3)\\).",
        ],
        answer: "\\(5-\\sqrt2-\\sqrt3\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^3[x]\\,dx\\).",
        steps: [
          "\\(0+1+2\\).",
        ],
        answer: "\\(3\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int_0^{1.5}[x]\\,dx\\)?", answer: "\\(0.5\\)" },
        { prompt: "\\(\\int_{-1}^1[x]\\,dx\\)?", answer: "\\(-1\\)" },
        { prompt: "Where is \\([x^2]=1\\) for \\(x\\ge0\\)?", answer: "\\([1,\\sqrt2)\\)" },
        { prompt: "\\(\\int_0^2\\left[x-\\frac12\\right]dx\\)?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "e695ba81-f2c3-4431-b188-f5da6aa2f953", // 2026 — integral of 1/([x] + 4) over [-pi/2, pi/2]
      traps: [
        {
          title: "Negative numbers round down",
          body: "\\([-0.3]=-1\\), not 0. On an interval below zero, \\([x]\\) is the next integer to the left.",
        },
      ],
    },

    // C2 — fractional part
    {
      kind: "formula" as const,
      slug: "jdi-fractional",
      name: "Fractional part and repeating pieces",
      intuition:
        "\\(\\{x\\}=x-[x]\\) repeats every 1, so any function of \\(\\{x\\}\\) has period 1. Integrate over \\([0,1]\\) once and multiply by the number of whole periods. A limit that is not a whole number leaves a partial period at the end, worked out separately.",
      definition:
        "- \\(\\{x\\}=x-[x]\\in[0,1)\\), period 1.\n" +
        "- \\(\\int_0^ng(\\{x\\})\\,dx=n\\int_0^1g(x)\\,dx\\) for integer \\(n\\).\n" +
        "- Partial period: \\(\\int_n^{n+t}g(\\{x\\})\\,dx=\\int_0^tg(x)\\,dx\\).",
      formula: {
        label: "Whole periods of the fractional part",
        latex: "\\int_0^{n} g(\\{x\\})\\,dx=n\\int_0^{1} g(x)\\,dx",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^5\\{x\\}^2\\,dx\\).",
        steps: [
          "\\(5\\int_0^1x^2\\,dx\\).",
        ],
        answer: "\\(\\frac53\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{2.5}\\{x\\}\\,dx\\).",
        steps: [
          "Two periods give \\(2\\cdot\\frac12\\); the last half gives \\(\\int_0^{0.5}x\\,dx=\\frac18\\).",
        ],
        answer: "\\(\\frac98\\).",
      },
      practiceSet: [
        { prompt: "Period of \\(\\{x\\}\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\int_0^3\\{x\\}\\,dx\\)?", answer: "\\(\\frac32\\)" },
        { prompt: "\\(\\int_0^2e^{\\{x\\}}dx\\)?", answer: "\\(2(e-1)\\)" },
        { prompt: "\\(\\int_0^1\\{2x\\}\\,dx\\)?", answer: "\\(\\frac12\\)" },
      ],
      pyqExampleId: "13f9048a-b29c-45bc-977b-9b6647e94023", // 2021 — sum of the integrals of e^(x - [x]) over [n - 1, n], n = 1..100
      traps: [
        {
          title: "The partial period at the end",
          body: "With an upper limit like 10.5, there are ten whole periods and half of one more. Add the half-period's integral; it is not half of a full one unless the integrand is constant.",
        },
      ],
    },

    // C3 — modulus and max-min
    {
      kind: "formula" as const,
      slug: "jdi-modulus",
      name: "Modulus and the larger or smaller of two functions",
      intuition:
        "\\(|g(x)|\\) changes formula where \\(g(x)=0\\): find every root inside the interval, split there, and change the sign on the pieces where \\(g<0\\). For \\(\\max\\{f,g\\}\\) or \\(\\min\\{f,g\\}\\), find where the two graphs cross; on each piece one function is the larger throughout.",
      definition:
        "- \\(\\int_a^b|g|=\\sum\\pm\\int g\\) over the pieces between roots of \\(g\\).\n" +
        "- \\(\\max\\{f,g\\}\\): split at \\(f=g\\), take the larger on each piece.\n" +
        "- \\(\\sqrt{1-\\sin2x}=|\\sin x-\\cos x|\\): a hidden modulus.",
      formula: {
        label: "Modulus split at the roots",
        latex: "\\int_a^b|g(x)|\\,dx=\\sum_{\\text{pieces}}\\left|\\int g(x)\\,dx\\right|",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^3|x^2-4|\\,dx\\).",
        steps: [
          "\\(\\int_0^2(4-x^2)\\,dx=\\frac{16}3\\); \\(\\int_2^3(x^2-4)\\,dx=\\frac73\\).",
        ],
        answer: "\\(\\frac{23}3\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^2|x-1|\\,dx\\).",
        steps: [
          "Two triangles of area \\(\\frac12\\).",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int_{-1}^1|x|\\,dx\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\int_0^\\pi|\\cos x|\\,dx\\)?", answer: "\\(2\\)" },
        { prompt: "\\(\\int_0^1\\max\\{x,1-x\\}\\,dx\\)?", answer: "\\(\\frac34\\)" },
        { prompt: "\\(\\int_0^{2\\pi}|\\sin x|\\,dx\\)?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "a29d0508-5ef1-4d7d-bf67-a5a55a1975bb", // 2023 — 12 times the integral of |x^2 - 3x + 2| over [0, 3]
      traps: [
        {
          title: "Every root in the interval",
          body: "A quadratic may have two roots inside the limits. Missing one leaves a piece with the wrong sign, and the error is exactly twice that piece's integral.",
        },
      ],
    },
  ],
};

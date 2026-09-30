import type { SubtopicNote } from "@/app/notes/_types";

export const GIF_LIM_NOTE: SubtopicNote = {
  subtopicName: "Greatest Integer and One-Sided Limits",
  title: "Greatest Integer and One-Sided Limits",
  oneLineDefinition:
    "Limits involving the greatest integer function, the modulus or expressions that behave differently on each side of a point, found from the left and right separately.",
  whyItMatters:
    "Ten PYQs, seven of them multiple choice. Six involve the greatest integer function, often near an integer or with a squeeze; four compare the left and right limits of a modulus or an exponential. Two ideas cover the page.",
  concepts: [
    // C1 — greatest integer
    {
      kind: "formula" as const,
      slug: "jlim-gif",
      name: "The greatest integer function",
      intuition:
        "\\([x]\\) is constant between integers and jumps at each integer. Near an integer \\(n\\), take the two sides: \\([x]=n-1\\) just to the left and \\(n\\) just to the right. For expressions like \\(x\\left[\\frac1x\\right]\\), squeeze with \\(t-1<[t]\\le t\\).",
      definition:
        "- \\([x]=n\\) for \\(n\\le x<n+1\\).\n" +
        "- At an integer \\(n\\): left limit \\(n-1\\), right limit \\(n\\).\n" +
        "- Squeeze: \\(t-1<[t]\\le t\\); \\(\\{t\\}=t-[t]\\in[0,1)\\).",
      formula: {
        label: "Greatest integer bounds",
        latex: "t-1<[t]\\le t",
      },
      authoredExample: {
        prompt: "Does \\(\\lim_{x\\to2}[x]\\) exist?",
        steps: [
          "Left: 1; right: 2.",
        ],
        answer: "No.",
      },
      selfCheckExample: {
        prompt: "Find \\(\\lim_{x\\to0^+}x\\left[\\frac1x\\right]\\).",
        steps: [
          "\\(x\\left(\\frac1x-1\\right)<x\\left[\\frac1x\\right]\\le1\\), and the left side tends to 1.",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lim_{x\\to1.5}[x]\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\lim_{x\\to3^-}[x]\\)?", answer: "\\(2\\)" },
        { prompt: "\\(\\lim_{x\\to0}[\\cos x]\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\lim_{x\\to0^-}[x]\\)?", answer: "\\(-1\\)" },
      ],
      pyqExampleId: "2da48cd5-b744-4f0e-9063-3748e7243fce", // 2025 — a limit with the greatest integer function
      traps: [
        {
          title: "Values near an integer from above",
          body: "\\([\\cos x]\\) near 0 is 0, because \\(\\cos x\\) is just below 1, not equal to it. Ask on which side of the integer the inside approaches.",
        },
      ],
    },

    // C2 — one-sided limits
    {
      kind: "formula" as const,
      slug: "jlim-one-sided",
      name: "Left and right limits",
      intuition:
        "A limit exists only if the left and right limits agree. Moduli, \\(e^{1/x}\\) and \\(\\tan^{-1}\\frac1x\\) all behave differently on the two sides of 0, so compute each side separately: for \\(x<0\\), \\(|x|=-x\\) and \\(e^{1/x}\\to0\\); for \\(x>0\\), \\(e^{1/x}\\to\\infty\\).",
      definition:
        "- The limit exists exactly when the left and right limits are equal.\n" +
        "- \\(e^{1/x}\\to0\\) as \\(x\\to0^-\\), \\(\\to\\infty\\) as \\(x\\to0^+\\).\n" +
        "- \\(\\tan^{-1}\\frac1x\\to\\pm\\frac\\pi2\\) as \\(x\\to0^\\pm\\).",
      formula: {
        label: "Existence of a limit",
        latex: "\\lim_{x\\to a}f\\ \\text{exists}\\ \\Leftarrow\\ \\lim_{x\\to a^-}f=\\lim_{x\\to a^+}f",
      },
      authoredExample: {
        prompt: "Does \\(\\lim_{x\\to0}\\frac{|x|}x\\) exist?",
        steps: [
          "Left: \\(-1\\); right: \\(1\\).",
        ],
        answer: "No.",
      },
      selfCheckExample: {
        prompt: "Find \\(\\lim_{x\\to0^+}e^{-1/x}\\).",
        steps: [
          "\\(-\\frac1x\\to-\\infty\\).",
        ],
        answer: "\\(0\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lim_{x\\to0^-}\\frac{|x|}x\\)?", answer: "\\(-1\\)" },
        { prompt: "\\(\\lim_{x\\to0^+}\\tan^{-1}\\frac1x\\)?", answer: "\\(\\frac\\pi2\\)" },
        { prompt: "\\(\\lim_{x\\to0}\\frac{\\sin|x|}x\\)?", answer: "Does not exist" },
        { prompt: "\\(\\lim_{x\\to0}x\\,e^{1/x}\\) from the left?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "8be4d00b-7539-4661-8e9d-16d7820c04f3", // 2024 — a one-sided limit
      traps: [
        {
          title: "sin|x| over x",
          body: "\\(\\frac{\\sin|x|}x\\) tends to 1 from the right and \\(-1\\) from the left. A limit that uses \\(|x|\\) or \\(\\sqrt{x^2}\\) needs both sides checked.",
        },
      ],
    },
  ],
};

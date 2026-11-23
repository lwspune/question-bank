import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_TF_INVERSE_NOTE: SubtopicNote = {
  subtopicName: "Inverse Trigonometric Functions and Principal Values",
  title: "Inverse Trigonometric Functions and Principal Values",
  oneLineDefinition:
    "Each trigonometric function is made one-one on a chosen interval, its principal value branch, and the inverse function returns the one angle in that interval.",
  whyItMatters:
    "15 questions. Four were set in board papers: the principal value of cos⁻¹(−1/2) (2015) and of cot⁻¹(−1/√3) (2022), the value of sin⁻¹(sin 5π/3) (2024), and cos⁻¹(1/2) + 2 sin⁻¹(1/2) (2026). The textbook adds the principal values of the other functions and the branch of sec⁻¹.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscmtf-branches",
      name: "Domains and principal value branches",
      intuition:
        "Sine takes every value between \\(-1\\) and 1 again and again, so \\(\\sin^{-1}\\) cannot return every angle with a given sine. The textbook fixes one interval for each function, where it is one-one and takes all its values once. The answer must come from that interval: it is the principal value.",
      definition:
        "- The value of an inverse function in its range is its **principal value**.\n" +
        "- To find it: write the ratio equal to the number, find the reference angle, then choose the angle inside the branch.\n" +
        "- For a negative number, \\(\\sin^{-1}\\), \\(\\tan^{-1}\\) and \\(\\operatorname{cosec}^{-1}\\) give a negative angle (fourth quadrant). \\(\\cos^{-1}\\), \\(\\sec^{-1}\\) and \\(\\cot^{-1}\\) give an obtuse angle, \\(\\pi\\) minus the reference angle (second quadrant).",
      table: {
        columns: ["Function", "Domain", "Principal value branch"],
        rows: [
          {
            cells: ["\\(\\sin^{-1}x\\)", "\\([-1, 1]\\)", "\\(\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]\\)"],
            pyqExampleId: "ad6c030e-891f-4f90-b71b-218e34db2e72",
            noteAmber: "Board 2026 asked for cos⁻¹(1/2) + 2 sin⁻¹(1/2): take each principal value, then add.",
          },
          {
            cells: ["\\(\\cos^{-1}x\\)", "\\([-1, 1]\\)", "\\([0, \\pi]\\)"],
            pyqExampleId: "3a867623-78a8-48a8-a700-c3e7c1a5ee4e",
            noteAmber: "Board 2015 asked for the principal value of cos⁻¹(−1/2). The answer is in the second quadrant, not negative.",
          },
          { cells: ["\\(\\tan^{-1}x\\)", "\\(R\\)", "\\(\\left(-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right)\\)"] },
          { cells: ["\\(\\operatorname{cosec}^{-1}x\\)", "\\(R - (-1, 1)\\)", "\\(\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right] - \\{0\\}\\)"] },
          { cells: ["\\(\\sec^{-1}x\\)", "\\(R - (-1, 1)\\)", "\\([0, \\pi] - \\left\\{\\dfrac{\\pi}{2}\\right\\}\\)"] },
          { cells: ["\\(\\cot^{-1}x\\)", "\\(R\\)", "\\((0, \\pi)\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Find the principal value of \\(\\sec^{-1}(-2)\\).",
        steps: [
          "\\(\\sec\\dfrac{\\pi}{3} = 2\\), so the reference angle is \\(\\dfrac{\\pi}{3}\\).",
          "The branch is \\([0, \\pi]\\) without \\(\\dfrac{\\pi}{2}\\); a negative value needs the second quadrant: \\(\\pi - \\dfrac{\\pi}{3} = \\dfrac{2\\pi}{3}\\).",
        ],
        answer: "\\(\\dfrac{2\\pi}{3}\\)",
      },
      practiceSet: [
        { prompt: "Find the principal value of \\(\\tan^{-1}\\left(-\\dfrac{1}{\\sqrt{3}}\\right)\\).", answer: "\\(-\\dfrac{\\pi}{6}\\)" },
        { prompt: "Find the principal value of \\(\\operatorname{cosec}^{-1}(-2)\\).", answer: "\\(-\\dfrac{\\pi}{6}\\)" },
        { prompt: "Find the principal value of \\(\\cos^{-1}\\left(-\\dfrac{\\sqrt{3}}{2}\\right)\\).", answer: "\\(\\dfrac{5\\pi}{6}\\)" },
        { prompt: "Why is \\(\\dfrac{3\\pi}{2}\\) never a value of \\(\\cos^{-1}x\\)?", answer: "It lies outside the branch \\([0, \\pi]\\)" },
      ],
      pyqExampleId: "a47713c0-6a41-4897-b884-9030bdb1927a",
      traps: [
        {
          title: "A negative answer for cos⁻¹ or cot⁻¹",
          body: "\\(\\cos^{-1}\\) and \\(\\cot^{-1}\\) never give a negative angle. For a negative number the answer is \\(\\pi\\) minus the reference angle.",
        },
        {
          title: "Giving an angle outside the branch",
          body: "\\(\\sin\\dfrac{7\\pi}{6} = -\\dfrac{1}{2}\\), but \\(\\sin^{-1}\\left(-\\dfrac{1}{2}\\right) = -\\dfrac{\\pi}{6}\\). Any angle you give must lie in the branch.",
        },
        {
          title: "Reading sin⁻¹ x as 1/sin x",
          body: "\\(\\sin^{-1}x\\) is an angle whose sine is \\(x\\). It is not \\(\\dfrac{1}{\\sin x}\\), which is \\(\\operatorname{cosec} x\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmtf-inverse-of-ratio",
      name: "An inverse function of a ratio, and a ratio of an inverse value",
      intuition:
        "\\(\\sin^{-1}\\) undoes \\(\\sin\\) only for angles inside its own branch. Outside it, the sine still has a value, and \\(\\sin^{-1}\\) returns the angle in the branch with that value, which can be a different angle. The other order always works: the sine of the angle whose sine is \\(x\\) is \\(x\\).",
      definition:
        "- \\(\\sin^{-1}(\\sin x) = x\\) only when \\(-\\dfrac{\\pi}{2} \\le x \\le \\dfrac{\\pi}{2}\\).\n" +
        "- \\(\\cos^{-1}(\\cos x) = x\\) only when \\(0 \\le x \\le \\pi\\); \\(\\tan^{-1}(\\tan x) = x\\) only when \\(-\\dfrac{\\pi}{2} < x < \\dfrac{\\pi}{2}\\).\n" +
        "- Outside the branch: work out the ratio first (as a number), then take its principal value.\n" +
        "- The other order: \\(\\sin(\\sin^{-1}x) = x\\) for every \\(x\\) in \\([-1, 1]\\), and \\(\\tan(\\tan^{-1}x) = x\\) for every real \\(x\\).\n" +
        "- **A different ratio of an inverse value:** let \\(\\theta = \\cos^{-1}x\\), so \\(\\cos\\theta = x\\). Find \\(\\sin\\theta\\) from \\(\\sin^2\\theta + \\cos^2\\theta = 1\\), with the sign fixed by the branch.",
      formula: {
        label: "When the inverse undoes the function",
        latex: "\\sin^{-1}(\\sin x) = x \\text{ for } x \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right], \\qquad \\cos^{-1}(\\cos x) = x \\text{ for } x \\in [0, \\pi]",
      },
      authoredExample: {
        prompt: "Find the value of \\(\\cos^{-1}\\left(\\cos\\dfrac{4\\pi}{3}\\right)\\).",
        steps: [
          "\\(\\dfrac{4\\pi}{3}\\) is not in \\([0, \\pi]\\), so the answer is not \\(\\dfrac{4\\pi}{3}\\).",
          "\\(\\cos\\dfrac{4\\pi}{3} = \\cos\\left(\\pi + \\dfrac{\\pi}{3}\\right) = -\\cos\\dfrac{\\pi}{3} = -\\dfrac{1}{2}\\).",
          "\\(\\therefore \\cos^{-1}\\left(\\cos\\dfrac{4\\pi}{3}\\right) = \\cos^{-1}\\left(-\\dfrac{1}{2}\\right) = \\pi - \\dfrac{\\pi}{3} = \\dfrac{2\\pi}{3}\\), which lies in \\([0, \\pi]\\).",
        ],
        answer: "\\(\\dfrac{2\\pi}{3}\\)",
      },
      selfCheckExample: {
        prompt: "Find the value of \\(\\cos\\left(\\sin^{-1}\\dfrac{8}{17}\\right)\\).",
        steps: [
          "Let \\(\\theta = \\sin^{-1}\\dfrac{8}{17}\\), so \\(\\sin\\theta = \\dfrac{8}{17}\\) and \\(\\theta\\) is acute.",
          "\\(\\cos\\theta = \\sqrt{1 - \\dfrac{64}{289}} = \\sqrt{\\dfrac{225}{289}} = \\dfrac{15}{17}\\).",
        ],
        answer: "\\(\\dfrac{15}{17}\\)",
      },
      practiceSet: [
        { prompt: "For which values of \\(x\\) is \\(\\sin^{-1}(\\sin x) = x\\)?", answer: "For \\(-\\dfrac{\\pi}{2} \\le x \\le \\dfrac{\\pi}{2}\\)" },
        { prompt: "Find \\(\\sin\\left(\\sin^{-1}\\dfrac{2}{3}\\right)\\).", answer: "\\(\\dfrac{2}{3}\\)" },
        { prompt: "Find \\(\\tan\\left(\\cos^{-1}\\dfrac{5}{13}\\right)\\).", answer: "\\(\\dfrac{12}{5}\\)", method: "\\(\\cos\\theta = \\dfrac{5}{13}\\), \\(\\sin\\theta = \\dfrac{12}{13}\\)." },
      ],
      pyqExampleId: "aadf585c-7318-40a2-86c2-5b1f52a5e9d5",
      traps: [
        {
          title: "Cancelling the inverse at once",
          body: "\\(\\cos^{-1}(\\cos x)\\) is \\(x\\) only for \\(x\\) in \\([0, \\pi]\\). For any other angle, work out the cosine first and then take the principal value.",
        },
        {
          title: "Wrong sign for the second ratio",
          body: "For \\(\\theta = \\cos^{-1}x\\) with \\(x < 0\\), \\(\\theta\\) is obtuse: \\(\\sin\\theta\\) is positive but \\(\\tan\\theta\\) is negative.",
        },
      ],
    },
  ],
};

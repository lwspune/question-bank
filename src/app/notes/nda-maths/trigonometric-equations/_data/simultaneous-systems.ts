import type { SubtopicNote } from "@/app/notes/_types";

export const SIMULTANEOUS_SYSTEMS_NOTE: SubtopicNote = {
  subtopicName: "Simultaneous and Combined Trigonometric Systems",
  title: "Simultaneous & Combined Trigonometric Systems",
  oneLineDefinition:
    "Two trig equations in the same angle (or two angles) are solved together: find each equation's solution set and intersect them, or combine the equations into one with a substitution.",
  whyItMatters:
    "7 PYQs, 3 HARD. The reliable approach is to solve each condition for its own solution set and keep only the common values — or, for a combined system, introduce a substitution like s = sin x + cos x that fuses both equations into a single solvable one.",
  concepts: [
    // simultaneous equations
    {
      kind: "formula" as const,
      slug: "te-simultaneous-equations",
      name: "Solving Two Equations Together",
      pyqExampleId: "fae344eb-0c00-46b5-8385-7dd4e4740dc5",
      intuition:
        "When θ must satisfy two trig conditions at once, solve each separately for its list of angles in the interval, then take ONLY the values that appear in both lists. A pair of conditions usually pins the quadrant and leaves one common solution.",
      definition:
        "- **Intersect the solution sets:** for \\(\\cot\\theta = -\\sqrt3\\) AND \\(\\csc\\theta = -2\\), list each in the interval and keep the common angle (the two conditions fix both the reference angle and the quadrant).\n" +
        "- **Two-angle systems:** \\(\\sin(A+B) = 1\\) and \\(2\\sin(A-B) = 1\\) give \\(A+B = \\tfrac{\\pi}{2}\\), \\(A-B = \\tfrac{\\pi}{6}\\); solve the linear pair for \\(A, B\\), then any required ratio.\n" +
        "- **\\(\\sin\\alpha + \\sin\\beta = 0 = \\cos\\alpha + \\cos\\beta\\):** both are negated, forcing \\(\\alpha = \\pi + \\beta\\).",
      formula: {
        label: "Common solution = intersection",
        latex: "\\{\\theta : \\text{eqn 1}\\} \\cap \\{\\theta : \\text{eqn 2}\\}",
      },
      authoredExample: {
        prompt: "If \\(\\sin(A+B) = 1\\) and \\(\\sin(A-B) = \\tfrac12\\) with \\(A, B\\) acute, find \\(A\\) and \\(B\\).",
        steps: [
          "\\(\\sin(A+B) = 1 \\Rightarrow A+B = \\tfrac{\\pi}{2}\\); \\(\\sin(A-B) = \\tfrac12 \\Rightarrow A-B = \\tfrac{\\pi}{6}\\).",
          "Add and subtract: \\(2A = \\tfrac{\\pi}{2} + \\tfrac{\\pi}{6} = \\tfrac{2\\pi}{3}\\), so \\(A = \\tfrac{\\pi}{3}\\), \\(B = \\tfrac{\\pi}{6}\\).",
        ],
        answer: "\\(A = 60^\\circ,\\ B = 30^\\circ\\).",
      },
    },

    // combined system reduction
    {
      kind: "formula" as const,
      slug: "te-combined-system-reduction",
      name: "Reducing a Combined System",
      pyqExampleId: "9426bca8-401d-4e8f-a14b-ed91a7f83346",
      intuition:
        "Some systems mix sin x + cos x, tan x + cot x, sec x + csc x in one equation. A single substitution, s = sin x + cos x, expresses all of them (since sin x cos x = (s²−1)/2), collapsing the tangle into one quadratic in s.",
      definition:
        "- **The s = sin x + cos x substitution:** then \\(\\sin x\\cos x = \\tfrac{s^2-1}{2}\\), \\(\\sin 2x = s^2 - 1\\), \\(\\tan x + \\cot x = \\dfrac{2}{\\sin 2x}\\), \\(\\sec x + \\csc x = \\dfrac{2s}{\\sin 2x}\\). The whole equation becomes a polynomial in \\(s\\).\n" +
        "- **Eliminate between two relations:** for \\(\\cos 2B = 3\\sin^2 A\\) and \\(3\\sin 2A = 2\\sin 2B\\), substitute one into the other to reach a clean angle relation such as \\(A + 2B = \\tfrac{\\pi}{2}\\).",
      formula: {
        label: "The s-substitution",
        latex: "s = \\sin x + \\cos x \\ \\Rightarrow\\ \\sin x\\cos x = \\tfrac{s^2-1}{2},\\quad \\sin 2x = s^2 - 1",
      },
      authoredExample: {
        prompt: "If \\(\\sin x + \\cos x = \\tfrac{1}{2}\\), find \\(\\sin 2x\\).",
        steps: [
          "Square: \\((\\sin x + \\cos x)^2 = \\tfrac14\\), i.e. \\(1 + \\sin 2x = \\tfrac14\\).",
          "\\(\\sin 2x = \\tfrac14 - 1\\).",
        ],
        answer: "\\(\\sin 2x = -\\dfrac{3}{4}\\).",
      },
    },
  ],
};

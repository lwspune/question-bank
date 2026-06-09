import type { SubtopicNote } from "@/app/notes/_types";

export const SOLVING_EQUATIONS_NOTE: SubtopicNote = {
  subtopicName: "Solving Inverse Trigonometric Equations and Geometric Applications",
  title: "Solving Equations & Geometric Applications",
  oneLineDefinition:
    "Inverse-trig equations are solved by collapsing them with the complementary identity (or the sum formula) to a single inverse function, then checking the root is valid; geometric problems read angles as arctangents of height-over-distance.",
  whyItMatters:
    "6 PYQs. Two reliable moves cover the subtopic: use sin⁻¹x + cos⁻¹x = π/2 to turn a mixed equation into one unknown, and watch the validity condition (ab < 1) when you apply the tan⁻¹ sum formula. Geometric questions are right-triangle arctangents.",
  concepts: [
    // solving equations
    {
      kind: "formula" as const,
      slug: "it-solving-equations",
      name: "Solving Inverse-Trig Equations",
      pyqExampleId: "7337cfb2-48d4-4016-be80-2dde1d76efa8",
      intuition:
        "Most equations mix two inverse functions. Replace one using the complementary identity so only a single unknown inverse remains, solve for it, then recover x. When the tan⁻¹ sum formula is used to form a quadratic, discard any root that violates its validity range.",
      definition:
        "- **Complementary collapse:** in \\(a\\sin^{-1}x + b\\cos^{-1}x = c\\), write \\(\\cos^{-1}x = \\tfrac{\\pi}{2} - \\sin^{-1}x\\) to get one unknown.\n" +
        "- **Sum-formula equations:** \\(\\tan^{-1}f(x) + \\tan^{-1}g(x) = \\tfrac{\\pi}{4}\\) becomes \\(\\dfrac{f+g}{1-fg} = 1\\); solve, then **reject roots where \\(fg \\ge 1\\)** or where the principal range is exceeded.\n" +
        "- **Existence:** \\(\\sin^{-1}x - \\cos^{-1}x = k\\) has a solution only when the implied \\(\\sin^{-1}x = \\tfrac{\\pi/2 + k}{2}\\) lands in range.",
      formula: {
        label: "Collapse with the complementary identity",
        latex: "a\\sin^{-1}x + b\\cos^{-1}x = c \\ \\xrightarrow{\\cos^{-1}x = \\frac{\\pi}{2}-\\sin^{-1}x}\\ \\text{one unknown}",
      },
      authoredExample: {
        prompt: "Solve \\(\\sin^{-1}x + \\cos^{-1}(1-x) = \\tfrac{\\pi}{2}\\).",
        steps: [
          "Compare with \\(\\sin^{-1}u + \\cos^{-1}u = \\tfrac{\\pi}{2}\\): this holds exactly when the two arguments are equal, \\(x = 1 - x\\).",
          "\\(2x = 1\\).",
        ],
        answer: "\\(x = \\tfrac{1}{2}\\).",
      },
      traps: [
        {
          title: "Reject roots that break the sum-formula validity",
          body:
            "Forming \\(\\frac{f+g}{1-fg}=1\\) can introduce a root where \\(fg>1\\) — there the real sum is \\(\\tfrac{\\pi}{4}+\\pi\\), not \\(\\tfrac{\\pi}{4}\\). Always test each algebraic root against the original equation.",
        },
      ],
    },

    // geometric applications
    {
      kind: "formula" as const,
      slug: "it-geometric-applications",
      name: "Geometric Applications",
      pyqExampleId: "a450fda8-3588-4bb1-9d80-602a4c76aed8",
      intuition:
        "An angle of elevation is just the arctangent of height over horizontal distance. When a problem asks for the angle subtended between two heights, take the difference of two arctangents — exactly the sum/difference formula again.",
      definition:
        "- **Angle of elevation** of a point at height \\(h\\), horizontal distance \\(d\\): \\(\\theta = \\tan^{-1}\\dfrac{h}{d}\\).\n" +
        "- **Angle subtended** by a segment between heights \\(h_1 < h_2\\) at distance \\(d\\): \\(\\tan^{-1}\\dfrac{h_2}{d} - \\tan^{-1}\\dfrac{h_1}{d} = \\tan^{-1}\\dfrac{(h_2-h_1)d}{d^2 + h_1 h_2}\\).\n" +
        "- Conditions linking \\(\\tan^{-1}x, \\tan^{-1}y, \\tan^{-1}z\\) in AP with \\(x,y,z\\) in GP typically force \\(x=y=z\\).",
      formula: {
        label: "Subtended angle",
        latex: "\\tan^{-1}\\dfrac{h_2}{d} - \\tan^{-1}\\dfrac{h_1}{d} = \\tan^{-1}\\dfrac{(h_2-h_1)\\,d}{d^2 + h_1 h_2}",
      },
      authoredExample: {
        prompt: "From a point 12 m from a pole, the top (height 9 m) and a flag at 21 m subtend what extra angle? Find \\(\\tan(\\angle)\\) between the 9 m and 21 m marks.",
        steps: [
          "Angles: \\(\\alpha = \\tan^{-1}\\tfrac{9}{12} = \\tan^{-1}\\tfrac34\\), \\(\\beta = \\tan^{-1}\\tfrac{21}{12} = \\tan^{-1}\\tfrac74\\).",
          "\\(\\tan(\\beta - \\alpha) = \\dfrac{\\frac74 - \\frac34}{1 + \\frac74\\cdot\\frac34} = \\dfrac{1}{1 + \\frac{21}{16}} = \\dfrac{16}{37}\\).",
        ],
        answer: "\\(\\tan(\\angle) = \\dfrac{16}{37}\\).",
      },
    },
  ],
};

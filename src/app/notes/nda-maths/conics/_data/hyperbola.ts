import type { SubtopicNote } from "@/app/notes/_types";

export const HYPERBOLA_NOTE: SubtopicNote = {
  subtopicName: "Hyperbola — Foci and Eccentricity",
  title: "Hyperbola — Foci & Eccentricity",
  oneLineDefinition:
    "A hyperbola is the same family with e > 1; its standard form x²/a² − y²/b² = 1 has foci a distance c from the centre where c² = a² + b² — note the PLUS, the one sign that flips from the ellipse.",
  whyItMatters:
    "Only 4 PYQs, all direct: read a and b from the standard form, use c² = a² + b² (not minus), and the foci and eccentricity follow. The parametric form (a sec θ, b tan θ) appears occasionally.",
  concepts: [
    // standard form
    {
      kind: "formula" as const,
      slug: "conics-hyperbola-standard-form",
      name: "Standard Form, Foci & Eccentricity",
      pyqExampleId: "d41c9935-13d7-4e66-b5bd-81f6acf4027c",
      intuition:
        "The hyperbola mirrors the ellipse with one change: the foci sit FURTHER out than the vertices, so c² = a² + b². Normalise the equation to '= 1', read a and b, and everything follows.",
      definition:
        "For \\(\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1\\):\n" +
        "- **Foci:** \\((\\pm c, 0)\\) with \\(c^2 = a^2 + b^2\\); distance between foci \\(= 2c\\).\n" +
        "- **Eccentricity:** \\(e = \\dfrac{c}{a} > 1\\).\n" +
        "- **Asymptotes:** \\(y = \\pm \\dfrac{b}{a}x\\).\n" +
        "- Always normalise to \\(=1\\) first: \\(25x^2 - 75y^2 = 225\\) becomes \\(\\tfrac{x^2}{9} - \\tfrac{y^2}{3} = 1\\).",
      formula: {
        label: "Hyperbola foci & eccentricity",
        latex: "c^2 = a^2 + b^2, \\qquad e = \\dfrac{c}{a} > 1",
      },
      authoredExample: {
        prompt: "Find the distance between the foci of \\(\\dfrac{x^2}{9} - \\dfrac{y^2}{16} = 1\\).",
        steps: [
          "\\(a^2 = 9,\\ b^2 = 16\\), so \\(c^2 = a^2 + b^2 = 25\\), \\(c = 5\\).",
          "Distance between foci \\(= 2c\\).",
        ],
        answer: "\\(10\\).",
      },
      traps: [
        {
          title: "Hyperbola uses PLUS: c² = a² + b²",
          body:
            "The ellipse has \\(c^2 = a^2 - b^2\\); the hyperbola has \\(c^2 = a^2 + b^2\\). Carrying the ellipse's minus sign into a hyperbola is the single most common slip in this subtopic.",
        },
      ],
    },

    // parametric & properties
    {
      kind: "formula" as const,
      slug: "conics-hyperbola-parametric-properties",
      name: "Parametric Form & θ-Independent Properties",
      pyqExampleId: "5d6036fe-f0a7-4921-8664-f24ff3240513",
      intuition:
        "A point given as (a sec θ, b tan θ) is on a hyperbola — recover the standard form using sec²θ − tan²θ = 1. Some hyperbola families have foci that don't move as a parameter changes, because c² stays constant.",
      definition:
        "- **Parametric point:** \\((a\\sec\\theta,\\ b\\tan\\theta)\\) lies on \\(\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1\\) (use \\(\\sec^2\\theta - \\tan^2\\theta = 1\\)). A point like \\((3\\tan\\theta, 2\\sec\\theta)\\) gives a hyperbola opening along \\(y\\).\n" +
        "- **\\(\\theta\\)-independent foci:** for \\(\\dfrac{x^2}{\\cos^2\\theta} - \\dfrac{y^2}{\\sin^2\\theta} = 1\\), \\(c^2 = \\cos^2\\theta + \\sin^2\\theta = 1\\), so the foci are \\((\\pm 1, 0)\\) regardless of \\(\\theta\\), while \\(e = \\sec\\theta\\).",
      formula: {
        label: "Parametric identity",
        latex: "\\sec^2\\theta - \\tan^2\\theta = 1",
      },
      authoredExample: {
        prompt: "A point on a curve is \\((2\\sec\\theta, \\sqrt{5}\\tan\\theta)\\). Find the eccentricity.",
        steps: [
          "Eliminate \\(\\theta\\): \\(\\dfrac{x^2}{4} - \\dfrac{y^2}{5} = \\sec^2\\theta - \\tan^2\\theta = 1\\), so \\(a^2 = 4,\\ b^2 = 5\\).",
          "\\(c^2 = a^2 + b^2 = 9\\), \\(c = 3\\); \\(e = \\dfrac{c}{a} = \\dfrac{3}{2}\\).",
        ],
        answer: "\\(e = \\dfrac{3}{2}\\).",
      },
    },
  ],
};

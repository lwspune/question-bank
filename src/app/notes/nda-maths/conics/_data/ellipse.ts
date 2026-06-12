import type { SubtopicNote } from "@/app/notes/_types";

export const ELLIPSE_NOTE: SubtopicNote = {
  subtopicName: "Ellipse — Foci, Eccentricity, and Focal Distances",
  title: "Ellipse — Foci, Eccentricity & Focal Distances",
  oneLineDefinition:
    "An ellipse is the set of points whose two focal distances add to a constant 2a; its standard form x²/a² + y²/b² = 1 gives the axes, and c² = a² − b² locates the foci and the eccentricity.",
  whyItMatters:
    "The chapter's largest pocket (14 PYQs). Most questions are direct reads — distance between foci, eccentricity, the constant focal sum — or building the equation from given foci/eccentricity/latus rectum. The one judgement call is which axis is major.",
  concepts: [
    // foci & eccentricity (viz)
    {
      kind: "formula" as const,
      slug: "conics-ellipse-foci-eccentricity",
      name: "Standard Form, Foci & Eccentricity",
      pyqExampleId: "c02c97e5-8e3a-4049-a232-dd4af2f00e8a",
      intuition:
        "Read the standard form to get a and b; the larger denominator sits under the major axis. The foci lie on the major axis a distance c from the centre, where c² = a² − b², and the eccentricity is c/a.",
      definition:
        "For \\(\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1\\) with \\(a > b\\) (major axis along \\(x\\)):\n" +
        "- **Foci:** \\((\\pm c, 0)\\) with \\(c^2 = a^2 - b^2\\); distance between foci \\(= 2c\\).\n" +
        "- **Eccentricity:** \\(e = \\dfrac{c}{a} = \\sqrt{1 - \\dfrac{b^2}{a^2}}\\) (\\(0 < e < 1\\)).\n" +
        "- **Major axis is along the variable with the LARGER denominator.** If \\(b > a\\), swap roles: the major axis is along \\(y\\), foci at \\((0, \\pm c)\\).\n" +
        "- **Parametric point:** \\((a\\cos\\theta,\\ b\\sin\\theta)\\).",
      formula: {
        label: "Foci & eccentricity",
        latex: "c^2 = a^2 - b^2, \\qquad e = \\dfrac{c}{a}",
      },
      visualizationSlug: "conics-ellipse-diagram",
      authoredExample: {
        prompt: "Find the eccentricity of \\(\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1\\).",
        steps: [
          "\\(a^2 = 25,\\ b^2 = 9\\) (major along \\(x\\)), so \\(c^2 = 25 - 9 = 16\\), \\(c = 4\\).",
          "\\(e = \\dfrac{c}{a} = \\dfrac{4}{5}\\).",
        ],
        answer: "\\(e = \\dfrac{4}{5}\\).",
      },
      traps: [
        {
          title: "Major axis = larger denominator",
          body:
            "If the bigger number is under \\(y^2\\), the major axis is vertical and the foci are on the y-axis — and \\(c^2 = (\\text{larger}) - (\\text{smaller})\\) always. Assuming \\(x\\) is the major axis when \\(b>a\\) puts the foci in the wrong place.",
        },
      ],
    },

    // focal distances
    {
      kind: "formula" as const,
      slug: "conics-ellipse-focal-distances",
      name: "The Sum of Focal Distances",
      pyqExampleId: "2e9d38b0-0e93-4402-8cad-fd05415bd0ea",
      intuition:
        "The ellipse's defining property is that the two distances from any point to the two foci always add to the same value — the length of the major axis, 2a. That single fact answers a whole class of questions without coordinates.",
      definition:
        "For any point \\(P\\) on the ellipse with foci \\(F_1, F_2\\):\n" +
        "\\[PF_1 + PF_2 = 2a \\quad (\\text{the major-axis length}).\\]\n" +
        "- This is the locus definition: 'sum of distances from two fixed points is constant'.\n" +
        "- The **latus rectum** has length \\(\\dfrac{2b^2}{a}\\), with endpoints at \\(\\left(\\pm c, \\pm \\tfrac{b^2}{a}\\right)\\).",
      formula: {
        label: "Constant focal sum",
        latex: "PF_1 + PF_2 = 2a, \\qquad \\text{latus rectum} = \\dfrac{2b^2}{a}",
      },
      authoredExample: {
        prompt: "For the ellipse \\(\\dfrac{x^2}{16} + \\dfrac{y^2}{7} = 1\\), what is \\(PF_1 + PF_2\\) for any point \\(P\\)?",
        steps: [
          "Major axis along \\(x\\) with \\(a^2 = 16\\), so \\(a = 4\\).",
          "The sum of focal distances is \\(2a\\).",
        ],
        answer: "\\(8\\).",
      },
      traps: [
        {
          title: "Constant focal sum is \\(2a\\) (major axis), not \\(2b\\)",
          body:
            "\\(PF_1 + PF_2 = 2a\\) uses the SEMI-MAJOR axis \\(a\\) (the larger denominator), giving the full major-axis length. Using \\(2b\\) (the minor axis) or the value \\(a\\) itself gives the wrong constant. For \\(\\tfrac{x^2}{16}+\\tfrac{y^2}{7}=1\\), \\(a=4\\), so the sum is \\(8\\).",
        },
      ],
    },

    // from conditions
    {
      kind: "formula" as const,
      slug: "conics-ellipse-from-conditions",
      name: "Building the Ellipse from Given Data",
      pyqExampleId: "8fb55def-aa2d-4272-8b15-0ce3ce8c29fd",
      intuition:
        "Given foci, eccentricity, latus rectum, or two points, set up the relations among a, b, c and solve. The locus definition (constant focal sum) also lets you build an ellipse from a worded 'sum of distances' setup.",
      definition:
        "Translate the given data into equations in \\(a, b, c\\) (using \\(c = ae\\), \\(c^2 = a^2 - b^2\\), latus rectum \\(= 2b^2/a\\)):\n" +
        "- **Vertices and foci given:** read \\(a\\) from the vertices, \\(c\\) from the foci, then \\(b^2 = a^2 - c^2\\).\n" +
        "- **Two points given:** substitute into \\(\\tfrac{x^2}{A} + \\tfrac{y^2}{B} = 1\\) and solve the linear system in \\(\\tfrac1A, \\tfrac1B\\).\n" +
        "- **Position of a point** \\((x_1,y_1)\\): inside if \\(\\tfrac{x_1^2}{a^2}+\\tfrac{y_1^2}{b^2} < 1\\), on if \\(=1\\), outside if \\(>1\\).\n" +
        "- **Area enclosed** \\(= \\pi a b\\).",
      formula: {
        label: "Key relations",
        latex: "c = ae, \\quad b^2 = a^2 - c^2, \\quad \\text{LR} = \\dfrac{2b^2}{a}",
      },
      authoredExample: {
        prompt: "Find the ellipse with vertices \\((\\pm 5, 0)\\) and foci \\((\\pm 3, 0)\\).",
        steps: [
          "Vertices give \\(a = 5\\); foci give \\(c = 3\\).",
          "\\(b^2 = a^2 - c^2 = 25 - 9 = 16\\).",
        ],
        answer: "\\(\\dfrac{x^2}{25} + \\dfrac{y^2}{16} = 1\\).",
      },
      traps: [
        {
          title: "Ellipse latus rectum is \\(\\dfrac{2b^2}{a}\\) — semi-MINOR squared over semi-major",
          body:
            "The latus rectum is \\(\\dfrac{2b^2}{a}\\): the SMALLER axis squared on top, the LARGER axis on the bottom. Flipping it to \\(\\dfrac{2a^2}{b}\\) makes it longer than the major axis, which is impossible for an ellipse.",
        },
      ],
    },
  ],
};

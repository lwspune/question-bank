import type { SubtopicNote } from "@/app/notes/_types";

export const IDENTIFICATION_NOTE: SubtopicNote = {
  subtopicName: "Conic Sections — Identification and Eccentricity Comparison",
  title: "Conic Sections — Identification & Eccentricity",
  oneLineDefinition:
    "Every conic is the locus of points whose distance from a fixed focus is a constant multiple — the eccentricity e — of the distance from a fixed directrix. The value of e alone says which conic it is.",
  whyItMatters:
    "This is the chapter's organising idea. One number, e, separates circle (0), ellipse (<1), parabola (=1), and hyperbola (>1). Knowing this — and how to wrestle a messy second-degree equation into a standard form — lets you classify any conic at a glance.",
  concepts: [
    // FOUNDATION — what is a conic
    {
      kind: "formula" as const,
      slug: "conics-what-is-a-conic",
      name: "What a Conic Is — Focus, Directrix, Eccentricity",
      intuition:
        "A conic is born from one rule: stay a fixed ratio away from a point (the focus) compared with a line (the directrix). That ratio is the eccentricity, and as you dial it from 0 upward the same rule traces a circle, then an ellipse, then a parabola, then a hyperbola.",
      definition:
        "A **conic** is the locus of a point \\(P\\) for which \\(\\dfrac{PF}{PM} = e\\), where \\(F\\) is the **focus**, the line is the **directrix**, \\(PM\\) is the perpendicular distance to it, and \\(e\\ge 0\\) is the **eccentricity**. The value of \\(e\\) classifies the curve:\n" +
        "- \\(e = 0\\): **circle**\n" +
        "- \\(0 < e < 1\\): **ellipse**\n" +
        "- \\(e = 1\\): **parabola**\n" +
        "- \\(e > 1\\): **hyperbola**\n" +
        "The **latus rectum** is the focal chord perpendicular to the axis; it recurs in every conic's formulas.",
      formula: {
        label: "Focus–directrix definition",
        latex: "\\dfrac{PF}{PM} = e",
      },
      authoredExample: {
        prompt: "A conic has eccentricity \\(e = \\dfrac{3}{5}\\). Which conic is it?",
        steps: [
          "Compare \\(e\\) with 1: \\(\\tfrac{3}{5} < 1\\).",
          "An eccentricity strictly between 0 and 1 is an ellipse.",
        ],
        answer: "An ellipse.",
      },
      practiceSet: [
        { prompt: "Eccentricity of a circle?", answer: "\\(e = 0\\)." },
        { prompt: "A conic with \\(e = \\sqrt{2}\\) is a …?", answer: "Hyperbola (\\(e > 1\\))." },
        { prompt: "A conic with \\(e = 1\\) is a …?", answer: "Parabola." },
      ],
    },

    // eccentricity classification & comparison
    {
      kind: "formula" as const,
      slug: "conics-eccentricity-classification",
      name: "Eccentricity Values & Comparing Conics",
      pyqExampleId: "689a67c6-b1c1-48ce-b006-3ad0fbb59e0b",
      intuition:
        "Each conic has its own eccentricity formula in terms of a and b. Reading the standard form gives a, b, and hence e — and questions that compare two conics (or fix a parameter so they share foci) just set their c-values or e-values against each other.",
      definition:
        "From the standard forms:\n" +
        "- **Ellipse** \\(\\tfrac{x^2}{a^2}+\\tfrac{y^2}{b^2}=1\\) (\\(a>b\\)): \\(c^2 = a^2 - b^2\\), \\(e = \\tfrac{c}{a} < 1\\).\n" +
        "- **Parabola:** \\(e = 1\\) always.\n" +
        "- **Hyperbola** \\(\\tfrac{x^2}{a^2}-\\tfrac{y^2}{b^2}=1\\): \\(c^2 = a^2 + b^2\\), \\(e = \\tfrac{c}{a} > 1\\).\n" +
        "A minus sign between the squared terms (after normalising to \\(=1\\)) signals a hyperbola; a plus sign with unequal denominators signals an ellipse. Shared-foci conditions equate the two \\(c\\) values.",
      formula: {
        label: "Eccentricities",
        latex: "\\text{ellipse } e=\\sqrt{1-\\tfrac{b^2}{a^2}}, \\quad \\text{hyperbola } e=\\sqrt{1+\\tfrac{b^2}{a^2}}",
      },
      authoredExample: {
        prompt: "Find the eccentricity of the hyperbola \\(\\dfrac{x^2}{16} - \\dfrac{y^2}{9} = 1\\).",
        steps: [
          "\\(a^2 = 16,\\ b^2 = 9\\), so \\(c^2 = a^2 + b^2 = 25\\), \\(c = 5\\).",
          "\\(e = \\dfrac{c}{a} = \\dfrac{5}{4}\\).",
        ],
        answer: "\\(e = \\dfrac{5}{4}\\).",
      },
    },

    // general second-degree identification
    {
      kind: "formula" as const,
      slug: "conics-general-equation-identification",
      name: "Identifying a General Second-Degree Equation",
      pyqExampleId: "4f521bba-b815-42f5-8142-2b0c193cc9e8",
      intuition:
        "A second-degree equation in x and y can be a genuine conic — or a degenerate one (a point, a line, a pair of lines). Completing the square in both variables collapses it to a recognisable standard form, and the right-hand side tells you whether it is real, empty, or a single point.",
      definition:
        "For an equation \\(Ax^2 + Cy^2 + Dx + Ey + F = 0\\) (no \\(xy\\) term), **complete the square** in \\(x\\) and \\(y\\):\n" +
        "- Equal positive coefficients on the squares → circle; unequal same-sign → ellipse; opposite signs → hyperbola; one square missing → parabola.\n" +
        "- **Degenerate cases:** if completing the square gives \\((x-h)^2 + k(y-j)^2 = 0\\), it is a single **point**; a negative right side gives **no real locus**; a difference equal to 0 gives a **pair of straight lines**.\n" +
        "- A family like \\(\\dfrac{x^2}{p-k}+\\dfrac{y^2}{q-k}=1\\) is an ellipse when both denominators are positive and unequal, a hyperbola when they have opposite signs.",
      formula: {
        label: "Complete the square to classify",
        latex: "Ax^2 + Cy^2 + Dx + Ey + F = 0 \\ \\xrightarrow{\\text{complete squares}}\\ \\text{standard form}",
      },
      authoredExample: {
        prompt: "What does \\(x^2 + 4y^2 - 2x + 8y + 5 = 0\\) represent?",
        steps: [
          "Group and complete the square: \\((x^2 - 2x) + 4(y^2 + 2y) + 5 = 0\\).",
          "\\((x-1)^2 - 1 + 4[(y+1)^2 - 1] + 5 = 0 \\Rightarrow (x-1)^2 + 4(y+1)^2 = 0\\).",
          "A sum of squares equal to 0 forces both terms to vanish.",
        ],
        answer: "A single point \\((1, -1)\\).",
      },
      traps: [
        {
          title: "A second-degree equation is not always a curve",
          body:
            "After completing the square, check the right-hand side: \\(=0\\) can mean a point or a pair of lines, and a negative value means no real points at all. Don't assume every \\(Ax^2+Cy^2+\\cdots=0\\) is an ellipse or hyperbola.",
        },
      ],
    },
  ],
};

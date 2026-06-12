import type { SubtopicNote } from "@/app/notes/_types";

export const AREA_NOTE: SubtopicNote = {
  subtopicName: "Area Under Curves",
  title: "Area Under and Between Curves",
  oneLineDefinition:
    "Area is the integral of the gap between curves; use the absolute value (or split at intersections) so every piece counts positively, and exploit symmetry to halve the work.",
  whyItMatters:
    "A small but recurring subtopic (3 PYQs). The recipe is fixed: find the intersection points (the limits), integrate top-minus-bottom, and take the magnitude so area never comes out negative.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "area-under-curves",
      name: "Area between curves",
      intuition:
        "Area is always positive, so set up the integral of the upper curve minus the lower one between their intersection points. When a curve dips below the axis, the |·| (or a split) keeps the area positive; symmetry about a line lets you integrate half and double.",
      definition:
        "The area recipe:\n" +
        "- Area between \\(y=f(x)\\) and the x-axis on \\([a,b]\\) is \\(\\displaystyle\\int_a^b |f(x)|\\,dx\\).\n" +
        "- Area between two curves is \\(\\displaystyle\\int_a^b |f(x)-g(x)|\\,dx\\), with \\(a,b\\) the intersection points (solve \\(f=g\\)).\n" +
        "- Use **symmetry**: if the region is symmetric about a vertical line, integrate one half and double.",
      visualizationSlug: "defint-area-region",
      formula: {
        label: "Area as a definite integral",
        latex:
          "A = \\int_a^b |f(x)|\\,dx \\qquad " +
          "A = \\int_a^b |f(x)-g(x)|\\,dx",
      },
      authoredExample: {
        prompt: "Find the area enclosed between \\(y=x^2\\) and \\(y=x\\).",
        steps: [
          "Intersections: \\(x^2=x \\Rightarrow x=0,1\\).",
          "On \\([0,1]\\), \\(x \\ge x^2\\), so area \\(=\\int_0^1 (x-x^2)\\,dx\\).",
          "\\(=\\big[\\tfrac{x^2}{2}-\\tfrac{x^3}{3}\\big]_0^1 = \\tfrac12-\\tfrac13\\).",
        ],
        answer: "\\(\\frac16\\).",
      },
      selfCheckExample: {
        prompt: "Find the area bounded by \\(y=|x^2-1|\\) and the x-axis between its roots.",
        steps: [
          "Roots of \\(x^2-1\\): \\(x=\\pm1\\). On \\([-1,1]\\), \\(x^2-1\\le 0\\), so \\(|x^2-1| = 1-x^2\\).",
          "By symmetry, area \\(= 2\\int_0^1 (1-x^2)\\,dx = 2\\big[x-\\tfrac{x^3}{3}\\big]_0^1 = 2\\cdot\\tfrac23\\).",
        ],
        answer: "\\(\\frac43\\).",
      },
      practiceSet: [
        { prompt: "Area between \\(y=f(x)\\) and x-axis on \\([a,b]\\)?", answer: "\\(\\int_a^b |f(x)|\\,dx\\)" },
        { prompt: "How do you find the limits for area between two curves?", answer: "Solve \\(f(x)=g(x)\\)" },
        { prompt: "Area between \\(y=4-x^2\\) and the x-axis on \\([-2,2]\\)?", answer: "\\(2\\int_0^2(4-x^2)\\,dx = \\frac{32}{3}\\)", method: "symmetry, even function" },
      ],
      pyqExampleId: "4830129d-91ba-4b40-a48d-254c932bafd8", // area of |x²-1| = 4/3
      traps: [
        {
          title: "Area is unsigned — use the absolute value",
          body:
            "Plain \\(\\int_{-1}^{1}(x^2-1)\\,dx\\) gives a NEGATIVE number, which cannot be an area. Take \\(|f|\\) (or split at the roots and add magnitudes) so the region below the axis still adds positively.",
        },
      ],
    },
  ],
};

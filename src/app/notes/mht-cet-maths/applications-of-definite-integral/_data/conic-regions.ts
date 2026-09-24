import type { SubtopicNote } from "@/app/notes/_types";

export const CONIC_REGIONS_NOTE: SubtopicNote = {
  subtopicName: "Areas of Circles, Ellipses and Hyperbolas — Sectors, Segments and Standard Integrals",
  title: "Areas of Circles, Ellipses and Hyperbolas — Sectors, Segments and Standard Integrals",
  oneLineDefinition:
    "Circle, ellipse and hyperbola regions need one integral learnt cold — ∫√(a² − x²) dx — plus the sector and quarter-ellipse shortcuts that avoid integrating at all.",
  whyItMatters:
    "9 PYQs at 44% HARD — the one page in this chapter where a formula must be memorised, because ∫√(a² − x²) dx cannot be improvised under time pressure. " +
    "The recurring stems are a circle cut by a vertical line (the minor segment), the region between an ellipse's arc and its chord in the first quadrant, and a circle intersected with a parabola; the hyperbola's latus-rectum area appears once with a key that counts both branches. " +
    "Half of these are answered faster by geometry — a sector, a quarter-ellipse minus a triangle — than by any integral.",
  concepts: [
    // 1 — circle standard integral and sector
    {
      kind: "formula" as const,
      slug: "cetadi-circle-standard-integral-and-sector",
      name: "The Circle Integral ∫√(a² − x²) dx, Quarter Discs and Sectors",
      intuition:
        "The area under \\(y = \\sqrt{a^2 - x^2}\\) from \\(0\\) to \\(a\\) is a quarter disc, \\(\\dfrac{\\pi a^2}{4}\\) — which is exactly what the standard antiderivative gives at those limits. For a wedge bounded by a line through the centre, the sector formula \\(\\dfrac12 r^2\\theta\\) needs no integral at all.",
      definition:
        "- \\(\\int\\sqrt{a^2 - x^2}\\,dx = \\dfrac{x}{2}\\sqrt{a^2 - x^2} + \\dfrac{a^2}{2}\\sin^{-1}\\dfrac{x}{a}\\). Learn it cold; every circle question uses it.\n" +
        "- Quarter disc: \\(\\int_0^a\\sqrt{a^2 - x^2}\\,dx = \\dfrac{\\pi a^2}{4}\\). So the area in the first quadrant inside \\(x^2 + y^2 = 4\\) between \\(x = 0\\) and \\(x = 2\\) is \\(\\pi\\); the upper half of \\(y = \\sqrt{49 - x^2}\\) is \\(\\dfrac{49\\pi}{2}\\).\n" +
        "- **Sector**: the region bounded by the circle \\(x^2 + y^2 = 4\\), the x-axis and the line \\(x = y\\sqrt3\\) (which makes \\(30^\\circ\\) with the axis) has area \\(\\dfrac12 r^2\\theta = \\dfrac12\\cdot4\\cdot\\dfrac{\\pi}{6} = \\dfrac{\\pi}{3}\\).\n" +
        "- Convert the line's slope to an angle: \\(y = \\dfrac{x}{\\sqrt3}\\) is \\(\\theta = \\dfrac{\\pi}{6}\\); \\(y = x\\) is \\(\\dfrac{\\pi}{4}\\).",
      formula: {
        label: "Circle integral and sector",
        latex:
          "\\int\\sqrt{a^2 - x^2}\\,dx = \\frac{x}{2}\\sqrt{a^2 - x^2} + \\frac{a^2}{2}\\sin^{-1}\\frac{x}{a} \\qquad \\text{sector} = \\frac12 r^2\\theta",
      },
      authoredExample: {
        prompt: "Find the area in the first quadrant bounded by the circle \\(x^2 + y^2 = 9\\), the x-axis and the line \\(y = x\\).",
        steps: [
          "The line \\(y = x\\) makes \\(\\dfrac{\\pi}{4}\\) with the x-axis, so the region is a sector of angle \\(\\dfrac{\\pi}{4}\\) and radius \\(3\\).",
          "Area \\(= \\dfrac12\\cdot9\\cdot\\dfrac{\\pi}{4}\\).",
        ],
        answer: "\\(\\dfrac{9\\pi}{8}\\) sq. units",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^3\\sqrt{9 - x^2}\\,dx\\) and say what region it measures.",
        steps: [
          "Standard result at \\(x = 3\\): \\(0 + \\dfrac92\\sin^{-1}1 = \\dfrac92\\cdot\\dfrac{\\pi}{2}\\).",
          "It is the quarter disc of radius \\(3\\).",
        ],
        answer: "\\(\\dfrac{9\\pi}{4}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\int_0^2\\sqrt{4 - x^2}\\,dx = ?\\)",
          answer: "\\(\\pi\\)",
        },
        {
          prompt: "Area of the semicircle \\(y = \\sqrt{49 - x^2}\\) above the x-axis?",
          answer: "\\(\\dfrac{49\\pi}{2}\\)",
        },
        {
          prompt: "Sector of radius \\(2\\) and angle \\(\\pi/6\\)?",
          answer: "\\(\\dfrac{\\pi}{3}\\)",
        },
        {
          prompt: "Angle made by \\(x = y\\sqrt3\\) with the x-axis?",
          answer: "\\(30^\\circ\\) (\\(\\pi/6\\)).",
        },
      ],
      pyqExampleId: "4137b1b4-1964-4bc1-895d-8d38f7268a91",
      traps: [
        {
          title: "Reading x = y√3 as a 60° line",
          body:
            "\\(x = y\\sqrt3\\) is \\(y = \\dfrac{x}{\\sqrt3}\\), slope \\(\\dfrac{1}{\\sqrt3}\\), angle \\(30^\\circ\\). The \\(60^\\circ\\) reading gives \\(\\dfrac{2\\pi}{3}\\), which is offered.",
        },
      ],
    },

    // 2 — segment cut by a line
    {
      kind: "formula" as const,
      slug: "cetadi-circle-segment-cut-by-a-line",
      name: "The Smaller Segment of a Circle Cut by a Vertical Line",
      intuition:
        "The line \\(x = c\\) slices a cap off the circle. The cap is symmetric about the x-axis, so its area is twice the integral of \\(\\sqrt{a^2 - x^2}\\) from \\(c\\) to \\(a\\) — a single application of the standard result.",
      definition:
        "- Smaller part of \\(x^2 + y^2 = a^2\\) cut off by \\(x = c\\) (\\(0 < c < a\\)): \\(A = 2\\int_c^a\\sqrt{a^2 - x^2}\\,dx\\).\n" +
        "- \\(c = \\dfrac{a}{\\sqrt2}\\): \\(A = 2\\left[\\dfrac{x}{2}\\sqrt{a^2 - x^2} + \\dfrac{a^2}{2}\\sin^{-1}\\dfrac{x}{a}\\right]_{a/\\sqrt2}^{a} = 2\\left[\\dfrac{\\pi a^2}{4} - \\dfrac{a^2}{4} - \\dfrac{\\pi a^2}{8}\\right] = \\dfrac{a^2}{2}\\left(\\dfrac{\\pi}{2} - 1\\right)\\).\n" +
        "- \\(x^2 + y^2 = 4\\), \\(x = 1\\): \\(2\\left[\\pi - \\left(\\dfrac{\\sqrt3}{2} + \\dfrac{\\pi}{3}\\right)\\right] = \\dfrac{4\\pi}{3} - \\sqrt3\\).\n" +
        "- Geometric check: segment \\(=\\) sector \\(-\\) triangle, i.e. \\(\\dfrac12 a^2(2\\theta) - \\dfrac12 a^2\\sin 2\\theta\\) with \\(\\cos\\theta = \\dfrac{c}{a}\\). For \\(a = 2\\), \\(c = 1\\): \\(\\theta = \\dfrac{\\pi}{3}\\), giving \\(\\dfrac{4\\pi}{3} - 2\\sin\\dfrac{2\\pi}{3} = \\dfrac{4\\pi}{3} - \\sqrt3\\).",
      formula: {
        label: "Minor segment",
        latex:
          "A = 2\\int_c^a\\sqrt{a^2 - x^2}\\,dx = a^2\\theta - \\frac{a^2}{2}\\sin 2\\theta, \\quad \\cos\\theta = \\frac{c}{a}",
      },
      authoredExample: {
        prompt: "Find the area of the smaller part of the circle \\(x^2 + y^2 = 16\\) cut off by the line \\(x = 2\\).",
        steps: [
          "\\(a = 4\\), \\(c = 2\\): \\(\\cos\\theta = \\dfrac12\\), \\(\\theta = \\dfrac{\\pi}{3}\\).",
          "Segment \\(= a^2\\theta - \\dfrac{a^2}{2}\\sin 2\\theta = 16\\cdot\\dfrac{\\pi}{3} - 8\\cdot\\dfrac{\\sqrt3}{2}\\).",
        ],
        answer: "\\(\\dfrac{16\\pi}{3} - 4\\sqrt3\\) sq. units",
      },
      selfCheckExample: {
        prompt: "Find the area of the smaller part of \\(x^2 + y^2 = 9\\) cut off by \\(x = \\dfrac{3}{\\sqrt2}\\).",
        steps: [
          "The general result with \\(c = \\dfrac{a}{\\sqrt2}\\): \\(\\dfrac{a^2}{2}\\left(\\dfrac{\\pi}{2} - 1\\right)\\) with \\(a = 3\\).",
        ],
        answer: "\\(\\dfrac92\\left(\\dfrac{\\pi}{2} - 1\\right)\\) sq. units",
      },
      practiceSet: [
        {
          prompt: "For \\(x^2 + y^2 = 4\\) cut by \\(x = 1\\), \\(\\theta = ?\\)",
          answer: "\\(\\dfrac{\\pi}{3}\\)",
        },
        {
          prompt: "\\(2\\int_1^2\\sqrt{4 - x^2}\\,dx = ?\\)",
          answer: "\\(\\dfrac{4\\pi}{3} - \\sqrt3\\)",
        },
        {
          prompt: "Segment of \\(x^2 + y^2 = a^2\\) cut by \\(x = a/\\sqrt2\\)?",
          answer: "\\(\\dfrac{a^2}{2}\\left(\\dfrac{\\pi}{2} - 1\\right)\\)",
        },
        {
          prompt: "Larger part of \\(x^2 + y^2 = 4\\) cut by \\(x = 1\\)?",
          answer: "\\(\\dfrac{8\\pi}{3} + \\sqrt3\\)",
          method: "\\(4\\pi\\) minus the minor segment.",
        },
      ],
      pyqExampleId: "838b0b4f-bce3-4fed-b840-bd05977c0897",
      traps: [
        {
          title: "Forgetting the factor 2 for the lower half",
          body:
            "\\(\\int_c^a\\sqrt{a^2 - x^2}\\,dx\\) is only the part above the x-axis. The segment is symmetric, so double it; the un-doubled value is always an option.",
        },
      ],
    },

    // 3 — ellipse quadrant minus triangle
    {
      kind: "formula" as const,
      slug: "cetadi-ellipse-quadrant-minus-triangle",
      name: "Ellipse Arc Minus Chord: Quarter-Ellipse Minus Triangle",
      intuition:
        "In the first quadrant the ellipse \\(\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1\\) and its chord \\(\\dfrac{x}{a} + \\dfrac{y}{b} = 1\\) both run from \\((a, 0)\\) to \\((0, b)\\). The region between them is the quarter-ellipse minus the triangle under the chord — two known areas, no integral.",
      definition:
        "- Ellipse area \\(= \\pi ab\\); quarter-ellipse \\(= \\dfrac{\\pi ab}{4}\\); triangle with the axes \\(= \\dfrac{ab}{2}\\).\n" +
        "- Area between arc and chord \\(= \\dfrac{\\pi ab}{4} - \\dfrac{ab}{2} = \\dfrac{ab}{4}(\\pi - 2)\\).\n" +
        "- \\(a = 5\\), \\(b = 3\\): \\(\\dfrac{15}{4}(\\pi - 2)\\); \\(a = 3\\), \\(b = 2\\): \\(\\dfrac{3}{2}(\\pi - 2)\\).\n" +
        "- By integration the quarter-ellipse is \\(\\int_0^a\\dfrac{b}{a}\\sqrt{a^2 - x^2}\\,dx = \\dfrac{b}{a}\\cdot\\dfrac{\\pi a^2}{4}\\) — the circle integral scaled by \\(\\dfrac{b}{a}\\).",
      formula: {
        label: "Arc minus chord",
        latex:
          "A = \\frac{\\pi ab}{4} - \\frac{ab}{2} = \\frac{ab}{4}(\\pi - 2)",
      },
      authoredExample: {
        prompt: "Find the area between the arc of \\(\\dfrac{x^2}{16} + \\dfrac{y^2}{4} = 1\\) in the first quadrant and the chord joining \\((4, 0)\\) to \\((0, 2)\\).",
        steps: [
          "\\(a = 4\\), \\(b = 2\\): quarter-ellipse \\(= \\dfrac{\\pi\\cdot8}{4} = 2\\pi\\); triangle \\(= \\dfrac{4\\cdot2}{2} = 4\\).",
          "Difference \\(2\\pi - 4 = 2(\\pi - 2)\\).",
        ],
        answer: "\\(2(\\pi - 2)\\) sq. units",
      },
      selfCheckExample: {
        prompt: "Find the area of the region inside \\(\\dfrac{x^2}{9} + \\dfrac{y^2}{4} = 1\\) and in the first quadrant.",
        steps: [
          "Quarter-ellipse with \\(a = 3\\), \\(b = 2\\): \\(\\dfrac{\\pi\\cdot6}{4}\\).",
        ],
        answer: "\\(\\dfrac{3\\pi}{2}\\) sq. units",
      },
      practiceSet: [
        {
          prompt: "Area of \\(\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1\\)?",
          answer: "\\(15\\pi\\)",
        },
        {
          prompt: "Triangle formed by \\(\\dfrac{x}{5} + \\dfrac{y}{3} = 1\\) with the axes?",
          answer: "\\(\\dfrac{15}{2}\\)",
        },
        {
          prompt: "Arc-minus-chord area for \\(a = 5\\), \\(b = 3\\)?",
          answer: "\\(\\dfrac{15}{4}(\\pi - 2)\\)",
        },
        {
          prompt: "\\(\\int_0^3\\dfrac23\\sqrt{9 - x^2}\\,dx = ?\\)",
          answer: "\\(\\dfrac{3\\pi}{2}\\)",
        },
      ],
      pyqExampleId: "561c3c79-0073-4066-9488-a156a3c56339",
      traps: [
        {
          title: "Using πab/2 for the quadrant",
          body:
            "A quadrant is a QUARTER of the ellipse, \\(\\dfrac{\\pi ab}{4}\\). Halving instead of quartering doubles the first term and lands on \\(\\dfrac{15}{2}(\\pi - 2)\\)-type distractors.",
        },
      ],
    },

    // 4 — hyperbola and mixed regions
    {
      kind: "formula" as const,
      slug: "cetadi-hyperbola-and-mixed-regions",
      name: "Hyperbola Segments and Circle-Parabola Regions",
      intuition:
        "\\(\\int\\sqrt{x^2 - a^2}\\,dx\\) is the hyperbola's counterpart of the circle integral, with a log where the circle has an arcsine. A region bounded partly by a circle and partly by a parabola is split at the curve where the boundary changes — a half-disc plus a parabolic cap.",
      definition:
        "- \\(\\int\\sqrt{x^2 - a^2}\\,dx = \\dfrac{x}{2}\\sqrt{x^2 - a^2} - \\dfrac{a^2}{2}\\log\\left|x + \\sqrt{x^2 - a^2}\\right|\\).\n" +
        "- \\(x^2 - y^2 = 9\\): \\(a = b = 3\\), \\(e = \\sqrt2\\), latus rectum at \\(x = 3\\sqrt2\\). Area between the right branch and that chord: \\(2\\int_3^{3\\sqrt2}\\sqrt{x^2 - 9}\\,dx = 9\\left[\\sqrt2 - \\log(\\sqrt2 + 1)\\right]\\). The official key for the 2023 sitting marks \\(18[\\dots]\\) — both branches against both latus recta; on the paper, choose the key.\n" +
        "- \\(\\{x^2 + y^2 \\le 1\\} \\cap \\{y^2 \\le 1 - x\\}\\): for \\(x \\le 0\\) the parabola condition is automatic inside the disc, giving a half-disc \\(\\dfrac{\\pi}{2}\\); for \\(0 \\le x \\le 1\\) the parabola is the tighter bound, giving \\(\\int_0^1 2\\sqrt{1 - x}\\,dx = \\dfrac43\\). Total \\(\\dfrac{\\pi}{2} + \\dfrac43\\).\n" +
        "- Method for any mixed region: find the x-values where the binding boundary changes, and sum simple pieces (half-disc, parabolic cap, triangle).",
      formula: {
        label: "Hyperbola integral and the circle-parabola region",
        latex:
          "\\int\\sqrt{x^2 - a^2}\\,dx = \\frac{x}{2}\\sqrt{x^2 - a^2} - \\frac{a^2}{2}\\log\\left|x + \\sqrt{x^2 - a^2}\\right| \\qquad \\{x^2 + y^2 \\le 1,\\ y^2 \\le 1 - x\\}:\\ \\frac{\\pi}{2} + \\frac43",
      },
      authoredExample: {
        prompt: "Find the area of the region \(\{(x, y):\ x^2 + y^2 \le 4 \text{ and } y^2 \le 4 - 2x\}\).",
        steps: [
          "For \(x \le 0\) the parabola condition \(y^2 \le 4 - 2x\) holds automatically inside the disc, because \(4 - x^2 \le 4 - 2x\) there; so that part is the left half-disc of radius \(2\): \(2\pi\).",
          "For \(0 \le x \le 2\) the parabola is the tighter bound and meets the axis at \(x = 2\), the edge of the disc: cap \(= \int_0^2 2\sqrt{4 - 2x}\,dx = 2\left[-\dfrac{(4 - 2x)^{3/2}}{3}\right]_0^2 = \dfrac{16}{3}\).",
          "Total \\(2\\pi + \\dfrac{16}{3}\\).",
        ],
        answer: "\\(2\\pi + \\dfrac{16}{3}\\) sq. units",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_2^{4}\\sqrt{x^2 - 4}\\,dx\\).",
        steps: [
          "Standard result with \\(a = 2\\): \\(\\left[\\dfrac{x}{2}\\sqrt{x^2 - 4} - 2\\log\\left(x + \\sqrt{x^2 - 4}\\right)\\right]_2^4\\).",
          "At \\(4\\): \\(2\\sqrt{12} - 2\\log(4 + 2\\sqrt3) = 4\\sqrt3 - 2\\log(4 + 2\\sqrt3)\\). At \\(2\\): \\(0 - 2\\log 2\\).",
          "Difference: \\(4\\sqrt3 - 2\\log\\dfrac{4 + 2\\sqrt3}{2} = 4\\sqrt3 - 2\\log(2 + \\sqrt3)\\).",
        ],
        answer: "\\(4\\sqrt3 - 2\\log(2 + \\sqrt3)\\)",
      },
      practiceSet: [
        {
          prompt: "Eccentricity of \\(x^2 - y^2 = 9\\)?",
          answer: "\\(\\sqrt2\\)",
        },
        {
          prompt: "Latus rectum of \\(x^2 - y^2 = 9\\) is the line \\(x = ?\\)",
          answer: "\\(3\\sqrt2\\)",
        },
        {
          prompt: "\\(\\int_0^1 2\\sqrt{1 - x}\\,dx = ?\\)",
          answer: "\\(\\dfrac43\\)",
        },
        {
          prompt: "Area of the half-disc \\(x^2 + y^2 \\le 1\\), \\(x \\le 0\\)?",
          answer: "\\(\\dfrac{\\pi}{2}\\)",
        },
      ],
      pyqExampleId: "b4f5eb9a-1f58-4677-819b-dc609b8dfa56",
      traps: [
        {
          title: "Setting up the circle-parabola region as one integral",
          body:
            "The binding boundary is the circle for \\(x \\le 0\\) and the parabola for \\(x \\ge 0\\). One integral from \\(-1\\) to \\(1\\) with either curve gives the wrong number; split at \\(x = 0\\) and add a half-disc to a parabolic cap.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Area Between Two Curves — the intersection-first setup",
      href: "/notes/mht-cet-maths/applications-of-definite-integral/cetadi-area-between-curves",
    },
    {
      label: "Definite Integration — Substitution with changed limits (x = a sin θ for the circle integral)",
      href: "/notes/mht-cet-maths/definite-integration/cetdi-evaluation-and-substitution",
    },
  ],
};

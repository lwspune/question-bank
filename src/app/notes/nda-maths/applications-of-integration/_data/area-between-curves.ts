import type { SubtopicNote } from "@/app/notes/_types";

export const AREA_BETWEEN_CURVES_NOTE: SubtopicNote = {
  subtopicName: "Area Between Two Curves and Intersection Points",
  title: "Area Between Two Curves & Intersection Points",
  oneLineDefinition:
    "The area trapped between two curves is the integral of the gap between them — top curve minus bottom curve — taken between the x-values where they cross.",
  whyItMatters:
    "The chapter's second pocket (9 PYQs, 2 HARD). Every question reduces to one routine: find where the curves meet (those are your limits), decide which curve is on top, and integrate the difference. " +
    "The errors are always in steps 1 and 2 — solving the intersection wrong, or subtracting the wrong way round. The hard variants dress this up as a quarter-circle minus a sine curve, or two parabolas needing horizontal strips, but the engine is the same.",
  concepts: [
    // 1 — finding intersection points (count + limits)
    {
      kind: "formula" as const,
      slug: "aoi-intersection-points",
      name: "Finding Where Two Curves Meet",
      pyqExampleId: "52117f1f-4fd7-4c42-a534-8eb316a097db",
      intuition:
        "Two curves cross where they share the same point — so set their equations equal and solve. The solutions are the x-values (or y-values) that become the limits of your area integral, and counting them answers 'how many points of intersection' directly.",
      definition:
        "To find the **points of intersection** of \\(y = f(x)\\) and \\(y = g(x)\\):\n" +
        "- **Set them equal:** solve \\(f(x) = g(x)\\). Each solution \\(x\\) gives one intersection; substitute back for the matching \\(y\\).\n" +
        "- The smallest and largest solutions become the **limits** \\(a\\) and \\(b\\) of the area integral.\n" +
        "- With a **modulus** present, split by sign or square carefully: e.g. \\(x^2 = 2|x|\\) gives \\(|x|(|x| - 2) = 0\\), so \\(|x| = 0\\) or \\(2\\) — the points \\((0,0)\\), \\((2, 4)\\), \\((-2, 4)\\), i.e. **3** intersections.",
      formula: {
        label: "Intersection condition",
        latex: "f(x) = g(x) \\ \\Rightarrow\\ \\text{the } x\\text{-values where the curves cross}",
      },
      authoredExample: {
        prompt:
          "How many times do \\(y = x^2\\) and \\(y = x + 2\\) intersect, and where?",
        steps: [
          "Set equal: \\(x^2 = x + 2 \\Rightarrow x^2 - x - 2 = 0 \\Rightarrow (x-2)(x+1) = 0.\\)",
          "Solutions \\(x = 2\\) and \\(x = -1\\) — two crossings.",
          "Matching points: \\((2, 4)\\) and \\((-1, 1)\\).",
        ],
        answer: "Two points: \\((2, 4)\\) and \\((-1, 1)\\).",
      },
      traps: [
        {
          title: "A modulus can create extra intersections",
          body:
            "Solving \\(x^2 = 2x\\) gives 2 points, but \\(x^2 = 2|x|\\) gives 3 — the modulus mirrors a solution to the negative side. Always account for both signs of \\(|x|\\) when counting crossings.",
        },
      ],
    },

    // 2 — area between two curves: top minus bottom (set S16 EASY + y=x,y=x^3)
    {
      kind: "formula" as const,
      slug: "aoi-top-minus-bottom",
      name: "Area Between Curves: Top Minus Bottom",
      pyqExampleId: "8b7cd06e-9003-4a67-b80a-3e4b603a2ca5",
      intuition:
        "Between two curves, a thin vertical strip runs from the lower curve up to the upper curve, so its height is (top − bottom). Integrate that gap between the crossing points and you get the enclosed area — automatically positive when you subtract in the right order.",
      definition:
        "For two curves with \\(f(x) \\ge g(x)\\) on \\([a, b]\\) (so \\(f\\) is the **upper** curve):\n" +
        "\\[A = \\int_a^b \\bigl(f(x) - g(x)\\bigr)\\,dx,\\]\n" +
        "where \\(a, b\\) are the x-coordinates of the intersection points.\n" +
        "- **Decide top vs bottom** by testing one point between the crossings (or by sketching). On \\([0, 1]\\), \\(y = 2x - x^2\\) lies above \\(y = 0\\); \\(y = x\\) lies above \\(y = x^3\\).\n" +
        "- The result is the same whether the region is above or below the axis — only the **relative** position of the two curves matters.",
      formula: {
        label: "Area between curves",
        latex: "A = \\int_a^b \\bigl(\\text{top} - \\text{bottom}\\bigr)\\,dx",
      },
      visualizationSlug: "aoi-area-between-curves-region",
      authoredExample: {
        prompt:
          "Find the area between \\(y = x\\) and \\(y = x^3\\) in the first quadrant.",
        steps: [
          "Intersections: \\(x = x^3 \\Rightarrow x(x^2 - 1) = 0\\), so \\(x = 0, 1\\) in the first quadrant.",
          "On \\((0, 1)\\), \\(x > x^3\\), so \\(y = x\\) is on top: \\(A = \\int_0^1 (x - x^3)\\,dx.\\)",
          "\\(= \\left[\\tfrac{x^2}{2} - \\tfrac{x^4}{4}\\right]_0^1 = \\tfrac{1}{2} - \\tfrac{1}{4}.\\)",
        ],
        answer: "\\(\\tfrac{1}{4}\\) square unit.",
      },
      selfCheckExample: {
        prompt:
          "Find the area bounded by \\(y = 2x - x^2\\) and \\(y = 0\\) between \\(x = 0\\) and \\(x = 1\\).",
        steps: [
          "On \\([0, 1]\\), \\(2x - x^2 \\ge 0\\), so the curve is the top and \\(y = 0\\) the bottom.",
          "\\(A = \\int_0^1 (2x - x^2)\\,dx = \\left[x^2 - \\tfrac{x^3}{3}\\right]_0^1 = 1 - \\tfrac{1}{3}.\\)",
        ],
        answer: "\\(\\tfrac{2}{3}\\) square unit.",
      },
      traps: [
        {
          title: "Subtract top minus bottom, not in equation order",
          body:
            "The integrand is (upper curve) − (lower curve), decided by which is actually higher between the crossings — NOT the order the curves are named. Subtracting the wrong way gives the negative of the area; if your answer is negative, you reversed them.",
        },
      ],
    },

    // 3 — curve vs line: parabola y^2=2x and y=x; lines y=x, y=mx
    {
      kind: "formula" as const,
      slug: "aoi-curve-and-line-region",
      name: "Area Between a Curve and a Line",
      pyqExampleId: "8e8c7b25-264e-4009-beef-feebe47e3028",
      intuition:
        "A parabola and a line, or two lines through the origin, enclose a region you handle the same way: find the crossings, express both boundaries as y in terms of x, and integrate top minus bottom. A sideways parabola y² = 2x becomes y = √(2x) for its upper branch.",
      definition:
        "For a sideways parabola \\(y^2 = 2x\\) and a line \\(y = x\\):\n" +
        "- **Intersections:** substitute \\(y = x\\) into \\(y^2 = 2x\\): \\(x^2 = 2x \\Rightarrow x = 0, 2.\\)\n" +
        "- The parabola's upper branch \\(y = \\sqrt{2x}\\) lies **above** the line \\(y = x\\) on \\((0, 2)\\):\n" +
        "\\[A = \\int_0^2 \\bigl(\\sqrt{2x} - x\\bigr)\\,dx = \\tfrac{8}{3} - 2 = \\tfrac{2}{3}.\\]\n" +
        "- For two lines \\(y = x\\) and \\(y = mx\\) (with \\(m < 0\\)) up to \\(x = c\\), the strip height is \\((x - mx)\\), giving area \\((1 - m)\\tfrac{c^2}{2}\\) — a tidy way to solve for an unknown slope.",
      formula: {
        label: "Curve over a line",
        latex: "A = \\int_a^b \\bigl(y_{\\text{curve}} - y_{\\text{line}}\\bigr)\\,dx",
      },
      authoredExample: {
        prompt:
          "Find the area enclosed between \\(y^2 = 4x\\) and the line \\(y = 2x\\).",
        steps: [
          "Intersections: put \\(y = 2x\\) into \\(y^2 = 4x\\): \\(4x^2 = 4x \\Rightarrow x = 0, 1.\\)",
          "Upper branch \\(y = 2\\sqrt{x}\\) is above \\(y = 2x\\) on \\((0, 1)\\): \\(A = \\int_0^1 (2\\sqrt{x} - 2x)\\,dx.\\)",
          "\\(= \\left[\\tfrac{4}{3}x^{3/2} - x^2\\right]_0^1 = \\tfrac{4}{3} - 1 = \\tfrac{1}{3}.\\)",
        ],
        answer: "\\(\\tfrac{1}{3}\\) square unit.",
      },
      traps: [
        {
          title: "Pick the correct branch of a sideways parabola",
          body:
            "\\(y^2 = 2x\\) has two branches, \\(y = +\\sqrt{2x}\\) and \\(y = -\\sqrt{2x}\\). For a region in the first quadrant against \\(y = x\\), only the upper branch bounds it — using the full \\(y^2\\) relation without choosing a branch is where the setup breaks.",
        },
      ],
    },

    // 4 — composite/subtractive regions: quarter-circle − sin; horizontal strips
    {
      kind: "formula" as const,
      slug: "aoi-composite-subtractive-regions",
      name: "Composite Regions: Subtract Areas",
      pyqExampleId: "79f8aa7c-c843-4980-84a1-65e021ae91a9",
      intuition:
        "When a region is bounded by different curves on different stretches, split it into pieces whose areas you already know and add or subtract them. A quarter-circle minus the area under a sine curve, or a sector built from a circle and a line, are just two known areas combined.",
      definition:
        "For an awkward region, **decompose into known areas**:\n" +
        "- **Subtract:** the region inside a quarter-circle but above \\(y = \\sin x\\) is (quarter-circle area) − (area under \\(\\sin x\\)). For \\(x^2 + y^2 = \\pi^2\\) in the first quadrant minus \\(y = \\sin x\\) on \\([0, \\pi]\\): \\(A = \\tfrac{\\pi^3}{4} - \\int_0^{\\pi}\\sin x\\,dx = \\tfrac{\\pi^3}{4} - 2.\\)\n" +
        "- **Use sectors:** a region cut by a line through the origin and an arc can equal a circular **sector**, area \\(\\tfrac{1}{2}r^2\\theta\\).\n" +
        "- **Horizontal strips:** when two curves are easier as \\(x\\) in terms of \\(y\\) (two sideways parabolas), integrate \\(\\int (x_{\\text{right}} - x_{\\text{left}})\\,dy\\) instead.",
      formula: {
        label: "Quarter-circle minus a curve",
        latex: "A = \\tfrac{1}{4}\\pi r^2 - \\int_a^b f(x)\\,dx",
      },
      authoredExample: {
        prompt:
          "Find the first-quadrant area inside \\(x^2 + y^2 = 4\\) but above the line \\(y = x\\).",
        steps: [
          "The first-quadrant quarter of the circle (radius \\(2\\)) has area \\(\\tfrac{1}{4}\\pi r^2 = \\pi.\\)",
          "The line \\(y = x\\) bisects the first quadrant, so the part of the quarter-circle above \\(y = x\\) is exactly half of it.",
          "\\(A = \\tfrac{1}{2}\\times \\pi.\\)",
        ],
        answer: "\\(\\tfrac{\\pi}{2}\\) square units.",
      },
      traps: [
        {
          title: "Subtract the area under the curve, not the curve's value",
          body:
            "For 'quarter-circle minus the sine region', you remove \\(\\int_0^{\\pi}\\sin x\\,dx = 2\\), the AREA under \\(\\sin x\\) — not a single function value. Mixing up the area with a height (or forgetting the integral evaluates to 2) is the recurring HARD-question slip.",
        },
      ],
    },
  ],
};

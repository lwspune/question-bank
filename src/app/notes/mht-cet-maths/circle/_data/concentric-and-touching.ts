import type { SubtopicNote } from "@/app/notes/_types";

export const CONCENTRIC_AND_TOUCHING_NOTE: SubtopicNote = {
  subtopicName: "Concentric Circles and Circles Touching a Line or an Axis",
  title: "Concentric Circles and Circles Touching a Line or an Axis",
  oneLineDefinition:
    "A concentric circle keeps −g and −f and changes only c; a circle touches a line when its radius equals the distance from the centre to that line, and it touches the X-axis when r = |k|.",
  whyItMatters:
    "6 PYQs at 17% HARD — the chapter's smallest page and its most repetitive. Concentric with a given circle and double its area (twice), concentric and passing through the centre of another circle, concentric and touching the X-axis, centre given and touching a line, and the point of contact of a circle with a line. " +
    "Every one is 'keep the centre, find r' or 'r is a distance'.",
  concepts: [
    // 1 — concentric circles
    {
      kind: "formula" as const,
      slug: "cetcir-concentric-circles",
      name: "Concentric Circles: Same Centre, New Radius From Area or From a Point",
      intuition:
        "Concentric circles share \\(g\\) and \\(f\\); only the constant changes. Double the area means \\(R^2 = 2r^2\\); passing through a given point means \\(R\\) is the distance from the centre to that point.",
      definition:
        "- \\(x^2 + y^2 - 6x - 4y - 12 = 0\\): centre \\((3, 2)\\), \\(r = 5\\). Double area: \\(R^2 = 50\\): \\((x - 3)^2 + (y - 2)^2 = 50 \\Rightarrow x^2 + y^2 - 6x - 4y = 37\\).\n" +
        "- \\(2x^2 + 2y^2 - 6x + 8y + 1 = 0\\): scale to \\(x^2 + y^2 - 3x + 4y + \\tfrac12 = 0\\), \\(r^2 = \\tfrac94 + 4 - \\tfrac12 = \\tfrac{23}{4}\\); double: \\(R^2 = \\tfrac{23}{2}\\); new constant \\(\\tfrac{25}{4} - \\tfrac{23}{2} = -\\tfrac{21}{4}\\): \\(4x^2 + 4y^2 - 12x + 16y - 21 = 0\\).\n" +
        "- Concentric with \\(2x^2 + 2y^2 - 8x - 12y - 9 = 0\\) (centre \\((2, 3)\\)) and through the centre \\((-4, -5)\\) of another circle: \\(R = \\sqrt{36 + 64} = 10\\): \\(x^2 + y^2 - 4x - 6y - 87 = 0\\).\n" +
        "- Scale the leading coefficient to \\(1\\) BEFORE reading \\(g, f, c\\); a factor of \\(2\\) left in place halves the centre wrongly.",
      formula: {
        label: "Concentric family",
        latex:
          "x^2 + y^2 + 2gx + 2fy + \\lambda = 0 \\qquad \\text{double area: } R^2 = 2r^2",
      },
      authoredExample: {
        prompt: "Find the circle concentric with \\(x^2 + y^2 + 4x - 2y - 4 = 0\\) and passing through \\((1, 5)\\).",
        steps: [
          "Centre \\((-2, 1)\\); \\(R^2 = 9 + 16 = 25\\).",
          "\\((x + 2)^2 + (y - 1)^2 = 25 \\Rightarrow x^2 + y^2 + 4x - 2y - 20 = 0\\).",
        ],
        answer: "\\(x^2 + y^2 + 4x - 2y - 20 = 0\\)",
      },
      selfCheckExample: {
        prompt: "Find the circle concentric with \\(x^2 + y^2 - 2x + 4y - 4 = 0\\) with three times its area.",
        steps: [
          "\\(r^2 = 1 + 4 + 4 = 9\\); \\(R^2 = 27\\); centre \\((1, -2)\\): constant \\(1 + 4 - 27 = -22\\).",
        ],
        answer: "\\(x^2 + y^2 - 2x + 4y - 22 = 0\\)",
      },
      practiceSet: [
        {
          prompt: "Centre of \\(x^2 + y^2 - 6x - 4y - 12 = 0\\)?",
          answer: "\\((3, 2)\\)",
        },
        {
          prompt: "Its radius?",
          answer: "\\(5\\)",
        },
        {
          prompt: "\\(R^2\\) for double the area of a circle with \\(r = 5\\)?",
          answer: "\\(50\\)",
        },
        {
          prompt: "Constant term for centre \\((3, 2)\\), \\(R^2 = 50\\)?",
          answer: "\\(-37\\)",
        },
      ],
      pyqExampleId: "5f2a7aad-9eb6-4e84-a4d2-de808b457835",
      traps: [
        {
          title: "Doubling the radius for double the area",
          body:
            "Double AREA means \\(R = \\sqrt2\\, r\\), \\(R^2 = 2r^2\\). Doubling \\(r\\) quadruples the area and gives \\(x^2 + y^2 - 6x - 4y = 87\\), which is not on the list — but \\(50\\) (the value of \\(R^2\\), not the constant) is.",
        },
      ],
    },

    // 2 — touching a line or an axis
    {
      kind: "formula" as const,
      slug: "cetcir-touching-a-line-or-an-axis",
      name: "Touching a Line or an Axis: Radius = Distance From the Centre; Contact Point = Foot of the Perpendicular",
      intuition:
        "A line is tangent when its distance from the centre equals the radius. So a circle with a known centre that touches a given line has \\(r = \\) that distance, and the point of contact is the foot of the perpendicular from the centre. Touching the \\(X\\)-axis means \\(r = |k|\\), the \\(Y\\)-axis \\(r = |h|\\).",
      definition:
        "- Centre \\((3, 4)\\), touching \\(5x + 12y - 11 = 0\\): \\(r = \\dfrac{|15 + 48 - 11|}{13} = 4\\): \\(x^2 + y^2 - 6x - 8y + 9 = 0\\).\n" +
        "- Concentric with centre \\((3, 2)\\) and touching the \\(X\\)-axis: \\(r = 2\\): \\(x^2 + y^2 - 6x - 4y + 9 = 0\\).\n" +
        "- Centre \\((-1, 1)\\) touching \\(x + 2y + 4 = 0\\): the contact point \\((h, k)\\) is on the line and \\(CP\\) is perpendicular to it (slope \\(2\\)): \\(h + 2k = -4\\), \\(2h - k = -3\\): \\((-2, -1)\\).\n" +
        "- Touching both axes means \\(|h| = |k| = r\\); in the first quadrant the centre is \\((r, r)\\).",
      formula: {
        label: "Tangency of a line",
        latex:
          "\\frac{|ah + bk + c|}{\\sqrt{a^2 + b^2}} = r \\qquad \\text{touches the } X\\text{-axis} \\iff r = |k|",
      },
      authoredExample: {
        prompt: "Find the circle with centre \\((2, -3)\\) that touches the line \\(3x - 4y + 7 = 0\\).",
        steps: [
          "\\(r = \\dfrac{|6 + 12 + 7|}{5} = 5\\).",
          "\\((x - 2)^2 + (y + 3)^2 = 25 \\Rightarrow x^2 + y^2 - 4x + 6y - 12 = 0\\).",
        ],
        answer: "\\(x^2 + y^2 - 4x + 6y - 12 = 0\\)",
      },
      selfCheckExample: {
        prompt: "A circle with centre \\((3, 4)\\) touches the line \\(x + y = 1\\). Find the point of contact.",
        steps: [
          "Foot of the perpendicular from \\((3, 4)\\) to \\(x + y = 1\\): \\(\\dfrac{h - 3}{1} = \\dfrac{k - 4}{1} = -\\dfrac{3 + 4 - 1}{2} = -3\\).",
        ],
        answer: "\\((0, 1)\\)",
      },
      practiceSet: [
        {
          prompt: "Radius of the circle with centre \\((3, 4)\\) touching \\(5x + 12y = 11\\)?",
          answer: "\\(4\\)",
        },
        {
          prompt: "Circle with centre \\((3, 2)\\) touching the \\(X\\)-axis?",
          answer: "\\(x^2 + y^2 - 6x - 4y + 9 = 0\\)",
        },
        {
          prompt: "Circle with centre \\((3, 2)\\) touching the \\(Y\\)-axis: radius?",
          answer: "\\(3\\)",
        },
        {
          prompt: "Is \\((-2, -1)\\) on \\(x + 2y + 4 = 0\\)?",
          answer: "Yes.",
        },
      ],
      pyqExampleId: "cd9075b5-6dd8-4bcb-9330-aaf242b4a477",
      traps: [
        {
          title: "Using the centre's x-coordinate for tangency to the X-axis",
          body:
            "Touching the \\(X\\)-axis fixes \\(r = |k|\\), the \\(y\\)-coordinate. With centre \\((3, 2)\\), \\(r = 2\\), constant \\(9\\); using \\(r = 3\\) gives constant \\(4\\), option (D).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Tangents — the tangency condition used for a line of given slope",
      href: "/notes/mht-cet-maths/circle/cetcir-tangents",
    },
    {
      label: "Straight Line — the foot of the perpendicular",
      href: "/notes/mht-cet-maths/straight-line/cetsl-distance-and-foot-of-perpendicular",
    },
  ],
};

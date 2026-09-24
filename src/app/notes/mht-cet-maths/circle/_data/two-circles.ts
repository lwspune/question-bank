import type { SubtopicNote } from "@/app/notes/_types";

export const TWO_CIRCLES_NOTE: SubtopicNote = {
  subtopicName: "Two Circles — Touching, Common Tangents and Relative Position",
  title: "Two Circles — Touching, Common Tangents and Relative Position",
  oneLineDefinition:
    "Compare the distance d between the centres with r₁ + r₂ and |r₁ − r₂|: d > r₁ + r₂ gives 4 common tangents, d = r₁ + r₂ external touching and 3, |r₁ − r₂| < d < r₁ + r₂ cutting and 2, d = |r₁ − r₂| internal touching and 1, d < |r₁ − r₂| one inside the other and 0.",
  whyItMatters:
    "8 PYQs at 50% HARD. Four are the count of common tangents (the 2025 stem and three earlier), two are the external-touching condition for x² + y² + 2ax + c = 0 and x² + y² + 2by + c = 0 (set in consecutive 2024 shifts), one is internal touching with a parameter, and one asks for the centre of a circle touching a given circle internally at a given point. " +
    "The whole page is one comparison — d against the sum and the difference of the radii.",
  concepts: [
    // 1 — relative position and common tangents
    {
      kind: "formula" as const,
      slug: "cetcir-relative-position-and-common-tangents",
      name: "Relative Position From d, r₁ + r₂ and |r₁ − r₂|: How Many Common Tangents",
      intuition:
        "Compute the two centres and radii, the distance \\(d\\) between the centres, and place \\(d\\) against \\(r_1 + r_2\\) and \\(|r_1 - r_2|\\). Each of the five positions has its own number of common tangents: \\(4, 3, 2, 1, 0\\) as the circles move from apart to nested.",
      definition:
        "- \\(x^2 + y^2 - 6x - 14y + 48 = 0\\) (\\((3, 7)\\), \\(\\sqrt{10}\\)) and \\(x^2 + y^2 - 6x = 0\\) (\\((3, 0)\\), \\(3\\)): \\(d = 7 > 3 + \\sqrt{10}\\): apart, \\(4\\) tangents.\n" +
        "- \\(x^2 + y^2 - 6x = 0\\) (\\((3, 0)\\), \\(3\\)) and \\(x^2 + y^2 + 6x + 2y + 1 = 0\\) (\\((-3, -1)\\), \\(3\\)): \\(d = \\sqrt{37} > 6\\): \\(4\\).\n" +
        "- \\(x^2 + y^2 - x = 0\\) and \\(x^2 + y^2 + x = 0\\): centres \\(\\left(\\pm\\tfrac12, 0\\right)\\), radii \\(\\tfrac12\\); \\(d = 1 = r_1 + r_2\\): touch externally, \\(3\\).\n" +
        "- \\(x^2 + y^2 + 6x + 6y = 0\\) (\\((-3, -3)\\), \\(3\\sqrt2\\)) and \\(x^2 + y^2 - 12x - 12y = 0\\) (\\((6, 6)\\), \\(6\\sqrt2\\)): \\(d = 9\\sqrt2 = r_1 + r_2\\): touch externally.\n" +
        "- Orthogonal circles (\\(d^2 = r_1^2 + r_2^2\\), i.e. \\(2g_1g_2 + 2f_1f_2 = c_1 + c_2\\)) are a special case of cutting.",
      formula: {
        label: "Five positions",
        latex:
          "d > r_1 + r_2:\\ 4 \\quad d = r_1 + r_2:\\ 3 \\quad |r_1 - r_2| < d < r_1 + r_2:\\ 2 \\quad d = |r_1 - r_2|:\\ 1 \\quad d < |r_1 - r_2|:\\ 0",
      },
      authoredExample: {
        prompt: "How many common tangents do \\(x^2 + y^2 = 4\\) and \\(x^2 + y^2 - 8x + 12 = 0\\) have?",
        steps: [
          "Second circle: centre \\((4, 0)\\), \\(r = 2\\). \\(d = 4 = 2 + 2\\).",
        ],
        answer: "\\(3\\) — they touch externally.",
      },
      selfCheckExample: {
        prompt: "Describe the position of \\(x^2 + y^2 = 25\\) and \\(x^2 + y^2 - 2x - 2y - 7 = 0\\).",
        steps: [
          "Second: centre \\((1, 1)\\), \\(r = 3\\); \\(d = \\sqrt2\\); \\(|5 - 3| = 2 > \\sqrt2\\).",
        ],
        answer: "The smaller circle lies inside the larger; no common tangent.",
      },
      practiceSet: [
        {
          prompt: "Centre and radius of \\(x^2 + y^2 - 6x - 14y + 48 = 0\\)?",
          answer: "\\((3, 7)\\), \\(\\sqrt{10}\\)",
        },
        {
          prompt: "\\(d\\) between \\((3, 7)\\) and \\((3, 0)\\)?",
          answer: "\\(7\\)",
        },
        {
          prompt: "Tangents when \\(d = r_1 + r_2\\)?",
          answer: "\\(3\\)",
        },
        {
          prompt: "Tangents when \\(d = |r_1 - r_2|\\)?",
          answer: "\\(1\\)",
        },
      ],
      pyqExampleId: "e5aadccc-b4bb-486b-a9fc-ee181f518b09",
      traps: [
        {
          title: "Comparing d with r₁ + r₂ only",
          body:
            "\\(d < r_1 + r_2\\) covers three positions (cutting, internal touch, nested). The second comparison, against \\(|r_1 - r_2|\\), decides between \\(2\\), \\(1\\) and \\(0\\).",
        },
      ],
    },

    // 2 — touching conditions
    {
      kind: "formula" as const,
      slug: "cetcir-touching-conditions",
      name: "Touching Circles: d = r₁ + r₂ (External) or d = |r₁ − r₂| (Internal), and the Centre From the Contact Point",
      intuition:
        "Touching is an equation, not an inequality, so it fixes a parameter. Square carefully — the radii carry square roots. When the contact point is known, the centres and the contact point are collinear, and the section formula places the new centre.",
      definition:
        "- \\(x^2 + y^2 + 2ax + c = 0\\) (\\((-a, 0)\\), \\(\\sqrt{a^2 - c}\\)) and \\(x^2 + y^2 + 2by + c = 0\\) (\\((0, -b)\\), \\(\\sqrt{b^2 - c}\\)) touching externally: \\(\\sqrt{a^2 + b^2} = \\sqrt{a^2 - c} + \\sqrt{b^2 - c}\\); squaring twice: \\(c^2 = (a^2 - c)(b^2 - c) \\Rightarrow c(a^2 + b^2) = a^2b^2 \\Rightarrow \\dfrac{1}{a^2} + \\dfrac{1}{b^2} = \\dfrac1c\\).\n" +
        "- \\(x^2 + y^2 = 9\\) and \\(x^2 + y^2 + 2\\alpha x + 2y + 1 = 0\\) (\\((-\\alpha, -1)\\), \\(r = |\\alpha|\\)) touching internally: \\(\\sqrt{\\alpha^2 + 1} = 3 - |\\alpha| \\Rightarrow \\alpha^2 + 1 = 9 - 6|\\alpha| + \\alpha^2 \\Rightarrow |\\alpha| = \\tfrac43\\); \\(\\alpha^3 = \\tfrac{64}{27}\\).\n" +
        "- Circle of radius \\(3\\) touching \\(x^2 + y^2 - 4x - 6y - 12 = 0\\) (\\((2, 3)\\), \\(r = 5\\)) internally at \\((-1, -1)\\): the new centre is on the segment from \\((2, 3)\\) to \\((-1, -1)\\), at distance \\(5 - 3 = 2\\) from the big centre, i.e. dividing it \\(2 : 3\\): \\(\\left(\\dfrac{-2 + 6}{5}, \\dfrac{-2 + 9}{5}\\right) = \\left(\\dfrac45, \\dfrac75\\right)\\).\n" +
        "- For internal touching the smaller centre lies BETWEEN the larger centre and the contact point; for external touching the contact point lies between the two centres.",
      formula: {
        label: "Touching",
        latex:
          "\\text{external: } d = r_1 + r_2 \\qquad \\text{internal: } d = |r_1 - r_2| \\qquad \\text{centres and contact point are collinear}",
      },
      authoredExample: {
        prompt: "Find \\(k\\) if \\(x^2 + y^2 = 4\\) and \\((x - 5)^2 + y^2 = k^2\\) (\\(k > 0\\)) touch externally.",
        steps: [
          "\\(d = 5 = 2 + k\\).",
        ],
        answer: "\\(k = 3\\)",
      },
      selfCheckExample: {
        prompt: "A circle of radius \\(2\\) touches \\(x^2 + y^2 = 36\\) internally at \\((6, 0)\\). Find its centre.",
        steps: [
          "The centre lies on the segment from \\((0, 0)\\) to \\((6, 0)\\), at distance \\(6 - 2 = 4\\) from the origin.",
        ],
        answer: "\\((4, 0)\\)",
      },
      practiceSet: [
        {
          prompt: "Radius of \\(x^2 + y^2 + 2ax + c = 0\\)?",
          answer: "\\(\\sqrt{a^2 - c}\\)",
        },
        {
          prompt: "Distance between \\((-a, 0)\\) and \\((0, -b)\\)?",
          answer: "\\(\\sqrt{a^2 + b^2}\\)",
        },
        {
          prompt: "\\(|\\alpha|\\) if \\(\\sqrt{\\alpha^2 + 1} = 3 - |\\alpha|\\)?",
          answer: "\\(\\dfrac43\\)",
        },
        {
          prompt: "Point dividing \\((2, 3)\\) to \\((-1, -1)\\) in \\(2 : 3\\)?",
          answer: "\\(\\left(\\dfrac45, \\dfrac75\\right)\\)",
        },
      ],
      pyqExampleId: "432de46f-d33f-4112-820c-caaafa03ba8a",
      traps: [
        {
          title: "Squaring once and stopping",
          body:
            "\\(\\sqrt{a^2 + b^2} = \\sqrt{a^2 - c} + \\sqrt{b^2 - c}\\) needs TWO squarings; after the first, \\(2c = 2\\sqrt{(a^2 - c)(b^2 - c)}\\) still has a root. The half-done version gives \\(\\dfrac{1}{a^2} + \\dfrac{1}{b^2} = \\dfrac{1}{c^2}\\), option (C).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Concentric and Touching Circles — a circle touching a line",
      href: "/notes/mht-cet-maths/circle/cetcir-concentric-and-touching",
    },
    {
      label: "Straight Line — the section formula that places the new centre",
      href: "/notes/mht-cet-maths/straight-line/cetsl-section-formula-and-rectangles",
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const INCIRCLE_POLYGONS_NOTE: SubtopicNote = {
  subtopicName: "In-circle and Regular Polygon Geometry",
  title: "In-circle, Circumcircle & Regular Polygons",
  oneLineDefinition:
    "The incircle (radius r = Δ/s) sits inside touching all three sides; the circumcircle (radius R = abc/4Δ) passes through all three vertices — and a regular polygon's inscribed circle follows the same idea with a cotangent.",
  whyItMatters:
    "Only 6 PYQs, but they pull in the circle formulas: inradius, circumradius, the central-angle relation, and the regular-polygon inradius. A couple are really cosine-rule problems on a labelled triangle, so the sine/cosine tools carry over.",
  concepts: [
    // in/circum circle
    {
      kind: "formula" as const,
      slug: "pt-incircle-circumcircle",
      name: "Incircle, Circumcircle & the Central Angle",
      pyqExampleId: "0037ca62-ef3b-4276-9558-246cff046ae1",
      intuition:
        "Both special circles are tied to the area: the inradius is area over semi-perimeter, the circumradius is the product of sides over four times the area. And the angle a chord subtends at the centre is twice the angle it subtends at the circumference.",
      definition:
        "- **Inradius:** \\(r = \\dfrac{\\Delta}{s}\\) (area over semi-perimeter).\n" +
        "- **Circumradius:** \\(R = \\dfrac{abc}{4\\Delta} = \\dfrac{a}{2\\sin A}\\).\n" +
        "- **Central vs inscribed angle:** an arc subtends an angle at the centre that is **twice** the angle it subtends at any point on the circle: \\(\\angle BOC = 2\\angle BAC\\).\n" +
        "- **Relating the two angles' ratios:** with \\(\\alpha = \\angle BAC\\) and \\(\\beta = \\angle BOC = 2\\alpha\\), the double-angle formulas convert one to the other: \\(\\cos\\beta = \\cos 2\\alpha = \\dfrac{1-\\tan^2\\alpha}{1+\\tan^2\\alpha} = 1 - 2\\sin^2\\alpha\\), and \\(\\sin\\beta = \\sin 2\\alpha = \\dfrac{2\\tan\\alpha}{1+\\tan^2\\alpha}\\). Option lists mix these up deliberately — \\(\\dfrac{2\\tan\\alpha}{1+\\tan^2\\alpha}\\) is a **sine**, not a cosine.\n" +
        "- **Chord length:** a chord subtending angle \\(\\theta\\) at the centre of a circle of radius \\(R\\) has length \\(2R\\sin\\dfrac{\\theta}{2}\\).\n" +
        "- **Equal tangents from an external point:** the two tangent segments from a point to a circle are equal. For the incircle this means the sides split as \\(s-a\\), \\(s-b\\), \\(s-c\\) at the points of contact — from vertex \\(A\\) the two tangent lengths are both \\(s-a\\) (so \\(\\tan\\tfrac A2=\\dfrac{r}{s-a}\\)). A triangle with sides \\(a,b,c\\) whose incircle touches \\(BC\\) at \\(D\\) has \\(BD=s-b\\) and \\(DC=s-c\\); the whole \"in-circle\" question pair is this fact plus arithmetic.",
      formula: {
        label: "Inradius, circumradius, central angle",
        latex: "r = \\dfrac{\\Delta}{s}, \\quad R = \\dfrac{abc}{4\\Delta}, \\quad \\angle BOC = 2\\,\\angle BAC",
      },
      visualizationSlug: "pt-circumcircle-incircle",
      authoredExample: {
        prompt: "A chord subtends an angle of \\(90^\\circ\\) at the centre of a circle of radius \\(R\\). Find its length.",
        steps: [
          "Chord length \\(= 2R\\sin\\dfrac{\\theta}{2}\\) with \\(\\theta = 90^\\circ\\).",
          "\\(= 2R\\sin 45^\\circ = 2R\\cdot\\dfrac{1}{\\sqrt2}\\).",
        ],
        answer: "\\(R\\sqrt{2}\\).",
      },
      practiceSet: [
        {
          prompt: "Find the circumradius \\(R\\) of a triangle with sides \\(3,\\ 4,\\ 5\\).",
          answer: "\\(R = \\dfrac{5}{2}\\).",
          method: "Area \\(\\Delta = 6\\) (right triangle, \\(\\tfrac12\\cdot3\\cdot4\\)); \\(R = \\dfrac{abc}{4\\Delta} = \\dfrac{3\\cdot4\\cdot5}{4\\cdot6} = \\dfrac{60}{24} = \\dfrac52\\).",
        },
        {
          prompt: "Find the inradius \\(r\\) of a triangle with sides \\(3,\\ 4,\\ 5\\).",
          answer: "\\(r = 1\\).",
          method: "\\(s = \\tfrac{3+4+5}{2} = 6\\), \\(\\Delta = 6\\); \\(r = \\dfrac{\\Delta}{s} = \\dfrac{6}{6} = 1\\).",
        },
      ],
      traps: [
        {
          title: "Inradius \\(r\\) vs circumradius \\(R\\) — different formulas",
          body:
            "The INradius (inside, touching the sides) is \\(r = \\frac{\\Delta}{s}\\); the CIRCUMradius (through the vertices) is \\(R = \\frac{abc}{4\\Delta}\\). Swapping the two — using \\(\\frac{\\Delta}{s}\\) when the circle passes through the vertices — is the most common error here.",
        },
        {
          title: "Central angle is TWICE the inscribed angle",
          body:
            "An arc subtends \\(\\angle BOC = 2\\,\\angle BAC\\) at the centre — twice, not half, the inscribed angle. Halving it instead of doubling reverses the relation.",
        },
      ],
    },

    // regular polygon
    {
      kind: "formula" as const,
      slug: "pt-regular-polygon-geometry",
      name: "Regular Polygon Geometry",
      pyqExampleId: "bb231d43-bae1-4b33-a7d6-6341ba4bd90e",
      intuition:
        "A regular n-gon splits into n identical isosceles triangles from its centre. That single triangle gives every measurement — the interior angle, the inscribed-circle radius, and the circumscribed-circle radius — through a cotangent or cosecant of π/n.",
      definition:
        "For a regular polygon of \\(n\\) sides, each of length \\(s\\):\n" +
        "- **Interior angle:** \\(\\dfrac{(n-2)\\,180^\\circ}{n}\\).\n" +
        "- **Inradius** (inscribed circle, touching each side): \\(r = \\dfrac{s}{2}\\cot\\dfrac{\\pi}{n}\\).\n" +
        "- **Circumradius** (through the vertices): \\(R = \\dfrac{s}{2}\\csc\\dfrac{\\pi}{n}\\).\n" +
        "- **The cotangents you will need**, since \\(\\pi/n\\) is rarely a textbook angle: \\(\\cot 60^\\circ = \\tfrac{1}{\\sqrt3}\\) (\\(n=3\\)), \\(\\cot 45^\\circ = 1\\) (\\(n=4\\)), \\(\\cot 30^\\circ = \\sqrt3\\) (\\(n=6\\)), \\(\\cot 22.5^\\circ = 1+\\sqrt2\\) (\\(n=8\\)), \\(\\cot 15^\\circ = 2+\\sqrt3\\) (\\(n=12\\)). The last comes from \\(\\tan 15^\\circ = \\tan(45^\\circ-30^\\circ) = \\dfrac{1-\\tfrac{1}{\\sqrt3}}{1+\\tfrac{1}{\\sqrt3}} = 2-\\sqrt3\\), whose reciprocal is \\(2+\\sqrt3\\). So a regular 12-gon of side 1 has inradius \\(\\tfrac12(2+\\sqrt3)\\) and inscribed-circle diameter \\(2+\\sqrt3\\).",
      formula: {
        label: "Regular n-gon inradius",
        latex: "r = \\dfrac{s}{2}\\cot\\dfrac{\\pi}{n}, \\qquad \\text{interior angle} = \\dfrac{(n-2)180^\\circ}{n}",
      },
      authoredExample: {
        prompt: "Find the interior angle of a regular hexagon.",
        steps: [
          "Interior angle \\(= \\dfrac{(n-2)\\,180^\\circ}{n}\\) with \\(n = 6\\).",
          "\\(= \\dfrac{4\\cdot 180^\\circ}{6} = \\dfrac{720^\\circ}{6}\\).",
        ],
        answer: "\\(120^\\circ\\).",
      },
    },
  ],
};

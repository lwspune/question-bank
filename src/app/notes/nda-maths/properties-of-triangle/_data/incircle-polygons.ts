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
        "- **Chord length:** a chord subtending angle \\(\\theta\\) at the centre of a circle of radius \\(R\\) has length \\(2R\\sin\\dfrac{\\theta}{2}\\).",
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
        "- **Circumradius** (through the vertices): \\(R = \\dfrac{s}{2}\\csc\\dfrac{\\pi}{n}\\).",
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

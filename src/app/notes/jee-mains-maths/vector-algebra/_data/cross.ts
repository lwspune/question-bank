import type { SubtopicNote } from "@/app/notes/_types";

export const CROSS_VEC_NOTE: SubtopicNote = {
  subtopicName: "Cross Product: Areas and Perpendicular Vectors",
  title: "Cross Product: Areas and Perpendicular Vectors",
  oneLineDefinition:
    "The cross product as area — of triangles, parallelograms and quadrilaterals — and as the direction perpendicular to two vectors, together with the identity that links it to the dot product.",
  whyItMatters:
    "Thirty-seven PYQs. Nearly half are areas, from a triangle's sides, a parallelogram's diagonals or a quadrilateral's vertices. The rest need a direction perpendicular to two vectors, or the identity |a × b|² + (a · b)² = |a|²|b|². Three ideas cover the page.",
  concepts: [
    // C1 — areas
    {
      kind: "formula" as const,
      slug: "jvec-area",
      name: "Areas of triangles, parallelograms and quadrilaterals",
      intuition:
        "\\(|\\vec a\\times\\vec b|\\) is the area of the parallelogram with sides \\(\\vec a\\) and \\(\\vec b\\), so a triangle with those sides has half of it. When a parallelogram is given by its diagonals \\(\\vec d_1,\\vec d_2\\), its area is \\(\\frac12|\\vec d_1\\times\\vec d_2|\\), and the same formula gives any quadrilateral from its two diagonals. Scaling passes straight through: \\((2\\vec a)\\times(3\\vec b)=6(\\vec a\\times\\vec b)\\).",
      definition:
        "- Parallelogram with sides \\(\\vec a,\\vec b\\): \\(|\\vec a\\times\\vec b|\\). Triangle: \\(\\frac12|\\vec a\\times\\vec b|\\).\n" +
        "- Parallelogram or quadrilateral with diagonals \\(\\vec d_1,\\vec d_2\\): \\(\\frac12|\\vec d_1\\times\\vec d_2|\\).\n" +
        "- \\(\\vec a\\times\\vec b\\) in components: the determinant with rows \\(\\hat i,\\hat j,\\hat k\\); \\(\\vec a\\); \\(\\vec b\\).",
      formula: {
        label: "Triangle area",
        latex: "\\text{Area}=\\tfrac12\\,|\\overrightarrow{AB}\\times\\overrightarrow{AC}|",
      },
      authoredExample: {
        prompt: "Find the area of the triangle with vertices \\((0,0,0)\\), \\((1,2,0)\\), \\((0,1,3)\\).",
        steps: [
          "\\((1,2,0)\\times(0,1,3)=(6,-3,1)\\), length \\(\\sqrt{46}\\).",
        ],
        answer: "\\(\\frac{\\sqrt{46}}2\\).",
      },
      selfCheckExample: {
        prompt: "A parallelogram has diagonals \\((1,1,0)\\) and \\((0,1,1)\\). Find its area.",
        steps: [
          "\\((1,1,0)\\times(0,1,1)=(1,-1,1)\\); half its length.",
        ],
        answer: "\\(\\frac{\\sqrt3}2\\).",
      },
      practiceSet: [
        { prompt: "\\(|\\vec a\\times\\vec b|=10\\): triangle area on \\(\\vec a,\\vec b\\)?", answer: "\\(5\\)" },
        { prompt: "Parallelogram on \\(\\hat i\\) and \\(\\hat j\\)?", answer: "\\(1\\)" },
        { prompt: "Quadrilateral with diagonals \\(\\vec d_1,\\vec d_2\\)?", answer: "\\(\\frac12|\\vec d_1\\times\\vec d_2|\\)" },
        { prompt: "\\((2\\vec a)\\times(3\\vec b)\\)?", answer: "\\(6(\\vec a\\times\\vec b)\\)" },
      ],
      pyqExampleId: "70449a84-d529-4240-bd30-3cf3bb2439a1", // 2024 — parallelogram ABCD from A, C and the diagonal BD
      traps: [
        {
          title: "Diagonals give half",
          body: "With sides the parallelogram's area is \\(|\\vec a\\times\\vec b|\\); with diagonals it is half of \\(|\\vec d_1\\times\\vec d_2|\\). Using the wrong one doubles or halves the answer.",
        },
      ],
    },

    // C2 — perpendicular direction
    {
      kind: "formula" as const,
      slug: "jvec-perpendicular",
      name: "A vector perpendicular to two others",
      intuition:
        "\\(\\vec a\\times\\vec b\\) is perpendicular to both \\(\\vec a\\) and \\(\\vec b\\), so any vector perpendicular to both is \\(\\lambda(\\vec a\\times\\vec b)\\), and one more condition fixes \\(\\lambda\\). A line lying in two planes is perpendicular to both normals, so its direction is \\(\\vec n_1\\times\\vec n_2\\).",
      definition:
        "- Perpendicular to \\(\\vec a\\) and \\(\\vec b\\): \\(\\lambda(\\vec a\\times\\vec b)\\).\n" +
        "- Unit vectors perpendicular to both: \\(\\pm\\frac{\\vec a\\times\\vec b}{|\\vec a\\times\\vec b|}\\).\n" +
        "- \\(\\hat i\\times\\hat j=\\hat k\\), \\(\\hat j\\times\\hat k=\\hat i\\), \\(\\hat k\\times\\hat i=\\hat j\\); reversing the order changes the sign.",
      formula: {
        label: "Common perpendicular",
        latex: "\\vec c\\perp\\vec a,\\ \\vec c\\perp\\vec b\\ \\Rightarrow\\ \\vec c=\\lambda(\\vec a\\times\\vec b)",
      },
      authoredExample: {
        prompt: "\\(\\vec c\\) is perpendicular to \\((1,1,0)\\) and \\((0,1,1)\\), and \\(\\vec c\\cdot\\hat i=2\\). Find \\(\\vec c\\).",
        steps: [
          "\\((1,1,0)\\times(0,1,1)=(1,-1,1)\\), so \\(\\vec c=\\lambda(1,-1,1)\\) with \\(\\lambda=2\\).",
        ],
        answer: "\\((2,-2,2)\\).",
      },
      selfCheckExample: {
        prompt: "Find the unit vectors perpendicular to \\(\\hat i\\) and \\(\\hat i+\\hat j\\).",
        steps: [
          "\\(\\hat i\\times(\\hat i+\\hat j)=\\hat k\\).",
        ],
        answer: "\\(\\pm\\hat k\\).",
      },
      practiceSet: [
        { prompt: "\\(\\hat j\\times\\hat i\\)?", answer: "\\(-\\hat k\\)" },
        { prompt: "\\(\\vec a\\times\\vec a\\)?", answer: "\\(\\vec 0\\)" },
        { prompt: "Direction perpendicular to \\((1,0,0)\\) and \\((0,0,1)\\)?", answer: "\\(\\pm\\hat j\\)" },
        { prompt: "Direction of the line common to planes with normals \\(\\vec n_1,\\vec n_2\\)?", answer: "\\(\\vec n_1\\times\\vec n_2\\)" },
      ],
      pyqExampleId: "82347665-1e92-4f8c-845a-9a02bba72a76", // 2021 — c perpendicular to a and b, c.(i + j + 3k) = 8
      traps: [
        {
          title: "Two unit vectors, not one",
          body: "Both \\(\\vec a\\times\\vec b\\) and \\(\\vec b\\times\\vec a\\) are perpendicular to the pair. A condition in the question (a sign, a positive component) decides which.",
        },
      ],
    },

    // C3 — Lagrange identity
    {
      kind: "formula" as const,
      slug: "jvec-lagrange",
      name: "|a × b|² + (a · b)² = |a|²|b|²",
      intuition:
        "Since \\(|\\vec a\\times\\vec b|=|\\vec a||\\vec b|\\sin\\theta\\) and \\(\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta\\), their squares add to \\(|\\vec a|^2|\\vec b|^2\\). So any two of the three quantities give the third, without ever finding the angle. It also shows \\((\\vec a-\\vec b)\\times(\\vec a+\\vec b)=2(\\vec a\\times\\vec b)\\) combines neatly with a dot term.",
      definition:
        "- \\(|\\vec a\\times\\vec b|^2+(\\vec a\\cdot\\vec b)^2=|\\vec a|^2|\\vec b|^2\\).\n" +
        "- \\((\\vec a-\\vec b)\\times(\\vec a+\\vec b)=2(\\vec a\\times\\vec b)\\).\n" +
        "- \\(|(\\vec a\\times\\vec b)\\times\\vec c|=|\\vec a\\times\\vec b||\\vec c|\\sin\\phi\\), \\(\\phi\\) the angle between \\(\\vec a\\times\\vec b\\) and \\(\\vec c\\).",
      formula: {
        label: "Lagrange's identity",
        latex: "|\\vec a\\times\\vec b|^2+(\\vec a\\cdot\\vec b)^2=|\\vec a|^2|\\vec b|^2",
      },
      authoredExample: {
        prompt: "\\(|\\vec a|=3\\), \\(|\\vec b|=5\\), \\(\\vec a\\cdot\\vec b=9\\). Find \\(|\\vec a\\times\\vec b|\\).",
        steps: [
          "\\(|\\vec a\\times\\vec b|^2=225-81\\).",
        ],
        answer: "\\(12\\).",
      },
      selfCheckExample: {
        prompt: "\\(|\\vec a\\times\\vec b|=3\\). Find \\(|(\\vec a-\\vec b)\\times(\\vec a+\\vec b)|^2\\).",
        steps: [
          "It is \\(|2(\\vec a\\times\\vec b)|^2\\).",
        ],
        answer: "\\(36\\).",
      },
      practiceSet: [
        { prompt: "\\(\\vec a\\perp\\vec b\\): \\(|\\vec a\\times\\vec b|\\)?", answer: "\\(|\\vec a||\\vec b|\\)" },
        { prompt: "\\(\\vec a\\parallel\\vec b\\): \\(|\\vec a\\times\\vec b|\\)?", answer: "\\(0\\)" },
        { prompt: "\\((\\vec a-\\vec b)\\times(\\vec a+\\vec b)\\)?", answer: "\\(2(\\vec a\\times\\vec b)\\)" },
        { prompt: "Unit vectors with \\(\\vec a\\cdot\\vec b=0.6\\): \\(|\\vec a\\times\\vec b|\\)?", answer: "\\(0.8\\)" },
      ],
      pyqExampleId: "2a38783d-f4d1-41aa-9fd4-fd28f1919400", // 2023 — |a| = sqrt14, |b| = sqrt6, |a x b| = sqrt48, find (a.b)^2
      traps: [
        {
          title: "The identity is in squares",
          body: "Subtract the squares and take the root at the end. \\(|\\vec a\\times\\vec b|\\) is not \\(|\\vec a||\\vec b|-\\vec a\\cdot\\vec b\\).",
        },
      ],
    },
  ],
};

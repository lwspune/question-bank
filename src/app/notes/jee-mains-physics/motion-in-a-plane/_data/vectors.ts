import type { SubtopicNote } from "@/app/notes/_types";

export const VECTORS_PLANE_NOTE: SubtopicNote = {
  subtopicName: "Vectors: Resultant, Components and Products",
  title: "Vectors: Resultant, Components and Products",
  oneLineDefinition:
    "Two vectors at an angle θ add to a resultant of size √(A² + B² + 2AB cos θ); any vector can be split into x and y components and added component by component; the dot product A·B = AB cos θ tests perpendicularity and the cross product gives a vector at right angles to both.",
  whyItMatters:
    "Thirty PYQs, nineteen of them multiple choice, and none from 2026. Eleven find the size or angle of a resultant, eight resolve vectors into components, and eleven use the dot or cross product. Eleven of the thirty ask for a number, more than on any other page of the chapter, so the algebra has to be exact. Six come with a figure: read every angle off it before you resolve.",
  concepts: [
    // C1 — resultant of two vectors
    {
      kind: "formula" as const,
      slug: "jpplane-resultant",
      name: "Resultant of two vectors at an angle",
      intuition:
        "Place the tail of B at the head of A; the resultant runs from the tail of A to the head of B. Its size depends on the angle between them: largest (A + B) when they point the same way, smallest (|A − B|) when they are opposite, and √(A² + B²) when they are at right angles. Squaring the resultant turns every question about it into one line of algebra in cos θ.",
      definition:
        "- Resultant: \\(R^{2} = A^{2} + B^{2} + 2AB\\cos\\theta\\); its angle with A: \\(\\tan\\alpha = \\dfrac{B\\sin\\theta}{A + B\\cos\\theta}\\).\n" +
        "- Difference: \\(|\\vec{A} - \\vec{B}|^{2} = A^{2} + B^{2} - 2AB\\cos\\theta\\).\n" +
        "- Equal magnitudes A: \\(|\\vec{A} + \\vec{B}| = 2A\\cos\\dfrac{\\theta}{2}\\), \\(|\\vec{A} - \\vec{B}| = 2A\\sin\\dfrac{\\theta}{2}\\), so \\(|\\vec{A} - \\vec{B}| = |\\vec{A} + \\vec{B}|\\tan\\dfrac{\\theta}{2}\\).\n" +
        "- Resultant perpendicular to A: the component of B along A cancels A, so \\(A + B\\cos\\theta = 0\\).\n" +
        "- Equal magnitudes with \\(|\\vec{A} + \\vec{B}| = n|\\vec{A} - \\vec{B}|\\): \\(\\dfrac{1 + \\cos\\theta}{1 - \\cos\\theta} = n^{2}\\).\n" +
        "- Range of the resultant: \\(|A - B| \\le R \\le A + B\\).",
      formula: {
        label: "Resultant of two vectors",
        latex:
          "R = \\sqrt{A^{2} + B^{2} + 2AB\\cos\\theta} \\qquad \\tan\\alpha = \\frac{B\\sin\\theta}{A + B\\cos\\theta} \\qquad |\\vec{A} + \\vec{B}| = 2A\\cos\\frac{\\theta}{2}\\ (A = B)",
      },
      authoredExample: {
        prompt:
          "Forces of 5 N and 8 N act at a point with an angle of \\(60^{\\circ}\\) between them. Find the size of the resultant and the angle it makes with the 5 N force.",
        steps: [
          "\\(R^{2} = 25 + 64 + 2(5)(8)\\cos 60^{\\circ} = 89 + 40 = 129\\), so \\(R = \\sqrt{129} \\approx 11.4\\ \\text{N}\\).",
          "\\(\\tan\\alpha = \\dfrac{8\\sin 60^{\\circ}}{5 + 8\\cos 60^{\\circ}} = \\dfrac{4\\sqrt{3}}{9} \\approx 0.77\\).",
          "So \\(\\alpha \\approx 37.6^{\\circ}\\) from the 5 N force.",
        ],
        answer: "\\(\\sqrt{129} \\approx 11.4\\ \\text{N}\\), at about \\(37.6^{\\circ}\\) to the 5 N force",
      },
      selfCheckExample: {
        prompt:
          "Two vectors of equal magnitude A have a resultant that is also of magnitude A. What is the angle between them?",
        steps: [
          "For equal magnitudes \\(R = 2A\\cos\\dfrac{\\theta}{2}\\).",
          "\\(2A\\cos\\dfrac{\\theta}{2} = A\\) gives \\(\\cos\\dfrac{\\theta}{2} = \\dfrac{1}{2}\\), so \\(\\dfrac{\\theta}{2} = 60^{\\circ}\\).",
        ],
        answer: "\\(120^{\\circ}\\)",
      },
      practiceSet: [
        { prompt: "Vectors of magnitude 3 and 4 are at right angles. Size of the resultant?", answer: "5" },
        { prompt: "Forces of 7 N and 3 N act at a point. Largest and smallest possible resultant?", answer: "10 N and 4 N" },
        { prompt: "\\(|\\vec{A}| = 2\\), \\(|\\vec{B}| = 4\\), and \\(\\vec{A} + \\vec{B}\\) is perpendicular to \\(\\vec{A}\\). Angle between A and B?", answer: "\\(120^{\\circ}\\)", method: "\\(2 + 4\\cos\\theta = 0\\), so \\(\\cos\\theta = -\\tfrac{1}{2}\\)." },
        { prompt: "Two vectors of equal size have \\(|\\vec{A} + \\vec{B}| = \\sqrt{3}\\,|\\vec{A} - \\vec{B}|\\). Angle between them?", answer: "\\(60^{\\circ}\\)", method: "\\(\\dfrac{1 + \\cos\\theta}{1 - \\cos\\theta} = 3\\) gives \\(\\cos\\theta = \\tfrac{1}{2}\\)." },
      ],
      pyqExampleId: "046fc357-47ea-4d9a-8662-23bae8842ae6", // 4 Apr 2024: one force thrice the other, resultant equals the larger
      traps: [
        {
          title: "Adding magnitudes",
          body: "A 3 N and a 4 N force give 7 N only when they point the same way. At right angles the resultant is 5 N; at any other angle use R² = A² + B² + 2AB cos θ.",
        },
        {
          title: "Perpendicular to A, not to B",
          body: "If the resultant is perpendicular to A, the condition is A + B cos θ = 0: the part of B along A cancels A. Writing B + A cos θ = 0 makes the resultant perpendicular to B instead.",
        },
      ],
    },

    // C2 — components
    {
      kind: "formula" as const,
      slug: "jpplane-components",
      name: "Resolving vectors into components",
      intuition:
        "Any vector in a plane is the sum of a piece along x and a piece along y. Resolve every vector this way, add all the x pieces and all the y pieces separately, and rebuild the resultant from the two totals. The only care needed is with the angle: the side adjacent to the given angle takes the cosine.",
      definition:
        "- At angle θ from the x-axis: \\(A_x = A\\cos\\theta\\), \\(A_y = A\\sin\\theta\\). At angle θ from the y-axis the two swap: \\(A_y = A\\cos\\theta\\), \\(A_x = A\\sin\\theta\\).\n" +
        "- Magnitude \\(A = \\sqrt{A_x^{2} + A_y^{2} + A_z^{2}}\\); direction \\(\\tan\\alpha = A_y/A_x\\), with the signs fixing the quadrant.\n" +
        "- Several vectors: \\(R_x = \\sum A_x\\), \\(R_y = \\sum A_y\\), then \\(R = \\sqrt{R_x^{2} + R_y^{2}}\\).\n" +
        "- Unit vector \\(\\hat{B} = \\vec{B}/|\\vec{B}|\\); a vector of size A along B is \\(A\\hat{B}\\).\n" +
        "- Regular n-sided figure with centre O: the vectors from O to all n vertices add to zero, so from one vertex A to the other n − 1 vertices they add to \\(n\\,\\overrightarrow{AO}\\).",
      formula: {
        label: "Components and magnitude",
        latex:
          "A_x = A\\cos\\theta,\\ A_y = A\\sin\\theta \\qquad A = \\sqrt{A_x^{2} + A_y^{2} + A_z^{2}} \\qquad \\vec{A}\\ \\text{along}\\ \\vec{B} = A\\hat{B}",
      },
      authoredExample: {
        prompt:
          "Three forces act at a point: 10 N along +x, 6 N along +y, and \\(4\\sqrt{2}\\) N at \\(135^{\\circ}\\) to +x. Find the resultant and its angle with +x.",
        steps: [
          "Third force: \\(4\\sqrt{2}\\cos 135^{\\circ} = -4\\), \\(4\\sqrt{2}\\sin 135^{\\circ} = 4\\).",
          "\\(R_x = 10 - 4 = 6\\ \\text{N}\\); \\(R_y = 6 + 4 = 10\\ \\text{N}\\).",
          "\\(R = \\sqrt{36 + 100} = 2\\sqrt{34} \\approx 11.7\\ \\text{N}\\); \\(\\tan\\alpha = \\dfrac{10}{6} = \\dfrac{5}{3}\\), so \\(\\alpha \\approx 59^{\\circ}\\).",
        ],
        answer: "\\(2\\sqrt{34} \\approx 11.7\\ \\text{N}\\), at \\(\\tan^{-1}(5/3) \\approx 59^{\\circ}\\) to +x",
      },
      selfCheckExample: {
        prompt:
          "Find the vector of magnitude 15 in the direction of \\(2\\hat{i} - 2\\hat{j} + \\hat{k}\\).",
        steps: [
          "\\(|2\\hat{i} - 2\\hat{j} + \\hat{k}| = \\sqrt{4 + 4 + 1} = 3\\).",
          "Vector \\(= 15 \\cdot \\dfrac{2\\hat{i} - 2\\hat{j} + \\hat{k}}{3} = 5(2\\hat{i} - 2\\hat{j} + \\hat{k})\\).",
        ],
        answer: "\\(10\\hat{i} - 10\\hat{j} + 5\\hat{k}\\)",
      },
      practiceSet: [
        { prompt: "A vector of size 8 makes \\(60^{\\circ}\\) with the y-axis in the xy-plane. Its x and y components?", answer: "\\(4\\sqrt{3}\\) and 4" },
        { prompt: "Magnitude of \\(\\hat{i} + 2\\hat{j} - 2\\hat{k}\\)?", answer: "3" },
        { prompt: "ABCDEF is a regular hexagon with centre O. In terms of \\(\\overrightarrow{AO}\\), what is \\(\\overrightarrow{AB} + \\overrightarrow{AC} + \\overrightarrow{AD} + \\overrightarrow{AE} + \\overrightarrow{AF}\\)?", answer: "\\(6\\,\\overrightarrow{AO}\\)" },
        { prompt: "A vector has components \\(-3\\) along x and 3 along y. Its angle with +x?", answer: "\\(135^{\\circ}\\)" },
      ],
      pyqExampleId: "833a9474-36c6-4083-a6e1-0e76ca28df94", // 15 Apr 2023: vector at 30° with the y-axis
      traps: [
        {
          title: "Angle with the y-axis",
          body: "When the angle θ is measured from the y-axis, the y component is A cos θ and the x component is A sin θ. Using A cos θ for x by habit swaps the two.",
        },
        {
          title: "Losing the quadrant",
          body: "tan α = A_y/A_x gives the same value for (3, 3) and (−3, −3). Look at the signs of the components to place the vector before you quote its angle.",
        },
      ],
    },

    // C3 — dot and cross products
    {
      kind: "formula" as const,
      slug: "jpplane-products",
      name: "Dot product, cross product and projection",
      intuition:
        "The dot product measures how much two vectors point the same way: it is AB cos θ, a plain number, and zero when they are perpendicular. The cross product measures how much they point across each other: its size is AB sin θ, it points at right angles to both, and it is zero when they are parallel. In component form the dot product is a sum of three products and the cross product is a 3 × 3 determinant.",
      definition:
        "- \\(\\vec{A}\\cdot\\vec{B} = AB\\cos\\theta = A_xB_x + A_yB_y + A_zB_z\\); perpendicular when it is zero.\n" +
        "- Projection (scalar component) of A on B: \\(\\dfrac{\\vec{A}\\cdot\\vec{B}}{|\\vec{B}|}\\); the component vector is \\((\\vec{A}\\cdot\\hat{B})\\,\\hat{B}\\).\n" +
        "- \\(\\vec{A}\\times\\vec{B} = \\begin{vmatrix}\\hat{i} & \\hat{j} & \\hat{k}\\\\ A_x & A_y & A_z\\\\ B_x & B_y & B_z\\end{vmatrix}\\), of size \\(AB\\sin\\theta\\); \\(\\vec{A}\\times\\vec{A} = 0\\) and \\(\\vec{B}\\times\\vec{A} = -\\vec{A}\\times\\vec{B}\\).\n" +
        "- Unit vector perpendicular to both: \\(\\dfrac{\\vec{A}\\times\\vec{B}}{|\\vec{A}\\times\\vec{B}|}\\).\n" +
        "- Three vectors are coplanar when \\(\\vec{A}\\cdot(\\vec{B}\\times\\vec{C}) = 0\\), the 3 × 3 determinant of their components.\n" +
        "- \\(\\vec{A}\\cdot\\vec{B} = |\\vec{A}\\times\\vec{B}|\\) means \\(\\cos\\theta = \\sin\\theta\\), so \\(\\theta = 45^{\\circ}\\).",
      formula: {
        label: "Products and projection",
        latex:
          "\\vec{A}\\cdot\\vec{B} = AB\\cos\\theta \\qquad |\\vec{A}\\times\\vec{B}| = AB\\sin\\theta \\qquad \\text{proj}_{B}\\vec{A} = \\frac{\\vec{A}\\cdot\\vec{B}}{|\\vec{B}|}",
      },
      authoredExample: {
        prompt:
          "For \\(\\vec{A} = \\hat{i} + 2\\hat{j} + 2\\hat{k}\\) and \\(\\vec{B} = 2\\hat{i} - \\hat{j} + 2\\hat{k}\\), find the angle between them and a unit vector perpendicular to both.",
        steps: [
          "\\(\\vec{A}\\cdot\\vec{B} = 2 - 2 + 4 = 4\\); \\(|\\vec{A}| = |\\vec{B}| = 3\\), so \\(\\cos\\theta = \\dfrac{4}{9}\\).",
          "\\(\\vec{A}\\times\\vec{B} = \\hat{i}(4 + 2) - \\hat{j}(2 - 4) + \\hat{k}(-1 - 4) = 6\\hat{i} + 2\\hat{j} - 5\\hat{k}\\).",
          "Check: \\(\\vec{A}\\cdot(6\\hat{i} + 2\\hat{j} - 5\\hat{k}) = 6 + 4 - 10 = 0\\). Its size is \\(\\sqrt{36 + 4 + 25} = \\sqrt{65}\\).",
        ],
        answer: "\\(\\theta = \\cos^{-1}(4/9)\\); unit normal \\(\\dfrac{6\\hat{i} + 2\\hat{j} - 5\\hat{k}}{\\sqrt{65}}\\)",
      },
      selfCheckExample: {
        prompt:
          "For what value of p are \\(2\\hat{i} + p\\hat{j} + \\hat{k}\\) and \\(\\hat{i} - 2\\hat{j} + 3\\hat{k}\\) perpendicular?",
        steps: [
          "Dot product: \\(2 - 2p + 3 = 0\\).",
          "So \\(p = \\dfrac{5}{2}\\).",
        ],
        answer: "\\(p = 5/2\\)",
      },
      practiceSet: [
        { prompt: "Scalar projection of \\(3\\hat{i} + 4\\hat{j}\\) on \\(\\hat{i} + \\hat{j}\\)?", answer: "\\(7/\\sqrt{2}\\)" },
        { prompt: "Are \\(\\hat{i} + \\hat{j}\\), \\(\\hat{j} + \\hat{k}\\) and \\(\\hat{i} + 2\\hat{j} + \\hat{k}\\) coplanar?", answer: "Yes", method: "The determinant is \\(1(1 - 2) - 1(0 - 1) + 0 = 0\\); the third is the sum of the first two." },
        { prompt: "\\(\\vec{A}\\cdot\\vec{B} = |\\vec{A}\\times\\vec{B}|\\). Angle between A and B?", answer: "\\(45^{\\circ}\\)" },
        { prompt: "\\(\\hat{i}\\times\\hat{j}\\) and \\(\\hat{j}\\times\\hat{i}\\)?", answer: "\\(\\hat{k}\\) and \\(-\\hat{k}\\)" },
      ],
      pyqExampleId: "4fbaab6a-2453-4fea-b297-1f6178fd30ac", // 23 Jan 2025: perpendicular position vectors of equal length
      traps: [
        {
          title: "Dividing the projection by the wrong length",
          body: "The projection of A on B is A·B divided by |B|, the vector you project ON. Dividing by |A| gives the projection of B on A.",
        },
        {
          title: "Order matters in a cross product",
          body: "B × A = −(A × B). The size is the same, but the direction flips, which changes the answer whenever a question asks for a direction or a unit vector.",
        },
      ],
    },
  ],
};

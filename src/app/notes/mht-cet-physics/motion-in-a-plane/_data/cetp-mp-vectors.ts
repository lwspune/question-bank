import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/motion-in-a-plane";

export const VECTORS_NOTE: SubtopicNote = {
  subtopicName: "Vector Operations and Components",
  title: "Vectors: Addition and Products",
  oneLineDefinition:
    "Vectors add by components or by the parallelogram law, R² = A² + B² + 2AB cos θ; the dot product A·B = AB cos θ is zero for perpendicular vectors, and the cross product has magnitude AB sin θ and points perpendicular to both.",
  whyItMatters:
    "10 PYQs, 2 of them HARD. Five add vectors — a unit vector along a sum, three vectors that may or may not close a triangle, a sum perpendicular to a difference, a resultant that changes when one vector doubles. " +
    "Five use products: the dot product from the cross product, perpendicularity, and the angle between a sum and a cross product. Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-mp-vector-addition",
      name: "Adding Vectors",
      intuition:
        "Add component by component; the unit vector along the result is the result divided by its magnitude. Geometrically, R² = A² + B² + 2AB cos θ. Three vectors form a triangle only if they close — one equals the sum of the other two — which also means they lie in a plane. If the sum of two vectors is perpendicular to their difference, (A + B)·(A − B) = A² − B² = 0, so they have equal magnitudes. A condition such as 'A + 2B is perpendicular to A' gives A + 2B cos θ = 0, which substituted into R² simplifies directly.",
      definition:
        "- Components: \\(\\vec{R} = (A_x + B_x)\\hat{i} + (A_y + B_y)\\hat{j} + (A_z + B_z)\\hat{k}\\); \\(\\hat{R} = \\dfrac{\\vec{R}}{|\\vec{R}|}\\).\n" +
        "- \\(R^2 = A^2 + B^2 + 2AB\\cos\\theta\\).\n" +
        "- Triangle: one vector is the sum of the other two (non-zero triple product ⇒ no triangle).\n" +
        "- \\((\\vec{A} + \\vec{B}) \\perp (\\vec{A} - \\vec{B})\\) ⇒ \\(|\\vec{A}| = |\\vec{B}|\\).\n" +
        "- \\(\\vec{A} + 2\\vec{B} \\perp \\vec{A}\\) ⇒ \\(A = -2B\\cos\\theta\\) ⇒ original resultant \\(C = B\\).",
      formula: {
        label: "Resultant",
        latex: "R^2 = A^2 + B^2 + 2AB\\cos\\theta",
      },
      authoredExample: {
        prompt: "Unit vector along the sum of 2î + ĵ and î − ĵ + 2k̂?",
        steps: ["Sum = 3î + 0ĵ + 2k̂, magnitude √13.", "Unit vector = (3î + 2k̂)/√13."],
        answer: "(3î + 2k̂)/√13",
      },
      selfCheckExample: {
        prompt: "Vectors of 3 and 4 units at 90°. Magnitude of their resultant?",
        steps: ["√(9 + 16)."],
        answer: "5 units",
      },
      practiceSet: [
        { prompt: "Sum of two forces is perpendicular to their difference. The forces are?", answer: "Equal in magnitude" },
      ],
      pyqExampleId: "4c9882af-bf3a-4bf6-8548-00b936c3356d",
      traps: [
        {
          title: "Any three vectors form a triangle",
          body:
            "Only if they close. Check whether one is the sum of the other two; if not, they form no triangle whatever their lengths.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-mp-vector-products",
      name: "Dot and Cross Products",
      intuition:
        "A·B = AB cos θ = AₓBₓ + A_yB_y + A_zB_z: zero exactly when the vectors are perpendicular, which turns 'perpendicular' into an equation. |A × B| = AB sin θ, and A × B is perpendicular to both A and B. Given the magnitudes and |A × B|, find sin θ, then cos θ, then A·B. A vector lying in the plane of A and B is perpendicular to A × B.",
      definition:
        "- \\(\\vec{A}\\cdot\\vec{B} = AB\\cos\\theta = A_xB_x + A_yB_y + A_zB_z\\); perpendicular ⇒ 0.\n" +
        "- \\(|\\vec{A}\\times\\vec{B}| = AB\\sin\\theta\\) (\\(5\\sqrt{3}\\), 10 at 30° ⇒ \\(25\\sqrt{3}\\)).\n" +
        "- \\(\\vec{A}\\times\\vec{B}\\) is perpendicular to \\(\\vec{A}\\), to \\(\\vec{B}\\), and to any combination of them.\n" +
        "- \\(|a| = \\sqrt{26}\\), \\(|b| = 7\\), \\(|a\\times b| = 35\\) ⇒ \\(a\\cdot b = 7\\).",
      formula: {
        label: "Products",
        latex: "\\vec{A}\\cdot\\vec{B} = AB\\cos\\theta, \\qquad |\\vec{A}\\times\\vec{B}| = AB\\sin\\theta",
      },
      authoredExample: {
        prompt: "For which m are 2î + mĵ − k̂ and î − 3ĵ + k̂ perpendicular?",
        steps: ["Dot product: 2 − 3m − 1 = 0.", "m = 1/3."],
        answer: "m = 1/3",
      },
      selfCheckExample: {
        prompt: "|A| = 2, |B| = 3, angle 60°. A·B and |A × B|?",
        steps: ["6 cos 60°; 6 sin 60°."],
        answer: "3 and 3√3",
      },
      practiceSet: [
        { prompt: "(2î − 3ĵ + k̂) + (3î + ĵ − 2k̂), dotted with 3î + 2ĵ + k̂?", answer: "10" },
      ],
      pyqExampleId: "06496483-a712-4760-862e-a44fc6c6c3e4",
      traps: [
        {
          title: "Using sin for the dot product",
          body:
            "Dot uses cos θ, cross uses sin θ. At 30°, AB sin θ is half of AB; AB cos θ is (√3/2)AB.",
        },
        {
          title: "Expecting a cross product to lie in the plane of its vectors",
          body:
            "A × B is perpendicular to both A and B, so any sum of A, B and their multiples is perpendicular to it — the angle is 90°, whatever the numbers.",
        },
      ],
    },
  ],
  related: [
    { label: "Kinematics — vectors in motion", href: `${BASE}/cetp-mp-kinematics` },
  ],
};

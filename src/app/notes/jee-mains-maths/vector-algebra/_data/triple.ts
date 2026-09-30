import type { SubtopicNote } from "@/app/notes/_types";

export const TRIPLE_VEC_NOTE: SubtopicNote = {
  subtopicName: "Triple Products and Coplanarity",
  title: "Triple Products and Coplanarity",
  oneLineDefinition:
    "The scalar triple product as a determinant, a volume and a test for coplanarity, and the vector triple product a × (b × c) expanded into dot products.",
  whyItMatters:
    "Twenty-nine PYQs. The scalar triple product questions are coplanarity tests and volumes, one determinant each. The vector triple product questions look heavy but collapse to two terms once expanded. Two ideas cover the page.",
  concepts: [
    // C1 — scalar triple product
    {
      kind: "formula" as const,
      slug: "jvec-stp",
      name: "Scalar triple product: volume and coplanarity",
      intuition:
        "\\([\\vec a\\,\\vec b\\,\\vec c]=\\vec a\\cdot(\\vec b\\times\\vec c)\\) is the determinant of the three component rows, and its absolute value is the volume of the parallelepiped on the three edges. Zero volume means the three vectors lie in one plane. Four points are coplanar when the three edges from one of them are. Swapping two vectors changes the sign; a cyclic shift does not.",
      definition:
        "- \\([\\vec a\\,\\vec b\\,\\vec c]=\\begin{vmatrix}a_1&a_2&a_3\\\\b_1&b_2&b_3\\\\c_1&c_2&c_3\\end{vmatrix}\\).\n" +
        "- Volume of the parallelepiped \\(=|[\\vec a\\,\\vec b\\,\\vec c]|\\); tetrahedron \\(=\\frac16\\) of it.\n" +
        "- Coplanar exactly when \\([\\vec a\\,\\vec b\\,\\vec c]=0\\); points \\(A,B,C,D\\): \\([\\overrightarrow{AB}\\,\\overrightarrow{AC}\\,\\overrightarrow{AD}]=0\\).\n" +
        "- \\([\\vec a+\\vec b,\\,\\vec b+\\vec c,\\,\\vec c+\\vec a]=2[\\vec a\\,\\vec b\\,\\vec c]\\).",
      formula: {
        label: "Coplanarity",
        latex: "[\\vec a\\ \\vec b\\ \\vec c]=\\vec a\\cdot(\\vec b\\times\\vec c)=0",
      },
      authoredExample: {
        prompt: "Find the volume of the parallelepiped with edges \\((1,0,0)\\), \\((1,1,0)\\), \\((1,1,1)\\).",
        steps: [
          "The determinant is triangular: \\(1\\cdot1\\cdot1\\).",
        ],
        answer: "\\(1\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(\\lambda\\) are \\((1,1,1)\\), \\((1,2,3)\\), \\((1,\\lambda,5)\\) coplanar?",
        steps: [
          "\\((10-3\\lambda)-(5-3)+(\\lambda-2)=6-2\\lambda=0\\).",
        ],
        answer: "\\(\\lambda=3\\).",
      },
      practiceSet: [
        { prompt: "\\([\\vec a\\,\\vec b\\,\\vec c]\\) and \\([\\vec b\\,\\vec c\\,\\vec a]\\)?", answer: "Equal" },
        { prompt: "\\([\\vec a\\,\\vec b\\,\\vec c]\\) and \\([\\vec b\\,\\vec a\\,\\vec c]\\)?", answer: "Negatives" },
        { prompt: "\\([\\vec a\\,\\vec b\\,\\vec a]\\)?", answer: "\\(0\\)" },
        { prompt: "\\([\\vec a+\\vec b,\\vec b+\\vec c,\\vec c+\\vec a]\\)?", answer: "\\(2[\\vec a\\,\\vec b\\,\\vec c]\\)" },
      ],
      pyqExampleId: "1c29365c-5a15-4581-9f58-2ba4883d3bd1", // 2023 — four points coplanar, find alpha
      traps: [
        {
          title: "Points need edges, not positions",
          body: "Four points are coplanar when the three edges from one of them are coplanar. Testing the four position vectors directly tests something else.",
        },
      ],
    },

    // C2 — vector triple product
    {
      kind: "formula" as const,
      slug: "jvec-vtp",
      name: "Vector triple product: a × (b × c)",
      intuition:
        "\\(\\vec a\\times(\\vec b\\times\\vec c)\\) lies in the plane of \\(\\vec b\\) and \\(\\vec c\\), and equals \\((\\vec a\\cdot\\vec c)\\vec b-(\\vec a\\cdot\\vec b)\\vec c\\). Expand first, then use the given dot products: a long chain of crosses shrinks to two terms. When the result is compared with a combination of \\(\\vec b\\) and \\(\\vec c\\) that are not parallel, match the coefficients.",
      definition:
        "- \\(\\vec a\\times(\\vec b\\times\\vec c)=(\\vec a\\cdot\\vec c)\\vec b-(\\vec a\\cdot\\vec b)\\vec c\\).\n" +
        "- \\((\\vec a\\times\\vec b)\\times\\vec c=(\\vec a\\cdot\\vec c)\\vec b-(\\vec b\\cdot\\vec c)\\vec a\\).\n" +
        "- Crossing with \\(\\hat i\\): \\((v_1,v_2,v_3)\\times\\hat i=(0,v_3,-v_2)\\).",
      formula: {
        label: "BAC − CAB",
        latex: "\\vec a\\times(\\vec b\\times\\vec c)=(\\vec a\\cdot\\vec c)\\,\\vec b-(\\vec a\\cdot\\vec b)\\,\\vec c",
      },
      authoredExample: {
        prompt: "\\(\\vec a=\\hat i\\), \\(\\vec b=\\hat j\\), \\(\\vec c=(1,1,1)\\). Find \\(\\vec a\\times(\\vec b\\times\\vec c)\\).",
        steps: [
          "\\((\\vec a\\cdot\\vec c)\\vec b-(\\vec a\\cdot\\vec b)\\vec c=1\\cdot\\hat j-0\\).",
        ],
        answer: "\\(\\hat j\\).",
      },
      selfCheckExample: {
        prompt: "Find \\((\\hat i\\times\\hat j)\\times\\hat i\\).",
        steps: [
          "\\((\\hat i\\cdot\\hat i)\\hat j-(\\hat j\\cdot\\hat i)\\hat i\\).",
        ],
        answer: "\\(\\hat j\\).",
      },
      practiceSet: [
        { prompt: "\\(\\hat i\\times(\\hat i\\times\\hat j)\\)?", answer: "\\(-\\hat j\\)" },
        { prompt: "Unit \\(\\vec a\\perp\\vec b\\): \\(\\vec a\\times(\\vec a\\times\\vec b)\\)?", answer: "\\(-\\vec b\\)" },
        { prompt: "\\(\\vec a\\times(\\vec b\\times\\vec c)\\) lies in the plane of?", answer: "\\(\\vec b\\) and \\(\\vec c\\)" },
        { prompt: "\\((\\vec a\\times\\vec b)\\times\\vec c\\) lies in the plane of?", answer: "\\(\\vec a\\) and \\(\\vec b\\)" },
      ],
      pyqExampleId: "29af4074-f9fc-4874-8264-68f74c0ed8ce", // 2022 — a x (b x c) = b + lambda c with b, c non-parallel
      traps: [
        {
          title: "Not associative",
          body: "\\(\\vec a\\times(\\vec b\\times\\vec c)\\) and \\((\\vec a\\times\\vec b)\\times\\vec c\\) are different vectors. Check which pair is inside the bracket before expanding.",
        },
      ],
    },
  ],
};

import type { SubtopicNote } from "@/app/notes/_types";

export const DOT_VEC_NOTE: SubtopicNote = {
  subtopicName: "Dot Product: Angles and Projections",
  title: "Dot Product: Angles and Projections",
  oneLineDefinition:
    "The dot product in components: the angle between two vectors, perpendicular, acute and obtuse conditions, projections and components along and across a vector, and a vector in the plane of two others.",
  whyItMatters:
    "Twenty-seven PYQs. Every one turns a geometric condition — an angle, a projection, lying in a plane — into a dot product, which in components is one line of arithmetic. Three ideas cover the page.",
  concepts: [
    // C1 — angle
    {
      kind: "formula" as const,
      slug: "jvec-angle",
      name: "Angle between two vectors; perpendicular, acute and obtuse",
      intuition:
        "\\(\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta\\), and in components it is \\(a_1b_1+a_2b_2+a_3b_3\\). So the sign of the dot product tells the kind of angle: zero means perpendicular, positive means acute, negative means obtuse. A condition that must hold 'for all \\(t\\)' makes the dot product a quadratic in \\(t\\) that keeps one sign, which is a discriminant condition.",
      definition:
        "- \\(\\cos\\theta=\\frac{\\vec a\\cdot\\vec b}{|\\vec a||\\vec b|}\\).\n" +
        "- \\(\\vec a\\perp\\vec b\\) exactly when \\(\\vec a\\cdot\\vec b=0\\).\n" +
        "- Acute: \\(\\vec a\\cdot\\vec b>0\\); obtuse: \\(\\vec a\\cdot\\vec b<0\\) (excluding the parallel cases).\n" +
        "- \\((\\vec a+\\vec b)\\perp(\\vec a-\\vec b)\\) exactly when \\(|\\vec a|=|\\vec b|\\).",
      formula: {
        label: "Angle from components",
        latex: "\\cos\\theta=\\frac{a_1b_1+a_2b_2+a_3b_3}{|\\vec a|\\,|\\vec b|}",
      },
      authoredExample: {
        prompt: "Find the angle between \\((1,2,2)\\) and \\((2,-1,2)\\).",
        steps: [
          "Dot product \\(2-2+4=4\\); both lengths are 3.",
        ],
        answer: "\\(\\cos^{-1}\\frac49\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(\\lambda\\) are \\((\\lambda,2,1)\\) and \\((1,\\lambda,-3)\\) perpendicular?",
        steps: [
          "\\(\\lambda+2\\lambda-3=0\\).",
        ],
        answer: "\\(\\lambda=1\\).",
      },
      practiceSet: [
        { prompt: "Angle between \\(\\hat i\\) and \\(\\hat i+\\hat j\\)?", answer: "\\(\\frac\\pi4\\)" },
        { prompt: "Angle between \\((1,1,0)\\) and \\((0,1,1)\\)?", answer: "\\(\\frac\\pi3\\)" },
        { prompt: "\\(|\\vec a|=|\\vec b|\\): \\((\\vec a+\\vec b)\\cdot(\\vec a-\\vec b)\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\vec a\\cdot\\vec b<0\\) means the angle is?", answer: "Obtuse, or \\(\\pi\\) if they are opposite" },
      ],
      pyqExampleId: "01ad85e6-9a93-41df-a890-d4429ac4a1cb", // 2024 — (a + b) perpendicular to (a - b), find (14 cos theta)^2
      traps: [
        {
          title: "A negative dot product includes π",
          body: "\\(\\vec a\\cdot\\vec b<0\\) also holds when the vectors point in opposite directions. If the question wants a strictly obtuse angle, exclude the antiparallel case.",
        },
      ],
    },

    // C2 — projection
    {
      kind: "formula" as const,
      slug: "jvec-projection",
      name: "Projections and components along and across a vector",
      intuition:
        "The scalar projection of \\(\\vec a\\) on \\(\\vec b\\) is \\(\\frac{\\vec a\\cdot\\vec b}{|\\vec b|}\\), the length of \\(\\vec a\\)'s shadow along \\(\\vec b\\), with a sign. The projection vector is that length times the unit vector along \\(\\vec b\\), that is \\(\\frac{\\vec a\\cdot\\vec b}{|\\vec b|^2}\\vec b\\). What is left over, \\(\\vec a\\) minus the projection vector, is the component perpendicular to \\(\\vec b\\). In a triangle, the projection of \\(\\overrightarrow{AB}\\) on \\(\\overrightarrow{AC}\\) is \\(|AB|\\cos A\\), with \\(\\cos A\\) from the cosine rule.",
      definition:
        "- Scalar projection: \\(\\frac{\\vec a\\cdot\\vec b}{|\\vec b|}\\). Projection vector: \\(\\frac{\\vec a\\cdot\\vec b}{|\\vec b|^2}\\vec b\\).\n" +
        "- \\(\\vec a=\\vec a_\\parallel+\\vec a_\\perp\\), and \\(|\\vec a|^2=|\\vec a_\\parallel|^2+|\\vec a_\\perp|^2\\).\n" +
        "- A negative projection means the projection vector points opposite \\(\\vec b\\).",
      formula: {
        label: "Scalar projection",
        latex: "\\text{proj}_{\\vec b}\\vec a=\\frac{\\vec a\\cdot\\vec b}{|\\vec b|}",
      },
      authoredExample: {
        prompt: "Find the projection of \\((2,3,6)\\) on \\((1,2,2)\\).",
        steps: [
          "\\(\\frac{2+6+12}{3}\\).",
        ],
        answer: "\\(\\frac{20}3\\).",
      },
      selfCheckExample: {
        prompt: "Split \\((3,4,0)\\) into parts along and across \\((1,0,0)\\).",
        steps: [
          "Along: \\(\\frac{3}{1}(1,0,0)\\); across: the rest.",
        ],
        answer: "\\((3,0,0)\\) and \\((0,4,0)\\).",
      },
      practiceSet: [
        { prompt: "Projection of \\(\\hat i+\\hat j\\) on \\(\\hat k\\)?", answer: "\\(0\\)" },
        { prompt: "Projection vector of \\((1,1,1)\\) on \\((0,0,2)\\)?", answer: "\\(\\hat k\\)" },
        { prompt: "\\(\\vec v=\\vec v_1+\\vec v_2\\), \\(\\vec v_1\\perp\\vec v_2\\): \\(|\\vec v_1|^2+|\\vec v_2|^2\\)?", answer: "\\(|\\vec v|^2\\)" },
        { prompt: "A negative scalar projection means?", answer: "The projection vector points opposite \\(\\vec b\\)" },
      ],
      pyqExampleId: "1416246b-5a0b-41b0-8360-9d97619c4434", // 2021 — projection of AB on AC in a triangle with sides 8, 7, 10
      traps: [
        {
          title: "|b| for the length, |b|² for the vector",
          body: "The scalar projection divides by \\(|\\vec b|\\); the projection vector divides by \\(|\\vec b|^2\\) and then multiplies by \\(\\vec b\\). Mixing them scales the answer by \\(|\\vec b|\\).",
        },
      ],
    },

    // C3 — in the plane of two vectors
    {
      kind: "formula" as const,
      slug: "jvec-in-plane",
      name: "A vector in the plane of two others",
      intuition:
        "A vector in the plane of \\(\\vec a\\) and \\(\\vec b\\) can be written \\(\\vec v=x\\vec a+y\\vec b\\). Each further condition — a dot product, a projection, a perpendicularity — is one linear equation in \\(x\\) and \\(y\\), and two of them fix \\(\\vec v\\). When \\(\\vec v\\) must also be perpendicular to \\(\\vec c\\), its direction is \\((\\vec a\\times\\vec b)\\times\\vec c\\), and one more condition fixes the length.",
      definition:
        "- In the plane of \\(\\vec a,\\vec b\\): \\(\\vec v=x\\vec a+y\\vec b\\).\n" +
        "- \\(\\vec v\\cdot\\vec c=x(\\vec a\\cdot\\vec c)+y(\\vec b\\cdot\\vec c)\\): linear in \\(x,y\\).\n" +
        "- In the plane and perpendicular to \\(\\vec c\\): \\(\\vec v\\parallel(\\vec a\\times\\vec b)\\times\\vec c\\).",
      formula: {
        label: "In the plane of a and b",
        latex: "\\vec v=x\\,\\vec a+y\\,\\vec b",
      },
      authoredExample: {
        prompt: "\\(\\vec v\\) lies in the plane of \\((1,0,1)\\) and \\((0,1,1)\\), with \\(\\vec v\\cdot\\hat i=2\\) and \\(\\vec v\\cdot\\hat j=3\\). Find \\(|\\vec v|^2\\).",
        steps: [
          "\\(\\vec v=(x,y,x+y)\\): \\(x=2\\), \\(y=3\\), so \\(\\vec v=(2,3,5)\\).",
        ],
        answer: "\\(38\\).",
      },
      selfCheckExample: {
        prompt: "\\(\\vec v\\) lies in the plane of \\((1,1,0)\\) and \\((0,1,1)\\), is perpendicular to \\((1,0,-1)\\), and \\(\\vec v\\cdot(1,1,0)=6\\). Find \\(\\vec v\\).",
        steps: [
          "\\(\\vec v=(x,x+y,y)\\); perpendicularity gives \\(x=y\\), so \\(\\vec v=x(1,2,1)\\).",
          "\\(3x=6\\).",
        ],
        answer: "\\((2,4,2)\\).",
      },
      practiceSet: [
        { prompt: "\\(\\vec v\\) in the plane of \\(\\hat i\\) and \\(\\hat j\\): its \\(\\hat k\\)-component?", answer: "\\(0\\)" },
        { prompt: "Direction in the plane of \\(\\vec a,\\vec b\\) perpendicular to \\(\\vec c\\)?", answer: "\\((\\vec a\\times\\vec b)\\times\\vec c\\)" },
        { prompt: "\\(\\vec v=x\\vec a+y\\vec b\\), \\(\\vec v\\perp\\vec b\\) gives?", answer: "\\(x(\\vec a\\cdot\\vec b)+y|\\vec b|^2=0\\)" },
        { prompt: "How many conditions fix \\(\\vec v\\) in a given plane?", answer: "Two" },
      ],
      pyqExampleId: "b3d27019-8887-4c55-bc28-3be85e8f5cf8", // 2022 — v in the plane of a and b, projection on c is 2/sqrt3, v.j = 7
      traps: [
        {
          title: "The direction is not the vector",
          body: "\\((\\vec a\\times\\vec b)\\times\\vec c\\) fixes only the direction. Its length and sign still come from the remaining condition.",
        },
      ],
    },
  ],
};

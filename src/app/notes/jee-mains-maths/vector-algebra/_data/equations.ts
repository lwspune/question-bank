import type { SubtopicNote } from "@/app/notes/_types";

export const EQUATIONS_VEC_NOTE: SubtopicNote = {
  subtopicName: "Solving Vector Equations",
  title: "Solving Vector Equations",
  oneLineDefinition:
    "Finding an unknown vector from cross-product and dot-product conditions: r × a = b × a type equations, and a × c = b with a · c given.",
  whyItMatters:
    "Forty-one PYQs, the largest page in the chapter. They look different but reduce to two moves: a cross product equal to zero means two vectors are parallel, and crossing a cross-product equation with a known vector turns it into one you can solve. Two ideas cover the page.",
  concepts: [
    // C1 — r x a = b x a
    {
      kind: "formula" as const,
      slug: "jvec-parallel-cross",
      name: "r × a = b × a: the difference is parallel to a",
      intuition:
        "Move everything to one side: \\(\\vec r\\times\\vec a-\\vec b\\times\\vec a=(\\vec r-\\vec b)\\times\\vec a=\\vec 0\\). A cross product is zero only when the two vectors are parallel, so \\(\\vec r=\\vec b+\\lambda\\vec a\\). The extra condition, usually a dot product, fixes \\(\\lambda\\). The same move handles \\(2(\\vec a\\times\\vec c)+3(\\vec b\\times\\vec c)=\\vec0\\), which says \\(\\vec c\\parallel2\\vec a+3\\vec b\\).",
      definition:
        "- \\(\\vec u\\times\\vec v=\\vec0\\) (both non-zero) means \\(\\vec u\\parallel\\vec v\\).\n" +
        "- \\(\\vec r\\times\\vec a=\\vec b\\times\\vec a\\Rightarrow\\vec r=\\vec b+\\lambda\\vec a\\).\n" +
        "- \\(\\vec a\\times\\vec c=\\vec c\\times\\vec b\\Rightarrow(\\vec a+\\vec b)\\times\\vec c=\\vec0\\).\n" +
        "- Then \\(\\vec r\\cdot\\vec d=k\\) gives \\(\\lambda=\\frac{k-\\vec b\\cdot\\vec d}{\\vec a\\cdot\\vec d}\\).",
      formula: {
        label: "The parallel form",
        latex: "\\vec r\\times\\vec a=\\vec b\\times\\vec a\\ \\Rightarrow\\ \\vec r=\\vec b+\\lambda\\vec a",
      },
      authoredExample: {
        prompt: "\\(\\vec r\\times(1,1,0)=(0,0,1)\\times(1,1,0)\\) and \\(\\vec r\\cdot\\hat i=3\\). Find \\(\\vec r\\).",
        steps: [
          "\\(\\vec r=(0,0,1)+\\lambda(1,1,0)\\); the \\(\\hat i\\)-component gives \\(\\lambda=3\\).",
        ],
        answer: "\\((3,3,1)\\).",
      },
      selfCheckExample: {
        prompt: "\\((\\vec a+2\\vec b)\\times\\vec c=\\vec0\\) with \\(\\vec a=\\hat i\\), \\(\\vec b=\\hat j\\), \\(|\\vec c|=\\sqrt5\\) and \\(\\vec c\\cdot\\hat i>0\\). Find \\(\\vec c\\).",
        steps: [
          "\\(\\vec c=t(1,2,0)\\) with \\(|t|\\sqrt5=\\sqrt5\\) and \\(t>0\\).",
        ],
        answer: "\\((1,2,0)\\).",
      },
      practiceSet: [
        { prompt: "\\(\\vec r\\times\\vec a=\\vec0\\) means?", answer: "\\(\\vec r\\parallel\\vec a\\)" },
        { prompt: "\\(\\vec a\\times\\vec c=\\vec c\\times\\vec b\\) rearranges to?", answer: "\\((\\vec a+\\vec b)\\times\\vec c=\\vec0\\)" },
        { prompt: "\\(\\vec r=\\vec b+\\lambda\\vec a\\) with \\(\\vec r\\cdot\\vec a=0\\): \\(\\lambda\\)?", answer: "\\(-\\frac{\\vec a\\cdot\\vec b}{|\\vec a|^2}\\)" },
        { prompt: "Unknowns left after writing \\(\\vec r=\\vec b+\\lambda\\vec a\\)?", answer: "One" },
      ],
      pyqExampleId: "3600d7f9-8be9-4e11-808c-3ec15f52b16a", // 2023 — r x b + b x c = 0 and r.a = 0, find r.c
      traps: [
        {
          title: "c × b is minus b × c",
          body: "\\(\\vec a\\times\\vec c=\\vec c\\times\\vec b\\) gives \\((\\vec a+\\vec b)\\times\\vec c=\\vec0\\), not \\((\\vec a-\\vec b)\\): moving \\(\\vec c\\times\\vec b\\) across flips it to \\(\\vec b\\times\\vec c\\).",
        },
      ],
    },

    // C2 — a x c = b with a.c given
    {
      kind: "formula" as const,
      slug: "jvec-cross-given",
      name: "a × c = b with a · c given: cross again with a",
      intuition:
        "A cross-product equation alone does not fix \\(\\vec c\\): adding any multiple of \\(\\vec a\\) leaves \\(\\vec a\\times\\vec c\\) unchanged. The dot condition \\(\\vec a\\cdot\\vec c=k\\) removes that freedom. Cross both sides with \\(\\vec a\\): \\(\\vec a\\times(\\vec a\\times\\vec c)=(\\vec a\\cdot\\vec c)\\vec a-|\\vec a|^2\\vec c=\\vec a\\times\\vec b\\), so \\(\\vec c=\\frac{k\\vec a-\\vec a\\times\\vec b}{|\\vec a|^2}\\). A solution exists only if \\(\\vec b\\perp\\vec a\\).",
      definition:
        "- \\(\\vec a\\times(\\vec a\\times\\vec c)=(\\vec a\\cdot\\vec c)\\vec a-|\\vec a|^2\\vec c\\).\n" +
        "- \\(\\vec a\\times\\vec c=\\vec b\\), \\(\\vec a\\cdot\\vec c=k\\Rightarrow\\vec c=\\frac{k\\vec a-\\vec a\\times\\vec b}{|\\vec a|^2}\\).\n" +
        "- Solvable only if \\(\\vec a\\cdot\\vec b=0\\); and then \\(\\vec c\\cdot\\vec b=0\\) too.",
      formula: {
        label: "Solving a × c = b",
        latex: "\\vec c=\\frac{(\\vec a\\cdot\\vec c)\\,\\vec a-\\vec a\\times\\vec b}{|\\vec a|^2}",
      },
      authoredExample: {
        prompt: "\\(\\vec a=(1,0,1)\\), \\(\\vec a\\times\\vec c=(1,0,-1)\\) and \\(\\vec a\\cdot\\vec c=2\\). Find \\(\\vec c\\).",
        steps: [
          "\\(\\vec a\\times\\vec b=(1,0,1)\\times(1,0,-1)=(0,2,0)\\), \\(|\\vec a|^2=2\\).",
          "\\(\\vec c=\\frac{(2,0,2)-(0,2,0)}{2}\\).",
        ],
        answer: "\\((1,-1,1)\\).",
      },
      selfCheckExample: {
        prompt: "Does \\((1,1,-1)\\times\\vec c=(2,-3,2)\\) have a solution?",
        steps: [
          "\\((1,1,-1)\\cdot(2,-3,2)=2-3-2=-3\\ne0\\).",
        ],
        answer: "No: the right side is not perpendicular to \\((1,1,-1)\\).",
      },
      practiceSet: [
        { prompt: "\\(\\vec a\\times(\\vec a\\times\\vec c)\\)?", answer: "\\((\\vec a\\cdot\\vec c)\\vec a-|\\vec a|^2\\vec c\\)" },
        { prompt: "\\(\\vec a\\times\\vec c=\\vec b\\) forces?", answer: "\\(\\vec a\\cdot\\vec b=0\\) and \\(\\vec c\\cdot\\vec b=0\\)" },
        { prompt: "With \\(\\vec a\\times\\vec c=\\vec b\\): \\(\\vec c\\cdot\\vec b\\)?", answer: "\\(0\\)" },
        { prompt: "Why is a dot condition needed?", answer: "\\(\\vec c+t\\vec a\\) gives the same cross product" },
      ],
      pyqExampleId: "0f8b1d93-ede8-4344-b502-1f72dfc3f051", // 2021 — a x c = b and a.c = 3, find a.(b x c)
      traps: [
        {
          title: "Check solvability first",
          body: "If \\(\\vec a\\cdot\\vec b\\ne0\\), no \\(\\vec c\\) satisfies \\(\\vec a\\times\\vec c=\\vec b\\). A question asking how many such vectors exist can have the answer 0.",
        },
      ],
    },
  ],
};

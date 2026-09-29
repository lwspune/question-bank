import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HD_SINGLE_NOTE: SubtopicNote = {
  subtopicName: "One Line of Sight",
  title: "One Line of Sight",
  oneLineDefinition:
    "A height, a ground distance and a line of sight make one right triangle; the angle of elevation links the two legs by its tangent.",
  whyItMatters:
    "Six PYQs, one of them HARD. Draw the right triangle, mark the angle at the observer, and pick the ratio that joins what you know to what you want: tangent for height and ground distance, sine when the slant length is given (a ladder, a broken tree, a distance to a plane).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdshd-sight",
      name: "Height, distance and the angle",
      intuition:
        "Standing at a distance \\(d\\) and looking up at angle \\(\\theta\\) to a top \\(h\\) high, the height and the distance are the two legs of a right triangle: \\(h = d\\tan\\theta\\).",
      definition:
        "- \\(h = d\\tan\\theta\\); \\(d = h\\cot\\theta\\).\n" +
        "- The slant line of sight \\(= \\dfrac{h}{\\sin\\theta}\\); use sine when a slant length is given.\n" +
        "- Standard values: \\(\\tan 30^\\circ = \\dfrac1{\\sqrt3}\\), \\(\\tan 45^\\circ = 1\\), \\(\\tan 60^\\circ = \\sqrt3\\).\n" +
        "- Shadow equal to height: the Sun is at \\(45^\\circ\\).\n" +
        "- Two tops on one vertical seen from one point share the same ground distance.",
      formula: {
        label: "Height",
        latex: "h = d\\tan\\theta",
      },
      authoredExample: {
        prompt: "A pole casts a shadow \\(\\sqrt3\\) times its height. What is the Sun's altitude?",
        steps: ["\\(\\tan\\theta = \\dfrac{h}{\\sqrt3 h} = \\dfrac1{\\sqrt3}\\)."],
        answer: "\\(30^\\circ\\).",
      },
      selfCheckExample: {
        prompt: "A \\(12\\) m tree breaks and its top touches the ground at \\(30^\\circ\\). At what height did it break?",
        steps: ["Standing part \\(h\\), fallen part \\(2h\\) (since \\(\\sin 30^\\circ = \\tfrac12\\)).", "\\(3h = 12\\)."],
        answer: "\\(4\\) m.",
      },
      practiceSet: [
        { prompt: "\\(d = 20\\), elevation \\(60^\\circ\\). Height?", answer: "\\(20\\sqrt3\\)" },
        { prompt: "Height \\(50\\), elevation \\(45^\\circ\\). Distance?", answer: "\\(50\\)" },
        { prompt: "Slant \\(10\\), height \\(6\\). \\(\\sin\\theta\\)?", answer: "\\(0.6\\)" },
        { prompt: "Shadow \\(= \\dfrac{h}{\\sqrt3}\\). Sun's altitude?", answer: "\\(60^\\circ\\)" },
      ],
      pyqExampleId: "a5799e11-551b-40a7-a940-521cba4f12e1", // 2016 (II) — shadow equal to the tower's height
      traps: [
        {
          title: "Is the given length slant or level?",
          body:
            "'\\(10\\) km from the observer' can mean the straight-line distance to the plane, not the ground distance. The first needs sine, the second tangent.",
        },
      ],
    },
  ],
};
